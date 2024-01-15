import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
  Optional,
} from '@nestjs/common';
import { uuid } from '../utils';

export interface ExceptionFormatFilterOptions {
  /** Fixed response status code 200 */
  fixedResponseStatusCode200?: boolean;
  /** Support message as an array type */
  supportMessageAsArrayType?: boolean;
  /** Display request method, path, execution time */
  displayMethodPathExecutionTime?: boolean;
  /** Transaction ID header */
  transactionIdHeader?: string;
}

/**
 * Unified exception response format
 * Added by Jason.Song (成长的小猪) on 2021/11/10 14:35:29
 */
@Catch()
export class ExceptionFormatFilter implements ExceptionFilter {
  private static readonly logger = new Logger('ExceptionFormatFilter');
  protected filterOptions: ExceptionFormatFilterOptions;

  /**
   * constructor
   * Added by Jason.Song (成长的小猪) on 2022/09/08 15:58:20
   * @param options exception format options
   */
  constructor(@Optional() options?: ExceptionFormatFilterOptions) {
    this.filterOptions = options || {};
  }

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const transactionIdHeaderName =
      this.filterOptions.transactionIdHeader || 'x-transaction-id';
    let transactionId = request.headers[transactionIdHeaderName.toLowerCase()];
    if (!transactionId) {
      transactionId = uuid();
    }
    response.setHeader(transactionIdHeaderName, transactionId);

    let httpStatus: number = HttpStatus.OK;
    const payload: { [key: string]: any } = {};
    if (
      typeof exception === 'object' &&
      (exception instanceof HttpException || 'response' in exception)
    ) {
      httpStatus = exception.getStatus();
      const response: any = exception.getResponse();
      if ('statusCode' in response && 'message' in response) {
        Object.assign(payload, response);
        const message = response['message'];
        payload.message = this.filterOptions.supportMessageAsArrayType
          ? message
          : Array.isArray(message)
          ? message[0]
          : message;
      } else {
        payload.statusCode = httpStatus;
        Object.assign(payload, response);
      }
    } else if (exception instanceof Error) {
      httpStatus = HttpStatus.BAD_REQUEST;
      payload.statusCode = HttpStatus.BAD_REQUEST;
      payload.message = exception.message;
      payload.error = 'Bad Request';
      ExceptionFormatFilter.logger.error(exception.message, exception.stack);
    } else {
      let message = 'Internal Server Error';
      if (typeof exception === 'string') {
        message = exception;
      }
      httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
      payload.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      payload.message = message;
      payload.error = 'Internal Server Error';
      ExceptionFormatFilter.logger.error(exception);
    }

    if (this.filterOptions.displayMethodPathExecutionTime) {
      const startTime = request.startTime;
      const meta = {
        method: request.method,
        path: request.path,
        timestamp: new Date().toISOString(),
        executionTime: startTime ? Date.now() - startTime : undefined,
        transactionId,
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
