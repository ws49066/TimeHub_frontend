export type IAgendamento = {
  id: number
  clientId: string | number
  roomId: string | number
  date: string
  hour: string
  status: string
  createdAt: string
  updatedAt: string
  room: {
    id: number 
    room: string
  }
  client: {
    id: number
    nome: string
    sobrenome: string
  }
}

export type ICreateAgendamento = {
  roomId: string
  date: string
  hour: string
}

export type IUpdateState = {
  id: string
  status: "canceled" | "confirmed"
}

export type AgendamentoFilters = {
  id: string | number
  data_hora: string
  cliente_nome: string
  sala: string
  status: string
}
