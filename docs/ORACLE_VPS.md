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

## Web Access

- **Public**: http://161.118.197.104
- **Tailscale**: http://100.118.218.99
- Landing page: `/var/www/html/index.html`
