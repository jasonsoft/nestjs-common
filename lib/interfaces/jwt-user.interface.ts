/**
 * JWT User
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
   * User options
   * Do not include sensitive data when used as a signature.
   * It is recommended to use the ID signature, assign the value after the ID verification is successful,
   * and then read the relevant information in the control class
   */
  options?: T;

  /**
   * Client IP
   */
  clientIp?: string;

  // /**
  //  * 用户ID
  //  * @deprecated Deprecated and not recommended for use, can be assigned to a custom "options" object
  //  */
  // userId?: string | number;

  // /**
  //  * 用户名
  //  * @deprecated Deprecated and not recommended for use, can be assigned to a custom "options" object
  //  */
  // username?: string;
  // /**
  //  * 用户昵称
  //  * @deprecated Deprecated and not recommended for use, can be assigned to a custom "options" object
  //  */
  // nickname?: string;
  // /**
  //  * 公司ID
  //  */
  // companyId?: string | number;
  // /**
  //  * 公司名称
  //  * @deprecated Deprecated and not recommended for use, can be assigned to a custom "options" object
  //  */
  // companyName?: string;

  // /**
  //  * @deprecated Deprecated, can be assigned to a custom "options" object
  //  */
  // extends?: object;
}
