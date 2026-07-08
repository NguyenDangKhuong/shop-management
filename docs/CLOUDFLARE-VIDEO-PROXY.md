# Cloudflare Worker — Twitter Video Proxy

## Tổng quan

Proxy video từ `video.twimg.com` qua Cloudflare Edge (free 100k req/ngày).
Thay vì proxy qua Vercel `/api/tweets/video` (tốn Fast Origin Transfer), video đi qua Cloudflare Worker → **0 transfer cost trên Vercel**.

## Thông tin deploy

| Key | Value |
|-----|-------|
| **Worker URL** | `https://twitter-video-proxy.xvn-tweet.workers.dev` |
| **Workers subdomain** | `xvn-tweet.workers.dev` |
| **Dashboard** | https://dash.cloudflare.com/86e360ccbc27091bef0e3259aa79f737/workers/subdomain |
| **Account ID** | `86e360ccbc27091bef0e3259aa79f737` |
| **Version ID** | `dc8e6d78-a1e0-467d-9c09-b187134055c5` |

## Flow

```
Browser <video> → Cloudflare Worker → video.twimg.com → Cloudflare (cache 24h) → Browser
                   (thêm Referer: x.com)
```

## Env variable

```bash
# .env.local + Vercel Dashboard
NEXT_PUBLIC_VIDEO_PROXY_URL=https://twitter-video-proxy.xvn-tweet.workers.dev
```

Nếu không set → tự động fallback về `/api/tweets/video` (Vercel proxy).

## Deploy/Update

```bash
cd cloudflare-video-proxy
npx wrangler login           # login (chỉ lần đầu)
npx wrangler deploy           # deploy worker
npx wrangler tail             # xem logs realtime
```

### CORS Origins

Allowed origins được lưu dưới dạng **Cloudflare Secret** (không hiện trong code):

```bash
npx wrangler secret put ALLOWED_ORIGINS
# Paste: https://your-tweets-domain.vercel.app
# Nhiều domain: https://domain1.com,https://domain2.com
```

`localhost:3000` và `localhost:3001` luôn được cho phép (hardcoded cho dev).

## Free tier limits

- **100,000 requests/ngày** (free)
- **Unlimited bandwidth** (không giới hạn dung lượng video)
- **10ms CPU time/request** (đủ cho proxy)

## Files

- `cloudflare-video-proxy/wrangler.toml` — config
- `cloudflare-video-proxy/src/worker.ts` — worker code
- `src/app/api/tweets/route.ts` — injected script sử dụng `NEXT_PUBLIC_VIDEO_PROXY_URL`
- `src/app/api/tweets/video/route.ts` — Vercel proxy fallback (vẫn giữ)