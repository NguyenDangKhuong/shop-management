# 📝 Notion Integration

Kết nối Notion API để đọc/ghi pages từ project.

## Cài đặt

### 1. Tạo Notion Integration

1. Vào [notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Nhấn **"New integration"**
3. Đặt tên (vd: "Connect API"), chọn workspace
4. Copy **Internal Integration Token** (bắt đầu bằng `ntn_`)

### 2. Share Page cho Integration

> [!IMPORTANT]
> Integration chỉ truy cập được page/database đã được share.

1. Mở page muốn chia sẻ trong Notion
2. Nhấn **⋯** (góc trên phải) → **Connections** → tìm tên integration → **Add connection**
3. Nếu share page cha → tất cả page con cũng được share

### 3. Cài thư viện

```bash
npm install @notionhq/client --save-dev
```

### 4. Lưu API key

Thêm vào `.env.local`:

```env
NOTION_API_KEY=ntn_xxxxxxxxxxxxxxxxxxxxxxx
```

> [!CAUTION]
> Không commit API key lên git! File `.env.local` đã có trong `.gitignore`.

## Cách dùng

### Chạy script có sẵn

```bash
# Dùng tsx để chạy TypeScript trực tiếp
npx tsx notion/notion-update-day1.ts
```

Script sẽ đọc `NOTION_API_KEY` từ `.env.local` hoặc bạn truyền trực tiếp:

```bash
NOTION_API_KEY=ntn_xxx npx tsx notion/notion-update-day1.ts
```

### Viết script mới

```typescript
import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_API_KEY })

// Tìm page theo tên
const { results } = await notion.search({ query: 'Tên page' })

// Đọc nội dung page
const blocks = await notion.blocks.children.list({ block_id: 'PAGE_ID' })

// Tạo page con
const page = await notion.pages.create({
    parent: { page_id: 'PARENT_PAGE_ID' },
    icon: { emoji: '📅' },
    properties: {
        title: [{ text: { content: 'Tên page mới' } }]
    },
    children: [
        { heading_2: { rich_text: [{ text: { content: 'Heading' } }] } },
        { paragraph: { rich_text: [{ text: { content: 'Nội dung...' } }] } },
        { to_do: { rich_text: [{ text: { content: 'Task 1' } }], checked: false } },
        { bookmark: { url: 'https://example.com' } },
        { callout: { icon: { emoji: '💡' }, rich_text: [{ text: { content: 'Tip...' } }] } },
    ]
})

// Thêm blocks vào page có sẵn
await notion.blocks.children.append({
    block_id: 'PAGE_ID',
    children: [{ paragraph: { rich_text: [{ text: { content: 'Thêm nội dung' } }] } }]
})

// Xóa block
await notion.blocks.delete({ block_id: 'BLOCK_ID' })
```

### Block types phổ biến

| Block | Cách dùng |
|-------|-----------|
| `heading_1/2/3` | Tiêu đề |
| `paragraph` | Đoạn văn |
| `bulleted_list_item` | Bullet list |
| `numbered_list_item` | Numbered list |
| `to_do` | Checkbox |
| `callout` | Callout box (kèm emoji icon) |
| `divider` | Đường kẻ ngang |
| `bookmark` | Link preview card |

### Rich text annotations

```typescript
{ 
    text: { content: 'Bold link', link: { url: 'https://...' } }, 
    annotations: { bold: true, italic: false, code: true, color: 'red' } 
}
```

## File structure

```
notion/
├── README.md                  # File này
└── notion-update-day1.ts      # Script tạo page Ngày 1 Tuần 1
```

## Links

- [Notion API Docs](https://developers.notion.com/)
- [Block types reference](https://developers.notion.com/reference/block)
- [@notionhq/client npm](https://www.npmjs.com/package/@notionhq/client)

---

*Cập nhật: 19/02/2026*
