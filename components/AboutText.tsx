'use client'

import DOMPurify from 'isomorphic-dompurify'
import { api } from '@/convex/_generated/api'
import { Preloaded, usePreloadedQuery } from 'convex/react'

export default function AboutText(props: {
  preloadedAbout: Preloaded<typeof api.about.getAboutBlurb>
}) {
  const blurb = usePreloadedQuery(props.preloadedAbout)

  return (
    <section
      id="about"
      className="flex flex-col gap-4 scroll-mt-4 md:scroll-mt-8"
    >
      <h2 className="text-2xl font-semibold text-primary">About</h2>
      <div
        className="[&_a]:font-medium [&_a]:underline [&_a]:underline-offset-4"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(blurb?.blurb ?? '')
        }}
      />
    </section>
  )
}
