import { create } from 'zustand'
import { IRoom, IRoomList } from '../types/room.types'
import { roomService } from '../services/room.service'

type RoomState = {
  rooms: IRoom[]
  loading: boolean
  createRoom: (data: IRoomList) => Promise<void>
  updateRoom: (data: IRoomList) => Promise<void>
  fetchRooms: () => Promise<void>
}

export const useRoomsStore = create<RoomState>((set) => ({
  rooms: [],
  loading: false,

  fetchRooms: async () => {
    set({ loading: true })
    const data = await roomService.getRooms()
    set({ rooms: data.data.rooms, loading: false })
  },
  createRoom: async (payload: IRoomList) => {
    await roomService.createRoom(payload)
  },

  updateRoom: async (payload: IRoomList) => {
    await roomService.updateRoom(payload)
  },
}))


