import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const CODING_QUOTES = [
  "Talk is cheap. Show me the code. — Linus Torvalds",
  "Programs must be written for people to read, and only secondarily for machines to execute. — Harold Abelson",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand. — Martin Fowler",
  "First, solve the problem. Then, write the code. — John Johnson",
  "Experience is the name everyone gives to their mistakes. — Oscar Wilde",
  "In order to understand recursion, one must first understand recursion. — Anonymous"
]

export async function GET(req: NextRequest) {
  try {
    const headers: Record<string, string> = {}
    req.headers.forEach((value, key) => {
      headers[key] = value
    })

    const randomQuote = CODING_QUOTES[Math.floor(Math.random() * CODING_QUOTES.length)]

    return NextResponse.json({
      status: 'success',
      message: 'Hello from Developer Sandbox API! 🚀',
      timestamp: new Date().toISOString(),
      quote: randomQuote,
      requestInfo: {
        method: req.method,
        url: req.url,
        userAgent: req.headers.get('user-agent') || 'unknown',
        ip: req.headers.get('x-forwarded-for') || '127.0.0.1'
      },
      environment: {
        nodeVersion: process.version,
        env: process.env.NODE_ENV
      }
    })
  } catch (error: any) {
    return NextResponse.json(
      { status: 'error', message: error.message || 'Internal Server Error' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    
    return NextResponse.json({
      status: 'success',
      message: 'POST request received successfully!',
      timestamp: new Date().toISOString(),
      receivedData: body,
      requestInfo: {
        method: req.method,
        url: req.url
      }
    })
  } catch (error: any) {
    return NextResponse.json(
      { status: 'error', message: error.message || 'Internal Server Error' },
      { status: 500 }
    )
  }
}
