import { BlogPost } from '../types'
import { CodeBlock, Heading2, Heading3, Paragraph, Highlight, InlineCode, Callout } from '../components/BlogComponents'

const callbackPromiseAsyncAwait: BlogPost = {
    slug: 'callback-promise-async-await',
    title: {
        vi: 'Callback, Promise và Async/Await trong JavaScript',
        en: 'Callback, Promise & Async/Await in JavaScript',
    },
    description: {
        vi: 'Hiểu rõ 3 cách xử lý bất đồng bộ trong JavaScript: từ Callback Hell đến Promise chain và cú pháp Async/Await hiện đại.',
        en: 'Master the 3 approaches to asynchronous JavaScript: from Callback Hell to Promise chaining and modern Async/Await syntax.',
    },
    date: '2025-11-12',
    tags: ['JavaScript', 'Async', 'Fundamentals'],
    emoji: '⚡',
    color: '#fbbf24',
    content: {
        vi: (
            <>
                <Paragraph>
                    JavaScript là ngôn ngữ <Highlight>single-threaded</Highlight>, nghĩa là chỉ thực thi một tác vụ tại một thời điểm.
                    Nhưng trong thực tế, ta cần gọi API, đọc file, query database... — những việc cần thời gian chờ đợi.
                    Đó là lúc cơ chế <Highlight>bất đồng bộ (asynchronous)</Highlight> phát huy tác dụng.
                </Paragraph>

                <Callout type="info">
                    Bài viết này sẽ đi từ cách tiếp cận cổ điển nhất (Callback) đến hiện đại nhất (Async/Await),
                    giúp bạn hiểu bản chất và biết khi nào nên dùng cách nào.
                </Callout>

                <Heading2>1. Callback — Cách tiếp cận đầu tiên</Heading2>

                <Paragraph>
                    <Highlight>Callback</Highlight> là một function được truyền vào function khác như một argument,
                    và sẽ được gọi lại (call back) khi tác vụ bất đồng bộ hoàn thành.
                </Paragraph>

                <Heading3>Ví dụ cơ bản</Heading3>

                <CodeBlock title="callback-basic.js">{`function fetchUser(userId, callback) {
    setTimeout(() => {
        const user = { id: userId, name: 'Khuong' }
        callback(user)
    }, 1000)
}

fetchUser(1, (user) => {
    console.log('User:', user.name) // "Khuong" sau 1 giây
})`}</CodeBlock>

                <Heading3>🔥 Callback Hell</Heading3>

                <Paragraph>
                    Vấn đề xảy ra khi ta cần thực hiện nhiều tác vụ bất đồng bộ <Highlight>tuần tự</Highlight> —
                    code bắt đầu lồng sâu vào nhau, rất khó đọc và maintain:
                </Paragraph>

                <CodeBlock title="callback-hell.js">{`getUser(userId, (user) => {
    getOrders(user.id, (orders) => {
        getOrderDetails(orders[0].id, (details) => {
            getShippingStatus(details.trackingId, (status) => {
                console.log('Shipping:', status)
                // 🔥 Pyramid of Doom!
            })
        })
    })
})`}</CodeBlock>

                <Callout type="warning">
                    Callback Hell (hay còn gọi là Pyramid of Doom) làm code khó đọc, khó debug,
                    và gần như không thể xử lý lỗi (error handling) một cách sạch sẽ.
                </Callout>

                <Heading2>2. Promise — Giải pháp cho Callback Hell</Heading2>

                <Paragraph>
                    <Highlight>Promise</Highlight> ra đời từ ES6 (2015) để giải quyết vấn đề Callback Hell.
                    Một Promise đại diện cho một giá trị <Highlight>có thể có trong tương lai</Highlight> —
                    nó có 3 trạng thái:
                </Paragraph>

                <div className="my-6 grid grid-cols-3 gap-3">
                    <div className="rounded-xl bg-yellow-500/10 border border-yellow-500/20 p-3 text-center">
                        <div className="text-yellow-400 font-bold text-sm">⏳ Pending</div>
                        <div className="text-slate-400 text-xs mt-1">Đang chờ kết quả</div>
                    </div>
                    <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-3 text-center">
                        <div className="text-green-400 font-bold text-sm">✅ Fulfilled</div>
                        <div className="text-slate-400 text-xs mt-1">Thành công</div>
                    </div>
                    <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-3 text-center">
                        <div className="text-red-400 font-bold text-sm">❌ Rejected</div>
                        <div className="text-slate-400 text-xs mt-1">Thất bại</div>
                    </div>
                </div>

                <Heading3>Tạo một Promise</Heading3>

                <CodeBlock title="promise-basic.js">{`function fetchUser(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = { id: userId, name: 'Khuong' }
            if (user) {
                resolve(user)    // ✅ Thành công
            } else {
                reject('User not found') // ❌ Thất bại
            }
        }, 1000)
    })
}`}</CodeBlock>

                <Heading3>Promise Chaining — Chuỗi Promise</Heading3>

                <Paragraph>
                    Thay vì lồng callback, ta <Highlight>nối chuỗi</Highlight> các <InlineCode>.then()</InlineCode> lại với nhau.
                    Code phẳng hơn, dễ đọc hơn nhiều:
                </Paragraph>

                <CodeBlock title="promise-chain.js">{`getUser(userId)
    .then(user => getOrders(user.id))
    .then(orders => getOrderDetails(orders[0].id))
    .then(details => getShippingStatus(details.trackingId))
    .then(status => console.log('Shipping:', status))
    .catch(error => console.error('Lỗi:', error))
    // 🎉 Phẳng, sạch, dễ đọc!`}</CodeBlock>

                <Heading3>Promise.all — Chạy song song</Heading3>

                <Paragraph>
                    Khi cần chạy nhiều tác vụ <Highlight>đồng thời</Highlight> và đợi tất cả hoàn thành:
                </Paragraph>

                <CodeBlock title="promise-all.js">{`const [users, products, orders] = await Promise.all([
    fetchUsers(),
    fetchProducts(),
    fetchOrders()
])
// Cả 3 chạy cùng lúc, nhanh hơn chạy tuần tự!`}</CodeBlock>

                <Heading2>3. Async/Await — Cú pháp hiện đại nhất</Heading2>

                <Paragraph>
                    <Highlight>Async/Await</Highlight> ra đời từ ES2017, là <Highlight>syntactic sugar</Highlight> trên Promise.
                    Nó cho phép viết code bất đồng bộ <Highlight>trông như đồng bộ</Highlight> — dễ đọc nhất trong 3 cách.
                </Paragraph>

                <Heading3>Cú pháp cơ bản</Heading3>

                <CodeBlock title="async-await-basic.js">{`async function getShippingInfo(userId) {
    try {
        const user = await getUser(userId)
        const orders = await getOrders(user.id)
        const details = await getOrderDetails(orders[0].id)
        const status = await getShippingStatus(details.trackingId)

        console.log('Shipping:', status)
        // 🚀 Đọc từ trên xuống như code đồng bộ!
    } catch (error) {
        console.error('Lỗi:', error)
    }
}`}</CodeBlock>

                <Callout type="tip">
                    <InlineCode>await</InlineCode> chỉ dùng được bên trong function có keyword <InlineCode>async</InlineCode>.
                    Nó sẽ &quot;tạm dừng&quot; function cho đến khi Promise resolve hoặc reject.
                </Callout>

                <Heading3>Xử lý lỗi với try/catch</Heading3>

                <Paragraph>
                    Thay vì <InlineCode>.catch()</InlineCode> của Promise, ta dùng <InlineCode>try/catch</InlineCode> quen thuộc:
                </Paragraph>

                <CodeBlock title="error-handling.js">{`async function fetchData() {
    try {
        const response = await fetch('/api/data')

        if (!response.ok) {
            throw new Error(\`HTTP \${response.status}\`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Fetch failed:', error.message)
        // Có thể retry, show notification, etc.
        throw error // Re-throw nếu cần
    } finally {
        // Luôn chạy (dù success hay error)
        setLoading(false)
    }
}`}</CodeBlock>

                <Heading2>4. So sánh 3 cách tiếp cận</Heading2>

                <div className="my-6 overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="text-left p-3 text-slate-400 font-medium">Tiêu chí</th>
                                <th className="text-left p-3 text-yellow-400 font-medium">Callback</th>
                                <th className="text-left p-3 text-blue-400 font-medium">Promise</th>
                                <th className="text-left p-3 text-green-400 font-medium">Async/Await</th>
                            </tr>
                        </thead>
                        <tbody className="text-slate-300">
                            <tr className="border-b border-white/5">
                                <td className="p-3 text-slate-400">Dễ đọc</td>
                                <td className="p-3">⭐</td>
                                <td className="p-3">⭐⭐⭐</td>
                                <td className="p-3">⭐⭐⭐⭐⭐</td>
                            </tr>
                            <tr className="border-b border-white/5">
                                <td className="p-3 text-slate-400">Error handling</td>
                                <td className="p-3">Khó</td>
                                <td className="p-3"><InlineCode>.catch()</InlineCode></td>
                                <td className="p-3"><InlineCode>try/catch</InlineCode></td>
                            </tr>
                            <tr className="border-b border-white/5">
                                <td className="p-3 text-slate-400">Chạy song song</td>
                                <td className="p-3">Thủ công</td>
                                <td className="p-3"><InlineCode>Promise.all</InlineCode></td>
                                <td className="p-3"><InlineCode>Promise.all</InlineCode></td>
                            </tr>
                            <tr className="border-b border-white/5">
                                <td className="p-3 text-slate-400">Debugging</td>
                                <td className="p-3">Rất khó</td>
                                <td className="p-3">Trung bình</td>
                                <td className="p-3">Dễ (stack trace rõ)</td>
                            </tr>
                            <tr>
                                <td className="p-3 text-slate-400">Khi nào dùng</td>
                                <td className="p-3">Event listeners, legacy</td>
                                <td className="p-3">Library APIs</td>
                                <td className="p-3">Mọi nơi (khuyên dùng)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <Heading2>5. Ví dụ thực tế trong React</Heading2>

                <CodeBlock title="useEffect-async.tsx">{`// ❌ SAI - không dùng async trực tiếp trong useEffect
useEffect(async () => {
    const data = await fetchData()
    setData(data)
}, [])

// ✅ ĐÚNG - tạo async function bên trong
useEffect(() => {
    const loadData = async () => {
        try {
            setLoading(true)
            const data = await fetchData()
            setData(data)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }
    loadData()
}, [])`}</CodeBlock>

                <Heading2>📌 Tóm tắt</Heading2>

                <div className="my-6 space-y-3">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5">
                        <span className="text-yellow-400 mt-0.5">1.</span>
                        <span className="text-slate-300"><Highlight>Callback</Highlight> — cách cổ điển, chỉ dùng cho event listeners hoặc legacy code</span>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5">
                        <span className="text-blue-400 mt-0.5">2.</span>
                        <span className="text-slate-300"><Highlight>Promise</Highlight> — nền tảng của async JS, cần hiểu để dùng Async/Await</span>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5">
                        <span className="text-green-400 mt-0.5">3.</span>
                        <span className="text-slate-300"><Highlight>Async/Await</Highlight> — khuyên dùng cho hầu hết mọi trường hợp, code sạch nhất</span>
                    </div>
                </div>

                <Callout type="tip">
                    Trong dự án thực tế, hãy luôn dùng <InlineCode>async/await</InlineCode> kết hợp với <InlineCode>try/catch</InlineCode>.
                    Khi cần chạy song song, dùng <InlineCode>Promise.all()</InlineCode>.
                    Callback chỉ cần khi làm việc với event-based APIs hoặc thư viện legacy.
                </Callout>
            </>
        ),
        en: (
            <>
                <Paragraph>
                    JavaScript is a <Highlight>single-threaded</Highlight> language, meaning it can only execute one task at a time.
                    But in practice, we need to call APIs, read files, query databases... — tasks that take time.
                    That&apos;s where the <Highlight>asynchronous</Highlight> mechanism comes into play.
                </Paragraph>

                <Callout type="info">
                    This article walks through the approaches from the most classic (Callback) to the most modern (Async/Await),
                    helping you understand the fundamentals and know when to use each one.
                </Callout>

                <Heading2>1. Callback — The First Approach</Heading2>

                <Paragraph>
                    A <Highlight>Callback</Highlight> is a function passed into another function as an argument,
                    which gets called back when the asynchronous task completes.
                </Paragraph>

                <Heading3>Basic Example</Heading3>

                <CodeBlock title="callback-basic.js">{`function fetchUser(userId, callback) {
    setTimeout(() => {
        const user = { id: userId, name: 'Khuong' }
        callback(user)
    }, 1000)
}

fetchUser(1, (user) => {
    console.log('User:', user.name) // "Khuong" after 1 second
})`}</CodeBlock>

                <Heading3>🔥 Callback Hell</Heading3>

                <Paragraph>
                    Problems arise when we need to perform multiple async tasks <Highlight>sequentially</Highlight> —
                    the code starts nesting deeply, becoming very hard to read and maintain:
                </Paragraph>

                <CodeBlock title="callback-hell.js">{`getUser(userId, (user) => {
    getOrders(user.id, (orders) => {
        getOrderDetails(orders[0].id, (details) => {
            getShippingStatus(details.trackingId, (status) => {
                console.log('Shipping:', status)
                // 🔥 Pyramid of Doom!
            })
        })
    })
})`}</CodeBlock>

                <Callout type="warning">
                    Callback Hell (also known as Pyramid of Doom) makes code hard to read, hard to debug,
                    and nearly impossible to handle errors cleanly.
                </Callout>

                <Heading2>2. Promise — The Solution to Callback Hell</Heading2>

                <Paragraph>
                    <Highlight>Promise</Highlight> was introduced in ES6 (2015) to solve the Callback Hell problem.
                    A Promise represents a value that <Highlight>may be available in the future</Highlight> —
                    it has 3 states:
                </Paragraph>

                <div className="my-6 grid grid-cols-3 gap-3">
                    <div className="rounded-xl bg-yellow-500/10 border border-yellow-500/20 p-3 text-center">
                        <div className="text-yellow-400 font-bold text-sm">⏳ Pending</div>
                        <div className="text-slate-400 text-xs mt-1">Waiting for result</div>
                    </div>
                    <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-3 text-center">
                        <div className="text-green-400 font-bold text-sm">✅ Fulfilled</div>
                        <div className="text-slate-400 text-xs mt-1">Success</div>
                    </div>
                    <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-3 text-center">
                        <div className="text-red-400 font-bold text-sm">❌ Rejected</div>
                        <div className="text-slate-400 text-xs mt-1">Failed</div>
                    </div>
                </div>

                <Heading3>Creating a Promise</Heading3>

                <CodeBlock title="promise-basic.js">{`function fetchUser(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = { id: userId, name: 'Khuong' }
            if (user) {
                resolve(user)    // ✅ Success
            } else {
                reject('User not found') // ❌ Failed
            }
        }, 1000)
    })
}`}</CodeBlock>

                <Heading3>Promise Chaining</Heading3>

                <Paragraph>
                    Instead of nesting callbacks, we <Highlight>chain</Highlight> <InlineCode>.then()</InlineCode> calls together.
                    The code is flatter and much more readable:
                </Paragraph>

                <CodeBlock title="promise-chain.js">{`getUser(userId)
    .then(user => getOrders(user.id))
    .then(orders => getOrderDetails(orders[0].id))
    .then(details => getShippingStatus(details.trackingId))
    .then(status => console.log('Shipping:', status))
    .catch(error => console.error('Error:', error))
    // 🎉 Flat, clean, readable!`}</CodeBlock>

                <Heading3>Promise.all — Run in Parallel</Heading3>

                <Paragraph>
                    When you need to run multiple tasks <Highlight>simultaneously</Highlight> and wait for all to complete:
                </Paragraph>

                <CodeBlock title="promise-all.js">{`const [users, products, orders] = await Promise.all([
    fetchUsers(),
    fetchProducts(),
    fetchOrders()
])
// All 3 run concurrently, faster than sequential!`}</CodeBlock>

                <Heading2>3. Async/Await — The Most Modern Syntax</Heading2>

                <Paragraph>
                    <Highlight>Async/Await</Highlight> was introduced in ES2017 as <Highlight>syntactic sugar</Highlight> on top of Promises.
                    It lets you write asynchronous code that <Highlight>looks synchronous</Highlight> — the cleanest of all three approaches.
                </Paragraph>

                <Heading3>Basic Syntax</Heading3>

                <CodeBlock title="async-await-basic.js">{`async function getShippingInfo(userId) {
    try {
        const user = await getUser(userId)
        const orders = await getOrders(user.id)
        const details = await getOrderDetails(orders[0].id)
        const status = await getShippingStatus(details.trackingId)

        console.log('Shipping:', status)
        // 🚀 Reads top-to-bottom like synchronous code!
    } catch (error) {
        console.error('Error:', error)
    }
}`}</CodeBlock>

                <Callout type="tip">
                    <InlineCode>await</InlineCode> can only be used inside a function with the <InlineCode>async</InlineCode> keyword.
                    It &quot;pauses&quot; the function until the Promise resolves or rejects.
                </Callout>

                <Heading3>Error Handling with try/catch</Heading3>

                <Paragraph>
                    Instead of Promise&apos;s <InlineCode>.catch()</InlineCode>, we use the familiar <InlineCode>try/catch</InlineCode>:
                </Paragraph>

                <CodeBlock title="error-handling.js">{`async function fetchData() {
    try {
        const response = await fetch('/api/data')

        if (!response.ok) {
            throw new Error(\`HTTP \${response.status}\`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Fetch failed:', error.message)
        throw error // Re-throw if needed
    } finally {
        // Always runs (success or error)
        setLoading(false)
    }
}`}</CodeBlock>

                <Heading2>4. Comparing the 3 Approaches</Heading2>

                <div className="my-6 overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="text-left p-3 text-slate-400 font-medium">Criteria</th>
                                <th className="text-left p-3 text-yellow-400 font-medium">Callback</th>
                                <th className="text-left p-3 text-blue-400 font-medium">Promise</th>
                                <th className="text-left p-3 text-green-400 font-medium">Async/Await</th>
                            </tr>
                        </thead>
                        <tbody className="text-slate-300">
                            <tr className="border-b border-white/5">
                                <td className="p-3 text-slate-400">Readability</td>
                                <td className="p-3">⭐</td>
                                <td className="p-3">⭐⭐⭐</td>
                                <td className="p-3">⭐⭐⭐⭐⭐</td>
                            </tr>
                            <tr className="border-b border-white/5">
                                <td className="p-3 text-slate-400">Error handling</td>
                                <td className="p-3">Difficult</td>
                                <td className="p-3"><InlineCode>.catch()</InlineCode></td>
                                <td className="p-3"><InlineCode>try/catch</InlineCode></td>
                            </tr>
                            <tr className="border-b border-white/5">
                                <td className="p-3 text-slate-400">Parallel execution</td>
                                <td className="p-3">Manual</td>
                                <td className="p-3"><InlineCode>Promise.all</InlineCode></td>
                                <td className="p-3"><InlineCode>Promise.all</InlineCode></td>
                            </tr>
                            <tr className="border-b border-white/5">
                                <td className="p-3 text-slate-400">Debugging</td>
                                <td className="p-3">Very hard</td>
                                <td className="p-3">Medium</td>
                                <td className="p-3">Easy (clear stack trace)</td>
                            </tr>
                            <tr>
                                <td className="p-3 text-slate-400">When to use</td>
                                <td className="p-3">Event listeners, legacy</td>
                                <td className="p-3">Library APIs</td>
                                <td className="p-3">Everywhere (recommended)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <Heading2>5. Real-world React Example</Heading2>

                <CodeBlock title="useEffect-async.tsx">{`// ❌ WRONG - don't use async directly in useEffect
useEffect(async () => {
    const data = await fetchData()
    setData(data)
}, [])

// ✅ CORRECT - create async function inside
useEffect(() => {
    const loadData = async () => {
        try {
            setLoading(true)
            const data = await fetchData()
            setData(data)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }
    loadData()
}, [])`}</CodeBlock>

                <Heading2>📌 Summary</Heading2>

                <div className="my-6 space-y-3">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5">
                        <span className="text-yellow-400 mt-0.5">1.</span>
                        <span className="text-slate-300"><Highlight>Callback</Highlight> — classic approach, only use for event listeners or legacy code</span>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5">
                        <span className="text-blue-400 mt-0.5">2.</span>
                        <span className="text-slate-300"><Highlight>Promise</Highlight> — the foundation of async JS, must understand to use Async/Await</span>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5">
                        <span className="text-green-400 mt-0.5">3.</span>
                        <span className="text-slate-300"><Highlight>Async/Await</Highlight> — recommended for most cases, cleanest code</span>
                    </div>
                </div>

                <Callout type="tip">
                    In real projects, always use <InlineCode>async/await</InlineCode> with <InlineCode>try/catch</InlineCode>.
                    For parallel execution, use <InlineCode>Promise.all()</InlineCode>.
                    Callbacks are only needed for event-based APIs or legacy libraries.
                </Callout>
            </>
        ),
    },
}

export default callbackPromiseAsyncAwait
