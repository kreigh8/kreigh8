// import { TechnologyForm } from '@/components/TechnologyForm'
// import Image from 'next/image'

import TechnologyList from './(components)/Technologies'

export default function Home() {
  return (
    <div className="@container px-4 py-2">
      <main className="mx-auto lg:max-w-[1400px]">
        <section className="grid gap-2 md:grid-cols-2">
          <article>Left</article>

          <article>Right</article>
        </section>

        <TechnologyList />
      </main>
    </div>
  )
}
