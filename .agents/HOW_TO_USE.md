# Antigravity Kit — Cách sử dụng

## Slash Commands (Workflows)

| Command | Mô tả | Khi nào dùng |
|---------|--------|-------------|
| `/create` | Tạo ứng dụng mới từ đầu | Bắt đầu project mới |
| `/brainstorm` | Brainstorm ý tưởng, hỏi Socratic | Feature mới, chưa rõ yêu cầu |
| `/plan` | Lập kế hoạch chi tiết (không code) | Trước khi implement tính năng lớn |
| `/orchestrate` | Điều phối nhiều agents cùng lúc | Task phức tạp, đa lĩnh vực |
| `/debug` | Debug systematic 4 giai đoạn | Bug phức tạp, khó tìm root cause |
| `/test` | Tạo & chạy tests | Sau khi thay đổi logic |
| `/deploy` | Deploy production với pre-flight checks | Trước khi release |
| `/enhance` | Thêm/cập nhật feature | Phát triển lặp lại |
| `/preview` | Quản lý dev server (start/stop) | Phát triển local |
| `/push` | Git add + commit + push (1 lệnh) | Đẩy code lên remote |
| `/ui-ux-pro-max` | Thiết kế UI/UX nâng cao | Cần design đẹp, premium |
| `/status` | Xem tiến trình project | Check progress |

## Agents (Tự động chọn)

Không cần gọi tên — AI tự nhận diện domain và chọn agent phù hợp:

- **orchestrator** — Điều phối nhiều agents
- **frontend-specialist** — React, Next.js, UI/UX web
- **backend-specialist** — API, server, database
- **mobile-developer** — React Native, Flutter, native
- **security-auditor** — Bảo mật, OWASP
- **debugger** — Debug systematic
- **project-planner** — Lập kế hoạch 4 giai đoạn

## Skills (Tự động load)

Skills tự load theo context — chỉ cần request bình thường:

```
"thêm API endpoint cho products"  → auto-load: api-patterns, nodejs-best-practices
"fix bug login"                   → auto-load: systematic-debugging
"thiết kế trang landing page"     → auto-load: frontend-design, clean-code
"tối ưu performance"              → auto-load: performance-profiling
```

## Tips

1. **Không cần nhớ tên agent/skill** — AI tự chọn dựa trên yêu cầu
2. **Dùng `/brainstorm` trước project lớn** — giúp clarify requirements
3. **Dùng `/plan` trước khi code** — tạo task breakdown rõ ràng
4. **Dùng `/push` để commit nhanh** — gom tất cả thành 1 lệnh
5. **Nói tiếng Việt bình thường** — AI hiểu và đáp lại bằng tiếng Việt
