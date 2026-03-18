'use client'
import { CodeBlock, Heading2, Heading3, Paragraph, Highlight, InlineCode, Callout } from '../../../components/BlogComponents'
import { TopicModal } from '../../../components/TopicModal'

export default function Phase3ReactFrontend() {
    return (
        <>
            <Heading2>Phase 3 — React & Deep Frontend (4-6 weeks)</Heading2>

            <Heading3>3.1 React (click for details)</Heading3>
            <div className="my-4 space-y-2">
                <TopicModal title="Virtual DOM &amp; Reconciliation" emoji="🌳" color="#61DAFB" summary="React compares old vs new tree, only updates what changed — like git diff for UI">
                    <Paragraph>Imagine you have an <Highlight>old shopping list</Highlight> and a <Highlight>new one</Highlight>. The dumb way: tear up the whole list, rewrite from scratch. The smart way: compare → just cross out &quot;Milk&quot;, add &quot;Butter&quot; → keep the rest. <strong>Reconciliation = the smart way</strong> — like <Highlight>git diff</Highlight> for UI!</Paragraph>

                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-slate-800/60 border border-white/5">
                        <div className="text-slate-300 text-sm font-mono">
                            {'Old:  🥚 Eggs, 🥛 Milk, 🍞 Bread'}<br />
                            {'New: 🥚 Eggs, 🧈 Butter, 🍞 Bread'}<br /><br />
                            {'❌ Tear up the whole list, rewrite from scratch'}<br />
                            {'✅ Compare → just cross out Milk, add Butter → keep the rest'}
                        </div>
                    </div>

                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">{'🔄 When state changes — what happens?'}</div>
                        <div className="text-slate-300 text-sm mt-1">
                            {'1. State/props change → React creates '}<strong>new Virtual DOM</strong>{' (a JS object tree)'}<br />
                            {'2. '}<strong>Compares</strong>{' old tree vs new tree (diffing)'}<br />
                            {'3. Finds '}<strong>exactly what changed</strong><br />
                            {'4. Only updates '}<strong>those specific parts</strong>{' on the real DOM'}<br /><br />
                            {'💡 Example: count = 5 → 6 → React only changes text "5" → "6", '}<strong>doesn't touch</strong>{' the h1 or button next to it'}
                        </div>
                    </div>

                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">{'📏 2 Comparison Rules — Simple but Effective'}</div>
                        <div className="text-slate-300 text-sm mt-1">
                            <strong>{'Rule 1: Different tag type → destroy everything, rebuild'}</strong><br />
                            {'• <div> → <span> = destroy div + everything inside, create new span'}<br />
                            {'• Like swapping a '}<em>bookshelf</em>{' for a '}<em>wall rack</em>{': must remove all books, install new rack'}<br /><br />
                            <strong>{'Rule 2: Same tag type → only change different props'}</strong><br />
                            {'• <div className="old"> → <div className="new"> = only update className'}<br />
                            {'• Like '}<em>repainting a wall</em>{' — no need to demolish the house!'}
                        </div>
                    </div>

                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">{'🔑 Why is key important?'}</div>
                        <div className="text-slate-300 text-sm mt-1">
                            <strong>No key</strong>{' → React compares by position (index):'}<br />
                            {'• Add 1 item at the start = React thinks ALL items changed → re-renders everything 😱'}<br /><br />
                            <strong>With key</strong>{' → React compares by identity:'}<br />
                            {'• Add at start = React knows "oh, just 1 new item" → only inserts 1 ✅'}<br /><br />
                            {'⚠️ '}<strong>Don't use index as key!</strong>{' When reordering, state gets mixed up between items'}
                        </div>
                    </div>

                    <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="text-yellow-400 font-bold text-sm">{'⚡ Fiber — Reconciliation "Upgrade"'}</div>
                        <div className="text-slate-300 text-sm mt-1">
                            <strong>Before:</strong>{' renders everything in one go → heavy component → UI freezes 🥶'}<br />
                            <strong>After (Fiber):</strong>{' splits work → renders a bit → '}<strong>pauses for browser to paint</strong>{' → continues'}<br /><br />
                            {'Like '}<em>Pomodoro technique</em>{': work 25 min → rest 5 min → continue = more efficient!'}<br /><br />
                            {'Thanks to Fiber → React 18+ has: '}<InlineCode>Suspense</InlineCode>{', '}<InlineCode>startTransition</InlineCode>{', '}<InlineCode>useDeferredValue</InlineCode>
                        </div>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-500/10 border border-slate-500/20">
                        <div className="text-slate-300 font-bold text-sm">{'🆚 Compared to other frameworks'}</div>
                        <div className="text-slate-300 text-sm mt-1">
                            {'• '}<strong>React (VDOM)</strong>{': compares 2 trees → finds differences → updates. Easy to use but has overhead'}<br />
                            {'• '}<strong>Svelte</strong>{': compiler knows ahead of time what needs updating → no diffing needed → faster'}<br />
                            {'• '}<strong>Solid (Signals)</strong>{': each value knows who uses it → updates precisely, no component re-render'}
                        </div>
                    </div>
                </div>

                <CodeBlock title="reconciliation-examples.tsx">{`// === 1. DIFFERENT TYPE → Destroy + Rebuild ===
// Before:                      After:
<div><Counter /></div>    →    <span><Counter /></span>
// React destroys <div> + unmounts Counter (LOSES STATE!)
// Creates <span> + mounts new Counter (state resets to 0)

// === 2. SAME TYPE → Only update changed props ===
// Before:                                 After:
<div className="old" title="a" />    →    <div className="new" title="a" />
// Keeps DOM node, only changes className. title unchanged → skip

// === 3. KEY: REAL EXAMPLE ===
// List: ["A", "B"] → prepend "C": ["C", "A", "B"]

// ❌ NO KEY (compare by index):
// [0] "A" → "C"  ← React thinks item 0 changed text → update
// [1] "B" → "A"  ← update
//          "B"  ← Create new
// → ALL 3 changed! Input state mixed up 😱

// ✅ WITH KEY (compare by identity):
// key="c" → New! Insert
// key="a" → Still exists, move position
// key="b" → Still exists, keep
// → Only INSERT 1, state correct ✅

// ❌ Bad: index as key
{items.map((item, i) => <Input key={i} defaultValue={item.name} />)}
// Sort → state mixed between items!

// ✅ Good: unique ID
{items.map(item => <Input key={item.id} defaultValue={item.name} />)}`}</CodeBlock>

                <div className="my-3 overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead><tr className="border-b border-white/10">
                            <th className="text-left p-3 text-slate-400 font-medium">Scenario</th>
                            <th className="text-left p-3 text-red-400 font-medium">{'❌ No key'}</th>
                            <th className="text-left p-3 text-green-400 font-medium">{'✅ With key'}</th>
                        </tr></thead>
                        <tbody className="text-slate-300">
                            <tr className="border-b border-white/5"><td className="p-3 text-slate-400">Prepend</td><td className="p-3">Re-render all</td><td className="p-3">Insert 1 only</td></tr>
                            <tr className="border-b border-white/5"><td className="p-3 text-slate-400">Delete middle</td><td className="p-3">Shift everything</td><td className="p-3">Remove 1 only</td></tr>
                            <tr className="border-b border-white/5"><td className="p-3 text-slate-400">Reorder</td><td className="p-3">Re-render all</td><td className="p-3">Move DOM nodes</td></tr>
                            <tr><td className="p-3 text-slate-400">State</td><td className="p-3">Mixed up! 😱</td><td className="p-3">Correct ✅</td></tr>
                        </tbody>
                    </table>
                </div>

                <Callout type="tip">
                    {'Interview asks about Reconciliation? Remember '}<Highlight>3 key points</Highlight>:<br />
                    {'1️⃣ '}<strong>How it works</strong>{': compares old vs new tree → only updates differences (like git diff)'}<br />
                    {'2️⃣ '}<strong>Key</strong>{': helps React identify which items added/removed/moved → avoids unnecessary re-renders'}<br />
                    {'3️⃣ '}<strong>Fiber</strong>{': splits rendering into small chunks → UI doesn\'t freeze → Concurrent Mode'}<br />
                    {'Cover all 3 → interviewer will be impressed! 🎯'}
                </Callout>
                </TopicModal>

                <TopicModal title="Hooks deep dive" emoji="🪝" color="#61DAFB" summary="useState, useEffect, useRef, useMemo, useCallback — rules and pitfalls">
                    <Paragraph>Hooks are the <Highlight>foundation</Highlight> of modern React. Deep understanding of each hook + pitfalls = confident interview answers.</Paragraph>
                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">📦 useState — State Management</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • Basic state. <strong>Batch updates</strong> (React 18+ auto-batches in event handlers, setTimeout, promises)<br />
                                • Use <strong>function form</strong> for state depending on previous: <InlineCode>setState(prev =&gt; prev + 1)</InlineCode><br />
                                • <strong>Lazy initialization</strong>: <InlineCode>useState(() =&gt; expensiveCalc())</InlineCode> — only runs on first render<br />
                                • ⚠️ setState is <strong>async</strong> — can&apos;t read new state immediately after setting
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-slate-500/10 border border-slate-500/20">
                            <div className="text-slate-300 font-bold text-sm">⚙️ After setState — what happens?</div>
                            <div className="text-slate-400 text-sm mt-1">
                                1. React <strong>schedules update</strong> (doesn&apos;t apply immediately!)<br />
                                2. <strong>Batching</strong>: groups multiple setStates into 1 render (React 18+ batches everywhere)<br />
                                3. <strong>Render Phase</strong>: re-calls component → creates new VDOM → diffs old vs new<br />
                                4. <strong>Commit Phase</strong>: applies DOM changes → useLayoutEffect → paint → useEffect<br />
                                5. If <InlineCode>Object.is(oldState, newState)</InlineCode> = true → <Highlight>bail out</Highlight> (no re-render)<br />
                                6. Parent re-renders → <strong>all children re-render</strong> too (unless <InlineCode>React.memo</InlineCode>)
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">🔄 useEffect — Side Effects</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Dependency array</strong> determines when it runs: [] = mount only, [dep] = when dep changes<br />
                                • <strong>Cleanup function</strong> runs before each re-run AND on unmount<br />
                                • ⚠️ <strong>Stale closure</strong>: closure captures old value → use ref or function updater<br />
                                • ⚠️ <strong>Object/array deps</strong>: compared by reference → useMemo wrap or use primitive deps
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <div className="text-purple-400 font-bold text-sm">📌 useRef — Persistent References</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • Persistent reference across renders. Changing <InlineCode>.current</InlineCode> <strong>does NOT cause re-render</strong><br />
                                • Use for: <strong>DOM ref</strong>, timers, previous value, mutable variables<br />
                                • Pattern: <InlineCode>usePrevious(value)</InlineCode> — store value from previous render<br />
                                • ⚠️ Don&apos;t read/write ref in render body — only in effects or handlers
                            </div>

                            <CodeBlock title="useRef-demo.tsx">{`import { useRef, useState, useEffect } from 'react'

function RefVsState() {
  const [stateCount, setStateCount] = useState(0)
  const refCount = useRef(0)
  const renderCount = useRef(0)
  renderCount.current++ // increments every render

  return (
    <div>
      {/* Click → re-render → UI updates */}
      <button onClick={() => setStateCount(p => p + 1)}>
        useState: {stateCount}
      </button>

      {/* Click → NO re-render → UI does NOT update */}
      <button onClick={() => { refCount.current++ }}>
        useRef: {refCount.current}
      </button>

      <p>Rendered {renderCount.current} times</p>
      {/* 💡 Click useRef 5 times → UI still shows 0
          Click useState once → UI shows useRef = 5 (silently changed!) */}
    </div>
  )
}

// 📌 Pattern: usePrevious — store value from previous render
function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>()
  useEffect(() => { ref.current = value })
  return ref.current // returns OLD value (before effect runs)
}

// 🔥 Real-world example: Reading Progress Bar
// Why useRef instead of useState? Scroll fires ~60 times/sec
// useState → 60 re-renders/s 😱 | useRef → 0 re-renders ✅
function ReadingProgressBar() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      if (!barRef.current) return
      const docH = document.documentElement.scrollHeight - window.innerHeight
      const pct = docH > 0 ? Math.min(window.scrollY / docH, 1) : 0
      // Write directly to DOM — NO setState!
      barRef.current.style.transform = \`scaleX(\${pct})\`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-50">
      <div
        ref={barRef} // ← useRef for direct DOM access
        className="h-full w-full origin-left bg-gradient-to-r
                   from-cyan-400 via-blue-500 to-purple-500"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  )
  // 💡 scaleX instead of width → runs on GPU, no layout trigger
  // 💡 passive: true → browser knows no preventDefault → smoother scroll
}`}</CodeBlock>
                        </div>

                        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                            <div className="text-yellow-400 font-bold text-sm">🧠 useMemo & useCallback — Memoization</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>useMemo</strong>: cache expensive computations. Only recalculates when deps change<br />
                                • <strong>useCallback</strong>: cache function reference. Important when passing to React.memo children<br />
                                • ⚠️ Don&apos;t overuse — has <strong>overhead</strong> (comparing deps every render)<br />
                                • Rule: only use when <strong>React DevTools Profiler</strong> confirms a bottleneck
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                            <div className="text-cyan-400 font-bold text-sm">⏱️ useLayoutEffect vs useEffect</div>
                            <div className="text-slate-300 text-sm mt-1">
                                <strong>Timeline:</strong> Render → DOM mutation → <Highlight>useLayoutEffect</Highlight> (sync) → Paint → <Highlight>useEffect</Highlight> (async)<br /><br />
                                • <strong>useEffect</strong> (99%): runs <strong>AFTER paint</strong> — doesn&apos;t block UI, use for API calls, subscriptions<br />
                                • <strong>useLayoutEffect</strong>: runs <strong>BEFORE paint</strong> — blocks paint, use when you need to <strong>measure DOM then update</strong> without user seeing a flash<br />
                                • ⚠️ Overusing useLayoutEffect = <strong>blocking render</strong> = frozen UI. Only use to prevent visual flicker
                            </div>

                            <div className="mt-3 p-3 rounded-lg bg-slate-800/60 border border-white/5">
                                <div className="text-cyan-300 font-bold text-xs mb-2">🏠 Memory Palace — The &quot;House Painting&quot; Analogy</div>
                                <div className="text-slate-300 text-sm">
                                    Imagine you&apos;re <strong>repainting your living room</strong>:<br /><br />
                                    <strong>🖌️ useEffect (regular painter):</strong><br />
                                    The painter &quot;hangs the painting on the wall, lets guests in, THEN repaints the painting&quot;.
                                    Guests <strong>see the old painting for a second before the new one appears</strong> → <em>flicker!</em><br /><br />
                                    <strong>🚨 useLayoutEffect (emergency painter):</strong><br />
                                    The painter &quot;hangs + repaints EVERYTHING before opening the door for guests&quot;.
                                    Guests <strong>only ever see the new painting</strong> — never the old one → <em>no flicker!</em><br /><br />
                                    ⚡ <strong>The cost:</strong> useLayoutEffect = emergency painter = <strong>guests wait outside</strong> (blocks paint).
                                    If painting takes too long → UI freezes.
                                </div>
                            </div>

                            <div className="mt-3 p-3 rounded-lg bg-slate-800/60 border border-white/5">
                                <div className="text-cyan-300 font-bold text-xs mb-2">💻 Real Example — Tooltip positioning</div>
                                <div className="text-slate-300 text-xs font-mono whitespace-pre-wrap bg-slate-900/60 p-2 rounded mt-1">{`// ❌ useEffect — tooltip JUMPS position (flicker)
function Tooltip({ anchor }) {
  const [pos, setPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    // Runs AFTER paint → user sees tooltip at (0,0)
    // then it JUMPS to correct position → JANK!
    const rect = anchor.getBoundingClientRect()
    setPos({ x: rect.left, y: rect.bottom })
  }, [anchor])

  return <div style={{ left: pos.x, top: pos.y }}>...</div>
}

// ✅ useLayoutEffect — tooltip in correct position immediately
function Tooltip({ anchor }) {
  const [pos, setPos] = useState({ x: 0, y: 0 })

  useLayoutEffect(() => {
    // Runs BEFORE paint → measure + set position
    // → user only sees tooltip in the right spot
    const rect = anchor.getBoundingClientRect()
    setPos({ x: rect.left, y: rect.bottom })
  }, [anchor])

  return <div style={{ left: pos.x, top: pos.y }}>...</div>
}`}
                                </div>
                            </div>

                            <div className="mt-3 p-3 rounded-lg bg-slate-800/60 border border-white/5">
                                <div className="text-cyan-300 font-bold text-xs mb-2">📋 When to use which?</div>
                                <div className="text-slate-300 text-sm">
                                    <strong>useEffect (99%):</strong> API calls, event listeners, analytics, subscriptions — anything <strong>not related to layout</strong><br /><br />
                                    <strong>useLayoutEffect (1%):</strong> measuring DOM size/position, scroll sync, tooltip/popover positioning, animation setup — when you need to <strong>measure then update before the user sees anything</strong>
                                </div>
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                            <div className="text-red-400 font-bold text-sm">🌐 useContext — Global State</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • Read context value. <strong>Re-renders when context value changes</strong> — all consumers!<br />
                                • ⚠️ Performance trap: 1 context change → <strong>every consumer re-renders</strong><br />
                                • Fix: <strong>split context</strong> (ThemeContext + UserContext instead of 1 AppContext)<br />
                                • Fix: <strong>useMemo</strong> context value or use a state management library
                            </div>
                        </div>
                    </div>

                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                            <div className="text-orange-400 font-bold text-sm">🔀 useReducer — Complex State</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • Replaces useState when state has <strong>multiple sub-values</strong> or <strong>complex logic</strong><br />
                                • Pattern: <InlineCode>const [state, dispatch] = useReducer(reducer, initialState)</InlineCode><br />
                                • <strong>When to use:</strong> multi-field forms, state machines, when next state depends on action type<br />
                                • Combine <InlineCode>useContext + useReducer</InlineCode> = mini Redux (no library needed)
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                            <div className="text-indigo-400 font-bold text-sm">🆕 React 18+ New Hooks</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>useTransition</strong>: mark state updates as <Highlight>non-urgent</Highlight> → UI stays responsive during heavy renders<br />
                                • <strong>useDeferredValue</strong>: defer a value → input updates immediately, results render later<br />
                                • <strong>useId</strong>: generate unique IDs stable across server + client (SSR-safe)<br />
                                • <strong>useActionState</strong> (React 19): manage form action state (pending, error, result)
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-pink-500/10 border border-pink-500/20">
                            <div className="text-pink-400 font-bold text-sm">🛡️ React.memo — Optimize Re-renders</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • HOC wrapping component → <strong>skips re-render</strong> if props unchanged (shallow comparison)<br />
                                • Only effective with <InlineCode>useCallback</InlineCode> (for function props) + <InlineCode>useMemo</InlineCode> (for object props)<br />
                                • Custom comparator: <InlineCode>React.memo(Comp, areEqual)</InlineCode><br />
                                • ⚠️ Don&apos;t memo everything — only when render is expensive or re-renders are frequent
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-sky-500/10 border border-sky-500/20">
                            <div className="text-sky-400 font-bold text-sm">⏳ Suspense + 🌀 Portal</div>
                            <div className="text-slate-300 text-sm mt-1">
                                <strong>Suspense:</strong> declarative loading UI for async operations<br />
                                • <InlineCode>React.lazy()</InlineCode> code splitting, data fetching, nested boundaries<br />
                                • Streaming SSR: send HTML shell first, lazy load components later<br /><br />
                                <strong>Portal:</strong> render component <strong>outside parent DOM</strong> but still in React tree<br />
                                • <InlineCode>createPortal(children, domNode)</InlineCode><br />
                                • Used for: modals, tooltips, dropdowns, toasts — events still bubble up React tree
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-teal-500/10 border border-teal-500/20">
                            <div className="text-teal-400 font-bold text-sm">📊 Hooks vs Class Lifecycle</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <InlineCode>componentDidMount</InlineCode> → <InlineCode>useEffect(fn, [])</InlineCode><br />
                                • <InlineCode>componentDidUpdate</InlineCode> → <InlineCode>useEffect(fn, [deps])</InlineCode><br />
                                • <InlineCode>componentWillUnmount</InlineCode> → <InlineCode>useEffect(() =&gt; cleanup, [])</InlineCode><br />
                                • <InlineCode>shouldComponentUpdate</InlineCode> → <InlineCode>React.memo()</InlineCode><br />
                                • Interview: knowing lifecycle → hooks mapping = <Highlight>understands migration path</Highlight>
                            </div>
                        </div>
                    </div>

                    <CodeBlock title="hooks-pitfalls.tsx">{`// ⚠️ Pitfall 1: Stale closure
function Counter() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => {
      // ❌ count is always 0 (closure captured initial value)
      setCount(count + 1)
      // ✅ Fix: function updater
      setCount(prev => prev + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, []) // empty deps = closure only captures once
}

// ⚠️ Pitfall 2: Object deps → infinite loop
function UserProfile({ userId }) {
  const [user, setUser] = useState(null)
  // ❌ options is recreated every render → effect runs continuously
  const options = { includeAvatar: true }
  useEffect(() => { fetchUser(userId, options) }, [options])
  // ✅ Fix: useMemo or use primitive deps
  const options2 = useMemo(() => ({ includeAvatar: true }), [])

  // ⚠️ Pitfall 3: Missing cleanup → memory leak
  useEffect(() => {
    const ws = new WebSocket(url)
    ws.onmessage = (e) => setMessages(prev => [...prev, e.data])
    return () => ws.close() // ✅ MUST cleanup!
  }, [url])
}`}</CodeBlock>

                    <Callout type="warning"><strong>Rules of Hooks:</strong> 1) Only call at top level (not inside if/for/nested functions) 2) Only call in React components or custom hooks. Violating → unpredictable behavior.</Callout>
                    <a href="/blogs/react-hooks-chi-tiet" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 Read detailed article →</a>
                </TopicModal>

                <TopicModal title="Component Patterns" emoji="🧩" color="#61DAFB" summary="HOC, Render Props, Compound, Controlled/Uncontrolled — when to use which">
                    <Paragraph>Knowing component patterns helps you <Highlight>design flexible APIs</Highlight> and answer frontend system design questions.</Paragraph>
                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">🔲 Higher-Order Component (HOC)</div>
                            <div className="text-slate-300 text-sm mt-1">
                                Function that takes a component → returns a new component with extra logic.<br />
                                • Example: <InlineCode>withAuth(Dashboard)</InlineCode>, <InlineCode>withTheme(Button)</InlineCode><br />
                                • <strong>Pros</strong>: reuse logic, cross-cutting concerns (auth, logging, analytics)<br />
                                • <strong>Cons</strong>: wrapper hell, props collision, hard to debug (anonymous components)<br />
                                • ⚠️ Currently <strong>Custom Hooks replace most HOC use cases</strong>
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <div className="text-purple-400 font-bold text-sm">🎯 Render Props</div>
                            <div className="text-slate-300 text-sm mt-1">
                                Component receives a function via prop → calls it to render UI.<br />
                                • Example: <InlineCode>{'{\'<Mouse render={({x, y}) => <Cursor x={x} y={y} />} />\'}'}</InlineCode><br />
                                • <strong>Pros</strong>: more flexible than HOC, caller controls rendering<br />
                                • <strong>Cons</strong>: callback hell, hard to read when deeply nested<br />
                                • Still useful for: <strong>headless UI</strong> (Downshift, React Table)
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">🧱 Compound Components</div>
                            <div className="text-slate-300 text-sm mt-1">
                                Group of components sharing implicit state via Context.<br />
                                • Example: <InlineCode>{'{\'<Select> <Select.Option /> </Select>\'}'}</InlineCode>, <InlineCode>{'{\'<Tabs> <Tabs.Panel /> </Tabs>\'}'}</InlineCode><br />
                                • <strong>Pros</strong>: clean API, flexible layout, inversion of control<br />
                                • <strong>Cons</strong>: complex implementation, context overhead<br />
                                • Used in: <strong>Design System components</strong> (Radix UI, Headless UI)
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                            <div className="text-yellow-400 font-bold text-sm">🎚️ Controlled vs Uncontrolled</div>
                            <div className="text-slate-300 text-sm mt-1">
                                <strong>Controlled</strong>: React manages state (<InlineCode>value + onChange</InlineCode>). Single source of truth.<br />
                                <strong>Uncontrolled</strong>: DOM manages state (<InlineCode>useRef</InlineCode>). Use when integrating with non-React code.<br />
                                • Forms: controlled for real-time validation, uncontrolled for simple forms<br />
                                • Best practice: <strong>support both</strong> (controlled when value prop exists, uncontrolled when not)<br />
                                • 💡 <InlineCode>react-hook-form</InlineCode> internally uses <strong>uncontrolled</strong> (register via ref) → <Highlight>no re-render per keystroke</Highlight> → superior performance with 20-30 field forms
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                            <div className="text-red-400 font-bold text-sm">🪝 Custom Hooks — Modern Pattern</div>
                            <div className="text-slate-300 text-sm mt-1">
                                Extract logic into reusable hooks — <strong>replaces most HOC + Render Props</strong>.<br />
                                • <InlineCode>useLocalStorage</InlineCode>, <InlineCode>useDebounce</InlineCode>, <InlineCode>useMediaQuery</InlineCode>, <InlineCode>useIntersectionObserver</InlineCode><br />
                                • <strong>Pros</strong>: composable, no wrapper hell, easy to test<br />
                                • Convention: name starts with <InlineCode>use</InlineCode>, return object or tuple
                            </div>

                            <CodeBlock title="useLocalStorage.ts — Custom Hook example">{`import { useState, useCallback } from 'react'

// Custom hook: read/write localStorage with type safety
function useLocalStorage<T>(key: string, initialValue: T) {
  const [stored, setStored] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch { return initialValue }
  })

  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    setStored(prev => {
      const next = value instanceof Function ? value(prev) : value
      localStorage.setItem(key, JSON.stringify(next))
      return next
    })
  }, [key])

  return [stored, setValue] as const
}

// Usage — reuse in any component
function Settings() {
  const [theme, setTheme] = useLocalStorage('theme', 'dark')
  const [lang, setLang] = useLocalStorage('lang', 'en')
  return (
    <>
      <button onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}>
        {theme}
      </button>
      <select value={lang} onChange={e => setLang(e.target.value)}>
        <option value="en">English</option>
        <option value="vi">Vietnamese</option>
      </select>
      {/* 💡 Refresh page → values persist! */}
    </>
  )
}`}</CodeBlock>
                        </div>
                    </div>

                    <CodeBlock title="component-patterns.tsx">{`// 1. HOC Pattern
function withAuth<P>(Component: React.ComponentType<P>) {
  return function AuthenticatedComponent(props: P) {
    const { user } = useAuth()
    if (!user) return <Navigate to="/login" />
    return <Component {...props} user={user} />
  }
}
const ProtectedDashboard = withAuth(Dashboard)

// 2. Compound Component Pattern
const SelectContext = createContext<SelectContextType>(null!)

function Select({ children, value, onChange }) {
  return (
    <SelectContext.Provider value={{ value, onChange }}>
      <div role="listbox">{children}</div>
    </SelectContext.Provider>
  )
}
Select.Option = function Option({ value, children }) {
  const ctx = useContext(SelectContext)
  return (
    <div role="option" aria-selected={ctx.value === value}
         onClick={() => ctx.onChange(value)}>
      {children}
    </div>
  )
}

// 3. Custom Hook (replaces HOC/Render Props)
function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debounced
}`}</CodeBlock>

                    <Callout type="tip">
                        Interview trend: <Highlight>Custom Hooks</Highlight> replace most HOC and Render Props. But still need to know all patterns — legacy code + system design needs Compound Components.
                    </Callout>
                </TopicModal>

                <TopicModal title="Performance Optimization" emoji="⚡" color="#61DAFB" summary="React.memo, useMemo, useCallback, code splitting, virtualization">
                    <Paragraph>React re-renders the entire subtree when state changes. Here are techniques to <Highlight>prevent unnecessary re-renders</Highlight> and optimize performance:</Paragraph>

                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">🛡️ Prevent Unnecessary Re-renders</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>React.memo</strong>: wrap component → skip re-render if props are shallow equal<br />
                                • <strong>useMemo</strong>: cache expensive calculations (sort, filter, map large arrays)<br />
                                • <strong>useCallback</strong>: stable function reference for React.memo children<br />
                                • <strong>State colocation</strong>: push state down to the component that needs it (avoid parent re-render)
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">📦 Code Splitting & Lazy Loading</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>React.lazy + Suspense</strong>: dynamic import components<br />
                                • <strong>Route-based splitting</strong>: each page is a separate chunk<br />
                                • <strong>Component-based splitting</strong>: heavy components (rich editor, chart library)<br />
                                • <strong>Prefetch</strong>: load chunk before user clicks (onMouseEnter)
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <div className="text-purple-400 font-bold text-sm">📋 Virtualization</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • Only render items visible in viewport (10k+ items → ~20 DOM nodes)<br />
                                • <strong>react-window</strong>: lightweight, fixed-size items<br />
                                • <strong>react-virtuoso</strong>: variable-size, auto-measure, grouping<br />
                                • When to use: list {'>'} 100 items, or any list causing lag
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                            <div className="text-yellow-400 font-bold text-sm">🔍 Profiling & Debugging</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>React DevTools Profiler</strong>: see which components re-render, how long<br />
                                • <strong>why-did-you-render</strong>: library that logs unnecessary re-renders<br />
                                • <strong>Chrome Performance tab</strong>: flame chart, main thread blocking<br />
                                • <strong>Lighthouse</strong>: CI/CD integration for performance budgets
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                            <div className="text-red-400 font-bold text-sm">🏗️ Architecture-level Optimization</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>State management</strong>: Zustand/Jotai (atomic) vs Redux (centralized)<br />
                                • <strong>Server Components</strong> (React 19): zero JS shipped for static content<br />
                                • <strong>Streaming SSR</strong>: renderToPipeableStream for faster TTFB<br />
                                • <strong>ISR</strong> (Next.js): revalidate static pages without redeploy
                            </div>
                        </div>
                    </div>

                    <CodeBlock title="optimization-techniques.tsx">{`// 1. React.memo — skip re-render if props haven't changed
const ExpensiveList = React.memo(({ items, onItemClick }) => {
  return items.map(item => <Item key={item.id} {...item} onClick={onItemClick} />)
})

// 2. useMemo — cache expensive calculations
const sorted = useMemo(() =>
  items
    .filter(i => i.active)
    .sort((a, b) => a.price - b.price),
  [items] // only recalculate when items change
)

// 3. useCallback — stable function reference
const handleClick = useCallback((id: string) => {
  setItems(prev => prev.filter(i => i.id !== id))
}, []) // Won't re-create every render → ExpensiveList won't re-render

// 4. Dynamic import — code splitting
const AdminPanel = lazy(() => import('./AdminPanel'))
// Usage: <Suspense fallback={<Spinner />}><AdminPanel /></Suspense>

// 5. State colocation — avoid unnecessary re-renders
// ❌ Bad: search state in App → every child re-renders on keystroke
function App() {
  const [search, setSearch] = useState('') // ← state here
  return <><Header /><SearchBar search={search} onChange={setSearch} /><Content /></>
}
// ✅ Good: search state in SearchBar → only SearchBar re-renders
function SearchBar() {
  const [search, setSearch] = useState('') // ← state here
  return <input value={search} onChange={e => setSearch(e.target.value)} />
}`}</CodeBlock>

                    <Callout type="warning">Don&apos;t premature optimize! Only optimize when <Highlight>React DevTools Profiler</Highlight> shows a real bottleneck. useMemo/useCallback have overhead — using them wrong can be slower.</Callout>
                    <a href="/blogs/react-performance" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 Read detailed article →</a>
                </TopicModal>

                <TopicModal title="State Management — Redux, Zustand, Context" emoji="🗃️" color="#764ABC" summary="Comparing 3 popular state management approaches — very common interview question">
                    <Paragraph>Enterprise projects commonly use <Highlight>Redux</Highlight>, but you should also know alternatives.</Paragraph>

                    <Callout type="info">🏦 <strong>Analogy: Redux = A Bank</strong><br /><br />
                        <strong>Store</strong> = Vault — holds all the money (state)<br />
                        <strong>Action</strong> = Transaction slip — {'"I want to withdraw $500"'} <InlineCode>{`{ type: 'WITHDRAW', amount: 500 }`}</InlineCode><br />
                        <strong>Dispatch</strong> = Submit the slip to the teller<br />
                        <strong>Reducer</strong> = Bank teller — reads the slip, calculates, updates the balance<br />
                        <strong>Selector</strong> = Bank statement — check your current balance<br /><br />
                        You <strong>cannot open the vault yourself</strong> (mutate state directly) — you must submit a slip (dispatch action) → teller processes it (reducer) → vault is updated (new state)
                    </Callout>

                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <div className="text-purple-400 font-bold text-sm">🔴 Redux (Redux Toolkit)</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Store</strong> → <strong>Action</strong> → <strong>Reducer</strong> → <strong>New State</strong> (unidirectional flow)<br />
                                • Redux Toolkit: <InlineCode>createSlice</InlineCode>, <InlineCode>configureStore</InlineCode>, <InlineCode>createAsyncThunk</InlineCode><br />
                                • Middleware: redux-thunk (default), redux-saga (complex side effects)<br />
                                • DevTools: time-travel debugging, action log<br />
                                • Use when: complex state, many components need to share, need predictability
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                            <div className="text-orange-400 font-bold text-sm">🐻 Zustand</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • Lightweight (~1KB), simple API, no boilerplate<br />
                                • No Provider needed, use hooks directly<br />
                                • Auto selector: only re-renders when slice of state changes<br />
                                • Middleware: persist, devtools, immer<br />
                                • Use when: want simplicity, don&apos;t need Redux Toolkit overhead
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">⚛️ Context API</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • Built-in React, no extra dependency<br />
                                • ⚠️ <strong>ALL consumers re-render</strong> when context value changes<br />
                                • Good for: theme, locale, auth (infrequent updates)<br />
                                • Not good for: frequently changing data (input, scroll, mouse)<br />
                                • Split context by domain to reduce re-renders
                            </div>
                        </div>
                    </div>
                    <CodeBlock title="state-management.ts">{`// Redux Toolkit — createSlice
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1 }, // Immer: mutate OK
    addBy: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})

// Zustand — minimal boilerplate
import { create } from 'zustand'
const useStore = create((set) => ({
  count: 0,
  increment: () => set((s) => ({ count: s.count + 1 })),
}))
// Usage: const count = useStore(s => s.count) // auto-optimized!

// Context — built-in
const ThemeContext = createContext('light')
function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Child /> {/* All children re-render when value changes */}
    </ThemeContext.Provider>
  )
}`}</CodeBlock>
                    <Callout type="tip">Interview: 90% will ask Redux flow (action → reducer → store). Knowing <Highlight>why use Zustand over Redux</Highlight> (less boilerplate, auto-optimized re-renders) → senior answer.</Callout>
                </TopicModal>

                <TopicModal title="Next.js — Rendering Strategies (App Router)" emoji="▲" color="#000000" summary="SSG, ISR, SSR, CSR, PPR — latest App Router patterns with real code examples">
                    <Paragraph>Next.js is the <Highlight>most popular React framework</Highlight>. Interviews frequently ask about rendering strategies. App Router (Next.js 13+) completely changed how rendering is configured — <Highlight>no more getStaticProps / getServerSideProps</Highlight>.</Paragraph>

                    <Callout type="info">🏪 <strong>Analogy: Rendering = Restaurant Service</strong><br /><br />
                        <strong>SSG</strong> = Pre-packaged meals — cooked beforehand, grab and go. <strong>Fastest!</strong><br />
                        <strong>ISR</strong> = Pre-packaged + refresh every 60s — still fast, but <strong>not stale</strong><br />
                        <strong>SSR</strong> = Cook fresh per order — <strong>freshest</strong>, but customer waits<br />
                        <strong>CSR</strong> = Give customer raw ingredients, cook in their kitchen (browser) — <strong>empty plate, long wait</strong><br />
                        <strong>PPR</strong> = Pre-packaged sides + cook main dish fresh — <Highlight>best of both worlds!</Highlight>
                    </Callout>

                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-gray-500/10 border border-gray-500/20">
                            <div className="text-gray-300 font-bold text-sm">📊 Rendering Strategies Comparison (App Router)</div>
                            <div className="text-slate-300 text-sm mt-2">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-xs">
                                        <thead>
                                            <tr className="border-b border-white/10">
                                                <th className="text-left py-1.5 pr-2 text-slate-400 font-semibold">Strategy</th>
                                                <th className="text-left py-1.5 pr-2 text-slate-400 font-semibold">When rendered</th>
                                                <th className="text-left py-1.5 pr-2 text-slate-400 font-semibold">Cache</th>
                                                <th className="text-left py-1.5 text-slate-400 font-semibold">App Router config</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-slate-300">
                                            <tr className="border-b border-white/5"><td className="py-1.5 pr-2 font-bold text-green-400">SSG</td><td className="py-1.5 pr-2">Build time</td><td className="py-1.5 pr-2">Forever</td><td className="py-1.5 font-mono text-[10px]">generateStaticParams</td></tr>
                                            <tr className="border-b border-white/5"><td className="py-1.5 pr-2 font-bold text-blue-400">ISR</td><td className="py-1.5 pr-2">Build + revalidate</td><td className="py-1.5 pr-2">N seconds</td><td className="py-1.5 font-mono text-[10px]">{`revalidate = 60`}</td></tr>
                                            <tr className="border-b border-white/5"><td className="py-1.5 pr-2 font-bold text-yellow-400">SSR</td><td className="py-1.5 pr-2">Every request</td><td className="py-1.5 pr-2">None</td><td className="py-1.5 font-mono text-[10px]">{`dynamic = 'force-dynamic'`}</td></tr>
                                            <tr className="border-b border-white/5"><td className="py-1.5 pr-2 font-bold text-red-400">CSR</td><td className="py-1.5 pr-2">In browser</td><td className="py-1.5 pr-2">None</td><td className="py-1.5 font-mono text-[10px]">{`'use client' + useEffect`}</td></tr>
                                            <tr><td className="py-1.5 pr-2 font-bold text-purple-400">PPR</td><td className="py-1.5 pr-2">Static shell + streaming</td><td className="py-1.5 pr-2">Shell: forever</td><td className="py-1.5 font-mono text-[10px]">Suspense boundary</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">🆕 App Router — Everything is a Server Component</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Every page/layout</strong> defaults to Server Component → 0 JS<br />
                                • Rendering strategy decided by <strong>how you fetch data</strong>, not function names<br />
                                • <InlineCode>generateStaticParams</InlineCode> → SSG (build time)<br />
                                • <InlineCode>{`export const revalidate = N`}</InlineCode> → ISR (revalidate after N seconds)<br />
                                • <InlineCode>{`export const dynamic = 'force-dynamic'`}</InlineCode> → SSR (every request)<br />
                                • No exports → Next.js <strong>auto-decides</strong> (Static if no dynamic data)
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <div className="text-purple-400 font-bold text-sm">⚡ PPR — Partial Pre-rendering (Next.js 15+)</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Newest!</strong> Combine Static + Dynamic in a single page<br />
                                • Static shell (header, layout) → rendered at build, served from CDN<br />
                                • Dynamic parts (user data, cart) → streamed from server per request<br />
                                • Use <InlineCode>{'<Suspense>'}</InlineCode> to mark dynamic sections<br />
                                • <Highlight>Ultra-fast TTFB</Highlight> (static shell) + fresh data (streaming)
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                            <div className="text-yellow-400 font-bold text-sm">🎯 When to use what?</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>SSG</strong>: blogs, landing pages, docs (content rarely changes)<br />
                                • <strong>ISR</strong>: e-commerce products, news (changes every few minutes/hours)<br />
                                • <strong>SSR</strong>: user dashboard, search results (real-time data, needs SEO)<br />
                                • <strong>CSR</strong>: admin panel, private pages (no SEO needed)<br />
                                • <strong>PPR</strong>: product page (static layout + dynamic price/stock)
                            </div>
                        </div>
                    </div>
                    <CodeBlock title="nextjs-rendering.tsx">{`// ╔════════════════════════════════════════╗
// ║  📦 PAGES ROUTER (legacy — still works) ║
// ╚════════════════════════════════════════╝

// SSG — build time
export async function getStaticProps() {
  const posts = await fetchPosts()
  return { props: { posts } }
}

// ISR — revalidate every 60 seconds
export async function getStaticProps() {
  const products = await fetchProducts()
  return { props: { products }, revalidate: 60 }
}

// SSR — every request
export async function getServerSideProps(ctx) {
  const user = await getUser(ctx.req.cookies.token)
  return { props: { user } }
}

// ╔════════════════════════════════════════════╗
// ║  🆕 APP ROUTER (new — recommended)        ║
// ║  No more getStaticProps/getServerSideProps ║
// ║  Everything via export const              ║
// ╚════════════════════════════════════════════╝

// ═══ 1. SSG — generateStaticParams ═══
// File: app/blog/[slug]/page.tsx
export async function generateStaticParams() {
  const posts = await db.post.findMany({ select: { slug: true } })
  return posts.map(p => ({ slug: p.slug }))
}
// ↑ Equivalent to getStaticPaths + getStaticProps

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await db.post.findUnique({ where: { slug } })
  return <article><h1>{post.title}</h1><p>{post.content}</p></article>
}

// ═══ 2. ISR — export const revalidate ═══
// File: app/products/page.tsx
export const revalidate = 60
// ↑ Equivalent to getStaticProps({ revalidate: 60 })

export default async function ProductsPage() {
  const products = await db.product.findMany()
  return <div>{products.map(p => <Card key={p.id} product={p} />)}</div>
}

// ═══ 3. SSR — export const dynamic ═══
// File: app/dashboard/page.tsx
export const dynamic = 'force-dynamic'
// ↑ Equivalent to getServerSideProps

export default async function DashboardPage() {
  const user = await getUser()
  return <div>Welcome, {user.name}</div>
}

// ═══ 4. CSR — 'use client' + useEffect ═══
// Same in both Pages Router and App Router
'use client'
import { useState, useEffect } from 'react'

function LiveChat() {
  const [messages, setMessages] = useState([])
  useEffect(() => {
    const ws = new WebSocket('/api/chat')
    ws.onmessage = (e) => setMessages(prev => [...prev, JSON.parse(e.data)])
    return () => ws.close()
  }, [])
  return <div>{messages.map(m => <p key={m.id}>{m.text}</p>)}</div>
}

// ═══ 5. PPR — Partial Pre-rendering (Next.js 15+, APP ROUTER ONLY) ═══
// Static shell + dynamic content in the same page!
import { Suspense } from 'react'

export default async function ProductPage({ params }) {
  const { id } = await params
  const product = await db.product.findUnique({ where: { id } })

  return (
    <div>
      {/* ⚡ Static shell — CDN cached */}
      <h1>{product.name}</h1>
      <p>{product.description}</p>

      {/* 🔄 Dynamic — streamed per request */}
      <Suspense fallback={<PriceSkeleton />}>
        <LivePrice productId={id} />
      </Suspense>
      <Suspense fallback={<CartSkeleton />}>
        <CartStatus />
      </Suspense>
    </div>
  )
}`}</CodeBlock>
                    <Callout type="tip">Interview: {'"Explain SSR vs SSG vs ISR"'} is <Highlight>almost guaranteed</Highlight> if the JD mentions Next.js. Know both styles: Pages Router (getStaticProps) for legacy + App Router (export const) for new → senior answer. Bonus: mention <Highlight>PPR</Highlight> → shows you follow the latest Next.js updates!</Callout>
                </TopicModal>

                <TopicModal title="Server Components & Server Actions" emoji="🖥️" color="#0ea5e9" summary="RSC = zero JS bundle, Server Actions = RPC-style mutations — the new React/Next.js architecture">
                    <Paragraph><Highlight>React Server Components (RSC)</Highlight> change how we think about rendering. Instead of shipping JS for every component, RSC runs on the server and sends HTML. Only components needing interactivity ship JS.</Paragraph>

                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">🖥️ Server Components (default in App Router)</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • Render on server, <strong>0 JS sent to client</strong><br />
                                • Direct access to database, file system, env variables<br />
                                • Cannot use: useState, useEffect, onClick, browser APIs<br />
                                • <InlineCode>async/await</InlineCode> directly in component<br />
                                • Can import client components but <strong>not vice versa</strong>
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">📱 Client Components ({`'use client'`})</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • Add <InlineCode>{`'use client'`}</InlineCode> at top of file → opt-in<br />
                                • Can use: useState, useEffect, onClick, browser APIs<br />
                                • JS is shipped to client (hydration)<br />
                                • Should be <strong>minimized</strong>: only for interactive parts
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <div className="text-purple-400 font-bold text-sm">⚡ Server Actions ({`'use server'`})</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • Server-side functions callable directly from client<br />
                                • Replace API routes for mutations (POST, PUT, DELETE)<br />
                                • Auto serialize/deserialize params<br />
                                • Work with <InlineCode>&lt;form action&gt;</InlineCode> or direct invocation<br />
                                • Progressive Enhancement: forms submit without JS loaded
                            </div>
                        </div>
                    </div>

                    <CodeBlock title="rsc-pattern.tsx">{`// ===== SERVER COMPONENT (default) =====
// File: app/products/page.tsx  — no need for 'use server'
import { db } from '@/lib/database'
import AddToCartButton from './AddToCartButton'

async function ProductPage() {
    const products = await db.product.findMany()  // Direct DB access!
    return (
        <div>
            <h1>Products ({products.length})</h1>
            {products.map(p => (
                <div key={p.id}>
                    <h2>{p.name} - \${p.price}</h2>
                    <AddToCartButton productId={p.id} />  {/* Client component */}
                </div>
            ))}
        </div>
    )
}

// ===== CLIENT COMPONENT =====
// File: app/products/AddToCartButton.tsx
'use client'
import { useState } from 'react'
import { addToCart } from './actions'

export default function AddToCartButton({ productId }) {
    const [isPending, setIsPending] = useState(false)
    return (
        <button onClick={async () => {
            setIsPending(true)
            await addToCart(productId)
            setIsPending(false)
        }} disabled={isPending}>
            {isPending ? '⏳' : '🛒 Add to Cart'}
        </button>
    )
}`}</CodeBlock>

                    <CodeBlock title="server-actions.tsx">{`// ===== SERVER ACTION =====
// File: app/products/actions.ts
'use server'

import { db } from '@/lib/database'
import { revalidatePath } from 'next/cache'

export async function addToCart(productId: string) {
    await db.cart.create({ data: { productId, quantity: 1 } })
    revalidatePath('/cart')
}

export async function createProduct(formData: FormData) {
    const name = formData.get('name') as string
    const price = Number(formData.get('price'))
    if (!name) return { error: 'Name is required' }

    await db.product.create({ data: { name, price } })
    revalidatePath('/products')
    return { success: true }
}

// Use in form — Progressive Enhancement!
function CreateForm() {
    return (
        <form action={createProduct}>
            <input name="name" required />
            <input name="price" type="number" required />
            <button type="submit">Create</button>
        </form>
    )
}

// React 19 — useActionState
'use client'
import { useActionState } from 'react'
import { createProduct } from './actions'

function CreateProductForm() {
    const [state, action, isPending] = useActionState(createProduct, null)
    return (
        <form action={action}>
            <input name="name" required />
            <button disabled={isPending}>{isPending ? '...' : 'Create'}</button>
            {state?.error && <span className="text-red-500">{state.error}</span>}
        </form>
    )
}`}</CodeBlock>

                    <div className="my-3">
                        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                            <div className="text-yellow-400 font-bold text-sm">🧠 Rule: Server vs Client</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Fetch data</strong> → Server Component (async/await directly)<br />
                                • <strong>Click, hover, type</strong> → Client Component (useState, events)<br />
                                • <strong>Form submit / mutation</strong> → Server Action ({`'use server'`})<br />
                                • Goal: keep Client Components <Highlight>as small as possible</Highlight>
                            </div>
                        </div>
                    </div>

                    <Callout type="tip">Interview: {`"RSC vs SSR?"`} → RSC renders on server but <Highlight>doesn&apos;t hydrate</Highlight> (0 JS). SSR renders HTML on server then <Highlight>hydrates the entire app</Highlight>. RSC is more efficient because it only ships JS for interactive parts.</Callout>
                </TopicModal>

                <TopicModal title="State Management in Next.js" emoji="🗃️" color="#8b5cf6" summary="Why Context/Redux is less needed in App Router — and when you still need them">
                    <Paragraph><Highlight>Next.js App Router changes how we think about state.</Highlight> Most global state that previously required Redux/Context is now handled by Server Components and URL params.</Paragraph>

                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <div className="text-purple-400 font-bold text-sm">🔄 Before vs After App Router</div>
                            <div className="text-slate-300 text-sm mt-1">
                                <strong>Before (CRA + Redux):</strong><br />
                                Page load → client fetches API → loading spinner → dispatch action → set Redux store → render<br /><br />
                                <strong>After (Next.js App Router):</strong><br />
                                Server fetches data → renders HTML → sends to client (data already there)<br />
                                → <Highlight>No need for a global store to hold data!</Highlight>
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">🌐 URL = Free State Manager</div>
                            <div className="text-slate-300 text-sm mt-1">
                                Filters, pagination, search → use <Highlight>searchParams</Highlight><br /><br />
                                <code className="text-xs bg-slate-900 px-2 py-0.5 rounded">/products?category=shoes&amp;sort=price&amp;page=2</code><br /><br />
                                → No Redux store needed for filters!<br />
                                → Shareable URL, SEO-friendly, back button works
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">🧩 Client state is only for UI state</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • Modal open/close → <strong>useState</strong><br />
                                • Theme dark/light → <strong>useContext</strong> (small, local)<br />
                                • Form input → <strong>useState</strong> / React Hook Form<br />
                                • Complex form logic → <strong>useReducer</strong><br /><br />
                                → All <Highlight>small and local</Highlight>, no Redux needed!
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                            <div className="text-yellow-400 font-bold text-sm">📋 When to use what?</div>
                            <div className="text-slate-300 text-sm mt-2">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-xs">
                                        <thead>
                                            <tr className="border-b border-white/10">
                                                <th className="text-left py-1.5 pr-2 text-slate-400 font-semibold">Tool</th>
                                                <th className="text-left py-1.5 text-slate-400 font-semibold">When to use</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-slate-300">
                                            <tr className="border-b border-white/5"><td className="py-1.5 pr-2 font-mono text-green-400">useState</td><td>Simple UI state (modal, toggle, form)</td></tr>
                                            <tr className="border-b border-white/5"><td className="py-1.5 pr-2 font-mono text-green-400">useContext</td><td>Theme, locale, auth status — rarely changes</td></tr>
                                            <tr className="border-b border-white/5"><td className="py-1.5 pr-2 font-mono text-blue-400">Zustand</td><td>Complex client state, shared across components</td></tr>
                                            <tr className="border-b border-white/5"><td className="py-1.5 pr-2 font-mono text-purple-400">Redux</td><td>Very large apps, time-travel debugging, middleware</td></tr>
                                            <tr className="border-b border-white/5"><td className="py-1.5 pr-2 font-mono text-cyan-400">TanStack Query</td><td>Server state caching + revalidation on client</td></tr>
                                            <tr><td className="py-1.5 pr-2 font-mono text-yellow-400">URL params</td><td>Filters, pagination, search — shareable + SEO</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <CodeBlock title="url-state-example.tsx">{`// ✅ URL params replace Redux for filters
// File: app/products/page.tsx (Server Component)
export default async function ProductsPage({
    searchParams
}: {
    searchParams: Promise<{ category?: string; sort?: string; page?: string }>
}) {
    const { category, sort, page } = await searchParams
    const products = await db.product.findMany({
        where: category ? { category } : {},
        orderBy: { [sort || 'createdAt']: 'desc' },
        skip: ((Number(page) || 1) - 1) * 20,
        take: 20,
    })
    return <ProductGrid products={products} />
}

// Client component just updates the URL — no Redux needed!
'use client'
import { useRouter, useSearchParams } from 'next/navigation'

function FilterBar() {
    const router = useRouter()
    const params = useSearchParams()

    const setFilter = (key: string, value: string) => {
        const newParams = new URLSearchParams(params)
        newParams.set(key, value)
        newParams.delete('page') // reset page on filter change
        router.push('/products?' + newParams)
    }

    return (
        <select onChange={e => setFilter('category', e.target.value)}>
            <option value="">All</option>
            <option value="shoes">Shoes</option>
            <option value="shirts">Shirts</option>
        </select>
    )
}`}</CodeBlock>

                    <Callout type="tip">Interview: {`"How do you manage state in Next.js App Router?"`} → <Highlight>Server Components fetch data directly, URL params replace filter state, only small UI state uses useState/useContext. For complex client state → Zustand because it&apos;s lighter than Redux.</Highlight></Callout>
                </TopicModal>

                <TopicModal title="Micro-Frontend (MFE)" emoji="🧩" color="#06b6d4" summary="Module Federation, Import Maps, Single-SPA, Multi-Zones — when to split / not split your frontend">
                    <Paragraph>Micro-Frontend is an architecture that <Highlight>splits the frontend into independent apps</Highlight>, each owned by a team. Like microservices but for the frontend.</Paragraph>

                    <Callout type="info">🏬 <strong>Analogy: MFE = Shopping Mall</strong><br /><br />
                        <strong>Monolith</strong> = One giant store selling everything → big team managing 1 codebase → slow deploys<br />
                        <strong>MFE</strong> = Shopping mall → each store (team) <Highlight>decorates independently, opens/closes on their own schedule</Highlight><br />
                        • Store A uses React, store B uses Vue → <strong>still in the same building</strong><br />
                        • Each store deploys independently → 1 team&apos;s bug doesn&apos;t take down the mall
                    </Callout>

                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-gray-500/10 border border-gray-500/20">
                            <div className="text-gray-300 font-bold text-sm">📊 MFE Approaches Comparison</div>
                            <div className="text-slate-300 text-sm mt-2">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-xs">
                                        <thead>
                                            <tr className="border-b border-white/10">
                                                <th className="text-left py-1.5 pr-2 text-slate-400 font-semibold">Approach</th>
                                                <th className="text-left py-1.5 pr-2 text-slate-400 font-semibold">Runtime</th>
                                                <th className="text-left py-1.5 pr-2 text-slate-400 font-semibold">Shared deps</th>
                                                <th className="text-left py-1.5 text-slate-400 font-semibold">Use case</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-slate-300">
                                            <tr className="border-b border-white/5"><td className="py-1.5 pr-2 font-bold text-blue-400">Module Federation</td><td className="py-1.5 pr-2">Build + Runtime</td><td className="py-1.5 pr-2">Yes (shared React)</td><td className="py-1.5">Enterprise dashboard</td></tr>
                                            <tr className="border-b border-white/5"><td className="py-1.5 pr-2 font-bold text-green-400">Import Maps</td><td className="py-1.5 pr-2">Runtime (ESM)</td><td className="py-1.5 pr-2">Via import map</td><td className="py-1.5">Progressive migration</td></tr>
                                            <tr className="border-b border-white/5"><td className="py-1.5 pr-2 font-bold text-yellow-400">Single-SPA</td><td className="py-1.5 pr-2">Runtime orchestrator</td><td className="py-1.5 pr-2">Optional</td><td className="py-1.5">Multi-framework (React+Vue)</td></tr>
                                            <tr><td className="py-1.5 pr-2 font-bold text-purple-400">Next.js Multi-Zones</td><td className="py-1.5 pr-2">Server routing</td><td className="py-1.5 pr-2">Not needed</td><td className="py-1.5">Multiple Next.js apps, one domain</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">📦 Module Federation (Webpack 5 / Rspack)</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • Most popular in enterprise. <strong>Share code at runtime</strong> between apps<br />
                                • App A exposes component → App B imports <strong>directly via URL</strong><br />
                                • Shared dependencies (React, React-DOM) → <Highlight>loaded once, shared across</Highlight><br />
                                • Rspack/Rsbuild has native support, 10x faster than Webpack
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">🗺️ Import Maps (Native Browser)</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • Use <InlineCode>{'<script type="importmap">'}</InlineCode> in HTML<br />
                                • Map package names → CDN URLs, browser resolves at runtime<br />
                                • <strong>No bundler needed</strong> → each team deploys ESM modules independently<br />
                                • Works great with Single-SPA
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                            <div className="text-yellow-400 font-bold text-sm">🎭 Single-SPA — Orchestrator</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Framework-agnostic</strong>: App A = React, App B = Vue, App C = Angular<br />
                                • Root config decides which app to mount/unmount per route<br />
                                • Lifecycle hooks: bootstrap → mount → unmount<br />
                                • Perfect for <Highlight>gradual migration from legacy (Angular → React)</Highlight>
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <div className="text-purple-400 font-bold text-sm">🔀 Next.js Multi-Zones</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • Multiple Next.js apps running under <strong>one domain</strong><br />
                                • Proxy/reverse proxy routing: <InlineCode>/blog</InlineCode> → App A, <InlineCode>/shop</InlineCode> → App B<br />
                                • Each app builds + deploys <strong>independently</strong>, own SSR/SSG<br />
                                • Simplest approach for teams already using Next.js
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                            <div className="text-red-400 font-bold text-sm">🚫 When NOT to use MFE?</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • Small team ({`< 3 teams`}) → overhead outweighs benefits<br />
                                • Simple app, few features → monolith is better<br />
                                • Heavy shared state between parts → high coupling = MFE adds complexity<br />
                                • <Highlight>MFE solves organizational (team) problems, not technical ones</Highlight>
                            </div>
                        </div>
                    </div>
                    <CodeBlock title="micro-frontend.ts">{`// ╔═══════════════════════════════════════╗
// ║  1. Module Federation (Webpack 5)     ║
// ╚═══════════════════════════════════════╝

// Remote App (Header) — webpack.config.js
new ModuleFederationPlugin({
  name: 'header',
  filename: 'remoteEntry.js',
  exposes: {
    './Header': './src/components/Header',
  },
  shared: {
    react: { singleton: true, requiredVersion: '^18' },
    'react-dom': { singleton: true },
  },
})

// Host App — import remote component
const Header = React.lazy(() => import('header/Header'))

function App() {
  return (
    <Suspense fallback={<HeaderSkeleton />}>
      <Header />  {/* Loaded from header app's remoteEntry.js */}
      <main>...</main>
    </Suspense>
  )
}

// ╔═══════════════════════════════════════╗
// ║  2. Import Maps (Native Browser)      ║
// ╚═══════════════════════════════════════╝

// index.html
// <script type="importmap">
// {
//   "imports": {
//     "react": "https://cdn.example.com/react@18/index.mjs",
//     "@team-a/header": "https://team-a.cdn.com/header.mjs",
//     "@team-b/cart": "https://team-b.cdn.com/cart.mjs"
//   }
// }
// </script>
// <script type="module" src="/app.mjs"></script>

// app.mjs — normal imports, browser resolves via import map
import { Header } from '@team-a/header'
import { Cart } from '@team-b/cart'

// ╔═══════════════════════════════════════╗
// ║  3. Single-SPA — Root Config          ║
// ╚═══════════════════════════════════════╝

import { registerApplication, start } from 'single-spa'

registerApplication({
  name: '@org/navbar',
  app: () => System.import('@org/navbar'),  // load from CDN/server
  activeWhen: '/',  // always active
})

registerApplication({
  name: '@org/dashboard',
  app: () => System.import('@org/dashboard'),
  activeWhen: '/dashboard',  // mount only when route matches
})

start()  // Single-SPA manages lifecycle

// ╔═══════════════════════════════════════╗
// ║  4. Next.js Multi-Zones              ║
// ╚═══════════════════════════════════════╝

// next.config.js (Main app)
module.exports = {
  async rewrites() {
    return [
      {
        source: '/blog/:path*',
        destination: 'https://blog-app.vercel.app/blog/:path*',
      },
      {
        source: '/shop/:path*',
        destination: 'https://shop-app.vercel.app/shop/:path*',
      },
    ]
  },
}
// → /blog/* → Blog Next.js app (team A)
// → /shop/* → Shop Next.js app (team B)
// → /* → Main Next.js app`}</CodeBlock>
                    <Callout type="tip">Interview: When asked {'"Why use MFE?"'} → answer <Highlight>team autonomy + independent deploy</Highlight>, NOT for technical reasons. When asked to pick an approach → Module Federation for enterprise React, Multi-Zones for Next.js teams, Single-SPA for multi-framework migration.</Callout>
                </TopicModal>
            </div>

            <Heading3>3.2 HTML/CSS (click for details)</Heading3>
            <div className="my-4 space-y-2">
                <TopicModal title="Semantic HTML & Accessibility" emoji="♿" color="#38bdf8" summary="Screen readers, ARIA, landmark roles — why accessibility matters in interviews">
                    <Paragraph><Highlight>Semantic HTML</Highlight> = using the right tag for the right purpose. Google and Apple especially value accessibility.</Paragraph>

                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">🏷️ Semantic vs Non-semantic Elements</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Landmark roles</strong>: {'<header>'}, {'<nav>'}, {'<main>'}, {'<aside>'}, {'<footer>'}, {'<article>'}, {'<section>'}<br />
                                • Screen readers use landmarks to <strong>navigate quickly</strong> (skip to main content)<br />
                                • {'<div>'} and {'<span>'} are <strong>generic containers</strong> — no semantic meaning<br />
                                • {'<button>'} vs {'<div onClick>'}: button has keyboard support + focus + role built-in
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <div className="text-purple-400 font-bold text-sm">🔊 ARIA (Accessible Rich Internet Applications)</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>aria-label</strong>: label for elements without visible text (icon buttons)<br />
                                • <strong>aria-expanded</strong>: dropdown/accordion open or closed state<br />
                                • <strong>aria-live</strong>: announce dynamic content changes (toasts, counters)<br />
                                • <strong>role</strong>: override semantic role (role={'"dialog"'}, role={'"alert"'}, role={'"tab"'})<br />
                                • ⚠️ Rule #1: <strong>No ARIA needed if using correct HTML tag</strong> (native semantics)
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">⌨️ Keyboard Navigation</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Tab order</strong>: focusable elements follow DOM order (tabIndex={'"0"'} to add)<br />
                                • <strong>Focus trap</strong>: Modal/Dialog must keep focus inside (Tab wraps around)<br />
                                • <strong>Skip links</strong>: {'"Skip to main content"'} hidden link, visible on focus<br />
                                • <strong>Keyboard shortcuts</strong>: Escape close, Enter submit, Arrow keys navigate
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                            <div className="text-yellow-400 font-bold text-sm">🎨 Color & Visual Accessibility</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Color contrast</strong>: WCAG AA ≥ 4.5:1 (text), ≥ 3:1 (large text, UI components)<br />
                                • Don&apos;t use color alone to convey meaning (add icon, text, pattern)<br />
                                • <strong>prefers-reduced-motion</strong>: disable animations for sensitive users<br />
                                • <strong>prefers-color-scheme</strong>: dark/light mode support
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                            <div className="text-red-400 font-bold text-sm">🧪 Testing Accessibility</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>axe DevTools</strong>: Chrome extension to scan a11y violations<br />
                                • <strong>Lighthouse</strong>: accessibility audit score<br />
                                • <strong>Screen reader</strong>: test with VoiceOver (Mac) or NVDA (Windows)<br />
                                • <strong>jest-axe</strong>: automated a11y testing in unit tests
                            </div>
                        </div>
                    </div>

                    <CodeBlock title="accessibility.html">{`<!-- ✅ Semantic + Accessible -->
<header>
  <nav aria-label="Main navigation">
    <ul role="menubar">
      <li role="none"><a role="menuitem" href="/">Home</a></li>
      <li role="none"><a role="menuitem" href="/about">About</a></li>
    </ul>
  </nav>
</header>

<main>
  <h1>Page Title</h1> <!-- Only 1 h1 per page! -->
  <article>
    <h2>Article Title</h2>
    <p>Content...</p>
  </article>
</main>

<!-- ✅ Accessible Modal -->
<div role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <h2 id="modal-title">Confirm Delete</h2>
  <p>Are you sure?</p>
  <button autofocus>Cancel</button> <!-- autofocus on safe action -->
  <button>Delete</button>
</div>

<!-- ✅ Accessible Form -->
<label for="email">Email</label>
<input id="email" type="email" aria-required="true"
       aria-describedby="email-hint" aria-invalid="true" />
<span id="email-hint">example@domain.com</span>`}</CodeBlock>

                    <Callout type="tip">
                        Big tech loves asking: {'"Build component X that\'s accessible"'} — must support keyboard navigation, screen reader, focus management.
                        Mention <Highlight>WCAG 2.1 Level AA</Highlight> + testing with screen reader → big bonus points.
                    </Callout>
                </TopicModal>


                <TopicModal title="DOM Manipulation & Event Delegation" emoji="🎯" color="#f97316" summary={'Bubbling, Capturing, Delegation — how events propagate through the DOM'}>
                    <Paragraph>Frontend interviews <Highlight>frequently ask</Highlight> about event propagation. Understanding how events travel through the DOM = debugging any click/submit issue.</Paragraph>

                    <Callout type="info">{'🏢 '}<strong>Analogy: Event Propagation = Office Gossip</strong><br /><br />
                        {'You (employee) tell '}<strong>gossip</strong>{' to your direct manager:'}<br /><br />
                        <strong>{'🔽 Capturing (going down)'}</strong>{' = CEO hears it → passes down → Director → Manager → reaches you'}<br />
                        <strong>{'🎯 Target'}</strong>{' = Gossip '}<strong>reaches the person who told it</strong>{' (you)'}<br />
                        <strong>{'🔼 Bubbling (going up)'}</strong>{' = You tell → Manager hears → Director hears → CEO hears too!'}<br /><br />
                        {"Clicking a child = you're also clicking ALL its ancestors! 🫧"}
                    </Callout>

                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                            <div className="text-orange-400 font-bold text-sm">{'🔄 Event Propagation — 3 Phases'}</div>
                            <div className="text-slate-300 text-sm mt-1">
                                <strong>Flow:</strong>{' Capturing ↓ → Target 🎯 → Bubbling ↑'}<br /><br />
                                <InlineCode>{'window → document → html → body → div → p → a (Target)'}</InlineCode><br />
                                <InlineCode>{'a (Target) → p → div → body → html → document → window'}</InlineCode><br /><br />
                                {'• '}<strong>Capturing</strong>{': from root (window) down to target — rarely used'}<br />
                                {'• '}<strong>Target</strong>{': event reaches the exact element that was clicked'}<br />
                                {'• '}<strong>Bubbling</strong>{': from target back up to root — '}<Highlight>this is the default!</Highlight>
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                            <div className="text-red-400 font-bold text-sm">{'🫧 Event Bubbling — Click child = click parent!'}</div>
                            <div className="text-slate-300 text-sm mt-1">
                                {'When you click a child element, the event '}<strong>bubbles up</strong>{' through all ancestors:'}<br /><br />
                                {'Click <p> → alert "p" → alert "div" → alert "form"'}<br /><br />
                                {'• '}<strong>Default</strong>{': event listeners use the bubbling phase'}<br />
                                {'• Most events bubble ('}<InlineCode>click</InlineCode>{', '}<InlineCode>input</InlineCode>{', '}<InlineCode>submit</InlineCode>{'...)'}<br />
                                {'• Some do NOT bubble: '}<InlineCode>focus</InlineCode>{', '}<InlineCode>blur</InlineCode>{', '}<InlineCode>scroll</InlineCode>
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">{'🔽 Event Capturing — Catch before reaching target'}</div>
                            <div className="text-slate-300 text-sm mt-1">
                                {'Capture = '}<strong>intercept the event before</strong>{' it reaches the target:'}<br /><br />
                                <InlineCode>{`addEventListener('click', handler, true)`}</InlineCode>{' ← '}<strong>true</strong>{' = capture mode'}<br />
                                <InlineCode>{`addEventListener('click', handler, { capture: true })`}</InlineCode><br /><br />
                                {'• Rarely used in practice, but interviews love asking about it'}<br />
                                {'• Use case: '}<strong>global click handler</strong>{' that needs to intercept before children handle it'}
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">{'🎪 Event Delegation — Delegate to the parent'}</div>
                            <div className="text-slate-300 text-sm mt-1">
                                {'Instead of attaching events to '}<strong>each child</strong>{', attach once to the '}<strong>parent</strong>{'!'}<br /><br />
                                {'• 1000 '}<InlineCode>{'<li>'}</InlineCode>{' → only need '}<strong>1 listener</strong>{' on '}<InlineCode>{'<ul>'}</InlineCode><br />
                                {'• Use '}<InlineCode>event.target</InlineCode>{' to determine which child was clicked'}<br />
                                {'• '}<strong>Why?</strong>{' Saves memory + works for dynamically added elements'}<br />
                                {'• '}<Highlight>The most common pattern in practice!</Highlight>
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                            <div className="text-yellow-400 font-bold text-sm">{'🛑 stopPropagation & preventDefault'}</div>
                            <div className="text-slate-300 text-sm mt-1">
                                <strong>stopPropagation()</strong>{': prevents event from propagating further (no bubbling up)'}<br />
                                <strong>preventDefault()</strong>{': prevents the default behavior (form submit, link navigation)'}<br /><br />
                                {'• Different! '}<InlineCode>stopPropagation</InlineCode>{' ≠ '}<InlineCode>preventDefault</InlineCode><br />
                                {'• '}<InlineCode>stopImmediatePropagation()</InlineCode>{': also prevents other listeners on the same element'}<br />
                                {'• ⚠️ Avoid overusing stopPropagation — can break analytics, 3rd party libs'}
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                            <div className="text-cyan-400 font-bold text-sm">{'⚛️ React & Events — How is it different from Vanilla JS?'}</div>
                            <div className="text-slate-300 text-sm mt-1">
                                {'React uses '}<strong>Synthetic Events</strong>{' — a cross-browser wrapper:'}<br /><br />
                                {'• React attaches '}<strong>a single listener at the root</strong>{' (delegation pattern!)'}<br />
                                {'• '}<InlineCode>onClick</InlineCode>{' in React = '}<strong>bubbling phase</strong>{' by default'}<br />
                                {'• '}<InlineCode>onClickCapture</InlineCode>{' = capture phase'}<br />
                                {'• '}<InlineCode>e.stopPropagation()</InlineCode>{' in React stops both synthetic + native events (React 17+)'}<br />
                                {'• '}<InlineCode>e.nativeEvent</InlineCode>{' to access the raw DOM event'}
                            </div>
                        </div>
                    </div>

                    <CodeBlock title="event-propagation.js">{`// ═══ 1. BUBBLING — Click child, parent also "hears" ═══
<form onclick="alert('form')">
  <div onclick="alert('div')">
    <p onclick="alert('p')">Click me!</p>
  </div>
</form>
// Click <p> → alert "p" → "div" → "form" (bubbles up!)
// Click <div> → alert "div" → "form" (skips <p>)

// ═══ 2. BUBBLING WITH addEventListener ═══
const divs = document.querySelectorAll('div')

divs.forEach(div => div.addEventListener('click', function(e) {
  console.log(this.classList.value) // logs the class of clicked div
}))

// <div class="1"><div class="2"><div class="3">Click</div></div></div>
// Click div.3 → log: "3" → "2" → "1" (bubbling!)

// ═══ 3. stopPropagation — Stop bubbling ═══
divs.forEach(div => div.addEventListener('click', function(e) {
  e.stopPropagation() // 🛑 Stop! Don't bubble up
  console.log(this.classList.value)
}))
// Click div.3 → log: "3" (only itself, parent doesn't receive!)

// ═══ 4. CAPTURING — Catch from top down ═══
document.querySelector('.1').addEventListener('click', () => {
  console.log('Capture: div.1') // ← runs FIRST
}, true) // 👈 true = capture mode

document.querySelector('.3').addEventListener('click', () => {
  console.log('Bubble: div.3') // ← runs AFTER
})
// Click div.3 → "Capture: div.1" → "Bubble: div.3"

// ═══ 5. EVENT DELEGATION — Most important pattern ═══
// ❌ Bad: attach listener to EACH item (1000 items = 1000 listeners!)
document.querySelectorAll('li').forEach(li => {
  li.addEventListener('click', handleClick) // 💀 memory waste
})

// ✅ Good: attach 1 listener to parent, use event.target
document.getElementById('taskList').addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    e.target.classList.toggle('completed')
    console.log('Clicked:', e.target.textContent)
  }
})
// Add new <li> later? STILL WORKS! No need to re-attach listeners
// → This is how React works under the hood (delegation at root)

// ═══ 6. preventDefault vs stopPropagation ═══
// preventDefault: prevents DEFAULT BEHAVIOR
document.querySelector('a').addEventListener('click', (e) => {
  e.preventDefault() // link doesn't navigate
  console.log('Link clicked but not navigated')
})

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault() // form doesn't reload page
  // validate + submit via fetch() instead of form action
})

// stopPropagation: prevents PROPAGATION (event doesn't bubble up)
document.querySelector('.modal').addEventListener('click', (e) => {
  e.stopPropagation() // click inside modal doesn't close overlay
})
document.querySelector('.overlay').addEventListener('click', () => {
  closeModal() // only closes when clicking OUTSIDE modal
})`}</CodeBlock>

                    <CodeBlock title="react-events.tsx">{`// React Synthetic Events — delegation pattern built-in!

// 1. onClick = bubbling (default)
function App() {
  return (
    <div onClick={() => console.log('div')}>
      <button onClick={(e) => {
        e.stopPropagation() // prevent bubble to div
        console.log('button')
      }}>
        Click me
      </button>
    </div>
  )
}
// Click button → "button" (doesn't log "div" thanks to stopPropagation)

// 2. onClickCapture = capturing phase
function CaptureExample() {
  return (
    <div onClickCapture={() => console.log('1. capture: div')}>
      <button onClick={() => console.log('2. bubble: button')}>
        Click me
      </button>
    </div>
  )
}
// Click button → "1. capture: div" → "2. bubble: button"

// 3. Event Delegation in React — TaskList
function TaskList() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Task 1', done: false },
    { id: 2, text: 'Task 2', done: false },
    { id: 3, text: 'Task 3', done: false },
  ])

  // ✅ 1 handler for the entire list — delegation pattern!
  const handleClick = (e: React.MouseEvent) => {
    const li = (e.target as HTMLElement).closest('li')
    if (!li) return
    const id = Number(li.dataset.id)
    setTasks(prev => prev.map(t =>
      t.id === id ? { ...t, done: !t.done } : t
    ))
  }

  return (
    <ul onClick={handleClick}>
      {tasks.map(t => (
        <li key={t.id} data-id={t.id}
            style={{ textDecoration: t.done ? 'line-through' : 'none' }}>
          {t.text}
        </li>
      ))}
    </ul>
  )
}`}</CodeBlock>

                    <div className="my-3 overflow-x-auto">
                        <table className="w-full text-sm border-collapse">
                            <thead><tr className="border-b border-white/10">
                                <th className="text-left p-3 text-slate-400 font-medium">Concept</th>
                                <th className="text-left p-3 text-slate-400 font-medium">Direction</th>
                                <th className="text-left p-3 text-slate-400 font-medium">Description</th>
                            </tr></thead>
                            <tbody className="text-slate-300">
                                <tr className="border-b border-white/5"><td className="p-3 font-bold text-blue-400">Capturing</td><td className="p-3">↓ Down</td><td className="p-3">window → ... → target</td></tr>
                                <tr className="border-b border-white/5"><td className="p-3 font-bold text-orange-400">Target</td><td className="p-3">🎯</td><td className="p-3">Element that was clicked</td></tr>
                                <tr className="border-b border-white/5"><td className="p-3 font-bold text-red-400">Bubbling</td><td className="p-3">↑ Up</td><td className="p-3">{'target → ... → window'}</td></tr>
                                <tr className="border-b border-white/5"><td className="p-3 font-bold text-green-400">Delegation</td><td className="p-3">—</td><td className="p-3">Attach listener on parent, use event.target</td></tr>
                                <tr className="border-b border-white/5"><td className="p-3 font-bold text-yellow-400">stopPropagation</td><td className="p-3">🛑</td><td className="p-3">Prevent event from propagating further</td></tr>
                                <tr><td className="p-3 font-bold text-pink-400">preventDefault</td><td className="p-3">🚫</td><td className="p-3">Prevent default behavior (submit, navigate)</td></tr>
                            </tbody>
                        </table>
                    </div>

                    <Callout type="tip">
                        {'Interview asks about Events? Remember '}<Highlight>4 key points</Highlight>{':'}<br />
                        {'1️⃣ '}<strong>Flow</strong>{': Capturing ↓ → Target 🎯 → Bubbling ↑'}<br />
                        {'2️⃣ '}<strong>Bubbling</strong>{': click child = click parent (default behavior)'}<br />
                        {'3️⃣ '}<strong>Delegation</strong>{': 1 listener on parent, use event.target — saves memory + dynamic elements'}<br />
                        {'4️⃣ '}<strong>React</strong>{': SyntheticEvent + delegation at root + onClickCapture for capture phase'}
                    </Callout>
                </TopicModal>


                <TopicModal title="Web APIs — Observer Pattern" emoji="🔭" color="#14b8a6" summary={'IntersectionObserver, ResizeObserver, MutationObserver — why not use scroll events?'}>
                    <Paragraph>Browsers provide <Highlight>Observer APIs</Highlight> to monitor DOM changes — far more efficient than the old approach of scroll events + getBoundingClientRect.</Paragraph>

                    <Callout type="info">{'📦 '}<strong>Analogy: Observer = Delivery Notifications</strong><br /><br />
                        <strong>{'❌ Old way (Polling)'}</strong>{' = Calling the driver every second: "Is it here yet? Not yet? Not yet?" 📞📞📞 → energy waste'}<br />
                        <strong>{'✅ Observer (Push)'}</strong>{' = Enable notifications, driver '}<strong>calls you</strong>{' when arrived 🔔 → hands free, efficient'}<br /><br />
                        {'scroll event = polling (asking constantly). Observer = push notification (browser tells you when needed).'}
                    </Callout>

                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                            <div className="text-red-400 font-bold text-sm">{'❌ Old way: scroll + getBoundingClientRect'}</div>
                            <div className="text-slate-300 text-sm mt-1">
                                {'• Scroll event fires '}<strong>60-120 times/second</strong>{' — a light scroll = dozens of callbacks'}<br />
                                {'• '}<InlineCode>getBoundingClientRect()</InlineCode>{' = '}<strong>forced reflow</strong>{' — browser must recalculate layout EVERY call'}<br />
                                {'• Everything runs on '}<strong>main thread</strong>{' → UI janky, drains mobile battery'}<br />
                                {'• Even '}<InlineCode>throttle</InlineCode>{'/'}<InlineCode>debounce</InlineCode>{' still calls getBoundingClientRect → still forced reflow!'}<br />
                                {'• Using '}<InlineCode>useState</InlineCode>{' + scroll = '}<Highlight>60-120 re-renders/second</Highlight>{' 💀'}
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-teal-500/10 border border-teal-500/20">
                            <div className="text-teal-400 font-bold text-sm">{'👁️ IntersectionObserver — is element in viewport?'}</div>
                            <div className="text-slate-300 text-sm mt-1">
                                {'Replaces: '}<InlineCode>scroll</InlineCode>{' + '}<InlineCode>getBoundingClientRect()</InlineCode><br /><br />
                                {'• Runs '}<strong>off main thread</strong>{' — doesn\'t block UI'}<br />
                                {'• Callback only fires '}<strong>when element enters/leaves viewport</strong>{' (2 times vs 120/sec!)'}<br />
                                {'• '}<InlineCode>threshold</InlineCode>{': how much % visible to fire (0, 0.5, 1)'}<br />
                                {'• '}<InlineCode>rootMargin</InlineCode>{': expand detection zone (preload 200px ahead)'}<br />
                                {'• Use cases: '}<Highlight>lazy load images, infinite scroll, analytics tracking, scroll animations</Highlight>
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">{'📐 ResizeObserver — element size changes'}</div>
                            <div className="text-slate-300 text-sm mt-1">
                                {'Replaces: '}<InlineCode>window.resize</InlineCode>{' + '}<InlineCode>offsetWidth/offsetHeight</InlineCode><br /><br />
                                {'• Monitors '}<strong>individual elements</strong>{', not the whole window'}<br />
                                {'• Detects resize from '}<strong>content changes</strong>{', not just window resize'}<br />
                                {'• '}<InlineCode>contentRect</InlineCode>{', '}<InlineCode>borderBoxSize</InlineCode>{' — detailed size info'}<br />
                                {'• Use cases: '}<Highlight>responsive components, chart resize, text truncation</Highlight>
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <div className="text-purple-400 font-bold text-sm">{'🧬 MutationObserver — DOM changes'}</div>
                            <div className="text-slate-300 text-sm mt-1">
                                {'Replaces: '}<InlineCode>DOMSubtreeModified</InlineCode>{' (deprecated!)'}<br /><br />
                                {'• Monitors: '}<strong>attributes</strong>{', '}<strong>childList</strong>{', '}<strong>characterData</strong><br />
                                {'• '}<strong>Batched + async</strong>{' — groups multiple mutations into one callback'}<br />
                                {'• Use cases: '}<Highlight>3rd party script injection detection, dynamic DOM changes, WYSIWYG editors</Highlight>
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                            <div className="text-orange-400 font-bold text-sm">{'📊 Comparison: Old way vs Observer'}</div>
                            <div className="text-slate-300 text-sm mt-2">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-xs">
                                        <thead>
                                            <tr className="border-b border-white/10">
                                                <th className="text-left py-1.5 pr-2 text-slate-400 font-semibold"></th>
                                                <th className="text-left py-1.5 pr-2 text-red-400 font-semibold">Old way ❌</th>
                                                <th className="text-left py-1.5 text-teal-400 font-semibold">Observer ✅</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-slate-300">
                                            <tr className="border-b border-white/5"><td className="py-1.5 pr-2 font-bold">Callback</td><td className="py-1.5 pr-2">60-120 times/sec</td><td className="py-1.5">Only on change (2 times)</td></tr>
                                            <tr className="border-b border-white/5"><td className="py-1.5 pr-2 font-bold">Thread</td><td className="py-1.5 pr-2">Main thread (blocks UI)</td><td className="py-1.5">Off main thread</td></tr>
                                            <tr className="border-b border-white/5"><td className="py-1.5 pr-2 font-bold">Layout</td><td className="py-1.5 pr-2">Forced reflow every frame</td><td className="py-1.5">Browser handles internally</td></tr>
                                            <tr className="border-b border-white/5"><td className="py-1.5 pr-2 font-bold">Re-renders</td><td className="py-1.5 pr-2">60-120/sec with useState</td><td className="py-1.5">2 times (enter + leave)</td></tr>
                                            <tr><td className="py-1.5 pr-2 font-bold">Code</td><td className="py-1.5 pr-2">throttle + getBoundingClientRect + logic</td><td className="py-1.5">5 lines observer.observe()</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <CodeBlock title="observers.js">{`// ═══ 1. IntersectionObserver — Lazy load + Infinite scroll ═══

// ❌ Old way: scroll event + getBoundingClientRect (VERY BAD!)
window.addEventListener('scroll', () => {
  const rect = img.getBoundingClientRect() // forced reflow EVERY FRAME!
  if (rect.top < window.innerHeight) {
    img.src = img.dataset.src // load image
  }
}) // 💀 60-120 calls/sec, blocks main thread

// ✅ Observer: browser notifies when element enters viewport
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target
      img.src = img.dataset.src
      observer.unobserve(img) // done loading → stop observing
    }
  })
}, {
  rootMargin: '200px', // preload 200px before viewport
  threshold: 0.1       // 10% visible → fire
})

document.querySelectorAll('img[data-src]').forEach(img => {
  observer.observe(img) // set & forget! 🎉
})

// ═══ 2. Infinite Scroll ═══
const sentinel = document.getElementById('load-more')

const scrollObserver = new IntersectionObserver(async ([entry]) => {
  if (entry.isIntersecting) {
    const data = await fetch('/api/posts?page=' + nextPage)
    appendPosts(data)
    nextPage++
  }
})
scrollObserver.observe(sentinel)
// User scrolls near bottom → sentinel enters viewport → load more

// ═══ 3. ResizeObserver — Responsive component ═══

// ❌ Old way: window.resize only detects WINDOW changes
window.addEventListener('resize', () => {
  const width = chart.offsetWidth // forced reflow
  redrawChart(width)
})

// ✅ ResizeObserver: detects ELEMENT changes (even from content)
const resizeObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const { width, height } = entry.contentRect
    console.log('New size:', width, 'x', height)
    redrawChart(width) // only fires when element actually changes size
  }
})
resizeObserver.observe(chartContainer)

// ═══ 4. MutationObserver — Detect DOM changes ═══
const mutationObserver = new MutationObserver((mutations) => {
  mutations.forEach(mutation => {
    if (mutation.type === 'childList') {
      console.log('Nodes added:', mutation.addedNodes)
      console.log('Nodes removed:', mutation.removedNodes)
    }
    if (mutation.type === 'attributes') {
      console.log('Attr changed:', mutation.attributeName)
    }
  })
})

mutationObserver.observe(document.body, {
  childList: true,   // add/remove child nodes
  attributes: true,  // attribute changes
  subtree: true,     // monitor all descendants
})`}</CodeBlock>

                    <CodeBlock title="react-observers.tsx">{`// React + IntersectionObserver = Custom Hook

// ✅ useInView — reusable hook
function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting)
      // setState ONLY 2 times (enter + leave) instead of 120/sec!
    }, options)

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [options])

  return { ref, isInView }
}

// Usage:
function LazySection() {
  const { ref, isInView } = useInView({ threshold: 0.1 })
  return (
    <div ref={ref}>
      {isInView ? <HeavyChart /> : <Skeleton />}
    </div>
  )
}

// ✅ Infinite scroll with IntersectionObserver
function InfiniteList() {
  const [items, setItems] = useState([])
  const [page, setPage] = useState(1)
  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setPage(p => p + 1) // load more when sentinel is visible
      }
    })
    if (sentinelRef.current) observer.observe(sentinelRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    fetch('/api/items?page=' + page)
      .then(r => r.json())
      .then(data => setItems(prev => [...prev, ...data]))
  }, [page])

  return (
    <>
      {items.map(item => <Card key={item.id} {...item} />)}
      <div ref={sentinelRef} /> {/* invisible sentinel */}
    </>
  )
}

// ✅ ResizeObserver hook
function useElementSize() {
  const ref = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setSize({ width, height })
    })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return { ref, ...size }
}

// Usage: responsive component without media queries!
function ResponsiveGrid() {
  const { ref, width } = useElementSize()
  const columns = width > 800 ? 3 : width > 500 ? 2 : 1
  return (
    <div ref={ref} style={{
      display: 'grid',
      gridTemplateColumns: \`repeat(\${columns}, 1fr)\`
    }}>
      {children}
    </div>
  )
}`}</CodeBlock>

                    <Callout type="tip">
                        {'Interview asks about Observers? Remember '}<Highlight>3 key points</Highlight>{':'}<br />
                        {'1️⃣ '}<strong>Why?</strong>{' Scroll events block main thread + forced reflow. Observers run off main thread, fire only on change.'}<br />
                        {'2️⃣ '}<strong>3 Observers</strong>{': IntersectionObserver (viewport), ResizeObserver (size), MutationObserver (DOM changes)'}<br />
                        {'3️⃣ '}<strong>React pattern</strong>{': custom hooks (useInView, useElementSize) + cleanup observer.disconnect() in useEffect return'}
                    </Callout>
                </TopicModal>

                <TopicModal title="CSS Layout — Flexbox & Grid" emoji="📐" color="#38bdf8" summary="Layout from scratch without frameworks — an important interview skill">
                    <Paragraph>Frontend coding interviews often require building layouts <Highlight>from scratch without TailwindCSS</Highlight>. Must master both Flexbox and Grid.</Paragraph>

                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">📏 Flexbox — 1 Dimension</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Main axis</strong>: justify-content (start, center, space-between, space-around, space-evenly)<br />
                                • <strong>Cross axis</strong>: align-items (flex-start, center, stretch, baseline)<br />
                                • <strong>flex</strong>: shorthand for grow shrink basis → <InlineCode>flex: 1 0 auto</InlineCode><br />
                                • <strong>flex-wrap</strong>: allow items to wrap to next line (responsive)
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">📊 Grid — 2 Dimensions</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>grid-template-columns/rows</strong>: define tracks (px, fr, auto, minmax)<br />
                                • <strong>grid-area</strong>: named areas for complex layouts<br />
                                • <strong>auto-fill vs auto-fit</strong>: auto-fill keeps empty tracks, auto-fit collapses<br />
                                • <strong>minmax()</strong>: responsive columns without media queries
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <div className="text-purple-400 font-bold text-sm">🆚 When to Use Which</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Flexbox</strong>: navbar, card row, centering, sidebar + content<br />
                                • <strong>Grid</strong>: page layout, dashboard, image gallery, form layout<br />
                                • <strong>Combine</strong>: Grid for page layout, Flexbox for inner components<br />
                                • Interview tip: always ask {'"Does it need to be responsive?"'} → determines approach
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                            <div className="text-yellow-400 font-bold text-sm">📱 Responsive Design</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Mobile-first</strong>: default CSS for mobile, media queries for larger screens<br />
                                • <strong>Container queries</strong> (new!): responsive based on parent size instead of viewport<br />
                                • <strong>clamp()</strong>: fluid typography: <InlineCode>font-size: clamp(1rem, 2vw, 1.5rem)</InlineCode><br />
                                • <strong>Logical properties</strong>: margin-inline, padding-block (RTL support)
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                            <div className="text-red-400 font-bold text-sm">🎯 Box Model & Positioning</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>box-sizing: border-box</strong>: width includes padding + border (ALWAYS set!)<br />
                                • <strong>Position</strong>: static (default), relative, absolute, fixed, sticky<br />
                                • <strong>Stacking context</strong>: z-index only works within same stacking context<br />
                                • <strong>BFC</strong> (Block Formatting Context): overflow: hidden creates new BFC → clears floats
                            </div>
                        </div>
                    </div>

                    <CodeBlock title="css-layout.css">{`/* Flexbox — Navbar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  height: 64px;
}
.navbar__links { display: flex; gap: 16px; }

/* Grid — Dashboard Layout */
.dashboard {
  display: grid;
  grid-template-columns: 250px 1fr;      /* sidebar + content */
  grid-template-rows: 64px 1fr;          /* header + main */
  grid-template-areas:
    "header  header"
    "sidebar content";
  height: 100vh;
}
.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.content { grid-area: content; }

/* Responsive Cards — NO media queries */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

/* Holy Grail Layout — Flexbox */
.holy-grail { display: flex; flex-direction: column; min-height: 100vh; }
.holy-grail main { flex: 1; display: flex; }
.holy-grail .content { flex: 1; }
.holy-grail .sidebar { flex: 0 0 250px; }

/* Centering — multiple ways */
.center-flex { display: flex; justify-content: center; align-items: center; }
.center-grid { display: grid; place-items: center; }
.center-abs  { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); }`}</CodeBlock>

                    <Callout type="tip">
                        Interview: often requires building a <Highlight>responsive layout from scratch</Highlight>. Practice: Holy Grail Layout, Dashboard Grid, Responsive Card Grid, Modal centering.
                    </Callout>
                </TopicModal>

                <TopicModal title="Web Security — XSS, CSRF, CSP" emoji="🛡️" color="#38bdf8" summary="Common web security vulnerabilities — must know how to prevent them">
                    <Paragraph>Frontend developers <Highlight>must understand security</Highlight> — especially at big tech, security questions are very common.</Paragraph>

                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                            <div className="text-red-400 font-bold text-sm">💉 XSS (Cross-Site Scripting)</div>
                            <div className="text-slate-300 text-sm mt-1">
                                Attacker injects malicious JS into the page → steal cookies, redirect, keylog.<br />
                                <strong>3 types:</strong><br />
                                • <strong>Stored XSS</strong>: script stored in DB → every user sees it (most dangerous)<br />
                                • <strong>Reflected XSS</strong>: script in URL → server returns HTML containing the script<br />
                                • <strong>DOM-based XSS</strong>: script modifies DOM client-side (innerHTML, eval)<br />
                                <strong>Prevention:</strong> React auto-escapes JSX. NEVER use <InlineCode>dangerouslySetInnerHTML</InlineCode>. Sanitize input (DOMPurify).
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                            <div className="text-yellow-400 font-bold text-sm">🔗 CSRF (Cross-Site Request Forgery)</div>
                            <div className="text-slate-300 text-sm mt-1">
                                Attacker tricks user into sending requests from another site (e.g., transfer money).<br />
                                • User is logged into site A → visits site B → site B sends request to A<br />
                                • Browser auto-attaches cookies → server thinks it&apos;s a legitimate request<br />
                                <strong>Prevention:</strong><br />
                                • <strong>CSRF token</strong>: random token per session, verify each request<br />
                                • <strong>SameSite cookie</strong>: SameSite=Strict or Lax<br />
                                • <strong>Double submit</strong>: token in cookie + header, server compares
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">🔒 CSP (Content Security Policy)</div>
                            <div className="text-slate-300 text-sm mt-1">
                                HTTP header specifying allowed sources for loading resources.<br />
                                • <strong>script-src</strong>: only allow JS from specific sources<br />
                                • <strong>style-src</strong>: only allow CSS from specific sources<br />
                                • <strong>img-src</strong>: only allow images from specific sources<br />
                                • <InlineCode>{'{`Content-Security-Policy: script-src \'self\' https://cdn.example.com`}'}</InlineCode>
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">🍪 Cookie Security</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>HttpOnly</strong>: JS cannot read cookie → prevents XSS session theft<br />
                                • <strong>Secure</strong>: only sent over HTTPS<br />
                                • <strong>SameSite</strong>: Strict (same-site only), Lax (safe methods OK), None (all)<br />
                                • <strong>Domain + Path</strong>: scope cookie to specific subdomain/path
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <div className="text-purple-400 font-bold text-sm">🛡️ Other Security Headers</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>CORS</strong>: Access-Control-Allow-Origin — control cross-origin requests<br />
                                • <strong>X-Frame-Options</strong>: DENY — prevent clickjacking (iframe embed)<br />
                                • <strong>HSTS</strong>: force HTTPS, prevent SSL stripping<br />
                                • <strong>Subresource Integrity</strong>: verify CDN resources haven&apos;t been tampered
                            </div>
                        </div>
                    </div>

                    <CodeBlock title="security-examples.ts">{`// ❌ XSS Vulnerability
element.innerHTML = userInput // NEVER DO THIS
eval(userInput)               // NEVER DO THIS

// ✅ Safe: React auto-escapes
<div>{userInput}</div>  // React escapes special chars

// ✅ If you MUST use HTML, sanitize first
import DOMPurify from 'dompurify'
const clean = DOMPurify.sanitize(dirtyHTML)
<div dangerouslySetInnerHTML={{ __html: clean }} />

// ✅ Cookie security settings
Set-Cookie: session=abc123;
  HttpOnly;        // JS cannot read
  Secure;          // HTTPS only
  SameSite=Strict; // No cross-site
  Path=/;
  Max-Age=86400;

// ✅ Security headers (Next.js example)
// next.config.js
headers: [{
  source: '/(.*)',
  headers: [
    { key: 'Content-Security-Policy', value: "script-src 'self'" },
    { key: 'X-Frame-Options', value: 'DENY' },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'Strict-Transport-Security', value: 'max-age=31536000' },
  ]
}]`}</CodeBlock>

                    <Callout type="tip">
                        Interview: Always mention <Highlight>defense in depth</Highlight> — don&apos;t rely on a single layer.
                        XSS: escape + CSP + HttpOnly. CSRF: SameSite + token. Know how to explain <strong>why</strong> each measure is needed.
                    </Callout>
                </TopicModal>

                <TopicModal title="Core Web Vitals" emoji="📊" color="#38bdf8" summary="LCP, INP, CLS — how Google measures performance, how to optimize">
                    <Paragraph>Core Web Vitals are metrics <Highlight>Google uses for SEO ranking</Highlight>. Frontend engineers must know how to optimize them.</Paragraph>

                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">🖼️ LCP (Largest Contentful Paint) — {'< 2.5s'}</div>
                            <div className="text-slate-300 text-sm mt-1">
                                Time to render the largest visible element in the viewport.<br />
                                <strong>Optimize:</strong><br />
                                • <strong>Optimize images</strong>: WebP/AVIF, responsive srcset, lazy loading<br />
                                • <strong>Preload</strong>: critical assets (hero image, fonts)<br />
                                • <strong>SSR/SSG</strong>: HTML has content immediately (no waiting for JS)<br />
                                • <strong>CDN</strong>: serve static assets close to users
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">👆 INP (Interaction to Next Paint) — {'< 200ms'}</div>
                            <div className="text-slate-300 text-sm mt-1">
                                Time from user interaction → visual response (replaces FID).<br />
                                <strong>Optimize:</strong><br />
                                • <strong>Reduce JS execution</strong>: code splitting, tree shaking<br />
                                • <strong>Web Workers</strong>: heavy computation off main thread<br />
                                • <strong>Debounce/throttle</strong>: limit event handler frequency<br />
                                • <strong>requestIdleCallback</strong>: defer non-critical work
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                            <div className="text-yellow-400 font-bold text-sm">📐 CLS (Cumulative Layout Shift) — {'< 0.1'}</div>
                            <div className="text-slate-300 text-sm mt-1">
                                Measures unexpected layout shifts (content jumping around).<br />
                                <strong>Optimize:</strong><br />
                                • <strong>Set dimensions</strong>: width + height for images/videos/ads<br />
                                • <strong>font-display: optional</strong>: avoid FOUT (flash of unstyled text)<br />
                                • <strong>Skeleton loading</strong>: placeholder to keep layout stable<br />
                                • <strong>transform</strong> animations: don&apos;t trigger layout (composite only)
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <div className="text-purple-400 font-bold text-sm">🔧 Rendering Pipeline</div>
                            <div className="text-slate-300 text-sm mt-1">
                                <strong>JS → Style → Layout → Paint → Composite</strong><br />
                                • <strong>Layout thrashing</strong>: read layout → write → read → write → forced reflow!<br />
                                • <strong>Composite-only</strong>: transform + opacity — cheapest animations (GPU)<br />
                                • <strong>will-change</strong>: hint browser to prepare a new composite layer<br />
                                • <strong>contain</strong>: CSS containment — isolate rendering subtree
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                            <div className="text-red-400 font-bold text-sm">📏 Measurement & Tools</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Lighthouse</strong> (Chrome DevTools): comprehensive audit<br />
                                • <strong>web.dev/measure</strong>: online tool by Google<br />
                                • <strong>PageSpeed Insights</strong>: real user data (CrUX) + lab data<br />
                                • <strong>web-vitals</strong> library: measure CWV in production<br />
                                • <strong>Performance API</strong>: PerformanceObserver for custom metrics
                            </div>
                        </div>
                    </div>

                    <CodeBlock title="performance-optimization.tsx">{`// Measure Core Web Vitals in production
import { onLCP, onINP, onCLS } from 'web-vitals'

onLCP(metric => analytics.send('LCP', metric.value))
onINP(metric => analytics.send('INP', metric.value))
onCLS(metric => analytics.send('CLS', metric.value))

// ✅ Optimize images — responsive + lazy
<img
  src="/hero-800.webp"
  srcSet="/hero-400.webp 400w, /hero-800.webp 800w, /hero-1200.webp 1200w"
  sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px"
  loading="lazy"           // lazy: below fold, eager: above fold
  decoding="async"         // decode off main thread
  width={800} height={400} // prevent CLS!
  alt="Hero banner"
/>

// ✅ Preload critical resources
<link rel="preload" href="/fonts/Inter.woff2" as="font" crossOrigin="" />
<link rel="preload" href="/hero.webp" as="image" />
<link rel="preconnect" href="https://api.example.com" />

// ✅ Avoid layout thrashing
// ❌ Bad: read → write → read → write (forced reflow)
elements.forEach(el => {
  const height = el.offsetHeight  // read (force layout)
  el.style.height = height + 10   // write (invalidate layout)
})
// ✅ Good: batch reads, then batch writes
const heights = elements.map(el => el.offsetHeight)  // all reads
elements.forEach((el, i) => el.style.height = heights[i] + 10)  // all writes`}</CodeBlock>

                    <Callout type="tip">
                        Interview: When asked {'"The site is slow, what would you do?"'} → <Highlight>measure first (Lighthouse)</Highlight> → identify bottleneck (LCP? INP? CLS?) → apply specific solutions. Don&apos;t optimize blindly!
                    </Callout>
                    <a href="/blogs/core-web-vitals" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 Read detailed article →</a>
                </TopicModal>

                <TopicModal title="CSS Specificity & Cascade" emoji="⚖️" color="#38bdf8" summary="Specificity calculation, cascade order, inheritance — why doesn't my CSS apply?">
                    <Paragraph><Highlight>Specificity</Highlight> determines which CSS rule {'"wins"'} when there&apos;s a conflict — very common interview question.</Paragraph>
                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">📊 Specificity Hierarchy (low → high)</div>
                            <div className="text-slate-300 text-sm mt-1">
                                1. <strong>Type selectors</strong>: <InlineCode>div</InlineCode>, <InlineCode>p</InlineCode>, <InlineCode>h1</InlineCode> → (0,0,1)<br />
                                2. <strong>Class, pseudo-class, attribute</strong>: <InlineCode>.btn</InlineCode>, <InlineCode>:hover</InlineCode>, <InlineCode>[type=text]</InlineCode> → (0,1,0)<br />
                                3. <strong>ID selectors</strong>: <InlineCode>#header</InlineCode> → (1,0,0)<br />
                                4. <strong>Inline styles</strong>: style=&quot;...&quot; → (1,0,0,0)<br />
                                5. <strong>!important</strong>: overrides everything (avoid!)
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">🎯 Cascade Order</div>
                            <div className="text-slate-300 text-sm mt-1">
                                When specificity is equal, cascade order decides:<br />
                                1. <strong>Origin</strong>: User Agent → User → Author<br />
                                2. <strong>Specificity</strong>: calculated above<br />
                                3. <strong>Source order</strong>: later rule overrides earlier<br />
                                4. <strong>@layer</strong> (new!): cascade layers — control ordering
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                            <div className="text-yellow-400 font-bold text-sm">🧬 Inheritance</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Inherited</strong>: color, font-*, text-*, line-height, visibility<br />
                                • <strong>Not inherited</strong>: margin, padding, border, display, position<br />
                                • <InlineCode>inherit</InlineCode>: force inheritance | <InlineCode>initial</InlineCode>: reset to default<br />
                                • <InlineCode>unset</InlineCode>: inherit if normally inherited, initial otherwise
                            </div>
                        </div>
                    </div>
                    <CodeBlock title="specificity.css">{`/* Specificity calculation: (ID, Class, Type) */
p { color: blue; }                    /* (0,0,1) */
.text { color: green; }               /* (0,1,0) ✅ wins over p */
#main { color: red; }                 /* (1,0,0) ✅ wins over .text */
p.text.highlight { }                  /* (0,2,1) */
#main .text { }                       /* (1,1,0) */

/* ❌ Common mistake: over-specific selectors */
div#app > ul.nav > li.item > a.link { }  /* (1,3,4) — too specific! */

/* ✅ Better: keep specificity low */
.nav-link { }                          /* (0,1,0) — easy to override */

/* @layer — cascade layers (modern CSS) */
@layer base, components, utilities;
@layer base { .btn { padding: 8px 16px; } }
@layer components { .btn { background: blue; } }
@layer utilities { .btn-lg { padding: 16px 32px; } }
/* Order: base < components < utilities */`}</CodeBlock>
                    <Callout type="tip">Interview quiz: <InlineCode>{'.a.b'}</InlineCode> vs <InlineCode>{'.a .b'}</InlineCode> — first is <Highlight>AND</Highlight> (same element), second is <Highlight>descendant</Highlight>. Being able to calculate specificity = senior CSS skill.</Callout>
                </TopicModal>

                <TopicModal title="CSS Animations & Transitions" emoji="✨" color="#38bdf8" summary="transition, keyframes, transform, will-change — micro-interactions for premium UI">
                    <Paragraph><Highlight>Animations</Highlight> make UI feel alive and professional — but you must understand performance implications.</Paragraph>
                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">🔄 Transition vs Animation</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Transition</strong>: A → B (2 states, triggered by state change)<br />
                                • <strong>Animation</strong>: A → B → C → ... (@keyframes, auto-play, loop)<br />
                                • Transition for <strong>hover effects, state changes</strong><br />
                                • Animation for <strong>loading spinners, attention getters</strong>
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">🚀 Performance-safe Properties</div>
                            <div className="text-slate-300 text-sm mt-1">
                                <strong>Composite-only</strong> (GPU accelerated, cheapest):<br />
                                • <InlineCode>transform</InlineCode>: translate, scale, rotate<br />
                                • <InlineCode>opacity</InlineCode><br />
                                <strong>Avoid animating</strong> (triggers layout/paint):<br />
                                • ❌ width, height, top, left, margin, padding<br />
                                • Use <InlineCode>transform: translateX()</InlineCode> instead of <InlineCode>left: Xpx</InlineCode>
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <div className="text-purple-400 font-bold text-sm">🎭 Easing Functions</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <InlineCode>ease</InlineCode>: default, most common<br />
                                • <InlineCode>ease-in-out</InlineCode>: smooth for modal, page transitions<br />
                                • <InlineCode>cubic-bezier()</InlineCode>: custom curve (bounce, spring)<br />
                                • <InlineCode>steps()</InlineCode>: frame-by-frame (sprite animation)
                            </div>
                        </div>
                    </div>
                    <CodeBlock title="animations.css">{`/* Transition — smooth hover effect */
.button {
  background: #3b82f6;
  transform: translateY(0);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.button:hover {
  transform: translateY(-2px);       /* GPU-accelerated! */
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

/* Keyframe Animation — loading spinner */
@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
.spinner { animation: spin 1s linear infinite; }

/* prefers-reduced-motion — accessibility! */
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}`}</CodeBlock>
                    <Callout type="tip">Interview: always mention <Highlight>prefers-reduced-motion</Highlight> when discussing animations — shows accessibility awareness. Only animate <strong>transform + opacity</strong> for 60fps.</Callout>
                </TopicModal>

                <TopicModal title="CSS Variables & Modern CSS" emoji="🎨" color="#38bdf8" summary="Custom properties, container queries, :has(), nesting — CSS is getting more powerful">
                    <Paragraph><Highlight>Modern CSS</Highlight> has many powerful features — reducing dependency on JS and preprocessors.</Paragraph>
                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">🎨 CSS Custom Properties (Variables)</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • Declare: <InlineCode>--color-primary: #3b82f6</InlineCode><br />
                                • Use: <InlineCode>color: var(--color-primary)</InlineCode><br />
                                • <strong>Cascade</strong>: follows CSS cascade (override per element/media query)<br />
                                • <strong>Runtime dynamic</strong>: changeable via JS, SASS variables cannot<br />
                                • Use for: theming (dark/light), design tokens, responsive values
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">📦 Container Queries</div>
                            <div className="text-slate-300 text-sm mt-1">
                                Responsive based on <strong>parent container size</strong> instead of viewport.<br />
                                • <InlineCode>container-type: inline-size</InlineCode> on parent<br />
                                • <InlineCode>@container (min-width: 400px)</InlineCode> instead of @media<br />
                                • Component-level responsive — reusable everywhere!
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <div className="text-purple-400 font-bold text-sm">🆕 Modern CSS Selectors</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <InlineCode>:has()</InlineCode>: parent selector! <InlineCode>.card:has(img)</InlineCode> — card containing img<br />
                                • <InlineCode>:is() / :where()</InlineCode>: group selectors, reduce repetition<br />
                                • <strong>CSS Nesting</strong> (native!): write nested rules like SASS<br />
                                • <InlineCode>:focus-visible</InlineCode>: only keyboard focus (not click)
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                            <div className="text-yellow-400 font-bold text-sm">🔧 Useful Modern Properties</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <InlineCode>aspect-ratio: 16/9</InlineCode>: maintain ratio without padding hack<br />
                                • <InlineCode>gap</InlineCode>: works in flexbox now! (not just grid)<br />
                                • <InlineCode>accent-color</InlineCode>: style checkboxes/radios natively<br />
                                • <InlineCode>color-mix()</InlineCode>: blend colors in CSS<br />
                                • <InlineCode>text-wrap: balance</InlineCode>: balanced text wrapping
                            </div>
                        </div>
                    </div>
                    <CodeBlock title="modern-css.css">{`/* CSS Variables — theming */
:root {
  --color-primary: #3b82f6;
  --color-bg: #ffffff;
}
[data-theme="dark"] {
  --color-primary: #60a5fa;
  --color-bg: #0f172a;
}

/* Container Queries — component responsive */
.card-container { container-type: inline-size; }
@container (min-width: 400px) {
  .card { display: flex; gap: 16px; }
}

/* :has() — parent selector */
.form-group:has(input:invalid) { border-color: red; }

/* CSS Nesting (native!) */
.card {
  padding: 16px;
  & .title { font-size: 1.25rem; }
  &:hover { box-shadow: 0 4px 12px rgba(0,0,0,.1); }
}

/* Modern utilities */
.video { aspect-ratio: 16 / 9; }
input[type="checkbox"] { accent-color: var(--color-primary); }`}</CodeBlock>
                    <Callout type="tip">Interview: mentioning <Highlight>container queries</Highlight> and <Highlight>:has()</Highlight> → shows you follow CSS evolution. CSS Variables vs SASS variables: CSS vars are <strong>runtime dynamic</strong>, SASS is compile-time.</Callout>
                </TopicModal>

                <TopicModal title="CSS Architecture — BEM, Modules, CSS-in-JS" emoji="🏗️" color="#38bdf8" summary="Naming conventions, scoping strategies, when to use each approach">
                    <Paragraph>Large projects need <Highlight>CSS architecture</Highlight> to avoid naming conflicts and maintain code easily.</Paragraph>
                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">📐 BEM (Block Element Modifier)</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Block</strong>: <InlineCode>.card</InlineCode> — standalone component<br />
                                • <strong>Element</strong>: <InlineCode>.card__title</InlineCode> — part of block<br />
                                • <strong>Modifier</strong>: <InlineCode>.card--featured</InlineCode> — variant<br />
                                • Pros: predictable, no nesting, flat specificity<br />
                                • Cons: verbose class names
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">🔒 CSS Modules</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • Auto-generate unique class names (scoped by default)<br />
                                • <InlineCode>import styles from &apos;./Card.module.css&apos;</InlineCode><br />
                                • <InlineCode>className={'{styles.card}'}</InlineCode> → <InlineCode>.Card_card__x7f3k</InlineCode><br />
                                • Next.js supports natively. No runtime cost
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <div className="text-purple-400 font-bold text-sm">💅 CSS-in-JS</div>
                            <div className="text-slate-300 text-sm mt-1">
                                <strong>Runtime</strong>: styled-components, Emotion → inject {'<style>'} at runtime<br />
                                <strong>Zero-runtime</strong>: Vanilla Extract, Linaria → extract CSS at build time<br />
                                • Runtime CSS-in-JS: <strong>performance overhead</strong> (style injection)<br />
                                • Zero-runtime: <strong>best DX + zero overhead</strong> (type-safe + no runtime)
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                            <div className="text-yellow-400 font-bold text-sm">🆚 Comparison</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Utility-first</strong> (Tailwind): fast, but verbose HTML<br />
                                • <strong>CSS Modules</strong>: scoped, no runtime, simple. Best for most projects<br />
                                • <strong>Zero-runtime CSS-in-JS</strong>: type-safe, co-located, enterprise<br />
                                • <strong>BEM</strong>: legacy but still widely used, no build tool needed
                            </div>
                        </div>
                    </div>
                    <CodeBlock title="css-architecture.tsx">{`/* BEM naming */
.card { }
.card__header { }
.card__body { }
.card--featured { border: 2px solid gold; }
.card--disabled { opacity: 0.5; }

/* CSS Modules */
// Card.module.css
.card { padding: 16px; border-radius: 8px; }
.title { font-weight: bold; }

// Card.tsx
import styles from './Card.module.css'
<div className={styles.card}>
  <h2 className={styles.title}>Hello</h2>
</div>
// Output: <div class="Card_card__x7f3k">

/* Vanilla Extract (zero-runtime, type-safe) */
// card.css.ts
import { style } from '@vanilla-extract/css'
export const card = style({
  padding: 16,
  borderRadius: 8,
  ':hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },
})
// TypeScript error if you typo a property name!`}</CodeBlock>

                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                            <div className="text-emerald-400 font-bold text-sm">🏆 Why Vanilla Extract wins for enterprise?</div>
                            <div className="text-slate-300 text-sm mt-1">
                                <strong>1. Zero Runtime</strong> — CSS generated at build time, no JS injected at runtime<br />
                                → styled-components/Emotion inject {'<style>'} via JS → slower, affects LCP/INP<br /><br />
                                <strong>2. Full TypeScript</strong> — write styles in TypeScript<br />
                                → Typo <InlineCode>backgroundCollor</InlineCode> → TS catches it immediately. CSS Modules typos only show in UI<br /><br />
                                <strong>3. Theme Contract</strong> — <InlineCode>createThemeContract</InlineCode> enforces all themes must have all tokens<br />
                                → Compile error if theme is missing a variable → impossible to ship broken theme<br /><br />
                                <strong>4. Sprinkles</strong> — <InlineCode>createSprinkles</InlineCode> = type-safe utility classes (like Tailwind but with TS checks)<br /><br />
                                <strong>5. SSR-friendly</strong> — no CSS hydration needed (styled-components must hydrate)
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-slate-500/10 border border-slate-500/20">
                            <div className="text-slate-300 font-bold text-sm">📊 Detailed Comparison</div>
                            <div className="text-slate-300 text-sm mt-1">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-xs border-collapse mt-1">
                                        <thead><tr className="border-b border-slate-600">
                                            <th className="text-left p-1.5 text-slate-400">Approach</th>
                                            <th className="text-left p-1.5 text-slate-400">Type Safe</th>
                                            <th className="text-left p-1.5 text-slate-400">Runtime</th>
                                            <th className="text-left p-1.5 text-slate-400">Scoped</th>
                                            <th className="text-left p-1.5 text-slate-400">Best for</th>
                                        </tr></thead>
                                        <tbody>
                                            <tr className="border-b border-slate-700"><td className="p-1.5 text-emerald-400 font-bold">Vanilla Extract</td><td className="p-1.5">✅ Full TS</td><td className="p-1.5 text-green-400">Zero</td><td className="p-1.5">✅</td><td className="p-1.5">Enterprise, design system</td></tr>
                                            <tr className="border-b border-slate-700"><td className="p-1.5">CSS Modules</td><td className="p-1.5">❌</td><td className="p-1.5 text-green-400">Zero</td><td className="p-1.5">✅</td><td className="p-1.5">Simple–medium projects</td></tr>
                                            <tr className="border-b border-slate-700"><td className="p-1.5">Tailwind</td><td className="p-1.5">❌</td><td className="p-1.5 text-green-400">Zero</td><td className="p-1.5">❌ Global</td><td className="p-1.5">Startups, rapid prototyping</td></tr>
                                            <tr className="border-b border-slate-700"><td className="p-1.5">styled-components</td><td className="p-1.5">❌ Partial</td><td className="p-1.5 text-red-400">+12KB</td><td className="p-1.5">✅</td><td className="p-1.5">Legacy, component libs</td></tr>
                                            <tr><td className="p-1.5">BEM</td><td className="p-1.5">❌</td><td className="p-1.5 text-green-400">Zero</td><td className="p-1.5">❌ Manual</td><td className="p-1.5">No build tool needed</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <CodeBlock title="vanilla-extract-advanced.ts">{`// === Theme Contract (enforce all themes have same tokens) ===
import { createThemeContract, createTheme, style } from '@vanilla-extract/css'

const vars = createThemeContract({
  color: { primary: null, secondary: null, text: null, bg: null },
  space: { sm: null, md: null, lg: null },
  font: { body: null, heading: null },
})

// ✅ TypeScript enforces ALL tokens must be defined
const lightTheme = createTheme(vars, {
  color: { primary: '#3b82f6', secondary: '#8b5cf6', text: '#1e293b', bg: '#ffffff' },
  space: { sm: '4px', md: '8px', lg: '16px' },
  font: { body: 'Inter, sans-serif', heading: 'Outfit, sans-serif' },
})

// ❌ Compile error: missing 'bg' in color!
// const brokenTheme = createTheme(vars, {
//   color: { primary: '#fff', secondary: '#ccc', text: '#000' }, // ← Error: missing 'bg'
//   ...
// })

// === Type-safe styles with autocomplete ===
const card = style({
  backgroundColor: vars.color.bg,    // ← autocomplete all tokens!
  padding: vars.space.md,
  fontFamily: vars.font.body,
  borderRadius: 8,
  // backgroundCollor: '...',  ← ❌ TypeScript error immediately!
})

// === Sprinkles = type-safe utility classes (like Tailwind with TS) ===
import { defineProperties, createSprinkles } from '@vanilla-extract/sprinkles'

const responsiveProps = defineProperties({
  conditions: {
    mobile: {}, tablet: { '@media': '(min-width: 768px)' },
    desktop: { '@media': '(min-width: 1024px)' },
  },
  properties: {
    display: ['none', 'flex', 'grid', 'block'],
    padding: vars.space,  // ← only allows design tokens!
    gap: vars.space,
  },
})

const sprinkles = createSprinkles(responsiveProps)

// Usage — like Tailwind but type-safe!
<div className={sprinkles({
  display: { mobile: 'block', desktop: 'grid' },
  padding: 'md',     // ← autocomplete: 'sm' | 'md' | 'lg'
  // padding: 'xxx', // ← ❌ TypeScript error!
})} />`}</CodeBlock>

                    <Callout type="tip">Interview: asked {'"How do you organize CSS in a large project?"'} → answer CSS Modules (simple) or Vanilla Extract (enterprise). Explain: VE = <Highlight>TypeScript for CSS</Highlight> — zero runtime, theme contract enforces consistency, sprinkles = type-safe Tailwind. Senior answer = knowing trade-offs.</Callout>
                </TopicModal>
            </div>

            <Callout type="tip">
                Google and Meta love asking: &quot;Build component X from scratch without a library&quot; —
                e.g., autocomplete, infinite scroll, modal, drag &amp; drop, virtual list.
                Practicing building pure UI components is hugely beneficial.
            </Callout>

            <Heading3>3.3 Build Component from Scratch</Heading3>
            <Paragraph>
                Companies often give <Highlight>practical coding tests</Highlight>: build a component in 30-60 minutes.
                Doesn&apos;t need to be perfect — but must work, have clean code, and you should be able to explain your decisions.
            </Paragraph>
            <div className="my-4 space-y-2">
                <TopicModal title="Searchable Dropdown / Autocomplete" emoji="🔍" color="#f59e0b" summary="Classic test — input + dropdown + filter + keyboard navigation">
                    <Paragraph>This is the <Highlight>most common</Highlight> interview coding test. Must know how to build from scratch.</Paragraph>
                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                            <div className="text-yellow-400 font-bold text-sm">📋 Basic Requirements</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • Input text → filter options list<br />
                                • Click option → select + close dropdown<br />
                                • Click outside → close dropdown<br />
                                • Keyboard: Arrow Up/Down navigate, Enter select, Escape close
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">⭐ Bonus points (senior level)</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • Debounce input (API call)<br />
                                • Loading state<br />
                                • Highlight match text<br />
                                • Virtualized list (for 1000+ options)<br />
                                • Accessibility: aria-expanded, aria-activedescendant
                            </div>
                        </div>
                    </div>
                    <CodeBlock title="SearchableDropdown.tsx">{`function SearchableDropdown({ options, onSelect }) {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const ref = useRef(null)

  const filtered = options.filter(o =>
    o.label.toLowerCase().includes(query.toLowerCase())
  )

  // Close on click outside
  useEffect(() => {
    const handler = (e) => {
      if (!ref.current?.contains(e.target)) setIsOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex(i => Math.min(i + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex(i => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      onSelect(filtered[activeIndex])
      setIsOpen(false)
    } else if (e.key === 'Escape') {
      setIsOpen(false)
    }
  }

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <input
        value={query}
        onChange={e => { setQuery(e.target.value); setIsOpen(true) }}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder="Search..."
      />
      {isOpen && filtered.length > 0 && (
        <ul style={{
          position: 'absolute', top: '100%', left: 0, right: 0,
          maxHeight: 200, overflowY: 'auto', border: '1px solid #ccc',
        }}>
          {filtered.map((item, i) => (
            <li
              key={item.value}
              onClick={() => { onSelect(item); setIsOpen(false) }}
              style={{ padding: 8, cursor: 'pointer',
                background: i === activeIndex ? '#e0f0ff' : 'transparent'
              }}
            >{item.label}</li>
          ))}
        </ul>
      )}
    </div>
  )
}`}</CodeBlock>
                    <Callout type="tip">Tip: Always remember <Highlight>click outside to close</Highlight> and <Highlight>keyboard navigation</Highlight> — 2 things many candidates forget.</Callout>
                </TopicModal>

                <TopicModal title="Modal / Dialog" emoji="📦" color="#8b5cf6" summary="Overlay, focus trap, escape close, portal — simple component but many edge cases">
                    <Paragraph>Modal seems simple but has <Highlight>many edge cases</Highlight> that interviewers love to test.</Paragraph>
                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <div className="text-purple-400 font-bold text-sm">📋 Important Requirements</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • Overlay (backdrop) click → close<br />
                                • Escape key → close<br />
                                • <strong>Focus trap</strong>: Tab only cycles within modal (a11y!)<br />
                                • <strong>Body scroll lock</strong>: prevent page scroll when modal is open<br />
                                • <strong>Portal</strong>: render at root DOM (avoid z-index issues)<br />
                                • Return focus on close (focus back to the button that opened modal)
                            </div>
                        </div>
                    </div>
                    <CodeBlock title="Modal.tsx">{`function Modal({ isOpen, onClose, children }) {
  const prevFocusRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      prevFocusRef.current = document.activeElement
      document.body.style.overflow = 'hidden' // lock scroll

      const handleEsc = (e) => e.key === 'Escape' && onClose()
      document.addEventListener('keydown', handleEsc)
      return () => {
        document.removeEventListener('keydown', handleEsc)
        document.body.style.overflow = '' // unlock scroll
        prevFocusRef.current?.focus() // return focus
      }
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={e => e.stopPropagation()} // prevent close
        role="dialog"
        aria-modal="true"
      >
        <button onClick={onClose} aria-label="Close">✕</button>
        {children}
      </div>
    </div>,
    document.body
  )
}`}</CodeBlock>
                    <Callout type="tip">Edge cases: <Highlight>multiple modals stacked</Highlight> (z-index), <Highlight>animation on enter/exit</Highlight>, <Highlight>responsive sizing</Highlight>. Mentioning these → bonus points.</Callout>
                </TopicModal>

                <TopicModal title="Pagination Component" emoji="📄" color="#06b6d4" summary="Client-side vs server-side, page numbers, ellipsis — common test for junior/mid">
                    <Paragraph>Pagination seems simple but you need to handle <Highlight>ellipsis logic</Highlight> + edge cases.</Paragraph>
                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                            <div className="text-cyan-400 font-bold text-sm">📋 Key features</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • Previous / Next buttons (disabled on first/last page)<br />
                                • Page numbers with ellipsis (1 ... 4 5 6 ... 20)<br />
                                • Current page highlight<br />
                                • Controlled: page + onChange from parent<br />
                                • Optional: items per page, total count display
                            </div>
                        </div>
                    </div>
                    <CodeBlock title="pagination-logic.ts">{`// Core logic: generate page numbers with ellipsis
function getPageNumbers(current, total, siblings = 1) {
  const range = []
  const left = Math.max(2, current - siblings)
  const right = Math.min(total - 1, current + siblings)

  // Always show first page
  range.push(1)

  // Left ellipsis
  if (left > 2) range.push('...')

  // Middle pages
  for (let i = left; i <= right; i++) range.push(i)

  // Right ellipsis
  if (right < total - 1) range.push('...')

  // Always show last page
  if (total > 1) range.push(total)

  return range
}

// Examples:
// getPageNumbers(1, 10)  → [1, 2, 3, ..., 10]
// getPageNumbers(5, 10)  → [1, ..., 4, 5, 6, ..., 10]
// getPageNumbers(10, 10) → [1, ..., 8, 9, 10]`}</CodeBlock>
                    <Callout type="tip">Server-side pagination: <Highlight>API returns total + page + limit</Highlight>. Client-side: slice array. Interviews usually ask you to build client-side pagination.</Callout>
                </TopicModal>

                <TopicModal title="Form Validation" emoji="📝" color="#10b981" summary="Real-time validation, error messages, submit handling — the most practical test">
                    <Paragraph>Form validation is the <Highlight>most practical</Highlight> coding test — every project needs it.</Paragraph>
                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">📋 Common Requirements</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • Required fields (show error on blur or submit)<br />
                                • Email format validation (regex)<br />
                                • Password strength (min length, uppercase, number, special char)<br />
                                • Confirm password match<br />
                                • Real-time validation (on change) vs on submit<br />
                                • Disable submit button when form is invalid
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">⭐ Best Approaches</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Production</strong>: React Hook Form + Zod<br />
                                • <strong>Interview</strong>: custom useForm hook (shows understanding)<br />
                                • <strong>UX</strong>: validate on blur (first touch) → on change (after error)<br />
                                • <strong>Pattern</strong>: errors object, touched object, isValid boolean
                            </div>
                        </div>
                    </div>
                    <CodeBlock title="useForm-hook.ts">{`// Custom useForm hook (interview approach)
function useForm(initialValues, validate) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const handleChange = (field) => (e) => {
    const newValues = { ...values, [field]: e.target.value }
    setValues(newValues)
    // Validate on change only if already touched
    if (touched[field]) {
      setErrors(validate(newValues))
    }
  }

  const handleBlur = (field) => () => {
    setTouched(t => ({ ...t, [field]: true }))
    setErrors(validate(values))
  }

  const handleSubmit = (onSubmit) => (e) => {
    e.preventDefault()
    const errs = validate(values)
    setErrors(errs)
    setTouched(Object.keys(values).reduce((acc, k) =>
      ({ ...acc, [k]: true }), {}))
    if (Object.keys(errs).length === 0) onSubmit(values)
  }

  return { values, errors, touched, handleChange, handleBlur, handleSubmit,
    isValid: Object.keys(validate(values)).length === 0 }
}

// Usage
const { values, errors, handleChange, handleBlur, handleSubmit } = useForm(
  { email: '', password: '' },
  (v) => {
    const e = {}
    if (!v.email) e.email = 'Email is required'
    else if (!/\\S+@\\S+\\.\\S+/.test(v.email)) e.email = 'Invalid email'
    if (!v.password) e.password = 'Password is required'
    else if (v.password.length < 8) e.password = 'Minimum 8 characters'
    return e
  }
)`}</CodeBlock>
                    <Callout type="tip">Interview: build a custom <Highlight>useForm</Highlight> hook → shows you understand form state management. Mention that production uses React Hook Form + Zod → shows practical awareness.</Callout>
                </TopicModal>

                <TopicModal title="Infinite Scroll / Lazy Load" emoji="♾️" color="#f43f5e" summary="IntersectionObserver + pagination API — mid/senior level test">
                    <Paragraph>Infinite scroll = <Highlight>IntersectionObserver + API pagination</Highlight>. Must handle loading, error, no more data.</Paragraph>
                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20">
                            <div className="text-rose-400 font-bold text-sm">📋 Implementation steps</div>
                            <div className="text-slate-300 text-sm mt-1">
                                1. Fetch initial data (page 1)<br />
                                2. Render sentinel element at end of list<br />
                                3. IntersectionObserver observes sentinel<br />
                                4. When sentinel is visible → fetch page N+1<br />
                                5. Append data (don&apos;t replace!)<br />
                                6. Stop when: API returns empty array or hasMore = false
                            </div>
                        </div>
                    </div>
                    <CodeBlock title="useInfiniteScroll.ts">{`function useInfiniteScroll(fetchFn) {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const sentinelRef = useRef(null)

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return
    setLoading(true)
    try {
      const newItems = await fetchFn(page)
      if (newItems.length === 0) {
        setHasMore(false)
      } else {
        setData(prev => [...prev, ...newItems]) // append!
        setPage(p => p + 1)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [page, loading, hasMore, fetchFn])

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) loadMore()
    }, { threshold: 0.1 })
    if (sentinelRef.current) observer.observe(sentinelRef.current)
    return () => observer.disconnect()
  }, [loadMore])

  return { data, loading, hasMore, sentinelRef }
}

// Usage
function ProductList() {
  const { data, loading, hasMore, sentinelRef } = useInfiniteScroll(
    (page) => fetch(\`/api/products?page=\${page}\`).then(r => r.json())
  )
  return (
    <div>
      {data.map(p => <ProductCard key={p.id} product={p} />)}
      {loading && <Spinner />}
      {hasMore && <div ref={sentinelRef} style={{ height: 1 }} />}
    </div>
  )
}`}</CodeBlock>
                    <Callout type="tip">Edge cases: <Highlight>race conditions</Highlight> (abort previous request), <Highlight>duplicate items</Highlight> (dedupe by id), <Highlight>scroll restoration</Highlight> when navigating back.</Callout>
                </TopicModal>
            </div>

            <Heading3>3.4 Popular Libraries</Heading3>
            <Paragraph>
                The job market uses many <Highlight>component libraries</Highlight> and UI frameworks.
                Knowing how to use them + explaining why you chose a library → big bonus points.
            </Paragraph>
            <div className="my-4 space-y-2">
                <TopicModal title="Ant Design (antd)" emoji="🐜" color="#1890ff" summary="Most popular component library for enterprise — tables, forms, layouts">
                    <Paragraph><Highlight>Ant Design</Highlight> = #1 choice for admin dashboards and enterprise apps.</Paragraph>
                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">📋 When to use Ant Design?</div>
                            <div className="text-slate-300 text-sm mt-1">
                                ✅ Admin panel, CRM, ERP, back-office systems<br />
                                ✅ Need rich components: Table (sort/filter/pagination), Form, DatePicker, Tree<br />
                                ✅ Team wants a consistent ready-made design system<br />
                                ❌ Consumer-facing products (lacks personality, heavy bundle)
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                            <div className="text-yellow-400 font-bold text-sm">⚠️ Common Interview Questions</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • How to customize antd theme? → ConfigProvider + token<br />
                                • antd Table performance with large data? → virtual scroll, columnWidth<br />
                                • Tree-shaking antd? → import from antd/es (v5 auto tree-shakes)<br />
                                • Form validation with antd? → Form.Item rules + async validator
                            </div>
                        </div>
                    </div>
                    <Callout type="tip">Interview: if JD mentions antd → <Highlight>must know the Table component</Highlight> (custom render, sorter, filter, editable cells) since 90% of antd projects are data-heavy admin panels.</Callout>
                </TopicModal>

                <TopicModal title="Tailwind CSS" emoji="🌊" color="#38bdf8" summary="Utility-first CSS framework — popular at startups and product companies">
                    <Paragraph><Highlight>Tailwind</Highlight> = #1 choice for startups and consumer products.</Paragraph>
                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                            <div className="text-emerald-400 font-bold text-sm">✅ Pros</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Dev speed</strong>: No context switching (HTML/CSS), incredibly fast UI prototyping<br />
                                • <strong>Consistency</strong>: Constrained by predefined design tokens (spacing, colors) → uniform UI<br />
                                • <strong>Performance</strong>: Compile-time purge removes unused classes → tiny CSS file<br />
                                • <strong>Naming</strong>: Avoids the nightmare of naming classes like BEM
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20">
                            <div className="text-rose-400 font-bold text-sm">⚠️ Trade-offs & Cons</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>HTML Verbosity</strong>: Long and bloated JSX code (mitigated by componentization)<br />
                                • <strong>Learning curve</strong>: Requires learning the utility classes and mapping ecosystem initially<br />
                                • <strong>Coupling</strong>: Tight coupling of styling with the rendering component (violates separation of concerns compared to CSS Modules)
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">🎯 Why choose Tailwind?</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>#1 Ecosystem</strong>: Unmatched integration with excellent headless UI libraries (shadcn/ui, Radix, HeadlessUI).<br />
                                • <strong>CSS Liberation</strong>: Enables developers (even backend-focused devs) to build beautiful, proportional UIs without immense CSS expertise.<br />
                                • <strong>Startups/Outsourcing</strong>: Ideal for rapid shipping and easy code handoffs without the overhead of maintaining complex custom CSS architectures.
                            </div>
                        </div>
                    </div>
                    <Callout type="tip">
                        Interviews often ask: &quot;Tailwind vs CSS Modules?&quot; → Answer: <Highlight>Trade-off between Speed and Separation</Highlight>.
                        Tailwind is fast to write but leads to messy HTML; CSS Modules keep HTML clean but require constant file switching.
                        Don&apos;t forget to mention <Highlight>clsx / tailwind-merge (or cn)</Highlight> when handling conditional classes in Tailwind!
                    </Callout>
                </TopicModal>

                <TopicModal title="React Hook Form + Zod" emoji="📋" color="#ec4899" summary="Form management + schema validation — most popular combo today">
                    <Paragraph><Highlight>React Hook Form + Zod</Highlight> = best form combo today — performance + type-safety.</Paragraph>
                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-pink-500/10 border border-pink-500/20">
                            <div className="text-pink-400 font-bold text-sm">🔥 Why better than Formik?</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Performance</strong>: uncontrolled components → fewer re-renders<br />
                                • <strong>Bundle size</strong>: ~9KB vs Formik ~44KB<br />
                                • <strong>Zod</strong>: schema validation, TypeScript-first, reusable<br />
                                • <strong>DevTools</strong>: React Hook Form DevTools<br />
                                • <strong>Server</strong>: works with Next.js Server Actions
                            </div>
                        </div>
                    </div>
                    <CodeBlock title="react-hook-form-zod.tsx">{`import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Minimum 8 characters'),
  confirmPassword: z.string(),
}).refine(d => d.password === d.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

function RegisterForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  })
  return (
    <form onSubmit={handleSubmit(data => console.log(data))}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}

      <input type="password" {...register('password')} />
      {errors.password && <span>{errors.password.message}</span>}

      <input type="password" {...register('confirmPassword')} />
      {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}

      <button type="submit">Register</button>
    </form>
  )
}`}</CodeBlock>
                    <Callout type="tip">Interview: if asked about forms → mention <Highlight>React Hook Form + Zod</Highlight> (modern) instead of Formik (legacy). Explaining why RHF is faster (uncontrolled) → bonus.</Callout>
                </TopicModal>

                <TopicModal title="TanStack Query (React Query)" emoji="🔄" color="#ef4444" summary="Server state management — fetching, caching, sync — replaces useEffect fetch">
                    <Paragraph><Highlight>TanStack Query</Highlight> solves the data fetching problem that useEffect + useState handles very poorly.</Paragraph>
                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                            <div className="text-red-400 font-bold text-sm">❌ Problems with useEffect fetch</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • No cache → refetches every mount<br />
                                • Race conditions (user navigates quickly)<br />
                                • No loading/error states built-in<br />
                                • No retry, no pagination, no optimistic updates<br />
                                • No background refetch (stale data)<br />
                                • No type-safety (unless using libraries like Zod)
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">✅ TanStack Query solves all of this</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Auto caching</strong>: staleTime, gcTime<br />
                                • <strong>Auto refetch</strong>: on window focus, on reconnect<br />
                                • <strong>Loading/error/success</strong> states built-in<br />
                                • <strong>Mutations</strong>: optimistic updates, invalidation<br />
                                • <strong>Infinite queries</strong>: useInfiniteQuery for pagination
                            </div>
                        </div>
                    </div>
                    <CodeBlock title="react-query.tsx">{`import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// Fetch data
function UserProfile({ userId }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetch(\`/api/users/\${userId}\`).then(r => r.json()),
    staleTime: 5 * 60 * 1000, // cache 5 minutes
  })

  if (isLoading) return <Spinner />
  if (error) return <Error message={error.message} />
  return <div>{data.name}</div>
}

// Mutation + invalidation
function UpdateUser() {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (data) => fetch('/api/users', {
      method: 'PUT', body: JSON.stringify(data)
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] }) // refetch!
    },
  })
  // mutation.mutate({ name: 'New Name' })
}`}</CodeBlock>
                    <Callout type="tip">Interview: if asked {'"How to fetch data in React?"'} → don&apos;t just say useEffect. Say <Highlight>TanStack Query</Highlight> + explain why (caching, race conditions, stale data) → senior answer.</Callout>
                </TopicModal>
            </div>

            {/* ===== PHASE 4 ===== */}
        </>
    )
}
