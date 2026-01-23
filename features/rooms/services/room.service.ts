

import { api } from '../../../shared/api/axios'
import { IRoomList } from '../types/room.types'

export const roomService = {
  getRooms: async () => {
    const {data}  = await api.get('/administrator/rooms')
    return data
  },

  createRoom: async (payload: IRoomList) => {
    return api.post('/administrator/createRoom', payload)
  },

  updateRoom: async (payload: IRoomList) => {
    return api.put('/administrator/editRoom', payload)
  },
}
