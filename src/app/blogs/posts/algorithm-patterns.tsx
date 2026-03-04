import Link from 'next/link'
import { BlogPost } from '../types'
import { CodeBlock, Heading2, Heading3, Paragraph, Highlight, InlineCode, Callout } from '../components/BlogComponents'

const viContent = (
    <>
        <Paragraph>
            Bạn có bao giờ đọc một bài LeetCode rồi nghĩ: <Highlight>&quot;Mình biết phải dùng cái gì đó... nhưng cái gì?&quot;</Highlight>{' '}
            Vấn đề không phải bạn dở — mà là bạn chưa có <Highlight>bản đồ tư duy</Highlight> để nhận diện pattern.
            Bài viết này sẽ giúp bạn xây dựng bản đồ đó.
        </Paragraph>

        <Callout type="info">
            Không cần nhớ thuộc lòng code — chỉ cần nhớ <InlineCode>bài toán kiểu này → dùng công cụ gì</InlineCode>.
            Đây là skill quan trọng nhất khi giải thuật toán.
        </Callout>

        {/* ───────── 1. HASH MAP ───────── */}
        <Link href="/blogs/hash-map-pattern" className="no-underline hover:opacity-80 transition-opacity block"><Heading2>1. Hash Map / Hash Set — Tìm kiếm O(1) →</Heading2></Link>

        <Paragraph>
            <Highlight>Khi nào dùng?</Highlight> Cần tìm kiếm nhanh, đếm tần suất, hoặc kiểm tra &quot;đã gặp chưa&quot;.
        </Paragraph>

        <div className="my-4 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
                <thead>
                    <tr className="border-b border-white/10">
                        <th className="text-left p-3 text-slate-400 font-medium">Dấu hiệu bài toán</th>
                        <th className="text-left p-3 text-slate-400 font-medium">Ví dụ</th>
                    </tr>
                </thead>
                <tbody className="text-slate-300">
                    <tr className="border-b border-white/5"><td className="p-3">Tìm 2 số có tổng = target</td><td className="p-3">Two Sum</td></tr>
                    <tr className="border-b border-white/5"><td className="p-3">Đếm số lần xuất hiện</td><td className="p-3">Frequency Counter</td></tr>
                    <tr className="border-b border-white/5"><td className="p-3">Kiểm tra phần tử trùng lặp</td><td className="p-3">Contains Duplicate</td></tr>
                    <tr><td className="p-3">Nhóm các phần tử giống nhau</td><td className="p-3">Group Anagrams</td></tr>
                </tbody>
            </table>
        </div>

        <CodeBlock title="two-sum.js">{`// Two Sum: tìm 2 số có tổng = target → O(n)
function twoSum(nums, target) {
    const map = new Map()
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i]
        if (map.has(complement)) return [map.get(complement), i]
        map.set(nums[i], i)
    }
}
// Không có Map → phải dùng 2 vòng lặp O(n²)`}</CodeBlock>

        <Heading3>🔑 Khi nào dùng Object vs Map?</Heading3>
        <CodeBlock title="map-vs-object.js">{`// Object: key chỉ là string/symbol
const freq = {}
for (const c of "hello") freq[c] = (freq[c] || 0) + 1
// { h: 1, e: 1, l: 2, o: 1 }

// Map: key là BẤT KỲ kiểu nào (object, array, function...)
const map = new Map()
map.set([1,2], "array as key")  // Object không làm được!
map.size  // → O(1), Object phải dùng Object.keys().length`}</CodeBlock>

        <Callout type="tip">
            Quy tắc: Dùng <InlineCode>Map</InlineCode> khi key không phải string. Dùng <InlineCode>Object</InlineCode> khi key là string đơn giản.
            <InlineCode>Set</InlineCode> giống Map nhưng chỉ lưu key, dùng khi cần kiểm tra &quot;có tồn tại không&quot;.
        </Callout>

        {/* ───────── 2. TWO POINTERS ───────── */}
        <Link href="/blogs/two-pointers-pattern" className="no-underline hover:opacity-80 transition-opacity block"><Heading2>2. Two Pointers — Hai con trỏ →</Heading2></Link>

        <Paragraph>
            <Highlight>Khi nào dùng?</Highlight> Mảng <Highlight>đã sắp xếp</Highlight>, hoặc cần so sánh/xử lý từ 2 vị trí trong mảng/chuỗi.
        </Paragraph>

        <div className="my-4 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
                <thead>
                    <tr className="border-b border-white/10">
                        <th className="text-left p-3 text-slate-400 font-medium">Dấu hiệu</th>
                        <th className="text-left p-3 text-slate-400 font-medium">Ví dụ</th>
                    </tr>
                </thead>
                <tbody className="text-slate-300">
                    <tr className="border-b border-white/5"><td className="p-3">Mảng sorted + tìm cặp</td><td className="p-3">Two Sum II</td></tr>
                    <tr className="border-b border-white/5"><td className="p-3">So sánh từ 2 đầu</td><td className="p-3">Valid Palindrome</td></tr>
                    <tr className="border-b border-white/5"><td className="p-3">Loại bỏ phần tử trùng</td><td className="p-3">Remove Duplicates</td></tr>
                    <tr><td className="p-3">Tìm container chứa nhiều nước nhất</td><td className="p-3">Container With Most Water</td></tr>
                </tbody>
            </table>
        </div>

        <CodeBlock title="valid-palindrome.js">{`// Kiểm tra chuỗi đối xứng — O(n)
function isPalindrome(s) {
    s = s.toLowerCase().replace(/[^a-z0-9]/g, '')
    let left = 0, right = s.length - 1
    while (left < right) {
        if (s[left] !== s[right]) return false
        left++
        right--
    }
    return true
}

// Two Sum trên mảng SORTED — O(n) thay vì O(n²)
function twoSumSorted(nums, target) {
    let left = 0, right = nums.length - 1
    while (left < right) {
        const sum = nums[left] + nums[right]
        if (sum === target) return [left, right]
        if (sum < target) left++
        else right--
    }
}`}</CodeBlock>

        <Callout type="warning">
            Two Pointers chỉ hoạt động tốt khi mảng <InlineCode>đã sorted</InlineCode> hoặc bài toán có tính chất cho phép di chuyển pointer một chiều.
            Nếu mảng chưa sorted, hãy cân nhắc <InlineCode>Hash Map</InlineCode> thay thế.
        </Callout>

        {/* ───────── 3. SLIDING WINDOW ───────── */}
        <Link href="/blogs/sliding-window-pattern" className="no-underline hover:opacity-80 transition-opacity block"><Heading2>3. Sliding Window — Cửa sổ trượt →</Heading2></Link>

        <Paragraph>
            <Highlight>Khi nào dùng?</Highlight> Tìm <Highlight>substring/subarray tối ưu</Highlight> (dài nhất, ngắn nhất, tổng lớn nhất...).
            Thường kết hợp với Hash Map để theo dõi tần suất ký tự.
        </Paragraph>

        <CodeBlock title="longest-substring.js">{`// Longest Substring Without Repeating Characters — O(n)
function lengthOfLongest(s) {
    const set = new Set()
    let left = 0, maxLen = 0
    for (let right = 0; right < s.length; right++) {
        while (set.has(s[right])) {     // Thu nhỏ cửa sổ
            set.delete(s[left])
            left++
        }
        set.add(s[right])               // Mở rộng cửa sổ
        maxLen = Math.max(maxLen, right - left + 1)
    }
    return maxLen
}

// Template chung cho Sliding Window:
// 1. Mở rộng right →
// 2. Khi window không hợp lệ → thu nhỏ left →
// 3. Cập nhật kết quả tốt nhất`}</CodeBlock>

        <Callout type="tip">
            Mẹo nhận diện: Thấy từ khóa &quot;substring&quot;, &quot;subarray&quot;, &quot;contiguous&quot;, &quot;window&quot; → nghĩ ngay Sliding Window.
        </Callout>

        {/* ───────── 4. STACK ───────── */}
        <Link href="/blogs/stack-pattern" className="no-underline hover:opacity-80 transition-opacity block"><Heading2>4. Stack — Ngăn xếp →</Heading2></Link>

        <Paragraph>
            <Highlight>Khi nào dùng?</Highlight> Xử lý <Highlight>lồng nhau</Highlight>, đối xứng, hoặc tìm phần tử gần nhất lớn/nhỏ hơn.
            Stack hoạt động theo nguyên tắc <Highlight>LIFO</Highlight> (Last In, First Out).
        </Paragraph>

        <div className="my-4 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
                <thead>
                    <tr className="border-b border-white/10">
                        <th className="text-left p-3 text-slate-400 font-medium">Dấu hiệu</th>
                        <th className="text-left p-3 text-slate-400 font-medium">Ví dụ</th>
                    </tr>
                </thead>
                <tbody className="text-slate-300">
                    <tr className="border-b border-white/5"><td className="p-3">Kiểm tra ngoặc hợp lệ</td><td className="p-3">Valid Parentheses</td></tr>
                    <tr className="border-b border-white/5"><td className="p-3">Decode chuỗi lồng nhau</td><td className="p-3">Decode String 3[a2[c]]</td></tr>
                    <tr className="border-b border-white/5"><td className="p-3">Tìm phần tử lớn hơn gần nhất</td><td className="p-3">Next Greater Element</td></tr>
                    <tr><td className="p-3">Tính diện tích histogram</td><td className="p-3">Largest Rectangle in Histogram</td></tr>
                </tbody>
            </table>
        </div>

        <CodeBlock title="valid-parentheses.js">{`// Valid Parentheses — O(n)
function isValid(s) {
    const stack = []
    const pairs = { ')': '(', ']': '[', '}': '{' }
    for (const c of s) {
        if ('([{'.includes(c)) {
            stack.push(c)          // Mở ngoặc → push
        } else {
            if (stack.pop() !== pairs[c]) return false  // Đóng ngoặc → pop & kiểm tra
        }
    }
    return stack.length === 0
}

// Monotonic Stack — Tìm Next Greater Element
function nextGreater(nums) {
    const result = new Array(nums.length).fill(-1)
    const stack = []  // lưu INDEX, không lưu giá trị
    for (let i = 0; i < nums.length; i++) {
        while (stack.length && nums[i] > nums[stack.at(-1)]) {
            result[stack.pop()] = nums[i]
        }
        stack.push(i)
    }
    return result
}`}</CodeBlock>

        {/* ───────── 5. BFS / DFS ───────── */}
        <Link href="/blogs/bfs-dfs-pattern" className="no-underline hover:opacity-80 transition-opacity block"><Heading2>5. BFS / DFS — Duyệt đồ thị và cây →</Heading2></Link>

        <Paragraph>
            <Highlight>BFS</Highlight> (Breadth-First Search) duyệt theo <Highlight>chiều rộng</Highlight> — dùng Queue.{' '}
            <Highlight>DFS</Highlight> (Depth-First Search) duyệt theo <Highlight>chiều sâu</Highlight> — dùng Stack/Đệ quy.
        </Paragraph>

        <div className="my-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-4">
                <div className="text-blue-400 font-bold text-sm mb-2">🌊 BFS — Khi nào?</div>
                <ul className="text-slate-400 text-xs space-y-1">
                    <li>• Tìm đường đi <strong>ngắn nhất</strong></li>
                    <li>• Level order traversal</li>
                    <li>• Lan tỏa từ nguồn (rotten oranges)</li>
                </ul>
            </div>
            <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-4">
                <div className="text-green-400 font-bold text-sm mb-2">🌲 DFS — Khi nào?</div>
                <ul className="text-slate-400 text-xs space-y-1">
                    <li>• Duyệt <strong>tất cả</strong> đường đi</li>
                    <li>• Đếm connected components</li>
                    <li>• Backtracking (sudoku, n-queens)</li>
                </ul>
            </div>
        </div>

        <CodeBlock title="bfs-dfs.js">{`// Đếm số đảo trong ma trận — DFS
function numIslands(grid) {
    let count = 0
    const dfs = (i, j) => {
        if (i < 0 || j < 0 || i >= grid.length || j >= grid[0].length) return
        if (grid[i][j] !== '1') return
        grid[i][j] = '0'  // đánh dấu đã thăm
        dfs(i+1, j); dfs(i-1, j); dfs(i, j+1); dfs(i, j-1)
    }
    for (let i = 0; i < grid.length; i++)
        for (let j = 0; j < grid[0].length; j++)
            if (grid[i][j] === '1') { count++; dfs(i, j) }
    return count
}

// BFS — Tìm đường ngắn nhất trong ma trận
function shortestPath(grid) {
    const queue = [[0, 0, 1]]  // [row, col, distance]
    const visited = new Set(['0,0'])
    while (queue.length) {
        const [r, c, dist] = queue.shift()
        if (r === grid.length-1 && c === grid[0].length-1) return dist
        for (const [dr, dc] of [[1,0],[-1,0],[0,1],[0,-1]]) {
            const nr = r+dr, nc = c+dc
            if (nr >= 0 && nc >= 0 && nr < grid.length && nc < grid[0].length
                && !visited.has(nr+','+nc) && grid[nr][nc] === 0) {
                visited.add(nr+','+nc)
                queue.push([nr, nc, dist+1])
            }
        }
    }
    return -1
}`}</CodeBlock>

        {/* ───────── 6. BINARY SEARCH ───────── */}
        <Link href="/blogs/binary-search-pattern" className="no-underline hover:opacity-80 transition-opacity block"><Heading2>6. Binary Search — Tìm kiếm nhị phân →</Heading2></Link>

        <Paragraph>
            <Highlight>Khi nào dùng?</Highlight> Mảng <Highlight>sorted</Highlight> + cần tìm vị trí, hoặc bài toán có tính chất{' '}
            <Highlight>monotonic</Highlight> (nếu x thỏa thì x+1 cũng thỏa). Giảm từ O(n) xuống <Highlight>O(log n)</Highlight>.
        </Paragraph>

        <CodeBlock title="binary-search.js">{`// Classic Binary Search — O(log n)
function binarySearch(nums, target) {
    let left = 0, right = nums.length - 1
    while (left <= right) {
        const mid = Math.floor((left + right) / 2)
        if (nums[mid] === target) return mid
        if (nums[mid] < target) left = mid + 1
        else right = mid - 1
    }
    return -1
}

// Binary Search on Answer — Tìm giá trị tối thiểu thỏa điều kiện
// VD: Koko ăn chuối với tốc độ tối thiểu k để ăn hết trong h giờ
function minEatingSpeed(piles, h) {
    let left = 1, right = Math.max(...piles)
    while (left < right) {
        const mid = Math.floor((left + right) / 2)
        const hours = piles.reduce((sum, p) => sum + Math.ceil(p / mid), 0)
        if (hours <= h) right = mid      // mid có thể là đáp án
        else left = mid + 1              // mid quá nhỏ
    }
    return left
}`}</CodeBlock>

        <Callout type="tip">
            Mẹo: Nếu bài toán hỏi &quot;tìm giá trị min/max thỏa điều kiện&quot; → nghĩ đến <InlineCode>Binary Search on Answer</InlineCode>.
            Đây là pattern hay bị bỏ lỡ!
        </Callout>

        {/* ───────── 7. DYNAMIC PROGRAMMING ───────── */}
        <Link href="/blogs/dynamic-programming-pattern" className="no-underline hover:opacity-80 transition-opacity block"><Heading2>7. Dynamic Programming — Quy hoạch động →</Heading2></Link>

        <Paragraph>
            <Highlight>Khi nào dùng?</Highlight> Bài toán có <Highlight>lựa chọn tối ưu</Highlight> + <Highlight>bài toán con chồng chéo</Highlight>.
            DP = chia nhỏ bài toán lớn thành bài toán con, lưu kết quả để không tính lại.
        </Paragraph>

        <div className="my-4 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
                <thead>
                    <tr className="border-b border-white/10">
                        <th className="text-left p-3 text-slate-400 font-medium">Từ khóa trong đề</th>
                        <th className="text-left p-3 text-slate-400 font-medium">Ví dụ</th>
                    </tr>
                </thead>
                <tbody className="text-slate-300">
                    <tr className="border-b border-white/5"><td className="p-3">&quot;Có bao nhiêu cách...&quot;</td><td className="p-3">Climbing Stairs, Coin Change</td></tr>
                    <tr className="border-b border-white/5"><td className="p-3">&quot;Tìm giá trị lớn nhất/nhỏ nhất&quot;</td><td className="p-3">Knapsack, House Robber</td></tr>
                    <tr><td className="p-3">&quot;Chuỗi con chung dài nhất&quot;</td><td className="p-3">Longest Common Subsequence</td></tr>
                </tbody>
            </table>
        </div>

        <CodeBlock title="dynamic-programming.js">{`// Climbing Stairs — có bao nhiêu cách leo n bậc (mỗi bước 1 hoặc 2)?
function climbStairs(n) {
    if (n <= 2) return n
    let prev = 1, curr = 2
    for (let i = 3; i <= n; i++) {
        [prev, curr] = [curr, prev + curr]  // Fibonacci!
    }
    return curr
}

// Coin Change — tìm số đồng xu ít nhất để tạo amount
function coinChange(coins, amount) {
    const dp = new Array(amount + 1).fill(Infinity)
    dp[0] = 0
    for (let i = 1; i <= amount; i++) {
        for (const coin of coins) {
            if (i >= coin) dp[i] = Math.min(dp[i], dp[i - coin] + 1)
        }
    }
    return dp[amount] === Infinity ? -1 : dp[amount]
}

// House Robber — không được cướp 2 nhà liên tiếp
function rob(nums) {
    let prev = 0, curr = 0
    for (const num of nums) {
        [prev, curr] = [curr, Math.max(curr, prev + num)]
    }
    return curr
}`}</CodeBlock>

        <Heading3>🧠 Cách tiếp cận DP</Heading3>
        <div className="my-6 p-4 rounded-xl bg-slate-800/50 border border-white/10">
            <div className="flex flex-col items-center gap-2 text-sm">
                <div className="px-4 py-2 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30 w-fit">1. Xác định STATE — dp[i] đại diện cho gì?</div>
                <div className="text-slate-600">↓</div>
                <div className="px-4 py-2 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30 w-fit">2. Tìm TRANSITION — dp[i] tính từ dp[j] nào?</div>
                <div className="text-slate-600">↓</div>
                <div className="px-4 py-2 rounded-lg bg-green-500/20 text-green-300 border border-green-500/30 w-fit">3. Xác định BASE CASE — dp[0], dp[1] = ?</div>
                <div className="text-slate-600">↓</div>
                <div className="px-4 py-2 rounded-lg bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 w-fit">4. Xác định ANSWER — return dp[n] hay dp cuối?</div>
            </div>
        </div>

        {/* ───────── FLOWCHART ───────── */}
        <Heading2>📋 Flowchart quyết định nhanh</Heading2>

        <div className="my-6 p-4 rounded-xl bg-slate-800/50 border border-white/10">
            <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-700/40 border border-white/5">
                    <span className="text-orange-400 font-bold whitespace-nowrap">Tìm cặp/nhóm?</span>
                    <span className="text-slate-300">Sorted → <Highlight>Two Pointers</Highlight> · Không sorted → <Highlight>Hash Map</Highlight></span>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-700/40 border border-white/5">
                    <span className="text-orange-400 font-bold whitespace-nowrap">Substring tối ưu?</span>
                    <span className="text-slate-300">→ <Highlight>Sliding Window</Highlight> (+ Hash Map theo dõi tần suất)</span>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-700/40 border border-white/5">
                    <span className="text-orange-400 font-bold whitespace-nowrap">Lồng nhau/ngoặc?</span>
                    <span className="text-slate-300">→ <Highlight>Stack</Highlight></span>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-700/40 border border-white/5">
                    <span className="text-orange-400 font-bold whitespace-nowrap">Duyệt cây/đồ thị?</span>
                    <span className="text-slate-300">Ngắn nhất → <Highlight>BFS</Highlight> · Duyệt hết → <Highlight>DFS</Highlight></span>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-700/40 border border-white/5">
                    <span className="text-orange-400 font-bold whitespace-nowrap">Tìm trong sorted?</span>
                    <span className="text-slate-300">→ <Highlight>Binary Search</Highlight></span>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-700/40 border border-white/5">
                    <span className="text-orange-400 font-bold whitespace-nowrap">Tối ưu hóa?</span>
                    <span className="text-slate-300">Nhiều lựa chọn + bài toán con chồng chéo → <Highlight>Dynamic Programming</Highlight></span>
                </div>
            </div>
        </div>

        {/* ───────── TIPS ───────── */}
        <Heading2>💡 Lời khuyên để nhớ lâu</Heading2>

        <div className="my-6 space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5">
                <span className="text-blue-400 mt-0.5">1.</span>
                <span className="text-slate-300">Làm <Highlight>2-3 bài mỗi pattern</Highlight> trên NeetCode — đã phân loại sẵn theo pattern</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5">
                <span className="text-purple-400 mt-0.5">2.</span>
                <span className="text-slate-300">Không nhớ code, chỉ nhớ <Highlight>&quot;bài toán kiểu này → dùng công cụ gì&quot;</Highlight></span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5">
                <span className="text-green-400 mt-0.5">3.</span>
                <span className="text-slate-300"><Highlight>Spaced repetition</Highlight> — mỗi tuần ôn 1 pattern cũ, làm 1 bài mới</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5">
                <span className="text-yellow-400 mt-0.5">4.</span>
                <span className="text-slate-300">Bắt đầu với <Highlight>NeetCode 150</Highlight> — danh sách tốt nhất cho pattern recognition</span>
            </div>
        </div>

        {/* ===== REAL-WORLD EXAMPLES ===== */}
        <Heading2>🏭 Ví dụ thực tế từ dự án này</Heading2>

        <Paragraph>
            Không chỉ LeetCode — các pattern này xuất hiện <Highlight>hàng ngày</Highlight> trong code thực tế của dự án này:
        </Paragraph>

        <CodeBlock title="Hash Map — O(1) lookup">{`// 📁 ProductTable.tsx — Map thay vì find()
// Thay vì: categories.find(c => c._id === id)?.name  // O(n) mỗi lần render
const categoryMap = useMemo(() => {
    const map = new Map<string, string>()
    categories?.forEach(cat => {
        if (cat._id) map.set(String(cat._id), cat.name)
    })
    return map
}, [categories])
// Dùng: categoryMap.get(categoryId) // O(1)!`}</CodeBlock>

        <CodeBlock title="Greedy / Reduce — Tìm max, tính tổng">{`// 📁 TikTokScheduledPostModal.tsx — Tìm bài schedule trễ nhất (Greedy)
const latest = data.data.reduce((max, post) => {
    const postTime = dayjs(post.scheduledDate + ' ' + post.scheduledTime, 'DD/MM/YYYY HH:mm')
    const maxTime = dayjs(max.scheduledDate + ' ' + max.scheduledTime, 'DD/MM/YYYY HH:mm')
    return postTime.isAfter(maxTime) ? post : max
})
// Giống bài "Maximum Subarray" — reduce tìm phần tử tối ưu!

// 📁 OrderTable.tsx — Tính tổng doanh thu (Accumulator)
const totalRevenue = orders.reduce(
    (acc, curr) => acc + Number(curr.totalPrice), 0
)

// 📁 CartPage.tsx — Tính tổng giỏ hàng (Multi-reduce)
const totalCart = cartList.reduce((acc, { quantity }) => acc + quantity, 0)
const totalPrice = 
    cartList.reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0) +
    addMoreList.reduce((acc, curr) => acc + curr, 0)`}</CodeBlock>

        <CodeBlock title="findIndex + arrayMove — Drag & Drop Reorder">{`// 📁 ShopeeLinksTable.tsx — Kéo thả đổi thứ tự
const handleDragEnd = async (event) => {
    const { active, over } = event

    // 1. Tìm vị trí cũ và mới bằng findIndex — O(n)
    const oldIndex = links.findIndex(link => link._id.toString() === active.id)
    const newIndex = links.findIndex(link => link._id.toString() === over.id)

    // 2. Dời phần tử trong mảng (giống bài Rotate Array!)
    const newLinks = arrayMove(links, oldIndex, newIndex)
    setLinks(newLinks)

    // 3. Cập nhật order cho từng item bằng map + index
    const items = newLinks.map((link, index) => ({
        id: link._id.toString(),
        order: index  // Vị trí mới
    }))
    await apiPost('/api/shopee-links/reorder', { items })
}`}</CodeBlock>

        <CodeBlock title="Sandbox + Timeout — Safe Code Execution">{`// 📁 LeetCodePlayground.tsx — Chạy code an toàn trong iframe
function executeCode(code, testCases) {
    return new Promise((resolve) => {
        const iframe = document.createElement('iframe')
        iframe.sandbox.add('allow-scripts')  // Chỉ cho chạy JS, không truy cập DOM cha

        // ⏰ Time limit — giống bài TLE trên LeetCode!
        const timeout = setTimeout(() => {
            document.body.removeChild(iframe)
            resolve(testCases.map(tc => ({
                passed: false, error: '⏱️ Time Limit Exceeded (5s)'
            })))
        }, 5000)

        // 📨 Nhận kết quả qua postMessage (Inter-process communication)
        window.addEventListener('message', (event) => {
            if (event.data?.type === 'leetcode-result') {
                clearTimeout(timeout)
                resolve(event.data.results)
            }
        })
    })
}`}</CodeBlock>

        <Callout type="tip">
            Luyện tập tại{' '}
            <a href="https://neetcode.io/roadmap" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline hover:text-blue-300">NeetCode Roadmap</a>
            {' '}— phân loại bài theo pattern, có video giải thích chi tiết!
        </Callout>
    </>
)

