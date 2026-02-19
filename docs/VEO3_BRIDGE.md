# 🌉 Veo3 WebSocket Bridge — Hệ thống Gen Video tự động

## 📋 Tổng quan

Hệ thống sử dụng **WebSocket Bridge** để kết nối Chrome Extension ↔ Next.js Server, cho phép:
- Auto-lấy `ya29` bearer token từ extension (real-time)
- Auto-capture `siteKey` từ reCAPTCHA Enterprise URL
- On-demand gen reCAPTCHA token trên domain `labs.google` (tránh 403)
- Chỉ cần gửi `prompt` → server tự lấy hết credentials → gọi Veo3 API

### Kiến trúc

```
┌──────────────────┐     WebSocket (3001)     ┌──────────────────┐
│  Chrome Extension │ ◄──────────────────────► │   WS Bridge      │
│  (trên Flow page) │                          │  :3001 WS        │
│                    │   ya29_push              │  :3002 HTTP API  │
│  • Capture ya29    │ ──────────────────────►  │                  │
│  • Gen reCAPTCHA   │   recaptcha_push         │  • /status       │
│                    │ ──────────────────────►  │  • /token/fresh  │
│                    │ ◄────────────────────── │  • /recaptcha/fresh│
│                    │   request_recaptcha      └────────┬─────────┘
└──────────────────┘                                    │ HTTP
                                                        │
                                               ┌────────▼─────────┐
                                               │  Next.js Server   │
                                               │                   │
                                               │  POST /api/gen-video
                                               │  GET  /api/gen-video
                                               │  GET  /api/veo3-tokens
                                               └───────────────────┘
```

---

## 🚀 Cách chạy (Local / Ubuntu)

### 1. Cài dependencies

```bash
cd shop-management
npm install   # ws package đã có trong dependencies
```

### 2. Chạy WS Bridge + Dev Server

```bash
# Terminal 1 — WS Bridge
npm run ws-bridge

# Terminal 2 — Next.js
npm run dev

# Hoặc chạy cả 2:
npm run dev:all
```

### 3. Setup Chrome Extension

