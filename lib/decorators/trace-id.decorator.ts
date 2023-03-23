import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

/**
 * This decorator generates a unique trace ID for each request,
 * which can be used to trace the request through different services.
 *
 * 该装饰器为每个请求生成一个唯一的跟踪 ID，可用于跟踪请求通过不同的服务。
 *
 * @param headers An array of header names to check for the trace ID.
 * If none of the headers are found, a new UUID will be generated.
 *
 * 一个要检查跟踪 ID 的头文件名称数组。如果没有找到任何头文件，则会生成一个新的 UUID。
 *
 * @param ctx The execution context of the current request.
 *
 * 当前请求的执行上下文。
 *
 * @returns The trace ID found in the headers, or a new UUID if none was found.
 *
 * 在头文件中找到的跟踪 ID，如果没有找到，则为新的 UUID。
 *
 * Added by Jason.Song (成长的小猪) on 2022/10/18 12:35:18
 */
export const TraceId = createParamDecorator(
  (headers: string[] = ['trace-id', 'x-trace-id'], ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const headerValue = headers.find(
      (header) => request.headers[header.toLowerCase()],
    );
    return headerValue || uuid();
  },
);
