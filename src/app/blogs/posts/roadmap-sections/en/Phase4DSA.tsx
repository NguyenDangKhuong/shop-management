'use client'
import { CodeBlock, Heading2, Heading3, Paragraph, Highlight, InlineCode, Callout } from '../../../components/BlogComponents'
import { TopicModal } from '../../../components/TopicModal'
import { toLeetCodeSlug } from '../../utils'

export default function Phase4DSA() {
    return (
        <>
            <Heading2>Phase 4 — Data Structures & Algorithms (6-8 weeks)</Heading2>

            <Paragraph>
                The part <Highlight>most people fear</Highlight> but also <Highlight>mandatory</Highlight> at big tech.
                Frontend engineers also do DSA — but difficulty is usually one level easier than backend.
            </Paragraph>

            <Heading3>4.1 Data Structures (click for details)</Heading3>
            <a href="/blogs/data-types-structures" target="_blank" rel="noopener noreferrer" className="mb-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 Read Data Types &amp; Structures article →</a>
            <div className="my-4 space-y-2">
                <TopicModal title="Array / String" emoji="📦" color="#4ade80" summary="⭐ Must know — foundation of all DSA problems, two pointers, sliding window" concept="Array stores data contiguously in memory, O(1) access by index but O(n) insert/delete. String is an immutable array of chars. Key patterns: Two Pointers (sorted array), Sliding Window (subarray/substring), Prefix Sum (range queries), Kadane's (max subarray). Most DSA problems involve arrays/strings.">
                    <Paragraph><Highlight>Array</Highlight> stores elements contiguously in memory → O(1) access by index. <Highlight>String</Highlight> in JS is immutable — each change creates a new string.</Paragraph>
                    <div className="my-3 overflow-x-auto">
                        <table className="w-full text-sm border-collapse">
                            <thead><tr className="border-b border-border-primary"><th className="text-left p-2 text-slate-400">Operation</th><th className="text-left p-2 text-slate-400">Time</th><th className="text-left p-2 text-slate-400">Note</th></tr></thead>
                            <tbody className="text-text-secondary">
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

                <TopicModal title="HashMap / HashSet" emoji="🗂️" color="#4ade80" summary="⭐ Must know — frequency count, cache, O(1) lookup" concept="HashMap stores key-value pairs, O(1) average lookup/insert/delete. HashSet stores keys only (existence check). Use for: frequency counting, finding duplicates, Two Sum pattern (complement lookup), grouping (anagrams). Trade O(n) space for O(1) time — classic space-time tradeoff.">
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

                <TopicModal title="Stack / Queue" emoji="📚" color="#4ade80" summary="⭐ Must know — valid parentheses, BFS, monotonic stack" concept="Stack: LIFO (Last In First Out) — push/pop O(1). Used for: valid parentheses, undo/redo, DFS, expression evaluation, monotonic stack (next greater element). Queue: FIFO (First In First Out) — enqueue/dequeue O(1). Used for: BFS, task scheduling, sliding window maximum. JS Call Stack is literally a stack.">
                    <Paragraph><Highlight>Stack</Highlight> = LIFO (Last In First Out), <Highlight>Queue</Highlight> = FIFO (First In First Out). Simple yet powerful.</Paragraph>
                    <div className="my-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-4">
                            <div className="text-blue-400 font-bold text-sm mb-2">📚 Stack (LIFO)</div>
                            <ul className="text-text-secondary text-xs space-y-1">
                                <li>• push / pop: O(1)</li>
                                <li>• Valid Parentheses</li>
                                <li>• Undo / Redo</li>
                                <li>• Call Stack, DFS</li>
                            </ul>
                        </div>
                        <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-4">
                            <div className="text-green-400 font-bold text-sm mb-2">🚶 Queue (FIFO)</div>
                            <ul className="text-text-secondary text-xs space-y-1">
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

                <TopicModal title="Linked List" emoji="🔗" color="#60a5fa" summary="⭐⭐ Important — reverse, cycle detect, merge sorted lists" concept="Linked List: each node contains data + pointer to next node. Insert/delete O(1) at known position but search O(n). Patterns: reverse (3 pointers: prev, curr, next), fast-slow pointers (cycle detection, find middle), merge two sorted lists. Singly vs Doubly linked. Rarely used in practice but frequently asked because it tests pointer manipulation.">
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

                <TopicModal title="Tree / Binary Tree" emoji="🌳" color="#60a5fa" summary="⭐⭐ Important — DFS, BFS, DOM tree, BST" concept="Tree: hierarchical structure with root and children (DOM is a tree!). Binary Tree: each node has at most 2 children. BST: left < root < right — search O(log n). Traversal: DFS (Inorder=sorted, Preorder=copy, Postorder=delete) and BFS (level-by-level). Patterns: recursion (base case + recursive case), height/depth, LCA, validate BST.">
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

                <TopicModal title="Graph" emoji="🕸️" color="#60a5fa" summary="⭐⭐ Important — BFS/DFS, cycle detection, topological sort" concept="Graph consists of vertices (nodes) and edges (connections). Representation: adjacency list (most common) or adjacency matrix. DFS: go deep first (stack/recursion). BFS: go wide first (queue) — finds shortest path. Directed vs Undirected. Cycle detection: DFS with visited states. Topological Sort: dependency ordering (task scheduling, build systems).">
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

                <TopicModal title="Heap / Trie" emoji="⛰️" color="#a78bfa" summary="⭐⭐⭐ Advanced — Top K elements, autocomplete, priority queue" concept="Heap (Priority Queue): always get min/max in O(1), insert/extract O(log n). Used for: Top K elements, merge K sorted lists, median finder. Min-heap: smallest at root, Max-heap: largest at root. Trie (Prefix Tree): stores words character by character, prefix search O(m). Used for: autocomplete, spell check, word search.">
                    <Paragraph><Highlight>Heap</Highlight> = get min/max O(1), insert/delete O(log n). <Highlight>Trie</Highlight> = prefix-based search.</Paragraph>
                    <div className="my-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="rounded-xl bg-yellow-500/10 border border-yellow-500/20 p-4">
                            <div className="text-yellow-400 font-bold text-sm mb-2">⛰️ Heap</div>
                            <ul className="text-text-secondary text-xs space-y-1">
                                <li>• Top K elements</li>
                                <li>• Merge K sorted lists</li>
                                <li>• Median of stream</li>
                                <li>• JS: no built-in!</li>
                            </ul>
                        </div>
                        <div className="rounded-xl bg-purple-500/10 border border-purple-500/20 p-4">
                            <div className="text-purple-400 font-bold text-sm mb-2">🔤 Trie</div>
                            <ul className="text-text-secondary text-xs space-y-1">
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
                <TopicModal title="Hash Map / Hash Set" emoji="🗂️" color="#4ade80" summary="~15 problems — the most used pattern, almost every interview includes it" concept="Pattern: use hash map/set to convert O(n²) to O(n). Classic problems: Two Sum (store complement), Group Anagrams (sorted key), Valid Sudoku, Contains Duplicate, Longest Consecutive Sequence. Techniques: frequency map, complement lookup, seen set, counter comparison.">
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
                            <div key={level as string} className="p-2.5 rounded-lg bg-bg-tag border border-gray-200">
                                <div className={`text-xs font-bold mb-1 ${level === 'Easy' ? 'text-green-400' : 'text-yellow-400'}`}>{level as string}</div>
                                <div className="text-slate-300 text-xs space-y-0.5">{(problems as string[]).map(p => <div key={p}>• <a href={`https://leetcode.com/problems/${toLeetCodeSlug(p as string)}/`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{p as string}</a></div>)}</div>
                            </div>
                        ))}
                    </div>
                    <Callout type="tip">When a problem requires &quot;find in O(n)&quot; or &quot;count frequency&quot; → think HashMap. This is the <Highlight>most fundamental pattern</Highlight> — most other patterns combine with HashMap.</Callout>
                    <a href="/blogs/hash-map-pattern" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 Read detailed article →</a>
                </TopicModal>

                <TopicModal title="Two Pointers" emoji="👉👈" color="#4ade80" summary="~15 problems — use 2 pointers moving on sorted array or linked list" concept="Use 2 pointers moving on array/string: same direction (fast-slow) or opposite direction (from both ends). Classic problems: Two Sum II (sorted), 3Sum, Container With Most Water, Remove Duplicates, Valid Palindrome. Condition: usually applied on sorted arrays or when comparing pairs of elements.">
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
                            <div key={level as string} className="p-2.5 rounded-lg bg-bg-tag border border-gray-200">
                                <div className={`text-xs font-bold mb-1 ${level === 'Easy' ? 'text-green-400' : 'text-yellow-400'}`}>{level as string}</div>
                                <div className="text-slate-300 text-xs space-y-0.5">{(problems as string[]).map(p => <div key={p}>• <a href={`https://leetcode.com/problems/${toLeetCodeSlug(p as string)}/`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{p as string}</a></div>)}</div>
                            </div>
                        ))}
                    </div>
                    <Callout type="tip">2 main types: <Highlight>Opposite ends</Highlight> (sorted, find pair) and <Highlight>Same direction</Highlight> (fast/slow, remove duplicates). Think: &quot;Which element can I eliminate?&quot;</Callout>
                    <a href="/blogs/two-pointers-pattern" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 Read detailed article →</a>
                </TopicModal>

                <TopicModal title="Sliding Window" emoji="🪟" color="#4ade80" summary="~10 problems — find optimal substring/subarray with fixed or variable window" concept="Move a 'window' over array/string: expand right, shrink left when condition is violated. Fixed window: constant size (max sum of k elements). Variable window: expands/shrinks based on condition (longest substring without repeating). Classic: Minimum Window Substring, Longest Substring Without Repeating Characters, Maximum Average Subarray.">
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
                            <div key={level as string} className="p-2.5 rounded-lg bg-bg-tag border border-gray-200">
                                <div className={`text-xs font-bold mb-1 ${level === 'Easy' ? 'text-green-400' : level === 'Medium' ? 'text-yellow-400' : 'text-red-400'}`}>{level as string}</div>
                                <div className="text-slate-300 text-xs space-y-0.5">{(problems as string[]).map(p => <div key={p}>• <a href={`https://leetcode.com/problems/${toLeetCodeSlug(p as string)}/`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{p as string}</a></div>)}</div>
                            </div>
                        ))}
                    </div>
                    <Callout type="tip">2 types: <Highlight>Fixed window</Highlight> (size k) and <Highlight>Variable window</Highlight> (expand right, shrink left when invalid). Often combined with HashMap for frequency tracking.</Callout>
                    <a href="/blogs/sliding-window-pattern" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 Read detailed article →</a>
                </TopicModal>

                <TopicModal title="BFS / DFS" emoji="🌲" color="#4ade80" summary="~20 problems — graph and tree traversal, most important for Frontend (DOM tree!)" concept="DFS (recursion/stack): go deep first, backtrack — used for path finding, connected components, tree traversal. BFS (queue): go level by level — used for shortest path, level-order traversal. Frontend: DOM traversal is DFS, React reconciliation is DFS. Problems: Number of Islands, Max Depth of Binary Tree, Level Order.">
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
                            <div key={level as string} className="p-2.5 rounded-lg bg-bg-tag border border-gray-200">
                                <div className={`text-xs font-bold mb-1 ${level === 'Easy' ? 'text-green-400' : level === 'Medium' ? 'text-yellow-400' : 'text-red-400'}`}>{level as string}</div>
                                <div className="text-slate-300 text-xs space-y-0.5">{(problems as string[]).map(p => <div key={p}>• <a href={`https://leetcode.com/problems/${toLeetCodeSlug(p as string)}/`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{p as string}</a></div>)}</div>
                            </div>
                        ))}
                    </div>
                    <Callout type="tip"><strong>BFS</strong> = Queue (level order, shortest path). <strong>DFS</strong> = Recursion (tree, backtrack). Grid: DFS + mark visited. FE interviews prefer DFS — relates to DOM.</Callout>
                    <a href="/blogs/bfs-dfs-pattern" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 Read detailed article →</a>
                </TopicModal>

                <TopicModal title="Binary Search" emoji="🔍" color="#4ade80" summary="~10 problems — O(log n) search, not just on sorted arrays" concept="Halve the search space each step → O(log n). Not just for sorted arrays — works whenever there's a monotonic condition (can eliminate half the space). Template: left, right, while left <= right, mid = Math.floor((left+right)/2). Problems: Search in Rotated Array, Find Peak, Koko Eating Bananas.">
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
                            <div key={level as string} className="p-2.5 rounded-lg bg-bg-tag border border-gray-200">
                                <div className={`text-xs font-bold mb-1 ${level === 'Easy' ? 'text-green-400' : 'text-yellow-400'}`}>{level as string}</div>
                                <div className="text-slate-300 text-xs space-y-0.5">{(problems as string[]).map(p => <div key={p}>• <a href={`https://leetcode.com/problems/${toLeetCodeSlug(p as string)}/`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{p as string}</a></div>)}</div>
                            </div>
                        ))}
                    </div>
                    <Callout type="tip">3 types: <Highlight>Classic</Highlight> (find exact), <Highlight>Bisect left/right</Highlight> (find boundary), <Highlight>Search on answer</Highlight> (binary search on result). When you see O(log n) → think Binary Search.</Callout>
                    <a href="/blogs/binary-search-pattern" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 Read detailed article →</a>
                </TopicModal>

                <TopicModal title="Dynamic Programming" emoji="📊" color="#4ade80" summary="~15 Easy-Medium problems — hardest part but has clear patterns" concept="DP = break problems into smaller sub-problems, store results (memoization/tabulation) to avoid recomputation. 5 steps: define state, write recurrence relation, identify base cases, determine computation order, optimize space. Patterns: 1D (Fibonacci, climbing stairs), 2D (grid paths, knapsack), string (LCS, edit distance).">
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
                            <div key={level as string} className="p-2.5 rounded-lg bg-bg-tag border border-gray-200">
                                <div className={`text-xs font-bold mb-1 ${level === 'Easy' ? 'text-green-400' : 'text-yellow-400'}`}>{level as string}</div>
                                <div className="text-slate-300 text-xs space-y-0.5">{(problems as string[]).map(p => <div key={p}>• <a href={`https://leetcode.com/problems/${toLeetCodeSlug(p as string)}/`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{p as string}</a></div>)}</div>
                            </div>
                        ))}
                    </div>
                    <Callout type="tip">4 common DP types: <Highlight>1D linear</Highlight> (Climbing Stairs), <Highlight>Take/Skip</Highlight> (House Robber), <Highlight>Knapsack</Highlight> (Coin Change), <Highlight>Subsequence</Highlight> (LIS). Start with 1D DP first.</Callout>
                    <a href="/blogs/dynamic-programming-pattern" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 Read detailed article →</a>
                </TopicModal>

                <TopicModal title="Backtracking" emoji="🔙" color="#4ade80" summary="~10 problems — generate all combinations, permutations, subsets" concept="Backtracking = try all possibilities, backtrack when invalid. Template: choose → explore → unchoose (backtrack). Classic problems: Subsets, Permutations, Combinations, N-Queens, Word Search. Unlike DFS: backtracking has an 'unchoose' step (decision-oriented), DFS just traverses.">
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
                            <div key={level as string} className="p-2.5 rounded-lg bg-bg-tag border border-gray-200">
                                <div className={`text-xs font-bold mb-1 ${level === 'Medium' ? 'text-yellow-400' : 'text-red-400'}`}>{level as string}</div>
                                <div className="text-slate-300 text-xs space-y-0.5">{(problems as string[]).map(p => <div key={p}>• <a href={`https://leetcode.com/problems/${toLeetCodeSlug(p as string)}/`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{p as string}</a></div>)}</div>
                            </div>
                        ))}
                    </div>
                    <Callout type="tip">Template: <InlineCode>backtrack(start, path)</InlineCode> → push → recurse → pop. 3 types: <Highlight>Subsets</Highlight> (start = i+1), <Highlight>Permutations</Highlight> (used set), <Highlight>Combinations</Highlight> (count to k).</Callout>
                </TopicModal>

                <TopicModal title="Stack-based" emoji="📚" color="#4ade80" summary="~10 problems — monotonic stack, valid parentheses, expression eval" concept="Monotonic Stack: maintains increasing/decreasing order — finds next greater/smaller element in O(n). Valid Parentheses: push open brackets, pop when closing bracket matches. Expression evaluation: 2 stacks (operators + operands) or postfix conversion. Problems: Daily Temperatures, Next Greater Element, Largest Rectangle in Histogram.">
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
                            <div key={level as string} className="p-2.5 rounded-lg bg-bg-tag border border-gray-200">
                                <div className={`text-xs font-bold mb-1 ${level === 'Easy' ? 'text-green-400' : level === 'Medium' ? 'text-yellow-400' : 'text-red-400'}`}>{level as string}</div>
                                <div className="text-slate-300 text-xs space-y-0.5">{(problems as string[]).map(p => <div key={p}>• <a href={`https://leetcode.com/problems/${toLeetCodeSlug(p as string)}/`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{p as string}</a></div>)}</div>
                            </div>
                        ))}
                    </div>
                    <Callout type="tip">3 types: <Highlight>Matching</Highlight> (brackets, tags), <Highlight>Monotonic stack</Highlight> (next greater/smaller), <Highlight>Expression eval</Highlight> (decode, RPN). Trick: when pushing new &gt; top → pop and process.</Callout>
                    <a href="/blogs/stack-pattern" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 Read detailed article →</a>
                </TopicModal>
            </div>

            <Heading3>4.3 Problem-Solving Framework — 5 Steps</Heading3>
            <Paragraph>
                Before jumping into code, <Highlight>always follow these 5 steps</Highlight> — this is how interviewers evaluate you, not just the final result.
            </Paragraph>

            <div className="my-4 flex flex-col items-center gap-2 text-sm">
                <div className="px-4 py-2.5 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30 w-fit">
                    <strong>1. Understand the Problem</strong> — Read carefully, ask clarifying questions, write examples
                </div>
                <div className="text-slate-600">↓</div>
                <div className="px-4 py-2.5 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30 w-fit">
                    <strong>2. Design Solutions</strong> — Brute force first → optimize later
                </div>
                <div className="text-slate-600">↓</div>
                <div className="px-4 py-2.5 rounded-lg bg-green-500/20 text-green-300 border border-green-500/30 w-fit">
                    <strong>3. Implement</strong> — Write clean code with clear variable names
                </div>
                <div className="text-slate-600">↓</div>
                <div className="px-4 py-2.5 rounded-lg bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 w-fit">
                    <strong>4. Test</strong> — Manually walk through each step with an example
                </div>
                <div className="text-slate-600">↓</div>
                <div className="px-4 py-2.5 rounded-lg bg-red-500/20 text-red-300 border border-red-500/30 w-fit">
                    <strong>5. Optimize?</strong> — Is there a better approach than O(n²)? Space trade-offs?
                </div>
            </div>

            <div className="my-4 space-y-2">
                <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <div className="text-blue-400 font-bold text-sm">📝 Step 1: Understand — Ask WHAT before you code</div>
                    <div className="text-slate-300 text-sm mt-1">
                        • Input format? Sorted? Has duplicates?<br />
                        • Output format? Return what? Index or value?<br />
                        • Edge cases: empty array, 1 element, all same values?<br />
                        • Constraints: how large is n? → affects time complexity
                    </div>
                </div>
                <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                    <div className="text-purple-400 font-bold text-sm">💡 Step 2: Design — Describe approach BEFORE coding</div>
                    <div className="text-slate-300 text-sm mt-1">
                        • <strong>Brute force</strong>: solve the simplest way (usually O(n²))<br />
                        • <strong>Optimize</strong>: use HashMap? Two Pointers? Sliding Window?<br />
                        • State <Highlight>time + space complexity</Highlight> for each approach<br />
                        • Interviewers want to hear you <strong>compare trade-offs</strong>
                    </div>
                </div>
                <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                    <div className="text-yellow-400 font-bold text-sm">🧪 Step 4: Test — Walk through STEP BY STEP</div>
                    <div className="text-slate-300 text-sm mt-1">
                        • Take a small example, run through code manually<br />
                        • Write variable values at each step (like a debugger)<br />
                        • Test edge cases: empty, 1 element, all identical<br />
                        • <Highlight>Many candidates skip this step</Highlight> → lose points
                    </div>
                </div>
            </div>

            <Callout type="tip">
                Walk-through example: <Highlight>Find the longest subarray with the same value</Highlight>
            </Callout>

            <CodeBlock title="example-walkthrough.ts">{`// Problem: Find length of longest subarray with same value
// Input: [7, 3, 3, 3, 2, 2, 2, 2]

// Step 1: Understand
// - Input: number[], Output: number (length)  
// - Subarray = contiguous, same value
// - Edge: [5] → 1, [] → 0

// Step 2: Design → Two Pointers (L, R)
// L starts at group head, R expands right while value matches  
// Time: O(n), Space: O(1)

function longestSameValueSubarray(arr: number[]): number {
    let maxLen = 0
    let L = 0
    
    while (L < arr.length) {
        let R = L
        while (R < arr.length && arr[R] === arr[L]) R++
        maxLen = Math.max(maxLen, R - L)
        L = R  // jump to next group
    }
    return maxLen
}

// Step 4: Test — walk through manually
// arr = [7, 3, 3, 3, 2, 2, 2, 2]
//
// L=0, R=0→1 (arr[1]=3≠7) → len=1, maxLen=1, L=1
// L=1, R=1→2→3→4 (arr[4]=2≠3) → len=3, maxLen=3, L=4  
// L=4, R=4→5→6→7→8 (end) → len=4, maxLen=4, L=8
//
// ✅ Answer: 4 (subarray [2,2,2,2])

// Step 5: Optimize? → Already O(n) + O(1) → optimal!`}</CodeBlock>

            <Callout type="warning">
                Interview: you are evaluated on <Highlight>all 5 steps</Highlight>, not just working code.
                Many people finish coding without testing → interviewer asks {`"Have you verified?"`} → lose points.
            </Callout>

            <Heading3>4.4 LeetCode Strategy</Heading3>
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
        </>
    )
}
