import { BlogPost } from '../types'
import { CodeBlock, Heading2, Heading3, Paragraph, Highlight, InlineCode, Callout } from '../components/BlogComponents'

const reactHooks: BlogPost = {
    slug: 'react-hooks-chi-tiet',
    title: {
        vi: 'React Hooks — Hướng dẫn chi tiết từng Hook',
        en: 'React Hooks — A Detailed Guide to Every Hook',
    },
    description: {
        vi: 'Tìm hiểu tất cả React Hooks: useState, useEffect, useRef, useMemo, useCallback, useContext, useReducer... và so sánh với lifecycle của Class Component.',
        en: 'Learn all React Hooks: useState, useEffect, useRef, useMemo, useCallback, useContext, useReducer... and compare with Class Component lifecycle methods.',
    },
    date: '2025-08-18',
    tags: ['React', 'Hooks', 'Fundamentals'],
    emoji: '🪝',
    color: '#61DAFB',
    content: {
        vi: (
            <>
                <Paragraph>
                    <Highlight>React Hooks</Highlight> ra đời từ React 16.8 (2019), cho phép sử dụng state và các tính năng
                    React khác trong <Highlight>Function Component</Highlight> — không cần viết Class nữa.
                </Paragraph>

                <Callout type="info">
                    Bài viết này sẽ đi chi tiết từng Hook, cách dùng, best practices,
                    và so sánh với lifecycle methods của Class Component.
                </Callout>

                {/* ===== useState ===== */}
                <Heading2>1. useState — Quản lý State</Heading2>

                <Paragraph>
                    <InlineCode>useState</InlineCode> là Hook cơ bản nhất — cho phép component &quot;nhớ&quot; dữ liệu giữa các lần render.
                </Paragraph>

                <CodeBlock title="useState.tsx">{`import { useState } from 'react'

function Counter() {
    const [count, setCount] = useState(0) // [giá trị, hàm cập nhật]

    return (
        <div>
            <p>Đếm: {count}</p>
            <button onClick={() => setCount(count + 1)}>+1</button>
            <button onClick={() => setCount(prev => prev - 1)}>-1</button>
        </div>
    )
}`}</CodeBlock>

                <Heading3>Object & Array State</Heading3>

                <Paragraph>
                    React so sánh state bằng <Highlight>reference</Highlight> (===), không so sánh deep.
                    Phải tạo <Highlight>object/array mới</Highlight> để trigger re-render:
                </Paragraph>

                <CodeBlock title="object-array-state.tsx">{`// ✅ Object — spread operator
const [user, setUser] = useState({ name: 'Khương', age: 25 })
setUser({ ...user, age: 26 })          // Tạo object mới, giữ các field khác
setUser(prev => ({ ...prev, age: prev.age + 1 }))  // Callback form

// ❌ SAI — mutate trực tiếp, React không biết state đã thay đổi!
user.age = 26
setUser(user)  // Cùng reference → không re-render!

// ✅ Array — tạo mảng mới
const [items, setItems] = useState<string[]>([])
setItems([...items, 'new item'])        // Thêm phần tử
setItems(items.filter(i => i !== 'x'))  // Xóa phần tử
setItems(items.map(i =>                 // Cập nhật phần tử
    i.id === targetId ? { ...i, done: true } : i
))

// 🏭 Ví dụ thực tế từ CartTable.tsx:
// Tăng số lượng sản phẩm trong giỏ hàng
setCartList(
    cartList.map(item =>
        String(item.product?._id) === String(_id)
            ? { ...item, quantity: item.quantity + 1 }  // Cập nhật item match
            : item                                      // Giữ nguyên các item khác
    )
)`}</CodeBlock>

                <Heading3>Batching & Stale Closure</Heading3>

                <CodeBlock title="batching.tsx">{`// React 18+ tự động batch nhiều setState thành 1 re-render
function handleClick() {
    setCount(count + 1)   // count = 0
    setCount(count + 1)   // count vẫn = 0 (stale closure!)
    setCount(count + 1)   // count vẫn = 0 → kết quả: 1 (không phải 3!)
}

// ✅ Fix: dùng callback form
function handleClick() {
    setCount(prev => prev + 1)  // prev = 0 → 1
    setCount(prev => prev + 1)  // prev = 1 → 2
    setCount(prev => prev + 1)  // prev = 2 → 3 ✅
}`}</CodeBlock>

                <Heading3>Lazy Initialization</Heading3>

                <Paragraph>
                    Khi initial value tốn chi phí tính toán, truyền <Highlight>function</Highlight> thay vì giá trị:
                </Paragraph>

                <CodeBlock title="lazy-init.tsx">{`// ❌ Chạy mỗi lần render (lãng phí)
const [data, setData] = useState(expensiveComputation())

// ✅ Chỉ chạy 1 lần khi mount
const [data, setData] = useState(() => expensiveComputation())`}</CodeBlock>

                <Callout type="tip">
                    <strong>3 quy tắc vàng của useState:</strong><br />
                    1. Update state dựa trên state cũ → luôn dùng callback: <InlineCode>setState(prev =&gt; ...)</InlineCode><br />
                    2. Object/Array → luôn tạo bản sao mới (spread, map, filter)<br />
                    3. Initial value tốn kém → truyền function: <InlineCode>useState(() =&gt; compute())</InlineCode>
                </Callout>

                {/* ===== useEffect ===== */}
                <Heading2>2. useEffect — Side Effects</Heading2>

                <Paragraph>
                    <InlineCode>useEffect</InlineCode> xử lý các &quot;tác dụng phụ&quot;: gọi API, subscribe events,
                    thay đổi DOM, timer... Nó chạy <Highlight>sau khi render</Highlight>.
                </Paragraph>

                <CodeBlock title="useEffect.tsx">{`import { useEffect, useState } from 'react'

function UserProfile({ userId }) {
    const [user, setUser] = useState(null)

    // Chạy khi userId thay đổi
    useEffect(() => {
        let cancelled = false

        async function fetchUser() {
            const res = await fetch(\`/api/users/\${userId}\`)
            const data = await res.json()
            if (!cancelled) setUser(data)
        }
        fetchUser()

        // Cleanup function — chạy khi unmount hoặc trước effect tiếp theo
        return () => { cancelled = true }
    }, [userId]) // ← dependency array

    return <div>{user?.name}</div>
}`}</CodeBlock>

                <Heading3>3 kiểu Dependency Array</Heading3>

                <div className="my-6 overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="text-left p-3 text-slate-400 font-medium">Cú pháp</th>
                                <th className="text-left p-3 text-slate-400 font-medium">Khi nào chạy</th>
                                <th className="text-left p-3 text-slate-400 font-medium">Class tương đương</th>
                            </tr>
                        </thead>
                        <tbody className="text-slate-300">
                            <tr className="border-b border-white/5">
                                <td className="p-3"><InlineCode>useEffect(fn)</InlineCode></td>
                                <td className="p-3">Mỗi lần render</td>
                                <td className="p-3">componentDidUpdate (mỗi lần)</td>
                            </tr>
                            <tr className="border-b border-white/5">
                                <td className="p-3"><InlineCode>useEffect(fn, [])</InlineCode></td>
                                <td className="p-3">Chỉ 1 lần khi mount</td>
                                <td className="p-3"><InlineCode>componentDidMount</InlineCode></td>
                            </tr>
                            <tr>
                                <td className="p-3"><InlineCode>useEffect(fn, [a, b])</InlineCode></td>
                                <td className="p-3">Khi a hoặc b thay đổi</td>
                                <td className="p-3">componentDidUpdate + điều kiện</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <Heading3>❌ Không truyền async trực tiếp</Heading3>

                <CodeBlock title="async-effect.tsx">{`// ❌ SAI — useEffect callback phải trả về void hoặc cleanup function
// async function luôn trả về Promise → React không xử lý được!
useEffect(async () => {
    const data = await fetchData()
    setData(data)
}, [])  // TypeScript error: Promise<void> ≠ void | Destructor

// ✅ ĐÚNG — tạo async function bên trong
useEffect(() => {
    const loadData = async () => {
        const data = await fetchData()
        setData(data)
    }
    loadData()

    return () => { /* cleanup vẫn hoạt động */ }
}, [])`}</CodeBlock>

                <Heading3>🧹 Cleanup Patterns</Heading3>

                <Paragraph>
                    Cleanup chạy khi <Highlight>unmount</Highlight> hoặc <Highlight>trước effect tiếp theo</Highlight>.
                    Nếu không cleanup → memory leak, race condition!
                </Paragraph>

                <CodeBlock title="cleanup-patterns.tsx">{`// 1️⃣ Timer — clearInterval khi unmount
useEffect(() => {
    const id = setInterval(() => setTime(t => t + 1), 1000)
    return () => clearInterval(id)  // 🧹 Dừng timer
}, [])

// 2️⃣ Event Listener — remove khi unmount
useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
}, [])

// 3️⃣ Fetch — cancel request cũ tránh race condition
// User gõ "a" → "ab" → "abc" nhanh
// Response "a" có thể về SAU "abc" → hiển thị sai!
useEffect(() => {
    let cancelled = false
    fetch(\`/api/search?q=\${query}\`)
        .then(res => res.json())
        .then(data => {
            if (!cancelled) setResults(data)  // Chỉ set nếu chưa bị cancel
        })
    return () => { cancelled = true }  // 🧹 Ignore response cũ
}, [query])

// 🏭 Ví dụ thực tế — useDebounce.ts trong project:
useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(handler)  // 🧹 Cancel timeout cũ khi value đổi
}, [value, delay])`}</CodeBlock>

                <Heading3>⚠️ Dependency Array Pitfalls</Heading3>

                <CodeBlock title="deps-pitfalls.tsx">{`// ❌ Object/Array trong deps — tạo mới mỗi render → effect chạy vô hạn!
useEffect(() => {
    fetchData(filters)
}, [{ status: 'active', page: 1 }])  // Object mới mỗi render!

// ✅ Fix: dùng primitive values hoặc useMemo
useEffect(() => {
    fetchData(filters)
}, [filters.status, filters.page])  // Primitive → so sánh stable

// ❌ Quên dependency → stale closure
const [count, setCount] = useState(0)
useEffect(() => {
    const id = setInterval(() => {
        console.log(count)  // Luôn = 0 (stale!)
    }, 1000)
    return () => clearInterval(id)
}, [])  // Thiếu count trong deps!

// ✅ Fix: dùng callback form hoặc thêm dependency
useEffect(() => {
    const id = setInterval(() => {
        setCount(prev => prev + 1)  // Callback form — không cần count trong deps
    }, 1000)
    return () => clearInterval(id)
}, [])`}</CodeBlock>

                <Callout type="tip">
                    <strong>4 quy tắc vàng của useEffect:</strong><br />
                    1. Không truyền <InlineCode>async</InlineCode> trực tiếp làm callback<br />
                    2. Luôn cleanup: timer, listener, subscription, fetch<br />
                    3. Object/function trong deps → dùng <InlineCode>useMemo</InlineCode>/<InlineCode>useCallback</InlineCode> hoặc tách primitive<br />
                    4. ESLint rule <InlineCode>exhaustive-deps</InlineCode> → bật và tuân thủ!
                </Callout>

                {/* ===== useRef ===== */}
                <Heading2>3. useRef — Tham chiếu không gây re-render</Heading2>

                <Paragraph>
                    <InlineCode>useRef</InlineCode> tạo một &quot;hộp&quot; chứa giá trị có thể thay đổi mà{' '}
                    <Highlight>không gây re-render</Highlight>. Thường dùng để truy cập DOM element hoặc giữ giá trị giữa các render.
                </Paragraph>

                <CodeBlock title="useRef.tsx">{`import { useRef, useEffect } from 'react'

function TextInput() {
    const inputRef = useRef<HTMLInputElement>(null)
    const renderCount = useRef(0)

    // Truy cập DOM element
    useEffect(() => {
        inputRef.current?.focus() // Auto-focus khi mount
    }, [])

    // Đếm số lần render (không gây re-render)
    renderCount.current++

    return (
        <div>
            <input ref={inputRef} placeholder="Auto-focused!" />
            <p>Rendered {renderCount.current} times</p>
        </div>
    )
}`}</CodeBlock>

                <Heading3>useRef vs useState</Heading3>

                <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-4">
                        <div className="text-blue-400 font-bold text-sm mb-2">useState</div>
                        <ul className="text-slate-300 text-sm space-y-1.5">
                            <li>✅ Thay đổi → re-render</li>
                            <li>✅ Hiển thị trên UI</li>
                            <li>❌ Không nên dùng cho giá trị &quot;ẩn&quot;</li>
                        </ul>
                    </div>
                    <div className="rounded-xl bg-purple-500/10 border border-purple-500/20 p-4">
                        <div className="text-purple-400 font-bold text-sm mb-2">useRef</div>
                        <ul className="text-slate-300 text-sm space-y-1.5">
                            <li>✅ Thay đổi → KHÔNG re-render</li>
                            <li>✅ Truy cập DOM elements</li>
                            <li>✅ Giữ timer IDs, previous values</li>
                        </ul>
                    </div>
                </div>

                {/* ===== useMemo ===== */}
                <Heading2>4. useMemo — Ghi nhớ giá trị tính toán</Heading2>

                <Paragraph>
                    <InlineCode>useMemo</InlineCode> lưu cache kết quả tính toán và chỉ tính lại khi dependencies thay đổi.
                    Dùng cho <Highlight>expensive computations</Highlight>.
                </Paragraph>

                <CodeBlock title="useMemo.tsx">{`import { useMemo, useState } from 'react'

function ProductList({ products, searchTerm }) {
    // ❌ Tính lại mỗi lần render (kể cả khi products không đổi)
    // const filtered = products.filter(p => p.name.includes(searchTerm))

    // ✅ Chỉ tính lại khi products hoặc searchTerm thay đổi
    const filtered = useMemo(() => {
        console.log('Filtering...')
        return products.filter(p =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
    }, [products, searchTerm])

    return (
        <ul>
            {filtered.map(p => <li key={p.id}>{p.name}</li>)}
        </ul>
    )
}`}</CodeBlock>

                <Callout type="warning">
                    Đừng lạm dụng <InlineCode>useMemo</InlineCode>! Chỉ dùng khi tính toán thực sự tốn kém.
                    Nếu filter một mảng nhỏ (&lt;100 items), không cần memo.
                </Callout>

                <Heading3>useMemo vs useEffect — Tại sao không dùng useEffect?</Heading3>

                <Paragraph>
                    Lỗi phổ biến: dùng <InlineCode>useEffect</InlineCode> + <InlineCode>useState</InlineCode> để tính derived data.
                    Đây là <Highlight>anti-pattern</Highlight> vì gây <strong>2 lần render thay vì 1</strong>.
                </Paragraph>

                <CodeBlock title="usememo-vs-useeffect.tsx">{`// ❌ ANTI-PATTERN: useEffect + useState cho derived data
function ProductList({ products, searchTerm }) {
    const [filtered, setFiltered] = useState([])

    useEffect(() => {
        // Render lần 1: filtered = [] (data cũ/sai)
        // Effect chạy SAU render → set state → trigger render lần 2
        setFiltered(
            products.filter(p => p.name.includes(searchTerm))
        )
    }, [products, searchTerm])
    // Render lần 2: filtered = data đúng
    // → User thấy FLASH: data cũ → data mới 😵

    return <ul>{filtered.map(p => <li key={p.id}>{p.name}</li>)}</ul>
}

// ✅ CORRECT: useMemo — tính TRONG render, chỉ 1 lần render
function ProductList({ products, searchTerm }) {
    const filtered = useMemo(() => {
        return products.filter(p => p.name.includes(searchTerm))
    }, [products, searchTerm])
    // → filtered luôn đúng ngay lần render đầu tiên

    return <ul>{filtered.map(p => <li key={p.id}>{p.name}</li>)}</ul>
}`}</CodeBlock>

                <div className="my-6 overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="text-left p-3 text-slate-400 font-medium">Tiêu chí</th>
                                <th className="text-left p-3 text-red-400 font-medium">❌ useEffect + useState</th>
                                <th className="text-left p-3 text-green-400 font-medium">✅ useMemo</th>
                            </tr>
                        </thead>
                        <tbody className="text-slate-300">
                            <tr className="border-b border-white/5">
                                <td className="p-3 text-slate-400">Khi nào tính?</td>
                                <td className="p-3">SAU render (async)</td>
                                <td className="p-3">TRONG render (sync)</td>
                            </tr>
                            <tr className="border-b border-white/5">
                                <td className="p-3 text-slate-400">Số lần render</td>
                                <td className="p-3">2 lần (cũ → mới)</td>
                                <td className="p-3">1 lần (đúng ngay)</td>
                            </tr>
                            <tr className="border-b border-white/5">
                                <td className="p-3 text-slate-400">UI flash?</td>
                                <td className="p-3">Có (data cũ → mới)</td>
                                <td className="p-3">Không</td>
                            </tr>
                            <tr className="border-b border-white/5">
                                <td className="p-3 text-slate-400">Thêm state?</td>
                                <td className="p-3">Cần useState riêng</td>
                                <td className="p-3">Không cần</td>
                            </tr>
                            <tr>
                                <td className="p-3 text-slate-400">Dùng khi</td>
                                <td className="p-3">Side effects (API, timer)</td>
                                <td className="p-3">Derived/computed data</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <Heading3>🔧 Cơ chế hoạt động bên trong useMemo</Heading3>

                <Paragraph>
                    <InlineCode>useMemo</InlineCode> hoạt động dựa trên <Highlight>Fiber node&apos;s memoizedState</Highlight> — nó lưu cả giá trị lẫn deps vào linked list của hooks.
                </Paragraph>

                <CodeBlock title="usememo-internals.tsx">{`// Pseudocode: React làm gì khi gặp useMemo

// === LẦN MOUNT ĐẦU TIÊN ===
function mountMemo(factory, deps) {
    const hook = createNewHook()    // Tạo hook node trong linked list
    const value = factory()          // Chạy callback, lấy giá trị
    hook.memoizedState = [value, deps]  // Lưu [giá trị, deps]
    return value
}

// === CÁC LẦN RENDER SAU ===
function updateMemo(factory, deps) {
    const hook = getExistingHook()   // Lấy hook từ linked list (theo vị trí)
    const [prevValue, prevDeps] = hook.memoizedState

    // So sánh từng dependency bằng Object.is()
    if (areEqual(prevDeps, deps)) {
        return prevValue             // ✅ Deps không đổi → trả về cache
    }

    // ❌ Deps thay đổi → tính lại
    const newValue = factory()       // Chạy lại callback
    hook.memoizedState = [newValue, deps]  // Cập nhật cache
    return newValue
}

// === SO SÁNH DEPS ===
function areEqual(prevDeps, nextDeps) {
    for (let i = 0; i < prevDeps.length; i++) {
        if (!Object.is(prevDeps[i], nextDeps[i])) {
            return false  // Chỉ cần 1 dep khác → tính lại
        }
    }
    return true  // Tất cả deps giống → dùng cache
}

// ⚠️ Object.is() so sánh REFERENCE, không phải deep equal!
Object.is(1, 1)           // true  (primitive)
Object.is('a', 'a')       // true  (primitive)
Object.is({}, {})         // false (khác reference!)
Object.is([1,2], [1,2])   // false (khác reference!)

// → Đây là lý do tại sao:
const obj = { a: 1 }
useMemo(() => compute(obj), [obj])  // ❌ Tính lại MỖI render!
// Vì mỗi render tạo obj mới → reference khác → Object.is = false

// Fix:
useMemo(() => compute(obj), [obj.a])  // ✅ Dùng primitive
// hoặc:
const stableObj = useMemo(() => ({ a: 1 }), [])  // ✅ Stable reference`}</CodeBlock>

                <div className="my-6 space-y-2">
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">📊 Timeline so sánh</div>
                        <div className="text-slate-300 text-sm mt-1">
                            <strong>useMemo:</strong> Render → useMemo check deps → (cache hoặc tính lại) → Kết quả có ngay → Paint<br /><br />
                            <strong>useEffect:</strong> Render (data cũ) → Paint (user thấy data cũ) → Effect chạy → setState → Render lại → Paint (data mới)
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">📌 Quy tắc vàng</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Nếu giá trị <strong>tính được từ props/state hiện tại</strong> → <InlineCode>useMemo</InlineCode><br />
                            • Nếu cần <strong>side effect</strong> (fetch API, update DOM, subscribe) → <InlineCode>useEffect</InlineCode><br />
                            • Nếu giá trị đơn giản (string concat, boolean check) → <strong>không cần gì cả</strong>, tính trực tiếp
                        </div>
                    </div>
                </div>

                {/* ===== useCallback ===== */}
                <Heading2>5. useCallback — Ghi nhớ function</Heading2>

                <Paragraph>
                    <InlineCode>useCallback</InlineCode> ghi nhớ tham chiếu function — tránh tạo function mới mỗi lần render.
                    Hữu ích khi truyền callback xuống <Highlight>child component đã memo</Highlight>.
                </Paragraph>

                <CodeBlock title="useCallback.tsx">{`import { useCallback, useState, memo } from 'react'

// Child component đã memo — chỉ re-render khi props thay đổi
const ExpensiveChild = memo(({ onClick, label }) => {
    console.log('ExpensiveChild rendered:', label)
    return <button onClick={onClick}>{label}</button>
})

function Parent() {
    const [count, setCount] = useState(0)
    const [name, setName] = useState('')

    // ❌ Function mới mỗi render → ExpensiveChild re-render
    // const handleClick = () => setCount(c => c + 1)

    // ✅ Function được memo → ExpensiveChild KHÔNG re-render khi name đổi
    const handleClick = useCallback(() => {
        setCount(c => c + 1)
    }, []) // [] vì không phụ thuộc gì

    return (
        <div>
            <input value={name} onChange={e => setName(e.target.value)} />
            <p>Count: {count}</p>
            <ExpensiveChild onClick={handleClick} label="Increment" />
        </div>
    )
}`}</CodeBlock>

                <Heading3>useMemo vs useCallback</Heading3>

                <CodeBlock title="comparison.tsx">{`// useMemo — ghi nhớ GIÁ TRỊ
const memoizedValue = useMemo(() => computeExpensive(a, b), [a, b])

// useCallback — ghi nhớ FUNCTION
const memoizedFn = useCallback(() => doSomething(a, b), [a, b])

// Tương đương:
// useCallback(fn, deps) === useMemo(() => fn, deps)`}</CodeBlock>

                {/* ===== useContext ===== */}
                <Heading2>6. useContext — Chia sẻ dữ liệu toàn cục</Heading2>

                <Paragraph>
                    <InlineCode>useContext</InlineCode> cho phép component con truy cập dữ liệu từ component cha{' '}
                    <Highlight>mà không cần truyền props qua từng tầng</Highlight> (tránh prop drilling).
                </Paragraph>

                <CodeBlock title="useContext.tsx">{`import { createContext, useContext, useState } from 'react'

// 1. Tạo Context
const ThemeContext = createContext<{
    theme: 'light' | 'dark'
    toggle: () => void
}>({ theme: 'light', toggle: () => {} })

// 2. Provider (bọc ở tầng cao)
function ThemeProvider({ children }) {
    const [theme, setTheme] = useState<'light' | 'dark'>('dark')
    const toggle = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

    return (
        <ThemeContext.Provider value={{ theme, toggle }}>
            {children}
        </ThemeContext.Provider>
    )
}

// 3. Consumer (dùng ở bất kỳ component con nào)
function Header() {
    const { theme, toggle } = useContext(ThemeContext)

    return (
        <header className={theme === 'dark' ? 'bg-black' : 'bg-white'}>
            <button onClick={toggle}>Toggle: {theme}</button>
        </header>
    )
}`}</CodeBlock>

                <Callout type="tip">
                    Kết hợp <InlineCode>useContext</InlineCode> + <InlineCode>useReducer</InlineCode> để tạo global state
                    management đơn giản — thay thế Redux cho các app nhỏ/vừa.
                </Callout>

                {/* ===== useReducer ===== */}
                <Heading2>7. useReducer — State phức tạp</Heading2>

                <Paragraph>
                    <InlineCode>useReducer</InlineCode> thay thế <InlineCode>useState</InlineCode> khi state có{' '}
                    <Highlight>logic phức tạp</Highlight>, nhiều sub-values, hoặc next state phụ thuộc previous state.
                </Paragraph>

                <CodeBlock title="useReducer.tsx">{`import { useReducer } from 'react'

// State type
type CartState = {
    items: { id: string; name: string; qty: number }[]
    total: number
}

// Action types
type CartAction =
    | { type: 'ADD_ITEM'; payload: { id: string; name: string; price: number } }
    | { type: 'REMOVE_ITEM'; payload: { id: string } }
    | { type: 'CLEAR' }

// Reducer function (pure, no side effects)
function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case 'ADD_ITEM':
            return {
                ...state,
                items: [...state.items, { ...action.payload, qty: 1 }],
                total: state.total + action.payload.price,
            }
        case 'REMOVE_ITEM':
            return {
                ...state,
                items: state.items.filter(i => i.id !== action.payload.id),
            }
        case 'CLEAR':
            return { items: [], total: 0 }
        default:
            return state
    }
}

function Cart() {
    const [cart, dispatch] = useReducer(cartReducer, { items: [], total: 0 })

    return (
        <div>
            <p>Total: {cart.total}đ ({cart.items.length} items)</p>
            <button onClick={() => dispatch({
                type: 'ADD_ITEM',
                payload: { id: '1', name: 'Áo', price: 200000 }
            })}>
                Thêm áo
            </button>
            <button onClick={() => dispatch({ type: 'CLEAR' })}>
                Xóa giỏ
            </button>
        </div>
    )
}`}</CodeBlock>

                <Heading3>useState vs useReducer</Heading3>

                <div className="my-6 overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="text-left p-3 text-slate-400 font-medium">Tiêu chí</th>
                                <th className="text-left p-3 text-blue-400 font-medium">useState</th>
                                <th className="text-left p-3 text-purple-400 font-medium">useReducer</th>
                            </tr>
                        </thead>
                        <tbody className="text-slate-300">
                            <tr className="border-b border-white/5">
                                <td className="p-3 text-slate-400">State đơn giản</td>
                                <td className="p-3">✅ Lý tưởng</td>
                                <td className="p-3">Overkill</td>
                            </tr>
                            <tr className="border-b border-white/5">
                                <td className="p-3 text-slate-400">State phức tạp</td>
                                <td className="p-3">Khó maintain</td>
                                <td className="p-3">✅ Lý tưởng</td>
                            </tr>
                            <tr className="border-b border-white/5">
                                <td className="p-3 text-slate-400">Testing</td>
                                <td className="p-3">Phải test component</td>
                                <td className="p-3">✅ Test reducer riêng</td>
                            </tr>
                            <tr>
                                <td className="p-3 text-slate-400">Debugging</td>
                                <td className="p-3">Trung bình</td>
                                <td className="p-3">✅ Action log rõ ràng</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* ===== useLayoutEffect ===== */}
                <Heading2>8. useLayoutEffect — Chạy trước paint</Heading2>

                <Paragraph>
                    Giống <InlineCode>useEffect</InlineCode> nhưng chạy <Highlight>đồng bộ sau DOM update, trước browser paint</Highlight>.
                    Dùng khi cần đo DOM hoặc tránh flickering.
                </Paragraph>

                <CodeBlock title="useLayoutEffect.tsx">{`import { useLayoutEffect, useRef, useState } from 'react'

function Tooltip({ children }) {
    const ref = useRef<HTMLDivElement>(null)
    const [height, setHeight] = useState(0)

    // Chạy trước paint → không bị flicker
    useLayoutEffect(() => {
        if (ref.current) {
            setHeight(ref.current.getBoundingClientRect().height)
        }
    }, [children])

    return (
        <div>
            <div ref={ref}>{children}</div>
            <p>Height: {height}px</p>
        </div>
    )
}`}</CodeBlock>

                <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-4">
                        <div className="text-blue-400 font-bold text-sm mb-2">useEffect</div>
                        <div className="text-slate-300 text-sm">Render → Paint → Effect (async)</div>
                        <div className="text-slate-400 text-xs mt-1">99% trường hợp dùng cái này</div>
                    </div>
                    <div className="rounded-xl bg-yellow-500/10 border border-yellow-500/20 p-4">
                        <div className="text-yellow-400 font-bold text-sm mb-2">useLayoutEffect</div>
                        <div className="text-slate-300 text-sm">Render → Effect (sync) → Paint</div>
                        <div className="text-slate-400 text-xs mt-1">Chỉ dùng khi đo DOM / tránh flicker</div>
                    </div>
                </div>

                {/* ===== React 18/19 Hooks ===== */}
                <Heading2>9. Hooks mới (React 18+)</Heading2>

                <Heading3>useId — Tạo ID duy nhất</Heading3>

                <CodeBlock title="useId.tsx">{`import { useId } from 'react'

function FormField({ label }) {
    const id = useId() // Tạo ID unique, SSR-safe

    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <input id={id} />
        </div>
    )
}`}</CodeBlock>

                <Heading3>useTransition — UI không bị block</Heading3>

                <CodeBlock title="useTransition.tsx">{`import { useTransition, useState } from 'react'

function SearchPage() {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    const [isPending, startTransition] = useTransition()

    function handleSearch(e) {
        const value = e.target.value
        setQuery(value) // Ưu tiên cao: update input ngay

        // Ưu tiên thấp: search có thể chậm không sao
        startTransition(() => {
            setResults(filterProducts(value)) // Không block UI
        })
    }

    return (
        <div>
            <input value={query} onChange={handleSearch} />
            {isPending && <p>Loading...</p>}
            <ProductList items={results} />
        </div>
    )
}`}</CodeBlock>

                <Heading3>useActionState — Form handling (React 19)</Heading3>

                <CodeBlock title="useActionState.tsx">{`import { useActionState } from 'react'

async function submitForm(prevState, formData) {
    const name = formData.get('name')
    if (!name) return { error: 'Tên không được trống' }

    await saveToDb(name)
    return { success: true, message: 'Đã lưu!' }
}

function MyForm() {
    const [state, action, isPending] = useActionState(submitForm, null)

    return (
        <form action={action}>
            <input name="name" />
            <button disabled={isPending}>
                {isPending ? 'Đang lưu...' : 'Lưu'}
            </button>
            {state?.error && <p className="text-red-500">{state.error}</p>}
            {state?.success && <p className="text-green-500">{state.message}</p>}
        </form>
    )
}`}</CodeBlock>

                {/* ===== Lifecycle Comparison ===== */}
                <Heading2>10. So sánh Hooks vs Class Lifecycle</Heading2>

                <Paragraph>
                    Đây là bảng so sánh toàn diện giữa <Highlight>Lifecycle methods</Highlight> của Class Component
                    và <Highlight>Hooks</Highlight> tương đương trong Function Component:
                </Paragraph>

                <div className="my-6 overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="text-left p-3 text-yellow-400 font-medium">Class Lifecycle</th>
                                <th className="text-left p-3 text-blue-400 font-medium">Hook tương đương</th>
                                <th className="text-left p-3 text-slate-400 font-medium">Ghi chú</th>
                            </tr>
                        </thead>
                        <tbody className="text-slate-300">
                            <tr className="border-b border-white/5">
                                <td className="p-3"><InlineCode>constructor</InlineCode></td>
                                <td className="p-3"><InlineCode>useState(initialValue)</InlineCode></td>
                                <td className="p-3">Khởi tạo state</td>
                            </tr>
                            <tr className="border-b border-white/5">
                                <td className="p-3"><InlineCode>componentDidMount</InlineCode></td>
                                <td className="p-3"><InlineCode>useEffect(fn, [])</InlineCode></td>
                                <td className="p-3">Chạy 1 lần sau mount</td>
                            </tr>
                            <tr className="border-b border-white/5">
                                <td className="p-3"><InlineCode>componentDidUpdate</InlineCode></td>
                                <td className="p-3"><InlineCode>useEffect(fn, [deps])</InlineCode></td>
                                <td className="p-3">Chạy khi deps thay đổi</td>
                            </tr>
                            <tr className="border-b border-white/5">
                                <td className="p-3"><InlineCode>componentWillUnmount</InlineCode></td>
                                <td className="p-3"><InlineCode>useEffect(() =&gt; cleanup, [])</InlineCode></td>
                                <td className="p-3">Return cleanup function</td>
                            </tr>
                            <tr className="border-b border-white/5">
                                <td className="p-3"><InlineCode>shouldComponentUpdate</InlineCode></td>
                                <td className="p-3"><InlineCode>React.memo</InlineCode></td>
                                <td className="p-3">Memo wrapper (không phải hook)</td>
                            </tr>
                            <tr className="border-b border-white/5">
                                <td className="p-3"><InlineCode>getDerivedStateFromProps</InlineCode></td>
                                <td className="p-3">Tính toán trong render</td>
                                <td className="p-3">Không cần hook riêng</td>
                            </tr>
                            <tr className="border-b border-white/5">
                                <td className="p-3"><InlineCode>getSnapshotBeforeUpdate</InlineCode></td>
                                <td className="p-3"><InlineCode>useLayoutEffect</InlineCode></td>
                                <td className="p-3">Chạy trước paint</td>
                            </tr>
                            <tr>
                                <td className="p-3"><InlineCode>this.setState</InlineCode></td>
                                <td className="p-3"><InlineCode>setState từ useState</InlineCode></td>
                                <td className="p-3">Cập nhật state</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <Heading3>Ví dụ so sánh trực tiếp</Heading3>

                <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-xl bg-yellow-500/10 border border-yellow-500/20 p-4">
                        <div className="text-yellow-400 font-bold text-sm mb-3">🏛️ Class Component</div>
                        <CodeBlock title="ClassTimer.tsx">{`class Timer extends React.Component {
    state = { count: 0 }
    intervalId = null

    componentDidMount() {
        this.intervalId = setInterval(() => {
            this.setState(prev => ({
                count: prev.count + 1
            }))
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.intervalId)
    }

    render() {
        return <p>{this.state.count}s</p>
    }
}`}</CodeBlock>
                    </div>
                    <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-4">
                        <div className="text-blue-400 font-bold text-sm mb-3">🪝 Function + Hooks</div>
                        <CodeBlock title="HookTimer.tsx">{`function Timer() {
    const [count, setCount] = useState(0)

    useEffect(() => {
        const id = setInterval(() => {
            setCount(c => c + 1)
        }, 1000)

        return () => clearInterval(id)
        // cleanup = componentWillUnmount
    }, [])
    // [] = componentDidMount

    return <p>{count}s</p>
}`}</CodeBlock>
                    </div>
                </div>

                <Callout type="info">
                    Hooks component ngắn hơn ~40%, logic liên quan gom lại một chỗ (setup + cleanup cùng useEffect),
                    thay vì rải rác qua nhiều lifecycle methods.
                </Callout>

                {/* ===== Quy tắc ===== */}
                <Heading2>11. Quy tắc sử dụng Hooks</Heading2>

                <div className="my-6 space-y-3">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <span className="text-red-400 mt-0.5">❌</span>
                        <span className="text-slate-300">Không gọi Hooks trong điều kiện (<InlineCode>if</InlineCode>), vòng lặp (<InlineCode>for</InlineCode>), hoặc nested functions</span>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <span className="text-red-400 mt-0.5">❌</span>
                        <span className="text-slate-300">Không gọi Hooks trong Class Component hoặc regular JavaScript functions</span>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <span className="text-green-400 mt-0.5">✅</span>
                        <span className="text-slate-300">Chỉ gọi Hooks ở top level của Function Component hoặc custom Hook</span>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <span className="text-green-400 mt-0.5">✅</span>
                        <span className="text-slate-300">Custom Hook phải bắt đầu bằng <InlineCode>use</InlineCode> (ví dụ: <InlineCode>useAuth</InlineCode>, <InlineCode>useFetch</InlineCode>)</span>
                    </div>
                </div>

                {/* ===== React.memo ===== */}
                <Heading2>12. React.memo — Tối ưu Re-render</Heading2>

                <Paragraph>
                    <InlineCode>React.memo</InlineCode> là Higher-Order Component (HOC) bọc quanh component để{' '}
                    <Highlight>tránh re-render không cần thiết</Highlight>. Nó so sánh shallow props — nếu props không đổi, component không re-render.
                </Paragraph>

                <CodeBlock title="react-memo.tsx">{`import { memo, useState, useCallback } from 'react'

// ❌ KHÔNG có memo — re-render MỖI LẦN parent render
function ExpensiveList({ items, onDelete }) {
    console.log('ExpensiveList rendered!')  // Chạy mỗi lần
    return (
        <ul>
            {items.map(item => (
                <li key={item.id}>
                    {item.name}
                    <button onClick={() => onDelete(item.id)}>Xoá</button>
                </li>
            ))}
        </ul>
    )
}

// ✅ CÓ memo — chỉ re-render khi items hoặc onDelete thay đổi
const MemoizedList = memo(function ExpensiveList({ items, onDelete }) {
    console.log('ExpensiveList rendered!')  // Chỉ chạy khi props đổi
    return (
        <ul>
            {items.map(item => (
                <li key={item.id}>
                    {item.name}
                    <button onClick={() => onDelete(item.id)}>Xoá</button>
                </li>
            ))}
        </ul>
    )
})

// ✅ Custom comparison function
const MemoizedUser = memo(
    function UserCard({ user }) {
        return <div>{user.name} - {user.email}</div>
    },
    (prevProps, nextProps) => {
        // Return true = KHÔNG re-render (props "bằng nhau")
        return prevProps.user.id === nextProps.user.id
            && prevProps.user.name === nextProps.user.name
    }
)

// ⚠️ memo CHỈ hiệu quả khi kết hợp useCallback/useMemo
function Parent() {
    const [count, setCount] = useState(0)
    const [items] = useState([{ id: 1, name: 'A' }, { id: 2, name: 'B' }])

    // ❌ Mỗi lần Parent render → tạo hàm mới → MemoizedList re-render!
    // const handleDelete = (id) => console.log('delete', id)

    // ✅ useCallback giữ reference ổn định
    const handleDelete = useCallback((id) => {
        console.log('delete', id)
    }, [])

    return (
        <div>
            <p>{count}</p>
            <button onClick={() => setCount(c => c + 1)}>+1</button>
            <MemoizedList items={items} onDelete={handleDelete} />
        </div>
    )
}`}</CodeBlock>

                <Callout type="tip">
                    <strong>Khi nào dùng React.memo:</strong><br />
                    ✅ Component render tốn (danh sách lớn, charts)<br />
                    ✅ Component nhận props ít thay đổi<br />
                    ✅ Component re-render thường xuyên do parent<br />
                    ❌ Không dùng cho component đơn giản (overhead memoization &gt; re-render cost)
                </Callout>

                {/* ===== Suspense ===== */}
                <Heading2>13. Suspense — Xử lý Loading State</Heading2>

                <Paragraph>
                    <InlineCode>Suspense</InlineCode> cho phép component con &quot;chờ&quot; một thứ gì đó (data, code) và{' '}
                    <Highlight>hiện fallback UI</Highlight> trong khi chờ. Ra mắt React 16.6 cho lazy loading, mở rộng trong React 18 cho data fetching.
                </Paragraph>

                <CodeBlock title="suspense.tsx">{`import { Suspense, lazy, useState, useTransition } from 'react'

// 1️⃣ Code Splitting — lazy load component
const HeavyChart = lazy(() => import('./HeavyChart'))
const AdminPanel = lazy(() => import('./AdminPanel'))

function App() {
    const [tab, setTab] = useState('home')

    return (
        <div>
            <nav>
                <button onClick={() => setTab('home')}>Home</button>
                <button onClick={() => setTab('chart')}>Chart</button>
                <button onClick={() => setTab('admin')}>Admin</button>
            </nav>

            {/* Suspense bọc component lazy — hiện fallback khi loading */}
            <Suspense fallback={<div>⏳ Đang tải...</div>}>
                {tab === 'chart' && <HeavyChart />}
                {tab === 'admin' && <AdminPanel />}
            </Suspense>
        </div>
    )
}

// 2️⃣ Data Fetching (React 18+ với framework hỗ trợ)
// Next.js App Router dùng Suspense mặc định
async function UserProfile({ userId }) {
    const user = await fetchUser(userId) // Server Component
    return <div>{user.name}</div>
}

// Trong page.tsx:
export default function Page() {
    return (
        <Suspense fallback={<ProfileSkeleton />}>
            <UserProfile userId="123" />
        </Suspense>
    )
}

// 3️⃣ Nested Suspense — loading granular
function Dashboard() {
    return (
        <div>
            <Suspense fallback={<HeaderSkeleton />}>
                <Header />          {/* Load nhanh → hiện sớm */}
            </Suspense>
            <Suspense fallback={<ChartSkeleton />}>
                <AnalyticsChart />  {/* Load chậm → hiện skeleton riêng */}
            </Suspense>
            <Suspense fallback={<TableSkeleton />}>
                <DataTable />       {/* Load chậm → skeleton riêng */}
            </Suspense>
        </div>
    )
}`}</CodeBlock>

                <div className="my-6 overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead><tr className="border-b border-white/10">
                            <th className="text-left p-3 text-slate-400 font-medium">Tính năng</th>
                            <th className="text-left p-3 text-slate-400 font-medium">React Version</th>
                            <th className="text-left p-3 text-slate-400 font-medium">Mô tả</th>
                        </tr></thead>
                        <tbody className="text-slate-300">
                            <tr className="border-b border-white/5"><td className="p-3">Code Splitting</td><td className="p-3">16.6+</td><td className="p-3"><InlineCode>lazy()</InlineCode> + Suspense</td></tr>
                            <tr className="border-b border-white/5"><td className="p-3">Data Fetching</td><td className="p-3">18+</td><td className="p-3">Với framework (Next.js, Relay)</td></tr>
                            <tr><td className="p-3">Streaming SSR</td><td className="p-3">18+</td><td className="p-3">Server render từng phần</td></tr>
                        </tbody>
                    </table>
                </div>

                {/* ===== Fiber ===== */}
                <Heading2>14. React Fiber — Engine Bên Trong</Heading2>

                <Paragraph>
                    <Highlight>React Fiber</Highlight> là reconciliation engine mới từ React 16 (2017). Nó thay thế stack-based reconciler cũ
                    bằng kiến trúc <Highlight>incremental rendering</Highlight> — cho phép React chia nhỏ render work và ưu tiên tasks.
                </Paragraph>

                <div className="my-6 space-y-2">
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">🧬 Fiber Node là gì?</div>
                        <div className="text-slate-300 text-sm mt-1">
                            Mỗi React element tạo ra một <strong>Fiber node</strong> — một JavaScript object chứa:<br />
                            • <InlineCode>type</InlineCode> — component type (div, MyComponent)<br />
                            • <InlineCode>props</InlineCode> — current props<br />
                            • <InlineCode>stateNode</InlineCode> — DOM node hoặc class instance<br />
                            • <InlineCode>child</InlineCode>, <InlineCode>sibling</InlineCode>, <InlineCode>return</InlineCode> — linked list structure<br />
                            • <InlineCode>memoizedState</InlineCode> — linked list of hooks (useState, useEffect...)
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">⚡ Tại sao Fiber quan trọng?</div>
                        <div className="text-slate-300 text-sm mt-1">
                            <strong>Trước Fiber (Stack Reconciler):</strong><br />
                            • Render đồng bộ — block main thread cho đến khi hoàn tất<br />
                            • UI freezes khi render cây lớn<br /><br />
                            <strong>Sau Fiber:</strong><br />
                            • Render có thể <strong>pause, resume, abort</strong><br />
                            • Ưu tiên user interaction (click, type) trên background work<br />
                            • Cho phép <InlineCode>Suspense</InlineCode>, <InlineCode>useTransition</InlineCode>, <InlineCode>Concurrent Mode</InlineCode>
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">🔄 2 Phases của Fiber</div>
                        <div className="text-slate-300 text-sm mt-1">
                            <strong>1. Render Phase</strong> (có thể async, pause/resume):<br />
                            • Tạo Fiber tree mới từ JSX<br />
                            • So sánh (diff) với Fiber tree cũ<br />
                            • Đánh dấu thay đổi (effects)<br /><br />
                            <strong>2. Commit Phase</strong> (đồng bộ, không thể ngắt):<br />
                            • Apply tất cả DOM changes<br />
                            • Chạy useLayoutEffect<br />
                            • Schedule useEffect
                        </div>
                    </div>
                </div>

                <CodeBlock title="fiber-concept.tsx">{`// Mỗi component = 1 Fiber node trong tree
// React traverse bằng linked list, không phải recursion

// Fiber tree structure:
// App (fiber) 
//   ├── child: Header (fiber)
//   │     └── child: Logo (fiber)
//   │           └── sibling: Nav (fiber)
//   └── sibling: Main (fiber)
//         └── child: ProductList (fiber)

// Hooks được lưu trong fiber.memoizedState dưới dạng linked list:
// fiber.memoizedState → { useState: count } → { useEffect: fetchData } → { useRef: inputRef } → null

// Đây là lý do hooks phải gọi theo THỨ TỰ cố định —
// React dựa vào vị trí trong linked list để match hook với state!

// ❌ Nếu bạn bọc hook trong if:
if (condition) {
    const [a, setA] = useState(0)  // Lần 1: hook #1
}                                   // Lần 2: BỎ QUA → mọi hook bị lệch!
const [b, setB] = useState(0)      // Lần 1: hook #2, Lần 2: hook #1 😱`}</CodeBlock>

                <Callout type="info">
                    Bạn không trực tiếp tương tác với Fiber, nhưng hiểu cách nó hoạt động giúp giải thích:
                    tại sao hooks phải gọi theo thứ tự, tại sao <InlineCode>useTransition</InlineCode> hoạt động,
                    và tại sao React có thể render mượt mà với Concurrent Mode.
                </Callout>

                {/* ===== Portal ===== */}
                <Heading2>15. Portal — Render Ngoài DOM Parent</Heading2>

                <Paragraph>
                    <InlineCode>createPortal</InlineCode> cho phép render children vào một DOM node <Highlight>bên ngoài parent hierarchy</Highlight>,
                    nhưng vẫn giữ React event bubbling và context. Dùng cho modal, tooltip, dropdown.
                </Paragraph>

                <CodeBlock title="portal.tsx">{`import { createPortal } from 'react-dom'
import { useState, useEffect, useRef } from 'react'

// 1️⃣ Modal Portal — render vào document.body
function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null

    return createPortal(
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} aria-label="Đóng">✕</button>
                {children}
            </div>
        </div>,
        document.body  // ← Render vào body thay vì parent component
    )
}

// Usage:
function App() {
    const [showModal, setShowModal] = useState(false)
    return (
        <div style={{ overflow: 'hidden' }}>
            {/* Modal KHÔNG bị ảnh hưởng bởi overflow: hidden */}
            <button onClick={() => setShowModal(true)}>Mở Modal</button>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <h2>Xin chào từ Portal!</h2>
                <p>Modal này render ở document.body</p>
            </Modal>
        </div>
    )
}

// 2️⃣ Tooltip Portal — thoát container overflow
function Tooltip({ text, children }) {
    const [show, setShow] = useState(false)
    const [pos, setPos] = useState({ top: 0, left: 0 })
    const ref = useRef<HTMLDivElement>(null)

    const handleMouseEnter = () => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect()
            setPos({ top: rect.bottom + 8, left: rect.left })
        }
        setShow(true)
    }

    return (
        <>
            <div ref={ref} onMouseEnter={handleMouseEnter}
                 onMouseLeave={() => setShow(false)}>
                {children}
            </div>
            {show && createPortal(
                <div style={{ position: 'fixed', top: pos.top, left: pos.left }}
                     className="tooltip">
                    {text}
                </div>,
                document.body
            )}
        </>
    )
}`}</CodeBlock>

                <div className="my-6 space-y-2">
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">✅ Khi nào dùng Portal</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <strong>Modals/Dialogs</strong> — thoát khỏi <InlineCode>overflow: hidden</InlineCode> và <InlineCode>z-index</InlineCode> stacking<br />
                            • <strong>Tooltips/Popovers</strong> — vị trí chính xác không bị container clip<br />
                            • <strong>Toast notifications</strong> — render ở góc màn hình<br />
                            • <strong>Dropdown menus</strong> — thoát khỏi scroll container
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="text-yellow-400 font-bold text-sm">⚠️ Lưu ý quan trọng</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Events vẫn bubble theo <strong>React tree</strong> (không phải DOM tree)<br />
                            • Context vẫn hoạt động bình thường qua Portal<br />
                            • Portal node phải tồn tại trong DOM trước khi render<br />
                            • Nhớ cleanup khi unmount (tránh memory leak)
                        </div>
                    </div>
                </div>

                {/* ===== Tóm tắt ===== */}
                <Heading2>📌 Tóm tắt</Heading2>

                <div className="my-6 space-y-3">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5">
                        <span className="text-blue-400 mt-0.5">🔵</span>
                        <span className="text-slate-300"><Highlight>useState</Highlight> — state đơn giản, re-render khi thay đổi</span>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5">
                        <span className="text-blue-400 mt-0.5">⚡</span>
                        <span className="text-slate-300"><Highlight>useEffect</Highlight> — side effects (API, timers, subscriptions)</span>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5">
                        <span className="text-blue-400 mt-0.5">📌</span>
                        <span className="text-slate-300"><Highlight>useRef</Highlight> — DOM ref hoặc giá trị không gây re-render</span>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5">
                        <span className="text-blue-400 mt-0.5">🧠</span>
                        <span className="text-slate-300"><Highlight>useMemo / useCallback</Highlight> — performance optimization</span>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5">
                        <span className="text-blue-400 mt-0.5">🌐</span>
                        <span className="text-slate-300"><Highlight>useContext</Highlight> — global state, tránh prop drilling</span>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5">
                        <span className="text-blue-400 mt-0.5">🔄</span>
                        <span className="text-slate-300"><Highlight>useReducer</Highlight> — state phức tạp, Redux-like pattern</span>
                    </div>
                </div>

                {/* ===== REAL-WORLD EXAMPLES ===== */}
                <Heading2>🏭 Ví dụ thực tế từ dự án này</Heading2>

                <Paragraph>
                    Dưới đây là cách các hooks được sử dụng <Highlight>thực tế</Highlight> trong source code của dự án này.
                </Paragraph>

                <CodeBlock title="ProductTable.tsx — useMemo + useCallback">{`// 📁 src/components/shop/products/ProductTable.tsx

// useMemo — tạo categoryMap, chỉ tính lại khi categories thay đổi
const categoryMap = useMemo(() => {
    const map = new Map<string, string>()
    categories?.forEach((category: Category) => {
        if (category._id) {
            map.set(String(category._id), category.name)
        }
    })
    return map
}, [categories])  // 🔑 dependency: chỉ re-compute khi categories đổi

// useCallback — 6 stable callbacks, không tạo lại mỗi render
const handleEditProduct = useCallback((product: Product) => {
    setEditingProduct(product)
    setIsOpen(true)
}, [])  // 🔑 [] = không bao giờ tạo lại

const handleDeleteProduct = useCallback(async (record: Product) => {
    const { message, success }: any = await remove('api/product', record, 'products')
    push(message, success)
}, [push])  // 🔑 [push] = tạo lại khi push thay đổi

// useMemo — memoize columns array
const columns: ColumnsType<Product> = useMemo(
    () => [/* ... column definitions ... */],
    [categoryMap, handleEditProduct, handleOpenBarcode, handleCopySku, handleDeleteProduct]
)  // 🔑 chỉ tạo lại khi các callback hoặc map thay đổi`}</CodeBlock>

                <CodeBlock title="useDebounce.ts — Custom Hook thực tế">{`// 📁 src/hooks/useDebounce.ts
// Custom hook dùng trong 3 components: ProductTable, ShopeeLinksTable, CartPage

const useDebounce = (value: string, delay: number): string => {
    const [debouncedValue, setDebouncedValue] = useState<string>(value)
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)
        return () => clearTimeout(handler)  // cleanup khi value đổi
    }, [value, delay])
    return debouncedValue
}

// Sử dụng:
// ProductTable:    useDebounce(searchValue, 100)   // search nhanh
// ShopeeLinksTable: useDebounce(searchTerm, 300)    // search links
// CartPage:        useDebounce(scanValue, 2000)     // quét barcode mobile`}</CodeBlock>

                <Callout type="tip">
                    Bắt đầu với <InlineCode>useState</InlineCode> + <InlineCode>useEffect</InlineCode> — đây là 2 hooks
                    cần thiết cho 90% trường hợp. Chỉ thêm các hooks khác khi thực sự cần optimize hoặc logic phức tạp.
                </Callout>
            </>
        ),
        en: (
            <>
                <Paragraph>
                    <Highlight>React Hooks</Highlight> were introduced in React 16.8 (2019), allowing you to use state and other React features in <Highlight>Function Components</Highlight> — no more class components needed.
                </Paragraph>

                <Callout type="info">
                    This article covers every Hook in detail with usage examples, best practices,
                    and comparisons to Class Component lifecycle methods.
                </Callout>

                {/* ===== useState ===== */}
                <Heading2>1. useState — State Management</Heading2>

                <Paragraph>
                    <InlineCode>useState</InlineCode> is the most basic Hook — lets a component &quot;remember&quot; data between renders.
                </Paragraph>

                <CodeBlock title="useState.tsx">{`import { useState } from 'react'

function Counter() {
    const [count, setCount] = useState(0) // [value, setter]

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>+1</button>
            <button onClick={() => setCount(prev => prev - 1)}>-1</button>
        </div>
    )
}`}</CodeBlock>

                <Heading3>Object & Array State</Heading3>

                <Paragraph>
                    React compares state by <Highlight>reference</Highlight> (===), not deep equality.
                    You must create a <Highlight>new object/array</Highlight> to trigger re-render:
                </Paragraph>

                <CodeBlock title="object-array-state.tsx">{`// ✅ Object — spread operator
const [user, setUser] = useState({ name: 'Khương', age: 25 })
setUser({ ...user, age: 26 })          // Create new object, keep other fields
setUser(prev => ({ ...prev, age: prev.age + 1 }))  // Callback form

// ❌ WRONG — direct mutation, React doesn't know state changed!
user.age = 26
setUser(user)  // Same reference → no re-render!

// ✅ Array — create new array
const [items, setItems] = useState<string[]>([])
setItems([...items, 'new item'])        // Add item
setItems(items.filter(i => i !== 'x'))  // Remove item
setItems(items.map(i =>                 // Update item
    i.id === targetId ? { ...i, done: true } : i
))

// 🏭 Real example from CartTable.tsx:
// Increase product quantity in shopping cart
setCartList(
    cartList.map(item =>
        String(item.product?._id) === String(_id)
            ? { ...item, quantity: item.quantity + 1 }  // Update matched item
            : item                                      // Keep other items
    )
)`}</CodeBlock>

                <Heading3>Batching & Stale Closure</Heading3>

                <CodeBlock title="batching.tsx">{`// React 18+ automatically batches multiple setState into 1 re-render
function handleClick() {
    setCount(count + 1)   // count = 0
    setCount(count + 1)   // count still = 0 (stale closure!)
    setCount(count + 1)   // count still = 0 → result: 1 (not 3!)
}

// ✅ Fix: use callback form
function handleClick() {
    setCount(prev => prev + 1)  // prev = 0 → 1
    setCount(prev => prev + 1)  // prev = 1 → 2
    setCount(prev => prev + 1)  // prev = 2 → 3 ✅
}`}</CodeBlock>

                <Heading3>Lazy Initialization</Heading3>

                <Paragraph>
                    When the initial value is expensive to compute, pass a <Highlight>function</Highlight> instead of a value:
                </Paragraph>

                <CodeBlock title="lazy-init.tsx">{`// ❌ Runs every render (wasteful)
const [data, setData] = useState(expensiveComputation())

// ✅ Runs only once on mount
const [data, setData] = useState(() => expensiveComputation())`}</CodeBlock>

                <Callout type="tip">
                    <strong>3 golden rules of useState:</strong><br />
                    1. Update based on previous state → always use callback: <InlineCode>setState(prev =&gt; ...)</InlineCode><br />
                    2. Object/Array → always create new copy (spread, map, filter)<br />
                    3. Expensive initial value → pass function: <InlineCode>useState(() =&gt; compute())</InlineCode>
                </Callout>

                {/* ===== useEffect ===== */}
                <Heading2>2. useEffect — Side Effects</Heading2>

                <Paragraph>
                    <InlineCode>useEffect</InlineCode> handles &quot;side effects&quot;: API calls, subscriptions,
                    DOM mutations, timers... It runs <Highlight>after render</Highlight>.
                </Paragraph>

                <CodeBlock title="useEffect.tsx">{`import { useEffect, useState } from 'react'

function UserProfile({ userId }) {
    const [user, setUser] = useState(null)

    // Runs when userId changes
    useEffect(() => {
        let cancelled = false

        async function fetchUser() {
            const res = await fetch(\`/api/users/\${userId}\`)
            const data = await res.json()
            if (!cancelled) setUser(data)
        }
        fetchUser()

        // Cleanup — runs on unmount or before next effect
        return () => { cancelled = true }
    }, [userId]) // ← dependency array

    return <div>{user?.name}</div>
}`}</CodeBlock>

                <Heading3>3 Dependency Array Patterns</Heading3>

                <div className="my-6 overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="text-left p-3 text-slate-400 font-medium">Syntax</th>
                                <th className="text-left p-3 text-slate-400 font-medium">When it runs</th>
                                <th className="text-left p-3 text-slate-400 font-medium">Class equivalent</th>
                            </tr>
                        </thead>
                        <tbody className="text-slate-300">
                            <tr className="border-b border-white/5">
                                <td className="p-3"><InlineCode>useEffect(fn)</InlineCode></td>
                                <td className="p-3">Every render</td>
                                <td className="p-3">componentDidUpdate (every time)</td>
                            </tr>
                            <tr className="border-b border-white/5">
                                <td className="p-3"><InlineCode>useEffect(fn, [])</InlineCode></td>
                                <td className="p-3">Once on mount only</td>
                                <td className="p-3"><InlineCode>componentDidMount</InlineCode></td>
                            </tr>
                            <tr>
                                <td className="p-3"><InlineCode>useEffect(fn, [a, b])</InlineCode></td>
                                <td className="p-3">When a or b changes</td>
                                <td className="p-3">componentDidUpdate + condition</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <Heading3>❌ Don't Pass async Directly</Heading3>

                <CodeBlock title="async-effect.tsx">{`// ❌ WRONG — useEffect callback must return void or cleanup function
// async function always returns Promise → React can't handle it!
useEffect(async () => {
    const data = await fetchData()
    setData(data)
}, [])  // TypeScript error: Promise<void> ≠ void | Destructor

// ✅ RIGHT — create async function inside
useEffect(() => {
    const loadData = async () => {
        const data = await fetchData()
        setData(data)
    }
    loadData()

    return () => { /* cleanup still works */ }
}, [])`}</CodeBlock>

                <Heading3>🧹 Cleanup Patterns</Heading3>

                <Paragraph>
                    Cleanup runs on <Highlight>unmount</Highlight> or <Highlight>before the next effect</Highlight>.
                    Without cleanup → memory leaks, race conditions!
                </Paragraph>

                <CodeBlock title="cleanup-patterns.tsx">{`// 1️⃣ Timer — clearInterval on unmount
useEffect(() => {
    const id = setInterval(() => setTime(t => t + 1), 1000)
    return () => clearInterval(id)  // 🧹 Stop timer
}, [])

// 2️⃣ Event Listener — remove on unmount
useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
}, [])

// 3️⃣ Fetch — cancel old request to prevent race condition
// User types "a" → "ab" → "abc" quickly
// Response for "a" might arrive AFTER "abc" → wrong data displayed!
useEffect(() => {
    let cancelled = false
    fetch(\`/api/search?q=\${query}\`)
        .then(res => res.json())
        .then(data => {
            if (!cancelled) setResults(data)  // Only set if not cancelled
        })
    return () => { cancelled = true }  // 🧹 Ignore old response
}, [query])

// 🏭 Real example — useDebounce.ts in this project:
useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(handler)  // 🧹 Cancel old timeout when value changes
}, [value, delay])`}</CodeBlock>

                <Heading3>⚠️ Dependency Array Pitfalls</Heading3>

                <CodeBlock title="deps-pitfalls.tsx">{`// ❌ Object/Array in deps — new reference each render → infinite loop!
useEffect(() => {
    fetchData(filters)
}, [{ status: 'active', page: 1 }])  // New object every render!

// ✅ Fix: use primitive values or useMemo
useEffect(() => {
    fetchData(filters)
}, [filters.status, filters.page])  // Primitives → stable comparison

// ❌ Missing dependency → stale closure
const [count, setCount] = useState(0)
useEffect(() => {
    const id = setInterval(() => {
        console.log(count)  // Always = 0 (stale!)
    }, 1000)
    return () => clearInterval(id)
}, [])  // Missing count in deps!

// ✅ Fix: use callback form or add dependency
useEffect(() => {
    const id = setInterval(() => {
        setCount(prev => prev + 1)  // Callback form — no count needed in deps
    }, 1000)
    return () => clearInterval(id)
}, [])`}</CodeBlock>

                <Callout type="tip">
                    <strong>4 golden rules of useEffect:</strong><br />
                    1. Never pass <InlineCode>async</InlineCode> directly as callback<br />
                    2. Always cleanup: timers, listeners, subscriptions, fetch<br />
                    3. Object/function in deps → use <InlineCode>useMemo</InlineCode>/<InlineCode>useCallback</InlineCode> or extract primitives<br />
                    4. ESLint rule <InlineCode>exhaustive-deps</InlineCode> → enable and follow it!
                </Callout>

                {/* ===== useRef ===== */}
                <Heading2>3. useRef — References Without Re-render</Heading2>

                <Paragraph>
                    <InlineCode>useRef</InlineCode> creates a mutable &quot;box&quot; that{' '}
                    <Highlight>doesn&apos;t cause re-renders</Highlight> when changed. Use for DOM element access or persisting values across renders.
                </Paragraph>

                <CodeBlock title="useRef.tsx">{`import { useRef, useEffect } from 'react'

function TextInput() {
    const inputRef = useRef<HTMLInputElement>(null)
    const renderCount = useRef(0)

    // Access DOM element
    useEffect(() => {
        inputRef.current?.focus() // Auto-focus on mount
    }, [])

    // Count renders (doesn't cause re-render)
    renderCount.current++

    return (
        <div>
            <input ref={inputRef} placeholder="Auto-focused!" />
            <p>Rendered {renderCount.current} times</p>
        </div>
    )
}`}</CodeBlock>

                <Heading3>useRef vs useState</Heading3>

                <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-4">
                        <div className="text-blue-400 font-bold text-sm mb-2">useState</div>
                        <ul className="text-slate-300 text-sm space-y-1.5">
                            <li>✅ Change → re-render</li>
                            <li>✅ Displayed in UI</li>
                            <li>❌ Don&apos;t use for &quot;hidden&quot; values</li>
                        </ul>
                    </div>
                    <div className="rounded-xl bg-purple-500/10 border border-purple-500/20 p-4">
                        <div className="text-purple-400 font-bold text-sm mb-2">useRef</div>
                        <ul className="text-slate-300 text-sm space-y-1.5">
                            <li>✅ Change → NO re-render</li>
                            <li>✅ Access DOM elements</li>
                            <li>✅ Persist timer IDs, previous values</li>
                        </ul>
                    </div>
                </div>

                {/* ===== useMemo ===== */}
                <Heading2>4. useMemo — Memoize Computed Values</Heading2>

                <Paragraph>
                    <InlineCode>useMemo</InlineCode> caches computation results and only recalculates when dependencies change.
                    Use for <Highlight>expensive computations</Highlight>.
                </Paragraph>

                <CodeBlock title="useMemo.tsx">{`import { useMemo, useState } from 'react'

function ProductList({ products, searchTerm }) {
    // ❌ Recalculates every render (even when products hasn't changed)
    // const filtered = products.filter(p => p.name.includes(searchTerm))

    // ✅ Only recalculates when products or searchTerm changes
    const filtered = useMemo(() => {
        console.log('Filtering...')
        return products.filter(p =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
    }, [products, searchTerm])

    return (
        <ul>
            {filtered.map(p => <li key={p.id}>{p.name}</li>)}
        </ul>
    )
}`}</CodeBlock>

                <Callout type="warning">
                    Don&apos;t overuse <InlineCode>useMemo</InlineCode>! Only use it when computation is truly expensive.
                    If filtering a small array (&lt;100 items), no memo needed.
                </Callout>

                <Heading3>useMemo vs useEffect — Why NOT useEffect?</Heading3>

                <Paragraph>
                    Common mistake: using <InlineCode>useEffect</InlineCode> + <InlineCode>useState</InlineCode> to compute derived data.
                    This is an <Highlight>anti-pattern</Highlight> because it causes <strong>2 renders instead of 1</strong>.
                </Paragraph>

                <CodeBlock title="usememo-vs-useeffect.tsx">{`// ❌ ANTI-PATTERN: useEffect + useState for derived data
function ProductList({ products, searchTerm }) {
    const [filtered, setFiltered] = useState([])

    useEffect(() => {
        // Render 1: filtered = [] (stale/wrong data)
        // Effect runs AFTER render → sets state → triggers render 2
        setFiltered(
            products.filter(p => p.name.includes(searchTerm))
        )
    }, [products, searchTerm])
    // Render 2: filtered = correct data
    // → User sees FLASH: old data → new data 😵

    return <ul>{filtered.map(p => <li key={p.id}>{p.name}</li>)}</ul>
}

// ✅ CORRECT: useMemo — computes DURING render, only 1 render
function ProductList({ products, searchTerm }) {
    const filtered = useMemo(() => {
        return products.filter(p => p.name.includes(searchTerm))
    }, [products, searchTerm])
    // → filtered is always correct on the first render

    return <ul>{filtered.map(p => <li key={p.id}>{p.name}</li>)}</ul>
}`}</CodeBlock>

                <div className="my-6 overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="text-left p-3 text-slate-400 font-medium">Criteria</th>
                                <th className="text-left p-3 text-red-400 font-medium">❌ useEffect + useState</th>
                                <th className="text-left p-3 text-green-400 font-medium">✅ useMemo</th>
                            </tr>
                        </thead>
                        <tbody className="text-slate-300">
                            <tr className="border-b border-white/5">
                                <td className="p-3 text-slate-400">When computed?</td>
                                <td className="p-3">AFTER render (async)</td>
                                <td className="p-3">DURING render (sync)</td>
                            </tr>
                            <tr className="border-b border-white/5">
                                <td className="p-3 text-slate-400">Render count</td>
                                <td className="p-3">2 renders (stale → correct)</td>
                                <td className="p-3">1 render (correct immediately)</td>
                            </tr>
                            <tr className="border-b border-white/5">
                                <td className="p-3 text-slate-400">UI flash?</td>
                                <td className="p-3">Yes (old → new data)</td>
                                <td className="p-3">No</td>
                            </tr>
                            <tr className="border-b border-white/5">
                                <td className="p-3 text-slate-400">Extra state?</td>
                                <td className="p-3">Needs separate useState</td>
                                <td className="p-3">Not needed</td>
                            </tr>
                            <tr>
                                <td className="p-3 text-slate-400">Use when</td>
                                <td className="p-3">Side effects (API, timer)</td>
                                <td className="p-3">Derived/computed data</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <Heading3>🔧 How useMemo Works Internally</Heading3>

                <Paragraph>
                    <InlineCode>useMemo</InlineCode> works through the <Highlight>Fiber node&apos;s memoizedState</Highlight> — it stores both the value and deps in the hooks linked list.
                </Paragraph>

                <CodeBlock title="usememo-internals.tsx">{`// Pseudocode: what React does when it encounters useMemo

// === FIRST MOUNT ===
function mountMemo(factory, deps) {
    const hook = createNewHook()    // Create hook node in linked list
    const value = factory()          // Run callback, get value
    hook.memoizedState = [value, deps]  // Store [value, deps]
    return value
}

// === SUBSEQUENT RENDERS ===
function updateMemo(factory, deps) {
    const hook = getExistingHook()   // Get hook from linked list (by position)
    const [prevValue, prevDeps] = hook.memoizedState

    // Compare each dependency using Object.is()
    if (areEqual(prevDeps, deps)) {
        return prevValue             // ✅ Deps unchanged → return cached
    }

    // ❌ Deps changed → recalculate
    const newValue = factory()       // Run callback again
    hook.memoizedState = [newValue, deps]  // Update cache
    return newValue
}

// === DEPENDENCY COMPARISON ===
function areEqual(prevDeps, nextDeps) {
    for (let i = 0; i < prevDeps.length; i++) {
        if (!Object.is(prevDeps[i], nextDeps[i])) {
            return false  // Any dep different → recalculate
        }
    }
    return true  // All deps same → use cache
}

// ⚠️ Object.is() compares REFERENCE, not deep equality!
Object.is(1, 1)           // true  (primitive)
Object.is('a', 'a')       // true  (primitive)
Object.is({}, {})         // false (different reference!)
Object.is([1,2], [1,2])   // false (different reference!)

// → This is why:
const obj = { a: 1 }
useMemo(() => compute(obj), [obj])  // ❌ Recalculates EVERY render!
// Because each render creates new obj → different reference → Object.is = false

// Fix:
useMemo(() => compute(obj), [obj.a])  // ✅ Use primitive
// or:
const stableObj = useMemo(() => ({ a: 1 }), [])  // ✅ Stable reference`}</CodeBlock>

                <div className="my-6 space-y-2">
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">📊 Timeline Comparison</div>
                        <div className="text-slate-300 text-sm mt-1">
                            <strong>useMemo:</strong> Render → useMemo checks deps → (cache or recalculate) → Result ready → Paint<br /><br />
                            <strong>useEffect:</strong> Render (stale data) → Paint (user sees stale) → Effect runs → setState → Re-render → Paint (correct data)
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">📌 Golden Rule</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • If value is <strong>derivable from current props/state</strong> → <InlineCode>useMemo</InlineCode><br />
                            • If you need a <strong>side effect</strong> (fetch API, update DOM, subscribe) → <InlineCode>useEffect</InlineCode><br />
                            • If value is simple (string concat, boolean check) → <strong>nothing needed</strong>, compute directly
                        </div>
                    </div>
                </div>

                {/* ===== useCallback ===== */}
                <Heading2>5. useCallback — Memoize Functions</Heading2>

                <Paragraph>
                    <InlineCode>useCallback</InlineCode> memoizes function references — prevents creating a new function each render.
                    Useful when passing callbacks to <Highlight>memoized child components</Highlight>.
                </Paragraph>

                <CodeBlock title="useCallback.tsx">{`import { useCallback, useState, memo } from 'react'

// Memoized child — only re-renders when props change
const ExpensiveChild = memo(({ onClick, label }) => {
    console.log('ExpensiveChild rendered:', label)
    return <button onClick={onClick}>{label}</button>
})

function Parent() {
    const [count, setCount] = useState(0)
    const [name, setName] = useState('')

    // ❌ New function every render → ExpensiveChild re-renders
    // const handleClick = () => setCount(c => c + 1)

    // ✅ Memoized function → ExpensiveChild does NOT re-render when name changes
    const handleClick = useCallback(() => {
        setCount(c => c + 1)
    }, []) // [] because no dependencies

    return (
        <div>
            <input value={name} onChange={e => setName(e.target.value)} />
            <p>Count: {count}</p>
            <ExpensiveChild onClick={handleClick} label="Increment" />
        </div>
    )
}`}</CodeBlock>

                <Heading3>useMemo vs useCallback</Heading3>

                <CodeBlock title="comparison.tsx">{`// useMemo — memoizes VALUE
const memoizedValue = useMemo(() => computeExpensive(a, b), [a, b])

// useCallback — memoizes FUNCTION
const memoizedFn = useCallback(() => doSomething(a, b), [a, b])

// Equivalent:
// useCallback(fn, deps) === useMemo(() => fn, deps)`}</CodeBlock>

                {/* ===== useContext ===== */}
                <Heading2>6. useContext — Global Data Sharing</Heading2>

                <Paragraph>
                    <InlineCode>useContext</InlineCode> lets child components access data from parent components{' '}
                    <Highlight>without prop drilling</Highlight>.
                </Paragraph>

                <CodeBlock title="useContext.tsx">{`import { createContext, useContext, useState } from 'react'

// 1. Create Context
const ThemeContext = createContext<{
    theme: 'light' | 'dark'
    toggle: () => void
}>({ theme: 'light', toggle: () => {} })

// 2. Provider (wrap at a high level)
function ThemeProvider({ children }) {
    const [theme, setTheme] = useState<'light' | 'dark'>('dark')
    const toggle = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

    return (
        <ThemeContext.Provider value={{ theme, toggle }}>
            {children}
        </ThemeContext.Provider>
    )
}

// 3. Consumer (use in any child component)
function Header() {
    const { theme, toggle } = useContext(ThemeContext)

    return (
        <header className={theme === 'dark' ? 'bg-black' : 'bg-white'}>
            <button onClick={toggle}>Toggle: {theme}</button>
        </header>
    )
}`}</CodeBlock>

                <Callout type="tip">
                    Combine <InlineCode>useContext</InlineCode> + <InlineCode>useReducer</InlineCode> to create simple global state
                    management — replaces Redux for small/medium apps.
                </Callout>

                {/* ===== useReducer ===== */}
                <Heading2>7. useReducer — Complex State</Heading2>

                <Paragraph>
                    <InlineCode>useReducer</InlineCode> replaces <InlineCode>useState</InlineCode> when state has{' '}
                    <Highlight>complex logic</Highlight>, multiple sub-values, or next state depends on previous state.
                </Paragraph>

                <CodeBlock title="useReducer.tsx">{`import { useReducer } from 'react'

// State type
type CartState = {
    items: { id: string; name: string; qty: number }[]
    total: number
}

// Action types
type CartAction =
    | { type: 'ADD_ITEM'; payload: { id: string; name: string; price: number } }
    | { type: 'REMOVE_ITEM'; payload: { id: string } }
    | { type: 'CLEAR' }

// Reducer function (pure, no side effects)
function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case 'ADD_ITEM':
            return {
                ...state,
                items: [...state.items, { ...action.payload, qty: 1 }],
                total: state.total + action.payload.price,
            }
        case 'REMOVE_ITEM':
            return {
                ...state,
                items: state.items.filter(i => i.id !== action.payload.id),
            }
        case 'CLEAR':
            return { items: [], total: 0 }
        default:
            return state
    }
}

function Cart() {
    const [cart, dispatch] = useReducer(cartReducer, { items: [], total: 0 })

    return (
        <div>
            <p>Total: \${cart.total} ({cart.items.length} items)</p>
            <button onClick={() => dispatch({
                type: 'ADD_ITEM',
                payload: { id: '1', name: 'Shirt', price: 29.99 }
            })}>
                Add shirt
            </button>
            <button onClick={() => dispatch({ type: 'CLEAR' })}>
                Clear cart
            </button>
        </div>
    )
}`}</CodeBlock>

                <Heading3>useState vs useReducer</Heading3>

                <div className="my-6 overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="text-left p-3 text-slate-400 font-medium">Criteria</th>
                                <th className="text-left p-3 text-blue-400 font-medium">useState</th>
                                <th className="text-left p-3 text-purple-400 font-medium">useReducer</th>
                            </tr>
                        </thead>
                        <tbody className="text-slate-300">
                            <tr className="border-b border-white/5">
                                <td className="p-3 text-slate-400">Simple state</td>
                                <td className="p-3">✅ Ideal</td>
                                <td className="p-3">Overkill</td>
                            </tr>
                            <tr className="border-b border-white/5">
                                <td className="p-3 text-slate-400">Complex state</td>
                                <td className="p-3">Hard to maintain</td>
                                <td className="p-3">✅ Ideal</td>
                            </tr>
                            <tr className="border-b border-white/5">
                                <td className="p-3 text-slate-400">Testing</td>
                                <td className="p-3">Must test component</td>
                                <td className="p-3">✅ Test reducer separately</td>
                            </tr>
                            <tr>
                                <td className="p-3 text-slate-400">Debugging</td>
                                <td className="p-3">Average</td>
                                <td className="p-3">✅ Clear action log</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* ===== useLayoutEffect ===== */}
                <Heading2>8. useLayoutEffect — Before Paint</Heading2>

                <Paragraph>
                    Like <InlineCode>useEffect</InlineCode> but runs <Highlight>synchronously after DOM update, before browser paint</Highlight>.
                    Use when measuring DOM or avoiding flickering.
                </Paragraph>

                <CodeBlock title="useLayoutEffect.tsx">{`import { useLayoutEffect, useRef, useState } from 'react'

function Tooltip({ children }) {
    const ref = useRef<HTMLDivElement>(null)
    const [height, setHeight] = useState(0)

    // Runs before paint → no flicker
    useLayoutEffect(() => {
        if (ref.current) {
            setHeight(ref.current.getBoundingClientRect().height)
        }
    }, [children])

    return (
        <div>
            <div ref={ref}>{children}</div>
            <p>Height: {height}px</p>
        </div>
    )
}`}</CodeBlock>

                <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-4">
                        <div className="text-blue-400 font-bold text-sm mb-2">useEffect</div>
                        <div className="text-slate-300 text-sm">Render → Paint → Effect (async)</div>
                        <div className="text-slate-400 text-xs mt-1">99% of cases use this</div>
                    </div>
                    <div className="rounded-xl bg-yellow-500/10 border border-yellow-500/20 p-4">
                        <div className="text-yellow-400 font-bold text-sm mb-2">useLayoutEffect</div>
                        <div className="text-slate-300 text-sm">Render → Effect (sync) → Paint</div>
                        <div className="text-slate-400 text-xs mt-1">Only for DOM measurement / avoiding flicker</div>
                    </div>
                </div>

                {/* ===== React 18/19 Hooks ===== */}
                <Heading2>9. Newer Hooks (React 18+)</Heading2>

                <Heading3>useId — Generate Unique IDs</Heading3>

                <CodeBlock title="useId.tsx">{`import { useId } from 'react'

function FormField({ label }) {
    const id = useId() // Generates unique, SSR-safe ID

    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <input id={id} />
        </div>
    )
}`}</CodeBlock>

                <Heading3>useTransition — Non-blocking UI</Heading3>

                <CodeBlock title="useTransition.tsx">{`import { useTransition, useState } from 'react'

function SearchPage() {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    const [isPending, startTransition] = useTransition()

    function handleSearch(e) {
        const value = e.target.value
        setQuery(value) // High priority: update input immediately

        // Low priority: search can be slow, that's ok
        startTransition(() => {
            setResults(filterProducts(value)) // Doesn't block UI
        })
    }

    return (
        <div>
            <input value={query} onChange={handleSearch} />
            {isPending && <p>Loading...</p>}
            <ProductList items={results} />
        </div>
    )
}`}</CodeBlock>

                <Heading3>useActionState — Form Handling (React 19)</Heading3>

                <CodeBlock title="useActionState.tsx">{`import { useActionState } from 'react'

async function submitForm(prevState, formData) {
    const name = formData.get('name')
    if (!name) return { error: 'Name is required' }

    await saveToDb(name)
    return { success: true, message: 'Saved!' }
}

function MyForm() {
    const [state, action, isPending] = useActionState(submitForm, null)

    return (
        <form action={action}>
            <input name="name" />
            <button disabled={isPending}>
                {isPending ? 'Saving...' : 'Save'}
            </button>
            {state?.error && <p className="text-red-500">{state.error}</p>}
            {state?.success && <p className="text-green-500">{state.message}</p>}
        </form>
    )
}`}</CodeBlock>

                {/* ===== Lifecycle Comparison ===== */}
                <Heading2>10. Hooks vs Class Lifecycle</Heading2>

                <Paragraph>
                    Comprehensive comparison between <Highlight>Lifecycle methods</Highlight> in Class Components
                    and their <Highlight>Hook equivalents</Highlight> in Function Components:
                </Paragraph>

                <div className="my-6 overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="text-left p-3 text-yellow-400 font-medium">Class Lifecycle</th>
                                <th className="text-left p-3 text-blue-400 font-medium">Hook Equivalent</th>
                                <th className="text-left p-3 text-slate-400 font-medium">Notes</th>
                            </tr>
                        </thead>
                        <tbody className="text-slate-300">
                            <tr className="border-b border-white/5">
                                <td className="p-3"><InlineCode>constructor</InlineCode></td>
                                <td className="p-3"><InlineCode>useState(initialValue)</InlineCode></td>
                                <td className="p-3">Initialize state</td>
                            </tr>
                            <tr className="border-b border-white/5">
                                <td className="p-3"><InlineCode>componentDidMount</InlineCode></td>
                                <td className="p-3"><InlineCode>useEffect(fn, [])</InlineCode></td>
                                <td className="p-3">Runs once after mount</td>
                            </tr>
                            <tr className="border-b border-white/5">
                                <td className="p-3"><InlineCode>componentDidUpdate</InlineCode></td>
                                <td className="p-3"><InlineCode>useEffect(fn, [deps])</InlineCode></td>
                                <td className="p-3">Runs when deps change</td>
                            </tr>
                            <tr className="border-b border-white/5">
                                <td className="p-3"><InlineCode>componentWillUnmount</InlineCode></td>
                                <td className="p-3"><InlineCode>useEffect(() =&gt; cleanup, [])</InlineCode></td>
                                <td className="p-3">Return cleanup function</td>
                            </tr>
                            <tr className="border-b border-white/5">
                                <td className="p-3"><InlineCode>shouldComponentUpdate</InlineCode></td>
                                <td className="p-3"><InlineCode>React.memo</InlineCode></td>
                                <td className="p-3">Memo wrapper (not a hook)</td>
                            </tr>
                            <tr className="border-b border-white/5">
                                <td className="p-3"><InlineCode>getDerivedStateFromProps</InlineCode></td>
                                <td className="p-3">Compute during render</td>
                                <td className="p-3">No separate hook needed</td>
                            </tr>
                            <tr className="border-b border-white/5">
                                <td className="p-3"><InlineCode>getSnapshotBeforeUpdate</InlineCode></td>
                                <td className="p-3"><InlineCode>useLayoutEffect</InlineCode></td>
                                <td className="p-3">Runs before paint</td>
                            </tr>
                            <tr>
                                <td className="p-3"><InlineCode>this.setState</InlineCode></td>
                                <td className="p-3"><InlineCode>setState from useState</InlineCode></td>
                                <td className="p-3">Update state</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <Heading3>Side-by-side comparison</Heading3>

                <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-xl bg-yellow-500/10 border border-yellow-500/20 p-4">
                        <div className="text-yellow-400 font-bold text-sm mb-3">🏛️ Class Component</div>
                        <CodeBlock title="ClassTimer.tsx">{`class Timer extends React.Component {
    state = { count: 0 }
    intervalId = null

    componentDidMount() {
        this.intervalId = setInterval(() => {
            this.setState(prev => ({
                count: prev.count + 1
            }))
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.intervalId)
    }

    render() {
        return <p>{this.state.count}s</p>
    }
}`}</CodeBlock>
                    </div>
                    <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-4">
                        <div className="text-blue-400 font-bold text-sm mb-3">🪝 Function + Hooks</div>
                        <CodeBlock title="HookTimer.tsx">{`function Timer() {
    const [count, setCount] = useState(0)

    useEffect(() => {
        const id = setInterval(() => {
            setCount(c => c + 1)
        }, 1000)

        return () => clearInterval(id)
        // cleanup = componentWillUnmount
    }, [])
    // [] = componentDidMount

    return <p>{count}s</p>
}`}</CodeBlock>
                    </div>
                </div>

                <Callout type="info">
                    Hook components are ~40% shorter, with related logic grouped together (setup + cleanup in same useEffect),
                    instead of scattered across multiple lifecycle methods.
                </Callout>

                {/* ===== Rules ===== */}
                <Heading2>11. Rules of Hooks</Heading2>

                <div className="my-6 space-y-3">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <span className="text-red-400 mt-0.5">❌</span>
                        <span className="text-slate-300">Don&apos;t call Hooks inside conditions (<InlineCode>if</InlineCode>), loops (<InlineCode>for</InlineCode>), or nested functions</span>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <span className="text-red-400 mt-0.5">❌</span>
                        <span className="text-slate-300">Don&apos;t call Hooks in Class Components or regular JavaScript functions</span>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <span className="text-green-400 mt-0.5">✅</span>
                        <span className="text-slate-300">Only call Hooks at the top level of Function Components or custom Hooks</span>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <span className="text-green-400 mt-0.5">✅</span>
                        <span className="text-slate-300">Custom Hooks must start with <InlineCode>use</InlineCode> (e.g., <InlineCode>useAuth</InlineCode>, <InlineCode>useFetch</InlineCode>)</span>
                    </div>
                </div>

                {/* ===== React.memo ===== */}
                <Heading2>12. React.memo — Optimize Re-renders</Heading2>

                <Paragraph>
                    <InlineCode>React.memo</InlineCode> is a Higher-Order Component (HOC) that wraps a component to{' '}
                    <Highlight>prevent unnecessary re-renders</Highlight>. It shallow-compares props — if props haven&apos;t changed, the component skips re-rendering.
                </Paragraph>

                <CodeBlock title="react-memo.tsx">{`import { memo, useState, useCallback } from 'react'

// ❌ WITHOUT memo — re-renders EVERY TIME parent renders
function ExpensiveList({ items, onDelete }) {
    console.log('ExpensiveList rendered!')  // Runs every time
    return (
        <ul>
            {items.map(item => (
                <li key={item.id}>
                    {item.name}
                    <button onClick={() => onDelete(item.id)}>Delete</button>
                </li>
            ))}
        </ul>
    )
}

// ✅ WITH memo — only re-renders when items or onDelete change
const MemoizedList = memo(function ExpensiveList({ items, onDelete }) {
    console.log('ExpensiveList rendered!')  // Only runs when props change
    return (
        <ul>
            {items.map(item => (
                <li key={item.id}>
                    {item.name}
                    <button onClick={() => onDelete(item.id)}>Delete</button>
                </li>
            ))}
        </ul>
    )
})

// ✅ Custom comparison function
const MemoizedUser = memo(
    function UserCard({ user }) {
        return <div>{user.name} - {user.email}</div>
    },
    (prevProps, nextProps) => {
        // Return true = DON'T re-render (props are "equal")
        return prevProps.user.id === nextProps.user.id
            && prevProps.user.name === nextProps.user.name
    }
)

// ⚠️ memo ONLY works when combined with useCallback/useMemo
function Parent() {
    const [count, setCount] = useState(0)
    const [items] = useState([{ id: 1, name: 'A' }, { id: 2, name: 'B' }])

    // ❌ Every Parent render → new function → MemoizedList re-renders!
    // const handleDelete = (id) => console.log('delete', id)

    // ✅ useCallback keeps stable reference
    const handleDelete = useCallback((id) => {
        console.log('delete', id)
    }, [])

    return (
        <div>
            <p>{count}</p>
            <button onClick={() => setCount(c => c + 1)}>+1</button>
            <MemoizedList items={items} onDelete={handleDelete} />
        </div>
    )
}`}</CodeBlock>

                <Callout type="tip">
                    <strong>When to use React.memo:</strong><br />
                    ✅ Expensive render components (large lists, charts)<br />
                    ✅ Component receives props that rarely change<br />
                    ✅ Component re-renders frequently due to parent<br />
                    ❌ Don&apos;t use for simple components (memoization overhead &gt; re-render cost)
                </Callout>

                {/* ===== Suspense ===== */}
                <Heading2>13. Suspense — Handle Loading States</Heading2>

                <Paragraph>
                    <InlineCode>Suspense</InlineCode> lets child components &quot;wait&quot; for something (data, code) and{' '}
                    <Highlight>show a fallback UI</Highlight> while waiting. Introduced in React 16.6 for lazy loading, expanded in React 18 for data fetching.
                </Paragraph>

                <CodeBlock title="suspense.tsx">{`import { Suspense, lazy, useState } from 'react'

// 1️⃣ Code Splitting — lazy load components
const HeavyChart = lazy(() => import('./HeavyChart'))
const AdminPanel = lazy(() => import('./AdminPanel'))

function App() {
    const [tab, setTab] = useState('home')

    return (
        <div>
            <nav>
                <button onClick={() => setTab('home')}>Home</button>
                <button onClick={() => setTab('chart')}>Chart</button>
                <button onClick={() => setTab('admin')}>Admin</button>
            </nav>

            {/* Suspense wraps lazy components — shows fallback while loading */}
            <Suspense fallback={<div>⏳ Loading...</div>}>
                {tab === 'chart' && <HeavyChart />}
                {tab === 'admin' && <AdminPanel />}
            </Suspense>
        </div>
    )
}

// 2️⃣ Data Fetching (React 18+ with framework support)
// Next.js App Router uses Suspense by default
async function UserProfile({ userId }) {
    const user = await fetchUser(userId) // Server Component
    return <div>{user.name}</div>
}

// In page.tsx:
export default function Page() {
    return (
        <Suspense fallback={<ProfileSkeleton />}>
            <UserProfile userId="123" />
        </Suspense>
    )
}

// 3️⃣ Nested Suspense — granular loading states
function Dashboard() {
    return (
        <div>
            <Suspense fallback={<HeaderSkeleton />}>
                <Header />          {/* Loads fast → appears first */}
            </Suspense>
            <Suspense fallback={<ChartSkeleton />}>
                <AnalyticsChart />  {/* Loads slow → own skeleton */}
            </Suspense>
            <Suspense fallback={<TableSkeleton />}>
                <DataTable />       {/* Loads slow → own skeleton */}
            </Suspense>
        </div>
    )
}`}</CodeBlock>

                <div className="my-6 overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead><tr className="border-b border-white/10">
                            <th className="text-left p-3 text-slate-400 font-medium">Feature</th>
                            <th className="text-left p-3 text-slate-400 font-medium">React Version</th>
                            <th className="text-left p-3 text-slate-400 font-medium">Description</th>
                        </tr></thead>
                        <tbody className="text-slate-300">
                            <tr className="border-b border-white/5"><td className="p-3">Code Splitting</td><td className="p-3">16.6+</td><td className="p-3"><InlineCode>lazy()</InlineCode> + Suspense</td></tr>
                            <tr className="border-b border-white/5"><td className="p-3">Data Fetching</td><td className="p-3">18+</td><td className="p-3">With frameworks (Next.js, Relay)</td></tr>
                            <tr><td className="p-3">Streaming SSR</td><td className="p-3">18+</td><td className="p-3">Server renders in chunks</td></tr>
                        </tbody>
                    </table>
                </div>

                {/* ===== Fiber ===== */}
                <Heading2>14. React Fiber — The Engine Inside</Heading2>

                <Paragraph>
                    <Highlight>React Fiber</Highlight> is the new reconciliation engine introduced in React 16 (2017). It replaced the old stack-based reconciler
                    with an <Highlight>incremental rendering</Highlight> architecture — allowing React to split render work into chunks and prioritize tasks.
                </Paragraph>

                <div className="my-6 space-y-2">
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">🧬 What is a Fiber Node?</div>
                        <div className="text-slate-300 text-sm mt-1">
                            Each React element creates a <strong>Fiber node</strong> — a JavaScript object containing:<br />
                            • <InlineCode>type</InlineCode> — component type (div, MyComponent)<br />
                            • <InlineCode>props</InlineCode> — current props<br />
                            • <InlineCode>stateNode</InlineCode> — DOM node or class instance<br />
                            • <InlineCode>child</InlineCode>, <InlineCode>sibling</InlineCode>, <InlineCode>return</InlineCode> — linked list structure<br />
                            • <InlineCode>memoizedState</InlineCode> — linked list of hooks (useState, useEffect...)
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">⚡ Why Fiber Matters</div>
                        <div className="text-slate-300 text-sm mt-1">
                            <strong>Before Fiber (Stack Reconciler):</strong><br />
                            • Synchronous rendering — blocks main thread until complete<br />
                            • UI freezes when rendering large trees<br /><br />
                            <strong>After Fiber:</strong><br />
                            • Rendering can <strong>pause, resume, abort</strong><br />
                            • Prioritizes user interaction (click, type) over background work<br />
                            • Enables <InlineCode>Suspense</InlineCode>, <InlineCode>useTransition</InlineCode>, <InlineCode>Concurrent Mode</InlineCode>
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">🔄 2 Phases of Fiber</div>
                        <div className="text-slate-300 text-sm mt-1">
                            <strong>1. Render Phase</strong> (can be async, pausable):<br />
                            • Creates new Fiber tree from JSX<br />
                            • Diffs against the old Fiber tree<br />
                            • Marks changes as effects<br /><br />
                            <strong>2. Commit Phase</strong> (synchronous, uninterruptible):<br />
                            • Applies all DOM changes<br />
                            • Runs useLayoutEffect<br />
                            • Schedules useEffect
                        </div>
                    </div>
                </div>

                <CodeBlock title="fiber-concept.tsx">{`// Each component = 1 Fiber node in the tree
// React traverses using linked list, not recursion

// Fiber tree structure:
// App (fiber) 
//   ├── child: Header (fiber)
//   │     └── child: Logo (fiber)
//   │           └── sibling: Nav (fiber)
//   └── sibling: Main (fiber)
//         └── child: ProductList (fiber)

// Hooks are stored in fiber.memoizedState as a linked list:
// fiber.memoizedState → { useState: count } → { useEffect: fetchData } → { useRef: inputRef } → null

// This is WHY hooks must be called in FIXED ORDER —
// React uses position in the linked list to match hook with state!

// ❌ If you wrap hook in if:
if (condition) {
    const [a, setA] = useState(0)  // Run 1: hook #1
}                                   // Run 2: SKIPPED → all hooks shift!
const [b, setB] = useState(0)      // Run 1: hook #2, Run 2: hook #1 😱`}</CodeBlock>

                <Callout type="info">
                    You don&apos;t directly interact with Fiber, but understanding how it works explains:
                    why hooks must be called in order, why <InlineCode>useTransition</InlineCode> works,
                    and why React can render smoothly with Concurrent Mode.
                </Callout>

                {/* ===== Portal ===== */}
                <Heading2>15. Portal — Render Outside DOM Parent</Heading2>

                <Paragraph>
                    <InlineCode>createPortal</InlineCode> lets you render children into a DOM node <Highlight>outside the parent hierarchy</Highlight>,
                    while preserving React event bubbling and context. Used for modals, tooltips, dropdowns.
                </Paragraph>

                <CodeBlock title="portal.tsx">{`import { createPortal } from 'react-dom'
import { useState, useRef } from 'react'

// 1️⃣ Modal Portal — render into document.body
function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null

    return createPortal(
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} aria-label="Close">✕</button>
                {children}
            </div>
        </div>,
        document.body  // ← Renders into body instead of parent component
    )
}

// Usage:
function App() {
    const [showModal, setShowModal] = useState(false)
    return (
        <div style={{ overflow: 'hidden' }}>
            {/* Modal is NOT affected by overflow: hidden */}
            <button onClick={() => setShowModal(true)}>Open Modal</button>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <h2>Hello from Portal!</h2>
                <p>This modal renders at document.body</p>
            </Modal>
        </div>
    )
}

// 2️⃣ Tooltip Portal — escapes container overflow
function Tooltip({ text, children }) {
    const [show, setShow] = useState(false)
    const [pos, setPos] = useState({ top: 0, left: 0 })
    const ref = useRef<HTMLDivElement>(null)

    const handleMouseEnter = () => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect()
            setPos({ top: rect.bottom + 8, left: rect.left })
        }
        setShow(true)
    }

    return (
        <>
            <div ref={ref} onMouseEnter={handleMouseEnter}
                 onMouseLeave={() => setShow(false)}>
                {children}
            </div>
            {show && createPortal(
                <div style={{ position: 'fixed', top: pos.top, left: pos.left }}
                     className="tooltip">
                    {text}
                </div>,
                document.body
            )}
        </>
    )
}`}</CodeBlock>

                <div className="my-6 space-y-2">
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">✅ When to use Portal</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <strong>Modals/Dialogs</strong> — escape <InlineCode>overflow: hidden</InlineCode> and <InlineCode>z-index</InlineCode> stacking<br />
                            • <strong>Tooltips/Popovers</strong> — precise positioning without container clipping<br />
                            • <strong>Toast notifications</strong> — render at screen corners<br />
                            • <strong>Dropdown menus</strong> — escape scroll containers
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="text-yellow-400 font-bold text-sm">⚠️ Important Notes</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Events still bubble through the <strong>React tree</strong> (not DOM tree)<br />
                            • Context works normally through Portals<br />
                            • Portal node must exist in DOM before rendering<br />
                            • Remember cleanup on unmount (avoid memory leaks)
                        </div>
                    </div>
                </div>

                {/* ===== Summary ===== */}
                <Heading2>📌 Summary</Heading2>

                <div className="my-6 space-y-3">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5">
                        <span className="text-blue-400 mt-0.5">🔵</span>
                        <span className="text-slate-300"><Highlight>useState</Highlight> — simple state, re-renders on change</span>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5">
                        <span className="text-blue-400 mt-0.5">⚡</span>
                        <span className="text-slate-300"><Highlight>useEffect</Highlight> — side effects (APIs, timers, subscriptions)</span>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5">
                        <span className="text-blue-400 mt-0.5">📌</span>
                        <span className="text-slate-300"><Highlight>useRef</Highlight> — DOM refs or values without re-render</span>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5">
                        <span className="text-blue-400 mt-0.5">🧠</span>
                        <span className="text-slate-300"><Highlight>useMemo / useCallback</Highlight> — performance optimization</span>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5">
                        <span className="text-blue-400 mt-0.5">🌐</span>
                        <span className="text-slate-300"><Highlight>useContext</Highlight> — global state, avoid prop drilling</span>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5">
                        <span className="text-blue-400 mt-0.5">🔄</span>
                        <span className="text-slate-300"><Highlight>useReducer</Highlight> — complex state, Redux-like pattern</span>
                    </div>
                </div>

                {/* ===== REAL-WORLD EXAMPLES ===== */}
                <Heading2>🏭 Real-World Examples from This Project</Heading2>

                <Paragraph>
                    Below is how hooks are used <Highlight>in practice</Highlight> in this project&#39;s source code.
                </Paragraph>

                <CodeBlock title="ProductTable.tsx — useMemo + useCallback">{`// 📁 src/components/shop/products/ProductTable.tsx

// useMemo — build categoryMap, only recalculate when categories change
const categoryMap = useMemo(() => {
    const map = new Map<string, string>()
    categories?.forEach((category: Category) => {
        if (category._id) {
            map.set(String(category._id), category.name)
        }
    })
    return map
}, [categories])  // 🔑 dependency: only recompute when categories change

// useCallback — 6 stable callbacks, not recreated every render
const handleEditProduct = useCallback((product: Product) => {
    setEditingProduct(product)
    setIsOpen(true)
}, [])  // 🔑 [] = never recreated

const handleDeleteProduct = useCallback(async (record: Product) => {
    const { message, success }: any = await remove('api/product', record, 'products')
    push(message, success)
}, [push])  // 🔑 [push] = recreated when push changes

// useMemo — memoize columns array
const columns: ColumnsType<Product> = useMemo(
    () => [/* ... column definitions ... */],
    [categoryMap, handleEditProduct, handleOpenBarcode, handleCopySku, handleDeleteProduct]
)  // 🔑 only recreates when callbacks or map change`}</CodeBlock>

                <CodeBlock title="useDebounce.ts — Real Custom Hook">{`// 📁 src/hooks/useDebounce.ts
// Custom hook used in 3 components: ProductTable, ShopeeLinksTable, CartPage

const useDebounce = (value: string, delay: number): string => {
    const [debouncedValue, setDebouncedValue] = useState<string>(value)
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)
        return () => clearTimeout(handler)  // cleanup on value change
    }, [value, delay])
    return debouncedValue
}

// Usage:
// ProductTable:     useDebounce(searchValue, 100)   // fast product search
// ShopeeLinksTable: useDebounce(searchTerm, 300)    // link search
// CartPage:         useDebounce(scanValue, 2000)    // mobile barcode scan`}</CodeBlock>

                <Callout type="tip">
                    Start with <InlineCode>useState</InlineCode> + <InlineCode>useEffect</InlineCode> — these 2 hooks cover 90% of use cases.
                    Only add other hooks when you truly need optimization or complex logic.
                </Callout>
            </>
        ),
    },
}

export default reactHooks
