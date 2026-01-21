"use client"

import { X } from "lucide-react";
import { agendamentoService } from "../services/agendamento.service";
import { AgendamentoFormData, agendamentoSchema } from "../schemas/agendamento.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/shared/ui/Input";
import { Select } from "@/shared/ui/Select";
import { useEffect, useMemo, useState } from "react";
import { useRoomsStore } from "@/features/rooms/stores/room.store";

export function AgendamentoModal({ onClose }: { onClose: () => void }) {
    const { rooms, fetchRooms } = useRoomsStore()
    const { createAgendamento } = agendamentoService
    const [loading, setLoading] = useState(false)



    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<AgendamentoFormData>({
        resolver: zodResolver(agendamentoSchema),
        mode: 'onChange'
    })

    async function onSubmit(data: AgendamentoFormData) {
        setLoading(true)
        try {
            await createAgendamento(data)
            onClose()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error?.response?.data?.message || "Erro para criar agendamento")

        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchRooms()
    }, [fetchRooms])


    const listRooms = useMemo(() => {
        return rooms.map(room => ({
            value: String(room.id),
            label: room.room,
        }))
    }, [rooms])




    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white flex flex-col w-full max-w-md h-9/12 rounded-xl shadow-lg">
                <form onSubmit={handleSubmit(onSubmit)}>


                    <div className="flex justify-between items-center px-6 py-4 border-b">
                        <h2 className="text-base font-semibold">
                            Novo Agendamento
                        </h2>
                        <button onClick={onClose}>
                            <X size={18} />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="px-6 py-4 space-y-4 h-9/12 flex-1 overflow-y-auto bor">

                        <div className="border rounded p-3 space-y-2">
                            <Input
                                label="Selecione uma data"
                                type="date"
                                placeholder="Selecione uma data"
                                required
                                {...register('date')}
                                error={errors.date?.message}
                            />

                            <Input
                                label="Selecione um horario"
                                type="time"
                                placeholder="Selecione um horario"
                                required
                                {...register('hour')}
                                error={errors.hour?.message}
                            />

                            <Select
                                label="Tipo de atendimento"
                                required
                                options={listRooms}
                                error={errors.roomId?.message}
                                {...register('roomId')}
                            />


                        </div>


                    </div>

                    <div className='flex border-t justify-center p-4'>
                        <button
                            disabled={loading || !isValid}
                            type="submit"
                            className="w-full bg-black text-white mt-2 rounded font-semibold  h-10 text-sm md:h-11 disabled:cursor-not-allowed disabled:bg-[#D5D5D5]">
                            {loading ? 'Confirmando...' : 'Confirmar Agendamento'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}