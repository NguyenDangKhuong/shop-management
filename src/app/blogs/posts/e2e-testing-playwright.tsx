import { Callout, CodeBlock, Heading2, Highlight, Paragraph } from '../components/BlogComponents'
import { BlogPost } from '../types'

const e2eTestingPlaywright: BlogPost = {
    slug: 'e2e-testing-playwright',
    title: {
        vi: 'E2E Testing với Playwright — Patterns & Best Practices cấp Senior',
        en: 'E2E Testing with Playwright — Senior-Level Patterns & Best Practices',
    },
    description: {
        vi: 'Hướng dẫn chi tiết viết E2E test chuyên nghiệp: Page Object Model, Auth State, Fixtures, Selector Strategy, Visual Regression, CI/CD và những anti-patterns cần tránh.',
        en: 'Comprehensive guide to professional E2E testing: Page Object Model, Auth State, Fixtures, Selector Strategy, Visual Regression, CI/CD and anti-patterns to avoid.',
    },
    date: '2025-06-01',
    tags: ['Testing', 'Playwright', 'E2E', 'Best Practices', 'CI/CD'],
    emoji: '🎭',
    color: '#2D8C3C',
    sections: [
        { id: 'setup', title: { vi: '⚙️ Setup & Config', en: '⚙️ Setup & Config' } },
        { id: 'pom', title: { vi: '🏗️ Page Object Model', en: '🏗️ Page Object Model' } },
        { id: 'auth', title: { vi: '🔐 Auth State Reuse', en: '🔐 Auth State Reuse' } },
        { id: 'fixtures', title: { vi: '🏭 Test Fixtures', en: '🏭 Test Fixtures' } },
        { id: 'selectors', title: { vi: '🎯 Selector Strategy', en: '🎯 Selector Strategy' } },
        { id: 'aaa', title: { vi: '🔀 AAA Pattern', en: '🔀 AAA Pattern' } },
        { id: 'api-setup', title: { vi: '🌐 API Setup Pattern', en: '🌐 API Setup Pattern' } },
        { id: 'wait', title: { vi: '🔄 Retry & Wait', en: '🔄 Retry & Wait' } },
        { id: 'visual', title: { vi: '📊 Visual Regression', en: '📊 Visual Regression' } },
        { id: 'network', title: { vi: '📡 Network Interception', en: '📡 Network Interception' } },
        { id: 'ci', title: { vi: '🚀 CI/CD Integration', en: '🚀 CI/CD Integration' } },
        { id: 'anti-patterns', title: { vi: '🚫 Anti-patterns', en: '🚫 Anti-patterns' } },
        { id: 'senior-tips', title: { vi: '👨‍💻 Senior Tips', en: '👨‍💻 Senior Tips' } },
        { id: 'cheatsheet', title: { vi: '📋 Cheat Sheet', en: '📋 Cheat Sheet' } },
    ],
    content: {
        vi: (
            <>
                <Paragraph>
                    Playwright là framework E2E testing hiện đại nhất hiện nay — <Highlight>nhanh hơn Cypress</Highlight>,
                    hỗ trợ multi-browser, auto-wait, và tracing cực mạnh. Bài viết này
                    tổng hợp tất cả patterns và best practices cần biết để viết E2E test như một Senior.
                </Paragraph>

                <Callout type="info">
                    <strong>Playwright vs Cypress:</strong> Playwright nhanh hơn ~40%, hỗ trợ multi-tab/multi-browser,
                    có auto-wait tốt hơn, và chạy test song song out-of-the-box. Cypress thân thiện hơn cho người mới
                    nhưng bị giới hạn single-tab và chỉ chạy trên Chromium (có plugin cho Firefox).
                </Callout>

                {/* ===== SETUP ===== */}
                <Heading2>⚙️ Setup & Config</Heading2>

                <CodeBlock title="terminal">{`# Cài đặt Playwright
npm init playwright@latest

# Hoặc thêm vào project hiện có
npm install -D @playwright/test
npx playwright install  # download browsers (Chromium, Firefox, WebKit)

# Chạy tests
npx playwright test               # headless
npx playwright test --headed       # mở browser
npx playwright test --ui           # interactive UI mode
npx playwright test --debug        # step-by-step debugger
npx playwright test --trace on     # ghi trace`}</CodeBlock>

                <CodeBlock title="playwright.config.ts">{`import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
    testDir: './e2e',
    timeout: 30_000,
    retries: process.env.CI ? 2 : 0,  // Retry trên CI
    workers: process.env.CI ? 1 : undefined,
    reporter: [
        ['html', { open: 'never' }],
        ['json', { outputFile: 'test-results.json' }],
    ],
    use: {
        baseURL: 'http://localhost:3000',
        trace: 'on-first-retry',      // Trace khi retry
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
    },
    projects: [
        // Auth setup — chạy trước tất cả
        { name: 'setup', testMatch: /.*\\.setup\\.ts/ },

        // Browsers
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
            dependencies: ['setup'],
        },
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
            dependencies: ['setup'],
        },
        {
            name: 'mobile',
            use: { ...devices['iPhone 14'] },
            dependencies: ['setup'],
        },
    ],

    // Dev server — tự start trước khi test
    webServer: {
        command: 'npm run dev',
        url: 'http://localhost:3000',
        reuseExistingServer: !process.env.CI,
    },
})`}</CodeBlock>

                <CodeBlock title="folder-structure">{`e2e/
├── fixtures/
│   ├── base.ts             # Extended test với custom fixtures
│   └── test-data.ts        # Factory functions
├── pages/
│   ├── login.page.ts       # Page Object: Login
│   ├── dashboard.page.ts   # Page Object: Dashboard
│   └── checkout.page.ts    # Page Object: Checkout
├── specs/
│   ├── auth.spec.ts
│   ├── dashboard.spec.ts
│   ├── checkout.spec.ts
│   └── smoke.spec.ts       # Quick smoke tests (@smoke tag)
├── auth.setup.ts           # Login 1 lần, lưu session
└── .auth/
    └── user.json           # Auto-generated (gitignore)`}</CodeBlock>

                {/* ===== PAGE OBJECT MODEL ===== */}
                <Heading2>🏗️ Page Object Model (POM)</Heading2>

                <Paragraph>
                    Pattern <Highlight>quan trọng nhất</Highlight> — tách locator và action ra khỏi test logic.
                    UI thay đổi → sửa 1 chỗ (Page Object), không phải sửa 20 tests.
                </Paragraph>

                <CodeBlock title="pages/login.page.ts">{`import { Page, Locator, expect } from '@playwright/test'

export class LoginPage {
    // Locators — lazy, chỉ query khi cần
    readonly emailInput: Locator
    readonly passwordInput: Locator
    readonly submitButton: Locator
    readonly errorMessage: Locator

    constructor(private page: Page) {
        // ✅ Dùng role-based selectors
        this.emailInput = page.getByLabel('Email')
        this.passwordInput = page.getByLabel('Password')
        this.submitButton = page.getByRole('button', { name: 'Sign in' })
        this.errorMessage = page.getByTestId('error-message')
    }

    // Navigation
    async goto() {
        await this.page.goto('/login')
    }

    // Actions — mô tả hành vi user
    async login(email: string, password: string) {
        await this.emailInput.fill(email)
        await this.passwordInput.fill(password)
        await this.submitButton.click()
    }

    // Assertions — đóng gói trong Page Object
    async expectError(text: string) {
        await expect(this.errorMessage).toContainText(text)
    }

    async expectLoggedIn() {
        await expect(this.page).toHaveURL('/dashboard')
    }
}

// ─── Test: sạch, đọc như user story ─────────
// test('invalid login shows error', async ({ page }) => {
//     const login = new LoginPage(page)
//     await login.goto()
//     await login.login('wrong@mail.com', 'badpass')
//     await login.expectError('Invalid credentials')
// })`}</CodeBlock>

                <CodeBlock title="pages/checkout.page.ts">{`// Page Object phức tạp hơn — có component con
export class CheckoutPage {
    readonly cartSection: CartSection
    readonly paymentSection: PaymentSection

    constructor(private page: Page) {
        this.cartSection = new CartSection(page)
        this.paymentSection = new PaymentSection(page)
    }

    async goto() {
        await this.page.goto('/checkout')
    }

    async expectOrderConfirmed(orderId: string) {
        await expect(this.page.getByRole('heading'))
            .toHaveText('Order Confirmed')
        await expect(this.page.getByTestId('order-id'))
            .toContainText(orderId)
    }
}

// Component Object — cho phần nhỏ hơn của trang
class CartSection {
    constructor(private page: Page) {}

    private get section() {
        return this.page.getByTestId('cart-section')
    }

    async removeItem(name: string) {
        const row = this.section.getByRole('row', { name })
        await row.getByRole('button', { name: 'Remove' }).click()
    }

    async expectItemCount(count: number) {
        await expect(this.section.getByRole('row')).toHaveCount(count + 1) // +1 header
    }
}

class PaymentSection {
    constructor(private page: Page) {}

    async fillCard(number: string, cvv: string) {
        await this.page.getByLabel('Card number').fill(number)
        await this.page.getByLabel('CVV').fill(cvv)
    }

    async pay() {
        await this.page.getByRole('button', { name: 'Pay now' }).click()
    }
}`}</CodeBlock>

                {/* ===== AUTH STATE ===== */}
                <Heading2>🔐 Auth State Reuse</Heading2>

                <Paragraph>
                    Đừng login lại mỗi test — <Highlight>lưu session 1 lần, reuse cho tất cả tests</Highlight>.
                    Giảm thời gian chạy test từ vài phút xuống vài giây.
                </Paragraph>

                <CodeBlock title="auth.setup.ts">{`import { test as setup, expect } from '@playwright/test'

const AUTH_FILE = 'e2e/.auth/user.json'

setup('authenticate', async ({ page }) => {
    await page.goto('/login')
    await page.getByLabel('Email').fill(process.env.TEST_USER!)
    await page.getByLabel('Password').fill(process.env.TEST_PASS!)
    await page.getByRole('button', { name: 'Sign in' }).click()

    // Đợi redirect thành công
    await page.waitForURL('/dashboard')

    // Lưu toàn bộ cookies + localStorage
    await page.context().storageState({ path: AUTH_FILE })
})

// playwright.config.ts — dùng storageState
// projects: [
//   { name: 'setup', testMatch: /.*\\.setup\\.ts/ },
//   {
//     name: 'chromium',
//     dependencies: ['setup'],
//     use: { storageState: AUTH_FILE },
//   },
// ]`}</CodeBlock>

                <Callout type="tip">
                    <strong>Multi-role testing:</strong> Tạo nhiều auth files cho nhiều role (admin, user, guest).
                    Mỗi project dùng storageState riêng: <code>admin.json</code>, <code>user.json</code>.
                </Callout>

                {/* ===== FIXTURES ===== */}
                <Heading2>🏭 Test Fixtures (Custom Setup/Teardown)</Heading2>

                <Paragraph>
                    Fixtures giúp <Highlight>tạo data trước test, cleanup sau</Highlight> — giống factory pattern.
                    Playwright fixtures mạnh hơn beforeEach vì type-safe và có thể compose.
                </Paragraph>

                <CodeBlock title="fixtures/base.ts">{`import { test as base } from '@playwright/test'
import { LoginPage } from '../pages/login.page'
import { DashboardPage } from '../pages/dashboard.page'

// Khai báo custom fixtures
type MyFixtures = {
    loginPage: LoginPage
    dashboardPage: DashboardPage
    testUser: { id: string; name: string; email: string }
}

export const test = base.extend<MyFixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page)
        await loginPage.goto()
        await use(loginPage)
    },

    dashboardPage: async ({ page }, use) => {
        const dashboardPage = new DashboardPage(page)
        await use(dashboardPage)
    },

    // Fixture với setup + teardown
    testUser: async ({ request }, use) => {
        // SETUP: tạo user qua API
        const res = await request.post('/api/test/users', {
            data: { name: 'E2E User', email: \`e2e-\${Date.now()}@test.com\` },
        })
        const user = await res.json()

        await use(user)    // ← test dùng data này

        // TEARDOWN: cleanup sau test
        await request.delete(\`/api/test/users/\${user.id}\`)
    },
})

export { expect } from '@playwright/test'

// ─── Sử dụng ─────────────────────────
// import { test, expect } from '../fixtures/base'
//
// test('user sees dashboard', async ({ dashboardPage, testUser }) => {
//     await dashboardPage.goto()
//     await dashboardPage.expectWelcome(testUser.name)
// })`}</CodeBlock>

                {/* ===== SELECTOR STRATEGY ===== */}
                <Heading2>🎯 Selector Strategy</Heading2>

                <Paragraph>
                    Selector ổn định = test ổn định. Thứ tự ưu tiên <Highlight>từ tốt nhất → cuối cùng</Highlight>:
                </Paragraph>

                <CodeBlock title="selector-priority.ts">{`// 🥇 #1 Role-based (accessible + ổn định nhất)
page.getByRole('button', { name: 'Submit' })
page.getByRole('heading', { name: 'Dashboard' })
page.getByRole('link', { name: 'Settings' })
page.getByRole('textbox', { name: 'Email' })
page.getByRole('combobox')               // <select>
page.getByRole('checkbox', { name: 'Remember me' })
page.getByRole('navigation')             // <nav>
page.getByRole('alert')                  // role="alert"

// 🥈 #2 Label / Placeholder (form elements)
page.getByLabel('Email address')
page.getByPlaceholder('Search products...')

// 🥉 #3 Text content
page.getByText('Welcome back')
page.getByText(/total: \\$\\d+/i)         // regex

// 4️⃣ #4 Test ID (khi không có role/label)
page.getByTestId('checkout-btn')
// → Thêm data-testid="checkout-btn" trong component

// ❌ #5 CSS selector (CUỐI CÙNG — dễ vỡ!)
page.locator('.btn-primary')             // class thay đổi → test vỡ
page.locator('#app > div:nth-child(3)')  // DOM thay đổi → test vỡ

// ─── Scoping Selectors ──────────────────
// Tìm trong phạm vi cụ thể
const nav = page.getByRole('navigation')
const homeLink = nav.getByRole('link', { name: 'Home' })

// Filter
page.getByRole('listitem')
    .filter({ hasText: 'Product A' })
    .getByRole('button', { name: 'Add to cart' })

// nth (khi cần element cụ thể)
page.getByRole('listitem').nth(2)        // element thứ 3
page.getByRole('listitem').first()
page.getByRole('listitem').last()`}</CodeBlock>

                {/* ===== AAA PATTERN ===== */}
                <Heading2>🔀 AAA Pattern (Arrange → Act → Assert)</Heading2>

                <CodeBlock title="aaa-pattern.spec.ts">{`test('user can add product to cart and checkout', async ({ page }) => {
    // ═══ ARRANGE — setup preconditions ═══
    await page.goto('/products')

    // ═══ ACT — thực hiện hành vi ═══
    // Thêm sản phẩm vào giỏ
    await page.getByRole('button', { name: 'Add to cart' }).first().click()

    // Đi tới checkout
    await page.getByRole('link', { name: 'Cart (1)' }).click()
    await page.getByRole('button', { name: 'Checkout' }).click()

    // Điền thông tin thanh toán
    await page.getByLabel('Card number').fill('4242424242424242')
    await page.getByLabel('Expiry').fill('12/28')
    await page.getByLabel('CVV').fill('123')
    await page.getByRole('button', { name: 'Pay now' }).click()

    // ═══ ASSERT — verify kết quả ═══
    await expect(page.getByRole('heading'))
        .toHaveText('Order Confirmed! 🎉')
    await expect(page.getByTestId('order-id'))
        .toBeVisible()
    await expect(page).toHaveURL(/\\/orders\\/[a-z0-9]+/)
})

// ⚠️ Mỗi test chỉ test 1 flow
// ❌ 1 test: add to cart + checkout + refund + review
// ✅ 3 tests: add to cart | checkout | refund`}</CodeBlock>

                {/* ===== API SETUP ===== */}
                <Heading2>🌐 API Setup Pattern (Bypass UI cho setup)</Heading2>

                <Paragraph>
                    Dùng API tạo data thay vì click qua UI → <Highlight>test nhanh hơn 10x</Highlight>.
                    Chỉ test UI ở phần cần test, mọi thứ khác setup qua API.
                </Paragraph>

                <CodeBlock title="api-setup.spec.ts">{`import { test, expect } from '@playwright/test'

test('admin can see user list', async ({ page, request }) => {
    // 🚀 Tạo 5 users qua API (vài ms) thay vì click UI (vài phút)
    const userIds: string[] = []
    for (let i = 0; i < 5; i++) {
        const res = await request.post('/api/test/users', {
            data: { name: \`User \${i}\`, email: \`user\${i}@e2e.com\` },
        })
        const user = await res.json()
        userIds.push(user.id)
    }

    // 🎯 Chỉ test phần UI cần test
    await page.goto('/admin/users')
    await expect(page.getByRole('row')).toHaveCount(6) // header + 5 rows

    // 🧹 Cleanup
    for (const id of userIds) {
        await request.delete(\`/api/test/users/\${id}\`)
    }
})

test('product detail shows correct info', async ({ page, request }) => {
    // Setup product via API
    const res = await request.post('/api/products', {
        data: { name: 'Test Product', price: 299, description: 'E2E test' },
    })
    const product = await res.json()

    // Test UI
    await page.goto(\`/products/\${product.slug}\`)
    await expect(page.getByRole('heading')).toHaveText('Test Product')
    await expect(page.getByTestId('price')).toHaveText('$299')

    // Cleanup
    await request.delete(\`/api/products/\${product.id}\`)
})`}</CodeBlock>

                {/* ===== RETRY & WAIT ===== */}
                <Heading2>🔄 Retry & Wait — Đợi đúng cách</Heading2>

                <CodeBlock title="waiting.spec.ts">{`// ❌❌❌ TUYỆT ĐỐI KHÔNG dùng hardcoded wait
await page.waitForTimeout(3000)  // ANTI-PATTERN!

// ✅ Wait for element (auto-retry built-in!)
await expect(page.getByText('Order saved')).toBeVisible()
// → Playwright tự retry tối đa 5 giây (configurable)

// ✅ Wait for URL change
await page.waitForURL('**/dashboard')
await page.waitForURL(/\\/orders\\/[a-z0-9]+/)

// ✅ Wait for API response
const responsePromise = page.waitForResponse(
    resp => resp.url().includes('/api/orders') && resp.status() === 200
)
await page.getByRole('button', { name: 'Submit' }).click()
const response = await responsePromise
const data = await response.json()
expect(data.orderId).toBeDefined()

// ✅ Wait for navigation + click cùng lúc
await Promise.all([
    page.waitForNavigation(),
    page.getByRole('link', { name: 'Dashboard' }).click(),
])

// ✅ Wait for loading state to disappear
await expect(page.getByTestId('spinner')).toBeHidden()

// ✅ Wait for network idle (SPA loaded)
await page.waitForLoadState('networkidle')

// ✅ Custom polling (khi cần logic phức tạp)
await expect(async () => {
    const count = await page.getByRole('listitem').count()
    expect(count).toBeGreaterThan(0)
}).toPass({ timeout: 10_000 })`}</CodeBlock>

                {/* ===== VISUAL REGRESSION ===== */}
                <Heading2>📊 Visual Regression Testing</Heading2>

                <CodeBlock title="visual.spec.ts">{`// So sánh screenshot với baseline
test('homepage matches snapshot', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveScreenshot('homepage.png', {
        maxDiffPixelRatio: 0.01,  // cho phép 1% khác biệt
    })
})

// Mask dynamic content (ngày giờ, avatar...)
test('dashboard layout', async ({ page }) => {
    await page.goto('/dashboard')
    await expect(page).toHaveScreenshot('dashboard.png', {
        mask: [
            page.getByTestId('current-time'),
            page.getByTestId('user-avatar'),
            page.locator('.dynamic-ad'),
        ],
    })
})

// Screenshot từng component
test('product card design', async ({ page }) => {
    await page.goto('/products')
    const card = page.getByTestId('product-card').first()
    await expect(card).toHaveScreenshot('product-card.png')
})

// Full page screenshot
test('full page capture', async ({ page }) => {
    await page.goto('/about')
    await expect(page).toHaveScreenshot('about-full.png', {
        fullPage: true,
    })
})

// Update snapshots khi UI thay đổi có chủ đích:
// npx playwright test --update-snapshots`}</CodeBlock>

                {/* ===== NETWORK INTERCEPTION ===== */}
                <Heading2>📡 Network Interception (Mock API)</Heading2>

                <CodeBlock title="network.spec.ts">{`// Mock API response — không cần backend thật
test('shows error when API fails', async ({ page }) => {
    // Intercept request và trả về error
    await page.route('**/api/products', route =>
        route.fulfill({
            status: 500,
            body: JSON.stringify({ error: 'Server Error' }),
        })
    )

    await page.goto('/products')
    await expect(page.getByText('Something went wrong')).toBeVisible()
})

// Mock thành công với data cụ thể
test('displays products from API', async ({ page }) => {
    await page.route('**/api/products', route =>
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify([
                { id: 1, name: 'Mock Product', price: 99 },
            ]),
        })
    )

    await page.goto('/products')
    await expect(page.getByText('Mock Product')).toBeVisible()
    await expect(page.getByText('$99')).toBeVisible()
})

// Delay response — test loading state
test('shows loading spinner', async ({ page }) => {
    await page.route('**/api/products', async route => {
        await new Promise(r => setTimeout(r, 2000))  // delay 2s
        await route.fulfill({ status: 200, body: '[]' })
    })

    await page.goto('/products')
    await expect(page.getByTestId('spinner')).toBeVisible()
    await expect(page.getByTestId('spinner')).toBeHidden({ timeout: 5000 })
})

// Modify real response (partial mock)
test('adds discount badge', async ({ page }) => {
    await page.route('**/api/products', async route => {
        const response = await route.fetch()          // gọi API thật
        const data = await response.json()
        data[0].discount = 50                         // inject discount
        await route.fulfill({ response, body: JSON.stringify(data) })
    })

    await page.goto('/products')
    await expect(page.getByText('50% OFF')).toBeVisible()
})`}</CodeBlock>

                {/* ===== CI/CD ===== */}
                <Heading2>🚀 CI/CD Integration</Heading2>

                <CodeBlock title=".github/workflows/e2e.yml">{`name: E2E Tests
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - run: npm ci

      - name: Install Playwright
        run: npx playwright install --with-deps

      - name: Run E2E tests
        run: npx playwright test
        env:
          TEST_USER: \${{ secrets.TEST_USER }}
          TEST_PASS: \${{ secrets.TEST_PASS }}

      - name: Upload report
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 7

      - name: Upload traces
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: traces
          path: test-results/
          retention-days: 3`}</CodeBlock>

                {/* ===== ANTI-PATTERNS ===== */}
                <Heading2>🚫 Anti-patterns — Những sai lầm cần tránh</Heading2>

                <CodeBlock title="anti-patterns.ts">{`// ❌ #1: Hardcoded waits
await page.waitForTimeout(5000)
// ✅ Dùng expect auto-retry hoặc waitForResponse

// ❌ #2: CSS selectors dễ vỡ
page.locator('.MuiButton-containedPrimary')
page.locator('#root > div > div:nth-child(3) > button')
// ✅ page.getByRole('button', { name: 'Submit' })

// ❌ #3: Test phụ thuộc lẫn nhau
test('create user', async () => { /* ... */ })
test('edit user', async () => { /* dùng user từ test trên */ })
// ✅ Mỗi test phải độc lập — dùng fixtures hoặc API setup

// ❌ #4: Test quá nhiều thứ trong 1 test
test('full user journey', async () => {
    // register → login → add to cart → checkout → review → refund
})
// ✅ Chia thành nhiều test nhỏ, mỗi test 1 flow

// ❌ #5: Không cleanup data
test('create product', async ({ request }) => {
    await request.post('/api/products', { data: { name: 'Test' } })
    // Quên delete → DB đầy test data
})
// ✅ Luôn cleanup trong afterEach hoặc fixture teardown

// ❌ #6: Login lại mỗi test
test('test A', async ({ page }) => {
    await page.goto('/login')
    await page.fill('#email', 'test@mail.com')  // 5s mỗi test
})
// ✅ Dùng storageState — login 1 lần dùng cho tất cả

// ❌ #7: Assert quá sớm (không đợi UI update)
await page.click('#submit')
expect(page.url()).toBe('/success')  // Chưa navigate xong!
// ✅ await expect(page).toHaveURL('/success')

// ❌ #8: Dùng page.evaluate quá nhiều
const text = await page.evaluate(() => document.querySelector('h1')?.textContent)
expect(text).toBe('Hello')
// ✅ await expect(page.getByRole('heading')).toHaveText('Hello')`}</CodeBlock>

                {/* ===== SENIOR TIPS ===== */}
                <Heading2>👨‍💻 Senior-Level Tips</Heading2>

                <CodeBlock title="senior-patterns.ts">{`// 1. ✅ Tag tests để chạy selective
test('quick health check @smoke', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/My App/)
})
test('complex checkout flow @regression', async ({ page }) => { })
test('admin panel @admin @slow', async ({ page }) => { })

// npx playwright test --grep @smoke          # chỉ smoke
// npx playwright test --grep-invert @slow    # bỏ slow

// 2. ✅ Soft assertions — tiếp tục test dù fail
test('dashboard shows all widgets', async ({ page }) => {
    await page.goto('/dashboard')
    // Soft: ghi nhận fail nhưng KHÔNG dừng test
    await expect.soft(page.getByTestId('revenue')).toBeVisible()
    await expect.soft(page.getByTestId('users')).toBeVisible()
    await expect.soft(page.getByTestId('orders')).toBeVisible()
    // → Biết ALL widgets nào fail, không chỉ cái đầu tiên
})

// 3. ✅ Test isolation với unique data
test('register new user', async ({ page }) => {
    const uniqueEmail = \`test-\${Date.now()}@e2e.com\`
    // → Không conflict với test chạy song song
})

// 4. ✅ Retry logic cho flaky operations
test('file upload', async ({ page }) => {
    await expect(async () => {
        await page.setInputFiles('input[type="file"]', 'test.png')
        await expect(page.getByText('Uploaded!')).toBeVisible()
    }).toPass({ timeout: 15_000 })
})

// 5. ✅ Tracing cho debugging
// playwright.config.ts: trace: 'on-first-retry'
// Khi test fail → mở trace viewer:
// npx playwright show-trace test-results/trace.zip
// → Thấy timeline: screenshots, network, console, actions

// 6. ✅ Parallel với sharding trên CI
// npx playwright test --shard=1/3  (machine 1)
// npx playwright test --shard=2/3  (machine 2)
// npx playwright test --shard=3/3  (machine 3)

// 7. ✅ Global setup/teardown
// playwright.config.ts
// globalSetup: './e2e/global-setup.ts'
// → Seed database, start services

// 8. ✅ Custom matchers
import { expect as baseExpect } from '@playwright/test'
export const expect = baseExpect.extend({
    async toHaveValidPrice(locator) {
        const text = await locator.textContent()
        const isValid = /^\\$\\d+\\.\\d{2}$/.test(text || '')
        return {
            pass: isValid,
            message: () => \`Expected "\${text}" to be a valid price format ($X.XX)\`,
        }
    },
})
// await expect(page.getByTestId('price')).toHaveValidPrice()`}</CodeBlock>

                {/* ===== CHEAT SHEET ===== */}
                <Heading2>📋 Cheat Sheet</Heading2>

                <CodeBlock title="cheat-sheet.ts">{`// ═══ Navigation ═══
await page.goto('/path')
await page.goBack()
await page.reload()
await expect(page).toHaveURL('/expected')
await expect(page).toHaveTitle('Expected Title')

// ═══ Selectors (theo thứ tự ưu tiên) ═══
page.getByRole('button', { name: 'Submit' })   // #1 Best
page.getByLabel('Email')                        // #2 Form
page.getByPlaceholder('Search...')              // #3 Form
page.getByText('Welcome')                      // #4 Content
page.getByTestId('custom-id')                  // #5 Fallback
page.locator('css-selector')                   // #6 Last resort

// ═══ Actions ═══
await locator.click()
await locator.dblclick()
await locator.fill('text')           // clear + type
await locator.type('text')           // key by key
await locator.press('Enter')
await locator.check()                // checkbox
await locator.uncheck()
await locator.selectOption('value')  // <select>
await locator.hover()
await locator.focus()
await locator.setInputFiles('file.png')
await locator.dragTo(target)

// ═══ Assertions (auto-retry!) ═══
await expect(locator).toBeVisible()
await expect(locator).toBeHidden()
await expect(locator).toBeEnabled()
await expect(locator).toBeDisabled()
await expect(locator).toBeChecked()
await expect(locator).toHaveText('exact text')
await expect(locator).toContainText('partial')
await expect(locator).toHaveValue('input value')
await expect(locator).toHaveCount(5)
await expect(locator).toHaveClass(/active/)
await expect(locator).toHaveAttribute('href', '/home')
await expect(locator).toHaveScreenshot('name.png')

// ═══ CLI Commands ═══
// npx playwright test                  — run all
// npx playwright test --headed         — show browser
// npx playwright test --ui             — interactive UI
// npx playwright test --debug          — debugger
// npx playwright test spec.ts          — run 1 file
// npx playwright test -g "test name"   — run by name
// npx playwright test --grep @smoke    — run by tag
// npx playwright test --trace on       — record trace
// npx playwright show-report           — open HTML report
// npx playwright codegen localhost:3000 — record test`}</CodeBlock>

                <Callout type="tip">
                    <strong>Quy tắc vàng của E2E test:</strong> Test như user thật sử dụng app.
                    Dùng <strong>role-based selectors</strong>, setup data qua <strong>API</strong>,
                    và giữ mỗi test <strong>độc lập + focused</strong>. Nếu test hay bị flaky, đó là dấu hiệu
                    selector hoặc waiting strategy chưa đủ tốt — không phải lỗi Playwright.
                </Callout>
            </>
        ),
        en: (
            <>
                <Paragraph>
                    Playwright is the most modern E2E testing framework — <Highlight>faster than Cypress</Highlight>,
                    multi-browser support, auto-wait, and powerful tracing. This guide covers all
                    patterns and best practices you need to write E2E tests like a Senior engineer.
                </Paragraph>

                <Callout type="info">
                    <strong>Playwright vs Cypress:</strong> Playwright is ~40% faster, supports multi-tab/multi-browser,
                    has better auto-wait, and runs tests in parallel out-of-the-box. Cypress is friendlier for beginners
                    but limited to single-tab and primarily Chromium (Firefox via plugin).
                </Callout>

                {/* ===== SETUP ===== */}
                <Heading2>⚙️ Setup & Config</Heading2>

                <CodeBlock title="terminal">{`# Install Playwright
npm init playwright@latest

# Or add to existing project
npm install -D @playwright/test
npx playwright install  # download browsers (Chromium, Firefox, WebKit)

# Run tests
npx playwright test               # headless
npx playwright test --headed       # open browser
npx playwright test --ui           # interactive UI mode
npx playwright test --debug        # step-by-step debugger
npx playwright test --trace on     # record trace`}</CodeBlock>

                <CodeBlock title="playwright.config.ts">{`import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
    testDir: './e2e',
    timeout: 30_000,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: [
        ['html', { open: 'never' }],
        ['json', { outputFile: 'test-results.json' }],
    ],
    use: {
        baseURL: 'http://localhost:3000',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
    },
    projects: [
        { name: 'setup', testMatch: /.*\\.setup\\.ts/ },
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
            dependencies: ['setup'],
        },
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
            dependencies: ['setup'],
        },
        {
            name: 'mobile',
            use: { ...devices['iPhone 14'] },
            dependencies: ['setup'],
        },
    ],
    webServer: {
        command: 'npm run dev',
        url: 'http://localhost:3000',
        reuseExistingServer: !process.env.CI,
    },
})`}</CodeBlock>

                <CodeBlock title="folder-structure">{`e2e/
├── fixtures/
│   ├── base.ts             # Extended test with custom fixtures
│   └── test-data.ts        # Factory functions
├── pages/
│   ├── login.page.ts       # Page Object: Login
│   ├── dashboard.page.ts   # Page Object: Dashboard
│   └── checkout.page.ts    # Page Object: Checkout
├── specs/
│   ├── auth.spec.ts
│   ├── dashboard.spec.ts
│   ├── checkout.spec.ts
│   └── smoke.spec.ts       # Quick smoke tests (@smoke tag)
├── auth.setup.ts           # Login once, save session
└── .auth/
    └── user.json           # Auto-generated (gitignore)`}</CodeBlock>

                {/* ===== PAGE OBJECT MODEL ===== */}
                <Heading2>🏗️ Page Object Model (POM)</Heading2>

                <Paragraph>
                    The <Highlight>most important pattern</Highlight> — separate locators and actions from test logic.
                    When UI changes → fix 1 place (Page Object), not 20 tests.
                </Paragraph>

                <CodeBlock title="pages/login.page.ts">{`import { Page, Locator, expect } from '@playwright/test'

export class LoginPage {
    readonly emailInput: Locator
    readonly passwordInput: Locator
    readonly submitButton: Locator
    readonly errorMessage: Locator

    constructor(private page: Page) {
        this.emailInput = page.getByLabel('Email')
        this.passwordInput = page.getByLabel('Password')
        this.submitButton = page.getByRole('button', { name: 'Sign in' })
        this.errorMessage = page.getByTestId('error-message')
    }

    async goto() {
        await this.page.goto('/login')
    }

    async login(email: string, password: string) {
        await this.emailInput.fill(email)
        await this.passwordInput.fill(password)
        await this.submitButton.click()
    }

    async expectError(text: string) {
        await expect(this.errorMessage).toContainText(text)
    }

    async expectLoggedIn() {
        await expect(this.page).toHaveURL('/dashboard')
    }
}`}</CodeBlock>

                <CodeBlock title="pages/checkout.page.ts">{`// Complex Page Object with component sections
export class CheckoutPage {
    readonly cartSection: CartSection
    readonly paymentSection: PaymentSection

    constructor(private page: Page) {
        this.cartSection = new CartSection(page)
        this.paymentSection = new PaymentSection(page)
    }

    async goto() { await this.page.goto('/checkout') }

    async expectOrderConfirmed(orderId: string) {
        await expect(this.page.getByRole('heading'))
            .toHaveText('Order Confirmed')
        await expect(this.page.getByTestId('order-id'))
            .toContainText(orderId)
    }
}

class CartSection {
    constructor(private page: Page) {}
    private get section() { return this.page.getByTestId('cart-section') }

    async removeItem(name: string) {
        const row = this.section.getByRole('row', { name })
        await row.getByRole('button', { name: 'Remove' }).click()
    }
}

class PaymentSection {
    constructor(private page: Page) {}

    async fillCard(number: string, cvv: string) {
        await this.page.getByLabel('Card number').fill(number)
        await this.page.getByLabel('CVV').fill(cvv)
    }

    async pay() {
        await this.page.getByRole('button', { name: 'Pay now' }).click()
    }
}`}</CodeBlock>

                {/* ===== AUTH STATE ===== */}
                <Heading2>🔐 Auth State Reuse</Heading2>

                <Paragraph>
                    Never login again per test — <Highlight>save session once, reuse across all tests</Highlight>.
                    Reduces test time from minutes to seconds.
                </Paragraph>

                <CodeBlock title="auth.setup.ts">{`import { test as setup, expect } from '@playwright/test'

const AUTH_FILE = 'e2e/.auth/user.json'

setup('authenticate', async ({ page }) => {
    await page.goto('/login')
    await page.getByLabel('Email').fill(process.env.TEST_USER!)
    await page.getByLabel('Password').fill(process.env.TEST_PASS!)
    await page.getByRole('button', { name: 'Sign in' }).click()
    await page.waitForURL('/dashboard')
    await page.context().storageState({ path: AUTH_FILE })
})`}</CodeBlock>

                <Callout type="tip">
                    <strong>Multi-role testing:</strong> Create separate auth files per role (admin, user, guest).
                    Each project uses its own storageState: <code>admin.json</code>, <code>user.json</code>.
                </Callout>

                {/* ===== FIXTURES ===== */}
                <Heading2>🏭 Test Fixtures</Heading2>

                <Paragraph>
                    Fixtures help <Highlight>create data before test, cleanup after</Highlight> — like a factory pattern.
                    Playwright fixtures are more powerful than beforeEach: type-safe and composable.
                </Paragraph>

                <CodeBlock title="fixtures/base.ts">{`import { test as base } from '@playwright/test'
import { LoginPage } from '../pages/login.page'

type MyFixtures = {
    loginPage: LoginPage
    testUser: { id: string; name: string; email: string }
}

export const test = base.extend<MyFixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page)
        await loginPage.goto()
        await use(loginPage)
    },

    testUser: async ({ request }, use) => {
        // SETUP
        const res = await request.post('/api/test/users', {
            data: { name: 'E2E User', email: \`e2e-\${Date.now()}@test.com\` },
        })
        const user = await res.json()

        await use(user)

        // TEARDOWN
        await request.delete(\`/api/test/users/\${user.id}\`)
    },
})

export { expect } from '@playwright/test'`}</CodeBlock>

                {/* ===== SELECTORS ===== */}
                <Heading2>🎯 Selector Strategy</Heading2>

                <CodeBlock title="selector-priority.ts">{`// 🥇 #1 Role-based (most accessible + stable)
page.getByRole('button', { name: 'Submit' })
page.getByRole('heading', { name: 'Dashboard' })
page.getByRole('link', { name: 'Settings' })

// 🥈 #2 Label / Placeholder
page.getByLabel('Email address')
page.getByPlaceholder('Search products...')

// 🥉 #3 Text content
page.getByText('Welcome back')
page.getByText(/total: \\$\\d+/i)

// 4️⃣ #4 Test ID (when no role/label available)
page.getByTestId('checkout-btn')

// ❌ #5 CSS selector (LAST RESORT — fragile!)
page.locator('.btn-primary')
page.locator('#app > div:nth-child(3)')

// Scoping & Filtering
const nav = page.getByRole('navigation')
nav.getByRole('link', { name: 'Home' })  // scoped

page.getByRole('listitem')
    .filter({ hasText: 'Product A' })
    .getByRole('button', { name: 'Add to cart' })`}</CodeBlock>

                {/* ===== AAA ===== */}
                <Heading2>🔀 AAA Pattern</Heading2>

                <CodeBlock title="aaa-pattern.spec.ts">{`test('user can checkout', async ({ page }) => {
    // ARRANGE
    await page.goto('/products')

    // ACT
    await page.getByRole('button', { name: 'Add to cart' }).first().click()
    await page.getByRole('link', { name: 'Cart (1)' }).click()
    await page.getByRole('button', { name: 'Checkout' }).click()
    await page.getByLabel('Card number').fill('4242424242424242')
    await page.getByRole('button', { name: 'Pay now' }).click()

    // ASSERT
    await expect(page.getByRole('heading'))
        .toHaveText('Order Confirmed! 🎉')
    await expect(page).toHaveURL(/\\/orders\\/[a-z0-9]+/)
})`}</CodeBlock>

                {/* ===== API SETUP ===== */}
                <Heading2>🌐 API Setup Pattern</Heading2>

                <Paragraph>
                    Use API to create test data instead of clicking through UI — <Highlight>10x faster</Highlight>.
                    Only test the UI part you actually need to test.
                </Paragraph>

                <CodeBlock title="api-setup.spec.ts">{`test('admin sees user list', async ({ page, request }) => {
    // Setup via API (milliseconds, not minutes)
    const userIds: string[] = []
    for (let i = 0; i < 5; i++) {
        const res = await request.post('/api/test/users', {
            data: { name: \`User \${i}\`, email: \`user\${i}@e2e.com\` },
        })
        userIds.push((await res.json()).id)
    }

    // Test only the UI
    await page.goto('/admin/users')
    await expect(page.getByRole('row')).toHaveCount(6)

    // Cleanup
    for (const id of userIds) {
        await request.delete(\`/api/test/users/\${id}\`)
    }
})`}</CodeBlock>

                {/* ===== WAIT ===== */}
                <Heading2>🔄 Retry & Wait</Heading2>

                <CodeBlock title="waiting.spec.ts">{`// ❌ NEVER use hardcoded waits
await page.waitForTimeout(3000)

// ✅ Auto-retry assertions
await expect(page.getByText('Saved')).toBeVisible()

// ✅ Wait for URL
await page.waitForURL('**/dashboard')

// ✅ Wait for API response
const response = page.waitForResponse('**/api/orders')
await page.getByRole('button', { name: 'Submit' }).click()
const data = await (await response).json()

// ✅ Custom polling
await expect(async () => {
    const count = await page.getByRole('listitem').count()
    expect(count).toBeGreaterThan(0)
}).toPass({ timeout: 10_000 })`}</CodeBlock>

                {/* ===== VISUAL ===== */}
                <Heading2>📊 Visual Regression</Heading2>

                <CodeBlock title="visual.spec.ts">{`test('homepage matches snapshot', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveScreenshot('homepage.png', {
        maxDiffPixelRatio: 0.01,
        mask: [page.getByTestId('dynamic-date')],
    })
})

// Update snapshots: npx playwright test --update-snapshots`}</CodeBlock>

                {/* ===== NETWORK ===== */}
                <Heading2>📡 Network Interception</Heading2>

                <CodeBlock title="network.spec.ts">{`// Mock API error
test('shows error on API failure', async ({ page }) => {
    await page.route('**/api/products', route =>
        route.fulfill({ status: 500, body: '{"error":"Server Error"}' })
    )
    await page.goto('/products')
    await expect(page.getByText('Something went wrong')).toBeVisible()
})

// Delay response to test loading state
test('shows spinner during load', async ({ page }) => {
    await page.route('**/api/products', async route => {
        await new Promise(r => setTimeout(r, 2000))
        await route.fulfill({ status: 200, body: '[]' })
    })
    await page.goto('/products')
    await expect(page.getByTestId('spinner')).toBeVisible()
})`}</CodeBlock>

                {/* ===== CI/CD ===== */}
                <Heading2>🚀 CI/CD Integration</Heading2>

                <CodeBlock title=".github/workflows/e2e.yml">{`name: E2E Tests
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm }
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test
        env:
          TEST_USER: \${{ secrets.TEST_USER }}
          TEST_PASS: \${{ secrets.TEST_PASS }}
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/`}</CodeBlock>

                {/* ===== ANTI-PATTERNS ===== */}
                <Heading2>🚫 Anti-patterns</Heading2>

                <CodeBlock title="anti-patterns.ts">{`// ❌ Hardcoded waits → ✅ auto-retry assertions
// ❌ CSS selectors → ✅ role-based selectors
// ❌ Dependent tests → ✅ independent with fixtures
// ❌ Too much in 1 test → ✅ 1 flow per test
// ❌ No cleanup → ✅ fixture teardown
// ❌ Login per test → ✅ storageState
// ❌ Assert before wait → ✅ await expect().toHaveURL()
// ❌ page.evaluate → ✅ built-in locators`}</CodeBlock>

                {/* ===== SENIOR TIPS ===== */}
                <Heading2>👨‍💻 Senior Tips</Heading2>

                <CodeBlock title="senior-patterns.ts">{`// 1. Tag tests for selective runs
test('health check @smoke', async ({ page }) => { })
// npx playwright test --grep @smoke

// 2. Soft assertions — continue test after failure
await expect.soft(page.getByTestId('widget-1')).toBeVisible()
await expect.soft(page.getByTestId('widget-2')).toBeVisible()

// 3. Unique test data to avoid conflicts
const email = \`test-\${Date.now()}@e2e.com\`

// 4. Sharding for parallel CI
// npx playwright test --shard=1/3

// 5. Custom matchers
export const expect = baseExpect.extend({
    async toHaveValidPrice(locator) {
        const text = await locator.textContent()
        return {
            pass: /^\\$\\d+\\.\\d{2}$/.test(text || ''),
            message: () => \`Expected valid price, got "\${text}"\`,
        }
    },
})`}</CodeBlock>

                {/* ===== CHEAT SHEET ===== */}
                <Heading2>📋 Cheat Sheet</Heading2>

                <CodeBlock title="cheat-sheet.ts">{`// === Navigation ===
await page.goto('/path')
await expect(page).toHaveURL('/expected')
await expect(page).toHaveTitle('Title')

// === Selectors (priority order) ===
page.getByRole('button', { name: 'Submit' })   // #1
page.getByLabel('Email')                        // #2
page.getByText('Welcome')                      // #3
page.getByTestId('custom-id')                  // #4

// === Actions ===
await locator.click() / .fill('') / .press('Enter')
await locator.check() / .selectOption('val')
await locator.hover() / .dragTo(target)

// === Assertions (auto-retry!) ===
await expect(loc).toBeVisible() / .toBeHidden()
await expect(loc).toHaveText('exact') / .toContainText('partial')
await expect(loc).toHaveCount(5) / .toHaveClass(/active/)

// === CLI ===
// npx playwright test --headed --ui --debug
// npx playwright test --grep @smoke
// npx playwright codegen localhost:3000
// npx playwright show-report`}</CodeBlock>

                <Callout type="tip">
                    <strong>Golden rule of E2E:</strong> Test like a real user.
                    Use <strong>role-based selectors</strong>, set up data via <strong>API</strong>,
                    and keep each test <strong>independent + focused</strong>. If tests are flaky, it&apos;s a sign
                    your selectors or waiting strategy needs improvement — not Playwright&apos;s fault.
                </Callout>
            </>
        ),
    },
}

export default e2eTestingPlaywright
