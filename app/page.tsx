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

export default async function Home() {
  const showUnderConstruction = (await underConstruction()) as boolean

  if (showUnderConstruction) {
    return (
      <section className="container mx-auto grid grid-cols-1 items-center gap-4">
        <article className="flex flex-col items-center gap-4">
          <HomeImage />

          <h1 className="text-4xl font-bold text-center">
            Site Under Construction
          </h1>
        </article>
      </section>
    )
  }

  return (
    <section className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 p-2 py-4">
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
