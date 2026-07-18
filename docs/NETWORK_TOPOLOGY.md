# 🌐 Network Topology — Cấu Hình Mạng Nhà

Last updated: 2026-07-18

## Overview

Mô hình mạng nhà theo kiến trúc **Wired Hub-and-Spoke** kết hợp **DNS Sinkhole** và **Tailscale VPN Overlay**. Nhà 3 tầng, mỗi tầng có 1 cục phát WiFi ZTE cắm dây LAN trực tiếp vào router Nokia tổng.

## Sơ Đồ Tổng Thể

```
                    ┌────────────────────────────┐
                    │    ☁️ Oracle VPS Singapore   │
                    │   IP: 161.118.197.104       │
                    │   TS: 100.118.218.99        │
                    │                              │
                    │   Nginx Reverse Proxy (443)  │
                    │   HA Master, AdGuard DNS     │
                    │   20+ Docker containers      │
                    └──────────┬───────────────────┘
                               │ Tailscale VPN
                               │ (subnet: 192.168.1.0/24)
                               │
┌──────────────────────────────┼──────────────────────────────┐
│                          HOME LAN                           │
│                                                             │
│  Internet (VNPT ISP)                                        │
│       │                                                     │
│       ▼                                                     │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  📡 Modem VNPT (dải 10.53.x.x — KHÔNG DÙNG LAN)   │    │
│  └───────────────────┬─────────────────────────────────┘    │
│                      │                                      │
│                      ▼                                      │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  📡 Nokia 10G PON Home Gateway (192.168.1.1)        │    │
│  │  ├─ Vai trò: Router / DHCP Server / Firewall       │    │
│  │  ├─ WiFi: TẮT (không phát sóng)                    │    │
│  │  ├─ UPnP/DLNA: TẮT (chống botnet)                  │    │
│  │  ├─ DNS: 192.168.1.108 (AdGuard) / 1.1.1.1 (dự)   │    │
│  │  ├─ LAN Ports: Route Mode (4 cổng)                 │    │
│  │  └─ MAC: 04:56:65:xx:xx:xx (Megacorp/Alcatel)      │    │
│  └──┬──────┬──────┬──────┬─────────────────────────────┘    │
│     │      │      │      │                                  │
│     │      │      │      │                                  │
│  ┌──┴──┐┌──┴──┐┌──┴──┐┌──┴──────────────────────────────┐  │
│  │ ZTE ││ ZTE ││ ZTE ││ Các thiết bị khác               │  │
│  │ #1  ││ #2  ││ #3  ││ (ESXi, NAS, N5 Max, HP Server)  │  │
│  │Trệt ││Lầu 1││Lầu 2││                                 │  │
│  └─────┘└─────┘└─────┘└─────────────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 1. Router Tổng — Nokia 10G PON Home Gateway

| Key | Value |
|-----|-------|
| **Model** | Nokia 10G PON Home Gateway |
| **IP** | `192.168.1.1` |
| **Vai trò** | Router / DHCP Server / Firewall / Gateway |
| **WiFi** | **TẮT** (các cục ZTE lo phát sóng) |
| **DHCP Range** | `192.168.1.x` (dải `/24`) |
| **Primary DNS** | `192.168.1.108` (AdGuard Home trên N5 Max) |
| **Secondary DNS** | `1.1.1.1` (Cloudflare, dự phòng) |
| **LAN Port Mode** | Route Mode (tất cả 4 cổng) |
| **MAC** | `04:56:65:xx:xx:xx` (OUI: Megacorp/Alcatel-Lucent) |

### Bảo mật Router

| Biện pháp | Trạng thái |
|-----------|------------|
| **UPnP / DLNA** | ❌ TẮT — chống thiết bị tự mở port |
| **Port Forwarding** | Không có rule nào |
| **Remote Management** | Chỉ truy cập từ LAN |
| **Firewall** | Bật mặc định |

### Truy cập Router từ xa

Router Nokia chặn đăng nhập từ xa nếu Header sai (lỗi `Invalid Parameter`). Giải pháp: Dùng **Nginx Reverse Proxy** trên N5 Max (port `8881`) để bypass.

```
📱 iPhone/MacBook → Tailscale → http://100.91.8.9:8881 → Nginx → http://192.168.1.1
```

### Static DHCP Reservations (trên Nokia)

| Thiết bị | MAC Address | IP cố định |
|----------|-------------|------------|
| N5 Max (Armbian WiFi) | `40:aa:56:5b:67:25` | `192.168.1.108` |
| AC1 (Midea) | `AC:72:DD:D5:15:A2` | `192.168.1.200` |
| AC2 (Midea) | `24:59:E5:EA:C3:C4` | `192.168.1.201` |
| Broadlink Hub | `EC:0B:AE:9E:7F:C5` | `192.168.1.202` |

## 2. Hệ Thống Wi-Fi — ZTE ZXHN E2633 Mesh (x3)

| Key | Value |
|-----|-------|
| **Model** | ZTE ZXHN E2633 |
| **Số lượng** | 3 node (Tầng trệt, Lầu 1, Lầu 2) |
| **Chế độ** | **MESH + Bridge Mode** — Nokia cấp IP, ZTE lo WiFi & roaming |
| **DHCP** | TẮT trên cả 3 cục (Nokia quản lý) |
| **IPv6** | ❌ **TẮT** trên cả 3 cục — chống thiết bị IoT lộ IP công khai |
| **Backhaul** | **Wired** — cáp LAN cắm trực tiếp vào Nokia |
| **Firmware** | V1.0.0 (#1, #3) / V1.0.4 (#2) — China Mobile nội địa |
| **Công suất phát** | Nên để **Tiêu chuẩn (标准)** — chống Sticky Client |

### Danh sách Node

| Node | Vị trí | IP | MAC | Firmware | Vai trò MESH |
|------|--------|----|-----|----------|--------------|
| ZTE #1 | Tầng trệt | `192.168.1.39` | `c0:51:5c:b7:d0:9a` | V1.0.0 | 副路由 (Agent) |
| ZTE #2 | Lầu 1 | `192.168.1.40` | `c8:98:28:14:44:d5` | **V1.0.4** | **主路由 (Main Controller)** |
| ZTE #3 | Lầu 2 | `192.168.1.41` | `3c:a7:ae:8f:61:18` | V1.0.0 | 副路由 (Agent) |

### SSID & Băng tần

| Băng tần | SSID | Mục đích |
|----------|------|----------|
| **2.4G** | `Wifi` | Thiết bị IoT, Smart Home (camera, ổ cắm, ESP32) |
| **5G** | `Wifi-5G` | Thiết bị cá nhân (MacBook, iPhone) |

### MESH & Roaming

| Tính năng | Trạng thái | Ghi chú |
|-----------|------------|---------|
| **MESH Config** (网格配置) | ✅ BẬT | 3 cục pair thành công qua wired backhaul |
| **Wireless Backhaul** (无线回程) | ❌ TẮT | 3 cục đều cắm dây LAN, không cần |
| **Fast Roaming** (802.11k/v) | ⚠️ Hạn chế | Firmware China Mobile hỗ trợ cơ bản qua MESH |

> [!IMPORTANT]
> **Firmware mới hơn phải làm Main!** Cục V1.0.4 (.40) là Main Controller — nó push config WiFi (SSID, password, channel) xuống 2 cục Agent V1.0.0. Nếu đặt ngược lại (V1.0.0 làm Main), Agent V1.0.4 sẽ bị tắt WiFi vì Main không push config được.

### Sticky Client (Bám sóng cứng đầu)

Trước khi bật MESH, khi di chuyển giữa các tầng, điện thoại có thể "bám" sóng cục cũ. Sau khi bật MESH, 3 cục ZTE **phối hợp** với nhau để hỗ trợ roaming tốt hơn.

**Giải pháp đã áp dụng:**
1. Bật MESH → 3 cục nhận biết nhau, hỗ trợ client chuyển cục
2. Hạ công suất phát → **Tiêu chuẩn** (标准) trên cả 3 cục — chống overlap sóng

### Đường dẫn cấu hình ZTE (Firmware China Mobile)

```
Trang chủ → 进入高级配置 (Cấu hình Nâng cao) → 网络配置 (Network Config)
├─ WLAN → Cấu hình RF WiFi → Tín hiệu không dây → Tiêu chuẩn
├─ 网格配置 (MESH Config) → 开启 (BẬT)
│   ├─ Main (.40): Bộ điều khiển chính
│   └─ Agent (.39, .41): Bộ định tuyến phụ (Đại lý)
├─ 局域网 (LAN) → DHCP → 关闭 (TẮT)
└─ 管理与诊断 → Bộ chuyển mạch IPv6 → 关闭 (TẮT)
```

> [!TIP]
> **Truy cập ZTE khi ở Bridge Mode:** Vì ZTE không tự cấp IP nữa, bạn phải kết nối WiFi vào đúng cục đó rồi truy cập IP đã gán (`.39`, `.40`, `.41`). Hoặc thử địa chỉ mặc định `192.168.2.1` hoặc `zte.home`.

## 3. Modem VNPT (Không sử dụng trực tiếp)

| Key | Value |
|-----|-------|
| **Dải IP** | `10.53.x.x` |
| **Vai trò** | Modem quang (chỉ chuyển tín hiệu) |

> [!CAUTION]
> **KHÔNG cắm thiết bị trực tiếp vào modem VNPT.** Sẽ nhận IP dải `10.53.x.x` — khác mạng với các thiết bị khác (`192.168.1.x`), không có Internet nội bộ. Phải cắm vào **Nokia router** hoặc dùng **WiFi từ ZTE**.

## 4. Tailscale VPN Overlay

Tất cả thiết bị quan trọng kết nối qua Tailscale, tạo thành mạng riêng ảo xuyên suốt.

| Thiết bị | Tailscale IP | Vai trò |
|----------|-------------|---------|
| **heyyolo-free-vps** (Oracle VPS) | `100.118.218.99` | Server, Exit Node, DNS (AdGuard) |
| **alpine-cloudflared** (Alpine VM) | `100.64.80.29` | **Subnet Router** (`192.168.1.0/24`) |
| **n5-max** (Armbian TV Box) | `100.91.8.9` | HA Slave, AdGuard Local, DNS Server |
| **khuong-home-server** (HP Xubuntu) | `100.101.104.52` | Home server, RustDesk |
| **khuongnas** (Synology NAS) | `100.116.76.83` | NAS storage |
| **macbook-pro-may-cty** | `100.90.20.107` | Client (dev machine) |
| **iphone-13-pro-max** | `100.65.129.97` | Mobile client |

### Subnet Routing

Alpine VM (`alpine-cloudflared`) quảng bá route `192.168.1.0/24` → VPS có thể truy cập **toàn bộ thiết bị LAN nhà** qua Tailscale.

```bash
# Alpine VM: quảng bá LAN
sudo tailscale up --advertise-routes=192.168.1.0/24 --accept-routes

