import { Callout, CodeBlock, Heading2, Highlight, Paragraph } from '../components/BlogComponents'
import { BlogPost } from '../types'

const reactFeatures: BlogPost = {
    slug: 'react-features',
    title: {
        vi: 'React qua các phiên bản — Tính năng quan trọng từ v16 đến v19',
        en: 'React Through the Versions — Key Features from v16 to v19',
    },
    description: {
        vi: 'Tổng hợp các tính năng quan trọng của React qua từng phiên bản: Hooks, Concurrent Mode, Server Components, Suspense, React Compiler và nhiều hơn.',
        en: 'A comprehensive guide to React features across versions: Hooks, Concurrent Mode, Server Components, Suspense, React Compiler and more.',
    },
    date: '2024-08-12',
    tags: ['React', 'Hooks', 'Server Components', 'Advanced'],
    emoji: '⚛️',
    color: '#61dafb',
    content: {
        vi: (
            <>
                <Paragraph>
                    React phát triển nhanh chóng từ class components đến hooks, concurrent features, và server components.
                    Bài viết này tổng hợp <Highlight>các tính năng cần biết</Highlight> qua từng phiên bản major.
                </Paragraph>

                {/* ===== React 16 ===== */}
                <Heading2>🔥 React 16 (2017) — Fiber Architecture & Error Boundaries</Heading2>

                <Paragraph>
                    React 16 viết lại hoàn toàn engine rendering với <Highlight>Fiber Architecture</Highlight>,
                    cho phép async rendering và chia nhỏ công việc render.
                </Paragraph>

                <CodeBlock title="error-boundary.tsx">{`// Error Boundaries — bắt errors trong component tree
class ErrorBoundary extends React.Component {
    state = { hasError: false, error: null }

    static getDerivedStateFromError(error) {
        return { hasError: true, error }
    }

    componentDidCatch(error, errorInfo) {
        logErrorToService(error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            return <div>Something went wrong: {this.state.error?.message}</div>
        }
        return this.props.children
    }
}

// Sử dụng
<ErrorBoundary>
    <MyApp />
</ErrorBoundary>`}</CodeBlock>

                <CodeBlock title="react16-features.tsx">{`// Portals — render children vào DOM node khác
import { createPortal } from 'react-dom'

function Modal({ children }) {
    return createPortal(
        <div className="modal-overlay">{children}</div>,
        document.getElementById('modal-root')
    )
}

// Fragments — return nhiều elements không cần wrapper
function List() {
    return (
        <>
            <li>Item 1</li>
            <li>Item 2</li>
        </>
    )
}

// Context API (v16.3) — thay thế prop drilling
const ThemeContext = React.createContext('light')

function App() {
    return (
        <ThemeContext.Provider value="dark">
            <Toolbar />
        </ThemeContext.Provider>
    )
}

function ThemedButton() {
    return (
        <ThemeContext.Consumer>
            {theme => <button className={theme}>Click</button>}
        </ThemeContext.Consumer>
    )
}

// React.memo (v16.6) — skip re-render nếu props không đổi
const ExpensiveList = React.memo(function ExpensiveList({ items }) {
    return items.map(item => <div key={item.id}>{item.name}</div>)
})

// React.lazy & Suspense (v16.6) — code splitting
const LazyComponent = React.lazy(() => import('./HeavyComponent'))

function App() {
    return (
        <Suspense fallback={<Loading />}>
            <LazyComponent />
        </Suspense>
    )
}`}</CodeBlock>

                {/* ===== React 16.8 — Hooks ===== */}
                <Heading2>🪝 React 16.8 (2019) — Hooks Revolution</Heading2>

                <Paragraph>
                    Hooks là <Highlight>thay đổi lớn nhất</Highlight> kể từ khi React ra đời. Cho phép dùng state và lifecycle
                    trong function components, loại bỏ nhu cầu class components.
                </Paragraph>

                <CodeBlock title="hooks-core.tsx">{`// useState — state trong function component
function Counter() {
    const [count, setCount] = useState(0)
    return <button onClick={() => setCount(c => c + 1)}>{count}</button>
}

// useEffect — side effects (thay componentDidMount/Update/Unmount)
function UserProfile({ userId }) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        let cancelled = false
        fetchUser(userId).then(data => {
            if (!cancelled) setUser(data)
        })
        return () => { cancelled = true } // cleanup
    }, [userId]) // dependency array

    return <div>{user?.name}</div>
}

// useContext — consume context dễ dàng
function ThemedButton() {
    const theme = useContext(ThemeContext)
    return <button className={theme}>Click</button>
}

// useRef — mutable ref không trigger re-render
function TextInput() {
    const inputRef = useRef(null)
    return (
        <>
            <input ref={inputRef} />
            <button onClick={() => inputRef.current?.focus()}>Focus</button>
        </>
    )
}

// useReducer — complex state logic
function todoReducer(state, action) {
    switch (action.type) {
        case 'add': return [...state, action.todo]
        case 'remove': return state.filter(t => t.id !== action.id)
        case 'toggle': return state.map(t =>
            t.id === action.id ? { ...t, done: !t.done } : t
        )
    }
}

function TodoApp() {
    const [todos, dispatch] = useReducer(todoReducer, [])
    // dispatch({ type: 'add', todo: { id: 1, text: 'Learn React' } })
}

// useMemo & useCallback — memoization
function ExpensiveComponent({ items, onSelect }) {
    const sorted = useMemo(() =>
        [...items].sort((a, b) => a.price - b.price),
        [items]
    )
    const handleClick = useCallback((id) => {
        onSelect(id)
    }, [onSelect])

    return sorted.map(item =>
        <div key={item.id} onClick={() => handleClick(item.id)}>{item.name}</div>
    )
}

// Custom Hooks — tái sử dụng logic
function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        const stored = localStorage.getItem(key)
        return stored ? JSON.parse(stored) : initialValue
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value, setValue]
}

// Sử dụng
const [theme, setTheme] = useLocalStorage('theme', 'dark')`}</CodeBlock>

                {/* ===== React 17 ===== */}
                <Heading2>🔧 React 17 (2020) — No New Features, Better Foundation</Heading2>

                <Paragraph>
                    React 17 không có tính năng mới cho developers, nhưng thay đổi nền tảng quan trọng:
                </Paragraph>

                <CodeBlock title="react17.tsx">{`// 1. Event Delegation thay đổi
// React 16: events gắn vào document
// React 17: events gắn vào root DOM container
// → Cho phép nhiều React versions cùng tồn tại trên 1 page

// 2. Không còn cần import React cho JSX
// React 16: phải import React from 'react' mọi file JSX
// React 17: JSX transform tự động (với babel/compiler mới)

// ❌ React 16
import React from 'react'
function App() { return <div>Hello</div> }

// ✅ React 17+ (không cần import React)
function App() { return <div>Hello</div> }

// 3. useEffect cleanup timing thay đổi
// React 16: cleanup chạy synchronously
// React 17: cleanup chạy asynchronously (sau khi screen update)
useEffect(() => {
    const subscription = subscribe()
    return () => subscription.unsubscribe() // chạy async trong React 17
}, [])

// 4. Consistent Error Handling
// undefined return từ component → error (giúp catch bugs sớm)
// Trước: return undefined âm thầm render nothing`}</CodeBlock>

                {/* ===== React 18 ===== */}
                <Heading2>⚡ React 18 (2022) — Concurrent Features</Heading2>

                <Paragraph>
                    React 18 giới thiệu <Highlight>Concurrent Rendering</Highlight> — React có thể chuẩn bị nhiều UI states
                    cùng lúc, ưu tiên interactions quan trọng.
                </Paragraph>

                <CodeBlock title="react18.tsx">{`// createRoot — API mới thay ReactDOM.render
import { createRoot } from 'react-dom/client'
const root = createRoot(document.getElementById('root'))
root.render(<App />)

// Automatic Batching — gộp nhiều setState thành 1 re-render
// React 17: chỉ batch trong event handlers
// React 18: batch MỌI NƠI (setTimeout, promises, event handlers)
function handleClick() {
    setCount(c => c + 1)  // ❌ React 17: 2 re-renders
    setFlag(f => !f)      // ✅ React 18: 1 re-render (batched)
}

// Kể cả trong async code
setTimeout(() => {
    setCount(c => c + 1)
    setFlag(f => !f)
    // React 18: 1 re-render ✅
}, 1000)

// useTransition — đánh dấu update là non-urgent
function SearchResults() {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    const [isPending, startTransition] = useTransition()

    function handleChange(e) {
        setQuery(e.target.value) // urgent: update input ngay

        startTransition(() => {
            setResults(filterHugeList(e.target.value)) // non-urgent: có thể delay
        })
    }

    return (
        <>
            <input value={query} onChange={handleChange} />
            {isPending ? <Spinner /> : <ResultList results={results} />}
        </>
    )
}

// useDeferredValue — defer 1 giá trị
function SearchResults({ query }) {
    const deferredQuery = useDeferredValue(query)
    // deferredQuery cập nhật sau query, cho phép UI responsive

    return (
        <div style={{ opacity: query !== deferredQuery ? 0.5 : 1 }}>
            <HugeList filter={deferredQuery} />
        </div>
    )
}

// useId — generate unique IDs (SSR-safe)
function PasswordField() {
    const id = useId()
    return (
        <>
            <label htmlFor={id}>Password:</label>
            <input id={id} type="password" />
        </>
    )
}

// Suspense for Data Fetching
function ProfilePage() {
    return (
        <Suspense fallback={<Skeleton />}>
            <ProfileDetails />  {/* suspends while loading */}
        </Suspense>
    )
}

// useSyncExternalStore — subscribe external stores
const width = useSyncExternalStore(
    (callback) => {
        window.addEventListener('resize', callback)
        return () => window.removeEventListener('resize', callback)
    },
    () => window.innerWidth
)

// useInsertionEffect — inject styles before DOM mutations (cho CSS-in-JS libs)
useInsertionEffect(() => {
    const style = document.createElement('style')
    style.textContent = '.my-class { color: red }'
    document.head.appendChild(style)
    return () => style.remove()
}, [])`}</CodeBlock>

                {/* ===== React 19 ===== */}
                <Heading2>🚀 React 19 (2024) — Server Components & Actions</Heading2>

                <Paragraph>
                    React 19 chính thức hỗ trợ <Highlight>Server Components</Highlight>, <Highlight>Actions</Highlight>,
                    và nhiều hooks mới. Đây là bước tiến lớn nhất kể từ Hooks.
                </Paragraph>

                <CodeBlock title="server-components.tsx">{`// Server Components — chạy trên server, zero JS bundle
// File không có 'use client' → mặc định là Server Component

// Server Component — fetch data trực tiếp
async function ProductList() {
    const products = await db.query('SELECT * FROM products')
    return (
        <ul>
            {products.map(p => <li key={p.id}>{p.name}</li>)}
        </ul>
    )
}

// Client Component — cần interactivity
'use client'
function AddToCart({ productId }) {
    const [added, setAdded] = useState(false)
    return (
        <button onClick={() => setAdded(true)}>
            {added ? '✅ Added' : '🛒 Add to Cart'}
        </button>
    )
}

// Kết hợp Server + Client
async function ProductPage({ id }) {
    const product = await db.query('SELECT * FROM products WHERE id = ?', [id])
    return (
        <div>
            <h1>{product.name}</h1>        {/* Server: no JS */}
            <p>{product.description}</p>    {/* Server: no JS */}
            <AddToCart productId={id} />    {/* Client: interactive */}
        </div>
    )
}`}</CodeBlock>

                <CodeBlock title="react19-actions.tsx">{`// Server Actions — gọi server function từ client
'use server'
async function createProduct(formData) {
    const name = formData.get('name')
    const price = formData.get('price')
    await db.query('INSERT INTO products (name, price) VALUES (?, ?)', [name, price])
    revalidatePath('/products')
}

// Dùng trong form
function CreateProductForm() {
    return (
        <form action={createProduct}>
            <input name="name" placeholder="Product name" />
            <input name="price" type="number" />
            <button type="submit">Create</button>
        </form>
    )
}

// useActionState — track form submission state
function LoginForm() {
    const [state, formAction, isPending] = useActionState(
        async (prevState, formData) => {
            const result = await login(formData)
            if (result.error) return { error: result.error }
            redirect('/dashboard')
        },
        { error: null }
    )

    return (
        <form action={formAction}>
            <input name="email" />
            <input name="password" type="password" />
            {state.error && <p className="error">{state.error}</p>}
            <button disabled={isPending}>
                {isPending ? 'Logging in...' : 'Login'}
            </button>
        </form>
    )
}

// useFormStatus — biết form đang submit không
import { useFormStatus } from 'react-dom'

function SubmitButton() {
    const { pending, data, method } = useFormStatus()
    return (
        <button disabled={pending}>
            {pending ? '⏳ Submitting...' : 'Submit'}
        </button>
    )
}`}</CodeBlock>

                <CodeBlock title="react19-hooks.tsx">{`// useOptimistic — optimistic UI updates
function TodoList({ todos }) {
    const [optimisticTodos, addOptimistic] = useOptimistic(
        todos,
        (state, newTodo) => [...state, { ...newTodo, pending: true }]
    )

    async function addTodo(formData) {
        const text = formData.get('text')
        addOptimistic({ text, id: Date.now() }) // hiển thị ngay
        await saveTodo(text) // save lên server
    }

    return (
        <>
            {optimisticTodos.map(todo => (
                <div key={todo.id} style={{ opacity: todo.pending ? 0.5 : 1 }}>
                    {todo.text}
                </div>
            ))}
            <form action={addTodo}>
                <input name="text" />
            </form>
        </>
    )
}

// use() — read resources in render (thay useEffect fetch)
function UserProfile({ userPromise }) {
    const user = use(userPromise)   // suspends until resolved
    return <h1>{user.name}</h1>
}

// use() với Context
function Theme() {
    const theme = use(ThemeContext) // thay useContext, dùng được trong conditions
    if (theme === 'dark') return <DarkMode />
    return <LightMode />
}

// ref as prop — không cần forwardRef nữa
function Input({ ref, ...props }) {
    return <input ref={ref} {...props} />
}
// Trước: const Input = forwardRef((props, ref) => ...)

// Metadata — title, meta tags trong component
function BlogPost({ post }) {
    return (
        <>
            <title>{post.title}</title>
            <meta name="description" content={post.excerpt} />
            <article>{post.content}</article>
        </>
    )
}

// Stylesheet support
<link rel="stylesheet" href="/styles.css" precedence="high" />

// React Compiler (experimental) — tự động memoize
// Không cần useMemo, useCallback, React.memo nữa!
// Compiler tự detect và optimize re-renders`}</CodeBlock>

                <Heading2>📋 Tóm tắt nhanh</Heading2>

                <CodeBlock title="cheat-sheet.js">{`// React 16:   Fiber, Error Boundaries, Portals, Fragments, Context API,
//             React.memo, React.lazy + Suspense
// React 16.8: 🪝 HOOKS — useState, useEffect, useContext, useRef,
//             useReducer, useMemo, useCallback, Custom Hooks
// React 17:   No new features, event delegation change, no React import needed
// React 18:   Concurrent Rendering, useTransition, useDeferredValue,
//             useId, Automatic Batching, Suspense for data
// React 19:   Server Components, Server Actions, useActionState,
//             useFormStatus, useOptimistic, use(), React Compiler`}</CodeBlock>

                <Callout type="tip">
                    Cách nhớ: <strong>16</strong> = Foundation (Fiber + Context), <strong>16.8</strong> = Hooks Revolution,
                    {' '}<strong>18</strong> = Concurrent (useTransition), <strong>19</strong> = Server (RSC + Actions).
                </Callout>
            </>
        ),
        en: (
            <>
                <Paragraph>
                    React has evolved rapidly from class components to hooks, concurrent features, and server components.
                    This article covers all <Highlight>must-know features</Highlight> across each major version.
                </Paragraph>

                {/* ===== React 16 ===== */}
                <Heading2>🔥 React 16 (2017) — Fiber Architecture & Error Boundaries</Heading2>

                <Paragraph>
                    React 16 completely rewrote the rendering engine with <Highlight>Fiber Architecture</Highlight>,
                    enabling async rendering and work splitting.
                </Paragraph>

                <CodeBlock title="error-boundary.tsx">{`// Error Boundaries — catch errors in component tree
class ErrorBoundary extends React.Component {
    state = { hasError: false, error: null }

    static getDerivedStateFromError(error) {
        return { hasError: true, error }
    }

    componentDidCatch(error, errorInfo) {
        logErrorToService(error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            return <div>Something went wrong: {this.state.error?.message}</div>
        }
        return this.props.children
    }
}

// Usage
<ErrorBoundary>
    <MyApp />
</ErrorBoundary>`}</CodeBlock>

                <CodeBlock title="react16-features.tsx">{`// Portals — render children into different DOM node
import { createPortal } from 'react-dom'

function Modal({ children }) {
    return createPortal(
        <div className="modal-overlay">{children}</div>,
        document.getElementById('modal-root')
    )
}

// Fragments — return multiple elements without wrapper
function List() {
    return (
        <>
            <li>Item 1</li>
            <li>Item 2</li>
        </>
    )
}

// Context API (v16.3) — replaces prop drilling
const ThemeContext = React.createContext('light')

function App() {
    return (
        <ThemeContext.Provider value="dark">
            <Toolbar />
        </ThemeContext.Provider>
    )
}

// React.memo (v16.6) — skip re-render if props unchanged
const ExpensiveList = React.memo(function ExpensiveList({ items }) {
    return items.map(item => <div key={item.id}>{item.name}</div>)
})

// React.lazy & Suspense (v16.6) — code splitting
const LazyComponent = React.lazy(() => import('./HeavyComponent'))

function App() {
    return (
        <Suspense fallback={<Loading />}>
            <LazyComponent />
        </Suspense>
    )
}`}</CodeBlock>

                {/* ===== React 16.8 — Hooks ===== */}
                <Heading2>🪝 React 16.8 (2019) — Hooks Revolution</Heading2>

                <Paragraph>
                    Hooks are the <Highlight>biggest change</Highlight> since React was created. They allow state and lifecycle
                    in function components, eliminating the need for class components.
                </Paragraph>

                <CodeBlock title="hooks-core.tsx">{`// useState — state in function components
function Counter() {
    const [count, setCount] = useState(0)
    return <button onClick={() => setCount(c => c + 1)}>{count}</button>
}

// useEffect — side effects (replaces componentDidMount/Update/Unmount)
function UserProfile({ userId }) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        let cancelled = false
        fetchUser(userId).then(data => {
            if (!cancelled) setUser(data)
        })
        return () => { cancelled = true } // cleanup
    }, [userId]) // dependency array

    return <div>{user?.name}</div>
}

// useContext — consume context easily
function ThemedButton() {
    const theme = useContext(ThemeContext)
    return <button className={theme}>Click</button>
}

// useReducer — complex state logic
function todoReducer(state, action) {
    switch (action.type) {
        case 'add': return [...state, action.todo]
        case 'remove': return state.filter(t => t.id !== action.id)
        case 'toggle': return state.map(t =>
            t.id === action.id ? { ...t, done: !t.done } : t
        )
    }
}

// useMemo & useCallback — memoization
const sorted = useMemo(() => [...items].sort((a, b) => a.price - b.price), [items])
const handleClick = useCallback((id) => onSelect(id), [onSelect])

// Custom Hooks — reusable logic
function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        const stored = localStorage.getItem(key)
        return stored ? JSON.parse(stored) : initialValue
    })
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])
    return [value, setValue]
}`}</CodeBlock>

                {/* ===== React 17 ===== */}
                <Heading2>🔧 React 17 (2020) — No New Features, Better Foundation</Heading2>

                <CodeBlock title="react17.tsx">{`// Key changes (no new developer-facing features):

// 1. Event Delegation changed
// React 16: events attached to document
// React 17: events attached to root DOM container
// → Allows multiple React versions on same page

// 2. No longer need to import React for JSX
// React 16: must import React from 'react' in every JSX file
// React 17: new JSX transform handles it automatically

// 3. useEffect cleanup runs asynchronously
// React 16: cleanup runs synchronously
// React 17: cleanup runs after screen update (better perf)`}</CodeBlock>

                {/* ===== React 18 ===== */}
                <Heading2>⚡ React 18 (2022) — Concurrent Features</Heading2>

                <Paragraph>
                    React 18 introduces <Highlight>Concurrent Rendering</Highlight> — React can prepare multiple UI states
                    simultaneously, prioritizing important interactions.
                </Paragraph>

                <CodeBlock title="react18.tsx">{`// createRoot — new API replacing ReactDOM.render
import { createRoot } from 'react-dom/client'
const root = createRoot(document.getElementById('root'))
root.render(<App />)

// Automatic Batching — multiple setStates = 1 re-render
// React 17: only batched in event handlers
// React 18: batched EVERYWHERE (setTimeout, promises, etc.)

// useTransition — mark updates as non-urgent
function SearchResults() {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    const [isPending, startTransition] = useTransition()

    function handleChange(e) {
        setQuery(e.target.value) // urgent: update input immediately
        startTransition(() => {
            setResults(filterHugeList(e.target.value)) // non-urgent
        })
    }

    return (
        <>
            <input value={query} onChange={handleChange} />
            {isPending ? <Spinner /> : <ResultList results={results} />}
        </>
    )
}

// useDeferredValue — defer a value
function SearchResults({ query }) {
    const deferredQuery = useDeferredValue(query)
    return <HugeList filter={deferredQuery} />
}

// useId — generate unique IDs (SSR-safe)
function PasswordField() {
    const id = useId()
    return (
        <>
            <label htmlFor={id}>Password:</label>
            <input id={id} type="password" />
        </>
    )
}

// Suspense for Data Fetching
function ProfilePage() {
    return (
        <Suspense fallback={<Skeleton />}>
            <ProfileDetails />
        </Suspense>
    )
}`}</CodeBlock>

                {/* ===== React 19 ===== */}
                <Heading2>🚀 React 19 (2024) — Server Components & Actions</Heading2>

                <Paragraph>
                    React 19 officially supports <Highlight>Server Components</Highlight>, <Highlight>Actions</Highlight>,
                    and many new hooks. The biggest leap since Hooks.
                </Paragraph>

                <CodeBlock title="react19.tsx">{`// Server Components — run on server, zero JS bundle
async function ProductList() {
    const products = await db.query('SELECT * FROM products')
    return <ul>{products.map(p => <li key={p.id}>{p.name}</li>)}</ul>
}

// Server Actions — call server functions from client
'use server'
async function createProduct(formData) {
    await db.insert(formData)
    revalidatePath('/products')
}

// useActionState — track form submission
const [state, formAction, isPending] = useActionState(loginAction, { error: null })

// useOptimistic — optimistic UI updates
const [optimisticTodos, addOptimistic] = useOptimistic(todos,
    (state, newTodo) => [...state, { ...newTodo, pending: true }]
)

// use() — read resources in render
const user = use(userPromise)   // suspends until resolved
const theme = use(ThemeContext)  // replaces useContext, works in conditions

// ref as prop — no more forwardRef
function Input({ ref, ...props }) {
    return <input ref={ref} {...props} />
}

// React Compiler — auto memoization
// No more useMemo, useCallback, React.memo needed!`}</CodeBlock>

                <Heading2>📋 Quick Reference</Heading2>

                <CodeBlock title="cheat-sheet.js">{`// React 16:   Fiber, Error Boundaries, Portals, Fragments, Context API,
//             React.memo, React.lazy + Suspense
// React 16.8: 🪝 HOOKS — useState, useEffect, useContext, useRef,
//             useReducer, useMemo, useCallback, Custom Hooks
// React 17:   No new features, event delegation change, no React import needed
// React 18:   Concurrent Rendering, useTransition, useDeferredValue,
//             useId, Automatic Batching, Suspense for data
// React 19:   Server Components, Server Actions, useActionState,
//             useFormStatus, useOptimistic, use(), React Compiler`}</CodeBlock>

                <Callout type="tip">
                    Memory trick: <strong>16</strong> = Foundation (Fiber + Context), <strong>16.8</strong> = Hooks Revolution,
                    {' '}<strong>18</strong> = Concurrent (useTransition), <strong>19</strong> = Server (RSC + Actions).
                </Callout>
            </>
        ),
    },
}

export default reactFeatures
