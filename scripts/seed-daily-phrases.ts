/**
 * ========================================================================
 * SEED DAILY PHRASES — ~80 cụm tiếng Anh cho standup / FE dev @ ANZ Bank
 * ========================================================================
 *
 * Chạy: npx ts-node scripts/seed-daily-phrases.ts
 * Hoặc gọi POST /api/daily-phrases/seed (nếu có API)
 *
 * Categories:
 *   standup    — Daily standup phrases
 *   dev        — Code review, PR, deployment
 *   corporate  — Meeting jargon, ANZ/bank style
 *   general    — Aussie workplace slang
 */

interface PhraseData {
    category: 'standup' | 'dev' | 'corporate' | 'general'
    phrase: string
    meaning: string
    example?: string
    tip?: string
}

export const DAILY_PHRASES: PhraseData[] = [
    // ═══════════════════════════════════════════════════════════════
    // STANDUP (~35)
    // ═══════════════════════════════════════════════════════════════
    {
        category: 'standup',
        phrase: "Yesterday I worked on...",
        meaning: "Hôm qua mình đã làm...",
        example: "Yesterday I worked on the header component refactor.",
        tip: "Cách mở đầu standup phổ biến nhất. Nói ngắn gọn.",
    },
    {
        category: 'standup',
        phrase: "Today I'm going to pick up...",
        meaning: "Hôm nay mình sẽ nhận làm...",
        example: "Today I'm going to pick up the login page ticket.",
        tip: "'Pick up' = nhận việc/ticket mới.",
    },
    {
        category: 'standup',
        phrase: "I'm currently blocked on...",
        meaning: "Hiện tại mình đang bị chặn bởi...",
        example: "I'm currently blocked on the API — waiting for the backend team.",
        tip: "Dùng khi cần help hoặc chờ team khác.",
    },
    {
        category: 'standup',
        phrase: "No blockers from my side",
        meaning: "Phía mình không có gì bị chặn",
        example: "Everything's going smoothly, no blockers from my side.",
        tip: "Nói khi mọi thứ OK, không cần help.",
    },
    {
        category: 'standup',
        phrase: "I should be done by EOD",
        meaning: "Mình sẽ xong trước cuối ngày",
        example: "The feature is almost ready, I should be done by EOD.",
        tip: "EOD = End Of Day. Rất hay dùng trong standup.",
    },
    {
        category: 'standup',
        phrase: "I'll carry over this ticket to today",
        meaning: "Mình sẽ tiếp tục ticket này sang hôm nay",
        example: "I didn't finish the styling yesterday, so I'll carry it over to today.",
        tip: "'Carry over' = mang sang, tiếp tục từ hôm qua.",
    },
    {
        category: 'standup',
        phrase: "I'm waiting on code review",
        meaning: "Mình đang chờ review code",
        example: "I've raised the PR, just waiting on code review.",
        tip: "'Waiting on' = đang chờ ai đó.",
    },
    {
        category: 'standup',
        phrase: "I'll pair with someone on this",
        meaning: "Mình sẽ pair programming với ai đó cho cái này",
        example: "This is a tricky one, I'll pair with Jake on this.",
        tip: "'Pair' = làm cùng nhau, thường là 2 dev cùng code.",
    },
    {
        category: 'standup',
        phrase: "I've raised a PR for...",
        meaning: "Mình đã tạo Pull Request cho...",
        example: "I've raised a PR for the search feature — ready for review.",
        tip: "'Raise a PR' = tạo/mở PR. Phổ biến hơn 'create a PR'.",
    },
    {
        category: 'standup',
        phrase: "I need to spike on this first",
        meaning: "Mình cần nghiên cứu/khảo sát cái này trước",
        example: "I need to spike on the charting library before I start coding.",
        tip: "'Spike' = investigation/research time-boxed. Rất phổ biến trong Agile.",
    },
    {
        category: 'standup',
        phrase: "I'll move this to 'In Review'",
        meaning: "Mình sẽ chuyển ticket này sang trạng thái 'In Review'",
        example: "The code's done, I'll move this to 'In Review' on the board.",
        tip: "Nói về cập nhật Jira/Trello board.",
    },
    {
        category: 'standup',
        phrase: "I've got a dependency on the backend team",
        meaning: "Mình phụ thuộc vào team backend",
        example: "I've got a dependency on the backend team for the new endpoint.",
        tip: "'Dependency' = phụ thuộc. Rất phổ biến trong standup.",
    },
    {
        category: 'standup',
        phrase: "I'll aim to get this done by sprint end",
        meaning: "Mình sẽ cố hoàn thành trước khi kết thúc sprint",
        example: "It's a big ticket, but I'll aim to get this done by sprint end.",
        tip: "'Aim to' = mục tiêu, nhẹ hơn 'I will'.",
    },
    {
        category: 'standup',
        phrase: "I'm making good progress on...",
        meaning: "Mình đang tiến triển tốt với...",
        example: "I'm making good progress on the dashboard redesign.",
        tip: "Cách nói tích cực khi mọi thứ đang đi đúng hướng.",
    },
    {
        category: 'standup',
        phrase: "I ran into an issue with...",
        meaning: "Mình gặp vấn đề với...",
        example: "I ran into an issue with the date picker timezone handling.",
        tip: "'Ran into' = gặp phải (bất ngờ). Tự nhiên hơn 'I found a problem'.",
    },
    {
        category: 'standup',
        phrase: "I'll flag this with the team",
        meaning: "Mình sẽ báo/cảnh báo team về cái này",
        example: "There's a potential performance issue — I'll flag this with the team.",
        tip: "'Flag' = đánh dấu/cảnh báo. Dùng khi cần team chú ý.",
    },
    {
        category: 'standup',
        phrase: "Can I get a second pair of eyes on this?",
        meaning: "Ai có thể review giúp mình cái này không?",
        example: "The logic is a bit complex — can I get a second pair of eyes on this?",
        tip: "Cách lịch sự xin người khác review.",
    },
    {
        category: 'standup',
        phrase: "I'll take that offline",
        meaning: "Mình sẽ thảo luận riêng vụ đó sau (offline)",
        example: "That's a bigger discussion — I'll take that offline with Sarah.",
        tip: "'Take offline' = thảo luận ngoài meeting. Rất phổ biến.",
    },
    {
        category: 'standup',
        phrase: "I'm in a good spot to start...",
        meaning: "Mình đã sẵn sàng để bắt đầu...",
        example: "I finished the bug fixes, so I'm in a good spot to start the new feature.",
        tip: "'In a good spot' = ở vị trí tốt, sẵn sàng.",
    },
    {
        category: 'standup',
        phrase: "That's on my radar",
        meaning: "Mình đã biết về cái đó / đang để ý",
        example: "Yeah, the accessibility issue — that's on my radar.",
        tip: "'On my radar' = đang theo dõi, nhận thức được.",
    },
    {
        category: 'standup',
        phrase: "I'll loop in [name] for this",
        meaning: "Mình sẽ kéo [tên] vào để hỗ trợ cái này",
        example: "It involves some backend changes, so I'll loop in Dev for this.",
        tip: "'Loop in' = thêm người vào cuộc thảo luận/work.",
    },
    {
        category: 'standup',
        phrase: "I'm still working through...",
        meaning: "Mình vẫn đang xử lý...",
        example: "I'm still working through the test failures from the merge.",
        tip: "'Working through' = đang giải quyết dần dần.",
    },
    {
        category: 'standup',
        phrase: "I've been heads-down on...",
        meaning: "Mình đã tập trung cao độ vào...",
        example: "I've been heads-down on the migration script all morning.",
        tip: "'Heads-down' = cắm đầu vào làm, không bị phân tâm.",
    },
    {
        category: 'standup',
        phrase: "That's a stretch goal for this sprint",
        meaning: "Đó là mục tiêu phụ/thêm cho sprint này",
        example: "Dark mode support is a stretch goal for this sprint.",
        tip: "'Stretch goal' = mục tiêu thêm nếu còn time.",
    },
    {
        category: 'standup',
        phrase: "I'll update the ticket with my findings",
        meaning: "Mình sẽ cập nhật ticket với những gì tìm được",
        example: "I'll update the ticket with my findings from the spike.",
        tip: "Nói khi kết thúc investigation/spike.",
    },
    {
        category: 'standup',
        phrase: "I'm confident we can ship this by...",
        meaning: "Mình tin là chúng ta có thể release trước...",
        example: "I'm confident we can ship this by end of next week.",
        tip: "'Ship' = deploy/release. Rất hay dùng.",
    },
    {
        category: 'standup',
        phrase: "Let me walk you through the changes",
        meaning: "Để mình giải thích qua các thay đổi",
        example: "Before I merge, let me walk you through the changes.",
        tip: "'Walk through' = giải thích từng bước. Dùng trong PR review.",
    },
    {
        category: 'standup',
        phrase: "I'll need to de-scope this",
        meaning: "Mình cần thu nhỏ phạm vi cái này lại",
        example: "We're running out of time, I'll need to de-scope the animation part.",
        tip: "'De-scope' = bỏ bớt tính năng ra khỏi scope.",
    },
    {
        category: 'standup',
        phrase: "I'm picking up where I left off yesterday",
        meaning: "Mình tiếp tục từ chỗ hôm qua dừng",
        example: "I'm picking up where I left off yesterday on the form validation.",
        tip: "Cách nói tự nhiên khi tiếp tục work từ ngày trước.",
    },
    {
        category: 'standup',
        phrase: "I've got some capacity to help with...",
        meaning: "Mình còn bandwidth để hỗ trợ...",
        example: "I'm ahead of schedule, so I've got some capacity to help with testing.",
        tip: "'Capacity' = năng lực/thời gian còn trống.",
    },
    {
        category: 'standup',
        phrase: "That's outside the scope of this ticket",
        meaning: "Cái đó nằm ngoài scope của ticket này",
        example: "Responsive design is outside the scope of this ticket — I'll raise a separate one.",
        tip: "Dùng khi ai đó yêu cầu thêm tính năng ngoài ticket.",
    },
    {
        category: 'standup',
        phrase: "I'll follow up on that after standup",
        meaning: "Mình sẽ theo dõi tiếp cái đó sau standup",
        example: "Good point — I'll follow up on that after standup with the designer.",
        tip: "'Follow up' = theo dõi tiếp, liên hệ sau.",
    },
    {
        category: 'standup',
        phrase: "I'm on track to finish by...",
        meaning: "Mình đang đúng tiến độ để hoàn thành trước...",
        example: "I'm on track to finish the feature by Wednesday.",
        tip: "'On track' = đang đúng kế hoạch.",
    },
    {
        category: 'standup',
        phrase: "Can we timebox this discussion?",
        meaning: "Mình có thể giới hạn thời gian thảo luận này không?",
        example: "This is getting complex — can we timebox this discussion to 5 minutes?",
        tip: "'Timebox' = đặt giới hạn thời gian. Phổ biến trong Agile.",
    },
    {
        category: 'standup',
        phrase: "I'll groom the backlog later today",
        meaning: "Mình sẽ sắp xếp/review backlog trong ngày",
        example: "I'll groom the backlog later today and prioritise the bugs.",
        tip: "'Groom' = review và sắp xếp lại backlog.",
    },

    // ═══════════════════════════════════════════════════════════════
    // DEV (~20)
    // ═══════════════════════════════════════════════════════════════
    {
        category: 'dev',
        phrase: "Could you take a look at my PR?",
        meaning: "Bạn có thể review PR của mình không?",
        example: "Hey, could you take a look at my PR when you get a chance?",
        tip: "'Take a look' nhẹ nhàng hơn 'review'. Thường kèm 'when you get a chance'.",
    },
    {
        category: 'dev',
        phrase: "I'll rebase and force-push",
        meaning: "Mình sẽ rebase rồi force-push lên",
        example: "There are merge conflicts, so I'll rebase and force-push.",
        tip: "Nói khi cần update PR branch với main/master.",
    },
    {
        category: 'dev',
        phrase: "The build pipeline is red",
        meaning: "Pipeline build đang lỗi (đỏ)",
        example: "Hold off on merging — the build pipeline is red.",
        tip: "'Red' = fail, 'green' = pass. Dùng cho CI/CD.",
    },
    {
        category: 'dev',
        phrase: "Let me run the regression suite",
        meaning: "Để mình chạy bộ test hồi quy",
        example: "Before we deploy, let me run the regression suite first.",
        tip: "'Regression suite' = bộ test kiểm tra tính năng cũ vẫn OK.",
    },
    {
        category: 'dev',
        phrase: "I've added unit tests for the edge cases",
        meaning: "Mình đã thêm unit test cho các edge case",
        example: "I've added unit tests for the edge cases — empty state and error handling.",
        tip: "'Edge cases' = trường hợp biên, ít xảy ra nhưng cần xử lý.",
    },
    {
        category: 'dev',
        phrase: "This PR is ready to merge",
        meaning: "PR này đã sẵn sàng để merge",
        example: "All checks are green, this PR is ready to merge.",
        tip: "Nói khi PR đã được approve và CI pass.",
    },
    {
        category: 'dev',
        phrase: "I'll cherry-pick that fix into the release branch",
        meaning: "Mình sẽ cherry-pick fix đó vào release branch",
        example: "It's a critical bug, I'll cherry-pick that fix into the release branch.",
        tip: "'Cherry-pick' = lấy 1 commit cụ thể sang branch khác.",
    },
    {
        category: 'dev',
        phrase: "Can you approve the PR so I can merge?",
        meaning: "Bạn approve PR giúp mình để mình merge nhé?",
        example: "I've addressed all the review comments — can you approve so I can merge?",
        tip: "Dùng sau khi đã fix tất cả review feedback.",
    },
    {
        category: 'dev',
        phrase: "I'll refactor this in a follow-up PR",
        meaning: "Mình sẽ refactor cái này trong PR tiếp theo",
        example: "The code works but it's a bit messy — I'll refactor this in a follow-up PR.",
        tip: "'Follow-up PR' = PR riêng sau để clean up.",
    },
    {
        category: 'dev',
        phrase: "We should add this to our tech debt backlog",
        meaning: "Mình nên thêm cái này vào backlog tech debt",
        example: "The legacy CSS needs a major overhaul — we should add this to our tech debt backlog.",
        tip: "'Tech debt' = nợ kỹ thuật, code cần cải thiện nhưng chưa có time.",
    },
    {
        category: 'dev',
        phrase: "I left some comments on your PR",
        meaning: "Mình đã comment góp ý trên PR của bạn",
        example: "Hey, I left some comments on your PR — mostly minor nits.",
        tip: "'Nits' = góp ý nhỏ, không quan trọng lắm.",
    },
    {
        category: 'dev',
        phrase: "Let me spin up a local environment",
        meaning: "Để mình khởi chạy môi trường local",
        example: "Let me spin up a local environment to reproduce the bug.",
        tip: "'Spin up' = khởi chạy, bật lên. Dùng cho server, Docker, etc.",
    },
    {
        category: 'dev',
        phrase: "I've hotfixed the production issue",
        meaning: "Mình đã hotfix lỗi trên production",
        example: "I've hotfixed the production issue — the deploy is rolling out now.",
        tip: "'Hotfix' = fix khẩn cấp trên production.",
    },
    {
        category: 'dev',
        phrase: "The feature flag is toggled off in prod",
        meaning: "Feature flag đang tắt trên production",
        example: "Don't worry, the feature flag is toggled off in prod — users can't see it yet.",
        tip: "'Feature flag' = cờ bật/tắt tính năng. Rất phổ biến ở bank/enterprise.",
    },
    {
        category: 'dev',
        phrase: "I'll bump the version and tag the release",
        meaning: "Mình sẽ tăng version và tag release",
        example: "Everything looks good — I'll bump the version and tag the release.",
        tip: "'Bump' = tăng version number.",
    },
    {
        category: 'dev',
        phrase: "Let's do a quick sanity check before deploying",
        meaning: "Kiểm tra nhanh trước khi deploy nhé",
        example: "Let's do a quick sanity check on staging before deploying to prod.",
        tip: "'Sanity check' = kiểm tra cơ bản để đảm bảo không có lỗi nghiêm trọng.",
    },
    {
        category: 'dev',
        phrase: "I've stubbed out the component",
        meaning: "Mình đã tạo khung component (chưa hoàn thiện)",
        example: "I've stubbed out the component — I'll flesh it out tomorrow.",
        tip: "'Stub out' = tạo cấu trúc cơ bản. 'Flesh out' = hoàn thiện chi tiết.",
    },
    {
        category: 'dev',
        phrase: "The flaky test is causing false negatives",
        meaning: "Test không ổn định gây ra kết quả fail sai",
        example: "That test failure is a known issue — the flaky test is causing false negatives.",
        tip: "'Flaky test' = test lúc pass lúc fail. Rất annoying.",
    },
    {
        category: 'dev',
        phrase: "I need to address the review feedback",
        meaning: "Mình cần xử lý feedback từ code review",
        example: "I got some good suggestions — I need to address the review feedback first.",
        tip: "'Address feedback' = xử lý/đáp ứng các góp ý.",
    },
    {
        category: 'dev',
        phrase: "Let me check the console for errors",
        meaning: "Để mình check console xem có lỗi gì không",
        example: "The page is blank? Let me check the console for errors.",
        tip: "Câu debug cơ bản nhất cho FE dev.",
    },

    // ═══════════════════════════════════════════════════════════════
    // CORPORATE (~15)
    // ═══════════════════════════════════════════════════════════════
    {
        category: 'corporate',
        phrase: "Let's circle back on this",
        meaning: "Chúng ta sẽ quay lại thảo luận sau",
        example: "We're running out of time — let's circle back on this tomorrow.",
        tip: "'Circle back' = quay lại thảo luận. Cực kỳ phổ biến trong corporate.",
    },
    {
        category: 'corporate',
        phrase: "Let's align on the requirements",
        meaning: "Chúng ta cần thống nhất về yêu cầu",
        example: "Before we start coding, let's align on the requirements with the BA.",
        tip: "'Align' = đồng bộ, thống nhất. Dùng nhiều trong meeting.",
    },
    {
        category: 'corporate',
        phrase: "I'll escalate this to the team lead",
        meaning: "Mình sẽ đẩy vấn đề lên team lead",
        example: "This is a blocker for the whole team — I'll escalate this to the team lead.",
        tip: "'Escalate' = đẩy lên cấp cao hơn khi cần quyết định.",
    },
    {
        category: 'corporate',
        phrase: "As per the compliance requirements",
        meaning: "Theo yêu cầu tuân thủ/compliance",
        example: "As per the compliance requirements, we need to encrypt all PII data.",
        tip: "Rất hay dùng ở bank. 'Compliance' = quy định tuân thủ.",
    },
    {
        category: 'corporate',
        phrase: "We need stakeholder sign-off on this",
        meaning: "Chúng ta cần stakeholder phê duyệt cái này",
        example: "It's a UX change, so we need stakeholder sign-off on this.",
        tip: "'Sign-off' = phê duyệt chính thức. 'Stakeholder' = bên liên quan.",
    },
    {
        category: 'corporate',
        phrase: "Let's touch base after the meeting",
        meaning: "Mình nói chuyện lại sau cuộc họp nhé",
        example: "I have some questions — let's touch base after the meeting.",
        tip: "'Touch base' = liên lạc ngắn, catch up nhanh.",
    },
    {
        category: 'corporate',
        phrase: "I'll put together a proposal",
        meaning: "Mình sẽ soạn một đề xuất",
        example: "If we want to migrate to React 19, I'll put together a proposal first.",
        tip: "'Put together' = soạn, chuẩn bị. Trang trọng hơn 'make'.",
    },
    {
        category: 'corporate',
        phrase: "What's the timeline on this?",
        meaning: "Timeline cho cái này là bao lâu?",
        example: "Sounds good, but what's the timeline on this? Do we have a deadline?",
        tip: "Hỏi về deadline/thời gian hoàn thành.",
    },
    {
        category: 'corporate',
        phrase: "Let's park that for now",
        meaning: "Tạm gác cái đó lại",
        example: "That's a valid point, but let's park that for now and focus on the MVP.",
        tip: "'Park' = tạm dừng, để dành. Giống 'table this discussion'.",
    },
    {
        category: 'corporate',
        phrase: "I'll action that",
        meaning: "Mình sẽ thực hiện việc đó",
        example: "Good idea — I'll action that and update the team by Friday.",
        tip: "'Action' dùng như động từ = thực hiện. Rất corporate.",
    },
    {
        category: 'corporate',
        phrase: "We need to do our due diligence",
        meaning: "Chúng ta cần thẩm định kỹ càng",
        example: "Before picking a vendor, we need to do our due diligence.",
        tip: "'Due diligence' = thẩm tra kỹ trước quyết định. Từ bank rất hay dùng.",
    },
    {
        category: 'corporate',
        phrase: "Let's get some visibility on this",
        meaning: "Hãy làm cho mọi người thấy tiến độ cái này",
        example: "The executive team is asking — let's get some visibility on this in our dashboard.",
        tip: "'Visibility' = khả năng nhìn thấy, minh bạch. Dùng nhiều trong corporate.",
    },
    {
        category: 'corporate',
        phrase: "I'll keep you in the loop",
        meaning: "Mình sẽ cập nhật cho bạn biết",
        example: "I'm investigating the outage — I'll keep you in the loop.",
        tip: "'Keep in the loop' = cập nhật thông tin liên tục.",
    },
    {
        category: 'corporate',
        phrase: "Can we get a retro on this?",
        meaning: "Mình có thể làm retro về cái này không?",
        example: "That deployment went sideways — can we get a retro on this?",
        tip: "'Retro' = retrospective — review sau sự kiện để rút kinh nghiệm.",
    },
    {
        category: 'corporate',
        phrase: "Let's get the ball rolling",
        meaning: "Bắt đầu thôi / Khởi động nào",
        example: "Requirements are signed off — let's get the ball rolling on development.",
        tip: "'Get the ball rolling' = bắt đầu, khởi động công việc.",
    },

    // ═══════════════════════════════════════════════════════════════
    // GENERAL / AUSSIE (~10)
    // ═══════════════════════════════════════════════════════════════
    {
        category: 'general',
        phrase: "Cheers for that",
        meaning: "Cảm ơn nhé",
        example: "Cheers for reviewing my PR so quickly!",
        tip: "Cách nói 'thank you' kiểu Úc, rất casual và phổ biến.",
    },
    {
        category: 'general',
        phrase: "No worries",
        meaning: "Không có gì / Không sao đâu",
        example: "'Sorry for the late reply.' — 'No worries!'",
        tip: "Câu nói Úc nhất! Dùng thay 'You're welcome' hoặc 'It's okay'.",
    },
    {
        category: 'general',
        phrase: "Keen to catch up",
        meaning: "Muốn gặp nói chuyện / catch up",
        example: "Haven't synced in a while — keen to catch up this arvo.",
        tip: "'Keen' = háo hức, muốn. 'Arvo' = afternoon (tiếng Úc).",
    },
    {
        category: 'general',
        phrase: "Sounds good to me",
        meaning: "Nghe OK đó / Đồng ý",
        example: "'Let's deploy after lunch?' — 'Sounds good to me.'",
        tip: "Cách đồng ý casual. Dùng cực kỳ nhiều.",
    },
    {
        category: 'general',
        phrase: "I'll sort that out",
        meaning: "Mình sẽ xử lý cái đó",
        example: "The config is wrong? No worries, I'll sort that out.",
        tip: "'Sort out' = giải quyết, sắp xếp. Rất Úc.",
    },
    {
        category: 'general',
        phrase: "Happy to help",
        meaning: "Sẵn lòng giúp đỡ",
        example: "'Thanks for fixing the bug!' — 'Happy to help.'",
        tip: "Cách trả lời 'thank you' lịch sự trong workplace.",
    },
    {
        category: 'general',
        phrase: "Let me know if you need a hand",
        meaning: "Cho mình biết nếu bạn cần giúp nhé",
        example: "I've finished my tickets — let me know if you need a hand.",
        tip: "'Need a hand' = cần giúp đỡ. Rất phổ biến.",
    },
    {
        category: 'general',
        phrase: "I reckon we should...",
        meaning: "Mình nghĩ chúng ta nên...",
        example: "I reckon we should refactor the auth module before adding features.",
        tip: "'Reckon' = think/believe. Từ rất Úc, dùng hàng ngày.",
    },
    {
        category: 'general',
        phrase: "That's a fair call",
        meaning: "Đó là nhận xét / quyết định hợp lý",
        example: "'Maybe we should skip the animation?' — 'Yeah, that's a fair call.'",
        tip: "'Fair call' = good point / reasonable. Rất Aussie.",
    },
    {
        category: 'general',
        phrase: "I'll give it a crack",
        meaning: "Mình sẽ thử làm xem sao",
        example: "I've never used GraphQL before, but I'll give it a crack.",
        tip: "'Give it a crack' = thử làm. Aussie slang, casual.",
    },
]

