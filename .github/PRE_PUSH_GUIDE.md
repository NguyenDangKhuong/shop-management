# Quick Reference: Pre-push Checks

## ✅ Đã setup xong!

Pre-push hook đã được cài đặt tại `.git/hooks/pre-push`

### Nếu hook không chạy, cần thêm quyền executable:
```bash
chmod +x .git/hooks/pre-push
```

### Verify quyền đã đúng:
```bash
ls -la .git/hooks/pre-push
# Phải thấy: -rwxr-xr-x (có x = executable)
```

## Cách sử dụng

### 1. Push bình thường (có checks tự động)
```bash
git push origin staging
```

Hook sẽ tự động chạy:
- 📝 Lint
- 🧪 Tests (nếu có)
- 🏗️ Build

### 2. Skip checks (khẩn cấp)
```bash
git push --no-verify origin staging
```

### 3. Test thủ công trước khi push
```bash
# Run tất cả checks
npm run lint && npm run build

# Hoặc từng cái
npm run lint
npm run build
```

## Khi nào hook chạy?

✅ **Chạy**: `git push`  
❌ **Không chạy**: `git commit`, `git add`

## Lợi ích

- ⚡ Catch lỗi trước khi push
- 💰 Tiết kiệm thời gian CI
- 🛡️ Đảm bảo code quality

## Xem chi tiết

Đọc [PRE_PUSH_HOOK.md](../PRE_PUSH_HOOK.md) để biết thêm.
