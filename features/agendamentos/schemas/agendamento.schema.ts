// features/rooms/room.schema.ts
import { z } from 'zod'

export const agendamentoSchema = z.object({
  roomId: z.string().min(1, 'Sala é obrigatório'),
  date: z.string().min(1, 'Sala é obrigatório'),
  hour: z.string().regex(/^\d{2}:\d{2}$/, 'Horário inválido'),
})


export type AgendamentoFormData = z.infer<typeof agendamentoSchema>
