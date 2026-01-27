export interface IClientProps {
  id: number
  create_appointment: string
  view_logs: string
  access_system: string
  client: {
    nome: string
    sobrenome: string
    endereco: string
    numero: string
    cidade: string
    estado: string
    bairro: string
    createdAt: string
  }
}

export interface IPayload {
  clientId: number | string
  access_system?: boolean
  view_logs?: boolean
  create_appointment?: boolean
}
