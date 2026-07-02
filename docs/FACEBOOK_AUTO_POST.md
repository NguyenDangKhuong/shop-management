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

## User Stories

### Epic 1: Facebook Page Auto Post (Phase 1) ✅

> Là **admin của Yumy Shop**, tôi muốn tự động đăng video Douyin lên Facebook Page để **tăng lượng content trên Page mà không tốn nhiều thời gian thủ công**.

#### US-1.1: Tạo bài đăng từ link Douyin ✅
**Là** admin, **tôi muốn** dán link Douyin vào hệ thống để tự động tải video và tạo bài đăng Facebook, **để** không phải tải video thủ công rồi upload lại.

**Acceptance Criteria:**
- [x] Dán link Douyin → hệ thống fetch metadata (mô tả, video URL)
- [x] Video được tải tự động từ Douyin CDN → lưu vào R2 Storage
- [x] Bài đăng được tạo với status `draft` (chưa publish)
- [x] Hiển thị mô tả gốc từ Douyin để reference
- [x] Xử lý lỗi: link sai, video không tìm thấy, timeout

#### US-1.2: Upload video đã chỉnh sửa ✅
**Là** admin, **tôi muốn** tải video Douyin về máy, chỉnh sửa, rồi upload video đã edit lên hệ thống, **để** video trên Facebook Page có chất lượng tốt hơn và phù hợp với brand.

**Acceptance Criteria:**
- [x] Drag-drop hoặc click chọn file video (MP4, MOV, AVI)
- [x] Video được upload lên R2 Storage
- [x] Có thể nhập link Douyin gốc để lưu reference (tùy chọn)
- [x] Giới hạn file size 100MB

#### US-1.3: AI tạo caption tự động ✅
**Là** admin, **tôi muốn** hệ thống tự động tạo caption Facebook từ mô tả video bằng AI, **để** tiết kiệm thời gian viết caption và có nội dung hấp dẫn hơn.

**Acceptance Criteria:**
- [x] AI tạo caption tiếng Việt từ mô tả video (Gemini Flash, free)
- [x] 3 phong cách: Giải trí 🎭 / Tương tác 💬 / Thông tin 📚
- [x] Caption có emoji phù hợp (≤ 5) + 5-8 hashtags
- [x] Có thể regenerate với phong cách khác
- [x] Admin có thể chỉnh sửa caption trước khi đăng

#### US-1.4: Đăng video lên Facebook Page ✅
**Là** admin, **tôi muốn** bấm 1 nút để đăng video lên Facebook Page, **để** video xuất hiện trên Page ngay lập tức.

**Acceptance Criteria:**
- [x] Nút "Đăng" với confirmation dialog
- [x] Video upload qua Graph API (`file_url` từ R2)
- [x] Status cập nhật: `draft` → `published`, lưu `facebookPostId`
- [x] Xử lý lỗi: token hết hạn, API limit → status `failed` + error message

#### US-1.5: Quản lý danh sách bài đăng ✅
**Là** admin, **tôi muốn** xem danh sách tất cả bài đăng trong 1 bảng, **để** theo dõi trạng thái và quản lý content.

**Acceptance Criteria:**
- [x] Bảng hiển thị: video preview, caption, target, status, ngày tạo
- [x] Status tag có màu: Draft (xám), Published (xanh lá), Failed (đỏ)
- [x] Tooltip hiển thị error message cho bài failed
- [x] Pagination 10 bài/trang

#### US-1.6: Xem trước video ✅
**Là** admin, **tôi muốn** xem trước video trước khi đăng, **để** kiểm tra chất lượng.

**Acceptance Criteria:**
- [x] Nút "Xem" mở modal video player từ R2 URL
- [x] Controls: play/pause, volume, fullscreen

#### US-1.7: Sửa caption sau khi tạo ✅
**Là** admin, **tôi muốn** sửa caption của bài đăng sau khi đã tạo, **để** điều chỉnh nội dung cho phù hợp hơn.

**Acceptance Criteria:**
- [x] Nút "Sửa" mở modal TextArea với caption hiện tại
- [x] Lưu cập nhật caption + đồng bộ field `content`

---

### Epic 2: Profile cá nhân + Group — Playwright (Phase 2) 📋

> Là **admin**, tôi muốn tự động đăng video lên profile cá nhân và group Facebook để **mở rộng reach và đa kênh phân phối content**.

#### US-2.1: Setup Playwright Worker trên Ubuntu ESXi 📋
**Là** admin, **tôi muốn** cài đặt Playwright worker trên máy Ubuntu ESXi, **để** tự động đăng bài qua Chrome thật.

**Acceptance Criteria:**
- [ ] Script cài đặt: Node.js + Playwright + Chrome
- [ ] Worker chạy như background service (systemd), poll API mỗi 5 phút
- [ ] Stealth plugin chống Facebook detect
- [ ] Log hoạt động ra file

#### US-2.2: Đăng bài lên profile cá nhân 📋
**Là** admin, **tôi muốn** tự động đăng video lên trang cá nhân, **để** tăng reach trên newsfeed bạn bè.

**Acceptance Criteria:**
- [ ] Playwright mở Chrome profile đã login
- [ ] Gõ caption kiểu human (random speed 50-150ms/ký tự)
- [ ] Attach video → đợi upload → click "Đăng"
- [ ] Callback API cập nhật status → published

#### US-2.3: Đăng bài lên Group 📋
**Là** admin, **tôi muốn** đăng video lên các group Facebook, **để** mở rộng phạm vi tiếp cận.

**Acceptance Criteria:**
- [ ] Chọn group đích từ danh sách
- [ ] Playwright navigate đến group → tạo bài mới
- [ ] Hỗ trợ đăng nhiều group (cách 30-60 phút)

#### US-2.4: Rate limiting + Anti-detect 📋
**Là** admin, **tôi muốn** hệ thống tự giới hạn tần suất đăng bài, **để** tránh bị Facebook khóa tài khoản.

**Acceptance Criteria:**
- [ ] Tối đa 3 bài/ngày, khoảng cách tối thiểu 30 phút
- [ ] Chỉ đăng 8h-22h (giờ VN)
- [ ] Random delay giữa các action (3-5s)
- [ ] Dùng IP nhà (residential)

#### US-2.5: Monitoring + Alerts 📋
**Là** admin, **tôi muốn** nhận thông báo khi có lỗi, **để** theo dõi hệ thống từ xa.

**Acceptance Criteria:**
- [ ] Log mỗi bài đăng: thành công/thất bại + timestamp
- [ ] Alert khi bị Facebook challenge
- [ ] Tự động dừng nếu phát hiện bất thường

### Story Summary

| Epic | Stories | Done | Planned |
|------|---------|------|---------|
| **Epic 1**: Page Auto Post | 7 | ✅ 7 | 0 |
| **Epic 2**: Profile + Group | 5 | 0 | 📋 5 |
| **Total** | **12** | **7** | **5** |
