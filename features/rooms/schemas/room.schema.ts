// features/rooms/room.schema.ts
import { z } from 'zod'

export const roomSchema = z.object({
  room: z.string().min(1, 'Room name is required'),
  timeRange: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d) - ([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid format. Use HH:MM - HH:MM')
    .refine((val) => {
      const [start, end] = val.split(' - ')
      return start < end
    }, {
      message: 'End time must be later than start time'
    }),
  hourBlock: z.enum(['30', '60'], { message: 'Invalid block' }),
})

export type RoomFormData = z.infer<typeof roomSchema>
