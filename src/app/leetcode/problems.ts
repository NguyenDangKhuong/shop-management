export type Difficulty = 'Easy' | 'Medium' | 'Hard'

export type Category =
    | 'Two Pointers'
    | 'Sliding Window'
    | 'BFS / DFS'
    | 'Binary Search'
    | 'Dynamic Programming'
    | 'Backtracking'
    | 'Stack'

export interface TestCase {
    input: string          // stringified args, e.g. "[2,7,11,15], 9"
    expected: string       // stringified expected output
}

export interface Problem {
    id: number
    title: string
    difficulty: Difficulty
    category: Category
    description: { vi: string; en: string }
    starterCode: string
    testCases: TestCase[]
    hint?: string
}

export const problems: Problem[] = [
    // ===== TWO POINTERS =====
    {
        id: 1,
        title: '167. Two Sum II',
        difficulty: 'Easy',
        category: 'Two Pointers',
        description: {
            vi: 'Cho mảng đã sắp xếp tăng dần `numbers` và một `target`, tìm 2 số có tổng bằng `target`.\nTrả về mảng [index1, index2] (1-indexed).',
            en: 'Given a sorted array `numbers` and a `target`, find two numbers that add up to `target`.\nReturn [index1, index2] (1-indexed).',
        },
        starterCode: `function twoSum(numbers, target) {
  // Your code here

}`,
        testCases: [
            { input: '[2,7,11,15], 9', expected: '[1,2]' },
            { input: '[2,3,4], 6', expected: '[1,3]' },
            { input: '[-1,0], -1', expected: '[1,2]' },
        ],
        hint: 'Dùng 2 con trỏ left=0, right=end. Nếu tổng > target thì giảm right, ngược lại tăng left.',
    },
    {
        id: 2,
        title: '344. Reverse String',
        difficulty: 'Easy',
        category: 'Two Pointers',
        description: {
            vi: 'Đảo ngược mảng ký tự `s` in-place (không tạo mảng mới).\nTrả về mảng đã đảo.',
            en: 'Reverse the array of characters `s` in-place.\nReturn the reversed array.',
        },
        starterCode: `function reverseString(s) {
  // Modify s in-place and return it

}`,
        testCases: [
            { input: '["h","e","l","l","o"]', expected: '["o","l","l","e","h"]' },
            { input: '["H","a","n","n","a","h"]', expected: '["h","a","n","n","a","H"]' },
        ],
        hint: 'Swap s[left] với s[right], rồi di chuyển cả hai pointer vào giữa.',
    },
    {
        id: 3,
        title: '15. 3Sum',
        difficulty: 'Medium',
        category: 'Two Pointers',
        description: {
            vi: 'Cho mảng `nums`, tìm tất cả bộ ba [nums[i], nums[j], nums[k]] có tổng bằng 0.\nKhông được trùng lặp. Trả về mảng các bộ ba.',
            en: 'Given array `nums`, find all unique triplets that sum to zero.\nReturn array of triplets.',
        },
        starterCode: `function threeSum(nums) {
  // Your code here

}`,
        testCases: [
            { input: '[-1,0,1,2,-1,-4]', expected: '[[-1,-1,2],[-1,0,1]]' },
            { input: '[0,1,1]', expected: '[]' },
            { input: '[0,0,0]', expected: '[[0,0,0]]' },
        ],
        hint: 'Sort mảng, fix 1 phần tử rồi dùng Two Pointers cho phần còn lại. Skip duplicates.',
    },

    // ===== SLIDING WINDOW =====
    {
        id: 4,
        title: '3. Longest Substring Without Repeating',
        difficulty: 'Medium',
        category: 'Sliding Window',
        description: {
            vi: 'Cho chuỗi `s`, tìm độ dài của chuỗi con dài nhất không có ký tự lặp.',
            en: 'Given a string `s`, find the length of the longest substring without repeating characters.',
        },
        starterCode: `function lengthOfLongestSubstring(s) {
  // Your code here

}`,
        testCases: [
            { input: '"abcabcbb"', expected: '3' },
            { input: '"bbbbb"', expected: '1' },
            { input: '"pwwkew"', expected: '3' },
            { input: '""', expected: '0' },
        ],
        hint: 'Dùng Set/Map + 2 pointer. Expand right, khi gặp duplicate thì shrink left cho đến khi hết duplicate.',
    },
    {
        id: 5,
        title: '209. Minimum Size Subarray Sum',
        difficulty: 'Medium',
        category: 'Sliding Window',
        description: {
            vi: 'Cho mảng `nums` (số dương) và `target`, tìm subarray ngắn nhất có tổng >= target.\nTrả về độ dài subarray (0 nếu không tồn tại).',
            en: 'Given array `nums` (positive) and `target`, find the minimum length subarray with sum >= target.\nReturn the length (0 if none exists).',
        },
        starterCode: `function minSubArrayLen(target, nums) {
  // Your code here

}`,
        testCases: [
            { input: '7, [2,3,1,2,4,3]', expected: '2' },
            { input: '4, [1,4,4]', expected: '1' },
            { input: '11, [1,1,1,1,1,1,1,1]', expected: '0' },
        ],
        hint: 'Variable-size sliding window. Expand right cho đến khi sum >= target, rồi shrink left để tìm minimum.',
    },

    // ===== BFS / DFS =====
    {
        id: 6,
        title: '104. Maximum Depth of Binary Tree',
        difficulty: 'Easy',
        category: 'BFS / DFS',
        description: {
            vi: 'Cho binary tree (dạng array [val, left, right]), tìm chiều sâu tối đa.\n\nTree được biểu diễn dạng nested array: [val, leftNode, rightNode].\nnull = node rỗng.',
            en: 'Given a binary tree (as nested array [val, left, right]), find the maximum depth.\n\nTree represented as nested array: [val, leftNode, rightNode].\nnull = empty node.',
        },
        starterCode: `// Tree node: [value, left, right] or null
// Example: [3, [9, null, null], [20, [15, null, null], [7, null, null]]]
function maxDepth(root) {
  // Your code here

}`,
        testCases: [
            { input: '[3, [9, null, null], [20, [15, null, null], [7, null, null]]]', expected: '3' },
            { input: '[1, null, [2, null, null]]', expected: '2' },
            { input: 'null', expected: '0' },
        ],
        hint: 'DFS recursion: depth = 1 + max(maxDepth(left), maxDepth(right)). Base case: null → 0.',
    },
    {
        id: 7,
        title: '226. Invert Binary Tree',
        difficulty: 'Easy',
        category: 'BFS / DFS',
        description: {
            vi: 'Cho binary tree (dạng array), đảo ngược (mirror) cây đó.\nTrả về cây đã đảo.',
            en: 'Given a binary tree (as array), invert (mirror) the tree.\nReturn the inverted tree.',
        },
        starterCode: `// Tree node: [value, left, right] or null
function invertTree(root) {
  // Your code here

}`,
        testCases: [
            { input: '[4, [2, [1, null, null], [3, null, null]], [7, [6, null, null], [9, null, null]]]', expected: '[4,[7,[9,null,null],[6,null,null]],[2,[3,null,null],[1,null,null]]]' },
            { input: '[2, [1, null, null], [3, null, null]]', expected: '[2,[3,null,null],[1,null,null]]' },
            { input: 'null', expected: 'null' },
        ],
        hint: 'Swap left và right cho mỗi node, rồi recursively invert subtrees.',
    },
    {
        id: 8,
        title: '200. Number of Islands',
        difficulty: 'Medium',
        category: 'BFS / DFS',
        description: {
            vi: 'Cho lưới 2D grid gồm "1" (đất) và "0" (nước), đếm số đảo.\nĐảo là vùng "1" liền kề (ngang/dọc) được bao quanh bởi nước.',
            en: 'Given a 2D grid of "1"s (land) and "0"s (water), count the number of islands.\nAn island is surrounded by water and formed by adjacent "1"s.',
        },
        starterCode: `function numIslands(grid) {
  // Your code here

}`,
        testCases: [
            { input: '[["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]', expected: '1' },
            { input: '[["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]', expected: '3' },
        ],
        hint: 'Duyệt grid, khi gặp "1" thì count++ và DFS/BFS để đánh dấu toàn bộ island thành "0".',
    },

    // ===== BINARY SEARCH =====
    {
        id: 9,
        title: '704. Binary Search',
        difficulty: 'Easy',
        category: 'Binary Search',
        description: {
            vi: 'Cho mảng sorted `nums` và `target`, trả về index của target. Nếu không có trả về -1.',
            en: 'Given sorted array `nums` and `target`, return the index of target. Return -1 if not found.',
        },
        starterCode: `function search(nums, target) {
  // Your code here

}`,
        testCases: [
            { input: '[-1,0,3,5,9,12], 9', expected: '4' },
            { input: '[-1,0,3,5,9,12], 2', expected: '-1' },
        ],
        hint: 'left=0, right=length-1. mid = Math.floor((left+right)/2). So sánh nums[mid] với target.',
    },
    {
        id: 10,
        title: '33. Search in Rotated Sorted Array',
        difficulty: 'Medium',
        category: 'Binary Search',
        description: {
            vi: 'Cho mảng sorted bị xoay (rotate) tại một pivot. Tìm target trong O(log n).\nTrả về index, hoặc -1.',
            en: 'Given a rotated sorted array, search for target in O(log n).\nReturn index or -1.',
        },
        starterCode: `function search(nums, target) {
  // Your code here

}`,
        testCases: [
            { input: '[4,5,6,7,0,1,2], 0', expected: '4' },
            { input: '[4,5,6,7,0,1,2], 3', expected: '-1' },
            { input: '[1], 0', expected: '-1' },
        ],
        hint: 'Binary search nhưng check xem nửa nào sorted. Nếu target nằm trong nửa sorted → search đó, ngược lại search nửa kia.',
    },

    // ===== DYNAMIC PROGRAMMING =====
    {
        id: 11,
        title: '70. Climbing Stairs',
        difficulty: 'Easy',
        category: 'Dynamic Programming',
        description: {
            vi: 'Bạn leo cầu thang có `n` bậc. Mỗi lần có thể bước 1 hoặc 2 bậc.\nCó bao nhiêu cách khác nhau để lên đỉnh?',
            en: 'You are climbing a staircase with `n` steps. Each time you can climb 1 or 2 steps.\nHow many distinct ways can you climb to the top?',
        },
        starterCode: `function climbStairs(n) {
  // Your code here

}`,
        testCases: [
            { input: '2', expected: '2' },
            { input: '3', expected: '3' },
            { input: '5', expected: '8' },
        ],
        hint: 'dp[i] = dp[i-1] + dp[i-2]. Base: dp[1]=1, dp[2]=2. Giống Fibonacci!',
    },
    {
        id: 12,
        title: '322. Coin Change',
        difficulty: 'Medium',
        category: 'Dynamic Programming',
        description: {
            vi: 'Cho mảng `coins` (mệnh giá) và `amount`, tìm số coin ít nhất để đạt amount.\nTrả về -1 nếu không thể.',
            en: 'Given `coins` (denominations) and `amount`, find the fewest coins to make up amount.\nReturn -1 if impossible.',
        },
        starterCode: `function coinChange(coins, amount) {
  // Your code here

}`,
        testCases: [
            { input: '[1,5,10], 11', expected: '3' },
            { input: '[2], 3', expected: '-1' },
            { input: '[1], 0', expected: '0' },
            { input: '[1,2,5], 11', expected: '3' },
        ],
        hint: 'dp[i] = min coins to make amount i. dp[i] = min(dp[i - coin] + 1) for each coin. Init dp = Infinity, dp[0] = 0.',
    },
    {
        id: 13,
        title: '121. Best Time to Buy and Sell Stock',
        difficulty: 'Easy',
        category: 'Dynamic Programming',
        description: {
            vi: 'Cho mảng `prices` (giá cổ phiếu mỗi ngày), tìm profit tối đa từ 1 lần mua-bán.\nTrả về 0 nếu không có lời.',
            en: 'Given `prices` (stock prices each day), find maximum profit from one buy-sell.\nReturn 0 if no profit.',
        },
        starterCode: `function maxProfit(prices) {
  // Your code here

}`,
        testCases: [
            { input: '[7,1,5,3,6,4]', expected: '5' },
            { input: '[7,6,4,3,1]', expected: '0' },
        ],
        hint: 'Track min price so far và max profit so far. Profit = current price - min price.',
    },

    // ===== BACKTRACKING =====
    {
        id: 14,
        title: '46. Permutations',
        difficulty: 'Medium',
        category: 'Backtracking',
        description: {
            vi: 'Cho mảng `nums` (distinct), trả về tất cả hoán vị có thể.',
            en: 'Given array `nums` (distinct), return all possible permutations.',
        },
        starterCode: `function permute(nums) {
  // Your code here

}`,
        testCases: [
            { input: '[1,2,3]', expected: '[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]' },
            { input: '[0,1]', expected: '[[0,1],[1,0]]' },
            { input: '[1]', expected: '[[1]]' },
        ],
        hint: 'Backtrack: thêm từng số chưa dùng vào path. Khi path.length === nums.length → push kết quả.',
    },
    {
        id: 15,
        title: '78. Subsets',
        difficulty: 'Medium',
        category: 'Backtracking',
        description: {
            vi: 'Cho mảng `nums` (distinct), trả về tất cả tập con có thể (power set).',
            en: 'Given array `nums` (distinct), return all possible subsets (power set).',
        },
        starterCode: `function subsets(nums) {
  // Your code here

}`,
        testCases: [
            { input: '[1,2,3]', expected: '[[],[1],[1,2],[1,2,3],[1,3],[2],[2,3],[3]]' },
            { input: '[0]', expected: '[[],[0]]' },
        ],
        hint: 'Backtrack: mỗi bước chọn include hoặc exclude phần tử hiện tại. Hoặc: iterate và push path tại mỗi bước.',
    },

    // ===== STACK =====
    {
        id: 16,
        title: '20. Valid Parentheses',
        difficulty: 'Easy',
        category: 'Stack',
        description: {
            vi: 'Cho chuỗi `s` chứa ()[]{}, kiểm tra xem các dấu ngoặc có hợp lệ không.',
            en: 'Given string `s` containing ()[]{}. Determine if the input string is valid.',
        },
        starterCode: `function isValid(s) {
  // Your code here

}`,
        testCases: [
            { input: '"()"', expected: 'true' },
            { input: '"()[]{}"', expected: 'true' },
            { input: '"(]"', expected: 'false' },
            { input: '"([)]"', expected: 'false' },
            { input: '"{[]}"', expected: 'true' },
        ],
        hint: 'Push opening brackets vào stack. Gặp closing → pop và check match. Cuối cùng stack phải rỗng.',
    },
    {
        id: 17,
        title: '739. Daily Temperatures',
        difficulty: 'Medium',
        category: 'Stack',
        description: {
            vi: 'Cho mảng `temperatures`, trả về mảng `answer` trong đó answer[i] = số ngày cần đợi sau ngày i để có nhiệt độ cao hơn.\nNếu không có ngày nào ấm hơn, answer[i] = 0.',
            en: 'Given `temperatures`, return array where answer[i] = number of days to wait after day i for a warmer temperature.\nIf no warmer day exists, answer[i] = 0.',
        },
        starterCode: `function dailyTemperatures(temperatures) {
  // Your code here

}`,
        testCases: [
            { input: '[73,74,75,71,69,72,76,73]', expected: '[1,1,4,2,1,1,0,0]' },
            { input: '[30,40,50,60]', expected: '[1,1,1,0]' },
            { input: '[30,60,90]', expected: '[1,1,0]' },
        ],
        hint: 'Monotonic stack: giữ stack chứa indices với nhiệt độ giảm dần. Khi gặp nhiệt độ cao hơn → pop và tính khoảng cách.',
    },
]
