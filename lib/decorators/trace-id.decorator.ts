import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

/**
 * Trace Id
 * Added by Jason.Song (成长的小猪) on 2022/10/18 12:35:18
 */
export const TraceId = createParamDecorator(
  (property: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const key = property ? property : 'traceId';
    let traceId = request.headers[key.toLowerCase()];
    if (traceId) {
      return traceId;
    }
    traceId = request.headers['trace-id'];
    if (traceId) {
      return traceId;
    }
    return uuid();
  },
);
