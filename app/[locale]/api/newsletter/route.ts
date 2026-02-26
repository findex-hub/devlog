import siteMetadata from '@/data/siteMetadata'
import { NextResponse } from 'next/server'

export const runtime = 'edge'

const BUTTONDOWN_ENDPOINT = 'https://api.buttondown.email/v1/subscribers'

async function subscribeWithButtondown(email: string): Promise<Response> {
  const apiKey = process.env.BUTTONDOWN_API_KEY

  if (!apiKey) {
    return new Response(null, {
      status: 500,
      statusText: 'Buttondown API key not configured',
    })
  }

  return fetch(BUTTONDOWN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Token ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  })
}

async function subscribeToNewsletter(email: string): Promise<Response> {
  const provider = siteMetadata.newsletter?.provider

  if (!provider) {
    return new Response(null, { status: 500, statusText: 'Newsletter provider missing' })
  }

  if (provider !== 'buttondown') {
    return new Response(null, {
      status: 501,
      statusText: `${provider} is not supported on the edge runtime`,
    })
  }

  return subscribeWithButtondown(email)
}

export async function POST(request: Request): Promise<NextResponse> {
  let email: string | undefined

  try {
    const body = await request.json()
    email = body?.email
  } catch {
    email = undefined
  }

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 })
  }

  const response = await subscribeToNewsletter(email)

  if (!response.ok) {
    const errorMessage = response.statusText || 'Subscription request failed'
    return NextResponse.json({ error: errorMessage }, { status: response.status })
  }

  return NextResponse.json(
    { message: 'Successfully subscribed to the newsletter' },
    { status: 201 }
  )
}

export async function GET(): Promise<NextResponse> {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
