# 📱 Hướng dẫn cấu hình & di chuyển tên miền Douyin / TikTok Downloader API

Tài liệu này ghi lại các thông tin nghiên cứu, cấu hình hiện tại và quy trình chi tiết để bạn tự thay đổi tên miền hoặc cấu hình lại API này sau này.

---

## 📋 1. Tổng quan hệ thống hiện tại

API tải video không watermark được triển khai bằng Docker trên VPS Oracle Cloud Singapore:
* **Địa chỉ nội bộ:** `http://100.118.218.99:8000` (Qua Tailscale)
* **Đường dẫn code trên VPS:** `/home/ubuntu/douyin-tiktok-api/`
* **File cấu hình API:** `/home/ubuntu/douyin-tiktok-api/config.yaml`
* **File chứa Cookie TikTok:** `/home/ubuntu/douyin-tiktok-api/crawlers/tiktok/web/config.yaml`
* **Tên miền công khai hiện tại:** `https://khuong.theworkpc.com/douyin-api` (Định tuyến qua Nginx Proxy ngược)

---

## 🧠 2. Nhật ký nghiên cứu & Điểm cần lưu ý (API Insights)

Trong quá trình cài đặt và chạy thử nghiệm, chúng tôi rút ra các kết luận kỹ thuật sau:

### A. Tải video Douyin (Watermark-free)
* **Trạng thái:** Hoạt động rất tốt.
* **Cơ chế:** API tự động tạo chữ ký số `A-Bogus` / `X-Bogus` để truy xuất trực tiếp API chính thức của Douyin.
* **Cookie:** Việc phân tích link video đơn lẻ để tải **không yêu cầu cookie đăng nhập**, giúp hệ thống chạy ổn định lâu dài mà không sợ bị hết hạn cookie.

### B. Tìm kiếm Douyin bằng từ khóa (Search Keyword)
* **Trạng thái:** Bị chặn (HTTP 504 Gateway Timeout).
* **Nguyên nhân:** Tính năng tìm kiếm từ khóa yêu cầu **Cookie đăng nhập Douyin còn hoạt động (Fresh Cookie)**. Hiện tại cookie mặc định của dự án đã hết hạn (từ đầu năm 2025). Khi gọi API tìm kiếm, Douyin sẽ trả về yêu cầu xác thực dạng Captcha trượt (Slide-captcha) dẫn tới timeout.

### C. Tải video TikTok
* **Trạng thái:** Thất bại (Trả về 200 OK nhưng dữ liệu rỗng).
* **Nguyên nhân:** TikTok áp dụng tường lửa nghiêm ngặt chặn toàn bộ dải IP của các nhà cung cấp đám mây (như Oracle Cloud Singapore).
* **Giải pháp khắc phục:** Cần cấu hình xoay vòng cookie (Cookie Rotation) hoặc cài đặt thêm proxy dân cư (Residential Proxy) vào file cấu hình của TikTok crawler trên VPS (`crawlers/tiktok/web/config.yaml`).

---

## 🛠️ 3. Quy trình di chuyển sang tên miền mới (Domain Migration Guide)

Khi bạn muốn chuyển hướng API sang một tên miền khác trên VPS (ví dụ: `domain-moi.com`), hãy thực hiện các bước sau:

### 🔹 Bước 1: Cấu hình Nginx trên VPS
1. Tạo hoặc chỉnh sửa file cấu hình server block của tên miền mới trên VPS:
   ```bash
   sudo nano /etc/nginx/sites-available/domain-moi.com
   ```
2. Thêm khối `location` proxy ngược chỉ hướng tới port `8000` của Docker API:
   ```nginx
   server {
       server_name domain-moi.com;

       location /douyin-api/ {
           proxy_pass http://localhost:8000/;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }

       # ... các cấu hình SSL/Listen khác
   }
   ```
3. Nhấn `Ctrl + O` -> `Enter` để lưu, và `Ctrl + X` để thoát.
4. Kiểm tra cú pháp và tải lại Nginx:
   ```bash
   sudo nginx -t && sudo systemctl reload nginx
   ```

### 🔹 Bước 2: Cập nhật biến môi trường trên Next.js (Shop Management)
1. Mở file cấu hình môi trường `.env.local` ở máy local của bạn:
   ```env
   # Đổi tên miền cũ thành tên miền mới
   NEXT_PUBLIC_DOUYIN_API_URL=https://domain-moi.com/douyin-api
   ```
2. Nếu bạn đang chạy production trên Vercel, hãy vào mục **Settings -> Environment Variables** trên Vercel Dashboard của dự án:
   * Tìm biến `NEXT_PUBLIC_DOUYIN_API_URL`
   * Đổi giá trị của nó thành `https://domain-moi.com/douyin-api`
   * Lưu lại và kích hoạt Deploy lại (Redeploy) để Vercel nạp cấu hình mới.

---
*Tài liệu cập nhật ngày: 27/06/2026 bởi Antigravity Assistant.*
