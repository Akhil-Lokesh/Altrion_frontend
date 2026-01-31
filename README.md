# Altrion - Crypto Asset Lending Platform

A full-stack cryptocurrency lending platform built with React, TypeScript, and Node.js. This monorepo contains both the frontend application and backend authentication service.

## 📁 Project Structure

This is a **monorepo** containing:

```
altrion-app/
├── src/                    # Frontend React application
├── public/                 # Static assets
├── backend/                # Node.js/Express authentication service
├── font/                   # Custom fonts
└── package.json            # Frontend dependencies
```

## 🔗 Git Repository Structure

### Main Repositories

- **Primary Development**: `https://github.com/Akhil-Lokesh/Altrion_frontend`
  - Main development repository
  - Contains both frontend and backend code
  - Active branch: `Akhil-featureadded`

- **Fork**: `https://github.com/Akhil-Lokesh/altrion-frontend`
  - Forked from `revanth-108/altrion-frontend`
  - Used for creating pull requests to upstream
  - Branches: `main`, `Akhil-featureadded`

- **Upstream**: `https://github.com/revanth-108/altrion-frontend`
  - Original repository
  - Requires collaborator access to push directly

### Git Workflow

1. **Development** happens in `/Users/akhil/Desktop/altrion-app`
2. **Commits** are made locally to the `Akhil-featureadded` branch
3. **Push** to your repositories:
   ```bash
   # Push to primary repo
   git push origin Akhil-featureadded
   
   # Push to fork (for PRs to upstream)
   git push fork Akhil-featureadded
   ```
4. **Create Pull Request** from your fork to `revanth-108/altrion-frontend`

### Remote Configuration

```bash
# View current remotes
git remote -v

# Expected output:
# origin   https://github.com/Akhil-Lokesh/Altrion_frontend.git
# fork     https://github.com/Akhil-Lokesh/altrion-frontend.git
# revanth  https://github.com/revanth-108/altrion-frontend.git
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (for backend)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Akhil-Lokesh/Altrion_frontend.git
   cd Altrion_frontend
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Set up environment variables**
   
   Frontend (`.env`):
   ```env
   VITE_API_URL=http://localhost:5000
   ```
   
   Backend (`backend/.env`):
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

### Running the Application

**Frontend (Development)**
```bash
npm run dev
```

**Backend (Development)**
```bash
cd backend
npm run dev
```

**Build for Production**
```bash
npm run build
```

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **State Management**: Zustand
- **Routing**: React Router
- **Charts**: Recharts
- **UI Components**: Radix UI, Lucide Icons

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: Passport.js (Google OAuth, JWT)
- **Session Management**: express-session

## 📦 Key Features

- 🔐 Google OAuth authentication
- 💰 Crypto asset portfolio management
- 📊 Real-time price charts and analytics
- 💳 Loan application and management
- 📈 Asset detail pages with market data
- 👤 User profile and settings
- 🔄 Connected accounts management

## 🤝 Contributing

### For Team Members

1. Create a feature branch from `Akhil-featureadded`
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit
   ```bash
   git add .
   git commit -m "feat: your feature description"
   ```

3. Push to the repository
   ```bash
   git push origin feature/your-feature-name
   ```

4. Create a Pull Request on GitHub

### For External Contributors

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a Pull Request to `revanth-108/altrion-frontend`

## 📝 Branch Strategy

- `main` - Stable production-ready code
- `Akhil-featureadded` - Active development branch
- `feature/*` - Feature development branches

## 🔒 Security Notes

- Never commit `.env` files
- Keep API keys and secrets secure
- Use environment variables for sensitive data
- The `.env` file is gitignored by default

## 📄 License

This project is private and proprietary.

## 👥 Team

- **Akhil Lokesh** - Developer
- **Revanth** - Collaborator

---

Built with ❤️ using React + TypeScript + Vite
