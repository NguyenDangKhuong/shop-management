import { BlogPost } from '../types'
import { CodeBlock, Heading2, Heading3, Paragraph, Highlight, InlineCode, Callout } from '../components/BlogComponents'
import { TopicModal } from '../components/TopicModal'
import { enContent } from './frontend-interview-roadmap-en'
import { toLeetCodeSlug } from './utils'

const viContent = (
    <>
        <Paragraph>
            Muốn vào <Highlight>Google, Meta, Amazon, Apple, Microsoft</Highlight> (FAANG) hay các big tech khác
            ở vị trí <Highlight>Frontend Engineer</Highlight>? Bài viết này là lộ trình chi tiết từ A-Z —
            đặc biệt dành cho bạn nào cảm thấy bị <Highlight>hỏng kiến thức nền tảng</Highlight> và muốn rebuild lại từ đầu.
        </Paragraph>

        <Callout type="info">
            Lộ trình này chia thành <Highlight>6 giai đoạn</Highlight>, mỗi giai đoạn khoảng 4-6 tuần.
            Tổng cộng cần <Highlight>6-9 tháng</Highlight> nếu học nghiêm túc mỗi ngày 2-3 giờ.
        </Callout>

        {/* ===== OVERVIEW ===== */}
        <Heading2>🗺️ Tổng quan lộ trình</Heading2>

        <div className="my-6 p-4 rounded-xl bg-[var(--bg-tag)] border border-[var(--border-primary)]">
            <div className="flex flex-col items-center gap-2 text-sm">
                <div className="px-4 py-2 rounded-lg bg-red-500/20 text-red-300 border border-red-500/30 w-fit font-semibold">Phase 1 — Nền tảng CS (4-6 tuần)</div>
                <div className="text-slate-600">↓</div>
                <div className="px-4 py-2 rounded-lg bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 w-fit font-semibold">Phase 2 — JavaScript Master (4-6 tuần)</div>
                <div className="text-slate-600">↓</div>
                <div className="px-4 py-2 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30 w-fit font-semibold">Phase 3 — React & Frontend (4-6 tuần)</div>
                <div className="text-slate-600">↓</div>
                <div className="px-4 py-2 rounded-lg bg-green-500/20 text-green-300 border border-green-500/30 w-fit font-semibold">Phase 4 — DSA / LeetCode (6-8 tuần)</div>
                <div className="text-slate-600">↓</div>
                <div className="px-4 py-2 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30 w-fit font-semibold">Phase 5 — System Design (4-6 tuần)</div>
                <div className="text-slate-600">↓</div>
                <div className="px-4 py-2 rounded-lg bg-pink-500/20 text-pink-300 border border-pink-500/30 w-fit font-semibold">Phase 6 — Mock Interview & Behavioral (2-4 tuần)</div>
            </div>
        </div>

        {/* ===== PHASE 1 ===== */}
        <Heading2>Phase 1 — Nền tảng Computer Science (4-6 tuần)</Heading2>

        <Paragraph>
            Nếu bạn bị <Highlight>hỏng nền tảng</Highlight>, đây là bước quan trọng nhất.
            Đừng nhảy thẳng vào React hay LeetCode — hãy xây móng trước.
        </Paragraph>

        <Heading3>1.1 Cách máy tính hoạt động (click để xem chi tiết)</Heading3>
        <div className="my-4 space-y-2">
            <TopicModal title="CPU, RAM, Storage" emoji="🖥️" color="#ef4444" summary="Hiểu data flow cơ bản — dữ liệu đi từ đâu đến đâu khi bạn chạy code">
                <Paragraph>Khi bạn chạy <InlineCode>node app.js</InlineCode>, đây là những gì xảy ra:</Paragraph>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">1. Storage (SSD/HDD) → RAM</div>
                        <div className="text-slate-300 text-sm mt-1">File <InlineCode>app.js</InlineCode> được đọc từ ổ cứng vào RAM. RAM nhanh hơn SSD ~100 lần nhưng mất data khi tắt máy (volatile memory).</div>
                        <div className="text-slate-400 text-xs mt-2 italic">💡 SSD dùng flash memory (không có bộ phận quay), nhanh hơn HDD ~50-100 lần. NVMe SSD còn nhanh hơn SATA SSD ~5 lần.</div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">2. RAM → CPU (Fetch-Decode-Execute cycle)</div>
                        <div className="text-slate-300 text-sm mt-1">CPU đọc instructions từ RAM, xử lý từng lệnh theo chu kỳ:</div>
                        <div className="text-slate-300 text-sm mt-1 pl-3">
                            • <strong>Fetch</strong>: Lấy instruction từ RAM theo địa chỉ trong Program Counter<br />
                            • <strong>Decode</strong>: Bộ giải mã xác định instruction cần làm gì<br />
                            • <strong>Execute</strong>: ALU (Arithmetic Logic Unit) thực thi phép tính
                        </div>
                        <div className="text-slate-400 text-xs mt-2 italic">💡 CPU hiện đại dùng <strong>pipelining</strong> — xử lý nhiều instructions song song ở các giai đoạn khác nhau, giống dây chuyền sản xuất.</div>
                    </div>
                    <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="text-yellow-400 font-bold text-sm">3. CPU Cache — bí mật của tốc độ</div>
                        <div className="text-slate-300 text-sm mt-1">
                            CPU không đọc thẳng từ RAM mỗi lần — quá chậm! Thay vào đó, data được copy vào <strong>cache</strong>:
                        </div>
                        <div className="text-slate-300 text-sm mt-1 pl-3">
                            • <strong>L1 Cache</strong> (~32KB): Nhanh nhất (~1ns), mỗi core riêng<br />
                            • <strong>L2 Cache</strong> (~256KB): Nhanh (~4ns), mỗi core riêng<br />
                            • <strong>L3 Cache</strong> (~8-32MB): Chậm hơn (~10ns), chia sẻ giữa các core
                        </div>
                        <div className="text-slate-400 text-xs mt-2 italic">💡 <strong>Cache miss</strong> xảy ra khi data không có trong cache → phải đọc từ RAM (~100ns). Đây là lý do array nhanh hơn linked list trong thực tế — array đọc liên tiếp trong memory (cache-friendly).</div>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">4. Multi-core — tại sao máy có 8 cores?</div>
                        <div className="text-slate-300 text-sm mt-1">
                            Mỗi core là 1 CPU nhỏ, có thể chạy 1 thread tại 1 thời điểm. 8 cores = tối đa 8 threads song song thực sự.
                        </div>
                        <div className="text-slate-400 text-xs mt-2 italic">💡 JavaScript single-threaded → chỉ dùng 1 core. Muốn tận dụng multi-core trong Node.js: dùng <InlineCode>cluster</InlineCode> module hoặc <InlineCode>worker_threads</InlineCode>.</div>
                    </div>
                </div>
                <Paragraph><strong>Tốc độ truy cập (Memory Hierarchy):</strong></Paragraph>
                <CodeBlock title="Latency comparison">{`CPU Register  →  ~0.3ns   (nhanh nhất)
L1 Cache      →  ~1ns
L2 Cache      →  ~4ns
L3 Cache      →  ~10ns
RAM           →  ~100ns    (~100x chậm hơn L1)
SSD (NVMe)    →  ~25μs     (~25,000x chậm hơn L1)
SSD (SATA)    →  ~100μs
HDD           →  ~10ms     (~10,000,000x chậm hơn L1)
Network       →  ~40ms     (VN → Singapore)`}</CodeBlock>
                <Callout type="tip">📚 Tài liệu: <strong>CS50 (Harvard)</strong> — Tuần 0-2. Free trên YouTube, có phụ đề tiếng Việt. Đọc thêm: <strong>"What every programmer should know about memory"</strong> by Ulrich Drepper.</Callout>
            </TopicModal>

            <TopicModal title="Binary, ASCII, Unicode" emoji="🔢" color="#ef4444" summary="Cách máy tính biểu diễn chữ, số, emoji — mọi thứ đều là 0 và 1">
                <Paragraph>Máy tính chỉ hiểu <Highlight>0 và 1</Highlight> (bit). Mọi data — số, chữ, hình ảnh, video — đều được encode thành chuỗi binary.</Paragraph>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <div className="text-red-400 font-bold text-sm">Binary (Hệ nhị phân)</div>
                        <div className="text-slate-300 text-sm mt-1">Số 42 = <InlineCode>00101010</InlineCode> (8 bits = 1 byte)<br />1 byte = 256 giá trị (0-255)<br />4 bytes = 32 bits = ~4 tỷ giá trị</div>
                        <div className="text-slate-300 text-sm mt-2 pl-3">
                            • <strong>Hexadecimal (base 16)</strong>: Viết gọn binary. <InlineCode>0xFF</InlineCode> = 255 = <InlineCode>11111111</InlineCode>. Hay gặp trong CSS colors: <InlineCode>#FF5733</InlineCode><br />
                            • <strong>Bitwise operators</strong>: <InlineCode>&amp;</InlineCode> (AND), <InlineCode>|</InlineCode> (OR), <InlineCode>^</InlineCode> (XOR), <InlineCode>&lt;&lt;</InlineCode> (shift left = nhân 2), <InlineCode>&gt;&gt;</InlineCode> (shift right = chia 2)
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                        <div className="text-orange-400 font-bold text-sm">Số âm & Số thực (Two&apos;s Complement & IEEE 754)</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <strong>Two&apos;s complement</strong>: Cách biểu diễn số âm. -1 = <InlineCode>11111111</InlineCode> (đảo bit + 1)<br />
                            • <strong>Floating point (IEEE 754)</strong>: Số thực = sign bit + exponent + mantissa<br />
                            • Đây là lý do <InlineCode>0.1 + 0.2 ≠ 0.3</InlineCode> trong JS — lỗi làm tròn binary!
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">ASCII (128 ký tự)</div>
                        <div className="text-slate-300 text-sm mt-1">A=65, B=66, a=97, 0=48<br />Chỉ hỗ trợ tiếng Anh + ký tự cơ bản<br />1 ký tự = 1 byte</div>
                        <div className="text-slate-400 text-xs mt-2 italic">💡 Trick: <InlineCode>&apos;a&apos;.charCodeAt(0) - &apos;A&apos;.charCodeAt(0) = 32</InlineCode>. Chuyển hoa-thường bằng XOR: <InlineCode>char ^ 32</InlineCode></div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">Unicode & UTF-8</div>
                        <div className="text-slate-300 text-sm mt-1">Hỗ trợ <strong>mọi ngôn ngữ</strong> + emoji 🎉<br />UTF-8: 1-4 bytes/ký tự, backward compatible với ASCII<br />&quot;Việt&quot; = 4 ký tự nhưng 6 bytes (ệ = 3 bytes)</div>
                        <div className="text-slate-300 text-sm mt-2 pl-3">
                            • <strong>UTF-8</strong>: Web standard, biến đổi (1-4 bytes). ASCII chars vẫn 1 byte<br />
                            • <strong>UTF-16</strong>: JS dùng nội bộ (2 hoặc 4 bytes). <InlineCode>&apos;😀&apos;.length = 2</InlineCode> vì emoji dùng surrogate pair!<br />
                            • <strong>UTF-32</strong>: Cố định 4 bytes/ký tự, tốn bộ nhớ nhưng truy cập nhanh
                        </div>
                    </div>
                </div>
                <CodeBlock title="Thử trong JS">{`// ASCII & Unicode basics
'A'.charCodeAt(0)          // 65 (ASCII)
String.fromCharCode(65)    // 'A'
'😀'.codePointAt(0)        // 128512 (Unicode)
new TextEncoder().encode('Việt').length // 6 bytes (UTF-8)

// Floating point gotcha!
0.1 + 0.2                  // 0.30000000000000004
(0.1 + 0.2).toFixed(1)     // '0.3' (workaround)

// Emoji length surprise
'😀'.length                // 2 (UTF-16 surrogate pair!)
[...'😀'].length           // 1 (spread = đúng codepoint)
'👨‍👩‍👧'.length              // 8 (ZWJ sequence = nhiều codepoints!)`}</CodeBlock>
                <Callout type="warning">Câu hỏi phỏng vấn hay gặp: &quot;Tại sao <InlineCode>0.1 + 0.2 !== 0.3</InlineCode>?&quot; — Vì máy tính dùng IEEE 754 binary floating point, 0.1 không thể biểu diễn chính xác trong binary (giống 1/3 = 0.333... trong decimal).</Callout>
            </TopicModal>

            <TopicModal title="Process vs Thread" emoji="⚙️" color="#ef4444" summary="Hiểu OS quản lý chương trình — tại sao Node.js single-threaded mà vẫn nhanh">
                <Paragraph>Khi bạn mở Chrome + VS Code + Terminal, OS quản lý chúng bằng <Highlight>Process</Highlight> và <Highlight>Thread</Highlight>.</Paragraph>
                <div className="my-3 overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead><tr className="border-b border-[var(--border-primary)]"><th className="text-left p-2 text-slate-400">Tiêu chí</th><th className="text-left p-2 text-blue-400">Process</th><th className="text-left p-2 text-green-400">Thread</th></tr></thead>
                        <tbody className="text-[var(--text-secondary)]">
                            <tr className="border-b border-gray-100"><td className="p-2">Memory</td><td className="p-2">Riêng biệt (isolated)</td><td className="p-2">Chia sẻ heap với process</td></tr>
                            <tr className="border-b border-gray-100"><td className="p-2">Tạo mới</td><td className="p-2">Nặng (~MB)</td><td className="p-2">Nhẹ (~KB)</td></tr>
                            <tr className="border-b border-gray-100"><td className="p-2">Communication</td><td className="p-2">IPC (Inter-Process Communication)</td><td className="p-2">Shared memory (nhanh hơn)</td></tr>
                            <tr className="border-b border-gray-100"><td className="p-2">Crash</td><td className="p-2">Không ảnh hưởng process khác</td><td className="p-2">Có thể crash cả process</td></tr>
                            <tr><td className="p-2">Ví dụ</td><td className="p-2">Mỗi tab Chrome = 1 process</td><td className="p-2">JS main thread + Web Workers</td></tr>
                        </tbody>
                    </table>
                </div>

                <Heading3>Node.js Event Loop — tại sao single-threaded mà vẫn nhanh?</Heading3>
                <Paragraph>Node.js chạy JS trên <strong>1 main thread</strong> duy nhất, nhưng xử lý hàng ngàn connections đồng thời nhờ <Highlight>Event Loop</Highlight> + <Highlight>Non-blocking I/O</Highlight>:</Paragraph>
                <CodeBlock title="Event Loop flow">{`┌─────────────────────────────┐
│         Call Stack           │  ← JS code chạy ở đây (sync)
│   (single-threaded)          │
└─────────┬───────────────────┘
          │ async task (fs, http, timer...)
          ▼
┌─────────────────────────────┐
│      libuv Thread Pool       │  ← 4 worker threads (default)
│   (fs read, DNS lookup,      │     xử lý I/O nặng
│    crypto, compression)      │
└─────────┬───────────────────┘
          │ callback khi xong
          ▼
┌─────────────────────────────┐
│       Event Queue            │  ← Callbacks xếp hàng chờ
│  (microtasks → macrotasks)   │     Main thread rảnh → pick
└─────────────────────────────┘

Thứ tự ưu tiên:
1. Microtasks: Promise.then, queueMicrotask, process.nextTick
2. Macrotasks: setTimeout, setInterval, I/O callbacks
3. Check: setImmediate (Node.js only)`}</CodeBlock>

                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">Web Workers (Browser)</div>
                        <div className="text-slate-300 text-sm mt-1">
                            Chạy JS trên thread riêng. Giao tiếp qua <InlineCode>postMessage()</InlineCode>.<br />
                            Dùng cho: heavy computation (image processing, parsing), không block UI.<br />
                            <strong>Giới hạn</strong>: Không truy cập DOM, không share memory trực tiếp (dùng <InlineCode>SharedArrayBuffer</InlineCode> nếu cần).
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">Worker Threads (Node.js)</div>
                        <div className="text-slate-300 text-sm mt-1">
                            Tương tự Web Workers cho Node.js. Chia sẻ memory qua <InlineCode>SharedArrayBuffer</InlineCode>.<br />
                            Dùng cho: CPU-intensive tasks (image resize, data processing).
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">Cluster module (Node.js)</div>
                        <div className="text-slate-300 text-sm mt-1">
                            Fork nhiều process con (mỗi process = 1 Event Loop riêng).<br />
                            Tận dụng multi-core CPU. PM2 dùng cluster mode mặc định.
                        </div>
                    </div>
                </div>
                <Callout type="warning">Câu hỏi phỏng vấn kinh điển: &quot;setTimeout(fn, 0) có chạy ngay không?&quot; — <strong>Không!</strong> fn được đưa vào macrotask queue, phải chờ call stack trống + microtasks xong mới chạy.</Callout>
                <Callout type="tip">📚 Tài liệu: <strong>Operating Systems: Three Easy Pieces</strong> — sách miễn phí, cực chất. Xem thêm video <strong>&quot;What the heck is the event loop anyway?&quot;</strong> by Philip Roberts (JSConf).</Callout>
            </TopicModal>
        </div>

        <Heading3>1.2 Networking cơ bản (click để xem chi tiết)</Heading3>
        <div className="my-4 space-y-2">
            <TopicModal title="HTTP/HTTPS" emoji="🌐" color="#ef4444" summary="Request/Response cycle, status codes, methods, headers — nền tảng của web">
                <Paragraph><Highlight>HTTP</Highlight> (HyperText Transfer Protocol) = giao thức client-server. Browser gửi <strong>Request</strong>, server trả <strong>Response</strong>. Mỗi request độc lập (stateless).</Paragraph>

                <Heading3>Anatomy của 1 HTTP Request</Heading3>
                <CodeBlock title="HTTP Request structure">{`// Request
GET /api/users?page=1 HTTP/1.1     ← Method + Path + Version
Host: example.com                  ← Bắt buộc
Authorization: Bearer eyJhbG...    ← Auth token
Content-Type: application/json     ← Định dạng body
Accept: application/json           ← Client muốn nhận gì
Cache-Control: no-cache            ← Không dùng cache

// Response
HTTP/1.1 200 OK                    ← Status code
Content-Type: application/json
Set-Cookie: session=abc; HttpOnly  ← Server set cookie
X-RateLimit-Remaining: 99         ← Rate limiting

{"users": [...], "total": 100}`}</CodeBlock>

                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">HTTP Methods (Idempotent?)</div>
                        <div className="text-slate-300 text-sm mt-1">
                            <InlineCode>GET</InlineCode> = đọc data (✅ idempotent, ✅ cacheable)<br />
                            <InlineCode>POST</InlineCode> = tạo mới (❌ không idempotent)<br />
                            <InlineCode>PUT</InlineCode> = update toàn bộ (✅ idempotent)<br />
                            <InlineCode>PATCH</InlineCode> = update 1 phần (❌ không idempotent)<br />
                            <InlineCode>DELETE</InlineCode> = xóa (✅ idempotent)
                        </div>
                        <div className="text-slate-400 text-xs mt-2 italic">💡 <strong>Idempotent</strong> = gọi nhiều lần vẫn cùng kết quả. DELETE /users/1 gọi 10 lần vẫn chỉ xóa 1 user.</div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">Status Codes (phải thuộc!)</div>
                        <div className="text-slate-300 text-sm mt-1">
                            <strong>2xx Thành công</strong>: 200 OK, 201 Created, 204 No Content<br />
                            <strong>3xx Chuyển hướng</strong>: 301 Moved Permanently, 302 Found, 304 Not Modified<br />
                            <strong>4xx Lỗi client</strong>: 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 429 Too Many Requests<br />
                            <strong>5xx Lỗi server</strong>: 500 Internal Error, 502 Bad Gateway, 503 Service Unavailable
                        </div>
                        <div className="text-slate-400 text-xs mt-2 italic">💡 <strong>401 vs 403</strong>: 401 = chưa login (ai vậy?), 403 = đã login nhưng không có quyền (biết rồi nhưng không cho).</div>
                    </div>
                    <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="text-yellow-400 font-bold text-sm">HTTP/1.1 → HTTP/2 → HTTP/3</div>
                        <div className="text-slate-300 text-sm mt-1">
                            <strong>HTTP/1.1</strong>: 1 request per connection. Head-of-line blocking.<br />
                            <strong>HTTP/2</strong>: Multiplexing (nhiều request cùng 1 TCP connection), header compression, server push.<br />
                            <strong>HTTP/3</strong>: Dùng QUIC (UDP-based) thay TCP. Nhanh hơn, không cần 3-way handshake.
                        </div>
                        <div className="text-slate-400 text-xs mt-2 italic">💡 Next.js tự động dùng HTTP/2 khi deploy trên Vercel. Chrome DevTools → Network tab → cột "Protocol" để kiểm tra.</div>
                    </div>
                </div>
                <Paragraph><Highlight>HTTPS</Highlight> = HTTP + TLS encryption. Data được mã hóa giữa client-server. Certificate được verify bởi CA (Certificate Authority). <strong>Bắt buộc</strong> cho PWA, Service Workers, và hầu hết APIs hiện đại.</Paragraph>
                <Callout type="tip">Câu hỏi phỏng vấn: &quot;Khi gõ URL và Enter, chuyện gì xảy ra?&quot; — DNS → TCP handshake → TLS handshake → HTTP request → Server process → Response → Browser render. Nắm rõ từng bước!</Callout>
            </TopicModal>

            <TopicModal title="DNS, TCP/IP, WebSocket" emoji="📡" color="#ef4444" summary="Cách browser tìm server và duy trì kết nối">
                <Paragraph>Khi bạn gõ <InlineCode>google.com</InlineCode>, đây là toàn bộ hành trình:</Paragraph>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="text-yellow-400 font-bold text-sm">1. DNS Resolution (“Danh bạ Internet”)</div>
                        <div className="text-slate-300 text-sm mt-1">
                            <InlineCode>google.com</InlineCode> → <InlineCode>142.250.80.46</InlineCode><br />
                            Thứ tự tra cứu: Browser cache → OS cache → Router → ISP DNS → Root DNS
                        </div>
                        <div className="text-slate-300 text-sm mt-2 pl-3">
                            • <strong>A Record</strong>: domain → IPv4 address<br />
                            • <strong>AAAA Record</strong>: domain → IPv6 address<br />
                            • <strong>CNAME</strong>: domain → domain khác (alias)<br />
                            • <strong>MX</strong>: domain → mail server<br />
                            • <strong>TTL</strong>: thời gian cache DNS record (thường 5 phút - 24 giờ)
                        </div>
                        <div className="text-slate-400 text-xs mt-2 italic">💡 <InlineCode>nslookup google.com</InlineCode> hoặc <InlineCode>dig google.com</InlineCode> để xem DNS records trong terminal.</div>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">2. TCP 3-way Handshake + TLS</div>
                        <div className="text-slate-300 text-sm mt-1">
                            <strong>TCP Handshake</strong> (thiết lập kết nối tin cậy):<br />
                            Client: SYN → Server: SYN-ACK → Client: ACK (~1 RTT)
                        </div>
                        <div className="text-slate-300 text-sm mt-2">
                            <strong>TLS Handshake</strong> (nếu HTTPS, thêm ~1-2 RTT):<br />
                            1. Client gửi supported cipher suites<br />
                            2. Server gửi certificate + public key<br />
                            3. Client verify certificate với CA<br />
                            4. Cả hai tạo shared session key (đối xứng) để encrypt data
                        </div>
                        <div className="text-slate-400 text-xs mt-2 italic">💡 TCP đảm bảo: data đúng thứ tự, không mất gói, retransmit nếu fail. UDP thì không — nhanh hơn nhưng không tin cậy (dùng cho video call, gaming).</div>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">3. WebSocket vs HTTP vs SSE</div>
                        <div className="text-slate-300 text-sm mt-1">
                            <strong>HTTP</strong>: request-response (client hỏi, server trả lời, đóng)<br />
                            <strong>WebSocket</strong>: full-duplex (2 chiều, giữ kết nối mở)<br />
                            <strong>SSE</strong> (Server-Sent Events): 1 chiều server → client (dễ hơn WebSocket)
                        </div>
                        <div className="text-slate-300 text-sm mt-2 pl-3">
                            • <strong>Chat app</strong>: WebSocket (cần 2 chiều)<br />
                            • <strong>Live notifications</strong>: SSE hoặc WebSocket<br />
                            • <strong>Live data feed</strong>: SSE (đơn giản, auto-reconnect)<br />
                            • <strong>REST API</strong>: HTTP (đa phần dùng cái này)
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <div className="text-red-400 font-bold text-sm">4. OSI Model (7 layers) — interview classic</div>
                        <div className="text-slate-300 text-sm mt-1">
                            Frontend dev cần biết chí ít 4 layer:
                        </div>
                        <div className="text-slate-300 text-sm mt-1 pl-3">
                            • <strong>Layer 7 (Application)</strong>: HTTP, WebSocket, DNS ← <strong>bạn làm việc ở đây</strong><br />
                            • <strong>Layer 4 (Transport)</strong>: TCP, UDP<br />
                            • <strong>Layer 3 (Network)</strong>: IP, routing<br />
                            • <strong>Layer 1-2 (Physical/Data Link)</strong>: Ethernet, WiFi
                        </div>
                    </div>
                </div>
                <Callout type="tip">📚 Ví dụ thực tế: Next.js API Routes dùng HTTP. n8n webhooks dùng HTTP. TikTok live dùng WebSocket. Vercel serverless functions dùng HTTP/2.</Callout>
            </TopicModal>

            <TopicModal title="REST vs GraphQL" emoji="🔌" color="#ef4444" summary="Hai mô hình API phổ biến — khi nào dùng cái nào">
                <div className="my-3 overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead><tr className="border-b border-[var(--border-primary)]"><th className="text-left p-2 text-slate-400">Tiêu chí</th><th className="text-left p-2 text-blue-400">REST</th><th className="text-left p-2 text-purple-400">GraphQL</th></tr></thead>
                        <tbody className="text-[var(--text-secondary)]">
                            <tr className="border-b border-gray-100"><td className="p-2">Kiểu</td><td className="p-2">Nhiều endpoints</td><td className="p-2">1 endpoint duy nhất</td></tr>
                            <tr className="border-b border-gray-100"><td className="p-2">Data fetching</td><td className="p-2">Server quyết định trả gì</td><td className="p-2">Client chọn fields cần</td></tr>
                            <tr className="border-b border-gray-100"><td className="p-2">Over-fetching</td><td className="p-2">Thường xảy ra</td><td className="p-2">Không bao giờ</td></tr>
                            <tr className="border-b border-gray-100"><td className="p-2">Under-fetching</td><td className="p-2">Cần gọi nhiều endpoints</td><td className="p-2">1 query lấy hết</td></tr>
                            <tr className="border-b border-gray-100"><td className="p-2">Caching</td><td className="p-2">HTTP caching đơn giản</td><td className="p-2">Phức tạp hơn (Apollo cache)</td></tr>
                            <tr className="border-b border-gray-100"><td className="p-2">Error handling</td><td className="p-2">HTTP status codes</td><td className="p-2">Luôn 200, errors trong body</td></tr>
                            <tr><td className="p-2">Dùng bởi</td><td className="p-2">Hầu hết APIs</td><td className="p-2">Facebook, GitHub, Shopify</td></tr>
                        </tbody>
                    </table>
                </div>
                <CodeBlock title="REST vs GraphQL example">{`// REST: Cần 3 requests để lấy data cho 1 trang profile
GET /api/users/1           → { id: 1, name: "An", ... }
GET /api/users/1/posts     → [{ title: "...", ... }]
GET /api/users/1/followers → [{ name: "...", ... }]
// Vấn đề: 3 round-trips + over-fetching thừa fields

// GraphQL: 1 request duy nhất, chỉ lấy fields cần
POST /graphql
query {
  user(id: 1) {
    name
    posts(limit: 5) { title, createdAt }
    followers { name }
  }
}
→ Chính xác data cần, không thừa!`}</CodeBlock>

                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <div className="text-red-400 font-bold text-sm">N+1 Problem (cả REST và GraphQL)</div>
                        <div className="text-slate-300 text-sm mt-1">
                            Lấy danh sách 10 posts, mỗi post cần author → 1 query posts + 10 query authors = 11 queries!<br />
                            <strong>Giải pháp</strong>: Batch loading (DataLoader), JOIN queries, hoặc <InlineCode>populate()</InlineCode> trong Mongoose.
                        </div>
                    </div>
                </div>
                <Callout type="tip">Trong thực tế, hầu hết frontend projects dùng <strong>REST</strong>. GraphQL thường gặp ở công ty lớn (Meta, Shopify) hoặc app có UI phức tạp cần flexible data fetching.</Callout>
            </TopicModal>

            <TopicModal title="CORS, Cookies, JWT" emoji="🔐" color="#ef4444" summary="Authentication flow — cách web apps xác thực người dùng">
                <Heading3>CORS (Cross-Origin Resource Sharing)</Heading3>
                <Paragraph>Browser chặn request từ domain A sang domain B (<Highlight>Same-Origin Policy</Highlight>). Server phải cho phép bằng header <InlineCode>Access-Control-Allow-Origin</InlineCode>.</Paragraph>
                <CodeBlock title="CORS Preflight flow">{`// 1. Browser gửi Preflight (OPTIONS) trước khi gửi request thực
OPTIONS /api/data HTTP/1.1
Origin: https://myapp.com
Access-Control-Request-Method: POST
Access-Control-Request-Headers: Content-Type, Authorization

// 2. Server trả lời cho phép
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: https://myapp.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Max-Age: 86400     ← Cache preflight 24h

// 3. Browser gửi request thực sự
POST /api/data ...`}</CodeBlock>
                <Callout type="warning"><strong>Simple requests</strong> (GET, POST với Content-Type: form-data) không cần preflight. Chỉ các request phức tạp (custom headers, PUT/DELETE) mới trigger OPTIONS.</Callout>

                <Heading3>JWT (JSON Web Token) — giải phẫu</Heading3>
                <CodeBlock title="JWT structure">{`// JWT = 3 phần ngăn cách bằng dấu chấm:
eyJhbGciOi...    ← Header (algorithm + type)
eyJzdWIiOi...    ← Payload (user data, exp, iat)
SflKxwRJSM...    ← Signature (verify không bị sửa)

// Decoded payload:
{
  "sub": "user_123",
  "name": "Khuong",
  "role": "admin",
  "iat": 1710000000,      ← issued at
  "exp": 1710086400       ← expires (24h sau)
}`}</CodeBlock>

                <Heading3>Cookies vs JWT vs Session</Heading3>
                <div className="my-3 overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead><tr className="border-b border-[var(--border-primary)]"><th className="text-left p-2 text-slate-400">Tiêu chí</th><th className="text-left p-2 text-blue-400">Cookie + Session</th><th className="text-left p-2 text-green-400">JWT</th></tr></thead>
                        <tbody className="text-[var(--text-secondary)]">
                            <tr className="border-b border-gray-100"><td className="p-2">Lưu ở</td><td className="p-2">Browser (tự gửi mỗi request)</td><td className="p-2">Client (localStorage/memory/cookie)</td></tr>
                            <tr className="border-b border-gray-100"><td className="p-2">Stateful/less</td><td className="p-2">Stateful — server lưu session</td><td className="p-2">Stateless — token chứa data</td></tr>
                            <tr className="border-b border-gray-100"><td className="p-2">XSS risk</td><td className="p-2"><InlineCode>httpOnly</InlineCode> + <InlineCode>Secure</InlineCode> flag bảo vệ</td><td className="p-2">Nếu ở localStorage → XSS risk!</td></tr>
                            <tr className="border-b border-gray-100"><td className="p-2">CSRF risk</td><td className="p-2">Có — cần CSRF token</td><td className="p-2">Không (nếu không dùng cookie)</td></tr>
                            <tr className="border-b border-gray-100"><td className="p-2">Scale</td><td className="p-2">Cần shared session store (Redis)</td><td className="p-2">Dễ scale (stateless)</td></tr>
                            <tr><td className="p-2">Revoke</td><td className="p-2">Xóa session ở server</td><td className="p-2">Khó — cần blacklist hoặc short expiry</td></tr>
                        </tbody>
                    </table>
                </div>
                <Callout type="warning">Best practice: Lưu JWT trong <Highlight>httpOnly cookie</Highlight> (không XSS + tự gửi) + CSRF protection. Hoặc lưu trong memory (biến JS) + refresh token trong httpOnly cookie. <strong>Không bao giờ lưu access token trong localStorage!</strong></Callout>
            </TopicModal>

            <TopicModal title="Browser Storage" emoji="💾" color="#ef4444" summary="localStorage, sessionStorage, cookies, IndexedDB — lưu data phía client">
                <Paragraph>Browser cung cấp nhiều cách lưu data phía client. Mỗi loại có <Highlight>use case riêng</Highlight> — chọn sai là bug hoặc security risk.</Paragraph>

                <div className="my-3 overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead><tr className="border-b border-[var(--border-primary)]"><th className="text-left p-2 text-slate-400">Tiêu chí</th><th className="text-left p-2 text-blue-400">localStorage</th><th className="text-left p-2 text-green-400">sessionStorage</th><th className="text-left p-2 text-yellow-400">Cookies</th><th className="text-left p-2 text-purple-400">IndexedDB</th></tr></thead>
                        <tbody className="text-[var(--text-secondary)]">
                            <tr className="border-b border-gray-100"><td className="p-2">Dung lượng</td><td className="p-2">~5-10 MB</td><td className="p-2">~5 MB</td><td className="p-2">~4 KB</td><td className="p-2">Hàng trăm MB+</td></tr>
                            <tr className="border-b border-gray-100"><td className="p-2">Hết hạn</td><td className="p-2">Không (persist)</td><td className="p-2">Đóng tab = mất</td><td className="p-2">Set expires/max-age</td><td className="p-2">Không (persist)</td></tr>
                            <tr className="border-b border-gray-100"><td className="p-2">Gửi lên server</td><td className="p-2">❌ Không</td><td className="p-2">❌ Không</td><td className="p-2">✅ Tự động mỗi request</td><td className="p-2">❌ Không</td></tr>
                            <tr className="border-b border-gray-100"><td className="p-2">API</td><td className="p-2">Sync (đơn giản)</td><td className="p-2">Sync (đơn giản)</td><td className="p-2">document.cookie</td><td className="p-2">Async (phức tạp)</td></tr>
                            <tr><td className="p-2">Use case</td><td className="p-2">User prefs, theme</td><td className="p-2">Form wizard, temp data</td><td className="p-2">Auth tokens, tracking</td><td className="p-2">Offline data, large datasets</td></tr>
                        </tbody>
                    </table>
                </div>

                <CodeBlock title="localStorage & sessionStorage">{`// localStorage — persist across sessions
localStorage.setItem('theme', 'dark')
localStorage.getItem('theme')    // 'dark'
localStorage.removeItem('theme')
localStorage.clear()             // xóa tất cả

// sessionStorage — chỉ tồn tại trong tab hiện tại
sessionStorage.setItem('step', '2')
sessionStorage.getItem('step')   // '2'
// Đóng tab → mất hết!

// Lưu object → phải JSON.stringify
localStorage.setItem('user', JSON.stringify({ name: 'An', age: 25 }))
const user = JSON.parse(localStorage.getItem('user'))`}</CodeBlock>

                <CodeBlock title="Cookies (document.cookie)">{`// Set cookie
document.cookie = 'token=abc123; path=/; max-age=3600; Secure; SameSite=Strict'

// Read cookies (trả về string, phải parse)
document.cookie  // 'token=abc123; theme=dark'

// Cookie flags quan trọng:
// Secure     — chỉ gửi qua HTTPS
// HttpOnly   — JS không đọc được (chống XSS!)
// SameSite   — chống CSRF (Strict/Lax/None)
// max-age    — thời gian sống (giây)
// path=/     — áp dụng cho toàn site`}</CodeBlock>

                <CodeBlock title="IndexedDB (cho data lớn)">{`// IndexedDB — NoSQL database trong browser
const request = indexedDB.open('myDB', 1)

request.onupgradeneeded = (e) => {
  const db = e.target.result
  db.createObjectStore('users', { keyPath: 'id' })
}

request.onsuccess = (e) => {
  const db = e.target.result
  const tx = db.transaction('users', 'readwrite')
  tx.objectStore('users').add({ id: 1, name: 'An' })
}

// Thực tế: dùng wrapper như idb hoặc Dexie.js
// import { openDB } from 'idb'
// const db = await openDB('myDB', 1)
// await db.put('users', { id: 1, name: 'An' })`}</CodeBlock>

                <Callout type="tip">🎯 <strong>Quy tắc chọn storage:</strong><br />
                    • Auth tokens → <InlineCode>httpOnly cookie</InlineCode> (bảo mật nhất)<br />
                    • Theme/language → <InlineCode>localStorage</InlineCode> (persist, nhỏ)<br />
                    • Form multi-step → <InlineCode>sessionStorage</InlineCode> (mất khi đóng tab)<br />
                    • Offline/cache lớn → <InlineCode>IndexedDB</InlineCode> (structured data)</Callout>

                <Callout type="warning"><InlineCode>localStorage</InlineCode> là <strong>synchronous</strong> — nếu lưu data lớn sẽ block main thread. Dùng <InlineCode>IndexedDB</InlineCode> (async) cho data &gt; 1MB.</Callout>
            </TopicModal>
        </div>

        <Heading3>1.3 Git & Terminal (click để xem chi tiết)</Heading3>
        <div className="my-4 space-y-2">
            <TopicModal title="Git nâng cao" emoji="🔧" color="#ef4444" summary="rebase, cherry-pick, bisect, stash — những lệnh phân biệt junior vs senior">
                <Paragraph>Ngoài <InlineCode>add/commit/push/pull</InlineCode>, đây là những lệnh <Highlight>phải biết</Highlight>:</Paragraph>
                <CodeBlock title="Git commands nâng cao">{`# Rebase — rewrite history, clean commits
git rebase -i HEAD~3     # Squash/edit 3 commits gần nhất
git rebase main          # Đặt branch lên đầu main

# Cherry-pick — lấy 1 commit cụ thể
git cherry-pick abc1234  # Copy commit sang branch hiện tại

# Bisect — tìm commit gây bug (binary search!)
git bisect start
git bisect bad           # Commit hiện tại bị bug
git bisect good v1.0     # Commit v1.0 không bug
# Git sẽ checkout giữa → bạn test → nó thu hẹp phạm vi

# Stash — lưu tạm thay đổi
git stash                # Cất thay đổi
git stash pop            # Lấy lại
git stash list           # Xem danh sách

# Reflog — cứu mạng khi mất commits
git reflog               # Xem lịch sử HEAD
git reset --hard HEAD@{3} # Khôi phục về state cũ`}</CodeBlock>
                <Callout type="tip">📚 <strong>learngitbranching.js.org</strong> — interactive game học Git branching, rất trực quan!</Callout>
            </TopicModal>

            <TopicModal title="Linux/Terminal" emoji="💻" color="#ef4444" summary="Navigation, permissions, pipes — nền tảng cho DevOps và debugging">
                <CodeBlock title="Commands phải thuộc">{`# Navigation & Files
ls -la          # List all files + permissions
find . -name "*.tsx" -type f   # Tìm file
du -sh */       # Disk usage mỗi folder

# Text processing (rất hữu ích khi debug)
grep -rn "error" ./logs/     # Tìm text trong files
cat file.log | grep "ERROR" | wc -l  # Đếm số lỗi
awk '{print $1}' access.log | sort | uniq -c | sort -rn  # Top IPs

# Process management
ps aux | grep node           # Tìm Node process
kill -9 <PID>                # Force kill
lsof -i :3000                # Ai đang dùng port 3000?

# Permissions
chmod 755 script.sh          # rwxr-xr-x
chown user:group file        # Đổi owner`}</CodeBlock>
                <Callout type="tip">Pipe (<InlineCode>|</InlineCode>) là concept quan trọng nhất — nó kết nối output của command này thành input của command kia. Cực mạnh khi debug!</Callout>
            </TopicModal>
        </div>

        <Callout type="tip">
            Nếu bạn chỉ có thể chọn 1 khóa học cho phase này: <Highlight>CS50 của Harvard</Highlight> (free trên YouTube).
            Nó cover cả C, algorithms, memory, web — nền tảng cực kỳ vững.
        </Callout>

        {/* ===== PHASE 2 ===== */}
        <Heading2>Phase 2 — JavaScript Master (4-6 tuần)</Heading2>

        <Paragraph>
            JavaScript là <Highlight>ngôn ngữ lõi</Highlight> của Frontend. Big tech sẽ hỏi sâu về JS —
            không chỉ syntax mà còn <Highlight>cơ chế bên trong</Highlight>.
        </Paragraph>

        <Heading3>2.1 Core concepts (PHẢI biết — click để xem chi tiết)</Heading3>
        <div className="my-4 space-y-2">
            <TopicModal title="Execution Context & Hoisting" emoji="⚙️" color="#fbbf24" summary="Cách JS engine chạy code — Creation Phase vs Execution Phase">
                <Paragraph>Khi bạn chạy JS, engine tạo <Highlight>Execution Context</Highlight> gồm 2 phase:</Paragraph>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="text-yellow-400 font-bold text-sm">1. Creation Phase</div>
                        <div className="text-slate-300 text-sm mt-1">• Tạo Global/Window object<br />• Setup memory heap cho variables và functions<br />• <strong>Hoisting</strong>: var được gán <InlineCode>undefined</InlineCode>, function declarations được copy nguyên<br />• <InlineCode>let</InlineCode>/<InlineCode>const</InlineCode> ở &quot;Temporal Dead Zone&quot; — truy cập sớm sẽ bị ReferenceError</div>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">2. Execution Phase</div>
                        <div className="text-slate-300 text-sm mt-1">• Chạy code line by line<br />• Gán giá trị thật cho variables<br />• Gọi functions → tạo Function Execution Context mới (cũng có 2 phases)</div>
                    </div>
                </div>
                <CodeBlock title="Hoisting example">{`console.log(a); // undefined (hoisted, assigned undefined)
console.log(b); // ReferenceError! (TDZ)
var a = 1;
let b = 2;

greet(); // "Hello!" — function hoisted nguyên vẹn
function greet() { console.log("Hello!"); }`}</CodeBlock>
                <Callout type="tip">Interview tip: Giải thích được <Highlight>TDZ</Highlight> (Temporal Dead Zone) của let/const sẽ ghi điểm cực lớn.</Callout>
            </TopicModal>

            <TopicModal title="Scope & Closure" emoji="🔒" color="#a78bfa" summary="Lexical scope, closure patterns, module pattern">
                <Paragraph><Highlight>Scope</Highlight> = phạm vi truy cập biến. JS dùng <Highlight>Lexical Scope</Highlight> — scope được xác định lúc code được viết, không phải lúc chạy.</Paragraph>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">3 loại Scope</div>
                        <div className="text-slate-300 text-sm mt-1">• <strong>Global</strong> — truy cập ở mọi nơi<br />• <strong>Function</strong> — chỉ truy cập trong function<br />• <strong>Block</strong> (let/const) — chỉ trong {'{}'}</div>
                    </div>
                </div>
                <Paragraph><Highlight>Closure</Highlight> = function &quot;nhớ&quot; scope lúc nó được tạo, kể cả khi chạy ở nơi khác.</Paragraph>
                <CodeBlock title="Closure classic example">{`function makeCounter() {
    let count = 0; // Biến "private"
    return {
        increment: () => ++count,
        getCount: () => count,
    };
}
const counter = makeCounter();
counter.increment(); // 1
counter.increment(); // 2
counter.getCount();  // 2
// count KHÔNG truy cập trực tiếp được!`}</CodeBlock>
                <Callout type="warning">Câu hỏi phỏng vấn kinh điển: &quot;Giải thích output của vòng for + setTimeout&quot; — đáp án liên quan đến closure + var vs let.</Callout>
                <CodeBlock title="Ví dụ kinh điển: for + setTimeout">{`// ❌ Dùng var — in ra 5, 5, 5, 5, 5
for (var i = 0; i < 5; i++) {
    setTimeout(() => console.log(i), 100);
}
// Tại sao? var có function scope, không có block scope.
// Khi setTimeout chạy, vòng for đã kết thúc, i = 5.
// Tất cả 5 callback đều tham chiếu CÙNG MỘT biến i.

// ✅ Dùng let — in ra 0, 1, 2, 3, 4
for (let i = 0; i < 5; i++) {
    setTimeout(() => console.log(i), 100);
}
// Tại sao? let có block scope — mỗi vòng lặp tạo
// một biến i MỚI, callback closure "bắt" đúng giá trị.

// ✅ Fix bằng IIFE (trước khi có let)
for (var i = 0; i < 5; i++) {
    (function(j) {
        setTimeout(() => console.log(j), 100);
    })(i);
}
// IIFE tạo scope mới, "copy" giá trị i vào j.`}</CodeBlock>
            </TopicModal>

            <TopicModal title="this keyword" emoji="👉" color="#f472b6" summary="4 rules binding: default, implicit, explicit, new">
                <Paragraph><InlineCode>this</InlineCode> trong JS <Highlight>không cố định</Highlight> — nó phụ thuộc vào <strong>cách function được gọi</strong>, không phải nơi nó được viết.</Paragraph>
                <div className="my-3 overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead><tr className="border-b border-[var(--border-primary)]"><th className="text-left p-2 text-slate-400">Rule</th><th className="text-left p-2 text-slate-400">this =</th><th className="text-left p-2 text-slate-400">Ví dụ</th></tr></thead>
                        <tbody className="text-[var(--text-secondary)]">
                            <tr className="border-b border-gray-100"><td className="p-2 text-yellow-400">Default</td><td className="p-2">window / undefined</td><td className="p-2"><InlineCode>foo()</InlineCode></td></tr>
                            <tr className="border-b border-gray-100"><td className="p-2 text-blue-400">Implicit</td><td className="p-2">object trước dấu .</td><td className="p-2"><InlineCode>obj.foo()</InlineCode></td></tr>
                            <tr className="border-b border-gray-100"><td className="p-2 text-green-400">Explicit</td><td className="p-2">argument đầu</td><td className="p-2"><InlineCode>foo.call(obj)</InlineCode></td></tr>
                            <tr><td className="p-2 text-purple-400">new</td><td className="p-2">object mới tạo</td><td className="p-2"><InlineCode>new Foo()</InlineCode></td></tr>
                        </tbody>
                    </table>
                </div>
                <Paragraph><Highlight>Arrow function</Highlight> KHÔNG có this riêng — nó kế thừa this từ scope cha (lexical this). Đây là lý do arrow function phù hợp cho callbacks.</Paragraph>
                <CodeBlock title="Ví dụ từng rule">{`// 1️⃣ Default binding — this = window (browser) / undefined (strict mode)
function showThis() {
    console.log(this);
}
showThis(); // window (non-strict) / undefined (strict)

// 2️⃣ Implicit binding — this = object trước dấu chấm
const user = {
    name: 'Khuong',
    greet() { console.log(this.name); }
};
user.greet(); // "Khuong" ✅
const fn = user.greet;
fn(); // undefined ❌ (bị mất context!)

// 3️⃣ Explicit binding — call / apply / bind
function greet(greeting) {
    console.log(greeting + ', ' + this.name);
}
greet.call({ name: 'An' }, 'Hi');    // "Hi, An"
greet.apply({ name: 'An' }, ['Hi']); // "Hi, An"
const bound = greet.bind({ name: 'An' });
bound('Hello'); // "Hello, An"

// 4️⃣ new binding — this = object mới tạo
function Person(name) {
    this.name = name; // this = {} mới
}
const p = new Person('Binh');
console.log(p.name); // "Binh"

// 5️⃣ Arrow function — KHÔNG có this riêng
const team = {
    name: 'Frontend',
    members: ['A', 'B'],
    show() {
        this.members.forEach((m) => {
            console.log(m + ' thuộc ' + this.name);
            // Arrow kế thừa this từ show() → team
        });
    }
};
team.show();
// "A thuộc Frontend"
// "B thuộc Frontend"`}</CodeBlock>
                <Callout type="tip">Thứ tự ưu tiên: <strong>new &gt; explicit &gt; implicit &gt; default</strong>. Arrow function bỏ qua tất cả rules này.</Callout>
            </TopicModal>

            <TopicModal title="Prototype & Inheritance" emoji="🧬" color="#34d399" summary="Prototype chain, __proto__, Object.create">
                <Paragraph>JS dùng <Highlight>Prototypal Inheritance</Highlight> — mỗi object có một link ẩn (<InlineCode>__proto__</InlineCode>) trỏ đến prototype của nó.</Paragraph>
                <Paragraph>Khi bạn truy cập property không có trên object, JS sẽ <strong>đi lên prototype chain</strong> tìm cho đến khi gặp <InlineCode>null</InlineCode>.</Paragraph>
                <CodeBlock title="Prototype chain">{`const animal = { eat: true };
const dog = Object.create(animal); // dog.__proto__ = animal
dog.bark = true;

dog.bark; // true (own property)
dog.eat;  // true (từ prototype chain!)
dog.fly;  // undefined (không tìm thấy)

// Chain: dog → animal → Object.prototype → null`}</CodeBlock>
                <Callout type="warning">ES6 Class chỉ là <Highlight>syntactic sugar</Highlight> — bên dưới vẫn dùng prototype. Hiểu prototype = hiểu JS ở level sâu.</Callout>
            </TopicModal>

            <TopicModal title="Event Loop" emoji="🔄" color="#60a5fa" summary="Call Stack, Microtask Queue, Macrotask Queue">
                <Paragraph>JS là <Highlight>single-threaded</Highlight> nhưng vẫn xử lý async nhờ <Highlight>Event Loop</Highlight>. Hiểu Event Loop = hiểu tại sao code async chạy theo thứ tự &quot;lạ&quot;.</Paragraph>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">Thứ tự ưu tiên</div>
                        <div className="text-slate-300 text-sm mt-1">1. <strong>Call Stack</strong> — code đồng bộ chạy trước<br />2. <strong>Microtask Queue</strong> — Promise.then, queueMicrotask, MutationObserver<br />3. <strong>Macrotask Queue</strong> — setTimeout, setInterval, I/O</div>
                    </div>
                </div>
                <CodeBlock title="Đoán output">{`console.log('1'); // Call Stack
setTimeout(() => console.log('2'), 0); // Macrotask
Promise.resolve().then(() => console.log('3')); // Microtask
console.log('4'); // Call Stack

// Output: 1 → 4 → 3 → 2`}</CodeBlock>
                <Callout type="tip">Đây là câu hỏi phỏng vấn #1 về JS. Luôn nhớ: <Highlight>Sync → Microtask → Macrotask</Highlight>.</Callout>
                <a href="/blogs/event-loop" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 Xem bài viết chi tiết →</a>
            </TopicModal>

            <TopicModal title="Async/Await & Promises" emoji="⚡" color="#fbbf24" summary="Promise là gì, 3 trạng thái, Promise.all/race/allSettled, async/await, error handling">
                <Paragraph><Highlight>Promise</Highlight> là một đối tượng đại diện cho kết quả (thành công hoặc thất bại) của một tác vụ bất đồng bộ (như gọi API, đọc file) trong tương lai. Nó giải quyết tình trạng <Highlight>&quot;callback hell&quot;</Highlight> bằng cách cung cấp cú pháp <InlineCode>.then()</InlineCode> và <InlineCode>.catch()</InlineCode> để quản lý code dễ đọc, dễ bảo trì hơn.</Paragraph>

                <Heading3>3 Trạng thái của Promise</Heading3>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="text-yellow-400 font-bold text-sm">⏳ Pending (Đang chờ)</div>
                        <div className="text-slate-300 text-sm mt-1">Trạng thái ban đầu — tác vụ bất đồng bộ chưa hoàn tất. Promise vẫn đang &quot;chờ&quot; kết quả.</div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">✅ Fulfilled / Resolved (Thành công)</div>
                        <div className="text-slate-300 text-sm mt-1">Tác vụ hoàn thành thành công, Promise có kết quả (value). Gọi callback trong <InlineCode>.then()</InlineCode>.</div>
                    </div>
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <div className="text-red-400 font-bold text-sm">❌ Rejected (Bị từ chối)</div>
                        <div className="text-slate-300 text-sm mt-1">Tác vụ thất bại, Promise trả về lỗi (reason). Gọi callback trong <InlineCode>.catch()</InlineCode>.</div>
                    </div>
                </div>

                <Heading3>Cách hoạt động</Heading3>
                <CodeBlock title="Tạo và sử dụng Promise">{`const myPromise = new Promise((resolve, reject) => {
  // Thực hiện tác vụ bất đồng bộ
  let success = true;
  if (success) {
    resolve("Dữ liệu thành công"); // → Fulfilled
  } else {
    reject("Lỗi xảy ra");          // → Rejected
  }
});

myPromise
  .then((data) => console.log(data))   // Xử lý khi thành công
  .catch((error) => console.error(error)) // Xử lý khi lỗi
  .finally(() => console.log("Hoàn tất")); // Chạy dù thành công hay lỗi`}</CodeBlock>

                <Heading3>async/await — Syntactic Sugar</Heading3>
                <Paragraph><InlineCode>async/await</InlineCode> là cú pháp được giới thiệu trong ES2017, giúp viết async code nhìn như synchronous — dễ đọc, dễ debug hơn nhiều so với <InlineCode>.then()</InlineCode> chain.</Paragraph>

                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="text-yellow-400 font-bold text-sm">async — Đánh dấu function là bất đồng bộ</div>
                        <div className="text-slate-300 text-sm mt-1">• Thêm <InlineCode>async</InlineCode> trước function → function đó <strong>luôn trả về Promise</strong><br />• Nếu return giá trị bình thường, JS tự wrap thành <InlineCode>Promise.resolve(value)</InlineCode><br />• Nếu throw error, JS tự wrap thành <InlineCode>Promise.reject(error)</InlineCode></div>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">await — Tạm dừng và chờ Promise resolve</div>
                        <div className="text-slate-300 text-sm mt-1">• <InlineCode>await</InlineCode> chỉ dùng được <strong>bên trong async function</strong> (hoặc top-level modules)<br />• Khi gặp <InlineCode>await</InlineCode>, JS <strong>tạm dừng</strong> function đó, trả quyền điều khiển cho Event Loop<br />• Khi Promise resolve → JS <strong>tiếp tục chạy</strong> từ dòng tiếp theo<br />• Khi Promise reject → throw error (bắt bằng <InlineCode>try/catch</InlineCode>)</div>
                    </div>
                </div>

                <CodeBlock title="async keyword giải thích">{`// async function LUÔN trả về Promise
async function getNumber() {
  return 42; // Tự động wrap → Promise.resolve(42)
}
getNumber().then(n => console.log(n)); // 42

// Tương đương với:
function getNumber() {
  return Promise.resolve(42);
}

// async + throw = Promise.reject
async function failHard() {
  throw new Error("Oops!"); // → Promise.reject(Error("Oops!"))
}
failHard().catch(err => console.log(err.message)); // "Oops!"`}</CodeBlock>

                <CodeBlock title="await hoạt động thế nào">{`async function fetchUser() {
  console.log("1. Bắt đầu fetch");

  // await TẠM DỪNG function tại đây
  // Event Loop vẫn chạy, xử lý tasks khác
  const res = await fetch('/api/user'); // ⏸️ chờ...

  // Khi fetch xong → TIẾP TỤC từ đây
  console.log("2. Fetch xong, parse JSON");
  const user = await res.json(); // ⏸️ chờ tiếp...

  console.log("3. Có data:", user.name);
  return user;
}

// BÊN NGOÀI, code vẫn chạy bình thường (non-blocking)
fetchUser();
console.log("4. Dòng này chạy NGAY, không chờ fetchUser");
// Output: 1 → 4 → 2 → 3`}</CodeBlock>

                <Heading3>⚠️ Sai lầm phổ biến: Sequential vs Parallel</Heading3>
                <CodeBlock title="Cẩn thận: await tuần tự vs song song">{`// ❌ SAI: Chạy tuần tự — chậm!
async function slow() {
  const users = await fetch('/api/users');  // 2s
  const posts = await fetch('/api/posts');  // 2s
  // Tổng: 4 giây! Vì chờ users xong mới fetch posts
}

// ✅ ĐÚNG: Chạy song song — nhanh!
async function fast() {
  const [users, posts] = await Promise.all([
    fetch('/api/users'),   // 2s
    fetch('/api/posts'),   // 2s (chạy cùng lúc!)
  ]);
  // Tổng: 2 giây! Hai requests chạy đồng thời
}

// ✅ Hoặc: Start promises trước, await sau
async function alsoFast() {
  const usersPromise = fetch('/api/users');  // Bắt đầu ngay
  const postsPromise = fetch('/api/posts');  // Bắt đầu ngay

  const users = await usersPromise;  // Chờ kết quả
  const posts = await postsPromise;  // Đã xong rồi (hoặc gần xong)
}`}</CodeBlock>

                <Heading3>Error Handling Patterns</Heading3>
                <CodeBlock title="Các cách xử lý lỗi">{`// Pattern 1: try/catch (phổ biến nhất)
async function loadData() {
  try {
    const res = await fetch('/api/data');
    if (!res.ok) throw new Error('HTTP ' + res.status);
    return await res.json();
  } catch (err) {
    console.error('Failed:', err.message);
    return null; // Fallback value
  }
}

// Pattern 2: .catch() trên từng await
async function loadData() {
  const data = await fetch('/api/data')
    .then(r => r.json())
    .catch(() => null); // Không crash, trả null nếu lỗi
}

// Pattern 3: Wrapper function (Go-style)
async function to(promise) {
  try {
    const data = await promise;
    return [null, data];
  } catch (err) {
    return [err, null];
  }
}

// Sử dụng:
const [err, user] = await to(fetch('/api/user').then(r => r.json()));
if (err) console.error('Error:', err);`}</CodeBlock>

                <CodeBlock title="So sánh then() vs async/await">{`// ❌ Promise chain — khó đọc khi lồng nhiều
fetch('/api/user')
  .then(res => res.json())
  .then(user => fetch('/api/posts/' + user.id))
  .then(res => res.json())
  .then(posts => console.log(posts))
  .catch(err => console.error(err));

// ✅ async/await — rõ ràng, dễ debug
async function loadPosts() {
  try {
    const res = await fetch('/api/user');
    const user = await res.json();
    const postsRes = await fetch('/api/posts/' + user.id);
    const posts = await postsRes.json();
    console.log(posts);
  } catch (err) {
    console.error(err);
  }
}`}</CodeBlock>

                <Heading3>Các phương thức quan trọng</Heading3>
                <div className="my-3 overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead><tr className="border-b border-[var(--border-primary)]"><th className="text-left p-2 text-slate-400">Method</th><th className="text-left p-2 text-slate-400">Hành vi</th><th className="text-left p-2 text-slate-400">Khi nào dùng</th></tr></thead>
                        <tbody className="text-[var(--text-secondary)]">
                            <tr className="border-b border-gray-100"><td className="p-2"><InlineCode>Promise.all</InlineCode></td><td className="p-2">Chạy song song, <strong>reject nếu 1 fail</strong></td><td className="p-2">Fetch nhiều API cùng lúc, tất cả đều bắt buộc</td></tr>
                            <tr className="border-b border-gray-100"><td className="p-2"><InlineCode>Promise.allSettled</InlineCode></td><td className="p-2">Chạy song song, <strong>chờ tất cả xong</strong> (kể cả fail)</td><td className="p-2">Batch operations mà vẫn muốn biết kết quả từng cái</td></tr>
                            <tr className="border-b border-gray-100"><td className="p-2"><InlineCode>Promise.race</InlineCode></td><td className="p-2">Trả về <strong>kết quả đầu tiên</strong> (fulfill hoặc reject)</td><td className="p-2">Timeout pattern, lấy response nhanh nhất</td></tr>
                            <tr><td className="p-2"><InlineCode>Promise.any</InlineCode></td><td className="p-2">Trả về <strong>fulfilled đầu tiên</strong>, ignore rejected</td><td className="p-2">Fallback servers, lấy kết quả thành công đầu tiên</td></tr>
                        </tbody>
                    </table>
                </div>
                <CodeBlock title="Ví dụ Promise methods">{`// Promise.all — fail fast
const [users, posts] = await Promise.all([
  fetch('/api/users').then(r => r.json()),
  fetch('/api/posts').then(r => r.json()),
]); // Nếu 1 cái fail → cả 2 đều bị reject!

// Promise.allSettled — chờ tất cả
const results = await Promise.allSettled([
  fetch('/api/a'), // fulfilled
  fetch('/api/b'), // rejected
]);
// results = [
//   { status: 'fulfilled', value: Response },
//   { status: 'rejected', reason: Error }
// ]

// Promise.race — timeout pattern
const result = await Promise.race([
  fetch('/api/slow-endpoint'),
  new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Timeout!')), 5000)
  ),
]);`}</CodeBlock>

                <Heading3>Lợi ích của Promise</Heading3>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">🧹 Tránh Callback Hell</div>
                        <div className="text-slate-300 text-sm mt-1">Thay vì callback lồng nhau 5-6 cấp, dùng <InlineCode>.then()</InlineCode> chain hoặc <InlineCode>async/await</InlineCode> — code phẳng, dễ đọc.</div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">🛡️ Error Handling tốt hơn</div>
                        <div className="text-slate-300 text-sm mt-1">Một <InlineCode>.catch()</InlineCode> bắt tất cả lỗi trong chain. Với <InlineCode>async/await</InlineCode>, dùng <InlineCode>try/catch</InlineCode> quen thuộc.</div>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">⚡ Chạy song song dễ dàng</div>
                        <div className="text-slate-300 text-sm mt-1"><InlineCode>Promise.all</InlineCode> cho phép chạy nhiều async tasks đồng thời — nhanh hơn đáng kể so với chạy tuần tự.</div>
                    </div>
                </div>

                <Callout type="warning">Luôn dùng <InlineCode>try/catch</InlineCode> với async/await. Unhandled Promise rejection sẽ crash Node.js process!</Callout>
                <Callout type="tip">Interview tip: Giải thích được sự khác nhau giữa <InlineCode>Promise.all</InlineCode> vs <InlineCode>Promise.allSettled</InlineCode> và khi nào dùng cái nào — câu hỏi rất phổ biến.</Callout>
                <a href="/blogs/callback-promise-async-await" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 Xem bài viết chi tiết →</a>
            </TopicModal>

            <TopicModal title="ES6+ Features" emoji="✨" color="#38bdf8" summary="destructuring, spread, modules, optional chaining, nullish coalescing">
                <Paragraph>Những feature <Highlight>phải dùng thành thạo</Highlight> — interviewer expect bạn viết modern JS.</Paragraph>
                <div className="my-3 space-y-2">
                    {[
                        ['Destructuring', 'const { name, age } = user; const [first, ...rest] = arr;'],
                        ['Spread / Rest', 'const merged = { ...a, ...b }; function sum(...nums) {}'],
                        ['Template Literals', '`Hello ${name}, you are ${age} years old`'],
                        ['Optional Chaining', 'user?.address?.street // undefined thay vì crash'],
                        ['Nullish Coalescing', 'value ?? defaultValue // chỉ null/undefined mới fallback'],
                        ['ES Modules', 'import/export — static analysis, tree shaking'],
                    ].map(([title, desc]) => (
                        <div key={title} className="p-2 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                            <div className="text-blue-400 text-sm font-medium">{title}</div>
                            <div className="text-[var(--text-secondary)] text-xs font-mono mt-0.5">{desc}</div>
                        </div>
                    ))}
                </div>
                <a href="/blogs/ecmascript-features" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 Xem bài viết chi tiết →</a>
            </TopicModal>

            <TopicModal title="Type Coercion" emoji="🔀" color="#f97316" summary="== vs ===, truthy/falsy, implicit conversion traps">
                <Paragraph>JS tự động convert types khi so sánh với <InlineCode>==</InlineCode>. Đây là nguồn gốc nhiều bugs khó hiểu.</Paragraph>
                <CodeBlock title="Type coercion gotchas">{`// == (loose equality) — converts types
'' == false     // true!
0 == false      // true!
 null == undefined // true!
[] == false     // true!

// === (strict equality) — NO conversion
'' === false    // false
0 === false     // false

// Truthy / Falsy
// Falsy: false, 0, '', null, undefined, NaN
// Truthy: everything else (including [] and {}!)`}</CodeBlock>
                <Callout type="tip">Rule đơn giản: <Highlight>luôn dùng === </Highlight> trừ khi bạn CỐ Ý muốn type coercion (hiếm). Và hãy biết thuộc 6 falsy values.</Callout>
            </TopicModal>

            <TopicModal title="for vs while — Khi nào dùng?" emoji="🔄" color="#10b981" summary="for = biết trước số lần lặp, while = lặp đến khi điều kiện sai — pattern quan trọng trong DSA">
                <Paragraph><InlineCode>for</InlineCode> dùng khi <Highlight>biết trước</Highlight> số lần lặp. <InlineCode>while</InlineCode> dùng khi <Highlight>không biết trước</Highlight> khi nào dừng.</Paragraph>

                <Heading3>for — Khi biết trước số lần lặp</Heading3>
                <CodeBlock title="4 biến thể của for">{`// Duyệt mảng — biết rõ arr.length
for (let i = 0; i < arr.length; i++) { ... }

// Duyệt range cố định
for (let i = 0; i < n; i++) { ... }

// for...of — duyệt từng phần tử (Array, Map, Set, String)
for (const item of items) { ... }

// for...in — duyệt keys của object
for (const key in obj) { ... }`}</CodeBlock>

                <Heading3>while — Khi không biết trước khi nào dừng</Heading3>
                <CodeBlock title="5 use case phổ biến">{`// Two Pointers — dừng khi 2 con trỏ gặp nhau
while (left < right) { ... }

// BFS — dừng khi queue rỗng
while (queue.length > 0) { ... }

// Binary Search — dừng khi left vượt right
while (left <= right) { ... }

// Linked List — dừng khi hết node
while (node !== null) { ... }

// Regex match — dừng khi không còn match
while ((match = regex.exec(str)) !== null) { ... }`}</CodeBlock>

                <Heading3>Cheat Sheet nhanh</Heading3>
                <div className="my-3 overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="text-left p-3 text-slate-400 font-medium">Tình huống</th>
                                <th className="text-left p-3 text-blue-400 font-medium">Dùng</th>
                                <th className="text-left p-3 text-slate-400 font-medium">Lý do</th>
                            </tr>
                        </thead>
                        <tbody className="text-slate-300">
                            <tr className="border-b border-white/5"><td className="p-3">Duyệt mảng từ đầu đến cuối</td><td className="p-3"><InlineCode>for</InlineCode></td><td className="p-3">Biết trước length</td></tr>
                            <tr className="border-b border-white/5"><td className="p-3">Two Pointers</td><td className="p-3"><InlineCode>while</InlineCode></td><td className="p-3">Dừng khi left {'>'} = right</td></tr>
                            <tr className="border-b border-white/5"><td className="p-3">Sliding Window: right chạy</td><td className="p-3"><InlineCode>for</InlineCode></td><td className="p-3">right duyệt từ 0 → n</td></tr>
                            <tr className="border-b border-white/5"><td className="p-3">Sliding Window: left thu hẹp</td><td className="p-3"><InlineCode>while</InlineCode></td><td className="p-3">Không biết thu bao nhiêu</td></tr>
                            <tr className="border-b border-white/5"><td className="p-3">BFS / DFS iterative</td><td className="p-3"><InlineCode>while</InlineCode></td><td className="p-3">Không biết khi nào queue/stack rỗng</td></tr>
                            <tr className="border-b border-white/5"><td className="p-3">Binary Search</td><td className="p-3"><InlineCode>while</InlineCode></td><td className="p-3">Không biết bao nhiêu bước chia đôi</td></tr>
                            <tr><td className="p-3">Đọc file / stream</td><td className="p-3"><InlineCode>while</InlineCode></td><td className="p-3">Không biết khi nào hết data</td></tr>
                        </tbody>
                    </table>
                </div>

                <Heading3>Trong LeetCode patterns</Heading3>
                <CodeBlock title="Kết hợp for + while">{`// Sliding Window = for + while lồng nhau!
for (let right = 0; right < arr.length; right++) {  // for: mở rộng (biết trước n bước)
    while (/* invalid */) {                           // while: thu hẹp (không biết trước)
        left++
    }
}

// Monotonic Stack = for + while
for (let i = 0; i < arr.length; i++) {               // for: duyệt mảng
    while (stack.length && arr[stack.at(-1)] < arr[i]) { // while: pop cho đến khi hợp lệ
        stack.pop()
    }
}`}</CodeBlock>
                <Callout type="tip"><strong>Tóm lại:</strong> <InlineCode>for</InlineCode> = &quot;duyệt qua N phần tử&quot;, <InlineCode>while</InlineCode> = &quot;lặp cho đến khi điều kiện sai&quot;. Khi kết hợp cả hai (Sliding Window, Monotonic Stack), <InlineCode>for</InlineCode> quản lý vòng ngoài, <InlineCode>while</InlineCode> xử lý logic bên trong không biết trước số bước! 🎯</Callout>
            </TopicModal>

            <TopicModal title="Kiểu dữ liệu JS" emoji="📦" color="#06b6d4" summary="7 primitive + 1 reference — typeof, truthy/falsy, pass by value vs reference">
                <Paragraph>JavaScript có <Highlight>7 kiểu nguyên thủy</Highlight> (primitive) và <Highlight>1 kiểu tham chiếu</Highlight> (reference).</Paragraph>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">Primitive (lưu giá trị, so sánh bằng giá trị)</div>
                        <div className="text-slate-300 text-sm mt-1"><InlineCode>string</InlineCode>, <InlineCode>number</InlineCode>, <InlineCode>boolean</InlineCode>, <InlineCode>null</InlineCode>, <InlineCode>undefined</InlineCode>, <InlineCode>symbol</InlineCode>, <InlineCode>bigint</InlineCode></div>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">Reference (lưu con trỏ, so sánh bằng reference)</div>
                        <div className="text-slate-300 text-sm mt-1"><InlineCode>object</InlineCode> — bao gồm: Object, Array, Function, Date, Map, Set, RegExp...</div>
                    </div>
                </div>
                <CodeBlock title="typeof gotchas">{`typeof 'hello'     // 'string'
typeof 42          // 'number'
typeof true        // 'boolean'
typeof undefined   // 'undefined'
typeof null        // 'object' ← BUG lịch sử của JS!
typeof []          // 'object' ← Array cũng là object
typeof {}          // 'object'
typeof function(){} // 'function' ← trường hợp đặc biệt

// Cách kiểm tra chính xác:
Array.isArray([])           // true
obj === null                // kiểm tra null
obj instanceof Date         // kiểm tra Date
Object.prototype.toString.call(obj) // "[object Array]"`}</CodeBlock>
                <CodeBlock title="Pass by value vs reference">{`// Primitive → copy giá trị
let a = 5
let b = a
b = 10
console.log(a) // 5 — không bị ảnh hưởng!

// Reference → copy con trỏ (cùng trỏ đến 1 object)
let obj1 = { name: 'Khương' }
let obj2 = obj1
obj2.name = 'Changed'
console.log(obj1.name) // 'Changed' — bị ảnh hưởng!

// Fix: shallow copy
let obj3 = { ...obj1 }  // spread operator
let obj4 = Object.assign({}, obj1)`}</CodeBlock>
                <Callout type="tip">Interview tip: Giải thích được <Highlight>typeof null === &apos;object&apos;</Highlight> là bug lịch sử, và sự khác biệt giữa <InlineCode>==</InlineCode> vs <InlineCode>===</InlineCode> khi so sánh types sẽ ghi điểm lớn.</Callout>
                <a href="/blogs/data-types-structures" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 Xem bài viết chi tiết →</a>
            </TopicModal>

            <TopicModal title="Strict Mode" emoji="🔒" color="#ef4444" summary={`"use strict" — chế độ nghiêm ngặt giúp bắt lỗi sớm, code an toàn hơn`}>
                <Paragraph><InlineCode>{`"use strict"`}</InlineCode> kích hoạt chế độ thực thi nghiêm ngặt hơn, được giới thiệu từ <Highlight>ES5</Highlight>. Giúp bắt lỗi sớm và ngăn chặn các hành vi nguy hiểm.</Paragraph>
                <CodeBlock title="Cách kích hoạt">{`"use strict"; // Đầu file → áp dụng toàn bộ file

function myFunc() {
  "use strict"; // Hoặc chỉ trong 1 function
}

// ⚡ ES Modules (import/export) và class
// tự động chạy strict mode — không cần khai báo!`}</CodeBlock>
                <div className="my-3 overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead><tr className="border-b border-[var(--border-primary)]"><th className="text-left p-2 text-slate-400">Hành vi</th><th className="text-left p-2 text-red-400">Không strict</th><th className="text-left p-2 text-green-400">Strict mode</th></tr></thead>
                        <tbody className="text-[var(--text-secondary)]">
                            <tr className="border-b border-gray-100"><td className="p-2">Biến chưa khai báo</td><td className="p-2">Tự tạo global 😱</td><td className="p-2">❌ ReferenceError</td></tr>
                            <tr className="border-b border-gray-100"><td className="p-2">Gán vào read-only property</td><td className="p-2">Im lặng, bỏ qua</td><td className="p-2">❌ TypeError</td></tr>
                            <tr className="border-b border-gray-100"><td className="p-2">Duplicate params</td><td className="p-2">Cho phép</td><td className="p-2">❌ SyntaxError</td></tr>
                            <tr className="border-b border-gray-100"><td className="p-2"><InlineCode>this</InlineCode> trong function</td><td className="p-2">window</td><td className="p-2">undefined</td></tr>
                            <tr><td className="p-2">Dùng <InlineCode>with</InlineCode></td><td className="p-2">Cho phép</td><td className="p-2">❌ SyntaxError</td></tr>
                        </tbody>
                    </table>
                </div>
                <CodeBlock title="Ví dụ">{`"use strict";

x = 10; // ❌ ReferenceError — phải dùng let/const/var

function sum(a, a, b) {} // ❌ SyntaxError — duplicate params

function showThis() {
  console.log(this); // undefined (không strict → window)
}
showThis();

const obj = {};
Object.defineProperty(obj, "name", { value: "K", writable: false });
obj.name = "X"; // ❌ TypeError — read-only`}</CodeBlock>
                <Callout type="tip">Trong dự án React/Next.js hiện đại, code đã chạy <Highlight>strict mode sẵn</Highlight> vì dùng ES Modules. Nhưng hiểu strict mode vẫn rất quan trọng cho phỏng vấn!</Callout>
            </TopicModal>

            <TopicModal title="DOM Manipulation & Event Delegation" emoji="🌐" color="#f97316" summary="querySelector, event bubbling/capturing, delegation — nền tảng để hiểu React">
                <Paragraph>Hiểu <Highlight>DOM API gốc</Highlight> giúp bạn hiểu React hoạt động thế nào bên dưới — câu hỏi phổ biến ở mọi level.</Paragraph>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                        <div className="text-orange-400 font-bold text-sm">🔍 DOM Selection</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <InlineCode>getElementById</InlineCode> — nhanh nhất, 1 element<br />
                            • <InlineCode>querySelector / querySelectorAll</InlineCode> — CSS selector, flexible<br />
                            • <InlineCode>getElementsByClassName</InlineCode> — trả về <strong>live HTMLCollection</strong> (auto-update)<br />
                            • <InlineCode>querySelectorAll</InlineCode> trả về <strong>static NodeList</strong> (snapshot)
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">🫧 Event Bubbling vs Capturing</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <strong>Capturing</strong> (top → down): window → document → html → body → target<br />
                            • <strong>Bubbling</strong> (bottom → up): target → parent → ... → body → html → document<br />
                            • Default: bubbling. Capture: <InlineCode>addEventListener(event, fn, true)</InlineCode><br />
                            • <InlineCode>e.stopPropagation()</InlineCode> — dừng bubble/capture<br />
                            • <InlineCode>e.preventDefault()</InlineCode> — ngăn default action (form submit, link navigate)
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">🎯 Event Delegation</div>
                        <div className="text-slate-300 text-sm mt-1">
                            Thay vì gắn listener cho <strong>mỗi child</strong>, gắn 1 listener cho <strong>parent</strong>:<br />
                            • Performance: 1 listener thay vì 1000 (list items)<br />
                            • Dynamic elements: elements thêm sau vẫn được handle<br />
                            • Dùng <InlineCode>e.target</InlineCode> để biết element nào triggered event<br />
                            • React dùng delegation ở root — đó là <strong>Synthetic Events</strong>
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">🔧 DOM Manipulation</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <InlineCode>createElement + appendChild</InlineCode> — tạo và thêm element<br />
                            • <InlineCode>insertAdjacentHTML</InlineCode> — nhanh hơn innerHTML, vị trí cụ thể<br />
                            • <InlineCode>DocumentFragment</InlineCode> — batch DOM updates (tránh reflow)<br />
                            • <InlineCode>cloneNode(true)</InlineCode> — deep clone DOM subtree<br />
                            • <InlineCode>dataset</InlineCode> — đọc/ghi data-* attributes
                        </div>
                    </div>
                </div>
                <CodeBlock title="event-delegation.js">{`// ❌ Bad: 1000 listeners
document.querySelectorAll('li').forEach(li => {
  li.addEventListener('click', () => handleClick(li.dataset.id))
})

// ✅ Good: Event Delegation — 1 listener
document.querySelector('ul').addEventListener('click', (e) => {
  const li = e.target.closest('li') // find parent li
  if (!li) return                    // clicked outside li
  handleClick(li.dataset.id)
})

// DocumentFragment — batch DOM updates
const fragment = document.createDocumentFragment()
items.forEach(item => {
  const li = document.createElement('li')
  li.textContent = item.name
  fragment.appendChild(li) // NO reflow yet
})
list.appendChild(fragment) // 1 reflow only!`}</CodeBlock>
                <Callout type="tip">Interview: {'"Build a todo list without React"'} — phải dùng event delegation + DocumentFragment. Biết giải thích <Highlight>tại sao React dùng Synthetic Events</Highlight> → điểm cộng lớn.</Callout>
            </TopicModal>

            <TopicModal title="Web APIs — Observer Pattern" emoji="👁️" color="#06b6d4" summary="IntersectionObserver, MutationObserver, ResizeObserver — performance-friendly APIs">
                <Paragraph>Modern Web APIs dùng <Highlight>Observer pattern</Highlight> thay vì polling — quan trọng cho performance.</Paragraph>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                        <div className="text-cyan-400 font-bold text-sm">📐 IntersectionObserver</div>
                        <div className="text-slate-300 text-sm mt-1">
                            Detect khi element visible trong viewport (không cần scroll event!).<br />
                            • <strong>Lazy loading</strong> images: load khi scroll đến<br />
                            • <strong>Infinite scroll</strong>: load more khi sentinel element visible<br />
                            • <strong>Analytics</strong>: track impressions (ad, product card)<br />
                            • <strong>Animation</strong>: trigger animation khi scroll into view
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">🔬 MutationObserver</div>
                        <div className="text-slate-300 text-sm mt-1">
                            Watch for DOM changes (attributes, children, text content).<br />
                            • Detect DOM changes từ third-party scripts<br />
                            • Auto-process dynamically added elements<br />
                            • Build custom element behaviors
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">📏 ResizeObserver</div>
                        <div className="text-slate-300 text-sm mt-1">
                            Detect element size changes (không cần window resize event!).<br />
                            • Responsive components based on <strong>element size</strong> (not viewport)<br />
                            • Container queries polyfill<br />
                            • Auto-resize textarea, chart, canvas
                        </div>
                    </div>
                </div>
                <CodeBlock title="observers.ts">{`// IntersectionObserver — Lazy loading + Infinite scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target as HTMLImageElement
      img.src = img.dataset.src!  // load real image
      observer.unobserve(img)     // stop observing
    }
  })
}, { threshold: 0.1, rootMargin: '200px' }) // preload 200px before visible

document.querySelectorAll('img[data-src]').forEach(img => observer.observe(img))

// React hook: useIntersectionObserver
function useIntersectionObserver(ref, options) {
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting)
    }, options)
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref, options])
  return isVisible
}`}</CodeBlock>
                <Callout type="tip">Interview: {'"Build infinite scroll"'} hoặc {'"Build lazy loading images"'} — dùng IntersectionObserver, <Highlight>không dùng scroll event + getBoundingClientRect</Highlight> (performance kém).</Callout>
            </TopicModal>

            <TopicModal title="Generators & Iterators" emoji="🔁" color="#a78bfa" summary="function*, yield, Symbol.iterator — lazy evaluation và custom iteration">
                <Paragraph><Highlight>Generators</Highlight> = function có thể pause/resume. Ít dùng trực tiếp nhưng nền tảng của async/await và Redux-Saga.</Paragraph>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">🔄 Iterator Protocol</div>
                        <div className="text-slate-300 text-sm mt-1">
                            Object có method <InlineCode>next()</InlineCode> trả về <InlineCode>{'{value, done}'}</InlineCode>.<br />
                            • for...of loop dùng iterator protocol bên dưới<br />
                            • Array, Map, Set, String đều implement <InlineCode>Symbol.iterator</InlineCode><br />
                            • Custom iterable: implement <InlineCode>[Symbol.iterator]()</InlineCode>
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">⏸️ Generator Function</div>
                        <div className="text-slate-300 text-sm mt-1">
                            <InlineCode>function*</InlineCode> + <InlineCode>yield</InlineCode> — pause execution, return value, resume later.<br />
                            • <strong>Lazy evaluation</strong>: chỉ compute khi cần<br />
                            • <strong>Infinite sequences</strong>: generate values on-demand<br />
                            • <strong>async/await</strong> chính là syntactic sugar của generators
                        </div>
                    </div>
                </div>
                <CodeBlock title="generators.ts">{`// Generator function
function* fibonacci() {
  let [a, b] = [0, 1]
  while (true) {
    yield a         // pause here, return a
    ;[a, b] = [b, a + b]
  }
}
const fib = fibonacci()
fib.next() // { value: 0, done: false }
fib.next() // { value: 1, done: false }
fib.next() // { value: 1, done: false }
fib.next() // { value: 2, done: false }

// Practical: Paginated API fetch
async function* fetchPages(url) {
  let page = 1
  while (true) {
    const res = await fetch(\`\${url}?page=\${page}\`)
    const data = await res.json()
    if (data.items.length === 0) return // done
    yield data.items
    page++
  }
}
// Usage: for await (const items of fetchPages('/api/users')) { ... }

// Custom iterable
class Range {
  constructor(private start: number, private end: number) {}
  *[Symbol.iterator]() {
    for (let i = this.start; i <= this.end; i++) yield i
  }
}
for (const n of new Range(1, 5)) console.log(n) // 1, 2, 3, 4, 5`}</CodeBlock>
                <Callout type="tip">Interview: hiểu generators giúp trả lời {'"How does async/await work under the hood?"'} — async function = generator + Promise auto-runner.</Callout>
            </TopicModal>

            <TopicModal title="Error Handling Patterns" emoji="🚨" color="#ef4444" summary="try/catch, custom errors, error boundaries, global handlers — production-ready error handling">
                <Paragraph>Production code <Highlight>phải handle errors gracefully</Highlight> — crash = mất user. Interview hay hỏi các patterns xử lý lỗi.</Paragraph>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <div className="text-red-400 font-bold text-sm">🎯 Error Types</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <strong>SyntaxError</strong>: code sai cú pháp (parse time)<br />
                            • <strong>ReferenceError</strong>: variable chưa khai báo<br />
                            • <strong>TypeError</strong>: gọi method trên null/undefined<br />
                            • <strong>RangeError</strong>: value ngoài range cho phép<br />
                            • <strong>Custom Error</strong>: extend Error class cho business logic
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="text-yellow-400 font-bold text-sm">🔄 Async Error Handling</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <strong>try/catch</strong>: wrap async/await<br />
                            • <strong>.catch()</strong>: chain on promises<br />
                            • <strong>Promise.allSettled()</strong>: không fail khi 1 promise reject<br />
                            • ⚠️ <strong>Unhandled rejection</strong>: process crash (Node.js)!
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">⚛️ React Error Handling</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <strong>Error Boundary</strong>: catch render errors (class component only)<br />
                            • <strong>Suspense</strong>: loading states cho async components<br />
                            • <strong>react-error-boundary</strong>: HOC/hook API cho error boundaries<br />
                            • ⚠️ Error Boundary <strong>không catch</strong>: event handlers, async code, SSR
                        </div>
                    </div>
                </div>
                <CodeBlock title="error-handling.ts">{`// Custom Error class
class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

// Pattern: Result type (no try/catch needed)
type Result<T> = { ok: true; data: T } | { ok: false; error: Error }

async function safeFetch<T>(url: string): Promise<Result<T>> {
  try {
    const res = await fetch(url)
    if (!res.ok) throw new ApiError(res.status, res.statusText)
    return { ok: true, data: await res.json() }
  } catch (error) {
    return { ok: false, error: error as Error }
  }
}

// Usage — no try/catch needed
const result = await safeFetch<User[]>('/api/users')
if (result.ok) {
  console.log(result.data) // TypeScript knows it's User[]
} else {
  console.error(result.error.message)
}

// Global error handlers
window.addEventListener('error', (e) => {
  reportToSentry(e.error)       // JS errors
})
window.addEventListener('unhandledrejection', (e) => {
  reportToSentry(e.reason)      // Unhandled promise rejections
})`}</CodeBlock>
                <Callout type="tip">Interview: nhắc đến <Highlight>Result type pattern</Highlight> (Go/Rust style) thay vì try/catch everywhere → shows engineering maturity. Biết Error Boundary limitations → senior level.</Callout>
            </TopicModal>

            <TopicModal title="Web Workers & Service Workers" emoji="⚙️" color="#10b981" summary="Multi-threading trong browser, offline capability, background sync">
                <Paragraph>Browser chạy JS trên <Highlight>main thread</Highlight> — heavy computation block UI. Web Workers giải quyết vấn đề này.</Paragraph>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">🧵 Web Workers</div>
                        <div className="text-slate-300 text-sm mt-1">
                            Run JS trong <strong>background thread</strong> — không block UI.<br />
                            • Communicate via <InlineCode>postMessage()</InlineCode> (structured clone)<br />
                            • <strong>Không access</strong>: DOM, window, document<br />
                            • Use cases: image processing, crypto, parsing large JSON/CSV<br />
                            • <strong>SharedWorker</strong>: share 1 worker between tabs
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">📡 Service Workers</div>
                        <div className="text-slate-300 text-sm mt-1">
                            Proxy giữa browser và network — <strong>offline capability</strong>.<br />
                            • <strong>Cache API</strong>: cache responses cho offline access<br />
                            • <strong>Push notifications</strong>: receive messages khi app closed<br />
                            • <strong>Background sync</strong>: retry failed requests khi online lại<br />
                            • PWA (Progressive Web App) yêu cầu service worker
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">🆕 Các Web APIs quan trọng khác</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <strong>requestAnimationFrame</strong>: smooth 60fps animations (thay vì setInterval)<br />
                            • <strong>requestIdleCallback</strong>: defer non-critical work khi main thread free<br />
                            • <strong>AbortController</strong>: cancel fetch requests (race conditions)<br />
                            • <strong>Broadcast Channel</strong>: communicate giữa tabs/windows
                        </div>
                    </div>
                </div>
                <CodeBlock title="web-workers.ts">{`// Web Worker — heavy computation off main thread
// worker.ts
self.onmessage = (e: MessageEvent) => {
  const { data } = e
  // Heavy computation here (doesn't block UI!)
  const result = data.sort((a, b) => a - b) // sort 1M items
  self.postMessage(result)
}

// main.ts
const worker = new Worker(new URL('./worker.ts', import.meta.url))
worker.postMessage(hugeArray)
worker.onmessage = (e) => {
  console.log('Sorted:', e.data) // received from worker
}

// AbortController — cancel fetch (prevent race conditions)
const controller = new AbortController()
fetch('/api/search?q=hello', { signal: controller.signal })
  .then(res => res.json())
  .then(data => setResults(data))
  .catch(err => {
    if (err.name === 'AbortError') return // cancelled, ignore
    throw err
  })
// Later: cancel the request
controller.abort()

// requestAnimationFrame — smooth animations
function animate() {
  element.style.transform = \`translateX(\${x}px)\`
  x += 2
  if (x < 500) requestAnimationFrame(animate) // next frame
}
requestAnimationFrame(animate) // 60fps!`}</CodeBlock>
                <Callout type="tip">Interview: {'"The page is janky when sorting a large list"'} → <Highlight>Web Worker</Highlight> cho sort. {'"Cancel previous search request khi user type tiếp"'} → AbortController.</Callout>
            </TopicModal>

            <TopicModal title="WeakMap, WeakRef & FinalizationRegistry" emoji="🧹" color="#8b5cf6" summary="Memory management, garbage collection awareness — senior-level interview topic">
                <Paragraph><Highlight>WeakMap/WeakRef</Highlight> cho phép reference object mà không ngăn garbage collection — quan trọng cho memory management.</Paragraph>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">🗺️ WeakMap vs Map</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <strong>Map</strong>: keys có thể là bất kỳ type. <strong>Giữ reference</strong> → prevents GC<br />
                            • <strong>WeakMap</strong>: keys <strong>phải là object</strong>. Weak reference → <strong>cho phép GC</strong><br />
                            • WeakMap <strong>không iterable</strong> (no size, no forEach, no keys/values)<br />
                            • Use case: cache metadata cho DOM elements, private data cho classes
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">👻 WeakRef & FinalizationRegistry</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <strong>WeakRef</strong>: tham chiếu yếu — <InlineCode>ref.deref()</InlineCode> có thể trả về undefined<br />
                            • <strong>FinalizationRegistry</strong>: callback khi object bị GC<br />
                            • Use case: cache expensive objects mà không leak memory<br />
                            • ⚠️ Rất ít khi dùng trực tiếp — nhưng hiểu = senior mindset
                        </div>
                    </div>
                </div>
                <CodeBlock title="weak-references.ts">{`// WeakMap — private data for classes
const privateData = new WeakMap()
class User {
  constructor(name: string, ssn: string) {
    this.name = name
    privateData.set(this, { ssn }) // truly private!
  }
  name: string
  getSSN() { return privateData.get(this)?.ssn }
}
// When user is GC'd, privateData entry is also GC'd

// WeakMap — cache DOM element metadata
const elementCache = new WeakMap<HTMLElement, object>()
function getMetadata(el: HTMLElement) {
  if (!elementCache.has(el)) {
    elementCache.set(el, computeExpensiveMetadata(el))
  }
  return elementCache.get(el)!
  // When element is removed from DOM & GC'd → cache auto-cleaned!
}

// WeakRef — optional cache
class Cache<T> {
  private cache = new Map<string, WeakRef<T & object>>()
  set(key: string, value: T & object) {
    this.cache.set(key, new WeakRef(value))
  }
  get(key: string): T | undefined {
    return this.cache.get(key)?.deref() // might be GC'd!
  }
}`}</CodeBlock>
                <Callout type="tip">Interview: Khi được hỏi về <Highlight>memory leaks</Highlight> → nhắc tới WeakMap/WeakRef. Biết giải thích tại sao Map giữ reference ngăn GC → senior level answer.</Callout>
            </TopicModal>
        </div>

        <Heading3>2.2 Implement từ scratch (click xem code mẫu)</Heading3>
        <a href="/blogs/js-common-functions" target="_blank" rel="noopener noreferrer" className="mb-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 Xem tổng hợp JS Common Functions →</a>
        <div className="my-4 space-y-2">
            <TopicModal title="Array.map / filter / reduce" emoji="💻" color="#fbbf24" summary="Implement lại 3 higher-order functions phổ biến nhất của Array">
                <Heading3>📖 Cách dùng</Heading3>
                <CodeBlock title="map / filter / reduce — cách dùng thực tế">{`// map: biến đổi từng phần tử → mảng mới cùng độ dài
const prices = [100, 200, 300]
const withTax = prices.map(p => p * 1.1)  // [110, 220, 330]

// filter: lọc phần tử theo điều kiện → mảng ngắn hơn
const expensive = prices.filter(p => p > 150)  // [200, 300]

// reduce: gom tất cả → 1 giá trị duy nhất
const total = prices.reduce((sum, p) => sum + p, 0)  // 600

// 🔗 Combo đỉnh: filter → map → reduce
const result = products
    .filter(p => p.inStock)       // lọc hàng còn
    .map(p => p.price * p.qty)    // tính tiền từng món
    .reduce((sum, x) => sum + x, 0) // tổng tiền`}</CodeBlock>

                <Heading3>🔧 Cách build (Implement lại)</Heading3>
                <CodeBlock title="myMap">{`Array.prototype.myMap = function(callback) {
    const result = [];
    for (let i = 0; i < this.length; i++) {
        result.push(callback(this[i], i, this));
    }
    return result;
};
// [1,2,3].myMap(x => x * 2) → [2,4,6]`}</CodeBlock>
                <CodeBlock title="myFilter">{`Array.prototype.myFilter = function(callback) {
    const result = [];
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) {
            result.push(this[i]);
        }
    }
    return result;
};`}</CodeBlock>
                <CodeBlock title="myReduce">{`Array.prototype.myReduce = function(callback, initialValue) {
    let acc = initialValue !== undefined ? initialValue : this[0];
    const startIdx = initialValue !== undefined ? 0 : 1;
    for (let i = startIdx; i < this.length; i++) {
        acc = callback(acc, this[i], i, this);
    }
    return acc;
};
// [1,2,3].myReduce((sum, x) => sum + x, 0) → 6`}</CodeBlock>
                <Callout type="tip">Nhớ xử lý edge case: <InlineCode>reduce</InlineCode> không có initialValue thì dùng <InlineCode>this[0]</InlineCode> và bắt đầu từ index 1.</Callout>

                <Heading3>🏭 Mẹo nhớ reduce: Máy ép trái cây</Heading3>
                <Paragraph>Tưởng tượng <Highlight>reduce = máy ép trái cây</Highlight>: 🍊🍊🍊 → 🧃</Paragraph>
                <Paragraph><InlineCode>[🍊, 🍊, 🍊, 🍊] → reduce → 🧃 (1 ly nước ép)</InlineCode></Paragraph>

                <div className="my-4 overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead><tr className="border-b border-[var(--border-primary)] text-left">
                            <th className="p-2 text-[#fbbf24] font-bold">ACIV</th><th className="p-2">Là gì</th><th className="p-2">Hình ảnh</th>
                        </tr></thead>
                        <tbody>
                            <tr className="border-b border-gray-100"><td className="p-2 font-bold">A — Accumulator</td><td className="p-2">Bình chứa (kết quả tích lũy)</td><td className="p-2">🧃 Ly nước đang đổ dần</td></tr>
                            <tr className="border-b border-gray-100"><td className="p-2 font-bold">C — Current Item</td><td className="p-2">Trái cây đang ép</td><td className="p-2">🍊 Quả cam hiện tại</td></tr>
                            <tr className="border-b border-gray-100"><td className="p-2 font-bold">I — Initial Value</td><td className="p-2">Ly ban đầu (rỗng hoặc có sẵn)</td><td className="p-2">🥤 Ly rỗng</td></tr>
                            <tr><td className="p-2 font-bold">V — (return) Value</td><td className="p-2">Kết quả trả về = accumulator mới</td><td className="p-2">🧃 Ly sau khi thêm nước</td></tr>
                        </tbody>
                    </table>
                </div>

                <CodeBlock title="Ví dụ từ dễ → khó">{`// 1️⃣ Tổng — ly nước tăng dần
[1, 2, 3, 4].reduce((ly, cam) => ly + cam, 0)
//  ly=0, cam=1 → 1 → ly=1, cam=2 → 3 → ly=3, cam=3 → 6 → ly=6, cam=4 → 10 ✅

// 2️⃣ Đếm tần suất — cho trái cây vào các ngăn
['🍎','🍊','🍎','🍊','🍎'].reduce((ngăn, trái) => {
    ngăn[trái] = (ngăn[trái] || 0) + 1
    return ngăn
}, {})  // → { '🍎': 3, '🍊': 2 }

// 3️⃣ Flatten — mở hộp lồng nhau
[[1,2], [3,4], [5]].reduce((kq, hộp) => [...kq, ...hộp], [])
// → [1, 2, 3, 4, 5]

// 4️⃣ Pipeline — nước chảy qua nhiều bộ lọc
const pipeline = [addTax, applyDiscount, roundPrice]
pipeline.reduce((price, fn) => fn(price), 100)
// 100 → addTax → 110 → applyDiscount → 99 → roundPrice → 99.00`}</CodeBlock>

                <Callout type="info">reduce = &quot;nhiều → một&quot;: Mảng số → 1 tổng, mảng string → 1 object đếm, mảng mảng → 1 mảng phẳng, mảng functions → 1 kết quả. Nếu cần biến mảng thành 1 thứ gì đó → dùng reduce!</Callout>
            </TopicModal>

            <TopicModal title="Function.bind / call / apply" emoji="💻" color="#fbbf24" summary="Implement lại 3 methods thay đổi this context">
                <Heading3>Cách dùng</Heading3>
                <CodeBlock title="bind / call / apply — 3 cách thay đổi this">{`const user = { name: 'An' }
function greet(greeting, punctuation) {
    return greeting + ', ' + this.name + punctuation
}

// call — gọi NGAY, truyền args riêng lẻ
greet.call(user, 'Hi', '!')         // 'Hi, An!'

// apply — gọi NGAY, truyền args dạng ARRAY
greet.apply(user, ['Hi', '!'])      // 'Hi, An!'

// bind — TRẢ VỀ function mới, KHÔNG gọi ngay
const boundGreet = greet.bind(user, 'Hi')
boundGreet('!')                     // 'Hi, An!'

// 💡 Mẹo nhớ:
// call  = C = Comma (phẩy)   → args phân cách bằng dấu phẩy
// apply = A = Array           → args truyền dạng mảng
// bind  = B = Bind (trói lại) → trả về function mới`}</CodeBlock>

                <Heading3>Cách build từ scratch</Heading3>
                <CodeBlock title="myBind">{`Function.prototype.myBind = function(context, ...args) {
    const fn = this;
    return function(...newArgs) {
        return fn.apply(context, [...args, ...newArgs]);
    };
};

// Ví dụ:
const obj = { name: 'An' };
function greet(greeting) { return greeting + ', ' + this.name; }
const bound = greet.myBind(obj, 'Hello');
bound(); // "Hello, An"`}</CodeBlock>
                <CodeBlock title="myCall & myApply">{`Function.prototype.myCall = function(context, ...args) {
    context = context || globalThis;
    const sym = Symbol(); // unique key tránh conflict
    context[sym] = this;
    const result = context[sym](...args);
    delete context[sym];
    return result;
};

Function.prototype.myApply = function(context, args = []) {
    return this.myCall(context, ...args);
};`}</CodeBlock>
                <Callout type="warning">Trick: dùng <InlineCode>Symbol()</InlineCode> làm key tạm trên object để tránh đè property có sẵn.</Callout>
            </TopicModal>

            <TopicModal title="Promise & Promise.all" emoji="💻" color="#fbbf24" summary="Implement Promise từ scratch — câu hỏi kinh điển nhất">
                <Heading3>Cách dùng</Heading3>
                <CodeBlock title="Promise cơ bản">{`// Tạo Promise
const promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve('Done!'), 1000)
})

// Xử lý kết quả
promise
    .then(result => console.log(result))   // 'Done!'
    .catch(error => console.error(error))  // Nếu reject
    .finally(() => console.log('Cleanup')) // Luôn chạy

// Promise.all — chờ TẤT CẢ xong
const [users, posts] = await Promise.all([
    fetch('/api/users').then(r => r.json()),
    fetch('/api/posts').then(r => r.json()),
])
// 1 fail → TẤT CẢ fail!

// Promise.allSettled — chờ tất cả, KHÔNG fail
const results = await Promise.allSettled([p1, p2, p3])
// [{status:'fulfilled', value:...}, {status:'rejected', reason:...}]`}</CodeBlock>

                <Heading3>Cách build từ scratch</Heading3>
                <CodeBlock title="MyPromise (simplified)">{`class MyPromise {
    constructor(executor) {
        this.state = 'pending';
        this.value = undefined;
        this.callbacks = [];

        const resolve = (value) => {
            if (this.state !== 'pending') return;
            this.state = 'fulfilled';
            this.value = value;
            this.callbacks.forEach(cb => cb.onFulfilled(value));
        };
        const reject = (reason) => {
            if (this.state !== 'pending') return;
            this.state = 'rejected';
            this.value = reason;
            this.callbacks.forEach(cb => cb.onRejected(reason));
        };
        try { executor(resolve, reject); }
        catch (e) { reject(e); }
    }

    then(onFulfilled, onRejected) {
        return new MyPromise((resolve, reject) => {
            const handle = () => {
                try {
                    if (this.state === 'fulfilled') {
                        resolve(onFulfilled ? onFulfilled(this.value) : this.value);
                    } else {
                        onRejected ? resolve(onRejected(this.value)) : reject(this.value);
                    }
                } catch (e) { reject(e); }
            };
            if (this.state === 'pending') {
                this.callbacks.push({ onFulfilled: () => handle(), onRejected: () => handle() });
            } else { queueMicrotask(handle); }
        });
    }
}`}</CodeBlock>
                <CodeBlock title="Promise.myAll">{`MyPromise.all = function(promises) {
    return new MyPromise((resolve, reject) => {
        const results = [];
        let count = 0;
        promises.forEach((p, i) => {
            MyPromise.resolve(p).then(val => {
                results[i] = val;
                if (++count === promises.length) resolve(results);
            }, reject); // 1 fail → reject tất cả
        });
        if (promises.length === 0) resolve([]);
    });
};`}</CodeBlock>
            </TopicModal>

            <TopicModal title="Debounce & Throttle" emoji="💻" color="#fbbf24" summary="2 kỹ thuật kiểm soát tần suất gọi function — interview hỏi rất nhiều">
                <Heading3>Cách dùng</Heading3>
                <CodeBlock title="Khi nào dùng Debounce vs Throttle">{`// DEBOUNCE — chờ user NGỪNG hành động, mới chạy
// Ví dụ: search input, resize window, auto-save
const searchInput = document.querySelector('#search')
searchInput.addEventListener('input', 
    debounce((e) => fetchResults(e.target.value), 300)
)
// User gõ: h...e...l...l...o → chỉ gọi API 1 lần sau 300ms ngừng gõ

// THROTTLE — chạy TỐI ĐA 1 lần / khoảng thời gian
// Ví dụ: scroll, mousemove, game loop
window.addEventListener('scroll',
    throttle(() => updateScrollProgress(), 100)
)
// User scroll liên tục → chỉ chạy mỗi 100ms, không phải mỗi pixel

// 💡 Mẹo nhớ:
// Debounce = Thang máy 🛗  → chờ hết người vào mới đóng cửa
// Throttle = Nhịp tim  💓  → đều đặn, không nhanh hơn tần suất đã set`}</CodeBlock>

                <Heading3>Cách build từ scratch</Heading3>
                <CodeBlock title="debounce — chờ user ngừng, mới chạy">{`function debounce(fn, delay) {
    let timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}

// Ví dụ: search input — chỉ gọi API sau khi user ngừng gõ 300ms
const search = debounce((query) => fetch(\`/api?q=\${query}\`), 300);
input.addEventListener('input', (e) => search(e.target.value));`}</CodeBlock>
                <CodeBlock title="throttle — chạy tối đa 1 lần / interval">{`function throttle(fn, interval) {
    let lastTime = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastTime >= interval) {
            lastTime = now;
            fn.apply(this, args);
        }
    };
}

// Ví dụ: scroll handler — tối đa 1 lần/100ms
window.addEventListener('scroll', throttle(handleScroll, 100));`}</CodeBlock>
                <Callout type="tip"><strong>Debounce</strong> = gõ search, resize window. <strong>Throttle</strong> = scroll, mousemove. Nhớ cả 2 đều return <strong>function mới</strong>.</Callout>
            </TopicModal>

            <TopicModal title="Deep clone / Deep equal" emoji="💻" color="#fbbf24" summary="So sánh và copy object lồng nhau — phân biệt shallow vs deep">
                <Heading3>Cách dùng</Heading3>
                <CodeBlock title="3 cách clone có sẵn trong JS">{`const obj = { a: { b: 1 }, c: [2, 3] }

// 1️⃣ Shallow copy — CHỈ copy layer 1 (nested vẫn share reference!)
const shallow1 = { ...obj }           // spread
const shallow2 = Object.assign({}, obj) // assign
shallow1.a.b = 999
console.log(obj.a.b) // 999 — BỊ ẢNH HƯỞNG! ❌

// 2️⃣ JSON trick — deep nhưng MẤT function, Date, undefined, circular
const jsonClone = JSON.parse(JSON.stringify(obj))
// ⚠️ Không hỗ trợ: Function, Date, RegExp, Map, Set, undefined

// 3️⃣ structuredClone — CÁCH TỐT NHẤT (ES2022)
const deep = structuredClone(obj)
deep.a.b = 999
console.log(obj.a.b) // 1 — KHÔNG bị ảnh hưởng! ✅
// ✅ Hỗ trợ: Date, RegExp, Map, Set, ArrayBuffer, circular ref
// ❌ Không hỗ trợ: Function, DOM nodes`}</CodeBlock>

                <Heading3>Cách build từ scratch</Heading3>
                <CodeBlock title="deepClone">{`function deepClone(obj, seen = new WeakMap()) {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj);
    if (obj instanceof RegExp) return new RegExp(obj);
    if (seen.has(obj)) return seen.get(obj); // Circular reference!

    const clone = Array.isArray(obj) ? [] : {};
    seen.set(obj, clone);
    for (const key of Object.keys(obj)) {
        clone[key] = deepClone(obj[key], seen);
    }
    return clone;
}`}</CodeBlock>
                <CodeBlock title="deepEqual">{`function deepEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (typeof a !== typeof b) return false;
    if (typeof a !== 'object') return false;

    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;

    return keysA.every(key => deepEqual(a[key], b[key]));
}
// deepEqual({a: {b: 1}}, {a: {b: 1}}) → true`}</CodeBlock>
                <Callout type="warning">Edge case quan trọng: <Highlight>circular reference</Highlight> — dùng WeakMap để track objects đã clone. Nhiều candidate quên cái này!</Callout>
            </TopicModal>

            <TopicModal title="Event Emitter (pub/sub)" emoji="💻" color="#fbbf24" summary="Pattern cốt lõi của Node.js, React, và mọi event system">
                <CodeBlock title="EventEmitter">{`class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(event, listener) {
        if (!this.events[event]) this.events[event] = [];
        this.events[event].push(listener);
        return this; // chainable
    }

    off(event, listener) {
        if (!this.events[event]) return;
        this.events[event] = this.events[event]
            .filter(fn => fn !== listener);
        return this;
    }

    emit(event, ...args) {
        if (!this.events[event]) return false;
        this.events[event].forEach(fn => fn(...args));
        return true;
    }

    once(event, listener) {
        const wrapper = (...args) => {
            listener(...args);
            this.off(event, wrapper);
        };
        return this.on(event, wrapper);
    }
}

// Sử dụng:
const bus = new EventEmitter();
bus.on('message', (text) => console.log(text));
bus.emit('message', 'Hello!'); // "Hello!"`}</CodeBlock>
            </TopicModal>

            <TopicModal title="Curry function" emoji="💻" color="#fbbf24" summary="Transform f(a,b,c) thành f(a)(b)(c) — functional programming pattern">
                <CodeBlock title="curry">{`function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        }
        return function(...moreArgs) {
            return curried.apply(this, [...args, ...moreArgs]);
        };
    };
}

// Ví dụ:
const add = curry((a, b, c) => a + b + c);
add(1)(2)(3);     // 6
add(1, 2)(3);     // 6  — partial application
add(1)(2, 3);     // 6
add(1, 2, 3);     // 6

// Ứng dụng thực tế:
const log = curry((level, time, msg) =>
    console.log(\`[\${level}] \${time}: \${msg}\`)
);
const errorLog = log('ERROR');
const errorNow = errorLog(new Date().toISOString());
errorNow('Database down!');`}</CodeBlock>
                <Callout type="tip">Key: so sánh <InlineCode>args.length</InlineCode> với <InlineCode>fn.length</InlineCode> (số params function cần). Đủ thì gọi, thiếu thì trả function mới.</Callout>
            </TopicModal>

            <TopicModal title="Flatten array / object" emoji="💻" color="#fbbf24" summary="Làm phẳng array/object lồng nhau — câu hỏi hay gặp ở Google, Meta">
                <Heading3>Cách dùng</Heading3>
                <CodeBlock title="Flatten có sẵn trong JS">{`// Array.flat() — built-in từ ES2019
[1, [2, [3, [4]]]].flat()       // [1, 2, [3, [4]]]  — mặc định depth=1
[1, [2, [3, [4]]]].flat(2)      // [1, 2, 3, [4]]    — depth=2
[1, [2, [3, [4]]]].flat(Infinity) // [1, 2, 3, 4]    — flatten hết!

// Trick: dùng flatMap để vừa map vừa flatten 1 level
['Hello World', 'Foo Bar'].flatMap(s => s.split(' '))
// → ['Hello', 'World', 'Foo', 'Bar']

// Object.entries + reduce — flatten object thủ công
const nested = { a: { b: 1 }, c: 2 }
// Muốn → { 'a.b': 1, 'c': 2 } → cần tự build (xem bên dưới)`}</CodeBlock>

                <Heading3>Cách build từ scratch</Heading3>
                <CodeBlock title="flattenArray">{`// Flatten nested array
function flattenArray(arr, depth = Infinity) {
    const result = [];
    for (const item of arr) {
        if (Array.isArray(item) && depth > 0) {
            result.push(...flattenArray(item, depth - 1));
        } else {
            result.push(item);
        }
    }
    return result;
}

flattenArray([1, [2, [3, [4]]]])     // [1, 2, 3, 4]
flattenArray([1, [2, [3, [4]]]], 1)  // [1, 2, [3, [4]]]`}</CodeBlock>
                <CodeBlock title="flattenObject">{`// Flatten nested object with dot notation
function flattenObject(obj, prefix = '', result = {}) {
    for (const [key, value] of Object.entries(obj)) {
        const newKey = prefix ? \`\${prefix}.\${key}\` : key;
        if (value && typeof value === 'object' && !Array.isArray(value)) {
            flattenObject(value, newKey, result);
        } else {
            result[newKey] = value;
        }
    }
    return result;
}

flattenObject({ a: { b: { c: 1 }, d: 2 } })
// → { 'a.b.c': 1, 'a.d': 2 }`}</CodeBlock>
            </TopicModal>
        </div>

        <Heading3>2.3 Tài liệu</Heading3>
        <div className="my-4 space-y-2">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-yellow-400">📕</span>
                <div className="text-slate-300 text-sm">
                    <strong>You Don&apos;t Know JS</strong> (Kyle Simpson) — đọc hết series này sẽ hiểu JS cực sâu
                </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-yellow-400">📗</span>
                <div className="text-slate-300 text-sm">
                    <strong>javascript.info</strong> — tài liệu online tốt nhất, có ví dụ + bài tập
                </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-yellow-400">📘</span>
                <div className="text-slate-300 text-sm">
                    <strong>GreatFrontEnd.com</strong> — platform luyện frontend interview, có mock interview
                </div>
            </div>
        </div>

        <Callout type="warning">
            Big tech <Highlight>rất hay hỏi implement từ scratch</Highlight>: &quot;Code lại Promise.all&quot;,
            &quot;Viết debounce không dùng lodash&quot;. Nếu bạn chỉ dùng API mà không hiểu bên trong, sẽ fail vòng này.
        </Callout>

        <Heading3>2.4 Câu hỏi phỏng vấn nhanh (VN Style)</Heading3>
        <Paragraph>
            Phỏng vấn ở Việt Nam thường hỏi <Highlight>câu hỏi lý thuyết ngắn</Highlight> để đánh giá nhanh kiến thức.
            Dưới đây là những câu <Highlight>hay gặp nhất</Highlight> — phải trả lời được ngay lập tức.
        </Paragraph>

        <div className="my-4 space-y-2">
            <TopicModal title="JS Cơ bản — 15 câu hỏi kinh điển" emoji="⚡" color="#fbbf24" summary="var/let/const, hoisting, truthy/falsy, == vs === — câu nào cũng gặp ở VN interview">
                <div className="my-3 space-y-3">
                    {[
                        ['Q: var, let, const khác nhau thế nào?', 'var: function-scoped, hoisted (undefined), re-declare OK.\nlet: block-scoped, hoisted (TDZ), re-assign OK.\nconst: block-scoped, hoisted (TDZ), không re-assign (nhưng object/array bên trong vẫn mutable!).'],
                        ['Q: Hoisting là gì? Cho ví dụ.', 'Hoisting: JS đưa khai báo lên đầu scope trước khi chạy.\nvar → hoisted, giá trị = undefined.\nlet/const → hoisted nhưng trong TDZ (Temporal Dead Zone) → ReferenceError nếu access trước khai báo.\nfunction declaration → hoisted toàn bộ (cả body).'],
                        ['Q: == vs === khác gì?', '== (loose): so sánh có type coercion (1 == "1" → true).\n=== (strict): so sánh không coercion, cả value + type (1 === "1" → false).\n→ Luôn dùng === trừ khi cần check null/undefined (x == null).'],
                        ['Q: null vs undefined?', 'undefined: biến khai báo nhưng chưa gán giá trị, hoặc function không return.\nnull: gán rõ ràng = "không có giá trị".\ntypeof null === "object" (bug lịch sử của JS).\nnull == undefined → true, null === undefined → false.'],
                        ['Q: Closure là gì? Cho ví dụ thực tế.', 'Closure: function "nhớ" biến của scope bên ngoài ngay cả khi scope đó đã kết thúc.\nVí dụ thực tế: debounce, throttle, module pattern, React hooks (useState bên trong là closure).'],
                        ['Q: Arrow function khác regular function thế nào?', '1. Không có this riêng — inherit từ parent scope.\n2. Không có arguments object.\n3. Không thể dùng làm constructor (new).\n4. Không thể dùng làm generator (function*).\n→ Trong React: luôn dùng arrow function cho event handlers.'],
                        ['Q: Truthy / falsy values?', 'Falsy (6 giá trị): false, 0, "" (empty string), null, undefined, NaN.\nTất cả giá trị khác đều truthy (kể cả [], {}, "0", "false").'],
                        ['Q: Giải thích call stack và event loop.', 'Call stack: LIFO, chạy synchronous code.\nWeb APIs: setTimeout, fetch... chạy bên ngoài call stack.\nCallback/Task Queue: macro tasks (setTimeout).\nMicrotask Queue: Promises, queueMicrotask.\nEvent Loop: khi stack rỗng → lấy microtask trước → rồi macrotask.'],
                        ['Q: Spread operator và rest parameter?', 'Spread (...): "mở rộng" array/object ra → {...obj}, [...arr].\nRest (...): "gom lại" params → function(...args).\nCùng syntax ... nhưng ngược nghĩa: spread = unpack, rest = pack.'],
                        ['Q: map, filter, reduce khác forEach thế nào?', 'forEach: chỉ lặp, return undefined, không tạo array mới.\nmap: return array mới, cùng length.\nfilter: return array mới, items thỏa condition.\nreduce: return 1 giá trị từ array.\n→ forEach dùng cho side effects (log, API call), map/filter/reduce cho data transformation.'],
                        ['Q: Shallow copy vs deep copy?', 'Shallow: copy level 1, nested objects vẫn share reference.\n→ {...obj}, [...arr], Object.assign.\nDeep: copy tất cả levels, hoàn toàn independent.\n→ structuredClone() (modern), JSON.parse(JSON.stringify()) (cũ, mất function/Date).'],
                        ['Q: Pass by value vs pass by reference?', 'Primitives: pass by value (copy giá trị).\nObjects/Arrays: pass by reference (share cùng reference).\n→ Thay đổi property của object trong function SẼ thay đổi object gốc.'],
                        ['Q: setTimeout(fn, 0) chạy ngay không?', 'KHÔNG chạy ngay! setTimeout(fn, 0) đưa fn vào macrotask queue.\nChỉ chạy khi call stack RỖNG và tất cả microtasks đã xong.\n→ console.log(1); setTimeout(() => console.log(2), 0); console.log(3);\n→ Output: 1, 3, 2.'],
                        ['Q: Promise.all vs Promise.allSettled?', 'Promise.all: fail NGAY khi 1 promise reject (fast-fail).\nPromise.allSettled: đợi TẤT CẢ hoàn thành, trả về [{status, value/reason}].\n→ Dùng all khi cần tất cả thành công. Dùng allSettled khi cần biết kết quả từng cái.'],
                        ['Q: Destructuring là gì?', 'Destructuring: "rút" giá trị từ object/array vào biến.\nObject: const { name, age } = user;\nArray: const [first, ...rest] = arr;\nCó thể: rename, default value, nested destructuring.'],
                    ].map(([q, a]) => (
                        <div key={q} className="p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                            <div className="text-yellow-400 text-sm font-bold mb-2">{q}</div>
                            <div className="text-slate-300 text-sm whitespace-pre-line">{a}</div>
                        </div>
                    ))}
                </div>
                <Callout type="tip">Mẹo: Gặp câu hỏi lý thuyết → trả lời <Highlight>ngắn gọn + ví dụ</Highlight>. {'"var là function-scoped, ví dụ console.log(x) // undefined vì hoisting"'} — tốt hơn chỉ nói {'"var là function scoped"'}.</Callout>
            </TopicModal>

            <TopicModal title="HTML/CSS — 10 câu hỏi hay gặp" emoji="🎨" color="#38bdf8" summary="box model, position, flexbox, responsive — CSS là phần nhiều dev VN yếu">
                <div className="my-3 space-y-3">
                    {[
                        ['Q: Box model là gì?', 'Mỗi element có 4 layers: Content → Padding → Border → Margin.\nbox-sizing: content-box (default): width = content only.\nbox-sizing: border-box: width = content + padding + border.\n→ Luôn dùng border-box (*, *::before, *::after { box-sizing: border-box; }).'],
                        ['Q: position: relative, absolute, fixed, sticky?', 'static: default, flow bình thường.\nrelative: dịch so với VỊ TRÍ GỐC, vẫn chiếm chỗ.\nabsolute: dịch so với PARENT có position khác static, không chiếm chỗ.\nfixed: dịch so với VIEWPORT, không chiếm chỗ.\nsticky: relative cho đến khi scroll đến threshold → thành fixed.'],
                        ['Q: display: none vs visibility: hidden vs opacity: 0?', 'display: none — mất khỏi DOM flow, không chiếm chỗ.\nvisibility: hidden — vẫn chiếm chỗ, không thấy, không click được.\nopacity: 0 — vẫn chiếm chỗ, không thấy, VẪN click được.\n→ Accessibility: dùng sr-only class (position: absolute, clip) cho screen reader.'],
                        ['Q: em, rem, px khác nhau?', 'px: fixed size, không responsive.\nem: relative to PARENT font-size → compound nếu nested.\nrem: relative to ROOT (html) font-size → predictable.\n→ Best practice: font-size dùng rem, spacing dùng rem hoặc em, border dùng px.'],
                        ['Q: Flexbox vs Grid khi nào dùng?', 'Flexbox: 1 chiều (hàng HOẶC cột). Dùng cho: navbar, button group, card row.\nGrid: 2 chiều (hàng VÀ cột). Dùng cho: page layout, dashboard, gallery.\n→ "Flex cho components, Grid cho layouts."'],
                        ['Q: Pseudo-class vs pseudo-element?', 'Pseudo-class (:hover, :focus, :nth-child) — style STATE của element.\nPseudo-element (::before, ::after, ::placeholder) — tạo ELEMENT ảo.\nPseudo-class: 1 dấu hai chấm. Pseudo-element: 2 dấu hai chấm.'],
                        ['Q: Responsive design approach?', 'Mobile-first: min-width (mặc định mobile, thêm style cho desktop).\nDesktop-first: max-width (mặc định desktop, override cho mobile).\n→ Mobile-first tốt hơn: ít CSS hơn, performance tốt hơn trên mobile.\nBreakpoints phổ biến: 640px (sm), 768px (md), 1024px (lg), 1280px (xl).'],
                        ['Q: z-index hoạt động thế nào?', 'z-index chỉ có tác dụng trên elements có position khác static.\nStacking context: tạo bởi position + z-index, opacity < 1, transform, filter.\nz-index chỉ so sánh TRONG cùng stacking context.\n→ Tip: tránh z-index war, dùng semantic layers (modal: 100, dropdown: 50, tooltip: 200).'],
                        ['Q: CSS selector priority?', '!important > inline style > #id > .class/:pseudo-class/[attr] > tag > *.\nKhi cùng specificity → rule sau win.\n→ Luôn giữ specificity thấp. Avoid !important. Dùng class thay vì id.'],
                        ['Q: Centering một element?', 'Flex: display: flex; justify-content: center; align-items: center;\nGrid: display: grid; place-items: center;\nAbsolute: position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);\nMargin: margin: 0 auto (chỉ horizontal, cần width).'],
                    ].map(([q, a]) => (
                        <div key={q} className="p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                            <div className="text-blue-400 text-sm font-bold mb-2">{q}</div>
                            <div className="text-slate-300 text-sm whitespace-pre-line">{a}</div>
                        </div>
                    ))}
                </div>
                <Callout type="tip">VN interview đặc biệt hay hỏi CSS: <Highlight>centering, box model, position, flexbox/grid</Highlight>. Nhiều công ty cho bài test code CSS trực tiếp — phải viết thuộc lòng.</Callout>
            </TopicModal>

            <TopicModal title="React — 12 câu hỏi phỏng vấn" emoji="⚛️" color="#61DAFB" summary="lifecycle, hooks, key, controlled/uncontrolled — phải trả lời được trong 30 giây">
                <div className="my-3 space-y-3">
                    {[
                        ['Q: React lifecycle methods?', 'Mounting: constructor → render → componentDidMount (≈ useEffect(fn, [])).\nUpdating: render → componentDidUpdate (≈ useEffect(fn, [deps])).\nUnmounting: componentWillUnmount (≈ useEffect cleanup return).\n→ Hooks đã thay thế lifecycle methods. Nhưng phải biết mapping.'],
                        ['Q: useState vs useRef?', 'useState: lưu state, thay đổi → re-render.\nuseRef: lưu giá trị, thay đổi → KHÔNG re-render.\n→ useRef cho: DOM reference, timer ID, previous value, mutable value không cần UI update.'],
                        ['Q: useEffect dependency array?', 'useEffect(fn) — chạy MỌI render.\nuseEffect(fn, []) — chạy 1 lần sau mount.\nuseEffect(fn, [a, b]) — chạy khi a hoặc b thay đổi.\nCleanup: return () => {} — chạy khi unmount hoặc trước effect mới.'],
                        ['Q: Tại sao cần key trong list?', 'key giúp React xác định element nào thay đổi, thêm, xóa (reconciliation).\n❌ Dùng index làm key → bug khi reorder/delete (state bị lẫn giữa các items).\n✅ Dùng unique ID (id từ API, UUID).\n→ Không có key → React dùng index mặc định → warning.'],
                        ['Q: Controlled vs Uncontrolled component?', 'Controlled: React quản lý value qua state (value={state}, onChange={setState}).\nUncontrolled: DOM quản lý value, React đọc qua ref (useRef).\n→ Form đơn giản: uncontrolled (register ref). Form complex: controlled (validation real-time).'],
                        ['Q: useMemo vs useCallback?', 'useMemo: memoize GIÁ TRỊ computed → useMemo(() => expensiveCalc(a), [a]).\nuseCallback: memoize FUNCTION → useCallback(fn, [deps]).\nuseCallback(fn, deps) = useMemo(() => fn, deps).\n→ Chỉ dùng khi: 1) heavy computation 2) reference equality matters 3) React.memo child.'],
                        ['Q: Props drilling là gì? Giải pháp?', 'Props drilling: truyền props qua nhiều layers components trung gian.\nGiải pháp:\n1. Context API — share state global (theme, auth, locale).\n2. Composition — render children trực tiếp.\n3. State management — Redux, Zustand.\n→ Context tốt cho low-frequency updates. Redux/Zustand cho complex state.'],
                        ['Q: React render lại khi nào?', '1. State thay đổi (setState).\n2. Props thay đổi.\n3. Parent re-render (mặc dù props không đổi!).\n4. Context value thay đổi.\n→ Tránh unnecessary re-render: React.memo, useMemo, useCallback, state colocation.'],
                        ['Q: Giải thích Virtual DOM.', 'Virtual DOM = JS object đại diện cho DOM thật.\nKhi state thay đổi:\n1. React tạo Virtual DOM mới.\n2. So sánh (diff) với Virtual DOM cũ.\n3. Tính ra minimal changes (reconciliation).\n4. Batch update DOM thật.\n→ Nhanh hơn manipulate DOM trực tiếp vì batch updates + minimal DOM operations.'],
                        ['Q: useContext dùng khi nào?', 'useContext: chia sẻ data global mà không cần props drilling.\nUse cases: theme, language/locale, auth user, toast notifications.\n⚠️ Hạn chế: TẤT CẢ consumers re-render khi context value thay đổi.\n→ Split context theo domain. Không dùng cho frequently changing data (mouse position).'],
                        ['Q: Higher-Order Component (HOC) là gì?', 'HOC = function nhận component, trả về component mới với thêm logic.\nVí dụ: withAuth(Component) → check auth trước khi render.\nNhược điểm: wrapper hell, khó debug, naming collision.\n→ Hooks đã thay thế phần lớn HOC use cases. Nhưng HOC vẫn dùng cho cross-cutting concerns.'],
                        ['Q: Custom hooks là gì? Cho ví dụ.', 'Custom hook = function bắt đầu bằng "use", dùng hooks bên trong.\nVí dụ: useDebounce, useLocalStorage, useWindowSize, useFetch.\nĐặc điểm: share logic, KHÔNG share state (mỗi component dùng hook có state riêng).\n→ Rule: logic dùng lại ≥ 2 lần → extract thành custom hook.'],
                    ].map(([q, a]) => (
                        <div key={q} className="p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                            <div className="text-cyan-400 text-sm font-bold mb-2">{q}</div>
                            <div className="text-slate-300 text-sm whitespace-pre-line">{a}</div>
                        </div>
                    ))}
                </div>
                <Callout type="tip">Công ty VN hỏi React nhiều nhất: <Highlight>hooks, lifecycle, key, controlled form, re-render optimization</Highlight>. Chuẩn bị kỹ 12 câu trên là cover 80% câu hỏi React ở VN.</Callout>
            </TopicModal>
        </div>

        {/* ===== PHASE 3 ===== */}
        <Heading2>Phase 3 — React & Frontend Chuyên sâu (4-6 tuần)</Heading2>

        <Heading3>3.1 React (click để xem chi tiết)</Heading3>
        <div className="my-4 space-y-2">
            <TopicModal title="Virtual DOM & Reconciliation" emoji="🌳" color="#61DAFB" summary="React diff algorithm — làm sao React biết cần update gì trên DOM thật">
                <Paragraph>React không update DOM trực tiếp. Thay vào đó, nó dùng <Highlight>Virtual DOM</Highlight> — một bản copy nhẹ của DOM thật.</Paragraph>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">🔄 Quy trình Rendering</div>
                        <div className="text-slate-300 text-sm mt-1">
                            1. State/props thay đổi → React gọi <strong>render()</strong> tạo Virtual DOM mới<br />
                            2. <strong>Diffing</strong>: So sánh VDOM cũ vs mới (O(n) nhờ heuristics thay vì O(n³))<br />
                            3. <strong>Reconciliation</strong>: Tạo list minimal DOM operations cần thiết<br />
                            4. <strong>Commit</strong>: Apply changes lên DOM thật (batched)<br />
                            5. Browser repaint (layout → paint → composite)
                        </div>
                    </div>

                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">📏 Diffing Heuristics (2 assumptions)</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <strong>Khác type</strong> → destroy cây cũ, build cây mới (ví dụ: {'<div>'} → {'<span>'})<br />
                            • <strong>Cùng type</strong> → giữ DOM node, chỉ update attributes thay đổi<br />
                            • <strong>List items</strong>: dùng <InlineCode>key</InlineCode> prop để match — KHÔNG dùng index làm key!<br />
                            • Key giúp React biết item nào thay đổi, thêm, xóa mà không cần re-render toàn bộ list
                        </div>
                    </div>

                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">⚡ React Fiber (React 18+)</div>
                        <div className="text-slate-300 text-sm mt-1">
                            Fiber = kiến trúc mới cho reconciliation — <strong>incremental rendering</strong>:<br />
                            • <strong>Time slicing</strong>: chia rendering thành chunks nhỏ, không block main thread<br />
                            • <strong>Priority lanes</strong>: user input (urgent) {'>'} animation {'>'} data fetch (low priority)<br />
                            • <strong>Concurrent features</strong>: Suspense, startTransition, useDeferredValue<br />
                            • <strong>Interruptible</strong>: React có thể pause rendering để xử lý user input trước
                        </div>
                    </div>

                    <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="text-yellow-400 font-bold text-sm">🆚 VDOM vs Direct DOM vs Signals</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <strong>VDOM (React)</strong>: diffing overhead nhưng predictable, good DX<br />
                            • <strong>Direct DOM (Svelte)</strong>: compile-time, no runtime overhead, smaller bundle<br />
                            • <strong>Signals (Solid, Angular)</strong>: fine-grained reactivity, no unnecessary re-renders<br />
                            • Interview: biết trade-offs giữa các approaches → điểm cộng lớn
                        </div>
                    </div>
                </div>

                <CodeBlock title="reconciliation-demo.tsx">{`// ❌ Bad: dùng index làm key → bug khi reorder
{items.map((item, index) => (
  <Input key={index} defaultValue={item.name} />
  // Khi sort: DOM nodes giữ nguyên, chỉ props thay đổi
  // → input value CŨ vẫn hiển thị ở vị trí MỚI!
))}

// ✅ Good: dùng unique ID làm key
{items.map(item => (
  <Input key={item.id} defaultValue={item.name} />
  // React biết chính xác item nào move → DOM reorder đúng
))}

// React 18: Concurrent rendering
function App() {
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)
  // Input updates ngay (urgent)
  // SearchResults re-render với deferredQuery (low priority)
  return <>
    <input value={query} onChange={e => setQuery(e.target.value)} />
    <SearchResults query={deferredQuery} />
  </>
}`}</CodeBlock>

                <Callout type="tip">
                    Interview: Giải thích <Highlight>tại sao key quan trọng</Highlight> với ví dụ cụ thể (reorder list với input).
                    Nhắc đến Fiber + concurrent rendering → cho thấy hiểu React hiện đại, không chỉ React cũ.
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
                            • Best practice: <strong>support both</strong> (controlled khi có value prop, uncontrolled khi không)
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

            <TopicModal title="Next.js — SSR, SSG, ISR, App Router" emoji="▲" color="#000000" summary="Rendering strategies — công ty VN dùng Next.js rất nhiều, phải biết rõ">
                <Paragraph>Next.js là framework React <Highlight>phổ biến nhất ở VN</Highlight>. Phỏng vấn hay hỏi về rendering strategies.</Paragraph>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-gray-500/10 border border-gray-500/20">
                        <div className="text-gray-300 font-bold text-sm">📊 So sánh Rendering Strategies</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <strong>CSR</strong> (Client-Side Rendering): HTML trống + JS bundle → render trên browser<br />
                            • <strong>SSR</strong> (Server-Side Rendering): render trên server mỗi request → HTML đầy đủ<br />
                            • <strong>SSG</strong> (Static Site Generation): render lúc build → HTML tĩnh, CDN cache<br />
                            • <strong>ISR</strong> (Incremental Static Regeneration): SSG + revalidate sau N giây
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">🆕 App Router (Next.js 13+)</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <strong>Server Components</strong> (default): render trên server, 0 JS bundle<br />
                            • <strong>&apos;use client&apos;</strong>: opt-in to client component (hooks, events, browser API)<br />
                            • <strong>layout.tsx</strong>: shared layout (persistent across navigation)<br />
                            • <strong>loading.tsx</strong>: React Suspense boundary<br />
                            • <strong>error.tsx</strong>: Error Boundary<br />
                            • <strong>Server Actions</strong>: gọi server-side function trực tiếp từ client
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="text-yellow-400 font-bold text-sm">🎯 Khi nào dùng gì?</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <strong>SSG</strong>: blogs, landing pages, docs (content ít thay đổi)<br />
                            • <strong>ISR</strong>: e-commerce products, news (thay đổi vài phút/giờ)<br />
                            • <strong>SSR</strong>: user dashboard, search results (data real-time, SEO cần)<br />
                            • <strong>CSR</strong>: admin panel, private pages (không cần SEO)
                        </div>
                    </div>
                </div>
                <CodeBlock title="nextjs-rendering.tsx">{`// SSG — build time (getStaticProps — Pages Router)
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

// App Router — Server Component (default)
async function ProductPage({ params }) {
  const product = await db.product.findById(params.id) // direct DB!
  return <div>{product.name}</div>
}

// App Router — Client Component
'use client'
function LikeButton() {
  const [liked, setLiked] = useState(false) // hooks OK here
  return <button onClick={() => setLiked(!liked)}>❤️</button>
}`}</CodeBlock>
                <Callout type="tip">VN Interview: {'"Giải thích SSR vs SSG vs ISR"'} = câu hỏi <Highlight>gần như chắc chắn</Highlight> gặp nếu JD có Next.js. Biết thêm App Router + Server Components → shows bạn up-to-date.</Callout>
            </TopicModal>
        </div>

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
                <Callout type="tip">Interview: được hỏi {'"How do you organize CSS in a large project?"'} → trả lời CSS Modules (simple) hoặc Vanilla Extract (enterprise). Giải thích <Highlight>trade-offs</Highlight> giữa các approach → senior answer.</Callout>
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
                    <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                        <div className="text-cyan-400 font-bold text-sm">📋 Tại sao Tailwind phổ biến?</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <strong>Utility-first</strong>: viết CSS trong HTML, không cần đặt tên class<br />
                            • <strong>Design system</strong>: spacing, colors, breakpoints consistency<br />
                            • <strong>Purge CSS</strong>: chỉ ship CSS đã dùng → tiny bundle<br />
                            • <strong>DX</strong>: IntelliSense plugin, instant prototyping<br />
                            • <strong>Responsive</strong>: <InlineCode>md:flex lg:grid</InlineCode> — prefix-based
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="text-yellow-400 font-bold text-sm">⚠️ Câu hỏi phỏng vấn</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Tailwind vs CSS Modules? → Trade-off: speed vs separation<br />
                            • Customize theme? → tailwind.config.js extend<br />
                            • Dynamic classes? → clsx/cn, không dùng string interpolation<br />
                            • Tailwind v4 có gì mới? → CSS-first config, no JS config file
                        </div>
                    </div>
                </div>
                <Callout type="tip">Nếu dùng Tailwind + React → phải biết <Highlight>clsx hoặc cn (class-variance-authority)</Highlight> để conditional classes. Đây là pattern thiết yếu.</Callout>
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


        <Heading2>Phase 4 — Data Structures & Algorithms (6-8 tuần)</Heading2>

        <Paragraph>
            Phần <Highlight>nhiều người sợ nhất</Highlight> nhưng cũng là phần <Highlight>bắt buộc</Highlight> ở big tech.
            Frontend cũng phải code DSA — nhưng mức độ thường dễ hơn backend 1 bậc.
        </Paragraph>

        <Heading3>4.1 Data Structures (click để xem chi tiết)</Heading3>
        <a href="/blogs/data-types-structures" target="_blank" rel="noopener noreferrer" className="mb-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 Xem bài viết Data Types &amp; Structures →</a>
        <div className="my-4 space-y-2">
            <TopicModal title="Array / String" emoji="📦" color="#4ade80" summary="⭐ Bắt buộc — nền tảng của mọi bài DSA, two pointers, sliding window">
                <Paragraph><Highlight>Array</Highlight> lưu phần tử liền kề trong bộ nhớ → truy cập O(1) bằng index. <Highlight>String</Highlight> trong JS là immutable — mỗi lần thay đổi tạo string mới.</Paragraph>
                <div className="my-3 overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead><tr className="border-b border-[var(--border-primary)]"><th className="text-left p-2 text-slate-400">Thao tác</th><th className="text-left p-2 text-slate-400">Time</th><th className="text-left p-2 text-slate-400">Ghi chú</th></tr></thead>
                        <tbody className="text-[var(--text-secondary)]">
                            <tr className="border-b border-gray-100"><td className="p-2">Access [i]</td><td className="p-2 text-green-400">O(1)</td><td className="p-2">Random access</td></tr>
                            <tr className="border-b border-gray-100"><td className="p-2">Push / Pop (cuối)</td><td className="p-2 text-green-400">O(1)</td><td className="p-2">Thêm/xóa cuối mảng</td></tr>
                            <tr className="border-b border-gray-100"><td className="p-2">Shift / Unshift (đầu)</td><td className="p-2 text-red-400">O(n)</td><td className="p-2">Phải dịch toàn bộ</td></tr>
                            <tr><td className="p-2">Search / includes</td><td className="p-2 text-yellow-400">O(n)</td><td className="p-2">Linear scan</td></tr>
                        </tbody>
                    </table>
                </div>
                <CodeBlock title="common-array-patterns.js">{`// Swap hai phần tử
[arr[i], arr[j]] = [arr[j], arr[i]]

// Remove duplicates (giữ thứ tự)
const unique = [...new Set(arr)]

// Flatten nested arrays
arr.flat(Infinity)

// Check palindrome
const isPalin = s => s === s.split('').reverse().join('')`}</CodeBlock>
                <Callout type="tip">Interview: 80% bài LeetCode liên quan đến Array/String. Thành thạo <Highlight>Two Pointers</Highlight> và <Highlight>Sliding Window</Highlight> sẽ giải được phần lớn.</Callout>
            </TopicModal>

            <TopicModal title="HashMap / HashSet" emoji="🗂️" color="#4ade80" summary="⭐ Bắt buộc — frequency count, cache, lookup O(1)">
                <Paragraph><Highlight>HashMap</Highlight> (Map) lưu key→value, <Highlight>HashSet</Highlight> (Set) chỉ lưu key unique. Cả hai cho phép thêm/xóa/tìm trong <Highlight>O(1)</Highlight> trung bình.</Paragraph>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">JS: Object vs Map vs Set</div>
                        <div className="text-slate-300 text-sm mt-1"><strong>Object</strong>: key phải là string/symbol, không đảm bảo thứ tự.<br /><strong>Map</strong>: key bất kỳ, giữ insertion order, có <InlineCode>.size</InlineCode>.<br /><strong>Set</strong>: chỉ lưu unique values, perfect cho check duplicates.</div>
                    </div>
                </div>
                <CodeBlock title="hashmap-patterns.js">{`// Đếm frequency
const freq = new Map()
for (const c of str) freq.set(c, (freq.get(c) || 0) + 1)

// Check duplicate
const hasDup = arr => new Set(arr).size !== arr.length

// Two Sum pattern
const map = new Map()
for (let i = 0; i < nums.length; i++) {
    const comp = target - nums[i]
    if (map.has(comp)) return [map.get(comp), i]
    map.set(nums[i], i)
}`}</CodeBlock>
                <Callout type="tip">Nếu brute force là O(n²), hãy nghĩ đến HashMap — thường giảm xuống <Highlight>O(n)</Highlight>.</Callout>
                <a href="/blogs/hash-map-pattern" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 Xem bài viết chi tiết →</a>
            </TopicModal>

            <TopicModal title="Stack / Queue" emoji="📚" color="#4ade80" summary="⭐ Bắt buộc — valid parentheses, BFS, monotonic stack">
                <Paragraph><Highlight>Stack</Highlight> = LIFO (Last In First Out), <Highlight>Queue</Highlight> = FIFO (First In First Out). Hai cấu trúc đơn giản nhưng cực mạnh.</Paragraph>
                <div className="my-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-4">
                        <div className="text-blue-400 font-bold text-sm mb-2">📚 Stack (LIFO)</div>
                        <ul className="text-[var(--text-secondary)] text-xs space-y-1">
                            <li>• push / pop: O(1)</li>
                            <li>• Valid Parentheses</li>
                            <li>• Undo / Redo</li>
                            <li>• Call Stack, DFS</li>
                        </ul>
                    </div>
                    <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-4">
                        <div className="text-green-400 font-bold text-sm mb-2">🚶 Queue (FIFO)</div>
                        <ul className="text-[var(--text-secondary)] text-xs space-y-1">
                            <li>• enqueue / dequeue: O(1)*</li>
                            <li>• BFS traversal</li>
                            <li>• Task scheduling</li>
                            <li>• Event Loop!</li>
                        </ul>
                    </div>
                </div>
                <CodeBlock title="stack-queue-js.js">{`// Stack in JS (dùng Array)
const stack = []
stack.push(1); stack.push(2)
stack.pop()      // 2, stack = [1]

// Queue in JS (shift() là O(n)!)
const queue = []
queue.push(1); queue.push(2)
queue.shift()    // 1, queue = [2]

// ⚠️ Queue O(1): dùng Linked List hoặc obj+pointer`}</CodeBlock>
                <Callout type="warning">JS Array <InlineCode>shift()</InlineCode> là <Highlight>O(n)</Highlight>! Interview nếu cần optimal queue, dùng Linked List-based queue.</Callout>
                <a href="/blogs/stack-pattern" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 Xem bài viết chi tiết →</a>
            </TopicModal>

            <TopicModal title="Linked List" emoji="🔗" color="#60a5fa" summary="⭐⭐ Quan trọng — reverse, cycle detect, merge sorted lists">
                <Paragraph>Mỗi node chứa <InlineCode>value</InlineCode> + <InlineCode>next</InlineCode> pointer. Không có random access (O(n)), nhưng insert/delete ở đầu là <Highlight>O(1)</Highlight>.</Paragraph>
                <CodeBlock title="linked-list.js">{`class ListNode {
    constructor(val, next = null) {
        this.val = val; this.next = next
    }
}

// Reverse Linked List — O(n)
function reverseList(head) {
    let prev = null, curr = head
    while (curr) {
        const next = curr.next
        curr.next = prev
        prev = curr
        curr = next
    }
    return prev
}

// Detect Cycle — Floyd's Tortoise & Hare
function hasCycle(head) {
    let slow = head, fast = head
    while (fast && fast.next) {
        slow = slow.next
        fast = fast.next.next
        if (slow === fast) return true
    }
    return false
}`}</CodeBlock>
                <Callout type="tip">Kỹ thuật: <Highlight>Dummy node</Highlight> (tránh edge case), <Highlight>Fast/Slow pointers</Highlight>, <Highlight>Reverse</Highlight> (3 biến prev/curr/next).</Callout>
            </TopicModal>

            <TopicModal title="Tree / Binary Tree" emoji="🌳" color="#60a5fa" summary="⭐⭐ Quan trọng — DFS, BFS, DOM tree, BST">
                <Paragraph>Tree là đồ thị không chu trình. <Highlight>Binary Tree</Highlight> = mỗi node tối đa 2 con. <Highlight>BST</Highlight> = left &lt; root &lt; right.</Paragraph>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">3 loại DFS traversal</div>
                        <div className="text-slate-300 text-sm mt-1"><strong>Inorder</strong> (L→Root→R): BST → sorted<br /><strong>Preorder</strong> (Root→L→R): copy/serialize<br /><strong>Postorder</strong> (L→R→Root): delete/size</div>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">Frontend connection</div>
                        <div className="text-slate-300 text-sm mt-1"><strong>DOM</strong> chính là tree! React Virtual DOM cũng là tree. Hiểu tree = hiểu React diff.</div>
                    </div>
                </div>
                <CodeBlock title="tree-traversal.js">{`// DFS — Max Depth (câu hỏi kinh điển)
function maxDepth(root) {
    if (!root) return 0
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right))
}

// BFS — Level Order
function levelOrder(root) {
    if (!root) return []
    const result = [], queue = [root]
    while (queue.length) {
        const level = []
        for (let i = queue.length; i > 0; i--) {
            const node = queue.shift()
            level.push(node.val)
            if (node.left) queue.push(node.left)
            if (node.right) queue.push(node.right)
        }
        result.push(level)
    }
    return result
}`}</CodeBlock>
                <Callout type="tip">Phần lớn bài tree dùng <Highlight>đệ quy</Highlight>. Base case: <InlineCode>if (!root) return</InlineCode>. Think: &quot;biết left+right → tính root thế nào?&quot;</Callout>
                <a href="/blogs/bfs-dfs-pattern" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 Xem bài BFS/DFS chi tiết →</a>
            </TopicModal>

            <TopicModal title="Graph" emoji="🕸️" color="#60a5fa" summary="⭐⭐ Quan trọng — BFS/DFS, cycle detection, topological sort">
                <Paragraph>Graph = đỉnh + cạnh. Biểu diễn bằng <Highlight>adjacency list</Highlight> (phổ biến nhất).</Paragraph>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">Các loại Graph</div>
                        <div className="text-slate-300 text-sm mt-1"><strong>Directed</strong>: A→B — dependency, courses<br /><strong>Undirected</strong>: A↔B — social network<br /><strong>Weighted</strong>: cạnh có trọng số — Dijkstra</div>
                    </div>
                </div>
                <CodeBlock title="graph-basics.js">{`// Adjacency List
const graph = { A: ['B','C'], B: ['D'], C: ['D'], D: [] }

// DFS trên graph (CẦN visited set!)
function dfs(graph, start) {
    const visited = new Set()
    function explore(node) {
        if (visited.has(node)) return
        visited.add(node)
        for (const next of graph[node]) explore(next)
    }
    explore(start)
}

// BFS trên graph
function bfs(graph, start) {
    const visited = new Set([start]), queue = [start]
    while (queue.length) {
        const node = queue.shift()
        for (const next of graph[node])
            if (!visited.has(next)) { visited.add(next); queue.push(next) }
    }
}`}</CodeBlock>
                <Callout type="warning">Graph có thể có <Highlight>cycle</Highlight> → luôn cần <InlineCode>visited</InlineCode> set. Quên = infinite loop!</Callout>
            </TopicModal>

            <TopicModal title="Heap / Trie" emoji="⛰️" color="#a78bfa" summary="⭐⭐⭐ Nâng cao — Top K elements, autocomplete, priority queue">
                <Paragraph><Highlight>Heap</Highlight> = lấy min/max O(1), insert/delete O(log n). <Highlight>Trie</Highlight> = tìm kiếm theo prefix.</Paragraph>
                <div className="my-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="rounded-xl bg-yellow-500/10 border border-yellow-500/20 p-4">
                        <div className="text-yellow-400 font-bold text-sm mb-2">⛰️ Heap</div>
                        <ul className="text-[var(--text-secondary)] text-xs space-y-1">
                            <li>• Top K elements</li>
                            <li>• Merge K sorted lists</li>
                            <li>• Median of stream</li>
                            <li>• JS: không có built-in!</li>
                        </ul>
                    </div>
                    <div className="rounded-xl bg-purple-500/10 border border-purple-500/20 p-4">
                        <div className="text-purple-400 font-bold text-sm mb-2">🔤 Trie</div>
                        <ul className="text-[var(--text-secondary)] text-xs space-y-1">
                            <li>• Autocomplete</li>
                            <li>• Spell checker</li>
                            <li>• Word search</li>
                            <li>• IP routing</li>
                        </ul>
                    </div>
                </div>
                <CodeBlock title="trie.js">{`// Trie — Prefix Tree
class TrieNode {
    constructor() { this.children = {}; this.isEnd = false }
}
class Trie {
    constructor() { this.root = new TrieNode() }
    insert(word) {
        let node = this.root
        for (const c of word) {
            if (!node.children[c]) node.children[c] = new TrieNode()
            node = node.children[c]
        }
        node.isEnd = true
    }
    search(word) {
        let node = this.root
        for (const c of word) {
            if (!node.children[c]) return false
            node = node.children[c]
        }
        return node.isEnd
    }
}`}</CodeBlock>
                <Callout type="tip">JS không có Heap built-in. Interview: &quot;Tôi sẽ dùng MinHeap, giả sử có sẵn&quot; rồi focus vào logic chính.</Callout>
            </TopicModal>
        </div>

        <Heading3>4.2 Patterns cần luyện (click xem bài LeetCode gợi ý)</Heading3>
        <div className="my-4 space-y-2">
            <TopicModal title="Hash Map / Hash Set" emoji="🗂️" color="#4ade80" summary="~15 bài — pattern dùng nhiều nhất, gần như mọi interview đều có">
                <Paragraph>Dùng khi: cần <Highlight>lookup O(1)</Highlight>, đếm frequency, tìm pair/complement, loại bỏ duplicates, hoặc group theo key.</Paragraph>
                <CodeBlock title="hash-map-patterns.js">{`// 1. Đếm frequency
const freq = new Map()
for (const c of str) freq.set(c, (freq.get(c) || 0) + 1)

// 2. Check duplicate
const hasDup = arr => new Set(arr).size !== arr.length

// 3. Two Sum — tìm complement
const map = new Map()
for (let i = 0; i < nums.length; i++) {
    const comp = target - nums[i]
    if (map.has(comp)) return [map.get(comp), i]
    map.set(nums[i], i)
}

// 4. Group Anagrams — sort làm key
const groups = new Map()
for (const s of strs) {
    const key = s.split('').sort().join('')
    groups.set(key, [...(groups.get(key) || []), s])
}`}</CodeBlock>
                <div className="my-3 space-y-1.5">
                    <div className="text-green-400 font-bold text-sm mb-2">📋 Bài LeetCode:</div>
                    {[
                        ['Easy', ['1. Two Sum', '217. Contains Duplicate', '242. Valid Anagram', '383. Ransom Note', '349. Intersection of Two Arrays']],
                        ['Medium', ['49. Group Anagrams', '347. Top K Frequent Elements', '128. Longest Consecutive Sequence', '560. Subarray Sum Equals K', '36. Valid Sudoku', '438. Find All Anagrams in a String']],
                    ].map(([level, problems]) => (
                        <div key={level as string} className="p-2.5 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                            <div className={`text-xs font-bold mb-1 ${level === 'Easy' ? 'text-green-400' : 'text-yellow-400'}`}>{level as string}</div>
                            <div className="text-slate-300 text-xs space-y-0.5">{(problems as string[]).map(p => <div key={p}>• <a href={`https://leetcode.com/problems/${toLeetCodeSlug(p as string)}/`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{p as string}</a></div>)}</div>
                        </div>
                    ))}
                </div>
                <Callout type="tip">Khi thấy bài yêu cầu &quot;tìm trong O(n)&quot; hoặc &quot;count frequency&quot; → nghĩ ngay HashMap. Đây là pattern <Highlight>nền tảng nhất</Highlight> — hầu hết patterns khác đều kết hợp với HashMap.</Callout>
                <a href="/blogs/hash-map-pattern" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 Xem bài viết chi tiết →</a>
            </TopicModal>

            <TopicModal title="Two Pointers" emoji="👉👈" color="#4ade80" summary="~15 bài — dùng 2 con trỏ di chuyển trên sorted array hoặc linked list">
                <Paragraph>Dùng khi: array đã <Highlight>sorted</Highlight>, tìm pair/triplet thỏa điều kiện, hoặc loại bỏ duplicates.</Paragraph>
                <CodeBlock title="two-pointers-patterns.js">{`// 1. Opposite ends — sorted array tìm pair
let left = 0, right = arr.length - 1
while (left < right) {
    const sum = arr[left] + arr[right]
    if (sum === target) return [left, right]
    sum < target ? left++ : right--
}

// 2. Same direction — remove duplicates in-place
let slow = 0
for (let fast = 1; fast < nums.length; fast++) {
    if (nums[fast] !== nums[slow]) nums[++slow] = nums[fast]
}

// 3. Container With Most Water
let maxArea = 0, l = 0, r = height.length - 1
while (l < r) {
    maxArea = Math.max(maxArea, Math.min(height[l], height[r]) * (r - l))
    height[l] < height[r] ? l++ : r--
}`}</CodeBlock>
                <div className="my-3 space-y-1.5">
                    <div className="text-green-400 font-bold text-sm mb-2">📋 Bài LeetCode:</div>
                    {[
                        ['Easy', ['167. Two Sum II - Input Array Is Sorted', '26. Remove Duplicates from Sorted Array', '283. Move Zeroes', '344. Reverse String', '977. Squares of a Sorted Array']],
                        ['Medium', ['15. 3Sum', '11. Container With Most Water', '75. Sort Colors', '142. Linked List Cycle II', '238. Product of Array Except Self']],
                    ].map(([level, problems]) => (
                        <div key={level as string} className="p-2.5 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                            <div className={`text-xs font-bold mb-1 ${level === 'Easy' ? 'text-green-400' : 'text-yellow-400'}`}>{level as string}</div>
                            <div className="text-slate-300 text-xs space-y-0.5">{(problems as string[]).map(p => <div key={p}>• <a href={`https://leetcode.com/problems/${toLeetCodeSlug(p as string)}/`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{p as string}</a></div>)}</div>
                        </div>
                    ))}
                </div>
                <Callout type="tip">2 dạng chính: <Highlight>Opposite ends</Highlight> (sorted, tìm pair) và <Highlight>Same direction</Highlight> (fast/slow, remove duplicates). Luôn nghĩ: &quot;Phần tử nào tôi có thể loại bỏ?&quot;</Callout>
                <a href="/blogs/two-pointers-pattern" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 Xem bài viết chi tiết →</a>
            </TopicModal>

            <TopicModal title="Sliding Window" emoji="🪟" color="#4ade80" summary="~10 bài — tìm substring/subarray tối ưu với fixed hoặc variable window">
                <Paragraph>Dùng khi: tìm <Highlight>contiguous subarray/substring</Highlight> thỏa điều kiện (max sum, min length, contains all chars).</Paragraph>
                <CodeBlock title="sliding-window-patterns.js">{`// 1. Fixed window — max average subarray
let sum = 0, maxSum = -Infinity
for (let i = 0; i < arr.length; i++) {
    sum += arr[i]
    if (i >= k - 1) {
        maxSum = Math.max(maxSum, sum / k)
        sum -= arr[i - k + 1]
    }
}

// 2. Variable window — longest substring without repeating
const seen = new Map()
let left = 0, maxLen = 0
for (let right = 0; right < s.length; right++) {
    if (seen.has(s[right])) left = Math.max(left, seen.get(s[right]) + 1)
    seen.set(s[right], right)
    maxLen = Math.max(maxLen, right - left + 1)
}

// 3. Variable window — minimum size subarray ≥ target
let windowSum = 0, minLen = Infinity
for (let l = 0, r = 0; r < nums.length; r++) {
    windowSum += nums[r]
    while (windowSum >= target) {
        minLen = Math.min(minLen, r - l + 1)
        windowSum -= nums[l++]
    }
}`}</CodeBlock>
                <div className="my-3 space-y-1.5">
                    <div className="text-green-400 font-bold text-sm mb-2">📋 Bài LeetCode:</div>
                    {[
                        ['Easy', ['643. Maximum Average Subarray I', '219. Contains Duplicate II']],
                        ['Medium', ['3. Longest Substring Without Repeating Characters', '424. Longest Repeating Character Replacement', '567. Permutation in String', '209. Minimum Size Subarray Sum', '438. Find All Anagrams in a String']],
                        ['Hard', ['76. Minimum Window Substring', '239. Sliding Window Maximum']],
                    ].map(([level, problems]) => (
                        <div key={level as string} className="p-2.5 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                            <div className={`text-xs font-bold mb-1 ${level === 'Easy' ? 'text-green-400' : level === 'Medium' ? 'text-yellow-400' : 'text-red-400'}`}>{level as string}</div>
                            <div className="text-slate-300 text-xs space-y-0.5">{(problems as string[]).map(p => <div key={p}>• <a href={`https://leetcode.com/problems/${toLeetCodeSlug(p as string)}/`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{p as string}</a></div>)}</div>
                        </div>
                    ))}
                </div>
                <Callout type="tip">2 dạng: <Highlight>Fixed window</Highlight> (size k cố định) và <Highlight>Variable window</Highlight> (expand right, shrink left khi invalid). Thường kết hợp HashMap track frequency.</Callout>
                <a href="/blogs/sliding-window-pattern" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 Xem bài viết chi tiết →</a>
            </TopicModal>

            <TopicModal title="BFS / DFS" emoji="🌲" color="#4ade80" summary="~20 bài — duyệt đồ thị và cây, quan trọng nhất cho Frontend (DOM tree!)">
                <Paragraph>Frontend engineer <Highlight>phải giỏi BFS/DFS</Highlight> vì DOM là tree! Flatten DOM, find element, traverse components.</Paragraph>
                <CodeBlock title="bfs-dfs-patterns.js">{`// 1. DFS trên tree (recursive) — hầu hết bài tree
function dfs(root) {
    if (!root) return // base case
    dfs(root.left)    // xử lý trái
    dfs(root.right)   // xử lý phải
}

// 2. BFS — level order / shortest path
function bfs(root) {
    const queue = [root]
    while (queue.length) {
        const node = queue.shift()
        if (node.left) queue.push(node.left)
        if (node.right) queue.push(node.right)
    }
}

// 3. Number of Islands — DFS trên grid
function numIslands(grid) {
    let count = 0
    for (let i = 0; i < grid.length; i++)
        for (let j = 0; j < grid[0].length; j++)
            if (grid[i][j] === '1') { count++; sink(grid, i, j) }
    return count
}
function sink(grid, i, j) {
    if (i < 0 || j < 0 || i >= grid.length || j >= grid[0].length || grid[i][j] === '0') return
    grid[i][j] = '0' // mark visited
    sink(grid, i+1, j); sink(grid, i-1, j); sink(grid, i, j+1); sink(grid, i, j-1)
}`}</CodeBlock>
                <div className="my-3 space-y-1.5">
                    <div className="text-green-400 font-bold text-sm mb-2">📋 Bài LeetCode:</div>
                    {[
                        ['Easy', ['104. Maximum Depth of Binary Tree', '226. Invert Binary Tree', '100. Same Tree', '572. Subtree of Another Tree', '617. Merge Two Binary Trees']],
                        ['Medium', ['102. Binary Tree Level Order Traversal', '200. Number of Islands', '133. Clone Graph', '207. Course Schedule', '547. Number of Provinces', '994. Rotting Oranges']],
                        ['Hard', ['124. Binary Tree Maximum Path Sum', '297. Serialize and Deserialize Binary Tree']],
                    ].map(([level, problems]) => (
                        <div key={level as string} className="p-2.5 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                            <div className={`text-xs font-bold mb-1 ${level === 'Easy' ? 'text-green-400' : level === 'Medium' ? 'text-yellow-400' : 'text-red-400'}`}>{level as string}</div>
                            <div className="text-slate-300 text-xs space-y-0.5">{(problems as string[]).map(p => <div key={p}>• <a href={`https://leetcode.com/problems/${toLeetCodeSlug(p as string)}/`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{p as string}</a></div>)}</div>
                        </div>
                    ))}
                </div>
                <Callout type="tip"><strong>BFS</strong> = Queue (level order, shortest path). <strong>DFS</strong> = Recursion (tree, backtrack). Grid problems: DFS + mark visited. FE interview thích DFS vì liên quan DOM.</Callout>
                <a href="/blogs/bfs-dfs-pattern" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 Xem bài viết chi tiết →</a>
            </TopicModal>

            <TopicModal title="Binary Search" emoji="🔍" color="#4ade80" summary="~10 bài — O(log n) search, không chỉ trên sorted array">
                <Paragraph>Binary search không chỉ tìm element — còn dùng cho <Highlight>search space reduction</Highlight> trên bất kỳ monotonic function nào.</Paragraph>
                <CodeBlock title="binary-search-patterns.js">{`// 1. Classic binary search
let left = 0, right = arr.length - 1
while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    if (arr[mid] === target) return mid
    arr[mid] < target ? left = mid + 1 : right = mid - 1
}

// 2. Find first/last position (bisect left/right)
function bisectLeft(arr, target) {
    let lo = 0, hi = arr.length
    while (lo < hi) {
        const mid = (lo + hi) >> 1
        arr[mid] < target ? lo = mid + 1 : hi = mid
    }
    return lo
}

// 3. Search on answer — Koko eating bananas
function minEatingSpeed(piles, h) {
    let lo = 1, hi = Math.max(...piles)
    while (lo < hi) {
        const mid = (lo + hi) >> 1
        const hours = piles.reduce((sum, p) => sum + Math.ceil(p / mid), 0)
        hours <= h ? hi = mid : lo = mid + 1
    }
    return lo
}`}</CodeBlock>
                <div className="my-3 space-y-1.5">
                    <div className="text-green-400 font-bold text-sm mb-2">📋 Bài LeetCode:</div>
                    {[
                        ['Easy', ['704. Binary Search', '35. Search Insert Position', '278. First Bad Version']],
                        ['Medium', ['33. Search in Rotated Sorted Array', '153. Find Minimum in Rotated Sorted Array', '74. Search a 2D Matrix', '875. Koko Eating Bananas', '34. Find First and Last Position of Element in Sorted Array']],
                    ].map(([level, problems]) => (
                        <div key={level as string} className="p-2.5 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                            <div className={`text-xs font-bold mb-1 ${level === 'Easy' ? 'text-green-400' : 'text-yellow-400'}`}>{level as string}</div>
                            <div className="text-slate-300 text-xs space-y-0.5">{(problems as string[]).map(p => <div key={p}>• <a href={`https://leetcode.com/problems/${toLeetCodeSlug(p as string)}/`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{p as string}</a></div>)}</div>
                        </div>
                    ))}
                </div>
                <Callout type="tip">3 dạng: <Highlight>Classic</Highlight> (tìm exact), <Highlight>Bisect left/right</Highlight> (tìm boundary), <Highlight>Search on answer</Highlight> (binary search trên kết quả). Khi thấy O(log n) → nghĩ Binary Search.</Callout>
                <a href="/blogs/binary-search-pattern" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 Xem bài viết chi tiết →</a>
            </TopicModal>

            <TopicModal title="Dynamic Programming" emoji="📊" color="#4ade80" summary="~15 bài Easy-Medium — phần khó nhất nhưng có pattern rõ ràng">
                <Paragraph>DP = chia bài toán thành <Highlight>subproblems</Highlight>, lưu kết quả tránh tính lại. Frontend ít gặp Hard DP.</Paragraph>
                <CodeBlock title="dp-patterns.js">{`// 1. Climbing Stairs — 1D DP cơ bản
function climbStairs(n) {
    let a = 1, b = 1
    for (let i = 2; i <= n; i++) [a, b] = [b, a + b]
    return b
}

// 2. House Robber — chọn/không chọn
function rob(nums) {
    let prev = 0, curr = 0
    for (const n of nums) [prev, curr] = [curr, Math.max(curr, prev + n)]
    return curr
}

// 3. Coin Change — unbounded knapsack
function coinChange(coins, amount) {
    const dp = Array(amount + 1).fill(Infinity)
    dp[0] = 0
    for (let i = 1; i <= amount; i++)
        for (const c of coins)
            if (c <= i) dp[i] = Math.min(dp[i], dp[i - c] + 1)
    return dp[amount] === Infinity ? -1 : dp[amount]
}

// 4. Longest Increasing Subsequence — O(n²)
function lengthOfLIS(nums) {
    const dp = Array(nums.length).fill(1)
    for (let i = 1; i < nums.length; i++)
        for (let j = 0; j < i; j++)
            if (nums[j] < nums[i]) dp[i] = Math.max(dp[i], dp[j] + 1)
    return Math.max(...dp)
}`}</CodeBlock>
                <div className="my-3 space-y-1.5">
                    <div className="text-green-400 font-bold text-sm mb-2">📋 Bài LeetCode gợi ý:</div>
                    {[
                        ['Easy', ['70. Climbing Stairs', '746. Min Cost Climbing Stairs', '338. Counting Bits', '121. Best Time to Buy and Sell Stock']],
                        ['Medium', ['198. House Robber', '322. Coin Change', '300. Longest Increasing Subsequence', '152. Maximum Product Subarray', '62. Unique Paths', '139. Word Break', '5. Longest Palindromic Substring']],
                    ].map(([level, problems]) => (
                        <div key={level as string} className="p-2.5 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                            <div className={`text-xs font-bold mb-1 ${level === 'Easy' ? 'text-green-400' : 'text-yellow-400'}`}>{level as string}</div>
                            <div className="text-slate-300 text-xs space-y-0.5">{(problems as string[]).map(p => <div key={p}>• <a href={`https://leetcode.com/problems/${toLeetCodeSlug(p as string)}/`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{p as string}</a></div>)}</div>
                        </div>
                    ))}
                </div>
                <Callout type="tip">4 dạng DP phổ biến: <Highlight>1D linear</Highlight> (Climbing Stairs), <Highlight>Chọn/không chọn</Highlight> (House Robber), <Highlight>Knapsack</Highlight> (Coin Change), <Highlight>Subsequence</Highlight> (LIS). Bắt đầu từ 1D DP trước.</Callout>
                <a href="/blogs/dynamic-programming-pattern" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 Xem bài viết chi tiết →</a>
            </TopicModal>

            <TopicModal title="Backtracking" emoji="🔙" color="#4ade80" summary="~10 bài — generate all combinations, permutations, subsets">
                <Paragraph>Pattern: thử từng option → nếu không hợp lệ thì <Highlight>quay lại (backtrack)</Highlight> → thử option tiếp.</Paragraph>
                <CodeBlock title="backtracking-patterns.js">{`// 1. Subsets — template cơ bản
function subsets(nums) {
    const result = []
    function backtrack(start, path) {
        result.push([...path])
        for (let i = start; i < nums.length; i++) {
            path.push(nums[i])
            backtrack(i + 1, path)
            path.pop() // backtrack!
        }
    }
    backtrack(0, [])
    return result
}

// 2. Permutations — dùng used set
function permute(nums) {
    const result = []
    function backtrack(path, used) {
        if (path.length === nums.length) { result.push([...path]); return }
        for (let i = 0; i < nums.length; i++) {
            if (used.has(i)) continue
            used.add(i); path.push(nums[i])
            backtrack(path, used)
            path.pop(); used.delete(i)
        }
    }
    backtrack([], new Set())
    return result
}

// 3. Generate Parentheses
function generateParenthesis(n) {
    const result = []
    function bt(s, open, close) {
        if (s.length === 2 * n) { result.push(s); return }
        if (open < n) bt(s + '(', open + 1, close)
        if (close < open) bt(s + ')', open, close + 1)
    }
    bt('', 0, 0)
    return result
}`}</CodeBlock>
                <div className="my-3 space-y-1.5">
                    <div className="text-green-400 font-bold text-sm mb-2">📋 Bài LeetCode:</div>
                    {[
                        ['Medium', ['78. Subsets', '46. Permutations', '39. Combination Sum', '77. Combinations', '22. Generate Parentheses', '79. Word Search', '17. Letter Combinations of a Phone Number']],
                        ['Hard', ['51. N-Queens', '37. Sudoku Solver']],
                    ].map(([level, problems]) => (
                        <div key={level as string} className="p-2.5 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                            <div className={`text-xs font-bold mb-1 ${level === 'Medium' ? 'text-yellow-400' : 'text-red-400'}`}>{level as string}</div>
                            <div className="text-slate-300 text-xs space-y-0.5">{(problems as string[]).map(p => <div key={p}>• <a href={`https://leetcode.com/problems/${toLeetCodeSlug(p as string)}/`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{p as string}</a></div>)}</div>
                        </div>
                    ))}
                </div>
                <Callout type="tip">Template: <InlineCode>backtrack(start, path)</InlineCode> → push → recurse → pop. 3 dạng: <Highlight>Subsets</Highlight> (start = i+1), <Highlight>Permutations</Highlight> (used set), <Highlight>Combinations</Highlight> (đếm đủ k).</Callout>
            </TopicModal>

            <TopicModal title="Stack-based" emoji="📚" color="#4ade80" summary="~10 bài — monotonic stack, valid parentheses, expression eval">
                <Paragraph>Stack = <Highlight>LIFO</Highlight>. Rất hữu ích cho: matching brackets, next greater element, expression parsing.</Paragraph>
                <CodeBlock title="stack-patterns.js">{`// 1. Valid Parentheses
function isValid(s) {
    const stack = [], map = { ')': '(', ']': '[', '}': '{' }
    for (const c of s) {
        if ('([{'.includes(c)) stack.push(c)
        else if (stack.pop() !== map[c]) return false
    }
    return stack.length === 0
}

// 2. Daily Temperatures — Monotonic Stack
function dailyTemperatures(temps) {
    const result = Array(temps.length).fill(0)
    const stack = [] // store indices
    for (let i = 0; i < temps.length; i++) {
        while (stack.length && temps[i] > temps[stack.at(-1)]) {
            const j = stack.pop()
            result[j] = i - j
        }
        stack.push(i)
    }
    return result
}

// 3. Decode String — nested brackets
function decodeString(s) {
    const stack = []
    for (const c of s) {
        if (c !== ']') { stack.push(c); continue }
        let str = ''
        while (stack.at(-1) !== '[') str = stack.pop() + str
        stack.pop() // remove '['
        let num = ''
        while (stack.length && !isNaN(stack.at(-1))) num = stack.pop() + num
        stack.push(str.repeat(+num))
    }
    return stack.join('')
}`}</CodeBlock>
                <div className="my-3 space-y-1.5">
                    <div className="text-green-400 font-bold text-sm mb-2">📋 Bài LeetCode:</div>
                    {[
                        ['Easy', ['20. Valid Parentheses', '155. Min Stack', '232. Implement Queue using Stacks', '844. Backspace String Compare']],
                        ['Medium', ['150. Evaluate Reverse Polish Notation', '739. Daily Temperatures', '394. Decode String', '735. Asteroid Collision', '853. Car Fleet']],
                        ['Hard', ['84. Largest Rectangle in Histogram']],
                    ].map(([level, problems]) => (
                        <div key={level as string} className="p-2.5 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                            <div className={`text-xs font-bold mb-1 ${level === 'Easy' ? 'text-green-400' : level === 'Medium' ? 'text-yellow-400' : 'text-red-400'}`}>{level as string}</div>
                            <div className="text-slate-300 text-xs space-y-0.5">{(problems as string[]).map(p => <div key={p}>• <a href={`https://leetcode.com/problems/${toLeetCodeSlug(p as string)}/`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{p as string}</a></div>)}</div>
                        </div>
                    ))}
                </div>
                <Callout type="tip">3 dạng: <Highlight>Matching</Highlight> (brackets, tags), <Highlight>Monotonic stack</Highlight> (next greater/smaller element), <Highlight>Expression eval</Highlight> (decode, RPN). Trick: khi push mới mà &gt; top → pop và xử lý.</Callout>
                <a href="/blogs/stack-pattern" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 Xem bài viết chi tiết →</a>
            </TopicModal>
        </div>

        <Heading3>4.3 Chiến lược LeetCode</Heading3>
        <div className="my-4 space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                <span className="text-green-400 font-bold">1</span>
                <div className="text-slate-300 text-sm">
                    <strong>Tuần 1-2</strong>: Làm Easy — mỗi ngày 2-3 bài, tập code thuần không hint
                </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                <span className="text-yellow-400 font-bold">2</span>
                <div className="text-slate-300 text-sm">
                    <strong>Tuần 3-5</strong>: Làm Medium theo pattern — group bài theo topic, làm 3-5 bài/pattern
                </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                <span className="text-red-400 font-bold">3</span>
                <div className="text-slate-300 text-sm">
                    <strong>Tuần 6-8</strong>: Mix random — simulate interview, giới hạn 30-45 phút/bài
                </div>
            </div>
        </div>

        <Callout type="tip">
            Mục tiêu: <Highlight>~150 bài</Highlight> (70% Medium, 20% Easy, 10% Hard).
            Dùng <strong>NeetCode 150</strong> hoặc <strong>Grind 75</strong> — đã curated sẵn danh sách tốt nhất.
        </Callout>

        {/* ===== PHASE 5 ===== */}
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
        <Heading2>Phase 6 — Mock Interview & Behavioral (2-4 tuần)</Heading2>

        <Heading3>6.1 Mock Interview</Heading3>
        <div className="my-4 space-y-2">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-pink-400">🎤</span>
                <span className="text-slate-300 text-sm"><strong>Pramp.com</strong> — mock interview miễn phí với người thật</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-pink-400">🎤</span>
                <span className="text-slate-300 text-sm"><strong>interviewing.io</strong> — anonymous mock interview với engineers từ big tech</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-pink-400">🎤</span>
                <span className="text-slate-300 text-sm">Rủ bạn bè mock lẫn nhau — <strong>practice nói to lên</strong> khi giải bài!</span>
            </div>
        </div>

        <Heading3>6.2 Behavioral Interview (STAR Method)</Heading3>
        <Paragraph>
            Big tech đánh giá <Highlight>culture fit</Highlight> rất nghiêm túc.
            Chuẩn bị 5-7 câu chuyện theo format <Highlight>STAR</Highlight>:
        </Paragraph>

        <div className="my-4 grid grid-cols-2 md:grid-cols-4 gap-2">
            <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-3 text-center">
                <div className="text-blue-400 font-bold text-lg">S</div>
                <div className="text-[var(--text-secondary)] text-xs">Situation</div>
            </div>
            <div className="rounded-xl bg-purple-500/10 border border-purple-500/20 p-3 text-center">
                <div className="text-purple-400 font-bold text-lg">T</div>
                <div className="text-[var(--text-secondary)] text-xs">Task</div>
            </div>
            <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-3 text-center">
                <div className="text-green-400 font-bold text-lg">A</div>
                <div className="text-[var(--text-secondary)] text-xs">Action</div>
            </div>
            <div className="rounded-xl bg-yellow-500/10 border border-yellow-500/20 p-3 text-center">
                <div className="text-yellow-400 font-bold text-lg">R</div>
                <div className="text-[var(--text-secondary)] text-xs">Result</div>
            </div>
        </div>

        <div className="my-4 space-y-2">
            {[
                'Kể về một lần bạn giải quyết conflict trong team?',
                'Dự án khó nhất bạn từng làm?',
                'Khi nào bạn phải đưa ra quyết định kỹ thuật khó?',
                'Bạn từng fail điều gì và học được gì?',
                'Làm sao bạn handle deadline gấp?',
            ].map(q => (
                <div key={q} className="flex items-center gap-3 p-2.5 rounded-lg bg-pink-500/5 border border-pink-500/10">
                    <span className="text-pink-400 text-xs">❓</span>
                    <span className="text-slate-300 text-sm">{q}</span>
                </div>
            ))}
        </div>

        <Callout type="warning">
            Behavioral interview <Highlight>không thể cram</Highlight> — bạn cần chuẩn bị câu chuyện thật từ kinh nghiệm thật.
            Viết ra giấy, luyện nói to, record lại nghe và sửa.
        </Callout>

        {/* ===== TIMELINE ===== */}
        <Heading2>📅 Timeline gợi ý (6-9 tháng)</Heading2>

        <div className="my-6 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
                <thead>
                    <tr className="border-b border-[var(--border-primary)]">
                        <th className="text-left p-3 text-[var(--text-secondary)] font-medium">Tháng</th>
                        <th className="text-left p-3 text-[var(--text-secondary)] font-medium">Phase</th>
                        <th className="text-left p-3 text-[var(--text-secondary)] font-medium">Focus</th>
                        <th className="text-left p-3 text-[var(--text-secondary)] font-medium">Output</th>
                    </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                    <tr className="border-b border-gray-100">
                        <td className="p-3 text-red-400 font-bold">1-2</td>
                        <td className="p-3">CS + JS Core</td>
                        <td className="p-3">Networking, JS engine, closures</td>
                        <td className="p-3">Implement 10 JS utilities</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                        <td className="p-3 text-blue-400 font-bold">3-4</td>
                        <td className="p-3">React + FE</td>
                        <td className="p-3">Hooks, patterns, CSS, perf</td>
                        <td className="p-3">Build 3 UI components thuần</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                        <td className="p-3 text-green-400 font-bold">4-6</td>
                        <td className="p-3">DSA</td>
                        <td className="p-3">LeetCode Easy → Medium</td>
                        <td className="p-3">150 bài, 30 phút/bài</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                        <td className="p-3 text-purple-400 font-bold">6-7</td>
                        <td className="p-3">System Design</td>
                        <td className="p-3">FE architecture, performance</td>
                        <td className="p-3">Design 5 systems</td>
                    </tr>
                    <tr>
                        <td className="p-3 text-pink-400 font-bold">8-9</td>
                        <td className="p-3">Mock + Behavioral</td>
                        <td className="p-3">Mock interview, STAR stories</td>
                        <td className="p-3">10+ mock sessions</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <Heading2>📌 Tóm tắt</Heading2>

        <div className="my-6 space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-red-400 mt-0.5">1.</span>
                <span className="text-[var(--text-secondary)]"><Highlight>Nền tảng CS</Highlight> — đừng skip, đây là thứ phân biệt junior và senior</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-yellow-400 mt-0.5">2.</span>
                <span className="text-[var(--text-secondary)]"><Highlight>JS sâu</Highlight> — hiểu cơ chế, không chỉ syntax. Implement từ scratch</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 mt-0.5">3.</span>
                <span className="text-[var(--text-secondary)]"><Highlight>React + FE</Highlight> — build UI thuần, hiểu rendering, performance</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-green-400 mt-0.5">4.</span>
                <span className="text-[var(--text-secondary)]"><Highlight>DSA</Highlight> — 150 bài LeetCode, focus patterns không phải số lượng</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-purple-400 mt-0.5">5.</span>
                <span className="text-[var(--text-secondary)]"><Highlight>System Design</Highlight> — thiết kế FE architecture, không chỉ vẽ diagram</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-pink-400 mt-0.5">6.</span>
                <span className="text-[var(--text-secondary)]"><Highlight>Mock + Behavioral</Highlight> — practice nói to, chuẩn bị câu chuyện STAR</span>
            </div>
        </div>

        <Callout type="tip">
            Nhớ: <Highlight>Consistency &gt; Intensity</Highlight>. Mỗi ngày 2-3 giờ đều đặn tốt hơn
            cày 10 giờ cuối tuần rồi nghỉ cả tuần. Hãy biến việc học thành thói quen hàng ngày!
        </Callout>
    </>
)

// English content is imported from frontend-interview-roadmap-en.tsx


const frontendInterviewRoadmap: BlogPost = {
    slug: 'frontend-interview-roadmap',
    title: {
        vi: 'Lộ trình phỏng vấn Frontend vào Big Tech — Từ zero đến offer',
        en: 'Frontend Big Tech Interview Roadmap — From Zero to Offer',
    },
    description: {
        vi: 'Lộ trình 6-9 tháng chi tiết để chuẩn bị phỏng vấn Frontend tại FAANG: CS nền tảng, JavaScript sâu, React, DSA, System Design và Behavioral.',
        en: 'A detailed 6-9 month roadmap to prepare for Frontend interviews at FAANG: CS fundamentals, deep JavaScript, React, DSA, System Design, and Behavioral.',
    },
    date: '2025-09-03',
    tags: ['Career', 'Interview', 'Roadmap'],
    emoji: '🎯',
    color: '#f97316',
    content: { vi: viContent, en: enContent },
}

export default frontendInterviewRoadmap
