
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { RoomFormData, roomSchema } from '../schemas/room.schema'
import { useRoomsStore } from '../stores/room.store'
import { IRoomList } from '../types/room.types'
import { Input } from '../../../shared/ui/Input'

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
    mode: 'onChange'
  })


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function onSubmit(data: RoomFormData) {
    const rooms: IRoomList = {
      rooms: [{
        room: data.room,
        start_time: data.startTime,
        end_time: data.endTime,
        hour_block: +data.hourBlock
      }]
    }

    await createRoom(rooms)
    await fetchRooms()
    onCancel()
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rounded p-3 space-y-2">
      <Input
        label='Nome da Sala'
        placeholder="Nome da sala"
        {...register('room')}
        error={errors.room?.message}
      />
      <div className="flex gap-2">
        <Input
          label='Horario Inicio'
          type="time"
          defaultValue={"08:00"}
          {...register('startTime')}
          error={errors.startTime?.message}
        />
        <Input
          type="time"
          label='Horario Final'
          defaultValue={"18:00"}
          {...register('endTime')}
          error={errors.endTime?.message}
        />
      </div>

      <select
        {...register('hourBlock')}
        defaultValue={30}
      >
        <option value={30}>30 minutos</option>
        <option value={60}>60 minutos</option>
      </select>

      <button 
        disabled={!isValid}
        type="submit" 
        className="w-full bg-black text-white mt-2 rounded font-semibold  h-10 text-sm md:h-11 disabled:cursor-not-allowed disabled:bg-[#D5D5D5]">
        Salvar
      </button>

      <button className="text-sm underline" onClick={onCancel}>
        Cancelar
      </button>

    </form>
  )
}

