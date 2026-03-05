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
                <ul className="text-[var(--text-secondary)] text-xs space-y-1">
                    <li>• Tìm đường đi <strong>ngắn nhất</strong></li>
                    <li>• Level order traversal</li>
                    <li>• Lan tỏa từ nguồn (rotten oranges)</li>
                    <li>• Cấu trúc: Queue (FIFO)</li>
                </ul>
            </div>
            <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-4">
                <div className="text-green-400 font-bold text-sm mb-2">🌲 DFS — Khi nào?</div>
                <ul className="text-[var(--text-secondary)] text-xs space-y-1">
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

        <Heading2>Cách dùng BFS & DFS</Heading2>

        <CodeBlock title="bfs-dfs-templates.js">{`// ═══ BFS TEMPLATE — dùng Queue (FIFO) ═══
function bfs(graph, start) {
    const queue = [start]             // Khởi tạo queue với điểm xuất phát
    const visited = new Set([start])  // Đánh dấu đã thăm

    while (queue.length > 0) {
        const node = queue.shift()    // Lấy phần tử đầu tiên (FIFO)

        for (const neighbor of graph[node]) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor)
                queue.push(neighbor)  // Thêm hàng xóm vào cuối queue
            }
        }
    }
}

// ═══ DFS TEMPLATE — dùng Đệ quy ═══
function dfs(graph, node, visited = new Set()) {
    if (visited.has(node)) return     // Đã thăm → bỏ qua
    visited.add(node)                 // Đánh dấu

    for (const neighbor of graph[node]) {
        dfs(graph, neighbor, visited) // Đi sâu vào hàng xóm
    }
}

// ═══ DFS TEMPLATE — dùng Stack (không đệ quy) ═══
function dfsIterative(graph, start) {
    const stack = [start]
    const visited = new Set()

    while (stack.length > 0) {
        const node = stack.pop()      // Lấy phần tử cuối (LIFO)
        if (visited.has(node)) continue
        visited.add(node)

        for (const neighbor of graph[node]) {
            if (!visited.has(neighbor)) stack.push(neighbor)
        }
    }
}`}</CodeBlock>

        <Heading2>Khi nào dùng BFS / DFS?</Heading2>

        <div className="my-4 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
                <thead>
                    <tr className="border-b border-[var(--border-primary)]">
                        <th className="text-left p-3 text-[var(--text-secondary)] font-medium">Dấu hiệu bài toán</th>
                        <th className="text-left p-3 text-[var(--text-secondary)] font-medium">Dùng</th>
                        <th className="text-left p-3 text-[var(--text-secondary)] font-medium">LeetCode</th>
                    </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                    <tr className="border-b border-gray-100"><td className="p-3">Đếm số đảo / vùng liên thông</td><td className="p-3">DFS</td><td className="p-3">Number of Islands (#200)</td></tr>
                    <tr className="border-b border-gray-100"><td className="p-3">Duyệt cây theo từng tầng</td><td className="p-3">BFS</td><td className="p-3">Level Order Traversal (#102)</td></tr>
                    <tr className="border-b border-gray-100"><td className="p-3">Tìm từ trong lưới ký tự</td><td className="p-3">DFS</td><td className="p-3">Word Search (#79)</td></tr>
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
        <div className="my-4 space-y-2 text-sm text-[var(--text-secondary)]">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">1.</span>
                <span>Duyệt lưới: gặp ô <InlineCode>&apos;1&apos;</InlineCode> → tìm thấy đảo mới → tăng count.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">2.</span>
                <span>Dùng DFS &quot;nhấn chìm&quot; toàn bộ đảo: đánh dấu tất cả ô <InlineCode>&apos;1&apos;</InlineCode> liên thông thành <InlineCode>&apos;0&apos;</InlineCode>.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">3.</span>
                <span>DFS đệ quy sang 4 hướng: trên, dưới, trái, phải.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
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
        <div className="my-4 space-y-2 text-sm text-[var(--text-secondary)]">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">1.</span>
                <span>Dùng Queue, bắt đầu với node gốc.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">2.</span>
                <span>Mỗi vòng lặp: xử lý <Highlight>tất cả node trong queue hiện tại</Highlight> (= 1 tầng).</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">3.</span>
                <span>Với mỗi node: lấy giá trị, thêm con trái/phải vào queue.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
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
        <div className="my-4 space-y-2 text-sm text-[var(--text-secondary)]">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">1.</span>
                <span>Duyệt lưới tìm ký tự đầu tiên khớp → bắt đầu DFS từ đó.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">2.</span>
                <span>DFS: đánh dấu ô hiện tại (tránh dùng lại), thử 4 hướng cho ký tự tiếp theo.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">3.</span>
                <span><Highlight>Backtrack</Highlight>: sau khi DFS xong, bỏ đánh dấu ô (để đường đi khác có thể dùng).</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
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

        <Heading2>Bài 4: Flood Fill (LeetCode #733)</Heading2>
        <Heading3>Đề bài</Heading3>
        <Paragraph>Tô màu lại tất cả ô <Highlight>cùng màu và kề nhau</Highlight> với ô gốc.</Paragraph>
        <CodeBlock title="flood-fill.js">{`// LeetCode #733: Flood Fill — O(m×n)
function floodFill(image, sr, sc, color) {
    const original = image[sr][sc]
    if (original === color) return image

    function dfs(r, c) {
        if (r < 0 || c < 0 || r >= image.length || c >= image[0].length) return
        if (image[r][c] !== original) return
        image[r][c] = color
        dfs(r+1,c); dfs(r-1,c); dfs(r,c+1); dfs(r,c-1)
    }

    dfs(sr, sc)
    return image
}
// Tương tự "paint bucket" trong Photoshop ✓`}</CodeBlock>

        <Heading2>Bài 5: Rotting Oranges (LeetCode #994)</Heading2>
        <Heading3>Đề bài</Heading3>
        <Paragraph>Cam thối lây lan sang cam tươi kề bên. Tìm <Highlight>số phút nhỏ nhất</Highlight> để tất cả cam thối. BFS multi-source.</Paragraph>
        <CodeBlock title="rotting-oranges.js">{`// LeetCode #994: Rotting Oranges — O(m×n) BFS
function orangesRotting(grid) {
    const queue = []
    let fresh = 0, minutes = 0
    const rows = grid.length, cols = grid[0].length

    for (let i = 0; i < rows; i++)
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === 2) queue.push([i, j])   // Tất cả cam thối
            if (grid[i][j] === 1) fresh++
        }

    const dirs = [[1,0],[-1,0],[0,1],[0,-1]]
    while (queue.length && fresh > 0) {
        const size = queue.length
        for (let i = 0; i < size; i++) {
            const [r, c] = queue.shift()
            for (const [dr, dc] of dirs) {
                const nr = r + dr, nc = c + dc
                if (nr >= 0 && nc >= 0 && nr < rows && nc < cols && grid[nr][nc] === 1) {
                    grid[nr][nc] = 2
                    fresh--
                    queue.push([nr, nc])
                }
            }
        }
        minutes++
    }
    return fresh === 0 ? minutes : -1
}
// BFS lan từ nhiều nguồn cùng lúc → tìm thời gian ngắn nhất ✓`}</CodeBlock>

        <Heading2>Bài 6: Max Area of Island (LeetCode #695)</Heading2>
        <Heading3>Đề bài</Heading3>
        <Paragraph>Tìm <Highlight>diện tích đảo lớn nhất</Highlight> trong lưới 2D.</Paragraph>
        <CodeBlock title="max-area-island.js">{`// LeetCode #695: Max Area of Island — O(m×n)
function maxAreaOfIsland(grid) {
    let maxArea = 0
    const rows = grid.length, cols = grid[0].length

    function dfs(i, j) {
        if (i < 0 || j < 0 || i >= rows || j >= cols || grid[i][j] !== 1) return 0
        grid[i][j] = 0  // Đánh dấu
        return 1 + dfs(i+1,j) + dfs(i-1,j) + dfs(i,j+1) + dfs(i,j-1)
    }

    for (let i = 0; i < rows; i++)
        for (let j = 0; j < cols; j++)
            if (grid[i][j] === 1) maxArea = Math.max(maxArea, dfs(i, j))

    return maxArea
}
// DFS trả về số ô đất của mỗi đảo ✓`}</CodeBlock>

        <Heading2>Bài 7: Course Schedule (LeetCode #207)</Heading2>
        <Heading3>Đề bài</Heading3>
        <Paragraph>Kiểm tra có thể hoàn thành tất cả môn học không (phát hiện <Highlight>chu trình trong đồ thị có hướng</Highlight>).</Paragraph>
        <CodeBlock title="course-schedule.js">{`// LeetCode #207: Course Schedule — O(V + E)
function canFinish(numCourses, prerequisites) {
    const graph = Array.from({ length: numCourses }, () => [])
    const state = new Array(numCourses).fill(0)  // 0: chưa, 1: đang, 2: xong

    for (const [a, b] of prerequisites) graph[b].push(a)

    function hasCycle(node) {
        if (state[node] === 1) return true   // Chu trình!
        if (state[node] === 2) return false
        state[node] = 1
        for (const next of graph[node])
            if (hasCycle(next)) return true
        state[node] = 2
        return false
    }

    for (let i = 0; i < numCourses; i++)
        if (hasCycle(i)) return false
    return true
}
// Topological sort: nếu có cycle → không thể hoàn thành ✓`}</CodeBlock>

        <Heading2>Bài 8: Surrounded Regions (LeetCode #130)</Heading2>
        <Heading3>Đề bài</Heading3>
        <Paragraph>Bắt tất cả vùng 'O' <Highlight>bị bao quanh</Highlight> bởi 'X'. Vùng 'O' chạm biên không bị bắt.</Paragraph>
        <CodeBlock title="surrounded-regions.js">{`// LeetCode #130: Surrounded Regions — O(m×n)
function solve(board) {
    const m = board.length, n = board[0].length

    function dfs(i, j) {
        if (i < 0 || j < 0 || i >= m || j >= n || board[i][j] !== 'O') return
        board[i][j] = 'S'  // Safe (không bị bắt)
        dfs(i+1,j); dfs(i-1,j); dfs(i,j+1); dfs(i,j-1)
    }

    // DFS từ biên: đánh dấu 'O' an toàn
    for (let i = 0; i < m; i++) { dfs(i, 0); dfs(i, n-1) }
    for (let j = 0; j < n; j++) { dfs(0, j); dfs(m-1, j) }

    // 'O' còn lại → bị bao quanh → chuyển thành 'X'
    for (let i = 0; i < m; i++)
        for (let j = 0; j < n; j++) {
            if (board[i][j] === 'O') board[i][j] = 'X'
            if (board[i][j] === 'S') board[i][j] = 'O'
        }
}
// Key: DFS từ biên, không phải DFS từ giữa ✓`}</CodeBlock>

        <Heading2>Bài 9: Nearest Exit from Entrance (LeetCode #1926)</Heading2>
        <Heading3>Đề bài</Heading3>
        <Paragraph>Tìm <Highlight>đường ngắn nhất</Highlight> từ lối vào đến lối ra gần nhất (BFS).</Paragraph>
        <CodeBlock title="nearest-exit.js">{`// LeetCode #1926: Nearest Exit from Entrance — O(m×n)
function nearestExit(maze, entrance) {
    const m = maze.length, n = maze[0].length
    const queue = [[entrance[0], entrance[1], 0]]
    maze[entrance[0]][entrance[1]] = '+'
    const dirs = [[1,0],[-1,0],[0,1],[0,-1]]

    while (queue.length) {
        const [r, c, steps] = queue.shift()
        for (const [dr, dc] of dirs) {
            const nr = r + dr, nc = c + dc
            if (nr < 0 || nc < 0 || nr >= m || nc >= n || maze[nr][nc] === '+') continue
            if (nr === 0 || nc === 0 || nr === m-1 || nc === n-1) return steps + 1
            maze[nr][nc] = '+'
            queue.push([nr, nc, steps + 1])
        }
    }
    return -1
}
// BFS đảm bảo đường ngắn nhất ✓`}</CodeBlock>

        <Heading2>Bài 10: Diameter of Binary Tree (LeetCode #543)</Heading2>
        <Heading3>Đề bài</Heading3>
        <Paragraph>Tìm <Highlight>đường kính</Highlight> của cây nhị phân (đường dài nhất giữa 2 node bất kỳ).</Paragraph>
        <CodeBlock title="diameter-tree.js">{`// LeetCode #543: Diameter of Binary Tree — O(n)
function diameterOfBinaryTree(root) {
    let diameter = 0

    function depth(node) {
        if (!node) return 0
        const left = depth(node.left)
        const right = depth(node.right)
        diameter = Math.max(diameter, left + right)  // Cập nhật đường kính
        return 1 + Math.max(left, right)             // Chiều sâu
    }

    depth(root)
    return diameter
}
// Đường kính = chiều sâu trái + chiều sâu phải tại mỗi node ✓`}</CodeBlock>

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
                <ul className="text-[var(--text-secondary)] text-xs space-y-1">
                    <li>• Find <strong>shortest path</strong></li>
                    <li>• Level order traversal</li>
                    <li>• Spread from source (rotten oranges)</li>
                    <li>• Data structure: Queue (FIFO)</li>
                </ul>
            </div>
            <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-4">
                <div className="text-green-400 font-bold text-sm mb-2">🌲 DFS — When?</div>
                <ul className="text-[var(--text-secondary)] text-xs space-y-1">
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

        <Heading2>How to Use BFS & DFS</Heading2>

        <CodeBlock title="bfs-dfs-templates.js">{`// ═══ BFS TEMPLATE — uses Queue (FIFO) ═══
function bfs(graph, start) {
    const queue = [start]             // Initialize queue with start node
    const visited = new Set([start])  // Mark as visited

    while (queue.length > 0) {
        const node = queue.shift()    // Take first element (FIFO)

        for (const neighbor of graph[node]) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor)
                queue.push(neighbor)  // Add neighbor to end of queue
            }
        }
    }
}

// ═══ DFS TEMPLATE — uses Recursion ═══
function dfs(graph, node, visited = new Set()) {
    if (visited.has(node)) return     // Already visited → skip
    visited.add(node)                 // Mark visited

    for (const neighbor of graph[node]) {
        dfs(graph, neighbor, visited) // Go deeper into neighbor
    }
}

// ═══ DFS TEMPLATE — uses Stack (iterative) ═══
function dfsIterative(graph, start) {
    const stack = [start]
    const visited = new Set()

    while (stack.length > 0) {
        const node = stack.pop()      // Take last element (LIFO)
        if (visited.has(node)) continue
        visited.add(node)

        for (const neighbor of graph[node]) {
            if (!visited.has(neighbor)) stack.push(neighbor)
        }
    }
}`}</CodeBlock>

        <Heading2>When to Use BFS / DFS?</Heading2>

        <div className="my-4 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
                <thead>
                    <tr className="border-b border-[var(--border-primary)]">
                        <th className="text-left p-3 text-[var(--text-secondary)] font-medium">Problem Signal</th>
                        <th className="text-left p-3 text-[var(--text-secondary)] font-medium">Use</th>
                        <th className="text-left p-3 text-[var(--text-secondary)] font-medium">LeetCode</th>
                    </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                    <tr className="border-b border-gray-100"><td className="p-3">Count islands / connected components</td><td className="p-3">DFS</td><td className="p-3">Number of Islands (#200)</td></tr>
                    <tr className="border-b border-gray-100"><td className="p-3">Traverse tree level by level</td><td className="p-3">BFS</td><td className="p-3">Level Order Traversal (#102)</td></tr>
                    <tr className="border-b border-gray-100"><td className="p-3">Find word in character grid</td><td className="p-3">DFS</td><td className="p-3">Word Search (#79)</td></tr>
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
        <div className="my-4 space-y-2 text-sm text-[var(--text-secondary)]">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">1.</span>
                <span>Scan grid: found <InlineCode>&apos;1&apos;</InlineCode> → new island → increment count.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">2.</span>
                <span>DFS &quot;sinks&quot; entire island: mark all connected <InlineCode>&apos;1&apos;</InlineCode> as <InlineCode>&apos;0&apos;</InlineCode>.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
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
        <div className="my-4 space-y-2 text-sm text-[var(--text-secondary)]">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">1.</span>
                <span>Queue starts with root node.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">2.</span>
                <span>Each iteration processes <Highlight>all nodes in current queue</Highlight> (= one level).</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
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
        <div className="my-4 space-y-2 text-sm text-[var(--text-secondary)]">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">1.</span>
                <span>Find first matching character → start DFS.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">2.</span>
                <span>Mark current cell, try 4 directions for next character.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
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

        <Heading2>Problem 4: Flood Fill (LeetCode #733)</Heading2>
        <Heading3>Problem</Heading3>
        <Paragraph>Recolor all <Highlight>same-colored adjacent cells</Highlight> starting from a source cell.</Paragraph>
        <CodeBlock title="flood-fill.js">{`// LeetCode #733: Flood Fill — O(m×n)
function floodFill(image, sr, sc, color) {
    const original = image[sr][sc]
    if (original === color) return image
    function dfs(r, c) {
        if (r < 0 || c < 0 || r >= image.length || c >= image[0].length) return
        if (image[r][c] !== original) return
        image[r][c] = color
        dfs(r+1,c); dfs(r-1,c); dfs(r,c+1); dfs(r,c-1)
    }
    dfs(sr, sc)
    return image
}
// Like "paint bucket" tool ✓`}</CodeBlock>

        <Heading2>Problem 5: Rotting Oranges (LeetCode #994)</Heading2>
        <Heading3>Problem</Heading3>
        <Paragraph>Rotten oranges spread to fresh neighbors. Find <Highlight>minimum minutes</Highlight> until all rotten. Multi-source BFS.</Paragraph>
        <CodeBlock title="rotting-oranges.js">{`// LeetCode #994: Rotting Oranges — O(m×n)
function orangesRotting(grid) {
    const queue = []; let fresh = 0, mins = 0
    const m = grid.length, n = grid[0].length
    for (let i = 0; i < m; i++)
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 2) queue.push([i, j])
            if (grid[i][j] === 1) fresh++
        }
    const dirs = [[1,0],[-1,0],[0,1],[0,-1]]
    while (queue.length && fresh) {
        const size = queue.length
        for (let i = 0; i < size; i++) {
            const [r, c] = queue.shift()
            for (const [dr, dc] of dirs) {
                const nr = r+dr, nc = c+dc
                if (nr>=0 && nc>=0 && nr<m && nc<n && grid[nr][nc]===1) {
                    grid[nr][nc] = 2; fresh--; queue.push([nr, nc])
                }
            }
        }
        mins++
    }
    return fresh === 0 ? mins : -1
}
// Multi-source BFS spreads from all rotten simultaneously ✓`}</CodeBlock>

        <Heading2>Problem 6: Max Area of Island (LeetCode #695)</Heading2>
        <Heading3>Problem</Heading3>
        <Paragraph>Find <Highlight>largest island area</Highlight> in a 2D grid.</Paragraph>
        <CodeBlock title="max-area-island.js">{`// LeetCode #695: Max Area of Island — O(m×n)
function maxAreaOfIsland(grid) {
    let max = 0
    const m = grid.length, n = grid[0].length
    function dfs(i, j) {
        if (i<0 || j<0 || i>=m || j>=n || grid[i][j]!==1) return 0
        grid[i][j] = 0
        return 1 + dfs(i+1,j) + dfs(i-1,j) + dfs(i,j+1) + dfs(i,j-1)
    }
    for (let i = 0; i < m; i++)
        for (let j = 0; j < n; j++)
            if (grid[i][j] === 1) max = Math.max(max, dfs(i, j))
    return max
}
// DFS returns count of land cells per island ✓`}</CodeBlock>

        <Heading2>Problem 7: Course Schedule (LeetCode #207)</Heading2>
        <Heading3>Problem</Heading3>
        <Paragraph>Can you finish all courses? Detect <Highlight>cycle in directed graph</Highlight>.</Paragraph>
        <CodeBlock title="course-schedule.js">{`// LeetCode #207: Course Schedule — O(V + E)
function canFinish(numCourses, prerequisites) {
    const graph = Array.from({ length: numCourses }, () => [])
    const state = new Array(numCourses).fill(0)
    for (const [a, b] of prerequisites) graph[b].push(a)
    function hasCycle(node) {
        if (state[node] === 1) return true
        if (state[node] === 2) return false
        state[node] = 1
        for (const next of graph[node])
            if (hasCycle(next)) return true
        state[node] = 2
        return false
    }
    for (let i = 0; i < numCourses; i++)
        if (hasCycle(i)) return false
    return true
}
// Cycle detection via DFS coloring ✓`}</CodeBlock>

        <Heading2>Problem 8: Surrounded Regions (LeetCode #130)</Heading2>
        <Heading3>Problem</Heading3>
        <Paragraph>Capture all 'O' regions <Highlight>surrounded by 'X'</Highlight>. Border 'O' regions are safe.</Paragraph>
        <CodeBlock title="surrounded-regions.js">{`// LeetCode #130: Surrounded Regions — O(m×n)
function solve(board) {
    const m = board.length, n = board[0].length
    function dfs(i, j) {
        if (i<0 || j<0 || i>=m || j>=n || board[i][j]!=='O') return
        board[i][j] = 'S'
        dfs(i+1,j); dfs(i-1,j); dfs(i,j+1); dfs(i,j-1)
    }
    for (let i = 0; i < m; i++) { dfs(i, 0); dfs(i, n-1) }
    for (let j = 0; j < n; j++) { dfs(0, j); dfs(m-1, j) }
    for (let i = 0; i < m; i++)
        for (let j = 0; j < n; j++) {
            if (board[i][j]==='O') board[i][j]='X'
            if (board[i][j]==='S') board[i][j]='O'
        }
}
// Key: DFS from borders, not from center ✓`}</CodeBlock>

        <Heading2>Problem 9: Nearest Exit from Entrance (LeetCode #1926)</Heading2>
        <Heading3>Problem</Heading3>
        <Paragraph>Find <Highlight>shortest path</Highlight> from entrance to nearest exit in a maze (BFS).</Paragraph>
        <CodeBlock title="nearest-exit.js">{`// LeetCode #1926: Nearest Exit — O(m×n)
function nearestExit(maze, entrance) {
    const m = maze.length, n = maze[0].length
    const queue = [[entrance[0], entrance[1], 0]]
    maze[entrance[0]][entrance[1]] = '+'
    const dirs = [[1,0],[-1,0],[0,1],[0,-1]]
    while (queue.length) {
        const [r, c, steps] = queue.shift()
        for (const [dr, dc] of dirs) {
            const nr = r+dr, nc = c+dc
            if (nr<0||nc<0||nr>=m||nc>=n||maze[nr][nc]==='+') continue
            if (nr===0||nc===0||nr===m-1||nc===n-1) return steps+1
            maze[nr][nc] = '+'
            queue.push([nr, nc, steps+1])
        }
    }
    return -1
}
// BFS guarantees shortest path ✓`}</CodeBlock>

        <Heading2>Problem 10: Diameter of Binary Tree (LeetCode #543)</Heading2>
        <Heading3>Problem</Heading3>
        <Paragraph>Find <Highlight>diameter</Highlight> of a binary tree (longest path between any two nodes).</Paragraph>
        <CodeBlock title="diameter-tree.js">{`// LeetCode #543: Diameter of Binary Tree — O(n)
function diameterOfBinaryTree(root) {
    let diameter = 0
    function depth(node) {
        if (!node) return 0
        const left = depth(node.left), right = depth(node.right)
        diameter = Math.max(diameter, left + right)
        return 1 + Math.max(left, right)
    }
    depth(root)
    return diameter
}
// Diameter = left depth + right depth at each node ✓`}</CodeBlock>

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
    date: '2025-11-19',
    tags: ['Algorithm', 'BFS', 'DFS', 'LeetCode'],
    emoji: '🌲',
    color: '#22c55e',
    content: { vi: viContent, en: enContent },
}

export default bfsDfsPattern
