'use client'
import { CodeBlock, Heading2, Heading3, Paragraph, Highlight, InlineCode, Callout } from '../../../components/BlogComponents'
import { TopicModal } from '../../../components/TopicModal'

export default function Phase1CSFoundation() {
    return (
        <>
        <Heading2>Phase 1 — Computer Science Fundamentals (4-6 weeks)</Heading2>

        <Paragraph>
            If your <Highlight>fundamentals are weak</Highlight>, this is the most important step.
            Don&apos;t jump straight into React or LeetCode — build a solid foundation first.
        </Paragraph>

        <Heading3>1.1 How Computers Work (click for details)</Heading3>
        <div className="my-4 space-y-2">
            <TopicModal title="CPU, RAM, Storage" emoji="🖥️" color="#ef4444" summary="Understand the basic data flow — where data goes when you run code">
                <Paragraph>When you run <InlineCode>node app.js</InlineCode>, here&apos;s what happens:</Paragraph>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">1. Storage (SSD/HDD) → RAM</div>
                        <div className="text-slate-300 text-sm mt-1">The file <InlineCode>app.js</InlineCode> is read from disk into RAM. RAM is ~100x faster than SSD but loses data when powered off (volatile memory).</div>
                        <div className="text-slate-400 text-xs mt-2 italic">💡 SSDs use flash memory (no moving parts), ~50-100x faster than HDDs. NVMe SSDs are ~5x faster than SATA SSDs.</div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">2. RAM → CPU (Fetch-Decode-Execute cycle)</div>
                        <div className="text-slate-300 text-sm mt-1">CPU reads instructions from RAM, processing each one in a cycle:</div>
                        <div className="text-slate-300 text-sm mt-1 pl-3">
                            • <strong>Fetch</strong>: Get instruction from RAM at the address in Program Counter<br />
                            • <strong>Decode</strong>: Decoder determines what the instruction does<br />
                            • <strong>Execute</strong>: ALU (Arithmetic Logic Unit) performs the computation
                        </div>
                        <div className="text-slate-400 text-xs mt-2 italic">💡 Modern CPUs use <strong>pipelining</strong> — processing multiple instructions in parallel at different stages, like an assembly line.</div>
                    </div>
                    <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="text-yellow-400 font-bold text-sm">3. CPU Cache — the secret to speed</div>
                        <div className="text-slate-300 text-sm mt-1">
                            CPU doesn&apos;t read directly from RAM every time — too slow! Instead, data is copied into <strong>cache</strong>:
                        </div>
                        <div className="text-slate-300 text-sm mt-1 pl-3">
                            • <strong>L1 Cache</strong> (~32KB): Fastest (~1ns), per-core<br />
                            • <strong>L2 Cache</strong> (~256KB): Fast (~4ns), per-core<br />
                            • <strong>L3 Cache</strong> (~8-32MB): Slower (~10ns), shared between cores
                        </div>
                        <div className="text-slate-400 text-xs mt-2 italic">💡 <strong>Cache miss</strong> occurs when data isn&apos;t in cache → must read from RAM (~100ns). This is why arrays are faster than linked lists in practice — arrays read contiguously in memory (cache-friendly).</div>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">4. Multi-core — why does your machine have 8 cores?</div>
                        <div className="text-slate-300 text-sm mt-1">
                            Each core is a small CPU that can run 1 thread at a time. 8 cores = max 8 truly parallel threads.
                        </div>
                        <div className="text-slate-400 text-xs mt-2 italic">💡 JavaScript is single-threaded → only uses 1 core. To leverage multi-core in Node.js: use the <InlineCode>cluster</InlineCode> module or <InlineCode>worker_threads</InlineCode>.</div>
                    </div>
                </div>
                <Paragraph><strong>Access Speed (Memory Hierarchy):</strong></Paragraph>
                <CodeBlock title="Latency comparison">{`CPU Register  →  ~0.3ns   (fastest)
L1 Cache      →  ~1ns
L2 Cache      →  ~4ns
L3 Cache      →  ~10ns
RAM           →  ~100ns    (~100x slower than L1)
SSD (NVMe)    →  ~25μs     (~25,000x slower than L1)
SSD (SATA)    →  ~100μs
HDD           →  ~10ms     (~10,000,000x slower than L1)
Network       →  ~40ms     (US East → West)`}</CodeBlock>
                <Callout type="tip">📚 Resource: <strong>CS50 (Harvard)</strong> — Weeks 0-2. Free on YouTube. Also read: <strong>&quot;What every programmer should know about memory&quot;</strong> by Ulrich Drepper.</Callout>
            </TopicModal>

            <TopicModal title="Binary, ASCII, Unicode" emoji="🔢" color="#ef4444" summary="How computers represent text, numbers, emoji — everything is 0s and 1s">
                <Paragraph>Computers only understand <Highlight>0 and 1</Highlight> (bits). All data — numbers, text, images, video — is encoded as binary strings.</Paragraph>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <div className="text-red-400 font-bold text-sm">Binary (Base 2)</div>
                        <div className="text-slate-300 text-sm mt-1">Number 42 = <InlineCode>00101010</InlineCode> (8 bits = 1 byte)<br />1 byte = 256 values (0-255)<br />4 bytes = 32 bits = ~4 billion values</div>
                        <div className="text-slate-300 text-sm mt-2 pl-3">
                            • <strong>Hexadecimal (base 16)</strong>: Shorthand for binary. <InlineCode>0xFF</InlineCode> = 255 = <InlineCode>11111111</InlineCode>. Common in CSS colors: <InlineCode>#FF5733</InlineCode><br />
                            • <strong>Bitwise operators</strong>: <InlineCode>&amp;</InlineCode> (AND), <InlineCode>|</InlineCode> (OR), <InlineCode>^</InlineCode> (XOR), <InlineCode>&lt;&lt;</InlineCode> (shift left = multiply by 2), <InlineCode>&gt;&gt;</InlineCode> (shift right = divide by 2)
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                        <div className="text-orange-400 font-bold text-sm">Negative Numbers &amp; Decimals (Two&apos;s Complement &amp; IEEE 754)</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <strong>Two&apos;s complement</strong>: How negative numbers are stored. -1 = <InlineCode>11111111</InlineCode> (flip bits + 1)<br />
                            • <strong>Floating point (IEEE 754)</strong>: Decimals = sign bit + exponent + mantissa<br />
                            • This is why <InlineCode>0.1 + 0.2 ≠ 0.3</InlineCode> in JS — binary rounding error!
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">ASCII (128 characters)</div>
                        <div className="text-slate-300 text-sm mt-1">A=65, B=66, a=97, 0=48<br />Only supports English + basic characters<br />1 character = 1 byte</div>
                        <div className="text-slate-400 text-xs mt-2 italic">💡 Trick: <InlineCode>&apos;a&apos;.charCodeAt(0) - &apos;A&apos;.charCodeAt(0) = 32</InlineCode>. Toggle case with XOR: <InlineCode>char ^ 32</InlineCode></div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">Unicode &amp; UTF-8</div>
                        <div className="text-slate-300 text-sm mt-1">Supports <strong>all languages</strong> + emoji 🎉<br />UTF-8: 1-4 bytes/character, backward compatible with ASCII<br />&quot;café&quot; = 4 chars but 5 bytes (é = 2 bytes)</div>
                        <div className="text-slate-300 text-sm mt-2 pl-3">
                            • <strong>UTF-8</strong>: Web standard, variable-length (1-4 bytes). ASCII chars still 1 byte<br />
                            • <strong>UTF-16</strong>: Used internally by JS (2 or 4 bytes). <InlineCode>&apos;😀&apos;.length = 2</InlineCode> because emoji uses surrogate pairs!<br />
                            • <strong>UTF-32</strong>: Fixed 4 bytes/char, wastes memory but fast access
                        </div>
                    </div>
                </div>
                <CodeBlock title="Try in JS">{`// ASCII & Unicode basics
'A'.charCodeAt(0)          // 65 (ASCII)
String.fromCharCode(65)    // 'A'
'😀'.codePointAt(0)        // 128512 (Unicode)
new TextEncoder().encode('café').length // 5 bytes (UTF-8)

// Floating point gotcha!
0.1 + 0.2                  // 0.30000000000000004
(0.1 + 0.2).toFixed(1)     // '0.3' (workaround)

// Emoji length surprise
'😀'.length                // 2 (UTF-16 surrogate pair!)
[...'😀'].length           // 1 (spread = correct codepoint)
'👨‍👩‍👧'.length              // 8 (ZWJ sequence = multiple codepoints!)`}</CodeBlock>
                <Callout type="warning">Common interview question: &quot;Why is <InlineCode>0.1 + 0.2 !== 0.3</InlineCode>?&quot; — Because computers use IEEE 754 binary floating point, and 0.1 can&apos;t be represented exactly in binary (like 1/3 = 0.333... in decimal).</Callout>
            </TopicModal>

            <TopicModal title="Process vs Thread" emoji="⚙️" color="#ef4444" summary="How the OS manages programs — why Node.js is single-threaded yet fast">
                <Paragraph>When you open Chrome + VS Code + Terminal, the OS manages them using <Highlight>Processes</Highlight> and <Highlight>Threads</Highlight>.</Paragraph>
                <div className="my-3 overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead><tr className="border-b border-[var(--border-primary)]"><th className="text-left p-2 text-slate-400">Criteria</th><th className="text-left p-2 text-blue-400">Process</th><th className="text-left p-2 text-green-400">Thread</th></tr></thead>
                        <tbody className="text-[var(--text-secondary)]">
                            <tr className="border-b border-gray-100"><td className="p-2">Memory</td><td className="p-2">Isolated</td><td className="p-2">Shares heap with process</td></tr>
                            <tr className="border-b border-gray-100"><td className="p-2">Creation</td><td className="p-2">Heavy (~MB)</td><td className="p-2">Light (~KB)</td></tr>
                            <tr className="border-b border-gray-100"><td className="p-2">Communication</td><td className="p-2">IPC (Inter-Process Communication)</td><td className="p-2">Shared memory (faster)</td></tr>
                            <tr className="border-b border-gray-100"><td className="p-2">Crash</td><td className="p-2">Doesn&apos;t affect other processes</td><td className="p-2">Can crash entire process</td></tr>
                            <tr><td className="p-2">Example</td><td className="p-2">Each Chrome tab = 1 process</td><td className="p-2">JS main thread + Web Workers</td></tr>
                        </tbody>
                    </table>
                </div>

                <Heading3>Node.js Event Loop — why single-threaded yet fast?</Heading3>
                <Paragraph>Node.js runs JS on <strong>1 main thread</strong>, but handles thousands of concurrent connections thanks to the <Highlight>Event Loop</Highlight> + <Highlight>Non-blocking I/O</Highlight>:</Paragraph>
                <CodeBlock title="Event Loop flow">{`┌─────────────────────────────┐
│         Call Stack           │  ← JS code runs here (sync)
│   (single-threaded)          │
└─────────┬───────────────────┘
          │ async task (fs, http, timer...)
          ▼
┌─────────────────────────────┐
│      libuv Thread Pool       │  ← 4 worker threads (default)
│   (fs read, DNS lookup,      │     handles heavy I/O
│    crypto, compression)      │
└─────────┬───────────────────┘
          │ callback when done
          ▼
┌─────────────────────────────┐
│       Event Queue            │  ← Callbacks queue up here
│  (microtasks → macrotasks)   │     Main thread free → picks
└─────────────────────────────┘

Priority order:
1. Microtasks: Promise.then, queueMicrotask, process.nextTick
2. Macrotasks: setTimeout, setInterval, I/O callbacks
3. Check: setImmediate (Node.js only)`}</CodeBlock>

                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">Web Workers (Browser)</div>
                        <div className="text-slate-300 text-sm mt-1">
                            Run JS on a separate thread. Communicate via <InlineCode>postMessage()</InlineCode>.<br />
                            Used for: heavy computation (image processing, parsing), won&apos;t block UI.<br />
                            <strong>Limitations</strong>: No DOM access, no direct memory sharing (use <InlineCode>SharedArrayBuffer</InlineCode> if needed).
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">Worker Threads (Node.js)</div>
                        <div className="text-slate-300 text-sm mt-1">
                            Similar to Web Workers for Node.js. Shares memory via <InlineCode>SharedArrayBuffer</InlineCode>.<br />
                            Used for: CPU-intensive tasks (image resize, data processing).
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">Cluster module (Node.js)</div>
                        <div className="text-slate-300 text-sm mt-1">
                            Fork multiple child processes (each has its own Event Loop).<br />
                            Leverages multi-core CPU. PM2 uses cluster mode by default.
                        </div>
                    </div>
                </div>
                <Callout type="warning">Classic interview question: &quot;Does setTimeout(fn, 0) run immediately?&quot; — <strong>No!</strong> fn is placed in the macrotask queue and waits for the call stack to be empty + all microtasks to finish.</Callout>
                <Callout type="tip">📚 Resource: <strong>Operating Systems: Three Easy Pieces</strong> — free book, excellent quality. Also watch <strong>&quot;What the heck is the event loop anyway?&quot;</strong> by Philip Roberts (JSConf).</Callout>
            </TopicModal>
        </div>

        <Heading3>1.2 Networking Basics (click for details)</Heading3>
        <div className="my-4 space-y-2">
            <TopicModal title="HTTP/HTTPS" emoji="🌐" color="#ef4444" summary="Request/Response cycle, status codes, methods, headers — the foundation of the web">
                <Paragraph><Highlight>HTTP</Highlight> (HyperText Transfer Protocol) = client-server protocol. Browser sends a <strong>Request</strong>, server returns a <strong>Response</strong>. Each request is independent (stateless).</Paragraph>

                <Heading3>Anatomy of an HTTP Request</Heading3>
                <CodeBlock title="HTTP Request structure">{`// Request
GET /api/users?page=1 HTTP/1.1     ← Method + Path + Version
Host: example.com                  ← Required
Authorization: Bearer eyJhbG...    ← Auth token
Content-Type: application/json     ← Body format
Accept: application/json           ← What client wants
Cache-Control: no-cache            ← Skip cache

// Response
HTTP/1.1 200 OK                    ← Status code
Content-Type: application/json
Set-Cookie: session=abc; HttpOnly  ← Server sets cookie
X-RateLimit-Remaining: 99         ← Rate limiting

{"users": [...], "total": 100}`}</CodeBlock>

                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">HTTP Methods (Idempotent?)</div>
                        <div className="text-slate-300 text-sm mt-1">
                            <InlineCode>GET</InlineCode> = read data (✅ idempotent, ✅ cacheable)<br />
                            <InlineCode>POST</InlineCode> = create new (❌ not idempotent)<br />
                            <InlineCode>PUT</InlineCode> = full update (✅ idempotent)<br />
                            <InlineCode>PATCH</InlineCode> = partial update (❌ not idempotent)<br />
                            <InlineCode>DELETE</InlineCode> = delete (✅ idempotent)
                        </div>
                        <div className="text-slate-400 text-xs mt-2 italic">💡 <strong>Idempotent</strong> = calling multiple times yields the same result. DELETE /users/1 called 10 times still only deletes 1 user.</div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">Status Codes (must memorize!)</div>
                        <div className="text-slate-300 text-sm mt-1">
                            <strong>2xx Success</strong>: 200 OK, 201 Created, 204 No Content<br />
                            <strong>3xx Redirect</strong>: 301 Moved Permanently, 302 Found, 304 Not Modified<br />
                            <strong>4xx Client Error</strong>: 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 429 Too Many Requests<br />
                            <strong>5xx Server Error</strong>: 500 Internal Error, 502 Bad Gateway, 503 Service Unavailable
                        </div>
                        <div className="text-slate-400 text-xs mt-2 italic">💡 <strong>401 vs 403</strong>: 401 = not logged in (who are you?), 403 = logged in but no permission (I know you, but no access).</div>
                    </div>
                    <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="text-yellow-400 font-bold text-sm">HTTP/1.1 → HTTP/2 → HTTP/3</div>
                        <div className="text-slate-300 text-sm mt-1">
                            <strong>HTTP/1.1</strong>: 1 request per connection. Head-of-line blocking.<br />
                            <strong>HTTP/2</strong>: Multiplexing (multiple requests on 1 TCP connection), header compression, server push.<br />
                            <strong>HTTP/3</strong>: Uses QUIC (UDP-based) instead of TCP. Faster, no 3-way handshake needed.
                        </div>
                        <div className="text-slate-400 text-xs mt-2 italic">💡 Next.js automatically uses HTTP/2 when deployed on Vercel. Chrome DevTools → Network tab → &quot;Protocol&quot; column to check.</div>
                    </div>
                </div>
                <Paragraph><Highlight>HTTPS</Highlight> = HTTP + TLS encryption. Data is encrypted between client-server. Certificates are verified by a CA (Certificate Authority). <strong>Required</strong> for PWA, Service Workers, and most modern APIs.</Paragraph>
                <Callout type="tip">Interview question: &quot;What happens when you type a URL and press Enter?&quot; — DNS → TCP handshake → TLS handshake → HTTP request → Server process → Response → Browser render. Know each step!</Callout>
            </TopicModal>

            <TopicModal title="DNS, TCP/IP, WebSocket" emoji="📡" color="#ef4444" summary="How browsers find servers and maintain connections">
                <Paragraph>When you type <InlineCode>google.com</InlineCode>, here&apos;s the complete journey:</Paragraph>

                <Callout type="info">🎬 <strong>Real-world analogy:</strong> You want to call Khuong but only know his name, not his number. This is the same flow as when a browser hits a URL!</Callout>

                <CodeBlock title="🗺️ The Full Journey — type google.com + Enter">{`① DNS (Phone Book)
   google.com → 142.250.80.46
   "What's Google's address?"
   ╰─ Check: Browser cache → OS cache → Router → ISP → Root DNS

② TCP (Handshake — I want to talk)
   🤝 3-way Handshake:
   Client: "Hey, can you hear me?" ──── SYN ────→ Server
   Client: ←── SYN-ACK ──── "Yes, can you hear me?"
   Client: "Loud and clear!" ──── ACK ────→ Server
   ╰─ Now both sides have a reliable channel, in-order, no packet loss

③ TLS (Lock the door — if HTTPS)
   1-2 more round-trips to encrypt
   ╰─ Server shows "ID card" (certificate) → Client verifies → create shared encryption key

④ HTTP (Send letter — ask and answer)
   Client sends: GET / HTTP/1.1 (requesting homepage)
   Server replies: 200 OK + HTML file
   ╰─ Stateless: each request is independent, no memory of previous ones

⑤ Browser (Paint the page)
   Parse HTML → Build DOM → Parse CSS → Layout → Paint → Display!`}</CodeBlock>

                <Heading3>HTTP vs WebSocket vs SSE — when to use what?</Heading3>
                <CodeBlock title="3 ways Client ↔ Server communicate">{`HTTP:      Client asks → Server answers → CLOSE
           📬 Like sending mail: ask once, wait for reply, done

WebSocket: Client ↔ Server keep connection OPEN → talk back and forth
           📞 Like a phone call: either side speaks anytime

SSE:       Server → Client (one-way, server pushes continuously)
           📻 Like listening to radio: server broadcasts, client listens`}</CodeBlock>

                <div className="my-3 overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead><tr className="border-b border-[var(--border-primary)]"><th className="text-left p-2 text-slate-400">Scenario</th><th className="text-left p-2 text-blue-400">Use</th><th className="text-left p-2 text-green-400">Example</th></tr></thead>
                        <tbody className="text-[var(--text-secondary)]">
                            <tr className="border-b border-gray-100"><td className="p-2">Normal data fetching</td><td className="p-2"><strong>HTTP (REST)</strong></td><td className="p-2">GET /api/products</td></tr>
                            <tr className="border-b border-gray-100"><td className="p-2">Two-way real-time chat</td><td className="p-2"><strong>WebSocket</strong></td><td className="p-2">Messenger, Slack</td></tr>
                            <tr className="border-b border-gray-100"><td className="p-2">Live notifications</td><td className="p-2"><strong>SSE</strong></td><td className="p-2">GitHub deploy status</td></tr>
                            <tr><td className="p-2">Live stock prices</td><td className="p-2"><strong>SSE / WebSocket</strong></td><td className="p-2">Trading app</td></tr>
                        </tbody>
                    </table>
                </div>

                <Heading3>Step-by-step details</Heading3>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="text-yellow-400 font-bold text-sm">1. DNS Resolution (&quot;The Internet&apos;s Phone Book&quot;)</div>
                        <div className="text-slate-300 text-sm mt-1">
                            <InlineCode>google.com</InlineCode> → <InlineCode>142.250.80.46</InlineCode><br />
                            Lookup order: Browser cache → OS cache → Router → ISP DNS → Root DNS
                        </div>
                        <div className="text-slate-300 text-sm mt-2 pl-3">
                            • <strong>A Record</strong>: domain → IPv4 address<br />
                            • <strong>AAAA Record</strong>: domain → IPv6 address<br />
                            • <strong>CNAME</strong>: domain → another domain (alias)<br />
                            • <strong>MX</strong>: domain → mail server<br />
                            • <strong>TTL</strong>: how long to cache DNS record (usually 5 min - 24 hours)
                        </div>
                        <div className="text-slate-400 text-xs mt-2 italic">💡 Use <InlineCode>nslookup google.com</InlineCode> or <InlineCode>dig google.com</InlineCode> to view DNS records in your terminal.</div>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">2. TCP 3-way Handshake + TLS</div>
                        <div className="text-slate-300 text-sm mt-1">
                            <strong>TCP Handshake</strong> (establish reliable connection):<br />
                            Client: SYN → Server: SYN-ACK → Client: ACK (~1 RTT)
                        </div>
                        <div className="text-slate-300 text-sm mt-2">
                            <strong>TLS Handshake</strong> (if HTTPS, adds ~1-2 RTT):<br />
                            1. Client sends supported cipher suites<br />
                            2. Server sends certificate + public key<br />
                            3. Client verifies certificate with CA<br />
                            4. Both create shared session key (symmetric) to encrypt data
                        </div>
                        <div className="text-slate-400 text-xs mt-2 italic">💡 TCP guarantees: in-order delivery, no packet loss, retransmit on failure. UDP doesn&apos;t — faster but unreliable (used for video calls, gaming).</div>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">3. WebSocket vs HTTP vs SSE</div>
                        <div className="text-slate-300 text-sm mt-1">
                            <strong>HTTP</strong>: request-response (client asks, server answers, closes)<br />
                            <strong>WebSocket</strong>: full-duplex (two-way, keeps connection open)<br />
                            <strong>SSE</strong> (Server-Sent Events): one-way server → client (simpler than WebSocket)
                        </div>
                        <div className="text-slate-300 text-sm mt-2 pl-3">
                            • <strong>Chat app</strong>: WebSocket (needs two-way)<br />
                            • <strong>Live notifications</strong>: SSE or WebSocket<br />
                            • <strong>Live data feed</strong>: SSE (simple, auto-reconnect)<br />
                            • <strong>REST API</strong>: HTTP (most common)
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <div className="text-red-400 font-bold text-sm">4. OSI Model (7 layers) — interview classic</div>
                        <div className="text-slate-300 text-sm mt-1">
                            Frontend devs should know at least 4 layers:
                        </div>
                        <div className="text-slate-300 text-sm mt-1 pl-3">
                            • <strong>Layer 7 (Application)</strong>: HTTP, WebSocket, DNS ← <strong>you work here</strong><br />
                            • <strong>Layer 4 (Transport)</strong>: TCP, UDP<br />
                            • <strong>Layer 3 (Network)</strong>: IP, routing<br />
                            • <strong>Layer 1-2 (Physical/Data Link)</strong>: Ethernet, WiFi
                        </div>
                    </div>
                </div>
                <Callout type="tip">📚 Real-world examples: Next.js API Routes use HTTP. n8n webhooks use HTTP. TikTok live uses WebSocket. Vercel serverless functions use HTTP/2.</Callout>
            </TopicModal>

            <TopicModal title="REST vs GraphQL" emoji="🔌" color="#ef4444" summary="Two popular API models — when to use which">
                <div className="my-3 overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead><tr className="border-b border-[var(--border-primary)]"><th className="text-left p-2 text-slate-400">Criteria</th><th className="text-left p-2 text-blue-400">REST</th><th className="text-left p-2 text-purple-400">GraphQL</th></tr></thead>
                        <tbody className="text-[var(--text-secondary)]">
                            <tr className="border-b border-gray-100"><td className="p-2">Type</td><td className="p-2">Multiple endpoints</td><td className="p-2">Single endpoint</td></tr>
                            <tr className="border-b border-gray-100"><td className="p-2">Data fetching</td><td className="p-2">Server decides what to return</td><td className="p-2">Client picks needed fields</td></tr>
                            <tr className="border-b border-gray-100"><td className="p-2">Over-fetching</td><td className="p-2">Common</td><td className="p-2">Never</td></tr>
                            <tr className="border-b border-gray-100"><td className="p-2">Under-fetching</td><td className="p-2">Need multiple endpoints</td><td className="p-2">1 query gets everything</td></tr>
                            <tr className="border-b border-gray-100"><td className="p-2">Caching</td><td className="p-2">Simple HTTP caching</td><td className="p-2">More complex (Apollo cache)</td></tr>
                            <tr className="border-b border-gray-100"><td className="p-2">Error handling</td><td className="p-2">HTTP status codes</td><td className="p-2">Always 200, errors in body</td></tr>
                            <tr><td className="p-2">Used by</td><td className="p-2">Most APIs</td><td className="p-2">Facebook, GitHub, Shopify</td></tr>
                        </tbody>
                    </table>
                </div>
                <CodeBlock title="REST vs GraphQL example">{`// REST: Need 3 requests to get data for a profile page
GET /api/users/1           → { id: 1, name: "An", ... }
GET /api/users/1/posts     → [{ title: "...", ... }]
GET /api/users/1/followers → [{ name: "...", ... }]
// Problem: 3 round-trips + over-fetching extra fields

// GraphQL: 1 single request, only the fields you need
POST /graphql
query {
  user(id: 1) {
    name
    posts(limit: 5) { title, createdAt }
    followers { name }
  }
}
→ Exactly the data needed, nothing extra!`}</CodeBlock>

                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <div className="text-red-400 font-bold text-sm">N+1 Problem (both REST and GraphQL)</div>
                        <div className="text-slate-300 text-sm mt-1">
                            Fetching 10 posts, each needing its author → 1 query for posts + 10 queries for authors = 11 queries!<br />
                            <strong>Solutions</strong>: Batch loading (DataLoader), JOIN queries, or <InlineCode>populate()</InlineCode> in Mongoose.
                        </div>
                    </div>
                </div>
                <Callout type="tip">In practice, most frontend projects use <strong>REST</strong>. GraphQL is common at large companies (Meta, Shopify) or apps with complex UI needing flexible data fetching.</Callout>
            </TopicModal>

            <TopicModal title="CORS, Cookies, JWT" emoji="🔐" color="#ef4444" summary="Authentication flow — how web apps verify users">
                <Heading3>CORS (Cross-Origin Resource Sharing)</Heading3>
                <Paragraph>Browsers block requests from domain A to domain B (<Highlight>Same-Origin Policy</Highlight>). Servers must allow it via the <InlineCode>Access-Control-Allow-Origin</InlineCode> header.</Paragraph>
                <CodeBlock title="CORS Preflight flow">{`// 1. Browser sends Preflight (OPTIONS) before the actual request
OPTIONS /api/data HTTP/1.1
Origin: https://myapp.com
Access-Control-Request-Method: POST
Access-Control-Request-Headers: Content-Type, Authorization

// 2. Server responds with permissions
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: https://myapp.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Max-Age: 86400     ← Cache preflight for 24h

// 3. Browser sends the actual request
POST /api/data ...`}</CodeBlock>
                <Callout type="warning"><strong>Simple requests</strong> (GET, POST with Content-Type: form-data) don&apos;t need preflight. Only complex requests (custom headers, PUT/DELETE) trigger OPTIONS.</Callout>

                <Heading3>JWT (JSON Web Token) — anatomy</Heading3>
                <CodeBlock title="JWT structure">{`// JWT = 3 parts separated by dots:
eyJhbGciOi...    ← Header (algorithm + type)
eyJzdWIiOi...    ← Payload (user data, exp, iat)
SflKxwRJSM...    ← Signature (verify not tampered)

// Decoded payload:
{
  "sub": "user_123",
  "name": "Khuong",
  "role": "admin",
  "iat": 1710000000,      ← issued at
  "exp": 1710086400       ← expires (24h later)
}`}</CodeBlock>

                <Heading3>Cookies vs JWT vs Session</Heading3>
                <div className="my-3 overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead><tr className="border-b border-[var(--border-primary)]"><th className="text-left p-2 text-slate-400">Criteria</th><th className="text-left p-2 text-blue-400">Cookie + Session</th><th className="text-left p-2 text-green-400">JWT</th></tr></thead>
                        <tbody className="text-[var(--text-secondary)]">
                            <tr className="border-b border-gray-100"><td className="p-2">Stored in</td><td className="p-2">Browser (auto-sent each request)</td><td className="p-2">Client (localStorage/memory/cookie)</td></tr>
                            <tr className="border-b border-gray-100"><td className="p-2">Stateful/less</td><td className="p-2">Stateful — server stores session</td><td className="p-2">Stateless — token contains data</td></tr>
                            <tr className="border-b border-gray-100"><td className="p-2">XSS risk</td><td className="p-2"><InlineCode>httpOnly</InlineCode> + <InlineCode>Secure</InlineCode> flags protect</td><td className="p-2">If in localStorage → XSS risk!</td></tr>
                            <tr className="border-b border-gray-100"><td className="p-2">CSRF risk</td><td className="p-2">Yes — needs CSRF token</td><td className="p-2">No (if not using cookies)</td></tr>
                            <tr className="border-b border-gray-100"><td className="p-2">Scale</td><td className="p-2">Needs shared session store (Redis)</td><td className="p-2">Easy to scale (stateless)</td></tr>
                            <tr><td className="p-2">Revoke</td><td className="p-2">Delete session on server</td><td className="p-2">Hard — need blacklist or short expiry</td></tr>
                        </tbody>
                    </table>
                </div>
                <Callout type="warning">Best practice: Store JWT in <Highlight>httpOnly cookie</Highlight> (no XSS + auto-sent) + CSRF protection. Or store in memory (JS variable) + refresh token in httpOnly cookie. <strong>Never store access tokens in localStorage!</strong></Callout>
            </TopicModal>

            <TopicModal title="Browser Storage" emoji="💾" color="#ef4444" summary="localStorage, sessionStorage, cookies, IndexedDB — client-side data storage">
                <Paragraph>Browsers provide multiple ways to store data on the client side. Each has <Highlight>specific use cases</Highlight> — choosing wrong can lead to bugs or security risks.</Paragraph>

                <div className="my-3 overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead><tr className="border-b border-[var(--border-primary)]"><th className="text-left p-2 text-slate-400">Criteria</th><th className="text-left p-2 text-blue-400">localStorage</th><th className="text-left p-2 text-green-400">sessionStorage</th><th className="text-left p-2 text-yellow-400">Cookies</th><th className="text-left p-2 text-purple-400">IndexedDB</th></tr></thead>
                        <tbody className="text-[var(--text-secondary)]">
                            <tr className="border-b border-gray-100"><td className="p-2">Capacity</td><td className="p-2">~5-10 MB</td><td className="p-2">~5 MB</td><td className="p-2">~4 KB</td><td className="p-2">Hundreds of MB+</td></tr>
                            <tr className="border-b border-gray-100"><td className="p-2">Expiration</td><td className="p-2">Never (persists)</td><td className="p-2">Tab close = gone</td><td className="p-2">Set expires/max-age</td><td className="p-2">Never (persists)</td></tr>
                            <tr className="border-b border-gray-100"><td className="p-2">Sent to server</td><td className="p-2">❌ No</td><td className="p-2">❌ No</td><td className="p-2">✅ Auto on every request</td><td className="p-2">❌ No</td></tr>
                            <tr className="border-b border-gray-100"><td className="p-2">API</td><td className="p-2">Sync (simple)</td><td className="p-2">Sync (simple)</td><td className="p-2">document.cookie</td><td className="p-2">Async (complex)</td></tr>
                            <tr><td className="p-2">Use case</td><td className="p-2">User prefs, theme</td><td className="p-2">Form wizard, temp data</td><td className="p-2">Auth tokens, tracking</td><td className="p-2">Offline data, large datasets</td></tr>
                        </tbody>
                    </table>
                </div>

                <CodeBlock title="localStorage & sessionStorage">{`// localStorage — persists across sessions
localStorage.setItem('theme', 'dark')
localStorage.getItem('theme')    // 'dark'
localStorage.removeItem('theme')
localStorage.clear()             // remove all

// sessionStorage — only lives in current tab
sessionStorage.setItem('step', '2')
sessionStorage.getItem('step')   // '2'
// Close tab → all gone!

// Storing objects → must JSON.stringify
localStorage.setItem('user', JSON.stringify({ name: 'An', age: 25 }))
const user = JSON.parse(localStorage.getItem('user'))`}</CodeBlock>

                <CodeBlock title="Cookies (document.cookie)">{`// Set cookie
document.cookie = 'token=abc123; path=/; max-age=3600; Secure; SameSite=Strict'

// Read cookies (returns string, must parse)
document.cookie  // 'token=abc123; theme=dark'

// Important cookie flags:
// Secure     — only sent over HTTPS
// HttpOnly   — JS can't read it (XSS protection!)
// SameSite   — CSRF protection (Strict/Lax/None)
// max-age    — time to live (seconds)
// path=/     — applies to entire site`}</CodeBlock>

                <CodeBlock title="IndexedDB (for large data)">{`// IndexedDB — NoSQL database in the browser
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

// In practice: use wrappers like idb or Dexie.js
// import { openDB } from 'idb'
// const db = await openDB('myDB', 1)
// await db.put('users', { id: 1, name: 'An' })`}</CodeBlock>

                <Callout type="tip">🎯 <strong>Storage selection rules:</strong><br />
                    • Auth tokens → <InlineCode>httpOnly cookie</InlineCode> (most secure)<br />
                    • Theme/language → <InlineCode>localStorage</InlineCode> (persistent, small)<br />
                    • Multi-step form → <InlineCode>sessionStorage</InlineCode> (lost on tab close)<br />
                    • Offline/large cache → <InlineCode>IndexedDB</InlineCode> (structured data)</Callout>

                <Callout type="warning"><InlineCode>localStorage</InlineCode> is <strong>synchronous</strong> — storing large data blocks the main thread. Use <InlineCode>IndexedDB</InlineCode> (async) for data &gt; 1MB.</Callout>
            </TopicModal>
        </div>

        <Heading3>1.3 Git & Terminal (click for details)</Heading3>
        <div className="my-4 space-y-2">
            <TopicModal title="Advanced Git" emoji="🔧" color="#ef4444" summary="rebase, cherry-pick, bisect, stash — commands that distinguish junior from senior">
                <Paragraph>Beyond <InlineCode>add/commit/push/pull</InlineCode>, these are commands you <Highlight>must know</Highlight>:</Paragraph>
                <CodeBlock title="Advanced Git commands">{`# Rebase — rewrite history, clean commits
git rebase -i HEAD~3     # Squash/edit last 3 commits
git rebase main          # Put branch on top of main

# Cherry-pick — grab a specific commit
git cherry-pick abc1234  # Copy commit to current branch

# Bisect — find bug-causing commit (binary search!)
git bisect start
git bisect bad           # Current commit has the bug
git bisect good v1.0     # v1.0 was bug-free
# Git will checkout the middle → you test → it narrows down

# Stash — temporarily save changes
git stash                # Save changes
git stash pop            # Restore
git stash list           # View stash list

# Reflog — lifesaver when commits are lost
git reflog               # View HEAD history
git reset --hard HEAD@{3} # Restore to old state`}</CodeBlock>
                <Callout type="tip">📚 <strong>learngitbranching.js.org</strong> — interactive game to learn Git branching, very visual!</Callout>
            </TopicModal>

            <TopicModal title="Linux/Terminal" emoji="💻" color="#ef4444" summary="Navigation, permissions, pipes — foundation for DevOps and debugging">
                <CodeBlock title="Essential commands">{`# Navigation & Files
ls -la          # List all files + permissions
find . -name "*.tsx" -type f   # Find files
du -sh */       # Disk usage per folder

# Text processing (very useful for debugging)
grep -rn "error" ./logs/     # Search text in files
cat file.log | grep "ERROR" | wc -l  # Count errors
awk '{print $1}' access.log | sort | uniq -c | sort -rn  # Top IPs

# Process management
ps aux | grep node           # Find Node process
kill -9 <PID>                # Force kill
lsof -i :3000                # Who is using port 3000?

# Permissions
chmod 755 script.sh          # rwxr-xr-x
chown user:group file        # Change owner`}</CodeBlock>
                <Callout type="tip">Pipe (<InlineCode>|</InlineCode>) is the most important concept — it connects the output of one command to the input of another. Extremely powerful for debugging!</Callout>
            </TopicModal>
        </div>

        <Callout type="tip">
            If you can only pick one course for this phase: <Highlight>CS50 by Harvard</Highlight> (free on YouTube).
            It covers C, algorithms, memory, web — an incredibly solid foundation.
        </Callout>

        </>
    )
}
