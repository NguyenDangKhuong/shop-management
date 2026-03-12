# 🌐 Hướng dẫn đổi domain (thetaphoa.store → domain mới)

## Checklist tổng quan

- [ ] Mua domain mới + thêm vào Cloudflare
- [ ] Cập nhật DNS records
- [ ] Cập nhật Zero Trust Tunnel
- [ ] Cập nhật Cloudflare Worker (video proxy)
- [ ] Cập nhật code (1 dòng)
- [ ] Cập nhật `.env` / `.env.local`
- [ ] Redeploy

---

## 1. Cloudflare — Thêm domain mới

1. Vào [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Add a site** → nhập domain mới
2. Chọn plan **Free**
3. Cloudflare sẽ cho 2 nameservers → cập nhật ở nhà đăng ký domain (registrar)

## 2. Cloudflare — DNS Records

Tạo lại các DNS records giống domain cũ. Tất cả đều là **Proxied** (☁️ orange cloud):

| Type | Name | Target | Proxy |
|------|------|--------|-------|
| CNAME | `shop` | Tunnel ID `.cfargotunnel.com` | ✅ |
| CNAME | `api` | Tunnel ID `.cfargotunnel.com` | ✅ |
| CNAME | `n8n` | Tunnel ID `.cfargotunnel.com` | ✅ |
| CNAME | `s3` | Tunnel ID `.cfargotunnel.com` | ✅ |

> 💡 Tunnel ID lấy từ **Zero Trust → Networks → Tunnels** → click tunnel → xem Tunnel ID

## 3. Cloudflare Zero Trust — Tunnel

1. Vào [Zero Trust Dashboard](https://one.dash.cloudflare.com/) → **Networks → Tunnels**
2. Click tunnel đang dùng → **Public Hostname** tab
3. Sửa từng hostname:

| Cũ | Mới |
|----|-----|
| `shop.thetaphoa.store` | `shop.newdomain.com` |
| `api.thetaphoa.store` | `api.newdomain.com` |
| `n8n.thetaphoa.store` | `n8n.newdomain.com` |
| `s3.thetaphoa.store` | `s3.newdomain.com` |

4. Nếu có **Access Policies** (bảo vệ n8n, admin) → vào **Access → Applications** → update domain

> ⚠️ **Không cần sửa gì trên server** — `cloudflared` connector vẫn dùng cùng tunnel, chỉ đổi hostname trên dashboard.

## 4. Cloudflare Worker — Video Proxy

Sửa file `cloudflare-video-proxy/src/worker.ts`:

```diff
 const CORS_ORIGINS = [
-    'https://shop.thetaphoa.store',
+    'https://shop.newdomain.com',
     'http://localhost:3000',
 ]
```

Deploy lại:

```bash
cd cloudflare-video-proxy
npx wrangler deploy
```

## 5. Code — constants.ts

Sửa 1 dòng trong `src/utils/constants.ts`:

```diff
-export const SITE_DOMAIN = 'shop.thetaphoa.store'
+export const SITE_DOMAIN = 'shop.newdomain.com'
```

## 6. Environment — .env.local

Cập nhật các biến có chứa domain cũ:

```bash
NEXT_PUBLIC_SITE_URL=https://shop.newdomain.com
NEXT_PUBLIC_R2_PUBLIC_URL=https://s3.newdomain.com
```

## 7. Redeploy

```bash
# Build + deploy lại app
git add -A && git commit -m "chore: migrate domain to newdomain.com"
git push
```

---

## Tóm tắt thời gian

| Bước | Thời gian |
|------|-----------|
| DNS + Tunnel | ~10 phút |
| Worker + Code | ~5 phút |
| DNS propagation | 5-30 phút |
| **Tổng** | **~30 phút** |
