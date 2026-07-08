// Flashcard data — copied from web FlashcardApp.tsx
// 14 algorithm patterns with front (signal/question) and back (approach/template/complexity/example)

export interface Flashcard {
    id: string
    pattern: string
    emoji: string
    color: string
    front: { signal: string; question: string }
    back: { approach: string; template: string; complexity: string; example: string }
}

export const flashcards: Flashcard[] = [
    {
        id: 'hashmap-twosum',
        pattern: 'HashMap',
        emoji: '🗂️',
        color: '#4ade80',
        front: { signal: 'Tìm 2 phần tử có tổng = target', question: 'nums = [2,7,11,15], target = 9 → ?' },
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
        front: { signal: 'Đếm tần suất / frequency count', question: '"aabbccc" → {a:2, b:2, c:3}' },
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
        front: { signal: 'Sorted array + tìm cặp thỏa điều kiện', question: 'sorted = [1,3,5,7], target = 8 → ?' },
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
        front: { signal: 'Đảo ngược / Palindrome check', question: '"racecar" → true (palindrome)' },
        back: {
            approach: '2 con trỏ từ 2 đầu, so sánh và thu hẹp',
            template: `let left = 0, right = s.length - 1
while (left < right) {
  if (s[left] !== s[right]) return false
  left++; right--
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
        front: { signal: 'Subarray/substring liên tục có kích thước k', question: 'Max sum subarray size k=3: [1,4,2,10,2,3,1,0,20]' },
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
        front: { signal: 'Substring/subarray ngắn nhất/dài nhất thỏa điều kiện', question: 'Longest substring without repeating chars' },
        back: {
            approach: 'for mở rộng right, while thu hẹp left khi invalid',
            template: `let left = 0, maxLen = 0
const set = new Set()
for (let right = 0; right < s.length; right++) {
  while (set.has(s[right])) {
    set.delete(s[left]); left++
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
        front: { signal: 'Dấu ngoặc, matching pairs, undo/redo', question: '"({[]})\" → valid, "([)]\" → invalid' },
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
        front: { signal: 'Next Greater / Smaller Element', question: '[2,1,2,4,3] → next greater: [4,2,4,-1,-1]' },
        back: {
            approach: 'Monotonic stack: pop khi gặp phần tử lớn/nhỏ hơn top',
            template: `const result = new Array(n).fill(-1)
const stack = [] // indices
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
        front: { signal: 'Tìm trong sorted array / tìm boundary', question: 'sorted = [1,3,5,7,9], target = 5 → index 2' },
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
        front: { signal: 'Level-order traversal / Shortest path (unweighted)', question: 'Tree level order: [[3],[9,20],[15,7]]' },
        back: {
            approach: 'Queue + while, xử lý từng level',
            template: `const queue = [root]
while (queue.length) {
  const levelSize = queue.length
  for (let i = 0; i < levelSize; i++) {
    const node = queue.shift()
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
        front: { signal: 'Duyệt hết nhánh / Path sum / Đảo cây', question: 'Max depth of binary tree' },
        back: {
            approach: 'Recursive: base case + gọi left/right',
            template: `function dfs(node) {
  if (!node) return 0
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
        front: { signal: 'Đếm số cách / tối ưu min-max với subproblems chồng nhau', question: 'Climbing stairs: mỗi bước 1 hoặc 2 bậc → bao nhiêu cách?' },
        back: {
            approach: 'dp[i] phụ thuộc vào dp[i-1], dp[i-2]...',
            template: `const dp = new Array(n + 1).fill(0)
dp[0] = 1; dp[1] = 1
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
        front: { signal: 'Tất cả combinations / permutations / subsets', question: '[1,2,3] → subsets: [],[1],[2],[3],[1,2],...' },
        back: {
            approach: 'Chọn → Explore → Bỏ chọn (backtrack)',
            template: `function backtrack(start, current) {
  result.push([...current])
  for (let i = start; i < nums.length; i++) {
    current.push(nums[i])     // chọn
    backtrack(i + 1, current)  // explore
    current.pop()              // bỏ chọn
  }
}`,
            complexity: 'Time: O(2^n) | Space: O(n)',
            example: 'Subsets, Permutations, Combination Sum, N-Queens',
        },
    },
]
