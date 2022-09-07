import { Expose, Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { AndOr, Operator, Order } from '../enums';

/**
 * 查询条件
 * Added by Jason.Song on 2021/05/14 20:43:03
 */
export class ConditionsDto {
  /**
   * 查询连接条件
   */
  @Expose()
  @IsOptional()
  @IsEnum(AndOr)
  join: AndOr = AndOr.And;

  /**
   * Where 查询条件
   */
  @Expose()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => WhereDto)
  @IsArray()
  where: WhereDto[] = [];

  /**
   * 排序
   */
  @Expose()
  @IsOptional()
  @ValidateNested()
  by: OrderDto | undefined;
}

/**
 * 排序
 * Added by Jason.Song on 2021/10/21 20:01:34
 */
export class OrderDto {
  /** 排序字段 */
  @Expose()
  @IsNotEmpty()
  sort!: string;
  /** 排序方式： 升序 | 降序 */

  @Expose()
  @IsOptional()
  @IsEnum(Order)
  order?: Order;
}

/**
 * Where 查询条件
 * Added by Jason.Song on 2021/05/13 15:28:41
 */
export class WhereDto {
  @Expose()
  @IsNotEmpty()
  field!: string;

  @Expose()
  @IsNotEmpty()
  value!: string | number | boolean | string[] | number[];

  @Expose()
  @IsOptional()
  @IsEnum(Operator)
  op: Operator = Operator.Equal;
}
