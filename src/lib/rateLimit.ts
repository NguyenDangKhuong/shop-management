import { Ratelimit } from '@upstash/ratelimit'
import { NextRequest, NextResponse } from 'next/server'
import { getRedis } from './redis'

type RateLimitConfig = {
  /** Max requests allowed in the window */
  limit: number
  /** Window duration string, e.g. '30 s', '1 m', '1 h' */
  window: `${number} ${'s' | 'm' | 'h' | 'd'}`
}

const limiters = new Map<string, Ratelimit>()

function getLimiter(prefix: string, config: RateLimitConfig) {
  const key = `${prefix}:${config.limit}:${config.window}`
  if (!limiters.has(key)) {
    limiters.set(
      key,
      new Ratelimit({
        redis: getRedis(),
        limiter: Ratelimit.slidingWindow(config.limit, config.window),
        prefix: `rl:${prefix}`,
        analytics: true,
      })
    )
  }
  return limiters.get(key)!
}

/** Get client identifier from request (IP or forwarded-for) */
function getIdentifier(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'anonymous'
  )
}

/**
 * Check rate limit for a request.
 * Returns null if allowed, or a 429 NextResponse if rate limited.
 */
export async function checkRateLimit(
  req: NextRequest,
  prefix: string,
  config: RateLimitConfig
): Promise<NextResponse | null> {
  try {
    const limiter = getLimiter(prefix, config)
    const identifier = getIdentifier(req)
    const { success, remaining, reset } = await limiter.limit(identifier)

    if (!success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Remaining': remaining.toString(),
            'X-RateLimit-Reset': reset.toString(),
            'Retry-After': Math.ceil((reset - Date.now()) / 1000).toString(),
          },
        }
      )
    }

    return null
  } catch (err) {
    // If Redis is down, allow the request (fail-open)
    console.error('Rate limit check failed:', err)
    return null
  }
}
