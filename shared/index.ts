// Shared module exports
// This file provides a centralized way to import shared utilities

// API
export * from './api/axios'

// Auth
export * from './auth'

// Components
export { MainLayout } from './components/Layout/MainLayout'
export { Header } from './components/Header'
export { Logo } from './components/Logo'
export { Menu } from './components/Menu/Menu'
export { MobileSidebar as MobileMenu } from './components/Menu/MobileMenu'
export { TableClients } from './components/TableClients'
export { TableLogs } from './components/TableLogs'
export { TableSchedule } from './components/TableSchedule'

// Guards
export { PagePermissionGuard } from './guards/PagePermission'

// Services
export * from './services/cep.service'

// Stores
export { useAuthStore } from './stores/auth.store'

// UI Components
export { Input } from './ui/Input'
export { Select } from './ui/Select'
export { TimeInput } from './ui/TimeInput'
export * from './ui/Modal'

// Utils
export * from './utils'

