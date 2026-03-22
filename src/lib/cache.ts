import { getRedis } from './redis'

/**
 * Cache-aside pattern with Upstash Redis.
 * Check cache first → if miss, call fetchFn → store result → return.
 */
export async function withCache<T>(
  key: string,
  ttlSeconds: number,
  fetchFn: () => Promise<T>
): Promise<T> {
  try {
    const cached = await getRedis().get<T>(key)
    if (cached !== null && cached !== undefined) {
      return cached
    }
  } catch (err) {
    console.error('Cache read failed:', err)
  }

  const data = await fetchFn()

  try {
    await getRedis().set(key, data, { ex: ttlSeconds })
  } catch (err) {
    console.error('Cache write failed:', err)
  }

  return data
}

/**
 * Invalidate cache by deleting keys.
 * Use after mutations (PUT/DELETE) to ensure fresh data.
 */
export async function invalidateCache(...keys: string[]) {
  try {
    if (keys.length > 0) {
      await getRedis().del(...keys)
    }
  } catch (err) {
    console.error('Cache invalidation failed:', err)
  }
}
