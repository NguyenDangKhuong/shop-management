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
| `order` | Number | ❌ | Thứ tự sắp xếp |

**Collection:** `prompts`

> [!IMPORTANT]
> **`referenceImages` đã được chuyển sang AutoFlow model** — Xem [AUTOFLOW.md](AUTOFLOW.md). Reference images là per-product (ảnh sản phẩm + ảnh mẫu), không phải per-prompt, nên đặt ở AutoFlow hợp lý hơn.

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
  "subPrompt": "..."
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

**Form fields:** Tiêu đề, **Loại prompt** (select: Hook / Describe), Nội dung (max 90 từ), **Sub Prompt** (text, optional)

### PromptSection (`src/components/shop/tiktok-accounts/PromptSection.tsx`)

Component tự chứa prompt list + PromptModal. Handlers (add, edit, delete, duplicate, copy) nằm trong component.

| Prop | Type | Mô tả |
|------|------|-------|
| `allPrompts` | `any[]` | Danh sách prompt |
| `promptsLoading` | `boolean` | Trạng thái loading |
| `onRefresh` | `fn` | Callback fetchPrompts |
| `onAutoFlowRefresh` | `fn` | Callback fetchAutoFlows |

> [!NOTE]
> **Lazy Load** — Prompt data chỉ fetch lần đầu khi expand section (hoặc khi mở AutoFlowModal). `useRef` flag ngăn fetch trùng lặp.

> [!NOTE]
> **Reference Images** đã chuyển sang **AutoFlowModal** — chọn 1 lần ở AutoFlow, tất cả prompts dùng chung.

---

## 🎬 Veo3 Video Prompt Templates

### Reference Images

Mỗi prompt `describe` sử dụng 2 reference images (đặt ở **AutoFlow**, không phải ở Prompt):

| Ref | Nội dung | ImageUsageType | Mục đích |
|-----|----------|----------------|----------|
| **Image 1** | PNG sản phẩm (product photo, không có người) | `IMAGE_USAGE_TYPE_ASSET` | Mẫu sẽ mặc chính xác sản phẩm này |
| **Image 2** | Hình mẫu (người mẫu đã tạo) | `IMAGE_USAGE_TYPE_ASSET` | Giữ khuôn mặt/dáng người này |

### Coverage Rules theo loại sản phẩm

| Loại | Constant | Focus |
|------|----------|-------|
| 👗 **Nguyên bộ** | `OUTFIT_COVERAGE` + `OUTFIT_DETAILS` | Full body: neckline → hem → pants/skirt |
| 👕 **Áo** | `TOP_COVERAGE` + `TOP_DETAILS` | Upper body: neckline, collar, sleeve, hem |
| 👖 **Quần/Váy** | `BOTTOM_COVERAGE` + `BOTTOM_DETAILS` | Lower body: waist, leg width, length, fit |

---

### 👗 Nguyên bộ (Prompt 1–3)

#### Prompt 1 — Mirror selfie che mặt

> Camera zoom in/out show toàn bộ outfit. Dùng `OUTFIT_COVERAGE` + `OUTFIT_DETAILS`.

#### Prompt 2 — Tay chạm show vải che mặt

> Tay chạm vải ở eo, kéo xuống hem, pinch fabric. Dùng `OUTFIT_COVERAGE` + `OUTFIT_DETAILS`.

#### Prompt 3 — Nghiêng nhẹ show dáng che mặt

> Xoay người trái/phải show outfit từ nhiều góc. Dùng `OUTFIT_COVERAGE` + `OUTFIT_DETAILS`.

---

### 👕 Áo (Prompt 4–6)

#### Prompt 4 — Áo — Mirror selfie che mặt

> Camera zoom vào upper body, show neckline details, sleeve design, fabric texture, fit. Dùng `TOP_COVERAGE` + `TOP_DETAILS`.

#### Prompt 5 — Áo — Tay chạm show vải che mặt

> Tay chạm collar, slide xuống sleeve, pinch fabric, adjust hem of top. Dùng `TOP_COVERAGE` + `TOP_DETAILS`.

#### Prompt 6 — Áo — Nghiêng nhẹ show dáng che mặt

> Xoay upper body trái/phải show sleeve shape, side seam, back silhouette. Dùng `TOP_COVERAGE` + `TOP_DETAILS`.

---

### 👖 Quần/Váy (Prompt 7–9)

#### Prompt 7 — Quần/Váy — Mirror selfie che mặt

> Camera frame lower body, show waist fit, leg silhouette, fabric drape, hem length. Dùng `BOTTOM_COVERAGE` + `BOTTOM_DETAILS`.

#### Prompt 8 — Quần/Váy — Tay chạm show vải che mặt

> Tay chạm vải ở đùi, slide dọc ống, pinch fabric ở đầu gối, show waistband fit. Dùng `BOTTOM_COVERAGE` + `BOTTOM_DETAILS`.

#### Prompt 9 — Quần/Váy — Nghiêng nhẹ show dáng che mặt

> Xoay hông trái/phải show leg line, side seam, back pocket, rear silhouette. Dùng `BOTTOM_COVERAGE` + `BOTTOM_DETAILS`.

---

### Sub Prompt (dùng chung cho cả 9 fashion prompts)

> Dùng `[POSE]` + `[BACKGROUND]` → Sub Prompt tự random mỗi lần gọi. Xem chi tiết trong `seed-prompts.ts`.

