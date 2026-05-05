import { create } from 'zustand'
import { IAgendamento } from '../types/agendamento.types'
import { agendamentoService } from '../services/agendamento.service'

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
        try {
            const data = await agendamentoService.fetchAgendamento()
            const agendamentos = data.data.data.allScheduling as IAgendamento[]
            set({ agendamentos, loading: false })
            
        } catch (error) {
            console.log("Error fetching schedulings", error)
            set({ agendamentos: [], loading: false })
        }
    }

}))
