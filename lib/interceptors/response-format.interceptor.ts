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
import { BYPASS_RESPONSE_FORMAT_METADATA } from '../constants';
import { ReflectorHelper } from '../helpers/reflector.helper';
import { uuid } from '../utils';

export interface ResponseFormatInterceptorOptions {
  /** Fixed response status code 200 */
  fixedResponseStatusCode200?: boolean;
  /** Display request method, path, execution time */
  displayMethodPathExecutionTime?: boolean;
  /** Transaction ID header */
  transactionIdHeader?: string;
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
    let startTime = Date.now();
    const handler = context.getHandler();
    const bypass = ReflectorHelper.get<boolean>(
      BYPASS_RESPONSE_FORMAT_METADATA,
      handler,
    );
    const request = context.switchToHttp().getRequest();
    if (!request.startTime) {
      request.startTime = startTime;
    } else {
      startTime = request.startTime;
    }
    const response = context.switchToHttp().getResponse();
    const transactionIdHeaderName =
      this.interceptorOptions.transactionIdHeader || 'x-transaction-id';
    let transactionId = request.headers[transactionIdHeaderName.toLowerCase()];
    if (!transactionId) {
      transactionId = uuid();
    }
    response.setHeader(transactionIdHeaderName, transactionId);

    return next.handle().pipe(
      map((data) => {
        if (this.interceptorOptions.fixedResponseStatusCode200) {
          response.status(HttpStatus.OK);
        }

        if (bypass) {
          return data;
        }
        const payload: { [key: string]: any } = {
          statusCode: HttpStatus.OK,
          data,
        };
        if (this.interceptorOptions.displayMethodPathExecutionTime) {
          const meta = {
            method: request.method,
            path: request.path,
            timestamp: new Date().toISOString(),
            executionTime: Date.now() - startTime,
            transactionId,
          };
          payload.meta = meta;
        }
        return payload;
      }),
    );
  }
}
