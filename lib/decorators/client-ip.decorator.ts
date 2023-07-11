import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { getClientIp } from '../utils';

/**
 * Get client ip
 * Added by Jason.Song on 2023/07/11 15:36:18
 */
export const ClientIp = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user?.clientIp || getClientIp(request);
  },
);
