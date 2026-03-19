'use client'
import { CodeBlock, Heading2, Heading3, Paragraph, Highlight, InlineCode, Callout } from '../../components/BlogComponents'
import { TopicModal } from '../../components/TopicModal'

export default function Phase2JavaScript() {
    return (
        <>
            <Heading2>Phase 2 — JavaScript Master (4-6 tuần)</Heading2>

            <Paragraph>
                JavaScript là <Highlight>ngôn ngữ lõi</Highlight> của Frontend. Big tech sẽ hỏi sâu về JS —
                không chỉ syntax mà còn <Highlight>cơ chế bên trong</Highlight>.
            </Paragraph>

            <Heading3>2.1 Core concepts (PHẢI biết — click để xem chi tiết)</Heading3>
            <div className="my-4 space-y-2">
                <TopicModal title="Execution Context & Hoisting" emoji="⚙️" color="#fbbf24" summary="Cách JS engine chạy code — Creation Phase vs Execution Phase">
                    <Paragraph>Khi bạn chạy JS, engine tạo <Highlight>Execution Context</Highlight> gồm 2 phase:</Paragraph>
                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                            <div className="text-yellow-400 font-bold text-sm">1. Creation Phase</div>
                            <div className="text-slate-300 text-sm mt-1">• Tạo Global/Window object<br />• Setup memory heap cho variables và functions<br />• <strong>Hoisting</strong>: var được gán <InlineCode>undefined</InlineCode>, function declarations được copy nguyên<br />• <InlineCode>let</InlineCode>/<InlineCode>const</InlineCode> ở &quot;Temporal Dead Zone&quot; — truy cập sớm sẽ bị ReferenceError</div>
                        </div>
                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">2. Execution Phase</div>
                            <div className="text-slate-300 text-sm mt-1">• Chạy code line by line<br />• Gán giá trị thật cho variables<br />• Gọi functions → tạo Function Execution Context mới (cũng có 2 phases)</div>
                        </div>
                    </div>
                    <CodeBlock title="Hoisting example">{`console.log(a); // undefined (hoisted, assigned undefined)
console.log(b); // ReferenceError! (TDZ)
var a = 1;
let b = 2;

greet(); // "Hello!" — function hoisted nguyên vẹn
function greet() { console.log("Hello!"); }`}</CodeBlock>

                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">✅ Lợi ích: Function Declaration Hoisting</div>
                            <div className="text-slate-300 text-sm mt-1">
                                Gọi function TRƯỚC khi khai báo → viết <strong>main logic ở trên, helpers ở dưới</strong> → code dễ đọc top-down.<br />
                                Đây là lý do duy nhất hoisting &quot;hữu ích&quot;.
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                            <div className="text-red-400 font-bold text-sm">⚠️ Bad behavior cần tránh</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>var hoisting</strong> → giá trị <InlineCode>undefined</InlineCode> thay vì lỗi → <Highlight>silent bug nguy hiểm</Highlight><br />
                                • <strong>Function expression / arrow</strong> → KHÔNG hoist → TypeError nếu gọi trước<br />
                                • <strong>class hoisting</strong> → TDZ giống let/const → ReferenceError<br />
                                → Luôn dùng <InlineCode>let</InlineCode>/<InlineCode>const</InlineCode> — TDZ bắt bug sớm thay vì để lọt
                            </div>
                        </div>
                    </div>

                    <div className="p-3 rounded-lg bg-gray-500/10 border border-gray-500/20 my-3">
                        <div className="text-gray-300 font-bold text-sm">📊 Hoisting Summary Table</div>
                        <div className="text-slate-300 text-sm mt-2">
                            <div className="overflow-x-auto">
                                <table className="w-full text-xs">
                                    <thead>
                                        <tr className="border-b border-white/10">
                                            <th className="text-left py-1.5 pr-2 text-slate-400 font-semibold">Kiểu</th>
                                            <th className="text-left py-1.5 pr-2 text-slate-400 font-semibold">Hoist?</th>
                                            <th className="text-left py-1.5 pr-2 text-slate-400 font-semibold">Giá trị khi access sớm</th>
                                            <th className="text-left py-1.5 text-slate-400 font-semibold">Khuyến nghị</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-slate-300">
                                        <tr className="border-b border-white/5"><td className="py-1.5 pr-2 font-bold text-red-400">var</td><td className="py-1.5 pr-2">✅</td><td className="py-1.5 pr-2">undefined (nguy hiểm!)</td><td className="py-1.5">❌ Tránh</td></tr>
                                        <tr className="border-b border-white/5"><td className="py-1.5 pr-2 font-bold text-green-400">let / const</td><td className="py-1.5 pr-2">✅ (TDZ)</td><td className="py-1.5 pr-2">ReferenceError (an toàn)</td><td className="py-1.5">✅ Luôn dùng</td></tr>
                                        <tr className="border-b border-white/5"><td className="py-1.5 pr-2 font-bold text-blue-400">function declaration</td><td className="py-1.5 pr-2">✅</td><td className="py-1.5 pr-2">Function đầy đủ</td><td className="py-1.5">✅ OK</td></tr>
                                        <tr className="border-b border-white/5"><td className="py-1.5 pr-2 font-bold text-yellow-400">function expression</td><td className="py-1.5 pr-2">❌</td><td className="py-1.5 pr-2">TypeError</td><td className="py-1.5">✅ OK</td></tr>
                                        <tr><td className="py-1.5 pr-2 font-bold text-purple-400">class</td><td className="py-1.5 pr-2">✅ (TDZ)</td><td className="py-1.5 pr-2">ReferenceError</td><td className="py-1.5">✅ OK</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <CodeBlock title="hoisting-pitfalls.js">{`// ═══ 1. var HOISTING — SILENT BUG ═══
console.log(name) // undefined (KHÔNG lỗi, nhưng sai logic!)
var name = 'Khuong'
// JS hiểu thành:
// var name           ← hoisted lên top → undefined
// console.log(name)  ← undefined
// name = 'Khuong'    ← gán sau

// ═══ 2. let/const — TDZ BẮT BUG SỚM ═══
console.log(x) // ❌ ReferenceError (tốt hơn undefined!)
let x = 5
// let VẪN bị hoist, nhưng ở trạng thái "uninitialized"
// Vùng từ đầu scope → dòng khai báo = TDZ

// ═══ 3. FUNCTION EXPRESSION KHÔNG HOIST ═══
greet() // ❌ TypeError: greet is not a function
const greet = function() { console.log('Hi') }
// const greet = () => console.log('Hi')  ← cũng không hoist

// ═══ 4. LỢI ÍCH: TOP-DOWN CODE ═══
function main() {
  const data = fetchData()        // gọi trước khai báo OK!
  const result = processData(data)
  return formatOutput(result)
}

// Helper functions ở dưới — nhờ hoisting
function fetchData() { /* ... */ }
function processData(data) { /* ... */ }
function formatOutput(result) { /* ... */ }`}</CodeBlock>

                    <Callout type="tip">Interview: {`"Hoisting hữu ích với function declarations để organize code top-down. Nhưng với biến, nên dùng let/const vì TDZ giúp catch bug sớm. var hoisting tạo silent bugs với undefined — đó là bad behavior cần tránh."`}</Callout>
                </TopicModal>

                <TopicModal title="Scope & Closure" emoji="🔒" color="#a78bfa" summary="Lexical scope, closure patterns, module pattern">
                    <Paragraph><Highlight>Scope</Highlight> = phạm vi truy cập biến. JS dùng <Highlight>Lexical Scope</Highlight> — scope được xác định lúc code được viết, không phải lúc chạy.</Paragraph>
                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <div className="text-slate-300 text-sm mt-1">• <strong>Global</strong> — truy cập ở mọi nơi<br />• <strong>Function</strong> — chỉ truy cập trong function<br />• <strong>Block</strong> (let/const) — chỉ trong {'{}'}</div>
                        </div>
                    </div>
                    <CodeBlock title="3-loại-scope.js">{`// ═══ 1. GLOBAL SCOPE ═══
var globalVar = 'tôi ở khắp nơi'     // global (var ngoài function)
let globalLet = 'tôi cũng global'     // global (let ngoài block)
// → Truy cập được từ BẤT KỲ ĐÂU trong file

// ═══ 2. FUNCTION SCOPE ═══
function greet() {
  var secret = 'chỉ tôi biết'        // function scope
  let also = 'tôi cũng vậy'          // function scope (vì trong function)
  console.log(globalVar)              // ✅ truy cập global OK
}
console.log(secret)                   // ❌ ReferenceError — ra ngoài function rồi!

// ═══ 3. BLOCK SCOPE ═══ (let/const trong {})
if (true) {
  var leaked = 'tôi thoát ra!'       // ⚠️ var KHÔNG có block scope → thoát ra ngoài if
  let trapped = 'tôi bị nhốt'        // ✅ let CÓ block scope → chỉ trong if
  const also = 'tôi cũng bị nhốt'    // ✅ const cũng block scope
}
console.log(leaked)                   // ✅ 'tôi thoát ra!' — var thoát block!
console.log(trapped)                  // ❌ ReferenceError — let bị nhốt trong block

// 📌 Tóm tắt:
// var   → function scope (bỏ qua block {})
// let   → block scope    (tôn trọng block {})
// const → block scope    (giống let, nhưng không re-assign)`}</CodeBlock>
                    <Paragraph><Highlight>Closure</Highlight> = function &quot;nhớ&quot; scope lúc nó được tạo, kể cả khi chạy ở nơi khác.</Paragraph>
                    <CodeBlock title="Closure classic example">{`function makeCounter() {
    let count = 0; // Biến "private"
    return {
        increment: () => ++count,
        getCount: () => count,
    };
}
const counter = makeCounter();
counter.increment(); // 1
counter.increment(); // 2
counter.getCount();  // 2
// count KHÔNG truy cập trực tiếp được!`}</CodeBlock>
                    <Callout type="warning">Câu hỏi phỏng vấn kinh điển: &quot;Giải thích output của vòng for + setTimeout&quot; — đáp án liên quan đến closure + var vs let.</Callout>
                    <CodeBlock title="Ví dụ kinh điển: for + setTimeout">{`// ❌ Dùng var — in ra 5, 5, 5, 5, 5
for (var i = 0; i < 5; i++) {
    setTimeout(() => console.log(i), 100);
}
// 🔍 GIẢI THÍCH TỪNG BƯỚC:
// 1. Vòng for chạy ĐỒNG BỘ: i = 0, 1, 2, 3, 4, rồi i = 5 → dừng
// 2. setTimeout đặt 5 callback vào hàng đợi (sẽ chạy SAU 100ms)
// 3. var có FUNCTION scope → chỉ có 1 biến i duy nhất
// 4. Khi 100ms trôi qua, 5 callback chạy → đều đọc CÙNG biến i → i = 5
//
// 📦 BỘ NHỚ: [i] ← CHỈ 1 Ô NHỚ
// callback 1 → nhìn [i]
// callback 2 → nhìn [i]  ← CÙNG ô nhớ!
// callback 3 → nhìn [i]
// Kết thúc for: [i] = 5 → tất cả đọc 5

// ✅ Dùng let — in ra 0, 1, 2, 3, 4
for (let i = 0; i < 5; i++) {
    setTimeout(() => console.log(i), 100);
}
// 🔍 GIẢI THÍCH:
// let có BLOCK scope → mỗi vòng lặp tạo biến i KHÁC NHAU
// Vòng 0: tạo i₀ = 0, callback bắt i₀
// Vòng 1: tạo i₁ = 1, callback bắt i₁
// Vòng 2: tạo i₂ = 2, callback bắt i₂
// → Mỗi callback closure "nhớ" đúng giá trị i CỦA MÌNH
//
// 📦 BỘ NHỚ: [i₀] [i₁] [i₂] [i₃] [i₄] ← 5 Ô NHỚ RIÊNG
// callback 1 → nhìn [i₀] = 0
// callback 2 → nhìn [i₁] = 1  ← ô nhớ KHÁC!
// callback 3 → nhìn [i₂] = 2
//
// 💡 TÓM TẮT:
// var = 1 ô nhớ chung → 5 callback cùng đọc ô đó (đã = 5)
// let = 5 ô nhớ riêng → mỗi callback đọc ô của mình (đúng giá trị)
//
// 🔑 CLOSURE ở đây: callback "nhớ" reference đến biến i lúc nó được tạo.
// Với var → nhớ reference đến 1 biến duy nhất (chung cho cả vòng for)
// Với let → nhớ reference đến biến riêng của vòng lặp đó

// ✅ Fix bằng IIFE (cách cũ trước khi có let)
for (var i = 0; i < 5; i++) {
    (function(j) {
        setTimeout(() => console.log(j), 100);
    })(i);
}
// IIFE tạo function scope mới, "copy" giá trị i vào j
// → Giống cách let tạo block scope mới`}</CodeBlock>
                </TopicModal>

                <TopicModal title="this keyword" emoji="👉" color="#f472b6" summary="this = chữ 'tôi' trong JS — thay đổi tùy ai đang gọi (regular) hoặc ai đã viết (arrow)">
                    <Paragraph><InlineCode>this</InlineCode> trong JS giống chữ <Highlight>&quot;tôi&quot;</Highlight> — nó thay đổi tùy <strong>ai đang nói</strong>:</Paragraph>

                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-pink-500/10 border border-pink-500/20">
                            <div className="text-pink-400 font-bold text-sm">{'🏠 Ví dụ: "Nhà của tôi"'}</div>
                            <div className="text-slate-300 text-sm mt-1 font-mono">
                                {'👨 Khuong nói "nhà của tôi" → nhà Khuong'}<br />
                                {'👩 Lan nói "nhà của tôi" → nhà Lan'}<br />
                                {'📞 Khuong nhờ Lan nói "nhà của tôi" → nhà LAN (không phải Khuong!)'}<br /><br />
                                <strong>{'this = chữ "tôi" — thay đổi tùy ai đang gọi function'}</strong>
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                            <div className="text-red-400 font-bold text-sm">{'🔴 Regular Function = Viết trên giấy ✍️'}</div>
                            <div className="text-slate-300 text-sm mt-1">
                                {'Bạn viết câu "nhà của tôi" lên giấy → đưa cho người khác đọc → "tôi" = người đọc, không phải bạn!'}<br />
                                {'→ '}<strong>this thay đổi</strong>{' tùy AI đang gọi function'}
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">{'🟢 Arrow Function = Ghi âm giọng nói 🎙️'}</div>
                            <div className="text-slate-300 text-sm mt-1">
                                {'Bạn ghi âm câu "nhà của tôi" → dù ai bấm play, giọng vẫn là của bạn'}<br />
                                {'→ '}<strong>this cố định</strong>{' = nơi arrow function được TẠO RA'}
                            </div>
                        </div>
                    </div>

                    <Paragraph><Highlight>Arrow function</Highlight> KHÔNG có this riêng — nó kế thừa this từ scope cha (lexical this). Đây là lý do arrow function phù hợp cho callbacks.</Paragraph>
                    <CodeBlock title="this-theo-tung-rule.js">{`// 1️⃣ Default binding — this = window (browser) / undefined (strict mode)
function showThis() {
    console.log(this);
}
showThis(); // window (non-strict) / undefined (strict)

// 2️⃣ Implicit binding — this = object trước dấu chấm
const khuong = {
    name: 'Khuong',
    greet() { console.log('Xin chào, tôi là ' + this.name) }
};
khuong.greet(); // "Xin chào, tôi là Khuong" ✅

const fn = khuong.greet;
fn(); // "Xin chào, tôi là undefined" ❌ (bị mất context!)
// → Khi tách method ra khỏi object, this bị mất!

// 3️⃣ Explicit binding — call / apply / bind (xem chi tiết bên dưới)
function introduce(greeting, emoji) {
    console.log(greeting + ', tôi là ' + this.name + ' ' + emoji);
}
const lan = { name: 'Lan' }
const binh = { name: 'Binh' }

introduce.call(lan, 'Hey', '👋');    // "Hey, tôi là Lan 👋"
introduce.apply(binh, ['Hi', '🤝']); // "Hi, tôi là Binh 🤝"
const boundFn = introduce.bind(lan, 'Hello');
boundFn('😄'); // "Hello, tôi là Lan 😄"

// 4️⃣ new binding — this = object mới tạo
function Person(name) {
    this.name = name; // this = {} mới
}
const p = new Person('Minh');
console.log(p.name); // "Minh"

// 5️⃣ Arrow function — KHÔNG có this riêng
const team = {
    name: 'Frontend',
    members: ['Khuong', 'Lan'],
    show() {
        this.members.forEach((m) => {
            console.log(m + ' thuộc team ' + this.name);
            // Arrow kế thừa this từ show() → team
        });
    }
};
team.show();
// "Khuong thuộc team Frontend"
// "Lan thuộc team Frontend"`}</CodeBlock>

                    <CodeBlock title="call-bind-apply.js">{`// 🎯 call, bind, apply — 3 cách "ép" this cho function
//
// Ví dụ thực tế: Khuong có method introduce()
// nhưng muốn NHỜ Lan "nói hộ" → dùng call/apply/bind

function introduce(greeting) {
    return greeting + ', tôi là ' + this.name;
}

const khuong = { name: 'Khuong' }
const lan = { name: 'Lan' }

// ═══ CALL — gọi NGAY, truyền args TỪNG CÁI ═══
introduce.call(khuong, 'Hey')  // "Hey, tôi là Khuong"
introduce.call(lan, 'Hi')     // "Hi, tôi là Lan"
// → call(thisArg, arg1, arg2, ...)

// ═══ APPLY — gọi NGAY, truyền args BẰNG MẢNG ═══
introduce.apply(khuong, ['Hello'])  // "Hello, tôi là Khuong"
// → apply(thisArg, [arg1, arg2, ...])
// → Khác call ở chỗ: args truyền bằng ARRAY

// ═══ BIND — KHÔNG gọi ngay, trả về function MỚI ═══
const khuongIntro = introduce.bind(khuong)
khuongIntro('Chào')  // "Chào, tôi là Khuong"
khuongIntro('Hey')   // "Hey, tôi là Khuong"
// → bind tạo function mới với this "khóa cứng" = khuong
// → Gọi bao nhiêu lần cũng giữ nguyên this

// 📌 TÓM TẮT:
// call  → gọi NGAY + args riêng lẻ     → fn.call(obj, a, b)
// apply → gọi NGAY + args MẢNG         → fn.apply(obj, [a, b])
// bind  → tạo function MỚI (chưa gọi)  → const newFn = fn.bind(obj)

// 💡 Dùng khi nào?
// call/apply: khi muốn "mượn" method 1 lần
// bind: khi cần truyền function đi nơi khác (event handler, callback)

// Ví dụ thực tế: bind trong React (class component cũ)
// this.handleClick = this.handleClick.bind(this) ← giữ this = component`}</CodeBlock>

                    <Callout type="tip">Thứ tự ưu tiên: <strong>new &gt; explicit (call/apply/bind) &gt; implicit (obj.method) &gt; default (window)</strong>. Arrow function bỏ qua tất cả rules này.</Callout>
                </TopicModal>

                <TopicModal title="Prototype & Inheritance" emoji="🧬" color="#34d399" summary="Prototype = 'gia tài' mà object con thừa kế từ object cha — chuỗi thừa kế giống dòng họ">
                    <Paragraph><InlineCode>Prototype</InlineCode> trong JS giống <Highlight>&quot;gia tài gia đình&quot;</Highlight> — con cháu được thừa kế tài sản từ cha mẹ, ông bà:</Paragraph>

                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                            <div className="text-emerald-400 font-bold text-sm">{'👨‍👩‍👦 Ví dụ: Gia tài gia đình'}</div>
                            <div className="text-slate-300 text-sm mt-1 font-mono">
                                {'👴 Ông có: nhà, xe, sách nấu ăn'}<br />
                                {'👨 Bố không có nhà riêng → mượn nhà ÔNG'}<br />
                                {'👦 Con không có xe riêng → mượn xe BỐ → nếu bố cũng không có → mượn xe ÔNG'}<br /><br />
                                <strong>{'Prototype chain = chuỗi thừa kế gia đình — cứ đi lên trên hỏi cho đến khi tìm thấy!'}</strong>
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">{'🏠 Own property = Tài sản TỰ MUA'}</div>
                            <div className="text-slate-300 text-sm mt-1">
                                {'Nếu con TỰ MUA xe → dùng xe của mình, không cần hỏi bố/ông nữa.'}<br />
                                {'→ '}<strong>Own property luôn được ưu tiên</strong>{' trước prototype chain'}
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                            <div className="text-red-400 font-bold text-sm">{'❌ Tìm không thấy = Hết dòng họ'}</div>
                            <div className="text-slate-300 text-sm mt-1">
                                {'Con hỏi bố → bố hỏi ông → ông hỏi... không ai có → undefined'}<br />
                                {'→ Cuối chain luôn là '}<strong>Object.prototype → null</strong>{' (hết dòng họ rồi!)'}
                            </div>
                        </div>
                    </div>

                    <Paragraph>JS dùng <Highlight>Prototypal Inheritance</Highlight> — mỗi object có một link ẩn (<InlineCode>__proto__</InlineCode>) trỏ đến prototype của nó.</Paragraph>
                    <Paragraph>Khi bạn truy cập property không có trên object, JS sẽ <strong>đi lên prototype chain</strong> tìm cho đến khi gặp <InlineCode>null</InlineCode>.</Paragraph>
                    <CodeBlock title="Prototype chain">{`const grandpa = { house: '🏠', car: '🚗', cookbook: '📖' };
const dad = Object.create(grandpa); // dad.__proto__ = grandpa
dad.laptop = '💻'; // bố tự mua laptop

dad.laptop;   // '💻' (own property — tài sản tự mua!)
dad.house;    // '🏠' (từ prototype chain — thừa kế từ ông!)
dad.bitcoin;  // undefined (không ai trong dòng họ có)

const child = Object.create(dad); // child.__proto__ = dad
child.phone = '📱'; // con tự mua phone

child.phone;    // '📱' (own property)
child.laptop;   // '💻' (thừa kế từ bố)
child.house;    // '🏠' (thừa kế từ ông — đi lên 2 level!)

// Chain: child → dad → grandpa → Object.prototype → null
// 👦 con → 👨 bố → 👴 ông → ❌ hết`}</CodeBlock>

                    <CodeBlock title="prototype-ung-dung-thuc-te.js">{`// ═══ 1. TẠI SAO [1,2,3].map() CHẠY ĐƯỢC? ═══
// Vì .map() nằm trên Array.prototype!
const arr = [1, 2, 3]
arr.map(x => x * 2)  // [2, 4, 6]
// arr không có .map() → JS đi lên arr.__proto__ = Array.prototype → tìm thấy!

// Tương tự:
'hello'.toUpperCase() // String.prototype.toUpperCase
(5).toFixed(2)        // Number.prototype.toFixed

// ═══ 2. THÊM METHOD CHO TẤT CẢ ARRAY (Polyfill) ═══
Array.prototype.last = function() {
    return this[this.length - 1]
}
[1, 2, 3].last()  // 3 — TẤT CẢ array đều có .last() ngay!
// ⚠️ Cẩn thận: không nên modify built-in prototypes trong production

// ═══ 3. MƯỢN METHOD (Method Borrowing) ═══
const arrayLike = { 0: 'a', 1: 'b', length: 2 }
// arrayLike KHÔNG phải array → không có .join()
// → Mượn từ Array.prototype:
Array.prototype.join.call(arrayLike, '-')  // "a-b"

// ═══ 4. PERFORMANCE: PROTOTYPE vs INSTANCE ═══
// ❌ Mỗi instance TẠO LẠI function mới → tốn bộ nhớ
function Dog(name) {
    this.name = name
    this.bark = function() { return this.name + ' woof!' }
    // → 1000 dogs = 1000 bản copy bark()
}

// ✅ Đặt trên prototype → CHIA SẺ 1 function duy nhất
function Dog(name) { this.name = name }
Dog.prototype.bark = function() { return this.name + ' woof!' }
// → 1000 dogs vẫn chỉ có 1 bark() trên prototype!

// ═══ 5. hasOwnProperty — PHÂN BIỆT gia tài tự có vs thừa kế ═══
const child = Object.create({ inherited: true })
child.own = true
child.hasOwnProperty('own')       // true  — tài sản tự có
child.hasOwnProperty('inherited') // false — thừa kế từ prototype`}</CodeBlock>
                    <Callout type="warning">ES6 Class chỉ là <Highlight>syntactic sugar</Highlight> — bên dưới vẫn dùng prototype. Hiểu prototype = hiểu JS ở level sâu.</Callout>
                </TopicModal>

                <TopicModal title="OOP trong JavaScript" emoji="🏗️" color="#f59e0b" summary="4 trụ cột OOP: Encapsulation, Inheritance, Polymorphism, Abstraction — JS dùng Prototypal OOP, class chỉ là sugar">
                    <Paragraph>JS dùng <Highlight>Prototypal OOP</Highlight> — object kế thừa trực tiếp từ object khác, không cần class blueprint như Java/C#. ES6 Class chỉ là syntactic sugar bọc prototype.</Paragraph>

                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                            <div className="text-yellow-400 font-bold text-sm">4 trụ cột OOP</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Encapsulation</strong> — đóng gói data + methods, ẩn chi tiết bên trong<br />
                                • <strong>Inheritance</strong> — kế thừa tính năng từ class cha<br />
                                • <strong>Polymorphism</strong> — cùng method, khác hành vi tùy class con<br />
                                • <strong>Abstraction</strong> — ẩn complexity, chỉ expose interface cần thiết
                            </div>
                        </div>
                    </div>

                    <CodeBlock title="oop-trong-js.js">{`// ═══ 1. ENCAPSULATION (Đóng gói) ═══
class BankAccount {
  #balance = 0  // # = private field (ES2022)

  deposit(amount) { this.#balance += amount }
  getBalance() { return this.#balance }
}
const acc = new BankAccount()
acc.deposit(100)
acc.#balance    // ❌ SyntaxError — private, không truy cập được!
acc.getBalance() // ✅ 100

// ═══ 2. INHERITANCE (Kế thừa) ═══
class Animal {
  constructor(name) { this.name = name }
  speak() { return \`\${this.name} makes a sound\` }
}
class Dog extends Animal {
  speak() { return \`\${this.name} barks 🐕\` } // override method cha
}
new Dog('Rex').speak() // "Rex barks 🐕"

// ═══ 3. POLYMORPHISM (Đa hình) ═══
const animals = [new Animal('Cat'), new Dog('Rex')]
animals.forEach(a => console.log(a.speak()))
// "Cat makes a sound"
// "Rex barks 🐕"  ← cùng .speak() nhưng output khác nhau!

// ═══ 4. ABSTRACTION (Trừu tượng) ═══
class Shape {
  area() { throw new Error('Phải implement area()!') }
}
class Circle extends Shape {
  constructor(r) { super(); this.r = r }
  area() { return Math.PI * this.r ** 2 }
}
// new Shape().area() → ❌ Error — buộc class con phải implement`}</CodeBlock>

                    <CodeBlock title="class-vs-prototype.js">{`// ES6 Class CHỈ LÀ syntactic sugar:
class Person {
  greet() { return 'Hi' }
}
// ↑ tương đương ↓
function Person() {}
Person.prototype.greet = function() { return 'Hi' }

typeof Person // "function" — class không phải kiểu dữ liệu mới!`}</CodeBlock>

                    <Callout type="tip">Interview: {`"JS dùng prototypal inheritance — object kế thừa trực tiếp từ object. ES6 class là syntactic sugar, bên dưới vẫn là prototype chain. Khác Java ở chỗ không có 'blueprint' cứng — mọi thứ đều là object."`}</Callout>
                </TopicModal>

                <TopicModal title="Functional Programming" emoji="λ" color="#06b6d4" summary="Pure functions, immutability, higher-order functions, composition — paradigm mà React dùng rất nhiều">
                    <Paragraph>JS là <Highlight>multi-paradigm</Highlight> — hỗ trợ cả OOP lẫn FP. React hiện đại dùng FP rất nhiều (hooks, pure components, composition over inheritance).</Paragraph>

                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                            <div className="text-cyan-400 font-bold text-sm">Nguyên tắc cốt lõi FP</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Pure Functions</strong> — cùng input → cùng output, không side effects<br />
                                • <strong>Immutability</strong> — không mutate, luôn tạo data mới<br />
                                • <strong>Higher-Order Functions</strong> — function làm tham số / return value<br />
                                • <strong>Composition</strong> — ghép nhiều function nhỏ thành function phức tạp
                            </div>
                        </div>
                    </div>

                    <CodeBlock title="functional-programming.js">{`// ═══ 1. PURE vs IMPURE ═══
// ❌ Impure — thay đổi biến bên ngoài
let total = 0
function addToTotal(x) { total += x; return total }

// ✅ Pure — không side effects, dự đoán được
function add(a, b) { return a + b }
add(2, 3) // luôn = 5, gọi bao nhiêu lần cũng vậy

// ═══ 2. IMMUTABILITY ═══
// ❌ Mutate
const arr = [1, 2, 3]
arr.push(4) // thay đổi mảng gốc!

// ✅ Immutable — tạo mảng MỚI
const newArr = [...arr, 4]
const updated = arr.map(x => x * 2) // [2, 4, 6] — gốc không đổi

// ═══ 3. HIGHER-ORDER FUNCTIONS ═══
const multiply = (factor) => (x) => x * factor
const double = multiply(2)
const triple = multiply(3)
double(5)  // 10
triple(5)  // 15

// Built-in: map, filter, reduce
[1, 2, 3, 4, 5]
  .filter(n => n % 2 !== 0)  // [1, 3, 5]
  .map(n => n ** 2)           // [1, 9, 25]
  .reduce((sum, n) => sum + n, 0) // 35

// ═══ 4. COMPOSITION ═══
const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x)

const addOne = x => x + 1
const square = x => x * x

const transform = pipe(addOne, square, double)
transform(3)  // pipe: 3 → 4 → 16 → 32`}</CodeBlock>

                    <Callout type="tip">Interview: {`"React hooks chính là FP — useState là closure, useEffect quản lý side effects riêng, components là pure functions of props. FP giúp code React dễ predict và test."`}</Callout>
                </TopicModal>

                <TopicModal title="Callback" emoji="📞" color="#ef4444" summary="Function truyền vào function khác — nền tảng của async JS, event handling, và higher-order functions">
                    <Paragraph><Highlight>Callback</Highlight> = function được truyền làm tham số cho function khác, và được gọi lại (call back) khi cần. Đây là nền tảng của mọi thứ async trong JS.</Paragraph>

                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                            <div className="text-red-400 font-bold text-sm">Callback ở đâu?</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <InlineCode>addEventListener</InlineCode> — click handler là callback<br />
                                • <InlineCode>setTimeout</InlineCode> — function chạy sau delay<br />
                                • <InlineCode>.map()</InlineCode>, <InlineCode>.filter()</InlineCode> — transform function là callback<br />
                                • <InlineCode>fetch().then()</InlineCode> — .then() nhận callback<br />
                                • Node.js — <InlineCode>fs.readFile(path, callback)</InlineCode>
                            </div>
                        </div>
                    </div>

                    <CodeBlock title="callback.js">{`// ═══ CALLBACK CƠ BẢN ═══
function greet(name, callback) {
  console.log('Hi ' + name)
  callback() // gọi lại function được truyền vào
}
greet('Khuong', () => console.log('Done!'))
// "Hi Khuong" → "Done!"

// ═══ CALLBACK TRONG ASYNC ═══
console.log('1. Bắt đầu')
setTimeout(() => {
  console.log('2. Callback chạy sau 1 giây')
}, 1000)
console.log('3. Code tiếp tục chạy (không đợi)')
// Output: 1 → 3 → 2 (sau 1s)

// ═══ CALLBACK HELL ═══ (vấn đề lớn nhất)
// ❌ Lồng callback 5-6 cấp → khó đọc, khó debug
getUser(id, (user) => {
  getOrders(user, (orders) => {
    getDetails(orders[0], (detail) => {
      getShipping(detail, (shipping) => {
        // 😵 pyramid of doom!
      })
    })
  })
})

// ✅ Fix bằng Promise → async/await
const user = await getUser(id)
const orders = await getOrders(user)
const detail = await getDetails(orders[0])
const shipping = await getShipping(detail)
// 🎉 phẳng, dễ đọc, dễ debug!`}</CodeBlock>

                    <Callout type="warning">Callback hell là lý do Promise ra đời → rồi async/await ra đời. Hiểu callback = hiểu <Highlight>tại sao</Highlight> cần Promise/async-await.</Callout>
                </TopicModal>

                <TopicModal title="Event Loop" emoji="🔄" color="#60a5fa" summary="Call Stack, Microtask Queue, Macrotask Queue">
                    <Paragraph>JS là <Highlight>single-threaded</Highlight> nhưng vẫn xử lý async nhờ <Highlight>Event Loop</Highlight>. Hiểu Event Loop = hiểu tại sao code async chạy theo thứ tự &quot;lạ&quot;.</Paragraph>
                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">Thứ tự ưu tiên</div>
                            <div className="text-slate-300 text-sm mt-1">1. <strong>Call Stack</strong> — code đồng bộ chạy trước<br />2. <strong>Microtask Queue</strong> — Promise.then, queueMicrotask, MutationObserver<br />3. <strong>Macrotask Queue</strong> — setTimeout, setInterval, I/O</div>
                        </div>
                    </div>
                    <CodeBlock title="Đoán output">{`console.log('1'); // Call Stack
setTimeout(() => console.log('2'), 0); // Macrotask
Promise.resolve().then(() => console.log('3')); // Microtask
console.log('4'); // Call Stack

// Output: 1 → 4 → 3 → 2`}</CodeBlock>
                    <Callout type="tip">Đây là câu hỏi phỏng vấn #1 về JS. Luôn nhớ: <Highlight>Sync → Microtask → Macrotask</Highlight>.</Callout>
                    <a href="/blogs/event-loop" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 Xem bài viết chi tiết →</a>
                </TopicModal>

                <TopicModal title="Async/Await & Promises" emoji="⚡" color="#fbbf24" summary="Promise là gì, 3 trạng thái, Promise.all/race/allSettled, async/await, error handling">
                    <Paragraph><Highlight>Promise</Highlight> là một đối tượng đại diện cho kết quả (thành công hoặc thất bại) của một tác vụ bất đồng bộ (như gọi API, đọc file) trong tương lai. Nó giải quyết tình trạng <Highlight>&quot;callback hell&quot;</Highlight> bằng cách cung cấp cú pháp <InlineCode>.then()</InlineCode> và <InlineCode>.catch()</InlineCode> để quản lý code dễ đọc, dễ bảo trì hơn.</Paragraph>

                    <Heading3>3 Trạng thái của Promise</Heading3>
                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                            <div className="text-yellow-400 font-bold text-sm">⏳ Pending (Đang chờ)</div>
                            <div className="text-slate-300 text-sm mt-1">Trạng thái ban đầu — tác vụ bất đồng bộ chưa hoàn tất. Promise vẫn đang &quot;chờ&quot; kết quả.</div>
                        </div>
                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">✅ Fulfilled / Resolved (Thành công)</div>
                            <div className="text-slate-300 text-sm mt-1">Tác vụ hoàn thành thành công, Promise có kết quả (value). Gọi callback trong <InlineCode>.then()</InlineCode>.</div>
                        </div>
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                            <div className="text-red-400 font-bold text-sm">❌ Rejected (Bị từ chối)</div>
                            <div className="text-slate-300 text-sm mt-1">Tác vụ thất bại, Promise trả về lỗi (reason). Gọi callback trong <InlineCode>.catch()</InlineCode>.</div>
                        </div>
                    </div>

                    <Heading3>Cách hoạt động</Heading3>
                    <CodeBlock title="Tạo và sử dụng Promise">{`const myPromise = new Promise((resolve, reject) => {
  // Thực hiện tác vụ bất đồng bộ
  let success = true;
  if (success) {
    resolve("Dữ liệu thành công"); // → Fulfilled
  } else {
    reject("Lỗi xảy ra");          // → Rejected
  }
});

myPromise
  .then((data) => console.log(data))   // Xử lý khi thành công
  .catch((error) => console.error(error)) // Xử lý khi lỗi
  .finally(() => console.log("Hoàn tất")); // Chạy dù thành công hay lỗi`}</CodeBlock>

                    <Heading3>async/await — Syntactic Sugar</Heading3>
                    <Paragraph><InlineCode>async/await</InlineCode> là cú pháp được giới thiệu trong ES2017, giúp viết async code nhìn như synchronous — dễ đọc, dễ debug hơn nhiều so với <InlineCode>.then()</InlineCode> chain.</Paragraph>

                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                            <div className="text-yellow-400 font-bold text-sm">async — Đánh dấu function là bất đồng bộ</div>
                            <div className="text-slate-300 text-sm mt-1">• Thêm <InlineCode>async</InlineCode> trước function → function đó <strong>luôn trả về Promise</strong><br />• Nếu return giá trị bình thường, JS tự wrap thành <InlineCode>Promise.resolve(value)</InlineCode><br />• Nếu throw error, JS tự wrap thành <InlineCode>Promise.reject(error)</InlineCode></div>
                        </div>
                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">await — Tạm dừng và chờ Promise resolve</div>
                            <div className="text-slate-300 text-sm mt-1">• <InlineCode>await</InlineCode> chỉ dùng được <strong>bên trong async function</strong> (hoặc top-level modules)<br />• Khi gặp <InlineCode>await</InlineCode>, JS <strong>tạm dừng</strong> function đó, trả quyền điều khiển cho Event Loop<br />• Khi Promise resolve → JS <strong>tiếp tục chạy</strong> từ dòng tiếp theo<br />• Khi Promise reject → throw error (bắt bằng <InlineCode>try/catch</InlineCode>)</div>
                        </div>
                    </div>

                    <CodeBlock title="async keyword giải thích">{`// async function LUÔN trả về Promise
async function getNumber() {
  return 42; // Tự động wrap → Promise.resolve(42)
}
getNumber().then(n => console.log(n)); // 42

// Tương đương với:
function getNumber() {
  return Promise.resolve(42);
}

// async + throw = Promise.reject
async function failHard() {
  throw new Error("Oops!"); // → Promise.reject(Error("Oops!"))
}
failHard().catch(err => console.log(err.message)); // "Oops!"`}</CodeBlock>

                    <CodeBlock title="await hoạt động thế nào">{`async function fetchUser() {
  console.log("1. Bắt đầu fetch");

  // await TẠM DỪNG function tại đây
  // Event Loop vẫn chạy, xử lý tasks khác
  const res = await fetch('/api/user'); // ⏸️ chờ...

  // Khi fetch xong → TIẾP TỤC từ đây
  console.log("2. Fetch xong, parse JSON");
  const user = await res.json(); // ⏸️ chờ tiếp...

  console.log("3. Có data:", user.name);
  return user;
}

// BÊN NGOÀI, code vẫn chạy bình thường (non-blocking)
fetchUser();
console.log("4. Dòng này chạy NGAY, không chờ fetchUser");
// Output: 1 → 4 → 2 → 3`}</CodeBlock>

                    <Heading3>⚠️ Sai lầm phổ biến: Sequential vs Parallel</Heading3>
                    <CodeBlock title="Cẩn thận: await tuần tự vs song song">{`// ❌ SAI: Chạy tuần tự — chậm!
async function slow() {
  const users = await fetch('/api/users');  // 2s
  const posts = await fetch('/api/posts');  // 2s
  // Tổng: 4 giây! Vì chờ users xong mới fetch posts
}

// ✅ ĐÚNG: Chạy song song — nhanh!
async function fast() {
  const [users, posts] = await Promise.all([
    fetch('/api/users'),   // 2s
    fetch('/api/posts'),   // 2s (chạy cùng lúc!)
  ]);
  // Tổng: 2 giây! Hai requests chạy đồng thời
}

// ✅ Hoặc: Start promises trước, await sau
async function alsoFast() {
  const usersPromise = fetch('/api/users');  // Bắt đầu ngay
  const postsPromise = fetch('/api/posts');  // Bắt đầu ngay

  const users = await usersPromise;  // Chờ kết quả
  const posts = await postsPromise;  // Đã xong rồi (hoặc gần xong)
}`}</CodeBlock>

                    <Heading3>Error Handling Patterns</Heading3>
                    <CodeBlock title="Các cách xử lý lỗi">{`// Pattern 1: try/catch (phổ biến nhất)
async function loadData() {
  try {
    const res = await fetch('/api/data');
    if (!res.ok) throw new Error('HTTP ' + res.status);
    return await res.json();
  } catch (err) {
    console.error('Failed:', err.message);
    return null; // Fallback value
  }
}

// Pattern 2: .catch() trên từng await
async function loadData() {
  const data = await fetch('/api/data')
    .then(r => r.json())
    .catch(() => null); // Không crash, trả null nếu lỗi
}

// Pattern 3: Wrapper function (Go-style)
async function to(promise) {
  try {
    const data = await promise;
    return [null, data];
  } catch (err) {
    return [err, null];
  }
}

// Sử dụng:
const [err, user] = await to(fetch('/api/user').then(r => r.json()));
if (err) console.error('Error:', err);`}</CodeBlock>

                    <CodeBlock title="So sánh then() vs async/await">{`// ❌ Promise chain — khó đọc khi lồng nhiều
fetch('/api/user')
  .then(res => res.json())
  .then(user => fetch('/api/posts/' + user.id))
  .then(res => res.json())
  .then(posts => console.log(posts))
  .catch(err => console.error(err));

// ✅ async/await — rõ ràng, dễ debug
async function loadPosts() {
  try {
    const res = await fetch('/api/user');
    const user = await res.json();
    const postsRes = await fetch('/api/posts/' + user.id);
    const posts = await postsRes.json();
    console.log(posts);
  } catch (err) {
    console.error(err);
  }
}`}</CodeBlock>

                    <Heading3>Các phương thức quan trọng</Heading3>
                    <div className="my-3 overflow-x-auto">
                        <table className="w-full text-sm border-collapse">
                            <thead><tr className="border-b border-[var(--border-primary)]"><th className="text-left p-2 text-slate-400">Method</th><th className="text-left p-2 text-slate-400">Hành vi</th><th className="text-left p-2 text-slate-400">Khi nào dùng</th></tr></thead>
                            <tbody className="text-[var(--text-secondary)]">
                                <tr className="border-b border-gray-100"><td className="p-2"><InlineCode>Promise.all</InlineCode></td><td className="p-2">Chạy song song, <strong>reject nếu 1 fail</strong></td><td className="p-2">Fetch nhiều API cùng lúc, tất cả đều bắt buộc</td></tr>
                                <tr className="border-b border-gray-100"><td className="p-2"><InlineCode>Promise.allSettled</InlineCode></td><td className="p-2">Chạy song song, <strong>chờ tất cả xong</strong> (kể cả fail)</td><td className="p-2">Batch operations mà vẫn muốn biết kết quả từng cái</td></tr>
                                <tr className="border-b border-gray-100"><td className="p-2"><InlineCode>Promise.race</InlineCode></td><td className="p-2">Trả về <strong>kết quả đầu tiên</strong> (fulfill hoặc reject)</td><td className="p-2">Timeout pattern, lấy response nhanh nhất</td></tr>
                                <tr><td className="p-2"><InlineCode>Promise.any</InlineCode></td><td className="p-2">Trả về <strong>fulfilled đầu tiên</strong>, ignore rejected</td><td className="p-2">Fallback servers, lấy kết quả thành công đầu tiên</td></tr>
                            </tbody>
                        </table>
                    </div>
                    <CodeBlock title="Ví dụ Promise methods">{`// Promise.all — fail fast
const [users, posts] = await Promise.all([
  fetch('/api/users').then(r => r.json()),
  fetch('/api/posts').then(r => r.json()),
]); // Nếu 1 cái fail → cả 2 đều bị reject!

// Promise.allSettled — chờ tất cả
const results = await Promise.allSettled([
  fetch('/api/a'), // fulfilled
  fetch('/api/b'), // rejected
]);
// results = [
//   { status: 'fulfilled', value: Response },
//   { status: 'rejected', reason: Error }
// ]

// Promise.race — timeout pattern
const result = await Promise.race([
  fetch('/api/slow-endpoint'),
  new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Timeout!')), 5000)
  ),
]);`}</CodeBlock>

                    <Heading3>Lợi ích của Promise</Heading3>
                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">🧹 Tránh Callback Hell</div>
                            <div className="text-slate-300 text-sm mt-1">Thay vì callback lồng nhau 5-6 cấp, dùng <InlineCode>.then()</InlineCode> chain hoặc <InlineCode>async/await</InlineCode> — code phẳng, dễ đọc.</div>
                        </div>
                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">🛡️ Error Handling tốt hơn</div>
                            <div className="text-slate-300 text-sm mt-1">Một <InlineCode>.catch()</InlineCode> bắt tất cả lỗi trong chain. Với <InlineCode>async/await</InlineCode>, dùng <InlineCode>try/catch</InlineCode> quen thuộc.</div>
                        </div>
                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <div className="text-purple-400 font-bold text-sm">⚡ Chạy song song dễ dàng</div>
                            <div className="text-slate-300 text-sm mt-1"><InlineCode>Promise.all</InlineCode> cho phép chạy nhiều async tasks đồng thời — nhanh hơn đáng kể so với chạy tuần tự.</div>
                        </div>
                    </div>

                    <Callout type="warning">Luôn dùng <InlineCode>try/catch</InlineCode> với async/await. Unhandled Promise rejection sẽ crash Node.js process!</Callout>
                    <Callout type="tip">Interview tip: Giải thích được sự khác nhau giữa <InlineCode>Promise.all</InlineCode> vs <InlineCode>Promise.allSettled</InlineCode> và khi nào dùng cái nào — câu hỏi rất phổ biến.</Callout>
                    <a href="/blogs/callback-promise-async-await" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 Xem bài viết chi tiết →</a>
                </TopicModal>

                <TopicModal title="ES6+ Features" emoji="✨" color="#38bdf8" summary="destructuring, spread, modules, optional chaining, nullish coalescing">
                    <Paragraph>Những feature <Highlight>phải dùng thành thạo</Highlight> — interviewer expect bạn viết modern JS.</Paragraph>
                    <div className="my-3 space-y-2">
                        {[
                            ['Destructuring', 'const { name, age } = user; const [first, ...rest] = arr;'],
                            ['Spread / Rest', 'const merged = { ...a, ...b }; function sum(...nums) {}'],
                            ['Template Literals', '`Hello ${name}, you are ${age} years old`'],
                            ['Optional Chaining', 'user?.address?.street // undefined thay vì crash'],
                            ['Nullish Coalescing', 'value ?? defaultValue // chỉ null/undefined mới fallback'],
                            ['ES Modules', 'import/export — static analysis, tree shaking'],
                        ].map(([title, desc]) => (
                            <div key={title} className="p-2 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                                <div className="text-blue-400 text-sm font-medium">{title}</div>
                                <div className="text-[var(--text-secondary)] text-xs font-mono mt-0.5">{desc}</div>
                            </div>
                        ))}
                    </div>
                    <a href="/blogs/ecmascript-features" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 Xem bài viết chi tiết →</a>
                </TopicModal>

                <TopicModal title="Regular Expressions (Regex)" emoji="🔍" color="#ec4899" summary={'Regex = "Tìm GÌ, BAO NHIÊU, Ở ĐÂU" — công cụ xử lý text mạnh nhất trong mọi ngôn ngữ'}>
                    <Paragraph>Regex trông đáng sợ nhưng thật ra chỉ cần nhớ <Highlight>3 câu hỏi</Highlight>: Tìm <strong>GÌ</strong>? <strong>Bao nhiêu</strong>? <strong>Ở đâu</strong>?</Paragraph>

                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-pink-500/10 border border-pink-500/20">
                            <div className="text-pink-400 font-bold text-sm">1. Tìm GÌ? (Character Classes)</div>
                            <div className="text-slate-300 text-sm mt-1">
                                <InlineCode>.</InlineCode> bất kỳ ký tự &nbsp;|&nbsp; <InlineCode>\d</InlineCode> = <strong>d</strong>igit (0-9) &nbsp;|&nbsp; <InlineCode>\w</InlineCode> = <strong>w</strong>ord (a-z, 0-9, _) &nbsp;|&nbsp; <InlineCode>\s</InlineCode> = <strong>s</strong>pace<br />
                                Viết HOA = phủ định: <InlineCode>\D</InlineCode> = không phải số, <InlineCode>\W</InlineCode> = không phải word<br />
                                <InlineCode>[abc]</InlineCode> = a hoặc b hoặc c &nbsp;|&nbsp; <InlineCode>[^abc]</InlineCode> = KHÔNG phải a, b, c
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">2. BAO NHIÊU? (Quantifiers)</div>
                            <div className="text-slate-300 text-sm mt-1">
                                <InlineCode>*</InlineCode> = 0 hoặc nhiều (sao = vô hạn) &nbsp;|&nbsp; <InlineCode>+</InlineCode> = 1 hoặc nhiều (cộng = ít nhất 1)<br />
                                <InlineCode>?</InlineCode> = 0 hoặc 1 (có hoặc không) &nbsp;|&nbsp; <InlineCode>{'{3}'}</InlineCode> = đúng 3 lần &nbsp;|&nbsp; <InlineCode>{'{2,5}'}</InlineCode> = 2 đến 5 lần
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">3. Ở ĐÂU? (Anchors)</div>
                            <div className="text-slate-300 text-sm mt-1">
                                <InlineCode>^</InlineCode> = đầu chuỗi &nbsp;|&nbsp; <InlineCode>$</InlineCode> = cuối chuỗi &nbsp;|&nbsp; <InlineCode>\b</InlineCode> = ranh giới từ (<strong>b</strong>oundary)
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                            <div className="text-yellow-400 font-bold text-sm">4. Nhóm & Nâng cao</div>
                            <div className="text-slate-300 text-sm mt-1">
                                <InlineCode>(abc)</InlineCode> = nhóm capture &nbsp;|&nbsp; <InlineCode>{'(?:abc)'}</InlineCode> = nhóm không capture &nbsp;|&nbsp; <InlineCode>a|b</InlineCode> = a HOẶC b<br />
                                <InlineCode>{'(?=abc)'}</InlineCode> = lookahead &nbsp;|&nbsp; <InlineCode>{'(?!abc)'}</InlineCode> = negative lookahead
                            </div>
                        </div>
                    </div>

                    <div className="p-3 rounded-lg bg-gray-500/10 border border-gray-500/20 my-3">
                        <div className="text-gray-300 font-bold text-sm">📊 Regex Cheat Sheet</div>
                        <div className="text-slate-300 text-sm mt-2">
                            <div className="overflow-x-auto">
                                <table className="w-full text-xs">
                                    <thead>
                                        <tr className="border-b border-white/10">
                                            <th className="text-left py-1.5 pr-2 text-slate-400 font-semibold">Pattern</th>
                                            <th className="text-left py-1.5 pr-2 text-slate-400 font-semibold">Nghĩa</th>
                                            <th className="text-left py-1.5 text-slate-400 font-semibold">Mẹo nhớ</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-slate-300">
                                        <tr className="border-b border-white/5"><td className="py-1.5 pr-2 font-mono text-pink-400">\d</td><td className="py-1.5 pr-2">Digit 0-9</td><td className="py-1.5"><strong>d</strong>igit</td></tr>
                                        <tr className="border-b border-white/5"><td className="py-1.5 pr-2 font-mono text-pink-400">\w</td><td className="py-1.5 pr-2">Word char</td><td className="py-1.5"><strong>w</strong>ord</td></tr>
                                        <tr className="border-b border-white/5"><td className="py-1.5 pr-2 font-mono text-pink-400">\s</td><td className="py-1.5 pr-2">Whitespace</td><td className="py-1.5"><strong>s</strong>pace</td></tr>
                                        <tr className="border-b border-white/5"><td className="py-1.5 pr-2 font-mono text-blue-400">*</td><td className="py-1.5 pr-2">0 hoặc nhiều</td><td className="py-1.5">Sao = vô hạn</td></tr>
                                        <tr className="border-b border-white/5"><td className="py-1.5 pr-2 font-mono text-blue-400">+</td><td className="py-1.5 pr-2">1 hoặc nhiều</td><td className="py-1.5">Cộng = ít nhất 1</td></tr>
                                        <tr className="border-b border-white/5"><td className="py-1.5 pr-2 font-mono text-blue-400">?</td><td className="py-1.5 pr-2">0 hoặc 1</td><td className="py-1.5">Hỏi = có hay không</td></tr>
                                        <tr className="border-b border-white/5"><td className="py-1.5 pr-2 font-mono text-green-400">^</td><td className="py-1.5 pr-2">Đầu chuỗi</td><td className="py-1.5">Mũ = lên đầu</td></tr>
                                        <tr><td className="py-1.5 pr-2 font-mono text-green-400">$</td><td className="py-1.5 pr-2">Cuối chuỗi</td><td className="py-1.5">Tiền = cuối</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <CodeBlock title="regex-thuc-te.js">{`// ═══ 5 REGEX HAY DÙNG NHẤT (nhớ mấy cái này = đủ 90%) ═══

// 1. Validate SĐT Việt Nam (10 số, bắt đầu bằng 0)
const phoneRegex = /^0\\d{9}$/
phoneRegex.test('0901234567')  // true
phoneRegex.test('901234567')   // false (thiếu 0 đầu)

// 2. Validate email đơn giản
const emailRegex = /\\w+@\\w+\\.\\w+/
emailRegex.test('khuong@gmail.com')  // true

// 3. Validate URL
const urlRegex = /^https?:\\/\\/.+/
urlRegex.test('https://thetaphoa.store')  // true

// 4. Tách số có dấu phẩy: "1,000,000" → match
const numberRegex = /\\d{1,3}(,\\d{3})*/
'1,000,000'.match(numberRegex)  // ["1,000,000"]

// 5. Extract slug (kebab-case)
const slugRegex = /[-\\w]+/g
'hello-world 123'.match(slugRegex)  // ["hello-world", "123"]

// ═══ REGEX METHODS TRONG JS ═══
const str = 'Khuong - age 25, Lan - age 23'

// test() → true/false
/\\d+/.test(str)                    // true

// match() → tìm matches
str.match(/\\d+/g)                  // ["25", "23"]

// replace() → thay thế
str.replace(/\\d+/g, 'XX')          // "Khuong - age XX, Lan - age XX"

// matchAll() → iterator với capture groups
const regex = /(\\w+) - age (\\d+)/g
for (const m of str.matchAll(regex)) {
  console.log(m[1], m[2])         // "Khuong" "25", "Lan" "23"
}

// ═══ ĐỌC REGEX NHƯ ĐỌC CÂU (trái → phải) ═══
// ^0\\d{9}$
// ^ đầu chuỗi → 0 → \\d{9} 9 chữ số → $ cuối chuỗi
// = "Chuỗi bắt đầu bằng 0, theo sau 9 chữ số, hết"`}</CodeBlock>

                    <Callout type="info">💡 <strong>Pro tip</strong>: Không cần nhớ hết regex — chỉ cần biết đủ để <Highlight>đọc hiểu</Highlight> regex người khác viết + dùng <a href="https://regex101.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">regex101.com</a> để build và test khi cần.</Callout>
                    <Callout type="tip">Interview: {`"Regex hoạt động bằng 3 câu hỏi: tìm GÌ (\\d, \\w, [abc]), bao NHIÊU (*, +, {n}), ở ĐÂU (^, $, \\b). Đọc từ trái sang phải như đọc câu."`}</Callout>
                </TopicModal>

                <TopicModal title="Dynamic Import + Suspense" emoji="📦" color="#8b5cf6" summary="Code splitting — chia bundle thành chunks nhỏ, load theo nhu cầu, giảm thời gian tải trang">
                    <Paragraph><Highlight>Dynamic Import</Highlight> cho phép load code <strong>khi cần</strong> thay vì load hết lúc đầu — giảm bundle size, trang hiện nhanh hơn.</Paragraph>

                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-violet-500/10 border border-violet-500/20">
                            <div className="text-violet-400 font-bold text-sm">Static vs Dynamic Import</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Static</strong>: <InlineCode>import X from Y</InlineCode> — load TẤT CẢ lúc đầu, bundle to<br />
                                • <strong>Dynamic</strong>: <InlineCode>{'import(\'./X\')'}</InlineCode> — load KHI CẦN, chia thành chunk nhỏ
                            </div>
                        </div>
                    </div>

                    <CodeBlock title="dynamic-import.js">{`// ═══ STATIC IMPORT — load TẤT CẢ lúc đầu ═══
import HeavyChart from './HeavyChart' // 500KB nằm trong main bundle

// ═══ DYNAMIC IMPORT — load KHI CẦN ═══
const module = await import('./HeavyChart') // trả về Promise!
const HeavyChart = module.default

// ═══ Không có Dynamic Import ═══
// [main.js: 2MB] ← user đợi load HẾT 2MB mới thấy trang

// ═══ Có Dynamic Import ═══
// [main.js: 500KB] → trang hiện NGAY
//   ↓ user click "Xem biểu đồ"
// [chart-chunk.js: 300KB] → chỉ load lúc này
//   ↓ user mở settings
// [settings-chunk.js: 200KB] → load sau`}</CodeBlock>

                    <CodeBlock title="react-lazy-suspense.jsx">{`// ═══ 1. React.lazy + Suspense ═══
import { lazy, Suspense } from 'react'

const HeavyChart = lazy(() => import('./HeavyChart'))
// → Component KHÔNG load lúc đầu
// → Chỉ download file khi component render lần đầu

function Dashboard() {
  return (
    <Suspense fallback={<div>Đang tải biểu đồ...</div>}>
      <HeavyChart />
    </Suspense>
  )
}
// Suspense "bắt" trạng thái loading
// → hiện fallback → swap khi chunk load xong

// ═══ 2. Next.js dynamic() — nhiều options hơn ═══
import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('./HeavyChart'), {
  loading: () => <p>Đang tải...</p>,  // fallback UI
  ssr: false  // KHÔNG render trên server (dùng cho window, canvas)
})

// ═══ 3. KHI NÀO DÙNG? ═══
// ✅ Component nặng (chart, editor, map) → giảm initial bundle
// ✅ Component ít user thấy (modal, tab ẩn) → load khi cần
// ✅ Component dùng browser API (window, canvas) → ssr: false
// ❌ Component nhẹ, luôn hiển thị → static import bình thường`}</CodeBlock>

                    <Callout type="tip">Interview: {`"Dynamic import = code splitting. Chia bundle thành chunks, load theo nhu cầu. React.lazy + Suspense xử lý loading UI. Next.js dynamic() thêm ssr: false cho client-only components."`}</Callout>
                </TopicModal>

                <TopicModal title="Type Coercion" emoji="🔀" color="#f97316" summary="== chỉ check giá trị (tự convert type), === check cả type VÀ giá trị — luôn dùng ===">
                    <Paragraph><InlineCode>==</InlineCode> và <InlineCode>===</InlineCode> khác nhau ở <Highlight>một bước duy nhất</Highlight>: có tự chuyển đổi kiểu dữ liệu hay không.</Paragraph>

                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">✅ === (Strict Equality) — So sánh THẬT</div>
                            <div className="text-slate-300 text-sm mt-1">
                                <strong>Bước 1:</strong> Kiểm tra type → khác type? → <strong>false ngay</strong>, không cần xét tiếp<br />
                                <strong>Bước 2:</strong> Cùng type → so sánh value<br /><br />
                                <InlineCode>1 === &quot;1&quot;</InlineCode> → number ≠ string → <strong>false ngay</strong> (không convert gì hết)<br />
                                <InlineCode>1 === 1</InlineCode> → number = number → so sánh value → <strong>true</strong>
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                            <div className="text-red-400 font-bold text-sm">⚠️ == (Loose Equality) — So sánh CÓ Convert</div>
                            <div className="text-slate-300 text-sm mt-1">
                                <strong>Bước 1:</strong> Kiểm tra type → cùng type? → so sánh bình thường<br />
                                <strong>Bước 2:</strong> Khác type? → <strong>TỰ ĐỘNG convert</strong> rồi mới so sánh<br /><br />
                                <InlineCode>1 == &quot;1&quot;</InlineCode> → number ≠ string → convert &quot;1&quot; → 1 → <InlineCode>1 == 1</InlineCode> → <strong>true</strong><br />
                                Vấn đề: bạn KHÔNG biết JS sẽ convert thế nào → <strong>bugs bất ngờ!</strong>
                            </div>
                        </div>
                    </div>

                    <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20 my-3">
                        <div className="text-orange-400 font-bold text-sm">🔄 == Convert như thế nào? (Đây là phần gây rối)</div>
                        <div className="text-slate-300 text-sm mt-2 space-y-1">
                            <div>① <strong>null == undefined</strong> → true (quy tắc đặc biệt, chỉ bằng nhau với nhau)</div>
                            <div>② <strong>number vs string</strong> → convert string → number: <InlineCode>&quot;5&quot; → 5</InlineCode></div>
                            <div>③ <strong>boolean vs bất kỳ</strong> → convert boolean → number trước: <InlineCode>true → 1, false → 0</InlineCode></div>
                            <div>④ <strong>object vs primitive</strong> → gọi .valueOf() hoặc .toString(): <InlineCode>[] → &quot;&quot; → 0</InlineCode></div>
                        </div>
                    </div>

                    <CodeBlock title="type-coercion.js">{`// ═══ === STRICT: Khác type = false NGAY ═══
1 === "1"      // false ← number ≠ string, dừng
0 === false    // false ← number ≠ boolean, dừng
"" === false   // false ← string ≠ boolean, dừng
null === undefined // false ← khác type!

// ═══ == LOOSE: Tự convert rồi mới so sánh ═══
1 == "1"       // true  ← "1" → 1, rồi 1 == 1 ✓

// ⚠️ Những case GÂY RỐI:
0 == false     // true  ← false → 0, rồi 0 == 0 ✓
"" == false    // true  ← false → 0, "" → 0, rồi 0 == 0 ✓
"" == 0        // true  ← "" → 0, rồi 0 == 0 ✓
[] == false    // true  ← [] → "" → 0, false → 0, rồi 0 == 0 ✓
[] == 0        // true  ← [] → "" → 0, rồi 0 == 0 ✓
"0" == false   // true  ← false → 0, "0" → 0, rồi 0 == 0 ✓

// 🤯 WTF cases:
[] == ![]      // true!! ← ![] = false → 0, [] → "" → 0
NaN == NaN     // false! ← NaN không bằng chính nó

// ═══ UNIQUE CASE: == hữu ích DUY NHẤT ═══
// Kiểm tra null HOẶC undefined cùng lúc
if (x == null) { /* x là null HOẶC undefined */ }
// tương đương:
if (x === null || x === undefined) { /* dài hơn */ }

// ═══ TRUTHY / FALSY ═══
// 6 giá trị FALSY (nhớ thuộc lòng):
// false, 0, "", null, undefined, NaN
// TẤT CẢ còn lại = TRUTHY (kể cả [], {}, "0", "false"!)`}</CodeBlock>

                    <div className="p-3 rounded-lg bg-gray-500/10 border border-gray-500/20 my-3">
                        <div className="text-gray-300 font-bold text-sm">📊 So sánh nhanh</div>
                        <div className="text-slate-300 text-sm mt-2">
                            <div className="overflow-x-auto">
                                <table className="w-full text-xs">
                                    <thead>
                                        <tr className="border-b border-white/10">
                                            <th className="text-left py-1.5 pr-2 text-slate-400 font-semibold">Expression</th>
                                            <th className="text-left py-1.5 pr-2 text-slate-400 font-semibold">==</th>
                                            <th className="text-left py-1.5 pr-2 text-slate-400 font-semibold">===</th>
                                            <th className="text-left py-1.5 text-slate-400 font-semibold">Vì sao?</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-slate-300">
                                        <tr className="border-b border-white/5"><td className="py-1.5 pr-2 font-mono">1 vs &quot;1&quot;</td><td className="py-1.5 pr-2 text-yellow-400">true</td><td className="py-1.5 pr-2 text-green-400">false</td><td className="py-1.5">== convert &quot;1&quot;→1</td></tr>
                                        <tr className="border-b border-white/5"><td className="py-1.5 pr-2 font-mono">0 vs false</td><td className="py-1.5 pr-2 text-yellow-400">true</td><td className="py-1.5 pr-2 text-green-400">false</td><td className="py-1.5">== convert false→0</td></tr>
                                        <tr className="border-b border-white/5"><td className="py-1.5 pr-2 font-mono">&quot;&quot; vs false</td><td className="py-1.5 pr-2 text-yellow-400">true</td><td className="py-1.5 pr-2 text-green-400">false</td><td className="py-1.5">== convert cả 2→0</td></tr>
                                        <tr className="border-b border-white/5"><td className="py-1.5 pr-2 font-mono">null vs undefined</td><td className="py-1.5 pr-2 text-yellow-400">true</td><td className="py-1.5 pr-2 text-green-400">false</td><td className="py-1.5">== quy tắc riêng</td></tr>
                                        <tr className="border-b border-white/5"><td className="py-1.5 pr-2 font-mono">[] vs false</td><td className="py-1.5 pr-2 text-yellow-400">true</td><td className="py-1.5 pr-2 text-green-400">false</td><td className="py-1.5">== convert []→&quot;&quot;→0</td></tr>
                                        <tr><td className="py-1.5 pr-2 font-mono">NaN vs NaN</td><td className="py-1.5 pr-2 text-red-400">false</td><td className="py-1.5 pr-2 text-red-400">false</td><td className="py-1.5">NaN ≠ chính nó!</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <Callout type="tip">Interview: {`"== chỉ so sánh giá trị — nó tự convert type trước khi so, dẫn đến bugs bất ngờ. === so sánh cả type VÀ giá trị — khác type là false ngay. Luôn dùng === trừ trường hợp x == null để check cả null lẫn undefined."`}</Callout>
                </TopicModal>

                <TopicModal title="for vs while — Khi nào dùng?" emoji="🔄" color="#10b981" summary="for = biết trước số lần lặp, while = lặp đến khi điều kiện sai — pattern quan trọng trong DSA">
                    <Paragraph><InlineCode>for</InlineCode> dùng khi <Highlight>biết trước</Highlight> số lần lặp. <InlineCode>while</InlineCode> dùng khi <Highlight>không biết trước</Highlight> khi nào dừng.</Paragraph>

                    <Heading3>for — Khi biết trước số lần lặp</Heading3>
                    <CodeBlock title="4 biến thể của for">{`// Duyệt mảng — biết rõ arr.length
for (let i = 0; i < arr.length; i++) { ... }

// Duyệt range cố định
for (let i = 0; i < n; i++) { ... }

// for...of — duyệt từng phần tử (Array, Map, Set, String)
for (const item of items) { ... }

// for...in — duyệt keys của object
for (const key in obj) { ... }`}</CodeBlock>

                    <Heading3>while — Khi không biết trước khi nào dừng</Heading3>
                    <CodeBlock title="5 use case phổ biến">{`// Two Pointers — dừng khi 2 con trỏ gặp nhau
while (left < right) { ... }

// BFS — dừng khi queue rỗng
while (queue.length > 0) { ... }

// Binary Search — dừng khi left vượt right
while (left <= right) { ... }

// Linked List — dừng khi hết node
while (node !== null) { ... }

// Regex match — dừng khi không còn match
while ((match = regex.exec(str)) !== null) { ... }`}</CodeBlock>

                    <Heading3>Cheat Sheet nhanh</Heading3>
                    <div className="my-3 overflow-x-auto">
                        <table className="w-full text-sm border-collapse">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="text-left p-3 text-slate-400 font-medium">Tình huống</th>
                                    <th className="text-left p-3 text-blue-400 font-medium">Dùng</th>
                                    <th className="text-left p-3 text-slate-400 font-medium">Lý do</th>
                                </tr>
                            </thead>
                            <tbody className="text-slate-300">
                                <tr className="border-b border-white/5"><td className="p-3">Duyệt mảng từ đầu đến cuối</td><td className="p-3"><InlineCode>for</InlineCode></td><td className="p-3">Biết trước length</td></tr>
                                <tr className="border-b border-white/5"><td className="p-3">Two Pointers</td><td className="p-3"><InlineCode>while</InlineCode></td><td className="p-3">Dừng khi left {'>'} = right</td></tr>
                                <tr className="border-b border-white/5"><td className="p-3">Sliding Window: right chạy</td><td className="p-3"><InlineCode>for</InlineCode></td><td className="p-3">right duyệt từ 0 → n</td></tr>
                                <tr className="border-b border-white/5"><td className="p-3">Sliding Window: left thu hẹp</td><td className="p-3"><InlineCode>while</InlineCode></td><td className="p-3">Không biết thu bao nhiêu</td></tr>
                                <tr className="border-b border-white/5"><td className="p-3">BFS / DFS iterative</td><td className="p-3"><InlineCode>while</InlineCode></td><td className="p-3">Không biết khi nào queue/stack rỗng</td></tr>
                                <tr className="border-b border-white/5"><td className="p-3">Binary Search</td><td className="p-3"><InlineCode>while</InlineCode></td><td className="p-3">Không biết bao nhiêu bước chia đôi</td></tr>
                                <tr><td className="p-3">Đọc file / stream</td><td className="p-3"><InlineCode>while</InlineCode></td><td className="p-3">Không biết khi nào hết data</td></tr>
                            </tbody>
                        </table>
                    </div>

                    <Heading3>Trong LeetCode patterns</Heading3>
                    <CodeBlock title="Kết hợp for + while">{`// Sliding Window = for + while lồng nhau!
for (let right = 0; right < arr.length; right++) {  // for: mở rộng (biết trước n bước)
    while (/* invalid */) {                           // while: thu hẹp (không biết trước)
        left++
    }
}

// Monotonic Stack = for + while
for (let i = 0; i < arr.length; i++) {               // for: duyệt mảng
    while (stack.length && arr[stack.at(-1)] < arr[i]) { // while: pop cho đến khi hợp lệ
        stack.pop()
    }
}`}</CodeBlock>
                    <Callout type="tip"><strong>Tóm lại:</strong> <InlineCode>for</InlineCode> = &quot;duyệt qua N phần tử&quot;, <InlineCode>while</InlineCode> = &quot;lặp cho đến khi điều kiện sai&quot;. Khi kết hợp cả hai (Sliding Window, Monotonic Stack), <InlineCode>for</InlineCode> quản lý vòng ngoài, <InlineCode>while</InlineCode> xử lý logic bên trong không biết trước số bước! 🎯</Callout>
                </TopicModal>

                <TopicModal title="Kiểu dữ liệu JS" emoji="📦" color="#06b6d4" summary="7 primitive + 1 reference — typeof, truthy/falsy, pass by value vs reference">
                    <Paragraph>JavaScript có <Highlight>7 kiểu nguyên thủy</Highlight> (primitive) và <Highlight>1 kiểu tham chiếu</Highlight> (reference).</Paragraph>
                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">Primitive (lưu giá trị, so sánh bằng giá trị)</div>
                            <div className="text-slate-300 text-sm mt-1"><InlineCode>string</InlineCode>, <InlineCode>number</InlineCode>, <InlineCode>boolean</InlineCode>, <InlineCode>null</InlineCode>, <InlineCode>undefined</InlineCode>, <InlineCode>symbol</InlineCode>, <InlineCode>bigint</InlineCode></div>
                        </div>
                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <div className="text-purple-400 font-bold text-sm">Reference (lưu con trỏ, so sánh bằng reference)</div>
                            <div className="text-slate-300 text-sm mt-1"><InlineCode>object</InlineCode> — bao gồm: Object, Array, Function, Date, Map, Set, RegExp...</div>
                        </div>
                    </div>
                    <CodeBlock title="typeof gotchas">{`typeof 'hello'     // 'string'
typeof 42          // 'number'
typeof true        // 'boolean'
typeof undefined   // 'undefined'
typeof null        // 'object' ← BUG lịch sử của JS!
typeof []          // 'object' ← Array cũng là object
typeof {}          // 'object'
typeof function(){} // 'function' ← trường hợp đặc biệt

// Cách kiểm tra chính xác:
Array.isArray([])           // true
obj === null                // kiểm tra null
obj instanceof Date         // kiểm tra Date
Object.prototype.toString.call(obj) // "[object Array]"`}</CodeBlock>
                    <CodeBlock title="Pass by value vs reference">{`// Primitive → copy giá trị
let a = 5
let b = a
b = 10
console.log(a) // 5 — không bị ảnh hưởng!

// Reference → copy con trỏ (cùng trỏ đến 1 object)
let obj1 = { name: 'Khương' }
let obj2 = obj1
obj2.name = 'Changed'
console.log(obj1.name) // 'Changed' — bị ảnh hưởng!

// Fix: shallow copy
let obj3 = { ...obj1 }  // spread operator
let obj4 = Object.assign({}, obj1)`}</CodeBlock>
                    <Callout type="tip">Interview tip: Giải thích được <Highlight>typeof null === &apos;object&apos;</Highlight> là bug lịch sử, và sự khác biệt giữa <InlineCode>==</InlineCode> vs <InlineCode>===</InlineCode> khi so sánh types sẽ ghi điểm lớn.</Callout>
                    <a href="/blogs/data-types-structures" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 Xem bài viết chi tiết →</a>
                </TopicModal>

                <TopicModal title="Strict Mode" emoji="🔒" color="#ef4444" summary={`"use strict" — chế độ nghiêm ngặt giúp bắt lỗi sớm, code an toàn hơn`}>
                    <Paragraph><InlineCode>{`"use strict"`}</InlineCode> kích hoạt chế độ thực thi nghiêm ngặt hơn, được giới thiệu từ <Highlight>ES5</Highlight>. Giúp bắt lỗi sớm và ngăn chặn các hành vi nguy hiểm.</Paragraph>
                    <CodeBlock title="Cách kích hoạt">{`"use strict"; // Đầu file → áp dụng toàn bộ file

function myFunc() {
  "use strict"; // Hoặc chỉ trong 1 function
}

// ⚡ ES Modules (import/export) và class
// tự động chạy strict mode — không cần khai báo!`}</CodeBlock>
                    <div className="my-3 overflow-x-auto">
                        <table className="w-full text-sm border-collapse">
                            <thead><tr className="border-b border-[var(--border-primary)]"><th className="text-left p-2 text-slate-400">Hành vi</th><th className="text-left p-2 text-red-400">Không strict</th><th className="text-left p-2 text-green-400">Strict mode</th></tr></thead>
                            <tbody className="text-[var(--text-secondary)]">
                                <tr className="border-b border-gray-100"><td className="p-2">Biến chưa khai báo</td><td className="p-2">Tự tạo global 😱</td><td className="p-2">❌ ReferenceError</td></tr>
                                <tr className="border-b border-gray-100"><td className="p-2">Gán vào read-only property</td><td className="p-2">Im lặng, bỏ qua</td><td className="p-2">❌ TypeError</td></tr>
                                <tr className="border-b border-gray-100"><td className="p-2">Duplicate params</td><td className="p-2">Cho phép</td><td className="p-2">❌ SyntaxError</td></tr>
                                <tr className="border-b border-gray-100"><td className="p-2"><InlineCode>this</InlineCode> trong function</td><td className="p-2">window</td><td className="p-2">undefined</td></tr>
                                <tr><td className="p-2">Dùng <InlineCode>with</InlineCode></td><td className="p-2">Cho phép</td><td className="p-2">❌ SyntaxError</td></tr>
                            </tbody>
                        </table>
                    </div>
                    <CodeBlock title="Ví dụ">{`"use strict";

x = 10; // ❌ ReferenceError — phải dùng let/const/var

function sum(a, a, b) {} // ❌ SyntaxError — duplicate params

function showThis() {
  console.log(this); // undefined (không strict → window)
}
showThis();

const obj = {};
Object.defineProperty(obj, "name", { value: "K", writable: false });
obj.name = "X"; // ❌ TypeError — read-only`}</CodeBlock>
                    <Callout type="tip">Trong dự án React/Next.js hiện đại, code đã chạy <Highlight>strict mode sẵn</Highlight> vì dùng ES Modules. Nhưng hiểu strict mode vẫn rất quan trọng cho phỏng vấn!</Callout>
                </TopicModal>

                <TopicModal title="DOM Manipulation & Event Delegation" emoji="🌐" color="#f97316" summary="querySelector, event bubbling/capturing, delegation — nền tảng để hiểu React">
                    <Paragraph>Hiểu <Highlight>DOM API gốc</Highlight> giúp bạn hiểu React hoạt động thế nào bên dưới — câu hỏi phổ biến ở mọi level.</Paragraph>
                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                            <div className="text-orange-400 font-bold text-sm">🔍 DOM Selection</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <InlineCode>getElementById</InlineCode> — nhanh nhất, 1 element<br />
                                • <InlineCode>querySelector / querySelectorAll</InlineCode> — CSS selector, flexible<br />
                                • <InlineCode>getElementsByClassName</InlineCode> — trả về <strong>live HTMLCollection</strong> (auto-update)<br />
                                • <InlineCode>querySelectorAll</InlineCode> trả về <strong>static NodeList</strong> (snapshot)
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">🫧 Event Bubbling vs Capturing</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Capturing</strong> (top → down): window → document → html → body → target<br />
                                • <strong>Bubbling</strong> (bottom → up): target → parent → ... → body → html → document<br />
                                • Default: bubbling. Capture: <InlineCode>addEventListener(event, fn, true)</InlineCode><br />
                                • <InlineCode>e.stopPropagation()</InlineCode> — dừng bubble/capture<br />
                                • <InlineCode>e.preventDefault()</InlineCode> — ngăn default action (form submit, link navigate)
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">🎯 Event Delegation</div>
                            <div className="text-slate-300 text-sm mt-1">
                                Thay vì gắn listener cho <strong>mỗi child</strong>, gắn 1 listener cho <strong>parent</strong>:<br />
                                • Performance: 1 listener thay vì 1000 (list items)<br />
                                • Dynamic elements: elements thêm sau vẫn được handle<br />
                                • Dùng <InlineCode>e.target</InlineCode> để biết element nào triggered event<br />
                                • React dùng delegation ở root — đó là <strong>Synthetic Events</strong>
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <div className="text-purple-400 font-bold text-sm">🔧 DOM Manipulation</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <InlineCode>createElement + appendChild</InlineCode> — tạo và thêm element<br />
                                • <InlineCode>insertAdjacentHTML</InlineCode> — nhanh hơn innerHTML, vị trí cụ thể<br />
                                • <InlineCode>DocumentFragment</InlineCode> — batch DOM updates (tránh reflow)<br />
                                • <InlineCode>cloneNode(true)</InlineCode> — deep clone DOM subtree<br />
                                • <InlineCode>dataset</InlineCode> — đọc/ghi data-* attributes
                            </div>
                        </div>
                    </div>
                    <CodeBlock title="event-delegation.js">{`// ❌ Bad: 1000 listeners
document.querySelectorAll('li').forEach(li => {
  li.addEventListener('click', () => handleClick(li.dataset.id))
})

// ✅ Good: Event Delegation — 1 listener
document.querySelector('ul').addEventListener('click', (e) => {
  const li = e.target.closest('li') // find parent li
  if (!li) return                    // clicked outside li
  handleClick(li.dataset.id)
})

// DocumentFragment — batch DOM updates
const fragment = document.createDocumentFragment()
items.forEach(item => {
  const li = document.createElement('li')
  li.textContent = item.name
  fragment.appendChild(li) // NO reflow yet
})
list.appendChild(fragment) // 1 reflow only!`}</CodeBlock>
                    <Callout type="tip">Interview: {'"Build a todo list without React"'} — phải dùng event delegation + DocumentFragment. Biết giải thích <Highlight>tại sao React dùng Synthetic Events</Highlight> → điểm cộng lớn.</Callout>
                </TopicModal>

                <TopicModal title="Web APIs — Observer Pattern" emoji="👁️" color="#06b6d4" summary="IntersectionObserver, MutationObserver, ResizeObserver — API hiệu năng cao thay thế event cũ">
                    <Paragraph>Modern Web APIs dùng <Highlight>Observer pattern</Highlight> thay vì polling/event cũ — quan trọng cho performance vì chạy ở <Highlight>browser level</Highlight> (off main thread).</Paragraph>
                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                            <div className="text-cyan-400 font-bold text-sm">📐 IntersectionObserver</div>
                            <div className="text-slate-300 text-sm mt-1">
                                Phát hiện khi element xuất hiện/biến mất trong viewport (không cần scroll event!).<br />
                                • <strong>Lazy loading</strong> ảnh: chỉ load khi scroll đến gần<br />
                                • <strong>Infinite scroll</strong>: load thêm data khi sentinel element visible<br />
                                • <strong>Analytics</strong>: track impressions (quảng cáo, product card)<br />
                                • <strong>Animation</strong>: trigger animation khi scroll vào vùng nhìn thấy
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <div className="text-purple-400 font-bold text-sm">🔬 MutationObserver</div>
                            <div className="text-slate-300 text-sm mt-1">
                                Theo dõi thay đổi DOM (attributes, children, text content).<br />
                                • Phát hiện DOM bị thay đổi bởi third-party scripts (Analytics, AB test)<br />
                                • Tự xử lý elements được thêm động (chat widget, notification)<br />
                                • Xây dựng custom element behaviors (auto-format input, syntax highlight)
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">📏 ResizeObserver</div>
                            <div className="text-slate-300 text-sm mt-1">
                                Phát hiện khi kích thước element thay đổi (không cần window resize event!).<br />
                                • Responsive component theo <strong>kích thước element</strong> (không phải viewport)<br />
                                • Tự điều chỉnh layout khi sidebar mở/đóng<br />
                                • Auto-resize textarea, chart, canvas khi container thay đổi
                            </div>
                        </div>
                    </div>

                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 my-3">
                        <div className="text-red-400 font-bold text-sm">⚡ Tại sao KHÔNG dùng scroll event + getBoundingClientRect?</div>
                        <div className="text-slate-300 text-sm mt-2 space-y-1">
                            <div>❌ <strong>scroll event</strong> fire <strong>hàng trăm lần/giây</strong> khi user scroll → callback chạy liên tục trên main thread</div>
                            <div>❌ <strong>getBoundingClientRect()</strong> gọi mỗi lần scroll → browser phải <strong>tính toán layout (reflow)</strong> → chặn main thread</div>
                            <div>❌ Kết hợp cả 2 = <strong>scroll jank</strong>: mỗi frame browser phải: fire event → chạy JS callback → tính layout → paint</div>
                            <div className="pt-2 border-t border-white/5">
                                ✅ <strong>IntersectionObserver</strong> chạy ở <strong>browser native level</strong> — browser tự tính toán asynchronously, KHÔNG block main thread, chỉ gọi callback khi element thật sự vào/ra viewport.
                            </div>
                        </div>
                    </div>

                    <CodeBlock title="intersection-observer.ts">{`// ═══ IntersectionObserver — Lazy loading + Infinite scroll ═══
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target as HTMLImageElement
      img.src = img.dataset.src!  // load ảnh thật
      observer.unobserve(img)     // dừng theo dõi
    }
  })
}, { threshold: 0.1, rootMargin: '200px' }) // preload 200px trước khi visible

document.querySelectorAll('img[data-src]').forEach(img => observer.observe(img))

// React hook: useIntersectionObserver
function useIntersectionObserver(ref, options) {
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting)
    }, options)
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref, options])
  return isVisible
}`}</CodeBlock>

                    <CodeBlock title="mutation-observer.ts">{`// ═══ MutationObserver — Theo dõi DOM thay đổi ═══
const observer = new MutationObserver((mutations) => {
  mutations.forEach(mutation => {
    // Phát hiện node mới được thêm vào DOM
    mutation.addedNodes.forEach(node => {
      if (node instanceof HTMLElement && node.matches('.ad-banner')) {
        node.remove() // Xóa quảng cáo inject bởi third-party!
      }
    })

    // Phát hiện attribute thay đổi
    if (mutation.type === 'attributes') {
      console.log(\`\${mutation.attributeName} changed!\`)
    }
  })
})

// Bắt đầu theo dõi
observer.observe(document.body, {
  childList: true,   // theo dõi thêm/xóa child nodes
  subtree: true,     // theo dõi toàn bộ descendants
  attributes: true,  // theo dõi attributes thay đổi
})

// Dừng khi không cần nữa
observer.disconnect()`}</CodeBlock>

                    <CodeBlock title="resize-observer.ts">{`// ═══ ResizeObserver — Theo dõi kích thước element ═══
const observer = new ResizeObserver((entries) => {
  entries.forEach(entry => {
    const { width, height } = entry.contentRect

    // Responsive component KHÔNG cần media query
    if (width < 400) {
      entry.target.classList.add('compact')
    } else {
      entry.target.classList.remove('compact')
    }

    // Auto-resize chart/canvas khi container thay đổi
    console.log(\`Element resized: \${width}x\${height}\`)
  })
})

// Theo dõi sidebar container → chart tự resize
observer.observe(document.querySelector('.chart-container')!)

// React hook: useResizeObserver
function useResizeObserver(ref) {
  const [size, setSize] = useState({ width: 0, height: 0 })
  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      setSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      })
    })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref])
  return size
}`}</CodeBlock>

                    <CodeBlock title="so-sanh-performance.ts">{`// ═══ ❌ CÁCH CŨ: scroll event + getBoundingClientRect ═══
// Vấn đề: scroll fire ~100 lần/giây, mỗi lần gọi
// getBoundingClientRect → bắt browser tính layout (reflow)
window.addEventListener('scroll', () => {
  // 🐌 Chạy 100 lần/giây trên MAIN THREAD!
  const rect = element.getBoundingClientRect()
  // ⚠️ getBoundingClientRect() gây FORCED REFLOW
  // → browser phải tính lại layout ĐỒNG BỘ
  if (rect.top < window.innerHeight) {
    loadImage(element) // lazy load
  }
})

// ═══ ✅ CÁCH MỚI: IntersectionObserver ═══
// Browser tự tính toán ASYNCHRONOUSLY, off main thread
const observer = new IntersectionObserver(([entry]) => {
  // 🚀 Chỉ gọi 1 LẦN khi element vào/ra viewport
  if (entry.isIntersecting) loadImage(entry.target)
})
observer.observe(element)

// ═══ TẠI SAO KÉM? ═══
// scroll + getBoundingClientRect:
// Frame 1: scroll → JS callback → reflow → paint
// Frame 2: scroll → JS callback → reflow → paint
// Frame 3: scroll → JS callback → reflow → paint
// → Main thread bận liên tục → UI jank, drop frames!
//
// IntersectionObserver:
// Frame 1-100: browser tự track (off main thread)
// Frame 101: "Element visible!" → callback 1 lần
// → Main thread rảnh → smooth 60fps!`}</CodeBlock>
                    <Callout type="tip">Interview: {'"Build infinite scroll"'} hoặc {'"Build lazy loading images"'} — dùng IntersectionObserver, <Highlight>không dùng scroll event + getBoundingClientRect</Highlight>. Scroll event fire hàng trăm lần/giây + getBoundingClientRect gây forced reflow = jank. Observer chạy ở browser level, async, off main thread.</Callout>
                </TopicModal>

                <TopicModal title="Generators & Iterators" emoji="🔁" color="#a78bfa" summary="function*, yield, Symbol.iterator — lazy evaluation và custom iteration">
                    <Paragraph><Highlight>Generators</Highlight> = function có thể pause/resume. Ít dùng trực tiếp nhưng nền tảng của async/await và Redux-Saga.</Paragraph>
                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <div className="text-purple-400 font-bold text-sm">🔄 Iterator Protocol</div>
                            <div className="text-slate-300 text-sm mt-1">
                                Object có method <InlineCode>next()</InlineCode> trả về <InlineCode>{'{value, done}'}</InlineCode>.<br />
                                • for...of loop dùng iterator protocol bên dưới<br />
                                • Array, Map, Set, String đều implement <InlineCode>Symbol.iterator</InlineCode><br />
                                • Custom iterable: implement <InlineCode>[Symbol.iterator]()</InlineCode>
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">⏸️ Generator Function</div>
                            <div className="text-slate-300 text-sm mt-1">
                                <InlineCode>function*</InlineCode> + <InlineCode>yield</InlineCode> — pause execution, return value, resume later.<br />
                                • <strong>Lazy evaluation</strong>: chỉ compute khi cần<br />
                                • <strong>Infinite sequences</strong>: generate values on-demand<br />
                                • <strong>async/await</strong> chính là syntactic sugar của generators
                            </div>
                        </div>
                    </div>
                    <CodeBlock title="generators.ts">{`// Generator function
function* fibonacci() {
  let [a, b] = [0, 1]
  while (true) {
    yield a         // pause here, return a
    ;[a, b] = [b, a + b]
  }
}
const fib = fibonacci()
fib.next() // { value: 0, done: false }
fib.next() // { value: 1, done: false }
fib.next() // { value: 1, done: false }
fib.next() // { value: 2, done: false }

// Practical: Paginated API fetch
async function* fetchPages(url) {
  let page = 1
  while (true) {
    const res = await fetch(\`\${url}?page=\${page}\`)
    const data = await res.json()
    if (data.items.length === 0) return // done
    yield data.items
    page++
  }
}
// Usage: for await (const items of fetchPages('/api/users')) { ... }

// Custom iterable
class Range {
  constructor(private start: number, private end: number) {}
  *[Symbol.iterator]() {
    for (let i = this.start; i <= this.end; i++) yield i
  }
}
for (const n of new Range(1, 5)) console.log(n) // 1, 2, 3, 4, 5`}</CodeBlock>

                    <Heading3>🔗 async/await = Generator + Promise (auto-runner)</Heading3>
                    <Paragraph>Bản chất <InlineCode>async/await</InlineCode> là <Highlight>syntactic sugar</Highlight> của generator. JS engine tự bọc code vào generator + viết auto-runner cho bạn.</Paragraph>

                    <CodeBlock title="async-await-vs-generator.ts">{`// ═══ 1. VIẾT BẰNG async/await (cách hiện đại) ═══
async function fetchUser() {
  const res = await fetch('/api/user')  // ⏸️ pause tại đây
  const user = await res.json()         // ⏸️ pause tại đây
  return user
}

// ═══ 2. TƯƠNG ĐƯƠNG viết bằng Generator ═══
function* fetchUserGen() {
  const res = yield fetch('/api/user')  // yield = await
  const user = yield res.json()         // yield = await
  return user
}

// ═══ 3. CẦN "auto-runner" để chạy generator ═══
function run(generatorFn) {
  const gen = generatorFn()

  function step(value) {
    const result = gen.next(value)      // chạy đến yield tiếp
    if (result.done) return result.value // xong!

    // result.value là Promise → đợi resolve → gọi step tiếp
    return Promise.resolve(result.value)
      .then(resolved => step(resolved)) // truyền kết quả vào yield
  }

  return step()
}

run(fetchUserGen).then(user => console.log(user))

// ═══ TÓM LẠI ═══
// async function  →  function*
// await promise   →  yield promise
// JS engine       →  auto-runner (tự viết ở trên)
//
// Khi gặp await:
// 1. yield promise ra ngoài
// 2. JS engine đợi promise resolve
// 3. .next(result) truyền giá trị vào lại
// 4. Code tiếp tục chạy từ chỗ await`}</CodeBlock>

                    <div className="my-3 overflow-x-auto">
                        <table className="w-full text-sm border-collapse">
                            <thead><tr className="border-b border-white/10"><th className="text-left p-2 text-slate-400">&#160;</th><th className="text-left p-2 text-purple-400">Generator</th><th className="text-left p-2 text-cyan-400">async/await</th></tr></thead>
                            <tbody className="text-slate-300">
                                <tr className="border-b border-white/5"><td className="p-2 font-medium">Pause</td><td className="p-2"><InlineCode>yield</InlineCode></td><td className="p-2"><InlineCode>await</InlineCode></td></tr>
                                <tr className="border-b border-white/5"><td className="p-2 font-medium">Resume</td><td className="p-2"><InlineCode>.next(value)</InlineCode></td><td className="p-2">JS engine tự gọi</td></tr>
                                <tr className="border-b border-white/5"><td className="p-2 font-medium">Trả về</td><td className="p-2">Iterator</td><td className="p-2">Promise</td></tr>
                                <tr><td className="p-2 font-medium">Auto-run</td><td className="p-2">❌ Phải viết thủ công</td><td className="p-2">✅ JS engine lo</td></tr>
                            </tbody>
                        </table>
                    </div>

                    <Callout type="tip">Interview: {'"How does async/await work under the hood?"'} → <Highlight>async/await = generator + Promise auto-runner</Highlight>. Khi gặp <InlineCode>await</InlineCode>, engine <InlineCode>yield</InlineCode> promise ra ngoài, đợi resolve, rồi <InlineCode>.next(result)</InlineCode> truyền giá trị vào lại. Trả lời được = senior level answer. 🎯</Callout>
                </TopicModal>

                <TopicModal title="Error Handling Patterns" emoji="🚨" color="#ef4444" summary="try/catch, custom errors, error boundaries, global handlers — production-ready error handling">
                    <Paragraph>Production code <Highlight>phải handle errors gracefully</Highlight> — crash = mất user. Interview hay hỏi các patterns xử lý lỗi.</Paragraph>
                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                            <div className="text-red-400 font-bold text-sm">🎯 Error Types</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>SyntaxError</strong>: code sai cú pháp (parse time)<br />
                                • <strong>ReferenceError</strong>: variable chưa khai báo<br />
                                • <strong>TypeError</strong>: gọi method trên null/undefined<br />
                                • <strong>RangeError</strong>: value ngoài range cho phép<br />
                                • <strong>Custom Error</strong>: extend Error class cho business logic
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                            <div className="text-yellow-400 font-bold text-sm">🔄 Async Error Handling</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>try/catch</strong>: wrap async/await<br />
                                • <strong>.catch()</strong>: chain on promises<br />
                                • <strong>Promise.allSettled()</strong>: không fail khi 1 promise reject<br />
                                • ⚠️ <strong>Unhandled rejection</strong>: process crash (Node.js)!
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">⚛️ React Error Handling</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Error Boundary</strong>: catch render errors (class component only)<br />
                                • <strong>Suspense</strong>: loading states cho async components<br />
                                • <strong>react-error-boundary</strong>: HOC/hook API cho error boundaries<br />
                                • ⚠️ Error Boundary <strong>không catch</strong>: event handlers, async code, SSR
                            </div>
                        </div>
                    </div>
                    <CodeBlock title="error-handling.ts">{`// Custom Error class
class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

// Pattern: Result type (no try/catch needed)
type Result<T> = { ok: true; data: T } | { ok: false; error: Error }

async function safeFetch<T>(url: string): Promise<Result<T>> {
  try {
    const res = await fetch(url)
    if (!res.ok) throw new ApiError(res.status, res.statusText)
    return { ok: true, data: await res.json() }
  } catch (error) {
    return { ok: false, error: error as Error }
  }
}

// Usage — no try/catch needed
const result = await safeFetch<User[]>('/api/users')
if (result.ok) {
  console.log(result.data) // TypeScript knows it's User[]
} else {
  console.error(result.error.message)
}

// Global error handlers
window.addEventListener('error', (e) => {
  reportToSentry(e.error)       // JS errors
})
window.addEventListener('unhandledrejection', (e) => {
  reportToSentry(e.reason)      // Unhandled promise rejections
})`}</CodeBlock>
                    <Callout type="tip">Interview: nhắc đến <Highlight>Result type pattern</Highlight> (Go/Rust style) thay vì try/catch everywhere → shows engineering maturity. Biết Error Boundary limitations → senior level.</Callout>
                </TopicModal>

                <TopicModal title="Web Workers & Service Workers" emoji="⚙️" color="#10b981" summary="Multi-threading trong browser, offline capability, background sync">
                    <Paragraph>Browser chạy JS trên <Highlight>main thread</Highlight> — heavy computation block UI. Web Workers giải quyết vấn đề này.</Paragraph>
                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">🧵 Web Workers</div>
                            <div className="text-slate-300 text-sm mt-1">
                                Run JS trong <strong>background thread</strong> — không block UI.<br />
                                • Communicate via <InlineCode>postMessage()</InlineCode> (structured clone)<br />
                                • <strong>Không access</strong>: DOM, window, document<br />
                                • Use cases: image processing, crypto, parsing large JSON/CSV<br />
                                • <strong>SharedWorker</strong>: share 1 worker between tabs
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">📡 Service Workers</div>
                            <div className="text-slate-300 text-sm mt-1">
                                Proxy giữa browser và network — <strong>offline capability</strong>.<br />
                                • <strong>Cache API</strong>: cache responses cho offline access<br />
                                • <strong>Push notifications</strong>: receive messages khi app closed<br />
                                • <strong>Background sync</strong>: retry failed requests khi online lại<br />
                                • PWA (Progressive Web App) yêu cầu service worker
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <div className="text-purple-400 font-bold text-sm">🆕 Các Web APIs quan trọng khác</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>requestAnimationFrame</strong>: smooth 60fps animations (thay vì setInterval)<br />
                                • <strong>requestIdleCallback</strong>: defer non-critical work khi main thread free<br />
                                • <strong>AbortController</strong>: cancel fetch requests (race conditions)<br />
                                • <strong>Broadcast Channel</strong>: communicate giữa tabs/windows
                            </div>
                        </div>
                    </div>
                    <CodeBlock title="web-workers.ts">{`// Web Worker — heavy computation off main thread
// worker.ts
self.onmessage = (e: MessageEvent) => {
  const { data } = e
  // Heavy computation here (doesn't block UI!)
  const result = data.sort((a, b) => a - b) // sort 1M items
  self.postMessage(result)
}

// main.ts
const worker = new Worker(new URL('./worker.ts', import.meta.url))
worker.postMessage(hugeArray)
worker.onmessage = (e) => {
  console.log('Sorted:', e.data) // received from worker
}

// AbortController — cancel fetch (prevent race conditions)
const controller = new AbortController()
fetch('/api/search?q=hello', { signal: controller.signal })
  .then(res => res.json())
  .then(data => setResults(data))
  .catch(err => {
    if (err.name === 'AbortError') return // cancelled, ignore
    throw err
  })
// Later: cancel the request
controller.abort()

// requestAnimationFrame — smooth animations
function animate() {
  element.style.transform = \`translateX(\${x}px)\`
  x += 2
  if (x < 500) requestAnimationFrame(animate) // next frame
}
requestAnimationFrame(animate) // 60fps!`}</CodeBlock>
                    <Callout type="tip">Interview: {'"The page is janky when sorting a large list"'} → <Highlight>Web Worker</Highlight> cho sort. {'"Cancel previous search request khi user type tiếp"'} → AbortController.</Callout>
                </TopicModal>

                <TopicModal title="WeakMap, WeakRef & FinalizationRegistry" emoji="🧹" color="#8b5cf6" summary="Memory management, garbage collection awareness — senior-level interview topic">
                    <Paragraph><Highlight>WeakMap/WeakRef</Highlight> cho phép reference object mà không ngăn garbage collection — quan trọng cho memory management.</Paragraph>
                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <div className="text-purple-400 font-bold text-sm">🗺️ WeakMap vs Map</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Map</strong>: keys có thể là bất kỳ type. <strong>Giữ reference</strong> → prevents GC<br />
                                • <strong>WeakMap</strong>: keys <strong>phải là object</strong>. Weak reference → <strong>cho phép GC</strong><br />
                                • WeakMap <strong>không iterable</strong> (no size, no forEach, no keys/values)<br />
                                • Use case: cache metadata cho DOM elements, private data cho classes
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">👻 WeakRef & FinalizationRegistry</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>WeakRef</strong>: tham chiếu yếu — <InlineCode>ref.deref()</InlineCode> có thể trả về undefined<br />
                                • <strong>FinalizationRegistry</strong>: callback khi object bị GC<br />
                                • Use case: cache expensive objects mà không leak memory<br />
                                • ⚠️ Rất ít khi dùng trực tiếp — nhưng hiểu = senior mindset
                            </div>
                        </div>
                    </div>
                    <CodeBlock title="weak-references.ts">{`// WeakMap — private data for classes
const privateData = new WeakMap()
class User {
  constructor(name: string, ssn: string) {
    this.name = name
    privateData.set(this, { ssn }) // truly private!
  }
  name: string
  getSSN() { return privateData.get(this)?.ssn }
}
// When user is GC'd, privateData entry is also GC'd

// WeakMap — cache DOM element metadata
const elementCache = new WeakMap<HTMLElement, object>()
function getMetadata(el: HTMLElement) {
  if (!elementCache.has(el)) {
    elementCache.set(el, computeExpensiveMetadata(el))
  }
  return elementCache.get(el)!
  // When element is removed from DOM & GC'd → cache auto-cleaned!
}

// WeakRef — optional cache
class Cache<T> {
  private cache = new Map<string, WeakRef<T & object>>()
  set(key: string, value: T & object) {
    this.cache.set(key, new WeakRef(value))
  }
  get(key: string): T | undefined {
    return this.cache.get(key)?.deref() // might be GC'd!
  }
}`}</CodeBlock>
                    <Callout type="tip">Interview: Khi được hỏi về <Highlight>memory leaks</Highlight> → nhắc tới WeakMap/WeakRef. Biết giải thích tại sao Map giữ reference ngăn GC → senior level answer.</Callout>
                </TopicModal>
            </div>

            <Heading3>2.2 Implement từ scratch (click xem code mẫu)</Heading3>
            <a href="/blogs/js-common-functions" target="_blank" rel="noopener noreferrer" className="mb-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 Xem tổng hợp JS Common Functions →</a>
            <div className="my-4 space-y-2">
                <TopicModal title="Array.map / filter / reduce" emoji="💻" color="#fbbf24" summary="Implement lại 3 higher-order functions phổ biến nhất của Array">
                    <Heading3>📖 Cách dùng</Heading3>
                    <CodeBlock title="map / filter / reduce — cách dùng thực tế">{`// map: biến đổi từng phần tử → mảng mới cùng độ dài
const prices = [100, 200, 300]
const withTax = prices.map(p => p * 1.1)  // [110, 220, 330]

// filter: lọc phần tử theo điều kiện → mảng ngắn hơn
const expensive = prices.filter(p => p > 150)  // [200, 300]

// reduce: gom tất cả → 1 giá trị duy nhất
const total = prices.reduce((sum, p) => sum + p, 0)  // 600

// 🔗 Combo đỉnh: filter → map → reduce
const result = products
    .filter(p => p.inStock)       // lọc hàng còn
    .map(p => p.price * p.qty)    // tính tiền từng món
    .reduce((sum, x) => sum + x, 0) // tổng tiền`}</CodeBlock>

                    <Heading3>🔧 Cách build (Implement lại)</Heading3>
                    <CodeBlock title="myMap">{`Array.prototype.myMap = function(callback) {
    const result = [];
    for (let i = 0; i < this.length; i++) {
        result.push(callback(this[i], i, this));
    }
    return result;
};
// [1,2,3].myMap(x => x * 2) → [2,4,6]`}</CodeBlock>
                    <CodeBlock title="myFilter">{`Array.prototype.myFilter = function(callback) {
    const result = [];
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) {
            result.push(this[i]);
        }
    }
    return result;
};`}</CodeBlock>
                    <CodeBlock title="myReduce">{`Array.prototype.myReduce = function(callback, initialValue) {
    let acc = initialValue !== undefined ? initialValue : this[0];
    const startIdx = initialValue !== undefined ? 0 : 1;
    for (let i = startIdx; i < this.length; i++) {
        acc = callback(acc, this[i], i, this);
    }
    return acc;
};
// [1,2,3].myReduce((sum, x) => sum + x, 0) → 6`}</CodeBlock>
                    <Callout type="tip">Nhớ xử lý edge case: <InlineCode>reduce</InlineCode> không có initialValue thì dùng <InlineCode>this[0]</InlineCode> và bắt đầu từ index 1.</Callout>

                    <Heading3>🏭 Mẹo nhớ reduce: Máy ép trái cây</Heading3>
                    <Paragraph>Tưởng tượng <Highlight>reduce = máy ép trái cây</Highlight>: 🍊🍊🍊 → 🧃</Paragraph>
                    <Paragraph><InlineCode>[🍊, 🍊, 🍊, 🍊] → reduce → 🧃 (1 ly nước ép)</InlineCode></Paragraph>

                    <div className="my-4 overflow-x-auto">
                        <table className="w-full text-sm border-collapse">
                            <thead><tr className="border-b border-[var(--border-primary)] text-left">
                                <th className="p-2 text-[#fbbf24] font-bold">ACIV</th><th className="p-2">Là gì</th><th className="p-2">Hình ảnh</th>
                            </tr></thead>
                            <tbody>
                                <tr className="border-b border-gray-100"><td className="p-2 font-bold">A — Accumulator</td><td className="p-2">Bình chứa (kết quả tích lũy)</td><td className="p-2">🧃 Ly nước đang đổ dần</td></tr>
                                <tr className="border-b border-gray-100"><td className="p-2 font-bold">C — Current Item</td><td className="p-2">Trái cây đang ép</td><td className="p-2">🍊 Quả cam hiện tại</td></tr>
                                <tr className="border-b border-gray-100"><td className="p-2 font-bold">I — Initial Value</td><td className="p-2">Ly ban đầu (rỗng hoặc có sẵn)</td><td className="p-2">🥤 Ly rỗng</td></tr>
                                <tr><td className="p-2 font-bold">V — (return) Value</td><td className="p-2">Kết quả trả về = accumulator mới</td><td className="p-2">🧃 Ly sau khi thêm nước</td></tr>
                            </tbody>
                        </table>
                    </div>

                    <CodeBlock title="Ví dụ từ dễ → khó">{`// 1️⃣ Tổng — ly nước tăng dần
[1, 2, 3, 4].reduce((ly, cam) => ly + cam, 0)
//  ly=0, cam=1 → 1 → ly=1, cam=2 → 3 → ly=3, cam=3 → 6 → ly=6, cam=4 → 10 ✅

// 2️⃣ Đếm tần suất — cho trái cây vào các ngăn
['🍎','🍊','🍎','🍊','🍎'].reduce((ngăn, trái) => {
    ngăn[trái] = (ngăn[trái] || 0) + 1
    return ngăn
}, {})  // → { '🍎': 3, '🍊': 2 }

// 3️⃣ Flatten — mở hộp lồng nhau
[[1,2], [3,4], [5]].reduce((kq, hộp) => [...kq, ...hộp], [])
// → [1, 2, 3, 4, 5]

// 4️⃣ Pipeline — nước chảy qua nhiều bộ lọc
const pipeline = [addTax, applyDiscount, roundPrice]
pipeline.reduce((price, fn) => fn(price), 100)
// 100 → addTax → 110 → applyDiscount → 99 → roundPrice → 99.00`}</CodeBlock>

                    <Callout type="info">reduce = &quot;nhiều → một&quot;: Mảng số → 1 tổng, mảng string → 1 object đếm, mảng mảng → 1 mảng phẳng, mảng functions → 1 kết quả. Nếu cần biến mảng thành 1 thứ gì đó → dùng reduce!</Callout>
                </TopicModal>

                <TopicModal title="Function.bind / call / apply" emoji="💻" color="#fbbf24" summary="Implement lại 3 methods thay đổi this context">
                    <Heading3>Cách dùng</Heading3>
                    <CodeBlock title="bind / call / apply — 3 cách thay đổi this">{`const user = { name: 'An' }
function greet(greeting, punctuation) {
    return greeting + ', ' + this.name + punctuation
}

// call — gọi NGAY, truyền args riêng lẻ
greet.call(user, 'Hi', '!')         // 'Hi, An!'

// apply — gọi NGAY, truyền args dạng ARRAY
greet.apply(user, ['Hi', '!'])      // 'Hi, An!'

// bind — TRẢ VỀ function mới, KHÔNG gọi ngay
const boundGreet = greet.bind(user, 'Hi')
boundGreet('!')                     // 'Hi, An!'

// 💡 Mẹo nhớ:
// call  = C = Comma (phẩy)   → args phân cách bằng dấu phẩy
// apply = A = Array           → args truyền dạng mảng
// bind  = B = Bind (trói lại) → trả về function mới`}</CodeBlock>

                    <Heading3>Cách build từ scratch</Heading3>
                    <CodeBlock title="myBind">{`Function.prototype.myBind = function(context, ...args) {
    const fn = this;
    return function(...newArgs) {
        return fn.apply(context, [...args, ...newArgs]);
    };
};

// Ví dụ:
const obj = { name: 'An' };
function greet(greeting) { return greeting + ', ' + this.name; }
const bound = greet.myBind(obj, 'Hello');
bound(); // "Hello, An"`}</CodeBlock>
                    <CodeBlock title="myCall & myApply">{`Function.prototype.myCall = function(context, ...args) {
    context = context || globalThis;
    const sym = Symbol(); // unique key tránh conflict
    context[sym] = this;
    const result = context[sym](...args);
    delete context[sym];
    return result;
};

Function.prototype.myApply = function(context, args = []) {
    return this.myCall(context, ...args);
};`}</CodeBlock>
                    <Callout type="warning">Trick: dùng <InlineCode>Symbol()</InlineCode> làm key tạm trên object để tránh đè property có sẵn.</Callout>
                </TopicModal>

                <TopicModal title="Promise & Promise.all" emoji="💻" color="#fbbf24" summary="Implement Promise từ scratch — câu hỏi kinh điển nhất">
                    <Heading3>Cách dùng</Heading3>
                    <CodeBlock title="Promise cơ bản">{`// Tạo Promise
const promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve('Done!'), 1000)
})

// Xử lý kết quả
promise
    .then(result => console.log(result))   // 'Done!'
    .catch(error => console.error(error))  // Nếu reject
    .finally(() => console.log('Cleanup')) // Luôn chạy

// Promise.all — chờ TẤT CẢ xong
const [users, posts] = await Promise.all([
    fetch('/api/users').then(r => r.json()),
    fetch('/api/posts').then(r => r.json()),
])
// 1 fail → TẤT CẢ fail!

// Promise.allSettled — chờ tất cả, KHÔNG fail
const results = await Promise.allSettled([p1, p2, p3])
// [{status:'fulfilled', value:...}, {status:'rejected', reason:...}]`}</CodeBlock>

                    <Heading3>Cách build từ scratch</Heading3>
                    <CodeBlock title="MyPromise (simplified)">{`class MyPromise {
    constructor(executor) {
        this.state = 'pending';
        this.value = undefined;
        this.callbacks = [];

        const resolve = (value) => {
            if (this.state !== 'pending') return;
            this.state = 'fulfilled';
            this.value = value;
            this.callbacks.forEach(cb => cb.onFulfilled(value));
        };
        const reject = (reason) => {
            if (this.state !== 'pending') return;
            this.state = 'rejected';
            this.value = reason;
            this.callbacks.forEach(cb => cb.onRejected(reason));
        };
        try { executor(resolve, reject); }
        catch (e) { reject(e); }
    }

    then(onFulfilled, onRejected) {
        return new MyPromise((resolve, reject) => {
            const handle = () => {
                try {
                    if (this.state === 'fulfilled') {
                        resolve(onFulfilled ? onFulfilled(this.value) : this.value);
                    } else {
                        onRejected ? resolve(onRejected(this.value)) : reject(this.value);
                    }
                } catch (e) { reject(e); }
            };
            if (this.state === 'pending') {
                this.callbacks.push({ onFulfilled: () => handle(), onRejected: () => handle() });
            } else { queueMicrotask(handle); }
        });
    }
}`}</CodeBlock>
                    <CodeBlock title="Promise.myAll">{`MyPromise.all = function(promises) {
    return new MyPromise((resolve, reject) => {
        const results = [];
        let count = 0;
        promises.forEach((p, i) => {
            MyPromise.resolve(p).then(val => {
                results[i] = val;
                if (++count === promises.length) resolve(results);
            }, reject); // 1 fail → reject tất cả
        });
        if (promises.length === 0) resolve([]);
    });
};`}</CodeBlock>
                </TopicModal>

                <TopicModal title="Debounce & Throttle" emoji="💻" color="#fbbf24" summary="2 kỹ thuật kiểm soát tần suất gọi function — interview hỏi rất nhiều">
                    <Heading3>Cách dùng</Heading3>
                    <CodeBlock title="Khi nào dùng Debounce vs Throttle">{`// DEBOUNCE — chờ user NGỪNG hành động, mới chạy
// Ví dụ: search input, resize window, auto-save
const searchInput = document.querySelector('#search')
searchInput.addEventListener('input', 
    debounce((e) => fetchResults(e.target.value), 300)
)
// User gõ: h...e...l...l...o → chỉ gọi API 1 lần sau 300ms ngừng gõ

// THROTTLE — chạy TỐI ĐA 1 lần / khoảng thời gian
// Ví dụ: scroll, mousemove, game loop
window.addEventListener('scroll',
    throttle(() => updateScrollProgress(), 100)
)
// User scroll liên tục → chỉ chạy mỗi 100ms, không phải mỗi pixel

// 💡 Mẹo nhớ:
// Debounce = Thang máy 🛗  → chờ hết người vào mới đóng cửa
// Throttle = Nhịp tim  💓  → đều đặn, không nhanh hơn tần suất đã set`}</CodeBlock>

                    <Heading3>Cách build từ scratch (Giải thích chi tiết)</Heading3>
                    
                    <Paragraph>
                        Để dễ hiểu, hãy tưởng tượng <strong>Debounce như cửa thang máy 🛗</strong>: 
                        <em>Sau khi có người bước vào, cửa đợi 3 giây để đóng. Nếu đang đợi 2 giây mà có người khác chạy vào, thang máy huỷ lệnh đóng cũ và bắt đầu đếm lại 3 giây. Thang máy CHỈ đi lên khi không còn ai bước vào trong suốt 3 giây liên tục.</em>
                    </Paragraph>

                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200 text-sm">
                            <strong className="text-[#fbbf24]">Bước 1: Bộ đếm giờ (Closure)</strong><br/>
                            Hàm <InlineCode>debounce</InlineCode> trả về một hàm con. Biến <InlineCode>timer</InlineCode> nằm ở hàm cha sẽ sống bám theo hàm con (Closure). Nhờ vậy, qua nhiều lần gọi, hàm con vẫn dùng chung cái "đồng hồ" đó.
                        </div>
                        <div className="p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200 text-sm">
                            <strong className="text-[#fbbf24]">Bước 2: Huỷ lịch cũ, đặt lịch mới</strong><br/>
                            Khi user thao tác, thấy <InlineCode>timer</InlineCode> cũ đang chạy thì đập đi (<InlineCode>clearTimeout</InlineCode>) sắm cái mới (<InlineCode>setTimeout</InlineCode>). Chỉ khi đủ thời gian không ai phá, hàm gốc mới được gọi.
                        </div>
                    </div>

                    <CodeBlock title="debounce — chờ user ngừng, mới chạy">{`function debounce(fn, delay) {
    let timer = null; // 1. Khởi tạo bộ đếm giờ (Closure)
    
    return function(...args) { // Gom mọi biến user truyền vào
        // 2. Thấy lịch cũ đang chạy? Huỷ lập tức!
        if (timer) clearTimeout(timer);
        
        // 3. Dựng lại lịch mới
        timer = setTimeout(() => {
            fn.apply(this, args); // 4. Đủ chu kỳ (không ai phá), chạy hàm gốc!
        }, delay);
    };
}

// Ví dụ: search input — chỉ gọi API sau khi user ngừng gõ 300ms
const search = debounce((query) => fetch(\`/api?q=\${query}\`), 300);
input.addEventListener('input', (e) => search(e.target.value));`}</CodeBlock>
                    <CodeBlock title="throttle — chạy tối đa 1 lần / interval">{`function throttle(fn, interval) {
    let lastTime = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastTime >= interval) {
            lastTime = now;
            fn.apply(this, args);
        }
    };
}

// Ví dụ: scroll handler — tối đa 1 lần/100ms
window.addEventListener('scroll', throttle(handleScroll, 100));`}</CodeBlock>
                    <Callout type="tip"><strong>Debounce</strong> = gõ search, resize window. <strong>Throttle</strong> = scroll, mousemove. Nhớ cả 2 đều return <strong>function mới</strong>.</Callout>
                </TopicModal>

                <TopicModal title="Deep clone / Deep equal" emoji="💻" color="#fbbf24" summary="So sánh và copy object lồng nhau — phân biệt shallow vs deep">
                    <Heading3>Cách dùng</Heading3>
                    <CodeBlock title="3 cách clone có sẵn trong JS">{`const obj = { a: { b: 1 }, c: [2, 3] }

// 1️⃣ Shallow copy — CHỈ copy layer 1 (nested vẫn share reference!)
const shallow1 = { ...obj }           // spread
const shallow2 = Object.assign({}, obj) // assign
shallow1.a.b = 999
console.log(obj.a.b) // 999 — BỊ ẢNH HƯỞNG! ❌

// 2️⃣ JSON trick — deep nhưng MẤT function, Date, undefined, circular
const jsonClone = JSON.parse(JSON.stringify(obj))
// ⚠️ Không hỗ trợ: Function, Date, RegExp, Map, Set, undefined

// 3️⃣ structuredClone — CÁCH TỐT NHẤT (ES2022)
const deep = structuredClone(obj)
deep.a.b = 999
console.log(obj.a.b) // 1 — KHÔNG bị ảnh hưởng! ✅
// ✅ Hỗ trợ: Date, RegExp, Map, Set, ArrayBuffer, circular ref
// ❌ Không hỗ trợ: Function, DOM nodes`}</CodeBlock>

                    <Heading3>Cách build từ scratch</Heading3>
                    <CodeBlock title="deepClone">{`function deepClone(obj, seen = new WeakMap()) {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj);
    if (obj instanceof RegExp) return new RegExp(obj);
    if (seen.has(obj)) return seen.get(obj); // Circular reference!

    const clone = Array.isArray(obj) ? [] : {};
    seen.set(obj, clone);
    for (const key of Object.keys(obj)) {
        clone[key] = deepClone(obj[key], seen);
    }
    return clone;
}`}</CodeBlock>
                    <CodeBlock title="deepEqual">{`function deepEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (typeof a !== typeof b) return false;
    if (typeof a !== 'object') return false;

    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;

    return keysA.every(key => deepEqual(a[key], b[key]));
}
// deepEqual({a: {b: 1}}, {a: {b: 1}}) → true`}</CodeBlock>
                    <Callout type="warning">Edge case quan trọng: <Highlight>circular reference</Highlight> — dùng WeakMap để track objects đã clone. Nhiều candidate quên cái này!</Callout>
                </TopicModal>

                <TopicModal title="Event Emitter (pub/sub)" emoji="💻" color="#fbbf24" summary="Pattern cốt lõi của Node.js, React, và mọi event system">
                    <CodeBlock title="EventEmitter">{`class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(event, listener) {
        if (!this.events[event]) this.events[event] = [];
        this.events[event].push(listener);
        return this; // chainable
    }

    off(event, listener) {
        if (!this.events[event]) return;
        this.events[event] = this.events[event]
            .filter(fn => fn !== listener);
        return this;
    }

    emit(event, ...args) {
        if (!this.events[event]) return false;
        this.events[event].forEach(fn => fn(...args));
        return true;
    }

    once(event, listener) {
        const wrapper = (...args) => {
            listener(...args);
            this.off(event, wrapper);
        };
        return this.on(event, wrapper);
    }
}

// Sử dụng:
const bus = new EventEmitter();
bus.on('message', (text) => console.log(text));
bus.emit('message', 'Hello!'); // "Hello!"`}</CodeBlock>
                </TopicModal>

                <TopicModal title="Curry function" emoji="💻" color="#fbbf24" summary="Transform f(a,b,c) thành f(a)(b)(c) — functional programming pattern">
                    <CodeBlock title="curry">{`function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        }
        return function(...moreArgs) {
            return curried.apply(this, [...args, ...moreArgs]);
        };
    };
}

// Ví dụ:
const add = curry((a, b, c) => a + b + c);
add(1)(2)(3);     // 6
add(1, 2)(3);     // 6  — partial application
add(1)(2, 3);     // 6
add(1, 2, 3);     // 6

// Ứng dụng thực tế:
const log = curry((level, time, msg) =>
    console.log(\`[\${level}] \${time}: \${msg}\`)
);
const errorLog = log('ERROR');
const errorNow = errorLog(new Date().toISOString());
errorNow('Database down!');`}</CodeBlock>
                    <Callout type="tip">Key: so sánh <InlineCode>args.length</InlineCode> với <InlineCode>fn.length</InlineCode> (số params function cần). Đủ thì gọi, thiếu thì trả function mới.</Callout>
                </TopicModal>

                <TopicModal title="Flatten array / object" emoji="💻" color="#fbbf24" summary="Làm phẳng array/object lồng nhau — câu hỏi hay gặp ở Google, Meta">
                    <Heading3>Cách dùng</Heading3>
                    <CodeBlock title="Flatten có sẵn trong JS">{`// Array.flat() — built-in từ ES2019
[1, [2, [3, [4]]]].flat()       // [1, 2, [3, [4]]]  — mặc định depth=1
[1, [2, [3, [4]]]].flat(2)      // [1, 2, 3, [4]]    — depth=2
[1, [2, [3, [4]]]].flat(Infinity) // [1, 2, 3, 4]    — flatten hết!

// Trick: dùng flatMap để vừa map vừa flatten 1 level
['Hello World', 'Foo Bar'].flatMap(s => s.split(' '))
// → ['Hello', 'World', 'Foo', 'Bar']

// Object.entries + reduce — flatten object thủ công
const nested = { a: { b: 1 }, c: 2 }
// Muốn → { 'a.b': 1, 'c': 2 } → cần tự build (xem bên dưới)`}</CodeBlock>

                    <Heading3>Cách build từ scratch</Heading3>
                    <CodeBlock title="flattenArray">{`// Flatten nested array
function flattenArray(arr, depth = Infinity) {
    const result = [];
    for (const item of arr) {
        if (Array.isArray(item) && depth > 0) {
            result.push(...flattenArray(item, depth - 1));
        } else {
            result.push(item);
        }
    }
    return result;
}

flattenArray([1, [2, [3, [4]]]])     // [1, 2, 3, 4]
flattenArray([1, [2, [3, [4]]]], 1)  // [1, 2, [3, [4]]]`}</CodeBlock>
                    <CodeBlock title="flattenObject">{`// Flatten nested object with dot notation
function flattenObject(obj, prefix = '', result = {}) {
    for (const [key, value] of Object.entries(obj)) {
        const newKey = prefix ? \`\${prefix}.\${key}\` : key;
        if (value && typeof value === 'object' && !Array.isArray(value)) {
            flattenObject(value, newKey, result);
        } else {
            result[newKey] = value;
        }
    }
    return result;
}

flattenObject({ a: { b: { c: 1 }, d: 2 } })
// → { 'a.b.c': 1, 'a.d': 2 }`}</CodeBlock>
                </TopicModal>
            </div>

            <Heading3>2.3 Tài liệu</Heading3>
            <div className="my-4 space-y-2">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                    <span className="text-yellow-400">📕</span>
                    <div className="text-slate-300 text-sm">
                        <strong>You Don&apos;t Know JS</strong> (Kyle Simpson) — đọc hết series này sẽ hiểu JS cực sâu
                    </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                    <span className="text-yellow-400">📗</span>
                    <div className="text-slate-300 text-sm">
                        <strong>javascript.info</strong> — tài liệu online tốt nhất, có ví dụ + bài tập
                    </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                    <span className="text-yellow-400">📘</span>
                    <div className="text-slate-300 text-sm">
                        <strong>GreatFrontEnd.com</strong> — platform luyện frontend interview, có mock interview
                    </div>
                </div>
            </div>

            <Callout type="warning">
                Big tech <Highlight>rất hay hỏi implement từ scratch</Highlight>: &quot;Code lại Promise.all&quot;,
                &quot;Viết debounce không dùng lodash&quot;. Nếu bạn chỉ dùng API mà không hiểu bên trong, sẽ fail vòng này.
            </Callout>

            <Heading3>2.4 Câu hỏi phỏng vấn nhanh (VN Style)</Heading3>
            <Paragraph>
                Phỏng vấn ở Việt Nam thường hỏi <Highlight>câu hỏi lý thuyết ngắn</Highlight> để đánh giá nhanh kiến thức.
                Dưới đây là những câu <Highlight>hay gặp nhất</Highlight> — phải trả lời được ngay lập tức.
            </Paragraph>

            <div className="my-4 space-y-2">
                <TopicModal title="JS Cơ bản — 15 câu hỏi kinh điển" emoji="⚡" color="#fbbf24" summary="var/let/const, hoisting, truthy/falsy, == vs === — câu nào cũng gặp ở VN interview">
                    <div className="my-3 space-y-3">
                        {[
                            ['Q: var, let, const khác nhau thế nào?', 'var: function-scoped, hoisted (undefined), re-declare OK.\nlet: block-scoped, hoisted (TDZ), re-assign OK.\nconst: block-scoped, hoisted (TDZ), không re-assign (nhưng object/array bên trong vẫn mutable!).'],
                            ['Q: Hoisting là gì? Cho ví dụ.', 'Hoisting: JS đưa khai báo lên đầu scope trước khi chạy.\nvar → hoisted, giá trị = undefined.\nlet/const → hoisted nhưng trong TDZ (Temporal Dead Zone) → ReferenceError nếu access trước khai báo.\nfunction declaration → hoisted toàn bộ (cả body).'],
                            ['Q: == vs === khác gì?', '== (loose): so sánh có type coercion (1 == "1" → true).\n=== (strict): so sánh không coercion, cả value + type (1 === "1" → false).\n→ Luôn dùng === trừ khi cần check null/undefined (x == null).'],
                            ['Q: null vs undefined?', 'undefined: biến khai báo nhưng chưa gán giá trị, hoặc function không return.\nnull: gán rõ ràng = "không có giá trị".\ntypeof null === "object" (bug lịch sử của JS).\nnull == undefined → true, null === undefined → false.'],
                            ['Q: Closure là gì? Cho ví dụ thực tế.', 'Closure: function "nhớ" biến của scope bên ngoài ngay cả khi scope đó đã kết thúc.\nVí dụ thực tế: debounce, throttle, module pattern, React hooks (useState bên trong là closure).'],
                            ['Q: Arrow function khác regular function thế nào?', '1. Không có this riêng — inherit từ parent scope.\n2. Không có arguments object.\n3. Không thể dùng làm constructor (new).\n4. Không thể dùng làm generator (function*).\n→ Trong React: luôn dùng arrow function cho event handlers.'],
                            ['Q: Truthy / falsy values?', 'Falsy (6 giá trị): false, 0, "" (empty string), null, undefined, NaN.\nTất cả giá trị khác đều truthy (kể cả [], {}, "0", "false").'],
                            ['Q: Giải thích call stack và event loop.', 'Call stack: LIFO, chạy synchronous code.\nWeb APIs: setTimeout, fetch... chạy bên ngoài call stack.\nCallback/Task Queue: macro tasks (setTimeout).\nMicrotask Queue: Promises, queueMicrotask.\nEvent Loop: khi stack rỗng → lấy microtask trước → rồi macrotask.'],
                            ['Q: Spread operator và rest parameter?', 'Spread (...): "mở rộng" array/object ra → {...obj}, [...arr].\nRest (...): "gom lại" params → function(...args).\nCùng syntax ... nhưng ngược nghĩa: spread = unpack, rest = pack.'],
                            ['Q: map, filter, reduce khác forEach thế nào?', 'forEach: chỉ lặp, return undefined, không tạo array mới.\nmap: return array mới, cùng length.\nfilter: return array mới, items thỏa condition.\nreduce: return 1 giá trị từ array.\n→ forEach dùng cho side effects (log, API call), map/filter/reduce cho data transformation.'],
                            ['Q: Shallow copy vs deep copy?', 'Shallow: copy level 1, nested objects vẫn share reference.\n→ {...obj}, [...arr], Object.assign.\nDeep: copy tất cả levels, hoàn toàn independent.\n→ structuredClone() (modern), JSON.parse(JSON.stringify()) (cũ, mất function/Date).'],
                            ['Q: Pass by value vs pass by reference?', 'Primitives: pass by value (copy giá trị).\nObjects/Arrays: pass by reference (share cùng reference).\n→ Thay đổi property của object trong function SẼ thay đổi object gốc.'],
                            ['Q: setTimeout(fn, 0) chạy ngay không?', 'KHÔNG chạy ngay! setTimeout(fn, 0) đưa fn vào macrotask queue.\nChỉ chạy khi call stack RỖNG và tất cả microtasks đã xong.\n→ console.log(1); setTimeout(() => console.log(2), 0); console.log(3);\n→ Output: 1, 3, 2.'],
                            ['Q: Promise.all vs Promise.allSettled?', 'Promise.all: fail NGAY khi 1 promise reject (fast-fail).\nPromise.allSettled: đợi TẤT CẢ hoàn thành, trả về [{status, value/reason}].\n→ Dùng all khi cần tất cả thành công. Dùng allSettled khi cần biết kết quả từng cái.'],
                            ['Q: Destructuring là gì?', 'Destructuring: "rút" giá trị từ object/array vào biến.\nObject: const { name, age } = user;\nArray: const [first, ...rest] = arr;\nCó thể: rename, default value, nested destructuring.'],
                        ].map(([q, a]) => (
                            <div key={q} className="p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                                <div className="text-yellow-400 text-sm font-bold mb-2">{q}</div>
                                <div className="text-slate-300 text-sm whitespace-pre-line">{a}</div>
                            </div>
                        ))}
                    </div>
                    <Callout type="tip">Mẹo: Gặp câu hỏi lý thuyết → trả lời <Highlight>ngắn gọn + ví dụ</Highlight>. {'"var là function-scoped, ví dụ console.log(x) // undefined vì hoisting"'} — tốt hơn chỉ nói {'"var là function scoped"'}.</Callout>
                </TopicModal>

                <TopicModal title="HTML/CSS — 10 câu hỏi hay gặp" emoji="🎨" color="#38bdf8" summary="box model, position, flexbox, responsive — CSS là phần nhiều dev VN yếu">
                    <div className="my-3 space-y-3">
                        {[
                            ['Q: Box model là gì?', 'Mỗi element có 4 layers: Content → Padding → Border → Margin.\nbox-sizing: content-box (default): width = content only.\nbox-sizing: border-box: width = content + padding + border.\n→ Luôn dùng border-box (*, *::before, *::after { box-sizing: border-box; }).'],
                            ['Q: position: relative, absolute, fixed, sticky?', 'static: default, flow bình thường.\nrelative: dịch so với VỊ TRÍ GỐC, vẫn chiếm chỗ.\nabsolute: dịch so với PARENT có position khác static, không chiếm chỗ.\nfixed: dịch so với VIEWPORT, không chiếm chỗ.\nsticky: relative cho đến khi scroll đến threshold → thành fixed.'],
                            ['Q: display: none vs visibility: hidden vs opacity: 0?', 'display: none — mất khỏi DOM flow, không chiếm chỗ.\nvisibility: hidden — vẫn chiếm chỗ, không thấy, không click được.\nopacity: 0 — vẫn chiếm chỗ, không thấy, VẪN click được.\n→ Accessibility: dùng sr-only class (position: absolute, clip) cho screen reader.'],
                            ['Q: em, rem, px khác nhau?', 'px: fixed size, không responsive.\nem: relative to PARENT font-size → compound nếu nested.\nrem: relative to ROOT (html) font-size → predictable.\n→ Best practice: font-size dùng rem, spacing dùng rem hoặc em, border dùng px.'],
                            ['Q: Flexbox vs Grid khi nào dùng?', 'Flexbox: 1 chiều (hàng HOẶC cột). Dùng cho: navbar, button group, card row.\nGrid: 2 chiều (hàng VÀ cột). Dùng cho: page layout, dashboard, gallery.\n→ "Flex cho components, Grid cho layouts."'],
                            ['Q: Pseudo-class vs pseudo-element?', 'Pseudo-class (:hover, :focus, :nth-child) — style STATE của element.\nPseudo-element (::before, ::after, ::placeholder) — tạo ELEMENT ảo.\nPseudo-class: 1 dấu hai chấm. Pseudo-element: 2 dấu hai chấm.'],
                            ['Q: Responsive design approach?', 'Mobile-first: min-width (mặc định mobile, thêm style cho desktop).\nDesktop-first: max-width (mặc định desktop, override cho mobile).\n→ Mobile-first tốt hơn: ít CSS hơn, performance tốt hơn trên mobile.\nBreakpoints phổ biến: 640px (sm), 768px (md), 1024px (lg), 1280px (xl).'],
                            ['Q: z-index hoạt động thế nào?', 'z-index chỉ có tác dụng trên elements có position khác static.\nStacking context: tạo bởi position + z-index, opacity < 1, transform, filter.\nz-index chỉ so sánh TRONG cùng stacking context.\n→ Tip: tránh z-index war, dùng semantic layers (modal: 100, dropdown: 50, tooltip: 200).'],
                            ['Q: CSS selector priority?', '!important > inline style > #id > .class/:pseudo-class/[attr] > tag > *.\nKhi cùng specificity → rule sau win.\n→ Luôn giữ specificity thấp. Avoid !important. Dùng class thay vì id.'],
                            ['Q: Centering một element?', 'Flex: display: flex; justify-content: center; align-items: center;\nGrid: display: grid; place-items: center;\nAbsolute: position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);\nMargin: margin: 0 auto (chỉ horizontal, cần width).'],
                        ].map(([q, a]) => (
                            <div key={q} className="p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                                <div className="text-blue-400 text-sm font-bold mb-2">{q}</div>
                                <div className="text-slate-300 text-sm whitespace-pre-line">{a}</div>
                            </div>
                        ))}
                    </div>
                    <Callout type="tip">VN interview đặc biệt hay hỏi CSS: <Highlight>centering, box model, position, flexbox/grid</Highlight>. Nhiều công ty cho bài test code CSS trực tiếp — phải viết thuộc lòng.</Callout>
                </TopicModal>

                <TopicModal title="React — 12 câu hỏi phỏng vấn" emoji="⚛️" color="#61DAFB" summary="lifecycle, hooks, key, controlled/uncontrolled — phải trả lời được trong 30 giây">
                    <div className="my-3 space-y-3">
                        {[
                            ['Q: React lifecycle methods?', 'Mounting: constructor → render → componentDidMount (≈ useEffect(fn, [])).\nUpdating: render → componentDidUpdate (≈ useEffect(fn, [deps])).\nUnmounting: componentWillUnmount (≈ useEffect cleanup return).\n→ Hooks đã thay thế lifecycle methods. Nhưng phải biết mapping.'],
                            ['Q: useState vs useRef?', 'useState: lưu state, thay đổi → re-render.\nuseRef: lưu giá trị, thay đổi → KHÔNG re-render.\n→ useRef cho: DOM reference, timer ID, previous value, mutable value không cần UI update.'],
                            ['Q: useEffect dependency array?', 'useEffect(fn) — chạy MỌI render.\nuseEffect(fn, []) — chạy 1 lần sau mount.\nuseEffect(fn, [a, b]) — chạy khi a hoặc b thay đổi.\nCleanup: return () => {} — chạy khi unmount hoặc trước effect mới.'],
                            ['Q: Tại sao cần key trong list?', 'key giúp React xác định element nào thay đổi, thêm, xóa (reconciliation).\n❌ Dùng index làm key → bug khi reorder/delete (state bị lẫn giữa các items).\n✅ Dùng unique ID (id từ API, UUID).\n→ Không có key → React dùng index mặc định → warning.'],
                            ['Q: Controlled vs Uncontrolled component?', 'Controlled: React quản lý value qua state (value={state}, onChange={setState}).\nUncontrolled: DOM quản lý value, React đọc qua ref (useRef).\n→ Form đơn giản: uncontrolled (register ref). Form complex: controlled (validation real-time).'],
                            ['Q: useMemo vs useCallback?', 'useMemo: memoize GIÁ TRỊ computed → useMemo(() => expensiveCalc(a), [a]).\nuseCallback: memoize FUNCTION → useCallback(fn, [deps]).\nuseCallback(fn, deps) = useMemo(() => fn, deps).\n→ Chỉ dùng khi: 1) heavy computation 2) reference equality matters 3) React.memo child.'],
                            ['Q: Props drilling là gì? Giải pháp?', 'Props drilling: truyền props qua nhiều layers components trung gian.\nGiải pháp:\n1. Context API — share state global (theme, auth, locale).\n2. Composition — render children trực tiếp.\n3. State management — Redux, Zustand.\n→ Context tốt cho low-frequency updates. Redux/Zustand cho complex state.'],
                            ['Q: React render lại khi nào?', '1. State thay đổi (setState).\n2. Props thay đổi.\n3. Parent re-render (mặc dù props không đổi!).\n4. Context value thay đổi.\n→ Tránh unnecessary re-render: React.memo, useMemo, useCallback, state colocation.'],
                            ['Q: Giải thích Virtual DOM.', 'Virtual DOM = JS object đại diện cho DOM thật.\nKhi state thay đổi:\n1. React tạo Virtual DOM mới.\n2. So sánh (diff) với Virtual DOM cũ.\n3. Tính ra minimal changes (reconciliation).\n4. Batch update DOM thật.\n→ Nhanh hơn manipulate DOM trực tiếp vì batch updates + minimal DOM operations.'],
                            ['Q: useContext dùng khi nào?', 'useContext: chia sẻ data global mà không cần props drilling.\nUse cases: theme, language/locale, auth user, toast notifications.\n⚠️ Hạn chế: TẤT CẢ consumers re-render khi context value thay đổi.\n→ Split context theo domain. Không dùng cho frequently changing data (mouse position).'],
                            ['Q: Higher-Order Component (HOC) là gì?', 'HOC = function nhận component, trả về component mới với thêm logic.\nVí dụ: withAuth(Component) → check auth trước khi render.\nNhược điểm: wrapper hell, khó debug, naming collision.\n→ Hooks đã thay thế phần lớn HOC use cases. Nhưng HOC vẫn dùng cho cross-cutting concerns.'],
                            ['Q: Custom hooks là gì? Cho ví dụ.', 'Custom hook = function bắt đầu bằng "use", dùng hooks bên trong.\nVí dụ: useDebounce, useLocalStorage, useWindowSize, useFetch.\nĐặc điểm: share logic, KHÔNG share state (mỗi component dùng hook có state riêng).\n→ Rule: logic dùng lại ≥ 2 lần → extract thành custom hook.'],
                            ['Q: One-way data binding là gì? Khác two-way thế nào?', 'One-way: data chỉ chảy 1 chiều State → UI. Muốn update state phải TỰ viết handler (onChange).\nTwo-way (Angular ngModel): State ↔ UI tự đồng bộ 2 chiều.\nReact chọn one-way vì dễ debug hơn — luôn biết AI và KHI NÀO đổi state.\nTrade-off: viết nhiều code hơn (onChange) nhưng predictable, ít bug "state đổi bí ẩn".'],
                        ].map(([q, a]) => (
                            <div key={q} className="p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                                <div className="text-cyan-400 text-sm font-bold mb-2">{q}</div>
                                <div className="text-slate-300 text-sm whitespace-pre-line">{a}</div>
                            </div>
                        ))}
                    </div>
                    <Callout type="tip">Công ty VN hỏi React nhiều nhất: <Highlight>hooks, lifecycle, key, controlled form, re-render optimization</Highlight>. Chuẩn bị kỹ 12 câu trên là cover 80% câu hỏi React ở VN.</Callout>
                </TopicModal>

                <TopicModal title="CORS, Cookies & JWT" emoji="🔐" color="#f97316" summary="Authentication & Security — 3 khái niệm liên quan mà hay hỏi cùng lúc">
                    <Paragraph><Highlight>CORS</Highlight> = ai được gọi API. <Highlight>JWT</Highlight> = bạn là ai. <Highlight>Cookie</Highlight> = cách truyền JWT an toàn.</Paragraph>

                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">🌐 CORS (Cross-Origin Resource Sharing)</div>
                            <div className="text-slate-300 text-sm mt-1">
                                Browser có <strong>Same-Origin Policy</strong>: chỉ cho phép request tới cùng origin (protocol + domain + port).<br />
                                <strong>CORS = cơ chế cho server nói &quot;tôi chấp nhận request từ origin khác&quot;</strong><br /><br />
                                • <InlineCode>Access-Control-Allow-Origin</InlineCode>: origin nào được phép<br />
                                • <InlineCode>Access-Control-Allow-Methods</InlineCode>: GET, POST, PUT...<br />
                                • <InlineCode>Access-Control-Allow-Credentials: true</InlineCode>: cho phép gửi cookies<br />
                                • <strong>Preflight (OPTIONS)</strong>: browser gửi OPTIONS trước khi gửi POST JSON / custom headers
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                            <div className="text-yellow-400 font-bold text-sm">🍪 Cookies</div>
                            <div className="text-slate-300 text-sm mt-1">
                                Cookie = dữ liệu server gửi về, <strong>browser tự động gửi lại mỗi request</strong>.<br /><br />
                                • <InlineCode>HttpOnly</InlineCode>: JS không đọc được (chống XSS steal cookie)<br />
                                • <InlineCode>Secure</InlineCode>: chỉ gửi qua HTTPS<br />
                                • <InlineCode>SameSite=Strict</InlineCode>: chỉ gửi nếu cùng site (chống CSRF)<br />
                                • <InlineCode>SameSite=Lax</InlineCode>: cho phép top-level navigation (click link)<br />
                                • <InlineCode>SameSite=None</InlineCode>: cross-site OK (cần Secure, dùng cho OAuth)<br />
                                • <InlineCode>Max-Age</InlineCode>: thời gian sống (giây). Không set = mất khi đóng browser
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">🎫 JWT (JSON Web Token)</div>
                            <div className="text-slate-300 text-sm mt-1">
                                JWT = token <strong>tự chứa thông tin user</strong>, server không cần lưu session.<br />
                                <strong>3 phần</strong>: header.payload.signature<br /><br />
                                • <strong>Header</strong>: algorithm + type (<InlineCode>{`{"alg":"HS256","typ":"JWT"}`}</InlineCode>)<br />
                                • <strong>Payload</strong>: data/claims (<InlineCode>{`{"userId":"1001","role":"admin","exp":...}`}</InlineCode>)<br />
                                • <strong>Signature</strong>: HMAC(header + payload, SECRET) → verify chưa bị sửa
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                            <div className="text-orange-400 font-bold text-sm">🔗 3 cái liên quan thế nào?</div>
                            <div className="text-slate-300 text-sm mt-1">
                                1. User login → server tạo <strong>JWT</strong> (sign với SECRET_KEY)<br />
                                2. Server gửi JWT về trong <strong>HttpOnly Cookie</strong> (an toàn nhất)<br />
                                3. Browser tự động gửi cookie mỗi request → server verify JWT<br />
                                4. Nếu cross-origin → cần <strong>CORS</strong> cho phép + <InlineCode>credentials: true</InlineCode>
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                            <div className="text-red-400 font-bold text-sm">📦 Lưu JWT ở đâu?</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>HttpOnly Cookie</strong> ✅ — JS không đọc được (chống XSS). Best practice!<br />
                                • <strong>localStorage</strong> ❌ — XSS có thể đọc token! Nên tránh cho auth tokens<br />
                                • <strong>Memory (RAM)</strong> — An toàn nhất nhưng mất khi refresh page
                            </div>
                        </div>
                    </div>

                    <CodeBlock title="cors-cookies-jwt.ts">{`// ===== Express Setup =====
app.use(cors({
  origin: 'https://myapp.com',      // CORS: cho phép frontend
  credentials: true,                  // CORS: cho phép cookies
}))

// Login → set JWT vào HttpOnly Cookie
app.post('/login', async (req, res) => {
  const user = await authenticate(req.body)
  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )
  res.cookie('token', token, {
    httpOnly: true,     // ← Chống XSS
    secure: true,       // ← HTTPS only
    sameSite: 'strict', // ← Chống CSRF
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
  })
  res.json({ message: 'Logged in', user })
})

// Middleware: verify JWT từ cookie
function authMiddleware(req, res, next) {
  const token = req.cookies.token
  if (!token) return res.status(401).json({ error: 'No token' })
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET)
    next()
  } catch {
    res.status(401).json({ error: 'Invalid/expired token' })
  }
}

// ===== Frontend (fetch) =====
// PHẢI có credentials: 'include' để browser gửi cookies cross-origin
const res = await fetch('https://api.myapp.com/profile', {
  credentials: 'include',  // ← Gửi cookies!
  headers: { 'Content-Type': 'application/json' },
})`}</CodeBlock>

                    <Callout type="tip">VN Interview: {'"Giải thích CORS"'} + {'"JWT lưu ở đâu an toàn?"'} + {'"HttpOnly cookie là gì?"'} = <Highlight>3 câu hay gặp cùng lúc</Highlight>. Trả lời được flow đầy đủ (login → JWT → cookie → CORS) → senior answer.</Callout>
                </TopicModal>
            </div>

            {/* ===== PHASE 3 ===== */}
        </>
    )
}
