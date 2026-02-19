import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_API_KEY })
const PARENT_PAGE_ID = '1ed4098c-1ddc-80d9-9e7c-f6506f6a3ade' // Lộ trình học E:

async function main() {
    const page = await notion.pages.create({
        parent: { page_id: PARENT_PAGE_ID },
        icon: { emoji: '💬' },
        properties: {
            title: [{ text: { content: 'Day 1 — 20 câu giao tiếp với đồng nghiệp Úc (Workplace)' } }]
        },
        children: [
            { callout: { icon: { emoji: '🎯' }, rich_text: [{ text: { content: 'Mục tiêu: Học 20 mẫu câu thường dùng khi làm việc với đồng nghiệp Úc. Đọc to 3 lần mỗi câu → tập nói lại không nhìn.' } }] } },

            // === CHÀO HỎI & SMALL TALK ===
            { heading_2: { rich_text: [{ text: { content: '👋 Chào hỏi & Small talk' } }] } },
            { paragraph: { rich_text: [{ text: { content: 'Người Úc rất casual, hay dùng "mate", "How\'s it going" thay vì "How are you". Không cần quá formal.' }, annotations: { italic: true, color: 'gray' } }] } },

            {
                numbered_list_item: {
                    rich_text: [
                        { text: { content: '"Hey mate, how\'s it going?"' }, annotations: { bold: true, code: true } },
                        { text: { content: ' — Chào bạn, khỏe không? (dùng mỗi ngày)' } }
                    ]
                }
            },
            {
                numbered_list_item: {
                    rich_text: [
                        { text: { content: '"Not bad, just smashing through some tickets."' }, annotations: { bold: true, code: true } },
                        { text: { content: ' — Cũng ổn, đang clear mấy cái tickets.' } }
                    ]
                }
            },
            {
                numbered_list_item: {
                    rich_text: [
                        { text: { content: '"How was your weekend?"' }, annotations: { bold: true, code: true } },
                        { text: { content: ' — Cuối tuần thế nào? (câu mở đầu thứ Hai)' } }
                    ]
                }
            },
            {
                numbered_list_item: {
                    rich_text: [
                        { text: { content: '"Yeah, good thanks! Yourself?"' }, annotations: { bold: true, code: true } },
                        { text: { content: ' — Ổn cảm ơn! Còn bạn? (trả lời lại)' } }
                    ]
                }
            },

            { divider: {} },

            // === STANDUP & MEETINGS ===
            { heading_2: { rich_text: [{ text: { content: '🗓️ Standup & Meetings' } }] } },
            { paragraph: { rich_text: [{ text: { content: 'Standup thường ngắn gọn: yesterday → today → blockers. Nói thẳng, không vòng vo.' }, annotations: { italic: true, color: 'gray' } }] } },

            {
                numbered_list_item: {
                    rich_text: [
                        { text: { content: '"Yesterday I wrapped up the API changes and raised a PR."' }, annotations: { bold: true, code: true } },
                        { text: { content: ' — Hôm qua xong API, đã tạo PR.' } }
                    ]
                }
            },
            {
                numbered_list_item: {
                    rich_text: [
                        { text: { content: '"Today I\'ll pick up the auth ticket and start on the frontend."' }, annotations: { bold: true, code: true } },
                        { text: { content: ' — Hôm nay làm ticket auth + frontend.' } }
                    ]
                }
            },
            {
                numbered_list_item: {
                    rich_text: [
                        { text: { content: '"No blockers at the moment."' }, annotations: { bold: true, code: true } },
                        { text: { content: ' — Hiện không bị block gì.' } }
                    ]
                }
            },
            {
                numbered_list_item: {
                    rich_text: [
                        { text: { content: '"I\'m blocked on the design — still waiting on the Figma from the design team."' }, annotations: { bold: true, code: true } },
                        { text: { content: ' — Đang bị block vì chưa có Figma từ team design.' } }
                    ]
                }
            },
            {
                numbered_list_item: {
                    rich_text: [
                        { text: { content: '"Can we sync up after standup? I need to clarify the requirements."' }, annotations: { bold: true, code: true } },
                        { text: { content: ' — Mình sync sau standup được không? Cần clarify requirements.' } }
                    ]
                }
            },

            { divider: {} },

            // === CODE REVIEW & PR ===
            { heading_2: { rich_text: [{ text: { content: '🔍 Code Review & PR' } }] } },

            {
                numbered_list_item: {
                    rich_text: [
                        { text: { content: '"Hey, could you have a look at my PR when you get a chance?"' }, annotations: { bold: true, code: true } },
                        { text: { content: ' — Bạn review PR mình khi rảnh được không?' } }
                    ]
                }
            },
            {
                numbered_list_item: {
                    rich_text: [
                        { text: { content: '"I\'ve left a few comments on your PR — nothing major, just some suggestions."' }, annotations: { bold: true, code: true } },
                        { text: { content: ' — Mình comment vài chỗ trong PR bạn — không nghiêm trọng, chỉ suggest thôi.' } }
                    ]
                }
            },
            {
                numbered_list_item: {
                    rich_text: [
                        { text: { content: '"Looks good to me! I\'ll approve it now."' }, annotations: { bold: true, code: true } },
                        { text: { content: ' — LGTM! Mình approve luôn.' } }
                    ]
                }
            },
            {
                numbered_list_item: {
                    rich_text: [
                        { text: { content: '"Could you refactor this bit? It might be cleaner as a separate function."' }, annotations: { bold: true, code: true } },
                        { text: { content: ' — Bạn refactor chỗ này được không? Tách function riêng sẽ clean hơn.' } }
                    ]
                }
            },

            { divider: {} },

            // === HỎI & NHỜ GIÚP ===
            { heading_2: { rich_text: [{ text: { content: '🙋 Hỏi & Nhờ giúp' } }] } },
            { paragraph: { rich_text: [{ text: { content: 'Người Úc thích sự thẳng thắn nhưng lịch sự. Dùng "reckon" (= think), "keen" (= interested), "no worries" (= you\'re welcome).' }, annotations: { italic: true, color: 'gray' } }] } },

            {
                numbered_list_item: {
                    rich_text: [
                        { text: { content: '"Do you reckon we should use WebSocket or SSE for this?"' }, annotations: { bold: true, code: true } },
                        { text: { content: ' — Bạn nghĩ mình nên dùng WebSocket hay SSE? ("reckon" = Úc hay dùng)' } }
                    ]
                }
            },
            {
                numbered_list_item: {
                    rich_text: [
                        { text: { content: '"I\'m a bit stuck on this — any chance you could walk me through it?"' }, annotations: { bold: true, code: true } },
                        { text: { content: ' — Mình hơi bí — bạn giải thích giúp được không?' } }
                    ]
                }
            },
            {
                numbered_list_item: {
                    rich_text: [
                        { text: { content: '"No worries, I\'ll sort it out."' }, annotations: { bold: true, code: true } },
                        { text: { content: ' — Không sao, mình lo được. ("no worries" = câu cửa miệng người Úc)' } }
                    ]
                }
            },
            {
                numbered_list_item: {
                    rich_text: [
                        { text: { content: '"Cheers for the help!"' }, annotations: { bold: true, code: true } },
                        { text: { content: ' — Cảm ơn nha! ("cheers" = thanks, rất phổ biến ở Úc)' } }
                    ]
                }
            },

            { divider: {} },

            // === THẢO LUẬN TECHNICAL ===
            { heading_2: { rich_text: [{ text: { content: '⚙️ Thảo luận Technical' } }] } },

            {
                numbered_list_item: {
                    rich_text: [
                        { text: { content: '"I reckon we should break this into smaller PRs — it\'ll be easier to review."' }, annotations: { bold: true, code: true } },
                        { text: { content: ' — Mình nghĩ nên chia nhỏ PR — review dễ hơn.' } }
                    ]
                }
            },
            {
                numbered_list_item: {
                    rich_text: [
                        { text: { content: '"The build\'s failing on CI — I\'ll have a squiz at the logs."' }, annotations: { bold: true, code: true } },
                        { text: { content: ' — Build fail trên CI — mình check logs xem. ("have a squiz" = have a look, Úc slang)' } }
                    ]
                }
            },
            {
                numbered_list_item: {
                    rich_text: [
                        { text: { content: '"Are you keen to pair on this? I think it\'d go quicker."' }, annotations: { bold: true, code: true } },
                        { text: { content: ' — Bạn muốn pair programming không? Nhanh hơn đó. ("keen" = interested/willing)' } }
                    ]
                }
            },
            {
                numbered_list_item: {
                    rich_text: [
                        { text: { content: '"Let\'s not over-engineer it — keep it simple for now and iterate later."' }, annotations: { bold: true, code: true } },
                        { text: { content: ' — Đừng over-engineer — giữ đơn giản rồi iterate sau.' } }
                    ]
                }
            },

            { divider: {} },

            // === TIPS ===
            { heading_2: { rich_text: [{ text: { content: '🇦🇺 Aussie Slang Tips' } }] } },
            {
                callout: {
                    icon: { emoji: '💡' }, rich_text: [
                        { text: { content: 'Từ vựng Úc thường dùng trong office:\n' } },
                        { text: { content: '• "mate"' }, annotations: { bold: true } },
                        { text: { content: ' = bạn (informal, dùng với ai cũng được)\n' } },
                        { text: { content: '• "reckon"' }, annotations: { bold: true } },
                        { text: { content: ' = think/believe\n' } },
                        { text: { content: '• "keen"' }, annotations: { bold: true } },
                        { text: { content: ' = interested, willing\n' } },
                        { text: { content: '• "no worries"' }, annotations: { bold: true } },
                        { text: { content: ' = np / you\'re welcome\n' } },
                        { text: { content: '• "cheers"' }, annotations: { bold: true } },
                        { text: { content: ' = thanks\n' } },
                        { text: { content: '• "have a squiz"' }, annotations: { bold: true } },
                        { text: { content: ' = have a look\n' } },
                        { text: { content: '• "arvo"' }, annotations: { bold: true } },
                        { text: { content: ' = afternoon\n' } },
                        { text: { content: '• "smashing it"' }, annotations: { bold: true } },
                        { text: { content: ' = doing great\n' } },
                        { text: { content: '• "flat out"' }, annotations: { bold: true } },
                        { text: { content: ' = very busy\n' } },
                        { text: { content: '• "suss out"' }, annotations: { bold: true } },
                        { text: { content: ' = figure out / investigate' } },
                    ]
                }
            },

            { divider: {} },

            // === CHECKLIST ===
            { heading_2: { rich_text: [{ text: { content: '✅ Checklist' } }] } },
            { to_do: { rich_text: [{ text: { content: 'Đọc to 20 câu, mỗi câu 3 lần' } }], checked: false } },
            { to_do: { rich_text: [{ text: { content: 'Tự đặt 5 câu mới dùng Aussie slang (reckon, keen, cheers...)' } }], checked: false } },
            { to_do: { rich_text: [{ text: { content: 'Ghi âm self-talk: giả lập 1 buổi standup bằng tiếng Anh (3 phút)' } }], checked: false } },
            { to_do: { rich_text: [{ text: { content: 'Nhắn 1 message bằng tiếng Anh cho đồng nghiệp Úc hôm nay' } }], checked: false } },
        ] as any
    })

    console.log(`✅ Đã tạo page: ${(page as any).url}`)
}

main().catch(err => console.error('❌ Error:', err.message))
