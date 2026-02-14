# 🔑 Veo3 Token - Quản lý Token cho Veo3

## 📋 Tổng quan

**Veo3 Token** là tính năng quản lý các token dùng để xác thực / kết nối với dịch vụ Veo3. Mỗi token có một giá trị (`value`) và trạng thái kiểm tra (`tokenCheckStatus`) tùy chọn. Hệ thống hỗ trợ CRUD đầy đủ với giao diện responsive cho cả desktop (bảng) và mobile (card).

### Kiến trúc

```
Veo3 Token
  ├── value: string (bắt buộc - giá trị token)
  ├── projectId?: string (optional - ID project)
  ├── sessionId?: string (optional - ID session)
  └── tokenCheckStatus?: string (optional - trạng thái kiểm tra)
```

**Trang quản lý:** `/veo3-tokens`

---

## 🗄️ Database Model

### Veo3Token Model

| Field | Type | Required | Mô tả |
|-------|------|----------|-------|
| `value` | String | ✅ | Giá trị token |
| `projectId` | String | ❌ | ID project (default: `''`) |
| `sessionId` | String | ❌ | ID session (default: `''`) |
| `tokenCheckStatus` | String | ❌ | Trạng thái kiểm tra token (default: `''`) |
| `createdAt` | Date | Auto | Thời gian tạo |
| `updatedAt` | Date | Auto | Thời gian cập nhật |

**Collection:** `veo3tokens`
**File:** `src/models/Veo3Token.ts`

---

## 🔌 API Endpoints (`/api/veo3-tokens`)

### GET - Lấy danh sách tất cả tokens

```
GET /api/veo3-tokens
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "value": "eyJhbGciOiJSUzI1NiIs...",
      "projectId": "my-project-123",
      "sessionId": "session-abc-456",
      "tokenCheckStatus": "valid",
      "createdAt": "2026-02-14T...",
      "updatedAt": "2026-02-14T..."
    }
  ]
}
```

> [!NOTE]
> Kết quả được sắp xếp theo `createdAt` giảm dần (token mới nhất đứng đầu).

### POST - Tạo token mới

```
POST /api/veo3-tokens
Content-Type: application/json

{
  "value": "your_token_here",
  "projectId": "optional_project_id",
  "sessionId": "optional_session_id",
  "tokenCheckStatus": "optional_status"
}
```

| Field | Required | Mô tả |
|-------|----------|-------|
| `value` | ✅ | Giá trị token |
| `projectId` | ❌ | ID project |
| `sessionId` | ❌ | ID session |
| `tokenCheckStatus` | ❌ | Trạng thái kiểm tra |

### PUT - Cập nhật token

```
PUT /api/veo3-tokens
Content-Type: application/json

{
  "id": "token_document_id",
  "value": "updated_token_value",
  "projectId": "updated_project_id",
  "sessionId": "updated_session_id",
  "tokenCheckStatus": "updated_status"
}
```

| Field | Required | Mô tả |
|-------|----------|-------|
| `id` | ✅ | MongoDB document ID |
| `value` | ❌ | Giá trị token mới |
| `projectId` | ❌ | ID project mới |
| `sessionId` | ❌ | ID session mới |
| `tokenCheckStatus` | ❌ | Trạng thái kiểm tra mới |

> [!NOTE]
> Chỉ các field được gửi lên mới được cập nhật (partial update).

### DELETE - Xóa token

```
DELETE /api/veo3-tokens?id={token_document_id}
```

---

## 🖥️ UI

### Trang quản lý

Trang **Veo3 Tokens** (`/veo3-tokens`) hiển thị toàn bộ danh sách token với giao diện responsive:

- **Desktop:** Bảng (Ant Design `Table`) với phân trang 20 items/trang
- **Mobile:** Danh sách card với layout dọc

### API Endpoint Banner

Trên đầu trang hiển thị một banner chứa thông tin API endpoint:
- Method: `POST`
- URL: `{origin}/api/veo3-tokens`
- Body mẫu: `{ "value": "your_token_here" }`
- Nút copy URL

> [!TIP]
> Banner này giúp dễ dàng copy endpoint để gửi token từ hệ thống bên ngoài (ví dụ: n8n, script tự động...).

### Chức năng

1. **Thêm token** — Nhấn "Thêm Token" → Modal mở → Nhập `value` (bắt buộc) và `tokenCheckStatus` (tùy chọn) → Lưu
2. **Sửa token** — Nhấn ✏️ trên row/card → Modal mở với dữ liệu cũ → Sửa → Lưu
3. **Xóa token** — Nhấn 🗑️ → Xác nhận Popconfirm → Xóa
4. **Copy token** — Nhấn icon copy bên cạnh giá trị token hoặc token check status

### Cột hiển thị (Desktop)

| Cột | Mô tả |
|-----|-------|
| Token | Giá trị token (truncate 80 ký tự, monospace) + nút copy |
| Project ID | ID project (truncate 30 ký tự) + nút copy |
| Session ID | ID session (truncate 30 ký tự) + nút copy |
| Token Check Status | Trạng thái kiểm tra (truncate 40 ký tự) + nút copy |
| Cập nhật | Thời gian cập nhật (format `vi-VN`) |
| Hành động | Nút sửa + xóa |

### File liên quan

| File | Mô tả |
|------|-------|
| `src/models/Veo3Token.ts` | Mongoose model & schema |
| `src/app/api/veo3-tokens/route.ts` | API route handlers (GET/POST/PUT/DELETE) |
| `src/app/(admin)/veo3-tokens/page.tsx` | Admin page (revalidate 60s) |
| `src/components/shop/veo3-tokens/Veo3TokenTable.tsx` | Table/Card UI component |

---

*Tài liệu tạo: 14/02/2026*
*Cập nhật: 14/02/2026 — Thêm field `projectId` và `sessionId`*
