'use client'
import { CodeBlock, Heading2, Heading3, Paragraph, Highlight, InlineCode, Callout } from '../../components/BlogComponents'
import { TopicModal } from '../../components/TopicModal'

export default function Phase5SystemDesign() {
    return (
        <>
            <Heading2>Phase 5 — Frontend System Design (4-6 tuần)</Heading2>

            <Paragraph>
                Khác với backend system design, <Highlight>Frontend System Design</Highlight> tập trung vào
                kiến trúc UI, data flow, performance, và cách thiết kế component scalable.
            </Paragraph>

            <Heading3>5.1 Các topic thường gặp (click để xem framework thiết kế)</Heading3>
            <div className="my-4 space-y-2">
                <TopicModal title="Design a News Feed" emoji="📰" color="#a855f7" summary="Infinite scroll, virtualization, caching, optimistic update — bài tập phổ biến nhất">
                    <Paragraph>Thiết kế News Feed như Facebook/Twitter — đây là bài <Highlight>classic nhất</Highlight> trong FE System Design.</Paragraph>

                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <div className="text-purple-400 font-bold text-sm">🏗️ Component Architecture</div>
                            <div className="text-slate-300 text-sm mt-1">
                                <InlineCode>{'{\'<App> → <Feed> → <FeedItem> → <PostHeader>, <PostContent>, <MediaGallery>, <ActionBar>, <CommentSection>\'}'}</InlineCode><br />
                                • Mỗi <strong>FeedItem</strong> là unit render riêng biệt → dễ virtualize<br />
                                • <strong>ActionBar</strong>: Like, Comment, Share — mỗi action là independent component<br />
                                • <strong>CommentSection</strong>: lazy load, chỉ fetch khi user expand
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">📜 Infinite Scroll & Virtualization</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>IntersectionObserver</strong>: detect khi sentinel element vào viewport → trigger fetch<br />
                                • <strong>Cursor-based pagination</strong>: dùng lastPostId thay vì page number (tránh duplicate khi feed update)<br />
                                • <strong>Virtualization</strong>: Chỉ render ~20 items visible trong DOM, unmount items ngoài viewport<br />
                                • Library: <strong>react-window</strong> hoặc <strong>react-virtuoso</strong> — tự implement nếu được hỏi
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">💾 Data Model & Caching</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Normalize</strong>: posts by ID, users by ID — tránh duplicate data<br />
                                • <strong>Stale-while-revalidate</strong>: show cache ngay → background refetch<br />
                                • <strong>Optimistic update</strong>: Like ngay trên UI → gửi API → rollback nếu fail<br />
                                • <strong>Cache invalidation</strong>: WebSocket event hoặc polling mỗi 30s
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                            <div className="text-yellow-400 font-bold text-sm">⚡ Performance</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Image lazy loading</strong>: loading={'"lazy"'} + placeholder blur<br />
                                • <strong>Code splitting</strong>: heavy components (video player, rich editor) → dynamic import<br />
                                • <strong>Skeleton loading</strong>: UI placeholder trong lúc fetch<br />
                                • <strong>Debounce scroll</strong>: tránh trigger quá nhiều fetch
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                            <div className="text-red-400 font-bold text-sm">♿ Accessibility & Edge Cases</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • Keyboard navigation qua posts (Tab, Enter, Space)<br />
                                • Screen reader: aria-label cho action buttons, aria-live cho new posts<br />
                                • Focus management khi load thêm posts<br />
                                • Offline: show cached posts + banner {'"Bạn đang offline"'}
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
      { rootMargin: '200px' }  // prefetch trước 200px
    )
    if (sentinelRef.current) observer.observe(sentinelRef.current)
    return () => observer.disconnect()
  }, [fetchMore])
  return sentinelRef
}

