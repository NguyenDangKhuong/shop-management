# CI/CD Pipeline Documentation

## Tổng quan

Project này sử dụng **GitHub Actions** để tự động chạy tests trước khi merge code vào `master` branch.

## Workflow CI Tests

### Khi nào workflow chạy?

- ✅ Mỗi khi tạo Pull Request vào `master`
- ✅ Mỗi khi push code vào `master` branch

### Các bước workflow thực hiện:

1. **Checkout code** - Clone repository
2. **Setup Node.js 22.x** - Cài đặt Node.js
3. **Install dependencies** - Chạy `npm ci` (nhanh hơn `npm install`)
4. **Run linter** - Kiểm tra code style với `npm run lint`
5. **Run tests** - Chạy unit tests với `npm run test`
6. **Build application** - Verify production build với `npm run build`

### Xem kết quả

1. Vào Pull Request trên GitHub
2. Click tab **"Checks"**
3. Xem status của workflow "CI Tests"
   - ✅ **Pass** - Tất cả tests đều passed, có thể merge
   - ❌ **Fail** - Có tests failed, cần fix trước khi merge

## Branch Protection (QUAN TRỌNG!)

Để **bắt buộc** tests phải pass trước khi merge, bạn cần enable branch protection:

### Bước 1: Vào Settings

1. Mở repository trên GitHub
2. Click **Settings** → **Branches**
3. Click **Add branch protection rule**

### Bước 2: Configure Protection

1. **Branch name pattern**: `master`
2. Bật các options sau:
   - ✅ **Require a pull request before merging**
   - ✅ **Require status checks to pass before merging**
     - Chọn: `test` (CI Tests workflow)
   - ✅ **Require branches to be up to date before merging** (recommended)
   - ✅ **Do not allow bypassing the above settings**

3. Click **Create** để lưu

### Bước 3: Verify

Sau khi enable:
- Không thể merge PR nếu CI tests fail ❌
- Phải đợi CI tests pass mới có nút "Merge" ✅

## Workflow cho Development

### 1. Tạo feature branch

```bash
git checkout -b feature/ten-feature
# Viết code và tests
git add .
git commit -m "feat: thêm feature mới"
git push origin feature/ten-feature
```

### 2. Tạo Pull Request

1. Vào GitHub repository
2. Click **Pull requests** → **New pull request**
3. Base: `master` ← Compare: `feature/ten-feature`
4. Click **Create pull request**

### 3. Đợi CI Tests chạy

- GitHub Actions sẽ tự động chạy tests
- Xem kết quả trong tab "Checks"
- Nếu fail, fix code và push lại

### 4. Merge sau khi tests pass

- Khi CI tests ✅ pass
- Request review từ team (nếu có)
- Click **Merge pull request**

## Troubleshooting

### ❌ Tests fail locally nhưng pass trên CI

**Nguyên nhân**: Environment khác nhau

**Giải pháp**:
```bash
# Chạy trong môi trường CI giống GitHub Actions
CI=true npm run test
```

### ❌ Build fail vì thiếu environment variables

**Nguyên nhân**: Thiếu secrets trên GitHub

**Giải pháp**:
1. Vào GitHub → Settings → Secrets and variables → Actions
2. Click **New repository secret**
3. Thêm các secrets cần thiết (vd: `MONGODB_URI`)

### ❌ npm ci fail

**Nguyên nhân**: `package-lock.json` không sync với `package.json`

**Giải pháp**:
```bash
# Xóa và tạo lại package-lock.json
rm package-lock.json
npm install
git add package-lock.json
git commit -m "fix: update package-lock.json"
```

### ❌ Workflow không chạy

**Nguyên nhân**: File workflow sai vị trí

**Kiểm tra**:
- File phải ở: `.github/workflows/ci.yml`
- Đảm bảo đã push file lên GitHub

## Chạy Tests Locally

Trước khi push code, nên chạy tests locally:

```bash
# Run linter
npm run lint

# Run tests
npm run test

# Run build
npm run build

# Run tất cả (giống CI)
npm run lint && npm run test && npm run build
```

## Advanced: Thêm Test Coverage

Để track code coverage:

1. Uncomment phần coverage trong `.github/workflows/ci.yml`
2. Đăng ký account tại [codecov.io](https://codecov.io)
3. Thêm `CODECOV_TOKEN` vào GitHub Secrets
4. Coverage reports sẽ hiện trong mỗi PR

## FAQs

**Q: CI chạy mất bao lâu?**  
A: Thường 2-5 phút tùy vào số lượng tests

**Q: Có thể skip CI tests không?**  
A: Không nên! Nếu thật sự cần, có thể tạm tắt branch protection (không recommend)

**Q: CI có chạy khi push trực tiếp vào master không?**  
A: Có, nhưng sau khi enable branch protection sẽ không thể push trực tiếp vào master nữa

**Q: Làm sao biết test nào fail?**  
A: Click vào workflow run → Click vào failed step → Xem logs chi tiết
