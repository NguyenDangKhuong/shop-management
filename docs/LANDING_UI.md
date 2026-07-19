# 🚀 Landing Page — Spaceship UI System

Tài liệu chi tiết về hệ thống UI components cho Landing Page, theo theme **Spaceship / Sci-Fi HUD**.

## Tổng quan

Landing Page sử dụng theme không gian vũ trụ với các hiệu ứng:
- Background 3D hologram (Three.js)
- Hyperspace page transition
- HUD-style header với radar navigation
- Sound effects (Web Audio API)
- Text decrypt animation
- Typewriter hero text
- Interactive terminal
- Star constellation map

---

## 📂 Cấu trúc files

```
src/
├── components/
│   ├── landing/
│   │   └── LandingPage.tsx          # Trang chính, tích hợp tất cả components
│   └── ui/
│       ├── DecryptText.tsx          # [NEW] Hiệu ứng giải mã text
│       ├── HologramAvatar.tsx       # [UPDATED] Avatar hologram với rotating rings
│       ├── HologramBackground.tsx   # [NEW] 3D wireframe spaceship background
│       ├── HyperspaceTransition.tsx # [NEW] Page transition effect
│       ├── MotionHero.tsx           # [UPDATED] Hero section với typewriter
│       ├── RadarNav.tsx             # [UPDATED] Mini radar scroll indicator & game trigger
│       ├── RadarGame.tsx            # [NEW] Infinite Space Interceptor Game modal
│       ├── SiteHeader.tsx           # [UPDATED] Header với HUD elements
│       ├── SoundToggle.tsx          # [NEW] Nút bật/tắt âm thanh
│       ├── SpaceTerminal.tsx        # [NEW] Terminal tương tác
│       └── StarMap.tsx              # [NEW] Constellation view cho experience
├── contexts/
│   └── SoundContext.tsx             # [NEW] Sound system provider
└── app/
    └── layout.tsx                   # [UPDATED] Wrap SoundProvider + HyperspaceTransition
```

---

## 🧩 Chi tiết Components

### 1. DecryptText

**File:** `src/components/ui/DecryptText.tsx`
**Mục đích:** Hiệu ứng scramble → reveal text, giống giải mã dữ liệu.

| Prop | Type | Default | Mô tả |
|------|------|---------|-------|
| `text` | `string` | — | Nội dung text cần hiển thị |
| `className` | `string` | `''` | CSS class bổ sung |
| `delay` | `number` | `0` | Delay trước khi bắt đầu (giây) |
| `speed` | `number` | `30` | Tốc độ scramble (ms/frame) |

**Cách hoạt động:**
1. Component mount → text ẩn (empty string)
2. Khi scroll vào viewport (`useInView`) → bắt đầu scramble
3. Mỗi ký tự hiện random characters từ pool `!@#$%^&*()...`
4. Dần dần reveal từ trái sang phải (2 iterations mỗi ký tự)
5. Kết thúc → hiện text gốc chính xác

**Test mode:** Trong `NODE_ENV === 'test'`, bypass animation → hiện text ngay.

**Sử dụng trong:**
- Section headers trên LandingPage (About, Experience, Tech Stack, Education, Skills, Contact, Performance Stats)

```tsx
<DecryptText text="ABOUT ME" delay={0.5} speed={25} />
```

---

### 2. HologramBackground

**File:** `src/components/ui/HologramBackground.tsx`
**Mục đích:** Background 3D wireframe spaceship + star field.

**Dependencies:**
- `@react-three/fiber` — React renderer cho Three.js
- `@react-three/drei` — Helper components (Stars)
- `three` — 3D library

**Cách hoạt động:**
- `Canvas` component render scene 3D
- `WireframeSpaceship` gồm:
  - **Body**: ConeGeometry (8 segments)
  - **Wings**: 2 BoxGeometry nghiêng 30°
  - **Cockpit**: SphereGeometry (tím)
  - **Rings**: 2 TorusGeometry (scanner effect)
