'use client'
import { CodeBlock, Heading2, Heading3, Paragraph, Highlight, InlineCode, Callout } from '../../../components/BlogComponents'
import { TopicModal } from '../../../components/TopicModal'

export default function Phase5SystemDesign() {
    return (
        <>
            <Heading2>Phase 5 — Frontend System Design (4-6 weeks)</Heading2>

            <Paragraph>
                Unlike backend system design, <Highlight>Frontend System Design</Highlight> focuses on
                UI architecture, data flow, performance, and how to design scalable components.
            </Paragraph>

            <Heading3>5.1 Common Topics (click to see the design framework)</Heading3>
            <div className="my-4 space-y-2">
                <TopicModal title="Design a News Feed" emoji="📰" color="#a855f7" summary="Infinite scroll, virtualization, caching, optimistic update — the most common exercise" concept="News Feed requires: infinite scroll (IntersectionObserver + pagination), virtualization (only render items in viewport), caching strategy (stale-while-revalidate), optimistic updates (show like/comment immediately before server confirms). Plus: real-time updates (WebSocket/polling), image lazy loading, skeleton loading, pull-to-refresh.">
                    <Paragraph>Design a News Feed like Facebook/Twitter — this is the <Highlight>most classic</Highlight> FE System Design problem.</Paragraph>

                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <div className="text-purple-400 font-bold text-sm">🏗️ Component Architecture</div>
                            <div className="text-slate-300 text-sm mt-1">
                                <InlineCode>{'{\'<App> → <Feed> → <FeedItem> → <PostHeader>, <PostContent>, <MediaGallery>, <ActionBar>, <CommentSection>\'}'}</InlineCode><br />
                                • Each <strong>FeedItem</strong> is an independent render unit → easy to virtualize<br />
                                • <strong>ActionBar</strong>: Like, Comment, Share — each action is an independent component<br />
                                • <strong>CommentSection</strong>: lazy load, only fetch when user expands
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">📜 Infinite Scroll & Virtualization</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>IntersectionObserver</strong>: detect when sentinel enters viewport → trigger fetch<br />
                                • <strong>Cursor-based pagination</strong>: use lastPostId instead of page number (avoids duplicates when feed updates)<br />
                                • <strong>Virtualization</strong>: Only render ~20 visible items in DOM, unmount items outside viewport<br />
                                • Libraries: <strong>react-window</strong> or <strong>react-virtuoso</strong> — implement yourself if asked
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">💾 Data Model & Caching</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Normalize</strong>: posts by ID, users by ID — avoid duplicate data<br />
                                • <strong>Stale-while-revalidate</strong>: show cache immediately → background refetch<br />
                                • <strong>Optimistic update</strong>: Like on UI immediately → send API → rollback if fails<br />
                                • <strong>Cache invalidation</strong>: WebSocket event or polling every 30s
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                            <div className="text-yellow-400 font-bold text-sm">⚡ Performance</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Image lazy loading</strong>: loading={'"lazy"'} + placeholder blur<br />
                                • <strong>Code splitting</strong>: heavy components (video player, rich editor) → dynamic import<br />
                                • <strong>Skeleton loading</strong>: UI placeholder while fetching<br />
                                • <strong>Debounce scroll</strong>: prevent triggering too many fetches
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                            <div className="text-red-400 font-bold text-sm">♿ Accessibility & Edge Cases</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • Keyboard navigation through posts (Tab, Enter, Space)<br />
                                • Screen reader: aria-label for action buttons, aria-live for new posts<br />
                                • Focus management when loading more posts<br />
                                • Offline: show cached posts + banner {'"You are offline"'}
                            </div>
                        </div>
                    </div>

                    <CodeBlock title="news-feed-architecture.tsx">{`// Normalized data store
interface FeedState {
  posts: Record<string, Post>       // by ID
  users: Record<string, User>       // by ID
  feedIds: string[]                  // ordered list
  cursor: string | null              // for pagination
  hasMore: boolean
}

// Infinite scroll hook
function useInfiniteScroll(fetchMore: () => void) {
  const sentinelRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) fetchMore() },
      { rootMargin: '200px' }  // prefetch 200px ahead
    )
    if (sentinelRef.current) observer.observe(sentinelRef.current)
    return () => observer.disconnect()
  }, [fetchMore])
  return sentinelRef
}

// Optimistic like
function handleLike(postId: string) {
  // 1. Update UI immediately
  dispatch({ type: 'TOGGLE_LIKE', postId })
  // 2. Send API
  api.likePost(postId).catch(() => {
    // 3. Rollback on failure
    dispatch({ type: 'TOGGLE_LIKE', postId })
    toast.error('Could not like. Try again!')
  })
}`}</CodeBlock>

                    <Callout type="tip">
                        Interview: Start with <Highlight>component tree</Highlight> → discuss data flow →
                        zoom into infinite scroll + virtualization → mention optimization + a11y. Always ask: {'"Does the feed need real-time updates?"'} → decides polling vs WebSocket.
                    </Callout>
                </TopicModal>

                <TopicModal title="Design Autocomplete / Typeahead" emoji="🔍" color="#a855f7" summary="Debounce, caching, keyboard navigation — optimizing UX for search" concept="Autocomplete needs: debounce input (300ms), client-side cache (Map/LRU), keyboard navigation (↑↓ Enter Esc), highlight matching text, recent searches. Architecture: client cache → API call → server cache. Optimize: prefetch popular queries, trie for client-side filtering, cancel previous requests (AbortController).">
                    <Paragraph>Google Search, GitHub Code Search — a feature that seems simple but is <Highlight>extremely complex</Highlight>.</Paragraph>

                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <div className="text-purple-400 font-bold text-sm">🏗️ Component Architecture</div>
                            <div className="text-slate-300 text-sm mt-1">
                                <InlineCode>{'{\'<Autocomplete> → <SearchInput>, <SuggestionList> → <SuggestionItem>\'}'}</InlineCode><br />
                                • <strong>Combobox pattern</strong> (WAI-ARIA): input + listbox + options<br />
                                • <strong>Controlled component</strong>: parent manages query state<br />
                                • <strong>Portal</strong>: dropdown renders outside container (avoids overflow hidden)
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">🔄 Data Flow</div>
                            <div className="text-slate-300 text-sm mt-1">
                                1. User types → <strong>debounce 300ms</strong> → check cache → API call<br />
                                2. Check <strong>LRU cache</strong> first (by query prefix, max ~50 entries)<br />
                                3. Display results dropdown, <strong>highlight matching text</strong><br />
                                4. <strong>AbortController</strong>: cancel previous request when user keeps typing
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">⌨️ Keyboard Navigation</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>↑↓</strong>: navigate through suggestions (wrap around)<br />
                                • <strong>Enter</strong>: select highlighted item<br />
                                • <strong>Escape</strong>: close dropdown, clear selection<br />
                                • <strong>Tab</strong>: auto-complete inline (like terminal)<br />
                                • <strong>aria-activedescendant</strong>: screen reader knows which item is active
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                            <div className="text-yellow-400 font-bold text-sm">🚨 Edge Cases to Handle</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Race condition</strong>: user types fast → old response arrives after new one<br />
                                • Empty state, loading state, error state, no results state<br />
                                • Click outside to close, but clicking a suggestion → select<br />
                                • Mobile: virtual keyboard pushes content → dropdown positioning
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                            <div className="text-red-400 font-bold text-sm">⚡ Performance Optimization</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Trie</strong> for client-side filtering (if dataset is small)<br />
                                • <strong>Virtualize</strong> suggestion list if many results<br />
                                • <strong>Prefetch</strong>: popular queries cached before user types<br />
                                • <strong>Service Worker</strong>: cache API responses for offline
                            </div>
                        </div>
                    </div>

                    <CodeBlock title="autocomplete.tsx">{`// Debounce + AbortController + Cache
function useAutocomplete(query: string) {
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)
  const cache = useRef(new Map())       // LRU cache
  const abortRef = useRef<AbortController>()

  useEffect(() => {
    if (!query.trim()) { setSuggestions([]); return }

    // 1. Check cache
    if (cache.current.has(query)) {
      setSuggestions(cache.current.get(query))
      return
    }

    // 2. Cancel previous request
    abortRef.current?.abort()
    abortRef.current = new AbortController()

    const timer = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await fetch(\`/api/search?q=\${query}\`, {
          signal: abortRef.current!.signal
        })
        const data = await res.json()
        cache.current.set(query, data.suggestions)
        setSuggestions(data.suggestions)
      } catch (e) {
        if (e.name !== 'AbortError') console.error(e)
      } finally { setLoading(false) }
    }, 300) // debounce 300ms

    return () => clearTimeout(timer)
  }, [query])

  return { suggestions, loading }
}

// Highlight matching text
function HighlightMatch({ text, query }) {
  const idx = text.toLowerCase().indexOf(query.toLowerCase())
  if (idx === -1) return text
  return <>
    {text.slice(0, idx)}
    <mark>{text.slice(idx, idx + query.length)}</mark>
    {text.slice(idx + query.length)}
  </>
}`}</CodeBlock>

                    <Callout type="tip">
                        Interview: Ask immediately {'"How large is the dataset?"'} → decides <Highlight>client-side Trie</Highlight> or <Highlight>server-side search</Highlight>.
                        Mention race condition + AbortController — this is a big plus that many candidates miss.
                    </Callout>
                </TopicModal>

                <TopicModal title="Design a Chat Application" emoji="💬" color="#a855f7" summary="WebSocket, offline support, presence, message ordering — real-time system" concept="Chat requires: WebSocket for real-time (fallback to long-polling), message queue for ordering, offline support (IndexedDB + sync when online), presence system (online/typing indicators), optimistic sending, read receipts, message pagination (load from newest). Scale: room-based architecture, horizontal WebSocket scaling.">
                    <Paragraph>Design Messenger/Slack — a <Highlight>real-time communication system</Highlight> with many frontend challenges.</Paragraph>

                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <div className="text-purple-400 font-bold text-sm">🏗️ Component Architecture</div>
                            <div className="text-slate-300 text-sm mt-1">
                                <InlineCode>{'{\'<ChatApp> → <ConversationList>, <ChatWindow> → <MessageList>, <MessageInput>, <TypingIndicator>\'}'}</InlineCode><br />
                                • <strong>ConversationList</strong>: sorted by lastMessage timestamp<br />
                                • <strong>MessageList</strong>: virtualized, scroll-to-bottom by default<br />
                                • <strong>MessageInput</strong>: rich text, file upload, emoji picker
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">🔌 Real-time Communication</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>WebSocket</strong>: primary channel for real-time messages<br />
                                • <strong>Fallback</strong>: SSE → Long Polling (if WS blocked by proxy)<br />
                                • <strong>Reconnection</strong>: exponential backoff (1s → 2s → 4s → max 30s)<br />
                                • <strong>Heartbeat</strong>: ping/pong every 30s to detect disconnect
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">💾 Data Model & State</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Normalize</strong>: conversations by ID, messages by conversationId<br />
                                • <strong>Message status</strong>: sending → sent → delivered → read (4 states)<br />
                                • <strong>Optimistic send</strong>: display immediately with temp ID → replace when server confirms<br />
                                • <strong>Ordering</strong>: server-assigned timestamp, handle clock skew
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                            <div className="text-yellow-400 font-bold text-sm">📴 Offline Support</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>IndexedDB</strong>: cache messages + conversations locally<br />
                                • <strong>Outbox queue</strong>: queue messages when offline, auto-send on reconnect<br />
                                • <strong>Conflict resolution</strong>: server timestamp wins (last-write-wins)<br />
                                • <strong>Sync protocol</strong>: send lastSyncTimestamp → server sends delta
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                            <div className="text-red-400 font-bold text-sm">👤 Presence & Typing</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Online/offline</strong>: WS heartbeat + lastSeen timestamp<br />
                                • <strong>Typing indicator</strong>: debounce 500ms, auto-stop after 3s<br />
                                • <strong>Read receipts</strong>: batch send (group read events every 5s)<br />
                                • <strong>Unread count</strong>: badge per conversation, total in tab title
                            </div>
                        </div>
                    </div>

                    <CodeBlock title="chat-architecture.tsx">{`// WebSocket manager with reconnection
class ChatSocket {
  private ws: WebSocket | null = null
  private reconnectDelay = 1000

  connect(url: string) {
    this.ws = new WebSocket(url)
    this.ws.onmessage = (e) => {
      const msg = JSON.parse(e.data)
      switch (msg.type) {
        case 'message':    store.dispatch(addMessage(msg))
        case 'typing':     store.dispatch(setTyping(msg))
        case 'presence':   store.dispatch(updatePresence(msg))
        case 'read':       store.dispatch(markRead(msg))
      }
    }
    this.ws.onclose = () => this.reconnect(url)
  }

  private reconnect(url: string) {
    setTimeout(() => {
      this.reconnectDelay = Math.min(this.reconnectDelay * 2, 30000)
      this.connect(url)
    }, this.reconnectDelay)
  }
}

// Optimistic message send
function sendMessage(convId: string, text: string) {
  const tempId = \`temp_\${Date.now()}\`
  const optimistic = { id: tempId, text, status: 'sending', ts: Date.now() }

  // 1. Show immediately
  dispatch(addMessage(optimistic))
  scrollToBottom()

  // 2. Send via WS
  socket.send(JSON.stringify({ type: 'message', convId, text, tempId }))

  // 3. Server confirms → replace tempId with real ID
  // 4. If timeout 10s → mark as 'failed', show retry button
}`}</CodeBlock>

                    <Callout type="tip">
                        Interview: Ask immediately {'"1-1 chat or group chat?"'} + {'"Need offline support?"'}
                        Focus on <Highlight>WebSocket lifecycle</Highlight> (connect → reconnect → heartbeat) and <Highlight>message ordering</Highlight> — these are differentiators.
                    </Callout>
                </TopicModal>

                <TopicModal title="Design Google Docs (Collaborative Editor)" emoji="📝" color="#a855f7" summary="CRDT/OT, conflict resolution, cursor sync — the hardest problem" concept="Collaborative editing must resolve conflicts when multiple users edit simultaneously. OT (Operational Transform): transforms operations based on server order. CRDT (Conflict-free Replicated Data Types): auto-merge without conflicts. Plus: cursor sync (broadcast positions), undo/redo (operation log), offline editing (queue operations), presence awareness.">
                    <Paragraph>This is a <Highlight>Hard level</Highlight> problem — many people get stuck because they don&apos;t understand CRDT/OT.</Paragraph>

                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <div className="text-purple-400 font-bold text-sm">🏗️ Component Architecture</div>
                            <div className="text-slate-300 text-sm mt-1">
                                <InlineCode>{'{\'<Editor> → <Toolbar>, <DocumentBody>, <CursorOverlay>, <CommentSidebar>\'}'}</InlineCode><br />
                                • <strong>DocumentBody</strong>: contenteditable div or custom renderer<br />
                                • <strong>CursorOverlay</strong>: layer displaying collaborator cursors<br />
                                • <strong>Toolbar</strong>: formatting commands (bold, italic, heading, list)
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                            <div className="text-red-400 font-bold text-sm">⚔️ OT vs CRDT</div>
                            <div className="text-slate-300 text-sm mt-1">
                                <strong>OT (Operational Transform)</strong>:<br />
                                • Transform operations against each other to maintain consistency<br />
                                • Requires a <strong>central server</strong> to order operations<br />
                                • Used by Google Docs, Etherpad<br /><br />
                                <strong>CRDT (Conflict-free Replicated Data Type)</strong>:<br />
                                • Data structure designed to auto-merge without conflicts<br />
                                • <strong>No central server needed</strong> — P2P possible<br />
                                • Used by Figma, Notion, Yjs
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">🔄 Collaboration Flow</div>
                            <div className="text-slate-300 text-sm mt-1">
                                1. User edits → creates an <strong>operation</strong> (insert/delete/format)<br />
                                2. Apply locally immediately (optimistic)<br />
                                3. Send operation via <strong>WebSocket</strong> to server<br />
                                4. Server broadcasts + <strong>transforms</strong> if concurrent edits<br />
                                5. Clients receive + apply transformed operations
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">🔧 Key Technical Components</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Rich text editor</strong>: Slate.js, ProseMirror, Tiptap<br />
                                • <strong>Cursor awareness</strong>: display cursor + name + color per user<br />
                                • <strong>Version history</strong>: snapshot every 5 min + incremental changes<br />
                                • <strong>Permissions</strong>: read / write / comment per user<br />
                                • <strong>Undo/Redo</strong>: per-user undo stack (don&apos;t undo other people&apos;s edits)
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                            <div className="text-yellow-400 font-bold text-sm">⚡ Performance & Scale</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Document chunking</strong>: split large documents into pages/blocks<br />
                                • <strong>Lazy rendering</strong>: only render visible blocks (like virtualization)<br />
                                • <strong>Batching operations</strong>: group rapid keystrokes → send 1 batch<br />
                                • <strong>Presence throttle</strong>: cursor position update max 10fps
                            </div>
                        </div>
                    </div>

                    <CodeBlock title="collaborative-editor.ts">{`// Simplified OT: Insert operation
interface Operation {
  type: 'insert' | 'delete'
  position: number
  char?: string     // for insert
  count?: number    // for delete
  userId: string
  version: number   // lamport clock
}

// Transform: resolve concurrent edits
function transform(op1: Operation, op2: Operation): Operation {
  // op2 was applied first → adjust op1
  if (op1.type === 'insert' && op2.type === 'insert') {
    if (op1.position > op2.position) {
      return { ...op1, position: op1.position + 1 }
    }
  }
  if (op1.type === 'insert' && op2.type === 'delete') {
    if (op1.position > op2.position) {
      return { ...op1, position: op1.position - op2.count! }
    }
  }
  return op1
}

// Cursor sync
interface CursorInfo {
  userId: string
  name: string
  color: string      // unique color per user
  position: number   // character offset
  selection?: { start: number; end: number }
}
// → Render colored cursor + name label at position`}</CodeBlock>

                    <Callout type="tip">
                        Interview: <Highlight>You don&apos;t need to fully implement CRDT/OT</Highlight> — just explain the concept and trade-offs.
                        Focus on: {'"OT needs server, CRDT doesn\'t"'}, cursor sync, and version history. Draw a sequence diagram for 2 users editing simultaneously.
                    </Callout>
                </TopicModal>

                <TopicModal title="Design a Design System" emoji="🎨" color="#a855f7" summary="Component library, design tokens, theming, versioning — real-world Sr. Frontend interview question" concept="Design System includes: Design Tokens (colors, spacing, typography as variables), Component Library (atoms → molecules → organisms), Theming (CSS variables + provider pattern), Documentation (Storybook), Versioning (semantic versioning), Accessibility (WCAG built-in). Goal: consistency across products, developer productivity.">
                    <Paragraph>Design a Design System like <Highlight>Material UI, Ant Design, Chakra UI</Highlight> — a very common question for Senior/Staff Frontend positions.</Paragraph>

                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <div className="text-purple-400 font-bold text-sm">🏗️ Architecture Overview</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Design Tokens</strong>: Color, spacing, typography, shadows — single source of truth<br />
                                • <strong>Core Components</strong>: Button, Input, Select, Modal, Toast, etc.<br />
                                • <strong>Theming Layer</strong>: Light/dark mode, brand customization via CSS variables<br />
                                • <strong>Documentation</strong>: Storybook + MDX for interactive docs<br />
                                • <strong>Distribution</strong>: NPM package, tree-shakeable exports
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">🎯 Interview Focus: Component API Design</div>
                            <div className="text-slate-300 text-sm mt-1">The key thing interviewers evaluate: designing APIs that are <strong>flexible yet consistent</strong>.<br />
                                • <strong>Variant pattern</strong>: {'<Button variant="primary" size="md">'}<br />
                                • <strong>Compound components</strong>: {'<Select><Select.Option /><Select.Group /></Select>'}<br />
                                • <strong>Polymorphic {'"as"'} prop</strong>: {'<Button as="a" href="/home">'} — render as different elements<br />
                                • <strong>Slot pattern</strong>: startIcon, endIcon, prefix, suffix
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">📐 Design Tokens</div>
                            <div className="text-slate-300 text-sm mt-1">
                                Tokens = primitive values referenced by all components. Change 1 token = update the entire UI.<br />
                                • <strong>Primitive</strong>: blue-500 = #3b82f6<br />
                                • <strong>Semantic</strong>: color-primary = blue-500, color-danger = red-500<br />
                                • <strong>Component</strong>: button-bg-primary = color-primary<br />
                                → 3 layers for maximum flexibility
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                            <div className="text-yellow-400 font-bold text-sm">♿ Accessibility (a11y) — REQUIRED</div>
                            <div className="text-slate-300 text-sm mt-1">
                                A Design System must be <strong>accessible by default</strong>:<br />
                                • Every interactive element has a <strong>focus ring</strong> (keyboard nav)<br />
                                • Color contrast ratio ≥ 4.5:1 (WCAG AA)<br />
                                • ARIA attributes built-in: <strong>role, aria-label, aria-expanded</strong><br />
                                • Focus trap in Modal, Sheet, Dialog
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                            <div className="text-red-400 font-bold text-sm">📦 Versioning & Breaking Changes</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Semver</strong>: major (breaking), minor (feature), patch (fix)<br />
                                • <strong>Codemods</strong>: scripts to auto-migrate code on breaking changes<br />
                                • <strong>Deprecation warnings</strong>: warn 1 major version before removing<br />
                                • <strong>Changelogs</strong>: auto-generate from conventional commits
                            </div>
                        </div>
                    </div>

                    <CodeBlock title="design-system-button.tsx">{`// Example: Button component API — flexible, type-safe, accessible
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  as?: React.ElementType  // polymorphic: render as <a>, <Link>, etc.
  children: React.ReactNode
}

// Design tokens → CSS variables → component styles
const tokens = {
  colors: {
    primary: { base: '#3b82f6', hover: '#2563eb', active: '#1d4ed8' },
    danger:  { base: '#ef4444', hover: '#dc2626', active: '#b91c1c' },
  },
  spacing: { sm: '8px', md: '12px', lg: '16px' },
  radius:  { sm: '6px', md: '8px', lg: '12px' },
}

// Compound component pattern for Select
// <Select>
//   <Select.Trigger>Choose...</Select.Trigger>
//   <Select.Content>
//     <Select.Group label="Fruits">
//       <Select.Item value="apple">🍎 Apple</Select.Item>
//       <Select.Item value="banana">🍌 Banana</Select.Item>
//     </Select.Group>
//   </Select.Content>
// </Select>

// Theming — CSS variables approach
// :root { --color-primary: #3b82f6; }
// [data-theme="dark"] { --color-primary: #60a5fa; }
// → Components only use var(--color-primary)
// → Switching theme = changing variables, not components`}</CodeBlock>

                    <Callout type="tip">
                        Interview tip: Start with <Highlight>1 specific component</Highlight> (e.g. Button) → discuss API design →
                        expand to tokens, theming, versioning. Don&apos;t try to cover everything — interviewers want to see <Highlight>depth, not breadth</Highlight>.
                    </Callout>
                </TopicModal>

                <TopicModal title="Kubernetes & Cloud Run — Deploy Frontend" emoji="☸️" color="#326CE5" summary="Container orchestration, serverless deploy, Dockerfile, scaling — deploying Next.js to production" concept="Docker: package app + dependencies into containers. Dockerfile: build image (multi-stage: build → production). Kubernetes: orchestrate multiple containers (pods, services, deployments, auto-scaling). Cloud Run: serverless containers, pay only when handling requests. CI/CD: GitHub Actions → build image → push registry → deploy. Frontend: static export (CDN) vs server-side (container).">
                    <Paragraph>Knowing how to deploy apps on <Highlight>Kubernetes (K8s)</Highlight> or <Highlight>Cloud Run</Highlight> is an important skill for Senior Frontend. You don&apos;t need to become a DevOps expert, but understanding containers + orchestration is essential.</Paragraph>

                    <Callout type="info">🚗 <strong>Analogy: Deploy = Fleet Management</strong><br /><br />
                        <strong>Traditional VPS</strong> = Driving your own car → manage everything (gas, repairs, parking)<br />
                        <strong>Cloud Run</strong> = Calling a Grab/Uber → <Highlight>pay only when riding</Highlight>, no car to maintain<br />
                        <strong>Kubernetes</strong> = Managing a bus fleet → <Highlight>decide how many buses, which routes</Highlight>, complex but powerful
                    </Callout>

                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-gray-500/10 border border-gray-500/20">
                            <div className="text-gray-300 font-bold text-sm">📊 Comparison: K8s vs Cloud Run vs VPS</div>
                            <div className="text-slate-300 text-sm mt-2">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-xs">
                                        <thead>
                                            <tr className="border-b border-white/10">
                                                <th className="text-left py-1.5 pr-2 text-slate-400 font-semibold">Criteria</th>
                                                <th className="text-left py-1.5 pr-2 text-slate-400 font-semibold">VPS (Oracle/AWS EC2)</th>
                                                <th className="text-left py-1.5 pr-2 text-slate-400 font-semibold">Cloud Run</th>
                                                <th className="text-left py-1.5 text-slate-400 font-semibold">Kubernetes (GKE/EKS)</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-slate-300">
                                            <tr className="border-b border-white/5"><td className="py-1.5 pr-2 font-semibold">Setup</td><td className="py-1.5 pr-2">SSH + manual</td><td className="py-1.5 pr-2 text-green-400 font-bold">1 command</td><td className="py-1.5">Complex</td></tr>
                                            <tr className="border-b border-white/5"><td className="py-1.5 pr-2 font-semibold">Auto-scale</td><td className="py-1.5 pr-2">No</td><td className="py-1.5 pr-2 text-green-400 font-bold">0 → N automatic</td><td className="py-1.5 text-blue-400">Yes (HPA)</td></tr>
                                            <tr className="border-b border-white/5"><td className="py-1.5 pr-2 font-semibold">Scale to zero</td><td className="py-1.5 pr-2">No</td><td className="py-1.5 pr-2 text-green-400 font-bold">Yes</td><td className="py-1.5">Yes (KEDA)</td></tr>
                                            <tr className="border-b border-white/5"><td className="py-1.5 pr-2 font-semibold">Cost</td><td className="py-1.5 pr-2">Fixed/month</td><td className="py-1.5 pr-2">Pay per request</td><td className="py-1.5">Cluster fee + nodes</td></tr>
                                            <tr className="border-b border-white/5"><td className="py-1.5 pr-2 font-semibold">Control</td><td className="py-1.5 pr-2 text-blue-400">Full control</td><td className="py-1.5 pr-2">Limited</td><td className="py-1.5 text-blue-400 font-bold">Full control</td></tr>
                                            <tr><td className="py-1.5 pr-2 font-semibold">Best for</td><td className="py-1.5 pr-2">Side projects</td><td className="py-1.5 pr-2">Startups/MVPs</td><td className="py-1.5">Enterprise</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">☸️ Kubernetes — Core Concepts</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Pod</strong> = 1 container running an app (smallest unit)<br />
                                • <strong>Deployment</strong> = manages multiple pods (replicas, rolling updates)<br />
                                • <strong>Service</strong> = exposes pods externally (ClusterIP, LoadBalancer)<br />
                                • <strong>Ingress</strong> = HTTP routing (domain → service)<br />
                                • <strong>HPA</strong> = auto-scale pods based on CPU/memory/custom metrics
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">☁️ Cloud Run — Serverless Container</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Push Docker image</strong> → Cloud Run runs it instantly, no K8s cluster needed<br />
                                • <Highlight>Scale to zero</Highlight>: no requests → no containers → no cost<br />
                                • Auto-scales 0 → N instances based on traffic<br />
                                • Automatic HTTPS, custom domains, revision management<br />
                                • <strong>Free tier</strong>: 2 million requests/month — enough for side projects
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                            <div className="text-yellow-400 font-bold text-sm">🎯 When to use what?</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Cloud Run</strong>: startups, MVPs, APIs, SSR Next.js — <Highlight>simple, fast, cheap</Highlight><br />
                                • <strong>K8s</strong>: enterprise, microservices, need service mesh, custom networking<br />
                                • <strong>VPS</strong>: side projects, need full control, fixed budget<br />
                                • <strong>Vercel/Netlify</strong>: static sites, JAMstack — no Docker needed
                            </div>
                        </div>
                    </div>
                    <CodeBlock title="deploy-nextjs.yaml">{`# ═══ 1. Dockerfile for Next.js (Multi-stage build) ═══
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
# → Image size ~150MB (vs ~1GB without multi-stage)

# ═══ 2. Kubernetes — deployment.yaml ═══
apiVersion: apps/v1
kind: Deployment
metadata:
  name: shop-management
spec:
  replicas: 2                    # run 2 pods
  selector:
    matchLabels:
      app: shop-management
  template:
    metadata:
      labels:
        app: shop-management
    spec:
      containers:
      - name: app
        image: gcr.io/my-project/shop-management:latest
        ports:
        - containerPort: 3000
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        env:
        - name: MONGODB_URI
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: mongodb-uri
---
apiVersion: v1
kind: Service
metadata:
  name: shop-management-svc
spec:
  type: LoadBalancer
  ports:
  - port: 80
    targetPort: 3000
  selector:
    app: shop-management
---
# HPA — auto-scale 2→10 pods when CPU > 70%
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: shop-management
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70

# ═══ 3. Cloud Run — Deploy in 1 command ═══
# Build + push Docker image
# gcloud builds submit --tag gcr.io/my-project/shop-management
#
# Deploy to Cloud Run
# gcloud run deploy shop-management \\
#   --image gcr.io/my-project/shop-management \\
#   --platform managed \\
#   --region asia-southeast1 \\
#   --allow-unauthenticated \\
#   --memory 512Mi \\
#   --min-instances 0 \\
#   --max-instances 10 \\
#   --set-env-vars "NODE_ENV=production"
#
# → URL: https://shop-management-xxx.a.run.app
# → Auto HTTPS, auto-scale, scale to zero!`}</CodeBlock>
                    <Callout type="tip">Interview: Senior Frontend engineers should know how to deploy apps in containers. When asked {'"How do you scale a frontend?"'} → <Highlight>Cloud Run for serverless (simple) or K8s + HPA for enterprise (full control)</Highlight>. Bonus: mention multi-stage Docker builds reducing image size from 1GB to 150MB.</Callout>
                </TopicModal>

                <TopicModal title="Functional vs Non-Functional Requirements" emoji="📋" color="#f59e0b" summary="The first step in System Design — distinguishing 'what it does' vs 'how well it does it'" concept="Functional Requirements: what the app does (features, user stories, API endpoints). Non-Functional Requirements: how well it does it (performance, scalability, availability, security, accessibility). In interviews: always list/ask about both before designing. Prioritize non-functional by context: e-commerce needs availability, banking needs consistency.">
                    <Paragraph>When starting any System Design problem, the first step is <Highlight>Clarify Requirements</Highlight>. You must clearly distinguish 2 types:</Paragraph>

                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">🔧 Functional Requirements — &quot;What does it DO?&quot;</div>
                            <div className="text-slate-300 text-sm mt-1">
                                Describes <strong>specific features</strong> the system must perform. What can users do?<br /><br />
                                <strong>E-commerce example:</strong><br />
                                • User sign up, login<br />
                                • Add products to cart<br />
                                • Checkout with Stripe/PayPal<br />
                                • Admin views order list<br />
                                • System sends confirmation email<br /><br />
                                → Measured by: <Highlight>&quot;Click button X → does result Y happen?&quot;</Highlight>
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <div className="text-purple-400 font-bold text-sm">⚡ Non-Functional Requirements — &quot;HOW WELL does it work?&quot;</div>
                            <div className="text-slate-300 text-sm mt-1">
                                Describes the <strong>quality</strong> of the system. Fast/secure/scalable?<br /><br />
                                <strong>Same E-commerce example:</strong><br />
                                • ⚡ <strong>Performance</strong> — page loads in {'<'} 2 seconds<br />
                                • 📈 <strong>Scalability</strong> — handles 10,000 concurrent users<br />
                                • 🔒 <strong>Security</strong> — HTTPS, CSRF protection, password hashing<br />
                                • ♿ <strong>Accessibility</strong> — WCAG 2.1 AA compliant<br />
                                • 🌍 <strong>Availability</strong> — 99.9% uptime<br />
                                • 📱 <strong>Responsiveness</strong> — works on mobile, tablet, desktop<br /><br />
                                → Measured by: <Highlight>metrics, benchmarks, SLAs</Highlight>
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                            <div className="text-yellow-400 font-bold text-sm">🏠 Analogy: &quot;Building a House&quot;</div>
                            <div className="text-slate-300 text-sm mt-1">
                                <strong>Functional</strong> = 🏗️ <strong>Rooms in the house</strong> — bedrooms, kitchen, bathroom<br />
                                <strong>Non-Functional</strong> = 🏗️ <strong>Quality of the house</strong> — heat insulation, soundproofing, energy efficiency<br /><br />
                                Missing Functional → no rooms → <Highlight>can&apos;t live in it</Highlight><br />
                                Missing Non-Functional → hot, noisy, leaky → <Highlight>livable but miserable</Highlight>
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">🎯 Applying in Interviews</div>
                            <div className="text-slate-300 text-sm mt-1">
                                When asked {`"Design a chat app"`}, list <strong>both</strong>:<br /><br />
                                <strong>📋 Functional:</strong><br />
                                • Send/receive messages in real-time<br />
                                • Create group chats, send images/files<br />
                                • Typing indicator, read receipts<br /><br />
                                <strong>⚡ Non-Functional:</strong><br />
                                • Latency {'<'} 100ms for messages<br />
                                • Offline support (queue messages)<br />
                                • E2E encryption, 1M+ concurrent users<br /><br />
                                → Interviewers <Highlight>highly value</Highlight> when you proactively mention NFRs before being asked!
                            </div>
                        </div>
                    </div>

                    <Callout type="tip">Interview: Always start with {`"Let me clarify requirements first"`}. List <Highlight>FR first, NFR second</Highlight>. This is step 1 of the 5-step framework — shows you think like a senior, not just jumping into code.</Callout>
                </TopicModal>
            </div>

            <Heading3>5.2 Answer Framework</Heading3>

            <div className="my-6 p-4 rounded-xl bg-[var(--bg-tag)] border border-[var(--border-primary)]">
                <div className="text-center text-sm text-slate-400 mb-3 font-medium">📋 Frontend System Design Framework</div>
                <div className="flex flex-col items-center gap-2 text-sm">
                    <div className="px-4 py-2 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30 w-fit"><strong>1. Clarify</strong> — Ask about requirements, scope, constraints</div>
                    <div className="text-slate-600">↓</div>
                    <div className="px-4 py-2 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30 w-fit"><strong>2. Component Architecture</strong> — Draw the component tree</div>
                    <div className="text-slate-600">↓</div>
                    <div className="px-4 py-2 rounded-lg bg-green-500/20 text-green-300 border border-green-500/30 w-fit"><strong>3. Data Model & API</strong> — State shape, API design</div>
                    <div className="text-slate-600">↓</div>
                    <div className="px-4 py-2 rounded-lg bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 w-fit"><strong>4. Optimization</strong> — Performance, caching, lazy load</div>
                    <div className="text-slate-600">↓</div>
                    <div className="px-4 py-2 rounded-lg bg-red-500/20 text-red-300 border border-red-500/30 w-fit"><strong>5. Accessibility & Edge Cases</strong> — a11y, error handling, offline</div>
                </div>
            </div>

            <Heading3>5.3 Resources</Heading3>
            <div className="my-4 space-y-2">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                    <span className="text-purple-400">📕</span>
                    <span className="text-slate-300 text-sm"><strong>GreatFrontEnd</strong> — excellent System Design section</span>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                    <span className="text-purple-400">📗</span>
                    <span className="text-slate-300 text-sm"><strong>frontendmastery.com</strong> — deep-dive articles on FE architecture</span>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                    <span className="text-purple-400">📘</span>
                    <span className="text-slate-300 text-sm"><strong>YouTube: &quot;Frontend System Design&quot;</strong> — channels: Chirag Goel, Evgeniy</span>
                </div>
            </div>

            {/* ===== PHASE 6 ===== */}
        </>
    )
}