### Design Notes

> [!CAUTION]
> **Coverage (HIGHEST PRIORITY)** — Đặt `CRITICAL RULE` ngay **dòng thứ 2** của prompt. Mỗi loại (nguyên bộ/áo/quần) có constant riêng. Coverage phải khớp reference image, không hở bạo.

> [!IMPORTANT]
> **Fidelity** — Dùng `*_DETAILS` constant ngay sau `*_COVERAGE` để AI giữ nguyên 100% sản phẩm.

> [!WARNING]
> **Body shape** — Dùng `"slender figure"` thay vì `"hourglass figure"` để AI không ép eo gây hở.

> [!NOTE]
> - Tất cả 9 fashion prompts đều **che mặt hoàn toàn** bằng điện thoại + có thoại tiếng Việt
> - Không dùng `"no talking"` / `"no speaking"` → gây lỗi `PUBLIC_ERROR_AUDIO_FILTERED`
> - Nội dung đầy đủ xem trong `seed-prompts.ts`

---

## 🔆 Sunset Lamp Prompts (Đèn Hoàng Hôn)

Product video prompts cho sản phẩm đèn chiếu hoàng hôn. Dùng 1 reference image (hình sản phẩm).

### Reference Images

| Ref | Nội dung | ImageUsageType | Mục đích |
|-----|----------|----------------|----------|
| **Image 1** | Hình đèn sản phẩm (product photo) | `IMAGE_USAGE_TYPE_ASSET` | Giữ nguyên 100% thiết kế sản phẩm |

### Prompt 4 — Bật đèn reveal ánh sáng

> A highly detailed cinematic product video showcasing the sunset projection lamp from reference image 1. CRITICAL RULE — The lamp shown in the video MUST be identical to reference image 1 in every detail... The lamp is placed on [SETTING]. The room is dimly lit with soft ambient shadows. All camera movements and hand movements are slow smooth and deliberate... [ACTION]. The warm golden-orange sunset circle is projected on the wall behind... A voice speaks naturally in Vietnamese describing the lamp...

### Prompt 5 — Close-up chất liệu & chi tiết

> A highly detailed cinematic product video... The camera starts with an extreme close-up of the matte black metal base showing the smooth premium finish... [ACTION]. A hand gently tilts the lamp head to a new angle... A voice speaks naturally in Vietnamese highlighting the premium metal build quality...

### Prompt 6 — Không gian & mood lighting

> A highly detailed cinematic product video... The video opens on a dark room with [SETTING]... [ACTION]. The warm golden-orange sunset circle blooms beautifully on the wall... A voice speaks naturally in Vietnamese describing how this one small lamp completely changes the mood of any space...

### Sub Prompt (dùng chung cho Đèn Hoàng Hôn)

> You must replace [SETTING] and [ACTION] with a new unique combination each time this prompt is called.
>
> SETTING options: minimalist bedside table in a modern dark-toned bedroom, wooden shelf in a cozy studio apartment with exposed brick wall, sleek white desk in a clean aesthetic workspace, marble console table in a luxury apartment hallway, low coffee table in a dimly lit living room with soft cushions, floating shelf mounted on a dark grey feature wall, round side table next to a plush velvet armchair
>
> ACTION options: a hand slowly reaches in and turns the lamp on revealing the warm sunset glow gradually filling the wall, the camera slowly orbits around the lamp showing the build quality from multiple angles, a hand gently adjusts the lamp angle tilting the projection beam to a new position on the wall, the camera starts on the warm sunset circle projected on the wall then slowly pulls back to reveal the lamp, fingers lightly trace along the metal stand showing the smooth matte finish, a hand carefully places the lamp on the surface and plugs in the cord then the warm light blooms on the wall, the camera moves from a top-down view slowly descending to eye level revealing the full sunset projection

### Lamp Design Notes

> [!CAUTION]
> **Product fidelity** — `PRODUCT_FIDELITY` constant đặt ngay **dòng thứ 2** sau câu mở đầu. Chỉ dùng `MUST`, `Do NOT`, `highest priority instruction`.

> [!NOTE]
> - Đèn hoàng hôn dùng `[SETTING]` + `[ACTION]` thay vì `[POSE]` + `[BACKGROUND]`
> - Thoại tiếng Việt (giống fashion prompts)
> - Không cần reference image 2 (không có người mẫu)

---

## 🌱 Seed Prompts

File: `scripts/seed-prompts.ts` — chứa toàn bộ prompt templates (9 fashion + 3 lamp). Khi sửa prompt, sửa file này rồi chạy lệnh bên dưới để cập nhật DB.

> [!IMPORTANT]
> Lệnh seed dùng **upsert-by-title** — match prompt theo `title`, update nội dung nếu đã tồn tại, insert nếu mới. Bảo toàn `_id` cho prompt cũ (quan trọng vì AutoFlow tham chiếu qua `promptIds`).

```bash
npx ts-node --compiler-options '{"module":"commonjs"}' -r tsconfig-paths/register scripts/seed-prompts.ts
```

---

## 🧪 Testing

| Test file | Tests |
|-----------|-------|
| `__tests__/PromptModal.test.tsx` | 14 |
| `__tests__/PromptSection.test.tsx` | 8 |

```bash
npx jest --testPathPattern="Prompt"
```

---

*Tài liệu cập nhật: 19/02/2026 — Tách component `PromptSection.tsx`, lazy load on expand*
