# 🚀 Auth Gateway – Full-Stack Next.js Authentication System

A **modern, secure, and beautifully designed** full-stack authentication system built with **Next.js 15, TypeScript, and MongoDB**.

Auth Gateway provides everything you need: **user registration, login, session management, email verification, and password recovery** — all wrapped in a sleek dark-themed UI.

---

## 🔗 Live Demo & Repository

* 🌐 **Live App:** [Auth Gateway](https://nextjs-fullstack-auth-project-tau.vercel.app/login)
* 💻 **GitHub Repo:** [nextjs-fullstack-auth-project](https://github.com/ShashwatS02/nextjs-fullstack-auth-project/)

---

## ✨ Features

✔️ **Complete Authentication Flow** – Sign up, log in, log out.
✔️ **Session Management** – Secure sessions with **JWT in httpOnly cookies**.
✔️ **Protected Routes** – Middleware to block unauthorized access.
✔️ **Email Verification** – Users confirm their email before full access.
✔️ **Password Recovery** – Forgot password? Reset via secure email flow.
✔️ **Modern Dark UI** – Fully responsive, built with Tailwind CSS.
✔️ **Type-Safe** – 100% TypeScript for cleaner and maintainable code.
✔️ **API-First Design** – Clear separation of frontend & backend.

---

## 🛠️ Tech Stack

* **Framework**: Next.js 15 (App Router + Turbopack)
* **Language**: TypeScript
* **Database**: MongoDB (Mongoose)
* **Styling**: Tailwind CSS
* **Auth**: JWT + bcryptjs
* **API Client**: Axios
* **Emails**: Nodemailer + Mailtrap
* **UI Notifications**: React Hot Toast

---

## ⚡ Getting Started

### ✅ Prerequisites

* Node.js **v18.18.0+**
* MongoDB (Local or Atlas)
* Mailtrap Account (for email testing)

---

### 📥 Installation

1. **Clone the repo**

```bash
git clone https://github.com/ShashwatS02/nextjs-fullstack-auth-project.git
cd nextjs-fullstack-auth-project
```

2. **Install dependencies**

```bash
npm install
```

3. **Set environment variables**
   Create a `.env` file in the root:

```env
MONGO_URI="your_mongodb_connection_string"
TOKEN_SECRET="your_super_secret_jwt_key"
DOMAIN="http://localhost:3000"

# Mailtrap Credentials
MAILTRAP_HOST="sandbox.smtp.mailtrap.io"
MAILTRAP_PORT="2525"
MAILTRAP_USER="your_mailtrap_user"
MAILTRAP_PASS="your_mailtrap_password"
```

4. **Run the development server**

```bash
npm run dev
```

Now open [http://localhost:3000](http://localhost:3000) 🎉


---

## 🤝 Contributing

Pull requests are welcome! If you have ideas for new features or improvements, feel free to fork and submit.

---

## 📜 License

This project is licensed under the **Myself**.
