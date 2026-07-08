# Translate & Vocabulary Feature

## Tổng quan

Trang `/translate` cho phép dịch tiếng Việt ↔ tiếng Anh sử dụng AI (Gemini 2.5 Flash qua CLI proxy).
User có thể **lưu từ vựng** (bookmark) để ôn tập sau.

## Kiến trúc

```
┌─────────────────┐     ┌──────────────────┐     ┌────────────────────┐
│  TranslateClient │────▶│ /api/translate    │────▶│ CLI Proxy (Gemini) │
│  (React client)  │     └──────────────────┘     └────────────────────┘
│                  │
│  🔖 Bookmark     │────▶│ /api/vocabulary   │────▶│ MongoDB            │
│  📋 Saved list   │     │ GET/POST/DELETE   │     │ (vocabularies)     │
└─────────────────┘     └──────────────────┘     └────────────────────┘
```

## Files

| File | Mô tả |
|---|---|
| `src/app/translate/page.tsx` | Server page (metadata SEO) |
| `src/app/translate/TranslateClient.tsx` | Client component (UI + logic) |
| `src/app/api/translate/route.ts` | API proxy → CLI proxy (Gemini) |
| `src/app/api/vocabulary/route.ts` | CRUD API cho từ vựng |
| `src/models/Vocabulary.ts` | Mongoose schema |

## Model: Vocabulary

```typescript
{
    original: string      // Văn bản gốc (VD: "Xin chào")
    translated: string    // Bản dịch (VD: "Hello")
    from: 'vi' | 'en'     // Ngôn ngữ gốc
    to: 'vi' | 'en'       // Ngôn ngữ đích
    createdAt: Date        // Tự động
    updatedAt: Date        // Tự động
}
```

Collection: `vocabularies`

## API Endpoints

### `POST /api/translate`
Dịch text qua CLI proxy.

```json
// Request
{ "text": "Xin chào", "from": "vi", "to": "en" }

// Response
{ "translated": "Hello" }
```

### `GET /api/vocabulary?limit=50&skip=0`
Lấy danh sách từ đã lưu (mới nhất trước).

### `POST /api/vocabulary`
Lưu từ vựng mới.

```json
// Request
{ "original": "Xin chào", "translated": "Hello", "from": "vi", "to": "en" }

// Response
{ "success": true, "item": { "_id": "...", ... } }
```

### `DELETE /api/vocabulary?id=xxx`
Xóa từ vựng.

## Env vars cần thiết

```env
CLI_PROXY_URL=https://cli-proxy.thetaphoa.store/v1/chat/completions
CLI_PROXY_API_KEY=<key>
```

## UI Flow

1. User gõ text → debounce 800ms → tự dịch
2. Bấm ⇄ → swap ngôn ngữ (input ↔ output)
3. Bấm 🔖 Save → lưu vào MongoDB → hiện trong list bên dưới
4. Bấm ✕ trên item → xóa khỏi MongoDB
5. Bấm 📋 Copy → copy bản dịch vào clipboard
