# 🛍️ TheTapHoa - Hệ thống Quản lý Cửa hàng

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15.4.10-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue?style=for-the-badge&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green?style=for-the-badge&logo=mongodb)
![Ant Design](https://img.shields.io/badge/Ant_Design-5.26.5-1890ff?style=for-the-badge&logo=ant-design)
![Jest](https://img.shields.io/badge/Jest-29.7.0-C21325?style=for-the-badge&logo=jest)

**Hệ thống quản lý cửa hàng hiện đại được xây dựng với Next.js 15, TypeScript, MongoDB và Ant Design**

[Demo](https://thetaphoa.vercel.app) • [Báo lỗi](https://github.com/NguyenDangKhuong/shop-management/issues) • [Yêu cầu tính năng](https://github.com/NguyenDangKhuong/shop-management/issues)

</div>

---

## 📋 Mục lục

- [Giới thiệu](#-giới-thiệu)
- [Tính năng](#-tính-năng)
- [Công nghệ sử dụng](#-công-nghệ-sử-dụng)
- [Yêu cầu hệ thống](#-yêu-cầu-hệ-thống)
- [Cài đặt](#-cài-đặt)
- [Sử dụng](#-sử-dụng)
- [Cấu trúc dự án](#-cấu-trúc-dự-án)
- [API Routes](#-api-routes)
- [Testing](#-testing)
- [CI/CD](#-cicd)
- [Deployment](#-deployment)
- [Tài khoản mặc định](#-tài-khoản-mặc-định)
- [Đóng góp](#-đóng-góp)
- [Tác giả](#-tác-giả)
- [License](#-license)

---

## 🎯 Giới thiệu

**TheTapHoa** là một hệ thống quản lý cửa hàng toàn diện, được thiết kế để giúp các chủ cửa hàng nhỏ và vừa quản lý sản phẩm, đơn hàng, danh mục và khách hàng một cách hiệu quả. Ứng dụng được xây dựng với các công nghệ hiện đại nhất, đảm bảo hiệu suất cao, bảo mật tốt và trải nghiệm người dùng tuyệt vời.

### 🌟 Đặc điểm nổi bật

- ⚡ **Hiệu năng cao** với Next.js 15 và Server-Side Rendering
- 🔐 **Bảo mật** với NextAuth.js v5 và role-based access control
- 📱 **Responsive** - Tương thích mọi thiết bị
- 🎨 **Giao diện đẹp** với Ant Design 5
- 🧪 **Tested** - 26 unit tests với Jest và React Testing Library
- 🚀 **CI/CD** - Tự động kiểm tra code với GitHub Actions
- 📊 **Analytics** - Tích hợp Vercel Analytics và Speed Insights
- 🖼️ **Upload ảnh** - Tích hợp Cloudinary để quản lý hình ảnh
- 🌐 **Đa ngôn ngữ** - Hỗ trợ i18n với next-i18next

---

## ✨ Tính năng

### 🔐 Xác thực & Phân quyền
- Đăng ký và đăng nhập tài khoản
- Xác thực với NextAuth.js v5
- Phân quyền (Admin và User)
- Bảo vệ routes theo role
- Session management

### 📦 Quản lý Sản phẩm
- Thêm, sửa, xóa sản phẩm
- Upload hình ảnh sản phẩm lên Cloudinary
- Quản lý SKU (Stock Keeping Unit)
- Quản lý tồn kho
- Phân loại theo danh mục
- Hiển thị/ẩn sản phẩm
- Tạo và in mã vạch cho sản phẩm

### 🛒 Quản lý Đơn hàng
- Tạo đơn hàng mới
- Xem danh sách đơn hàng
- Chi tiết đơn hàng
- Quản lý giỏ hàng
- Tính toán tự động (tổng tiền, tiền thừa, giảm giá)
- In hóa đơn

### 📂 Quản lý Danh mục
- Thêm, sửa, xóa danh mục
- Phân loại sản phẩm theo danh mục
- Quản lý phân cấp danh mục

### 👥 Quản lý Khách hàng
- Lưu thông tin khách hàng
- Lịch sử mua hàng
- Quét mã QR để thanh toán nhanh

### 📊 Dashboard & Báo cáo
- Giao diện quản trị trực quan
- Thống kê tổng quan
- Báo cáo doanh thu
- Theo dõi tồn kho

---

## 🛠️ Công nghệ sử dụng

### Frontend
- **[Next.js 15.4.10](https://nextjs.org/)** - React Framework với App Router
- **[React 18.2](https://react.dev/)** - UI Library
- **[TypeScript 5.2.2](https://www.typescriptlang.org/)** - Type Safety
- **[Ant Design 5.26.5](https://ant.design/)** - UI Component Library
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS Framework

### Backend & Database
- **[Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)** - RESTful API
- **[MongoDB](https://www.mongodb.com/)** - NoSQL Database
- **[Mongoose 8.0.1](https://mongoosejs.com/)** - ODM
- **[Typegoose 12.0.0](https://typegoose.github.io/)** - TypeScript decorators cho Mongoose

### Authentication
- **[NextAuth.js v5 beta](https://next-auth.js.org/)** - Authentication
- **[Zod 3.22.4](https://zod.dev/)** - Schema Validation

### File Upload & Media
- **[Cloudinary](https://cloudinary.com/)** - Image hosting và management

### Testing
- **[Jest 29.7.0](https://jestjs.io/)** - Testing Framework
- **[React Testing Library 14.3.1](https://testing-library.com/react)** - Component Testing
- **[@testing-library/user-event](https://testing-library.com/docs/user-event/intro/)** - User Interaction Testing

### DevOps & Tools
- **[ESLint](https://eslint.org/)** - Code Linting
- **[Prettier](https://prettier.io/)** - Code Formatting
- **[GitHub Actions](https://github.com/features/actions)** - CI/CD
- **[Vercel](https://vercel.com/)** - Deployment & Hosting
- **[Docker](https://www.docker.com/)** - Containerization (Optional)

### Other Libraries
- **[react-to-print](https://www.npmjs.com/package/react-to-print)** - In hóa đơn
- **[react-barcode](https://www.npmjs.com/package/react-barcode)** - Tạo mã vạch
- **[html5-qrcode](https://www.npmjs.com/package/html5-qrcode)** - Quét QR code
- **[date-fns](https://date-fns.org/)** - Date manipulation
- **[react-toastify](https://fkhadra.github.io/react-toastify/)** - Notifications
- **[nanoid](https://www.npmjs.com/package/nanoid)** - ID generation
- **[nodemailer](https://nodemailer.com/)** - Email sending

---

## 💻 Yêu cầu hệ thống

- **Node.js**: Version 22.x hoặc cao hơn
- **npm** hoặc **yarn**: Package manager
- **MongoDB**: Local hoặc MongoDB Atlas
- **Git**: Version control

---

## 🚀 Cài đặt

### 1. Clone repository

```bash
git clone https://github.com/NguyenDangKhuong/shop-management.git
cd shop-management
```

### 2. Cài đặt dependencies

```bash
npm install
# hoặc
yarn install
```

### 3. Cấu hình Environment Variables

Tạo file `.env.local` trong thư mục gốc:

```env
# URL
NEXT_PUBLIC_BACK_END_HOST_DEV=http://localhost:3000
NEXT_PUBLIC_BACK_END_HOST_PROD=https://thetaphoa.vercel.app

# MongoDB
NEXT_PUBLIC_MONGO_USER_NAME_DEV=admin
NEXT_PUBLIC_MONGO_PASSWORD_DEV=adminpassword
NEXT_PUBLIC_MONGO_USER_NAME_PROD=your-prod-username
NEXT_PUBLIC_MONGO_PASSWORD_PROD=your-prod-password

# Cloudinary
NEXT_PUBLIC_CLOUD_NAME_CLOUDINARY=your-cloud-name
NEXT_PUBLIC_API_KEY_CLOUDINARY=your-api-key
NEXT_PUBLIC_API_SECRET_CLOUDINARY=your-api-secret

# NextAuth
NEXT_PUBLIC_AUTH_SECRET=your-secret-key
```

**Lưu ý**: 
- Thay thế các giá trị `your-*` bằng credentials thực của bạn
- Để tạo `AUTH_SECRET`, chạy: `openssl rand -base64 32`

### 4. Chạy MongoDB (nếu dùng local)

```bash
# Nếu dùng Docker
docker run -d --name mongodb -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=adminpassword \
  mongo:latest

# Hoặc chạy MongoDB service
mongod
```

### 5. Khởi chạy Development Server

```bash
npm run dev
# hoặc
yarn dev
```

Mở [http://localhost:3000](http://localhost:3000) trong trình duyệt.

---

## 📖 Sử dụng

### Development

```bash
# Chạy development server
npm run dev

# Chạy linter
npm run lint

# Format code
npm run format

# Chạy tests
npm run test

# Chạy tests với watch mode
npm run test:watch

# Chạy tests với coverage
npm run test:coverage
```

### Production Build

```bash
# Build ứng dụng
npm run build

# Start production server
npm start
```

### Bundle Analysis

```bash
# Build với bundle analyzer
npm run build-analyzer
# hoặc
ANALYZE=true yarn build
```

---

## 📁 Cấu trúc dự án

```
shop-management/
├── .github/
│   └── workflows/
│       └── ci.yml              # GitHub Actions CI/CD
├── public/                     # Static files
│   ├── favicon.ico
│   └── service-worker.js
├── src/
│   ├── actions/               # Server Actions
│   │   ├── auth.ts
│   │   ├── orders.tsx
│   │   └── index.ts
│   ├── app/                   # Next.js App Router
│   │   ├── (admin)/          # Admin routes (protected)
│   │   │   ├── api/          # API routes
│   │   │   ├── products/
│   │   │   ├── orders/
│   │   │   ├── categories/
│   │   │   ├── carts/
│   │   │   └── layout.tsx
│   │   ├── login/
│   │   ├── register/
│   │   ├── privacy/
│   │   ├── terms/
│   │   ├── layout.tsx        # Root layout
│   │   ├── page.tsx          # Home page
│   │   ├── globals.css
│   │   └── error.tsx
│   ├── components/            # React Components
│   │   ├── dashboard/        # Admin components
│   │   │   ├── products/
│   │   │   ├── orders/
│   │   │   ├── categories/
│   │   │   ├── carts/
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── landing/          # Landing page components
│   │   └── providers/        # Context providers
│   ├── hooks/                 # Custom React Hooks
│   │   ├── useCheckAuth.ts
│   │   ├── useDebounce.ts
│   │   ├── useOnClickOutside.ts
│   │   └── usePushNotification.ts
│   ├── lib/                   # Libraries & utilities
│   │   └── antdRegistry.tsx
│   ├── models/                # MongoDB Models (Typegoose)
│   │   ├── User.ts
│   │   ├── Product.ts
│   │   ├── Order.ts
│   │   ├── Cart.ts
│   │   ├── Category.ts
│   │   ├── Customer.ts
│   │   ├── ProductCart.ts
│   │   └── Change.ts
│   ├── theme/                 # UI Theme configuration
│   │   └── themeConfig.ts
│   ├── types/                 # TypeScript types
│   │   ├── global.d.ts
│   │   └── backend.d.ts
│   ├── utils/                 # Utility functions
│   │   ├── constants.ts
│   │   ├── validateRegisterInput.ts
│   │   └── ...
│   └── middleware.ts          # Next.js middleware
├── test/                      # Test files
├── auth.config.ts            # NextAuth configuration
├── auth.ts                   # NextAuth setup
├── next.config.js            # Next.js configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
├── jest.config.ts            # Jest configuration
├── jest.setup.ts             # Jest setup
├── package.json              # Dependencies
├── CICD.md                   # CI/CD documentation
├── TESTING.md                # Testing documentation
├── PRE_PUSH_HOOK.md         # Git hooks documentation
├── Dockerfile                # Docker configuration
└── README.md                 # This file
```

---

## 🔌 API Routes

Tất cả API routes nằm trong thư mục `src/app/(admin)/api/`:

### Products

- `GET /api/products` - Lấy danh sách sản phẩm
- `GET /api/product/[id]` - Lấy chi tiết sản phẩm
- `POST /api/product` - Tạo sản phẩm mới
- `PUT /api/product/[id]` - Cập nhật sản phẩm
- `DELETE /api/product/[id]` - Xóa sản phẩm

### Orders

- `GET /api/orders` - Lấy danh sách đơn hàng
- `GET /api/order/[id]` - Lấy chi tiết đơn hàng
- `POST /api/order` - Tạo đơn hàng mới

### Categories

- `GET /api/categories` - Lấy danh sách danh mục
- `GET /api/category/[id]` - Lấy chi tiết danh mục
- `POST /api/category` - Tạo danh mục mới
- `PUT /api/category/[id]` - Cập nhật danh mục
- `DELETE /api/category/[id]` - Xóa danh mục

### Health Check

- `GET /api/check-connection` - Kiểm tra kết nối database

---

## 🧪 Testing

Dự án sử dụng **Jest** và **React Testing Library** để testing.

### Test Coverage

- **Total Tests**: 26 ✅
- **Test Suites**: 3
- **Components Tested**: LoginForm, RegisterForm
- **Utils Tested**: validateRegisterInput

### Chạy tests

```bash
# Chạy tất cả tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

### Test Files

```
src/
├── components/dashboard/
│   ├── login/__tests__/
│   │   └── LoginForm.test.tsx
│   └── register/__tests__/
│       └── RegisterForm.test.tsx
└── utils/__tests__/
    └── validateRegisterInput.test.ts
```

Xem chi tiết tài liệu testing tại [TESTING.md](./TESTING.md)

---

## 🔄 CI/CD

Dự án sử dụng **GitHub Actions** để tự động chạy tests và checks.

### Workflow CI

Mỗi khi có Pull Request hoặc push vào `master`:

1. ✅ Checkout code
2. ✅ Setup Node.js 22.x
3. ✅ Install dependencies
4. ✅ Run linter (`npm run lint`)
5. ✅ Run tests (`npm run test`)
6. ✅ Build application (`npm run build`)

### Pre-push Hook (Optional)

Có thể setup Git pre-push hook để chạy checks trước khi push:

```bash
# File: .git/hooks/pre-push
#!/bin/sh
npm run lint && npm run test && npm run build
```

Xem chi tiết tài liệu CI/CD tại [CICD.md](./CICD.md)

---

## 🚢 Deployment

### Deploy lên Vercel (Recommended)

1. Push code lên GitHub
2. Import project vào [Vercel](https://vercel.com/)
3. Cấu hình Environment Variables
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/NguyenDangKhuong/shop-management)

### Deploy với Docker (Optional)

```bash
# Build Docker image
docker build -t thetaphoa .

# Run container
docker run -d -p 3000:3000 --name thetaphoa thetaphoa
```

**Lưu ý**: Dockerfile hiện tại đang được comment. Uncomment nếu muốn sử dụng.

### Deploy lên VPS

```bash
# Clone repository
git clone https://github.com/NguyenDangKhuong/shop-management.git
cd shop-management

# Install dependencies
npm ci --production

# Build
npm run build

# Start with PM2
pm2 start npm --name thetaphoa -- start
```

---

## 🔑 Tài khoản mặc định

### Admin Account

```
Email: admin@gmail.com
Password: yumi442021
```

**⚠️ Lưu ý bảo mật**: 
- Đổi mật khẩu admin ngay sau khi deploy
- Không commit credentials vào Git
- Sử dụng environment variables cho sensitive data

---

## 🤝 Đóng góp

Chúng tôi rất hoan nghênh mọi đóng góp! Để đóng góp:

1. Fork repository
2. Tạo branch mới (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push lên branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

### Coding Standards

- Sử dụng TypeScript
- Follow ESLint rules
- Format code với Prettier
- Viết tests cho features mới
- Đảm bảo all tests pass trước khi push

---

## 👨‍💻 Tác giả

**Nguyen Dang Khuong**

- GitHub: [@NguyenDangKhuong](https://github.com/NguyenDangKhuong)
- Email: [Contact](mailto:khuong@example.com)

---

## 📄 License

Dự án này được phân phối dưới **MIT License**. Xem file [LICENSE](./LICENSE) để biết thêm chi tiết.

---

## 🙏 Cảm ơn

- [Next.js](https://nextjs.org/)
- [Ant Design](https://ant.design/)
- [MongoDB](https://www.mongodb.com/)
- [Vercel](https://vercel.com/)
- [Cloudinary](https://cloudinary.com/)

---

## 📞 Liên hệ & Hỗ trợ

Nếu bạn có câu hỏi hoặc cần hỗ trợ:

- 🐛 [Báo lỗi](https://github.com/NguyenDangKhuong/shop-management/issues)
- 💡 [Yêu cầu tính năng](https://github.com/NguyenDangKhuong/shop-management/issues)
- 📧 Email: [Contact Author](mailto:khuong@example.com)

---

<div align="center">

**⭐ Nếu project này hữu ích, đừng quên cho một star nhé! ⭐**

Made with ❤️ by [Nguyen Dang Khuong](https://github.com/NguyenDangKhuong)

</div>
