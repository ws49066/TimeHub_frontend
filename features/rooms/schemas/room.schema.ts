// features/rooms/room.schema.ts
import { z } from 'zod'

export const roomSchema = z.object({
  room: z.string().min(1, 'Nome da sala é obrigatório'),
  timeRange: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d) - ([01]\d|2[0-3]):([0-5]\d)$/, 'Formato inválido. Use HH:MM - HH:MM')
    .refine((val) => {
      const [start, end] = val.split(' - ')
      return start < end
    }, {
      message: 'Horário final deve ser maior que o inicial'
    }),
  hourBlock: z.enum(['30', '60'], { message: 'Bloco inválido' }),
})

export type RoomFormData = z.infer<typeof roomSchema>
