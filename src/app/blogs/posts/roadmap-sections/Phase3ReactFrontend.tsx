'use client'
import { CodeBlock, Heading2, Heading3, Paragraph, Highlight, InlineCode, Callout } from '../../components/BlogComponents'
import { TopicModal } from '../../components/TopicModal'

export default function Phase3ReactFrontend() {
    return (
        <>
            <Heading2>Phase 3 — React & Frontend Chuyên sâu (4-6 tuần)</Heading2>

            <Heading3>3.1 React (click để xem chi tiết)</Heading3>
            <div className="my-4 space-y-2">
                <TopicModal title="Virtual DOM & Reconciliation" emoji="🌳" color="#61DAFB" summary="React so sánh cây cũ vs cây mới, chỉ update phần thay đổi — giống git diff cho UI">
                    <Paragraph>Tưởng tượng bạn có <Highlight>danh sách đi chợ cũ</Highlight> và <Highlight>danh sách mới</Highlight>. Cách ngu: xé cả danh sách, viết lại. Cách khôn: so sánh → chỉ gạch &quot;Sữa&quot;, thêm &quot;Bơ&quot; → phần còn lại giữ nguyên. <strong>Reconciliation = cách khôn</strong> — giống <Highlight>git diff</Highlight> cho UI!</Paragraph>

                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-slate-800/60 border border-white/5">
                            <div className="text-slate-300 text-sm font-mono">
                                {'Cũ:  🥚 Trứng, 🥛 Sữa, 🍞 Bánh mì'}<br />
                                {'Mới: 🥚 Trứng, 🧈 Bơ,  🍞 Bánh mì'}<br /><br />
                                {'❌ Xé cả danh sách, viết lại từ đầu'}<br />
                                {'✅ So sánh → chỉ gạch Sữa, thêm Bơ → giữ nguyên phần còn lại'}
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">{'🔄 Khi state thay đổi — chuyện gì xảy ra?'}</div>
                            <div className="text-slate-300 text-sm mt-1">
                                {'1. State/props thay đổi → React tạo '}<strong>Virtual DOM mới</strong>{' (cây JS object)'}<br />
                                {'2. '}<strong>So sánh</strong>{' cây cũ vs cây mới (diffing)'}<br />
                                {'3. Tìm ra '}<strong>chính xác phần nào thay đổi</strong><br />
                                {'4. Chỉ cập nhật '}<strong>đúng phần đó</strong>{' lên DOM thật'}<br /><br />
                                {'💡 Ví dụ: count = 5 → 6 → React chỉ đổi text "5" → "6", '}<strong>không đụng</strong>{' h1 hay button bên cạnh'}
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <div className="text-purple-400 font-bold text-sm">{'📏 2 Quy tắc so sánh — Đơn giản nhưng hiệu quả'}</div>
                            <div className="text-slate-300 text-sm mt-1">
                                <strong>{'Quy tắc 1: Khác loại tag → xoá hết, làm lại'}</strong><br />
                                {'• <div> → <span> = xoá div + mọi thứ bên trong, tạo span mới'}<br />
                                {'• Giống đổi '}<em>tủ sách</em>{' → '}<em>kệ treo</em>{': phải dỡ hết sách, lắp kệ mới'}<br /><br />
                                <strong>{'Quy tắc 2: Cùng loại tag → chỉ đổi props khác nhau'}</strong><br />
                                {'• <div className="old"> → <div className="new"> = chỉ đổi className'}<br />
                                {'• Giống '}<em>sơn lại tường</em>{' — không cần phá nhà xây lại!'}
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">{'🔑 Tại sao key quan trọng?'}</div>
                            <div className="text-slate-300 text-sm mt-1">
                                <strong>Không có key</strong>{' → React so theo thứ tự (index):'}<br />
                                {'• Thêm 1 item ở đầu = React nghĩ TẤT CẢ items thay đổi → re-render hết 😱'}<br /><br />
                                <strong>Có key</strong>{' → React so theo danh tính:'}<br />
                                {'• Thêm ở đầu = React biết "à, 1 item mới thôi" → chỉ insert 1 ✅'}<br /><br />
                                {'⚠️ '}<strong>Đừng dùng index làm key!</strong>{' Khi reorder, state sẽ bị lẫn lộn giữa items'}
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                            <div className="text-yellow-400 font-bold text-sm">{'⚡ Fiber — "Nâng cấp" Reconciliation'}</div>
                            <div className="text-slate-300 text-sm mt-1">
                                <strong>Trước:</strong>{' render 1 mạch từ đầu đến cuối → gặp component nặng → UI đơ 🥶'}<br />
                                <strong>Sau (Fiber):</strong>{' chia nhỏ → render một chút → '}<strong>nghỉ để browser vẽ</strong>{' → render tiếp'}<br /><br />
                                {'Giống '}<em>Pomodoro</em>{': làm 25 phút → nghỉ 5 phút → làm tiếp = hiệu quả hơn!'}<br /><br />
                                {'Nhờ Fiber → React 18+ có: '}<InlineCode>Suspense</InlineCode>{', '}<InlineCode>startTransition</InlineCode>{', '}<InlineCode>useDeferredValue</InlineCode>
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-slate-500/10 border border-slate-500/20">
                            <div className="text-slate-300 font-bold text-sm">{'🆚 So sánh với framework khác'}</div>
                            <div className="text-slate-300 text-sm mt-1">
                                {'• '}<strong>React (VDOM)</strong>{': so sánh 2 cây → tìm khác biệt → update. Dễ dùng nhưng có overhead'}<br />
                                {'• '}<strong>Svelte</strong>{': compiler biết trước chỗ nào cần update → không cần diffing → nhanh hơn'}<br />
                                {'• '}<strong>Solid (Signals)</strong>{': mỗi giá trị tự biết ai dùng nó → update chính xác, không re-render cả component'}
                            </div>
                        </div>
                    </div>

                    <CodeBlock title="reconciliation-examples.tsx">{`// === 1. KHÁC TYPE → Xoá + Tạo mới ===
// Trước:                      Sau:
<div><Counter /></div>    →    <span><Counter /></span>
// React xoá <div> + unmount Counter (MẤT STATE!)
// Tạo <span> + mount Counter mới (state reset về 0)

// === 2. CÙNG TYPE → Chỉ update props thay đổi ===
// Trước:                                 Sau:
<div className="old" title="a" />    →    <div className="new" title="a" />
// Giữ DOM node, chỉ đổi className. title không đổi → skip

// === 3. KEY: VÍ DỤ THỰC TẾ ===
// Danh sách: ["A", "B"] → thêm "C" ở đầu: ["C", "A", "B"]

// ❌ KHÔNG KEY (so theo index):
// [0] "A" → "C"  ← React nghĩ item 0 đổi text → update
// [1] "B" → "A"  ← update
//          "B"  ← Tạo mới
// → CẢ 3 bị đổi! State input lẫn lộn 😱

// ✅ CÓ KEY (so theo danh tính):
// key="c" → Mới! Insert
// key="a" → Vẫn còn, đổi vị trí
// key="b" → Vẫn còn, giữ nguyên
// → Chỉ INSERT 1, state đúng item ✅

// ❌ Bad: index làm key
{items.map((item, i) => <Input key={i} defaultValue={item.name} />)}
// Sort → state lẫn lộn giữa items!

// ✅ Good: unique ID
{items.map(item => <Input key={item.id} defaultValue={item.name} />)}`}</CodeBlock>

                    <div className="my-3 overflow-x-auto">
                        <table className="w-full text-sm border-collapse">
                            <thead><tr className="border-b border-white/10">
                                <th className="text-left p-3 text-slate-400 font-medium">Tình huống</th>
                                <th className="text-left p-3 text-red-400 font-medium">{'❌ Không key'}</th>
                                <th className="text-left p-3 text-green-400 font-medium">{'✅ Có key'}</th>
                            </tr></thead>
                            <tbody className="text-slate-300">
                                <tr className="border-b border-white/5"><td className="p-3 text-slate-400">Thêm ở đầu</td><td className="p-3">Re-render tất cả</td><td className="p-3">Chỉ insert 1</td></tr>
                                <tr className="border-b border-white/5"><td className="p-3 text-slate-400">Xoá ở giữa</td><td className="p-3">Shift tất cả</td><td className="p-3">Chỉ xoá 1</td></tr>
                                <tr className="border-b border-white/5"><td className="p-3 text-slate-400">Đổi thứ tự</td><td className="p-3">Re-render tất cả</td><td className="p-3">Di chuyển nodes</td></tr>
                                <tr><td className="p-3 text-slate-400">State</td><td className="p-3">Lẫn lộn! 😱</td><td className="p-3">Đúng element ✅</td></tr>
                            </tbody>
                        </table>
                    </div>

                    <Callout type="tip">
                        {'Phỏng vấn hỏi Reconciliation? Nhớ '}<Highlight>3 ý chính</Highlight>:<br />
                        {'1️⃣ '}<strong>Cách hoạt động</strong>{': so sánh cây cũ vs mới → chỉ update phần khác (giống git diff)'}<br />
                        {'2️⃣ '}<strong>Key</strong>{': giúp React nhận diện item nào thêm/xoá/đổi chỗ → tránh re-render thừa'}<br />
                        {'3️⃣ '}<strong>Fiber</strong>{': chia rendering thành chunks nhỏ → UI không đơ → Concurrent Mode'}<br />
                        {'Nói được cả 3 → interviewer ấn tượng! 🎯'}
                    </Callout>

                </TopicModal>

                <TopicModal title="Hooks deep dive" emoji="🪝" color="#61DAFB" summary="useState, useEffect, useRef, useMemo, useCallback — rules và pitfalls">
                    <Paragraph>Hooks là <Highlight>nền tảng</Highlight> của React hiện đại. Hiểu sâu từng hook + pitfalls = trả lời phỏng vấn tự tin.</Paragraph>
                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">📦 useState — State Management</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • State cơ bản. <strong>Batch updates</strong> (React 18+ tự batch trong event handlers, setTimeout, promises)<br />
                                • Dùng <strong>function form</strong> cho state phụ thuộc previous: <InlineCode>setState(prev =&gt; prev + 1)</InlineCode><br />
                                • <strong>Lazy initialization</strong>: <InlineCode>useState(() =&gt; expensiveCalc())</InlineCode> — chỉ chạy lần đầu<br />
                                • ⚠️ setState là <strong>async</strong> — không đọc state mới ngay sau set
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-slate-500/10 border border-slate-500/20">
                            <div className="text-slate-300 font-bold text-sm">⚙️ setState gọi xong — chuyện gì xảy ra?</div>
                            <div className="text-slate-400 text-sm mt-1">
                                1. React <strong>schedule update</strong> (không apply ngay!)<br />
                                2. <strong>Batching</strong>: gộp nhiều setState vào 1 render (React 18+ batch mọi nơi)<br />
                                3. <strong>Render Phase</strong>: gọi lại component → tạo VDOM mới → diff cũ vs mới<br />
                                4. <strong>Commit Phase</strong>: apply DOM changes → useLayoutEffect → paint → useEffect<br />
                                5. Nếu <InlineCode>Object.is(oldState, newState)</InlineCode> = true → <Highlight>bail out</Highlight> (không re-render)<br />
                                6. Parent re-render → <strong>tất cả children re-render</strong> (trừ khi <InlineCode>React.memo</InlineCode>)
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">🔄 useEffect — Side Effects</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Dependency array</strong> quyết định khi nào chạy: [] = mount only, [dep] = khi dep thay đổi<br />
                                • <strong>Cleanup function</strong> chạy trước mỗi re-run VÀ khi unmount<br />
                                • ⚠️ <strong>Stale closure</strong>: closure capture giá trị cũ → dùng ref hoặc function updater<br />
                                • ⚠️ <strong>Object/array deps</strong>: so sánh by reference → useMemo wrap hoặc primitive deps
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <div className="text-purple-400 font-bold text-sm">📌 useRef — Persistent References</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • Persistent reference qua renders. Thay đổi <InlineCode>.current</InlineCode> <strong>KHÔNG gây re-render</strong><br />
                                • Dùng cho: <strong>DOM ref</strong>, timers, previous value, mutable variables<br />
                                • Pattern: <InlineCode>usePrevious(value)</InlineCode> — lưu giá trị render trước<br />
                                • ⚠️ Không đọc/ghi ref trong render body — chỉ trong effects hoặc handlers
                            </div>

                            <CodeBlock title="useRef-demo.tsx">{`import { useRef, useState, useEffect } from 'react'

function RefVsState() {
  const [stateCount, setStateCount] = useState(0)
  const refCount = useRef(0)
  const renderCount = useRef(0)
  renderCount.current++ // tăng mỗi render

  return (
    <div>
      {/* Click → re-render → UI update */}
      <button onClick={() => setStateCount(p => p + 1)}>
        useState: {stateCount}
      </button>

      {/* Click → KHÔNG re-render → UI KHÔNG update */}
      <button onClick={() => { refCount.current++ }}>
        useRef: {refCount.current}
      </button>

      <p>Rendered {renderCount.current} times</p>
      {/* 💡 Click useRef 5 lần → UI vẫn hiện 0
          Click useState 1 lần → UI hiện useRef = 5 (đã thay đổi ngầm!) */}
    </div>
  )
}

// 📌 Pattern: usePrevious — lưu giá trị render trước
function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>()
  useEffect(() => { ref.current = value })
  return ref.current // trả về giá trị CŨ (trước khi effect chạy)
}

// 🔥 Ví dụ thực tế: Reading Progress Bar
// Tại sao dùng useRef thay useState? Vì scroll event bắn ~60 lần/giây
// useState → 60 re-renders/s 😱 | useRef → 0 re-renders ✅
function ReadingProgressBar() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      if (!barRef.current) return
      const docH = document.documentElement.scrollHeight - window.innerHeight
      const pct = docH > 0 ? Math.min(window.scrollY / docH, 1) : 0
      // Ghi trực tiếp vào DOM — KHÔNG qua setState!
      barRef.current.style.transform = \`scaleX(\${pct})\`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-50">
      <div
        ref={barRef} // ← useRef để truy cập DOM trực tiếp
        className="h-full w-full origin-left bg-gradient-to-r
                   from-cyan-400 via-blue-500 to-purple-500"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  )
  // 💡 scaleX thay vì width → chạy trên GPU, không trigger layout
  // 💡 passive: true → browser biết sẽ không preventDefault → scroll mượt hơn
}`}</CodeBlock>
                        </div>

                        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                            <div className="text-yellow-400 font-bold text-sm">🧠 useMemo & useCallback — Memoization</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>useMemo</strong>: cache expensive computations. Chỉ recalculate khi deps thay đổi<br />
                                • <strong>useCallback</strong>: cache function reference. Quan trọng khi pass vào React.memo children<br />
                                • ⚠️ Đừng lạm dụng — có <strong>overhead</strong> (so sánh deps mỗi render)<br />
                                • Rule: chỉ dùng khi <strong>React DevTools Profiler</strong> xác nhận bottleneck
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                            <div className="text-cyan-400 font-bold text-sm">⏱️ useLayoutEffect vs useEffect</div>
                            <div className="text-slate-300 text-sm mt-1">
                                <strong>Timeline:</strong> Render → DOM mutation → <Highlight>useLayoutEffect</Highlight> (sync) → Paint → <Highlight>useEffect</Highlight> (async)<br /><br />
                                • <strong>useEffect</strong> (99%): chạy <strong>SAU paint</strong> — không block UI, dùng cho API calls, subscriptions<br />
                                • <strong>useLayoutEffect</strong>: chạy <strong>TRƯỚC paint</strong> — block paint, dùng khi cần <strong>đo DOM rồi update</strong> mà không muốn user thấy flash<br />
                                • ⚠️ Lạm dụng useLayoutEffect = <strong>block render</strong> = UI đơ. Chỉ dùng khi cần tránh visual flicker
                            </div>

                            <div className="mt-3 p-3 rounded-lg bg-slate-800/60 border border-white/5">
                                <div className="text-cyan-300 font-bold text-xs mb-2">🏠 Memory Palace — Phép ẩn dụ &quot;Sơn nhà&quot;</div>
                                <div className="text-slate-300 text-sm">
                                    Tưởng tượng bạn <strong>sơn lại phòng khách</strong>:<br /><br />
                                    <strong>🖌️ useEffect (thợ sơn bình thường):</strong><br />
                                    Thợ sơn &quot;dán tranh lên tường xong, khách vào ngồi, RỒI MỚI sơn lại tranh&quot;.
                                    Khách <strong>thấy tranh cũ 1 giây rồi mới thấy tranh mới</strong> → <em>flicker!</em><br /><br />
                                    <strong>🚨 useLayoutEffect (thợ sơn khẩn cấp):</strong><br />
                                    Thợ sơn &quot;DÁN TRANH + SƠN LẠI XONG trước khi mở cửa cho khách vào&quot;.
                                    Khách <strong>chỉ thấy tranh mới</strong> — không bao giờ thấy tranh cũ → <em>no flicker!</em><br /><br />
                                    ⚡ <strong>Cái giá:</strong> useLayoutEffect = thợ sơn khẩn cấp = <strong>khách phải đợi ngoài cửa</strong> (block paint).
                                    Nếu sơn lâu quá → UI đơ.
                                </div>
                            </div>

                            <div className="mt-3 p-3 rounded-lg bg-slate-800/60 border border-white/5">
                                <div className="text-cyan-300 font-bold text-xs mb-2">💻 Ví dụ thực tế — Tooltip position</div>
                                <div className="text-slate-300 text-xs font-mono whitespace-pre-wrap bg-slate-900/60 p-2 rounded mt-1">{`// ❌ useEffect — tooltip NHẢY vị trí (flicker)
function Tooltip({ anchor }) {
  const [pos, setPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    // Chạy SAU paint → user thấy tooltip ở (0,0)
    // rồi MỚI nhảy đến vị trí đúng → GIẬT!
    const rect = anchor.getBoundingClientRect()
    setPos({ x: rect.left, y: rect.bottom })
  }, [anchor])

  return <div style={{ left: pos.x, top: pos.y }}>...</div>
}

// ✅ useLayoutEffect — tooltip ĐÚNG vị trí ngay
function Tooltip({ anchor }) {
  const [pos, setPos] = useState({ x: 0, y: 0 })

  useLayoutEffect(() => {
    // Chạy TRƯỚC paint → đo + set position
    // → user chỉ thấy tooltip ở vị trí đúng
    const rect = anchor.getBoundingClientRect()
    setPos({ x: rect.left, y: rect.bottom })
  }, [anchor])

  return <div style={{ left: pos.x, top: pos.y }}>...</div>
}`}
                                </div>
                            </div>

                            <div className="mt-3 p-3 rounded-lg bg-slate-800/60 border border-white/5">
                                <div className="text-cyan-300 font-bold text-xs mb-2">📋 Khi nào dùng cái nào?</div>
                                <div className="text-slate-300 text-sm">
                                    <strong>useEffect (99%):</strong> API calls, event listeners, analytics, subscriptions — mọi thứ <strong>không liên quan đến layout</strong><br /><br />
                                    <strong>useLayoutEffect (1%):</strong> đo DOM size/position, scroll sync, tooltip/popover positioning, animation setup — khi cần <strong>đo rồi update trước khi user nhìn thấy</strong>
                                </div>
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                            <div className="text-red-400 font-bold text-sm">🌐 useContext — Global State</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • Đọc context value. <strong>Re-render khi context value thay đổi</strong> — tất cả consumers!<br />
                                • ⚠️ Performance trap: 1 context thay đổi → <strong>mọi consumer re-render</strong><br />
                                • Fix: <strong>split context</strong> (ThemeContext + UserContext thay vì 1 AppContext)<br />
                                • Fix: <strong>useMemo</strong> context value hoặc dùng state management library
                            </div>
                        </div>
                    </div>

                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                            <div className="text-orange-400 font-bold text-sm">🔀 useReducer — State phức tạp</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • Thay thế useState khi state có <strong>nhiều sub-values</strong> hoặc <strong>logic phức tạp</strong><br />
                                • Pattern: <InlineCode>const [state, dispatch] = useReducer(reducer, initialState)</InlineCode><br />
                                • <strong>Khi nào dùng:</strong> form nhiều fields, state machine, khi next state phụ thuộc vào action type<br />
                                • Kết hợp <InlineCode>useContext + useReducer</InlineCode> = mini Redux (không cần thư viện)
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                            <div className="text-indigo-400 font-bold text-sm">🆕 React 18+ Hooks mới</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>useTransition</strong>: đánh dấu state update là <Highlight>non-urgent</Highlight> → UI vẫn responsive khi heavy render<br />
                                • <strong>useDeferredValue</strong>: defer giá trị → input update ngay, kết quả render sau<br />
                                • <strong>useId</strong>: tạo unique ID stable giữa server + client (SSR-safe)<br />
                                • <strong>useActionState</strong> (React 19): quản lý form action state (pending, error, result)
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-pink-500/10 border border-pink-500/20">
                            <div className="text-pink-400 font-bold text-sm">🛡️ React.memo — Tối ưu re-render</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • HOC wrap component → <strong>skip re-render</strong> nếu props không đổi (shallow comparison)<br />
                                • Chỉ hiệu quả khi kết hợp <InlineCode>useCallback</InlineCode> (cho function props) + <InlineCode>useMemo</InlineCode> (cho object props)<br />
                                • Custom comparator: <InlineCode>React.memo(Comp, areEqual)</InlineCode><br />
                                • ⚠️ Không memo mọi thứ — chỉ khi component render tốn kém hoặc re-render thường xuyên
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-sky-500/10 border border-sky-500/20">
                            <div className="text-sky-400 font-bold text-sm">⏳ Suspense + 🌀 Portal</div>
                            <div className="text-slate-300 text-sm mt-1">
                                <strong>Suspense:</strong> khai báo loading UI cho async operations<br />
                                • <InlineCode>React.lazy()</InlineCode> code splitting, data fetching, nested boundaries<br />
                                • Streaming SSR: gửi HTML shell trước, component lazy load sau<br /><br />
                                <strong>Portal:</strong> render component <strong>ngoài parent DOM</strong> nhưng vẫn trong React tree<br />
                                • <InlineCode>createPortal(children, domNode)</InlineCode><br />
                                • Dùng cho: modals, tooltips, dropdowns, toasts — event vẫn bubble lên React tree
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-teal-500/10 border border-teal-500/20">
                            <div className="text-teal-400 font-bold text-sm">📊 Hooks vs Class Lifecycle</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <InlineCode>componentDidMount</InlineCode> → <InlineCode>useEffect(fn, [])</InlineCode><br />
                                • <InlineCode>componentDidUpdate</InlineCode> → <InlineCode>useEffect(fn, [deps])</InlineCode><br />
                                • <InlineCode>componentWillUnmount</InlineCode> → <InlineCode>useEffect(() =&gt; cleanup, [])</InlineCode><br />
                                • <InlineCode>shouldComponentUpdate</InlineCode> → <InlineCode>React.memo()</InlineCode><br />
                                • Interview: biết map lifecycle → hooks = <Highlight>hiểu migration path</Highlight>
                            </div>
                        </div>
                    </div>

                    <CodeBlock title="hooks-pitfalls.tsx">{`// ⚠️ Pitfall 1: Stale closure
function Counter() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => {
      // ❌ count luôn = 0 (closure capture initial value)
      setCount(count + 1)
      // ✅ Fix: function updater
      setCount(prev => prev + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, []) // empty deps = closure chỉ capture lần đầu
}

// ⚠️ Pitfall 2: Object deps → infinite loop
function UserProfile({ userId }) {
  const [user, setUser] = useState(null)
  // ❌ options tạo mới mỗi render → effect chạy liên tục
  const options = { includeAvatar: true }
  useEffect(() => { fetchUser(userId, options) }, [options])
  // ✅ Fix: useMemo hoặc primitive deps
  const options2 = useMemo(() => ({ includeAvatar: true }), [])

  // ⚠️ Pitfall 3: Missing cleanup → memory leak
  useEffect(() => {
    const ws = new WebSocket(url)
    ws.onmessage = (e) => setMessages(prev => [...prev, e.data])
    return () => ws.close() // ✅ PHẢI cleanup!
  }, [url])
}`}</CodeBlock>

                    <Callout type="warning"><strong>Rules of Hooks:</strong> 1) Chỉ gọi ở top level (không trong if/for/nested function) 2) Chỉ gọi trong React components hoặc custom hooks. Vi phạm → behavior không predictable.</Callout>
                    <a href="/blogs/react-hooks-chi-tiet" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 Xem bài viết chi tiết →</a>
                </TopicModal>

                <TopicModal title="Component Patterns" emoji="🧩" color="#61DAFB" summary="HOC, Render Props, Compound, Controlled/Uncontrolled — khi nào dùng pattern nào">
                    <Paragraph>Biết các component patterns giúp bạn <Highlight>thiết kế API linh hoạt</Highlight> và trả lời câu hỏi system design frontend.</Paragraph>
                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">🔲 Higher-Order Component (HOC)</div>
                            <div className="text-slate-300 text-sm mt-1">
                                Function nhận component → trả về component mới với thêm logic.<br />
                                • Ví dụ: <InlineCode>withAuth(Dashboard)</InlineCode>, <InlineCode>withTheme(Button)</InlineCode><br />
                                • <strong>Pros</strong>: reuse logic, cross-cutting concerns (auth, logging, analytics)<br />
                                • <strong>Cons</strong>: wrapper hell, props collision, khó debug (anonymous components)<br />
                                • ⚠️ Hiện tại <strong>Custom Hooks thay thế phần lớn HOC use cases</strong>
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <div className="text-purple-400 font-bold text-sm">🎯 Render Props</div>
                            <div className="text-slate-300 text-sm mt-1">
                                Component nhận function qua prop → gọi function đó để render UI.<br />
                                • Ví dụ: <InlineCode>{'{\'<Mouse render={({x, y}) => <Cursor x={x} y={y} />} />\'}'}</InlineCode><br />
                                • <strong>Pros</strong>: linh hoạt hơn HOC, caller control rendering<br />
                                • <strong>Cons</strong>: callback hell, khó đọc khi nested nhiều<br />
                                • Vẫn hữu ích cho: <strong>headless UI</strong> (Downshift, React Table)
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">🧱 Compound Components</div>
                            <div className="text-slate-300 text-sm mt-1">
                                Nhóm components chia sẻ implicit state qua Context.<br />
                                • Ví dụ: <InlineCode>{'{\'<Select> <Select.Option /> </Select>\'}'}</InlineCode>, <InlineCode>{'{\'<Tabs> <Tabs.Panel /> </Tabs>\'}'}</InlineCode><br />
                                • <strong>Pros</strong>: API đẹp, flexible layout, inversion of control<br />
                                • <strong>Cons</strong>: complex implementation, context overhead<br />
                                • Dùng trong: <strong>Design System components</strong> (Radix UI, Headless UI)
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                            <div className="text-yellow-400 font-bold text-sm">🎚️ Controlled vs Uncontrolled</div>
                            <div className="text-slate-300 text-sm mt-1">
                                <strong>Controlled</strong>: React quản lý state (<InlineCode>value + onChange</InlineCode>). Single source of truth.<br />
                                <strong>Uncontrolled</strong>: DOM quản lý state (<InlineCode>useRef</InlineCode>). Dùng khi integration với non-React code.<br />
                                • Form: controlled cho validation real-time, uncontrolled cho simple forms<br />
                                • Best practice: <strong>support both</strong> (controlled khi có value prop, uncontrolled khi không)<br />
                                • 💡 <InlineCode>react-hook-form</InlineCode> nội bộ dùng <strong>uncontrolled</strong> (register qua ref) → <Highlight>không re-render mỗi keystroke</Highlight> → hiệu suất vượt trội khi form có 20-30 fields
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                            <div className="text-red-400 font-bold text-sm">🪝 Custom Hooks — Modern Pattern</div>
                            <div className="text-slate-300 text-sm mt-1">
                                Extract logic thành reusable hooks — <strong>thay thế hầu hết HOC + Render Props</strong>.<br />
                                • <InlineCode>useLocalStorage</InlineCode>, <InlineCode>useDebounce</InlineCode>, <InlineCode>useMediaQuery</InlineCode>, <InlineCode>useIntersectionObserver</InlineCode><br />
                                • <strong>Pros</strong>: composable, no wrapper hell, dễ test<br />
                                • Convention: tên bắt đầu bằng <InlineCode>use</InlineCode>, return object hoặc tuple
                            </div>

                            <CodeBlock title="useLocalStorage.ts — Custom Hook thực tế">{`import { useState, useCallback } from 'react'

// Custom hook: đọc/ghi localStorage với type safety
function useLocalStorage<T>(key: string, initialValue: T) {
  const [stored, setStored] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch { return initialValue }
  })

  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    setStored(prev => {
      const next = value instanceof Function ? value(prev) : value
      localStorage.setItem(key, JSON.stringify(next))
      return next
    })
  }, [key])

  return [stored, setValue] as const
}

// Usage — reuse ở bất kỳ component nào
function Settings() {
  const [theme, setTheme] = useLocalStorage('theme', 'dark')
  const [lang, setLang] = useLocalStorage('lang', 'vi')
  return (
    <>
      <button onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}>
        {theme}
      </button>
      <select value={lang} onChange={e => setLang(e.target.value)}>
        <option value="vi">Tiếng Việt</option>
        <option value="en">English</option>
      </select>
      {/* 💡 Refresh page → giá trị vẫn giữ nguyên! */}
    </>
  )
}`}</CodeBlock>
                        </div>
                    </div>

                    <CodeBlock title="component-patterns.tsx">{`// 1. HOC Pattern
function withAuth<P>(Component: React.ComponentType<P>) {
  return function AuthenticatedComponent(props: P) {
    const { user } = useAuth()
    if (!user) return <Navigate to="/login" />
    return <Component {...props} user={user} />
  }
}
const ProtectedDashboard = withAuth(Dashboard)

// 2. Compound Component Pattern
const SelectContext = createContext<SelectContextType>(null!)

function Select({ children, value, onChange }) {
  return (
    <SelectContext.Provider value={{ value, onChange }}>
      <div role="listbox">{children}</div>
    </SelectContext.Provider>
  )
}
Select.Option = function Option({ value, children }) {
  const ctx = useContext(SelectContext)
  return (
    <div role="option" aria-selected={ctx.value === value}
         onClick={() => ctx.onChange(value)}>
      {children}
    </div>
  )
}
// Usage: <Select value={v} onChange={setV}>
//          <Select.Option value="a">Option A</Select.Option>
//        </Select>

// 3. Custom Hook (replaces HOC/Render Props)
function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debounced
}`}</CodeBlock>

                    <Callout type="tip">
                        Interview trend: <Highlight>Custom Hooks</Highlight> thay thế hầu hết HOC và Render Props. Nhưng vẫn cần biết tất cả patterns vì legacy code + system design cần Compound Components.
                    </Callout>
                </TopicModal>

                <TopicModal title="Essential Custom Hooks" emoji="⚛️" color="#38bdf8" summary="Các custom hooks thông dụng: useDebounce, useThrottle, useCount, useOnClickOutside">
                    <Paragraph>Trong thực tế và phỏng vấn, bạn thường xuyên cần tự viết các Custom Hooks để tái sử dụng logic. Dưới đây là 4 hooks phổ biến nhất và cách sử dụng.</Paragraph>

                    <div className="my-4 space-y-4">
                        {/* useDebounce */}
                        <div className="p-4 rounded-xl bg-[#252526] border border-[#3c3c3c]">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-xl">⏱️</span>
                                <h4 className="text-[#38bdf8] font-bold text-lg">1. useDebounce</h4>
                            </div>
                            <div className="text-sm text-slate-300 mb-3">
                                Trì hoãn việc cập nhật giá trị cho đến khi ngừng thay đổi sau một khoảng thời gian. Rất hữu ích cho ô tìm kiếm (search input) để tránh gọi API liên tục.
                            </div>
                            <CodeBlock title="useDebounce.ts">{`import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Đặt timeout cập nhật value
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function: huỷ timeout cũ nếu value đổi trước khi hết delay
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// 📖 Cách sử dụng:
function SearchComponent() {
  const [search, setSearch] = useState('');
  // Chỉ gọi API khi user ngưng gõ 500ms
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (debouncedSearch) {
      console.log('Fetching data for:', debouncedSearch);
    }
  }, [debouncedSearch]);

  return <input value={search} onChange={e => setSearch(e.target.value)} />;
}`}</CodeBlock>
                        </div>

                        {/* useThrottle */}
                        <div className="p-4 rounded-xl bg-[#252526] border border-[#3c3c3c]">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-xl">🚦</span>
                                <h4 className="text-[#38bdf8] font-bold text-lg">2. useThrottle</h4>
                            </div>
                            <div className="text-sm text-slate-300 mb-3">
                                Giới hạn số lần cập nhật giá trị, đảm bảo chỉ cập nhật nhiều nhất một lần trong một khoảng thời gian nhất định (limit). Thích hợp cho track scroll, resize window.
                            </div>
                            <CodeBlock title="useThrottle.ts">{`import { useState, useEffect, useRef } from 'react';

export function useThrottle<T>(value: T, limit: number): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastRan = useRef(Date.now());

  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRan.current >= limit) {
        setThrottledValue(value);
        lastRan.current = Date.now();
      }
    }, limit - (Date.now() - lastRan.current));

    return () => clearTimeout(handler);
  }, [value, limit]);

  return throttledValue;
}

// 📖 Cách sử dụng:
function ScrollTracker() {
  const [scrollY, setScrollY] = useState(0);
  // Chỉ update giao diện tối đa 1 lần mỗi 200ms
  const throttledScroll = useThrottle(scrollY, 200);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <div>Throttled Scroll Position: {throttledScroll}</div>;
}`}</CodeBlock>
                        </div>

                        {/* useCount */}
                        <div className="p-4 rounded-xl bg-[#252526] border border-[#3c3c3c]">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-xl">🔢</span>
                                <h4 className="text-[#38bdf8] font-bold text-lg">3. useCount</h4>
                            </div>
                            <div className="text-sm text-slate-300 mb-3">
                                Hook quản lý state đơn giản (counter), tích hợp sẵn các hàm helper. Thường xuất hiện làm ví dụ cơ bản trong các bài viết Custom Hook.
                            </div>
                            <CodeBlock title="useCount.ts">{`import { useState } from 'react';

export function useCount(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount((c) => c + 1);
  const decrement = () => setCount((c) => c - 1);
  const reset = () => setCount(initialValue);
  const set = (value: number) => setCount(value);

  return { count, increment, decrement, reset, set };
}

// 📖 Cách sử dụng:
function CounterComponent() {
  const { count, increment, decrement, reset } = useCount(10);

  return (
    <div className="flex gap-2">
      <button onClick={decrement}>-</button>
      <span>{count}</span>
      <button onClick={increment}>+</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}`}</CodeBlock>
                        </div>

                        {/* useOnClickOutside */}
                        <div className="p-4 rounded-xl bg-[#252526] border border-[#3c3c3c]">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-xl">🖱️</span>
                                <h4 className="text-[#38bdf8] font-bold text-lg">4. useOnClickOutside</h4>
                            </div>
                            <div className="text-sm text-slate-300 mb-3">
                                Giúp phát hiện khi người dùng click ra bên ngoài một component được chỉ định. Đây là hook cực kỳ quan trọng khi làm Dropdown, Modal, Popover.
                            </div>
                            <CodeBlock title="useOnClickOutside.ts">{`import { useEffect } from 'react';

export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: React.RefObject<T>,
  handler: (event: MouseEvent | TouchEvent) => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // Bỏ qua nếu click vào bên trong ref (component mục tiêu)
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]); // Chỉ re-run nếu ref hoặc handler thay đổi
}

// 📖 Cách sử dụng:
function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Gọi handler (đóng menu) nếu user click ra ngoài <div ref={ref}>
  useOnClickOutside(ref, () => setIsOpen(false));

  return (
    <div ref={ref} className="relative inline-block">
      <button onClick={() => setIsOpen(!isOpen)}>Toggle Menu</button>
      {isOpen && (
        <div className="absolute top-full left-0 bg-[#252526] border p-4 shadow-lg w-48">
          Dropdown Content
        </div>
      )}
    </div>
  );
}`}</CodeBlock>
                        </div>
                    </div>
                </TopicModal>

                <TopicModal title="Performance Optimization" emoji="⚡" color="#61DAFB" summary="React.memo, useMemo, useCallback, code splitting, virtualization">
                    <Paragraph>React re-render toàn bộ subtree khi state thay đổi. Đây là các kỹ thuật <Highlight>ngăn re-render không cần thiết</Highlight> và tối ưu performance:</Paragraph>

                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">🛡️ Prevent Unnecessary Re-renders</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>React.memo</strong>: wrap component → skip re-render nếu props shallow equal<br />
                                • <strong>useMemo</strong>: cache expensive calculations (sort, filter, map large arrays)<br />
                                • <strong>useCallback</strong>: stable function reference cho React.memo children<br />
                                • <strong>State colocation</strong>: đẩy state xuống component cần nó (tránh re-render parent)
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">📦 Code Splitting & Lazy Loading</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>React.lazy + Suspense</strong>: dynamic import components<br />
                                • <strong>Route-based splitting</strong>: mỗi page là 1 chunk riêng<br />
                                • <strong>Component-based splitting</strong>: heavy components (rich editor, chart library)<br />
                                • <strong>Prefetch</strong>: load chunk trước khi user click (onMouseEnter)
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <div className="text-purple-400 font-bold text-sm">📋 Virtualization</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • Chỉ render items visible trong viewport (10k+ items → ~20 DOM nodes)<br />
                                • <strong>react-window</strong>: lightweight, fixed-size items<br />
                                • <strong>react-virtuoso</strong>: variable-size, auto-measure, grouping<br />
                                • Khi nào dùng: list {'>'} 100 items, hoặc bất kỳ list gây lag
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                            <div className="text-yellow-400 font-bold text-sm">🔍 Profiling & Debugging</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>React DevTools Profiler</strong>: xem component nào re-render, bao lâu<br />
                                • <strong>why-did-you-render</strong>: library log unnecessary re-renders<br />
                                • <strong>Chrome Performance tab</strong>: flame chart, main thread blocking<br />
                                • <strong>Lighthouse</strong>: CI/CD integration cho performance budget
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                            <div className="text-red-400 font-bold text-sm">🏗️ Architecture-level Optimization</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>State management</strong>: Zustand/Jotai (atomic) vs Redux (centralized)<br />
                                • <strong>Server Components</strong> (React 19): zero JS shipped cho static content<br />
                                • <strong>Streaming SSR</strong>: renderToPipeableStream cho faster TTFB<br />
                                • <strong>ISR</strong> (Next.js): revalidate static pages without redeploy
                            </div>
                        </div>
                    </div>

                    <CodeBlock title="optimization-techniques.tsx">{`// 1. React.memo — skip re-render nếu props không đổi
const ExpensiveList = React.memo(({ items, onItemClick }) => {
  return items.map(item => <Item key={item.id} {...item} onClick={onItemClick} />)
})

// 2. useMemo — cache expensive calculations
const sorted = useMemo(() =>
  items
    .filter(i => i.active)
    .sort((a, b) => a.price - b.price),
  [items] // chỉ recalculate khi items thay đổi
)

// 3. useCallback — stable function reference
const handleClick = useCallback((id: string) => {
  setItems(prev => prev.filter(i => i.id !== id))
}, []) // Không re-create mỗi render → ExpensiveList không re-render

// 4. Dynamic import — code splitting
const AdminPanel = lazy(() => import('./AdminPanel'))
// Usage: <Suspense fallback={<Spinner />}><AdminPanel /></Suspense>

// 5. State colocation — tránh re-render không cần thiết
// ❌ Bad: search state ở App → mọi child re-render khi gõ
function App() {
  const [search, setSearch] = useState('') // ← state ở đây
  return <><Header /><SearchBar search={search} onChange={setSearch} /><Content /></>
}
// ✅ Good: search state ở SearchBar → chỉ SearchBar re-render
function SearchBar() {
  const [search, setSearch] = useState('') // ← state ở đây
  return <input value={search} onChange={e => setSearch(e.target.value)} />
}`}</CodeBlock>

                    <Callout type="warning">Đừng premature optimize! Chỉ optimize khi <Highlight>React DevTools Profiler</Highlight> chỉ ra bottleneck thật sự. useMemo/useCallback có overhead — dùng sai còn chậm hơn.</Callout>
                    <a href="/blogs/react-performance" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 Xem bài viết chi tiết →</a>
                </TopicModal>

                <TopicModal title="State Management — Redux, Zustand, Context" emoji="🗃️" color="#764ABC" summary="So sánh 3 cách quản lý state phổ biến — câu hỏi cực kỳ phổ biến ở VN interview">
                    <Paragraph>Công ty VN <Highlight>rất hay hỏi Redux</Highlight> vì đa số dự án enterprise đều dùng. Nhưng cần biết cả alternatives.</Paragraph>

                    <Callout type="info">🏦 <strong>Ẩn dụ: Redux = Ngân hàng</strong><br /><br />
                        <strong>Store</strong> = Két sắt — nơi giữ toàn bộ tiền (state)<br />
                        <strong>Action</strong> = Phiếu giao dịch — {'"Tôi muốn rút 500k"'} <InlineCode>{`{ type: 'WITHDRAW', amount: 500 }`}</InlineCode><br />
                        <strong>Dispatch</strong> = Nộp phiếu cho nhân viên<br />
                        <strong>Reducer</strong> = Nhân viên xử lý — đọc phiếu, tính toán, cập nhật số dư<br />
                        <strong>Selector</strong> = Sao kê — xem số dư hiện tại<br /><br />
                        Bạn <strong>không được tự mở két lấy tiền</strong> (mutate state trực tiếp) — phải nộp phiếu (dispatch action) → nhân viên xử lý (reducer) → két sắt được cập nhật (new state)
                    </Callout>

                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <div className="text-purple-400 font-bold text-sm">🔴 Redux (Redux Toolkit)</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Store</strong> → <strong>Action</strong> → <strong>Reducer</strong> → <strong>New State</strong> (unidirectional flow)<br />
                                • Redux Toolkit: <InlineCode>createSlice</InlineCode>, <InlineCode>configureStore</InlineCode>, <InlineCode>createAsyncThunk</InlineCode><br />
                                • Middleware: redux-thunk (default), redux-saga (complex side effects)<br />
                                • DevTools: time-travel debugging, action log<br />
                                • Dùng khi: complex state, nhiều components cần share, cần predictable
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                            <div className="text-orange-400 font-bold text-sm">🐻 Zustand</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • Lightweight (~1KB), API đơn giản, không boilerplate<br />
                                • No Provider needed, dùng hooks trực tiếp<br />
                                • Auto selector: chỉ re-render khi slice state thay đổi<br />
                                • Middleware: persist, devtools, immer<br />
                                • Dùng khi: muốn đơn giản, không cần Redux Toolkit overhead
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">⚛️ Context API</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • Built-in React, no extra dependency<br />
                                • ⚠️ <strong>ALL consumers re-render</strong> khi context value thay đổi<br />
                                • Tốt cho: theme, locale, auth (infrequent updates)<br />
                                • Không tốt cho: frequently changing data (input, scroll, mouse)<br />
                                • Split context theo domain để giảm re-renders
                            </div>
                        </div>
                    </div>
                    <CodeBlock title="state-management.ts">{`// Redux Toolkit — createSlice
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1 }, // Immer: mutate OK
    addBy: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})

// Zustand — minimal boilerplate
import { create } from 'zustand'
const useStore = create((set) => ({
  count: 0,
  increment: () => set((s) => ({ count: s.count + 1 })),
}))
// Usage: const count = useStore(s => s.count) // auto-optimized!

// Context — built-in
const ThemeContext = createContext('light')
function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Child /> {/* All children re-render when value changes */}
    </ThemeContext.Provider>
  )
}`}</CodeBlock>
                    <Callout type="tip">VN Interview: 90% sẽ hỏi Redux flow (action → reducer → store). Biết giải thích <Highlight>tại sao dùng Zustand thay Redux</Highlight> (less boilerplate, auto-optimized re-renders) → senior answer.</Callout>
                </TopicModal>

                <TopicModal title="Next.js — Rendering Strategies (App Router)" emoji="▲" color="#000000" summary="SSG, ISR, SSR, CSR, PPR — kiểu App Router mới nhất, kèm ví dụ code thực tế">
                    <Paragraph>Next.js là framework React <Highlight>phổ biến nhất ở VN</Highlight>. Phỏng vấn hay hỏi về rendering strategies. App Router (Next.js 13+) thay đổi hoàn toàn cách config rendering — <Highlight>không còn getStaticProps / getServerSideProps</Highlight>.</Paragraph>

                    <Callout type="info">🏪 <strong>Ẩn dụ: Rendering = Cách phục vụ quán ăn</strong><br /><br />
                        <strong>SSG</strong> = Cơm hộp đóng sẵn — nấu từ trước, ai đến lấy ngay. <strong>Nhanh nhất!</strong><br />
                        <strong>ISR</strong> = Cơm hộp + nấu lại mỗi 60 giây — vẫn nhanh, nhưng <strong>không quá cũ</strong><br />
                        <strong>SSR</strong> = Nấu tại chỗ mỗi khi khách order — <strong>tươi nhất</strong>, nhưng phải đợi<br />
                        <strong>CSR</strong> = Cho khách nguyên liệu, tự nấu trên bếp (browser) — <strong>bếp trống mà khách chờ lâu</strong><br />
                        <strong>PPR</strong> = Phần cơm hộp sẵn + phần nấu tại chỗ — <Highlight>best of both worlds!</Highlight>
                    </Callout>

                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-gray-500/10 border border-gray-500/20">
                            <div className="text-gray-300 font-bold text-sm">📊 So sánh Rendering Strategies (App Router)</div>
                            <div className="text-slate-300 text-sm mt-2">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-xs">
                                        <thead>
                                            <tr className="border-b border-white/10">
                                                <th className="text-left py-1.5 pr-2 text-slate-400 font-semibold">Strategy</th>
                                                <th className="text-left py-1.5 pr-2 text-slate-400 font-semibold">Khi nào render</th>
                                                <th className="text-left py-1.5 pr-2 text-slate-400 font-semibold">Cache</th>
                                                <th className="text-left py-1.5 text-slate-400 font-semibold">App Router config</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-slate-300">
                                            <tr className="border-b border-white/5"><td className="py-1.5 pr-2 font-bold text-green-400">SSG</td><td className="py-1.5 pr-2">Build time</td><td className="py-1.5 pr-2">Mãi mãi</td><td className="py-1.5 font-mono text-[10px]">generateStaticParams</td></tr>
                                            <tr className="border-b border-white/5"><td className="py-1.5 pr-2 font-bold text-blue-400">ISR</td><td className="py-1.5 pr-2">Build + revalidate</td><td className="py-1.5 pr-2">N giây</td><td className="py-1.5 font-mono text-[10px]">{`revalidate = 60`}</td></tr>
                                            <tr className="border-b border-white/5"><td className="py-1.5 pr-2 font-bold text-yellow-400">SSR</td><td className="py-1.5 pr-2">Mỗi request</td><td className="py-1.5 pr-2">Không</td><td className="py-1.5 font-mono text-[10px]">{`dynamic = 'force-dynamic'`}</td></tr>
                                            <tr className="border-b border-white/5"><td className="py-1.5 pr-2 font-bold text-red-400">CSR</td><td className="py-1.5 pr-2">Trên browser</td><td className="py-1.5 pr-2">Không</td><td className="py-1.5 font-mono text-[10px]">{`'use client' + useEffect`}</td></tr>
                                            <tr><td className="py-1.5 pr-2 font-bold text-purple-400">PPR</td><td className="py-1.5 pr-2">Static shell + streaming</td><td className="py-1.5 pr-2">Shell: mãi mãi</td><td className="py-1.5 font-mono text-[10px]">Suspense boundary</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">🆕 App Router — Mọi thứ là Server Component</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Mọi page/layout</strong> mặc định là Server Component → 0 JS<br />
                                • Rendering strategy quyết định bởi <strong>cách fetch data</strong>, không phải tên function<br />
                                • <InlineCode>generateStaticParams</InlineCode> → SSG (build time)<br />
                                • <InlineCode>{`export const revalidate = N`}</InlineCode> → ISR (revalidate sau N giây)<br />
                                • <InlineCode>{`export const dynamic = 'force-dynamic'`}</InlineCode> → SSR (mỗi request)<br />
                                • Không export gì → Next.js <strong>tự quyết định</strong> (Static nếu không có dynamic data)
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <div className="text-purple-400 font-bold text-sm">⚡ PPR — Partial Pre-rendering (Next.js 15+)</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Mới nhất!</strong> Kết hợp Static + Dynamic trong cùng 1 page<br />
                                • Static shell (header, layout) → render lúc build, serve từ CDN<br />
                                • Dynamic parts (user data, cart) → stream từ server khi request<br />
                                • Dùng <InlineCode>{'<Suspense>'}</InlineCode> để đánh dấu phần dynamic<br />
                                • <Highlight>TTFB cực nhanh</Highlight> (static shell) + data tươi (streaming)
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                            <div className="text-yellow-400 font-bold text-sm">🎯 Khi nào dùng gì?</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>SSG</strong>: blogs, landing pages, docs (content ít thay đổi)<br />
                                • <strong>ISR</strong>: e-commerce products, news (thay đổi vài phút/giờ)<br />
                                • <strong>SSR</strong>: user dashboard, search results (data real-time, SEO cần)<br />
                                • <strong>CSR</strong>: admin panel, private pages (không cần SEO)<br />
                                • <strong>PPR</strong>: product page (layout static + giá/stock dynamic)
                            </div>
                        </div>
                    </div>
                    <CodeBlock title="nextjs-rendering.tsx">{`// ╔════════════════════════════════════════╗
// ║  📦 PAGES ROUTER (cũ — vẫn hoạt động) ║
// ╚════════════════════════════════════════╝

// SSG — build time
export async function getStaticProps() {
  const posts = await fetchPosts()
  return { props: { posts } }
}

// ISR — revalidate mỗi 60 giây
export async function getStaticProps() {
  const products = await fetchProducts()
  return { props: { products }, revalidate: 60 }
}

// SSR — mỗi request
export async function getServerSideProps(ctx) {
  const user = await getUser(ctx.req.cookies.token)
  return { props: { user } }
}

// ╔════════════════════════════════════════════╗
// ║  🆕 APP ROUTER (mới — recommended)        ║
// ║  Không còn getStaticProps/getServerSideProps║
// ║  Mọi thứ quyết định bằng export const     ║
// ╚════════════════════════════════════════════╝

// ═══ 1. SSG — generateStaticParams ═══
// File: app/blog/[slug]/page.tsx
export async function generateStaticParams() {
  const posts = await db.post.findMany({ select: { slug: true } })
  return posts.map(p => ({ slug: p.slug }))
}
// ↑ Tương đương getStaticPaths + getStaticProps

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await db.post.findUnique({ where: { slug } })
  return <article><h1>{post.title}</h1><p>{post.content}</p></article>
}

// ═══ 2. ISR — export const revalidate ═══
// File: app/products/page.tsx
export const revalidate = 60
// ↑ Tương đương getStaticProps({ revalidate: 60 })

export default async function ProductsPage() {
  const products = await db.product.findMany()
  return <div>{products.map(p => <Card key={p.id} product={p} />)}</div>
}

// ═══ 3. SSR — export const dynamic ═══
// File: app/dashboard/page.tsx
export const dynamic = 'force-dynamic'
// ↑ Tương đương getServerSideProps

export default async function DashboardPage() {
  const user = await getUser()
  return <div>Xin chào, {user.name}</div>
}

// ═══ 4. CSR — 'use client' + useEffect ═══
// Giống nhau ở cả Pages Router và App Router
'use client'
import { useState, useEffect } from 'react'

function LiveChat() {
  const [messages, setMessages] = useState([])
  useEffect(() => {
    const ws = new WebSocket('/api/chat')
    ws.onmessage = (e) => setMessages(prev => [...prev, JSON.parse(e.data)])
    return () => ws.close()
  }, [])
  return <div>{messages.map(m => <p key={m.id}>{m.text}</p>)}</div>
}

// ═══ 5. PPR — Partial Pre-rendering (Next.js 15+, CHỈ App Router) ═══
// Static shell + dynamic content trong cùng 1 page!
import { Suspense } from 'react'

export default async function ProductPage({ params }) {
  const { id } = await params
  const product = await db.product.findUnique({ where: { id } })

  return (
    <div>
      {/* ⚡ Static shell — CDN cached */}
      <h1>{product.name}</h1>
      <p>{product.description}</p>

      {/* 🔄 Dynamic — streamed mỗi request */}
      <Suspense fallback={<PriceSkeleton />}>
        <LivePrice productId={id} />
      </Suspense>
      <Suspense fallback={<CartSkeleton />}>
        <CartStatus />
      </Suspense>
    </div>
  )
}`}</CodeBlock>
                    <Callout type="tip">VN Interview: {'"Giải thích SSR vs SSG vs ISR"'} = câu hỏi <Highlight>gần như chắc chắn</Highlight> gặp nếu JD có Next.js. Biết cả 2 kiểu: Pages Router (getStaticProps) cho legacy + App Router (export const) cho mới → senior answer. Bonus: biết <Highlight>PPR</Highlight> → shows bạn theo dõi Next.js mới nhất!</Callout>
                </TopicModal>

                <TopicModal title="Server Components & Server Actions" emoji="🖥️" color="#0ea5e9" summary="RSC = zero JS bundle, Server Actions = RPC-style mutations — kiến trúc mới của React/Next.js">
                    <Paragraph><Highlight>React Server Components (RSC)</Highlight> thay đổi cách chúng ta nghĩ về rendering. Thay vì ship JS cho mọi component, RSC chạy trên server và gửi HTML. Chỉ component nào cần interactivity mới ship JS.</Paragraph>

                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">🖥️ Server Components (default trong App Router)</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • Render trên server, <strong>0 JS gửi về client</strong><br />
                                • Truy cập trực tiếp database, file system, env variables<br />
                                • Không dùng được: useState, useEffect, onClick, browser APIs<br />
                                • <InlineCode>async/await</InlineCode> trực tiếp trong component<br />
                                • Import client components nhưng <strong>không ngược lại</strong>
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">📱 Client Components ({`'use client'`})</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • Thêm <InlineCode>{`'use client'`}</InlineCode> ở đầu file → opt-in<br />
                                • Dùng được: useState, useEffect, onClick, browser APIs<br />
                                • JS được ship về client (hydration)<br />
                                • Nên <strong>tối thiểu hoá</strong>: chỉ dùng cho phần cần interactivity
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <div className="text-purple-400 font-bold text-sm">⚡ Server Actions ({`'use server'`})</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • Server-side functions gọi trực tiếp từ client<br />
                                • Thay thế API routes cho mutations (POST, PUT, DELETE)<br />
                                • Tự động serialize/deserialize params<br />
                                • Hoạt động với <InlineCode>&lt;form action&gt;</InlineCode> hoặc gọi trực tiếp<br />
                                • Progressive Enhancement: form submit khi JS chưa load
                            </div>
                        </div>
                    </div>

                    <CodeBlock title="rsc-pattern.tsx">{`// ===== SERVER COMPONENT (default) =====
// File: app/products/page.tsx  — không cần 'use server'
import { db } from '@/lib/database'
import AddToCartButton from './AddToCartButton'

async function ProductPage() {
    const products = await db.product.findMany()  // Truy cập DB trực tiếp!
    return (
        <div>
            <h1>Sản phẩm ({products.length})</h1>
            {products.map(p => (
                <div key={p.id}>
                    <h2>{p.name} - {p.price}đ</h2>
                    <AddToCartButton productId={p.id} />  {/* Client component */}
                </div>
            ))}
        </div>
    )
}

// ===== CLIENT COMPONENT =====
// File: app/products/AddToCartButton.tsx
'use client'
import { useState } from 'react'
import { addToCart } from './actions'

export default function AddToCartButton({ productId }) {
    const [isPending, setIsPending] = useState(false)
    return (
        <button onClick={async () => {
            setIsPending(true)
            await addToCart(productId)
            setIsPending(false)
        }} disabled={isPending}>
            {isPending ? '⏳' : '🛒 Thêm vào giỏ'}
        </button>
    )
}`}</CodeBlock>

                    <CodeBlock title="server-actions.tsx">{`// ===== SERVER ACTION =====
// File: app/products/actions.ts
'use server'

import { db } from '@/lib/database'
import { revalidatePath } from 'next/cache'

export async function addToCart(productId: string) {
    await db.cart.create({ data: { productId, quantity: 1 } })
    revalidatePath('/cart')
}

export async function createProduct(formData: FormData) {
    const name = formData.get('name') as string
    const price = Number(formData.get('price'))
    if (!name) return { error: 'Tên không được trống' }

    await db.product.create({ data: { name, price } })
    revalidatePath('/products')
    return { success: true }
}

// Dùng trong form — Progressive Enhancement!
function CreateForm() {
    return (
        <form action={createProduct}>
            <input name="name" required />
            <input name="price" type="number" required />
            <button type="submit">Tạo</button>
        </form>
    )
}

// React 19 — useActionState
'use client'
import { useActionState } from 'react'
import { createProduct } from './actions'

function CreateProductForm() {
    const [state, action, isPending] = useActionState(createProduct, null)
    return (
        <form action={action}>
            <input name="name" required />
            <button disabled={isPending}>{isPending ? '...' : 'Tạo'}</button>
            {state?.error && <span className="text-red-500">{state.error}</span>}
        </form>
    )
}`}</CodeBlock>

                    <div className="my-3">
                        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                            <div className="text-yellow-400 font-bold text-sm">🧠 Quy tắc: Server vs Client</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Fetch data</strong> → Server Component (async/await trực tiếp)<br />
                                • <strong>Click, hover, type</strong> → Client Component (useState, events)<br />
                                • <strong>Form submit / mutation</strong> → Server Action ({`'use server'`})<br />
                                • Mục tiêu: giữ Client Component <Highlight>nhỏ nhất có thể</Highlight>
                            </div>
                        </div>
                    </div>

                    <Callout type="tip">Interview: {`"RSC vs SSR?"`} → RSC render trên server nhưng <Highlight>không hydrate</Highlight> (0 JS). SSR render HTML trên server rồi <Highlight>hydrate toàn bộ</Highlight>. RSC hiệu quả hơn vì chỉ ship JS cho interactive parts.</Callout>
                </TopicModal>

                <TopicModal title="State Management trong Next.js" emoji="🗃️" color="#8b5cf6" summary="Tại sao ít cần Context/Redux trong App Router — và khi nào vẫn cần">
                    <Paragraph><Highlight>Next.js App Router thay đổi cách nghĩ về state.</Highlight> Phần lớn global state mà trước đây cần Redux/Context giờ được xử lý bởi Server Components và URL params.</Paragraph>

                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <div className="text-purple-400 font-bold text-sm">🔄 Trước vs Sau App Router</div>
                            <div className="text-slate-300 text-sm mt-1">
                                <strong>Trước (CRA + Redux):</strong><br />
                                Page load → client fetch API → loading spinner → dispatch action → set Redux store → render<br /><br />
                                <strong>Sau (Next.js App Router):</strong><br />
                                Server fetch data → render HTML → gửi về client (đã có data sẵn)<br />
                                → <Highlight>Không cần global store để giữ data!</Highlight>
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">🌐 URL = State Manager miễn phí</div>
                            <div className="text-slate-300 text-sm mt-1">
                                Filters, pagination, search → dùng <Highlight>searchParams</Highlight><br /><br />
                                <code className="text-xs bg-slate-900 px-2 py-0.5 rounded">/products?category=shoes&amp;sort=price&amp;page=2</code><br /><br />
                                → Không cần Redux store cho filters!<br />
                                → Shareable URL, SEO-friendly, back button works
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">🧩 Chỉ cần client state cho UI state</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • Modal open/close → <strong>useState</strong><br />
                                • Theme dark/light → <strong>useContext</strong> (nhỏ, local)<br />
                                • Form input → <strong>useState</strong> / React Hook Form<br />
                                • Complex form logic → <strong>useReducer</strong><br /><br />
                                → Đều <Highlight>nhỏ và local</Highlight>, không cần Redux!
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                            <div className="text-yellow-400 font-bold text-sm">📋 Khi nào dùng gì?</div>
                            <div className="text-slate-300 text-sm mt-2">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-xs">
                                        <thead>
                                            <tr className="border-b border-white/10">
                                                <th className="text-left py-1.5 pr-2 text-slate-400 font-semibold">Tool</th>
                                                <th className="text-left py-1.5 text-slate-400 font-semibold">Khi nào dùng</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-slate-300">
                                            <tr className="border-b border-white/5"><td className="py-1.5 pr-2 font-mono text-green-400">useState</td><td>UI state đơn giản (modal, toggle, form)</td></tr>
                                            <tr className="border-b border-white/5"><td className="py-1.5 pr-2 font-mono text-green-400">useContext</td><td>Theme, locale, auth status — ít thay đổi</td></tr>
                                            <tr className="border-b border-white/5"><td className="py-1.5 pr-2 font-mono text-blue-400">Zustand</td><td>Client state phức tạp, nhiều component share</td></tr>
                                            <tr className="border-b border-white/5"><td className="py-1.5 pr-2 font-mono text-purple-400">Redux</td><td>App rất lớn, cần time-travel debug, middleware</td></tr>
                                            <tr className="border-b border-white/5"><td className="py-1.5 pr-2 font-mono text-cyan-400">TanStack Query</td><td>Server state caching + revalidation trên client</td></tr>
                                            <tr><td className="py-1.5 pr-2 font-mono text-yellow-400">URL params</td><td>Filters, pagination, search — shareable + SEO</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <CodeBlock title="url-state-example.tsx">{`// ✅ URL params thay thế Redux cho filters
// File: app/products/page.tsx (Server Component)
export default async function ProductsPage({
    searchParams
}: {
    searchParams: Promise<{ category?: string; sort?: string; page?: string }>
}) {
    const { category, sort, page } = await searchParams
    const products = await db.product.findMany({
        where: category ? { category } : {},
        orderBy: { [sort || 'createdAt']: 'desc' },
        skip: ((Number(page) || 1) - 1) * 20,
        take: 20,
    })
    return <ProductGrid products={products} />
}

// Client component chỉ update URL — không cần Redux!
'use client'
import { useRouter, useSearchParams } from 'next/navigation'

function FilterBar() {
    const router = useRouter()
    const params = useSearchParams()

    const setFilter = (key: string, value: string) => {
        const newParams = new URLSearchParams(params)
        newParams.set(key, value)
        newParams.delete('page') // reset page khi đổi filter
        router.push('/products?' + newParams)
    }

                    return (
                    <select onChange={e => setFilter('category', e.target.value)}>
                        <option value="">Tất cả</option>
                        <option value="shoes">Giày</option>
                        <option value="shirts">Áo</option>
                    </select>
                    )
}`}</CodeBlock>

                    <Callout type="tip">Interview: {`"Bạn quản lý state thế nào trong Next.js App Router?"`} → <Highlight>Server Components fetch data trực tiếp, URL params thay filter state, chỉ còn UI state nhỏ dùng useState/useContext. Nếu cần client state phức tạp → Zustand vì nhẹ hơn Redux.</Highlight></Callout>
                </TopicModal>

                <TopicModal title="Micro-Frontend (MFE)" emoji="🧩" color="#06b6d4" summary="Module Federation, Import Maps, Single-SPA, Multi-Zones — khi nào nên/không nên tách frontend">
                    <Paragraph>Micro-Frontend là kiến trúc <Highlight>chia frontend thành các app độc lập</Highlight>, mỗi team sở hữu 1 phần. Giống microservices nhưng cho frontend.</Paragraph>

                    <Callout type="info">🏬 <strong>Ẩn dụ: MFE = Trung tâm thương mại</strong><br /><br />
                        <strong>Monolith</strong> = 1 cửa hàng lớn bán tất cả → đội to quản lý 1 codebase → chậm deploy<br />
                        <strong>MFE</strong> = Trung tâm thương mại → mỗi gian hàng (team) <Highlight>tự trang trí, tự mở cửa, tự đóng cửa</Highlight><br />
                        • Gian hàng A dùng React, gian hàng B dùng Vue → <strong>vẫn chung 1 tòa nhà</strong><br />
                        • Mỗi gian hàng deploy độc lập → 1 team lỗi không ảnh hưởng cả mall
                    </Callout>

                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-gray-500/10 border border-gray-500/20">
                            <div className="text-gray-300 font-bold text-sm">📊 So sánh các approach MFE</div>
                            <div className="text-slate-300 text-sm mt-2">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-xs">
                                        <thead>
                                            <tr className="border-b border-white/10">
                                                <th className="text-left py-1.5 pr-2 text-slate-400 font-semibold">Approach</th>
                                                <th className="text-left py-1.5 pr-2 text-slate-400 font-semibold">Runtime</th>
                                                <th className="text-left py-1.5 pr-2 text-slate-400 font-semibold">Shared deps</th>
                                                <th className="text-left py-1.5 text-slate-400 font-semibold">Use case</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-slate-300">
                                            <tr className="border-b border-white/5"><td className="py-1.5 pr-2 font-bold text-gray-400">iFrame</td><td className="py-1.5 pr-2">Native Browser</td><td className="py-1.5 pr-2">Không (Isolate 100%)</td><td className="py-1.5">Legacy app embed, 3rd-party</td></tr>
                                            <tr className="border-b border-white/5"><td className="py-1.5 pr-2 font-bold text-blue-400">Module Federation</td><td className="py-1.5 pr-2">Build + Runtime</td><td className="py-1.5 pr-2">Có (shared React)</td><td className="py-1.5">Enterprise dashboard</td></tr>
                                            <tr className="border-b border-white/5"><td className="py-1.5 pr-2 font-bold text-green-400">Import Maps</td><td className="py-1.5 pr-2">Runtime (ESM)</td><td className="py-1.5 pr-2">Via import map</td><td className="py-1.5">Progressive migration</td></tr>
                                            <tr className="border-b border-white/5"><td className="py-1.5 pr-2 font-bold text-yellow-400">Single-SPA</td><td className="py-1.5 pr-2">Runtime orchestrator</td><td className="py-1.5 pr-2">Tùy chọn</td><td className="py-1.5">Multi-framework (React+Vue)</td></tr>
                                            <tr><td className="py-1.5 pr-2 font-bold text-purple-400">Next.js Multi-Zones</td><td className="py-1.5 pr-2">Server routing</td><td className="py-1.5 pr-2">Không cần</td><td className="py-1.5">Nhiều Next.js apps chung domain</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">📦 Module Federation (Webpack 5 / Rspack)</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • Phổ biến nhất trong enterprise. <strong>Share code runtime</strong> giữa các app<br />
                                • App A expose component → App B import <strong>trực tiếp qua URL</strong><br />
                                • Shared dependencies (React, React-DOM) → <Highlight>load 1 lần, dùng chung</Highlight><br />
                                • Rspack/Rsbuild hỗ trợ native, nhanh hơn Webpack 10x
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">🗺️ Import Maps (Native Browser)</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • Dùng <InlineCode>{'<script type="importmap">'}</InlineCode> trong HTML<br />
                                • Map package name → CDN URL, browser resolve runtime<br />
                                • <strong>Không cần bundler</strong> → mỗi team deploy ESM module riêng<br />
                                • Kết hợp tốt với Single-SPA
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                            <div className="text-yellow-400 font-bold text-sm">🎭 Single-SPA — Orchestrator</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Framework-agnostic</strong>: App A = React, App B = Vue, App C = Angular<br />
                                • Root config quyết định mount/unmount app theo route<br />
                                • Lifecycle hooks: bootstrap → mount → unmount<br />
                                • Phù hợp <Highlight>migration dần từ legacy (Angular → React)</Highlight>
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <div className="text-purple-400 font-bold text-sm">🔀 Next.js Multi-Zones</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • Nhiều Next.js apps chạy dưới <strong>cùng 1 domain</strong><br />
                                • Proxy/reverse proxy route: <InlineCode>/blog</InlineCode> → App A, <InlineCode>/shop</InlineCode> → App B<br />
                                • Mỗi app build + deploy <strong>độc lập</strong>, SSR/SSG riêng<br />
                                • Đơn giản nhất cho team đã dùng Next.js
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-gray-500/10 border border-gray-500/20">
                            <div className="text-gray-400 font-bold text-sm">🪟 iFrame (Cách MFE cổ điển nhất)</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • Tách biệt hoàn toàn 100% (CSS, JS, Security) — không bao giờ bị conflict<br />
                                • Phù hợp nhất để nhúng app legacy hoặc cổng thanh toán của bên thứ 3<br />
                                • <strong>Giao tiếp siêu khó:</strong> Phải dùng <InlineCode>postMessage</InlineCode> để gửi data qua lại<br />
                                • <strong>Điểm trừ:</strong> Tốn RAM (tải lại toàn bộ React/Vue 2 lần), SEO kém, và các component như Modal/Popup không thể tràn lấn ra ngoài viền iframe được.
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                            <div className="text-red-400 font-bold text-sm">🚫 Khi nào KHÔNG nên dùng MFE?</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • Team nhỏ ({`< 3 teams`}) → overhead lớn hơn lợi ích<br />
                                • App đơn giản, ít features → monolith tốt hơn<br />
                                • Shared state nhiều giữa các phần → coupling cao = MFE phức tạp<br />
                                • <Highlight>MFE giải quyết vấn đề tổ chức (team), không phải vấn đề kỹ thuật</Highlight>
                            </div>
                        </div>
                    </div>
                    <CodeBlock title="micro-frontend.ts">{`// ╔═══════════════════════════════════════╗
// ║  1. Module Federation (Webpack 5)     ║
// ╚═══════════════════════════════════════╝

// Remote App (Header) — webpack.config.js
new ModuleFederationPlugin({
  name: 'header',
  filename: 'remoteEntry.js',
  exposes: {
    './Header': './src/components/Header',
  },
  shared: {
    react: { singleton: true, requiredVersion: '^18' },
    'react-dom': { singleton: true },
  },
})

// Host App — import remote component
const Header = React.lazy(() => import('header/Header'))

function App() {
  return (
    <Suspense fallback={<HeaderSkeleton />}>
      <Header />  {/* Loaded from header app's remoteEntry.js */}
      <main>...</main>
    </Suspense>
  )
}

// ╔═══════════════════════════════════════╗
// ║  2. Import Maps (Native Browser)      ║
// ╚═══════════════════════════════════════╝

// index.html
// <script type="importmap">
// {
//   "imports": {
//     "react": "https://cdn.example.com/react@18/index.mjs",
//     "@team-a/header": "https://team-a.cdn.com/header.mjs",
//     "@team-b/cart": "https://team-b.cdn.com/cart.mjs"
//   }
// }
// </script>
// <script type="module" src="/app.mjs"></script>

// app.mjs — import bình thường, browser resolve qua import map
import { Header } from '@team-a/header'
import { Cart } from '@team-b/cart'

// ╔═══════════════════════════════════════╗
// ║  3. Single-SPA — Root Config          ║
// ╚═══════════════════════════════════════╝

import { registerApplication, start } from 'single-spa'

registerApplication({
  name: '@org/navbar',
  app: () => System.import('@org/navbar'),  // load từ CDN/server
  activeWhen: '/',  // luôn active
})

registerApplication({
  name: '@org/dashboard',
  app: () => System.import('@org/dashboard'),
  activeWhen: '/dashboard',  // chỉ mount khi route match
})

start()  // Single-SPA bắt đầu quản lý lifecycle

// ╔═══════════════════════════════════════╗
// ║  4. Next.js Multi-Zones              ║
// ╚═══════════════════════════════════════╝

// next.config.js (Main app)
module.exports = {
  async rewrites() {
    return [
      {
        source: '/blog/:path*',
        destination: 'https://blog-app.vercel.app/blog/:path*',
      },
      {
        source: '/shop/:path*',
        destination: 'https://shop-app.vercel.app/shop/:path*',
      },
    ]
  },
}
// → /blog/* → Blog Next.js app (team A)
// → /shop/* → Shop Next.js app (team B)
// → /* → Main Next.js app`}</CodeBlock>
                    <Callout type="tip">Interview: Hỏi {'"Tại sao dùng MFE?"'} → trả lời <Highlight>team autonomy + independent deploy</Highlight>, KHÔNG phải vì kỹ thuật. Nếu interviewer hỏi bạn chọn approach nào → Module Federation cho enterprise React, Multi-Zones cho Next.js team, Single-SPA cho multi-framework migration.</Callout>
                </TopicModal>
            </div >

            <Heading3>3.2 HTML/CSS (click để xem chi tiết)</Heading3>
            <div className="my-4 space-y-2">
                <TopicModal title="Semantic HTML & Accessibility" emoji="♿" color="#38bdf8" summary="Screen readers, ARIA, landmark roles — tại sao accessibility quan trọng trong interview">
                    <Paragraph><Highlight>Semantic HTML</Highlight> = dùng đúng tag cho đúng mục đích. Google, Apple đặc biệt coi trọng accessibility.</Paragraph>

                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">🏷️ Semantic vs Non-semantic Elements</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Landmark roles</strong>: {'<header>'}, {'<nav>'}, {'<main>'}, {'<aside>'}, {'<footer>'}, {'<article>'}, {'<section>'}<br />
                                • Screen readers dùng landmarks để <strong>navigate nhanh</strong> (skip to main content)<br />
                                • {'<div>'} và {'<span>'} là <strong>generic containers</strong> — không có semantic meaning<br />
                                • {'<button>'} vs {'<div onClick>'}: button có keyboard support + focus + role built-in
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <div className="text-purple-400 font-bold text-sm">🔊 ARIA (Accessible Rich Internet Applications)</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>aria-label</strong>: label cho elements không có visible text (icon buttons)<br />
                                • <strong>aria-expanded</strong>: dropdown/accordion đang mở hay đóng<br />
                                • <strong>aria-live</strong>: announce dynamic content changes (toasts, counters)<br />
                                • <strong>role</strong>: override semantic role (role={'"dialog"'}, role={'"alert"'}, role={'"tab"'})<br />
                                • ⚠️ Rule #1: <strong>Không cần ARIA nếu dùng đúng HTML tag</strong> (native semantics)
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">⌨️ Keyboard Navigation</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Tab order</strong>: focusable elements theo DOM order (tabIndex={'"0"'} để thêm)<br />
                                • <strong>Focus trap</strong>: Modal/Dialog phải giữ focus bên trong (Tab wrap around)<br />
                                • <strong>Skip links</strong>: {'"Skip to main content"'} link ẩn, hiện khi focus<br />
                                • <strong>Keyboard shortcuts</strong>: Escape close, Enter submit, Arrow keys navigate
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                            <div className="text-yellow-400 font-bold text-sm">🎨 Color & Visual Accessibility</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Color contrast</strong>: WCAG AA ≥ 4.5:1 (text), ≥ 3:1 (large text, UI components)<br />
                                • Không dùng color alone để convey meaning (thêm icon, text, pattern)<br />
                                • <strong>prefers-reduced-motion</strong>: disable animations cho users sensitive<br />
                                • <strong>prefers-color-scheme</strong>: dark/light mode support
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                            <div className="text-red-400 font-bold text-sm">🧪 Testing Accessibility</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>axe DevTools</strong>: Chrome extension scan a11y violations<br />
                                • <strong>Lighthouse</strong>: accessibility audit score<br />
                                • <strong>Screen reader</strong>: test với VoiceOver (Mac) hoặc NVDA (Windows)<br />
                                • <strong>jest-axe</strong>: automated a11y testing trong unit tests
                            </div>
                        </div>
                    </div>

                    <CodeBlock title="accessibility.html">{`<!-- ✅ Semantic + Accessible -->
<header>
  <nav aria-label="Main navigation">
    <ul role="menubar">
      <li role="none"><a role="menuitem" href="/">Home</a></li>
      <li role="none"><a role="menuitem" href="/about">About</a></li>
    </ul>
  </nav>
</header>

<main>
  <h1>Page Title</h1> <!-- Chỉ 1 h1 per page! -->
  <article>
    <h2>Article Title</h2>
    <p>Content...</p>
  </article>
</main>

<!-- ✅ Accessible Modal -->
<div role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <h2 id="modal-title">Confirm Delete</h2>
  <p>Are you sure?</p>
  <button autofocus>Cancel</button> <!-- autofocus on safe action -->
  <button>Delete</button>
</div>

<!-- ✅ Accessible Form -->
<label for="email">Email</label>
<input id="email" type="email" aria-required="true"
       aria-describedby="email-hint" aria-invalid="true" />
<span id="email-hint">example@domain.com</span>`}</CodeBlock>

                    <Callout type="tip">
                        Big tech hay hỏi: {'"Build component X accessible"'} — phải hỗ trợ keyboard navigation, screen reader, focus management.
                        Nhắc đến <Highlight>WCAG 2.1 Level AA</Highlight> + test bằng screen reader → điểm cộng lớn.
                    </Callout>
                </TopicModal>

                <TopicModal title="DOM Manipulation & Event Delegation" emoji="🎯" color="#f97316" summary={'Bubbling, Capturing, Delegation — hiểu event lan truyền thế nào trong DOM'}>
                    <Paragraph>Phỏng vấn frontend <Highlight>rất hay hỏi</Highlight> về event propagation. Hiểu cách event di chuyển trong DOM = debug được mọi vấn đề click/submit.</Paragraph>

                    <Callout type="info">{'🏢 '}<strong>Ẩn dụ: Event Propagation = Tin đồn trong công ty</strong><br /><br />
                        {'Bạn (nhân viên) kể '}<strong>tin đồn</strong>{' cho quản lý trực tiếp:'}<br /><br />
                        <strong>{'🔽 Capturing (đi xuống)'}</strong>{' = CEO nghe tin → truyền xuống → Director → Manager → đến bạn'}<br />
                        <strong>{'🎯 Target'}</strong>{' = Tin đồn '}<strong>đến đúng người kể</strong>{' (bạn)'}<br />
                        <strong>{'🔼 Bubbling (nổi bọt)'}</strong>{' = Bạn kể → Manager nghe → Director nghe → CEO cũng nghe!'}<br /><br />
                        {'Click vào con = bạn cũng đang click vào TẤT CẢ tổ tiên của nó! 🫧'}
                    </Callout>

                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                            <div className="text-orange-400 font-bold text-sm">{'🔄 Event Propagation — 3 giai đoạn'}</div>
                            <div className="text-slate-300 text-sm mt-1">
                                <strong>Flow:</strong>{' Capturing ↓ → Target 🎯 → Bubbling ↑'}<br /><br />
                                <InlineCode>{'window → document → html → body → div → p → a (Target)'}</InlineCode><br />
                                <InlineCode>{'a (Target) → p → div → body → html → document → window'}</InlineCode><br /><br />
                                {'• '}<strong>Capturing</strong>{': đi từ gốc (window) xuống đến target — ít khi dùng'}<br />
                                {'• '}<strong>Target</strong>{': event đến đúng element được click'}<br />
                                {'• '}<strong>Bubbling</strong>{': đi từ target ngược lên gốc — '}<Highlight>đây là mặc định!</Highlight>
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                            <div className="text-red-400 font-bold text-sm">{'🫧 Event Bubbling — Click con = click cha!'}</div>
                            <div className="text-slate-300 text-sm mt-1">
                                {'Khi click vào element con, event '}<strong>nổi bọt lên</strong>{' qua tất cả tổ tiên:'}<br /><br />
                                {'Click <p> → alert "p" → alert "div" → alert "form"'}<br /><br />
                                {'• '}<strong>Mặc định</strong>{': event listeners dùng bubbling phase'}<br />
                                {'• Hầu hết events đều bubble ('}<InlineCode>click</InlineCode>{', '}<InlineCode>input</InlineCode>{', '}<InlineCode>submit</InlineCode>{'...)'}<br />
                                {'• Một số KHÔNG bubble: '}<InlineCode>focus</InlineCode>{', '}<InlineCode>blur</InlineCode>{', '}<InlineCode>scroll</InlineCode>
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">{'🔽 Event Capturing — Bắt trước khi xuống'}</div>
                            <div className="text-slate-300 text-sm mt-1">
                                {'Capture = '}<strong>chặn event trước</strong>{' khi nó đến target:'}<br /><br />
                                <InlineCode>{`addEventListener('click', handler, true)`}</InlineCode>{' ← '}<strong>true</strong>{' = capture mode'}<br />
                                <InlineCode>{`addEventListener('click', handler, { capture: true })`}</InlineCode><br /><br />
                                {'• Ít dùng trong thực tế, nhưng phỏng vấn hay hỏi'}<br />
                                {'• Use case: '}<strong>global click handler</strong>{' cần chặn trước khi child xử lý'}
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">{'🎪 Event Delegation — Ủy quyền cho cha'}</div>
                            <div className="text-slate-300 text-sm mt-1">
                                {'Thay vì gắn event cho '}<strong>mỗi child</strong>{', gắn 1 lần cho '}<strong>parent</strong>{'!'}<br /><br />
                                {'• 1000 '}<InlineCode>{'<li>'}</InlineCode>{' → chỉ cần '}<strong>1 listener</strong>{' trên '}<InlineCode>{'<ul>'}</InlineCode><br />
                                {'• Dùng '}<InlineCode>event.target</InlineCode>{' để biết click vào child nào'}<br />
                                {'• '}<strong>Tại sao?</strong>{' Tiết kiệm memory + hoạt động cho elements thêm động (dynamically added)'}<br />
                                {'• '}<Highlight>Pattern phổ biến nhất trong thực tế!</Highlight>
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                            <div className="text-yellow-400 font-bold text-sm">{'🛑 stopPropagation & preventDefault'}</div>
                            <div className="text-slate-300 text-sm mt-1">
                                <strong>stopPropagation()</strong>{': ngăn event lan truyền tiếp (không bubble lên cha)'}<br />
                                <strong>preventDefault()</strong>{': ngăn hành vi mặc định (form submit, link navigate)'}<br /><br />
                                {'• Khác nhau! '}<InlineCode>stopPropagation</InlineCode>{' ≠ '}<InlineCode>preventDefault</InlineCode><br />
                                {'• '}<InlineCode>stopImmediatePropagation()</InlineCode>{': ngăn cả các listeners khác trên cùng element'}<br />
                                {'• ⚠️ Tránh lạm dụng stopPropagation — có thể phá analytics, 3rd party libs'}
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                            <div className="text-cyan-400 font-bold text-sm">{'⚛️ React & Event — Khác gì Vanilla JS?'}</div>
                            <div className="text-slate-300 text-sm mt-1">
                                {'React dùng '}<strong>Synthetic Events</strong>{' — wrapper chuẩn hóa cross-browser:'}<br /><br />
                                {'• React gắn '}<strong>1 listener duy nhất ở root</strong>{' (delegation pattern!)'}<br />
                                {'• '}<InlineCode>onClick</InlineCode>{' trong React = '}<strong>bubbling phase</strong>{' mặc định'}<br />
                                {'• '}<InlineCode>onClickCapture</InlineCode>{' = capture phase'}<br />
                                {'• '}<InlineCode>e.stopPropagation()</InlineCode>{' trong React chặn cả synthetic + native events (React 17+)'}<br />
                                {'• '}<InlineCode>e.nativeEvent</InlineCode>{' để truy cập event DOM gốc'}
                            </div>
                        </div>
                    </div>

                    <CodeBlock title="event-propagation.js">{`// ═══ 1. BUBBLING — Click con, cha cũng "nghe" ═══
<form onclick="alert('form')">
  <div onclick="alert('div')">
    <p onclick="alert('p')">Click tôi!</p>
  </div>
</form>
// Click <p> → alert "p" → "div" → "form" (nổi bọt lên!)
// Click <div> → alert "div" → "form" (skip <p>)

// ═══ 2. BUBBLING VỚI addEventListener ═══
const divs = document.querySelectorAll('div')

divs.forEach(div => div.addEventListener('click', function(e) {
  console.log(this.classList.value) // log class của div được click
}))

// <div class="1"><div class="2"><div class="3">Click</div></div></div>
// Click div.3 → log: "3" → "2" → "1" (bubbling!)

// ═══ 3. stopPropagation — Ngăn bubbling ═══
divs.forEach(div => div.addEventListener('click', function(e) {
  e.stopPropagation() // 🛑 Dừng! Không bubble lên nữa
  console.log(this.classList.value)
}))
// Click div.3 → log: "3" (chỉ mình nó, cha không nhận!)

// ═══ 4. CAPTURING — Bắt từ trên xuống ═══
document.querySelector('.1').addEventListener('click', () => {
  console.log('Capture: div.1') // ← chạy TRƯỚC
}, true) // 👈 true = capture mode

document.querySelector('.3').addEventListener('click', () => {
  console.log('Bubble: div.3') // ← chạy SAU
})
// Click div.3 → "Capture: div.1" → "Bubble: div.3"

// ═══ 5. EVENT DELEGATION — Pattern quan trọng nhất ═══
// ❌ Bad: gắn listener cho MỖI item (1000 items = 1000 listeners!)
document.querySelectorAll('li').forEach(li => {
  li.addEventListener('click', handleClick) // 💀 memory waste
})

// ✅ Good: gắn 1 listener cho parent, dùng event.target
document.getElementById('taskList').addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    e.target.classList.toggle('completed')
    console.log('Clicked:', e.target.textContent)
  }
})
// Thêm <li> mới sau? VẪN HOẠT ĐỘNG! Không cần gắn listener lại
// → Đây là cách React hoạt động bên dưới (delegation ở root)

// ═══ 6. preventDefault vs stopPropagation ═══
// preventDefault: ngăn HÀNH VI MẶC ĐỊNH
document.querySelector('a').addEventListener('click', (e) => {
  e.preventDefault() // link không navigate
  console.log('Link clicked but not navigated')
})

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault() // form không reload page
  // validate + submit bằng fetch() thay vì form action
})

// stopPropagation: ngăn LAN TRUYỀN (event không bubble lên cha)
document.querySelector('.modal').addEventListener('click', (e) => {
  e.stopPropagation() // click trong modal không đóng overlay
})
document.querySelector('.overlay').addEventListener('click', () => {
  closeModal() // chỉ close khi click NGOÀI modal
})`}</CodeBlock>

                    <CodeBlock title="react-events.tsx">{`// React Synthetic Events — delegation pattern built-in!

// 1. onClick = bubbling (mặc định)
function App() {
  return (
    <div onClick={() => console.log('div')}>
      <button onClick={(e) => {
        e.stopPropagation() // ngăn bubble lên div
        console.log('button')
      }}>
        Click me
      </button>
    </div>
  )
}
// Click button → "button" (không log "div" nhờ stopPropagation)

// 2. onClickCapture = capturing phase
function CaptureExample() {
  return (
    <div onClickCapture={() => console.log('1. capture: div')}>
      <button onClick={() => console.log('2. bubble: button')}>
        Click me
      </button>
    </div>
  )
}
// Click button → "1. capture: div" → "2. bubble: button"

// 3. Event Delegation trong React — TaskList
function TaskList() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Task 1', done: false },
    { id: 2, text: 'Task 2', done: false },
    { id: 3, text: 'Task 3', done: false },
  ])

  // ✅ 1 handler cho cả list — delegation pattern!
  const handleClick = (e: React.MouseEvent) => {
    const li = (e.target as HTMLElement).closest('li')
    if (!li) return
    const id = Number(li.dataset.id)
    setTasks(prev => prev.map(t =>
      t.id === id ? { ...t, done: !t.done } : t
    ))
  }

  return (
    <ul onClick={handleClick}>
      {tasks.map(t => (
        <li key={t.id} data-id={t.id}
            style={{ textDecoration: t.done ? 'line-through' : 'none' }}>
          {t.text}
        </li>
      ))}
    </ul>
  )
}`}</CodeBlock>

                    <div className="my-3 overflow-x-auto">
                        <table className="w-full text-sm border-collapse">
                            <thead><tr className="border-b border-white/10">
                                <th className="text-left p-3 text-slate-400 font-medium">Khái niệm</th>
                                <th className="text-left p-3 text-slate-400 font-medium">Hướng</th>
                                <th className="text-left p-3 text-slate-400 font-medium">Mô tả</th>
                            </tr></thead>
                            <tbody className="text-slate-300">
                                <tr className="border-b border-white/5"><td className="p-3 font-bold text-blue-400">Capturing</td><td className="p-3">↓ Xuống</td><td className="p-3">window → ... → target</td></tr>
                                <tr className="border-b border-white/5"><td className="p-3 font-bold text-orange-400">Target</td><td className="p-3">🎯</td><td className="p-3">Element được click</td></tr>
                                <tr className="border-b border-white/5"><td className="p-3 font-bold text-red-400">Bubbling</td><td className="p-3">↑ Lên</td><td className="p-3">{'target → ... → window'}</td></tr>
                                <tr className="border-b border-white/5"><td className="p-3 font-bold text-green-400">Delegation</td><td className="p-3">—</td><td className="p-3">Gắn listener ở cha, dùng event.target</td></tr>
                                <tr className="border-b border-white/5"><td className="p-3 font-bold text-yellow-400">stopPropagation</td><td className="p-3">🛑</td><td className="p-3">Ngăn event lan truyền tiếp</td></tr>
                                <tr><td className="p-3 font-bold text-pink-400">preventDefault</td><td className="p-3">🚫</td><td className="p-3">Ngăn hành vi mặc định (submit, navigate)</td></tr>
                            </tbody>
                        </table>
                    </div>

                    <Callout type="tip">
                        {'Phỏng vấn hỏi Event? Nhớ '}<Highlight>4 ý chính</Highlight>{':'}<br />
                        {'1️⃣ '}<strong>Flow</strong>{': Capturing ↓ → Target 🎯 → Bubbling ↑'}<br />
                        {'2️⃣ '}<strong>Bubbling</strong>{': click con = click cha (mặc định)'}<br />
                        {'3️⃣ '}<strong>Delegation</strong>{': 1 listener ở cha, dùng event.target — tiết kiệm memory + dynamic elements'}<br />
                        {'4️⃣ '}<strong>React</strong>{': SyntheticEvent + delegation ở root + onClickCapture cho capture phase'}
                    </Callout>
                </TopicModal>


                <TopicModal title="Web APIs — Observer Pattern" emoji="🔭" color="#14b8a6" summary={'IntersectionObserver, ResizeObserver, MutationObserver — tại sao không dùng scroll event cũ?'}>
                    <Paragraph>Browser cung cấp <Highlight>Observer APIs</Highlight> để theo dõi DOM thay đổi — hiệu quả hơn nhiều so với cách cũ dùng scroll event + getBoundingClientRect.</Paragraph>

                    <Callout type="info">{'📦 '}<strong>Ẩn dụ: Observer = Thông báo giao hàng</strong><br /><br />
                        <strong>{'❌ Cách cũ (Polling)'}</strong>{' = Cứ mỗi giây gọi shipper: "Hàng tới chưa? Chưa? Chưa?" 📞📞📞 → tốn năng lượng'}<br />
                        <strong>{'✅ Observer (Push)'}</strong>{' = Bật thông báo, shipper '}<strong>tự gọi bạn</strong>{' khi tới 🔔 → rảnh tay, hiệu quả'}<br /><br />
                        {'scroll event = polling (hỏi liên tục). Observer = push notification (browser báo khi cần).'}
                    </Callout>

                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                            <div className="text-red-400 font-bold text-sm">{'❌ Cách cũ: scroll + getBoundingClientRect'}</div>
                            <div className="text-slate-300 text-sm mt-1">
                                {'• Scroll event fires '}<strong>60-120 lần/giây</strong>{' — mỗi lần scroll nhẹ = hàng chục callback'}<br />
                                {'• '}<InlineCode>getBoundingClientRect()</InlineCode>{' = '}<strong>forced reflow</strong>{' — browser phải tính lại layout MỖI LẦN gọi'}<br />
                                {'• Tất cả chạy trên '}<strong>main thread</strong>{' → UI janky, tốn pin mobile'}<br />
                                {'• Thậm chí '}<InlineCode>throttle</InlineCode>{'/'}<InlineCode>debounce</InlineCode>{' vẫn gọi getBoundingClientRect → vẫn forced reflow!'}<br />
                                {'• Dùng '}<InlineCode>useState</InlineCode>{' + scroll = '}<Highlight>60-120 re-renders/giây</Highlight>{' 💀'}
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-teal-500/10 border border-teal-500/20">
                            <div className="text-teal-400 font-bold text-sm">{'👁️ IntersectionObserver — element có trong viewport không?'}</div>
                            <div className="text-slate-300 text-sm mt-1">
                                {'Thay thế: '}<InlineCode>scroll</InlineCode>{' + '}<InlineCode>getBoundingClientRect()</InlineCode><br /><br />
                                {'• Chạy '}<strong>off main thread</strong>{' — không block UI'}<br />
                                {'• Callback chỉ fire '}<strong>khi element vào/ra viewport</strong>{' (2 lần vs 120 lần/giây!)'}<br />
                                {'• '}<InlineCode>threshold</InlineCode>{': bao nhiêu % visible thì fire (0, 0.5, 1)'}<br />
                                {'• '}<InlineCode>rootMargin</InlineCode>{': mở rộng vùng detect (preload trước 200px)'}<br />
                                {'• Use cases: '}<Highlight>lazy load images, infinite scroll, analytics tracking, animation on scroll</Highlight>
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">{'📐 ResizeObserver — element thay đổi kích thước'}</div>
                            <div className="text-slate-300 text-sm mt-1">
                                {'Thay thế: '}<InlineCode>window.resize</InlineCode>{' + '}<InlineCode>offsetWidth/offsetHeight</InlineCode><br /><br />
                                {'• Theo dõi '}<strong>từng element</strong>{', không phải cả window'}<br />
                                {'• Phát hiện resize do '}<strong>content thay đổi</strong>{', không chỉ window resize'}<br />
                                {'• '}<InlineCode>contentRect</InlineCode>{', '}<InlineCode>borderBoxSize</InlineCode>{' — thông tin chi tiết'}<br />
                                {'• Use cases: '}<Highlight>responsive components, chart resize, text truncation</Highlight>
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <div className="text-purple-400 font-bold text-sm">{'🧬 MutationObserver — DOM thay đổi'}</div>
                            <div className="text-slate-300 text-sm mt-1">
                                {'Thay thế: '}<InlineCode>DOMSubtreeModified</InlineCode>{' (deprecated!)'}<br /><br />
                                {'• Theo dõi: '}<strong>attributes</strong>{', '}<strong>childList</strong>{', '}<strong>characterData</strong><br />
                                {'• '}<strong>Batched + async</strong>{' — gom nhiều mutations lại rồi fire 1 lần'}<br />
                                {'• Use cases: '}<Highlight>3rd party script injection detection, dynamic DOM changes, WYSIWYG editor</Highlight>
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                            <div className="text-orange-400 font-bold text-sm">{'📊 So sánh: Cách cũ vs Observer'}</div>
                            <div className="text-slate-300 text-sm mt-2">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-xs">
                                        <thead>
                                            <tr className="border-b border-white/10">
                                                <th className="text-left py-1.5 pr-2 text-slate-400 font-semibold"></th>
                                                <th className="text-left py-1.5 pr-2 text-red-400 font-semibold">Cách cũ ❌</th>
                                                <th className="text-left py-1.5 text-teal-400 font-semibold">Observer ✅</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-slate-300">
                                            <tr className="border-b border-white/5"><td className="py-1.5 pr-2 font-bold">Callback</td><td className="py-1.5 pr-2">60-120 lần/giây</td><td className="py-1.5">Chỉ khi thay đổi (2 lần)</td></tr>
                                            <tr className="border-b border-white/5"><td className="py-1.5 pr-2 font-bold">Thread</td><td className="py-1.5 pr-2">Main thread (block UI)</td><td className="py-1.5">Off main thread</td></tr>
                                            <tr className="border-b border-white/5"><td className="py-1.5 pr-2 font-bold">Layout</td><td className="py-1.5 pr-2">Forced reflow mỗi frame</td><td className="py-1.5">Browser tự handle</td></tr>
                                            <tr className="border-b border-white/5"><td className="py-1.5 pr-2 font-bold">Re-renders</td><td className="py-1.5 pr-2">60-120/giây với useState</td><td className="py-1.5">2 lần (vào + ra)</td></tr>
                                            <tr><td className="py-1.5 pr-2 font-bold">Code</td><td className="py-1.5 pr-2">throttle + getBoundingClientRect + logic</td><td className="py-1.5">5 dòng observer.observe()</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <CodeBlock title="observers.js">{`// ═══ 1. IntersectionObserver — Lazy load + Infinite scroll ═══

// ❌ Cách cũ: scroll event + getBoundingClientRect (RẤT TỆ!)
window.addEventListener('scroll', () => {
  const rect = img.getBoundingClientRect() // forced reflow MỖI FRAME!
  if (rect.top < window.innerHeight) {
    img.src = img.dataset.src // load image
  }
}) // 💀 60-120 calls/giây, block main thread

// ✅ Observer: browser tự báo khi element vào viewport
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target
      img.src = img.dataset.src
      observer.unobserve(img) // load xong → ngừng observe
    }
  })
}, {
  rootMargin: '200px', // preload trước 200px
  threshold: 0.1       // 10% visible → fire
})

document.querySelectorAll('img[data-src]').forEach(img => {
  observer.observe(img) // set & forget! 🎉
})

// ═══ 2. Infinite Scroll ═══
const sentinel = document.getElementById('load-more')

const scrollObserver = new IntersectionObserver(async ([entry]) => {
  if (entry.isIntersecting) {
    const data = await fetch('/api/posts?page=' + nextPage)
    appendPosts(data)
    nextPage++
  }
})
scrollObserver.observe(sentinel)
// User scroll gần cuối → sentinel vào viewport → load thêm

// ═══ 3. ResizeObserver — Responsive component ═══

// ❌ Cách cũ: window.resize chỉ detect CỬA SỔ thay đổi
window.addEventListener('resize', () => {
  const width = chart.offsetWidth // forced reflow
  redrawChart(width)
})

// ✅ ResizeObserver: detect ELEMENT thay đổi (kể cả do content)
const resizeObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const { width, height } = entry.contentRect
    console.log('New size:', width, 'x', height)
    redrawChart(width) // chỉ fire khi element thực sự thay đổi size
  }
})
resizeObserver.observe(chartContainer)

// ═══ 4. MutationObserver — Detect DOM changes ═══
const mutationObserver = new MutationObserver((mutations) => {
  mutations.forEach(mutation => {
    if (mutation.type === 'childList') {
      console.log('Nodes added:', mutation.addedNodes)
      console.log('Nodes removed:', mutation.removedNodes)
    }
    if (mutation.type === 'attributes') {
      console.log('Attr changed:', mutation.attributeName)
    }
  })
})

mutationObserver.observe(document.body, {
  childList: true,   // thêm/xóa child nodes
  attributes: true,  // attribute thay đổi
  subtree: true,     // theo dõi cả descendants
})`}</CodeBlock>

                    <CodeBlock title="react-observers.tsx">{`// React + IntersectionObserver = Custom Hook

// ✅ useInView — hook tái sử dụng
function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting)
      // setState CHỈ 2 lần (vào + ra) thay vì 120 lần/giây!
    }, options)

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [options])

  return { ref, isInView }
}

// Sử dụng:
function LazySection() {
  const { ref, isInView } = useInView({ threshold: 0.1 })
  return (
    <div ref={ref}>
      {isInView ? <HeavyChart /> : <Skeleton />}
    </div>
  )
}

// ✅ Infinite scroll với IntersectionObserver
function InfiniteList() {
  const [items, setItems] = useState([])
  const [page, setPage] = useState(1)
  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setPage(p => p + 1) // load thêm khi sentinel visible
      }
    })
    if (sentinelRef.current) observer.observe(sentinelRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    fetch('/api/items?page=' + page)
      .then(r => r.json())
      .then(data => setItems(prev => [...prev, ...data]))
  }, [page])

  return (
    <>
      {items.map(item => <Card key={item.id} {...item} />)}
      <div ref={sentinelRef} /> {/* invisible sentinel */}
    </>
  )
}

// ✅ ResizeObserver hook
function useElementSize() {
  const ref = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setSize({ width, height })
    })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return { ref, ...size }
}

// Sử dụng: responsive component không cần media queries!
function ResponsiveGrid() {
  const { ref, width } = useElementSize()
  const columns = width > 800 ? 3 : width > 500 ? 2 : 1
  return (
    <div ref={ref} style={{
      display: 'grid',
      gridTemplateColumns: \`repeat(\${columns}, 1fr)\`
    }}>
      {children}
    </div>
  )
}`}</CodeBlock>

                    <Callout type="tip">
                        {'Phỏng vấn hỏi Observer? Nhớ '}<Highlight>3 ý chính</Highlight>{':'}<br />
                        {'1️⃣ '}<strong>Tại sao?</strong>{' Scroll event block main thread + forced reflow. Observer chạy off main thread, chỉ fire khi thay đổi.'}<br />
                        {'2️⃣ '}<strong>3 Observers</strong>{': IntersectionObserver (viewport), ResizeObserver (size), MutationObserver (DOM changes)'}<br />
                        {'3️⃣ '}<strong>React pattern</strong>{': custom hook (useInView, useElementSize) + cleanup observer.disconnect() trong useEffect return'}
                    </Callout>
                </TopicModal>

                <TopicModal title="CSS Layout — Flexbox & Grid" emoji="📐" color="#38bdf8" summary="Layout từ scratch không framework — kỹ năng interview quan trọng">
                    <Paragraph>Coding interview frontend thường yêu cầu xây layout <Highlight>từ scratch không TailwindCSS</Highlight>. Phải thành thạo cả Flexbox lẫn Grid.</Paragraph>

                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">📏 Flexbox — 1 chiều</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Main axis</strong>: justify-content (start, center, space-between, space-around, space-evenly)<br />
                                • <strong>Cross axis</strong>: align-items (flex-start, center, stretch, baseline)<br />
                                • <strong>flex</strong>: shorthand cho grow shrink basis → <InlineCode>flex: 1 0 auto</InlineCode><br />
                                • <strong>flex-wrap</strong>: cho phép items xuống dòng (responsive)
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">📊 Grid — 2 chiều</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>grid-template-columns/rows</strong>: define tracks (px, fr, auto, minmax)<br />
                                • <strong>grid-area</strong>: named areas cho complex layouts<br />
                                • <strong>auto-fill vs auto-fit</strong>: auto-fill giữ empty tracks, auto-fit collapse<br />
                                • <strong>minmax()</strong>: responsive columns không cần media queries
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <div className="text-purple-400 font-bold text-sm">🆚 Khi nào dùng cái nào</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Flexbox</strong>: navbar, card row, centering, sidebar + content<br />
                                • <strong>Grid</strong>: page layout, dashboard, image gallery, form layout<br />
                                • <strong>Kết hợp</strong>: Grid cho page layout, Flexbox cho component bên trong<br />
                                • Interview tip: luôn hỏi {'"responsive không?"'} → quyết cách approach
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                            <div className="text-yellow-400 font-bold text-sm">📱 Responsive Design</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Mobile-first</strong>: CSS default cho mobile, media queries cho larger screens<br />
                                • <strong>Container queries</strong> (new!): responsive dựa trên parent size thay vì viewport<br />
                                • <strong>clamp()</strong>: fluid typography: <InlineCode>font-size: clamp(1rem, 2vw, 1.5rem)</InlineCode><br />
                                • <strong>Logical properties</strong>: margin-inline, padding-block (RTL support)
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                            <div className="text-red-400 font-bold text-sm">🎯 Box Model & Positioning</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>box-sizing: border-box</strong>: width includes padding + border (LUÔN set!)<br />
                                • <strong>Position</strong>: static (default), relative, absolute, fixed, sticky<br />
                                • <strong>Stacking context</strong>: z-index chỉ hoạt động trong cùng stacking context<br />
                                • <strong>BFC</strong> (Block Formatting Context): overflow: hidden tạo BFC mới → clear floats
                            </div>
                        </div>
                    </div>

                    <CodeBlock title="css-layout.css">{`/* Flexbox — Navbar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  height: 64px;
}
.navbar__links { display: flex; gap: 16px; }

/* Grid — Dashboard Layout */
.dashboard {
  display: grid;
  grid-template-columns: 250px 1fr;      /* sidebar + content */
  grid-template-rows: 64px 1fr;          /* header + main */
  grid-template-areas:
    "header  header"
    "sidebar content";
  height: 100vh;
}
.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.content { grid-area: content; }

/* Responsive Cards — NO media queries */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

/* Holy Grail Layout — Flexbox */
.holy-grail { display: flex; flex-direction: column; min-height: 100vh; }
.holy-grail main { flex: 1; display: flex; }
.holy-grail .content { flex: 1; }
.holy-grail .sidebar { flex: 0 0 250px; }

/* Centering — nhiều cách */
.center-flex { display: flex; justify-content: center; align-items: center; }
.center-grid { display: grid; place-items: center; }
.center-abs  { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); }`}</CodeBlock>

                    <Callout type="tip">
                        Interview: thường yêu cầu xây <Highlight>responsive layout từ scratch</Highlight>. Luyện: Holy Grail Layout, Dashboard Grid, Card Grid responsive, Modal centering.
                    </Callout>
                </TopicModal>

                <TopicModal title="Web Security — XSS, CSRF, CSP" emoji="🛡️" color="#38bdf8" summary="Các lỗ hổng bảo mật web phổ biến — phải biết cách phòng chống">
                    <Paragraph>Frontend developer <Highlight>phải hiểu security</Highlight> — đặc biệt ở big tech, câu hỏi security rất phổ biến.</Paragraph>

                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                            <div className="text-red-400 font-bold text-sm">💉 XSS (Cross-Site Scripting)</div>
                            <div className="text-slate-300 text-sm mt-1">
                                Attacker inject malicious JS vào trang → steal cookies, redirect, keylog.<br />
                                <strong>3 loại:</strong><br />
                                • <strong>Stored XSS</strong>: script lưu trong DB → mọi user thấy (nguy hiểm nhất)<br />
                                • <strong>Reflected XSS</strong>: script trong URL → server trả về HTML chứa script<br />
                                • <strong>DOM-based XSS</strong>: script thay đổi DOM client-side (innerHTML, eval)<br />
                                <strong>Phòng:</strong> React auto-escape JSX. KHÔNG dùng <InlineCode>dangerouslySetInnerHTML</InlineCode>. Sanitize input (DOMPurify).
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                            <div className="text-yellow-400 font-bold text-sm">🔗 CSRF (Cross-Site Request Forgery)</div>
                            <div className="text-slate-300 text-sm mt-1">
                                Attacker trick user gửi request từ site khác (ví dụ: transfer tiền).<br />
                                • User đang logged in site A → visit site B → site B gửi request tới A<br />
                                • Browser tự attach cookies → server nghĩ là legitimate request<br />
                                <strong>Phòng:</strong><br />
                                • <strong>CSRF token</strong>: random token per session, verify mỗi request<br />
                                • <strong>SameSite cookie</strong>: SameSite=Strict hoặc Lax<br />
                                • <strong>Double submit</strong>: token trong cookie + header, server so sánh
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">🔒 CSP (Content Security Policy)</div>
                            <div className="text-slate-300 text-sm mt-1">
                                HTTP header chỉ định sources được phép load resources.<br />
                                • <strong>script-src</strong>: chỉ cho phép JS từ sources nhất định<br />
                                • <strong>style-src</strong>: chỉ cho phép CSS từ sources nhất định<br />
                                • <strong>img-src</strong>: chỉ cho phép images từ sources nhất định<br />
                                • <InlineCode>{'{`Content-Security-Policy: script-src \'self\' https://cdn.example.com`}'}</InlineCode>
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">🍪 Cookie Security</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>HttpOnly</strong>: JS không đọc được cookie → chống XSS steal session<br />
                                • <strong>Secure</strong>: chỉ gửi qua HTTPS<br />
                                • <strong>SameSite</strong>: Strict (chỉ same-site), Lax (safe methods OK), None (all)<br />
                                • <strong>Domain + Path</strong>: scope cookie cho specific subdomain/path
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <div className="text-purple-400 font-bold text-sm">🛡️ Other Security Headers</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>CORS</strong>: Access-Control-Allow-Origin — control cross-origin requests<br />
                                • <strong>X-Frame-Options</strong>: DENY — chống clickjacking (iframe embed)<br />
                                • <strong>HSTS</strong>: force HTTPS, prevent SSL stripping<br />
                                • <strong>Subresource Integrity</strong>: verify CDN resources chưa bị tamper
                            </div>
                        </div>
                    </div>

                    <CodeBlock title="security-examples.ts">{`// ❌ XSS Vulnerability
element.innerHTML = userInput // NEVER DO THIS
eval(userInput)               // NEVER DO THIS

// ✅ Safe: React auto-escapes
<div>{userInput}</div>  // React escapes special chars

// ✅ If you MUST use HTML, sanitize first
import DOMPurify from 'dompurify'
const clean = DOMPurify.sanitize(dirtyHTML)
<div dangerouslySetInnerHTML={{ __html: clean }} />

// ✅ Cookie security settings
Set-Cookie: session=abc123;
  HttpOnly;        // JS cannot read
  Secure;          // HTTPS only
  SameSite=Strict; // No cross-site
  Path=/;
  Max-Age=86400;

// ✅ Security headers (Next.js example)
// next.config.js
headers: [{
  source: '/(.*)',
  headers: [
    { key: 'Content-Security-Policy', value: "script-src 'self'" },
    { key: 'X-Frame-Options', value: 'DENY' },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'Strict-Transport-Security', value: 'max-age=31536000' },
  ]
}]`}</CodeBlock>

                    <Callout type="tip">
                        Interview: Luôn nhắc tới <Highlight>defense in depth</Highlight> — không rely vào 1 layer.
                        XSS: escape + CSP + HttpOnly. CSRF: SameSite + token. Biết giải thích <strong>tại sao</strong> mỗi biện pháp cần thiết.
                    </Callout>
                </TopicModal>

                <TopicModal title="Core Web Vitals" emoji="📊" color="#38bdf8" summary="LCP, INP, CLS — Google đo performance thế nào, cách tối ưu">
                    <Paragraph>Core Web Vitals là metrics <Highlight>Google dùng để rank SEO</Highlight>. Frontend engineer phải biết optimize.</Paragraph>

                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">🖼️ LCP (Largest Contentful Paint) — {'< 2.5s'}</div>
                            <div className="text-slate-300 text-sm mt-1">
                                Thời gian render element lớn nhất visible trong viewport.<br />
                                <strong>Tối ưu:</strong><br />
                                • <strong>Optimize images</strong>: WebP/AVIF, responsive srcset, lazy loading<br />
                                • <strong>Preload</strong>: critical assets (hero image, fonts)<br />
                                • <strong>SSR/SSG</strong>: HTML có content ngay (không đợi JS)<br />
                                • <strong>CDN</strong>: serve static assets gần user
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">👆 INP (Interaction to Next Paint) — {'< 200ms'}</div>
                            <div className="text-slate-300 text-sm mt-1">
                                Thời gian từ user interaction → visual response (thay thế FID).<br />
                                <strong>Tối ưu:</strong><br />
                                • <strong>Reduce JS execution</strong>: code splitting, tree shaking<br />
                                • <strong>Web Workers</strong>: heavy computation off main thread<br />
                                • <strong>Debounce/throttle</strong>: limit event handler frequency<br />
                                • <strong>requestIdleCallback</strong>: defer non-critical work
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                            <div className="text-yellow-400 font-bold text-sm">📐 CLS (Cumulative Layout Shift) — {'< 0.1'}</div>
                            <div className="text-slate-300 text-sm mt-1">
                                Đo layout shifts không mong muốn (content nhảy lung tung).<br />
                                <strong>Tối ưu:</strong><br />
                                • <strong>Set dimensions</strong>: width + height cho images/videos/ads<br />
                                • <strong>font-display: optional</strong>: tránh FOUT (flash of unstyled text)<br />
                                • <strong>Skeleton loading</strong>: placeholder giữ layout ổn định<br />
                                • <strong>transform</strong> animations: không trigger layout (chỉ composite)
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <div className="text-purple-400 font-bold text-sm">🔧 Rendering Pipeline</div>
                            <div className="text-slate-300 text-sm mt-1">
                                <strong>JS → Style → Layout → Paint → Composite</strong><br />
                                • <strong>Layout thrashing</strong>: đọc layout → ghi → đọc → ghi → forced reflow!<br />
                                • <strong>Composite-only</strong>: transform + opacity — cheapest animations (GPU)<br />
                                • <strong>will-change</strong>: hint browser chuẩn bị compose layer mới<br />
                                • <strong>contain</strong>: CSS containment — isolate rendering subtree
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                            <div className="text-red-400 font-bold text-sm">📏 Đo lường & Tools</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Lighthouse</strong> (Chrome DevTools): comprehensive audit<br />
                                • <strong>web.dev/measure</strong>: online tool by Google<br />
                                • <strong>PageSpeed Insights</strong>: real user data (CrUX) + lab data<br />
                                • <strong>web-vitals</strong> library: measure CWV trong production<br />
                                • <strong>Performance API</strong>: PerformanceObserver cho custom metrics
                            </div>
                        </div>
                    </div>

                    <CodeBlock title="performance-optimization.tsx">{`// Measure Core Web Vitals in production
import { onLCP, onINP, onCLS } from 'web-vitals'

onLCP(metric => analytics.send('LCP', metric.value))
onINP(metric => analytics.send('INP', metric.value))
onCLS(metric => analytics.send('CLS', metric.value))

// ✅ Optimize images — responsive + lazy
<img
  src="/hero-800.webp"
  srcSet="/hero-400.webp 400w, /hero-800.webp 800w, /hero-1200.webp 1200w"
  sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px"
  loading="lazy"           // lazy: below fold, eager: above fold
  decoding="async"         // decode off main thread
  width={800} height={400} // prevent CLS!
  alt="Hero banner"
/>

// ✅ Preload critical resources
<link rel="preload" href="/fonts/Inter.woff2" as="font" crossOrigin="" />
<link rel="preload" href="/hero.webp" as="image" />
<link rel="preconnect" href="https://api.example.com" />

// ✅ Avoid layout thrashing
// ❌ Bad: read → write → read → write (forced reflow)
elements.forEach(el => {
  const height = el.offsetHeight  // read (force layout)
  el.style.height = height + 10   // write (invalidate layout)
})
// ✅ Good: batch reads, then batch writes
const heights = elements.map(el => el.offsetHeight)  // all reads
elements.forEach((el, i) => el.style.height = heights[i] + 10)  // all writes`}</CodeBlock>

                    <Callout type="tip">
                        Interview: Khi được hỏi {'"Trang web chậm, bạn sẽ làm gì?"'} → <Highlight>đo trước (Lighthouse)</Highlight> → xác định bottleneck (LCP? INP? CLS?) → apply giải pháp cụ thể. Không optimize mù!
                    </Callout>
                    <a href="/blogs/core-web-vitals" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 Xem bài viết chi tiết →</a>
                </TopicModal>

                <TopicModal title="CSS Specificity & Cascade" emoji="⚖️" color="#38bdf8" summary="Specificity calculation, cascade order, inheritance — tại sao CSS không apply đúng?">
                    <Paragraph><Highlight>Specificity</Highlight> quyết định rule CSS nào {'"thắng"'} khi có conflict — câu hỏi interview rất phổ biến.</Paragraph>
                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">📊 Specificity Hierarchy (thấp → cao)</div>
                            <div className="text-slate-300 text-sm mt-1">
                                1. <strong>Type selectors</strong>: <InlineCode>div</InlineCode>, <InlineCode>p</InlineCode>, <InlineCode>h1</InlineCode> → (0,0,1)<br />
                                2. <strong>Class, pseudo-class, attribute</strong>: <InlineCode>.btn</InlineCode>, <InlineCode>:hover</InlineCode>, <InlineCode>[type=text]</InlineCode> → (0,1,0)<br />
                                3. <strong>ID selectors</strong>: <InlineCode>#header</InlineCode> → (1,0,0)<br />
                                4. <strong>Inline styles</strong>: style=&quot;...&quot; → (1,0,0,0)<br />
                                5. <strong>!important</strong>: overrides everything (avoid!)
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">🎯 Cascade Order</div>
                            <div className="text-slate-300 text-sm mt-1">
                                Khi specificity bằng nhau, cascade order quyết định:<br />
                                1. <strong>Origin</strong>: User Agent → User → Author<br />
                                2. <strong>Specificity</strong>: tính toán ở trên<br />
                                3. <strong>Source order</strong>: rule sau ghi đè rule trước<br />
                                4. <strong>@layer</strong> (new!): cascade layers — kiểm soát thứ tự
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                            <div className="text-yellow-400 font-bold text-sm">🧬 Inheritance</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Inherited</strong>: color, font-*, text-*, line-height, visibility<br />
                                • <strong>Not inherited</strong>: margin, padding, border, display, position<br />
                                • <InlineCode>inherit</InlineCode>: force inheritance | <InlineCode>initial</InlineCode>: reset to default<br />
                                • <InlineCode>unset</InlineCode>: inherit nếu inherited, initial nếu không
                            </div>
                        </div>
                    </div>
                    <CodeBlock title="specificity.css">{`/* Specificity calculation: (ID, Class, Type) */
p { color: blue; }                    /* (0,0,1) */
.text { color: green; }               /* (0,1,0) ✅ wins over p */
#main { color: red; }                 /* (1,0,0) ✅ wins over .text */
p.text.highlight { }                  /* (0,2,1) */
#main .text { }                       /* (1,1,0) */

/* ❌ Common mistake: over-specific selectors */
div#app > ul.nav > li.item > a.link { }  /* (1,3,4) — too specific! */

/* ✅ Better: keep specificity low */
.nav-link { }                          /* (0,1,0) — easy to override */

/* @layer — cascade layers (modern CSS) */
@layer base, components, utilities;
@layer base { .btn { padding: 8px 16px; } }
@layer components { .btn { background: blue; } }
@layer utilities { .btn-lg { padding: 16px 32px; } }
/* Order: base < components < utilities */`}</CodeBlock>
                    <Callout type="tip">Interview quiz: <InlineCode>{'.a.b'}</InlineCode> vs <InlineCode>{'.a .b'}</InlineCode> — cái đầu là <Highlight>AND</Highlight> (cùng element), cái sau là <Highlight>descendant</Highlight>. Biết tính specificity = senior CSS skill.</Callout>
                </TopicModal>

                <TopicModal title="CSS Animations & Transitions" emoji="✨" color="#38bdf8" summary="transition, keyframes, transform, will-change — micro-interactions cho UI premium">
                    <Paragraph><Highlight>Animations</Highlight> làm UI sống động và professional — nhưng phải hiểu performance implications.</Paragraph>
                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">🔄 Transition vs Animation</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Transition</strong>: A → B (2 states, triggered by state change)<br />
                                • <strong>Animation</strong>: A → B → C → ... (@keyframes, auto-play, loop)<br />
                                • Transition cho <strong>hover effects, state changes</strong><br />
                                • Animation cho <strong>loading spinners, attention getters</strong>
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">🚀 Performance-safe Properties</div>
                            <div className="text-slate-300 text-sm mt-1">
                                <strong>Composite-only</strong> (GPU accelerated, cheapest):<br />
                                • <InlineCode>transform</InlineCode>: translate, scale, rotate<br />
                                • <InlineCode>opacity</InlineCode><br />
                                <strong>Avoid animating</strong> (triggers layout/paint):<br />
                                • ❌ width, height, top, left, margin, padding<br />
                                • Use <InlineCode>transform: translateX()</InlineCode> thay vì <InlineCode>left: Xpx</InlineCode>
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <div className="text-purple-400 font-bold text-sm">🎭 Easing Functions</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <InlineCode>ease</InlineCode>: default, phổ biến nhất<br />
                                • <InlineCode>ease-in-out</InlineCode>: smooth cho modal, page transitions<br />
                                • <InlineCode>cubic-bezier()</InlineCode>: custom curve (bounce, spring)<br />
                                • <InlineCode>steps()</InlineCode>: frame-by-frame (sprite animation)
                            </div>
                        </div>
                    </div>
                    <CodeBlock title="animations.css">{`/* Transition — smooth hover effect */
.button {
  background: #3b82f6;
  transform: translateY(0);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.button:hover {
  transform: translateY(-2px);       /* GPU-accelerated! */
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

/* Keyframe Animation — loading spinner */
@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
.spinner {
  animation: spin 1s linear infinite;
}

/* Slide-in animation */
@keyframes slideIn {
  from { transform: translateX(-100%); opacity: 0; }
  to   { transform: translateX(0); opacity: 1; }
}
.sidebar { animation: slideIn 0.3s ease-out; }

/* will-change — hint browser to optimize */
.card:hover { will-change: transform; }
.card:active { transform: scale(0.98); }

/* prefers-reduced-motion — accessibility! */
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}`}</CodeBlock>
                    <Callout type="tip">Interview: phải nhắc <Highlight>prefers-reduced-motion</Highlight> khi nói về animations — shows accessibility awareness. Chỉ animate <strong>transform + opacity</strong> cho 60fps.</Callout>
                </TopicModal>

                <TopicModal title="CSS Variables & Modern CSS" emoji="🎨" color="#38bdf8" summary="Custom properties, container queries, :has(), nesting — CSS đang ngày càng mạnh">
                    <Paragraph><Highlight>Modern CSS</Highlight> có nhiều feature mạnh mẽ — giảm phụ thuộc vào JS và preprocessors.</Paragraph>
                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">🎨 CSS Custom Properties (Variables)</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • Khai báo: <InlineCode>--color-primary: #3b82f6</InlineCode><br />
                                • Sử dụng: <InlineCode>color: var(--color-primary)</InlineCode><br />
                                • <strong>Cascade</strong>: follow CSS cascade (override per element/media query)<br />
                                • <strong>Runtime dynamic</strong>: thay đổi bằng JS, SASS variables thì không<br />
                                • Dùng cho: theming (dark/light), design tokens, responsive values
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">📦 Container Queries</div>
                            <div className="text-slate-300 text-sm mt-1">
                                Responsive based on <strong>parent container size</strong> thay vì viewport.<br />
                                • <InlineCode>container-type: inline-size</InlineCode> trên parent<br />
                                • <InlineCode>@container (min-width: 400px)</InlineCode> thay vì @media<br />
                                • Component-level responsive — reusable everywhere!
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <div className="text-purple-400 font-bold text-sm">🆕 Modern CSS Selectors</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <InlineCode>:has()</InlineCode>: parent selector! <InlineCode>.card:has(img)</InlineCode> — card chứa img<br />
                                • <InlineCode>:is() / :where()</InlineCode>: group selectors, reduce repetition<br />
                                • <strong>CSS Nesting</strong> (native!): viết nested rules như SASS<br />
                                • <InlineCode>:focus-visible</InlineCode>: only keyboard focus (not click)
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                            <div className="text-yellow-400 font-bold text-sm">🔧 Useful Modern Properties</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <InlineCode>aspect-ratio: 16/9</InlineCode>: maintain ratio without padding hack<br />
                                • <InlineCode>gap</InlineCode>: works in flexbox now! (not just grid)<br />
                                • <InlineCode>accent-color</InlineCode>: style checkboxes/radios natively<br />
                                • <InlineCode>color-mix()</InlineCode>: blend colors in CSS<br />
                                • <InlineCode>text-wrap: balance</InlineCode>: balanced text wrapping
                            </div>
                        </div>
                    </div>
                    <CodeBlock title="modern-css.css">{`/* CSS Variables — theming */
:root {
  --color-primary: #3b82f6;
  --color-bg: #ffffff;
  --spacing: 8px;
}
[data-theme="dark"] {
  --color-primary: #60a5fa;
  --color-bg: #0f172a;
}

/* Container Queries — component responsive */
.card-container { container-type: inline-size; }
@container (min-width: 400px) {
  .card { display: flex; gap: 16px; }
}
@container (max-width: 399px) {
  .card { display: block; }
}

/* :has() — parent selector */
.form-group:has(input:invalid) { border-color: red; }
.card:has(> img) { padding-top: 0; } /* card with direct img child */

/* CSS Nesting (native!) */
.card {
  padding: 16px;
  & .title { font-size: 1.25rem; }
  &:hover { box-shadow: 0 4px 12px rgba(0,0,0,.1); }
  @media (width > 768px) { padding: 24px; }
}

/* Modern utilities */
.video { aspect-ratio: 16 / 9; }
.balanced { text-wrap: balance; }
input[type="checkbox"] { accent-color: var(--color-primary); }`}</CodeBlock>
                    <Callout type="tip">Interview: nhắc đến <Highlight>container queries</Highlight> và <Highlight>:has()</Highlight> → shows bạn follow CSS evolution. CSS Variables vs SASS variables: CSS vars là <strong>runtime dynamic</strong>, SASS compile-time.</Callout>
                </TopicModal>

                <TopicModal title="CSS Architecture — BEM, Modules, CSS-in-JS" emoji="🏗️" color="#38bdf8" summary="Naming conventions, scoping strategies, khi nào dùng approach nào">
                    <Paragraph>Dự án lớn cần <Highlight>CSS architecture</Highlight> để tránh naming conflicts và maintain code dễ dàng.</Paragraph>
                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">📐 BEM (Block Element Modifier)</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Block</strong>: <InlineCode>.card</InlineCode> — standalone component<br />
                                • <strong>Element</strong>: <InlineCode>.card__title</InlineCode> — part of block<br />
                                • <strong>Modifier</strong>: <InlineCode>.card--featured</InlineCode> — variant<br />
                                • Pros: predictable, no nesting, flat specificity<br />
                                • Cons: verbose class names
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">🔒 CSS Modules</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • Auto-generate unique class names (scoped by default)<br />
                                • <InlineCode>import styles from &apos;./Card.module.css&apos;</InlineCode><br />
                                • <InlineCode>className={'{styles.card}'}</InlineCode> → <InlineCode>.Card_card__x7f3k</InlineCode><br />
                                • Next.js supports natively. No runtime cost
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <div className="text-purple-400 font-bold text-sm">💅 CSS-in-JS</div>
                            <div className="text-slate-300 text-sm mt-1">
                                <strong>Runtime</strong>: styled-components, Emotion → inject {'<style>'} at runtime<br />
                                <strong>Zero-runtime</strong>: Vanilla Extract, Linaria → extract CSS at build time<br />
                                • Runtime CSS-in-JS: <strong>performance overhead</strong> (style injection)<br />
                                • Zero-runtime: <strong>best DX + zero overhead</strong> (type-safe + no runtime)
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                            <div className="text-yellow-400 font-bold text-sm">🆚 Comparison</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Utility-first</strong> (Tailwind): nhanh, nhưng HTML verbose<br />
                                • <strong>CSS Modules</strong>: scoped, no runtime, simple. Best for most projects<br />
                                • <strong>Zero-runtime CSS-in-JS</strong>: type-safe, co-located, enterprise<br />
                                • <strong>BEM</strong>: legacy nhưng vẫn dùng nhiều, no build tool needed
                            </div>
                        </div>
                    </div>
                    <CodeBlock title="css-architecture.tsx">{`/* BEM naming */
.card { }
.card__header { }
.card__body { }
.card--featured { border: 2px solid gold; }
.card--disabled { opacity: 0.5; }

/* CSS Modules */
// Card.module.css
.card { padding: 16px; border-radius: 8px; }
.title { font-weight: bold; }

// Card.tsx
import styles from './Card.module.css'
<div className={styles.card}>
  <h2 className={styles.title}>Hello</h2>
</div>
// Output: <div class="Card_card__x7f3k">

/* Vanilla Extract (zero-runtime, type-safe) */
// card.css.ts
import { style } from '@vanilla-extract/css'
export const card = style({
  padding: 16,
  borderRadius: 8,
  ':hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },
})
// TypeScript error if you typo a property name!`}</CodeBlock>

                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                            <div className="text-emerald-400 font-bold text-sm">🏆 Tại sao Vanilla Extract thắng ở enterprise?</div>
                            <div className="text-slate-300 text-sm mt-1">
                                <strong>1. Zero Runtime</strong> — CSS generate lúc build, không inject JS lúc runtime<br />
                                → styled-components/Emotion phải inject {'<style>'} bằng JS → chậm hơn, ảnh hưởng LCP/INP<br /><br />
                                <strong>2. Full TypeScript</strong> — viết styles bằng TypeScript<br />
                                → Typo <InlineCode>backgroundCollor</InlineCode> → TS báo lỗi ngay. CSS Modules thì typo chỉ biết khi nhìn UI<br /><br />
                                <strong>3. Theme Contract</strong> — <InlineCode>createThemeContract</InlineCode> enforce tất cả themes phải có đủ tokens<br />
                                → Compile error nếu theme thiếu variable → impossible to ship broken theme<br /><br />
                                <strong>4. Sprinkles</strong> — <InlineCode>createSprinkles</InlineCode> = type-safe utility classes (giống Tailwind nhưng có TS check)<br /><br />
                                <strong>5. SSR-friendly</strong> — không cần hydrate CSS (styled-components phải hydrate)
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-slate-500/10 border border-slate-500/20">
                            <div className="text-slate-300 font-bold text-sm">📊 So sánh chi tiết</div>
                            <div className="text-slate-300 text-sm mt-1">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-xs border-collapse mt-1">
                                        <thead><tr className="border-b border-slate-600">
                                            <th className="text-left p-1.5 text-slate-400">Approach</th>
                                            <th className="text-left p-1.5 text-slate-400">Type Safe</th>
                                            <th className="text-left p-1.5 text-slate-400">Runtime</th>
                                            <th className="text-left p-1.5 text-slate-400">Scoped</th>
                                            <th className="text-left p-1.5 text-slate-400">Dùng khi</th>
                                        </tr></thead>
                                        <tbody>
                                            <tr className="border-b border-slate-700"><td className="p-1.5 text-emerald-400 font-bold">Vanilla Extract</td><td className="p-1.5">✅ Full TS</td><td className="p-1.5 text-green-400">Zero</td><td className="p-1.5">✅</td><td className="p-1.5">Enterprise, design system</td></tr>
                                            <tr className="border-b border-slate-700"><td className="p-1.5">CSS Modules</td><td className="p-1.5">❌</td><td className="p-1.5 text-green-400">Zero</td><td className="p-1.5">✅</td><td className="p-1.5">Simple–medium projects</td></tr>
                                            <tr className="border-b border-slate-700"><td className="p-1.5">Tailwind</td><td className="p-1.5">❌</td><td className="p-1.5 text-green-400">Zero</td><td className="p-1.5">❌ Global</td><td className="p-1.5">Startups, rapid prototyping</td></tr>
                                            <tr className="border-b border-slate-700"><td className="p-1.5">styled-components</td><td className="p-1.5">❌ Partial</td><td className="p-1.5 text-red-400">+12KB</td><td className="p-1.5">✅</td><td className="p-1.5">Legacy, component libs</td></tr>
                                            <tr><td className="p-1.5">BEM</td><td className="p-1.5">❌</td><td className="p-1.5 text-green-400">Zero</td><td className="p-1.5">❌ Manual</td><td className="p-1.5">No build tool needed</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <CodeBlock title="vanilla-extract-advanced.ts">{`// === Theme Contract (enforce all themes have same tokens) ===
import { createThemeContract, createTheme, style } from '@vanilla-extract/css'

const vars = createThemeContract({
  color: { primary: null, secondary: null, text: null, bg: null },
  space: { sm: null, md: null, lg: null },
  font: { body: null, heading: null },
})

// ✅ TypeScript enforces ALL tokens must be defined
const lightTheme = createTheme(vars, {
  color: { primary: '#3b82f6', secondary: '#8b5cf6', text: '#1e293b', bg: '#ffffff' },
  space: { sm: '4px', md: '8px', lg: '16px' },
  font: { body: 'Inter, sans-serif', heading: 'Outfit, sans-serif' },
})

// ❌ Compile error: thiếu 'bg' trong color!
// const brokenTheme = createTheme(vars, {
//   color: { primary: '#fff', secondary: '#ccc', text: '#000' }, // ← Error: missing 'bg'
//   ...
// })

// === Type-safe styles with autocomplete ===
const card = style({
  backgroundColor: vars.color.bg,    // ← autocomplete tất cả tokens!
  padding: vars.space.md,
  fontFamily: vars.font.body,
  borderRadius: 8,
  // backgroundCollor: '...',  ← ❌ TypeScript error ngay!
})

// === Sprinkles = type-safe utility classes (like Tailwind with TS) ===
import { defineProperties, createSprinkles } from '@vanilla-extract/sprinkles'

const responsiveProps = defineProperties({
  conditions: {
    mobile: {}, tablet: { '@media': '(min-width: 768px)' },
    desktop: { '@media': '(min-width: 1024px)' },
  },
  properties: {
    display: ['none', 'flex', 'grid', 'block'],
    padding: vars.space,  // ← chỉ cho phép design tokens!
    gap: vars.space,
  },
})

const sprinkles = createSprinkles(responsiveProps)

// Usage — giống Tailwind nhưng type-safe!
<div className={sprinkles({
  display: { mobile: 'block', desktop: 'grid' },
  padding: 'md',     // ← autocomplete: 'sm' | 'md' | 'lg'
  // padding: 'xxx', // ← ❌ TypeScript error!
})} />`}</CodeBlock>

                    <Callout type="tip">Interview: được hỏi {'\"How do you organize CSS in a large project?\"'} → trả lời CSS Modules (simple) hoặc Vanilla Extract (enterprise). Giải thích: VE = <Highlight>TypeScript cho CSS</Highlight> — zero runtime, theme contract enforce consistency, sprinkles = type-safe Tailwind. Senior answer = biết trade-offs.</Callout>
                </TopicModal>
            </div>

            <Callout type="tip">
                Google, Meta rất hay hỏi: &quot;Build một component X từ scratch không dùng library&quot; —
                ví dụ: autocomplete, infinite scroll, modal, drag & drop, virtual list.
                Luyện xây UI components thuần sẽ rất có lợi.
            </Callout>

            <Heading3>3.3 Build Component từ Scratch (VN Style)</Heading3>
            <Paragraph>
                Công ty VN thường cho <Highlight>bài test code thực tế</Highlight>: build component trong 30-60 phút.
                Không cần perfect — nhưng phải chạy được, code sạch, và giải thích được decisions.
            </Paragraph>
            <div className="my-4 space-y-2">
                <TopicModal title="Searchable Dropdown / Autocomplete" emoji="🔍" color="#f59e0b" summary="Bài test kinh điển — input + dropdown + filter + keyboard navigation">
                    <Paragraph>Đây là bài test <Highlight>phổ biến nhất</Highlight> ở VN interview. Phải biết xây từ scratch.</Paragraph>
                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                            <div className="text-yellow-400 font-bold text-sm">📋 Requirements cơ bản</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • Input text → filter options list<br />
                                • Click option → select + close dropdown<br />
                                • Click outside → close dropdown<br />
                                • Keyboard: Arrow Up/Down navigate, Enter select, Escape close
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">⭐ Điểm cộng (senior level)</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • Debounce input (API call)<br />
                                • Loading state<br />
                                • Highlight match text<br />
                                • Virtualized list (nếu 1000+ options)<br />
                                • Accessibility: aria-expanded, aria-activedescendant
                            </div>
                        </div>
                    </div>
                    <CodeBlock title="SearchableDropdown.tsx">{`function SearchableDropdown({ options, onSelect }) {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const ref = useRef(null)

  const filtered = options.filter(o =>
    o.label.toLowerCase().includes(query.toLowerCase())
  )

  // Close on click outside
  useEffect(() => {
    const handler = (e) => {
      if (!ref.current?.contains(e.target)) setIsOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex(i => Math.min(i + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex(i => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      onSelect(filtered[activeIndex])
      setIsOpen(false)
    } else if (e.key === 'Escape') {
      setIsOpen(false)
    }
  }

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <input
        value={query}
        onChange={e => { setQuery(e.target.value); setIsOpen(true) }}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder="Search..."
      />
      {isOpen && filtered.length > 0 && (
        <ul style={{
          position: 'absolute', top: '100%', left: 0, right: 0,
          maxHeight: 200, overflowY: 'auto', border: '1px solid #ccc',
        }}>
          {filtered.map((item, i) => (
            <li
              key={item.value}
              onClick={() => { onSelect(item); setIsOpen(false) }}
              style={{ padding: 8, cursor: 'pointer',
                background: i === activeIndex ? '#e0f0ff' : 'transparent'
              }}
            >{item.label}</li>
          ))}
        </ul>
      )}
    </div>
  )
}`}</CodeBlock>
                    <Callout type="tip">Tip: Luôn nhớ <Highlight>click outside to close</Highlight> và <Highlight>keyboard navigation</Highlight> — 2 thứ mà nhiều ứng viên quên.</Callout>
                </TopicModal>

                <TopicModal title="Modal / Dialog" emoji="📦" color="#8b5cf6" summary="Overlay, focus trap, escape close, portal — component cơ bản nhưng nhiều edge cases">
                    <Paragraph>Modal tưởng đơn giản nhưng có <Highlight>nhiều edge cases</Highlight> mà interviewer hay test.</Paragraph>
                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <div className="text-purple-400 font-bold text-sm">📋 Requirements quan trọng</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • Overlay (backdrop) click → close<br />
                                • Escape key → close<br />
                                • <strong>Focus trap</strong>: Tab chỉ cycle trong modal (a11y!)<br />
                                • <strong>Body scroll lock</strong>: không scroll page khi modal mở<br />
                                • <strong>Portal</strong>: render ở root DOM (tránh z-index issues)<br />
                                • Return focus khi close (focus lại button đã mở modal)
                            </div>
                        </div>
                    </div>
                    <CodeBlock title="Modal.tsx">{`function Modal({ isOpen, onClose, children }) {
  const prevFocusRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      prevFocusRef.current = document.activeElement
      document.body.style.overflow = 'hidden' // lock scroll

      const handleEsc = (e) => e.key === 'Escape' && onClose()
      document.addEventListener('keydown', handleEsc)
      return () => {
        document.removeEventListener('keydown', handleEsc)
        document.body.style.overflow = '' // unlock scroll
        prevFocusRef.current?.focus() // return focus
      }
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={e => e.stopPropagation()} // prevent close
        role="dialog"
        aria-modal="true"
      >
        <button onClick={onClose} aria-label="Close">✕</button>
        {children}
      </div>
    </div>,
    document.body
  )
}`}</CodeBlock>
                    <Callout type="tip">Edge cases: <Highlight>multiple modals stacked</Highlight> (z-index), <Highlight>animation on enter/exit</Highlight>, <Highlight>responsive sizing</Highlight>. Nhắc các edge cases này → bonus points.</Callout>
                </TopicModal>

                <TopicModal title="Pagination Component" emoji="📄" color="#06b6d4" summary="Client-side vs server-side, page numbers, ellipsis — bài test phổ biến cho junior/mid">
                    <Paragraph>Pagination tưởng đơn giản nhưng phải handle <Highlight>ellipsis logic</Highlight> + edge cases.</Paragraph>
                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                            <div className="text-cyan-400 font-bold text-sm">📋 Key features</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • Previous / Next buttons (disabled ở trang đầu/cuối)<br />
                                • Page numbers với ellipsis (1 ... 4 5 6 ... 20)<br />
                                • Current page highlight<br />
                                • Controlled: page + onChange từ parent<br />
                                • Optional: items per page, total count display
                            </div>
                        </div>
                    </div>
                    <CodeBlock title="pagination-logic.ts">{`// Core logic: generate page numbers with ellipsis
function getPageNumbers(current, total, siblings = 1) {
  const range = []
  const left = Math.max(2, current - siblings)
  const right = Math.min(total - 1, current + siblings)

  // Always show first page
  range.push(1)

  // Left ellipsis
  if (left > 2) range.push('...')

  // Middle pages
  for (let i = left; i <= right; i++) range.push(i)

  // Right ellipsis
  if (right < total - 1) range.push('...')

  // Always show last page
  if (total > 1) range.push(total)

  return range
}

// Examples:
// getPageNumbers(1, 10)  → [1, 2, 3, ..., 10]
// getPageNumbers(5, 10)  → [1, ..., 4, 5, 6, ..., 10]
// getPageNumbers(10, 10) → [1, ..., 8, 9, 10]`}</CodeBlock>
                    <Callout type="tip">Server-side pagination: <Highlight>API trả về total + page + limit</Highlight>. Client-side: slice array. VN interview thường cho build client-side pagination.</Callout>
                </TopicModal>

                <TopicModal title="Form Validation" emoji="📝" color="#10b981" summary="Real-time validation, error messages, submit handling — bài test thực tế nhất">
                    <Paragraph>Form validation là bài test <Highlight>thực tế nhất</Highlight> — mọi dự án đều cần.</Paragraph>
                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">📋 Requirements thường gặp</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • Required fields (hiện error khi blur hoặc submit)<br />
                                • Email format validation (regex)<br />
                                • Password strength (min length, uppercase, number, special char)<br />
                                • Confirm password match<br />
                                • Real-time validation (on change) vs on submit<br />
                                • Disable submit button khi form invalid
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">⭐ Approach tốt nhất</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Thực tế</strong>: React Hook Form + Zod (production)<br />
                                • <strong>Interview</strong>: custom hook useForm (show hiểu biết)<br />
                                • <strong>UX</strong>: validate on blur (first touch) → on change (after error)<br />
                                • <strong>Pattern</strong>: errors object, touched object, isValid boolean
                            </div>
                        </div>
                    </div>
                    <CodeBlock title="useForm-hook.ts">{`// Custom useForm hook (interview approach)
function useForm(initialValues, validate) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const handleChange = (field) => (e) => {
    const newValues = { ...values, [field]: e.target.value }
    setValues(newValues)
    // Validate on change only if already touched
    if (touched[field]) {
      setErrors(validate(newValues))
    }
  }

  const handleBlur = (field) => () => {
    setTouched(t => ({ ...t, [field]: true }))
    setErrors(validate(values))
  }

  const handleSubmit = (onSubmit) => (e) => {
    e.preventDefault()
    const errs = validate(values)
    setErrors(errs)
    setTouched(Object.keys(values).reduce((acc, k) =>
      ({ ...acc, [k]: true }), {}))
    if (Object.keys(errs).length === 0) onSubmit(values)
  }

  return { values, errors, touched, handleChange, handleBlur, handleSubmit,
    isValid: Object.keys(validate(values)).length === 0 }
}

// Usage
const { values, errors, handleChange, handleBlur, handleSubmit } = useForm(
  { email: '', password: '' },
  (v) => {
    const e = {}
    if (!v.email) e.email = 'Email bắt buộc'
    else if (!/\\S+@\\S+\\.\\S+/.test(v.email)) e.email = 'Email không hợp lệ'
    if (!v.password) e.password = 'Password bắt buộc'
    else if (v.password.length < 8) e.password = 'Tối thiểu 8 ký tự'
    return e
  }
)`}</CodeBlock>
                    <Callout type="tip">Interview: build custom <Highlight>useForm</Highlight> hook → shows bạn hiểu form state management. Nhắc rằng production dùng React Hook Form + Zod → shows practical awareness.</Callout>
                </TopicModal>

                <TopicModal title="Infinite Scroll / Lazy Load" emoji="♾️" color="#f43f5e" summary="IntersectionObserver + pagination API — bài test cho mid/senior">
                    <Paragraph>Infinite scroll = <Highlight>IntersectionObserver + API pagination</Highlight>. Phải handle loading, error, no more data.</Paragraph>
                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20">
                            <div className="text-rose-400 font-bold text-sm">📋 Implementation steps</div>
                            <div className="text-slate-300 text-sm mt-1">
                                1. Fetch initial data (page 1)<br />
                                2. Render sentinel element ở cuối list<br />
                                3. IntersectionObserver observe sentinel<br />
                                4. Khi sentinel visible → fetch page N+1<br />
                                5. Append data (không replace!)<br />
                                6. Stop khi: API trả về empty array hoặc hasMore = false
                            </div>
                        </div>
                    </div>
                    <CodeBlock title="useInfiniteScroll.ts">{`function useInfiniteScroll(fetchFn) {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const sentinelRef = useRef(null)

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return
    setLoading(true)
    try {
      const newItems = await fetchFn(page)
      if (newItems.length === 0) {
        setHasMore(false)
      } else {
        setData(prev => [...prev, ...newItems]) // append!
        setPage(p => p + 1)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [page, loading, hasMore, fetchFn])

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) loadMore()
    }, { threshold: 0.1 })
    if (sentinelRef.current) observer.observe(sentinelRef.current)
    return () => observer.disconnect()
  }, [loadMore])

  return { data, loading, hasMore, sentinelRef }
}

// Usage
function ProductList() {
  const { data, loading, hasMore, sentinelRef } = useInfiniteScroll(
    (page) => fetch(\`/api/products?page=\${page}\`).then(r => r.json())
  )
  return (
    <div>
      {data.map(p => <ProductCard key={p.id} product={p} />)}
      {loading && <Spinner />}
      {hasMore && <div ref={sentinelRef} style={{ height: 1 }} />}
    </div>
  )
}`}</CodeBlock>
                    <Callout type="tip">Edge cases: <Highlight>race conditions</Highlight> (abort previous request), <Highlight>duplicate items</Highlight> (dedupe by id), <Highlight>scroll restoration</Highlight> khi navigate back.</Callout>
                </TopicModal>
            </div>

            <Heading3>3.4 Thư viện phổ biến trong thị trường VN</Heading3>
            <Paragraph>
                Talent market Việt Nam dùng rất nhiều <Highlight>component libraries</Highlight> và UI frameworks.
                Biết sử dụng + giải thích tại sao chọn library này → điểm cộng rất lớn.
            </Paragraph>
            <div className="my-4 space-y-2">
                <TopicModal title="Ant Design (antd)" emoji="🐜" color="#1890ff" summary="Component library phổ biến nhất ở VN enterprise — tables, forms, layouts">
                    <Paragraph><Highlight>Ant Design</Highlight> = lựa chọn #1 cho admin dashboards và enterprise apps ở VN.</Paragraph>
                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">📋 Khi nào dùng Ant Design?</div>
                            <div className="text-slate-300 text-sm mt-1">
                                ✅ Admin panel, CRM, ERP, back-office systems<br />
                                ✅ Cần rich components: Table (sort/filter/pagination), Form, DatePicker, Tree<br />
                                ✅ Team muốn consistent design system sẵn có<br />
                                ❌ Consumer-facing products (thiếu personality, heavy bundle)
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                            <div className="text-yellow-400 font-bold text-sm">⚠️ Câu hỏi phỏng vấn hay gặp</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • Customize theme antd thế nào? → ConfigProvider + token<br />
                                • antd Table performance với large data? → virtual scroll, columnWidth<br />
                                • Tree-shaking antd? → import từ antd/es (v5 auto tree-shake)<br />
                                • Form validation antd? → Form.Item rules + async validator
                            </div>
                        </div>
                    </div>
                    <Callout type="tip">VN Interview: nếu JD có antd → <Highlight>phải biết Table component</Highlight> (custom render, sorter, filter, editable cells) vì 90% dự án antd là data-heavy admin.</Callout>
                </TopicModal>

                <TopicModal title="Tailwind CSS" emoji="🌊" color="#38bdf8" summary="Utility-first CSS framework — phổ biến ở startups và products VN">
                    <Paragraph><Highlight>Tailwind</Highlight> = lựa chọn #1 cho startups và consumer products ở VN.</Paragraph>
                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                            <div className="text-emerald-400 font-bold text-sm">✅ Điểm mạnh (Pros)</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Dev speed</strong>: Không context switch (HTML/CSS), dựng UI cực nhanh<br />
                                • <strong>Consistency</strong>: Ràng buộc bởi design tokens (spacing, colors) → UI đồng nhất<br />
                                • <strong>Performance</strong>: Compile-time purge loại bỏ class thừa → file CSS siêu nhỏ<br />
                                • <strong>Naming</strong>: Không phải đau đầu nghĩ tên class như BEM
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20">
                            <div className="text-rose-400 font-bold text-sm">⚠️ Trade-offs & Điểm yếu (Cons)</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>HTML Verbose</strong>: Code JSX dài thòng, lộn xộn (khắc phục bằng componentization)<br />
                                • <strong>Learning curve</strong>: Tốn thời gian đầu học thuộc utility classes và mapping của Tailwind<br />
                                • <strong>Coupling</strong>: Gắn chặt styling vào rendering component (không clean separation of concerns như CSS Modules)
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">🎯 Tại sao lại chọn Tailwind?</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Ecosystem số 1</strong>: Đi kèm với vô số headless UI xuất sắc (shadcn/ui, Radix, HeadlessUI).<br />
                                • Giải thoát dev khỏi CSS: Giúp các developer (kể cả backend dev) không quá rành CSS vẫn dựng được layout đẹp, chuẩn tỉ lệ.<br />
                                • <strong>Startup/Outsource</strong>: Cần ship product nhanh, bàn giao code dễ hiểu, không cần maintain custom CSS architecture phức tạp.
                            </div>
                        </div>
                    </div>
                    <Callout type="tip">
                        Interview hay hỏi: &quot;Tailwind vs CSS Modules?&quot; → Trả lời: <Highlight>Trade-off giữa Speed và Separation</Highlight>.
                        Tailwind code nhanh nhưng HTML xấu, CSS Modules HTML clean nhưng phải nhảy file liên tục.
                        Đừng quên nhắc đến <Highlight>clsx / tailwind-merge (hoặc cn)</Highlight> khi làm việc với conditional classes trong Tailwind!
                    </Callout>
                </TopicModal>

                <TopicModal title="React Hook Form + Zod" emoji="📋" color="#ec4899" summary="Form management + schema validation — combo phổ biến nhất hiện nay">
                    <Paragraph><Highlight>React Hook Form + Zod</Highlight> = combo form tốt nhất hiện tại — performance + type-safety.</Paragraph>
                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-pink-500/10 border border-pink-500/20">
                            <div className="text-pink-400 font-bold text-sm">🔥 Tại sao hay hơn Formik?</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Performance</strong>: uncontrolled components → ít re-renders<br />
                                • <strong>Bundle size</strong>: ~9KB vs Formik ~44KB<br />
                                • <strong>Zod</strong>: schema validation, TypeScript-first, reusable<br />
                                • <strong>DevTools</strong>: React Hook Form DevTools<br />
                                • <strong>Server</strong>: works with Next.js Server Actions
                            </div>
                        </div>
                    </div>
                    <CodeBlock title="react-hook-form-zod.tsx">{`import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(8, 'Tối thiểu 8 ký tự'),
  confirmPassword: z.string(),
}).refine(d => d.password === d.confirmPassword, {
  message: 'Mật khẩu không khớp',
  path: ['confirmPassword'],
})

function RegisterForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  })
  return (
    <form onSubmit={handleSubmit(data => console.log(data))}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}

      <input type="password" {...register('password')} />
      {errors.password && <span>{errors.password.message}</span>}

      <input type="password" {...register('confirmPassword')} />
      {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}

      <button type="submit">Đăng ký</button>
    </form>
  )
}`}</CodeBlock>
                    <Callout type="tip">VN Interview: nếu hỏi form → nói <Highlight>React Hook Form + Zod</Highlight> (modern) thay vì Formik (legacy). Giải thích tại sao RHF nhanh hơn (uncontrolled) → bonus.</Callout>
                </TopicModal>

                <TopicModal title="TanStack Query (React Query)" emoji="🔄" color="#ef4444" summary="Server state management — fetching, caching, sync — thay thế useEffect fetch">
                    <Paragraph><Highlight>TanStack Query</Highlight> giải quyết bài toán data fetching mà useEffect + useState làm rất tệ.</Paragraph>
                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                            <div className="text-red-400 font-bold text-sm">❌ Vấn đề với useEffect fetch</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • Không cache → fetch lại mỗi mount<br />
                                • Race conditions (user navigate nhanh)<br />
                                • No loading/error states built-in<br />
                                • No retry, no pagination, no optimistic updates<br />
                                • No background refetch (data stale)<br />
                                • No type-safety (nếu không dùng thư viện như Zod)
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">✅ TanStack Query giải quyết tất cả</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Auto caching</strong>: staleTime, gcTime<br />
                                • <strong>Auto refetch</strong>: on window focus, on reconnect<br />
                                • <strong>Loading/error/success</strong> states built-in<br />
                                • <strong>Mutations</strong>: optimistic updates, invalidation<br />
                                • <strong>Infinite queries</strong>: useInfiniteQuery cho pagination
                            </div>
                        </div>
                    </div>
                    <CodeBlock title="react-query.tsx">{`import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// Fetch data
function UserProfile({ userId }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetch(\`/api/users/\${userId}\`).then(r => r.json()),
    staleTime: 5 * 60 * 1000, // cache 5 minutes
  })

  if (isLoading) return <Spinner />
  if (error) return <Error message={error.message} />
  return <div>{data.name}</div>
}

// Mutation + invalidation
function UpdateUser() {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (data) => fetch('/api/users', {
      method: 'PUT', body: JSON.stringify(data)
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] }) // refetch!
    },
  })
  // mutation.mutate({ name: 'New Name' })
}`}</CodeBlock>
                    <Callout type="tip">VN Interview: nếu hỏi {'"Làm sao fetch data trong React?"'} → đừng chỉ nói useEffect. Nói <Highlight>TanStack Query</Highlight> + giải thích tại sao (caching, race conditions, stale data) → senior answer.</Callout>
                </TopicModal>
            </div>


        </>
    )
}
