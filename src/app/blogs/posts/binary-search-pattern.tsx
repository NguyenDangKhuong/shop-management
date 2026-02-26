import { BlogPost } from '../types'
import { CodeBlock, Heading2, Heading3, Paragraph, Highlight, InlineCode, Callout } from '../components/BlogComponents'

const viContent = (
    <>
        <Paragraph>
            <Highlight>Binary Search</Highlight> (tìm kiếm nhị phân) giảm không gian tìm kiếm đi một nửa mỗi bước,
            đưa từ O(n) xuống <Highlight>O(log n)</Highlight>. Đây là kỹ thuật mạnh nhất cho mảng đã sắp xếp
            và bài toán có tính chất <Highlight>monotonic</Highlight>.
        </Paragraph>

        <Callout type="info">
            Binary Search không chỉ dùng cho &quot;tìm phần tử trong mảng sorted&quot;. Pattern mạnh nhất là{' '}
            <Highlight>Binary Search on Answer</Highlight>: tìm giá trị min/max thỏa điều kiện.
        </Callout>

        <Heading2>Khi nào dùng Binary Search?</Heading2>

        <div className="my-4 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
                <thead>
                    <tr className="border-b border-gray-200 dark:border-white/10">
                        <th className="text-left p-3 text-gray-500 dark:text-slate-400 font-medium">Dấu hiệu bài toán</th>
                        <th className="text-left p-3 text-gray-500 dark:text-slate-400 font-medium">Ví dụ LeetCode</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-slate-300">
                    <tr className="border-b border-gray-100 dark:border-white/5"><td className="p-3">Mảng sorted + tìm phần tử</td><td className="p-3">Binary Search (#704)</td></tr>
                    <tr className="border-b border-gray-100 dark:border-white/5"><td className="p-3">Tìm giá trị min/max thỏa điều kiện</td><td className="p-3">Koko Eating Bananas (#875)</td></tr>
                    <tr className="border-b border-gray-100 dark:border-white/5"><td className="p-3">Mảng sorted bị xoay</td><td className="p-3">Search in Rotated Array (#33)</td></tr>
                    <tr><td className="p-3">Tìm vị trí chèn</td><td className="p-3">Search Insert Position (#35)</td></tr>
                </tbody>
            </table>
        </div>

        <Heading2>Hai loại Binary Search</Heading2>

        <div className="my-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-4">
                <div className="text-blue-400 font-bold text-sm mb-2">🎯 Tìm giá trị cụ thể</div>
                <ul className="text-gray-500 dark:text-slate-400 text-xs space-y-1">
                    <li>• Tìm phần tử trong mảng sorted</li>
                    <li>• <InlineCode>left {'<='} right</InlineCode></li>
                    <li>• Return khi tìm thấy hoặc -1</li>
                </ul>
            </div>
            <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-4">
                <div className="text-green-400 font-bold text-sm mb-2">🔍 Tìm biên (Binary Search on Answer)</div>
                <ul className="text-gray-500 dark:text-slate-400 text-xs space-y-1">
                    <li>• Tìm giá trị min/max thỏa điều kiện</li>
                    <li>• <InlineCode>left {'<'} right</InlineCode></li>
                    <li>• Thu hẹp khoảng cho đến khi left=right</li>
                </ul>
            </div>
        </div>

        {/* ───────── BÀI 1 ───────── */}
        <Heading2>Bài 1: Binary Search cổ điển (LeetCode #704)</Heading2>

        <Heading3>Đề bài</Heading3>
        <Paragraph>
            Cho mảng số nguyên <Highlight>đã sắp xếp</Highlight> <InlineCode>nums</InlineCode> và giá trị <InlineCode>target</InlineCode>,
            tìm index của target. Trả về -1 nếu không tìm thấy.
        </Paragraph>

        <Heading3>Giải pháp</Heading3>
        <div className="my-4 space-y-2 text-sm text-gray-600 dark:text-slate-300">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">1.</span>
                <span>Đặt <InlineCode>left = 0</InlineCode>, <InlineCode>right = n-1</InlineCode>.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">2.</span>
                <span>Tính <InlineCode>mid = floor((left + right) / 2)</InlineCode>.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">3.</span>
                <span><InlineCode>nums[mid] === target</InlineCode> → tìm thấy!<br />
                    <InlineCode>nums[mid] {'<'} target</InlineCode> → target ở nửa phải → <InlineCode>left = mid + 1</InlineCode>.<br />
                    <InlineCode>nums[mid] {'>'} target</InlineCode> → target ở nửa trái → <InlineCode>right = mid - 1</InlineCode>.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">4.</span>
                <span>Lặp cho đến <InlineCode>left {'>'} right</InlineCode> → không tìm thấy.</span>
            </div>
        </div>

        <CodeBlock title="binary-search.js">{`// LeetCode #704: Binary Search — O(log n) time, O(1) space
function search(nums, target) {
    let left = 0
    let right = nums.length - 1

    while (left <= right) {
        // Tính mid (tránh overflow bằng cách dùng Math.floor)
        const mid = Math.floor((left + right) / 2)

        if (nums[mid] === target) {
            return mid              // Tìm thấy!
        } else if (nums[mid] < target) {
            left = mid + 1          // Target ở nửa phải
        } else {
            right = mid - 1         // Target ở nửa trái
        }
    }

    return -1                       // Không tìm thấy
}

// Ví dụ: nums = [-1, 0, 3, 5, 9, 12], target = 9
// left=0, right=5: mid=2, nums[2]=3 < 9 → left=3
// left=3, right=5: mid=4, nums[4]=9 === 9 → return 4 ✓

// Ví dụ: target = 2
// left=0, right=5: mid=2, nums[2]=3 > 2 → right=1
// left=0, right=1: mid=0, nums[0]=-1 < 2 → left=1
// left=1, right=1: mid=1, nums[1]=0 < 2 → left=2
// left=2 > right=1 → return -1 ✓`}</CodeBlock>

        {/* ───────── BÀI 2 ───────── */}
        <Heading2>Bài 2: Koko Eating Bananas (LeetCode #875)</Heading2>

        <Heading3>Đề bài</Heading3>
        <Paragraph>
            Koko có <InlineCode>n</InlineCode> đống chuối, mỗi đống có <InlineCode>piles[i]</InlineCode> quả.
            Với tốc độ ăn <InlineCode>k</InlineCode> quả/giờ, Koko cần ăn hết trong <InlineCode>h</InlineCode> giờ.
            Tìm <Highlight>tốc độ k nhỏ nhất</Highlight> để ăn hết.
            Đây là bài <Highlight>Binary Search on Answer</Highlight> kinh điển.
        </Paragraph>

        <Heading3>Giải pháp với Binary Search on Answer</Heading3>
        <div className="my-4 space-y-2 text-sm text-gray-600 dark:text-slate-300">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">1.</span>
                <span>Đáp án k nằm trong khoảng <InlineCode>[1, max(piles)]</InlineCode>.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">2.</span>
                <span>Binary search trên khoảng này: tính tổng giờ cần với tốc độ <InlineCode>mid</InlineCode>.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">3.</span>
                <span>Nếu tổng giờ {'<='} h → mid có thể là đáp án → thử giảm: <InlineCode>right = mid</InlineCode>.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">4.</span>
                <span>Nếu tổng giờ {'>'} h → mid quá nhỏ → <InlineCode>left = mid + 1</InlineCode>.</span>
            </div>
        </div>

        <CodeBlock title="koko-eating-bananas.js">{`// LeetCode #875: Koko Eating Bananas — O(n × log(max))
function minEatingSpeed(piles, h) {
    let left = 1                            // Tốc độ tối thiểu
    let right = Math.max(...piles)          // Tốc độ tối đa

    while (left < right) {
        const mid = Math.floor((left + right) / 2)

        // Tính tổng số giờ cần với tốc độ mid
        const totalHours = piles.reduce((sum, pile) => {
            return sum + Math.ceil(pile / mid) // Mỗi đống cần ceil(pile/k) giờ
        }, 0)

        if (totalHours <= h) {
            // Ăn kịp! mid có thể là đáp án, thử giảm tốc độ
            right = mid
        } else {
            // Không kịp! Tốc độ quá chậm, tăng lên
            left = mid + 1
        }
    }

    return left                             // left === right = tốc độ tối thiểu
}

// Ví dụ: piles = [3, 6, 7, 11], h = 8
// left=1, right=11
// mid=6: hours = ceil(3/6)+ceil(6/6)+ceil(7/6)+ceil(11/6) = 1+1+2+2 = 6 ≤ 8
//   → right=6
// mid=3: hours = ceil(3/3)+ceil(6/3)+ceil(7/3)+ceil(11/3) = 1+2+3+4 = 10 > 8
//   → left=4
// mid=5: hours = ceil(3/5)+ceil(6/5)+ceil(7/5)+ceil(11/5) = 1+2+2+3 = 8 ≤ 8
//   → right=5
// mid=4: hours = ceil(3/4)+ceil(6/4)+ceil(7/4)+ceil(11/4) = 1+2+2+3 = 8 ≤ 8
//   → right=4
// left=4 === right=4 → return 4 ✓`}</CodeBlock>

        {/* ───────── BÀI 3 ───────── */}
        <Heading2>Bài 3: Search in Rotated Sorted Array (LeetCode #33)</Heading2>

        <Heading3>Đề bài</Heading3>
        <Paragraph>
            Cho mảng sorted bị <Highlight>xoay</Highlight> (ví dụ: <InlineCode>[4,5,6,7,0,1,2]</InlineCode>),
            tìm target trong O(log n).
        </Paragraph>

        <Heading3>Giải pháp</Heading3>
        <div className="my-4 space-y-2 text-sm text-gray-600 dark:text-slate-300">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">1.</span>
                <span>Tính mid. Một trong hai nửa <Highlight>luôn sorted</Highlight>.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">2.</span>
                <span>Xác định nửa nào sorted (so sánh <InlineCode>nums[left]</InlineCode> với <InlineCode>nums[mid]</InlineCode>).</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">3.</span>
                <span>Kiểm tra target có nằm trong nửa sorted không → thu hẹp khoảng tìm.</span>
            </div>
        </div>

        <CodeBlock title="search-rotated-array.js">{`// LeetCode #33: Search in Rotated Sorted Array — O(log n)
function search(nums, target) {
    let left = 0, right = nums.length - 1

    while (left <= right) {
        const mid = Math.floor((left + right) / 2)

        if (nums[mid] === target) return mid

        // Xác định nửa nào là sorted
        if (nums[left] <= nums[mid]) {
            // Nửa TRÁI sorted [left...mid]
            if (target >= nums[left] && target < nums[mid]) {
                right = mid - 1     // Target trong nửa trái
            } else {
                left = mid + 1      // Target trong nửa phải
            }
        } else {
            // Nửa PHẢI sorted [mid...right]
            if (target > nums[mid] && target <= nums[right]) {
                left = mid + 1      // Target trong nửa phải
            } else {
                right = mid - 1     // Target trong nửa trái
            }
        }
    }

    return -1
}

// Ví dụ: nums = [4, 5, 6, 7, 0, 1, 2], target = 0
// left=0, right=6: mid=3, nums[3]=7
//   nums[0]=4 <= nums[3]=7 → nửa trái sorted [4,5,6,7]
//   target=0 < 4 → target KHÔNG trong nửa trái → left=4
// left=4, right=6: mid=5, nums[5]=1
//   nums[4]=0 <= nums[5]=1 → nửa trái sorted [0,1]
//   target=0 >= 0 && 0 < 1 → target trong nửa trái → right=4
// left=4, right=4: mid=4, nums[4]=0 === 0 → return 4 ✓`}</CodeBlock>

        <Heading2>Lỗi thường gặp với Binary Search</Heading2>

        <div className="my-4 space-y-2 text-sm text-gray-600 dark:text-slate-300">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-red-500/5 border border-red-500/20">
                <span className="text-red-400 font-bold">❌</span>
                <span><InlineCode>left {'<'} right</InlineCode> vs <InlineCode>left {'<='} right</InlineCode> — dùng sai sẽ bỏ sót phần tử hoặc vòng lặp vô hạn.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-red-500/5 border border-red-500/20">
                <span className="text-red-400 font-bold">❌</span>
                <span><InlineCode>right = mid</InlineCode> vs <InlineCode>right = mid - 1</InlineCode> — phụ thuộc vào đang tìm giá trị cụ thể hay tìm biên.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-red-500/5 border border-red-500/20">
                <span className="text-red-400 font-bold">❌</span>
                <span>Overflow khi tính mid: <InlineCode>(left + right) / 2</InlineCode> có thể overflow trong ngôn ngữ khác. Dùng <InlineCode>left + (right - left) / 2</InlineCode>.</span>
            </div>
        </div>

        <Callout type="tip">
            Quy tắc: tìm <Highlight>giá trị cụ thể</Highlight> → <InlineCode>left {'<='} right</InlineCode>, <InlineCode>right = mid - 1</InlineCode>.
            Tìm <Highlight>giá trị min/max thỏa điều kiện</Highlight> → <InlineCode>left {'<'} right</InlineCode>, <InlineCode>right = mid</InlineCode>.
        </Callout>
    </>
)

const enContent = (
    <>
        <Paragraph>
            <Highlight>Binary Search</Highlight> halves the search space at each step,
            reducing O(n) to <Highlight>O(log n)</Highlight>. It&apos;s the most powerful technique for sorted arrays
            and problems with <Highlight>monotonic</Highlight> properties.
        </Paragraph>

        <Callout type="info">
            Binary Search isn&apos;t just for &quot;find element in sorted array&quot;. The most powerful pattern is{' '}
            <Highlight>Binary Search on Answer</Highlight>: finding the min/max value satisfying a condition.
        </Callout>

        <Heading2>When to Use Binary Search?</Heading2>

        <div className="my-4 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
                <thead>
                    <tr className="border-b border-gray-200 dark:border-white/10">
                        <th className="text-left p-3 text-gray-500 dark:text-slate-400 font-medium">Problem Signal</th>
                        <th className="text-left p-3 text-gray-500 dark:text-slate-400 font-medium">LeetCode Example</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-slate-300">
                    <tr className="border-b border-gray-100 dark:border-white/5"><td className="p-3">Sorted array + find element</td><td className="p-3">Binary Search (#704)</td></tr>
                    <tr className="border-b border-gray-100 dark:border-white/5"><td className="p-3">Find min/max satisfying condition</td><td className="p-3">Koko Eating Bananas (#875)</td></tr>
                    <tr className="border-b border-gray-100 dark:border-white/5"><td className="p-3">Rotated sorted array</td><td className="p-3">Search in Rotated Array (#33)</td></tr>
                    <tr><td className="p-3">Find insert position</td><td className="p-3">Search Insert Position (#35)</td></tr>
                </tbody>
            </table>
        </div>

        <Heading2>Two Types of Binary Search</Heading2>

        <div className="my-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-4">
                <div className="text-blue-400 font-bold text-sm mb-2">🎯 Find Exact Value</div>
                <ul className="text-gray-500 dark:text-slate-400 text-xs space-y-1">
                    <li>• Find element in sorted array</li>
                    <li>• <InlineCode>left {'<='} right</InlineCode></li>
                    <li>• Return when found or -1</li>
                </ul>
            </div>
            <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-4">
                <div className="text-green-400 font-bold text-sm mb-2">🔍 Find Boundary (BS on Answer)</div>
                <ul className="text-gray-500 dark:text-slate-400 text-xs space-y-1">
                    <li>• Find min/max satisfying condition</li>
                    <li>• <InlineCode>left {'<'} right</InlineCode></li>
                    <li>• Narrow range until left=right</li>
                </ul>
            </div>
        </div>

        <Heading2>Problem 1: Classic Binary Search (LeetCode #704)</Heading2>

        <Heading3>Problem</Heading3>
        <Paragraph>
            Given a <Highlight>sorted</Highlight> integer array and a target, find the target&apos;s index. Return -1 if not found.
        </Paragraph>

        <Heading3>Solution</Heading3>
        <div className="my-4 space-y-2 text-sm text-gray-600 dark:text-slate-300">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">1.</span>
                <span>Set <InlineCode>left = 0</InlineCode>, <InlineCode>right = n-1</InlineCode>.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">2.</span>
                <span>Calculate <InlineCode>mid</InlineCode>. Compare with target → narrow to left or right half.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">3.</span>
                <span>Repeat until found or <InlineCode>left {'>'} right</InlineCode>.</span>
            </div>
        </div>

        <CodeBlock title="binary-search.js">{`// LeetCode #704: Binary Search — O(log n)
function search(nums, target) {
    let left = 0, right = nums.length - 1

    while (left <= right) {
        const mid = Math.floor((left + right) / 2)
        if (nums[mid] === target) return mid
        else if (nums[mid] < target) left = mid + 1
        else right = mid - 1
    }
    return -1
}

// Walkthrough: nums = [-1, 0, 3, 5, 9, 12], target = 9
// left=0, right=5: mid=2, nums[2]=3 < 9 → left=3
// left=3, right=5: mid=4, nums[4]=9 === 9 → return 4 ✓`}</CodeBlock>

        <Heading2>Problem 2: Koko Eating Bananas (LeetCode #875)</Heading2>

        <Heading3>Problem</Heading3>
        <Paragraph>
            Koko has <InlineCode>n</InlineCode> piles of bananas. At speed <InlineCode>k</InlineCode> bananas/hour,
            she must finish in <InlineCode>h</InlineCode> hours. Find the <Highlight>minimum k</Highlight>.
            Classic <Highlight>Binary Search on Answer</Highlight>.
        </Paragraph>

        <Heading3>Binary Search on Answer Solution</Heading3>
        <div className="my-4 space-y-2 text-sm text-gray-600 dark:text-slate-300">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">1.</span>
                <span>Answer k is in range <InlineCode>[1, max(piles)]</InlineCode>.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">2.</span>
                <span>Binary search: calculate total hours at speed <InlineCode>mid</InlineCode>.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">3.</span>
                <span>If hours {'<='} h → mid works, try smaller: <InlineCode>right = mid</InlineCode>.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">4.</span>
                <span>If hours {'>'} h → too slow: <InlineCode>left = mid + 1</InlineCode>.</span>
            </div>
        </div>

        <CodeBlock title="koko-eating-bananas.js">{`// LeetCode #875: Koko Eating Bananas — O(n × log(max))
function minEatingSpeed(piles, h) {
    let left = 1, right = Math.max(...piles)

    while (left < right) {
        const mid = Math.floor((left + right) / 2)
        const hours = piles.reduce((sum, p) => sum + Math.ceil(p / mid), 0)
        if (hours <= h) right = mid     // Can finish, try smaller
        else left = mid + 1              // Too slow, increase
    }
    return left
}

// Walkthrough: piles = [3, 6, 7, 11], h = 8
// left=1, right=11
// mid=6: hours=1+1+2+2=6 ≤ 8 → right=6
// mid=3: hours=1+2+3+4=10 > 8 → left=4
// mid=5: hours=1+2+2+3=8 ≤ 8 → right=5
// mid=4: hours=1+2+2+3=8 ≤ 8 → right=4
// left=4=right → return 4 ✓`}</CodeBlock>

        <Heading2>Problem 3: Search in Rotated Sorted Array (LeetCode #33)</Heading2>

        <Heading3>Problem</Heading3>
        <Paragraph>
            Given a sorted array that has been <Highlight>rotated</Highlight> (e.g., <InlineCode>[4,5,6,7,0,1,2]</InlineCode>),
            find target in O(log n).
        </Paragraph>

        <Heading3>Solution</Heading3>
        <div className="my-4 space-y-2 text-sm text-gray-600 dark:text-slate-300">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">1.</span>
                <span>Calculate mid. One of the two halves is <Highlight>always sorted</Highlight>.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">2.</span>
                <span>Determine which half is sorted (compare <InlineCode>nums[left]</InlineCode> with <InlineCode>nums[mid]</InlineCode>).</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">3.</span>
                <span>Check if target is in the sorted half → narrow search range.</span>
            </div>
        </div>

        <CodeBlock title="search-rotated-array.js">{`// LeetCode #33: Search in Rotated Sorted Array — O(log n)
function search(nums, target) {
    let left = 0, right = nums.length - 1

    while (left <= right) {
        const mid = Math.floor((left + right) / 2)
        if (nums[mid] === target) return mid

        if (nums[left] <= nums[mid]) {
            // Left half is sorted
            if (target >= nums[left] && target < nums[mid])
                right = mid - 1         // Target in left half
            else
                left = mid + 1          // Target in right half
        } else {
            // Right half is sorted
            if (target > nums[mid] && target <= nums[right])
                left = mid + 1          // Target in right half
            else
                right = mid - 1         // Target in left half
        }
    }
    return -1
}

// Walkthrough: nums = [4,5,6,7,0,1,2], target = 0
// mid=3(7): left half [4,5,6,7] sorted, 0 not in [4,7] → left=4
// mid=5(1): left half [0,1] sorted, 0 in [0,1) → right=4
// mid=4(0): found! return 4 ✓`}</CodeBlock>

        <Heading2>Common Binary Search Mistakes</Heading2>

        <div className="my-4 space-y-2 text-sm text-gray-600 dark:text-slate-300">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-red-500/5 border border-red-500/20">
                <span className="text-red-400 font-bold">❌</span>
                <span><InlineCode>left {'<'} right</InlineCode> vs <InlineCode>left {'<='} right</InlineCode> — wrong choice causes missed elements or infinite loops.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-red-500/5 border border-red-500/20">
                <span className="text-red-400 font-bold">❌</span>
                <span><InlineCode>right = mid</InlineCode> vs <InlineCode>right = mid - 1</InlineCode> — depends on finding exact value vs boundary.</span>
            </div>
        </div>

        <Callout type="tip">
            Rule: finding <Highlight>exact value</Highlight> → <InlineCode>left {'<='} right</InlineCode>, <InlineCode>right = mid - 1</InlineCode>.
            Finding <Highlight>min/max satisfying condition</Highlight> → <InlineCode>left {'<'} right</InlineCode>, <InlineCode>right = mid</InlineCode>.
        </Callout>
    </>
)

const binarySearchPattern: BlogPost = {
    slug: 'binary-search-pattern',
    title: {
        vi: 'Binary Search — Tìm kiếm nhị phân',
        en: 'Binary Search — The Binary Search Technique',
    },
    description: {
        vi: 'Giải thích chi tiết Binary Search với LeetCode: Classic BS, Koko Eating Bananas, Search in Rotated Array. Binary Search on Answer.',
        en: 'Deep dive into Binary Search with LeetCode: Classic BS, Koko Eating Bananas, Search in Rotated Array. Binary Search on Answer.',
    },
    date: '2026-02-26',
    tags: ['Algorithm', 'Binary Search', 'LeetCode'],
    emoji: '🔍',
    color: '#f59e0b',
    content: { vi: viContent, en: enContent },
}

export default binarySearchPattern
