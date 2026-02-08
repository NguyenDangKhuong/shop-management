# ⚡ AutoFlow - Hệ thống quản lý Prompt tự động

## 📋 Tổng quan

**AutoFlow** là tính năng quản lý prompt tự động, cho phép gán các tập prompt vào từng sản phẩm TikTok. Mỗi AutoFlow đại diện cho một sản phẩm cụ thể và chứa nhiều prompt con phục vụ việc tạo nội dung tự động.

### Kiến trúc

```
TikTok Account
  └── AutoFlow (1 per product)
        ├── enabled: true/false
        ├── productId, productTitle, productImage
        ├── autoFlowUrl (API endpoint for this flow)
        ├── n8nUrl (optional, n8n webhook URL)
        └── Prompt[] (nhiều prompt per product)
              ├── title
              ├── content
              └── mediaId (optional, chọn từ Veo3 Media)
```

---

## 🗄️ Database Models

### AutoFlow Model

| Field | Type | Required | Mô tả |
|-------|------|----------|-------|
| `accountId` | String | ✅ | ID của TikTok Account |
| `productId` | String | ✅ | ID sản phẩm TikTok |
| `productTitle` | String | ✅ | Tên sản phẩm |
| `productImage` | String | ❌ | URL ảnh sản phẩm |
| `autoFlowUrl` | String | ❌ | URL API endpoint của AutoFlow (tự động tạo khi tạo/sửa) |
| `n8nUrl` | String | ❌ | URL webhook n8n (optional, nhập tay) |
| `enabled` | Boolean | ❌ | Trạng thái bật/tắt (default: `false`) |
| `createdAt` | Date | Auto | Thời gian tạo |
| `updatedAt` | Date | Auto | Thời gian cập nhật |

**Collection:** `autoflows`
**File:** `src/models/AutoFlow.ts`

### Prompt Model

| Field | Type | Required | Mô tả |
|-------|------|----------|-------|
| `productId` | String | ✅ | ID sản phẩm (liên kết với AutoFlow) |
| `title` | String | ✅ | Tiêu đề prompt |
| `content` | String | ✅ | Nội dung prompt |
| `mediaId` | String | ❌ | Media ID (optional, chọn từ danh sách Veo3 Media) |
| `createdAt` | Date | Auto | Thời gian tạo |
| `updatedAt` | Date | Auto | Thời gian cập nhật |

**Collection:** `prompts`
**File:** `src/models/Prompt.ts`

> [!IMPORTANT]
> `productId` là khóa liên kết giữa AutoFlow và Prompt. Khi xóa AutoFlow, tất cả Prompt có cùng `productId` sẽ bị xóa theo (cascade delete).

---

## 🔌 API Endpoints

### AutoFlow API (`/api/autoflows`)

#### GET - Lấy danh sách AutoFlow

```
GET /api/autoflows?accountId={accountId}&productId={productId}
```

Cả hai tham số `accountId` và `productId` đều là optional. Có thể dùng riêng lẻ hoặc kết hợp.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "accountId": "...",
      "productId": "1234567890",
      "productTitle": "Sản phẩm A",
      "productImage": "https://...",
      "autoFlowUrl": "https://domain/api/autoflows?accountId=...&productId=1234567890",
      "enabled": true,
      "prompts": [
        {
          "_id": "...",
          "productId": "1234567890",
          "title": "Prompt 1",
          "content": "Nội dung prompt...",
          "mediaId": ""
        }
      ]
    }
  ]
}
```

> [!NOTE]
> GET trả về AutoFlow kèm theo tất cả Prompt con (populated via `productId` match).

#### POST - Tạo AutoFlow mới

```
POST /api/autoflows
Content-Type: application/json

{
  "accountId": "...",
  "productId": "...",
  "productTitle": "...",
  "productImage": "...",
  "autoFlowUrl": "https://domain/api/autoflows?accountId=...&productId=...",
  "n8nUrl": "https://your-n8n.com/webhook/...",
  "enabled": false
}
```

#### PUT - Cập nhật AutoFlow

```
PUT /api/autoflows
Content-Type: application/json

{
  "id": "autoflow_id",
  "enabled": true
}
```

#### DELETE - Xóa AutoFlow

```
DELETE /api/autoflows?id={autoflowId}
```

> [!CAUTION]
> DELETE sẽ xóa cả AutoFlow và tất cả Prompt con có cùng `productId`.

---

### Prompt API (`/api/prompts`)

#### GET - Lấy danh sách Prompt theo sản phẩm

```
GET /api/prompts?productId={productId}
```

Đây là API endpoint hiển thị trên mỗi AutoFlow card trong giao diện. Copy URL từ giao diện để gọi API lấy prompt cho sản phẩm cụ thể.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "productId": "1234567890",
      "title": "Prompt 1",
      "content": "Nội dung prompt...",
      "mediaId": "",
      "createdAt": "...",
      "updatedAt": "..."
    }
  ]
}
```

