# 🔐 Forgot Password

## 📋 Tổng quan

Hệ thống quên mật khẩu cho phép user reset password qua email. Flow: nhập email → nhận link reset → đặt mật khẩu mới.

### Flow

```
1. User nhấn "Forgot Password?" ở trang login
2. Nhập email → POST /api/auth/forgot-password
3. API tạo token (SHA-256 hash) → gửi email chứa reset link
4. User click link → /reset-password?token=xxx&email=yyy
5. Nhập mật khẩu mới → POST /api/auth/reset-password
6. API verify token + update password → redirect login
```

### Bảo mật

- Token hash bằng **SHA-256** trước khi lưu DB
- Token hết hạn sau **1 giờ** (TTL index tự xóa)
- One-time use — xóa sau khi dùng
- API luôn trả `success: true` dù email có tồn tại hay không (chống enumeration)

---

## 🗄️ Database Model

### PasswordResetToken (`src/models/PasswordResetToken.ts`)

| Field | Type | Required | Mô tả |
|-------|------|----------|-------|
| `email` | String | ✅ | Email user |
| `token` | String | ✅ | SHA-256 hash của token |
| `expiresAt` | Date | ✅ | Thời điểm hết hạn |

**Collection:** `passwordresettokens`
TTL index trên `expiresAt` — MongoDB tự xóa document khi hết hạn.

---

## 🔌 API Endpoints

### POST `/api/auth/forgot-password`

```json
{ "email": "user@example.com" }
```

**Response:** `{ "success": true }` (luôn trả success)

**Logic:**
1. Tìm user theo email (nếu không có → return success)
2. Xóa token cũ
3. Tạo `crypto.randomUUID()` → hash SHA-256 → lưu DB
4. Gửi email chứa link: `{APP_URL}/reset-password?token={rawToken}&email={email}`

### POST `/api/auth/reset-password`

```json
{
  "email": "user@example.com",
  "token": "raw-token-value",
  "password": "newpassword123"
}
```

**Response:**
- `{ "success": true }` — password đã được update
- `{ "success": false, "error": "Invalid or expired token" }` — token sai/hết hạn

---

## 🖥️ UI

### ForgotPasswordForm (`src/components/shop/login/ForgotPasswordForm.tsx`)

- Dark glassmorphism theme matching LoginForm
- Form: email input + submit button
- Success state: hiển thị "Check your email" message
- Link "Back to Login"

### ResetPasswordForm (`src/components/shop/login/ResetPasswordForm.tsx`)

- Nhận `token` và `email` từ URL search params
- Form: new password + confirm password
- Validation: match passwords, min 6 chars
- Success → auto redirect to login sau 3 giây
- Invalid link state: hiển thị khi thiếu token/email

### Pages

| Route | File |
|-------|------|
| `/forgot-password` | `src/app/forgot-password/page.tsx` |
| `/reset-password` | `src/app/reset-password/page.tsx` (Suspense wrapper) |

---

## 📧 Email Config

**File:** `src/utils/sendEmail.ts`

| Env Var | Default | Mô tả |
|---------|---------|-------|
| `SMTP_HOST` | `smtp.ethereal.email` | SMTP server |
| `SMTP_PORT` | `587` | SMTP port |
| `SMTP_USER` | Ethereal test user | SMTP username |
| `SMTP_PASS` | Ethereal test pass | SMTP password |
| `EMAIL_FROM` | `"TheTapHoa" <noreply@...>` | Sender address |
| `NEXT_PUBLIC_APP_URL` | `http://localhost:3000` | Base URL cho reset link |

> [!TIP]
> Dev mode: không cần set env vars, tự dùng Ethereal. Check console log cho Preview URL.

> [!IMPORTANT]
> Production: cần set SMTP env vars thật (Gmail, SendGrid...) trong `.env.local`.

---

## 🧪 Testing

| Test file | Tests |
|-----------|-------|
| `__tests__/ForgotPasswordForm.test.tsx` | 6 |
| `__tests__/ResetPasswordForm.test.tsx` | 7 |

```bash
npx jest --testPathPattern="ForgotPassword|ResetPassword"
```

---

*Tài liệu tạo: 19/02/2026*
