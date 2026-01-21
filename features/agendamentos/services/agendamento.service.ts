
import { api } from '@/shared/api/axios'
import { IAgendamento, IUpdateState } from '../types/Agendamento.types'


export const agendamentoService = {

  createAgendamento: async (payload: IAgendamento) => {
    return api.post('/scheduling', payload)
  },

  updatedState: async(payload: IUpdateState) => {
    return api.put("/scheduling", payload)
  }

}
