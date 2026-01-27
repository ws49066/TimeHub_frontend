import { create } from 'zustand'
import { IClientProps } from '../types/cliente.types'
import { clientsService } from '../services/cliente.service'

type Filters = {
    search: string
    date: string | null
}

type ClientsStore = {
    clients: IClientProps[]
    filters: Filters
    page: number
    pageSize: number
    loading: boolean

    getClients: () => Promise<void>
    setFilters: (filters: Partial<Filters>) => void
    setPage: (page: number) => void
}

export const useClientStore = create<ClientsStore>((set) => ({
    clients: [],
    page: 1,
    pageSize: 10,
    loading: false,

    filters: {
        search: '',
        date: null,
    },

    getClients: async () => {
        set({ loading: true})
        const data = await clientsService.fetchClientsPermissions()
        set({ clients: data.data.data , loading: false})
    },

    setFilters: (filters) =>
        set((state) => ({
            filters: { ...state.filters, ...filters },
            page: 1
        })),

    setPage: (page) => set({ page }),
}))
