import { ImageResponse } from 'next/og'
import { siteConfig } from '@/config'
import { OpenGraph } from './components'

export const revalidate = false

export async function GET(req: Request) {
  const url = new URL(req.url)
  const title = url.searchParams.get('title') || siteConfig.description

  return new ImageResponse(<OpenGraph title={title} />, {
    width: 1200,
    height: 630,
  })
}
