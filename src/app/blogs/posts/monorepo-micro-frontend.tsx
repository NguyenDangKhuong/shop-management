import { BlogPost } from '../types'
import { CodeBlock, Heading2, Heading3, Paragraph, Highlight, Callout } from '../components/BlogComponents'

const viContent = (
    <>
        <Paragraph>
            Khi dự án lớn lên, team mở rộng, bạn sẽ đối mặt với câu hỏi:
            <Highlight> Làm sao tổ chức code cho 10+ apps mà không rối?</Highlight> và
            <Highlight> Làm sao deploy riêng từng feature mà không ảnh hưởng app khác?</Highlight>
            Đó là lúc <Highlight>Monorepo</Highlight> và <Highlight>Micro Frontend</Highlight> phát huy tác dụng.
        </Paragraph>

        <Callout type="info">
            Hai khái niệm này giải quyết 2 vấn đề khác nhau nhưng thường đi cùng nhau:
            Monorepo giải quyết <Highlight>cách tổ chức code</Highlight>, còn Micro Frontend giải quyết <Highlight>cách chia tách UI</Highlight>.
        </Callout>

        {/* ===== MONOREPO ===== */}
        <Heading2>1. Monorepo — Một repo để trị tất cả</Heading2>

        <Paragraph>
            <Highlight>Monorepo</Highlight> là chiến lược lưu <Highlight>nhiều projects/packages trong cùng một Git repository</Highlight>.
            Thay vì mỗi team có repo riêng (polyrepo), tất cả code nằm chung một nơi nhưng được chia thành các packages độc lập.
        </Paragraph>

        <Heading3>Monorepo vs Polyrepo</Heading3>

        <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-4">
                <div className="text-blue-400 font-bold text-sm mb-2">📦 Polyrepo (truyền thống)</div>
                <div className="text-slate-300 text-sm font-mono space-y-0.5">
                    <div>repo-frontend/</div>
                    <div>repo-backend/</div>
                    <div>repo-shared-ui/</div>
                    <div>repo-utils/</div>
                    <div className="text-slate-500">→ 4 repos riêng biệt</div>
                </div>
            </div>
            <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-4">
                <div className="text-green-400 font-bold text-sm mb-2">🏗️ Monorepo</div>
                <div className="text-slate-300 text-sm font-mono space-y-0.5">
                    <div>my-company/</div>
                    <div>&nbsp;&nbsp;├── apps/frontend/</div>
                    <div>&nbsp;&nbsp;├── apps/backend/</div>
                    <div>&nbsp;&nbsp;├── packages/shared-ui/</div>
                    <div>&nbsp;&nbsp;└── packages/utils/</div>
                    <div className="text-slate-500">→ 1 repo duy nhất</div>
                </div>
            </div>
        </div>

        <Heading3>Ai đang dùng Monorepo?</Heading3>

        <div className="my-6 flex flex-wrap gap-2">
            {['Google', 'Meta', 'Microsoft', 'Uber', 'Vercel', 'Airbnb', 'Netflix'].map(company => (
                <span key={company} className="px-3 py-1.5 rounded-full bg-slate-800/60 border border-white/10 text-sm text-slate-300">
                    {company}
                </span>
            ))}
        </div>

        <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-4">
                <div className="text-green-400 font-bold text-sm mb-2">✅ Ưu điểm</div>
                <ul className="text-slate-300 text-sm space-y-1.5">
                    <li>• <strong>Code sharing</strong> dễ dàng giữa các projects</li>
                    <li>• <strong>Atomic commits</strong> — thay đổi xuyên suốt nhiều packages</li>
                    <li>• <strong>Dependency management</strong> thống nhất</li>
                    <li>• <strong>Refactoring</strong> toàn bộ codebase cùng lúc</li>
                    <li>• <strong>CI/CD</strong> tập trung, dễ quản lý</li>
                </ul>
            </div>
            <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4">
                <div className="text-red-400 font-bold text-sm mb-2">❌ Nhược điểm</div>
                <ul className="text-slate-300 text-sm space-y-1.5">
                    <li>• <strong>Repo lớn</strong> — clone/build chậm nếu không optimize</li>
                    <li>• <strong>Tooling phức tạp</strong> — cần Turborepo, Nx, etc.</li>
                    <li>• <strong>Permission</strong> khó quản lý (ai sửa package nào)</li>
                    <li>• <strong>CI chậm</strong> nếu không có affected/cache</li>
                    <li>• <strong>Learning curve</strong> cho team mới</li>
                </ul>
            </div>
        </div>

        <Heading3>🛠️ Công cụ phổ biến</Heading3>

        <div className="my-6 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
                <thead>
                    <tr className="border-b border-white/10">
                        <th className="text-left p-3 text-slate-400 font-medium">Tool</th>
                        <th className="text-left p-3 text-slate-400 font-medium">Bởi</th>
                        <th className="text-left p-3 text-slate-400 font-medium">Đặc điểm</th>
                    </tr>
                </thead>
                <tbody className="text-slate-300">
                    <tr className="border-b border-white/5">
                        <td className="p-3 font-semibold text-blue-400">Turborepo</td>
                        <td className="p-3">Vercel</td>
                        <td className="p-3">Nhanh, zero-config, remote caching</td>
                    </tr>
                    <tr className="border-b border-white/5">
                        <td className="p-3 font-semibold text-purple-400">Nx</td>
                        <td className="p-3">Nrwl</td>
                        <td className="p-3">Full-featured, generators, graph visualization</td>
                    </tr>
                    <tr className="border-b border-white/5">
                        <td className="p-3 font-semibold text-yellow-400">pnpm workspaces</td>
                        <td className="p-3">pnpm</td>
                        <td className="p-3">Lightweight, fast install, disk efficient</td>
                    </tr>
                    <tr>
                        <td className="p-3 font-semibold text-green-400">Lerna</td>
                        <td className="p-3">Nrwl (now)</td>
                        <td className="p-3">Versioning & publishing, dùng với Nx</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <Heading3>💻 Implement Monorepo với Turborepo</Heading3>

        <CodeBlock title="Tạo Monorepo mới">{`# Scaffold monorepo mới
npx create-turbo@latest my-monorepo

# Cấu trúc tự động tạo:
my-monorepo/
├── apps/
│   ├── web/          # Next.js app
│   └── docs/         # Documentation app
├── packages/
│   ├── ui/           # Shared UI components
│   ├── eslint-config/ # Shared ESLint config
│   └── typescript-config/ # Shared TypeScript config
├── turbo.json        # Turborepo config
├── package.json      # Root workspace
└── pnpm-workspace.yaml`}</CodeBlock>

        <CodeBlock title="pnpm-workspace.yaml">{`packages:
  - "apps/*"
  - "packages/*"`}</CodeBlock>

        <CodeBlock title="turbo.json">{`{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],   // Build dependencies trước
      "outputs": [".next/**", "dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "dependsOn": ["^lint"]
    },
    "test": {
      "dependsOn": ["^build"]
    }
  }
}`}</CodeBlock>

        <CodeBlock title="packages/ui/package.json">{`{
  "name": "@repo/ui",
  "version": "0.0.1",
  "exports": {
    "./button": "./src/button.tsx",
    "./card": "./src/card.tsx",
    "./header": "./src/header.tsx"
  },
  "peerDependencies": {
    "react": "^18 || ^19"
  }
}`}</CodeBlock>

        <CodeBlock title="apps/web/package.json">{`{
  "name": "web",
  "dependencies": {
    "@repo/ui": "workspace:*",  // 👈 Import từ shared package
    "next": "^15.0.0",
    "react": "^19.0.0"
  }
}

// Sử dụng trong app:
import { Button } from '@repo/ui/button'
import { Card } from '@repo/ui/card'`}</CodeBlock>

        <CodeBlock title="Chạy commands">{`# Chạy dev cho TẤT CẢ apps
pnpm turbo dev

# Chạy dev CHỈ cho web app
pnpm turbo dev --filter=web

# Build tất cả (với caching!)
pnpm turbo build

# Chạy lint chỉ cho packages bị ảnh hưởng
pnpm turbo lint --filter=...[HEAD^1]`}</CodeBlock>

        <Callout type="tip">
            Turborepo có <Highlight>Remote Caching</Highlight> — nếu teammate đã build package X,
            bạn sẽ nhận kết quả cached từ cloud thay vì build lại. Cực kỳ tiết kiệm thời gian CI/CD!
        </Callout>

        {/* ===== MICRO FRONTEND ===== */}
        <Heading2>2. Micro Frontend — Chia để trị UI</Heading2>

        <Paragraph>
            <Highlight>Micro Frontend</Highlight> là kiến trúc chia một ứng dụng web lớn thành
            <Highlight> nhiều ứng dụng frontend nhỏ, độc lập</Highlight>. Mỗi team sở hữu một phần UI,
            có thể develop, test, deploy riêng biệt — giống microservices nhưng cho frontend.
        </Paragraph>

        <div className="my-6 p-4 rounded-xl bg-slate-800/50 border border-white/10">
            <div className="text-center text-sm text-slate-400 mb-3 font-medium">🏗️ Monolithic vs Micro Frontend</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                    <div className="text-red-400 font-bold text-sm mb-2">Monolithic Frontend</div>
                    <div className="text-slate-300 text-xs space-y-1">
                        <div className="p-2 rounded bg-red-500/20 text-center">1 app lớn = 1 team</div>
                        <div className="text-slate-500 text-center text-xs">Mọi feature trong 1 codebase</div>
                    </div>
                </div>
                <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <div className="text-green-400 font-bold text-sm mb-2">Micro Frontend</div>
                    <div className="text-slate-300 text-xs space-y-1">
                        <div className="grid grid-cols-3 gap-1">
                            <div className="p-2 rounded bg-blue-500/20 text-center">Header<br /><span className="text-[10px]">Team A</span></div>
                            <div className="p-2 rounded bg-purple-500/20 text-center">Product<br /><span className="text-[10px]">Team B</span></div>
                            <div className="p-2 rounded bg-yellow-500/20 text-center">Cart<br /><span className="text-[10px]">Team C</span></div>
                        </div>
                        <div className="text-slate-500 text-center text-xs">Mỗi team deploy riêng</div>
                    </div>
                </div>
            </div>
        </div>

        <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-4">
                <div className="text-green-400 font-bold text-sm mb-2">✅ Ưu điểm</div>
                <ul className="text-slate-300 text-sm space-y-1.5">
                    <li>• <strong>Independent deploy</strong> — team ship riêng, không đợi ai</li>
                    <li>• <strong>Tech freedom</strong> — mỗi team chọn framework riêng</li>
                    <li>• <strong>Scale team</strong> — team mới chỉ cần hiểu phần của mình</li>
                    <li>• <strong>Fault isolation</strong> — 1 phần lỗi không sập toàn app</li>
                    <li>• <strong>Incremental upgrade</strong> — nâng cấp từng phần</li>
                </ul>
            </div>
            <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4">
                <div className="text-red-400 font-bold text-sm mb-2">❌ Nhược điểm</div>
                <ul className="text-slate-300 text-sm space-y-1.5">
                    <li>• <strong>Phức tạp</strong> — setup, routing, shared state</li>
                    <li>• <strong>Bundle size</strong> — duplicate dependencies</li>
                    <li>• <strong>UX inconsistency</strong> — khó giữ design đồng nhất</li>
                    <li>• <strong>Testing E2E</strong> — khó test toàn bộ flow</li>
                    <li>• <strong>CSS conflicts</strong> — styles có thể đè nhau</li>
                </ul>
            </div>
        </div>

        <Heading3>🔧 Các cách implement Micro Frontend</Heading3>

        <div className="my-6 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
                <thead>
                    <tr className="border-b border-white/10">
                        <th className="text-left p-3 text-slate-400 font-medium">Approach</th>
                        <th className="text-left p-3 text-slate-400 font-medium">Mô tả</th>
                        <th className="text-left p-3 text-slate-400 font-medium">Khi nào dùng</th>
                    </tr>
                </thead>
                <tbody className="text-slate-300">
                    <tr className="border-b border-white/5">
                        <td className="p-3 font-semibold text-blue-400">Module Federation</td>
                        <td className="p-3">Webpack/Vite share modules runtime</td>
                        <td className="p-3">SPA, cùng framework</td>
                    </tr>
                    <tr className="border-b border-white/5">
                        <td className="p-3 font-semibold text-purple-400">iframes</td>
                        <td className="p-3">Embed app trong iframe</td>
                        <td className="p-3">Isolation cao, legacy</td>
                    </tr>
                    <tr className="border-b border-white/5">
                        <td className="p-3 font-semibold text-green-400">Web Components</td>
                        <td className="p-3">Custom elements, Shadow DOM</td>
                        <td className="p-3">Khác framework</td>
                    </tr>
                    <tr>
                        <td className="p-3 font-semibold text-yellow-400">Route-based</td>
                        <td className="p-3">Mỗi route = 1 app riêng (reverse proxy)</td>
                        <td className="p-3">Đơn giản nhất</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <Heading3>💻 Implement với Module Federation (Vite)</Heading3>

        <Paragraph>
            <Highlight>Module Federation</Highlight> là cách phổ biến nhất — cho phép các app
            <Highlight> share components runtime</Highlight> mà không cần build chung:
        </Paragraph>

        <CodeBlock title="host-app/vite.config.ts (Host — Shell App)">{`import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
    plugins: [
        react(),
        federation({
            name: 'host-app',
            remotes: {
                // Khai báo remote apps
                productApp: 'http://localhost:3001/assets/remoteEntry.js',
                cartApp: 'http://localhost:3002/assets/remoteEntry.js',
            },
            shared: ['react', 'react-dom'] // Share dependencies
        })
    ]
})`}</CodeBlock>

        <CodeBlock title="product-app/vite.config.ts (Remote — Product Team)">{`import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
    plugins: [
        react(),
        federation({
            name: 'product-app',
            filename: 'remoteEntry.js',
            exposes: {
                // Expose components cho host
                './ProductList': './src/components/ProductList',
                './ProductDetail': './src/components/ProductDetail',
            },
            shared: ['react', 'react-dom']
        })
    ],
    build: {
        target: 'esnext',
        minify: false
    }
})`}</CodeBlock>

        <CodeBlock title="host-app/src/App.tsx (Sử dụng remote components)">{`import React, { Suspense, lazy } from 'react'

// Dynamic import từ remote app
const ProductList = lazy(() => import('productApp/ProductList'))
const CartSidebar = lazy(() => import('cartApp/CartSidebar'))

export default function App() {
    return (
        <div>
            <Header /> {/* Local component */}

            <Suspense fallback={<div>Loading products...</div>}>
                <ProductList /> {/* Từ Product Team! */}
            </Suspense>

            <Suspense fallback={<div>Loading cart...</div>}>
                <CartSidebar /> {/* Từ Cart Team! */}
            </Suspense>
        </div>
    )
}`}</CodeBlock>

        <Heading3>💻 Implement Route-based Micro Frontend</Heading3>

        <Paragraph>
            Cách đơn giản nhất — dùng <Highlight>reverse proxy</Highlight> (Nginx) để route mỗi path đến một app riêng:
        </Paragraph>

        <CodeBlock title="nginx.conf">{`server {
    listen 80;

    # / → Shell app (shared header/footer)
    location / {
        proxy_pass http://shell-app:3000;
    }

    # /products → Product team's app
    location /products {
        proxy_pass http://product-app:3001;
    }

    # /cart → Cart team's app
    location /cart {
        proxy_pass http://cart-app:3002;
    }

    # /account → Account team's app
    location /account {
        proxy_pass http://account-app:3003;
    }
}`}</CodeBlock>

        <Callout type="warning">
            Route-based approach đơn giản nhưng sẽ gây <Highlight>full page reload</Highlight> khi chuyển giữa các micro apps.
            Nếu cần SPA-like UX, dùng Module Federation hoặc single-spa.
        </Callout>

        {/* ===== KẾT HỢP ===== */}
        <Heading2>3. Kết hợp Monorepo + Micro Frontend</Heading2>

        <Paragraph>
            Trong thực tế, nhiều công ty <Highlight>kết hợp cả hai</Highlight>:
            dùng Monorepo để tổ chức code, và Micro Frontend để deploy độc lập.
        </Paragraph>

        <CodeBlock title="Cấu trúc thực tế">{`my-ecommerce/                    # Monorepo (Turborepo)
├── apps/
│   ├── shell/                   # 🐚 Shell app (layout, routing)
│   ├── product/                 # 🛍️ Product micro-frontend
│   ├── cart/                    # 🛒 Cart micro-frontend
│   ├── account/                 # 👤 Account micro-frontend
│   └── admin/                   # ⚙️ Admin dashboard
├── packages/
│   ├── ui/                      # 🎨 Shared UI components (Design System)
│   ├── utils/                   # 🔧 Shared utilities
│   ├── api-client/              # 📡 Typed API client
│   ├── auth/                    # 🔐 Auth logic (shared)
│   ├── eslint-config/           # ESLint rules
│   └── typescript-config/       # TSConfig base
├── turbo.json
├── pnpm-workspace.yaml
└── docker-compose.yml           # Chạy tất cả micro-frontends`}</CodeBlock>

        <div className="my-6 space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <span className="text-blue-400 mt-0.5">💡</span>
                <span className="text-slate-300 text-sm"><strong>Monorepo</strong> giúp share code (UI, utils, types) giữa các micro-frontends dễ dàng</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                <span className="text-purple-400 mt-0.5">💡</span>
                <span className="text-slate-300 text-sm"><strong>Micro Frontend</strong> cho phép mỗi app deploy riêng, không ảnh hưởng nhau</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                <span className="text-green-400 mt-0.5">💡</span>
                <span className="text-slate-300 text-sm"><strong>Kết hợp</strong> = code sharing dễ dàng + deploy độc lập = best of both worlds</span>
            </div>
        </div>

        {/* ===== KHI NÀO DÙNG ===== */}
        <Heading2>4. Khi nào nên dùng?</Heading2>

        <div className="my-6 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
                <thead>
                    <tr className="border-b border-white/10">
                        <th className="text-left p-3 text-slate-400 font-medium">Câu hỏi</th>
                        <th className="text-left p-3 text-blue-400 font-medium">Monorepo</th>
                        <th className="text-left p-3 text-purple-400 font-medium">Micro FE</th>
                    </tr>
                </thead>
                <tbody className="text-slate-300">
                    <tr className="border-b border-white/5">
                        <td className="p-3 text-slate-400">Team &lt; 5 người?</td>
                        <td className="p-3">Có thể dùng</td>
                        <td className="p-3">❌ Overkill</td>
                    </tr>
                    <tr className="border-b border-white/5">
                        <td className="p-3 text-slate-400">Team 10+ người, nhiều squad?</td>
                        <td className="p-3">✅ Nên dùng</td>
                        <td className="p-3">✅ Nên dùng</td>
                    </tr>
                    <tr className="border-b border-white/5">
                        <td className="p-3 text-slate-400">Share code giữa các projects?</td>
                        <td className="p-3">✅ Điểm mạnh nhất</td>
                        <td className="p-3">Cần thêm setup</td>
                    </tr>
                    <tr className="border-b border-white/5">
                        <td className="p-3 text-slate-400">Deploy riêng từng feature?</td>
                        <td className="p-3">Cần thêm config</td>
                        <td className="p-3">✅ Điểm mạnh nhất</td>
                    </tr>
                    <tr>
                        <td className="p-3 text-slate-400">Dự án nhỏ, MVP?</td>
                        <td className="p-3">❌ Quá phức tạp</td>
                        <td className="p-3">❌ Quá phức tạp</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <Callout type="warning">
            Đừng dùng Monorepo hay Micro Frontend chỉ vì &quot;cool&quot;. Chỉ dùng khi team đủ lớn (10+ dev)
            và dự án đủ phức tạp. Với startup hoặc MVP, <Highlight>monolith + simple repo</Highlight> là lựa chọn tốt nhất!
        </Callout>

        <Heading2>📌 Tóm tắt</Heading2>

        <div className="my-6 space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5">
                <span className="text-blue-400 mt-0.5">📦</span>
                <span className="text-slate-300"><Highlight>Monorepo</Highlight> — 1 repo chứa nhiều projects, share code dễ dàng (Turborepo, Nx)</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5">
                <span className="text-purple-400 mt-0.5">🧩</span>
                <span className="text-slate-300"><Highlight>Micro FE</Highlight> — chia UI thành nhiều app nhỏ, deploy riêng (Module Federation)</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5">
                <span className="text-green-400 mt-0.5">🤝</span>
                <span className="text-slate-300"><Highlight>Kết hợp</Highlight> — Monorepo để share code + Micro FE để deploy riêng = hiệu quả nhất</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5">
                <span className="text-yellow-400 mt-0.5">⚠️</span>
                <span className="text-slate-300">Chỉ dùng khi <Highlight>team lớn + dự án phức tạp</Highlight> — đừng over-engineer!</span>
            </div>
        </div>
    </>
)

