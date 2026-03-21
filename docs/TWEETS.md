# Tweets Page

Trang hiển thị Twitter/X timelines của các username đã lưu.

## Tính năng

- **Feed tabs** — For You, Following, @pinned (from env), ❤️ Liked
- **URL-based routing** — Mỗi tab là route riêng (`/tweets/for-you`, `/tweets/following`, etc.)
- **User timeline** — Click username → `/tweets/user/[username]` (dynamic route)
- **Liked tweets** — Hiển thị tweets mà user pinned đã like (GraphQL Likes API)
- **Thêm username** — Nhập username X (vd: `vercel`, `@reactjs`) → bấm "Browse" hoặc Enter
- **Lưu vào DB** — Usernames được lưu trong MongoDB (`twitterusers` collection)
- **Infinite scroll** — Tự load thêm tweets khi cuộn xuống cuối
- **Back button** — Nút "Back to feed" khi xem user timeline (dùng browser history)
- **Public** — Không cần đăng nhập, ai cũng xem được

## Routes

| URL | Content |
|-----|---------|
| `/tweets` | Redirect → `/tweets/for-you` |
| `/tweets/for-you` | Home feed — For You |
| `/tweets/following` | Home feed — Following |
| `/tweets/pinned` | Pinned user timeline |
| `/tweets/likes` | Pinned user liked tweets |
| `/tweets/user/[username]` | Dynamic user timeline |

## Domain routing

| Env var | Mô tả |
|---------|------|
| `TWEETS_ONLY_DOMAIN` | Domain chỉ cho phép /tweets (redirect path khác → /tweets) |
| `BLOCKED_DOMAINS_FOR_TWEETS` | Domain bị chặn truy cập /tweets (comma-separated) |

Cả hai cấu hình trong `.env.local` và Vercel Dashboard.

## Cấu trúc files

```
src/app/tweets/
├── layout.tsx              # Metadata
├── TweetsShell.tsx         # Client component, shared layout (header + tabs + search + back button)
├── page.tsx                # Redirect → /tweets/for-you
├── HomeFeed.tsx            # Home feed component (For You / Following)
├── GraphQLTweets.tsx       # GraphQL tweets + infinite scroll + LazyVideo + MediaGrid
├── TweetSearch.tsx         # Embed tweet search + cookie management
├── BackToTop.tsx           # Scroll to top button
├── TweetsFeed.tsx          # [Legacy] Old single-page feed (kept for test compatibility)
├── for-you/page.tsx        # For You sub-page
├── following/page.tsx      # Following sub-page
├── pinned/page.tsx         # Pinned user sub-page
├── likes/page.tsx          # Likes sub-page
├── user/[username]/page.tsx # Dynamic user timeline
└── __tests__/
    ├── HomeFeedComponent.test.tsx  # HomeFeed tests
    ├── TweetsShell.test.tsx        # TweetsShell tests (tabs, search, nav)
    ├── SubPages.test.tsx           # Sub-page routing tests
    ├── HomeFeed.test.tsx           # Legacy TweetsFeed tests
    ├── GraphQLTweets.test.tsx      # GraphQL component tests
    ├── TweetSearch.test.tsx        # TweetSearch tests
    └── graphqlRoute.test.ts        # API route tests

src/app/api/tweets/
├── route.ts                # Proxy Twitter syndication (embed)
├── graphql/
│   ├── route.ts            # GraphQL UserTweets proxy
│   ├── likes/route.ts      # GraphQL Likes timeline proxy
│   └── tweetParser.ts      # Tweet response parser
├── home/route.ts           # Home timeline (For You / Following)
├── video/route.ts          # Video proxy (Vercel fallback)
├── like/route.ts           # Like/Unlike mutation
├── repost/route.ts         # Repost/Unrepost mutation
└── follow/route.ts         # Follow mutation

src/app/api/twitter-users/route.ts   # CRUD API (GET/POST/DELETE)
src/models/TwitterUser.ts            # Mongoose model
src/models/TwitterToken.ts           # Twitter auth credentials
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

- **`preload="metadata"`** — Browser tự tải first frame làm thumbnail (không dùng custom poster overlay)
- **Loading skeleton** — Animated placeholder (play icon + pulse) hiện cho đến khi metadata loaded
- **Lazy source loading** — `<source>` chỉ inject khi scroll vào viewport (IntersectionObserver 200px)
- **Auto-pause** — Pause khi scroll ra khỏi viewport
- **GIF support** — Auto-play, loop, muted, badge "GIF"
- **Standard controls** — Dùng native browser video controls

### Video Proxy Optimization

| Feature | Cloudflare Worker | Vercel Fallback |
|---------|------------------|-----------------|
| Range requests | ✅ (seeking support) | ✅ |
| Cache-Control | ✅ 24h edge cache | ✅ 1h |
| Accept-Ranges | ✅ bytes | ✅ bytes |
| Content-Range | ✅ forwarded | ✅ forwarded |

Chi tiết Worker proxy: xem `docs/CLOUDFLARE-VIDEO-PROXY.md`.

### Potential future optimizations

- **CDN/R2 cache** — Cache video trên Cloudflare R2 (free 10GB) để giảm latency
- **Lower bitrate selection** — Chọn 720p thay highest quality khi parse tweet
- **HLS streaming** — Adaptive bitrate (cần server transcode, phức tạp)

## Tech Stack

- **Next.js App Router** — URL-based routing cho sub-pages
- **Twitter GraphQL API** via server proxy (UserTweets, Likes, Home)
- **DOMPurify** cho XSS sanitization trong tweet rendering
- **MongoDB** cho usernames + Twitter credentials
- **IntersectionObserver** cho infinite scroll + lazy video loading
- **Cloudflare Worker** cho video proxy (free tier)
