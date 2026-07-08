import { BlogPost } from '../types'
import { Heading2, Paragraph, Highlight, Callout } from '../components/BlogComponents'
import { TopicModal } from '../components/TopicModal'
import { enContent } from './behavioral-interview-en'

const viContent = (
    <>
        <Paragraph>
            Vòng screening với HR là <Highlight>ấn tượng đầu tiên</Highlight> — nó quyết định bạn có được vào vòng technical không.
            Nhiều developer giỏi bị trượt ở đây vì chỉ chuẩn bị cho câu hỏi code.
            Guide này cover những câu hỏi behavioral phổ biến nhất cùng framework trả lời đã được chứng minh hiệu quả.
        </Paragraph>

        <Callout type="info">
            <strong>Quy tắc vàng:</strong> Mọi câu trả lời nên theo framework <Highlight>STAR</Highlight> — Situation, Task, Action, Result.
            Giữ câu trả lời dưới 2 phút. Cụ thể, không chung chung.
        </Callout>

        {/* ===== STAR FRAMEWORK ===== */}
        <Heading2>⭐ STAR Framework — Nền tảng mọi câu trả lời</Heading2>

        <div className="my-4 space-y-2">
            <TopicModal title="Phương pháp STAR" emoji="⭐" color="#f59e0b" summary="Situation → Task → Action → Result — cấu trúc hoá mọi câu trả lời behavioral">
                <Paragraph>Mọi câu trả lời behavioral nên theo cấu trúc này:</Paragraph>

                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="text-yellow-400 font-bold text-sm">📌 S — Situation (15%)</div>
                        <div className="text-slate-300 text-sm mt-1">
                            Mô tả bối cảnh ngắn gọn. Công ty, team, dự án.<br />
                            &quot;Ở công ty trước, mình làm React dashboard 50+ trang, 10K users/ngày...&quot;
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">📌 T — Task (15%)</div>
                        <div className="text-slate-300 text-sm mt-1">
                            Nhiệm vụ cụ thể của BẠN. Bạn được giao gì?<br />
                            &quot;Mình chịu trách nhiệm cải thiện page load time đang trung bình 8s...&quot;
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">📌 A — Action (50%)</div>
                        <div className="text-slate-300 text-sm mt-1">
                            BẠN đã làm gì (không phải &quot;chúng tôi&quot;). Cụ thể về công nghệ, quyết định, trade-offs.<br />
                            &quot;Mình profile bằng Chrome DevTools, tìm ra 3 bottleneck chính, implement code splitting với React.lazy...&quot;
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">📌 R — Result (20%)</div>
                        <div className="text-slate-300 text-sm mt-1">
                            <strong>Đưa ra CON SỐ!</strong> Số liệu làm câu trả lời đáng tin hơn.<br />
                            &quot;Page load giảm từ 8s xuống 2.1s, bounce rate giảm 35%, client feedback tích cực...&quot;
                        </div>
                    </div>
                </div>

                <Callout type="tip">
                    <strong>Pro tip:</strong> Chuẩn bị <Highlight>5-7 STAR stories</Highlight> từ kinh nghiệm thực tế. Mỗi story showcase 1 kỹ năng khác nhau:
                    leadership, giải quyết conflict, problem-solving, teamwork, xử lý thất bại.
                </Callout>
            </TopicModal>
        </div>

        {/* ===== SCREENING QUESTIONS ===== */}
        <Heading2>📞 Câu hỏi HR Screening</Heading2>

        <div className="my-4 space-y-2">
            <TopicModal title="Giới thiệu về bản thân" emoji="👤" color="#3b82f6" summary="Câu hỏi quan trọng nhất — elevator pitch 60 giây">
                <Paragraph>Đây là <Highlight>elevator pitch</Highlight> của bạn. Cấu trúc: Hiện tại → Quá khứ → Tương lai.</Paragraph>

                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">✅ Công thức: Hiện tại → Quá khứ → Tương lai</div>
                        <div className="text-slate-300 text-sm mt-1">
                            <strong>Hiện tại:</strong> &quot;Em là frontend developer 3 năm kinh nghiệm, hiện đang làm ở X, build React applications...&quot;<br />
                            <strong>Quá khứ:</strong> &quot;Trước đó, em ở Y, lead migration từ jQuery sang React, cải thiện performance 40%...&quot;<br />
                            <strong>Tương lai:</strong> &quot;Em đang tìm một vị trí có thể làm việc với UI challenges phức tạp và phát triển lên senior...&quot;
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <div className="text-red-400 font-bold text-sm">❌ Sai lầm thường gặp</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Nói quá dài (giữ dưới 90 giây)<br />
                            • Đọc lại CV từ đầu đến cuối<br />
                            • Bắt đầu bằng &quot;Em sinh năm...&quot; hoặc đời tư<br />
                            • Quá chung chung: &quot;Em đam mê coding&quot;<br />
                            • Không nhắc tại sao muốn vào công ty này
                        </div>
                    </div>
                </div>
            </TopicModal>

            <TopicModal title="Tại sao bạn nghỉ / muốn nghỉ?" emoji="🚪" color="#ef4444" summary="Câu hỏi tricky — giữ positive, focus vào sự phát triển">
                <Paragraph>Rule #1: <Highlight>TUYỆT ĐỐI KHÔNG nói xấu</Highlight> công ty cũ. Dù họ có tệ thế nào.</Paragraph>

                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">✅ Trả lời tốt — focus vào PULL (điều gì hấp dẫn bạn)</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • &quot;Em đã học được rất nhiều ở chỗ cũ, nhưng em muốn thử thách kỹ thuật phức tạp hơn...&quot;<br />
                            • &quot;Tech stack bên này chính xác là thứ em đam mê — React + TypeScript + Next.js...&quot;<br />
                            • &quot;Em muốn làm sản phẩm impact nhiều users hơn...&quot;<br />
                            • &quot;Em tìm kiếm engineering culture mạnh hơn với code review và mentorship...&quot;
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <div className="text-red-400 font-bold text-sm">❌ Đừng bao giờ nói</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • &quot;Sếp tệ lắm&quot; → họ nghĩ bạn sẽ nói vậy về họ<br />
                            • &quot;Chán rồi&quot; → nghe thiếu động lực<br />
                            • &quot;Muốn lương cao hơn&quot; → để cho giai đoạn negotiate<br />
                            • &quot;Công ty lộn xộn&quot; → nghe như bạn không handle được ambiguity
                        </div>
                    </div>
                </div>
            </TopicModal>

            <TopicModal title="Tại sao chọn công ty này?" emoji="🏢" color="#8b5cf6" summary="Chứng minh bạn đã research — phải cụ thể">
                <Paragraph>Trả lời chung chung &quot;văn hoá công ty tốt&quot; = red flag ngay. Phải <Highlight>cụ thể</Highlight>.</Paragraph>

                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">✅ Checklist research trước phỏng vấn</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Tech blog / engineering blog của công ty<br />
                            • Sản phẩm mới ra mắt hoặc tính năng gần đây<br />
                            • Tech stack (xem JD, GitHub, StackShare)<br />
                            • Giá trị và sứ mệnh công ty<br />
                            • Tin tức, funding, tốc độ tăng trưởng
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">💬 Ví dụ trả lời</div>
                        <div className="text-slate-300 text-sm mt-1">
                            &quot;Em đọc engineering blog của công ty về việc migrate sang micro-frontends — đó chính xác là kiến trúc em muốn làm việc.
                            Ngoài ra, sản phẩm serve hàng triệu users — em muốn làm ở scale mà performance optimization thực sự quan trọng.&quot;
                        </div>
                    </div>
                </div>
            </TopicModal>

            <TopicModal title="Mức lương mong muốn?" emoji="💰" color="#10b981" summary="Chiến lược negotiate — biết giá trị, delay nếu có thể">
                <Paragraph>Negotiate lương là <Highlight>trò chơi thông tin</Highlight>. Ai nói số trước sẽ bất lợi hơn.</Paragraph>

                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">🎯 Chiến lược: Delay → Range → Total Comp</div>
                        <div className="text-slate-300 text-sm mt-1">
                            <strong>Level 1 — Delay:</strong> &quot;Em muốn tìm hiểu thêm về role và responsibilities trước khi thảo luận compensation. Budget range cho vị trí này là bao nhiêu ạ?&quot;<br /><br />
                            <strong>Level 2 — Range:</strong> Nếu bị ép, đưa range (mức lý tưởng + 15-20% buffer): &quot;Theo research và kinh nghiệm, em expect range $X-$Y&quot;<br /><br />
                            <strong>Level 3 — Total comp:</strong> &quot;Em đánh giá tổng package — base, bonus, equity, remote, learning budget...&quot;
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="text-yellow-400 font-bold text-sm">📊 Research trước</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Glassdoor, Levels.fyi, LinkedIn Salary Insights<br />
                            • Hỏi peers ở role tương tự (cộng đồng dev, Discord)<br />
                            • Tính đến: location, quy mô công ty, remote vs onsite<br />
                            • Biết BATNA (Best Alternative To a Negotiated Agreement)
                        </div>
                    </div>
                </div>

                <Callout type="warning">
                    Đừng bao giờ nói lương hiện tại. Nếu bị hỏi: &quot;Em muốn focus vào giá trị em mang lại và mức thị trường cho role này.&quot;
                </Callout>
            </TopicModal>
        </div>

        {/* ===== BEHAVIORAL QUESTIONS ===== */}
        <Heading2>🧠 Câu hỏi Behavioral</Heading2>

        <div className="my-4 space-y-2">
            <TopicModal title="Kể về dự án khó nhất" emoji="🏔️" color="#f97316" summary="Show problem-solving, technical depth, và impact">
                <Paragraph>Chọn dự án thể hiện <Highlight>chiều sâu kỹ thuật + business impact</Highlight>.</Paragraph>

                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                        <div className="text-orange-400 font-bold text-sm">📋 Checklist cho story hay</div>
                        <div className="text-slate-300 text-sm mt-1">
                            ✅ Problem statement rõ ràng với constraints<br />
                            ✅ Contribution cụ thể của BẠN (không phải team)<br />
                            ✅ Quyết định kỹ thuật và trade-offs đã cân nhắc<br />
                            ✅ Obstacles đã vượt qua<br />
                            ✅ Kết quả đo lường được (con số!)<br />
                            ✅ Bài học rút ra
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">💬 Ví dụ cấu trúc</div>
                        <div className="text-slate-300 text-sm mt-1">
                            &quot;Dashboard load 50 charts cùng lúc — page 12s. Em đề xuất lazy loading với intersection observer + React.lazy code splitting. Phần khó là maintain shared filters giữa lazy components — em giải quyết bằng context + URL search params pattern. Kết quả: load time giảm còn 2.8s, pattern được reuse cho 3 project khác.&quot;
                        </div>
                    </div>
                </div>
            </TopicModal>

            <TopicModal title="Kể về xung đột với đồng nghiệp" emoji="⚡" color="#ef4444" summary="Show EQ và khả năng giải quyết conflict">
                <Paragraph>Họ không muốn drama — họ muốn xem <Highlight>bạn xử lý bất đồng chuyên nghiệp thế nào</Highlight>.</Paragraph>

                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <div className="text-red-400 font-bold text-sm">🎯 Framework trả lời</div>
                        <div className="text-slate-300 text-sm mt-1">
                            1. <strong>Bối cảnh:</strong> Bất đồng về gì? (technical, không phải cá nhân)<br />
                            2. <strong>Cách tiếp cận:</strong> Lắng nghe trước, hiểu quan điểm đối phương<br />
                            3. <strong>Giải quyết:</strong> Tìm điểm chung, compromise, hoặc escalate đúng cách<br />
                            4. <strong>Kết quả:</strong> Outcome tốt hơn cả 2 đề xuất ban đầu<br />
                            5. <strong>Bài học:</strong> Bạn học được gì về teamwork
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">💬 Ví dụ</div>
                        <div className="text-slate-300 text-sm mt-1">
                            &quot;Backend dev muốn chuyển toàn bộ filtering logic lên server. Em thích client-side cho UX responsive hơn. Thay vì tranh cãi, em build prototype cả 2 cách và đo performance. Cuối cùng chọn hybrid: server-side cho initial load, client-side cho subsequent filters. Cả 2 đều học được, sản phẩm tốt hơn.&quot;
                        </div>
                    </div>
                </div>
            </TopicModal>

            <TopicModal title="Kể về lần bạn thất bại" emoji="💥" color="#6366f1" summary="Show self-awareness, khả năng học hỏi, và growth mindset">
                <Paragraph>Họ muốn thấy <Highlight>self-awareness</Highlight> và <Highlight>growth mindset</Highlight>. Chọn thất bại thật, không phải humble brag.</Paragraph>

                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                        <div className="text-indigo-400 font-bold text-sm">✅ Cấu trúc story thất bại tốt</div>
                        <div className="text-slate-300 text-sm mt-1">
                            1. <strong>Chuyện gì xảy ra:</strong> Thành thật về lỗi sai<br />
                            2. <strong>Tại sao:</strong> Hiểu root cause<br />
                            3. <strong>Impact:</strong> Đừng minimise — own it<br />
                            4. <strong>Cách fix:</strong> Thể hiện trách nhiệm<br />
                            5. <strong>Bài học:</strong> ĐÂY LÀ PHẦN QUAN TRỌNG NHẤT<br />
                            6. <strong>Thay đổi:</strong> Process/behavior thay đổi cụ thể
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <div className="text-red-400 font-bold text-sm">❌ Trả lời tệ</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • &quot;Em chưa bao giờ thất bại&quot; → thiếu self-awareness<br />
                            • &quot;Em làm việc quá chăm chỉ&quot; → humble brag sáo rỗng<br />
                            • Đổ lỗi cho người khác → thiếu ownership<br />
                            • Quá nghiêm trọng (bị đuổi, vấn đề pháp lý) → TMI
                        </div>
                    </div>
                </div>
            </TopicModal>

            <TopicModal title="5 năm nữa bạn thấy mình ở đâu?" emoji="🔭" color="#10b981" summary="Show tham vọng phù hợp với sự phát triển của công ty">
                <Paragraph>Thể hiện <Highlight>tham vọng + alignment</Highlight> với role và công ty.</Paragraph>

                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">✅ Trả lời tốt theo cấp độ</div>
                        <div className="text-slate-300 text-sm mt-1">
                            <strong>Junior → Mid:</strong> &quot;Em muốn master React và frontend architecture, đóng góp vào system design decisions, và hướng dẫn junior devs...&quot;<br /><br />
                            <strong>Mid → Senior:</strong> &quot;Em muốn lead technical initiatives, drive architecture decisions, và phát triển thành tech lead kết nối engineering với product...&quot;<br /><br />
                            <strong>Senior → Staff/Principal:</strong> &quot;Em muốn define engineering standards across teams, drive technical strategy toàn tổ chức...&quot;
                        </div>
                    </div>
                </div>
            </TopicModal>
        </div>

        {/* ===== TRICKY QUESTIONS ===== */}
        <Heading2>🎭 Câu hỏi Tricky</Heading2>

        <div className="my-4 space-y-2">
            <TopicModal title="Bạn ghét gì ở React?" emoji="😤" color="#ef4444" summary="Show chiều sâu, không phải frustration — acknowledge + explain + cách xử lý">
                <Paragraph>Câu này test bạn có thể <Highlight>critique mang tính xây dựng</Highlight> hay chỉ than phiền.</Paragraph>

                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <div className="text-red-400 font-bold text-sm">❌ Red flag ngay lập tức</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • &quot;Lib thay đổi mỗi ngày&quot; → nghe như bạn không theo kịp<br />
                            • &quot;Quá phức tạp&quot; → nghe junior<br />
                            • &quot;Ghét JSX&quot; → nghe như không hiểu tool<br />
                            • &quot;Không có gì, React hoàn hảo&quot; → nghe không thật
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">✅ Công thức: Acknowledge → Tại sao → Cách xử lý</div>
                        <div className="text-slate-300 text-sm mt-1">
                            <strong>Option 1 (Re-render cascade):</strong> &quot;Re-rendering model của React có thể tricky — parent re-render trigger tất cả children. Nhưng em đã học cách xử lý với React.memo, component composition, và DevTools Profiler.&quot;<br /><br />
                            <strong>Option 2 (useEffect phức tạp):</strong> &quot;Quản lý side effects phức tạp với useEffect — stale closures, dependency arrays — dễ sai. Điều này khiến em học được custom hooks patterns tốt hơn và React Query.&quot;<br /><br />
                            <strong>Option 3 (Ecosystem fragmented):</strong> &quot;Ecosystem có nhiều giải pháp cạnh tranh cho styling, state, routing. Nhưng em cũng xem đó là sức mạnh — tự do chọn tool phù hợp.&quot;
                        </div>
                    </div>
                </div>

                <Callout type="tip">
                    <strong>Pattern:</strong> &quot;Em thấy X là thách thức, nhưng em đã giải quyết bằng Y, và điều đó giúp em hiểu sâu hơn về Z.&quot;
                    Thể hiện technical depth + growth mindset.
                </Callout>
            </TopicModal>

            <TopicModal title="Điểm yếu lớn nhất của bạn?" emoji="🪞" color="#8b5cf6" summary="Thành thật — chọn điểm yếu thật đang cải thiện">
                <Paragraph>Chọn <Highlight>điểm yếu thật</Highlight> (không phải &quot;em làm việc quá chăm&quot;) mà bạn đang <Highlight>tích cực cải thiện</Highlight>.</Paragraph>

                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">✅ Ví dụ tốt cho developer</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • &quot;Em hay over-engineer. Em đang học ship MVP trước rồi iterate dựa trên feedback thực tế.&quot;<br />
                            • &quot;Em từng kém estimate thời gian. Giờ em chia task nhỏ và thêm 30% buffer.&quot;<br />
                            • &quot;Viết documentation trước đây không phải priority. Giờ em document decisions bằng ADRs.&quot;<br />
                            • &quot;Em introvert, nên khó phát biểu trong meeting lớn. Em bắt đầu viết thoughts trước và chủ động share.&quot;
                        </div>
                    </div>
                </div>
            </TopicModal>

            <TopicModal title="Bạn có câu hỏi gì không?" emoji="❓" color="#f97316" summary="LUÔN LUÔN có câu hỏi — đây là lượt bạn phỏng vấn họ">
                <Paragraph>Nói &quot;không có câu hỏi&quot; = <Highlight>red flag lớn nhất</Highlight>. Chuẩn bị ít nhất 3-5 câu.</Paragraph>

                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                        <div className="text-orange-400 font-bold text-sm">🏆 Câu hỏi hay nên hỏi</div>
                        <div className="text-slate-300 text-sm mt-1">
                            <strong>Về role:</strong><br />
                            • &quot;Sprint điển hình của team trông như thế nào?&quot;<br />
                            • &quot;Thách thức kỹ thuật lớn nhất team đang đối mặt?&quot;<br />
                            • &quot;Đo lường thành công cho vị trí này trong 90 ngày đầu thế nào?&quot;<br /><br />
                            <strong>Về văn hoá:</strong><br />
                            • &quot;Team handle code review như thế nào?&quot;<br />
                            • &quot;Lộ trình phát triển cho engineer ở đây?&quot;<br />
                            • &quot;Cân bằng tech debt vs feature development thế nào?&quot;<br /><br />
                            <strong>Về tech:</strong><br />
                            • &quot;CI/CD pipeline trông như thế nào?&quot;<br />
                            • &quot;Approach testing ra sao? Mục tiêu test coverage?&quot;<br />
                            • &quot;Có cơ hội contribute vào architecture decisions không?&quot;
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <div className="text-red-400 font-bold text-sm">❌ Đừng hỏi (ở vòng screening)</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • &quot;Được bao nhiêu ngày nghỉ?&quot; → để giai đoạn offer<br />
                            • &quot;Có được WFH không?&quot; → nếu JD không nhắc, hỏi khéo<br />
                            • &quot;Công ty làm gì?&quot; → bạn nên biết rồi<br />
                            • Không hỏi gì → red flag lớn nhất
                        </div>
                    </div>
                </div>
            </TopicModal>
        </div>

        {/* ===== COMMUNICATION TIPS ===== */}
        <Heading2>💬 Mẹo Giao Tiếp</Heading2>

        <div className="my-4 space-y-2">
            <TopicModal title="Best Practices phỏng vấn Online" emoji="🖥️" color="#3b82f6" summary="Camera, audio, background, và body language cho video call">
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">🎥 Setup kỹ thuật</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Camera ngang tầm mắt, mặt sáng rõ (nguồn sáng ở trước, không phải sau)<br />
                            • Test audio trước — dùng headphones tránh echo<br />
                            • Background sạch, trung tính (hoặc dùng blur)<br />
                            • Tắt các app không cần — không notification trong PV<br />
                            • Có backup plan (hotspot điện thoại, số interviewer)
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">🗣️ Giao tiếp</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <strong>Tốc độ:</strong> Nói chậm hơn bình thường một chút — video có delay<br />
                            • <strong>Dừng:</strong> 2-3 giây trước khi trả lời — cho thấy bạn đang suy nghĩ<br />
                            • <strong>Cấu trúc:</strong> &quot;Có 3 lý do...&quot; → câu trả lời đánh số dễ follow hơn<br />
                            • <strong>Nhiệt huyết:</strong> Cười, gật đầu, dùng cử chỉ tay — video làm phẳng năng lượng<br />
                            • <strong>Thành thật:</strong> &quot;Câu hỏi hay, để em suy nghĩ...&quot; tốt hơn nói lan man
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
                    <th className="text-left p-3 text-red-400 font-medium">🚩 Red flags (từ bạn)</th>
                    <th className="text-left p-3 text-green-400 font-medium">✅ Green flags (từ bạn)</th>
                </tr></thead>
                <tbody className="text-slate-300">
                    <tr className="border-b border-white/5"><td className="p-3">Nói xấu công ty cũ</td><td className="p-3">Nói tích cực về những gì đã học</td></tr>
                    <tr className="border-b border-white/5"><td className="p-3">Nói &quot;chúng tôi làm X&quot; mọi thứ</td><td className="p-3">Rõ ràng &quot;Em cụ thể làm X&quot;</td></tr>
                    <tr className="border-b border-white/5"><td className="p-3">Trả lời chung chung, không cụ thể</td><td className="p-3">Con số, metrics, ví dụ cụ thể</td></tr>
                    <tr className="border-b border-white/5"><td className="p-3">Không có câu hỏi cuối buổi</td><td className="p-3">Câu hỏi sâu sắc về team/role</td></tr>
                    <tr className="border-b border-white/5"><td className="p-3">&quot;Em chưa bao giờ thất bại&quot;</td><td className="p-3">Thành thật về thất bại + bài học</td></tr>
                    <tr><td className="p-3">Chỉ nói về công nghệ</td><td className="p-3">Kết nối tech với business impact</td></tr>
                </tbody>
            </table>
        </div>

        <Callout type="tip">
            <strong>Lời khuyên cuối:</strong> Tập nói thành tiếng! Ghi âm bản thân trả lời các câu hỏi này.
            Nghe lại giúp bạn cắt &quot;ờ...&quot;, trả lời gọn hơn, và tự tin hơn.
            Làm ít nhất 2-3 mock interviews với bạn bè trước buổi thật.
        </Callout>
    </>
)

const behavioralInterview: BlogPost = {
    slug: 'behavioral-interview',
    title: {
        vi: 'Phỏng vấn Behavioral & HR Screening — Trả lời như Pro',
        en: 'Behavioral & HR Screening Interview — Answer Like a Pro',
    },
    description: {
        vi: 'Hướng dẫn trả lời phỏng vấn HR: STAR framework, câu hỏi screening, lương bổng, điểm yếu, conflict — từ junior đến senior.',
        en: 'HR interview guide: STAR framework, screening questions, salary negotiation, weaknesses, conflicts — from junior to senior.',
    },
    date: '2025-10-25',
    tags: ['Interview', 'Behavioral', 'Career'],
    emoji: '🎙️',
    color: '#f59e0b',
    content: { vi: viContent, en: enContent },
}

export default behavioralInterview
