import { Heading2, Paragraph, Highlight, Callout } from '../components/BlogComponents'
import { TopicModal } from '../components/TopicModal'

export const enContent = (
    <>
        <Paragraph>
            HR screening rounds are your <Highlight>first impression</Highlight> — they decide if you move to technical rounds.
            Many strong developers fail here because they only prepare for coding questions.
            This guide covers the most common behavioral questions with proven answer frameworks.
        </Paragraph>

        <Callout type="info">
            <strong>Golden rule:</strong> Every answer should follow the <Highlight>STAR framework</Highlight> — Situation, Task, Action, Result.
            Keep answers under 2 minutes. Be specific, not generic.
        </Callout>

        {/* ===== STAR FRAMEWORK ===== */}
        <Heading2>⭐ STAR Framework — Nền tảng mọi câu trả lời</Heading2>

        <div className="my-4 space-y-2">
            <TopicModal title="STAR Method" emoji="⭐" color="#f59e0b" summary="Situation → Task → Action → Result — structure every behavioral answer">
                <Paragraph>Every behavioral answer should follow this structure:</Paragraph>

                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="text-yellow-400 font-bold text-sm">📌 S — Situation (15%)</div>
                        <div className="text-slate-300 text-sm mt-1">
                            Set the context briefly. Company, team, project.<br />
                            &quot;At my previous company, we had a React dashboard with 50+ pages serving 10K daily users...&quot;
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">📌 T — Task (15%)</div>
                        <div className="text-slate-300 text-sm mt-1">
                            Your specific responsibility. What was expected of you?<br />
                            &quot;I was responsible for improving page load time, which was averaging 8 seconds...&quot;
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">📌 A — Action (50%)</div>
                        <div className="text-slate-300 text-sm mt-1">
                            What YOU did (not &quot;we&quot;). Be specific about technologies, decisions, trade-offs.<br />
                            &quot;I profiled with Chrome DevTools, identified 3 main bottlenecks, implemented code splitting with React.lazy...&quot;
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">📌 R — Result (20%)</div>
                        <div className="text-slate-300 text-sm mt-1">
                            <strong>Quantify!</strong> Numbers make your answer credible.<br />
                            &quot;Page load dropped from 8s to 2.1s, bounce rate decreased 35%, and we received positive client feedback...&quot;
                        </div>
                    </div>
                </div>

                <Callout type="tip">
                    <strong>Pro tip:</strong> Prepare <Highlight>5-7 STAR stories</Highlight> from your experience. You can reuse and adapt them for different questions.
                    Each story should showcase a different skill: leadership, conflict resolution, problem-solving, teamwork, failure handling.
                </Callout>
            </TopicModal>
        </div>

        {/* ===== SCREENING QUESTIONS ===== */}
        <Heading2>📞 HR Screening Questions</Heading2>

        <div className="my-4 space-y-2">
            <TopicModal title="Tell me about yourself" emoji="👤" color="#3b82f6" summary="The most important question — your 60-second elevator pitch">
                <Paragraph>This is your <Highlight>elevator pitch</Highlight>. Structure: Present → Past → Future.</Paragraph>

                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">✅ Formula: Present → Past → Future</div>
                        <div className="text-slate-300 text-sm mt-1">
                            <strong>Present:</strong> &quot;I&apos;m a frontend developer with 3 years of experience, currently working at X where I build React applications...&quot;<br />
                            <strong>Past:</strong> &quot;Before that, I worked at Y where I led the migration from jQuery to React, improving performance by 40%...&quot;<br />
                            <strong>Future:</strong> &quot;I&apos;m looking for a role where I can work on complex UI challenges and grow into a senior position...&quot;
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <div className="text-red-400 font-bold text-sm">❌ Common mistakes</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Too long (keep under 90 seconds)<br />
                            • Reciting your resume line by line<br />
                            • Starting with &quot;I was born in...&quot; or personal life<br />
                            • Being too vague: &quot;I&apos;m passionate about coding&quot;<br />
                            • Not mentioning why this company/role interests you
                        </div>
                    </div>
                </div>
            </TopicModal>

            <TopicModal title="Why are you leaving / Why did you leave?" emoji="🚪" color="#ef4444" summary="Tricky question — stay positive, focus on growth">
                <Paragraph>Rule #1: <Highlight>NEVER badmouth</Highlight> your previous employer. Even if they were terrible.</Paragraph>

                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">✅ Good answers — focus on PULL (what attracts you)</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • &quot;I&apos;ve learned a lot at my current role, but I&apos;m looking for more complex technical challenges...&quot;<br />
                            • &quot;The tech stack here is exactly what I&apos;m passionate about — React + TypeScript + Next.js...&quot;<br />
                            • &quot;I want to work on products that impact more users...&quot;<br />
                            • &quot;I&apos;m looking for a stronger engineering culture with code reviews and technical mentorship...&quot;
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <div className="text-red-400 font-bold text-sm">❌ Never say</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • &quot;My boss was terrible&quot; → shows you might say this about them too<br />
                            • &quot;I was bored&quot; → sounds unmotivated<br />
                            • &quot;For more money&quot; → save for negotiation phase<br />
                            • &quot;Company was disorganized&quot; → sounds like you can&apos;t handle ambiguity
                        </div>
                    </div>
                </div>
            </TopicModal>

            <TopicModal title="Why this company?" emoji="🏢" color="#8b5cf6" summary="Show you've done your research — be specific">
                <Paragraph>Generic answers like &quot;great company culture&quot; = instant red flag. Be <Highlight>specific</Highlight>.</Paragraph>

                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">✅ Research checklist before interview</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Company&apos;s tech blog / engineering blog<br />
                            • Recent product launches or features<br />
                            • Tech stack (check job description, GitHub, StackShare)<br />
                            • Company values and mission<br />
                            • Recent news, funding rounds, growth
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">💬 Example answer</div>
                        <div className="text-slate-300 text-sm mt-1">
                            &quot;I read your engineering blog about migrating to micro-frontends, and that&apos;s exactly the architecture challenge I want to work on.
                            Plus, your product serves millions of users — I want to work at that scale where performance optimization truly matters.&quot;
                        </div>
                    </div>
                </div>
            </TopicModal>

            <TopicModal title="What's your expected salary?" emoji="💰" color="#10b981" summary="Negotiation strategy — know your worth, delay if possible">
                <Paragraph>Salary negotiation is a <Highlight>game of information</Highlight>. Whoever reveals their number first has less leverage.</Paragraph>

                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">🎯 Strategy: Delay → Range → Total Comp</div>
                        <div className="text-slate-300 text-sm mt-1">
                            <strong>Level 1 — Delay:</strong> &quot;I&apos;d like to learn more about the role and responsibilities before discussing compensation. What&apos;s the budget range for this position?&quot;<br /><br />
                            <strong>Level 2 — Range:</strong> If pressed, give a range (your ideal + 15-20% buffer): &quot;Based on my research and experience, I&apos;m looking at $X-$Y range&quot;<br /><br />
                            <strong>Level 3 — Total comp:</strong> &quot;I evaluate the total package — base, bonus, equity, remote flexibility, learning budget...&quot;
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="text-yellow-400 font-bold text-sm">📊 Research beforehand</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Glassdoor, Levels.fyi, LinkedIn Salary Insights<br />
                            • Ask peers in similar roles (developer communities, Discord)<br />
                            • Factor in: location, company size, remote vs onsite<br />
                            • Know your BATNA (Best Alternative To a Negotiated Agreement)
                        </div>
                    </div>
                </div>

                <Callout type="warning">
                    Never say your current salary. In many places, it&apos;s illegal for them to ask.
                    If pressed: &quot;I prefer to focus on the value I bring and the market rate for this role.&quot;
                </Callout>
            </TopicModal>
        </div>

        {/* ===== BEHAVIORAL QUESTIONS ===== */}
        <Heading2>🧠 Behavioral Questions</Heading2>

        <div className="my-4 space-y-2">
            <TopicModal title="Tell me about a challenging project" emoji="🏔️" color="#f97316" summary="Show problem-solving, technical depth, and impact">
                <Paragraph>Pick a project that shows <Highlight>technical depth + business impact</Highlight>.</Paragraph>

                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                        <div className="text-orange-400 font-bold text-sm">📋 Checklist for a great story</div>
                        <div className="text-slate-300 text-sm mt-1">
                            ✅ Clear problem statement with constraints<br />
                            ✅ YOUR specific contributions (not the team&apos;s)<br />
                            ✅ Technical decisions and trade-offs you considered<br />
                            ✅ Obstacles you overcame<br />
                            ✅ Measurable results (numbers!)<br />
                            ✅ Lessons learned
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">💬 Example structure</div>
                        <div className="text-slate-300 text-sm mt-1">
                            &quot;We had a dashboard loading 50 charts simultaneously — page took 12s to load. I proposed lazy loading with intersection observer + React.lazy for code splitting. The tricky part was maintaining shared filters across lazy-loaded components — I solved it with a context + URL search params pattern. Result: load time dropped to 2.8s, and we reused this pattern across 3 other projects.&quot;
                        </div>
                    </div>
                </div>
            </TopicModal>

            <TopicModal title="Tell me about a conflict with a colleague" emoji="⚡" color="#ef4444" summary="Show emotional intelligence and conflict resolution skills">
                <Paragraph>They don&apos;t want drama — they want to see <Highlight>how you handle disagreements professionally</Highlight>.</Paragraph>

                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <div className="text-red-400 font-bold text-sm">🎯 Answer framework</div>
                        <div className="text-slate-300 text-sm mt-1">
                            1. <strong>Context:</strong> What was the disagreement about? (technical, not personal)<br />
                            2. <strong>Your approach:</strong> Listen first, understand their perspective<br />
                            3. <strong>Resolution:</strong> Find common ground, compromise, or escalate constructively<br />
                            4. <strong>Result:</strong> Better outcome than either original proposal<br />
                            5. <strong>Lesson:</strong> What you learned about collaboration
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">💬 Example</div>
                        <div className="text-slate-300 text-sm mt-1">
                            &quot;A backend dev wanted to move all filtering logic to the server. I preferred client-side for UX responsiveness. Instead of arguing, I built a quick prototype of both approaches and measured performance. We ended up with a hybrid: server-side for initial load, client-side for subsequent filters. Both of us learned something, and the product was better for it.&quot;
                        </div>
                    </div>
                </div>
            </TopicModal>

            <TopicModal title="Tell me about a time you failed" emoji="💥" color="#6366f1" summary="Show self-awareness, learning ability, and growth mindset">
                <Paragraph>They want to see <Highlight>self-awareness</Highlight> and <Highlight>growth mindset</Highlight>. Pick a real failure, not a humble brag.</Paragraph>

                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                        <div className="text-indigo-400 font-bold text-sm">✅ Good failure story structure</div>
                        <div className="text-slate-300 text-sm mt-1">
                            1. <strong>What happened:</strong> Be honest about the mistake<br />
                            2. <strong>Why it happened:</strong> Show you understand the root cause<br />
                            3. <strong>Impact:</strong> Don&apos;t minimize — own it<br />
                            4. <strong>What you did to fix it:</strong> Show responsibility<br />
                            5. <strong>What you learned:</strong> THIS IS THE MOST IMPORTANT PART<br />
                            6. <strong>What you changed:</strong> Concrete process/behavior changes
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <div className="text-red-400 font-bold text-sm">❌ Bad answers</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • &quot;I&apos;ve never really failed&quot; → not self-aware<br />
                            • &quot;I work too hard&quot; → cliché humble brag<br />
                            • Blaming others → shows no ownership<br />
                            • Too catastrophic (got fired, legal issues) → TMI
                        </div>
                    </div>
                </div>
            </TopicModal>

            <TopicModal title="Where do you see yourself in 5 years?" emoji="🔭" color="#10b981" summary="Show ambition aligned with the company's growth">
                <Paragraph>Show <Highlight>ambition + alignment</Highlight> with the role and company.</Paragraph>

                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">✅ Good answers by seniority</div>
                        <div className="text-slate-300 text-sm mt-1">
                            <strong>Junior → Mid:</strong> &quot;I want to master React and frontend architecture, contribute to system design decisions, and mentor junior devs...&quot;<br /><br />
                            <strong>Mid → Senior:</strong> &quot;I want to lead technical initiatives, drive architecture decisions, and grow into a tech lead who can bridge engineering and product...&quot;<br /><br />
                            <strong>Senior → Staff/Principal:</strong> &quot;I want to define engineering standards across teams, drive cross-team technical strategies, and have org-wide impact...&quot;
                        </div>
                    </div>
                </div>
            </TopicModal>
        </div>

        {/* ===== TRICKY QUESTIONS ===== */}
        <Heading2>🎭 Tricky Questions</Heading2>

        <div className="my-4 space-y-2">
            <TopicModal title="What do you dislike about React?" emoji="😤" color="#ef4444" summary="Show depth, not frustration — acknowledge + explain + show how you deal with it">
                <Paragraph>This tests whether you can <Highlight>critique constructively</Highlight> vs just complain.</Paragraph>

                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <div className="text-red-400 font-bold text-sm">❌ Bad answers (instant red flag)</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • &quot;Libraries change every day&quot; → sounds like you can&apos;t keep up<br />
                            • &quot;Too complex&quot; → sounds junior<br />
                            • &quot;I hate JSX&quot; → sounds like you don&apos;t understand the tool<br />
                            • &quot;Nothing, React is perfect&quot; → sounds dishonest
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">✅ Formula: Acknowledge → Why → How you deal with it</div>
                        <div className="text-slate-300 text-sm mt-1">
                            <strong>Option 1 (Re-render cascade):</strong> &quot;React&apos;s re-rendering model can be tricky — parent re-renders trigger all children. But I&apos;ve learned to handle it with React.memo, proper component composition, and the DevTools Profiler.&quot;<br /><br />
                            <strong>Option 2 (useEffect complexity):</strong> &quot;Managing complex side effects with useEffect — stale closures, dependency arrays — can be error-prone. This pushed me to learn better patterns like custom hooks and React Query.&quot;<br /><br />
                            <strong>Option 3 (Ecosystem fragmentation):</strong> &quot;The ecosystem has many competing solutions for styling, state, routing. But I see this as React&apos;s strength too — freedom to choose the right tool for the job.&quot;
                        </div>
                    </div>
                </div>

                <Callout type="tip">
                    <strong>Pattern:</strong> &quot;I find X challenging, but I&apos;ve solved it with Y, and it helped me understand Z better.&quot;
                    This shows technical depth + growth mindset.
                </Callout>
            </TopicModal>

            <TopicModal title="What's your biggest weakness?" emoji="🪞" color="#8b5cf6" summary="Be genuine — pick a real weakness you're actively improving">
                <Paragraph>Pick a <Highlight>real weakness</Highlight> (not &quot;I work too hard&quot;) that you&apos;re <Highlight>actively improving</Highlight>.</Paragraph>

                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">✅ Good examples for developers</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • &quot;I tend to over-engineer solutions. I&apos;m learning to ship MVPs first and iterate based on real feedback.&quot;<br />
                            • &quot;I used to struggle with estimating task duration. Now I break tasks into smaller chunks and add 30% buffer.&quot;<br />
                            • &quot;Writing documentation wasn&apos;t my priority before. I now document decisions in ADRs (Architecture Decision Records).&quot;<br />
                            • &quot;I&apos;m an introvert, so speaking up in large meetings was hard. I started writing my thoughts beforehand and sharing them proactively.&quot;
                        </div>
                    </div>
                </div>
            </TopicModal>

            <TopicModal title="Do you have questions for us?" emoji="❓" color="#f97316" summary="ALWAYS have questions — this is your turn to interview them">
                <Paragraph>Saying &quot;no questions&quot; = <Highlight>biggest red flag</Highlight>. Prepare at least 3-5 questions.</Paragraph>

                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                        <div className="text-orange-400 font-bold text-sm">🏆 Great questions to ask</div>
                        <div className="text-slate-300 text-sm mt-1">
                            <strong>About the role:</strong><br />
                            • &quot;What does a typical sprint look like for this team?&quot;<br />
                            • &quot;What&apos;s the biggest technical challenge the team is currently facing?&quot;<br />
                            • &quot;How do you measure success for this position in the first 90 days?&quot;<br /><br />
                            <strong>About culture:</strong><br />
                            • &quot;How does the team handle code reviews?&quot;<br />
                            • &quot;What&apos;s the learning and growth path for engineers here?&quot;<br />
                            • &quot;How do you balance tech debt vs feature development?&quot;<br /><br />
                            <strong>About tech:</strong><br />
                            • &quot;What&apos;s your CI/CD pipeline like?&quot;<br />
                            • &quot;How do you approach testing? What&apos;s your test coverage goal?&quot;<br />
                            • &quot;Are there opportunities to contribute to architecture decisions?&quot;
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <div className="text-red-400 font-bold text-sm">❌ Don&apos;t ask (in screening round)</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • &quot;How much vacation do I get?&quot; → save for offer stage<br />
                            • &quot;Can I work from home?&quot; → if not mentioned, ask subtly<br />
                            • &quot;What does the company do?&quot; → you should already know<br />
                            • Nothing at all → biggest red flag
                        </div>
                    </div>
                </div>
            </TopicModal>
        </div>

        {/* ===== COMMUNICATION TIPS ===== */}
        <Heading2>💬 Communication Tips</Heading2>

        <div className="my-4 space-y-2">
            <TopicModal title="Virtual Interview Best Practices" emoji="🖥️" color="#3b82f6" summary="Camera, audio, background, and body language for video calls">
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">🎥 Technical setup</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Camera at eye level, face well-lit (light source in front, not behind)<br />
                            • Test audio before — use headphones to avoid echo<br />
                            • Clean, neutral background (or use blur)<br />
                            • Close unnecessary apps — no notifications during interview<br />
                            • Have backup plan (phone hotspot, interviewer&apos;s phone number)
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">🗣️ Communication</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <strong>Pace:</strong> Speak slightly slower than normal — video adds delay<br />
                            • <strong>Pause:</strong> Take 2-3 seconds before answering — shows you&apos;re thinking<br />
                            • <strong>Structure:</strong> &quot;There are 3 reasons...&quot; → numbered answers are easier to follow<br />
                            • <strong>Enthusiasm:</strong> Smile, nod, use hand gestures — video flattens energy<br />
                            • <strong>Honesty:</strong> &quot;That&apos;s a great question, let me think...&quot; is better than rambling
                        </div>
                    </div>
                </div>
            </TopicModal>
        </div>

        {/* ===== RED FLAGS ===== */}
        <Heading2>🚩 Red & Green Flags</Heading2>

        <div className="my-3 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
                <thead><tr className="border-b border-white/10">
                    <th className="text-left p-3 text-red-400 font-medium">🚩 Red flags (from you)</th>
                    <th className="text-left p-3 text-green-400 font-medium">✅ Green flags (from you)</th>
                </tr></thead>
                <tbody className="text-slate-300">
                    <tr className="border-b border-white/5"><td className="p-3">Badmouthing previous employer</td><td className="p-3">Speaking positively about past learning</td></tr>
                    <tr className="border-b border-white/5"><td className="p-3">Saying &quot;we did X&quot; for everything</td><td className="p-3">Clear &quot;I specifically did X&quot; ownership</td></tr>
                    <tr className="border-b border-white/5"><td className="p-3">Vague answers without specifics</td><td className="p-3">Numbers, metrics, concrete examples</td></tr>
                    <tr className="border-b border-white/5"><td className="p-3">No questions at the end</td><td className="p-3">Thoughtful questions about the team/role</td></tr>
                    <tr className="border-b border-white/5"><td className="p-3">&quot;I&apos;ve never failed&quot;</td><td className="p-3">Honest about failures + lessons learned</td></tr>
                    <tr><td className="p-3">Only talking about technology</td><td className="p-3">Connecting tech to business impact</td></tr>
                </tbody>
            </table>
        </div>

        <Callout type="tip">
            <strong>Final tip:</strong> Practice out loud! Record yourself answering these questions.
            Hearing yourself helps you cut &quot;um&quot;s, tighten answers, and build confidence.
            Do at least 2-3 mock interviews with friends before the real thing.
        </Callout>
    </>
)
