import { IsNotEmpty, IsNumber } from 'class-validator';

/**
 * Digital ID DTO
 * Added by Jason.Song (成长的小猪) on 2022/11/14 16:01:55
 */
export class IdNumberDto {
  @IsNumber()
  @IsNotEmpty()
  id!: number;
}
