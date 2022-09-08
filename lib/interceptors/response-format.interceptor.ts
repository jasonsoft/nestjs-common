import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  Logger,
  NestInterceptor,
  Optional,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BYPASS_RESPONSE_FORMAT } from '../constants';

export interface ResponseFormatInterceptorOptions {
  /** Display request method, path, execution time */
  displayMethodPathExecutionTime?: boolean;
}

/**
 * Unified JSON response format
 * Added by Jason.Song (成长的小猪) on 2021/11/10 18:26:41
 */
@Injectable()
export class ResponseFormatInterceptor implements NestInterceptor {
  private static readonly logger = new Logger('ResponseFormatInterceptor');
  protected interceptorOptions: ResponseFormatInterceptorOptions;

  /**
   * constructor
   * Added by Jason.Song (成长的小猪) on 2022/09/08 15:55:50
   * @param options response format options
   */
  constructor(@Optional() options?: ResponseFormatInterceptorOptions) {
    this.interceptorOptions = options || {};
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = Date.now();
    const bypass = Reflect.getMetadata(
      BYPASS_RESPONSE_FORMAT,
      context.getHandler(),
    ) as boolean;
    const request = context.switchToHttp().getRequest();
    return next.handle().pipe(
      map((data) => {
        if (bypass) {
          return data;
        }
        const payload: { [key: string]: any } = {
          statusCode: HttpStatus.OK,
          data,
        };
        if (this.interceptorOptions.displayMethodPathExecutionTime) {
          const ms = Date.now() - start;
          const meta = {
            method: request.method,
            path: request.path,
            execution: `${ms} ms`,
            timestamp: new Date().toISOString(),
          };
          payload.meta = meta;
        }
        return payload;
      }),
    );
  }
}
