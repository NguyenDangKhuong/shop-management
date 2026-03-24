# Oracle Cloud VPS — heyyolo-free-vps

## Server Info

| Key | Value |
|-----|-------|
| **Name** | heyyolo-free-vps |
| **OS** | Ubuntu 24.04.3 LTS |
| **Shape** | VM.Standard.A1.Flex (ARM/aarch64) |
| **CPU** | 4 OCPU |
| **RAM** | 24 GB |
| **Disk** | 193 GB |
| **Region** | Singapore (ap-singapore-1) |
| **Public IP** | 161.118.197.104 |
| **Tailscale IP** | 100.118.218.99 |
| **User** | `ubuntu` |

## Benchmark (2026-03-14)

| Metric | Result |
|--------|--------|
| **CPU** | ARM Neoverse-N1 × 4 cores (= AWS Graviton2) |
| **Disk Write** | 150 MB/s (SSD) |
| **Disk Read** | 8.5 GB/s (cached) |
| **Network** | ~640 Mbps (~80 MB/s) |
| **Memory BW** | 21.2 GB/s |

### Cost Comparison (equivalent paid services)

| Provider | Config | Price/month |
|----------|--------|-------------|
| **Oracle (this VPS)** | 4 CPU + 24GB RAM | **$0 (Free!)** |
| AWS c6g.xlarge | 4 CPU + 8GB RAM | ~$100 |
| DigitalOcean | 4 CPU + 8GB RAM | ~$48 |
| Vultr | 4 CPU + 24GB RAM | ~$160 |

## SSH Access

```bash
# Via Tailscale (recommended — no key needed)
ssh ubuntu@heyyolo-free-vps

# Via Public IP (needs key)
ssh -i ~/Downloads/ssh-key-2026-02-20.key ubuntu@161.118.197.104
```

## Installed Services

| Service | Port | Auto-start | Mechanism | Purpose |
|---------|------|-----------|-----------|---------|
| **Tailscale** | — | ✅ enabled | systemd | SSH without key, private network |
| **Docker** 28.2.2 | — | ✅ enabled | systemd | Container runtime |
| **Nginx** 1.24.0 | 80, 443 | ✅ enabled | systemd | Reverse proxy (12 domains) |
| **Cloudflared** | — | ✅ enabled | systemd | Cloudflare Tunnel (vps-tunnel) |
| **AdGuard Home** | 53, 3001 | ✅ unless-stopped | Docker | DNS ad blocker |
| **Homepage** | 3008 | ✅ unless-stopped | Docker | Homelab dashboard UI |
| **IT-Tools** | 3005 | ✅ unless-stopped | Docker | 100+ dev utilities (JSON, Base64, Hash...) |
| **Code Server** | 3006 | ✅ unless-stopped | Docker | VS Code in browser |
| **Home Assistant** | 8123 | ✅ unless-stopped | Docker | Smart home |
| **Uptime Kuma** | 3002 | ✅ unless-stopped | Docker (kuma-net) | Website/service monitoring |
| **Zalo Bot Relay** | 3003 | ✅ unless-stopped | Docker (kuma-net) | Webhook relay → Zalo notification |
| **Portainer** | 9443 | ✅ unless-stopped | Docker | Docker web management UI |
| **CLI Proxy API** | 8317 | ✅ unless-stopped | Docker | AI proxy (Gemini, OpenRouter, Codex...) |
| **OpenClaw Gateway** | 18789 | ✅ unless-stopped | Docker | AI assistant (Telegram @heyyolo_bot, Zalo) |
| ↳ Config | `~/openclaw_data/openclaw.json` | | | Model: `cli-proxy/gemini-3.1-pro-preview` |
| ↳ Switch model | `cd ~/openclaw_data && sudo ./switch-model.sh` | | | Danh sách model từ CLI Proxy API |
| **n8n** | 5678 | ✅ always | Docker Compose | Automation platform (n8n + worker + MCP + postgres + redis) |
| **Speedtest Tracker** | 3007 | ✅ unless-stopped | Docker | Network speed test history & charts |
| **Trading Bot** | — | ✅ unless-stopped | Docker Compose | Binance Futures auto-trading (Telegram control) |
| **Webtop** | 3010 | ✅ unless-stopped | Docker | Ubuntu XFCE desktop in browser |
| **stress-ng** | — | ✅ enabled | systemd | Anti-reclaim CPU/RAM |
| **CrowdSec** | — | ✅ enabled | systemd | Brute-force protection + community blocklist |
| **vocab-push.timer** | — | ✅ enabled | systemd timer | Vocab reminder mỗi giờ |

> Tất cả service tự start lại sau VPS reboot.

## Homepage Dashboard

**URL:** https://home.thetaphoa.store (Cloudflare Tunnel) | http://100.118.218.99:3008 (Tailscale)
**Config trên VPS:** `~/homepage/config/` (NOT `~/homepage/`)
**Local backup:** `backup-vps/homepage/`

> ⚠️ **QUAN TRỌNG:** Config trên VPS có thể khác với local backup. Luôn **pull từ VPS trước** khi sửa để tránh override mất services!

### Container Run Command

```bash
sudo docker run -d \
  --name homepage \
  --restart unless-stopped \
  -e 'HOMEPAGE_ALLOWED_HOSTS=home.khuong.theworkpc.com,100.118.218.99:3008,home.thetaphoa.store' \
  -e 'NODE_TLS_REJECT_UNAUTHORIZED=0' \
  -e 'PORT=3008' \
  -e 'HOSTNAME=::' \
  -v /home/ubuntu/homepage/config:/app/config \
  -v /home/ubuntu/homepage/config/images:/app/public/images \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  --network host \
  ghcr.io/gethomepage/homepage:latest
```

