# 🏠 Home Server — khuong-home-server

## Thông tin máy

| Key | Value |
|-----|-------|
| **Hostname** | khuong-home-server |
| **OS** | Xubuntu 24.04 LTS (Noble) |
| **Kernel** | 6.17.0-14-generic x86_64 |
| **Platform** | Máy vật lý HP |
| **WiFi IP** | DHCP (thay đổi, không cố định) |
| **Tailscale IP** | 100.101.104.52 |
| **User** | `khuong` |
| **Role** | Home server, remote desktop |

## SSH Access

```bash
# Via Tailscale (recommended — ổn định, không phụ thuộc WiFi)
ssh khuong@100.101.104.52

# Via LAN (IP có thể đổi do DHCP)
ssh khuong@192.168.1.4
```

> [!WARNING]
> WiFi trên máy này **rất không ổn định** (ping 3-5 giây). Luôn ưu tiên SSH qua **Tailscale IP** thay vì LAN IP.

## System Services

| Service | Auto-start | Status | Mô tả |
|---------|-----------|--------|-------|
| **tailscaled** | ✅ enabled | active | Tailscale VPN — IP cố định `100.101.104.52` |
| **rustdesk** | ✅ enabled | active | Remote desktop (RustDesk client) |
| **openssh-server** | ✅ enabled | active | SSH server |

## RustDesk Remote Desktop

| Key | Value |
|-----|-------|
| **RustDesk ID** | `166292068` |
| **Password** | *(same as user password)* |
| **ID Server** | VPS Tailscale IP |
| **Relay Server** | VPS Tailscale IP |
| **Key** | *(xem trên VPS: `cat ~/rustdesk/data/id_ed25519.pub`)* |

### Kết nối từ Mac/Điện thoại

1. Mở RustDesk → **Settings** → **Network**
2. Điền **ID Server**, **Relay Server**, **Key** (lấy từ VPS)
3. Nhập ID `166292068` → Nhập password → Connect

> [!IMPORTANT]
> RustDesk dùng Tailscale IP làm server, nên **cả 2 máy đều phải bật Tailscale** mới kết nối được.

### RustDesk Server (trên VPS)

Server RustDesk self-hosted chạy trên Oracle VPS (`heyyolo-free-vps`):

```bash
# Kiểm tra server
ssh ubuntu@heyyolo-free-vps "docker ps --filter name=rustdesk"

# Restart nếu cần
ssh ubuntu@heyyolo-free-vps "cd ~/rustdesk && docker compose up -d"
```

Config: `~/rustdesk/docker-compose.yml` trên VPS.

## Network

| Interface | Loại | Ghi chú |
|-----------|------|---------|
| `enp2s0` | Ethernet (LAN) | Cắm vào modem nhà mạng → nhận IP `10.53.x.x` (sai mạng, không có Internet) |
| `wlx60fb00604419` | WiFi USB | Kết nối WiFi nhà → nhận IP `192.168.1.x` (đúng mạng) |

> [!CAUTION]
> Cổng LAN trên máy cắm vào **modem nhà mạng** sẽ nhận IP dải `10.53.x.x` — không cùng mạng với thiết bị khác và không có Internet. Phải cắm vào **router WiFi** hoặc dùng **WiFi** để có Internet.

## APT Mirror

Mirror mặc định `vn.archive.ubuntu.com` hay bị lỗi 404. Đã đổi sang `sg.archive.ubuntu.com` (Singapore, nhanh + ổn định hơn):

```bash
# File cấu hình
/etc/apt/sources.list.d/ubuntu.sources

# Đổi mirror (nếu cần)
sudo sed -i 's/vn.archive.ubuntu.com/sg.archive.ubuntu.com/g' /etc/apt/sources.list.d/ubuntu.sources
```

`unattended-upgrades` đã bị **tắt** để tránh lock apt.

## Phần mềm đã cài

- openssh-server
- curl, wget, gpg
- Tailscale
- RustDesk 1.3.9

## TODO

- [ ] Cài Google Chrome
- [ ] Cắm dây LAN vào đúng router WiFi để có mạng ổn định
- [ ] Cài Docker (nếu cần chạy container)

---

*Cập nhật: 02/04/2026*
