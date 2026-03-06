'use client'

import { useState, useCallback, useEffect } from 'react'

// ═══════════════════════════════════════════════
//  Flashcard Data
// ═══════════════════════════════════════════════

interface Flashcard {
    id: string
    pattern: string
    emoji: string
    color: string
    front: {
        signal: string
        question: string
    }
    back: {
        approach: string
        template: string
        complexity: string
        example: string
    }
}

const flashcards: Flashcard[] = [
    {
        id: 'hashmap-twosum',
        pattern: 'HashMap',
        emoji: '🗂️',
        color: '#4ade80',
        front: {
            signal: 'Tìm 2 phần tử có tổng = target',
            question: 'nums = [2,7,11,15], target = 9 → ?',
        },
        back: {
            approach: 'Duyệt 1 lần, check Map trước, lưu Map sau',
            template: `const map = new Map()
for (let i = 0; i < nums.length; i++) {
  const comp = target - nums[i]
  if (map.has(comp)) return [map.get(comp), i]
  map.set(nums[i], i)
}`,
            complexity: 'Time: O(n) | Space: O(n)',
            example: 'Two Sum, Group Anagrams, Contains Duplicate',
        },
    },
    {
        id: 'hashmap-frequency',
        pattern: 'HashMap',
        emoji: '🗂️',
        color: '#4ade80',
        front: {
            signal: 'Đếm tần suất / frequency count',
            question: '"aabbccc" → {a:2, b:2, c:3}',
        },
        back: {
            approach: 'Duyệt 1 lần, dùng Map đếm số lần xuất hiện',
            template: `const freq = new Map()
for (const char of str) {
  freq.set(char, (freq.get(char) || 0) + 1)
}`,
            complexity: 'Time: O(n) | Space: O(k) k=unique chars',
            example: 'Valid Anagram, Top K Frequent, First Unique Char',
        },
    },
    {
        id: 'two-pointers-sorted',
        pattern: 'Two Pointers',
        emoji: '👉👈',
        color: '#60a5fa',
        front: {
            signal: 'Sorted array + tìm cặp thỏa điều kiện',
            question: 'sorted = [1,3,5,7], target = 8 → ?',
        },
        back: {
            approach: '2 con trỏ từ 2 đầu, thu hẹp dần',
            template: `let left = 0, right = arr.length - 1
while (left < right) {
  const sum = arr[left] + arr[right]
  if (sum === target) return [left, right]
  if (sum < target) left++
  else right--
}`,
            complexity: 'Time: O(n) | Space: O(1)',
            example: 'Two Sum II, Container With Most Water, 3Sum',
        },
    },
    {
        id: 'two-pointers-reverse',
        pattern: 'Two Pointers',
        emoji: '👉👈',
        color: '#60a5fa',
        front: {
            signal: 'Đảo ngược / Palindrome check',
            question: '"racecar" → true (palindrome)',
        },
        back: {
            approach: '2 con trỏ từ 2 đầu, so sánh và thu hẹp',
            template: `let left = 0, right = s.length - 1
while (left < right) {
  if (s[left] !== s[right]) return false
  left++
  right--
}
return true`,
            complexity: 'Time: O(n) | Space: O(1)',
            example: 'Valid Palindrome, Reverse String, Remove Duplicates',
        },
    },
    {
        id: 'sliding-window-fixed',
        pattern: 'Sliding Window',
        emoji: '🪟',
        color: '#fbbf24',
        front: {
            signal: 'Subarray/substring liên tục có kích thước k',
            question: 'Max sum subarray size k=3: [1,4,2,10,2,3,1,0,20]',
        },
        back: {
            approach: 'Window cố định size k, trượt từ trái sang phải',
            template: `let windowSum = 0, maxSum = 0
for (let i = 0; i < arr.length; i++) {
  windowSum += arr[i]
  if (i >= k) windowSum -= arr[i - k]
  if (i >= k - 1) maxSum = Math.max(maxSum, windowSum)
}`,
            complexity: 'Time: O(n) | Space: O(1)',
            example: 'Max Avg Subarray, Max Sum Subarray Size K',
        },
    },
    {
        id: 'sliding-window-variable',
        pattern: 'Sliding Window',
        emoji: '🪟',
        color: '#fbbf24',
        front: {
            signal: 'Substring/subarray ngắn nhất/dài nhất thỏa điều kiện',
            question: 'Longest substring without repeating chars',
        },
        back: {
            approach: 'for mở rộng right, while thu hẹp left khi invalid',
            template: `let left = 0, maxLen = 0
const set = new Set()
for (let right = 0; right < s.length; right++) {
  while (set.has(s[right])) {
    set.delete(s[left])
    left++
  }
  set.add(s[right])
  maxLen = Math.max(maxLen, right - left + 1)
}`,
            complexity: 'Time: O(n) | Space: O(k)',
            example: 'Longest Substring No Repeat, Min Window Substring',
        },
    },
    {
        id: 'stack-parentheses',
        pattern: 'Stack',
        emoji: '📚',
        color: '#a78bfa',
        front: {
            signal: 'Dấu ngoặc, matching pairs, undo/redo',
            question: '"({[]})" → valid, "([)]" → invalid',
        },
        back: {
            approach: 'Gặp mở → push, gặp đóng → pop + kiểm tra match',
            template: `const stack = []
const map = { ')': '(', ']': '[', '}': '{' }
for (const c of s) {
  if ('([{'.includes(c)) stack.push(c)
  else if (stack.pop() !== map[c]) return false
}
return stack.length === 0`,
            complexity: 'Time: O(n) | Space: O(n)',
            example: 'Valid Parentheses, Min Remove Invalid Parens',
        },
    },
    {
        id: 'stack-monotonic',
        pattern: 'Stack',
        emoji: '📚',
        color: '#a78bfa',
        front: {
            signal: 'Next Greater / Smaller Element',
            question: '[2,1,2,4,3] → next greater: [4,2,4,-1,-1]',
        },
        back: {
            approach: 'Monotonic stack: pop khi gặp phần tử lớn/nhỏ hơn top',
            template: `const result = new Array(n).fill(-1)
const stack = [] // chứa indices
for (let i = 0; i < nums.length; i++) {
  while (stack.length && nums[stack.at(-1)] < nums[i]) {
    result[stack.pop()] = nums[i]
  }
  stack.push(i)
}`,
            complexity: 'Time: O(n) | Space: O(n)',
            example: 'Next Greater Element, Daily Temperatures, Stock Span',
        },
    },
    {
        id: 'binary-search',
        pattern: 'Binary Search',
        emoji: '🔍',
        color: '#f472b6',
        front: {
            signal: 'Tìm trong sorted array / tìm boundary',
            question: 'sorted = [1,3,5,7,9], target = 5 → index 2',
        },
        back: {
            approach: 'while left <= right, chia đôi, so sánh mid',
            template: `let left = 0, right = arr.length - 1
while (left <= right) {
  const mid = Math.floor((left + right) / 2)
  if (arr[mid] === target) return mid
  if (arr[mid] < target) left = mid + 1
  else right = mid - 1
}
return -1`,
            complexity: 'Time: O(log n) | Space: O(1)',
            example: 'Binary Search, Search Insert Position, Peak Element',
        },
    },
    {
        id: 'bfs',
        pattern: 'BFS',
        emoji: '🌊',
        color: '#06b6d4',
        front: {
            signal: 'Level-order traversal / Shortest path (unweighted)',
            question: 'Tree level order: [[3],[9,20],[15,7]]',
        },
        back: {
            approach: 'Queue + while, xử lý từng level',
            template: `const queue = [root]
while (queue.length) {
  const levelSize = queue.length
  for (let i = 0; i < levelSize; i++) {
    const node = queue.shift()
    // process node
    if (node.left) queue.push(node.left)
    if (node.right) queue.push(node.right)
  }
}`,
            complexity: 'Time: O(n) | Space: O(n)',
            example: 'Level Order Traversal, Rotting Oranges, Word Ladder',
        },
    },
    {
        id: 'dfs',
        pattern: 'DFS',
        emoji: '🌲',
        color: '#22c55e',
        front: {
            signal: 'Duyệt hết nhánh / Path sum / Đảo cây',
            question: 'Max depth of binary tree',
        },
        back: {
            approach: 'Recursive: base case + gọi left/right',
            template: `function dfs(node) {
  if (!node) return 0 // base case
  const left = dfs(node.left)
  const right = dfs(node.right)
  return Math.max(left, right) + 1
}`,
            complexity: 'Time: O(n) | Space: O(h) h=height',
            example: 'Max Depth, Invert Tree, Path Sum, Same Tree',
        },
    },
    {
        id: 'dp-fibonacci',
        pattern: 'Dynamic Programming',
        emoji: '📊',
        color: '#f97316',
        front: {
            signal: 'Đếm số cách / tối ưu min-max với subproblems chồng nhau',
            question: 'Climbing stairs: mỗi bước 1 hoặc 2 bậc → bao nhiêu cách?',
        },
        back: {
            approach: 'dp[i] phụ thuộc vào dp[i-1], dp[i-2]...',
            template: `const dp = new Array(n + 1).fill(0)
dp[0] = 1
dp[1] = 1
for (let i = 2; i <= n; i++) {
  dp[i] = dp[i - 1] + dp[i - 2]
}
return dp[n]`,
            complexity: 'Time: O(n) | Space: O(n) → O(1) optimized',
            example: 'Climbing Stairs, House Robber, Coin Change, Fibonacci',
        },
    },
    {
        id: 'backtracking',
        pattern: 'Backtracking',
        emoji: '🔙',
        color: '#ec4899',
        front: {
            signal: 'Tất cả combinations / permutations / subsets',
            question: '[1,2,3] → subsets: [],[1],[2],[3],[1,2],[1,3],[2,3],[1,2,3]',
        },
        back: {
            approach: 'Chọn → Explore → Bỏ chọn (backtrack)',
            template: `function backtrack(start, current) {
  result.push([...current])
  for (let i = start; i < nums.length; i++) {
    current.push(nums[i])      // chọn
    backtrack(i + 1, current)   // explore
    current.pop()               // bỏ chọn
  }
}`,
            complexity: 'Time: O(2^n) | Space: O(n)',
            example: 'Subsets, Permutations, Combination Sum, N-Queens',
        },
    },
]

