'use client'

import { useState, useCallback, useEffect, useMemo } from 'react'
import { interviewCards, type Topic, type Difficulty } from './interviewFlashcards'

// ═══════════════════════════════════════════════
//  Algorithm Flashcard Data (original)
// ═══════════════════════════════════════════════

interface AlgoFlashcard {
    id: string
    pattern: string
    emoji: string
    color: string
    front: {
        signal: string
        question: string
    }
    back: {
        approach: string
        template: string
        complexity: string
        example: string
    }
}

const algoFlashcards: AlgoFlashcard[] = [
    {
        id: 'hashmap-twosum',
        pattern: 'HashMap',
        emoji: '🗂️',
        color: '#4ade80',
        front: {
            signal: 'Tìm 2 phần tử có tổng = target',
            question: 'nums = [2,7,11,15], target = 9 → ?',
        },
        back: {
            approach: 'Duyệt 1 lần, check Map trước, lưu Map sau',
            template: `const map = new Map()
for (let i = 0; i < nums.length; i++) {
  const comp = target - nums[i]
  if (map.has(comp)) return [map.get(comp), i]
  map.set(nums[i], i)
}`,
            complexity: 'Time: O(n) | Space: O(n)',
            example: 'Two Sum, Group Anagrams, Contains Duplicate',
        },
    },
    {
        id: 'hashmap-frequency',
        pattern: 'HashMap',
        emoji: '🗂️',
        color: '#4ade80',
        front: {
            signal: 'Đếm tần suất / frequency count',
            question: '"aabbccc" → {a:2, b:2, c:3}',
        },
        back: {
            approach: 'Duyệt 1 lần, dùng Map đếm số lần xuất hiện',
            template: `const freq = new Map()
for (const char of str) {
  freq.set(char, (freq.get(char) || 0) + 1)
}`,
            complexity: 'Time: O(n) | Space: O(k) k=unique chars',
            example: 'Valid Anagram, Top K Frequent, First Unique Char',
        },
    },
    {
        id: 'two-pointers-sorted',
        pattern: 'Two Pointers',
        emoji: '👉👈',
        color: '#60a5fa',
        front: {
            signal: 'Sorted array + tìm cặp thỏa điều kiện',
            question: 'sorted = [1,3,5,7], target = 8 → ?',
        },
        back: {
            approach: '2 con trỏ từ 2 đầu, thu hẹp dần',
            template: `let left = 0, right = arr.length - 1
while (left < right) {
  const sum = arr[left] + arr[right]
  if (sum === target) return [left, right]
  if (sum < target) left++
  else right--
}`,
            complexity: 'Time: O(n) | Space: O(1)',
            example: 'Two Sum II, Container With Most Water, 3Sum',
        },
    },
    {
        id: 'two-pointers-reverse',
        pattern: 'Two Pointers',
        emoji: '👉👈',
        color: '#60a5fa',
        front: {
            signal: 'Đảo ngược / Palindrome check',
            question: '"racecar" → true (palindrome)',
        },
        back: {
            approach: '2 con trỏ từ 2 đầu, so sánh và thu hẹp',
            template: `let left = 0, right = s.length - 1
while (left < right) {
  if (s[left] !== s[right]) return false
  left++
  right--
}
return true`,
            complexity: 'Time: O(n) | Space: O(1)',
            example: 'Valid Palindrome, Reverse String, Remove Duplicates',
        },
    },
    {
        id: 'sliding-window-fixed',
        pattern: 'Sliding Window',
        emoji: '🪟',
        color: '#fbbf24',
        front: {
            signal: 'Subarray/substring liên tục có kích thước k',
            question: 'Max sum subarray size k=3: [1,4,2,10,2,3,1,0,20]',
        },
        back: {
            approach: 'Window cố định size k, trượt từ trái sang phải',
            template: `let windowSum = 0, maxSum = 0
for (let i = 0; i < arr.length; i++) {
  windowSum += arr[i]
  if (i >= k) windowSum -= arr[i - k]
  if (i >= k - 1) maxSum = Math.max(maxSum, windowSum)
}`,
            complexity: 'Time: O(n) | Space: O(1)',
            example: 'Max Avg Subarray, Max Sum Subarray Size K',
        },
    },
    {
        id: 'sliding-window-variable',
        pattern: 'Sliding Window',
        emoji: '🪟',
        color: '#fbbf24',
        front: {
            signal: 'Substring/subarray ngắn nhất/dài nhất thỏa điều kiện',
            question: 'Longest substring without repeating chars',
        },
        back: {
            approach: 'for mở rộng right, while thu hẹp left khi invalid',
            template: `let left = 0, maxLen = 0
const set = new Set()
for (let right = 0; right < s.length; right++) {
  while (set.has(s[right])) {
    set.delete(s[left])
    left++
  }
  set.add(s[right])
  maxLen = Math.max(maxLen, right - left + 1)
}`,
            complexity: 'Time: O(n) | Space: O(k)',
            example: 'Longest Substring No Repeat, Min Window Substring',
        },
    },
    {
        id: 'stack-parentheses',
        pattern: 'Stack',
        emoji: '📚',
        color: '#a78bfa',
        front: {
            signal: 'Dấu ngoặc, matching pairs, undo/redo',
            question: '"({[]})" → valid, "([)]" → invalid',
        },
        back: {
            approach: 'Gặp mở → push, gặp đóng → pop + kiểm tra match',
            template: `const stack = []
const map = { ')': '(', ']': '[', '}': '{' }
for (const c of s) {
  if ('([{'.includes(c)) stack.push(c)
  else if (stack.pop() !== map[c]) return false
}
return stack.length === 0`,
            complexity: 'Time: O(n) | Space: O(n)',
            example: 'Valid Parentheses, Min Remove Invalid Parens',
        },
    },
    {
        id: 'stack-monotonic',
        pattern: 'Stack',
        emoji: '📚',
        color: '#a78bfa',
        front: {
            signal: 'Next Greater / Smaller Element',
            question: '[2,1,2,4,3] → next greater: [4,2,4,-1,-1]',
        },
        back: {
            approach: 'Monotonic stack: pop khi gặp phần tử lớn/nhỏ hơn top',
            template: `const result = new Array(n).fill(-1)
const stack = [] // chứa indices
for (let i = 0; i < nums.length; i++) {
  while (stack.length && nums[stack.at(-1)] < nums[i]) {
    result[stack.pop()] = nums[i]
  }
  stack.push(i)
}`,
            complexity: 'Time: O(n) | Space: O(n)',
            example: 'Next Greater Element, Daily Temperatures, Stock Span',
        },
    },
    {
        id: 'binary-search',
        pattern: 'Binary Search',
        emoji: '🔍',
        color: '#f472b6',
        front: {
            signal: 'Tìm trong sorted array / tìm boundary',
            question: 'sorted = [1,3,5,7,9], target = 5 → index 2',
        },
        back: {
            approach: 'while left <= right, chia đôi, so sánh mid',
            template: `let left = 0, right = arr.length - 1
while (left <= right) {
  const mid = Math.floor((left + right) / 2)
  if (arr[mid] === target) return mid
  if (arr[mid] < target) left = mid + 1
  else right = mid - 1
}
return -1`,
            complexity: 'Time: O(log n) | Space: O(1)',
            example: 'Binary Search, Search Insert Position, Peak Element',
        },
    },
    {
        id: 'bfs',
        pattern: 'BFS',
        emoji: '🌊',
        color: '#06b6d4',
        front: {
            signal: 'Level-order traversal / Shortest path (unweighted)',
            question: 'Tree level order: [[3],[9,20],[15,7]]',
        },
        back: {
            approach: 'Queue + while, xử lý từng level',
            template: `const queue = [root]
while (queue.length) {
  const levelSize = queue.length
  for (let i = 0; i < levelSize; i++) {
    const node = queue.shift()
    // process node
    if (node.left) queue.push(node.left)
    if (node.right) queue.push(node.right)
  }
}`,
            complexity: 'Time: O(n) | Space: O(n)',
            example: 'Level Order Traversal, Rotting Oranges, Word Ladder',
        },
    },
    {
        id: 'dfs',
        pattern: 'DFS',
        emoji: '🌲',
        color: '#22c55e',
        front: {
            signal: 'Duyệt hết nhánh / Path sum / Đảo cây',
            question: 'Max depth of binary tree',
        },
        back: {
            approach: 'Recursive: base case + gọi left/right',
            template: `function dfs(node) {
  if (!node) return 0 // base case
  const left = dfs(node.left)
  const right = dfs(node.right)
  return Math.max(left, right) + 1
}`,
            complexity: 'Time: O(n) | Space: O(h) h=height',
            example: 'Max Depth, Invert Tree, Path Sum, Same Tree',
        },
    },
    {
        id: 'dp-fibonacci',
        pattern: 'Dynamic Programming',
        emoji: '📊',
        color: '#f97316',
        front: {
            signal: 'Đếm số cách / tối ưu min-max với subproblems chồng nhau',
            question: 'Climbing stairs: mỗi bước 1 hoặc 2 bậc → bao nhiêu cách?',
        },
        back: {
            approach: 'dp[i] phụ thuộc vào dp[i-1], dp[i-2]...',
            template: `const dp = new Array(n + 1).fill(0)
dp[0] = 1
dp[1] = 1
for (let i = 2; i <= n; i++) {
  dp[i] = dp[i - 1] + dp[i - 2]
}
return dp[n]`,
            complexity: 'Time: O(n) | Space: O(n) → O(1) optimized',
            example: 'Climbing Stairs, House Robber, Coin Change, Fibonacci',
        },
    },
    {
        id: 'backtracking',
        pattern: 'Backtracking',
        emoji: '🔙',
        color: '#ec4899',
        front: {
            signal: 'Tất cả combinations / permutations / subsets',
            question: '[1,2,3] → subsets: [],[1],[2],[3],[1,2],[1,3],[2,3],[1,2,3]',
        },
        back: {
            approach: 'Chọn → Explore → Bỏ chọn (backtrack)',
            template: `function backtrack(start, current) {
  result.push([...current])
  for (let i = start; i < nums.length; i++) {
    current.push(nums[i])      // chọn
    backtrack(i + 1, current)   // explore
    current.pop()               // bỏ chọn
  }
}`,
            complexity: 'Time: O(2^n) | Space: O(n)',
            example: 'Subsets, Permutations, Combination Sum, N-Queens',
        },
    },
]

