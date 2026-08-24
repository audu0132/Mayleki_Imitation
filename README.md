# 💎 Mayleki Imitation Jewellery

> A premium luxury jewellery rental and shopping platform built with the **MERN Stack** — designed for customers looking to **rent, buy, or explore premium 1GM and imitation jewellery** for weddings and special occasions.

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Vite](https://img.shields.io/badge/Vite-Build-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)

---

## ✨ Features

### 👩 Customer Features

| Feature | Description |
|---|---|
| 🛍️ Browse Collections | Explore premium jewellery by category |
| 🔍 Search & Filter | Find products by name, category, price |
| 💍 Product Details | Full image gallery, descriptions, variants |
| ❤️ Wishlist | Save favourite items for later |
| 🛒 Shopping Cart | Add, update, remove items |
| 📅 Rental Booking | Book jewellery for events with date selection |
| 💳 Secure Checkout | Razorpay payment gateway integration |
| 🔐 Authentication | JWT-based login & registration |
| 📦 Order History | Track past purchases and rentals |
| 👤 Profile Management | Update personal details |
| 📬 Contact & Inquiry | Reach out for custom orders or support |
| 🤖 AI Jewellery Stylist | Gemini AI-powered personal styling assistant |
| 💬 WhatsApp Support | Instant chat via WhatsApp button |

### 👑 Admin Features

| Feature | Description |
|---|---|
| 📊 Dashboard | Overview of sales, orders, and rentals |
| 🏷️ Product Management | Add, edit, delete products with images |
| 📂 Category Management | Manage jewellery categories |
| 📦 Order Management | View and update order statuses |
| 👥 Customer Management | View registered users |
| 📅 Rental Booking Management | Manage all rental bookings |
| 🖼️ Banner Management | Update homepage banners |
| 🎟️ Coupon & Offer Management | Create discount codes |
| 📈 Analytics Dashboard | Sales and traffic insights |

---

## 💍 Jewellery Categories

- Bridal Jewellery
- Necklace Sets
- Mangalsutra
- Earrings
- Bangles
- Nath
- Bridal Accessories
- Traditional Maharashtrian Jewellery
- Temple Jewellery
- Premium 1GM Jewellery

---

## 🚀 Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| React.js (Vite) | UI framework & build tool |
| React Router | Client-side routing |
| Tailwind CSS | Utility-first styling |
| Framer Motion | Animations & page transitions |
| Axios | HTTP client |
| React Icons | Icon library |

### Backend

| Technology | Purpose |
|---|---|
| Node.js + Express.js | REST API server |
| MongoDB + Mongoose | Database & ODM |
| JWT | Authentication & session management |
| Bcrypt.js | Password hashing |
| Razorpay | Payment gateway |
| Multer | File upload handling |
| Cloudinary | Cloud image storage |
| Google Gemini AI | AI Jewellery Stylist |
| MSG91 | SMS notifications |

---

## 📁 Project Structure

```
Mayleki_Imitation/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ai/              # AI Stylist components
│   │   │   ├── common/          # Shared components (WhatsApp, Spinner, etc.)
│   │   │   ├── home/            # Homepage sections
│   │   │   ├── layout/          # Navbar, Footer, Layout wrappers
│   │   │   └── products/        # Product cards, filters, gallery
│   │   ├── context/             # React Context (Auth, Cart, Wishlist)
│   │   ├── pages/               # Route-level pages
│   │   │   ├── admin/           # Admin dashboard pages
│   │   │   ├── HomePage.jsx
│   │   │   ├── ProductListingPage.jsx
│   │   │   ├── ProductDetailPage.jsx
│   │   │   ├── RentalBookingPage.jsx
│   │   │   ├── CartPage.jsx
│   │   │   ├── CheckoutPage.jsx
│   │   │   ├── AiStylistPage.jsx
│   │   │   └── ...
│   │   ├── data/                # Static/seed data
│   │   ├── config/              # Axios & API config
│   │   └── assets/              # Images & static assets
│   └── package.json
│
├── backend/
│   ├── models/                  # Mongoose schemas (User, Product, Order, Rental)
│   ├── routes/                  # Express API routes
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── orders.js
│   │   ├── rentals.js
│   │   ├── payment.js
│   │   ├── ai.js
│   │   ├── upload.js
│   │   └── ...
│   ├── middleware/              # Auth middleware, error handlers
│   ├── utils/                   # Helper utilities
│   ├── server.js                # Express app entry point
│   └── package.json
│
├── package.json                 # Root monorepo scripts
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/audu0132/Mayleki_Imitation.git
cd Mayleki_Imitation
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` folder:

```env
# Server
NODE_ENV=development
PORT=5000

# Database
MONGODB_URI=your_mongodb_connection_string

# Authentication
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d

# Frontend URL (CORS)
FRONTEND_URL=http://localhost:5173
CLIENT_URL=http://localhost:5173

# Cloudinary (Image Storage)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Razorpay (Payments)
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret

# Gemini AI
GEMINI_API_KEY=your_gemini_api_key

# Business Info
BUSINESS_NAME=Mayleki Imitation Jewellery
BUSINESS_PHONE=your_phone
BUSINESS_EMAIL=your_email

# MSG91 (SMS)
MSG91_AUTH_KEY=your_msg91_key
MSG91_SENDER_ID=MAYLKI
MSG91_TEMPLATE_ID=your_template_id
```

Start the backend dev server:

```bash
npm run dev
```

> Backend runs at `http://localhost:5000`

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

> Frontend runs at `http://localhost:5173`

---

### 4. Build for Production

From the root:

```bash
npm run build
```

This builds the frontend and copies the `dist/` output to the root `dist/` folder for deployment.

---

## 🌐 API Routes Overview

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and get JWT |
| GET | `/api/products` | List all products |
| GET | `/api/products/:id` | Get product details |
| POST | `/api/orders` | Place a new order |
| GET | `/api/orders/my` | Get user's orders |
| POST | `/api/rentals` | Create rental booking |
| POST | `/api/payment/create-order` | Initiate Razorpay payment |
| POST | `/api/payment/verify` | Verify payment signature |
| POST | `/api/ai/stylist` | AI Jewellery Stylist (Gemini) |
| POST | `/api/upload` | Upload images to Cloudinary |
| POST | `/api/contact` | Submit contact/inquiry form |

---

## 🔮 Upcoming Features

- [ ] Online Payment Gateway (Razorpay — in progress)
- [ ] Virtual Try-On
- [ ] Appointment Booking System
- [ ] Inventory Alerts & Low-Stock Notifications
- [ ] GST Invoice Generation (PDF)
- [ ] Customer Reviews & Ratings
- [ ] Loyalty / Reward Points Program
- [ ] Advanced Analytics for Admin

---

## 👤 Author

**Audumbar More** — Frontend Developer

| Platform | Link |
|---|---|
| 🐙 GitHub | [github.com/audu0132](https://github.com/audu0132) |
| 🌐 Portfolio | [audumbar-more-portfolio-five.vercel.app](https://audumbar-more-portfolio-five.vercel.app/) |

---

## 📄 License

This project is developed for educational and commercial purposes.

© 2026 **Audumbar More**. All Rights Reserved.
