# 🏡 Home Assistant Architecture (Master-Slave)

Cấu trúc Smart Home được thiết kế theo mô hình **Master-Slave** (hoặc Hub & Spoke) sử dụng 2 instance Home Assistant để vừa có thể dùng VPS mạnh mẽ làm trung tâm, vừa khắc phục được việc VPS không thể quét các thiết bị local qua mDNS/UPnP trong mạng LAN nhà.

## 1. Overview Topology

| Vai trò | Instance | Vị trí | IP / URL truy cập | Chức năng chính |
|---------|----------|---------|-------------------|-----------------|
| **Master** | `homeassistant` (VPS) | Oracle Cloud VPS | `home.khuong.theworkpc.com:8123` | Xử lý Automation nặng, Giao diện Dashboard chính, kết nối ra ngoài Internet, chạy SmartIR. |
| **Slave (Proxy)** | `homeassistant` (Local) | Magicsee N5 Max (S905X3 TV Box) | `100.91.8.9:8123` (Tailscale) | Chỉ chạy ở `network_mode: host` để bắt các thiết bị IoT nội bộ mạng LAN (Broadlink, Tuya, Camera). *Đã migrate từ PC cũ sang Armbian*. |

**Cơ chế đồng bộ (Sync Mechanism):**
Sử dụng Custom Component **Remote Home Assistant** (cài qua HACS) để đẩy 100% entity từ *Slave* lên *Master* thông qua đường hầm Tailscale bảo mật mà không cần mở port ra ngoài.

## 2. Configuration Paths

Cấu hình cho cả 2 máy đều được thiết lập bằng Docker Volume Map:

* **Trên VPS (Master):** `/home/ubuntu/homeassistant/config/configuration.yaml`
  *(Có thể sửa file này cực kỳ tiện lợi thông qua trình duyệt bằng **VS Code Server** tại `home.khuong.theworkpc.com:3006`)*

* **Trên Home Server (Slave):** `/opt/homeassistant` (trên Armbian của TV Box)
  *(File này cấu hình dạng container `network_mode: host` để bắt thiết bị local)*

## 3. Cách thêm thiết bị mới (Ví dụ Broadlink)

> **Quy tắc VÀNG**: Các thiết bị phần cứng nằm ở trong nhà thì **BẮT BUỘC** phải thêm vào con **Slave (Local)**. Nó sẽ tự động xuất hiện trên con Master!

### 3.1 Thêm Hub Broadlink vào Local HA
1. Tìm địa chỉ IP của cục Broadlink trong mạng LAN nhà (ví dụ `192.168.1.34`).
2. Nếu quét App hoặc Ping không thấy do Client Isolation, hãy **đăng nhập vào Router cấu hình WiFi** và tìm IP trong *DHCP Client List* bằng địa chỉ MAC của Hub Broadlink (thường bắt đầu bằng OUI Hàng Châu: `24:59:E5:` hoặc `EC:0B:AE:`).
3. Đăng nhập trang admin của Local HA qua Tailscale (ví dụ `http://100.91.8.9:8123`).
4. `Settings` -> `Devices & Services` -> Thêm Integration **Broadlink**.
5. Nhập IP vừa tìm được để connect.

### 3.2 Tích hợp Remote bằng SmartIR
Do Boardlink chỉ cung cấp "nút bấm raw", không tạo ra cái tủ lạnh hay điều hòa cụ thể trong HA, ta cần dùng **SmartIR**:

1. Cài đặt tích hợp **SmartIR** qua HACS trên con **VPS (Master)**.
2. Tra mã Remote của điều hoà/TV nhà bạn trên kho của SmartIR Github.
3. Chỉnh sửa file `/home/ubuntu/homeassistant/config/configuration.yaml` trên VPS thông qua Code Server để thêm Platform `smartir`.
4. Trong phần cấu hình của SmartIR, trỏ cái cục `controller` về cái entity `remote.broadlink...` (Entity này vốn dĩ ở dưới nhà nhưng đã được đồng bộ lên VPS rồi).

## 4. TroubleShooting

1. **Lỗi "Failed to connect to server" khi cấu hình Remote HA:**
   - Khi add IP Tailscale vào Integration, phải bỏ tick ô **Secure** (HTTPS) và **Verify SSL** vì ta gọi qua IP thuần không qua TLS.
   - Nhớ copy đủ cái Long-Lived Access Token.

2. **Mất kết nối đồng bộ thiết bị Local (Midea AC, Broadlink) giữa Master-Slave:**
   - **Triệu chứng:** Các thiết bị local (như AC, Remote) hiển thị trạng thái "Unavailable" trên Master (VPS) mặc dù Local HA trên Armbian vẫn chạy bình thường.
   - **Nguyên nhân:** Do sự cố mất điện/mất mạng đột ngột hoặc lệnh khởi động bị lệch nhịp, khiến socket Tailscale hoặc API kết nối giữa Master và Slave bị kẹt.
   - **Cách khắc phục:** Khởi động lại container Home Assistant trên cả 2 node để tạo kết nối mới. Làm theo đúng thứ tự:
     1. Khởi động lại Local HA (Slave) trước:
        ```bash
        ssh root@100.91.8.9 "docker restart homeassistant"
        ```
     2. Đợi Local HA khởi động xong (khoảng 30 giây), sau đó khởi động lại Master HA (VPS):
        ```bash
        ssh ubuntu@100.118.218.99 "docker restart homeassistant"
        ```