// ═══════════════════════════════════════════════
//  Topic colors + emoji
// ═══════════════════════════════════════════════
const topicConfig: Record<Topic, { color: string; emoji: string }> = {
    JavaScript: { color: '#fbbf24', emoji: '⚡' },
    React: { color: '#61dafb', emoji: '⚛️' },
    CSS: { color: '#38bdf8', emoji: '🎨' },
    HTML: { color: '#f97316', emoji: '📄' },
    'Web APIs': { color: '#a78bfa', emoji: '🌐' },
    Security: { color: '#ef4444', emoji: '🔒' },
    Performance: { color: '#22c55e', emoji: '⚡' },
    Testing: { color: '#06b6d4', emoji: '🧪' },
    Async: { color: '#818cf8', emoji: '⏳' },
    OOP: { color: '#f472b6', emoji: '🧬' },
    Networking: { color: '#14b8a6', emoji: '📡' },
    Closure: { color: '#e879f9', emoji: '📦' },
}

const difficultyConfig: Record<Difficulty, { color: string; bg: string }> = {
    Easy: { color: '#4ade80', bg: 'rgba(74, 222, 128, 0.15)' },
    Medium: { color: '#fbbf24', bg: 'rgba(251, 191, 36, 0.15)' },
    Hard: { color: '#ef4444', bg: 'rgba(239, 68, 68, 0.15)' },
}

