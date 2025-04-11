import { getTechnologies } from '@/lib/actions/technology/get-tech'
import { ITechnology } from '@/model/Technology'
import { TechCard } from './TechCard'

async function TechnologyList() {
  const technologies = (await getTechnologies()) as ITechnology[]

  return (
    <section className="mt-4 grid gap-2 md:grid-cols-3 lg:grid-cols-4">
      {technologies.map((technology) => (
        <TechCard key={technology._id} technology={technology} />
      ))}
    </section>
  )
}

export default TechnologyList
