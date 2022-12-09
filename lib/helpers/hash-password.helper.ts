import * as bcrypt from 'bcrypt';

/**
 * use bcrypt to hash a random password
 * Added by Jason.Song (成长的小猪) on 2022/09/13 15:59:24
 */
export class HashPasswordHelper {
  private static saltOrRounds = 10;

  /**
   * Encrypts plain string
   * @param data {string}
   * @returns Promise<string> Returns encrypted
   */
  public static async encrypt(data: string): Promise<string> {
    return await bcrypt.hash(data, this.saltOrRounds);
  }

  /**
   * Compares encrypted and provided string
   * @param data {string}
   * @param encrypted {string}
   * @returns Promise<boolean> Returns Boolean if provided string and encrypted string are equal
   */
  public static async compare(
    data: string,
    encrypted: string,
  ): Promise<boolean> {
    return await bcrypt.compare(data, encrypted);
  }
}
