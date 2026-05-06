import ActionButtons from '@/components/ActionButtons'
import HomeImage from '@/components/HomeImage'
import { flag } from 'flags/next'
import { vercelAdapter } from '@flags-sdk/vercel'
import TitleBlurb from '@/components/TitleBlurb'
import NavigationButtons from '@/components/NavigationButtons'
import About from '@/components/About'

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
    <section className="grid grid-cols-1 md:grid-cols-2 md:h-[calc(100dvh-2rem)] gap-6 p-2">
      <article className="flex flex-col items-center justify-center gap-4">
        <TitleBlurb />
        <ActionButtons />
        <NavigationButtons />
      </article>

      <article className="flex flex-col gap-4 md:overflow-y-auto md:h-full md:mt-8 pb-4 md:pb-0">
        <About />
      </article>
    </section>
  )
}
