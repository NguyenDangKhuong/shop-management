# 🎬 Veo3 Media - Quản lý Media cho TikTok Accounts

## 📋 Tổng quan

**Veo3 Media** là tính năng quản lý media (hình ảnh) gắn liền với từng TikTok Account. Mỗi media item có một `mediaId` duy nhất và có thể kèm hình ảnh upload lên Cloudinary. Media ID được sử dụng trong **Prompt** (loại `describe`) thông qua mảng `referenceImages` để liên kết nội dung prompt với nhiều media tương ứng.

### Kiến trúc

```
TikTok Account
  └── Veo3Media[] (nhiều media per account)
        ├── mediaId: string (bắt buộc)
        └── mediaFile?: MediaFile (optional, upload Cloudinary)
              ├── url: string
              ├── type: 'image' | 'video' | 'link'
              └── publicId?: string
```

---

## 🗄️ Database Model

### Veo3Media Model

| Field | Type | Required | Mô tả |
|-------|------|----------|-------|
| `accountId` | String | ✅ | ID của TikTok Account |
| `mediaId` | String | ✅ | ID media (dùng để liên kết với Prompt) |
| `mediaFile` | MediaFile | ❌ | File media upload Cloudinary (subdocument) |
| `createdAt` | Date | Auto | Thời gian tạo |
| `updatedAt` | Date | Auto | Thời gian cập nhật |

**Collection:** `veo3medias`
**File:** `src/models/Veo3Media.ts`

### MediaFile Subdocument

| Field | Type | Required | Mô tả |
|-------|------|----------|-------|
| `url` | String | ✅ | URL file trên Cloudinary |
| `type` | String | ✅ | Loại file: `image`, `video`, hoặc `link` |
| `publicId` | String | ❌ | Public ID trên Cloudinary (dùng để xóa) |

**File:** `src/models/MediaFile.ts`

---

## 🔌 API Endpoints (`/api/veo3-media`)

### GET - Lấy danh sách media theo account

```
GET /api/veo3-media?accountId={accountId}
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "accountId": "...",
      "mediaId": "CAMaJDBjOWRk...",
      "mediaFile": {
        "url": "https://res.cloudinary.com/...",
        "type": "image",
        "publicId": "tiktok/abc123"
      }
    }
  ]
}
```

### POST - Tạo media mới

```
POST /api/veo3-media
Content-Type: application/json

{
  "accountId": "...",
  "mediaId": "...",
  "mediaFile": {
    "url": "https://res.cloudinary.com/...",
    "type": "image",
    "publicId": "tiktok/abc123"
  }
}
```

> [!NOTE]
> Field `mediaFile` là optional. Có thể tạo media trước rồi upload hình sau, hoặc upload ngay khi tạo mới bằng nút "📷 Upload" trên form.

### PUT - Cập nhật media (upload/xóa hình)

```
PUT /api/veo3-media
Content-Type: application/json

{
  "id": "media_document_id",
  "mediaFile": {
    "url": "https://...",
    "type": "image",
    "publicId": "tiktok/xyz789"
  }
}
```

Để xóa hình, gửi `mediaFile: null`.

### DELETE - Xóa media

```
DELETE /api/veo3-media?id={mediaId}
```

> [!CAUTION]
> Khi xóa media có hình, hình trên Cloudinary cũng sẽ bị xóa theo.

---

## 🖥️ UI

### Vị trí trên trang

Section **🎬 Veo3 Media** nằm trên trang chi tiết TikTok Account, giữa **AutoFlow** và **Danh sách sản phẩm**.

### Chức năng

1. **Thêm media** — Nhập Media ID vào input, có thể upload hình ngay bằng nút "📷 Upload" (preview hiển thị bên dưới), nhấn "Thêm" để tạo media kèm hình
2. **Edit Media ID** — Nhấn ✏️ trên item → mediaId chuyển thành input editable, nhấn ✓/Enter để lưu, ✕/Escape để hủy
3. **Upload hình (sau khi tạo)** — Nhấn 📷 trên item trong danh sách → Cloudinary widget mở ra → upload xong tự lưu
4. **Xóa hình** — Nhấn 🗑️ xóa hình khỏi Cloudinary (giữ media ID)
5. **Xóa media** — Nhấn Delete xóa toàn bộ record
6. **Copy Media ID** — Nhấn icon copy

### Upload Config

Upload sử dụng preset `CLOUDINARY_UPLOAD_TIKTOK_PRESET` (env: `NEXT_PUBLIC_CLOUDINARY_UPLOAD_TIKTOK_PRESET`).

**Config:** `veo3MediaUploadConfig` trong `src/utils/cloudinaryConfig.ts`
- Multiple: `false`
- Resource type: `image`
- Formats: jpg, jpeg, png, webp, gif
- Max size: 10MB

---

## 🔗 Liên kết với Prompt

Khi tạo/sửa Prompt loại **describe**, field **Reference Images** là dropdown multi-select `Select` chọn từ danh sách Veo3 Media của account đó (prompt loại **hook** không có field này). Mỗi option hiển thị:
- Thumbnail hình ảnh (nếu có)
- Media ID text

Dữ liệu lưu dạng mảng `referenceImages`:
```json
[
  { "imageUsageType": "IMAGE_USAGE_TYPE_ASSET", "mediaId": "CAMaJGJm..." },
  { "imageUsageType": "IMAGE_USAGE_TYPE_ASSET", "mediaId": "CAMaJDg0..." }
]
```

Trên AutoFlow card và Prompt Library, mỗi prompt hiển thị danh sách thumbnails nhỏ (24×24px) cho từng reference image.

**File liên quan:**
- `src/components/shop/tiktok-accounts/PromptModal.tsx` — Prop `veo3Media` truyền từ page
- `src/app/(admin)/tiktok-accounts/[username]/page.tsx` — Hiển thị referenceImages trên prompt cards

---

*Tài liệu tạo: 08/02/2026*
*Cập nhật: 15/02/2026 — Đổi `mediaId` thành `referenceImages[]` multi-select (chỉ cho prompt describe)*

---

## 🔑 Veo3 Tokens (`/veo3-tokens`)

### Tổng quan

**Veo3 Tokens** quản lý token dùng cho Veo3 API. Mỗi token có thể kèm **Token Check Status** để lưu trạng thái kiểm tra.

### Database Model

| Field | Type | Required | Mô tả |
|-------|------|----------|-------|
| `value` | String | ✅ | Giá trị token |
| `tokenCheckStatus` | String | ❌ | Trạng thái kiểm tra token |
| `createdAt` | Date | Auto | Thời gian tạo |
| `updatedAt` | Date | Auto | Thời gian cập nhật |

**Collection:** `veo3tokens`
**File:** `src/models/Veo3Token.ts`

### API Endpoints (`/api/veo3-tokens`)

| Method | Body/Params | Mô tả |
|--------|-------------|-------|
| `GET` | — | Lấy tất cả tokens |
| `POST` | `{ value, tokenCheckStatus? }` | Tạo token mới |
| `PUT` | `{ id, value?, tokenCheckStatus? }` | Cập nhật token |
| `DELETE` | `?id={id}` | Xóa token |

### UI

- Trang `/veo3-tokens` — Bảng danh sách tokens (desktop) / card list (mobile)
- Mỗi token hiển thị: value, token check status, thời gian cập nhật
- Hỗ trợ copy, thêm/sửa/xóa token
