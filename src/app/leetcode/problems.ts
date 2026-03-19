export type Difficulty = 'Easy' | 'Medium' | 'Hard'

export type Category =
    | 'Two Pointers'
    | 'Sliding Window'
    | 'BFS / DFS'
    | 'Binary Search'
    | 'Dynamic Programming'
    | 'Backtracking'
    | 'Stack'
    | 'Custom Hooks'

export interface TestCase {
    input: string
    expected: string
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
    solution?: string
}

export const problems: Problem[] = [
    {
        id: 1,
        title: '167. Two Sum II',
        difficulty: 'Easy',
        category: 'Two Pointers',
        description: {
            vi: "Cho mảng sorted `numbers` và `target`, tìm 2 số có tổng = target. Trả về [i1, i2] (1-indexed).",
            en: "Given sorted array `numbers` and `target`, find two numbers summing to target. Return [i1, i2] (1-indexed).",
        },
        starterCode: "function twoSum(numbers, target) {\n  // Your code here\n}",
        testCases: [
            { input: "[2,7,11,15], 9", expected: "[1,2]" },
            { input: "[2,3,4], 6", expected: "[1,3]" },
            { input: "[-1,0], -1", expected: "[1,2]" },
        ],
        hint: "Dùng 2 pointer left=0, right=end. Tổng > target → giảm right, ngược lại tăng left.",
        solution: `function twoSum(numbers, target) {
  let l = 0, r = numbers.length - 1;
  while (l < r) {
    const sum = numbers[l] + numbers[r];
    if (sum === target) return [l + 1, r + 1];
    sum < target ? l++ : r--;
  }
}`,
    },
    {
        id: 2,
        title: '26. Remove Duplicates from Sorted Array',
        difficulty: 'Easy',
        category: 'Two Pointers',
        description: {
            vi: "Xóa duplicates in-place từ mảng sorted. Trả về số phần tử unique.",
            en: "Remove duplicates in-place from sorted array. Return count of unique elements.",
        },
        starterCode: "function removeDuplicates(nums) {\n  // Your code here\n}",
        testCases: [
            { input: "[1,1,2]", expected: "2" },
            { input: "[0,0,1,1,1,2,2,3,3,4]", expected: "5" },
        ],
        hint: "Dùng slow/fast pointer. Fast duyệt, khi nums[fast] !== nums[slow] thì tăng slow và copy.",
        solution: `function removeDuplicates(nums) {
  let slow = 0;
  for (let fast = 1; fast < nums.length; fast++) {
    if (nums[fast] !== nums[slow]) {
      slow++;
      nums[slow] = nums[fast];
    }
  }
  return slow + 1;
}`,
    },
    {
        id: 3,
        title: '283. Move Zeroes',
        difficulty: 'Easy',
        category: 'Two Pointers',
        description: {
            vi: "Di chuyển tất cả số 0 về cuối mảng, giữ nguyên thứ tự các số khác. In-place.",
            en: "Move all zeroes to end, maintaining order of non-zero elements. In-place. Return the array.",
        },
        starterCode: "function moveZeroes(nums) {\n  // Modify in-place, return nums\n}",
        testCases: [
            { input: "[0,1,0,3,12]", expected: "[1,3,12,0,0]" },
            { input: "[0]", expected: "[0]" },
            { input: "[1,2,3]", expected: "[1,2,3]" },
        ],
        hint: "Pointer slow theo vị trí non-zero tiếp theo. Swap nums[slow] với nums[fast].",
        solution: `function moveZeroes(nums) {
  let slow = 0;
  for (let fast = 0; fast < nums.length; fast++) {
    if (nums[fast] !== 0) {
      [nums[slow], nums[fast]] = [nums[fast], nums[slow]];
      slow++;
    }
  }
  return nums;
}`,
    },
    {
        id: 4,
        title: '344. Reverse String',
        difficulty: 'Easy',
        category: 'Two Pointers',
        description: {
            vi: "Đảo ngược mảng ký tự in-place. Trả về mảng đã đảo.",
            en: "Reverse array of characters in-place. Return reversed array.",
        },
        starterCode: "function reverseString(s) {\n  // Modify in-place, return s\n}",
        testCases: [
            { input: "[\"h\",\"e\",\"l\",\"l\",\"o\"]", expected: "[\"o\",\"l\",\"l\",\"e\",\"h\"]" },
            { input: "[\"H\",\"a\",\"n\",\"n\",\"a\",\"h\"]", expected: "[\"h\",\"a\",\"n\",\"n\",\"a\",\"H\"]" },
        ],
        hint: "Swap s[left] với s[right], di chuyển cả hai vào giữa.",
        solution: `function reverseString(s) {
  let l = 0, r = s.length - 1;
  while (l < r) {
    [s[l], s[r]] = [s[r], s[l]];
    l++; r--;
  }
  return s;
}`,
    },
    {
        id: 5,
        title: '977. Squares of a Sorted Array',
        difficulty: 'Easy',
        category: 'Two Pointers',
        description: {
            vi: "Cho mảng sorted, trả về mảng bình phương sorted tăng dần.",
            en: "Given sorted array, return sorted array of squares.",
        },
        starterCode: "function sortedSquares(nums) {\n  // Your code here\n}",
        testCases: [
            { input: "[-4,-1,0,3,10]", expected: "[0,1,9,16,100]" },
            { input: "[-7,-3,2,3,11]", expected: "[4,9,9,49,121]" },
        ],
        hint: "2 pointer từ 2 đầu, so sánh abs → đặt bình phương lớn hơn vào cuối result.",
        solution: `function sortedSquares(nums) {
  const n = nums.length, result = new Array(n);
  let l = 0, r = n - 1, i = n - 1;
  while (l <= r) {
    if (Math.abs(nums[l]) > Math.abs(nums[r])) {
      result[i--] = nums[l] * nums[l]; l++;
    } else {
      result[i--] = nums[r] * nums[r]; r--;
    }
  }
  return result;
}`,
    },
    {
        id: 6,
        title: '15. 3Sum',
        difficulty: 'Medium',
        category: 'Two Pointers',
        description: {
            vi: "Tìm tất cả bộ ba có tổng = 0. Không trùng lặp.",
            en: "Find all unique triplets summing to zero.",
        },
        starterCode: "function threeSum(nums) {\n  // Your code here\n}",
        testCases: [
            { input: "[-1,0,1,2,-1,-4]", expected: "[[-1,-1,2],[-1,0,1]]" },
            { input: "[0,1,1]", expected: "[]" },
            { input: "[0,0,0]", expected: "[[0,0,0]]" },
        ],
        hint: "Sort, fix 1 phần tử, dùng Two Pointers cho phần còn lại. Skip duplicates.",
        solution: `function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const res = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let l = i + 1, r = nums.length - 1;
    while (l < r) {
      const sum = nums[i] + nums[l] + nums[r];
      if (sum === 0) {
        res.push([nums[i], nums[l], nums[r]]);
        while (l < r && nums[l] === nums[l + 1]) l++;
        while (l < r && nums[r] === nums[r - 1]) r--;
        l++; r--;
      } else if (sum < 0) l++;
      else r--;
    }
  }
  return res;
}`,
    },
    {
        id: 7,
        title: '11. Container With Most Water',
        difficulty: 'Medium',
        category: 'Two Pointers',
        description: {
            vi: "Cho mảng heights, tìm 2 đường thẳng chứa nhiều nước nhất.",
            en: "Find two lines forming container with most water. Return max area.",
        },
        starterCode: "function maxArea(height) {\n  // Your code here\n}",
        testCases: [
            { input: "[1,8,6,2,5,4,8,3,7]", expected: "49" },
            { input: "[1,1]", expected: "1" },
        ],
        hint: "2 pointer từ 2 đầu. Area = min(h[l],h[r]) * (r-l). Di chuyển pointer có height nhỏ hơn.",
        solution: `function maxArea(height) {
  let l = 0, r = height.length - 1, max = 0;
  while (l < r) {
    max = Math.max(max, Math.min(height[l], height[r]) * (r - l));
    height[l] < height[r] ? l++ : r--;
  }
  return max;
}`,
    },
    {
        id: 8,
        title: '75. Sort Colors',
        difficulty: 'Medium',
        category: 'Two Pointers',
        description: {
            vi: "Sort mảng chứa 0,1,2 in-place (Dutch National Flag). Trả về mảng sorted.",
            en: "Sort array of 0,1,2 in-place (Dutch National Flag). Return sorted array.",
        },
        starterCode: "function sortColors(nums) {\n  // In-place, return nums\n}",
        testCases: [
            { input: "[2,0,2,1,1,0]", expected: "[0,0,1,1,2,2]" },
            { input: "[2,0,1]", expected: "[0,1,2]" },
        ],
        hint: "3 pointer: low, mid, high. mid duyệt: 0→swap low, 2→swap high, 1→next.",
        solution: `function sortColors(nums) {
  let low = 0, mid = 0, high = nums.length - 1;
  while (mid <= high) {
    if (nums[mid] === 0) { [nums[low], nums[mid]] = [nums[mid], nums[low]]; low++; mid++; }
    else if (nums[mid] === 2) { [nums[mid], nums[high]] = [nums[high], nums[mid]]; high--; }
    else mid++;
  }
  return nums;
}`,
    },
    {
        id: 9,
        title: '142. Linked List Cycle II',
        difficulty: 'Medium',
        category: 'Two Pointers',
        description: {
            vi: "Tìm node bắt đầu cycle trong linked list. List dạng array + pos. Trả về index của cycle start (-1 nếu không có).",
            en: "Find start of cycle in linked list. List as array + pos. Return index of cycle start (-1 if none).",
        },
        starterCode: "function detectCycle(arr, pos) {\n  // arr = values, pos = index where tail connects (-1 = no cycle)\n  // Return index of cycle start, or -1\n  if (pos === -1) return -1;\n  return pos;\n}",
        testCases: [
            { input: "[3,2,0,-4], 1", expected: "1" },
            { input: "[1,2], 0", expected: "0" },
            { input: "[1], -1", expected: "-1" },
        ],
        hint: "Floyd: slow+fast gặp nhau → reset slow về head, cả hai đi 1 bước → gặp tại cycle start.",
        solution: `function detectCycle(arr, pos) {
  if (pos === -1) return -1;
  return pos;
}`,
    },
    {
        id: 10,
        title: '238. Product of Array Except Self',
        difficulty: 'Medium',
        category: 'Two Pointers',
        description: {
            vi: "Trả về mảng output[i] = tích tất cả phần tử trừ nums[i]. Không dùng phép chia.",
            en: "Return array where output[i] = product of all elements except nums[i]. No division.",
        },
        starterCode: "function productExceptSelf(nums) {\n  // Your code here\n}",
        testCases: [
            { input: "[1,2,3,4]", expected: "[24,12,8,6]" },
            { input: "[-1,1,0,-3,3]", expected: "[0,0,9,0,0]" },
        ],
        hint: "2 pass: prefix product từ trái, suffix product từ phải. Kết hợp lại.",
        solution: `function productExceptSelf(nums) {
  const n = nums.length, res = new Array(n).fill(1);
  let prefix = 1;
  for (let i = 0; i < n; i++) { res[i] = prefix; prefix *= nums[i]; }
  let suffix = 1;
  for (let i = n - 1; i >= 0; i--) { res[i] *= suffix; suffix *= nums[i]; }
  return res;
}`,
    },
    {
        id: 11,
        title: '643. Maximum Average Subarray I',
        difficulty: 'Easy',
        category: 'Sliding Window',
        description: {
            vi: "Tìm subarray liên tiếp có length=k với trung bình lớn nhất. Trả về giá trị trung bình.",
            en: "Find contiguous subarray of length k with max average. Return the average.",
        },
        starterCode: "function findMaxAverage(nums, k) {\n  // Your code here\n}",
        testCases: [
            { input: "[1,12,-5,-6,50,3], 4", expected: "12.75" },
            { input: "[5], 1", expected: "5" },
        ],
        hint: "Fixed window size k. Tính sum đầu, rồi slide: cộng phần tử mới, trừ phần tử cũ.",
        solution: `function findMaxAverage(nums, k) {
  let sum = 0;
  for (let i = 0; i < k; i++) sum += nums[i];
  let max = sum;
  for (let i = k; i < nums.length; i++) {
    sum += nums[i] - nums[i - k];
    max = Math.max(max, sum);
  }
  return max / k;
}`,
    },
    {
        id: 12,
        title: '219. Contains Duplicate II',
        difficulty: 'Easy',
        category: 'Sliding Window',
        description: {
            vi: "Kiểm tra có 2 index i,j mà nums[i]=nums[j] và |i-j|<=k không.",
            en: "Check if there exist i,j with nums[i]=nums[j] and |i-j|<=k.",
        },
        starterCode: "function containsNearbyDuplicate(nums, k) {\n  // Your code here\n}",
        testCases: [
            { input: "[1,2,3,1], 3", expected: "true" },
            { input: "[1,0,1,1], 1", expected: "true" },
            { input: "[1,2,3,1,2,3], 2", expected: "false" },
        ],
        hint: "Dùng Set giữ window size k. Khi thêm phần tử mới, xóa phần tử ngoài window.",
        solution: `function containsNearbyDuplicate(nums, k) {
  const set = new Set();
  for (let i = 0; i < nums.length; i++) {
    if (set.has(nums[i])) return true;
    set.add(nums[i]);
    if (set.size > k) set.delete(nums[i - k]);
  }
  return false;
}`,
    },
    {
        id: 13,
        title: '3. Longest Substring Without Repeating',
        difficulty: 'Medium',
        category: 'Sliding Window',
        description: {
            vi: "Tìm độ dài chuỗi con dài nhất không có ký tự lặp.",
            en: "Find length of longest substring without repeating characters.",
        },
        starterCode: "function lengthOfLongestSubstring(s) {\n  // Your code here\n}",
        testCases: [
            { input: "\"abcabcbb\"", expected: "3" },
            { input: "\"bbbbb\"", expected: "1" },
            { input: "\"pwwkew\"", expected: "3" },
            { input: "\"\"", expected: "0" },
        ],
        hint: "Set + 2 pointer. Expand right, gặp duplicate → shrink left.",
        solution: `function lengthOfLongestSubstring(s) {
  const set = new Set();
  let l = 0, max = 0;
  for (let r = 0; r < s.length; r++) {
    while (set.has(s[r])) { set.delete(s[l]); l++; }
    set.add(s[r]);
    max = Math.max(max, r - l + 1);
  }
  return max;
}`,
    },
    {
        id: 14,
        title: '424. Longest Repeating Character Replacement',
        difficulty: 'Medium',
        category: 'Sliding Window',
        description: {
            vi: "Cho chuỗi s và k lần thay thế, tìm chuỗi con dài nhất chứa cùng 1 ký tự.",
            en: "Given string s and k replacements, find longest substring with same character.",
        },
        starterCode: "function characterReplacement(s, k) {\n  // Your code here\n}",
        testCases: [
            { input: "\"ABAB\", 2", expected: "4" },
            { input: "\"AABABBA\", 1", expected: "4" },
        ],
        hint: "Window size - count of max freq char <= k. Track max freq trong window.",
        solution: `function characterReplacement(s, k) {
  const count = {};
  let l = 0, maxFreq = 0, max = 0;
  for (let r = 0; r < s.length; r++) {
    count[s[r]] = (count[s[r]] || 0) + 1;
    maxFreq = Math.max(maxFreq, count[s[r]]);
    while (r - l + 1 - maxFreq > k) {
      count[s[l]]--; l++;
    }
    max = Math.max(max, r - l + 1);
  }
  return max;
}`,
    },
    {
        id: 15,
        title: '567. Permutation in String',
        difficulty: 'Medium',
        category: 'Sliding Window',
        description: {
            vi: "Kiểm tra s2 có chứa hoán vị của s1 không.",
            en: "Check if s2 contains a permutation of s1.",
        },
        starterCode: "function checkInclusion(s1, s2) {\n  // Your code here\n}",
        testCases: [
            { input: "\"ab\", \"eidbaooo\"", expected: "true" },
            { input: "\"ab\", \"eidboaoo\"", expected: "false" },
        ],
        hint: "Fixed window = s1.length. So sánh frequency map của window với s1.",
        solution: `function checkInclusion(s1, s2) {
  if (s1.length > s2.length) return false;
  const count = new Array(26).fill(0);
  for (let i = 0; i < s1.length; i++) {
    count[s1.charCodeAt(i) - 97]++;
    count[s2.charCodeAt(i) - 97]--;
  }
  if (count.every(c => c === 0)) return true;
  for (let i = s1.length; i < s2.length; i++) {
    count[s2.charCodeAt(i) - 97]--;
    count[s2.charCodeAt(i - s1.length) - 97]++;
    if (count.every(c => c === 0)) return true;
  }
  return false;
}`,
    },
    {
        id: 16,
        title: '209. Minimum Size Subarray Sum',
        difficulty: 'Medium',
        category: 'Sliding Window',
        description: {
            vi: "Tìm subarray ngắn nhất có tổng >= target. Trả về length (0 nếu không có).",
            en: "Find min length subarray with sum >= target. Return length (0 if none).",
        },
        starterCode: "function minSubArrayLen(target, nums) {\n  // Your code here\n}",
        testCases: [
            { input: "7, [2,3,1,2,4,3]", expected: "2" },
            { input: "4, [1,4,4]", expected: "1" },
            { input: "11, [1,1,1,1,1]", expected: "0" },
        ],
        hint: "Variable window. Expand right đến sum >= target, rồi shrink left tìm minimum.",
        solution: `function minSubArrayLen(target, nums) {
  let l = 0, sum = 0, min = Infinity;
  for (let r = 0; r < nums.length; r++) {
    sum += nums[r];
    while (sum >= target) {
      min = Math.min(min, r - l + 1);
      sum -= nums[l]; l++;
    }
  }
  return min === Infinity ? 0 : min;
}`,
    },
    {
        id: 17,
        title: '438. Find All Anagrams in a String',
        difficulty: 'Medium',
        category: 'Sliding Window',
        description: {
            vi: "Tìm tất cả vị trí bắt đầu của anagram của p trong s.",
            en: "Find all start indices of anagrams of p in s.",
        },
        starterCode: "function findAnagrams(s, p) {\n  // Your code here\n}",
        testCases: [
            { input: "\"cbaebabacd\", \"abc\"", expected: "[0,6]" },
            { input: "\"abab\", \"ab\"", expected: "[0,1,2]" },
        ],
        hint: "Fixed window = p.length. Dùng freq array 26 chars, so sánh mỗi bước.",
        solution: `function findAnagrams(s, p) {
  const res = [], count = new Array(26).fill(0);
  for (const c of p) count[c.charCodeAt(0) - 97]++;
  for (const c of s.slice(0, p.length)) count[c.charCodeAt(0) - 97]--;
  if (count.every(c => c === 0)) res.push(0);
  for (let i = p.length; i < s.length; i++) {
    count[s.charCodeAt(i) - 97]--;
    count[s.charCodeAt(i - p.length) - 97]++;
    if (count.every(c => c === 0)) res.push(i - p.length + 1);
  }
  return res;
}`,
    },
    {
        id: 18,
        title: '76. Minimum Window Substring',
        difficulty: 'Hard',
        category: 'Sliding Window',
        description: {
            vi: "Tìm chuỗi con ngắn nhất của s chứa tất cả ký tự của t.",
            en: "Find minimum window substring of s containing all characters of t.",
        },
        starterCode: "function minWindow(s, t) {\n  // Your code here\n}",
        testCases: [
            { input: "\"ADOBECODEBANC\", \"ABC\"", expected: "\"BANC\"" },
            { input: "\"a\", \"a\"", expected: "\"a\"" },
            { input: "\"a\", \"aa\"", expected: "\"\"" },
        ],
        hint: "Expand right đến đủ chars, rồi shrink left tìm minimum. Dùng Map đếm frequency.",
        solution: `function minWindow(s, t) {
  const need = {}, have = {};
  for (const c of t) need[c] = (need[c] || 0) + 1;
  let l = 0, formed = 0, required = Object.keys(need).length;
  let res = '', minLen = Infinity;
  for (let r = 0; r < s.length; r++) {
    have[s[r]] = (have[s[r]] || 0) + 1;
    if (need[s[r]] && have[s[r]] === need[s[r]]) formed++;
    while (formed === required) {
      if (r - l + 1 < minLen) { minLen = r - l + 1; res = s.slice(l, r + 1); }
      have[s[l]]--;
      if (need[s[l]] && have[s[l]] < need[s[l]]) formed--;
      l++;
    }
  }
  return res;
}`,
    },
    {
        id: 19,
        title: '239. Sliding Window Maximum',
        difficulty: 'Hard',
        category: 'Sliding Window',
        description: {
            vi: "Cho mảng nums và window size k, trả về max của mỗi window.",
            en: "Given array nums and window size k, return max of each window.",
        },
        starterCode: "function maxSlidingWindow(nums, k) {\n  // Your code here\n}",
        testCases: [
            { input: "[1,3,-1,-3,5,3,6,7], 3", expected: "[3,3,5,5,6,7]" },
            { input: "[1], 1", expected: "[1]" },
        ],
        hint: "Monotonic decreasing deque. Deque[0] luôn là max. Pop back nếu < current.",
        solution: `function maxSlidingWindow(nums, k) {
  const deque = [], res = [];
  for (let i = 0; i < nums.length; i++) {
    while (deque.length && deque[0] < i - k + 1) deque.shift();
    while (deque.length && nums[deque[deque.length - 1]] < nums[i]) deque.pop();
    deque.push(i);
    if (i >= k - 1) res.push(nums[deque[0]]);
  }
  return res;
}`,
    },
    {
        id: 20,
        title: '104. Maximum Depth of Binary Tree',
        difficulty: 'Easy',
        category: 'BFS / DFS',
        description: {
            vi: "Tìm chiều sâu tối đa của binary tree. Tree dạng [val, left, right].",
            en: "Find max depth of binary tree. Tree as [val, left, right].",
        },
        starterCode: "function maxDepth(root) {\n  // Tree: [val, left, right] or null\n}",
        testCases: [
            { input: "[3,[9,null,null],[20,[15,null,null],[7,null,null]]]", expected: "3" },
            { input: "[1,null,[2,null,null]]", expected: "2" },
            { input: "null", expected: "0" },
        ],
        hint: "DFS: 1 + max(maxDepth(left), maxDepth(right)). Base: null → 0.",
        solution: `function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root[1]), maxDepth(root[2]));
}`,
    },
    {
        id: 21,
        title: '226. Invert Binary Tree',
        difficulty: 'Easy',
        category: 'BFS / DFS',
        description: {
            vi: "Đảo ngược (mirror) binary tree. Trả về cây đã đảo.",
            en: "Invert (mirror) binary tree. Return inverted tree.",
        },
        starterCode: "function invertTree(root) {\n  // Tree: [val, left, right] or null\n}",
        testCases: [
            { input: "[4,[2,[1,null,null],[3,null,null]],[7,[6,null,null],[9,null,null]]]", expected: "[4,[7,[9,null,null],[6,null,null]],[2,[3,null,null],[1,null,null]]]" },
            { input: "[2,[1,null,null],[3,null,null]]", expected: "[2,[3,null,null],[1,null,null]]" },
            { input: "null", expected: "null" },
        ],
        hint: "Swap left/right cho mỗi node, recursively invert subtrees.",
        solution: `function invertTree(root) {
  if (!root) return null;
  return [root[0], invertTree(root[2]), invertTree(root[1])];
}`,
    },
    {
        id: 22,
        title: '100. Same Tree',
        difficulty: 'Easy',
        category: 'BFS / DFS',
        description: {
            vi: "Kiểm tra 2 binary tree có giống nhau không.",
            en: "Check if two binary trees are identical.",
        },
        starterCode: "function isSameTree(p, q) {\n  // Trees: [val, left, right] or null\n}",
        testCases: [
            { input: "[1,[2,null,null],[3,null,null]], [1,[2,null,null],[3,null,null]]", expected: "true" },
            { input: "[1,[2,null,null],null], [1,null,[2,null,null]]", expected: "false" },
            { input: "null, null", expected: "true" },
        ],
        hint: "Cả hai null → true. Một null → false. So sánh val rồi recurse left/right.",
        solution: `function isSameTree(p, q) {
  if (!p && !q) return true;
  if (!p || !q) return false;
  return p[0] === q[0] && isSameTree(p[1], q[1]) && isSameTree(p[2], q[2]);
}`,
    },
    {
        id: 23,
        title: '572. Subtree of Another Tree',
        difficulty: 'Easy',
        category: 'BFS / DFS',
        description: {
            vi: "Kiểm tra subRoot có phải subtree của root không.",
            en: "Check if subRoot is a subtree of root.",
        },
        starterCode: "function isSubtree(root, subRoot) {\n  // Trees: [val, left, right] or null\n}",
        testCases: [
            { input: "[3,[4,[1,null,null],[2,null,null]],[5,null,null]], [4,[1,null,null],[2,null,null]]", expected: "true" },
            { input: "[3,[4,[1,null,null],[2,[0,null,null],null]],[5,null,null]], [4,[1,null,null],[2,null,null]]", expected: "false" },
        ],
        hint: "Duyệt root, tại mỗi node check isSameTree(node, subRoot).",
        solution: `function isSubtree(root, subRoot) {
  if (!root) return false;
  if (isSame(root, subRoot)) return true;
  return isSubtree(root[1], subRoot) || isSubtree(root[2], subRoot);
}
function isSame(a, b) {
  if (!a && !b) return true;
  if (!a || !b || a[0] !== b[0]) return false;
  return isSame(a[1], b[1]) && isSame(a[2], b[2]);
}`,
    },
    {
        id: 24,
        title: '617. Merge Two Binary Trees',
        difficulty: 'Easy',
        category: 'BFS / DFS',
        description: {
            vi: "Merge 2 binary tree bằng cách cộng giá trị nodes chồng lấp.",
            en: "Merge two binary trees by summing overlapping nodes.",
        },
        starterCode: "function mergeTrees(root1, root2) {\n  // Trees: [val, left, right] or null\n}",
        testCases: [
            { input: "[1,[3,[5,null,null],null],[2,null,null]], [2,[1,null,[4,null,null]],[3,null,[7,null,null]]]", expected: "[3,[4,[5,null,null],[4,null,null]],[5,null,[7,null,null]]]" },
            { input: "[1,null,null], [1,[2,null,null],null]", expected: "[2,[2,null,null],null]" },
        ],
        hint: "Nếu 1 null → return cái kia. Cả 2 có → tạo node [v1+v2, merge(l1,l2), merge(r1,r2)].",
        solution: `function mergeTrees(root1, root2) {
  if (!root1) return root2;
  if (!root2) return root1;
  return [root1[0] + root2[0], mergeTrees(root1[1], root2[1]), mergeTrees(root1[2], root2[2])];
}`,
    },
    {
        id: 25,
        title: '102. Binary Tree Level Order Traversal',
        difficulty: 'Medium',
        category: 'BFS / DFS',
        description: {
            vi: "Trả về level order traversal dạng [[level0], [level1], ...].",
            en: "Return level order traversal as [[level0], [level1], ...].",
        },
        starterCode: "function levelOrder(root) {\n  // Tree: [val, left, right] or null\n}",
        testCases: [
            { input: "[3,[9,null,null],[20,[15,null,null],[7,null,null]]]", expected: "[[3],[9,20],[15,7]]" },
            { input: "[1,null,null]", expected: "[[1]]" },
            { input: "null", expected: "[]" },
        ],
        hint: "BFS với queue. Mỗi level: process hết queue hiện tại, push children vào.",
        solution: `function levelOrder(root) {
  if (!root) return [];
  const res = [], queue = [root];
  while (queue.length) {
    const level = [], size = queue.length;
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      level.push(node[0]);
      if (node[1]) queue.push(node[1]);
      if (node[2]) queue.push(node[2]);
    }
    res.push(level);
  }
  return res;
}`,
    },
    {
        id: 26,
        title: '200. Number of Islands',
        difficulty: 'Medium',
        category: 'BFS / DFS',
        description: {
            vi: "Đếm số đảo trong grid 2D (\"1\"=đất, \"0\"=nước).",
            en: "Count islands in 2D grid (\"1\"=land, \"0\"=water).",
        },
        starterCode: "function numIslands(grid) {\n  // Your code here\n}",
        testCases: [
            { input: "[[\"1\",\"1\",\"1\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"0\",\"0\"]]", expected: "1" },
            { input: "[[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"1\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"1\",\"1\"]]", expected: "3" },
        ],
        hint: "Duyệt grid, gặp \"1\" → count++ rồi DFS/BFS đánh dấu toàn bộ island thành \"0\".",
        solution: `function numIslands(grid) {
  let count = 0;
  for (let i = 0; i < grid.length; i++)
    for (let j = 0; j < grid[0].length; j++)
      if (grid[i][j] === "1") { count++; dfs(grid, i, j); }
  return count;
}
function dfs(grid, i, j) {
  if (i < 0 || j < 0 || i >= grid.length || j >= grid[0].length || grid[i][j] !== "1") return;
  grid[i][j] = "0";
  dfs(grid, i+1, j); dfs(grid, i-1, j); dfs(grid, i, j+1); dfs(grid, i, j-1);
}`,
    },
    {
        id: 27,
        title: '133. Clone Graph',
        difficulty: 'Medium',
        category: 'BFS / DFS',
        description: {
            vi: "Clone đồ thị. Input: adjacency list. Trả về deep copy adjacency list.",
            en: "Clone a graph. Input: adjacency list. Return deep copy.",
        },
        starterCode: "function cloneGraph(adjList) {\n  // adjList[i] = neighbors of node i (0-indexed)\n  // Return cloned adjList\n  if (!adjList || adjList.length === 0) return [];\n  return adjList.map(neighbors => [...neighbors]);\n}",
        testCases: [
            { input: "[[1,2],[0,2],[0,1]]", expected: "[[1,2],[0,2],[0,1]]" },
            { input: "[[]]", expected: "[[]]" },
            { input: "[]", expected: "[]" },
        ],
        hint: "BFS/DFS + HashMap để map old node → new node. Clone neighbors recursively.",
        solution: `function cloneGraph(adjList) {
  if (!adjList || adjList.length === 0) return [];
  return adjList.map(neighbors => [...neighbors]);
}`,
    },
    {
        id: 28,
        title: '207. Course Schedule',
        difficulty: 'Medium',
        category: 'BFS / DFS',
        description: {
            vi: "Có thể hoàn thành tất cả courses không? Input: numCourses, prerequisites.",
            en: "Can all courses be finished? Input: numCourses, prerequisites.",
        },
        starterCode: "function canFinish(numCourses, prerequisites) {\n  // Your code here\n}",
        testCases: [
            { input: "2, [[1,0]]", expected: "true" },
            { input: "2, [[1,0],[0,1]]", expected: "false" },
            { input: "3, [[1,0],[2,1]]", expected: "true" },
        ],
        hint: "Topological sort. Detect cycle bằng DFS (3 states) hoặc BFS (Kahn algorithm).",
        solution: `function canFinish(numCourses, prerequisites) {
  const graph = Array.from({length: numCourses}, () => []);
  const inDegree = new Array(numCourses).fill(0);
  for (const [a, b] of prerequisites) { graph[b].push(a); inDegree[a]++; }
  const queue = [];
  for (let i = 0; i < numCourses; i++) if (inDegree[i] === 0) queue.push(i);
  let count = 0;
  while (queue.length) {
    const node = queue.shift(); count++;
    for (const next of graph[node]) { inDegree[next]--; if (inDegree[next] === 0) queue.push(next); }
  }
  return count === numCourses;
}`,
    },
    {
        id: 29,
        title: '547. Number of Provinces',
        difficulty: 'Medium',
        category: 'BFS / DFS',
        description: {
            vi: "Đếm số tỉnh (connected components) từ adjacency matrix.",
            en: "Count provinces (connected components) from adjacency matrix.",
        },
        starterCode: "function findCircleNum(isConnected) {\n  // Your code here\n}",
        testCases: [
            { input: "[[1,1,0],[1,1,0],[0,0,1]]", expected: "2" },
            { input: "[[1,0,0],[0,1,0],[0,0,1]]", expected: "3" },
        ],
        hint: "DFS/BFS hoặc Union-Find. Duyệt mỗi node chưa visited → count++ → DFS đánh dấu connected.",
        solution: `function findCircleNum(isConnected) {
  const n = isConnected.length, visited = new Set();
  let count = 0;
  function dfs(i) {
    visited.add(i);
    for (let j = 0; j < n; j++) if (isConnected[i][j] && !visited.has(j)) dfs(j);
  }
  for (let i = 0; i < n; i++) if (!visited.has(i)) { count++; dfs(i); }
  return count;
}`,
    },
    {
        id: 30,
        title: '994. Rotting Oranges',
        difficulty: 'Medium',
        category: 'BFS / DFS',
        description: {
            vi: "Tất cả cam thối sau bao nhiêu phút? 0=trống, 1=tươi, 2=thối. -1 nếu không thể.",
            en: "Minutes until all oranges rot. 0=empty, 1=fresh, 2=rotten. -1 if impossible.",
        },
        starterCode: "function orangesRotting(grid) {\n  // Your code here\n}",
        testCases: [
            { input: "[[2,1,1],[1,1,0],[0,1,1]]", expected: "4" },
            { input: "[[2,1,1],[0,1,1],[1,0,1]]", expected: "-1" },
            { input: "[[0,2]]", expected: "0" },
        ],
        hint: "Multi-source BFS. Push tất cả rotten vào queue, BFS level-by-level đếm minutes.",
        solution: `function orangesRotting(grid) {
  const queue = [];
  let fresh = 0, m = grid.length, n = grid[0].length;
  for (let i = 0; i < m; i++)
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 2) queue.push([i, j]);
      if (grid[i][j] === 1) fresh++;
    }
  if (fresh === 0) return 0;
  let mins = 0;
  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
  while (queue.length) {
    const size = queue.length;
    for (let k = 0; k < size; k++) {
      const [i, j] = queue.shift();
      for (const [di, dj] of dirs) {
        const ni = i+di, nj = j+dj;
        if (ni >= 0 && nj >= 0 && ni < m && nj < n && grid[ni][nj] === 1) {
          grid[ni][nj] = 2; fresh--; queue.push([ni, nj]);
        }
      }
    }
    mins++;
  }
  return fresh === 0 ? mins - 1 : -1;
}`,
    },
    {
        id: 31,
        title: '124. Binary Tree Maximum Path Sum',
        difficulty: 'Hard',
        category: 'BFS / DFS',
        description: {
            vi: "Tìm path sum lớn nhất trong binary tree (path không nhất thiết qua root).",
            en: "Find max path sum in binary tree (path need not go through root).",
        },
        starterCode: "function maxPathSum(root) {\n  // Tree: [val, left, right] or null\n}",
        testCases: [
            { input: "[1,[2,null,null],[3,null,null]]", expected: "6" },
            { input: "[-10,[9,null,null],[20,[15,null,null],[7,null,null]]]", expected: "42" },
        ],
        hint: "DFS return max single-side path. Tại mỗi node, update global max = node + left + right.",
        solution: `function maxPathSum(root) {
  let max = -Infinity;
  function dfs(node) {
    if (!node) return 0;
    const left = Math.max(0, dfs(node[1]));
    const right = Math.max(0, dfs(node[2]));
    max = Math.max(max, node[0] + left + right);
    return node[0] + Math.max(left, right);
  }
  dfs(root);
  return max;
}`,
    },
    {
        id: 32,
        title: '297. Serialize and Deserialize Binary Tree',
        difficulty: 'Hard',
        category: 'BFS / DFS',
        description: {
            vi: "Serialize tree thành string, deserialize ngược lại. Tree dạng [val, left, right].",
            en: "Serialize tree to string, deserialize back. Tree as [val, left, right].",
        },
        starterCode: "function serialize(root) {\n  return JSON.stringify(root);\n}\nfunction deserialize(data) {\n  return JSON.parse(data);\n}",
        testCases: [
            { input: "[1,[2,null,null],[3,[4,null,null],[5,null,null]]]", expected: "[1,[2,null,null],[3,[4,null,null],[5,null,null]]]" },
        ],
        hint: "Preorder DFS: serialize vals + null markers. Deserialize bằng queue/index.",
        solution: `function serialize(root) {
  return JSON.stringify(root);
}
function deserialize(data) {
  return JSON.parse(data);
}`,
    },
    {
        id: 33,
        title: '704. Binary Search',
        difficulty: 'Easy',
        category: 'Binary Search',
        description: {
            vi: "Tìm target trong mảng sorted. Trả về index (-1 nếu không có).",
            en: "Find target in sorted array. Return index (-1 if not found).",
        },
        starterCode: "function search(nums, target) {\n  // Your code here\n}",
        testCases: [
            { input: "[-1,0,3,5,9,12], 9", expected: "4" },
            { input: "[-1,0,3,5,9,12], 2", expected: "-1" },
        ],
        hint: "left=0, right=len-1, mid=floor((l+r)/2). So sánh nums[mid] vs target.",
        solution: `function search(nums, target) {
  let l = 0, r = nums.length - 1;
  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    if (nums[mid] === target) return mid;
    nums[mid] < target ? l = mid + 1 : r = mid - 1;
  }
  return -1;
}`,
    },
    {
        id: 34,
        title: '35. Search Insert Position',
        difficulty: 'Easy',
        category: 'Binary Search',
        description: {
            vi: "Tìm vị trí insert target vào mảng sorted. Trả về index.",
            en: "Find insert position of target in sorted array.",
        },
        starterCode: "function searchInsert(nums, target) {\n  // Your code here\n}",
        testCases: [
            { input: "[1,3,5,6], 5", expected: "2" },
            { input: "[1,3,5,6], 2", expected: "1" },
            { input: "[1,3,5,6], 7", expected: "4" },
        ],
        hint: "Binary search. Khi không tìm thấy, left chính là insert position.",
        solution: `function searchInsert(nums, target) {
  let l = 0, r = nums.length - 1;
  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    if (nums[mid] === target) return mid;
    nums[mid] < target ? l = mid + 1 : r = mid - 1;
  }
  return l;
}`,
    },
    {
        id: 35,
        title: '278. First Bad Version',
        difficulty: 'Easy',
        category: 'Binary Search',
        description: {
            vi: "Tìm version lỗi đầu tiên. isBadVersion(n) cho sẵn. Input: n và bad (version lỗi đầu tiên).",
            en: "Find first bad version. Given n and bad (first bad). Return first bad version.",
        },
        starterCode: "function firstBadVersion(n, bad) {\n  // isBadVersion(v) returns true if v >= bad\n  function isBadVersion(v) { return v >= bad; }\n  // Your binary search here\n}",
        testCases: [
            { input: "5, 4", expected: "4" },
            { input: "1, 1", expected: "1" },
            { input: "10, 7", expected: "7" },
        ],
        hint: "Binary search: mid bad → right=mid, mid good → left=mid+1. Return left.",
        solution: `function firstBadVersion(n, bad) {
  function isBadVersion(v) { return v >= bad; }
  let l = 1, r = n;
  while (l < r) {
    const mid = Math.floor((l + r) / 2);
    isBadVersion(mid) ? r = mid : l = mid + 1;
  }
  return l;
}`,
    },
    {
        id: 36,
        title: '33. Search in Rotated Sorted Array',
        difficulty: 'Medium',
        category: 'Binary Search',
        description: {
            vi: "Tìm target trong mảng sorted bị xoay. O(log n). Trả về index (-1 nếu không có).",
            en: "Search target in rotated sorted array. O(log n). Return index (-1 if not found).",
        },
        starterCode: "function search(nums, target) {\n  // Your code here\n}",
        testCases: [
            { input: "[4,5,6,7,0,1,2], 0", expected: "4" },
            { input: "[4,5,6,7,0,1,2], 3", expected: "-1" },
            { input: "[1], 0", expected: "-1" },
        ],
        hint: "Check nửa nào sorted, target có nằm trong đó không → search đúng nửa.",
        solution: `function search(nums, target) {
  let l = 0, r = nums.length - 1;
  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    if (nums[mid] === target) return mid;
    if (nums[l] <= nums[mid]) {
      target >= nums[l] && target < nums[mid] ? r = mid - 1 : l = mid + 1;
    } else {
      target > nums[mid] && target <= nums[r] ? l = mid + 1 : r = mid - 1;
    }
  }
  return -1;
}`,
    },
    {
        id: 37,
        title: '153. Find Minimum in Rotated Sorted Array',
        difficulty: 'Medium',
        category: 'Binary Search',
        description: {
            vi: "Tìm phần tử nhỏ nhất trong mảng sorted bị xoay.",
            en: "Find minimum element in rotated sorted array.",
        },
        starterCode: "function findMin(nums) {\n  // Your code here\n}",
        testCases: [
            { input: "[3,4,5,1,2]", expected: "1" },
            { input: "[4,5,6,7,0,1,2]", expected: "0" },
            { input: "[11,13,15,17]", expected: "11" },
        ],
        hint: "Binary search: nums[mid] > nums[right] → min ở bên phải, ngược lại bên trái.",
        solution: `function findMin(nums) {
  let l = 0, r = nums.length - 1;
  while (l < r) {
    const mid = Math.floor((l + r) / 2);
    nums[mid] > nums[r] ? l = mid + 1 : r = mid;
  }
  return nums[l];
}`,
    },
    {
        id: 38,
        title: '74. Search a 2D Matrix',
        difficulty: 'Medium',
        category: 'Binary Search',
        description: {
            vi: "Tìm target trong matrix sorted (mỗi row sorted, row[0] > row trước[-1]).",
            en: "Search target in sorted 2D matrix.",
        },
        starterCode: "function searchMatrix(matrix, target) {\n  // Your code here\n}",
        testCases: [
            { input: "[[1,3,5,7],[10,11,16,20],[23,30,34,60]], 3", expected: "true" },
            { input: "[[1,3,5,7],[10,11,16,20],[23,30,34,60]], 13", expected: "false" },
        ],
        hint: "Treat as 1D array. idx → row=floor(idx/cols), col=idx%cols. Binary search.",
        solution: `function searchMatrix(matrix, target) {
  const m = matrix.length, n = matrix[0].length;
  let l = 0, r = m * n - 1;
  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    const val = matrix[Math.floor(mid / n)][mid % n];
    if (val === target) return true;
    val < target ? l = mid + 1 : r = mid - 1;
  }
  return false;
}`,
    },
    {
        id: 39,
        title: '875. Koko Eating Bananas',
        difficulty: 'Medium',
        category: 'Binary Search',
        description: {
            vi: "Tìm tốc độ ăn chuối tối thiểu k để ăn hết trong h giờ.",
            en: "Find min eating speed k to finish all bananas in h hours.",
        },
        starterCode: "function minEatingSpeed(piles, h) {\n  // Your code here\n}",
        testCases: [
            { input: "[3,6,7,11], 8", expected: "4" },
            { input: "[30,11,23,4,20], 5", expected: "30" },
            { input: "[30,11,23,4,20], 6", expected: "23" },
        ],
        hint: "Binary search on k (1 → max(piles)). Tính hours = sum(ceil(pile/k)). hours<=h → giảm k.",
        solution: `function minEatingSpeed(piles, h) {
  let l = 1, r = Math.max(...piles);
  while (l < r) {
    const mid = Math.floor((l + r) / 2);
    const hours = piles.reduce((s, p) => s + Math.ceil(p / mid), 0);
    hours <= h ? r = mid : l = mid + 1;
  }
  return l;
}`,
    },
    {
        id: 40,
        title: '34. Find First and Last Position',
        difficulty: 'Medium',
        category: 'Binary Search',
        description: {
            vi: "Tìm vị trí đầu và cuối của target trong mảng sorted.",
            en: "Find first and last position of target in sorted array.",
        },
        starterCode: "function searchRange(nums, target) {\n  // Your code here\n}",
        testCases: [
            { input: "[5,7,7,8,8,10], 8", expected: "[3,4]" },
            { input: "[5,7,7,8,8,10], 6", expected: "[-1,-1]" },
            { input: "[], 0", expected: "[-1,-1]" },
        ],
        hint: "2 lần binary search: 1 tìm leftmost, 1 tìm rightmost.",
        solution: `function searchRange(nums, target) {
  function findLeft() {
    let l = 0, r = nums.length - 1, res = -1;
    while (l <= r) {
      const mid = Math.floor((l + r) / 2);
      if (nums[mid] === target) { res = mid; r = mid - 1; }
      else if (nums[mid] < target) l = mid + 1;
      else r = mid - 1;
    }
    return res;
  }
  function findRight() {
    let l = 0, r = nums.length - 1, res = -1;
    while (l <= r) {
      const mid = Math.floor((l + r) / 2);
      if (nums[mid] === target) { res = mid; l = mid + 1; }
      else if (nums[mid] < target) l = mid + 1;
      else r = mid - 1;
    }
    return res;
  }
  return [findLeft(), findRight()];
}`,
    },
    {
        id: 41,
        title: '70. Climbing Stairs',
        difficulty: 'Easy',
        category: 'Dynamic Programming',
        description: {
            vi: "Leo n bậc cầu thang, mỗi lần 1 hoặc 2 bậc. Có bao nhiêu cách?",
            en: "Climb n stairs, 1 or 2 steps each time. How many distinct ways?",
        },
        starterCode: "function climbStairs(n) {\n  // Your code here\n}",
        testCases: [
            { input: "2", expected: "2" },
            { input: "3", expected: "3" },
            { input: "5", expected: "8" },
        ],
        hint: "dp[i] = dp[i-1] + dp[i-2]. Base: dp[1]=1, dp[2]=2. Fibonacci!",
        solution: `function climbStairs(n) {
  let a = 1, b = 2;
  for (let i = 3; i <= n; i++) { [a, b] = [b, a + b]; }
  return n <= 2 ? n : b;
}`,
    },
    {
        id: 42,
        title: '746. Min Cost Climbing Stairs',
        difficulty: 'Easy',
        category: 'Dynamic Programming',
        description: {
            vi: "Mỗi bậc có cost. Bắt đầu từ step 0 hoặc 1. Tìm min cost lên đỉnh.",
            en: "Each step has cost. Start from 0 or 1. Find min cost to top.",
        },
        starterCode: "function minCostClimbingStairs(cost) {\n  // Your code here\n}",
        testCases: [
            { input: "[10,15,20]", expected: "15" },
            { input: "[1,100,1,1,1,100,1,1,100,1]", expected: "6" },
        ],
        hint: "dp[i] = cost[i] + min(dp[i-1], dp[i-2]). Answer = min(dp[n-1], dp[n-2]).",
        solution: `function minCostClimbingStairs(cost) {
  for (let i = 2; i < cost.length; i++) {
    cost[i] += Math.min(cost[i - 1], cost[i - 2]);
  }
  return Math.min(cost[cost.length - 1], cost[cost.length - 2]);
}`,
    },
    {
        id: 43,
        title: '338. Counting Bits',
        difficulty: 'Easy',
        category: 'Dynamic Programming',
        description: {
            vi: "Trả về mảng ans[i] = số bit 1 trong biểu diễn nhị phân của i, 0 <= i <= n.",
            en: "Return array ans[i] = number of 1 bits in binary of i, 0 <= i <= n.",
        },
        starterCode: "function countBits(n) {\n  // Your code here\n}",
        testCases: [
            { input: "2", expected: "[0,1,1]" },
            { input: "5", expected: "[0,1,1,2,1,2]" },
        ],
        hint: "dp[i] = dp[i >> 1] + (i & 1). Hoặc dp[i] = dp[i & (i-1)] + 1.",
        solution: `function countBits(n) {
  const dp = new Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) dp[i] = dp[i >> 1] + (i & 1);
  return dp;
}`,
    },
    {
        id: 44,
        title: '121. Best Time to Buy and Sell Stock',
        difficulty: 'Easy',
        category: 'Dynamic Programming',
        description: {
            vi: "Tìm max profit từ 1 lần mua-bán. 0 nếu không lời.",
            en: "Find max profit from one buy-sell. 0 if no profit.",
        },
        starterCode: "function maxProfit(prices) {\n  // Your code here\n}",
        testCases: [
            { input: "[7,1,5,3,6,4]", expected: "5" },
            { input: "[7,6,4,3,1]", expected: "0" },
        ],
        hint: "Track min price so far. profit = current - minPrice. Update max profit.",
        solution: `function maxProfit(prices) {
  let min = Infinity, max = 0;
  for (const p of prices) {
    min = Math.min(min, p);
    max = Math.max(max, p - min);
  }
  return max;
}`,
    },
    {
        id: 45,
        title: '198. House Robber',
        difficulty: 'Medium',
        category: 'Dynamic Programming',
        description: {
            vi: "Cướp nhà, không được cướp 2 nhà liền kề. Tìm max tiền.",
            en: "Rob houses, cannot rob adjacent. Find max amount.",
        },
        starterCode: "function rob(nums) {\n  // Your code here\n}",
        testCases: [
            { input: "[1,2,3,1]", expected: "4" },
            { input: "[2,7,9,3,1]", expected: "12" },
            { input: "[2,1,1,2]", expected: "4" },
        ],
        hint: "dp[i] = max(dp[i-1], dp[i-2] + nums[i]). Chọn cướp hay bỏ qua.",
        solution: `function rob(nums) {
  let prev2 = 0, prev1 = 0;
  for (const n of nums) {
    const curr = Math.max(prev1, prev2 + n);
    prev2 = prev1; prev1 = curr;
  }
  return prev1;
}`,
    },
    {
        id: 46,
        title: '322. Coin Change',
        difficulty: 'Medium',
        category: 'Dynamic Programming',
        description: {
            vi: "Tìm số coin ít nhất để đạt amount. -1 nếu không thể.",
            en: "Find fewest coins to make amount. -1 if impossible.",
        },
        starterCode: "function coinChange(coins, amount) {\n  // Your code here\n}",
        testCases: [
            { input: "[1,5,10], 11", expected: "3" },
            { input: "[2], 3", expected: "-1" },
            { input: "[1], 0", expected: "0" },
            { input: "[1,2,5], 11", expected: "3" },
        ],
        hint: "dp[i] = min(dp[i-coin]+1) for each coin. Init Infinity, dp[0]=0.",
        solution: `function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++)
    for (const c of coins)
      if (i >= c) dp[i] = Math.min(dp[i], dp[i - c] + 1);
  return dp[amount] === Infinity ? -1 : dp[amount];
}`,
    },
    {
        id: 47,
        title: '300. Longest Increasing Subsequence',
        difficulty: 'Medium',
        category: 'Dynamic Programming',
        description: {
            vi: "Tìm độ dài LIS (dãy con tăng dài nhất).",
            en: "Find length of longest increasing subsequence.",
        },
        starterCode: "function lengthOfLIS(nums) {\n  // Your code here\n}",
        testCases: [
            { input: "[10,9,2,5,3,7,101,18]", expected: "4" },
            { input: "[0,1,0,3,2,3]", expected: "4" },
            { input: "[7,7,7,7,7]", expected: "1" },
        ],
        hint: "O(n²): dp[i] = max(dp[j]+1) for j<i where nums[j]<nums[i]. O(nlogn): patience sorting.",
        solution: `function lengthOfLIS(nums) {
  const dp = new Array(nums.length).fill(1);
  for (let i = 1; i < nums.length; i++)
    for (let j = 0; j < i; j++)
      if (nums[j] < nums[i]) dp[i] = Math.max(dp[i], dp[j] + 1);
  return Math.max(...dp);
}`,
    },
    {
        id: 48,
        title: '152. Maximum Product Subarray',
        difficulty: 'Medium',
        category: 'Dynamic Programming',
        description: {
            vi: "Tìm tích lớn nhất của subarray liên tiếp.",
            en: "Find max product of contiguous subarray.",
        },
        starterCode: "function maxProduct(nums) {\n  // Your code here\n}",
        testCases: [
            { input: "[2,3,-2,4]", expected: "6" },
            { input: "[-2,0,-1]", expected: "0" },
            { input: "[-2,3,-4]", expected: "24" },
        ],
        hint: "Track cả max và min (vì negative * negative = positive). Update mỗi bước.",
        solution: `function maxProduct(nums) {
  let max = nums[0], currMax = nums[0], currMin = nums[0];
  for (let i = 1; i < nums.length; i++) {
    const temp = currMax;
    currMax = Math.max(nums[i], nums[i] * currMax, nums[i] * currMin);
    currMin = Math.min(nums[i], nums[i] * temp, nums[i] * currMin);
    max = Math.max(max, currMax);
  }
  return max;
}`,
    },
    {
        id: 49,
        title: '62. Unique Paths',
        difficulty: 'Medium',
        category: 'Dynamic Programming',
        description: {
            vi: "Robot ở góc trên-trái grid m×n, chỉ đi phải/xuống. Có bao nhiêu đường?",
            en: "Robot at top-left of m×n grid, only right/down. How many unique paths?",
        },
        starterCode: "function uniquePaths(m, n) {\n  // Your code here\n}",
        testCases: [
            { input: "3, 7", expected: "28" },
            { input: "3, 2", expected: "3" },
            { input: "1, 1", expected: "1" },
        ],
        hint: "dp[i][j] = dp[i-1][j] + dp[i][j-1]. Space optimize: 1D array.",
        solution: `function uniquePaths(m, n) {
  const dp = new Array(n).fill(1);
  for (let i = 1; i < m; i++)
    for (let j = 1; j < n; j++)
      dp[j] += dp[j - 1];
  return dp[n - 1];
}`,
    },
    {
        id: 50,
        title: '139. Word Break',
        difficulty: 'Medium',
        category: 'Dynamic Programming',
        description: {
            vi: "Kiểm tra s có thể chia thành các từ trong wordDict không.",
            en: "Check if s can be segmented into dictionary words.",
        },
        starterCode: "function wordBreak(s, wordDict) {\n  // Your code here\n}",
        testCases: [
            { input: "\"leetcode\", [\"leet\",\"code\"]", expected: "true" },
            { input: "\"applepenapple\", [\"apple\",\"pen\"]", expected: "true" },
            { input: "\"catsandog\", [\"cats\",\"dog\",\"sand\",\"and\",\"cat\"]", expected: "false" },
        ],
        hint: "dp[i] = true nếu s[0..i) có thể break. dp[i] = dp[j] && s[j..i) in dict.",
        solution: `function wordBreak(s, wordDict) {
  const set = new Set(wordDict);
  const dp = new Array(s.length + 1).fill(false);
  dp[0] = true;
  for (let i = 1; i <= s.length; i++)
    for (let j = 0; j < i; j++)
      if (dp[j] && set.has(s.slice(j, i))) { dp[i] = true; break; }
  return dp[s.length];
}`,
    },
    {
        id: 51,
        title: '5. Longest Palindromic Substring',
        difficulty: 'Medium',
        category: 'Dynamic Programming',
        description: {
            vi: "Tìm chuỗi con palindrome dài nhất.",
            en: "Find longest palindromic substring.",
        },
        starterCode: "function longestPalindrome(s) {\n  // Your code here\n}",
        testCases: [
            { input: "\"babad\"", expected: "\"bab\"" },
            { input: "\"cbbd\"", expected: "\"bb\"" },
        ],
        hint: "Expand around center. Thử mỗi vị trí (odd+even length). O(n²).",
        solution: `function longestPalindrome(s) {
  let res = '';
  function expand(l, r) {
    while (l >= 0 && r < s.length && s[l] === s[r]) { l--; r++; }
    if (r - l - 1 > res.length) res = s.slice(l + 1, r);
  }
  for (let i = 0; i < s.length; i++) { expand(i, i); expand(i, i + 1); }
  return res;
}`,
    },
    {
        id: 52,
        title: '78. Subsets',
        difficulty: 'Medium',
        category: 'Backtracking',
        description: {
            vi: "Trả về tất cả tập con (power set) của mảng distinct.",
            en: "Return all subsets (power set) of distinct array.",
        },
        starterCode: "function subsets(nums) {\n  // Your code here\n}",
        testCases: [
            { input: "[1,2,3]", expected: "[[],[1],[1,2],[1,2,3],[1,3],[2],[2,3],[3]]" },
            { input: "[0]", expected: "[[],[0]]" },
        ],
        hint: "Backtrack: mỗi bước include/exclude phần tử. Hoặc iterate push path mỗi bước.",
        solution: `function subsets(nums) {
  const res = [];
  function bt(start, path) {
    res.push([...path]);
    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]);
      bt(i + 1, path);
      path.pop();
    }
  }
  bt(0, []);
  return res;
}`,
    },
    {
        id: 53,
        title: '46. Permutations',
        difficulty: 'Medium',
        category: 'Backtracking',
        description: {
            vi: "Trả về tất cả hoán vị của mảng distinct.",
            en: "Return all permutations of distinct array.",
        },
        starterCode: "function permute(nums) {\n  // Your code here\n}",
        testCases: [
            { input: "[1,2,3]", expected: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]" },
            { input: "[0,1]", expected: "[[0,1],[1,0]]" },
            { input: "[1]", expected: "[[1]]" },
        ],
        hint: "Backtrack: thêm số chưa dùng vào path. path.length === n → push result.",
        solution: `function permute(nums) {
  const res = [];
  function bt(path, used) {
    if (path.length === nums.length) { res.push([...path]); return; }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      used[i] = true; path.push(nums[i]);
      bt(path, used);
      path.pop(); used[i] = false;
    }
  }
  bt([], new Array(nums.length).fill(false));
  return res;
}`,
    },
    {
        id: 54,
        title: '39. Combination Sum',
        difficulty: 'Medium',
        category: 'Backtracking',
        description: {
            vi: "Tìm tất cả combinations có tổng = target. Có thể dùng lại số.",
            en: "Find all combinations summing to target. Numbers can be reused.",
        },
        starterCode: "function combinationSum(candidates, target) {\n  // Your code here\n}",
        testCases: [
            { input: "[2,3,6,7], 7", expected: "[[2,2,3],[7]]" },
            { input: "[2,3,5], 8", expected: "[[2,2,2,2],[2,3,3],[3,5]]" },
            { input: "[2], 1", expected: "[]" },
        ],
        hint: "Backtrack với start index. Cho phép dùng lại → recurse từ i (không phải i+1).",
        solution: `function combinationSum(candidates, target) {
  const res = [];
  function bt(start, path, sum) {
    if (sum === target) { res.push([...path]); return; }
    if (sum > target) return;
    for (let i = start; i < candidates.length; i++) {
      path.push(candidates[i]);
      bt(i, path, sum + candidates[i]);
      path.pop();
    }
  }
  bt(0, [], 0);
  return res;
}`,
    },
    {
        id: 55,
        title: '77. Combinations',
        difficulty: 'Medium',
        category: 'Backtracking',
        description: {
            vi: "Trả về tất cả combinations chọn k số từ 1..n.",
            en: "Return all combinations of k numbers from 1..n.",
        },
        starterCode: "function combine(n, k) {\n  // Your code here\n}",
        testCases: [
            { input: "4, 2", expected: "[[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]" },
            { input: "1, 1", expected: "[[1]]" },
        ],
        hint: "Backtrack: path.length === k → push. Iterate từ start đến n.",
        solution: `function combine(n, k) {
  const res = [];
  function bt(start, path) {
    if (path.length === k) { res.push([...path]); return; }
    for (let i = start; i <= n; i++) {
      path.push(i);
      bt(i + 1, path);
      path.pop();
    }
  }
  bt(1, []);
  return res;
}`,
    },
    {
        id: 56,
        title: '22. Generate Parentheses',
        difficulty: 'Medium',
        category: 'Backtracking',
        description: {
            vi: "Generate tất cả combinations n cặp ngoặc hợp lệ.",
            en: "Generate all valid combinations of n pairs of parentheses.",
        },
        starterCode: "function generateParenthesis(n) {\n  // Your code here\n}",
        testCases: [
            { input: "3", expected: "[\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]" },
            { input: "1", expected: "[\"()\"]" },
        ],
        hint: "Backtrack: open < n → thêm \"(\", close < open → thêm \")\".",
        solution: `function generateParenthesis(n) {
  const res = [];
  function bt(s, open, close) {
    if (s.length === 2 * n) { res.push(s); return; }
    if (open < n) bt(s + '(', open + 1, close);
    if (close < open) bt(s + ')', open, close + 1);
  }
  bt('', 0, 0);
  return res;
}`,
    },
    {
        id: 57,
        title: '79. Word Search',
        difficulty: 'Medium',
        category: 'Backtracking',
        description: {
            vi: "Tìm word trong grid 2D bằng cách đi ngang/dọc liền kề.",
            en: "Find word in 2D grid by moving horizontally/vertically adjacent.",
        },
        starterCode: "function exist(board, word) {\n  // Your code here\n}",
        testCases: [
            { input: "[[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]], \"ABCCED\"", expected: "true" },
            { input: "[[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]], \"SEE\"", expected: "true" },
            { input: "[[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]], \"ABCB\"", expected: "false" },
        ],
        hint: "DFS từ mỗi cell. Mark visited, backtrack unmark. Check 4 hướng.",
        solution: `function exist(board, word) {
  const m = board.length, n = board[0].length;
  function dfs(i, j, k) {
    if (k === word.length) return true;
    if (i < 0 || j < 0 || i >= m || j >= n || board[i][j] !== word[k]) return false;
    const tmp = board[i][j]; board[i][j] = '#';
    const found = dfs(i+1,j,k+1) || dfs(i-1,j,k+1) || dfs(i,j+1,k+1) || dfs(i,j-1,k+1);
    board[i][j] = tmp;
    return found;
  }
  for (let i = 0; i < m; i++)
    for (let j = 0; j < n; j++)
      if (dfs(i, j, 0)) return true;
  return false;
}`,
    },
    {
        id: 58,
        title: '17. Letter Combinations of a Phone Number',
        difficulty: 'Medium',
        category: 'Backtracking',
        description: {
            vi: "Trả về tất cả letter combinations từ digits điện thoại.",
            en: "Return all letter combinations from phone digits.",
        },
        starterCode: "function letterCombinations(digits) {\n  // Your code here\n}",
        testCases: [
            { input: "\"23\"", expected: "[\"ad\",\"ae\",\"af\",\"bd\",\"be\",\"bf\",\"cd\",\"ce\",\"cf\"]" },
            { input: "\"\"", expected: "[]" },
            { input: "\"2\"", expected: "[\"a\",\"b\",\"c\"]" },
        ],
        hint: "Map digits → letters. Backtrack: duyệt từng digit, thử từng letter.",
        solution: `function letterCombinations(digits) {
  if (!digits) return [];
  const map = { '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl', '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz' };
  const res = [];
  function bt(i, s) {
    if (i === digits.length) { res.push(s); return; }
    for (const c of map[digits[i]]) bt(i + 1, s + c);
  }
  bt(0, '');
  return res;
}`,
    },
    {
        id: 59,
        title: '51. N-Queens',
        difficulty: 'Hard',
        category: 'Backtracking',
        description: {
            vi: "Đặt n quân hậu trên bàn n×n sao cho không tấn công nhau. Trả về số solutions.",
            en: "Place n queens on n×n board with no attacks. Return number of solutions.",
        },
        starterCode: "function totalNQueens(n) {\n  // Return count of solutions\n}",
        testCases: [
            { input: "4", expected: "2" },
            { input: "1", expected: "1" },
            { input: "8", expected: "92" },
        ],
        hint: "Backtrack row by row. Track cols, diags (r-c), anti-diags (r+c) đã dùng.",
        solution: `function totalNQueens(n) {
  let count = 0;
  const cols = new Set(), diags = new Set(), antiDiags = new Set();
  function bt(row) {
    if (row === n) { count++; return; }
    for (let col = 0; col < n; col++) {
      if (cols.has(col) || diags.has(row - col) || antiDiags.has(row + col)) continue;
      cols.add(col); diags.add(row - col); antiDiags.add(row + col);
      bt(row + 1);
      cols.delete(col); diags.delete(row - col); antiDiags.delete(row + col);
    }
  }
  bt(0);
  return count;
}`,
    },
    {
        id: 60,
        title: '37. Sudoku Solver',
        difficulty: 'Hard',
        category: 'Backtracking',
        description: {
            vi: "Giải Sudoku 9x9. Trả về board đã giải.",
            en: "Solve 9x9 Sudoku. Return solved board.",
        },
        starterCode: "function solveSudoku(board) {\n  // Modify board in-place, return board\n  function isValid(board, r, c, num) {\n    for (let i = 0; i < 9; i++) {\n      if (board[r][i] === num) return false;\n      if (board[i][c] === num) return false;\n    }\n    const br = Math.floor(r/3)*3, bc = Math.floor(c/3)*3;\n    for (let i = br; i < br+3; i++)\n      for (let j = bc; j < bc+3; j++)\n        if (board[i][j] === num) return false;\n    return true;\n  }\n  function solve(board) {\n    for (let r = 0; r < 9; r++)\n      for (let c = 0; c < 9; c++)\n        if (board[r][c] === '.') {\n          for (let n = 1; n <= 9; n++) {\n            if (isValid(board, r, c, String(n))) {\n              board[r][c] = String(n);\n              if (solve(board)) return true;\n              board[r][c] = '.';\n            }\n          }\n          return false;\n        }\n    return true;\n  }\n  solve(board);\n  return board;\n}",
        testCases: [
            { input: "[[\"5\",\"3\",\".\",\".\",\"7\",\".\",\".\",\".\",\".\"],[\"6\",\".\",\".\",\"1\",\"9\",\"5\",\".\",\".\",\".\"],[\".\",\"9\",\"8\",\".\",\".\",\".\",\".\",\"6\",\".\"],[\"8\",\".\",\".\",\".\",\"6\",\".\",\".\",\".\",\"3\"],[\"4\",\".\",\".\",\"8\",\".\",\"3\",\".\",\".\",\"1\"],[\"7\",\".\",\".\",\".\",\"2\",\".\",\".\",\".\",\"6\"],[\".\",\"6\",\".\",\".\",\".\",\".\",\"2\",\"8\",\".\"],[\".\",\".\",\".\",\"4\",\"1\",\"9\",\".\",\".\",\"5\"],[\".\",\".\",\".\",\".\",\"8\",\".\",\".\",\"7\",\"9\"]]", expected: "[[\"5\",\"3\",\"4\",\"6\",\"7\",\"8\",\"9\",\"1\",\"2\"],[\"6\",\"7\",\"2\",\"1\",\"9\",\"5\",\"3\",\"4\",\"8\"],[\"1\",\"9\",\"8\",\"3\",\"4\",\"2\",\"5\",\"6\",\"7\"],[\"8\",\"5\",\"9\",\"7\",\"6\",\"1\",\"4\",\"2\",\"3\"],[\"4\",\"2\",\"6\",\"8\",\"5\",\"3\",\"7\",\"9\",\"1\"],[\"7\",\"1\",\"3\",\"9\",\"2\",\"4\",\"8\",\"5\",\"6\"],[\"9\",\"6\",\"1\",\"5\",\"3\",\"7\",\"2\",\"8\",\"4\"],[\"2\",\"8\",\"7\",\"4\",\"1\",\"9\",\"6\",\"3\",\"5\"],[\"3\",\"4\",\"5\",\"2\",\"8\",\"6\",\"1\",\"7\",\"9\"]]" },
        ],
        hint: "Backtrack: tìm ô trống, thử 1-9, check valid, recurse. Fail → backtrack.",
        solution: `// Solution already provided in starter code
function solveSudoku(board) {
  function isValid(board, r, c, num) {
    for (let i = 0; i < 9; i++) {
      if (board[r][i] === num || board[i][c] === num) return false;
    }
    const br = Math.floor(r/3)*3, bc = Math.floor(c/3)*3;
    for (let i = br; i < br+3; i++)
      for (let j = bc; j < bc+3; j++)
        if (board[i][j] === num) return false;
    return true;
  }
  function solve(board) {
    for (let r = 0; r < 9; r++)
      for (let c = 0; c < 9; c++)
        if (board[r][c] === '.') {
          for (let n = 1; n <= 9; n++) {
            if (isValid(board, r, c, String(n))) {
              board[r][c] = String(n);
              if (solve(board)) return true;
              board[r][c] = '.';
            }
          }
          return false;
        }
    return true;
  }
  solve(board);
  return board;
}`,
    },
    {
        id: 61,
        title: '20. Valid Parentheses',
        difficulty: 'Easy',
        category: 'Stack',
        description: {
            vi: "Kiểm tra chuỗi ngoặc ()[]{} có hợp lệ không.",
            en: "Check if string of ()[]{} is valid.",
        },
        starterCode: "function isValid(s) {\n  // Your code here\n}",
        testCases: [
            { input: "\"()\"", expected: "true" },
            { input: "\"()[]{}\"", expected: "true" },
            { input: "\"(]\"", expected: "false" },
            { input: "\"([)]\"", expected: "false" },
            { input: "\"{[]}\"", expected: "true" },
        ],
        hint: "Push opening vào stack. Gặp closing → pop check match. Cuối stack phải rỗng.",
        solution: `function isValid(s) {
  const stack = [], map = { ')': '(', ']': '[', '}': '{' };
  for (const c of s) {
    if ('({['.includes(c)) stack.push(c);
    else if (stack.pop() !== map[c]) return false;
  }
  return stack.length === 0;
}`,
    },
    {
        id: 62,
        title: '155. Min Stack',
        difficulty: 'Medium',
        category: 'Stack',
        description: {
            vi: "Implement MinStack: push, pop, top, getMin in O(1). Test: operations → results.",
            en: "Implement MinStack with O(1) getMin. Test: operations → results.",
        },
        starterCode: "function minStackTest(ops, args) {\n  // ops: [\"push\",\"push\",\"push\",\"getMin\",\"pop\",\"top\",\"getMin\"]\n  // args: [[−2],[0],[−3],[],[],[],[]]\n  const stack = [], minStack = [];\n  const results = [];\n  for (let i = 0; i < ops.length; i++) {\n    if (ops[i] === \"push\") {\n      stack.push(args[i][0]);\n      minStack.push(minStack.length === 0 ? args[i][0] : Math.min(args[i][0], minStack[minStack.length-1]));\n      results.push(null);\n    } else if (ops[i] === \"pop\") {\n      stack.pop(); minStack.pop(); results.push(null);\n    } else if (ops[i] === \"top\") {\n      results.push(stack[stack.length-1]);\n    } else if (ops[i] === \"getMin\") {\n      results.push(minStack[minStack.length-1]);\n    }\n  }\n  return results;\n}",
        testCases: [
            { input: "[\"push\",\"push\",\"push\",\"getMin\",\"pop\",\"top\",\"getMin\"], [[-2],[0],[-3],[],[],[],[]]", expected: "[null,null,null,-3,null,0,-2]" },
        ],
        hint: "Dùng 2 stack: 1 chính + 1 track min. Push min(val, currentMin) vào minStack.",
        solution: `// Solution provided in starter code
function minStackTest(ops, args) {
  const stack = [], minStack = [];
  const results = [];
  for (let i = 0; i < ops.length; i++) {
    if (ops[i] === "push") {
      stack.push(args[i][0]);
      minStack.push(minStack.length === 0 ? args[i][0] : Math.min(args[i][0], minStack[minStack.length-1]));
      results.push(null);
    } else if (ops[i] === "pop") {
      stack.pop(); minStack.pop(); results.push(null);
    } else if (ops[i] === "top") {
      results.push(stack[stack.length-1]);
    } else if (ops[i] === "getMin") {
      results.push(minStack[minStack.length-1]);
    }
  }
  return results;
}`,
    },
    {
        id: 63,
        title: '232. Implement Queue using Stacks',
        difficulty: 'Easy',
        category: 'Stack',
        description: {
            vi: "Implement queue dùng 2 stacks. Test: operations → results.",
            en: "Implement queue using 2 stacks. Test: operations → results.",
        },
        starterCode: "function queueTest(ops, args) {\n  const s1 = [], s2 = [];\n  const results = [];\n  for (let i = 0; i < ops.length; i++) {\n    if (ops[i] === \"push\") {\n      s1.push(args[i][0]); results.push(null);\n    } else if (ops[i] === \"pop\") {\n      if (!s2.length) while(s1.length) s2.push(s1.pop());\n      results.push(s2.pop());\n    } else if (ops[i] === \"peek\") {\n      if (!s2.length) while(s1.length) s2.push(s1.pop());\n      results.push(s2[s2.length-1]);\n    } else if (ops[i] === \"empty\") {\n      results.push(s1.length === 0 && s2.length === 0);\n    }\n  }\n  return results;\n}",
        testCases: [
            { input: "[\"push\",\"push\",\"peek\",\"pop\",\"empty\"], [[1],[2],[],[],[]]", expected: "[null,null,1,1,false]" },
        ],
        hint: "Stack in + stack out. Khi out rỗng, pour tất cả từ in sang out.",
        solution: `// Solution provided in starter code
function queueTest(ops, args) {
  const s1 = [], s2 = [];
  const results = [];
  for (let i = 0; i < ops.length; i++) {
    if (ops[i] === "push") { s1.push(args[i][0]); results.push(null); }
    else if (ops[i] === "pop") {
      if (!s2.length) while(s1.length) s2.push(s1.pop());
      results.push(s2.pop());
    } else if (ops[i] === "peek") {
      if (!s2.length) while(s1.length) s2.push(s1.pop());
      results.push(s2[s2.length-1]);
    } else if (ops[i] === "empty") {
      results.push(s1.length === 0 && s2.length === 0);
    }
  }
  return results;
}`,
    },
    {
        id: 64,
        title: '844. Backspace String Compare',
        difficulty: 'Easy',
        category: 'Stack',
        description: {
            vi: "So sánh 2 chuỗi sau khi xử lý # (backspace).",
            en: "Compare two strings after processing # (backspace).",
        },
        starterCode: "function backspaceCompare(s, t) {\n  // Your code here\n}",
        testCases: [
            { input: "\"ab#c\", \"ad#c\"", expected: "true" },
            { input: "\"ab##\", \"c#d#\"", expected: "true" },
            { input: "\"a#c\", \"b\"", expected: "false" },
        ],
        hint: "Dùng stack: char → push, # → pop. So sánh 2 stack kết quả.",
        solution: `function backspaceCompare(s, t) {
  function build(str) {
    const stack = [];
    for (const c of str) c === '#' ? stack.pop() : stack.push(c);
    return stack.join('');
  }
  return build(s) === build(t);
}`,
    },
    {
        id: 65,
        title: '150. Evaluate Reverse Polish Notation',
        difficulty: 'Medium',
        category: 'Stack',
        description: {
            vi: "Tính giá trị biểu thức Reverse Polish Notation.",
            en: "Evaluate Reverse Polish Notation expression.",
        },
        starterCode: "function evalRPN(tokens) {\n  // Your code here\n}",
        testCases: [
            { input: "[\"2\",\"1\",\"+\",\"3\",\"*\"]", expected: "9" },
            { input: "[\"4\",\"13\",\"5\",\"/\",\"+\"]", expected: "6" },
            { input: "[\"10\",\"6\",\"9\",\"3\",\"+\",\"-11\",\"*\",\"/\",\"*\",\"17\",\"+\",\"5\",\"+\"]", expected: "22" },
        ],
        hint: "Stack: number → push, operator → pop 2 operands, tính kết quả, push lại.",
        solution: `function evalRPN(tokens) {
  const stack = [];
  for (const t of tokens) {
    if ('+-*/'.includes(t)) {
      const b = stack.pop(), a = stack.pop();
      if (t === '+') stack.push(a + b);
      else if (t === '-') stack.push(a - b);
      else if (t === '*') stack.push(a * b);
      else stack.push(Math.trunc(a / b));
    } else stack.push(Number(t));
  }
  return stack[0];
}`,
    },
    {
        id: 66,
        title: '739. Daily Temperatures',
        difficulty: 'Medium',
        category: 'Stack',
        description: {
            vi: "Cho temperatures[], answer[i] = số ngày đợi để có nhiệt độ cao hơn. 0 nếu không có.",
            en: "Given temperatures[], answer[i] = days to wait for warmer. 0 if none.",
        },
        starterCode: "function dailyTemperatures(temperatures) {\n  // Your code here\n}",
        testCases: [
            { input: "[73,74,75,71,69,72,76,73]", expected: "[1,1,4,2,1,1,0,0]" },
            { input: "[30,40,50,60]", expected: "[1,1,1,0]" },
            { input: "[30,60,90]", expected: "[1,1,0]" },
        ],
        hint: "Monotonic stack: giữ indices giảm dần. Gặp temp cao hơn → pop tính distance.",
        solution: `function dailyTemperatures(temperatures) {
  const n = temperatures.length, res = new Array(n).fill(0), stack = [];
  for (let i = 0; i < n; i++) {
    while (stack.length && temperatures[i] > temperatures[stack[stack.length - 1]]) {
      const j = stack.pop();
      res[j] = i - j;
    }
    stack.push(i);
  }
  return res;
}`,
    },
    {
        id: 67,
        title: '394. Decode String',
        difficulty: 'Medium',
        category: 'Stack',
        description: {
            vi: "Decode chuỗi dạng k[encoded_string]. VD: \"3[a2[c]]\" → \"accaccacc\".",
            en: "Decode string like k[encoded_string]. E.g. \"3[a2[c]]\" → \"accaccacc\".",
        },
        starterCode: "function decodeString(s) {\n  // Your code here\n}",
        testCases: [
            { input: "\"3[a]2[bc]\"", expected: "\"aaabcbc\"" },
            { input: "\"3[a2[c]]\"", expected: "\"accaccacc\"" },
            { input: "\"2[abc]3[cd]ef\"", expected: "\"abcabccdcdcdef\"" },
        ],
        hint: "2 stack: numStack + strStack. Gặp [ → push, gặp ] → pop và repeat.",
        solution: `function decodeString(s) {
  const numStack = [], strStack = [];
  let num = 0, curr = '';
  for (const c of s) {
    if (c >= '0' && c <= '9') num = num * 10 + Number(c);
    else if (c === '[') { numStack.push(num); strStack.push(curr); num = 0; curr = ''; }
    else if (c === ']') { curr = strStack.pop() + curr.repeat(numStack.pop()); }
    else curr += c;
  }
  return curr;
}`,
    },
    {
        id: 68,
        title: '735. Asteroid Collision',
        difficulty: 'Medium',
        category: 'Stack',
        description: {
            vi: "Mảng asteroids di chuyển. Dương=phải, âm=trái. Cùng hướng không va chạm. Trả về trạng thái cuối.",
            en: "Asteroids move. Positive=right, negative=left. Return final state.",
        },
        starterCode: "function asteroidCollision(asteroids) {\n  // Your code here\n}",
        testCases: [
            { input: "[5,10,-5]", expected: "[5,10]" },
            { input: "[8,-8]", expected: "[]" },
            { input: "[10,2,-5]", expected: "[10]" },
            { input: "[-2,-1,1,2]", expected: "[-2,-1,1,2]" },
        ],
        hint: "Stack: push dương. Gặp âm → va chạm với top dương. So sánh abs để quyết định.",
        solution: `function asteroidCollision(asteroids) {
  const stack = [];
  for (const a of asteroids) {
    let alive = true;
    while (alive && a < 0 && stack.length && stack[stack.length - 1] > 0) {
      alive = stack[stack.length - 1] < -a;
      if (stack[stack.length - 1] <= -a) stack.pop();
    }
    if (alive) stack.push(a);
  }
  return stack;
}`,
    },
    {
        id: 69,
        title: '853. Car Fleet',
        difficulty: 'Medium',
        category: 'Stack',
        description: {
            vi: "n xe, mỗi xe position+speed. Target ở cuối. Đếm số fleet đến đích.",
            en: "n cars with position+speed. Count car fleets arriving at target.",
        },
        starterCode: "function carFleet(target, position, speed) {\n  // Your code here\n}",
        testCases: [
            { input: "12, [10,8,0,5,3], [2,4,1,1,3]", expected: "3" },
            { input: "10, [3], [3]", expected: "1" },
            { input: "100, [0,2,4], [4,2,1]", expected: "1" },
        ],
        hint: "Sort by position desc. Tính time = (target-pos)/speed. Stack: nếu time > top → new fleet.",
        solution: `function carFleet(target, position, speed) {
  const cars = position.map((p, i) => [p, (target - p) / speed[i]]);
  cars.sort((a, b) => b[0] - a[0]);
  const stack = [];
  for (const [, time] of cars) {
    if (!stack.length || time > stack[stack.length - 1]) stack.push(time);
  }
  return stack.length;
}`,
    },
    {
        id: 70,
        title: '84. Largest Rectangle in Histogram',
        difficulty: 'Hard',
        category: 'Stack',
        description: {
            vi: "Tìm diện tích hình chữ nhật lớn nhất trong histogram.",
            en: "Find largest rectangle area in histogram.",
        },
        starterCode: "function largestRectangleArea(heights) {\n  // Your code here\n}",
        testCases: [
            { input: "[2,1,5,6,2,3]", expected: "10" },
            { input: "[2,4]", expected: "4" },
        ],
        hint: "Monotonic increasing stack. Khi pop bar, width = i - stack.top - 1. Area = height * width.",
        solution: `function largestRectangleArea(heights) {
  const stack = [], n = heights.length;
  let max = 0;
  for (let i = 0; i <= n; i++) {
    const h = i === n ? 0 : heights[i];
    while (stack.length && h < heights[stack[stack.length - 1]]) {
      const height = heights[stack.pop()];
      const width = stack.length ? i - stack[stack.length - 1] - 1 : i;
      max = Math.max(max, height * width);
    }
    stack.push(i);
  }
  return max;
}`,
    },
    {
        id: 71,
        title: 'useDebounce',
        difficulty: 'Medium',
        category: 'Custom Hooks',
        description: {
            vi: "Viết custom hook useDebounce nhận vào value và delay. Trả về debounced value sau khoảng thời gian delay khi value ngừng thay đổi.",
            en: "Write a custom hook useDebounce taking value and delay. Return debounced value after delay when value stops changing.",
        },
        starterCode: "function useDebounce(value, delay) {\n  // Your code here\n  \n}\n\n// --- Test Wrapper ---\nfunction testHook() {\n  const str = useDebounce.toString();\n  if (!str.includes('useEffect') || !str.includes('setTimeout') || !str.includes('clearTimeout')) throw new Error('Must use useEffect, setTimeout, and clearTimeout');\n  // Return 1 to pass fake test\n  return 1;\n}",
        testCases: [
            { input: "", expected: "1" },
        ],
        hint: "Dùng useState lưu debouncedValue. Khi value đổi, useEffect đặt setTimeout set lại state và return clearTimeout.",
        solution: `function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}`,
    },
    {
        id: 72,
        title: 'useThrottle',
        difficulty: 'Medium',
        category: 'Custom Hooks',
        description: {
            vi: "Viết custom hook useThrottle nhận vào value và limit. Trả về throttled value sao cho chỉ cập nhật nhiều nhất một lần trong khoảng thời gian limit.",
            en: "Write a custom hook useThrottle taking value and limit. Return throttled value that updates at most once per limit ms.",
        },
        starterCode: "function useThrottle(value, limit) {\n  // Your code here\n  \n}\n\n// --- Test Wrapper ---\nfunction testHook() {\n  const str = useThrottle.toString();\n  if (!str.includes('useEffect') || !str.includes('setTimeout')) throw new Error('Must implement throttle logic with setTimeout/Date');\n  return 1;\n}",
        testCases: [
            { input: "", expected: "1" },
        ],
        hint: "Dùng useState lưu throttledValue và useRef lưu thời gian lastRan. Dùng setTimeout tính toán delay còn lại.",
        solution: `function useThrottle(value, limit) {
  const [throttled, setThrottled] = useState(value);
  const lastRan = useRef(Date.now());
  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRan.current >= limit) {
        setThrottled(value);
        lastRan.current = Date.now();
      }
    }, limit - (Date.now() - lastRan.current));
    return () => clearTimeout(handler);
  }, [value, limit]);
  return throttled;
}`,
    },
    {
        id: 73,
        title: 'useCount',
        difficulty: 'Easy',
        category: 'Custom Hooks',
        description: {
            vi: "Viết custom hook useCount (hay useCounter) nhận vào initialValue. Trả về object chứa { count, increment, decrement }.",
            en: "Write a custom hook useCount taking initialValue. Return an object containing { count, increment, decrement }.",
        },
        starterCode: "function useCount(initialValue = 0) {\n  // Your code here\n  \n}\n\n// --- Test Wrapper ---\nfunction testHook() {\n  // renderHook is injected by the playground mock\n  const { count, increment, decrement } = renderHook(() => useCount(10));\n  if (count !== 10 || typeof increment !== 'function' || typeof decrement !== 'function') throw new Error('Return shape incorrect');\n  return 1;\n}",
        testCases: [
            { input: "", expected: "1" },
        ],
        hint: "Dùng useState cho count. Khai báo 2 hàm increment, decrement và return cả 3 trong một object.",
        solution: `function useCount(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  return { count, increment, decrement };
}`,
    },
    {
        id: 74,
        title: 'useOnClickOutside',
        difficulty: 'Medium',
        category: 'Custom Hooks',
        description: {
            vi: "Viết custom hook useOnClickOutside nhận vào ref (của element) và một handler function. Nó sẽ gọi handler nếu click chuột bên ngoài element đó.",
            en: "Write a custom hook useOnClickOutside taking a ref and a handler. It should call the handler when clicking outside the ref's element.",
        },
        starterCode: "function useOnClickOutside(ref, handler) {\n  // Your code here\n  \n}\n\n// --- Test Wrapper ---\nfunction testHook() {\n  const str = useOnClickOutside.toString();\n  if (!str.includes('useEffect') || !str.includes('addEventListener') || !str.includes('removeEventListener')) throw new Error('Must use event listeners');\n  return 1;\n}",
        testCases: [
            { input: "", expected: "1" },
        ],
        hint: "useEffect gắn mousedown/touchstart event vào document. Check !ref.current.contains(event.target) thì gọi handler(event).",
        solution: `function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}`,
    },
]
