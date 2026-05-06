import ActionButtons from '@/components/ActionButtons'
import HomeImage from '@/components/HomeImage'
import { flag } from 'flags/next'
import { vercelAdapter } from '@flags-sdk/vercel'
import TitleBlurb from '@/components/TitleBlurb'

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
    <>
      <main className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <article className="flex flex-col w-full gap-4">
            <TitleBlurb />
            <ActionButtons />
          </article>
        </section>
      </main>
    </>
  )
}
