# Mini SaaS Template Store - Full Stack Application

A professional, full-stack web application built for the Intern Assessment. This project features a secure authentication system, a premium template store with search/filter capabilities, and a personalized favorites system.

## 🚀 Live Demo
**Application URL**: [https://fullstack-intern-task-indol.vercel.app](https://fullstack-intern-task-indol.vercel.app)

---

## 🛠️ Tech Stack

### Frontend
- **React (Vite)** with **TypeScript**
- **Modern CSS**: Custom design system featuring Glassmorphism, CSS Variables, and smooth animations.
- **State Management**: React Hooks (useState, useEffect)
- **Routing**: React Router DOM v6

### Backend
- **Node.js** & **Express.js**
- **Authentication**: JWT (JSON Web Tokens) with 24h expiry
- **Security**: Bcryptjs for password hashing & CORS protection
- **Database**: SQLite with **Knex.js** query builder
- **Validation**: Express-validator middleware

---

## 📂 Project Structure

```text
fullstack-intern-task/
├── client/                # React Frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components (TemplateList, FavoritesList)
│   │   ├── services/      # API communication logic (Axios/Fetch)
│   │   ├── contexts/      # AuthContext for global user state
│   │   ├── AppFixed.tsx   # Main application entry and routing
│   │   └── index.css      # Modern Glassmorphism design system
│   ├── public/            # Static assets
│   └── vercel.json        # SPA routing configuration for Vercel
│
├── server/                # Express Backend
│   ├── seeds/             # Initial database sample data (8 templates)
│   ├── migrations/        # Knex database schema definitions
│   ├── database.sqlite    # Local development database
│   ├── server.js          # Main Express server and API routes
│   └── knexfile.js        # Database configuration
│
└── SUBMISSION.md          # Project submission summary
```

---

## ✨ Core Features

### 🔐 1. Authentication System
- **Secure Registration**: Validates email and enforces password length. Passwords are salted and hashed before storage.
- **JWT Login**: Issues a secure JSON Web Token upon successful authentication.
- **Session Persistence**: User remains logged in across page refreshes using local storage.

### 🎨 2. Premium Template Store
- **Discovery**: Real-time fetching of templates with images, categories, and descriptions.
- **Advanced Search**: Filter templates by name, description, or category instantly.
- **High-End UI**: Featuring a modern gradient background, glassmorphism cards, and premium typography.

### ❤️ 3. Personalized Favorites
- **One-Click Save**: Add any template to your favorites instantly.
- **Hover Interaction**: To maintain a clean UI, actions are hidden and appear elegantly on hover.
- **Real-Time Sync**: The favorites list updates immediately without needing a full page reload.

---

## 📖 Setup Instructions

To run this project locally:

### 1. Backend Setup
```bash
cd server
npm install
npm run migrate  # Sets up schema
npm run seed     # Adds 8 sample templates
npm start        # Runs on http://localhost:5000
```

### 2. Frontend Setup
```bash
cd client
npm install
npm run dev      # Runs on http://localhost:5173
```

---

## 📝 Author
**Mageshwari**
- **GitHub**: [Mageshwari10](https://github.com/Mageshwari10)
- **Role**: Full-Stack Developer Intern Candidate
- **E-Mail**: mageshwarirajavel0@gmail.com
- **Contact**:6374953655

---

## 📄 License
This project is for assessment purposes.
