import { BlogPost } from '../types'
import { CodeBlock, Heading2, Heading3, Paragraph, Highlight, InlineCode, Callout } from '../components/BlogComponents'

const viContent = (
    <>
        <Paragraph>
            JavaScript cung cấp rất nhiều <Highlight>built-in methods</Highlight> cho Array, String và Object.
            Nắm vững các hàm này giúp bạn viết code ngắn gọn, dễ đọc và hiệu quả hơn.
            Dưới đây là tổng hợp các hàm <Highlight>thường gặp nhất</Highlight> trong phỏng vấn và thực tế.
        </Paragraph>

        <Callout type="info">
            Mỗi hàm đều có ví dụ thực tế, cú pháp, và lưu ý quan trọng. Nắm vững những hàm này
            là bước đầu tiên để viết JavaScript chuyên nghiệp.
        </Callout>

        {/* ═══════════ ARRAY METHODS ═══════════ */}
        <Heading2>Array Methods — Xử lý mảng</Heading2>

        {/* ── map ── */}
        <Heading3>1. Array.map() — Biến đổi từng phần tử</Heading3>
        <Paragraph>
            Tạo <Highlight>mảng mới</Highlight> bằng cách áp dụng hàm lên <Highlight>mỗi phần tử</Highlight>.
            Không thay đổi mảng gốc. Trả về mảng <Highlight>cùng độ dài</Highlight>.
        </Paragraph>
        <CodeBlock title="map.js">{`// Cú pháp: array.map((element, index, array) => newValue)

const nums = [1, 2, 3, 4, 5]

// Ví dụ 1: Nhân đôi mỗi phần tử
const doubled = nums.map(n => n * 2)
// → [2, 4, 6, 8, 10]

// Ví dụ 2: Lấy tên từ danh sách objects
const users = [{ name: 'An', age: 25 }, { name: 'Bình', age: 30 }]
const names = users.map(u => u.name)
// → ['An', 'Bình']

// Ví dụ 3: Thêm index vào mỗi phần tử
const indexed = ['a', 'b', 'c'].map((item, i) => \`\${i + 1}. \${item}\`)
// → ['1. a', '2. b', '3. c']

// ⚠️ Lưu ý: map() LUÔN trả về mảng cùng độ dài
// Nếu muốn bỏ bớt phần tử → dùng filter() trước`}</CodeBlock>

        {/* ── filter ── */}
        <Heading3>2. Array.filter() — Lọc phần tử</Heading3>
        <Paragraph>
            Tạo <Highlight>mảng mới</Highlight> chỉ chứa các phần tử <Highlight>thỏa điều kiện</Highlight> (callback trả về true).
            Không thay đổi mảng gốc. Có thể trả về mảng ngắn hơn hoặc rỗng.
        </Paragraph>
        <CodeBlock title="filter.js">{`// Cú pháp: array.filter((element, index, array) => boolean)

const nums = [1, 2, 3, 4, 5, 6, 7, 8]

// Ví dụ 1: Lọc số chẵn
const evens = nums.filter(n => n % 2 === 0)
// → [2, 4, 6, 8]

// Ví dụ 2: Lọc user đủ tuổi
const users = [
    { name: 'An', age: 17 },
    { name: 'Bình', age: 25 },
    { name: 'Chi', age: 15 },
]
const adults = users.filter(u => u.age >= 18)
// → [{ name: 'Bình', age: 25 }]

// Ví dụ 3: Xóa giá trị falsy (null, undefined, '', 0, false)
const mixed = [0, 1, '', 'hello', null, undefined, false, true]
const truthy = mixed.filter(Boolean)
// → [1, 'hello', true]

// Ví dụ 4: Lọc phần tử unique (loại bỏ trùng lặp)
const arr = [1, 2, 2, 3, 3, 3]
const unique = arr.filter((v, i, a) => a.indexOf(v) === i)
// → [1, 2, 3]`}</CodeBlock>

        {/* ── reduce ── */}
        <Heading3>3. Array.reduce() — Gom lại thành một giá trị</Heading3>
        <Paragraph>
            <Highlight>Mạnh nhất</Highlight> trong các array methods. Duyệt qua mảng, tích lũy kết quả vào
            <InlineCode>accumulator</InlineCode>. Có thể trả về bất kỳ kiểu nào: number, string, object, array.
        </Paragraph>
        <CodeBlock title="reduce.js">{`// Cú pháp: array.reduce((acc, cur, index, array) => newAcc, initialValue)

const nums = [1, 2, 3, 4, 5]

// Ví dụ 1: Tính tổng
const sum = nums.reduce((acc, cur) => acc + cur, 0)
// → 15

// Ví dụ 2: Tìm max
const max = nums.reduce((acc, cur) => Math.max(acc, cur), -Infinity)
// → 5

// Ví dụ 3: Đếm tần suất (frequency counter)
const fruits = ['🍎', '🍌', '🍎', '🍊', '🍌', '🍎']
const count = fruits.reduce((acc, fruit) => {
    acc[fruit] = (acc[fruit] || 0) + 1
    return acc
}, {})
// → { '🍎': 3, '🍌': 2, '🍊': 1 }

// Ví dụ 4: Group by
const people = [
    { name: 'An', dept: 'Dev' },
    { name: 'Bình', dept: 'QA' },
    { name: 'Chi', dept: 'Dev' },
]
const byDept = people.reduce((acc, p) => {
    (acc[p.dept] = acc[p.dept] || []).push(p.name)
    return acc
}, {})
// → { Dev: ['An', 'Chi'], QA: ['Bình'] }

// Ví dụ 5: Flatten mảng lồng nhau
const nested = [[1, 2], [3, 4], [5]]
const flat = nested.reduce((acc, cur) => acc.concat(cur), [])
// → [1, 2, 3, 4, 5]

// ⚠️ Luôn truyền initialValue để tránh lỗi với mảng rỗng`}</CodeBlock>

        {/* ── find / findIndex ── */}
        <Heading3>4. Array.find() / findIndex() — Tìm phần tử</Heading3>
        <Paragraph>
            <InlineCode>find()</InlineCode> trả về <Highlight>phần tử đầu tiên</Highlight> thỏa điều kiện (hoặc undefined).
            <InlineCode>findIndex()</InlineCode> trả về <Highlight>vị trí</Highlight> (hoặc -1).
        </Paragraph>
        <CodeBlock title="find.js">{`// Cú pháp: array.find((element, index) => boolean)
// Cú pháp: array.findIndex((element, index) => boolean)

const users = [
    { id: 1, name: 'An', role: 'admin' },
    { id: 2, name: 'Bình', role: 'user' },
    { id: 3, name: 'Chi', role: 'admin' },
]

// find: trả về object đầu tiên khớp
const admin = users.find(u => u.role === 'admin')
// → { id: 1, name: 'An', role: 'admin' }

// findIndex: trả về vị trí
const idx = users.findIndex(u => u.id === 2)
// → 1

// Không tìm thấy:
const ghost = users.find(u => u.name === 'Dung')
// → undefined

const ghostIdx = users.findIndex(u => u.name === 'Dung')
// → -1

// ⚠️ find() chỉ trả về phần tử ĐẦU TIÊN thỏa điều kiện
// Muốn tất cả → dùng filter()`}</CodeBlock>

        {/* ── some / every ── */}
        <Heading3>5. Array.some() / every() — Kiểm tra điều kiện</Heading3>
        <Paragraph>
            <InlineCode>some()</InlineCode> → true nếu <Highlight>ít nhất 1</Highlight> phần tử thỏa.
            <InlineCode>every()</InlineCode> → true nếu <Highlight>tất cả</Highlight> phần tử thỏa.
        </Paragraph>
        <CodeBlock title="some-every.js">{`const nums = [1, 2, 3, 4, 5]

// some: có ít nhất 1 số chẵn?
const hasEven = nums.some(n => n % 2 === 0)
// → true

// every: tất cả đều dương?
const allPositive = nums.every(n => n > 0)
// → true

const allEven = nums.every(n => n % 2 === 0)
// → false

// Ứng dụng: kiểm tra form validation
const fields = ['An', 'an@email.com', '123456']
const allFilled = fields.every(f => f.length > 0)
// → true

// ⚠️ some() dừng ngay khi tìm thấy true (short-circuit)
// ⚠️ every() dừng ngay khi tìm thấy false (short-circuit)`}</CodeBlock>

        {/* ── forEach ── */}
        <Heading3>6. Array.forEach() — Duyệt mảng</Heading3>
        <Paragraph>
            Thực thi hàm cho <Highlight>mỗi phần tử</Highlight>. Không trả về gì (<InlineCode>undefined</InlineCode>).
            Không thể <InlineCode>break</InlineCode> hoặc <InlineCode>return</InlineCode> sớm.
        </Paragraph>
        <CodeBlock title="forEach.js">{`const nums = [1, 2, 3]

// forEach: thực thi side-effect
nums.forEach((n, i) => {
    console.log(\`Index \${i}: \${n}\`)
})
// Output: "Index 0: 1", "Index 1: 2", "Index 2: 3"

// ⚠️ forEach KHÔNG trả về gì
const result = nums.forEach(n => n * 2)
// result = undefined (KHÔNG phải [2, 4, 6])

// ⚠️ Không thể break/return sớm
// Nếu cần break → dùng for...of hoặc for loop
// Nếu cần return mảng mới → dùng map()

// ✅ Khi nào dùng forEach?
// - Log, console.log
// - Gọi API cho mỗi phần tử
// - Cập nhật biến ngoài (side-effect)`}</CodeBlock>

        {/* ── sort ── */}
        <Heading3>7. Array.sort() — Sắp xếp</Heading3>
        <Paragraph>
            <Highlight>Sắp xếp tại chỗ</Highlight> (thay đổi mảng gốc!). Mặc định sort theo <Highlight>string Unicode</Highlight>
            → phải truyền compare function cho số.
        </Paragraph>
        <CodeBlock title="sort.js">{`// ⚠️ CẨN THẬN: sort() MẶC ĐỊNH sort theo string!
[10, 9, 2, 1].sort()
// → [1, 10, 2, 9] ← SAI! (sort theo string: "1" < "10" < "2")

// ✅ Sort số: truyền compare function
[10, 9, 2, 1].sort((a, b) => a - b)
// → [1, 2, 9, 10] ← Tăng dần

[10, 9, 2, 1].sort((a, b) => b - a)
// → [10, 9, 2, 1] ← Giảm dần

// Sort objects theo thuộc tính
const users = [
    { name: 'Chi', age: 28 },
    { name: 'An', age: 25 },
    { name: 'Bình', age: 30 },
]
users.sort((a, b) => a.age - b.age)
// → [An(25), Chi(28), Bình(30)]

// Sort theo tên (string)
users.sort((a, b) => a.name.localeCompare(b.name))
// → [An, Bình, Chi]

// ⚠️ sort() THAY ĐỔI mảng gốc!
// Muốn giữ mảng gốc → copy trước:
const sorted = [...nums].sort((a, b) => a - b)`}</CodeBlock>

        {/* ── includes / indexOf ── */}
        <Heading3>8. Array.includes() / indexOf() — Kiểm tra tồn tại</Heading3>
        <Paragraph>
            <InlineCode>includes()</InlineCode> → true/false. <InlineCode>indexOf()</InlineCode> → vị trí hoặc -1.
        </Paragraph>
        <CodeBlock title="includes.js">{`const fruits = ['🍎', '🍌', '🍊']

// includes: kiểm tra có tồn tại không
fruits.includes('🍎')    // → true
fruits.includes('🍇')    // → false

// indexOf: tìm vị trí
fruits.indexOf('🍌')     // → 1
fruits.indexOf('🍇')     // → -1

// Bắt đầu tìm từ vị trí cụ thể
fruits.includes('🍎', 1) // → false (tìm từ index 1)

// ⚠️ includes() dùng === để so sánh
// Không tìm được object reference
const arr = [{ id: 1 }, { id: 2 }]
arr.includes({ id: 1 })  // → false (khác reference!)
// → dùng find() thay thế`}</CodeBlock>

        {/* ── flat / flatMap ── */}
        <Heading3>9. Array.flat() / flatMap() — Làm phẳng</Heading3>
        <Paragraph>
            <InlineCode>flat()</InlineCode> làm phẳng mảng lồng nhau.
            <InlineCode>flatMap()</InlineCode> = <InlineCode>map()</InlineCode> + <InlineCode>flat(1)</InlineCode>.
        </Paragraph>
        <CodeBlock title="flat.js">{`// flat(depth) — mặc định depth = 1
const nested = [1, [2, 3], [4, [5, 6]]]

nested.flat()      // → [1, 2, 3, 4, [5, 6]]  (1 tầng)
nested.flat(2)     // → [1, 2, 3, 4, 5, 6]     (2 tầng)
nested.flat(Infinity) // → [1, 2, 3, 4, 5, 6]  (tất cả tầng)

// flatMap: map rồi flat 1 tầng
const sentences = ['hello world', 'foo bar']
const words = sentences.flatMap(s => s.split(' '))
// → ['hello', 'world', 'foo', 'bar']
// Tương đương: sentences.map(s => s.split(' ')).flat()

// Ứng dụng: mở rộng 1 → nhiều
const nums = [1, 2, 3]
nums.flatMap(n => [n, n * 10])
// → [1, 10, 2, 20, 3, 30]`}</CodeBlock>

        {/* ── Spread / Destructuring ── */}
        <Heading3>10. Spread & Destructuring — Thao tác nhanh</Heading3>
        <Paragraph>
            Không phải method nhưng là <Highlight>cú pháp quan trọng nhất</Highlight> khi làm việc với array/object.
        </Paragraph>
        <CodeBlock title="spread-destructuring.js">{`// ── Spread (...) ──
const a = [1, 2, 3]
const b = [4, 5]

// Copy mảng (shallow)
const copy = [...a]          // [1, 2, 3]

// Merge mảng
const merged = [...a, ...b]  // [1, 2, 3, 4, 5]

// Merge objects
const defaults = { theme: 'dark', lang: 'vi' }
const custom = { lang: 'en', fontSize: 14 }
const config = { ...defaults, ...custom }
// → { theme: 'dark', lang: 'en', fontSize: 14 }

// ── Destructuring ──
const [first, second, ...rest] = [1, 2, 3, 4, 5]
// first=1, second=2, rest=[3,4,5]

const { name, age, role = 'user' } = { name: 'An', age: 25 }
// name='An', age=25, role='user' (default value)

// Rename khi destructure
const { name: userName } = { name: 'An' }
// userName = 'An'

// Nested destructuring
const { address: { city } } = { address: { city: 'HCM' } }
// city = 'HCM'`}</CodeBlock>

        {/* ═══════════ STRING METHODS ═══════════ */}
        <Heading2>String Methods — Xử lý chuỗi</Heading2>

        <Heading3>11. Các hàm String thường dùng</Heading3>
        <CodeBlock title="string-methods.js">{`const str = '  Hello World  '

// Xóa khoảng trắng
str.trim()          // 'Hello World'
str.trimStart()     // 'Hello World  '
str.trimEnd()       // '  Hello World'

// Tìm kiếm
'Hello'.includes('ell')      // true
'Hello'.startsWith('He')     // true
'Hello'.endsWith('lo')       // true
'Hello World'.indexOf('World') // 6

// Cắt chuỗi
'Hello'.slice(1, 3)          // 'el'
'Hello'.slice(-2)            // 'lo'
'Hello'.substring(1, 3)      // 'el'

// Thay thế
'Hello World'.replace('World', 'JS')       // 'Hello JS'
'aabbcc'.replaceAll('b', 'x')              // 'aaxxcc'

// Chuyển đổi
'Hello'.toUpperCase()        // 'HELLO'
'Hello'.toLowerCase()        // 'hello'

// Split / Join (Array ↔ String)
'a,b,c'.split(',')           // ['a', 'b', 'c']
['a', 'b', 'c'].join('-')    // 'a-b-c'
['a', 'b', 'c'].join('')     // 'abc'

// Lặp
'ha'.repeat(3)               // 'hahaha'

// Padding
'5'.padStart(3, '0')         // '005'
'5'.padEnd(3, '0')           // '500'

// Template literals
const name = 'An'
\`Hello \${name}, 1+1 = \${1+1}\`  // 'Hello An, 1+1 = 2'`}</CodeBlock>

        {/* ═══════════ OBJECT METHODS ═══════════ */}
        <Heading2>Object Methods — Xử lý đối tượng</Heading2>

        <Heading3>12. Object.keys() / values() / entries()</Heading3>
        <CodeBlock title="object-methods.js">{`const user = { name: 'An', age: 25, role: 'dev' }

// Lấy danh sách keys
Object.keys(user)      // ['name', 'age', 'role']

// Lấy danh sách values
Object.values(user)    // ['An', 25, 'dev']

// Lấy cặp [key, value]
Object.entries(user)
// → [['name', 'An'], ['age', 25], ['role', 'dev']]

// Ứng dụng: duyệt object
Object.entries(user).forEach(([key, value]) => {
    console.log(\`\${key}: \${value}\`)
})

// Biến entries thành object
const entries = [['a', 1], ['b', 2]]
Object.fromEntries(entries)  // → { a: 1, b: 2 }

// Copy object (shallow)
const clone = { ...user }
const clone2 = Object.assign({}, user)

// Merge objects
Object.assign(target, source1, source2)

// Kiểm tra thuộc tính
user.hasOwnProperty('name')  // true
'name' in user                // true (kể cả prototype)

// Freeze (không thể thay đổi)
const frozen = Object.freeze({ x: 1 })
frozen.x = 2  // Không có effect (silent fail)

// Object.keys() + map = transform object
const prices = { apple: 1, banana: 2, cherry: 3 }
const doubled = Object.fromEntries(
    Object.entries(prices).map(([k, v]) => [k, v * 2])
)
// → { apple: 2, banana: 4, cherry: 6 }`}</CodeBlock>

        {/* ═══════════ MODERN JS ═══════════ */}
        <Heading2>Modern JavaScript — Cú pháp hiện đại</Heading2>

        <Heading3>13. Optional Chaining & Nullish Coalescing</Heading3>
        <CodeBlock title="modern-js.js">{`// ── Optional Chaining (?.) ──
// Truy cập nested property an toàn (không throw error)
const user = { address: { city: 'HCM' } }

user.address?.city        // 'HCM'
user.contact?.phone       // undefined (không throw error)
user.getInfo?.()          // undefined (method không tồn tại)
user.hobbies?.[0]         // undefined (array không tồn tại)

// Không có ?. → sẽ throw error:
// user.contact.phone → TypeError: Cannot read property of undefined

// ── Nullish Coalescing (??) ──
// Giá trị mặc định khi null hoặc undefined
const value = null ?? 'default'     // 'default'
const value2 = undefined ?? 42      // 42
const value3 = 0 ?? 42              // 0 ← KHÁC || 
const value4 = '' ?? 'default'      // '' ← KHÁC ||

// So sánh với || (logical OR)
0 || 42              // 42 (vì 0 là falsy)
0 ?? 42              // 0  (vì 0 KHÔNG phải null/undefined)
'' || 'default'      // 'default' (vì '' là falsy)
'' ?? 'default'      // '' (vì '' KHÔNG phải null/undefined)

// ⚠️ Dùng ?? khi muốn giữ 0, '', false
// ⚠️ Dùng || khi muốn thay thế TẤT CẢ falsy values`}</CodeBlock>

        <Heading3>14. Promise Methods — Xử lý bất đồng bộ</Heading3>
        <CodeBlock title="promise-methods.js">{`// Promise.all — Chờ TẤT CẢ hoàn thành (hoặc 1 fail)
const [users, posts] = await Promise.all([
    fetch('/api/users').then(r => r.json()),
    fetch('/api/posts').then(r => r.json()),
])
// Nhanh hơn sequential: chạy song song!
// ⚠️ 1 promise reject → toàn bộ reject

// Promise.allSettled — Chờ tất cả, KHÔNG fail
const results = await Promise.allSettled([
    fetch('/api/users'),
    fetch('/api/bad-endpoint'),  // Có thể fail
])
// results = [
//   { status: 'fulfilled', value: Response },
//   { status: 'rejected', reason: Error },
// ]

// Promise.race — Lấy kết quả ĐẦU TIÊN (thắng/thua)
const fastest = await Promise.race([
    fetch('/api/server1'),
    fetch('/api/server2'),
])
// Trả về response từ server nhanh hơn

// Promise.any — Lấy kết quả THÀNH CÔNG đầu tiên
const firstSuccess = await Promise.any([
    fetch('/api/server1'),  // có thể fail
    fetch('/api/server2'),
])
// Bỏ qua các promise reject, lấy fulfilled đầu tiên`}</CodeBlock>

        <Heading2>Tổng hợp nhanh</Heading2>

        <div className="my-4 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
                <thead>
                    <tr className="border-b border-[var(--border-primary)]">
                        <th className="text-left p-3 text-[var(--text-secondary)] font-medium">Mục đích</th>
                        <th className="text-left p-3 text-[var(--text-secondary)] font-medium">Dùng</th>
                        <th className="text-left p-3 text-[var(--text-secondary)] font-medium">Trả về</th>
                    </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                    <tr className="border-b border-gray-100"><td className="p-3">Biến đổi mỗi phần tử</td><td className="p-3 font-mono text-xs">map()</td><td className="p-3">Mảng mới (cùng length)</td></tr>
                    <tr className="border-b border-gray-100"><td className="p-3">Lọc phần tử</td><td className="p-3 font-mono text-xs">filter()</td><td className="p-3">Mảng mới (≤ length)</td></tr>
                    <tr className="border-b border-gray-100"><td className="p-3">Gom thành 1 giá trị</td><td className="p-3 font-mono text-xs">reduce()</td><td className="p-3">Bất kỳ kiểu nào</td></tr>
                    <tr className="border-b border-gray-100"><td className="p-3">Tìm 1 phần tử</td><td className="p-3 font-mono text-xs">find()</td><td className="p-3">Element / undefined</td></tr>
                    <tr className="border-b border-gray-100"><td className="p-3">Tìm vị trí</td><td className="p-3 font-mono text-xs">findIndex()</td><td className="p-3">Number / -1</td></tr>
                    <tr className="border-b border-gray-100"><td className="p-3">Có ít nhất 1 thỏa?</td><td className="p-3 font-mono text-xs">some()</td><td className="p-3">Boolean</td></tr>
                    <tr className="border-b border-gray-100"><td className="p-3">Tất cả đều thỏa?</td><td className="p-3 font-mono text-xs">every()</td><td className="p-3">Boolean</td></tr>
                    <tr className="border-b border-gray-100"><td className="p-3">Duyệt (side-effect)</td><td className="p-3 font-mono text-xs">forEach()</td><td className="p-3">undefined</td></tr>
                    <tr className="border-b border-gray-100"><td className="p-3">Sắp xếp</td><td className="p-3 font-mono text-xs">sort()</td><td className="p-3">Mảng gốc (mutated!)</td></tr>
                    <tr><td className="p-3">Tồn tại?</td><td className="p-3 font-mono text-xs">includes()</td><td className="p-3">Boolean</td></tr>
                </tbody>
            </table>
        </div>

        <Callout type="tip">
            Mẹo: Chuỗi <InlineCode>filter → map → reduce</InlineCode> (lọc → biến đổi → gom) là pattern phổ biến nhất.
            Học thuộc bộ 3 này trước, còn lại sẽ tự nhiên quen theo.
        </Callout>
    </>
)

