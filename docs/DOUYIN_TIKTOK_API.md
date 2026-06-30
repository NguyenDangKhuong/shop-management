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

## 🚀 4. Các giải pháp và cơ chế tự động đã triển khai

Để đảm bảo hệ thống hoạt động ổn định trọn đời và không bị lỗi vặt, các giải pháp dưới đây đã được cấu hình hoàn chỉnh:

### A. Cơ chế tự động cập nhật Cookie Douyin (Weekly Auto-Refresh)
* **Vấn đề cũ:** Cookie `ttwid` của Douyin hết hạn làm API trả về dữ liệu trống, kích hoạt cơ chế retry của VPS làm thời gian phản hồi vượt quá 10s dẫn đến lỗi 504 trên Vercel.
* **Giải pháp:**
  1. Đã tạo một script Bash tại `/home/ubuntu/refresh_douyin_cookie.sh` trên VPS để tự động gọi API nội bộ `/generate_ttwid`, lấy token mới và gọi POST cập nhật cookie cho crawler.
  2. Đã thêm cronjob vào crontab của VPS chạy tự động vào **00:00 Chủ Nhật hàng tuần**:
     ```bash
     0 0 * * 0 /home/ubuntu/refresh_douyin_cookie.sh
     ```
  * *Kết quả:* Cookie Douyin luôn được tự động làm mới hàng tuần mà không cần thao tác thủ công.

### B. Route Handler Proxy & Phòng chống crash Frontend
* **Vấn đề cũ:** API trên VPS không cấu hình CORS khiến trình duyệt chặn request trực tiếp từ domain `shop.thetaphoa.store`. Đồng thời, các lỗi 504 (trả về trang HTML) làm hàm parse JSON ở client bị lỗi cú pháp (`Unexpected token A...`) gây đơ giao diện.
* **Giải pháp:**
  1. Tạo Route Handler tại `src/app/api/douyin/route.ts` làm proxy trung gian để Next.js gọi trực tiếp sang VPS từ server-side, hoàn toàn bypass được CORS.
  2. Cập nhật `DouyinClient.tsx` để kiểm tra `Content-Type` của response. Nếu phát hiện trang lỗi HTML (504/503) thay vì JSON, hệ thống sẽ đọc dạng text và hiển thị thông báo lỗi thân thiện cho người dùng thay vì crash JavaScript.

### C. Nginx Subpath Routing
* **Vấn đề cũ:** Cloudflare Tunnel chạy ở chế độ Cloudflare-managed (Zero Trust Dashboard) nên mọi cấu hình sửa file local `config.yml` trên VPS đều bị bỏ qua, không thể tạo subdomain `douyin-api.thetaphoa.store` trực tiếp từ VPS.
* **Giải pháp:** Định tuyến thông qua một subpath trong tên miền chính đang trỏ thẳng vào Nginx của VPS: `https://khuong.theworkpc.com/douyin-api`. Nginx sẽ nhận diện path `/douyin-api/` và chuyển tiếp đến container port `8000` của API.

### D. Hỗ trợ tải Video trực tiếp trên di động (Mobile Download Force Proxy)
* **Vấn đề cũ:** Nút "Tải Video" liên kết trực tiếp tới URL CDN của Douyin (`zjcdn.com`). Do khác tên miền (Cross-Origin), trình duyệt di động (như Safari trên iOS) bỏ qua thuộc tính `download` của thẻ `<a>` và mở trình phát stream trực tiếp thay vì lưu file.
* **Giải pháp:**
  1. Tạo Route Handler proxy tải xuống tại `src/app/api/douyin/download/route.ts`. API này nhận link CDN của video, fetch stream dữ liệu từ CDN, và trả về cho trình duyệt kèm header `Content-Disposition: attachment; filename="douyin-video.mp4"`.
  2. Cập nhật nút tải xuống trong `DouyinClient.tsx` trỏ tới `/api/douyin/download?url=...` đã được mã hóa bằng `encodeURIComponent`.
  * *Kết quả:* Trình duyệt di động (iOS Safari & Android Chrome) sẽ nhận diện đúng header và mở hộp thoại xác nhận tải xuống gốc của hệ điều hành để lưu trực tiếp vào máy.

---
*Tài liệu cập nhật ngày: 30/06/2026 bởi Antigravity Assistant.*

