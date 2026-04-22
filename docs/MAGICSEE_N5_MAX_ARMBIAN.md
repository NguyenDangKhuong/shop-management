# 📺 Cài đặt Armbian & Home Assistant trên Magicsee N5 Max (S905X3)

Tài liệu này ghi lại quá trình di chuyển (migrate) Home Assistant Slave Local từ chiếc PC Pentium cũ (tiêu tốn nhiều điện năng, nóng cứng) sang TV Box **Magicsee N5 Max** sử dụng chip **Amlogic S905X3**. Điều này giúp tiết kiệm điện năng năng (chỉ khoảng 5w-8w), chạy 24/7 mát mẻ.

## 1. Chuẩn bị ảnh đĩa (Image)
> ⚠️ **Quan trọng**: Magicsee N5 Max chạy chip **S905X3**, khác với dòng N5 chạy S905X. Cần phải tải đúng file dành cho S905X3! 

* Truy cập repository: [ophub/amlogic-s9xxx-armbian releases](https://github.com/ophub/amlogic-s9xxx-armbian/releases)
* Tải tệp tin ảnh đĩa: `Armbian_XX.XX.X_amlogic_s905x3_noble_6.12.XX_server_XXXX.XX.XX.img.gz`
* Sử dụng **BalenaEtcher** trên máy tính (Mac/Windowns) flash trực tiếp tệp tin ảnh đĩa đã tải vào một thẻ nhớ MicroSD.

*Boot Configuration:*
* Sử dụng DTB chuẩn là `meson-sm1-x96-max-plus-100m.dtb`.
* Với ảnh đĩa mới nhất của ophub, file cấu hình `uEnv.txt` và `extlinux.conf` thường đã được thiết lập sẵn, không cần chỉnh sửa nếu box dùng chuẩn `x96-max-plus`.

## 2. Quá trình Boot và Cài đặt vào Bộ nhớ trong (eMMC)
1. **Boot từ thẻ SD**:
   * Cắm thẻ SD vào TV Box, cấp nguồn vào thẳng hệ điều hành Android gốc.
   * Kết nối bằng `adb` để bắt buộc box phải khởi động lại vào thẻ nhớ:
     ```bash
     adb connect <IP_CỦA_BOX>:5555
     adb shell reboot update
     ```
   * Box sẽ reboot lại và tải Armbian từ thẻ SD.

2. **Cài đặt vào eMMC**:
   * Truy cập SSH bằng user `root` (Mặc định password khởi tạo thường là `1234`).
   * Chạy công cụ cài đặt của Armbian:
     ```bash
     sudo /usr/sbin/armbian-install
     ```
   * Khi được hỏi chọn ID của thiết bị để nạp file DTB (Device Tree Blob) gốc, nhập ID: **`501`** (Tương ứng với `s905x3 X96-Max+_100Mb meson-sm1-x96-max-plus-100m.dtb`).
   * Chọn phân vùng `ext4` làm gốc.
   * Khi hệ thống báo thành công, nhập lệnh `poweroff`, rút thẻ nguồn và dây cắm. Sau đó rút thẻ nhớ SD ra và cắm lại nguồn để khởi động vào bộ nhớ eMMC nội bộ.

## 3. Quản lý hệ thống - Tailscale & Tối Ưu Hệ Điều Hành
Bởi vì driver màn hình đồ hoạ trên Linux cho các vi xử lí ARM chuẩn Mali thường rất yếu và việc xử lý Giao diện đồ hoạ Desktop (GUI) chạy hoàn toàn bằng CPU, điều này khiến cho trình điều khiển RustDesk và môi trường Desktop XFCE trở nên rất giật lag. Phương pháp hiệu quả nhất là chạy hệ điều hành ở trạng thái Console Mode (Headerless) và Remote qua SSH/Tailscale.

### 3.1 Cài đặt Tailscale (VPN)
1. Chạy lệnh cài đặt của Tailscale:
   ```bash
   curl -fsSL https://tailscale.com/install.sh | sudo sh
   sudo tailscale up
   ```
2. Mở trình duyệt với đường link để uỷ quyền liên kết với Tailscale Network của bạn.
3. Kích hoạt tính năng SSH nội bộ thông qua Tailscale để bạn có thể remote bằng Mac dễ dàng từ xa mà không cần cài đặt hoặc quản lý các Key SSH (`~/.ssh`):
   ```bash
   sudo tailscale set --ssh
   ```

### 3.2 Tối ưu dịch vụ không cần thiết
Tắt GUI và các dịch vụ mạng không cần dùng. Kết nối khuyến nghị là kết nối dây LAN (Ethernet) thay vì qua cổng Wi-Fi `wpa_supplicant`.
```bash
sudo systemctl disable --now wpa_supplicant rpcbind lightdm
sudo systemctl set-default multi-user.target
```

## 4. Triển khai Docker và Cài đặt Home Assistant
1. **Cài đặt Docker Engine**:
   ```bash
   curl -fsSL https://get.docker.com | sudo sh
   sudo usermod -aG docker khuong
   ```

2. **Run Container Home Assistant**:
   Sử dụng mạng ở dạng `host` để Home Assistant có thể khám phá và phát hiện các thiết bị local (như thiết bị cảm biến không dây, thiết bị Tuya LAN, điều hướng Broadlink) nằm cục bộ trong mạng gia đình do Router WiFi cấp.
   ```bash
   docker run -d \
     --name homeassistant \
     --privileged \
     --restart=unless-stopped \
     -e TZ=Asia/Ho_Chi_Minh \
     -v /opt/homeassistant:/config \
     -v /run/dbus:/run/dbus:ro \
     --network=host \
     ghcr.io/home-assistant/home-assistant:stable
   ```

3. **Kiểm tra trạng thái**:
   Home Assistant Local Hub thường sẽ lắng nghe ở port `8123`. Bạn có thể truy cập Web GUI quản trị thông qua địa chỉ IP LAN hoặc IP Tailscale:
   `http://<IP_TAILSCALE>:8123`

## 5. Giám sát hệ thống với Glances

Glances là một công cụ giám sát hệ thống qua API, cung cấp dữ liệu CPU/RAM/Disk/Temperature/Network realtime. Container Glances chạy trên port `61208`.

```bash
docker run -d \
  --name glances \
  --restart=unless-stopped \
  -p 61208:61208 \
  -e GLANCES_OPT='-w' \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  --pid host \
  nicolargo/glances:latest-full
```

**API Endpoints hữu ích:**
| Endpoint | Mô tả |
|----------|--------|
| `http://<IP>:61208` | Giao diện web Glances |
| `http://<IP>:61208/api/4/sensors` | Dữ liệu cảm biến nhiệt độ |
| `http://<IP>:61208/api/4/cpu` | Thông tin CPU |
| `http://<IP>:61208/api/4/mem` | Thông tin RAM |

**Sensors có sẵn trên Magicsee N5 Max:**
- `cpu_thermal 0` — Nhiệt độ CPU (~60°C bình thường)
- `ddr_thermal 0` — Nhiệt độ RAM (~61°C bình thường)

## 6. Tích hợp Homepage Dashboard (VPS)

Trên VPS Oracle, trang `home.khuong.theworkpc.com` chạy container **Homepage** (gethomepage.dev). Các widget Glances từ Armbian Box được thêm vào file `services.yaml` trên VPS để hiển thị trạng thái box realtime thông qua mạng nội bộ Tailscale.

**File config:** `/home/ubuntu/homepage/config/services.yaml`

**Các widget đã cấu hình:**

| Widget | Metric Glances | Hiển thị |
|--------|---------------|----------|
| System Info | `info` | Hostname, OS, Uptime |
| CPU | `cpu` | % CPU realtime |
| Memory | `memory` | RAM used/total |
| Disk | `disk:mmcblk2p2` | eMMC 29GB used/free |
| Network | `network:eth0` | Upload/Download speed |
| CPU Temp | `sensor:cpu_thermal 0` | Nhiệt độ CPU |
| DDR Temp | `sensor:ddr_thermal 0` | Nhiệt độ RAM |
| Processes | `process` | Top processes |

> ⚠️ **Lưu ý:** Tất cả widget sử dụng URL `http://100.91.8.9:61208` (IP Tailscale của Armbian box). VPS cần kết nối Tailscale để truy cập được.

## 7. Ghi chú quan trọng

### GUI Desktop không khả thi
Chip S905X3 có GPU Mali-G31 nhưng driver Linux (Mesa/Lima) **chưa hỗ trợ tốt**:
- Desktop XFCE + RustDesk → CPU 100%, giật lag nghiêm trọng
- Chromium browser → Video không có hardware decoding, CPU quá tải
- Netflix → Không có Widevine L1, chỉ hiển thị 480p mờ

**Khuyến nghị:** Chạy headless (multi-user.target), quản lý qua SSH/Tailscale. Nếu cần xem YouTube/Netflix trên TV, dùng Chromecast hoặc giữ lại Android TV gốc trên một cái box riêng.

### Tài nguyên hệ thống khi chạy headless
| Metric | Giá trị |
|--------|---------|
| CPU idle | ~98% |
| RAM used | ~800MB / 3.6GB |
| Disk used | ~7GB / 29GB |
| Nhiệt độ | ~60°C CPU, ~61°C DDR |

## 8. Chặn quảng cáo với AdGuard Home

AdGuard Home chạy trên N5 Max làm DNS server cho toàn bộ mạng nhà, chặn quảng cáo + tracking ở tầng DNS.

### 8.1 Cài đặt
```bash
# Tắt systemd-resolved (chiếm port 53)
sudo systemctl disable --now systemd-resolved
sudo rm -f /etc/resolv.conf
echo 'nameserver 1.1.1.1' | sudo tee /etc/resolv.conf

# Chạy AdGuard Home container
docker run -d \
  --name adguardhome \
  --restart=unless-stopped \
  -p 53:53/tcp -p 53:53/udp \
  -p 3000:3000/tcp \
  -p 8082:80/tcp \
  -v /opt/adguardhome/work:/opt/adguardhome/work \
  -v /opt/adguardhome/conf:/opt/adguardhome/conf \
  adguard/adguardhome
```

### 8.2 Setup Wizard
Truy cập `http://192.168.1.108:3000` để chạy wizard lần đầu. Sau khi setup xong, dashboard chạy trên `http://192.168.1.108:8082`.

### 8.3 Upstream DNS
Cấu hình tại `/opt/adguardhome/conf/AdGuardHome.yaml`:
- **Upstream:** Cloudflare DoH, Google DoH, Quad9 DoH, `1.1.1.1`, `8.8.8.8`
- **Fallback:** `1.0.0.1`, `8.8.4.4`
- **Bootstrap:** `1.1.1.1`, `8.8.8.8`, `9.9.9.10`

### 8.4 Blocklists khuyến nghị
| Blocklist | URL |
|-----------|-----|
| AdGuard DNS Filter | Mặc định, đã có sẵn |
| OISD (Big) | `https://big.oisd.nl` |
| HaGeZi Multi PRO | `https://raw.githubusercontent.com/hagezi/dns-blocklists/main/adblock/pro.txt` |

### 8.5 Cấu hình Router & Chẩn đoán lỗi mạng
Vào Router (`192.168.1.1`) → **Network** → **LAN** → đổi:
- **Primary DNS:** `192.168.1.108` (IP tĩnh của `wlan0` bằng Wi-Fi).
- **Secondary DNS:** `1.1.1.1` (dự phòng)

> [!WARNING]
> **Lỗi chết card LAN (Cannot attach to PHY)**
> TV Box chạy 24/7 có thể gặp hiện tượng treo luồng mạng `eth0` do chip PHY quá tải. Lúc này N5 Max sẽ tự nhảy sang dùng kết nối WiFi (`wlan0`) với IP DHCP khác (VD: `.108`).
> Do Router vẫn đẩy truy vấn DNS vào `.106` cũ, mạng nhà sẽ bị đứt.
> **Khắc phục tạm thời:** Chạy lệnh gán giả mạo IP vào card WiFi để hứng mạng: `sudo ip addr add 192.168.1.106/24 dev wlan0`. Lưu ý mất hiệu lực khi khởi động lại.
> **Khắc phục triệt để:** Rút điện N5 Max để chip ngắt nguồn ("Cold Boot") hoàn toàn rồi hãy cắm lại. Không được dùng lệnh `sudo reboot` (phần cứng vẫn ngâm điện).

### 8.6 Truy cập ngược vào Router (Bypass lỗi Invalid Parameter)
Do Router mạng thường có cơ chế chặn đăng nhập từ xa nếu Header kết nối sai (lỗi `Invalid parameter`). Đồng thời để truy cập được từ mọi thiết bị (iPhone, Macbook) qua Tailscale mà không bị ràng buộc bởi Local Tunnel.

Giải pháp là chạy một **Nginx Reverse Proxy** siêu nhẹ trực tiếp trên N5 Max, lắng nghe ở cổng `8881` và tự chèn Fake Header trước khi gửi vào Router.

**Lệnh khởi tạo Container Nginx Proxy:**
```bash
# Tạo file config
mkdir -p ~/router-proxy
cat > ~/router-proxy/nginx.conf << 'EOF'
events {}
http {
    server {
        listen 8881;
        location / {
            proxy_pass http://192.168.1.1:80;
            proxy_set_header Host 192.168.1.1;
            proxy_set_header Origin 'http://192.168.1.1';
            proxy_set_header Referer 'http://192.168.1.1/';
        }
    }
}
EOF

# Chạy Docker (Tự động khởi động cùng máy)
docker run -d --name nginx-router-proxy \
  --network host \
  --restart unless-stopped \
  -v ~/router-proxy/nginx.conf:/etc/nginx/nginx.conf:ro \
  nginx:alpine
```
*Truy cập bằng URL trên Homepage:* `http://100.91.8.9:8881` (Tương thích với mọi máy cài VPN).

## 9. Sao Lưu Cấu Hình Home Assistant (Google Drive Backup)

Hệ thống được thiết lập sao lưu tự động cấu hình lõi của Home Assistant (`/opt/homeassistant`) vào Google Drive cá nhân thông qua `rclone` và `cronjob`. Lịch sao lưu chạy vào lúc **3:30 Sáng** mỗi ngày.
- Công cụ sử dụng: `rclone` (native binary).
- Cấu hình lưu tối đa **1 bản** duy nhất (tự động xóa bản cũ hơn 12 tiếng bằng cờ `--min-age 12h`).
- Đường dẫn script: `~/ha_backup.sh` (với nội dung dùng lệnh `sudo tar -czf` và `rclone`).

> [!TIP]
> **Cronjob Root:** Do thư mục `/opt/homeassistant` được quản lý bởi Home Assistant Docker dưới quyền root, Cronjob phải được đặt trong Root Crontab (`sudo crontab -e`):
> `30 3 * * * /home/khuong/ha_backup.sh`

### 9.1 Quy trình Cấp Cứu (Restore) từ file Backup
Nếu USB/Thẻ nhớ hỏng hoặc cấu hình Home Assistant bị lỗi không thể khởi động, thực hiện đúng 4 bước sau để bung file nén giải cứu:

1. **Tải file Backup:** Tải tệp sao lưu mới nhất định dạng `ha_backup_...tar.gz` từ thư mục Google Drive về Armbian (hoặc đẩy trực tiếp vào thẻ nhớ).
2. **Dừng hệ thống:** Tạm ngưng Container Home Assistant để tránh xung đột ghi đè.
   ```bash
   docker stop homeassistant
   ```
3. **Xoá tàn dư và bung file nén:** Xoá thư mục cấu hình lỗi và giải nén thẳng file `tar.gz` đè vào ổ chứa `/opt/homeassistant`.
   ```bash
   sudo rm -rf /opt/homeassistant/*
   sudo tar -xzf ten_file_backup_ban_tai_ve.tar.gz -C /opt
   ```
4. **Khởi động lại:** Bật lại bình thường, mọi cấu hình sẽ trở lại y hệt thời điểm sao lưu.
   ```bash
   docker start homeassistant
   ```

## 10. Tích hợp máy lạnh Midea AC LAN

Máy lạnh Midea hỗ trợ điều khiển trực tiếp qua WiFi LAN mà **không cần Broadlink**. Sử dụng custom integration `midea_ac_lan` (cài qua HACS).

### 10.1 Cài đặt
1. Cài HACS trên N5 Max HA (nếu chưa có)
2. HACS → Integrations → tìm **"Midea AC LAN"** → Install
3. Restart HA → Settings → Add Integration → **Midea AC LAN**
4. Đăng nhập tài khoản Midea/SmartHome app → chọn thiết bị trên LAN

### 10.2 Các thiết bị đã cấu hình
| Tên | Device ID | IP (Static DHCP) | Model |
|-----|-----------|-------------------|-------|
| AC1 (Living AC) | `151732605931401` | `192.168.1.200` | `00000Q12` |
| AC2 (Living AC) | `151732606955214` | `192.168.1.201` | `00000Q1A` |

## 11. Hệ Thống Hồng Ngoại Local (Tuya/Broadlink IR)

Hệ thống điều khiển Hồng ngoại (Tivi, Quạt, Rèm) được quy hoạch sử dụng tính năng **Local IR Bypass Cloud**, đảm bảo thời gian phản hồi Instant (0.05s) và hoạt động 100% offline không phụ thuộc máy chủ China.

### 11.1 Cơ chế học lệnh và lưu trữ
1. Truy cập **Developer Tools -> Actions** trên UI.
2. Gọi Script: `remote.learn_command`
3. Cấp thông số tên Thiết bị (VD: `tivi_phong_khach`) và Nút Lệnh (VD: `power`).
4. Thao tác lưu sẽ chèn trực tiếp chuỗi mã Base64 vào bộ nhớ sâu `.storage` của Home Assistant cục bộ (Tuyệt đối không đẩy lên Cloud).

### 11.2 Cơ chế gọi lệnh (Gom Remote)
Thay vì sử dụng các custom component phức tạp, các nút điều khiển được gọi nòng nọc lẻ bằng lệnh `remote.send_command`.
Có 2 phương pháp gom Nút để tạo Universal Remote:
- **Phương pháp Script (Kịch bản):** Tạo Script riêng cho từng Nút. Dùng khi muốn liên kết thành 1 Macro (Chuỗi hành động đa nhịp: Tắt đèn + Bật Tivi + Chờ 2s + Kéo rèm).
- **Phương pháp Thẻ HACS (UI Dashboard):** Tải các thẻ Giao diện từ HACS (như `custom:tv-card`) và dán dòng kịch bản `remote.send_command` thẳng vào Code giao diện. Giải pháp này giúp có một chiếc Remote siêu thực trên màn hình điện thoại mà không làm tràn bộ nhớ Script của Máy chủ.

> [!WARNING]
> **Giới hạn đồng bộ:** Remote và Mã Hồng ngoại học trên hệ thống nội bộ của N5 Max sẽ **không tự đồng bộ** qua máy chủ Home Assistant phụ ở Oracle VPS. Khuyến cáo sử dụng duy nhất N5 Max làm Master Hub trên thiết bị di động.

### 11.3 Cấu hình Giao diện UI (Tránh lỗi tràn viền & Configuration error)
Khi tạo các nút bấm cho Quạt/Tivi trên Home Assistant Dashboard, thẻ `horizontal-stack` mặc định sẽ bị tràn viền và không có lề (padding).
Để tạo hàng nút ngang đẹp có viền, có 2 cách:

1. **Dùng thẻ Grid (Khuyên dùng, không cần cài thêm plugin):**
```yaml
type: grid
columns: 5
square: true
cards:
  - type: button
    # ... cấu hình nút tắt/bật
```

2. **Bọc trong thẻ Entities (Cần cài Plugin `lovelace-hui-element` trên HACS):**
Mẹo cũ dùng `custom:hui-horizontal-stack-card` đã bị HA đời mới chặn gây ra lỗi **"Configuration error"**. Bắt buộc phải cài HACS plugin `lovelace-hui-element` và cấu hình như sau:
```yaml
type: entities
entities:
  - type: custom:hui-element
    card_type: horizontal-stack
    cards:
      # ...
```

### 9.3 Lưu ý
- Khi máy lạnh **tắt nguồn**, module WiFi cũng ngủ → entity sẽ hiển thị **Unavailable** (bình thường).
- Nếu router restart và không có Static DHCP, IP máy lạnh sẽ thay đổi → cần update lại trong `.storage/core.config_entries`.
- Đổi đơn vị nhiệt độ sang °C: Settings → General → Unit System → **Metric**.

### 9.4 Troubleshooting: AC bị Unavailable sau reset WiFi/Router
Khi máy lạnh bị **Unavailable** dù đã bật và IP đúng, nguyên nhân thường là **token/key hết hạn** (do AC tạo token mới sau khi kết nối lại WiFi). 

**Cách fix:** **Không sửa file config thủ công!** Thay vào đó:
1. Vào HA → **Settings** → **Devices & Services** → **Midea AC LAN**
2. Click **⋮** (3 chấm) → **Delete** → xóa tất cả AC entries
3. **Add Integration** → **Midea AC LAN** → đăng nhập lại tài khoản Midea
4. Hệ thống sẽ tự tìm AC trên LAN và **tạo token mới** → Available ngay.


## 10. Static DHCP — IP cố định cho thiết bị

Để tránh thiết bị bị đổi IP khi router restart, thêm Static DHCP Entry trên Router (`192.168.1.1` → Network → LAN):

| Thiết bị | MAC Address | IP cố định |
|----------|-------------|------------|
| N5 Max (Armbian) | `40:aa:56:5b:67:25` (MAC Wi-Fi) | `192.168.1.108` |
| AC1 (Midea) | `AC:72:DD:D5:15:A2` | `192.168.1.200` |
| AC2 (Midea) | `24:59:E5:EA:C3:C4` | `192.168.1.201` |
| Broadlink Hub | `EC:0B:AE:9E:7F:C5` | `192.168.1.202` |

*Last updated: 2026-04-20*

## 11. Yolo — Voice Assistant bằng Xiaozhi ESP32

Tích hợp [Xiaozhi (小智)](https://github.com/78/xiaozhi-esp32) với HA qua [ha-mcp-for-xiaozhi](https://github.com/c1pher-cn/ha-mcp-for-xiaozhi). Điều khiển thiết bị bằng giọng nói tiếng Việt.

> **Cài trên HA VPS** (master) — nơi có entities (đèn, AC, Broadlink). N5 Max không cần làm gì.

### Kiến trúc

```
ESP32 Xiaozhi → WiFi → Xiaozhi Cloud (ASR+LLM+TTS tiếng Việt)
    ↓ MCP (WebSocket)
ha-mcp-for-xiaozhi (HACS trên HA VPS)
    ↓
Home Assistant VPS → bật/tắt đèn, AC, quạt...
```

### 11.1 Mua board ESP32 Xiaozhi

> ⚠️ **Phải có ESP32 trước** — cần đăng ký thiết bị trên xiaozhi.me mới có MCP endpoint.

| Board | Giá | Link |
|-------|-----|------|
| Breadboard Mini | ~$7 / ~180k | [AliExpress](https://www.aliexpress.com/item/1005009448496585.html) |
| Spotpear Ball | ~$12 / ~300k | [AliExpress](https://vi.aliexpress.com/item/1005008627679270.html) |
| EchoEar | ~$15 / ~380k | [AliExpress](https://www.aliexpress.com/item/1005009834934442.html) |

Board mua về đã có firmware Xiaozhi sẵn. Cắm USB nguồn → kết nối WiFi → đăng ký xiaozhi.me → bind thiết bị → lấy **MCP Endpoint URL**.

### 11.2 Cài HACS trên HA VPS (nếu chưa có)

```bash
docker exec -it homeassistant bash -c "wget -O - https://get.hacs.xyz | bash -"
docker restart homeassistant
```

Sau restart: **Settings** → **Devices & Services** → **Add Integration** → tìm **HACS** → đăng nhập GitHub.

### 11.3 Cài ha-mcp-for-xiaozhi

HACS → **Integrations** → tìm **"xiaozhi"** → cài **"MCP Server for Xiaozhi"** → restart HA.

```bash
docker restart homeassistant
```

### 11.4 Cấu hình Integration

1. **Settings** → **Devices & Services** → **Add Integration** → tìm **"Mcp"**
2. Chọn **"MCP Server for Xiaozhi"**
3. Nhập **MCP endpoint URL** từ xiaozhi.me (sau khi bind ESP32)
4. Chọn **Assist** (HA built-in API) trong danh sách MCP
5. Submit → chờ 1 phút → vào xiaozhi.me kiểm tra trạng thái Connected

### 11.5 Expose Entities

**Settings** → **Voice Assistants** → **Expose** tab → bật entities cần điều khiển:

| Entity | Mục đích |
|--------|---------|
| `climate.ac1_living_ac` | Máy lạnh 1 |
| `climate.ac2_living_ac` | Máy lạnh 2 |
| Các entity khác | Đèn, quạt... |

### 11.6 Test (không cần ESP32)

Trên **xiaozhi.me** dashboard → phần chat → gõ text lệnh:
- `"Bật đèn phòng khách"` → xem HA có thực thi không
- `"Tắt máy lạnh"` → kiểm tra entity trên HA

### 11.7 Phần cứng ESP32 (mua sau)

| Board | Giá | Link |
|-------|-----|------|
| Breadboard Mini | ~$7 / ~180k | [AliExpress](https://www.aliexpress.com/item/1005009448496585.html) |
| Spotpear Ball | ~$12 / ~300k | [AliExpress](https://vi.aliexpress.com/item/1005008627679270.html) |
| EchoEar | ~$15 / ~380k | [AliExpress](https://www.aliexpress.com/item/1005009834934442.html) |

> Board mua về đã có firmware Xiaozhi sẵn. Cắm USB nguồn → kết nối WiFi → đăng nhập xiaozhi.me → dùng ngay.

### 11.8 Troubleshooting

```bash
# Xem log
docker exec -it homeassistant cat /config/home-assistant.log | grep ws_mcp_server
```

Debug logging trong `configuration.yaml`:
```yaml
logger:
  default: info
  logs:
    custom_components.ws_mcp_server: debug
```

### 11.9 Mở rộng chức năng Xiaozhi (Đổi tên, Giá vàng, Bitcoin, Dạy học...)

Bản chất mạch ESP32 Xiaozhi chỉ là **"Microphone thu âm + Loa phát tín hiệu"**. Toàn bộ "não bộ" thực sự nằm ở Cloud LLM và Home Assistant thông qua cầu nối MCP. Vì vậy, **không cần phải can thiệp hay code lại C++ phần cứng** để thêm logic mới:

- **Đổi tính cách hoặc yêu cầu Dạy tiếng Anh:** Đăng nhập trang quản lý `xiaozhi.me`, thay đổi **System Prompt** (Lời nhắc hệ thống). Khai báo: *"Hãy đóng vai giáo viên tiếng Anh bản xứ. Chỉ giao tiếp bằng tiếng Anh, sửa lỗi và giải nghĩa khi người dùng nói sai..."*
- **Check thông tin thời gian thực (Giá Vàng, Bitcoin, Crypto):**
  1. Tạo integrations/sensors tương ứng trong mạng Home Assistant (vd: `sensor.bitcoin` qua Binance API, hoặc viết code web scraper để lấy `sensor.gia_vang_sjc`).
  2. Expose (phơi bày) các sensor này ở mục **Voice Assistants** trong HA.
  3. Cầu nối MCP sẽ tự động cấp dữ liệu. Khi bạn hỏi *"Giá Bitcoin bao nhiêu"*, LLM sẽ dò sensor trên HA và lấy đúng số để báo lại bằng giọng nói.
- **Đổi tên / Từ khóa đánh thức (Wake-word):**
  - **Tên hiển thị Wifi/Bluetooth:** Có thể clone source code ESP-IDF về đổi dễ dàng.
  - **Từ khóa gọi dậy:** Mặc định bạn nên dùng các từ có sẵn (vd: "Hi ESP", "Alexa"). Nếu muốn tạo tên Việt (vd: *"Yolo ơi"*), việc thu âm train model AI chuẩn cực kỳ vất vả. Nhưng cộng đồng đã có một **"Trick lỏ"** rất hay: dùng mô hình ngôn ngữ tiếng Anh để nhận diện phát âm (Phonetics) tiếng Việt:
    1. Nhờ AI (ChatGPT/Claude) tạo ngữ âm bằng Prompt: *"You play the role of a British person, speaking Vietnamese. You will have to pronounce Vietnamese words according to your English pronunciation... help me pronounce: '[Từ khóa của bạn]'"*. (Ví dụ "Chào đồng chí" -> "chow dong chee").
    2. clone source code ESP-IDF Xiaozhi về, mở giao diện `menuconfig`.
    3. Tìm phần **Wake Word Implementation Type** → chuyển sang model **Multinet model**.
    4. Điền chuỗi ngữ âm tiếng Anh (đã test ở B1) vào phần **Custom Wake Word**.
    5. Phần **Custom Wake Word Display** ghi chữ tiếng Việt không dấu.
    6. Chỉnh **Custom Wake Word Threshold** (mặc định 20) để test độ nhạy.
    7. **Bỏ chọn** hết tất cả các wakeword mặc định đang có sẵn.
    8. Mục **English Speech Command Model** → chọn **general english recognition(mm7_en)**.
    9. Lưu lại, Build & Flash! Khi bạn nói tiếng Việt, model tiếng Anh sẽ bắt đúng nhịp ngữ âm đó và tự bật!

## 12. Điều khiển Máy Lạnh qua Broadlink & SmartIR

Đối với các máy lạnh không có WiFi native, chúng ta sẽ sử dụng cục phát hồng ngoại **Broadlink RM Mini/Pro** kết hợp với integration **SmartIR**.

### 12.1 Cài đặt SmartIR
1. Truy cập **HACS** → **Integrations** → **Explore & Download Repositories**.
2. Tìm **SmartIR** và cài đặt.
3. Khởi động lại Home Assistant.

### 12.2 Kết nối Broadlink vào Home Assistant
1. Dùng app Broadlink trên điện thoại để kết nối cục phát vào WiFi nhà (chỉ kết nối mạng, không cần add thêm remote vào app).
2. Gán IP tĩnh trên Router cho cục Broadlink (vd: `192.168.1.202`).
3. Vào HA: **Settings** → **Devices & Services** → **Add Integration** → tìm **Broadlink** → Nhập IP.

### 12.3 Cấu hình YAML
Thêm cấu hình sau vào file `/config/configuration.yaml`:

```yaml
smartir:

climate:
  - platform: smartir
    name: Living Room AC
    unique_id: livingroom_ac
    device_code: 1122  # Thay mã tương ứng với hãng máy lạnh
    controller_data: remote.broadlink_hub_remote # Tên Entity của cục Broadlink tại bước 12.2
```

> [!TIP]
> **Cách lấy Device Code (`1101` / `1122`)**
> Tra cứu mã lệnh tương ứng tại [Kho code SmartIR](https://github.com/smartHomeHub/SmartIR/blob/master/docs/CLIMATE.md). 
> - **Daikin (form ARC452 có nút vàng/xanh):** Mã thông dụng nhất là `1101` (Nếu không được có thể thử `1122`, `1118`, `1102`).
> - ⚠️ **TUYỆT ĐỐI KHÔNG** dùng tính năng `remote.learn_command` để học từng nút của máy lạnh. Remote máy lạnh sử dụng "mã khối" (mỗi lần bấm sẽ phát toàn bộ trạng thái Nhiệt độ + Quạt + Mode). Bạn bắt buộc phải dùng SmartIR.

### 12.4 Troubleshooting: Đèn Broadlink không chớp hoặc bấm không ăn
1. **Sai Tên Thiết Bị:** Kiểm tra thật kỹ `controller_data` phải trúng phóc tên cục Broadlink đặt cùng phòng với máy lạnh (Vd: `remote.meo_phong_khach`).
2. **Lỗi "Trắng Trạng Thái" lần đầu:** Khi vừa thêm SmartIR, bấm mỗi nút Power sẽ không có tác dụng. Bạn PHẢI chọn tay đủ 3 thông số trên thẻ UI: **Chế độ (Cool) + Nhiệt độ (26°C) + Tốc độ quạt (Auto)**. Khi đủ 3 yếu tố này, SmartIR mới biết ghép mã lệnh nào trong file JSON để phát đi.

### 12.5 Tích hợp Code Server Editor vào Giao diện Home Assistant
Vì bản Docker Container không có Add-on Store để cài File Editor. Ta có thể nhúng trực tiếp VS Code Server (đang chạy port 8080) vào thanh bên trái của Home Assistant bằng tính năng `panel_iframe`.
- **Khắc phục lỗi không lưu được file (EACCES Permission Denied):** Mặc định Docker HA chạy quyền root, nếu Code-Server lưu bị lỗi quyền, chạy lệnh sau ở Terminal để cấp quyền Đọc/Ghi: `sudo chmod -R a+rwX /opt/homeassistant`.
- Thêm đoạn này vào file `/opt/homeassistant/configuration.yaml`:
```yaml
panel_iframe:
  code_server:
    title: "Code Editor"
    icon: mdi:microsoft-visual-studio-code
    url: "http://<IP_TAILSCALE>:8080" # Hoặc IP Local tuỳ hệ thống
```
Khởi động lại HA, bạn sẽ có một IDE lập trình cực xịn ngay bên trong ứng dụng!
