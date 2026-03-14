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

| Service | Status | Purpose |
|---------|--------|---------|
| **Tailscale** | enabled | SSH without key, private network |
| **Docker** 28.2.2 | enabled | Container runtime |
| **Nginx** 1.24.0 | enabled | Web server (port 80) |
| **stress-ng** | enabled | Keep VPS alive (anti-reclaim) |

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

## Firewall

Oracle Cloud has **2 layers** of firewall:

### Layer 1: OCI Security List (Console)
```
Networking → VCN → Subnet → Security List → Ingress Rules
Ports opened: 80, 443, 3000
```

### Layer 2: iptables (on VPS)
```bash
# Open a new port
sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport <PORT> -j ACCEPT
sudo iptables-save | sudo tee /etc/iptables/rules.v4

# View current rules
sudo iptables -L -n --line-numbers
```

Currently opened: 80, 443, 3000

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
```

## Domain & DDNS

| Domain | Service | Target |
|--------|---------|--------|
| `khuong.theworkpc.com` | Dynu DDNS | → Vercel (shop) |
| `server.khuong.theworkpc.com` | Dynu wildcard | → ESXi (192.168.1.100:9443 via subnet) |
| `n8n.khuong.theworkpc.com` | Dynu wildcard | → n8n (100.108.169.39:5678 via Tailscale) |
| `cli-proxy.khuong.theworkpc.com` | Dynu wildcard | → cli-proxy (100.108.169.39:8317 via Tailscale) |
| `openclaw.khuong.theworkpc.com` | Dynu wildcard | → openclaw (100.108.169.39:18789 via Tailscale) |
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

### Config files

```bash
# List all sites
ls /etc/nginx/sites-enabled/

# Edit a site
sudo nano /etc/nginx/sites-available/khuong.theworkpc.com

# Test & reload
sudo nginx -t && sudo systemctl reload nginx
```

### Add new subdomain service

```bash
# 1. Create nginx config
sudo tee /etc/nginx/sites-available/myapp.khuong.theworkpc.com > /dev/null << 'EOF'
server {
    listen 80;
    server_name myapp.khuong.theworkpc.com;
    location / {
        proxy_pass http://localhost:PORT;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF

# 2. Enable & reload
sudo ln -s /etc/nginx/sites-available/myapp.khuong.theworkpc.com /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# 3. Add SSL
sudo certbot --nginx -d myapp.khuong.theworkpc.com --non-interactive --agree-tos --email nguyendangkhuong96@gmail.com --redirect
```

## Tailscale Subnet Routing

VPS accesses local LAN (192.168.1.0/24) through Ubuntu VM subnet router.

| Machine | Tailscale IP | Role |
|---------|-------------|------|
| **heyyolo-free-vps** | 100.118.218.99 | `--accept-routes --ssh` |
| **khuong-ubuntu-esxi** | 100.108.169.39 | `--advertise-routes=192.168.1.0/24` |
| **macbook-pro-may-cty** | 100.90.20.107 | Client |
| **khuongnas** | 100.116.76.83 | NAS |
| **iphone-13-pro-max** | 100.65.129.97 | Mobile |

```bash
# VPS: accept subnet routes
sudo tailscale up --accept-routes --ssh

# Ubuntu VM: advertise LAN
sudo tailscale up --advertise-routes=192.168.1.0/24 --accept-routes
```

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

**Fix:** Cần thêm domain vào Vercel Domains (yêu cầu CNAME record, Dynu free không hỗ trợ) hoặc mua domain riêng ~$10/năm.
