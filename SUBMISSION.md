# Full-Stack Assessment Submission: Mini SaaS Template Store

## 🚀 Live Links
- **Deployed Application**: [https://fullstack-intern-task-indol.vercel.app](https://fullstack-intern-task-indol.vercel.app)
- **GitHub Repository**: [https://github.com/Mageshwari10/fullstack-intern-task](https://github.com/Mageshwari10/fullstack-intern-task)

---

## 🛠️ Tech Stack
- **Frontend**: React (Vite), TypeScript, Vanilla CSS (Premium Design System)
- **Backend**: Node.js, Express.js
- **Authentication**: JWT (JSON Web Tokens), Bcryptjs for password hashing
- **Database**: SQLite with Knex.js query builder
- **Hosting**: Vercel (Frontend), Render (Backend API)

---

## ✨ Features Implemented

### 1. Authentication System
- **User Registration**: Secure sign-up with password hashing.
- **User Login**: JWT-based session management.
- **Protected Routes**: Favorites functionality is secured and requires a valid token.

### 2. Template Store
- **Dynamic List**: Fetches real-time template data from the Node.js backend.
- **Search & Filter**: Users can search by name or filter by categories (Dashboard, Landing, Admin, etc.).
- **Premium UI**: Modern glassmorphism design with a beautiful gradient background and high-quality typography.

### 3. Favorites System
- **One-Click Favoriting**: Users can "Favorite" any template directly from the grid.
- **Hover UX**: To maintain a clean UI, the "Favorite" button appears elegantly on hover.
- **Real-Time Updates**: Favorites list updates instantly without requiring a full page refresh.
- **Persistence**: Favorites are saved in the database and linked to the user's account.

---

## 📦 Local Setup Instructions
If you wish to run this project locally:

1. **Clone the repo**: `git clone https://github.com/Mageshwari10/fullstack-intern-task.git`
2. **Setup Server**: 
   - `cd server`
   - `npm install`
   - `npm run migrate` (Setup database)
   - `npm run seed` (Add sample templates)
   - `npm start`
3. **Setup Client**:
   - `cd client`
   - `npm install`
   - `npm run dev`

---

## 📝 Author
**Mageshwari**
*Full-Stack Developer Intern Candidate*
