# ⚡ AutoFlow

## 📋 Tổng quan

Hệ thống AutoFlow phục vụ việc tạo nội dung tự động cho sản phẩm TikTok.

- **AutoFlow** — đại diện cho một sản phẩm, chứa cấu hình tự động hoá (webhook, API URL, bật/tắt)
- **Prompt Library** — thư viện prompt độc lập, được AutoFlow tham chiếu qua `promptIds`. Xem [PROMPT.md](PROMPT.md)

### Kiến trúc

```
TikTok Account
  ├── 📝 Prompt Library → xem PROMPT.md
  │
  └── ⚡ AutoFlow[] (1 per product)
        ├── productId, productTitle, productImage
        ├── autoFlowUrl, n8nUrl, shopeeLinkId, description
        ├── enabled, status
        ├── referenceImages → [{imageUsageType, mediaId}]  (Veo3 Media refs)
        └── promptIds → [Prompt A._id, Prompt C._id]  (references)
```

> [!IMPORTANT]
> Prompt là entity **độc lập** — không thuộc về AutoFlow nào. AutoFlow chỉ **tham chiếu** prompt qua mảng `promptIds`. Xóa AutoFlow **không** xóa prompt.

---

## 🗄️ Database Model (`src/models/AutoFlow.ts`)

| Field | Type | Required | Mô tả |
|-------|------|----------|-------|
| `accountId` | String | ✅ | ID của TikTok Account |
| `productId` | String | ✅ | ID sản phẩm TikTok |
| `productTitle` | String | ✅ | Tên sản phẩm |
| `productImage` | String | ❌ | URL ảnh sản phẩm |
| `autoFlowUrl` | String | ❌ | URL API endpoint |
| `n8nUrl` | String | ❌ | URL webhook n8n |
| `shopeeLinkId` | String | ❌ | ID tham chiếu đến ShopeeLink (để hiển thị lại khi edit) |
| `description` | String | ❌ | Mô tả (từ ShopeeLink) |
| `enabled` | Boolean | ❌ | Bật/tắt (default: `false`) |
| `status` | String | ❌ | `pending` \| `running` \| `done` \| `error` |
| `promptIds` | String[] | ❌ | Mảng ID tham chiếu đến Prompt |
| `referenceImages` | Array | ❌ | Mảng reference images từ Veo3 Media. Mỗi item: `{ imageUsageType, mediaId }` |
| `videoFiles` | MediaFile[] | ❌ | Danh sách video đính kèm (url, publicId, type) — upload Cloudinary |

**Collection:** `autoflows`

> [!IMPORTANT]
> **`referenceImages` nằm ở AutoFlow**, không phải ở Prompt. 1 AutoFlow tham chiếu nhiều prompts, tất cả dùng chung reference images. Điều này tránh duplicate dữ liệu và giúp prompt tái sử dụng được cho nhiều sản phẩm khác nhau.

---

## 🔌 API Endpoints (`/api/autoflows`)

#### GET — Lấy danh sách AutoFlow (kèm prompts)

```
GET /api/autoflows?accountId={accountId}&productId={productId}
```

**Query Parameters:**

| Param | Type | Mô tả |
|-------|------|-------|
| `accountId` | String | Lọc theo TikTok Account ID |
| `productId` | String | Lọc theo Product ID |
| `randomPrompt` | `true` | Trả về **1 prompt hook random** + **tất cả prompt describe** và **1 video random** cho mỗi AutoFlow |

##### Chế độ bình thường

```
GET /api/autoflows?accountId=xxx&productId=yyy
```

##### Chế độ random (cho n8n)

```
GET /api/autoflows?accountId=xxx&productId=yyy&randomPrompt=true
```

> [!TIP]
> Dùng `randomPrompt=true` khi tích hợp n8n — API sẽ random chọn **hook mode** hoặc **describe mode**.

Response trả về AutoFlow kèm danh sách Prompt đã được populate từ `promptIds`.
`referenceImages` của AutoFlow được inject vào từng prompt trong response:

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
      "referenceImages": [
        { "imageUsageType": "IMAGE_USAGE_TYPE_ASSET", "mediaId": "CAMaJGJm..." },
        { "imageUsageType": "IMAGE_USAGE_TYPE_ASSET", "mediaId": "CAMaJDg0..." }
      ],
      "prompts": [
        {
          "_id": "promptId1",
          "title": "Hook Prompt",
          "content": "Nội dung hook...",
          "type": "hook",
          "referenceImages": [
            { "imageUsageType": "IMAGE_USAGE_TYPE_ASSET", "mediaId": "CAMaJGJm..." },
            { "imageUsageType": "IMAGE_USAGE_TYPE_ASSET", "mediaId": "CAMaJDg0..." }
          ]
        },
        {
          "_id": "promptId2",
          "title": "Describe Prompt",
          "content": "Nội dung describe...",
          "type": "describe",
          "referenceImages": [
            { "imageUsageType": "IMAGE_USAGE_TYPE_ASSET", "mediaId": "CAMaJGJm..." },
            { "imageUsageType": "IMAGE_USAGE_TYPE_ASSET", "mediaId": "CAMaJDg0..." }
          ]
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
> - `referenceImages` được **lưu ở AutoFlow**, nhưng API inject vào **từng prompt** trong response để tiện cho n8n
> - Khi `randomPrompt=true`, random chọn 1 trong 2 mode:
>   - **Hook mode**: 1 hook prompt random + 1 video random + **không có** `referenceImages`
>   - **Describe mode**: tất cả describe prompts + `referenceImages` + **không có** `videoFiles`

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

## 🖥️ UI — AutoFlowModal (`src/components/shop/tiktok-accounts/AutoFlowModal.tsx`)

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
| `veo3Media` | `any[]` | Veo3 Media (dropdown chọn referenceImages) |

**Form fields:** Sản phẩm, Shopee Link, n8n URL, **Chọn Prompts** (multi-select), **Reference Images** (multi-select từ Veo3 Media), **Video** (Cloudinary upload)

> [!IMPORTANT]
> Hiển thị theo prompt đầu tiên được chọn:
> - **Hook** → ẩn Reference Images, hiện Video
> - **Describe** → hiện Reference Images, ẩn Video
> - **Chưa chọn prompt** → hiện cả hai

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

> [!NOTE]
> **Backward compat:** API GET tự động migrate dữ liệu cũ `videoFile` → `videoFiles: [videoFile]`

---

## 🧪 Testing

Test file: `src/components/shop/tiktok-accounts/__tests__/AutoFlowModal.test.tsx` — 30 tests

```bash
npx jest --testPathPattern="AutoFlowModal"
```

---

*Tài liệu cập nhật: 16/02/2026*
