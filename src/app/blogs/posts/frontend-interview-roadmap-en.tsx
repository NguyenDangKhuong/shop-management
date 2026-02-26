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

        <div className="my-6 p-4 rounded-xl bg-slate-800/50 border border-white/10">
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
                        <thead><tr className="border-b border-white/10"><th className="text-left p-2 text-slate-400">Criteria</th><th className="text-left p-2 text-blue-400">Process</th><th className="text-left p-2 text-green-400">Thread</th></tr></thead>
                        <tbody className="text-slate-300">
                            <tr className="border-b border-white/5"><td className="p-2">Memory</td><td className="p-2">Isolated</td><td className="p-2">Shared with process</td></tr>
                            <tr className="border-b border-white/5"><td className="p-2">Creation</td><td className="p-2">Heavy (~MB)</td><td className="p-2">Light (~KB)</td></tr>
                            <tr className="border-b border-white/5"><td className="p-2">Crash</td><td className="p-2">Doesn&apos;t affect other processes</td><td className="p-2">Can crash entire process</td></tr>
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
                        <thead><tr className="border-b border-white/10"><th className="text-left p-2 text-slate-400">Criteria</th><th className="text-left p-2 text-blue-400">REST</th><th className="text-left p-2 text-purple-400">GraphQL</th></tr></thead>
                        <tbody className="text-slate-300">
                            <tr className="border-b border-white/5"><td className="p-2">Type</td><td className="p-2">Multiple endpoints</td><td className="p-2">Single endpoint</td></tr>
                            <tr className="border-b border-white/5"><td className="p-2">Data fetching</td><td className="p-2">Server decides what to return</td><td className="p-2">Client picks needed fields</td></tr>
                            <tr className="border-b border-white/5"><td className="p-2">Over-fetching</td><td className="p-2">Common</td><td className="p-2">Never</td></tr>
                            <tr className="border-b border-white/5"><td className="p-2">Caching</td><td className="p-2">Simple HTTP caching</td><td className="p-2">More complex</td></tr>
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
                        <thead><tr className="border-b border-white/10"><th className="text-left p-2 text-slate-400">Criteria</th><th className="text-left p-2 text-blue-400">Cookie</th><th className="text-left p-2 text-green-400">JWT</th></tr></thead>
                        <tbody className="text-slate-300">
                            <tr className="border-b border-white/5"><td className="p-2">Stored in</td><td className="p-2">Browser (auto-sent)</td><td className="p-2">Client (localStorage/memory)</td></tr>
                            <tr className="border-b border-white/5"><td className="p-2">Stateful</td><td className="p-2">Server stores session</td><td className="p-2">Stateless — token contains data</td></tr>
                            <tr className="border-b border-white/5"><td className="p-2">XSS risk</td><td className="p-2">httpOnly flag protects</td><td className="p-2">If in localStorage — risky!</td></tr>
                            <tr><td className="p-2">Scale</td><td className="p-2">Needs sticky sessions</td><td className="p-2">Easy to scale (stateless)</td></tr>
                        </tbody>
                    </table>
                </div>
                <Callout type="warning">JWT in <InlineCode>localStorage</InlineCode> is vulnerable to XSS. Best practice: store JWT in <Highlight>httpOnly cookie</Highlight> or memory.</Callout>
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
                        <thead><tr className="border-b border-white/10"><th className="text-left p-2 text-slate-400">Rule</th><th className="text-left p-2 text-slate-400">this =</th><th className="text-left p-2 text-slate-400">Example</th></tr></thead>
                        <tbody className="text-slate-300">
                            <tr className="border-b border-white/5"><td className="p-2 text-yellow-400">Default</td><td className="p-2">window / undefined</td><td className="p-2"><InlineCode>foo()</InlineCode></td></tr>
                            <tr className="border-b border-white/5"><td className="p-2 text-blue-400">Implicit</td><td className="p-2">object before the dot</td><td className="p-2"><InlineCode>obj.foo()</InlineCode></td></tr>
                            <tr className="border-b border-white/5"><td className="p-2 text-green-400">Explicit</td><td className="p-2">first argument</td><td className="p-2"><InlineCode>foo.call(obj)</InlineCode></td></tr>
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
            </TopicModal>

            <TopicModal title="Async/Await & Promises" emoji="⚡" color="#fbbf24" summary="Promise.all, race, allSettled, error handling">
                <Paragraph><Highlight>Promise</Highlight> = an object representing a future value. 3 states: <InlineCode>pending</InlineCode> → <InlineCode>fulfilled</InlineCode> / <InlineCode>rejected</InlineCode>.</Paragraph>
                <Paragraph><InlineCode>async/await</InlineCode> is syntactic sugar — lets you write async code that looks synchronous.</Paragraph>
                <div className="my-3 overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead><tr className="border-b border-white/10"><th className="text-left p-2 text-slate-400">Method</th><th className="text-left p-2 text-slate-400">When to use</th></tr></thead>
                        <tbody className="text-slate-300">
                            <tr className="border-b border-white/5"><td className="p-2"><InlineCode>Promise.all</InlineCode></td><td className="p-2">Run in parallel, fail if any fails</td></tr>
                            <tr className="border-b border-white/5"><td className="p-2"><InlineCode>Promise.allSettled</InlineCode></td><td className="p-2">Run in parallel, wait for all to finish</td></tr>
                            <tr className="border-b border-white/5"><td className="p-2"><InlineCode>Promise.race</InlineCode></td><td className="p-2">Take the fastest result</td></tr>
                            <tr><td className="p-2"><InlineCode>Promise.any</InlineCode></td><td className="p-2">Take the first fulfilled</td></tr>
                        </tbody>
                    </table>
                </div>
                <Callout type="warning">Always use <InlineCode>try/catch</InlineCode> with async/await. Unhandled Promise rejections will crash the Node.js process!</Callout>
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
                        <div key={title} className="p-2 rounded-lg bg-slate-800/40 border border-white/5">
                            <div className="text-blue-400 text-sm font-medium">{title}</div>
                            <div className="text-slate-400 text-xs font-mono mt-0.5">{desc}</div>
                        </div>
                    ))}
                </div>
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
        </div>

        <Heading3>2.2 Implement from Scratch (click for sample code)</Heading3>
        <div className="my-4 space-y-2">
            <TopicModal title="Array.map / filter / reduce" emoji="💻" color="#fbbf24" summary="Re-implement the 3 most popular Array higher-order functions">
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
            </TopicModal>

            <TopicModal title="Function.bind / call / apply" emoji="💻" color="#fbbf24" summary="Re-implement the 3 methods that change this context">
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
            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5">
                <span className="text-yellow-400">📕</span>
                <div className="text-slate-300 text-sm">
                    <strong>You Don&apos;t Know JS</strong> (Kyle Simpson) — read the entire series for extremely deep JS understanding
                </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5">
                <span className="text-yellow-400">📗</span>
                <div className="text-slate-300 text-sm">
                    <strong>javascript.info</strong> — best online resource with examples + exercises
                </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5">
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
                        <div key={name} className="p-3 rounded-lg bg-slate-800/40 border border-white/5">
                            <div className="text-blue-400 font-mono text-sm font-bold">{name}</div>
                            <div className="text-slate-300 text-sm mt-1">{desc}</div>
                        </div>
                    ))}
                </div>
                <Callout type="warning"><strong>Rules of Hooks:</strong> 1) Only call at top level (not inside if/for/nested functions) 2) Only call in React components or custom hooks.</Callout>
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
                        <thead><tr className="border-b border-white/10"><th className="text-left p-2 text-slate-400">Metric</th><th className="text-left p-2 text-slate-400">Measures</th><th className="text-left p-2 text-green-400">Good</th><th className="text-left p-2 text-slate-400">Optimization</th></tr></thead>
                        <tbody className="text-slate-300">
                            <tr className="border-b border-white/5"><td className="p-2 text-blue-400 font-bold">LCP</td><td className="p-2">Largest Contentful Paint</td><td className="p-2">&lt; 2.5s</td><td className="p-2">Optimize images, preload fonts, SSR</td></tr>
                            <tr className="border-b border-white/5"><td className="p-2 text-green-400 font-bold">INP</td><td className="p-2">Interaction to Next Paint</td><td className="p-2">&lt; 200ms</td><td className="p-2">Reduce JS, web workers, debounce</td></tr>
                            <tr><td className="p-2 text-yellow-400 font-bold">CLS</td><td className="p-2">Cumulative Layout Shift</td><td className="p-2">&lt; 0.1</td><td className="p-2">Set image dimensions, font-display</td></tr>
                        </tbody>
                    </table>
                </div>
                <Callout type="tip">Tools: <strong>Lighthouse</strong> (Chrome DevTools), <strong>web.dev/measure</strong>, <strong>PageSpeed Insights</strong>.</Callout>
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

        <Heading3>4.1 Data Structures (must master)</Heading3>
        <div className="my-4 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
                <thead>
                    <tr className="border-b border-white/10">
                        <th className="text-left p-3 text-slate-400 font-medium">Data Structure</th>
                        <th className="text-left p-3 text-slate-400 font-medium">Priority</th>
                        <th className="text-left p-3 text-slate-400 font-medium">When to use</th>
                    </tr>
                </thead>
                <tbody className="text-slate-300">
                    <tr className="border-b border-white/5">
                        <td className="p-3 font-semibold text-green-400">Array / String</td>
                        <td className="p-3">⭐ Must know</td>
                        <td className="p-3">Two pointers, sliding window</td>
                    </tr>
                    <tr className="border-b border-white/5">
                        <td className="p-3 font-semibold text-green-400">HashMap / HashSet</td>
                        <td className="p-3">⭐ Must know</td>
                        <td className="p-3">Frequency count, cache, lookup</td>
                    </tr>
                    <tr className="border-b border-white/5">
                        <td className="p-3 font-semibold text-green-400">Stack / Queue</td>
                        <td className="p-3">⭐ Must know</td>
                        <td className="p-3">Valid parentheses, BFS</td>
                    </tr>
                    <tr className="border-b border-white/5">
                        <td className="p-3 font-semibold text-blue-400">Linked List</td>
                        <td className="p-3">⭐⭐ Important</td>
                        <td className="p-3">Reverse, cycle detect, merge</td>
                    </tr>
                    <tr className="border-b border-white/5">
                        <td className="p-3 font-semibold text-blue-400">Tree / Binary Tree</td>
                        <td className="p-3">⭐⭐ Important</td>
                        <td className="p-3">DFS, BFS, DOM tree!</td>
                    </tr>
                    <tr className="border-b border-white/5">
                        <td className="p-3 font-semibold text-blue-400">Graph</td>
                        <td className="p-3">⭐⭐ Important</td>
                        <td className="p-3">BFS/DFS, dependency resolution</td>
                    </tr>
                    <tr>
                        <td className="p-3 font-semibold text-purple-400">Heap / Trie</td>
                        <td className="p-3">⭐⭐⭐ Advanced</td>
                        <td className="p-3">Top K, autocomplete</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <Heading3>4.2 Patterns to Practice (click for suggested LeetCode problems)</Heading3>
        <div className="my-4 space-y-2">
            <TopicModal title="Two Pointers" emoji="👉👈" color="#4ade80" summary="~15 problems — use 2 pointers moving on sorted array or linked list">
                <Paragraph>Use when: array is <Highlight>sorted</Highlight>, finding pair/triplet meeting a condition, or removing duplicates.</Paragraph>
                <div className="my-3 space-y-1.5">
                    <div className="text-green-400 font-bold text-sm mb-2">📋 LeetCode Problems:</div>
                    {[
                        ['Easy', ['167. Two Sum II - Input Array Is Sorted', '26. Remove Duplicates from Sorted Array', '283. Move Zeroes', '344. Reverse String', '977. Squares of a Sorted Array']],
                        ['Medium', ['15. 3Sum', '11. Container With Most Water', '75. Sort Colors', '142. Linked List Cycle II', '238. Product of Array Except Self']],
                    ].map(([level, problems]) => (
                        <div key={level as string} className="p-2.5 rounded-lg bg-slate-800/40 border border-white/5">
                            <div className={`text-xs font-bold mb-1 ${level === 'Easy' ? 'text-green-400' : 'text-yellow-400'}`}>{level as string}</div>
                            <div className="text-slate-300 text-xs space-y-0.5">{(problems as string[]).map(p => <div key={p}>• <a href={`https://leetcode.com/problems/${toLeetCodeSlug(p as string)}/`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{p as string}</a></div>)}</div>
                        </div>
                    ))}
                </div>
                <Callout type="tip">Template: left = 0, right = length-1, move based on condition. Always think: &quot;Which element can I eliminate?&quot;</Callout>
            </TopicModal>

            <TopicModal title="Sliding Window" emoji="🪟" color="#4ade80" summary="~10 problems — find optimal substring/subarray with fixed or variable window">
                <Paragraph>Use when: finding a <Highlight>contiguous subarray/substring</Highlight> meeting a condition (max sum, min length, contains all chars).</Paragraph>
                <div className="my-3 space-y-1.5">
                    <div className="text-green-400 font-bold text-sm mb-2">📋 LeetCode Problems:</div>
                    {[
                        ['Easy', ['643. Maximum Average Subarray I', '219. Contains Duplicate II']],
                        ['Medium', ['3. Longest Substring Without Repeating Characters', '424. Longest Repeating Character Replacement', '567. Permutation in String', '209. Minimum Size Subarray Sum', '438. Find All Anagrams in a String']],
                        ['Hard', ['76. Minimum Window Substring', '239. Sliding Window Maximum']],
                    ].map(([level, problems]) => (
                        <div key={level as string} className="p-2.5 rounded-lg bg-slate-800/40 border border-white/5">
                            <div className={`text-xs font-bold mb-1 ${level === 'Easy' ? 'text-green-400' : level === 'Medium' ? 'text-yellow-400' : 'text-red-400'}`}>{level as string}</div>
                            <div className="text-slate-300 text-xs space-y-0.5">{(problems as string[]).map(p => <div key={p}>• <a href={`https://leetcode.com/problems/${toLeetCodeSlug(p as string)}/`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{p as string}</a></div>)}</div>
                        </div>
                    ))}
                </div>
                <Callout type="tip">Template: expand right pointer, when window is invalid shrink left. Use HashMap to track frequency.</Callout>
            </TopicModal>

            <TopicModal title="BFS / DFS" emoji="🌲" color="#4ade80" summary="~20 problems — graph and tree traversal, most important for Frontend (DOM tree!)">
                <Paragraph>Frontend engineers <Highlight>must be good at BFS/DFS</Highlight> because the DOM is a tree! Flatten DOM, find element, traverse components.</Paragraph>
                <div className="my-3 space-y-1.5">
                    <div className="text-green-400 font-bold text-sm mb-2">📋 LeetCode Problems:</div>
                    {[
                        ['Easy', ['104. Maximum Depth of Binary Tree', '226. Invert Binary Tree', '100. Same Tree', '572. Subtree of Another Tree', '617. Merge Two Binary Trees']],
                        ['Medium', ['102. Binary Tree Level Order Traversal', '200. Number of Islands', '133. Clone Graph', '207. Course Schedule', '547. Number of Provinces', '994. Rotting Oranges']],
                        ['Hard', ['124. Binary Tree Maximum Path Sum', '297. Serialize and Deserialize Binary Tree']],
                    ].map(([level, problems]) => (
                        <div key={level as string} className="p-2.5 rounded-lg bg-slate-800/40 border border-white/5">
                            <div className={`text-xs font-bold mb-1 ${level === 'Easy' ? 'text-green-400' : level === 'Medium' ? 'text-yellow-400' : 'text-red-400'}`}>{level as string}</div>
                            <div className="text-slate-300 text-xs space-y-0.5">{(problems as string[]).map(p => <div key={p}>• <a href={`https://leetcode.com/problems/${toLeetCodeSlug(p as string)}/`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{p as string}</a></div>)}</div>
                        </div>
                    ))}
                </div>
                <Callout type="tip"><strong>BFS</strong> = use Queue (level order, shortest path). <strong>DFS</strong> = use Stack/Recursion (explore deep, backtrack). FE interviews prefer DFS as it relates to DOM traversal.</Callout>
            </TopicModal>

            <TopicModal title="Binary Search" emoji="🔍" color="#4ade80" summary="~10 problems — O(log n) search, not just on sorted arrays">
                <Paragraph>Binary search isn&apos;t just finding an element — it&apos;s also used for <Highlight>search space reduction</Highlight> on any monotonic function.</Paragraph>
                <div className="my-3 space-y-1.5">
                    <div className="text-green-400 font-bold text-sm mb-2">📋 LeetCode Problems:</div>
                    {[
                        ['Easy', ['704. Binary Search', '35. Search Insert Position', '278. First Bad Version']],
                        ['Medium', ['33. Search in Rotated Sorted Array', '153. Find Minimum in Rotated Sorted Array', '74. Search a 2D Matrix', '875. Koko Eating Bananas', '34. Find First and Last Position of Element in Sorted Array']],
                    ].map(([level, problems]) => (
                        <div key={level as string} className="p-2.5 rounded-lg bg-slate-800/40 border border-white/5">
                            <div className={`text-xs font-bold mb-1 ${level === 'Easy' ? 'text-green-400' : 'text-yellow-400'}`}>{level as string}</div>
                            <div className="text-slate-300 text-xs space-y-0.5">{(problems as string[]).map(p => <div key={p}>• <a href={`https://leetcode.com/problems/${toLeetCodeSlug(p as string)}/`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{p as string}</a></div>)}</div>
                        </div>
                    ))}
                </div>
            </TopicModal>

            <TopicModal title="Dynamic Programming" emoji="📊" color="#4ade80" summary="~15 Easy-Medium problems — hardest part but has clear patterns">
                <Paragraph>DP = break a problem into <Highlight>subproblems</Highlight>, store results to avoid recalculation. Frontend rarely encounters Hard DP.</Paragraph>
                <div className="my-3 space-y-1.5">
                    <div className="text-green-400 font-bold text-sm mb-2">📋 Suggested LeetCode Problems:</div>
                    {[
                        ['Easy', ['70. Climbing Stairs', '746. Min Cost Climbing Stairs', '338. Counting Bits', '121. Best Time to Buy and Sell Stock']],
                        ['Medium', ['198. House Robber', '322. Coin Change', '300. Longest Increasing Subsequence', '152. Maximum Product Subarray', '62. Unique Paths', '139. Word Break', '5. Longest Palindromic Substring']],
                    ].map(([level, problems]) => (
                        <div key={level as string} className="p-2.5 rounded-lg bg-slate-800/40 border border-white/5">
                            <div className={`text-xs font-bold mb-1 ${level === 'Easy' ? 'text-green-400' : 'text-yellow-400'}`}>{level as string}</div>
                            <div className="text-slate-300 text-xs space-y-0.5">{(problems as string[]).map(p => <div key={p}>• <a href={`https://leetcode.com/problems/${toLeetCodeSlug(p as string)}/`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{p as string}</a></div>)}</div>
                        </div>
                    ))}
                </div>
                <Callout type="tip">Approach: 1) Identify the state, 2) Write the recurrence relation, 3) Bottom-up or top-down + memo. Start with <strong>1D DP</strong> first.</Callout>
            </TopicModal>

            <TopicModal title="Backtracking" emoji="🔙" color="#4ade80" summary="~10 problems — generate all combinations, permutations, subsets">
                <Paragraph>Pattern: try each option → if invalid, <Highlight>go back (backtrack)</Highlight> → try the next option.</Paragraph>
                <div className="my-3 space-y-1.5">
                    <div className="text-green-400 font-bold text-sm mb-2">📋 LeetCode Problems:</div>
                    {[
                        ['Medium', ['78. Subsets', '46. Permutations', '39. Combination Sum', '77. Combinations', '22. Generate Parentheses', '79. Word Search', '17. Letter Combinations of a Phone Number']],
                        ['Hard', ['51. N-Queens', '37. Sudoku Solver']],
                    ].map(([level, problems]) => (
                        <div key={level as string} className="p-2.5 rounded-lg bg-slate-800/40 border border-white/5">
                            <div className={`text-xs font-bold mb-1 ${level === 'Medium' ? 'text-yellow-400' : 'text-red-400'}`}>{level as string}</div>
                            <div className="text-slate-300 text-xs space-y-0.5">{(problems as string[]).map(p => <div key={p}>• <a href={`https://leetcode.com/problems/${toLeetCodeSlug(p as string)}/`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{p as string}</a></div>)}</div>
                        </div>
                    ))}
                </div>
                <Callout type="tip">Template: <InlineCode>{`function backtrack(path, choices) { if (done) result.push([...path]); for (choice of choices) { path.push(choice); backtrack(...); path.pop(); } }`}</InlineCode></Callout>
            </TopicModal>

            <TopicModal title="Stack-based" emoji="📚" color="#4ade80" summary="~10 problems — monotonic stack, valid parentheses, expression eval">
                <Paragraph>Stack = <Highlight>LIFO</Highlight>. Very useful for: matching brackets, next greater element, expression parsing.</Paragraph>
                <div className="my-3 space-y-1.5">
                    <div className="text-green-400 font-bold text-sm mb-2">📋 LeetCode Problems:</div>
                    {[
                        ['Easy', ['20. Valid Parentheses', '155. Min Stack', '232. Implement Queue using Stacks', '844. Backspace String Compare']],
                        ['Medium', ['150. Evaluate Reverse Polish Notation', '739. Daily Temperatures', '394. Decode String', '735. Asteroid Collision', '853. Car Fleet']],
                        ['Hard', ['84. Largest Rectangle in Histogram']],
                    ].map(([level, problems]) => (
                        <div key={level as string} className="p-2.5 rounded-lg bg-slate-800/40 border border-white/5">
                            <div className={`text-xs font-bold mb-1 ${level === 'Easy' ? 'text-green-400' : level === 'Medium' ? 'text-yellow-400' : 'text-red-400'}`}>{level as string}</div>
                            <div className="text-slate-300 text-xs space-y-0.5">{(problems as string[]).map(p => <div key={p}>• <a href={`https://leetcode.com/problems/${toLeetCodeSlug(p as string)}/`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{p as string}</a></div>)}</div>
                        </div>
                    ))}
                </div>
                <Callout type="tip"><strong>Monotonic Stack</strong>: keep the stack always increasing/decreasing. Trick: when pushing a new element smaller/larger than top → pop and process. Classic for &quot;Next Greater Element&quot;.</Callout>
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

        <div className="my-6 p-4 rounded-xl bg-slate-800/50 border border-white/10">
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
            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5">
                <span className="text-purple-400">📕</span>
                <span className="text-slate-300 text-sm"><strong>GreatFrontEnd</strong> — excellent System Design section</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5">
                <span className="text-purple-400">📗</span>
                <span className="text-slate-300 text-sm"><strong>frontendmastery.com</strong> — deep-dive articles on FE architecture</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5">
                <span className="text-purple-400">📘</span>
                <span className="text-slate-300 text-sm"><strong>YouTube: &quot;Frontend System Design&quot;</strong> — channels: Chirag Goel, Evgeniy</span>
            </div>
        </div>

        {/* ===== PHASE 6 ===== */}
        <Heading2>Phase 6 — Mock Interview & Behavioral (2-4 weeks)</Heading2>

        <Heading3>6.1 Mock Interview</Heading3>
        <div className="my-4 space-y-2">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5">
                <span className="text-pink-400">🎤</span>
                <span className="text-slate-300 text-sm"><strong>Pramp.com</strong> — free mock interviews with real people</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5">
                <span className="text-pink-400">🎤</span>
                <span className="text-slate-300 text-sm"><strong>interviewing.io</strong> — anonymous mock interviews with big tech engineers</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5">
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
                <div className="text-slate-400 text-xs">Situation</div>
            </div>
            <div className="rounded-xl bg-purple-500/10 border border-purple-500/20 p-3 text-center">
                <div className="text-purple-400 font-bold text-lg">T</div>
                <div className="text-slate-400 text-xs">Task</div>
            </div>
            <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-3 text-center">
                <div className="text-green-400 font-bold text-lg">A</div>
                <div className="text-slate-400 text-xs">Action</div>
            </div>
            <div className="rounded-xl bg-yellow-500/10 border border-yellow-500/20 p-3 text-center">
                <div className="text-yellow-400 font-bold text-lg">R</div>
                <div className="text-slate-400 text-xs">Result</div>
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
                    <tr className="border-b border-white/10">
                        <th className="text-left p-3 text-slate-400 font-medium">Month</th>
                        <th className="text-left p-3 text-slate-400 font-medium">Phase</th>
                        <th className="text-left p-3 text-slate-400 font-medium">Focus</th>
                        <th className="text-left p-3 text-slate-400 font-medium">Output</th>
                    </tr>
                </thead>
                <tbody className="text-slate-300">
                    <tr className="border-b border-white/5">
                        <td className="p-3 text-red-400 font-bold">1-2</td>
                        <td className="p-3">CS + JS Core</td>
                        <td className="p-3">Networking, JS engine, closures</td>
                        <td className="p-3">Implement 10 JS utilities</td>
                    </tr>
                    <tr className="border-b border-white/5">
                        <td className="p-3 text-blue-400 font-bold">3-4</td>
                        <td className="p-3">React + FE</td>
                        <td className="p-3">Hooks, patterns, CSS, perf</td>
                        <td className="p-3">Build 3 pure UI components</td>
                    </tr>
                    <tr className="border-b border-white/5">
                        <td className="p-3 text-green-400 font-bold">4-6</td>
                        <td className="p-3">DSA</td>
                        <td className="p-3">LeetCode Easy → Medium</td>
                        <td className="p-3">150 problems, 30 min each</td>
                    </tr>
                    <tr className="border-b border-white/5">
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
            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5">
                <span className="text-red-400 mt-0.5">1.</span>
                <span className="text-slate-300"><Highlight>CS Fundamentals</Highlight> — don&apos;t skip this, it&apos;s what separates junior from senior</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5">
                <span className="text-yellow-400 mt-0.5">2.</span>
                <span className="text-slate-300"><Highlight>Deep JS</Highlight> — understand the internals, not just syntax. Implement from scratch</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5">
                <span className="text-blue-400 mt-0.5">3.</span>
                <span className="text-slate-300"><Highlight>React + FE</Highlight> — build pure UI, understand rendering, performance</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5">
                <span className="text-green-400 mt-0.5">4.</span>
                <span className="text-slate-300"><Highlight>DSA</Highlight> — 150 LeetCode problems, focus on patterns not quantity</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5">
                <span className="text-purple-400 mt-0.5">5.</span>
                <span className="text-slate-300"><Highlight>System Design</Highlight> — design FE architecture, not just draw diagrams</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5">
                <span className="text-pink-400 mt-0.5">6.</span>
                <span className="text-slate-300"><Highlight>Mock + Behavioral</Highlight> — practice speaking out loud, prepare STAR stories</span>
            </div>
        </div>

        <Callout type="tip">
            Remember: <Highlight>Consistency &gt; Intensity</Highlight>. Studying 2-3 hours daily consistently is better than
            cramming 10 hours on weekends then taking a week off. Make learning a daily habit!
        </Callout>
    </>
)
