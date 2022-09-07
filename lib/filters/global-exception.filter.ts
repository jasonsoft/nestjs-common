import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
  Optional,
} from '@nestjs/common';
import { isObject } from '../utils/shared';

export interface GlobalExceptionFilterOptions {
  /** Fixed response status code 200 */
  fixedResponseStatusCode200?: boolean;
  /** Support message as an array type */
  supportMessageAsArrayType?: boolean;
  /** Display request path */
  displayRequestPath?: boolean;
}

/**
 * Global exception filter / 返回统一的JSON数据格式
 * Returns unified error message data format (JSON)
 * Added by Jason.Song (成长的小猪) on 2021/11/10 14:35:29
 */
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private static readonly logger = new Logger('GlobalExceptionFilter');
  protected filterOptions: GlobalExceptionFilterOptions;

  constructor(@Optional() options?: GlobalExceptionFilterOptions) {
    this.filterOptions = options || {};
  }

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    let httpStatus: number = HttpStatus.OK;
    const payload: any = {};
    if (exception instanceof HttpException || 'response' in exception) {
      const response: any = exception.getResponse();
      if (isObject(response)) {
        httpStatus = exception.getStatus();
        if ('statusCode' in response && 'message' in response) {
          payload.statusCode = response['statusCode'];
          const message = response['message'];
          payload.message = this.filterOptions.supportMessageAsArrayType
            ? message
            : Array.isArray(message)
            ? message[0]
            : message;
        } else {
          Object.assign(payload, response);
        }
      } else {
        payload.statusCode = exception.getStatus();
        payload.message = response;
      }
    } else if (exception instanceof Error) {
      httpStatus = HttpStatus.BAD_REQUEST;
      payload.statusCode = HttpStatus.BAD_REQUEST;
      payload.message = exception.message;
      GlobalExceptionFilter.logger.error(exception.message, exception.stack);
    } else {
      httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
      payload.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      payload.message = 'Internal Server Error';
      GlobalExceptionFilter.logger.error(exception);
    }

    if (this.filterOptions.displayRequestPath) {
      payload.path = `${request.method} ${request.url}`;
      payload.timestamp = new Date().toISOString();
    }

    response
      .status(
        this.filterOptions.fixedResponseStatusCode200
          ? HttpStatus.OK
          : httpStatus,
      )
      .json(payload);
  }
}
