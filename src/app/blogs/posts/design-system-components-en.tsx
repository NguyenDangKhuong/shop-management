import { CodeBlock, Heading2, Heading3, Paragraph, Highlight, InlineCode, Callout } from '../components/BlogComponents'
import { TopicModal } from '../components/TopicModal'

export const enContent = (
    <>
        <Paragraph>
            In Big Tech interviews (Google, Meta, Amazon), <Highlight>Frontend System Design</Highlight> questions
            ask you to architect complex UI components from scratch. This guide covers the most common components —
            from requirements gathering to architecture, optimization, and accessibility.
        </Paragraph>

        <Callout type="info">
            Each component follows the <Highlight>RADIO framework</Highlight>: Requirements → Architecture → Data Model → Interface → Optimization.
            This is the standard approach used at GreatFrontEnd and top tech companies.
        </Callout>

        {/* ===== OVERVIEW ===== */}
        <Heading2>🗺️ Components Overview</Heading2>

        <div className="my-6 p-4 rounded-xl bg-bg-tag border border-border-primary">
            <div className="flex flex-col items-center gap-2 text-sm">
                <div className="px-4 py-2 rounded-lg bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 w-fit font-semibold">🔍 Autocomplete / Search Bar</div>
                <div className="text-slate-600">↓</div>
                <div className="px-4 py-2 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30 w-fit font-semibold">📰 News Feed (Facebook/Twitter)</div>
                <div className="text-slate-600">↓</div>
                <div className="px-4 py-2 rounded-lg bg-slate-500/20 text-slate-400 border border-slate-500/30 w-fit font-semibold italic">🔜 More coming soon...</div>
            </div>
        </div>

        {/* ===== AUTOCOMPLETE ===== */}
        <Heading2>🔍 Autocomplete / Search Bar</Heading2>

        <Paragraph>
            The <Highlight>most frequently asked</Highlight> frontend system design question. Google, Facebook, Amazon — all ask this.
            It tests debouncing, caching, accessibility, and architecture skills.
        </Paragraph>

        <Heading3>Requirements</Heading3>
        <div className="my-4 space-y-2">
            <TopicModal title="Functional Requirements" emoji="📋" color="#f59e0b" summary="What the component must do — input, suggestions, selection, keyboard nav">
                <Paragraph>Gather requirements by asking clarifying questions. Here are the <Highlight>core functional requirements</Highlight>:</Paragraph>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="text-yellow-400 font-bold text-sm">🎯 Core Features</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • User types in input → display real-time suggestions<br />
                            • Click or Enter → select a suggestion<br />
                            • Keyboard navigation: Arrow Up/Down to navigate, Enter to select, Escape to close<br />
                            • Click outside → close dropdown<br />
                            • Highlight matching text in suggestions<br />
                            • Show loading state while fetching<br />
                            • Show &quot;no results&quot; fallback when empty
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">⭐ Nice-to-have (senior level)</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Recent search history<br />
                            • Configurable: min query length, max results, debounce delay<br />
                            • Custom rendering for suggestion items (text, images, categories)<br />
                            • Multi-section results (e.g., &quot;Products&quot;, &quot;Users&quot;, &quot;Pages&quot;)<br />
                            • Support both async (API) and static (local) data sources
                        </div>
                    </div>
                </div>
            </TopicModal>

            <TopicModal title="Non-Functional Requirements" emoji="⚡" color="#3b82f6" summary="Performance, scalability, accessibility — what makes it production-ready">
                <Paragraph>Non-functional requirements separate a <Highlight>junior answer from a senior answer</Highlight>:</Paragraph>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">⚡ Performance</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Response within <strong>200ms</strong> of typing (perceived instant)<br />
                            • <strong>Debounce</strong> input: 300ms delay before API call<br />
                            • <strong>Cache</strong> previous query results (LRU cache)<br />
                            • Handle <strong>race conditions</strong>: only show results for latest query<br />
                            • <strong>AbortController</strong>: cancel in-flight requests when user types again
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">♿ Accessibility (a11y)</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <InlineCode>role=&quot;combobox&quot;</InlineCode> on input<br />
                            • <InlineCode>role=&quot;listbox&quot;</InlineCode> on suggestions list<br />
                            • <InlineCode>role=&quot;option&quot;</InlineCode> on each suggestion<br />
                            • <InlineCode>aria-expanded</InlineCode>: whether dropdown is open<br />
                            • <InlineCode>aria-activedescendant</InlineCode>: which option is highlighted<br />
                            • <InlineCode>aria-autocomplete=&quot;list&quot;</InlineCode>: suggests a list of values<br />
                            • <InlineCode>aria-live=&quot;polite&quot;</InlineCode>: announce results count to screen readers
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                        <div className="text-orange-400 font-bold text-sm">📱 Other NFRs</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Responsive: works on mobile + desktop<br />
                            • Reusable: configurable via props, framework-agnostic API<br />
                            • Memory management: purge cache for long-lived pages<br />
                            • Offline support: show cached results when no network<br />
                            • i18n: support RTL languages, Unicode input
                        </div>
                    </div>
                </div>
            </TopicModal>
        </div>

        <Heading3>Architecture</Heading3>
        <div className="my-4 space-y-2">
            <TopicModal title="Component Architecture" emoji="🏗️" color="#8b5cf6" summary="Input UI → Controller → Cache → API — how data flows through the system">
                <Paragraph>The architecture follows a <Highlight>Controller pattern</Highlight> that orchestrates data flow between UI and data sources:</Paragraph>

                <div className="my-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700 font-mono text-sm">
                    <div className="text-center space-y-2">
                        <div className="text-yellow-400">┌─────────────────┐</div>
                        <div className="text-yellow-400">│   Input Field   │ ← User types</div>
                        <div className="text-yellow-400">└────────┬────────┘</div>
                        <div className="text-slate-500">         │ onChange (debounced)</div>
                        <div className="text-purple-400">┌────────▼────────┐</div>
                        <div className="text-purple-400">│   Controller    │ ← The &quot;brain&quot;</div>
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
                        <div className="text-slate-500">         │ results</div>
                        <div className="text-cyan-400">┌────────▼────────┐</div>
                        <div className="text-cyan-400">│  Results Popup  │ → User selects</div>
                        <div className="text-cyan-400">└─────────────────┘</div>
                    </div>
                </div>

                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="text-yellow-400 font-bold text-sm">📥 Input Field</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Captures user input, forwards to Controller<br />
                            • Manages focus/blur states<br />
                            • Handles keyboard events (arrow keys, enter, escape)<br />
                            • ARIA attributes for accessibility
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">🧠 Controller (the brain)</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Debounces input (300ms)<br />
                            • Checks cache for existing results<br />
                            • Fetches from API on cache miss<br />
                            • Handles race conditions (AbortController)<br />
                            • Updates cache with new results<br />
                            • Passes results to Results Popup
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">💾 Cache (LRU)</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Key: query string, Value: results array<br />
                            • LRU eviction: limits memory usage<br />
                            • TTL: auto-expire stale results<br />
                            • Enables offline support with stale data
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                        <div className="text-cyan-400 font-bold text-sm">📋 Results Popup</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Renders suggestion list with highlighted matching text<br />
                            • Manages active item highlighting (keyboard + mouse)<br />
                            • Handles selection → fires onSelect callback<br />
                            • Shows loading / empty / error states
                        </div>
                    </div>
                </div>
            </TopicModal>
        </div>

        <Heading3>Optimization Deep Dive</Heading3>
        <div className="my-4 space-y-2">
            <TopicModal title="Debounce + Cache + Race Conditions" emoji="🚀" color="#ef4444" summary="The 3 critical optimizations — what interviewers expect you to explain">
                <Paragraph>These 3 optimizations are <Highlight>mandatory</Highlight> to mention. Missing any = instant red flag.</Paragraph>

                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <div className="text-red-400 font-bold text-sm">⏱️ Debouncing</div>
                        <div className="text-slate-300 text-sm mt-1">
                            <strong>Problem:</strong> User types &quot;react hooks&quot; → 11 API calls (one per character)<br />
                            <strong>Solution:</strong> Wait 300ms after last keystroke before calling API<br />
                            <strong>Result:</strong> Only 1-2 API calls instead of 11<br /><br />
                            Why 300ms? Fast enough to feel instant, slow enough to batch keystrokes.
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">💾 Result Caching (LRU)</div>
                        <div className="text-slate-300 text-sm mt-1">
                            <strong>Problem:</strong> User types &quot;react&quot;, clears, types &quot;react&quot; again → 2nd API call wasted<br />
                            <strong>Solution:</strong> Cache results by query key, check cache before API call<br />
                            <strong>LRU (Least Recently Used):</strong> Fixed capacity (e.g., 50 entries), evict oldest unused<br /><br />
                            Bonus: Add TTL (Time To Live) for stale data invalidation
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">🏎️ Race Conditions</div>
                        <div className="text-slate-300 text-sm mt-1">
                            <strong>Problem:</strong> User types &quot;re&quot; (API call A) then types &quot;react&quot; (API call B).<br />
                            Call A returns <em>after</em> B → stale results for &quot;re&quot; override correct results for &quot;react&quot;<br /><br />
                            <strong>Solution 1:</strong> <InlineCode>AbortController</InlineCode> — cancel previous request<br />
                            <strong>Solution 2:</strong> Track request ID — ignore responses from older requests<br />
                            <strong>Solution 3:</strong> Use <InlineCode>requestId</InlineCode> counter — only render if matches latest
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
      // Delete least recently used (first item)
      const firstKey = this.cache.keys().next().value
      this.cache.delete(firstKey)
    }
    this.cache.set(key, value)
  }
}

