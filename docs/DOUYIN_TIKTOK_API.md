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

### D. Tải Video trên di động — Chuyển từ Vercel Proxy sang VPS Proxy
* **Vấn đề ban đầu:** Nút "Tải Video" liên kết trực tiếp tới URL CDN của Douyin (`zjcdn.com`). Do khác tên miền (Cross-Origin), trình duyệt di động bỏ qua thuộc tính `download` của thẻ `<a>` và mở trình phát stream thay vì lưu file.
* **Giải pháp v1 (Vercel Proxy):** Tạo Route Handler tại `src/app/api/douyin/download/route.ts` trên Vercel để proxy video stream kèm header `Content-Disposition: attachment`. **Vấn đề:** Mỗi lần tải video ~10-30MB đều đi qua Vercel → tốn Fast Origin Transfer bandwidth (304 MB/ngày khi test nhiều).
* **Giải pháp v2 (VPS Proxy — hiện tại):**
  1. Tạo Python download proxy tại `/home/ubuntu/download_proxy.py` trên VPS, chạy trên port `8001`. Script dùng Python stdlib (`http.server` + `urllib`), nhận URL video qua query param, fetch từ CDN và trả về kèm header `Content-Disposition: attachment`.
  2. Tạo systemd service `download-proxy.service` để auto-start khi VPS khởi động.
  3. Cập nhật Nginx: thêm `location /douyin-api/download` proxy tới `127.0.0.1:8001`.
  4. Frontend: nút "📥 Tải Video" trỏ tới `https://khuong.theworkpc.com/douyin-api/download?url=...`.
  * *Kết quả:* Tải video không tốn Vercel bandwidth. Toàn bộ video stream đi qua VPS Oracle Cloud (miễn phí).

### E. Nút "Dán Link" (Paste Button)
* **Vấn đề:** Trên điện thoại, việc dán link Douyin vào ô input rất bất tiện (cần nhấn giữ → Paste).
* **Giải pháp:** Thêm nút **"📋 Dán Link"** phía dưới ô nhập URL trong `DouyinClient.tsx`. Sử dụng `navigator.clipboard.readText()` để đọc clipboard và tự điền vào input chỉ với 1 tap. Hiển thị xác nhận "✓ Đã Dán" trong 1.5 giây.

### F. Lưu Video vào Camera Roll (Web Share API)
* **Vấn đề:** Khi tải video trên iPhone, file luôn lưu vào app **Files** thay vì **Photos** (Camera Roll). Không có Web API nào cho phép ghi trực tiếp vào Camera Roll từ trình duyệt.
* **Giải pháp:** Thêm nút **"📱 Lưu vào Photos (Camera Roll)"** sử dụng Web Share API:
  1. Fetch video dưới dạng blob từ VPS proxy (không qua Vercel).
  2. Tạo `File` object từ blob với MIME type `video/mp4`.
  3. Gọi `navigator.share({ files: [file] })` để mở Share Sheet gốc của iOS.
  4. User chọn **"Save Video"** trong Share Sheet → video lưu thẳng vào Photos/Camera Roll.
  * *Lưu ý:* Yêu cầu trình duyệt hỗ trợ Web Share API Level 2 (iOS Safari 15+, Chrome iOS 89+).

### G. Kiến trúc VPS Download Proxy

```
┌──────────────┐     ┌───────────────────────┐     ┌────────────────┐
│   Browser    │────▶│  Nginx (VPS:443)      │────▶│ Python Proxy   │
│   (iPhone)   │     │  /douyin-api/download  │     │ (127.0.0.1:    │
│              │◀────│                       │◀────│  8001)         │
└──────────────┘     └───────────────────────┘     └───────┬────────┘
                                                           │ fetch
                                                   ┌───────▼────────┐
                                                   │  Douyin CDN    │
                                                   │  (zjcdn.com)   │
                                                   └────────────────┘
```

**Files trên VPS:**
| File | Mô tả |
|------|--------|
| `/home/ubuntu/download_proxy.py` | Python download proxy script (port 8001) |
| `/etc/systemd/system/download-proxy.service` | Systemd service auto-start |
| `/etc/nginx/sites-available/khuong.theworkpc.com` | Nginx config với `/douyin-api/download` location |

**Quản lý service:**
```bash
sudo systemctl status download-proxy   # Kiểm tra trạng thái
sudo systemctl restart download-proxy  # Khởi động lại
sudo journalctl -u download-proxy -f   # Xem log realtime
```

### H. Loại bỏ Video Player Preview (Tiết kiệm Bandwidth)
* **Vấn đề:** Khi hiển thị kết quả trích xuất, trang có embed `<video src={cdnUrl}>` để xem trước video. Mỗi lần load trang, trình duyệt tự động tải một phần video từ CDN. Dù không tính vào Vercel bandwidth (vì CDN là bên thứ ba), nhưng gây hiểu nhầm khi theo dõi usage và tốn data di động của user.
* **Giải pháp:** Xóa hoàn toàn cột Video Player (`<video>` element) khỏi `DouyinClient.tsx`. Trang giờ chỉ hiển thị metadata (tác giả, mô tả, stats) và các nút tải xuống. Layout chuyển từ grid 2 cột sang single column.

### I. SEO Optimization
* **Mục tiêu:** Đưa trang `/douyin` lên top kết quả tìm kiếm cho các từ khóa tiếng Việt và tiếng Anh liên quan đến tải video Douyin.
* **Đã triển khai:**
  1. **Metadata** (`page.tsx`): Title tag, meta description, 19 keywords (VN + EN), Open Graph, Twitter Card, canonical URL, robots directives.
  2. **JSON-LD Structured Data**: Schema.org `WebApplication` — giúp Google hiển thị rich results (tên app, giá miễn phí, danh sách tính năng).
  3. **H1 Tag**: Chuyển từ "Douyin Downloader" sang "Tải Video Douyin Không Watermark" (target keyword chính).
  4. **FAQ Section**: 5 câu hỏi thường gặp dùng `<details>/<summary>` — Google có thể hiển thị FAQ rich snippets trong kết quả tìm kiếm.
  5. **Semantic HTML**: Sử dụng `<section>`, `<h2>`, `<details>` đúng chuẩn cho crawler.

---
*Tài liệu cập nhật ngày: 30/06/2026 bởi Antigravity Assistant.*
