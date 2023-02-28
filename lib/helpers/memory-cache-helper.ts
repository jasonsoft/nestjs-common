/**
 * Memory cache
 * Added by Jason.Song (成长的小猪) on 2023/02/27 23:15:07
 */
class MemoryCacheHelper {
  private static instance: MemoryCacheHelper;
  private cache: Map<string, any>;
  constructor() {
    this.cache = new Map();
  }

  static getInstance(): MemoryCacheHelper {
    if (!this.instance) {
      this.instance = new MemoryCacheHelper();
    }
    return this.instance;
  }

  set<T>(key: string, value: T) {
    this.cache.set(key, value);
  }

  get<T>(key: string, defaults?: T): T {
    return this.cache.get(key) || defaults;
  }

  remove(key: string): boolean {
    return this.cache.delete(key);
  }

  clearAll() {
    this.cache.clear();
  }
}

export default MemoryCacheHelper.getInstance();
