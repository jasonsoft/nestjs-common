import { Expose, Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Operator, Order } from '../enums';

/**
 * Query conditions
 * Added by Jason.Song on 2021/05/14 20:43:03
 */
export class ConditionsDto {
  /** Where condition for WHERE in sql */
  @Expose()
  @IsOptional()
  @IsArray()
  @Type(() => WhereCondition)
  @ValidateNested({ each: true })
  where: WhereCondition[];

  /** order condition for ORDER BY in sql */
  @Expose()
  @IsOptional()
  @IsObject()
  @Type(() => OrderByCondition)
  @ValidateNested()
  by?: Partial<OrderByCondition>;

  constructor() {
    this.where = [];
  }
}

/**
 * order condition for ORDER BY in sql
 * Added by Jason.Song on 2021/10/21 20:01:34
 */
export class OrderByCondition {
  @Expose()
  @IsNotEmpty()
  sort!: string;

  /** Ascending or descending order: ASC | DESC */
  @Expose()
  @IsOptional()
  @IsIn(Object.values(Order))
  order?: Order;
}

export type ConditionValue = string | number | boolean | string[] | number[];

/**
 * Where condition for WHERE in sql
 * Added by Jason.Song on 2021/05/13 15:28:41
 */
export class WhereCondition {
  @Expose()
  @IsNotEmpty()
  field!: string;

  @Expose()
  @IsNotEmpty()
  value!: ConditionValue;

  @Expose()
  @IsOptional()
  @IsEnum(Operator)
  op: Operator = Operator.Equal;
}
