/**
 * MemoryCacheHelper类，用于在内存中存储数据
 * Added by Jason.Song (成长的小猪) on 2023/02/27 23:15:07
 */
class MemoryCacheHelper {
  /**
   * 单例模式，获取MemoryCacheHelper实例
   */
  private static instance: MemoryCacheHelper = new MemoryCacheHelper();
  /**
   * 存储数据的Map
   */
  private cache: Map<string, { value: any; expire: number }> = new Map();

  /**
   * 获取MemoryCacheHelper实例
   */
  static get Instance(): MemoryCacheHelper {
    return this.instance;
  }

  /**
   * 存储数据
   * Updated by Jason.Song (成长的小猪) on 2023/03/22 23:32:00
   * @param key 键
   * @param value 值
   * @param expire 过期时间，当类型为 number 时单位为秒；当类型为 string 时，可以是秒(s)、分钟(m)、小时(h)、天(d)，例如"30s"、"8h"、"7d"等
   */
  set<T>(key: string, value: T, expire: number | string = 0) {
    let expireTime = 0;
    if (typeof expire === 'string') {
      const match = expire.match(/^(\d+)([smhd])$/);
      if (!match) {
        throw new Error('Invalid expire time');
      }
      const num = parseInt(match[1]);
      const unit = match[2];
      switch (unit) {
        case 's':
          expireTime = num * 1000;
          break;
        case 'm':
          expireTime = num * 60 * 1000;
          break;
        case 'h':
          expireTime = num * 60 * 60 * 1000;
          break;
        case 'd':
          expireTime = num * 24 * 60 * 60 * 1000;
          break;
        default:
          throw new Error('Invalid expire time');
      }
    } else if (typeof expire === 'number') {
      expireTime = expire * 1000;
    }
    expireTime = expireTime > 0 ? Date.now() + expireTime : 0;
    this.cache.set(key, { value, expire: expireTime });
  }

  /**
   * 获取数据
   * Updated by Jason.Song (成长的小猪) on 2023/03/22 23:35:34
   * @param key 键
   * @param defaultValue 默认值
   * @returns 如果存在，则返回对应的值，否则返回默认值
   */
  get<T>(key: string, defaultValue?: T): T | undefined {
    const item = this.cache.get(key);
    if (!item) {
      return defaultValue;
    }
    if (item.expire && item.expire < Date.now()) {
      this.cache.delete(key);
      return defaultValue;
    }
    return item.value as T;
  }

  /**
   * 删除指定键的数据
   * Updated by Jason.Song (成长的小猪) on 2023/03/22 23:22:16
   * @param key 键
   * @returns 如果删除成功，则返回true，否则返回false
   */
  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  /**
   * 清空所有数据
   * Updated by Jason.Song (成长的小猪) on 2023/03/22 23:22:55
   */
  clear() {
    this.cache.clear();
  }
}

export default MemoryCacheHelper.Instance;
