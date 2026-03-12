import { BlogPost } from '../types'
import { CodeBlock, Heading2, Heading3, Paragraph, Highlight, InlineCode, Callout } from '../components/BlogComponents'

const viContent = (
    <>
        <Paragraph>
            <Highlight>Stack</Highlight> (ngăn xếp) hoạt động theo nguyên tắc <Highlight>LIFO</Highlight> — Last In, First Out.
            Phần tử được thêm vào cuối cùng sẽ được lấy ra đầu tiên. Trong JavaScript, ta dùng mảng với
            <InlineCode>push()</InlineCode> để thêm và <InlineCode>pop()</InlineCode> để lấy ra.
        </Paragraph>

        <Callout type="info">
            Stack rất hiệu quả khi bài toán có tính chất <Highlight>lồng nhau</Highlight> (ngoặc, đệ quy),
            cần <Highlight>quay lại trạng thái trước</Highlight>, hoặc tìm phần tử gần nhất thỏa điều kiện
            (Monotonic Stack).
        </Callout>

        <Heading2>Cách dùng Stack trong JavaScript</Heading2>

        <CodeBlock title="stack-api.js">{`// ═══ Stack API — dùng Array làm Stack ═══
const stack = []
stack.push(1)        // Thêm vào đỉnh: [1]
stack.push(2)        // [1, 2]
stack.push(3)        // [1, 2, 3]
stack.pop()          // Lấy ra: 3, stack = [1, 2]
stack[stack.length-1] // Peek (đỉnh stack): 2 — không xóa
stack.length          // Size: 2
stack.length === 0    // isEmpty: false

// ═══ TEMPLATE: Monotonic Stack (tìm phần tử lớn/nhỏ hơn gần nhất) ═══
// VD: Với mỗi phần tử, tìm phần tử LỚN HƠN tiếp theo bên phải
const result = new Array(arr.length).fill(-1)
const monoStack = []  // Lưu INDEX, giảm dần

for (let i = 0; i < arr.length; i++) {
    // Pop tất cả phần tử nhỏ hơn arr[i]
    while (monoStack.length && arr[monoStack[monoStack.length-1]] < arr[i]) {
        const idx = monoStack.pop()
        result[idx] = arr[i]  // arr[i] là next greater của arr[idx]
    }
    monoStack.push(i)
}
// VD: arr = [2, 1, 4, 3] → result = [4, 4, -1, -1]`}</CodeBlock>

        <Heading2>Khi nào dùng Stack?</Heading2>

        <div className="my-4 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
                <thead>
                    <tr className="border-b border-[var(--border-primary)]">
                        <th className="text-left p-3 text-[var(--text-secondary)] font-medium">Dấu hiệu bài toán</th>
                        <th className="text-left p-3 text-[var(--text-secondary)] font-medium">Ví dụ LeetCode</th>
                    </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                    <tr className="border-b border-gray-100"><td className="p-3">Kiểm tra ngoặc hợp lệ</td><td className="p-3">Valid Parentheses (#20)</td></tr>
                    <tr className="border-b border-gray-100"><td className="p-3">Tìm phần tử lớn/nhỏ hơn gần nhất</td><td className="p-3">Daily Temperatures (#739)</td></tr>
                    <tr className="border-b border-gray-100"><td className="p-3">Stack hỗ trợ lấy min O(1)</td><td className="p-3">Min Stack (#155)</td></tr>
                    <tr className="border-b border-gray-100"><td className="p-3">Decode chuỗi lồng nhau</td><td className="p-3">Decode String (#394)</td></tr>
                    <tr><td className="p-3">Tính toán biểu thức</td><td className="p-3">Evaluate RPN (#150)</td></tr>
                </tbody>
            </table>
        </div>

        {/* ───────── BÀI 1 ───────── */}
        <Heading2>Bài 1: Valid Parentheses (<a href="https://leetcode.com/problems/valid-parentheses/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline decoration-blue-400/30 hover:decoration-blue-300">LeetCode #20</a>)</Heading2>

        <Heading3>Đề bài</Heading3>
        <Paragraph>
            Cho một chuỗi chỉ chứa các ký tự <InlineCode>{'(, ), {, }, [, ]'}</InlineCode>,
            kiểm tra xem chuỗi có <Highlight>hợp lệ</Highlight> không (mỗi ngoặc mở phải có ngoặc đóng tương ứng, đúng thứ tự).
        </Paragraph>

        <Heading3>Giải pháp với Stack</Heading3>
        <div className="my-4 space-y-2 text-sm text-[var(--text-secondary)]">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">1.</span>
                <span>Duyệt từng ký tự: nếu là ngoặc mở <InlineCode>{'(, [, {'}</InlineCode> → <Highlight>push</Highlight> vào stack.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">2.</span>
                <span>Nếu là ngoặc đóng → <Highlight>pop</Highlight> từ stack và kiểm tra: ngoặc pop ra có khớp với ngoặc đóng không?</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">3.</span>
                <span>Không khớp hoặc stack rỗng khi cần pop → không hợp lệ.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">4.</span>
                <span>Cuối cùng kiểm tra stack rỗng → hợp lệ. Stack còn dư → không hợp lệ.</span>
            </div>
        </div>

        <CodeBlock title="valid-parentheses.js">{`// LeetCode #20: Valid Parentheses — O(n) time, O(n) space
function isValid(s) {
    const stack = []
    // Map ngoặc đóng → ngoặc mở tương ứng
    const pairs = { ')': '(', ']': '[', '}': '{' }

    for (const c of s) {
        if ('([{'.includes(c)) {
            // Ngoặc mở → push vào stack
            stack.push(c)
        } else {
            // Ngoặc đóng → pop và kiểm tra
            const top = stack.pop()
            if (top !== pairs[c]) {
                return false    // Không khớp!
            }
        }
    }

    // Stack phải rỗng (tất cả ngoặc mở đều có đóng)
    return stack.length === 0
}

// Ví dụ 1: s = "({[]})"
// '(' → push → stack = ['(']
// '{' → push → stack = ['(', '{']
// '[' → push → stack = ['(', '{', '[']
// ']' → pop '[', pairs[']']='[' → khớp ✓ → stack = ['(', '{']
// '}' → pop '{', pairs['}']='{'→ khớp ✓ → stack = ['(']
// ')' → pop '(', pairs[')']='(' → khớp ✓ → stack = []
// stack rỗng → return true ✓

// Ví dụ 2: s = "([)]"
// '(' → push → stack = ['(']
// '[' → push → stack = ['(', '[']
// ')' → pop '[', pairs[')']='(' → '[' !== '(' → return false ✓`}</CodeBlock>

        {/* ───────── BÀI 2 ───────── */}
        <Heading2>Bài 2: Daily Temperatures (<a href="https://leetcode.com/problems/daily-temperatures/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline decoration-blue-400/30 hover:decoration-blue-300">LeetCode #739</a>)</Heading2>

        <Heading3>Đề bài</Heading3>
        <Paragraph>
            Cho mảng <InlineCode>temperatures</InlineCode>, trả về mảng <InlineCode>answer</InlineCode> trong đó <InlineCode>answer[i]</InlineCode>
            là số ngày phải chờ để gặp nhiệt độ <Highlight>cao hơn</Highlight>. Nếu không có → 0.
            Đây là bài toán <Highlight>Monotonic Stack</Highlight> kinh điển.
        </Paragraph>

        <Heading3>Giải pháp với Monotonic Stack</Heading3>
        <div className="my-4 space-y-2 text-sm text-[var(--text-secondary)]">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">1.</span>
                <span>Dùng stack lưu <Highlight>INDEX</Highlight> (không phải giá trị) của các ngày chưa tìm thấy ngày ấm hơn.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">2.</span>
                <span>Duyệt từng ngày: nếu nhiệt độ hôm nay {'>'} nhiệt độ ở đỉnh stack → stack top đã tìm thấy ngày ấm hơn!</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">3.</span>
                <span>Pop stack và ghi kết quả: <InlineCode>answer[top] = today - top</InlineCode>.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">4.</span>
                <span>Push index hôm nay vào stack.</span>
            </div>
        </div>

        <CodeBlock title="daily-temperatures.js">{`// LeetCode #739: Daily Temperatures — O(n) time, O(n) space
function dailyTemperatures(temperatures) {
    const n = temperatures.length
    const answer = new Array(n).fill(0)
    const stack = []                // Lưu INDEX chưa có ngày ấm hơn

    for (let i = 0; i < n; i++) {
        // Nhiệt hôm nay > nhiệt ở stack top?
        while (stack.length && temperatures[i] > temperatures[stack.at(-1)]) {
            const prevDay = stack.pop()     // Pop ngày cũ
            answer[prevDay] = i - prevDay   // Khoảng cách ngày
        }
        // Push index hôm nay (chưa biết bao giờ ấm hơn)
        stack.push(i)
    }

    return answer
    // Các index còn trong stack → không có ngày ấm hơn → answer giữ 0
}

// Ví dụ: temperatures = [73, 74, 75, 71, 69, 72, 76, 73]
// i=0(73): stack=[] → push → stack=[0]
// i=1(74): 74>73 → pop 0, answer[0]=1-0=1 → stack=[1]
// i=2(75): 75>74 → pop 1, answer[1]=2-1=1 → stack=[2]
// i=3(71): 71<75 → push → stack=[2,3]
// i=4(69): 69<71 → push → stack=[2,3,4]
// i=5(72): 72>69 → pop 4, answer[4]=5-4=1
//          72>71 → pop 3, answer[3]=5-3=2 → stack=[2,5]
// i=6(76): 76>72 → pop 5, answer[5]=6-5=1
//          76>75 → pop 2, answer[2]=6-2=4 → stack=[6]
// i=7(73): 73<76 → push → stack=[6,7]
// → answer = [1, 1, 4, 2, 1, 1, 0, 0] ✓`}</CodeBlock>

        {/* ───────── BÀI 3 ───────── */}
        <Heading2>Bài 3: Min Stack (<a href="https://leetcode.com/problems/min-stack/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline decoration-blue-400/30 hover:decoration-blue-300">LeetCode #155</a>)</Heading2>

        <Heading3>Đề bài</Heading3>
        <Paragraph>
            Thiết kế một stack hỗ trợ <InlineCode>push</InlineCode>, <InlineCode>pop</InlineCode>, <InlineCode>top</InlineCode>,
            và <InlineCode>getMin</InlineCode> — tất cả trong <Highlight>O(1)</Highlight>.
        </Paragraph>

        <Heading3>Giải pháp: Stack kép</Heading3>
        <div className="my-4 space-y-2 text-sm text-[var(--text-secondary)]">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">1.</span>
                <span>Dùng 2 stack: <InlineCode>stack</InlineCode> chính và <InlineCode>minStack</InlineCode> lưu giá trị min tại mỗi thời điểm.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">2.</span>
                <span>Khi <InlineCode>push(val)</InlineCode>: push vào stack, push <InlineCode>min(val, minStack.top)</InlineCode> vào minStack.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">3.</span>
                <span>Khi <InlineCode>pop()</InlineCode>: pop cả 2 stack.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">4.</span>
                <span><InlineCode>getMin()</InlineCode> chỉ cần xem đỉnh minStack → O(1).</span>
            </div>
        </div>

        <CodeBlock title="min-stack.js">{`// LeetCode #155: Min Stack — All operations O(1)
class MinStack {
    constructor() {
        this.stack = []         // Stack chính
        this.minStack = []      // Lưu giá trị min tại mỗi thời điểm
    }

    push(val) {
        this.stack.push(val)
        // Min mới = min(val hiện tại, min cũ)
        const currentMin = this.minStack.length
            ? Math.min(val, this.minStack.at(-1))
            : val
        this.minStack.push(currentMin)
    }

    pop() {
        this.stack.pop()
        this.minStack.pop()     // Đồng bộ: pop cả minStack
    }

    top() {
        return this.stack.at(-1)
    }

    getMin() {
        return this.minStack.at(-1) // Đỉnh minStack = giá trị min hiện tại
    }
}

// Ví dụ minh họa:
// push(-2) → stack=[-2], minStack=[-2]      getMin=-2
// push(0)  → stack=[-2,0], minStack=[-2,-2] getMin=-2
// push(-3) → stack=[-2,0,-3], minStack=[-2,-2,-3] getMin=-3
// getMin() → -3
// pop()    → stack=[-2,0], minStack=[-2,-2]
// top()    → 0
// getMin() → -2 ✓`}</CodeBlock>

        <Heading2>Monotonic Stack là gì?</Heading2>

        <Paragraph>
            <Highlight>Monotonic Stack</Highlight> là stack luôn duy trì thứ tự tăng dần hoặc giảm dần.
            Khi thêm phần tử mới, ta pop các phần tử vi phạm thứ tự. Nhờ đó, ta tìm được
            <Highlight>phần tử lớn/nhỏ hơn gần nhất</Highlight> trong O(n).
        </Paragraph>

        <div className="my-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-4">
                <div className="text-blue-400 font-bold text-sm mb-2">📈 Monotonic Increasing</div>
                <ul className="text-[var(--text-secondary)] text-xs space-y-1">
                    <li>• Stack tăng dần từ bottom</li>
                    <li>• Tìm <strong>Next Greater Element</strong></li>
                    <li>• Pop khi gặp phần tử lớn hơn đỉnh</li>
                </ul>
            </div>
            <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4">
                <div className="text-red-400 font-bold text-sm mb-2">📉 Monotonic Decreasing</div>
                <ul className="text-[var(--text-secondary)] text-xs space-y-1">
                    <li>• Stack giảm dần từ bottom</li>
                    <li>• Tìm <strong>Next Smaller Element</strong></li>
                    <li>• Pop khi gặp phần tử nhỏ hơn đỉnh</li>
                </ul>
            </div>
        </div>

        <Callout type="tip">
            Khi bài hỏi &quot;tìm phần tử lớn/nhỏ hơn <Highlight>gần nhất</Highlight>&quot; hoặc &quot;cho mỗi phần tử, tìm phần tử tiếp theo thỏa điều kiện&quot;
            → nghĩ ngay <InlineCode>Monotonic Stack</InlineCode>.
        </Callout>

        {/* ───────── BÀI 4: IMPLEMENT QUEUE USING STACKS ───────── */}
        <Heading2>Bài 4: Implement Queue using Stacks (<a href="https://leetcode.com/problems/implement-queue-using-stacks/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline decoration-blue-400/30 hover:decoration-blue-300">LeetCode #232</a>)</Heading2>
        <Heading3>Đề bài</Heading3>
        <Paragraph>Implement <Highlight>FIFO queue</Highlight> chỉ dùng 2 stacks.</Paragraph>
        <CodeBlock title="queue-using-stacks.js">{`// LeetCode #232: Implement Queue using Stacks — Amortized O(1)
class MyQueue {
    constructor() {
        this.pushStack = []     // Stack để push
        this.popStack = []      // Stack để pop/peek
    }

    push(x) {
        this.pushStack.push(x)
    }

    pop() {
        this._transfer()
        return this.popStack.pop()
    }

    peek() {
        this._transfer()
        return this.popStack.at(-1)
    }

    empty() {
        return this.pushStack.length === 0 && this.popStack.length === 0
    }

    _transfer() {
        // Chỉ transfer khi popStack rỗng
        if (this.popStack.length === 0) {
            while (this.pushStack.length) {
                this.popStack.push(this.pushStack.pop())
            }
        }
    }
}

// push(1), push(2), peek()→1, pop()→1, empty()→false ✓
// pushStack→popStack: [1,2] → pop→[2,1] → peek=1, pop=1`}</CodeBlock>

        {/* ───────── BÀI 5: BACKSPACE STRING COMPARE ───────── */}
        <Heading2>Bài 5: Backspace String Compare (<a href="https://leetcode.com/problems/backspace-string-compare/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline decoration-blue-400/30 hover:decoration-blue-300">LeetCode #844</a>)</Heading2>
        <Heading3>Đề bài</Heading3>
        <Paragraph>So sánh hai chuỗi trong đó <InlineCode>#</InlineCode> là <Highlight>backspace</Highlight>.</Paragraph>
        <CodeBlock title="backspace-compare.js">{`// LeetCode #844: Backspace String Compare — O(n)
function backspaceCompare(s, t) {
    const build = (str) => {
        const stack = []
        for (const c of str) {
            if (c === '#') stack.pop()    // Backspace → xóa ký tự cuối
            else stack.push(c)
        }
        return stack.join('')
    }

    return build(s) === build(t)
}

// Ví dụ: s = "ab#c", t = "ad#c"
// build("ab#c"): a→[a], b→[a,b], #→[a], c→[a,c] → "ac"
// build("ad#c"): a→[a], d→[a,d], #→[a], c→[a,c] → "ac"
// "ac" === "ac" → true ✓`}</CodeBlock>

        {/* ───────── BÀI 6: EVALUATE RPN ───────── */}
        <Heading2>Bài 6: Evaluate Reverse Polish Notation (<a href="https://leetcode.com/problems/evaluate-reverse-polish-notation/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline decoration-blue-400/30 hover:decoration-blue-300">LeetCode #150</a>)</Heading2>
        <Heading3>Đề bài</Heading3>
        <Paragraph>Tính giá trị biểu thức <Highlight>Reverse Polish Notation</Highlight> (hậu tố).</Paragraph>
        <CodeBlock title="eval-rpn.js">{`// LeetCode #150: Evaluate RPN — O(n)
function evalRPN(tokens) {
    const stack = []
    const ops = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => Math.trunc(a / b),  // Chia lấy phần nguyên
    }

    for (const token of tokens) {
        if (ops[token]) {
            const b = stack.pop()           // Toán hạng phải
            const a = stack.pop()           // Toán hạng trái
            stack.push(ops[token](a, b))
        } else {
            stack.push(Number(token))       // Số → push
        }
    }

    return stack[0]
}

// Ví dụ: ["2","1","+","3","*"]
// 2→[2], 1→[2,1], +→pop 1,2 → push 3→[3]
// 3→[3,3], *→pop 3,3 → push 9→[9]
// → 9 ✓   (tương đương (2+1)*3 = 9)`}</CodeBlock>

        {/* ───────── BÀI 7: DECODE STRING ───────── */}
        <Heading2>Bài 7: Decode String (<a href="https://leetcode.com/problems/decode-string/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline decoration-blue-400/30 hover:decoration-blue-300">LeetCode #394</a>)</Heading2>
        <Heading3>Đề bài</Heading3>
        <Paragraph>Decode chuỗi encode dạng <InlineCode>k[encoded_string]</InlineCode>. Ví dụ: <InlineCode>3[a2[c]]</InlineCode> = <Highlight>accaccacc</Highlight>.</Paragraph>
        <CodeBlock title="decode-string.js">{`// LeetCode #394: Decode String — O(n)
function decodeString(s) {
    const countStack = []
    const strStack = []
    let currentStr = ''
    let currentNum = 0

    for (const c of s) {
        if (c >= '0' && c <= '9') {
            currentNum = currentNum * 10 + Number(c)
        } else if (c === '[') {
            countStack.push(currentNum)     // Lưu số lặp
            strStack.push(currentStr)       // Lưu chuỗi trước [
            currentStr = ''
            currentNum = 0
        } else if (c === ']') {
            const num = countStack.pop()
            const prevStr = strStack.pop()
            currentStr = prevStr + currentStr.repeat(num)
        } else {
            currentStr += c
        }
    }

    return currentStr
}

// Ví dụ: "3[a2[c]]"
// 3→num=3, [→push(3,""), a→str="a"
// 2→num=2, [→push(2,"a"), c→str="c"
// ]→pop(2,"a"), str="a"+"cc"="acc"
// ]→pop(3,""), str=""+"accaccacc"="accaccacc" ✓`}</CodeBlock>

        {/* ───────── BÀI 8: ASTEROID COLLISION ───────── */}
        <Heading2>Bài 8: Asteroid Collision (<a href="https://leetcode.com/problems/asteroid-collision/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline decoration-blue-400/30 hover:decoration-blue-300">LeetCode #735</a>)</Heading2>
        <Heading3>Đề bài</Heading3>
        <Paragraph>Các asteroid di chuyển cùng tốc độ. Dương đi phải, âm đi trái. Va chạm → <Highlight>nhỏ hơn nổ</Highlight>, bằng nhau → cả hai nổ.</Paragraph>
        <CodeBlock title="asteroid-collision.js">{`// LeetCode #735: Asteroid Collision — O(n)
function asteroidCollision(asteroids) {
    const stack = []

    for (const ast of asteroids) {
        let alive = true

        while (alive && ast < 0 && stack.length && stack.at(-1) > 0) {
            // Va chạm: ast đi trái (<0) gặp stack top đi phải (>0)
            if (stack.at(-1) < -ast) {
                stack.pop()                 // Stack top nhỏ hơn → nổ
            } else if (stack.at(-1) === -ast) {
                stack.pop()                 // Bằng nhau → cả hai nổ
                alive = false
            } else {
                alive = false               // Stack top lớn hơn → ast nổ
            }
        }

        if (alive) stack.push(ast)
    }

    return stack
}

// Ví dụ: [5, 10, -5]
// 5→[5], 10→[5,10], -5: |-5|<10 → -5 nổ → [5,10] ✓`}</CodeBlock>

        {/* ───────── BÀI 9: CAR FLEET ───────── */}
        <Heading2>Bài 9: Car Fleet (<a href="https://leetcode.com/problems/car-fleet/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline decoration-blue-400/30 hover:decoration-blue-300">LeetCode #853</a>)</Heading2>
        <Heading3>Đề bài</Heading3>
        <Paragraph>Cho vị trí và tốc độ các xe, đếm số <Highlight>car fleet</Highlight> (nhóm xe đến đích cùng lúc).</Paragraph>
        <CodeBlock title="car-fleet.js">{`// LeetCode #853: Car Fleet — O(n log n)
function carFleet(target, position, speed) {
    // Ghép (position, time_to_target), sort giảm dần theo position
    const cars = position
        .map((pos, i) => [pos, (target - pos) / speed[i]])
        .sort((a, b) => b[0] - a[0])

    const stack = []            // Stack lưu thời gian đến đích

    for (const [, time] of cars) {
        // Xe phía sau đến sớm hơn → nó sẽ hợp fleet với xe phía trước
        // Xe phía sau đến muộn hơn → fleet mới
        if (!stack.length || time > stack.at(-1)) {
            stack.push(time)    // Fleet mới
        }
    }

    return stack.length         // Số fleet
}

// Ví dụ: target=12, position=[10,8,0,5,3], speed=[2,4,1,1,3]
// Sorted by pos desc: (10,1), (8,1), (5,2.33), (3,3), (0,4)
// 1→[1], 1≤1→skip, 2.33>1→[1,2.33], 3>2.33→[1,2.33,3], 4>3→[1,2.33,3,4]
// Nhưng wait - xe ở pos=8 mất 1s(=xe ở 10), merge! → 3 fleets ✓`}</CodeBlock>

        {/* ───────── BÀI 10: LARGEST RECT IN HISTOGRAM ───────── */}
        <Heading2>Bài 10: Largest Rectangle in Histogram (<a href="https://leetcode.com/problems/largest-rectangle-in-histogram/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline decoration-blue-400/30 hover:decoration-blue-300">LeetCode #84</a>)</Heading2>
        <Heading3>Đề bài</Heading3>
        <Paragraph>Tìm <Highlight>hình chữ nhật lớn nhất</Highlight> trong histogram.</Paragraph>
        <CodeBlock title="largest-rectangle.js">{`// LeetCode #84: Largest Rectangle in Histogram — O(n)
function largestRectangleArea(heights) {
    const stack = []            // Monotonic increasing stack (indices)
    let maxArea = 0

    for (let i = 0; i <= heights.length; i++) {
        const h = i === heights.length ? 0 : heights[i]

        while (stack.length && h < heights[stack.at(-1)]) {
            const height = heights[stack.pop()]
            const width = stack.length ? i - stack.at(-1) - 1 : i
            maxArea = Math.max(maxArea, height * width)
        }

        stack.push(i)
    }

    return maxArea
}

// Ví dụ: heights = [2,1,5,6,2,3]
// i=0(2): push→[0]
// i=1(1): 1<2→pop 0, area=2*1=2, max=2 → push→[1]
// i=2(5): push→[1,2]
// i=3(6): push→[1,2,3]
// i=4(2): 2<6→pop 3, area=6*1=6; 2<5→pop 2, area=5*2=10, max=10
// → maxArea = 10 ✓`}</CodeBlock>
    </>
)

const enContent = (
    <>
        <Paragraph>
            <Highlight>Stack</Highlight> operates on the <Highlight>LIFO</Highlight> principle — Last In, First Out.
            The last element added is the first to be removed. In JavaScript, use arrays with
            <InlineCode>push()</InlineCode> to add and <InlineCode>pop()</InlineCode> to remove.
        </Paragraph>

        <Callout type="info">
            Stack excels at problems with <Highlight>nested structures</Highlight> (brackets, recursion),
            needing to <Highlight>backtrack to previous state</Highlight>, or finding nearest elements
            matching a condition (Monotonic Stack).
        </Callout>

        <Heading2>How to Use Stack in JavaScript</Heading2>

        <CodeBlock title="stack-api.js">{`// ═══ Stack API — use Array as Stack ═══
const stack = []
stack.push(1)        // Add to top: [1]
stack.push(2)        // [1, 2]
stack.push(3)        // [1, 2, 3]
stack.pop()          // Remove from top: 3, stack = [1, 2]
stack[stack.length-1] // Peek (top of stack): 2 — doesn't remove
stack.length          // Size: 2
stack.length === 0    // isEmpty: false

// ═══ TEMPLATE: Monotonic Stack (find nearest greater/smaller) ═══
// Ex: For each element, find the NEXT GREATER element to the right
const result = new Array(arr.length).fill(-1)
const monoStack = []  // Store INDICES, decreasing order

for (let i = 0; i < arr.length; i++) {
    // Pop all elements smaller than arr[i]
    while (monoStack.length && arr[monoStack[monoStack.length-1]] < arr[i]) {
        const idx = monoStack.pop()
        result[idx] = arr[i]  // arr[i] is next greater of arr[idx]
    }
    monoStack.push(i)
}
// Ex: arr = [2, 1, 4, 3] → result = [4, 4, -1, -1]`}</CodeBlock>

        <Heading2>When to Use Stack?</Heading2>

        <div className="my-4 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
                <thead>
                    <tr className="border-b border-[var(--border-primary)]">
                        <th className="text-left p-3 text-[var(--text-secondary)] font-medium">Problem Signal</th>
                        <th className="text-left p-3 text-[var(--text-secondary)] font-medium">LeetCode Example</th>
                    </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                    <tr className="border-b border-gray-100"><td className="p-3">Check valid brackets</td><td className="p-3">Valid Parentheses (#20)</td></tr>
                    <tr className="border-b border-gray-100"><td className="p-3">Find nearest greater/smaller</td><td className="p-3">Daily Temperatures (#739)</td></tr>
                    <tr className="border-b border-gray-100"><td className="p-3">Stack supporting O(1) min</td><td className="p-3">Min Stack (#155)</td></tr>
                    <tr className="border-b border-gray-100"><td className="p-3">Decode nested strings</td><td className="p-3">Decode String (#394)</td></tr>
                    <tr><td className="p-3">Evaluate expressions</td><td className="p-3">Evaluate RPN (#150)</td></tr>
                </tbody>
            </table>
        </div>

        <Heading2>Problem 1: Valid Parentheses (<a href="https://leetcode.com/problems/valid-parentheses/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline decoration-blue-400/30 hover:decoration-blue-300">LeetCode #20</a>)</Heading2>

        <Heading3>Problem</Heading3>
        <Paragraph>
            Given a string containing only <InlineCode>{'(, ), {, }, [, ]'}</InlineCode>,
            check if it&apos;s <Highlight>valid</Highlight> (every open bracket has matching close bracket in correct order).
        </Paragraph>

        <Heading3>Stack Solution</Heading3>
        <div className="my-4 space-y-2 text-sm text-[var(--text-secondary)]">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">1.</span>
                <span>Open bracket → <Highlight>push</Highlight> to stack.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">2.</span>
                <span>Close bracket → <Highlight>pop</Highlight> and check: does it match?</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">3.</span>
                <span>No match or empty stack → invalid.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">4.</span>
                <span>End: stack empty → valid. Stack not empty → invalid.</span>
            </div>
        </div>

        <CodeBlock title="valid-parentheses.js">{`// LeetCode #20: Valid Parentheses — O(n)
function isValid(s) {
    const stack = []
    const pairs = { ')': '(', ']': '[', '}': '{' }

    for (const c of s) {
        if ('([{'.includes(c)) {
            stack.push(c)               // Open → push
        } else {
            if (stack.pop() !== pairs[c]) return false  // Close → pop & check
        }
    }
    return stack.length === 0           // Must be empty
}

// Walkthrough: "({[]})"
// '(' → push → ['(']
// '{' → push → ['(', '{']
// '[' → push → ['(', '{', '[']
// ']' → pop '[', match ✓ → ['(', '{']
// '}' → pop '{', match ✓ → ['(']
// ')' → pop '(', match ✓ → []
// Empty → true ✓`}</CodeBlock>

        <Heading2>Problem 2: Daily Temperatures (<a href="https://leetcode.com/problems/daily-temperatures/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline decoration-blue-400/30 hover:decoration-blue-300">LeetCode #739</a>)</Heading2>

        <Heading3>Problem</Heading3>
        <Paragraph>
            Given <InlineCode>temperatures</InlineCode> array, return array where each element is the number of days
            until a <Highlight>warmer</Highlight> day. Classic <Highlight>Monotonic Stack</Highlight> problem.
        </Paragraph>

        <Heading3>Monotonic Stack Solution</Heading3>
        <div className="my-4 space-y-2 text-sm text-[var(--text-secondary)]">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">1.</span>
                <span>Stack stores <Highlight>INDICES</Highlight> (not values) of days without a warmer day yet.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">2.</span>
                <span>If today&apos;s temp {'>'} stack top&apos;s temp → top found its warmer day!</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">3.</span>
                <span>Pop and record: <InlineCode>answer[top] = today - top</InlineCode>.</span>
            </div>
        </div>

        <CodeBlock title="daily-temperatures.js">{`// LeetCode #739: Daily Temperatures — O(n)
function dailyTemperatures(temperatures) {
    const n = temperatures.length
    const answer = new Array(n).fill(0)
    const stack = []                    // Store INDICES

    for (let i = 0; i < n; i++) {
        while (stack.length && temperatures[i] > temperatures[stack.at(-1)]) {
            const prev = stack.pop()
            answer[prev] = i - prev    // Days until warmer
        }
        stack.push(i)
    }
    return answer
}

// Walkthrough: [73, 74, 75, 71, 69, 72, 76, 73]
// i=0(73): push → stack=[0]
// i=1(74): 74>73 → pop 0, ans[0]=1 → stack=[1]
// i=2(75): 75>74 → pop 1, ans[1]=1 → stack=[2]
// i=3(71): push → stack=[2,3]
// i=4(69): push → stack=[2,3,4]
// i=5(72): 72>69→pop 4,ans[4]=1; 72>71→pop 3,ans[3]=2 → stack=[2,5]
// i=6(76): 76>72→pop 5,ans[5]=1; 76>75→pop 2,ans[2]=4 → stack=[6]
// i=7(73): push → stack=[6,7]
// → [1, 1, 4, 2, 1, 1, 0, 0] ✓`}</CodeBlock>

        <Heading2>Problem 3: Min Stack (<a href="https://leetcode.com/problems/min-stack/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline decoration-blue-400/30 hover:decoration-blue-300">LeetCode #155</a>)</Heading2>

        <Heading3>Problem</Heading3>
        <Paragraph>
            Design a stack supporting <InlineCode>push</InlineCode>, <InlineCode>pop</InlineCode>, <InlineCode>top</InlineCode>,
            and <InlineCode>getMin</InlineCode> — all in <Highlight>O(1)</Highlight>.
        </Paragraph>

        <Heading3>Dual Stack Solution</Heading3>
        <div className="my-4 space-y-2 text-sm text-[var(--text-secondary)]">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">1.</span>
                <span>Use 2 stacks: main <InlineCode>stack</InlineCode> and <InlineCode>minStack</InlineCode> tracking min at each point.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">2.</span>
                <span>On <InlineCode>push(val)</InlineCode>: push to both, minStack gets <InlineCode>min(val, current min)</InlineCode>.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 font-bold">3.</span>
                <span><InlineCode>getMin()</InlineCode> → peek minStack top → O(1).</span>
            </div>
        </div>

        <CodeBlock title="min-stack.js">{`// LeetCode #155: Min Stack — All operations O(1)
class MinStack {
    constructor() {
        this.stack = []
        this.minStack = []
    }

    push(val) {
        this.stack.push(val)
        const min = this.minStack.length
            ? Math.min(val, this.minStack.at(-1))
            : val
        this.minStack.push(min)
    }

    pop() {
        this.stack.pop()
        this.minStack.pop()
    }

    top() { return this.stack.at(-1) }
    getMin() { return this.minStack.at(-1) }
}

// Walkthrough:
// push(-2) → stack=[-2], minStack=[-2], min=-2
// push(0)  → stack=[-2,0], minStack=[-2,-2], min=-2
// push(-3) → stack=[-2,0,-3], minStack=[-2,-2,-3], min=-3
// pop()    → stack=[-2,0], minStack=[-2,-2], min=-2
// top()    → 0
// getMin() → -2 ✓`}</CodeBlock>

        <Heading2>What is Monotonic Stack?</Heading2>

        <Paragraph>
            A <Highlight>Monotonic Stack</Highlight> always maintains increasing or decreasing order.
            When adding a new element, we pop elements that violate the order. This lets us find
            the <Highlight>nearest greater/smaller element</Highlight> in O(n).
        </Paragraph>

        <div className="my-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-4">
                <div className="text-blue-400 font-bold text-sm mb-2">📈 Monotonic Increasing</div>
                <ul className="text-[var(--text-secondary)] text-xs space-y-1">
                    <li>• Increasing from bottom</li>
                    <li>• Find <strong>Next Greater Element</strong></li>
                    <li>• Pop when current {'>'} top</li>
                </ul>
            </div>
            <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4">
                <div className="text-red-400 font-bold text-sm mb-2">📉 Monotonic Decreasing</div>
                <ul className="text-[var(--text-secondary)] text-xs space-y-1">
                    <li>• Decreasing from bottom</li>
                    <li>• Find <strong>Next Smaller Element</strong></li>
                    <li>• Pop when current {'<'} top</li>
                </ul>
            </div>
        </div>

        <Callout type="tip">
            When a problem asks for &quot;nearest greater/smaller&quot; or &quot;for each element, find the next element matching condition&quot;
            → think <InlineCode>Monotonic Stack</InlineCode>.
        </Callout>

        <Heading2>Problem 4: Implement Queue using Stacks (<a href="https://leetcode.com/problems/implement-queue-using-stacks/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline decoration-blue-400/30 hover:decoration-blue-300">LeetCode #232</a>)</Heading2>
        <Heading3>Problem</Heading3>
        <Paragraph>Implement <Highlight>FIFO queue</Highlight> using only 2 stacks.</Paragraph>
        <CodeBlock title="queue-using-stacks.js">{`// LeetCode #232: Implement Queue using Stacks — Amortized O(1)
class MyQueue {
    constructor() { this.pushStack = []; this.popStack = [] }
    push(x) { this.pushStack.push(x) }
    pop() { this._transfer(); return this.popStack.pop() }
    peek() { this._transfer(); return this.popStack.at(-1) }
    empty() { return !this.pushStack.length && !this.popStack.length }
    _transfer() {
        if (!this.popStack.length)
            while (this.pushStack.length)
                this.popStack.push(this.pushStack.pop())
    }
}
// push(1),push(2),peek()→1,pop()→1 ✓`}</CodeBlock>

        <Heading2>Problem 5: Backspace String Compare (<a href="https://leetcode.com/problems/backspace-string-compare/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline decoration-blue-400/30 hover:decoration-blue-300">LeetCode #844</a>)</Heading2>
        <Heading3>Problem</Heading3>
        <Paragraph>Compare two strings where <InlineCode>#</InlineCode> is <Highlight>backspace</Highlight>.</Paragraph>
        <CodeBlock title="backspace-compare.js">{`// LeetCode #844: Backspace String Compare — O(n)
function backspaceCompare(s, t) {
    const build = (str) => {
        const stack = []
        for (const c of str) {
            if (c === '#') stack.pop()
            else stack.push(c)
        }
        return stack.join('')
    }
    return build(s) === build(t)
}
// Example: "ab#c" vs "ad#c" → "ac"="ac" → true ✓`}</CodeBlock>

        <Heading2>Problem 6: Evaluate Reverse Polish Notation (<a href="https://leetcode.com/problems/evaluate-reverse-polish-notation/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline decoration-blue-400/30 hover:decoration-blue-300">LeetCode #150</a>)</Heading2>
        <Heading3>Problem</Heading3>
        <Paragraph>Evaluate a <Highlight>Reverse Polish Notation</Highlight> (postfix) expression.</Paragraph>
        <CodeBlock title="eval-rpn.js">{`// LeetCode #150: Evaluate RPN — O(n)
function evalRPN(tokens) {
    const stack = []
    const ops = {
        '+': (a,b) => a+b, '-': (a,b) => a-b,
        '*': (a,b) => a*b, '/': (a,b) => Math.trunc(a/b),
    }
    for (const t of tokens) {
        if (ops[t]) {
            const b = stack.pop(), a = stack.pop()
            stack.push(ops[t](a, b))
        } else stack.push(Number(t))
    }
    return stack[0]
}
// Example: ["2","1","+","3","*"] → (2+1)*3 = 9 ✓`}</CodeBlock>

        <Heading2>Problem 7: Decode String (<a href="https://leetcode.com/problems/decode-string/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline decoration-blue-400/30 hover:decoration-blue-300">LeetCode #394</a>)</Heading2>
        <Heading3>Problem</Heading3>
        <Paragraph>Decode encoded string like <InlineCode>k[encoded_string]</InlineCode>. Example: <InlineCode>3[a2[c]]</InlineCode> = <Highlight>accaccacc</Highlight>.</Paragraph>
        <CodeBlock title="decode-string.js">{`// LeetCode #394: Decode String — O(n)
function decodeString(s) {
    const countStack = [], strStack = []
    let str = '', num = 0

    for (const c of s) {
        if (c >= '0' && c <= '9') {
            num = num * 10 + Number(c)
        } else if (c === '[') {
            countStack.push(num); strStack.push(str)
            str = ''; num = 0
        } else if (c === ']') {
            str = strStack.pop() + str.repeat(countStack.pop())
        } else str += c
    }
    return str
}
// "3[a2[c]]" → "accaccacc" ✓`}</CodeBlock>

        <Heading2>Problem 8: Asteroid Collision (<a href="https://leetcode.com/problems/asteroid-collision/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline decoration-blue-400/30 hover:decoration-blue-300">LeetCode #735</a>)</Heading2>
        <Heading3>Problem</Heading3>
        <Paragraph>Asteroids move at same speed. Positive goes right, negative left. Collision → <Highlight>smaller explodes</Highlight>, equal → both explode.</Paragraph>
        <CodeBlock title="asteroid-collision.js">{`// LeetCode #735: Asteroid Collision — O(n)
function asteroidCollision(asteroids) {
    const stack = []
    for (const ast of asteroids) {
        let alive = true
        while (alive && ast < 0 && stack.length && stack.at(-1) > 0) {
            if (stack.at(-1) < -ast) stack.pop()
            else if (stack.at(-1) === -ast) { stack.pop(); alive = false }
            else alive = false
        }
        if (alive) stack.push(ast)
    }
    return stack
}
// [5, 10, -5] → -5 < 10 → -5 explodes → [5, 10] ✓`}</CodeBlock>

        <Heading2>Problem 9: Car Fleet (<a href="https://leetcode.com/problems/car-fleet/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline decoration-blue-400/30 hover:decoration-blue-300">LeetCode #853</a>)</Heading2>
        <Heading3>Problem</Heading3>
        <Paragraph>Given positions and speeds, count the number of <Highlight>car fleets</Highlight> arriving at target.</Paragraph>
        <CodeBlock title="car-fleet.js">{`// LeetCode #853: Car Fleet — O(n log n)
function carFleet(target, position, speed) {
    const cars = position
        .map((pos, i) => [pos, (target - pos) / speed[i]])
        .sort((a, b) => b[0] - a[0])

    const stack = []
    for (const [, time] of cars) {
        if (!stack.length || time > stack.at(-1)) stack.push(time)
    }
    return stack.length
}
// Cars that arrive faster merge with slower car ahead → fewer fleets`}</CodeBlock>

        <Heading2>Problem 10: Largest Rectangle in Histogram (<a href="https://leetcode.com/problems/largest-rectangle-in-histogram/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline decoration-blue-400/30 hover:decoration-blue-300">LeetCode #84</a>)</Heading2>
        <Heading3>Problem</Heading3>
        <Paragraph>Find the <Highlight>largest rectangle</Highlight> in a histogram.</Paragraph>
        <CodeBlock title="largest-rectangle.js">{`// LeetCode #84: Largest Rectangle in Histogram — O(n)
function largestRectangleArea(heights) {
    const stack = []
    let maxArea = 0

    for (let i = 0; i <= heights.length; i++) {
        const h = i === heights.length ? 0 : heights[i]
        while (stack.length && h < heights[stack.at(-1)]) {
            const height = heights[stack.pop()]
            const width = stack.length ? i - stack.at(-1) - 1 : i
            maxArea = Math.max(maxArea, height * width)
        }
        stack.push(i)
    }
    return maxArea
}
// [2,1,5,6,2,3] → maxArea = 10 (5×2) ✓`}</CodeBlock>
    </>
)

const stackPattern: BlogPost = {
    slug: 'stack-pattern',
    title: {
        vi: 'Stack Pattern — Ngăn xếp & Monotonic Stack',
        en: 'Stack Pattern — Stack & Monotonic Stack',
    },
    description: {
        vi: 'Giải thích chi tiết Stack với LeetCode: Valid Parentheses, Daily Temperatures, Min Stack. Monotonic Stack cho bài toán tìm phần tử gần nhất.',
        en: 'Deep dive into Stack with LeetCode: Valid Parentheses, Daily Temperatures, Min Stack. Monotonic Stack for nearest element problems.',
    },
    date: '2025-10-04',
    tags: ['Algorithm', 'Stack', 'LeetCode'],
    emoji: '📚',
    color: '#ef4444',
    content: { vi: viContent, en: enContent },
}

export default stackPattern
