# 🔐 Authentication & Authorization

## 📋 Tổng quan

Hệ thống auth sử dụng **NextAuth v5** với **Credentials provider** và **JWT strategy**. Hỗ trợ:
- JWT rotation (1-day maxAge, 7-day refresh window)
- Bcrypt password hashing với auto-migration từ plain text
- Role-based access control (Admin: `role=0`, User: `role=1`)

---

## 🔄 JWT Rotation

### Flow

```
Login → JWT issued (1-day TTL, loginAt timestamp)
  ↓
API Request → jwt callback checks loginAt
  ↓
├── < 7 days from login → token.exp refreshed (+1 day)
└── > 7 days from login → token.expired = true → session cleared → redirect /login
```

### Configuration

| Param | Value | Mô tả |
|-------|-------|-------|
| `JWT_MAX_AGE` | 86400s (1 ngày) | Thời gian sống mỗi JWT |
| `REFRESH_WINDOW` | 604800s (7 ngày) | Thời gian tối đa tính từ lần login đầu |

**File:** `auth.config.ts`

### Token Fields

| Field | Type | Mô tả |
|-------|------|-------|
| `role` | number | 0 = admin, 1 = user |
| `id` | string | User ID từ MongoDB |
| `loginAt` | number | Unix timestamp lần login đầu |
| `exp` | number | Unix timestamp hết hạn (auto-refreshed) |
| `expired` | boolean | `true` khi vượt quá 7-day window |

---

## 🔑 Password Hashing

- **Thuật toán:** bcryptjs, 10 salt rounds
- **Register:** Hash password trước khi lưu DB
- **Login:** `bcrypt.compareSync()` để verify
- **Auto-migration:** Plain text passwords tự động hash sang bcrypt khi user login thành công

---

## 🛡️ Route Protection

### Strategy: Protect All, Whitelist Public

Tất cả routes đều yêu cầu login + admin (`role=0`), trừ public routes.

### Public Routes (No auth)

`/`, `/cv`, `/projects`, `/login`, `/register`, `/privacy`, `/terms`, `/shopee-links`

### Protected Routes (Require admin login)

Tất cả routes khác: `/products`, `/orders`, `/categories`, `/carts`, `/facebook-posts`, `/tiktok-accounts`, `/veo3-tokens`, ...

### Middleware Logic

```
Request → authorized() callback
  ↓
├── Public route → ✅ Allow
└── Protected route
      ├── Not logged in → ❌ Redirect /login
      ├── role !== 0 → ❌ Redirect /
      └── role === 0 → ✅ Allow
```

---

## 📁 Files

| File | Mô tả |
|------|-------|
| `auth.config.ts` | JWT config, callbacks, route protection |
| `auth.ts` | NextAuth setup, Credentials provider, bcrypt |
| `src/actions/auth.ts` | Server actions: authenticate, register, logout |
| `src/models/User.ts` | User model (name, email, password, role) |
| `src/middleware.ts` | Next.js middleware (uses auth.config) |

## 🧪 Tests

| File | Tests | Covers |
|------|-------|--------|
| `src/__tests__/auth.config.test.ts` | 27 | JWT rotation, session, route auth (8 public + 7 protected) |
| `src/actions/__tests__/auth.test.ts` | 9 | authenticate, register (bcrypt), logout |

---

## 🌐 Proxy Domain Login Redirect

### Vấn đề

Login qua VPS reverse proxy (`khuong.theworkpc.com`) sẽ 500 Error vì NextAuth v5 dùng `__Host-` cookie prefix — bắt buộc match domain. Browser từ chối lưu cookie cross-domain.

### Workaround

Hook `useLoginUrl` (`src/hooks/useLoginUrl.ts`) tự detect hostname:
- Trên proxy domain (vd: `khuong.theworkpc.com`) → nút Login trỏ sang `thetaphoa.vercel.app/login`
- Trên domain chính (`shop.thetaphoa.store` / `thetaphoa.vercel.app` / `localhost`) → giữ `/login` (relative)

### Config

| Constant | File | Mô tả |
|----------|------|-------|
| `ADMIN_URL` | `src/utils/constants.ts` | URL admin app (default: `https://thetaphoa.vercel.app`) |
| `SITE_DOMAIN` | `src/utils/constants.ts` | Domain chính (default: `shop.thetaphoa.store`) |

### Files

| File | Mô tả |
|------|-------|
| `src/hooks/useLoginUrl.ts` | Hook detect hostname → return login URL |
| `src/components/landing/LandingPage.tsx` | Sử dụng `useLoginUrl()` cho 2 login links |

---

## 🔑 API Key Auth (n8n / Automation)

### Tổng quan

Admin API routes hỗ trợ 2 cách auth:
- **Session cookie** — browser admin (không đổi)
- **API key** — n8n, cron, automation gọi từ bên ngoài

### Flow

```
Request đến admin API route
  ↓
├── Có header x-api-key hợp lệ? → ✅ Allow (n8n)
├── Có session cookie? → ✅ Allow (browser admin)
└── Không có gì? → ❌ 401 Unauthorized
```

### Protected Admin API Paths

```
/api/product, /api/products, /api/categories, /api/category,
/api/orders, /api/order, /api/facebook-posts,
/api/tiktok, /api/tiktok-accounts, /api/tiktok-music,
/api/tiktok-products, /api/tiktok-scheduled-posts,
/api/prompts, /api/autoflows, /api/r2-video,
/api/veo3-media, /api/check-connection
```

### Setup

1. **Gen key:** `openssl rand -hex 32`
2. **Env:** Thêm `ADMIN_API_KEY=<key>` vào `.env.local` + Vercel
3. **n8n:** Header Auth → Name: `x-api-key`, Value: `<key>`

### Cách dùng

```bash
# n8n / curl
curl -X GET https://domain.com/api/products \
  -H "x-api-key: <ADMIN_API_KEY>"
```

> **Lưu ý:** Browser admin KHÔNG cần API key — session cookie tự gửi kèm.

---

*Tài liệu tạo: 11/02/2026*
*Cập nhật: 16/02/2026 — Protect all routes, add /shopee-links to public*
*Cập nhật: 15/03/2026 — Proxy domain login redirect workaround*
*Cập nhật: 22/03/2026 — Admin API key auth cho n8n/automation*
