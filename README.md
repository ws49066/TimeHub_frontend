# TimeHub Frontend

Sistema de gerenciamento de agendamentos desenvolvido com Next.js 16, TypeScript e React.

## 🚀 Tecnologias

- **Next.js 16** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **React 19** - Biblioteca UI
- **Zustand** - Gerenciamento de estado
- **React Hook Form** - Formulários
- **Zod** - Validação de schemas
- **Axios** - Cliente HTTP
- **Material-UI** - Componentes UI
- **Tailwind CSS** - Estilização
- **PWA** - Progressive Web App

## 📁 Estrutura do Projeto

O projeto segue uma arquitetura modular e escalável, organizada por features:

```
timehub-frontend/
├── app/                          # Next.js App Router
│   ├── (private)/               # Rotas privadas (requerem autenticação)
│   │   ├── account/            # Página de conta do usuário
│   │   ├── agendamentos/       # Página de agendamentos
│   │   ├── clientes/           # Página de clientes
│   │   └── logs/               # Página de logs
│   ├── (public)/               # Rotas públicas
│   │   ├── admin/             # Área administrativa
│   │   └── client/            # Área do cliente
│   ├── layout.tsx              # Layout raiz
│   └── page.tsx                # Página inicial
│
├── features/                    # Features do domínio (Feature-based architecture)
│   ├── agendamentos/           # Feature: Agendamentos
│   │   ├── components/        # Componentes específicos da feature
│   │   ├── services/          # Serviços de API
│   │   ├── stores/            # Estado global (Zustand)
│   │   ├── types/             # Tipos TypeScript
│   │   ├── schemas/           # Schemas de validação (Zod)
│   │   ├── utils/             # Funções utilitárias
│   │   └── index.ts           # Barrel exports
│   ├── clientes/              # Feature: Clientes
│   ├── logs/                  # Feature: Logs
│   └── rooms/                 # Feature: Salas
│
├── shared/                      # Código compartilhado
│   ├── api/                   # Configuração de API (Axios)
│   ├── auth/                  # Autenticação e autorização
│   ├── components/            # Componentes reutilizáveis
│   │   ├── Layout/           # Layouts
│   │   ├── Menu/            # Menu de navegação
│   │   └── icons/           # Ícones customizados
│   ├── guards/               # Guards de proteção de rotas
│   ├── hooks/                # Custom hooks
│   ├── services/             # Serviços compartilhados
│   ├── stores/               # Stores globais (ex: auth)
│   ├── types/                # Tipos compartilhados
│   ├── ui/                   # Componentes UI base
│   ├── utils/                # Utilitários compartilhados
│   ├── constants/            # Constantes da aplicação
│   └── index.ts              # Barrel exports
│
├── public/                     # Arquivos estáticos
│   ├── icons/                # Ícones
│   └── manifest.json         # PWA manifest
│
└── [config files]            # Configurações (tsconfig, next.config, etc.)
```

## 🏗️ Arquitetura

### Feature-Based Architecture

O projeto utiliza uma arquitetura baseada em features, onde cada feature é auto-contida e inclui:

- **Components**: Componentes React específicos da feature
- **Services**: Lógica de comunicação com API
- **Stores**: Estado gerenciado com Zustand
- **Types**: Definições TypeScript
- **Schemas**: Validações com Zod
- **Utils**: Funções auxiliares
- **index.ts**: Barrel exports para facilitar imports

### Shared Module

O módulo `shared` contém código reutilizável em toda a aplicação:

- **API**: Configuração centralizada do Axios
- **Auth**: Lógica de autenticação e tokens
- **Components**: Componentes UI reutilizáveis
- **Guards**: Proteção de rotas baseada em permissões
- **Services**: Serviços compartilhados (ex: CEP)
- **Stores**: Estado global (autenticação)
- **UI**: Componentes base (Input, Select, Modal, etc.)

## 📦 Como Usar

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
