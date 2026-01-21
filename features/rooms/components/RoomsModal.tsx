'use client'

import { X } from 'lucide-react'
import { useRoomsStore } from '../stores/room.store'
import { useEffect, useState } from 'react'
import { IRoom } from '../types/room.types'
import { RoomItem } from './RoomItem'
import { RoomForm } from './RoomForm'

export function RoomsModal({ onClose }: { onClose: () => void }) {
    const { rooms, fetchRooms, updateRoom } = useRoomsStore()
    const [editableRooms, setEditableRooms] = useState<IRoom[]>([])
    const [isCreatingRoom, setIsCreatingRoom] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchRooms()
    }, [fetchRooms])

    useEffect(() => {
        setEditableRooms(rooms)
    }, [rooms])

    function handleUpdate(index: number, updated: IRoom) {
        const copy = [...editableRooms]
        copy[index] = updated
        setEditableRooms(copy)
    }

    async function handleSave() {
        try {
            setLoading(true)

            const payload = {
                rooms: editableRooms.map(room => ({
                    id: room.id,
                    room: room.room,
                    start_time: room.start_time,
                    end_time: room.end_time,
                    hour_block: room.hour_block,
                })),
            }

            await updateRoom(payload)
            setLoading(true)

            onClose()
        } catch (err) {
            console.error('Erro ao salvar salas', err)
        } finally {
            setLoading(false)
        }
    }


    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white flex flex-col w-full max-w-md h-9/12 rounded-xl shadow-lg">

                {/* Header */}
                <div className="flex justify-between items-center px-6 py-4 border-b">
                    <h2 className="text-base font-semibold">
                        {isCreatingRoom ? "Adicionar nova Sala" : "Ajustes de agendamento"}
                        
                    </h2>
                    <button onClick={onClose}>
                        <X size={18} />
                    </button>
                </div>

                {/* Body */}
                <div className="px-6 py-4 space-y-4 h-9/12 flex-1 overflow-y-auto bor">


                    {isCreatingRoom ?
                        (<RoomForm onCancel={() => setIsCreatingRoom(false)} />) :
                        <>
                            {
                                editableRooms.map((room, index) => (

                                    <RoomItem
                                        key={room.id}
                                        room={room}
                                        onChange={(updated) => handleUpdate(index, updated)}
                                    />



                                ))

                            }
                            <button
                                type="button"
                                onClick={() => setIsCreatingRoom(true)}
                                className="text-sm underline mt-4"
                            >
                                + Criar nova sala
                            </button>
                        </>
                    }



                </div>

                <div className='flex border-t justify-center p-4'>

                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="w-81.5 bg-black text-white h-11 rounded"
                    >
                        {loading ? 'Salvando...' : 'Salvar ajustes'}
                    </button>
                </div>
            </div>
        </div>
    )
}
