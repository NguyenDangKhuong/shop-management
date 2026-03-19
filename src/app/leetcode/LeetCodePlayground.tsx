'use client'

import ThemeToggle from '@/components/ui/ThemeToggle'
import Editor from '@monaco-editor/react'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Category, Difficulty, Problem, problems } from './problems'

const STORAGE_KEY = 'leetcode-saved-code'

const difficultyColor: Record<Difficulty, string> = {
    Easy: 'text-green-400 bg-green-500/15 border-green-500/30',
    Medium: 'text-yellow-400 bg-yellow-500/15 border-yellow-500/30',
    Hard: 'text-red-400 bg-red-500/15 border-red-500/30',
}

const categoryEmoji: Record<Category, string> = {
    'Two Pointers': '👉',
    'Sliding Window': '🪟',
    'BFS / DFS': '🌲',
    'Binary Search': '🔍',
    'Dynamic Programming': '📊',
    'Backtracking': '🔙',
    'Stack': '📚',
    'Custom Hooks': '⚛️',
}

interface TestResult {
    passed: boolean
    input: string
    expected: string
    actual: string
    error?: string
}

function getSavedCode(): Record<number, string> {
    if (typeof window === 'undefined') return {}
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    } catch {
        return {}
    }
}

function saveCode(problemId: number, code: string) {
    const saved = getSavedCode()
    saved[problemId] = code
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved))
}

function getSavedSolvedProblems(): number[] {
    if (typeof window === 'undefined') return []
    try {
        return JSON.parse(localStorage.getItem('leetcode-solved') || '[]')
    } catch {
        return []
    }
}

function markSolved(problemId: number) {
    const solved = getSavedSolvedProblems()
    if (!solved.includes(problemId)) {
        solved.push(problemId)
        localStorage.setItem('leetcode-solved', JSON.stringify(solved))
    }
}

// Sandboxed code execution via iframe
function executeCode(code: string, testCases: Problem['testCases']): Promise<TestResult[]> {
    return new Promise((resolve) => {
        const iframe = document.createElement('iframe')
        iframe.sandbox.add('allow-scripts')
        iframe.style.display = 'none'
        document.body.appendChild(iframe)

        const timeout = setTimeout(() => {
            document.body.removeChild(iframe)
            resolve(testCases.map(tc => ({
                passed: false,
                input: tc.input,
                expected: tc.expected,
                actual: 'Error',
                error: '⏱️ Time Limit Exceeded (5s)',
            })))
        }, 5000)

        const handler = (event: MessageEvent) => {
            if (event.data?.type === 'leetcode-result') {
                clearTimeout(timeout)
                window.removeEventListener('message', handler)
                if (iframe.parentNode) document.body.removeChild(iframe)
                resolve(event.data.results)
            }
        }
        window.addEventListener('message', handler)

        // Extract function name from code
        const fnMatch = code.match(/function\s+(\w+)/)
        const fnName = fnMatch ? fnMatch[1] : 'solution'

        const script = `
            <script>
                try {
                    // --- React Hooks Mock ---
                    let _state = [];
                    let _idx = 0;
                    const useState = (init) => {
                       const i = _idx++;
                       if (_state[i] === undefined) _state[i] = typeof init === 'function' ? init() : init;
                       const setState = (val) => { _state[i] = typeof val === 'function' ? val(_state[i]) : val; };
                       return [_state[i], setState];
                    };
                    const useEffect = (cb, deps) => { /* Mock: does not trigger cb to avoid infinite loops in simple eval */ };
                    const useRef = (init) => ({ current: init });
                    const useCallback = (cb) => cb;
                    const useMemo = (cb) => cb();
                    const __resetHooks = () => { _state = []; _idx = 0; };
                    const renderHook = (renderFn) => { __resetHooks(); return renderFn(); };
                    // ------------------------

                    ${code}
                    
                    const testCases = ${JSON.stringify(testCases)};
                    const results = testCases.map(tc => {
                        try {
                            if (typeof __resetHooks !== 'undefined') __resetHooks();
                            const args = new Function('return [' + tc.input + ']')();
                            const result = typeof testHook === 'function' ? testHook(...args) : ${fnName}(...args);
                            const actual = JSON.stringify(result);
                            const expected = tc.expected;
                            return {
                                passed: actual === expected,
                                input: tc.input,
                                expected: expected,
                                actual: actual,
                            };
                        } catch(e) {
                            return {
                                passed: false,
                                input: tc.input,
                                expected: tc.expected,
                                actual: 'Error',
                                error: e.message,
                            };
                        }
                    });
                    parent.postMessage({ type: 'leetcode-result', results }, '*');
                } catch(e) {
                    const testCases = ${JSON.stringify(testCases)};
                    parent.postMessage({
                        type: 'leetcode-result',
                        results: testCases.map(tc => ({
                            passed: false,
                            input: tc.input,
                            expected: tc.expected,
                            actual: 'Error',
                            error: e.message,
                        })),
                    }, '*');
                }
            <\/script>
        `
        iframe.srcdoc = script
    })
}

