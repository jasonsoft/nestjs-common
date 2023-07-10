/**
 * JWT Token 验证后用户信息
 * Added by Jason.Song on 2021/05/08 12:07:29
 */
export interface JwtUser<T = any> {
  /**
   * ID
   * for JWT signature
   */
  id: string | number;

  /**
   * Role
   * This attribute is assigned a value after the signature verification is successful.
   * If it is not empty, it will be used for role verification
   */
  roles?: string | string[];

  /**
   * User info
   * Do not include sensitive data when used as a signature.
   * It is recommended to use the ID signature, assign the value after the ID verification is successful,
   * and then read the relevant information in the control class
   */
  user?: T;

  /**
   * 用户ID
   * @deprecated Deprecated and not recommended for use, can be assigned to a custom "user" object
   */
  userId?: string | number;

  /**
   * 用户名
   * @deprecated Deprecated and not recommended for use, can be assigned to a custom "user" object
   */
  username?: string;
  /**
   * 用户昵称
   * @deprecated Deprecated and not recommended for use, can be assigned to a custom "user" object
   */
  nickname?: string;
  /**
   * 公司ID
   */
  companyId?: string | number;
  /**
   * 公司名称
   * @deprecated Deprecated and not recommended for use, can be assigned to a custom "user" object
   */
  companyName?: string;

  /**
   * @deprecated Deprecated, can be assigned to a custom "user" object
   */
  extends?: object;
}
