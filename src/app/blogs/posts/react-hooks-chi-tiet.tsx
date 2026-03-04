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

                <Heading3>Lazy Initialization</Heading3>

                <Paragraph>
                    When the initial value is expensive to compute, pass a <Highlight>function</Highlight> instead of a value:
                </Paragraph>

                <CodeBlock title="lazy-init.tsx">{`// ❌ Runs every render (wasteful)
const [data, setData] = useState(expensiveComputation())

// ✅ Runs only once on mount
const [data, setData] = useState(() => expensiveComputation())`}</CodeBlock>

                <Callout type="tip">
                    When updating state based on previous state, always use callback form:{' '}
                    <InlineCode>setCount(prev =&gt; prev + 1)</InlineCode> instead of{' '}
                    <InlineCode>setCount(count + 1)</InlineCode> to avoid stale closures.
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

                <Callout type="warning">
                    Cleanup function (return) is equivalent to <InlineCode>componentWillUnmount</InlineCode>.
                    Always cleanup timers, subscriptions, and event listeners to avoid memory leaks!
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

                <Callout type="tip">
                    Start with <InlineCode>useState</InlineCode> + <InlineCode>useEffect</InlineCode> — these 2 hooks cover 90% of use cases.
                    Only add other hooks when you truly need optimization or complex logic.
                </Callout>
            </>
        ),
    },
}

export default reactHooks
