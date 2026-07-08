# 🖥️ RustDesk Self-Hosted Server (Oracle VPS)

> Cấu hình RustDesk Server OSS để remote desktop qua WebClient và Desktop App.
> Cập nhật lần cuối: 09/04/2026.

---

## 1. Kiến trúc hệ thống

```
                        ┌─────────────────────────────────────┐
                        │         Oracle VPS (Ubuntu)         │
                        │     Public: 161.118.197.104         │
                        │     Tailscale: 100.118.218.99       │
                        │     Domain: rustdesk.khuong.        │
                        │             theworkpc.com            │
                        │                                     │
  WebClient ──wss:443──►│  Nginx (SSL)                        │
                        │    ├─ / ──► 127.0.0.1:21118 (hbbs)  │
                        │    ├─ /ws/id ──► 127.0.0.1:21118    │
                        │    └─ /ws/relay ──► 127.0.0.1:31119 │
                        │                                     │
  WebClient ─wss:21119─►│  Nginx (SSL :21119)                 │
                        │    └─ / ──► 127.0.0.1:31119 (hbbr)  │
                        │                                     │
  Desktop ──tcp:21116──►│  Docker hbbs (:21116, :21118)       │
  Desktop ──tcp:21117──►│  Docker hbbr (:21117, :21119→31119) │
                        └─────────────────────────────────────┘
```

---

## 2. Oracle Cloud Security List (Ingress Rules)

| Protocol | Port  | Source CIDR | Description               |
|----------|-------|-------------|---------------------------|
| TCP      | 21115 | 0.0.0.0/0   | RustDesk NAT test         |
| TCP      | 21116 | 0.0.0.0/0   | RustDesk ID Server TCP    |
| UDP      | 21116 | 0.0.0.0/0   | RustDesk ID Server UDP    |
| TCP      | 21117 | 0.0.0.0/0   | RustDesk Relay Server     |
| TCP      | 21119 | 0.0.0.0/0   | RustDesk Relay WebSocket  |

---

## 3. Docker Compose (`/home/ubuntu/rustdesk/docker-compose.yml`)

```yaml
networks:
  rustdesk-net:
    external: false

services:
  hbbs:
    container_name: hbbs
    ports:
      - 21115:21115
      - 21116:21116
      - 21116:21116/udp
      - 127.0.0.1:21118:21118    # WebSocket chỉ expose localhost cho Nginx
    image: rustdesk/rustdesk-server:latest
    command: hbbs -r rustdesk.khuong.theworkpc.com -k _
    volumes:
      - ./data:/root
    networks:
      - rustdesk-net
    depends_on:
      - hbbr
    restart: unless-stopped

  hbbr:
    container_name: hbbr
    ports:
      - 21117:21117
      - 127.0.0.1:31119:21119    # WebSocket map ra 31119 để tránh conflict Nginx :21119
    image: rustdesk/rustdesk-server:latest
    command: hbbr -k _
    volumes:
      - ./data:/root
    networks:
      - rustdesk-net
    restart: unless-stopped
```

**Lưu ý:**
- `-r rustdesk.khuong.theworkpc.com`: hbbs sẽ trả relay address = domain (không phải IP) → WebClient gọi `wss://domain:21119` đúng SSL cert.
- `-k _`: Bật encryption bằng key từ file `id_ed25519` trong `./data`.
- Port `21118` và `21119` (WebSocket) chỉ bind `127.0.0.1` vì Nginx đứng trước lo SSL.

---

## 4. Nginx Configuration (`/etc/nginx/sites-available/rustdesk.khuong.theworkpc.com`)

```nginx
# HTTP → HTTPS redirect
server {
    listen 80;
    server_name rustdesk.khuong.theworkpc.com;
    return 301 https://$host$request_uri;
}

# Main SSL block (port 443) — WebClient kết nối ID Server qua WSS
server {
    listen 443 ssl;
    server_name rustdesk.khuong.theworkpc.com;

    ssl_certificate /etc/letsencrypt/live/rustdesk.khuong.theworkpc.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/rustdesk.khuong.theworkpc.com/privkey.pem;

    location /ws/id {
        proxy_pass http://127.0.0.1:21118;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
        proxy_read_timeout 86400s;
        proxy_send_timeout 86400s;
    }

    location /ws/relay {
        proxy_pass http://127.0.0.1:31119;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
        proxy_read_timeout 86400s;
        proxy_send_timeout 86400s;
    }

    location / {
        proxy_pass http://127.0.0.1:21118;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
        proxy_read_timeout 86400s;
        proxy_send_timeout 86400s;
    }
}

# Relay SSL block (port 21119) — WebClient tự gọi wss://domain:21119
server {
    listen 21119 ssl;
    server_name rustdesk.khuong.theworkpc.com;

    ssl_certificate /etc/letsencrypt/live/rustdesk.khuong.theworkpc.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/rustdesk.khuong.theworkpc.com/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:31119;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
        proxy_read_timeout 86400s;
        proxy_send_timeout 86400s;
    }
}
```