// ═══════════════════════════════════════════════
//  Study Tips Component
// ═══════════════════════════════════════════════

function StudyTips() {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className="mt-8">
            <button
                onClick={() => setIsOpen(o => !o)}
                className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200"
                style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-primary)',
                    color: 'var(--text-secondary)',
                }}
            >
                {isOpen ? '▼' : '▶'} 🧠 Cách ghi nhớ cú pháp thuật toán
            </button>
            {isOpen && (
                <div className="mt-3 p-5 rounded-xl text-sm leading-relaxed space-y-6"
                    style={{ background: 'var(--bg-card)', border: '1px solid var(--border-primary)', color: 'var(--text-secondary)' }}>

                    {/* Tip 1 */}
                    <div>
                        <h3 className="font-bold text-[var(--text-primary)] mb-2">1. Nhớ Pattern, không nhớ code</h3>
                        <p className="mb-2 text-[var(--text-muted)]">Đừng cố thuộc từng dòng code. Nhớ <strong className="text-[var(--text-primary)]">skeleton</strong> (bộ khung) của mỗi pattern:</p>
                        <pre className="p-3 rounded-lg text-xs font-mono leading-relaxed" style={{ background: 'var(--bg-tag)', border: '1px solid var(--border-primary)' }}>
                            {`🗂️ HashMap:      "Duyệt 1 lần, check Map trước, lưu Map sau"
👉 Two Pointers:  "2 con trỏ, thu hẹp từ 2 đầu"
🪟 Sliding Window: "for mở rộng right, while thu hẹp left"
📚 Stack:         "Gặp mở → push, gặp đóng → pop + kiểm tra"
🔍 Binary Search: "while left <= right, mid = floor((l+r)/2)"`}
                        </pre>
                    </div>

                    {/* Tip 2 */}
                    <div>
                        <h3 className="font-bold text-[var(--text-primary)] mb-2">2. Viết pseudocode bằng tiếng Việt trước</h3>
                        <pre className="p-3 rounded-lg text-xs font-mono leading-relaxed" style={{ background: 'var(--bg-tag)', border: '1px solid var(--border-primary)' }}>
                            {`// Two Sum - HashMap:
// 1. Tạo Map rỗng
// 2. Duyệt từng số:
//    - Tính complement = target - số hiện tại
//    - Map có complement? → trả kết quả
//    - Chưa có? → lưu số hiện tại vào Map`}
                        </pre>
                        <p className="mt-2 text-[var(--text-muted)]">Phỏng vấn: nghĩ bằng tiếng Việt → dịch ra code sẽ dễ hơn nhiều.</p>
                    </div>

                    {/* Tip 3 */}
                    <div>
                        <h3 className="font-bold text-[var(--text-primary)] mb-2">3. Quy tắc 3 lần viết tay</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-xs border-collapse">
                                <thead><tr className="border-b border-[var(--border-primary)]">
                                    <th className="text-left p-2 text-[var(--text-muted)]">Lần</th>
                                    <th className="text-left p-2 text-[var(--text-muted)]">Cách làm</th>
                                </tr></thead>
                                <tbody>
                                    <tr className="border-b border-[var(--border-primary)]"><td className="p-2 font-semibold">Lần 1</td><td className="p-2">Đọc solution, hiểu logic, tự code lại</td></tr>
                                    <tr className="border-b border-[var(--border-primary)]"><td className="p-2 font-semibold">Lần 2</td><td className="p-2">Ngày hôm sau, code lại <strong>không xem</strong> solution</td></tr>
                                    <tr><td className="p-2 font-semibold">Lần 3</td><td className="p-2">1 tuần sau, code lại lần nữa</td></tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="mt-2 text-[var(--text-muted)]">Sau 3 lần → bộ khung algorithm thành <strong className="text-[var(--text-primary)]">muscle memory</strong> 💪</p>
                    </div>

                    {/* Tip 4 */}
                    <div>
                        <h3 className="font-bold text-[var(--text-primary)] mb-2">4. Tạo flashcard cho mỗi pattern</h3>
                        <pre className="p-3 rounded-lg text-xs font-mono leading-relaxed" style={{ background: 'var(--bg-tag)', border: '1px solid var(--border-primary)' }}>
                            {`📌 Mặt trước: "Tìm 2 số cộng = target"
📌 Mặt sau:
   - Pattern: HashMap
   - Key insight: complement = target - num
   - Template: Map + 1 vòng for + check trước lưu sau
   - Time: O(n), Space: O(n)`}
                        </pre>
                    </div>

                    {/* Tip 5 */}
                    <div>
                        <h3 className="font-bold text-[var(--text-primary)] mb-2">5. Nhóm bài theo tín hiệu nhận diện</h3>
                        <pre className="p-3 rounded-lg text-xs font-mono leading-relaxed" style={{ background: 'var(--bg-tag)', border: '1px solid var(--border-primary)' }}>
                            {`Thấy "2 số cộng = X"             → HashMap
Thấy "sorted array + 2 phần tử"  → Two Pointers
Thấy "substring/subarray liên tục" → Sliding Window
Thấy "dấu ngoặc, undo/redo"      → Stack
Thấy "tìm trong sorted"           → Binary Search
Thấy "tất cả combinations"        → Backtracking`}
                        </pre>
                        <p className="mt-2 text-[var(--text-muted)]">Phỏng vấn = <strong className="text-[var(--text-primary)]">nhận diện pattern</strong> + <strong className="text-[var(--text-primary)]">viết template</strong> + <strong className="text-[var(--text-primary)]">custom logic</strong></p>
                    </div>

                    {/* Tip 6 */}
                    <div>
                        <h3 className="font-bold text-[var(--text-primary)] mb-2">6. 🔥 Mẹo: Code mỗi ngày 1 bài, 30 ngày</h3>
                        <pre className="p-3 rounded-lg text-xs font-mono leading-relaxed" style={{ background: 'var(--bg-tag)', border: '1px solid var(--border-primary)' }}>
                            {`Tuần 1: HashMap (5 bài) + Two Pointers (2 bài)
Tuần 2: Sliding Window (3 bài) + Stack (4 bài)
Tuần 3: BFS/DFS (5 bài) + Binary Search (2 bài)
Tuần 4: DP Easy (3 bài) + Ôn lại tuần 1-3`}
                        </pre>
                        <p className="mt-2 text-[var(--text-muted)]">Sau 30 ngày, mấy cái template sẽ <strong className="text-[var(--text-primary)]">tự động chảy ra tay</strong> mà không cần nghĩ! 🚀</p>
                    </div>
                </div>
            )}
        </div>
    )
}

