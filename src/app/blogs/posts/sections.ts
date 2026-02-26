// Blog section index — used by search to deep-link to specific sections
// IDs match the auto-generated slugs from Heading2 textToSlug function

import { Lang } from '../types'

export interface BlogSection {
    id: string
    title: Record<Lang, string>
}

export const blogSections: Record<string, BlogSection[]> = {
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
}
