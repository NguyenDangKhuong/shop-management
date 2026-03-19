# Tweets Page

Trang hiển thị Twitter/X timelines của các username đã lưu.

## Tính năng

- **Feed tabs** — For You, Following, @pinned (from env), ❤️ Liked
- **Liked tweets** — Hiển thị tweets mà user pinned đã like (GraphQL Likes API)
- **Thêm username** — Nhập username X (vd: `vercel`, `@reactjs`) → bấm "Thêm" hoặc Enter
- **Lưu vào DB** — Usernames được lưu trong MongoDB (`twitterusers` collection)
- **Hiển thị feed** — Tất cả users' timelines hiển thị xếp dọc
- **Infinite scroll** — Tự load thêm tweets khi cuộn xuống cuối
- **Repost navigation** — Click username trên "xxx reposted" → chuyển sang timeline user đó
- **Filter** — Click tag để xem 1 user, click "Tất cả" để xem toàn bộ
- **Xóa** — Nút ✕ trên tag + popup confirm trước khi xóa
- **Public** — Không cần đăng nhập, ai cũng xem được

## Domain routing

| Env var | Mô tả |
|---------|------|
| `TWEETS_ONLY_DOMAIN` | Domain chỉ cho phép /tweets (redirect path khác → /tweets) |
| `BLOCKED_DOMAINS_FOR_TWEETS` | Domain bị chặn truy cập /tweets (comma-separated) |

Cả hai cấu hình trong `.env.local` và Vercel Dashboard.

## Cấu trúc files

```
src/
├── app/
│   ├── tweets/
│   │   ├── page.tsx              # Server component, layout + metadata
│   │   ├── TweetsFeed.tsx        # Client component, feed tabs + mode management
│   │   ├── TweetSearch.tsx       # Client component, CRUD UI
│   │   ├── GraphQLTweets.tsx     # GraphQL tweets + infinite scroll
│   │   ├── BackToTop.tsx         # Scroll to top button
│   │   └── __tests__/
│   └── api/
│       ├── tweets/
│       │   ├── route.ts          # Proxy Twitter syndication
│       │   ├── graphql/
│       │   │   ├── route.ts      # GraphQL UserTweets proxy
│       │   │   ├── likes/
│       │   │   │   └── route.ts  # GraphQL Likes timeline proxy
│       │   │   └── tweetParser.ts # Tweet response parser
│       │   ├── home/
│       │   │   └── route.ts      # Home timeline (For You / Following)
│       │   ├── like/
│       │   │   └── route.ts      # Like/Unlike mutation
│       │   └── repost/
│       │       └── route.ts      # Repost/Unrepost mutation
│       └── twitter-users/
│           └── route.ts          # CRUD API (GET/POST/DELETE)
└── models/
    ├── TwitterUser.ts            # Mongoose model
    └── TwitterToken.ts           # Twitter auth credentials
```

## API Routes

### `GET /api/tweets/graphql?username=xxx&cursor=yyy`
Proxy GraphQL UserTweets endpoint. Pagination via cursor.

### `GET /api/tweets/graphql/likes?username=xxx&cursor=yyy`
Proxy GraphQL Likes timeline. Env: `TWITTER_LIKES_QID` (query ID).

### `GET /api/tweets/home?tab=for_you|following&count=20`
Home timeline (For You / Following feeds).

### `GET /api/twitter-users`
Danh sách usernames đã lưu.

### `POST /api/twitter-users`
Thêm username. Body: `{ "username": "vercel" }`.

### `DELETE /api/twitter-users?id=<id>`
Xóa username theo MongoDB ID.

## Env variables

| Variable | Mô tả |
|----------|------|
| `TWITTER_DEFAULT_BEARER` | Bearer token cho Twitter API |
| `TWITTER_LIKES_QID` | GraphQL query ID cho Likes endpoint |
| `TWITTER_USER_BY_SCREEN_NAME_QID` | Query ID cho UserByScreenName |
| `TWEETS_ONLY_DOMAIN` | Domain chỉ cho phép /tweets |
| `BLOCKED_DOMAINS_FOR_TWEETS` | Domain bị chặn /tweets |
| `NEXT_PUBLIC_VIDEO_PROXY_URL` | Cloudflare video proxy URL |
| `NEXT_PUBLIC_PINNED_USERNAME` | Pinned username tab in tweets feed |

## Video Player (LazyVideo)

Component `LazyVideo` trong `GraphQLTweets.tsx` xử lý video/GIF:

- **Poster + Play button** — Hiện thumbnail với nút ▶️, bấm mới load video
- **Lazy source loading** — `<source>` chỉ inject khi scroll vào viewport (IntersectionObserver 200px)
- **No layout shift** — Poster `<img>` chiếm đúng kích thước, video ẩn bên dưới cho đến khi ready
- **Loading spinner** — Hiện khi bấm play nhưng video chưa buffer xong
- **Auto-pause** — Pause khi scroll ra khỏi viewport
- **GIF support** — Auto-play, loop, muted, badge "GIF"

## Tech Stack

- **Twitter GraphQL API** via server proxy (UserTweets, Likes, Home)
- **DOMPurify** cho XSS sanitization trong tweet rendering
- **MongoDB** cho usernames + Twitter credentials
- **IntersectionObserver** cho infinite scroll + lazy video loading
- **Next.js API Routes** cho proxy + CRUD
