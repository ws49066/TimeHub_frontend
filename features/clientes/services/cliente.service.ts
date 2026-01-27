import { api } from '../../../shared/api/axios'
import { IPayload } from '../types/cliente.types'

export const clientsService = {
  fetchClientsPermissions: async() => {
    return await api.get("/administrator/clients")
  },

  updatedPermission: async(payload: IPayload) => {
    return await api.put("/administrator/editClientPermissions", payload)
  }
}
