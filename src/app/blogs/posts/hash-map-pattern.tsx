import { BlogPost } from '../types'
import { CodeBlock, Heading2, Heading3, Paragraph, Highlight, InlineCode, Callout } from '../components/BlogComponents'

const viContent = (
    <>
        <Paragraph>
            <Highlight>Hash Map</Highlight> (hay Hash Table) là cấu trúc dữ liệu lưu trữ cặp <InlineCode>key → value</InlineCode>,
            cho phép tìm kiếm, thêm và xóa phần tử trong thời gian trung bình <Highlight>O(1)</Highlight>.
            Đây là công cụ mạnh nhất khi bạn cần tra cứu nhanh.
        </Paragraph>

        <Callout type="info">
            Hash Map giải quyết hầu hết các bài toán dạng: &quot;tìm phần tử thỏa điều kiện&quot;,
            &quot;đếm tần suất&quot;, &quot;kiểm tra trùng lặp&quot;. Nếu brute-force là O(n²), Hash Map thường giúp giảm xuống O(n).
        </Callout>

        <Heading2>Cách dùng Map & Set trong JavaScript</Heading2>

        <CodeBlock title="map-api.js">{`// ═══ MAP — lưu cặp key → value ═══
const map = new Map()
map.set('name', 'Khương')     // Thêm/cập nhật
map.set('age', 25)
map.get('name')               // 'Khương' — O(1)
map.has('age')                // true — O(1)
map.delete('age')             // Xóa key
map.size                      // 1 — O(1)

// Khởi tạo từ mảng cặp [key, value]
const map2 = new Map([['a', 1], ['b', 2], ['c', 3]])

// Duyệt Map
for (const [key, value] of map2) {
    console.log(key, value)   // 'a' 1, 'b' 2, 'c' 3
}
map2.forEach((value, key) => console.log(key, value))

// Chuyển Map ↔ Object
const obj = Object.fromEntries(map2)  // { a: 1, b: 2, c: 3 }
const map3 = new Map(Object.entries(obj))`}</CodeBlock>

        <CodeBlock title="set-api.js">{`// ═══ SET — tập hợp giá trị duy nhất (không trùng lặp) ═══
const set = new Set()
set.add(1)                    // Thêm phần tử
set.add(2)
set.add(1)                    // Không thêm — đã có rồi!
set.has(1)                    // true — O(1)
set.delete(2)                 // Xóa phần tử
set.size                      // 1

// Loại bỏ trùng lặp từ mảng — 1 dòng!
const unique = [...new Set([1, 2, 2, 3, 3, 3])]  // [1, 2, 3]

// Kiểm tra giao/hợp/hiệu tập hợp
const a = new Set([1, 2, 3])
const b = new Set([2, 3, 4])
const intersection = [...a].filter(x => b.has(x))  // [2, 3]
const union = new Set([...a, ...b])                 // {1, 2, 3, 4}
const diff = [...a].filter(x => !b.has(x))          // [1]`}</CodeBlock>

        <Heading3>Map ↔ Array: cheat sheet chuyển đổi</Heading3>
        <Callout type="tip">
            <strong>Hình dung:</strong> <Highlight>Map = tủ hồ sơ</Highlight> (mỗi ngăn có nhãn key + tài liệu value).
            <Highlight>Array = bàn làm việc</Highlight> (xếp hàng, có thứ tự).
            Chuyển đổi = lấy đồ từ tủ ra bàn, hoặc cất từ bàn vào tủ.
        </Callout>
        <CodeBlock title="map-to-array.js">{`// ═══ MAP → ARRAY: "Lấy đồ từ tủ ra bàn" ═══
const map = new Map([["a", 1], ["b", 2], ["c", 3]])

// 🏷️ Chỉ lấy nhãn (keys)
[...map.keys()]           // ["a", "b", "c"]

// 📄 Chỉ lấy tài liệu (values)
[...map.values()]         // [1, 2, 3]
// hoặc: Array.from(map.values())  ← Group Anagrams dùng cách này!

// 📦 Lấy cả cặp [nhãn, tài liệu]
[...map.entries()]        // [["a",1], ["b",2], ["c",3]]

// ═══ ARRAY → MAP: "Cất đồ từ bàn vào tủ" ═══
const pairs = [["x", 10], ["y", 20]]
const newMap = new Map(pairs)   // Map { "x"→10, "y"→20 }

// Từ array thường → Map (tự tạo key bằng index)
const arr = ["apple", "banana"]
const indexMap = new Map(arr.map((val, i) => [i, val]))
// Map { 0→"apple", 1→"banana" }`}</CodeBlock>

        <div className="my-4 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
                <thead>
                    <tr className="border-b border-[var(--border-primary)]">
                        <th className="text-left p-3 text-[var(--text-secondary)] font-medium">Chiều chuyển</th>
                        <th className="text-left p-3 text-[var(--text-secondary)] font-medium">Code</th>
                        <th className="text-left p-3 text-[var(--text-secondary)] font-medium">Kết quả</th>
                    </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                    <tr className="border-b border-gray-100"><td className="p-3">Map → keys</td><td className="p-3"><InlineCode>[...map.keys()]</InlineCode></td><td className="p-3">[&quot;a&quot;, &quot;b&quot;, &quot;c&quot;]</td></tr>
                    <tr className="border-b border-gray-100"><td className="p-3">Map → values</td><td className="p-3"><InlineCode>Array.from(map.values())</InlineCode></td><td className="p-3">[1, 2, 3]</td></tr>
                    <tr className="border-b border-gray-100"><td className="p-3">Map → pairs</td><td className="p-3"><InlineCode>[...map.entries()]</InlineCode></td><td className="p-3">[[&quot;a&quot;,1], [&quot;b&quot;,2]]</td></tr>
                    <tr><td className="p-3">Array → Map</td><td className="p-3"><InlineCode>new Map(pairs)</InlineCode></td><td className="p-3">Map &#123; &quot;x&quot;→10 &#125;</td></tr>
                </tbody>
            </table>
        </div>

        <Heading3>Object vs Map — khi nào dùng cái nào?</Heading3>

        <div className="my-4 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
                <thead>
                    <tr className="border-b border-[var(--border-primary)]">
                        <th className="text-left p-3 text-[var(--text-secondary)] font-medium"></th>
                        <th className="text-left p-3 text-blue-400 font-medium">Object</th>
                        <th className="text-left p-3 text-purple-400 font-medium">Map</th>
                    </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                    <tr className="border-b border-gray-100"><td className="p-3 font-medium">Key type</td><td className="p-3">Chỉ string/symbol</td><td className="p-3">Bất kỳ (object, array, number...)</td></tr>
                    <tr className="border-b border-gray-100"><td className="p-3 font-medium">Lấy size</td><td className="p-3"><InlineCode>Object.keys(o).length</InlineCode></td><td className="p-3"><InlineCode>map.size</InlineCode> — O(1)</td></tr>
                    <tr className="border-b border-gray-100"><td className="p-3 font-medium">Thứ tự</td><td className="p-3">Không đảm bảo</td><td className="p-3">Theo thứ tự chèn (insertion order)</td></tr>
                    <tr><td className="p-3 font-medium">Performance</td><td className="p-3">Nhanh với ít key</td><td className="p-3">Tốt hơn khi thêm/xóa nhiều</td></tr>
                </tbody>
            </table>
        </div>

        <Callout type="tip">
            <strong>Quy tắc nhanh:</strong> Dùng <InlineCode>Object</InlineCode> khi key là string đơn giản (config, JSON).
            Dùng <InlineCode>Map</InlineCode> khi key không phải string, cần <InlineCode>size</InlineCode>, hoặc thêm/xóa nhiều.
            Dùng <InlineCode>Set</InlineCode> khi chỉ cần kiểm tra "có tồn tại không" mà không cần value.
        </Callout>

        <Heading2>Khi nào dùng Hash Map?</Heading2>

        <div className="my-4 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
                <thead>
                    <tr className="border-b border-[var(--border-primary)]">
                        <th className="text-left p-3 text-[var(--text-secondary)] font-medium">Dấu hiệu bài toán</th>
                        <th className="text-left p-3 text-[var(--text-secondary)] font-medium">Ví dụ LeetCode</th>
                    </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                    <tr className="border-b border-gray-100"><td className="p-3">Tìm 2 số có tổng = target</td><td className="p-3">Two Sum (#1)</td></tr>
                    <tr className="border-b border-gray-100"><td className="p-3">Đếm số lần xuất hiện</td><td className="p-3">Majority Element (#169)</td></tr>
                    <tr className="border-b border-gray-100"><td className="p-3">Kiểm tra phần tử trùng lặp</td><td className="p-3">Contains Duplicate (#217)</td></tr>
                    <tr className="border-b border-gray-100"><td className="p-3">Nhóm các phần tử giống nhau</td><td className="p-3">Group Anagrams (#49)</td></tr>
                    <tr><td className="p-3">Tìm phần tử đầu tiên không lặp</td><td className="p-3">First Unique Character (#387)</td></tr>
                </tbody>
            </table>
        </div>

        <Heading2>Cách hoạt động</Heading2>

        <Paragraph>
            Hash Map dùng một <Highlight>hàm băm (hash function)</Highlight> để chuyển key thành chỉ số (index) trong mảng nội bộ.
            Khi hai key khác nhau cho ra cùng chỉ số (collision), chúng được xử lý bằng chaining (linked list) hoặc open addressing.
        </Paragraph>

        <div className="my-6 p-4 rounded-xl bg-slate-800/50 border border-white/10">
            <div className="flex flex-col items-center gap-2 text-sm">
                <div className="px-4 py-2 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30 w-fit">1. Nhận key → tính hash(key)</div>
                <div className="text-slate-600">↓</div>
                <div className="px-4 py-2 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30 w-fit">2. hash(key) % size → index trong mảng</div>
                <div className="text-slate-600">↓</div>
                <div className="px-4 py-2 rounded-lg bg-green-500/20 text-green-300 border border-green-500/30 w-fit">3. Lưu/đọc value tại index → O(1) trung bình</div>
            </div>
        </div>

        <Heading3>Brute Force vs HashMap — tại sao nhanh hơn?</Heading3>
        <Paragraph>
            Brute Force dùng <Highlight>2 vòng for lồng nhau</Highlight> → thử từng cặp (i, j) → O(n²).<br />
            HashMap thay <Highlight>vòng for trong bằng 1 lần tra Map</Highlight> → O(1) mỗi lần → O(n) tổng.
        </Paragraph>
        <CodeBlock title="brute-force-vs-hashmap.js">{`// ═══ BRUTE FORCE — O(n²) ═══
function twoSumBrute(nums, target) {
    for (let i = 0; i < nums.length; i++) {         // vòng 1: chọn phần tử A
        for (let j = i + 1; j < nums.length; j++) { // vòng 2: duyệt TẤT CẢ tìm partner
            if (nums[i] + nums[j] === target) return [i, j]
        }
    }
}
// Worst case [1,2,3,4,5] target=9:
// i=0: so 4 lần ✗ | i=1: so 3 lần ✗ | i=2: so 2 lần ✗ | i=3: 4+5=9 ✓
// Tổng: 10 lần so sánh cho 5 phần tử!

// ═══ HASHMAP — O(n) ═══
function twoSumHash(nums, target) {
    const map = new Map()
    for (let i = 0; i < nums.length; i++) {
        const comp = target - nums[i]
        if (map.has(comp)) return [map.get(comp), i]  // O(1) tra cứu!
        map.set(nums[i], i)
    }
}
// Cùng input [1,2,3,4,5] target=9:
// i=0: comp=8 → nope | i=1: comp=7 → nope | i=2: comp=6 → nope
// i=3: comp=5 → nope | i=4: comp=4 → CÓ! ✓
// Tổng: 5 lần check — nhanh gấp đôi!`}</CodeBlock>

        <div className="my-4 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
                <thead>
                    <tr className="border-b border-[var(--border-primary)]">
                        <th className="text-left p-3 text-[var(--text-secondary)] font-medium">n phần tử</th>
                        <th className="text-left p-3 text-red-400 font-medium">Brute Force O(n²)</th>
                        <th className="text-left p-3 text-green-400 font-medium">HashMap O(n)</th>
                        <th className="text-left p-3 text-[var(--text-secondary)] font-medium">Nhanh hơn</th>
                    </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                    <tr className="border-b border-gray-100"><td className="p-3">10</td><td className="p-3">45</td><td className="p-3">10</td><td className="p-3">×4.5</td></tr>
                    <tr className="border-b border-gray-100"><td className="p-3">1,000</td><td className="p-3">500,000</td><td className="p-3">1,000</td><td className="p-3">×500</td></tr>
                    <tr className="border-b border-gray-100"><td className="p-3">1,000,000</td><td className="p-3">500 tỷ</td><td className="p-3">1 triệu</td><td className="p-3">×500,000</td></tr>
                </tbody>
            </table>
        </div>

        <Callout type="tip">
            <strong>Quy tắc nhớ:</strong> Nếu brute force dùng <Highlight>2 vòng for lồng nhau</Highlight> O(n²) để tìm kiếm, hãy thử
            thay vòng for trong bằng <Highlight>HashMap</Highlight> → giảm xuống O(n). Đánh đổi: tốn thêm O(n) bộ nhớ — nhưng rất đáng!
        </Callout>

        {/* ───────── BÀI 1: TWO SUM ───────── */}
        <Heading2>Bài 1: Two Sum (<a href="https://leetcode.com/problems/two-sum/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline decoration-blue-400/30 hover:decoration-blue-300">LeetCode #1</a>)</Heading2>

        <Heading3>Đề bài</Heading3>
        <Paragraph>
            Cho một mảng số nguyên <InlineCode>nums</InlineCode> và một giá trị <InlineCode>target</InlineCode>,
            tìm <Highlight>hai phần tử</Highlight> có tổng bằng target. Trả về chỉ số của chúng.
        </Paragraph>

        <Heading3>Giải pháp với Hash Map</Heading3>
        <div className="my-4 space-y-2 text-sm text-[var(--text-secondary)]">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">1.</span>
                <span>Duyệt qua từng phần tử <InlineCode>nums[i]</InlineCode> trong mảng.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">2.</span>
                <span>Tính <InlineCode>complement = target - nums[i]</InlineCode>.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">3.</span>
                <span>Kiểm tra xem <InlineCode>complement</InlineCode> đã tồn tại trong Map chưa → nếu có, ta tìm thấy cặp!</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">4.</span>
                <span>Nếu chưa có, lưu <InlineCode>nums[i] → i</InlineCode> vào Map để các phần tử sau có thể tìm thấy.</span>
            </div>
        </div>

        <CodeBlock title="two-sum.js">{`// LeetCode #1: Two Sum — O(n) time, O(n) space
function twoSum(nums, target) {
    const map = new Map()           // Lưu { giá_trị → index }

    for (let i = 0; i < nums.length; i++) {
        // Bước 1: Tính số cần tìm
        const complement = target - nums[i]

        // Bước 2: Kiểm tra complement đã gặp chưa
        if (map.has(complement)) {
            // Tìm thấy! complement ở index cũ, nums[i] ở index i
            return [map.get(complement), i]
        }

        // Bước 3: Chưa tìm thấy → lưu nums[i] vào Map
        map.set(nums[i], i)
    }
}

// Ví dụ chạy: nums = [2, 7, 11, 15], target = 9
// i=0: complement = 9-2 = 7, map = {} → chưa có 7 → map = {2:0}
// i=1: complement = 9-7 = 2, map = {2:0} → CÓ 2! → return [0, 1] ✓`}</CodeBlock>

        <Heading3>Walkthrough chi tiết</Heading3>
        <CodeBlock title="walkthrough.txt">{`nums = [3, 7, 11, 15], target = 18

i=0: nums[0]=3,  complement=15, map={} → chưa có → map={3:0}
i=1: nums[1]=7,  complement=11, map={3:0} → chưa có → map={3:0, 7:1}
i=2: nums[2]=11, complement=7,  map={3:0, 7:1} → CÓ 7 tại index 1 ✅
     → return [1, 2]

Kết quả: [1, 2] vì nums[1] + nums[2] = 7 + 11 = 18`}</CodeBlock>

        <Callout type="tip">
            <strong>Trick:</strong> Mỗi phần tử khi đi qua sẽ <Highlight>tự đăng ký vào Map</Highlight>.
            Phần tử sau chỉ cần check Map xem &quot;partner&quot; của mình đã đăng ký chưa — <Highlight>1 lần duyệt là đủ</Highlight>, không cần 2 vòng for lồng nhau.
        </Callout>

        <Heading3>Edge case: phần tử lớn hơn target</Heading3>
        <Paragraph>
            Thuật toán vẫn hoạt động bình thường vì complement có thể là <Highlight>số âm</Highlight>:
        </Paragraph>
        <CodeBlock title="edge-case.txt">{`nums = [20, -5, 3, -11], target = 9

i=0: nums[0]=20, complement = 9-20 = -11 → map={20:0}
i=1: nums[1]=-5, complement = 9-(-5) = 14 → map={20:0, -5:1}
i=2: nums[2]=3,  complement = 9-3 = 6 → map={20:0, -5:1, 3:2}
i=3: nums[3]=-11, complement = 9-(-11) = 20 → CÓ 20 tại index 0 ✅
     → return [0, 3]  (vì 20 + (-11) = 9)`}</CodeBlock>

        <Heading3>So sánh Brute Force vs HashMap</Heading3>
        <div className="my-4 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
                <thead>
                    <tr className="border-b border-[var(--border-primary)]">
                        <th className="text-left p-3 text-[var(--text-secondary)] font-medium">Approach</th>
                        <th className="text-left p-3 text-[var(--text-secondary)] font-medium">Time</th>
                        <th className="text-left p-3 text-[var(--text-secondary)] font-medium">Space</th>
                        <th className="text-left p-3 text-[var(--text-secondary)] font-medium">Cách hoạt động</th>
                    </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                    <tr className="border-b border-gray-100"><td className="p-3">Brute Force</td><td className="p-3">O(n²)</td><td className="p-3">O(1)</td><td className="p-3">2 vòng for, thử từng cặp (i,j)</td></tr>
                    <tr><td className="p-3 font-medium text-green-400">HashMap ✅</td><td className="p-3 text-green-400">O(n)</td><td className="p-3">O(n)</td><td className="p-3">1 vòng for, mỗi phần tử check Map</td></tr>
                </tbody>
            </table>
        </div>

        <Heading3>TypeScript: dấu ! là gì?</Heading3>
        <CodeBlock title="non-null-assertion.ts">{`// Nếu viết bằng TypeScript:
function twoSum(nums: number[], target: number): number[] {
    const map = new Map<number, number>()
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i]
        if (map.has(complement)) {
            return [map.get(complement)!, i]
            //                          ^ Non-null assertion operator
            // map.get() trả về number | undefined
            // Dấu ! nói với TS: "đã check .has() rồi, chắc chắn không phải undefined"
        }
        map.set(nums[i], i)
    }
    return []
}`}</CodeBlock>

        {/* ───────── BÀI 2: GROUP ANAGRAMS ───────── */}
        <Heading2>Bài 2: Group Anagrams (<a href="https://leetcode.com/problems/group-anagrams/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline decoration-blue-400/30 hover:decoration-blue-300">LeetCode #49</a>)</Heading2>

        <Heading3>Đề bài</Heading3>
        <Paragraph>
            Cho một mảng các chuỗi, nhóm các chuỗi là <Highlight>anagram</Highlight> của nhau lại.
            Ví dụ: <InlineCode>[&quot;eat&quot;,&quot;tea&quot;,&quot;tan&quot;,&quot;ate&quot;,&quot;nat&quot;,&quot;bat&quot;]</InlineCode>
            → <InlineCode>[[&quot;eat&quot;,&quot;tea&quot;,&quot;ate&quot;],[&quot;tan&quot;,&quot;nat&quot;],[&quot;bat&quot;]]</InlineCode>
        </Paragraph>

        <Heading3>Giải pháp với Hash Map</Heading3>
        <div className="my-4 space-y-2 text-sm text-[var(--text-secondary)]">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">1.</span>
                <span>Hai chuỗi là anagram khi chúng có cùng ký tự (cùng tần suất). Vậy ta cần tạo một &quot;key&quot; đại diện.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">2.</span>
                <span>Key = sắp xếp các ký tự: <InlineCode>&quot;eat&quot; → &quot;aet&quot;</InlineCode>, <InlineCode>&quot;tea&quot; → &quot;aet&quot;</InlineCode> → cùng key!</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">3.</span>
                <span>Dùng Map với key là chuỗi đã sort, value là mảng các chuỗi gốc.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">4.</span>
                <span>Cuối cùng trả về tất cả values trong Map.</span>
            </div>
        </div>

        <CodeBlock title="group-anagrams.js">{`// LeetCode #49: Group Anagrams — O(n * k*log(k))
function groupAnagrams(strs) {
    const map = new Map()           // { sorted_string → [original strings] }

    for (const str of strs) {
        // Bước 1: Tạo key bằng cách sort ký tự
        const key = str.split('').sort().join('')
        // "eat" → ['e','a','t'] → ['a','e','t'] → "aet"

        // Bước 2: Thêm chuỗi gốc vào nhóm tương ứng
        if (!map.has(key)) {
            map.set(key, [])        // Tạo nhóm mới nếu chưa có
        }
        map.get(key).push(str)      // Thêm vào nhóm
    }

    // Bước 3: Trả về tất cả các nhóm
    return Array.from(map.values())
}

// Ví dụ chạy: ["eat","tea","tan","ate","nat","bat"]
// "eat" → key="aet" → map = { "aet": ["eat"] }
// "tea" → key="aet" → map = { "aet": ["eat","tea"] }
// "tan" → key="ant" → map = { "aet": ["eat","tea"], "ant": ["tan"] }
// "ate" → key="aet" → map = { "aet": ["eat","tea","ate"], "ant": ["tan"] }
// "nat" → key="ant" → map = { "aet": ["eat","tea","ate"], "ant": ["tan","nat"] }
// "bat" → key="abt" → map = { ..., "abt": ["bat"] }
// → [["eat","tea","ate"], ["tan","nat"], ["bat"]] ✓`}</CodeBlock>

        <Callout type="tip">
            <strong>Tại sao dùng <InlineCode>for...of</InlineCode> thay vì <InlineCode>for</InlineCode> thường?</strong><br />
            Bài này <Highlight>không cần index</Highlight> — chỉ cần giá trị từng string.
            <InlineCode>for...of</InlineCode> gọn hơn, đọc dễ hơn.
            So sánh: <strong>Two Sum</strong> cần <InlineCode>i</InlineCode> để return index → dùng <InlineCode>for</InlineCode> thường.
        </Callout>

        <Heading3>Map + Array: tại sao map.get(key).push() hoạt động?</Heading3>
        <Paragraph>
            <InlineCode>.push()</InlineCode> <Highlight>không phải method của Map</Highlight> — nó là method của <strong>Array</strong>.
            Trick ở đây: Map lưu <Highlight>reference</Highlight> (tham chiếu) tới Array, nên khi push vào Array, Map tự &quot;thấy&quot; thay đổi:
        </Paragraph>
        <CodeBlock title="map-array-reference.js">{`// Bước 1: Lưu array rỗng vào Map
map.set("aet", [])
// map = { "aet": [] }

// Bước 2: map.get() trả về chính cái array đó (reference)
const arr = map.get("aet")   // arr = []

// Bước 3: push vào array (KHÔNG phải push vào Map!)
arr.push("eat")
// arr = ["eat"]
// map = { "aet": ["eat"] }  ← tự cập nhật vì cùng reference!

// Viết gọn: map.get("aet").push("eat")
// Không cần map.set() lại!`}</CodeBlock>
        <Callout type="info">
            <strong>Tại sao không cần <InlineCode>map.set()</InlineCode> lại?</strong><br />
            Vì Map chỉ lưu <Highlight>con trỏ</Highlight> tới array trong bộ nhớ.
            Khi <InlineCode>.push()</InlineCode>, array thay đổi tại chỗ → Map vẫn trỏ tới đúng array đó → tự thấy giá trị mới.
        </Callout>

        {/* ───────── BÀI 3: CONTAINS DUPLICATE ───────── */}
        <Heading2>Bài 3: Contains Duplicate (<a href="https://leetcode.com/problems/contains-duplicate/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline decoration-blue-400/30 hover:decoration-blue-300">LeetCode #217</a>)</Heading2>

        <Heading3>Đề bài</Heading3>
        <Paragraph>
            Cho một mảng số nguyên, kiểm tra xem có phần tử nào <Highlight>xuất hiện ít nhất 2 lần</Highlight> không.
        </Paragraph>

        <Heading3>Giải pháp với Hash Set</Heading3>
        <div className="my-4 space-y-2 text-sm text-[var(--text-secondary)]">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">1.</span>
                <span>Dùng <InlineCode>Set</InlineCode> để lưu các phần tử đã gặp.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">2.</span>
                <span>Duyệt qua từng phần tử: nếu đã có trong Set → trùng lặp!</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">3.</span>
                <span>Nếu chưa có → thêm vào Set và tiếp tục.</span>
            </div>
        </div>

        <CodeBlock title="contains-duplicate.js">{`// LeetCode #217: Contains Duplicate — O(n) time, O(n) space
function containsDuplicate(nums) {
    const seen = new Set()          // Lưu các số đã gặp

    for (const num of nums) {
        // Kiểm tra: số này đã gặp trước đó chưa?
        if (seen.has(num)) {
            return true             // Trùng lặp! Trả về true ngay
        }
        seen.add(num)               // Chưa gặp → thêm vào Set
    }

    return false                    // Duyệt hết mà không trùng
}

// Ví dụ 1: nums = [1, 2, 3, 1]
// num=1: seen = {} → chưa có → seen = {1}
// num=2: seen = {1} → chưa có → seen = {1,2}
// num=3: seen = {1,2} → chưa có → seen = {1,2,3}
// num=1: seen = {1,2,3} → CÓ 1! → return true ✓

// Cách ngắn hơn (nhưng không early return):
// const containsDuplicate = nums => new Set(nums).size !== nums.length`}</CodeBlock>

        {/* ───────── BÀI 4: VALID ANAGRAM ───────── */}
        <Heading2>Bài 4: Valid Anagram (<a href="https://leetcode.com/problems/valid-anagram/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline decoration-blue-400/30 hover:decoration-blue-300">LeetCode #242</a>)</Heading2>

        <Heading3>Đề bài</Heading3>
        <Paragraph>
            Cho hai chuỗi <InlineCode>s</InlineCode> và <InlineCode>t</InlineCode>,
            kiểm tra xem <InlineCode>t</InlineCode> có phải là <Highlight>anagram</Highlight> của <InlineCode>s</InlineCode> không
            (cùng ký tự, cùng tần suất).
        </Paragraph>

        <Heading3>Giải pháp với Hash Map</Heading3>
        <CodeBlock title="valid-anagram.js">{`// LeetCode #242: Valid Anagram — O(n) time, O(1) space (26 chữ cái)
function isAnagram(s, t) {
    if (s.length !== t.length) return false  // Khác độ dài → không thể là anagram

    const count = new Map()                  // Đếm tần suất ký tự

    // Vòng 1: đếm từng ký tự trong s (+1)
    for (const c of s) {
        count.set(c, (count.get(c) || 0) + 1)
    }

    // Vòng 2: trừ từng ký tự trong t (-1)
    for (const c of t) {
        if (!count.has(c) || count.get(c) === 0) return false  // Ký tự không có hoặc hết
        count.set(c, count.get(c) - 1)                         // Giảm count
    }

    return true                              // Mọi ký tự khớp
}

// Ví dụ: s = "anagram", t = "nagaram"
// Vòng 1: count = Map { a→3, n→1, g→1, r→1, m→1 }
// Vòng 2: n→0, a→2, g→0, a→1, r→0, a→0, m→0 → true ✓`}</CodeBlock>

        {/* ───────── BÀI 5: RANSOM NOTE ───────── */}
        <Heading2>Bài 5: Ransom Note (<a href="https://leetcode.com/problems/ransom-note/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline decoration-blue-400/30 hover:decoration-blue-300">LeetCode #383</a>)</Heading2>

        <Heading3>Đề bài</Heading3>
        <Paragraph>
            Cho hai chuỗi <InlineCode>ransomNote</InlineCode> và <InlineCode>magazine</InlineCode>,
            kiểm tra xem có thể <Highlight>tạo ransomNote từ các ký tự trong magazine</Highlight> không
            (mỗi ký tự trong magazine chỉ dùng một lần).
        </Paragraph>

        <Callout type="tip">
            <strong>🔪 Hình dung:</strong> Giống như cắt chữ từ tạp chí để ghép thành thư đe dọa trong phim! Bạn có tạp chí (magazine) chứa nhiều chữ cái.
            Bạn cần ghép thành một câu (ransomNote). Mỗi chữ cái trong tạp chí <Highlight>chỉ cắt được 1 lần</Highlight>.
            Không quan tâm thứ tự hay vị trí — chỉ cần <Highlight>đủ số lượng</Highlight>.
        </Callout>

        <Heading3>Tần suất (frequency) — không cần liên tục!</Heading3>
        <Paragraph>
            Bài này chỉ đếm <Highlight>số lần xuất hiện</Highlight> của mỗi ký tự, không cần các ký tự nằm liên tục hay theo thứ tự.
            Magazine <InlineCode>{`"xaybz"`}</InlineCode> vẫn chứa đủ ký tự cho ransomNote <InlineCode>{`"aby"`}</InlineCode> — dù chúng nằm rải rác.
        </Paragraph>
        <CodeBlock title="frequency-not-position.txt">{`// Câu hỏi: "aby" có tạo được từ "xaybz" không?
// → Chỉ cần đếm: a cần 1 (có 1 ✅), b cần 1 (có 1 ✅), y cần 1 (có 1 ✅) → true!
// Vị trí a ở index 1, b ở index 3, y ở index 2 — KHÔNG QUAN TRỌNG

// So sánh với Substring (bài khác):
// Substring CẦN liên tục: "aby" KHÔNG phải substring của "xaybz"
// Ransom Note KHÔNG CẦN liên tục: chỉ cần frequency đủ`}</CodeBlock>

        <Heading3>Giải pháp với Hash Map</Heading3>
        <div className="my-4 space-y-2 text-sm text-[var(--text-secondary)]">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">1.</span>
                <span>Đếm tất cả ký tự trong magazine → lưu vào Map (kho chữ cái)</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">2.</span>
                <span>Duyệt ransomNote: mỗi ký tự cần dùng → trừ 1 từ kho. Nếu kho hết → false</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">3.</span>
                <span>Duyệt hết mà không thiếu → true</span>
            </div>
        </div>

        <CodeBlock title="ransom-note.js">{`// LeetCode #383: Ransom Note — O(n + m) time, O(1) space
function canConstruct(ransomNote, magazine) {
    const charCount = new Map()              // Đếm ký tự có sẵn trong magazine

    for (const c of magazine) {
        charCount.set(c, (charCount.get(c) || 0) + 1)  // Xây kho ký tự
    }

    for (const c of ransomNote) {
        if (!charCount.has(c) || charCount.get(c) === 0) return false  // Không đủ ký tự → false
        charCount.set(c, charCount.get(c) - 1)                        // Dùng 1 ký tự
    }

    return true                              // Đủ tất cả ký tự
}`}</CodeBlock>

        <Heading3>Walkthrough chi tiết</Heading3>
        <CodeBlock title="walkthrough.txt">{`✅ Ví dụ 1: ransomNote = "aa", magazine = "aab" → true
──────────────────────────────────────────────────────
Bước 1 — Đếm magazine "aab":
  'a' → Map { a→1 }
  'a' → Map { a→2 }
  'b' → Map { a→2, b→1 }

Bước 2 — Duyệt ransomNote "aa":
  'a' → has? ✅, count=2>0 ✅ → trừ 1 → Map { a→1, b→1 }
  'a' → has? ✅, count=1>0 ✅ → trừ 1 → Map { a→0, b→1 }
  → Hết ransomNote → return true ✓

❌ Ví dụ 2: ransomNote = "aab", magazine = "ab" → false
──────────────────────────────────────────────────────
Bước 1 — Đếm magazine "ab":
  'a' → Map { a→1 }
  'b' → Map { a→1, b→1 }

Bước 2 — Duyệt ransomNote "aab":
  'a' → has? ✅, count=1>0 ✅ → trừ 1 → Map { a→0, b→1 }
  'a' → has? ✅, count=0 ❌ → return false ✗
  (cần 2 chữ 'a' nhưng magazine chỉ có 1!)

✅ Ví dụ 3: ransomNote = "abc", magazine = "zcbaxyz" → true
──────────────────────────────────────────────────────
Magazine có a=1, b=1, c=1, x=1, y=1, z=2
RansomNote cần a=1, b=1, c=1 → tất cả đều đủ!
Các ký tự x, y, z dư → không sao (magazine được phép dư)`}</CodeBlock>

        <Callout type="tip">
            <strong>So sánh Ransom Note vs Valid Anagram:</strong><br />
            Cả hai đều dùng Map đếm frequency, nhưng khác ở điểm:<br />
            • <strong>Anagram</strong>: 2 chuỗi phải <Highlight>cùng length</Highlight> và cùng frequency → hoán vị của nhau<br />
            • <strong>Ransom Note</strong>: magazine được phép <Highlight>dư ký tự</Highlight> → chỉ cần &quot;đủ&quot;, không cần &quot;bằng&quot;
        </Callout>

        {/* ───────── BÀI 6: INTERSECTION OF TWO ARRAYS ───────── */}
        <Heading2>Bài 6: Intersection of Two Arrays (<a href="https://leetcode.com/problems/intersection-of-two-arrays/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline decoration-blue-400/30 hover:decoration-blue-300">LeetCode #349</a>)</Heading2>

        <Heading3>Đề bài</Heading3>
        <Paragraph>
            Cho hai mảng số nguyên, trả về <Highlight>mảng các phần tử chung</Highlight> (mỗi phần tử chỉ xuất hiện 1 lần trong kết quả).
        </Paragraph>

        <Heading3>Giải pháp với Hash Set</Heading3>
        <CodeBlock title="intersection.js">{`// LeetCode #349: Intersection of Two Arrays — O(n + m) time
function intersection(nums1, nums2) {
    const set1 = new Set(nums1)              // Chuyển nums1 thành Set
    const result = new Set()                 // Lưu kết quả (tự loại trùng)

    for (const num of nums2) {
        if (set1.has(num)) {                 // Nếu num có trong nums1
            result.add(num)                  // Thêm vào kết quả
        }
    }

    return [...result]                       // Chuyển Set → Array
}

// Ví dụ: nums1 = [1,2,2,1], nums2 = [2,2]
// set1 = {1, 2}
// num=2: set1 has 2 → result = {2}
// num=2: result already has 2 (Set tự loại trùng)
// → [2] ✓`}</CodeBlock>

        {/* ───────── BÀI 7: TOP K FREQUENT ELEMENTS ───────── */}
        <Heading2>Bài 7: Top K Frequent Elements (<a href="https://leetcode.com/problems/top-k-frequent-elements/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline decoration-blue-400/30 hover:decoration-blue-300">LeetCode #347</a>)</Heading2>

        <Heading3>Đề bài</Heading3>
        <Paragraph>
            Cho mảng số nguyên <InlineCode>nums</InlineCode> và số <InlineCode>k</InlineCode>,
            trả về <Highlight>k phần tử xuất hiện nhiều nhất</Highlight>.
        </Paragraph>

        <Heading3>Giải pháp: HashMap + Bucket Sort</Heading3>
        <CodeBlock title="top-k-frequent.js">{`// LeetCode #347: Top K Frequent Elements — O(n) time
function topKFrequent(nums, k) {
    // Bước 1: Đếm tần suất bằng HashMap
    const freq = new Map()
    for (const num of nums) {
        freq.set(num, (freq.get(num) || 0) + 1)
    }

    // Bước 2: Bucket sort — bucket[i] = các số xuất hiện i lần
    const buckets = Array.from({ length: nums.length + 1 }, () => [])
    for (const [num, count] of freq) {
        buckets[count].push(num)
    }

    // Bước 3: Duyệt từ bucket lớn nhất → lấy k phần tử
    const result = []
    for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
        result.push(...buckets[i])
    }

    return result.slice(0, k)
}

// Ví dụ: nums = [1,1,1,2,2,3], k = 2
// freq = { 1:3, 2:2, 3:1 }
// buckets = [[], [3], [2], [1], ...]
// Duyệt ngược: bucket[3]=[1], bucket[2]=[2] → [1, 2] ✓`}</CodeBlock>

        {/* ───────── BÀI 8: LONGEST CONSECUTIVE SEQUENCE ───────── */}
        <Heading2>Bài 8: Longest Consecutive Sequence (<a href="https://leetcode.com/problems/longest-consecutive-sequence/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline decoration-blue-400/30 hover:decoration-blue-300">LeetCode #128</a>)</Heading2>

        <Heading3>Đề bài</Heading3>
        <Paragraph>
            Cho mảng số nguyên <Highlight>chưa sắp xếp</Highlight>, tìm độ dài của
            <Highlight>dãy số liên tiếp dài nhất</Highlight>. Yêu cầu O(n) time.
        </Paragraph>

        <Heading3>Giải pháp với Hash Set</Heading3>
        <CodeBlock title="longest-consecutive.js">{`// LeetCode #128: Longest Consecutive Sequence — O(n) time
function longestConsecutive(nums) {
    const set = new Set(nums)                // O(1) lookup
    let maxLen = 0

    for (const num of set) {
        // Chỉ bắt đầu đếm từ SỐ ĐẦU TIÊN của dãy
        // (không có num - 1 trong set → num là đầu dãy)
        if (!set.has(num - 1)) {
            let current = num
            let length = 1

            // Đếm tiếp các số liên tiếp
            while (set.has(current + 1)) {
                current++
                length++
            }

            maxLen = Math.max(maxLen, length)
        }
    }

    return maxLen
}

// Ví dụ: nums = [100, 4, 200, 1, 3, 2]
// set = {100, 4, 200, 1, 3, 2}
// num=100: 99 không có → đầu dãy → 100,101? không → length=1
// num=4: 3 có → SKIP (không phải đầu dãy)
// num=1: 0 không có → đầu dãy → 1,2,3,4 → length=4 ✓
// maxLen = 4`}</CodeBlock>

        {/* ───────── BÀI 9: SUBARRAY SUM EQUALS K ───────── */}
        <Heading2>Bài 9: Subarray Sum Equals K (<a href="https://leetcode.com/problems/subarray-sum-equals-k/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline decoration-blue-400/30 hover:decoration-blue-300">LeetCode #560</a>)</Heading2>

        <Heading3>Đề bài</Heading3>
        <Paragraph>
            Cho mảng số nguyên <InlineCode>nums</InlineCode> và số <InlineCode>k</InlineCode>,
            đếm <Highlight>số lượng subarray có tổng bằng k</Highlight>.
        </Paragraph>

        <Heading3>Giải pháp: Prefix Sum + Hash Map</Heading3>
        <CodeBlock title="subarray-sum.js">{`// LeetCode #560: Subarray Sum Equals K — O(n) time
function subarraySum(nums, k) {
    // Key insight: sum(i..j) = prefixSum[j] - prefixSum[i-1] = k
    // → prefixSum[i-1] = prefixSum[j] - k
    // → Đếm bao nhiêu prefix sum trước đó = currentSum - k

    const prefixCount = new Map()            // { prefixSum → số lần xuất hiện }
    prefixCount.set(0, 1)                    // Base case: prefix sum 0 xuất hiện 1 lần
    let currentSum = 0
    let count = 0

    for (const num of nums) {
        currentSum += num                    // Tính prefix sum tại vị trí hiện tại
        const target = currentSum - k        // Cần tìm prefix sum = target

        if (prefixCount.has(target)) {
            count += prefixCount.get(target)  // Có bao nhiêu cách tạo subarray sum = k
        }

        prefixCount.set(currentSum, (prefixCount.get(currentSum) || 0) + 1)
    }

    return count
}

// Ví dụ: nums = [1, 2, 3], k = 3
// num=1: sum=1, target=1-3=-2, no → prefixCount={0:1, 1:1}
// num=2: sum=3, target=3-3=0, count+=1 → prefixCount={0:1, 1:1, 3:1}
// num=3: sum=6, target=6-3=3, count+=1 → count=2 (subarray [1,2] và [3]) ✓`}</CodeBlock>

        {/* ───────── BÀI 10: VALID SUDOKU ───────── */}
        <Heading2>Bài 10: Valid Sudoku (<a href="https://leetcode.com/problems/valid-sudoku/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline decoration-blue-400/30 hover:decoration-blue-300">LeetCode #36</a>)</Heading2>

        <Heading3>Đề bài</Heading3>
        <Paragraph>
            Kiểm tra bảng Sudoku 9x9 có <Highlight>hợp lệ</Highlight> không: mỗi hàng, cột, và box 3x3
            không chứa số trùng lặp. Ô trống ký hiệu bằng <InlineCode>&apos;.&apos;</InlineCode>.
        </Paragraph>

        <Heading3>Giải pháp: 3 Hash Sets</Heading3>
        <CodeBlock title="valid-sudoku.js">{`// LeetCode #36: Valid Sudoku — O(81) = O(1) time
function isValidSudoku(board) {
    const rows = Array.from({ length: 9 }, () => new Set())
    const cols = Array.from({ length: 9 }, () => new Set())
    const boxes = Array.from({ length: 9 }, () => new Set())

    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            const val = board[r][c]
            if (val === '.') continue        // Bỏ qua ô trống

            // Tính index của box 3x3 (0-8)
            const boxIdx = Math.floor(r / 3) * 3 + Math.floor(c / 3)

            // Kiểm tra trùng trong hàng, cột, hoặc box
            if (rows[r].has(val) || cols[c].has(val) || boxes[boxIdx].has(val)) {
                return false                 // Trùng lặp → không hợp lệ
            }

            rows[r].add(val)
            cols[c].add(val)
            boxes[boxIdx].add(val)
        }
    }

    return true                              // Không trùng → hợp lệ
}

// Key insight: dùng 27 Sets (9 rows + 9 cols + 9 boxes)
// Mỗi số chỉ cần kiểm tra 3 Sets → O(1) per cell`}</CodeBlock>

        {/* ───────── OBJECT vs MAP ───────── */}
        <Heading2>Object vs Map vs Set — Khi nào dùng gì?</Heading2>

        <div className="my-4 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
                <thead>
                    <tr className="border-b border-[var(--border-primary)]">
                        <th className="text-left p-3 text-[var(--text-secondary)] font-medium">Tiêu chí</th>
                        <th className="text-left p-3 text-[var(--text-secondary)] font-medium">Object</th>
                        <th className="text-left p-3 text-[var(--text-secondary)] font-medium">Map</th>
                        <th className="text-left p-3 text-[var(--text-secondary)] font-medium">Set</th>
                    </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                    <tr className="border-b border-gray-100">
                        <td className="p-3 font-medium">Key type</td>
                        <td className="p-3">string/symbol</td>
                        <td className="p-3">bất kỳ</td>
                        <td className="p-3">—</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                        <td className="p-3 font-medium">Dùng khi</td>
                        <td className="p-3">Key là string đơn giản</td>
                        <td className="p-3">Key phức tạp (object, array)</td>
                        <td className="p-3">Chỉ cần kiểm tra tồn tại</td>
                    </tr>
                    <tr>
                        <td className="p-3 font-medium">Lấy size</td>
                        <td className="p-3">Object.keys().length</td>
                        <td className="p-3">map.size</td>
                        <td className="p-3">set.size</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <Callout type="tip">
            Trong phỏng vấn, hầu hết dùng <InlineCode>Map</InlineCode> hoặc <InlineCode>Set</InlineCode> là đủ.
            Nhớ: cần lưu value → <InlineCode>Map</InlineCode>, chỉ cần kiểm tra có/không → <InlineCode>Set</InlineCode>.
        </Callout>

        <Heading2>Độ phức tạp</Heading2>
        <div className="my-4 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
                <thead>
                    <tr className="border-b border-[var(--border-primary)]">
                        <th className="text-left p-3 text-[var(--text-secondary)] font-medium">Thao tác</th>
                        <th className="text-left p-3 text-[var(--text-secondary)] font-medium">Trung bình</th>
                        <th className="text-left p-3 text-[var(--text-secondary)] font-medium">Xấu nhất</th>
                    </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                    <tr className="border-b border-gray-100"><td className="p-3">Thêm (set)</td><td className="p-3">O(1)</td><td className="p-3">O(n)</td></tr>
                    <tr className="border-b border-gray-100"><td className="p-3">Tìm (get/has)</td><td className="p-3">O(1)</td><td className="p-3">O(n)</td></tr>
                    <tr><td className="p-3">Xóa (delete)</td><td className="p-3">O(1)</td><td className="p-3">O(n)</td></tr>
                </tbody>
            </table>
        </div>

        <Callout type="warning">
            O(n) worst case xảy ra khi tất cả key bị collision (cùng hash). Trong thực tế gần như luôn là O(1).
        </Callout>
    </>
)

const enContent = (
    <>
        <Paragraph>
            <Highlight>Hash Map</Highlight> (or Hash Table) stores <InlineCode>key → value</InlineCode> pairs,
            allowing lookup, insertion, and deletion in average <Highlight>O(1)</Highlight> time.
            It&apos;s the most powerful tool when you need fast lookups.
        </Paragraph>

        <Callout type="info">
            Hash Map solves most problems involving: &quot;find element matching condition&quot;,
            &quot;count frequency&quot;, &quot;check duplicates&quot;. If brute-force is O(n²), Hash Map usually brings it down to O(n).
        </Callout>

        <Heading2>How to Use Map & Set in JavaScript</Heading2>

        <CodeBlock title="map-api.js">{`// ═══ MAP — store key → value pairs ═══
const map = new Map()
map.set('name', 'Khương')     // Add/update
map.set('age', 25)
map.get('name')               // 'Khương' — O(1)
map.has('age')                // true — O(1)
map.delete('age')             // Remove key
map.size                      // 1 — O(1)

// Initialize from array of [key, value] pairs
const map2 = new Map([['a', 1], ['b', 2], ['c', 3]])

// Iterate Map
for (const [key, value] of map2) {
    console.log(key, value)   // 'a' 1, 'b' 2, 'c' 3
}
map2.forEach((value, key) => console.log(key, value))

// Convert Map ↔ Object
const obj = Object.fromEntries(map2)  // { a: 1, b: 2, c: 3 }
const map3 = new Map(Object.entries(obj))`}</CodeBlock>

        <CodeBlock title="set-api.js">{`// ═══ SET — collection of unique values (no duplicates) ═══
const set = new Set()
set.add(1)                    // Add element
set.add(2)
set.add(1)                    // Ignored — already exists!
set.has(1)                    // true — O(1)
set.delete(2)                 // Remove element
set.size                      // 1

// Remove duplicates from array — one liner!
const unique = [...new Set([1, 2, 2, 3, 3, 3])]  // [1, 2, 3]

// Set operations: intersection, union, difference
const a = new Set([1, 2, 3])
const b = new Set([2, 3, 4])
const intersection = [...a].filter(x => b.has(x))  // [2, 3]
const union = new Set([...a, ...b])                 // {1, 2, 3, 4}
const diff = [...a].filter(x => !b.has(x))          // [1]`}</CodeBlock>

        <Heading3>Map ↔ Array: Conversion Cheat Sheet</Heading3>
        <Callout type="tip">
            <strong>Visual metaphor:</strong> <Highlight>Map = filing cabinet</Highlight> (each drawer has a label key + document value).
            <Highlight>Array = desk</Highlight> (items lined up in order).
            Converting = taking items from cabinet to desk, or filing from desk into cabinet.
        </Callout>
        <CodeBlock title="map-to-array.js">{`// ═══ MAP → ARRAY: "Take items from cabinet to desk" ═══
const map = new Map([["a", 1], ["b", 2], ["c", 3]])

// 🏷️ Take only labels (keys)
[...map.keys()]           // ["a", "b", "c"]

// 📄 Take only documents (values)
[...map.values()]         // [1, 2, 3]
// or: Array.from(map.values())  ← Group Anagrams uses this!

// 📦 Take everything [label, document]
[...map.entries()]        // [["a",1], ["b",2], ["c",3]]

// ═══ ARRAY → MAP: "File items from desk into cabinet" ═══
const pairs = [["x", 10], ["y", 20]]
const newMap = new Map(pairs)   // Map { "x"→10, "y"→20 }

// From regular array → Map (use index as key)
const arr = ["apple", "banana"]
const indexMap = new Map(arr.map((val, i) => [i, val]))
// Map { 0→"apple", 1→"banana" }`}</CodeBlock>

        <div className="my-4 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
                <thead>
                    <tr className="border-b border-[var(--border-primary)]">
                        <th className="text-left p-3 text-[var(--text-secondary)] font-medium">Direction</th>
                        <th className="text-left p-3 text-[var(--text-secondary)] font-medium">Code</th>
                        <th className="text-left p-3 text-[var(--text-secondary)] font-medium">Result</th>
                    </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                    <tr className="border-b border-gray-100"><td className="p-3">Map → keys</td><td className="p-3"><InlineCode>[...map.keys()]</InlineCode></td><td className="p-3">[&quot;a&quot;, &quot;b&quot;, &quot;c&quot;]</td></tr>
                    <tr className="border-b border-gray-100"><td className="p-3">Map → values</td><td className="p-3"><InlineCode>Array.from(map.values())</InlineCode></td><td className="p-3">[1, 2, 3]</td></tr>
                    <tr className="border-b border-gray-100"><td className="p-3">Map → pairs</td><td className="p-3"><InlineCode>[...map.entries()]</InlineCode></td><td className="p-3">[[&quot;a&quot;,1], [&quot;b&quot;,2]]</td></tr>
                    <tr><td className="p-3">Array → Map</td><td className="p-3"><InlineCode>new Map(pairs)</InlineCode></td><td className="p-3">Map &#123; &quot;x&quot;→10 &#125;</td></tr>
                </tbody>
            </table>
        </div>

        <Heading3>Object vs Map — When to Use Which?</Heading3>

        <div className="my-4 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
                <thead>
                    <tr className="border-b border-[var(--border-primary)]">
                        <th className="text-left p-3 text-[var(--text-secondary)] font-medium"></th>
                        <th className="text-left p-3 text-blue-400 font-medium">Object</th>
                        <th className="text-left p-3 text-purple-400 font-medium">Map</th>
                    </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                    <tr className="border-b border-gray-100"><td className="p-3 font-medium">Key type</td><td className="p-3">String/symbol only</td><td className="p-3">Any type (object, array, number...)</td></tr>
                    <tr className="border-b border-gray-100"><td className="p-3 font-medium">Get size</td><td className="p-3"><InlineCode>Object.keys(o).length</InlineCode></td><td className="p-3"><InlineCode>map.size</InlineCode> — O(1)</td></tr>
                    <tr className="border-b border-gray-100"><td className="p-3 font-medium">Order</td><td className="p-3">Not guaranteed</td><td className="p-3">Insertion order preserved</td></tr>
                    <tr><td className="p-3 font-medium">Performance</td><td className="p-3">Fast with few keys</td><td className="p-3">Better for frequent add/delete</td></tr>
                </tbody>
            </table>
        </div>

        <Callout type="tip">
            <strong>Quick rule:</strong> Use <InlineCode>Object</InlineCode> when keys are simple strings (config, JSON).
            Use <InlineCode>Map</InlineCode> when keys aren&#39;t strings, you need <InlineCode>size</InlineCode>, or frequent add/delete.
            Use <InlineCode>Set</InlineCode> when you only need to check "does it exist?" without storing values.
        </Callout>

        <Heading2>When to Use Hash Map?</Heading2>

        <div className="my-4 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
                <thead>
                    <tr className="border-b border-[var(--border-primary)]">
                        <th className="text-left p-3 text-[var(--text-secondary)] font-medium">Problem Signal</th>
                        <th className="text-left p-3 text-[var(--text-secondary)] font-medium">LeetCode Example</th>
                    </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                    <tr className="border-b border-gray-100"><td className="p-3">Find two numbers summing to target</td><td className="p-3">Two Sum (#1)</td></tr>
                    <tr className="border-b border-gray-100"><td className="p-3">Count occurrences</td><td className="p-3">Majority Element (#169)</td></tr>
                    <tr className="border-b border-gray-100"><td className="p-3">Check for duplicates</td><td className="p-3">Contains Duplicate (#217)</td></tr>
                    <tr className="border-b border-gray-100"><td className="p-3">Group similar elements</td><td className="p-3">Group Anagrams (#49)</td></tr>
                    <tr><td className="p-3">Find first non-repeating element</td><td className="p-3">First Unique Character (#387)</td></tr>
                </tbody>
            </table>
        </div>

        <Heading2>How It Works</Heading2>

        <Paragraph>
            Hash Map uses a <Highlight>hash function</Highlight> to convert keys into array indices.
            When two different keys produce the same index (collision), they&apos;re handled via chaining or open addressing.
        </Paragraph>

        <div className="my-6 p-4 rounded-xl bg-slate-800/50 border border-white/10">
            <div className="flex flex-col items-center gap-2 text-sm">
                <div className="px-4 py-2 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30 w-fit">1. Receive key → compute hash(key)</div>
                <div className="text-slate-600">↓</div>
                <div className="px-4 py-2 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30 w-fit">2. hash(key) % size → index in array</div>
                <div className="text-slate-600">↓</div>
                <div className="px-4 py-2 rounded-lg bg-green-500/20 text-green-300 border border-green-500/30 w-fit">3. Store/read value at index → O(1) average</div>
            </div>
        </div>

        <Heading3>Brute Force vs HashMap — Why is it Faster?</Heading3>
        <Paragraph>
            Brute Force uses <Highlight>2 nested for loops</Highlight> → tries every pair (i, j) → O(n²).<br />
            HashMap replaces the <Highlight>inner loop with one Map lookup</Highlight> → O(1) each → O(n) total.
        </Paragraph>
        <CodeBlock title="brute-force-vs-hashmap.js">{`// ═══ BRUTE FORCE — O(n²) ═══
function twoSumBrute(nums, target) {
    for (let i = 0; i < nums.length; i++) {         // loop 1: pick element A
        for (let j = i + 1; j < nums.length; j++) { // loop 2: scan ALL for partner
            if (nums[i] + nums[j] === target) return [i, j]
        }
    }
}
// Worst case [1,2,3,4,5] target=9:
// i=0: compare 4 times ✗ | i=1: 3 times ✗ | i=2: 2 times ✗ | i=3: 4+5=9 ✓
// Total: 10 comparisons for 5 elements!

// ═══ HASHMAP — O(n) ═══
function twoSumHash(nums, target) {
    const map = new Map()
    for (let i = 0; i < nums.length; i++) {
        const comp = target - nums[i]
        if (map.has(comp)) return [map.get(comp), i]  // O(1) lookup!
        map.set(nums[i], i)
    }
}
// Same input [1,2,3,4,5] target=9:
// i=0: comp=8 → nope | i=1: comp=7 → nope | i=2: comp=6 → nope
// i=3: comp=5 → nope | i=4: comp=4 → YES! ✓
// Total: 5 checks — twice as fast!`}</CodeBlock>

        <div className="my-4 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
                <thead>
                    <tr className="border-b border-[var(--border-primary)]">
                        <th className="text-left p-3 text-[var(--text-secondary)] font-medium">n elements</th>
                        <th className="text-left p-3 text-red-400 font-medium">Brute Force O(n²)</th>
                        <th className="text-left p-3 text-green-400 font-medium">HashMap O(n)</th>
                        <th className="text-left p-3 text-[var(--text-secondary)] font-medium">Speedup</th>
                    </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                    <tr className="border-b border-gray-100"><td className="p-3">10</td><td className="p-3">45</td><td className="p-3">10</td><td className="p-3">×4.5</td></tr>
                    <tr className="border-b border-gray-100"><td className="p-3">1,000</td><td className="p-3">500,000</td><td className="p-3">1,000</td><td className="p-3">×500</td></tr>
                    <tr className="border-b border-gray-100"><td className="p-3">1,000,000</td><td className="p-3">500 billion</td><td className="p-3">1 million</td><td className="p-3">×500,000</td></tr>
                </tbody>
            </table>
        </div>

        <Callout type="tip">
            <strong>Rule of thumb:</strong> If brute force uses <Highlight>2 nested for loops</Highlight> O(n²) to search, try
            replacing the inner loop with a <Highlight>HashMap</Highlight> → reduces to O(n). Trade-off: O(n) extra memory — but totally worth it!
        </Callout>

        <Heading2>Problem 1: Two Sum (<a href="https://leetcode.com/problems/two-sum/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline decoration-blue-400/30 hover:decoration-blue-300">LeetCode #1</a>)</Heading2>

        <Heading3>Problem</Heading3>
        <Paragraph>
            Given an array of integers <InlineCode>nums</InlineCode> and a <InlineCode>target</InlineCode>,
            find <Highlight>two elements</Highlight> that sum to target. Return their indices.
        </Paragraph>

        <Heading3>Hash Map Solution</Heading3>
        <div className="my-4 space-y-2 text-sm text-[var(--text-secondary)]">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">1.</span>
                <span>Iterate through each element <InlineCode>nums[i]</InlineCode>.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">2.</span>
                <span>Compute <InlineCode>complement = target - nums[i]</InlineCode>.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">3.</span>
                <span>Check if complement exists in Map → if yes, we found our pair!</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">4.</span>
                <span>If not, store <InlineCode>nums[i] → i</InlineCode> in Map for future lookups.</span>
            </div>
        </div>

        <CodeBlock title="two-sum.js">{`// LeetCode #1: Two Sum — O(n) time, O(n) space
function twoSum(nums, target) {
    const map = new Map()           // Store { value → index }

    for (let i = 0; i < nums.length; i++) {
        // Step 1: Calculate the number we need
        const complement = target - nums[i]

        // Step 2: Check if complement was seen before
        if (map.has(complement)) {
            // Found it! complement at old index, nums[i] at index i
            return [map.get(complement), i]
        }

        // Step 3: Not found yet → store nums[i] in Map
        map.set(nums[i], i)
    }
}

// Walkthrough: nums = [2, 7, 11, 15], target = 9
// i=0: complement = 9-2 = 7, map = {} → no 7 → map = {2:0}
// i=1: complement = 9-7 = 2, map = {2:0} → HAS 2! → return [0, 1] ✓`}</CodeBlock>

        <Heading3>Detailed Walkthrough</Heading3>
        <CodeBlock title="walkthrough.txt">{`nums = [3, 7, 11, 15], target = 18

i=0: nums[0]=3,  complement=15, map={} → not found → map={3:0}
i=1: nums[1]=7,  complement=11, map={3:0} → not found → map={3:0, 7:1}
i=2: nums[2]=11, complement=7,  map={3:0, 7:1} → FOUND 7 at index 1 ✅
     → return [1, 2]

Result: [1, 2] because nums[1] + nums[2] = 7 + 11 = 18`}</CodeBlock>

        <Callout type="tip">
            <strong>Key insight:</strong> Each element <Highlight>registers itself in the Map</Highlight> as it passes through.
            Later elements only need to check if their &quot;partner&quot; already registered — <Highlight>one pass is enough</Highlight>, no nested loops needed.
        </Callout>

        <Heading3>Edge Case: Element Larger Than Target</Heading3>
        <Paragraph>
            The algorithm still works because complement can be <Highlight>negative</Highlight>:
        </Paragraph>
        <CodeBlock title="edge-case.txt">{`nums = [20, -5, 3, -11], target = 9

i=0: nums[0]=20, complement = 9-20 = -11 → map={20:0}
i=1: nums[1]=-5, complement = 9-(-5) = 14 → map={20:0, -5:1}
i=2: nums[2]=3,  complement = 9-3 = 6 → map={20:0, -5:1, 3:2}
i=3: nums[3]=-11, complement = 9-(-11) = 20 → FOUND 20 at index 0 ✅
     → return [0, 3]  (because 20 + (-11) = 9)`}</CodeBlock>

        <Heading3>Brute Force vs HashMap</Heading3>
        <div className="my-4 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
                <thead>
                    <tr className="border-b border-[var(--border-primary)]">
                        <th className="text-left p-3 text-[var(--text-secondary)] font-medium">Approach</th>
                        <th className="text-left p-3 text-[var(--text-secondary)] font-medium">Time</th>
                        <th className="text-left p-3 text-[var(--text-secondary)] font-medium">Space</th>
                        <th className="text-left p-3 text-[var(--text-secondary)] font-medium">How it works</th>
                    </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                    <tr className="border-b border-gray-100"><td className="p-3">Brute Force</td><td className="p-3">O(n²)</td><td className="p-3">O(1)</td><td className="p-3">Two nested loops, try every pair (i,j)</td></tr>
                    <tr><td className="p-3 font-medium text-green-400">HashMap ✅</td><td className="p-3 text-green-400">O(n)</td><td className="p-3">O(n)</td><td className="p-3">One loop, each element checks Map</td></tr>
                </tbody>
            </table>
        </div>

        <Heading3>TypeScript: What Does ! Do?</Heading3>
        <CodeBlock title="non-null-assertion.ts">{`// TypeScript version:
function twoSum(nums: number[], target: number): number[] {
    const map = new Map<number, number>()
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i]
        if (map.has(complement)) {
            return [map.get(complement)!, i]
            //                          ^ Non-null assertion operator
            // map.get() returns number | undefined
            // The ! tells TS: "I already checked .has(), this is definitely not undefined"
        }
        map.set(nums[i], i)
    }
    return []
}`}</CodeBlock>

        <Heading2>Problem 2: Group Anagrams (<a href="https://leetcode.com/problems/group-anagrams/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline decoration-blue-400/30 hover:decoration-blue-300">LeetCode #49</a>)</Heading2>

        <Heading3>Problem</Heading3>
        <Paragraph>
            Given an array of strings, group <Highlight>anagrams</Highlight> together.
            Example: <InlineCode>[&quot;eat&quot;,&quot;tea&quot;,&quot;tan&quot;,&quot;ate&quot;,&quot;nat&quot;,&quot;bat&quot;]</InlineCode>
            → <InlineCode>[[&quot;eat&quot;,&quot;tea&quot;,&quot;ate&quot;],[&quot;tan&quot;,&quot;nat&quot;],[&quot;bat&quot;]]</InlineCode>
        </Paragraph>

        <Heading3>Hash Map Solution</Heading3>
        <div className="my-4 space-y-2 text-sm text-[var(--text-secondary)]">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">1.</span>
                <span>Two strings are anagrams when they share the same characters. We need a &quot;key&quot; to represent this.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">2.</span>
                <span>Key = sorted characters: <InlineCode>&quot;eat&quot; → &quot;aet&quot;</InlineCode>, <InlineCode>&quot;tea&quot; → &quot;aet&quot;</InlineCode> → same key!</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">3.</span>
                <span>Use Map with sorted string as key, array of original strings as value.</span>
            </div>
        </div>

        <CodeBlock title="group-anagrams.js">{`// LeetCode #49: Group Anagrams — O(n * k*log(k))
function groupAnagrams(strs) {
    const map = new Map()           // { sorted_string → [original strings] }

    for (const str of strs) {
        // Step 1: Create key by sorting characters
        const key = str.split('').sort().join('')

        // Step 2: Add original string to its group
        if (!map.has(key)) map.set(key, [])
        map.get(key).push(str)
    }

    // Step 3: Return all groups
    return Array.from(map.values())
}

// Walkthrough: ["eat","tea","tan","ate","nat","bat"]
// "eat" → key="aet" → map = { "aet": ["eat"] }
// "tea" → key="aet" → map = { "aet": ["eat","tea"] }
// "tan" → key="ant" → map = { "aet": ["eat","tea"], "ant": ["tan"] }
// "ate" → key="aet" → map = { "aet": ["eat","tea","ate"], ... }
// Result: [["eat","tea","ate"], ["tan","nat"], ["bat"]] ✓`}</CodeBlock>

        <Callout type="tip">
            <strong>Why <InlineCode>for...of</InlineCode> instead of a regular <InlineCode>for</InlineCode> loop?</strong><br />
            This problem <Highlight>doesn&apos;t need the index</Highlight> — only the value of each string.
            <InlineCode>for...of</InlineCode> is cleaner and more readable.
            Compare: <strong>Two Sum</strong> needs <InlineCode>i</InlineCode> to return the index → uses a regular <InlineCode>for</InlineCode>.
        </Callout>

        <Heading3>Map + Array: why does map.get(key).push() work?</Heading3>
        <Paragraph>
            <InlineCode>.push()</InlineCode> is <Highlight>not a Map method</Highlight> — it&apos;s an <strong>Array</strong> method.
            The trick: Map stores a <Highlight>reference</Highlight> to the Array, so pushing to the Array automatically updates what Map &quot;sees&quot;:
        </Paragraph>
        <CodeBlock title="map-array-reference.js">{`// Step 1: Store an empty array in Map
map.set("aet", [])
// map = { "aet": [] }

// Step 2: map.get() returns that exact array (reference)
const arr = map.get("aet")   // arr = []

// Step 3: push to the array (NOT pushing to Map!)
arr.push("eat")
// arr = ["eat"]
// map = { "aet": ["eat"] }  ← auto-updated, same reference!

// Shorthand: map.get("aet").push("eat")
// No need to map.set() again!`}</CodeBlock>
        <Callout type="info">
            <strong>Why no need to <InlineCode>map.set()</InlineCode> again?</strong><br />
            Map only stores a <Highlight>pointer</Highlight> to the array in memory.
            When you <InlineCode>.push()</InlineCode>, the array mutates in place → Map still points to the same array → sees the new value automatically.
        </Callout>

        <Heading2>Problem 3: Contains Duplicate (<a href="https://leetcode.com/problems/contains-duplicate/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline decoration-blue-400/30 hover:decoration-blue-300">LeetCode #217</a>)</Heading2>

        <Heading3>Problem</Heading3>
        <Paragraph>
            Given an integer array, check if any value appears <Highlight>at least twice</Highlight>.
        </Paragraph>

        <Heading3>Hash Set Solution</Heading3>
        <div className="my-4 space-y-2 text-sm text-[var(--text-secondary)]">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">1.</span>
                <span>Use a <InlineCode>Set</InlineCode> to track seen elements.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">2.</span>
                <span>For each element: if already in Set → duplicate found!</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">3.</span>
                <span>Otherwise add to Set and continue.</span>
            </div>
        </div>

        <CodeBlock title="contains-duplicate.js">{`// LeetCode #217: Contains Duplicate — O(n) time, O(n) space
function containsDuplicate(nums) {
    const seen = new Set()          // Track seen numbers

    for (const num of nums) {
        if (seen.has(num)) return true   // Duplicate!
        seen.add(num)                     // Not seen → add
    }

    return false                         // No duplicates
}

// Walkthrough: nums = [1, 2, 3, 1]
// num=1: seen = {} → not found → seen = {1}
// num=2: seen = {1} → not found → seen = {1,2}
// num=3: seen = {1,2} → not found → seen = {1,2,3}
// num=1: seen = {1,2,3} → HAS 1! → return true ✓`}</CodeBlock>

        <Heading2>Problem 4: Valid Anagram (<a href="https://leetcode.com/problems/valid-anagram/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline decoration-blue-400/30 hover:decoration-blue-300">LeetCode #242</a>)</Heading2>

        <Heading3>Problem</Heading3>
        <Paragraph>
            Given two strings <InlineCode>s</InlineCode> and <InlineCode>t</InlineCode>,
            determine if <InlineCode>t</InlineCode> is an <Highlight>anagram</Highlight> of <InlineCode>s</InlineCode>
            (same characters, same frequency).
        </Paragraph>

        <Heading3>Hash Map Solution</Heading3>
        <CodeBlock title="valid-anagram.js">{`// LeetCode #242: Valid Anagram — O(n) time, O(1) space (26 letters)
function isAnagram(s, t) {
    if (s.length !== t.length) return false  // Different length → not anagram

    const count = new Map()                  // Character frequency counter

    // Loop 1: count each char in s (+1)
    for (const c of s) {
        count.set(c, (count.get(c) || 0) + 1)
    }

    // Loop 2: subtract each char in t (-1)
    for (const c of t) {
        if (!count.has(c) || count.get(c) === 0) return false  // Char missing or exhausted
        count.set(c, count.get(c) - 1)                         // Decrement
    }

    return true                              // All chars matched
}

// Example: s = "anagram", t = "nagaram"
// Loop 1: count = Map { a→3, n→1, g→1, r→1, m→1 }
// Loop 2: n→0, a→2, g→0, a→1, r→0, a→0, m→0 → true ✓`}</CodeBlock>

        <Heading2>Problem 5: Ransom Note (<a href="https://leetcode.com/problems/ransom-note/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline decoration-blue-400/30 hover:decoration-blue-300">LeetCode #383</a>)</Heading2>

        <Heading3>Problem</Heading3>
        <Paragraph>
            Given two strings <InlineCode>ransomNote</InlineCode> and <InlineCode>magazine</InlineCode>,
            check if you can <Highlight>construct ransomNote using characters from magazine</Highlight>
            (each character in magazine used at most once).
        </Paragraph>

        <Callout type="tip">
            <strong>🔪 Visualize:</strong> Like cutting letters from a magazine to compose a ransom note in a movie! You have a magazine with many letters.
            You need to create a message (ransomNote). Each letter in the magazine can only be <Highlight>cut once</Highlight>.
            Order and position don&apos;t matter — you only need <Highlight>enough quantity</Highlight>.
        </Callout>

        <Heading3>Frequency — no need for consecutive!</Heading3>
        <Paragraph>
            This problem only counts the <Highlight>frequency</Highlight> of each character, not whether they appear consecutively or in order.
            Magazine <InlineCode>{`"xaybz"`}</InlineCode> still has enough characters for ransomNote <InlineCode>{`"aby"`}</InlineCode> — even though they&apos;re scattered.
        </Paragraph>
        <CodeBlock title="frequency-not-position.txt">{`// Question: Can "aby" be constructed from "xaybz"?
// → Just count: a needs 1 (has 1 ✅), b needs 1 (has 1 ✅), y needs 1 (has 1 ✅) → true!
// Position of a at index 1, b at index 3, y at index 2 — DOESN'T MATTER

// Compare with Substring (different problem):
// Substring REQUIRES consecutive: "aby" is NOT a substring of "xaybz"
// Ransom Note DOESN'T require consecutive: only frequency matters`}</CodeBlock>

        <Heading3>Hash Map Solution</Heading3>
        <div className="my-4 space-y-2 text-sm text-[var(--text-secondary)]">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">1.</span>
                <span>Count all characters in magazine → store in Map (letter inventory)</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">2.</span>
                <span>Loop ransomNote: each character needed → subtract 1 from inventory. If empty → false</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">3.</span>
                <span>If all characters consumed successfully → true</span>
            </div>
        </div>

        <CodeBlock title="ransom-note.js">{`// LeetCode #383: Ransom Note — O(n + m) time, O(1) space
function canConstruct(ransomNote, magazine) {
    const charCount = new Map()              // Available chars from magazine

    for (const c of magazine) {
        charCount.set(c, (charCount.get(c) || 0) + 1)  // Build char inventory
    }

    for (const c of ransomNote) {
        if (!charCount.has(c) || charCount.get(c) === 0) return false  // Not enough chars → false
        charCount.set(c, charCount.get(c) - 1)                        // Use one char
    }

    return true                              // All chars available
}`}</CodeBlock>

        <Heading3>Detailed Walkthrough</Heading3>
        <CodeBlock title="walkthrough.txt">{`✅ Example 1: ransomNote = "aa", magazine = "aab" → true
──────────────────────────────────────────────────────
Step 1 — Count magazine "aab":
  'a' → Map { a→1 }
  'a' → Map { a→2 }
  'b' → Map { a→2, b→1 }

Step 2 — Loop ransomNote "aa":
  'a' → has? ✅, count=2>0 ✅ → subtract 1 → Map { a→1, b→1 }
  'a' → has? ✅, count=1>0 ✅ → subtract 1 → Map { a→0, b→1 }
  → Done with ransomNote → return true ✓

❌ Example 2: ransomNote = "aab", magazine = "ab" → false
──────────────────────────────────────────────────────
Step 1 — Count magazine "ab":
  'a' → Map { a→1 }
  'b' → Map { a→1, b→1 }

Step 2 — Loop ransomNote "aab":
  'a' → has? ✅, count=1>0 ✅ → subtract 1 → Map { a→0, b→1 }
  'a' → has? ✅, count=0 ❌ → return false ✗
  (needs 2 'a's but magazine only has 1!)

✅ Example 3: ransomNote = "abc", magazine = "zcbaxyz" → true
──────────────────────────────────────────────────────
Magazine has a=1, b=1, c=1, x=1, y=1, z=2
RansomNote needs a=1, b=1, c=1 → all satisfied!
Extra chars x, y, z → no problem (magazine can have surplus)`}</CodeBlock>

        <Callout type="tip">
            <strong>Ransom Note vs Valid Anagram:</strong><br />
            Both use Map to count frequency, but differ in:<br />
            • <strong>Anagram</strong>: two strings must have <Highlight>same length</Highlight> and same frequency → permutations of each other<br />
            • <strong>Ransom Note</strong>: magazine can have <Highlight>surplus characters</Highlight> → just need &quot;enough&quot;, not &quot;equal&quot;
        </Callout>

        <Heading2>Problem 6: Intersection of Two Arrays (<a href="https://leetcode.com/problems/intersection-of-two-arrays/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline decoration-blue-400/30 hover:decoration-blue-300">LeetCode #349</a>)</Heading2>

        <Heading3>Problem</Heading3>
        <Paragraph>
            Given two integer arrays, return <Highlight>an array of their intersection</Highlight> (each element appears only once in the result).
        </Paragraph>

        <Heading3>Hash Set Solution</Heading3>
        <CodeBlock title="intersection.js">{`// LeetCode #349: Intersection of Two Arrays — O(n + m) time
function intersection(nums1, nums2) {
    const set1 = new Set(nums1)              // Convert nums1 to Set
    const result = new Set()                 // Store result (auto-dedup)

    for (const num of nums2) {
        if (set1.has(num)) {                 // If num exists in nums1
            result.add(num)                  // Add to result
        }
    }

    return [...result]                       // Convert Set → Array
}

// Example: nums1 = [1,2,2,1], nums2 = [2,2]
// set1 = {1, 2}
// num=2: set1 has 2 → result = {2}
// num=2: result already has 2 (Set auto-dedup)
// → [2] ✓`}</CodeBlock>

        <Heading2>Problem 7: Top K Frequent Elements (<a href="https://leetcode.com/problems/top-k-frequent-elements/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline decoration-blue-400/30 hover:decoration-blue-300">LeetCode #347</a>)</Heading2>

        <Heading3>Problem</Heading3>
        <Paragraph>
            Given an integer array <InlineCode>nums</InlineCode> and integer <InlineCode>k</InlineCode>,
            return the <Highlight>k most frequent elements</Highlight>.
        </Paragraph>

        <Heading3>Solution: HashMap + Bucket Sort</Heading3>
        <CodeBlock title="top-k-frequent.js">{`// LeetCode #347: Top K Frequent Elements — O(n) time
function topKFrequent(nums, k) {
    // Step 1: Count frequency with HashMap
    const freq = new Map()
    for (const num of nums) {
        freq.set(num, (freq.get(num) || 0) + 1)
    }

    // Step 2: Bucket sort — bucket[i] = numbers appearing i times
    const buckets = Array.from({ length: nums.length + 1 }, () => [])
    for (const [num, count] of freq) {
        buckets[count].push(num)
    }

    // Step 3: Iterate from largest bucket → collect k elements
    const result = []
    for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
        result.push(...buckets[i])
    }

    return result.slice(0, k)
}

// Example: nums = [1,1,1,2,2,3], k = 2
// freq = { 1:3, 2:2, 3:1 }
// buckets = [[], [3], [2], [1], ...]
// Reverse: bucket[3]=[1], bucket[2]=[2] → [1, 2] ✓`}</CodeBlock>

        <Heading2>Problem 8: Longest Consecutive Sequence (<a href="https://leetcode.com/problems/longest-consecutive-sequence/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline decoration-blue-400/30 hover:decoration-blue-300">LeetCode #128</a>)</Heading2>

        <Heading3>Problem</Heading3>
        <Paragraph>
            Given an <Highlight>unsorted</Highlight> integer array, find the length of the
            <Highlight>longest consecutive elements sequence</Highlight>. Must be O(n) time.
        </Paragraph>

        <Heading3>Hash Set Solution</Heading3>
        <CodeBlock title="longest-consecutive.js">{`// LeetCode #128: Longest Consecutive Sequence — O(n) time
function longestConsecutive(nums) {
    const set = new Set(nums)                // O(1) lookup
    let maxLen = 0

    for (const num of set) {
        // Only start counting from the FIRST number of a sequence
        // (num - 1 not in set → num is the start)
        if (!set.has(num - 1)) {
            let current = num
            let length = 1

            // Count consecutive numbers
            while (set.has(current + 1)) {
                current++
                length++
            }

            maxLen = Math.max(maxLen, length)
        }
    }

    return maxLen
}

// Example: nums = [100, 4, 200, 1, 3, 2]
// set = {100, 4, 200, 1, 3, 2}
// num=100: 99 not in set → start → 100,101? no → length=1
// num=4: 3 in set → SKIP (not start of sequence)
// num=1: 0 not in set → start → 1,2,3,4 → length=4 ✓
// maxLen = 4`}</CodeBlock>

        <Heading2>Problem 9: Subarray Sum Equals K (<a href="https://leetcode.com/problems/subarray-sum-equals-k/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline decoration-blue-400/30 hover:decoration-blue-300">LeetCode #560</a>)</Heading2>

        <Heading3>Problem</Heading3>
        <Paragraph>
            Given an integer array <InlineCode>nums</InlineCode> and integer <InlineCode>k</InlineCode>,
            count the <Highlight>number of subarrays with sum equal to k</Highlight>.
        </Paragraph>

        <Heading3>Solution: Prefix Sum + Hash Map</Heading3>
        <CodeBlock title="subarray-sum.js">{`// LeetCode #560: Subarray Sum Equals K — O(n) time
function subarraySum(nums, k) {
    // Key insight: sum(i..j) = prefixSum[j] - prefixSum[i-1] = k
    // → prefixSum[i-1] = prefixSum[j] - k
    // → Count how many previous prefix sums = currentSum - k

    const prefixCount = new Map()            // { prefixSum → occurrence count }
    prefixCount.set(0, 1)                    // Base case: prefix sum 0 occurs once
    let currentSum = 0
    let count = 0

    for (const num of nums) {
        currentSum += num                    // Running prefix sum
        const target = currentSum - k        // Need to find this prefix sum

        if (prefixCount.has(target)) {
            count += prefixCount.get(target)  // How many ways to form subarray sum = k
        }

        prefixCount.set(currentSum, (prefixCount.get(currentSum) || 0) + 1)
    }

    return count
}

// Example: nums = [1, 2, 3], k = 3
// num=1: sum=1, target=1-3=-2, no → prefixCount={0:1, 1:1}
// num=2: sum=3, target=3-3=0, count+=1 → prefixCount={0:1, 1:1, 3:1}
// num=3: sum=6, target=6-3=3, count+=1 → count=2 (subarrays [1,2] and [3]) ✓`}</CodeBlock>

        <Heading2>Problem 10: Valid Sudoku (<a href="https://leetcode.com/problems/valid-sudoku/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline decoration-blue-400/30 hover:decoration-blue-300">LeetCode #36</a>)</Heading2>

        <Heading3>Problem</Heading3>
        <Paragraph>
            Check if a 9x9 Sudoku board is <Highlight>valid</Highlight>: each row, column, and 3x3 box
            must not contain duplicate numbers. Empty cells are marked with <InlineCode>&apos;.&apos;</InlineCode>.
        </Paragraph>

        <Heading3>Solution: 3 Hash Sets</Heading3>
        <CodeBlock title="valid-sudoku.js">{`// LeetCode #36: Valid Sudoku — O(81) = O(1) time
function isValidSudoku(board) {
    const rows = Array.from({ length: 9 }, () => new Set())
    const cols = Array.from({ length: 9 }, () => new Set())
    const boxes = Array.from({ length: 9 }, () => new Set())

    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            const val = board[r][c]
            if (val === '.') continue        // Skip empty cells

            // Calculate 3x3 box index (0-8)
            const boxIdx = Math.floor(r / 3) * 3 + Math.floor(c / 3)

            // Check for duplicates in row, column, or box
            if (rows[r].has(val) || cols[c].has(val) || boxes[boxIdx].has(val)) {
                return false                 // Duplicate → invalid
            }

            rows[r].add(val)
            cols[c].add(val)
            boxes[boxIdx].add(val)
        }
    }

    return true                              // No duplicates → valid
}

// Key insight: use 27 Sets (9 rows + 9 cols + 9 boxes)
// Each number only checks 3 Sets → O(1) per cell`}</CodeBlock>

        <Heading2>Complexity Analysis</Heading2>
        <div className="my-4 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
                <thead>
                    <tr className="border-b border-[var(--border-primary)]">
                        <th className="text-left p-3 text-[var(--text-secondary)] font-medium">Operation</th>
                        <th className="text-left p-3 text-[var(--text-secondary)] font-medium">Average</th>
                        <th className="text-left p-3 text-[var(--text-secondary)] font-medium">Worst</th>
                    </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                    <tr className="border-b border-gray-100"><td className="p-3">Insert (set)</td><td className="p-3">O(1)</td><td className="p-3">O(n)</td></tr>
                    <tr className="border-b border-gray-100"><td className="p-3">Lookup (get/has)</td><td className="p-3">O(1)</td><td className="p-3">O(n)</td></tr>
                    <tr><td className="p-3">Delete</td><td className="p-3">O(1)</td><td className="p-3">O(n)</td></tr>
                </tbody>
            </table>
        </div>

        <Callout type="tip">
            In interviews, use <InlineCode>Map</InlineCode> when you need to store values, <InlineCode>Set</InlineCode> when you only need existence checks.
        </Callout>
    </>
)

const hashMapPattern: BlogPost = {
    slug: 'hash-map-pattern',
    title: {
        vi: 'Hash Map Pattern — Tìm kiếm O(1) với bảng băm',
        en: 'Hash Map Pattern — O(1) Lookup with Hash Tables',
    },
    description: {
        vi: 'Giải thích chi tiết Hash Map/Set với các bài LeetCode: Two Sum, Group Anagrams, Contains Duplicate. Mỗi bài có giải pháp từng bước và code comment.',
        en: 'Deep dive into Hash Map/Set with LeetCode problems: Two Sum, Group Anagrams, Contains Duplicate. Step-by-step solutions with commented code.',
    },
    date: '2025-07-15',
    tags: ['Algorithm', 'Hash Map', 'LeetCode'],
    emoji: '🗺️',
    color: '#3b82f6',
    content: { vi: viContent, en: enContent },
}

export default hashMapPattern
