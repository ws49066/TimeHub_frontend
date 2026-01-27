import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { RoomFormData, roomSchema } from "../schemas/room.schema"
import { useRoomsStore } from "../stores/room.store"
import { IRoomList } from "../types/room.types"
import { Input } from "../../../shared/ui/Input"
import { Select } from "../../../shared/ui/Select"

type RoomFormProps = {
  onCancel: () => void
}

export function RoomForm({ onCancel }: RoomFormProps) {
  const { createRoom, fetchRooms } = useRoomsStore()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<RoomFormData>({
    resolver: zodResolver(roomSchema),
    mode: "onChange",
  })

  async function onSubmit(data: RoomFormData) {
    const [start_time, end_time] = data.timeRange.split(' - ')

    const payload: IRoomList = {
      rooms: [
        {
          room: data.room,
          start_time,
          end_time,
          hour_block: Number(data.hourBlock),
        },
      ],
    }

    await createRoom(payload)
    await fetchRooms()
    reset()
    onCancel()
  }


  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col h-full"
    >

      <div className="flex-1 space-y-4 overflow-y-auto">
        <Input
          label="Nome da sala"
          {...register("room")}
          error={errors.room?.message}
        />

        <Input
          label="Horário"
          placeholder="08:00 - 18:00"
          {...register("timeRange")}
          error={errors.timeRange?.message}
        />


        <Select
          label="Intervalo"
          options={[
            { value: "30", label: "30 minutos" },
            { value: "60", label: "60 minutos" },
          ]}
          error={errors.hourBlock?.message}
          {...register("hourBlock")}
        />
      </div>

      {/* FOOTER — FIXO NO FINAL */}
      <div className="border-t border-[#D7D7D7] px-5 py-4 space-y-3">
        <button
          disabled={!isValid}
          type="submit"
          className="
            w-full
            h-11
            bg-black
            text-white
            rounded-[5px]
            font-semibold
            disabled:bg-[#D5D5D5]
            disabled:cursor-not-allowed
          "
        >
          Salvar
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="
            w-full
            h-11
            bg-[#FF3B3B]
            text-white
            rounded-[5px]
            font-semibold
            hover:bg-[#E63232]
          "
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}

