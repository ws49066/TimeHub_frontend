# Frontend Installation Guide

Complete step-by-step guide for installing TimeHub Frontend locally.

## Prerequisites

### **Node.js & npm**

```bash
node --version  # Should be v18+
npm --version
```

If not installed, download from https://nodejs.org/ (LTS version)

### **Git**

```bash
git --version
```

If not installed, download from https://git-scm.com/

### **Backend Running**

TimeHub Frontend requires the backend API running on `http://localhost:3001`:

```bash
# In another terminal/window
cd ../timehub-backend
npm run dev
```

Backend should show: `Server running on port 3001`

---

## Installation Steps (10 minutes)

### **1. Clone Repository**

```bash
git clone https://github.com/seu-usuario/timehub-frontend.git
cd timehub-frontend
```

### **2. Install Dependencies**

```bash
npm install
```

Installs: Next.js, React, TypeScript, Tailwind CSS, Material-UI, Zustand, Axios, etc.

### **3. Create Environment File**

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

> **Important:** For production, change to your backend URL (e.g., `https://your-backend.railway.app`)

### **4. Verify Backend is Running**

```bash
curl http://localhost:3001/health
# Should return: {"status":"ok"}
```

If error, start backend first:
```bash
cd ../timehub-backend
npm run dev
```

### **5. Start Development Server**

```bash
npm run dev
```

You should see:
```
  ▲ Next.js 16.1.3
  - Local:        http://localhost:3000
```

✅ **Frontend is ready!** Open `http://localhost:3000`

---

## Verify Installation

### Test 1: Access Homepage
- Open `http://localhost:3000`
- Should see TimeHub homepage

### Test 2: Login as Admin
```
URL: http://localhost:3000/admin
Email: admin@timehub.com
Password: admin123
```

Should show admin dashboard with statistics.

### Test 3: Login as Client
```
URL: http://localhost:3000/client
Email: cliente@timehub.com
Password: cliente123
```

Should show client interface for booking appointments.

### Test 4: Create Appointment
1. Login as Admin
2. Go to "Appointments"
3. Click "New Appointment"
4. Select client and room
5. Choose available time slot
6. Save

Should show appointment in list.

---

## Stopping the Server

```bash
# In the terminal running npm run dev, press:
Ctrl + C
```

## Restarting

```bash
npm run dev
```

---

## Troubleshooting

### Error: Port 3000 in use

```bash
# Use different port
npm run dev -- -p 3002

# Or kill process using port 3000
lsof -i :3000
kill -9 <PID>
```

### Error: Cannot connect to API

```bash
# Verify backend is running
curl http://localhost:3001/health

# If not running, start it:
cd ../timehub-backend
npm run dev

# Update .env.local if backend is on different URL:
NEXT_PUBLIC_API_URL=http://backend-url:3001
```

### Error: Module not found

```bash
# Clear and reinstall
rm -rf node_modules .next package-lock.json
npm install
npm run dev
```

### Error: CORS error when calling API

```bash
# Make sure .env.local has correct backend URL:
NEXT_PUBLIC_API_URL=http://localhost:3001

# And backend has correct CORS origin in .env:
CORS_ORIGIN=http://localhost:3000
```

### Login fails

```bash
# Clear browser localStorage and try again
# In browser console: localStorage.clear()

# Or use Incognito/Private window
```

### Build fails

```bash
# Clear Next.js cache
rm -rf .next

# Rebuild
npm run build
```

---

## Development Workflow

### **Hot Reload**

Server automatically reloads when you change files. Just edit and save!

### **Build for Production**

```bash
npm run build
```

Creates optimized `.next/` folder.

### **Test Production Build**

```bash
npm start
```

Runs the production-optimized build locally.

---

## Deploying to Vercel

### **1. Push to GitHub**

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### **2. Deploy to Vercel**

Option A: Via Dashboard
1. Go to https://vercel.com/dashboard
2. Click "Add New" → "Project"
3. Select your `timehub-frontend` repository
4. Set environment variable:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend.railway.app
   ```
5. Click "Deploy"

Option B: Via CLI
```bash
npm i -g vercel
vercel
```

### **3. Verify Deployment**

Your app should be live at:
```
https://your-project.vercel.app
```

---

## Common Commands

```bash
# Development
npm run dev              # Start dev server

# Build
npm run build            # Build for production
npm start                # Run production build

# Linting
npm run lint             # Run ESLint

# Utilities
npm list                 # Show installed packages
npm outdated            # Check for updates
npm cache clean --force # Clear cache
```

---

## Project Structure

```
app/
├── (private)/           # Protected routes (need login)
│   ├── agendamentos/   # Appointments page
│   ├── clientes/       # Clients page
│   └── logs/           # Logs page
└── (public)/           # Public routes
    ├── admin/          # Admin login
    └── client/         # Client login

features/               # Feature modules (self-contained)
├── agendamentos/      # Appointments feature
├── clientes/          # Clients feature
├── logs/              # Logs feature
└── rooms/             # Rooms feature

shared/                # Shared across features
├── api/              # Axios configuration
├── auth/             # Authentication logic
├── components/       # Reusable components
├── guards/           # Route protection
├── stores/           # Zustand state
└── ui/               # UI components
```

---

## Next Steps

1. ✅ Frontend installed and running
2. 📖 Read [README.md](./README.md) for feature overview
3. 🔗 Set up [Backend](https://github.com/seu-usuario/timehub-backend)
4. 🚀 Deploy when ready

---

**Frontend is ready! 🚀**

Next: Make sure backend is running, then start building!
