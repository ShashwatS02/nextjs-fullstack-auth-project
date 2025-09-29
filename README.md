# 🚀 Auth Gateway – Full-Stack Next.js Authentication System

<p align="center">
  <img src="https://placehold.co/700x350/111111/FFFFFF?text=Auth+Gateway&font=raleway" alt="Project Banner">
</p>

A **modern, secure, and beautifully designed** full-stack authentication system built with **Next.js 15, TypeScript, and MongoDB**.  

Auth Gateway provides everything you need:  
🔑 User registration, login, session management, email verification, and password recovery — all wrapped in a **sleek dark-themed UI**.  

---

## 🔗 Live Demo & Repository

- 🌐 **Live App:** [Auth Gateway](https://nextjs-fullstack-auth-project-tau.vercel.app/login)  
- 💻 **GitHub Repo:** [nextjs-fullstack-auth-project](https://github.com/ShashwatS02/nextjs-fullstack-auth-project/)  

---

## ✨ Features

- ✔️ **Complete Authentication Flow** – Sign up, log in, log out  
- ✔️ **Session Management** – Secure sessions with **JWT in httpOnly cookies**  
- ✔️ **Protected Routes** – Middleware to block unauthorized access  
- ✔️ **Email Verification** – Users confirm their email before full access  
- ✔️ **Password Recovery** – Secure reset via email flow  
- ✔️ **Modern Dark UI** – Fully responsive with **Tailwind CSS**  
- ✔️ **Type-Safe** – 100% TypeScript for clean, maintainable code  
- ✔️ **API-First Design** – Clear separation of frontend & backend  

---

## 🛠️ Tech Stack

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000.svg?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-671ddf?style=for-the-badge&logo=axios&logoColor=white)
![Nodemailer](https://img.shields.io/badge/Nodemailer-2c3e50?style=for-the-badge&logo=gmail&logoColor=white)

---

## ⚡ Getting Started

### ✅ Prerequisites
- Node.js **v18.18.0+**  
- MongoDB (Local or Atlas)  
- Mailtrap Account (for email testing)  

---

### 📥 Installation

1. **Clone the repo**
git clone https://github.com/ShashwatS02/nextjs-fullstack-auth-project.git
cd nextjs-fullstack-auth-project

Install dependencies

npm install


Set environment variables
Create a .env file in the root:

MONGO_URI="your_mongodb_connection_string"
TOKEN_SECRET="your_super_secret_jwt_key"
DOMAIN="http://localhost:3000"

# Mailtrap Credentials
MAILTRAP_HOST="sandbox.smtp.mailtrap.io"
MAILTRAP_PORT="2525"
MAILTRAP_USER="your_mailtrap_user"
MAILTRAP_PASS="your_mailtrap_password"


Run the development server

npm run dev


Your app will be live at 👉 http://localhost:3000
 🎉

📂 Project Structure
nextjs-fullstack-auth-project/
├── app/                  # Next.js App Router pages & routes
├── components/           # Reusable UI components
├── lib/                  # Helpers (auth, db, tokens, mail)
├── models/               # Mongoose models
├── public/               # Static assets
├── styles/               # Tailwind CSS styles
├── .env                  # Environment variables (local only)
└── README.md

🤝 Contributing

Pull requests are welcome! To contribute:

Fork the repo

Create a new branch (feature/your-feature)

Commit your changes

Open a Pull Request 🚀

📜 License

This project is licensed under MIT – free to use and modify.

👤 Author

Shashwat Singh
🌐 GitHub: @ShashwatS02

⭐ If you like this project, please give it a star on GitHub!
