/**
 * 对象验证
 * Added by Jason.Song (成长的小猪) on 2021/11/10 14:35:41
 * @param fn
 * @returns
 */
export const isObject = (fn: any): fn is object =>
  fn != null && typeof fn === 'object';

export const isNil = (val: any): val is null | undefined =>
  isUndefined(val) || val === null;

export const isUndefined = (obj: any): obj is undefined =>
  typeof obj === 'undefined';