const allTopics: Topic[] = ['JavaScript', 'React', 'CSS', 'HTML', 'Async', 'OOP', 'Closure', 'Security', 'Performance', 'Networking', 'Web APIs', 'Testing']

// ═══════════════════════════════════════════════
//  Study Tips Component
// ═══════════════════════════════════════════════

function StudyTips() {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className="mt-8">
            <button
                onClick={() => setIsOpen(o => !o)}
                className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200"
                style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-primary)',
                    color: 'var(--text-secondary)',
                }}
            >
                {isOpen ? '▼' : '▶'} 🧠 Cách ghi nhớ cú pháp thuật toán
            </button>
            {isOpen && (
                <div className="mt-3 p-5 rounded-xl text-sm leading-relaxed space-y-6"
                    style={{ background: 'var(--bg-card)', border: '1px solid var(--border-primary)', color: 'var(--text-secondary)' }}>
                    <div>
                        <h3 className="font-bold text-[var(--text-primary)] mb-2">1. Nhớ Pattern, không nhớ code</h3>
                        <pre className="p-3 rounded-lg text-xs font-mono leading-relaxed" style={{ background: 'var(--bg-tag)', border: '1px solid var(--border-primary)' }}>
                            {`🗂️ HashMap:      "Duyệt 1 lần, check Map trước, lưu Map sau"
👉 Two Pointers:  "2 con trỏ, thu hẹp từ 2 đầu"
🪟 Sliding Window: "for mở rộng right, while thu hẹp left"
📚 Stack:         "Gặp mở → push, gặp đóng → pop + kiểm tra"
🔍 Binary Search: "while left <= right, mid = floor((l+r)/2)"`}
                        </pre>
                    </div>
                    <div>
                        <h3 className="font-bold text-[var(--text-primary)] mb-2">2. Quy tắc 3 lần viết tay</h3>
                        <p className="text-[var(--text-muted)]">Lần 1: Đọc + hiểu + tự code lại → Lần 2: Ngày hôm sau, code lại <strong>không xem</strong> → Lần 3: 1 tuần sau. Sau 3 lần → <strong className="text-[var(--text-primary)]">muscle memory</strong> 💪</p>
                    </div>
                </div>
            )}
        </div>
    )
}

