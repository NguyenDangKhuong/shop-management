'use client'
import { CodeBlock, Heading2, Heading3, Paragraph, Highlight, InlineCode, Callout } from '../../components/BlogComponents'
import { TopicModal } from '../../components/TopicModal'
import { toLeetCodeSlug } from '../utils'

export default function Phase4DSA() {
    return (
        <>
            <Heading2>Phase 4 — Data Structures & Algorithms (6-8 tuần)</Heading2>

            <Paragraph>
                Phần <Highlight>nhiều người sợ nhất</Highlight> nhưng cũng là phần <Highlight>bắt buộc</Highlight> ở big tech.
                Frontend cũng phải code DSA — nhưng mức độ thường dễ hơn backend 1 bậc.
            </Paragraph>

            <Heading3>4.1 Data Structures (click để xem chi tiết)</Heading3>
            <a href="/blogs/data-types-structures" target="_blank" rel="noopener noreferrer" className="mb-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 Xem bài viết Data Types &amp; Structures →</a>
            <div className="my-4 space-y-2">
                <TopicModal title="Array / String" emoji="📦" color="#4ade80" summary="⭐ Bắt buộc — nền tảng của mọi bài DSA, two pointers, sliding window" concept="Array lưu data liên tục trong bộ nhớ, truy cập O(1) theo index nhưng insert/delete O(n). String là immutable array of chars. Patterns chính: Two Pointers (sorted array), Sliding Window (subarray/substring), Prefix Sum (range queries), Kadane's (max subarray). Hầu hết bài DSA đều liên quan đến array/string.">
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

                <TopicModal title="HashMap / HashSet" emoji="🗂️" color="#4ade80" summary="⭐ Bắt buộc — frequency count, cache, lookup O(1)" concept="HashMap lưu key-value pairs, lookup/insert/delete O(1) trung bình. HashSet chỉ lưu keys (kiểm tra tồn tại). Dùng cho: đếm tần suất, tìm duplicate, Two Sum pattern (complement lookup), grouping (anagrams). Trả giá space O(n) đổi lấy time O(1) — space-time tradeoff kinh điển.">
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

                <TopicModal title="Stack / Queue" emoji="📚" color="#4ade80" summary="⭐ Bắt buộc — valid parentheses, BFS, monotonic stack" concept="Stack: LIFO (Last In First Out) — push/pop O(1). Dùng cho: valid parentheses, undo/redo, DFS, expression evaluation, monotonic stack (next greater element). Queue: FIFO (First In First Out) — enqueue/dequeue O(1). Dùng cho: BFS, task scheduling, sliding window maximum. Call Stack của JS chính là stack.">
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

                <TopicModal title="Linked List" emoji="🔗" color="#60a5fa" summary="⭐⭐ Quan trọng — reverse, cycle detect, merge sorted lists" concept="Linked List: mỗi node chứa data + pointer đến node tiếp. Insert/delete O(1) tại vị trí biết nhưng search O(n). Patterns: reverse (3 pointers: prev, curr, next), fast-slow pointers (cycle detection, find middle), merge two sorted lists. Singly vs Doubly (2 chiều). Ít dùng thực tế nhưng interview hỏi nhiều vì test pointer manipulation.">
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

                <TopicModal title="Tree / Binary Tree" emoji="🌳" color="#60a5fa" summary="⭐⭐ Quan trọng — DFS, BFS, DOM tree, BST" concept="Tree: cấu trúc phân cấp với root và children (DOM là tree!). Binary Tree: mỗi node tối đa 2 con. BST: left < root < right — search O(log n). Duyệt: DFS (Inorder=sorted, Preorder=copy, Postorder=delete) và BFS (level-by-level). Patterns: đệ quy (base case + recursive case), height/depth, LCA, validate BST.">
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

                <TopicModal title="Graph" emoji="🕸️" color="#60a5fa" summary="⭐⭐ Quan trọng — BFS/DFS, cycle detection, topological sort" concept="Graph gồm vertices (nodes) và edges (connections). Biểu diễn: adjacency list (phổ biến) hoặc adjacency matrix. DFS: đi sâu trước (stack/đệ quy). BFS: đi rộng trước (queue) — tìm shortest path. Directed vs Undirected. Cycle detection: DFS với visited states. Topological Sort: thứ tự phụ thuộc (task scheduling, build systems).">
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

                <TopicModal title="Heap / Trie" emoji="⛰️" color="#a78bfa" summary="⭐⭐⭐ Nâng cao — Top K elements, autocomplete, priority queue" concept="Heap (Priority Queue): luôn lấy min/max trong O(1), insert/extract O(log n). Dùng cho: Top K elements, merge K sorted lists, median finder. Min-heap: root nhỏ nhất, Max-heap: root lớn nhất. Trie (Prefix Tree): lưu từ theo từng ký tự, search prefix O(m). Dùng cho: autocomplete, spell check, word search.">
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
                <TopicModal title="Hash Map / Hash Set" emoji="🗂️" color="#4ade80" summary="~15 bài — pattern dùng nhiều nhất, gần như mọi interview đều có" concept="Pattern: dùng hash map/set để biến O(n²) thành O(n). Bài kinh điển: Two Sum (lưu complement), Group Anagrams (sorted key), Valid Sudoku, Contains Duplicate, Longest Consecutive Sequence. Kỹ thuật: frequency map, complement lookup, seen set, counter comparison.">
                    <Paragraph>Dùng khi: cần <Highlight>lookup O(1)</Highlight>, đếm frequency, tìm pair/complement, loại bỏ duplicates, hoặc group theo key.</Paragraph>

                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">🔧 HashMap hoạt động thế nào?</div>
                            <div className="text-slate-300 text-sm mt-1">
                                <strong>Cốt lõi:</strong> Key → <InlineCode>hash(key)</InlineCode> → index → Array[index] = Value<br /><br />
                                1. <strong>Hash</strong>: lấy key → chạy qua hash function → ra 1 con số (hash code)<br />
                                2. <strong>Index</strong>: <InlineCode>hashCode % arraySize</InlineCode> → ra index trong array<br />
                                3. <strong>Store</strong>: lưu <InlineCode>{'{key, value}'}</InlineCode> vào <InlineCode>array[index]</InlineCode>
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                            <div className="text-yellow-400 font-bold text-sm">💥 Hash Collision (2 keys cùng index)</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Chaining</strong> (phổ biến): mỗi slot là 1 linked list. Collision → append vào list<br />
                                • <strong>Open Addressing</strong>: collision → tìm slot trống tiếp theo (linear/quadratic probing)<br />
                                • Ví dụ: <InlineCode>hash(&quot;name&quot;) % 8 = 3</InlineCode>, <InlineCode>hash(&quot;email&quot;) % 8 = 3</InlineCode> → collision! → cả 2 nằm trong linked list ở slot 3
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">⏱️ Time Complexity</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Get / Set / Delete / Has</strong>: Average <InlineCode>O(1)</InlineCode> | Worst <InlineCode>O(n)</InlineCode> (nhiều collision)<br />
                                • <strong>Load Factor</strong> = số phần tử / array size. Khi &gt; 0.75 → <strong>resize x2</strong> + rehash tất cả<br />
                                • Resize expensive nhưng <strong>amortized O(1)</strong> — xảy ra rất hiếm
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <div className="text-purple-400 font-bold text-sm">📦 Trong JS: Map vs Object</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Object</strong>: keys chỉ là string/symbol. Không có <InlineCode>.size</InlineCode>. Prototype pollution risk<br />
                                • <strong>Map</strong>: keys là <strong>BẤT KỲ type</strong> nào (object, number, function). Có <InlineCode>.size</InlineCode>. Ordered insertion<br />
                                • <strong>Set</strong>: chỉ lưu keys (không value). Dùng cho: check duplicate, unique values<br />
                                • <strong>WeakMap</strong>: keys must be objects. Weak reference → allows GC
                            </div>
                        </div>
                    </div>

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

                <TopicModal title="Two Pointers" emoji="👉👈" color="#4ade80" summary="~15 bài — dùng 2 con trỏ di chuyển trên sorted array hoặc linked list" concept="Dùng 2 con trỏ di chuyển trên array/string: same direction (fast-slow, cùng chiều) hoặc opposite direction (hai đầu). Bài kinh điển: Two Sum II (sorted), 3Sum, Container With Most Water, Remove Duplicates, Valid Palindrome. Điều kiện: thường dùng trên sorted array hoặc khi cần so sánh cặp phần tử.">
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

                <TopicModal title="Sliding Window" emoji="🪟" color="#4ade80" summary="~10 bài — tìm substring/subarray tối ưu với fixed hoặc variable window" concept="Di chuyển 'cửa sổ' trên array/string: mở rộng right, thu hẹp left khi vi phạm điều kiện. Fixed window: size cố định (max sum k elements). Variable window: co giãn theo điều kiện (longest substring without repeating). Bài kinh điển: Minimum Window Substring, Longest Substring Without Repeating Characters, Maximum Average Subarray.">
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

                <TopicModal title="BFS / DFS" emoji="🌲" color="#4ade80" summary="~20 bài — duyệt đồ thị và cây, quan trọng nhất cho Frontend (DOM tree!)" concept="DFS (đệ quy/stack): đi sâu hết nhanh trước, quay lại — dùng cho path finding, connected components, tree traversal. BFS (queue): đi theo từng level — dùng cho shortest path, level-order traversal. Frontend: DOM traversal là DFS, React reconciliation là DFS. Bài: Number of Islands, Max Depth of Binary Tree, Level Order.">
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

                <TopicModal title="Binary Search" emoji="🔍" color="#4ade80" summary="~10 bài — O(log n) search, không chỉ trên sorted array" concept="Chia đôi không gian tìm kiếm mỗi bước → O(log n). Không chỉ trên sorted array — dùng được bất kỳ khi có monotonic condition (có thể loại nửa không gian). Template: left, right, while left <= right, mid = Math.floor((left+right)/2). Bài: Search in Rotated Array, Find Peak, Koko Eating Bananas.">
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

                <TopicModal title="Dynamic Programming" emoji="📊" color="#4ade80" summary="~15 bài Easy-Medium — phần khó nhất nhưng có pattern rõ ràng" concept="DP = chia bài toán thành sub-problems nhỏ hơn, lưu kết quả (memoization/tabulation) để không tính lại. 5 bước: định nghĩa state, viết recurrence relation, xác định base cases, xác định thứ tự tính, optimize space. Patterns: 1D (Fibonacci, climbing stairs), 2D (grid paths, knapsack), string (LCS, edit distance).">
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

                <TopicModal title="Backtracking" emoji="🔙" color="#4ade80" summary="~10 bài — generate all combinations, permutations, subsets" concept="Backtracking = thử tất cả khả năng, quay lại khi không hợp lệ. Template: choose → explore → unchoose (backtrack). Bài kinh điển: Subsets, Permutations, Combinations, N-Queens, Word Search. Khác với DFS: backtracking có bước 'unchoose' (định hướng quyết định), DFS chỉ duyệt.">
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

                <TopicModal title="Stack-based" emoji="📚" color="#4ade80" summary="~10 bài — monotonic stack, valid parentheses, expression eval" concept="Monotonic Stack: giữ stack tăng/giảm dần — tìm next greater/smaller element trong O(n). Valid Parentheses: push open, pop when close matches. Expression evaluation: 2 stacks (operators + operands) hoặc postfix conversion. Bài: Daily Temperatures, Next Greater Element, Largest Rectangle in Histogram.">
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

            <Heading3>4.3 Framework giải bài — 5 Bước</Heading3>
            <Paragraph>
                Trước khi nhảy vào code, <Highlight>luôn đi qua 5 bước này</Highlight> — đây là cách interviewer đánh giá bạn, không chỉ kết quả cuối cùng.
            </Paragraph>

            <div className="my-4 flex flex-col items-center gap-2 text-sm">
                <div className="px-4 py-2.5 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30 w-fit">
                    <strong>1. Understand the Problem</strong> — Đọc kỹ, hỏi clarify, viết examples
                </div>
                <div className="text-slate-600">↓</div>
                <div className="px-4 py-2.5 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30 w-fit">
                    <strong>2. Design Solutions</strong> — Brute force trước → tối ưu sau
                </div>
                <div className="text-slate-600">↓</div>
                <div className="px-4 py-2.5 rounded-lg bg-green-500/20 text-green-300 border border-green-500/30 w-fit">
                    <strong>3. Implement</strong> — Viết code sạch, đặt tên biến rõ ràng
                </div>
                <div className="text-slate-600">↓</div>
                <div className="px-4 py-2.5 rounded-lg bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 w-fit">
                    <strong>4. Test</strong> — Walk through manually từng bước với example
                </div>
                <div className="text-slate-600">↓</div>
                <div className="px-4 py-2.5 rounded-lg bg-red-500/20 text-red-300 border border-red-500/30 w-fit">
                    <strong>5. Optimize?</strong> — Có cách nào tốt hơn O(n²)? Space trade-off?
                </div>
            </div>

            <div className="my-4 space-y-2">
                <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <div className="text-blue-400 font-bold text-sm">📝 Bước 1: Understand — Hỏi CÁI GÌ trước khi code</div>
                    <div className="text-slate-300 text-sm mt-1">
                        • Input format? Sorted? Có duplicates không?<br />
                        • Output format? Return gì? Index hay value?<br />
                        • Edge cases: empty array, 1 element, all same values?<br />
                        • Constraints: n lớn bao nhiêu? → ảnh hưởng time complexity
                    </div>
                </div>
                <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                    <div className="text-purple-400 font-bold text-sm">💡 Bước 2: Design — Nói approach TRƯỚC khi code</div>
                    <div className="text-slate-300 text-sm mt-1">
                        • <strong>Brute force</strong>: giải bằng cách đơn giản nhất (thường O(n²))<br />
                        • <strong>Optimize</strong>: dùng HashMap? Two Pointers? Sliding Window?<br />
                        • Nói <Highlight>time + space complexity</Highlight> cho mỗi approach<br />
                        • Interviewer muốn nghe bạn <strong>so sánh trade-off</strong>
                    </div>
                </div>
                <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                    <div className="text-yellow-400 font-bold text-sm">🧪 Bước 4: Test — Walk through TỪNG BƯỚC</div>
                    <div className="text-slate-300 text-sm mt-1">
                        • Lấy example nhỏ, chạy tay qua code<br />
                        • Ghi giá trị biến ở mỗi bước (như debugger)<br />
                        • Test edge cases: empty, 1 phần tử, tất cả giống nhau<br />
                        • <Highlight>Rất nhiều candidate bỏ qua bước này</Highlight> → mất điểm
                    </div>
                </div>
            </div>

            <Callout type="tip">
                Ví dụ walk-through: <Highlight>Tìm subarray dài nhất có cùng giá trị</Highlight>
            </Callout>

            <CodeBlock title="example-walkthrough.ts">{`// Bài: Tìm length of longest subarray with same value
// Input: [7, 3, 3, 3, 2, 2, 2, 2]

// Bước 1: Understand
// - Input: number[], Output: number (length)  
// - Subarray = contiguous, same value
// - Edge: [5] → 1, [] → 0

// Bước 2: Design → Two Pointers (L, R)
// L đứng đầu group, R mở rộng sang phải khi giá trị giống  
// Time: O(n), Space: O(1)

function longestSameValueSubarray(arr: number[]): number {
    let maxLen = 0
    let L = 0
    
    while (L < arr.length) {
        let R = L
        while (R < arr.length && arr[R] === arr[L]) R++
        maxLen = Math.max(maxLen, R - L)
        L = R  // nhảy đến group tiếp
    }
    return maxLen
}

// Bước 4: Test — walk through manually
// arr = [7, 3, 3, 3, 2, 2, 2, 2]
//
// L=0, R=0→1 (arr[1]=3≠7) → len=1, maxLen=1, L=1
// L=1, R=1→2→3→4 (arr[4]=2≠3) → len=3, maxLen=3, L=4  
// L=4, R=4→5→6→7→8 (hết) → len=4, maxLen=4, L=8
//
// ✅ Answer: 4 (subarray [2,2,2,2])

// Bước 5: Optimize? → Đã O(n) + O(1) → optimal rồi!`}</CodeBlock>

            <Callout type="warning">
                Interview: bạn sẽ bị đánh giá <Highlight>cả 5 bước</Highlight>, không chỉ code chạy đúng.
                Nhiều người code xong không test → interviewer hỏi {`"Bạn đã verify chưa?"`} → mất điểm.
            </Callout>

            <Heading3>4.4 Chiến lược LeetCode</Heading3>
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
        </>
    )
}
