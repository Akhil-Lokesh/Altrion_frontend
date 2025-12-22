
# Altrion - Unified Finance Platform

A full-stack application for unified finance and intelligent risk management.

## Project Structure

```
Altrion_complete/
├── frontend/          # React + Vite frontend application
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/           # Express + MongoDB backend API
│   ├── src/
│   └── package.json
├── package.json       # Root package.json for monorepo scripts
└── README.md
```

## Tech Stack

### Frontend
- React 19
- TypeScript
- Vite
- TailwindCSS
- Zustand (State Management)
- React Query
- React Router
- Framer Motion

### Backend
- Node.js
- Express
- MongoDB (Atlas)
- Mongoose
- JWT Authentication
- Passport.js (OAuth)
- bcrypt

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account

### Installation

1. Install all dependencies:
   ```bash
   npm run install:all
   ```

2. Configure environment variables:

   **Frontend** (`frontend/.env`):
   ```env
   VITE_API_URL=http://localhost:3001/api
   VITE_GOOGLE_CLIENT_ID=your_google_client_id
   VITE_GITHUB_CLIENT_ID=your_github_client_id
   ```

   **Backend** (`backend/.env`):
   ```env
   PORT=3001
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   ```

### Running the Application

#### Development Mode (Both servers)
```bash
npm run dev
```

#### Run servers individually
```bash
# Frontend only (http://localhost:5173)
npm run dev:frontend

# Backend only (http://localhost:3001)
npm run dev:backend
```

### Building for Production

```bash
# Build frontend
npm run build:frontend

# Frontend is in backend/package.json, no build needed for development
```

## Features

- **Authentication**
  - Email/Password signup and signin
  - JWT-based authentication
  - OAuth integration (Google & GitHub)
  - Session management
  - Password encryption

- **Frontend**
  - Modern React with TypeScript
  - Responsive design
  - Real-time form validation
  - Protected routes
  - Optimistic UI updates

- **Backend**
  - RESTful API
  - MongoDB integration
  - Request validation
  - Error handling
  - CORS enabled

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/signin` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `POST /api/auth/logout` - Logout user (protected)
- `GET /api/auth/google` - Google OAuth
- `GET /api/auth/github` - GitHub OAuth

## Development

- Frontend runs on port **5173**
- Backend runs on port **3001**
- MongoDB Atlas for database

## License

ISC
