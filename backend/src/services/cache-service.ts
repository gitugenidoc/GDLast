// backend/src/services/cache-service.ts
// Redis/KV Cache Service for production caching

export interface CacheOptions {
  ttl?: number; // seconds
  tags?: string[];
}

export class Cache {
  private kv: any; // Cloudflare KV Namespace

  constructor(kv: any) {
    this.kv = kv;
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const data = await this.kv.get(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error(`Cache GET error for ${key}:`, error);
      return null;
    }
  }

  async set<T>(
    key: string,
    value: T,
    ttl: number = 3600,
    tags?: string[],
  ): Promise<void> {
    try {
      await this.kv.put(key, JSON.stringify(value), {
        expirationTtl: ttl,
        metadata: { tags: tags || [] },
      });
    } catch (error) {
      console.error(`Cache SET error for ${key}:`, error);
    }
  }

  async del(key: string): Promise<void> {
    try {
      await this.kv.delete(key);
    } catch (error) {
      console.error(`Cache DELETE error for ${key}:`, error);
    }
  }

  async invalidate(pattern: string): Promise<void> {
    try {
      // List and delete keys matching pattern
      const list = await this.kv.list({ prefix: pattern });
      const keys = list.keys.map((k: any) => k.name);
      for (const key of keys) {
        await this.del(key);
      }
    } catch (error) {
      console.error(`Cache INVALIDATE error for ${pattern}:`, error);
    }
  }

  async clear(): Promise<void> {
    try {
      const list = await this.kv.list();
      for (const key of list.keys) {
        await this.del(key.name);
      }
    } catch (error) {
      console.error(`Cache CLEAR error:`, error);
    }
  }

  async getOrSet<T>(
    key: string,
    fn: () => Promise<T>,
    ttl: number = 3600,
  ): Promise<T> {
    const cached = await this.get<T>(key);
    if (cached) return cached;

    const value = await fn();
    await this.set(key, value, ttl);
    return value;
  }
}

export default Cache;
