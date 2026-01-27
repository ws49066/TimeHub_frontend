import { AgendamentoFilters } from '../types/agendamento.types'

type FilterParams = {
  search: string
  room?: string
  date?: string | null
}

export function filterAgendamento(agendamentos: AgendamentoFilters[], filters: FilterParams) {
  return agendamentos.filter((agendamento) => {
    const searchMatch =
      agendamento.cliente_nome?.toLowerCase().includes(filters.search.toLowerCase()) 

    const roomMatch = filters.room
      ? agendamento.sala === filters.room
      : true

    const dateMatch = filters.date
      ? new Date(agendamento.sala).toISOString().slice(0, 10) === filters.date
      : true

    return searchMatch && roomMatch && dateMatch
  })
}
