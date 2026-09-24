import { ImageResponse } from 'next/og'
import { fetchQuery } from 'convex/nextjs'
import { api } from '@/convex/_generated/api'

export const alt = 'kreigh8 — Kreigh Hirschy'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpengraphImage() {
  const [homeBlurb, homeImage] = await Promise.all([
    fetchQuery(api.home.getHomeBlurb, {}),
    fetchQuery(api.homeImage.getHomeImage, {})
  ])

  const title = homeBlurb?.title || 'Kreigh Hirschy'
  const subTitle = homeBlurb?.subTitle
  const slogan = homeBlurb?.slogan || 'Portfolio site for Kreigh Hirschy'

  return new ImageResponse(
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#0b1120',
        padding: '80px',
        fontFamily: 'sans-serif'
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 700 }}>
        <div style={{ fontSize: 64, fontWeight: 700, color: '#f5f6fa' }}>
          {title}
        </div>
        {subTitle && (
          <div style={{ fontSize: 32, color: '#93a0c9', marginTop: 16 }}>
            {subTitle}
          </div>
        )}
        <div style={{ fontSize: 28, color: '#c7cde3', marginTop: 24 }}>
          {slogan}
        </div>
      </div>

      {homeImage?.imageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={homeImage.imageUrl}
          width={320}
          height={320}
          style={{
            borderRadius: '50%',
            objectFit: 'cover',
            border: '4px solid #3b4a86'
          }}
        />
      )}
    </div>,
    { ...size }
  )
}
