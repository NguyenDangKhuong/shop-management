import { CodeBlock, Heading2, Heading3, Paragraph, Highlight, InlineCode, Callout } from '../components/BlogComponents'
import { TopicModal } from '../components/TopicModal'
import { toLeetCodeSlug } from './utils'

export const enContent = (
    <>
        <Paragraph>
            Want to land a <Highlight>Frontend Engineer</Highlight> role at <Highlight>Google, Meta, Amazon, Apple, Microsoft</Highlight> (FAANG) or other big tech companies?
            This article is a detailed A-Z roadmap — especially for those who feel their <Highlight>fundamentals are shaky</Highlight> and want to rebuild from scratch.
        </Paragraph>

        <Callout type="info">
            This roadmap is divided into <Highlight>6 phases</Highlight>, each lasting about 4-6 weeks.
            Total time needed: <Highlight>6-9 months</Highlight> if you study seriously 2-3 hours daily.
        </Callout>

        {/* ===== OVERVIEW ===== */}
        <Heading2>🗺️ Roadmap Overview</Heading2>

        <div className="my-6 p-4 rounded-xl bg-[var(--bg-tag)] border border-[var(--border-primary)]">
            <div className="flex flex-col items-center gap-2 text-sm">
                <div className="px-4 py-2 rounded-lg bg-red-500/20 text-red-300 border border-red-500/30 w-fit font-semibold">Phase 1 — CS Fundamentals (4-6 weeks)</div>
                <div className="text-slate-600">↓</div>
                <div className="px-4 py-2 rounded-lg bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 w-fit font-semibold">Phase 2 — JavaScript Master (4-6 weeks)</div>
                <div className="text-slate-600">↓</div>
                <div className="px-4 py-2 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30 w-fit font-semibold">Phase 3 — React & Frontend (4-6 weeks)</div>
                <div className="text-slate-600">↓</div>
                <div className="px-4 py-2 rounded-lg bg-green-500/20 text-green-300 border border-green-500/30 w-fit font-semibold">Phase 4 — DSA / LeetCode (6-8 weeks)</div>
                <div className="text-slate-600">↓</div>
                <div className="px-4 py-2 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30 w-fit font-semibold">Phase 5 — System Design (4-6 weeks)</div>
                <div className="text-slate-600">↓</div>
                <div className="px-4 py-2 rounded-lg bg-pink-500/20 text-pink-300 border border-pink-500/30 w-fit font-semibold">Phase 6 — Mock Interview & Behavioral (2-4 weeks)</div>
            </div>
        </div>

        {/* ===== PHASE 1 ===== */}
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

        {/* ===== PHASE 2 ===== */}
        <Heading2>Phase 2 — JavaScript Master (4-6 weeks)</Heading2>

        <Paragraph>
            JavaScript is the <Highlight>core language</Highlight> of Frontend. Big tech will ask deep JS questions —
            not just syntax but <Highlight>how it works internally</Highlight>.
        </Paragraph>

        <Heading3>2.1 Core Concepts (MUST know — click for details)</Heading3>
        <div className="my-4 space-y-2">
            <TopicModal title="Execution Context & Hoisting" emoji="⚙️" color="#fbbf24" summary="How the JS engine runs code — Creation Phase vs Execution Phase">
                <Paragraph>When you run JS, the engine creates an <Highlight>Execution Context</Highlight> with 2 phases:</Paragraph>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="text-yellow-400 font-bold text-sm">1. Creation Phase</div>
                        <div className="text-slate-300 text-sm mt-1">• Creates Global/Window object<br />• Sets up memory heap for variables and functions<br />• <strong>Hoisting</strong>: var is assigned <InlineCode>undefined</InlineCode>, function declarations are copied entirely<br />• <InlineCode>let</InlineCode>/<InlineCode>const</InlineCode> are in &quot;Temporal Dead Zone&quot; — accessing early throws ReferenceError</div>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">2. Execution Phase</div>
                        <div className="text-slate-300 text-sm mt-1">• Runs code line by line<br />• Assigns actual values to variables<br />• Calling functions → creates a new Function Execution Context (also has 2 phases)</div>
                    </div>
                </div>
                <CodeBlock title="Hoisting example">{`console.log(a); // undefined (hoisted, assigned undefined)
console.log(b); // ReferenceError! (TDZ)
var a = 1;
let b = 2;

greet(); // "Hello!" — function hoisted entirely
function greet() { console.log("Hello!"); }`}</CodeBlock>
                <Callout type="tip">Interview tip: Being able to explain <Highlight>TDZ</Highlight> (Temporal Dead Zone) of let/const will earn you major points.</Callout>
            </TopicModal>

            <TopicModal title="Scope & Closure" emoji="🔒" color="#a78bfa" summary="Lexical scope, closure patterns, module pattern">
                <Paragraph><Highlight>Scope</Highlight> = the range of variable access. JS uses <Highlight>Lexical Scope</Highlight> — scope is determined at write time, not runtime.</Paragraph>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">3 Types of Scope</div>
                        <div className="text-slate-300 text-sm mt-1">• <strong>Global</strong> — accessible everywhere<br />• <strong>Function</strong> — only accessible within the function<br />• <strong>Block</strong> (let/const) — only within {'{}'}</div>
                    </div>
                </div>
                <Paragraph><Highlight>Closure</Highlight> = a function that &quot;remembers&quot; the scope where it was created, even when executed elsewhere.</Paragraph>
                <CodeBlock title="Closure classic example">{`function makeCounter() {
    let count = 0; // "Private" variable
    return {
        increment: () => ++count,
        getCount: () => count,
    };
}
const counter = makeCounter();
counter.increment(); // 1
counter.increment(); // 2
counter.getCount();  // 2
// count CANNOT be accessed directly!`}</CodeBlock>
                <Callout type="warning">Classic interview question: &quot;Explain the output of a for loop + setTimeout&quot; — the answer relates to closure + var vs let.</Callout>
                <CodeBlock title="Classic example: for + setTimeout">{`// ❌ Using var — prints 5, 5, 5, 5, 5
for (var i = 0; i < 5; i++) {
    setTimeout(() => console.log(i), 100);
}
// Why? var has function scope, not block scope.
// When setTimeout runs, the loop has ended, i = 5.
// All 5 callbacks reference THE SAME variable i.

// ✅ Using let — prints 0, 1, 2, 3, 4
for (let i = 0; i < 5; i++) {
    setTimeout(() => console.log(i), 100);
}
// Why? let has block scope — each iteration creates
// a NEW variable i, the callback closure "captures" the right value.

// ✅ Fix with IIFE (before let existed)
for (var i = 0; i < 5; i++) {
    (function(j) {
        setTimeout(() => console.log(j), 100);
    })(i);
}
// IIFE creates a new scope, "copies" the value of i into j.`}</CodeBlock>
            </TopicModal>

            <TopicModal title="this keyword" emoji="👉" color="#f472b6" summary="4 binding rules: default, implicit, explicit, new">
                <Paragraph><InlineCode>this</InlineCode> in JS is <Highlight>not fixed</Highlight> — it depends on <strong>how the function is called</strong>, not where it&apos;s written.</Paragraph>
                <div className="my-3 overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead><tr className="border-b border-[var(--border-primary)]"><th className="text-left p-2 text-slate-400">Rule</th><th className="text-left p-2 text-slate-400">this =</th><th className="text-left p-2 text-slate-400">Example</th></tr></thead>
                        <tbody className="text-[var(--text-secondary)]">
                            <tr className="border-b border-gray-100"><td className="p-2 text-yellow-400">Default</td><td className="p-2">window / undefined</td><td className="p-2"><InlineCode>foo()</InlineCode></td></tr>
                            <tr className="border-b border-gray-100"><td className="p-2 text-blue-400">Implicit</td><td className="p-2">object before the dot</td><td className="p-2"><InlineCode>obj.foo()</InlineCode></td></tr>
                            <tr className="border-b border-gray-100"><td className="p-2 text-green-400">Explicit</td><td className="p-2">first argument</td><td className="p-2"><InlineCode>foo.call(obj)</InlineCode></td></tr>
                            <tr><td className="p-2 text-purple-400">new</td><td className="p-2">newly created object</td><td className="p-2"><InlineCode>new Foo()</InlineCode></td></tr>
                        </tbody>
                    </table>
                </div>
                <Paragraph><Highlight>Arrow functions</Highlight> do NOT have their own this — they inherit this from the parent scope (lexical this). That&apos;s why arrow functions are ideal for callbacks.</Paragraph>
                <CodeBlock title="Example of each rule">{`// 1️⃣ Default binding — this = window (browser) / undefined (strict mode)
function showThis() {
    console.log(this);
}
showThis(); // window (non-strict) / undefined (strict)

// 2️⃣ Implicit binding — this = object before the dot
const user = {
    name: 'Khuong',
    greet() { console.log(this.name); }
};
user.greet(); // "Khuong" ✅
const fn = user.greet;
fn(); // undefined ❌ (lost context!)

// 3️⃣ Explicit binding — call / apply / bind
function greet(greeting) {
    console.log(greeting + ', ' + this.name);
}
greet.call({ name: 'An' }, 'Hi');    // "Hi, An"
greet.apply({ name: 'An' }, ['Hi']); // "Hi, An"
const bound = greet.bind({ name: 'An' });
bound('Hello'); // "Hello, An"

// 4️⃣ new binding — this = newly created object
function Person(name) {
    this.name = name; // this = new {}
}
const p = new Person('Binh');
console.log(p.name); // "Binh"

// 5️⃣ Arrow function — NO own this
const team = {
    name: 'Frontend',
    members: ['A', 'B'],
    show() {
        this.members.forEach((m) => {
            console.log(m + ' belongs to ' + this.name);
            // Arrow inherits this from show() → team
        });
    }
};
team.show();
// "A belongs to Frontend"
// "B belongs to Frontend"`}</CodeBlock>
                <Callout type="tip">Priority order: <strong>new &gt; explicit &gt; implicit &gt; default</strong>. Arrow functions bypass all these rules.</Callout>
            </TopicModal>

            <TopicModal title="Prototype & Inheritance" emoji="🧬" color="#34d399" summary="Prototype chain, __proto__, Object.create">
                <Paragraph>JS uses <Highlight>Prototypal Inheritance</Highlight> — every object has a hidden link (<InlineCode>__proto__</InlineCode>) pointing to its prototype.</Paragraph>
                <Paragraph>When you access a property that doesn&apos;t exist on the object, JS <strong>walks up the prototype chain</strong> until it reaches <InlineCode>null</InlineCode>.</Paragraph>
                <CodeBlock title="Prototype chain">{`const animal = { eat: true };
const dog = Object.create(animal); // dog.__proto__ = animal
dog.bark = true;

dog.bark; // true (own property)
dog.eat;  // true (from prototype chain!)
dog.fly;  // undefined (not found)

// Chain: dog → animal → Object.prototype → null`}</CodeBlock>
                <Callout type="warning">ES6 Class is just <Highlight>syntactic sugar</Highlight> — underneath it still uses prototypes. Understanding prototypes = understanding JS at a deep level.</Callout>
            </TopicModal>

            <TopicModal title="Event Loop" emoji="🔄" color="#60a5fa" summary="Call Stack, Microtask Queue, Macrotask Queue">
                <Paragraph>JS is <Highlight>single-threaded</Highlight> but handles async thanks to the <Highlight>Event Loop</Highlight>. Understanding the Event Loop = understanding why async code runs in a &quot;strange&quot; order.</Paragraph>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">Priority Order</div>
                        <div className="text-slate-300 text-sm mt-1">1. <strong>Call Stack</strong> — synchronous code runs first<br />2. <strong>Microtask Queue</strong> — Promise.then, queueMicrotask, MutationObserver<br />3. <strong>Macrotask Queue</strong> — setTimeout, setInterval, I/O</div>
                    </div>
                </div>
                <CodeBlock title="Guess the output">{`console.log('1'); // Call Stack
setTimeout(() => console.log('2'), 0); // Macrotask
Promise.resolve().then(() => console.log('3')); // Microtask
console.log('4'); // Call Stack

// Output: 1 → 4 → 3 → 2`}</CodeBlock>
                <Callout type="tip">This is the #1 JS interview question. Always remember: <Highlight>Sync → Microtask → Macrotask</Highlight>.</Callout>
                <a href="/blogs/event-loop" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 Read detailed article →</a>
            </TopicModal>

            <TopicModal title="Async/Await & Promises" emoji="⚡" color="#fbbf24" summary="What is a Promise, 3 states, Promise.all/race/allSettled, async/await, error handling">
                <Paragraph><Highlight>Promise</Highlight> is an object representing the eventual result (success or failure) of an asynchronous operation (like API calls, file reads). It solves the <Highlight>&quot;callback hell&quot;</Highlight> problem by providing <InlineCode>.then()</InlineCode> and <InlineCode>.catch()</InlineCode> syntax for cleaner, more maintainable code.</Paragraph>

                <Heading3>3 States of a Promise</Heading3>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="text-yellow-400 font-bold text-sm">⏳ Pending (Waiting)</div>
                        <div className="text-slate-300 text-sm mt-1">Initial state — the async operation has not completed yet. The Promise is still &quot;waiting&quot; for a result.</div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">✅ Fulfilled / Resolved (Success)</div>
                        <div className="text-slate-300 text-sm mt-1">The operation completed successfully, the Promise has a result (value). Triggers the callback in <InlineCode>.then()</InlineCode>.</div>
                    </div>
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <div className="text-red-400 font-bold text-sm">❌ Rejected (Failed)</div>
                        <div className="text-slate-300 text-sm mt-1">The operation failed, the Promise returns an error (reason). Triggers the callback in <InlineCode>.catch()</InlineCode>.</div>
                    </div>
                </div>

                <Heading3>How It Works</Heading3>
                <CodeBlock title="Creating and using a Promise">{`const myPromise = new Promise((resolve, reject) => {
  // Perform async operation
  let success = true;
  if (success) {
    resolve("Data received"); // → Fulfilled
  } else {
    reject("Something failed"); // → Rejected
  }
});

myPromise
  .then((data) => console.log(data))   // Handle success
  .catch((error) => console.error(error)) // Handle error
  .finally(() => console.log("Done")); // Runs regardless`}</CodeBlock>

                <Heading3>async/await — Syntactic Sugar</Heading3>
                <Paragraph><InlineCode>async/await</InlineCode> was introduced in ES2017. It lets you write async code that looks synchronous — much easier to read and debug than <InlineCode>.then()</InlineCode> chains.</Paragraph>

                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="text-yellow-400 font-bold text-sm">async — Marks a function as asynchronous</div>
                        <div className="text-slate-300 text-sm mt-1">• Adding <InlineCode>async</InlineCode> before a function → it <strong>always returns a Promise</strong><br />• If you return a plain value, JS auto-wraps it as <InlineCode>Promise.resolve(value)</InlineCode><br />• If you throw an error, JS auto-wraps it as <InlineCode>Promise.reject(error)</InlineCode></div>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">await — Pauses and waits for Promise to resolve</div>
                        <div className="text-slate-300 text-sm mt-1">• <InlineCode>await</InlineCode> can only be used <strong>inside async functions</strong> (or top-level modules)<br />• When hitting <InlineCode>await</InlineCode>, JS <strong>pauses</strong> that function, returns control to the Event Loop<br />• When the Promise resolves → JS <strong>resumes</strong> from the next line<br />• When the Promise rejects → throws an error (catch with <InlineCode>try/catch</InlineCode>)</div>
                    </div>
                </div>

                <CodeBlock title="async keyword explained">{`// async functions ALWAYS return a Promise
async function getNumber() {
  return 42; // Auto-wrapped → Promise.resolve(42)
}
getNumber().then(n => console.log(n)); // 42

// Equivalent to:
function getNumber() {
  return Promise.resolve(42);
}

// async + throw = Promise.reject
async function failHard() {
  throw new Error("Oops!"); // → Promise.reject(Error("Oops!"))
}
failHard().catch(err => console.log(err.message)); // "Oops!"`}</CodeBlock>

                <CodeBlock title="How await works">{`async function fetchUser() {
  console.log("1. Starting fetch");

  // await PAUSES the function here
  // Event Loop keeps running, handling other tasks
  const res = await fetch('/api/user'); // ⏸️ waiting...

  // When fetch completes → RESUMES from here
  console.log("2. Fetch done, parsing JSON");
  const user = await res.json(); // ⏸️ waiting again...

  console.log("3. Got data:", user.name);
  return user;
}

// OUTSIDE, code runs normally (non-blocking)
fetchUser();
console.log("4. This runs IMMEDIATELY, doesn't wait");
// Output: 1 → 4 → 2 → 3`}</CodeBlock>

                <Heading3>⚠️ Common Mistake: Sequential vs Parallel</Heading3>
                <CodeBlock title="Watch out: await sequential vs parallel">{`// ❌ WRONG: Runs sequentially — slow!
async function slow() {
  const users = await fetch('/api/users');  // 2s
  const posts = await fetch('/api/posts');  // 2s
  // Total: 4 seconds! Waits for users before fetching posts
}

// ✅ RIGHT: Runs in parallel — fast!
async function fast() {
  const [users, posts] = await Promise.all([
    fetch('/api/users'),   // 2s
    fetch('/api/posts'),   // 2s (runs simultaneously!)
  ]);
  // Total: 2 seconds! Both requests run concurrently
}

// ✅ Or: Start promises first, await later
async function alsoFast() {
  const usersPromise = fetch('/api/users');  // Starts immediately
  const postsPromise = fetch('/api/posts');  // Starts immediately

  const users = await usersPromise;  // Wait for result
  const posts = await postsPromise;  // Already done (or nearly)
}`}</CodeBlock>

                <Heading3>Error Handling Patterns</Heading3>
                <CodeBlock title="Different ways to handle errors">{`// Pattern 1: try/catch (most common)
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

// Pattern 2: .catch() on individual awaits
async function loadData() {
  const data = await fetch('/api/data')
    .then(r => r.json())
    .catch(() => null); // No crash, returns null on error
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

// Usage:
const [err, user] = await to(fetch('/api/user').then(r => r.json()));
if (err) console.error('Error:', err);`}</CodeBlock>

                <CodeBlock title="Comparing then() vs async/await">{`// ❌ Promise chain — hard to read when nested
fetch('/api/user')
  .then(res => res.json())
  .then(user => fetch('/api/posts/' + user.id))
  .then(res => res.json())
  .then(posts => console.log(posts))
  .catch(err => console.error(err));

// ✅ async/await — clear and debuggable
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

                <Heading3>Key Methods</Heading3>
                <div className="my-3 overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead><tr className="border-b border-[var(--border-primary)]"><th className="text-left p-2 text-slate-400">Method</th><th className="text-left p-2 text-slate-400">Behavior</th><th className="text-left p-2 text-slate-400">When to use</th></tr></thead>
                        <tbody className="text-[var(--text-secondary)]">
                            <tr className="border-b border-gray-100"><td className="p-2"><InlineCode>Promise.all</InlineCode></td><td className="p-2">Run in parallel, <strong>rejects if any fails</strong></td><td className="p-2">Fetch multiple APIs, all are required</td></tr>
                            <tr className="border-b border-gray-100"><td className="p-2"><InlineCode>Promise.allSettled</InlineCode></td><td className="p-2">Run in parallel, <strong>waits for all</strong> (even failures)</td><td className="p-2">Batch operations where you need each result</td></tr>
                            <tr className="border-b border-gray-100"><td className="p-2"><InlineCode>Promise.race</InlineCode></td><td className="p-2">Returns <strong>first result</strong> (fulfilled or rejected)</td><td className="p-2">Timeout patterns, fastest response</td></tr>
                            <tr><td className="p-2"><InlineCode>Promise.any</InlineCode></td><td className="p-2">Returns <strong>first fulfilled</strong>, ignores rejected</td><td className="p-2">Fallback servers, first successful result</td></tr>
                        </tbody>
                    </table>
                </div>
                <CodeBlock title="Promise methods examples">{`// Promise.all — fail fast
const [users, posts] = await Promise.all([
  fetch('/api/users').then(r => r.json()),
  fetch('/api/posts').then(r => r.json()),
]); // If 1 fails → both are rejected!

// Promise.allSettled — wait for all
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

                <Heading3>Benefits of Promises</Heading3>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">🧹 Avoid Callback Hell</div>
                        <div className="text-slate-300 text-sm mt-1">Instead of 5-6 nested callbacks, use <InlineCode>.then()</InlineCode> chains or <InlineCode>async/await</InlineCode> — flat, readable code.</div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">🛡️ Better Error Handling</div>
                        <div className="text-slate-300 text-sm mt-1">A single <InlineCode>.catch()</InlineCode> catches all errors in the chain. With <InlineCode>async/await</InlineCode>, use the familiar <InlineCode>try/catch</InlineCode>.</div>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">⚡ Easy Parallelism</div>
                        <div className="text-slate-300 text-sm mt-1"><InlineCode>Promise.all</InlineCode> lets you run multiple async tasks concurrently — significantly faster than sequential execution.</div>
                    </div>
                </div>

                <Callout type="warning">Always use <InlineCode>try/catch</InlineCode> with async/await. Unhandled Promise rejections will crash the Node.js process!</Callout>
                <Callout type="tip">Interview tip: Being able to explain the difference between <InlineCode>Promise.all</InlineCode> vs <InlineCode>Promise.allSettled</InlineCode> and when to use each — very common question.</Callout>
                <a href="/blogs/callback-promise-async-await" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 Read detailed article →</a>
            </TopicModal>

            <TopicModal title="ES6+ Features" emoji="✨" color="#38bdf8" summary="destructuring, spread, modules, optional chaining, nullish coalescing">
                <Paragraph>Features you <Highlight>must master</Highlight> — interviewers expect you to write modern JS.</Paragraph>
                <div className="my-3 space-y-2">
                    {[
                        ['Destructuring', 'const { name, age } = user; const [first, ...rest] = arr;'],
                        ['Spread / Rest', 'const merged = { ...a, ...b }; function sum(...nums) {}'],
                        ['Template Literals', '`Hello ${name}, you are ${age} years old`'],
                        ['Optional Chaining', 'user?.address?.street // undefined instead of crash'],
                        ['Nullish Coalescing', 'value ?? defaultValue // only null/undefined triggers fallback'],
                        ['ES Modules', 'import/export — static analysis, tree shaking'],
                    ].map(([title, desc]) => (
                        <div key={title} className="p-2 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                            <div className="text-blue-400 text-sm font-medium">{title}</div>
                            <div className="text-[var(--text-secondary)] text-xs font-mono mt-0.5">{desc}</div>
                        </div>
                    ))}
                </div>
                <a href="/blogs/ecmascript-features" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 Read detailed article →</a>
            </TopicModal>

            <TopicModal title="Type Coercion" emoji="🔀" color="#f97316" summary="== vs ===, truthy/falsy, implicit conversion traps">
                <Paragraph>JS automatically converts types when comparing with <InlineCode>==</InlineCode>. This is the source of many confusing bugs.</Paragraph>
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
                <Callout type="tip">Simple rule: <Highlight>always use ===</Highlight> unless you INTENTIONALLY want type coercion (rare). And memorize the 6 falsy values.</Callout>
            </TopicModal>

            <TopicModal title="for vs while — When to Use?" emoji="🔄" color="#10b981" summary="for = known iteration count, while = loop until condition is false — crucial pattern in DSA">
                <Paragraph><InlineCode>for</InlineCode> when you <Highlight>know in advance</Highlight> how many times to iterate. <InlineCode>while</InlineCode> when you <Highlight>don&#39;t know</Highlight> when to stop.</Paragraph>

                <Heading3>for — When You Know the Iteration Count</Heading3>
                <CodeBlock title="4 Variations of for">{`// Traverse array — length is known
for (let i = 0; i < arr.length; i++) { ... }

// Fixed range
for (let i = 0; i < n; i++) { ... }

// for...of — iterate each element (Array, Map, Set, String)
for (const item of items) { ... }

// for...in — iterate object keys
for (const key in obj) { ... }`}</CodeBlock>

                <Heading3>while — When You Don&#39;t Know When to Stop</Heading3>
                <CodeBlock title="5 Common Use Cases">{`// Two Pointers — stop when pointers meet
while (left < right) { ... }

// BFS — stop when queue is empty
while (queue.length > 0) { ... }

// Binary Search — stop when left exceeds right
while (left <= right) { ... }

// Linked List — stop when no more nodes
while (node !== null) { ... }

// Regex match — stop when no more matches
while ((match = regex.exec(str)) !== null) { ... }`}</CodeBlock>

                <Heading3>Quick Cheat Sheet</Heading3>
                <div className="my-3 overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="text-left p-3 text-slate-400 font-medium">Situation</th>
                                <th className="text-left p-3 text-blue-400 font-medium">Use</th>
                                <th className="text-left p-3 text-slate-400 font-medium">Reason</th>
                            </tr>
                        </thead>
                        <tbody className="text-slate-300">
                            <tr className="border-b border-white/5"><td className="p-3">Traverse array start → end</td><td className="p-3"><InlineCode>for</InlineCode></td><td className="p-3">Length known upfront</td></tr>
                            <tr className="border-b border-white/5"><td className="p-3">Two Pointers</td><td className="p-3"><InlineCode>while</InlineCode></td><td className="p-3">Stop when left {'>'} = right</td></tr>
                            <tr className="border-b border-white/5"><td className="p-3">Sliding Window: right expands</td><td className="p-3"><InlineCode>for</InlineCode></td><td className="p-3">right goes from 0 → n</td></tr>
                            <tr className="border-b border-white/5"><td className="p-3">Sliding Window: left shrinks</td><td className="p-3"><InlineCode>while</InlineCode></td><td className="p-3">Don&#39;t know how much to shrink</td></tr>
                            <tr className="border-b border-white/5"><td className="p-3">BFS / DFS iterative</td><td className="p-3"><InlineCode>while</InlineCode></td><td className="p-3">Don&#39;t know when queue/stack empties</td></tr>
                            <tr className="border-b border-white/5"><td className="p-3">Binary Search</td><td className="p-3"><InlineCode>while</InlineCode></td><td className="p-3">Don&#39;t know how many halving steps</td></tr>
                            <tr><td className="p-3">Read file / stream</td><td className="p-3"><InlineCode>while</InlineCode></td><td className="p-3">Don&#39;t know when data ends</td></tr>
                        </tbody>
                    </table>
                </div>

                <Heading3>In LeetCode Patterns</Heading3>
                <CodeBlock title="Combining for + while">{`// Sliding Window = for + while nested!
for (let right = 0; right < arr.length; right++) {  // for: expand (known n steps)
    while (/* invalid */) {                           // while: shrink (unknown steps)
        left++
    }
}

// Monotonic Stack = for + while
for (let i = 0; i < arr.length; i++) {               // for: traverse array
    while (stack.length && arr[stack.at(-1)] < arr[i]) { // while: pop until valid
        stack.pop()
    }
}`}</CodeBlock>
                <Callout type="tip"><strong>Summary:</strong> <InlineCode>for</InlineCode> = &quot;iterate through N elements&quot;, <InlineCode>while</InlineCode> = &quot;loop until condition is false&quot;. When combining both (Sliding Window, Monotonic Stack), <InlineCode>for</InlineCode> manages the outer loop, <InlineCode>while</InlineCode> handles inner logic with unknown step count! 🎯</Callout>
            </TopicModal>

            <TopicModal title="JS Data Types" emoji="📦" color="#06b6d4" summary="7 primitives + 1 reference — typeof, truthy/falsy, pass by value vs reference">
                <Paragraph>JavaScript has <Highlight>7 primitive types</Highlight> and <Highlight>1 reference type</Highlight>.</Paragraph>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">Primitive (stored by value, compared by value)</div>
                        <div className="text-slate-300 text-sm mt-1"><InlineCode>string</InlineCode>, <InlineCode>number</InlineCode>, <InlineCode>boolean</InlineCode>, <InlineCode>null</InlineCode>, <InlineCode>undefined</InlineCode>, <InlineCode>symbol</InlineCode>, <InlineCode>bigint</InlineCode></div>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">Reference (stored by pointer, compared by reference)</div>
                        <div className="text-slate-300 text-sm mt-1"><InlineCode>object</InlineCode> — includes: Object, Array, Function, Date, Map, Set, RegExp...</div>
                    </div>
                </div>
                <CodeBlock title="typeof gotchas">{`typeof 'hello'     // 'string'
typeof 42          // 'number'
typeof true        // 'boolean'
typeof undefined   // 'undefined'
typeof null        // 'object' ← Historical JS BUG!
typeof []          // 'object' ← Array is also an object
typeof {}          // 'object'
typeof function(){} // 'function' ← special case

// Accurate type checking:
Array.isArray([])           // true
obj === null                // check null
obj instanceof Date         // check Date
Object.prototype.toString.call(obj) // "[object Array]"`}</CodeBlock>
                <CodeBlock title="Pass by value vs reference">{`// Primitive → copies the value
let a = 5
let b = a
b = 10
console.log(a) // 5 — not affected!

// Reference → copies the pointer (both point to same object)
let obj1 = { name: 'Khuong' }
let obj2 = obj1
obj2.name = 'Changed'
console.log(obj1.name) // 'Changed' — affected!

// Fix: shallow copy
let obj3 = { ...obj1 }  // spread operator
let obj4 = Object.assign({}, obj1)`}</CodeBlock>
                <Callout type="tip">Interview tip: Explaining that <Highlight>typeof null === &apos;object&apos;</Highlight> is a historical bug, and the difference between <InlineCode>==</InlineCode> vs <InlineCode>===</InlineCode> when comparing types, will score big points.</Callout>
                <a href="/blogs/data-types-structures" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 See detailed article →</a>
            </TopicModal>

            <TopicModal title="Strict Mode" emoji="🔒" color="#ef4444" summary={`"use strict" — stricter execution mode that catches errors early and makes code safer`}>
                <Paragraph><InlineCode>{`"use strict"`}</InlineCode> enables a stricter execution mode, introduced in <Highlight>ES5</Highlight>. It catches errors early and prevents dangerous behaviors that normal JS silently allows.</Paragraph>
                <CodeBlock title="How to enable">{`"use strict"; // Top of file → applies to entire file

function myFunc() {
  "use strict"; // Or only inside a function
}

// ⚡ ES Modules (import/export) and class
// automatically run in strict mode — no declaration needed!`}</CodeBlock>
                <div className="my-3 overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead><tr className="border-b border-[var(--border-primary)]"><th className="text-left p-2 text-slate-400">Behavior</th><th className="text-left p-2 text-red-400">Non-strict</th><th className="text-left p-2 text-green-400">Strict mode</th></tr></thead>
                        <tbody className="text-[var(--text-secondary)]">
                            <tr className="border-b border-gray-100"><td className="p-2">Undeclared variable</td><td className="p-2">Creates global 😱</td><td className="p-2">❌ ReferenceError</td></tr>
                            <tr className="border-b border-gray-100"><td className="p-2">Assign to read-only property</td><td className="p-2">Silent, ignored</td><td className="p-2">❌ TypeError</td></tr>
                            <tr className="border-b border-gray-100"><td className="p-2">Duplicate params</td><td className="p-2">Allowed</td><td className="p-2">❌ SyntaxError</td></tr>
                            <tr className="border-b border-gray-100"><td className="p-2"><InlineCode>this</InlineCode> in function</td><td className="p-2">window</td><td className="p-2">undefined</td></tr>
                            <tr><td className="p-2">Using <InlineCode>with</InlineCode></td><td className="p-2">Allowed</td><td className="p-2">❌ SyntaxError</td></tr>
                        </tbody>
                    </table>
                </div>
                <CodeBlock title="Examples">{`"use strict";

x = 10; // ❌ ReferenceError — must use let/const/var

function sum(a, a, b) {} // ❌ SyntaxError — duplicate params

function showThis() {
  console.log(this); // undefined (non-strict → window)
}
showThis();

const obj = {};
Object.defineProperty(obj, "name", { value: "K", writable: false });
obj.name = "X"; // ❌ TypeError — read-only`}</CodeBlock>
                <Callout type="tip">In modern React/Next.js projects, code already runs in <Highlight>strict mode by default</Highlight> because of ES Modules. But understanding strict mode is still crucial for interviews!</Callout>
            </TopicModal>

            <TopicModal title="DOM Manipulation & Event Delegation" emoji="🌐" color="#f97316" summary="querySelector, event bubbling/capturing, delegation — foundation for understanding React">
                <Paragraph>Understanding <Highlight>native DOM APIs</Highlight> helps you understand how React works under the hood — commonly asked at all levels.</Paragraph>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                        <div className="text-orange-400 font-bold text-sm">🔍 DOM Selection</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <InlineCode>getElementById</InlineCode> — fastest, single element<br />
                            • <InlineCode>querySelector / querySelectorAll</InlineCode> — CSS selectors, flexible<br />
                            • <InlineCode>getElementsByClassName</InlineCode> — returns <strong>live HTMLCollection</strong> (auto-updates)<br />
                            • <InlineCode>querySelectorAll</InlineCode> returns <strong>static NodeList</strong> (snapshot)
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">🫧 Event Bubbling vs Capturing</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <strong>Capturing</strong> (top → down): window → document → html → body → target<br />
                            • <strong>Bubbling</strong> (bottom → up): target → parent → ... → body → html → document<br />
                            • Default: bubbling. Capture: <InlineCode>addEventListener(event, fn, true)</InlineCode><br />
                            • <InlineCode>e.stopPropagation()</InlineCode> — stop bubble/capture<br />
                            • <InlineCode>e.preventDefault()</InlineCode> — prevent default action (form submit, link navigate)
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">🎯 Event Delegation</div>
                        <div className="text-slate-300 text-sm mt-1">
                            Instead of attaching a listener to <strong>each child</strong>, attach 1 listener to <strong>parent</strong>:<br />
                            • Performance: 1 listener instead of 1000 (list items)<br />
                            • Dynamic elements: elements added later are still handled<br />
                            • Use <InlineCode>e.target</InlineCode> to identify which element triggered the event<br />
                            • React uses delegation at root — that&apos;s <strong>Synthetic Events</strong>
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">🔧 DOM Manipulation</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <InlineCode>createElement + appendChild</InlineCode> — create and add elements<br />
                            • <InlineCode>insertAdjacentHTML</InlineCode> — faster than innerHTML, precise position<br />
                            • <InlineCode>DocumentFragment</InlineCode> — batch DOM updates (avoid reflow)<br />
                            • <InlineCode>cloneNode(true)</InlineCode> — deep clone DOM subtree<br />
                            • <InlineCode>dataset</InlineCode> — read/write data-* attributes
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
                <Callout type="tip">Interview: {'"Build a todo list without React"'} — must use event delegation + DocumentFragment. Being able to explain <Highlight>why React uses Synthetic Events</Highlight> → big bonus points.</Callout>
            </TopicModal>

            <TopicModal title="Web APIs — Observer Pattern" emoji="👁️" color="#06b6d4" summary="IntersectionObserver, MutationObserver, ResizeObserver — performance-friendly APIs">
                <Paragraph>Modern Web APIs use <Highlight>Observer pattern</Highlight> instead of polling — crucial for performance.</Paragraph>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                        <div className="text-cyan-400 font-bold text-sm">📐 IntersectionObserver</div>
                        <div className="text-slate-300 text-sm mt-1">
                            Detect when an element is visible in the viewport (no scroll event needed!).<br />
                            • <strong>Lazy loading</strong> images: load when scrolled into view<br />
                            • <strong>Infinite scroll</strong>: load more when sentinel element is visible<br />
                            • <strong>Analytics</strong>: track impressions (ads, product cards)<br />
                            • <strong>Animation</strong>: trigger animation on scroll into view
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">🔬 MutationObserver</div>
                        <div className="text-slate-300 text-sm mt-1">
                            Watch for DOM changes (attributes, children, text content).<br />
                            • Detect DOM changes from third-party scripts<br />
                            • Auto-process dynamically added elements<br />
                            • Build custom element behaviors
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">📏 ResizeObserver</div>
                        <div className="text-slate-300 text-sm mt-1">
                            Detect element size changes (no window resize event needed!).<br />
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
                <Callout type="tip">Interview: {'"Build infinite scroll"'} or {'"Build lazy loading images"'} — use IntersectionObserver, <Highlight>not scroll event + getBoundingClientRect</Highlight> (poor performance).</Callout>
            </TopicModal>

            <TopicModal title="Generators & Iterators" emoji="🔁" color="#a78bfa" summary="function*, yield, Symbol.iterator — lazy evaluation and custom iteration">
                <Paragraph><Highlight>Generators</Highlight> = functions that can pause/resume. Rarely used directly but foundational to async/await and Redux-Saga.</Paragraph>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">🔄 Iterator Protocol</div>
                        <div className="text-slate-300 text-sm mt-1">
                            Object with <InlineCode>next()</InlineCode> method returning <InlineCode>{'{value, done}'}</InlineCode>.<br />
                            • for...of loop uses iterator protocol under the hood<br />
                            • Array, Map, Set, String all implement <InlineCode>Symbol.iterator</InlineCode><br />
                            • Custom iterable: implement <InlineCode>[Symbol.iterator]()</InlineCode>
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">⏸️ Generator Function</div>
                        <div className="text-slate-300 text-sm mt-1">
                            <InlineCode>function*</InlineCode> + <InlineCode>yield</InlineCode> — pause execution, return value, resume later.<br />
                            • <strong>Lazy evaluation</strong>: only compute when needed<br />
                            • <strong>Infinite sequences</strong>: generate values on-demand<br />
                            • <strong>async/await</strong> is actually syntactic sugar over generators
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

// Practical: Paginated API fetch
async function* fetchPages(url) {
  let page = 1
  while (true) {
    const res = await fetch(\`\${url}?page=\${page}\`)
    const data = await res.json()
    if (data.items.length === 0) return
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
                <Callout type="tip">Interview: understanding generators helps answer {'"How does async/await work under the hood?"'} — async function = generator + Promise auto-runner.</Callout>
            </TopicModal>

            <TopicModal title="Error Handling Patterns" emoji="🚨" color="#ef4444" summary="try/catch, custom errors, error boundaries, global handlers — production-ready error handling">
                <Paragraph>Production code <Highlight>must handle errors gracefully</Highlight> — crash = lost users. Interviews often ask about error handling patterns.</Paragraph>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <div className="text-red-400 font-bold text-sm">🎯 Error Types</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <strong>SyntaxError</strong>: invalid syntax (parse time)<br />
                            • <strong>ReferenceError</strong>: undeclared variable<br />
                            • <strong>TypeError</strong>: calling method on null/undefined<br />
                            • <strong>RangeError</strong>: value outside allowed range<br />
                            • <strong>Custom Error</strong>: extend Error class for business logic
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="text-yellow-400 font-bold text-sm">🔄 Async Error Handling</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <strong>try/catch</strong>: wrap async/await<br />
                            • <strong>.catch()</strong>: chain on promises<br />
                            • <strong>Promise.allSettled()</strong>: doesn&apos;t fail when 1 promise rejects<br />
                            • ⚠️ <strong>Unhandled rejection</strong>: crashes the process (Node.js)!
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">⚛️ React Error Handling</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <strong>Error Boundary</strong>: catches render errors (class component only)<br />
                            • <strong>Suspense</strong>: loading states for async components<br />
                            • <strong>react-error-boundary</strong>: HOC/hook API for error boundaries<br />
                            • ⚠️ Error Boundary <strong>does NOT catch</strong>: event handlers, async code, SSR
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

// Global error handlers
window.addEventListener('error', (e) => {
  reportToSentry(e.error)       // JS errors
})
window.addEventListener('unhandledrejection', (e) => {
  reportToSentry(e.reason)      // Unhandled promise rejections
})`}</CodeBlock>
                <Callout type="tip">Interview: mentioning <Highlight>Result type pattern</Highlight> (Go/Rust style) instead of try/catch everywhere → shows engineering maturity. Knowing Error Boundary limitations → senior level.</Callout>
            </TopicModal>

            <TopicModal title="Web Workers & Service Workers" emoji="⚙️" color="#10b981" summary="Multi-threading in the browser, offline capability, background sync">
                <Paragraph>Browser runs JS on the <Highlight>main thread</Highlight> — heavy computation blocks UI. Web Workers solve this.</Paragraph>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">🧵 Web Workers</div>
                        <div className="text-slate-300 text-sm mt-1">
                            Run JS in a <strong>background thread</strong> — doesn&apos;t block UI.<br />
                            • Communicate via <InlineCode>postMessage()</InlineCode> (structured clone)<br />
                            • <strong>Cannot access</strong>: DOM, window, document<br />
                            • Use cases: image processing, crypto, parsing large JSON/CSV<br />
                            • <strong>SharedWorker</strong>: share 1 worker between tabs
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">📡 Service Workers</div>
                        <div className="text-slate-300 text-sm mt-1">
                            Proxy between browser and network — <strong>offline capability</strong>.<br />
                            • <strong>Cache API</strong>: cache responses for offline access<br />
                            • <strong>Push notifications</strong>: receive messages when app is closed<br />
                            • <strong>Background sync</strong>: retry failed requests when back online<br />
                            • PWA (Progressive Web App) requires a service worker
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">🆕 Other Important Web APIs</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <strong>requestAnimationFrame</strong>: smooth 60fps animations (instead of setInterval)<br />
                            • <strong>requestIdleCallback</strong>: defer non-critical work when main thread is free<br />
                            • <strong>AbortController</strong>: cancel fetch requests (race conditions)<br />
                            • <strong>Broadcast Channel</strong>: communicate between tabs/windows
                        </div>
                    </div>
                </div>
                <CodeBlock title="web-workers.ts">{`// Web Worker — heavy computation off main thread
// worker.ts
self.onmessage = (e: MessageEvent) => {
  const { data } = e
  const result = data.sort((a, b) => a - b) // sort 1M items
  self.postMessage(result)
}

// main.ts
const worker = new Worker(new URL('./worker.ts', import.meta.url))
worker.postMessage(hugeArray)
worker.onmessage = (e) => console.log('Sorted:', e.data)

// AbortController — cancel fetch (prevent race conditions)
const controller = new AbortController()
fetch('/api/search?q=hello', { signal: controller.signal })
  .then(res => res.json())
  .then(data => setResults(data))
  .catch(err => {
    if (err.name === 'AbortError') return // cancelled, ignore
    throw err
  })
controller.abort() // cancel the request`}</CodeBlock>
                <Callout type="tip">Interview: {'"The page is janky when sorting a large list"'} → <Highlight>Web Worker</Highlight> for sorting. {'"Cancel previous search request when user keeps typing"'} → AbortController.</Callout>
            </TopicModal>

            <TopicModal title="WeakMap, WeakRef & FinalizationRegistry" emoji="🧹" color="#8b5cf6" summary="Memory management, garbage collection awareness — senior-level interview topic">
                <Paragraph><Highlight>WeakMap/WeakRef</Highlight> allow referencing objects without preventing garbage collection — important for memory management.</Paragraph>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">🗺️ WeakMap vs Map</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <strong>Map</strong>: keys can be any type. <strong>Holds reference</strong> → prevents GC<br />
                            • <strong>WeakMap</strong>: keys <strong>must be objects</strong>. Weak reference → <strong>allows GC</strong><br />
                            • WeakMap is <strong>not iterable</strong> (no size, no forEach, no keys/values)<br />
                            • Use case: cache metadata for DOM elements, private data for classes
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">👻 WeakRef & FinalizationRegistry</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <strong>WeakRef</strong>: weak reference — <InlineCode>ref.deref()</InlineCode> may return undefined<br />
                            • <strong>FinalizationRegistry</strong>: callback when object is GC&apos;d<br />
                            • Use case: cache expensive objects without leaking memory<br />
                            • ⚠️ Rarely used directly — but understanding = senior mindset
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
}`}</CodeBlock>
                <Callout type="tip">Interview: When asked about <Highlight>memory leaks</Highlight> → mention WeakMap/WeakRef. Explaining why Map holds references and prevents GC → senior level answer.</Callout>
            </TopicModal>
        </div>

        <Heading3>2.2 Implement from Scratch (click for sample code)</Heading3>
        <a href="/blogs/js-common-functions" target="_blank" rel="noopener noreferrer" className="mb-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 See JS Common Functions collection →</a>
        <div className="my-4 space-y-2">
            <TopicModal title="Array.map / filter / reduce" emoji="💻" color="#fbbf24" summary="Re-implement the 3 most popular Array higher-order functions">
                <Heading3>📖 How to Use</Heading3>
                <CodeBlock title="map / filter / reduce — real-world usage">{`// map: transform each element → new array of same length
const prices = [100, 200, 300]
const withTax = prices.map(p => p * 1.1)  // [110, 220, 330]

// filter: keep elements matching condition → shorter array
const expensive = prices.filter(p => p > 150)  // [200, 300]

// reduce: aggregate all → single value
const total = prices.reduce((sum, p) => sum + p, 0)  // 600

// 🔗 Power combo: filter → map → reduce
const result = products
    .filter(p => p.inStock)       // keep in-stock items
    .map(p => p.price * p.qty)    // calc subtotal per item
    .reduce((sum, x) => sum + x, 0) // grand total`}</CodeBlock>

                <Heading3>🔧 How to Build (Re-implement)</Heading3>
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
                <Callout type="tip">Remember to handle the edge case: <InlineCode>reduce</InlineCode> without initialValue uses <InlineCode>this[0]</InlineCode> and starts from index 1.</Callout>

                <Heading3>🏭 Reduce Mnemonic: The Juicer Machine</Heading3>
                <Paragraph>Think of <Highlight>reduce = a fruit juicer</Highlight>: 🍊🍊🍊 → 🧃</Paragraph>
                <Paragraph><InlineCode>[🍊, 🍊, 🍊, 🍊] → reduce → 🧃 (1 glass of juice)</InlineCode></Paragraph>

                <div className="my-4 overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead><tr className="border-b border-[var(--border-primary)] text-left">
                            <th className="p-2 text-[#fbbf24] font-bold">ACIV</th><th className="p-2">What</th><th className="p-2">Visual</th>
                        </tr></thead>
                        <tbody>
                            <tr className="border-b border-gray-100"><td className="p-2 font-bold">A — Accumulator</td><td className="p-2">Container (accumulated result)</td><td className="p-2">🧃 Glass filling up</td></tr>
                            <tr className="border-b border-gray-100"><td className="p-2 font-bold">C — Current Item</td><td className="p-2">Fruit being juiced</td><td className="p-2">🍊 Current orange</td></tr>
                            <tr className="border-b border-gray-100"><td className="p-2 font-bold">I — Initial Value</td><td className="p-2">Starting glass (empty or pre-filled)</td><td className="p-2">🥤 Empty glass</td></tr>
                            <tr><td className="p-2 font-bold">V — (return) Value</td><td className="p-2">Result = new accumulator</td><td className="p-2">🧃 Glass after adding juice</td></tr>
                        </tbody>
                    </table>
                </div>

                <CodeBlock title="Examples: Easy → Hard">{`// 1️⃣ Sum — glass filling up
[1, 2, 3, 4].reduce((glass, orange) => glass + orange, 0)
//  glass=0, orange=1 → 1 → glass=1, orange=2 → 3 → ... → 10 ✅

// 2️⃣ Frequency count — sort fruits into bins
['🍎','🍊','🍎','🍊','🍎'].reduce((bins, fruit) => {
    bins[fruit] = (bins[fruit] || 0) + 1
    return bins
}, {})  // → { '🍎': 3, '🍊': 2 }

// 3️⃣ Flatten — open nested boxes
[[1,2], [3,4], [5]].reduce((res, box) => [...res, ...box], [])
// → [1, 2, 3, 4, 5]

// 4️⃣ Pipeline — water flowing through filters
const pipeline = [addTax, applyDiscount, roundPrice]
pipeline.reduce((price, fn) => fn(price), 100)
// 100 → addTax → 110 → applyDiscount → 99 → roundPrice → 99.00`}</CodeBlock>

                <Callout type="info">reduce = &quot;many → one&quot;: Array of numbers → 1 sum, array of strings → 1 counting object, array of arrays → 1 flat array, array of functions → 1 result. If you need to transform an array into one thing → use reduce!</Callout>
            </TopicModal>

            <TopicModal title="Function.bind / call / apply" emoji="💻" color="#fbbf24" summary="Re-implement the 3 methods that change this context">
                <Heading3>How to Use</Heading3>
                <CodeBlock title="bind / call / apply — 3 ways to change this">{`const user = { name: 'An' }
function greet(greeting, punctuation) {
    return greeting + ', ' + this.name + punctuation
}

// call — invoke NOW, pass args SEPARATELY
greet.call(user, 'Hi', '!')         // 'Hi, An!'

// apply — invoke NOW, pass args as ARRAY
greet.apply(user, ['Hi', '!'])      // 'Hi, An!'

// bind — RETURNS new function, does NOT invoke
const boundGreet = greet.bind(user, 'Hi')
boundGreet('!')                     // 'Hi, An!'

// 💡 Mnemonic:
// call  = C = Comma      → args separated by commas
// apply = A = Array       → args passed as array
// bind  = B = Bind (save) → returns new function`}</CodeBlock>

                <Heading3>Build from Scratch</Heading3>
                <CodeBlock title="myBind">{`Function.prototype.myBind = function(context, ...args) {
    const fn = this;
    return function(...newArgs) {
        return fn.apply(context, [...args, ...newArgs]);
    };
};

// Example:
const obj = { name: 'An' };
function greet(greeting) { return greeting + ', ' + this.name; }
const bound = greet.myBind(obj, 'Hello');
bound(); // "Hello, An"`}</CodeBlock>
                <CodeBlock title="myCall & myApply">{`Function.prototype.myCall = function(context, ...args) {
    context = context || globalThis;
    const sym = Symbol(); // unique key to avoid conflicts
    context[sym] = this;
    const result = context[sym](...args);
    delete context[sym];
    return result;
};

Function.prototype.myApply = function(context, args = []) {
    return this.myCall(context, ...args);
};`}</CodeBlock>
                <Callout type="warning">Trick: use <InlineCode>Symbol()</InlineCode> as a temporary key on the object to avoid overwriting existing properties.</Callout>
            </TopicModal>

            <TopicModal title="Promise & Promise.all" emoji="💻" color="#fbbf24" summary="Implement Promise from scratch — the most classic interview question">
                <Heading3>How to Use</Heading3>
                <CodeBlock title="Promise basics">{`// Create a Promise
const promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve('Done!'), 1000)
})

// Handle results
promise
    .then(result => console.log(result))   // 'Done!'
    .catch(error => console.error(error))  // If rejected
    .finally(() => console.log('Cleanup')) // Always runs

// Promise.all — wait for ALL to complete
const [users, posts] = await Promise.all([
    fetch('/api/users').then(r => r.json()),
    fetch('/api/posts').then(r => r.json()),
])
// 1 fails → ALL fail!

// Promise.allSettled — wait for all, NEVER fails
const results = await Promise.allSettled([p1, p2, p3])
// [{status:'fulfilled', value:...}, {status:'rejected', reason:...}]`}</CodeBlock>

                <Heading3>Build from Scratch</Heading3>
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
            }, reject); // 1 fail → reject all
        });
        if (promises.length === 0) resolve([]);
    });
};`}</CodeBlock>
            </TopicModal>

            <TopicModal title="Debounce & Throttle" emoji="💻" color="#fbbf24" summary="2 techniques to control function call frequency — very common in interviews">
                <Heading3>How to Use</Heading3>
                <CodeBlock title="When to use Debounce vs Throttle">{`// DEBOUNCE — wait for user to STOP, then execute
