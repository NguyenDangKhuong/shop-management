# 🖥️ Alpine VM — alpine-cloudflared

## Thông tin máy

| Key | Value |
|-----|-------|
| **Hostname** | alpine-cloudflared |
| **OS** | Alpine Linux 3.23 |
| **Platform** | VMware ESXi VM |
| **LAN IP** | `192.168.1.4` |
| **Tailscale IP** | `100.64.80.29` |
| **Role** | Tailscale subnet router, Cloudflare Tunnel origin, Nginx router proxy |

## Docker Containers

Các dịch vụ chính được cô lập chạy hoàn toàn dưới dạng Docker containers để tránh xung đột thư viện `musl` của Alpine.

| Container | Port | Mô tả |
|-----------|------|-------|
| `cloudflared` | — | Cloudflare Tunnel (`esxi-tunnel`) kết nối các subdomains mạng nhà ra internet. |
| `router-proxy-esxi` | `:8882` | Nginx Proxy truy cập Router Nokia (`192.168.1.1`) từ xa qua IP Tailscale. Tự động bọc Header để lách lỗi CSRF `Invalid Parameter` của modem VNPT/Nokia. |

### 1. Cấu hình Cloudflared
Chạy thông qua token được quản lý từ xa (Remote-managed) trên Cloudflare Zero Trust Dashboard:

```bash
docker run -d \
  --name cloudflared \
  --restart unless-stopped \
  cloudflare/cloudflared:latest \
  tunnel --no-autoupdate run --token <CF_TUNNEL_TOKEN>
```

### 2. Cấu hình Nginx Router Proxy (Fix lỗi Redirect HTTPS)
Router `192.168.1.1` bắt buộc bảo mật bằng `https` và tự động redirect mọi yêu cầu `http`. Khi truy cập qua Tailscale VPN, điều này gây lỗi vì client bị đá về IP LAN ngoại tuyến.

File cấu hình đặt tại `/root/router-proxy-esxi/nginx.conf` trên Alpine:
```nginx
events { worker_connections 1024; }
http {
    server {
        listen 8882;
        server_name _;
        location / {
            proxy_pass https://192.168.1.1;
            proxy_ssl_verify off;
            proxy_redirect https://192.168.1.1/ /;
            proxy_set_header Host 192.168.1.1;
            proxy_set_header Referer https://192.168.1.1;
        }
    }
}
```

Chạy container bằng lệnh:
```bash
docker run -d \
  --name router-proxy-esxi \
  --restart unless-stopped \
  -p 8882:8882 \
  -v /root/router-proxy-esxi/nginx.conf:/etc/nginx/nginx.conf:ro \
  nginx:alpine
```

## System Services (OpenRC)

Các dịch vụ khởi động cùng hệ thống trên Alpine sử dụng OpenRC:

| Service | Mô tả | Lệnh quản lý |
|---------|-------|--------------|
| **tailscale** | VPN & Subnet Router | `rc-service tailscale [start/stop/restart/status]` |
| **docker** | Container Runtime | `rc-service docker [start/stop/restart/status]` |
| **sshd** | SSH Server (key-auth) | `rc-service sshd [start/stop/restart/status]` |

*Cập nhật: 18/07/2026*
