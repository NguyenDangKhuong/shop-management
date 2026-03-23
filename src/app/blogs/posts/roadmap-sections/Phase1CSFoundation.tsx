'use client'
import { CodeBlock, Heading2, Heading3, Paragraph, Highlight, InlineCode, Callout } from '../../components/BlogComponents'
import { TopicModal } from '../../components/TopicModal'

export default function Phase1CSFoundation() {
    return (
        <>
        <Heading2>Phase 1 — Nền tảng Computer Science (4-6 tuần)</Heading2>

        <Paragraph>
            Nếu bạn bị <Highlight>hỏng nền tảng</Highlight>, đây là bước quan trọng nhất.
            Đừng nhảy thẳng vào React hay LeetCode — hãy xây móng trước.
        </Paragraph>

        <Heading3>1.1 Cách máy tính hoạt động (click để xem chi tiết)</Heading3>
        <div className="my-4 space-y-2">
            <TopicModal title="CPU, RAM, Storage" emoji="🖥️" color="#ef4444" summary="Hiểu data flow cơ bản — dữ liệu đi từ đâu đến đâu khi bạn chạy code" concept="CPU xử lý tính toán, RAM lưu tạm data đang dùng (mất khi tắt máy), Storage (SSD/HDD) lưu vĩnh viễn. Khi chạy code: Storage → RAM → CPU xử lý → kết quả quay về RAM → ghi lại Storage. RAM nhanh nhưng nhỏ, Storage chậm nhưng lớn — đó là lý do cần caching.">
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

            <TopicModal title="Binary, ASCII, Unicode" emoji="🔢" color="#ef4444" summary="Cách máy tính biểu diễn chữ, số, emoji — mọi thứ đều là 0 và 1" concept="Máy tính chỉ hiểu 0 và 1 (binary). ASCII dùng 7 bit mã hóa 128 ký tự tiếng Anh. Unicode (UTF-8/16/32) mở rộng để hỗ trợ mọi ngôn ngữ + emoji trên thế giới. UTF-8 phổ biến nhất vì backward-compatible với ASCII và tiết kiệm bộ nhớ (1-4 bytes/ký tự).">
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

            <TopicModal title="Process vs Thread" emoji="⚙️" color="#ef4444" summary="Hiểu OS quản lý chương trình — tại sao Node.js single-threaded mà vẫn nhanh" concept="Process là chương trình đang chạy với bộ nhớ riêng biệt; Thread là luồng thực thi nhỏ hơn bên trong process, chia sẻ chung bộ nhớ. Node.js dùng 1 thread chính + Event Loop để xử lý I/O không đồng bộ, delegate heavy tasks cho worker threads/OS — nên vẫn nhanh dù single-threaded.">
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
            <TopicModal title="HTTP/HTTPS" emoji="🌐" color="#ef4444" summary="Request/Response cycle, status codes, methods, headers — nền tảng của web" concept="HTTP là giao thức request-response giữa client và server. Mỗi request có method (GET/POST/PUT/DELETE), headers, body. Response có status code (2xx thành công, 3xx redirect, 4xx lỗi client, 5xx lỗi server). HTTPS = HTTP + TLS encryption — mã hóa data truyền tải, ngăn bị đọc trộm giữa đường.">
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

            <TopicModal title="DNS, TCP/IP, WebSocket" emoji="📡" color="#ef4444" summary="Cách browser tìm server và duy trì kết nối" concept="DNS phân giải domain thành IP (như danh bạ điện thoại). TCP/IP đảm bảo data truyền đúng thứ tự, đầy đủ qua 3-way handshake (SYN → SYN-ACK → ACK). WebSocket nâng cấp HTTP thành kết nối 2 chiều liên tục — server có thể push data cho client mà không cần client request (dùng cho chat, real-time).">
                <Paragraph>Khi bạn gõ <InlineCode>google.com</InlineCode>, đây là toàn bộ hành trình:</Paragraph>

                <Callout type="info">🎬 <strong>Ví dụ thực tế:</strong> Bạn muốn gọi điện cho Khuong nhưng chỉ biết tên, không biết số. Đây là flow tương tự khi browser gõ URL!</Callout>

                <CodeBlock title="🗺️ The Full Journey — gõ google.com + Enter">{`① DNS (Danh bạ điện thoại)
   google.com → 142.250.80.46
   "Số nhà của Google ở đâu?"
   ╰─ Check: Browser cache → OS cache → Router → ISP → Root DNS

② TCP (Bắt tay — tôi muốn nói chuyện)
   🤝 3-way Handshake:
   Client: "Ê, nghe được không?" ──── SYN ────→ Server
   Client: ←── SYN-ACK ──── "Nghe, bạn nghe tôi không?"
   Client: "Nghe rõ, nói đi!" ──── ACK ────→ Server
   ╰─ Giờ 2 bên có kênh tin cậy, data đúng thứ tự, không mất gói

③ TLS (Khóa cửa — nếu HTTPS)
   Thêm 1-2 vòng bắt tay nữa để encrypt
   ╰─ Server đưa "CMND" (certificate) → Client verify → tạo shared key mã hóa

④ HTTP (Gửi thư — hỏi và trả lời)
   Client gửi: GET / HTTP/1.1 (xin trang chủ)
   Server trả: 200 OK + HTML file
   ╰─ Stateless: mỗi request độc lập, không nhớ request trước

⑤ Browser (Vẽ trang web)
   Parse HTML → Build DOM → Parse CSS → Layout → Paint → Display!`}</CodeBlock>

                <Heading3>HTTP vs WebSocket vs SSE — khi nào dùng gì?</Heading3>
                <CodeBlock title="3 cách giao tiếp Client ↔ Server">{`HTTP:      Client hỏi → Server trả lời → ĐÓNG
           📬 Giống gửi thư: hỏi 1 câu, đợi trả lời, xong

WebSocket: Client ↔ Server giữ kết nối MỞ → nói qua nói lại
           📞 Giống gọi điện: 2 bên nói bất cứ lúc nào

SSE:       Server → Client (1 chiều, server push liên tục)
           📻 Giống nghe radio: server phát, client nghe`}</CodeBlock>

                <div className="my-3 overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead><tr className="border-b border-[var(--border-primary)]"><th className="text-left p-2 text-slate-400">Tình huống</th><th className="text-left p-2 text-blue-400">Dùng</th><th className="text-left p-2 text-green-400">Ví dụ</th></tr></thead>
                        <tbody className="text-[var(--text-secondary)]">
                            <tr className="border-b border-gray-100"><td className="p-2">Lấy data bình thường</td><td className="p-2"><strong>HTTP (REST)</strong></td><td className="p-2">GET /api/products</td></tr>
                            <tr className="border-b border-gray-100"><td className="p-2">Chat real-time 2 chiều</td><td className="p-2"><strong>WebSocket</strong></td><td className="p-2">Messenger, Slack</td></tr>
                            <tr className="border-b border-gray-100"><td className="p-2">Live notifications</td><td className="p-2"><strong>SSE</strong></td><td className="p-2">GitHub deploy status</td></tr>
                            <tr><td className="p-2">Live stock prices</td><td className="p-2"><strong>SSE / WebSocket</strong></td><td className="p-2">Trading app</td></tr>
                        </tbody>
                    </table>
                </div>

                <Heading3>Chi tiết từng bước</Heading3>
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

            <TopicModal title="REST vs GraphQL" emoji="🔌" color="#ef4444" summary="Hai mô hình API phổ biến — khi nào dùng cái nào" concept="REST dùng nhiều endpoints cố định (GET /users, POST /orders), đơn giản, có HTTP caching. GraphQL dùng 1 endpoint duy nhất, client tự chọn fields cần lấy — tránh over-fetching/under-fetching. REST tốt cho CRUD đơn giản và caching; GraphQL tốt cho UI phức tạp cần data từ nhiều nguồn trong 1 request.">
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

            <TopicModal title="CORS, Cookies, JWT" emoji="🔐" color="#ef4444" summary="Authentication flow — cách web apps xác thực người dùng" concept="CORS là cơ chế browser cho phép/chặn request cross-origin (domain A gọi API domain B). Cookie lưu session phía server, tự gửi kèm mỗi request — dễ dùng nhưng chỉ hoạt động same-origin. JWT là token tự chứa thông tin (header.payload.signature), stateless, phù hợp cho API authentication — nhưng không revoke được trước khi hết hạn.">
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

            <TopicModal title="Browser Storage" emoji="💾" color="#ef4444" summary="localStorage, sessionStorage, cookies, IndexedDB — lưu data phía client" concept="localStorage lưu vĩnh viễn (~5-10MB), sessionStorage mất khi đóng tab (~5MB), cookies gửi kèm mọi HTTP request (~4KB, có expiry). IndexedDB là database NoSQL trong browser cho data lớn (hàng trăm MB). Chọn: cookies cho auth, localStorage cho preferences, IndexedDB cho offline data/cache lớn.">
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
            <TopicModal title="Git nâng cao" emoji="🔧" color="#ef4444" summary="rebase, cherry-pick, bisect, stash — những lệnh phân biệt junior vs senior" concept="Rebase viết lại lịch sử commit thành đường thẳng (sạch hơn merge). Cherry-pick chọn 1 commit cụ thể apply vào branch khác. Bisect dùng binary search tìm commit gây bug. Stash lưu tạm changes chưa commit. Rebase cho feature branches, merge cho shared branches — không rebase code đã push.">
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

            <TopicModal title="Linux/Terminal" emoji="💻" color="#ef4444" summary="Navigation, permissions, pipes — nền tảng cho DevOps và debugging" concept="Linux dùng file system dạng cây (/ là root). Permissions gồm rwx cho owner/group/others (chmod 755). Pipe (|) chuyển output lệnh này thành input lệnh kia. Các lệnh quan trọng: grep (tìm text), find (tìm file), ps/top (xem process), tail -f (theo dõi log real-time), ssh (remote access).">
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

        </>
    )
}