// Use for: search input, window resize, auto-save
const searchInput = document.querySelector('#search')
searchInput.addEventListener('input', 
    debounce((e) => fetchResults(e.target.value), 300)
)
// User types: h...e...l...l...o → only 1 API call after 300ms pause

// THROTTLE — execute AT MOST once per time interval
// Use for: scroll, mousemove, game loop
window.addEventListener('scroll',
    throttle(() => updateScrollProgress(), 100)
)
// User scrolls continuously → runs every 100ms max, not every pixel

// 💡 Mnemonic:
// Debounce = Elevator 🛗  → waits for everyone to get in before closing
// Throttle = Heartbeat 💓  → steady rhythm, never faster than set rate`}</CodeBlock>

                <Heading3>Build from Scratch</Heading3>
                <CodeBlock title="debounce — wait for user to stop, then execute">{`function debounce(fn, delay) {
    let timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}

// Example: search input — only call API after user stops typing for 300ms
const search = debounce((query) => fetch(\`/api?q=\${query}\`), 300);
input.addEventListener('input', (e) => search(e.target.value));`}</CodeBlock>
                <CodeBlock title="throttle — execute at most once per interval">{`function throttle(fn, interval) {
    let lastTime = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastTime >= interval) {
            lastTime = now;
            fn.apply(this, args);
        }
    };
}

// Example: scroll handler — at most once per 100ms
window.addEventListener('scroll', throttle(handleScroll, 100));`}</CodeBlock>
                <Callout type="tip"><strong>Debounce</strong> = search typing, window resize. <strong>Throttle</strong> = scroll, mousemove. Remember both return a <strong>new function</strong>.</Callout>
            </TopicModal>

            <TopicModal title="Deep clone / Deep equal" emoji="💻" color="#fbbf24" summary="Compare and copy nested objects — shallow vs deep distinction">
                <Heading3>How to Use</Heading3>
                <CodeBlock title="3 built-in cloning methods in JS">{`const obj = { a: { b: 1 }, c: [2, 3] }

// 1️⃣ Shallow copy — ONLY copies layer 1 (nested still shares reference!)
const shallow1 = { ...obj }           // spread
const shallow2 = Object.assign({}, obj) // assign
shallow1.a.b = 999
console.log(obj.a.b) // 999 — AFFECTED! ❌

// 2️⃣ JSON trick — deep but LOSES functions, Date, undefined, circular
const jsonClone = JSON.parse(JSON.stringify(obj))
// ⚠️ Doesn't support: Function, Date, RegExp, Map, Set, undefined

// 3️⃣ structuredClone — BEST METHOD (ES2022)
const deep = structuredClone(obj)
deep.a.b = 999
console.log(obj.a.b) // 1 — NOT affected! ✅
// ✅ Supports: Date, RegExp, Map, Set, ArrayBuffer, circular ref
// ❌ Doesn't support: Function, DOM nodes`}</CodeBlock>

                <Heading3>Build from Scratch</Heading3>
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
                <Callout type="warning">Important edge case: <Highlight>circular reference</Highlight> — use WeakMap to track cloned objects. Many candidates forget this!</Callout>
            </TopicModal>

            <TopicModal title="Event Emitter (pub/sub)" emoji="💻" color="#fbbf24" summary="Core pattern of Node.js, React, and every event system">
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

