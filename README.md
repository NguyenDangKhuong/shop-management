# 🛍️ TheTapHoa - Shop Management System

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15.4.10-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue?style=for-the-badge&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green?style=for-the-badge&logo=mongodb)
![Ant Design](https://img.shields.io/badge/Ant_Design-5.26.5-1890ff?style=for-the-badge&logo=ant-design)
![Jest](https://img.shields.io/badge/Jest-29.7.0-C21325?style=for-the-badge&logo=jest)

**A modern shop management system built with Next.js 15, TypeScript, MongoDB, and Ant Design**

[Demo](https://thetaphoa.vercel.app) • [Report Bug](https://github.com/NguyenDangKhuong/shop-management/issues) • [Request Feature](https://github.com/NguyenDangKhuong/shop-management/issues)

</div>

---

## 📋 Table of Contents

- [Introduction](#-introduction)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [System Requirements](#-system-requirements)
- [Installation](#-installation)
- [Usage](#-usage)
- [Contributing](#-contributing)
- [Author](#-author)
- [License](#-license)

---

## 🎯 Introduction

**TheTapHoa** is a comprehensive shop management system designed to help small and medium-sized store owners efficiently manage products, orders, categories, and customers. Built with cutting-edge technologies, the application ensures high performance, robust security, and an excellent user experience.

### 🌟 Key Features

- ⚡ **High Performance** with Next.js 15 and Server-Side Rendering
- 🔐 **Secure** with NextAuth.js v5 and role-based access control
- 📱 **Responsive** - Works on all devices
- 🎨 **Beautiful UI** with Ant Design 5
- 🧪 **Tested** - 26 unit tests with Jest and React Testing Library
- 🌐 **i18n Ready** - Multi-language support
- 🚀 **Fast** - Optimized for speed and user experience

---

## ✨ Features

### 👤 User Management
- User registration and authentication
- Role-based access control (Admin/User)
- Secure session management with NextAuth.js

### 📦 Product Management
- CRUD operations for products
- Image upload with Cloudinary integration
- Product categorization
- Inventory tracking
- Search and filter capabilities

### 📋 Order Management
- Create and track orders
- Order status management
- Order history
- Invoice generation

### 🏷️ Category Management
- CRUD operations for product categories
- Category-based product organization

### 🛒 Shopping Cart
- Add/remove products
- Quantity management
- Real-time price calculation

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15.4.10 (App Router)
- **Language**: TypeScript 5.2.2
- **UI Library**: Ant Design 5.26.5
- **Styling**: CSS Modules + Tailwind CSS

### Backend
- **Runtime**: Node.js
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js v5
- **File Upload**: Cloudinary

### Testing
- **Testing Framework**: Jest 29.7.0
- **Component Testing**: React Testing Library
- **Coverage**: 26 unit tests

### DevOps
- **CI/CD**: GitHub Actions
- **Deployment**: Vercel
- **Package Manager**: npm
- **Code Quality**: ESLint + Prettier

---

## 💻 System Requirements

- Node.js >= 18.0.0
- npm >= 9.0.0
- MongoDB Atlas account or local MongoDB
- Cloudinary account (for image uploads)

---

## 📥 Installation

### 1. Clone the repository

```bash
git clone https://github.com/NguyenDangKhuong/shop-management.git
cd shop-management
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Contact the project administrator for the `.env.local` configuration file.

### 4. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🤝 Contributing

We welcome all contributions! To contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards

- Use TypeScript
- Follow ESLint rules
- Format code with Prettier
- Write tests for new features
- Ensure all tests pass before pushing

---

## 👨‍💻 Author

**Nguyen Dang Khuong**

- GitHub: [@NguyenDangKhuong](https://github.com/NguyenDangKhuong)
- Email: nguyendangkhuong96@gmail.com

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Ant Design](https://ant.design/) - UI Component Library
- [MongoDB](https://www.mongodb.com/) - Database
- [Cloudinary](https://cloudinary.com/) - Image Management
- [Vercel](https://vercel.com/) - Hosting Platform

---

<div align="center">

**Made with ❤️ by Nguyen Dang Khuong**

⭐ Star this repo if you find it helpful!

</div>
