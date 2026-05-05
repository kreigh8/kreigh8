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
      <div
        className="text-lg text-primary [&_a]:font-medium [&_a]:underline [&_a]:underline-offset-4"
        dangerouslySetInnerHTML={{ __html: homeBlurb?.homeBlurb ?? '' }}
      />
    </div>
  )
}
