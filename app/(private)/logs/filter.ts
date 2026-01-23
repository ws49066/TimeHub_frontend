import { ILog } from "../../../shared/components/TableLogs"


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function filterLogs(logs: ILog[], filters: any) {
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