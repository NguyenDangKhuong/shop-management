# Flashcard System

## Tổng quan

Hệ thống flashcard hỗ trợ ôn tập interview (288 cards) và algorithm patterns (13 cards).
Dữ liệu lưu trong MongoDB, progress đồng bộ cross-device qua API (cần login).

Hai route riêng biệt nhưng dùng chung shared components:
- `/flashcards` — Interview + Algorithm (tab-based)
- `/vocabulary-flashcards` — Từ vựng từ trang Translate

## Kiến trúc

```
┌──────────────────────┐     ┌─────────────────────┐     ┌──────────────┐
│  FlashcardApp.tsx    │────▶│ /api/flashcards      │────▶│ MongoDB      │
│  (Interview + Algo)  │     │ GET ?type=&topic=    │     │ (flashcards) │
│                      │     └─────────────────────┘     └──────────────┘
│  VocabFlashcardClient│────▶│ /api/vocabulary      │────▶│ (vocabularies)│
│                      │     └─────────────────────┘     └──────────────┘
│                      │
│  Shared: useSwipeDrag│────▶│ /api/flashcards/     │────▶│ (flashcard_  │
│  FlashcardRenderer   │     │ progress GET/PUT     │     │  progress)   │
└──────────────────────┘     └─────────────────────┘     └──────────────┘
```

## Files

| File | Mô tả |
|---|---|
| `src/models/Flashcard.ts` | Mongoose schema cho card data (interview + algo) |
| `src/models/FlashcardProgress.ts` | Per-user known card IDs (algo/interview/vocab) |
| `src/app/api/flashcards/route.ts` | GET — fetch cards, filter by type/topic/difficulty |
| `src/app/api/flashcards/progress/route.ts` | GET/PUT — load/save user progress (auth required) |
| `src/components/flashcards/FlashcardRenderer.tsx` | Shared: useSwipeDrag, FlipCard, Controls, Progress |
| `src/app/flashcards/FlashcardApp.tsx` | Main flashcard page (tabs: Algorithm │ Interview) |
| `src/app/vocabulary-flashcards/VocabFlashcardClient.tsx` | Vocabulary flashcard page |

## Models

### Flashcard

Collection: `flashcards`

```typescript
{
    cardId: string          // Unique ID (VD: "js-hoisting", "hashmap-twosum")
    type: 'interview' | 'algorithm'

    // Interview fields
    question?: string
    answer_vi?: string
    answer_en?: string
    topic?: string          // JavaScript, React, CSS, HTML, Async, OOP...
    difficulty?: string     // Easy, Medium, Hard

    // Algorithm fields
    pattern?: string        // HashMap, Two Pointers, Stack, BFS...
    emoji?: string
    color?: string
    front?: { signal, question }
    back?: { approach, template, complexity, example }
}
```

Indexes: `{ cardId: 1 }` (unique), `{ type: 1, topic: 1 }`

### FlashcardProgress

Collection: `flashcard_progress`

```typescript
{
    userId: string          // From NextAuth session
    algoKnown: string[]     // Algorithm cardIds user marked as known
    interviewKnown: string[]
    vocabKnown: string[]    // Vocabulary _id strings
}
```

Index: `{ userId: 1 }` (unique)

## API Endpoints

### `GET /api/flashcards`

Fetch cards với optional filters.

```
GET /api/flashcards?type=interview&topic=React&difficulty=Medium
```

Response: `{ cards: [...] }`

### `GET /api/flashcards/progress`

Load user progress. **Auth required.**

Response: `{ algoKnown: [...], interviewKnown: [...], vocabKnown: [...] }`

### `PUT /api/flashcards/progress`

Toggle known status. **Auth required.**

```json
{ "category": "interview", "cardId": "js-hoisting", "known": true }
```

Uses `$addToSet` / `$pull` for atomic MongoDB operations.

## Shared Components (`FlashcardRenderer.tsx`)

| Export | Type | Mô tả |
|---|---|---|
| `useSwipeDrag` | Hook | Tinder-style drag physics + fly-out animation |
| `useFlashcardKeys` | Hook | Keyboard shortcuts (Space, ←→, H/L, S, K) |
| `useProgressSync` | Hook | Load/save progress qua API |
| `FlashcardProgressBar` | Component | Gradient progress bar |
| `SwipeIndicators` | Component | Green/red glow khi kéo |
| `CardStackBg` | Component | Stack effect (2-3 cards phía sau) |
| `FlashcardControls` | Component | Tinder-style buttons (❌ 🔄 ✅) |
| `FlipCard` | Component | 3D flip animation wrapper |
| `KeyboardHints` | Component | Keyboard shortcut hints |

## UI Controls

| Nút | Phím tắt | Chức năng |
|---|---|---|
| ◀ Trước / Sau ▶ | ←→ | Chuyển thẻ (không đánh dấu) |
| ❌ | H | Skip (qua card tiếp, không đánh dấu thuộc) |
| ✅ | L | Đã thuộc + qua card tiếp |
| 🔄 | Space/Enter | Lật thẻ |
| 🎲 | S | Trộn thứ tự |
| 🧠/💭 | K | Toggle đã thuộc (không skip) |
| 🗑️ Reset | — | Xóa tất cả progress |

> **Lưu ý:** Arrow keys chỉ chuyển thẻ, KHÔNG đánh dấu thuộc. Dùng H/L để swipe skip/thuộc.

Last updated: 2025-03-22

## Data Seeding

Dữ liệu gốc từ `interviewFlashcards.ts` (đã xóa). Seed qua temp API endpoint:

```bash
# 1. Tạo temp seed endpoint (/api/flashcards/seed)
# 2. Push + deploy
# 3. curl -X POST <url>/api/flashcards/seed -H "Content-Type: application/json" -d @data.json
# 4. Xóa seed endpoint + push lại
```

**Lưu ý:** File gốc có 318 entries nhưng 30 duplicate IDs → DB chứa 288 unique interview cards.
