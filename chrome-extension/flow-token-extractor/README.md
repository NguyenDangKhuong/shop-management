# 🔑 Flow Token Extractor - Chrome Extension

Chrome Extension tự động bắt token `ya29.*` từ Google Flow (Veo3) và gửi lên API.

## Tính năng

- **Bắt token tự động**: Lắng nghe tất cả request đến `*.googleapis.com`, tự động trích xuất token `ya29.*` từ header `Authorization`
- **Auto-PUT**: Tự động gửi token mới nhất lên API theo chu kỳ (tuỳ chỉnh số phút)
- **PUT thủ công**: Nhấn nút PUT để gửi token đang chọn lên API ngay lập tức
- **Giao diện dark theme**: Popup hiện đại, dễ sử dụng

## Cài đặt

1. Mở Chrome → `chrome://extensions/`
2. Bật **Developer mode** (góc trên bên phải)
3. Nhấn **Load unpacked** → chọn thư mục `chrome-extension/flow-token-extractor`
4. Extension sẽ xuất hiện trên thanh toolbar

## Cách sử dụng

### 1. Cấu hình API
- API mặc định: `https://shop.thetaphoa.store/api/veo3-tokens`
- Có thể thay đổi URL trong ô **API Endpoint** → nhấn **Save**

### 2. Bắt token
- Vào trang Google Flow / Veo3 (`labs.google` hoặc bất kỳ service nào dùng `googleapis.com`)
- Extension tự động bắt token từ request headers
- Số lượng token hiện trên badge góc phải

### 3. PUT thủ công
- Chọn token trong danh sách → nhấn nút **PUT**
- Extension sẽ GET token hiện tại từ API, lấy `_id`, rồi PUT update `value`
- Nếu chưa có token trên server → tự động POST tạo mới

### 4. Auto-PUT
- Nhập số phút (mặc định: 5) → bật toggle **Auto-PUT**
- Mỗi chu kỳ, extension tự GET → PUT token mới nhất lên API
- Trạng thái lần PUT gần nhất hiển thị bên dưới toggle

## Cấu trúc file

```
flow-token-extractor/
├── manifest.json      # Cấu hình extension (permissions, host_permissions)
├── background.js      # Service worker: bắt request, auto-PUT alarm
├── popup.html         # Giao diện popup
├── popup.js           # Logic popup: hiển thị token, PUT, toggle auto
├── popup.css          # Style dark theme
└── icons/             # Icon extension 16/48/128px
```

## API Flow

```
┌─────────────┐     GET /api/veo3-tokens      ┌─────────────┐
│  Extension  │ ──────────────────────────────→│   Server    │
│             │     ← { data: [{ _id, ... }] } │             │
│             │                                │             │
│             │     PUT /api/veo3-tokens       │             │
│             │     { id: _id, value: ya29.* } │             │
│             │ ──────────────────────────────→│             │
└─────────────┘                                └─────────────┘
```

## Permissions

| Permission | Mục đích |
|---|---|
| `webRequest` | Lắng nghe request headers để bắt token |
| `storage` | Lưu config, token, trạng thái auto-PUT |
| `alarms` | Lên lịch auto-PUT theo chu kỳ |
| `*://*.googleapis.com/*` | Bắt request đến Google APIs |
| `*://shop.thetaphoa.store/*` | Gọi API server |