- Animation mỗi frame (`useFrame`):
  - Float lên xuống (sin wave)
  - Rotation liên tục (Y axis)
  - **Parallax** theo mouse position
- `Stars`: 2000 particles, radius 100, depth 50

**Performance:**
- `dpr={[1, 1.5]}` — giới hạn pixel ratio cho mobile
- `antialias: false` — tắt anti-aliasing
- **Desktop only** — không render trên mobile (dùng gradient fallback)
- SSR disabled (`next/dynamic` với `ssr: false`)

**Mobile fallback** (trong LandingPage):
```tsx
{/* Desktop */}
<div className="hidden md:block">
    <HologramBackground />
</div>

{/* Mobile — gradient blobs thay thế */}
<div className="md:hidden">
    <div className="... bg-[var(--neon-cyan)] opacity-[0.06] blur-[150px]" />
    <div className="... bg-[var(--neon-purple)] opacity-[0.05] blur-[180px]" />
</div>
```

---

### 3. HyperspaceTransition

**File:** `src/components/ui/HyperspaceTransition.tsx`
**Mục đích:** Hiệu ứng "hyperspace jump" khi navigate giữa các trang.

**Cách hoạt động:**
1. Lắng nghe `usePathname()` thay đổi
2. Skip lần mount đầu tiên (dùng `useRef`)
3. Khi pathname thay đổi → `isTransitioning = true` → render overlay
4. Sau 1 giây → `isTransitioning = false` → ẩn overlay

**Hiệu ứng visual:**
- 50 "star" particles random position, stretch ra từ center
- White flash ở cuối (opacity: 0 → 0 → 1 → 0)
- Background đen full screen, z-index: 100

**Tích hợp:** Đặt trong `layout.tsx`, render global:
```tsx
<SoundProvider>
    <AntdProvider>
        <HyperspaceTransition />
        {children}
    </AntdProvider>
</SoundProvider>
```

> ⚠️ **Bug đã fix:** Có 2 bug liên quan:
> - `fb7b0af`: useEffect cleanup cancel timeout sớm → infinite black screen
> - `12624ed`: AnimatePresence gây black screen trên `/tweets` → đã remove

---

### 4. RadarNav

**File:** `src/components/ui/RadarNav.tsx`
**Mục đích:** Mini radar HUD hiển thị scroll position kiêm nút kích hoạt Minigame Space Interceptor.

**Kích thước:** 32×32px (w-8 h-8), hiện trên Desktop header.

**Tính năng tương tác:**
- **Scroll Tracking:** Blip di chuyển theo cuộn màn hình.
- **Mouse Click Trigger:** Hover chuột đổi màu neon sáng rực và click để khởi chạy Space Interceptor game.
- **Keyboard Shortcut G:** Nhấn phím `G` trên trình duyệt để kích hoạt trò chơi nhanh chóng (tự động bỏ qua khi trỏ chuột đang focus ở các ô nhập dữ liệu admin).
- **Body portal rendering:** Tránh lỗi stacking context bị cắt xén (clip-path) bởi Header bằng cách mount trực tiếp qua Portal của React vào `document.body` giúp tràn tràn viền hiển thị full màn hình.

**Sử dụng:** Chỉ trong `SiteHeader.tsx`, desktop view:
```tsx
<div className="flex items-center gap-3">
    <SoundToggle />
    <ThemeToggle />
    {rightSlot}
    <RadarNav />
</div>
```

---

### 5. SoundToggle

**File:** `src/components/ui/SoundToggle.tsx`
**Mục đích:** Nút bật/tắt sound effects trên header.

**UI:**
- 32×32px button
- Enabled: neon cyan glow border + speaker icon (có sóng)
- Disabled: transparent border + speaker muted icon (có X)

**Logic:**
- Gọi `toggleSound()` từ `SoundContext`
- Nếu vừa enable → delay 50ms rồi `playClick()` để phản hồi

**Sử dụng:** Trong `SiteHeader.tsx`, cả mobile và desktop.

---

### 6. SpaceTerminal

**File:** `src/components/ui/SpaceTerminal.tsx`
**Mục đích:** Terminal tương tác trong section Contact.

