# Quick Setup Guide

## Step 1: Install Dependencies

### Option A: Install All at Once
```bash
npm run install-all
```

### Option B: Install Separately
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

## Step 2: Start the Application

### Development Mode (Recommended)
This starts both the backend and frontend:
```bash
npm run dev
```

The app will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### Or Start Separately

Terminal 1 - Backend:
```bash
npm run server
```

Terminal 2 - Frontend:
```bash
npm run client
```

## Step 3: First Time Setup

1. **Open the Admin Dashboard**: Navigate to http://localhost:3000/admin
2. **Create a Session**: Enter week number (e.g., 1) and click "Create Session"
3. **Register Players**: Players can register at the home page
4. **Start Playing**: Follow the game flow as described in the README

## Troubleshooting

### Port Already in Use
If port 5000 or 3000 is already in use:
- Backend: Set `PORT` environment variable (e.g., `PORT=5001 npm run server`)
- Frontend: React will automatically use the next available port

### Database Issues
The SQLite database will be created automatically on first run in `server/miden_wars.db`

### Module Not Found Errors
Make sure you've run `npm install` in both the root directory and the `client` directory.

