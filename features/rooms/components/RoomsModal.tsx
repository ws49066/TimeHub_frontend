'use client'

import { Plus, X } from 'lucide-react'
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
    const [roomsValidity, setRoomsValidity] = useState<boolean[]>([])


    useEffect(() => {
        fetchRooms()
        
    }, [fetchRooms])

    useEffect(() => {
        setEditableRooms(rooms)
        setRoomsValidity(rooms.map(() => true)) 
    }, [rooms])


    function handleUpdate(
        index: number,
        updated: IRoom,
        isValid: boolean
    ) {
        setEditableRooms(prev => {
            const current = prev[index]

            // 🔑 evita loop infinito
            const hasChanged =
                current.room !== updated.room ||
                current.start_time !== updated.start_time ||
                current.end_time !== updated.end_time ||
                current.hour_block !== updated.hour_block

            if (!hasChanged) return prev

            const copy = [...prev]
            copy[index] = updated
            return copy
        })

        setRoomsValidity(prev => {
            if (prev[index] === isValid) return prev

            const copy = [...prev]
            copy[index] = isValid
            return copy
        })

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
            onClose()
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const isFormValid =
        roomsValidity.length === editableRooms.length &&
        roomsValidity.every(Boolean)


    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
            <div
                className="
          bg-white
          w-full
          max-w-[375px]
          h-[500px]
          rounded-[5px]
          border border-[#D7D7D7]
          flex flex-col
        "
            >
                {/* Header */}
                <div className="flex justify-between items-center px-5 py-4 border-b border-[#D7D7D7]">
                    <h2 className="text-base font-semibold">
                        {isCreatingRoom ? 'Add new Room' : 'Room Settings'}
                    </h2>
                    <button onClick={onClose}>
                        <X size={18} />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
                    {isCreatingRoom ? (
                        <RoomForm onCancel={() => setIsCreatingRoom(false)} />
                    ) : (
                        <>
                            {editableRooms.map((room, index) => (
                                <RoomItem
                                    key={room.id}
                                    room={room}
                                    onChange={(updated, isValid) =>
                                        handleUpdate(index, updated, isValid)
                                    }
                                />
                            ))}


                            <button
                                type="button"
                                onClick={() => setIsCreatingRoom(true)}
                                className="text-[16px] font-medium underline flex justify-center items-center gap-2 mt-2"
                            >
                                <Plus width={20} height={20}/> <span>Add new room</span>
                            </button>
                        </>
                    )}
                </div>

                {/* Footer */}
                {!isCreatingRoom && (
                    <div className="border-t border-[#D7D7D7] px-5 py-4 shadow-[0px_0px_13px_0px_#000000]">
                        <button
                            onClick={handleSave}
                            disabled={!isFormValid || loading}
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
                            {loading ? 'Saving...' : 'Save Settings'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
