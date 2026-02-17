# 🔑 Flow Token Extractor - Chrome Extension

Chrome Extension tự động bắt token `ya29.*` và **reCAPTCHA Enterprise token** từ Google Flow (Veo3) và gửi lên API.

## Tính năng

- **Bắt ya29 token tự động**: Lắng nghe request đến `*.googleapis.com`, trích xuất `ya29.*` từ header `Authorization`
- **Bắt reCAPTCHA Enterprise token**: Content script inject vào trang Flow, intercept `fetch` calls tới `batchAsyncGenerateVideoText` để capture reCAPTCHA token, `sessionId`, `projectId`, prompt, model
- **Auto-PUT**: Tự động gửi token mới nhất lên API theo chu kỳ (tuỳ chỉnh số phút)
- **PUT thủ công**: Nhấn nút PUT để gửi token đang chọn lên API ngay lập tức
- **Giao diện dark theme**: Popup hiện đại, hiển thị đầy đủ thông tin captured

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
- Vào trang Google Flow / Veo3 (`labs.google/fx/*`)
- Extension tự động bắt `ya29.*` token từ request headers
- Khi tạo video, content script tự động capture thêm:
  - 🛡️ **reCAPTCHA Enterprise token** 
  - 📋 **Session ID**
  - 📁 **Project ID**
  - 💬 **Prompt** và 🎬 **Model**
- Badge: 🟢 = ya29 only, 🟠 = ya29 + reCAPTCHA

### 3. PUT thủ công
- Chọn token trong danh sách → nhấn nút **PUT**
- Extension gửi `value`, `sessionId`, `projectId` lên API

### 4. Auto-PUT
- Nhập số phút (mặc định: 5) → bật toggle **Auto-PUT**
- Mỗi chu kỳ, extension tự GET → PUT token mới nhất lên API

## Cấu trúc file

```
flow-token-extractor/
├── manifest.json      # Cấu hình extension (permissions, content_scripts)
├── background.js      # Service worker: bắt headers, xử lý messages, auto-PUT
├── content.js         # Content script: inject fetch interceptor vào trang Flow
├── popup.html         # Giao diện popup
├── popup.js           # Logic popup: hiển thị token, PUT, toggle auto
├── popup.css          # Style dark theme
└── icons/             # Icon extension 16/48/128px
```

## Kiến trúc

```
┌────────────────────┐   window.postMessage    ┌──────────────┐
│  Page Script       │ ──────────────────────→ │Content Script│
│  (injected fetch)  │   VEO3_REQUEST_CAPTURED │  (content.js)│
└────────────────────┘                         └──────┬───────┘
                                                      │ chrome.runtime.sendMessage
┌────────────────────┐   chrome.webRequest     ┌──────▼───────┐
│  Network Requests  │ ──────────────────────→ │ Background   │
│  (ya29.* headers)  │   onBeforeSendHeaders   │ (background  │
└────────────────────┘                         │   .js)       │
                                               └──────┬───────┘
                                                      │ fetch PUT/POST
                                               ┌──────▼───────┐
                                               │  API Server  │
                                               │/api/veo3-    │
                                               │  tokens      │
                                               └──────────────┘
```

## Permissions

| Permission | Mục đích |
|---|---|
| `webRequest` | Lắng nghe request headers để bắt ya29 token |
| `storage` | Lưu config, token, trạng thái auto-PUT |
| `alarms` | Lên lịch auto-PUT theo chu kỳ |
| `*://*.googleapis.com/*` | Bắt request đến Google APIs |
| `*://shop.thetaphoa.store/*` | Gọi API server |
| Content Script `labs.google/fx/*` | Inject fetch interceptor để bắt reCAPTCHA |

