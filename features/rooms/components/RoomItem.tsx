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
    setValue,
    trigger,
    formState: { errors, isValid },
  } = useForm<RoomFormData>({
    resolver: zodResolver(roomSchema),
    mode: "onChange",
    defaultValues: {
      room: room.room,
      startTime: room.start_time,
      endTime: room.end_time,
       hourBlock: room.hour_block === 30 ? "30" : "60",
    },
  })

  const values = watch()

  // 🔑 sincroniza com o pai SEM loop
  useEffect(() => {
    onChange(
      {
        ...room,
        room: values.room,
        start_time: values.startTime,
        end_time: values.endTime,
        hour_block: Number(values.hourBlock),
      },
      isValid
    )
  }, [values, isValid]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="pb-4 mb-4 border-b border-[#D7D7D7] space-y-3">
      <Input
        label="Nome da sala"
        {...register("room")}
        error={errors.room?.message}
      />

      <div className="flex gap-3">
        <Input
          label="Início"
          type="time"
          {...register("startTime")}
          error={errors.startTime?.message}
        />

        <Input
          label="Fim"
          type="time"
          {...register("endTime")}
          error={errors.endTime?.message}
        />
      </div>

      <Select
        label="Intervalo"
        options={[
          { label: "30 minutos", value: "30" },
          { label: "60 minutos", value: "60" },
        ]}
        {...register("hourBlock")}
        error={errors.hourBlock?.message}
      />
    </div>
  )
}