// Usage:
const bus = new EventEmitter();
bus.on('message', (text) => console.log(text));
bus.emit('message', 'Hello!'); // "Hello!"`}</CodeBlock>
            </TopicModal>

            <TopicModal title="Curry function" emoji="💻" color="#fbbf24" summary="Transform f(a,b,c) into f(a)(b)(c) — functional programming pattern">
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

// Example:
const add = curry((a, b, c) => a + b + c);
add(1)(2)(3);     // 6
add(1, 2)(3);     // 6  — partial application
add(1)(2, 3);     // 6
add(1, 2, 3);     // 6

// Practical use:
const log = curry((level, time, msg) =>
    console.log(\`[\${level}] \${time}: \${msg}\`)
);
const errorLog = log('ERROR');
const errorNow = errorLog(new Date().toISOString());
errorNow('Database down!');`}</CodeBlock>
                <Callout type="tip">Key: compare <InlineCode>args.length</InlineCode> with <InlineCode>fn.length</InlineCode> (number of params function needs). Enough → call it, not enough → return new function.</Callout>
            </TopicModal>

            <TopicModal title="Flatten array / object" emoji="💻" color="#fbbf24" summary="Flatten nested arrays/objects — commonly asked at Google, Meta">
                <Heading3>How to Use</Heading3>
                <CodeBlock title="Built-in Flatten in JS">{`// Array.flat() — built-in since ES2019
[1, [2, [3, [4]]]].flat()       // [1, 2, [3, [4]]]  — default depth=1
[1, [2, [3, [4]]]].flat(2)      // [1, 2, 3, [4]]    — depth=2
[1, [2, [3, [4]]]].flat(Infinity) // [1, 2, 3, 4]    — flatten all!

// Trick: use flatMap to map and flatten 1 level
['Hello World', 'Foo Bar'].flatMap(s => s.split(' '))
// → ['Hello', 'World', 'Foo', 'Bar']

// Object.entries + reduce — flatten objects manually
const nested = { a: { b: 1 }, c: 2 }
// Want → { 'a.b': 1, 'c': 2 } → need custom build (see below)`}</CodeBlock>

                <Heading3>Build from Scratch</Heading3>
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

        <Heading3>2.3 Resources</Heading3>
        <div className="my-4 space-y-2">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-yellow-400">📕</span>
                <div className="text-slate-300 text-sm">
                    <strong>You Don&apos;t Know JS</strong> (Kyle Simpson) — read the entire series for extremely deep JS understanding
                </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-yellow-400">📗</span>
                <div className="text-slate-300 text-sm">
                    <strong>javascript.info</strong> — best online resource with examples + exercises
                </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-yellow-400">📘</span>
                <div className="text-slate-300 text-sm">
                    <strong>GreatFrontEnd.com</strong> — frontend interview platform with mock interviews
                </div>
            </div>
        </div>

        <Callout type="warning">
            Big tech companies <Highlight>love asking you to implement from scratch</Highlight>: &quot;Re-code Promise.all&quot;,
            &quot;Write debounce without lodash&quot;. If you only use the API without understanding the internals, you&apos;ll fail this round.
        </Callout>

        <Heading3>2.4 Rapid-Fire Interview Questions</Heading3>
        <Paragraph>
            Interviews often include <Highlight>short theoretical questions</Highlight> to quickly assess knowledge.
            Below are the <Highlight>most common ones</Highlight> — you must be able to answer immediately.
        </Paragraph>

        <div className="my-4 space-y-2">
            <TopicModal title="JS Fundamentals — 15 Classic Questions" emoji="⚡" color="#fbbf24" summary="var/let/const, hoisting, truthy/falsy, == vs === — every interview asks these">
                <div className="my-3 space-y-3">
                    {[
                        ['Q: How are var, let, const different?', 'var: function-scoped, hoisted (undefined), can re-declare.\nlet: block-scoped, hoisted (TDZ), can re-assign.\nconst: block-scoped, hoisted (TDZ), cannot re-assign (but object/array contents are still mutable!).'],
                        ['Q: What is hoisting? Give an example.', 'Hoisting: JS moves declarations to the top of scope before executing.\nvar → hoisted, value = undefined.\nlet/const → hoisted but in TDZ (Temporal Dead Zone) → ReferenceError if accessed before declaration.\nfunction declaration → fully hoisted (including body).'],
                        ['Q: == vs === difference?', '== (loose): compares with type coercion (1 == "1" → true).\n=== (strict): no coercion, compares both value + type (1 === "1" → false).\n→ Always use === unless checking null/undefined (x == null).'],
                        ['Q: null vs undefined?', 'undefined: variable declared but not assigned, or function without return.\nnull: explicitly assigned = "no value".\ntypeof null === "object" (historical JS bug).\nnull == undefined → true, null === undefined → false.'],
                        ['Q: What is a closure? Real-world example?', 'Closure: a function "remembers" variables from its outer scope even after that scope has ended.\nReal examples: debounce, throttle, module pattern, React hooks (useState internally uses closures).'],
                        ['Q: Arrow function vs regular function?', '1. No own this — inherits from parent scope.\n2. No arguments object.\n3. Cannot be used as constructor (new).\n4. Cannot be a generator (function*).\n→ In React: always use arrow functions for event handlers.'],
                        ['Q: Truthy / falsy values?', 'Falsy (6 values): false, 0, "" (empty string), null, undefined, NaN.\nAll other values are truthy (including [], {}, "0", "false").'],
                        ['Q: Explain call stack and event loop.', 'Call stack: LIFO, runs synchronous code.\nWeb APIs: setTimeout, fetch... run outside call stack.\nCallback/Task Queue: macro tasks (setTimeout).\nMicrotask Queue: Promises, queueMicrotask.\nEvent Loop: when stack is empty → takes microtasks first → then macrotasks.'],
                        ['Q: Spread operator vs rest parameter?', 'Spread (...): "expands" array/object → {...obj}, [...arr].\nRest (...): "collects" params → function(...args).\nSame syntax ... but opposite meaning: spread = unpack, rest = pack.'],
                        ['Q: map, filter, reduce vs forEach?', 'forEach: just loops, returns undefined, no new array.\nmap: returns new array, same length.\nfilter: returns new array, items matching condition.\nreduce: returns 1 value from array.\n→ forEach for side effects (log, API call), map/filter/reduce for data transformation.'],
                        ['Q: Shallow copy vs deep copy?', 'Shallow: copies level 1, nested objects still share reference.\n→ {...obj}, [...arr], Object.assign.\nDeep: copies all levels, completely independent.\n→ structuredClone() (modern), JSON.parse(JSON.stringify()) (old, loses functions/Date).'],
                        ['Q: Pass by value vs pass by reference?', 'Primitives: pass by value (copies the value).\nObjects/Arrays: pass by reference (share the same reference).\n→ Changing a property of an object inside a function WILL change the original object.'],
                        ['Q: Does setTimeout(fn, 0) run immediately?', 'NO! setTimeout(fn, 0) puts fn into the macrotask queue.\nOnly runs when call stack is EMPTY and all microtasks are done.\n→ console.log(1); setTimeout(() => console.log(2), 0); console.log(3);\n→ Output: 1, 3, 2.'],
                        ['Q: Promise.all vs Promise.allSettled?', 'Promise.all: fails IMMEDIATELY when 1 promise rejects (fast-fail).\nPromise.allSettled: waits for ALL to complete, returns [{status, value/reason}].\n→ Use all when all must succeed. Use allSettled when you need each result.'],
                        ['Q: What is destructuring?', 'Destructuring: "extract" values from objects/arrays into variables.\nObject: const { name, age } = user;\nArray: const [first, ...rest] = arr;\nSupports: rename, default values, nested destructuring.'],
                    ].map(([q, a]) => (
                        <div key={q} className="p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                            <div className="text-yellow-400 text-sm font-bold mb-2">{q}</div>
                            <div className="text-slate-300 text-sm whitespace-pre-line">{a}</div>
                        </div>
                    ))}
                </div>
                <Callout type="tip">Tip: For theory questions → answer <Highlight>concisely + with an example</Highlight>. {'"var is function-scoped, e.g. console.log(x) // undefined due to hoisting"'} is better than just {'"var is function scoped"'}.</Callout>
            </TopicModal>

            <TopicModal title="HTML/CSS — 10 Common Questions" emoji="🎨" color="#38bdf8" summary="box model, position, flexbox, responsive — CSS is where many developers are weakest">
                <div className="my-3 space-y-3">
                    {[
                        ['Q: What is the box model?', 'Every element has 4 layers: Content → Padding → Border → Margin.\nbox-sizing: content-box (default): width = content only.\nbox-sizing: border-box: width = content + padding + border.\n→ Always use border-box (*, *::before, *::after { box-sizing: border-box; }).'],
                        ['Q: position: relative, absolute, fixed, sticky?', 'static: default, normal flow.\nrelative: offset from ORIGINAL POSITION, still occupies space.\nabsolute: offset from nearest positioned PARENT, removed from flow.\nfixed: offset from VIEWPORT, removed from flow.\nsticky: relative until scroll reaches threshold → becomes fixed.'],
                        ['Q: display: none vs visibility: hidden vs opacity: 0?', 'display: none — removed from DOM flow, takes no space.\nvisibility: hidden — still takes space, invisible, not clickable.\nopacity: 0 — still takes space, invisible, STILL clickable.\n→ Accessibility: use sr-only class (position: absolute, clip) for screen readers.'],
                        ['Q: em, rem, px differences?', 'px: fixed size, not responsive.\nem: relative to PARENT font-size → compounds when nested.\nrem: relative to ROOT (html) font-size → predictable.\n→ Best practice: font-size use rem, spacing use rem or em, borders use px.'],
                        ['Q: Flexbox vs Grid — when to use?', 'Flexbox: 1-dimensional (row OR column). Use for: navbar, button group, card row.\nGrid: 2-dimensional (rows AND columns). Use for: page layout, dashboard, gallery.\n→ "Flex for components, Grid for layouts."'],
                        ['Q: Pseudo-class vs pseudo-element?', 'Pseudo-class (:hover, :focus, :nth-child) — styles the STATE of an element.\nPseudo-element (::before, ::after, ::placeholder) — creates a VIRTUAL element.\nPseudo-class: single colon. Pseudo-element: double colon.'],
                        ['Q: Responsive design approach?', 'Mobile-first: min-width (default mobile, add styles for desktop).\nDesktop-first: max-width (default desktop, override for mobile).\n→ Mobile-first is better: less CSS, better performance on mobile.\nCommon breakpoints: 640px (sm), 768px (md), 1024px (lg), 1280px (xl).'],
                        ['Q: How does z-index work?', 'z-index only works on elements with position other than static.\nStacking context: created by position + z-index, opacity < 1, transform, filter.\nz-index only compares WITHIN the same stacking context.\n→ Tip: avoid z-index wars, use semantic layers (modal: 100, dropdown: 50, tooltip: 200).'],
                        ['Q: CSS selector priority?', '!important > inline style > #id > .class/:pseudo-class/[attr] > tag > *.\nWhen same specificity → later rule wins.\n→ Keep specificity low. Avoid !important. Use classes instead of IDs.'],
                        ['Q: How to center an element?', 'Flex: display: flex; justify-content: center; align-items: center;\nGrid: display: grid; place-items: center;\nAbsolute: position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);\nMargin: margin: 0 auto (horizontal only, needs width).'],
                    ].map(([q, a]) => (
                        <div key={q} className="p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                            <div className="text-blue-400 text-sm font-bold mb-2">{q}</div>
                            <div className="text-slate-300 text-sm whitespace-pre-line">{a}</div>
                        </div>
                    ))}
                </div>
                <Callout type="tip">CSS is commonly tested in interviews: <Highlight>centering, box model, position, flexbox/grid</Highlight>. Many companies give live CSS coding tests — you must know these by heart.</Callout>
            </TopicModal>

            <TopicModal title="React — 12 Interview Questions" emoji="⚛️" color="#61DAFB" summary="lifecycle, hooks, key, controlled/uncontrolled — must answer within 30 seconds">
                <div className="my-3 space-y-3">
                    {[
                        ['Q: React lifecycle methods?', 'Mounting: constructor → render → componentDidMount (≈ useEffect(fn, [])).\nUpdating: render → componentDidUpdate (≈ useEffect(fn, [deps])).\nUnmounting: componentWillUnmount (≈ useEffect cleanup return).\n→ Hooks have replaced lifecycle methods. But you must know the mapping.'],
                        ['Q: useState vs useRef?', 'useState: stores state, changes → re-render.\nuseRef: stores a value, changes → NO re-render.\n→ useRef for: DOM reference, timer ID, previous value, mutable value that doesn\'t need UI update.'],
                        ['Q: useEffect dependency array?', 'useEffect(fn) — runs EVERY render.\nuseEffect(fn, []) — runs once after mount.\nuseEffect(fn, [a, b]) — runs when a or b changes.\nCleanup: return () => {} — runs on unmount or before new effect.'],
                        ['Q: Why do we need key in lists?', 'key helps React identify which elements changed, were added, or removed (reconciliation).\n❌ Using index as key → bugs when reordering/deleting (state mixes between items).\n✅ Use unique ID (from API, UUID).\n→ No key → React uses index by default → warning.'],
                        ['Q: Controlled vs Uncontrolled component?', 'Controlled: React manages value via state (value={state}, onChange={setState}).\nUncontrolled: DOM manages value, React reads via ref (useRef).\n→ Simple forms: uncontrolled (register ref). Complex forms: controlled (real-time validation).'],
                        ['Q: useMemo vs useCallback?', 'useMemo: memoizes COMPUTED VALUE → useMemo(() => expensiveCalc(a), [a]).\nuseCallback: memoizes FUNCTION → useCallback(fn, [deps]).\nuseCallback(fn, deps) = useMemo(() => fn, deps).\n→ Only use when: 1) heavy computation 2) reference equality matters 3) React.memo child.'],
                        ['Q: What is props drilling? Solutions?', 'Props drilling: passing props through many intermediate component layers.\nSolutions:\n1. Context API — share global state (theme, auth, locale).\n2. Composition — render children directly.\n3. State management — Redux, Zustand.\n→ Context is good for low-frequency updates. Redux/Zustand for complex state.'],
                        ['Q: When does React re-render?', '1. State changes (setState).\n2. Props change.\n3. Parent re-renders (even if props haven\'t changed!).\n4. Context value changes.\n→ Avoid unnecessary re-renders: React.memo, useMemo, useCallback, state colocation.'],
                        ['Q: Explain Virtual DOM.', 'Virtual DOM = JS object representing the real DOM.\nWhen state changes:\n1. React creates a new Virtual DOM.\n2. Compares (diffs) with the old Virtual DOM.\n3. Calculates minimal changes (reconciliation).\n4. Batch updates the real DOM.\n→ Faster than direct DOM manipulation because of batch updates + minimal DOM operations.'],
                        ['Q: When to use useContext?', 'useContext: share global data without props drilling.\nUse cases: theme, language/locale, auth user, toast notifications.\n⚠️ Limitation: ALL consumers re-render when context value changes.\n→ Split context by domain. Don\'t use for frequently changing data (mouse position).'],
                        ['Q: What is a Higher-Order Component (HOC)?', 'HOC = function that takes a component and returns a new component with added logic.\nExample: withAuth(Component) → checks auth before rendering.\nDrawbacks: wrapper hell, hard to debug, naming collisions.\n→ Hooks have replaced most HOC use cases. But HOCs are still used for cross-cutting concerns.'],
                        ['Q: What are custom hooks? Give an example.', 'Custom hook = function starting with "use", using hooks inside.\nExamples: useDebounce, useLocalStorage, useWindowSize, useFetch.\nKey feature: shares logic, NOT state (each component using the hook has its own state).\n→ Rule: logic reused ≥ 2 times → extract into a custom hook.'],
                    ].map(([q, a]) => (
                        <div key={q} className="p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                            <div className="text-cyan-400 text-sm font-bold mb-2">{q}</div>
                            <div className="text-slate-300 text-sm whitespace-pre-line">{a}</div>
                        </div>
                    ))}
                </div>
                <Callout type="tip">Companies ask React the most: <Highlight>hooks, lifecycle, key, controlled forms, re-render optimization</Highlight>. Master these 12 questions and you&apos;ll cover 80% of React interview questions.</Callout>
            </TopicModal>
        </div>

        <Heading3>2.5 CORS, Cookies &amp; JWT</Heading3>
        <div className="my-4 space-y-2">
            <TopicModal title="CORS, Cookies & JWT" emoji="🔐" color="#f97316" summary="Authentication & Security — 3 related concepts often asked together in interviews">
                <Paragraph><Highlight>CORS</Highlight> = who can call the API. <Highlight>JWT</Highlight> = who you are. <Highlight>Cookie</Highlight> = how to transport JWT securely.</Paragraph>

                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">🌐 CORS (Cross-Origin Resource Sharing)</div>
                        <div className="text-slate-300 text-sm mt-1">
                            Browsers enforce <strong>Same-Origin Policy</strong>: only allows requests to the same origin (protocol + domain + port).<br />
                            <strong>CORS = mechanism for the server to say &quot;I accept requests from other origins&quot;</strong><br /><br />
                            • <InlineCode>Access-Control-Allow-Origin</InlineCode>: which origins are allowed<br />
                            • <InlineCode>Access-Control-Allow-Methods</InlineCode>: GET, POST, PUT...<br />
                            • <InlineCode>Access-Control-Allow-Credentials: true</InlineCode>: allow sending cookies<br />
                            • <strong>Preflight (OPTIONS)</strong>: browser sends OPTIONS before POST JSON / custom headers
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="text-yellow-400 font-bold text-sm">🍪 Cookies</div>
                        <div className="text-slate-300 text-sm mt-1">
                            Cookie = data the server sends back, <strong>browser automatically sends it with every request</strong>.<br /><br />
                            • <InlineCode>HttpOnly</InlineCode>: JS cannot read it (prevents XSS stealing cookies)<br />
                            • <InlineCode>Secure</InlineCode>: only sent over HTTPS<br />
                            • <InlineCode>SameSite=Strict</InlineCode>: only sent for same-site requests (prevents CSRF)<br />
                            • <InlineCode>SameSite=Lax</InlineCode>: allows top-level navigation (clicking links)<br />
                            • <InlineCode>SameSite=None</InlineCode>: cross-site OK (requires Secure, used for OAuth)<br />
                            • <InlineCode>Max-Age</InlineCode>: lifetime in seconds. Not set = session cookie (lost on browser close)
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">🎫 JWT (JSON Web Token)</div>
                        <div className="text-slate-300 text-sm mt-1">
                            JWT = a token that <strong>contains user info itself</strong>, server doesn&apos;t need to store sessions.<br />
                            <strong>3 parts</strong>: header.payload.signature<br /><br />
                            • <strong>Header</strong>: algorithm + type (<InlineCode>{`{"alg":"HS256","typ":"JWT"}`}</InlineCode>)<br />
                            • <strong>Payload</strong>: data/claims (<InlineCode>{`{"userId":"1001","role":"admin","exp":...}`}</InlineCode>)<br />
                            • <strong>Signature</strong>: HMAC(header + payload, SECRET) → verifies token hasn&apos;t been tampered
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                        <div className="text-orange-400 font-bold text-sm">🔗 How do they relate?</div>
                        <div className="text-slate-300 text-sm mt-1">
                            1. User login → server creates <strong>JWT</strong> (signed with SECRET_KEY)<br />
                            2. Server sends JWT in an <strong>HttpOnly Cookie</strong> (most secure)<br />
                            3. Browser automatically sends cookie with every request → server verifies JWT<br />
                            4. If cross-origin → need <strong>CORS</strong> to allow + <InlineCode>credentials: true</InlineCode>
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <div className="text-red-400 font-bold text-sm">📦 Where to store JWT?</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <strong>HttpOnly Cookie</strong> ✅ — JS cannot read it (prevents XSS). Best practice!<br />
                            • <strong>localStorage</strong> ❌ — XSS can read token! Avoid for auth tokens<br />
                            • <strong>Memory (RAM)</strong> — Most secure but lost on page refresh
                        </div>
                    </div>
                </div>

                <CodeBlock title="cors-cookies-jwt.ts">{`// ===== Express Setup =====
app.use(cors({
  origin: 'https://myapp.com',      // CORS: allow frontend
  credentials: true,                  // CORS: allow cookies
}))

// Login → set JWT in HttpOnly Cookie
app.post('/login', async (req, res) => {
  const user = await authenticate(req.body)
  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )
  res.cookie('token', token, {
    httpOnly: true,     // ← Prevent XSS
    secure: true,       // ← HTTPS only
    sameSite: 'strict', // ← Prevent CSRF
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  })
  res.json({ message: 'Logged in', user })
})

// Middleware: verify JWT from cookie
function authMiddleware(req, res, next) {
  const token = req.cookies.token
  if (!token) return res.status(401).json({ error: 'No token' })
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET)
    next()
  } catch {
    res.status(401).json({ error: 'Invalid/expired token' })
  }
}

// ===== Frontend (fetch) =====
// MUST use credentials: 'include' for browser to send cookies cross-origin
const res = await fetch('https://api.myapp.com/profile', {
  credentials: 'include',  // ← Send cookies!
  headers: { 'Content-Type': 'application/json' },
})`}</CodeBlock>

                <Callout type="tip">Interview: {'"Explain CORS"'} + {'"Where to store JWT securely?"'} + {'"What is HttpOnly cookie?"'} = <Highlight>3 questions often asked together</Highlight>. Being able to explain the full flow (login → JWT → cookie → CORS) → senior answer.</Callout>
            </TopicModal>
        </div>

        {/* ===== PHASE 3 ===== */}
        <Heading2>Phase 3 — React & Deep Frontend (4-6 weeks)</Heading2>

        <Heading3>3.1 React (click for details)</Heading3>
        <div className="my-4 space-y-2">
            <TopicModal title="Virtual DOM &amp; Reconciliation" emoji="🌳" color="#61DAFB" summary="React diff algorithm — how React knows what to update on the real DOM">
                <Paragraph>React doesn&apos;t update the DOM directly. It uses a <Highlight>Virtual DOM</Highlight> — a JS object representing the real DOM. When state changes, React compares the old tree vs the new tree and only updates what changed.</Paragraph>

                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">🔄 Step-by-step Process</div>
                        <div className="text-slate-300 text-sm mt-1">
                            1. State/props change → React calls render() to create <strong>new Virtual DOM</strong><br />
                            2. <strong>Diffing</strong>: Compare old vs new tree — O(n) via 2 heuristics instead of O(n³)<br />
                            3. <strong>Reconciliation</strong>: Mark effects (insert, update, delete)<br />
                            4. <strong>Commit</strong>: Apply changes to real DOM (batched, synchronous)<br />
                            5. Browser repaint (layout → paint → composite)
                        </div>
                    </div>

                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">📏 2 Assumptions — Why O(n) instead of O(n³)</div>
                        <div className="text-slate-300 text-sm mt-1">
                            <strong>Assumption 1: Different type → destroy old tree, build new</strong><br />
                            • {'<div>'} → {'<span>'} = unmount entire subtree (including children), mount new<br />
                            • {'<Counter />'} → {'<Timer />'} = destroy Counter (loses state!), create Timer<br /><br />
                            <strong>Assumption 2: key identifies which elements persist</strong><br />
                            • No key → React compares by <strong>index</strong> (prepend = re-render everything!)<br />
                            • With key → React matches by <strong>key</strong> (precise insert/delete/move)
                        </div>
                    </div>

                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">⚡ React Fiber — Reconciliation Engine</div>
                        <div className="text-slate-300 text-sm mt-1">
                            <strong>Before (Stack Reconciler):</strong> synchronous render → blocks main thread → UI freezes<br />
                            <strong>After (Fiber):</strong> rendering can <strong>pause, resume, abort</strong><br /><br />
                            • <strong>Time slicing</strong>: split rendering into small chunks, yield to browser<br />
                            • <strong>Priority lanes</strong>: user input (urgent) {'>'} animation {'>'} data fetch (low)<br />
                            • <strong>Concurrent features</strong>: Suspense, startTransition, useDeferredValue<br />
                            • Each component = 1 <strong>Fiber node</strong> in linked list (not recursion)
                        </div>
                    </div>
                </div>

                <CodeBlock title="reconciliation-examples.tsx">{`// === 1. DIFFERENT TYPE → Destroy + Rebuild ===
// Before:                      After:
<div><Counter /></div>    →    <span><Counter /></span>
// React destroys <div> + unmounts Counter (LOSES STATE!)
// Creates <span> + mounts new Counter (state resets to 0)

// === 2. SAME TYPE → Only update changed attributes ===
// Before:                                 After:
<div className="old" title="a" />    →    <div className="new" title="a" />
// Keeps DOM node, only changes className. title unchanged → skip

// === 3. KEY: WHY IT MATTERS ===
// Initial list: ["A", "B"]
// Prepend "C":  ["C", "A", "B"]

// ❌ WITHOUT KEY (compare by index):
// [0] "A" → "C"  ← React thinks "A" became "C" → update text
// [1] "B" → "A"  ← React thinks "B" became "A" → update text
//          "B"  ← Create new
// → ALL 3 elements modified! Input state mixed between items 😱

// ✅ WITH KEY (compare by key):
// key="c" → "C"  ← New! Insert into DOM
// key="a" → "A"  ← Recognized, move position
// key="b" → "B"  ← Recognized, move position
// → Only INSERT 1 element, state preserved correctly ✅

// ❌ Bad: index as key
{items.map((item, index) => (
  <Input key={index} defaultValue={item.name} />
  // Sort list → DOM nodes stay at same position, only props change
  // → OLD input values show at NEW positions!
))}

// ✅ Good: unique ID as key
{items.map(item => (
  <Input key={item.id} defaultValue={item.name} />
  // React knows exactly which item moved → correct DOM reorder
))}`}</CodeBlock>

                <div className="my-3 overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead><tr className="border-b border-white/10">
                            <th className="text-left p-3 text-slate-400 font-medium">Scenario</th>
                            <th className="text-left p-3 text-red-400 font-medium">❌ No key (index)</th>
                            <th className="text-left p-3 text-green-400 font-medium">✅ With key</th>
                        </tr></thead>
                        <tbody className="text-slate-300">
                            <tr className="border-b border-white/5"><td className="p-3 text-slate-400">Prepend item</td><td className="p-3">Re-render everything</td><td className="p-3">Insert 1 only</td></tr>
                            <tr className="border-b border-white/5"><td className="p-3 text-slate-400">Delete middle</td><td className="p-3">Shift all after it</td><td className="p-3">Remove 1 only</td></tr>
                            <tr className="border-b border-white/5"><td className="p-3 text-slate-400">Reorder</td><td className="p-3">Re-render everything</td><td className="p-3">Move DOM nodes</td></tr>
                            <tr><td className="p-3 text-slate-400">State preservation</td><td className="p-3">State gets mixed up!</td><td className="p-3">State stays with element</td></tr>
                        </tbody>
                    </table>
                </div>

                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="text-yellow-400 font-bold text-sm">🆚 VDOM vs Direct DOM vs Signals</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <strong>VDOM (React)</strong>: diffing overhead but predictable, good DX<br />
                            • <strong>Direct DOM (Svelte)</strong>: compile-time, no runtime overhead, smaller bundle<br />
                            • <strong>Signals (Solid, Angular)</strong>: fine-grained reactivity, no unnecessary re-renders<br />
                            • Interview: knowing trade-offs between approaches → big plus
                        </div>
                    </div>
                </div>

                <CodeBlock title="concurrent-rendering.tsx">{`// React 18+: Concurrent Rendering — Fiber in action
function SearchApp() {
    const [query, setQuery] = useState('')
    const deferredQuery = useDeferredValue(query)

    // Input updates IMMEDIATELY (urgent lane)
    // SearchResults re-renders with deferredQuery (low priority lane)
    // Fiber can PAUSE SearchResults if user keeps typing!
    return <>
        <input value={query} onChange={e => setQuery(e.target.value)} />
        <Suspense fallback={<Spinner />}>
            <SearchResults query={deferredQuery} />
        </Suspense>
    </>
}`}</CodeBlock>

                <Callout type="tip">
                    Interview: <Highlight>Explain reconciliation in 3 pillars</Highlight>:<br />
                    1️⃣ <strong>2 heuristics</strong> (different type = rebuild, key = match) → O(n)<br />
                    2️⃣ <strong>key</strong> why it matters (example: reorder list with inputs)<br />
                    3️⃣ <strong>Fiber</strong> = interruptible rendering → Concurrent Mode<br />
                    Cover all 3 → interviewer will be impressed.
                </Callout>
            </TopicModal>

            <TopicModal title="Hooks deep dive" emoji="🪝" color="#61DAFB" summary="useState, useEffect, useRef, useMemo, useCallback — rules and pitfalls">
                <Paragraph>Hooks are the <Highlight>foundation</Highlight> of modern React. Deep understanding of each hook + pitfalls = confident interview answers.</Paragraph>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">📦 useState — State Management</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Basic state. <strong>Batch updates</strong> (React 18+ auto-batches in event handlers, setTimeout, promises)<br />
                            • Use <strong>function form</strong> for state depending on previous: <InlineCode>setState(prev =&gt; prev + 1)</InlineCode><br />
                            • <strong>Lazy initialization</strong>: <InlineCode>useState(() =&gt; expensiveCalc())</InlineCode> — only runs on first render<br />
                            • ⚠️ setState is <strong>async</strong> — can&apos;t read new state immediately after setting
                        </div>
                    </div>

                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">🔄 useEffect — Side Effects</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <strong>Dependency array</strong> determines when it runs: [] = mount only, [dep] = when dep changes<br />
                            • <strong>Cleanup function</strong> runs before each re-run AND on unmount<br />
                            • ⚠️ <strong>Stale closure</strong>: closure captures old value → use ref or function updater<br />
                            • ⚠️ <strong>Object/array deps</strong>: compared by reference → useMemo wrap or use primitive deps
                        </div>
                    </div>

                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">📌 useRef — Persistent References</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Persistent reference across renders. Changing <InlineCode>.current</InlineCode> <strong>does NOT cause re-render</strong><br />
                            • Use for: <strong>DOM ref</strong>, timers, previous value, mutable variables<br />
                            • Pattern: <InlineCode>usePrevious(value)</InlineCode> — store value from previous render<br />
                            • ⚠️ Don&apos;t read/write ref in render body — only in effects or handlers
                        </div>
                    </div>

                    <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="text-yellow-400 font-bold text-sm">🧠 useMemo & useCallback — Memoization</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <strong>useMemo</strong>: cache expensive computations. Only recalculates when deps change<br />
                            • <strong>useCallback</strong>: cache function reference. Important when passing to React.memo children<br />
                            • ⚠️ Don&apos;t overuse — has <strong>overhead</strong> (comparing deps every render)<br />
                            • Rule: only use when <strong>React DevTools Profiler</strong> confirms a bottleneck
                        </div>
                    </div>

                    <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                        <div className="text-cyan-400 font-bold text-sm">⏱️ useLayoutEffect vs useEffect</div>
                        <div className="text-slate-300 text-sm mt-1">
                            <strong>Timeline:</strong> Render → DOM mutation → <Highlight>useLayoutEffect</Highlight> (sync) → Paint → <Highlight>useEffect</Highlight> (async)<br /><br />
                            • <strong>useEffect</strong> (99%): runs <strong>AFTER paint</strong> — doesn&apos;t block UI, use for API calls, subscriptions<br />
                            • <strong>useLayoutEffect</strong>: runs <strong>BEFORE paint</strong> — blocks paint, use when you need to <strong>measure DOM then update</strong> without user seeing a flash<br />
                            • Examples: tooltip positioning, scroll sync, auto-resize elements<br />
                            • ⚠️ Overusing useLayoutEffect = <strong>blocking render</strong> = frozen UI. Only use to prevent visual flicker
                        </div>
                    </div>

                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <div className="text-red-400 font-bold text-sm">🌐 useContext — Global State</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Read context value. <strong>Re-renders when context value changes</strong> — all consumers!<br />
                            • ⚠️ Performance trap: 1 context change → <strong>every consumer re-renders</strong><br />
                            • Fix: <strong>split context</strong> (ThemeContext + UserContext instead of 1 AppContext)<br />
                            • Fix: <strong>useMemo</strong> context value or use a state management library
                        </div>
                    </div>
                </div>

                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                        <div className="text-orange-400 font-bold text-sm">🔀 useReducer — Complex State</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Replaces useState when state has <strong>multiple sub-values</strong> or <strong>complex logic</strong><br />
                            • Pattern: <InlineCode>const [state, dispatch] = useReducer(reducer, initialState)</InlineCode><br />
                            • <strong>When to use:</strong> multi-field forms, state machines, when next state depends on action type<br />
                            • Combine <InlineCode>useContext + useReducer</InlineCode> = mini Redux (no library needed)
                        </div>
                    </div>

                    <div className="p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                        <div className="text-indigo-400 font-bold text-sm">🆕 React 18+ New Hooks</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <strong>useTransition</strong>: mark state updates as <Highlight>non-urgent</Highlight> → UI stays responsive during heavy renders<br />
                            • <strong>useDeferredValue</strong>: defer a value → input updates immediately, results render later<br />
                            • <strong>useId</strong>: generate unique IDs stable across server + client (SSR-safe)<br />
                            • <strong>useActionState</strong> (React 19): manage form action state (pending, error, result)
                        </div>
                    </div>

                    <div className="p-3 rounded-lg bg-pink-500/10 border border-pink-500/20">
                        <div className="text-pink-400 font-bold text-sm">🛡️ React.memo — Optimize Re-renders</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • HOC wrapping component → <strong>skips re-render</strong> if props unchanged (shallow comparison)<br />
                            • Only effective with <InlineCode>useCallback</InlineCode> (for function props) + <InlineCode>useMemo</InlineCode> (for object props)<br />
                            • Custom comparator: <InlineCode>React.memo(Comp, areEqual)</InlineCode><br />
                            • ⚠️ Don&apos;t memo everything — only when render is expensive or re-renders are frequent
                        </div>
                    </div>

                    <div className="p-3 rounded-lg bg-sky-500/10 border border-sky-500/20">
                        <div className="text-sky-400 font-bold text-sm">⏳ Suspense + 🌀 Portal</div>
                        <div className="text-slate-300 text-sm mt-1">
                            <strong>Suspense:</strong> declarative loading UI for async operations<br />
                            • <InlineCode>React.lazy()</InlineCode> code splitting, data fetching, nested boundaries<br />
                            • Streaming SSR: send HTML shell first, lazy load components later<br /><br />
                            <strong>Portal:</strong> render component <strong>outside parent DOM</strong> but still in React tree<br />
                            • <InlineCode>createPortal(children, domNode)</InlineCode><br />
                            • Used for: modals, tooltips, dropdowns, toasts — events still bubble up React tree
                        </div>
                    </div>

                    <div className="p-3 rounded-lg bg-teal-500/10 border border-teal-500/20">
                        <div className="text-teal-400 font-bold text-sm">📊 Hooks vs Class Lifecycle</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <InlineCode>componentDidMount</InlineCode> → <InlineCode>useEffect(fn, [])</InlineCode><br />
                            • <InlineCode>componentDidUpdate</InlineCode> → <InlineCode>useEffect(fn, [deps])</InlineCode><br />
                            • <InlineCode>componentWillUnmount</InlineCode> → <InlineCode>useEffect(() =&gt; cleanup, [])</InlineCode><br />
                            • <InlineCode>shouldComponentUpdate</InlineCode> → <InlineCode>React.memo()</InlineCode><br />
                            • Interview: knowing lifecycle → hooks mapping = <Highlight>understands migration path</Highlight>
                        </div>
                    </div>
                </div>

                <CodeBlock title="hooks-pitfalls.tsx">{`// ⚠️ Pitfall 1: Stale closure
function Counter() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => {
      // ❌ count is always 0 (closure captured initial value)
      setCount(count + 1)
      // ✅ Fix: function updater
      setCount(prev => prev + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, []) // empty deps = closure only captures once
}

// ⚠️ Pitfall 2: Object deps → infinite loop
function UserProfile({ userId }) {
  const [user, setUser] = useState(null)
  // ❌ options is recreated every render → effect runs continuously
  const options = { includeAvatar: true }
  useEffect(() => { fetchUser(userId, options) }, [options])
  // ✅ Fix: useMemo or use primitive deps
  const options2 = useMemo(() => ({ includeAvatar: true }), [])

  // ⚠️ Pitfall 3: Missing cleanup → memory leak
  useEffect(() => {
    const ws = new WebSocket(url)
    ws.onmessage = (e) => setMessages(prev => [...prev, e.data])
    return () => ws.close() // ✅ MUST cleanup!
  }, [url])
}`}</CodeBlock>

                <Callout type="warning"><strong>Rules of Hooks:</strong> 1) Only call at top level (not inside if/for/nested functions) 2) Only call in React components or custom hooks. Violating → unpredictable behavior.</Callout>
                <a href="/blogs/react-hooks-chi-tiet" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 Read detailed article →</a>
            </TopicModal>

            <TopicModal title="Component Patterns" emoji="🧩" color="#61DAFB" summary="HOC, Render Props, Compound, Controlled/Uncontrolled — when to use which">
                <Paragraph>Knowing component patterns helps you <Highlight>design flexible APIs</Highlight> and answer frontend system design questions.</Paragraph>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">🔲 Higher-Order Component (HOC)</div>
                        <div className="text-slate-300 text-sm mt-1">
                            Function that takes a component → returns a new component with extra logic.<br />
                            • Example: <InlineCode>withAuth(Dashboard)</InlineCode>, <InlineCode>withTheme(Button)</InlineCode><br />
                            • <strong>Pros</strong>: reuse logic, cross-cutting concerns (auth, logging, analytics)<br />
                            • <strong>Cons</strong>: wrapper hell, props collision, hard to debug (anonymous components)<br />
                            • ⚠️ Currently <strong>Custom Hooks replace most HOC use cases</strong>
                        </div>
                    </div>

                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">🎯 Render Props</div>
                        <div className="text-slate-300 text-sm mt-1">
                            Component receives a function via prop → calls it to render UI.<br />
                            • Example: <InlineCode>{'{\'<Mouse render={({x, y}) => <Cursor x={x} y={y} />} />\'}'}</InlineCode><br />
                            • <strong>Pros</strong>: more flexible than HOC, caller controls rendering<br />
                            • <strong>Cons</strong>: callback hell, hard to read when deeply nested<br />
                            • Still useful for: <strong>headless UI</strong> (Downshift, React Table)
                        </div>
                    </div>

                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">🧱 Compound Components</div>
                        <div className="text-slate-300 text-sm mt-1">
                            Group of components sharing implicit state via Context.<br />
                            • Example: <InlineCode>{'{\'<Select> <Select.Option /> </Select>\'}'}</InlineCode>, <InlineCode>{'{\'<Tabs> <Tabs.Panel /> </Tabs>\'}'}</InlineCode><br />
                            • <strong>Pros</strong>: clean API, flexible layout, inversion of control<br />
                            • <strong>Cons</strong>: complex implementation, context overhead<br />
                            • Used in: <strong>Design System components</strong> (Radix UI, Headless UI)
                        </div>
                    </div>

                    <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="text-yellow-400 font-bold text-sm">🎚️ Controlled vs Uncontrolled</div>
                        <div className="text-slate-300 text-sm mt-1">
                            <strong>Controlled</strong>: React manages state (<InlineCode>value + onChange</InlineCode>). Single source of truth.<br />
                            <strong>Uncontrolled</strong>: DOM manages state (<InlineCode>useRef</InlineCode>). Use when integrating with non-React code.<br />
                            • Forms: controlled for real-time validation, uncontrolled for simple forms<br />
                            • Best practice: <strong>support both</strong> (controlled when value prop exists, uncontrolled when not)<br />
                            • 💡 <InlineCode>react-hook-form</InlineCode> internally uses <strong>uncontrolled</strong> (register via ref) → <Highlight>no re-render per keystroke</Highlight> → superior performance with 20-30 field forms
                        </div>
                    </div>

                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <div className="text-red-400 font-bold text-sm">🪝 Custom Hooks — Modern Pattern</div>
                        <div className="text-slate-300 text-sm mt-1">
                            Extract logic into reusable hooks — <strong>replaces most HOC + Render Props</strong>.<br />
                            • <InlineCode>useLocalStorage</InlineCode>, <InlineCode>useDebounce</InlineCode>, <InlineCode>useMediaQuery</InlineCode>, <InlineCode>useIntersectionObserver</InlineCode><br />
                            • <strong>Pros</strong>: composable, no wrapper hell, easy to test<br />
                            • Convention: name starts with <InlineCode>use</InlineCode>, return object or tuple
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
                    Interview trend: <Highlight>Custom Hooks</Highlight> replace most HOC and Render Props. But still need to know all patterns — legacy code + system design needs Compound Components.
                </Callout>
            </TopicModal>

            <TopicModal title="Performance Optimization" emoji="⚡" color="#61DAFB" summary="React.memo, useMemo, useCallback, code splitting, virtualization">
                <Paragraph>React re-renders the entire subtree when state changes. Here are techniques to <Highlight>prevent unnecessary re-renders</Highlight> and optimize performance:</Paragraph>

                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">🛡️ Prevent Unnecessary Re-renders</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <strong>React.memo</strong>: wrap component → skip re-render if props are shallow equal<br />
                            • <strong>useMemo</strong>: cache expensive calculations (sort, filter, map large arrays)<br />
                            • <strong>useCallback</strong>: stable function reference for React.memo children<br />
                            • <strong>State colocation</strong>: push state down to the component that needs it (avoid parent re-render)
                        </div>
                    </div>

                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">📦 Code Splitting & Lazy Loading</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <strong>React.lazy + Suspense</strong>: dynamic import components<br />
                            • <strong>Route-based splitting</strong>: each page is a separate chunk<br />
                            • <strong>Component-based splitting</strong>: heavy components (rich editor, chart library)<br />
                            • <strong>Prefetch</strong>: load chunk before user clicks (onMouseEnter)
                        </div>
                    </div>

                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">📋 Virtualization</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Only render items visible in viewport (10k+ items → ~20 DOM nodes)<br />
                            • <strong>react-window</strong>: lightweight, fixed-size items<br />
                            • <strong>react-virtuoso</strong>: variable-size, auto-measure, grouping<br />
                            • When to use: list {'>'} 100 items, or any list causing lag
                        </div>
                    </div>

                    <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="text-yellow-400 font-bold text-sm">🔍 Profiling & Debugging</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <strong>React DevTools Profiler</strong>: see which components re-render, how long<br />
                            • <strong>why-did-you-render</strong>: library that logs unnecessary re-renders<br />
                            • <strong>Chrome Performance tab</strong>: flame chart, main thread blocking<br />
                            • <strong>Lighthouse</strong>: CI/CD integration for performance budgets
                        </div>
                    </div>

                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <div className="text-red-400 font-bold text-sm">🏗️ Architecture-level Optimization</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <strong>State management</strong>: Zustand/Jotai (atomic) vs Redux (centralized)<br />
                            • <strong>Server Components</strong> (React 19): zero JS shipped for static content<br />
                            • <strong>Streaming SSR</strong>: renderToPipeableStream for faster TTFB<br />
                            • <strong>ISR</strong> (Next.js): revalidate static pages without redeploy
                        </div>
                    </div>
                </div>

                <CodeBlock title="optimization-techniques.tsx">{`// 1. React.memo — skip re-render if props haven't changed
const ExpensiveList = React.memo(({ items, onItemClick }) => {
  return items.map(item => <Item key={item.id} {...item} onClick={onItemClick} />)
})

// 2. useMemo — cache expensive calculations
const sorted = useMemo(() =>
  items
    .filter(i => i.active)
    .sort((a, b) => a.price - b.price),
  [items] // only recalculate when items change
)

// 3. useCallback — stable function reference
const handleClick = useCallback((id: string) => {
  setItems(prev => prev.filter(i => i.id !== id))
}, []) // Won't re-create every render → ExpensiveList won't re-render

// 4. Dynamic import — code splitting
const AdminPanel = lazy(() => import('./AdminPanel'))
// Usage: <Suspense fallback={<Spinner />}><AdminPanel /></Suspense>

// 5. State colocation — avoid unnecessary re-renders
// ❌ Bad: search state in App → every child re-renders on keystroke
function App() {
  const [search, setSearch] = useState('') // ← state here
  return <><Header /><SearchBar search={search} onChange={setSearch} /><Content /></>
}
// ✅ Good: search state in SearchBar → only SearchBar re-renders
function SearchBar() {
  const [search, setSearch] = useState('') // ← state here
  return <input value={search} onChange={e => setSearch(e.target.value)} />
}`}</CodeBlock>

                <Callout type="warning">Don&apos;t premature optimize! Only optimize when <Highlight>React DevTools Profiler</Highlight> shows a real bottleneck. useMemo/useCallback have overhead — using them wrong can be slower.</Callout>
                <a href="/blogs/react-performance" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 Read detailed article →</a>
            </TopicModal>

            <TopicModal title="State Management — Redux, Zustand, Context" emoji="🗃️" color="#764ABC" summary="Comparing 3 popular state management approaches — very common interview question">
                <Paragraph>Enterprise projects commonly use <Highlight>Redux</Highlight>, but you should also know alternatives.</Paragraph>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">🔴 Redux (Redux Toolkit)</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <strong>Store</strong> → <strong>Action</strong> → <strong>Reducer</strong> → <strong>New State</strong> (unidirectional flow)<br />
                            • Redux Toolkit: <InlineCode>createSlice</InlineCode>, <InlineCode>configureStore</InlineCode>, <InlineCode>createAsyncThunk</InlineCode><br />
                            • Middleware: redux-thunk (default), redux-saga (complex side effects)<br />
                            • DevTools: time-travel debugging, action log<br />
                            • Use when: complex state, many components need to share, need predictability
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                        <div className="text-orange-400 font-bold text-sm">🐻 Zustand</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Lightweight (~1KB), simple API, no boilerplate<br />
                            • No Provider needed, use hooks directly<br />
                            • Auto selector: only re-renders when slice of state changes<br />
                            • Middleware: persist, devtools, immer<br />
                            • Use when: want simplicity, don&apos;t need Redux Toolkit overhead
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">⚛️ Context API</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Built-in React, no extra dependency<br />
                            • ⚠️ <strong>ALL consumers re-render</strong> when context value changes<br />
                            • Good for: theme, locale, auth (infrequent updates)<br />
                            • Not good for: frequently changing data (input, scroll, mouse)<br />
                            • Split context by domain to reduce re-renders
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
                <Callout type="tip">Interview: 90% will ask Redux flow (action → reducer → store). Knowing <Highlight>why use Zustand over Redux</Highlight> (less boilerplate, auto-optimized re-renders) → senior answer.</Callout>
            </TopicModal>

            <TopicModal title="Next.js — SSR, SSG, ISR, App Router" emoji="▲" color="#000000" summary="Rendering strategies — Next.js is extremely popular, must know well">
                <Paragraph>Next.js is the <Highlight>most popular React framework</Highlight>. Interviews frequently ask about rendering strategies.</Paragraph>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-gray-500/10 border border-gray-500/20">
                        <div className="text-gray-300 font-bold text-sm">📊 Rendering Strategies Comparison</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <strong>CSR</strong> (Client-Side Rendering): empty HTML + JS bundle → renders in browser<br />
                            • <strong>SSR</strong> (Server-Side Rendering): renders on server each request → full HTML<br />
                            • <strong>SSG</strong> (Static Site Generation): renders at build time → static HTML, CDN cached<br />
                            • <strong>ISR</strong> (Incremental Static Regeneration): SSG + revalidate after N seconds
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">🆕 App Router (Next.js 13+)</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <strong>Server Components</strong> (default): render on server, 0 JS bundle<br />
                            • <strong>&apos;use client&apos;</strong>: opt-in to client component (hooks, events, browser API)<br />
                            • <strong>layout.tsx</strong>: shared layout (persistent across navigation)<br />
                            • <strong>loading.tsx</strong>: React Suspense boundary<br />
                            • <strong>error.tsx</strong>: Error Boundary<br />
                            • <strong>Server Actions</strong>: call server-side functions directly from client
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="text-yellow-400 font-bold text-sm">🎯 When to use what?</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <strong>SSG</strong>: blogs, landing pages, docs (content rarely changes)<br />
                            • <strong>ISR</strong>: e-commerce products, news (changes every few minutes/hours)<br />
                            • <strong>SSR</strong>: user dashboard, search results (real-time data, needs SEO)<br />
                            • <strong>CSR</strong>: admin panel, private pages (no SEO needed)
                        </div>
                    </div>
                </div>
                <CodeBlock title="nextjs-rendering.tsx">{`// SSG — build time (getStaticProps — Pages Router)
export async function getStaticProps() {
  const posts = await fetchPosts()
  return { props: { posts } }
}

// ISR — revalidate every 60 seconds
export async function getStaticProps() {
  const products = await fetchProducts()
  return { props: { products }, revalidate: 60 }
}

// SSR — every request
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
                <Callout type="tip">Interview: {'"Explain SSR vs SSG vs ISR"'} is <Highlight>almost guaranteed</Highlight> if the JD mentions Next.js. Knowing App Router + Server Components → shows you&apos;re up-to-date.</Callout>
            </TopicModal>

            <TopicModal title="Server Components & Server Actions" emoji="🖥️" color="#0ea5e9" summary="RSC = zero JS bundle, Server Actions = RPC-style mutations — the new React/Next.js architecture">
                <Paragraph><Highlight>React Server Components (RSC)</Highlight> change how we think about rendering. Instead of shipping JS for every component, RSC runs on the server and sends HTML. Only components needing interactivity ship JS.</Paragraph>

                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">🖥️ Server Components (default in App Router)</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Render on server, <strong>0 JS sent to client</strong><br />
                            • Direct access to database, file system, env variables<br />
                            • Cannot use: useState, useEffect, onClick, browser APIs<br />
                            • <InlineCode>async/await</InlineCode> directly in component<br />
                            • Can import client components but <strong>not vice versa</strong>
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">📱 Client Components ({`'use client'`})</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Add <InlineCode>{`'use client'`}</InlineCode> at top of file → opt-in<br />
                            • Can use: useState, useEffect, onClick, browser APIs<br />
                            • JS is shipped to client (hydration)<br />
                            • Should be <strong>minimized</strong>: only for interactive parts
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">⚡ Server Actions ({`'use server'`})</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Server-side functions callable directly from client<br />
                            • Replace API routes for mutations (POST, PUT, DELETE)<br />
                            • Auto serialize/deserialize params<br />
                            • Work with <InlineCode>&lt;form action&gt;</InlineCode> or direct invocation<br />
                            • Progressive Enhancement: forms submit without JS loaded
                        </div>
                    </div>
                </div>

                <CodeBlock title="rsc-pattern.tsx">{`// ===== SERVER COMPONENT (default) =====
// File: app/products/page.tsx  — no need for 'use server'
import { db } from '@/lib/database'
import AddToCartButton from './AddToCartButton'

async function ProductPage() {
    const products = await db.product.findMany()  // Direct DB access!
    return (
        <div>
            <h1>Products ({products.length})</h1>
            {products.map(p => (
                <div key={p.id}>
                    <h2>{p.name} - \${p.price}</h2>
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
            {isPending ? '⏳' : '🛒 Add to Cart'}
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
    if (!name) return { error: 'Name is required' }

    await db.product.create({ data: { name, price } })
    revalidatePath('/products')
    return { success: true }
}

// Use in form — Progressive Enhancement!
function CreateForm() {
    return (
        <form action={createProduct}>
            <input name="name" required />
            <input name="price" type="number" required />
            <button type="submit">Create</button>
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
            <button disabled={isPending}>{isPending ? '...' : 'Create'}</button>
            {state?.error && <span className="text-red-500">{state.error}</span>}
        </form>
    )
}`}</CodeBlock>

                <div className="my-3">
                    <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="text-yellow-400 font-bold text-sm">🧠 Rule: Server vs Client</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <strong>Fetch data</strong> → Server Component (async/await directly)<br />
                            • <strong>Click, hover, type</strong> → Client Component (useState, events)<br />
                            • <strong>Form submit / mutation</strong> → Server Action ({`'use server'`})<br />
                            • Goal: keep Client Components <Highlight>as small as possible</Highlight>
                        </div>
                    </div>
                </div>

                <Callout type="tip">Interview: {`"RSC vs SSR?"`} → RSC renders on server but <Highlight>doesn&apos;t hydrate</Highlight> (0 JS). SSR renders HTML on server then <Highlight>hydrates the entire app</Highlight>. RSC is more efficient because it only ships JS for interactive parts.</Callout>
            </TopicModal>
        </div>

        <Heading3>3.2 HTML/CSS (click for details)</Heading3>
        <div className="my-4 space-y-2">
            <TopicModal title="Semantic HTML & Accessibility" emoji="♿" color="#38bdf8" summary="Screen readers, ARIA, landmark roles — why accessibility matters in interviews">
                <Paragraph><Highlight>Semantic HTML</Highlight> = using the right tag for the right purpose. Google and Apple especially value accessibility.</Paragraph>

                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">🏷️ Semantic vs Non-semantic Elements</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <strong>Landmark roles</strong>: {'<header>'}, {'<nav>'}, {'<main>'}, {'<aside>'}, {'<footer>'}, {'<article>'}, {'<section>'}<br />
                            • Screen readers use landmarks to <strong>navigate quickly</strong> (skip to main content)<br />
                            • {'<div>'} and {'<span>'} are <strong>generic containers</strong> — no semantic meaning<br />
                            • {'<button>'} vs {'<div onClick>'}: button has keyboard support + focus + role built-in
                        </div>
                    </div>

                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">🔊 ARIA (Accessible Rich Internet Applications)</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <strong>aria-label</strong>: label for elements without visible text (icon buttons)<br />
                            • <strong>aria-expanded</strong>: dropdown/accordion open or closed state<br />
                            • <strong>aria-live</strong>: announce dynamic content changes (toasts, counters)<br />
                            • <strong>role</strong>: override semantic role (role={'"dialog"'}, role={'"alert"'}, role={'"tab"'})<br />
                            • ⚠️ Rule #1: <strong>No ARIA needed if using correct HTML tag</strong> (native semantics)
                        </div>
                    </div>

                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">⌨️ Keyboard Navigation</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <strong>Tab order</strong>: focusable elements follow DOM order (tabIndex={'"0"'} to add)<br />
                            • <strong>Focus trap</strong>: Modal/Dialog must keep focus inside (Tab wraps around)<br />
                            • <strong>Skip links</strong>: {'"Skip to main content"'} hidden link, visible on focus<br />
                            • <strong>Keyboard shortcuts</strong>: Escape close, Enter submit, Arrow keys navigate
                        </div>
                    </div>

                    <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="text-yellow-400 font-bold text-sm">🎨 Color & Visual Accessibility</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <strong>Color contrast</strong>: WCAG AA ≥ 4.5:1 (text), ≥ 3:1 (large text, UI components)<br />
                            • Don&apos;t use color alone to convey meaning (add icon, text, pattern)<br />
                            • <strong>prefers-reduced-motion</strong>: disable animations for sensitive users<br />
                            • <strong>prefers-color-scheme</strong>: dark/light mode support
                        </div>
                    </div>

                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <div className="text-red-400 font-bold text-sm">🧪 Testing Accessibility</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <strong>axe DevTools</strong>: Chrome extension to scan a11y violations<br />
                            • <strong>Lighthouse</strong>: accessibility audit score<br />
                            • <strong>Screen reader</strong>: test with VoiceOver (Mac) or NVDA (Windows)<br />
                            • <strong>jest-axe</strong>: automated a11y testing in unit tests
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
  <h1>Page Title</h1> <!-- Only 1 h1 per page! -->
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
                    Big tech loves asking: {'"Build component X that\'s accessible"'} — must support keyboard navigation, screen reader, focus management.
                    Mention <Highlight>WCAG 2.1 Level AA</Highlight> + testing with screen reader → big bonus points.
                </Callout>
            </TopicModal>

            <TopicModal title="CSS Layout — Flexbox & Grid" emoji="📐" color="#38bdf8" summary="Layout from scratch without frameworks — an important interview skill">
                <Paragraph>Frontend coding interviews often require building layouts <Highlight>from scratch without TailwindCSS</Highlight>. Must master both Flexbox and Grid.</Paragraph>

                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">📏 Flexbox — 1 Dimension</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <strong>Main axis</strong>: justify-content (start, center, space-between, space-around, space-evenly)<br />
                            • <strong>Cross axis</strong>: align-items (flex-start, center, stretch, baseline)<br />
                            • <strong>flex</strong>: shorthand for grow shrink basis → <InlineCode>flex: 1 0 auto</InlineCode><br />
                            • <strong>flex-wrap</strong>: allow items to wrap to next line (responsive)
                        </div>
                    </div>

                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">📊 Grid — 2 Dimensions</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <strong>grid-template-columns/rows</strong>: define tracks (px, fr, auto, minmax)<br />
                            • <strong>grid-area</strong>: named areas for complex layouts<br />
                            • <strong>auto-fill vs auto-fit</strong>: auto-fill keeps empty tracks, auto-fit collapses<br />
                            • <strong>minmax()</strong>: responsive columns without media queries
                        </div>
                    </div>

                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">🆚 When to Use Which</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <strong>Flexbox</strong>: navbar, card row, centering, sidebar + content<br />
                            • <strong>Grid</strong>: page layout, dashboard, image gallery, form layout<br />
                            • <strong>Combine</strong>: Grid for page layout, Flexbox for inner components<br />
                            • Interview tip: always ask {'"Does it need to be responsive?"'} → determines approach
                        </div>
                    </div>

                    <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="text-yellow-400 font-bold text-sm">📱 Responsive Design</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <strong>Mobile-first</strong>: default CSS for mobile, media queries for larger screens<br />
                            • <strong>Container queries</strong> (new!): responsive based on parent size instead of viewport<br />
                            • <strong>clamp()</strong>: fluid typography: <InlineCode>font-size: clamp(1rem, 2vw, 1.5rem)</InlineCode><br />
                            • <strong>Logical properties</strong>: margin-inline, padding-block (RTL support)
                        </div>
                    </div>

                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <div className="text-red-400 font-bold text-sm">🎯 Box Model & Positioning</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <strong>box-sizing: border-box</strong>: width includes padding + border (ALWAYS set!)<br />
                            • <strong>Position</strong>: static (default), relative, absolute, fixed, sticky<br />
                            • <strong>Stacking context</strong>: z-index only works within same stacking context<br />
                            • <strong>BFC</strong> (Block Formatting Context): overflow: hidden creates new BFC → clears floats
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

/* Centering — multiple ways */
.center-flex { display: flex; justify-content: center; align-items: center; }
.center-grid { display: grid; place-items: center; }
.center-abs  { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); }`}</CodeBlock>

                <Callout type="tip">
                    Interview: often requires building a <Highlight>responsive layout from scratch</Highlight>. Practice: Holy Grail Layout, Dashboard Grid, Responsive Card Grid, Modal centering.
                </Callout>
            </TopicModal>

            <TopicModal title="Web Security — XSS, CSRF, CSP" emoji="🛡️" color="#38bdf8" summary="Common web security vulnerabilities — must know how to prevent them">
                <Paragraph>Frontend developers <Highlight>must understand security</Highlight> — especially at big tech, security questions are very common.</Paragraph>

                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <div className="text-red-400 font-bold text-sm">💉 XSS (Cross-Site Scripting)</div>
                        <div className="text-slate-300 text-sm mt-1">
                            Attacker injects malicious JS into the page → steal cookies, redirect, keylog.<br />
                            <strong>3 types:</strong><br />
                            • <strong>Stored XSS</strong>: script stored in DB → every user sees it (most dangerous)<br />
                            • <strong>Reflected XSS</strong>: script in URL → server returns HTML containing the script<br />
                            • <strong>DOM-based XSS</strong>: script modifies DOM client-side (innerHTML, eval)<br />
                            <strong>Prevention:</strong> React auto-escapes JSX. NEVER use <InlineCode>dangerouslySetInnerHTML</InlineCode>. Sanitize input (DOMPurify).
                        </div>
                    </div>

                    <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="text-yellow-400 font-bold text-sm">🔗 CSRF (Cross-Site Request Forgery)</div>
                        <div className="text-slate-300 text-sm mt-1">
                            Attacker tricks user into sending requests from another site (e.g., transfer money).<br />
                            • User is logged into site A → visits site B → site B sends request to A<br />
                            • Browser auto-attaches cookies → server thinks it&apos;s a legitimate request<br />
                            <strong>Prevention:</strong><br />
                            • <strong>CSRF token</strong>: random token per session, verify each request<br />
                            • <strong>SameSite cookie</strong>: SameSite=Strict or Lax<br />
                            • <strong>Double submit</strong>: token in cookie + header, server compares
                        </div>
                    </div>

                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">🔒 CSP (Content Security Policy)</div>
                        <div className="text-slate-300 text-sm mt-1">
                            HTTP header specifying allowed sources for loading resources.<br />
                            • <strong>script-src</strong>: only allow JS from specific sources<br />
                            • <strong>style-src</strong>: only allow CSS from specific sources<br />
                            • <strong>img-src</strong>: only allow images from specific sources<br />
                            • <InlineCode>{'{`Content-Security-Policy: script-src \'self\' https://cdn.example.com`}'}</InlineCode>
                        </div>
                    </div>

                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">🍪 Cookie Security</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <strong>HttpOnly</strong>: JS cannot read cookie → prevents XSS session theft<br />
                            • <strong>Secure</strong>: only sent over HTTPS<br />
                            • <strong>SameSite</strong>: Strict (same-site only), Lax (safe methods OK), None (all)<br />
                            • <strong>Domain + Path</strong>: scope cookie to specific subdomain/path
                        </div>
                    </div>

                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">🛡️ Other Security Headers</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <strong>CORS</strong>: Access-Control-Allow-Origin — control cross-origin requests<br />
                            • <strong>X-Frame-Options</strong>: DENY — prevent clickjacking (iframe embed)<br />
                            • <strong>HSTS</strong>: force HTTPS, prevent SSL stripping<br />
                            • <strong>Subresource Integrity</strong>: verify CDN resources haven&apos;t been tampered
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
                    Interview: Always mention <Highlight>defense in depth</Highlight> — don&apos;t rely on a single layer.
                    XSS: escape + CSP + HttpOnly. CSRF: SameSite + token. Know how to explain <strong>why</strong> each measure is needed.
                </Callout>
            </TopicModal>

            <TopicModal title="Core Web Vitals" emoji="📊" color="#38bdf8" summary="LCP, INP, CLS — how Google measures performance, how to optimize">
                <Paragraph>Core Web Vitals are metrics <Highlight>Google uses for SEO ranking</Highlight>. Frontend engineers must know how to optimize them.</Paragraph>

                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">🖼️ LCP (Largest Contentful Paint) — {'< 2.5s'}</div>
                        <div className="text-slate-300 text-sm mt-1">
                            Time to render the largest visible element in the viewport.<br />
                            <strong>Optimize:</strong><br />
                            • <strong>Optimize images</strong>: WebP/AVIF, responsive srcset, lazy loading<br />
                            • <strong>Preload</strong>: critical assets (hero image, fonts)<br />
                            • <strong>SSR/SSG</strong>: HTML has content immediately (no waiting for JS)<br />
                            • <strong>CDN</strong>: serve static assets close to users
                        </div>
                    </div>

                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">👆 INP (Interaction to Next Paint) — {'< 200ms'}</div>
                        <div className="text-slate-300 text-sm mt-1">
                            Time from user interaction → visual response (replaces FID).<br />
                            <strong>Optimize:</strong><br />
                            • <strong>Reduce JS execution</strong>: code splitting, tree shaking<br />
                            • <strong>Web Workers</strong>: heavy computation off main thread<br />
                            • <strong>Debounce/throttle</strong>: limit event handler frequency<br />
                            • <strong>requestIdleCallback</strong>: defer non-critical work
                        </div>
                    </div>

                    <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="text-yellow-400 font-bold text-sm">📐 CLS (Cumulative Layout Shift) — {'< 0.1'}</div>
                        <div className="text-slate-300 text-sm mt-1">
                            Measures unexpected layout shifts (content jumping around).<br />
                            <strong>Optimize:</strong><br />
                            • <strong>Set dimensions</strong>: width + height for images/videos/ads<br />
                            • <strong>font-display: optional</strong>: avoid FOUT (flash of unstyled text)<br />
                            • <strong>Skeleton loading</strong>: placeholder to keep layout stable<br />
                            • <strong>transform</strong> animations: don&apos;t trigger layout (composite only)
                        </div>
                    </div>

                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">🔧 Rendering Pipeline</div>
                        <div className="text-slate-300 text-sm mt-1">
                            <strong>JS → Style → Layout → Paint → Composite</strong><br />
                            • <strong>Layout thrashing</strong>: read layout → write → read → write → forced reflow!<br />
                            • <strong>Composite-only</strong>: transform + opacity — cheapest animations (GPU)<br />
                            • <strong>will-change</strong>: hint browser to prepare a new composite layer<br />
                            • <strong>contain</strong>: CSS containment — isolate rendering subtree
                        </div>
                    </div>

                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <div className="text-red-400 font-bold text-sm">📏 Measurement & Tools</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <strong>Lighthouse</strong> (Chrome DevTools): comprehensive audit<br />
                            • <strong>web.dev/measure</strong>: online tool by Google<br />
                            • <strong>PageSpeed Insights</strong>: real user data (CrUX) + lab data<br />
                            • <strong>web-vitals</strong> library: measure CWV in production<br />
                            • <strong>Performance API</strong>: PerformanceObserver for custom metrics
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
                    Interview: When asked {'"The site is slow, what would you do?"'} → <Highlight>measure first (Lighthouse)</Highlight> → identify bottleneck (LCP? INP? CLS?) → apply specific solutions. Don&apos;t optimize blindly!
                </Callout>
                <a href="/blogs/core-web-vitals" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 Read detailed article →</a>
            </TopicModal>

            <TopicModal title="CSS Specificity & Cascade" emoji="⚖️" color="#38bdf8" summary="Specificity calculation, cascade order, inheritance — why doesn't my CSS apply?">
                <Paragraph><Highlight>Specificity</Highlight> determines which CSS rule {'"wins"'} when there&apos;s a conflict — very common interview question.</Paragraph>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">📊 Specificity Hierarchy (low → high)</div>
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
                            When specificity is equal, cascade order decides:<br />
                            1. <strong>Origin</strong>: User Agent → User → Author<br />
                            2. <strong>Specificity</strong>: calculated above<br />
                            3. <strong>Source order</strong>: later rule overrides earlier<br />
                            4. <strong>@layer</strong> (new!): cascade layers — control ordering
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="text-yellow-400 font-bold text-sm">🧬 Inheritance</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <strong>Inherited</strong>: color, font-*, text-*, line-height, visibility<br />
                            • <strong>Not inherited</strong>: margin, padding, border, display, position<br />
                            • <InlineCode>inherit</InlineCode>: force inheritance | <InlineCode>initial</InlineCode>: reset to default<br />
                            • <InlineCode>unset</InlineCode>: inherit if normally inherited, initial otherwise
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
                <Callout type="tip">Interview quiz: <InlineCode>{'.a.b'}</InlineCode> vs <InlineCode>{'.a .b'}</InlineCode> — first is <Highlight>AND</Highlight> (same element), second is <Highlight>descendant</Highlight>. Being able to calculate specificity = senior CSS skill.</Callout>
            </TopicModal>

            <TopicModal title="CSS Animations & Transitions" emoji="✨" color="#38bdf8" summary="transition, keyframes, transform, will-change — micro-interactions for premium UI">
                <Paragraph><Highlight>Animations</Highlight> make UI feel alive and professional — but you must understand performance implications.</Paragraph>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">🔄 Transition vs Animation</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <strong>Transition</strong>: A → B (2 states, triggered by state change)<br />
                            • <strong>Animation</strong>: A → B → C → ... (@keyframes, auto-play, loop)<br />
                            • Transition for <strong>hover effects, state changes</strong><br />
                            • Animation for <strong>loading spinners, attention getters</strong>
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
                            • Use <InlineCode>transform: translateX()</InlineCode> instead of <InlineCode>left: Xpx</InlineCode>
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">🎭 Easing Functions</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <InlineCode>ease</InlineCode>: default, most common<br />
                            • <InlineCode>ease-in-out</InlineCode>: smooth for modal, page transitions<br />
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
.spinner { animation: spin 1s linear infinite; }

/* prefers-reduced-motion — accessibility! */
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}`}</CodeBlock>
                <Callout type="tip">Interview: always mention <Highlight>prefers-reduced-motion</Highlight> when discussing animations — shows accessibility awareness. Only animate <strong>transform + opacity</strong> for 60fps.</Callout>
            </TopicModal>

            <TopicModal title="CSS Variables & Modern CSS" emoji="🎨" color="#38bdf8" summary="Custom properties, container queries, :has(), nesting — CSS is getting more powerful">
                <Paragraph><Highlight>Modern CSS</Highlight> has many powerful features — reducing dependency on JS and preprocessors.</Paragraph>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">🎨 CSS Custom Properties (Variables)</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Declare: <InlineCode>--color-primary: #3b82f6</InlineCode><br />
                            • Use: <InlineCode>color: var(--color-primary)</InlineCode><br />
                            • <strong>Cascade</strong>: follows CSS cascade (override per element/media query)<br />
                            • <strong>Runtime dynamic</strong>: changeable via JS, SASS variables cannot<br />
                            • Use for: theming (dark/light), design tokens, responsive values
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">📦 Container Queries</div>
                        <div className="text-slate-300 text-sm mt-1">
                            Responsive based on <strong>parent container size</strong> instead of viewport.<br />
                            • <InlineCode>container-type: inline-size</InlineCode> on parent<br />
                            • <InlineCode>@container (min-width: 400px)</InlineCode> instead of @media<br />
                            • Component-level responsive — reusable everywhere!
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">🆕 Modern CSS Selectors</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <InlineCode>:has()</InlineCode>: parent selector! <InlineCode>.card:has(img)</InlineCode> — card containing img<br />
                            • <InlineCode>:is() / :where()</InlineCode>: group selectors, reduce repetition<br />
                            • <strong>CSS Nesting</strong> (native!): write nested rules like SASS<br />
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

/* :has() — parent selector */
.form-group:has(input:invalid) { border-color: red; }

/* CSS Nesting (native!) */
.card {
  padding: 16px;
  & .title { font-size: 1.25rem; }
  &:hover { box-shadow: 0 4px 12px rgba(0,0,0,.1); }
}

/* Modern utilities */
.video { aspect-ratio: 16 / 9; }
input[type="checkbox"] { accent-color: var(--color-primary); }`}</CodeBlock>
                <Callout type="tip">Interview: mentioning <Highlight>container queries</Highlight> and <Highlight>:has()</Highlight> → shows you follow CSS evolution. CSS Variables vs SASS variables: CSS vars are <strong>runtime dynamic</strong>, SASS is compile-time.</Callout>
            </TopicModal>

            <TopicModal title="CSS Architecture — BEM, Modules, CSS-in-JS" emoji="🏗️" color="#38bdf8" summary="Naming conventions, scoping strategies, when to use each approach">
                <Paragraph>Large projects need <Highlight>CSS architecture</Highlight> to avoid naming conflicts and maintain code easily.</Paragraph>
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
                            • <strong>Utility-first</strong> (Tailwind): fast, but verbose HTML<br />
                            • <strong>CSS Modules</strong>: scoped, no runtime, simple. Best for most projects<br />
                            • <strong>Zero-runtime CSS-in-JS</strong>: type-safe, co-located, enterprise<br />
                            • <strong>BEM</strong>: legacy but still widely used, no build tool needed
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
                        <div className="text-emerald-400 font-bold text-sm">🏆 Why Vanilla Extract wins for enterprise?</div>
                        <div className="text-slate-300 text-sm mt-1">
                            <strong>1. Zero Runtime</strong> — CSS generated at build time, no JS injected at runtime<br />
                            → styled-components/Emotion inject {'<style>'} via JS → slower, affects LCP/INP<br /><br />
                            <strong>2. Full TypeScript</strong> — write styles in TypeScript<br />
                            → Typo <InlineCode>backgroundCollor</InlineCode> → TS catches it immediately. CSS Modules typos only show in UI<br /><br />
                            <strong>3. Theme Contract</strong> — <InlineCode>createThemeContract</InlineCode> enforces all themes must have all tokens<br />
                            → Compile error if theme is missing a variable → impossible to ship broken theme<br /><br />
                            <strong>4. Sprinkles</strong> — <InlineCode>createSprinkles</InlineCode> = type-safe utility classes (like Tailwind but with TS checks)<br /><br />
                            <strong>5. SSR-friendly</strong> — no CSS hydration needed (styled-components must hydrate)
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-500/10 border border-slate-500/20">
                        <div className="text-slate-300 font-bold text-sm">📊 Detailed Comparison</div>
                        <div className="text-slate-300 text-sm mt-1">
                            <div className="overflow-x-auto">
                                <table className="w-full text-xs border-collapse mt-1">
                                    <thead><tr className="border-b border-slate-600">
                                        <th className="text-left p-1.5 text-slate-400">Approach</th>
                                        <th className="text-left p-1.5 text-slate-400">Type Safe</th>
                                        <th className="text-left p-1.5 text-slate-400">Runtime</th>
                                        <th className="text-left p-1.5 text-slate-400">Scoped</th>
                                        <th className="text-left p-1.5 text-slate-400">Best for</th>
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

// ❌ Compile error: missing 'bg' in color!
// const brokenTheme = createTheme(vars, {
//   color: { primary: '#fff', secondary: '#ccc', text: '#000' }, // ← Error: missing 'bg'
//   ...
// })

// === Type-safe styles with autocomplete ===
const card = style({
  backgroundColor: vars.color.bg,    // ← autocomplete all tokens!
  padding: vars.space.md,
  fontFamily: vars.font.body,
  borderRadius: 8,
  // backgroundCollor: '...',  ← ❌ TypeScript error immediately!
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
    padding: vars.space,  // ← only allows design tokens!
    gap: vars.space,
  },
})

const sprinkles = createSprinkles(responsiveProps)

// Usage — like Tailwind but type-safe!
<div className={sprinkles({
  display: { mobile: 'block', desktop: 'grid' },
  padding: 'md',     // ← autocomplete: 'sm' | 'md' | 'lg'
  // padding: 'xxx', // ← ❌ TypeScript error!
})} />`}</CodeBlock>

                <Callout type="tip">Interview: asked {'"How do you organize CSS in a large project?"'} → answer CSS Modules (simple) or Vanilla Extract (enterprise). Explain: VE = <Highlight>TypeScript for CSS</Highlight> — zero runtime, theme contract enforces consistency, sprinkles = type-safe Tailwind. Senior answer = knowing trade-offs.</Callout>
            </TopicModal>
        </div>

        <Callout type="tip">
            Google and Meta love asking: &quot;Build component X from scratch without a library&quot; —
            e.g., autocomplete, infinite scroll, modal, drag &amp; drop, virtual list.
            Practicing building pure UI components is hugely beneficial.
        </Callout>

        <Heading3>3.3 Build Component from Scratch</Heading3>
        <Paragraph>
            Companies often give <Highlight>practical coding tests</Highlight>: build a component in 30-60 minutes.
            Doesn&apos;t need to be perfect — but must work, have clean code, and you should be able to explain your decisions.
        </Paragraph>
        <div className="my-4 space-y-2">
            <TopicModal title="Searchable Dropdown / Autocomplete" emoji="🔍" color="#f59e0b" summary="Classic test — input + dropdown + filter + keyboard navigation">
                <Paragraph>This is the <Highlight>most common</Highlight> interview coding test. Must know how to build from scratch.</Paragraph>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="text-yellow-400 font-bold text-sm">📋 Basic Requirements</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Input text → filter options list<br />
                            • Click option → select + close dropdown<br />
                            • Click outside → close dropdown<br />
                            • Keyboard: Arrow Up/Down navigate, Enter select, Escape close
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">⭐ Bonus points (senior level)</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Debounce input (API call)<br />
                            • Loading state<br />
                            • Highlight match text<br />
                            • Virtualized list (for 1000+ options)<br />
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
                <Callout type="tip">Tip: Always remember <Highlight>click outside to close</Highlight> and <Highlight>keyboard navigation</Highlight> — 2 things many candidates forget.</Callout>
            </TopicModal>

            <TopicModal title="Modal / Dialog" emoji="📦" color="#8b5cf6" summary="Overlay, focus trap, escape close, portal — simple component but many edge cases">
                <Paragraph>Modal seems simple but has <Highlight>many edge cases</Highlight> that interviewers love to test.</Paragraph>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">📋 Important Requirements</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Overlay (backdrop) click → close<br />
                            • Escape key → close<br />
                            • <strong>Focus trap</strong>: Tab only cycles within modal (a11y!)<br />
                            • <strong>Body scroll lock</strong>: prevent page scroll when modal is open<br />
                            • <strong>Portal</strong>: render at root DOM (avoid z-index issues)<br />
                            • Return focus on close (focus back to the button that opened modal)
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
                <Callout type="tip">Edge cases: <Highlight>multiple modals stacked</Highlight> (z-index), <Highlight>animation on enter/exit</Highlight>, <Highlight>responsive sizing</Highlight>. Mentioning these → bonus points.</Callout>
            </TopicModal>

            <TopicModal title="Pagination Component" emoji="📄" color="#06b6d4" summary="Client-side vs server-side, page numbers, ellipsis — common test for junior/mid">
                <Paragraph>Pagination seems simple but you need to handle <Highlight>ellipsis logic</Highlight> + edge cases.</Paragraph>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                        <div className="text-cyan-400 font-bold text-sm">📋 Key features</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Previous / Next buttons (disabled on first/last page)<br />
                            • Page numbers with ellipsis (1 ... 4 5 6 ... 20)<br />
                            • Current page highlight<br />
                            • Controlled: page + onChange from parent<br />
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
                <Callout type="tip">Server-side pagination: <Highlight>API returns total + page + limit</Highlight>. Client-side: slice array. Interviews usually ask you to build client-side pagination.</Callout>
            </TopicModal>

            <TopicModal title="Form Validation" emoji="📝" color="#10b981" summary="Real-time validation, error messages, submit handling — the most practical test">
                <Paragraph>Form validation is the <Highlight>most practical</Highlight> coding test — every project needs it.</Paragraph>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">📋 Common Requirements</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Required fields (show error on blur or submit)<br />
                            • Email format validation (regex)<br />
                            • Password strength (min length, uppercase, number, special char)<br />
                            • Confirm password match<br />
                            • Real-time validation (on change) vs on submit<br />
                            • Disable submit button when form is invalid
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">⭐ Best Approaches</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <strong>Production</strong>: React Hook Form + Zod<br />
                            • <strong>Interview</strong>: custom useForm hook (shows understanding)<br />
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
    if (!v.email) e.email = 'Email is required'
    else if (!/\\S+@\\S+\\.\\S+/.test(v.email)) e.email = 'Invalid email'
    if (!v.password) e.password = 'Password is required'
    else if (v.password.length < 8) e.password = 'Minimum 8 characters'
    return e
  }
)`}</CodeBlock>
                <Callout type="tip">Interview: build a custom <Highlight>useForm</Highlight> hook → shows you understand form state management. Mention that production uses React Hook Form + Zod → shows practical awareness.</Callout>
            </TopicModal>

            <TopicModal title="Infinite Scroll / Lazy Load" emoji="♾️" color="#f43f5e" summary="IntersectionObserver + pagination API — mid/senior level test">
                <Paragraph>Infinite scroll = <Highlight>IntersectionObserver + API pagination</Highlight>. Must handle loading, error, no more data.</Paragraph>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20">
                        <div className="text-rose-400 font-bold text-sm">📋 Implementation steps</div>
                        <div className="text-slate-300 text-sm mt-1">
                            1. Fetch initial data (page 1)<br />
                            2. Render sentinel element at end of list<br />
                            3. IntersectionObserver observes sentinel<br />
                            4. When sentinel is visible → fetch page N+1<br />
                            5. Append data (don&apos;t replace!)<br />
                            6. Stop when: API returns empty array or hasMore = false
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
                <Callout type="tip">Edge cases: <Highlight>race conditions</Highlight> (abort previous request), <Highlight>duplicate items</Highlight> (dedupe by id), <Highlight>scroll restoration</Highlight> when navigating back.</Callout>
            </TopicModal>
        </div>

        <Heading3>3.4 Popular Libraries</Heading3>
        <Paragraph>
            The job market uses many <Highlight>component libraries</Highlight> and UI frameworks.
            Knowing how to use them + explaining why you chose a library → big bonus points.
        </Paragraph>
        <div className="my-4 space-y-2">
            <TopicModal title="Ant Design (antd)" emoji="🐜" color="#1890ff" summary="Most popular component library for enterprise — tables, forms, layouts">
                <Paragraph><Highlight>Ant Design</Highlight> = #1 choice for admin dashboards and enterprise apps.</Paragraph>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">📋 When to use Ant Design?</div>
                        <div className="text-slate-300 text-sm mt-1">
                            ✅ Admin panel, CRM, ERP, back-office systems<br />
                            ✅ Need rich components: Table (sort/filter/pagination), Form, DatePicker, Tree<br />
                            ✅ Team wants a consistent ready-made design system<br />
                            ❌ Consumer-facing products (lacks personality, heavy bundle)
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="text-yellow-400 font-bold text-sm">⚠️ Common Interview Questions</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • How to customize antd theme? → ConfigProvider + token<br />
                            • antd Table performance with large data? → virtual scroll, columnWidth<br />
                            • Tree-shaking antd? → import from antd/es (v5 auto tree-shakes)<br />
                            • Form validation with antd? → Form.Item rules + async validator
                        </div>
                    </div>
                </div>
                <Callout type="tip">Interview: if JD mentions antd → <Highlight>must know the Table component</Highlight> (custom render, sorter, filter, editable cells) since 90% of antd projects are data-heavy admin panels.</Callout>
            </TopicModal>

            <TopicModal title="Tailwind CSS" emoji="🌊" color="#38bdf8" summary="Utility-first CSS framework — popular at startups and product companies">
                <Paragraph><Highlight>Tailwind</Highlight> = #1 choice for startups and consumer products.</Paragraph>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                        <div className="text-cyan-400 font-bold text-sm">📋 Why is Tailwind popular?</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <strong>Utility-first</strong>: write CSS in HTML, no need to name classes<br />
                            • <strong>Design system</strong>: spacing, colors, breakpoints consistency<br />
                            • <strong>Purge CSS</strong>: only ships used CSS → tiny bundle<br />
                            • <strong>DX</strong>: IntelliSense plugin, instant prototyping<br />
                            • <strong>Responsive</strong>: <InlineCode>md:flex lg:grid</InlineCode> — prefix-based
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="text-yellow-400 font-bold text-sm">⚠️ Interview Questions</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Tailwind vs CSS Modules? → Trade-off: speed vs separation<br />
                            • Customize theme? → tailwind.config.js extend<br />
                            • Dynamic classes? → clsx/cn, don&apos;t use string interpolation<br />
                            • Tailwind v4 — what&apos;s new? → CSS-first config, no JS config file
                        </div>
                    </div>
                </div>
                <Callout type="tip">If using Tailwind + React → must know <Highlight>clsx or cn (class-variance-authority)</Highlight> for conditional classes. This is an essential pattern.</Callout>
            </TopicModal>

            <TopicModal title="React Hook Form + Zod" emoji="📋" color="#ec4899" summary="Form management + schema validation — most popular combo today">
                <Paragraph><Highlight>React Hook Form + Zod</Highlight> = best form combo today — performance + type-safety.</Paragraph>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-pink-500/10 border border-pink-500/20">
                        <div className="text-pink-400 font-bold text-sm">🔥 Why better than Formik?</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <strong>Performance</strong>: uncontrolled components → fewer re-renders<br />
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
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Minimum 8 characters'),
  confirmPassword: z.string(),
}).refine(d => d.password === d.confirmPassword, {
  message: 'Passwords do not match',
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

      <button type="submit">Register</button>
    </form>
  )
}`}</CodeBlock>
                <Callout type="tip">Interview: if asked about forms → mention <Highlight>React Hook Form + Zod</Highlight> (modern) instead of Formik (legacy). Explaining why RHF is faster (uncontrolled) → bonus.</Callout>
            </TopicModal>

            <TopicModal title="TanStack Query (React Query)" emoji="🔄" color="#ef4444" summary="Server state management — fetching, caching, sync — replaces useEffect fetch">
                <Paragraph><Highlight>TanStack Query</Highlight> solves the data fetching problem that useEffect + useState handles very poorly.</Paragraph>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <div className="text-red-400 font-bold text-sm">❌ Problems with useEffect fetch</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • No cache → refetches every mount<br />
                            • Race conditions (user navigates quickly)<br />
                            • No loading/error states built-in<br />
                            • No retry, no pagination, no optimistic updates<br />
                            • No background refetch (stale data)<br />
                            • No type-safety (unless using libraries like Zod)
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">✅ TanStack Query solves all of this</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <strong>Auto caching</strong>: staleTime, gcTime<br />
                            • <strong>Auto refetch</strong>: on window focus, on reconnect<br />
                            • <strong>Loading/error/success</strong> states built-in<br />
                            • <strong>Mutations</strong>: optimistic updates, invalidation<br />
                            • <strong>Infinite queries</strong>: useInfiniteQuery for pagination
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
                <Callout type="tip">Interview: if asked {'"How to fetch data in React?"'} → don&apos;t just say useEffect. Say <Highlight>TanStack Query</Highlight> + explain why (caching, race conditions, stale data) → senior answer.</Callout>
            </TopicModal>
        </div>

        {/* ===== PHASE 4 ===== */}
        <Heading2>Phase 4 — Data Structures & Algorithms (6-8 weeks)</Heading2>

        <Paragraph>
            The part <Highlight>most people fear</Highlight> but also <Highlight>mandatory</Highlight> at big tech.
            Frontend engineers also do DSA — but difficulty is usually one level easier than backend.
        </Paragraph>

        <Heading3>4.1 Data Structures (click for details)</Heading3>
        <a href="/blogs/data-types-structures" target="_blank" rel="noopener noreferrer" className="mb-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 Read Data Types &amp; Structures article →</a>
        <div className="my-4 space-y-2">
            <TopicModal title="Array / String" emoji="📦" color="#4ade80" summary="⭐ Must know — foundation of all DSA problems, two pointers, sliding window">
                <Paragraph><Highlight>Array</Highlight> stores elements contiguously in memory → O(1) access by index. <Highlight>String</Highlight> in JS is immutable — each change creates a new string.</Paragraph>
                <div className="my-3 overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead><tr className="border-b border-[var(--border-primary)]"><th className="text-left p-2 text-slate-400">Operation</th><th className="text-left p-2 text-slate-400">Time</th><th className="text-left p-2 text-slate-400">Note</th></tr></thead>
                        <tbody className="text-[var(--text-secondary)]">
                            <tr className="border-b border-gray-100"><td className="p-2">Access [i]</td><td className="p-2 text-green-400">O(1)</td><td className="p-2">Random access</td></tr>
                            <tr className="border-b border-gray-100"><td className="p-2">Push / Pop (end)</td><td className="p-2 text-green-400">O(1)</td><td className="p-2">Add/remove from end</td></tr>
                            <tr className="border-b border-gray-100"><td className="p-2">Shift / Unshift (start)</td><td className="p-2 text-red-400">O(n)</td><td className="p-2">Must shift all elements</td></tr>
                            <tr><td className="p-2">Search / includes</td><td className="p-2 text-yellow-400">O(n)</td><td className="p-2">Linear scan</td></tr>
                        </tbody>
                    </table>
                </div>
                <CodeBlock title="common-array-patterns.js">{`// Swap elements
