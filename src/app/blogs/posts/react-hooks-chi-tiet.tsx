import { BlogPost } from '../types'
import { CodeBlock, Heading2, Heading3, Paragraph, Highlight, InlineCode, Callout } from '../components/BlogComponents'

const reactHooks: BlogPost = {
    slug: 'react-hooks-chi-tiet',
    title: 'React Hooks — Hướng dẫn chi tiết từng Hook',
    description:
        'Tìm hiểu tất cả React Hooks: useState, useEffect, useRef, useMemo, useCallback, useContext, useReducer... và so sánh với lifecycle của Class Component.',
    date: '2026-02-24',
    tags: ['React', 'Hooks', 'Fundamentals'],
    emoji: '🪝',
    color: '#61DAFB',
    content: (
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

            <Heading3>Lazy Initialization</Heading3>

            <Paragraph>
                Khi initial value tốn chi phí tính toán, truyền <Highlight>function</Highlight> thay vì giá trị:
            </Paragraph>

            <CodeBlock title="lazy-init.tsx">{`// ❌ Chạy mỗi lần render (lãng phí)
const [data, setData] = useState(expensiveComputation())

// ✅ Chỉ chạy 1 lần khi mount
const [data, setData] = useState(() => expensiveComputation())`}</CodeBlock>

            <Callout type="tip">
                Khi update state dựa trên state cũ, luôn dùng callback form:{' '}
                <InlineCode>setCount(prev =&gt; prev + 1)</InlineCode> thay vì{' '}
                <InlineCode>setCount(count + 1)</InlineCode> để tránh stale closure.
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

            <Callout type="warning">
                Cleanup function (return) tương đương <InlineCode>componentWillUnmount</InlineCode>.
                Luôn cleanup timers, subscriptions, event listeners để tránh memory leak!
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

            <Callout type="tip">
                Bắt đầu với <InlineCode>useState</InlineCode> + <InlineCode>useEffect</InlineCode> — đây là 2 hooks
                cần thiết cho 90% trường hợp. Chỉ thêm các hooks khác khi thực sự cần optimize hoặc logic phức tạp.
            </Callout>
        </>
    ),
}

export default reactHooks