> ⚠️ **Thêm domain mới:** Phải thêm vào `HOMEPAGE_ALLOWED_HOSTS` env var rồi recreate container.
> ⚠️ **Background image:** Lưu tại `~/homepage/config/images/bg.jpg` (local file, mount vào `/app/public/images`). Không dùng URL Unsplash vì bị block ở một số mạng.

### Đổi background image

```bash
# 1. Download ảnh mới về VPS
ssh ubuntu@heyyolo-free-vps "curl -L -o ~/homepage/config/images/bg.jpg '<IMAGE_URL>'"

# 2. Sửa settings.yaml (nếu cần đổi tên file)
ssh ubuntu@heyyolo-free-vps "nano ~/homepage/config/settings.yaml"
# background:
#   image: /images/bg.jpg    ← path tương đối từ /app/public/

# 3. Homepage auto-reload config, chỉ cần refresh browser
# Nếu không thấy thay đổi → restart container:
ssh ubuntu@heyyolo-free-vps "docker restart homepage"
```

> 💡 **Lưu ý:** Phải mount `~/homepage/config/images` → `/app/public/images` trong docker run command (đã có sẵn).
> Nếu dùng URL bên ngoài trong `settings.yaml`, sẽ bị block bởi firewall công ty.

### Deploy config lên VPS

```bash
# 1. LUÔN pull config hiện tại từ VPS trước khi sửa
scp ubuntu@heyyolo-free-vps:~/homepage/config/services.yaml ~/Downloads/Src/backup-vps/homepage/services.yaml

# 2. Sửa file local

# 3. Deploy lên VPS (đúng path ~/homepage/config/)
scp ~/Downloads/Src/backup-vps/homepage/services.yaml ubuntu@heyyolo-free-vps:~/homepage/config/services.yaml

# 4. Restart container
ssh ubuntu@heyyolo-free-vps "docker restart homepage"
```

### Config files

| File | Mô tả |
|------|--------|
| `services.yaml` | Danh sách services (cards trên dashboard) |
| `settings.yaml` | Theme, background, layout |
| `widgets.yaml` | Search bar, datetime, system resources |
| `bookmarks.yaml` | Quick links (GitHub, Reddit, YouTube) |
| `docker.yaml` | Docker socket config |

### Quản lý

```bash
# Logs
ssh ubuntu@heyyolo-free-vps "docker logs homepage --tail 20"

# Restart
ssh ubuntu@heyyolo-free-vps "docker restart homepage"

# Backup toàn bộ config
scp -r ubuntu@heyyolo-free-vps:~/homepage/config/ ~/Downloads/Src/backup-vps/homepage/
```

### Service Widgets

Không phải service nào cũng có widget. Chỉ các service có API mới hiển thị data trên card:

| Service | Widget type | URL | Auth |
|---------|------------|-----|------|
| AdGuard Home | `adguard` | `http://127.0.0.1:3001` | username/password |
| Uptime Kuma | `uptimekuma` | `http://127.0.0.1:3002` | slug: `default` |
| Portainer | `portainer` | `https://127.0.0.1:9443` | API key |
| Speedtest Tracker | `speedtest` | `http://127.0.0.1:3007` | Không cần |
| Home Assistant | `homeassistant` | `http://127.0.0.1:8123` | Long-Lived Access Token |

**Không có widget:** IT-Tools, Code Server, Webtop, CLI Proxy, OpenClaw, N8N, Zalo Bot

## AdGuard Home

**URL:** https://adguard.khuong.theworkpc.com
**Credentials:** see `.env.local` → `ADGUARD_USER` / `ADGUARD_PASS`
**Docs chi tiết:** [ADGUARD.md](./ADGUARD.md)

```
📱 iPhone ─┐
💻 MacBook ─┤── Tailscale DNS (100.118.218.99) ──→ AdGuard ──→ Cloudflare/Google DoH
🖥️ Ubuntu  ─┘                                      │
                                                    ├─ ✅ google.com → forward
                                                    └─ ❌ ad.doubleclick.net → 0.0.0.0
```

### Quản lý

```bash
# Status
docker ps --filter name=adguardhome

# Logs
docker logs -f adguardhome

# Restart
docker restart adguardhome

# Update
docker pull adguard/adguardhome:latest
docker stop adguardhome && docker rm adguardhome
docker run -d --name adguardhome --restart unless-stopped \
  -p 3000:3000 -p 3001:3001 -p 53:53/tcp -p 53:53/udp \
  -v ~/adguard/work:/opt/adguardhome/work \
  -v ~/adguard/conf:/opt/adguardhome/conf \
  adguard/adguardhome:latest
```

## Uptime Kuma

**URL:** https://uptime.khuong.theworkpc.com
**Credentials:** tạo account lần đầu truy cập

Monitor website/service uptime, gửi alert qua Zalo Bot khi site down.

```
📱 User nhắn Zalo Bot
     │
     ▼
Zalo Bot API ──webhook──→ Zalo Relay (Docker) ──→ trả về health check report
                               │
Uptime Kuma (Docker) ──webhook─┘──→ gửi alert DOWN/UP qua Zalo Bot API ──→ 📱 Zalo
     kuma-net                            kuma-net
```

