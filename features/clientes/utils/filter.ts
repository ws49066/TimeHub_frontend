import { IClientProps } from '../types/cliente.types'

type FilterParams = {
  search: string
  date?: string | null
}

export function filterClients(clients: IClientProps[], filters: FilterParams) {
  return clients.filter((client) => {
    const searchMatch =
      client.client?.nome.toLowerCase().includes(filters.search.toLowerCase()) 

    const dateMatch = filters.date
      ? new Date(client.client.createdAt).toISOString().slice(0, 10) === filters.date
      : true

    return searchMatch && dateMatch
  })
}
