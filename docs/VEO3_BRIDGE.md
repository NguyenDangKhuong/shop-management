# 🌉 Veo3 WebSocket Bridge — Hệ thống Gen Video tự động

## 📋 Tổng quan

Hệ thống sử dụng **WebSocket Bridge** để kết nối Chrome Extension ↔ Next.js Server, cho phép:
- Auto-lấy `ya29` bearer token từ extension (real-time)
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
                                               │  GET  /api/veo3-recaptcha
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
4. Extension tự connect WS Bridge + push ya29

### 4. Chạy 24/7 với PM2 (Ubuntu)

```bash
npm install -g pm2

pm2 start scripts/ws-bridge.js --name ws-bridge
pm2 start npm --name shop-dev -- run dev

pm2 save
pm2 startup   # tự start khi reboot
```

---

## 🔌 API Endpoints

### POST `/api/gen-video` — Tạo video

```bash
curl -X POST http://localhost:3000/api/gen-video \
  -H 'Content-Type: application/json' \
  -d '{"prompt": "A cute cat sitting on the moon"}'
```

**Body params:**

| Param | Bắt buộc | Default | Mô tả |
|-------|---------|---------|-------|
| `prompt` | ✅ | — | Nội dung video |
| `aspectRatio` | ❌ | `VIDEO_ASPECT_RATIO_LANDSCAPE` | Hoặc `VIDEO_ASPECT_RATIO_PORTRAIT` |
| `seed` | ❌ | Random | Seed cho video |
| `referenceImages` | ❌ | — | `[{imageUsageType, mediaId}]` |

> [!NOTE]
> `bearerToken`, `recaptchaToken`, `sessionId`, `projectId` đều tự lấy từ WS Bridge.
> Không cần truyền thêm gì ngoài `prompt`.

**Response thành công:**
```json
{
  "success": true,
  "data": {
    "operations": [{"operation": {"name": "abc123"}, "status": "MEDIA_GENERATION_STATUS_PENDING"}],
    "remainingCredits": 10
  },
  "meta": {
    "tokenSource": "ws-bridge (5s old)",
    "recaptchaSource": "ws-bridge (extension)",
    "videoModelKey": "veo_3_1_t2v_fast_landscape",
    "projectId": "a347e61f-..."
  }
}
```

### GET `/api/gen-video` — Check trạng thái

```bash
curl http://localhost:3000/api/gen-video
```

```json
{
  "success": true,
  "ready": true,
  "bridge": {
    "connected": true,
    "hasToken": true,
    "tokenAge": 15,
    "projectId": "a347e61f-...",
    "sessionId": ";1771308792591"
  }
}
```

### GET `/api/veo3-recaptcha` — Lấy fresh reCAPTCHA token

```bash
curl http://localhost:3000/api/veo3-recaptcha
```

```json
{
  "success": true,
  "token": "0cAFcWeA7a_pY6k4...",
  "source": "extension",
  "timestamp": "2026-02-17T06:15:00.000Z"
}
```

> [!NOTE]
> Endpoint này gọi WS Bridge → Extension gen reCAPTCHA trên domain `labs.google` → trả token.
> Thời gian chờ tối đa 16 giây.

---

## 🌐 WS Bridge HTTP API (port 3002)

Dùng internal, không expose ra ngoài trừ khi cần production.

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
2. **Push instant via WS** — Gửi token ngay lập tức qua WebSocket
3. **On-demand reCAPTCHA** — Nhận yêu cầu từ WS Bridge, gen token bằng `grecaptcha.enterprise.execute()` trên domain `labs.google`
4. **Auto-reconnect** — Tự kết nối lại WS Bridge nếu bị mất

### Files quan trọng

| File | Mô tả |
|------|-------|
| `background.js` | WS client, capture ya29, handle requests |
| `injector.js` | Inject vào Flow page, hook `grecaptcha`, intercept fetch |
| `content.js` | Bridge giữa injector ↔ background |
| `popup.html/js` | UI popup hiển thị trạng thái |
| `manifest.json` | Permissions + config |

### Popup UI

- 🟢 **Connected** — Extension đã kết nối WS Bridge
- 🟡 **No ext** — WS Bridge chạy nhưng extension chưa connect
- 🔴 **Offline** — WS Bridge không chạy

---

## 🏭 Production Setup

Nếu Next.js chạy trên server (Vercel, VPS) còn extension chạy trên máy Ubuntu local:

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

Route `/api/gen-video` và `/api/veo3-recaptcha` sẽ dùng `process.env.WS_BRIDGE_URL` thay vì hardcode `localhost:3002`.

> [!TIP]
> Domain `ws.thetaphoa.store` cố định, không đổi mỗi lần restart như free tunnel.

---

## 📁 Files liên quan

| File | Mô tả |
|------|-------|
| `scripts/ws-bridge.js` | WebSocket Bridge server |
| `src/app/api/gen-video/route.ts` | API tạo video (POST) + check status (GET) |
| `src/app/api/veo3-recaptcha/route.ts` | API lấy fresh reCAPTCHA token |
| `src/app/api/veo3-tokens/route.ts` | CRUD ya29 tokens (DB) |
| `src/models/Veo3Token.ts` | Mongoose model cho ya29 |
| `src/models/Veo3Recaptcha.ts` | Mongoose model cho reCAPTCHA |
| `chrome-extension/flow-token-extractor/` | Chrome Extension folder |
| `package.json` | Scripts: `ws-bridge`, `dev:all` |

---

## 💡 Lưu ý quan trọng

1. **Flow page phải mở** — Extension cần ít nhất 1 tab Flow (`labs.google/fx/`) đang mở để capture ya29 và gen reCAPTCHA
2. **Google account đã login** — Flow page phải login Google account có quyền dùng Veo3
3. **videoModelKey** — Tự derive từ `aspectRatio`:
   - Landscape → `veo_3_1_t2v_fast_landscape`
   - Portrait → `veo_3_1_t2v_fast_portrait`
4. **reCAPTCHA phải gen trên `labs.google`** — Gen ở domain khác sẽ bị 403
5. **ya29 token hết hạn ~1 giờ** — Extension auto-capture token mới khi Flow page gọi API

---

*Cập nhật: 17/02/2026*
