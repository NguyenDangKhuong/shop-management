import * as Sentry from '@sentry/nextjs'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

class SentryExampleAPIError extends Error {
  constructor(message: string | undefined) {
    super(message)
    this.name = 'SentryExampleAPIError'
  }
}

// API route that logs and reports error to Sentry, then returns an error response
export async function GET() {
  try {
    Sentry.logger.info('Sentry example API called')
    throw new SentryExampleAPIError('This error is raised on the backend called by the example page.')
  } catch (error) {
    Sentry.captureException(error)
    await Sentry.flush(2000) // Ensure event is sent before responding
    return NextResponse.json(
      { error: (error as Error).message || 'Unknown error' },
      { status: 500 }
    )
  }
}