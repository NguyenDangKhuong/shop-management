# Blog Feature

Trang blog chia sẻ kiến thức Frontend (JavaScript, React, TypeScript, etc.)

## Pages

| Route | Mô tả |
|-------|--------|
| `/blogs` | Danh sách tất cả bài viết |
| `/blogs/[slug]` | Chi tiết bài viết |

## Cấu trúc files

```
src/app/blogs/
├── blogData.tsx             # Re-export (barrel file, 14 dòng)
├── types.ts                 # BlogPost interface
├── components/
│   └── BlogComponents.tsx   # Shared UI: CodeBlock, Heading, Callout...
├── posts/
│   ├── index.ts             # Import all posts & export blogPosts[]
│   ├── callback-promise-async-await.tsx
│   └── nextjs-khai-niem-moi.tsx
├── page.tsx                 # Trang listing /blogs
├── [slug]/
│   └── page.tsx             # Trang chi tiết /blogs/[slug]
└── __tests__/
    ├── page.test.tsx
    └── blogData.test.tsx
```

## Thêm bài viết mới

### 1. Tạo file mới trong `posts/`

```tsx
// src/app/blogs/posts/ten-bai-viet.tsx
import { BlogPost } from '../types'
import { CodeBlock, Heading2, Paragraph, Callout } from '../components/BlogComponents'

const tenBaiViet: BlogPost = {
    slug: 'ten-bai-viet',           // URL: /blogs/ten-bai-viet
    title: 'Tiêu đề bài viết',
    description: 'Mô tả ngắn...',
    date: '2026-03-01',
    tags: ['JavaScript', 'React'],
    emoji: '🚀',
    color: '#38bdf8',               // Hex color cho accent
    content: (
        <>
            <Heading2>Section 1</Heading2>
            <Paragraph>Nội dung...</Paragraph>
            <CodeBlock title="example.js">{`const x = 1`}</CodeBlock>
            <Callout type="tip">Gợi ý...</Callout>
        </>
    ),
}

export default tenBaiViet
```

### 2. Import vào `posts/index.ts`

```tsx
import tenBaiViet from './ten-bai-viet'

export const blogPosts: BlogPost[] = [
    callbackPromiseAsyncAwait,
    nextjsKhaiNiemMoi,
    tenBaiViet,  // ← thêm ở đây
]
```

## Components có sẵn cho content

| Component | Mô tả | Ví dụ |
|-----------|--------|-------|
| `<Heading2>` | Heading cấp 2 (trắng, bold) | `<Heading2>Title</Heading2>` |
| `<Heading3>` | Heading cấp 3 (tím) | `<Heading3>Subtitle</Heading3>` |
| `<Paragraph>` | Đoạn văn | `<Paragraph>Text...</Paragraph>` |
| `<CodeBlock>` | Block code với title | `<CodeBlock title="file.js">{\`code\`}</CodeBlock>` |
| `<InlineCode>` | Code inline | `<InlineCode>var</InlineCode>` |
| `<Highlight>` | Text nổi bật (xanh dương) | `<Highlight>keyword</Highlight>` |
| `<Callout>` | Hộp thông báo (tip/warning/info) | `<Callout type="tip">...</Callout>` |

## Tại sao dùng Static TSX thay vì DB?

- **SEO**: Next.js static generate tại build time → load cực nhanh
- **Không cần DB overhead** cho nội dung chỉ đọc
- **Version control**: Mọi thay đổi tracked qua git
- **Code snippets**: Render tốt hơn khi viết trực tiếp trong JSX
- **Type-safe**: TypeScript kiểm tra cấu trúc bài viết

## Bài viết hiện có

1. **Callback, Promise và Async/Await** (`callback-promise-async-await`)
   - Callback Hell, Promise chain, Async/Await syntax
   - Code examples, bảng so sánh, ví dụ React useEffect

2. **Next.js — Tổng quan các khái niệm mới nhất** (`nextjs-khai-niem-moi`)
   - App Router, Server/Client Components, Server Actions
   - Streaming & Suspense, Parallel & Intercepting Routes
   - Caching, Middleware, Image & Font optimization