// ═══════════════════════════════════════════════
//  Flashcard App (Tabs: Algorithm | Interview)
// ═══════════════════════════════════════════════

type TabMode = 'algorithm' | 'interview'
type Lang = 'vi' | 'en'

export default function FlashcardApp() {
    const [tab, setTab] = useState<TabMode>('interview')
    const [lang, setLang] = useState<Lang>('vi')
    const [selectedTopics, setSelectedTopics] = useState<Set<Topic>>(new Set())
    const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'All'>('All')

    // Algorithm state
    const [algoIndex, setAlgoIndex] = useState(0)
    const [algoFlipped, setAlgoFlipped] = useState(false)
    const [algoKnown, setAlgoKnown] = useState<Set<string>>(new Set())
    const [algoCards, setAlgoCards] = useState(algoFlashcards)

    // Interview state
    const [interviewIndex, setInterviewIndex] = useState(0)
    const [interviewFlipped, setInterviewFlipped] = useState(false)
    const [interviewKnown, setInterviewKnown] = useState<Set<string>>(new Set())
    const [shuffleSeed, setShuffleSeed] = useState(0)

    // Filter + shuffle interview cards
    const filteredInterviewCards = useMemo(() => {
        let cards = [...interviewCards]
        if (selectedTopics.size > 0) {
            cards = cards.filter(c => selectedTopics.has(c.topic))
        }
        if (selectedDifficulty !== 'All') {
            cards = cards.filter(c => c.difficulty === selectedDifficulty)
        }
        if (shuffleSeed > 0) {
            for (let i = cards.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [cards[i], cards[j]] = [cards[j], cards[i]]
            }
        }
        return cards
    }, [selectedTopics, selectedDifficulty, shuffleSeed])

    // Reset index when filters change
    useEffect(() => {
        setInterviewIndex(0)
        setInterviewFlipped(false)
    }, [selectedTopics, selectedDifficulty])

    // Current card
    const currentCards = tab === 'algorithm' ? algoCards : filteredInterviewCards
    const currentIndex = tab === 'algorithm' ? algoIndex : interviewIndex
    const isFlipped = tab === 'algorithm' ? algoFlipped : interviewFlipped
    const knownCards = tab === 'algorithm' ? algoKnown : interviewKnown

    const currentCard = currentCards[currentIndex]

    const setFlipped = tab === 'algorithm' ? setAlgoFlipped : setInterviewFlipped
    const setIndex = tab === 'algorithm' ? setAlgoIndex : setInterviewIndex
    const setKnown = tab === 'algorithm' ? setAlgoKnown : setInterviewKnown

    const goNext = useCallback(() => {
        setFlipped(false)
        setTimeout(() => setIndex(i => (i + 1) % currentCards.length), 150)
    }, [currentCards.length, setFlipped, setIndex])

    const goPrev = useCallback(() => {
        setFlipped(false)
        setTimeout(() => setIndex(i => (i - 1 + currentCards.length) % currentCards.length), 150)
    }, [currentCards.length, setFlipped, setIndex])

    const shuffle = useCallback(() => {
        if (tab === 'algorithm') {
            setAlgoCards(prev => [...prev].sort(() => Math.random() - 0.5))
        } else {
            setShuffleSeed(s => s + 1)
        }
        setIndex(0)
        setFlipped(false)
    }, [tab, setIndex, setFlipped])

    const toggleKnown = useCallback(() => {
        if (!currentCard) return
        const id = 'id' in currentCard ? currentCard.id : ''
        setKnown(prev => {
            const next = new Set(prev)
            if (next.has(id)) next.delete(id)
            else next.add(id)
            return next
        })
    }, [currentCard, setKnown])

    const toggleTopic = (topic: Topic) => {
        setSelectedTopics(prev => {
            const next = new Set(prev)
            if (next.has(topic)) next.delete(topic)
            else next.add(topic)
            return next
        })
    }

    // Keyboard shortcuts
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); setFlipped(f => !f) }
            if (e.key === 'ArrowRight' || e.key === 'l') goNext()
            if (e.key === 'ArrowLeft' || e.key === 'h') goPrev()
            if (e.key === 'k') toggleKnown()
            if (e.key === 's') shuffle()
        }
        window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
    }, [goNext, goPrev, toggleKnown, shuffle, setFlipped])

    const progress = knownCards.size
    const total = currentCards.length

    const cardId = currentCard && 'id' in currentCard ? currentCard.id : ''

    return (
        <div className="dark">
            <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] p-4 sm:p-8">
                <div className="max-w-2xl mx-auto">
                    {/* Tab Bar */}
                    <div className="flex gap-2 mb-6">
                        <button
                            onClick={() => setTab('algorithm')}
                            className="flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
                            style={{
                                background: tab === 'algorithm' ? 'rgba(251, 191, 36, 0.15)' : 'var(--bg-card)',
                                border: tab === 'algorithm' ? '1px solid rgba(251, 191, 36, 0.4)' : '1px solid var(--border-primary)',
                                color: tab === 'algorithm' ? '#fbbf24' : 'var(--text-muted)',
                            }}
                        >
                            🧮 Algorithm ({algoCards.length})
                        </button>
                        <button
                            onClick={() => setTab('interview')}
                            className="flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
                            style={{
                                background: tab === 'interview' ? 'rgba(56, 189, 248, 0.15)' : 'var(--bg-card)',
                                border: tab === 'interview' ? '1px solid rgba(56, 189, 248, 0.4)' : '1px solid var(--border-primary)',
                                color: tab === 'interview' ? '#38bdf8' : 'var(--text-muted)',
                            }}
                        >
                            💼 Interview ({interviewCards.length})
                        </button>
                    </div>

                    {/* Interview Filters */}
                    {tab === 'interview' && (
                        <div className="mb-4 space-y-3">
                            {/* Language toggle + Difficulty */}
                            <div className="flex items-center gap-2 flex-wrap">
                                <button
                                    onClick={() => setLang(l => l === 'vi' ? 'en' : 'vi')}
                                    className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                                    style={{
                                        background: 'rgba(168, 85, 247, 0.15)',
                                        border: '1px solid rgba(168, 85, 247, 0.4)',
                                        color: '#a855f7',
                                    }}
                                >
                                    {lang === 'vi' ? '🇻🇳 VI' : '🇬🇧 EN'}
                                </button>
                                <div className="h-4 w-px bg-[var(--border-primary)]" />
                                {(['All', 'Easy', 'Medium', 'Hard'] as const).map(d => (
                                    <button
                                        key={d}
                                        onClick={() => setSelectedDifficulty(d)}
                                        className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                                        style={{
                                            background: selectedDifficulty === d
                                                ? (d === 'All' ? 'rgba(255,255,255,0.1)' : difficultyConfig[d as Difficulty].bg)
                                                : 'var(--bg-tag)',
                                            border: selectedDifficulty === d
                                                ? `1px solid ${d === 'All' ? 'var(--border-primary)' : difficultyConfig[d as Difficulty].color}40`
                                                : '1px solid transparent',
                                            color: selectedDifficulty === d
                                                ? (d === 'All' ? 'var(--text-secondary)' : difficultyConfig[d as Difficulty].color)
                                                : 'var(--text-muted)',
                                        }}
                                    >
                                        {d}
                                    </button>
                                ))}
                            </div>
                            {/* Topic pills */}
                            <div className="flex flex-wrap gap-1.5">
                                {allTopics.map(topic => {
                                    const isSelected = selectedTopics.has(topic)
                                    const cfg = topicConfig[topic]
                                    const count = interviewCards.filter(c => c.topic === topic).length
                                    return (
                                        <button
                                            key={topic}
                                            onClick={() => toggleTopic(topic)}
                                            className="px-2.5 py-1 rounded-lg text-xs font-medium transition-all"
                                            style={{
                                                background: isSelected ? `${cfg.color}20` : 'var(--bg-tag)',
                                                border: isSelected ? `1px solid ${cfg.color}40` : '1px solid transparent',
                                                color: isSelected ? cfg.color : 'var(--text-muted)',
                                            }}
                                        >
                                            {cfg.emoji} {topic} ({count})
                                        </button>
                                    )
                                })}
                                {selectedTopics.size > 0 && (
                                    <button
                                        onClick={() => setSelectedTopics(new Set())}
                                        className="px-2.5 py-1 rounded-lg text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
                                    >
                                        ✕ Clear
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Progress */}
                    <div className="mb-6">
                        <div className="flex justify-between text-xs text-[var(--text-muted)] mb-1">
                            <span>🧠 Đã thuộc: {progress}/{total}</span>
                            <span>{total > 0 ? currentIndex + 1 : 0} / {total}</span>
                        </div>
                        <div className="h-2 rounded-full bg-[var(--bg-tag)] overflow-hidden">
                            <div
                                className="h-full rounded-full transition-all duration-500"
                                style={{
                                    width: `${total > 0 ? (progress / total) * 100 : 0}%`,
                                    background: 'linear-gradient(90deg, #4ade80, #22d3ee, #818cf8)',
                                }}
                            />
                        </div>
                    </div>

                    {/* Empty state */}
                    {total === 0 && (
                        <div className="text-center py-20 text-[var(--text-muted)]">
                            <p className="text-4xl mb-3">🔍</p>
                            <p className="text-sm">Không có câu hỏi nào phù hợp bộ lọc</p>
                            <button
                                onClick={() => { setSelectedTopics(new Set()); setSelectedDifficulty('All') }}
                                className="mt-3 px-4 py-2 rounded-lg text-xs font-medium"
                                style={{ background: 'var(--bg-tag)', border: '1px solid var(--border-primary)', color: 'var(--text-secondary)' }}
                            >
                                Clear filters
                            </button>
                        </div>
                    )}

                    {/* Flashcard */}
                    {currentCard && total > 0 && (
                        <>
                            <div
                                className="relative cursor-pointer mb-6"
                                style={{ perspective: '1000px', minHeight: tab === 'algorithm' ? '380px' : '340px' }}
                                onClick={() => setFlipped(f => !f)}
                            >
                                <div
                                    className="relative w-full transition-transform duration-500"
                                    style={{
                                        transformStyle: 'preserve-3d',
                                        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                                        minHeight: tab === 'algorithm' ? '380px' : '340px',
                                    }}
                                >
                                    {/* ═══ FRONT ═══ */}
                                    <div
                                        className="absolute inset-0 rounded-2xl p-6 sm:p-8 flex flex-col justify-between"
                                        style={{
                                            backfaceVisibility: 'hidden',
                                            background: `linear-gradient(135deg, var(--bg-card), var(--bg-surface))`,
                                            border: '1px solid var(--border-primary)',
                                            boxShadow: 'var(--shadow-xl)',
                                        }}
                                    >
                                        {tab === 'algorithm' ? (
                                            /* Algorithm Front */
                                            <div>
                                                <div className="mb-2">
                                                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-[var(--bg-tag)] border border-[var(--border-primary)] text-[var(--text-muted)]">
                                                        🤔 Bài toán này dùng thuật toán gì?
                                                    </span>
                                                </div>
                                                <div className="mb-6 mt-6">
                                                    <p className="text-xl sm:text-2xl font-bold leading-snug">{(currentCard as AlgoFlashcard).front.signal}</p>
                                                </div>
                                                <div className="p-4 rounded-xl bg-[var(--bg-tag)] border border-[var(--border-primary)]">
                                                    <p className="text-[var(--text-muted)] text-xs mb-1">Ví dụ:</p>
                                                    <code className="text-sm text-[var(--text-secondary)] font-mono">{(currentCard as AlgoFlashcard).front.question}</code>
                                                </div>
                                            </div>
                                        ) : (
                                            /* Interview Front */
                                            <div>
                                                <div className="flex items-center gap-2 mb-4 flex-wrap">
                                                    <span
                                                        className="px-2.5 py-1 rounded-lg text-xs font-medium"
                                                        style={{
                                                            background: `${topicConfig[(currentCard as typeof interviewCards[0]).topic].color}20`,
                                                            color: topicConfig[(currentCard as typeof interviewCards[0]).topic].color,
                                                            border: `1px solid ${topicConfig[(currentCard as typeof interviewCards[0]).topic].color}30`,
                                                        }}
                                                    >
                                                        {topicConfig[(currentCard as typeof interviewCards[0]).topic].emoji} {(currentCard as typeof interviewCards[0]).topic}
                                                    </span>
                                                    <span
                                                        className="px-2.5 py-1 rounded-lg text-xs font-medium"
                                                        style={{
                                                            background: difficultyConfig[(currentCard as typeof interviewCards[0]).difficulty].bg,
                                                            color: difficultyConfig[(currentCard as typeof interviewCards[0]).difficulty].color,
                                                        }}
                                                    >
                                                        {(currentCard as typeof interviewCards[0]).difficulty}
                                                    </span>
                                                </div>
                                                <p className="text-lg sm:text-xl font-bold leading-relaxed mt-4">{(currentCard as typeof interviewCards[0]).question}</p>
                                            </div>
                                        )}
                                        <p className="text-center text-[var(--text-muted)] text-xs mt-4 animate-pulse">
                                            👆 Click để xem đáp án
                                        </p>
                                    </div>

                                    {/* ═══ BACK ═══ */}
                                    <div
                                        className="absolute inset-0 rounded-2xl p-6 sm:p-8 overflow-y-auto"
                                        style={{
                                            backfaceVisibility: 'hidden',
                                            transform: 'rotateY(180deg)',
                                            background: `linear-gradient(135deg, var(--bg-card), var(--bg-surface))`,
                                            border: tab === 'algorithm'
                                                ? `1px solid ${(currentCard as AlgoFlashcard).color}33`
                                                : `1px solid ${topicConfig[(currentCard as typeof interviewCards[0]).topic]?.color || '#888'}33`,
                                            boxShadow: tab === 'algorithm'
                                                ? `0 0 40px ${(currentCard as AlgoFlashcard).color}15`
                                                : `0 0 40px ${topicConfig[(currentCard as typeof interviewCards[0]).topic]?.color || '#888'}15`,
                                        }}
                                    >
                                        {tab === 'algorithm' ? (
                                            /* Algorithm Back */
                                            <>
                                                <div className="flex items-center gap-2 mb-4">
                                                    <span className="text-2xl">{(currentCard as AlgoFlashcard).emoji}</span>
                                                    <span
                                                        className="px-3 py-1 rounded-full text-xs font-bold"
                                                        style={{
                                                            background: `${(currentCard as AlgoFlashcard).color}20`,
                                                            color: (currentCard as AlgoFlashcard).color,
                                                            border: `1px solid ${(currentCard as AlgoFlashcard).color}40`,
                                                        }}
                                                    >
                                                        {(currentCard as AlgoFlashcard).pattern}
                                                    </span>
                                                </div>
                                                <div className="mb-3">
                                                    <p className="text-[var(--text-muted)] text-xs uppercase tracking-wider mb-1">Cách tiếp cận</p>
                                                    <p className="text-base font-semibold" style={{ color: (currentCard as AlgoFlashcard).color }}>{(currentCard as AlgoFlashcard).back.approach}</p>
                                                </div>
                                                <div className="mb-3">
                                                    <p className="text-[var(--text-muted)] text-xs uppercase tracking-wider mb-1">Template Code</p>
                                                    <pre className="p-3 rounded-xl text-xs font-mono overflow-x-auto leading-relaxed"
                                                        style={{ background: 'var(--bg-tag)', border: '1px solid var(--border-primary)', color: 'var(--text-secondary)' }}>
                                                        {(currentCard as AlgoFlashcard).back.template}
                                                    </pre>
                                                </div>
                                                <div className="flex gap-3 text-xs">
                                                    <div className="flex-1 p-2 rounded-lg bg-[var(--bg-tag)] border border-[var(--border-primary)]">
                                                        <span className="text-[var(--text-muted)]">⏱️ </span>
                                                        <span className="text-[var(--text-secondary)]">{(currentCard as AlgoFlashcard).back.complexity}</span>
                                                    </div>
                                                </div>
                                                <div className="mt-3">
                                                    <p className="text-[var(--text-muted)] text-xs uppercase tracking-wider mb-1">Bài LeetCode</p>
                                                    <p className="text-xs text-[var(--text-secondary)]">{(currentCard as AlgoFlashcard).back.example}</p>
                                                </div>
                                            </>
                                        ) : (
                                            /* Interview Back */
                                            <>
                                                <div className="flex items-center gap-2 mb-4">
                                                    <span
                                                        className="px-2.5 py-1 rounded-lg text-xs font-medium"
                                                        style={{
                                                            background: `${topicConfig[(currentCard as typeof interviewCards[0]).topic].color}20`,
                                                            color: topicConfig[(currentCard as typeof interviewCards[0]).topic].color,
                                                        }}
                                                    >
                                                        {topicConfig[(currentCard as typeof interviewCards[0]).topic].emoji} {(currentCard as typeof interviewCards[0]).topic}
                                                    </span>
                                                    <span
                                                        className="px-2.5 py-1 rounded-lg text-xs font-medium"
                                                        style={{
                                                            background: difficultyConfig[(currentCard as typeof interviewCards[0]).difficulty].bg,
                                                            color: difficultyConfig[(currentCard as typeof interviewCards[0]).difficulty].color,
                                                        }}
                                                    >
                                                        {(currentCard as typeof interviewCards[0]).difficulty}
                                                    </span>
                                                </div>
                                                <div className="mb-3">
                                                    <p className="text-[var(--text-muted)] text-xs uppercase tracking-wider mb-2">
                                                        {lang === 'vi' ? '💡 Câu trả lời' : '💡 Answer'}
                                                    </p>
                                                    <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                                                        {lang === 'vi'
                                                            ? (currentCard as typeof interviewCards[0]).answer_vi
                                                            : (currentCard as typeof interviewCards[0]).answer_en
                                                        }
                                                    </p>
                                                </div>
                                            </>
                                        )}
                                        <p className="text-center text-[var(--text-muted)] text-xs mt-3">
                                            👆 Click để quay lại
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Controls */}
                            <div className="flex items-center justify-center gap-3 flex-wrap">
                                <button
                                    onClick={(e) => { e.stopPropagation(); goPrev() }}
                                    className="w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all duration-200 hover:scale-110"
                                    style={{ background: 'var(--bg-tag)', border: '1px solid var(--border-primary)' }}
                                    title="Trước (←)"
                                >←</button>

                                <button
                                    onClick={(e) => { e.stopPropagation(); setFlipped(f => !f) }}
                                    className="px-5 h-12 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 hover:scale-105"
                                    style={{
                                        background: 'rgba(56, 189, 248, 0.15)',
                                        border: '1px solid rgba(56, 189, 248, 0.4)',
                                        color: '#38bdf8',
                                    }}
                                    title="Lật thẻ (Space)"
                                >🔄 Lật</button>

                                <button
                                    onClick={(e) => { e.stopPropagation(); shuffle() }}
                                    className="px-5 h-12 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 hover:scale-105"
                                    style={{
                                        background: 'rgba(251, 191, 36, 0.15)',
                                        border: '1px solid rgba(251, 191, 36, 0.4)',
                                        color: '#fbbf24',
                                    }}
                                    title="Trộn thẻ (S)"
                                >🎲 Trộn</button>

                                <button
                                    onClick={(e) => { e.stopPropagation(); toggleKnown() }}
                                    className="px-5 h-12 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 hover:scale-105"
                                    style={{
                                        background: knownCards.has(cardId) ? 'rgba(74, 222, 128, 0.2)' : 'var(--bg-tag)',
                                        border: knownCards.has(cardId) ? '1px solid rgba(74, 222, 128, 0.5)' : '1px solid var(--border-primary)',
                                        color: knownCards.has(cardId) ? '#4ade80' : 'var(--text-secondary)',
                                    }}
                                    title="Đánh dấu đã thuộc (K)"
                                >{knownCards.has(cardId) ? '✅ Thuộc' : '☐ Thuộc?'}</button>

                                <button
                                    onClick={(e) => { e.stopPropagation(); goNext() }}
                                    className="w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all duration-200 hover:scale-110"
                                    style={{ background: 'var(--bg-tag)', border: '1px solid var(--border-primary)' }}
                                    title="Sau (→)"
                                >→</button>
                            </div>
                        </>
                    )}

                    {/* Keyboard shortcuts hint */}
                    <div className="mt-6 text-center">
                        <p className="text-xs text-[var(--text-muted)]">
                            ⌨️ <kbd className="px-1.5 py-0.5 rounded bg-[var(--bg-tag)] border border-[var(--border-primary)] font-mono text-[10px]">Space</kbd> Lật
                            {' · '}
                            <kbd className="px-1.5 py-0.5 rounded bg-[var(--bg-tag)] border border-[var(--border-primary)] font-mono text-[10px]">← →</kbd> Chuyển
                            {' · '}
                            <kbd className="px-1.5 py-0.5 rounded bg-[var(--bg-tag)] border border-[var(--border-primary)] font-mono text-[10px]">K</kbd> Thuộc
                            {' · '}
                            <kbd className="px-1.5 py-0.5 rounded bg-[var(--bg-tag)] border border-[var(--border-primary)] font-mono text-[10px]">S</kbd> Trộn
                        </p>
                    </div>

                    {/* Study Tips (only for algorithm tab) */}
                    {tab === 'algorithm' && <StudyTips />}
                </div>
            </div>
        </div>
    )
}