// ═══════════════════════════════════════════════
//  Flashcard Component
// ═══════════════════════════════════════════════

export default function FlashcardApp() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isFlipped, setIsFlipped] = useState(false)
    const [knownCards, setKnownCards] = useState<Set<string>>(new Set())
    const [cards, setCards] = useState(flashcards)
    const [showShortcuts, setShowShortcuts] = useState(false)

    const card = cards[currentIndex]
    const progress = knownCards.size
    const total = cards.length

    const shuffle = useCallback(() => {
        setCards(prev => [...prev].sort(() => Math.random() - 0.5))
        setCurrentIndex(0)
        setIsFlipped(false)
    }, [])

    const goNext = useCallback(() => {
        setIsFlipped(false)
        setTimeout(() => setCurrentIndex(i => (i + 1) % cards.length), 150)
    }, [cards.length])

    const goPrev = useCallback(() => {
        setIsFlipped(false)
        setTimeout(() => setCurrentIndex(i => (i - 1 + cards.length) % cards.length), 150)
    }, [cards.length])

    const toggleKnown = useCallback(() => {
        setKnownCards(prev => {
            const next = new Set(prev)
            if (next.has(card.id)) next.delete(card.id)
            else next.add(card.id)
            return next
        })
    }, [card?.id])

    // Keyboard shortcuts
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); setIsFlipped(f => !f) }
            if (e.key === 'ArrowRight' || e.key === 'l') goNext()
            if (e.key === 'ArrowLeft' || e.key === 'h') goPrev()
            if (e.key === 'k') toggleKnown()
            if (e.key === 's') shuffle()
        }
        window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
    }, [goNext, goPrev, toggleKnown, shuffle])

    return (
        <div className="dark">
            <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] p-4 sm:p-8">
                <div className="max-w-2xl mx-auto">
                    {/* Progress + Counter */}
                    <div className="mb-6">
                        <div className="flex justify-between text-xs text-[var(--text-muted)] mb-1">
                            <span>🧠 Đã thuộc: {progress}/{total}</span>
                            <span>{currentIndex + 1} / {cards.length}</span>
                        </div>
                        <div className="h-2 rounded-full bg-[var(--bg-tag)] overflow-hidden">
                            <div
                                className="h-full rounded-full transition-all duration-500"
                                style={{
                                    width: `${(progress / total) * 100}%`,
                                    background: 'linear-gradient(90deg, #4ade80, #22d3ee, #818cf8)',
                                }}
                            />
                        </div>
                    </div>

                    {/* Flashcard */}
                    <div
                        className="relative cursor-pointer mb-6"
                        style={{ perspective: '1000px', minHeight: '380px' }}
                        onClick={() => setIsFlipped(f => !f)}
                    >
                        <div
                            className="relative w-full transition-transform duration-500"
                            style={{
                                transformStyle: 'preserve-3d',
                                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                                minHeight: '380px',
                            }}
                        >
                            {/* FRONT — chỉ hiện bài toán, KHÔNG hiện pattern */}
                            <div
                                className="absolute inset-0 rounded-2xl p-6 sm:p-8 flex flex-col justify-between"
                                style={{
                                    backfaceVisibility: 'hidden',
                                    background: `linear-gradient(135deg, var(--bg-card), var(--bg-surface))`,
                                    border: '1px solid var(--border-primary)',
                                    boxShadow: 'var(--shadow-xl)',
                                }}
                            >
                                <div>
                                    <div className="mb-2">
                                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-[var(--bg-tag)] border border-[var(--border-primary)] text-[var(--text-muted)]">
                                            🤔 Bài toán này dùng thuật toán gì?
                                        </span>
                                    </div>

                                    <div className="mb-6 mt-6">
                                        <p className="text-xl sm:text-2xl font-bold leading-snug">{card?.front.signal}</p>
                                    </div>

                                    <div className="p-4 rounded-xl bg-[var(--bg-tag)] border border-[var(--border-primary)]">
                                        <p className="text-[var(--text-muted)] text-xs mb-1">Ví dụ:</p>
                                        <code className="text-sm text-[var(--text-secondary)] font-mono">{card?.front.question}</code>
                                    </div>
                                </div>

                                <p className="text-center text-[var(--text-muted)] text-xs mt-4 animate-pulse">
                                    👆 Click để xem đáp án
                                </p>
                            </div>

                            {/* BACK */}
                            <div
                                className="absolute inset-0 rounded-2xl p-6 sm:p-8 overflow-y-auto"
                                style={{
                                    backfaceVisibility: 'hidden',
                                    transform: 'rotateY(180deg)',
                                    background: `linear-gradient(135deg, var(--bg-card), var(--bg-surface))`,
                                    border: `1px solid ${card?.color}33`,
                                    boxShadow: `0 0 40px ${card?.color}15`,
                                }}
                            >
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-2xl">{card?.emoji}</span>
                                    <span
                                        className="px-3 py-1 rounded-full text-xs font-bold"
                                        style={{
                                            background: `${card?.color}20`,
                                            color: card?.color,
                                            border: `1px solid ${card?.color}40`,
                                        }}
                                    >
                                        {card?.pattern}
                                    </span>
                                </div>

                                <div className="mb-3">
                                    <p className="text-[var(--text-muted)] text-xs uppercase tracking-wider mb-1">Cách tiếp cận</p>
                                    <p className="text-base font-semibold" style={{ color: card?.color }}>{card?.back.approach}</p>
                                </div>

                                <div className="mb-3">
                                    <p className="text-[var(--text-muted)] text-xs uppercase tracking-wider mb-1">Template Code</p>
                                    <pre
                                        className="p-3 rounded-xl text-xs font-mono overflow-x-auto leading-relaxed"
                                        style={{
                                            background: 'var(--bg-tag)',
                                            border: '1px solid var(--border-primary)',
                                            color: 'var(--text-secondary)',
                                        }}
                                    >
                                        {card?.back.template}
                                    </pre>
                                </div>

                                <div className="flex gap-3 text-xs">
                                    <div className="flex-1 p-2 rounded-lg bg-[var(--bg-tag)] border border-[var(--border-primary)]">
                                        <span className="text-[var(--text-muted)]">⏱️ </span>
                                        <span className="text-[var(--text-secondary)]">{card?.back.complexity}</span>
                                    </div>
                                </div>

                                <div className="mt-3">
                                    <p className="text-[var(--text-muted)] text-xs uppercase tracking-wider mb-1">Bài LeetCode</p>
                                    <p className="text-xs text-[var(--text-secondary)]">{card?.back.example}</p>
                                </div>

                                <p className="text-center text-[var(--text-muted)] text-xs mt-3">
                                    👆 Click để quay lại
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-center gap-3">
                        <button
                            onClick={(e) => { e.stopPropagation(); goPrev() }}
                            className="w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all duration-200 hover:scale-110"
                            style={{ background: 'var(--bg-tag)', border: '1px solid var(--border-primary)' }}
                            title="Trước (←)"
                        >
                            ←
                        </button>

                        <button
                            onClick={(e) => { e.stopPropagation(); setIsFlipped(f => !f) }}
                            className="px-5 h-12 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 hover:scale-105"
                            style={{
                                background: 'rgba(56, 189, 248, 0.15)',
                                border: '1px solid rgba(56, 189, 248, 0.4)',
                                color: '#38bdf8',
                            }}
                            title="Lật thẻ (Space)"
                        >
                            🔄 Lật
                        </button>

                        <button
                            onClick={(e) => { e.stopPropagation(); shuffle() }}
                            className="px-5 h-12 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 hover:scale-105"
                            style={{
                                background: 'rgba(251, 191, 36, 0.15)',
                                border: '1px solid rgba(251, 191, 36, 0.4)',
                                color: '#fbbf24',
                            }}
                            title="Trộn thẻ (S)"
                        >
                            🎲 Trộn
                        </button>

                        <button
                            onClick={(e) => { e.stopPropagation(); toggleKnown() }}
                            className="px-5 h-12 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 hover:scale-105"
                            style={{
                                background: knownCards.has(card?.id) ? 'rgba(74, 222, 128, 0.2)' : 'var(--bg-tag)',
                                border: knownCards.has(card?.id) ? '1px solid rgba(74, 222, 128, 0.5)' : '1px solid var(--border-primary)',
                                color: knownCards.has(card?.id) ? '#4ade80' : 'var(--text-secondary)',
                            }}
                            title="Đánh dấu đã thuộc (K)"
                        >
                            {knownCards.has(card?.id) ? '✅ Thuộc' : '☐ Thuộc?'}
                        </button>

                        <button
                            onClick={(e) => { e.stopPropagation(); goNext() }}
                            className="w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all duration-200 hover:scale-110"
                            style={{ background: 'var(--bg-tag)', border: '1px solid var(--border-primary)' }}
                            title="Sau (→)"
                        >
                            →
                        </button>
                    </div>

                    {/* Keyboard Shortcuts */}
                    <div className="mt-8 text-center">
                        <button
                            onClick={() => setShowShortcuts(s => !s)}
                            className="text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
                        >
                            ⌨️ {showShortcuts ? 'Ẩn' : 'Hiện'} phím tắt
                        </button>
                        {showShortcuts && (
                            <div className="mt-2 grid grid-cols-2 gap-1 max-w-xs mx-auto text-xs text-[var(--text-muted)]">
                                <span className="text-right pr-2"><kbd className="px-1.5 py-0.5 rounded bg-[var(--bg-tag)] border border-[var(--border-primary)] font-mono">Space</kbd></span>
                                <span className="text-left">Lật thẻ</span>
                                <span className="text-right pr-2"><kbd className="px-1.5 py-0.5 rounded bg-[var(--bg-tag)] border border-[var(--border-primary)] font-mono">← →</kbd></span>
                                <span className="text-left">Chuyển thẻ</span>
                                <span className="text-right pr-2"><kbd className="px-1.5 py-0.5 rounded bg-[var(--bg-tag)] border border-[var(--border-primary)] font-mono">K</kbd></span>
                                <span className="text-left">Đánh dấu đã thuộc</span>
                            </div>
                        )}
                    </div>

                    {/* Study Tips */}
                    <StudyTips />
                </div>
            </div>
        </div>
    )
}
