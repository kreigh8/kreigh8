import { api } from '@/convex/_generated/api'
import { preloadQuery } from 'convex/nextjs'
import ExperienceList from './ExperienceList'

export default async function Experience() {
  const preloadedExperiences = await preloadQuery(
    api.experience.listExperience,
    {}
  )

  return (
    <section id="experience" className="flex flex-col md:my-24 gap-4">
      <ExperienceList preloadedExperiences={preloadedExperiences} />
    </section>
  )
}
