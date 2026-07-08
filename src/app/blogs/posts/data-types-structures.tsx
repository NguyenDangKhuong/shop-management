import { Callout, CodeBlock, Heading2, Highlight, InlineCode, Paragraph } from '../components/BlogComponents'
import { BlogPost } from '../types'

const dataTypesStructures: BlogPost = {
    slug: 'data-types-structures',
    title: {
        vi: 'Kiểu dữ liệu JS/TS & Cấu trúc dữ liệu cho giải thuật',
        en: 'JS/TS Data Types & Data Structures for Algorithms',
    },
    description: {
        vi: 'Từ kiểu cơ bản (string, number, boolean) đến nâng cao (Map, Set, WeakMap) và các cấu trúc dữ liệu tự implement cho giải thuật: Stack, Queue, LinkedList, Heap, Trie, Graph.',
        en: 'From primitive types (string, number, boolean) to advanced (Map, Set, WeakMap) and self-implemented data structures for algorithms: Stack, Queue, LinkedList, Heap, Trie, Graph.',
    },
    date: '2025-01-27',
    tags: ['JavaScript', 'TypeScript', 'Data Structures', 'Algorithms'],
    emoji: '🧮',
    color: '#3178c6',
    content: {
        vi: (
            <>
                <Paragraph>
                    Hiểu rõ <Highlight>kiểu dữ liệu</Highlight> là nền tảng để viết code tốt và giải thuật hiệu quả.
                    Bài viết này đi từ cơ bản đến nâng cao, bao gồm cả các cấu trúc dữ liệu tự implement cho LeetCode.
                </Paragraph>

                {/* ===== PRIMITIVE TYPES ===== */}
                <Heading2>📌 Kiểu dữ liệu cơ bản (Primitives)</Heading2>

                <CodeBlock title="primitives.ts">{`// 7 kiểu primitive trong JavaScript
// Đặc điểm: immutable, so sánh bằng value, truyền by value

// 1. string
const name: string = 'Khuong'
const template = \`Hello \${name}\`    // template literal
const multiline = \`Line 1
Line 2\`

// String methods thường dùng cho giải thuật
'hello'.charAt(0)          // 'h'
'hello'.charCodeAt(0)      // 104 (ASCII)
String.fromCharCode(104)   // 'h'
'hello'.split('')          // ['h','e','l','l','o']
'hello'.includes('ell')    // true
'hello'.indexOf('l')       // 2
'hello'.slice(1, 3)        // 'el'
'hello'.substring(1, 3)    // 'el'
'  hi  '.trim()            // 'hi'
'hello'.replace(/l/g, 'L') // 'heLLo'
'hello'.repeat(2)          // 'hellohello'
'hello'.startsWith('he')   // true
'abc'.localeCompare('abd') // -1
'hello'.at(-1)             // 'o'

// 2. number (64-bit floating point)
const int: number = 42
const float: number = 3.14
const hex: number = 0xFF       // 255
const binary: number = 0b1010  // 10
const max = Number.MAX_SAFE_INTEGER  // 2^53 - 1

// Number methods cho giải thuật
Math.floor(3.7)    // 3
Math.ceil(3.2)     // 4
Math.round(3.5)    // 4
Math.trunc(3.7)    // 3 (cắt phần thập phân)
Math.abs(-5)       // 5
Math.max(1, 2, 3)  // 3
Math.min(1, 2, 3)  // 1
Math.pow(2, 10)    // 1024
parseInt('42px')   // 42
parseFloat('3.14') // 3.14
Number.isInteger(3.0)  // true
Number.isFinite(1/0)   // false
(255).toString(16)     // 'ff' (chuyển sang hex)
(10).toString(2)       // '1010' (chuyển sang binary)

// 3. boolean
const isActive: boolean = true
// Falsy values: false, 0, -0, '', null, undefined, NaN
// Truthy: mọi thứ khác, kể cả [], {}, '0'

// 4. null & 5. undefined
let a: null = null           // intentionally empty
let b: undefined = undefined // not yet assigned
typeof null       // 'object' (historical bug!)
typeof undefined  // 'undefined'

// 6. bigint — số nguyên lớn tùy ý
const huge: bigint = 9007199254740991n
huge + 1n  // 9007199254740992n (chính xác!)
// Không thể mix: huge + 1 ❌ (phải huge + 1n)

// 7. symbol — unique identifier
const id: symbol = Symbol('id')
const id2 = Symbol('id')
id === id2  // false (luôn unique)`}</CodeBlock>

                {/* ===== TYPESCRIPT TYPES ===== */}
                <Heading2>🔷 TypeScript — Hệ thống kiểu nâng cao</Heading2>

                <CodeBlock title="typescript-types.ts">{`// TypeScript thêm type system lên JavaScript

// Union Types
type Status = 'active' | 'inactive' | 'pending'
type ID = string | number

// Literal Types
type Direction = 'up' | 'down' | 'left' | 'right'
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6

// Tuple — mảng cố định kiểu & length
type Point = [number, number]
type NameAge = [string, number]
const coord: Point = [10, 20]

// Enum
enum Color { Red = 0, Green = 1, Blue = 2 }
// const enum tốt hơn (inline at compile time)
const enum HttpStatus { OK = 200, NotFound = 404, ServerError = 500 }

// Interface vs Type
interface User {
    name: string
    age: number
    email?: string       // optional
    readonly id: string  // immutable
}

type UserType = {
    name: string
    age: number
}

// Interface: extends, declaration merging
// Type: unions, intersections, mapped types

// Generics — tái sử dụng logic với nhiều kiểu
function identity<T>(arg: T): T { return arg }
function getFirst<T>(arr: T[]): T | undefined { return arr[0] }

// Generic constraints
function getLength<T extends { length: number }>(arg: T): number {
    return arg.length
}

// Utility Types
type Partial<T>    // tất cả fields optional
type Required<T>   // tất cả fields required
type Readonly<T>   // tất cả fields readonly
type Pick<T, K>    // chọn một số fields
type Omit<T, K>    // bỏ một số fields
type Record<K, V>  // object với keys K, values V

// Ví dụ thực tế
type UserUpdate = Partial<Pick<User, 'name' | 'email'>>
type UserSummary = Pick<User, 'name' | 'age'>
type StringMap = Record<string, string>

// Type Guards
function isString(x: unknown): x is string {
    return typeof x === 'string'
}

// Discriminated Unions — rất hữu ích!
type Shape =
    | { kind: 'circle'; radius: number }
    | { kind: 'rect'; width: number; height: number }

function area(shape: Shape): number {
    switch (shape.kind) {
        case 'circle': return Math.PI * shape.radius ** 2
        case 'rect': return shape.width * shape.height
    }
}

// keyof & typeof
type UserKeys = keyof User  // 'name' | 'age' | 'email' | 'id'
const config = { host: 'localhost', port: 3000 } as const
type Config = typeof config  // { readonly host: 'localhost'; readonly port: 3000 }`}</CodeBlock>

                {/* ===== ARRAY ===== */}
                <Heading2>📦 Array — Cấu trúc dữ liệu nền tảng</Heading2>

                <Callout type="tip">🚂 <strong>Hình dung:</strong> Array giống <strong>toa tàu lửa</strong> — các toa nối nhau liên tục, mỗi toa có số thứ tự (index). Muốn tìm toa số 5 → đi thẳng đến ngay (O(1)). Nhưng muốn chèn toa mới vào giữa → phải dồn tất cả toa phía sau ra (O(n)).</Callout>

                <CodeBlock title="array.ts">{`// Array trong JS là dynamic, có thể chứa mixed types
const nums: number[] = [1, 2, 3, 4, 5]
const mixed: (string | number)[] = [1, 'two', 3]

// === CRUD Operations ===
nums.push(6)        // thêm cuối — O(1)
nums.pop()          // xóa cuối — O(1)
nums.unshift(0)     // thêm đầu — O(n) ⚠️
nums.shift()        // xóa đầu — O(n) ⚠️
nums.splice(2, 1)   // xóa 1 phần tử tại index 2 — O(n)
nums.splice(2, 0, 99) // chèn 99 tại index 2

// === Iteration ===
nums.forEach((val, idx) => console.log(idx, val))
const doubled = nums.map(x => x * 2)
const evens = nums.filter(x => x % 2 === 0)
const sum = nums.reduce((acc, x) => acc + x, 0)
const found = nums.find(x => x > 3)
const idx = nums.findIndex(x => x > 3)
const hasEven = nums.some(x => x % 2 === 0)
const allPositive = nums.every(x => x > 0)

// === Sorting ===
nums.sort((a, b) => a - b)            // ascending
nums.sort((a, b) => b - a)            // descending
strings.sort((a, b) => a.localeCompare(b)) // string sort

// === Giải thuật hay dùng ===

// Tạo mảng filled
const zeros = new Array(5).fill(0)              // [0,0,0,0,0]
const matrix = Array.from({ length: 3 }, () => new Array(3).fill(0))
// [[0,0,0], [0,0,0], [0,0,0]] — 2D array

// Array.from — tạo từ iterable
Array.from('hello')           // ['h','e','l','l','o']
Array.from({ length: 5 }, (_, i) => i) // [0,1,2,3,4]
Array.from(new Set([1,2,2,3]))  // [1,2,3] — deduplicate

// Spread + destructuring
const [first, ...rest] = [1, 2, 3, 4]  // first=1, rest=[2,3,4]
const merged = [...arr1, ...arr2]
const copy = [...original]  // shallow copy

// Immutable methods (ES2023)
const sorted = nums.toSorted((a, b) => a - b)
const reversed = nums.toReversed()
const replaced = nums.with(2, 99)

// Flat
[[1,2],[3,[4]]].flat(Infinity) // [1,2,3,4]

// Includes (tốt hơn indexOf cho checking)
nums.includes(3)  // true — O(n)`}</CodeBlock>

                {/* ===== OBJECT ===== */}
                <Heading2>🗂️ Object — Key-Value cơ bản</Heading2>

                <CodeBlock title="object.ts">{`// Object — hash map cơ bản, keys luôn là string/symbol
const user: Record<string, unknown> = { name: 'K', age: 28 }

// CRUD
user['email'] = 'k@mail.com'    // add/update
delete user['email']             // delete — O(1)
'name' in user                   // check key — O(1)
Object.hasOwn(user, 'name')     // check own property

// Iteration
Object.keys(user)     // ['name', 'age']
Object.values(user)   // ['K', 28]
Object.entries(user)  // [['name','K'], ['age',28]]

// Merge
const merged = { ...defaults, ...overrides }
const merged2 = Object.assign({}, defaults, overrides)

// Freeze & Seal
const frozen = Object.freeze({ x: 1 })  // immutable
// frozen.x = 2 → error in strict mode

// Computed property names
const key = 'dynamic'
const obj = { [key]: 'value' }  // { dynamic: 'value' }

// 🚨 Object as hash map — hạn chế:
// - keys luôn là string (number keys bị convert)
// - prototype chain interference
// - không có .size
// → Dùng Map thay cho hash map!`}</CodeBlock>

                {/* ===== MAP ===== */}
                <Heading2>🗺️ Map — Hash Map đúng nghĩa</Heading2>

                <Callout type="tip">🗄️ <strong>Hình dung:</strong> Map giống <strong>tủ locker trường học</strong> — mỗi locker có số (key) và bên trong có đồ (value). Biết số locker → mở ra lấy đồ ngay O(1). Hỏi &quot;ai tương ứng cái gì?&quot; → dùng Map!</Callout>

                <Paragraph>
                    <InlineCode>Map</InlineCode> tốt hơn Object cho hash map vì keys{' '}
                    <Highlight>bất kỳ kiểu nào</Highlight>, có <InlineCode>.size</InlineCode>, giữ insertion order.
                </Paragraph>

                <CodeBlock title="map.ts">{`// Map — key bất kỳ type, O(1) get/set/delete
const map = new Map<string, number>()

// CRUD — O(1)
map.set('a', 1)
map.set('b', 2)
map.get('a')       // 1
map.has('a')       // true
map.delete('a')    // true
map.size           // 1
map.clear()        // xóa tất cả

// Khởi tạo từ entries
const m = new Map([['x', 1], ['y', 2], ['z', 3]])

// Iteration (giữ insertion order)
for (const [key, value] of map) { }
for (const key of map.keys()) { }
for (const value of map.values()) { }
map.forEach((value, key) => { })

// Chuyển đổi
const obj = Object.fromEntries(map)  // Map → Object
const arr = [...map]                  // Map → Array of entries

// 🎯 Dùng cho giải thuật:

// 1. Frequency Counter (đếm tần suất)
function charFrequency(s: string): Map<string, number> {
    const freq = new Map<string, number>()
    for (const char of s) {
        freq.set(char, (freq.get(char) || 0) + 1)
    }
    return freq
}

// 2. Two Sum pattern
function twoSum(nums: number[], target: number): number[] {
    const seen = new Map<number, number>() // value → index
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i]
        if (seen.has(complement)) {
            return [seen.get(complement)!, i]
        }
        seen.set(nums[i], i)
    }
    return []
}

// 3. Grouping
const grouped = new Map<string, string[]>()
for (const word of words) {
    const key = word.split('').sort().join('') // anagram key
    if (!grouped.has(key)) grouped.set(key, [])
    grouped.get(key)!.push(word)
}

// 4. LRU Cache concept (Map giữ insertion order)
class SimpleCache<K, V> {
    private cache = new Map<K, V>()
    constructor(private maxSize: number) {}

    get(key: K): V | undefined {
        if (!this.cache.has(key)) return undefined
        const value = this.cache.get(key)!
        this.cache.delete(key)
        this.cache.set(key, value) // move to end (most recent)
        return value
    }

    set(key: K, value: V): void {
        this.cache.delete(key)
        this.cache.set(key, value)
        if (this.cache.size > this.maxSize) {
            const oldest = this.cache.keys().next().value
            this.cache.delete(oldest!)
        }
    }
}`}</CodeBlock>

                {/* ===== SET ===== */}
                <Heading2>🎯 Set — Tập hợp unique values</Heading2>

                <Callout type="tip">🪣 <strong>Hình dung:</strong> Set giống <strong>xô bi màu</strong> — bỏ bi xanh vào ✅, bỏ bi đỏ vào ✅, bỏ bi xanh lần nữa → rớt ra ngoài ❌ (đã có rồi!). Hỏi &quot;cái này đã gặp chưa?&quot; → dùng Set!</Callout>

                <CodeBlock title="set.ts">{`// Set — chỉ chứa giá trị unique, O(1) add/has/delete
const set = new Set<number>()

// CRUD — O(1)
set.add(1)
set.add(2)
set.add(2)     // duplicate → ignored
set.has(1)     // true
set.delete(1)  // true
set.size       // 1
set.clear()

// Khởi tạo
const s = new Set([1, 2, 3, 4, 5])
const fromString = new Set('hello') // Set {'h','e','l','o'}

// Iteration
for (const val of set) { }
set.forEach(val => { })
const arr = [...set]  // Set → Array

// 🎯 Dùng cho giải thuật:

// 1. Deduplicate
const unique = [...new Set([1, 2, 2, 3, 3, 4])] // [1,2,3,4]

// 2. Contains Duplicate
function containsDuplicate(nums: number[]): boolean {
    return new Set(nums).size !== nums.length
}

// 3. Intersection, Union, Difference
const a = new Set([1, 2, 3, 4])
const b = new Set([3, 4, 5, 6])

const intersection = new Set([...a].filter(x => b.has(x)))  // {3, 4}
const union = new Set([...a, ...b])                          // {1,2,3,4,5,6}
const difference = new Set([...a].filter(x => !b.has(x)))   // {1, 2}

// ES2025: Set methods (native)
// a.intersection(b)
// a.union(b)
// a.difference(b)
// a.symmetricDifference(b)
// a.isSubsetOf(b)
// a.isSupersetOf(b)

// 4. Sliding Window — unique characters
function lengthOfLongestSubstring(s: string): number {
    const chars = new Set<string>()
    let left = 0, maxLen = 0

    for (let right = 0; right < s.length; right++) {
        while (chars.has(s[right])) {
            chars.delete(s[left])
            left++
        }
        chars.add(s[right])
        maxLen = Math.max(maxLen, right - left + 1)
    }
    return maxLen
}

// 5. Cycle Detection (Floyd's)
function hasCycle(head: ListNode | null): boolean {
    const visited = new Set<ListNode>()
    let current = head
    while (current) {
        if (visited.has(current)) return true
        visited.add(current)
        current = current.next
    }
    return false
}`}</CodeBlock>

                {/* ===== WEAKMAP & WEAKSET ===== */}
                <Heading2>👻 WeakMap & WeakSet — Garbage Collection Friendly</Heading2>

                <CodeBlock title="weak.ts">{`// WeakMap — keys phải là object, tự GC khi object không còn reference
const metadata = new WeakMap<object, string>()

let user = { name: 'K' }
metadata.set(user, 'admin')
metadata.get(user)  // 'admin'

user = null as any  // user bị GC → metadata entry cũng bị xóa

// Dùng khi nào?
// ✅ Cache data mà không gây memory leak
// ✅ Private data cho class instances
// ✅ DOM element metadata

// WeakSet — chỉ chứa objects, tự GC
const processed = new WeakSet<object>()
processed.add(someObj)
processed.has(someObj)  // true

// ⚠️ Hạn chế: không iterable, không có .size
// → Không dùng cho giải thuật, chỉ dùng cho memory management`}</CodeBlock>

                {/* ===== STACK ===== */}
                <Heading2>📚 Stack — LIFO (Last In, First Out)</Heading2>

                <Callout type="tip">🥞 <strong>Hình dung:</strong> Stack giống <strong>chồng bánh pancake</strong> — chiếc cuối cùng đặt lên trên cùng, ăn từ trên xuống. Ctrl+Z (undo) chính là Stack!</Callout>

                <CodeBlock title="stack.ts">{`// Stack dùng Array — đủ cho hầu hết bài LeetCode
// push() & pop() đều O(1)

const stack: number[] = []
stack.push(1)    // [1]
stack.push(2)    // [1, 2]
stack.push(3)    // [1, 2, 3]
stack.pop()      // 3 — stack = [1, 2]
stack.at(-1)     // 2 — peek (xem top mà không xóa)
stack.length     // 2 — size

// 🎯 Bài toán Stack kinh điển:

// 1. Valid Parentheses
function isValid(s: string): boolean {
    const stack: string[] = []
    const pairs: Record<string, string> = { ')': '(', '}': '{', ']': '[' }

    for (const char of s) {
        if ('({['.includes(char)) {
            stack.push(char)
        } else {
            if (stack.pop() !== pairs[char]) return false
        }
    }
    return stack.length === 0
}

// 2. Monotonic Stack — Next Greater Element
function nextGreaterElement(nums: number[]): number[] {
    const result = new Array(nums.length).fill(-1)
    const stack: number[] = [] // stores indices

    for (let i = 0; i < nums.length; i++) {
        while (stack.length && nums[i] > nums[stack.at(-1)!]) {
            result[stack.pop()!] = nums[i]
        }
        stack.push(i)
    }
    return result
}

// 3. Min Stack — O(1) getMin
class MinStack {
    private stack: number[] = []
    private minStack: number[] = []

    push(val: number) {
        this.stack.push(val)
        this.minStack.push(
            Math.min(val, this.minStack.at(-1) ?? Infinity)
        )
    }
    pop() { this.stack.pop(); this.minStack.pop() }
    top() { return this.stack.at(-1)! }
    getMin() { return this.minStack.at(-1)! }
}`}</CodeBlock>

                {/* ===== QUEUE & DEQUE ===== */}
                <Heading2>🚶 Queue & Deque — FIFO (First In, First Out)</Heading2>

                <Callout type="tip">🏧 <strong>Hình dung:</strong> Queue giống <strong>xếp hàng ATM</strong> — ai đến trước phục vụ trước. Deque (Double-Ended Queue) giống <strong>ống trượt hai đầu</strong> — vào/ra được cả hai phía.</Callout>

                <CodeBlock title="queue.ts">{`// ⚠️ Array.shift() là O(n) — không hiệu quả cho queue lớn
// Dùng index pointer thay shift() cho performance

// Simple Queue với pointer (O(1) amortized)
class Queue<T> {
    private items: T[] = []
    private head = 0

    enqueue(item: T) { this.items.push(item) }
    dequeue(): T | undefined { return this.items[this.head++] }
    peek(): T | undefined { return this.items[this.head] }
    get size() { return this.items.length - this.head }
    get isEmpty() { return this.size === 0 }
}

// 🎯 BFS dùng Queue
function bfs(root: TreeNode | null): number[][] {
    if (!root) return []
    const result: number[][] = []
    const queue = new Queue<TreeNode>()
    queue.enqueue(root)

    while (!queue.isEmpty) {
        const levelSize = queue.size
        const level: number[] = []

        for (let i = 0; i < levelSize; i++) {
            const node = queue.dequeue()!
            level.push(node.val)
            if (node.left) queue.enqueue(node.left)
            if (node.right) queue.enqueue(node.right)
        }
        result.push(level)
    }
    return result
}

// Deque (Double-ended Queue)
class Deque<T> {
    private items: T[] = []

    pushFront(item: T) { this.items.unshift(item) }  // O(n)
    pushBack(item: T) { this.items.push(item) }       // O(1)
    popFront(): T | undefined { return this.items.shift() }  // O(n)
    popBack(): T | undefined { return this.items.pop() }     // O(1)
    peekFront(): T | undefined { return this.items[0] }
    peekBack(): T | undefined { return this.items.at(-1) }
    get size() { return this.items.length }
}

// 🎯 Sliding Window Maximum — dùng Deque
function maxSlidingWindow(nums: number[], k: number): number[] {
    const result: number[] = []
    const deque: number[] = [] // stores indices, decreasing order

    for (let i = 0; i < nums.length; i++) {
        // Remove elements outside window
        while (deque.length && deque[0] <= i - k) deque.shift()
        // Remove smaller elements
        while (deque.length && nums[deque.at(-1)!] <= nums[i]) deque.pop()
        deque.push(i)
        if (i >= k - 1) result.push(nums[deque[0]])
    }
    return result
}`}</CodeBlock>

                {/* ===== LINKED LIST ===== */}
                <Heading2>🔗 Linked List</Heading2>

                <Callout type="tip">🔗 <strong>Hình dung:</strong> Linked List giống <strong>đoàn tàu nối bằng móc</strong> — mỗi toa chỉ biết toa kế tiếp. Muốn tháo/gắn toa ở giữa → chỉ cần đổi móc nối, không cần dồn toa (O(1) insert). Nhưng muốn tìm toa số 5 → phải đi từ đầu đếm từng toa (O(n)).</Callout>

                <CodeBlock title="linked-list.ts">{`// Singly Linked List
class ListNode {
    val: number
    next: ListNode | null
    constructor(val = 0, next: ListNode | null = null) {
        this.val = val
        this.next = next
    }
}

// Tạo linked list từ array
function createList(arr: number[]): ListNode | null {
    const dummy = new ListNode(0)
    let current = dummy
    for (const val of arr) {
        current.next = new ListNode(val)
        current = current.next
    }
    return dummy.next
}

// 🎯 Kỹ thuật giải thuật:

// 1. Dummy Head — tránh edge cases
function removeElements(head: ListNode | null, val: number): ListNode | null {
    const dummy = new ListNode(0, head)
    let prev = dummy
    let curr = head

    while (curr) {
        if (curr.val === val) {
            prev.next = curr.next
        } else {
            prev = curr
        }
        curr = curr.next
    }
    return dummy.next
}

// 2. Fast & Slow Pointers — tìm middle, detect cycle
function findMiddle(head: ListNode | null): ListNode | null {
    let slow = head, fast = head
    while (fast?.next) {
        slow = slow!.next
        fast = fast.next.next
    }
    return slow
}

// 3. Reverse Linked List
function reverseList(head: ListNode | null): ListNode | null {
    let prev: ListNode | null = null
    let curr = head
    while (curr) {
        const next = curr.next
        curr.next = prev
        prev = curr
        curr = next
    }
    return prev
}

// Doubly Linked List
class DoublyNode {
    val: number
    prev: DoublyNode | null = null
    next: DoublyNode | null = null
    constructor(val = 0) { this.val = val }
}`}</CodeBlock>

                {/* ===== HEAP / PRIORITY QUEUE ===== */}
                <Heading2>⛰️ Heap / Priority Queue</Heading2>

                <Callout type="tip">🏔️ <strong>Hình dung:</strong> Min-Heap giống <strong>kim tự tháp viên bi</strong> — viên nhỏ nhất luôn ở đỉnh. Lấy viên nhỏ nhất → O(1), bỏ viên mới vào → tự lăn xuống vị trí đúng O(log n). &quot;Tìm K phần tử lớn/nhỏ nhất&quot; → dùng Heap!</Callout>

                <Paragraph>
                    JavaScript không có built-in Heap. Phải tự implement — <Highlight>rất quan trọng cho LeetCode</Highlight>.
                </Paragraph>

                <CodeBlock title="heap.ts">{`// Min Heap — phần tử nhỏ nhất luôn ở top
class MinHeap {
    private heap: number[] = []

    get size() { return this.heap.length }

    peek(): number { return this.heap[0] }

    push(val: number) {
        this.heap.push(val)
        this._bubbleUp(this.heap.length - 1)
    }

    pop(): number {
        const min = this.heap[0]
        const last = this.heap.pop()!
        if (this.heap.length > 0) {
            this.heap[0] = last
            this._sinkDown(0)
        }
        return min
    }

    private _bubbleUp(i: number) {
        while (i > 0) {
            const parent = Math.floor((i - 1) / 2)
            if (this.heap[parent] <= this.heap[i]) break
            ;[this.heap[parent], this.heap[i]] = [this.heap[i], this.heap[parent]]
            i = parent
        }
    }

    private _sinkDown(i: number) {
        const n = this.heap.length
        while (true) {
            let smallest = i
            const left = 2 * i + 1
            const right = 2 * i + 2

            if (left < n && this.heap[left] < this.heap[smallest]) smallest = left
            if (right < n && this.heap[right] < this.heap[smallest]) smallest = right

            if (smallest === i) break
            ;[this.heap[smallest], this.heap[i]] = [this.heap[i], this.heap[smallest]]
            i = smallest
        }
    }
}

// 🎯 Ứng dụng:
// - Kth Largest Element: dùng MinHeap size k
// - Merge K Sorted Lists: push head mỗi list
// - Top K Frequent: frequency counter + heap
// - Dijkstra's Algorithm: shortest path

// Ví dụ: Kth Largest
function findKthLargest(nums: number[], k: number): number {
    const heap = new MinHeap()
    for (const num of nums) {
        heap.push(num)
        if (heap.size > k) heap.pop() // giữ chỉ k phần tử
    }
    return heap.peek() // phần tử nhỏ nhất trong k lớn nhất = kth largest
}`}</CodeBlock>

                {/* ===== TRIE ===== */}
                <Heading2>🌳 Trie — Prefix Tree</Heading2>

                <Callout type="tip">📱 <strong>Hình dung:</strong> Trie giống <strong>gợi ý từ trên bàn phím điện thoại</strong> — gõ &quot;hel&quot; → gợi ý &quot;hello&quot;, &quot;help&quot;, &quot;helmet&quot;. Mỗi ký tự là một nhánh cây, đi theo nhánh = tìm prefix.</Callout>

                <CodeBlock title="trie.ts">{`// Trie — tìm kiếm prefix hiệu quả O(m) với m = length of word
class TrieNode {
    children = new Map<string, TrieNode>()
    isEnd = false
}

class Trie {
    private root = new TrieNode()

    insert(word: string): void {
        let node = this.root
        for (const char of word) {
            if (!node.children.has(char)) {
                node.children.set(char, new TrieNode())
            }
            node = node.children.get(char)!
        }
        node.isEnd = true
    }

    search(word: string): boolean {
        const node = this._findNode(word)
        return node !== null && node.isEnd
    }

    startsWith(prefix: string): boolean {
        return this._findNode(prefix) !== null
    }

    private _findNode(s: string): TrieNode | null {
        let node = this.root
        for (const char of s) {
            if (!node.children.has(char)) return null
            node = node.children.get(char)!
        }
        return node
    }
}

// 🎯 Ứng dụng: autocomplete, word search, IP routing`}</CodeBlock>

                {/* ===== GRAPH ===== */}
                <Heading2>🕸️ Graph — Biểu diễn & Duyệt</Heading2>

                <Callout type="tip">🗺️ <strong>Hình dung:</strong> Graph giống <strong>bản đồ Google Maps</strong> — các thành phố là nodes, đường đi là edges. BFS = đi theo vòng tròn ra ngoài (tìm đường ngắn nhất). DFS = đi sâu hết 1 ngõ rồi quay lại (tìm tất cả đường đi).</Callout>

                <CodeBlock title="graph.ts">{`// Adjacency List — phổ biến nhất cho giải thuật
// Dùng Map<number, number[]>

// Undirected Graph
function buildGraph(edges: number[][]): Map<number, number[]> {
    const graph = new Map<number, number[]>()
    for (const [u, v] of edges) {
        if (!graph.has(u)) graph.set(u, [])
        if (!graph.has(v)) graph.set(v, [])
        graph.get(u)!.push(v)
        graph.get(v)!.push(u)
    }
    return graph
}

// DFS — Depth First Search
function dfs(graph: Map<number, number[]>, start: number): number[] {
    const visited = new Set<number>()
    const result: number[] = []

    function explore(node: number) {
        visited.add(node)
        result.push(node)
        for (const neighbor of graph.get(node) || []) {
            if (!visited.has(neighbor)) explore(neighbor)
        }
    }

    explore(start)
    return result
}

// BFS — Breadth First Search
function bfsGraph(graph: Map<number, number[]>, start: number): number[] {
    const visited = new Set<number>([start])
    const queue: number[] = [start]
    const result: number[] = []
    let head = 0

    while (head < queue.length) {
        const node = queue[head++]
        result.push(node)
        for (const neighbor of graph.get(node) || []) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor)
                queue.push(neighbor)
            }
        }
    }
    return result
}

// 🎯 Ứng dụng:
// - Number of Islands (2D grid DFS/BFS)
// - Course Schedule (topological sort)
// - Shortest Path (BFS unweighted, Dijkstra weighted)
// - Connected Components
// - Detect Cycle`}</CodeBlock>

                {/* ===== CHEAT SHEET ===== */}
                <Heading2>📋 Big-O Cheat Sheet</Heading2>

                <CodeBlock title="complexity.ts">{`// Cấu trúc dữ liệu    | Access | Search | Insert | Delete
// ────────────────────────────────────────────────────────
// Array                 | O(1)   | O(n)   | O(n)   | O(n)
// Array (push/pop)      | —      | —      | O(1)   | O(1)
// Stack (array)         | O(n)   | O(n)   | O(1)   | O(1)
// Queue (pointer)       | O(n)   | O(n)   | O(1)   | O(1)*
// Map                   | —      | O(1)   | O(1)   | O(1)
// Set                   | —      | O(1)   | O(1)   | O(1)
// Object                | —      | O(1)   | O(1)   | O(1)
// Linked List           | O(n)   | O(n)   | O(1)** | O(1)**
// Binary Heap           | —      | O(n)   | O(logn)| O(logn)
// Trie                  | —      | O(m)   | O(m)   | O(m)
//
// * amortized   ** sau khi tìm được vị trí   m = length of string
//
// Khi nào dùng gì?
// Tìm kiếm O(1)         → Map, Set, Object
// LIFO                   → Stack (array)
// FIFO                   → Queue (với pointer)
// Sorted / min-max       → Heap
// Prefix search          → Trie
// Relationships          → Graph (adjacency list)
// Ordered unique values  → Set
// Frequency counting     → Map
// Cache (LRU)            → Map (giữ insertion order)`}</CodeBlock>

                {/* ===== REAL-WORLD EXAMPLES ===== */}
                <Heading2>🏭 Ví dụ thực tế từ dự án này</Heading2>

                <Paragraph>
                    Dưới đây là các ví dụ <Highlight>thực tế</Highlight> từ chính source code của dự án này,
                    cho thấy Map, Set, Array được sử dụng như thế nào trong production code.
                </Paragraph>

                <CodeBlock title="ProductTable.tsx — Map O(1) lookup">{`// 📁 src/components/shop/products/ProductTable.tsx

// 🚀 Tạo categoryMap để lookup O(1) thay vì O(n) find()
const categoryMap = useMemo(() => {
    const map = new Map<string, string>()
    categories?.forEach((category: Category) => {
        if (category._id) {
            map.set(String(category._id), category.name)
        }
    })
    return map
}, [categories])

// 🚀 Sử dụng: O(1) Map.get() thay vì O(n) Array.find()
// ❌ Cách cũ: categories.find(c => c._id === categoryId)?.name
// ✅ Cách mới:
render: (_, { categoryId }) =>
    categoryId ? categoryMap.get(categoryId) || '-' : '-'

// Với 100 sản phẩm × 50 categories:
// ❌ find(): 100 × 50 = 5000 comparisons
// ✅ Map.get(): 100 × 1 = 100 lookups`}</CodeBlock>

                <CodeBlock title="autoflows/route.ts — Set dedup + Map batch">{`// 📁 src/app/(admin)/api/autoflows/route.ts

// 1️⃣ Set — Loại bỏ promptId trùng lặp
const allPromptIds = autoflows.flatMap((a: any) => a.promptIds || [])
const uniquePromptIds = [...new Set(allPromptIds)]  // ✨ 1 dòng dedup!

// 2️⃣ Map — Batch fetch → Map để lookup nhanh
const prompts = await PromptModel.find({ _id: { $in: uniquePromptIds } })

const promptsMap = new Map<string, any>()
prompts.forEach((p: any) => {
    promptsMap.set(p._id.toString(), p)
})

// 3️⃣ Sử dụng Map để gắn prompts vào mỗi autoflow
const orderedPrompts = (a.promptIds || [])
    .map((id: string) => promptsMap.get(id))  // O(1) mỗi lần
    .filter(Boolean)  // loại bỏ undefined`}</CodeBlock>

                <CodeBlock title="tweets/route.ts — Map làm cache">{`// 📁 src/app/api/tweets/route.ts

// Map dùng làm in-memory cache với TTL
const cache = new Map<string, { html: string; ts: number }>()
const CACHE_TTL = 10 * 60 * 1000 // 10 phút

// Check cache trước khi fetch
const cached = cache.get(key)
if (cached && Date.now() - cached.ts < CACHE_TTL) {
    return cached.html  // Cache HIT ✅
}

// Sau khi fetch xong → lưu vào cache
cache.set(key, { html, ts: Date.now() })`}</CodeBlock>

                <Callout type="tip">
                    <strong>Tip cho LeetCode:</strong> 90% bài dùng Array + Map + Set. Thêm Stack cho parentheses/monotonic,
                    Queue cho BFS, Heap cho top-K/scheduling. Trie và Graph cho bài medium-hard cụ thể.
                </Callout>
            </>
        ),
        en: (
            <>
                <Paragraph>
                    Understanding <Highlight>data types</Highlight> is the foundation for writing good code and efficient algorithms.
                    This article covers basics to advanced, including self-implemented data structures for LeetCode.
                </Paragraph>

                {/* ===== PRIMITIVE TYPES ===== */}
                <Heading2>📌 Primitive Types</Heading2>

                <CodeBlock title="primitives.ts">{`// 7 primitive types in JavaScript
// Characteristics: immutable, compared by value, passed by value

// 1. string
const name: string = 'Khuong'
// Key string methods for algorithms
'hello'.charAt(0)          // 'h'
'hello'.charCodeAt(0)      // 104 (ASCII)
String.fromCharCode(104)   // 'h'
'hello'.split('')          // ['h','e','l','l','o']
'hello'.includes('ell')    // true
'hello'.indexOf('l')       // 2
'hello'.slice(1, 3)        // 'el'
'  hi  '.trim()            // 'hi'
'hello'.at(-1)             // 'o'

// 2. number (64-bit floating point)
const int: number = 42
Math.floor(3.7)    // 3
Math.ceil(3.2)     // 4
Math.trunc(3.7)    // 3 (remove decimals)
Math.abs(-5)       // 5
parseInt('42px')   // 42
(255).toString(16) // 'ff'  (to hex)
(10).toString(2)   // '1010' (to binary)

// 3. boolean
// Falsy: false, 0, -0, '', null, undefined, NaN
// Truthy: everything else, including [], {}, '0'

// 4. null — intentionally empty
// 5. undefined — not yet assigned
// 6. bigint — arbitrary precision: 9007199254740991n
// 7. symbol — unique identifier: Symbol('id')`}</CodeBlock>

                {/* ===== TYPESCRIPT TYPES ===== */}
                <Heading2>🔷 TypeScript — Advanced Type System</Heading2>

                <CodeBlock title="typescript-types.ts">{`// Union & Literal Types
type Status = 'active' | 'inactive' | 'pending'
type ID = string | number

// Tuple — fixed type & length array
type Point = [number, number]

// Generics — reusable logic with multiple types
function identity<T>(arg: T): T { return arg }
function getFirst<T>(arr: T[]): T | undefined { return arr[0] }

// Utility Types
type Partial<T>    // all fields optional
type Required<T>   // all fields required
type Pick<T, K>    // select specific fields
type Omit<T, K>    // exclude specific fields
type Record<K, V>  // object with keys K, values V

// Discriminated Unions — very useful!
type Shape =
    | { kind: 'circle'; radius: number }
    | { kind: 'rect'; width: number; height: number }

function area(shape: Shape): number {
    switch (shape.kind) {
        case 'circle': return Math.PI * shape.radius ** 2
        case 'rect': return shape.width * shape.height
    }
}

// keyof, typeof, as const
const config = { host: 'localhost', port: 3000 } as const
type Config = typeof config`}</CodeBlock>

                {/* ===== ARRAY ===== */}
                <Heading2>📦 Array — Foundation Data Structure</Heading2>

                <Callout type="tip">🚂 <strong>Visualize:</strong> Array is like a <strong>train with numbered cars</strong> — jump to car #5 instantly (O(1)). But inserting a car in the middle means shifting all cars behind it (O(n)).</Callout>

                <CodeBlock title="array.ts">{`// Array — dynamic, O(1) push/pop, O(n) shift/unshift
const nums: number[] = [1, 2, 3, 4, 5]

// Key operations
nums.push(6)      // append — O(1)
nums.pop()        // remove last — O(1)
nums.unshift(0)   // prepend — O(n) ⚠️
nums.shift()      // remove first — O(n) ⚠️

// Iteration
nums.map(x => x * 2)
nums.filter(x => x % 2 === 0)
nums.reduce((acc, x) => acc + x, 0)
nums.find(x => x > 3)
nums.some(x => x > 3)
nums.every(x => x > 0)

// Sorting
nums.sort((a, b) => a - b) // ascending
nums.sort((a, b) => b - a) // descending

// Algorithm essentials
const zeros = new Array(5).fill(0)
const matrix = Array.from({ length: 3 }, () => new Array(3).fill(0))
Array.from({ length: 5 }, (_, i) => i) // [0,1,2,3,4]
Array.from(new Set([1,2,2,3]))         // deduplicate

// Immutable methods (ES2023)
nums.toSorted((a, b) => a - b)  // returns new array
nums.toReversed()
nums.with(2, 99)  // replace at index`}</CodeBlock>

                {/* ===== MAP ===== */}
                <Heading2>🗺️ Map — True Hash Map</Heading2>

                <Callout type="tip">🗄️ <strong>Visualize:</strong> Map is like <strong>school lockers</strong> — each locker has a number (key) with stuff inside (value). Know the locker number → open and grab instantly O(1). Ask &quot;what goes with what?&quot; → use Map!</Callout>

                <Paragraph>
                    <InlineCode>Map</InlineCode> is better than Object for hash maps: keys can be{' '}
                    <Highlight>any type</Highlight>, has <InlineCode>.size</InlineCode>, maintains insertion order.
                </Paragraph>

                <CodeBlock title="map.ts">{`// Map — any key type, O(1) get/set/delete
const map = new Map<string, number>()
map.set('a', 1)
map.get('a')       // 1
map.has('a')       // true
map.delete('a')    // true
map.size           // 0

// 🎯 Algorithm patterns:

// 1. Frequency Counter
function charFrequency(s: string): Map<string, number> {
    const freq = new Map<string, number>()
    for (const char of s) {
        freq.set(char, (freq.get(char) || 0) + 1)
    }
    return freq
}

// 2. Two Sum pattern
function twoSum(nums: number[], target: number): number[] {
    const seen = new Map<number, number>() // value → index
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i]
        if (seen.has(complement)) return [seen.get(complement)!, i]
        seen.set(nums[i], i)
    }
    return []
}

// 3. Anagram Grouping
const grouped = new Map<string, string[]>()
for (const word of words) {
    const key = word.split('').sort().join('')
    if (!grouped.has(key)) grouped.set(key, [])
    grouped.get(key)!.push(word)
}`}</CodeBlock>

                {/* ===== SET ===== */}
                <Heading2>🎯 Set — Unique Value Collection</Heading2>

                <Callout type="tip">🪣 <strong>Visualize:</strong> Set is like a <strong>bucket of colored marbles</strong> — drop blue marble ✅, drop red marble ✅, drop blue again → bounces out ❌ (already exists!). Ask &quot;have I seen this before?&quot; → use Set!</Callout>

                <CodeBlock title="set.ts">{`// Set — unique values only, O(1) add/has/delete
const set = new Set<number>([1, 2, 3])

// 🎯 Algorithm patterns:

// 1. Deduplicate
const unique = [...new Set([1, 2, 2, 3])] // [1,2,3]

// 2. Contains Duplicate
const hasDups = new Set(nums).size !== nums.length

// 3. Set Operations
const a = new Set([1, 2, 3, 4])
const b = new Set([3, 4, 5, 6])
const intersection = new Set([...a].filter(x => b.has(x)))  // {3,4}
const union = new Set([...a, ...b])                          // {1,2,3,4,5,6}
const difference = new Set([...a].filter(x => !b.has(x)))   // {1,2}

// 4. Sliding Window — longest unique substring
function lengthOfLongestSubstring(s: string): number {
    const chars = new Set<string>()
    let left = 0, maxLen = 0
    for (let right = 0; right < s.length; right++) {
        while (chars.has(s[right])) {
            chars.delete(s[left])
            left++
        }
        chars.add(s[right])
        maxLen = Math.max(maxLen, right - left + 1)
    }
    return maxLen
}`}</CodeBlock>

                {/* ===== STACK ===== */}
                <Heading2>📚 Stack — LIFO (Last In, First Out)</Heading2>

                <Callout type="tip">🥞 <strong>Visualize:</strong> Stack is like a <strong>pile of pancakes</strong> — last one placed on top gets eaten first. Ctrl+Z (undo) is a Stack!</Callout>

                <CodeBlock title="stack.ts">{`// Stack using Array — push() & pop() are O(1)
const stack: number[] = []
stack.push(1)    // add to top
stack.pop()      // remove from top
stack.at(-1)     // peek (view top without removing)

// 🎯 Algorithm patterns:

// 1. Valid Parentheses
function isValid(s: string): boolean {
    const stack: string[] = []
    const pairs: Record<string, string> = { ')':'(', '}':'{', ']':'[' }
    for (const char of s) {
        if ('({['.includes(char)) stack.push(char)
        else if (stack.pop() !== pairs[char]) return false
    }
    return stack.length === 0
}

// 2. Monotonic Stack — Next Greater Element
function nextGreater(nums: number[]): number[] {
    const result = new Array(nums.length).fill(-1)
    const stack: number[] = [] // indices
    for (let i = 0; i < nums.length; i++) {
        while (stack.length && nums[i] > nums[stack.at(-1)!]) {
            result[stack.pop()!] = nums[i]
        }
        stack.push(i)
    }
    return result
}`}</CodeBlock>

                <CodeBlock title="queue.ts">{`// ⚠️ Array.shift() is O(n), use index pointer instead

// Simple Queue with pointer (O(1) amortized)
class Queue<T> {
    private items: T[] = []
    private head = 0
    enqueue(item: T) { this.items.push(item) }
    dequeue(): T | undefined { return this.items[this.head++] }
    peek(): T | undefined { return this.items[this.head] }
    get size() { return this.items.length - this.head }
    get isEmpty() { return this.size === 0 }
}

// 🎯 BFS uses Queue
function levelOrder(root: TreeNode | null): number[][] {
    if (!root) return []
    const result: number[][] = []
    const queue = new Queue<TreeNode>()
    queue.enqueue(root)

    while (!queue.isEmpty) {
        const levelSize = queue.size
        const level: number[] = []

        for (let i = 0; i < levelSize; i++) {
            const node = queue.dequeue()!
            level.push(node.val)
            if (node.left) queue.enqueue(node.left)
            if (node.right) queue.enqueue(node.right)
        }
        result.push(level)
    }
    return result
}

// Deque (Double-ended Queue)
class Deque<T> {
    private items: T[] = []

    pushFront(item: T) { this.items.unshift(item) }  // O(n)
    pushBack(item: T) { this.items.push(item) }       // O(1)
    popFront(): T | undefined { return this.items.shift() }  // O(n)
    popBack(): T | undefined { return this.items.pop() }     // O(1)
    peekFront(): T | undefined { return this.items[0] }
    peekBack(): T | undefined { return this.items.at(-1) }
    get size() { return this.items.length }
}

// 🎯 Sliding Window Maximum — uses Deque
function maxSlidingWindow(nums: number[], k: number): number[] {
    const result: number[] = []
    const deque: number[] = [] // stores indices, decreasing order

    for (let i = 0; i < nums.length; i++) {
        // Remove elements outside window
        while (deque.length && deque[0] <= i - k) deque.shift()
        // Remove smaller elements
        while (deque.length && nums[deque.at(-1)!] <= nums[i]) deque.pop()
        deque.push(i)
        if (i >= k - 1) result.push(nums[deque[0]])
    }
    return result
}`}</CodeBlock>

                {/* ===== LINKED LIST ===== */}
                <Heading2>🔗 Linked List</Heading2>

                <Callout type="tip">🔗 <strong>Visualize:</strong> Linked List is like a <strong>train connected by hooks</strong> — each car only knows the next car. To detach/attach a car in the middle → just change the hook connection (O(1) insert). But to find car #5 → must walk from the front counting each car (O(n)).</Callout>

                <CodeBlock title="linked-list.ts">{`// Singly Linked List
class ListNode {
    val: number
    next: ListNode | null
    constructor(val = 0, next: ListNode | null = null) {
        this.val = val
        this.next = next
    }
}

// Create linked list from array
function createList(arr: number[]): ListNode | null {
    const dummy = new ListNode(0)
    let current = dummy
    for (const val of arr) {
        current.next = new ListNode(val)
        current = current.next
    }
    return dummy.next
}

// 🎯 Algorithm techniques:

// 1. Dummy Head — avoid edge cases
function removeElements(head: ListNode | null, val: number): ListNode | null {
    const dummy = new ListNode(0, head)
    let prev = dummy
    let curr = head

    while (curr) {
        if (curr.val === val) {
            prev.next = curr.next
        } else {
            prev = curr
        }
        curr = curr.next
    }
    return dummy.next
}

// 2. Fast & Slow Pointers — find middle, detect cycle
function findMiddle(head: ListNode | null): ListNode | null {
    let slow = head, fast = head
    while (fast?.next) {
        slow = slow!.next
        fast = fast.next.next
    }
    return slow
}

// 3. Reverse Linked List
function reverseList(head: ListNode | null): ListNode | null {
    let prev: ListNode | null = null
    let curr = head
    while (curr) {
        const next = curr.next
        curr.next = prev
        prev = curr
        curr = next
    }
    return prev
}

// Doubly Linked List
class DoublyNode {
    val: number
    prev: DoublyNode | null = null
    next: DoublyNode | null = null
    constructor(val = 0) { this.val = val }
}`}</CodeBlock>

                {/* ===== HEAP ===== */}
                <Heading2>⛰️ Heap / Priority Queue</Heading2>

                <Callout type="tip">🏔️ <strong>Visualize:</strong> Min-Heap is like a <strong>marble pyramid</strong> — smallest marble always on top. Grab the smallest → O(1), drop a new one → it rolls to the right spot O(log n). &quot;Find K smallest/largest elements&quot; → use Heap!</Callout>

                <Paragraph>
                    JavaScript has no built-in Heap. Must self-implement — <Highlight>critical for LeetCode</Highlight>.
                </Paragraph>

                <CodeBlock title="heap.ts">{`// Min Heap — smallest element always on top
class MinHeap {
    private heap: number[] = []

    get size() { return this.heap.length }

    peek(): number { return this.heap[0] }

    push(val: number) {
        this.heap.push(val)
        this._bubbleUp(this.heap.length - 1)
    }

    pop(): number {
        const min = this.heap[0]
        const last = this.heap.pop()!
        if (this.heap.length > 0) {
            this.heap[0] = last
            this._sinkDown(0)
        }
        return min
    }

    private _bubbleUp(i: number) {
        while (i > 0) {
            const parent = Math.floor((i - 1) / 2)
            if (this.heap[parent] <= this.heap[i]) break
            ;[this.heap[parent], this.heap[i]] = [this.heap[i], this.heap[parent]]
            i = parent
        }
    }

    private _sinkDown(i: number) {
        const n = this.heap.length
        while (true) {
            let smallest = i
            const left = 2 * i + 1
            const right = 2 * i + 2

            if (left < n && this.heap[left] < this.heap[smallest]) smallest = left
            if (right < n && this.heap[right] < this.heap[smallest]) smallest = right

            if (smallest === i) break
            ;[this.heap[smallest], this.heap[i]] = [this.heap[i], this.heap[smallest]]
            i = smallest
        }
    }
}

// 🎯 Applications:
// - Kth Largest Element: use MinHeap of size k
// - Merge K Sorted Lists: push head of each list
// - Top K Frequent: frequency counter + heap
// - Dijkstra's Algorithm: shortest path

// Example: Kth Largest
function findKthLargest(nums: number[], k: number): number {
    const heap = new MinHeap()
    for (const num of nums) {
        heap.push(num)
        if (heap.size > k) heap.pop() // keep only k elements
    }
    return heap.peek() // smallest in top-k = kth largest
}`}</CodeBlock>

                {/* ===== TRIE ===== */}
                <Heading2>🌳 Trie — Prefix Tree</Heading2>

                <Callout type="tip">📱 <strong>Visualize:</strong> Trie is like <strong>phone keyboard autocomplete</strong> — type &quot;hel&quot; → suggests &quot;hello&quot;, &quot;help&quot;, &quot;helmet&quot;. Each character is a branch in the tree, following a branch = finding a prefix.</Callout>

                <CodeBlock title="trie.ts">{`// Trie — efficient prefix search O(m), m = length of word
class TrieNode {
    children = new Map<string, TrieNode>()
    isEnd = false
}

class Trie {
    private root = new TrieNode()

    insert(word: string): void {
        let node = this.root
        for (const char of word) {
            if (!node.children.has(char)) {
                node.children.set(char, new TrieNode())
            }
            node = node.children.get(char)!
        }
        node.isEnd = true
    }

    search(word: string): boolean {
        const node = this._findNode(word)
        return node !== null && node.isEnd
    }

    startsWith(prefix: string): boolean {
        return this._findNode(prefix) !== null
    }

    private _findNode(s: string): TrieNode | null {
        let node = this.root
        for (const char of s) {
            if (!node.children.has(char)) return null
            node = node.children.get(char)!
        }
        return node
    }
}

// 🎯 Applications: autocomplete, word search, IP routing`}</CodeBlock>

                {/* ===== GRAPH ===== */}
                <Heading2>🕸️ Graph — Representation &amp; Traversal</Heading2>

                <Callout type="tip">🗺️ <strong>Visualize:</strong> Graph is like <strong>Google Maps</strong> — cities are nodes, roads are edges. BFS = ripple outward in circles (shortest path). DFS = explore one road fully before backtracking (find all paths).</Callout>

                <CodeBlock title="graph.ts">{`// Adjacency List — most common for algorithms
// Use Map<number, number[]>

// Undirected Graph
function buildGraph(edges: number[][]): Map<number, number[]> {
    const graph = new Map<number, number[]>()
    for (const [u, v] of edges) {
        if (!graph.has(u)) graph.set(u, [])
        if (!graph.has(v)) graph.set(v, [])
        graph.get(u)!.push(v)
        graph.get(v)!.push(u)
    }
    return graph
}

// DFS — Depth First Search
function dfs(graph: Map<number, number[]>, start: number): number[] {
    const visited = new Set<number>()
    const result: number[] = []

    function explore(node: number) {
        visited.add(node)
        result.push(node)
        for (const neighbor of graph.get(node) || []) {
            if (!visited.has(neighbor)) explore(neighbor)
        }
    }

    explore(start)
    return result
}

// BFS — Breadth First Search
function bfsGraph(graph: Map<number, number[]>, start: number): number[] {
    const visited = new Set<number>([start])
    const queue: number[] = [start]
    const result: number[] = []
    let head = 0

    while (head < queue.length) {
        const node = queue[head++]
        result.push(node)
        for (const neighbor of graph.get(node) || []) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor)
                queue.push(neighbor)
            }
        }
    }
    return result
}

// 🎯 Applications:
// - Number of Islands (2D grid DFS/BFS)
// - Course Schedule (topological sort)
// - Shortest Path (BFS unweighted, Dijkstra weighted)
// - Connected Components
// - Detect Cycle`}</CodeBlock>

                {/* ===== CHEAT SHEET ===== */}
                <Heading2>📋 Big-O Cheat Sheet</Heading2>

                <CodeBlock title="complexity.ts">{`// Data Structure    | Access | Search | Insert | Delete
// ─────────────────────────────────────────────────────
// Array               | O(1)   | O(n)   | O(n)   | O(n)
// Array (push/pop)    |   —    |   —    | O(1)   | O(1)
// Stack (array)       | O(n)   | O(n)   | O(1)   | O(1)
// Queue (pointer)     | O(n)   | O(n)   | O(1)   | O(1)*
// Map                 |   —    | O(1)   | O(1)   | O(1)
// Set                 |   —    | O(1)   | O(1)   | O(1)
// Object              |   —    | O(1)   | O(1)   | O(1)
// Linked List         | O(n)   | O(n)   | O(1)** | O(1)**
// Binary Heap         |   —    | O(n)   |O(logn) |O(logn)
// Trie                |   —    | O(m)   | O(m)   | O(m)
//
// * amortized   ** after finding position   m = length of string
//
// When to use what?
// O(1) lookup        → Map, Set, Object
// LIFO               → Stack (array)
// FIFO               → Queue (with pointer)
// Sorted / min-max   → Heap
// Prefix search      → Trie
// Relationships      → Graph (adjacency list)
// Ordered unique     → Set
// Frequency counting → Map
// Cache (LRU)        → Map (maintains insertion order)`}</CodeBlock>

                {/* ===== REAL-WORLD EXAMPLES ===== */}
                <Heading2>🏭 Real-World Examples from This Project</Heading2>

                <Paragraph>
                    Below are <Highlight>real examples</Highlight> from this project&#39;s source code,
                    showing how Map, Set, and Array are used in production.
                </Paragraph>

                <CodeBlock title="ProductTable.tsx — Map O(1) lookup">{`// 📁 src/components/shop/products/ProductTable.tsx

// 🚀 Build categoryMap for O(1) lookups instead of O(n) find()
const categoryMap = useMemo(() => {
    const map = new Map<string, string>()
    categories?.forEach((category: Category) => {
        if (category._id) {
            map.set(String(category._id), category.name)
        }
    })
    return map
}, [categories])

// 🚀 Usage: O(1) Map.get() instead of O(n) Array.find()
// ❌ Old way: categories.find(c => c._id === categoryId)?.name
// ✅ New way:
render: (_, { categoryId }) =>
    categoryId ? categoryMap.get(categoryId) || '-' : '-'

// With 100 products × 50 categories:
// ❌ find(): 100 × 50 = 5,000 comparisons
// ✅ Map.get(): 100 × 1 = 100 lookups`}</CodeBlock>

                <CodeBlock title="autoflows/route.ts — Set dedup + Map batch">{`// 📁 src/app/(admin)/api/autoflows/route.ts

// 1️⃣ Set — Deduplicate prompt IDs in one line
const allPromptIds = autoflows.flatMap((a: any) => a.promptIds || [])
const uniquePromptIds = [...new Set(allPromptIds)]  // ✨ 1-line dedup!

// 2️⃣ Map — Batch fetch → Map for fast lookup
const prompts = await PromptModel.find({ _id: { $in: uniquePromptIds } })

const promptsMap = new Map<string, any>()
prompts.forEach((p: any) => {
    promptsMap.set(p._id.toString(), p)
})

// 3️⃣ Use Map to attach prompts to each autoflow
const orderedPrompts = (a.promptIds || [])
    .map((id: string) => promptsMap.get(id))  // O(1) each
    .filter(Boolean)  // remove undefined`}</CodeBlock>

                <CodeBlock title="tweets/route.ts — Map as cache">{`// 📁 src/app/api/tweets/route.ts

// Map used as in-memory cache with TTL
const cache = new Map<string, { html: string; ts: number }>()
const CACHE_TTL = 10 * 60 * 1000 // 10 minutes

// Check cache before fetching
const cached = cache.get(key)
if (cached && Date.now() - cached.ts < CACHE_TTL) {
    return cached.html  // Cache HIT ✅
}

// After fetching → store in cache
cache.set(key, { html, ts: Date.now() })`}</CodeBlock>

                <Callout type="tip">
                    <strong>LeetCode tip:</strong> 90% of problems use Array + Map + Set. Add Stack for parentheses/monotonic,
                    Queue for BFS, Heap for top-K/scheduling. Trie and Graph for specific medium-hard problems.
                </Callout>
            </>
        ),
    },
}

export default dataTypesStructures
