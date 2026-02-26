import { BlogPost } from '../types'
import { CodeBlock, Heading2, Heading3, Paragraph, Highlight, InlineCode, Callout } from '../components/BlogComponents'

const viContent = (
    <>
        <Paragraph>
            <Highlight>Dynamic Programming (DP)</Highlight> là kỹ thuật chia bài toán lớn thành các <Highlight>bài toán con chồng chéo</Highlight>,
            giải mỗi bài toán con một lần và <Highlight>lưu kết quả</Highlight> để không tính lại.
            DP biến giải pháp đệ quy O(2ⁿ) thành O(n) hoặc O(n²).
        </Paragraph>

        <Callout type="info">
            DP = Đệ quy + Ghi nhớ (Memoization). Nếu bạn có thể giải bằng đệ quy và thấy có bài toán con lặp lại,
            đó chính là lúc dùng DP.
        </Callout>

        <Heading2>Khi nào dùng Dynamic Programming?</Heading2>

        <div className="my-4 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
                <thead>
                    <tr className="border-b border-gray-200 dark:border-white/10">
                        <th className="text-left p-3 text-gray-500 dark:text-slate-400 font-medium">Từ khóa trong đề</th>
                        <th className="text-left p-3 text-gray-500 dark:text-slate-400 font-medium">Ví dụ LeetCode</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-slate-300">
                    <tr className="border-b border-gray-100 dark:border-white/5"><td className="p-3">&quot;Có bao nhiêu cách...&quot;</td><td className="p-3">Climbing Stairs (#70)</td></tr>
                    <tr className="border-b border-gray-100 dark:border-white/5"><td className="p-3">&quot;Giá trị lớn nhất/nhỏ nhất&quot;</td><td className="p-3">Coin Change (#322)</td></tr>
                    <tr className="border-b border-gray-100 dark:border-white/5"><td className="p-3">&quot;Chuỗi con chung dài nhất&quot;</td><td className="p-3">Longest Common Subsequence (#1143)</td></tr>
                    <tr className="border-b border-gray-100 dark:border-white/5"><td className="p-3">&quot;Có thể đạt được hay không&quot;</td><td className="p-3">House Robber (#198)</td></tr>
                    <tr><td className="p-3">&quot;Chia mảng thành...&quot;</td><td className="p-3">Partition Equal Subset Sum (#416)</td></tr>
                </tbody>
            </table>
        </div>

        <Heading2>Cách tiếp cận DP — 4 bước</Heading2>

        <div className="my-6 p-4 rounded-xl bg-gray-100 dark:bg-slate-800/50 border border-gray-200 dark:border-white/10">
            <div className="flex flex-col items-center gap-2 text-sm">
                <div className="px-4 py-2 rounded-lg bg-blue-500/20 text-blue-600 dark:text-blue-300 border border-blue-500/30 w-fit">1. Xác định STATE — dp[i] đại diện cho gì?</div>
                <div className="text-gray-400 dark:text-slate-600">↓</div>
                <div className="px-4 py-2 rounded-lg bg-purple-500/20 text-purple-600 dark:text-purple-300 border border-purple-500/30 w-fit">2. Tìm TRANSITION — dp[i] tính từ dp[j] nào?</div>
                <div className="text-gray-400 dark:text-slate-600">↓</div>
                <div className="px-4 py-2 rounded-lg bg-green-500/20 text-green-600 dark:text-green-300 border border-green-500/30 w-fit">3. Xác định BASE CASE — dp[0], dp[1] = ?</div>
                <div className="text-gray-400 dark:text-slate-600">↓</div>
                <div className="px-4 py-2 rounded-lg bg-yellow-500/20 text-yellow-600 dark:text-yellow-300 border border-yellow-500/30 w-fit">4. Xác định ANSWER — return dp[n] hay dp cuối?</div>
            </div>
        </div>

        {/* ───────── BÀI 1 ───────── */}
        <Heading2>Bài 1: Climbing Stairs (LeetCode #70)</Heading2>

        <Heading3>Đề bài</Heading3>
        <Paragraph>
            Bạn leo cầu thang <InlineCode>n</InlineCode> bậc, mỗi bước có thể leo <Highlight>1 hoặc 2 bậc</Highlight>.
            Hỏi có bao nhiêu cách để lên tới đỉnh?
        </Paragraph>

        <Heading3>Giải pháp với DP</Heading3>
        <div className="my-4 space-y-2 text-sm text-gray-600 dark:text-slate-300">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">STATE</span>
                <span><InlineCode>dp[i]</InlineCode> = số cách để leo tới bậc i.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-purple-400 font-bold">TRANSITION</span>
                <span><InlineCode>dp[i] = dp[i-1] + dp[i-2]</InlineCode> (bước 1 bậc từ i-1, hoặc 2 bậc từ i-2).</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-green-400 font-bold">BASE</span>
                <span><InlineCode>dp[1] = 1</InlineCode> (1 cách), <InlineCode>dp[2] = 2</InlineCode> (2 cách: 1+1 hoặc 2).</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-yellow-400 font-bold">ANSWER</span>
                <span>return <InlineCode>dp[n]</InlineCode>.</span>
            </div>
        </div>

        <CodeBlock title="climbing-stairs.js">{`// LeetCode #70: Climbing Stairs — O(n) time, O(1) space
function climbStairs(n) {
    if (n <= 2) return n

    // Chỉ cần 2 biến thay vì mảng dp (tối ưu space)
    let prev = 1    // dp[i-2] — ban đầu là dp[1]
    let curr = 2    // dp[i-1] — ban đầu là dp[2]

    for (let i = 3; i <= n; i++) {
        // dp[i] = dp[i-1] + dp[i-2] (giống Fibonacci!)
        const next = prev + curr
        prev = curr     // dp[i-2] = dp[i-1] cũ
        curr = next     // dp[i-1] = dp[i] vừa tính
    }

    return curr
}

// Ví dụ: n = 5
// dp[1] = 1, dp[2] = 2
// i=3: dp[3] = dp[2] + dp[1] = 2 + 1 = 3
// i=4: dp[4] = dp[3] + dp[2] = 3 + 2 = 5
// i=5: dp[5] = dp[4] + dp[3] = 5 + 3 = 8
// → Kết quả: 8 cách ✓
// (1+1+1+1+1, 2+1+1+1, 1+2+1+1, 1+1+2+1, 1+1+1+2,
//  2+2+1, 2+1+2, 1+2+2)`}</CodeBlock>

        {/* ───────── BÀI 2 ───────── */}
        <Heading2>Bài 2: Coin Change (LeetCode #322)</Heading2>

        <Heading3>Đề bài</Heading3>
        <Paragraph>
            Cho các mệnh giá đồng xu <InlineCode>coins</InlineCode> và tổng tiền <InlineCode>amount</InlineCode>,
            tìm <Highlight>số đồng xu ít nhất</Highlight> để tạo thành amount. Nếu không thể → trả về -1.
        </Paragraph>

        <Heading3>Giải pháp với DP</Heading3>
        <div className="my-4 space-y-2 text-sm text-gray-600 dark:text-slate-300">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">STATE</span>
                <span><InlineCode>dp[i]</InlineCode> = số xu ít nhất để tạo ra i đồng.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-purple-400 font-bold">TRANSITION</span>
                <span>Với mỗi coin: <InlineCode>dp[i] = min(dp[i], dp[i - coin] + 1)</InlineCode>.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-green-400 font-bold">BASE</span>
                <span><InlineCode>dp[0] = 0</InlineCode> (0 xu để tạo 0 đồng). Còn lại = Infinity.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-yellow-400 font-bold">ANSWER</span>
                <span><InlineCode>dp[amount]</InlineCode> (nếu === Infinity thì trả -1).</span>
            </div>
        </div>

        <CodeBlock title="coin-change.js">{`// LeetCode #322: Coin Change — O(amount × coins) time
function coinChange(coins, amount) {
    // Khởi tạo: dp[0] = 0, còn lại = Infinity (chưa biết)
    const dp = new Array(amount + 1).fill(Infinity)
    dp[0] = 0

    // Tính dp[1], dp[2], ..., dp[amount]
    for (let i = 1; i <= amount; i++) {
        for (const coin of coins) {
            // Nếu có thể dùng coin này (i >= coin)
            // và dp[i - coin] có lời giải (không phải Infinity)
            if (i >= coin) {
                // Chọn: dùng coin này + dp[i-coin] hay giữ dp[i] cũ?
                dp[i] = Math.min(dp[i], dp[i - coin] + 1)
            }
        }
    }

    // Infinity nghĩa là không thể tạo được
    return dp[amount] === Infinity ? -1 : dp[amount]
}

// Ví dụ: coins = [1, 3, 4], amount = 6
// dp = [0, Inf, Inf, Inf, Inf, Inf, Inf]
//
// i=1: coin=1 → dp[1]=min(Inf, dp[0]+1)=1
//      coin=3 → 1<3 skip. coin=4 → 1<4 skip
//      dp[1] = 1
// i=2: coin=1 → dp[2]=min(Inf, dp[1]+1)=2
//      dp[2] = 2
// i=3: coin=1 → dp[3]=min(Inf, dp[2]+1)=3
//      coin=3 → dp[3]=min(3, dp[0]+1)=1  ← dùng 1 xu (3)!
//      dp[3] = 1
// i=4: coin=1 → dp[4]=min(Inf, dp[3]+1)=2
//      coin=3 → dp[4]=min(2, dp[1]+1)=2
//      coin=4 → dp[4]=min(2, dp[0]+1)=1  ← dùng 1 xu (4)!
//      dp[4] = 1
// i=5: ... dp[5] = 2 (4+1 hoặc 3+1+1)
// i=6: ... dp[6] = 2 (3+3)
// → Kết quả: 2 ✓`}</CodeBlock>

        {/* ───────── BÀI 3 ───────── */}
        <Heading2>Bài 3: Longest Common Subsequence (LeetCode #1143)</Heading2>

        <Heading3>Đề bài</Heading3>
        <Paragraph>
            Cho hai chuỗi <InlineCode>text1</InlineCode> và <InlineCode>text2</InlineCode>, tìm độ dài
            <Highlight>chuỗi con chung dài nhất</Highlight> (subsequence — không cần liên tiếp).
            Đây là bài DP 2 chiều kinh điển.
        </Paragraph>

        <Heading3>Giải pháp với DP 2D</Heading3>
        <div className="my-4 space-y-2 text-sm text-gray-600 dark:text-slate-300">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">STATE</span>
                <span><InlineCode>dp[i][j]</InlineCode> = LCS của text1[0..i-1] và text2[0..j-1].</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-purple-400 font-bold">TRANSITION</span>
                <span>Nếu <InlineCode>text1[i-1] === text2[j-1]</InlineCode> → <InlineCode>dp[i][j] = dp[i-1][j-1] + 1</InlineCode><br />
                    Ngược lại → <InlineCode>dp[i][j] = max(dp[i-1][j], dp[i][j-1])</InlineCode></span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-green-400 font-bold">BASE</span>
                <span><InlineCode>dp[0][j] = 0</InlineCode> và <InlineCode>dp[i][0] = 0</InlineCode> (chuỗi rỗng).</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-yellow-400 font-bold">ANSWER</span>
                <span><InlineCode>dp[m][n]</InlineCode> (góc dưới phải của bảng).</span>
            </div>
        </div>

        <CodeBlock title="longest-common-subsequence.js">{`// LeetCode #1143: Longest Common Subsequence — O(m×n)
function longestCommonSubsequence(text1, text2) {
    const m = text1.length
    const n = text2.length

    // Tạo bảng dp (m+1) × (n+1), khởi tạo = 0
    const dp = Array.from({ length: m + 1 }, () =>
        new Array(n + 1).fill(0)
    )

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                // Ký tự khớp! LCS tăng 1
                dp[i][j] = dp[i - 1][j - 1] + 1
            } else {
                // Không khớp → lấy max của bỏ ký tự từ text1 hoặc text2
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
            }
        }
    }

    return dp[m][n]
}

// Ví dụ: text1 = "abcde", text2 = "ace"
//
//     ""  a  c  e
// ""   0  0  0  0
// a    0  1  1  1   ← 'a'='a' → dp[1][1]=dp[0][0]+1=1
// b    0  1  1  1   ← 'b'≠'a','c','e' → lấy max trên/trái
// c    0  1  2  2   ← 'c'='c' → dp[3][2]=dp[2][1]+1=2
// d    0  1  2  2
// e    0  1  2  3   ← 'e'='e' → dp[5][3]=dp[4][2]+1=3
//
// → LCS = 3 ("ace") ✓`}</CodeBlock>

        <Heading2>Top-Down vs Bottom-Up</Heading2>

        <div className="my-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-4">
                <div className="text-blue-400 font-bold text-sm mb-2">⬇️ Top-Down (Memoization)</div>
                <ul className="text-gray-500 dark:text-slate-400 text-xs space-y-1">
                    <li>• Đệ quy + cache kết quả</li>
                    <li>• Dễ viết hơn (giống đệ quy)</li>
                    <li>• Chỉ tính state cần thiết</li>
                    <li>• Có thể stack overflow</li>
                </ul>
            </div>
            <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-4">
                <div className="text-green-400 font-bold text-sm mb-2">⬆️ Bottom-Up (Tabulation)</div>
                <ul className="text-gray-500 dark:text-slate-400 text-xs space-y-1">
                    <li>• Dùng vòng lặp + mảng dp</li>
                    <li>• Hiệu quả hơn (không đệ quy)</li>
                    <li>• Tính tất cả state</li>
                    <li>• Có thể tối ưu space</li>
                </ul>
            </div>
        </div>

        <CodeBlock title="top-down-example.js">{`// Top-Down: Fibonacci với memoization
function climbStairsTopDown(n) {
    const memo = new Map()

    function dp(i) {
        if (i <= 2) return i
        if (memo.has(i)) return memo.get(i)  // Đã tính rồi → dùng lại

        const result = dp(i - 1) + dp(i - 2)
        memo.set(i, result)                   // Lưu kết quả
        return result
    }

    return dp(n)
}

// Không có memo: dp(5) tính dp(3) hai lần, dp(2) ba lần → O(2ⁿ)
// Có memo: mỗi dp(i) chỉ tính 1 lần → O(n)`}</CodeBlock>

        <Callout type="tip">
            Mẹo nhớ: <Highlight>Top-Down</Highlight> = &quot;tôi cần dp(n), nếu chưa có thì tính&quot; (lazy).{' '}
            <Highlight>Bottom-Up</Highlight> = &quot;tính từ dp(0) lên dp(n)&quot; (eager).
            Phỏng vấn thường yêu cầu Bottom-Up vì dễ tối ưu space.
        </Callout>
    </>
)

const enContent = (
    <>
        <Paragraph>
            <Highlight>Dynamic Programming (DP)</Highlight> breaks large problems into <Highlight>overlapping subproblems</Highlight>,
            solves each once and <Highlight>caches results</Highlight> to avoid recomputation.
            DP transforms O(2ⁿ) recursive solutions into O(n) or O(n²).
        </Paragraph>

        <Callout type="info">
            DP = Recursion + Memoization. If you can solve it recursively and notice repeated subproblems,
            that&apos;s when to use DP.
        </Callout>

        <Heading2>When to Use Dynamic Programming?</Heading2>

        <div className="my-4 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
                <thead>
                    <tr className="border-b border-gray-200 dark:border-white/10">
                        <th className="text-left p-3 text-gray-500 dark:text-slate-400 font-medium">Problem Keywords</th>
                        <th className="text-left p-3 text-gray-500 dark:text-slate-400 font-medium">LeetCode Example</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-slate-300">
                    <tr className="border-b border-gray-100 dark:border-white/5"><td className="p-3">&quot;How many ways...&quot;</td><td className="p-3">Climbing Stairs (#70)</td></tr>
                    <tr className="border-b border-gray-100 dark:border-white/5"><td className="p-3">&quot;Find maximum/minimum value&quot;</td><td className="p-3">Coin Change (#322)</td></tr>
                    <tr className="border-b border-gray-100 dark:border-white/5"><td className="p-3">&quot;Longest common subsequence&quot;</td><td className="p-3">LCS (#1143)</td></tr>
                    <tr className="border-b border-gray-100 dark:border-white/5"><td className="p-3">&quot;Can you achieve...&quot;</td><td className="p-3">House Robber (#198)</td></tr>
                    <tr><td className="p-3">&quot;Partition into...&quot;</td><td className="p-3">Partition Equal Subset Sum (#416)</td></tr>
                </tbody>
            </table>
        </div>

        <Heading2>DP Approach — 4 Steps</Heading2>

        <div className="my-6 p-4 rounded-xl bg-gray-100 dark:bg-slate-800/50 border border-gray-200 dark:border-white/10">
            <div className="flex flex-col items-center gap-2 text-sm">
                <div className="px-4 py-2 rounded-lg bg-blue-500/20 text-blue-600 dark:text-blue-300 border border-blue-500/30 w-fit">1. Define STATE — what does dp[i] represent?</div>
                <div className="text-gray-400 dark:text-slate-600">↓</div>
                <div className="px-4 py-2 rounded-lg bg-purple-500/20 text-purple-600 dark:text-purple-300 border border-purple-500/30 w-fit">2. Find TRANSITION — how to compute dp[i] from dp[j]?</div>
                <div className="text-gray-400 dark:text-slate-600">↓</div>
                <div className="px-4 py-2 rounded-lg bg-green-500/20 text-green-600 dark:text-green-300 border border-green-500/30 w-fit">3. Set BASE CASE — dp[0], dp[1] = ?</div>
                <div className="text-gray-400 dark:text-slate-600">↓</div>
                <div className="px-4 py-2 rounded-lg bg-yellow-500/20 text-yellow-600 dark:text-yellow-300 border border-yellow-500/30 w-fit">4. Identify ANSWER — return dp[n]?</div>
            </div>
        </div>

        <Heading2>Problem 1: Climbing Stairs (LeetCode #70)</Heading2>

        <Heading3>Problem</Heading3>
        <Paragraph>
            You&apos;re climbing a staircase of <InlineCode>n</InlineCode> steps, taking <Highlight>1 or 2 steps</Highlight> at a time.
            How many distinct ways to reach the top?
        </Paragraph>

        <Heading3>DP Solution</Heading3>
        <div className="my-4 space-y-2 text-sm text-gray-600 dark:text-slate-300">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">STATE</span>
                <span><InlineCode>dp[i]</InlineCode> = number of ways to reach step i.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-purple-400 font-bold">TRANSITION</span>
                <span><InlineCode>dp[i] = dp[i-1] + dp[i-2]</InlineCode> (from step i-1 or i-2).</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-green-400 font-bold">BASE</span>
                <span><InlineCode>dp[1] = 1</InlineCode>, <InlineCode>dp[2] = 2</InlineCode>.</span>
            </div>
        </div>

        <CodeBlock title="climbing-stairs.js">{`// LeetCode #70: Climbing Stairs — O(n) time, O(1) space
function climbStairs(n) {
    if (n <= 2) return n
    let prev = 1, curr = 2

    for (let i = 3; i <= n; i++) {
        const next = prev + curr  // Fibonacci!
        prev = curr
        curr = next
    }
    return curr
}

// Walkthrough: n = 5
// dp[1]=1, dp[2]=2
// i=3: 1+2=3, i=4: 2+3=5, i=5: 3+5=8
// Result: 8 ways ✓`}</CodeBlock>

        <Heading2>Problem 2: Coin Change (LeetCode #322)</Heading2>

        <Heading3>Problem</Heading3>
        <Paragraph>
            Given coin denominations <InlineCode>coins</InlineCode> and a total <InlineCode>amount</InlineCode>,
            find the <Highlight>minimum number of coins</Highlight> to make the amount. Return -1 if impossible.
        </Paragraph>

        <Heading3>DP Solution</Heading3>
        <div className="my-4 space-y-2 text-sm text-gray-600 dark:text-slate-300">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">STATE</span>
                <span><InlineCode>dp[i]</InlineCode> = minimum coins to make amount i.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-purple-400 font-bold">TRANSITION</span>
                <span>For each coin: <InlineCode>dp[i] = min(dp[i], dp[i - coin] + 1)</InlineCode>.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-green-400 font-bold">BASE</span>
                <span><InlineCode>dp[0] = 0</InlineCode>, rest = Infinity.</span>
            </div>
        </div>

        <CodeBlock title="coin-change.js">{`// LeetCode #322: Coin Change — O(amount × coins)
function coinChange(coins, amount) {
    const dp = new Array(amount + 1).fill(Infinity)
    dp[0] = 0

    for (let i = 1; i <= amount; i++)
        for (const coin of coins)
            if (i >= coin)
                dp[i] = Math.min(dp[i], dp[i - coin] + 1)

    return dp[amount] === Infinity ? -1 : dp[amount]
}

// Walkthrough: coins = [1, 3, 4], amount = 6
// dp[0]=0
// dp[1]=1(1), dp[2]=2(1+1), dp[3]=1(3)
// dp[4]=1(4), dp[5]=2(4+1), dp[6]=2(3+3)
// Result: 2 ✓`}</CodeBlock>

        <Heading2>Problem 3: Longest Common Subsequence (LeetCode #1143)</Heading2>

        <Heading3>Problem</Heading3>
        <Paragraph>
            Given two strings, find the length of the <Highlight>longest common subsequence</Highlight>
            (subsequence — doesn&apos;t need to be contiguous). Classic 2D DP.
        </Paragraph>

        <Heading3>2D DP Solution</Heading3>
        <div className="my-4 space-y-2 text-sm text-gray-600 dark:text-slate-300">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">STATE</span>
                <span><InlineCode>dp[i][j]</InlineCode> = LCS of text1[0..i-1] and text2[0..j-1].</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-purple-400 font-bold">TRANSITION</span>
                <span>Match → <InlineCode>dp[i-1][j-1] + 1</InlineCode>. No match → <InlineCode>max(dp[i-1][j], dp[i][j-1])</InlineCode></span>
            </div>
        </div>

        <CodeBlock title="lcs.js">{`// LeetCode #1143: Longest Common Subsequence — O(m×n)
function longestCommonSubsequence(text1, text2) {
    const m = text1.length, n = text2.length
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0))

    for (let i = 1; i <= m; i++)
        for (let j = 1; j <= n; j++)
            if (text1[i-1] === text2[j-1])
                dp[i][j] = dp[i-1][j-1] + 1    // Match!
            else
                dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1])

    return dp[m][n]
}

// Walkthrough: "abcde" vs "ace"
//     ""  a  c  e
// ""   0  0  0  0
// a    0  1  1  1  ← 'a'='a' → 0+1=1
// b    0  1  1  1
// c    0  1  2  2  ← 'c'='c' → 1+1=2
// d    0  1  2  2
// e    0  1  2  3  ← 'e'='e' → 2+1=3
// Result: 3 ("ace") ✓`}</CodeBlock>

        <Heading2>Top-Down vs Bottom-Up</Heading2>

        <div className="my-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-4">
                <div className="text-blue-400 font-bold text-sm mb-2">⬇️ Top-Down (Memoization)</div>
                <ul className="text-gray-500 dark:text-slate-400 text-xs space-y-1">
                    <li>• Recursion + cache results</li>
                    <li>• Easier to write</li>
                    <li>• Only computes needed states</li>
                    <li>• Risk of stack overflow</li>
                </ul>
            </div>
            <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-4">
                <div className="text-green-400 font-bold text-sm mb-2">⬆️ Bottom-Up (Tabulation)</div>
                <ul className="text-gray-500 dark:text-slate-400 text-xs space-y-1">
                    <li>• Loops + dp array</li>
                    <li>• More efficient (no recursion)</li>
                    <li>• Computes all states</li>
                    <li>• Can optimize space</li>
                </ul>
            </div>
        </div>

        <Callout type="tip">
            Remember: <Highlight>Top-Down</Highlight> = &quot;I need dp(n), compute if missing&quot; (lazy).{' '}
            <Highlight>Bottom-Up</Highlight> = &quot;compute dp(0) up to dp(n)&quot; (eager).
            Interviews usually prefer Bottom-Up for space optimization.
        </Callout>
    </>
)

const dynamicProgrammingPattern: BlogPost = {
    slug: 'dynamic-programming-pattern',
    title: {
        vi: 'Dynamic Programming — Quy hoạch động',
        en: 'Dynamic Programming — The DP Technique',
    },
    description: {
        vi: 'Giải thích chi tiết DP với LeetCode: Climbing Stairs, Coin Change, Longest Common Subsequence. Top-Down vs Bottom-Up, 4 bước tiếp cận DP.',
        en: 'Deep dive into DP with LeetCode: Climbing Stairs, Coin Change, LCS. Top-Down vs Bottom-Up, 4-step DP approach.',
    },
    date: '2026-02-26',
    tags: ['Algorithm', 'Dynamic Programming', 'LeetCode'],
    emoji: '🧠',
    color: '#ec4899',
    content: { vi: viContent, en: enContent },
}

export default dynamicProgrammingPattern
