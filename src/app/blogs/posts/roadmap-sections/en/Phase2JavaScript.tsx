'use client'
import { CodeBlock, Heading2, Heading3, Paragraph, Highlight, InlineCode, Callout } from '../../../components/BlogComponents'
import { TopicModal } from '../../../components/TopicModal'

export default function Phase2JavaScript() {
    return (
        <>
            <Heading2>Phase 2 — JavaScript Master (4-6 weeks)</Heading2>

            <Paragraph>
                JavaScript is the <Highlight>core language</Highlight> of Frontend. Big tech will ask deep JS questions —
                not just syntax but <Highlight>how it works internally</Highlight>.
            </Paragraph>

            <Heading3>2.1 Core Concepts (MUST know — click for details)</Heading3>
            <div className="my-4 space-y-2">
                <TopicModal title="Execution Context & Hoisting" emoji="⚙️" color="#fbbf24" summary="How the JS engine runs code — Creation Phase vs Execution Phase">
                    <Paragraph>When you run JS, the engine creates an <Highlight>Execution Context</Highlight> with 2 phases:</Paragraph>
                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                            <div className="text-yellow-400 font-bold text-sm">1. Creation Phase</div>
                            <div className="text-slate-300 text-sm mt-1">• Creates Global/Window object<br />• Sets up memory heap for variables and functions<br />• <strong>Hoisting</strong>: var is assigned <InlineCode>undefined</InlineCode>, function declarations are copied entirely<br />• <InlineCode>let</InlineCode>/<InlineCode>const</InlineCode> are in &quot;Temporal Dead Zone&quot; — accessing early throws ReferenceError</div>
                        </div>
                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">2. Execution Phase</div>
                            <div className="text-slate-300 text-sm mt-1">• Runs code line by line<br />• Assigns actual values to variables<br />• Calling functions → creates a new Function Execution Context (also has 2 phases)</div>
                        </div>
                    </div>
                    <CodeBlock title="Hoisting example">{`console.log(a); // undefined (hoisted, assigned undefined)
console.log(b); // ReferenceError! (TDZ)
var a = 1;
let b = 2;

greet(); // "Hello!" — function hoisted entirely
function greet() { console.log("Hello!"); }`}</CodeBlock>

                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">{'\u2705'} Only Benefit: Function Declaration Hoisting</div>
                            <div className="text-slate-300 text-sm mt-1">
                                Call functions BEFORE declaring them {'\u2192'} write <strong>main logic at top, helpers at bottom</strong> {'\u2192'} easy top-down reading.<br />
                                This is the only reason hoisting is actually useful.
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                            <div className="text-red-400 font-bold text-sm">{'\u26A0\uFE0F'} Bad behavior to avoid</div>
                            <div className="text-slate-300 text-sm mt-1">
                                {'\u2022'} <strong>var hoisting</strong> {'\u2192'} value is <InlineCode>undefined</InlineCode> instead of error {'\u2192'} <Highlight>dangerous silent bug</Highlight><br />
                                {'\u2022'} <strong>Function expression / arrow</strong> {'\u2192'} NOT hoisted {'\u2192'} TypeError if called early<br />
                                {'\u2022'} <strong>class hoisting</strong> {'\u2192'} TDZ like let/const {'\u2192'} ReferenceError<br />
                                {'\u2192'} Always use <InlineCode>let</InlineCode>/<InlineCode>const</InlineCode> {'\u2014'} TDZ catches bugs early instead of letting them slip
                            </div>
                        </div>
                    </div>

                    <div className="p-3 rounded-lg bg-gray-500/10 border border-gray-500/20 my-3">
                        <div className="text-gray-300 font-bold text-sm">{'\uD83D\uDCCA'} Hoisting Summary Table</div>
                        <div className="text-slate-300 text-sm mt-2">
                            <div className="overflow-x-auto">
                                <table className="w-full text-xs">
                                    <thead>
                                        <tr className="border-b border-white/10">
                                            <th className="text-left py-1.5 pr-2 text-slate-400 font-semibold">Type</th>
                                            <th className="text-left py-1.5 pr-2 text-slate-400 font-semibold">Hoisted?</th>
                                            <th className="text-left py-1.5 pr-2 text-slate-400 font-semibold">Value when accessed early</th>
                                            <th className="text-left py-1.5 text-slate-400 font-semibold">Recommendation</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-slate-300">
                                        <tr className="border-b border-white/5"><td className="py-1.5 pr-2 font-bold text-red-400">var</td><td className="py-1.5 pr-2">{'\u2705'}</td><td className="py-1.5 pr-2">undefined (dangerous!)</td><td className="py-1.5">{'\u274C Avoid'}</td></tr>
                                        <tr className="border-b border-white/5"><td className="py-1.5 pr-2 font-bold text-green-400">let / const</td><td className="py-1.5 pr-2">{'\u2705 (TDZ)'}</td><td className="py-1.5 pr-2">ReferenceError (safe)</td><td className="py-1.5">{'\u2705 Always use'}</td></tr>
                                        <tr className="border-b border-white/5"><td className="py-1.5 pr-2 font-bold text-blue-400">function declaration</td><td className="py-1.5 pr-2">{'\u2705'}</td><td className="py-1.5 pr-2">Full function</td><td className="py-1.5">{'\u2705 OK'}</td></tr>
                                        <tr className="border-b border-white/5"><td className="py-1.5 pr-2 font-bold text-yellow-400">function expression</td><td className="py-1.5 pr-2">{'\u274C'}</td><td className="py-1.5 pr-2">TypeError</td><td className="py-1.5">{'\u2705 OK'}</td></tr>
                                        <tr><td className="py-1.5 pr-2 font-bold text-purple-400">class</td><td className="py-1.5 pr-2">{'\u2705 (TDZ)'}</td><td className="py-1.5 pr-2">ReferenceError</td><td className="py-1.5">{'\u2705 OK'}</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <CodeBlock title="hoisting-pitfalls.js">{`// ═══ 1. var HOISTING — SILENT BUG ═══
console.log(name) // undefined (NO error, but wrong logic!)
var name = 'Khuong'
// JS interprets as:
// var name           ← hoisted to top → undefined
// console.log(name)  ← undefined
// name = 'Khuong'    ← assigned later

// ═══ 2. let/const — TDZ CATCHES BUGS EARLY ═══
console.log(x) // ❌ ReferenceError (better than undefined!)
let x = 5
// let IS still hoisted, but in "uninitialized" state
// Zone from scope start → declaration line = TDZ

// ═══ 3. FUNCTION EXPRESSIONS ARE NOT HOISTED ═══
greet() // ❌ TypeError: greet is not a function
const greet = function() { console.log('Hi') }
// const greet = () => console.log('Hi')  ← also not hoisted

// ═══ 4. THE BENEFIT: TOP-DOWN CODE ═══
function main() {
  const data = fetchData()        // call before declaration OK!
  const result = processData(data)
  return formatOutput(result)
}

// Helper functions below — thanks to hoisting
function fetchData() { /* ... */ }
function processData(data) { /* ... */ }
function formatOutput(result) { /* ... */ }`}</CodeBlock>

                    <Callout type="tip">Interview: {`"Hoisting is useful for function declarations to organize code top-down. But for variables, always use let/const — TDZ catches bugs early. var hoisting creates silent bugs with undefined — that's bad behavior to avoid."`}</Callout>
                </TopicModal>

                <TopicModal title="Scope & Closure" emoji="🔒" color="#a78bfa" summary="Lexical scope, closure patterns, module pattern">
                    <Paragraph><Highlight>Scope</Highlight> = the range of variable access. JS uses <Highlight>Lexical Scope</Highlight> — scope is determined at write time, not runtime.</Paragraph>
                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <div className="text-purple-400 font-bold text-sm">3 Types of Scope</div>
                            <div className="text-slate-300 text-sm mt-1">• <strong>Global</strong> — accessible everywhere<br />• <strong>Function</strong> — only accessible within the function<br />• <strong>Block</strong> (let/const) — only within {'{}'}</div>
                        </div>
                    </div>
                    <CodeBlock title="3-types-of-scope.js">{`// ═══ 1. GLOBAL SCOPE ═══
var globalVar = 'I am everywhere'       // global (var outside function)
let globalLet = 'I am also global'      // global (let outside block)
// → Accessible from ANYWHERE in the file

// ═══ 2. FUNCTION SCOPE ═══
function greet() {
  var secret = 'only I know'            // function scope
  let also = 'me too'                   // function scope (inside function)
  console.log(globalVar)                // ✅ accessing global OK
}
console.log(secret)                     // ❌ ReferenceError — outside function!

// ═══ 3. BLOCK SCOPE ═══ (let/const inside {})
if (true) {
  var leaked = 'I escaped!'            // ⚠️ var has NO block scope → leaks out of if
  let trapped = 'I am trapped'         // ✅ let HAS block scope → stays inside if
  const also = 'me too'                // ✅ const also has block scope
}
console.log(leaked)                     // ✅ 'I escaped!' — var leaks out of block!
console.log(trapped)                    // ❌ ReferenceError — let is trapped in block

// 📌 Summary:
// var   → function scope (ignores block {})
// let   → block scope    (respects block {})
// const → block scope    (like let, but no re-assignment)`}</CodeBlock>
                    <Paragraph><Highlight>Closure</Highlight> = a function that &quot;remembers&quot; the scope where it was created, even when executed elsewhere.</Paragraph>
                    <CodeBlock title="Closure classic example">{`function makeCounter() {
    let count = 0; // "Private" variable
    return {
        increment: () => ++count,
        getCount: () => count,
    };
}
const counter = makeCounter();
counter.increment(); // 1
counter.increment(); // 2
counter.getCount();  // 2
// count CANNOT be accessed directly!`}</CodeBlock>
                    <Callout type="warning">Classic interview question: &quot;Explain the output of a for loop + setTimeout&quot; — the answer relates to closure + var vs let.</Callout>
                    <CodeBlock title="Classic example: for + setTimeout">{`// ❌ Using var — prints 5, 5, 5, 5, 5
for (var i = 0; i < 5; i++) {
    setTimeout(() => console.log(i), 100);
}
// 🔍 STEP BY STEP:
// 1. The for loop runs SYNCHRONOUSLY: i = 0, 1, 2, 3, 4, then i = 5 → stops
// 2. setTimeout places 5 callbacks into the task queue (to run AFTER 100ms)
// 3. var has FUNCTION scope → there is only ONE variable i
// 4. After 100ms, all 5 callbacks run → they all read the SAME i → i = 5
//
// 📦 MEMORY: [i] ← ONLY 1 MEMORY CELL
// callback 1 → looks at [i]
// callback 2 → looks at [i]  ← SAME cell!
// callback 3 → looks at [i]
// After loop: [i] = 5 → all read 5

// ✅ Using let — prints 0, 1, 2, 3, 4
for (let i = 0; i < 5; i++) {
    setTimeout(() => console.log(i), 100);
}
// 🔍 EXPLANATION:
// let has BLOCK scope → each iteration creates a DIFFERENT variable i
// Iteration 0: creates i₀ = 0, callback captures i₀
// Iteration 1: creates i₁ = 1, callback captures i₁
// Iteration 2: creates i₂ = 2, callback captures i₂
// → Each callback closure "remembers" ITS OWN value of i
//
// 📦 MEMORY: [i₀] [i₁] [i₂] [i₃] [i₄] ← 5 SEPARATE CELLS
// callback 1 → looks at [i₀] = 0
// callback 2 → looks at [i₁] = 1  ← DIFFERENT cell!
// callback 3 → looks at [i₂] = 2
//
// 💡 SUMMARY:
// var = 1 shared memory cell → 5 callbacks all read that cell (already = 5)
// let = 5 separate memory cells → each callback reads its own cell (correct value)
//
// 🔑 CLOSURE here: callback "remembers" a reference to variable i when created.
// With var → remembers reference to 1 single variable (shared across the loop)
// With let → remembers reference to that iteration's own variable

// ✅ Fix with IIFE (old way before let existed)
for (var i = 0; i < 5; i++) {
    (function(j) {
        setTimeout(() => console.log(j), 100);
    })(i);
}
// IIFE creates a new function scope, "copies" the value of i into j
// → Same idea as let creating a new block scope`}</CodeBlock>
                </TopicModal>

                <TopicModal title="this keyword" emoji="👉" color="#f472b6" summary="this = the word 'me' in JS — changes based on who's calling (regular) or who wrote it (arrow)">
                    <Paragraph><InlineCode>this</InlineCode> in JS is like the word <Highlight>&quot;me&quot;</Highlight> — it changes depending on <strong>who&apos;s speaking</strong>:</Paragraph>

                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-pink-500/10 border border-pink-500/20">
                            <div className="text-pink-400 font-bold text-sm">{'🏠 Example: "My house"'}</div>
                            <div className="text-slate-300 text-sm mt-1 font-mono">
                                {'👨 Khuong says "my house" → Khuong\'s house'}<br />
                                {'👩 Lan says "my house" → Lan\'s house'}<br />
                                {'📞 Khuong asks Lan to say "my house" → LAN\'s house (not Khuong\'s!)'}<br /><br />
                                <strong>{'this = the word "me" — changes based on who\'s calling the function'}</strong>
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                            <div className="text-red-400 font-bold text-sm">{'🔴 Regular Function = Writing on paper ✍️'}</div>
                            <div className="text-slate-300 text-sm mt-1">
                                {'You write "my house" on paper → give it to someone else to read → "me" = the reader, not you!'}<br />
                                {'→ '}<strong>this changes</strong>{' depending on WHO is calling the function'}
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">{'🟢 Arrow Function = Voice recording 🎙️'}</div>
                            <div className="text-slate-300 text-sm mt-1">
                                {'You record "my house" with your voice → whoever presses play, the voice is still yours'}<br />
                                {'→ '}<strong>this is fixed</strong>{' = where the arrow function was CREATED'}
                            </div>
                        </div>
                    </div>

                    <Paragraph><Highlight>Arrow functions</Highlight> do NOT have their own this — they inherit this from the parent scope (lexical this). That&apos;s why arrow functions are ideal for callbacks.</Paragraph>
                    <CodeBlock title="this-each-rule.js">{`// 1️⃣ Default binding — this = window (browser) / undefined (strict mode)
function showThis() {
    console.log(this);
}
showThis(); // window (non-strict) / undefined (strict)

// 2️⃣ Implicit binding — this = object before the dot
const khuong = {
    name: 'Khuong',
    greet() { console.log('Hi, I am ' + this.name) }
};
khuong.greet(); // "Hi, I am Khuong" ✅

const fn = khuong.greet;
fn(); // "Hi, I am undefined" ❌ (lost context!)
// → When you detach a method from its object, this is lost!

// 3️⃣ Explicit binding — call / apply / bind (see detail below)
function introduce(greeting, emoji) {
    console.log(greeting + ', I am ' + this.name + ' ' + emoji);
}
const lan = { name: 'Lan' }
const binh = { name: 'Binh' }

introduce.call(lan, 'Hey', '👋');    // "Hey, I am Lan 👋"
introduce.apply(binh, ['Hi', '🤝']); // "Hi, I am Binh 🤝"
const boundFn = introduce.bind(lan, 'Hello');
boundFn('😄'); // "Hello, I am Lan 😄"

// 4️⃣ new binding — this = newly created object
function Person(name) {
    this.name = name; // this = new {}
}
const p = new Person('Minh');
console.log(p.name); // "Minh"

// 5️⃣ Arrow function — NO own this
const team = {
    name: 'Frontend',
    members: ['Khuong', 'Lan'],
    show() {
        this.members.forEach((m) => {
            console.log(m + ' belongs to team ' + this.name);
            // Arrow inherits this from show() → team
        });
    }
};
team.show();
// "Khuong belongs to team Frontend"
// "Lan belongs to team Frontend"`}</CodeBlock>

                    <CodeBlock title="call-bind-apply.js">{`// 🎯 call, bind, apply — 3 ways to "force" this for a function
//
// Real example: Khuong has an introduce() method
// but wants Lan to "speak on his behalf" → use call/apply/bind

function introduce(greeting) {
    return greeting + ', I am ' + this.name;
}

const khuong = { name: 'Khuong' }
const lan = { name: 'Lan' }

// ═══ CALL — invoke NOW, pass args ONE BY ONE ═══
introduce.call(khuong, 'Hey')  // "Hey, I am Khuong"
introduce.call(lan, 'Hi')     // "Hi, I am Lan"
// → call(thisArg, arg1, arg2, ...)

// ═══ APPLY — invoke NOW, pass args AS ARRAY ═══
introduce.apply(khuong, ['Hello'])  // "Hello, I am Khuong"
// → apply(thisArg, [arg1, arg2, ...])
// → Difference from call: args passed as ARRAY

// ═══ BIND — does NOT invoke, returns NEW function ═══
const khuongIntro = introduce.bind(khuong)
khuongIntro('Hey')   // "Hey, I am Khuong"
khuongIntro('Yo')    // "Yo, I am Khuong"
// → bind creates a new function with this "locked" = khuong
// → No matter how many times called, this stays the same

// 📌 SUMMARY:
// call  → invoke NOW + individual args  → fn.call(obj, a, b)
// apply → invoke NOW + ARRAY args       → fn.apply(obj, [a, b])
// bind  → create NEW function (no call) → const newFn = fn.bind(obj)

// 💡 When to use?
// call/apply: when you want to "borrow" a method once
// bind: when passing a function elsewhere (event handler, callback)

// Real example: bind in React (old class components)
// this.handleClick = this.handleClick.bind(this) ← keep this = component`}</CodeBlock>

                    <Callout type="tip">Priority order: <strong>new &gt; explicit (call/apply/bind) &gt; implicit (obj.method) &gt; default (window)</strong>. Arrow functions bypass all these rules.</Callout>
                </TopicModal>

                <TopicModal title="Prototype & Inheritance" emoji="🧬" color="#34d399" summary="Prototype = 'family inheritance' for objects — the chain works like asking your parents, then grandparents">
                    <Paragraph><InlineCode>Prototype</InlineCode> in JS is like <Highlight>&quot;family inheritance&quot;</Highlight> — children inherit assets from parents, grandparents:</Paragraph>

                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                            <div className="text-emerald-400 font-bold text-sm">{'👨‍👩‍👦 Example: Family Inheritance'}</div>
                            <div className="text-slate-300 text-sm mt-1 font-mono">
                                {'👴 Grandpa has: house, car, cookbook'}<br />
                                {'👨 Dad doesn\'t have his own house → borrows GRANDPA\'s house'}<br />
                                {'👦 Son doesn\'t have a car → asks DAD → dad doesn\'t have one either → asks GRANDPA'}<br /><br />
                                <strong>{'Prototype chain = family inheritance — keep asking up the chain until you find it!'}</strong>
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">{'🏠 Own property = Bought it YOURSELF'}</div>
                            <div className="text-slate-300 text-sm mt-1">
                                {'If son BUYS his own car → uses his own, no need to ask dad/grandpa.'}<br />
                                {'→ '}<strong>Own property always takes priority</strong>{' over the prototype chain'}
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                            <div className="text-red-400 font-bold text-sm">{'❌ Not found = End of family line'}</div>
                            <div className="text-slate-300 text-sm mt-1">
                                {'Son asks dad → dad asks grandpa → grandpa asks... nobody has it → undefined'}<br />
                                {'→ End of chain is always '}<strong>Object.prototype → null</strong>{' (no more ancestors!)'}
                            </div>
                        </div>
                    </div>

                    <Paragraph>JS uses <Highlight>Prototypal Inheritance</Highlight> — every object has a hidden link (<InlineCode>__proto__</InlineCode>) pointing to its prototype.</Paragraph>
                    <Paragraph>When you access a property that doesn&apos;t exist on the object, JS <strong>walks up the prototype chain</strong> until it reaches <InlineCode>null</InlineCode>.</Paragraph>
                    <CodeBlock title="Prototype chain">{`const grandpa = { house: '🏠', car: '🚗', cookbook: '📖' };
const dad = Object.create(grandpa); // dad.__proto__ = grandpa
dad.laptop = '💻'; // dad bought his own laptop

dad.laptop;   // '💻' (own property — bought it yourself!)
dad.house;    // '🏠' (from prototype chain — inherited from grandpa!)
dad.bitcoin;  // undefined (nobody in the family has it)

const child = Object.create(dad); // child.__proto__ = dad
child.phone = '📱'; // child bought their own phone

child.phone;    // '📱' (own property)
child.laptop;   // '💻' (inherited from dad)
child.house;    // '🏠' (inherited from grandpa — 2 levels up!)

// Chain: child → dad → grandpa → Object.prototype → null
// 👦 child → 👨 dad → 👴 grandpa → ❌ end`}</CodeBlock>

                    <CodeBlock title="prototype-practical-usage.js">{`// ═══ 1. WHY DOES [1,2,3].map() WORK? ═══
// Because .map() lives on Array.prototype!
const arr = [1, 2, 3]
arr.map(x => x * 2)  // [2, 4, 6]
// arr doesn't have .map() → JS goes up arr.__proto__ = Array.prototype → found!

// Same idea:
'hello'.toUpperCase() // String.prototype.toUpperCase
(5).toFixed(2)        // Number.prototype.toFixed

// ═══ 2. ADD METHOD TO ALL ARRAYS (Polyfill) ═══
Array.prototype.last = function() {
    return this[this.length - 1]
}
[1, 2, 3].last()  // 3 — ALL arrays now have .last()!
// ⚠️ Warning: don't modify built-in prototypes in production

// ═══ 3. METHOD BORROWING ═══
const arrayLike = { 0: 'a', 1: 'b', length: 2 }
// arrayLike is NOT an array → has no .join()
// → Borrow from Array.prototype:
Array.prototype.join.call(arrayLike, '-')  // "a-b"

// ═══ 4. PERFORMANCE: PROTOTYPE vs INSTANCE ═══
// ❌ Each instance RECREATES the function → wastes memory
function Dog(name) {
    this.name = name
    this.bark = function() { return this.name + ' woof!' }
    // → 1000 dogs = 1000 copies of bark()
}

// ✅ Put on prototype → SHARE 1 single function
function Dog(name) { this.name = name }
Dog.prototype.bark = function() { return this.name + ' woof!' }
// → 1000 dogs still share just 1 bark() on prototype!

// ═══ 5. hasOwnProperty — OWN vs INHERITED ═══
const child = Object.create({ inherited: true })
child.own = true
child.hasOwnProperty('own')       // true  — own property
child.hasOwnProperty('inherited') // false — inherited from prototype`}</CodeBlock>
                    <Callout type="warning">ES6 Class is just <Highlight>syntactic sugar</Highlight> — underneath it still uses prototypes. Understanding prototypes = understanding JS at a deep level.</Callout>
                </TopicModal>

                <TopicModal title="OOP in JavaScript" emoji="🏗️" color="#f59e0b" summary="4 pillars of OOP: Encapsulation, Inheritance, Polymorphism, Abstraction — JS uses Prototypal OOP, class is just sugar">
                    <Paragraph>JS uses <Highlight>Prototypal OOP</Highlight> — objects inherit directly from other objects, no class blueprint needed like Java/C#. ES6 Class is just syntactic sugar wrapping prototypes.</Paragraph>

                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                            <div className="text-yellow-400 font-bold text-sm">4 Pillars of OOP</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Encapsulation</strong> — bundle data + methods, hide internal details<br />
                                • <strong>Inheritance</strong> — inherit features from parent class<br />
                                • <strong>Polymorphism</strong> — same method, different behavior per subclass<br />
                                • <strong>Abstraction</strong> — hide complexity, expose only what{"'"}s needed
                            </div>
                        </div>
                    </div>

                    <CodeBlock title="oop-in-js.js">{`// ═══ 1. ENCAPSULATION ═══
class BankAccount {
  #balance = 0  // # = private field (ES2022)

  deposit(amount) { this.#balance += amount }
  getBalance() { return this.#balance }
}
const acc = new BankAccount()
acc.deposit(100)
acc.#balance    // ❌ SyntaxError — private!
acc.getBalance() // ✅ 100

// ═══ 2. INHERITANCE ═══
class Animal {
  constructor(name) { this.name = name }
  speak() { return \`\${this.name} makes a sound\` }
}
class Dog extends Animal {
  speak() { return \`\${this.name} barks 🐕\` } // override parent
}
new Dog('Rex').speak() // "Rex barks 🐕"

// ═══ 3. POLYMORPHISM ═══
const animals = [new Animal('Cat'), new Dog('Rex')]
animals.forEach(a => console.log(a.speak()))
// "Cat makes a sound"
// "Rex barks 🐕"  ← same .speak(), different output!

// ═══ 4. ABSTRACTION ═══
class Shape {
  area() { throw new Error('Must implement area()!') }
}
class Circle extends Shape {
  constructor(r) { super(); this.r = r }
  area() { return Math.PI * this.r ** 2 }
}
// new Shape().area() → ❌ Error — forces subclass to implement`}</CodeBlock>

                    <CodeBlock title="class-vs-prototype.js">{`// ES6 Class IS JUST syntactic sugar:
class Person {
  greet() { return 'Hi' }
}
// ↑ equivalent to ↓
function Person() {}
Person.prototype.greet = function() { return 'Hi' }

typeof Person // "function" — class is NOT a new data type!`}</CodeBlock>

                    <Callout type="tip">Interview: {`"JS uses prototypal inheritance — objects inherit directly from objects. ES6 class is syntactic sugar, underneath it's still prototype chain. Unlike Java, there's no rigid 'blueprint' — everything is an object."`}</Callout>
                </TopicModal>

                <TopicModal title="Functional Programming" emoji="λ" color="#06b6d4" summary="Pure functions, immutability, higher-order functions, composition — the other paradigm JS excels at">
                    <Paragraph>JS is <Highlight>multi-paradigm</Highlight> — supports both OOP and FP. Modern React heavily uses FP patterns (hooks, pure components, composition over inheritance).</Paragraph>

                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                            <div className="text-cyan-400 font-bold text-sm">Core FP Principles</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Pure Functions</strong> — same input → same output, no side effects<br />
                                • <strong>Immutability</strong> — never mutate, always create new data<br />
                                • <strong>Higher-Order Functions</strong> — functions as arguments/return values<br />
                                • <strong>Composition</strong> — combine small functions into complex ones
                            </div>
                        </div>
                    </div>

                    <CodeBlock title="functional-programming.js">{`// ═══ 1. PURE vs IMPURE ═══
// ❌ Impure — modifies external state
let total = 0
function addToTotal(x) { total += x; return total }

// ✅ Pure — no side effects, predictable
function add(a, b) { return a + b }
add(2, 3) // always 5, no matter how many times called

// ═══ 2. IMMUTABILITY ═══
// ❌ Mutate
const arr = [1, 2, 3]
arr.push(4) // modifies original array!

// ✅ Immutable — create NEW array
const newArr = [...arr, 4]
const updated = arr.map(x => x * 2) // [2, 4, 6] — original unchanged

// ═══ 3. HIGHER-ORDER FUNCTIONS ═══
// Function that takes/returns functions
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
const compose = (...fns) => (x) => fns.reduceRight((v, f) => f(v), x)
const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x)

const addOne = x => x + 1
const square = x => x * x

const transform = pipe(addOne, square, double)
transform(3)  // pipe: 3 → 4 → 16 → 32`}</CodeBlock>

                    <Callout type="tip">Interview: {`"React hooks are FP in action — useState is a closure, useEffect manages side effects separately, components are pure functions of props. FP makes React code predictable and testable."`}</Callout>
                </TopicModal>

                <TopicModal title="Callback" emoji="📞" color="#ef4444" summary="A function passed into another function — the foundation of async JS, event handling, and higher-order functions">
                    <Paragraph><Highlight>Callback</Highlight> = a function passed as an argument to another function, to be called back when needed. This is the foundation of everything async in JS.</Paragraph>

                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                            <div className="text-red-400 font-bold text-sm">Where are callbacks?</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <InlineCode>addEventListener</InlineCode> — click handler is a callback<br />
                                • <InlineCode>setTimeout</InlineCode> — function runs after delay<br />
                                • <InlineCode>.map()</InlineCode>, <InlineCode>.filter()</InlineCode> — transform function is a callback<br />
                                • <InlineCode>fetch().then()</InlineCode> — .then() receives a callback<br />
                                • Node.js — <InlineCode>fs.readFile(path, callback)</InlineCode>
                            </div>
                        </div>
                    </div>

                    <CodeBlock title="callback.js">{`// ═══ BASIC CALLBACK ═══
function greet(name, callback) {
  console.log('Hi ' + name)
  callback() // call back the function passed in
}
greet('Khuong', () => console.log('Done!'))
// "Hi Khuong" → "Done!"

// ═══ ASYNC CALLBACK ═══
console.log('1. Start')
setTimeout(() => {
  console.log('2. Callback runs after 1 second')
}, 1000)
console.log('3. Code continues (doesn\\'t wait)')
// Output: 1 → 3 → 2 (after 1s)

// ═══ CALLBACK HELL ═══ (the biggest problem)
// ❌ Nested callbacks 5-6 levels deep → hard to read, hard to debug
getUser(id, (user) => {
  getOrders(user, (orders) => {
    getDetails(orders[0], (detail) => {
      getShipping(detail, (shipping) => {
        // 😵 pyramid of doom!
      })
    })
  })
})

// ✅ Fix with Promise → async/await
const user = await getUser(id)
const orders = await getOrders(user)
const detail = await getDetails(orders[0])
const shipping = await getShipping(detail)
// 🎉 flat, readable, debuggable!`}</CodeBlock>

                    <Callout type="warning">Callback hell is why Promises were created → then async/await was created. Understanding callbacks = understanding <Highlight>why</Highlight> we need Promise/async-await.</Callout>
                </TopicModal>

                <TopicModal title="Event Loop" emoji="🔄" color="#60a5fa" summary="Call Stack, Microtask Queue, Macrotask Queue">
                    <Paragraph>JS is <Highlight>single-threaded</Highlight> but handles async thanks to the <Highlight>Event Loop</Highlight>. Understanding the Event Loop = understanding why async code runs in a &quot;strange&quot; order.</Paragraph>
                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">Priority Order</div>
                            <div className="text-slate-300 text-sm mt-1">1. <strong>Call Stack</strong> — synchronous code runs first<br />2. <strong>Microtask Queue</strong> — Promise.then, queueMicrotask, MutationObserver<br />3. <strong>Macrotask Queue</strong> — setTimeout, setInterval, I/O</div>
                        </div>
                    </div>
                    <CodeBlock title="Guess the output">{`console.log('1'); // Call Stack
setTimeout(() => console.log('2'), 0); // Macrotask
Promise.resolve().then(() => console.log('3')); // Microtask
console.log('4'); // Call Stack

// Output: 1 → 4 → 3 → 2`}</CodeBlock>
                    <Callout type="tip">This is the #1 JS interview question. Always remember: <Highlight>Sync → Microtask → Macrotask</Highlight>.</Callout>
                    <a href="/blogs/event-loop" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 Read detailed article →</a>
                </TopicModal>

                <TopicModal title="Async/Await & Promises" emoji="⚡" color="#fbbf24" summary="What is a Promise, 3 states, Promise.all/race/allSettled, async/await, error handling">
                    <Paragraph><Highlight>Promise</Highlight> is an object representing the eventual result (success or failure) of an asynchronous operation (like API calls, file reads). It solves the <Highlight>&quot;callback hell&quot;</Highlight> problem by providing <InlineCode>.then()</InlineCode> and <InlineCode>.catch()</InlineCode> syntax for cleaner, more maintainable code.</Paragraph>

                    <Heading3>3 States of a Promise</Heading3>
                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                            <div className="text-yellow-400 font-bold text-sm">⏳ Pending (Waiting)</div>
                            <div className="text-slate-300 text-sm mt-1">Initial state — the async operation has not completed yet. The Promise is still &quot;waiting&quot; for a result.</div>
                        </div>
                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">✅ Fulfilled / Resolved (Success)</div>
                            <div className="text-slate-300 text-sm mt-1">The operation completed successfully, the Promise has a result (value). Triggers the callback in <InlineCode>.then()</InlineCode>.</div>
                        </div>
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                            <div className="text-red-400 font-bold text-sm">❌ Rejected (Failed)</div>
                            <div className="text-slate-300 text-sm mt-1">The operation failed, the Promise returns an error (reason). Triggers the callback in <InlineCode>.catch()</InlineCode>.</div>
                        </div>
                    </div>

                    <Heading3>How It Works</Heading3>
                    <CodeBlock title="Creating and using a Promise">{`const myPromise = new Promise((resolve, reject) => {
  // Perform async operation
  let success = true;
  if (success) {
    resolve("Data received"); // → Fulfilled
  } else {
    reject("Something failed"); // → Rejected
  }
});

myPromise
  .then((data) => console.log(data))   // Handle success
  .catch((error) => console.error(error)) // Handle error
  .finally(() => console.log("Done")); // Runs regardless`}</CodeBlock>

                    <Heading3>async/await — Syntactic Sugar</Heading3>
                    <Paragraph><InlineCode>async/await</InlineCode> was introduced in ES2017. It lets you write async code that looks synchronous — much easier to read and debug than <InlineCode>.then()</InlineCode> chains.</Paragraph>

                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                            <div className="text-yellow-400 font-bold text-sm">async — Marks a function as asynchronous</div>
                            <div className="text-slate-300 text-sm mt-1">• Adding <InlineCode>async</InlineCode> before a function → it <strong>always returns a Promise</strong><br />• If you return a plain value, JS auto-wraps it as <InlineCode>Promise.resolve(value)</InlineCode><br />• If you throw an error, JS auto-wraps it as <InlineCode>Promise.reject(error)</InlineCode></div>
                        </div>
                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">await — Pauses and waits for Promise to resolve</div>
                            <div className="text-slate-300 text-sm mt-1">• <InlineCode>await</InlineCode> can only be used <strong>inside async functions</strong> (or top-level modules)<br />• When hitting <InlineCode>await</InlineCode>, JS <strong>pauses</strong> that function, returns control to the Event Loop<br />• When the Promise resolves → JS <strong>resumes</strong> from the next line<br />• When the Promise rejects → throws an error (catch with <InlineCode>try/catch</InlineCode>)</div>
                        </div>
                    </div>

                    <CodeBlock title="async keyword explained">{`// async functions ALWAYS return a Promise
async function getNumber() {
  return 42; // Auto-wrapped → Promise.resolve(42)
}
getNumber().then(n => console.log(n)); // 42

// Equivalent to:
function getNumber() {
  return Promise.resolve(42);
}

// async + throw = Promise.reject
async function failHard() {
  throw new Error("Oops!"); // → Promise.reject(Error("Oops!"))
}
failHard().catch(err => console.log(err.message)); // "Oops!"`}</CodeBlock>

                    <CodeBlock title="How await works">{`async function fetchUser() {
  console.log("1. Starting fetch");

  // await PAUSES the function here
  // Event Loop keeps running, handling other tasks
  const res = await fetch('/api/user'); // ⏸️ waiting...

  // When fetch completes → RESUMES from here
  console.log("2. Fetch done, parsing JSON");
  const user = await res.json(); // ⏸️ waiting again...

  console.log("3. Got data:", user.name);
  return user;
}

// OUTSIDE, code runs normally (non-blocking)
fetchUser();
console.log("4. This runs IMMEDIATELY, doesn't wait");
// Output: 1 → 4 → 2 → 3`}</CodeBlock>

                    <Heading3>⚠️ Common Mistake: Sequential vs Parallel</Heading3>
                    <CodeBlock title="Watch out: await sequential vs parallel">{`// ❌ WRONG: Runs sequentially — slow!
async function slow() {
  const users = await fetch('/api/users');  // 2s
  const posts = await fetch('/api/posts');  // 2s
  // Total: 4 seconds! Waits for users before fetching posts
}

// ✅ RIGHT: Runs in parallel — fast!
async function fast() {
  const [users, posts] = await Promise.all([
    fetch('/api/users'),   // 2s
    fetch('/api/posts'),   // 2s (runs simultaneously!)
  ]);
  // Total: 2 seconds! Both requests run concurrently
}

// ✅ Or: Start promises first, await later
async function alsoFast() {
  const usersPromise = fetch('/api/users');  // Starts immediately
  const postsPromise = fetch('/api/posts');  // Starts immediately

  const users = await usersPromise;  // Wait for result
  const posts = await postsPromise;  // Already done (or nearly)
}`}</CodeBlock>

                    <Heading3>Error Handling Patterns</Heading3>
                    <CodeBlock title="Different ways to handle errors">{`// Pattern 1: try/catch (most common)
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

// Pattern 2: .catch() on individual awaits
async function loadData() {
  const data = await fetch('/api/data')
    .then(r => r.json())
    .catch(() => null); // No crash, returns null on error
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

// Usage:
const [err, user] = await to(fetch('/api/user').then(r => r.json()));
if (err) console.error('Error:', err);`}</CodeBlock>

                    <CodeBlock title="Comparing then() vs async/await">{`// ❌ Promise chain — hard to read when nested
fetch('/api/user')
  .then(res => res.json())
  .then(user => fetch('/api/posts/' + user.id))
  .then(res => res.json())
  .then(posts => console.log(posts))
  .catch(err => console.error(err));

// ✅ async/await — clear and debuggable
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

                    <Heading3>Key Methods</Heading3>
                    <div className="my-3 overflow-x-auto">
                        <table className="w-full text-sm border-collapse">
                            <thead><tr className="border-b border-[var(--border-primary)]"><th className="text-left p-2 text-slate-400">Method</th><th className="text-left p-2 text-slate-400">Behavior</th><th className="text-left p-2 text-slate-400">When to use</th></tr></thead>
                            <tbody className="text-[var(--text-secondary)]">
                                <tr className="border-b border-gray-100"><td className="p-2"><InlineCode>Promise.all</InlineCode></td><td className="p-2">Run in parallel, <strong>rejects if any fails</strong></td><td className="p-2">Fetch multiple APIs, all are required</td></tr>
                                <tr className="border-b border-gray-100"><td className="p-2"><InlineCode>Promise.allSettled</InlineCode></td><td className="p-2">Run in parallel, <strong>waits for all</strong> (even failures)</td><td className="p-2">Batch operations where you need each result</td></tr>
                                <tr className="border-b border-gray-100"><td className="p-2"><InlineCode>Promise.race</InlineCode></td><td className="p-2">Returns <strong>first result</strong> (fulfilled or rejected)</td><td className="p-2">Timeout patterns, fastest response</td></tr>
                                <tr><td className="p-2"><InlineCode>Promise.any</InlineCode></td><td className="p-2">Returns <strong>first fulfilled</strong>, ignores rejected</td><td className="p-2">Fallback servers, first successful result</td></tr>
                            </tbody>
                        </table>
                    </div>
                    <CodeBlock title="Promise methods examples">{`// Promise.all — fail fast
const [users, posts] = await Promise.all([
  fetch('/api/users').then(r => r.json()),
  fetch('/api/posts').then(r => r.json()),
]); // If 1 fails → both are rejected!

// Promise.allSettled — wait for all
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

                    <Heading3>Benefits of Promises</Heading3>
                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">🧹 Avoid Callback Hell</div>
                            <div className="text-slate-300 text-sm mt-1">Instead of 5-6 nested callbacks, use <InlineCode>.then()</InlineCode> chains or <InlineCode>async/await</InlineCode> — flat, readable code.</div>
                        </div>
                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">🛡️ Better Error Handling</div>
                            <div className="text-slate-300 text-sm mt-1">A single <InlineCode>.catch()</InlineCode> catches all errors in the chain. With <InlineCode>async/await</InlineCode>, use the familiar <InlineCode>try/catch</InlineCode>.</div>
                        </div>
                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <div className="text-purple-400 font-bold text-sm">⚡ Easy Parallelism</div>
                            <div className="text-slate-300 text-sm mt-1"><InlineCode>Promise.all</InlineCode> lets you run multiple async tasks concurrently — significantly faster than sequential execution.</div>
                        </div>
                    </div>

                    <Callout type="warning">Always use <InlineCode>try/catch</InlineCode> with async/await. Unhandled Promise rejections will crash the Node.js process!</Callout>
                    <Callout type="tip">Interview tip: Being able to explain the difference between <InlineCode>Promise.all</InlineCode> vs <InlineCode>Promise.allSettled</InlineCode> and when to use each — very common question.</Callout>
                    <a href="/blogs/callback-promise-async-await" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 Read detailed article →</a>
                </TopicModal>

                <TopicModal title="ES6+ Features" emoji="✨" color="#38bdf8" summary="destructuring, spread, modules, optional chaining, nullish coalescing">
                    <Paragraph>Features you <Highlight>must master</Highlight> — interviewers expect you to write modern JS.</Paragraph>
                    <div className="my-3 space-y-2">
                        {[
                            ['Destructuring', 'const { name, age } = user; const [first, ...rest] = arr;'],
                            ['Spread / Rest', 'const merged = { ...a, ...b }; function sum(...nums) {}'],
                            ['Template Literals', '`Hello ${name}, you are ${age} years old`'],
                            ['Optional Chaining', 'user?.address?.street // undefined instead of crash'],
                            ['Nullish Coalescing', 'value ?? defaultValue // only null/undefined triggers fallback'],
                            ['ES Modules', 'import/export — static analysis, tree shaking'],
                        ].map(([title, desc]) => (
                            <div key={title} className="p-2 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                                <div className="text-blue-400 text-sm font-medium">{title}</div>
                                <div className="text-[var(--text-secondary)] text-xs font-mono mt-0.5">{desc}</div>
                            </div>
                        ))}
                    </div>
                    <a href="/blogs/ecmascript-features" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 Read detailed article →</a>
                </TopicModal>

                <TopicModal title="Regular Expressions (Regex)" emoji="🔍" color="#ec4899" summary={'Regex = "Find WHAT, HOW MANY, WHERE" — the most powerful text processing tool in any language'}>
                    <Paragraph>Regex looks scary but you only need to remember <Highlight>3 questions</Highlight>: Find <strong>WHAT</strong>? <strong>How many</strong>? <strong>Where</strong>?</Paragraph>

                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-pink-500/10 border border-pink-500/20">
                            <div className="text-pink-400 font-bold text-sm">1. Find WHAT? (Character Classes)</div>
                            <div className="text-slate-300 text-sm mt-1">
                                <InlineCode>.</InlineCode> any character &nbsp;|&nbsp; <InlineCode>\d</InlineCode> = <strong>d</strong>igit (0-9) &nbsp;|&nbsp; <InlineCode>\w</InlineCode> = <strong>w</strong>ord (a-z, 0-9, _) &nbsp;|&nbsp; <InlineCode>\s</InlineCode> = <strong>s</strong>pace<br />
                                UPPERCASE = negation: <InlineCode>\D</InlineCode> = not a digit, <InlineCode>\W</InlineCode> = not a word char<br />
                                <InlineCode>[abc]</InlineCode> = a or b or c &nbsp;|&nbsp; <InlineCode>[^abc]</InlineCode> = NOT a, b, or c
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">2. HOW MANY? (Quantifiers)</div>
                            <div className="text-slate-300 text-sm mt-1">
                                <InlineCode>*</InlineCode> = 0 or more (star = infinite) &nbsp;|&nbsp; <InlineCode>+</InlineCode> = 1 or more (plus = at least 1)<br />
                                <InlineCode>?</InlineCode> = 0 or 1 (optional) &nbsp;|&nbsp; <InlineCode>{'{3}'}</InlineCode> = exactly 3 times &nbsp;|&nbsp; <InlineCode>{'{2,5}'}</InlineCode> = 2 to 5 times
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">3. WHERE? (Anchors)</div>
                            <div className="text-slate-300 text-sm mt-1">
                                <InlineCode>^</InlineCode> = start of string &nbsp;|&nbsp; <InlineCode>$</InlineCode> = end of string &nbsp;|&nbsp; <InlineCode>\b</InlineCode> = word <strong>b</strong>oundary
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                            <div className="text-yellow-400 font-bold text-sm">4. Groups & Advanced</div>
                            <div className="text-slate-300 text-sm mt-1">
                                <InlineCode>(abc)</InlineCode> = capture group &nbsp;|&nbsp; <InlineCode>{'(?:abc)'}</InlineCode> = non-capturing group &nbsp;|&nbsp; <InlineCode>a|b</InlineCode> = a OR b<br />
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
                                            <th className="text-left py-1.5 pr-2 text-slate-400 font-semibold">Meaning</th>
                                            <th className="text-left py-1.5 text-slate-400 font-semibold">Memory trick</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-slate-300">
                                        <tr className="border-b border-white/5"><td className="py-1.5 pr-2 font-mono text-pink-400">\d</td><td className="py-1.5 pr-2">Digit 0-9</td><td className="py-1.5"><strong>d</strong>igit</td></tr>
                                        <tr className="border-b border-white/5"><td className="py-1.5 pr-2 font-mono text-pink-400">\w</td><td className="py-1.5 pr-2">Word char</td><td className="py-1.5"><strong>w</strong>ord</td></tr>
                                        <tr className="border-b border-white/5"><td className="py-1.5 pr-2 font-mono text-pink-400">\s</td><td className="py-1.5 pr-2">Whitespace</td><td className="py-1.5"><strong>s</strong>pace</td></tr>
                                        <tr className="border-b border-white/5"><td className="py-1.5 pr-2 font-mono text-blue-400">*</td><td className="py-1.5 pr-2">0 or more</td><td className="py-1.5">Star = infinite</td></tr>
                                        <tr className="border-b border-white/5"><td className="py-1.5 pr-2 font-mono text-blue-400">+</td><td className="py-1.5 pr-2">1 or more</td><td className="py-1.5">Plus = at least 1</td></tr>
                                        <tr className="border-b border-white/5"><td className="py-1.5 pr-2 font-mono text-blue-400">?</td><td className="py-1.5 pr-2">0 or 1</td><td className="py-1.5">Question = optional</td></tr>
                                        <tr className="border-b border-white/5"><td className="py-1.5 pr-2 font-mono text-green-400">^</td><td className="py-1.5 pr-2">Start of string</td><td className="py-1.5">Hat = on top</td></tr>
                                        <tr><td className="py-1.5 pr-2 font-mono text-green-400">$</td><td className="py-1.5 pr-2">End of string</td><td className="py-1.5">Dollar = the end</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <CodeBlock title="regex-practical.js">{`// ═══ 5 MOST USED REGEX (know these = 90% covered) ═══

// 1. Validate phone number (10 digits, starts with 0)
const phoneRegex = /^0\\d{9}$/
phoneRegex.test('0901234567')  // true
phoneRegex.test('901234567')   // false (missing leading 0)

// 2. Simple email validation
const emailRegex = /\\w+@\\w+\\.\\w+/
emailRegex.test('khuong@gmail.com')  // true

// 3. Validate URL
const urlRegex = /^https?:\\/\\/.+/
urlRegex.test('https://example.com')  // true

// 4. Match comma-separated numbers: "1,000,000"
const numberRegex = /\\d{1,3}(,\\d{3})*/
'1,000,000'.match(numberRegex)  // ["1,000,000"]

// 5. Extract slug (kebab-case)
const slugRegex = /[-\\w]+/g
'hello-world 123'.match(slugRegex)  // ["hello-world", "123"]

// ═══ REGEX METHODS IN JS ═══
const str = 'Khuong - age 25, Lan - age 23'

// test() → true/false
/\\d+/.test(str)                    // true

// match() → find matches
str.match(/\\d+/g)                  // ["25", "23"]

// replace() → substitute
str.replace(/\\d+/g, 'XX')          // "Khuong - age XX, Lan - age XX"

// matchAll() → iterator with capture groups
const regex = /(\\w+) - age (\\d+)/g
for (const m of str.matchAll(regex)) {
  console.log(m[1], m[2])         // "Khuong" "25", "Lan" "23"
}

// ═══ READ REGEX LIKE A SENTENCE (left → right) ═══
// ^0\\d{9}$
// ^ start → 0 → \\d{9} nine digits → $ end
// = "String starts with 0, followed by 9 digits, end"`}</CodeBlock>

                    <Callout type="info">💡 <strong>Pro tip</strong>: You don&apos;t need to memorize all regex — just know enough to <Highlight>read and understand</Highlight> other people&apos;s regex + use <a href="https://regex101.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">regex101.com</a> to build and test when needed.</Callout>
                    <Callout type="tip">Interview: {`"Regex works by answering 3 questions: find WHAT (\\d, \\w, [abc]), HOW MANY (*, +, {n}), WHERE (^, $, \\b). Read left to right like a sentence."`}</Callout>
                </TopicModal>

                <TopicModal title="Dynamic Import + Suspense" emoji="📦" color="#8b5cf6" summary="Code splitting — split bundle into small chunks, load on demand, reduce page load time">
                    <Paragraph><Highlight>Dynamic Import</Highlight> lets you load code <strong>when needed</strong> instead of loading everything upfront — smaller bundle, faster page render.</Paragraph>

                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-violet-500/10 border border-violet-500/20">
                            <div className="text-violet-400 font-bold text-sm">Static vs Dynamic Import</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Static</strong>: <InlineCode>import X from Y</InlineCode> — loads EVERYTHING upfront, big bundle<br />
                                • <strong>Dynamic</strong>: <InlineCode>{'import(\'./X\')'}</InlineCode> — loads WHEN NEEDED, splits into small chunks
                            </div>
                        </div>
                    </div>

                    <CodeBlock title="dynamic-import.js">{`// ═══ STATIC IMPORT — loads EVERYTHING upfront ═══
import HeavyChart from './HeavyChart' // 500KB in main bundle

// ═══ DYNAMIC IMPORT — loads WHEN NEEDED ═══
const module = await import('./HeavyChart') // returns a Promise!
const HeavyChart = module.default

// ═══ Without Dynamic Import ═══
// [main.js: 2MB] ← user waits for ALL 2MB before seeing the page

// ═══ With Dynamic Import ═══
// [main.js: 500KB] → page shows IMMEDIATELY
//   ↓ user clicks "View chart"
// [chart-chunk.js: 300KB] → only loads now
//   ↓ user opens settings
// [settings-chunk.js: 200KB] → loads later`}</CodeBlock>

                    <CodeBlock title="react-lazy-suspense.jsx">{`// ═══ 1. React.lazy + Suspense ═══
import { lazy, Suspense } from 'react'

const HeavyChart = lazy(() => import('./HeavyChart'))
// → Component does NOT load upfront
// → Only downloads when component renders for the first time

function Dashboard() {
  return (
    <Suspense fallback={<div>Loading chart...</div>}>
      <HeavyChart />
    </Suspense>
  )
}
// Suspense "catches" the loading state
// → shows fallback → swaps when chunk finishes loading

// ═══ 2. Next.js dynamic() — more options ═══
import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('./HeavyChart'), {
  loading: () => <p>Loading...</p>,  // fallback UI
  ssr: false  // do NOT render on server (for window, canvas, etc.)
})

// ═══ 3. WHEN TO USE? ═══
// ✅ Heavy components (chart, editor, map) → reduce initial bundle
// ✅ Rarely-seen components (modal, hidden tabs) → load on demand
// ✅ Components using browser APIs (window, canvas) → ssr: false
// ❌ Lightweight, always-visible components → use static import`}</CodeBlock>

                    <Callout type="tip">Interview: {`"Dynamic import = code splitting. Split bundle into chunks, load on demand. React.lazy + Suspense handles loading UI. Next.js dynamic() adds ssr: false for client-only components."`}</Callout>
                </TopicModal>

                <TopicModal title="Type Coercion" emoji="🔀" color="#f97316" summary="== only checks value (auto-converts type), === checks both type AND value — always use ===">
                    <Paragraph><InlineCode>==</InlineCode> and <InlineCode>===</InlineCode> differ by <Highlight>one single step</Highlight>: whether types are auto-converted or not.</Paragraph>

                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">✅ === (Strict Equality) — Real comparison</div>
                            <div className="text-slate-300 text-sm mt-1">
                                <strong>Step 1:</strong> Check type → different type? → <strong>false immediately</strong>, no further check<br />
                                <strong>Step 2:</strong> Same type → compare value<br /><br />
                                <InlineCode>1 === &quot;1&quot;</InlineCode> → number ≠ string → <strong>false immediately</strong> (no conversion)<br />
                                <InlineCode>1 === 1</InlineCode> → number = number → compare value → <strong>true</strong>
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                            <div className="text-red-400 font-bold text-sm">⚠️ == (Loose Equality) — Compares WITH conversion</div>
                            <div className="text-slate-300 text-sm mt-1">
                                <strong>Step 1:</strong> Check type → same type? → compare normally<br />
                                <strong>Step 2:</strong> Different type? → <strong>AUTO-CONVERT</strong> then compare<br /><br />
                                <InlineCode>1 == &quot;1&quot;</InlineCode> → number ≠ string → convert &quot;1&quot; → 1 → <InlineCode>1 == 1</InlineCode> → <strong>true</strong><br />
                                Problem: you DON&apos;T know how JS will convert → <strong>unexpected bugs!</strong>
                            </div>
                        </div>
                    </div>

                    <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20 my-3">
                        <div className="text-orange-400 font-bold text-sm">🔄 How does == convert? (This is the confusing part)</div>
                        <div className="text-slate-300 text-sm mt-2 space-y-1">
                            <div>① <strong>null == undefined</strong> → true (special rule, only equal to each other)</div>
                            <div>② <strong>number vs string</strong> → convert string → number: <InlineCode>&quot;5&quot; → 5</InlineCode></div>
                            <div>③ <strong>boolean vs anything</strong> → convert boolean → number first: <InlineCode>true → 1, false → 0</InlineCode></div>
                            <div>④ <strong>object vs primitive</strong> → call .valueOf() or .toString(): <InlineCode>[] → &quot;&quot; → 0</InlineCode></div>
                        </div>
                    </div>

                    <CodeBlock title="type-coercion.js">{`// ═══ === STRICT: Different type = false IMMEDIATELY ═══
1 === "1"      // false ← number ≠ string, stop
0 === false    // false ← number ≠ boolean, stop
"" === false   // false ← string ≠ boolean, stop
null === undefined // false ← different types!

// ═══ == LOOSE: Auto-convert then compare ═══
1 == "1"       // true  ← "1" → 1, then 1 == 1 ✓

// ⚠️ Confusing cases:
0 == false     // true  ← false → 0, then 0 == 0 ✓
"" == false    // true  ← false → 0, "" → 0, then 0 == 0 ✓
"" == 0        // true  ← "" → 0, then 0 == 0 ✓
[] == false    // true  ← [] → "" → 0, false → 0, then 0 == 0 ✓
[] == 0        // true  ← [] → "" → 0, then 0 == 0 ✓
"0" == false   // true  ← false → 0, "0" → 0, then 0 == 0 ✓

// 🤯 WTF cases:
[] == ![]      // true!! ← ![] = false → 0, [] → "" → 0
NaN == NaN     // false! ← NaN is not equal to itself

// ═══ ONLY useful case for == ═══
// Check null OR undefined at once
if (x == null) { /* x is null OR undefined */ }
// equivalent to:
if (x === null || x === undefined) { /* longer */ }

// ═══ TRUTHY / FALSY ═══
// 6 FALSY values (memorize these):
// false, 0, "", null, undefined, NaN
// EVERYTHING else = TRUTHY (including [], {}, "0", "false"!)`}</CodeBlock>

                    <div className="p-3 rounded-lg bg-gray-500/10 border border-gray-500/20 my-3">
                        <div className="text-gray-300 font-bold text-sm">📊 Quick comparison</div>
                        <div className="text-slate-300 text-sm mt-2">
                            <div className="overflow-x-auto">
                                <table className="w-full text-xs">
                                    <thead>
                                        <tr className="border-b border-white/10">
                                            <th className="text-left py-1.5 pr-2 text-slate-400 font-semibold">Expression</th>
                                            <th className="text-left py-1.5 pr-2 text-slate-400 font-semibold">==</th>
                                            <th className="text-left py-1.5 pr-2 text-slate-400 font-semibold">===</th>
                                            <th className="text-left py-1.5 text-slate-400 font-semibold">Why?</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-slate-300">
                                        <tr className="border-b border-white/5"><td className="py-1.5 pr-2 font-mono">1 vs &quot;1&quot;</td><td className="py-1.5 pr-2 text-yellow-400">true</td><td className="py-1.5 pr-2 text-green-400">false</td><td className="py-1.5">== converts &quot;1&quot;→1</td></tr>
                                        <tr className="border-b border-white/5"><td className="py-1.5 pr-2 font-mono">0 vs false</td><td className="py-1.5 pr-2 text-yellow-400">true</td><td className="py-1.5 pr-2 text-green-400">false</td><td className="py-1.5">== converts false→0</td></tr>
                                        <tr className="border-b border-white/5"><td className="py-1.5 pr-2 font-mono">&quot;&quot; vs false</td><td className="py-1.5 pr-2 text-yellow-400">true</td><td className="py-1.5 pr-2 text-green-400">false</td><td className="py-1.5">== converts both→0</td></tr>
                                        <tr className="border-b border-white/5"><td className="py-1.5 pr-2 font-mono">null vs undefined</td><td className="py-1.5 pr-2 text-yellow-400">true</td><td className="py-1.5 pr-2 text-green-400">false</td><td className="py-1.5">== special rule</td></tr>
                                        <tr className="border-b border-white/5"><td className="py-1.5 pr-2 font-mono">[] vs false</td><td className="py-1.5 pr-2 text-yellow-400">true</td><td className="py-1.5 pr-2 text-green-400">false</td><td className="py-1.5">== converts []→&quot;&quot;→0</td></tr>
                                        <tr><td className="py-1.5 pr-2 font-mono">NaN vs NaN</td><td className="py-1.5 pr-2 text-red-400">false</td><td className="py-1.5 pr-2 text-red-400">false</td><td className="py-1.5">NaN ≠ itself!</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <Callout type="tip">Interview: {`"== only compares values — it auto-converts types before comparing, leading to unexpected bugs. === compares both type AND value — different type means false immediately. Always use === except for x == null to check both null and undefined."`}</Callout>
                </TopicModal>

                <TopicModal title="for vs while — When to Use?" emoji="🔄" color="#10b981" summary="for = known iteration count, while = loop until condition is false — crucial pattern in DSA">
                    <Paragraph><InlineCode>for</InlineCode> when you <Highlight>know in advance</Highlight> how many times to iterate. <InlineCode>while</InlineCode> when you <Highlight>don&#39;t know</Highlight> when to stop.</Paragraph>

                    <Heading3>for — When You Know the Iteration Count</Heading3>
                    <CodeBlock title="4 Variations of for">{`// Traverse array — length is known
for (let i = 0; i < arr.length; i++) { ... }

// Fixed range
for (let i = 0; i < n; i++) { ... }

// for...of — iterate each element (Array, Map, Set, String)
for (const item of items) { ... }

// for...in — iterate object keys
for (const key in obj) { ... }`}</CodeBlock>

                    <Heading3>while — When You Don&#39;t Know When to Stop</Heading3>
                    <CodeBlock title="5 Common Use Cases">{`// Two Pointers — stop when pointers meet
while (left < right) { ... }

// BFS — stop when queue is empty
while (queue.length > 0) { ... }

// Binary Search — stop when left exceeds right
while (left <= right) { ... }

// Linked List — stop when no more nodes
while (node !== null) { ... }

// Regex match — stop when no more matches
while ((match = regex.exec(str)) !== null) { ... }`}</CodeBlock>

                    <Heading3>Quick Cheat Sheet</Heading3>
                    <div className="my-3 overflow-x-auto">
                        <table className="w-full text-sm border-collapse">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="text-left p-3 text-slate-400 font-medium">Situation</th>
                                    <th className="text-left p-3 text-blue-400 font-medium">Use</th>
                                    <th className="text-left p-3 text-slate-400 font-medium">Reason</th>
                                </tr>
                            </thead>
                            <tbody className="text-slate-300">
                                <tr className="border-b border-white/5"><td className="p-3">Traverse array start → end</td><td className="p-3"><InlineCode>for</InlineCode></td><td className="p-3">Length known upfront</td></tr>
                                <tr className="border-b border-white/5"><td className="p-3">Two Pointers</td><td className="p-3"><InlineCode>while</InlineCode></td><td className="p-3">Stop when left {'>'} = right</td></tr>
                                <tr className="border-b border-white/5"><td className="p-3">Sliding Window: right expands</td><td className="p-3"><InlineCode>for</InlineCode></td><td className="p-3">right goes from 0 → n</td></tr>
                                <tr className="border-b border-white/5"><td className="p-3">Sliding Window: left shrinks</td><td className="p-3"><InlineCode>while</InlineCode></td><td className="p-3">Don&#39;t know how much to shrink</td></tr>
                                <tr className="border-b border-white/5"><td className="p-3">BFS / DFS iterative</td><td className="p-3"><InlineCode>while</InlineCode></td><td className="p-3">Don&#39;t know when queue/stack empties</td></tr>
                                <tr className="border-b border-white/5"><td className="p-3">Binary Search</td><td className="p-3"><InlineCode>while</InlineCode></td><td className="p-3">Don&#39;t know how many halving steps</td></tr>
                                <tr><td className="p-3">Read file / stream</td><td className="p-3"><InlineCode>while</InlineCode></td><td className="p-3">Don&#39;t know when data ends</td></tr>
                            </tbody>
                        </table>
                    </div>

                    <Heading3>In LeetCode Patterns</Heading3>
                    <CodeBlock title="Combining for + while">{`// Sliding Window = for + while nested!
for (let right = 0; right < arr.length; right++) {  // for: expand (known n steps)
    while (/* invalid */) {                           // while: shrink (unknown steps)
        left++
    }
}

// Monotonic Stack = for + while
for (let i = 0; i < arr.length; i++) {               // for: traverse array
    while (stack.length && arr[stack.at(-1)] < arr[i]) { // while: pop until valid
        stack.pop()
    }
}`}</CodeBlock>
                    <Callout type="tip"><strong>Summary:</strong> <InlineCode>for</InlineCode> = &quot;iterate through N elements&quot;, <InlineCode>while</InlineCode> = &quot;loop until condition is false&quot;. When combining both (Sliding Window, Monotonic Stack), <InlineCode>for</InlineCode> manages the outer loop, <InlineCode>while</InlineCode> handles inner logic with unknown step count! 🎯</Callout>
                </TopicModal>

                <TopicModal title="JS Data Types" emoji="📦" color="#06b6d4" summary="7 primitives + 1 reference — typeof, truthy/falsy, pass by value vs reference">
                    <Paragraph>JavaScript has <Highlight>7 primitive types</Highlight> and <Highlight>1 reference type</Highlight>.</Paragraph>
                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">Primitive (stored by value, compared by value)</div>
                            <div className="text-slate-300 text-sm mt-1"><InlineCode>string</InlineCode>, <InlineCode>number</InlineCode>, <InlineCode>boolean</InlineCode>, <InlineCode>null</InlineCode>, <InlineCode>undefined</InlineCode>, <InlineCode>symbol</InlineCode>, <InlineCode>bigint</InlineCode></div>
                        </div>
                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <div className="text-purple-400 font-bold text-sm">Reference (stored by pointer, compared by reference)</div>
                            <div className="text-slate-300 text-sm mt-1"><InlineCode>object</InlineCode> — includes: Object, Array, Function, Date, Map, Set, RegExp...</div>
                        </div>
                    </div>
                    <CodeBlock title="typeof gotchas">{`typeof 'hello'     // 'string'
typeof 42          // 'number'
typeof true        // 'boolean'
typeof undefined   // 'undefined'
typeof null        // 'object' ← Historical JS BUG!
typeof []          // 'object' ← Array is also an object
typeof {}          // 'object'
typeof function(){} // 'function' ← special case

// Accurate type checking:
Array.isArray([])           // true
obj === null                // check null
obj instanceof Date         // check Date
Object.prototype.toString.call(obj) // "[object Array]"`}</CodeBlock>
                    <CodeBlock title="Pass by value vs reference">{`// Primitive → copies the value
let a = 5
let b = a
b = 10
console.log(a) // 5 — not affected!

// Reference → copies the pointer (both point to same object)
let obj1 = { name: 'Khuong' }
let obj2 = obj1
obj2.name = 'Changed'
console.log(obj1.name) // 'Changed' — affected!

// Fix: shallow copy
let obj3 = { ...obj1 }  // spread operator
let obj4 = Object.assign({}, obj1)`}</CodeBlock>
                    <Callout type="tip">Interview tip: Explaining that <Highlight>typeof null === &apos;object&apos;</Highlight> is a historical bug, and the difference between <InlineCode>==</InlineCode> vs <InlineCode>===</InlineCode> when comparing types, will score big points.</Callout>
                    <a href="/blogs/data-types-structures" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 See detailed article →</a>
                </TopicModal>

                <TopicModal title="Strict Mode" emoji="🔒" color="#ef4444" summary={`"use strict" — stricter execution mode that catches errors early and makes code safer`}>
                    <Paragraph><InlineCode>{`"use strict"`}</InlineCode> enables a stricter execution mode, introduced in <Highlight>ES5</Highlight>. It catches errors early and prevents dangerous behaviors that normal JS silently allows.</Paragraph>
                    <CodeBlock title="How to enable">{`"use strict"; // Top of file → applies to entire file

function myFunc() {
  "use strict"; // Or only inside a function
}

// ⚡ ES Modules (import/export) and class
// automatically run in strict mode — no declaration needed!`}</CodeBlock>
                    <div className="my-3 overflow-x-auto">
                        <table className="w-full text-sm border-collapse">
                            <thead><tr className="border-b border-[var(--border-primary)]"><th className="text-left p-2 text-slate-400">Behavior</th><th className="text-left p-2 text-red-400">Non-strict</th><th className="text-left p-2 text-green-400">Strict mode</th></tr></thead>
                            <tbody className="text-[var(--text-secondary)]">
                                <tr className="border-b border-gray-100"><td className="p-2">Undeclared variable</td><td className="p-2">Creates global 😱</td><td className="p-2">❌ ReferenceError</td></tr>
                                <tr className="border-b border-gray-100"><td className="p-2">Assign to read-only property</td><td className="p-2">Silent, ignored</td><td className="p-2">❌ TypeError</td></tr>
                                <tr className="border-b border-gray-100"><td className="p-2">Duplicate params</td><td className="p-2">Allowed</td><td className="p-2">❌ SyntaxError</td></tr>
                                <tr className="border-b border-gray-100"><td className="p-2"><InlineCode>this</InlineCode> in function</td><td className="p-2">window</td><td className="p-2">undefined</td></tr>
                                <tr><td className="p-2">Using <InlineCode>with</InlineCode></td><td className="p-2">Allowed</td><td className="p-2">❌ SyntaxError</td></tr>
                            </tbody>
                        </table>
                    </div>
                    <CodeBlock title="Examples">{`"use strict";

x = 10; // ❌ ReferenceError — must use let/const/var

function sum(a, a, b) {} // ❌ SyntaxError — duplicate params

function showThis() {
  console.log(this); // undefined (non-strict → window)
}
showThis();

const obj = {};
Object.defineProperty(obj, "name", { value: "K", writable: false });
obj.name = "X"; // ❌ TypeError — read-only`}</CodeBlock>
                    <Callout type="tip">In modern React/Next.js projects, code already runs in <Highlight>strict mode by default</Highlight> because of ES Modules. But understanding strict mode is still crucial for interviews!</Callout>
                </TopicModal>

                <TopicModal title="DOM Manipulation & Event Delegation" emoji="🌐" color="#f97316" summary="querySelector, event bubbling/capturing, delegation — foundation for understanding React">
                    <Paragraph>Understanding <Highlight>native DOM APIs</Highlight> helps you understand how React works under the hood — commonly asked at all levels.</Paragraph>
                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                            <div className="text-orange-400 font-bold text-sm">🔍 DOM Selection</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <InlineCode>getElementById</InlineCode> — fastest, single element<br />
                                • <InlineCode>querySelector / querySelectorAll</InlineCode> — CSS selectors, flexible<br />
                                • <InlineCode>getElementsByClassName</InlineCode> — returns <strong>live HTMLCollection</strong> (auto-updates)<br />
                                • <InlineCode>querySelectorAll</InlineCode> returns <strong>static NodeList</strong> (snapshot)
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">🫧 Event Bubbling vs Capturing</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Capturing</strong> (top → down): window → document → html → body → target<br />
                                • <strong>Bubbling</strong> (bottom → up): target → parent → ... → body → html → document<br />
                                • Default: bubbling. Capture: <InlineCode>addEventListener(event, fn, true)</InlineCode><br />
                                • <InlineCode>e.stopPropagation()</InlineCode> — stop bubble/capture<br />
                                • <InlineCode>e.preventDefault()</InlineCode> — prevent default action (form submit, link navigate)
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">🎯 Event Delegation</div>
                            <div className="text-slate-300 text-sm mt-1">
                                Instead of attaching a listener to <strong>each child</strong>, attach 1 listener to <strong>parent</strong>:<br />
                                • Performance: 1 listener instead of 1000 (list items)<br />
                                • Dynamic elements: elements added later are still handled<br />
                                • Use <InlineCode>e.target</InlineCode> to identify which element triggered the event<br />
                                • React uses delegation at root — that&apos;s <strong>Synthetic Events</strong>
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <div className="text-purple-400 font-bold text-sm">🔧 DOM Manipulation</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <InlineCode>createElement + appendChild</InlineCode> — create and add elements<br />
                                • <InlineCode>insertAdjacentHTML</InlineCode> — faster than innerHTML, precise position<br />
                                • <InlineCode>DocumentFragment</InlineCode> — batch DOM updates (avoid reflow)<br />
                                • <InlineCode>cloneNode(true)</InlineCode> — deep clone DOM subtree<br />
                                • <InlineCode>dataset</InlineCode> — read/write data-* attributes
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
                    <Callout type="tip">Interview: {'"Build a todo list without React"'} — must use event delegation + DocumentFragment. Being able to explain <Highlight>why React uses Synthetic Events</Highlight> → big bonus points.</Callout>
                </TopicModal>

                <TopicModal title="Web APIs — Observer Pattern" emoji="👁️" color="#06b6d4" summary="IntersectionObserver, MutationObserver, ResizeObserver — high-performance APIs replacing legacy events">
                    <Paragraph>Modern Web APIs use <Highlight>Observer pattern</Highlight> instead of legacy polling/events — crucial for performance as they run at <Highlight>browser level</Highlight> (off main thread).</Paragraph>
                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                            <div className="text-cyan-400 font-bold text-sm">📐 IntersectionObserver</div>
                            <div className="text-slate-300 text-sm mt-1">
                                Detect when an element enters/leaves the viewport (no scroll event needed!).<br />
                                • <strong>Lazy loading</strong> images: only load when scrolled near<br />
                                • <strong>Infinite scroll</strong>: load more data when sentinel element is visible<br />
                                • <strong>Analytics</strong>: track impressions (ads, product cards)<br />
                                • <strong>Animation</strong>: trigger animation on scroll into view
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <div className="text-purple-400 font-bold text-sm">🔬 MutationObserver</div>
                            <div className="text-slate-300 text-sm mt-1">
                                Watch for DOM changes (attributes, children, text content).<br />
                                • Detect DOM changes from third-party scripts (Analytics, AB testing)<br />
                                • Auto-process dynamically added elements (chat widgets, notifications)<br />
                                • Build custom element behaviors (auto-format input, syntax highlight)
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">📏 ResizeObserver</div>
                            <div className="text-slate-300 text-sm mt-1">
                                Detect element size changes (no window resize event needed!).<br />
                                • Responsive components based on <strong>element size</strong> (not viewport)<br />
                                • Auto-adjust layout when sidebar opens/closes<br />
                                • Auto-resize textarea, chart, canvas when container changes
                            </div>
                        </div>
                    </div>

                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 my-3">
                        <div className="text-red-400 font-bold text-sm">⚡ Why NOT use scroll event + getBoundingClientRect?</div>
                        <div className="text-slate-300 text-sm mt-2 space-y-1">
                            <div>❌ <strong>scroll event</strong> fires <strong>hundreds of times/second</strong> while scrolling → callback runs continuously on main thread</div>
                            <div>❌ <strong>getBoundingClientRect()</strong> called each scroll → forces browser to <strong>calculate layout (reflow)</strong> → blocks main thread</div>
                            <div>❌ Combined = <strong>scroll jank</strong>: each frame the browser must: fire event → run JS callback → compute layout → paint</div>
                            <div className="pt-2 border-t border-white/5">
                                ✅ <strong>IntersectionObserver</strong> runs at <strong>browser native level</strong> — browser calculates asynchronously, does NOT block main thread, only fires callback when element truly enters/exits viewport.
                            </div>
                        </div>
                    </div>

                    <CodeBlock title="intersection-observer.ts">{`// ═══ IntersectionObserver — Lazy loading + Infinite scroll ═══
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target as HTMLImageElement
      img.src = img.dataset.src!  // load real image
      observer.unobserve(img)     // stop observing
    }
  })
}, { threshold: 0.1, rootMargin: '200px' }) // preload 200px before visible

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

                    <CodeBlock title="mutation-observer.ts">{`// ═══ MutationObserver — Watch for DOM changes ═══
const observer = new MutationObserver((mutations) => {
  mutations.forEach(mutation => {
    // Detect newly added nodes
    mutation.addedNodes.forEach(node => {
      if (node instanceof HTMLElement && node.matches('.ad-banner')) {
        node.remove() // Remove ads injected by third-party!
      }
    })

    // Detect attribute changes
    if (mutation.type === 'attributes') {
      console.log(\`\${mutation.attributeName} changed!\`)
    }
  })
})

// Start observing
observer.observe(document.body, {
  childList: true,   // watch for added/removed child nodes
  subtree: true,     // watch all descendants
  attributes: true,  // watch attribute changes
})

// Stop when no longer needed
observer.disconnect()`}</CodeBlock>

                    <CodeBlock title="resize-observer.ts">{`// ═══ ResizeObserver — Watch element size changes ═══
const observer = new ResizeObserver((entries) => {
  entries.forEach(entry => {
    const { width, height } = entry.contentRect

    // Responsive component WITHOUT media queries
    if (width < 400) {
      entry.target.classList.add('compact')
    } else {
      entry.target.classList.remove('compact')
    }

    // Auto-resize chart/canvas when container changes
    console.log(\`Element resized: \${width}x\${height}\`)
  })
})

// Watch sidebar container → chart auto-resizes
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

                    <CodeBlock title="performance-comparison.ts">{`// ═══ ❌ OLD WAY: scroll event + getBoundingClientRect ═══
// Problem: scroll fires ~100 times/sec, each time calling
// getBoundingClientRect → forces browser layout calculation (reflow)
window.addEventListener('scroll', () => {
  // 🐌 Runs 100 times/sec on MAIN THREAD!
  const rect = element.getBoundingClientRect()
  // ⚠️ getBoundingClientRect() causes FORCED REFLOW
  // → browser must recalculate layout SYNCHRONOUSLY
  if (rect.top < window.innerHeight) {
    loadImage(element) // lazy load
  }
})

// ═══ ✅ NEW WAY: IntersectionObserver ═══
// Browser calculates ASYNCHRONOUSLY, off main thread
const observer = new IntersectionObserver(([entry]) => {
  // 🚀 Called ONCE when element enters/exits viewport
  if (entry.isIntersecting) loadImage(entry.target)
})
observer.observe(element)

// ═══ WHY IS IT SLOW? ═══
// scroll + getBoundingClientRect:
// Frame 1: scroll → JS callback → reflow → paint
// Frame 2: scroll → JS callback → reflow → paint
// Frame 3: scroll → JS callback → reflow → paint
// → Main thread busy non-stop → UI jank, dropped frames!
//
// IntersectionObserver:
// Frame 1-100: browser tracks internally (off main thread)
// Frame 101: "Element visible!" → callback fires once
// → Main thread free → smooth 60fps!`}</CodeBlock>
                    <Callout type="tip">Interview: {'"Build infinite scroll"'} or {'"Build lazy loading images"'} — use IntersectionObserver, <Highlight>not scroll event + getBoundingClientRect</Highlight>. Scroll event fires hundreds of times/sec + getBoundingClientRect causes forced reflow = jank. Observer runs at browser level, async, off main thread.</Callout>
                </TopicModal>

                <TopicModal title="Generators & Iterators" emoji="🔁" color="#a78bfa" summary="function*, yield, Symbol.iterator — lazy evaluation and custom iteration">
                    <Paragraph><Highlight>Generators</Highlight> = functions that can pause/resume. Rarely used directly but foundational to async/await and Redux-Saga.</Paragraph>
                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <div className="text-purple-400 font-bold text-sm">🔄 Iterator Protocol</div>
                            <div className="text-slate-300 text-sm mt-1">
                                Object with <InlineCode>next()</InlineCode> method returning <InlineCode>{'{value, done}'}</InlineCode>.<br />
                                • for...of loop uses iterator protocol under the hood<br />
                                • Array, Map, Set, String all implement <InlineCode>Symbol.iterator</InlineCode><br />
                                • Custom iterable: implement <InlineCode>[Symbol.iterator]()</InlineCode>
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">⏸️ Generator Function</div>
                            <div className="text-slate-300 text-sm mt-1">
                                <InlineCode>function*</InlineCode> + <InlineCode>yield</InlineCode> — pause execution, return value, resume later.<br />
                                • <strong>Lazy evaluation</strong>: only compute when needed<br />
                                • <strong>Infinite sequences</strong>: generate values on-demand<br />
                                • <strong>async/await</strong> is actually syntactic sugar over generators
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

// Practical: Paginated API fetch
async function* fetchPages(url) {
  let page = 1
  while (true) {
    const res = await fetch(\`\${url}?page=\${page}\`)
    const data = await res.json()
    if (data.items.length === 0) return
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
                    <Callout type="tip">Interview: understanding generators helps answer {'"How does async/await work under the hood?"'} — async function = generator + Promise auto-runner.</Callout>
                </TopicModal>

                <TopicModal title="Error Handling Patterns" emoji="🚨" color="#ef4444" summary="try/catch, custom errors, error boundaries, global handlers — production-ready error handling">
                    <Paragraph>Production code <Highlight>must handle errors gracefully</Highlight> — crash = lost users. Interviews often ask about error handling patterns.</Paragraph>
                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                            <div className="text-red-400 font-bold text-sm">🎯 Error Types</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>SyntaxError</strong>: invalid syntax (parse time)<br />
                                • <strong>ReferenceError</strong>: undeclared variable<br />
                                • <strong>TypeError</strong>: calling method on null/undefined<br />
                                • <strong>RangeError</strong>: value outside allowed range<br />
                                • <strong>Custom Error</strong>: extend Error class for business logic
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                            <div className="text-yellow-400 font-bold text-sm">🔄 Async Error Handling</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>try/catch</strong>: wrap async/await<br />
                                • <strong>.catch()</strong>: chain on promises<br />
                                • <strong>Promise.allSettled()</strong>: doesn&apos;t fail when 1 promise rejects<br />
                                • ⚠️ <strong>Unhandled rejection</strong>: crashes the process (Node.js)!
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">⚛️ React Error Handling</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Error Boundary</strong>: catches render errors (class component only)<br />
                                • <strong>Suspense</strong>: loading states for async components<br />
                                • <strong>react-error-boundary</strong>: HOC/hook API for error boundaries<br />
                                • ⚠️ Error Boundary <strong>does NOT catch</strong>: event handlers, async code, SSR
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

// Global error handlers
window.addEventListener('error', (e) => {
  reportToSentry(e.error)       // JS errors
})
window.addEventListener('unhandledrejection', (e) => {
  reportToSentry(e.reason)      // Unhandled promise rejections
})`}</CodeBlock>
                    <Callout type="tip">Interview: mentioning <Highlight>Result type pattern</Highlight> (Go/Rust style) instead of try/catch everywhere → shows engineering maturity. Knowing Error Boundary limitations → senior level.</Callout>
                </TopicModal>

                <TopicModal title="Web Workers & Service Workers" emoji="⚙️" color="#10b981" summary="Multi-threading in the browser, offline capability, background sync">
                    <Paragraph>Browser runs JS on the <Highlight>main thread</Highlight> — heavy computation blocks UI. Web Workers solve this.</Paragraph>
                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">🧵 Web Workers</div>
                            <div className="text-slate-300 text-sm mt-1">
                                Run JS in a <strong>background thread</strong> — doesn&apos;t block UI.<br />
                                • Communicate via <InlineCode>postMessage()</InlineCode> (structured clone)<br />
                                • <strong>Cannot access</strong>: DOM, window, document<br />
                                • Use cases: image processing, crypto, parsing large JSON/CSV<br />
                                • <strong>SharedWorker</strong>: share 1 worker between tabs
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">📡 Service Workers</div>
                            <div className="text-slate-300 text-sm mt-1">
                                Proxy between browser and network — <strong>offline capability</strong>.<br />
                                • <strong>Cache API</strong>: cache responses for offline access<br />
                                • <strong>Push notifications</strong>: receive messages when app is closed<br />
                                • <strong>Background sync</strong>: retry failed requests when back online<br />
                                • PWA (Progressive Web App) requires a service worker
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <div className="text-purple-400 font-bold text-sm">🆕 Other Important Web APIs</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>requestAnimationFrame</strong>: smooth 60fps animations (instead of setInterval)<br />
                                • <strong>requestIdleCallback</strong>: defer non-critical work when main thread is free<br />
                                • <strong>AbortController</strong>: cancel fetch requests (race conditions)<br />
                                • <strong>Broadcast Channel</strong>: communicate between tabs/windows
                            </div>
                        </div>
                    </div>
                    <CodeBlock title="web-workers.ts">{`// Web Worker — heavy computation off main thread
// worker.ts
self.onmessage = (e: MessageEvent) => {
  const { data } = e
  const result = data.sort((a, b) => a - b) // sort 1M items
  self.postMessage(result)
}

// main.ts
const worker = new Worker(new URL('./worker.ts', import.meta.url))
worker.postMessage(hugeArray)
worker.onmessage = (e) => console.log('Sorted:', e.data)

// AbortController — cancel fetch (prevent race conditions)
const controller = new AbortController()
fetch('/api/search?q=hello', { signal: controller.signal })
  .then(res => res.json())
  .then(data => setResults(data))
  .catch(err => {
    if (err.name === 'AbortError') return // cancelled, ignore
    throw err
  })
controller.abort() // cancel the request`}</CodeBlock>
                    <Callout type="tip">Interview: {'"The page is janky when sorting a large list"'} → <Highlight>Web Worker</Highlight> for sorting. {'"Cancel previous search request when user keeps typing"'} → AbortController.</Callout>
                </TopicModal>

                <TopicModal title="WeakMap, WeakRef & FinalizationRegistry" emoji="🧹" color="#8b5cf6" summary="Memory management, garbage collection awareness — senior-level interview topic">
                    <Paragraph><Highlight>WeakMap/WeakRef</Highlight> allow referencing objects without preventing garbage collection — important for memory management.</Paragraph>
                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <div className="text-purple-400 font-bold text-sm">🗺️ WeakMap vs Map</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>Map</strong>: keys can be any type. <strong>Holds reference</strong> → prevents GC<br />
                                • <strong>WeakMap</strong>: keys <strong>must be objects</strong>. Weak reference → <strong>allows GC</strong><br />
                                • WeakMap is <strong>not iterable</strong> (no size, no forEach, no keys/values)<br />
                                • Use case: cache metadata for DOM elements, private data for classes
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">👻 WeakRef & FinalizationRegistry</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>WeakRef</strong>: weak reference — <InlineCode>ref.deref()</InlineCode> may return undefined<br />
                                • <strong>FinalizationRegistry</strong>: callback when object is GC&apos;d<br />
                                • Use case: cache expensive objects without leaking memory<br />
                                • ⚠️ Rarely used directly — but understanding = senior mindset
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
}`}</CodeBlock>
                    <Callout type="tip">Interview: When asked about <Highlight>memory leaks</Highlight> → mention WeakMap/WeakRef. Explaining why Map holds references and prevents GC → senior level answer.</Callout>
                </TopicModal>
            </div>

            <Heading3>2.2 Implement from Scratch (click for sample code)</Heading3>
            <a href="/blogs/js-common-functions" target="_blank" rel="noopener noreferrer" className="mb-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">📖 See JS Common Functions collection →</a>
            <div className="my-4 space-y-2">
                <TopicModal title="Array.map / filter / reduce" emoji="💻" color="#fbbf24" summary="Re-implement the 3 most popular Array higher-order functions">
                    <Heading3>📖 How to Use</Heading3>
                    <CodeBlock title="map / filter / reduce — real-world usage">{`// map: transform each element → new array of same length
const prices = [100, 200, 300]
const withTax = prices.map(p => p * 1.1)  // [110, 220, 330]

// filter: keep elements matching condition → shorter array
const expensive = prices.filter(p => p > 150)  // [200, 300]

// reduce: aggregate all → single value
const total = prices.reduce((sum, p) => sum + p, 0)  // 600

// 🔗 Power combo: filter → map → reduce
const result = products
    .filter(p => p.inStock)       // keep in-stock items
    .map(p => p.price * p.qty)    // calc subtotal per item
    .reduce((sum, x) => sum + x, 0) // grand total`}</CodeBlock>

                    <Heading3>🔧 How to Build (Re-implement)</Heading3>
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
                    <Callout type="tip">Remember to handle the edge case: <InlineCode>reduce</InlineCode> without initialValue uses <InlineCode>this[0]</InlineCode> and starts from index 1.</Callout>

                    <Heading3>🏭 Reduce Mnemonic: The Juicer Machine</Heading3>
                    <Paragraph>Think of <Highlight>reduce = a fruit juicer</Highlight>: 🍊🍊🍊 → 🧃</Paragraph>
                    <Paragraph><InlineCode>[🍊, 🍊, 🍊, 🍊] → reduce → 🧃 (1 glass of juice)</InlineCode></Paragraph>

                    <div className="my-4 overflow-x-auto">
                        <table className="w-full text-sm border-collapse">
                            <thead><tr className="border-b border-[var(--border-primary)] text-left">
                                <th className="p-2 text-[#fbbf24] font-bold">ACIV</th><th className="p-2">What</th><th className="p-2">Visual</th>
                            </tr></thead>
                            <tbody>
                                <tr className="border-b border-gray-100"><td className="p-2 font-bold">A — Accumulator</td><td className="p-2">Container (accumulated result)</td><td className="p-2">🧃 Glass filling up</td></tr>
                                <tr className="border-b border-gray-100"><td className="p-2 font-bold">C — Current Item</td><td className="p-2">Fruit being juiced</td><td className="p-2">🍊 Current orange</td></tr>
                                <tr className="border-b border-gray-100"><td className="p-2 font-bold">I — Initial Value</td><td className="p-2">Starting glass (empty or pre-filled)</td><td className="p-2">🥤 Empty glass</td></tr>
                                <tr><td className="p-2 font-bold">V — (return) Value</td><td className="p-2">Result = new accumulator</td><td className="p-2">🧃 Glass after adding juice</td></tr>
                            </tbody>
                        </table>
                    </div>

                    <CodeBlock title="Examples: Easy → Hard">{`// 1️⃣ Sum — glass filling up
[1, 2, 3, 4].reduce((glass, orange) => glass + orange, 0)
//  glass=0, orange=1 → 1 → glass=1, orange=2 → 3 → ... → 10 ✅

// 2️⃣ Frequency count — sort fruits into bins
['🍎','🍊','🍎','🍊','🍎'].reduce((bins, fruit) => {
    bins[fruit] = (bins[fruit] || 0) + 1
    return bins
}, {})  // → { '🍎': 3, '🍊': 2 }

// 3️⃣ Flatten — open nested boxes
[[1,2], [3,4], [5]].reduce((res, box) => [...res, ...box], [])
// → [1, 2, 3, 4, 5]

// 4️⃣ Pipeline — water flowing through filters
const pipeline = [addTax, applyDiscount, roundPrice]
pipeline.reduce((price, fn) => fn(price), 100)
// 100 → addTax → 110 → applyDiscount → 99 → roundPrice → 99.00`}</CodeBlock>

                    <Callout type="info">reduce = &quot;many → one&quot;: Array of numbers → 1 sum, array of strings → 1 counting object, array of arrays → 1 flat array, array of functions → 1 result. If you need to transform an array into one thing → use reduce!</Callout>
                </TopicModal>

                <TopicModal title="Function.bind / call / apply" emoji="💻" color="#fbbf24" summary="Re-implement the 3 methods that change this context">
                    <Heading3>How to Use</Heading3>
                    <CodeBlock title="bind / call / apply — 3 ways to change this">{`const user = { name: 'An' }
function greet(greeting, punctuation) {
    return greeting + ', ' + this.name + punctuation
}

// call — invoke NOW, pass args SEPARATELY
greet.call(user, 'Hi', '!')         // 'Hi, An!'

// apply — invoke NOW, pass args as ARRAY
greet.apply(user, ['Hi', '!'])      // 'Hi, An!'

// bind — RETURNS new function, does NOT invoke
const boundGreet = greet.bind(user, 'Hi')
boundGreet('!')                     // 'Hi, An!'

// 💡 Mnemonic:
// call  = C = Comma      → args separated by commas
// apply = A = Array       → args passed as array
// bind  = B = Bind (save) → returns new function`}</CodeBlock>

                    <Heading3>Build from Scratch</Heading3>
                    <CodeBlock title="myBind">{`Function.prototype.myBind = function(context, ...args) {
    const fn = this;
    return function(...newArgs) {
        return fn.apply(context, [...args, ...newArgs]);
    };
};

// Example:
const obj = { name: 'An' };
function greet(greeting) { return greeting + ', ' + this.name; }
const bound = greet.myBind(obj, 'Hello');
bound(); // "Hello, An"`}</CodeBlock>
                    <CodeBlock title="myCall & myApply">{`Function.prototype.myCall = function(context, ...args) {
    context = context || globalThis;
    const sym = Symbol(); // unique key to avoid conflicts
    context[sym] = this;
    const result = context[sym](...args);
    delete context[sym];
    return result;
};

Function.prototype.myApply = function(context, args = []) {
    return this.myCall(context, ...args);
};`}</CodeBlock>
                    <Callout type="warning">Trick: use <InlineCode>Symbol()</InlineCode> as a temporary key on the object to avoid overwriting existing properties.</Callout>
                </TopicModal>

                <TopicModal title="Promise & Promise.all" emoji="💻" color="#fbbf24" summary="Implement Promise from scratch — the most classic interview question">
                    <Heading3>How to Use</Heading3>
                    <CodeBlock title="Promise basics">{`// Create a Promise
const promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve('Done!'), 1000)
})

// Handle results
promise
    .then(result => console.log(result))   // 'Done!'
    .catch(error => console.error(error))  // If rejected
    .finally(() => console.log('Cleanup')) // Always runs

// Promise.all — wait for ALL to complete
const [users, posts] = await Promise.all([
    fetch('/api/users').then(r => r.json()),
    fetch('/api/posts').then(r => r.json()),
])
// 1 fails → ALL fail!

// Promise.allSettled — wait for all, NEVER fails
const results = await Promise.allSettled([p1, p2, p3])
// [{status:'fulfilled', value:...}, {status:'rejected', reason:...}]`}</CodeBlock>

                    <Heading3>Build from Scratch</Heading3>
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
            }, reject); // 1 fail → reject all
        });
        if (promises.length === 0) resolve([]);
    });
};`}</CodeBlock>
                </TopicModal>

                <TopicModal title="Debounce & Throttle" emoji="💻" color="#fbbf24" summary="2 techniques to control function call frequency — very common in interviews">
                    <Heading3>How to Use</Heading3>
                    <CodeBlock title="When to use Debounce vs Throttle">{`// DEBOUNCE — wait for user to STOP, then execute
// Use for: search input, window resize, auto-save
const searchInput = document.querySelector('#search')
searchInput.addEventListener('input', 
    debounce((e) => fetchResults(e.target.value), 300)
)
// User types: h...e...l...l...o → only 1 API call after 300ms pause

// THROTTLE — execute AT MOST once per time interval
// Use for: scroll, mousemove, game loop
window.addEventListener('scroll',
    throttle(() => updateScrollProgress(), 100)
)
// User scrolls continuously → runs every 100ms max, not every pixel

// 💡 Mnemonic:
// Debounce = Elevator 🛗  → waits for everyone to get in before closing
// Throttle = Heartbeat 💓  → steady rhythm, never faster than set rate`}</CodeBlock>

                    <Heading3>Build from Scratch</Heading3>
                    <CodeBlock title="debounce — wait for user to stop, then execute">{`function debounce(fn, delay) {
    let timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}

// Example: search input — only call API after user stops typing for 300ms
const search = debounce((query) => fetch(\`/api?q=\${query}\`), 300);
input.addEventListener('input', (e) => search(e.target.value));`}</CodeBlock>
                    <CodeBlock title="throttle — execute at most once per interval">{`function throttle(fn, interval) {
    let lastTime = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastTime >= interval) {
            lastTime = now;
            fn.apply(this, args);
        }
    };
}

// Example: scroll handler — at most once per 100ms
window.addEventListener('scroll', throttle(handleScroll, 100));`}</CodeBlock>
                    <Callout type="tip"><strong>Debounce</strong> = search typing, window resize. <strong>Throttle</strong> = scroll, mousemove. Remember both return a <strong>new function</strong>.</Callout>
                </TopicModal>

                <TopicModal title="Deep clone / Deep equal" emoji="💻" color="#fbbf24" summary="Compare and copy nested objects — shallow vs deep distinction">
                    <Heading3>How to Use</Heading3>
                    <CodeBlock title="3 built-in cloning methods in JS">{`const obj = { a: { b: 1 }, c: [2, 3] }

// 1️⃣ Shallow copy — ONLY copies layer 1 (nested still shares reference!)
const shallow1 = { ...obj }           // spread
const shallow2 = Object.assign({}, obj) // assign
shallow1.a.b = 999
console.log(obj.a.b) // 999 — AFFECTED! ❌

// 2️⃣ JSON trick — deep but LOSES functions, Date, undefined, circular
const jsonClone = JSON.parse(JSON.stringify(obj))
// ⚠️ Doesn't support: Function, Date, RegExp, Map, Set, undefined

// 3️⃣ structuredClone — BEST METHOD (ES2022)
const deep = structuredClone(obj)
deep.a.b = 999
console.log(obj.a.b) // 1 — NOT affected! ✅
// ✅ Supports: Date, RegExp, Map, Set, ArrayBuffer, circular ref
// ❌ Doesn't support: Function, DOM nodes`}</CodeBlock>

                    <Heading3>Build from Scratch</Heading3>
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
                    <Callout type="warning">Important edge case: <Highlight>circular reference</Highlight> — use WeakMap to track cloned objects. Many candidates forget this!</Callout>
                </TopicModal>

                <TopicModal title="Event Emitter (pub/sub)" emoji="💻" color="#fbbf24" summary="Core pattern of Node.js, React, and every event system">
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

// Usage:
const bus = new EventEmitter();
bus.on('message', (text) => console.log(text));
bus.emit('message', 'Hello!'); // "Hello!"`}</CodeBlock>
                </TopicModal>

                <TopicModal title="Curry function" emoji="💻" color="#fbbf24" summary="Transform f(a,b,c) into f(a)(b)(c) — functional programming pattern">
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

// Example:
const add = curry((a, b, c) => a + b + c);
add(1)(2)(3);     // 6
add(1, 2)(3);     // 6  — partial application
add(1)(2, 3);     // 6
add(1, 2, 3);     // 6

// Practical use:
const log = curry((level, time, msg) =>
    console.log(\`[\${level}] \${time}: \${msg}\`)
);
const errorLog = log('ERROR');
const errorNow = errorLog(new Date().toISOString());
errorNow('Database down!');`}</CodeBlock>
                    <Callout type="tip">Key: compare <InlineCode>args.length</InlineCode> with <InlineCode>fn.length</InlineCode> (number of params function needs). Enough → call it, not enough → return new function.</Callout>
                </TopicModal>

                <TopicModal title="Flatten array / object" emoji="💻" color="#fbbf24" summary="Flatten nested arrays/objects — commonly asked at Google, Meta">
                    <Heading3>How to Use</Heading3>
                    <CodeBlock title="Built-in Flatten in JS">{`// Array.flat() — built-in since ES2019
[1, [2, [3, [4]]]].flat()       // [1, 2, [3, [4]]]  — default depth=1
[1, [2, [3, [4]]]].flat(2)      // [1, 2, 3, [4]]    — depth=2
[1, [2, [3, [4]]]].flat(Infinity) // [1, 2, 3, 4]    — flatten all!

// Trick: use flatMap to map and flatten 1 level
['Hello World', 'Foo Bar'].flatMap(s => s.split(' '))
// → ['Hello', 'World', 'Foo', 'Bar']

// Object.entries + reduce — flatten objects manually
const nested = { a: { b: 1 }, c: 2 }
// Want → { 'a.b': 1, 'c': 2 } → need custom build (see below)`}</CodeBlock>

                    <Heading3>Build from Scratch</Heading3>
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

            <Heading3>2.3 Resources</Heading3>
            <div className="my-4 space-y-2">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                    <span className="text-yellow-400">📕</span>
                    <div className="text-slate-300 text-sm">
                        <strong>You Don&apos;t Know JS</strong> (Kyle Simpson) — read the entire series for extremely deep JS understanding
                    </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                    <span className="text-yellow-400">📗</span>
                    <div className="text-slate-300 text-sm">
                        <strong>javascript.info</strong> — best online resource with examples + exercises
                    </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                    <span className="text-yellow-400">📘</span>
                    <div className="text-slate-300 text-sm">
                        <strong>GreatFrontEnd.com</strong> — frontend interview platform with mock interviews
                    </div>
                </div>
            </div>

            <Callout type="warning">
                Big tech companies <Highlight>love asking you to implement from scratch</Highlight>: &quot;Re-code Promise.all&quot;,
                &quot;Write debounce without lodash&quot;. If you only use the API without understanding the internals, you&apos;ll fail this round.
            </Callout>

            <Heading3>2.4 Rapid-Fire Interview Questions</Heading3>
            <Paragraph>
                Interviews often include <Highlight>short theoretical questions</Highlight> to quickly assess knowledge.
                Below are the <Highlight>most common ones</Highlight> — you must be able to answer immediately.
            </Paragraph>

            <div className="my-4 space-y-2">
                <TopicModal title="JS Fundamentals — 15 Classic Questions" emoji="⚡" color="#fbbf24" summary="var/let/const, hoisting, truthy/falsy, == vs === — every interview asks these">
                    <div className="my-3 space-y-3">
                        {[
                            ['Q: How are var, let, const different?', 'var: function-scoped, hoisted (undefined), can re-declare.\nlet: block-scoped, hoisted (TDZ), can re-assign.\nconst: block-scoped, hoisted (TDZ), cannot re-assign (but object/array contents are still mutable!).'],
                            ['Q: What is hoisting? Give an example.', 'Hoisting: JS moves declarations to the top of scope before executing.\nvar → hoisted, value = undefined.\nlet/const → hoisted but in TDZ (Temporal Dead Zone) → ReferenceError if accessed before declaration.\nfunction declaration → fully hoisted (including body).'],
                            ['Q: == vs === difference?', '== (loose): compares with type coercion (1 == "1" → true).\n=== (strict): no coercion, compares both value + type (1 === "1" → false).\n→ Always use === unless checking null/undefined (x == null).'],
                            ['Q: null vs undefined?', 'undefined: variable declared but not assigned, or function without return.\nnull: explicitly assigned = "no value".\ntypeof null === "object" (historical JS bug).\nnull == undefined → true, null === undefined → false.'],
                            ['Q: What is a closure? Real-world example?', 'Closure: a function "remembers" variables from its outer scope even after that scope has ended.\nReal examples: debounce, throttle, module pattern, React hooks (useState internally uses closures).'],
                            ['Q: Arrow function vs regular function?', '1. No own this — inherits from parent scope.\n2. No arguments object.\n3. Cannot be used as constructor (new).\n4. Cannot be a generator (function*).\n→ In React: always use arrow functions for event handlers.'],
                            ['Q: Truthy / falsy values?', 'Falsy (6 values): false, 0, "" (empty string), null, undefined, NaN.\nAll other values are truthy (including [], {}, "0", "false").'],
                            ['Q: Explain call stack and event loop.', 'Call stack: LIFO, runs synchronous code.\nWeb APIs: setTimeout, fetch... run outside call stack.\nCallback/Task Queue: macro tasks (setTimeout).\nMicrotask Queue: Promises, queueMicrotask.\nEvent Loop: when stack is empty → takes microtasks first → then macrotasks.'],
                            ['Q: Spread operator vs rest parameter?', 'Spread (...): "expands" array/object → {...obj}, [...arr].\nRest (...): "collects" params → function(...args).\nSame syntax ... but opposite meaning: spread = unpack, rest = pack.'],
                            ['Q: map, filter, reduce vs forEach?', 'forEach: just loops, returns undefined, no new array.\nmap: returns new array, same length.\nfilter: returns new array, items matching condition.\nreduce: returns 1 value from array.\n→ forEach for side effects (log, API call), map/filter/reduce for data transformation.'],
                            ['Q: Shallow copy vs deep copy?', 'Shallow: copies level 1, nested objects still share reference.\n→ {...obj}, [...arr], Object.assign.\nDeep: copies all levels, completely independent.\n→ structuredClone() (modern), JSON.parse(JSON.stringify()) (old, loses functions/Date).'],
                            ['Q: Pass by value vs pass by reference?', 'Primitives: pass by value (copies the value).\nObjects/Arrays: pass by reference (share the same reference).\n→ Changing a property of an object inside a function WILL change the original object.'],
                            ['Q: Does setTimeout(fn, 0) run immediately?', 'NO! setTimeout(fn, 0) puts fn into the macrotask queue.\nOnly runs when call stack is EMPTY and all microtasks are done.\n→ console.log(1); setTimeout(() => console.log(2), 0); console.log(3);\n→ Output: 1, 3, 2.'],
                            ['Q: Promise.all vs Promise.allSettled?', 'Promise.all: fails IMMEDIATELY when 1 promise rejects (fast-fail).\nPromise.allSettled: waits for ALL to complete, returns [{status, value/reason}].\n→ Use all when all must succeed. Use allSettled when you need each result.'],
                            ['Q: What is destructuring?', 'Destructuring: "extract" values from objects/arrays into variables.\nObject: const { name, age } = user;\nArray: const [first, ...rest] = arr;\nSupports: rename, default values, nested destructuring.'],
                        ].map(([q, a]) => (
                            <div key={q} className="p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                                <div className="text-yellow-400 text-sm font-bold mb-2">{q}</div>
                                <div className="text-slate-300 text-sm whitespace-pre-line">{a}</div>
                            </div>
                        ))}
                    </div>
                    <Callout type="tip">Tip: For theory questions → answer <Highlight>concisely + with an example</Highlight>. {'"var is function-scoped, e.g. console.log(x) // undefined due to hoisting"'} is better than just {'"var is function scoped"'}.</Callout>
                </TopicModal>

                <TopicModal title="HTML/CSS — 10 Common Questions" emoji="🎨" color="#38bdf8" summary="box model, position, flexbox, responsive — CSS is where many developers are weakest">
                    <div className="my-3 space-y-3">
                        {[
                            ['Q: What is the box model?', 'Every element has 4 layers: Content → Padding → Border → Margin.\nbox-sizing: content-box (default): width = content only.\nbox-sizing: border-box: width = content + padding + border.\n→ Always use border-box (*, *::before, *::after { box-sizing: border-box; }).'],
                            ['Q: position: relative, absolute, fixed, sticky?', 'static: default, normal flow.\nrelative: offset from ORIGINAL POSITION, still occupies space.\nabsolute: offset from nearest positioned PARENT, removed from flow.\nfixed: offset from VIEWPORT, removed from flow.\nsticky: relative until scroll reaches threshold → becomes fixed.'],
                            ['Q: display: none vs visibility: hidden vs opacity: 0?', 'display: none — removed from DOM flow, takes no space.\nvisibility: hidden — still takes space, invisible, not clickable.\nopacity: 0 — still takes space, invisible, STILL clickable.\n→ Accessibility: use sr-only class (position: absolute, clip) for screen readers.'],
                            ['Q: em, rem, px differences?', 'px: fixed size, not responsive.\nem: relative to PARENT font-size → compounds when nested.\nrem: relative to ROOT (html) font-size → predictable.\n→ Best practice: font-size use rem, spacing use rem or em, borders use px.'],
                            ['Q: Flexbox vs Grid — when to use?', 'Flexbox: 1-dimensional (row OR column). Use for: navbar, button group, card row.\nGrid: 2-dimensional (rows AND columns). Use for: page layout, dashboard, gallery.\n→ "Flex for components, Grid for layouts."'],
                            ['Q: Pseudo-class vs pseudo-element?', 'Pseudo-class (:hover, :focus, :nth-child) — styles the STATE of an element.\nPseudo-element (::before, ::after, ::placeholder) — creates a VIRTUAL element.\nPseudo-class: single colon. Pseudo-element: double colon.'],
                            ['Q: Responsive design approach?', 'Mobile-first: min-width (default mobile, add styles for desktop).\nDesktop-first: max-width (default desktop, override for mobile).\n→ Mobile-first is better: less CSS, better performance on mobile.\nCommon breakpoints: 640px (sm), 768px (md), 1024px (lg), 1280px (xl).'],
                            ['Q: How does z-index work?', 'z-index only works on elements with position other than static.\nStacking context: created by position + z-index, opacity < 1, transform, filter.\nz-index only compares WITHIN the same stacking context.\n→ Tip: avoid z-index wars, use semantic layers (modal: 100, dropdown: 50, tooltip: 200).'],
                            ['Q: CSS selector priority?', '!important > inline style > #id > .class/:pseudo-class/[attr] > tag > *.\nWhen same specificity → later rule wins.\n→ Keep specificity low. Avoid !important. Use classes instead of IDs.'],
                            ['Q: How to center an element?', 'Flex: display: flex; justify-content: center; align-items: center;\nGrid: display: grid; place-items: center;\nAbsolute: position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);\nMargin: margin: 0 auto (horizontal only, needs width).'],
                        ].map(([q, a]) => (
                            <div key={q} className="p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                                <div className="text-blue-400 text-sm font-bold mb-2">{q}</div>
                                <div className="text-slate-300 text-sm whitespace-pre-line">{a}</div>
                            </div>
                        ))}
                    </div>
                    <Callout type="tip">CSS is commonly tested in interviews: <Highlight>centering, box model, position, flexbox/grid</Highlight>. Many companies give live CSS coding tests — you must know these by heart.</Callout>
                </TopicModal>

                <TopicModal title="React — 12 Interview Questions" emoji="⚛️" color="#61DAFB" summary="lifecycle, hooks, key, controlled/uncontrolled — must answer within 30 seconds">
                    <div className="my-3 space-y-3">
                        {[
                            ['Q: React lifecycle methods?', 'Mounting: constructor → render → componentDidMount (≈ useEffect(fn, [])).\nUpdating: render → componentDidUpdate (≈ useEffect(fn, [deps])).\nUnmounting: componentWillUnmount (≈ useEffect cleanup return).\n→ Hooks have replaced lifecycle methods. But you must know the mapping.'],
                            ['Q: useState vs useRef?', 'useState: stores state, changes → re-render.\nuseRef: stores a value, changes → NO re-render.\n→ useRef for: DOM reference, timer ID, previous value, mutable value that doesn\'t need UI update.'],
                            ['Q: useEffect dependency array?', 'useEffect(fn) — runs EVERY render.\nuseEffect(fn, []) — runs once after mount.\nuseEffect(fn, [a, b]) — runs when a or b changes.\nCleanup: return () => {} — runs on unmount or before new effect.'],
                            ['Q: Why do we need key in lists?', 'key helps React identify which elements changed, were added, or removed (reconciliation).\n❌ Using index as key → bugs when reordering/deleting (state mixes between items).\n✅ Use unique ID (from API, UUID).\n→ No key → React uses index by default → warning.'],
                            ['Q: Controlled vs Uncontrolled component?', 'Controlled: React manages value via state (value={state}, onChange={setState}).\nUncontrolled: DOM manages value, React reads via ref (useRef).\n→ Simple forms: uncontrolled (register ref). Complex forms: controlled (real-time validation).'],
                            ['Q: useMemo vs useCallback?', 'useMemo: memoizes COMPUTED VALUE → useMemo(() => expensiveCalc(a), [a]).\nuseCallback: memoizes FUNCTION → useCallback(fn, [deps]).\nuseCallback(fn, deps) = useMemo(() => fn, deps).\n→ Only use when: 1) heavy computation 2) reference equality matters 3) React.memo child.'],
                            ['Q: What is props drilling? Solutions?', 'Props drilling: passing props through many intermediate component layers.\nSolutions:\n1. Context API — share global state (theme, auth, locale).\n2. Composition — render children directly.\n3. State management — Redux, Zustand.\n→ Context is good for low-frequency updates. Redux/Zustand for complex state.'],
                            ['Q: When does React re-render?', '1. State changes (setState).\n2. Props change.\n3. Parent re-renders (even if props haven\'t changed!).\n4. Context value changes.\n→ Avoid unnecessary re-renders: React.memo, useMemo, useCallback, state colocation.'],
                            ['Q: Explain Virtual DOM.', 'Virtual DOM = JS object representing the real DOM.\nWhen state changes:\n1. React creates a new Virtual DOM.\n2. Compares (diffs) with the old Virtual DOM.\n3. Calculates minimal changes (reconciliation).\n4. Batch updates the real DOM.\n→ Faster than direct DOM manipulation because of batch updates + minimal DOM operations.'],
                            ['Q: When to use useContext?', 'useContext: share global data without props drilling.\nUse cases: theme, language/locale, auth user, toast notifications.\n⚠️ Limitation: ALL consumers re-render when context value changes.\n→ Split context by domain. Don\'t use for frequently changing data (mouse position).'],
                            ['Q: What is a Higher-Order Component (HOC)?', 'HOC = function that takes a component and returns a new component with added logic.\nExample: withAuth(Component) → checks auth before rendering.\nDrawbacks: wrapper hell, hard to debug, naming collisions.\n→ Hooks have replaced most HOC use cases. But HOCs are still used for cross-cutting concerns.'],
                            ['Q: What are custom hooks? Give an example.', 'Custom hook = function starting with "use", using hooks inside.\nExamples: useDebounce, useLocalStorage, useWindowSize, useFetch.\nKey feature: shares logic, NOT state (each component using the hook has its own state).\n→ Rule: logic reused ≥ 2 times → extract into a custom hook.'],
                            ['Q: What is one-way data binding? How is it different from two-way?', 'One-way: data flows in 1 direction only: State → UI. To update state you MUST write a handler (onChange).\nTwo-way (Angular ngModel): State ↔ UI sync automatically in both directions.\nReact chose one-way because it\'s easier to debug — you always know WHO and WHEN changed the state.\nTrade-off: more code (onChange handlers) but predictable, fewer "mystery state change" bugs.'],
                        ].map(([q, a]) => (
                            <div key={q} className="p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                                <div className="text-cyan-400 text-sm font-bold mb-2">{q}</div>
                                <div className="text-slate-300 text-sm whitespace-pre-line">{a}</div>
                            </div>
                        ))}
                    </div>
                    <Callout type="tip">Companies ask React the most: <Highlight>hooks, lifecycle, key, controlled forms, re-render optimization</Highlight>. Master these 12 questions and you&apos;ll cover 80% of React interview questions.</Callout>
                </TopicModal>
            </div>

            <Heading3>2.5 CORS, Cookies &amp; JWT</Heading3>
            <div className="my-4 space-y-2">
                <TopicModal title="CORS, Cookies & JWT" emoji="🔐" color="#f97316" summary="Authentication & Security — 3 related concepts often asked together in interviews">
                    <Paragraph><Highlight>CORS</Highlight> = who can call the API. <Highlight>JWT</Highlight> = who you are. <Highlight>Cookie</Highlight> = how to transport JWT securely.</Paragraph>

                    <div className="my-3 space-y-2">
                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-blue-400 font-bold text-sm">🌐 CORS (Cross-Origin Resource Sharing)</div>
                            <div className="text-slate-300 text-sm mt-1">
                                Browsers enforce <strong>Same-Origin Policy</strong>: only allows requests to the same origin (protocol + domain + port).<br />
                                <strong>CORS = mechanism for the server to say &quot;I accept requests from other origins&quot;</strong><br /><br />
                                • <InlineCode>Access-Control-Allow-Origin</InlineCode>: which origins are allowed<br />
                                • <InlineCode>Access-Control-Allow-Methods</InlineCode>: GET, POST, PUT...<br />
                                • <InlineCode>Access-Control-Allow-Credentials: true</InlineCode>: allow sending cookies<br />
                                • <strong>Preflight (OPTIONS)</strong>: browser sends OPTIONS before POST JSON / custom headers
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                            <div className="text-yellow-400 font-bold text-sm">🍪 Cookies</div>
                            <div className="text-slate-300 text-sm mt-1">
                                Cookie = data the server sends back, <strong>browser automatically sends it with every request</strong>.<br /><br />
                                • <InlineCode>HttpOnly</InlineCode>: JS cannot read it (prevents XSS stealing cookies)<br />
                                • <InlineCode>Secure</InlineCode>: only sent over HTTPS<br />
                                • <InlineCode>SameSite=Strict</InlineCode>: only sent for same-site requests (prevents CSRF)<br />
                                • <InlineCode>SameSite=Lax</InlineCode>: allows top-level navigation (clicking links)<br />
                                • <InlineCode>SameSite=None</InlineCode>: cross-site OK (requires Secure, used for OAuth)<br />
                                • <InlineCode>Max-Age</InlineCode>: lifetime in seconds. Not set = session cookie (lost on browser close)
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="text-green-400 font-bold text-sm">🎫 JWT (JSON Web Token)</div>
                            <div className="text-slate-300 text-sm mt-1">
                                JWT = a token that <strong>contains user info itself</strong>, server doesn&apos;t need to store sessions.<br />
                                <strong>3 parts</strong>: header.payload.signature<br /><br />
                                • <strong>Header</strong>: algorithm + type (<InlineCode>{`{"alg":"HS256","typ":"JWT"}`}</InlineCode>)<br />
                                • <strong>Payload</strong>: data/claims (<InlineCode>{`{"userId":"1001","role":"admin","exp":...}`}</InlineCode>)<br />
                                • <strong>Signature</strong>: HMAC(header + payload, SECRET) → verifies token hasn&apos;t been tampered
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                            <div className="text-orange-400 font-bold text-sm">🔗 How do they relate?</div>
                            <div className="text-slate-300 text-sm mt-1">
                                1. User login → server creates <strong>JWT</strong> (signed with SECRET_KEY)<br />
                                2. Server sends JWT in an <strong>HttpOnly Cookie</strong> (most secure)<br />
                                3. Browser automatically sends cookie with every request → server verifies JWT<br />
                                4. If cross-origin → need <strong>CORS</strong> to allow + <InlineCode>credentials: true</InlineCode>
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                            <div className="text-red-400 font-bold text-sm">📦 Where to store JWT?</div>
                            <div className="text-slate-300 text-sm mt-1">
                                • <strong>HttpOnly Cookie</strong> ✅ — JS cannot read it (prevents XSS). Best practice!<br />
                                • <strong>localStorage</strong> ❌ — XSS can read token! Avoid for auth tokens<br />
                                • <strong>Memory (RAM)</strong> — Most secure but lost on page refresh
                            </div>
                        </div>
                    </div>

                    <CodeBlock title="cors-cookies-jwt.ts">{`// ===== Express Setup =====
app.use(cors({
  origin: 'https://myapp.com',      // CORS: allow frontend
  credentials: true,                  // CORS: allow cookies
}))

// Login → set JWT in HttpOnly Cookie
app.post('/login', async (req, res) => {
  const user = await authenticate(req.body)
  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )
  res.cookie('token', token, {
    httpOnly: true,     // ← Prevent XSS
    secure: true,       // ← HTTPS only
    sameSite: 'strict', // ← Prevent CSRF
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  })
  res.json({ message: 'Logged in', user })
})

// Middleware: verify JWT from cookie
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
// MUST use credentials: 'include' for browser to send cookies cross-origin
const res = await fetch('https://api.myapp.com/profile', {
  credentials: 'include',  // ← Send cookies!
  headers: { 'Content-Type': 'application/json' },
})`}</CodeBlock>

                    <Callout type="tip">Interview: {'"Explain CORS"'} + {'"Where to store JWT securely?"'} + {'"What is HttpOnly cookie?"'} = <Highlight>3 questions often asked together</Highlight>. Being able to explain the full flow (login → JWT → cookie → CORS) → senior answer.</Callout>
                </TopicModal>
            </div>

            {/* ===== PHASE 3 ===== */}
        </>
    )
}
