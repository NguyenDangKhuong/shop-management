# 🛍️ TheTapHoa - Tổng Quan Dự Án

## 📋 Giới Thiệu

**TheTapHoa** là hệ thống quản lý cửa hàng (Shop Management System) được xây dựng với các công nghệ hiện đại. Dự án hỗ trợ các chủ cửa hàng vừa và nhỏ quản lý sản phẩm, đơn hàng, danh mục và khách hàng một cách hiệu quả.

- **Demo:** https://thetaphoa.vercel.app
- **Tác giả:** Nguyen Dang Khuong ([@NguyenDangKhuong](https://github.com/NguyenDangKhuong))

---

## 🛠️ Tech Stack

### Frontend
| Công nghệ | Phiên bản | Mô tả |
|-----------|-----------|-------|
| **Next.js** | 15.4.10 | Framework React với App Router |
| **TypeScript** | 5.2.2 | Ngôn ngữ lập trình |
| **Ant Design** | 5.26.5 | UI Component Library |
| **Tailwind CSS** | 4.x | CSS Framework |
| **React** | 18.2.0 | UI Library |

### Backend
| Công nghệ | Mô tả |
|-----------|-------|
| **Node.js** | 22.x (LTS) |
| **MongoDB** | Database với Mongoose ODM |
| **NextAuth.js** | v5 (Beta) - Authentication |
| **Cloudinary** | Upload và quản lý hình ảnh |
| **MinIO** | Object Storage cho video |

### Testing & DevOps
| Công nghệ | Mô tả |
|-----------|-------|
| **Jest** | 29.7.0 - Testing Framework |
| **React Testing Library** | Component Testing |
| **GitHub Actions** | CI/CD Pipeline |
| **Vercel** | Deployment Platform |
| **ESLint + Prettier** | Code Quality |

---

## 📂 Cấu Trúc Thư Mục

```
shop-management/
├── 📁 src/
│   ├── 📁 app/                    # Next.js App Router
│   │   ├── 📁 (admin)/            # Admin routes (protected)
│   │   │   ├── products/          # Quản lý sản phẩm
│   │   │   ├── orders/            # Quản lý đơn hàng
│   │   │   ├── categories/        # Quản lý danh mục
│   │   │   ├── carts/             # Quản lý giỏ hàng
│   │   │   ├── facebook-posts/    # Facebook integration
│   │   │   ├── shopee-links/      # Shopee integration
│   │   │   ├── tiktok-accounts/   # TikTok integration
│   │   │   ├── tiktok-music/      # TikTok music library
│   │   │   └── veo3-tokens/       # Veo3 token management
│   │   ├── 📁 api/                # API Routes (14 endpoints)
│   │   │   ├── auth/              # NextAuth API
│   │   │   ├── clarity/           # Clarity life planner API
│   │   │   ├── flashcards/        # Algorithm flashcards API
│   │   │   ├── roadmap/           # Interview roadmap API
│   │   │   ├── translate/         # Translation API
│   │   │   ├── tweets/            # Twitter/X feed API
│   │   │   ├── vocabulary/        # Vocabulary push API
│   │   │   ├── veo3-tokens/       # Veo3 token API
│   │   │   └── ...                # shopee-links, gen-video, push
│   │   ├── 📁 blogs/              # Blog engine (bilingual VI/EN)
│   │   │   └── posts/roadmap-sections/  # Frontend interview roadmap
│   │   ├── 📁 tweets/             # Twitter/X feed pages
│   │   ├── 📁 flashcards/         # Algorithm pattern flashcards
│   │   ├── 📁 clarity/            # Life planning dashboard
│   │   ├── 📁 leetcode/           # LeetCode practice page
│   │   ├── 📁 translate/          # Translation tool
│   │   ├── 📁 vocabulary-flashcards/ # Vocabulary learning
│   │   ├── 📁 cv/                 # CV page (PDF viewer)
│   │   ├── 📁 projects/           # Projects portfolio page
│   │   ├── 📁 login/              # Đăng nhập
│   │   └── 📁 register/           # Đăng ký
│   │
│   ├── 📁 components/             # React Components
│   │   ├── 📁 shop/               # Admin dashboard components
│   │   ├── 📁 landing/            # Landing page components
│   │   ├── 📁 ui/                 # Reusable UI components
│   │   └── 📁 providers/          # Context providers
│   │
│   ├── 📁 models/                 # Mongoose Models (15+ models)
│   ├── 📁 actions/                # Server Actions (auth, cloudinary, CRUD)
│   ├── 📁 utils/                  # Utility functions
│   ├── 📁 hooks/                  # Custom React Hooks
│   ├── 📁 types/                  # TypeScript type definitions
│   └── 📁 lib/                    # Library configurations (Redis cache)
│
├── 📁 docs/                       # Project documentation (26 files)
├── 📁 public/                     # Static assets
├── 📁 .github/workflows/          # GitHub Actions CI/CD
└── 📁 .githooks/                  # Git hooks (pre-push)
```

---

## ✨ Tính Năng Chính

### 1. 👤 Quản Lý Người Dùng
- Đăng ký / Đăng nhập với NextAuth.js v5
- Phân quyền Role-based (Admin: role=0, User: role=1)
- Bảo vệ route admin tự động qua middleware
- Session management với JWT

### 2. 📦 Quản Lý Sản Phẩm
- CRUD đầy đủ (Create, Read, Update, Delete)
- Upload hình ảnh qua Cloudinary
- Quản lý tồn kho (storage)
- SKU code cho từng sản phẩm
- Phân loại theo danh mục
- Tìm kiếm và lọc sản phẩm

### 3. 📋 Quản Lý Đơn Hàng
- Tạo và theo dõi đơn hàng
- Tính tiền thối lại tự động
- Lịch sử đơn hàng
- In hóa đơn (react-to-print)

### 4. 🏷️ Quản Lý Danh Mục
- CRUD danh mục sản phẩm
- Tổ chức sản phẩm theo category

### 5. 🛒 Giỏ Hàng
- Thêm/xóa sản phẩm
- Quản lý số lượng
- Tính toán giá realtime

### 6. 📱 Tích Hợp Social Media
- Facebook Posts management
- Shopee Links
- TikTok Accounts & Scheduled Posts
- TikTok Music library

### 7. 🔍 QR Code Scanner
- Quét mã vạch sản phẩm (html5-qrcode)
- Tạo barcode (react-barcode)

### 8. 📝 Blog Engine (Bilingual)
- Blog system với VI/EN switching
- **Frontend Interview Roadmap** — 6 phases, 96 topics với concept summaries
- Algorithm Patterns blog với code examples
- Callout components, TopicModal với interview-ready concepts
- SEO optimized (sitemap, RSS feed, meta tags)

### 9. 🐦 Twitter/X Feed
- Xem tweets qua GraphQL API (cookies-based auth)
- Tabs: For You, Following, Pinned, Likes
- User profile pages
- Media display (images, videos)
- Collapse/expand để tiết kiệm bandwidth

### 10. 🧠 Algorithm Flashcards
- 7 core patterns: Hash Map, Two Pointers, Sliding Window, Stack, BFS/DFS, Binary Search, DP
- Spaced repetition system
- Code examples với syntax highlighting

### 11. 🎯 Clarity (Life Planner)
- Goals, Habits, Weekly review, Tasks, Reflection tabs
- LocalStorage-based (no server needed)
- Beautiful dark mode UI

### 12. 🌐 Translation & Vocabulary
- Translation tool (Google Translate API)
- Vocabulary flashcards với push notifications
- Systemd timer trên VPS gửi reminder mỗi giờ

### 13. 🎬 Veo3 Video Generation
- Token management cho Google Veo3
- Prompt templates cho product videos
- AutoFlow: tự động tạo video từ product → prompt → Veo3
- Bridge architecture (browser ↔ VPS)

---

## 🔐 Authentication Flow

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   Client    │────▶│  Middleware  │────▶│   NextAuth  │
│  (Browser)  │     │ (auth.edge)  │     │   (auth.ts) │
└─────────────┘     └──────────────┘     └─────────────┘
                           │
                           ▼
                    ┌──────────────┐
                    │ auth.config  │
                    │ - JWT tokens │
                    │ - Role check │
                    │ - Callbacks  │
                    └──────────────┘
```

**Protected Routes (Admin only - role=0):**
- `/products`
- `/orders`
- `/categories`
- `/carts`

---

## 🗄️ Database Models

| Model | Mô tả | Fields chính |
|-------|-------|--------------|
| **Product** | Sản phẩm | name, sku, price, storage, categoryId, imageUrl |
| **Order** | Đơn hàng | orderId, totalPrice, products[], customerCash, exchange |
| **Category** | Danh mục | name, description |
| **Customer** | Khách hàng | name, phone, email, address |
| **User** | Người dùng | name, email, password, role |
| **Cart** | Giỏ hàng | userId, products[] |
| **ProductCart** | Sản phẩm trong giỏ | productId, quantity, price |
| **MediaFile** | File media | url, publicId, type |
| **FacebookPost** | Bài FB | content, images, status |
| **ShopeeLink** | Link Shopee | productId, shopeeUrl |
| **TikTokAccount** | TK TikTok | username, accessToken |
| **TikTokScheduledPost** | Bài TikTok | content, scheduledTime |
| **AutoFlow** | AutoFlow | accountId, productId, productTitle, autoFlowUrl, shopeeLinkId, enabled, promptIds[], videoFiles[] |
| **Prompt** | Prompt (độc lập) | accountId, title, content, referenceImages[] |
| **Veo3Token** | Veo3 Token | value, tokenCheckStatus |
| **Change** | Changelog | description, timestamp |

---

## 🧪 Testing

### Test Coverage
- **Total Test Suites:** 48
- **Total Tests:** 591 (587 passed, 4 skipped)
- **Framework:** Jest + React Testing Library
- **Pre-push hook:** Runs lint + tests + build before every push

### Commands
```bash
npm test              # Chạy tất cả tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

---

## 🚀 CI/CD Pipeline

### GitHub Actions Workflow (`.github/workflows/ci.yml`)

```
Trigger: Push/PR to master
    │
    ├── 1. Checkout code
    ├── 2. Setup Node.js 22.x
    ├── 3. npm ci (Install dependencies)
    ├── 4. npm run lint (ESLint)
    ├── 5. npm run test (Jest)
    └── 6. npm run build (Production build)
```

### Pre-Push Git Hooks
- ESLint check
- Jest tests (26 tests)
- Production build verification

---

## 📝 NPM Scripts

| Script | Mô tả |
|--------|-------|
| `npm run dev` | Chạy development server |
| `npm run build` | Build production |
| `npm run start` | Start production server |
| `npm run lint` | Kiểm tra ESLint |
| `npm run lint:fix` | Tự động fix ESLint |
| `npm run format` | Format code với Prettier |
| `npm test` | Chạy Jest tests |
| `npm run test:coverage` | Coverage report |
| `npm run test:perf` | Lighthouse performance test |

---

## 🔧 Cấu Hình Môi Trường

File `.env.local` cần có các biến sau:

```env
# MongoDB
MONGO_USER_NAME=...
MONGO_PASSWORD=...
MONGO_CLUSTER_URL=...
MONGO_DB_NAME=...

# NextAuth
NEXTAUTH_SECRET=...
NEXTAUTH_URL=...

# Cloudinary
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

# MinIO (optional)
MINIO_ENDPOINT=...
MINIO_ACCESS_KEY=...
MINIO_SECRET_KEY=...
```

---

## 📚 Documentation Files

| File | Nội dung |
|------|----------|
| [README.md](../README.md) | Hướng dẫn cài đặt & sử dụng |
| [TESTING.md](../TESTING.md) | Hướng dẫn testing chi tiết |
| [CICD.md](../CICD.md) | CI/CD Pipeline documentation |
| [PRE_PUSH_HOOK.md](../PRE_PUSH_HOOK.md) | Git hooks documentation |
| [AUTOFLOW.md](AUTOFLOW.md) | AutoFlow feature documentation |
| [PROMPT.md](PROMPT.md) | Prompt Library, Veo3 templates & design notes |
| [FORGOT_PASSWORD.md](FORGOT_PASSWORD.md) | Forgot Password feature |

---

## 🏗️ Kiến Trúc Hệ Thống

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT (Browser)                      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │ Landing Page│  │ Login/Signup│  │ Admin Dashboard     │  │
│  │ (Public)    │  │ (Public)    │  │ (Protected: role=0) │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                        NEXT.JS SERVER                        │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                     Middleware                          ││
│  │              (Auth check via NextAuth)                  ││
│  └─────────────────────────────────────────────────────────┘│
│  ┌─────────────────┐  ┌─────────────────────────────────┐  │
│  │  Server Actions │  │        API Routes               │  │
│  │  - auth.ts      │  │  /api/products, /api/orders     │  │
│  │  - cloudinary   │  │  /api/categories, /api/tiktok   │  │
│  │  - orders       │  │  ...                            │  │
│  └─────────────────┘  └─────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
          ┌───────────────────┼───────────────────┐
          ▼                   ▼                   ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│    MongoDB      │ │   Cloudinary    │ │      MinIO      │
│   (Database)    │ │   (Images)      │ │    (Videos)     │
└─────────────────┘ └─────────────────┘ └─────────────────┘
```

---

## 📱 Responsive Design

- ✅ Desktop (1920px+)
- ✅ Laptop (1024px - 1919px)
- ✅ Tablet (768px - 1023px)
- ✅ Mobile (320px - 767px)

Sử dụng `react-device-detect` để tối ưu trải nghiệm trên từng thiết bị.

---

## ⚡ Performance Features

- **Server-Side Rendering (SSR)** với Next.js 15
- **Incremental Static Regeneration (ISR)**
- **Image Optimization** với Cloudinary
- **Bundle Analyzer** (`npm run build-ananalyzer`)
- **Lighthouse Performance Testing**
- **Vercel Analytics & Speed Insights**

---

## 🔮 Tính Năng Nâng Cao

1. **Drag & Drop** - Sắp xếp sản phẩm với @dnd-kit
2. **Email Service** - Gửi email với Nodemailer
3. **Idle Detection** - Tự động logout với react-idle-timer
4. **i18n Ready** - Hỗ trợ đa ngôn ngữ (next-i18next)
5. **Form Validation** - Zod schema validation

---

## 🌐 Public Pages

| Route | Mô tả |
|-------|-------|
| `/` | Landing page - Portfolio cá nhân |
| `/blogs` | Blog listing (bilingual VI/EN) |
| `/blogs/[slug]` | Blog post detail |
| `/cv` | CV page - Hiển thị PDF CV full-screen |
| `/projects` | Projects page - Danh sách projects |
| `/tweets` | Twitter/X feed (For You, Following, Pinned, Likes) |
| `/flashcards` | Algorithm pattern flashcards |
| `/clarity` | Life planning dashboard |
| `/leetcode` | LeetCode practice page |
| `/translate` | Translation tool |
| `/vocabulary-flashcards` | Vocabulary learning flashcards |
| `/login` | Đăng nhập |
| `/register` | Đăng ký |

---

## 🏗️ Infrastructure

| Service | Provider | Purpose |
|---------|----------|---------|
| **Hosting** | Vercel | Next.js deployment, custom domain `shop.thetaphoa.store` |
| **Database** | MongoDB Atlas (free tier) | Primary database |
| **Cache** | Redis (Upstash) | API response caching |
| **Images** | Cloudinary | Image upload & optimization |
| **Videos** | MinIO (self-hosted on VPS) | Video storage for Veo3 |
| **VPS** | Oracle Cloud (free tier) | ARM64, 4 CPU, 24GB RAM — runs 15+ Docker containers |
| **DNS** | Cloudflare + Dynu DDNS | Domain routing |
| **Tunnel** | Cloudflare Tunnel (`esxi-tunnel` + `vps-tunnel`) | Expose home/VPS services |
| **VPN** | Tailscale | Private network, SSH access |
| **CI/CD** | GitHub Actions + Pre-push hooks | Lint → Test → Build |

Chi tiết: [ORACLE_VPS.md](./ORACLE_VPS.md)

---

*Tài liệu cập nhật: 23/03/2026*
