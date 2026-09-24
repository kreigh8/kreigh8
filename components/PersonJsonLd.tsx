import { fetchQuery } from 'convex/nextjs'
import { api } from '@/convex/_generated/api'
import { SITE_URL } from '@/lib/site'

export default async function PersonJsonLd() {
  const [homeBlurb, socialLinks] = await Promise.all([
    fetchQuery(api.home.getHomeBlurb, {}),
    fetchQuery(api.social.getSocialLinks, {})
  ])

  if (!homeBlurb) {
    return null
  }

  const sameAs = [socialLinks?.linkedIn, socialLinks?.gitHub].filter(Boolean)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: homeBlurb.title,
    jobTitle: homeBlurb.subTitle || undefined,
    description: homeBlurb.slogan || undefined,
    url: SITE_URL,
    ...(sameAs.length > 0 && { sameAs }),
    ...(socialLinks?.email && { email: socialLinks.email })
  }

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is our own admin-authored data, not raw user
      // input, but `<` is escaped anyway so a stray value can't break out
      // of the script tag.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c')
      }}
    />
  )
}