export default function LeetCodePlayground() {
    const [selectedProblem, setSelectedProblem] = useState<Problem>(problems[0])
    const [code, setCode] = useState(problems[0].starterCode)
    const [results, setResults] = useState<TestResult[]>([])
    const [isRunning, setIsRunning] = useState(false)
    const [showHint, setShowHint] = useState(false)
    const [filterCat, setFilterCat] = useState<Category | 'All'>('All')
    const [solvedIds, setSolvedIds] = useState<number[]>([])
    const [consoleOutput, setConsoleOutput] = useState<string[]>([])
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [lang, setLang] = useState<'vi' | 'en'>('vi')
    const editorRef = useRef<unknown>(null)

    // Load saved code and solved status
    useEffect(() => {
        const saved = getSavedCode()
        if (saved[problems[0].id]) {
            setCode(saved[problems[0].id])
        }
        setSolvedIds(getSavedSolvedProblems())
    }, [])

    const selectProblem = useCallback((problem: Problem) => {
        setSelectedProblem(problem)
        const saved = getSavedCode()
        setCode(saved[problem.id] || problem.starterCode)
        setResults([])
        setShowHint(false)
        setConsoleOutput([])
    }, [])

    const handleRun = useCallback(async () => {
        setIsRunning(true)
        setConsoleOutput([])
        // Save code before running
        saveCode(selectedProblem.id, code)

        const testResults = await executeCode(code, selectedProblem.testCases)
        setResults(testResults)

        if (testResults.every(r => r.passed)) {
            markSolved(selectedProblem.id)
            setSolvedIds(getSavedSolvedProblems())
        }
        setIsRunning(false)
    }, [code, selectedProblem])

    const handleReset = useCallback(() => {
        setCode(selectedProblem.starterCode)
        saveCode(selectedProblem.id, selectedProblem.starterCode)
        setResults([])
        setConsoleOutput([])
    }, [selectedProblem])

    const handleEditorMount = (editor: unknown) => {
        editorRef.current = editor
    }

    const filteredProblems = filterCat === 'All'
        ? problems
        : problems.filter(p => p.category === filterCat)

    const allCategories: Category[] = ['Two Pointers', 'Sliding Window', 'BFS / DFS', 'Binary Search', 'Dynamic Programming', 'Backtracking', 'Stack', 'Custom Hooks']

    const passedCount = results.filter(r => r.passed).length
    const totalCount = results.length

    return (
        <div className="h-screen flex flex-col bg-[#1e1e1e] text-white overflow-hidden">
            {/* Top Bar */}
            <header className="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-[#3c3c3c] shrink-0">
                <div className="flex items-center gap-3">
                    <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#38bdf8] to-[#c084fc] flex items-center justify-center font-bold text-white text-sm shadow-lg">
                            Y
                        </div>
                        <span className="font-bold text-sm tracking-tight">
                            The<span className="text-[#38bdf8]">TapHoa</span>
                        </span>
                    </Link>
                    <span className="text-[#666] text-sm">|</span>
                    <span className="text-sm font-semibold text-[#38bdf8]">⚡ LeetCode Playground</span>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setLang(l => l === 'vi' ? 'en' : 'vi')}
                        className="text-xs px-2.5 py-1 rounded-lg bg-[#3c3c3c] hover:bg-[#4c4c4c] transition"
                    >
                        {lang === 'vi' ? '🇻🇳 VI' : '🇺🇸 EN'}
                    </button>
                    <ThemeToggle />
                    <div className="text-xs text-[#666]">
                        ✅ {solvedIds.length}/{problems.length} solved
                    </div>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar - Problem List */}
                <aside className={`${sidebarOpen ? 'w-72' : 'w-0'} transition-all duration-200 bg-[#252526] border-r border-[#3c3c3c] flex flex-col overflow-hidden shrink-0`}>
                    <div className="p-3 border-b border-[#3c3c3c]">
                        <select
                            value={filterCat}
                            onChange={(e) => setFilterCat(e.target.value as Category | 'All')}
                            className="w-full text-xs px-2 py-1.5 rounded-lg bg-[#3c3c3c] border border-[#555] text-white focus:outline-none focus:border-[#38bdf8]"
                        >
                            <option value="All">📋 All Categories ({problems.length})</option>
                            {allCategories.map(c => (
                                <option key={c} value={c}>
                                    {categoryEmoji[c]} {c} ({problems.filter(p => p.category === c).length})
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {filteredProblems.map((problem) => (
                            <button
                                key={problem.id}
                                onClick={() => selectProblem(problem)}
                                className={`w-full text-left px-3 py-2.5 border-b border-[#3c3c3c]/50 transition-colors ${
                                    selectedProblem.id === problem.id
                                        ? 'bg-[#37373d]'
                                        : 'hover:bg-[#2a2d2e]'
                                }`}
                            >
                                <div className="flex items-center gap-2">
                                    <span className="text-xs">
                                        {solvedIds.includes(problem.id) ? '✅' : '⬜'}
                                    </span>
                                    <span className="text-sm truncate flex-1">{problem.title}</span>
                                </div>
                                <div className="flex items-center gap-2 mt-1 pl-5">
                                    <span className={`text-[10px] px-1.5 py-0.5 rounded border ${difficultyColor[problem.difficulty]}`}>
                                        {problem.difficulty}
                                    </span>
                                    <span className="text-[10px] text-[#888]">{problem.category}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </aside>

                {/* Toggle Sidebar */}
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="w-5 bg-[#2a2d2e] hover:bg-[#37373d] border-r border-[#3c3c3c] flex items-center justify-center text-[#888] hover:text-white transition shrink-0"
                    title={sidebarOpen ? 'Hide sidebar' : 'Show sidebar'}
                >
                    {sidebarOpen ? '◀' : '▶'}
                </button>

                {/* Main Content */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                        {/* Problem Description */}
                        <div className="md:w-[40%] border-b md:border-b-0 md:border-r border-[#3c3c3c] overflow-y-auto p-4">
                            <div className="flex items-center gap-3 mb-3">
                                <h2 className="text-lg font-bold flex-1">{selectedProblem.title}</h2>
                                <span className={`text-xs px-2 py-0.5 rounded border ${difficultyColor[selectedProblem.difficulty]}`}>
                                    {selectedProblem.difficulty}
                                </span>
                            </div>
                            <div className="text-xs text-[#888] mb-3 flex items-center gap-2">
                                <span>{categoryEmoji[selectedProblem.category]} {selectedProblem.category}</span>
                            </div>

                            <div className="text-sm text-[#ccc] leading-relaxed whitespace-pre-wrap mb-4">
                                {lang === 'vi' ? selectedProblem.description.vi : selectedProblem.description.en}
                            </div>

                            {/* Test Cases Preview */}
                            <div className="mb-4">
                                <div className="text-xs font-bold text-[#888] mb-2 uppercase tracking-wider">Test Cases</div>
                                {selectedProblem.testCases.map((tc, i) => (
                                    <div key={i} className="mb-2 p-2.5 rounded-lg bg-[#1e1e1e] border border-[#3c3c3c] text-xs font-mono">
                                        <div className="text-[#9cdcfe]">Input: <span className="text-[#ce9178]">{tc.input}</span></div>
                                        <div className="text-[#9cdcfe]">Expected: <span className="text-[#b5cea8]">{tc.expected}</span></div>
                                    </div>
                                ))}
                            </div>

                            {/* Hint */}
                            {selectedProblem.hint && (
                                <div>
                                    <button
                                        onClick={() => setShowHint(!showHint)}
                                        className="text-xs text-yellow-400/80 hover:text-yellow-400 transition flex items-center gap-1"
                                    >
                                        💡 {showHint ? 'Hide Hint' : 'Show Hint'}
                                    </button>
                                    {showHint && (
                                        <div className="mt-2 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-xs text-yellow-300/90">
                                            {selectedProblem.hint}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Code Editor + Output */}
                        <div className="flex-1 flex flex-col overflow-hidden">
                            {/* Editor Toolbar */}
                            <div className="flex items-center justify-between px-3 py-1.5 bg-[#252526] border-b border-[#3c3c3c] shrink-0">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-[#888]">JavaScript</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={handleReset}
                                        className="text-xs px-2.5 py-1 rounded bg-[#3c3c3c] hover:bg-[#4c4c4c] text-[#aaa] hover:text-white transition"
                                    >
                                        ↻ Reset
                                    </button>
                                    <button
                                        onClick={handleRun}
                                        disabled={isRunning}
                                        className={`text-xs px-4 py-1 rounded font-semibold transition ${
                                            isRunning
                                                ? 'bg-[#3c3c3c] text-[#888] cursor-wait'
                                                : 'bg-green-600 hover:bg-green-500 text-white'
                                        }`}
                                    >
                                        {isRunning ? '⏳ Running...' : '▶ Run'}
                                    </button>
                                </div>
                            </div>

                            {/* Monaco Editor */}
                            <div className="flex-1 min-h-0">
                                <Editor
                                    height="100%"
                                    defaultLanguage="javascript"
                                    value={code}
                                    onChange={(v) => {
                                        const newCode = v || ''
                                        setCode(newCode)
                                        saveCode(selectedProblem.id, newCode)
                                    }}
                                    onMount={handleEditorMount}
                                    theme="vs-dark"
                                    options={{
                                        fontSize: 14,
                                        minimap: { enabled: false },
                                        scrollBeyondLastLine: false,
                                        wordWrap: 'on',
                                        lineNumbers: 'on',
                                        renderLineHighlight: 'line',
                                        padding: { top: 12 },
                                        tabSize: 2,
                                        automaticLayout: true,
                                    }}
                                />
                            </div>

                            {/* Test Results */}
                            <div className="h-48 bg-[#1e1e1e] border-t border-[#3c3c3c] overflow-y-auto shrink-0">
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-[#252526] border-b border-[#3c3c3c] sticky top-0">
                                    <span className="text-xs font-bold text-[#888] uppercase tracking-wider">Output</span>
                                    {results.length > 0 && (
                                        <span className={`text-xs font-bold ${passedCount === totalCount ? 'text-green-400' : 'text-red-400'}`}>
                                            {passedCount}/{totalCount} passed
                                        </span>
                                    )}
                                </div>
                                <div className="p-3">
                                    {results.length === 0 ? (
                                        <div className="text-xs text-[#666] italic">
                                            {lang === 'vi' ? 'Bấm ▶ Run để chạy code...' : 'Click ▶ Run to execute...'}
                                        </div>
                                    ) : (
                                        <div className="space-y-2">
                                            {results.map((r, i) => (
                                                <div
                                                    key={i}
                                                    className={`p-2.5 rounded-lg border text-xs font-mono ${
                                                        r.passed
                                                            ? 'bg-green-500/10 border-green-500/20'
                                                            : 'bg-red-500/10 border-red-500/20'
                                                    }`}
                                                >
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span>{r.passed ? '✅' : '❌'}</span>
                                                        <span className="font-bold">Test {i + 1}</span>
                                                    </div>
                                                    <div className="text-[#9cdcfe]">Input: <span className="text-[#ce9178]">{r.input}</span></div>
                                                    <div className="text-[#9cdcfe]">Expected: <span className="text-[#b5cea8]">{r.expected}</span></div>
                                                    <div className="text-[#9cdcfe]">
                                                        Actual: <span className={r.passed ? 'text-[#b5cea8]' : 'text-red-400'}>{r.actual}</span>
                                                    </div>
                                                    {r.error && (
                                                        <div className="text-red-400 mt-1">Error: {r.error}</div>
                                                    )}
                                                </div>
                                            ))}
                                            {passedCount === totalCount && (
                                                <div className="p-3 rounded-lg bg-green-500/15 border border-green-500/30 text-center">
                                                    <div className="text-green-400 font-bold text-sm">🎉 All tests passed!</div>
                                                    <div className="text-green-400/70 text-xs mt-1">
                                                        {lang === 'vi' ? 'Tuyệt vời! Bạn đã giải xong bài này.' : 'Great job! You solved this problem.'}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                    {consoleOutput.length > 0 && (
                                        <div className="mt-3 border-t border-[#3c3c3c] pt-2">
                                            <div className="text-xs text-[#888] mb-1">Console:</div>
                                            {consoleOutput.map((line, i) => (
                                                <div key={i} className="text-xs font-mono text-[#ccc]">{line}</div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
