import { getTechnologies } from '@/lib/actions/technology/get-tech'
import { ITechnology } from '@/model/Technology'
import { TechCard } from './TechCard'

async function TechnologyList() {
  const technologies: ITechnology[] = await getTechnologies()

  return (
    <div className="flex w-full flex-col py-4">
      <h1 className="text-bold text-xl">Technologies</h1>
      <section className="lg:grid-col-4 mt-4 grid grid-cols-2 gap-2 md:grid-cols-5">
        {technologies.map((technology) => (
          <TechCard key={technology._id} technology={technology} />
        ))}
      </section>
    </div>
  )
}

export default TechnologyList
