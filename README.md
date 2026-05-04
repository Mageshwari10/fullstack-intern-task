# Mini SaaS Template Store

A full-stack web application that allows users to browse, search, and favorite templates. Built with React.js, Node.js, Express, and SQLite.

## 🚀 Features

### Core Features
- **User Authentication**: Register and login with JWT-based authentication
- **Template Browsing**: View a list of available templates with thumbnails
- **Search & Filter**: Search templates by name/description and filter by category
- **Favorites System**: Mark templates as favorites and view them in a dedicated section
- **Responsive Design**: Clean and modern UI built with TailwindCSS

### Bonus Features
- **Protected Routes**: Only authenticated users can access favorites
- **Logout Functionality**: Secure logout with token cleanup
- **Real-time Updates**: Instant favorite status updates
- **Category Filtering**: Browse templates by category
- **Search Functionality**: Search across template names and descriptions

## 🛠 Tech Stack

### Frontend
- **React.js** (Vite)
- **React Router DOM** for routing
- **Axios** for API calls
- **TailwindCSS** for styling
- **TypeScript** for type safety

### Backend
- **Node.js** with **Express.js**
- **SQLite** database with **Knex.js** ORM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **express-validator** for input validation

## 📁 Project Structure

```
fullstack-intern-task/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── contexts/       # React contexts
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   └── App.tsx         # Main app component
│   ├── package.json
│   └── tailwind.config.js
├── server/                 # Node.js backend
│   ├── migrations/         # Database migrations
│   ├── seeds/             # Database seeds
│   ├── scripts/           # Utility scripts
│   ├── server.js          # Main server file
│   ├── knexfile.js        # Knex configuration
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd fullstack-intern-task
   ```

2. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Set up the database**
   ```bash
   cd ../server
   npm run init-db
   ```

5. **Configure environment variables**
   
   In the `server` directory, create a `.env` file:
   ```env
   PORT=5000
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   DB_PATH=./database.sqlite
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd server
   npm run dev
   ```
   The server will run on `http://localhost:5000`

2. **Start the frontend development server**
   ```bash
   cd client
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

## 📊 API Endpoints

### Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User login

### Templates
- `GET /api/templates` - Get all templates (supports search and category filtering)
- `GET /api/templates/:id` - Get template details
- `GET /api/categories` - Get all categories

### Favorites
- `POST /api/favorites/:templateId` - Toggle favorite status
- `GET /api/favorites` - Get user's favorite templates
- `GET /api/favorites/check/:templateId` - Check if template is favorited

### Health Check
- `GET /api/health` - Server health check

## 🎯 Usage

1. **Register a new account** or login with existing credentials
2. **Browse templates** on the main page
3. **Search templates** using the search bar
4. **Filter by category** using the dropdown
5. **Mark templates as favorites** by clicking the heart icon
6. **View your favorites** in the "My Favorites" section (requires login)

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:

- Tokens are stored in localStorage
- Protected routes require valid JWT in Authorization header
- Tokens expire after 24 hours
- Passwords are hashed using bcryptjs

## 🗄 Database Schema

### Users Table
- `id` (Primary Key)
- `email` (Unique)
- `password` (Hashed)
- `created_at`
- `updated_at`

### Templates Table
- `id` (Primary Key)
- `name`
- `description`
- `thumbnail_url`
- `category`
- `created_at`
- `updated_at`

### Favorites Table
- `id` (Primary Key)
- `user_id` (Foreign Key to Users)
- `template_id` (Foreign Key to Templates)
- `created_at`

## 🎨 UI Components

### Pages
- **Login Page** (`/login`) - User authentication
- **Register Page** (`/register`) - New user registration
- **Templates Page** (`/templates`) - Browse and search templates
- **Favorites Page** (`/favorites`) - View favorited templates (protected)

### Components
- **TemplateCard** - Reusable template display card
- **ProtectedRoute** - Route protection wrapper
- **AuthContext** - Authentication state management

## 🚀 Deployment

### Backend (Render/Vercel)
1. Set environment variables in hosting platform
2. Build and deploy the Node.js application
3. Ensure database is properly configured

### Frontend (Vercel/Netlify)
1. Build the React application: `npm run build`
2. Deploy the `dist` folder
3. Configure environment variables for API URL

## 🧪 Testing

The application includes:
- Input validation on both frontend and backend
- Error handling for API calls
- Protected route verification
- Database relationship integrity

## 📝 Author

**Mageshwari**  
**Email**: mageshwari10@example.com  
**GitHub**: https://github.com/Mageshwari10  
**Phone**: +91 9876543210

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For any questions or issues, please contact:
- Email: mageshwari10@example.com
- GitHub: https://github.com/Mageshwari10

---

**Note**: This project was completed as part of a technical assessment for a Full Stack Web Developer Intern position.
