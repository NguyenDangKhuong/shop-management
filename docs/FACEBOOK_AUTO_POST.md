# Facebook Auto Post — Tự động đăng video Douyin lên Facebook Page

## Tổng quan

Hệ thống tự động tải video từ Douyin → AI generate caption → đăng lên Facebook Page (Yumy Shop) qua Graph API.

**2 mode tạo bài:**
- **🔗 Từ link Douyin**: Dán link → auto tải video → AI caption → tạo bài (up thẳng)
- **📁 Upload video đã chỉnh sửa**: Tải video về máy → chỉnh sửa → upload lại → AI caption → tạo bài

## Architecture

```
┌──────────────────────────────────────────────────────┐
│               VERCEL (Next.js Admin)                 │
│                                                      │
│  Admin Dashboard: /facebook-auto-post                │
│       │                                              │
│       ├── Mode 1: Dán link Douyin                    │
│       │   └── VPS Proxy tải video → R2 Storage       │
│       │                                              │
│       ├── Mode 2: Upload video đã chỉnh sửa         │
│       │   └── Upload trực tiếp → R2 Storage          │
│       │                                              │
│       └── AI Caption (CLI Proxy + Gemini Flash)      │
│                        │                             │
│                        ▼                             │
│               Graph API → Facebook Page              │
└──────────────────────────────────────────────────────┘
```

## API Routes

### A. CRUD — `/api/facebook-auto-post`

| Method | Endpoint | Chức năng |
|--------|----------|-----------|
| `GET` | `/api/facebook-auto-post` | Lấy danh sách bài (filter by status) |
| `POST` | `/api/facebook-auto-post` | Tạo bài từ Douyin URL (auto download video → R2) |
| `PUT` | `/api/facebook-auto-post` | Cập nhật caption, schedule, status |
| `DELETE` | `/api/facebook-auto-post?id=xxx` | Xóa bài + xóa video trên R2 |

### B. Upload — `/api/facebook-auto-post/upload`

| Method | Endpoint | Chức năng |
|--------|----------|-----------|
| `POST` | `/api/facebook-auto-post/upload` | Upload video file (FormData) → R2 → tạo bài |

**FormData fields:**
- `video`: File video (required)
- `caption`: Caption text (optional)
- `douyinUrl`: Link Douyin gốc để reference (optional)

### C. AI Caption — `/api/facebook-auto-post/ai-caption`

| Method | Endpoint | Chức năng |
|--------|----------|-----------|
| `POST` | `/api/facebook-auto-post/ai-caption` | AI generate caption từ mô tả video |

**Request body:**
```json
{
  "description": "Mô tả video...",
  "style": "entertaining" // entertaining | engagement | informative
}
```

**Response:**
```json
{
  "success": true,
  "caption": "Caption tiếng Việt với emoji + hashtags..."
}
```

### D. Publish — `/api/facebook-auto-post/publish`

| Method | Endpoint | Chức năng |
|--------|----------|-----------|
| `POST` | `/api/facebook-auto-post/publish` | Đăng video lên Facebook Page qua Graph API |

**Request body:**
```json
{
  "id": "mongodb_post_id"
}
```

**Flow:**
1. Lấy post từ DB
2. Gọi `POST /{page-id}/videos` với `file_url` (R2 public URL) + `description` (caption)
3. Cập nhật status → `published`, lưu `facebookPostId`

## Environment Variables

```env
# Facebook Graph API
FB_APP_ID=810267731874571
FB_APP_SECRET=<secret>
FB_PAGE_ID=106470202191109
FB_PAGE_NAME=Yumy Shop
FB_PAGE_ACCESS_TOKEN=<long-lived page token>

# AI Caption (already existed)
CLI_PROXY_URL=https://cli-proxy.khuong.theworkpc.com/v1/chat/completions
CLI_PROXY_API_KEY=khuong
```

## Database Model

`FacebookPost` model (collection: `facebookposts`) — thêm các fields mới:

| Field | Type | Mô tả |
|-------|------|-------|
| `postType` | `'auto-video'` | Phân biệt với bài post thủ công |
| `targetType` | `'page' \| 'profile' \| 'group'` | Nơi đăng |
| `targetId` | `string` | Facebook Page/Group ID |
| `targetName` | `string` | Tên Page/Group |
| `facebookPostId` | `string` | ID bài đã đăng trên Facebook |
| `douyinUrl` | `string` | Link Douyin gốc |
| `douyinDesc` | `string` | Mô tả gốc từ Douyin |
| `aiCaption` | `string` | Caption AI generate |
| `videoR2Key` | `string` | R2 object key |
| `videoR2Url` | `string` | R2 public URL |
| `publishedAt` | `Date` | Thời gian đăng lên Facebook |
| `errorMessage` | `string` | Lỗi nếu publish thất bại |

## Rate Limits

| Thông số | Giá trị |
|----------|---------|
| Facebook API | ~200 calls/giờ/user (reset mỗi giờ) |
| 1 bài đăng | ~3-5 API calls |
| Khuyến nghị | ≤ 3 bài/ngày |
| Page Token | Không hết hạn (permanent) |

## Admin UI

Trang `/facebook-auto-post` trong admin dashboard:

- **Bảng danh sách bài**: Video preview, caption, target, status, actions
- **Modal tạo bài**: 2 tab (Douyin link / Upload file) + AI caption + style selector
- **Modal sửa caption**: TextArea editor
- **Modal xem video**: Video player preview
- **Actions**: Đăng ngay (publish) / Sửa caption / Xóa

## File Structure

```
src/
├── app/(admin)/
│   ├── facebook-auto-post/
│   │   └── page.tsx                           # Admin page
│   └── api/facebook-auto-post/
│       ├── route.ts                           # CRUD (GET/POST/PUT/DELETE)
│       ├── upload/route.ts                    # Upload edited video
│       ├── publish/route.ts                   # Publish to Facebook Page
│       └── ai-caption/route.ts                # AI caption generation
├── components/shop/facebook-auto-post/
│   └── FacebookAutoPostClient.tsx             # Admin dashboard UI
├── models/
│   └── FacebookPost.ts                        # Updated Mongoose model
└── utils/
    └── constants.ts                           # FB + AI constants
```
