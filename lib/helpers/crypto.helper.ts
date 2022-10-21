import * as crypto from 'crypto';

/**
 * Crypto Helper
 * Added by Jason.Song on 2022/10/21 17:29:31
 */
export class CryptoHelper {
  /**
   * MD5
   * Added by Jason.Song on 2022/10/21 17:30:46
   * @param data
   * @returns
   */
  public static md5(data: string): string {
    return crypto.createHash('md5').update(data).digest('hex');
  }
}