// ═══════════════════ ENGLISH CONTENT ═══════════════════

const enContent = (
    <>
        <Paragraph>
            Ever stared at a LeetCode problem thinking: <Highlight>&quot;I know I need something... but what?&quot;</Highlight>{' '}
            The issue isn&apos;t ability — it&apos;s lacking a <Highlight>mental map</Highlight> for pattern recognition.
            This post builds that map for you.
        </Paragraph>

        <Callout type="info">
            Don&apos;t memorize code — just remember <InlineCode>this type of problem → use this tool</InlineCode>.
            This is the most important skill in algorithm problem-solving.
        </Callout>

        <Link href="/blogs/hash-map-pattern" className="no-underline hover:opacity-80 transition-opacity block"><Heading2>1. Hash Map / Hash Set — O(1) Lookup →</Heading2></Link>

        <Paragraph>
            <Highlight>When to use?</Highlight> Fast lookup, frequency counting, or checking &quot;have I seen this before?&quot;
        </Paragraph>

        <div className="my-4 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
                <thead><tr className="border-b border-white/10"><th className="text-left p-3 text-slate-400 font-medium">Problem Signal</th><th className="text-left p-3 text-slate-400 font-medium">Example</th></tr></thead>
                <tbody className="text-slate-300">
                    <tr className="border-b border-white/5"><td className="p-3">Find two numbers summing to target</td><td className="p-3">Two Sum</td></tr>
                    <tr className="border-b border-white/5"><td className="p-3">Count occurrences</td><td className="p-3">Frequency Counter</td></tr>
                    <tr className="border-b border-white/5"><td className="p-3">Check for duplicates</td><td className="p-3">Contains Duplicate</td></tr>
                    <tr><td className="p-3">Group similar elements</td><td className="p-3">Group Anagrams</td></tr>
                </tbody>
            </table>
        </div>

        <CodeBlock title="two-sum.js">{`// Two Sum: find 2 numbers summing to target → O(n)
function twoSum(nums, target) {
    const map = new Map()
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i]
        if (map.has(complement)) return [map.get(complement), i]
        map.set(nums[i], i)
    }
}
// Without Map → need two nested loops O(n²)`}</CodeBlock>

        <Link href="/blogs/two-pointers-pattern" className="no-underline hover:opacity-80 transition-opacity block"><Heading2>2. Two Pointers →</Heading2></Link>

        <Paragraph>
            <Highlight>When to use?</Highlight> <Highlight>Sorted</Highlight> array, or need to compare/process from two positions.
        </Paragraph>

        <CodeBlock title="two-pointers.js">{`// Valid Palindrome — O(n)
function isPalindrome(s) {
    s = s.toLowerCase().replace(/[^a-z0-9]/g, '')
    let left = 0, right = s.length - 1
    while (left < right) {
        if (s[left] !== s[right]) return false
        left++; right--
    }
    return true
}

// Two Sum on SORTED array — O(n)
function twoSumSorted(nums, target) {
    let left = 0, right = nums.length - 1
    while (left < right) {
        const sum = nums[left] + nums[right]
        if (sum === target) return [left, right]
        sum < target ? left++ : right--
    }
}`}</CodeBlock>

        <Link href="/blogs/sliding-window-pattern" className="no-underline hover:opacity-80 transition-opacity block"><Heading2>3. Sliding Window →</Heading2></Link>

        <Paragraph>
            <Highlight>When to use?</Highlight> Finding optimal <Highlight>substring/subarray</Highlight> (longest, shortest, max sum...).
        </Paragraph>

        <CodeBlock title="sliding-window.js">{`// Longest Substring Without Repeating Characters — O(n)
function lengthOfLongest(s) {
    const set = new Set()
    let left = 0, maxLen = 0
    for (let right = 0; right < s.length; right++) {
        while (set.has(s[right])) { set.delete(s[left]); left++ }
        set.add(s[right])
        maxLen = Math.max(maxLen, right - left + 1)
    }
    return maxLen
}
// Template: expand right → shrink left when invalid → update best`}</CodeBlock>

        <Link href="/blogs/stack-pattern" className="no-underline hover:opacity-80 transition-opacity block"><Heading2>4. Stack →</Heading2></Link>

        <Paragraph>
            <Highlight>When to use?</Highlight> Nested structures, matching brackets, or finding nearest greater/smaller element. <Highlight>LIFO</Highlight> principle.
        </Paragraph>

        <CodeBlock title="stack.js">{`// Valid Parentheses — O(n)
function isValid(s) {
    const stack = []
    const pairs = { ')': '(', ']': '[', '}': '{' }
    for (const c of s) {
        if ('([{'.includes(c)) stack.push(c)
        else if (stack.pop() !== pairs[c]) return false
    }
    return stack.length === 0
}`}</CodeBlock>

        <Link href="/blogs/bfs-dfs-pattern" className="no-underline hover:opacity-80 transition-opacity block"><Heading2>5. BFS / DFS — Graph & Tree Traversal →</Heading2></Link>

        <Paragraph>
            <Highlight>BFS</Highlight> = breadth-first (Queue) — best for <Highlight>shortest path</Highlight>.{' '}
            <Highlight>DFS</Highlight> = depth-first (Stack/Recursion) — best for <Highlight>exploring all paths</Highlight>.
        </Paragraph>

        <CodeBlock title="bfs-dfs.js">{`// Number of Islands — DFS
function numIslands(grid) {
    let count = 0
    const dfs = (i, j) => {
        if (i < 0 || j < 0 || i >= grid.length || j >= grid[0].length) return
        if (grid[i][j] !== '1') return
        grid[i][j] = '0'
        dfs(i+1,j); dfs(i-1,j); dfs(i,j+1); dfs(i,j-1)
    }
    for (let i = 0; i < grid.length; i++)
        for (let j = 0; j < grid[0].length; j++)
            if (grid[i][j] === '1') { count++; dfs(i,j) }
    return count
}`}</CodeBlock>

        <Link href="/blogs/binary-search-pattern" className="no-underline hover:opacity-80 transition-opacity block"><Heading2>6. Binary Search — O(log n) →</Heading2></Link>

        <Paragraph>
            <Highlight>When to use?</Highlight> <Highlight>Sorted</Highlight> data, or problems with <Highlight>monotonic</Highlight> property. Reduces O(n) to O(log n).
        </Paragraph>

        <CodeBlock title="binary-search.js">{`// Classic Binary Search
function binarySearch(nums, target) {
    let left = 0, right = nums.length - 1
    while (left <= right) {
        const mid = Math.floor((left + right) / 2)
        if (nums[mid] === target) return mid
        nums[mid] < target ? left = mid + 1 : right = mid - 1
    }
    return -1
}

// Binary Search on Answer — find minimum value satisfying condition
function minEatingSpeed(piles, h) {
    let left = 1, right = Math.max(...piles)
    while (left < right) {
        const mid = Math.floor((left + right) / 2)
        const hours = piles.reduce((sum, p) => sum + Math.ceil(p / mid), 0)
        hours <= h ? right = mid : left = mid + 1
    }
    return left
}`}</CodeBlock>

        <Link href="/blogs/dynamic-programming-pattern" className="no-underline hover:opacity-80 transition-opacity block"><Heading2>7. Dynamic Programming →</Heading2></Link>

        <Paragraph>
            <Highlight>When to use?</Highlight> <Highlight>Optimal choices</Highlight> + <Highlight>overlapping subproblems</Highlight>.
            DP = break big problem into subproblems, cache results to avoid recomputation.
        </Paragraph>

        <CodeBlock title="dynamic-programming.js">{`// Climbing Stairs — how many ways to climb n steps (1 or 2 at a time)?
function climbStairs(n) {
    if (n <= 2) return n
    let prev = 1, curr = 2
    for (let i = 3; i <= n; i++) [prev, curr] = [curr, prev + curr]
    return curr
}

// Coin Change — minimum coins to make amount
function coinChange(coins, amount) {
    const dp = new Array(amount + 1).fill(Infinity)
    dp[0] = 0
    for (let i = 1; i <= amount; i++)
        for (const coin of coins)
            if (i >= coin) dp[i] = Math.min(dp[i], dp[i - coin] + 1)
    return dp[amount] === Infinity ? -1 : dp[amount]
}`}</CodeBlock>

        <Heading3>🧠 DP Approach</Heading3>
        <div className="my-6 p-4 rounded-xl bg-slate-800/50 border border-white/10">
            <div className="flex flex-col items-center gap-2 text-sm">
                <div className="px-4 py-2 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30 w-fit">1. Define STATE — what does dp[i] represent?</div>
                <div className="text-slate-600">↓</div>
                <div className="px-4 py-2 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30 w-fit">2. Find TRANSITION — how to compute dp[i] from dp[j]?</div>
                <div className="text-slate-600">↓</div>
                <div className="px-4 py-2 rounded-lg bg-green-500/20 text-green-300 border border-green-500/30 w-fit">3. Set BASE CASE — dp[0], dp[1] = ?</div>
                <div className="text-slate-600">↓</div>
                <div className="px-4 py-2 rounded-lg bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 w-fit">4. Identify ANSWER — return dp[n]?</div>
            </div>
        </div>

        <Heading2>📋 Quick Decision Flowchart</Heading2>

        <div className="my-6 p-4 rounded-xl bg-slate-800/50 border border-white/10">
            <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-700/40 border border-white/5">
                    <span className="text-orange-400 font-bold whitespace-nowrap">Find pairs?</span>
                    <span className="text-slate-300">Sorted → <Highlight>Two Pointers</Highlight> · Unsorted → <Highlight>Hash Map</Highlight></span>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-700/40 border border-white/5">
                    <span className="text-orange-400 font-bold whitespace-nowrap">Optimal substring?</span>
                    <span className="text-slate-300">→ <Highlight>Sliding Window</Highlight></span>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-700/40 border border-white/5">
                    <span className="text-orange-400 font-bold whitespace-nowrap">Nested/brackets?</span>
                    <span className="text-slate-300">→ <Highlight>Stack</Highlight></span>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-700/40 border border-white/5">
                    <span className="text-orange-400 font-bold whitespace-nowrap">Graph/tree?</span>
                    <span className="text-slate-300">Shortest path → <Highlight>BFS</Highlight> · Explore all → <Highlight>DFS</Highlight></span>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-700/40 border border-white/5">
                    <span className="text-orange-400 font-bold whitespace-nowrap">Search sorted?</span>
                    <span className="text-slate-300">→ <Highlight>Binary Search</Highlight></span>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-700/40 border border-white/5">
                    <span className="text-orange-400 font-bold whitespace-nowrap">Optimization?</span>
                    <span className="text-slate-300">Overlapping subproblems → <Highlight>Dynamic Programming</Highlight></span>
                </div>
            </div>
        </div>

        <Heading2>💡 Tips to Remember</Heading2>

        <div className="my-6 space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5">
                <span className="text-blue-400 mt-0.5">1.</span>
                <span className="text-slate-300">Do <Highlight>2-3 problems per pattern</Highlight> on NeetCode — pre-categorized by pattern</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5">
                <span className="text-purple-400 mt-0.5">2.</span>
                <span className="text-slate-300">Don&apos;t memorize code, just remember <Highlight>&quot;this problem type → use this tool&quot;</Highlight></span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5">
                <span className="text-green-400 mt-0.5">3.</span>
                <span className="text-slate-300"><Highlight>Spaced repetition</Highlight> — review 1 old pattern + 1 new problem weekly</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5">
                <span className="text-yellow-400 mt-0.5">4.</span>
                <span className="text-slate-300">Start with <Highlight>NeetCode 150</Highlight> — the best list for pattern recognition</span>
            </div>
        </div>

        {/* ===== REAL-WORLD EXAMPLES ===== */}
        <Heading2>🏭 Real-World Examples from This Project</Heading2>

        <Paragraph>
            Not just LeetCode — these patterns appear <Highlight>daily</Highlight> in this project&#39;s actual code:
        </Paragraph>

        <CodeBlock title="Hash Map — O(1) Lookup">{`// 📁 ProductTable.tsx — Map instead of find()
// Instead of: categories.find(c => c._id === id)?.name  // O(n) each render
const categoryMap = useMemo(() => {
    const map = new Map<string, string>()
    categories?.forEach(cat => {
        if (cat._id) map.set(String(cat._id), cat.name)
    })
    return map
}, [categories])
// Usage: categoryMap.get(categoryId) // O(1)!`}</CodeBlock>

        <CodeBlock title="Greedy / Reduce — Find Max, Calculate Totals">{`// 📁 TikTokScheduledPostModal.tsx — Find latest scheduled post (Greedy)
const latest = data.data.reduce((max, post) => {
    const postTime = dayjs(post.scheduledDate + ' ' + post.scheduledTime, 'DD/MM/YYYY HH:mm')
    const maxTime = dayjs(max.scheduledDate + ' ' + max.scheduledTime, 'DD/MM/YYYY HH:mm')
    return postTime.isAfter(maxTime) ? post : max
})
// Like "Maximum Subarray" — reduce to find the optimal element!

// 📁 OrderTable.tsx — Calculate total revenue (Accumulator)
const totalRevenue = orders.reduce(
    (acc, curr) => acc + Number(curr.totalPrice), 0
)

// 📁 CartPage.tsx — Cart totals (Multi-reduce)
const totalCart = cartList.reduce((acc, { quantity }) => acc + quantity, 0)
const totalPrice = 
    cartList.reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0) +
    addMoreList.reduce((acc, curr) => acc + curr, 0)`}</CodeBlock>

        <CodeBlock title="findIndex + arrayMove — Drag & Drop Reorder">{`// 📁 ShopeeLinksTable.tsx — Drag-and-drop reordering
const handleDragEnd = async (event) => {
    const { active, over } = event

    // 1. Find old and new positions using findIndex — O(n)
    const oldIndex = links.findIndex(link => link._id.toString() === active.id)
    const newIndex = links.findIndex(link => link._id.toString() === over.id)

    // 2. Move element in array (like Rotate Array problem!)
    const newLinks = arrayMove(links, oldIndex, newIndex)
    setLinks(newLinks)

    // 3. Update order for each item using map + index
    const items = newLinks.map((link, index) => ({
        id: link._id.toString(),
        order: index  // New position
    }))
    await apiPost('/api/shopee-links/reorder', { items })
}`}</CodeBlock>

        <CodeBlock title="Sandbox + Timeout — Safe Code Execution">{`// 📁 LeetCodePlayground.tsx — Execute code safely in iframe
function executeCode(code, testCases) {
    return new Promise((resolve) => {
        const iframe = document.createElement('iframe')
        iframe.sandbox.add('allow-scripts')  // Only allow JS, no parent DOM access

        // ⏰ Time limit — just like TLE on LeetCode!
        const timeout = setTimeout(() => {
            document.body.removeChild(iframe)
            resolve(testCases.map(tc => ({
                passed: false, error: '⏱️ Time Limit Exceeded (5s)'
            })))
        }, 5000)

        // 📨 Receive results via postMessage (Inter-process communication)
        window.addEventListener('message', (event) => {
            if (event.data?.type === 'leetcode-result') {
                clearTimeout(timeout)
                resolve(event.data.results)
            }
        })
    })
}`}</CodeBlock>

        <Callout type="tip">
            Practice at{' '}
            <a href="https://neetcode.io/roadmap" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline hover:text-blue-300">NeetCode Roadmap</a>
            {' '}— problems categorized by pattern with detailed video explanations!
        </Callout>
    </>
)

const algorithmPatterns: BlogPost = {
    slug: 'algorithm-patterns',
    title: {
        vi: 'Algorithm Patterns — Bản đồ tư duy giải thuật toán',
        en: 'Algorithm Patterns — Mental Map for Problem Solving',
    },
    description: {
        vi: '7 pattern cốt lõi (Hash Map, Two Pointers, Sliding Window, Stack, BFS/DFS, Binary Search, DP) với code ví dụ và flowchart quyết định nhanh.',
        en: '7 core patterns (Hash Map, Two Pointers, Sliding Window, Stack, BFS/DFS, Binary Search, DP) with code examples and quick decision flowchart.',
    },
    date: '2026-02-26',
    tags: ['Algorithm', 'Data Structure', 'LeetCode', 'Interview'],
    emoji: '🧩',
    color: '#f59e0b',
    content: { vi: viContent, en: enContent },
}

export default algorithmPatterns