const enContent = (
    <>
        <Paragraph>
            JavaScript provides many <Highlight>built-in methods</Highlight> for Array, String and Object.
            Mastering these functions helps you write cleaner, more readable and efficient code.
            Here are the <Highlight>most commonly used functions</Highlight> in interviews and real-world projects.
        </Paragraph>

        <Callout type="info">
            Each function includes real examples, syntax, and important notes. Mastering these
            is the first step to writing professional JavaScript.
        </Callout>

        <Heading2>Array Methods</Heading2>

        <Heading3>1. Array.map() — Transform each element</Heading3>
        <Paragraph>
            Creates a <Highlight>new array</Highlight> by applying a function to <Highlight>each element</Highlight>.
            Doesn&apos;t modify the original. Returns array of <Highlight>same length</Highlight>.
        </Paragraph>
        <CodeBlock title="map.js">{`// Syntax: array.map((element, index, array) => newValue)

const nums = [1, 2, 3, 4, 5]
const doubled = nums.map(n => n * 2)     // [2, 4, 6, 8, 10]

const users = [{ name: 'An', age: 25 }, { name: 'Binh', age: 30 }]
const names = users.map(u => u.name)     // ['An', 'Binh']

// With index
const indexed = ['a', 'b', 'c'].map((item, i) => \`\${i+1}. \${item}\`)
// → ['1. a', '2. b', '3. c']`}</CodeBlock>

        <Heading3>2. Array.filter() — Filter elements</Heading3>
        <Paragraph>
            Creates <Highlight>new array</Highlight> with elements that <Highlight>pass the test</Highlight>.
        </Paragraph>
        <CodeBlock title="filter.js">{`const nums = [1, 2, 3, 4, 5, 6, 7, 8]
const evens = nums.filter(n => n % 2 === 0)  // [2, 4, 6, 8]

// Remove falsy values
const mixed = [0, 1, '', 'hello', null, false, true]
const truthy = mixed.filter(Boolean)  // [1, 'hello', true]

// Remove duplicates
const arr = [1, 2, 2, 3, 3]
const unique = arr.filter((v, i, a) => a.indexOf(v) === i)  // [1, 2, 3]`}</CodeBlock>

        <Heading3>3. Array.reduce() — Aggregate to single value</Heading3>
        <Paragraph>
            The <Highlight>most powerful</Highlight> array method. Iterates array, accumulating result.
            Can return any type: number, string, object, array.
        </Paragraph>
        <CodeBlock title="reduce.js">{`// Syntax: array.reduce((acc, cur, index) => newAcc, initialValue)

const nums = [1, 2, 3, 4, 5]
const sum = nums.reduce((acc, cur) => acc + cur, 0)  // 15

// Frequency counter
const fruits = ['🍎', '🍌', '🍎', '🍊', '🍌', '🍎']
const count = fruits.reduce((acc, f) => {
    acc[f] = (acc[f] || 0) + 1
    return acc
}, {})  // { '🍎': 3, '🍌': 2, '🍊': 1 }

// Group by
const people = [
    { name: 'An', dept: 'Dev' },
    { name: 'Binh', dept: 'QA' },
    { name: 'Chi', dept: 'Dev' },
]
const byDept = people.reduce((acc, p) => {
    (acc[p.dept] = acc[p.dept] || []).push(p.name)
    return acc
}, {})  // { Dev: ['An', 'Chi'], QA: ['Binh'] }

// ⚠️ Always provide initialValue to avoid errors with empty arrays`}</CodeBlock>

        <Heading3>4. Array.find() / findIndex()</Heading3>
        <Paragraph>
            <InlineCode>find()</InlineCode> → first matching <Highlight>element</Highlight> (or undefined).
            <InlineCode>findIndex()</InlineCode> → first matching <Highlight>index</Highlight> (or -1).
        </Paragraph>
        <CodeBlock title="find.js">{`const users = [
    { id: 1, name: 'An', role: 'admin' },
    { id: 2, name: 'Binh', role: 'user' },
]

const admin = users.find(u => u.role === 'admin')
// → { id: 1, name: 'An', role: 'admin' }

const idx = users.findIndex(u => u.id === 2)  // → 1

// ⚠️ Only returns FIRST match. For all matches → use filter()`}</CodeBlock>

        <Heading3>5. Array.some() / every()</Heading3>
        <Paragraph>
            <InlineCode>some()</InlineCode> → true if <Highlight>at least one</Highlight> passes.
            <InlineCode>every()</InlineCode> → true if <Highlight>all</Highlight> pass.
        </Paragraph>
        <CodeBlock title="some-every.js">{`const nums = [1, 2, 3, 4, 5]
nums.some(n => n % 2 === 0)   // true (has even)
nums.every(n => n > 0)        // true (all positive)
nums.every(n => n % 2 === 0)  // false

// ⚠️ Both short-circuit for performance`}</CodeBlock>

        <Heading3>6. Array.sort() — Sort in place</Heading3>
        <Paragraph>
            <Highlight>Sorts in place</Highlight> (mutates original!). Default sorts as <Highlight>strings</Highlight>
            → must provide compare function for numbers.
        </Paragraph>
        <CodeBlock title="sort.js">{`// ⚠️ DEFAULT sorts as strings!
[10, 9, 2, 1].sort()              // [1, 10, 2, 9] ← WRONG!

// ✅ Numeric sort
[10, 9, 2, 1].sort((a, b) => a - b)  // [1, 2, 9, 10] ascending
[10, 9, 2, 1].sort((a, b) => b - a)  // [10, 9, 2, 1] descending

// Sort objects
users.sort((a, b) => a.age - b.age)
users.sort((a, b) => a.name.localeCompare(b.name))

// ⚠️ Mutates original! Copy first: [...arr].sort()`}</CodeBlock>

        <Heading3>7. Spread & Destructuring</Heading3>
        <CodeBlock title="spread.js">{`// Spread (...)
const merged = [...arr1, ...arr2]
const config = { ...defaults, ...custom }

// Destructuring
const [first, ...rest] = [1, 2, 3, 4]  // first=1, rest=[2,3,4]
const { name, age, role = 'user' } = user

// Rename: const { name: userName } = user
// Nested: const { address: { city } } = user`}</CodeBlock>

        <Heading2>String Methods</Heading2>

        <CodeBlock title="string-methods.js">{`const str = '  Hello World  '

str.trim()                    // 'Hello World'
'Hello'.includes('ell')       // true
'Hello'.startsWith('He')      // true
'Hello'.slice(1, 3)           // 'el'
'Hello'.slice(-2)             // 'lo'
'ab'.replace('b', 'x')        // 'ax'
'Hello'.toUpperCase()         // 'HELLO'
'a,b,c'.split(',')            // ['a', 'b', 'c']
['a', 'b'].join('-')          // 'a-b'
'5'.padStart(3, '0')          // '005'
'ha'.repeat(3)                // 'hahaha'`}</CodeBlock>

        <Heading2>Object Methods</Heading2>

        <CodeBlock title="object-methods.js">{`const user = { name: 'An', age: 25, role: 'dev' }

Object.keys(user)          // ['name', 'age', 'role']
Object.values(user)        // ['An', 25, 'dev']
Object.entries(user)       // [['name','An'], ['age',25], ...]

// Transform object
const prices = { apple: 1, banana: 2 }
const doubled = Object.fromEntries(
    Object.entries(prices).map(([k, v]) => [k, v * 2])
)  // { apple: 2, banana: 4 }

Object.freeze(obj)         // Make immutable
obj.hasOwnProperty('key')  // Check own property`}</CodeBlock>

        <Heading2>Modern JavaScript</Heading2>

        <CodeBlock title="modern-js.js">{`// Optional Chaining (?.)
user.address?.city          // safe access (no throw)
user.getInfo?.()            // safe method call

// Nullish Coalescing (??)
null ?? 'default'           // 'default'
0 ?? 42                     // 0 (keeps 0, unlike ||)
'' ?? 'default'             // '' (keeps '', unlike ||)

// ⚠️ ?? only replaces null/undefined
// ⚠️ || replaces ALL falsy values (0, '', false, null, undefined)`}</CodeBlock>

        <Heading2>Quick Reference</Heading2>

        <div className="my-4 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
                <thead>
                    <tr className="border-b border-[var(--border-primary)]">
                        <th className="text-left p-3 text-[var(--text-secondary)] font-medium">Purpose</th>
                        <th className="text-left p-3 text-[var(--text-secondary)] font-medium">Method</th>
                        <th className="text-left p-3 text-[var(--text-secondary)] font-medium">Returns</th>
                    </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                    <tr className="border-b border-gray-100"><td className="p-3">Transform each</td><td className="p-3 font-mono text-xs">map()</td><td className="p-3">New array (same length)</td></tr>
                    <tr className="border-b border-gray-100"><td className="p-3">Filter</td><td className="p-3 font-mono text-xs">filter()</td><td className="p-3">New array (≤ length)</td></tr>
                    <tr className="border-b border-gray-100"><td className="p-3">Aggregate</td><td className="p-3 font-mono text-xs">reduce()</td><td className="p-3">Any type</td></tr>
                    <tr className="border-b border-gray-100"><td className="p-3">Find one</td><td className="p-3 font-mono text-xs">find()</td><td className="p-3">Element / undefined</td></tr>
                    <tr className="border-b border-gray-100"><td className="p-3">Has at least one?</td><td className="p-3 font-mono text-xs">some()</td><td className="p-3">Boolean</td></tr>
                    <tr className="border-b border-gray-100"><td className="p-3">All pass?</td><td className="p-3 font-mono text-xs">every()</td><td className="p-3">Boolean</td></tr>
                    <tr className="border-b border-gray-100"><td className="p-3">Side effects</td><td className="p-3 font-mono text-xs">forEach()</td><td className="p-3">undefined</td></tr>
                    <tr><td className="p-3">Sort</td><td className="p-3 font-mono text-xs">sort()</td><td className="p-3">Original (mutated!)</td></tr>
                </tbody>
            </table>
        </div>

        <Callout type="tip">
            Pro tip: The <InlineCode>filter → map → reduce</InlineCode> chain (filter → transform → aggregate)
            is the most common pattern. Master these three first.
        </Callout>
    </>
)

const jsCommonFunctions: BlogPost = {
    slug: 'js-common-functions',
    title: {
        vi: 'JavaScript Functions — Các hàm thường gặp nhất',
        en: 'JavaScript Functions — Most Common Built-in Methods',
    },
    description: {
        vi: 'Tổng hợp các hàm JS thường dùng: map, filter, reduce, find, sort, includes, spread, destructuring, Object methods, Optional Chaining.',
        en: 'Comprehensive guide to common JS functions: map, filter, reduce, find, sort, includes, spread, destructuring, Object methods, Optional Chaining.',
    },
    date: '2024-12-18',
    tags: ['JavaScript', 'Array Methods', 'Cheatsheet'],
    emoji: '⚡',
    color: '#f59e0b',
    content: { vi: viContent, en: enContent },
}

export default jsCommonFunctions
