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
 * 分页参数
 * Added by Jason.Song (成长的小猪) on 2022/03/08 16:16:13
 */
export const Pagination = createParamDecorator(
  (options: IPaginationOptions = {}, ctx: ExecutionContext) => {
    const opt = Object.assign({ key: 'pagination', maxLimit: 200 }, options);
    const dto: PaginationDto = {
      page: '1',
      limit: '20',
      maxLimit: opt.maxLimit,
    };
    const request = ctx.switchToHttp().getRequest();
    const regex = /^[0-9]+$/;
    const page = request?.query?.page;
    if (page && regex.test(page)) {
      dto.page = page;
    }
    const limit = request?.query?.limit;
    if (limit && regex.test(limit)) {
      dto.limit = limit;
    }
    const pagination = request?.body?.[opt.key] || {};
    if (pagination.page && regex.test(pagination.page + '')) {
      dto.page = pagination.page;
    }
    if (pagination.limit && regex.test(pagination.limit + '')) {
      dto.limit = pagination.limit;
    }

    return dto;
  },
);
