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
| `openclaw-node.service` | — | OpenClaw Node (connects to VPS gateway) |

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

Không còn container nào chạy trên máy này.

> ℹ️ **CLI Proxy**, **OpenClaw** và **n8n** đã chuyển sang Oracle VPS (18/03/2026). Xem [ORACLE_VPS.md](./ORACLE_VPS.md).

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
| WS Bridge (Veo3 gen video) | Shop app (`shop.thetaphoa.store` — Vercel) |
| ESXi access (`server.thetaphoa.store`) | n8n (`n8n.khuong.theworkpc.com` — VPS) |
| NAS access (`nas.thetaphoa.store`) | CLI Proxy (`cli-proxy.khuong.theworkpc.com` — VPS) |
| | OpenClaw (`openclaw.khuong.theworkpc.com` — VPS) |
| | Cloudflare R2 / Workers |
| | Oracle VPS (`161.118.197.104`) |

---

*Cập nhật: 18/03/2026*