**Commands hỗ trợ:**

| Command | Output |
|---------|--------|
| `help` | Liệt kê tất cả commands |
| `contact --email` | Hiện email `nguyendangkhuong96@gmail.com` |
| `download --cv` | Mở tab mới download CV |
| `whoami` | Hiện `GUEST_USER_9942 // ACCESS LEVEL: VISITOR` |
| `clear` | Xóa lịch sử terminal |
| Bất kỳ | `COMMAND NOT FOUND: <cmd>` |

**Visual:**
- Background `#0a0a0a` với border neon cyan
- CRT scanline overlay (4px line pattern)
- Text color: `var(--neon-cyan)` với text-shadow glow
- Auto-scroll to bottom khi thêm output
- Input dạng form, prompt `>`

**Lưu ý:** `autoFocus` đã bị remove (commit `70bf1f8`) vì gây page jump khi load.

---

### 7. StarMap

**File:** `src/components/ui/StarMap.tsx`
**Mục đích:** View mode thay thế cho Work Experience — hiển thị dạng constellation.

**Props:**

| Prop | Type | Mô tả |
|------|------|-------|
| `experiences` | `Array` | Danh sách experience với company, role, period, color, highlights |

**Cách hoạt động:**
- Hardcode 6 vị trí constellation: `(10,50), (30,20), (50,60), (70,30), (90,80), (80,10)`
- Nối các node bằng dashed line animation (`pathLength: 0 → 1`)
- Mỗi node là dot với glow effect theo `color`
- Hover → tooltip hiện role + company + period (bottom overlay)

**Toggle:** Trong LandingPage, button chuyển giữa "📋 List View" và "🌌 Star Map":
```tsx
const [expViewMode, setExpViewMode] = useState<'list' | 'map'>('list')

{expViewMode === 'list' ? <Timeline>...</Timeline> : <StarMap experiences={experiences} />}
```

---

### 8. HologramAvatar (Updated)

**File:** `src/components/ui/HologramAvatar.tsx`
**Thay đổi:**

| Trước | Sau |
|-------|-----|
| Chỉ nhận `size` (number) | Nhận `className` (string) cho responsive sizing |
| Hiện mặt/bust | Full-body view: `scale-[2] -translate-y-[40%]` |
| Rings cơ bản | 2 spinning rings (10s, 15s counter-spin) + dashed ring (20s) |
| — | Base platform glow + ellipse rings (3D effect) |
| — | Scanner line overlay (3s ease-in-out infinite) |
| — | Custom `--holo-color` CSS variable |

**Sử dụng:**
```tsx
<HologramAvatar
    src="/image/home/avatar.png"
    alt="Khuong"
    className="w-[250px] h-[250px] md:w-[350px] md:h-[350px]"
    color="var(--neon-cyan)"
/>
```

---

### 9. MotionHero (Updated)

**File:** `src/components/ui/MotionHero.tsx`
**Thay đổi chính:**

#### Typewriter Effect
- Custom hook `useTypewriter(words)`:
  - TYPE_SPEED: 120ms/char
  - DELETE_SPEED: 70ms/char
  - PAUSE_DURATION: 2500ms
- Words EN: `['Khuong.', 'Developer.', 'Creative.']`
- Words VI: `['Khương.', 'Lập trình.', 'Sáng tạo.']`
- Blinking cursor (4px width, neon cyan)

#### Sound Integration
- `playHover` khi hover CTA buttons
- `playClick` khi click CTA buttons

#### CTA Buttons
| Button | Link | Style |
|--------|------|-------|
| 📖 Blog | `/blogs` | Outlined, purple glow |
| ⬇️ Download CV | `/cv` | Outlined, green glow |
| 🚀 View Projects | `/projects` | Filled, cyan glow |

#### Visual Enhancements
- Gradient text (cyan → purple) cho typed text
- Blur-in entrance animations
- Animated gradient accent line (left border)
- Floating tech badges ("⚡ Performance", "🎯 Pixel Perfect")
- Badge: `{years}+ Years • React Specialist` (auto-calculate)

