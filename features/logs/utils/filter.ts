import { ILog } from '../types/log.types'

type FilterParams = {
  search: string
  module?: string
  date?: string | null
}

export function filterLogs(logs: ILog[], filters: FilterParams) {
  return logs.filter((log) => {
    const searchMatch =
      log.client?.nome.toLowerCase().includes(filters.search.toLowerCase()) ||
      log.action.toLowerCase().includes(filters.search.toLowerCase())

    const moduloMatch = filters.module
      ? log.module === filters.module
      : true

    const dateMatch = filters.date
      ? new Date(log.createdAt).toISOString().slice(0, 10) === filters.date
      : true

    return searchMatch && moduloMatch && dateMatch
  })
}