// ── Seed function (for use via API or direct script) ──────────
export async function seedDailyPhrases() {
    // Dynamic import to avoid bundling mongoose in client
    const { default: connectDB } = await import('../src/utils/connectDb')
    const { default: DailyPhraseModel } = await import('../src/models/DailyPhrase')

    await connectDB()

    const existing = await DailyPhraseModel.countDocuments()
    if (existing > 0) {
        console.log(`⚠️  Already have ${existing} phrases. Skipping seed.`)
        console.log('   To re-seed, drop the daily_phrases collection first.')
        return { skipped: true, existing }
    }

    const now = new Date()
    const docs = DAILY_PHRASES.map((p) => ({
        ...p,
        interval: 1,
        nextReviewAt: now,
        easeFactor: 2.5,
        reviewCount: 0,
        lastReviewedAt: null,
    }))

    const result = await DailyPhraseModel.insertMany(docs)
    console.log(`✅ Seeded ${result.length} daily phrases`)
    return { seeded: result.length }
}

// ── Run directly: npx ts-node scripts/seed-daily-phrases.ts ──
if (require.main === module) {
    seedDailyPhrases()
        .then((r) => {
            console.log('Result:', r)
            process.exit(0)
        })
        .catch((err) => {
            console.error('Seed error:', err)
            process.exit(1)
        })
}
