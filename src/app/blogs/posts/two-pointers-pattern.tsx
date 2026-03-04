import { BlogPost } from '../types'
import { CodeBlock, Heading2, Heading3, Paragraph, Highlight, InlineCode, Callout } from '../components/BlogComponents'

const viContent = (
    <>
        <Paragraph>
            <Highlight>Two Pointers</Highlight> là một kỹ thuật trong đó ta sử dụng hai con trỏ để duyệt qua một cấu trúc dữ liệu
            như mảng hoặc danh sách liên kết. Hai con trỏ này có thể:
        </Paragraph>

        <div className="my-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-4">
                <div className="text-blue-400 font-bold text-sm mb-2">↔️ Ngược hướng</div>
                <ul className="text-gray-500 dark:text-slate-400 text-xs space-y-1">
                    <li>• left ở đầu, right ở cuối</li>
                    <li>• Tìm cặp số, palindrome</li>
                    <li>• Container With Most Water</li>
                </ul>
            </div>
            <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-4">
                <div className="text-green-400 font-bold text-sm mb-2">→→ Cùng hướng</div>
                <ul className="text-gray-500 dark:text-slate-400 text-xs space-y-1">
                    <li>• Fast & slow pointer</li>
                    <li>• Remove duplicates</li>
                    <li>• Linked list cycle</li>
                </ul>
            </div>
            <div className="rounded-xl bg-purple-500/10 border border-purple-500/20 p-4">
                <div className="text-purple-400 font-bold text-sm mb-2">🔀 Merge hai mảng</div>
                <ul className="text-gray-500 dark:text-slate-400 text-xs space-y-1">
                    <li>• Hai con trỏ trên 2 mảng</li>
                    <li>• Merge Sort</li>
                    <li>• Merge Sorted Arrays</li>
                </ul>
            </div>
        </div>

        <Callout type="info">
            Two Pointers thường giúp giảm từ O(n²) xuống <InlineCode>O(n)</InlineCode>. Điều kiện tiên quyết phổ biến:
            mảng <Highlight>đã sắp xếp</Highlight> hoặc bài toán có tính chất cho phép di chuyển pointer một chiều.
        </Callout>

        <Heading2>Cách dùng Two Pointers</Heading2>

        <CodeBlock title="two-pointers-templates.js">{`// ═══ TEMPLATE 1: Ngược hướng (Opposite Direction) ═══
// Dùng khi: mảng đã sort, tìm cặp số, palindrome
let left = 0, right = arr.length - 1
while (left < right) {
    const sum = arr[left] + arr[right]
    if (sum === target) return [left, right]
    else if (sum < target) left++      // Cần tăng tổng → dịch left
    else right--                        // Cần giảm tổng → dịch right
}

// ═══ TEMPLATE 2: Cùng hướng (Fast & Slow) ═══
// Dùng khi: loại bỏ trùng lặp, phân vùng
let slow = 0
for (let fast = 0; fast < arr.length; fast++) {
    if (arr[fast] !== arr[slow]) {     // Phần tử mới (không trùng)
        slow++
        arr[slow] = arr[fast]          // Ghi vào vị trí tiếp theo
    }
}
// Kết quả: arr[0..slow] là mảng đã loại trùng

// ═══ TEMPLATE 3: Merge hai mảng sorted ═══
let i = 0, j = 0, result = []
while (i < a.length && j < b.length) {
    if (a[i] <= b[j]) result.push(a[i++])
    else result.push(b[j++])
}
// Thêm phần còn lại
result.push(...a.slice(i), ...b.slice(j))`}</CodeBlock>

        <Heading2>Khi nào dùng Two Pointers?</Heading2>

        <div className="my-4 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
                <thead>
                    <tr className="border-b border-gray-200 dark:border-white/10">
                        <th className="text-left p-3 text-gray-500 dark:text-slate-400 font-medium">Dấu hiệu bài toán</th>
                        <th className="text-left p-3 text-gray-500 dark:text-slate-400 font-medium">Ví dụ LeetCode</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-slate-300">
                    <tr className="border-b border-gray-100 dark:border-white/5"><td className="p-3">Mảng sorted + tìm cặp</td><td className="p-3">Two Sum II (#167)</td></tr>
                    <tr className="border-b border-gray-100 dark:border-white/5"><td className="p-3">So sánh từ 2 đầu</td><td className="p-3">Valid Palindrome (#125)</td></tr>
                    <tr className="border-b border-gray-100 dark:border-white/5"><td className="p-3">Loại bỏ phần tử trùng</td><td className="p-3">Remove Duplicates (#26)</td></tr>
                    <tr className="border-b border-gray-100 dark:border-white/5"><td className="p-3">Tìm container chứa nhiều nước nhất</td><td className="p-3">Container With Most Water (#11)</td></tr>
                    <tr><td className="p-3">Merge hai mảng sorted</td><td className="p-3">Merge Sorted Array (#88)</td></tr>
                </tbody>
            </table>
        </div>

        {/* ───────── BÀI 1 ───────── */}
        <Heading2>Bài 1: Two Sum II — Mảng đã sắp xếp (LeetCode #167)</Heading2>

        <Heading3>Đề bài</Heading3>
        <Paragraph>
            Cho một mảng <Highlight>đã sắp xếp tăng dần</Highlight> <InlineCode>numbers</InlineCode> và một giá trị <InlineCode>target</InlineCode>,
            tìm hai số có tổng bằng target. Trả về chỉ số (1-indexed).
        </Paragraph>

        <Heading3>Giải pháp với Two Pointers</Heading3>
        <div className="my-4 space-y-2 text-sm text-gray-600 dark:text-slate-300">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">1.</span>
                <span>Đặt con trỏ <InlineCode>left</InlineCode> ở đầu mảng và <InlineCode>right</InlineCode> ở cuối mảng.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">2.</span>
                <span>Tính tổng: <InlineCode>sum = numbers[left] + numbers[right]</InlineCode>.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">3.</span>
                <span>Nếu <InlineCode>sum {'>'} target</InlineCode> → tổng quá lớn → giảm <InlineCode>right</InlineCode> (giảm giá trị lớn).</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">4.</span>
                <span>Nếu <InlineCode>sum {'<'} target</InlineCode> → tổng quá nhỏ → tăng <InlineCode>left</InlineCode> (tăng giá trị nhỏ).</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">5.</span>
                <span>Nếu <InlineCode>sum === target</InlineCode> → tìm thấy!</span>
            </div>
        </div>

        <CodeBlock title="two-sum-ii.js">{`// LeetCode #167: Two Sum II — O(n) time, O(1) space
function twoSum(numbers, target) {
    let left = 0                        // Con trỏ đầu mảng
    let right = numbers.length - 1      // Con trỏ cuối mảng

    while (left < right) {
        const sum = numbers[left] + numbers[right]

        if (sum === target) {
            // Tìm thấy cặp! (1-indexed)
            return [left + 1, right + 1]
        } else if (sum > target) {
            // Tổng quá lớn → giảm right để giảm tổng
            right--
        } else {
            // Tổng quá nhỏ → tăng left để tăng tổng
            left++
        }
    }
}

// Ví dụ: numbers = [2, 7, 11, 15], target = 9
// left=0, right=3: sum = 2+15 = 17 > 9 → right--
// left=0, right=2: sum = 2+11 = 13 > 9 → right--
// left=0, right=1: sum = 2+7 = 9 === 9 → return [1, 2] ✓

// Tại sao dùng Two Pointers thay vì Hash Map?
// → Vì mảng ĐÃ SORTED → Two Pointers O(1) space, Hash Map O(n) space`}</CodeBlock>

        {/* ───────── BÀI 2 ───────── */}
        <Heading2>Bài 2: Valid Palindrome (LeetCode #125)</Heading2>

        <Heading3>Đề bài</Heading3>
        <Paragraph>
            Kiểm tra xem một chuỗi có phải là <Highlight>palindrome</Highlight> (đọc xuôi ngược giống nhau) hay không,
            chỉ xét ký tự chữ cái và số, không phân biệt hoa thường.
        </Paragraph>

        <Heading3>Giải pháp với Two Pointers</Heading3>
        <div className="my-4 space-y-2 text-sm text-gray-600 dark:text-slate-300">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">1.</span>
                <span>Đặt <InlineCode>left</InlineCode> ở đầu chuỗi, <InlineCode>right</InlineCode> ở cuối chuỗi.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">2.</span>
                <span>Bỏ qua các ký tự không phải chữ/số (dùng regex hoặc helper function).</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">3.</span>
                <span>So sánh ký tự tại <InlineCode>left</InlineCode> và <InlineCode>right</InlineCode> → khác nhau → không phải palindrome.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">4.</span>
                <span>Giống nhau → tiếp tục: <InlineCode>left++</InlineCode>, <InlineCode>right--</InlineCode> cho đến khi gặp nhau.</span>
            </div>
        </div>

        <CodeBlock title="valid-palindrome.js">{`// LeetCode #125: Valid Palindrome — O(n) time, O(1) space
function isPalindrome(s) {
    // Bước 0: Chuẩn hóa — chỉ giữ chữ và số, chuyển thành chữ thường
    s = s.toLowerCase().replace(/[^a-z0-9]/g, '')

    let left = 0                    // Con trỏ đầu
    let right = s.length - 1        // Con trỏ cuối

    while (left < right) {
        // So sánh ký tự hai đầu
        if (s[left] !== s[right]) {
            return false            // Khác nhau → không phải palindrome
        }
        left++                      // Di chuyển vào trong
        right--
    }

    return true                     // Tất cả cặp đều khớp!
}

// Ví dụ: s = "A man, a plan, a canal: Panama"
// Sau chuẩn hóa: "amanaplanacanalpanama"
// left=0 'a', right=19 'a' → ✓ → left=1, right=18
// left=1 'm', right=18 'm' → ✓ → left=2, right=17
// ... tất cả đều khớp → return true ✓

// Ví dụ sai: s = "race a car" → "raceacar"
// left=0 'r', right=7 'r' → ✓
// left=1 'a', right=6 'a' → ✓
// left=2 'c', right=5 'c' → ✓
// left=3 'e', right=4 'a' → ✗ → return false ✓`}</CodeBlock>

        {/* ───────── BÀI 3 ───────── */}
        <Heading2>Bài 3: Container With Most Water (LeetCode #11)</Heading2>

        <Heading3>Đề bài</Heading3>
        <Paragraph>
            Cho một mảng <InlineCode>height</InlineCode> trong đó <InlineCode>height[i]</InlineCode> là chiều cao của cột tại vị trí i.
            Tìm hai cột tạo thành <Highlight>container chứa nhiều nước nhất</Highlight>.
        </Paragraph>

        <Heading3>Giải pháp với Two Pointers</Heading3>
        <div className="my-4 space-y-2 text-sm text-gray-600 dark:text-slate-300">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">1.</span>
                <span>Đặt <InlineCode>left</InlineCode> ở đầu, <InlineCode>right</InlineCode> ở cuối → container rộng nhất.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">2.</span>
                <span>Diện tích = <InlineCode>min(height[left], height[right]) × (right - left)</InlineCode>.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">3.</span>
                <span>Di chuyển con trỏ có chiều cao <Highlight>thấp hơn</Highlight> → hy vọng tìm cột cao hơn để tăng diện tích.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">4.</span>
                <span>Lưu diện tích lớn nhất gặp được.</span>
            </div>
        </div>

        <CodeBlock title="container-with-most-water.js">{`// LeetCode #11: Container With Most Water — O(n) time, O(1) space
function maxArea(height) {
    let left = 0                        // Con trỏ trái
    let right = height.length - 1       // Con trỏ phải
    let maxWater = 0                    // Diện tích lớn nhất

    while (left < right) {
        // Tính chiều cao giới hạn (cột thấp hơn quyết định)
        const h = Math.min(height[left], height[right])
        // Tính chiều rộng
        const w = right - left
        // Tính diện tích và cập nhật max
        const area = h * w
        maxWater = Math.max(maxWater, area)

        // Di chuyển con trỏ có chiều cao thấp hơn
        // Vì giữ cột thấp không thể tăng diện tích
        if (height[left] < height[right]) {
            left++                      // Cột trái thấp hơn → di chuyển left
        } else {
            right--                     // Cột phải thấp hơn → di chuyển right
        }
    }

    return maxWater
}

// Ví dụ: height = [1, 8, 6, 2, 5, 4, 8, 3, 7]
// left=0(h=1), right=8(h=7): area = min(1,7)*8 = 8, max=8
//   → height[0]=1 < height[8]=7 → left++
// left=1(h=8), right=8(h=7): area = min(8,7)*7 = 49, max=49
//   → height[8]=7 < height[1]=8 → right--
// left=1(h=8), right=7(h=3): area = min(8,3)*6 = 18, max=49
//   → height[7]=3 < height[1]=8 → right--
// ... tiếp tục → max = 49 ✓`}</CodeBlock>

        {/* ───────── BÀI 4: MERGE ───────── */}
        <Heading2>Bài 4: Merge hai mảng đã sắp xếp (LeetCode #88)</Heading2>

        <Heading3>Đề bài</Heading3>
        <Paragraph>
            Cho hai mảng <InlineCode>nums1</InlineCode> và <InlineCode>nums2</InlineCode> đã sắp xếp.
            Gộp <InlineCode>nums2</InlineCode> vào <InlineCode>nums1</InlineCode> (nums1 có đủ chỗ trống ở cuối).
            Trong thuật toán <Highlight>Merge Sort</Highlight>, kỹ thuật Two Pointers cũng được sử dụng để hợp nhất hai mảng con.
        </Paragraph>

        <Heading3>Giải pháp</Heading3>
        <div className="my-4 space-y-2 text-sm text-gray-600 dark:text-slate-300">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">1.</span>
                <span>Sử dụng hai con trỏ <InlineCode>p1</InlineCode> và <InlineCode>p2</InlineCode> bắt đầu từ <Highlight>cuối</Highlight> phần tử hợp lệ của mỗi mảng.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">2.</span>
                <span>So sánh phần tử hiện tại của hai mảng, đưa phần tử <Highlight>lớn hơn</Highlight> vào cuối nums1.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">3.</span>
                <span>Tiếp tục cho đến khi duyệt hết, sau đó sao chép các phần tử còn lại của nums2 (nếu có).</span>
            </div>
        </div>

        <CodeBlock title="merge-sorted-array.js">{`// LeetCode #88: Merge Sorted Array — O(m+n) time, O(1) space
function merge(nums1, m, nums2, n) {
    let p1 = m - 1          // Con trỏ cuối phần hợp lệ của nums1
    let p2 = n - 1          // Con trỏ cuối nums2
    let p = m + n - 1       // Con trỏ vị trí ghi vào cuối nums1

    // Merge từ cuối → đầu (tránh ghi đè phần tử chưa xét)
    while (p1 >= 0 && p2 >= 0) {
        if (nums1[p1] > nums2[p2]) {
            // nums1[p1] lớn hơn → đặt vào cuối
            nums1[p] = nums1[p1]
            p1--
        } else {
            // nums2[p2] lớn hơn hoặc bằng → đặt vào cuối
            nums1[p] = nums2[p2]
            p2--
        }
        p--
    }

    // Copy phần còn lại của nums2 (nếu có)
    // Không cần copy nums1 vì nó đã ở đúng vị trí
    while (p2 >= 0) {
        nums1[p] = nums2[p2]
        p2--
        p--
    }
}

// Ví dụ: nums1 = [1,2,3,0,0,0], m=3, nums2 = [2,5,6], n=3
// p1=2(3), p2=2(6), p=5: 3<6 → nums1[5]=6, p2=1, p=4
// p1=2(3), p2=1(5), p=4: 3<5 → nums1[4]=5, p2=0, p=3
// p1=2(3), p2=0(2), p=3: 3>2 → nums1[3]=3, p1=1, p=2
// p1=1(2), p2=0(2), p=2: 2=2 → nums1[2]=2, p2=-1, p=1
// → nums1 = [1, 2, 2, 3, 5, 6] ✓`}</CodeBlock>

        <Callout type="warning">
            Two Pointers chỉ hoạt động tốt khi mảng <InlineCode>đã sorted</InlineCode> hoặc bài toán cho phép di chuyển pointer một chiều.
            Nếu mảng chưa sorted, cân nhắc <InlineCode>Hash Map</InlineCode> thay thế.
        </Callout>

        {/* ───────── BÀI 5: REMOVE DUPLICATES ───────── */}
        <Heading2>Bài 5: Remove Duplicates from Sorted Array (LeetCode #26)</Heading2>

        <Heading3>Đề bài</Heading3>
        <Paragraph>
            Cho mảng sorted <InlineCode>nums</InlineCode>, loại bỏ <Highlight>các phần tử trùng lặp in-place</Highlight>.
            Trả về số lượng phần tử unique. Không dùng mảng phụ.
        </Paragraph>

        <CodeBlock title="remove-duplicates.js">{`// LeetCode #26: Remove Duplicates — O(n) time, O(1) space
function removeDuplicates(nums) {
    let slow = 0                    // Vị trí ghi phần tử unique tiếp theo

    for (let fast = 1; fast < nums.length; fast++) {
        if (nums[fast] !== nums[slow]) {
            slow++                  // Tìm thấy phần tử mới → ghi vào vị trí tiếp
            nums[slow] = nums[fast]
        }
    }

    return slow + 1                 // Số phần tử unique
}

// Ví dụ: nums = [1, 1, 2]
// fast=1: nums[1]=1 === nums[0]=1 → skip
// fast=2: nums[2]=2 !== nums[0]=1 → slow=1, nums[1]=2
// → nums = [1, 2, _], return 2 ✓`}</CodeBlock>

        {/* ───────── BÀI 6: MOVE ZEROES ───────── */}
        <Heading2>Bài 6: Move Zeroes (LeetCode #283)</Heading2>

        <Heading3>Đề bài</Heading3>
        <Paragraph>
            Di chuyển tất cả <InlineCode>0</InlineCode> về cuối mảng, giữ nguyên thứ tự các phần tử khác.
            Thực hiện <Highlight>in-place</Highlight>.
        </Paragraph>

        <CodeBlock title="move-zeroes.js">{`// LeetCode #283: Move Zeroes — O(n) time, O(1) space
function moveZeroes(nums) {
    let slow = 0                    // Vị trí ghi phần tử != 0

    for (let fast = 0; fast < nums.length; fast++) {
        if (nums[fast] !== 0) {
            // Swap: đưa phần tử != 0 về vị trí slow
            [nums[slow], nums[fast]] = [nums[fast], nums[slow]]
            slow++
        }
    }
}

// Ví dụ: nums = [0, 1, 0, 3, 12]
// fast=0: 0 → skip
// fast=1: 1 → swap(0,1) → [1,0,0,3,12], slow=1
// fast=2: 0 → skip
// fast=3: 3 → swap(1,3) → [1,3,0,0,12], slow=2
// fast=4: 12 → swap(2,4) → [1,3,12,0,0], slow=3 ✓`}</CodeBlock>

        {/* ───────── BÀI 7: REVERSE STRING ───────── */}
        <Heading2>Bài 7: Reverse String (LeetCode #344)</Heading2>

        <Heading3>Đề bài</Heading3>
        <Paragraph>
            Đảo ngược mảng ký tự <Highlight>in-place</Highlight> với O(1) extra memory.
        </Paragraph>

        <CodeBlock title="reverse-string.js">{`// LeetCode #344: Reverse String — O(n) time, O(1) space
function reverseString(s) {
    let left = 0, right = s.length - 1

    while (left < right) {
        [s[left], s[right]] = [s[right], s[left]]  // Swap hai đầu
        left++
        right--
    }
}

// Ví dụ: s = ['h','e','l','l','o']
// swap(0,4): ['o','e','l','l','h']
// swap(1,3): ['o','l','l','e','h']
// left=2 === right=2 → done → ['o','l','l','e','h'] ✓`}</CodeBlock>

        {/* ───────── BÀI 8: SQUARES OF A SORTED ARRAY ───────── */}
        <Heading2>Bài 8: Squares of a Sorted Array (LeetCode #977)</Heading2>

        <Heading3>Đề bài</Heading3>
        <Paragraph>
            Cho mảng sorted (có thể số âm), trả về <Highlight>mảng bình phương đã sorted</Highlight>.
        </Paragraph>

        <CodeBlock title="sorted-squares.js">{`// LeetCode #977: Squares of a Sorted Array — O(n) time
function sortedSquares(nums) {
    const result = new Array(nums.length)
    let left = 0, right = nums.length - 1
    let pos = right                         // Ghi từ cuối (giá trị lớn nhất)

    while (left <= right) {
        const lSq = nums[left] ** 2
        const rSq = nums[right] ** 2

        if (lSq > rSq) {
            result[pos] = lSq               // Số âm lớn hơn → lấy bên trái
            left++
        } else {
            result[pos] = rSq               // Số dương lớn hơn → lấy bên phải
            right--
        }
        pos--
    }

    return result
}

// Ví dụ: nums = [-4, -1, 0, 3, 10]
// left=0(-4²=16), right=4(10²=100): 16<100 → result[4]=100, right--
// left=0(-4²=16), right=3(3²=9): 16>9 → result[3]=16, left++
// left=1(-1²=1), right=3(3²=9): 1<9 → result[2]=9, right--
// → [0, 1, 9, 16, 100] ✓`}</CodeBlock>

        {/* ───────── BÀI 9: 3SUM ───────── */}
        <Heading2>Bài 9: 3Sum (LeetCode #15)</Heading2>

        <Heading3>Đề bài</Heading3>
        <Paragraph>
            Tìm tất cả bộ ba <InlineCode>[nums[i], nums[j], nums[k]]</InlineCode> sao cho
            <Highlight>tổng bằng 0</Highlight>. Kết quả không chứa bộ ba trùng lặp.
        </Paragraph>

        <CodeBlock title="three-sum.js">{`// LeetCode #15: 3Sum — O(n²) time, O(1) space
function threeSum(nums) {
    nums.sort((a, b) => a - b)              // Sort để dùng Two Pointers
    const result = []

    for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue  // Skip trùng

        let left = i + 1, right = nums.length - 1

        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right]

            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]])
                while (left < right && nums[left] === nums[left + 1]) left++
                while (left < right && nums[right] === nums[right - 1]) right--
                left++; right--
            } else if (sum < 0) {
                left++                      // Tổng nhỏ → tăng left
            } else {
                right--                     // Tổng lớn → giảm right
            }
        }
    }

    return result
}

// Ví dụ: nums = [-1, 0, 1, 2, -1, -4]
// Sorted: [-4, -1, -1, 0, 1, 2]
// i=0(-4): left=1, right=5 → -4+(-1)+2=-3<0 → left++ ...
// i=1(-1): left=2, right=5 → -1+(-1)+2=0 → found! [-1,-1,2]
//          left=3, right=4 → -1+0+1=0 → found! [-1,0,1]
// → [[-1,-1,2], [-1,0,1]] ✓`}</CodeBlock>

        {/* ───────── BÀI 10: SORT COLORS ───────── */}
        <Heading2>Bài 10: Sort Colors (LeetCode #75)</Heading2>

        <Heading3>Đề bài</Heading3>
        <Paragraph>
            Sắp xếp mảng chỉ chứa 0, 1, 2 <Highlight>in-place</Highlight> trong một lần duyệt (Dutch National Flag).
        </Paragraph>

        <CodeBlock title="sort-colors.js">{`// LeetCode #75: Sort Colors — O(n) time, O(1) space
function sortColors(nums) {
    let low = 0                     // Ranh giới vùng 0
    let mid = 0                     // Con trỏ hiện tại
    let high = nums.length - 1      // Ranh giới vùng 2

    while (mid <= high) {
        if (nums[mid] === 0) {
            [nums[low], nums[mid]] = [nums[mid], nums[low]]
            low++; mid++
        } else if (nums[mid] === 1) {
            mid++                   // 1 nằm đúng vị trí giữa
        } else {
            [nums[mid], nums[high]] = [nums[high], nums[mid]]
            high--                  // Không mid++ vì cần kiểm tra phần tử swap về
        }
    }
}

// Ví dụ: nums = [2, 0, 2, 1, 1, 0]
// mid=0(2): swap(0,5) → [0,0,2,1,1,2], high=4
// mid=0(0): swap(0,0) → low=1, mid=1
// mid=1(0): swap(1,1) → low=2, mid=2
// mid=2(2): swap(2,4) → [0,0,1,1,2,2], high=3
// mid=2(1): mid=3
// mid=3(1): mid=4 > high=3 → done → [0,0,1,1,2,2] ✓`}</CodeBlock>

        {/* ───────── BÀI 11: LINKED LIST CYCLE II ───────── */}
        <Heading2>Bài 11: Linked List Cycle II (LeetCode #142)</Heading2>

        <Heading3>Đề bài</Heading3>
        <Paragraph>
            Cho linked list, tìm <Highlight>node bắt đầu cycle</Highlight>. Nếu không có cycle, return null.
        </Paragraph>

        <CodeBlock title="linked-list-cycle.js">{`// LeetCode #142: Linked List Cycle II — O(n) time, O(1) space
function detectCycle(head) {
    let slow = head, fast = head

    // Bước 1: Tìm điểm gặp nhau (Floyd's algorithm)
    while (fast && fast.next) {
        slow = slow.next
        fast = fast.next.next
        if (slow === fast) break
    }

    // Không có cycle
    if (!fast || !fast.next) return null

    // Bước 2: Tìm điểm bắt đầu cycle
    // Di chuyển slow về head, giữ fast tại điểm gặp
    // Cả hai đi 1 bước → gặp nhau tại cycle start
    slow = head
    while (slow !== fast) {
        slow = slow.next
        fast = fast.next
    }

    return slow                     // Điểm bắt đầu cycle
}

// Key insight (Floyd's Tortoise & Hare):
// Khi slow và fast gặp nhau: khoảng cách từ head đến cycle start
// = khoảng cách từ meeting point đến cycle start (đi theo cycle)`}</CodeBlock>

        {/* ───────── BÀI 12: PRODUCT OF ARRAY EXCEPT SELF ───────── */}
        <Heading2>Bài 12: Product of Array Except Self (LeetCode #238)</Heading2>

        <Heading3>Đề bài</Heading3>
        <Paragraph>
            Cho mảng <InlineCode>nums</InlineCode>, trả về mảng <InlineCode>result</InlineCode> trong đó
            <InlineCode>result[i]</InlineCode> = <Highlight>tích tất cả phần tử trừ nums[i]</Highlight>. Không dùng phép chia.
        </Paragraph>

        <CodeBlock title="product-except-self.js">{`// LeetCode #238: Product of Array Except Self — O(n) time, O(1) extra space
function productExceptSelf(nums) {
    const n = nums.length
    const result = new Array(n).fill(1)

    // Pass 1 (→): tích tất cả phần tử BÊN TRÁI
    let leftProduct = 1
    for (let i = 0; i < n; i++) {
        result[i] = leftProduct
        leftProduct *= nums[i]
    }

    // Pass 2 (←): nhân thêm tích tất cả phần tử BÊN PHẢI
    let rightProduct = 1
    for (let i = n - 1; i >= 0; i--) {
        result[i] *= rightProduct
        rightProduct *= nums[i]
    }

    return result
}

// Ví dụ: nums = [1, 2, 3, 4]
// Pass 1 (→): result = [1, 1, 2, 6] (leftProduct tích lũy)
// Pass 2 (←): result = [24, 12, 8, 6] (nhân thêm rightProduct)
// Kiểm tra: result[0] = 2*3*4=24, result[1] = 1*3*4=12 ✓`}</CodeBlock>

        <Heading2>Tổng kết các biến thể Two Pointers</Heading2>

        <div className="my-4 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
                <thead>
                    <tr className="border-b border-gray-200 dark:border-white/10">
                        <th className="text-left p-3 text-gray-500 dark:text-slate-400 font-medium">Biến thể</th>
                        <th className="text-left p-3 text-gray-500 dark:text-slate-400 font-medium">Cách hoạt động</th>
                        <th className="text-left p-3 text-gray-500 dark:text-slate-400 font-medium">Ví dụ</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-slate-300">
                    <tr className="border-b border-gray-100 dark:border-white/5"><td className="p-3">Opposite direction</td><td className="p-3">left → ← right</td><td className="p-3">Two Sum II, Palindrome</td></tr>
                    <tr className="border-b border-gray-100 dark:border-white/5"><td className="p-3">Same direction (fast/slow)</td><td className="p-3">slow → fast →</td><td className="p-3">Remove Duplicates, Linked List Cycle</td></tr>
                    <tr><td className="p-3">Two arrays</td><td className="p-3">p1 trên arr1, p2 trên arr2</td><td className="p-3">Merge Sorted Array</td></tr>
                </tbody>
            </table>
        </div>
    </>
)

const enContent = (
    <>
        <Paragraph>
            <Highlight>Two Pointers</Highlight> is a technique where we use two pointers to traverse a data structure
            like an array or linked list. The two pointers can:
        </Paragraph>

        <div className="my-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-4">
                <div className="text-blue-400 font-bold text-sm mb-2">↔️ Opposite Direction</div>
                <ul className="text-gray-500 dark:text-slate-400 text-xs space-y-1">
                    <li>• left at start, right at end</li>
                    <li>• Find pairs, palindrome</li>
                    <li>• Container With Most Water</li>
                </ul>
            </div>
            <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-4">
                <div className="text-green-400 font-bold text-sm mb-2">→→ Same Direction</div>
                <ul className="text-gray-500 dark:text-slate-400 text-xs space-y-1">
                    <li>• Fast & slow pointer</li>
                    <li>• Remove duplicates</li>
                    <li>• Linked list cycle</li>
                </ul>
            </div>
            <div className="rounded-xl bg-purple-500/10 border border-purple-500/20 p-4">
                <div className="text-purple-400 font-bold text-sm mb-2">🔀 Merge Two Arrays</div>
                <ul className="text-gray-500 dark:text-slate-400 text-xs space-y-1">
                    <li>• Two pointers on 2 arrays</li>
                    <li>• Merge Sort</li>
                    <li>• Merge Sorted Arrays</li>
                </ul>
            </div>
        </div>

        <Callout type="info">
            Two Pointers typically reduces O(n²) to <InlineCode>O(n)</InlineCode>. Common prerequisite:
            array is <Highlight>sorted</Highlight> or the problem allows one-directional pointer movement.
        </Callout>

        <Heading2>How to Use Two Pointers</Heading2>

        <CodeBlock title="two-pointers-templates.js">{`// ═══ TEMPLATE 1: Opposite Direction ═══
// Use when: sorted array, find pairs, palindrome
let left = 0, right = arr.length - 1
while (left < right) {
    const sum = arr[left] + arr[right]
    if (sum === target) return [left, right]
    else if (sum < target) left++      // Need larger sum → move left
    else right--                        // Need smaller sum → move right
}

// ═══ TEMPLATE 2: Same Direction (Fast & Slow) ═══
// Use when: remove duplicates, partition
let slow = 0
for (let fast = 0; fast < arr.length; fast++) {
    if (arr[fast] !== arr[slow]) {     // New element (not duplicate)
        slow++
        arr[slow] = arr[fast]          // Write to next position
    }
}
// Result: arr[0..slow] is array with duplicates removed

// ═══ TEMPLATE 3: Merge Two Sorted Arrays ═══
let i = 0, j = 0, result = []
while (i < a.length && j < b.length) {
    if (a[i] <= b[j]) result.push(a[i++])
    else result.push(b[j++])
}
// Add remaining elements
result.push(...a.slice(i), ...b.slice(j))`}</CodeBlock>

        <Heading2>When to Use Two Pointers?</Heading2>

        <div className="my-4 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
                <thead>
                    <tr className="border-b border-gray-200 dark:border-white/10">
                        <th className="text-left p-3 text-gray-500 dark:text-slate-400 font-medium">Problem Signal</th>
                        <th className="text-left p-3 text-gray-500 dark:text-slate-400 font-medium">LeetCode Example</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-slate-300">
                    <tr className="border-b border-gray-100 dark:border-white/5"><td className="p-3">Sorted array + find pair</td><td className="p-3">Two Sum II (#167)</td></tr>
                    <tr className="border-b border-gray-100 dark:border-white/5"><td className="p-3">Compare from both ends</td><td className="p-3">Valid Palindrome (#125)</td></tr>
                    <tr className="border-b border-gray-100 dark:border-white/5"><td className="p-3">Remove duplicates in-place</td><td className="p-3">Remove Duplicates (#26)</td></tr>
                    <tr className="border-b border-gray-100 dark:border-white/5"><td className="p-3">Max container area</td><td className="p-3">Container With Most Water (#11)</td></tr>
                    <tr><td className="p-3">Merge two sorted arrays</td><td className="p-3">Merge Sorted Array (#88)</td></tr>
                </tbody>
            </table>
        </div>

        <Heading2>Problem 1: Two Sum II — Sorted Array (LeetCode #167)</Heading2>

        <Heading3>Problem</Heading3>
        <Paragraph>
            Given a <Highlight>sorted</Highlight> array <InlineCode>numbers</InlineCode> and a <InlineCode>target</InlineCode>,
            find two numbers that sum to target. Return 1-indexed positions.
        </Paragraph>

        <Heading3>Two Pointers Solution</Heading3>
        <div className="my-4 space-y-2 text-sm text-gray-600 dark:text-slate-300">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">1.</span>
                <span>Place <InlineCode>left</InlineCode> at start, <InlineCode>right</InlineCode> at end.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">2.</span>
                <span>If <InlineCode>sum {'>'} target</InlineCode> → too large → decrease <InlineCode>right</InlineCode>.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">3.</span>
                <span>If <InlineCode>sum {'<'} target</InlineCode> → too small → increase <InlineCode>left</InlineCode>.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">4.</span>
                <span>If <InlineCode>sum === target</InlineCode> → found!</span>
            </div>
        </div>

        <CodeBlock title="two-sum-ii.js">{`// LeetCode #167: Two Sum II — O(n) time, O(1) space
function twoSum(numbers, target) {
    let left = 0, right = numbers.length - 1

    while (left < right) {
        const sum = numbers[left] + numbers[right]
        if (sum === target) return [left + 1, right + 1]
        else if (sum > target) right--   // Too large → decrease
        else left++                       // Too small → increase
    }
}

// Walkthrough: numbers = [2, 7, 11, 15], target = 9
// left=0, right=3: 2+15=17 > 9 → right--
// left=0, right=2: 2+11=13 > 9 → right--
// left=0, right=1: 2+7=9 === 9 → return [1, 2] ✓`}</CodeBlock>

        <Heading2>Problem 2: Valid Palindrome (LeetCode #125)</Heading2>

        <Heading3>Problem</Heading3>
        <Paragraph>
            Check if a string is a <Highlight>palindrome</Highlight>, considering only alphanumeric characters and ignoring case.
        </Paragraph>

        <Heading3>Two Pointers Solution</Heading3>
        <div className="my-4 space-y-2 text-sm text-gray-600 dark:text-slate-300">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">1.</span>
                <span>Place <InlineCode>left</InlineCode> at start, <InlineCode>right</InlineCode> at end.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">2.</span>
                <span>Skip non-alphanumeric characters.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">3.</span>
                <span>Compare characters at both pointers → different = not palindrome.</span>
            </div>
        </div>

        <CodeBlock title="valid-palindrome.js">{`// LeetCode #125: Valid Palindrome — O(n) time, O(1) space
function isPalindrome(s) {
    s = s.toLowerCase().replace(/[^a-z0-9]/g, '')
    let left = 0, right = s.length - 1

    while (left < right) {
        if (s[left] !== s[right]) return false
        left++; right--
    }
    return true
}

// Walkthrough: "A man, a plan, a canal: Panama"
// After cleanup: "amanaplanacanalpanama"
// left=0 'a' vs right=19 'a' → ✓
// left=1 'm' vs right=18 'm' → ✓
// ... all match → return true ✓`}</CodeBlock>

        <Heading2>Problem 3: Container With Most Water (LeetCode #11)</Heading2>

        <Heading3>Problem</Heading3>
        <Paragraph>
            Given array <InlineCode>height</InlineCode> where <InlineCode>height[i]</InlineCode> is pillar height at position i,
            find two pillars forming the <Highlight>container holding the most water</Highlight>.
        </Paragraph>

        <Heading3>Two Pointers Solution</Heading3>
        <div className="my-4 space-y-2 text-sm text-gray-600 dark:text-slate-300">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">1.</span>
                <span>Start with widest container: <InlineCode>left=0, right=end</InlineCode>.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">2.</span>
                <span>Area = <InlineCode>min(height[left], height[right]) × (right - left)</InlineCode>.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">3.</span>
                <span>Move the <Highlight>shorter</Highlight> pointer → hope to find a taller pillar.</span>
            </div>
        </div>

        <CodeBlock title="container-with-most-water.js">{`// LeetCode #11: Container With Most Water — O(n) time, O(1) space
function maxArea(height) {
    let left = 0, right = height.length - 1, maxWater = 0

    while (left < right) {
        const h = Math.min(height[left], height[right])
        const area = h * (right - left)
        maxWater = Math.max(maxWater, area)

        // Move shorter pointer (keeping shorter can't increase area)
        if (height[left] < height[right]) left++
        else right--
    }
    return maxWater
}

// Walkthrough: height = [1, 8, 6, 2, 5, 4, 8, 3, 7]
// left=0(1), right=8(7): area=1*8=8, max=8 → left++
// left=1(8), right=8(7): area=7*7=49, max=49 → right--
// ... continues → max = 49 ✓`}</CodeBlock>

        <Heading2>Problem 4: Merge Sorted Array (LeetCode #88)</Heading2>

        <Heading3>Problem</Heading3>
        <Paragraph>
            Given two sorted arrays <InlineCode>nums1</InlineCode> and <InlineCode>nums2</InlineCode>,
            merge <InlineCode>nums2</InlineCode> into <InlineCode>nums1</InlineCode> in-place.
            This technique is also used in <Highlight>Merge Sort</Highlight>.
        </Paragraph>

        <Heading3>Solution</Heading3>
        <div className="my-4 space-y-2 text-sm text-gray-600 dark:text-slate-300">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">1.</span>
                <span>Use two pointers starting from the <Highlight>end</Highlight> of valid elements.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">2.</span>
                <span>Compare and place the <Highlight>larger</Highlight> element at the end of nums1.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">3.</span>
                <span>Copy remaining elements from nums2 if any.</span>
            </div>
        </div>

        <CodeBlock title="merge-sorted-array.js">{`// LeetCode #88: Merge Sorted Array — O(m+n) time, O(1) space
function merge(nums1, m, nums2, n) {
    let p1 = m - 1, p2 = n - 1, p = m + n - 1

    // Merge from end → start (avoid overwriting)
    while (p1 >= 0 && p2 >= 0) {
        if (nums1[p1] > nums2[p2]) {
            nums1[p] = nums1[p1]; p1--
        } else {
            nums1[p] = nums2[p2]; p2--
        }
        p--
    }
    // Copy remaining nums2
    while (p2 >= 0) { nums1[p] = nums2[p2]; p2--; p-- }
}

// Walkthrough: nums1=[1,2,3,0,0,0], m=3, nums2=[2,5,6], n=3
// p1=2(3), p2=2(6): 3<6 → nums1[5]=6
// p1=2(3), p2=1(5): 3<5 → nums1[4]=5
// p1=2(3), p2=0(2): 3>2 → nums1[3]=3
// p1=1(2), p2=0(2): 2=2 → nums1[2]=2
// → [1, 2, 2, 3, 5, 6] ✓`}</CodeBlock>

        <Heading2>Problem 5: Remove Duplicates from Sorted Array (LeetCode #26)</Heading2>

        <Heading3>Problem</Heading3>
        <Paragraph>
            Given a sorted array <InlineCode>nums</InlineCode>, remove <Highlight>duplicates in-place</Highlight>. Return the number of unique elements.
        </Paragraph>

        <CodeBlock title="remove-duplicates.js">{`// LeetCode #26: Remove Duplicates — O(n) time, O(1) space
function removeDuplicates(nums) {
    let slow = 0

    for (let fast = 1; fast < nums.length; fast++) {
        if (nums[fast] !== nums[slow]) {
            slow++
            nums[slow] = nums[fast]
        }
    }
    return slow + 1
}

// Example: nums = [1, 1, 2] → return 2, nums = [1, 2, _] ✓`}</CodeBlock>

        <Heading2>Problem 6: Move Zeroes (LeetCode #283)</Heading2>

        <Heading3>Problem</Heading3>
        <Paragraph>
            Move all <InlineCode>0</InlineCode>s to end, keep order of non-zero elements. <Highlight>In-place</Highlight>.
        </Paragraph>

        <CodeBlock title="move-zeroes.js">{`// LeetCode #283: Move Zeroes — O(n) time, O(1) space
function moveZeroes(nums) {
    let slow = 0
    for (let fast = 0; fast < nums.length; fast++) {
        if (nums[fast] !== 0) {
            [nums[slow], nums[fast]] = [nums[fast], nums[slow]]
            slow++
        }
    }
}

// Example: [0, 1, 0, 3, 12] → [1, 3, 12, 0, 0] ✓`}</CodeBlock>

        <Heading2>Problem 7: Reverse String (LeetCode #344)</Heading2>

        <Heading3>Problem</Heading3>
        <Paragraph>
            Reverse a character array <Highlight>in-place</Highlight> with O(1) extra memory.
        </Paragraph>

        <CodeBlock title="reverse-string.js">{`// LeetCode #344: Reverse String — O(n) time, O(1) space
function reverseString(s) {
    let left = 0, right = s.length - 1
    while (left < right) {
        [s[left], s[right]] = [s[right], s[left]]
        left++; right--
    }
}

// Example: ['h','e','l','l','o'] → ['o','l','l','e','h'] ✓`}</CodeBlock>

        <Heading2>Problem 8: Squares of a Sorted Array (LeetCode #977)</Heading2>

        <Heading3>Problem</Heading3>
        <Paragraph>
            Given a sorted array (may contain negatives), return <Highlight>sorted array of squares</Highlight>.
        </Paragraph>

        <CodeBlock title="sorted-squares.js">{`// LeetCode #977: Squares of a Sorted Array — O(n) time
function sortedSquares(nums) {
    const result = new Array(nums.length)
    let left = 0, right = nums.length - 1, pos = right

    while (left <= right) {
        const lSq = nums[left] ** 2, rSq = nums[right] ** 2
        if (lSq > rSq) { result[pos] = lSq; left++ }
        else { result[pos] = rSq; right-- }
        pos--
    }
    return result
}

// Example: [-4, -1, 0, 3, 10] → [0, 1, 9, 16, 100] ✓`}</CodeBlock>

        <Heading2>Problem 9: 3Sum (LeetCode #15)</Heading2>

        <Heading3>Problem</Heading3>
        <Paragraph>
            Find all triplets that <Highlight>sum to zero</Highlight>. No duplicate triplets.
        </Paragraph>

        <CodeBlock title="three-sum.js">{`// LeetCode #15: 3Sum — O(n²) time, O(1) space
function threeSum(nums) {
    nums.sort((a, b) => a - b)
    const result = []

    for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue
        let left = i + 1, right = nums.length - 1

        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right]
            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]])
                while (left < right && nums[left] === nums[left + 1]) left++
                while (left < right && nums[right] === nums[right - 1]) right--
                left++; right--
            } else if (sum < 0) left++
            else right--
        }
    }
    return result
}

// Example: [-1,0,1,2,-1,-4] → [[-1,-1,2], [-1,0,1]] ✓`}</CodeBlock>

        <Heading2>Problem 10: Sort Colors (LeetCode #75)</Heading2>

        <Heading3>Problem</Heading3>
        <Paragraph>
            Sort array of 0, 1, 2 <Highlight>in-place</Highlight> in one pass (Dutch National Flag).
        </Paragraph>

        <CodeBlock title="sort-colors.js">{`// LeetCode #75: Sort Colors — O(n) time, O(1) space
function sortColors(nums) {
    let low = 0, mid = 0, high = nums.length - 1

    while (mid <= high) {
        if (nums[mid] === 0) {
            [nums[low], nums[mid]] = [nums[mid], nums[low]]
            low++; mid++
        } else if (nums[mid] === 1) {
            mid++
        } else {
            [nums[mid], nums[high]] = [nums[high], nums[mid]]
            high--
        }
    }
}

// Example: [2, 0, 2, 1, 1, 0] → [0, 0, 1, 1, 2, 2] ✓`}</CodeBlock>

        <Heading2>Problem 11: Linked List Cycle II (LeetCode #142)</Heading2>

        <Heading3>Problem</Heading3>
        <Paragraph>
            Find the <Highlight>node where the cycle begins</Highlight>. Return null if no cycle.
        </Paragraph>

        <CodeBlock title="linked-list-cycle.js">{`// LeetCode #142: Linked List Cycle II — O(n) time, O(1) space
function detectCycle(head) {
    let slow = head, fast = head

    while (fast && fast.next) {
        slow = slow.next
        fast = fast.next.next
        if (slow === fast) break
    }

    if (!fast || !fast.next) return null

    slow = head
    while (slow !== fast) {
        slow = slow.next
        fast = fast.next
    }
    return slow
}

// Floyd's algorithm: distance head→cycle start = meeting point→cycle start`}</CodeBlock>

        <Heading2>Problem 12: Product of Array Except Self (LeetCode #238)</Heading2>

        <Heading3>Problem</Heading3>
        <Paragraph>
            Return array where <InlineCode>result[i]</InlineCode> = <Highlight>product of all elements except nums[i]</Highlight>. No division.
        </Paragraph>

        <CodeBlock title="product-except-self.js">{`// LeetCode #238: Product of Array Except Self — O(n) time, O(1) extra space
function productExceptSelf(nums) {
    const n = nums.length, result = new Array(n).fill(1)

    let left = 1
    for (let i = 0; i < n; i++) { result[i] = left; left *= nums[i] }

    let right = 1
    for (let i = n - 1; i >= 0; i--) { result[i] *= right; right *= nums[i] }

    return result
}

// Example: [1, 2, 3, 4] → [24, 12, 8, 6] ✓`}</CodeBlock>

        <Heading2>Two Pointers Variants Summary</Heading2>

        <div className="my-4 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
                <thead>
                    <tr className="border-b border-gray-200 dark:border-white/10">
                        <th className="text-left p-3 text-gray-500 dark:text-slate-400 font-medium">Variant</th>
                        <th className="text-left p-3 text-gray-500 dark:text-slate-400 font-medium">Movement</th>
                        <th className="text-left p-3 text-gray-500 dark:text-slate-400 font-medium">Examples</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-slate-300">
                    <tr className="border-b border-gray-100 dark:border-white/5"><td className="p-3">Opposite direction</td><td className="p-3">left → ← right</td><td className="p-3">Two Sum II, Palindrome</td></tr>
                    <tr className="border-b border-gray-100 dark:border-white/5"><td className="p-3">Same direction</td><td className="p-3">slow → fast →</td><td className="p-3">Remove Duplicates, Cycle Detection</td></tr>
                    <tr><td className="p-3">Two arrays</td><td className="p-3">p1 on arr1, p2 on arr2</td><td className="p-3">Merge Sorted Array</td></tr>
                </tbody>
            </table>
        </div>

        <Callout type="warning">
            Two Pointers works best when array is <InlineCode>sorted</InlineCode> or allows one-directional movement.
            For unsorted arrays, consider <InlineCode>Hash Map</InlineCode> instead.
        </Callout>
    </>
)

const twoPointersPattern: BlogPost = {
    slug: 'two-pointers-pattern',
    title: {
        vi: 'Two Pointers — Kỹ thuật hai con trỏ',
        en: 'Two Pointers — The Two Pointer Technique',
    },
    description: {
        vi: 'Giải thích chi tiết Two Pointers với các bài LeetCode: Two Sum II, Valid Palindrome, Container With Most Water, Merge Sorted Array.',
        en: 'Deep dive into Two Pointers with LeetCode: Two Sum II, Valid Palindrome, Container With Most Water, Merge Sorted Array.',
    },
    date: '2026-02-26',
    tags: ['Algorithm', 'Two Pointers', 'LeetCode'],
    emoji: '👆',
    color: '#8b5cf6',
    content: { vi: viContent, en: enContent },
}

export default twoPointersPattern