[arr[i], arr[j]] = [arr[j], arr[i]]

// Remove duplicates (preserve order)
const unique = [...new Set(arr)]

// Flatten nested arrays
arr.flat(Infinity)

// Check palindrome
const isPalin = s => s === s.split('').reverse().join('')`}</CodeBlock>
                <Callout type="tip">Interview: 80% of LeetCode problems involve Arrays/Strings. Master <Highlight>Two Pointers</Highlight> and <Highlight>Sliding Window</Highlight> to solve most of them.</Callout>
            </TopicModal>

            <TopicModal title="HashMap / HashSet" emoji="🗂️" color="#4ade80" summary="⭐ Must know — frequency count, cache, O(1) lookup">
                <Paragraph><Highlight>HashMap</Highlight> (Map) stores key→value, <Highlight>HashSet</Highlight> (Set) stores unique keys only. Both allow add/remove/find in average <Highlight>O(1)</Highlight>.</Paragraph>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">JS: Object vs Map vs Set</div>
                        <div className="text-slate-300 text-sm mt-1"><strong>Object</strong>: keys must be string/symbol, no guaranteed order.<br /><strong>Map</strong>: any key type, insertion order, has <InlineCode>.size</InlineCode>.<br /><strong>Set</strong>: unique values only, perfect for duplicate checks.</div>
                    </div>
                </div>
                <CodeBlock title="hashmap-patterns.js">{`// Count frequency
