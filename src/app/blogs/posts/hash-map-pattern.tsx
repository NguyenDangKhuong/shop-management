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

        <Heading2>Khi nào dùng Hash Map?</Heading2>

        <div className="my-4 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
                <thead>
                    <tr className="border-b border-gray-200 dark:border-white/10">
                        <th className="text-left p-3 text-gray-500 dark:text-slate-400 font-medium">Dấu hiệu bài toán</th>
                        <th className="text-left p-3 text-gray-500 dark:text-slate-400 font-medium">Ví dụ LeetCode</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-slate-300">
                    <tr className="border-b border-gray-100 dark:border-white/5"><td className="p-3">Tìm 2 số có tổng = target</td><td className="p-3">Two Sum (#1)</td></tr>
                    <tr className="border-b border-gray-100 dark:border-white/5"><td className="p-3">Đếm số lần xuất hiện</td><td className="p-3">Majority Element (#169)</td></tr>
                    <tr className="border-b border-gray-100 dark:border-white/5"><td className="p-3">Kiểm tra phần tử trùng lặp</td><td className="p-3">Contains Duplicate (#217)</td></tr>
                    <tr className="border-b border-gray-100 dark:border-white/5"><td className="p-3">Nhóm các phần tử giống nhau</td><td className="p-3">Group Anagrams (#49)</td></tr>
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

        {/* ───────── BÀI 1: TWO SUM ───────── */}
        <Heading2>Bài 1: Two Sum (LeetCode #1)</Heading2>

        <Heading3>Đề bài</Heading3>
        <Paragraph>
            Cho một mảng số nguyên <InlineCode>nums</InlineCode> và một giá trị <InlineCode>target</InlineCode>,
            tìm <Highlight>hai phần tử</Highlight> có tổng bằng target. Trả về chỉ số của chúng.
        </Paragraph>

        <Heading3>Giải pháp với Hash Map</Heading3>
        <div className="my-4 space-y-2 text-sm text-gray-600 dark:text-slate-300">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">1.</span>
                <span>Duyệt qua từng phần tử <InlineCode>nums[i]</InlineCode> trong mảng.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">2.</span>
                <span>Tính <InlineCode>complement = target - nums[i]</InlineCode>.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">3.</span>
                <span>Kiểm tra xem <InlineCode>complement</InlineCode> đã tồn tại trong Map chưa → nếu có, ta tìm thấy cặp!</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
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

        {/* ───────── BÀI 2: GROUP ANAGRAMS ───────── */}
        <Heading2>Bài 2: Group Anagrams (LeetCode #49)</Heading2>

        <Heading3>Đề bài</Heading3>
        <Paragraph>
            Cho một mảng các chuỗi, nhóm các chuỗi là <Highlight>anagram</Highlight> của nhau lại.
            Ví dụ: <InlineCode>[&quot;eat&quot;,&quot;tea&quot;,&quot;tan&quot;,&quot;ate&quot;,&quot;nat&quot;,&quot;bat&quot;]</InlineCode>
            → <InlineCode>[[&quot;eat&quot;,&quot;tea&quot;,&quot;ate&quot;],[&quot;tan&quot;,&quot;nat&quot;],[&quot;bat&quot;]]</InlineCode>
        </Paragraph>

        <Heading3>Giải pháp với Hash Map</Heading3>
        <div className="my-4 space-y-2 text-sm text-gray-600 dark:text-slate-300">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">1.</span>
                <span>Hai chuỗi là anagram khi chúng có cùng ký tự (cùng tần suất). Vậy ta cần tạo một &quot;key&quot; đại diện.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">2.</span>
                <span>Key = sắp xếp các ký tự: <InlineCode>&quot;eat&quot; → &quot;aet&quot;</InlineCode>, <InlineCode>&quot;tea&quot; → &quot;aet&quot;</InlineCode> → cùng key!</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">3.</span>
                <span>Dùng Map với key là chuỗi đã sort, value là mảng các chuỗi gốc.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
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

        {/* ───────── BÀI 3: CONTAINS DUPLICATE ───────── */}
        <Heading2>Bài 3: Contains Duplicate (LeetCode #217)</Heading2>

        <Heading3>Đề bài</Heading3>
        <Paragraph>
            Cho một mảng số nguyên, kiểm tra xem có phần tử nào <Highlight>xuất hiện ít nhất 2 lần</Highlight> không.
        </Paragraph>

        <Heading3>Giải pháp với Hash Set</Heading3>
        <div className="my-4 space-y-2 text-sm text-gray-600 dark:text-slate-300">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">1.</span>
                <span>Dùng <InlineCode>Set</InlineCode> để lưu các phần tử đã gặp.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">2.</span>
                <span>Duyệt qua từng phần tử: nếu đã có trong Set → trùng lặp!</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
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

        {/* ───────── OBJECT vs MAP ───────── */}
        <Heading2>Object vs Map vs Set — Khi nào dùng gì?</Heading2>

        <div className="my-4 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
                <thead>
                    <tr className="border-b border-gray-200 dark:border-white/10">
                        <th className="text-left p-3 text-gray-500 dark:text-slate-400 font-medium">Tiêu chí</th>
                        <th className="text-left p-3 text-gray-500 dark:text-slate-400 font-medium">Object</th>
                        <th className="text-left p-3 text-gray-500 dark:text-slate-400 font-medium">Map</th>
                        <th className="text-left p-3 text-gray-500 dark:text-slate-400 font-medium">Set</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-slate-300">
                    <tr className="border-b border-gray-100 dark:border-white/5">
                        <td className="p-3 font-medium">Key type</td>
                        <td className="p-3">string/symbol</td>
                        <td className="p-3">bất kỳ</td>
                        <td className="p-3">—</td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-white/5">
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
                    <tr className="border-b border-gray-200 dark:border-white/10">
                        <th className="text-left p-3 text-gray-500 dark:text-slate-400 font-medium">Thao tác</th>
                        <th className="text-left p-3 text-gray-500 dark:text-slate-400 font-medium">Trung bình</th>
                        <th className="text-left p-3 text-gray-500 dark:text-slate-400 font-medium">Xấu nhất</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-slate-300">
                    <tr className="border-b border-gray-100 dark:border-white/5"><td className="p-3">Thêm (set)</td><td className="p-3">O(1)</td><td className="p-3">O(n)</td></tr>
                    <tr className="border-b border-gray-100 dark:border-white/5"><td className="p-3">Tìm (get/has)</td><td className="p-3">O(1)</td><td className="p-3">O(n)</td></tr>
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

        <Heading2>When to Use Hash Map?</Heading2>

        <div className="my-4 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
                <thead>
                    <tr className="border-b border-gray-200 dark:border-white/10">
                        <th className="text-left p-3 text-gray-500 dark:text-slate-400 font-medium">Problem Signal</th>
                        <th className="text-left p-3 text-gray-500 dark:text-slate-400 font-medium">LeetCode Example</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-slate-300">
                    <tr className="border-b border-gray-100 dark:border-white/5"><td className="p-3">Find two numbers summing to target</td><td className="p-3">Two Sum (#1)</td></tr>
                    <tr className="border-b border-gray-100 dark:border-white/5"><td className="p-3">Count occurrences</td><td className="p-3">Majority Element (#169)</td></tr>
                    <tr className="border-b border-gray-100 dark:border-white/5"><td className="p-3">Check for duplicates</td><td className="p-3">Contains Duplicate (#217)</td></tr>
                    <tr className="border-b border-gray-100 dark:border-white/5"><td className="p-3">Group similar elements</td><td className="p-3">Group Anagrams (#49)</td></tr>
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

        <Heading2>Problem 1: Two Sum (LeetCode #1)</Heading2>

        <Heading3>Problem</Heading3>
        <Paragraph>
            Given an array of integers <InlineCode>nums</InlineCode> and a <InlineCode>target</InlineCode>,
            find <Highlight>two elements</Highlight> that sum to target. Return their indices.
        </Paragraph>

        <Heading3>Hash Map Solution</Heading3>
        <div className="my-4 space-y-2 text-sm text-gray-600 dark:text-slate-300">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">1.</span>
                <span>Iterate through each element <InlineCode>nums[i]</InlineCode>.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">2.</span>
                <span>Compute <InlineCode>complement = target - nums[i]</InlineCode>.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">3.</span>
                <span>Check if complement exists in Map → if yes, we found our pair!</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
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

        <Heading2>Problem 2: Group Anagrams (LeetCode #49)</Heading2>

        <Heading3>Problem</Heading3>
        <Paragraph>
            Given an array of strings, group <Highlight>anagrams</Highlight> together.
            Example: <InlineCode>[&quot;eat&quot;,&quot;tea&quot;,&quot;tan&quot;,&quot;ate&quot;,&quot;nat&quot;,&quot;bat&quot;]</InlineCode>
            → <InlineCode>[[&quot;eat&quot;,&quot;tea&quot;,&quot;ate&quot;],[&quot;tan&quot;,&quot;nat&quot;],[&quot;bat&quot;]]</InlineCode>
        </Paragraph>

        <Heading3>Hash Map Solution</Heading3>
        <div className="my-4 space-y-2 text-sm text-gray-600 dark:text-slate-300">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">1.</span>
                <span>Two strings are anagrams when they share the same characters. We need a &quot;key&quot; to represent this.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">2.</span>
                <span>Key = sorted characters: <InlineCode>&quot;eat&quot; → &quot;aet&quot;</InlineCode>, <InlineCode>&quot;tea&quot; → &quot;aet&quot;</InlineCode> → same key!</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
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

        <Heading2>Problem 3: Contains Duplicate (LeetCode #217)</Heading2>

        <Heading3>Problem</Heading3>
        <Paragraph>
            Given an integer array, check if any value appears <Highlight>at least twice</Highlight>.
        </Paragraph>

        <Heading3>Hash Set Solution</Heading3>
        <div className="my-4 space-y-2 text-sm text-gray-600 dark:text-slate-300">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">1.</span>
                <span>Use a <InlineCode>Set</InlineCode> to track seen elements.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">2.</span>
                <span>For each element: if already in Set → duplicate found!</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
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

        <Heading2>Complexity Analysis</Heading2>
        <div className="my-4 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
                <thead>
                    <tr className="border-b border-gray-200 dark:border-white/10">
                        <th className="text-left p-3 text-gray-500 dark:text-slate-400 font-medium">Operation</th>
                        <th className="text-left p-3 text-gray-500 dark:text-slate-400 font-medium">Average</th>
                        <th className="text-left p-3 text-gray-500 dark:text-slate-400 font-medium">Worst</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-slate-300">
                    <tr className="border-b border-gray-100 dark:border-white/5"><td className="p-3">Insert (set)</td><td className="p-3">O(1)</td><td className="p-3">O(n)</td></tr>
                    <tr className="border-b border-gray-100 dark:border-white/5"><td className="p-3">Lookup (get/has)</td><td className="p-3">O(1)</td><td className="p-3">O(n)</td></tr>
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
    date: '2026-02-26',
    tags: ['Algorithm', 'Hash Map', 'LeetCode'],
    emoji: '🗺️',
    color: '#3b82f6',
    content: { vi: viContent, en: enContent },
}

export default hashMapPattern
