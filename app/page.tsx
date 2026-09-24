import type { Metadata } from 'next'
import { fetchQuery } from 'convex/nextjs'
import { api } from '@/convex/_generated/api'
import ActionButtons from '@/components/ActionButtons'
import HomeImage from '@/components/HomeImage'
import { flag } from 'flags/next'
import { vercelAdapter } from '@flags-sdk/vercel'
import TitleBlurb from '@/components/TitleBlurb'
import NavigationButtons from '@/components/NavigationButtons'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Footer from '@/components/Footer'

export const contactMe = flag({
  key: 'contact-me',
  adapter: vercelAdapter()
})

export const underConstruction = flag({
  key: 'under-construction',
  adapter: vercelAdapter()
})

// Keeps the page's title/description in sync with the same home blurb
// content editable from /admin, instead of a hardcoded string that drifts
// from what's actually on the page.
export async function generateMetadata(): Promise<Metadata> {
  const homeBlurb = await fetchQuery(api.home.getHomeBlurb, {})

  const title = homeBlurb?.title || 'kreigh8'
  const description = homeBlurb?.slogan || 'Portfolio site for Kreigh Hirschy'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      siteName: 'kreigh8'
    },
    twitter: {
      card: 'summary',
      title,
      description
    }
  }
}

export default async function Home() {
  const showUnderConstruction = (await underConstruction()) as boolean

  if (showUnderConstruction) {
    return (
      <section className="flex min-h-dvh items-center justify-center">
        <article className="flex flex-col items-center gap-4">
          <HomeImage />

          <h1 className="text-4xl font-bold text-center text-primary">
            Site Under Construction
          </h1>
        </article>
      </section>
    )
  }

  return (
    <section className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 p-4 py-4">
      <article className="flex flex-col items-start justify-center gap-4 md:sticky md:top-4 md:h-[calc(100dvh-2rem)]">
        <TitleBlurb />
        <ActionButtons />
        <NavigationButtons />
      </article>

      <article className="flex flex-col gap-4 pb-4 md:mt-8 md:pb-0">
        <About />
        <Experience />

        <Footer />
      </article>
    </section>
  )
}
