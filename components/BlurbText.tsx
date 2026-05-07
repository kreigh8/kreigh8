'use client'

import { api } from '@/convex/_generated/api'
import { Preloaded, usePreloadedQuery } from 'convex/react'

export default function BlurbText(props: {
  preloadedHomeBlurb: Preloaded<typeof api.home.getHomeBlurb>
}) {
  const homeBlurb = usePreloadedQuery(props.preloadedHomeBlurb)

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-4xl font-bold text-primary">{homeBlurb?.title}</h1>
      <h3 className="text-lg text-primary">{homeBlurb?.subTitle}</h3>
      <p className="text-base text-muted-foreground">{homeBlurb?.slogan}</p>
    </div>
  )
}
