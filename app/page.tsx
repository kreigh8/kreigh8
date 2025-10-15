import Blurb from '@/components/Blurb'

export default function Home() {
  return (
    <>
      <main className="container mx-auto grid grid-cols-1 gap-4 my-4">
        <section className="flex gap-4 w-full">
          <article className="flex flex-col w-full gap-4">
            <h1 className="text-4xl font-bold">Welcome to kreigh8</h1>
            <Blurb />
          </article>

          <article className="flex flex-col w-full"></article>
        </section>
      </main>
    </>
  )
}
