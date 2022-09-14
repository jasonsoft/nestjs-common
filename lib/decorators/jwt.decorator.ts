import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * JWT 授权成功用户信息
 * Added by Jason.Song on 2021/05/08 11:56:48
 */
export const Jwt = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return data ? user?.[data] : user;
  },
);
