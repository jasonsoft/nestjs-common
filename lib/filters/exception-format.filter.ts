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

export interface ExceptionFormatFilterOptions {
  /** Fixed response status code 200 */
  fixedResponseStatusCode200?: boolean;
  /** Support message as an array type */
  supportMessageAsArrayType?: boolean;
  /** Display request method, path, execution time */
  displayMethodPathTimestamp?: boolean;
}

/**
 * Unified exception response format
 * Added by Jason.Song (成长的小猪) on 2021/11/10 14:35:29
 */
@Catch()
export class ExceptionFormatFilter implements ExceptionFilter {
  private static readonly logger = new Logger('ExceptionFormatFilter');
  protected filterOptions: ExceptionFormatFilterOptions;

  constructor(@Optional() options?: ExceptionFormatFilterOptions) {
    this.filterOptions = options || {};
  }

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    let httpStatus: number = HttpStatus.OK;
    const payload: { [key: string]: any } = {};
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
      ExceptionFormatFilter.logger.error(exception.message, exception.stack);
    } else {
      httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
      payload.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      payload.message = 'Internal Server Error';
      ExceptionFormatFilter.logger.error(exception);
    }

    if (this.filterOptions.displayMethodPathTimestamp) {
      const meta = {
        method: request.method,
        path: request.path,
        timestamp: new Date().toISOString(),
      };
      payload.meta = meta;
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
