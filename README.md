# Mini SaaS Template Store - Full Stack Application

A professional, full-stack web application built for the Intern Assessment. This project features a secure authentication system, a premium template store with search/filter capabilities, and a personalized favorites system.

## 🚀 Live Demo
**Application URL**: [https://fullstack-intern-task-indol.vercel.app](https://fullstack-intern-task-indol.vercel.app)

---

## 🛠️ Tech Stack

### Frontend
- **React (Vite)** with **TypeScript**
- **Modern CSS**: Custom design system featuring Glassmorphism and smooth animations.
- **State Management**: React Hooks (useState, useEffect)

### Backend
- **Node.js** & **Express.js**
- **Authentication**: JWT (JSON Web Tokens) & Bcryptjs
- **Database**: SQLite with **Knex.js**
- **Validation**: Express-validator

---

## 📖 Setup Instructions

To run this project locally, follow these steps:

### 1. Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### 2. Backend Setup
```bash
cd server
npm install
npm run migrate  # Sets up the SQLite database
npm run seed     # Seeds the database with sample templates
npm start        # Starts the API on http://localhost:5000
```

### 3. Frontend Setup
```bash
cd client
npm install
npm run dev      # Starts the app on http://localhost:5173
```

---

## ✨ Core Features
- **Secure Authentication**: User registration and login with encrypted passwords and JWT sessions.
- **Template Discovery**: Search and filter through a library of premium templates.
- **Favorites System**: Save templates to your personalized "My Favorites" list with a single click.
- **Premium UX**: High-end design with hover effects and instant UI updates.

---

## 📝 Author
**Mageshwari**
- **GitHub**: [Mageshwari10](https://github.com/Mageshwari10)
- **Role**: Full-Stack Developer Intern Candidate

---

## 📄 License
This project is for assessment purposes.
