import { BlogPost } from '../types'
import { CodeBlock, Heading2, Heading3, Paragraph, Highlight, InlineCode, Callout } from '../components/BlogComponents'

const viContent = (
    <>
        <Paragraph>
            Bạn đã bao giờ tự hỏi: JavaScript chỉ có <Highlight>một thread duy nhất</Highlight>, vậy làm sao nó có thể
            xử lý hàng nghìn request, animation, timer... cùng lúc mà không bị đơ?
            Câu trả lời nằm ở <Highlight>Event Loop</Highlight> — trái tim của JavaScript runtime.
        </Paragraph>

        <Callout type="info">
            Hiểu Event Loop sẽ giúp bạn debug tốt hơn, viết code performant hơn, và trả lời phỏng vấn tự tin hơn.
            Đây là kiến thức nền tảng mà mọi JS developer cần nắm vững.
        </Callout>

        <Heading2>1. Bức tranh tổng quan</Heading2>

        <Paragraph>
            JavaScript runtime gồm nhiều thành phần phối hợp với nhau.
            Hãy hình dung nó như một nhà hàng:
        </Paragraph>

        <div className="my-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-4">
                <div className="text-blue-400 font-bold text-sm mb-1">📚 Call Stack</div>
                <div className="text-slate-400 text-xs">Đầu bếp — chỉ nấu được MỘT món tại một thời điểm (single-threaded)</div>
            </div>
            <div className="rounded-xl bg-purple-500/10 border border-purple-500/20 p-4">
                <div className="text-purple-400 font-bold text-sm mb-1">🌐 Web APIs</div>
                <div className="text-slate-400 text-xs">Phụ bếp — xử lý các việc tốn thời gian (setTimeout, fetch, DOM events...)</div>
            </div>
            <div className="rounded-xl bg-yellow-500/10 border border-yellow-500/20 p-4">
                <div className="text-yellow-400 font-bold text-sm mb-1">📋 Callback Queue (Macrotask)</div>
                <div className="text-slate-400 text-xs">Hàng chờ — xếp hàng đợi đầu bếp rảnh (setTimeout, setInterval, I/O...)</div>
            </div>
            <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-4">
                <div className="text-green-400 font-bold text-sm mb-1">⚡ Microtask Queue</div>
                <div className="text-slate-400 text-xs">VIP — được ưu tiên phục vụ trước (Promise.then, queueMicrotask, MutationObserver)</div>
            </div>
        </div>

        <div className="my-6 p-4 rounded-xl bg-slate-800/50 border border-white/10">
            <div className="text-center text-sm text-slate-400 mb-3 font-medium">🔄 Luồng hoạt động của Event Loop</div>
            <div className="flex flex-col items-center gap-2 text-sm">
                <div className="px-4 py-2 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30 w-fit">1. Thực thi code trong Call Stack</div>
                <div className="text-slate-600">↓</div>
                <div className="px-4 py-2 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30 w-fit">2. Gặp async → gửi cho Web APIs xử lý</div>
                <div className="text-slate-600">↓</div>
                <div className="px-4 py-2 rounded-lg bg-green-500/20 text-green-300 border border-green-500/30 w-fit">3. Call Stack trống → chạy HẾT Microtask Queue</div>
                <div className="text-slate-600">↓</div>
                <div className="px-4 py-2 rounded-lg bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 w-fit">4. Lấy 1 task từ Callback Queue → đưa vào Call Stack</div>
                <div className="text-slate-600">↓</div>
                <div className="px-4 py-2 rounded-lg bg-slate-500/20 text-slate-300 border border-slate-500/30 w-fit">5. Lặp lại từ bước 1 ♻️</div>
            </div>
        </div>

        <Heading2>2. Call Stack — Ngăn xếp thực thi</Heading2>

        <Paragraph>
            <Highlight>Call Stack</Highlight> là cấu trúc dữ liệu <Highlight>LIFO</Highlight> (Last In, First Out).
            Mỗi khi gọi một function, nó được <InlineCode>push</InlineCode> vào stack.
            Khi function return, nó được <InlineCode>pop</InlineCode> ra.
        </Paragraph>

        <CodeBlock title="call-stack-demo.js">{`function multiply(a, b) {
    return a * b
}
function square(n) {
    return multiply(n, n)
}
function printSquare(n) {
    const result = square(n)
    console.log(result)
}
printSquare(4)
// Call Stack: [printSquare] → [printSquare, square] → [printSquare, square, multiply] → ...`}</CodeBlock>

        <Callout type="warning">
            Nếu Call Stack quá sâu (đệ quy vô hạn), bạn sẽ gặp lỗi <InlineCode>Maximum call stack size exceeded</InlineCode>.
        </Callout>

        <Heading2>3. Web APIs — Nơi xử lý async</Heading2>

        <Paragraph>
            Khi gặp <InlineCode>setTimeout</InlineCode>, <InlineCode>fetch</InlineCode>, hay DOM events,
            JavaScript <Highlight>không tự xử lý</Highlight> mà gửi cho <Highlight>Web APIs</Highlight>.
            Sau khi xong, callback được đẩy vào Queue.
        </Paragraph>

        <CodeBlock title="web-apis.js">{`console.log('Bắt đầu')
setTimeout(() => console.log('Timeout'), 2000)
fetch('/api/data').then(res => res.json()).then(data => console.log(data))
console.log('Kết thúc')
// Output: "Bắt đầu" → "Kết thúc" → data → "Timeout"`}</CodeBlock>

        <Heading2>4. Macrotask vs Microtask</Heading2>

        <Paragraph>
            Đây là phần <Highlight>quan trọng nhất</Highlight>. JavaScript có <Highlight>2 loại hàng chờ</Highlight>:
        </Paragraph>

        <div className="my-6 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
                <thead>
                    <tr className="border-b border-white/10">
                        <th className="text-left p-3 text-slate-400 font-medium"></th>
                        <th className="text-left p-3 text-yellow-400 font-medium">Macrotask</th>
                        <th className="text-left p-3 text-green-400 font-medium">Microtask</th>
                    </tr>
                </thead>
                <tbody className="text-slate-300">
                    <tr className="border-b border-white/5">
                        <td className="p-3 text-slate-400">Gồm</td>
                        <td className="p-3"><InlineCode>setTimeout</InlineCode>, <InlineCode>setInterval</InlineCode>, I/O</td>
                        <td className="p-3"><InlineCode>Promise.then</InlineCode>, <InlineCode>queueMicrotask</InlineCode></td>
                    </tr>
                    <tr className="border-b border-white/5">
                        <td className="p-3 text-slate-400">Ưu tiên</td>
                        <td className="p-3">Thấp hơn</td>
                        <td className="p-3">Cao hơn ⚡</td>
                    </tr>
                    <tr>
                        <td className="p-3 text-slate-400">Xử lý</td>
                        <td className="p-3">Mỗi vòng loop lấy 1 task</td>
                        <td className="p-3">Chạy HẾT trước khi sang macrotask</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <Heading3>🧪 Bài test kinh điển</Heading3>

        <CodeBlock title="event-loop-quiz.js">{`console.log('1')
setTimeout(() => console.log('2'), 0)
Promise.resolve().then(() => console.log('3'))
console.log('4')
// Output: 1, 4, 3, 2`}</CodeBlock>

        <Callout type="tip">
            Quy tắc vàng: <InlineCode>Microtask</InlineCode> LUÔN xử lý hết trước khi lấy <InlineCode>Macrotask</InlineCode> tiếp theo.
        </Callout>

        <Heading2>5. Bài test nâng cao</Heading2>

        <CodeBlock title="advanced-quiz.js">{`console.log('start')
setTimeout(() => {
    console.log('timeout 1')
    Promise.resolve().then(() => console.log('promise inside timeout'))
}, 0)
Promise.resolve().then(() => {
    console.log('promise 1')
    setTimeout(() => console.log('timeout inside promise'), 0)
})
Promise.resolve().then(() => console.log('promise 2'))
console.log('end')
// Output: start → end → promise 1 → promise 2 → timeout 1 → promise inside timeout → timeout inside promise`}</CodeBlock>

        <Heading2>6. Event Loop trong Node.js</Heading2>

        <Paragraph>
            Node.js có <Highlight>6 phases</Highlight>: Timers → Pending callbacks → Idle → Poll → Check → Close.
        </Paragraph>

        <CodeBlock title="node-event-loop.js">{`const fs = require('fs')
fs.readFile('file.txt', () => {
    setTimeout(() => console.log('timeout'), 0)
    setImmediate(() => console.log('immediate'))
})
// Output: "immediate" → "timeout" (Check phase trước Timers)`}</CodeBlock>

        <Heading3>process.nextTick vs Promise</Heading3>

        <CodeBlock title="nexttick-vs-promise.js">{`Promise.resolve().then(() => console.log('promise'))
process.nextTick(() => console.log('nextTick'))
console.log('sync')
// Output: sync → nextTick → promise
// Ưu tiên: sync > nextTick > Promise > setTimeout`}</CodeBlock>

        <Callout type="warning">
            Tránh gọi <InlineCode>process.nextTick</InlineCode> đệ quy — sẽ chặn Event Loop hoàn toàn!
        </Callout>

        <Heading2>7. Lỗi thường gặp</Heading2>

        <CodeBlock title="blocking.js">{`// ❌ Block Event Loop
app.get('/heavy', (req, res) => {
    while (Date.now() - start < 5000) {} // Block 5s!
})
// ✅ Dùng Worker Thread
const { Worker } = require('worker_threads')
app.get('/heavy', (req, res) => {
    const worker = new Worker('./heavy-task.js')
    worker.on('message', result => res.send(result))
})`}</CodeBlock>

        <Heading2>📌 Tóm tắt</Heading2>

        <div className="my-6 space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5">
                <span className="text-blue-400 mt-0.5">1.</span>
                <span className="text-slate-300">JavaScript là <Highlight>single-threaded</Highlight> — chỉ có một Call Stack</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5">
                <span className="text-purple-400 mt-0.5">2.</span>
                <span className="text-slate-300"><Highlight>Web APIs</Highlight> / <Highlight>libuv</Highlight> xử lý async tasks</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5">
                <span className="text-green-400 mt-0.5">3.</span>
                <span className="text-slate-300"><Highlight>Microtask</Highlight> luôn ưu tiên hơn <Highlight>Macrotask</Highlight></span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5">
                <span className="text-yellow-400 mt-0.5">4.</span>
                <span className="text-slate-300">Đừng bao giờ <Highlight>block Event Loop</Highlight></span>
            </div>
        </div>

        <Callout type="tip">
            Visualize Event Loop trực quan tại{' '}
            <a href="http://latentflip.com/loupe" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline hover:text-blue-300">Loupe</a>
            {' '}của Philip Roberts!
        </Callout>
    </>
)