const freq = new Map()
for (const c of str) freq.set(c, (freq.get(c) || 0) + 1)

// Check duplicates
const hasDup = arr => new Set(arr).size !== arr.length

// Two Sum pattern
const map = new Map()
for (let i = 0; i < nums.length; i++) {
    const comp = target - nums[i]
    if (map.has(comp)) return [map.get(comp), i]
    map.set(nums[i], i)
}`}</CodeBlock>
                <Callout type="tip">If brute force is O(n²), think HashMap — usually reduces to <Highlight>O(n)</Highlight>.</Callout>
                <a href="/blogs/hash-map-pattern" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 Read detailed article →</a>
            </TopicModal>

            <TopicModal title="Stack / Queue" emoji="📚" color="#4ade80" summary="⭐ Must know — valid parentheses, BFS, monotonic stack">
                <Paragraph><Highlight>Stack</Highlight> = LIFO (Last In First Out), <Highlight>Queue</Highlight> = FIFO (First In First Out). Simple yet powerful.</Paragraph>
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
                <CodeBlock title="stack-queue-js.js">{`// Stack in JS (using Array)
const stack = []
stack.push(1); stack.push(2)
stack.pop()      // 2, stack = [1]

// Queue in JS (shift() is O(n)!)
const queue = []
queue.push(1); queue.push(2)
queue.shift()    // 1, queue = [2]

