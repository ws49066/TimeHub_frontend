import { IClientProps } from "./page"


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function filterClients(clients: IClientProps[], filters: any) {
  return clients.filter((client) => {
    const searchMatch =
      client.client?.nome.toLowerCase().includes(filters.search.toLowerCase()) 

    const dateMatch = filters.date
      ? new Date(client.client.createdAt).toISOString().slice(0, 10) === filters.date
      : true

    return searchMatch && dateMatch
  })
}