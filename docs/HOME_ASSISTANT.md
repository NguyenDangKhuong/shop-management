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

2. **Mất kết nối:**
   - Mạng Ethernet (LAN) trên con Armbian Box ổn định hơn Wi-Fi. Đảm bảo cắm cáp Ethernet vào thẳng Router phát để tránh việc con Local HA rớt mạng. Tắt GUI (Multi-user target) của màn hình TV nếu không cần thiết để tránh giật lag CPU do driver đồ hoạ Mali yếu kém trên Linux.

---
*Cập nhật: 02/04/2026*
