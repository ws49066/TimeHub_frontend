// features/rooms/room.schema.ts
import { z } from 'zod'

export const agendamentoSchema = z.object({
  roomId: z.string().min(1, 'Room is required'),
  date: z.string().min(1, 'Date is required'),
  hour: z.string().regex(/^\d{2}:\d{2}$/, 'Invalid time'),
})


export type AgendamentoFormData = z.infer<typeof agendamentoSchema>
