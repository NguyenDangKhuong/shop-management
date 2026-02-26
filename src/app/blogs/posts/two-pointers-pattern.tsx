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
