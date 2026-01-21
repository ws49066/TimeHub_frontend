import { useForm } from "react-hook-form"
import { IRoom } from "../types/room.types"
import { zodResolver } from "@hookform/resolvers/zod"
import { RoomFormData, roomSchema } from "../schemas/room.schema"

type Props = {
  room: IRoom
  onChange: (updated: IRoom) => void
}

export function RoomItem({ room, onChange }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RoomFormData>({
    resolver: zodResolver(roomSchema),
    mode: 'onChange'
  })
  return (
    <div className="border rounded p-3 space-y-2">
      <input
        value={room.room}
        onChange={(e) => onChange({ ...room, room: e.target.value })}
        className="w-full border p-2 rounded"
      />

      <div className="flex gap-2">
        <input
          type="time"
          value={room.start_time}
          onChange={(e) => onChange({ ...room, start_time: e.target.value })}
        />
        <input
          type="time"
          value={room.end_time}
          onChange={(e) => onChange({ ...room, end_time: e.target.value })}
        />
      </div>

      <select
        value={room.hour_block}
        onChange={(e) =>
          onChange({ ...room, hour_block: Number(e.target.value) })
        }
      >
        <option value={30}>30 minutos</option>
        <option value={60}>60 minutos</option>
      </select>
    </div>
  )
}
