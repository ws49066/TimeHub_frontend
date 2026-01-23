export interface IPermissions {
  create_appointment: boolean
  view_logs: boolean
  access_system: boolean
}

export type User = {
  id: number
  email: string
  role: 'admin' | 'client'
  permissions: IPermissions
  nome: string
  sobrenome: string
}

export type LoginResponse = {
  message: string
  data: {
    nome: string
    sobrenome: string
    email: string
    token: string
  }
}
