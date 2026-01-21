export type IAgendamento = {
  roomId: string
  date: string
  hour: string
}

export type IUpdateState = {
    id: string,
    status: "canceled" | "confirmed"
}