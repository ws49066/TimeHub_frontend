
import { api } from '../../../shared/api/axios'
import { IAgendamento, IUpdateState } from '../types/Agendamento.types'


export const agendamentoService = {

  createAgendamento: async (payload: IAgendamento) => {
    return await api.post('/scheduling', payload)
  },

  updatedState: async(payload: IUpdateState) => {
    return await api.put("/scheduling", payload)
  },

  fetchAgendamento: async() => {
    return await api.get("/scheduling")
  }

}
