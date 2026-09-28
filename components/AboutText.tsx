'use client'

import sanitizeHtml from 'sanitize-html'
import { api } from '@/convex/_generated/api'
import { Preloaded, usePreloadedQuery } from 'convex/react'

// isomorphic-dompurify was replaced here: it pulls in jsdom, which
// (via html-encoding-sniffer -> @exodus/bytes) ships an ESM-only
// transitive dependency that crashes Next's server bundle with
// ERR_REQUIRE_ESM in production. sanitize-html has no DOM/jsdom
// dependency, so it doesn't hit that landmine, in any Node version.
const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: [
    'p',
    'br',
    'hr',
    'strong',
    'b',
    'em',
    'i',
    's',
    'strike',
    'del',
    'u',
    'mark',
    'code',
    'sub',
    'sup',
    'blockquote',
    'ul',
    'ol',
    'li',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'a',
    'img',
    'span',
    'div',
    'pre',
    'table',
    'thead',
    'tbody',
    'tr',
    'th',
    'td',
    'colgroup',
    'col'
  ],
  allowedAttributes: {
    '*': ['class', 'style'],
    a: ['href', 'target', 'rel'],
    img: ['src', 'alt', 'title', 'width', 'height'],
    td: ['colspan', 'rowspan'],
    th: ['colspan', 'rowspan']
  }
}

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
          __html: sanitizeHtml(blurb?.blurb ?? '', SANITIZE_OPTIONS)
        }}
      />
    </section>
  )
}
