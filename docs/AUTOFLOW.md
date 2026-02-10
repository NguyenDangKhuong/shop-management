# ⚡ AutoFlow & 📝 Prompt Library

## 📋 Tổng quan

Hệ thống AutoFlow/Prompt phục vụ việc tạo nội dung tự động cho sản phẩm TikTok.

- **AutoFlow** — đại diện cho một sản phẩm, chứa cấu hình tự động hoá (webhook, API URL, bật/tắt)
- **Prompt Library** — thư viện prompt độc lập, quản lý riêng biệt, được AutoFlow tham chiếu qua `promptIds`

### Kiến trúc

```
TikTok Account
  ├── 📝 Prompt Library (independent, per account)
  │     ├── Prompt A (title, content, subPrompt, mediaId)
  │     ├── Prompt B
  │     └── Prompt C
  │
  └── ⚡ AutoFlow[] (1 per product)
        ├── productId, productTitle, productImage
        ├── autoFlowUrl, n8nUrl, description
        ├── enabled, status
        └── promptIds → [Prompt A._id, Prompt C._id]  (references)
```

> [!IMPORTANT]
> Prompt là entity **độc lập** — không thuộc về AutoFlow nào. AutoFlow chỉ **tham chiếu** prompt qua mảng `promptIds`. Xóa AutoFlow **không** xóa prompt.

---

## 🗄️ Database Models

### AutoFlow Model (`src/models/AutoFlow.ts`)

| Field | Type | Required | Mô tả |
|-------|------|----------|-------|
| `accountId` | String | ✅ | ID của TikTok Account |
| `productId` | String | ✅ | ID sản phẩm TikTok |
| `productTitle` | String | ✅ | Tên sản phẩm |
| `productImage` | String | ❌ | URL ảnh sản phẩm |
| `autoFlowUrl` | String | ❌ | URL API endpoint |
| `n8nUrl` | String | ❌ | URL webhook n8n |
| `description` | String | ❌ | Mô tả (từ ShopeeLink) |
| `enabled` | Boolean | ❌ | Bật/tắt (default: `false`) |
| `status` | String | ❌ | `pending` \| `running` \| `done` \| `error` |
| `promptIds` | String[] | ❌ | Mảng ID tham chiếu đến Prompt |
| `videoFiles` | MediaFile[] | ❌ | Danh sách video đính kèm (url, publicId, type) — upload Cloudinary |

**Collection:** `autoflows`

### Prompt Model (`src/models/Prompt.ts`)

| Field | Type | Required | Mô tả |
|-------|------|----------|-------|
| `accountId` | String | ✅ | ID của TikTok Account |
| `title` | String | ✅ | Tiêu đề prompt |
| `content` | String | ✅ | Nội dung prompt (max 90 từ) |
| `subPrompt` | String | ❌ | Nội dung sub-prompt bổ sung |
| `mediaId` | String | ❌ | Media ID (từ Veo3 Media) |
| `order` | Number | ❌ | Thứ tự sắp xếp |

**Collection:** `prompts`

> [!NOTE]
> Prompt **không** chứa thông tin sản phẩm. Mối liên hệ với sản phẩm được xác định qua AutoFlow.

---

## 🔌 API Endpoints

### AutoFlow API (`/api/autoflows`)

#### GET — Lấy danh sách AutoFlow (kèm prompts)

```
GET /api/autoflows?accountId={accountId}&productId={productId}
```

**Query Parameters:**

| Param | Type | Mô tả |
|-------|------|-------|
| `accountId` | String | Lọc theo TikTok Account ID |
| `productId` | String | Lọc theo Product ID |
| `randomPrompt` | `true` | Chỉ trả về **1 prompt random** và **1 video random** cho mỗi AutoFlow |

##### Chế độ bình thường (trả về tất cả)

```
GET /api/autoflows?accountId=xxx&productId=yyy
```

##### Chế độ random (cho n8n/auto flow)

```
GET /api/autoflows?accountId=xxx&productId=yyy&randomPrompt=true
```

> [!TIP]
> Dùng `randomPrompt=true` khi tích hợp n8n — mỗi lần gọi API sẽ nhận được 1 prompt và 1 video khác nhau để tạo content đa dạng.

Response trả về AutoFlow kèm danh sách Prompt đã được populate từ `promptIds`:

```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "accountId": "...",
      "productId": "1234567890",
      "productTitle": "Sản phẩm A",
      "promptIds": ["promptId1", "promptId2"],
      "prompts": [
        {
          "_id": "promptId1",
          "title": "Prompt 1",
          "content": "Nội dung...",
          "mediaId": ""
        }
      ],
      "videoFiles": [
        { "url": "https://...", "publicId": "...", "type": "video" }
      ]
    }
  ]
}
```

> [!NOTE]
> Khi `randomPrompt=true`, mảng `prompts` và `videoFiles` trong response sẽ chỉ có **1 phần tử** được chọn ngẫu nhiên.

#### POST — Tạo AutoFlow

```json
POST /api/autoflows
{
  "accountId": "...",
  "productId": "...",
  "productTitle": "...",
  "promptIds": ["promptId1", "promptId2"],
  "videoFile": { "url": "https://...", "publicId": "...", "type": "video" },
  "n8nUrl": "https://n8n.example.com/webhook/..."
}
```

