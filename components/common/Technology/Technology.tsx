import { api } from '@/convex/_generated/api'
import { preloadQuery } from 'convex/nextjs'
import TechnologyList from './TechnologyList'

export default async function Clients() {
  const preloadedTechnology = await preloadQuery(
    api.technology.listTechnologies,
    {}
  )

  return (
    <section className="flex flex-col w-full gap-2">
      <h1>Technologies</h1>
      <TechnologyList preloadedTechnology={preloadedTechnology} />
    </section>
  )
}
