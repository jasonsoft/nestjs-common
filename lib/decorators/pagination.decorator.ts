import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PaginationDto } from '../dto';

/**
 * Pagination options
 * Added by Jason.Song (成长的小猪) on 2022/08/30 11:10:42
 */
interface IPaginationOptions {
  key?: string;
  maxLimit?: number;
}

/**
 * Pagination decorator
 * Added by Jason.Song (成长的小猪) on 2022/03/08 16:16:13
 */
export const Pagination = createParamDecorator(
  (options: IPaginationOptions = {}, ctx: ExecutionContext) => {
    const opt = Object.assign({ key: 'pagination', maxLimit: 200 }, options);
    const dto = new PaginationDto();
    dto.maxLimit = opt.maxLimit;
    const request = ctx.switchToHttp().getRequest();
    const regex = /^[0-9]+$/;
    const page = request?.query?.page;
    if (page && regex.test(page) && +page > 0) {
      dto.page = +page;
    }
    const limit = request?.query?.limit;
    if (limit && regex.test(limit) && +limit > 0) {
      dto.limit = +limit;
    }
    const pagination = request?.body?.[opt.key] || {};
    if (
      pagination.page &&
      regex.test(pagination.page + '') &&
      +pagination.page > 0
    ) {
      dto.page = +pagination.page;
    }
    if (
      pagination.limit &&
      regex.test(pagination.limit + '') &&
      +pagination.limit > 0
    ) {
      dto.limit = +pagination.limit;
    }
    if (dto.limit > dto.maxLimit) {
      dto.limit = dto.maxLimit;
    }
    return dto;
  },
);
