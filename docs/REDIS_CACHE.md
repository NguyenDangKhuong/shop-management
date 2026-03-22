# Redis Caching & Rate Limiting

Hệ thống sử dụng **Upstash Redis** (free tier, Singapore region) cho 2 mục đích:
1. **Caching** — Giảm tải MongoDB cho các GET request phổ biến
2. **Rate Limiting** — Chống lạm dụng API (translate, gen-video, clarity)

## Architecture

```
Client Request
     │
     ▼
┌─────────────┐     ┌──────────────┐     ┌──────────┐
│  Rate Limit │────▶│  Redis Cache │────▶│  MongoDB  │
│  (optional) │     │  (GET only)  │     │  (source) │
└─────────────┘     └──────────────┘     └──────────┘
                         │ HIT
                         ▼
                    Return cached
```

**Strategy:** Fail-open — Nếu Redis down, request vẫn đi thẳng MongoDB. Không bao giờ block user vì Redis lỗi.

## Cấu hình

### Environment Variables

```env
UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=AX...
```

### Dependencies

```json
"@upstash/redis": "^1.x",
"@upstash/ratelimit": "^2.x"
```

## Core Files

| File | Mô tả |
|------|--------|
| `src/lib/redis.ts` | Lazy-init Redis client (tránh lỗi build-time env) |
| `src/lib/cache.ts` | `withCache()` + `invalidateCache()` utilities |
| `src/lib/rateLimit.ts` | `checkRateLimit()` với sliding window algorithm |

## Cached Routes

| Route | Cache Key | TTL | Invalidation |
|-------|-----------|-----|-------------|
| `GET /api/categories` | `admin:categories` | 300s | POST/PUT/DELETE `/api/category` |
| `GET /api/products` | `admin:products:*` (wildcard, query params) | 60s | POST/PUT/DELETE `/api/product` + order creation |
| `GET /api/orders` | `admin:orders:{dateFrom}:{dateTo}` | 60s | POST `/api/orders` |
| `GET /api/product/[sku]` | `admin:product:{sku}` | 120s | — |
| `GET /api/flashcards` | `flashcards:{type}:{topic}:{difficulty}` | 300s | — |
| `GET /api/flashcards/progress` | `flashcards:progress:{userId}` | 300s | PUT `/api/flashcards/progress` |
| `GET /api/vocabulary` | `vocab:*` (wildcard, query params) | 120s | POST/DELETE `/api/vocabulary` |
| `GET /api/shopee-links` | `shopee-links` | 300s | POST/PUT/DELETE `/api/shopee-links` |
| `GET /api/roadmap/progress` | `roadmap:progress:{userId}` | 300s | PUT `/api/roadmap/progress` |
| `GET /api/twitter-users` | `twitter-users` | 300s | POST/DELETE `/api/twitter-users` |
| `GET /api/clarity` | `clarity:{userId}:{month}` | 60s | PUT/DELETE `/api/clarity` |
| `GET /api/clarity/streak` | `clarity:streak:{userId}` | 300s | — |

## Rate Limited Routes

| Route | Limit | Window | Commands/req |
|-------|-------|--------|-------------|
| `POST /api/translate` | 10 requests | 30 giây | ~3 |
| `POST /api/gen-video` | 3 requests | 1 phút | ~3 |
| `PUT /api/clarity` | 20 requests | 1 phút | ~3 |

## Routes KHÔNG cache (Lý do)

| Route | Lý do |
|-------|-------|
| `tiktok-accounts` | Admin-only, ít truy cập |
| `tiktok-music` | Admin-only, random endpoint cần fresh data |
| `tiktok-scheduled-posts` | n8n poll mỗi phút, cache gần như vô dụng (TTL = poll interval) |
| `facebook-posts` | Admin-only, ít truy cập |
| `prompts` | Thay đổi thường xuyên khi edit autoflow |
| `autoflows` | Phức tạp (populate prompts), thay đổi thường xuyên |
| `veo3-media` | Admin-only, ít truy cập |
| `veo3-tokens` | Admin-only, sensitive data |
| `tweets/*` | Đã có in-memory cache riêng |
| `r2-video` | Presigned URL, mỗi lần khác nhau |
| `auth/*` | Authentication, không nên cache |
| `push/*` | Real-time notification |

## Upstash Free Tier Limits

| Metric | Limit | Ước tính sử dụng |
|--------|-------|-------------------|
| Commands/day | 10,000 | ~500-800 |
| Max data size | 256 MB | < 1 MB |
| Max request size | 1 MB | < 100 KB |

## Cách sử dụng

### Cache một GET route

```typescript
import { withCache, invalidateCache } from '@/lib/cache'

// GET handler
export async function GET() {
    const data = await withCache('my-key', 300, async () => {
        await connectDb()
        return await MyModel.find().lean()
    })
    return NextResponse.json({ success: true, data })
}

// Mutation handler (POST/PUT/DELETE) — invalidate cache
export async function POST(request: NextRequest) {
    // ... create/update/delete logic
    await invalidateCache('my-key')
    return NextResponse.json({ success: true })
}
```

### Wildcard invalidation (nhiều cache keys)

```typescript
import { getRedis } from '@/lib/redis'

async function invalidateProductCache() {
    const redis = getRedis()
    const keys = await redis.keys('admin:products:*')
    if (keys.length > 0) await redis.del(...keys)
}
```

### Rate limit một route

```typescript
import { checkRateLimit } from '@/lib/rateLimit'

export async function POST(request: NextRequest) {
    const rateLimited = await checkRateLimit(request, 'translate', {
        limit: 10,
        window: '30 s',
    })
    if (rateLimited) return rateLimited // 429 response

    // ... normal logic
}
```

## Testing

Tất cả test files cần mock cache và redis:

```typescript
jest.mock('@/lib/cache', () => ({
    withCache: jest.fn((_key, _ttl, fn) => fn()),   // bypass cache
    invalidateCache: jest.fn().mockResolvedValue(undefined),
}))
jest.mock('@/lib/redis', () => ({
    getRedis: jest.fn(() => ({
        keys: jest.fn().mockResolvedValue([]),
        del: jest.fn().mockResolvedValue(undefined),
    })),
}))
```