// Optimistic like
function handleLike(postId: string) {
  // 1. Update UI ngay
  dispatch({ type: 'TOGGLE_LIKE', postId })
  // 2. Gửi API
  api.likePost(postId).catch(() => {
    // 3. Rollback nếu fail
    dispatch({ type: 'TOGGLE_LIKE', postId })
    toast.error('Không thể like. Thử lại!')
  })
}`}</CodeBlock>

                    <Callout type="tip">
                        Interview: Bắt đầu từ <Highlight>component tree</Highlight> → discuss data flow →
                        zoom vào infinite scroll + virtualization → nhắc optimization + a11y. Luôn hỏi: {'"Feed có real-time update không?"'} → quyết định polling vs WebSocket.
                    </Callout>
                </TopicModal>

                <TopicModal title="Design Autocomplete / Typeahead" emoji="🔍" color="#a855f7" summary="Debounce, caching, keyboard navigation — tối ưu UX cho search">
                    <Paragraph>Google Search, GitHub Code Search — chức năng tưởng đơn giản nhưng <Highlight>cực kỳ complex</Highlight>.</Paragraph>

                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <div className="text-purple-400 font-bold text-sm">🏗️ Component Architecture</div>
                            <div className="text-slate-300 text-sm mt-1">
                                <InlineCode>{'{\'<Autocomplete> → <SearchInput>, <SuggestionList> → <SuggestionItem>\'}'}</InlineCode><br />
                                • <strong>Combobox pattern</strong> (WAI-ARIA): input + listbox + options<br />
                                • <strong>Controlled component</strong>: parent quản lý query state<br />
                                • <strong>Portal</strong>: dropdown render ngoài container (tránh overflow hidden)
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">🔄 Data Flow</div>
                            <div className="text-slate-300 text-sm mt-1">
                                1. User type → <strong>debounce 300ms</strong> → check cache → API call<br />
                                2. Check <strong>LRU cache</strong> trước (by query prefix, max ~50 entries)<br />
                                3. Hiển thị results dropdown, <strong>highlight matching text</strong><br />
                                4. <strong>AbortController</strong>: cancel previous request khi user tiếp tục gõ
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">⌨️ Keyboard Navigation</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>↑↓</strong>: navigate qua suggestions (wrap around)<br />
                                • <strong>Enter</strong>: select highlighted item<br />
                                • <strong>Escape</strong>: close dropdown, clear selection<br />
                                • <strong>Tab</strong>: auto-complete inline (giống terminal)<br />
                                • <strong>aria-activedescendant</strong>: screen reader biết item nào đang active
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                            <div className="text-yellow-400 font-bold text-sm">🚨 Edge Cases phải handle</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Race condition</strong>: user type nhanh → response cũ về sau response mới<br />
                                • Empty state, loading state, error state, no results state<br />
                                • Click outside to close, nhưng click vào suggestion → select<br />
                                • Mobile: virtual keyboard pushes content → dropdown position
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                            <div className="text-red-400 font-bold text-sm">⚡ Performance Optimization</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Trie</strong> cho client-side filtering (nếu dataset nhỏ)<br />
                                • <strong>Virtualize</strong> danh sách suggestions nếu nhiều results<br />
                                • <strong>Prefetch</strong>: popular queries cached trước khi user gõ<br />
                                • <strong>Service Worker</strong>: cache API responses offline
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
                        Interview: Hỏi ngay {'"Dataset bao lớn?"'} → quyết định <Highlight>client-side Trie</Highlight> hay <Highlight>server-side search</Highlight>.
                        Nhắc race condition + AbortController — đây là điểm cộng lớn mà nhiều candidate bỏ qua.
                    </Callout>
                </TopicModal>

                <TopicModal title="Design a Chat Application" emoji="💬" color="#a855f7" summary="WebSocket, offline support, presence, message ordering — real-time system">
                    <Paragraph>Design Messenger/Slack — <Highlight>real-time communication system</Highlight> với nhiều thử thách frontend.</Paragraph>

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
                                • <strong>WebSocket</strong>: primary channel cho real-time messages<br />
                                • <strong>Fallback</strong>: SSE → Long Polling (nếu WS bị block bởi proxy)<br />
                                • <strong>Reconnection</strong>: exponential backoff (1s → 2s → 4s → max 30s)<br />
                                • <strong>Heartbeat</strong>: ping/pong mỗi 30s để detect disconnect
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">💾 Data Model & State</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Normalize</strong>: conversations by ID, messages by conversationId<br />
                                • <strong>Message status</strong>: sending → sent → delivered → read (4 states)<br />
                                • <strong>Optimistic send</strong>: hiển thị ngay với temp ID → replace khi server confirm<br />
                                • <strong>Ordering</strong>: server-assigned timestamp, handle clock skew
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                            <div className="text-yellow-400 font-bold text-sm">📴 Offline Support</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>IndexedDB</strong>: cache messages + conversations locally<br />
                                • <strong>Outbox queue</strong>: queue messages khi offline, auto-send khi reconnect<br />
                                • <strong>Conflict resolution</strong>: server timestamp wins (last-write-wins)<br />
                                • <strong>Sync protocol</strong>: gửi lastSyncTimestamp → server gửi delta
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                            <div className="text-red-400 font-bold text-sm">👤 Presence & Typing</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Online/offline</strong>: WS heartbeat + lastSeen timestamp<br />
                                • <strong>Typing indicator</strong>: debounce 500ms, auto-stop sau 3s<br />
                                • <strong>Read receipts</strong>: batch send (mỗi 5s group read events)<br />
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
                        Interview: Hỏi ngay {'"1-1 chat hay group chat?"'} + {'"Cần offline support không?"'}
                        Focus vào <Highlight>WebSocket lifecycle</Highlight> (connect → reconnect → heartbeat) và <Highlight>message ordering</Highlight> — đây là điểm differentiator.
                    </Callout>
                </TopicModal>

                <TopicModal title="Design Google Docs (Collaborative Editor)" emoji="📝" color="#a855f7" summary="CRDT/OT, conflict resolution, cursor sync — bài khó nhất">
                    <Paragraph>Đây là bài <Highlight>level Hard</Highlight> — nhiều người chặn ở đây vì không hiểu CRDT/OT.</Paragraph>

                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <div className="text-purple-400 font-bold text-sm">🏗️ Component Architecture</div>
                            <div className="text-slate-300 text-sm mt-1">
                                <InlineCode>{'{\'<Editor> → <Toolbar>, <DocumentBody>, <CursorOverlay>, <CommentSidebar>\'}'}</InlineCode><br />
                                • <strong>DocumentBody</strong>: contenteditable div hoặc custom renderer<br />
                                • <strong>CursorOverlay</strong>: layer hiển thị cursors của collaborators<br />
                                • <strong>Toolbar</strong>: formatting commands (bold, italic, heading, list)
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                            <div className="text-red-400 font-bold text-sm">⚔️ OT vs CRDT</div>
                            <div className="text-slate-300 text-sm mt-1">
                                <strong>OT (Operational Transform)</strong>:<br />
                                • Transform operations against each other to maintain consistency<br />
                                • Cần <strong>central server</strong> để order operations<br />
                                • Google Docs, Etherpad dùng<br /><br />
                                <strong>CRDT (Conflict-free Replicated Data Type)</strong>:<br />
                                • Data structure designed to auto-merge without conflicts<br />
                                • <strong>Không cần central server</strong> — P2P possible<br />
                                • Figma, Notion, Yjs dùng
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">🔄 Collaboration Flow</div>
                            <div className="text-slate-300 text-sm mt-1">
                                1. User edit → tạo <strong>operation</strong> (insert/delete/format)<br />
                                2. Apply locally ngay (optimistic)<br />
                                3. Gửi operation qua <strong>WebSocket</strong> đến server<br />
                                4. Server broadcast + <strong>transform</strong> nếu concurrent edits<br />
                                5. Clients nhận + apply transformed operations
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">🔧 Key Technical Components</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Rich text editor</strong>: Slate.js, ProseMirror, Tiptap<br />
                                • <strong>Cursor awareness</strong>: hiển thị cursor + tên + color per user<br />
                                • <strong>Version history</strong>: snapshot mỗi 5 phút + incremental changes<br />
                                • <strong>Permissions</strong>: read / write / comment per user<br />
                                • <strong>Undo/Redo</strong>: per-user undo stack (không undo edit của người khác)
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                            <div className="text-yellow-400 font-bold text-sm">⚡ Performance & Scale</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Document chunking</strong>: chia document lớn thành pages/blocks<br />
                                • <strong>Lazy rendering</strong>: chỉ render visible blocks (giống virtualization)<br />
                                • <strong>Batching operations</strong>: group rapid keystrokes → gửi 1 batch<br />
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
  // op2 đã apply trước → adjust op1
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
// → Render colored cursor + name label tại position`}</CodeBlock>

                    <Callout type="tip">
                        Interview: <Highlight>Không cần implement CRDT/OT full</Highlight> — chỉ cần giải thích concept và trade-offs.
                        Focus vào: {'"OT cần server, CRDT không cần"'}, cursor sync, và version history. Vẽ sequence diagram cho 2 users edit cùng lúc.
                    </Callout>
                </TopicModal>

                <TopicModal title="Design a Design System" emoji="🎨" color="#a855f7" summary="Component library, design tokens, theming, versioning — bài phỏng vấn thực tế cho Sr. Frontend">
                    <Paragraph>Thiết kế Design System như <Highlight>Material UI, Ant Design, Chakra UI</Highlight> — câu hỏi rất phổ biến cho vị trí Senior/Staff Frontend.</Paragraph>

                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <div className="text-purple-400 font-bold text-sm">🏗️ Kiến trúc tổng quan</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Design Tokens</strong>: Color, spacing, typography, shadows — single source of truth<br />
                                • <strong>Core Components</strong>: Button, Input, Select, Modal, Toast, etc.<br />
                                • <strong>Theming Layer</strong>: Light/dark mode, brand customization via CSS variables<br />
                                • <strong>Documentation</strong>: Storybook + MDX cho interactive docs<br />
                                • <strong>Distribution</strong>: NPM package, tree-shakeable exports
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">🎯 Interview Focus: Component API Design</div>
                            <div className="text-slate-300 text-sm mt-1">Điểm mấu chốt interviewer đánh giá: thiết kế API sao cho <strong>flexible nhưng consistent</strong>.<br />
                                • <strong>Variant pattern</strong>: {'<Button variant="primary" size="md">'}<br />
                                • <strong>Compound components</strong>: {'<Select><Select.Option /><Select.Group /></Select>'}<br />
                                • <strong>Polymorphic {'"as"'} prop</strong>: {'<Button as="a" href="/home">'} — render dạng khác nhau<br />
                                • <strong>Slot pattern</strong>: startIcon, endIcon, prefix, suffix
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">📐 Design Tokens</div>
                            <div className="text-slate-300 text-sm mt-1">
                                Tokens = primitive values mà mọi component tham chiếu. Thay đổi 1 token = update toàn bộ UI.<br />
                                • <strong>Primitive</strong>: blue-500 = #3b82f6<br />
                                • <strong>Semantic</strong>: color-primary = blue-500, color-danger = red-500<br />
                                • <strong>Component</strong>: button-bg-primary = color-primary<br />
                                → 3 layers đem lại flexibility tối đa
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                            <div className="text-yellow-400 font-bold text-sm">♿ Accessibility (a11y) — BẮT BUỘC</div>
                            <div className="text-slate-300 text-sm mt-1">
                                Design System phải <strong>accessible by default</strong>:<br />
                                • Mọi interactive element có <strong>focus ring</strong> (keyboard nav)<br />
                                • Color contrast ratio ≥ 4.5:1 (WCAG AA)<br />
                                • ARIA attributes built-in: <strong>role, aria-label, aria-expanded</strong><br />
                                • Focus trap trong Modal, Sheet, Dialog
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                            <div className="text-red-400 font-bold text-sm">📦 Versioning & Breaking Changes</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Semver</strong>: major (breaking), minor (feature), patch (fix)<br />
                                • <strong>Codemods</strong>: script tự động migrate code khi breaking change<br />
                                • <strong>Deprecation warnings</strong>: log cảnh báo 1 major version trước khi remove<br />
                                • <strong>Changelogs</strong>: auto-generate từ conventional commits
                            </div>
                        </div>
                    </div>

                    <CodeBlock title="design-system-button.tsx">{`// Ví dụ: Button component API — flexible, type-safe, accessible
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

// Compound component pattern cho Select
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
// → Component chỉ dùng var(--color-primary)
// → Đổi theme = đổi biến, không đổi component`}</CodeBlock>

                    <Callout type="tip">
                        Interview tip: Bắt đầu từ <Highlight>1 component cụ thể</Highlight> (VD: Button) → discuss API design →
                        mở rộng ra tokens, theming, versioning. Đừng cố cover hết — interviewer muốn thấy <Highlight>depth, không phải breadth</Highlight>.
                    </Callout>
                </TopicModal>

                <TopicModal title="Functional vs Non-Functional Requirements" emoji="📋" color="#f59e0b" summary="Bước đầu tiên trong System Design — phân biệt 'nó làm gì' vs 'nó tốt thế nào'">
                    <Paragraph>Khi bắt đầu bất kỳ bài System Design nào, bước đầu tiên là <Highlight>Clarify Requirements</Highlight>. Bạn phải phân biệt rõ 2 loại:</Paragraph>

                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">🔧 Functional Requirements — &quot;Nó LÀM GÌ?&quot;</div>
                            <div className="text-slate-300 text-sm mt-1">
                                Mô tả <strong>chức năng cụ thể</strong> mà hệ thống thực hiện. User có thể làm gì?<br /><br />
                                <strong>Ví dụ E-commerce:</strong><br />
                                • User đăng ký, đăng nhập<br />
                                • Thêm sản phẩm vào giỏ hàng<br />
                                • Thanh toán bằng Momo/VNPay<br />
                                • Admin xem danh sách đơn hàng<br />
                                • Hệ thống gửi email xác nhận<br /><br />
                                → Đo bằng: <Highlight>&quot;Click nút X → kết quả Y đúng không?&quot;</Highlight>
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <div className="text-purple-400 font-bold text-sm">⚡ Non-Functional Requirements — &quot;Nó tốt THẾ NÀO?&quot;</div>
                            <div className="text-slate-300 text-sm mt-1">
                                Mô tả <strong>chất lượng</strong> của hệ thống. Nhanh/an toàn/scale được không?<br /><br />
                                <strong>Ví dụ cùng E-commerce:</strong><br />
                                • ⚡ <strong>Performance</strong> — trang load {'<'} 2 giây<br />
                                • 📈 <strong>Scalability</strong> — chịu 10,000 users đồng thời<br />
                                • 🔒 <strong>Security</strong> — HTTPS, CSRF, mã hóa password<br />
                                • ♿ <strong>Accessibility</strong> — WCAG 2.1 AA<br />
                                • 🌍 <strong>Availability</strong> — 99.9% uptime<br />
                                • 📱 <strong>Responsiveness</strong> — mobile, tablet, desktop<br /><br />
                                → Đo bằng: <Highlight>metrics, benchmarks, SLAs</Highlight>
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                            <div className="text-yellow-400 font-bold text-sm">🏠 Ẩn dụ &quot;Xây nhà&quot;</div>
                            <div className="text-slate-300 text-sm mt-1">
                                <strong>Functional</strong> = 🏗️ <strong>Phòng trong nhà</strong> — phòng ngủ, bếp, toilet<br />
                                <strong>Non-Functional</strong> = 🏗️ <strong>Chất lượng nhà</strong> — chống nóng, cách âm, tiết kiệm điện<br /><br />
                                Nếu thiếu Functional → nhà không có phòng → <Highlight>không ở được</Highlight><br />
                                Nếu thiếu Non-Functional → nhà nóng, ồn, dột → <Highlight>ở được nhưng khổ</Highlight>
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">🎯 Áp dụng trong Interview</div>
                            <div className="text-slate-300 text-sm mt-1">
                                Khi được hỏi {`"Design a chat app"`}, liệt kê <strong>cả hai</strong>:<br /><br />
                                <strong>📋 Functional:</strong><br />
                                • Gửi/nhận tin nhắn real-time<br />
                                • Tạo group chat, gửi hình/file<br />
                                • Typing indicator, read receipts<br /><br />
                                <strong>⚡ Non-Functional:</strong><br />
                                • Latency {'<'} 100ms cho tin nhắn<br />
                                • Offline support (queue messages)<br />
                                • E2E encryption, 1M+ concurrent users<br /><br />
                                → Interviewer <Highlight>đánh giá cao</Highlight> khi bạn tự đề cập NFR trước khi họ hỏi!
                            </div>
                        </div>
                    </div>

                    <Callout type="tip">Interview: Luôn bắt đầu bằng {`"Cho tôi clarify requirements trước"`}. Liệt kê <Highlight>FR trước, NFR sau</Highlight>. Đây là bước đầu tiên trong framework 5 bước — cho thấy bạn nghĩ như senior, không chỉ nhảy vào code.</Callout>
                </TopicModal>
            </div>

            <Heading3>5.2 Framework trả lời</Heading3>

            <div className="my-6 p-4 rounded-xl bg-[var(--bg-tag)] border border-[var(--border-primary)]">
                <div className="text-center text-sm text-slate-400 mb-3 font-medium">📋 Frontend System Design Framework</div>
                <div className="flex flex-col items-center gap-2 text-sm">
                    <div className="px-4 py-2 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30 w-fit"><strong>1. Clarify</strong> — Hỏi requirements, scope, constraints</div>
                    <div className="text-slate-600">↓</div>
                    <div className="px-4 py-2 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30 w-fit"><strong>2. Component Architecture</strong> — Vẽ component tree</div>
                    <div className="text-slate-600">↓</div>
                    <div className="px-4 py-2 rounded-lg bg-green-500/20 text-green-300 border border-green-500/30 w-fit"><strong>3. Data Model & API</strong> — State shape, API design</div>
                    <div className="text-slate-600">↓</div>
                    <div className="px-4 py-2 rounded-lg bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 w-fit"><strong>4. Optimization</strong> — Performance, caching, lazy load</div>
                    <div className="text-slate-600">↓</div>
                    <div className="px-4 py-2 rounded-lg bg-red-500/20 text-red-300 border border-red-500/30 w-fit"><strong>5. Accessibility & Edge Cases</strong> — a11y, error handling, offline</div>
                </div>
            </div>

            <Heading3>5.3 Tài liệu</Heading3>
            <div className="my-4 space-y-2">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                    <span className="text-purple-400">📕</span>
                    <span className="text-slate-300 text-sm"><strong>GreatFrontEnd</strong> — phần System Design rất chất lượng</span>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                    <span className="text-purple-400">📗</span>
                    <span className="text-slate-300 text-sm"><strong>frontendmastery.com</strong> — bài viết deep-dive về FE architecture</span>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                    <span className="text-purple-400">📘</span>
                    <span className="text-slate-300 text-sm"><strong>YouTube: &quot;Frontend System Design&quot;</strong> — kênh Chirag Goel, Evgeniy</span>
                </div>
            </div>

            {/* ===== PHASE 6 ===== */}
        </>
    )
}