const enContent = (
    <>
        <Paragraph>
            As projects grow and teams expand, you face two questions:
            <Highlight> How to organize code for 10+ apps without chaos?</Highlight> and
            <Highlight> How to deploy individual features without affecting other apps?</Highlight>
            That&apos;s where <Highlight>Monorepo</Highlight> and <Highlight>Micro Frontend</Highlight> come in.
        </Paragraph>

        <Callout type="info">
            These two concepts solve different problems but often go together:
            Monorepo addresses <Highlight>how to organize code</Highlight>, while Micro Frontend addresses <Highlight>how to split the UI</Highlight>.
        </Callout>

        {/* ===== MONOREPO ===== */}
        <Heading2>1. Monorepo — One Repo to Rule Them All</Heading2>

        <Paragraph>
            A <Highlight>Monorepo</Highlight> stores <Highlight>multiple projects/packages in a single Git repository</Highlight>.
            Instead of each team having their own repo (polyrepo), all code lives together but is organized into independent packages.
        </Paragraph>

        <Heading3>Monorepo vs Polyrepo</Heading3>

        <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-4">
                <div className="text-blue-400 font-bold text-sm mb-2">📦 Polyrepo (traditional)</div>
                <div className="text-slate-300 text-sm font-mono space-y-0.5">
                    <div>repo-frontend/</div>
                    <div>repo-backend/</div>
                    <div>repo-shared-ui/</div>
                    <div>repo-utils/</div>
                    <div className="text-slate-500">→ 4 separate repos</div>
                </div>
            </div>
            <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-4">
                <div className="text-green-400 font-bold text-sm mb-2">🏗️ Monorepo</div>
                <div className="text-slate-300 text-sm font-mono space-y-0.5">
                    <div>my-company/</div>
                    <div>&nbsp;&nbsp;├── apps/frontend/</div>
                    <div>&nbsp;&nbsp;├── apps/backend/</div>
                    <div>&nbsp;&nbsp;├── packages/shared-ui/</div>
                    <div>&nbsp;&nbsp;└── packages/utils/</div>
                    <div className="text-slate-500">→ 1 single repo</div>
                </div>
            </div>
        </div>

        <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-4">
                <div className="text-green-400 font-bold text-sm mb-2">✅ Pros</div>
                <ul className="text-slate-300 text-sm space-y-1.5">
                    <li>• <strong>Easy code sharing</strong> between projects</li>
                    <li>• <strong>Atomic commits</strong> across multiple packages</li>
                    <li>• <strong>Unified dependency</strong> management</li>
                    <li>• <strong>Codebase-wide refactoring</strong></li>
                    <li>• <strong>Centralized CI/CD</strong></li>
                </ul>
            </div>
            <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4">
                <div className="text-red-400 font-bold text-sm mb-2">❌ Cons</div>
                <ul className="text-slate-300 text-sm space-y-1.5">
                    <li>• <strong>Large repo</strong> — slow clone/build without optimization</li>
                    <li>• <strong>Complex tooling</strong> — needs Turborepo, Nx, etc.</li>
                    <li>• <strong>Permission management</strong> challenges</li>
                    <li>• <strong>Slow CI</strong> without affected/cache strategies</li>
                    <li>• <strong>Learning curve</strong> for new team members</li>
                </ul>
            </div>
        </div>

        <Heading3>💻 Implement Monorepo with Turborepo</Heading3>

        <CodeBlock title="Create a new Monorepo">{`# Scaffold a new monorepo
npx create-turbo@latest my-monorepo

# Auto-generated structure:
my-monorepo/
├── apps/
│   ├── web/          # Next.js app
│   └── docs/         # Documentation app
├── packages/
│   ├── ui/           # Shared UI components
│   ├── eslint-config/ # Shared ESLint config
│   └── typescript-config/ # Shared TypeScript config
├── turbo.json        # Turborepo config
├── package.json      # Root workspace
└── pnpm-workspace.yaml`}</CodeBlock>

        <CodeBlock title="turbo.json">{`{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],   // Build dependencies first
      "outputs": [".next/**", "dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}`}</CodeBlock>

        <Callout type="tip">
            Turborepo has <Highlight>Remote Caching</Highlight> — if a teammate already built package X,
            you get the cached result from the cloud instead of rebuilding. Huge CI/CD time savings!
        </Callout>

        {/* ===== MICRO FRONTEND ===== */}
        <Heading2>2. Micro Frontend — Divide & Conquer the UI</Heading2>

        <Paragraph>
            <Highlight>Micro Frontend</Highlight> is an architecture that splits a large web app into
            <Highlight> multiple small, independent frontend apps</Highlight>. Each team owns a portion of the UI
            and can develop, test, and deploy independently — like microservices but for the frontend.
        </Paragraph>

        <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-4">
                <div className="text-green-400 font-bold text-sm mb-2">✅ Pros</div>
                <ul className="text-slate-300 text-sm space-y-1.5">
                    <li>• <strong>Independent deployment</strong></li>
                    <li>• <strong>Tech freedom</strong> — each team picks their stack</li>
                    <li>• <strong>Team scaling</strong> — new teams only learn their part</li>
                    <li>• <strong>Fault isolation</strong> — one part failing doesn&apos;t crash everything</li>
                    <li>• <strong>Incremental upgrades</strong></li>
                </ul>
            </div>
            <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4">
                <div className="text-red-400 font-bold text-sm mb-2">❌ Cons</div>
                <ul className="text-slate-300 text-sm space-y-1.5">
                    <li>• <strong>Complexity</strong> — setup, routing, shared state</li>
                    <li>• <strong>Bundle size</strong> — duplicate dependencies</li>
                    <li>• <strong>UX inconsistency</strong> — hard to maintain design unity</li>
                    <li>• <strong>E2E testing</strong> — difficult to test full flows</li>
                    <li>• <strong>CSS conflicts</strong></li>
                </ul>
            </div>
        </div>

        <Heading3>Implementation Approaches</Heading3>

        <div className="my-6 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
                <thead>
                    <tr className="border-b border-white/10">
                        <th className="text-left p-3 text-slate-400 font-medium">Approach</th>
                        <th className="text-left p-3 text-slate-400 font-medium">Description</th>
                        <th className="text-left p-3 text-slate-400 font-medium">When to use</th>
                    </tr>
                </thead>
                <tbody className="text-slate-300">
                    <tr className="border-b border-white/5">
                        <td className="p-3 font-semibold text-blue-400">Module Federation</td>
                        <td className="p-3">Webpack/Vite runtime module sharing</td>
                        <td className="p-3">SPA, same framework</td>
                    </tr>
                    <tr className="border-b border-white/5">
                        <td className="p-3 font-semibold text-purple-400">iframes</td>
                        <td className="p-3">Embed apps in iframes</td>
                        <td className="p-3">High isolation, legacy</td>
                    </tr>
                    <tr className="border-b border-white/5">
                        <td className="p-3 font-semibold text-green-400">Web Components</td>
                        <td className="p-3">Custom elements, Shadow DOM</td>
                        <td className="p-3">Mixed frameworks</td>
                    </tr>
                    <tr>
                        <td className="p-3 font-semibold text-yellow-400">Route-based</td>
                        <td className="p-3">Each route = separate app (reverse proxy)</td>
                        <td className="p-3">Simplest approach</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <CodeBlock title="host-app/vite.config.ts (Module Federation)">{`import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
    plugins: [
        react(),
        federation({
            name: 'host-app',
            remotes: {
                productApp: 'http://localhost:3001/assets/remoteEntry.js',
                cartApp: 'http://localhost:3002/assets/remoteEntry.js',
            },
            shared: ['react', 'react-dom']
        })
    ]
})`}</CodeBlock>

        <CodeBlock title="Usage in Host App">{`import React, { Suspense, lazy } from 'react'

const ProductList = lazy(() => import('productApp/ProductList'))
const CartSidebar = lazy(() => import('cartApp/CartSidebar'))

export default function App() {
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <ProductList /> {/* From Product Team! */}
            </Suspense>
            <Suspense fallback={<div>Loading...</div>}>
                <CartSidebar /> {/* From Cart Team! */}
            </Suspense>
        </div>
    )
}`}</CodeBlock>

        {/* ===== COMBINING ===== */}
        <Heading2>3. Monorepo + Micro Frontend Combined</Heading2>

        <Paragraph>
            In practice, many companies <Highlight>combine both</Highlight>:
            Monorepo for code organization, Micro Frontend for independent deployments.
        </Paragraph>

        <div className="my-6 space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <span className="text-blue-400 mt-0.5">💡</span>
                <span className="text-slate-300 text-sm"><strong>Monorepo</strong> enables easy code sharing (UI, utils, types) between micro-frontends</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                <span className="text-purple-400 mt-0.5">💡</span>
                <span className="text-slate-300 text-sm"><strong>Micro FE</strong> allows each app to deploy independently</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                <span className="text-green-400 mt-0.5">💡</span>
                <span className="text-slate-300 text-sm"><strong>Combined</strong> = easy sharing + independent deploys = best of both worlds</span>
            </div>
        </div>

        <Heading2>4. When to Use?</Heading2>

        <Callout type="warning">
            Don&apos;t use Monorepo or Micro Frontend just because they&apos;re &quot;cool&quot;. Only adopt when your team is large enough (10+ devs)
            and the project is complex enough. For startups or MVPs, <Highlight>monolith + simple repo</Highlight> is the best choice!
        </Callout>

        <Heading2>📌 Summary</Heading2>

        <div className="my-6 space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5">
                <span className="text-blue-400 mt-0.5">📦</span>
                <span className="text-slate-300"><Highlight>Monorepo</Highlight> — 1 repo, multiple projects, easy code sharing (Turborepo, Nx)</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5">
                <span className="text-purple-400 mt-0.5">🧩</span>
                <span className="text-slate-300"><Highlight>Micro FE</Highlight> — split UI into independent apps, deploy separately (Module Federation)</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5">
                <span className="text-green-400 mt-0.5">🤝</span>
                <span className="text-slate-300"><Highlight>Combined</Highlight> — Monorepo for sharing + Micro FE for independent deploys = most effective</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5">
                <span className="text-yellow-400 mt-0.5">⚠️</span>
                <span className="text-slate-300">Only use when <Highlight>team is large + project is complex</Highlight> — don&apos;t over-engineer!</span>
            </div>
        </div>
    </>
)

const monorepoMicroFe: BlogPost = {
    slug: 'monorepo-micro-frontend',
    title: {
        vi: 'Monorepo & Micro Frontend — Kiến trúc cho dự án lớn',
        en: 'Monorepo & Micro Frontend — Architecture for Large Projects',
    },
    description: {
        vi: 'Hiểu rõ Monorepo và Micro Frontend: ưu nhược điểm, công cụ (Turborepo, Module Federation), và cách implement vào dự án thực tế.',
        en: 'Understanding Monorepo and Micro Frontend: pros/cons, tooling (Turborepo, Module Federation), and real-world implementation.',
    },
    date: '2026-02-09',
    tags: ['Architecture', 'DevOps', 'Advanced'],
    emoji: '🏗️',
    color: '#f472b6',
    content: { vi: viContent, en: enContent },
}

export default monorepoMicroFe
