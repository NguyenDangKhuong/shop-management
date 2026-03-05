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
                        <div className="text-slate-300 text-sm mt-1">The file <InlineCode>app.js</InlineCode> is read from disk into RAM. RAM is ~100x faster than SSD but loses data when powered off.</div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">2. RAM → CPU</div>
                        <div className="text-slate-300 text-sm mt-1">CPU reads instructions from RAM, processing each one (fetch → decode → execute). CPU cache (L1/L2/L3) speeds up access to frequently used data.</div>
                    </div>
                    <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="text-yellow-400 font-bold text-sm">3. CPU processes → results go back to RAM</div>
                        <div className="text-slate-300 text-sm mt-1">Computation results are stored in RAM. If persistence is needed (saving files, writing to DB), data is written to Storage.</div>
                    </div>
                </div>
                <Paragraph><strong>Access speed:</strong> CPU Cache (~1ns) → RAM (~100ns) → SSD (~100μs) → HDD (~10ms). Understanding this hierarchy helps you optimize performance.</Paragraph>
                <Callout type="tip">📚 Resource: <strong>CS50 (Harvard)</strong> — Weeks 0-2. Free on YouTube.</Callout>
            </TopicModal>

            <TopicModal title="Binary, ASCII, Unicode" emoji="🔢" color="#ef4444" summary="How computers represent text, numbers, emoji — everything is 0s and 1s">
                <Paragraph>Computers only understand <Highlight>0 and 1</Highlight> (bits). All data is encoded as binary.</Paragraph>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <div className="text-red-400 font-bold text-sm">Binary (Base 2)</div>
                        <div className="text-slate-300 text-sm mt-1">Number 42 = <InlineCode>00101010</InlineCode> (8 bits = 1 byte)<br />1 byte = 256 values (0-255)<br />4 bytes = 32 bits = ~4 billion values</div>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">ASCII (128 characters)</div>
                        <div className="text-slate-300 text-sm mt-1">A=65, B=66, a=97, 0=48<br />Only supports English + basic characters<br />1 character = 1 byte</div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">Unicode & UTF-8</div>
                        <div className="text-slate-300 text-sm mt-1">Supports <strong>all languages</strong> + emoji 🎉<br />UTF-8: 1-4 bytes/character, backward compatible with ASCII<br />&quot;café&quot; = 4 chars but 5 bytes (é = 2 bytes)</div>
                    </div>
                </div>
                <CodeBlock title="Try in JS">{`'A'.charCodeAt(0)          // 65 (ASCII)
String.fromCharCode(65)    // 'A'
'😀'.codePointAt(0)        // 128512 (Unicode)
new TextEncoder().encode('café').length // 5 bytes`}</CodeBlock>
            </TopicModal>

            <TopicModal title="Process vs Thread" emoji="⚙️" color="#ef4444" summary="How the OS manages programs — why Node.js is single-threaded yet fast">
                <Paragraph>When you open Chrome + VS Code + Terminal, the OS manages them using <Highlight>Processes</Highlight> and <Highlight>Threads</Highlight>.</Paragraph>
                <div className="my-3 overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead><tr className="border-b border-[var(--border-primary)]"><th className="text-left p-2 text-slate-400">Criteria</th><th className="text-left p-2 text-blue-400">Process</th><th className="text-left p-2 text-green-400">Thread</th></tr></thead>
                        <tbody className="text-[var(--text-secondary)]">
                            <tr className="border-b border-gray-100"><td className="p-2">Memory</td><td className="p-2">Isolated</td><td className="p-2">Shared with process</td></tr>
                            <tr className="border-b border-gray-100"><td className="p-2">Creation</td><td className="p-2">Heavy (~MB)</td><td className="p-2">Light (~KB)</td></tr>
                            <tr className="border-b border-gray-100"><td className="p-2">Crash</td><td className="p-2">Doesn&apos;t affect other processes</td><td className="p-2">Can crash entire process</td></tr>
                            <tr><td className="p-2">Example</td><td className="p-2">Each Chrome tab = 1 process</td><td className="p-2">JS main thread + Web Workers</td></tr>
                        </tbody>
                    </table>
                </div>
                <Paragraph><strong>Node.js</strong> is single-threaded (1 main thread for JS) but uses <Highlight>libuv thread pool</Highlight> + OS async I/O for non-blocking I/O. That&apos;s why Node is fast for I/O-bound tasks.</Paragraph>
                <Callout type="tip">📚 Resource: <strong>Operating Systems: Three Easy Pieces</strong> — free book, excellent quality.</Callout>
            </TopicModal>
        </div>

        <Heading3>1.2 Networking Basics (click for details)</Heading3>
        <div className="my-4 space-y-2">
            <TopicModal title="HTTP/HTTPS" emoji="🌐" color="#ef4444" summary="Request/Response cycle, status codes, methods, headers — the foundation of the web">
                <Paragraph><Highlight>HTTP</Highlight> = client-server protocol. Browser sends a <strong>Request</strong>, server returns a <strong>Response</strong>.</Paragraph>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">HTTP Methods</div>
                        <div className="text-slate-300 text-sm mt-1"><InlineCode>GET</InlineCode> = read data | <InlineCode>POST</InlineCode> = create new<br /><InlineCode>PUT</InlineCode> = full update | <InlineCode>PATCH</InlineCode> = partial update<br /><InlineCode>DELETE</InlineCode> = delete</div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">Status Codes (must memorize!)</div>
                        <div className="text-slate-300 text-sm mt-1"><strong>2xx</strong>: 200 OK, 201 Created, 204 No Content<br /><strong>3xx</strong>: 301 Moved, 304 Not Modified<br /><strong>4xx</strong>: 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found<br /><strong>5xx</strong>: 500 Server Error, 502 Bad Gateway, 503 Unavailable</div>
                    </div>
                </div>
                <Paragraph><Highlight>HTTPS</Highlight> = HTTP + TLS encryption. Data is encrypted between client-server. Certificates are verified by a CA (Certificate Authority).</Paragraph>
            </TopicModal>

            <TopicModal title="DNS, TCP/IP, WebSocket" emoji="📡" color="#ef4444" summary="How browsers find servers and maintain connections">
                <Paragraph>When you type <InlineCode>google.com</InlineCode>, here&apos;s the journey:</Paragraph>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="text-yellow-400 font-bold text-sm">1. DNS Resolution</div>
                        <div className="text-slate-300 text-sm mt-1"><InlineCode>google.com</InlineCode> → <InlineCode>142.250.80.46</InlineCode><br />Browser cache → OS cache → Router → ISP DNS → Root DNS<br />Like looking up a phone book: name → number</div>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">2. TCP 3-way Handshake</div>
                        <div className="text-slate-300 text-sm mt-1">Client: SYN → Server: SYN-ACK → Client: ACK<br />Establishes a reliable connection before sending data<br />TCP ensures data arrives in order, without packet loss</div>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">3. WebSocket</div>
                        <div className="text-slate-300 text-sm mt-1">HTTP = request-response (one-way, closes after each exchange)<br />WebSocket = full-duplex (two-way, keeps connection open)<br />Used for: chat, notifications, live data, games</div>
                    </div>
                </div>
            </TopicModal>

            <TopicModal title="REST vs GraphQL" emoji="🔌" color="#ef4444" summary="Two popular API models — when to use which">
                <div className="my-3 overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead><tr className="border-b border-[var(--border-primary)]"><th className="text-left p-2 text-slate-400">Criteria</th><th className="text-left p-2 text-blue-400">REST</th><th className="text-left p-2 text-purple-400">GraphQL</th></tr></thead>
                        <tbody className="text-[var(--text-secondary)]">
                            <tr className="border-b border-gray-100"><td className="p-2">Type</td><td className="p-2">Multiple endpoints</td><td className="p-2">Single endpoint</td></tr>
                            <tr className="border-b border-gray-100"><td className="p-2">Data fetching</td><td className="p-2">Server decides what to return</td><td className="p-2">Client picks needed fields</td></tr>
                            <tr className="border-b border-gray-100"><td className="p-2">Over-fetching</td><td className="p-2">Common</td><td className="p-2">Never</td></tr>
                            <tr className="border-b border-gray-100"><td className="p-2">Caching</td><td className="p-2">Simple HTTP caching</td><td className="p-2">More complex</td></tr>
                            <tr><td className="p-2">Used by</td><td className="p-2">Most APIs</td><td className="p-2">Facebook, GitHub, Shopify</td></tr>
                        </tbody>
                    </table>
                </div>
                <CodeBlock title="REST vs GraphQL example">{`// REST: GET /api/users/1 → returns full user object
{ id: 1, name: "An", email: "...", address: "...", ... }

// GraphQL: POST /graphql → only fetch needed fields
query { user(id: 1) { name, email } }
→ { name: "An", email: "..." } // No extra data!`}</CodeBlock>
            </TopicModal>

            <TopicModal title="CORS, Cookies, JWT" emoji="🔐" color="#ef4444" summary="Authentication flow — how web apps verify users">
                <Heading3>CORS (Cross-Origin Resource Sharing)</Heading3>
                <Paragraph>Browsers block requests from domain A to domain B (security). Servers must allow it via the <InlineCode>Access-Control-Allow-Origin</InlineCode> header.</Paragraph>
                <Heading3>Cookies vs JWT</Heading3>
                <div className="my-3 overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead><tr className="border-b border-[var(--border-primary)]"><th className="text-left p-2 text-slate-400">Criteria</th><th className="text-left p-2 text-blue-400">Cookie</th><th className="text-left p-2 text-green-400">JWT</th></tr></thead>
                        <tbody className="text-[var(--text-secondary)]">
                            <tr className="border-b border-gray-100"><td className="p-2">Stored in</td><td className="p-2">Browser (auto-sent)</td><td className="p-2">Client (localStorage/memory)</td></tr>
                            <tr className="border-b border-gray-100"><td className="p-2">Stateful</td><td className="p-2">Server stores session</td><td className="p-2">Stateless — token contains data</td></tr>
                            <tr className="border-b border-gray-100"><td className="p-2">XSS risk</td><td className="p-2">httpOnly flag protects</td><td className="p-2">If in localStorage — risky!</td></tr>
                            <tr><td className="p-2">Scale</td><td className="p-2">Needs sticky sessions</td><td className="p-2">Easy to scale (stateless)</td></tr>
                        </tbody>
                    </table>
                </div>
                <Callout type="warning">JWT in <InlineCode>localStorage</InlineCode> is vulnerable to XSS. Best practice: store JWT in <Highlight>httpOnly cookie</Highlight> or memory.</Callout>
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

        {/* ===== PHASE 3 ===== */}
        <Heading2>Phase 3 — React & Deep Frontend (4-6 weeks)</Heading2>

        <Heading3>3.1 React (click for details)</Heading3>
        <div className="my-4 space-y-2">
            <TopicModal title="Virtual DOM & Reconciliation" emoji="🌳" color="#61DAFB" summary="React diff algorithm — how React knows what to update on the real DOM">
                <Paragraph>React doesn&apos;t update the DOM directly. Instead, it uses a <Highlight>Virtual DOM</Highlight> — a lightweight copy of the real DOM.</Paragraph>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">Process</div>
                        <div className="text-slate-300 text-sm mt-1">1. State changes → React creates a new Virtual DOM<br />2. <strong>Diffing</strong>: Compares old vs new VDOM (O(n) via heuristics)<br />3. <strong>Reconciliation</strong>: Only updates the differences on the real DOM<br />4. Browser repaint</div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">React Fiber (React 18+)</div>
                        <div className="text-slate-300 text-sm mt-1">Fiber = new architecture for reconciliation<br />Allows <strong>interrupt rendering</strong> — prioritizes important UI updates first<br />Enables concurrent features: Suspense, Transitions, Streaming</div>
                    </div>
                </div>
                <Callout type="tip">Interview: Explain why the <InlineCode>key</InlineCode> prop is important in lists — it helps React&apos;s diff algorithm identify which elements changed, were added, or removed.</Callout>
            </TopicModal>

            <TopicModal title="Hooks deep dive" emoji="🪝" color="#61DAFB" summary="useState, useEffect, useRef, useMemo, useCallback — rules and pitfalls">
                <div className="my-3 space-y-2">
                    {[
                        ['useState', 'Basic state. Batch updates (React 18+). Use function form for state depending on previous: setState(prev => prev + 1)'],
                        ['useEffect', 'Side effects. Dependency array determines when it runs. Cleanup function runs before each re-run and on unmount.'],
                        ['useRef', 'Persistent reference across renders. Changing .current does NOT cause re-render. Use for DOM ref, timers, previous value.'],
                        ['useMemo', 'Cache expensive computations. Only recalculates when dependencies change. Don\'t overuse — has overhead!'],
                        ['useCallback', 'Cache function reference. Important when passing callbacks to React.memo components or dependency arrays.'],
                        ['useContext', 'Read context value. Re-renders when context value changes. Watch for performance — split context if needed.'],
                    ].map(([name, desc]) => (
                        <div key={name} className="p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                            <div className="text-blue-400 font-mono text-sm font-bold">{name}</div>
                            <div className="text-slate-300 text-sm mt-1">{desc}</div>
                        </div>
                    ))}
                </div>
                <Callout type="warning"><strong>Rules of Hooks:</strong> 1) Only call at top level (not inside if/for/nested functions) 2) Only call in React components or custom hooks.</Callout>
                <a href="/blogs/react-hooks-chi-tiet" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 Read detailed article →</a>
            </TopicModal>

            <TopicModal title="Component Patterns" emoji="🧩" color="#61DAFB" summary="HOC, Render Props, Compound, Controlled/Uncontrolled — when to use which">
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">Higher-Order Component (HOC)</div>
                        <div className="text-slate-300 text-sm mt-1">Function that takes a component → returns a new component with extra logic.<br />Example: <InlineCode>withAuth(Dashboard)</InlineCode> — adds auth check.</div>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">Render Props</div>
                        <div className="text-slate-300 text-sm mt-1">Component receives a function via prop, calls it to render.<br />More flexible than HOC but can cause &quot;callback hell&quot;.</div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">Compound Components</div>
                        <div className="text-slate-300 text-sm mt-1">Group of components sharing state via Context.<br />Example: <InlineCode>{'<Select> <Select.Option /> </Select>'}</InlineCode></div>
                    </div>
                    <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="text-yellow-400 font-bold text-sm">Controlled vs Uncontrolled</div>
                        <div className="text-slate-300 text-sm mt-1"><strong>Controlled</strong>: React manages state (value + onChange).<br /><strong>Uncontrolled</strong>: DOM manages state (useRef). Use when integrating with non-React code.</div>
                    </div>
                </div>
                <Callout type="tip">Current trend: <Highlight>Custom Hooks</Highlight> replace most HOC and Render Props. Easier to read, test, and compose.</Callout>
            </TopicModal>

            <TopicModal title="Performance Optimization" emoji="⚡" color="#61DAFB" summary="React.memo, useMemo, useCallback, code splitting, virtualization">
                <Paragraph>React re-renders the entire subtree when state changes. Here are techniques to <Highlight>prevent unnecessary re-renders</Highlight>:</Paragraph>
                <CodeBlock title="Optimization techniques">{`// 1. React.memo — skip re-render if props haven't changed
const ExpensiveList = React.memo(({ items }) => {
    return items.map(item => <Item key={item.id} {...item} />)
})

// 2. useMemo — cache expensive calculations
const sorted = useMemo(() => 
    items.sort((a, b) => a.price - b.price), 
    [items]
)

// 3. useCallback — stable function reference
const handleClick = useCallback((id) => {
    setItems(prev => prev.filter(i => i.id !== id))
}, []) // Won't re-create on every render

// 4. Dynamic import — code splitting
const AdminPanel = lazy(() => import('./AdminPanel'))

// 5. Virtualization — only render visible items
// react-window, react-virtuoso for lists with 10k+ items`}</CodeBlock>
                <Callout type="warning">Don&apos;t premature optimize! Only optimize when React DevTools Profiler shows a real bottleneck.</Callout>
                <a href="/blogs/react-performance" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 Read detailed article →</a>
            </TopicModal>
        </div>

        <Heading3>3.2 HTML/CSS (click for details)</Heading3>
        <div className="my-4 space-y-2">
            <TopicModal title="Semantic HTML & Accessibility" emoji="♿" color="#38bdf8" summary="Screen readers, ARIA, landmark roles — why accessibility matters in interviews">
                <Paragraph><Highlight>Semantic HTML</Highlight> = using the right tag for the right purpose. Google and Apple especially value accessibility.</Paragraph>
                <CodeBlock title="Semantic vs Non-semantic">{`<!-- ❌ Non-semantic -->
<div class="header"><div class="nav">...</div></div>
<div class="main"><div class="article">...</div></div>
<div class="footer">...</div>

<!-- ✅ Semantic -->
<header><nav>...</nav></header>
<main><article>...</article></main>
<footer>...</footer>

<!-- ARIA when needed -->
<button aria-label="Close dialog" aria-expanded="false">✕</button>
<div role="alert" aria-live="polite">Error message</div>`}</CodeBlock>
                <Callout type="tip">Big tech loves asking: &quot;Build component X that&apos;s accessible&quot; — must support keyboard navigation, screen reader, focus management.</Callout>
            </TopicModal>

            <TopicModal title="CSS Layout — Flexbox & Grid" emoji="📐" color="#38bdf8" summary="Layout from scratch without frameworks — an important interview skill">
                <CodeBlock title="Flexbox cheat sheet">{`/* Flexbox — 1 dimension (row OR column) */
.container {
    display: flex;
    justify-content: space-between; /* main axis */
    align-items: center;            /* cross axis */
    flex-wrap: wrap;                /* wrap to next line */
    gap: 16px;                      /* spacing */
}
.item { flex: 1 1 200px; }         /* grow shrink basis */

/* Grid — 2 dimensions (row AND column) */
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 16px;
}

/* Responsive without media queries! */
.responsive {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}`}</CodeBlock>
                <Callout type="tip">Interview: <strong>Flexbox</strong> for navigation, card layouts. <strong>Grid</strong> for page layout, dashboards. Know both and when to use each.</Callout>
            </TopicModal>

            <TopicModal title="Web Security — XSS, CSRF, CSP" emoji="🛡️" color="#38bdf8" summary="Common web security vulnerabilities — must know how to prevent them">
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <div className="text-red-400 font-bold text-sm">XSS (Cross-Site Scripting)</div>
                        <div className="text-slate-300 text-sm mt-1">Attacker injects malicious JS into the page.<br /><strong>Prevention:</strong> React auto-escapes JSX. NEVER use <InlineCode>dangerouslySetInnerHTML</InlineCode>. Sanitize user input.</div>
                    </div>
                    <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="text-yellow-400 font-bold text-sm">CSRF (Cross-Site Request Forgery)</div>
                        <div className="text-slate-300 text-sm mt-1">Attacker tricks user into sending requests from another site.<br /><strong>Prevention:</strong> CSRF tokens, SameSite cookie, verify Origin header.</div>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">CSP (Content Security Policy)</div>
                        <div className="text-slate-300 text-sm mt-1">HTTP header specifying allowed sources for scripts/styles.<br /><InlineCode>{`Content-Security-Policy: script-src 'self' https://cdn.example.com`}</InlineCode></div>
                    </div>
                </div>
            </TopicModal>

            <TopicModal title="Core Web Vitals" emoji="📊" color="#38bdf8" summary="LCP, INP, CLS — how Google measures performance, how to optimize">
                <div className="my-3 overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead><tr className="border-b border-[var(--border-primary)]"><th className="text-left p-2 text-slate-400">Metric</th><th className="text-left p-2 text-slate-400">Measures</th><th className="text-left p-2 text-green-400">Good</th><th className="text-left p-2 text-slate-400">Optimization</th></tr></thead>
                        <tbody className="text-[var(--text-secondary)]">
                            <tr className="border-b border-gray-100"><td className="p-2 text-blue-400 font-bold">LCP</td><td className="p-2">Largest Contentful Paint</td><td className="p-2">&lt; 2.5s</td><td className="p-2">Optimize images, preload fonts, SSR</td></tr>
                            <tr className="border-b border-gray-100"><td className="p-2 text-green-400 font-bold">INP</td><td className="p-2">Interaction to Next Paint</td><td className="p-2">&lt; 200ms</td><td className="p-2">Reduce JS, web workers, debounce</td></tr>
                            <tr><td className="p-2 text-yellow-400 font-bold">CLS</td><td className="p-2">Cumulative Layout Shift</td><td className="p-2">&lt; 0.1</td><td className="p-2">Set image dimensions, font-display</td></tr>
                        </tbody>
                    </table>
                </div>
                <Callout type="tip">Tools: <strong>Lighthouse</strong> (Chrome DevTools), <strong>web.dev/measure</strong>, <strong>PageSpeed Insights</strong>.</Callout>
                <a href="/blogs/core-web-vitals" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 Read detailed article →</a>
            </TopicModal>
        </div>

        <Callout type="tip">
            Google and Meta love asking: &quot;Build component X from scratch without a library&quot; —
            e.g., autocomplete, infinite scroll, modal, drag &amp; drop, virtual list.
            Practicing building pure UI components is hugely beneficial.
        </Callout>

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
                        <div className="text-purple-400 font-bold text-sm">Component Architecture</div>
                        <div className="text-slate-300 text-sm mt-1"><InlineCode>{'<Feed> → <FeedItem> → <PostContent>, <ActionBar>, <CommentSection>'}</InlineCode><br />Each FeedItem is an independent render unit → easy to virtualize.</div>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">Key Techniques</div>
                        <div className="text-slate-300 text-sm mt-1">• <strong>Infinite Scroll</strong>: IntersectionObserver + cursor-based pagination<br />• <strong>Virtualization</strong>: Only render ~20 visible items, unmount items outside viewport<br />• <strong>Optimistic Update</strong>: UI updates immediately → send API → rollback if fails<br />• <strong>Cache</strong>: Normalized data store (by ID), stale-while-revalidate</div>
                    </div>
                </div>
                <Callout type="tip">Always mention <Highlight>accessibility</Highlight>: keyboard navigation through posts, screen reader for action buttons, focus management when loading more.</Callout>
            </TopicModal>

            <TopicModal title="Design Autocomplete / Typeahead" emoji="🔍" color="#a855f7" summary="Debounce, caching, keyboard navigation — optimizing UX for search">
                <Paragraph>Google Search, GitHub Code Search — a feature that seems simple but is extremely complex.</Paragraph>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">Data Flow</div>
                        <div className="text-slate-300 text-sm mt-1">1. User types → <strong>debounce 300ms</strong> → API call<br />2. Check <strong>cache</strong> first (LRU cache by query prefix)<br />3. Display results dropdown, <strong>highlight matching text</strong><br />4. Keyboard: ↑↓ navigate, Enter select, Esc close</div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">Edge Cases to Handle</div>
                        <div className="text-slate-300 text-sm mt-1">• Race condition: user types fast → cancel previous requests (AbortController)<br />• Empty state, loading state, error state<br />• Click outside to close, focus trap<br />• Mobile: virtual keyboard pushes content</div>
                    </div>
                </div>
            </TopicModal>

            <TopicModal title="Design a Chat Application" emoji="💬" color="#a855f7" summary="WebSocket, offline support, presence, message ordering">
                <Paragraph>Design Messenger/Slack — a real-time communication system.</Paragraph>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">Architecture</div>
                        <div className="text-slate-300 text-sm mt-1">• <strong>WebSocket</strong> for real-time messages (fallback: long polling, SSE)<br />• <strong>Message store</strong>: Normalize by conversationId → messageIds<br />• <strong>Pagination</strong>: Load latest 50 messages, scroll up = load more<br />• <strong>Optimistic send</strong>: Display immediately with status pending → sent → delivered → read</div>
                    </div>
                    <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="text-yellow-400 font-bold text-sm">Offline Support</div>
                        <div className="text-slate-300 text-sm mt-1">• Queue messages locally when offline (IndexedDB)<br />• Sync on reconnect, resolve conflicts by timestamp<br />• Presence indicators: online/offline/typing via WebSocket heartbeats</div>
                    </div>
                </div>
            </TopicModal>

            <TopicModal title="Design Google Docs (Collaborative Editor)" emoji="📝" color="#a855f7" summary="CRDT/OT, conflict resolution, cursor sync — the hardest problem">
                <Paragraph>This is a <Highlight>Hard level</Highlight> problem — many people get stuck because they don&apos;t understand CRDT/OT.</Paragraph>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <div className="text-red-400 font-bold text-sm">OT vs CRDT</div>
                        <div className="text-slate-300 text-sm mt-1"><strong>OT (Operational Transform)</strong>: Transform operations to handle conflicts. Used by Google Docs.<br /><strong>CRDT (Conflict-free Replicated Data Type)</strong>: Data structure that auto-merges. Used by Figma, Notion.<br />CRDT is easier to implement, doesn&apos;t need a central server.</div>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">Key Components</div>
                        <div className="text-slate-300 text-sm mt-1">• Rich text editor (Slate.js, ProseMirror, Tiptap)<br />• Cursor awareness: display cursor + collaborator names<br />• Version history: snapshot + diff<br />• Permissions: read/write/comment per user</div>
                    </div>
                </div>
                <Callout type="tip">You don&apos;t need to fully implement CRDT/OT — just <Highlight>explain the concept</Highlight> and trade-offs to score well.</Callout>
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
