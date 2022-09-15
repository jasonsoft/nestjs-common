/**
 * JWT Token 验证后用户信息
 * Added by Jason.Song on 2021/05/08 12:07:29
 */
export interface JwtUser {
  /**
   * 用户ID
   */
  userId: string | number;
  /**
   * 用户角色
   * 该属性不为空时，将用作角色验证
   */
  roles?: any[];
  /**
   * 用户名
   */
  username?: string;
  /**
   * 用户昵称
   */
  nickname?: string;
  /**
   * 公司ID
   */
  companyId?: string;
  /**
   * 公司名称
   */
  companyName?: string;

  /** 扩展 */
  extends?: object;
}
