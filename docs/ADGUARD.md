# AdGuard Home — DNS Ad Blocker

Last updated: 2026-03-17

## Overview

AdGuard Home chạy trên VPS Oracle, block quảng cáo + tracker ở tầng DNS cho **tất cả device** qua Tailscale. Không cần cài gì trên từng device.

## Server Info

| Key | Value |
|-----|-------|
| **URL** | https://adguard.khuong.theworkpc.com |
| **Username** | `admin` |
| **Password** | `khuongdev2024` |
| **Docker** | `adguard/adguardhome:latest` |
| **DNS Port** | 53 (TCP + UDP) |
| **Web Port** | 3001 |
| **Data** | `~/adguard/conf` + `~/adguard/work` |

## Architecture

```
📱 iPhone ─┐                              ┌─ ✅ google.com → forward
💻 MacBook ─┤── Tailscale DNS ──→ 🖥️ VPS  ─┤─ ✅ youtube.com → forward
🖥️ Ubuntu  ─┘    (100.118.218.99)  AdGuard ─┤─ ❌ ad.doubleclick.net → 0.0.0.0
                                            └─ ❌ tracker.facebook.com → 0.0.0.0
                                                          │
                                                          ▼ forward
                                               ┌─────────────────────┐
                                               │  Cloudflare 1.1.1.1 │
                                               │  Google    8.8.8.8  │
                                               │  (DNS-over-HTTPS)   │
                                               └─────────────────────┘
```

## Cài đặt Tailscale DNS (quan trọng!)

Để tất cả device dùng AdGuard DNS qua Tailscale:

### Option 1: Tailscale Admin Console (recommend)
1. Mở https://login.tailscale.com/admin/dns
2. **Add nameserver** → Custom: `100.118.218.99` (VPS Tailscale IP)
3. Bật **Override local DNS** → ON
4. Done! Tất cả device trong tailnet dùng AdGuard DNS

### Option 2: Chỉ trên 1 device
- **iPhone**: Settings → Wi-Fi → DNS → Manual → `100.118.218.99`
- **Mac**: System Preferences → Network → DNS → `100.118.218.99`

## Quản lý

### Docker

```bash
# SSH vào VPS
ssh ubuntu@heyyolo-free-vps

# Status
docker ps --filter name=adguardhome

# Logs
docker logs -f adguardhome

# Restart
docker restart adguardhome

# Update
docker pull adguard/adguardhome:latest
docker stop adguardhome && docker rm adguardhome
docker run -d \
  --name adguardhome \
  --restart unless-stopped \
  -p 3001:3001 \
  -p 53:53/tcp \
  -p 53:53/udp \
  -v ~/adguard/work:/opt/adguardhome/work \
  -v ~/adguard/conf:/opt/adguardhome/conf \
  adguard/adguardhome:latest

# Backup config
tar czf ~/adguard-backup-$(date +%F).tar.gz -C ~/adguard .
```

### Web Dashboard

Truy cập: https://adguard.khuong.theworkpc.com

Dashboard hiển thị:
- Tổng queries hôm nay
- Số queries bị block (%)
- Top blocked domains
- Top clients (device nào query nhiều nhất)

### Quản lý filter lists

Mặc định có **AdGuard DNS filter** (~162K rules). Thêm filter:

1. Dashboard → Filters → DNS Blocklists → Add blocklist
2. Gợi ý thêm:

| Filter | URL | Mô tả |
|--------|-----|--------|
| EasyList | `https://easylist.to/easylist/easylist.txt` | Quảng cáo phổ biến |
| EasyPrivacy | `https://easylist.to/easylist/easyprivacy.txt` | Tracker |
| ABPVN | `https://raw.githubusercontent.com/nickyvan/nickyvan.github.io/master/nickyvan.txt` | Quảng cáo Việt Nam |

### Whitelist (nếu bị chặn nhầm)

1. Dashboard → Query Log → tìm domain bị chặn
2. Click "Unblock" → domain vào whitelist
3. Hoặc: Dashboard → Filters → Custom filtering rules → thêm `@@||domain.com^`

## Upstream DNS

| Provider | Protocol | Mô tả |
|----------|----------|--------|
| Cloudflare | DNS-over-HTTPS | `https://cloudflare-dns.com/dns-query` |
| Google | DNS-over-HTTPS | `https://dns.google/dns-query` |

Bootstrap DNS: `1.1.1.1`, `8.8.8.8` (dùng để resolve upstream DoH domain)

## Lưu ý quan trọng

### systemd-resolved đã bị disable

Khi cài AdGuard, đã disable `systemd-resolved` trên VPS để AdGuard dùng port 53. VPS dùng `/etc/resolv.conf` trỏ thẳng đến `1.1.1.1`.

```bash
# Nếu cần bật lại systemd-resolved:
docker stop adguardhome
sudo systemctl enable --now systemd-resolved
sudo ln -sf /run/systemd/resolve/stub-resolv.conf /etc/resolv.conf
```

### Hạn chế

| Hạn chế | Chi tiết |
|---------|---------|
| YouTube in-stream ads | Ads nhúng trong video stream → DNS không block được |
| Một số app game | Ads embedded trong app binary |
| Cần Tailscale bật | Tắt Tailscale → device dùng DNS mặc định |

## Troubleshooting

```bash
# AdGuard không chạy?
docker logs adguardhome | tail -20

# DNS không resolve?
docker exec adguardhome nslookup google.com 127.0.0.1

# Port 53 bị chiếm?
sudo ss -tlnp | grep :53

# Restart toàn bộ
docker restart adguardhome

# Kiểm tra từ Mac
nslookup google.com 100.118.218.99
```

## Related

- [ORACLE_VPS.md](./ORACLE_VPS.md) — VPS info, Tailscale setup