### Docker Network

Cả 2 container cùng network `kuma-net` để giao tiếp qua tên container:

```bash
# Tạo network (chỉ cần 1 lần)
docker network create kuma-net
```

### Uptime Kuma Container

```bash
docker run -d \
  --name uptime-kuma \
  --restart unless-stopped \
  --network kuma-net \
  -p 3002:3001 \
  -v uptime-kuma:/app/data \
  louislam/uptime-kuma:latest
```

- **Port:** 3002 (host) → 3001 (container)
- **Data:** Docker volume `uptime-kuma` → `/app/data`
- **Nginx:** `uptime.khuong.theworkpc.com` → `localhost:3002`

### Zalo Bot Relay Container

```bash
docker run -d \
  --name zalo-relay \
  --restart unless-stopped \
  --network kuma-net \
  -p 3003:3003 \
  -v /home/ubuntu/zalo-relay:/app \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -e ZALO_BOT_TOKEN="<token>" \
  -w /app \
  --add-host=host.docker.internal:host-gateway \
  python:3.12-slim python3 relay.py
```

- **Script:** `~/zalo-relay/relay.py`
- **Chat ID:** `~/zalo-relay/chat_id.txt` (tự lưu khi user nhắn bot)
- **Token:** xem `.env.local` → `ZALO_UPTIME_BOT_TOKEN`
- **Nginx:** `zalo-relay.khuong.theworkpc.com` → `localhost:3003`

### Zalo Bot Webhook

```bash
# Set webhook (chỉ cần 1 lần, hoặc khi đổi URL/token)
curl -X POST "https://bot-api.zaloplatforms.com/bot<TOKEN>/setWebhook" \
  -H "Content-Type: application/json" \
  -d '{"url":"https://zalo-relay.khuong.theworkpc.com/zalo-webhook","secret_token":"khuongdev-uptime-2026"}'
```

### Notification trong Uptime Kuma

- **Type:** Webhook
- **Post URL:** `http://zalo-relay:3003/uptime-webhook`
- ⚠️ Dùng tên container `zalo-relay`, KHÔNG dùng `localhost` (Docker network)

### Relay Endpoints

| Path | Method | Mô tả |
|------|--------|--------|
| `/zalo-webhook` | POST | Nhận tin nhắn từ Zalo → lưu chat_id + trả health check |
| `/uptime-webhook` | POST | Nhận alert từ Uptime Kuma → gửi Zalo |

### Quản lý

```bash
# Status
docker ps --filter name=uptime-kuma --filter name=zalo-relay

# Logs
docker logs -f uptime-kuma
docker logs -f zalo-relay

# Restart
docker restart uptime-kuma zalo-relay

# Đổi Zalo Bot token
# 1. Sửa token mới
docker stop zalo-relay && docker rm zalo-relay
# 2. Chạy lại lệnh docker run ở trên với token mới
# 3. Gọi setWebhook với token mới

# Update Uptime Kuma
docker pull louislam/uptime-kuma:latest
docker stop uptime-kuma && docker rm uptime-kuma
# Chạy lại lệnh docker run ở trên (data giữ trong volume)
```

### Lưu ý

- **2 Zalo Bot riêng biệt:** Bot cũ cho OpenClaw, bot mới cho Uptime Kuma
- **Không ghi đè webhook:** Mỗi bot chỉ có 1 webhook URL, nếu set lại sẽ mất bot cũ
- **Health check:** Nhắn bất kỳ tin nhắn nào cho bot Uptime Kuma → nhận report health check

## Trading Bot (Binance Futures)

