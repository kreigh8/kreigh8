'use client'

import { api } from '@/convex/_generated/api'
import { Preloaded, usePreloadedQuery } from 'convex/react'

export default function AboutText(props: {
  preloadedAbout: Preloaded<typeof api.about.getAboutBlurb>
}) {
  const blurb = usePreloadedQuery(props.preloadedAbout)

  return (
    <div
      className="flex flex-col gap-4 [&_a]:font-medium [&_a]:underline [&_a]:underline-offset-4"
      dangerouslySetInnerHTML={{ __html: blurb?.blurb ?? '' }}
    />
  )
}
