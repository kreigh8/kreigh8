// import { TechnologyForm } from '@/components/TechnologyForm'
// import Image from 'next/image'

import ClientList from './(components)/Clients'
import TechnologyList from './(components)/Technologies'
import ContactMe from './(components)/ContactMe'
import ResumeDownload from './(components)/ResumeDownload'

export default function Home() {
  return (
    <div className="@container px-4 py-2">
      <main className="mx-auto lg:max-w-[1400px]">
        <section className="my-4 grid gap-2 md:grid-cols-2">
          <article className="flex flex-col gap-4">
            <h1 className="text-2xl md:text-3xl">Welcome to kreigh8!</h1>
            <h3>
              Hello! I&apos;m Kreigh Hirschy, a software engineer with over 10
              years of experience based in Indianapolis, Indiana.
            </h3>
            <p>
              I specialize in building clean and elegant web solutions using the
              modern technologies. I am passionate about creating efficient and
              scalable solutions that meet the needs of my clients.
            </p>

            <div className="flex justify-center gap-2">
              <ResumeDownload />

              <ContactMe />
            </div>
          </article>

          <article>Right</article>
        </section>

        <ClientList />

        <TechnologyList />
      </main>
    </div>
  )
}
