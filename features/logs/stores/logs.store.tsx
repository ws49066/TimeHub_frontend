import { create } from 'zustand'
import { ILog } from '../types/log.types'

type Filters = {
    search: string
    modulo: string
    date: string | null
}

type LogsStore = {
    logs: ILog[]
    filters: Filters
    page: number
    pageSize: number

    setLogs: (logs: ILog[]) => void
    setFilters: (filters: Partial<Filters>) => void
    setPage: (page: number) => void
}

export const useLogsStore = create<LogsStore>((set) => ({
    logs: [],
    page: 1,
    pageSize: 10,

    filters: {
        search: '',
        modulo: '',
        date: null,
    },

    setLogs: (logs) => set({ logs }),
    setFilters: (filters) =>
        set((state) => ({
            filters: { ...state.filters, ...filters },
            page: 1
        })),

    setPage: (page) => set({ page }),
}))
