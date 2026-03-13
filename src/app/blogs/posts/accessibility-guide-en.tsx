import { CodeBlock, Heading2, Paragraph, Highlight, InlineCode, Callout } from '../components/BlogComponents'
import { TopicModal } from '../components/TopicModal'

export const enContent = (
  <>
    <Paragraph>
      <Highlight>Accessibility (a11y)</Highlight> means building websites that <strong>everyone</strong> can use —
      including people with visual, motor, hearing, or cognitive disabilities.
      It&apos;s not optional — it&apos;s a legal requirement in many countries and a <Highlight>core interview topic</Highlight> at Big Tech.
    </Paragraph>

    <Callout type="info">
      <strong>Why &quot;a11y&quot;?</strong> There are 11 letters between &quot;a&quot; and &quot;y&quot; in &quot;accessibility&quot;.
      About <Highlight>15% of the world population</Highlight> lives with some form of disability. Making your site accessible means more users, better SEO, and legal compliance.
    </Callout>

    {/* ===== SEMANTIC HTML ===== */}
    <Heading2>🏗️ Semantic HTML — The Foundation</Heading2>

    <Paragraph>
      The <Highlight>most impactful</Highlight> thing you can do for accessibility is use the right HTML elements.
      Screen readers, keyboard users, and search engines all depend on semantic markup.
    </Paragraph>

    <div className="my-4 space-y-2">
      <TopicModal title="Semantic Elements vs Divs" emoji="🏗️" color="#3b82f6" summary="Use the right element for the job — buttons, links, headings, landmarks">
        <Paragraph>The #1 accessibility mistake: <Highlight>using divs for everything</Highlight>.</Paragraph>

        <div className="my-3 space-y-2">
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
            <div className="text-red-400 font-bold text-sm">❌ Common Mistakes</div>
            <div className="text-slate-300 text-sm mt-1">
              • <InlineCode>&lt;div onClick&gt;</InlineCode> instead of <InlineCode>&lt;button&gt;</InlineCode> — not keyboard accessible<br />
              • <InlineCode>&lt;div&gt;</InlineCode> instead of <InlineCode>&lt;nav&gt;</InlineCode> — screen readers can&apos;t find navigation<br />
              • <InlineCode>&lt;span&gt;</InlineCode> styled as heading — no heading hierarchy for screen readers<br />
              • <InlineCode>&lt;div&gt;</InlineCode> instead of <InlineCode>&lt;main&gt;</InlineCode> — can&apos;t &quot;skip to main content&quot;
            </div>
          </div>
          <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
            <div className="text-green-400 font-bold text-sm">✅ Semantic Alternatives</div>
            <div className="text-slate-300 text-sm mt-1">
              • <InlineCode>&lt;button&gt;</InlineCode> — clickable actions (submit, toggle, open modal)<br />
              • <InlineCode>&lt;a href&gt;</InlineCode> — navigation to another page/section<br />
              • <InlineCode>&lt;nav&gt;</InlineCode> — navigation menus<br />
              • <InlineCode>&lt;main&gt;</InlineCode> — primary page content (one per page)<br />
              • <InlineCode>&lt;header&gt;</InlineCode> / <InlineCode>&lt;footer&gt;</InlineCode> — page or section boundaries<br />
              • <InlineCode>&lt;article&gt;</InlineCode> — self-contained content (blog post, comment)<br />
              • <InlineCode>&lt;section&gt;</InlineCode> — thematic grouping with a heading
            </div>
          </div>
        </div>

        <CodeBlock title="semantic-html.tsx">{`// ❌ BAD: inaccessible
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

        <Callout type="tip">Rule of thumb: if you can use a <Highlight>native HTML element</Highlight> instead of a div + ARIA, always use the native element. It gets keyboard, focus, and screen reader support for free.</Callout>
      </TopicModal>
    </div>

    {/* ===== ARIA ===== */}
    <Heading2>🏷️ ARIA — When HTML Isn&apos;t Enough</Heading2>

    <Paragraph>
      <Highlight>ARIA (Accessible Rich Internet Applications)</Highlight> adds accessibility information
      to custom components that don&apos;t have native HTML equivalents.
    </Paragraph>

    <div className="my-4 space-y-2">
      <TopicModal title="Essential ARIA Attributes" emoji="🏷️" color="#8b5cf6" summary="aria-label, aria-describedby, aria-live, roles — when and how to use them">
        <Paragraph>The <Highlight>first rule of ARIA</Highlight>: don&apos;t use ARIA if native HTML can do the job. The <Highlight>second rule</Highlight>: if you must use ARIA, use it correctly.</Paragraph>

        <div className="my-3 space-y-2">
          <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
            <div className="text-purple-400 font-bold text-sm">🏷️ Labeling</div>
            <div className="text-slate-300 text-sm mt-1">
              • <InlineCode>aria-label</InlineCode> — text label for icon-only buttons<br />
              • <InlineCode>aria-labelledby</InlineCode> — references another element as the label<br />
              • <InlineCode>aria-describedby</InlineCode> — additional description (e.g., error messages)<br />
              • Every interactive element MUST have an accessible name
            </div>
          </div>
          <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <div className="text-blue-400 font-bold text-sm">📢 Live Regions</div>
            <div className="text-slate-300 text-sm mt-1">
              • <InlineCode>aria-live=&quot;polite&quot;</InlineCode> — announce changes when user is idle<br />
              • <InlineCode>aria-live=&quot;assertive&quot;</InlineCode> — interrupt and announce immediately<br />
              • Use for: toast notifications, search results count, form errors<br />
              • <InlineCode>role=&quot;status&quot;</InlineCode> — implicit <InlineCode>aria-live=&quot;polite&quot;</InlineCode><br />
              • <InlineCode>role=&quot;alert&quot;</InlineCode> — implicit <InlineCode>aria-live=&quot;assertive&quot;</InlineCode>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
            <div className="text-yellow-400 font-bold text-sm">🎭 Roles</div>
            <div className="text-slate-300 text-sm mt-1">
              • <InlineCode>role=&quot;button&quot;</InlineCode> — make any element act as button (prefer <InlineCode>&lt;button&gt;</InlineCode>)<br />
              • <InlineCode>role=&quot;dialog&quot;</InlineCode> — modal dialogs<br />
              • <InlineCode>role=&quot;tablist&quot;</InlineCode> / <InlineCode>role=&quot;tab&quot;</InlineCode> / <InlineCode>role=&quot;tabpanel&quot;</InlineCode> — tab interfaces<br />
              • <InlineCode>role=&quot;combobox&quot;</InlineCode> — autocomplete inputs<br />
              • <InlineCode>role=&quot;feed&quot;</InlineCode> — infinite scrolling feed<br />
              • <InlineCode>role=&quot;navigation&quot;</InlineCode> — same as <InlineCode>&lt;nav&gt;</InlineCode>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
            <div className="text-green-400 font-bold text-sm">🔄 States</div>
            <div className="text-slate-300 text-sm mt-1">
              • <InlineCode>aria-expanded</InlineCode> — accordion, dropdown open/closed<br />
              • <InlineCode>aria-selected</InlineCode> — selected item in a list<br />
              • <InlineCode>aria-checked</InlineCode> — checkbox, toggle state<br />
              • <InlineCode>aria-disabled</InlineCode> — disabled but visible element<br />
              • <InlineCode>aria-hidden=&quot;true&quot;</InlineCode> — hide decorative elements from screen readers<br />
              • <InlineCode>aria-busy</InlineCode> — element is loading/updating
            </div>
          </div>
        </div>

        <CodeBlock title="aria-examples.tsx">{`// Icon-only button — needs aria-label
<button onClick={onClose} aria-label="Close modal">
  <XIcon />  {/* ← screen reader sees "Close modal", not icon */}
</button>

// Live region — announce search results
<div aria-live="polite" role="status">
  {results.length} results found
</div>

// Modal dialog with aria
<div role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <h2 id="modal-title">Confirm Delete</h2>
  <p>Are you sure you want to delete this item?</p>
  <button>Cancel</button>
  <button>Delete</button>
</div>

// Accordion with aria-expanded
<button
  aria-expanded={isOpen}
  aria-controls="panel-1"
  onClick={() => setIsOpen(!isOpen)}
>
  Section Title
</button>
<div id="panel-1" role="region" hidden={!isOpen}>
  Panel content...
</div>

// Form with error description
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
      <TopicModal title="Focus Management & Tab Order" emoji="⌨️" color="#f59e0b" summary="Tab, Enter, Escape, Arrow keys — make everything keyboard accessible">
        <Paragraph>Many users navigate <Highlight>entirely with keyboard</Highlight> — Tab, Enter, Escape, Arrow. Your app must support this.</Paragraph>

        <div className="my-3 space-y-2">
          <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
            <div className="text-yellow-400 font-bold text-sm">⌨️ Essential Keyboard Patterns</div>
            <div className="text-slate-300 text-sm mt-1">
              • <strong>Tab</strong>: move between focusable elements<br />
              • <strong>Shift+Tab</strong>: move backwards<br />
              • <strong>Enter/Space</strong>: activate buttons and links<br />
              • <strong>Escape</strong>: close modals, dropdowns, popups<br />
              • <strong>Arrow keys</strong>: navigate within a component (tabs, menus, combobox)
            </div>
          </div>
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
            <div className="text-red-400 font-bold text-sm">🪤 Focus Trap (for Modals)</div>
            <div className="text-slate-300 text-sm mt-1">
              • When a modal opens, focus must move <strong>inside</strong> the modal<br />
              • Tab should cycle within the modal (can&apos;t Tab out to background)<br />
              • Escape should close the modal<br />
              • On close, focus returns to the element that opened the modal<br />
              • Background content should have <InlineCode>aria-hidden=&quot;true&quot;</InlineCode> and <InlineCode>inert</InlineCode>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <div className="text-blue-400 font-bold text-sm">👁️ Focus Visible</div>
            <div className="text-slate-300 text-sm mt-1">
              • <strong>Never</strong> remove <InlineCode>outline</InlineCode> without providing alternative<br />
              • Use <InlineCode>:focus-visible</InlineCode> for keyboard-only focus styles<br />
              • Focus indicator must have <strong>3:1 contrast ratio</strong><br />
              • Skip-to-content link for keyboard users
            </div>
          </div>
        </div>

        <CodeBlock title="keyboard-patterns.tsx">{`// Focus trap for modals
function Modal({ isOpen, onClose, children }) {
  const modalRef = useRef<HTMLDivElement>(null)
  const previousFocus = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (isOpen) {
      previousFocus.current = document.activeElement as HTMLElement
      // Focus first focusable element inside modal
      const firstFocusable = modalRef.current?.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      firstFocusable?.focus()
    }
    return () => {
      // Restore focus when modal closes
      previousFocus.current?.focus()
    }
  }, [isOpen])

  // Trap Tab within modal
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
      e.preventDefault(); lastEl.focus()   // wrap to end
    } else if (!e.shiftKey && document.activeElement === lastEl) {
      e.preventDefault(); firstEl.focus()  // wrap to start
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

// Skip-to-content link (CSS: hidden until focused)
<a href="#main-content" className="skip-link">
  Skip to main content
</a>
<main id="main-content">...</main>

// CSS for skip link
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  z-index: 100;
}
.skip-link:focus {
  top: 0;  /* visible when focused via Tab */
}`}</CodeBlock>
      </TopicModal>
    </div>

    {/* ===== COLOR & CONTRAST ===== */}
    <Heading2>🎨 Color & Contrast</Heading2>

    <div className="my-4 space-y-2">
      <TopicModal title="Color Contrast & Visual Design" emoji="🎨" color="#ec4899" summary="WCAG contrast ratios, color blindness, and visual indicators">
        <div className="my-3 space-y-2">
          <div className="p-3 rounded-lg bg-pink-500/10 border border-pink-500/20">
            <div className="text-pink-400 font-bold text-sm">📏 WCAG Contrast Requirements</div>
            <div className="text-slate-300 text-sm mt-1">
              • <strong>AA (minimum)</strong>: 4.5:1 for normal text, 3:1 for large text (18px+ bold)<br />
              • <strong>AAA (enhanced)</strong>: 7:1 for normal text, 4.5:1 for large text<br />
              • Test with: WebAIM Contrast Checker, Chrome DevTools<br />
              • Focus indicators: minimum 3:1 contrast against background
            </div>
          </div>
          <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
            <div className="text-orange-400 font-bold text-sm">🔴 Don&apos;t Rely on Color Alone</div>
            <div className="text-slate-300 text-sm mt-1">
              • ~8% of men have color blindness<br />
              • Error states: use icons + text, not just red color<br />
              • Links: underline + color, not color alone<br />
              • Charts: use patterns + colors, not colors alone<br />
              • Status indicators: icons + labels, not just colored dots
            </div>
          </div>
        </div>

        <CodeBlock title="contrast-patterns.css">{`/* ❌ BAD: relying on color alone for errors */
.error { color: red; }

/* ✅ GOOD: color + icon + text */
.error {
  color: #dc2626;           /* red with good contrast */
  border-left: 3px solid #dc2626;
}
.error::before {
  content: "⚠️ ";           /* visual indicator beyond color */
}

/* Focus visible — keyboard only */
:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Don't remove focus outline! */
/* ❌ */ :focus { outline: none; }
/* ✅ */ :focus:not(:focus-visible) { outline: none; }

/* Reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

/* Dark mode with sufficient contrast */
@media (prefers-color-scheme: dark) {
  :root {
    --text-primary: #f1f5f9;      /* light on dark: 15.3:1 ✅ */
    --text-secondary: #94a3b8;    /* still 4.6:1 ✅ */
    --bg-primary: #0f172a;
  }
}`}</CodeBlock>
      </TopicModal>
    </div>

    {/* ===== FORMS ===== */}
    <Heading2>📝 Accessible Forms</Heading2>

    <div className="my-4 space-y-2">
      <TopicModal title="Form Labels, Errors & Validation" emoji="📝" color="#10b981" summary="Every input needs a label, every error needs to be announced">
        <Paragraph>Forms are where accessibility <Highlight>matters most</Highlight> — users need to know what to enter, what went wrong, and how to fix it.</Paragraph>

        <div className="my-3 space-y-2">
          <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
            <div className="text-green-400 font-bold text-sm">🏷️ Labels</div>
            <div className="text-slate-300 text-sm mt-1">
              • Every input MUST have a <InlineCode>&lt;label&gt;</InlineCode> — either wrapping or via <InlineCode>htmlFor</InlineCode><br />
              • Placeholder is NOT a label (disappears on focus)<br />
              • Required fields: add <InlineCode>aria-required=&quot;true&quot;</InlineCode> or <InlineCode>required</InlineCode> attribute<br />
              • Group related fields with <InlineCode>&lt;fieldset&gt;</InlineCode> + <InlineCode>&lt;legend&gt;</InlineCode>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
            <div className="text-red-400 font-bold text-sm">⚠️ Error Handling</div>
            <div className="text-slate-300 text-sm mt-1">
              • Errors must be <strong>announced</strong> to screen readers (<InlineCode>role=&quot;alert&quot;</InlineCode>)<br />
              • Link errors to inputs via <InlineCode>aria-describedby</InlineCode><br />
              • Mark invalid inputs with <InlineCode>aria-invalid=&quot;true&quot;</InlineCode><br />
              • Show error summary at top of form with links to each field<br />
              • Focus first error field on submit
            </div>
          </div>
        </div>

        <CodeBlock title="accessible-form.tsx">{`function SignupForm() {
  const [errors, setErrors] = useState<Record<string, string>>({})

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Error summary at top */}
      {Object.keys(errors).length > 0 && (
        <div role="alert" aria-label="Form errors">
          <h2>Please fix the following errors:</h2>
          <ul>
            {Object.entries(errors).map(([field, msg]) => (
              <li key={field}>
                <a href={\`#\${field}\`}>{msg}</a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Input with label + error */}
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
          We'll never share your email
        </span>
        {errors.email && (
          <span id="email-error" role="alert" className="error">
            {errors.email}
          </span>
        )}
      </div>

      {/* Radio group with fieldset */}
      <fieldset>
        <legend>Preferred contact method</legend>
        <label><input type="radio" name="contact" value="email" /> Email</label>
        <label><input type="radio" name="contact" value="phone" /> Phone</label>
      </fieldset>

      <button type="submit">Sign Up</button>
    </form>
  )
}`}</CodeBlock>
      </TopicModal>
    </div>

    {/* ===== IMAGES & MEDIA ===== */}
    <Heading2>🖼️ Images & Media</Heading2>

    <div className="my-4 space-y-2">
      <TopicModal title="Alt Text & Media Accessibility" emoji="🖼️" color="#f97316" summary="Alt text, captions, transcripts — making visual content accessible">
        <div className="my-3 space-y-2">
          <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
            <div className="text-orange-400 font-bold text-sm">📷 Image Alt Text</div>
            <div className="text-slate-300 text-sm mt-1">
              • <strong>Informative images</strong>: describe the content — <InlineCode>alt=&quot;Chart showing 50% growth in Q3&quot;</InlineCode><br />
              • <strong>Decorative images</strong>: empty alt — <InlineCode>alt=&quot;&quot;</InlineCode> (screen readers skip it)<br />
              • <strong>Functional images</strong> (buttons/links): describe the action — <InlineCode>alt=&quot;Search&quot;</InlineCode><br />
              • Don&apos;t start with &quot;Image of...&quot; — screen readers already say &quot;image&quot;<br />
              • Complex images (charts, diagrams): provide text description nearby
            </div>
          </div>
          <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <div className="text-blue-400 font-bold text-sm">🎥 Video & Audio</div>
            <div className="text-slate-300 text-sm mt-1">
              • Videos MUST have <strong>captions</strong> (closed captions / subtitles)<br />
              • Audio content needs <strong>transcripts</strong><br />
              • Auto-playing media: must have controls to pause<br />
              • No auto-playing audio (instant tab-close for everyone)
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
              • <strong>axe DevTools</strong> — browser extension, catches ~30% of issues<br />
              • <strong>Lighthouse</strong> (Chrome DevTools) — accessibility audit<br />
              • <strong>eslint-plugin-jsx-a11y</strong> — catch issues at build time<br />
              • <strong>@testing-library</strong> — encourages accessible queries (getByRole)<br />
              • Automated tools only catch ~30% of issues — manual testing is essential
            </div>
          </div>
          <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
            <div className="text-yellow-400 font-bold text-sm">🧑‍🦯 Manual Testing</div>
            <div className="text-slate-300 text-sm mt-1">
              • <strong>Keyboard only</strong>: unplug mouse, Tab through entire page<br />
              • <strong>Screen reader</strong>: test with VoiceOver (Mac), NVDA (Windows)<br />
              • <strong>Zoom</strong>: increase to 200% — check layout doesn&apos;t break<br />
              • <strong>Reduced motion</strong>: toggle prefers-reduced-motion<br />
              • <strong>Color contrast</strong>: check with color blindness simulators
            </div>
          </div>
          <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
            <div className="text-green-400 font-bold text-sm">📋 Quick Checklist</div>
            <div className="text-slate-300 text-sm mt-1">
              ☐ All images have descriptive alt text<br />
              ☐ All form inputs have labels<br />
              ☐ Color contrast meets WCAG AA (4.5:1)<br />
              ☐ All interactive elements keyboard accessible<br />
              ☐ Focus visible on all elements<br />
              ☐ Modals trap focus and return focus on close<br />
              ☐ Proper heading hierarchy (h1→h2→h3)<br />
              ☐ Skip-to-content link available<br />
              ☐ ARIA labels on icon-only buttons<br />
              ☐ Dynamic content uses aria-live<br />
              ☐ Page works at 200% zoom<br />
              ☐ Animations respect prefers-reduced-motion
            </div>
          </div>
        </div>

        <CodeBlock title="a11y-testing.tsx">{`// eslint-plugin-jsx-a11y — catches missing alt, labels
// .eslintrc.js
module.exports = {
  extends: ['plugin:jsx-a11y/recommended'],
  plugins: ['jsx-a11y'],
}

// @testing-library — encourages accessible queries
import { render, screen } from '@testing-library/react'

test('button is accessible', () => {
  render(<DeleteButton />)
  // ✅ getByRole — finds elements by ARIA role
  const button = screen.getByRole('button', { name: /delete/i })
  expect(button).toBeInTheDocument()
})

test('form shows error accessibly', () => {
  render(<LoginForm />)
  fireEvent.click(screen.getByRole('button', { name: /submit/i }))
  // ✅ role="alert" is announced by screen readers
  expect(screen.getByRole('alert')).toHaveTextContent('Email is required')
})`}</CodeBlock>
        <Callout type="warning">Automated tools only catch <Highlight>~30% of accessibility issues</Highlight>. You MUST manually test with keyboard navigation and a screen reader to catch the other 70%.</Callout>
      </TopicModal>
    </div>

    {/* ===== WCAG ===== */}
    <Heading2>📜 WCAG Guidelines Summary</Heading2>

    <div className="my-4 space-y-2">
      <TopicModal title="WCAG 2.1 — POUR Principles" emoji="📜" color="#ef4444" summary="Perceivable, Operable, Understandable, Robust — the 4 principles of accessibility">
        <Paragraph><Highlight>WCAG (Web Content Accessibility Guidelines)</Highlight> is organized around 4 principles — <strong>POUR</strong>:</Paragraph>

        <div className="my-3 space-y-2">
          <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <div className="text-blue-400 font-bold text-sm">👁️ Perceivable</div>
            <div className="text-slate-300 text-sm mt-1">
              Users must be able to <strong>perceive</strong> content through senses:<br />
              • Text alternatives for images (alt text)<br />
              • Captions for videos<br />
              • Sufficient color contrast<br />
              • Content resizable to 200%
            </div>
          </div>
          <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
            <div className="text-green-400 font-bold text-sm">⌨️ Operable</div>
            <div className="text-slate-300 text-sm mt-1">
              Users must be able to <strong>operate</strong> the interface:<br />
              • All functions available via keyboard<br />
              • Users have enough time to interact<br />
              • No content that causes seizures (flashing)<br />
              • Clear navigation and wayfinding
            </div>
          </div>
          <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
            <div className="text-yellow-400 font-bold text-sm">💡 Understandable</div>
            <div className="text-slate-300 text-sm mt-1">
              Content must be <strong>understandable</strong>:<br />
              • Text is readable and clear<br />
              • Pages behave predictably<br />
              • Users receive help avoiding and correcting errors<br />
              • Language is specified (<InlineCode>lang=&quot;en&quot;</InlineCode>)
            </div>
          </div>
          <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
            <div className="text-purple-400 font-bold text-sm">🔧 Robust</div>
            <div className="text-slate-300 text-sm mt-1">
              Content must be <strong>robust</strong> enough for assistive tech:<br />
              • Valid HTML markup<br />
              • Proper ARIA usage<br />
              • Status messages identifiable programmatically<br />
              • Works across different browsers and assistive tech
            </div>
          </div>
        </div>
      </TopicModal>
    </div>
  </>
)
