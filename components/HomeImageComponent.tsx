'use client'

import { api } from '@/convex/_generated/api'
import { Preloaded, usePreloadedQuery } from 'convex/react'
import Image from 'next/image'

export default function HomeImageComponent(props: {
  preloadedHomeImage: Preloaded<typeof api.homeImage.getHomeImage>
}) {
  const image = usePreloadedQuery(props.preloadedHomeImage)

  if (!image) {
    return <p>No home image found.</p>
  }

  return (
    <div className="relative shadow-2xl flex items-center justify-center size-96 rounded-full border-2 border-primary overflow-hidden">
      <Image
        src={image.imageUrl as string}
        alt={'Home Image'}
        width={600}
        height={400}
        className="object-contain"
      />
    </div>
  )
}