#### PUT — Cập nhật AutoFlow

```json
PUT /api/autoflows
{ "id": "autoflow_id", "promptIds": ["promptId1"], "enabled": true }
```

#### DELETE — Xóa AutoFlow

```
DELETE /api/autoflows?id={autoflowId}
```

> [!TIP]
> Xóa AutoFlow **không** xóa prompt. Prompt vẫn tồn tại trong Prompt Library.

---

### Prompt API (`/api/prompts`)

#### GET — Lấy danh sách Prompt

```
GET /api/prompts?accountId={accountId}
```

#### POST — Tạo Prompt

```json
POST /api/prompts
{
  "accountId": "...",
  "title": "...",
  "content": "...",
  "subPrompt": "...",
  "mediaId": ""
}
```

#### PUT — Cập nhật Prompt

```json
PUT /api/prompts
{ "id": "prompt_id", "title": "...", "content": "..." }
```

#### DELETE — Xóa Prompt

```
DELETE /api/prompts?id={promptId}
```

---

## 🖥️ UI Components

### Trang TikTok Account (`src/app/(admin)/tiktok-accounts/[username]/page.tsx`)

Layout từ trên xuống:
1. **Account Header** — Thông tin tài khoản
2. **Lịch đăng bài** — Scheduled posts
3. **⚡ AutoFlow** — Danh sách AutoFlow cards
4. **📝 Prompt Library** — Quản lý prompt độc lập (CRUD)
5. **🎬 Veo3 Media** — Quản lý media
6. **Danh sách sản phẩm** — Product grid

### AutoFlowModal (`src/components/shop/tiktok-accounts/AutoFlowModal.tsx`)

| Prop | Type | Mô tả |
|------|------|-------|
| `isOpen` / `setIsOpen` | `boolean` / `fn` | Đóng/mở modal |
| `accountId` | `string` | ID tài khoản |
| `products` | `any[]` | Danh sách sản phẩm |
| `autoflows` | `any[]` | AutoFlow hiện tại (lọc trùng) |
| `editingAutoFlow` | `any` | AutoFlow đang sửa (null = tạo mới) |
| `onRefresh` | `fn` | Callback refresh |
| `shopeeLinks` | `any[]` | ShopeeLink (lấy description) |
| `allPrompts` | `any[]` | Tất cả prompt (cho multi-select) |

**Form fields:** Sản phẩm, Shopee Link, n8n URL, **Chọn Prompts** (multi-select), **Video** (Cloudinary upload)

### PromptModal (`src/components/shop/tiktok-accounts/PromptModal.tsx`)

| Prop | Type | Mô tả |
|------|------|-------|
| `isOpen` / `setIsOpen` | `boolean` / `fn` | Đóng/mở modal |
| `accountId` | `string` | ID tài khoản |
| `editingPrompt` | `any` | Prompt đang sửa (null = tạo mới) |
| `onRefresh` | `fn` | Callback refresh |
| `veo3Media` | `any[]` | Veo3 Media (dropdown chọn mediaId) |

**Form fields:** Tiêu đề, Media ID (select từ Veo3), Nội dung (max 90 từ), **Sub Prompt** (text, optional)

---

## 🎬 Video Upload (Cloudinary)

Mỗi AutoFlow có thể đính kèm **nhiều video**, upload qua Cloudinary widget.

**Config:** `autoFlowVideoUploadConfig` trong `src/utils/cloudinaryConfig.ts`

| Thuộc tính | Giá trị |
|-----------|---------|
| resourceType | `video` |
| Formats | mp4, mov, avi, webm |
| Max size | 100MB |
| Sources | local, url |

**Luồng:**
1. Trong AutoFlowModal, nhấn "🎬 Thêm Video"
2. Cloudinary widget mở → chọn file video
3. Upload xong → video được **thêm vào danh sách** + hiển thị preview + nút xóa riêng
4. Có thể upload nhiều video lần lượt
5. Submit → lưu `videoFiles: [{ url, publicId, type: 'video' }, ...]` vào AutoFlow

**Hiển thị:** Danh sách video ở cuối mỗi AutoFlow card trên trang TikTok Account (với controls, max height 160px mỗi video).

> [!NOTE]
> **Backward compat:** API GET tự động migrate dữ liệu cũ `videoFile` → `videoFiles: [videoFile]`

---

## 🔄 Luồng hoạt động

```
1. Vào trang TikTok Account
2. Tạo prompt trong Prompt Library (title, content, mediaId)
3. Tạo AutoFlow → chọn sản phẩm + chọn prompts + upload video
4. Bật/tắt AutoFlow bằng Switch
5. Copy API URL / n8n URL để tích hợp service ngoài
```

---

## 🧪 Testing

Test files:
- `src/components/shop/tiktok-accounts/__tests__/AutoFlowModal.test.tsx` — 24 tests
- `src/components/shop/tiktok-accounts/__tests__/PromptModal.test.tsx` — 13 tests

```bash
npx jest --testPathPattern="tiktok-accounts/__tests__/(AutoFlowModal|PromptModal)"
```

---

*Tài liệu cập nhật: 10/02/2026*
*Thêm `randomPrompt=true` — random 1 prompt + 1 video cho n8n integration*
*Thêm multi-video support cho AutoFlow (`videoFile` → `videoFiles`)*