const enContent = (
    <>
        <Paragraph>
            Ever wondered: JavaScript has only <Highlight>a single thread</Highlight>, so how can it handle
            thousands of requests, animations, and timers simultaneously without freezing?
            The answer is the <Highlight>Event Loop</Highlight> — the heart of the JavaScript runtime.
        </Paragraph>

        <Callout type="info">
            Understanding the Event Loop helps you debug better, write performant code, and ace interviews.
            This is foundational knowledge every JS developer must master.
        </Callout>

        <Heading2>1. The Big Picture</Heading2>

        <Paragraph>
            The JavaScript runtime has several components working together. Think of it like a restaurant:
        </Paragraph>

        <div className="my-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-4">
                <div className="text-blue-400 font-bold text-sm mb-1">📚 Call Stack</div>
                <div className="text-slate-400 text-xs">The chef — can only cook ONE dish at a time (single-threaded)</div>
            </div>
            <div className="rounded-xl bg-purple-500/10 border border-purple-500/20 p-4">
                <div className="text-purple-400 font-bold text-sm mb-1">🌐 Web APIs</div>
                <div className="text-slate-400 text-xs">Sous chefs — handle time-consuming tasks (setTimeout, fetch, DOM events...)</div>
            </div>
            <div className="rounded-xl bg-yellow-500/10 border border-yellow-500/20 p-4">
                <div className="text-yellow-400 font-bold text-sm mb-1">📋 Callback Queue (Macrotask)</div>
                <div className="text-slate-400 text-xs">Waiting line — queued until chef is free (setTimeout, setInterval, I/O...)</div>
            </div>
            <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-4">
                <div className="text-green-400 font-bold text-sm mb-1">⚡ Microtask Queue</div>
                <div className="text-slate-400 text-xs">VIP line — served first (Promise.then, queueMicrotask, MutationObserver)</div>
            </div>
        </div>

        <div className="my-6 p-4 rounded-xl bg-slate-800/50 border border-white/10">
            <div className="text-center text-sm text-slate-400 mb-3 font-medium">🔄 Event Loop Flow</div>
            <div className="flex flex-col items-center gap-2 text-sm">
                <div className="px-4 py-2 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30 w-fit">1. Execute code in Call Stack</div>
                <div className="text-slate-600">↓</div>
                <div className="px-4 py-2 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30 w-fit">2. Encounter async → delegate to Web APIs</div>
                <div className="text-slate-600">↓</div>
                <div className="px-4 py-2 rounded-lg bg-green-500/20 text-green-300 border border-green-500/30 w-fit">3. Call Stack empty → drain ALL Microtasks</div>
                <div className="text-slate-600">↓</div>
                <div className="px-4 py-2 rounded-lg bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 w-fit">4. Take 1 task from Callback Queue</div>
                <div className="text-slate-600">↓</div>
                <div className="px-4 py-2 rounded-lg bg-slate-500/20 text-slate-300 border border-slate-500/30 w-fit">5. Repeat ♻️</div>
            </div>
        </div>

        <Heading2>2. Call Stack</Heading2>

        <Paragraph>
            The <Highlight>Call Stack</Highlight> is a <Highlight>LIFO</Highlight> data structure.
            Functions are <InlineCode>push</InlineCode>ed on call, <InlineCode>pop</InlineCode>ped on return.
        </Paragraph>

        <CodeBlock title="call-stack-demo.js">{`function multiply(a, b) { return a * b }
function square(n) { return multiply(n, n) }
function printSquare(n) { console.log(square(n)) }
printSquare(4)
// Stack: [printSquare] → [printSquare, square] → [printSquare, square, multiply] → ...`}</CodeBlock>

        <Callout type="warning">
            If the Call Stack grows too deep (infinite recursion), you get <InlineCode>Maximum call stack size exceeded</InlineCode>.
        </Callout>

        <Heading2>3. Web APIs</Heading2>

        <Paragraph>
            When encountering <InlineCode>setTimeout</InlineCode>, <InlineCode>fetch</InlineCode>, or DOM events,
            JS <Highlight>delegates</Highlight> to <Highlight>Web APIs</Highlight> provided by the browser.
        </Paragraph>

        <CodeBlock title="web-apis.js">{`console.log('Start')
setTimeout(() => console.log('Timeout'), 2000)
fetch('/api/data').then(res => res.json()).then(data => console.log(data))
console.log('End')
// Output: "Start" → "End" → data → "Timeout"`}</CodeBlock>

        <Heading2>4. Macrotask vs Microtask</Heading2>

        <Paragraph>
            The <Highlight>most important</Highlight> part. JavaScript has <Highlight>2 types of queues</Highlight>:
        </Paragraph>

        <div className="my-6 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
                <thead>
                    <tr className="border-b border-white/10">
                        <th className="text-left p-3 text-slate-400 font-medium"></th>
                        <th className="text-left p-3 text-yellow-400 font-medium">Macrotask</th>
                        <th className="text-left p-3 text-green-400 font-medium">Microtask</th>
                    </tr>
                </thead>
                <tbody className="text-slate-300">
                    <tr className="border-b border-white/5">
                        <td className="p-3 text-slate-400">Includes</td>
                        <td className="p-3"><InlineCode>setTimeout</InlineCode>, <InlineCode>setInterval</InlineCode>, I/O</td>
                        <td className="p-3"><InlineCode>Promise.then</InlineCode>, <InlineCode>queueMicrotask</InlineCode></td>
                    </tr>
                    <tr className="border-b border-white/5">
                        <td className="p-3 text-slate-400">Priority</td>
                        <td className="p-3">Lower</td>
                        <td className="p-3">Higher ⚡</td>
                    </tr>
                    <tr>
                        <td className="p-3 text-slate-400">Processing</td>
                        <td className="p-3">1 per loop iteration</td>
                        <td className="p-3">Drain ALL before next macrotask</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <Heading3>🧪 The Classic Quiz</Heading3>

        <CodeBlock title="event-loop-quiz.js">{`console.log('1')
setTimeout(() => console.log('2'), 0)
Promise.resolve().then(() => console.log('3'))
console.log('4')
// Output: 1, 4, 3, 2`}</CodeBlock>

        <Callout type="tip">
            Golden rule: <InlineCode>Microtasks</InlineCode> are ALWAYS fully drained before the next <InlineCode>Macrotask</InlineCode>.
        </Callout>

        <Heading2>5. Advanced Quiz</Heading2>

        <CodeBlock title="advanced-quiz.js">{`console.log('start')
setTimeout(() => {
    console.log('timeout 1')
    Promise.resolve().then(() => console.log('promise inside timeout'))
}, 0)
Promise.resolve().then(() => {
    console.log('promise 1')
    setTimeout(() => console.log('timeout inside promise'), 0)
})
Promise.resolve().then(() => console.log('promise 2'))
console.log('end')
// Output: start → end → promise 1 → promise 2 → timeout 1 → promise inside timeout → timeout inside promise`}</CodeBlock>

        <Heading2>6. Event Loop in Node.js</Heading2>

        <Paragraph>
            Node.js has <Highlight>6 phases</Highlight>: Timers → Pending → Idle → Poll → Check → Close.
        </Paragraph>

        <CodeBlock title="node-event-loop.js">{`const fs = require('fs')
fs.readFile('file.txt', () => {
    setTimeout(() => console.log('timeout'), 0)
    setImmediate(() => console.log('immediate'))
})
// Output: "immediate" → "timeout" (Check phase before Timers)`}</CodeBlock>

        <Heading3>process.nextTick vs Promise</Heading3>

        <CodeBlock title="nexttick-vs-promise.js">{`Promise.resolve().then(() => console.log('promise'))
process.nextTick(() => console.log('nextTick'))
console.log('sync')
// Output: sync → nextTick → promise
// Priority: sync > nextTick > Promise > setTimeout`}</CodeBlock>

        <Callout type="warning">
            Avoid recursive <InlineCode>process.nextTick</InlineCode> — it will completely starve the Event Loop!
        </Callout>

        <Heading2>7. Common Mistakes</Heading2>

        <CodeBlock title="blocking.js">{`// ❌ Blocking the Event Loop
app.get('/heavy', (req, res) => {
    while (Date.now() - start < 5000) {} // Block 5s!
})
// ✅ Use Worker Thread
const { Worker } = require('worker_threads')
app.get('/heavy', (req, res) => {
    const worker = new Worker('./heavy-task.js')
    worker.on('message', result => res.send(result))
})`}</CodeBlock>

        <Heading2>📌 Summary</Heading2>

        <div className="my-6 space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5">
                <span className="text-blue-400 mt-0.5">1.</span>
                <span className="text-slate-300">JavaScript is <Highlight>single-threaded</Highlight> — one Call Stack</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5">
                <span className="text-purple-400 mt-0.5">2.</span>
                <span className="text-slate-300"><Highlight>Web APIs</Highlight> / <Highlight>libuv</Highlight> handle async tasks</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5">
                <span className="text-green-400 mt-0.5">3.</span>
                <span className="text-slate-300"><Highlight>Microtasks</Highlight> always have priority over <Highlight>Macrotasks</Highlight></span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5">
                <span className="text-yellow-400 mt-0.5">4.</span>
                <span className="text-slate-300">Never <Highlight>block the Event Loop</Highlight></span>
            </div>
        </div>

        <Callout type="tip">
            Visualize the Event Loop at{' '}
            <a href="http://latentflip.com/loupe" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline hover:text-blue-300">Loupe</a>
            {' '}by Philip Roberts!
        </Callout>
    </>
)

const eventLoop: BlogPost = {
    slug: 'event-loop',
    title: {
        vi: 'Event Loop trong JavaScript — Hiểu cách JS thực sự chạy',
        en: 'JavaScript Event Loop — How JS Actually Runs',
    },
    description: {
        vi: 'Giải mã cơ chế Event Loop: Call Stack, Web APIs, Callback Queue, Microtask Queue và cách JavaScript xử lý hàng nghìn tác vụ chỉ với một thread duy nhất.',
        en: 'Demystifying the Event Loop: Call Stack, Web APIs, Callback Queue, Microtask Queue and how JavaScript handles thousands of tasks with a single thread.',
    },
    date: '2025-12-23',
    tags: ['JavaScript', 'Event Loop', 'Fundamentals'],
    emoji: '🔄',
    color: '#34d399',
    content: { vi: viContent, en: enContent },
}

export default eventLoop
