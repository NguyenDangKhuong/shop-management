# 📝 Prompt Library

## 📋 Tổng quan

Prompt Library là thư viện prompt **độc lập**, quản lý riêng biệt theo từng TikTok Account. AutoFlow tham chiếu prompt qua `promptIds`.

> [!IMPORTANT]
> Prompt **không** thuộc về AutoFlow nào. Xóa AutoFlow **không** xóa prompt. Xem [AUTOFLOW.md](AUTOFLOW.md) để biết cách AutoFlow tham chiếu prompt.

---

## 🗄️ Database Model (`src/models/Prompt.ts`)

| Field | Type | Required | Mô tả |
|-------|------|----------|-------|
| `accountId` | String | ✅ | ID của TikTok Account |
| `title` | String | ✅ | Tiêu đề prompt |
| `content` | String | ✅ | Nội dung prompt (max 90 từ) |
| `type` | String | ❌ | Loại prompt: `hook` \| `describe` (default: `describe`) |
| `subPrompt` | String | ❌ | Nội dung sub-prompt bổ sung |
| `referenceImages` | Array | ❌ | Mảng reference images (chỉ dùng cho `describe`). Mỗi item: `{ imageUsageType, mediaId }` |
| `order` | Number | ❌ | Thứ tự sắp xếp |

**Collection:** `prompts`

> [!IMPORTANT]
> **`referenceImages` subdocument có `_id: false`** — Mongoose mặc định tự thêm `_id` vào mỗi item trong array subdocument, nhưng field này không cần thiết vì:
> - Tất cả CRUD operations (GET/POST/PUT/DELETE) đều thao tác trên Prompt document chính qua `prompt._id`
> - Mỗi reference image được xác định bằng `mediaId` (unique từ Veo3 Media), không cần `_id` riêng
> - Loại bỏ `_id` giúp API response sạch hơn, đặc biệt khi tích hợp với n8n workflows

---

## 🔌 API Endpoints (`/api/prompts`)

#### GET — Lấy danh sách Prompt

```
GET /api/prompts?accountId={accountId}
```

#### POST — Tạo Prompt

```json
POST /api/prompts
{
  "accountId": "...",
  "title": "...",
  "content": "...",
  "subPrompt": "...",
  "referenceImages": [
    { "imageUsageType": "IMAGE_USAGE_TYPE_ASSET", "mediaId": "CAMaJGJm..." }
  ]
}
```

#### PUT — Cập nhật Prompt

```json
PUT /api/prompts
{ "id": "prompt_id", "title": "...", "content": "..." }
```

#### DELETE — Xóa Prompt

```
DELETE /api/prompts?id={promptId}
```

---

## 🖥️ UI — PromptModal (`src/components/shop/tiktok-accounts/PromptModal.tsx`)

| Prop | Type | Mô tả |
|------|------|-------|
| `isOpen` / `setIsOpen` | `boolean` / `fn` | Đóng/mở modal |
| `accountId` | `string` | ID tài khoản |
| `editingPrompt` | `any` | Prompt đang sửa (null = tạo mới) |
| `onRefresh` | `fn` | Callback refresh |
| `veo3Media` | `any[]` | Veo3 Media (dropdown chọn referenceImages) |

**Form fields:** Tiêu đề, **Loại prompt** (select: Hook / Describe), **Reference Images** (multi-select từ Veo3, chỉ hiện khi type=describe), Nội dung (max 90 từ), **Sub Prompt** (text, optional)

---

## 🎬 Veo3 Video Prompt Templates

### Reference Images

Mỗi prompt `describe` sử dụng 2 reference images:

| Ref | Nội dung | ImageUsageType | Mục đích |
|-----|----------|----------------|----------|
| **Image 1** | PNG bộ đồ (product photo, không có người) | `IMAGE_USAGE_TYPE_ASSET` | Mẫu sẽ mặc chính xác bộ đồ này |
| **Image 2** | Hình mẫu (người mẫu đã tạo) | `IMAGE_USAGE_TYPE_ASSET` | Giữ khuôn mặt/dáng người này |

### Prompt 1 — Mirror selfie cam gần xa

> A highly detailed cinematic video of the fashion model shown in reference image 2. She has luminous snow-white porcelain skin, Douyin goddess aesthetic, long silky black hair with soft natural waves, wearing stylish feminine thin gold-framed round glasses. She has an elegant hourglass figure with extremely long slender legs. She must be wearing the identical outfit from reference image 1 preserving every detail including exact color exact pattern exact fabric texture exact neckline exact sleeve length exact fit and exact silhouette as shown in the product photo. Do not alter modify or reinterpret any part of the clothing. She is standing [POSE] in front of a full-length mirror in a [BACKGROUND]. Soft golden morning sunlight streaming through sheer white curtains creating warm natural light and gentle shadows. She is holding an orange iPhone 17 Pro Max recording a mirror selfie video. The phone camera angle moves naturally closer to show the outfit fabric texture and details then slowly pulls back to reveal her full body silhouette and long legs like a real person filming themselves. She speaks naturally in Vietnamese describing the outfit she is wearing with a warm friendly tone like a real KOL selling fashion on livestream. No text no captions no animals. Ultra-realistic natural handheld phone movement. Shallow depth of field with model in sharp focus. Fashion editorial cinematic color grading

