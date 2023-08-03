import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  Optional,
  PipeTransform,
  ValidationError,
} from '@nestjs/common';
import { ClassTransformOptions, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

export interface ParseToDtoPipeOptions {
  transformOptions?: ClassTransformOptions;
}

/**
 * parse to DTO
 * Added by Jason.Song (成长的小猪) on 2022/07/18 13:59:09
 */
@Injectable()
export class ParseToDtoPipe implements PipeTransform<any> {
  protected transformOptions?: ClassTransformOptions;

  constructor(@Optional() options?: ParseToDtoPipeOptions) {
    options = options || {};
    const { transformOptions } = options;
    this.transformOptions = transformOptions;
  }

  public async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;
    if (!metatype || typeof value !== 'object') {
      return value;
    }
    const object = plainToClass(metatype, value, this.transformOptions);
    const errors = await validate(object);
    if (errors.length > 0) {
      const constraints = this.toValidationError(errors[0]);
      throw new BadRequestException(constraints);
    }
    return object;
  }

  protected toValidationError(error: ValidationError, parentPath?: string) {
    parentPath = parentPath
      ? `${parentPath}.${error.property}`
      : error.property;
    if (!(error.children && error.children.length)) {
      return this.prependConstraintsWithParentProp(parentPath, error);
    }
    for (const item of error.children) {
      return this.toValidationError(item, parentPath);
    }
  }

  protected prependConstraintsWithParentProp(
    parentPath: string,
    error: ValidationError,
  ) {
    for (const key in error.constraints) {
      return `${parentPath}: ${error.constraints[key]}`;
    }
  }
}