---

### 10. SiteHeader (Updated)

**File:** `src/components/ui/SiteHeader.tsx`
**Thay đổi:**

| Feature | Mô tả |
|---------|-------|
| `RadarNav` | Mini radar ở góc phải (Desktop) |
| `SoundToggle` | Nút sound ở header (cả Mobile/Desktop) |
| HUD Status | `SYS.ONLINE // CPU: XX% // UPLINK: STABLE` (Desktop, center) |
| Corner Accents | Decorative borders góc trái/phải (neon cyan) |
| clipPath | Bottom edge cắt polygon kiểu sci-fi |

**Layout Desktop:**
```
┌─[K] Khuong.Dev─── ──SYS.ONLINE // CPU: XX%── ──[🔊][🌙][Login][🔘Radar]─┐
└──────────────────────────────────────────────────────────────────────────────┘
```

**Layout Mobile:**
```
┌─[K] Khuong.Dev───────────────────────────── ──[🔊][🌙][Login]─┐
└────────────────────────────────────────────────────────────────┘
```

### 11. RadarGame

**File:** `src/components/ui/RadarGame.tsx`
**Mục đích:** Bảng điều khiển minigame phi thuyền bắn súng Infinite Space Interceptor (Canvas HTML5).

**Tính năng nổi bật:**
- **Canvas Rendering:** Vẽ và vận hành các thành phần chuyển động (máy bay ta, kẻ địch, đạn laser, hạt nổ tung tóe, bầu trời sao trôi cuộn) mượt mà bằng Canvas 2D.
- **Tốc độ tăng dần (Speed Scaling):** Multiplier nhân vận tốc và tần suất của kẻ địch tăng dần `0.02` mỗi giây (tương đương nhanh hơn `10%` mỗi 8 giây) liên tục cho đến khi người chơi cạn 3 điểm khiên chắn (Shield).
- **Âm thanh tổng hợp (Audio Synth):** Sử dụng `AudioContext` của Web Audio API để phát ra các bước sóng tiếng nổ, tiếng rít súng laser tương thích theo nút bật/tắt audio tổng của site (`SoundContext`).
- **Highscore:** Lưu kỷ lục điểm số bền vững vào cache trình duyệt.

---

## 🔊 Sound System

### SoundContext

**File:** `src/contexts/SoundContext.tsx`

#### Architecture
```
SoundProvider (layout.tsx)
    │
    ├── State: isEnabled (boolean)
    ├── AudioContext (Web Audio API, lazy init)
    ├── localStorage: 'sound_enabled'
    │
    └── Methods:
        ├── toggleSound() → flip isEnabled, persist
        ├── playHover()   → sine wave 800→1200Hz, 0.1s
        └── playClick()   → square wave 300→100Hz, 0.15s
```

#### Sound Design

| Sound | Oscillator | Frequency | Duration | Volume |
|-------|------------|-----------|----------|--------|
| Hover | `sine` | 800Hz → 1200Hz (exponential ramp) | 100ms | 0.05 peak |
| Click | `square` | 300Hz → 100Hz (exponential ramp) | 150ms | 0.1 peak |

Cả 2 sound đều sử dụng envelope: `0 → peak (10ms) → 0.001 (fade out)`.

#### AudioContext lifecycle
1. Không tạo cho đến khi user enable sound
2. Nếu bị suspended (browser policy) → auto resume
3. Dùng `webkitAudioContext` fallback cho Safari

#### Nơi sử dụng
- `SoundToggle` — toggle button
- `MotionHero` — CTA buttons hover/click

---

## 🔀 Page Transitions

### Flow
```
User clicks link
    │
    ├── Next.js router navigates
    ├── usePathname() changes
    │
    └── HyperspaceTransition detects change
        ├── isTransitioning = true
        ├── Render overlay (1 second):
        │   ├── 50 star particles stretch out
        │   └── White flash at 80% mark
        └── isTransitioning = false → overlay removed
```

