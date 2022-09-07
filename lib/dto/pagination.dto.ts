import { Expose } from 'class-transformer';
import { IsNumberString, IsOptional } from 'class-validator';

/**
 * 分页DTO
 * Added by Jason.Song on 2021/05/08 17:57:28
 */
export class PaginationDto {
  /**
   * 当前第几页，默认为 1
   */
  @Expose()
  @IsNumberString()
  @IsOptional()
  page: string | number = '1';

  /**
   * 显示记录数，默认为 20
   */
  @Expose()
  @IsNumberString()
  @IsOptional()
  limit: string | number = '20';

  /**
   * 默认最大限制200条记录
   */
  maxLimit = 200;
}
