# Pre-push Hook Script

Đã tạo Git pre-push hook để tự động chạy checks trước khi push!

## Cách hoạt động

File hook đã được tạo tại: `.githooks/pre-push`

Mỗi khi bạn chạy `git push`, hook sẽ tự động:

1. ✅ **Run linter** (`npm run lint`)
2. ✅ **Run tests** (`npm run test`) - nếu có
3. ✅ **Run build** (`npm run build`)

Nếu bất kỳ bước nào fail, push sẽ bị chặn!

## Cách sử dụng

### Push bình thường (với checks)
```bash
git push origin staging
# Hook sẽ tự động chạy
# 🔍 Running pre-push checks...
# 📝 Running linter...
# 🧪 Running tests...
# 🏗️  Checking build...
# ✅ All checks passed! Pushing to remote...
```

### Skip checks (khi cần thiết)
```bash
# Bypass hook trong trường hợp khẩn cấp
git push --no-verify origin staging
```

### Testing the hook
```bash
# Test xem hook có hoạt động không
git push --dry-run origin staging
```

## Cách 2: Package.json Scripts (Optional)

Nếu muốn chạy manual, có thể thêm vào `package.json`:

```json
{
  "scripts": {
    "prepush": "npm run lint && npm run build",
    "verify": "npm run lint && npm run test && npm run build"
  }
}
```

Sau đó chạy trước khi push:
```bash
npm run verify
git push
```

## Troubleshooting

### Hook không chạy?

**Check quyền executable:**
```bash
ls -la .githooks/pre-push
# Phải thấy: -rwxr-xr-x (có x = executable)
```

**Fix quyền:**
```bash
chmod +x .githooks/pre-push
```

### Build quá lâu?

Nếu build mất nhiều thời gian, có thể comment out phần build trong hook:

```bash
# Mở file và comment dòng build
nano .githooks/pre-push

# Hoặc chỉ chạy lint + test
# Comment out phần "Run build check"
```

### Hook bị xóa khi clone repo?

Git hooks không được commit vào repo. Để share hooks trong team, dùng **Husky**:

```bash
npm install --save-dev husky
npx husky init
echo "npm run lint && npm run build" > .husky/pre-push
```

## Lợi ích

✅ **Catch errors sớm** - trước khi push lên remote  
✅ **Tiết kiệm thời gian** - không đợi CI fail  
✅ **Keep code clean** - đảm bảo code luôn build được  
✅ **Team consistency** - mọi người đều chạy cùng checks

## Note

- Hook chỉ chạy trên máy local của bạn
- Các dev khác cần tự tạo hook riêng (hoặc dùng Husky)
- CI/CD vẫn là safety net cuối cùng
