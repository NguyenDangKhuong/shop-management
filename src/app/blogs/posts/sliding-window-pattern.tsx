import { BlogPost } from '../types'
import { CodeBlock, Heading2, Heading3, Paragraph, Highlight, InlineCode, Callout } from '../components/BlogComponents'

const viContent = (
    <>
        <Paragraph>
            <Highlight>Sliding Window</Highlight> là kỹ thuật duy trì một &quot;cửa sổ&quot; (khoảng liên tiếp) trên mảng hoặc chuỗi,
            và di chuyển cửa sổ này để tìm kết quả tối ưu. Thay vì duyệt lại toàn bộ mỗi lần,
            ta chỉ cần <Highlight>thêm/bớt phần tử ở biên</Highlight> → giảm từ O(n²) xuống <Highlight>O(n)</Highlight>.
        </Paragraph>

        <Callout type="info">
            Template chung: <InlineCode>right</InlineCode> mở rộng cửa sổ → kiểm tra điều kiện →
            nếu không hợp lệ, thu hẹp <InlineCode>left</InlineCode> → cập nhật kết quả tốt nhất.
        </Callout>

        <Heading2>Cách dùng Sliding Window</Heading2>

        <CodeBlock title="sliding-window-templates.js">{`// ═══ TEMPLATE 1: Fixed Size Window (size k) ═══
// Dùng khi: tìm tổng/max/min của k phần tử liên tiếp
let windowSum = 0, maxSum = -Infinity
for (let i = 0; i < arr.length; i++) {
    windowSum += arr[i]               // Thêm phần tử mới vào cửa sổ
    if (i >= k) windowSum -= arr[i-k] // Bỏ phần tử cũ ra khỏi cửa sổ
    if (i >= k-1) maxSum = Math.max(maxSum, windowSum)
}

// ═══ TEMPLATE 2: Variable Size Window ═══
// Dùng khi: tìm substring dài nhất/ngắn nhất thỏa điều kiện
let left = 0, best = 0
const map = new Map()  // Theo dõi trạng thái cửa sổ

for (let right = 0; right < arr.length; right++) {
    // 1. Mở rộng: thêm arr[right] vào cửa sổ
    map.set(arr[right], (map.get(arr[right]) || 0) + 1)

    // 2. Thu hẹp: khi cửa sổ không hợp lệ → dịch left
    while (/* điều kiện không hợp lệ */) {
        map.set(arr[left], map.get(arr[left]) - 1)
        if (map.get(arr[left]) === 0) map.delete(arr[left])
        left++
    }

    // 3. Cập nhật kết quả tốt nhất
    best = Math.max(best, right - left + 1)
}`}</CodeBlock>

        <Heading2>Khi nào dùng Sliding Window?</Heading2>

        <div className="my-4 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
                <thead>
                    <tr className="border-b border-[var(--border-primary)]">
                        <th className="text-left p-3 text-[var(--text-secondary)] font-medium">Dấu hiệu bài toán</th>
                        <th className="text-left p-3 text-[var(--text-secondary)] font-medium">Ví dụ LeetCode</th>
                    </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                    <tr className="border-b border-gray-100"><td className="p-3">Tìm substring dài nhất/ngắn nhất</td><td className="p-3">Longest Substring Without Repeating (#3)</td></tr>
                    <tr className="border-b border-gray-100"><td className="p-3">Tìm subarray có tổng = k</td><td className="p-3">Minimum Size Subarray Sum (#209)</td></tr>
                    <tr className="border-b border-gray-100"><td className="p-3">Tìm chuỗi con chứa tất cả ký tự</td><td className="p-3">Minimum Window Substring (#76)</td></tr>
                    <tr><td className="p-3">Tổng/max/min trên khoảng liên tiếp</td><td className="p-3">Max Sum Subarray of Size K</td></tr>
                </tbody>
            </table>
        </div>

        <Heading2>Hai loại Sliding Window</Heading2>

        <div className="my-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-4">
                <div className="text-blue-400 font-bold text-sm mb-2">📏 Fixed Size Window</div>
                <ul className="text-[var(--text-secondary)] text-xs space-y-1">
                    <li>• Kích thước cửa sổ cố định (k)</li>
                    <li>• Thêm phần tử mới, bỏ phần tử cũ</li>
                    <li>• VD: Tổng lớn nhất của k phần tử liên tiếp</li>
                </ul>
            </div>
            <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-4">
                <div className="text-green-400 font-bold text-sm mb-2">🔄 Variable Size Window</div>
                <ul className="text-[var(--text-secondary)] text-xs space-y-1">
                    <li>• Kích thước thay đổi theo điều kiện</li>
                    <li>• Mở rộng right, thu hẹp left</li>
                    <li>• VD: Substring dài nhất không lặp ký tự</li>
                </ul>
            </div>
        </div>

        {/* ───────── BÀI 1 ───────── */}
        <Heading2>Bài 1: Longest Substring Without Repeating Characters (LeetCode #3)</Heading2>

        <Heading3>Đề bài</Heading3>
        <Paragraph>
            Cho một chuỗi <InlineCode>s</InlineCode>, tìm độ dài <Highlight>substring dài nhất</Highlight> mà
            không có ký tự nào lặp lại.
        </Paragraph>

        <Heading3>Giải pháp với Sliding Window</Heading3>
        <div className="my-4 space-y-2 text-sm text-[var(--text-secondary)]">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">1.</span>
                <span>Dùng <InlineCode>Set</InlineCode> để lưu các ký tự trong cửa sổ hiện tại.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">2.</span>
                <span>Mở rộng cửa sổ bằng cách di chuyển <InlineCode>right</InlineCode> sang phải.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">3.</span>
                <span>Nếu ký tự tại <InlineCode>right</InlineCode> đã có trong Set → có trùng lặp → thu hẹp từ <InlineCode>left</InlineCode> cho đến khi hết trùng.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">4.</span>
                <span>Cập nhật độ dài lớn nhất: <InlineCode>maxLen = max(maxLen, right - left + 1)</InlineCode>.</span>
            </div>
        </div>

        <CodeBlock title="longest-substring.js">{`// LeetCode #3: Longest Substring Without Repeating — O(n)
function lengthOfLongestSubstring(s) {
    const set = new Set()           // Ký tự trong cửa sổ hiện tại
    let left = 0                    // Biên trái cửa sổ
    let maxLen = 0                  // Kết quả

    for (let right = 0; right < s.length; right++) {
        // Thu hẹp cửa sổ: xóa ký tự trái cho đến khi hết trùng
        while (set.has(s[right])) {
            set.delete(s[left])     // Xóa ký tự tại left
            left++                  // Thu hẹp cửa sổ
        }

        // Thêm ký tự mới vào cửa sổ
        set.add(s[right])

        // Cập nhật kết quả tốt nhất
        maxLen = Math.max(maxLen, right - left + 1)
    }

    return maxLen
}

// Ví dụ: s = "abcabcbb"
// right=0 'a': set={a}, window="a", maxLen=1
// right=1 'b': set={a,b}, window="ab", maxLen=2
// right=2 'c': set={a,b,c}, window="abc", maxLen=3
// right=3 'a': 'a' đã có! → xóa 'a', left=1
//              set={b,c,a}, window="bca", maxLen=3
// right=4 'b': 'b' đã có! → xóa 'b', left=2
//              set={c,a,b}, window="cab", maxLen=3
// right=5 'c': 'c' đã có! → xóa 'c', left=3
//              set={a,b,c}, window="abc", maxLen=3
// right=6 'b': 'b' đã có! → xóa 'a', left=4, vẫn có 'b'
//              → xóa 'b', left=5, set={c,b}, window="cb", maxLen=3
// right=7 'b': 'b' đã có! → xóa 'c', 'b', left=7
//              set={b}, maxLen=3
// → Kết quả: 3 ("abc") ✓`}</CodeBlock>

        {/* ───────── BÀI 2 ───────── */}
        <Heading2>Bài 2: Minimum Window Substring (LeetCode #76)</Heading2>

        <Heading3>Đề bài</Heading3>
        <Paragraph>
            Cho chuỗi <InlineCode>s</InlineCode> và chuỗi <InlineCode>t</InlineCode>, tìm <Highlight>substring ngắn nhất</Highlight> trong s
            chứa tất cả ký tự của t (kể cả trùng lặp).
        </Paragraph>

        <Heading3>Giải pháp với Sliding Window + Hash Map</Heading3>
        <div className="my-4 space-y-2 text-sm text-[var(--text-secondary)]">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">1.</span>
                <span>Đếm tần suất ký tự của t vào <InlineCode>need</InlineCode> Map.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">2.</span>
                <span>Mở rộng right: mỗi khi thêm ký tự, nếu ký tự đó cần thiết và đủ số lượng → tăng biến <InlineCode>formed</InlineCode>.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">3.</span>
                <span>Khi <InlineCode>formed === required</InlineCode> (đã có đủ tất cả ký tự) → thu hẹp left để tìm window nhỏ nhất.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">4.</span>
                <span>Lưu vị trí và độ dài window nhỏ nhất.</span>
            </div>
        </div>

        <CodeBlock title="minimum-window-substring.js">{`// LeetCode #76: Minimum Window Substring — O(n)
function minWindow(s, t) {
    if (t.length > s.length) return ""

    // Bước 1: Đếm ký tự cần có
    const need = new Map()
    for (const c of t) need.set(c, (need.get(c) || 0) + 1)

    const window = new Map()        // Đếm ký tự trong cửa sổ
    let formed = 0                  // Số ký tự đã đủ số lượng
    const required = need.size      // Số ký tự khác nhau cần đủ
    let result = [Infinity, 0, 0]   // [length, left, right]
    let left = 0

    for (let right = 0; right < s.length; right++) {
        // Bước 2: Mở rộng — thêm s[right] vào window
        const c = s[right]
        window.set(c, (window.get(c) || 0) + 1)

        // Kiểm tra: ký tự này đã đủ số lượng yêu cầu chưa?
        if (need.has(c) && window.get(c) === need.get(c)) {
            formed++
        }

        // Bước 3: Thu hẹp — khi đã có đủ tất cả ký tự
        while (formed === required) {
            // Cập nhật kết quả nếu window hiện tại nhỏ hơn
            if (right - left + 1 < result[0]) {
                result = [right - left + 1, left, right]
            }

            // Bỏ ký tự ở left ra khỏi window
            const d = s[left]
            window.set(d, window.get(d) - 1)
            if (need.has(d) && window.get(d) < need.get(d)) {
                formed--            // Không còn đủ ký tự d
            }
            left++
        }
    }

    return result[0] === Infinity
        ? ""
        : s.slice(result[1], result[2] + 1)
}

// Ví dụ: s = "ADOBECODEBANC", t = "ABC"
// need = {A:1, B:1, C:1}, required = 3
// Mở rộng right cho đến khi formed=3 (có đủ A,B,C)
// Window "ADOBEC" (0→5) chứa A,B,C → thu hẹp left
// ... tiếp tục tìm window nhỏ hơn
// Kết quả: "BANC" (length=4) ✓`}</CodeBlock>

        {/* ───────── BÀI 3 ───────── */}
        <Heading2>Bài 3: Maximum Sum Subarray of Size K</Heading2>

        <Heading3>Đề bài</Heading3>
        <Paragraph>
            Cho một mảng số nguyên và số <InlineCode>k</InlineCode>, tìm <Highlight>tổng lớn nhất</Highlight> của k phần tử liên tiếp.
            Đây là ví dụ kinh điển cho <Highlight>Fixed Size Sliding Window</Highlight>.
        </Paragraph>

        <Heading3>Giải pháp với Fixed Window</Heading3>
        <div className="my-4 space-y-2 text-sm text-[var(--text-secondary)]">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">1.</span>
                <span>Tính tổng k phần tử đầu tiên làm window ban đầu.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">2.</span>
                <span>Trượt window sang phải: <Highlight>thêm phần tử mới, bỏ phần tử cũ</Highlight>.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">3.</span>
                <span>Cập nhật tổng lớn nhất sau mỗi lần trượt.</span>
            </div>
        </div>

        <CodeBlock title="max-sum-subarray.js">{`// Maximum Sum Subarray of Size K — O(n)
function maxSumSubarray(nums, k) {
    // Bước 1: Tính tổng window đầu tiên (k phần tử)
    let windowSum = 0
    for (let i = 0; i < k; i++) {
        windowSum += nums[i]
    }

    let maxSum = windowSum

    // Bước 2: Trượt window từ trái sang phải
    for (let i = k; i < nums.length; i++) {
        // Thêm phần tử mới (bên phải) vào window
        windowSum += nums[i]
        // Bỏ phần tử cũ (bên trái) ra khỏi window
        windowSum -= nums[i - k]

        // Cập nhật kết quả
        maxSum = Math.max(maxSum, windowSum)
    }

    return maxSum
}

// Ví dụ: nums = [2, 1, 5, 1, 3, 2], k = 3
// Window đầu: [2,1,5] → sum = 8, max = 8
// Trượt: bỏ 2, thêm 1 → [1,5,1] → sum = 7, max = 8
// Trượt: bỏ 1, thêm 3 → [5,1,3] → sum = 9, max = 9 ✓
// Trượt: bỏ 5, thêm 2 → [1,3,2] → sum = 6, max = 9
// → Kết quả: 9 ✓`}</CodeBlock>

        <Callout type="tip">
            Mẹo nhận diện: Thấy từ khóa <InlineCode>&quot;substring&quot;</InlineCode>, <InlineCode>&quot;subarray&quot;</InlineCode>,
            <InlineCode>&quot;contiguous&quot;</InlineCode>, <InlineCode>&quot;consecutive&quot;</InlineCode> → nghĩ ngay Sliding Window.
            Nếu kích thước cố định → Fixed Window. Kích thước thay đổi → Variable Window.
        </Callout>

        <Heading2>Template Sliding Window</Heading2>

        <CodeBlock title="sliding-window-template.js">{`// Template Variable Size Sliding Window
function slidingWindow(s) {
    let left = 0
    let result = 0 // hoặc Infinity tùy bài

    for (let right = 0; right < s.length; right++) {
        // 1. Mở rộng: thêm s[right] vào window state

        // 2. Thu hẹp: trong khi window KHÔNG hợp lệ
        while (/* window không hợp lệ */) {
            // Bỏ s[left] ra khỏi window state
            left++
        }

        // 3. Cập nhật kết quả tốt nhất
        result = Math.max(result, right - left + 1)
    }

    return result
}`}</CodeBlock>

        {/* ───────── BÀI 4: MAX AVERAGE SUBARRAY ───────── */}
        <Heading2>Bài 4: Maximum Average Subarray I (LeetCode #643)</Heading2>

        <Heading3>Đề bài</Heading3>
        <Paragraph>
            Cho mảng <InlineCode>nums</InlineCode> và số <InlineCode>k</InlineCode>, tìm <Highlight>subarray liên tiếp có trung bình lớn nhất</Highlight> (kích thước k).
        </Paragraph>

        <CodeBlock title="max-average.js">{`// LeetCode #643: Maximum Average Subarray I — O(n)
function findMaxAverage(nums, k) {
    let sum = 0
    for (let i = 0; i < k; i++) sum += nums[i]
    let maxSum = sum

    for (let i = k; i < nums.length; i++) {
        sum += nums[i] - nums[i - k]       // Slide: thêm mới, bỏ cũ
        maxSum = Math.max(maxSum, sum)
    }

    return maxSum / k
}

// Ví dụ: nums = [1,12,-5,-6,50,3], k = 4
// Window [1,12,-5,-6] sum=2, max=2
// Slide: [12,-5,-6,50] sum=51, max=51
// → maxSum/k = 51/4 = 12.75 ✓`}</CodeBlock>

        {/* ───────── BÀI 5: CONTAINS DUPLICATE II ───────── */}
        <Heading2>Bài 5: Contains Duplicate II (LeetCode #219)</Heading2>

        <Heading3>Đề bài</Heading3>
        <Paragraph>
            Kiểm tra xem có hai phần tử trùng <InlineCode>nums[i] === nums[j]</InlineCode> mà
            <Highlight>|i - j| &lt;= k</Highlight> không.
        </Paragraph>

        <CodeBlock title="contains-duplicate-ii.js">{`// LeetCode #219: Contains Duplicate II — O(n)
function containsNearbyDuplicate(nums, k) {
    const window = new Set()                // Giữ tối đa k phần tử

    for (let i = 0; i < nums.length; i++) {
        if (window.has(nums[i])) return true  // Trùng trong window!
        window.add(nums[i])
        if (window.size > k) {
            window.delete(nums[i - k])       // Window chỉ giữ k phần tử
        }
    }

    return false
}

// Ví dụ: nums = [1,2,3,1], k = 3
// i=0: window={1}
// i=1: window={1,2}
// i=2: window={1,2,3}
// i=3: 1 có trong window! → return true ✓`}</CodeBlock>

        {/* ───────── BÀI 6: LONGEST REPEATING ───────── */}
        <Heading2>Bài 6: Longest Repeating Character Replacement (LeetCode #424)</Heading2>

        <Heading3>Đề bài</Heading3>
        <Paragraph>
            Cho chuỗi <InlineCode>s</InlineCode> và số <InlineCode>k</InlineCode>,
            bạn được thay tối đa k ký tự. Tìm <Highlight>substring dài nhất chứa cùng ký tự</Highlight>.
        </Paragraph>

        <CodeBlock title="longest-repeating.js">{`// LeetCode #424: Longest Repeating Character Replacement — O(n)
function characterReplacement(s, k) {
    const count = {}
    let left = 0, maxFreq = 0, maxLen = 0

    for (let right = 0; right < s.length; right++) {
        count[s[right]] = (count[s[right]] || 0) + 1
        maxFreq = Math.max(maxFreq, count[s[right]])

        // Window size - max frequency = số ký tự cần thay
        // Nếu > k → thu hẹp
        while ((right - left + 1) - maxFreq > k) {
            count[s[left]]--
            left++
        }

        maxLen = Math.max(maxLen, right - left + 1)
    }

    return maxLen
}

// Key insight: giữ ký tự xuất hiện nhiều nhất, thay đổi phần còn lại
// Ví dụ: s = "AABABBA", k = 1
// Window "AABA" → maxFreq=3(A), cần thay 1 → ok (k=1)
// → maxLen = 4 ✓`}</CodeBlock>

        {/* ───────── BÀI 7: PERMUTATION IN STRING ───────── */}
        <Heading2>Bài 7: Permutation in String (LeetCode #567)</Heading2>

        <Heading3>Đề bài</Heading3>
        <Paragraph>
            Cho hai chuỗi <InlineCode>s1</InlineCode> và <InlineCode>s2</InlineCode>,
            kiểm tra xem <Highlight>s2 chứa permutation của s1</Highlight> không.
        </Paragraph>

        <CodeBlock title="permutation-in-string.js">{`// LeetCode #567: Permutation in String — O(n)
function checkInclusion(s1, s2) {
    if (s1.length > s2.length) return false

    const count = new Array(26).fill(0)
    const a = 'a'.charCodeAt(0)

    // Đếm ký tự s1 và trừ đi window đầu tiên của s2
    for (let i = 0; i < s1.length; i++) {
        count[s1.charCodeAt(i) - a]++
        count[s2.charCodeAt(i) - a]--
    }

    if (count.every(c => c === 0)) return true

    // Slide window trên s2
    for (let i = s1.length; i < s2.length; i++) {
        count[s2.charCodeAt(i) - a]--           // Thêm ký tự mới
        count[s2.charCodeAt(i - s1.length) - a]++ // Bỏ ký tự cũ

        if (count.every(c => c === 0)) return true
    }

    return false
}

// Ví dụ: s1 = "ab", s2 = "eidbaooo"
// Window "ei": count khác 0 → slide
// Window "id": count khác 0 → slide
// Window "ba": count = tất cả 0 → true ✓`}</CodeBlock>

        {/* ───────── BÀI 8: MIN SIZE SUBARRAY SUM ───────── */}
        <Heading2>Bài 8: Minimum Size Subarray Sum (LeetCode #209)</Heading2>

        <Heading3>Đề bài</Heading3>
        <Paragraph>
            Cho mảng số dương và <InlineCode>target</InlineCode>, tìm <Highlight>subarray ngắn nhất</Highlight> có tổng
            ≥ target.
        </Paragraph>

        <CodeBlock title="min-size-subarray.js">{`// LeetCode #209: Minimum Size Subarray Sum — O(n)
function minSubArrayLen(target, nums) {
    let left = 0, sum = 0, minLen = Infinity

    for (let right = 0; right < nums.length; right++) {
        sum += nums[right]                  // Mở rộng window

        while (sum >= target) {
            minLen = Math.min(minLen, right - left + 1)
            sum -= nums[left]               // Thu hẹp window
            left++
        }
    }

    return minLen === Infinity ? 0 : minLen
}

// Ví dụ: target = 7, nums = [2,3,1,2,4,3]
// right=3: sum=2+3+1+2=8 ≥ 7 → minLen=4, shrink
// right=4: sum=3+1+2+4=10 ≥ 7 → minLen=3, shrink → sum=1+2+4=7 → minLen=3
// right=5: sum=2+4+3=9 ≥ 7 → minLen=2 (subarray [4,3]) ✓`}</CodeBlock>

        {/* ───────── BÀI 9: FIND ALL ANAGRAMS ───────── */}
        <Heading2>Bài 9: Find All Anagrams in a String (LeetCode #438)</Heading2>

        <Heading3>Đề bài</Heading3>
        <Paragraph>
            Tìm <Highlight>tất cả vị trí bắt đầu</Highlight> của anagram của <InlineCode>p</InlineCode> trong <InlineCode>s</InlineCode>.
        </Paragraph>

        <CodeBlock title="find-anagrams.js">{`// LeetCode #438: Find All Anagrams — O(n)
function findAnagrams(s, p) {
    if (p.length > s.length) return []

    const count = new Array(26).fill(0)
    const a = 'a'.charCodeAt(0)
    const result = []

    for (let i = 0; i < p.length; i++) {
        count[p.charCodeAt(i) - a]++
        count[s.charCodeAt(i) - a]--
    }

    if (count.every(c => c === 0)) result.push(0)

    for (let i = p.length; i < s.length; i++) {
        count[s.charCodeAt(i) - a]--
        count[s.charCodeAt(i - p.length) - a]++
        if (count.every(c => c === 0)) result.push(i - p.length + 1)
    }

    return result
}

// Ví dụ: s = "cbaebabacd", p = "abc"
// Window "cba" → anagram! push(0)
// Window "bae" → no
// ... Window "bac" → anagram! push(6)
// → [0, 6] ✓`}</CodeBlock>

        {/* ───────── BÀI 10: SLIDING WINDOW MAXIMUM ───────── */}
        <Heading2>Bài 10: Sliding Window Maximum (LeetCode #239)</Heading2>

        <Heading3>Đề bài</Heading3>
        <Paragraph>
            Trả về <Highlight>giá trị lớn nhất</Highlight> trong mỗi window kích thước <InlineCode>k</InlineCode>
            khi trượt từ trái sang phải.
        </Paragraph>

        <CodeBlock title="sliding-window-max.js">{`// LeetCode #239: Sliding Window Maximum — O(n)
function maxSlidingWindow(nums, k) {
    const deque = []                        // Monotonic decreasing deque (lưu index)
    const result = []

    for (let i = 0; i < nums.length; i++) {
        // Bỏ phần tử ngoài window
        if (deque.length && deque[0] <= i - k) deque.shift()

        // Bỏ phần tử nhỏ hơn nums[i] (giữ deque giảm dần)
        while (deque.length && nums[deque[deque.length - 1]] <= nums[i]) {
            deque.pop()
        }

        deque.push(i)

        // Thêm max vào result khi window đủ k phần tử
        if (i >= k - 1) {
            result.push(nums[deque[0]])     // Đầu deque luôn là max
        }
    }

    return result
}

// Ví dụ: nums = [1,3,-1,-3,5,3,6,7], k = 3
// Window [1,3,-1] → max = 3
// Window [3,-1,-3] → max = 3
// Window [-1,-3,5] → max = 5
// → [3, 3, 5, 5, 6, 7] ✓`}</CodeBlock>
    </>
)

const enContent = (
    <>
        <Paragraph>
            <Highlight>Sliding Window</Highlight> maintains a &quot;window&quot; (contiguous range) over an array or string,
            sliding it to find optimal results. Instead of re-scanning everything,
            we only <Highlight>add/remove elements at boundaries</Highlight> → reducing O(n²) to <Highlight>O(n)</Highlight>.
        </Paragraph>

        <Callout type="info">
            General template: <InlineCode>right</InlineCode> expands the window → check condition →
            if invalid, shrink <InlineCode>left</InlineCode> → update best result.
        </Callout>

        <Heading2>How to Use Sliding Window</Heading2>

        <CodeBlock title="sliding-window-templates.js">{`// ═══ TEMPLATE 1: Fixed Size Window (size k) ═══
// Use when: find sum/max/min of k consecutive elements
let windowSum = 0, maxSum = -Infinity
for (let i = 0; i < arr.length; i++) {
    windowSum += arr[i]               // Add new element to window
    if (i >= k) windowSum -= arr[i-k] // Remove old element from window
    if (i >= k-1) maxSum = Math.max(maxSum, windowSum)
}

// ═══ TEMPLATE 2: Variable Size Window ═══
// Use when: find longest/shortest substring satisfying condition
let left = 0, best = 0
const map = new Map()  // Track window state

for (let right = 0; right < arr.length; right++) {
    // 1. Expand: add arr[right] to window
    map.set(arr[right], (map.get(arr[right]) || 0) + 1)

    // 2. Shrink: when window is invalid → move left
    while (/* invalid condition */) {
        map.set(arr[left], map.get(arr[left]) - 1)
        if (map.get(arr[left]) === 0) map.delete(arr[left])
        left++
    }

    // 3. Update best result
    best = Math.max(best, right - left + 1)
}`}</CodeBlock>

        <Heading2>When to Use Sliding Window?</Heading2>

        <div className="my-4 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
                <thead>
                    <tr className="border-b border-[var(--border-primary)]">
                        <th className="text-left p-3 text-[var(--text-secondary)] font-medium">Problem Signal</th>
                        <th className="text-left p-3 text-[var(--text-secondary)] font-medium">LeetCode Example</th>
                    </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                    <tr className="border-b border-gray-100"><td className="p-3">Find longest/shortest substring</td><td className="p-3">Longest Substring Without Repeating (#3)</td></tr>
                    <tr className="border-b border-gray-100"><td className="p-3">Find subarray with sum = k</td><td className="p-3">Minimum Size Subarray Sum (#209)</td></tr>
                    <tr className="border-b border-gray-100"><td className="p-3">Find substring containing all chars</td><td className="p-3">Minimum Window Substring (#76)</td></tr>
                    <tr><td className="p-3">Sum/max/min over contiguous range</td><td className="p-3">Max Sum Subarray of Size K</td></tr>
                </tbody>
            </table>
        </div>

        <Heading2>Two Types of Sliding Window</Heading2>

        <div className="my-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-4">
                <div className="text-blue-400 font-bold text-sm mb-2">📏 Fixed Size Window</div>
                <ul className="text-[var(--text-secondary)] text-xs space-y-1">
                    <li>• Window size is constant (k)</li>
                    <li>• Add new element, remove old</li>
                    <li>• Ex: Max sum of k consecutive elements</li>
                </ul>
            </div>
            <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-4">
                <div className="text-green-400 font-bold text-sm mb-2">🔄 Variable Size Window</div>
                <ul className="text-[var(--text-secondary)] text-xs space-y-1">
                    <li>• Size changes based on condition</li>
                    <li>• Expand right, shrink left</li>
                    <li>• Ex: Longest substring without repeats</li>
                </ul>
            </div>
        </div>

        <Heading2>Problem 1: Longest Substring Without Repeating (LeetCode #3)</Heading2>

        <Heading3>Problem</Heading3>
        <Paragraph>
            Given string <InlineCode>s</InlineCode>, find the length of the <Highlight>longest substring</Highlight> without
            repeating characters.
        </Paragraph>

        <Heading3>Sliding Window Solution</Heading3>
        <div className="my-4 space-y-2 text-sm text-[var(--text-secondary)]">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">1.</span>
                <span>Use a <InlineCode>Set</InlineCode> to track characters in the current window.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">2.</span>
                <span>Expand window by moving <InlineCode>right</InlineCode>.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">3.</span>
                <span>If character at <InlineCode>right</InlineCode> already in Set → duplicate → shrink from <InlineCode>left</InlineCode>.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">4.</span>
                <span>Update max length: <InlineCode>maxLen = max(maxLen, right - left + 1)</InlineCode>.</span>
            </div>
        </div>

        <CodeBlock title="longest-substring.js">{`// LeetCode #3: Longest Substring Without Repeating — O(n)
function lengthOfLongestSubstring(s) {
    const set = new Set()       // Characters in current window
    let left = 0, maxLen = 0

    for (let right = 0; right < s.length; right++) {
        // Shrink window: remove left chars until no duplicate
        while (set.has(s[right])) {
            set.delete(s[left])
            left++
        }
        // Add new character
        set.add(s[right])
        // Update best result
        maxLen = Math.max(maxLen, right - left + 1)
    }
    return maxLen
}

// Walkthrough: s = "abcabcbb"
// right=0 'a': set={a}, window="a", maxLen=1
// right=1 'b': set={a,b}, window="ab", maxLen=2
// right=2 'c': set={a,b,c}, window="abc", maxLen=3
// right=3 'a': has 'a'! → remove 'a', left=1
//   set={b,c,a}, window="bca", maxLen=3
// ... Result: 3 ("abc") ✓`}</CodeBlock>

        <Heading2>Problem 2: Minimum Window Substring (LeetCode #76)</Heading2>

        <Heading3>Problem</Heading3>
        <Paragraph>
            Given strings <InlineCode>s</InlineCode> and <InlineCode>t</InlineCode>, find the <Highlight>shortest substring</Highlight> in s
            containing all characters of t (including duplicates).
        </Paragraph>

        <Heading3>Sliding Window + Hash Map Solution</Heading3>
        <div className="my-4 space-y-2 text-sm text-[var(--text-secondary)]">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">1.</span>
                <span>Count character frequencies of t into <InlineCode>need</InlineCode> Map.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">2.</span>
                <span>Expand right: track when all required characters are satisfied (<InlineCode>formed === required</InlineCode>).</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">3.</span>
                <span>When all satisfied → shrink left to find minimum window.</span>
            </div>
        </div>

        <CodeBlock title="minimum-window-substring.js">{`// LeetCode #76: Minimum Window Substring — O(n)
function minWindow(s, t) {
    if (t.length > s.length) return ""

    const need = new Map()
    for (const c of t) need.set(c, (need.get(c) || 0) + 1)

    const window = new Map()
    let formed = 0, required = need.size
    let result = [Infinity, 0, 0]
    let left = 0

    for (let right = 0; right < s.length; right++) {
        // Expand: add s[right] to window
        const c = s[right]
        window.set(c, (window.get(c) || 0) + 1)
        if (need.has(c) && window.get(c) === need.get(c)) formed++

        // Shrink: when all characters satisfied
        while (formed === required) {
            if (right - left + 1 < result[0]) {
                result = [right - left + 1, left, right]
            }
            const d = s[left]
            window.set(d, window.get(d) - 1)
            if (need.has(d) && window.get(d) < need.get(d)) formed--
            left++
        }
    }
    return result[0] === Infinity ? "" : s.slice(result[1], result[2] + 1)
}

// Walkthrough: s = "ADOBECODEBANC", t = "ABC"
// Expand until formed=3 (have A,B,C)
// "ADOBEC" (0→5) has A,B,C → shrink
// ... find smaller windows
// Result: "BANC" (length=4) ✓`}</CodeBlock>

        <Heading2>Problem 3: Maximum Sum Subarray of Size K</Heading2>

        <Heading3>Problem</Heading3>
        <Paragraph>
            Given an integer array and number <InlineCode>k</InlineCode>, find the <Highlight>maximum sum</Highlight> of k consecutive elements.
            Classic <Highlight>Fixed Size Sliding Window</Highlight> example.
        </Paragraph>

        <Heading3>Fixed Window Solution</Heading3>
        <div className="my-4 space-y-2 text-sm text-[var(--text-secondary)]">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">1.</span>
                <span>Calculate sum of first k elements as initial window.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">2.</span>
                <span>Slide window right: <Highlight>add new element, remove old</Highlight>.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">3.</span>
                <span>Track maximum sum.</span>
            </div>
        </div>

        <CodeBlock title="max-sum-subarray.js">{`// Maximum Sum Subarray of Size K — O(n)
function maxSumSubarray(nums, k) {
    let windowSum = 0
    for (let i = 0; i < k; i++) windowSum += nums[i]
    let maxSum = windowSum

    for (let i = k; i < nums.length; i++) {
        windowSum += nums[i]        // Add new element
        windowSum -= nums[i - k]    // Remove old element
        maxSum = Math.max(maxSum, windowSum)
    }
    return maxSum
}

// Walkthrough: nums = [2, 1, 5, 1, 3, 2], k = 3
// Initial: [2,1,5] sum=8, max=8
// Slide: -2 +1 → [1,5,1] sum=7, max=8
// Slide: -1 +3 → [5,1,3] sum=9, max=9 ✓
// Slide: -5 +2 → [1,3,2] sum=6, max=9
// Result: 9 ✓`}</CodeBlock>

        <Heading2>Sliding Window Template</Heading2>

        <CodeBlock title="sliding-window-template.js">{`// Variable Size Sliding Window Template
function slidingWindow(s) {
    let left = 0, result = 0

    for (let right = 0; right < s.length; right++) {
        // 1. Expand: add s[right] to window state

        // 2. Shrink: while window is INVALID
        while (/* window is invalid */) {
            // Remove s[left] from window state
            left++
        }

        // 3. Update best result
        result = Math.max(result, right - left + 1)
    }
    return result
}`}</CodeBlock>

        <Callout type="tip">
            Key signals: <InlineCode>&quot;substring&quot;</InlineCode>, <InlineCode>&quot;subarray&quot;</InlineCode>,
            <InlineCode>&quot;contiguous&quot;</InlineCode>, <InlineCode>&quot;consecutive&quot;</InlineCode> → think Sliding Window.
            Fixed size → Fixed Window. Variable size → Variable Window.
        </Callout>

        <Heading2>Problem 4: Maximum Average Subarray I (LeetCode #643)</Heading2>
        <Heading3>Problem</Heading3>
        <Paragraph>Given array <InlineCode>nums</InlineCode> and <InlineCode>k</InlineCode>, find the <Highlight>contiguous subarray with maximum average</Highlight> (size k).</Paragraph>
        <CodeBlock title="max-average.js">{`// LeetCode #643: Maximum Average Subarray I — O(n)
function findMaxAverage(nums, k) {
    let sum = 0
    for (let i = 0; i < k; i++) sum += nums[i]
    let maxSum = sum

    for (let i = k; i < nums.length; i++) {
        sum += nums[i] - nums[i - k]
        maxSum = Math.max(maxSum, sum)
    }
    return maxSum / k
}
// Example: [1,12,-5,-6,50,3], k=4 → maxSum=51, 51/4=12.75 ✓`}</CodeBlock>

        <Heading2>Problem 5: Contains Duplicate II (LeetCode #219)</Heading2>
        <Heading3>Problem</Heading3>
        <Paragraph>Check if there are two equal elements <InlineCode>nums[i] === nums[j]</InlineCode> with <Highlight>|i - j| &lt;= k</Highlight>.</Paragraph>
        <CodeBlock title="contains-duplicate-ii.js">{`// LeetCode #219: Contains Duplicate II — O(n)
function containsNearbyDuplicate(nums, k) {
    const window = new Set()
    for (let i = 0; i < nums.length; i++) {
        if (window.has(nums[i])) return true
        window.add(nums[i])
        if (window.size > k) window.delete(nums[i - k])
    }
    return false
}
// Example: [1,2,3,1], k=3 → true ✓`}</CodeBlock>

        <Heading2>Problem 6: Longest Repeating Character Replacement (LeetCode #424)</Heading2>
        <Heading3>Problem</Heading3>
        <Paragraph>Given string <InlineCode>s</InlineCode> and <InlineCode>k</InlineCode>, you can replace at most k characters. Find the <Highlight>longest substring with same character</Highlight>.</Paragraph>
        <CodeBlock title="longest-repeating.js">{`// LeetCode #424: Longest Repeating Character Replacement — O(n)
function characterReplacement(s, k) {
    const count = {}
    let left = 0, maxFreq = 0, maxLen = 0

    for (let right = 0; right < s.length; right++) {
        count[s[right]] = (count[s[right]] || 0) + 1
        maxFreq = Math.max(maxFreq, count[s[right]])

        while ((right - left + 1) - maxFreq > k) {
            count[s[left]]--; left++
        }
        maxLen = Math.max(maxLen, right - left + 1)
    }
    return maxLen
}
// Key: keep the most frequent char, replace the rest
// Example: s = "AABABBA", k = 1 → maxLen = 4 ✓`}</CodeBlock>

        <Heading2>Problem 7: Permutation in String (LeetCode #567)</Heading2>
        <Heading3>Problem</Heading3>
        <Paragraph>Check if <InlineCode>s2</InlineCode> contains a <Highlight>permutation of s1</Highlight>.</Paragraph>
        <CodeBlock title="permutation-in-string.js">{`// LeetCode #567: Permutation in String — O(n)
function checkInclusion(s1, s2) {
    if (s1.length > s2.length) return false
    const count = new Array(26).fill(0)
    const a = 'a'.charCodeAt(0)

    for (let i = 0; i < s1.length; i++) {
        count[s1.charCodeAt(i) - a]++
        count[s2.charCodeAt(i) - a]--
    }
    if (count.every(c => c === 0)) return true

    for (let i = s1.length; i < s2.length; i++) {
        count[s2.charCodeAt(i) - a]--
        count[s2.charCodeAt(i - s1.length) - a]++
        if (count.every(c => c === 0)) return true
    }
    return false
}
// Example: s1="ab", s2="eidbaooo" → window "ba" matches → true ✓`}</CodeBlock>

        <Heading2>Problem 8: Minimum Size Subarray Sum (LeetCode #209)</Heading2>
        <Heading3>Problem</Heading3>
        <Paragraph>Given array of positive integers and <InlineCode>target</InlineCode>, find the <Highlight>shortest subarray</Highlight> with sum ≥ target.</Paragraph>
        <CodeBlock title="min-size-subarray.js">{`// LeetCode #209: Minimum Size Subarray Sum — O(n)
function minSubArrayLen(target, nums) {
    let left = 0, sum = 0, minLen = Infinity

    for (let right = 0; right < nums.length; right++) {
        sum += nums[right]
        while (sum >= target) {
            minLen = Math.min(minLen, right - left + 1)
            sum -= nums[left]; left++
        }
    }
    return minLen === Infinity ? 0 : minLen
}
// Example: target=7, [2,3,1,2,4,3] → minLen=2 ([4,3]) ✓`}</CodeBlock>

        <Heading2>Problem 9: Find All Anagrams in a String (LeetCode #438)</Heading2>
        <Heading3>Problem</Heading3>
        <Paragraph>Find <Highlight>all start indices</Highlight> of anagrams of <InlineCode>p</InlineCode> in <InlineCode>s</InlineCode>.</Paragraph>
        <CodeBlock title="find-anagrams.js">{`// LeetCode #438: Find All Anagrams — O(n)
function findAnagrams(s, p) {
    if (p.length > s.length) return []
    const count = new Array(26).fill(0)
    const a = 'a'.charCodeAt(0), result = []

    for (let i = 0; i < p.length; i++) {
        count[p.charCodeAt(i) - a]++
        count[s.charCodeAt(i) - a]--
    }
    if (count.every(c => c === 0)) result.push(0)

    for (let i = p.length; i < s.length; i++) {
        count[s.charCodeAt(i) - a]--
        count[s.charCodeAt(i - p.length) - a]++
        if (count.every(c => c === 0)) result.push(i - p.length + 1)
    }
    return result
}
// Example: s="cbaebabacd", p="abc" → [0, 6] ✓`}</CodeBlock>

        <Heading2>Problem 10: Sliding Window Maximum (LeetCode #239)</Heading2>
        <Heading3>Problem</Heading3>
        <Paragraph>Return the <Highlight>maximum value</Highlight> in each window of size <InlineCode>k</InlineCode> as it slides left to right.</Paragraph>
        <CodeBlock title="sliding-window-max.js">{`// LeetCode #239: Sliding Window Maximum — O(n)
function maxSlidingWindow(nums, k) {
    const deque = []    // Monotonic decreasing deque (stores indices)
    const result = []

    for (let i = 0; i < nums.length; i++) {
        if (deque.length && deque[0] <= i - k) deque.shift()
        while (deque.length && nums[deque[deque.length - 1]] <= nums[i]) deque.pop()
        deque.push(i)
        if (i >= k - 1) result.push(nums[deque[0]])
    }
    return result
}
// Example: [1,3,-1,-3,5,3,6,7], k=3 → [3,3,5,5,6,7] ✓`}</CodeBlock>
    </>
)

const slidingWindowPattern: BlogPost = {
    slug: 'sliding-window-pattern',
    title: {
        vi: 'Sliding Window — Kỹ thuật cửa sổ trượt',
        en: 'Sliding Window — The Sliding Window Technique',
    },
    description: {
        vi: 'Giải thích chi tiết Sliding Window với LeetCode: Longest Substring, Minimum Window Substring, Max Sum Subarray. Fixed vs Variable window.',
        en: 'Deep dive into Sliding Window with LeetCode: Longest Substring, Minimum Window Substring, Max Sum Subarray. Fixed vs Variable window.',
    },
    date: '2025-09-11',
    tags: ['Algorithm', 'Sliding Window', 'LeetCode'],
    emoji: '🪟',
    color: '#06b6d4',
    content: { vi: viContent, en: enContent },
}

export default slidingWindowPattern
