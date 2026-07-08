# Cloudflare R2 — Video Storage

## Tại sao dùng R2?

Trước đây video (TikTok reels, Facebook reels) được upload lên **MinIO** self-hosted trên Ubuntu qua Cloudflare Tunnel. Gặp nhiều vấn đề:

- **Upload chậm**: iPhone → Cloudflare Tunnel → Local Ubuntu → MinIO, tốn rất nhiều thời gian cho video 50-100MB
- **"Load Failed" trên iOS**: file lớn hay bị timeout/ngắt kết nối
- **Phụ thuộc máy local**: máy tắt = storage tắt

**Cloudflare R2** giải quyết hết:

| So sánh | MinIO (cũ) | Cloudflare R2 |
|---------|-----------|---------------|
| Upload speed | Chậm (qua tunnel) | Nhanh (edge CDN) |
| Availability | Phụ thuộc máy local | 99.99% uptime |
| Free tier | Tự host | 10GB storage, 1M writes, 10M reads/tháng |
| Egress | Tự chịu bandwidth | **Miễn phí hoàn toàn** |
| S3 compatible | ✅ | ✅ |

> **Quan trọng**: Storage tính theo file **đang tồn tại**, không phải tổng đã upload. Upload 5GB → xoá 3GB → chỉ tính 2GB.

## Thông tin R2 Bucket

- **Bucket**: `tiktok-videos`
- **Region**: Asia-Pacific (APAC)
- **Account ID**: `86e360ccbc27091bef0e3259aa79f737`
- **S3 Endpoint**: `https://86e360ccbc27091bef0e3259aa79f737.r2.cloudflarestorage.com`
- **Public URL**: `https://pub-105b411e9219481986379bfce642a4ae.r2.dev`
- **Dashboard**: [https://dash.cloudflare.com/86e360ccbc27091bef0e3259aa79f737/r2/default/buckets/tiktok-videos](https://dash.cloudflare.com/86e360ccbc27091bef0e3259aa79f737/r2/default/buckets/tiktok-videos)

## Env vars (`.env.local`)

```bash
# Cloudflare R2
R2_ACCOUNT_ID=86e360ccbc27091bef0e3259aa79f737
R2_ACCESS_KEY_ID=<secret>
R2_SECRET_ACCESS_KEY=<secret>
R2_BUCKET_NAME=tiktok-videos
NEXT_PUBLIC_R2_PUBLIC_URL=https://pub-105b411e9219481986379bfce642a4ae.r2.dev
```

> `R2_ACCESS_KEY_ID` và `R2_SECRET_ACCESS_KEY` **KHÔNG** có prefix `NEXT_PUBLIC_` vì đây là secrets chỉ dùng server-side. `NEXT_PUBLIC_R2_PUBLIC_URL` cần prefix vì browser cần URL này để hiển thị video.

## Kiến trúc

```
Browser (iPhone/PC)
  │
  ├─ POST /api/r2-video ──→ Next.js API Route ──→ R2 (presigned PUT URL)
  │                                                    │
  ├─ PUT presignedUrl ─────────────────────────────────→ R2 (upload trực tiếp)
  │
  └─ GET pub-xxx.r2.dev/filename ──────────────────────→ R2 (public read)
```

1. **Client** gọi `/api/r2-video` (POST) với `fileName` và `bucketName`
2. **API Route** dùng `minio` npm client (S3-compatible) tạo presigned PUT URL
3. **Client** PUT file trực tiếp lên R2 qua presigned URL (không qua server)
4. **Public URL** = `NEXT_PUBLIC_R2_PUBLIC_URL + "/" + objectName`

## Code structure

| File | Vai trò |
|------|---------|
| `src/utils/r2Upload.ts` | Client-side upload/delete utilities |
| `src/app/(admin)/api/r2-video/route.ts` | API route: presigned URL + delete |
| `src/app/(admin)/api/tiktok-scheduled-posts/route.ts` | DELETE handler: cleanup R2 khi xoá scheduled post |
| `src/utils/constants.ts` | R2 env var exports |

## Cách thêm bucket mới

1. Tạo bucket trên [R2 Dashboard](https://dash.cloudflare.com)
2. Bật **Public Development URL** trong bucket Settings
3. Thêm **CORS Policy**:
   ```json
   [{
     "AllowedOrigins": ["*"],
     "AllowedMethods": ["GET", "PUT", "HEAD"],
     "AllowedHeaders": ["*"],
     "MaxAgeSeconds": 3600
   }]
   ```
4. API token đã có (Object Read & Write) nên không cần tạo mới nếu scope = All buckets

## Cách dùng trong code

### Upload video
```typescript
import { uploadVideoToR2 } from '@/utils/r2Upload'

const result = await uploadVideoToR2(file, 'tiktok-videos', (percent) => {
    console.log(`Upload: ${percent}%`)
})

if (result.success) {
    console.log('URL:', result.url) // https://pub-xxx.r2.dev/reel-xxx-filename.mp4
    console.log('File:', result.fileName) // reel-xxx-filename.mp4
}
```

### Delete video
```typescript
import { deleteVideoFromR2 } from '@/utils/r2Upload'

const result = await deleteVideoFromR2('reel-xxx-filename.mp4', 'tiktok-videos')
```

## Free tier limits

| Resource | Free | Ghi chú |
|----------|------|---------|
| Storage | 10 GB/tháng | Chỉ tính file đang tồn tại |
| Class A (write) | 1M requests/tháng | PUT, POST, LIST |
| Class B (read) | 10M requests/tháng | GET, HEAD |
| Egress | **Miễn phí** | Không giới hạn bandwidth |

Với flow upload → đăng → xoá, storage xoay vòng liên tục, rất khó vượt 10GB.
