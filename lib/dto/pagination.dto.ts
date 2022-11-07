import { Expose } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';

/**
 * 分页DTO
 * Added by Jason.Song on 2021/05/08 17:57:28
 */
export class PaginationDto {
  /**
   * 当前第几页，默认为 1
   */
  @Expose()
  @IsPositive()
  @IsNumber()
  @IsOptional()
  page = 1;

  /**
   * 显示记录数，默认为 20
   */
  @Expose()
  @IsPositive()
  @IsNumber()
  @IsOptional()
  limit = 20;

  /**
   * 默认最大限制200条记录
   */
  maxLimit = 200;
}
