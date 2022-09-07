import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Conditions options
 * Added by Jason.Song on 2022/08/30 11:16:12
 */
interface IConditionsOptions {
  key?: string;
}

/**
 * 查询条件
 * Added by Jason.Song on 2021/05/13 16:04:38
 */
export const Conditions = createParamDecorator(
  async (options: IConditionsOptions = {}, ctx: ExecutionContext) => {
    const opt = Object.assign({ key: 'conditions' }, options);
    const request = ctx.switchToHttp().getRequest();
    let obj: any;
    const query = request?.query?.[opt.key];
    if (query) {
      const conditions = JSON.parse(query);
      if ('join' in conditions) {
        obj = conditions;
      }
    }
    const conditions = request?.body?.[opt.key] || {};
    if ('join' in conditions) {
      obj = conditions;
    }
    return obj;
  },
);
