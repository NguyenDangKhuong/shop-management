# PWA Mobile App — Khuong.Dev

Last updated: 2026-03-17

## Overview

PWA (Progressive Web App) cho phép user "Add to Home Screen" trên iOS/Android → mở app giống native. Khi detect standalone mode → hiện bottom tab bar thay vì browser navigation.

## Standalone Detection

```ts
// src/hooks/useStandalone.ts
const isStandalone =
    window.matchMedia('(display-mode: standalone)').matches ||
    (navigator as any).standalone === true  // Safari-specific
```

- ✅ **Standalone** (Add to Home Screen): hiện tab bar, safe area padding
- ❌ **Mobile web** (browser): UI bình thường, không thay đổi

## Bottom Tab Bar

| Tab | Icon | Route | Mô tả |
|-----|------|-------|--------|
| Home | 🏠 | `/` | Trang chủ |
| Blog | 📝 | `/blogs` | Blog posts |
| Translate | 📖 | `/translate` | Dịch + vocabulary |
| Flashcards | 🃏 | `/vocabulary-flashcards` | Ôn từ vựng |
| More | ⚙️ | (popup) | Menu thêm |

### More Menu

| Item | Icon | Route |
|------|------|-------|
| Đăng nhập | 🔐 | `/login` |
| LeetCode | 💻 | `/leetcode` |
| Algorithm | 🧩 | `/flashcards` |
| CV | 📄 | `/cv` |
| Projects | 🚀 | `/projects` |
| Privacy | 🔒 | `/privacy` |
| Terms | 📋 | `/terms` |

## Files

| File | Mô tả |
|------|--------|
| `src/hooks/useStandalone.ts` | Hook detect standalone mode |
| `src/components/MobileTabBar.tsx` | Bottom tab bar + More popup |
| `public/favicon_io/site.webmanifest` | PWA manifest (name, icons, display) |
| `src/app/layout.tsx` | Root layout — integrate tab bar |

## Manifest

```json
{
  "name": "Khuong.Dev",
  "short_name": "Khuong.Dev",
  "display": "standalone",
  "display_override": ["standalone", "minimal-ui"]
}
```

## iOS Setup

1. Mở Safari → `khuong.theworkpc.com`
2. Share → **Add to Home Screen**
3. Mở app từ Home Screen → thấy tab bar

> ⚠️ Cần xóa app cũ (TheTapHoa) nếu đã Add to Home Screen trước đó, rồi add lại.

## Thêm tab mới

Sửa `src/components/MobileTabBar.tsx`:

```ts
const TABS: TabItem[] = [
    { icon: '🏠', label: 'Home', href: '/' },
    { icon: '📝', label: 'Blog', href: '/blogs' },
    // Thêm tab mới ở đây
]
```

Hoặc thêm vào More menu:
```ts
const MORE_ITEMS = [
    { icon: '🔐', label: 'Đăng nhập', href: '/login' },
    // Thêm item mới ở đây
]
```
