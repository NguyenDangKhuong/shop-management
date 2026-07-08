# LeetCode Playground

Last updated: 2025-03-22

## Tổng quan

Interactive LeetCode playground tại `/leetcode`. Viết code JavaScript trực tiếp trong Monaco Editor, chạy test cases trong sandbox iframe.

## Files

| File | Mô tả |
|---|---|
| `src/app/leetcode/page.tsx` | Page wrapper (metadata) |
| `src/app/leetcode/LeetCodePlayground.tsx` | Main UI: sidebar, editor, test runner |
| `src/app/leetcode/problems.ts` | Data: tất cả problems, types, test cases |

## Categories (10)

| Category | Emoji | Số bài | Mô tả |
|---|---|---|---|
| Two Pointers | 👉 | 10 | Left/right pointer, slow/fast |
| Sliding Window | 🪟 | 9 | Fixed/variable window |
| BFS / DFS | 🌲 | 11 | Tree, graph traversal |
| Binary Search | 🔍 | 8 | Sorted arrays, search space |
| Dynamic Programming | 📊 | 10 | Memoization, tabulation |
| Backtracking | 🔙 | 8 | Permutations, combinations |
| Stack | 📚 | 7 | Monotonic stack, valid parentheses |
| Custom Hooks | ⚛️ | 12 | React hooks implementation |
| **JS Array Methods** | 🔧 | 10 | Challenges dùng built-in: map, filter, reduce, flatMap, Object.entries... |
| **JS Implement** | 🏗️ | 8 | Tự viết lại: myMap, myFilter, myReduce, myBind, myPromiseAll... |

**Tổng: 93 bài**

## Cách thêm bài mới

### 1. Thêm vào `problems.ts`

```typescript
{
    id: 94,  // ID tiếp theo
    title: 'Tên bài',
    difficulty: 'Easy' | 'Medium' | 'Hard',
    category: 'JS Array Methods',  // Phải khớp Category type
    description: {
        vi: "Đề bài tiếng Việt.\nGợi ý: `hàm nào dùng`",
        en: "English description.\nHint: use `function name`",
    },
    starterCode: "function solve(input) {\n  // Your code here\n}",
    testCases: [
        { input: "[1,2,3]", expected: "[2,4,6]" },
    ],
    hint: "Gợi ý ngắn gọn",
    solution: `function solve(input) {
  return input.map(x => x * 2);
}`,
}
```

### 2. Thêm category mới (nếu cần)

1. Thêm vào `Category` type trong `problems.ts`
2. Thêm emoji vào `categoryEmoji` trong `LeetCodePlayground.tsx`
3. Thêm vào `allCategories` array trong `LeetCodePlayground.tsx`

## Test Execution

Code chạy trong **sandboxed iframe** (`allow-scripts` only):
- Timeout: 5 giây
- Tự extract function name từ code
- So sánh `JSON.stringify(result)` với `expected`
- Hỗ trợ `testHook()` pattern cho complex tests (Custom Hooks, JS Implement)

## Keyboard Shortcuts

| Phím | Chức năng |
|---|---|
| `Ctrl+Enter` | Run code (trong Monaco Editor) |

## Lưu trữ

- Code đã viết lưu trong `localStorage` key `leetcode-saved-code`
- Problems đã solve lưu trong `localStorage` key `leetcode-solved`
- Không cần login, data chỉ lưu trên browser hiện tại
