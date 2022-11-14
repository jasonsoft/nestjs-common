import { IsNotEmpty, IsString } from 'class-validator';

/**
 * String ID DTO
 * Added by Jason.Song on 2022/11/14 16:07:39
 */
export class IdStringDto {
  @IsString()
  @IsNotEmpty()
  id!: string;
}