3. **Lỗi thiết bị Sonoff (eWeLink) bị báo "Unavailable" hàng loạt:**
   - **Triệu chứng:** Toàn bộ công tắc Sonoff báo down, log HA Master báo lỗi `access token expired` hoặc `You logged in from another place`.
   - **Nguyên nhân:** eWeLink Cloud chỉ cho phép duy nhất 1 session token hoạt động. Khi bạn mở app eWeLink trên điện thoại, phiên của Home Assistant trên VPS sẽ bị đá ra ngoài.
   - **Cách khắc phục tạm thời:** Restart Home Assistant trên VPS để nó tự động login lại.
   - **Cách khắc phục triệt để:** 
     1. Tạo một tài khoản eWeLink phụ (sub-account) bằng email mới.
     2. Trong app eWeLink điện thoại (tài khoản chính), chia sẻ (Share) toàn bộ thiết bị sang tài khoản phụ này.
     3. Đăng nhập tài khoản phụ này vào Home Assistant.

4. **Lỗi chết card LAN (Cannot attach to PHY) trên TV Box Magicsee N5 Max:**
   - **Triệu chứng:** Box tự động chuyển sang dùng Wi-Fi (`wlan0`) với IP `192.168.1.108` thay vì card LAN mạng dây.
   - **Cách khắc phục:** Rút nguồn điện vật lý của box ra (Cold Boot), đợi 10s rồi cắm lại để ngắt điện hoàn toàn chip PHY. Lệnh `sudo reboot` sẽ không sửa được lỗi này.

---
*Cập nhật: 19/07/2026*

## 5. UI Customization & Cyberpunk Theme

Dashboard của HA Master được tinh chỉnh giao diện theo phong cách tối tân, giả lập giao diện tối giản công nghệ (Hologram / Sci-Fi) đồng bộ với ngôn ngữ thiết kế của Website cá nhân.

### 5.1 Giao diện Lưới ô vuông (Grid of Tile Cards)
Thay vì sử dụng danh sách dọc truyền thống của thẻ `entities`, hầu hết công tắc đèn và thiết bị trong nhà được chuyển đổi sang thẻ `tile` đặt trong khối `grid` (2 cột):
* **Trực quan:** Biểu tượng thiết bị bo tròn, hiển thị trạng thái động và màu phát sáng rõ nét khi được kích hoạt.
* **Gọn gàng:** Giảm chiều dài cuộn trang trên giao diện điện thoại.
* **Bảo toàn:** Các điều khiển nút bấm quạt hồng ngoại (`custom:paper-buttons-row`) và remote TV (`custom:firemote-card`) phức tạp được giữ nguyên cấu trúc YAML để tránh mất cấu hình lệnh.

### 5.2 Theme Cyberpunk Dark
Theme được viết và lưu tại thư mục cấu hình trên VPS: `/home/ubuntu/homeassistant/config/themes/cyberpunk_dark.yaml`.

* **Nền lưới Blueprint Tĩnh (Fixed):** Kết hợp radial gradient tối, lưới ô vuông xanh nhạt và hình radar quét vector. Toàn bộ các lớp nền này được neo tĩnh (`fixed`) vào viewport của trình duyệt. Khi cuộn trang, các card điều khiển sẽ trượt mịn màng đè lên nền radar tĩnh mà không làm trôi lệch hay méo ảnh nền ở mọi độ phân giải.
* **Nổi bật (High Contrast):** Nền thẻ có độ đục 88% (`rgba(15, 23, 42, 0.88)`) để tách biệt rõ khỏi lưới nền.
* **Viền phát sáng (Neon Glow):** Viền bo cong `16px`, phát quang màu Cyan mờ ảo xung quanh card (`box-shadow: 0 0 20px rgba(6, 182, 212, 0.25)`).
* **Bản đồ & Popups xem nhanh:** Áp dụng `map-filter` để tự động đổi màu bản đồ Leaflet sang tông tối huyền ảo. Đồng bộ hóa màu sắc tất cả các bảng xem thiết bị (More-Info popups), danh sách dropdown, ô input và log hệ thống sang màu tối đồng nhất.

### 5.3 Custom Card Wrapper (`custom:spaceship-card`)
Để tái sử dụng hiệu ứng phi thuyền HUD trên mọi tab và dashboard một cách linh hoạt, một custom card wrapper đã được cài đặt tại `/home/ubuntu/homeassistant/config/www/spaceship-card.js` và đăng ký trong Lovelace Resources.

* **Cách hoạt động:** Thẻ bọc ngoài cho phép gom bất kỳ card Lovelace nào có sẵn (Tile, Entities, v.v.) và tự động ghi đè thuộc tính CSS để làm nền card trong suốt, chuyển dời khung viền kiểm soát ra lớp bọc ngoài.
* **Hiệu ứng Khóa mục tiêu (Zoom Lock-on):** Ở chế độ chờ, hiển thị mờ một khung target F-22 mờ ảo (`scale 1.45`) lệch nhẹ ngoài góc dưới. Khi hover chuột hoặc chạm tap, khung ngắm này lập tức co hẹp khít lại (`scale 1`) và phát sáng cyan rực rỡ tượng trưng cho hành động khóa mục tiêu bắn hạ.
* **Máy bay tuần tra viền (Border Orbit):** Khi được active, một chiếc máy bay F-22 lớn (`20px`) sẽ tự động xuất hiện bay tuần tra vòng quanh viền chữ nhật của card và nghiêng mình bẻ lái ở mỗi khúc cua góc.

**Cấu hình sử dụng mẫu:**
```yaml
type: custom:spaceship-card
card:
  type: tile
  entity: switch.sonoff_device
  name: Thiết bị Spaceship
```