### Caveats
- Skip lần mount đầu tiên (dùng `isMounted` ref)
- Không dùng `AnimatePresence` (gây bug black screen)
- Service worker (`sw.js`) phải được exclude khỏi redirect rules

---

## 📱 Mobile Optimization

| Optimization | Chi tiết |
|-------------|----------|
| 3D Background | Không render trên mobile → dùng CSS gradient blobs |
| Avatar size | `w-[250px] h-[250px]` mobile, `w-[350px] h-[350px]` desktop |
| RadarNav | Ẩn trên mobile (chỉ desktop header) |
| HUD Status | Ẩn trên mobile + tablet (`hidden lg:flex`) |
| Star particles | Giữ nguyên (lightweight CSS animation) |
| Sound | Hoạt động trên cả mobile |

---

## 🎨 CSS Variables sử dụng

| Variable | Mô tả | Ví dụ |
|----------|-------|-------|
| `--neon-cyan` | Cyan chính | `#00ffff` |
| `--neon-purple` | Purple chính | `#bf00ff` |
| `--neon-green` | Green accent | `#00ff88` |
| `--bg-card` | Background card | |
| `--bg-surface-dim` | Background mờ | |
| `--border-primary` | Border chính | |
| `--border-dim` | Border mờ | |
| `--text-primary` | Text chính | |
| `--text-secondary` | Text phụ | |
| `--text-muted` | Text mờ | |

---

## 🧪 Testing

### Files test liên quan:
- `src/components/landing/__tests__/LandingPage.test.tsx` — cập nhật mock cho SpaceTerminal
- `src/components/ui/__tests__/MotionHero.test.tsx` — cập nhật cho typewriter effect

### Lưu ý khi test:
- `DecryptText` bypass animation trong test mode (`NODE_ENV === 'test'`)
- `HologramBackground` cần mock `@react-three/fiber`, `@react-three/drei`
- `HyperspaceTransition` cần mock `next/navigation` (`usePathname`)
- Sound functions là no-op khi `isEnabled = false`

---

## 🔧 Dependencies mới

| Package | Version | Mục đích |
|---------|---------|----------|
| `@react-three/fiber` | — | React renderer cho Three.js |
| `@react-three/drei` | — | Three.js helpers (Stars, etc.) |
| `three` | — | 3D library |
| `eslint-plugin-unused-imports` | — | Auto-remove unused imports |

---

## ⚠️ Known Issues & Fixes

| Issue | Commit | Fix |
|-------|--------|-----|
| Infinite black screen từ HyperspaceTransition | `fb7b0af` | Fix useEffect cleanup logic |
| Black screen trên `/tweets` | `12624ed` | Remove AnimatePresence, exclude SW từ redirects |
| Page jump khi load (terminal autoFocus) | `70bf1f8` | Remove autoFocus từ SpaceTerminal input |
| `steps(1)` easing incompatible | `29e5267` | Thay bằng `linear` |
| HUD CPU% re-render | — | Dùng `Math.random()` inline → re-render mỗi lần, chấp nhận được vì header ít re-render |

---

## 🗺️ Sơ đồ Component Tree

```
layout.tsx
├── SoundProvider ← [NEW]
│   └── HyperspaceTransition ← [NEW]
│       └── LandingPage
│           ├── HologramBackground ← [NEW] (Desktop only, lazy loaded)
│           ├── SiteHeader
│           │   ├── RadarNav ← [NEW] (Desktop)
│           │   └── SoundToggle ← [NEW]
│           ├── MotionHero (updated)
│           │   ├── HologramAvatar (updated)
│           │   └── CTA Buttons (with sound)
│           ├── BentoGrid
│           ├── About Section
│           │   └── DecryptText ← [NEW]
│           ├── Experience Section
│           │   ├── Timeline (List View)
│           │   └── StarMap ← [NEW] (Map View)
│           ├── Tech Stack
│           ├── Featured Project
│           ├── Contact
│           │   └── SpaceTerminal ← [NEW]
│           ├── Education
│           └── Skills
```

---

*Tài liệu cập nhật: 18/05/2026*
