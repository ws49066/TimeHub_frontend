# TimeHub Frontend

**Appointment scheduling user interface** built with Next.js 16, React 19, and TypeScript.

## 🚀 Quick Start (5 minutes)

```bash
# Clone and install
git clone https://github.com/seu-usuario/timehub-frontend.git
cd timehub-frontend
npm install

# Setup environment
cp .env.example .env.local

# Make sure backend is running on http://localhost:3001

# Start dev server
npm run dev
```

App: `http://localhost:3000`

---

## 📋 Requirements

- Node.js 18+
- npm/yarn
- TimeHub Backend running on port 3001

---

## 🛠 Tech Stack

| Component | Technology |
|-----------|-----------|
| **Framework** | Next.js 16 |
| **React** | React 19 |
| **Language** | TypeScript |
| **UI Components** | Material-UI + Radix-UI |
| **Styling** | Tailwind CSS |
| **State** | Zustand |
| **Forms** | React Hook Form + Zod |
| **HTTP** | Axios |
| **PWA** | next-pwa |

---

## 📁 Project Structure

```
app/                         # Next.js App Router
├── (private)/              # Protected routes
│   ├── agendamentos/       # Appointments page
│   ├── clientes/           # Clients management
│   └── logs/               # System logs
├── (public)/               # Public routes
│   ├── admin/              # Admin login
│   └── client/             # Client login
└── layout.tsx              # Root layout

features/                   # Feature modules
├── agendamentos/          # Appointments feature
├── clientes/              # Clients feature
├── logs/                  # Logs feature
└── rooms/                 # Rooms feature

shared/                    # Shared code
├── api/                  # Axios config
├── auth/                 # Authentication
├── components/           # Reusable components
├── guards/               # Route guards
├── stores/               # Global state (Zustand)
└── ui/                   # UI components
```

---

## ⚙️ Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

For production:
```env
NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app
```

---

## 🎮 Default Test Credentials

| Type | Email | Password |
|------|-------|----------|
| Admin | admin@timehub.com | admin123 |
| Client | cliente@timehub.com | cliente123 |

---

## 📚 Features

### Admin Dashboard
- 📊 Dashboard with statistics
- 👥 Client management (CRUD)
- 🏢 Room management
- 📅 Appointment management
- 🔐 Permission control
- 📝 System logs

### Client Area
- 📅 View available time slots
- ✅ Book appointments
- 📋 Manage own appointments
- ❌ Cancel appointments
- 👤 View profile

---

## 📦 Available Scripts

```bash
npm run dev      # Development server
npm run build    # Build for production
npm start        # Run production build
npm run lint     # Run ESLint
```

---

## 🔌 API Integration

All API calls go through:
- **Base URL:** `NEXT_PUBLIC_API_URL`
- **Auth Header:** `Authorization: Bearer {token}`
- **Token Storage:** localStorage
- **Refresh:** Automatic on 401 response

---

## 🧪 Testing

### Manual Testing Steps

1. **Login as Admin**
   - Go to `http://localhost:3000/admin`
   - Email: `admin@timehub.com`
   - Password: `admin123`

2. **Create Client**
   - Click "Clients"
   - Click "Add Client"
   - Fill form and save

3. **Create Appointment**
   - Click "Appointments"
   - Select client and room
   - Choose available time
   - Save

4. **Test as Client**
   - Go to `http://localhost:3000/client`
   - Email: `cliente@timehub.com`
   - Password: `cliente123`
   - View and create own appointments

---

## 🚀 Production Build

```bash
# Build optimized production bundle
npm run build

# Test production build locally
npm start
```

Deploy to Vercel:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variable:
# NEXT_PUBLIC_API_URL=https://your-backend.railway.app
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 3000 in use | `npm run dev -- -p 3002` |
| API errors | Check if backend is running |
| CORS error | Verify `NEXT_PUBLIC_API_URL` in `.env.local` |
| Build fails | `rm -rf .next node_modules && npm install` |
| Auth fails | Clear localStorage and login again |

---

## 📖 More Info

- [Backend Repository](https://github.com/ws49066/TimeHub_backend)
- [Installation Guide](./INSTALLATION.md)
- [Live Demo](https://timehub-frontend.vercel.app)

---

## 📄 License

ISC License

---

**Start coding! 🚀**

### Instalação

```bash
npm install
```

### Desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

### Build

```bash
npm run build
```

### Produção

```bash
npm start
```

## 🔐 Autenticação

O sistema possui dois tipos de usuários:

- **Admin**: Acesso completo ao sistema
- **Client**: Acesso limitado baseado em permissões

As permissões incluem:
- `access_system`: Acesso ao sistema
- `view_logs`: Visualização de logs
- `create_appointment`: Criação de agendamentos

## 📝 Convenções

### Imports

Use barrel exports quando disponível:

```typescript
// ✅ Bom
import { useAgendamentosStore, IAgendamento } from '@/features/agendamentos'
import { useAuthStore } from '@/shared/stores/auth.store'

// ❌ Evitar
import { useAgendamentosStore } from '@/features/agendamentos/stores/agendamento.store'
```

### Nomenclatura

- **Componentes**: PascalCase (ex: `AgendamentoModal.tsx`)
- **Hooks**: camelCase com prefixo `use` (ex: `useAgendamentosStore`)
- **Utils**: camelCase (ex: `filterAgendamento`)
- **Types**: PascalCase com prefixo `I` para interfaces (ex: `IAgendamento`)
- **Stores**: camelCase com sufixo `Store` (ex: `agendamento.store.ts`)

## 🎯 Próximos Passos

- [ ] Adicionar testes unitários
- [ ] Implementar testes E2E
- [ ] Adicionar documentação de API
- [ ] Melhorar tratamento de erros
- [ ] Adicionar loading states globais
- [ ] Implementar cache de requisições

## 📄 Licença

Este projeto é privado.
