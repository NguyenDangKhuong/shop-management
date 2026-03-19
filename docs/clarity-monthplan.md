# Clarity Month Plan Feature

## Tổng quan

Trang `/clarity` là công cụ lập kế hoạch tháng cá nhân. Gồm 5 section: mục tiêu tháng, habit tracker, mục tiêu tuần, task hàng ngày, và reflection cuối tháng. Data auto-save vào MongoDB.

## Kiến trúc

```
┌─────────────────┐     ┌──────────────────┐     ┌────────────────────┐
│  ClarityClient  │────▶│ /api/clarity     │────▶│ MongoDB            │
│  (React client) │     │ GET/PUT/DELETE    │     │ (monthplans)       │
│                 │     └──────────────────┘     └────────────────────┘
│  5 Tabs:        │
│  🎯 Goals       │  Auto-save: debounce 1s → PUT /api/clarity
│  🔁 Habits      │  Month navigation: ← →
│  📅 Weekly      │  1 document per month (key: "2026-03")
│  ✅ Daily Tasks │
│  💭 Reflection  │
└─────────────────┘
```

## Files

| File | Mô tả |
|---|---|
| `src/app/clarity/page.tsx` | Server page (metadata SEO) |
| `src/app/clarity/ClarityClient.tsx` | Client component (UI + logic) |
| `src/app/api/clarity/route.ts` | CRUD API cho month plan |
| `src/models/MonthPlan.ts` | Mongoose schema |
| `src/app/api/clarity/__tests__/route.test.ts` | API tests (11 tests) |
| `src/app/clarity/__tests__/ClarityClient.test.tsx` | Component tests (10 tests) |

## Model: MonthPlan

```typescript
{
    month: string              // "2026-03" — unique key
    goals: [{
        text: string           // Nội dung mục tiêu
        progress: number       // 0-100
        color: string          // Hex color (#3b82f6)
    }]
    habits: [{
        name: string           // Tên thói quen
        days: boolean[31]      // Tick mỗi ngày
    }]
    weeks: [{
        weekNumber: number     // 1-5
        goals: string[]        // Mục tiêu tuần
        reflection: string     // Reflection cuối tuần
    }]
    dailyTasks: [{
        date: string           // "2026-03-15"
        tasks: [{ text: string, done: boolean }]
        notes: string
    }]
    monthReflection: {
        wentWell: string
        improve: string
        grateful: string
        rating: number         // 1-10
    }
    createdAt: Date
    updatedAt: Date
}
```

Collection: `monthplans`

## API Endpoints

### `GET /api/clarity?month=2026-03`
Lấy plan theo tháng. Nếu chưa có → tạo mới với template mặc định (3 goals, 1 habit, 4-5 weeks).

### `PUT /api/clarity`
Auto-save plan (gọi từ frontend mỗi 1s sau khi user thay đổi data).

```json
// Request body: full plan object
{
    "month": "2026-03",
    "goals": [...],
    "habits": [...],
    "weeks": [...],
    "dailyTasks": [...],
    "monthReflection": {...}
}

// Response
{ "success": true, "plan": {...} }
```

### `DELETE /api/clarity?month=2026-03`
Xóa plan (reset tháng).

## UI Flow

1. Mở `/clarity` → fetch plan cho tháng hiện tại (GET)
2. Nếu chưa có plan → API tự tạo template mặc định
3. User thêm mục tiêu, tick habit, viết task, reflection → debounce 1s → auto PUT
4. Bấm ← → để chuyển tháng, bấm "Hôm nay" để quay về tháng hiện tại
5. Thanh progress tổng = trung bình progress các goals

## 5 Tabs

| Tab | Chức năng |
|---|---|
| 🎯 Mục tiêu | 3-5 goals với thanh progress kéo 0-100%, mỗi goal 1 màu |
| 🔁 Thói quen | Grid: hàng = habit, cột = ngày (1-31), click tick/untick, % completion |
| 📅 Tuần | Sub-tabs tuần 1-5, mỗi tuần có goals + reflection textarea |
| ✅ Task | Chọn ngày → danh sách task (checkbox) + notes, dot indicator cho ngày có task |
| 💭 Reflection | 3 textarea (went well / improve / grateful) + rating 1-10 bấm chọn |

## Tests

```bash
# Chạy tests cho clarity
npx jest --testPathPattern='clarity' --verbose

# Kết quả: 21 passed (11 API + 10 component)
```