# VPS: nhận route + làm exit node
sudo tailscale up --advertise-exit-node --accept-routes --ssh
```

### DNS qua Tailscale

```
📱 iPhone ─┐
💻 MacBook ─┤── Tailscale DNS (100.118.218.99) ──→ AdGuard VPS ──→ Cloudflare/Google DoH
🖥️ Ubuntu  ─┘                                       │
                                                     ├─ ✅ google.com → forward
                                                     └─ ❌ ad.doubleclick.net → 0.0.0.0
```

**Cấu hình:** Tailscale Admin → DNS → Custom Nameserver `100.118.218.99` → Override local DNS: ON

## 5. Thiết Bị Trong Mạng LAN

### Servers & Compute

| Thiết bị | IP LAN | Tailscale IP | Vai trò |
|----------|--------|-------------|---------|
| Nokia Router | `192.168.1.1` | — | Gateway / DHCP / Firewall |
| ESXi Host | `192.168.1.100` | — | Hypervisor (Huananzhi + Xeon) |
| Alpine VM (trên ESXi) | `192.168.1.4` | `100.64.80.29` | Subnet Router, Nginx proxy |
| Magicsee N5 Max | `192.168.1.108` | `100.91.8.9` | HA Slave, AdGuard Local |
| HP Home Server | DHCP (WiFi) | `100.101.104.52` | RustDesk, headless server |
| Synology NAS | `192.168.1.200:5001` | `100.116.76.83` | NAS storage |

### IoT & Smart Home

| Thiết bị | IP | Kết nối | Quản lý bởi |
|----------|-----|---------|-------------|
| Midea AC1 | `192.168.1.200` | WiFi LAN | HA Slave (Midea AC LAN) |
| Midea AC2 | `192.168.1.201` | WiFi LAN | HA Slave (Midea AC LAN) |
| Broadlink Hub | `192.168.1.202` | WiFi LAN | HA Slave (SmartIR) |
| Xiaomi Camera x6+ | `192.168.1.5/7/10/11/13/17...` | WiFi | HA Master (Cloud) |
| Sonoff Switches x22 | DHCP | WiFi (Cloud) | HA Master (eWeLink) |
| Tuya Devices | DHCP | WiFi (Cloud) | HA Master (Tuya) |
| Google Home x2 | DHCP | WiFi (mDNS) | ⚠️ Không thấy trên VPS |
| Xiaozhi ESP32 | WiFi | WiFi → Cloud → MCP → HA VPS | Voice control |

## 6. Bảo Mật Tổng Hợp

| Tầng | Công cụ | Bảo vệ |
|------|---------|--------|
| **Router** | Nokia Firewall + UPnP OFF | Chặn port scan, chống botnet |
| **IPv6** | TẮT trên cả 3 ZTE | Chống IoT lộ IP công khai, bypass NAT |
| **DNS** | AdGuard Home (N5 Max + VPS) | Chặn malware domains, C2 servers, ads |
| **VPN** | Tailscale (WireGuard) | Mã hóa traffic, private network |
| **VPS** | CrowdSec + Nginx rate limit | Ban brute force, community blocklist |
| **SSH** | Key-only auth | Không brute force password |
| **Web** | Cloudflare Access + Basic Auth | OTP cho Webtop, auth cho ESXi |
| **IoT** | DNS Sinkhole | Chặn thiết bị "gọi điện" về server lạ |

## 7. Troubleshooting Thường Gặp

| Vấn đề | Nguyên nhân | Giải pháp |
|--------|-------------|-----------|
| **Mạng chậm / chập chờn** | MacBook bắt nhầm 2.4G hoặc bám sóng cục xa | Kiểm tra kết nối đúng `Wifi-5G`, hạ TX power ZTE |
| **Không vào được router** | Header sai khi truy cập từ xa | Dùng proxy `http://100.91.8.9:8881` |
| **N5 Max mất mạng** | Card LAN chết (PHY quá tải) | Cold boot (rút điện hoàn toàn, không `sudo reboot`) |
| **Thiết bị nhận IP 10.53.x.x** | Cắm nhầm vào modem VNPT | Cắm vào Nokia router thay vì modem |
| **DNS không resolve** | N5 Max sập hoặc đổi IP | Kiểm tra `192.168.1.108`, fallback `1.1.1.1` |
| **Phone bám sóng tầng khác** | Sticky Client | Hạ TX power ZTE về "Tiêu chuẩn", kiểm tra MESH đã bật |
| **MESH Agent (.40) tắt WiFi** | Firmware V1.0.4 ở chế độ "Đại lý" | Đổi .40 làm Main Controller (firmware mới nhất phải làm Main) |
| **MESH không thấy 1 cục** | 2 cục cùng set Main → xung đột | Chỉ 1 cục làm Main, còn lại Agent hoặc tự động |

## Related Docs

- [ORACLE_VPS.md](./ORACLE_VPS.md) — VPS services, Nginx, domain, security
- [MAGICSEE_N5_MAX_ARMBIAN.md](./MAGICSEE_N5_MAX_ARMBIAN.md) — N5 Max setup, HA Slave, AdGuard Local
- [HOME_ASSISTANT.md](./HOME_ASSISTANT.md) — Master-Slave HA architecture
- [HOME_SERVER.md](./HOME_SERVER.md) — HP home server
- [ALPINE_VM.md](./ALPINE_VM.md) — ESXi Alpine VM, subnet router
- [ADGUARD.md](./ADGUARD.md) — DNS ad blocker
- [RUSTDESK_SETUP.md](./RUSTDESK_SETUP.md) — Remote desktop setup
- [ESXI_BACKUP.md](./ESXI_BACKUP.md) — ESXi automated VM backup configuration (ghettoVCB)
