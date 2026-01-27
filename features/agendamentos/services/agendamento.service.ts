
import { api } from '../../../shared/api/axios'
import { ICreateAgendamento, IUpdateState } from '../types/agendamento.types'



export const agendamentoService = {

  createAgendamento: async (payload: ICreateAgendamento) => {
    return await api.post('/scheduling', payload)
  },

  updatedState: async(payload: IUpdateState) => {
    return await api.put("/scheduling", payload)
  },

  fetchAgendamento: async() => {
    return await api.get("/scheduling")
  }

}
