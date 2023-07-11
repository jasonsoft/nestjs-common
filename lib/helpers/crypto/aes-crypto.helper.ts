import * as crypto from 'crypto';

/**
 * AES crypto helper
 * aes-128-ecb
 * Added by Jason.Song (成长的小猪) on 2022/12/08 14:42:36
 */
export class AesCryptoHelper {
  /**
   * Encrypt to hex string
   * Added by Jason.Song (成长的小猪) on 2022/12/08 15:25:58
   * @param plaintext
   * @param key
   * @returns
   */
  public static encryptToHexString(plaintext: string, key: string): string {
    return this.encryptToCiphertext(plaintext, key, 'hex');
  }

  /**
   * Encrypt to base64 string
   * Added by Jason.Song (成长的小猪) on 2022/12/08 15:26:13
   * @param plaintext
   * @param key
   * @returns
   */
  public static encryptToBase64String(plaintext: string, key: string): string {
    return this.encryptToCiphertext(plaintext, key, 'base64');
  }

  /**
   * Encrypt to ciphertext
   * Added by Jason.Song (成长的小猪) on 2022/12/08 15:25:44
   * @param plaintext
   * @param key
   * @param encoding
   * @returns
   */
  public static encryptToCiphertext(
    plaintext: string,
    key: string,
    encoding: 'base64' | 'hex' = 'base64',
  ): string {
    if (!plaintext) {
      throw new Error('plaintext should not be empty');
    }
    if (!key) {
      throw new Error('key should not be empty');
    }
    // if (key.length !== 16) {
    //   throw new Error('key must be equal to 16 characters');
    // }
    const cipherKey =
      key.length > 16 ? key.substring(0, 16) : key.padEnd(16, '0');
    const cipher = crypto.createCipheriv('aes-128-ecb', cipherKey, '');
    let ciphertext = cipher.update(plaintext, 'utf-8', encoding);
    ciphertext += cipher.final(encoding);
    return ciphertext;
  }

  /**
   * decrypt by hex string
   * Added by Jason.Song (成长的小猪) on 2022/12/08 15:46:53
   * @param ciphertext
   * @param key
   * @returns
   */
  public static decryptByHexString(ciphertext: string, key: string): string {
    return this.decryptToPlaintext(ciphertext, key, 'hex');
  }

  /**
   * decrypt by base64 string
   * Added by Jason.Song (成长的小猪) on 2022/12/08 15:46:58
   * @param ciphertext
   * @param key
   * @returns
   */
  public static decryptByBase64String(ciphertext: string, key: string): string {
    return this.decryptToPlaintext(ciphertext, key, 'base64');
  }

  /**
   * Decrypt to plaintext
   * Added by Jason.Song (成长的小猪) on 2022/12/08 15:45:54
   * @param ciphertext
   * @param key
   * @param encoding
   * @returns
   */
  public static decryptToPlaintext(
    ciphertext: string,
    key: string,
    encoding: 'base64' | 'hex' = 'base64',
  ): string {
    if (!ciphertext) {
      throw new Error('plaintext should not be empty');
    }
    if (!key) {
      throw new Error('key should not be empty');
    }
    if (key.length !== 16) {
      throw new Error('key must be equal to 16 characters');
    }
    const decipher = crypto.createDecipheriv('aes-128-ecb', key, '');
    let plaintext = decipher.update(ciphertext, encoding, 'utf-8');
    plaintext += decipher.final('utf-8');
    return plaintext;
  }
}
