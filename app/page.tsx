import ActionButtons from '@/components/ActionButtons'
import Blurb from '@/components/Blurb'
import Clients from '@/components/common/Clients/Clients'
import Skills from '@/components/common/Skills/Skills'
import Technology from '@/components/common/Technology/Technology'
import ContactMe from '@/components/ContactMe'
import HomeImage from '@/components/HomeImage'
import { flag } from 'flags/next'
import { vercelAdapter } from '@flags-sdk/vercel'

export const contactMe = flag({
  key: 'contact-me',
  adapter: vercelAdapter()
})

export default async function Home() {
  const showContactMe = (await contactMe()) as boolean

  return (
    <>
      <main className="container mx-auto grid grid-cols-1 gap-4">
        <section className="grid grid-cols-1  md:grid-cols-2 gap-4 w-full">
          <article className="flex flex-col w-full gap-4">
            <h1 className="text-4xl font-bold">Welcome to kreigh8</h1>
            <Blurb />

            <ActionButtons />
          </article>

          <article className="flex flex-col w-full">
            <HomeImage />
          </article>
        </section>

        <Clients />

        <Skills />

        <Technology />

        {showContactMe && <ContactMe />}
      </main>
    </>
  )
}
