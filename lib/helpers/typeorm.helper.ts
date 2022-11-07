import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';
import { ConditionsDto, PaginationDto } from '../dto';
import { AndOr, Operator } from '../enums';
import { convertOperator } from '../utils';

/**
 * TypeORM Helper
 * Added by Jason.Song (成长的小猪) on 2022/03/18 11:50:51
 */
export class TypeOrmHelper {
  /**
   * Build query conditions
   * Added by Jason.Song (成长的小猪) on 2022/03/18 11:54:10
   * @param builder     query builder
   * @param conditions  conditions dto
   * @param pagination  pagination dto
   */
  public static BuildQueryConditions<Entity extends ObjectLiteral>(
    builder: SelectQueryBuilder<Entity>,
    conditions?: ConditionsDto,
    pagination?: PaginationDto,
  ): SelectQueryBuilder<Entity> {
    const alias = builder.alias;
    if (conditions) {
      if (conditions.join === AndOr.And) {
        for (const item of conditions.where) {
          const op = convertOperator(item.op);
          if (!op) continue;
          const whereField = item.field.includes('.')
            ? item.field
            : `${alias}.${item.field}`;
          if (item.op === Operator.Between) {
            if (Array.isArray(item.value) && item.value.length) {
              builder
                .andWhere(`${whereField} ${op} :v1 and :v2`)
                .setParameter('v1', item.value[0])
                .setParameter('v2', item.value[1]);
            }
          } else if (item.op === Operator.Like) {
            builder
              .andWhere(`${whereField} ${op} :${item.field}`)
              .setParameter(item.field, '%' + item.value + '%');
          } else if (item.op === Operator.In) {
            if (Array.isArray(item.value) && item.value.length) {
              builder
                .andWhere(`${whereField} ${op} (:...${item.field})`)
                .setParameter(item.field, item.value);
            }
          } else {
            builder
              .andWhere(`${whereField} ${op} :${item.field}`)
              .setParameter(item.field, item.value);
          }
        }
      }

      if (conditions.by && conditions.by.sort) {
        const sort = conditions.by.sort.includes('.')
          ? conditions.by.sort
          : `${alias}.${conditions.by.sort}`;
        builder.orderBy(sort, conditions.by.order || 'DESC');
      }
    }

    if (pagination) {
      const page =
        pagination.page && +pagination.page > 0 ? +pagination.page : 1;
      const maxLimit = +pagination.maxLimit || 200;
      const limit = pagination.limit
        ? +pagination.limit > maxLimit
          ? maxLimit
          : +pagination.limit
        : 20;

      builder.skip(limit * (page - 1)).take(limit);
    }
    return builder;
  }
}