### Prompt 2 — Tay chạm show vải (không chào)

> A highly detailed cinematic video of the fashion model shown in reference image 2. She has luminous snow-white porcelain skin, Douyin goddess aesthetic, long silky black hair with soft natural waves, wearing stylish feminine thin gold-framed round glasses. She has an elegant hourglass figure with extremely long slender legs. She must be wearing the identical outfit from reference image 1 preserving every detail including exact color exact pattern exact fabric texture exact neckline exact sleeve length exact fit and exact silhouette as shown in the product photo. Do not alter modify or reinterpret any part of the clothing. She is standing [POSE] in front of a full-length mirror in a [BACKGROUND]. Soft golden morning sunlight streaming through sheer white curtains creating warm natural light. She is holding an orange iPhone 17 Pro Max in one hand recording herself. Her free hand gently touches the fabric at her waist showing the smooth quality material then slides down to lightly adjust the hem showing the fit and texture of the outfit. She pinches the fabric slightly between her fingers highlighting the softness and drape of the material. She speaks naturally in Vietnamese without greeting or saying hello just directly describing the fabric quality and how the outfit fits her body with a confident casual tone. No text no captions no animals. Ultra-realistic natural handheld phone movement. Shallow depth of field. Fashion editorial cinematic color grading

### Prompt 3 — Nghiêng nhẹ show dáng (không chào)

> A highly detailed cinematic video of the fashion model shown in reference image 2. She has luminous snow-white porcelain skin, Douyin goddess aesthetic, long silky black hair with soft natural waves, wearing stylish feminine thin gold-framed round glasses. She has an elegant hourglass figure with extremely long slender legs. She must be wearing the identical outfit from reference image 1 preserving every detail including exact color exact pattern exact fabric texture exact neckline exact sleeve length exact fit and exact silhouette as shown in the product photo. Do not alter modify or reinterpret any part of the clothing. She is standing [POSE] in front of a full-length mirror in a [BACKGROUND]. Soft golden morning sunlight streaming through sheer white curtains creating warm natural light and gentle shadows. She is holding an orange iPhone 17 Pro Max recording. She subtly shifts her weight and sways her body gently to the left showing the outfit from a slight side angle then back to center then gently to the right revealing the other side. One hand rests naturally on her hip then moves to touch her collar. She speaks naturally in Vietnamese without greeting or saying hello just casually commenting on the outfit details and how it looks from different angles with a sweet relaxed voice. No text no captions no animals. Ultra-realistic natural handheld phone movement. Shallow depth of field with model in sharp focus. Fashion editorial cinematic color grading

### Sub Prompt (dùng chung cho cả 3)

> You must replace [POSE] and [BACKGROUND] with a new unique combination each time this prompt is called. Never repeat the same combination twice. Choose naturally from these options and feel free to create new variations that match the style.
>
> POSE options: standing straight with arms relaxed at sides, one hand resting on hip, one hand lightly touching collar, both hands adjusting hem of outfit, one hand holding hair behind ear, arms crossed casually under chest, one hand touching the mirror frame leaning slightly, hands clasped in front of waist, one hand on waist one hand relaxed, fingers lightly brushing the fabric at thigh level
>
> BACKGROUND options: grey and white modern Vietnamese bedroom with large glass-door wardrobe closet displaying designer clothes shoes and handbags, minimalist cream toned room with full length mirror and wooden clothing rack, luxury apartment hallway with marble floor and soft wall sconces, bright white studio with large window and sheer curtains with simple floating shelf, modern walk-in closet with LED lit shelves filled with shoes bags and folded clothes, cozy beige bedroom with rattan chair potted plants and natural textures, sleek grey bathroom with large vanity mirror and marble countertop
>
> Pick one POSE and one BACKGROUND randomly and insert them naturally into the main prompt. The result must read as one seamless paragraph with no brackets or placeholder markers remaining.
>
> IMPORTANT: Output ONLY the final completed prompt text. Do not include any thinking, explanation, reasoning, commentary, notes, or additional text. Return nothing but the raw prompt ready to use.

### Design Notes

> [!IMPORTANT]
> **Outfit fidelity** — Dùng `"must be wearing the identical outfit from reference image 1 preserving every detail including exact color exact pattern exact fabric texture exact neckline exact sleeve length exact fit and exact silhouette"` + `"Do not alter modify or reinterpret"` để AI giữ nguyên 100% bộ đồ.

> [!NOTE]
> - **Prompt 1** mẫu chào + giới thiệu (KOL style)
> - **Prompt 2 & 3** không chào, nói thẳng vào nội dung tránh lặp
> - Không dùng `"no talking"` / `"no speaking"` → gây lỗi `PUBLIC_ERROR_AUDIO_FILTERED`
> - Dùng placeholder `[POSE]` + `[BACKGROUND]` → Sub Prompt tự random mỗi lần gọi

---

## 🧪 Testing

Test file: `src/components/shop/tiktok-accounts/__tests__/PromptModal.test.tsx` — 14 tests

```bash
npx jest --testPathPattern="PromptModal"
```

---

*Tài liệu cập nhật: 15/02/2026*
