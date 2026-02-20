'use client'

import { api } from '@/convex/_generated/api'
import { Preloaded, usePreloadedQuery } from 'convex/react'

export default function BlurbText(props: {
  preloadedHomeBlurb: Preloaded<typeof api.home.getHomeBlurb>
}) {
  const homeBlurb = usePreloadedQuery(props.preloadedHomeBlurb)

  return <h3>{homeBlurb?.homeBlurb}</h3>
}
