import { Callout, CodeBlock, Heading2, Highlight, InlineCode, Paragraph } from '../components/BlogComponents'
import { BlogPost } from '../types'

const ecmascriptFeatures: BlogPost = {
    slug: 'ecmascript-features',
    title: {
        vi: 'ECMAScript qua các năm — Những tính năng cần biết từ ES6 đến ES2024',
        en: 'ECMAScript Through the Years — Must-Know Features from ES6 to ES2024',
    },
    description: {
        vi: 'Tổng hợp các tính năng quan trọng của JavaScript qua từng phiên bản ECMAScript: ES6 (2015), ES7, ES8, ES9, ES10, ES11, ES12, ES13, ES14, ES2024. Mỗi feature đều có code example thực tế.',
        en: 'A comprehensive guide to important JavaScript features across ECMAScript versions: ES6 (2015), ES7, ES8, ES9, ES10, ES11, ES12, ES13, ES14, ES2024. Each feature includes practical code examples.',
    },
    date: '2026-02-26',
    tags: ['JavaScript', 'ECMAScript', 'ES6', 'Fundamentals'],
    emoji: '📜',
    color: '#f7df1e',
    content: {
        vi: (
            <>
                <Paragraph>
                    JavaScript phát triển mỗi năm qua tiêu chuẩn <Highlight>ECMAScript (ES)</Highlight>. Mỗi phiên bản mang đến
                    những tính năng mới giúp code ngắn gọn, dễ đọc và mạnh mẽ hơn. Bài viết này tổng hợp{' '}
                    <Highlight>các tính năng cần biết</Highlight> từ ES6 (2015) đến ES2024.
                </Paragraph>

                <Callout type="info">
                    💡 Mỗi tính năng đều có code example. Bạn có thể copy paste vào console để thử ngay.
                </Callout>

                {/* ===== ES6 / ES2015 ===== */}
                <Heading2>🔥 ES6 / ES2015 — Cuộc cách mạng lớn nhất</Heading2>

                <Paragraph>
                    ES6 là bản cập nhật <Highlight>lớn nhất</Highlight> trong lịch sử JavaScript, thay đổi hoàn toàn cách viết code.
                </Paragraph>

                <CodeBlock title="let-const.js">{`// let & const thay thế var
let count = 0        // block-scoped, có thể reassign
const PI = 3.14159   // block-scoped, không thể reassign

// var có hoisting + function-scoped → dễ bug
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(i)) // 3, 3, 3 ❌
}
for (let j = 0; j < 3; j++) {
    setTimeout(() => console.log(j)) // 0, 1, 2 ✅
}`}</CodeBlock>

                <CodeBlock title="arrow-functions.js">{`// Arrow Functions — ngắn gọn + lexical this
const add = (a, b) => a + b
const square = x => x * x
const greet = () => 'Hello!'

// Lexical this — không bind this mới
class Timer {
    constructor() {
        this.seconds = 0
        setInterval(() => this.seconds++, 1000) // this = Timer ✅
    }
}`}</CodeBlock>

                <CodeBlock title="template-literals.js">{`// Template Literals
const name = 'Khuong'
const greeting = \`Xin chào \${name}! Hôm nay là \${new Date().toLocaleDateString()}\`

// Multi-line strings
const html = \`
    <div class="card">
        <h2>\${name}</h2>
    </div>
\`

// Tagged templates
function highlight(strings, ...values) {
    return strings.reduce((result, str, i) =>
        result + str + (values[i] ? \`<mark>\${values[i]}</mark>\` : ''), '')
}
const msg = highlight\`Hello \${name}, you have \${5} notifications\``}</CodeBlock>

                <CodeBlock title="destructuring.js">{`// Destructuring — giải nén object/array
const { name, age, job = 'Developer' } = user    // object
const [first, , third] = [1, 2, 3]               // array (skip thứ 2)
const [head, ...tail] = [1, 2, 3, 4]             // rest: tail = [2,3,4]

// Nested destructuring
const { address: { city } } = { address: { city: 'HCM' } }

// Function params
function createUser({ name, age = 25 }) {
    return { name, age }
}

// Swap variables
let a = 1, b = 2;
[a, b] = [b, a]  // a=2, b=1`}</CodeBlock>

                <CodeBlock title="spread-rest.js">{`// Spread Operator (...)
const arr1 = [1, 2, 3]
const arr2 = [...arr1, 4, 5]        // [1,2,3,4,5]
const obj1 = { a: 1 }
const obj2 = { ...obj1, b: 2 }      // { a: 1, b: 2 }

// Rest Parameters
function sum(...numbers) {
    return numbers.reduce((a, b) => a + b, 0)
}
sum(1, 2, 3, 4) // 10`}</CodeBlock>

                <CodeBlock title="classes.js">{`// Classes — syntactic sugar cho prototype
class Animal {
    constructor(name) {
        this.name = name
    }
    speak() {
        return \`\${this.name} makes a noise\`
    }
}

class Dog extends Animal {
    speak() {
        return \`\${this.name} barks\`
    }
}

const dog = new Dog('Rex')
dog.speak() // "Rex barks"`}</CodeBlock>

                <CodeBlock title="promises.js">{`// Promises — xử lý async
const fetchData = () => new Promise((resolve, reject) => {
    setTimeout(() => resolve({ data: 'OK' }), 1000)
})

fetchData()
    .then(res => console.log(res.data))
    .catch(err => console.error(err))

// Promise.all — chạy song song
const [users, posts] = await Promise.all([
    fetch('/api/users').then(r => r.json()),
    fetch('/api/posts').then(r => r.json()),
])`}</CodeBlock>

                <CodeBlock title="modules-iterators.js">{`// Modules — import/export
export const API_URL = 'https://api.example.com'
export default function fetchData() { /* ... */ }
import fetchData, { API_URL } from './api'

// Symbols — unique identifiers
const id = Symbol('id')
const user = { [id]: 123, name: 'Khuong' }

// Iterators & for...of
for (const char of 'Hello') console.log(char)
for (const [key, val] of new Map([['a', 1]])) console.log(key, val)

// Default Parameters
function greet(name = 'World') {
    return \`Hello \${name}\`
}

// Map & Set
const map = new Map([['key', 'value']])
const set = new Set([1, 2, 2, 3]) // {1, 2, 3}

// WeakMap & WeakSet — garbage collection friendly
const weakMap = new WeakMap()
weakMap.set(someObj, 'metadata')`}</CodeBlock>

                {/* ===== ES7 / ES2016 ===== */}
                <Heading2>📌 ES7 / ES2016 — Nhỏ nhưng hữu ích</Heading2>

                <CodeBlock title="es2016.js">{`// Array.prototype.includes()
const fruits = ['🍎', '🍌', '🍊']
fruits.includes('🍌')  // true (thay cho indexOf !== -1)

// Exponentiation Operator (**)
2 ** 10  // 1024 (thay cho Math.pow(2, 10))
let x = 2
x **= 3  // 8`}</CodeBlock>

                {/* ===== ES8 / ES2017 ===== */}
                <Heading2>⚡ ES8 / ES2017 — async/await ra đời</Heading2>

                <CodeBlock title="async-await.js">{`// async/await — viết async code như sync
async function getUser(id) {
    try {
        const res = await fetch(\`/api/users/\${id}\`)
        const user = await res.json()
        return user
    } catch (err) {
        console.error('Failed:', err)
    }
}

// Sequential vs Parallel
// ❌ Sequential — chậm
const a = await fetch('/api/a')
const b = await fetch('/api/b')

// ✅ Parallel — nhanh hơn
const [a, b] = await Promise.all([
    fetch('/api/a'),
    fetch('/api/b'),
])`}</CodeBlock>

                <CodeBlock title="object-entries.js">{`// Object.entries() & Object.values()
const config = { host: 'localhost', port: 3000, debug: true }

Object.keys(config)    // ['host', 'port', 'debug']
Object.values(config)  // ['localhost', 3000, true]
Object.entries(config) // [['host','localhost'], ['port',3000], ['debug',true]]

// Dùng với destructuring
for (const [key, value] of Object.entries(config)) {
    console.log(\`\${key}: \${value}\`)
}

// String padding
'5'.padStart(3, '0')   // '005'
'hi'.padEnd(10, '.')   // 'hi........'

// Object.getOwnPropertyDescriptors()
// Trailing commas in function parameters
function foo(a, b,) {}  // OK từ ES2017`}</CodeBlock>

                {/* ===== ES9 / ES2018 ===== */}
                <Heading2>🔄 ES9 / ES2018 — Rest/Spread cho Object + Async Iteration</Heading2>

                <CodeBlock title="es2018.js">{`// Object Rest/Spread (trước đó chỉ có cho Array)
const { id, ...rest } = { id: 1, name: 'K', age: 28 }
// id = 1, rest = { name: 'K', age: 28 }

const merged = { ...defaults, ...userConfig }

// Async Iteration — for await...of
async function* fetchPages(urls) {
    for (const url of urls) {
        const res = await fetch(url)
        yield await res.json()
    }
}

for await (const page of fetchPages(urls)) {
    console.log(page)
}

// Promise.finally() — chạy dù resolve hay reject
fetch('/api/data')
    .then(handleSuccess)
    .catch(handleError)
    .finally(() => hideLoading())

// Named Capture Groups trong RegExp
const dateRegex = /(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/
const match = '2026-02-26'.match(dateRegex)
match.groups.year  // '2026'
match.groups.month // '02'`}</CodeBlock>

                {/* ===== ES10 / ES2019 ===== */}
                <Heading2>🧹 ES10 / ES2019 — Tiện ích cho Array & String</Heading2>

                <CodeBlock title="es2019.js">{`// Array.flat() & flatMap()
const nested = [1, [2, [3, [4]]]]
nested.flat()     // [1, 2, [3, [4]]]
nested.flat(2)    // [1, 2, 3, [4]]
nested.flat(Infinity) // [1, 2, 3, 4]

// flatMap = map + flat(1)
const sentences = ['Hello World', 'Xin Chào']
sentences.flatMap(s => s.split(' ')) // ['Hello', 'World', 'Xin', 'Chào']

// Object.fromEntries() — ngược lại Object.entries()
const entries = [['name', 'Khuong'], ['age', 28]]
Object.fromEntries(entries) // { name: 'Khuong', age: 28 }

// Chuyển Map → Object
const map = new Map([['a', 1], ['b', 2]])
Object.fromEntries(map) // { a: 1, b: 2 }

// Filter object properties
const filtered = Object.fromEntries(
    Object.entries(config).filter(([key]) => key !== 'debug')
)

// String.trimStart() & trimEnd()
'   hello   '.trimStart() // 'hello   '
'   hello   '.trimEnd()   // '   hello'

// Optional catch binding
try { JSON.parse('{bad}') }
catch { console.log('Parse failed') } // không cần (err)`}</CodeBlock>

                {/* ===== ES11 / ES2020 ===== */}
                <Heading2>🚀 ES11 / ES2020 — Optional Chaining & Nullish Coalescing</Heading2>

                <Paragraph>
                    ES2020 mang đến 2 tính năng được <Highlight>chờ đợi nhất</Highlight>: Optional Chaining và Nullish Coalescing.
                </Paragraph>

                <CodeBlock title="es2020.js">{`// Optional Chaining (?.)
const user = { profile: { address: { city: 'HCM' } } }
user?.profile?.address?.city    // 'HCM'
user?.settings?.theme           // undefined (không throw error)
user?.getProfile?.()            // gọi method nếu tồn tại
users?.[0]?.name                // array access

// Nullish Coalescing (??)
const port = config.port ?? 3000    // chỉ fallback khi null/undefined
const name = user.name ?? 'Guest'

// So sánh với ||
0 || 'default'     // 'default' ❌ (0 là falsy)
0 ?? 'default'     // 0 ✅ (0 không phải null/undefined)
'' || 'default'    // 'default' ❌
'' ?? 'default'    // '' ✅

// BigInt — số nguyên lớn tùy ý
const huge = 9007199254740991n
const alsoHuge = BigInt('9007199254740991')
huge + 1n  // 9007199254740992n (chính xác!)

// Promise.allSettled() — không fail fast như Promise.all
const results = await Promise.allSettled([
    fetch('/api/users'),
    fetch('/api/posts'),
    fetch('/api/broken'),
])
// [{status:'fulfilled', value:...}, {status:'fulfilled', value:...}, {status:'rejected', reason:...}]

// globalThis — truy cập global object mọi nơi
globalThis.setTimeout  // browser: window.setTimeout
                       // Node.js: global.setTimeout

// Dynamic Import
const module = await import('./heavy-module.js')
module.doSomething()

// String.matchAll()
const regex = /\\d+/g
const matches = [...'abc123def456'.matchAll(regex)]
// [['123'], ['456']] — mỗi match có index, groups`}</CodeBlock>

                {/* ===== ES12 / ES2021 ===== */}
                <Heading2>💎 ES12 / ES2021 — Logical Assignment & replaceAll</Heading2>

                <CodeBlock title="es2021.js">{`// Logical Assignment Operators
let user = { name: 'K', settings: null }

// ||= assign nếu falsy
user.settings ||= {}        // user.settings = {}
user.nickname ||= 'Guest'   // user.nickname = 'Guest'

// ??= assign nếu null/undefined
user.theme ??= 'dark'       // user.theme = 'dark'
user.count ??= 0            // user.count = 0 (giữ nguyên 0)

// &&= assign nếu truthy
user.name &&= user.name.trim() // trim nếu name có giá trị

// String.replaceAll()
'hello-world-hello'.replace('hello', 'hi')    // 'hi-world-hello' (chỉ thay 1)
'hello-world-hello'.replaceAll('hello', 'hi') // 'hi-world-hi' ✅

// Promise.any() — resolve khi BẤT KỲ 1 promise nào resolve
const fastest = await Promise.any([
    fetch('https://cdn1.example.com/data'),
    fetch('https://cdn2.example.com/data'),
    fetch('https://cdn3.example.com/data'),
])

// Numeric Separators — dễ đọc hơn
const billion = 1_000_000_000
const bytes = 0xFF_FF_FF
const float = 1_234.567_89

// WeakRef & FinalizationRegistry
const weakRef = new WeakRef(someObject)
weakRef.deref()  // lấy object hoặc undefined nếu đã GC`}</CodeBlock>

                {/* ===== ES13 / ES2022 ===== */}
                <Heading2>🏗️ ES13 / ES2022 — Top-level await & Class Fields</Heading2>

                <CodeBlock title="es2022.js">{`// Top-level await — dùng await ngoài async function
const config = await fetch('/api/config').then(r => r.json())
const db = await connectDB()

// Class Fields — public & private
class User {
    // Public field
    role = 'user'

    // Private field (dùng #)
    #password

    // Static field
    static MAX_AGE = 150

    constructor(name, password) {
        this.name = name
        this.#password = password
    }

    // Private method
    #hashPassword() {
        return crypto.subtle.digest('SHA-256', this.#password)
    }

    checkPassword(input) {
        return input === this.#password
    }

    // Static private
    static #instances = 0
    static getCount() { return User.#instances }
}

// .at() — truy cập phần tử bằng index âm
const arr = [1, 2, 3, 4, 5]
arr.at(-1)   // 5 (phần tử cuối)
arr.at(-2)   // 4
'hello'.at(-1) // 'o'

// Object.hasOwn() — thay thế hasOwnProperty
Object.hasOwn({ a: 1 }, 'a')  // true
// Tốt hơn: obj.hasOwnProperty('a') vì an toàn với Object.create(null)

// Error.cause — chain errors
try {
    await fetch('/api')
} catch (err) {
    throw new Error('API failed', { cause: err })
}

// Array.findLast() & findLastIndex()
const nums = [1, 2, 3, 4, 5]
nums.findLast(n => n % 2 === 0)       // 4
nums.findLastIndex(n => n % 2 === 0)  // 3`}</CodeBlock>

                {/* ===== ES14 / ES2023 ===== */}
                <Heading2>🔀 ES14 / ES2023 — Immutable Array Methods</Heading2>

                <Paragraph>
                    ES2023 tập trung vào <Highlight>immutable array methods</Highlight> — trả về mảng mới thay vì mutate.
                </Paragraph>

                <CodeBlock title="es2023.js">{`// Array immutable methods (trả về mảng mới, KHÔNG mutate)
const original = [3, 1, 4, 1, 5]

// toSorted() — bản immutable của sort()
const sorted = original.toSorted()       // [1, 1, 3, 4, 5]
console.log(original)                    // [3, 1, 4, 1, 5] — không đổi!

// toReversed() — bản immutable của reverse()
const reversed = original.toReversed()   // [5, 1, 4, 1, 3]

// toSpliced() — bản immutable của splice()
const spliced = original.toSpliced(1, 2, 'a', 'b') // [3, 'a', 'b', 1, 5]

// with() — thay thế phần tử tại index
const updated = original.with(2, 99)    // [3, 1, 99, 1, 5]

// 🎯 Rất hữu ích trong React/Redux — không cần spread
// ❌ Cũ: const newState = [...state.slice(0, i), newItem, ...state.slice(i+1)]
// ✅ Mới: const newState = state.with(i, newItem)

// Hashbang (#!) support
// #!/usr/bin/env node — dòng đầu file để chạy trực tiếp

// WeakMap support cho Symbols
const sym = Symbol('key')
const weakMap = new WeakMap()
weakMap.set(sym, 'value')  // giờ Symbol cũng dùng làm key được`}</CodeBlock>

                {/* ===== ES15 / ES2024 ===== */}
                <Heading2>✨ ES15 / ES2024 — Grouping & Promise.withResolvers</Heading2>

                <CodeBlock title="es2024.js">{`// Object.groupBy() & Map.groupBy() 🎉
const products = [
    { name: 'Áo', category: 'clothes', price: 200 },
    { name: 'Quần', category: 'clothes', price: 300 },
    { name: 'iPhone', category: 'tech', price: 25000 },
    { name: 'MacBook', category: 'tech', price: 35000 },
]

const grouped = Object.groupBy(products, p => p.category)
// { clothes: [{name:'Áo',...}, {name:'Quần',...}], tech: [{name:'iPhone',...}, ...] }

// Trước đó phải dùng reduce:
// const grouped = products.reduce((acc, p) => {
//     (acc[p.category] ||= []).push(p)
//     return acc
// }, {})

// Map.groupBy — khi key không phải string
const byPrice = Map.groupBy(products, p => p.price > 1000 ? 'expensive' : 'cheap')

// Promise.withResolvers() — tạo Promise + resolve/reject tách rời
const { promise, resolve, reject } = Promise.withResolvers()

// Thay vì:
// let resolve, reject
// const promise = new Promise((res, rej) => { resolve = res; reject = rej })

// Hữu ích cho event-based APIs
function waitForEvent(element, event) {
    const { promise, resolve } = Promise.withResolvers()
    element.addEventListener(event, resolve, { once: true })
    return promise
}

// ArrayBuffer.resize() & transfer()
const buffer = new ArrayBuffer(8, { maxByteLength: 16 })
buffer.resize(12) // mở rộng mà không copy

// Atomics.waitAsync() — async version của Atomics.wait
// String.isWellFormed() & toWellFormed() — xử lý lone surrogates
'hello'.isWellFormed() // true
'\\uD800'.isWellFormed() // false
'\\uD800'.toWellFormed() // '\\uFFFD' (replacement character)`}</CodeBlock>

                {/* ===== Cheat Sheet ===== */}
                <Heading2>📋 Cheat Sheet — Tóm tắt nhanh</Heading2>

                <CodeBlock title="cheat-sheet.js">{`// ES6 (2015): let/const, arrow fn, template literals, destructuring,
//             spread/rest, classes, promises, modules, Map/Set, Symbol
// ES7 (2016): includes(), **
// ES8 (2017): async/await, Object.entries/values, padStart/padEnd
// ES9 (2018): Object rest/spread, for await...of, Promise.finally
// ES10 (2019): flat/flatMap, Object.fromEntries, trimStart/trimEnd
// ES11 (2020): ?., ??, BigInt, Promise.allSettled, globalThis, dynamic import
// ES12 (2021): &&= ||= ??=, replaceAll, Promise.any, numeric separators
// ES13 (2022): top-level await, #private fields, .at(), Object.hasOwn
// ES14 (2023): toSorted/toReversed/toSpliced/with (immutable array)
// ES15 (2024): Object.groupBy, Promise.withResolvers, ArrayBuffer.resize`}</CodeBlock>

                <Callout type="tip">
                    Tip: Dùng <InlineCode>caniuse.com</InlineCode> hoặc <InlineCode>kangax.github.io/compat-table</InlineCode>{' '}
                    để kiểm tra browser support trước khi dùng feature mới. Trong production, luôn dùng transpiler (Babel/SWC) để đảm bảo tương thích.
                </Callout>
            </>
        ),
        en: (
            <>
                <Paragraph>
                    JavaScript evolves yearly through the <Highlight>ECMAScript (ES)</Highlight> standard. Each version brings
                    new features that make code more concise, readable, and powerful. This article covers all{' '}
                    <Highlight>must-know features</Highlight> from ES6 (2015) to ES2024.
                </Paragraph>

                <Callout type="info">
                    💡 Every feature includes a code example. Copy and paste into your browser console to try them out.
                </Callout>

                {/* ===== ES6 / ES2015 ===== */}
                <Heading2>🔥 ES6 / ES2015 — The Biggest Revolution</Heading2>

                <Paragraph>
                    ES6 was the <Highlight>largest update</Highlight> in JavaScript history, fundamentally changing how we write code.
                </Paragraph>

                <CodeBlock title="let-const.js">{`// let & const replace var
let count = 0        // block-scoped, reassignable
const PI = 3.14159   // block-scoped, not reassignable

// var has hoisting + function-scope → easy to cause bugs
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(i)) // 3, 3, 3 ❌
}
for (let j = 0; j < 3; j++) {
    setTimeout(() => console.log(j)) // 0, 1, 2 ✅
}`}</CodeBlock>

                <CodeBlock title="arrow-functions.js">{`// Arrow Functions — concise + lexical this
const add = (a, b) => a + b
const square = x => x * x
const greet = () => 'Hello!'

// Lexical this — doesn't bind new this
class Timer {
    constructor() {
        this.seconds = 0
        setInterval(() => this.seconds++, 1000) // this = Timer ✅
    }
}`}</CodeBlock>

                <CodeBlock title="template-literals.js">{`// Template Literals
const name = 'Khuong'
const greeting = \`Hello \${name}! Today is \${new Date().toLocaleDateString()}\`

// Multi-line strings
const html = \`
    <div class="card">
        <h2>\${name}</h2>
    </div>
\`

// Tagged templates
function highlight(strings, ...values) {
    return strings.reduce((result, str, i) =>
        result + str + (values[i] ? \`<mark>\${values[i]}</mark>\` : ''), '')
}
const msg = highlight\`Hello \${name}, you have \${5} notifications\``}</CodeBlock>

                <CodeBlock title="destructuring.js">{`// Destructuring — unpack objects/arrays
const { name, age, job = 'Developer' } = user    // object
const [first, , third] = [1, 2, 3]               // array (skip 2nd)
const [head, ...tail] = [1, 2, 3, 4]             // rest: tail = [2,3,4]

// Nested destructuring
const { address: { city } } = { address: { city: 'HCM' } }

// Function params
function createUser({ name, age = 25 }) {
    return { name, age }
}

// Swap variables
let a = 1, b = 2;
[a, b] = [b, a]  // a=2, b=1`}</CodeBlock>

                <CodeBlock title="spread-rest.js">{`// Spread Operator (...)
const arr1 = [1, 2, 3]
const arr2 = [...arr1, 4, 5]        // [1,2,3,4,5]
const obj1 = { a: 1 }
const obj2 = { ...obj1, b: 2 }      // { a: 1, b: 2 }

// Rest Parameters
function sum(...numbers) {
    return numbers.reduce((a, b) => a + b, 0)
}
sum(1, 2, 3, 4) // 10`}</CodeBlock>

                <CodeBlock title="classes.js">{`// Classes — syntactic sugar for prototypes
class Animal {
    constructor(name) {
        this.name = name
    }
    speak() {
        return \`\${this.name} makes a noise\`
    }
}

class Dog extends Animal {
    speak() {
        return \`\${this.name} barks\`
    }
}

const dog = new Dog('Rex')
dog.speak() // "Rex barks"`}</CodeBlock>

                <CodeBlock title="promises.js">{`// Promises — handle async operations
const fetchData = () => new Promise((resolve, reject) => {
    setTimeout(() => resolve({ data: 'OK' }), 1000)
})

fetchData()
    .then(res => console.log(res.data))
    .catch(err => console.error(err))

// Promise.all — run in parallel
const [users, posts] = await Promise.all([
    fetch('/api/users').then(r => r.json()),
    fetch('/api/posts').then(r => r.json()),
])`}</CodeBlock>

                <CodeBlock title="modules-iterators.js">{`// Modules — import/export
export const API_URL = 'https://api.example.com'
export default function fetchData() { /* ... */ }
import fetchData, { API_URL } from './api'

// Symbols — unique identifiers
const id = Symbol('id')
const user = { [id]: 123, name: 'Khuong' }

// Iterators & for...of
for (const char of 'Hello') console.log(char)
for (const [key, val] of new Map([['a', 1]])) console.log(key, val)

// Default Parameters
function greet(name = 'World') {
    return \`Hello \${name}\`
}

// Map & Set
const map = new Map([['key', 'value']])
const set = new Set([1, 2, 2, 3]) // {1, 2, 3}

// WeakMap & WeakSet — garbage collection friendly
const weakMap = new WeakMap()
weakMap.set(someObj, 'metadata')`}</CodeBlock>

                {/* ===== ES7 / ES2016 ===== */}
                <Heading2>📌 ES7 / ES2016 — Small but Useful</Heading2>

                <CodeBlock title="es2016.js">{`// Array.prototype.includes()
const fruits = ['🍎', '🍌', '🍊']
fruits.includes('🍌')  // true (replaces indexOf !== -1)

// Exponentiation Operator (**)
2 ** 10  // 1024 (replaces Math.pow(2, 10))
let x = 2
x **= 3  // 8`}</CodeBlock>

                {/* ===== ES8 / ES2017 ===== */}
                <Heading2>⚡ ES8 / ES2017 — async/await Arrives</Heading2>

                <CodeBlock title="async-await.js">{`// async/await — write async code like sync
async function getUser(id) {
    try {
        const res = await fetch(\`/api/users/\${id}\`)
        const user = await res.json()
        return user
    } catch (err) {
        console.error('Failed:', err)
    }
}

// Sequential vs Parallel
// ❌ Sequential — slow
const a = await fetch('/api/a')
const b = await fetch('/api/b')

// ✅ Parallel — faster
const [a, b] = await Promise.all([
    fetch('/api/a'),
    fetch('/api/b'),
])`}</CodeBlock>

                <CodeBlock title="object-entries.js">{`// Object.entries() & Object.values()
const config = { host: 'localhost', port: 3000, debug: true }

Object.keys(config)    // ['host', 'port', 'debug']
Object.values(config)  // ['localhost', 3000, true]
Object.entries(config) // [['host','localhost'], ['port',3000], ['debug',true]]

// Use with destructuring
for (const [key, value] of Object.entries(config)) {
    console.log(\`\${key}: \${value}\`)
}

// String padding
'5'.padStart(3, '0')   // '005'
'hi'.padEnd(10, '.')   // 'hi........'

// Object.getOwnPropertyDescriptors()
// Trailing commas in function parameters
function foo(a, b,) {}  // OK since ES2017`}</CodeBlock>

                {/* ===== ES9 / ES2018 ===== */}
                <Heading2>🔄 ES9 / ES2018 — Object Rest/Spread & Async Iteration</Heading2>

                <CodeBlock title="es2018.js">{`// Object Rest/Spread (previously only for Arrays)
const { id, ...rest } = { id: 1, name: 'K', age: 28 }
// id = 1, rest = { name: 'K', age: 28 }

const merged = { ...defaults, ...userConfig }

// Async Iteration — for await...of
async function* fetchPages(urls) {
    for (const url of urls) {
        const res = await fetch(url)
        yield await res.json()
    }
}

for await (const page of fetchPages(urls)) {
    console.log(page)
}

// Promise.finally() — runs regardless of resolve/reject
fetch('/api/data')
    .then(handleSuccess)
    .catch(handleError)
    .finally(() => hideLoading())

// Named Capture Groups in RegExp
const dateRegex = /(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/
const match = '2026-02-26'.match(dateRegex)
match.groups.year  // '2026'
match.groups.month // '02'`}</CodeBlock>

                {/* ===== ES10 / ES2019 ===== */}
                <Heading2>🧹 ES10 / ES2019 — Array & String Utilities</Heading2>

                <CodeBlock title="es2019.js">{`// Array.flat() & flatMap()
const nested = [1, [2, [3, [4]]]]
nested.flat()     // [1, 2, [3, [4]]]
nested.flat(2)    // [1, 2, 3, [4]]
nested.flat(Infinity) // [1, 2, 3, 4]

// flatMap = map + flat(1)
const sentences = ['Hello World', 'Xin Chào']
sentences.flatMap(s => s.split(' ')) // ['Hello', 'World', 'Xin', 'Chào']

// Object.fromEntries() — reverse of Object.entries()
const entries = [['name', 'Khuong'], ['age', 28]]
Object.fromEntries(entries) // { name: 'Khuong', age: 28 }

// Convert Map → Object
const map = new Map([['a', 1], ['b', 2]])
Object.fromEntries(map) // { a: 1, b: 2 }

// Filter object properties
const filtered = Object.fromEntries(
    Object.entries(config).filter(([key]) => key !== 'debug')
)

// String.trimStart() & trimEnd()
'   hello   '.trimStart() // 'hello   '
'   hello   '.trimEnd()   // '   hello'

// Optional catch binding
try { JSON.parse('{bad}') }
catch { console.log('Parse failed') } // no (err) needed`}</CodeBlock>

                {/* ===== ES11 / ES2020 ===== */}
                <Heading2>🚀 ES11 / ES2020 — Optional Chaining & Nullish Coalescing</Heading2>

                <Paragraph>
                    ES2020 brought the two <Highlight>most anticipated</Highlight> features: Optional Chaining and Nullish Coalescing.
                </Paragraph>

                <CodeBlock title="es2020.js">{`// Optional Chaining (?.)
const user = { profile: { address: { city: 'HCM' } } }
user?.profile?.address?.city    // 'HCM'
user?.settings?.theme           // undefined (no error thrown)
user?.getProfile?.()            // call method if it exists
users?.[0]?.name                // array access

// Nullish Coalescing (??)
const port = config.port ?? 3000    // fallback only on null/undefined
const name = user.name ?? 'Guest'

// Comparison with ||
0 || 'default'     // 'default' ❌ (0 is falsy)
0 ?? 'default'     // 0 ✅ (0 is not null/undefined)
'' || 'default'    // 'default' ❌
'' ?? 'default'    // '' ✅

// BigInt — arbitrary precision integers
const huge = 9007199254740991n
const alsoHuge = BigInt('9007199254740991')
huge + 1n  // 9007199254740992n (precise!)

// Promise.allSettled() — doesn't fail fast like Promise.all
const results = await Promise.allSettled([
    fetch('/api/users'),
    fetch('/api/posts'),
    fetch('/api/broken'),
])
// [{status:'fulfilled', value:...}, {status:'fulfilled', value:...}, {status:'rejected', reason:...}]

// globalThis — access global object anywhere
globalThis.setTimeout  // browser: window.setTimeout
                       // Node.js: global.setTimeout

// Dynamic Import
const module = await import('./heavy-module.js')
module.doSomething()

// String.matchAll()
const regex = /\\d+/g
const matches = [...'abc123def456'.matchAll(regex)]
// [['123'], ['456']] — each match has index, groups`}</CodeBlock>

                {/* ===== ES12 / ES2021 ===== */}
                <Heading2>💎 ES12 / ES2021 — Logical Assignment & replaceAll</Heading2>

                <CodeBlock title="es2021.js">{`// Logical Assignment Operators
let user = { name: 'K', settings: null }

// ||= assign if falsy
user.settings ||= {}        // user.settings = {}
user.nickname ||= 'Guest'   // user.nickname = 'Guest'

// ??= assign if null/undefined
user.theme ??= 'dark'       // user.theme = 'dark'
user.count ??= 0            // user.count = 0 (preserves 0)

// &&= assign if truthy
user.name &&= user.name.trim() // trim if name has value

// String.replaceAll()
'hello-world-hello'.replace('hello', 'hi')    // 'hi-world-hello' (only 1st)
'hello-world-hello'.replaceAll('hello', 'hi') // 'hi-world-hi' ✅

// Promise.any() — resolves when ANY promise resolves
const fastest = await Promise.any([
    fetch('https://cdn1.example.com/data'),
    fetch('https://cdn2.example.com/data'),
    fetch('https://cdn3.example.com/data'),
])

// Numeric Separators — better readability
const billion = 1_000_000_000
const bytes = 0xFF_FF_FF
const float = 1_234.567_89

// WeakRef & FinalizationRegistry
const weakRef = new WeakRef(someObject)
weakRef.deref()  // get object or undefined if GC'd`}</CodeBlock>

                {/* ===== ES13 / ES2022 ===== */}
                <Heading2>🏗️ ES13 / ES2022 — Top-level await & Class Fields</Heading2>

                <CodeBlock title="es2022.js">{`// Top-level await — use await outside async functions
const config = await fetch('/api/config').then(r => r.json())
const db = await connectDB()

// Class Fields — public & private
class User {
    // Public field
    role = 'user'

    // Private field (using #)
    #password

    // Static field
    static MAX_AGE = 150

    constructor(name, password) {
        this.name = name
        this.#password = password
    }

    // Private method
    #hashPassword() {
        return crypto.subtle.digest('SHA-256', this.#password)
    }

    checkPassword(input) {
        return input === this.#password
    }

    // Static private
    static #instances = 0
    static getCount() { return User.#instances }
}

// .at() — access elements with negative index
const arr = [1, 2, 3, 4, 5]
arr.at(-1)   // 5 (last element)
arr.at(-2)   // 4
'hello'.at(-1) // 'o'

// Object.hasOwn() — replaces hasOwnProperty
Object.hasOwn({ a: 1 }, 'a')  // true
// Better than obj.hasOwnProperty('a') — safe with Object.create(null)

// Error.cause — chain errors
try {
    await fetch('/api')
} catch (err) {
    throw new Error('API failed', { cause: err })
}

// Array.findLast() & findLastIndex()
const nums = [1, 2, 3, 4, 5]
nums.findLast(n => n % 2 === 0)       // 4
nums.findLastIndex(n => n % 2 === 0)  // 3`}</CodeBlock>

                {/* ===== ES14 / ES2023 ===== */}
                <Heading2>🔀 ES14 / ES2023 — Immutable Array Methods</Heading2>

                <Paragraph>
                    ES2023 focuses on <Highlight>immutable array methods</Highlight> — returning new arrays instead of mutating.
                </Paragraph>

                <CodeBlock title="es2023.js">{`// Immutable array methods (return new array, do NOT mutate)
const original = [3, 1, 4, 1, 5]

// toSorted() — immutable version of sort()
const sorted = original.toSorted()       // [1, 1, 3, 4, 5]
console.log(original)                    // [3, 1, 4, 1, 5] — unchanged!

// toReversed() — immutable version of reverse()
const reversed = original.toReversed()   // [5, 1, 4, 1, 3]

// toSpliced() — immutable version of splice()
const spliced = original.toSpliced(1, 2, 'a', 'b') // [3, 'a', 'b', 1, 5]

// with() — replace element at index
const updated = original.with(2, 99)    // [3, 1, 99, 1, 5]

// 🎯 Very useful in React/Redux — no spread needed
// ❌ Old: const newState = [...state.slice(0, i), newItem, ...state.slice(i+1)]
// ✅ New: const newState = state.with(i, newItem)

// Hashbang (#!) support
// #!/usr/bin/env node — first line for direct execution

// WeakMap support for Symbols
const sym = Symbol('key')
const weakMap = new WeakMap()
weakMap.set(sym, 'value')  // Symbols can now be WeakMap keys`}</CodeBlock>

                {/* ===== ES15 / ES2024 ===== */}
                <Heading2>✨ ES15 / ES2024 — Grouping & Promise.withResolvers</Heading2>

                <CodeBlock title="es2024.js">{`// Object.groupBy() & Map.groupBy() 🎉
const products = [
    { name: 'Shirt', category: 'clothes', price: 200 },
    { name: 'Pants', category: 'clothes', price: 300 },
    { name: 'iPhone', category: 'tech', price: 25000 },
    { name: 'MacBook', category: 'tech', price: 35000 },
]

const grouped = Object.groupBy(products, p => p.category)
// { clothes: [{name:'Shirt',...}, {name:'Pants',...}], tech: [{name:'iPhone',...}, ...] }

// Previously required reduce:
// const grouped = products.reduce((acc, p) => {
//     (acc[p.category] ||= []).push(p)
//     return acc
// }, {})

// Map.groupBy — when keys aren't strings
const byPrice = Map.groupBy(products, p => p.price > 1000 ? 'expensive' : 'cheap')

// Promise.withResolvers() — create Promise + resolve/reject separately
const { promise, resolve, reject } = Promise.withResolvers()

// Instead of:
// let resolve, reject
// const promise = new Promise((res, rej) => { resolve = res; reject = rej })

// Useful for event-based APIs
function waitForEvent(element, event) {
    const { promise, resolve } = Promise.withResolvers()
    element.addEventListener(event, resolve, { once: true })
    return promise
}

// ArrayBuffer.resize() & transfer()
const buffer = new ArrayBuffer(8, { maxByteLength: 16 })
buffer.resize(12) // grow without copying

// Atomics.waitAsync() — async version of Atomics.wait
// String.isWellFormed() & toWellFormed() — handle lone surrogates
'hello'.isWellFormed() // true
'\\uD800'.isWellFormed() // false
'\\uD800'.toWellFormed() // '\\uFFFD' (replacement character)`}</CodeBlock>

                {/* ===== Cheat Sheet ===== */}
                <Heading2>📋 Cheat Sheet — Quick Reference</Heading2>

                <CodeBlock title="cheat-sheet.js">{`// ES6 (2015): let/const, arrow fn, template literals, destructuring,
//             spread/rest, classes, promises, modules, Map/Set, Symbol
// ES7 (2016): includes(), **
// ES8 (2017): async/await, Object.entries/values, padStart/padEnd
// ES9 (2018): Object rest/spread, for await...of, Promise.finally
// ES10 (2019): flat/flatMap, Object.fromEntries, trimStart/trimEnd
// ES11 (2020): ?., ??, BigInt, Promise.allSettled, globalThis, dynamic import
// ES12 (2021): &&= ||= ??=, replaceAll, Promise.any, numeric separators
// ES13 (2022): top-level await, #private fields, .at(), Object.hasOwn
// ES14 (2023): toSorted/toReversed/toSpliced/with (immutable array)
// ES15 (2024): Object.groupBy, Promise.withResolvers, ArrayBuffer.resize`}</CodeBlock>

                <Callout type="tip">
                    Tip: Use <InlineCode>caniuse.com</InlineCode> or <InlineCode>kangax.github.io/compat-table</InlineCode>{' '}
                    to check browser support before using new features. In production, always use a transpiler (Babel/SWC) for compatibility.
                </Callout>
            </>
        ),
    },
}

export default ecmascriptFeatures