1. Mở `chrome://extensions/` → bật **Developer mode**
2. **Load unpacked** → chọn folder `chrome-extension/flow-token-extractor/`
3. Mở [Flow page](https://labs.google/fx/vi/tools/flow/) và login Google
4. Extension tự connect WS Bridge + push ya29 + auto-capture siteKey
5. Bấm **📤 PUT** trên popup để đẩy tất cả data (ya29, projectId, sessionId, siteKey) lên server

---

## � Các bước sử dụng

### Bước 1: Check hệ thống sẵn sàng

```bash
curl -s https://shop.thetaphoa.store/api/gen-video
```

Kết quả cần: `"ready": true`, `"connected": true`, `"hasToken": true`

### Bước 2: Gọi API gen video

```bash
curl -s -X POST https://shop.thetaphoa.store/api/gen-video \
  -H 'Content-Type: application/json' \
  -d '{"prompt": "A cute cat sitting on the moon, cinematic"}'
```

Chỉ cần gửi `prompt` — server tự động:
1. Lấy `ya29` token từ WS Bridge (hoặc API fallback)
2. Lấy `reCAPTCHA` token từ Extension (truyền `siteKey` từ DB)
3. Lấy `projectId`, `sessionId`, `siteKey` từ `/api/veo3-tokens`
4. Gọi Veo3 API
5. Nếu reCAPTCHA bị reject → **auto-retry** lên đến 3 lần (chờ 3s giữa mỗi lần)

---

## 🔌 API Endpoints

### POST `/api/gen-video` — Tạo video

**Body params:**

| Param | Bắt buộc | Default | Mô tả |
|-------|---------|---------|-------|
| `prompt` | ✅ | — | Nội dung video |
| `aspectRatio` | ❌ | `VIDEO_ASPECT_RATIO_PORTRAIT` | Hoặc `VIDEO_ASPECT_RATIO_LANDSCAPE` |
| `seed` | ❌ | Random | Seed cho video |
| `referenceImages` | ❌ | — | `[{imageUsageType, mediaId}]` |

> [!NOTE]
> Mặc định gen video **portrait** (dọc). Muốn landscape thêm `"aspectRatio": "VIDEO_ASPECT_RATIO_LANDSCAPE"`.
> reCAPTCHA tự **auto-retry** 3 lần nếu bị Google reject.

**Response thành công:**
```json
{
  "success": true,
  "data": {
    "operations": [
      {
        "operation": { "name": "97dd0f76989f9288286fa1cf340b1e14" },
        "sceneId": "6a091dfb-ba2e-4e23-807e-2c306e8d2c69",
        "status": "MEDIA_GENERATION_STATUS_PENDING"
      }
    ],
    "remainingCredits": 30
  },
  "meta": {
    "tokenSource": "ws-bridge (4s old)",
    "recaptchaSource": "extension",
    "videoModelKey": "veo_3_1_t2v_fast",
    "projectId": "13a515c2-59d7-42ae-a0f8-2ef4905e047f",
    "attempt": 2
  }
}
```

> [!TIP]
> `attempt: 2` nghĩa là lần 1 bị reCAPTCHA reject, retry lần 2 thành công.

---

### GET `/api/gen-video` — Check trạng thái hệ thống

```bash
curl https://shop.thetaphoa.store/api/gen-video
```

```json
{
  "success": true,
  "ready": true,
  "bridge": {
    "connected": true,
    "hasToken": true,
    "tokenAge": 15,
    "projectId": "13a515c2-...",
    "sessionId": ";1771346145812"
  }
}
```

| Field | Ý nghĩa |
|-------|---------|
| `ready` | `true` = sẵn sàng gen video |
| `connected` | Extension đã kết nối WS Bridge |
| `hasToken` | Có ya29 token |
| `tokenAge` | Token bao nhiêu giây rồi |

---

## 📮 Gọi từ Postman / n8n

### Postman

**Check trạng thái (GET):**
- Method: `GET`
- URL: `https://shop.thetaphoa.store/api/gen-video`

**Gen video (POST):**
- Method: `POST`
- URL: `https://shop.thetaphoa.store/api/gen-video`
- Headers: `Content-Type: application/json`
- Body (raw JSON):
```json
{
  "prompt": "A cute cat on the moon, cinematic"
}
```

### n8n

**Check trạng thái (HTTP Request node):**

| Setting | Value |
|---------|-------|
| Method | `GET` |
| URL | `https://shop.thetaphoa.store/api/gen-video` |

Dùng `{{ $json.bridge.ready }}` để check trước khi gen.

**Gen video (HTTP Request node):**

| Setting | Value |
|---------|-------|
| Method | `POST` |
| URL | `https://shop.thetaphoa.store/api/gen-video` |
| Body Content Type | JSON |
| Specify Body | Using Fields Below |

Body fields:

| Name | Value |
|------|-------|
| `prompt` | `{{ $json.prompt }}` |
| `aspectRatio` | `VIDEO_ASPECT_RATIO_PORTRAIT` (hoặc bỏ trống = portrait) |

Response: dùng `{{ $json.success }}` để check, `{{ $json.data.operations[0].operation.name }}` để lấy operation ID.

---

## 🌐 WS Bridge HTTP API (port 3002)

Dùng internal, chỉ expose qua tunnel nếu cần production.

| Endpoint | Mô tả |
|----------|-------|
| `GET /status` | Trạng thái bridge + extension |
| `GET /token` | Token ya29 mới nhất (cached) |
| `GET /token/fresh` | Yêu cầu extension gửi token mới nhất |
| `GET /recaptcha/fresh` | Yêu cầu extension gen reCAPTCHA mới |

---

## 🔧 Chrome Extension — Flow Token Extractor

### Chức năng chính

1. **Auto-capture ya29** — Bắt token từ header Authorization khi Flow page gọi API
2. **Auto-capture siteKey** — Bắt siteKey từ reCAPTCHA Enterprise URL qua `webRequest` listener
3. **Push instant via WS** — Gửi token ngay lập tức qua WebSocket (kèm sessionId, projectId)
4. **On-demand reCAPTCHA** — Nhận yêu cầu từ WS Bridge, gen token bằng `grecaptcha.enterprise.execute()` trên domain `labs.google`
5. **PUT all-in-one** — Nút 📤 PUT gửi tất cả data (ya29, projectId, sessionId, siteKey) lên `/api/veo3-tokens`
6. **Auto-reconnect** — Tự kết nối lại WS Bridge nếu bị mất

### Files quan trọng

| File | Mô tả |
|------|-------|
| `background.js` | WS client, capture ya29, handle requests |
| `injector.js` | Inject vào Flow page, hook `grecaptcha`, intercept fetch |
| `content.js` | Bridge giữa injector ↔ background |
| `popup.html/js` | UI popup hiển thị trạng thái |
| `manifest.json` | Permissions + config |

---

## 🔑 Quản lý siteKey

reCAPTCHA Enterprise cần `siteKey` để gen token. Extension **tự động bắt siteKey** từ reCAPTCHA URL thông qua `webRequest` listener — không cần lấy thủ công.

### Auto-capture siteKey

Khi Flow page load reCAPTCHA, extension bắt URL chứa `recaptcha/enterprise` và extract param `k=` → lưu vào `chrome.storage` → hiển thị trên popup.

SiteKey được gửi lên server khi:
- Bấm **📤 PUT** trên popup (gửi cùng ya29, projectId, sessionId)
- Extension auto-POST qua WS bridge

### Lưu siteKey thủ công (backup)

```bash
# Nếu cần lưu thủ công
curl -X PUT http://localhost:3000/api/veo3-tokens \
  -H 'Content-Type: application/json' \
  -d '{"id": "TOKEN_ID", "siteKey": "6LdsFiUsAAAAAIjVDZcuLhaHiDn5nnHVXVRQGeMV"}'
```

> [!IMPORTANT]
> Extension auto-capture siteKey khi load Flow page → **không cần warm up**.
> Nếu siteKey chưa được capture, gen reCAPTCHA sẽ dùng siteKey từ DB.

---

## 🏭 Production Setup

Next.js deploy trên server, extension + WS Bridge chạy trên máy Ubuntu local.

### 1. Tạo Cloudflare Tunnel trên Ubuntu

```bash
# Cài cloudflared
curl -L https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -o cloudflared
chmod +x cloudflared

# Tạo named tunnel trỏ domain ws.thetaphoa.store → localhost:3002
./cloudflared tunnel --url http://localhost:3002 --hostname ws.thetaphoa.store
```

### 2. Set env variable

```env
# .env.local (local dev)
WS_BRIDGE_URL=http://localhost:3002

# .env.production
WS_BRIDGE_URL=https://ws.thetaphoa.store
```

### 3. Code đã support env variable

Route `/api/gen-video` dùng `process.env.WS_BRIDGE_URL`, default `http://localhost:3002`.

> [!TIP]
> Domain `ws.thetaphoa.store` cố định, không đổi mỗi lần restart.

---

## 📁 Files liên quan

| File | Mô tả |
|------|-------|
| `scripts/ws-bridge.js` | WebSocket Bridge server |
| `src/app/api/gen-video/route.ts` | API tạo video (POST) + check status (GET) |

| `src/app/api/veo3-tokens/route.ts` | CRUD ya29 tokens (DB) |
| `src/models/Veo3Token.ts` | Mongoose model (ya29, projectId, sessionId, siteKey) |
| `chrome-extension/flow-token-extractor/` | Chrome Extension folder |
| `package.json` | Scripts: `ws-bridge`, `dev:all` |

---

## 💡 Lưu ý quan trọng

1. **Flow page phải mở** — Extension cần ít nhất 1 tab Flow (`labs.google/fx/`) đang mở
2. **Google account đã login** — Flow page phải login Google account có quyền dùng Veo3
3. **siteKey auto-capture** — Extension tự bắt siteKey từ reCAPTCHA URL, không cần warm up
4. **Auto-retry** — reCAPTCHA tự retry 3 lần (chờ 3s mỗi lần) nếu bị Google reject
5. **ya29 token hết hạn ~1 giờ** — Extension auto-capture token mới khi Flow page gọi API
6. **Mặc định portrait** — Không truyền `aspectRatio` → gen video dọc
7. **Admin page** — Trang `/veo3-tokens` hiển thị detail card view với nút copy cho từng field

---

## 🧪 Test nhanh từ máy AI server

```bash
# 1. Check hệ thống sẵn sàng chưa
curl -s https://shop.thetaphoa.store/api/gen-video | python3 -m json.tool

# 2. Gen video portrait (mặc định)
curl -s -X POST https://shop.thetaphoa.store/api/gen-video \
  -H 'Content-Type: application/json' \
  -d '{"prompt": "A cute cat on the moon, cinematic lighting"}' | python3 -m json.tool

# 3. Gen video landscape
curl -s -X POST https://shop.thetaphoa.store/api/gen-video \
  -H 'Content-Type: application/json' \
  -d '{"prompt": "A sunset over the ocean", "aspectRatio": "VIDEO_ASPECT_RATIO_LANDSCAPE"}' | python3 -m json.tool
```

---

*Cập nhật: 19/02/2026 — Auto-capture siteKey, bỏ auto-gen reCAPTCHA/Gen Token, PUT gửi kèm siteKey, admin page detail card view*
