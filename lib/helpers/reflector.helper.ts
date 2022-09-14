import { Type } from '@nestjs/common';
import { isEmpty, isObject } from '@nestjs/common/utils/shared.utils';

/**
 * Helper class providing Nest reflection capabilities.
 * Added by Jason.Song (成长的小猪) on 2022/09/14 17:36:55
 */
export class ReflectorHelper {
  /**
   * Retrieve metadata for a specified key for a specified target.
   *
   * @example
   * `const roles = this.reflector.get<string[]>('roles', context.getHandler());`
   *
   * @param metadataKey lookup key for metadata to retrieve
   * @param target context (decorated object) to retrieve metadata from
   *
   */
  public static get<TResult = any, TKey = any>(
    metadataKey: TKey,
    target: Type<any> | Function,
  ): TResult {
    return Reflect.getMetadata(metadataKey, target) as TResult;
  }

  /**
   * Retrieve metadata for a specified key for a specified set of targets.
   *
   * @param metadataKey lookup key for metadata to retrieve
   * @param targets context (decorated objects) to retrieve metadata from
   *
   */
  public static getAll<TResult extends any[] = any[], TKey = any>(
    metadataKey: TKey,
    targets: (Type<any> | Function)[],
  ): TResult {
    return (targets || []).map((target) =>
      Reflect.getMetadata(metadataKey, target),
    ) as TResult;
  }

  /**
   * Retrieve metadata for a specified key for a specified set of targets and merge results.
   *
   * @param metadataKey lookup key for metadata to retrieve
   * @param targets context (decorated objects) to retrieve metadata from
   *
   */
  public static getAllAndMerge<TResult extends any[] = any[], TKey = any>(
    metadataKey: TKey,
    targets: (Type<any> | Function)[],
  ): TResult {
    const metadataCollection = this.getAll<TResult, TKey>(
      metadataKey,
      targets,
    ).filter((item) => item !== undefined);

    if (isEmpty(metadataCollection)) {
      return metadataCollection as TResult;
    }
    return metadataCollection.reduce((a, b) => {
      if (Array.isArray(a)) {
        return a.concat(b);
      }
      if (isObject(a) && isObject(b)) {
        return {
          ...a,
          ...b,
        };
      }
      return [a, b];
    });
  }

  /**
   * Retrieve metadata for a specified key for a specified set of targets and return a first not undefined value.
   *
   * @param metadataKey lookup key for metadata to retrieve
   * @param targets context (decorated objects) to retrieve metadata from
   *
   */
  public static getAllAndOverride<TResult = any, TKey = any>(
    metadataKey: TKey,
    targets: (Type<any> | Function)[],
  ): TResult {
    return this.getAll(metadataKey, targets).find((item) => item !== undefined);
  }
}
