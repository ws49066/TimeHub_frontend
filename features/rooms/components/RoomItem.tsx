import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { IRoom } from "../types/room.types"
import { RoomFormData, roomSchema } from "../schemas/room.schema"
import { Input } from "../../../shared/ui/Input"
import { Select } from "../../../shared/ui/Select"
import { useEffect } from "react"

type Props = {
  room: IRoom
  onChange: (updated: IRoom, isValid: boolean) => void
}

export function RoomItem({ room, onChange }: Props) {
  const {
    register,
    watch,
    formState: { errors, isValid },
  } = useForm<RoomFormData>({
    resolver: zodResolver(roomSchema),
    mode: "onChange",
    defaultValues: {
      room: room.room,
      timeRange: `${room.start_time} - ${room.end_time}`,
      hourBlock: room.hour_block === 30 ? "30" : "60",
    },
  })

  const values = watch()

  useEffect(() => {
    const [start, end] = values.timeRange?.split(' - ') || [room.start_time, room.end_time]

    onChange(
      {
        ...room,
        room: values.room,
        start_time: start,
        end_time: end,
        hour_block: Number(values.hourBlock),
      },
      isValid
    )
  }, [values, isValid, onChange, room])

  return (
    <div className="pb-4 mb-4 border-b border-[#D7D7D7] space-y-3">
      <Input
        label="Room Name"
        {...register("room")}
        error={errors.room?.message}
      />

      <Input
        label="Time"
        placeholder="08:00 - 18:00"
        {...register("timeRange")}
        error={errors.timeRange?.message}
      />

      <Select
        label="Interval"
        options={[
          { label: "30 minutes", value: "30" },
          { label: "60 minutes", value: "60" },
        ]}
        {...register("hourBlock")}
        error={errors.hourBlock?.message}
      />
    </div>
  )
}
