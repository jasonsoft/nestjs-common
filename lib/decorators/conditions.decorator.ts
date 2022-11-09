import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Conditions options
 * Added by Jason.Song on 2022/08/30 11:16:12
 */
interface IConditionsOptions {
  key?: string;
}

/**
 * Query conditions decorator
 * Added by Jason.Song on 2021/05/13 16:04:38
 */
export const Conditions = createParamDecorator(
  async (options: IConditionsOptions = {}, ctx: ExecutionContext) => {
    const opt = Object.assign({ key: 'conditions' }, options);
    const request = ctx.switchToHttp().getRequest();
    let conditions: any;
    const queryParams = request?.query?.[opt.key];
    if (queryParams) {
      conditions = JSON.parse(queryParams);
    }
    const bodyParams = request?.body?.[opt.key];
    if (bodyParams) {
      conditions = bodyParams;
    }
    return conditions;
  },
);
