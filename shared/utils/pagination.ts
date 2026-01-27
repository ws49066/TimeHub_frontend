/**
 * Paginates an array of items
 * @param items - Array of items to paginate
 * @param page - Current page number (1-indexed)
 * @param pageSize - Number of items per page
 * @returns Paginated array of items
 */
export function paginate<T>(items: T[], page: number, pageSize: number): T[] {
  const start = (page - 1) * pageSize
  const end = start + pageSize
  return items.slice(start, end)
}
