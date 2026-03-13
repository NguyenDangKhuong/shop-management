import { BlogPost } from '../types'
import { CodeBlock, Heading2, Paragraph, Highlight, InlineCode, Callout } from '../components/BlogComponents'
import { TopicModal } from '../components/TopicModal'
import { enContent } from './accessibility-guide-en'

const viContent = (
  <>
    <Paragraph>
      <Highlight>Accessibility (a11y)</Highlight> nghĩa là xây dựng website mà <strong>tất cả mọi người</strong> đều
      sử dụng được — bao gồm người khiếm thị, khiếm thính, và khuyết tật vận động hoặc nhận thức.
      Đây không phải tuỳ chọn — nó là yêu cầu pháp lý ở nhiều nước và là <Highlight>chủ đề phỏng vấn quan trọng</Highlight> tại Big Tech.
    </Paragraph>

    <Callout type="info">
      <strong>Tại sao &quot;a11y&quot;?</strong> Có 11 chữ cái giữa &quot;a&quot; và &quot;y&quot; trong &quot;accessibility&quot;.
      Khoảng <Highlight>15% dân số thế giới</Highlight> sống với một hình thức khuyết tật nào đó. Làm site accessible = nhiều users hơn, SEO tốt hơn, tuân thủ pháp luật.
    </Callout>

    {/* ===== SEMANTIC HTML ===== */}
    <Heading2>🏗️ Semantic HTML — Nền Tảng</Heading2>

    <Paragraph>
      Điều <Highlight>tác động lớn nhất</Highlight> bạn có thể làm cho accessibility là dùng đúng HTML elements.
      Screen readers, keyboard users, và search engines đều phụ thuộc vào semantic markup.
    </Paragraph>

    <div className="my-4 space-y-2">
      <TopicModal title="Semantic Elements vs Divs" emoji="🏗️" color="#3b82f6" summary="Dùng đúng element — buttons, links, headings, landmarks">
        <Paragraph>Lỗi accessibility số 1: <Highlight>dùng div cho mọi thứ</Highlight>.</Paragraph>

        <div className="my-3 space-y-2">
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
            <div className="text-red-400 font-bold text-sm">❌ Sai lầm phổ biến</div>
            <div className="text-slate-300 text-sm mt-1">
              • <InlineCode>&lt;div onClick&gt;</InlineCode> thay vì <InlineCode>&lt;button&gt;</InlineCode> — không dùng được keyboard<br />
              • <InlineCode>&lt;div&gt;</InlineCode> thay vì <InlineCode>&lt;nav&gt;</InlineCode> — screen readers không tìm được navigation<br />
              • <InlineCode>&lt;span&gt;</InlineCode> styled thành heading — không có heading hierarchy cho screen readers<br />
              • <InlineCode>&lt;div&gt;</InlineCode> thay vì <InlineCode>&lt;main&gt;</InlineCode> — không thể &quot;skip to main content&quot;
            </div>
          </div>
          <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
            <div className="text-green-400 font-bold text-sm">✅ Semantic Alternatives</div>
            <div className="text-slate-300 text-sm mt-1">
              • <InlineCode>&lt;button&gt;</InlineCode> — actions clickable (submit, toggle, mở modal)<br />
              • <InlineCode>&lt;a href&gt;</InlineCode> — navigation đến trang/section khác<br />
              • <InlineCode>&lt;nav&gt;</InlineCode> — navigation menus<br />
              • <InlineCode>&lt;main&gt;</InlineCode> — content chính của trang (một mỗi trang)<br />
              • <InlineCode>&lt;header&gt;</InlineCode> / <InlineCode>&lt;footer&gt;</InlineCode> — ranh giới trang hoặc section<br />
              • <InlineCode>&lt;article&gt;</InlineCode> — content độc lập (blog post, comment)<br />
              • <InlineCode>&lt;section&gt;</InlineCode> — nhóm theo chủ đề với heading
            </div>
          </div>
        </div>

        <CodeBlock title="semantic-html.tsx">{`// ❌ BAD: không accessible
<div className="nav">
  <div onClick={() => navigate('/home')}>Home</div>
  <div onClick={() => navigate('/about')}>About</div>
</div>
<div className="content">
  <div className="title">My Blog Post</div>
  <div className="text">Content here...</div>
</div>

// ✅ GOOD: accessible
<nav aria-label="Main navigation">
  <a href="/home">Home</a>
  <a href="/about">About</a>
</nav>
<main>
  <article>
    <h1>My Blog Post</h1>
    <p>Content here...</p>
  </article>
</main>`}</CodeBlock>

        <Callout type="tip">Nguyên tắc: nếu có thể dùng <Highlight>native HTML element</Highlight> thay vì div + ARIA, luôn dùng native element. Nó có keyboard, focus, và screen reader support miễn phí.</Callout>
      </TopicModal>
    </div>

    {/* ===== ARIA ===== */}
    <Heading2>🏷️ ARIA — Khi HTML Không Đủ</Heading2>

    <Paragraph>
      <Highlight>ARIA (Accessible Rich Internet Applications)</Highlight> thêm thông tin accessibility
      cho custom components không có HTML element tương ứng.
    </Paragraph>

    <div className="my-4 space-y-2">
      <TopicModal title="ARIA Attributes Quan Trọng" emoji="🏷️" color="#8b5cf6" summary="aria-label, aria-describedby, aria-live, roles — khi nào và cách dùng">
        <Paragraph><Highlight>Quy tắc đầu tiên của ARIA</Highlight>: đừng dùng ARIA nếu native HTML làm được. <Highlight>Quy tắc thứ hai</Highlight>: nếu phải dùng ARIA, dùng cho đúng.</Paragraph>

        <div className="my-3 space-y-2">
          <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
            <div className="text-purple-400 font-bold text-sm">🏷️ Labeling</div>
            <div className="text-slate-300 text-sm mt-1">
              • <InlineCode>aria-label</InlineCode> — label text cho icon-only buttons<br />
              • <InlineCode>aria-labelledby</InlineCode> — reference element khác làm label<br />
              • <InlineCode>aria-describedby</InlineCode> — mô tả thêm (vd: error messages)<br />
              • Mọi interactive element PHẢI có accessible name
            </div>
          </div>
          <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <div className="text-blue-400 font-bold text-sm">📢 Live Regions</div>
            <div className="text-slate-300 text-sm mt-1">
              • <InlineCode>aria-live=&quot;polite&quot;</InlineCode> — thông báo khi user rảnh<br />
              • <InlineCode>aria-live=&quot;assertive&quot;</InlineCode> — ngắt và thông báo ngay<br />
              • Dùng cho: toast notifications, số kết quả search, form errors<br />
              • <InlineCode>role=&quot;status&quot;</InlineCode> — tự có <InlineCode>aria-live=&quot;polite&quot;</InlineCode><br />
              • <InlineCode>role=&quot;alert&quot;</InlineCode> — tự có <InlineCode>aria-live=&quot;assertive&quot;</InlineCode>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
            <div className="text-yellow-400 font-bold text-sm">🎭 Roles</div>
            <div className="text-slate-300 text-sm mt-1">
              • <InlineCode>role=&quot;button&quot;</InlineCode> — biến element thành button (ưu tiên <InlineCode>&lt;button&gt;</InlineCode>)<br />
              • <InlineCode>role=&quot;dialog&quot;</InlineCode> — modal dialogs<br />
              • <InlineCode>role=&quot;tablist&quot;</InlineCode> / <InlineCode>role=&quot;tab&quot;</InlineCode> / <InlineCode>role=&quot;tabpanel&quot;</InlineCode> — tab interfaces<br />
              • <InlineCode>role=&quot;combobox&quot;</InlineCode> — autocomplete inputs<br />
              • <InlineCode>role=&quot;feed&quot;</InlineCode> — infinite scrolling feed
            </div>
          </div>
          <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
            <div className="text-green-400 font-bold text-sm">🔄 States</div>
            <div className="text-slate-300 text-sm mt-1">
              • <InlineCode>aria-expanded</InlineCode> — accordion, dropdown mở/đóng<br />
              • <InlineCode>aria-selected</InlineCode> — item đang chọn trong list<br />
              • <InlineCode>aria-checked</InlineCode> — checkbox, toggle state<br />
              • <InlineCode>aria-disabled</InlineCode> — element disabled nhưng visible<br />
              • <InlineCode>aria-hidden=&quot;true&quot;</InlineCode> — ẩn decorative elements khỏi screen readers<br />
              • <InlineCode>aria-busy</InlineCode> — element đang loading/updating
            </div>
          </div>
        </div>

        <CodeBlock title="aria-examples.tsx">{`// Icon-only button — cần aria-label
<button onClick={onClose} aria-label="Đóng modal">
  <XIcon />  {/* ← screen reader đọc "Đóng modal", không phải icon */}
</button>

// Live region — thông báo kết quả search
<div aria-live="polite" role="status">
  Tìm thấy {results.length} kết quả
</div>

// Modal dialog với aria
<div role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <h2 id="modal-title">Xác nhận xoá</h2>
  <p>Bạn có chắc muốn xoá item này?</p>
  <button>Huỷ</button>
  <button>Xoá</button>
</div>

// Accordion với aria-expanded
<button
  aria-expanded={isOpen}
  aria-controls="panel-1"
  onClick={() => setIsOpen(!isOpen)}
>
  Tiêu đề Section
</button>
<div id="panel-1" role="region" hidden={!isOpen}>
  Nội dung panel...
</div>

// Form với error description
<label htmlFor="email">Email</label>
<input
  id="email"
  aria-invalid={!!error}
  aria-describedby={error ? "email-error" : undefined}
/>
{error && <span id="email-error" role="alert">{error}</span>}`}</CodeBlock>
      </TopicModal>
    </div>

    {/* ===== KEYBOARD ===== */}
    <Heading2>⌨️ Keyboard Navigation</Heading2>

    <div className="my-4 space-y-2">
      <TopicModal title="Focus Management & Tab Order" emoji="⌨️" color="#f59e0b" summary="Tab, Enter, Escape, Arrow keys — làm mọi thứ keyboard accessible">
        <Paragraph>Nhiều users navigate <Highlight>hoàn toàn bằng keyboard</Highlight> — Tab, Enter, Escape, Arrow. App phải hỗ trợ.</Paragraph>

        <div className="my-3 space-y-2">
          <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
            <div className="text-yellow-400 font-bold text-sm">⌨️ Keyboard Patterns Cần Thiết</div>
            <div className="text-slate-300 text-sm mt-1">
              • <strong>Tab</strong>: di chuyển giữa các elements focusable<br />
              • <strong>Shift+Tab</strong>: di chuyển ngược<br />
              • <strong>Enter/Space</strong>: kích hoạt buttons và links<br />
              • <strong>Escape</strong>: đóng modals, dropdowns, popups<br />
              • <strong>Arrow keys</strong>: navigate trong component (tabs, menus, combobox)
            </div>
          </div>
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
            <div className="text-red-400 font-bold text-sm">🪤 Focus Trap (cho Modals)</div>
            <div className="text-slate-300 text-sm mt-1">
              • Khi modal mở, focus phải chuyển <strong>vào trong</strong> modal<br />
              • Tab phải cycle bên trong modal (không Tab ra ngoài background)<br />
              • Escape phải đóng modal<br />
              • Khi đóng, focus quay về element đã mở modal<br />
              • Background content nên có <InlineCode>aria-hidden=&quot;true&quot;</InlineCode> và <InlineCode>inert</InlineCode>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <div className="text-blue-400 font-bold text-sm">👁️ Focus Visible</div>
            <div className="text-slate-300 text-sm mt-1">
              • <strong>Đừng bao giờ</strong> bỏ <InlineCode>outline</InlineCode> mà không có thay thế<br />
              • Dùng <InlineCode>:focus-visible</InlineCode> cho keyboard-only focus styles<br />
              • Focus indicator phải có <strong>contrast ratio 3:1</strong><br />
              • Skip-to-content link cho keyboard users
            </div>
          </div>
        </div>

        <CodeBlock title="keyboard-patterns.tsx">{`// Focus trap cho modals
function Modal({ isOpen, onClose, children }) {
  const modalRef = useRef<HTMLDivElement>(null)
  const previousFocus = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (isOpen) {
      previousFocus.current = document.activeElement as HTMLElement
      const firstFocusable = modalRef.current?.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      firstFocusable?.focus()
    }
    return () => { previousFocus.current?.focus() }
  }, [isOpen])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') { onClose(); return }
    if (e.key !== 'Tab') return

    const focusableEls = modalRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    if (!focusableEls?.length) return

    const firstEl = focusableEls[0]
    const lastEl = focusableEls[focusableEls.length - 1]

    if (e.shiftKey && document.activeElement === firstEl) {
      e.preventDefault(); lastEl.focus()
    } else if (!e.shiftKey && document.activeElement === lastEl) {
      e.preventDefault(); firstEl.focus()
    }
  }

  if (!isOpen) return null
  return (
    <div role="dialog" aria-modal="true" ref={modalRef}
         onKeyDown={handleKeyDown} aria-labelledby="modal-title">
      {children}
    </div>
  )
}

// Skip-to-content link
<a href="#main-content" className="skip-link">
  Chuyển đến nội dung chính
</a>
<main id="main-content">...</main>`}</CodeBlock>
      </TopicModal>
    </div>

    {/* ===== COLOR ===== */}
    <Heading2>🎨 Color & Contrast</Heading2>

    <div className="my-4 space-y-2">
      <TopicModal title="Color Contrast & Visual Design" emoji="🎨" color="#ec4899" summary="WCAG contrast ratios, color blindness, và visual indicators">
        <div className="my-3 space-y-2">
          <div className="p-3 rounded-lg bg-pink-500/10 border border-pink-500/20">
            <div className="text-pink-400 font-bold text-sm">📏 Yêu cầu Contrast WCAG</div>
            <div className="text-slate-300 text-sm mt-1">
              • <strong>AA (tối thiểu)</strong>: 4.5:1 cho text thường, 3:1 cho text lớn (18px+ bold)<br />
              • <strong>AAA (nâng cao)</strong>: 7:1 cho text thường, 4.5:1 cho text lớn<br />
              • Test với: WebAIM Contrast Checker, Chrome DevTools<br />
              • Focus indicators: tối thiểu 3:1 contrast với background
            </div>
          </div>
          <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
            <div className="text-orange-400 font-bold text-sm">🔴 Đừng Dựa Vào Màu Sắc Alone</div>
            <div className="text-slate-300 text-sm mt-1">
              • ~8% nam giới bị mù màu<br />
              • Error states: dùng icons + text, không chỉ màu đỏ<br />
              • Links: underline + color, không chỉ color<br />
              • Charts: dùng patterns + colors, không chỉ colors<br />
              • Status indicators: icons + labels, không chỉ colored dots
            </div>
          </div>
        </div>

        <CodeBlock title="contrast-patterns.css">{`/* ❌ BAD: dựa vào color alone cho errors */
.error { color: red; }

/* ✅ GOOD: color + icon + text */
.error {
  color: #dc2626;
  border-left: 3px solid #dc2626;
}
.error::before {
  content: "⚠️ ";
}

/* Focus visible — chỉ keyboard */
:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Tôn trọng reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}`}</CodeBlock>
      </TopicModal>
    </div>

    {/* ===== FORMS ===== */}
    <Heading2>📝 Accessible Forms</Heading2>

    <div className="my-4 space-y-2">
      <TopicModal title="Form Labels, Errors & Validation" emoji="📝" color="#10b981" summary="Mỗi input cần label, mỗi error cần được announce">
        <Paragraph>Forms là nơi accessibility <Highlight>quan trọng nhất</Highlight> — users cần biết nhập gì, sai gì, và sửa sao.</Paragraph>

        <div className="my-3 space-y-2">
          <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
            <div className="text-green-400 font-bold text-sm">🏷️ Labels</div>
            <div className="text-slate-300 text-sm mt-1">
              • Mỗi input PHẢI có <InlineCode>&lt;label&gt;</InlineCode> — wrapping hoặc <InlineCode>htmlFor</InlineCode><br />
              • Placeholder KHÔNG PHẢI label (biến mất khi focus)<br />
              • Required fields: thêm <InlineCode>aria-required=&quot;true&quot;</InlineCode> hoặc <InlineCode>required</InlineCode><br />
              • Nhóm fields liên quan với <InlineCode>&lt;fieldset&gt;</InlineCode> + <InlineCode>&lt;legend&gt;</InlineCode>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
            <div className="text-red-400 font-bold text-sm">⚠️ Xử lý Error</div>
            <div className="text-slate-300 text-sm mt-1">
              • Errors phải được <strong>announce</strong> cho screen readers (<InlineCode>role=&quot;alert&quot;</InlineCode>)<br />
              • Link errors đến inputs qua <InlineCode>aria-describedby</InlineCode><br />
              • Đánh dấu invalid inputs với <InlineCode>aria-invalid=&quot;true&quot;</InlineCode><br />
              • Hiện error summary ở top form với links đến mỗi field<br />
              • Focus vào error field đầu tiên khi submit
            </div>
          </div>
        </div>

        <CodeBlock title="accessible-form.tsx">{`function SignupForm() {
  const [errors, setErrors] = useState<Record<string, string>>({})

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Error summary ở trên */}
      {Object.keys(errors).length > 0 && (
        <div role="alert" aria-label="Lỗi form">
          <h2>Vui lòng sửa các lỗi sau:</h2>
          <ul>
            {Object.entries(errors).map(([field, msg]) => (
              <li key={field}>
                <a href={\`#\${field}\`}>{msg}</a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Input với label + error */}
      <div>
        <label htmlFor="email">
          Email <span aria-hidden="true">*</span>
        </label>
        <input
          id="email"
          type="email"
          required
          aria-required="true"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : "email-hint"}
        />
        <span id="email-hint" className="hint">
          Chúng tôi không chia sẻ email của bạn
        </span>
        {errors.email && (
          <span id="email-error" role="alert" className="error">
            {errors.email}
          </span>
        )}
      </div>

      {/* Radio group với fieldset */}
      <fieldset>
        <legend>Phương thức liên hệ ưa thích</legend>
        <label><input type="radio" name="contact" value="email" /> Email</label>
        <label><input type="radio" name="contact" value="phone" /> Điện thoại</label>
      </fieldset>

      <button type="submit">Đăng ký</button>
    </form>
  )
}`}</CodeBlock>
      </TopicModal>
    </div>

    {/* ===== IMAGES ===== */}
    <Heading2>🖼️ Images & Media</Heading2>

    <div className="my-4 space-y-2">
      <TopicModal title="Alt Text & Media Accessibility" emoji="🖼️" color="#f97316" summary="Alt text, captions, transcripts — làm visual content accessible">
        <div className="my-3 space-y-2">
          <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
            <div className="text-orange-400 font-bold text-sm">📷 Image Alt Text</div>
            <div className="text-slate-300 text-sm mt-1">
              • <strong>Informative images</strong>: mô tả nội dung — <InlineCode>alt=&quot;Biểu đồ tăng trưởng 50% Q3&quot;</InlineCode><br />
              • <strong>Decorative images</strong>: alt rỗng — <InlineCode>alt=&quot;&quot;</InlineCode> (screen readers bỏ qua)<br />
              • <strong>Functional images</strong> (buttons/links): mô tả action — <InlineCode>alt=&quot;Tìm kiếm&quot;</InlineCode><br />
              • Đừng bắt đầu với &quot;Ảnh của...&quot; — screen readers đã nói &quot;image&quot;<br />
              • Complex images (charts, diagrams): cung cấp mô tả text gần đó
            </div>
          </div>
          <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <div className="text-blue-400 font-bold text-sm">🎥 Video & Audio</div>
            <div className="text-slate-300 text-sm mt-1">
              • Videos PHẢI có <strong>captions</strong> (phụ đề)<br />
              • Audio content cần <strong>transcripts</strong> (bản ghi)<br />
              • Media tự chạy: phải có controls để pause<br />
              • Không auto-play audio (mọi người đều đóng tab ngay)
            </div>
          </div>
        </div>
      </TopicModal>
    </div>

    {/* ===== TESTING ===== */}
    <Heading2>🧪 Testing Accessibility</Heading2>

    <div className="my-4 space-y-2">
      <TopicModal title="A11y Testing Tools & Checklist" emoji="🧪" color="#6366f1" summary="Automated tools, manual testing, screen reader testing">
        <div className="my-3 space-y-2">
          <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
            <div className="text-purple-400 font-bold text-sm">🤖 Automated Tools</div>
            <div className="text-slate-300 text-sm mt-1">
              • <strong>axe DevTools</strong> — browser extension, bắt ~30% issues<br />
              • <strong>Lighthouse</strong> (Chrome DevTools) — accessibility audit<br />
              • <strong>eslint-plugin-jsx-a11y</strong> — bắt issues lúc build<br />
              • <strong>@testing-library</strong> — khuyến khích accessible queries (getByRole)<br />
              • Automated tools chỉ bắt ~30% — manual testing là bắt buộc
            </div>
          </div>
          <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
            <div className="text-yellow-400 font-bold text-sm">🧑‍🦯 Manual Testing</div>
            <div className="text-slate-300 text-sm mt-1">
              • <strong>Chỉ keyboard</strong>: rút chuột, Tab qua toàn bộ trang<br />
              • <strong>Screen reader</strong>: test với VoiceOver (Mac), NVDA (Windows)<br />
              • <strong>Zoom</strong>: tăng lên 200% — check layout không vỡ<br />
              • <strong>Reduced motion</strong>: toggle prefers-reduced-motion<br />
              • <strong>Color contrast</strong>: kiểm tra với color blindness simulators
            </div>
          </div>
          <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
            <div className="text-green-400 font-bold text-sm">📋 Quick Checklist</div>
            <div className="text-slate-300 text-sm mt-1">
              ☐ Tất cả images có alt text mô tả<br />
              ☐ Tất cả form inputs có labels<br />
              ☐ Color contrast đạt WCAG AA (4.5:1)<br />
              ☐ Tất cả interactive elements keyboard accessible<br />
              ☐ Focus visible trên mọi elements<br />
              ☐ Modals trap focus và return focus khi đóng<br />
              ☐ Heading hierarchy đúng (h1→h2→h3)<br />
              ☐ Skip-to-content link có sẵn<br />
              ☐ ARIA labels trên icon-only buttons<br />
              ☐ Dynamic content dùng aria-live<br />
              ☐ Trang hoạt động ở zoom 200%<br />
              ☐ Animations tôn trọng prefers-reduced-motion
            </div>
          </div>
        </div>

        <CodeBlock title="a11y-testing.tsx">{`// eslint-plugin-jsx-a11y — bắt missing alt, labels
// .eslintrc.js
module.exports = {
  extends: ['plugin:jsx-a11y/recommended'],
  plugins: ['jsx-a11y'],
}

// @testing-library — khuyến khích accessible queries
import { render, screen } from '@testing-library/react'

test('button is accessible', () => {
  render(<DeleteButton />)
  // ✅ getByRole — tìm elements bằng ARIA role
  const button = screen.getByRole('button', { name: /delete/i })
  expect(button).toBeInTheDocument()
})

test('form shows error accessibly', () => {
  render(<LoginForm />)
  fireEvent.click(screen.getByRole('button', { name: /submit/i }))
  // ✅ role="alert" được announce bởi screen readers
  expect(screen.getByRole('alert')).toHaveTextContent('Email is required')
})`}</CodeBlock>
        <Callout type="warning">Automated tools chỉ bắt <Highlight>~30% accessibility issues</Highlight>. Bạn PHẢI manual test với keyboard navigation và screen reader để bắt 70% còn lại.</Callout>
      </TopicModal>
    </div>

    {/* ===== WCAG ===== */}
    <Heading2>📜 Tổng quan WCAG</Heading2>

    <div className="my-4 space-y-2">
      <TopicModal title="WCAG 2.1 — Nguyên tắc POUR" emoji="📜" color="#ef4444" summary="Perceivable, Operable, Understandable, Robust — 4 nguyên tắc accessibility">
        <Paragraph><Highlight>WCAG (Web Content Accessibility Guidelines)</Highlight> tổ chức theo 4 nguyên tắc — <strong>POUR</strong>:</Paragraph>

        <div className="my-3 space-y-2">
          <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <div className="text-blue-400 font-bold text-sm">👁️ Perceivable (Cảm nhận được)</div>
            <div className="text-slate-300 text-sm mt-1">
              Users phải <strong>cảm nhận</strong> được content qua giác quan:<br />
              • Text alternatives cho images (alt text)<br />
              • Captions cho videos<br />
              • Color contrast đủ<br />
              • Content resize được lên 200%
            </div>
          </div>
          <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
            <div className="text-green-400 font-bold text-sm">⌨️ Operable (Vận hành được)</div>
            <div className="text-slate-300 text-sm mt-1">
              Users phải <strong>vận hành</strong> được interface:<br />
              • Tất cả chức năng dùng được qua keyboard<br />
              • Users có đủ thời gian tương tác<br />
              • Không content gây seizures (flashing)<br />
              • Navigation và wayfinding rõ ràng
            </div>
          </div>
          <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
            <div className="text-yellow-400 font-bold text-sm">💡 Understandable (Hiểu được)</div>
            <div className="text-slate-300 text-sm mt-1">
              Content phải <strong>hiểu được</strong>:<br />
              • Text đọc được và rõ ràng<br />
              • Trang hoạt động predictable<br />
              • Users được giúp tránh và sửa errors<br />
              • Ngôn ngữ được chỉ định (<InlineCode>lang=&quot;vi&quot;</InlineCode>)
            </div>
          </div>
          <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
            <div className="text-purple-400 font-bold text-sm">🔧 Robust (Bền vững)</div>
            <div className="text-slate-300 text-sm mt-1">
              Content phải đủ <strong>bền vững</strong> cho assistive tech:<br />
              • HTML markup hợp lệ<br />
              • ARIA sử dụng đúng<br />
              • Status messages identify được programmatically<br />
              • Hoạt động trên nhiều browsers và assistive tech
            </div>
          </div>
        </div>
      </TopicModal>
    </div>
  </>
)

const accessibilityGuide: BlogPost = {
  slug: 'accessibility-guide',
  title: {
    vi: 'Accessibility (a11y) cho Frontend Developer — Hướng dẫn toàn diện',
    en: 'Accessibility (a11y) for Frontend Developers — Comprehensive Guide',
  },
  description: {
    vi: 'Hướng dẫn cải thiện accessibility: semantic HTML, ARIA, keyboard navigation, color contrast, accessible forms, testing — theo chuẩn WCAG 2.1.',
    en: 'Accessibility guide: semantic HTML, ARIA, keyboard navigation, color contrast, accessible forms, testing — following WCAG 2.1 standards.',
  },
  date: '2025-10-22',
  tags: ['Accessibility', 'a11y', 'WCAG'],
  emoji: '♿',
  color: '#6366f1',
  content: { vi: viContent, en: enContent },
}

export default accessibilityGuide
