import { BlogPost } from '../types'
import { CodeBlock, Heading2, Heading3, Paragraph, Highlight, InlineCode, Callout } from '../components/BlogComponents'
import { TopicModal } from '../components/TopicModal'
import { enContent } from './design-system-components-en'

const viContent = (
    <>
        <Paragraph>
            Trong phỏng vấn Big Tech (Google, Meta, Amazon), <Highlight>Frontend System Design</Highlight> yêu cầu bạn
            thiết kế các UI component phức tạp từ đầu. Guide này cover các component phổ biến nhất —
            từ requirements → architecture → optimization → accessibility.
        </Paragraph>

        <Callout type="info">
            Mỗi component follow <Highlight>RADIO framework</Highlight>: Requirements → Architecture → Data Model → Interface → Optimization.
            Đây là approach chuẩn được dùng ở GreatFrontEnd và các công ty Big Tech.
        </Callout>

        {/* ===== OVERVIEW ===== */}
        <Heading2>🗺️ Tổng quan các Components</Heading2>

        <div className="my-6 p-4 rounded-xl bg-bg-tag border border-border-primary">
            <div className="flex flex-col items-center gap-2 text-sm">
                <div className="px-4 py-2 rounded-lg bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 w-fit font-semibold">🔍 Autocomplete / Search Bar</div>
                <div className="text-slate-600">↓</div>
                <div className="px-4 py-2 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30 w-fit font-semibold">📰 News Feed (Facebook/Twitter)</div>
                <div className="text-slate-600">↓</div>
                <div className="px-4 py-2 rounded-lg bg-slate-500/20 text-slate-400 border border-slate-500/30 w-fit font-semibold italic">🔜 Sắp có thêm...</div>
            </div>
        </div>

        {/* ===== AUTOCOMPLETE ===== */}
        <Heading2>🔍 Autocomplete / Search Bar</Heading2>

        <Paragraph>
            Câu hỏi system design <Highlight>phổ biến nhất</Highlight> cho frontend. Google, Facebook, Amazon — đều hỏi.
            Test khả năng debouncing, caching, accessibility, và kiến trúc.
        </Paragraph>

        <Heading3>Requirements</Heading3>
        <div className="my-4 space-y-2">
            <TopicModal title="Functional Requirements" emoji="📋" color="#f59e0b" summary="Component phải làm gì — input, suggestions, selection, keyboard nav">
                <Paragraph>Thu thập requirements bằng cách hỏi clarifying questions. Đây là các <Highlight>core requirements</Highlight>:</Paragraph>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="text-yellow-400 font-bold text-sm">🎯 Core Features</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • User gõ vào input → hiện suggestions real-time<br />
                            • Click hoặc Enter → chọn suggestion<br />
                            • Keyboard: Arrow Up/Down di chuyển, Enter chọn, Escape đóng<br />
                            • Click ngoài → đóng dropdown<br />
                            • Highlight text matching trong suggestions<br />
                            • Hiện loading state khi đang fetch<br />
                            • Hiện &quot;không có kết quả&quot; khi rỗng
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">⭐ Nice-to-have (senior level)</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Lịch sử tìm kiếm gần đây<br />
                            • Configurable: min query length, max results, debounce delay<br />
                            • Custom rendering cho suggestion items (text, images, categories)<br />
                            • Multi-section results (vd: &quot;Products&quot;, &quot;Users&quot;, &quot;Pages&quot;)<br />
                            • Hỗ trợ cả async (API) và static (local) data sources
                        </div>
                    </div>
                </div>
            </TopicModal>

            <TopicModal title="Non-Functional Requirements" emoji="⚡" color="#3b82f6" summary="Performance, scalability, accessibility — phân biệt junior vs senior">
                <Paragraph>Non-functional requirements phân biệt <Highlight>câu trả lời junior vs senior</Highlight>:</Paragraph>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">⚡ Performance</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Response trong <strong>200ms</strong> sau khi gõ (cảm giác instant)<br />
                            • <strong>Debounce</strong> input: delay 300ms trước khi gọi API<br />
                            • <strong>Cache</strong> kết quả query trước đó (LRU cache)<br />
                            • Xử lý <strong>race conditions</strong>: chỉ hiện kết quả cho query mới nhất<br />
                            • <strong>AbortController</strong>: cancel request cũ khi user gõ tiếp
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">♿ Accessibility (a11y)</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <InlineCode>role=&quot;combobox&quot;</InlineCode> cho input<br />
                            • <InlineCode>role=&quot;listbox&quot;</InlineCode> cho danh sách suggestions<br />
                            • <InlineCode>role=&quot;option&quot;</InlineCode> cho mỗi suggestion<br />
                            • <InlineCode>aria-expanded</InlineCode>: dropdown đang mở hay đóng<br />
                            • <InlineCode>aria-activedescendant</InlineCode>: option nào đang được highlight<br />
                            • <InlineCode>aria-autocomplete=&quot;list&quot;</InlineCode>: gợi ý danh sách giá trị<br />
                            • <InlineCode>aria-live=&quot;polite&quot;</InlineCode>: thông báo số kết quả cho screen readers
                        </div>
                    </div>
                </div>
            </TopicModal>
        </div>

        <Heading3>Architecture</Heading3>
        <div className="my-4 space-y-2">
            <TopicModal title="Kiến trúc Component" emoji="🏗️" color="#8b5cf6" summary="Input UI → Controller → Cache → API — dữ liệu chảy qua hệ thống như thế nào">
                <Paragraph>Kiến trúc follow <Highlight>Controller pattern</Highlight> điều phối data flow giữa UI và data sources:</Paragraph>

                <div className="my-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700 font-mono text-sm">
                    <div className="text-center space-y-2">
                        <div className="text-yellow-400">┌─────────────────┐</div>
                        <div className="text-yellow-400">│   Input Field   │ ← User gõ</div>
                        <div className="text-yellow-400">└────────┬────────┘</div>
                        <div className="text-slate-500">         │ onChange (debounced)</div>
                        <div className="text-purple-400">┌────────▼────────┐</div>
                        <div className="text-purple-400">│   Controller    │ ← Bộ não</div>
                        <div className="text-purple-400">└──┬──────────┬───┘</div>
                        <div className="text-slate-500">   │ check    │ miss</div>
                        <div className="flex justify-center gap-8">
                            <div className="text-center">
                                <div className="text-green-400">┌───▼───┐</div>
                                <div className="text-green-400">│ Cache │</div>
                                <div className="text-green-400">└───────┘</div>
                            </div>
                            <div className="text-center">
                                <div className="text-blue-400">┌─────▼─────┐</div>
                                <div className="text-blue-400">│ API/Server│</div>
                                <div className="text-blue-400">└───────────┘</div>
                            </div>
                        </div>
                        <div className="text-slate-500">         │ kết quả</div>
                        <div className="text-cyan-400">┌────────▼────────┐</div>
                        <div className="text-cyan-400">│  Results Popup  │ → User chọn</div>
                        <div className="text-cyan-400">└─────────────────┘</div>
                    </div>
                </div>

                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="text-yellow-400 font-bold text-sm">📥 Input Field</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Bắt input từ user, gửi cho Controller<br />
                            • Quản lý focus/blur states<br />
                            • Xử lý keyboard events (mũi tên, enter, escape)<br />
                            • ARIA attributes cho accessibility
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">🧠 Controller (bộ não)</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Debounce input (300ms)<br />
                            • Check cache xem có kết quả chưa<br />
                            • Fetch từ API khi cache miss<br />
                            • Xử lý race conditions (AbortController)<br />
                            • Cập nhật cache với kết quả mới<br />
                            • Gửi kết quả cho Results Popup
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">💾 Cache (LRU)</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Key: query string, Value: mảng kết quả<br />
                            • LRU eviction: giới hạn bộ nhớ<br />
                            • TTL: tự hết hạn data cũ<br />
                            • Hỗ trợ offline với data cũ
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                        <div className="text-cyan-400 font-bold text-sm">📋 Results Popup</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Render danh sách suggestion với highlighted text<br />
                            • Quản lý active item (keyboard + mouse)<br />
                            • Xử lý selection → fire onSelect callback<br />
                            • Hiện loading / empty / error states
                        </div>
                    </div>
                </div>
            </TopicModal>
        </div>

        <Heading3>Optimization Deep Dive</Heading3>
        <div className="my-4 space-y-2">
            <TopicModal title="Debounce + Cache + Race Conditions" emoji="🚀" color="#ef4444" summary="3 optimization bắt buộc — thiếu = red flag ngay">
                <Paragraph>3 optimization này <Highlight>bắt buộc</Highlight> phải mention. Thiếu bất kỳ cái nào = red flag.</Paragraph>

                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <div className="text-red-400 font-bold text-sm">⏱️ Debouncing</div>
                        <div className="text-slate-300 text-sm mt-1">
                            <strong>Vấn đề:</strong> User gõ &quot;react hooks&quot; → 11 API calls (mỗi ký tự 1 call)<br />
                            <strong>Giải pháp:</strong> Đợi 300ms sau keystroke cuối mới gọi API<br />
                            <strong>Kết quả:</strong> Chỉ 1-2 API calls thay vì 11<br /><br />
                            Tại sao 300ms? Đủ nhanh để cảm giác instant, đủ chậm để gom keystrokes.
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">💾 Result Caching (LRU)</div>
                        <div className="text-slate-300 text-sm mt-1">
                            <strong>Vấn đề:</strong> User gõ &quot;react&quot;, xoá, gõ &quot;react&quot; lại → lần 2 gọi API phí<br />
                            <strong>Giải pháp:</strong> Cache kết quả theo query key, check cache trước khi gọi API<br />
                            <strong>LRU (Least Recently Used):</strong> Capacity cố định (vd: 50 entries), bỏ cái cũ nhất<br /><br />
                            Bonus: Thêm TTL (Time To Live) để invalidate data cũ
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">🏎️ Race Conditions</div>
                        <div className="text-slate-300 text-sm mt-1">
                            <strong>Vấn đề:</strong> User gõ &quot;re&quot; (API call A) rồi gõ &quot;react&quot; (API call B).<br />
                            Call A trả về <em>sau</em> B → kết quả cũ cho &quot;re&quot; ghi đè kết quả đúng cho &quot;react&quot;<br /><br />
                            <strong>Giải pháp 1:</strong> <InlineCode>AbortController</InlineCode> — cancel request cũ<br />
                            <strong>Giải pháp 2:</strong> Track request ID — bỏ qua response từ request cũ<br />
                            <strong>Giải pháp 3:</strong> Dùng <InlineCode>requestId</InlineCode> counter — chỉ render nếu match latest
                        </div>
                    </div>
                </div>

                <CodeBlock title="autocomplete-optimizations.ts">{`// === 1. Debounce Hook ===
function useDebounce<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debouncedValue
}

// === 2. LRU Cache ===
class LRUCache<K, V> {
  private cache = new Map<K, V>()
  constructor(private capacity: number) {}

  get(key: K): V | undefined {
    if (!this.cache.has(key)) return undefined
    const value = this.cache.get(key)!
    this.cache.delete(key)    // move to end (most recent)
    this.cache.set(key, value)
    return value
  }

  set(key: K, value: V) {
    if (this.cache.has(key)) this.cache.delete(key)
    else if (this.cache.size >= this.capacity) {
      const firstKey = this.cache.keys().next().value
      this.cache.delete(firstKey)
    }
    this.cache.set(key, value)
  }
}

// === 3. Race Condition với AbortController ===
function useAutocomplete(query: string) {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const abortRef = useRef<AbortController | null>(null)
  const cacheRef = useRef(new LRUCache<string, any[]>(50))

  const debouncedQuery = useDebounce(query, 300)

  useEffect(() => {
    if (!debouncedQuery) { setResults([]); return }

    // Check cache trước
    const cached = cacheRef.current.get(debouncedQuery)
    if (cached) { setResults(cached); return }

    // Cancel request cũ
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    setLoading(true)
    fetch(\`/api/search?q=\${debouncedQuery}\`, {
      signal: controller.signal
    })
      .then(r => r.json())
      .then(data => {
        cacheRef.current.set(debouncedQuery, data)
        setResults(data)
      })
      .catch(err => {
        if (err.name !== 'AbortError') console.error(err)
      })
      .finally(() => setLoading(false))

    return () => controller.abort()
  }, [debouncedQuery])

  return { results, loading }
}`}</CodeBlock>
                <Callout type="tip">Phỏng vấn phải mention: <Highlight>Debounce</Highlight> (giảm API calls) → <Highlight>Cache</Highlight> (tránh call thừa) → <Highlight>AbortController</Highlight> (chống race conditions). Bộ 3 này = tín hiệu senior.</Callout>
            </TopicModal>
        </div>

        <Heading3>Full Implementation</Heading3>
        <div className="my-4 space-y-2">
            <TopicModal title="Complete Autocomplete Component" emoji="💻" color="#10b981" summary="Implementation production-ready với đầy đủ optimization + accessibility">
                <Paragraph>Đây là <Highlight>implementation đầy đủ</Highlight> kết hợp tất cả patterns: debounce, cache, race conditions, keyboard nav, và accessibility.</Paragraph>

                <CodeBlock title="Autocomplete.tsx">{`import { useState, useEffect, useRef, useCallback } from 'react'

interface AutocompleteProps<T> {
  fetchSuggestions: (query: string, signal: AbortSignal) => Promise<T[]>
  renderItem: (item: T, query: string) => React.ReactNode
  getItemKey: (item: T) => string
  onSelect: (item: T) => void
  placeholder?: string
  debounceMs?: number
  minQueryLength?: number
}

function Autocomplete<T>({
  fetchSuggestions, renderItem, getItemKey, onSelect,
  placeholder = 'Search...', debounceMs = 300, minQueryLength = 2,
}: AutocompleteProps<T>) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<T[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const [loading, setLoading] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const abortRef = useRef<AbortController | null>(null)
  const cacheRef = useRef(new Map<string, T[]>())
  const inputRef = useRef<HTMLInputElement>(null)
  const listId = useRef(
    \`autocomplete-list-\${Math.random().toString(36).slice(2)}\`
  ).current

  // Debounced search
  useEffect(() => {
    if (query.length < minQueryLength) {
      setResults([]); setIsOpen(false); return
    }
    const cached = cacheRef.current.get(query)
    if (cached) { setResults(cached); setIsOpen(true); return }

    const timer = setTimeout(async () => {
      abortRef.current?.abort()
      const controller = new AbortController()
      abortRef.current = controller
      setLoading(true)
      try {
        const data = await fetchSuggestions(query, controller.signal)
        cacheRef.current.set(query, data)
        setResults(data)
        setIsOpen(true)
        setActiveIndex(-1)
      } catch (err: any) {
        if (err.name !== 'AbortError') setResults([])
      } finally { setLoading(false) }
    }, debounceMs)
    return () => clearTimeout(timer)
  }, [query, debounceMs, minQueryLength, fetchSuggestions])

  // Click outside → đóng
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setIsOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!isOpen) return
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setActiveIndex(i => Math.min(i + 1, results.length - 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        setActiveIndex(i => Math.max(i - 1, 0))
        break
      case 'Enter':
        if (activeIndex >= 0 && results[activeIndex]) {
          onSelect(results[activeIndex])
          setIsOpen(false); setQuery('')
        }
        break
      case 'Escape':
        setIsOpen(false)
        inputRef.current?.blur()
        break
    }
  }, [isOpen, activeIndex, results, onSelect])

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      <input
        ref={inputRef} value={query}
        onChange={e => setQuery(e.target.value)}
        onFocus={() => results.length > 0 && setIsOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        role="combobox"
        aria-expanded={isOpen}
        aria-controls={listId}
        aria-activedescendant={
          activeIndex >= 0 ? \`option-\${activeIndex}\` : undefined
        }
        aria-autocomplete="list"
        aria-haspopup="listbox"
      />
      {isOpen && results.length > 0 && (
        <ul id={listId} role="listbox"
            style={{ position: 'absolute', top: '100%', left: 0, right: 0 }}>
          {results.map((item, i) => (
            <li key={getItemKey(item)} id={\`option-\${i}\`}
                role="option" aria-selected={i === activeIndex}
                onClick={() => { onSelect(item); setIsOpen(false) }}>
              {renderItem(item, query)}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}`}</CodeBlock>
                <Callout type="warning">Patterns interviewer cần thấy: <Highlight>Generic type parameter</Highlight> (reusable), <Highlight>render props</Highlight> (customizable), <Highlight>AbortController cleanup</Highlight> (no memory leaks), đầy đủ <Highlight>ARIA attributes</Highlight> (accessible).</Callout>
            </TopicModal>
        </div>

        <Heading3>So sánh: Big Tech làm thế nào</Heading3>
        <div className="my-4 space-y-2">
            <TopicModal title="Google vs Facebook vs Twitter Autocomplete" emoji="🏢" color="#6366f1" summary="Các approach khác nhau cho các use case khác nhau">
                <div className="my-3 overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead><tr className="border-b border-border-primary">
                            <th className="text-left p-2 text-slate-400">Feature</th>
                            <th className="text-left p-2 text-slate-400">Google Search</th>
                            <th className="text-left p-2 text-slate-400">Facebook</th>
                            <th className="text-left p-2 text-slate-400">Twitter/X</th>
                        </tr></thead>
                        <tbody className="text-text-secondary">
                            <tr className="border-b border-gray-800"><td className="p-2 font-bold">Data source</td><td className="p-2">Server (search queries)</td><td className="p-2">Local + Server (people, pages)</td><td className="p-2">Server (users, hashtags)</td></tr>
                            <tr className="border-b border-gray-800"><td className="p-2 font-bold">Debounce</td><td className="p-2">~100ms (rất nhanh)</td><td className="p-2">~200ms</td><td className="p-2">~300ms</td></tr>
                            <tr className="border-b border-gray-800"><td className="p-2 font-bold">Loại kết quả</td><td className="p-2">Queries + instant answers</td><td className="p-2">People, Pages, Groups, Posts</td><td className="p-2">Users, Hashtags, Topics</td></tr>
                            <tr className="border-b border-gray-800"><td className="p-2 font-bold">Sections</td><td className="p-2">Danh sách đơn</td><td className="p-2">Multi-section (tabs)</td><td className="p-2">Multi-section</td></tr>
                            <tr className="border-b border-gray-800"><td className="p-2 font-bold">Caching</td><td className="p-2">Aggressive (prefetch)</td><td className="p-2">Client cache (people)</td><td className="p-2">Recent searches + API</td></tr>
                            <tr><td className="p-2 font-bold">Đặc biệt</td><td className="p-2">Instant Search (không cần click)</td><td className="p-2">Graph search + recent</td><td className="p-2">Trending topics</td></tr>
                        </tbody>
                    </table>
                </div>
                <Callout type="tip">Phỏng vấn: mention cách bạn <Highlight>adapt architecture</Highlight> theo sản phẩm cụ thể. Google ưu tiên tốc độ (100ms debounce), Facebook ưu tiên local data (graph search), Twitter ưu tiên trending content.</Callout>
            </TopicModal>
        </div>

        {/* ===== NEWS FEED ===== */}
        <Heading2>📰 News Feed (Facebook / Twitter / Instagram)</Heading2>

        <Paragraph>
            Câu hỏi system design <Highlight>phức tạp nhất</Highlight> cho frontend. Liên quan đến rendering, data normalization,
            infinite scroll, optimistic updates, real-time sync, và accessibility.
        </Paragraph>

        <Heading3>Requirements</Heading3>
        <div className="my-4 space-y-2">
            <TopicModal title="Functional Requirements" emoji="📋" color="#3b82f6" summary="Hiển thị post, tương tác, real-time updates, infinite scroll, tạo post">
                <Paragraph>News feed có <Highlight>rất nhiều phần</Highlight>. Clarify scope với interviewer:</Paragraph>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">📰 Feed Display</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Hiển thị danh sách posts (text, images, videos, links)<br />
                            • Mỗi post hiện: author info, timestamp, content, media, reaction count<br />
                            • Posts sắp xếp theo relevance/recency (ranking algorithm)<br />
                            • Hỗ trợ nhiều loại post: text, photo, video, shared link, poll
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">👆 Tương tác</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Like / React (nhiều loại reaction như Facebook)<br />
                            • Comment (nested comments / threads)<br />
                            • Share / Repost<br />
                            • Save / Bookmark<br />
                            • Report / Ẩn post
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">♾️ Pagination & Loading</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Infinite scroll: load thêm posts khi scroll xuống<br />
                            • Cursor-based pagination (không dùng offset — handle insertions/deletions)<br />
                            • Skeleton loading cho lần load đầu<br />
                            • Banner &quot;Có bài viết mới&quot; (đừng auto-insert — UX tệ)
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="text-yellow-400 font-bold text-sm">✏️ Tạo Post</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Post composer với text input<br />
                            • Upload media (images, videos) với preview<br />
                            • Privacy settings (public, friends, private)<br />
                            • Optimistic UI: hiện post ngay trước khi server confirm
                        </div>
                    </div>
                </div>
            </TopicModal>

            <TopicModal title="Non-Functional Requirements" emoji="⚡" color="#ef4444" summary="Performance, rendering, scalability cho feed hàng triệu posts">
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <div className="text-red-400 font-bold text-sm">⚡ Performance</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Initial load dưới <strong>1 giây</strong> (above-the-fold content)<br />
                            • <strong>Virtualization</strong>: chỉ render posts visible (DOM không chịu nổi 10K nodes)<br />
                            • <strong>Lazy load media</strong>: images/videos chỉ load khi gần viewport<br />
                            • <strong>Optimistic updates</strong>: like/comment hiện ngay, sync background<br />
                            • <strong>Code splitting</strong>: features nặng (comments, share modal) load on demand
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">♿ Accessibility</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Feed: <InlineCode>role=&quot;feed&quot;</InlineCode> với <InlineCode>aria-busy</InlineCode> khi loading<br />
                            • Mỗi post: <InlineCode>role=&quot;article&quot;</InlineCode> với <InlineCode>aria-labelledby</InlineCode><br />
                            • Tên author: <InlineCode>aria-label=&quot;Post by [name]&quot;</InlineCode><br />
                            • Interactive buttons: labels rõ ràng (vd: &quot;Like this post&quot;)<br />
                            • Content mới: <InlineCode>aria-live=&quot;polite&quot;</InlineCode> thông báo updates
                        </div>
                    </div>
                </div>
            </TopicModal>
        </div>

        <Heading3>Architecture</Heading3>
        <div className="my-4 space-y-2">
            <TopicModal title="Kiến trúc Component" emoji="🏗️" color="#8b5cf6" summary="Feed → FeedItem → Store → API — kiến trúc modular cho UI phức tạp">
                <Paragraph>News feed có <Highlight>kiến trúc phân lớp</Highlight> với normalized client-side store:</Paragraph>

                <div className="my-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700 font-mono text-sm">
                    <div className="text-center space-y-2">
                        <div className="text-yellow-400">┌──────────────────────────────────────┐</div>
                        <div className="text-yellow-400">│          Feed Container               │</div>
                        <div className="text-yellow-400">│  ┌─────────┐ ┌─────────┐ ┌─────────┐│</div>
                        <div className="text-yellow-400">│  │FeedItem │ │FeedItem │ │FeedItem ││</div>
                        <div className="text-yellow-400">│  │ Header  │ │ Header  │ │ Header  ││</div>
                        <div className="text-yellow-400">│  │ Content │ │ Content │ │ Content ││</div>
                        <div className="text-yellow-400">│  │ Actions │ │ Actions │ │ Actions ││</div>
                        <div className="text-yellow-400">│  └─────────┘ └─────────┘ └─────────┘│</div>
                        <div className="text-yellow-400">│  ┌──────────────────────────────────┐│</div>
                        <div className="text-yellow-400">│  │        Post Composer             ││</div>
                        <div className="text-yellow-400">│  └──────────────────────────────────┘│</div>
                        <div className="text-yellow-400">└──────────────────┬───────────────────┘</div>
                        <div className="text-slate-500">                   │</div>
                        <div className="text-purple-400">┌──────────────────▼───────────────────┐</div>
                        <div className="text-purple-400">│       Client Store (Normalized)       │</div>
                        <div className="text-purple-400">│  posts: {'{ [id]: Post }'}                  │</div>
                        <div className="text-purple-400">│  users: {'{ [id]: User }'}                  │</div>
                        <div className="text-purple-400">│  feed:  [postId1, postId2, ...]       │</div>
                        <div className="text-purple-400">└──────────────────┬───────────────────┘</div>
                        <div className="text-slate-500">                   │</div>
                        <div className="text-blue-400">┌──────────────────▼───────────────────┐</div>
                        <div className="text-blue-400">│        API Layer / Controller         │</div>
                        <div className="text-blue-400">│  GET /feed, POST /posts, POST /likes  │</div>
                        <div className="text-blue-400">└──────────────────────────────────────┘</div>
                    </div>
                </div>

                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="text-yellow-400 font-bold text-sm">📰 Feed Container</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Quản lý feed state (loading, error, has more)<br />
                            • Implement infinite scroll với IntersectionObserver<br />
                            • Virtualization: chỉ render posts visible (~10 cùng lúc)<br />
                            • Xử lý banner &quot;Có bài viết mới&quot;
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                        <div className="text-cyan-400 font-bold text-sm">📄 FeedItem (Post Card)</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <strong>Header</strong>: author avatar, name, timestamp, privacy icon<br />
                            • <strong>Content</strong>: text (với &quot;xem thêm&quot;), images (gallery), videos (lazy), links (preview card)<br />
                            • <strong>Actions</strong>: like/react, comment, share — với counts<br />
                            • <strong>Comments section</strong>: expandable, nested, paginated
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">🗄️ Normalized Client Store</div>
                        <div className="text-slate-300 text-sm mt-1">
                            <strong>Tại sao normalize?</strong><br />
                            • Cùng 1 user xuất hiện trong nhiều posts → lưu user 1 lần, tham chiếu bằng ID<br />
                            • Update avatar user → tất cả posts tự cập nhật<br />
                            • Tránh data trùng lặp, đảm bảo consistency<br /><br />
                            <strong>Cấu trúc:</strong><br />
                            • <InlineCode>entities.posts</InlineCode>: {'{ [id]: { authorId, content, ... } }'}<br />
                            • <InlineCode>entities.users</InlineCode>: {'{ [id]: { name, avatar, ... } }'}<br />
                            • <InlineCode>feed.ids</InlineCode>: [postId1, postId2, ...] — danh sách có thứ tự
                        </div>
                    </div>
                </div>
            </TopicModal>
        </div>

        <Heading3>Performance Optimization</Heading3>
        <div className="my-4 space-y-2">
            <TopicModal title="Virtualization + Lazy Loading + Optimistic Updates" emoji="🚀" color="#10b981" summary="Làm feed 10K+ posts vẫn mượt và responsive">
                <Paragraph>Feed không optimize sẽ <Highlight>crash browser</Highlight> với 1000+ posts. Cách fix:</Paragraph>

                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">🪟 Virtualization (Windowing)</div>
                        <div className="text-slate-300 text-sm mt-1">
                            <strong>Vấn đề:</strong> 10K posts = 10K DOM nodes → browser đơ<br />
                            <strong>Giải pháp:</strong> Chỉ render posts visible trong viewport + buffer<br />
                            <strong>Libraries:</strong> react-window, react-virtuoso, @tanstack/virtual<br /><br />
                            Render ~10 posts cùng lúc, dù feed có 10K items
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">🖼️ Media Lazy Loading</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Images: <InlineCode>loading=&quot;lazy&quot;</InlineCode> hoặc IntersectionObserver<br />
                            • Videos: chỉ load poster, play khi vào viewport<br />
                            • Heavy embeds (maps, iframes): load on demand<br />
                            • Progressive images: blur placeholder → full resolution
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="text-yellow-400 font-bold text-sm">✨ Optimistic Updates</div>
                        <div className="text-slate-300 text-sm mt-1">
                            <strong>Vấn đề:</strong> User click &quot;Like&quot; → đợi 500ms cho API → UI cảm giác chậm<br />
                            <strong>Giải pháp:</strong> Update UI ngay lập tức, sync với server ở background<br />
                            <strong>Rollback:</strong> Nếu API fail → revert về state trước + hiện error toast<br /><br />
                            Áp dụng cho: likes, comments, tạo post, bookmarks
                        </div>
                    </div>
                </div>

                <CodeBlock title="news-feed-core.tsx">{`// === Optimistic Like ===
function useLikePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (postId: string) =>
      fetch(\`/api/posts/\${postId}/like\`, { method: 'POST' }),

    // Optimistic update: cập nhật UI trước khi server trả lời
    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: ['feed'] })
      const previous = queryClient.getQueryData(['feed'])

      queryClient.setQueryData(['feed'], (old: any) => ({
        ...old,
        posts: old.posts.map((p: any) =>
          p.id === postId
            ? { ...p, isLiked: !p.isLiked, likeCount: p.likeCount + (p.isLiked ? -1 : 1) }
            : p
        ),
      }))
      return { previous } // lưu để rollback
    },

    // Rollback nếu lỗi
    onError: (_, __, context) => {
      queryClient.setQueryData(['feed'], context?.previous)
      toast.error('Không thể like bài viết')
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] })
    },
  })
}

// === Feed với Infinite Scroll + Virtualization ===
function NewsFeed() {
  const {
    data, fetchNextPage, hasNextPage, isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ['feed'],
    queryFn: ({ pageParam }) =>
      fetch(\`/api/feed?cursor=\${pageParam}\`).then(r => r.json()),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: '',
  })

  const sentinelRef = useRef<HTMLDivElement>(null)

  // IntersectionObserver cho infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      { threshold: 0.1 }
    )
    if (sentinelRef.current) observer.observe(sentinelRef.current)
    return () => observer.disconnect()
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  const allPosts = data?.pages.flatMap(p => p.posts) ?? []

  return (
    <div role="feed" aria-busy={isFetchingNextPage} aria-label="News Feed">
      {allPosts.map((post) => (
        <FeedItem key={post.id} post={post} />
      ))}
      {isFetchingNextPage && <SkeletonPost />}
      {hasNextPage && <div ref={sentinelRef} style={{ height: 1 }} />}
    </div>
  )
}`}</CodeBlock>
                <Callout type="tip">Senior answer phải có: <Highlight>Virtualization</Highlight> (cho 10K+ posts), <Highlight>Optimistic updates</Highlight> (tương tác instant), <Highlight>Cursor-based pagination</Highlight> (xử lý real-time insertions), <Highlight>Normalized store</Highlight> (single source of truth).</Callout>
            </TopicModal>
        </div>

        <Heading3>Feed Accessibility</Heading3>
        <div className="my-4 space-y-2">
            <TopicModal title="Accessibility Deep Dive" emoji="♿" color="#38bdf8" summary="ARIA roles, keyboard navigation, screen reader support cho news feeds">
                <Paragraph>Facebook và Twitter đầu tư rất nhiều vào feed accessibility. Đây là các <Highlight>patterns chính</Highlight>:</Paragraph>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">📰 Feed List</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Thêm <InlineCode>role=&quot;feed&quot;</InlineCode> cho feed HTML element<br />
                            • <InlineCode>aria-busy=&quot;true&quot;</InlineCode> khi đang load posts mới<br />
                            • <InlineCode>aria-label=&quot;News Feed&quot;</InlineCode> cho screen readers
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">📄 Feed Posts</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Thêm <InlineCode>role=&quot;article&quot;</InlineCode> cho mỗi post<br />
                            • <InlineCode>aria-labelledby</InlineCode>: trỏ đến tag chứa tên author<br />
                            • Content trong post phải focusable qua keyboard (thêm <InlineCode>tabIndex=&quot;0&quot;</InlineCode>) và <InlineCode>aria-role</InlineCode> phù hợp
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">👆 Feed Interactions</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Trên Facebook, users có thể xem thêm reactions bằng cách hover nút &quot;Like&quot;. Để keyboard users cũng dùng được, Facebook hiện một button chỉ xuất hiện khi focus và menu reactions mở qua button đó<br />
                            • Buttons chỉ có icon phải có <InlineCode>aria-label</InlineCode> nếu không có text kèm theo
                        </div>
                    </div>
                </div>
            </TopicModal>
        </div>

        {/* ===== REFERENCES ===== */}
        <Heading2>📚 References & Resources</Heading2>
        <div className="my-4 space-y-1">
            <a href="https://www.greatfrontend.com/questions/system-design/autocomplete" target="_blank" rel="noopener noreferrer" className="block text-blue-400 hover:text-blue-300 text-sm">→ GreatFrontEnd: Autocomplete System Design</a>
            <a href="https://www.greatfrontend.com/questions/system-design/news-feed-facebook" target="_blank" rel="noopener noreferrer" className="block text-blue-400 hover:text-blue-300 text-sm">→ GreatFrontEnd: News Feed (Facebook)</a>
            <a href="https://engineering.fb.com/2020/05/08/web/facebook-redesign/" target="_blank" rel="noopener noreferrer" className="block text-blue-400 hover:text-blue-300 text-sm">→ Rebuilding our tech stack for the new Facebook.com</a>
            <a href="https://engineering.fb.com/2020/07/30/web/facebook-com-accessibility/" target="_blank" rel="noopener noreferrer" className="block text-blue-400 hover:text-blue-300 text-sm">→ Making Facebook.com accessible to as many people as possible</a>
            <a href="https://blog.twitter.com/engineering/en_us/topics/infrastructure/2019/buildingfasterwithcomponents" target="_blank" rel="noopener noreferrer" className="block text-blue-400 hover:text-blue-300 text-sm">→ How we built Twitter Lite</a>
            <a href="https://blog.twitter.com/engineering/en_us/a/2010/the-tech-behind-the-new-twittercom" target="_blank" rel="noopener noreferrer" className="block text-blue-400 hover:text-blue-300 text-sm">→ Building the new Twitter.com</a>
            <a href="https://medium.com/@preethikasireddy/how-the-new-twitter-com-is-built-and-why-its-important-6e0e06c4e834" target="_blank" rel="noopener noreferrer" className="block text-blue-400 hover:text-blue-300 text-sm">→ Dissecting Twitter&apos;s Redux Store</a>
            <a href="https://medium.com/nicasource/building-instagram-com-faster-part-1-2ac7f1c3b2c7" target="_blank" rel="noopener noreferrer" className="block text-blue-400 hover:text-blue-300 text-sm">→ Making Instagram.com faster: Part 1</a>
            <a href="https://slack.engineering/evolving-api-pagination-at-slack/" target="_blank" rel="noopener noreferrer" className="block text-blue-400 hover:text-blue-300 text-sm">→ Evolving API Pagination at Slack</a>
        </div>
    </>
)

const designSystemComponents: BlogPost = {
    slug: 'design-system-components',
    title: {
        vi: 'Frontend System Design — Thiết kế UI Components cho Big Tech Interview',
        en: 'Frontend System Design — UI Components for Big Tech Interviews',
    },
    description: {
        vi: 'Hướng dẫn chi tiết thiết kế các component phức tạp: Autocomplete, News Feed — từ requirements → architecture → optimization → accessibility.',
        en: 'Detailed guide to designing complex components: Autocomplete, News Feed — from requirements → architecture → optimization → accessibility.',
    },
    date: '2025-10-15',
    tags: ['System Design', 'Interview', 'Components'],
    emoji: '🏗️',
    color: '#8b5cf6',
    content: { vi: viContent, en: enContent },
}

export default designSystemComponents
