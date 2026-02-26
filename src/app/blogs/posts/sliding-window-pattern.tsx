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

        <Heading2>Khi nào dùng Sliding Window?</Heading2>

        <div className="my-4 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
                <thead>
                    <tr className="border-b border-gray-200 dark:border-white/10">
                        <th className="text-left p-3 text-gray-500 dark:text-slate-400 font-medium">Dấu hiệu bài toán</th>
                        <th className="text-left p-3 text-gray-500 dark:text-slate-400 font-medium">Ví dụ LeetCode</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-slate-300">
                    <tr className="border-b border-gray-100 dark:border-white/5"><td className="p-3">Tìm substring dài nhất/ngắn nhất</td><td className="p-3">Longest Substring Without Repeating (#3)</td></tr>
                    <tr className="border-b border-gray-100 dark:border-white/5"><td className="p-3">Tìm subarray có tổng = k</td><td className="p-3">Minimum Size Subarray Sum (#209)</td></tr>
                    <tr className="border-b border-gray-100 dark:border-white/5"><td className="p-3">Tìm chuỗi con chứa tất cả ký tự</td><td className="p-3">Minimum Window Substring (#76)</td></tr>
                    <tr><td className="p-3">Tổng/max/min trên khoảng liên tiếp</td><td className="p-3">Max Sum Subarray of Size K</td></tr>
                </tbody>
            </table>
        </div>

        <Heading2>Hai loại Sliding Window</Heading2>

        <div className="my-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-4">
                <div className="text-blue-400 font-bold text-sm mb-2">📏 Fixed Size Window</div>
                <ul className="text-gray-500 dark:text-slate-400 text-xs space-y-1">
                    <li>• Kích thước cửa sổ cố định (k)</li>
                    <li>• Thêm phần tử mới, bỏ phần tử cũ</li>
                    <li>• VD: Tổng lớn nhất của k phần tử liên tiếp</li>
                </ul>
            </div>
            <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-4">
                <div className="text-green-400 font-bold text-sm mb-2">🔄 Variable Size Window</div>
                <ul className="text-gray-500 dark:text-slate-400 text-xs space-y-1">
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
        <div className="my-4 space-y-2 text-sm text-gray-600 dark:text-slate-300">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">1.</span>
                <span>Dùng <InlineCode>Set</InlineCode> để lưu các ký tự trong cửa sổ hiện tại.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">2.</span>
                <span>Mở rộng cửa sổ bằng cách di chuyển <InlineCode>right</InlineCode> sang phải.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">3.</span>
                <span>Nếu ký tự tại <InlineCode>right</InlineCode> đã có trong Set → có trùng lặp → thu hẹp từ <InlineCode>left</InlineCode> cho đến khi hết trùng.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
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
        <div className="my-4 space-y-2 text-sm text-gray-600 dark:text-slate-300">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">1.</span>
                <span>Đếm tần suất ký tự của t vào <InlineCode>need</InlineCode> Map.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">2.</span>
                <span>Mở rộng right: mỗi khi thêm ký tự, nếu ký tự đó cần thiết và đủ số lượng → tăng biến <InlineCode>formed</InlineCode>.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">3.</span>
                <span>Khi <InlineCode>formed === required</InlineCode> (đã có đủ tất cả ký tự) → thu hẹp left để tìm window nhỏ nhất.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
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
        <div className="my-4 space-y-2 text-sm text-gray-600 dark:text-slate-300">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">1.</span>
                <span>Tính tổng k phần tử đầu tiên làm window ban đầu.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">2.</span>
                <span>Trượt window sang phải: <Highlight>thêm phần tử mới, bỏ phần tử cũ</Highlight>.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
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

        <Heading2>When to Use Sliding Window?</Heading2>

        <div className="my-4 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
                <thead>
                    <tr className="border-b border-gray-200 dark:border-white/10">
                        <th className="text-left p-3 text-gray-500 dark:text-slate-400 font-medium">Problem Signal</th>
                        <th className="text-left p-3 text-gray-500 dark:text-slate-400 font-medium">LeetCode Example</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-slate-300">
                    <tr className="border-b border-gray-100 dark:border-white/5"><td className="p-3">Find longest/shortest substring</td><td className="p-3">Longest Substring Without Repeating (#3)</td></tr>
                    <tr className="border-b border-gray-100 dark:border-white/5"><td className="p-3">Find subarray with sum = k</td><td className="p-3">Minimum Size Subarray Sum (#209)</td></tr>
                    <tr className="border-b border-gray-100 dark:border-white/5"><td className="p-3">Find substring containing all chars</td><td className="p-3">Minimum Window Substring (#76)</td></tr>
                    <tr><td className="p-3">Sum/max/min over contiguous range</td><td className="p-3">Max Sum Subarray of Size K</td></tr>
                </tbody>
            </table>
        </div>

        <Heading2>Two Types of Sliding Window</Heading2>

        <div className="my-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-4">
                <div className="text-blue-400 font-bold text-sm mb-2">📏 Fixed Size Window</div>
                <ul className="text-gray-500 dark:text-slate-400 text-xs space-y-1">
                    <li>• Window size is constant (k)</li>
                    <li>• Add new element, remove old</li>
                    <li>• Ex: Max sum of k consecutive elements</li>
                </ul>
            </div>
            <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-4">
                <div className="text-green-400 font-bold text-sm mb-2">🔄 Variable Size Window</div>
                <ul className="text-gray-500 dark:text-slate-400 text-xs space-y-1">
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
        <div className="my-4 space-y-2 text-sm text-gray-600 dark:text-slate-300">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">1.</span>
                <span>Use a <InlineCode>Set</InlineCode> to track characters in the current window.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">2.</span>
                <span>Expand window by moving <InlineCode>right</InlineCode>.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">3.</span>
                <span>If character at <InlineCode>right</InlineCode> already in Set → duplicate → shrink from <InlineCode>left</InlineCode>.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
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
        <div className="my-4 space-y-2 text-sm text-gray-600 dark:text-slate-300">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">1.</span>
                <span>Count character frequencies of t into <InlineCode>need</InlineCode> Map.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">2.</span>
                <span>Expand right: track when all required characters are satisfied (<InlineCode>formed === required</InlineCode>).</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
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
        <div className="my-4 space-y-2 text-sm text-gray-600 dark:text-slate-300">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">1.</span>
                <span>Calculate sum of first k elements as initial window.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">2.</span>
                <span>Slide window right: <Highlight>add new element, remove old</Highlight>.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
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
    date: '2026-02-26',
    tags: ['Algorithm', 'Sliding Window', 'LeetCode'],
    emoji: '🪟',
    color: '#06b6d4',
    content: { vi: viContent, en: enContent },
}

export default slidingWindowPattern