**Repo:** [NguyenDangKhuong/bot-trade](https://github.com/NguyenDangKhuong/bot-trade) (private)
**VPS Path:** `~/bot-trade`
**Container:** `trading-bot`
**Strategy:** RSI + EMA crossover | BTCUSDT | 3x leverage | 15m timeframe
**Control:** Telegram Bot (inline keyboard + slash commands)
**Mode:** 🧪 TESTNET

### Deploy (git pull → rebuild)

```bash
# One-liner từ Mac
ssh ubuntu@heyyolo-free-vps "cd ~/bot-trade && git pull && sudo docker compose up -d --build"

# Hoặc SSH vào rồi chạy
ssh ubuntu@heyyolo-free-vps
cd ~/bot-trade
git pull
sudo docker compose up -d --build
```

### Quản lý

```bash
# Status
sudo docker compose -f ~/bot-trade/docker-compose.yml ps

# Logs
sudo docker logs trading-bot -f --tail 50

# Restart
cd ~/bot-trade && sudo docker compose restart

# Stop
cd ~/bot-trade && sudo docker compose down

# Sửa config
nano ~/bot-trade/.env
cd ~/bot-trade && sudo docker compose restart
```

### Git SSH Key (đã setup)

VPS dùng SSH key để pull code từ GitHub (repo private):

```bash
# Key location
~/.ssh/id_ed25519        # Private key
~/.ssh/id_ed25519.pub    # Public key (đã add vào GitHub account)

# Test connection
ssh -T git@github.com
# → "Hi NguyenDangKhuong! You've successfully authenticated..."

# Nếu cần tạo lại key
ssh-keygen -t ed25519 -C "heyyolo-free-vps" -f ~/.ssh/id_ed25519 -N ""
cat ~/.ssh/id_ed25519.pub
# → Copy output → GitHub Settings → SSH Keys → Add
```

> ⚠️ SSH key này dùng cho **tất cả private repos** trên GitHub account, không riêng bot-trade.

## Portainer

**URL:** https://portainer.khuong.theworkpc.com
**Credentials:** tạo admin account lần đầu truy cập

Docker management UI — xem containers, logs, images, volumes qua web.

```bash
docker run -d \
  --name portainer \
  --restart unless-stopped \
  -p 9443:9443 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v portainer_data:/data \
  portainer/portainer-ce:lts
```

- **Port:** 9443 (HTTPS built-in)
- **Data:** Docker volume `portainer_data`
- **Nginx:** `portainer.khuong.theworkpc.com` → `https://127.0.0.1:9443`

### Quản lý

```bash
# Update
docker pull portainer/portainer-ce:lts
docker stop portainer && docker rm portainer
# Chạy lại lệnh docker run ở trên (data giữ trong volume)
```

## Home Assistant

**URL:** https://ha.khuong.theworkpc.com
**Config:** `~/homeassistant/config/`
**Docker Compose:** `~/homeassistant/docker-compose.yml`
**Restart policy:** `unless-stopped` (tự start khi VPS reboot)

### Integrations

| Integration | Devices | Kết nối qua | Status |
|---|---|---|---|
| **Sonoff LAN** (AlexxIT/HACS) | 22 công tắc eWeLink | ☁️ Cloud | ✅ |
| **Tuya** (official) | Tuya devices | ☁️ Cloud (Western America DC) | ✅ |
| **Google Home** (HACS) | Loa Google Home (2) | 📶 Cần LAN (mDNS) | ⚠️ Không thấy devices |
| **Xiaomi Home** (official) | 12 devices (camera, robot, air purifier) | ☁️ Cloud (OAuth, server: cn) | ✅ |

### ⚠️ Giới hạn HA trên VPS

HA trên VPS **chỉ dùng được cloud integrations**. Thiết bị cần LAN sẽ không hoạt động:

| Hoạt động (Cloud) | Không hoạt động (Cần LAN) |
|---|---|
| eWeLink / Sonoff LAN (cloud mode) | Loa Google Home (mDNS) |
| Tuya | Máy lạnh Casper (SmartHome app) |
| Xiaomi Home (camera controls, motion alerts) | Xiaomi camera live stream (RTSP) |
| Automations chéo tất cả | Broadlink IR / HomeKit |

**Giải pháp cho local devices:** Cài thêm HA trên `khuong-ubuntu-esxi` (cùng LAN) → dùng **Remote Home Assistant** integration liên kết 2 HA.

### Xiaomi Devices (cho HA Local sau này)

**Account:** User ID `6264427179` | Server: `cn` | Login: QR code (app Mi Home)
**Token Extractor:** https://github.com/PiotrMachowski/Xiaomi-cloud-tokens-extractor

#### Home 712001156110

| Tên | Model | IP | Token |
|---|---|---|---|
| Nhà kho (Camera) | chuangmi.camera.ipc019 | 192.168.1.10 | `4159436b564e5a565a366d4e42425863` |
| Phòng khách (Camera) | chuangmi.camera.ipc019 | 192.168.1.11 | `5458796361664e7757776c4e4c614946` |
| Nhà bếp (Camera) | chuangmi.camera.ip029a | 192.168.1.17 | `6a5245304863687368724267697a4950` |
| Sân trước (Camera) | chuangmi.camera.ip029a | 192.168.1.13 | `65476e696d42507170424a4276397964` |
| **Robot dọn nhà** | viomi.vacuum.v7 | 192.168.1.19 | `6633466f374f66684976676156467636` |

#### Home 712001156147

| Tên | Model | IP | Token |
|---|---|---|---|
| Camera sân sau | chuangmi.camera.ipc019 | 192.168.1.5 | `6c77683934344d70677539456b6f474f` |

#### Home 712001219337

| Tên | Model | IP | Token |
|---|---|---|---|
| Cam di động | chuangmi.camera.ipc019 | 192.168.8.109 | `5a79665357706e38346439394253336d` |
| Phòng khách (Camera) | chuangmi.camera.ipc019 | 192.168.1.7 | `52416f304452624c5541714c42334354` |
| Cam trước | chuangmi.camera.ip029a | 192.168.1.42 | `45416245554f57776c4e41304b374e72` |
| Cam cổng | chuangmi.camera.ip029a | 192.168.1.96 | `315268664f52464a3538417565317672` |
| Sân trước (Camera) | chuangmi.camera.025b02 | 192.168.1.18 | `52444c36396863497866326d7676326b` |
| **Air Purifier 4 Lite** | zhimi.airp.rmb1 | 192.168.1.22 | `ac2f7018ab0eb1ca9398193c3454b6ee` |

> ⚠️ Token có thể thay đổi khi reset WiFi thiết bị. Chạy lại token extractor nếu cần.

### Quản lý

```bash
# Status
cd ~/homeassistant && docker compose ps

# Logs
cd ~/homeassistant && docker compose logs -f

# Restart
cd ~/homeassistant && docker compose restart

# Update HA
cd ~/homeassistant && docker compose pull && docker compose up -d

# Backup config
tar czf ~/ha-backup-$(date +%F).tar.gz -C ~/homeassistant/config .
```

### Master Token (Google Home)

Lấy master token cho Google Home integration:
1. Mở https://accounts.google.com/EmbeddedSetup → login → lấy cookie `oauth_token`
2. Chạy trên Mac: `python3 -c "import gpsoauth; print(gpsoauth.exchange_token('EMAIL', 'OAUTH_TOKEN', '0123456789abcdef')['Token'])"`
3. Dán vào HA → Google Home integration

## Anti-Reclaim (stress-ng)

Oracle reclaims **Always Free** instances idle for 7 days if **ALL** of these are true:
- CPU < 15% (95th percentile)
- Network < 15%  
- Memory < 15% (A1 shapes only)

**Only one metric needs to be ≥15% to stay safe.**

Current config — CPU 15% + RAM 15% (3.6GB/24GB):

```bash
# Service file
cat /etc/systemd/system/stress-ng.service

# Check status
sudo systemctl status stress-ng

# Restart
sudo systemctl restart stress-ng

# Stop (if not needed)
sudo systemctl stop stress-ng && sudo systemctl disable stress-ng

# Start again
sudo systemctl enable stress-ng && sudo systemctl start stress-ng
```

Service config:
```ini
[Unit]
Description=Stress-ng - Keep Oracle VPS alive (CPU 15% + RAM 15%)
After=network.target

[Service]
Type=simple
ExecStart=/usr/bin/stress-ng --cpu 1 --cpu-load 15 --vm 1 --vm-bytes 3600M --vm-hang 0
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

## CrowdSec (Brute-force Protection)

Collaborative IPS — detects attacks from logs + uses community blocklist (IPs banned globally → auto-blocked here).

**Dashboard:** [app.crowdsec.net](https://app.crowdsec.net) (enrolled, real-time alerts + map)

**Components:**
- **crowdsec** (engine): Parses logs, detects attacks, creates alerts (~80MB RAM)
- **crowdsec-firewall-bouncer** (bouncer): Reads decisions → blocks via iptables (~19MB RAM)

**Collections enabled:** sshd, nginx, http-cve, base-http-scenarios, linux, whitelist-good-actors

**Monitored logs:**
- `/var/log/nginx/access.log` — Nginx access
- `/var/log/nginx/error.log` — Nginx errors
- `/var/log/auth.log` — SSH login attempts
- `/var/log/syslog` — System logs

```bash
# Check status
sudo systemctl status crowdsec
sudo systemctl status crowdsec-firewall-bouncer

# View recent alerts
sudo cscli alerts list

# View active bans
sudo cscli decisions list

# Manual ban/unban
sudo cscli decisions add --ip 1.2.3.4 --reason "manual ban"
sudo cscli decisions delete --ip 1.2.3.4

# View collections
sudo cscli collections list

# Update hub (scenarios, parsers)
sudo cscli hub update && sudo cscli hub upgrade

# View metrics
sudo cscli metrics

# Console enrollment (already enrolled)
sudo cscli console status

# Restart after config changes
sudo systemctl restart crowdsec
sudo systemctl restart crowdsec-firewall-bouncer

# Logs (troubleshooting)
sudo journalctl -u crowdsec -f
sudo journalctl -u crowdsec-firewall-bouncer -f
```

## Docker Log Rotation

Config at `/etc/docker/daemon.json` — prevents container logs from growing unbounded:

```json
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "50m",
    "max-file": "3"
  }
}
```

Each container: max **50MB × 3 files = 150MB** log. Auto-rotates when full.

```bash
# Check log sizes
sudo du -sh /var/lib/docker/containers/*/*-json.log | sort -rh | head -5

# Truncate a specific container log (emergency)
sudo truncate -s 0 /var/lib/docker/containers/<container_id>/<container_id>-json.log

# Clean up unused images/volumes
sudo docker image prune -f
sudo docker system prune -f
```

> ⚠️ Log rotation only applies to **new containers**. Existing containers keep old settings until recreated.

## Firewall

Oracle Cloud has **2 layers** of firewall:

### Layer 1: OCI Security List (Console)
```
Networking → VCN → Subnet → Security List → Ingress Rules
Ports opened: 80, 443
```

### Layer 2: iptables (on VPS)
```bash
# Open a new port
sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport <PORT> -j ACCEPT
sudo iptables-save | sudo tee /etc/iptables/rules.v4

# View current rules
sudo iptables -L -n --line-numbers
```

Currently opened: **22** (SSH, key-only), **80** (HTTP), **443** (HTTPS)

> Port 3000 (AdGuard setup) đã đóng (2026-03-24). Truy cập AdGuard qua `adguard.khuong.theworkpc.com` hoặc Tailscale.

## Security Hardening

### SSH
- `PasswordAuthentication no` — chỉ SSH key
- `PermitRootLogin without-password` — root chỉ key
- Port 22 mở nhưng CrowdSec chặn brute force

### Nginx Rate Limiting
```nginx
# /etc/nginx/nginx.conf (http block)
limit_req_zone $binary_remote_addr zone=general:10m rate=10r/s;  # Tất cả sites
limit_req_zone $binary_remote_addr zone=login:10m rate=3r/s;     # Webtop login
limit_req_status 429;

# Áp dụng global:
limit_req zone=general burst=20 nodelay;

# Riêng Webtop (sites-enabled/default):
limit_req zone=login burst=5 nodelay;
```

### Nginx Security Headers
```nginx
# /etc/nginx/nginx.conf (http block)
add_header X-Content-Type-Options nosniff always;           # Chặn MIME sniffing
add_header X-Frame-Options SAMEORIGIN always;               # Chặn clickjacking
add_header X-XSS-Protection "1; mode=block" always;         # Chặn XSS
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;
server_tokens off;                                           # Ẩn Nginx version
```

### Cloudflare Access (Zero Trust)
`ui.thetaphoa.store` được bảo vệ bởi Cloudflare Access:
- Auth: Email OTP (chỉ email authorized)
- Session: 24h
- Config: Zero Trust Dashboard → Access → Applications → "Webtop UI"

### Tổng kết bảo vệ
| Layer | Tool | Bảo vệ |
|-------|------|--------|
| Firewall | iptables + CrowdSec | Ban IP brute force, community blocklist |
| SSH | Key-only auth | Không brute force password |
| Web | Nginx rate limiting | 10r/s general, 3r/s login |
| Web | Security headers | XSS, clickjacking, MIME sniffing |
| Web | Cloudflare Access | OTP auth cho `*.thetaphoa.store` |
| DNS | Tailscale MagicDNS | Internal access an toàn |

## Networking Setup

- **VCN**: vcn-heyyolo
- **Subnet**: subnet-heyyolo (public)
- **Internet Gateway**: ig-quick-action-IGW
- **NSG**: ig-quick-action-NSG
- **Route Table**: Default Route Table for vcn-heyyolo

## Useful Commands

```bash
# System info
htop                          # CPU/RAM monitor
df -h                         # Disk usage
free -h                       # Memory usage

# Docker
docker ps                     # Running containers
docker compose up -d          # Start compose stack

# Nginx
sudo nginx -t                 # Test config
sudo systemctl reload nginx   # Reload config

# Tailscale
tailscale status              # Connected devices
tailscale ip                  # Show Tailscale IPs

# Home Assistant
cd ~/homeassistant && docker compose logs -f   # Logs
cd ~/homeassistant && docker compose restart    # Restart
cd ~/homeassistant && docker compose down       # Stop
cd ~/homeassistant && docker compose up -d      # Start
cd ~/homeassistant && docker compose pull && docker compose up -d  # Update
```

## Domain & DDNS

| Domain | Service | Target |
|--------|---------|--------|
| `khuong.theworkpc.com` | Dynu DDNS | → Vercel (shop) |
| `server.khuong.theworkpc.com` | Dynu wildcard | → ESXi (192.168.1.100:9443 via subnet) |
| `n8n.khuong.theworkpc.com` | Dynu wildcard | → n8n (100.108.169.39:5678 via Tailscale) |
| `cli-proxy.khuong.theworkpc.com` | Dynu wildcard | → cli-proxy (100.108.169.39:8317 via Tailscale) |
| `openclaw.khuong.theworkpc.com` | Dynu wildcard | → openclaw (100.108.169.39:18789 via Tailscale) |
| `nas.khuong.theworkpc.com` | Dynu wildcard | → NAS Synology (192.168.1.200:5001 via subnet) |
| `ha.khuong.theworkpc.com` | Dynu wildcard | → Home Assistant (localhost:8123) |
| `*.khuong.theworkpc.com` | Dynu wildcard | → VPS (add more subdomains) |

**Provider**: [Dynu](https://www.dynu.com) — free, no confirmation, wildcard support

## SSL (Let's Encrypt + Certbot)

```bash
# View current certificates
sudo certbot certificates

# Force renew
sudo certbot renew --force-renewal

# Add SSL for new subdomain
sudo certbot --nginx -d newsubdomain.khuong.theworkpc.com --non-interactive --agree-tos --email nguyendangkhuong96@gmail.com --redirect
```

Auto-renew: `certbot.timer` runs 2x/day, renews 30 days before expiry.

## Nginx Reverse Proxy

### Architecture

```
                         🌍 INTERNET
                              │
                    Dynu DNS (*.khuong.theworkpc.com)
                              │
                              ▼
              ┌═══════════════════════════════════┐
              ║  ☁️ VPS Oracle (161.118.197.104)   ║
              ║  Nginx Reverse Proxy (port 443)    ║
              ╠═══════════════════════════════════╣
              ║                                    ║
              ║  khuong.theworkpc.com               ║
              ║  → proxy_pass Vercel               ║
              ║                                    ║
              ║  server.khuong.theworkpc.com        ║
              ║  → proxy_pass 192.168.1.100:9443   ║
              ║    (via Tailscale subnet routing)   ║
              ║                                    ║
              ╚════════════╤══════════════════════╝
                           │ Tailscale VPN
                           │ (subnet: 192.168.1.0/24)
                           ▼
              ┌═══════════════════════════════════┐
              ║  🖥️ Ubuntu VM (100.108.169.39)     ║
              ║  (khuong-ubuntu-esxi)              ║
              ║  Subnet Router → forwards LAN      ║
              ╚════════════╤══════════════════════╝
                           │ LAN
                           ▼
              ┌═══════════════════════════════════┐
              ║  🖥️ ESXi Host (192.168.1.100)      ║
              ║  vSphere Web UI (:9443)            ║
              ╚═══════════════════════════════════╝
```

### Template System (envsubst)

Tất cả Nginx configs được sinh từ templates. Domain trung tâm nằm trong 1 file `.env`.

```
/etc/nginx/nginx-domains.env          ← BASE_DOMAIN=khuong.theworkpc.com
/etc/nginx/templates/                 ← Template files
  ├─ standard.conf.template           ← HTTP proxy (12 services)
  ├─ https-proxy.conf.template        ← HTTPS proxy (portainer, server, nas)
  ├─ webtop.conf.template             ← UI with auth + rate limit
  └─ vercel-proxy.conf.template       ← Root domain → Vercel
/etc/nginx/generate-configs.sh        ← Sinh tất cả configs từ templates
```

```bash
# Sinh lại tất cả configs (sau khi đổi domain trong .env):
sudo /etc/nginx/generate-configs.sh

# Đổi domain:
# 1. sudo nano /etc/nginx/nginx-domains.env → sửa BASE_DOMAIN
# 2. Chạy certbot cho tất cả subdomains mới
# 3. sudo /etc/nginx/generate-configs.sh
```

### Config files

```bash
# List all sites
ls /etc/nginx/sites-enabled/

# Edit domain
sudo nano /etc/nginx/nginx-domains.env

# Test & reload
sudo nginx -t && sudo systemctl reload nginx
```

### Add new subdomain service

```bash
# 1. Thêm vào generate-configs.sh:
#    generate myapp 3099
# 2. Chạy script:
sudo /etc/nginx/generate-configs.sh
# 3. Add SSL:
source /etc/nginx/nginx-domains.env
sudo certbot --nginx -d myapp.${BASE_DOMAIN} --non-interactive --agree-tos --email nguyendangkhuong96@gmail.com --redirect
```

## Tailscale Subnet Routing

VPS accesses local LAN (192.168.1.0/24) through Ubuntu VM subnet router.

| Machine | Tailscale IP | Role |
|---------|-------------|------|
| **heyyolo-free-vps** | 100.118.218.99 | `--advertise-exit-node --accept-routes --ssh` |
| **khuong-ubuntu-esxi** | 100.108.169.39 | `--advertise-routes=192.168.1.0/24` |
| **macbook-pro-may-cty** | 100.90.20.107 | Client |
| **khuongnas** | 100.116.76.83 | NAS |
| **iphone-13-pro-max** | 100.65.129.97 | Mobile |

```bash
# VPS: accept subnet routes + advertise exit node
sudo tailscale up --advertise-exit-node --accept-routes --ssh

# Ubuntu VM: advertise LAN
sudo tailscale up --advertise-routes=192.168.1.0/24 --accept-routes
```

### Exit Node (VPN)

VPS hoạt động như exit node — toàn bộ traffic internet của client đi qua VPS Singapore.

```
📱 iPhone → Tailscale VPN → VPS Singapore (161.118.197.104) → Internet
```

**Bật/tắt từ client:**
- **iPhone:** Tailscale app → Exit Node → `heyyolo-free-vps`
- **MacBook:** Tailscale menu bar → Exit Node → `heyyolo-free-vps`
- **CLI:** `tailscale up --exit-node=heyyolo-free-vps` (tắt: `--exit-node=`)

**Lưu ý:** Exit node không tăng tốc internet. Dùng khi cần bảo mật WiFi công cộng hoặc đổi IP sang Singapore.

## Budget Alert

Oracle Console → Billing → Budgets → `free-tier-alert`
- Budget: $1/month
- Alert: Actual Spend ≥ 1% → email notification

## Web Access

| URL | Target |
|-----|--------|
| https://khuong.theworkpc.com | Vercel shop |
| https://server.khuong.theworkpc.com | ESXi Web UI |
| https://n8n.khuong.theworkpc.com | n8n (local via Tailscale) |
| https://cli-proxy.khuong.theworkpc.com | cli-proxy (local via Tailscale) |
| https://openclaw.khuong.theworkpc.com | openclaw (local via Tailscale) |
| https://nas.khuong.theworkpc.com | NAS Synology (local via subnet) |
| https://ha.khuong.theworkpc.com | Home Assistant (smart home) |
| https://ui.khuong.theworkpc.com | Webtop (Ubuntu desktop in browser) — Nginx basic auth |
| https://ui.thetaphoa.store | Webtop (CF Tunnel + Zero Trust OTP) ⭐ |
| https://home.thetaphoa.store | Homepage Dashboard (CF Tunnel) |
| http://161.118.197.104 | VPS direct |
| http://100.118.218.99 | VPS via Tailscale |

## ⚠️ Known Limitations

### Login/Auth không hoạt động qua VPS reverse proxy

`khuong.theworkpc.com` chỉ dùng được cho **public pages** (blogs, portfolio, tweets).
**Login/Auth sẽ bị 500 Error** vì:

1. Browser ở `khuong.theworkpc.com` nhưng Vercel tạo cookie cho `thetaphoa.vercel.app`
2. NextAuth v5 dùng `__Host-` cookie prefix → **bắt buộc match domain**
3. Browser từ chối lưu cookie cross-domain → login thất bại

**Login chỉ hoạt động trên:**
- `shop.thetaphoa.store` ✅
- `thetaphoa.vercel.app` ✅

**Workaround:** Xem `docs/AUTH.md` → phần "Proxy Domain Login Redirect"

## Service Lifetime

| Service | Free? | Hết hạn? | Cần làm gì? |
|---------|-------|---------|-------------|
| ☁️ Oracle VPS | ✅ Forever | Không | stress-ng giữ alive |
| 🌐 Dynu DDNS | ✅ Forever | Không | Không cần confirm |
| 🔒 SSL Certbot | ✅ Forever | 90 ngày | Auto-renew (ko cần làm gì) |
| 🚀 Vercel | ✅ Free tier | Không | Giới hạn 100GB bandwidth/tháng |
| 🔗 Tailscale | ✅ Free (≤100 devices) | Không | Đang dùng 5/100 |
| ☁️ Cloudflare Tunnel | ✅ Free | Không | Cần domain trên CF |
| 🐙 GitHub | ✅ Free | Không | Repo unlimited |
| 🍃 MongoDB Atlas | ✅ Free tier | Không | Giới hạn 512MB storage |
| 🐳 Docker | ✅ Free | Không | — |
| 🏪 **thetaphoa.store** | ⚠️ **~$10-15/năm** | **Hàng năm** | **Phải gia hạn!** |

**Chỉ trả phí duy nhất:** `thetaphoa.store` ~$10-15/năm. Tất cả còn lại FREE.

## Domain Inventory

### 🔴 Trả phí

| Domain | Provider | Dùng cho |
|--------|---------|---------|
| `thetaphoa.store` | Cloudflare | CF Tunnel + Vercel custom domain |

### 🟢 Miễn phí (Dynu DDNS — qua VPS reverse proxy)

| Domain | Target | Routing |
|--------|--------|---------|
| `khuong.theworkpc.com` | Vercel shop (public only) | VPS → Vercel |
| `server.khuong.theworkpc.com` | ESXi Web UI | VPS → subnet → 192.168.1.100:9443 |
| `n8n.khuong.theworkpc.com` | n8n | VPS → Tailscale → 100.108.169.39:5678 |
| `cli-proxy.khuong.theworkpc.com` | CLI Proxy API | VPS → Tailscale → 100.108.169.39:8317 |
| `openclaw.khuong.theworkpc.com` | OpenClaw | VPS → Tailscale → 100.108.169.39:18789 |
| `nas.khuong.theworkpc.com` | NAS Synology | VPS → subnet → 192.168.1.200:5001 |
| `ha.khuong.theworkpc.com` | Home Assistant | VPS → localhost:8123 |
| `ui.khuong.theworkpc.com` | Webtop (web desktop) | VPS → localhost:3010 |
| `thetaphoa.vercel.app` | Vercel (default) | Direct |

### 🔵 Cloudflare Tunnel (cần `thetaphoa.store`)

**esxi-tunnel** (từ ESXi/Home network):

| Domain | Target | Có backup Dynu? |
|--------|--------|-----------------|
| `shop.thetaphoa.store` | Vercel (login hoạt động) | ⚠️ Có nhưng ko login đc |
| `n8n.thetaphoa.store` | 192.168.1.38:5678 | ✅ `n8n.khuong.theworkpc.com` |
| `server.thetaphoa.store` | 192.168.1.100:9443 | ✅ `server.khuong.theworkpc.com` |
| `cli-proxy.thetaphoa.store` | 192.168.1.38:8317 | ✅ `cli-proxy.khuong.theworkpc.com` |
| `openclaw.thetaphoa.store` | 192.168.1.38:18789 | ✅ `openclaw.khuong.theworkpc.com` |
| `nas.thetaphoa.store` | 192.168.1.200:5001 | ✅ `nas.khuong.theworkpc.com` |

**vps-tunnel** (từ Oracle VPS — ID: `df9f572c-7539-483f-b68b-d63124d61898`):

| Domain | Target | Auth | Config |
|--------|--------|------|--------|
| `home.thetaphoa.store` | localhost:3008 (Homepage) | ❌ | Dashboard |
| `ui.thetaphoa.store` | localhost:3010 (Webtop) | ✅ Cloudflare Access (Email OTP) | Dashboard |

> ⚠️ Tunnel này **managed bởi Dashboard** (remote management). Local config file bị override. Thêm/sửa route qua **Cloudflare Dashboard** → Zero Trust → Networks → Tunnels → vps-tunnel → Configure.

Config file (backup, bị override): `/etc/cloudflared/config.yml` | Cert: `/etc/cloudflared/cert.pem` | Service: `cloudflared.service` (systemd)

```bash
# Thêm route mới vào vps-tunnel:
# 1. Cloudflare Dashboard → Zero Trust → Networks → Tunnels → vps-tunnel → Public Hostname → Add
# 2. Nếu cần DNS record: cloudflared tunnel route dns vps-tunnel <subdomain>.thetaphoa.store
# 3. Tunnel tự nhận config mới (không cần restart)

# Quản lý:
sudo systemctl status cloudflared          # Status
sudo systemctl restart cloudflared         # Restart (nếu cần)
sudo journalctl -u cloudflared -f          # Logs
cloudflared tunnel info vps-tunnel         # Tunnel info
```

## Khi `thetaphoa.store` hết hạn — Migration Plan

### Bị ảnh hưởng
- ❌ Tất cả `*.thetaphoa.store` subdomains → mất
- ❌ `shop.thetaphoa.store` Vercel custom domain → mất (login qua đây sẽ die)

### Không ảnh hưởng
- ✅ VPS Oracle, Tailscale, Docker → vẫn chạy
- ✅ `*.khuong.theworkpc.com` → vẫn hoạt động
- ✅ `thetaphoa.vercel.app` → vẫn hoạt động (login qua đây)

### Cần làm khi hết hạn
1. Login shop qua `thetaphoa.vercel.app` thay vì `shop.thetaphoa.store`
2. Tất cả local services đã có backup trên `*.khuong.theworkpc.com` → không cần làm gì thêm
3. Hoặc mua domain mới ~$10/năm → setup lại CF Tunnel
