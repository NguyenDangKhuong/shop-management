# Auto-Fix Self-Healing Pipeline (Zalo Alert)

Tài liệu hướng dẫn cơ chế tự động phát hiện, sửa lỗi bằng AI và tạo Pull Request kết hợp báo động qua Zalo.

---

## 🏗️ Kiến trúc & Luồng hoạt động

```
[ Lỗi Prod / Staging ]
          │
          ▼ (1. Bắt lỗi / Sentry Free / Custom Code)
   GitHub Dispatch API (POST /dispatches)
          │
          ▼ (2. Trigger Workflow)
   GitHub Actions (auto-fix.yml)
          │
          ├─→ (3. Run CLI Script) ──→ auto-fix.js
          │                             │ (Gọi API với API Key: "khuong")
          │                             ▼
          │                       CLI Proxy (gemini-3-flash-preview)
          │                             │ (Phân tích & viết lại code sửa lỗi)
          │                             ▼
          │                       Ghi đè file nguồn trực tiếp
          │
          ├─→ (4. Verification) ──→ Chạy `pnpm run build`
          │                             │ (Nếu lỗi build, chạy script tự sửa lại lần 2)
          │
          ├─→ (5. PR Creation)  ──→ gh pr create (Target: master branch)
          │
          ▼ (6. Notification)
   Zalo Bot Relay (zalo-relay.khuong.theworkpc.com/uptime-webhook)
          │
          ▼
   📱 Điện thoại Zalo của bạn (Tin nhắn thông báo trạng thái & link PR)
```

---

## 🛠️ 1. Các thành phần chính

### A. Script sửa lỗi: `scripts/auto-fix.js`
*   **Vị trí:** [scripts/auto-fix.js](file:///Users/khuongn/Downloads/shop-management/scripts/auto-fix.js)
*   **Chức năng:** 
    *   Đọc nội dung file lỗi.
    *   Gửi prompt chứa nội dung file + stack trace qua CLI Proxy (`https://cli-proxy.khuong.theworkpc.com/v1/chat/completions`) bằng API Key `khuong`.
    *   Sử dụng model **`gemini-3-flash-preview`** (do gpt-5-codex bị giới hạn trên tài khoản ChatGPT).
    *   Tách lọc phần giải thích lỗi của AI và ghi đè nội dung code mới đã được sửa vào file nguồn.

### B. Workflow tự động: `.github/workflows/auto-fix.yml`
*   **Vị trí:** [.github/workflows/auto-fix.yml](file:///Users/khuongn/Downloads/shop-management/.github/workflows/auto-fix.yml)
*   **Chức năng:**
    *   Lắng nghe sự kiện `repository_dispatch` (từ webhook tự động) hoặc chạy thủ công bằng `workflow_dispatch`.
    *   Cài đặt Node 22, pnpm, và cài dependencies.
    *   Chạy script sửa lỗi.
    *   Xác minh bản sửa lỗi bằng cách chạy `pnpm run build`.
    *   **Self-Healing (Tự sửa lỗi của mình):** Nếu bản sửa đầu tiên gây lỗi compile/build, workflow sẽ tự động gửi thông báo lỗi build đó cho Gemini để chạy sửa lần 2.
    *   Tạo Pull Request tự động nhắm vào nhánh `master`.
    *   Gửi thông báo trạng thái kèm link PR về **Zalo Bot Relay** của bạn.

---

## 🚀 2. Hướng dẫn cấu hình trên GitHub

Để hệ thống hoạt động tự động, bạn cần cấu hình các thông tin sau trên kho lưu trữ GitHub của mình (*Settings -> Secrets and Variables -> Actions*):

1.  **`GH_PAT`** (Repository Secret):
    *   Tạo một Personal Access Token (PAT) trên tài khoản GitHub của bạn có quyền `repo` và `workflow`.
    *   Token này giúp GitHub Actions có quyền tạo branch mới và mở Pull Request trực tiếp trên nhánh `master`.
2.  **`CLI_PROXY_KEY`** (Tùy chọn):
    *   Mặc định là `khuong` (đã hardcoded trong script). Bạn có thể cấu hình secret này nếu muốn đổi API key khác.

---

## 🧪 3. Hướng dẫn kích hoạt & Kiểm tra

### Cách A: Kích hoạt thủ công (Manual Test)
1.  Truy cập tab **Actions** trên repo GitHub của bạn.
2.  Chọn workflow **Auto-Fix Self-Healing Pipeline**.
3.  Nhấn **Run workflow** và nhập:
    *   `file_path`: Đường dẫn file lỗi (Ví dụ: `src/app/blogs/components/BlogListContent.tsx`).
    *   `error_message`: Lỗi giả lập (Ví dụ: `ReferenceError: somethingIsNotDefined is not defined`).
4.  Bấm chạy và theo dõi log, sau đó check tin nhắn Zalo xem có thông báo kèm link PR được gửi về không.

### Cách B: Gửi Webhook tự động (Dành cho Sentry/Custom Server)
Gửi một request `POST` đến API của GitHub để trigger workflow từ xa khi hệ thống giám sát phát hiện lỗi trên production:

```bash
curl -X POST https://api.github.com/repos/NguyenDangKhuong/shop-management/dispatches \
  -H "Authorization: Bearer <YOUR_GITHUB_PAT>" \
  -H "Accept: application/vnd.github.v3+json" \
  -d '{
    "event_type": "prod_error_alert",
    "client_payload": {
      "file": "src/app/blogs/components/BlogListContent.tsx",
      "message": "ReferenceError: activeIndex is not defined",
      "stack": "ReferenceError: activeIndex is not defined at BlogListContent.tsx:88"
    }
  }'
```
