# Tweets Page

Trang hiển thị Twitter/X timelines của các username đã lưu.

## Tính năng

- **Thêm username** — Nhập username X (vd: `vercel`, `@reactjs`) → bấm "Thêm" hoặc Enter
- **Lưu vào DB** — Usernames được lưu trong MongoDB (`twitterusers` collection)
- **Hiển thị feed** — Tất cả users' timelines hiển thị xếp dọc
- **Filter** — Click tag để xem 1 user, click "Tất cả" để xem toàn bộ
- **Xóa** — Nút ✕ trên tag + popup confirm trước khi xóa
- **Public** — Không cần đăng nhập, ai cũng xem được

## Cấu trúc files

```
src/
├── app/
│   ├── tweets/
│   │   ├── page.tsx              # Server component, layout + metadata
│   │   ├── TweetSearch.tsx       # Client component, CRUD UI
│   │   └── __tests__/
│   │       └── TweetSearch.test.tsx
│   └── api/
│       ├── tweets/
│       │   └── route.ts          # Proxy Twitter syndication (bypass rate limit)
│       └── twitter-users/
│           ├── route.ts          # CRUD API (GET/POST/DELETE)
│           └── __tests__/
│               └── route.test.ts
└── models/
    └── TwitterUser.ts            # Mongoose model
```

## API Routes

### `GET /api/twitter-users`
Trả về danh sách usernames đã lưu.

### `POST /api/twitter-users`
Thêm username mới. Body: `{ "username": "vercel" }`. Tự strip `@`, lowercase, trim.

### `DELETE /api/twitter-users?id=<id>`
Xóa username theo MongoDB ID.

### `GET /api/tweets?username=<username>`
Proxy server-side fetch Twitter syndication timeline → bypass browser rate limit.

## Tech Stack

- **react-tweet** (installed, available for future single tweet embeds)
- **Twitter Syndication API** via server proxy
- **MongoDB** cho lưu trữ usernames
- **Next.js API Routes** cho proxy + CRUD
