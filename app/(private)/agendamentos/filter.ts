import { IAgendamento } from "./page"



// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function filterAgendamento(agendamentos: IAgendamento[], filters: any) {
  return agendamentos.filter((agendamento) => {
    const searchMatch =
      agendamento.client?.nome.toLowerCase().includes(filters.search.toLowerCase()) ||
       agendamento.client?.sobrenome.toLowerCase().includes(filters.search.toLowerCase())

    const roomMatch = filters.room
      ? agendamento.room.room === filters.room
      : true

    const dateMatch = filters.date
      ? new Date(agendamento.date).toISOString().slice(0, 10) === filters.date
      : true

    return searchMatch && roomMatch && dateMatch
  })
}