#### POST - Tạo Prompt mới

```
POST /api/prompts
Content-Type: application/json

{
  "productId": "...",
  "title": "...",
  "content": "...",
  "mediaId": ""
}
```

#### PUT - Cập nhật Prompt

```
PUT /api/prompts
Content-Type: application/json

{
  "id": "prompt_id",
  "title": "...",
  "content": "...",
  "mediaId": ""
}
```

#### DELETE - Xóa Prompt

```
DELETE /api/prompts?id={promptId}
```

---

## 🖥️ UI Components

### AutoFlowModal (`src/components/shop/tiktok-accounts/AutoFlowModal.tsx`)

Modal để tạo/chỉnh sửa AutoFlow. Hiển thị select chọn sản phẩm, tự động lọc bỏ sản phẩm đã có AutoFlow.

**Props:**

| Prop | Type | Mô tả |
|------|------|-------|
| `isOpen` | `boolean` | Trạng thái hiển thị modal |
| `setIsOpen` | `(open: boolean) => void` | Callback đóng/mở modal |
| `accountId` | `string` | ID tài khoản TikTok |
| `products` | `any[]` | Danh sách sản phẩm |
| `autoflows` | `any[]` | Danh sách AutoFlow hiện tại (để lọc trùng) |
| `editingAutoFlow` | `any` | AutoFlow đang chỉnh sửa (null = tạo mới) |
| `onRefresh` | `() => void` | Callback refresh data |

**Form fields:**
- **Sản phẩm** — Select dropdown chọn product (required)
- **n8n URL** — Input text nhập webhook URL (optional)

### PromptModal (`src/components/shop/tiktok-accounts/PromptModal.tsx`)

Modal để tạo/chỉnh sửa Prompt trong một AutoFlow cụ thể.

**Props:**

| Prop | Type | Mô tả |
|------|------|-------|
| `isOpen` | `boolean` | Trạng thái hiển thị modal |
| `setIsOpen` | `(open: boolean) => void` | Callback đóng/mở modal |
| `productId` | `string` | ID sản phẩm mà prompt thuộc về |
| `editingPrompt` | `any` | Prompt đang chỉnh sửa (null = tạo mới) |
| `onRefresh` | `() => void` | Callback refresh data |
| `veo3Media` | `any[]` | Danh sách Veo3 Media (để hiển thị dropdown chọn mediaId) |

**Form fields:**
- **Tiêu đề** — Input text (required)
- **Media ID** — Select dropdown chọn từ Veo3 Media, hiển thị thumbnail (optional)
- **Nội dung** — TextArea (required)

### TikTok Account Page (`src/app/(admin)/tiktok-accounts/[username]/page.tsx`)

Trang chi tiết TikTok Account hiển thị:
1. **Account Header** — Thông tin tài khoản
2. **Lịch đăng bài** — Scheduled posts
3. **⚡ AutoFlow** — Danh sách AutoFlow cards, mỗi card hiển thị:
   - Toggle bật/tắt
   - Thông tin sản phẩm (ảnh, tên)
   - Số lượng prompt
   - API endpoint URL (clickable, mở tab mới, có nút copy)
   - n8n URL (nếu có — clickable, màu xanh lá, mở tab mới, có nút copy)
   - Nút ✏️ sửa AutoFlow (chỉnh product, n8n URL)
   - Danh sách prompt con (hiển thị thumbnail Veo3 Media + mediaId, copy, edit, delete)
4. **🎬 Veo3 Media** — Quản lý media cho account (xem `docs/VEO3_MEDIA.md`)
5. **Danh sách sản phẩm** — Product grid

---

## 🔄 Luồng hoạt động

```
1. Người dùng vào trang TikTok Account
2. Hệ thống fetch AutoFlows + Products
3. Người dùng tạo AutoFlow → chọn sản phẩm
4. Trong AutoFlow, thêm Prompt → nhập title, content, mediaId
5. Bật/tắt AutoFlow bằng Switch
6. Copy API URL để gọi từ service khác
```

---

*Tài liệu cập nhật: 08/02/2026*
*Cập nhật gần nhất: Thêm n8nUrl, edit button, clickable links, Veo3 Media integration*
