# 🔧 ESLint — Flat Config Migration

Tài liệu về cấu hình ESLint mới (Flat Config format) của project.

## Tổng quan

Project đã migrate từ legacy `.eslintrc.*` sang **ESLint Flat Config** (`eslint.config.mjs`).

**Commit:** `371c4cb` — chore: migrate from next lint to eslint flat config CLI

---

## File cấu hình

**File:** `eslint.config.mjs`

## Plugins

| Plugin | Mô tả |
|--------|-------|
| `@typescript-eslint/eslint-plugin` | TypeScript rules |
| `eslint-plugin-unused-imports` | Tự động phát hiện & xoá unused imports |
| `next/core-web-vitals` | Next.js recommended rules (via FlatCompat) |

## Rules quan trọng

| Rule | Level | Mô tả |
|------|-------|-------|
| `unused-imports/no-unused-imports` | `error` | **Auto-remove** unused imports khi lint fix |
| `unused-imports/no-unused-vars` | `warn` | Cảnh báo biến không dùng (bỏ qua `_prefix` và rest siblings) |
| `@typescript-eslint/no-unused-vars` | `off` | Tắt vì đã dùng `unused-imports` thay thế |
| `@typescript-eslint/no-explicit-any` | `off` | Cho phép dùng `any` |
| `react-hooks/exhaustive-deps` | `off` | Tắt warning dependency array |
| `react/no-unescaped-entities` | `off` | Cho phép `'`, `"` trong JSX |
| `@next/next/no-img-element` | `off` | Cho phép `<img>` thay vì bắt buộc `<Image>` |

## Ignored Paths

```
.next/**
node_modules/**
dist/**
build/**
coverage/**
jest.config.ts
jest.setup.ts
chrome-extension/**
cloudflare-video-proxy/**
mobile/**
scripts/**
next.config.js
```

## Cách chạy

```bash
# Kiểm tra lint
npx eslint .

# Auto-fix (xoá unused imports, etc.)
npx eslint . --fix
```

> **Lưu ý:** Không còn dùng `next lint` mà chạy `eslint` CLI trực tiếp.

---

*Tài liệu cập nhật: 18/05/2026*
