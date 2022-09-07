import { HttpException } from '@nestjs/common';
/**
 * 自定义异常
 * Added by Jason.Song on 2022/07/08 15:40:51
 */
export class CustomException extends HttpException {
  /**
   * 自定义异常
   * @param statusCode  自定义状态码
   * @param message     异常信息
   * @param description 简要描述
   */
  constructor(
    statusCode: number,
    message?: string | object | any,
    description?: string,
  ) {
    super(
      HttpException.createBody(message, description, statusCode),
      statusCode,
    );
  }
}