// === 3. Race Condition with AbortController ===
function useAutocomplete(query: string) {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const abortRef = useRef<AbortController | null>(null)
  const cacheRef = useRef(new LRUCache<string, any[]>(50))

  const debouncedQuery = useDebounce(query, 300)

  useEffect(() => {
    if (!debouncedQuery) { setResults([]); return }

    // Check cache first
    const cached = cacheRef.current.get(debouncedQuery)
    if (cached) { setResults(cached); return }

    // Cancel previous request
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
                <Callout type="tip">Interview must-mention: <Highlight>Debounce</Highlight> (reduce API calls) → <Highlight>Cache</Highlight> (avoid redundant calls) → <Highlight>AbortController</Highlight> (prevent race conditions). This trio = instant senior signal.</Callout>
            </TopicModal>
        </div>

        <Heading3>Full Implementation</Heading3>
        <div className="my-4 space-y-2">
            <TopicModal title="Complete Autocomplete Component" emoji="💻" color="#10b981" summary="Production-ready implementation with all optimizations + accessibility">
                <Paragraph>Here&apos;s the <Highlight>complete implementation</Highlight> combining all patterns: debounce, cache, race conditions, keyboard nav, and accessibility.</Paragraph>

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
  const listId = useRef(\`autocomplete-list-\${Math.random().toString(36).slice(2)}\`).current

  // Debounced search
  useEffect(() => {
    if (query.length < minQueryLength) {
      setResults([]); setIsOpen(false); return
    }

    // Check cache
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
      } finally {
        setLoading(false)
      }
    }, debounceMs)

    return () => clearTimeout(timer)
  }, [query, debounceMs, minQueryLength, fetchSuggestions])

  // Click outside to close
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
          setIsOpen(false)
          setQuery('')
        }
        break
      case 'Escape':
        setIsOpen(false)
        inputRef.current?.blur()
        break
    }
  }, [isOpen, activeIndex, results, onSelect])

  const activeId = activeIndex >= 0 ? \`option-\${activeIndex}\` : undefined

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      <input
        ref={inputRef}
        value={query}
        onChange={e => setQuery(e.target.value)}
        onFocus={() => results.length > 0 && setIsOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        role="combobox"
        aria-expanded={isOpen}
        aria-controls={listId}
        aria-activedescendant={activeId}
        aria-autocomplete="list"
        aria-haspopup="listbox"
      />

      {loading && <div className="loading-spinner" aria-live="polite">Loading...</div>}

      {isOpen && results.length > 0 && (
        <ul
          id={listId}
          role="listbox"
          style={{
            position: 'absolute', top: '100%', left: 0, right: 0,
            maxHeight: 300, overflowY: 'auto', margin: 0, padding: 0,
            listStyle: 'none', border: '1px solid #333', borderRadius: 8,
            backgroundColor: '#1a1a2e',
          }}
        >
          {results.map((item, i) => (
            <li
              key={getItemKey(item)}
              id={\`option-\${i}\`}
              role="option"
              aria-selected={i === activeIndex}
              onClick={() => { onSelect(item); setIsOpen(false); setQuery('') }}
              style={{
                padding: '8px 12px', cursor: 'pointer',
                backgroundColor: i === activeIndex ? '#16213e' : 'transparent',
              }}
            >
              {renderItem(item, query)}
            </li>
          ))}
        </ul>
      )}

      {isOpen && !loading && results.length === 0 && query.length >= minQueryLength && (
        <div style={{ position: 'absolute', top: '100%', padding: 12 }}
             role="status" aria-live="polite">
          No results found
        </div>
      )}
    </div>
  )
}

// === Usage ===
function SearchPage() {
  return (
    <Autocomplete
      fetchSuggestions={async (query, signal) => {
        const res = await fetch(\`/api/search?q=\${query}\`, { signal })
        return res.json()
      }}
      renderItem={(item, query) => {
        // Highlight matching text
        const idx = item.name.toLowerCase().indexOf(query.toLowerCase())
        if (idx === -1) return item.name
        return (
          <>
            {item.name.slice(0, idx)}
            <mark>{item.name.slice(idx, idx + query.length)}</mark>
            {item.name.slice(idx + query.length)}
          </>
        )
      }}
      getItemKey={item => item.id}
      onSelect={item => console.log('Selected:', item)}
      placeholder="Search products..."
    />
  )
}`}</CodeBlock>
                <Callout type="warning">Key patterns interviewers look for: <Highlight>Generic type parameter</Highlight> (reusable), <Highlight>render props</Highlight> (customizable), <Highlight>AbortController cleanup</Highlight> (no memory leaks), full <Highlight>ARIA attributes</Highlight> (accessible).</Callout>
            </TopicModal>
        </div>

        <Heading3>Comparison: How Big Tech Does It</Heading3>
        <div className="my-4 space-y-2">
            <TopicModal title="Google vs Facebook vs Twitter Autocomplete" emoji="🏢" color="#6366f1" summary="Different approaches for different use cases — each optimized differently">
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
                            <tr className="border-b border-gray-800"><td className="p-2 font-bold">Debounce</td><td className="p-2">~100ms (very fast)</td><td className="p-2">~200ms</td><td className="p-2">~300ms</td></tr>
                            <tr className="border-b border-gray-800"><td className="p-2 font-bold">Result types</td><td className="p-2">Queries + instant answers</td><td className="p-2">People, Pages, Groups, Posts</td><td className="p-2">Users, Hashtags, Topics</td></tr>
                            <tr className="border-b border-gray-800"><td className="p-2 font-bold">Sections</td><td className="p-2">Single list</td><td className="p-2">Multi-section (tabs)</td><td className="p-2">Multi-section</td></tr>
                            <tr className="border-b border-gray-800"><td className="p-2 font-bold">Caching</td><td className="p-2">Aggressive (prefetch)</td><td className="p-2">Client cache (people)</td><td className="p-2">Recent searches + API</td></tr>
                            <tr><td className="p-2 font-bold">Special</td><td className="p-2">Instant Search (no click needed)</td><td className="p-2">Graph search + recent</td><td className="p-2">Trending topics</td></tr>
                        </tbody>
                    </table>
                </div>
                <Callout type="tip">Interview: mention how you&apos;d <Highlight>adapt the architecture</Highlight> based on the specific product. Google prioritizes speed (100ms debounce), Facebook prioritizes local data (graph search), Twitter prioritizes trending content.</Callout>
            </TopicModal>
        </div>

        {/* ===== NEWS FEED ===== */}
        <Heading2>📰 News Feed (Facebook / Twitter / Instagram)</Heading2>

        <Paragraph>
            The <Highlight>most complex frontend system design</Highlight> question. Involves rendering, data normalization,
            infinite scroll, optimistic updates, real-time sync, and accessibility.
        </Paragraph>

        <Heading3>Requirements</Heading3>
        <div className="my-4 space-y-2">
            <TopicModal title="Functional Requirements" emoji="📋" color="#3b82f6" summary="Post display, interactions, real-time updates, infinite scroll, post creation">
                <Paragraph>A news feed has <Highlight>many moving parts</Highlight>. Clarify scope with the interviewer:</Paragraph>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">📰 Feed Display</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Display a list of posts (text, images, videos, links)<br />
                            • Each post shows: author info, timestamp, content, media, reactions count<br />
                            • Posts ordered by relevance/recency (ranking algorithm)<br />
                            • Support different post types: text, photo, video, shared link, poll
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">👆 Interactions</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Like / React (multiple reaction types like Facebook)<br />
                            • Comment (nested comments / threads)<br />
                            • Share / Repost<br />
                            • Save / Bookmark<br />
                            • Report / Hide post
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">♾️ Pagination & Loading</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Infinite scroll: load more posts as user scrolls down<br />
                            • Cursor-based pagination (not offset-based — handles insertions/deletions)<br />
                            • Skeleton loading for initial load<br />
                            • &quot;New posts available&quot; banner (don&apos;t auto-insert — disruptive UX)
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="text-yellow-400 font-bold text-sm">✏️ Post Creation</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Post composer with text input<br />
                            • Media upload (images, videos) with preview<br />
                            • Privacy settings (public, friends, private)<br />
                            • Optimistic UI: show post immediately before server confirms
                        </div>
                    </div>
                </div>
            </TopicModal>

            <TopicModal title="Non-Functional Requirements" emoji="⚡" color="#ef4444" summary="Performance, rendering, scalability, accessibility for a feed with millions of posts">
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <div className="text-red-400 font-bold text-sm">⚡ Performance</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Initial load under <strong>1 second</strong> (above-the-fold content)<br />
                            • <strong>Virtualization</strong>: only render visible posts (DOM can&apos;t handle 10K nodes)<br />
                            • <strong>Lazy load media</strong>: images/videos load only when near viewport<br />
                            • <strong>Optimistic updates</strong>: like/comment appears instantly, sync in background<br />
                            • <strong>Code splitting</strong>: heavy features (comments, share modal) loaded on demand
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">♿ Accessibility</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Feed: <InlineCode>role=&quot;feed&quot;</InlineCode> with <InlineCode>aria-busy</InlineCode> during loading<br />
                            • Each post: <InlineCode>role=&quot;article&quot;</InlineCode> with <InlineCode>aria-labelledby</InlineCode><br />
                            • Author name: <InlineCode>aria-label=&quot;Post by [name]&quot;</InlineCode><br />
                            • Interactive buttons: proper <InlineCode>aria-label</InlineCode> (e.g., &quot;Like this post&quot;)<br />
                            • New content: <InlineCode>aria-live=&quot;polite&quot;</InlineCode> to announce updates<br />
                            • Keyboard: Tab to navigate between posts, Enter to interact
                        </div>
                    </div>
                </div>
            </TopicModal>
        </div>

        <Heading3>Architecture</Heading3>
        <div className="my-4 space-y-2">
            <TopicModal title="Component Architecture" emoji="🏗️" color="#8b5cf6" summary="Feed → FeedItem → Store → API — modular architecture for complex UI">
                <Paragraph>The news feed has a <Highlight>layered architecture</Highlight> with normalized client-side store:</Paragraph>

                <div className="my-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700 font-mono text-sm">
                    <div className="text-center space-y-2">
                        <div className="text-yellow-400">┌──────────────────────────────────────┐</div>
                        <div className="text-yellow-400">│            Feed Container             │</div>
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
                        <div className="text-purple-400">│         Client Store (Normalized)     │</div>
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
                            • Manages feed state (loading, error, has more)<br />
                            • Implements infinite scroll with IntersectionObserver<br />
                            • Virtualization: only renders visible posts (window of ~10)<br />
                            • Handles &quot;New posts available&quot; banner
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                        <div className="text-cyan-400 font-bold text-sm">📄 FeedItem (Post Card)</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <strong>Header</strong>: author avatar, name, timestamp, privacy icon<br />
                            • <strong>Content</strong>: text (with &quot;see more&quot;), images (gallery), videos (lazy), links (preview card)<br />
                            • <strong>Actions</strong>: like/react, comment, share — with counts<br />
                            • <strong>Comments section</strong>: expandable, nested, paginated
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">🗄️ Normalized Client Store</div>
                        <div className="text-slate-300 text-sm mt-1">
                            <strong>Why normalize?</strong><br />
                            • Same user appears in many posts → store user once, reference by ID<br />
                            • Update user avatar → all posts update automatically<br />
                            • Prevent data duplication, ensure consistency<br /><br />
                            <strong>Structure:</strong><br />
                            • <InlineCode>entities.posts</InlineCode>: {'{ [id]: { authorId, content, ... } }'}<br />
                            • <InlineCode>entities.users</InlineCode>: {'{ [id]: { name, avatar, ... } }'}<br />
                            • <InlineCode>feed.ids</InlineCode>: [postId1, postId2, ...] — ordered list
                        </div>
                    </div>
                </div>
            </TopicModal>
        </div>

        <Heading3>Performance Optimization</Heading3>
        <div className="my-4 space-y-2">
            <TopicModal title="Virtualization + Lazy Loading + Optimistic Updates" emoji="🚀" color="#10b981" summary="Making a feed with 10K+ posts feel fast and responsive">
                <Paragraph>A feed without optimization will <Highlight>crash the browser</Highlight> with 1000+ posts. Here&apos;s how to fix it:</Paragraph>

                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">🪟 Virtualization (Windowing)</div>
                        <div className="text-slate-300 text-sm mt-1">
                            <strong>Problem:</strong> 10K posts = 10K DOM nodes → browser freezes<br />
                            <strong>Solution:</strong> Only render posts visible in viewport + buffer<br />
                            <strong>Libraries:</strong> react-window, react-virtuoso, @tanstack/virtual<br /><br />
                            Render ~10 posts at a time, even if feed has 10K items
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">🖼️ Media Lazy Loading</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Images: <InlineCode>loading=&quot;lazy&quot;</InlineCode> or IntersectionObserver<br />
                            • Videos: load poster only, play on viewport enter<br />
                            • Heavy embeds (maps, iframes): load on demand<br />
                            • Progressive images: blur placeholder → full resolution
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="text-yellow-400 font-bold text-sm">✨ Optimistic Updates</div>
                        <div className="text-slate-300 text-sm mt-1">
                            <strong>Problem:</strong> User clicks &quot;Like&quot; → waits 500ms for API → UI feels slow<br />
                            <strong>Solution:</strong> Update UI immediately, sync with server in background<br />
                            <strong>Rollback:</strong> If API fails → revert to previous state + show error toast<br /><br />
                            Works for: likes, comments, post creation, bookmarks
                        </div>
                    </div>
                </div>

                <CodeBlock title="news-feed-core.tsx">{`// === Optimistic Like ===
function useLikePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (postId: string) =>
      fetch(\`/api/posts/\${postId}/like\`, { method: 'POST' }),

    // Optimistic update: update UI before server responds
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

      return { previous } // save for rollback
    },

    // Rollback on error
    onError: (_, __, context) => {
      queryClient.setQueryData(['feed'], context?.previous)
      toast.error('Failed to like post')
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] })
    },
  })
}

// === Feed with Infinite Scroll + Virtualization ===
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

  // IntersectionObserver for infinite scroll
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
}

// === Feed Item ===
function FeedItem({ post }: { post: Post }) {
  const likePost = useLikePost()

  return (
    <article role="article" aria-labelledby={\`post-\${post.id}\`}>
      {/* Header */}
      <div className="flex items-center gap-3">
        <img src={post.author.avatar} alt="" className="rounded-full w-10 h-10" />
        <div>
          <div id={\`post-\${post.id}\`} className="font-bold">{post.author.name}</div>
          <time className="text-xs text-gray-500">
            {formatRelativeTime(post.createdAt)}
          </time>
        </div>
      </div>

      {/* Content */}
      <p className="mt-3">{post.content}</p>

      {/* Media — lazy loaded */}
      {post.images?.map((src, i) => (
        <img key={i} src={src} loading="lazy" alt={\`Post image \${i+1}\`} />
      ))}

      {/* Actions */}
      <div className="flex gap-4 mt-3">
        <button
          onClick={() => likePost.mutate(post.id)}
          aria-label={\`\${post.isLiked ? 'Unlike' : 'Like'} this post\`}
          aria-pressed={post.isLiked}
        >
          {post.isLiked ? '❤️' : '🤍'} {post.likeCount}
        </button>
        <button aria-label="Comment on this post">
          💬 {post.commentCount}
        </button>
        <button aria-label="Share this post">
          🔗 Share
        </button>
      </div>
    </article>
  )
}`}</CodeBlock>
                <Callout type="tip">Senior answer must include: <Highlight>Virtualization</Highlight> (for 10K+ posts), <Highlight>Optimistic updates</Highlight> (instant interactions), <Highlight>Cursor-based pagination</Highlight> (handles real-time insertions), <Highlight>Normalized store</Highlight> (single source of truth for entities).</Callout>
            </TopicModal>
        </div>

        <Heading3>Feed Accessibility</Heading3>
        <div className="my-4 space-y-2">
            <TopicModal title="Accessibility Deep Dive" emoji="♿" color="#38bdf8" summary="ARIA roles, keyboard navigation, screen reader support for news feeds">
                <Paragraph>Facebook and Twitter invest heavily in feed accessibility. Here are the <Highlight>key patterns</Highlight>:</Paragraph>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">📰 Feed List</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Add <InlineCode>role=&quot;feed&quot;</InlineCode> to the feed HTML element<br />
                            • <InlineCode>aria-busy=&quot;true&quot;</InlineCode> while loading new posts<br />
                            • <InlineCode>aria-label=&quot;News Feed&quot;</InlineCode> for screen readers
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">📄 Feed Posts</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Add <InlineCode>role=&quot;article&quot;</InlineCode> to each feed post HTML element<br />
                            • <InlineCode>aria-labelledby</InlineCode>: where the HTML tag containing the feed author name has that <InlineCode>id</InlineCode> attribute<br />
                            • Content within the feed post should be focusable via keyboard (add <InlineCode>tabIndex=&quot;0&quot;</InlineCode>) and the appropriate <InlineCode>aria-role</InlineCode>
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">👆 Feed Interactions</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • On Facebook website, users can have more reaction options by hovering over the &quot;Like&quot; button. To allow the same functionality for keyboard users, Facebook displays a button that only appears on focus and the reactions menu can be opened via that button<br />
                            • Icon-only buttons should have <InlineCode>aria-label</InlineCode>s if there are no accompanying labels (e.g. Twitter)
                        </div>
                    </div>
                </div>
            </TopicModal>
        </div>

        {/* ===== REFERENCES & RESOURCES ===== */}
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
            <a href="https://medium.com/nicasource/building-instagram-com-faster-part-2-1e1b4a6e0a7d" target="_blank" rel="noopener noreferrer" className="block text-blue-400 hover:text-blue-300 text-sm">→ Making Instagram.com faster: Part 2</a>
            <a href="https://medium.com/nicasource/building-instagram-com-faster-part-3-cache-first-6f3f130b9669" target="_blank" rel="noopener noreferrer" className="block text-blue-400 hover:text-blue-300 text-sm">→ Making Instagram.com faster: Part 3 — cache first</a>
            <a href="https://slack.engineering/evolving-api-pagination-at-slack/" target="_blank" rel="noopener noreferrer" className="block text-blue-400 hover:text-blue-300 text-sm">→ Evolving API Pagination at Slack</a>
        </div>
    </>
)
