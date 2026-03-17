# Push Notification — Nhắc ôn từ vựng

Last updated: 2026-03-17

## Overview

Push notification nhắc ôn từ vựng — giống TFlat. User bật trên trang `/translate`, hệ thống random 1 từ đã lưu gửi theo tần suất đã chọn.

## Architecture

```
┌─────────────────┐        ┌────────────────────┐
│  User Browser   │        │  VPS (Oracle)       │
│  (SW + Push)    │        │  systemd timer      │
└───────┬─────────┘        │  (every hour)       │
        │                  └──────┬─────────────┘
        │ subscribe               │ curl POST
        ▼                         ▼
┌─────────────────────────────────────────┐
│  Vercel (khuong.theworkpc.com)          │
│                                         │
│  POST /api/push/subscribe → MongoDB     │
│  POST /api/push/send      → web-push   │
│                            → random 1 từ│
└─────────────────────────┬───────────────┘
                          │ web-push (VAPID)
                          ▼
                 ┌──────────────────┐
                 │  FCM / APNs      │
                 │  Push Server     │
                 └────────┬─────────┘
                          │
                          ▼
                 🔔 Notification hiện trên device
```

## Files

| File | Mô tả |
|------|--------|
| `src/models/PushSubscription.ts` | MongoDB model (endpoint, keys, frequency, lastPushedAt) |
| `src/app/api/push/subscribe/route.ts` | POST/DELETE — đăng ký/hủy push subscription |
| `src/app/api/push/send/route.ts` | POST — cron gọi → random 1 từ → gửi push |
| `public/sw.js` | Service Worker — push + notificationclick handlers |
| `src/app/translate/TranslateClient.tsx` | UI toggle + frequency selector |

## Environment Variables

| Key | Mô tả | Public? |
|-----|--------|---------|
| `NEXT_PUBLIC_VAPID_PUBLIC_KEY` | VAPID public key cho push subscription | ✅ |
| `VAPID_PRIVATE_KEY` | VAPID private key cho web-push server | ❌ |
| `CRON_SECRET` | Secret header để authenticate cron API | ❌ |

> ⚠️ Cần set cả 3 env vars trên Vercel Dashboard.

## VPS Cron (systemd timer)

Cài trên VPS Oracle (`heyyolo-free-vps`):

```bash
# Status
sudo systemctl status vocab-push.timer

# Logs
sudo journalctl -u vocab-push.service -n 20

# Manual trigger
sudo systemctl start vocab-push.service

# Disable
sudo systemctl disable --now vocab-push.timer

# Re-enable
sudo systemctl enable --now vocab-push.timer
```

Files:
- `/etc/systemd/system/vocab-push.service` — curl POST to push API
- `/etc/systemd/system/vocab-push.timer` — every hour (`OnCalendar=*-*-* *:00:00`)

## User Flow

1. User mở `/translate` → scroll xuống saved vocabulary
2. Thấy "🔔 Nhắc ôn từ vựng" → chọn tần suất → bấm "Bật nhắc"
3. Browser hỏi permission → Allow
4. Subscription lưu vào MongoDB
5. Mỗi giờ VPS trigger → API filter subscriptions → random 1 từ → gửi push
6. User nhận notification → click → mở `/translate`

## iOS Support

| Điều kiện | Bắt buộc? |
|-----------|-----------|
| iOS 16.4+ | ✅ |
| Safari only | ✅ (Chrome iOS ❌) |
| Add to Home Screen | ✅ (Safari bình thường ❌) |

## Troubleshooting

```bash
# Test API locally
curl -s -X POST http://localhost:3000/api/push/send \
  -H "x-cron-secret: vocab-push-secret-2024" | python3 -m json.tool

# Test từ VPS
ssh ubuntu@heyyolo-free-vps
sudo systemctl start vocab-push.service
sudo journalctl -u vocab-push.service -n 5

# Kiểm tra subscriptions trong MongoDB
# Collection: push_subscriptions
```