// ⚠️ O(1) queue: use Linked List or obj+pointer`}</CodeBlock>
                <Callout type="warning">JS Array <InlineCode>shift()</InlineCode> is <Highlight>O(n)</Highlight>! In interviews, mention Linked List-based queue for optimal performance.</Callout>
                <a href="/blogs/stack-pattern" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 Read detailed article →</a>
            </TopicModal>

            <TopicModal title="Linked List" emoji="🔗" color="#60a5fa" summary="⭐⭐ Important — reverse, cycle detect, merge sorted lists">
                <Paragraph>Each node contains <InlineCode>value</InlineCode> + <InlineCode>next</InlineCode> pointer. No random access (O(n)), but insert/delete at head is <Highlight>O(1)</Highlight>.</Paragraph>
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
                <Callout type="tip">Key techniques: <Highlight>Dummy node</Highlight> (avoid edge cases), <Highlight>Fast/Slow pointers</Highlight>, <Highlight>Reverse</Highlight> (3 vars: prev/curr/next).</Callout>
            </TopicModal>

            <TopicModal title="Tree / Binary Tree" emoji="🌳" color="#60a5fa" summary="⭐⭐ Important — DFS, BFS, DOM tree, BST">
                <Paragraph>Tree = acyclic graph. <Highlight>Binary Tree</Highlight> = max 2 children per node. <Highlight>BST</Highlight> = left &lt; root &lt; right.</Paragraph>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">3 DFS Traversals</div>
                        <div className="text-slate-300 text-sm mt-1"><strong>Inorder</strong> (L→Root→R): BST → sorted<br /><strong>Preorder</strong> (Root→L→R): copy/serialize<br /><strong>Postorder</strong> (L→R→Root): delete/size</div>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">Frontend connection</div>
                        <div className="text-slate-300 text-sm mt-1"><strong>DOM</strong> is a tree! React Virtual DOM is also a tree. Understanding trees = understanding React diff.</div>
                    </div>
                </div>
                <CodeBlock title="tree-traversal.js">{`// DFS — Max Depth (classic interview question)
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
                <Callout type="tip">Most tree problems use <Highlight>recursion</Highlight>. Base case: <InlineCode>if (!root) return</InlineCode>. Think: &quot;if I know left+right results, how do I compute root?&quot;</Callout>
                <a href="/blogs/bfs-dfs-pattern" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 Read BFS/DFS article →</a>
            </TopicModal>

            <TopicModal title="Graph" emoji="🕸️" color="#60a5fa" summary="⭐⭐ Important — BFS/DFS, cycle detection, topological sort">
                <Paragraph>Graph = vertices + edges. Represented using <Highlight>adjacency list</Highlight> (most common).</Paragraph>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">Graph Types</div>
                        <div className="text-slate-300 text-sm mt-1"><strong>Directed</strong>: A→B — dependencies, courses<br /><strong>Undirected</strong>: A↔B — social networks<br /><strong>Weighted</strong>: edges have costs — Dijkstra</div>
                    </div>
                </div>
                <CodeBlock title="graph-basics.js">{`// Adjacency List
const graph = { A: ['B','C'], B: ['D'], C: ['D'], D: [] }

// DFS on graph (NEED visited set!)
function dfs(graph, start) {
    const visited = new Set()
    function explore(node) {
        if (visited.has(node)) return
        visited.add(node)
        for (const next of graph[node]) explore(next)
    }
    explore(start)
}

// BFS on graph
function bfs(graph, start) {
    const visited = new Set([start]), queue = [start]
    while (queue.length) {
        const node = queue.shift()
        for (const next of graph[node])
            if (!visited.has(next)) { visited.add(next); queue.push(next) }
    }
}`}</CodeBlock>
                <Callout type="warning">Graphs can have <Highlight>cycles</Highlight> → always use a <InlineCode>visited</InlineCode> set. Forgetting = infinite loop!</Callout>
            </TopicModal>

            <TopicModal title="Heap / Trie" emoji="⛰️" color="#a78bfa" summary="⭐⭐⭐ Advanced — Top K elements, autocomplete, priority queue">
                <Paragraph><Highlight>Heap</Highlight> = get min/max O(1), insert/delete O(log n). <Highlight>Trie</Highlight> = prefix-based search.</Paragraph>
                <div className="my-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="rounded-xl bg-yellow-500/10 border border-yellow-500/20 p-4">
                        <div className="text-yellow-400 font-bold text-sm mb-2">⛰️ Heap</div>
                        <ul className="text-[var(--text-secondary)] text-xs space-y-1">
                            <li>• Top K elements</li>
                            <li>• Merge K sorted lists</li>
                            <li>• Median of stream</li>
                            <li>• JS: no built-in!</li>
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
                <Callout type="tip">JS has no built-in Heap. In interviews: &quot;I&apos;ll use a MinHeap, assuming it&apos;s available&quot; then focus on the main logic.</Callout>
            </TopicModal>
        </div>

        <Heading3>4.2 Patterns to Practice (click for suggested LeetCode problems)</Heading3>
        <div className="my-4 space-y-2">
            <TopicModal title="Hash Map / Hash Set" emoji="🗂️" color="#4ade80" summary="~15 problems — the most used pattern, almost every interview includes it">
                <Paragraph>Use when: you need <Highlight>O(1) lookup</Highlight>, frequency counting, finding pair/complement, removing duplicates, or grouping by key.</Paragraph>

                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">🔧 How does HashMap work?</div>
                        <div className="text-slate-300 text-sm mt-1">
                            <strong>Core:</strong> Key → <InlineCode>hash(key)</InlineCode> → index → Array[index] = Value<br /><br />
                            1. <strong>Hash</strong>: take key → run through hash function → get a number (hash code)<br />
                            2. <strong>Index</strong>: <InlineCode>hashCode % arraySize</InlineCode> → get index in array<br />
                            3. <strong>Store</strong>: save <InlineCode>{'{key, value}'}</InlineCode> at <InlineCode>array[index]</InlineCode>
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="text-yellow-400 font-bold text-sm">💥 Hash Collision (2 keys same index)</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <strong>Chaining</strong> (common): each slot is a linked list. Collision → append to list<br />
                            • <strong>Open Addressing</strong>: collision → find next empty slot (linear/quadratic probing)<br />
                            • Example: <InlineCode>hash(&quot;name&quot;) % 8 = 3</InlineCode>, <InlineCode>hash(&quot;email&quot;) % 8 = 3</InlineCode> → collision! → both in linked list at slot 3
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">⏱️ Time Complexity</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <strong>Get / Set / Delete / Has</strong>: Average <InlineCode>O(1)</InlineCode> | Worst <InlineCode>O(n)</InlineCode> (many collisions)<br />
                            • <strong>Load Factor</strong> = number of elements / array size. When &gt; 0.75 → <strong>resize x2</strong> + rehash all<br />
                            • Resize is expensive but <strong>amortized O(1)</strong> — happens very rarely
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">📦 In JS: Map vs Object</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <strong>Object</strong>: keys are string/symbol only. No <InlineCode>.size</InlineCode>. Prototype pollution risk<br />
                            • <strong>Map</strong>: keys can be <strong>ANY type</strong> (object, number, function). Has <InlineCode>.size</InlineCode>. Ordered insertion<br />
                            • <strong>Set</strong>: stores keys only (no values). Used for: check duplicates, unique values<br />
                            • <strong>WeakMap</strong>: keys must be objects. Weak reference → allows GC
                        </div>
                    </div>
                </div>

                <CodeBlock title="hash-map-patterns.js">{`// 1. Count frequency
const freq = new Map()
for (const c of str) freq.set(c, (freq.get(c) || 0) + 1)

// 2. Check duplicates
const hasDup = arr => new Set(arr).size !== arr.length

// 3. Two Sum — find complement
const map = new Map()
for (let i = 0; i < nums.length; i++) {
    const comp = target - nums[i]
    if (map.has(comp)) return [map.get(comp), i]
    map.set(nums[i], i)
}

// 4. Group Anagrams — sort as key
const groups = new Map()
for (const s of strs) {
    const key = s.split('').sort().join('')
    groups.set(key, [...(groups.get(key) || []), s])
}`}</CodeBlock>
                <div className="my-3 space-y-1.5">
                    <div className="text-green-400 font-bold text-sm mb-2">📋 LeetCode Problems:</div>
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
                <Callout type="tip">When a problem requires &quot;find in O(n)&quot; or &quot;count frequency&quot; → think HashMap. This is the <Highlight>most fundamental pattern</Highlight> — most other patterns combine with HashMap.</Callout>
                <a href="/blogs/hash-map-pattern" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 Read detailed article →</a>
            </TopicModal>

            <TopicModal title="Two Pointers" emoji="👉👈" color="#4ade80" summary="~15 problems — use 2 pointers moving on sorted array or linked list">
                <Paragraph>Use when: array is <Highlight>sorted</Highlight>, finding pair/triplet meeting a condition, or removing duplicates.</Paragraph>
                <CodeBlock title="two-pointers-patterns.js">{`// 1. Opposite ends — find pair in sorted array
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
                    <div className="text-green-400 font-bold text-sm mb-2">📋 LeetCode Problems:</div>
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
                <Callout type="tip">2 main types: <Highlight>Opposite ends</Highlight> (sorted, find pair) and <Highlight>Same direction</Highlight> (fast/slow, remove duplicates). Think: &quot;Which element can I eliminate?&quot;</Callout>
                <a href="/blogs/two-pointers-pattern" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 Read detailed article →</a>
            </TopicModal>

            <TopicModal title="Sliding Window" emoji="🪟" color="#4ade80" summary="~10 problems — find optimal substring/subarray with fixed or variable window">
                <Paragraph>Use when: finding a <Highlight>contiguous subarray/substring</Highlight> meeting a condition (max sum, min length, contains all chars).</Paragraph>
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
                    <div className="text-green-400 font-bold text-sm mb-2">📋 LeetCode Problems:</div>
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
                <Callout type="tip">2 types: <Highlight>Fixed window</Highlight> (size k) and <Highlight>Variable window</Highlight> (expand right, shrink left when invalid). Often combined with HashMap for frequency tracking.</Callout>
                <a href="/blogs/sliding-window-pattern" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 Read detailed article →</a>
            </TopicModal>

            <TopicModal title="BFS / DFS" emoji="🌲" color="#4ade80" summary="~20 problems — graph and tree traversal, most important for Frontend (DOM tree!)">
                <Paragraph>Frontend engineers <Highlight>must be good at BFS/DFS</Highlight> because the DOM is a tree! Flatten DOM, find element, traverse components.</Paragraph>
                <CodeBlock title="bfs-dfs-patterns.js">{`// 1. DFS on tree (recursive)
function dfs(root) {
    if (!root) return // base case
    dfs(root.left)    // process left
    dfs(root.right)   // process right
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

// 3. Number of Islands — DFS on grid
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
                    <div className="text-green-400 font-bold text-sm mb-2">📋 LeetCode Problems:</div>
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
                <Callout type="tip"><strong>BFS</strong> = Queue (level order, shortest path). <strong>DFS</strong> = Recursion (tree, backtrack). Grid: DFS + mark visited. FE interviews prefer DFS — relates to DOM.</Callout>
                <a href="/blogs/bfs-dfs-pattern" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 Read detailed article →</a>
            </TopicModal>

            <TopicModal title="Binary Search" emoji="🔍" color="#4ade80" summary="~10 problems — O(log n) search, not just on sorted arrays">
                <Paragraph>Binary search isn&apos;t just finding an element — it&apos;s also used for <Highlight>search space reduction</Highlight> on any monotonic function.</Paragraph>
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
                    <div className="text-green-400 font-bold text-sm mb-2">📋 LeetCode Problems:</div>
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
                <Callout type="tip">3 types: <Highlight>Classic</Highlight> (find exact), <Highlight>Bisect left/right</Highlight> (find boundary), <Highlight>Search on answer</Highlight> (binary search on result). When you see O(log n) → think Binary Search.</Callout>
                <a href="/blogs/binary-search-pattern" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 Read detailed article →</a>
            </TopicModal>

            <TopicModal title="Dynamic Programming" emoji="📊" color="#4ade80" summary="~15 Easy-Medium problems — hardest part but has clear patterns">
                <Paragraph>DP = break a problem into <Highlight>subproblems</Highlight>, store results to avoid recalculation. Frontend rarely encounters Hard DP.</Paragraph>
                <CodeBlock title="dp-patterns.js">{`// 1. Climbing Stairs — basic 1D DP
function climbStairs(n) {
    let a = 1, b = 1
    for (let i = 2; i <= n; i++) [a, b] = [b, a + b]
    return b
}

// 2. House Robber — take/skip pattern
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
                    <div className="text-green-400 font-bold text-sm mb-2">📋 Suggested LeetCode Problems:</div>
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
                <Callout type="tip">4 common DP types: <Highlight>1D linear</Highlight> (Climbing Stairs), <Highlight>Take/Skip</Highlight> (House Robber), <Highlight>Knapsack</Highlight> (Coin Change), <Highlight>Subsequence</Highlight> (LIS). Start with 1D DP first.</Callout>
                <a href="/blogs/dynamic-programming-pattern" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 Read detailed article →</a>
            </TopicModal>

            <TopicModal title="Backtracking" emoji="🔙" color="#4ade80" summary="~10 problems — generate all combinations, permutations, subsets">
                <Paragraph>Pattern: try each option → if invalid, <Highlight>go back (backtrack)</Highlight> → try the next option.</Paragraph>
                <CodeBlock title="backtracking-patterns.js">{`// 1. Subsets — basic template
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

// 2. Permutations — using used set
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
                    <div className="text-green-400 font-bold text-sm mb-2">📋 LeetCode Problems:</div>
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
                <Callout type="tip">Template: <InlineCode>backtrack(start, path)</InlineCode> → push → recurse → pop. 3 types: <Highlight>Subsets</Highlight> (start = i+1), <Highlight>Permutations</Highlight> (used set), <Highlight>Combinations</Highlight> (count to k).</Callout>
            </TopicModal>

            <TopicModal title="Stack-based" emoji="📚" color="#4ade80" summary="~10 problems — monotonic stack, valid parentheses, expression eval">
                <Paragraph>Stack = <Highlight>LIFO</Highlight>. Very useful for: matching brackets, next greater element, expression parsing.</Paragraph>
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
                    <div className="text-green-400 font-bold text-sm mb-2">📋 LeetCode Problems:</div>
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
                <Callout type="tip">3 types: <Highlight>Matching</Highlight> (brackets, tags), <Highlight>Monotonic stack</Highlight> (next greater/smaller), <Highlight>Expression eval</Highlight> (decode, RPN). Trick: when pushing new &gt; top → pop and process.</Callout>
                <a href="/blogs/stack-pattern" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 Read detailed article →</a>
            </TopicModal>
        </div>

        <Heading3>4.3 LeetCode Strategy</Heading3>
        <div className="my-4 space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                <span className="text-green-400 font-bold">1</span>
                <div className="text-slate-300 text-sm">
                    <strong>Weeks 1-2</strong>: Do Easy — 2-3 problems per day, practice coding without hints
                </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                <span className="text-yellow-400 font-bold">2</span>
                <div className="text-slate-300 text-sm">
                    <strong>Weeks 3-5</strong>: Do Medium by pattern — group problems by topic, do 3-5 per pattern
                </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                <span className="text-red-400 font-bold">3</span>
                <div className="text-slate-300 text-sm">
                    <strong>Weeks 6-8</strong>: Mix random — simulate interviews, 30-45 min time limit per problem
                </div>
            </div>
        </div>

        <Callout type="tip">
            Target: <Highlight>~150 problems</Highlight> (70% Medium, 20% Easy, 10% Hard).
            Use <strong>NeetCode 150</strong> or <strong>Grind 75</strong> — they have the best curated lists.
        </Callout>

        {/* ===== PHASE 5 ===== */}
        <Heading2>Phase 5 — Frontend System Design (4-6 weeks)</Heading2>

        <Paragraph>
            Unlike backend system design, <Highlight>Frontend System Design</Highlight> focuses on
            UI architecture, data flow, performance, and how to design scalable components.
        </Paragraph>

        <Heading3>5.1 Common Topics (click to see the design framework)</Heading3>
        <div className="my-4 space-y-2">
            <TopicModal title="Design a News Feed" emoji="📰" color="#a855f7" summary="Infinite scroll, virtualization, caching, optimistic update — the most common exercise">
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

            <TopicModal title="Design Autocomplete / Typeahead" emoji="🔍" color="#a855f7" summary="Debounce, caching, keyboard navigation — optimizing UX for search">
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

            <TopicModal title="Design a Chat Application" emoji="💬" color="#a855f7" summary="WebSocket, offline support, presence, message ordering — real-time system">
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

            <TopicModal title="Design Google Docs (Collaborative Editor)" emoji="📝" color="#a855f7" summary="CRDT/OT, conflict resolution, cursor sync — the hardest problem">
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

            <TopicModal title="Design a Design System" emoji="🎨" color="#a855f7" summary="Component library, design tokens, theming, versioning — real-world Sr. Frontend interview question">
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
        <Heading2>Phase 6 — Mock Interview & Behavioral (2-4 weeks)</Heading2>

        <Heading3>6.1 Mock Interview</Heading3>
        <div className="my-4 space-y-2">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-pink-400">🎤</span>
                <span className="text-slate-300 text-sm"><strong>Pramp.com</strong> — free mock interviews with real people</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-pink-400">🎤</span>
                <span className="text-slate-300 text-sm"><strong>interviewing.io</strong> — anonymous mock interviews with big tech engineers</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-pink-400">🎤</span>
                <span className="text-slate-300 text-sm">Practice with friends — <strong>think out loud</strong> while solving problems!</span>
            </div>
        </div>

        <Heading3>6.2 Behavioral Interview (STAR Method)</Heading3>
        <Paragraph>
            Big tech evaluates <Highlight>culture fit</Highlight> very seriously.
            Prepare 5-7 stories using the <Highlight>STAR</Highlight> format:
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
                'Tell me about a time you resolved a conflict in your team?',
                'What\'s the hardest project you\'ve worked on?',
                'When did you have to make a tough technical decision?',
                'Tell me about a time you failed and what you learned?',
                'How do you handle tight deadlines?',
            ].map(q => (
                <div key={q} className="flex items-center gap-3 p-2.5 rounded-lg bg-pink-500/5 border border-pink-500/10">
                    <span className="text-pink-400 text-xs">❓</span>
                    <span className="text-slate-300 text-sm">{q}</span>
                </div>
            ))}
        </div>

        <Callout type="warning">
            Behavioral interviews <Highlight>can&apos;t be crammed</Highlight> — you need to prepare real stories from real experience.
            Write them down, practice speaking out loud, record yourself and improve.
        </Callout>

        {/* ===== TIMELINE ===== */}
        <Heading2>📅 Suggested Timeline (6-9 months)</Heading2>

        <div className="my-6 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
                <thead>
                    <tr className="border-b border-[var(--border-primary)]">
                        <th className="text-left p-3 text-[var(--text-secondary)] font-medium">Month</th>
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
                        <td className="p-3">Build 3 pure UI components</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                        <td className="p-3 text-green-400 font-bold">4-6</td>
                        <td className="p-3">DSA</td>
                        <td className="p-3">LeetCode Easy → Medium</td>
                        <td className="p-3">150 problems, 30 min each</td>
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
                        <td className="p-3">Mock interviews, STAR stories</td>
                        <td className="p-3">10+ mock sessions</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <Heading2>📌 Summary</Heading2>

        <div className="my-6 space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-red-400 mt-0.5">1.</span>
                <span className="text-[var(--text-secondary)]"><Highlight>CS Fundamentals</Highlight> — don&apos;t skip this, it&apos;s what separates junior from senior</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-yellow-400 mt-0.5">2.</span>
                <span className="text-[var(--text-secondary)]"><Highlight>Deep JS</Highlight> — understand the internals, not just syntax. Implement from scratch</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 mt-0.5">3.</span>
                <span className="text-[var(--text-secondary)]"><Highlight>React + FE</Highlight> — build pure UI, understand rendering, performance</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-green-400 mt-0.5">4.</span>
                <span className="text-[var(--text-secondary)]"><Highlight>DSA</Highlight> — 150 LeetCode problems, focus on patterns not quantity</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-purple-400 mt-0.5">5.</span>
                <span className="text-[var(--text-secondary)]"><Highlight>System Design</Highlight> — design FE architecture, not just draw diagrams</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-pink-400 mt-0.5">6.</span>
                <span className="text-[var(--text-secondary)]"><Highlight>Mock + Behavioral</Highlight> — practice speaking out loud, prepare STAR stories</span>
            </div>
        </div>

        <Callout type="tip">
            Remember: <Highlight>Consistency &gt; Intensity</Highlight>. Studying 2-3 hours daily consistently is better than
            cramming 10 hours on weekends then taking a week off. Make learning a daily habit!
        </Callout>
    </>
)
