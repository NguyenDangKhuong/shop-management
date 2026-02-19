import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_API_KEY })
const PARENT_PAGE_ID = '1ed4098c-1ddc-80d9-9e7c-f6506f6a3ade' // Lộ trình học E:

async function main() {
    // Create child page
    const page = await notion.pages.create({
        parent: { page_id: PARENT_PAGE_ID },
        icon: { emoji: '📅' },
        properties: {
            title: [{ text: { content: 'Ngày 1 – Tuần 1: Làm quen Shadowing & Self-talk' } }]
        } as any,
        children: [
            // Mục tiêu
            { callout: { icon: { emoji: '🎯' }, rich_text: [{ text: { content: 'Mục tiêu hôm nay: Bắt đầu thói quen shadowing, tập self-talk lần đầu, và setup tools cần thiết.' } }] } },

            // Setup
            { heading_2: { rich_text: [{ text: { content: '🛠️ Setup (10 phút)' } }] } },
            {
                to_do: {
                    rich_text: [
                        { text: { content: 'Cài app ' } },
                        { text: { content: 'ELSA Speak', link: { url: 'https://elsaspeak.com/' } }, annotations: { bold: true } },
                        { text: { content: ' trên điện thoại — test phát âm 5 câu đầu tiên' } }
                    ], checked: false
                }
            },
            { to_do: { rich_text: [{ text: { content: 'Tạo folder "Speaking Practice" trên điện thoại để lưu file ghi âm' } }], checked: false } },
            {
                to_do: {
                    rich_text: [
                        { text: { content: 'Bookmark playlist ' } },
                        { text: { content: 'BBC 6 Minute English', link: { url: 'https://www.youtube.com/playlist?list=PLcetZ6gSk96_zHuVg6zhPuJGlGQ4TKluv' } }, annotations: { bold: true } },
                        { text: { content: ' trên YouTube' } }
                    ], checked: false
                }
            },

            { divider: {} },

            // Shadowing
            { heading_2: { rich_text: [{ text: { content: '🎧 Shadowing — 15 phút' } }] } },
            { paragraph: { rich_text: [{ text: { content: 'Chọn 1 video tech talk (5-10 phút). Nghe từng câu → pause → lặp lại to, bắt chước ngữ điệu.' } }] } },
            {
                numbered_list_item: {
                    rich_text: [
                        { text: { content: 'Lần 1 (5 phút):' }, annotations: { bold: true } },
                        { text: { content: ' Nghe toàn bộ video 1 lần, không pause. Chú ý cách speaker diễn đạt technical concepts.' } }
                    ]
                }
            },
            {
                numbered_list_item: {
                    rich_text: [
                        { text: { content: 'Lần 2 (10 phút):' }, annotations: { bold: true } },
                        { text: { content: ' Nghe từng câu → pause → nói lại. Bắt chước giọng, tốc độ, cách nhấn technical terms.' } }
                    ]
                }
            },
            {
                callout: {
                    icon: { emoji: '🎬' }, rich_text: [
                        { text: { content: 'Video gợi ý: ' } },
                        { text: { content: 'The Art of Code — Dylan Beattie', link: { url: 'https://www.youtube.com/watch?v=6avJHaC3C2U' } }, annotations: { bold: true } },
                        { text: { content: ' | ' } },
                        { text: { content: 'How AI Could Empower Any Business — Andrew Ng', link: { url: 'https://www.youtube.com/watch?v=reUZRyXxUs4' } }, annotations: { bold: true } },
                    ]
                }
            },

            { divider: {} },

            // Self-talk
            { heading_2: { rich_text: [{ text: { content: '🗣️ Self-talk — 15 phút' } }] } },
            { paragraph: { rich_text: [{ text: { content: 'Bật ghi âm → nói tiếng Anh về 3 chủ đề technical sau (mỗi cái ~3-5 phút). Đừng sợ sai, cứ nói!' } }] } },
            {
                numbered_list_item: {
                    rich_text: [
                        { text: { content: '"Explain a bug I fixed today"' }, annotations: { bold: true } },
                        { text: { content: ' — Mô tả bug: root cause là gì, debug thế nào, fix ra sao, lesson learned...' } }
                    ]
                }
            },
            {
                numbered_list_item: {
                    rich_text: [
                        { text: { content: '"Walk through my system architecture"' }, annotations: { bold: true } },
                        { text: { content: ' — Giải thích kiến trúc project: frontend, backend, database, API flow, deployment...' } }
                    ]
                }
            },
            {
                numbered_list_item: {
                    rich_text: [
                        { text: { content: '"Compare two technologies I know"' }, annotations: { bold: true } },
                        { text: { content: ' — So sánh 2 tech (React vs Vue, SQL vs NoSQL, REST vs GraphQL): pros, cons, khi nào dùng...' } }
                    ]
                }
            },
            {
                callout: {
                    icon: { emoji: '🎙️' }, rich_text: [
                        { text: { content: 'Ghi âm xong → nghe lại 1 lần. Có thể dùng ' } },
                        { text: { content: 'Speechling', link: { url: 'https://speechling.com/' } }, annotations: { bold: true } },
                        { text: { content: ' để nhờ coach sửa miễn phí.' } }
                    ]
                }
            },

            { divider: {} },

            // Vocabulary
            { heading_2: { rich_text: [{ text: { content: '📚 Vocabulary Chunks — 15 phút' } }] } },
            { paragraph: { rich_text: [{ text: { content: 'Học 10 collocations dev hay dùng. Đọc to 3 lần mỗi cụm, rồi đặt 1 câu.' } }] } },
            { numbered_list_item: { rich_text: [{ text: { content: 'run into a problem' }, annotations: { bold: true, code: true } }, { text: { content: ' — "I ran into a problem with the API endpoint."' } }] } },
            { numbered_list_item: { rich_text: [{ text: { content: 'come up with a solution' }, annotations: { bold: true, code: true } }, { text: { content: ' — "We need to come up with a solution before the deadline."' } }] } },
            { numbered_list_item: { rich_text: [{ text: { content: 'work on a feature' }, annotations: { bold: true, code: true } }, { text: { content: ' — "I\'m currently working on the authentication feature."' } }] } },
            { numbered_list_item: { rich_text: [{ text: { content: 'look into an issue' }, annotations: { bold: true, code: true } }, { text: { content: ' — "Can you look into this performance issue?"' } }] } },
            { numbered_list_item: { rich_text: [{ text: { content: 'figure out the root cause' }, annotations: { bold: true, code: true } }, { text: { content: ' — "It took me an hour to figure out the root cause."' } }] } },
            { numbered_list_item: { rich_text: [{ text: { content: 'push changes to production' }, annotations: { bold: true, code: true } }, { text: { content: ' — "We\'ll push the changes to production tomorrow."' } }] } },
            { numbered_list_item: { rich_text: [{ text: { content: 'set up the environment' }, annotations: { bold: true, code: true } }, { text: { content: ' — "First, let me set up the development environment."' } }] } },
            { numbered_list_item: { rich_text: [{ text: { content: 'break down the task' }, annotations: { bold: true, code: true } }, { text: { content: ' — "Let\'s break down the task into smaller chunks."' } }] } },
            { numbered_list_item: { rich_text: [{ text: { content: 'take care of the deployment' }, annotations: { bold: true, code: true } }, { text: { content: ' — "I\'ll take care of the deployment this afternoon."' } }] } },
            { numbered_list_item: { rich_text: [{ text: { content: 'keep track of progress' }, annotations: { bold: true, code: true } }, { text: { content: ' — "We use Jira to keep track of our progress."' } }] } },
            {
                callout: {
                    icon: { emoji: '💡' }, rich_text: [
                        { text: { content: 'Dùng ' } },
                        { text: { content: 'ChatGPT Voice Mode', link: { url: 'https://chatgpt.com/' } }, annotations: { bold: true } },
                        { text: { content: ' để practice nói các câu vừa học.' } }
                    ]
                }
            },

            { divider: {} },

            // Checklist
            { heading_2: { rich_text: [{ text: { content: '✅ Checklist cuối ngày' } }] } },
            { to_do: { rich_text: [{ text: { content: 'Đã shadowing 1 video BBC 6 Minute English' } }], checked: false } },
            { to_do: { rich_text: [{ text: { content: 'Đã ghi âm self-talk ít nhất 5 phút' } }], checked: false } },
            { to_do: { rich_text: [{ text: { content: 'Đã nghe lại bản ghi âm và ghi chú lỗi' } }], checked: false } },
            { to_do: { rich_text: [{ text: { content: 'Đã học 10 collocations và đặt câu' } }], checked: false } },
            { to_do: { rich_text: [{ text: { content: 'Đã dùng ELSA Speak check phát âm ít nhất 5 từ' } }], checked: false } },

            { divider: {} },

            // Links
            { heading_2: { rich_text: [{ text: { content: '🔗 Links hữu ích' } }] } },
            { bookmark: { url: 'https://www.youtube.com/playlist?list=PLcetZ6gSk96_zHuVg6zhPuJGlGQ4TKluv', caption: [{ text: { content: 'BBC 6 Minute English — Playlist YouTube' } }] } },
            { bookmark: { url: 'https://elsaspeak.com/', caption: [{ text: { content: 'ELSA Speak — App sửa phát âm' } }] } },
            { bookmark: { url: 'https://speechling.com/', caption: [{ text: { content: 'Speechling — Ghi âm & nhờ coach sửa miễn phí' } }] } },
            { bookmark: { url: 'https://chatgpt.com/', caption: [{ text: { content: 'ChatGPT Voice Mode — Practice speaking mọi lúc' } }] } },
            { bookmark: { url: 'https://www.cambly.com/', caption: [{ text: { content: 'Cambly — Nói chuyện với native speaker' } }] } },
            { bookmark: { url: 'https://www.italki.com/', caption: [{ text: { content: 'italki — Tìm tutor 1-on-1' } }] } },

            { divider: {} },
            { heading_3: { rich_text: [{ text: { content: '📝 Ghi chú cá nhân' } }] } },
            { paragraph: { rich_text: [{ text: { content: '(Viết lại những từ/câu khó nói, lỗi phát âm cần sửa, cảm nhận sau buổi luyện...)' }, annotations: { italic: true, color: 'gray' } }] } },
        ] as any
    })

    console.log(`✅ Đã tạo page: ${(page as any).url}`)
}

main().catch(err => console.error('❌ Error:', err.message))
