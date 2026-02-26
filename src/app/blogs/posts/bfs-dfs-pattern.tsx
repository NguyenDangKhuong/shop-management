import { BlogPost } from '../types'
import { CodeBlock, Heading2, Heading3, Paragraph, Highlight, InlineCode, Callout } from '../components/BlogComponents'

const viContent = (
    <>
        <Paragraph>
            <Highlight>BFS</Highlight> (Breadth-First Search) duyệt theo <Highlight>chiều rộng</Highlight> — dùng Queue.{' '}
            <Highlight>DFS</Highlight> (Depth-First Search) duyệt theo <Highlight>chiều sâu</Highlight> — dùng Stack hoặc Đệ quy.
            Đây là hai kỹ thuật nền tảng để duyệt <Highlight>đồ thị</Highlight> và <Highlight>cây</Highlight>.
        </Paragraph>

        <div className="my-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-4">
                <div className="text-blue-400 font-bold text-sm mb-2">🌊 BFS — Khi nào?</div>
                <ul className="text-gray-500 dark:text-slate-400 text-xs space-y-1">
                    <li>• Tìm đường đi <strong>ngắn nhất</strong></li>
                    <li>• Level order traversal</li>
                    <li>• Lan tỏa từ nguồn (rotten oranges)</li>
                    <li>• Cấu trúc: Queue (FIFO)</li>
                </ul>
            </div>
            <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-4">
                <div className="text-green-400 font-bold text-sm mb-2">🌲 DFS — Khi nào?</div>
                <ul className="text-gray-500 dark:text-slate-400 text-xs space-y-1">
                    <li>• Duyệt <strong>tất cả</strong> đường đi</li>
                    <li>• Đếm connected components</li>
                    <li>• Backtracking (sudoku, n-queens)</li>
                    <li>• Cấu trúc: Stack / Đệ quy</li>
                </ul>
            </div>
        </div>

        <Callout type="info">
            Quy tắc: cần đường <Highlight>ngắn nhất</Highlight> → BFS.
            Cần duyệt <Highlight>tất cả</Highlight> hoặc kiểm tra tồn tại → DFS thường đơn giản hơn.
        </Callout>

        <Heading2>Khi nào dùng BFS / DFS?</Heading2>

        <div className="my-4 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
                <thead>
                    <tr className="border-b border-gray-200 dark:border-white/10">
                        <th className="text-left p-3 text-gray-500 dark:text-slate-400 font-medium">Dấu hiệu bài toán</th>
                        <th className="text-left p-3 text-gray-500 dark:text-slate-400 font-medium">Dùng</th>
                        <th className="text-left p-3 text-gray-500 dark:text-slate-400 font-medium">LeetCode</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-slate-300">
                    <tr className="border-b border-gray-100 dark:border-white/5"><td className="p-3">Đếm số đảo / vùng liên thông</td><td className="p-3">DFS</td><td className="p-3">Number of Islands (#200)</td></tr>
                    <tr className="border-b border-gray-100 dark:border-white/5"><td className="p-3">Duyệt cây theo từng tầng</td><td className="p-3">BFS</td><td className="p-3">Level Order Traversal (#102)</td></tr>
                    <tr className="border-b border-gray-100 dark:border-white/5"><td className="p-3">Tìm từ trong lưới ký tự</td><td className="p-3">DFS</td><td className="p-3">Word Search (#79)</td></tr>
                    <tr><td className="p-3">Đường ngắn nhất trong mê cung</td><td className="p-3">BFS</td><td className="p-3">Shortest Path in Binary Matrix (#1091)</td></tr>
                </tbody>
            </table>
        </div>

        {/* ───────── BÀI 1 ───────── */}
        <Heading2>Bài 1: Number of Islands (LeetCode #200)</Heading2>

        <Heading3>Đề bài</Heading3>
        <Paragraph>
            Cho một lưới 2D gồm <InlineCode>&apos;1&apos;</InlineCode> (đất) và <InlineCode>&apos;0&apos;</InlineCode> (nước),
            đếm số <Highlight>đảo</Highlight> (vùng đất liên thông theo 4 hướng).
        </Paragraph>

        <Heading3>Giải pháp với DFS</Heading3>
        <div className="my-4 space-y-2 text-sm text-gray-600 dark:text-slate-300">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">1.</span>
                <span>Duyệt lưới: gặp ô <InlineCode>&apos;1&apos;</InlineCode> → tìm thấy đảo mới → tăng count.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">2.</span>
                <span>Dùng DFS &quot;nhấn chìm&quot; toàn bộ đảo: đánh dấu tất cả ô <InlineCode>&apos;1&apos;</InlineCode> liên thông thành <InlineCode>&apos;0&apos;</InlineCode>.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">3.</span>
                <span>DFS đệ quy sang 4 hướng: trên, dưới, trái, phải.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">4.</span>
                <span>Mỗi lần DFS kết thúc = xử lý xong 1 đảo.</span>
            </div>
        </div>

        <CodeBlock title="number-of-islands.js">{`// LeetCode #200: Number of Islands — O(m×n)
function numIslands(grid) {
    let count = 0
    const rows = grid.length
    const cols = grid[0].length

    // DFS: "nhấn chìm" tất cả ô thuộc cùng đảo
    function dfs(i, j) {
        // Base case: ra ngoài lưới hoặc gặp nước
        if (i < 0 || j < 0 || i >= rows || j >= cols) return
        if (grid[i][j] !== '1') return

        // Đánh dấu đã thăm (biến thành nước)
        grid[i][j] = '0'

        // Đệ quy sang 4 hướng
        dfs(i + 1, j)   // xuống
        dfs(i - 1, j)   // lên
        dfs(i, j + 1)   // phải
        dfs(i, j - 1)   // trái
    }

    // Duyệt toàn bộ lưới
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === '1') {
                count++          // Tìm thấy đảo mới!
                dfs(i, j)        // Nhấn chìm toàn bộ đảo
            }
        }
    }

    return count
}

// Ví dụ:
// grid = [
//   ['1','1','0','0','0'],  ← đảo 1
//   ['1','1','0','0','0'],
//   ['0','0','1','0','0'],  ← đảo 2
//   ['0','0','0','1','1'],  ← đảo 3
// ]
// i=0,j=0: grid[0][0]='1' → count=1, DFS nhấn chìm đảo 1
//   DFS(0,0)→DFS(1,0)→DFS(1,1)→DFS(0,1) → toàn bộ thành '0'
// i=2,j=2: grid[2][2]='1' → count=2, DFS nhấn chìm đảo 2
// i=3,j=3: grid[3][3]='1' → count=3, DFS nhấn chìm đảo 3
// → Kết quả: 3 ✓`}</CodeBlock>

        {/* ───────── BÀI 2 ───────── */}
        <Heading2>Bài 2: Binary Tree Level Order Traversal (LeetCode #102)</Heading2>

        <Heading3>Đề bài</Heading3>
        <Paragraph>
            Cho một cây nhị phân, trả về giá trị các node theo <Highlight>từng tầng</Highlight> (level order).
            Đây là bài toán BFS kinh điển.
        </Paragraph>

        <Heading3>Giải pháp với BFS</Heading3>
        <div className="my-4 space-y-2 text-sm text-gray-600 dark:text-slate-300">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">1.</span>
                <span>Dùng Queue, bắt đầu với node gốc.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">2.</span>
                <span>Mỗi vòng lặp: xử lý <Highlight>tất cả node trong queue hiện tại</Highlight> (= 1 tầng).</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">3.</span>
                <span>Với mỗi node: lấy giá trị, thêm con trái/phải vào queue.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">4.</span>
                <span>Kết thúc khi queue rỗng → đã duyệt hết cây.</span>
            </div>
        </div>

        <CodeBlock title="level-order-traversal.js">{`// LeetCode #102: Binary Tree Level Order Traversal — O(n)
function levelOrder(root) {
    if (!root) return []

    const result = []
    const queue = [root]            // Bắt đầu với node gốc

    while (queue.length > 0) {
        const levelSize = queue.length  // Số node ở tầng hiện tại
        const currentLevel = []

        // Xử lý tất cả node ở tầng này
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift()   // Lấy node đầu queue
            currentLevel.push(node.val)  // Lưu giá trị

            // Thêm con trái/phải vào queue (cho tầng tiếp)
            if (node.left) queue.push(node.left)
            if (node.right) queue.push(node.right)
        }

        result.push(currentLevel)       // Lưu tầng này
    }

    return result
}

// Ví dụ: Cây nhị phân
//        3
//       / \\
//      9   20
//         / \\
//        15   7
//
// Tầng 0: queue=[3], levelSize=1
//   → xử lý 3, thêm 9 và 20 → result=[[3]]
// Tầng 1: queue=[9,20], levelSize=2
//   → xử lý 9 (không con), xử lý 20 (thêm 15,7) → result=[[3],[9,20]]
// Tầng 2: queue=[15,7], levelSize=2
//   → xử lý 15, 7 → result=[[3],[9,20],[15,7]]
// → Kết quả: [[3],[9,20],[15,7]] ✓`}</CodeBlock>

        {/* ───────── BÀI 3 ───────── */}
        <Heading2>Bài 3: Word Search (LeetCode #79)</Heading2>

        <Heading3>Đề bài</Heading3>
        <Paragraph>
            Cho một lưới ký tự và một từ, kiểm tra xem từ đó có thể được tạo thành bằng cách
            đi qua các ô <Highlight>liên tiếp kề nhau</Highlight> (ngang/dọc) không.
            Mỗi ô chỉ được dùng 1 lần. Đây là bài <Highlight>DFS + Backtracking</Highlight>.
        </Paragraph>

        <Heading3>Giải pháp với DFS Backtracking</Heading3>
        <div className="my-4 space-y-2 text-sm text-gray-600 dark:text-slate-300">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">1.</span>
                <span>Duyệt lưới tìm ký tự đầu tiên khớp → bắt đầu DFS từ đó.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">2.</span>
                <span>DFS: đánh dấu ô hiện tại (tránh dùng lại), thử 4 hướng cho ký tự tiếp theo.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">3.</span>
                <span><Highlight>Backtrack</Highlight>: sau khi DFS xong, bỏ đánh dấu ô (để đường đi khác có thể dùng).</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">4.</span>
                <span>Nếu tìm hết ký tự trong word → return true.</span>
            </div>
        </div>

        <CodeBlock title="word-search.js">{`// LeetCode #79: Word Search — O(m×n × 4^len)
function exist(board, word) {
    const rows = board.length
    const cols = board[0].length

    function dfs(i, j, k) {
        // Tìm hết word → thành công!
        if (k === word.length) return true

        // Ngoài lưới hoặc ký tự không khớp
        if (i < 0 || j < 0 || i >= rows || j >= cols) return false
        if (board[i][j] !== word[k]) return false

        // Đánh dấu đã dùng (tạm thay bằng '#')
        const temp = board[i][j]
        board[i][j] = '#'

        // Thử 4 hướng cho ký tự tiếp theo
        const found = dfs(i+1, j, k+1) || dfs(i-1, j, k+1)
                   || dfs(i, j+1, k+1) || dfs(i, j-1, k+1)

        // Backtrack: bỏ đánh dấu
        board[i][j] = temp

        return found
    }

    // Thử bắt đầu từ mọi ô
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (dfs(i, j, 0)) return true
        }
    }
    return false
}

// Ví dụ: board = [['A','B','C','E'],
//                 ['S','F','C','S'],
//                 ['A','D','E','E']]
//        word = "ABCCED"
// Bắt đầu tại (0,0) 'A':
//   (0,0)A → (0,1)B → (0,2)C → (1,2)C → (2,2)E → (2,1)D
//   k=6 === word.length → return true ✓
// Mỗi bước backtrack khôi phục ô đã dùng`}</CodeBlock>

        <Heading2>So sánh BFS vs DFS</Heading2>

        <div className="my-4 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
                <thead>
                    <tr className="border-b border-gray-200 dark:border-white/10">
                        <th className="text-left p-3 text-gray-500 dark:text-slate-400 font-medium">Tiêu chí</th>
                        <th className="text-left p-3 text-gray-500 dark:text-slate-400 font-medium">BFS</th>
                        <th className="text-left p-3 text-gray-500 dark:text-slate-400 font-medium">DFS</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-slate-300">
                    <tr className="border-b border-gray-100 dark:border-white/5"><td className="p-3 font-medium">Cấu trúc dữ liệu</td><td className="p-3">Queue (FIFO)</td><td className="p-3">Stack / Đệ quy</td></tr>
                    <tr className="border-b border-gray-100 dark:border-white/5"><td className="p-3 font-medium">Đường đi ngắn nhất</td><td className="p-3">✅ Đảm bảo</td><td className="p-3">❌ Không</td></tr>
                    <tr className="border-b border-gray-100 dark:border-white/5"><td className="p-3 font-medium">Bộ nhớ (cây rộng)</td><td className="p-3">Nhiều (lưu cả tầng)</td><td className="p-3">Ít (chỉ lưu path)</td></tr>
                    <tr><td className="p-3 font-medium">Dùng khi</td><td className="p-3">Shortest path, level order</td><td className="p-3">Explore all, backtracking</td></tr>
                </tbody>
            </table>
        </div>

        <Callout type="tip">
            Mẹo: Bài toán trên <Highlight>ma trận</Highlight> (grid) thường dùng DFS vì code ngắn gọn.
            Bài toán cần <Highlight>khoảng cách ngắn nhất</Highlight> → phải dùng BFS.
        </Callout>
    </>
)

const enContent = (
    <>
        <Paragraph>
            <Highlight>BFS</Highlight> (Breadth-First Search) explores <Highlight>level by level</Highlight> — uses Queue.{' '}
            <Highlight>DFS</Highlight> (Depth-First Search) explores <Highlight>depth first</Highlight> — uses Stack/Recursion.
            These are the two fundamental techniques for traversing <Highlight>graphs</Highlight> and <Highlight>trees</Highlight>.
        </Paragraph>

        <div className="my-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-4">
                <div className="text-blue-400 font-bold text-sm mb-2">🌊 BFS — When?</div>
                <ul className="text-gray-500 dark:text-slate-400 text-xs space-y-1">
                    <li>• Find <strong>shortest path</strong></li>
                    <li>• Level order traversal</li>
                    <li>• Spread from source (rotten oranges)</li>
                    <li>• Data structure: Queue (FIFO)</li>
                </ul>
            </div>
            <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-4">
                <div className="text-green-400 font-bold text-sm mb-2">🌲 DFS — When?</div>
                <ul className="text-gray-500 dark:text-slate-400 text-xs space-y-1">
                    <li>• Explore <strong>all</strong> paths</li>
                    <li>• Count connected components</li>
                    <li>• Backtracking (sudoku, n-queens)</li>
                    <li>• Data structure: Stack / Recursion</li>
                </ul>
            </div>
        </div>

        <Callout type="info">
            Rule: need <Highlight>shortest path</Highlight> → BFS.
            Need to <Highlight>explore all</Highlight> or check existence → DFS is usually simpler.
        </Callout>

        <Heading2>When to Use BFS / DFS?</Heading2>

        <div className="my-4 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
                <thead>
                    <tr className="border-b border-gray-200 dark:border-white/10">
                        <th className="text-left p-3 text-gray-500 dark:text-slate-400 font-medium">Problem Signal</th>
                        <th className="text-left p-3 text-gray-500 dark:text-slate-400 font-medium">Use</th>
                        <th className="text-left p-3 text-gray-500 dark:text-slate-400 font-medium">LeetCode</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-slate-300">
                    <tr className="border-b border-gray-100 dark:border-white/5"><td className="p-3">Count islands / connected components</td><td className="p-3">DFS</td><td className="p-3">Number of Islands (#200)</td></tr>
                    <tr className="border-b border-gray-100 dark:border-white/5"><td className="p-3">Traverse tree level by level</td><td className="p-3">BFS</td><td className="p-3">Level Order Traversal (#102)</td></tr>
                    <tr className="border-b border-gray-100 dark:border-white/5"><td className="p-3">Find word in character grid</td><td className="p-3">DFS</td><td className="p-3">Word Search (#79)</td></tr>
                    <tr><td className="p-3">Shortest path in maze</td><td className="p-3">BFS</td><td className="p-3">Shortest Path in Binary Matrix (#1091)</td></tr>
                </tbody>
            </table>
        </div>

        <Heading2>Problem 1: Number of Islands (LeetCode #200)</Heading2>

        <Heading3>Problem</Heading3>
        <Paragraph>
            Given a 2D grid of <InlineCode>&apos;1&apos;</InlineCode> (land) and <InlineCode>&apos;0&apos;</InlineCode> (water),
            count the number of <Highlight>islands</Highlight> (connected land regions, 4-directional).
        </Paragraph>

        <Heading3>DFS Solution</Heading3>
        <div className="my-4 space-y-2 text-sm text-gray-600 dark:text-slate-300">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">1.</span>
                <span>Scan grid: found <InlineCode>&apos;1&apos;</InlineCode> → new island → increment count.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">2.</span>
                <span>DFS &quot;sinks&quot; entire island: mark all connected <InlineCode>&apos;1&apos;</InlineCode> as <InlineCode>&apos;0&apos;</InlineCode>.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">3.</span>
                <span>Recurse in 4 directions: up, down, left, right.</span>
            </div>
        </div>

        <CodeBlock title="number-of-islands.js">{`// LeetCode #200: Number of Islands — O(m×n)
function numIslands(grid) {
    let count = 0
    const rows = grid.length, cols = grid[0].length

    function dfs(i, j) {
        if (i < 0 || j < 0 || i >= rows || j >= cols) return
        if (grid[i][j] !== '1') return
        grid[i][j] = '0'       // Mark visited
        dfs(i+1, j); dfs(i-1, j); dfs(i, j+1); dfs(i, j-1)
    }

    for (let i = 0; i < rows; i++)
        for (let j = 0; j < cols; j++)
            if (grid[i][j] === '1') { count++; dfs(i, j) }

    return count
}

// Walkthrough:
// grid = [['1','1','0'],
//         ['1','0','0'],
//         ['0','0','1']]
// (0,0)='1' → count=1, DFS sinks (0,0),(0,1),(1,0)
// (2,2)='1' → count=2, DFS sinks (2,2)
// Result: 2 ✓`}</CodeBlock>

        <Heading2>Problem 2: Binary Tree Level Order (LeetCode #102)</Heading2>

        <Heading3>Problem</Heading3>
        <Paragraph>
            Given a binary tree, return node values <Highlight>level by level</Highlight>. Classic BFS problem.
        </Paragraph>

        <Heading3>BFS Solution</Heading3>
        <div className="my-4 space-y-2 text-sm text-gray-600 dark:text-slate-300">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">1.</span>
                <span>Queue starts with root node.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">2.</span>
                <span>Each iteration processes <Highlight>all nodes in current queue</Highlight> (= one level).</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">3.</span>
                <span>For each node: record value, enqueue children.</span>
            </div>
        </div>

        <CodeBlock title="level-order.js">{`// LeetCode #102: Level Order Traversal — O(n)
function levelOrder(root) {
    if (!root) return []
    const result = [], queue = [root]

    while (queue.length) {
        const levelSize = queue.length
        const level = []
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift()
            level.push(node.val)
            if (node.left) queue.push(node.left)
            if (node.right) queue.push(node.right)
        }
        result.push(level)
    }
    return result
}

// Walkthrough: tree = [3, 9, 20, null, null, 15, 7]
//        3
//       / \\
//      9   20
//         / \\
//        15   7
// Level 0: queue=[3] → process 3, add 9,20 → [[3]]
// Level 1: queue=[9,20] → process both → [[3],[9,20]]
// Level 2: queue=[15,7] → process both → [[3],[9,20],[15,7]] ✓`}</CodeBlock>

        <Heading2>Problem 3: Word Search (LeetCode #79)</Heading2>

        <Heading3>Problem</Heading3>
        <Paragraph>
            Given a character grid and a word, check if the word can be formed by traversing
            <Highlight>adjacent cells</Highlight> (horizontally/vertically). Each cell used at most once.
            This is <Highlight>DFS + Backtracking</Highlight>.
        </Paragraph>

        <Heading3>DFS Backtracking Solution</Heading3>
        <div className="my-4 space-y-2 text-sm text-gray-600 dark:text-slate-300">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">1.</span>
                <span>Find first matching character → start DFS.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">2.</span>
                <span>Mark current cell, try 4 directions for next character.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/5">
                <span className="text-blue-400 font-bold">3.</span>
                <span><Highlight>Backtrack</Highlight>: unmark cell after DFS (allow other paths).</span>
            </div>
        </div>

        <CodeBlock title="word-search.js">{`// LeetCode #79: Word Search — O(m×n × 4^len)
function exist(board, word) {
    const rows = board.length, cols = board[0].length

    function dfs(i, j, k) {
        if (k === word.length) return true               // Found all!
        if (i < 0 || j < 0 || i >= rows || j >= cols) return false
        if (board[i][j] !== word[k]) return false

        const temp = board[i][j]
        board[i][j] = '#'           // Mark used
        const found = dfs(i+1,j,k+1) || dfs(i-1,j,k+1)
                   || dfs(i,j+1,k+1) || dfs(i,j-1,k+1)
        board[i][j] = temp          // Backtrack: unmark
        return found
    }

    for (let i = 0; i < rows; i++)
        for (let j = 0; j < cols; j++)
            if (dfs(i, j, 0)) return true
    return false
}

// Walkthrough: board=[['A','B'],['C','D']], word="ABDC"
// Start (0,0) 'A' matches word[0]
//   → (0,1) 'B' matches word[1]
//     → (1,1) 'D' matches word[2]
//       → (1,0) 'C' matches word[3]
//         k=4 === word.length → return true ✓`}</CodeBlock>

        <Heading2>BFS vs DFS Comparison</Heading2>

        <div className="my-4 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
                <thead>
                    <tr className="border-b border-gray-200 dark:border-white/10">
                        <th className="text-left p-3 text-gray-500 dark:text-slate-400 font-medium">Criteria</th>
                        <th className="text-left p-3 text-gray-500 dark:text-slate-400 font-medium">BFS</th>
                        <th className="text-left p-3 text-gray-500 dark:text-slate-400 font-medium">DFS</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-slate-300">
                    <tr className="border-b border-gray-100 dark:border-white/5"><td className="p-3 font-medium">Data structure</td><td className="p-3">Queue (FIFO)</td><td className="p-3">Stack / Recursion</td></tr>
                    <tr className="border-b border-gray-100 dark:border-white/5"><td className="p-3 font-medium">Shortest path</td><td className="p-3">✅ Guaranteed</td><td className="p-3">❌ No</td></tr>
                    <tr className="border-b border-gray-100 dark:border-white/5"><td className="p-3 font-medium">Memory (wide tree)</td><td className="p-3">High (stores level)</td><td className="p-3">Low (stores path)</td></tr>
                    <tr><td className="p-3 font-medium">Use when</td><td className="p-3">Shortest path, level order</td><td className="p-3">Explore all, backtracking</td></tr>
                </tbody>
            </table>
        </div>

        <Callout type="tip">
            Tip: <Highlight>Grid</Highlight> problems typically use DFS for cleaner code.
            Problems needing <Highlight>shortest distance</Highlight> → must use BFS.
        </Callout>
    </>
)

const bfsDfsPattern: BlogPost = {
    slug: 'bfs-dfs-pattern',
    title: {
        vi: 'BFS / DFS — Duyệt đồ thị và cây',
        en: 'BFS / DFS — Graph & Tree Traversal',
    },
    description: {
        vi: 'Giải thích chi tiết BFS và DFS với LeetCode: Number of Islands, Level Order Traversal, Word Search. So sánh BFS vs DFS và khi nào dùng.',
        en: 'Deep dive into BFS and DFS with LeetCode: Number of Islands, Level Order Traversal, Word Search. BFS vs DFS comparison.',
    },
    date: '2026-02-26',
    tags: ['Algorithm', 'BFS', 'DFS', 'LeetCode'],
    emoji: '🌲',
    color: '#22c55e',
    content: { vi: viContent, en: enContent },
}

export default bfsDfsPattern
