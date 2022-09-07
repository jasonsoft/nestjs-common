import { PaginatedResultDto } from '../dto';

/**
 * Create paginated results DTO
 * Added by Jason.Song (成长的小猪) on 2022/08/30 12:18:00
 */
export function createPaginatedResultsDto<T>({
  items,
  totalItems,
  limit,
  page,
}: {
  items: T[];
  totalItems?: number;
  limit: number;
  page: number;
}): PaginatedResultDto<T> {
  const totalPages =
    totalItems !== undefined ? Math.ceil(totalItems / limit) : undefined;
  return {
    items,
    itemCount: items.length,
    limit,
    page,
    total: totalItems,
    totalItems,
    totalPages,
  };
}
