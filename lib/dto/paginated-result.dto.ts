import { Expose } from 'class-transformer';

/**
 * 分页返回结果DTO
 * Added by Jason.Song on 2021/05/08 18:20:01
 */
export class PaginatedResultDto<T = any> {
  /**
   * An array of SomeEntity
   */
  @Expose()
  items!: T[];
  /**
   *
   */
  @Expose()
  itemCount!: number;
  /**
   *
   */
  @Expose()
  limit!: number;
  /**
   *
   */
  @Expose()
  page!: number;
  /**
   * This property is deprecated, please replace with "totalItems"
   */
  @Expose()
  total?: number;
  /**
   *
   */
  @Expose()
  totalItems?: number;
  /**
   *
   */
  @Expose()
  totalPages?: number;
}
