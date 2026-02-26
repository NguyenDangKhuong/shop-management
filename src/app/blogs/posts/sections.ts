// Blog section index — used by search to deep-link to specific sections
// IDs match the auto-generated slugs from Heading2 textToSlug function

import { Lang } from '../types'

export interface BlogSection {
    id: string
    title: Record<Lang, string>
}

export const blogSections: Record<string, BlogSection[]> = {
    'algorithm-patterns': [
        { id: '1-hash-map--hash-set-tm-kim-o1', title: { vi: 'Hash Map / Hash Set', en: 'Hash Map / Hash Set' } },
        { id: '2-two-pointers-hai-con-tr', title: { vi: 'Two Pointers', en: 'Two Pointers' } },
        { id: '3-sliding-window-ca-s-trt', title: { vi: 'Sliding Window', en: 'Sliding Window' } },
        { id: '4-stack-ngn-xp', title: { vi: 'Stack', en: 'Stack' } },
        { id: '5-bfs--dfs-duyt-th-v-cy', title: { vi: 'BFS / DFS', en: 'BFS / DFS' } },
        { id: '6-binary-search-tm-kim-nh-phn', title: { vi: 'Binary Search', en: 'Binary Search' } },
        { id: '7-dynamic-programming-quy-hoch-ng', title: { vi: 'Dynamic Programming', en: 'Dynamic Programming' } },
    ],
    'ecmascript-features': [
        { id: 'es6-2015-nm-khi-u', title: { vi: 'ES6 (2015) — Năm khởi đầu', en: 'ES6 (2015) — The Beginning' } },
        { id: 'es2016-es2017', title: { vi: 'ES2016 & ES2017', en: 'ES2016 & ES2017' } },
        { id: 'es2018-es2019', title: { vi: 'ES2018 & ES2019', en: 'ES2018 & ES2019' } },
        { id: 'es2020-big-changes', title: { vi: 'ES2020 — Big Changes', en: 'ES2020 — Big Changes' } },
        { id: 'es2021-es2022', title: { vi: 'ES2021 & ES2022', en: 'ES2021 & ES2022' } },
        { id: 'es2023-es2024', title: { vi: 'ES2023 & ES2024', en: 'ES2023 & ES2024' } },
    ],
    'react-features': [
        { id: 'react-16-2017-fiber-architecture', title: { vi: 'React 16 — Fiber', en: 'React 16 — Fiber Architecture' } },
        { id: 'react-168-2019-hooks-revolution', title: { vi: 'React 16.8 — Hooks', en: 'React 16.8 — Hooks Revolution' } },
        { id: 'react-17-2020-no-new-features', title: { vi: 'React 17', en: 'React 17 — No New Features' } },
        { id: 'react-18-2022-concurrent-react', title: { vi: 'React 18 — Concurrent', en: 'React 18 — Concurrent React' } },
        { id: 'react-19-2024-the-full-stack-era', title: { vi: 'React 19 — Full-stack', en: 'React 19 — Full-stack Era' } },
    ],
    'nextjs-features': [
        { id: 'nextjs-12-2021-middleware-swc-compiler', title: { vi: 'Next.js 12 — Middleware & SWC', en: 'Next.js 12 — Middleware & SWC' } },
        { id: 'nextjs-13-2022-app-router-revolution', title: { vi: 'Next.js 13 — App Router', en: 'Next.js 13 — App Router' } },
        { id: 'nextjs-14-2023-server-actions-stable', title: { vi: 'Next.js 14 — Server Actions', en: 'Next.js 14 — Server Actions' } },
        { id: 'nextjs-15-2024-react-19-turbopack-stable', title: { vi: 'Next.js 15 — React 19 & Turbopack', en: 'Next.js 15 — React 19 & Turbopack' } },
    ],
    'data-types-structures': [
        { id: 'kiu-d-liu-c-bn-primitives', title: { vi: 'Primitives — Kiểu cơ bản', en: 'Primitive Types' } },
        { id: 'typescript-h-thng-kiu-nng-cao', title: { vi: 'TypeScript Types', en: 'TypeScript — Advanced Types' } },
        { id: 'array-cu-trc-d-liu-nn-tng', title: { vi: 'Array', en: 'Array' } },
        { id: 'object-key-value-c-bn', title: { vi: 'Object — Key-Value', en: 'Object — Key-Value' } },
        { id: 'map-hash-map-ng-ngha', title: { vi: 'Map — Hash Map', en: 'Map — Hash Map' } },
        { id: 'set-tp-hp-unique-values', title: { vi: 'Set — Unique Values', en: 'Set — Unique Values' } },
        { id: 'weakmap-weakset-garbage-collection-friendly', title: { vi: 'WeakMap & WeakSet', en: 'WeakMap & WeakSet' } },
        { id: 'stack-lifo-last-in-first-out', title: { vi: 'Stack — LIFO', en: 'Stack — LIFO' } },
        { id: 'queue-deque-fifo-first-in-first-out', title: { vi: 'Queue & Deque — FIFO', en: 'Queue & Deque — FIFO' } },
        { id: 'linked-list', title: { vi: 'Linked List', en: 'Linked List' } },
        { id: 'heap-priority-queue', title: { vi: 'Heap / Priority Queue', en: 'Heap / Priority Queue' } },
        { id: 'trie-prefix-tree', title: { vi: 'Trie — Prefix Tree', en: 'Trie — Prefix Tree' } },
        { id: 'graph-biu-din-duyt', title: { vi: 'Graph', en: 'Graph' } },
        { id: 'big-o-cheat-sheet', title: { vi: 'Big-O Cheat Sheet', en: 'Big-O Cheat Sheet' } },
    ],
    'unit-testing-guide': [
        { id: 'setup-jest-typescript', title: { vi: 'Setup Jest + TypeScript', en: 'Setup Jest + TypeScript' } },
        { id: 'jest-c-bn-matchers-assertions', title: { vi: 'Jest — Matchers', en: 'Jest Basics — Matchers' } },
        { id: 'test-pure-functions', title: { vi: 'Test Pure Functions', en: 'Test Pure Functions' } },
        { id: 'test-async-code', title: { vi: 'Test Async Code', en: 'Testing Async Code' } },
        { id: 'mocking-gi-lp-dependencies', title: { vi: 'Mocking', en: 'Mocking' } },
        { id: 'test-react-components-vi-testing-library', title: { vi: 'Test React Components', en: 'Testing React Components' } },
        { id: 'test-custom-hooks', title: { vi: 'Test Custom Hooks', en: 'Testing Custom Hooks' } },
        { id: 'test-api-routes-nextjs', title: { vi: 'Test API Routes', en: 'Testing API Routes' } },
        { id: 'coverage-best-practices', title: { vi: 'Coverage & Best Practices', en: 'Coverage & Best Practices' } },
    ],
    'event-loop': [
        { id: '1-bc-tranh-tng-quan', title: { vi: 'Bức tranh tổng quan', en: 'The Big Picture' } },
        { id: '2-call-stack-ngn-xp-thc-thi', title: { vi: 'Call Stack', en: 'Call Stack' } },
        { id: '3-web-apis-ni-x-l-async', title: { vi: 'Web APIs', en: 'Web APIs' } },
        { id: '4-macrotask-vs-microtask', title: { vi: 'Macrotask vs Microtask', en: 'Macrotask vs Microtask' } },
        { id: '6-event-loop-trong-nodejs', title: { vi: 'Event Loop trong Node.js', en: 'Event Loop in Node.js' } },
    ],
    'react-hooks-chi-tiet': [
        { id: '1-usestate-qun-l-state', title: { vi: 'useState', en: 'useState' } },
        { id: '2-useeffect-side-effects', title: { vi: 'useEffect', en: 'useEffect' } },
        { id: '3-useref-tham-chiu-khng-gy-re-render', title: { vi: 'useRef', en: 'useRef' } },
        { id: '4-usememo-ghi-nh-gi-tr-tnh-ton', title: { vi: 'useMemo', en: 'useMemo' } },
        { id: '5-usecallback-ghi-nh-function', title: { vi: 'useCallback', en: 'useCallback' } },
        { id: '6-usecontext-chia-s-d-liu-ton-cc', title: { vi: 'useContext', en: 'useContext' } },
        { id: '7-usereducer-state-phc-tp', title: { vi: 'useReducer', en: 'useReducer' } },
    ],
    'callback-promise-async-await': [
        { id: '1-callback-khi-u', title: { vi: 'Callback', en: 'Callback' } },
        { id: '2-promise-gii-phng-callback-hell', title: { vi: 'Promise', en: 'Promise' } },
        { id: '3-asyncawait-ng-php-hin-i', title: { vi: 'Async/Await', en: 'Async/Await' } },
    ],
    'hash-map-pattern': [
        { id: 'khi-no-dng-hash-map', title: { vi: 'Khi nào dùng?', en: 'When to Use?' } },
        { id: 'bi-1-two-sum-leetcode-1', title: { vi: 'Two Sum', en: 'Two Sum' } },
        { id: 'bi-2-group-anagrams-leetcode-49', title: { vi: 'Group Anagrams', en: 'Group Anagrams' } },
        { id: 'bi-3-contains-duplicate-leetcode-217', title: { vi: 'Contains Duplicate', en: 'Contains Duplicate' } },
    ],
    'two-pointers-pattern': [
        { id: 'khi-no-dng-two-pointers', title: { vi: 'Khi nào dùng?', en: 'When to Use?' } },
        { id: 'bi-1-two-sum-ii-mng-sn-xp-leetcode-167', title: { vi: 'Two Sum II', en: 'Two Sum II' } },
        { id: 'bi-2-valid-palindrome-leetcode-125', title: { vi: 'Valid Palindrome', en: 'Valid Palindrome' } },
        { id: 'bi-3-container-with-most-water-leetcode-11', title: { vi: 'Container With Most Water', en: 'Container With Most Water' } },
        { id: 'bi-4-merge-hai-mng-sn-xp-leetcode-88', title: { vi: 'Merge Sorted Array', en: 'Merge Sorted Array' } },
    ],
    'sliding-window-pattern': [
        { id: 'khi-no-dng-sliding-window', title: { vi: 'Khi nào dùng?', en: 'When to Use?' } },
        { id: 'bi-1-longest-substring-without-repeating-characters-leetcode-3', title: { vi: 'Longest Substring', en: 'Longest Substring' } },
        { id: 'bi-2-minimum-window-substring-leetcode-76', title: { vi: 'Min Window Substring', en: 'Min Window Substring' } },
        { id: 'bi-3-maximum-sum-subarray-of-size-k', title: { vi: 'Max Sum Subarray', en: 'Max Sum Subarray' } },
    ],
    'stack-pattern': [
        { id: 'khi-no-dng-stack', title: { vi: 'Khi nào dùng?', en: 'When to Use?' } },
        { id: 'bi-1-valid-parentheses-leetcode-20', title: { vi: 'Valid Parentheses', en: 'Valid Parentheses' } },
        { id: 'bi-2-daily-temperatures-leetcode-739', title: { vi: 'Daily Temperatures', en: 'Daily Temperatures' } },
        { id: 'bi-3-min-stack-leetcode-155', title: { vi: 'Min Stack', en: 'Min Stack' } },
    ],
    'bfs-dfs-pattern': [
        { id: 'khi-no-dng-bfs--dfs', title: { vi: 'Khi nào dùng?', en: 'When to Use?' } },
        { id: 'bi-1-number-of-islands-leetcode-200', title: { vi: 'Number of Islands', en: 'Number of Islands' } },
        { id: 'bi-2-binary-tree-level-order-traversal-leetcode-102', title: { vi: 'Level Order', en: 'Level Order' } },
        { id: 'bi-3-word-search-leetcode-79', title: { vi: 'Word Search', en: 'Word Search' } },
    ],
    'binary-search-pattern': [
        { id: 'khi-no-dng-binary-search', title: { vi: 'Khi nào dùng?', en: 'When to Use?' } },
        { id: 'bi-1-binary-search-c-in-leetcode-704', title: { vi: 'Binary Search', en: 'Binary Search' } },
        { id: 'bi-2-koko-eating-bananas-leetcode-875', title: { vi: 'Koko Eating Bananas', en: 'Koko Eating Bananas' } },
        { id: 'bi-3-search-in-rotated-sorted-array-leetcode-33', title: { vi: 'Search Rotated Array', en: 'Search Rotated Array' } },
    ],
    'dynamic-programming-pattern': [
        { id: 'khi-no-dng-dynamic-programming', title: { vi: 'Khi nào dùng?', en: 'When to Use?' } },
        { id: 'bi-1-climbing-stairs-leetcode-70', title: { vi: 'Climbing Stairs', en: 'Climbing Stairs' } },
        { id: 'bi-2-coin-change-leetcode-322', title: { vi: 'Coin Change', en: 'Coin Change' } },
        { id: 'bi-3-longest-common-subsequence-leetcode-1143', title: { vi: 'LCS', en: 'LCS' } },
    ],
    'js-common-functions': [
        { id: 'array-methods--x-l-mng', title: { vi: 'Array Methods', en: 'Array Methods' } },
        { id: 'string-methods--x-l-chui', title: { vi: 'String Methods', en: 'String Methods' } },
        { id: 'object-methods--x-l-i-tng', title: { vi: 'Object Methods', en: 'Object Methods' } },
        { id: 'modern-javascript--c-php-hin-i', title: { vi: 'Modern JS', en: 'Modern JS' } },
    ],
}