---

## 5. Cài đặt phía Client

### WebClient (Trình duyệt — https://rustdesk.com/web)
- **ID Server:** `rustdesk.khuong.theworkpc.com`
- **Relay Server:** *(không có ô này trên WebClient, nó tự lấy từ hbbs)*

### Desktop App — Windows / macOS (GUI)
- **ID Server:** `rustdesk.khuong.theworkpc.com`
- **Relay Server:** **để trống**
- **Key:** *(lấy bằng lệnh ở mục 6)*

### Desktop App — Linux Headless (CLI / systemd service)

> ⚠️ **QUAN TRỌNG:** RustDesk trên Linux có **2 file config** tùy theo user nào chạy service:
> - **User thường:** `~/.config/rustdesk/RustDesk2.toml`
> - **Root (systemd service):** `/root/.config/rustdesk/RustDesk2.toml`
>
> **Service `rustdesk.service` chạy dưới root → phải sửa file ở `/root/`!**
> Sửa file ở `/home/<user>/` sẽ KHÔNG có tác dụng cho service.

Cách cấu hình trên máy Linux headless (ví dụ: `khuong-home-server`):

```bash
# SSH vào máy target
ssh khuong@khuong-home-server

# Sửa config ROOT (service dùng file này)
sudo tee /root/.config/rustdesk/RustDesk2.toml << 'EOF'
rendezvous_server = 'rustdesk.khuong.theworkpc.com:21116'
nat_type = 1
serial = 0
unlock_pin = ''
trusted_devices = ''

[options]
av1-test = 'N'
local-ip-addr = ''
custom-rendezvous-server = 'rustdesk.khuong.theworkpc.com'
key = '<lấy từ mục 6>'
relay-server = ''
EOF

# Restart service
sudo systemctl restart rustdesk

# Kiểm tra trạng thái
sudo systemctl status rustdesk
```

**Đồng bộ config user (tuỳ chọn):** Nếu muốn chạy RustDesk GUI dưới user thường:
```bash
cp /root/.config/rustdesk/RustDesk2.toml ~/.config/rustdesk/RustDesk2.toml
```

### Danh sách máy đã cấu hình

| Máy | User SSH | Config path | Trạng thái |
|-----|----------|-------------|-----------|
| `khuong-home-server` (Xubuntu) | `khuong` | `/root/.config/rustdesk/RustDesk2.toml` | ✅ OK |
| `khuong-ubuntu-esxi` | — | GUI Desktop App | ✅ OK |

---

## 6. Public Key (cho client mới)

Lấy key để cấu hình client mới:
```bash
ssh ubuntu@heyyolo-free-vps "cat /home/ubuntu/rustdesk/data/id_ed25519.pub"
```
Lấy key bằng lệnh trên, dán vào config client.

---

## 7. Troubleshooting

| Triệu chứng | Nguyên nhân | Giải pháp |
|-------------|-------------|-----------|
| Desktop App báo "Not Ready" | Port 21116 bị chặn | Kiểm tra Oracle Security List |
| WebClient báo "Failed to connect relay `wss://IP:21119`" | Client target vẫn set `relay-server = IP cũ` | Sửa config TOML trên máy target, xoá `relay-server` |
| WebClient kết nối 1 máy OK, máy khác tạch | Máy tạch chưa đổi config (hoặc sửa sai file) | Kiểm tra `/root/.config/rustdesk/RustDesk2.toml` (Linux) |
| Sửa config rồi nhưng vẫn lỗi | Sửa file user (`/home/`) thay vì root (`/root/`) | **RustDesk service chạy root → phải sửa ở `/root/`** |
| WebClient kết nối ID OK nhưng relay tạch | Nginx không listen port 21119 hoặc proxy sai | Kiểm tra Nginx config block `listen 21119 ssl` |
| Nginx lỗi "address already in use" trên 21119 | Docker hbbr chiếm port 21119 trên host | Đổi Docker port map thành `127.0.0.1:31119:21119` |
| Desktop App kết OK, WebClient không | WebClient cần WSS (SSL), Desktop App dùng TCP thuần | Kiểm tra Nginx SSL cert + port 21119 |

---

## 8. Lệnh quản lý

### VPS (Server)
```bash
# Restart RustDesk Server
cd /home/ubuntu/rustdesk && sudo docker compose down && sudo docker compose up -d

# Xem logs
sudo docker logs hbbs -f
sudo docker logs hbbr -f

# Reload Nginx
sudo nginx -t && sudo systemctl reload nginx

# Test port connectivity (từ máy local)
for port in 21115 21116 21117 21119; do
  nc -z -w 3 rustdesk.khuong.theworkpc.com $port && echo "$port: OK" || echo "$port: BLOCKED"
done
```

### Target Machine (Linux)
```bash
# Xem config hiện tại
sudo cat /root/.config/rustdesk/RustDesk2.toml

# Restart RustDesk client
sudo systemctl restart rustdesk

# Xem logs RustDesk client
sudo journalctl -u rustdesk -f
```
