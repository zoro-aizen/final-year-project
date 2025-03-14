interface CacheOptions {
  maxAge?: number; // Maximum age of cache in milliseconds
  maxSize?: number; // Maximum number of items in cache
}

interface CacheItem<T> {
  value: T;
  timestamp: number;
}

class CacheManager<T> {
  private cache: Map<string, CacheItem<T>>;
  private maxAge: number;
  private maxSize: number;

  constructor(options: CacheOptions = {}) {
    this.cache = new Map();
    this.maxAge = options.maxAge || 5 * 60 * 1000; // Default: 5 minutes
    this.maxSize = options.maxSize || 100; // Default: 100 items
  }

  /**
   * Set a value in the cache
   * @param key Cache key
   * @param value Value to store
   */
  set(key: string, value: T): void {
    // Remove oldest item if cache is full
    if (this.cache.size >= this.maxSize) {
      const oldestKey = this.findOldestKey();
      if (oldestKey) {
        this.cache.delete(oldestKey);
      }
    }

    this.cache.set(key, {
      value,
      timestamp: Date.now(),
    });
  }

  /**
   * Get a value from the cache
   * @param key Cache key
   * @returns Cached value or null if not found or expired
   */
  get(key: string): T | null {
    const item = this.cache.get(key);

    if (!item) {
      return null;
    }

    // Check if item has expired
    if (Date.now() - item.timestamp > this.maxAge) {
      this.cache.delete(key);
      return null;
    }

    return item.value;
  }

  /**
   * Remove a value from the cache
   * @param key Cache key
   */
  delete(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Clear all items from the cache
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Get the number of items in the cache
   */
  size(): number {
    return this.cache.size;
  }

  /**
   * Check if a key exists in the cache and is not expired
   * @param key Cache key
   */
  has(key: string): boolean {
    const item = this.cache.get(key);

    if (!item) {
      return false;
    }

    if (Date.now() - item.timestamp > this.maxAge) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  /**
   * Get all valid keys in the cache
   */
  keys(): string[] {
    const validKeys: string[] = [];

    for (const [key, item] of this.cache.entries()) {
      if (Date.now() - item.timestamp <= this.maxAge) {
        validKeys.push(key);
      } else {
        this.cache.delete(key);
      }
    }

    return validKeys;
  }

  /**
   * Get all valid values in the cache
   */
  values(): T[] {
    const validValues: T[] = [];

    for (const [key, item] of this.cache.entries()) {
      if (Date.now() - item.timestamp <= this.maxAge) {
        validValues.push(item.value);
      } else {
        this.cache.delete(key);
      }
    }

    return validValues;
  }

  /**
   * Update the max age of the cache
   * @param maxAge New max age in milliseconds
   */
  setMaxAge(maxAge: number): void {
    this.maxAge = maxAge;
    this.cleanup();
  }

  /**
   * Update the max size of the cache
   * @param maxSize New max size
   */
  setMaxSize(maxSize: number): void {
    this.maxSize = maxSize;
    while (this.cache.size > this.maxSize) {
      const oldestKey = this.findOldestKey();
      if (oldestKey) {
        this.cache.delete(oldestKey);
      }
    }
  }

  /**
   * Get cache statistics
   */
  getStats(): {
    size: number;
    maxSize: number;
    maxAge: number;
    oldestItem: number;
    newestItem: number;
  } {
    let oldestTimestamp = Date.now();
    let newestTimestamp = 0;

    for (const item of this.cache.values()) {
      if (item.timestamp < oldestTimestamp) {
        oldestTimestamp = item.timestamp;
      }
      if (item.timestamp > newestTimestamp) {
        newestTimestamp = item.timestamp;
      }
    }

    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      maxAge: this.maxAge,
      oldestItem: oldestTimestamp,
      newestItem: newestTimestamp,
    };
  }

  /**
   * Clean up expired items
   */
  private cleanup(): void {
    const now = Date.now();

    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > this.maxAge) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * Find the key of the oldest item in the cache
   */
  private findOldestKey(): string | null {
    let oldestKey: string | null = null;
    let oldestTimestamp = Date.now();

    for (const [key, item] of this.cache.entries()) {
      if (item.timestamp < oldestTimestamp) {
        oldestKey = key;
        oldestTimestamp = item.timestamp;
      }
    }

    return oldestKey;
  }
}

export default CacheManager;
