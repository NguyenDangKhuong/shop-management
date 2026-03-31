import { Callout, CodeBlock, Heading2, Highlight, Paragraph } from '../components/BlogComponents'
import { BlogPost } from '../types'

const unitTestingGuide: BlogPost = {
    slug: 'unit-testing-guide',
    title: {
        vi: 'Hướng dẫn viết Unit Test — Jest & React Testing Library',
        en: 'Unit Testing Guide — Jest & React Testing Library',
    },
    description: {
        vi: 'Từ cơ bản đến nâng cao: setup Jest, viết test cho functions, React components, hooks, API calls, mocking, coverage và best practices.',
        en: 'From basics to advanced: Jest setup, testing functions, React components, hooks, API calls, mocking, coverage and best practices.',
    },
    date: '2025-05-21',
    tags: ['Testing', 'Jest', 'React', 'Best Practices'],
    emoji: '🧪',
    color: '#99425b',
    sections: [
        { id: 'setup', title: { vi: '⚙️ Setup & Config', en: '⚙️ Setup & Config' } },
        { id: 'matchers', title: { vi: '📝 Matchers & Assertions', en: '📝 Matchers & Assertions' } },
        { id: 'pure-functions', title: { vi: '🔧 Test Pure Functions', en: '🔧 Test Pure Functions' } },
        { id: 'async', title: { vi: '⏳ Async Testing', en: '⏳ Async Testing' } },
        { id: 'mocking', title: { vi: '🎭 Mocking', en: '🎭 Mocking' } },
        { id: 'components', title: { vi: '⚛️ React Components', en: '⚛️ React Components' } },
        { id: 'hooks', title: { vi: '🪝 Custom Hooks', en: '🪝 Custom Hooks' } },
        { id: 'api-routes', title: { vi: '🌐 API Routes', en: '🌐 API Routes' } },
        { id: 'test-organization', title: { vi: '📁 Test Organization', en: '📁 Test Organization' } },
        { id: 'anti-patterns', title: { vi: '🚫 Anti-patterns', en: '🚫 Anti-patterns' } },
        { id: 'senior-tips', title: { vi: '👨‍💻 Senior Tips', en: '👨‍💻 Senior Tips' } },
        { id: 'coverage', title: { vi: '📊 Coverage & Best Practices', en: '📊 Coverage & Best Practices' } },
        { id: 'cheatsheet', title: { vi: '📋 Cheat Sheet', en: '📋 Cheat Sheet' } },
    ],
    content: {
        vi: (
            <>
                <Paragraph>
                    Unit test giúp code ổn định, dễ refactor, và <Highlight>bắt bugs sớm</Highlight> trước khi lên production.
                    Bài viết này hướng dẫn từ setup đến viết test thực tế với Jest và React Testing Library.
                </Paragraph>

                <Callout type="info">
                    Jest là test framework phổ biến nhất cho JavaScript/TypeScript. React Testing Library (RTL) test
                    components theo cách user thực sự tương tác.
                </Callout>

                {/* ===== SETUP ===== */}
                <Heading2>⚙️ Setup Jest + TypeScript</Heading2>

                <CodeBlock title="terminal">{`# Next.js (đã built-in Jest support)
npm install -D jest @jest/types ts-jest @types/jest
npm install -D @testing-library/react @testing-library/jest-dom
npm install -D @testing-library/user-event

# jest.config.ts
import type { Config } from 'jest'
import nextJest from 'next/jest'

const createJestConfig = nextJest({ dir: './' })

const config: Config = {
    testEnvironment: 'jsdom',
    setupFilesAfterSetup: ['<rootDir>/jest.setup.ts'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    coverageThreshold: {
        global: { branches: 80, functions: 80, lines: 80, statements: 80 },
    },
}

export default createJestConfig(config)

# jest.setup.ts
import '@testing-library/jest-dom'

# package.json scripts
# "test": "jest",
# "test:watch": "jest --watch",
# "test:coverage": "jest --coverage"

# Cấu trúc file test
# src/utils/__tests__/helper.test.ts
# src/components/__tests__/Button.test.tsx
# hoặc: src/utils/helper.test.ts (cùng thư mục)`}</CodeBlock>

                {/* ===== BASIC JEST ===== */}
                <Heading2>📝 Jest Cơ Bản — Matchers & Assertions</Heading2>

                <CodeBlock title="basic-matchers.test.ts">{`// describe — nhóm các tests liên quan
describe('Math Utils', () => {
    // test hoặc it — 1 test case
    test('should add two numbers', () => {
        expect(add(1, 2)).toBe(3)        // exact equality (===)
    })

    it('should multiply correctly', () => {
        expect(multiply(3, 4)).toBe(12)
    })
})

// === Common Matchers ===

// Equality
expect(value).toBe(3)              // === (primitive)
expect(obj).toEqual({ a: 1 })      // deep equality (object/array)
expect(obj).toStrictEqual({ a: 1 }) // deep + check undefined properties

// Truthiness
expect(value).toBeTruthy()
expect(value).toBeFalsy()
expect(value).toBeNull()
expect(value).toBeUndefined()
expect(value).toBeDefined()

// Numbers
expect(value).toBeGreaterThan(3)
expect(value).toBeGreaterThanOrEqual(3)
expect(value).toBeLessThan(5)
expect(value).toBeCloseTo(0.3, 5)  // floating point

// Strings
expect(str).toMatch(/regex/)
expect(str).toContain('substring')
expect(str).toHaveLength(5)

// Arrays & Iterables
expect(arr).toContain('item')
expect(arr).toContainEqual({ name: 'K' })  // deep match
expect(arr).toHaveLength(3)
expect(arr).toEqual(expect.arrayContaining([1, 2]))

// Objects
expect(obj).toHaveProperty('name')
expect(obj).toHaveProperty('address.city', 'HCM')
expect(obj).toMatchObject({ name: 'K' })  // partial match
expect(obj).toEqual(expect.objectContaining({ name: 'K' }))

// Exceptions
expect(() => throwingFn()).toThrow()
expect(() => throwingFn()).toThrow('error message')
expect(() => throwingFn()).toThrow(TypeError)

// NOT — đảo ngược
expect(value).not.toBe(5)
expect(arr).not.toContain('missing')`}</CodeBlock>

                {/* ===== TESTING FUNCTIONS ===== */}
                <Heading2>🔧 Test Pure Functions</Heading2>

                <CodeBlock title="utils.test.ts">{`// utils.ts
export function formatPrice(price: number): string {
    return price.toLocaleString('vi-VN') + 'đ'
}

export function slugify(text: string): string {
    return text.toLowerCase().trim()
        .replace(/[^\\w\\s-]/g, '')
        .replace(/[\\s_-]+/g, '-')
}

export function chunk<T>(arr: T[], size: number): T[][] {
    const result: T[][] = []
    for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size))
    }
    return result
}

// utils.test.ts
import { formatPrice, slugify, chunk } from './utils'

describe('formatPrice', () => {
    it('formats integer correctly', () => {
        expect(formatPrice(1000000)).toBe('1.000.000đ')
    })

    it('handles zero', () => {
        expect(formatPrice(0)).toBe('0đ')
    })

    it('handles decimals', () => {
        expect(formatPrice(99.5)).toMatch(/99/)
    })
})

describe('slugify', () => {
    it('converts to lowercase slug', () => {
        expect(slugify('Hello World')).toBe('hello-world')
    })

    it('removes special characters', () => {
        expect(slugify('Hello! @World#')).toBe('hello-world')
    })

    it('trims whitespace', () => {
        expect(slugify('  hello  ')).toBe('hello')
    })

    it('handles empty string', () => {
        expect(slugify('')).toBe('')
    })
})

describe('chunk', () => {
    it('splits array into chunks', () => {
        expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]])
    })

    it('handles empty array', () => {
        expect(chunk([], 3)).toEqual([])
    })

    it('handles chunk size larger than array', () => {
        expect(chunk([1, 2], 5)).toEqual([[1, 2]])
    })
})`}</CodeBlock>

                {/* ===== ASYNC TESTING ===== */}
                <Heading2>⏳ Test Async Code</Heading2>

                <CodeBlock title="async.test.ts">{`// Có 3 cách test async:

// 1. async/await (推奨 — khuyên dùng)
test('fetches user data', async () => {
    const user = await fetchUser(1)
    expect(user.name).toBe('Khuong')
})

// 2. .resolves / .rejects
test('resolves to user', async () => {
    await expect(fetchUser(1)).resolves.toEqual({ name: 'Khuong' })
})

test('rejects with error', async () => {
    await expect(fetchUser(-1)).rejects.toThrow('Not found')
})

// 3. Callback (legacy — tránh dùng)
test('callback style', (done) => {
    fetchUserCallback(1, (err, user) => {
        expect(user.name).toBe('Khuong')
        done()
    })
})

// Test setTimeout/setInterval
jest.useFakeTimers()

test('debounce calls function after delay', () => {
    const fn = jest.fn()
    const debounced = debounce(fn, 300)

    debounced()
    expect(fn).not.toHaveBeenCalled()

    jest.advanceTimersByTime(300)
    expect(fn).toHaveBeenCalledTimes(1)
})

afterEach(() => jest.useRealTimers())`}</CodeBlock>

                {/* ===== MOCKING ===== */}
                <Heading2>🎭 Mocking — Giả lập dependencies</Heading2>

                <Paragraph>
                    Mock giúp <Highlight>isolate</Highlight> unit test khỏi external dependencies (API, database, modules).
                </Paragraph>

                <CodeBlock title="mocking.test.ts">{`// === jest.fn() — mock function ===
const mockFn = jest.fn()
mockFn('hello')
mockFn('world')

expect(mockFn).toHaveBeenCalled()
expect(mockFn).toHaveBeenCalledTimes(2)
expect(mockFn).toHaveBeenCalledWith('hello')
expect(mockFn).toHaveBeenLastCalledWith('world')
expect(mockFn.mock.calls).toEqual([['hello'], ['world']])

// Mock return values
const getId = jest.fn()
    .mockReturnValue(1)              // trả về 1 mọi lần
    .mockReturnValueOnce(2)          // trả về 2 lần đầu
    .mockResolvedValue({ id: 1 })    // trả về Promise.resolve(...)
    .mockRejectedValue(new Error())  // trả về Promise.reject(...)

// Mock implementation
const mockCalc = jest.fn((a, b) => a + b)

// === jest.mock() — mock entire module ===
jest.mock('@/utils/api')

import { fetchProducts } from '@/utils/api'
const mockFetch = fetchProducts as jest.MockedFunction<typeof fetchProducts>

test('fetches products', async () => {
    mockFetch.mockResolvedValue([
        { id: 1, name: 'Product A', price: 100 },
    ])

    const products = await fetchProducts()
    expect(products).toHaveLength(1)
    expect(products[0].name).toBe('Product A')
})

// === jest.spyOn() — spy trên method có sẵn ===
test('calls console.error on failure', async () => {
    const spy = jest.spyOn(console, 'error').mockImplementation()

    await failingFunction()

    expect(spy).toHaveBeenCalledWith(expect.stringContaining('Error'))
    spy.mockRestore()
})

// Mock fetch globally
global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve({ data: 'test' }),
})

// Reset mocks
beforeEach(() => {
    jest.clearAllMocks()     // clear calls & instances (giữ implementation)
    // jest.resetAllMocks()  // clear + reset implementation
    // jest.restoreAllMocks() // restore original implementation
})`}</CodeBlock>

                <CodeBlock title="mock-modules.test.ts">{`// Mock module tự động — Jest tạo mock cho mọi export
jest.mock('@/models/Product')

// Mock module với implementation
jest.mock('@/utils/connectDb', () => ({
    __esModule: true,
    default: jest.fn().mockResolvedValue(undefined),
}))

// Mock Next.js modules
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
        back: jest.fn(),
        refresh: jest.fn(),
    }),
    usePathname: () => '/products',
    useSearchParams: () => new URLSearchParams(),
}))

// Mock environment variables
const originalEnv = process.env
beforeEach(() => {
    process.env = { ...originalEnv, API_KEY: 'test-key' }
})
afterEach(() => {
    process.env = originalEnv
})

// Partial mock — giữ nguyên một số functions
jest.mock('@/utils/helpers', () => ({
    ...jest.requireActual('@/utils/helpers'),
    fetchData: jest.fn(),  // chỉ mock fetchData
}))`}</CodeBlock>

                {/* ===== REACT COMPONENT TESTING ===== */}
                <Heading2>⚛️ Test React Components với Testing Library</Heading2>

                <Paragraph>
                    React Testing Library test theo <Highlight>user behavior</Highlight>, không test implementation details.
                    Nguyên tắc: nếu user không thấy/tương tác được, đừng test.
                </Paragraph>

                <CodeBlock title="component.test.tsx">{`import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// Component đơn giản
function Greeting({ name }: { name: string }) {
    return <h1>Hello, {name}!</h1>
}

test('renders greeting', () => {
    render(<Greeting name="Khuong" />)
    expect(screen.getByText('Hello, Khuong!')).toBeInTheDocument()
})

// === Queries — tìm element ===

// getBy* — throw nếu không tìm thấy (dùng khi biết chắc element có)
screen.getByText('Hello')              // text content
screen.getByRole('button', { name: 'Submit' })  // ARIA role
screen.getByLabelText('Email')         // form label
screen.getByPlaceholderText('Search')  // placeholder
screen.getByTestId('custom-id')        // data-testid (last resort)
screen.getByAltText('Logo')           // img alt
screen.getByDisplayValue('current value') // input value

// queryBy* — trả về null nếu không tìm thấy (test absence)
expect(screen.queryByText('Error')).not.toBeInTheDocument()

// findBy* — async, chờ element xuất hiện (dùng cho async render)
const element = await screen.findByText('Loaded data')

// getAllBy*, queryAllBy*, findAllBy* — trả về array

// 🎯 Ưu tiên queries (theo RTL docs):
// 1. getByRole
// 2. getByLabelText
// 3. getByPlaceholderText
// 4. getByText
// 5. getByDisplayValue
// 6. getByAltText
// 7. getByTitle
// 8. getByTestId (last resort)`}</CodeBlock>

                <CodeBlock title="interaction.test.tsx">{`import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// === User Events ===
test('form interaction', async () => {
    const user = userEvent.setup()
    const onSubmit = jest.fn()

    render(<LoginForm onSubmit={onSubmit} />)

    // Type vào input
    const emailInput = screen.getByLabelText('Email')
    await user.type(emailInput, 'test@mail.com')
    expect(emailInput).toHaveValue('test@mail.com')

    // Clear & type
    await user.clear(emailInput)
    await user.type(emailInput, 'new@mail.com')

    // Click button
    const submitBtn = screen.getByRole('button', { name: /submit/i })
    await user.click(submitBtn)
    expect(onSubmit).toHaveBeenCalledTimes(1)

    // Double click, right click
    await user.dblClick(element)
    // await user.pointer({ target: element, keys: '[MouseRight]' })

    // Keyboard
    await user.keyboard('{Enter}')
    await user.keyboard('{Tab}')

    // Select option
    const select = screen.getByRole('combobox')
    await user.selectOptions(select, 'option-value')

    // Checkbox / Radio
    const checkbox = screen.getByRole('checkbox')
    await user.click(checkbox)
    expect(checkbox).toBeChecked()

    // Hover
    await user.hover(element)
    await user.unhover(element)
})

// === Testing DOM Matchers (jest-dom) ===
expect(element).toBeInTheDocument()
expect(element).toBeVisible()
expect(element).toBeEnabled()
expect(element).toBeDisabled()
expect(element).toBeChecked()
expect(element).toHaveClass('active')
expect(element).toHaveStyle({ color: 'red' })
expect(element).toHaveAttribute('href', '/home')
expect(element).toHaveTextContent('Hello')
expect(element).toHaveFocus()
expect(form).toHaveFormValues({ email: 'test@mail.com' })`}</CodeBlock>

                <CodeBlock title="async-component.test.tsx">{`// Test component với async data
function UserList() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchUsers().then(data => {
            setUsers(data)
            setLoading(false)
        })
    }, [])

    if (loading) return <div>Loading...</div>
    return (
        <ul>
            {users.map(u => <li key={u.id}>{u.name}</li>)}
        </ul>
    )
}

// Test
jest.mock('./api')

test('loads and displays users', async () => {
    ;(fetchUsers as jest.Mock).mockResolvedValue([
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
    ])

    render(<UserList />)

    // Loading state
    expect(screen.getByText('Loading...')).toBeInTheDocument()

    // Wait for data
    expect(await screen.findByText('Alice')).toBeInTheDocument()
    expect(screen.getByText('Bob')).toBeInTheDocument()
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
})

test('handles error state', async () => {
    ;(fetchUsers as jest.Mock).mockRejectedValue(new Error('Network error'))

    render(<UserList />)

    expect(await screen.findByText(/error/i)).toBeInTheDocument()
})`}</CodeBlock>

                {/* ===== TESTING HOOKS ===== */}
                <Heading2>🪝 Test Custom Hooks</Heading2>

                <CodeBlock title="hooks.test.ts">{`import { renderHook, act } from '@testing-library/react'

// Custom hook
function useCounter(initial = 0) {
    const [count, setCount] = useState(initial)
    const increment = () => setCount(c => c + 1)
    const decrement = () => setCount(c => c - 1)
    const reset = () => setCount(initial)
    return { count, increment, decrement, reset }
}

// Test
describe('useCounter', () => {
    it('starts with initial value', () => {
        const { result } = renderHook(() => useCounter(10))
        expect(result.current.count).toBe(10)
    })

    it('defaults to 0', () => {
        const { result } = renderHook(() => useCounter())
        expect(result.current.count).toBe(0)
    })

    it('increments counter', () => {
        const { result } = renderHook(() => useCounter())

        act(() => {
            result.current.increment()
        })

        expect(result.current.count).toBe(1)
    })

    it('decrements counter', () => {
        const { result } = renderHook(() => useCounter(5))

        act(() => {
            result.current.decrement()
            result.current.decrement()
        })

        expect(result.current.count).toBe(3)
    })

    it('resets to initial value', () => {
        const { result } = renderHook(() => useCounter(10))

        act(() => {
            result.current.increment()
            result.current.increment()
            result.current.reset()
        })

        expect(result.current.count).toBe(10)
    })
})

// Hook với dependencies (rerender test)
function useDebounce<T>(value: T, delay: number): T {
    const [debounced, setDebounced] = useState(value)
    useEffect(() => {
        const timer = setTimeout(() => setDebounced(value), delay)
        return () => clearTimeout(timer)
    }, [value, delay])
    return debounced
}

describe('useDebounce', () => {
    beforeEach(() => jest.useFakeTimers())
    afterEach(() => jest.useRealTimers())

    it('returns initial value immediately', () => {
        const { result } = renderHook(() => useDebounce('hello', 300))
        expect(result.current).toBe('hello')
    })

    it('updates value after delay', () => {
        const { result, rerender } = renderHook(
            ({ value, delay }) => useDebounce(value, delay),
            { initialProps: { value: 'hello', delay: 300 } }
        )

        rerender({ value: 'world', delay: 300 })
        expect(result.current).toBe('hello') // not yet

        act(() => jest.advanceTimersByTime(300))
        expect(result.current).toBe('world') // updated!
    })
})`}</CodeBlock>

                {/* ===== TESTING API ROUTES ===== */}
                <Heading2>🌐 Test API Routes (Next.js)</Heading2>

                <CodeBlock title="api-route.test.ts">{`import { NextRequest } from 'next/server'
import { GET, POST, DELETE } from '@/app/api/products/route'

// Mock database
jest.mock('@/utils/connectDb', () => ({
    __esModule: true,
    default: jest.fn(),
}))

jest.mock('@/models/Product', () => {
    const mockModel = {
        find: jest.fn(),
        findById: jest.fn(),
        create: jest.fn(),
        findByIdAndUpdate: jest.fn(),
        findByIdAndDelete: jest.fn(),
    }
    return { __esModule: true, default: mockModel }
})

import ProductModel from '@/models/Product'
const mockProduct = ProductModel as jest.Mocked<typeof ProductModel>

describe('GET /api/products', () => {
    beforeEach(() => jest.clearAllMocks())

    it('returns all products', async () => {
        const products = [
            { _id: '1', name: 'Product A', price: 100 },
            { _id: '2', name: 'Product B', price: 200 },
        ]
        mockProduct.find.mockReturnValue({
            sort: jest.fn().mockResolvedValue(products),
        } as any)

        const response = await GET()
        const data = await response.json()

        expect(data.success).toBe(true)
        expect(data.data).toHaveLength(2)
        expect(data.data[0].name).toBe('Product A')
    })

    it('handles database error', async () => {
        mockProduct.find.mockReturnValue({
            sort: jest.fn().mockRejectedValue(new Error('DB Error')),
        } as any)

        const response = await GET()
        const data = await response.json()

        expect(response.status).toBe(500)
        expect(data.success).toBe(false)
    })
})

describe('POST /api/products', () => {
    it('creates a product', async () => {
        const newProduct = { _id: '3', name: 'Product C', price: 300 }
        mockProduct.create.mockResolvedValue(newProduct as any)

        const request = new NextRequest('http://localhost/api/products', {
            method: 'POST',
            body: JSON.stringify({ name: 'Product C', price: 300 }),
        })

        const response = await POST(request)
        const data = await response.json()

        expect(data.success).toBe(true)
        expect(data.data.name).toBe('Product C')
        expect(mockProduct.create).toHaveBeenCalledWith(
            expect.objectContaining({ name: 'Product C', price: 300 })
        )
    })

    it('validates required fields', async () => {
        const request = new NextRequest('http://localhost/api/products', {
            method: 'POST',
            body: JSON.stringify({}),
        })

        const response = await POST(request)
        expect(response.status).toBe(400)
    })
})`}</CodeBlock>

                {/* ===== TEST ORGANIZATION ===== */}
                <Heading2>📁 Test Organization Pattern</Heading2>

                <Paragraph>
                    Cấu trúc test tốt giúp <Highlight>dễ tìm, dễ maintain</Highlight> — đặc biệt khi project scale lên hàng trăm files.
                </Paragraph>

                <CodeBlock title="test-organization.ts">{`// ═══ Folder Structure — 2 strategies ═══

// Strategy 1: Co-location (khuyên dùng)
// Test nằm cạnh source file
src/
├── utils/
│   ├── formatPrice.ts
│   ├── formatPrice.test.ts      // ✅ Dễ tìm, dễ maintain
│   ├── slugify.ts
│   └── slugify.test.ts
├── components/
│   ├── ProductCard.tsx
│   └── ProductCard.test.tsx
└── hooks/
    ├── useCart.ts
    └── useCart.test.ts

// Strategy 2: __tests__ folder (khi test nhiều)
src/
├── utils/
│   ├── formatPrice.ts
│   └── __tests__/
│       ├── formatPrice.test.ts
│       └── slugify.test.ts
└── components/
    ├── ProductCard.tsx
    └── __tests__/
        └── ProductCard.test.tsx

// ═══ Shared Test Utilities ═══

// test-utils.tsx — Custom render với Providers
import { render, RenderOptions } from '@testing-library/react'
import { ThemeProvider } from '@/context/ThemeContext'
import { CartProvider } from '@/context/CartContext'

function AllProviders({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            <CartProvider>
                {children}
            </CartProvider>
        </ThemeProvider>
    )
}

export function renderWithProviders(
    ui: React.ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>
) {
    return render(ui, { wrapper: AllProviders, ...options })
}

// Dùng trong test:
import { renderWithProviders } from '@/test-utils'
test('renders with theme', () => {
    renderWithProviders(<ProductCard />)
})

// ═══ Test Data Factory ═══

// factories.ts — tạo test data nhất quán
export function createProduct(overrides?: Partial<Product>): Product {
    return {
        id: 'prod-1',
        name: 'Test Product',
        price: 100,
        category: 'electronics',
        inStock: true,
        ...overrides,
    }
}

export function createUser(overrides?: Partial<User>): User {
    return {
        id: \`user-\${Date.now()}\`,
        name: 'Test User',
        email: 'test@example.com',
        role: 'user',
        ...overrides,
    }
}

// Dùng trong test:
test('shows out of stock badge', () => {
    const product = createProduct({ inStock: false })
    render(<ProductCard product={product} />)
    expect(screen.getByText('Hết hàng')).toBeInTheDocument()
})`}</CodeBlock>

                {/* ===== ANTI-PATTERNS ===== */}
                <Heading2>🚫 Anti-patterns — Những sai lầm cần tránh</Heading2>

                <CodeBlock title="anti-patterns.ts">{`// ❌ #1: Test implementation details
test('sets loading state', () => {
    const { result } = renderHook(() => useFetch('/api'))
    expect(result.current.loading).toBe(true)  // Internal state!
})
// ✅ Test what user sees
test('shows spinner while loading', async () => {
    render(<UserList />)
    expect(screen.getByRole('progressbar')).toBeVisible()
    await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'))
})

// ❌ #2: Snapshot abuse — approve all mà không review
test('renders', () => {
    const { container } = render(<ComplexPage />)
    expect(container).toMatchSnapshot()  // 500-line snapshot!
})
// ✅ Dùng inline snapshot hoặc targeted assertions
test('renders header', () => {
    render(<ComplexPage />)
    expect(screen.getByRole('heading')).toHaveTextContent('Dashboard')
})

// ❌ #3: Shared mutable state giữa tests
let cart: Cart
beforeAll(() => { cart = new Cart() })  // shared!
test('add item', () => { cart.add(item1) })
test('has 1 item', () => { expect(cart.items).toHaveLength(1) })  // Depends on test above!
// ✅ Mỗi test tự setup
test('add item', () => {
    const cart = new Cart()  // fresh!
    cart.add(item1)
    expect(cart.items).toHaveLength(1)
})

// ❌ #4: Over-mocking — mock everything
jest.mock('@/utils/formatPrice')  // Tại sao mock pure function?
jest.mock('@/utils/slugify')       // Không cần!
// ✅ Chỉ mock external dependencies (API, DB, third-party)
jest.mock('@/utils/api')  // ✅ API call cần mock
// Pure functions → test trực tiếp, không mock

// ❌ #5: Không clear mocks
test('test A', async () => {
    ;(fetchData as jest.Mock).mockResolvedValue({ data: 'A' })
})
test('test B', async () => {
    // fetchData vẫn mock từ test A! → Unexpected behavior
})
// ✅ Clear mocks trong beforeEach
beforeEach(() => jest.clearAllMocks())

// ❌ #6: Bỏ qua act() warnings
// Warning: An update was not wrapped in act(...)
// → Có side-effect chưa được handle!
// ✅ Dùng findBy* (auto-wrapped) hoặc wrap trong act()
await screen.findByText('Loaded')  // ✅ auto-act

// ❌ #7: Test third-party libraries
test('Ant Design Button renders', () => {
    render(<Button>Click</Button>)  // Test của Ant Design, không phải của bạn!
})
// ✅ Test YOUR component sử dụng Button
test('submit button calls onSubmit', async () => {
    const onSubmit = jest.fn()
    render(<CheckoutForm onSubmit={onSubmit} />)
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }))
    expect(onSubmit).toHaveBeenCalled()
})

// ❌ #8: Quên await async assertions
test('loads data', () => {
    render(<UserList />)
    screen.findByText('Alice')  // Missing await! Test passes without checking!
})
// ✅ Luôn await findBy* và async operations
test('loads data', async () => {
    render(<UserList />)
    expect(await screen.findByText('Alice')).toBeInTheDocument()
})`}</CodeBlock>

                {/* ===== SENIOR TIPS ===== */}
                <Heading2>👨‍💻 Senior-Level Tips</Heading2>

                <CodeBlock title="senior-patterns.ts">{`// 1. ✅ jest.each — parameterized tests (DRY)
test.each([
    ['hello world', 'hello-world'],
    ['Hello World!', 'hello-world'],
    ['  spaces  ', 'spaces'],
    ['', ''],
])('slugify("%s") → "%s"', (input, expected) => {
    expect(slugify(input)).toBe(expected)
})

// Object syntax (dễ đọc hơn)
test.each([
    { price: 1000000, expected: '1.000.000đ' },
    { price: 0, expected: '0đ' },
    { price: 99.5, expected: '99,5đ' },
])('formatPrice($price) → $expected', ({ price, expected }) => {
    expect(formatPrice(price)).toBe(expected)
})

// 2. ✅ MSW — Mock Service Worker (API mocking cấp network)
import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'

const server = setupServer(
    http.get('/api/products', () => {
        return HttpResponse.json([
            { id: 1, name: 'Product A', price: 100 },
        ])
    }),
    http.post('/api/orders', async ({ request }) => {
        const body = await request.json()
        return HttpResponse.json({ orderId: 'order-123', ...body })
    })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('shows products from API', async () => {
    render(<ProductList />)
    expect(await screen.findByText('Product A')).toBeInTheDocument()
})

// Override cho specific test
test('shows error when API fails', async () => {
    server.use(
        http.get('/api/products', () => HttpResponse.error())
    )
    render(<ProductList />)
    expect(await screen.findByText(/error/i)).toBeInTheDocument()
})

// 3. ✅ Accessibility testing với jest-axe
import { axe, toHaveNoViolations } from 'jest-axe'
expect.extend(toHaveNoViolations)

test('form is accessible', async () => {
    const { container } = render(<LoginForm />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
})

// 4. ✅ Custom matchers — domain-specific assertions
expect.extend({
    toBeValidPrice(received: string) {
        const pass = /^\\d{1,3}(\\.\\d{3})*đ$/.test(received)
        return {
            pass,
            message: () =>
                \`Expected "\${received}" to be a valid VND price format\`,
        }
    },
})
expect(formatPrice(1000000)).toBeValidPrice()

// 5. ✅ Performance — chạy test nhanh hơn
// Chỉ chạy tests liên quan đến file thay đổi
npx jest --onlyChanged
npx jest --changedSince=main

// Dừng ngay khi có test fail
npx jest --bail

// Chạy test nặng nhất riêng
npx jest --testPathPattern="heavy" --maxWorkers=1

// 6. ✅ CI/CD Integration
// .github/workflows/test.yml
name: Unit Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npx jest --coverage --ci
      - name: Upload coverage
        uses: actions/upload-artifact@v4
        with:
          name: coverage
          path: coverage/

// 7. ✅ Debugging tests
// Chạy 1 test cụ thể
npx jest -t "adds item to cart"

// Debug mode (Node inspector)
node --inspect-brk node_modules/.bin/jest --runInBand

// Verbose output
npx jest --verbose

// 8. ✅ Test custom hooks with wrapper
const wrapper = ({ children }: { children: React.ReactNode }) => (
    <CartProvider initialItems={[]}>
        {children}
    </CartProvider>
)

test('useCart adds item', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => result.current.addItem({ id: '1', name: 'T-shirt', price: 200 }))
    expect(result.current.items).toHaveLength(1)
    expect(result.current.total).toBe(200)
})`}</CodeBlock>

                {/* ===== COVERAGE & BEST PRACTICES ===== */}
                <Heading2>📊 Coverage & Best Practices</Heading2>

                <CodeBlock title="coverage.sh">{`# Chạy coverage report
npx jest --coverage

# Output:
# ----------------------|---------|----------|---------|---------|
# File                  | % Stmts | % Branch | % Funcs | % Lines |
# ----------------------|---------|----------|---------|---------|
# All files             |   85.71 |    83.33 |      90 |   85.71 |
#  utils.ts             |     100 |      100 |     100 |     100 |
#  ProductList.tsx       |   71.43 |    66.67 |      80 |   71.43 |
# ----------------------|---------|----------|---------|---------|

# Mục tiêu: >= 80% lines & branches
# Tập trung vào business logic, không cần 100%`}</CodeBlock>

                <CodeBlock title="best-practices.ts">{`// 🎯 BEST PRACTICES

// 1. Arrange - Act - Assert (AAA pattern)
test('adds item to cart', () => {
    // Arrange
    const cart = new Cart()
    const product = { id: 1, name: 'Áo', price: 200 }

    // Act
    cart.addItem(product)

    // Assert
    expect(cart.items).toHaveLength(1)
    expect(cart.total).toBe(200)
})

// 2. Test behavior, NOT implementation
// ❌ Bad — test implementation details
test('sets state correctly', () => {
    const { result } = renderHook(() => useCounter())
    expect(result.current.count).toBe(0) // testing internal state
})

// ✅ Good — test what user sees
test('displays count and can increment', async () => {
    render(<Counter />)
    expect(screen.getByText('Count: 0')).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: '+' }))
    expect(screen.getByText('Count: 1')).toBeInTheDocument()
})

// 3. Tên test descriptive
// ❌ test('test 1')
// ✅ test('returns empty array when input is empty')
// ✅ test('throws error when user is not authenticated')

// 4. Mỗi test chỉ test 1 thing
// ❌ 1 test kiểm tra add + remove + update
// ✅ 3 tests riêng biệt

// 5. Không test third-party code
// ❌ test Ant Design's Button renders correctly
// ✅ test your component uses Button with correct props

// 6. Test edge cases
test('handles empty input', () => { })
test('handles null/undefined', () => { })
test('handles very long strings', () => { })
test('handles negative numbers', () => { })
test('handles concurrent calls', () => { })

// 7. Dùng describe blocks để tổ chức
describe('CartService', () => {
    describe('addItem', () => {
        it('adds new item', () => { })
        it('increments quantity if item exists', () => { })
        it('throws if item is invalid', () => { })
    })

    describe('removeItem', () => {
        it('removes item by id', () => { })
        it('returns false if item not found', () => { })
    })
})

// 8. beforeEach/afterEach cho setup/cleanup
describe('UserService', () => {
    let db: MockDB

    beforeEach(() => {
        db = new MockDB()
        jest.clearAllMocks()
    })

    afterEach(() => {
        db.close()
    })
})

// 9. Snapshot testing — cẩn thận khi dùng
test('renders correctly', () => {
    const { container } = render(<ProductCard name="Áo" price={200} />)
    expect(container.firstChild).toMatchSnapshot()
    // ⚠️ Dễ bị "approve all" mà không review
    // → Chỉ dùng cho component ít thay đổi
})

// 10. Testing error boundaries
test('displays fallback UI on error', () => {
    const ThrowError = () => { throw new Error('Test') }
    const spy = jest.spyOn(console, 'error').mockImplementation()

    render(
        <ErrorBoundary fallback={<div>Error!</div>}>
            <ThrowError />
        </ErrorBoundary>
    )

    expect(screen.getByText('Error!')).toBeInTheDocument()
    spy.mockRestore()
})`}</CodeBlock>

                <Heading2>📋 Cheat Sheet</Heading2>

                <CodeBlock title="cheat-sheet.ts">{`// === Jest ===
// describe('group', () => { })     — nhóm tests
// test('name', () => { })          — 1 test case
// expect(x).toBe(y)               — ===
// expect(x).toEqual(y)            — deep equal
// expect(fn).toHaveBeenCalled()   — fn đã được gọi
// jest.fn()                        — mock function
// jest.mock('module')              — mock module
// jest.spyOn(obj, 'method')       — spy method
// jest.useFakeTimers()             — fake timers

// === React Testing Library ===
// render(<Comp />)                 — render component
// screen.getByRole('button')      — tìm element
// screen.queryByText('x')         — null nếu không có
// await screen.findByText('x')    — chờ element
// userEvent.setup()                — setup user events
// await user.click(el)            — click
// await user.type(input, 'text')  — type text
// expect(el).toBeInTheDocument()  — kiểm tra tồn tại

// === File patterns ===
// __tests__/file.test.ts           — test file
// __mocks__/module.ts              — manual mock
// jest.config.ts                   — cấu hình
// jest.setup.ts                    — setup (jest-dom)`}</CodeBlock>

                <Callout type="tip">
                    <strong>Quy tắc vàng:</strong> Test nên dễ đọc hơn code chính. Nếu test khó hiểu, hãy refactor test trước.
                    Focus vào <strong>happy path + edge cases</strong>, không cần test mọi thứ.
                </Callout>
            </>
        ),
        en: (
            <>
                <Paragraph>
                    Unit tests help keep code stable, easy to refactor, and <Highlight>catch bugs early</Highlight> before production.
                    This guide covers everything from setup to practical testing with Jest and React Testing Library.
                </Paragraph>

                <Callout type="info">
                    Jest is the most popular test framework for JavaScript/TypeScript. React Testing Library (RTL)
                    tests components the way users actually interact with them.
                </Callout>

                {/* ===== SETUP ===== */}
                <Heading2>⚙️ Setup Jest + TypeScript</Heading2>

                <CodeBlock title="terminal">{`# Next.js (built-in Jest support)
npm install -D jest @jest/types ts-jest @types/jest
npm install -D @testing-library/react @testing-library/jest-dom
npm install -D @testing-library/user-event

# jest.config.ts
import type { Config } from 'jest'
import nextJest from 'next/jest'

const createJestConfig = nextJest({ dir: './' })

const config: Config = {
    testEnvironment: 'jsdom',
    setupFilesAfterSetup: ['<rootDir>/jest.setup.ts'],
    moduleNameMapper: { '^@/(.*)$': '<rootDir>/src/$1' },
    coverageThreshold: {
        global: { branches: 80, functions: 80, lines: 80, statements: 80 },
    },
}

export default createJestConfig(config)

# File structure
# src/utils/__tests__/helper.test.ts
# src/components/__tests__/Button.test.tsx`}</CodeBlock>

                {/* ===== BASIC JEST ===== */}
                <Heading2>📝 Jest Basics — Matchers &amp; Assertions</Heading2>

                <CodeBlock title="matchers.test.ts">{`describe('Math Utils', () => {
    test('adds two numbers', () => {
        expect(add(1, 2)).toBe(3)  // exact equality (===)
    })
})

// === Common Matchers ===
expect(value).toBe(3)                  // ===
expect(obj).toEqual({ a: 1 })          // deep equality
expect(value).toBeTruthy()             // truthy
expect(value).toBeNull()               // null
expect(value).toBeGreaterThan(3)       // >
expect(value).toBeCloseTo(0.3, 5)     // floating point
expect(str).toMatch(/regex/)           // regex
expect(arr).toContain('item')          // array contains
expect(arr).toHaveLength(3)            // length
expect(obj).toHaveProperty('name')     // property exists
expect(obj).toMatchObject({ name: 'K' })  // partial match
expect(() => fn()).toThrow('message')  // throws
expect(value).not.toBe(5)             // negation`}</CodeBlock>

                {/* ===== ASYNC ===== */}
                <Heading2>⏳ Testing Async Code</Heading2>

                <CodeBlock title="async.test.ts">{`// async/await (recommended)
test('fetches user data', async () => {
    const user = await fetchUser(1)
    expect(user.name).toBe('Khuong')
})

// .resolves / .rejects
await expect(fetchUser(1)).resolves.toEqual({ name: 'Khuong' })
await expect(fetchUser(-1)).rejects.toThrow('Not found')

// Fake timers
jest.useFakeTimers()

test('debounce calls after delay', () => {
    const fn = jest.fn()
    const debounced = debounce(fn, 300)
    debounced()
    expect(fn).not.toHaveBeenCalled()
    jest.advanceTimersByTime(300)
    expect(fn).toHaveBeenCalledTimes(1)
})`}</CodeBlock>

                {/* ===== MOCKING ===== */}
                <Heading2>🎭 Mocking — Isolating Dependencies</Heading2>

                <CodeBlock title="mocking.test.ts">{`// jest.fn() — mock function
const mockFn = jest.fn()
    .mockReturnValue(1)
    .mockResolvedValue({ id: 1 })

expect(mockFn).toHaveBeenCalled()
expect(mockFn).toHaveBeenCalledWith('arg')
expect(mockFn).toHaveBeenCalledTimes(2)

// jest.mock() — mock entire module
jest.mock('@/utils/api')
import { fetchProducts } from '@/utils/api'
;(fetchProducts as jest.Mock).mockResolvedValue([{ id: 1, name: 'A' }])

// jest.spyOn() — spy on existing method
const spy = jest.spyOn(console, 'error').mockImplementation()
// ... test ...
spy.mockRestore()

// Mock Next.js modules
jest.mock('next/navigation', () => ({
    useRouter: () => ({ push: jest.fn(), back: jest.fn() }),
    usePathname: () => '/products',
}))

// Partial mock
jest.mock('@/utils/helpers', () => ({
    ...jest.requireActual('@/utils/helpers'),
    fetchData: jest.fn(), // only mock fetchData
}))

// Reset mocks
beforeEach(() => jest.clearAllMocks())`}</CodeBlock>

                {/* ===== REACT TESTING ===== */}
                <Heading2>⚛️ Testing React Components</Heading2>

                <Paragraph>
                    React Testing Library tests by <Highlight>user behavior</Highlight>, not implementation details.
                    Principle: if the user can&#39;t see or interact with it, don&#39;t test it.
                </Paragraph>

                <CodeBlock title="component.test.tsx">{`import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// Simple component
function Greeting({ name }: { name: string }) {
    return <h1>Hello, {name}!</h1>
}

test('renders greeting', () => {
    render(<Greeting name="Khuong" />)
    expect(screen.getByText('Hello, Khuong!')).toBeInTheDocument()
})

// === Queries — finding elements ===

// getBy* — throws if not found (use when element is expected)
screen.getByText('Hello')              // text content
screen.getByRole('button', { name: 'Submit' })  // ARIA role
screen.getByLabelText('Email')         // form label
screen.getByPlaceholderText('Search')  // placeholder
screen.getByTestId('custom-id')        // data-testid (last resort)
screen.getByAltText('Logo')           // img alt
screen.getByDisplayValue('current value') // input value

// queryBy* — returns null if not found (test absence)
expect(screen.queryByText('Error')).not.toBeInTheDocument()

// findBy* — async, waits for element to appear (for async render)
const element = await screen.findByText('Loaded data')

// getAllBy*, queryAllBy*, findAllBy* — return array

// 🎯 Query priority (per RTL docs):
// 1. getByRole
// 2. getByLabelText
// 3. getByPlaceholderText
// 4. getByText
// 5. getByDisplayValue
// 6. getByAltText
// 7. getByTitle
// 8. getByTestId (last resort)`}</CodeBlock>

                <CodeBlock title="interaction.test.tsx">{`import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// === User Events ===
test('form interaction', async () => {
    const user = userEvent.setup()
    const onSubmit = jest.fn()

    render(<LoginForm onSubmit={onSubmit} />)

    // Type into input
    const emailInput = screen.getByLabelText('Email')
    await user.type(emailInput, 'test@mail.com')
    expect(emailInput).toHaveValue('test@mail.com')

    // Clear & type
    await user.clear(emailInput)
    await user.type(emailInput, 'new@mail.com')

    // Click button
    const submitBtn = screen.getByRole('button', { name: /submit/i })
    await user.click(submitBtn)
    expect(onSubmit).toHaveBeenCalledTimes(1)

    // Double click, right click
    await user.dblClick(element)

    // Keyboard
    await user.keyboard('{Enter}')
    await user.keyboard('{Tab}')

    // Select option
    const select = screen.getByRole('combobox')
    await user.selectOptions(select, 'option-value')

    // Checkbox / Radio
    const checkbox = screen.getByRole('checkbox')
    await user.click(checkbox)
    expect(checkbox).toBeChecked()

    // Hover
    await user.hover(element)
    await user.unhover(element)
})

// === DOM Matchers (jest-dom) ===
expect(element).toBeInTheDocument()
expect(element).toBeVisible()
expect(element).toBeEnabled()
expect(element).toBeDisabled()
expect(element).toBeChecked()
expect(element).toHaveClass('active')
expect(element).toHaveStyle({ color: 'red' })
expect(element).toHaveAttribute('href', '/home')
expect(element).toHaveTextContent('Hello')
expect(element).toHaveFocus()
expect(form).toHaveFormValues({ email: 'test@mail.com' })`}</CodeBlock>

                <CodeBlock title="async-component.test.tsx">{`// Test component with async data
function UserList() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchUsers().then(data => {
            setUsers(data)
            setLoading(false)
        })
    }, [])

    if (loading) return <div>Loading...</div>
    return (
        <ul>
            {users.map(u => <li key={u.id}>{u.name}</li>)}
        </ul>
    )
}

// Test
jest.mock('./api')

test('loads and displays users', async () => {
    ;(fetchUsers as jest.Mock).mockResolvedValue([
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
    ])

    render(<UserList />)

    // Loading state
    expect(screen.getByText('Loading...')).toBeInTheDocument()

    // Wait for data
    expect(await screen.findByText('Alice')).toBeInTheDocument()
    expect(screen.getByText('Bob')).toBeInTheDocument()
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
})

test('handles error state', async () => {
    ;(fetchUsers as jest.Mock).mockRejectedValue(new Error('Network error'))

    render(<UserList />)

    expect(await screen.findByText(/error/i)).toBeInTheDocument()
})`}</CodeBlock>

                {/* ===== TESTING HOOKS ===== */}
                <Heading2>🪝 Testing Custom Hooks</Heading2>

                <CodeBlock title="hooks.test.ts">{`import { renderHook, act } from '@testing-library/react'

// Custom hook
function useCounter(initial = 0) {
    const [count, setCount] = useState(initial)
    const increment = () => setCount(c => c + 1)
    const decrement = () => setCount(c => c - 1)
    const reset = () => setCount(initial)
    return { count, increment, decrement, reset }
}

// Test
describe('useCounter', () => {
    it('starts with initial value', () => {
        const { result } = renderHook(() => useCounter(10))
        expect(result.current.count).toBe(10)
    })

    it('defaults to 0', () => {
        const { result } = renderHook(() => useCounter())
        expect(result.current.count).toBe(0)
    })

    it('increments counter', () => {
        const { result } = renderHook(() => useCounter())

        act(() => {
            result.current.increment()
        })

        expect(result.current.count).toBe(1)
    })

    it('decrements counter', () => {
        const { result } = renderHook(() => useCounter(5))

        act(() => {
            result.current.decrement()
            result.current.decrement()
        })

        expect(result.current.count).toBe(3)
    })

    it('resets to initial value', () => {
        const { result } = renderHook(() => useCounter(10))

        act(() => {
            result.current.increment()
            result.current.increment()
            result.current.reset()
        })

        expect(result.current.count).toBe(10)
    })
})

// Hook with dependencies (rerender test)
function useDebounce<T>(value: T, delay: number): T {
    const [debounced, setDebounced] = useState(value)
    useEffect(() => {
        const timer = setTimeout(() => setDebounced(value), delay)
        return () => clearTimeout(timer)
    }, [value, delay])
    return debounced
}

describe('useDebounce', () => {
    beforeEach(() => jest.useFakeTimers())
    afterEach(() => jest.useRealTimers())

    it('returns initial value immediately', () => {
        const { result } = renderHook(() => useDebounce('hello', 300))
        expect(result.current).toBe('hello')
    })

    it('updates value after delay', () => {
        const { result, rerender } = renderHook(
            ({ value, delay }) => useDebounce(value, delay),
            { initialProps: { value: 'hello', delay: 300 } }
        )

        rerender({ value: 'world', delay: 300 })
        expect(result.current).toBe('hello') // not yet

        act(() => jest.advanceTimersByTime(300))
        expect(result.current).toBe('world') // updated!
    })
})`}</CodeBlock>

                {/* ===== TESTING API ROUTES ===== */}
                <Heading2>🌐 Testing API Routes (Next.js)</Heading2>

                <CodeBlock title="api-route.test.ts">{`import { NextRequest } from 'next/server'
import { GET, POST, DELETE } from '@/app/api/products/route'

// Mock database
jest.mock('@/utils/connectDb', () => ({
    __esModule: true,
    default: jest.fn(),
}))

jest.mock('@/models/Product', () => {
    const mockModel = {
        find: jest.fn(),
        findById: jest.fn(),
        create: jest.fn(),
        findByIdAndUpdate: jest.fn(),
        findByIdAndDelete: jest.fn(),
    }
    return { __esModule: true, default: mockModel }
})

import ProductModel from '@/models/Product'
const mockProduct = ProductModel as jest.Mocked<typeof ProductModel>

describe('GET /api/products', () => {
    beforeEach(() => jest.clearAllMocks())

    it('returns all products', async () => {
        const products = [
            { _id: '1', name: 'Product A', price: 100 },
            { _id: '2', name: 'Product B', price: 200 },
        ]
        mockProduct.find.mockReturnValue({
            sort: jest.fn().mockResolvedValue(products),
        } as any)

        const response = await GET()
        const data = await response.json()

        expect(data.success).toBe(true)
        expect(data.data).toHaveLength(2)
        expect(data.data[0].name).toBe('Product A')
    })

    it('handles database error', async () => {
        mockProduct.find.mockReturnValue({
            sort: jest.fn().mockRejectedValue(new Error('DB Error')),
        } as any)

        const response = await GET()
        const data = await response.json()

        expect(response.status).toBe(500)
        expect(data.success).toBe(false)
    })
})

describe('POST /api/products', () => {
    it('creates a product', async () => {
        const newProduct = { _id: '3', name: 'Product C', price: 300 }
        mockProduct.create.mockResolvedValue(newProduct as any)

        const request = new NextRequest('http://localhost/api/products', {
            method: 'POST',
            body: JSON.stringify({ name: 'Product C', price: 300 }),
        })

        const response = await POST(request)
        const data = await response.json()

        expect(data.success).toBe(true)
        expect(data.data.name).toBe('Product C')
        expect(mockProduct.create).toHaveBeenCalledWith(
            expect.objectContaining({ name: 'Product C', price: 300 })
        )
    })

    it('validates required fields', async () => {
        const request = new NextRequest('http://localhost/api/products', {
            method: 'POST',
            body: JSON.stringify({}),
        })

        const response = await POST(request)
        expect(response.status).toBe(400)
    })
})`}</CodeBlock>

                {/* ===== TEST ORGANIZATION ===== */}
                <Heading2>📁 Test Organization Pattern</Heading2>

                <Paragraph>
                    A good test structure makes tests <Highlight>easy to find and maintain</Highlight> — especially as projects scale to hundreds of files.
                </Paragraph>

                <CodeBlock title="test-organization.ts">{`// ═══ Folder Structure — 2 strategies ═══

// Strategy 1: Co-location (recommended)
// Tests live next to source files
src/
├── utils/
│   ├── formatPrice.ts
│   ├── formatPrice.test.ts      // ✅ Easy to find, easy to maintain
│   ├── slugify.ts
│   └── slugify.test.ts
├── components/
│   ├── ProductCard.tsx
│   └── ProductCard.test.tsx
└── hooks/
    ├── useCart.ts
    └── useCart.test.ts

// Strategy 2: __tests__ folder (for more tests)
src/
├── utils/
│   ├── formatPrice.ts
│   └── __tests__/
│       ├── formatPrice.test.ts
│       └── slugify.test.ts
└── components/
    ├── ProductCard.tsx
    └── __tests__/
        └── ProductCard.test.tsx

// ═══ Shared Test Utilities ═══

// test-utils.tsx — Custom render with Providers
import { render, RenderOptions } from '@testing-library/react'
import { ThemeProvider } from '@/context/ThemeContext'
import { CartProvider } from '@/context/CartContext'

function AllProviders({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            <CartProvider>
                {children}
            </CartProvider>
        </ThemeProvider>
    )
}

export function renderWithProviders(
    ui: React.ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>
) {
    return render(ui, { wrapper: AllProviders, ...options })
}

// Usage in test:
import { renderWithProviders } from '@/test-utils'
test('renders with theme', () => {
    renderWithProviders(<ProductCard />)
})

// ═══ Test Data Factory ═══

// factories.ts — consistent test data
export function createProduct(overrides?: Partial<Product>): Product {
    return {
        id: 'prod-1',
        name: 'Test Product',
        price: 100,
        category: 'electronics',
        inStock: true,
        ...overrides,
    }
}

export function createUser(overrides?: Partial<User>): User {
    return {
        id: \`user-\${Date.now()}\`,
        name: 'Test User',
        email: 'test@example.com',
        role: 'user',
        ...overrides,
    }
}

// Usage in test:
test('shows out of stock badge', () => {
    const product = createProduct({ inStock: false })
    render(<ProductCard product={product} />)
    expect(screen.getByText('Out of stock')).toBeInTheDocument()
})`}</CodeBlock>

                {/* ===== ANTI-PATTERNS ===== */}
                <Heading2>🚫 Anti-patterns — Common Mistakes to Avoid</Heading2>

                <CodeBlock title="anti-patterns.ts">{`// ❌ #1: Testing implementation details
test('sets loading state', () => {
    const { result } = renderHook(() => useFetch('/api'))
    expect(result.current.loading).toBe(true)  // Internal state!
})
// ✅ Test what user sees
test('shows spinner while loading', async () => {
    render(<UserList />)
    expect(screen.getByRole('progressbar')).toBeVisible()
    await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'))
})

// ❌ #2: Snapshot abuse — approving all without review
test('renders', () => {
    const { container } = render(<ComplexPage />)
    expect(container).toMatchSnapshot()  // 500-line snapshot!
})
// ✅ Use inline snapshot or targeted assertions
test('renders header', () => {
    render(<ComplexPage />)
    expect(screen.getByRole('heading')).toHaveTextContent('Dashboard')
})

// ❌ #3: Shared mutable state between tests
let cart: Cart
beforeAll(() => { cart = new Cart() })  // shared!
test('add item', () => { cart.add(item1) })
test('has 1 item', () => { expect(cart.items).toHaveLength(1) })  // Depends on test above!
// ✅ Each test creates its own state
test('add item', () => {
    const cart = new Cart()  // fresh!
    cart.add(item1)
    expect(cart.items).toHaveLength(1)
})

// ❌ #4: Over-mocking — mock everything syndrome
jest.mock('@/utils/formatPrice')  // Why mock a pure function?
jest.mock('@/utils/slugify')       // Not needed!
// ✅ Only mock external dependencies (API, DB, third-party)
jest.mock('@/utils/api')  // ✅ API calls need mocking
// Pure functions → test directly, don't mock

// ❌ #5: Not clearing mocks
test('test A', async () => {
    ;(fetchData as jest.Mock).mockResolvedValue({ data: 'A' })
})
test('test B', async () => {
    // fetchData still mocked from test A! → Unexpected behavior
})
// ✅ Clear mocks in beforeEach
beforeEach(() => jest.clearAllMocks())

// ❌ #6: Ignoring act() warnings
// Warning: An update was not wrapped in act(...)
// → There's an unhandled side-effect!
// ✅ Use findBy* (auto-wrapped) or wrap in act()
await screen.findByText('Loaded')  // ✅ auto-act

// ❌ #7: Testing third-party libraries
test('Ant Design Button renders', () => {
    render(<Button>Click</Button>)  // Ant Design's responsibility, not yours!
})
// ✅ Test YOUR component that uses Button
test('submit button calls onSubmit', async () => {
    const onSubmit = jest.fn()
    render(<CheckoutForm onSubmit={onSubmit} />)
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }))
    expect(onSubmit).toHaveBeenCalled()
})

// ❌ #8: Forgetting to await async assertions
test('loads data', () => {
    render(<UserList />)
    screen.findByText('Alice')  // Missing await! Test passes without checking!
})
// ✅ Always await findBy* and async operations
test('loads data', async () => {
    render(<UserList />)
    expect(await screen.findByText('Alice')).toBeInTheDocument()
})`}</CodeBlock>

                {/* ===== SENIOR TIPS ===== */}
                <Heading2>👨‍💻 Senior-Level Tips</Heading2>

                <CodeBlock title="senior-patterns.ts">{`// 1. ✅ jest.each — parameterized tests (DRY)
test.each([
    ['hello world', 'hello-world'],
    ['Hello World!', 'hello-world'],
    ['  spaces  ', 'spaces'],
    ['', ''],
])('slugify("%s") → "%s"', (input, expected) => {
    expect(slugify(input)).toBe(expected)
})

// Object syntax (more readable)
test.each([
    { price: 1000000, expected: '1.000.000đ' },
    { price: 0, expected: '0đ' },
    { price: 99.5, expected: '99,5đ' },
])('formatPrice($price) → $expected', ({ price, expected }) => {
    expect(formatPrice(price)).toBe(expected)
})

// 2. ✅ MSW — Mock Service Worker (network-level API mocking)
import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'

const server = setupServer(
    http.get('/api/products', () => {
        return HttpResponse.json([
            { id: 1, name: 'Product A', price: 100 },
        ])
    }),
    http.post('/api/orders', async ({ request }) => {
        const body = await request.json()
        return HttpResponse.json({ orderId: 'order-123', ...body })
    })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('shows products from API', async () => {
    render(<ProductList />)
    expect(await screen.findByText('Product A')).toBeInTheDocument()
})

// Override for specific test
test('shows error when API fails', async () => {
    server.use(
        http.get('/api/products', () => HttpResponse.error())
    )
    render(<ProductList />)
    expect(await screen.findByText(/error/i)).toBeInTheDocument()
})

// 3. ✅ Accessibility testing with jest-axe
import { axe, toHaveNoViolations } from 'jest-axe'
expect.extend(toHaveNoViolations)

test('form is accessible', async () => {
    const { container } = render(<LoginForm />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
})

// 4. ✅ Custom matchers — domain-specific assertions
expect.extend({
    toBeValidPrice(received: string) {
        const pass = /^\\d{1,3}(\\.\\d{3})*đ$/.test(received)
        return {
            pass,
            message: () =>
                \`Expected "\${received}" to be a valid VND price format\`,
        }
    },
})
expect(formatPrice(1000000)).toBeValidPrice()

// 5. ✅ Performance — run tests faster
// Only run tests related to changed files
npx jest --onlyChanged
npx jest --changedSince=main

// Stop on first failure
npx jest --bail

// Run heavy tests separately
npx jest --testPathPattern="heavy" --maxWorkers=1

// 6. ✅ CI/CD Integration
// .github/workflows/test.yml
name: Unit Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npx jest --coverage --ci
      - name: Upload coverage
        uses: actions/upload-artifact@v4
        with:
          name: coverage
          path: coverage/

// 7. ✅ Debugging tests
// Run a specific test
npx jest -t "adds item to cart"

// Debug mode (Node inspector)
node --inspect-brk node_modules/.bin/jest --runInBand

// Verbose output
npx jest --verbose

// 8. ✅ Test custom hooks with wrapper
const wrapper = ({ children }: { children: React.ReactNode }) => (
    <CartProvider initialItems={[]}>
        {children}
    </CartProvider>
)

test('useCart adds item', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => result.current.addItem({ id: '1', name: 'T-shirt', price: 200 }))
    expect(result.current.items).toHaveLength(1)
    expect(result.current.total).toBe(200)
})`}</CodeBlock>

                {/* ===== COVERAGE & BEST PRACTICES ===== */}
                <Heading2>📊 Coverage &amp; Best Practices</Heading2>

                <CodeBlock title="coverage.sh">{`# Run coverage report
npx jest --coverage

# Output:
# ----------------------|---------|----------|---------|---------
# File                  | % Stmts | % Branch | % Funcs | % Lines
# ----------------------|---------|----------|---------|---------
# All files             |   85.71 |    83.33 |      90 |   85.71
#  utils.ts             |     100 |      100 |     100 |     100
#  ProductList.tsx       |   71.43 |    66.67 |      80 |   71.43
# ----------------------|---------|----------|---------|---------

# Target: >= 80% lines & branches
# Focus on business logic, don't need 100%`}</CodeBlock>

                <CodeBlock title="best-practices.ts">{`// 🎯 BEST PRACTICES

// 1. Arrange - Act - Assert (AAA pattern)
test('adds item to cart', () => {
    // Arrange
    const cart = new Cart()
    const product = { id: 1, name: 'Shirt', price: 200 }

    // Act
    cart.addItem(product)

    // Assert
    expect(cart.items).toHaveLength(1)
    expect(cart.total).toBe(200)
})

// 2. Test behavior, NOT implementation
// ❌ Bad — test implementation details
test('sets state correctly', () => {
    const { result } = renderHook(() => useCounter())
    expect(result.current.count).toBe(0) // testing internal state
})

// ✅ Good — test what user sees
test('displays count and can increment', async () => {
    render(<Counter />)
    expect(screen.getByText('Count: 0')).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: '+' }))
    expect(screen.getByText('Count: 1')).toBeInTheDocument()
})

// 3. Descriptive test names
// ❌ test('test 1')
// ✅ test('returns empty array when input is empty')
// ✅ test('throws error when user is not authenticated')

// 4. One test per behavior
// ❌ 1 test checking add + remove + update
// ✅ 3 separate tests

// 5. Don't test third-party code
// ❌ test Ant Design's Button renders correctly
// ✅ test your component uses Button with correct props

// 6. Test edge cases
test('handles empty input', () => { })
test('handles null/undefined', () => { })
test('handles very long strings', () => { })
test('handles negative numbers', () => { })
test('handles concurrent calls', () => { })

// 7. Use describe blocks to organize
describe('CartService', () => {
    describe('addItem', () => {
        it('adds new item', () => { })
        it('increments quantity if item exists', () => { })
        it('throws if item is invalid', () => { })
    })

    describe('removeItem', () => {
        it('removes item by id', () => { })
        it('returns false if item not found', () => { })
    })
})

// 8. beforeEach/afterEach for setup/cleanup
describe('UserService', () => {
    let db: MockDB

    beforeEach(() => {
        db = new MockDB()
        jest.clearAllMocks()
    })

    afterEach(() => {
        db.close()
    })
})

// 9. Snapshot testing — use with caution
test('renders correctly', () => {
    const { container } = render(<ProductCard name="Shirt" price={200} />)
    expect(container.firstChild).toMatchSnapshot()
    // ⚠️ Easy to "approve all" without reviewing
    // → Only use for components that rarely change
})

// 10. Testing error boundaries
test('displays fallback UI on error', () => {
    const ThrowError = () => { throw new Error('Test') }
    const spy = jest.spyOn(console, 'error').mockImplementation()

    render(
        <ErrorBoundary fallback={<div>Error!</div>}>
            <ThrowError />
        </ErrorBoundary>
    )

    expect(screen.getByText('Error!')).toBeInTheDocument()
    spy.mockRestore()
})`}</CodeBlock>

                <Heading2>📋 Cheat Sheet</Heading2>

                <CodeBlock title="cheat-sheet.ts">{`// === Jest ===
// describe('group', () => { })     — group tests
// test('name', () => { })          — 1 test case
// expect(x).toBe(y)               — ===
// expect(x).toEqual(y)            — deep equal
// expect(fn).toHaveBeenCalled()   — function was called
// jest.fn()                        — mock function
// jest.mock('module')              — mock module
// jest.spyOn(obj, 'method')       — spy on method
// jest.useFakeTimers()             — fake timers

// === React Testing Library ===
// render(<Comp />)                 — render component
// screen.getByRole('button')      — find element
// screen.queryByText('x')         — null if not found
// await screen.findByText('x')    — wait for element
// userEvent.setup()                — setup user events
// await user.click(el)            — click
// await user.type(input, 'text')  — type text
// expect(el).toBeInTheDocument()  — check existence

// === File patterns ===
// __tests__/file.test.ts           — test file
// __mocks__/module.ts              — manual mock
// jest.config.ts                   — configuration
// jest.setup.ts                    — setup (jest-dom)`}</CodeBlock>

                <Callout type="tip">
                    <strong>Golden rule:</strong> Tests should be easier to read than the code they test. If tests are hard to understand, refactor the tests first.
                    Focus on <strong>happy path + edge cases</strong>, don&#39;t test everything.
                </Callout>
            </>
        ),
    },
}

export default unitTestingGuide
