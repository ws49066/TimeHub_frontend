"use client"

import { X } from "lucide-react";
import { agendamentoService } from "../services/agendamento.service";
import { AgendamentoFormData, agendamentoSchema } from "../schemas/agendamento.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useEffect, useMemo, useState } from "react";
import { useRoomsStore } from "../../rooms/stores/room.store";
import { Input } from "../../../shared/ui/Input";
import { Select } from "../../../shared/ui/Select";
import { useAgendamentosStore } from "../stores/agendamento.store";
import { TimeInput } from "../../../shared/ui/TimeInput";



export function AgendamentoModal({ onClose }: { onClose: () => void }) {
    const { rooms, fetchRooms } = useRoomsStore()
    const { fetchAgendamento } = useAgendamentosStore()
    const { createAgendamento } = agendamentoService
    const [loading, setLoading] = useState(false)



    const {
        register,
        control,
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
            await fetchAgendamento()
            onClose()
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error?.response?.data?.message || "Error creating scheduling")

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
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-3">
            <div
                className="
      bg-white
      w-full
      sm:w-93.75
      sm:h-125
      rounded-[5px]
      border border-[#D7D7D7]
      shadow-lg
      flex
      flex-col
      max-h-[90vh]
    "
            >



                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1" >


                    <div className="flex items-center justify-between px-5 py-4 border-b border-[#D7D7D7]">
                        <h2 className="text-[16px] font-semibold text-black">
                            New Scheduling
                        </h2>

                        <button onClick={onClose}>
                            <X size={18} />
                        </button>
                    </div>


                    {/* Body */}
                    <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
                        <Input
                            label="Select a date"
                            type="date"
                            required
                            {...register('date')}
                            error={errors.date?.message}
                        />

                        <TimeInput
                            label="Select a time"
                            name="hour"
                            control={control}
                            required
                            error={errors.hour?.message}
                        />

                        <Select
                            label="Select a Room"
                            required
                            options={listRooms}
                            error={errors.roomId?.message}
                            {...register('roomId')}
                        />
                    </div>


                    <div className="border-t border-[#D7D7D7] px-5 py-4 shadow-[0px_5px_13px_0px_#000000]">
                        <button
                            type="submit"
                            disabled={loading || !isValid}
                            className="
                            w-full
                            h-11
                            bg-black
                            text-white
                            rounded-[5px]
                            font-semibold
                            text-[16px]
                            disabled:opacity-50
                            disabled:cursor-not-allowed
                            "
                        >
                            {loading ? 'Confirming...' : 'Confirm Scheduling'}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}