
import { api } from '@/shared/api/axios'
import { IPayload } from '@/shared/components/TableClients'


export const clientsService = {

  updatedPermission: async(payload: IPayload) => {
    return api.put("/administrator/editClientPermissions", payload)
  }

}
