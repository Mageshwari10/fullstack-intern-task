# 🚀 Deployment Guide

This guide will help you deploy the Fullstack Template Store application on Render (backend) and Vercel (frontend).

## 📋 Prerequisites

- GitHub repository with the code
- Render account (free tier available)
- Vercel account (free tier available)

## 🔧 Backend Deployment (Render)

### Step 1: Prepare the Repository
The repository is already configured with:
- `server/render.yaml` - Render configuration file
- Health check endpoint at `/health`
- Production-ready server configuration

### Step 2: Deploy to Render

1. **Go to [Render Dashboard](https://dashboard.render.com)**
2. **Click "New +" → "Web Service"**
3. **Connect GitHub**: Authorize Render to access your GitHub account
4. **Select Repository**: Choose `fullstack-intern-task`
5. **Configure Service**:
   - **Name**: `fullstack-intern-task-api`
   - **Root Directory**: `server`
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run init-db`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

6. **Environment Variables**:
   ```
   NODE_ENV=production
   PORT=10000
   JWT_SECRET=your-super-secret-jwt-key
   DB_PATH=/opt/render/project/src/database.sqlite
   ```

7. **Click "Create Web Service"**

### Step 3: Verify Deployment
- Your API will be available at: `https://fullstack-intern-task-api.onrender.com`
- Test the health endpoint: `https://fullstack-intern-task-api.onrender.com/health`

## 🌐 Frontend Deployment (Vercel)

### Step 1: Prepare the Repository
The repository is already configured with:
- `client/vercel.json` - Vercel configuration file
- Environment variable support for API URL

### Step 2: Deploy to Vercel

1. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**
2. **Click "Add New..." → "Project"**
3. **Import Git Repository**: Connect your GitHub account
4. **Select Repository**: Choose `fullstack-intern-task`
5. **Configure Project**:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

6. **Environment Variables** (CRITICAL):
   ```
   VITE_API_URL=https://fullstack-intern-task-api.onrender.com
   ```
   **⚠️ IMPORTANT**: You must set this environment variable, otherwise the frontend will try to connect to localhost:5000 and sign-in won't work!

7. **Click "Deploy"**

### Step 3: Verify Deployment
- Your frontend will be available at: `https://your-project-name.vercel.app`
- Test that it connects to the backend API

## 🔗 Connecting Frontend and Backend

### Important Notes:
1. **CORS**: The backend is configured to allow all origins in development
2. **Environment Variables**: The frontend uses `VITE_API_URL` to connect to the backend
3. **API Endpoints**: All API calls are prefixed with `/api`

### Testing the Connection:
1. Visit your deployed frontend
2. Try to register a new user
3. Try to login with the registered user
4. Verify that the templates page loads correctly

## 🛠️ Troubleshooting

### Common Issues:

#### Backend Issues:
- **Build Fails**: Check that all dependencies are in `package.json`
- **Database Issues**: Ensure `npm run init-db` runs successfully
- **Port Issues**: Render uses port 10000 by default

#### Frontend Issues:
- **API Connection**: Verify `VITE_API_URL` is set correctly
- **Build Fails**: Check that all dependencies are installed
- **Routing Issues**: Vercel handles SPA routing automatically

#### CORS Issues:
If you encounter CORS errors, update the backend CORS configuration:
```javascript
app.use(cors({
  origin: ['https://your-frontend.vercel.app', 'http://localhost:5173'],
  credentials: true
}));
```

### Debugging Tips:
1. Check Render logs for backend errors
2. Check Vercel logs for frontend errors
3. Use browser DevTools to inspect API calls
4. Test API endpoints directly with curl or Postman

## 📝 Environment Variables Summary

### Backend (Render):
```
NODE_ENV=production
PORT=10000
JWT_SECRET=your-super-secret-jwt-key
DB_PATH=/opt/render/project/src/database.sqlite
```

### Frontend (Vercel):
```
VITE_API_URL=https://fullstack-intern-task-api.onrender.com
```

## 🔄 Continuous Deployment

Both platforms support automatic deployments:
- **Render**: Automatically deploys on push to main branch
- **Vercel**: Automatically deploys on push to main branch

## 📊 Monitoring

### Render:
- Health checks at `/health`
- Logs available in dashboard
- Metrics and alerts available

### Vercel:
- Build logs available
- Analytics and performance metrics
- Error tracking

## 🎯 Final Steps

1. **Test the complete application flow**
2. **Verify all features work correctly**
3. **Check responsive design on mobile**
4. **Test authentication and favorites**
5. **Update any hardcoded URLs if needed**

Your application is now live and ready for use! 🎉
