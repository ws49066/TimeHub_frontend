import { create } from 'zustand'
import { IClientProps } from './page'

type Filters = {
    search: string
    modulo: string
    date: string | null
}

type ClientsStore = {
    clients: IClientProps[]
    filters: Filters
    page: number
    pageSize: number

    setLogs: (clients: IClientProps[]) => void
    setFilters: (filters: Partial<Filters>) => void
    setPage: (page: number) => void

}

export const useClientStore = create<ClientsStore>((set) => ({
    clients: [],
    page: 1,
    pageSize: 10,

    filters: {
        search: '',
        modulo: '',
        date: null,
    },

    setLogs: (clients) => set({ clients }),
    setFilters: (filters) =>
        set((state) => ({
            filters: { ...state.filters, ...filters },
            page: 1
        })),

    setPage: (page) => set({ page }),
}))
