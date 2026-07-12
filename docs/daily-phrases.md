# Daily English Phrases — Spaced Repetition

Last updated: 2026-07-12

## Overview

Push notification hằng ngày gửi 2-3 cụm tiếng Anh thường dùng trong standup, code review, và meeting ở ANZ Bank. Áp dụng **Spaced Repetition (SM-2)** để nhắc ôn thông minh: cái khó quay lại sớm, cái thuộc rồi giãn ra.

## Architecture

```
┌─────────────────┐        ┌────────────────────────┐
│  User Browser   │        │  VPS (Oracle)           │
│  /daily-phrases │        │  systemd timers:        │
│  Review UI      │        │  • daily 8am → send     │
└───────┬─────────┘        │  • weekly → generate    │
        │                  └──────┬─────────────────┘
        │ PATCH review            │ curl POST
        ▼                         ▼
┌─────────────────────────────────────────┐
│  Vercel (khuong.theworkpc.com)          │
│                                         │
│  GET  /api/daily-phrases   → list       │
│  PATCH /api/daily-phrases  → review     │
│  POST /api/daily-phrases/seed → seed    │
│  POST /api/daily-phrases/generate → AI  │
│  POST /api/push/send-phrases → push     │
└─────────────────────────────────────────┘
        │
        ▼
  🔔 Push Notification → User ôn trên /daily-phrases
```

## Files

| File | Mô tả |
|------|--------|
| `src/models/DailyPhrase.ts` | Mongoose model (phrase, meaning, SM-2 fields) |
| `src/data/daily-phrases.ts` | 80 seed phrases (standup/dev/corporate/general) |
| `src/app/api/daily-phrases/route.ts` | GET (list + filter) / PATCH (review + SM-2) |
| `src/app/api/daily-phrases/seed/route.ts` | POST — seed phrases vào DB |
| `src/app/api/daily-phrases/generate/route.ts` | POST — AI sinh phrases mới |
| `src/app/api/push/send-phrases/route.ts` | POST — gửi push notification |
| `src/app/daily-phrases/page.tsx` | Server page (SEO metadata) |
| `src/app/daily-phrases/DailyPhrasesClient.tsx` | Client UI (review cards, tabs, modal) |
| `public/sw.js` | Service Worker — handle `daily-phrase` tag |
| `src/models/PushSubscription.ts` | Thêm `dailyPhrasesEnabled` field |

## Spaced Repetition (SM-2)

Mỗi phrase có:
- `interval` — số ngày giữa mỗi lần ôn
- `easeFactor` — hệ số dễ (khởi tạo 2.5, min 1.3)
- `nextReviewAt` — ngày cần ôn tiếp theo

| Rating | interval mới | easeFactor | Ý nghĩa |
|--------|-------------|------------|---------|
| 😣 Hard | 1 | -0.3 | Chưa nhớ → nhắc lại ngày mai |
| 👍 Good | `interval × easeFactor` | không đổi | Nhớ nhưng chưa tự tin |
| 🔥 Easy | `interval × easeFactor × 1.5` | +0.15 | Thuộc rồi → giãn ra xa |

## VPS Cron (systemd timers)

### Daily Push (8am VN)
```bash
# Status
sudo systemctl status daily-phrases-push.timer

# Logs
sudo journalctl -u daily-phrases-push.service -n 10

# Manual trigger
sudo systemctl start daily-phrases-push.service
```

Files:
- `/etc/systemd/system/daily-phrases-push.service` — curl POST to push API
- `/etc/systemd/system/daily-phrases-push.timer` — every day at 08:00 (+07)

### Weekly AI Generate (chưa setup)
```bash
# Tạo service
sudo tee /etc/systemd/system/phrases-generate.service > /dev/null <<'EOF'
[Unit]
Description=Auto-generate new English phrases via AI
After=network-online.target
Wants=network-online.target

[Service]
Type=oneshot
ExecStart=/usr/bin/curl -s -X POST https://khuong.theworkpc.com/api/daily-phrases/generate -H "x-cron-secret: vocab-push-secret-2024" -H "Content-Type: application/json" -d '{"count": 5}'
EOF

# Tạo timer (Monday 9am VN)
sudo tee /etc/systemd/system/phrases-generate.timer > /dev/null <<'EOF'
[Unit]
Description=Weekly phrase generation timer
[Timer]
OnCalendar=Mon *-*-* 09:00:00
Persistent=true
[Install]
WantedBy=timers.target
EOF

# Enable
sudo systemctl daemon-reload
sudo systemctl enable --now phrases-generate.timer
```

## API Reference

### GET /api/daily-phrases

Query params:
- `category` — filter: `standup`, `dev`, `corporate`, `general`
- `due=true` — only phrases đến hạn ôn

Response: `{ items: [...], total: number, dueCount: number }`

### PATCH /api/daily-phrases

Body: `{ id: string, rating: "hard" | "good" | "easy" }`

Response: `{ success: true, phrase: { interval, nextReviewAt, easeFactor, reviewCount } }`

### POST /api/daily-phrases/seed

Headers: `x-cron-secret: <CRON_SECRET>`

Seed 80 phrases (skip nếu đã có data).

### POST /api/daily-phrases/generate

Headers: `x-cron-secret: <CRON_SECRET>`
Body: `{ count: number }` (optional, default 5, max 20)

AI sinh phrases mới, check trùng, insert vào DB.

### POST /api/push/send-phrases

Headers: `x-cron-secret: <CRON_SECRET>`

Pick 2-3 due phrases → push notification.

## Troubleshooting

```bash
# Test seed API
curl -s -X POST https://khuong.theworkpc.com/api/daily-phrases/seed \
  -H "x-cron-secret: vocab-push-secret-2024"

# Test generate API (5 new phrases)
curl -s -X POST https://khuong.theworkpc.com/api/daily-phrases/generate \
  -H "x-cron-secret: vocab-push-secret-2024" \
  -H "Content-Type: application/json" \
  -d '{"count": 5}'

# Test push
curl -s -X POST https://khuong.theworkpc.com/api/push/send-phrases \
  -H "x-cron-secret: vocab-push-secret-2024"

# Check phrases in DB
# Collection: daily_phrases
```
