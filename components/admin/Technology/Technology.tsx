import { api } from '@/convex/_generated/api'
import { preloadQuery } from 'convex/nextjs'
import TechnologyTable from './TechnologyTable'

export default async function Technologies() {
  const preloadedTechnologies = await preloadQuery(
    api.technology.listTechnologies,
    {}
  )

  return <TechnologyTable preloadedTechnologies={preloadedTechnologies} />
}
