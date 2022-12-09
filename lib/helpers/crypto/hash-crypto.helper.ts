import * as crypto from 'crypto';

/**
 * Hash crypto helper
 * Added by Jason.Song on 2022/10/21 17:29:31
 */
export class HashCryptoHelper {
  /**
   * md5 encrypt
   * Added by Jason.Song (成长的小猪) on 2022/12/08 14:20:12
   * @param plaintext
   * @returns hex ciphertext
   */
  public static md5ToHexString(plaintext: string): string {
    return this.encryptToHexString(plaintext, 'md5');
  }

  /**
   * sha1 encrypt
   * Added by Jason.Song (成长的小猪) on 2022/12/08 14:26:47
   * @param plaintext
   * @returns base64 ciphertext
   */
  public static sha1ToHexString(plaintext: string): string {
    return this.encryptToHexString(plaintext, 'sha1');
  }

  /**
   * encrypt
   * Added by Jason.Song (成长的小猪) on 2022/12/08 14:27:03
   * @param plaintext
   * @param encoding
   * @returns ciphertext
   */
  public static encryptToHexString(
    plaintext: string,
    algorithm: 'md5' | 'sha1' = 'md5',
  ): string {
    return crypto
      .createHash(algorithm)
      .update(plaintext, 'utf-8')
      .digest('hex');
  }
}
