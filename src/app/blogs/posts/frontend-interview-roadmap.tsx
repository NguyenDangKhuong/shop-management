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

        <div className="my-6 p-4 rounded-xl bg-gray-100 dark:bg-slate-800/50 border border-gray-200 dark:border-white/10">
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
                        <div className="text-slate-300 text-sm mt-1">File <InlineCode>app.js</InlineCode> được đọc từ ổ cứng vào RAM. RAM nhanh hơn SSD ~100 lần nhưng mất data khi tắt máy.</div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">2. RAM → CPU</div>
                        <div className="text-slate-300 text-sm mt-1">CPU đọc instructions từ RAM, xử lý từng lệnh (fetch → decode → execute). CPU cache (L1/L2/L3) giúp tăng tốc truy cập dữ liệu hay dùng.</div>
                    </div>
                    <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="text-yellow-400 font-bold text-sm">3. CPU xử lý → kết quả trả về RAM</div>
                        <div className="text-slate-300 text-sm mt-1">Kết quả tính toán lưu lại RAM. Nếu cần persist (lưu file, ghi DB), data sẽ được ghi xuống Storage.</div>
                    </div>
                </div>
                <Paragraph><strong>Tốc độ truy cập:</strong> CPU Cache (~1ns) → RAM (~100ns) → SSD (~100μs) → HDD (~10ms). Hiểu hierarchy này giúp bạn tối ưu performance.</Paragraph>
                <Callout type="tip">📚 Tài liệu: <strong>CS50 (Harvard)</strong> — Tuần 0-2. Free trên YouTube, có phụ đề tiếng Việt.</Callout>
            </TopicModal>

            <TopicModal title="Binary, ASCII, Unicode" emoji="🔢" color="#ef4444" summary="Cách máy tính biểu diễn chữ, số, emoji — mọi thứ đều là 0 và 1">
                <Paragraph>Máy tính chỉ hiểu <Highlight>0 và 1</Highlight> (bit). Mọi data đều được encode thành binary.</Paragraph>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <div className="text-red-400 font-bold text-sm">Binary (Hệ nhị phân)</div>
                        <div className="text-slate-300 text-sm mt-1">Số 42 = <InlineCode>00101010</InlineCode> (8 bits = 1 byte)<br />1 byte = 256 giá trị (0-255)<br />4 bytes = 32 bits = ~4 tỷ giá trị</div>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">ASCII (128 ký tự)</div>
                        <div className="text-slate-300 text-sm mt-1">A=65, B=66, a=97, 0=48<br />Chỉ hỗ trợ tiếng Anh + ký tự cơ bản<br />1 ký tự = 1 byte</div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">Unicode & UTF-8</div>
                        <div className="text-slate-300 text-sm mt-1">Hỗ trợ <strong>mọi ngôn ngữ</strong> + emoji 🎉<br />UTF-8: 1-4 bytes/ký tự, backward compatible với ASCII<br />&quot;Việt&quot; = 4 ký tự nhưng 6 bytes (ệ = 3 bytes)</div>
                    </div>
                </div>
                <CodeBlock title="Thử trong JS">{`'A'.charCodeAt(0)          // 65 (ASCII)
String.fromCharCode(65)    // 'A'
'😀'.codePointAt(0)        // 128512 (Unicode)
new TextEncoder().encode('Việt').length // 6 bytes`}</CodeBlock>
            </TopicModal>

            <TopicModal title="Process vs Thread" emoji="⚙️" color="#ef4444" summary="Hiểu OS quản lý chương trình — tại sao Node.js single-threaded mà vẫn nhanh">
                <Paragraph>Khi bạn mở Chrome + VS Code + Terminal, OS quản lý chúng bằng <Highlight>Process</Highlight> và <Highlight>Thread</Highlight>.</Paragraph>
                <div className="my-3 overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead><tr className="border-b border-gray-200 dark:border-white/10"><th className="text-left p-2 text-slate-400">Tiêu chí</th><th className="text-left p-2 text-blue-400">Process</th><th className="text-left p-2 text-green-400">Thread</th></tr></thead>
                        <tbody className="text-gray-600 dark:text-slate-300">
                            <tr className="border-b border-gray-100 dark:border-white/5"><td className="p-2">Memory</td><td className="p-2">Riêng biệt</td><td className="p-2">Chia sẻ với process</td></tr>
                            <tr className="border-b border-gray-100 dark:border-white/5"><td className="p-2">Tạo mới</td><td className="p-2">Nặng (~MB)</td><td className="p-2">Nhẹ (~KB)</td></tr>
                            <tr className="border-b border-gray-100 dark:border-white/5"><td className="p-2">Crash</td><td className="p-2">Không ảnh hưởng process khác</td><td className="p-2">Có thể crash cả process</td></tr>
                            <tr><td className="p-2">Ví dụ</td><td className="p-2">Mỗi tab Chrome = 1 process</td><td className="p-2">JS main thread + Web Workers</td></tr>
                        </tbody>
                    </table>
                </div>
                <Paragraph><strong>Node.js</strong> là single-threaded (1 main thread cho JS) nhưng dùng <Highlight>libuv thread pool</Highlight> + OS async I/O để xử lý I/O không blocking. Đây là lý do Node nhanh cho I/O-bound tasks.</Paragraph>
                <Callout type="tip">📚 Tài liệu: <strong>Operating Systems: Three Easy Pieces</strong> — sách miễn phí, cực chất.</Callout>
            </TopicModal>
        </div>

        <Heading3>1.2 Networking cơ bản (click để xem chi tiết)</Heading3>
        <div className="my-4 space-y-2">
            <TopicModal title="HTTP/HTTPS" emoji="🌐" color="#ef4444" summary="Request/Response cycle, status codes, methods, headers — nền tảng của web">
                <Paragraph><Highlight>HTTP</Highlight> = giao thức client-server. Browser gửi <strong>Request</strong>, server trả <strong>Response</strong>.</Paragraph>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">HTTP Methods</div>
                        <div className="text-slate-300 text-sm mt-1"><InlineCode>GET</InlineCode> = đọc data | <InlineCode>POST</InlineCode> = tạo mới<br /><InlineCode>PUT</InlineCode> = update toàn bộ | <InlineCode>PATCH</InlineCode> = update 1 phần<br /><InlineCode>DELETE</InlineCode> = xóa</div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">Status Codes (phải thuộc!)</div>
                        <div className="text-slate-300 text-sm mt-1"><strong>2xx</strong>: 200 OK, 201 Created, 204 No Content<br /><strong>3xx</strong>: 301 Moved, 304 Not Modified<br /><strong>4xx</strong>: 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found<br /><strong>5xx</strong>: 500 Server Error, 502 Bad Gateway, 503 Unavailable</div>
                    </div>
                </div>
                <Paragraph><Highlight>HTTPS</Highlight> = HTTP + TLS encryption. Data được mã hóa giữa client-server. Certificate được verify bởi CA (Certificate Authority).</Paragraph>
            </TopicModal>

            <TopicModal title="DNS, TCP/IP, WebSocket" emoji="📡" color="#ef4444" summary="Cách browser tìm server và duy trì kết nối">
                <Paragraph>Khi bạn gõ <InlineCode>google.com</InlineCode>, đây là hành trình:</Paragraph>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="text-yellow-400 font-bold text-sm">1. DNS Resolution</div>
                        <div className="text-slate-300 text-sm mt-1"><InlineCode>google.com</InlineCode> → <InlineCode>142.250.80.46</InlineCode><br />Browser cache → OS cache → Router → ISP DNS → Root DNS<br />Giống như tra danh bạ: tên → số điện thoại</div>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">2. TCP 3-way Handshake</div>
                        <div className="text-slate-300 text-sm mt-1">Client: SYN → Server: SYN-ACK → Client: ACK<br />Thiết lập kết nối tin cậy trước khi gửi data<br />TCP đảm bảo data đến đúng thứ tự, không mất gói</div>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">3. WebSocket</div>
                        <div className="text-slate-300 text-sm mt-1">HTTP = request-response (1 chiều, đóng sau mỗi lần)<br />WebSocket = full-duplex (2 chiều, giữ kết nối mở)<br />Dùng cho: chat, notifications, live data, game</div>
                    </div>
                </div>
            </TopicModal>

            <TopicModal title="REST vs GraphQL" emoji="🔌" color="#ef4444" summary="Hai mô hình API phổ biến — khi nào dùng cái nào">
                <div className="my-3 overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead><tr className="border-b border-gray-200 dark:border-white/10"><th className="text-left p-2 text-slate-400">Tiêu chí</th><th className="text-left p-2 text-blue-400">REST</th><th className="text-left p-2 text-purple-400">GraphQL</th></tr></thead>
                        <tbody className="text-gray-600 dark:text-slate-300">
                            <tr className="border-b border-gray-100 dark:border-white/5"><td className="p-2">Kiểu</td><td className="p-2">Nhiều endpoints</td><td className="p-2">1 endpoint duy nhất</td></tr>
                            <tr className="border-b border-gray-100 dark:border-white/5"><td className="p-2">Data fetching</td><td className="p-2">Server quyết định trả gì</td><td className="p-2">Client chọn fields cần</td></tr>
                            <tr className="border-b border-gray-100 dark:border-white/5"><td className="p-2">Over-fetching</td><td className="p-2">Thường xảy ra</td><td className="p-2">Không bao giờ</td></tr>
                            <tr className="border-b border-gray-100 dark:border-white/5"><td className="p-2">Caching</td><td className="p-2">HTTP caching đơn giản</td><td className="p-2">Phức tạp hơn</td></tr>
                            <tr><td className="p-2">Dùng bởi</td><td className="p-2">Hầu hết APIs</td><td className="p-2">Facebook, GitHub, Shopify</td></tr>
                        </tbody>
                    </table>
                </div>
                <CodeBlock title="REST vs GraphQL example">{`// REST: GET /api/users/1 → trả toàn bộ user object
{ id: 1, name: "An", email: "...", address: "...", ... }

// GraphQL: POST /graphql → chỉ lấy fields cần
query { user(id: 1) { name, email } }
→ { name: "An", email: "..." } // Không thừa data!`}</CodeBlock>
            </TopicModal>

            <TopicModal title="CORS, Cookies, JWT" emoji="🔐" color="#ef4444" summary="Authentication flow — cách web apps xác thực người dùng">
                <Heading3>CORS (Cross-Origin Resource Sharing)</Heading3>
                <Paragraph>Browser chặn request từ domain A sang domain B (security). Server phải cho phép bằng header <InlineCode>Access-Control-Allow-Origin</InlineCode>.</Paragraph>
                <Heading3>Cookies vs JWT</Heading3>
                <div className="my-3 overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead><tr className="border-b border-gray-200 dark:border-white/10"><th className="text-left p-2 text-slate-400">Tiêu chí</th><th className="text-left p-2 text-blue-400">Cookie</th><th className="text-left p-2 text-green-400">JWT</th></tr></thead>
                        <tbody className="text-gray-600 dark:text-slate-300">
                            <tr className="border-b border-gray-100 dark:border-white/5"><td className="p-2">Lưu ở</td><td className="p-2">Browser (tự gửi)</td><td className="p-2">Client (localStorage/memory)</td></tr>
                            <tr className="border-b border-gray-100 dark:border-white/5"><td className="p-2">Stateful</td><td className="p-2">Server lưu session</td><td className="p-2">Stateless — token chứa data</td></tr>
                            <tr className="border-b border-gray-100 dark:border-white/5"><td className="p-2">XSS risk</td><td className="p-2">httpOnly flag bảo vệ</td><td className="p-2">Nếu ở localStorage — risk!</td></tr>
                            <tr><td className="p-2">Scale</td><td className="p-2">Cần sticky sessions</td><td className="p-2">Dễ scale (stateless)</td></tr>
                        </tbody>
                    </table>
                </div>
                <Callout type="warning">JWT trong <InlineCode>localStorage</InlineCode> dễ bị XSS. Best practice: lưu JWT trong <Highlight>httpOnly cookie</Highlight> hoặc memory.</Callout>
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
                        <thead><tr className="border-b border-gray-200 dark:border-white/10"><th className="text-left p-2 text-slate-400">Rule</th><th className="text-left p-2 text-slate-400">this =</th><th className="text-left p-2 text-slate-400">Ví dụ</th></tr></thead>
                        <tbody className="text-gray-600 dark:text-slate-300">
                            <tr className="border-b border-gray-100 dark:border-white/5"><td className="p-2 text-yellow-400">Default</td><td className="p-2">window / undefined</td><td className="p-2"><InlineCode>foo()</InlineCode></td></tr>
                            <tr className="border-b border-gray-100 dark:border-white/5"><td className="p-2 text-blue-400">Implicit</td><td className="p-2">object trước dấu .</td><td className="p-2"><InlineCode>obj.foo()</InlineCode></td></tr>
                            <tr className="border-b border-gray-100 dark:border-white/5"><td className="p-2 text-green-400">Explicit</td><td className="p-2">argument đầu</td><td className="p-2"><InlineCode>foo.call(obj)</InlineCode></td></tr>
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
                <a href="/blogs/event-loop" className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 Xem bài viết chi tiết →</a>
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
                        <thead><tr className="border-b border-gray-200 dark:border-white/10"><th className="text-left p-2 text-slate-400">Method</th><th className="text-left p-2 text-slate-400">Hành vi</th><th className="text-left p-2 text-slate-400">Khi nào dùng</th></tr></thead>
                        <tbody className="text-gray-600 dark:text-slate-300">
                            <tr className="border-b border-gray-100 dark:border-white/5"><td className="p-2"><InlineCode>Promise.all</InlineCode></td><td className="p-2">Chạy song song, <strong>reject nếu 1 fail</strong></td><td className="p-2">Fetch nhiều API cùng lúc, tất cả đều bắt buộc</td></tr>
                            <tr className="border-b border-gray-100 dark:border-white/5"><td className="p-2"><InlineCode>Promise.allSettled</InlineCode></td><td className="p-2">Chạy song song, <strong>chờ tất cả xong</strong> (kể cả fail)</td><td className="p-2">Batch operations mà vẫn muốn biết kết quả từng cái</td></tr>
                            <tr className="border-b border-gray-100 dark:border-white/5"><td className="p-2"><InlineCode>Promise.race</InlineCode></td><td className="p-2">Trả về <strong>kết quả đầu tiên</strong> (fulfill hoặc reject)</td><td className="p-2">Timeout pattern, lấy response nhanh nhất</td></tr>
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
                <a href="/blogs/callback-promise-async-await" className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 Xem bài viết chi tiết →</a>
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
                        <div key={title} className="p-2 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                            <div className="text-blue-400 text-sm font-medium">{title}</div>
                            <div className="text-gray-500 dark:text-slate-400 text-xs font-mono mt-0.5">{desc}</div>
                        </div>
                    ))}
                </div>
                <a href="/blogs/ecmascript-features" className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 Xem bài viết chi tiết →</a>
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
        </div>

        <Heading3>2.2 Implement từ scratch (click xem code mẫu)</Heading3>
        <a href="/blogs/js-common-functions" className="mb-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 Xem tổng hợp JS Common Functions →</a>
        <div className="my-4 space-y-2">
            <TopicModal title="Array.map / filter / reduce" emoji="💻" color="#fbbf24" summary="Implement lại 3 higher-order functions phổ biến nhất của Array">
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
            </TopicModal>

            <TopicModal title="Function.bind / call / apply" emoji="💻" color="#fbbf24" summary="Implement lại 3 methods thay đổi this context">
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
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-yellow-400">📕</span>
                <div className="text-slate-300 text-sm">
                    <strong>You Don&apos;t Know JS</strong> (Kyle Simpson) — đọc hết series này sẽ hiểu JS cực sâu
                </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-yellow-400">📗</span>
                <div className="text-slate-300 text-sm">
                    <strong>javascript.info</strong> — tài liệu online tốt nhất, có ví dụ + bài tập
                </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
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

        {/* ===== PHASE 3 ===== */}
        <Heading2>Phase 3 — React & Frontend Chuyên sâu (4-6 tuần)</Heading2>

        <Heading3>3.1 React (click để xem chi tiết)</Heading3>
        <div className="my-4 space-y-2">
            <TopicModal title="Virtual DOM & Reconciliation" emoji="🌳" color="#61DAFB" summary="React diff algorithm — làm sao React biết cần update gì trên DOM thật">
                <Paragraph>React không update DOM trực tiếp. Thay vào đó, nó dùng <Highlight>Virtual DOM</Highlight> — một bản copy nhẹ của DOM thật.</Paragraph>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">Quy trình</div>
                        <div className="text-slate-300 text-sm mt-1">1. State thay đổi → React tạo Virtual DOM mới<br />2. <strong>Diffing</strong>: So sánh VDOM cũ vs mới (O(n) nhờ heuristics)<br />3. <strong>Reconciliation</strong>: Chỉ update phần khác nhau lên DOM thật<br />4. Browser repaint</div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">React Fiber (React 18+)</div>
                        <div className="text-slate-300 text-sm mt-1">Fiber = kiến trúc mới cho reconciliation<br />Cho phép <strong>interrupt rendering</strong> — ưu tiên UI updates quan trọng trước<br />Hỗ trợ concurrent features: Suspense, Transitions, Streaming</div>
                    </div>
                </div>
                <Callout type="tip">Interview: Giải thích tại sao <InlineCode>key</InlineCode> prop quan trọng trong lists — nó giúp React diff algorithm xác định element nào thay đổi, thêm, hoặc xóa.</Callout>
            </TopicModal>

            <TopicModal title="Hooks deep dive" emoji="🪝" color="#61DAFB" summary="useState, useEffect, useRef, useMemo, useCallback — rules và pitfalls">
                <div className="my-3 space-y-2">
                    {[
                        ['useState', 'State cơ bản. Batch updates (React 18+). Dùng function form cho state phụ thuộc previous: setState(prev => prev + 1)'],
                        ['useEffect', 'Side effects. Dependency array quyết định khi nào chạy. Cleanup function chạy trước mỗi re-run và unmount.'],
                        ['useRef', 'Persistent reference qua renders. Thay đổi .current KHÔNG gây re-render. Dùng cho DOM ref, timers, previous value.'],
                        ['useMemo', 'Cache expensive computations. Chỉ recalculate khi dependencies thay đổi. Đừng lạm dụng — có overhead!'],
                        ['useCallback', 'Cache function reference. Quan trọng khi pass callback vào React.memo components hoặc dependency arrays.'],
                        ['useContext', 'Đọc context value. Re-render khi context value thay đổi. Cẩn thận performance — split context nếu cần.'],
                    ].map(([name, desc]) => (
                        <div key={name} className="p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                            <div className="text-blue-400 font-mono text-sm font-bold">{name}</div>
                            <div className="text-slate-300 text-sm mt-1">{desc}</div>
                        </div>
                    ))}
                </div>
                <Callout type="warning"><strong>Rules of Hooks:</strong> 1) Chỉ gọi ở top level (không trong if/for/nested function) 2) Chỉ gọi trong React components hoặc custom hooks.</Callout>
                <a href="/blogs/react-hooks-chi-tiet" className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 Xem bài viết chi tiết →</a>
            </TopicModal>

            <TopicModal title="Component Patterns" emoji="🧩" color="#61DAFB" summary="HOC, Render Props, Compound, Controlled/Uncontrolled — khi nào dùng pattern nào">
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">Higher-Order Component (HOC)</div>
                        <div className="text-slate-300 text-sm mt-1">Function nhận component → trả về component mới với thêm logic.<br />Ví dụ: <InlineCode>withAuth(Dashboard)</InlineCode> — thêm auth check.</div>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">Render Props</div>
                        <div className="text-slate-300 text-sm mt-1">Component nhận function qua prop, gọi function đó để render.<br />Linh hoạt hơn HOC nhưng có thể gây &quot;callback hell&quot;.</div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">Compound Components</div>
                        <div className="text-slate-300 text-sm mt-1">Nhóm components chia sẻ state qua Context.<br />Ví dụ: <InlineCode>{'<Select> <Select.Option /> </Select>'}</InlineCode></div>
                    </div>
                    <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="text-yellow-400 font-bold text-sm">Controlled vs Uncontrolled</div>
                        <div className="text-slate-300 text-sm mt-1"><strong>Controlled</strong>: React quản lý state (value + onChange).<br /><strong>Uncontrolled</strong>: DOM quản lý state (useRef). Dùng khi integration với non-React code.</div>
                    </div>
                </div>
                <Callout type="tip">Trend hiện tại: <Highlight>Custom Hooks</Highlight> thay thế hầu hết HOC và Render Props. Dễ đọc, dễ test, dễ compose hơn.</Callout>
            </TopicModal>

            <TopicModal title="Performance Optimization" emoji="⚡" color="#61DAFB" summary="React.memo, useMemo, useCallback, code splitting, virtualization">
                <Paragraph>React re-render toàn bộ subtree khi state thay đổi. Đây là các kỹ thuật <Highlight>ngăn re-render không cần thiết</Highlight>:</Paragraph>
                <CodeBlock title="Optimization techniques">{`// 1. React.memo — skip re-render nếu props không đổi
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
}, []) // Không re-create mỗi render

// 4. Dynamic import — code splitting
const AdminPanel = lazy(() => import('./AdminPanel'))

// 5. Virtualization — chỉ render visible items
// react-window, react-virtuoso cho danh sách 10k+ items`}</CodeBlock>
                <Callout type="warning">Đừng premature optimize! Chỉ optimize khi React DevTools Profiler chỉ ra bottleneck thật sự.</Callout>
                <a href="/blogs/react-performance" className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 Xem bài viết chi tiết →</a>
            </TopicModal>
        </div>

        <Heading3>3.2 HTML/CSS (click để xem chi tiết)</Heading3>
        <div className="my-4 space-y-2">
            <TopicModal title="Semantic HTML & Accessibility" emoji="♿" color="#38bdf8" summary="Screen readers, ARIA, landmark roles — tại sao accessibility quan trọng trong interview">
                <Paragraph><Highlight>Semantic HTML</Highlight> = dùng đúng tag cho đúng mục đích. Google, Apple đặc biệt coi trọng accessibility.</Paragraph>
                <CodeBlock title="Semantic vs Non-semantic">{`<!-- ❌ Non-semantic -->
<div class="header"><div class="nav">...</div></div>
<div class="main"><div class="article">...</div></div>
<div class="footer">...</div>

<!-- ✅ Semantic -->
<header><nav>...</nav></header>
<main><article>...</article></main>
<footer>...</footer>

<!-- ARIA khi cần -->
<button aria-label="Close dialog" aria-expanded="false">✕</button>
<div role="alert" aria-live="polite">Error message</div>`}</CodeBlock>
                <Callout type="tip">Big tech hay hỏi: &quot;Build component X accessible&quot; — phải hỗ trợ keyboard navigation, screen reader, focus management.</Callout>
            </TopicModal>

            <TopicModal title="CSS Layout — Flexbox & Grid" emoji="📐" color="#38bdf8" summary="Layout từ scratch không framework — kỹ năng interview quan trọng">
                <CodeBlock title="Flexbox cheat sheet">{`/* Flexbox — 1 chiều (row OR column) */
.container {
    display: flex;
    justify-content: space-between; /* main axis */
    align-items: center;            /* cross axis */
    flex-wrap: wrap;                /* xuống dòng */
    gap: 16px;                      /* khoảng cách */
}
.item { flex: 1 1 200px; }         /* grow shrink basis */

/* Grid — 2 chiều (row AND column) */
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
                <Callout type="tip">Interview: <strong>Flexbox</strong> cho navigation, card layouts. <strong>Grid</strong> cho page layout, dashboard. Biết cả 2 và khi nào dùng cái nào.</Callout>
            </TopicModal>

            <TopicModal title="Web Security — XSS, CSRF, CSP" emoji="🛡️" color="#38bdf8" summary="Các lỗ hổng bảo mật web phổ biến — phải biết cách phòng chống">
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <div className="text-red-400 font-bold text-sm">XSS (Cross-Site Scripting)</div>
                        <div className="text-slate-300 text-sm mt-1">Attacker inject malicious JS vào trang.<br /><strong>Phòng:</strong> React tự escape JSX. KHÔNG dùng <InlineCode>dangerouslySetInnerHTML</InlineCode>. Sanitize user input.</div>
                    </div>
                    <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="text-yellow-400 font-bold text-sm">CSRF (Cross-Site Request Forgery)</div>
                        <div className="text-slate-300 text-sm mt-1">Attacker trick user gửi request từ site khác.<br /><strong>Phòng:</strong> CSRF token, SameSite cookie, verify Origin header.</div>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">CSP (Content Security Policy)</div>
                        <div className="text-slate-300 text-sm mt-1">HTTP header chỉ định sources được phép load scripts/styles.<br /><InlineCode>{`Content-Security-Policy: script-src 'self' https://cdn.example.com`}</InlineCode></div>
                    </div>
                </div>
            </TopicModal>

            <TopicModal title="Core Web Vitals" emoji="📊" color="#38bdf8" summary="LCP, FID, CLS — Google đo performance thế nào, cách tối ưu">
                <div className="my-3 overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead><tr className="border-b border-gray-200 dark:border-white/10"><th className="text-left p-2 text-slate-400">Metric</th><th className="text-left p-2 text-slate-400">Đo gì</th><th className="text-left p-2 text-green-400">Good</th><th className="text-left p-2 text-slate-400">Cách tối ưu</th></tr></thead>
                        <tbody className="text-gray-600 dark:text-slate-300">
                            <tr className="border-b border-gray-100 dark:border-white/5"><td className="p-2 text-blue-400 font-bold">LCP</td><td className="p-2">Largest Contentful Paint</td><td className="p-2">&lt; 2.5s</td><td className="p-2">Optimize images, preload fonts, SSR</td></tr>
                            <tr className="border-b border-gray-100 dark:border-white/5"><td className="p-2 text-green-400 font-bold">INP</td><td className="p-2">Interaction to Next Paint</td><td className="p-2">&lt; 200ms</td><td className="p-2">Reduce JS, web workers, debounce</td></tr>
                            <tr><td className="p-2 text-yellow-400 font-bold">CLS</td><td className="p-2">Cumulative Layout Shift</td><td className="p-2">&lt; 0.1</td><td className="p-2">Set image dimensions, font-display</td></tr>
                        </tbody>
                    </table>
                </div>
                <Callout type="tip">Tools đo: <strong>Lighthouse</strong> (Chrome DevTools), <strong>web.dev/measure</strong>, <strong>PageSpeed Insights</strong>.</Callout>
                <a href="/blogs/core-web-vitals" className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 Xem bài viết chi tiết →</a>
            </TopicModal>
        </div>

        <Callout type="tip">
            Google, Meta rất hay hỏi: &quot;Build một component X từ scratch không dùng library&quot; —
            ví dụ: autocomplete, infinite scroll, modal, drag & drop, virtual list.
            Luyện xây UI components thuần sẽ rất có lợi.
        </Callout>

        {/* ===== PHASE 4 ===== */}
        <Heading2>Phase 4 — Data Structures & Algorithms (6-8 tuần)</Heading2>

        <Paragraph>
            Phần <Highlight>nhiều người sợ nhất</Highlight> nhưng cũng là phần <Highlight>bắt buộc</Highlight> ở big tech.
            Frontend cũng phải code DSA — nhưng mức độ thường dễ hơn backend 1 bậc.
        </Paragraph>

        <Heading3>4.1 Data Structures (phải thành thạo)</Heading3>
        <div className="my-4 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
                <thead>
                    <tr className="border-b border-gray-200 dark:border-white/10">
                        <th className="text-left p-3 text-gray-500 dark:text-slate-400 font-medium">Data Structure</th>
                        <th className="text-left p-3 text-gray-500 dark:text-slate-400 font-medium">Mức độ</th>
                        <th className="text-left p-3 text-gray-500 dark:text-slate-400 font-medium">Khi nào dùng</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-slate-300">
                    <tr className="border-b border-gray-100 dark:border-white/5">
                        <td className="p-3 font-semibold text-green-400">Array / String</td>
                        <td className="p-3">⭐ Bắt buộc</td>
                        <td className="p-3">Two pointers, sliding window</td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-white/5">
                        <td className="p-3 font-semibold text-green-400">HashMap / HashSet</td>
                        <td className="p-3">⭐ Bắt buộc</td>
                        <td className="p-3">Frequency count, cache, lookup</td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-white/5">
                        <td className="p-3 font-semibold text-green-400">Stack / Queue</td>
                        <td className="p-3">⭐ Bắt buộc</td>
                        <td className="p-3">Valid parentheses, BFS</td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-white/5">
                        <td className="p-3 font-semibold text-blue-400">Linked List</td>
                        <td className="p-3">⭐⭐ Quan trọng</td>
                        <td className="p-3">Reverse, cycle detect, merge</td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-white/5">
                        <td className="p-3 font-semibold text-blue-400">Tree / Binary Tree</td>
                        <td className="p-3">⭐⭐ Quan trọng</td>
                        <td className="p-3">DFS, BFS, DOM tree!</td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-white/5">
                        <td className="p-3 font-semibold text-blue-400">Graph</td>
                        <td className="p-3">⭐⭐ Quan trọng</td>
                        <td className="p-3">BFS/DFS, dependency resolution</td>
                    </tr>
                    <tr>
                        <td className="p-3 font-semibold text-purple-400">Heap / Trie</td>
                        <td className="p-3">⭐⭐⭐ Nâng cao</td>
                        <td className="p-3">Top K, autocomplete</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <Heading3>4.2 Patterns cần luyện (click xem bài LeetCode gợi ý)</Heading3>
        <div className="my-4 space-y-2">
            <TopicModal title="Hash Map / Hash Set" emoji="🗂️" color="#4ade80" summary="~15 bài — pattern dùng nhiều nhất, gần như mọi interview đều có">
                <Paragraph>Dùng khi: cần <Highlight>lookup O(1)</Highlight>, đếm frequency, tìm pair/complement, loại bỏ duplicates, hoặc group theo key.</Paragraph>
                <div className="my-3 space-y-1.5">
                    <div className="text-green-400 font-bold text-sm mb-2">📋 Bài LeetCode:</div>
                    {[
                        ['Easy', ['1. Two Sum', '217. Contains Duplicate', '242. Valid Anagram', '383. Ransom Note', '349. Intersection of Two Arrays']],
                        ['Medium', ['49. Group Anagrams', '347. Top K Frequent Elements', '128. Longest Consecutive Sequence', '560. Subarray Sum Equals K', '36. Valid Sudoku', '438. Find All Anagrams in a String']],
                    ].map(([level, problems]) => (
                        <div key={level as string} className="p-2.5 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                            <div className={`text-xs font-bold mb-1 ${level === 'Easy' ? 'text-green-400' : 'text-yellow-400'}`}>{level as string}</div>
                            <div className="text-slate-300 text-xs space-y-0.5">{(problems as string[]).map(p => <div key={p}>• <a href={`https://leetcode.com/problems/${toLeetCodeSlug(p as string)}/`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{p as string}</a></div>)}</div>
                        </div>
                    ))}
                </div>
                <Callout type="tip">Khi thấy bài yêu cầu &quot;tìm trong O(n)&quot; hoặc &quot;count frequency&quot; → nghĩ ngay HashMap. Đây là pattern <Highlight>nền tảng nhất</Highlight> — hầu hết patterns khác đều kết hợp với HashMap.</Callout>
                <a href="/blogs/hash-map-pattern" className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 Xem bài viết chi tiết →</a>
            </TopicModal>

            <TopicModal title="Two Pointers" emoji="👉👈" color="#4ade80" summary="~15 bài — dùng 2 con trỏ di chuyển trên sorted array hoặc linked list">
                <Paragraph>Dùng khi: array đã <Highlight>sorted</Highlight>, tìm pair/triplet thỏa điều kiện, hoặc loại bỏ duplicates.</Paragraph>
                <div className="my-3 space-y-1.5">
                    <div className="text-green-400 font-bold text-sm mb-2">📋 Bài LeetCode:</div>
                    {[
                        ['Easy', ['167. Two Sum II - Input Array Is Sorted', '26. Remove Duplicates from Sorted Array', '283. Move Zeroes', '344. Reverse String', '977. Squares of a Sorted Array']],
                        ['Medium', ['15. 3Sum', '11. Container With Most Water', '75. Sort Colors', '142. Linked List Cycle II', '238. Product of Array Except Self']],
                    ].map(([level, problems]) => (
                        <div key={level as string} className="p-2.5 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                            <div className={`text-xs font-bold mb-1 ${level === 'Easy' ? 'text-green-400' : 'text-yellow-400'}`}>{level as string}</div>
                            <div className="text-slate-300 text-xs space-y-0.5">{(problems as string[]).map(p => <div key={p}>• <a href={`https://leetcode.com/problems/${toLeetCodeSlug(p as string)}/`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{p as string}</a></div>)}</div>
                        </div>
                    ))}
                </div>
                <Callout type="tip">Template: left = 0, right = length-1, di chuyển dựa trên condition. Luôn nghĩ: &quot;Phần tử nào tôi có thể loại bỏ?&quot;</Callout>
                <a href="/blogs/two-pointers-pattern" className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 Xem bài viết chi tiết →</a>
            </TopicModal>

            <TopicModal title="Sliding Window" emoji="🪟" color="#4ade80" summary="~10 bài — tìm substring/subarray tối ưu với fixed hoặc variable window">
                <Paragraph>Dùng khi: tìm <Highlight>contiguous subarray/substring</Highlight> thỏa điều kiện (max sum, min length, contains all chars).</Paragraph>
                <div className="my-3 space-y-1.5">
                    <div className="text-green-400 font-bold text-sm mb-2">📋 Bài LeetCode:</div>
                    {[
                        ['Easy', ['643. Maximum Average Subarray I', '219. Contains Duplicate II']],
                        ['Medium', ['3. Longest Substring Without Repeating Characters', '424. Longest Repeating Character Replacement', '567. Permutation in String', '209. Minimum Size Subarray Sum', '438. Find All Anagrams in a String']],
                        ['Hard', ['76. Minimum Window Substring', '239. Sliding Window Maximum']],
                    ].map(([level, problems]) => (
                        <div key={level as string} className="p-2.5 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                            <div className={`text-xs font-bold mb-1 ${level === 'Easy' ? 'text-green-400' : level === 'Medium' ? 'text-yellow-400' : 'text-red-400'}`}>{level as string}</div>
                            <div className="text-slate-300 text-xs space-y-0.5">{(problems as string[]).map(p => <div key={p}>• <a href={`https://leetcode.com/problems/${toLeetCodeSlug(p as string)}/`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{p as string}</a></div>)}</div>
                        </div>
                    ))}
                </div>
                <Callout type="tip">Template: expand right pointer, khi window invalid thì shrink left. Dùng HashMap để track frequency.</Callout>
                <a href="/blogs/sliding-window-pattern" className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 Xem bài viết chi tiết →</a>
            </TopicModal>

            <TopicModal title="BFS / DFS" emoji="🌲" color="#4ade80" summary="~20 bài — duyệt đồ thị và cây, quan trọng nhất cho Frontend (DOM tree!)">
                <Paragraph>Frontend engineer <Highlight>phải giỏi BFS/DFS</Highlight> vì DOM là tree! Flatten DOM, find element, traverse components.</Paragraph>
                <div className="my-3 space-y-1.5">
                    <div className="text-green-400 font-bold text-sm mb-2">📋 Bài LeetCode:</div>
                    {[
                        ['Easy', ['104. Maximum Depth of Binary Tree', '226. Invert Binary Tree', '100. Same Tree', '572. Subtree of Another Tree', '617. Merge Two Binary Trees']],
                        ['Medium', ['102. Binary Tree Level Order Traversal', '200. Number of Islands', '133. Clone Graph', '207. Course Schedule', '547. Number of Provinces', '994. Rotting Oranges']],
                        ['Hard', ['124. Binary Tree Maximum Path Sum', '297. Serialize and Deserialize Binary Tree']],
                    ].map(([level, problems]) => (
                        <div key={level as string} className="p-2.5 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                            <div className={`text-xs font-bold mb-1 ${level === 'Easy' ? 'text-green-400' : level === 'Medium' ? 'text-yellow-400' : 'text-red-400'}`}>{level as string}</div>
                            <div className="text-slate-300 text-xs space-y-0.5">{(problems as string[]).map(p => <div key={p}>• <a href={`https://leetcode.com/problems/${toLeetCodeSlug(p as string)}/`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{p as string}</a></div>)}</div>
                        </div>
                    ))}
                </div>
                <Callout type="tip"><strong>BFS</strong> = dùng Queue (level order, shortest path). <strong>DFS</strong> = dùng Stack/Recursion (explore deep, backtrack). FE interview thích DFS hơn vì liên quan DOM traversal.</Callout>
                <a href="/blogs/bfs-dfs-pattern" className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 Xem bài viết chi tiết →</a>
            </TopicModal>

            <TopicModal title="Binary Search" emoji="🔍" color="#4ade80" summary="~10 bài — O(log n) search, không chỉ trên sorted array">
                <Paragraph>Binary search không chỉ tìm element — còn dùng cho <Highlight>search space reduction</Highlight> trên bất kỳ monotonic function nào.</Paragraph>
                <div className="my-3 space-y-1.5">
                    <div className="text-green-400 font-bold text-sm mb-2">📋 Bài LeetCode:</div>
                    {[
                        ['Easy', ['704. Binary Search', '35. Search Insert Position', '278. First Bad Version']],
                        ['Medium', ['33. Search in Rotated Sorted Array', '153. Find Minimum in Rotated Sorted Array', '74. Search a 2D Matrix', '875. Koko Eating Bananas', '34. Find First and Last Position of Element in Sorted Array']],
                    ].map(([level, problems]) => (
                        <div key={level as string} className="p-2.5 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                            <div className={`text-xs font-bold mb-1 ${level === 'Easy' ? 'text-green-400' : 'text-yellow-400'}`}>{level as string}</div>
                            <div className="text-slate-300 text-xs space-y-0.5">{(problems as string[]).map(p => <div key={p}>• <a href={`https://leetcode.com/problems/${toLeetCodeSlug(p as string)}/`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{p as string}</a></div>)}</div>
                        </div>
                    ))}
                </div>
                <a href="/blogs/binary-search-pattern" className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 Xem bài viết chi tiết →</a>
            </TopicModal>

            <TopicModal title="Dynamic Programming" emoji="📊" color="#4ade80" summary="~15 bài Easy-Medium — phần khó nhất nhưng có pattern rõ ràng">
                <Paragraph>DP = chia bài toán thành <Highlight>subproblems</Highlight>, lưu kết quả tránh tính lại. Frontend ít gặp Hard DP.</Paragraph>
                <div className="my-3 space-y-1.5">
                    <div className="text-green-400 font-bold text-sm mb-2">📋 Bài LeetCode gợi ý:</div>
                    {[
                        ['Easy', ['70. Climbing Stairs', '746. Min Cost Climbing Stairs', '338. Counting Bits', '121. Best Time to Buy and Sell Stock']],
                        ['Medium', ['198. House Robber', '322. Coin Change', '300. Longest Increasing Subsequence', '152. Maximum Product Subarray', '62. Unique Paths', '139. Word Break', '5. Longest Palindromic Substring']],
                    ].map(([level, problems]) => (
                        <div key={level as string} className="p-2.5 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                            <div className={`text-xs font-bold mb-1 ${level === 'Easy' ? 'text-green-400' : 'text-yellow-400'}`}>{level as string}</div>
                            <div className="text-slate-300 text-xs space-y-0.5">{(problems as string[]).map(p => <div key={p}>• <a href={`https://leetcode.com/problems/${toLeetCodeSlug(p as string)}/`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{p as string}</a></div>)}</div>
                        </div>
                    ))}
                </div>
                <Callout type="tip">Cách tiếp cận: 1) Xác định state, 2) Viết recurrence relation, 3) Bottom-up hoặc top-down + memo. Bắt đầu từ <strong>1D DP</strong> trước.</Callout>
                <a href="/blogs/dynamic-programming-pattern" className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 Xem bài viết chi tiết →</a>
            </TopicModal>

            <TopicModal title="Backtracking" emoji="🔙" color="#4ade80" summary="~10 bài — generate all combinations, permutations, subsets">
                <Paragraph>Pattern: thử từng option → nếu không hợp lệ thì <Highlight>quay lại (backtrack)</Highlight> → thử option tiếp.</Paragraph>
                <div className="my-3 space-y-1.5">
                    <div className="text-green-400 font-bold text-sm mb-2">📋 Bài LeetCode:</div>
                    {[
                        ['Medium', ['78. Subsets', '46. Permutations', '39. Combination Sum', '77. Combinations', '22. Generate Parentheses', '79. Word Search', '17. Letter Combinations of a Phone Number']],
                        ['Hard', ['51. N-Queens', '37. Sudoku Solver']],
                    ].map(([level, problems]) => (
                        <div key={level as string} className="p-2.5 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                            <div className={`text-xs font-bold mb-1 ${level === 'Medium' ? 'text-yellow-400' : 'text-red-400'}`}>{level as string}</div>
                            <div className="text-slate-300 text-xs space-y-0.5">{(problems as string[]).map(p => <div key={p}>• <a href={`https://leetcode.com/problems/${toLeetCodeSlug(p as string)}/`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{p as string}</a></div>)}</div>
                        </div>
                    ))}
                </div>
                <Callout type="tip">Template: <InlineCode>{`function backtrack(path, choices) { if (done) result.push([...path]); for (choice of choices) { path.push(choice); backtrack(...); path.pop(); } }`}</InlineCode></Callout>
            </TopicModal>

            <TopicModal title="Stack-based" emoji="📚" color="#4ade80" summary="~10 bài — monotonic stack, valid parentheses, expression eval">
                <Paragraph>Stack = <Highlight>LIFO</Highlight>. Rất hữu ích cho: matching brackets, next greater element, expression parsing.</Paragraph>
                <div className="my-3 space-y-1.5">
                    <div className="text-green-400 font-bold text-sm mb-2">📋 Bài LeetCode:</div>
                    {[
                        ['Easy', ['20. Valid Parentheses', '155. Min Stack', '232. Implement Queue using Stacks', '844. Backspace String Compare']],
                        ['Medium', ['150. Evaluate Reverse Polish Notation', '739. Daily Temperatures', '394. Decode String', '735. Asteroid Collision', '853. Car Fleet']],
                        ['Hard', ['84. Largest Rectangle in Histogram']],
                    ].map(([level, problems]) => (
                        <div key={level as string} className="p-2.5 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                            <div className={`text-xs font-bold mb-1 ${level === 'Easy' ? 'text-green-400' : level === 'Medium' ? 'text-yellow-400' : 'text-red-400'}`}>{level as string}</div>
                            <div className="text-slate-300 text-xs space-y-0.5">{(problems as string[]).map(p => <div key={p}>• <a href={`https://leetcode.com/problems/${toLeetCodeSlug(p as string)}/`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{p as string}</a></div>)}</div>
                        </div>
                    ))}
                </div>
                <Callout type="tip"><strong>Monotonic Stack</strong>: giữ stack luôn tăng/giảm. Trick: khi push element mới mà nhỏ/lớn hơn top → pop và xử lý. Classic cho &quot;Next Greater Element&quot;.</Callout>
                <a href="/blogs/stack-pattern" className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 Xem bài viết chi tiết →</a>
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
                        <div className="text-purple-400 font-bold text-sm">Component Architecture</div>
                        <div className="text-slate-300 text-sm mt-1"><InlineCode>{'<Feed> → <FeedItem> → <PostContent>, <ActionBar>, <CommentSection>'}</InlineCode><br />Mỗi FeedItem là unit render riêng biệt → dễ virtualize.</div>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">Key Techniques</div>
                        <div className="text-slate-300 text-sm mt-1">• <strong>Infinite Scroll</strong>: IntersectionObserver + cursor-based pagination<br />• <strong>Virtualization</strong>: Chỉ render ~20 items visible, unmount items ngoài viewport<br />• <strong>Optimistic Update</strong>: UI update ngay → gửi API → rollback nếu fail<br />• <strong>Cache</strong>: Normalize data store (by ID), stale-while-revalidate</div>
                    </div>
                </div>
                <Callout type="tip">Luôn nhắc tới <Highlight>accessibility</Highlight>: keyboard navigation qua posts, screen reader cho action buttons, focus management khi load thêm.</Callout>
            </TopicModal>

            <TopicModal title="Design Autocomplete / Typeahead" emoji="🔍" color="#a855f7" summary="Debounce, caching, keyboard navigation — tối ưu UX cho search">
                <Paragraph>Google Search, GitHub Code Search — chức năng tưởng đơn giản nhưng cực kỳ complex.</Paragraph>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">Data Flow</div>
                        <div className="text-slate-300 text-sm mt-1">1. User type → <strong>debounce 300ms</strong> → API call<br />2. Check <strong>cache</strong> trước (LRU cache by query prefix)<br />3. Hiển thị results dropdown, <strong>highlight matching text</strong><br />4. Keyboard: ↑↓ navigate, Enter select, Esc close</div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">Edge Cases phải handle</div>
                        <div className="text-slate-300 text-sm mt-1">• Race condition: user type nhanh → cancel previous requests (AbortController)<br />• Empty state, loading state, error state<br />• Click outside to close, focus trap<br />• Mobile: virtual keyboard pushes content</div>
                    </div>
                </div>
            </TopicModal>

            <TopicModal title="Design a Chat Application" emoji="💬" color="#a855f7" summary="WebSocket, offline support, presence, message ordering">
                <Paragraph>Design Messenger/Slack — real-time communication system.</Paragraph>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">Architecture</div>
                        <div className="text-slate-300 text-sm mt-1">• <strong>WebSocket</strong> cho real-time messages (fallback: long polling, SSE)<br />• <strong>Message store</strong>: Normalize by conversationId → messageIds<br />• <strong>Pagination</strong>: Load 50 messages gần nhất, scroll up = load thêm<br />• <strong>Optimistic send</strong>: Hiển thị ngay với status pending → sent → delivered → read</div>
                    </div>
                    <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="text-yellow-400 font-bold text-sm">Offline Support</div>
                        <div className="text-slate-300 text-sm mt-1">• Queue messages locally khi offline (IndexedDB)<br />• Sync khi reconnect, resolve conflicts by timestamp<br />• Presence indicators: online/offline/typing via WebSocket heartbeats</div>
                    </div>
                </div>
            </TopicModal>

            <TopicModal title="Design Google Docs (Collaborative Editor)" emoji="📝" color="#a855f7" summary="CRDT/OT, conflict resolution, cursor sync — bài khó nhất">
                <Paragraph>Đây là bài <Highlight>level Hard</Highlight> — nhiều người chặn ở đây vì không hiểu CRDT/OT.</Paragraph>
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <div className="text-red-400 font-bold text-sm">OT vs CRDT</div>
                        <div className="text-slate-300 text-sm mt-1"><strong>OT (Operational Transform)</strong>: Transform operations to handle conflicts. Google Docs dùng.<br /><strong>CRDT (Conflict-free Replicated Data Type)</strong>: Data structure tự merge. Figma, Notion dùng.<br />CRDT dễ implement hơn, không cần central server.</div>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">Key Components</div>
                        <div className="text-slate-300 text-sm mt-1">• Rich text editor (Slate.js, ProseMirror, Tiptap)<br />• Cursor awareness: hiển thị cursor + tên collaborators<br />• Version history: snapshot + diff<br />• Permissions: read/write/comment per user</div>
                    </div>
                </div>
                <Callout type="tip">Không cần implement CRDT/OT full — chỉ cần <Highlight>giải thích concept</Highlight> và trade-offs là đủ ghi điểm.</Callout>
            </TopicModal>
        </div>

        <Heading3>5.2 Framework trả lời</Heading3>

        <div className="my-6 p-4 rounded-xl bg-gray-100 dark:bg-slate-800/50 border border-gray-200 dark:border-white/10">
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
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-purple-400">📕</span>
                <span className="text-slate-300 text-sm"><strong>GreatFrontEnd</strong> — phần System Design rất chất lượng</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-purple-400">📗</span>
                <span className="text-slate-300 text-sm"><strong>frontendmastery.com</strong> — bài viết deep-dive về FE architecture</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-purple-400">📘</span>
                <span className="text-slate-300 text-sm"><strong>YouTube: &quot;Frontend System Design&quot;</strong> — kênh Chirag Goel, Evgeniy</span>
            </div>
        </div>

        {/* ===== PHASE 6 ===== */}
        <Heading2>Phase 6 — Mock Interview & Behavioral (2-4 tuần)</Heading2>

        <Heading3>6.1 Mock Interview</Heading3>
        <div className="my-4 space-y-2">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-pink-400">🎤</span>
                <span className="text-slate-300 text-sm"><strong>Pramp.com</strong> — mock interview miễn phí với người thật</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-pink-400">🎤</span>
                <span className="text-slate-300 text-sm"><strong>interviewing.io</strong> — anonymous mock interview với engineers từ big tech</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
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
                <div className="text-gray-500 dark:text-slate-400 text-xs">Situation</div>
            </div>
            <div className="rounded-xl bg-purple-500/10 border border-purple-500/20 p-3 text-center">
                <div className="text-purple-400 font-bold text-lg">T</div>
                <div className="text-gray-500 dark:text-slate-400 text-xs">Task</div>
            </div>
            <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-3 text-center">
                <div className="text-green-400 font-bold text-lg">A</div>
                <div className="text-gray-500 dark:text-slate-400 text-xs">Action</div>
            </div>
            <div className="rounded-xl bg-yellow-500/10 border border-yellow-500/20 p-3 text-center">
                <div className="text-yellow-400 font-bold text-lg">R</div>
                <div className="text-gray-500 dark:text-slate-400 text-xs">Result</div>
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
                    <tr className="border-b border-gray-200 dark:border-white/10">
                        <th className="text-left p-3 text-gray-500 dark:text-slate-400 font-medium">Tháng</th>
                        <th className="text-left p-3 text-gray-500 dark:text-slate-400 font-medium">Phase</th>
                        <th className="text-left p-3 text-gray-500 dark:text-slate-400 font-medium">Focus</th>
                        <th className="text-left p-3 text-gray-500 dark:text-slate-400 font-medium">Output</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-slate-300">
                    <tr className="border-b border-gray-100 dark:border-white/5">
                        <td className="p-3 text-red-400 font-bold">1-2</td>
                        <td className="p-3">CS + JS Core</td>
                        <td className="p-3">Networking, JS engine, closures</td>
                        <td className="p-3">Implement 10 JS utilities</td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-white/5">
                        <td className="p-3 text-blue-400 font-bold">3-4</td>
                        <td className="p-3">React + FE</td>
                        <td className="p-3">Hooks, patterns, CSS, perf</td>
                        <td className="p-3">Build 3 UI components thuần</td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-white/5">
                        <td className="p-3 text-green-400 font-bold">4-6</td>
                        <td className="p-3">DSA</td>
                        <td className="p-3">LeetCode Easy → Medium</td>
                        <td className="p-3">150 bài, 30 phút/bài</td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-white/5">
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
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-red-400 mt-0.5">1.</span>
                <span className="text-gray-600 dark:text-slate-300"><Highlight>Nền tảng CS</Highlight> — đừng skip, đây là thứ phân biệt junior và senior</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-yellow-400 mt-0.5">2.</span>
                <span className="text-gray-600 dark:text-slate-300"><Highlight>JS sâu</Highlight> — hiểu cơ chế, không chỉ syntax. Implement từ scratch</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 mt-0.5">3.</span>
                <span className="text-gray-600 dark:text-slate-300"><Highlight>React + FE</Highlight> — build UI thuần, hiểu rendering, performance</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-green-400 mt-0.5">4.</span>
                <span className="text-gray-600 dark:text-slate-300"><Highlight>DSA</Highlight> — 150 bài LeetCode, focus patterns không phải số lượng</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-purple-400 mt-0.5">5.</span>
                <span className="text-gray-600 dark:text-slate-300"><Highlight>System Design</Highlight> — thiết kế FE architecture, không chỉ vẽ diagram</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-pink-400 mt-0.5">6.</span>
                <span className="text-gray-600 dark:text-slate-300"><Highlight>Mock + Behavioral</Highlight> — practice nói to, chuẩn bị câu chuyện STAR</span>
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
