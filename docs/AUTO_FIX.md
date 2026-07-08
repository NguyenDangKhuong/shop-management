# Auto-Fix Self-Healing Pipeline (Zalo Alert)

Tài liệu hướng dẫn cơ chế tự động phát hiện, sửa lỗi bằng AI và tạo Pull Request kết hợp báo động qua Zalo.

---

## 🏗️ Kiến trúc & Luồng hoạt động

```
[ Lỗi Prod / Staging ]
          │
          ├─→ (Sự cố xảy ra) ──→ [ Sentry Error Tracking ]
          │                            │ (Tự động giám sát & bắt lỗi)
          │                            ▼
          │                      [ GitHub Issue ] (Sentry tự động mở Issue mới)
          │                            │
          ▼                            ▼
   GitHub Dispatch API (POST /dispatches)  hoặc  GitHub Issues (opened)
          │
          ▼ (2. Trigger Workflow)
   GitHub Actions (auto-fix.yml)
          │
          ├─→ (3. Run CLI Script) ──→ auto-fix.js
          │                             │ (Gọi API với API Key: "khuong")
          │                             ▼
          │                       CLI Proxy (gh-gpt-4.1-mini)
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
*   **Vị trí:** [scripts/auto-fix.js](../scripts/auto-fix.js)
*   **Chức năng:** 
    *   Đọc nội dung file lỗi.
    *   Gửi prompt chứa nội dung file + stack trace qua CLI Proxy (`https://cli-proxy.khuong.theworkpc.com/v1/chat/completions`) bằng API Key `khuong`.
    *   Sử dụng model **`gh-gpt-4.1-mini`** (chạy ổn định và tránh lỗi 504 Gateway Timeout từ tài khoản Google OAuth trên proxy).
    *   Tách lọc phần giải thích lỗi của AI và ghi đè nội dung code mới đã được sửa vào file nguồn.

### B. Workflow tự động: `.github/workflows/auto-fix.yml`
*   **Vị trí:** [.github/workflows/auto-fix.yml](../.github/workflows/auto-fix.yml)
*   **Chức năng:**
    *   Lắng nghe sự kiện `repository_dispatch` (từ webhook tự động) hoặc chạy thủ công bằng `workflow_dispatch`.
    *   Cài đặt Node 22, pnpm, và cài dependencies.
    *   Chạy script sửa lỗi.
    *   Xác minh bản sửa lỗi bằng cách chạy `pnpm run build`.
    *   **Self-Healing (Tự sửa lỗi của mình):** Nếu bản sửa đầu tiên gây lỗi compile/build, workflow sẽ tự động gửi thông báo lỗi build đó cho Gemini để chạy sửa lần 2.
    *   Tạo Pull Request tự động nhắm vào nhánh `master`.
    *   Gửi thông báo trạng thái kèm link PR về **Zalo Bot Relay** của bạn.

---

## 🚀 2. Hướng dẫn cấu hình trên GitHub & Sentry

Để luồng hoạt động hoàn toàn tự động, bạn cần hoàn thành các bước cấu hình sau:

### A. Cấu hình Secrets trên GitHub
Truy cập kho lưu trữ GitHub của bạn (*Settings -> Secrets and Variables -> Actions*) và thêm:

1.  **`GH_PAT`** (Repository Secret):
    *   Tạo một Personal Access Token (PAT) trên tài khoản GitHub của bạn có quyền `repo` và `workflow`.
    *   Token này giúp GitHub Actions có quyền tạo branch mới và mở Pull Request trực tiếp trên nhánh `master`.
2.  **`SENTRY_AUTH_TOKEN`** (Repository Secret):
    *   Sử dụng mã Token Sentry của bạn (bắt đầu bằng `sntrys_...`).
    *   Token này giúp GitHub Actions tải Source Maps lên Sentry khi chạy lệnh build, hỗ trợ dịch ngược lỗi chính xác về dòng code gốc.

### B. Liên kết Sentry với GitHub Issues
1.  Truy cập Sentry Dashboard của bạn -> Chọn **Settings** -> **Integrations** -> Chọn **GitHub**.
2.  Tiến hành liên kết với tài khoản/tổ chức GitHub chứa repo `shop-management`.
3.  Vào phần dự án Sentry của bạn -> Chọn **Alerts** -> Tạo một **Alert Rule**:
    *   *Điều kiện (When)*: Khi phát hiện ra sự kiện lỗi mới (New Issue).
    *   *Hành động (Then)*: Tạo một Issue tương ứng trên kho lưu trữ GitHub của dự án (`shop-management`).

### C. Cách thức phân tích file lỗi tự động
Khi Sentry tạo ra một GitHub Issue:
1.  Workflow sẽ tự động được kích hoạt thông qua sự kiện `issues: [opened]`.
2.  Workflow sử dụng đoạn mã Node.js để quét tiêu đề lỗi (Error Message) và phần thân Issue (Error Stack).
3.  Nó sẽ tìm kiếm các chuỗi ký tự khớp với đường dẫn file trong thư mục `src/` (ví dụ: `src/app/blogs/components/BlogListContent.tsx`).
4.  Nếu khớp với file tồn tại trong repo, nó tự động gán đường dẫn đó để chạy luồng Auto-Fix bằng AI.

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

---

## 📱 4. Cách sử dụng Zalo Webhook Relay (Tham khảo)

Dịch vụ `zalo-relay` chạy trên VPS của bạn tại `https://zalo-relay.khuong.theworkpc.com` có thể được gọi thủ công để gửi tin nhắn bất kỳ về Zalo của bạn:

### Gửi tin nhắn bằng cURL (Terminal):
```bash
curl -X POST https://zalo-relay.khuong.theworkpc.com/uptime-webhook \
  -H "Content-Type: application/json" \
  -d '{"msg": "Nội dung tin nhắn muốn gửi ở đây!"}'
```

### Gửi tin nhắn bằng JavaScript:
```javascript
fetch('https://zalo-relay.khuong.theworkpc.com/uptime-webhook', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ msg: 'Nội dung tin nhắn của bạn!' })
});
```

### Cơ chế hoạt động của Zalo Relay:
*   Khi nhận request `POST` vào `/uptime-webhook` với body dạng `{"msg": "..."}`, file script `relay.py` trên VPS sẽ:
    1.  Tự động sử dụng token trong `.env` và xử lý các vấn đề refresh token OAuth của Zalo.
    2.  Đọc ID người dùng đã được lưu sẵn tại file `~/zalo-relay/chat_id.txt` (được lưu tự động khi bạn nhắn tin cho bot lần đầu).
    3.  Thực hiện gửi tin nhắn trực tiếp về máy của bạn thông qua Zalo OA API.

