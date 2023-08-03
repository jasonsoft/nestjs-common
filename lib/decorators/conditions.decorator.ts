import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ConditionsDto } from '../dto';
import { plainToClassFromExist } from 'class-transformer';

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
    let conditions: ConditionsDto = new ConditionsDto();
    const queryParams = request?.query?.[opt.key];
    if (queryParams) {
      conditions = plainToClassFromExist(conditions, JSON.parse(queryParams), {
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
      });
    }
    const bodyParams = request?.body?.[opt.key];
    if (bodyParams) {
      conditions = plainToClassFromExist(conditions, bodyParams, {
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
      });
    }
    return conditions;
  },
);
