
import { create } from 'zustand'
import { IAgendamento } from './page'
import { agendamentoService } from '../../../features/agendamentos/services/agendamento.service'

type Filters = {
    search: string
    modulo: string
    date: string | null
}

type AgendamentosStore = {
    agendamentos: IAgendamento[]
    filters: Filters
    page: number
    pageSize: number
    loading: boolean

    setAgendamentos: (agendamnetos: IAgendamento[]) => void
    setFilters: (filters: Partial<Filters>) => void
    setPage: (page: number) => void
    fetchAgendamento: () => Promise<void>
}

export const useAgendamentosStore = create<AgendamentosStore>((set) => ({
    agendamentos: [],
    page: 1,
    pageSize: 10,
    loading: false,

    filters: {
        search: '',
        modulo: '',
        date: null,
    },

    setAgendamentos: (agendamentos) => set({ agendamentos }),

    setFilters: (filters) =>
        set((state) => ({
            filters: { ...state.filters, ...filters },
            page: 1
        })),

    setPage: (page) => set({ page }),

    fetchAgendamento: async () => {
        set({ loading: true })
        const data = await agendamentoService.fetchAgendamento()
        set({ agendamentos: data.data.data.allScheduling, loading: false })
    }

}))


// import { create } from 'zustand'
// import { IRoom, IRoomList } from '../types/room.types'
// import { roomService } from '../services/room.service'

// type RoomState = {
//     rooms: IRoom[]
//     loading: boolean
//     createRoom: (data: IRoomList) => Promise<void>
//     updateRoom: (data: IRoomList) => Promise<void>
//     fetchRooms: () => Promise<void>
// }

// export const useRoomsStore = create<RoomState>((set) => ({
//     rooms: [],
//     loading: false,

//     fetchRooms: async () => {
//         set({ loading: true })
//         const data = await roomService.getRooms()
//         set({ rooms: data.data.rooms, loading: false })
//     },
//     createRoom: async (payload: IRoomList) => {
//         await roomService.createRoom(payload)
//     },

//     updateRoom: async (payload: IRoomList) => {
//         await roomService.updateRoom(payload)
//     },
// }))


