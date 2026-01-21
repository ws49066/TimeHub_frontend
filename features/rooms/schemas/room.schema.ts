// features/rooms/room.schema.ts
import { z } from 'zod'

export const roomSchema = z.object({
  room: z.string().min(1, 'Nome da sala é obrigatório'),
  startTime: z.string().regex(/^\d{2}:\d{2}$/, 'Horário inválido'),
  endTime: z.string().regex(/^\d{2}:\d{2}$/, 'Horário inválido'),
  hourBlock: z.enum(['30', '60'], {
  message: 'Bloco inválido'})
}).refine(
  (data) => data.startTime < data.endTime,
  {
    message: 'Horário final deve ser maior que o inicial',
    path: ['endTime'],
  }
)

export type RoomFormData = z.infer<typeof roomSchema>
