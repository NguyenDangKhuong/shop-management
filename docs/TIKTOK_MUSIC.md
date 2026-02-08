# 🎵 TikTok Music - Quản lý nhạc nền

## 📋 Tổng quan

**TikTok Music** là tính năng quản lý các bài nhạc nền dùng cho video TikTok. Mỗi music item có một tên bài hát và có thể kèm file nhạc upload lên Cloudinary.

### Kiến trúc

```
TikTok Music
  ├── name: string (bắt buộc)
  └── music?: MusicFile (optional, upload Cloudinary)
        ├── url: string
        ├── type: string
        └── publicId?: string
```

---

## 🗄️ Database Model

### TikTokMusic Model

| Field | Type | Required | Mô tả |
|-------|------|----------|-------|
| `name` | String | ✅ | Tên bài hát |
| `music` | MediaFile | ❌ | File nhạc upload Cloudinary (subdocument) |
| `createdAt` | Date | Auto | Thời gian tạo |
| `updatedAt` | Date | Auto | Thời gian cập nhật |

**Collection:** `tiktok_music`
**File:** `src/models/TikTokMusic.ts`

---

## 🔌 API Endpoints (`/api/tiktok-music`)

### GET - Lấy tất cả bài hát

```
GET /api/tiktok-music
```

### GET - Lấy 1 bài hát ngẫu nhiên

```
GET /api/tiktok-music?random=1
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "Tên bài hát",
    "music": { "url": "https://...", "type": "audio", "publicId": "..." }
  }
}
```

> [!NOTE]
> Trả về 404 nếu chưa có bài hát nào trong database.

### POST - Tạo bài hát mới

```
POST /api/tiktok-music
Content-Type: application/json

{
  "name": "Tên bài hát",
  "music": {
    "url": "https://res.cloudinary.com/...",
    "type": "audio",
    "publicId": "tiktok/abc123"
  }
}
```

> [!NOTE]
> Field `music` là optional. Có thể tạo bài hát trước rồi upload nhạc sau, hoặc upload ngay trong modal khi tạo mới.

### PUT - Cập nhật bài hát

```
PUT /api/tiktok-music
Content-Type: application/json

{
  "id": "music_document_id",
  "name": "Tên mới",
  "music": { "url": "...", "type": "audio", "publicId": "..." }
}
```

Để xóa file nhạc, gửi `music: null`.

### DELETE - Xóa bài hát

```
DELETE /api/tiktok-music?id={musicId}
```

---

## 🖥️ UI

### Vị trí

Trang **TikTok Music** (`/tiktok-music`) hiển thị bảng danh sách nhạc. Responsive: table trên desktop, card list trên mobile.

### Chức năng

1. **Thêm bài hát** — Nhấn "Thêm nhạc" → Modal mở ra có 2 field:
   - **Tên bài hát** — Input text (required)
   - **File nhạc** — Nút "Upload nhạc" → Cloudinary widget → audio preview hiển thị trong modal
2. **Sửa bài hát** — Nhấn ✏️ → Modal mở ra với dữ liệu hiện tại, có thể upload lại file nhạc
3. **Upload nhạc riêng** — Nhấn Upload trong bảng (nếu chưa có file)
4. **Nghe nhạc** — Audio player inline trong bảng
5. **Xóa file nhạc** — Xóa file nhạc khỏi record (giữ tên bài hát)
6. **Xóa bài hát** — Xóa toàn bộ record

> [!TIP]
> Khi hủy modal sau khi đã upload file, file sẽ tự động được xóa khỏi Cloudinary (cleanup).

### Upload Config

Upload sử dụng preset `CLOUDINARY_UPLOAD_TIKTOK_PRESET`.

**Config:** `tiktokMusicUploadConfig` trong `src/utils/cloudinaryConfig.ts`
- Multiple: `false`
- Resource type: `auto`
- Formats: mp3, wav, ogg, m4a, aac
- Max size: 50MB

---

## 📁 File structure

```
src/
├── models/TikTokMusic.ts               # Mongoose model
├── app/(admin)/api/tiktok-music/route.ts # API CRUD
├── app/(admin)/tiktok-music/page.tsx     # Page component
├── components/shop/tiktok-music/
│   └── TikTokMusicTable.tsx             # Table + Modal component
└── utils/cloudinaryConfig.ts            # tiktokMusicUploadConfig
```

---

*Tài liệu tạo: 09/02/2026*
