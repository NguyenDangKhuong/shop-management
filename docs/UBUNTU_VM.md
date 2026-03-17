# 🖥️ Ubuntu VM — khuong-ubuntu-esxi

## Thông tin máy

| Key | Value |
|-----|-------|
| **Hostname** | khuong-ubuntu-esxi |
| **OS** | Ubuntu 22.04 LTS |
| **Platform** | VMware ESXi VM |
| **LAN IP** | 192.168.1.38 |
| **Tailscale IP** | 100.108.169.39 |
| **Role** | Dev server, Tailscale subnet router, Cloudflare Tunnel origin |

## Systemd User Services (auto-start on login)

Chạy bằng `systemctl --user` — tự start khi user `khuong` login vào Ubuntu.

| Service | Port | Mô tả |
|---------|------|-------|
| `shop-nextjs.service` | `:3000` | Next.js dev server (`npx next dev`) |
| `shop-ws-bridge.service` | `:3001, :3002` | Veo3 WS Bridge (Chrome Extension ↔ Next.js) |
| `openclaw-node.service` | `:18789` | OpenClaw Node Host |

```bash
# Quản lý
systemctl --user status shop-nextjs
systemctl --user restart shop-nextjs
systemctl --user stop shop-nextjs

# Logs
journalctl --user -u shop-nextjs -f

# Service files location
~/.config/systemd/user/shop-nextjs.service
~/.config/systemd/user/shop-ws-bridge.service
~/.config/systemd/user/openclaw-node.service
```

> [!WARNING]
> Đây là **user services** — chỉ chạy khi user `khuong` đã login. Nếu máy restart mà chưa login → services không chạy.

## Docker Containers

| Container | Image | Port | Vai trò |
|-----------|-------|------|---------|
| **n8n** | n8n-with-ffmpeg | `:5678` | Automation chính |
| **n8n-worker** | n8n-with-ffmpeg | — | Worker xử lý jobs |
| **n8n-mcp** | n8n-n8n-mcp | `:3100` | MCP server |
| **postgres** | postgres:16 | internal | DB cho n8n |
| **redis** | redis:alpine | internal | Queue cho n8n |
| **openclaw-gateway** | openclaw:local | `:18789-18790` | OpenClaw AI |

> ℹ️ **CLI Proxy** đã chuyển sang Oracle VPS (17/03/2026). Xem [ORACLE_VPS.md](./ORACLE_VPS.md).

## System Services

| Service | Mô tả |
|---------|-------|
| **cloudflared** | Cloudflare Tunnel — expose local services ra internet |
| **tailscaled** | Tailscale VPN + subnet router (advertise 192.168.1.0/24) |
| **rustdesk** | Remote desktop |
| **docker** | Container runtime |

## Nếu máy tắt thì mất gì?

| ❌ Mất | ✅ Vẫn chạy |
|--------|-------------|
| n8n (`n8n.thetaphoa.store`) | Shop app (`shop.thetaphoa.store` — Vercel) |
| OpenClaw (`openclaw.thetaphoa.store`) | CLI Proxy (`cli-proxy.khuong.theworkpc.com` — VPS) |
| WS Bridge (Veo3 gen video) | Cloudflare R2 / Workers |
| ESXi access (`server.thetaphoa.store`) | Oracle VPS (`161.118.197.104`) |
| NAS access (`nas.thetaphoa.store`) | AdGuard, Uptime Kuma, Home Assistant (VPS) |

---

*Cập nhật: 17/03/2026*
