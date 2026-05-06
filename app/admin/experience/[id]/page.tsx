import ExperienceForm from '@/components/forms/ExperienceForm'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { preloadQuery } from 'convex/nextjs'

export default async function EditExperiencePage(
  props: PageProps<'/admin/experience/[id]'>
) {
  const { id } = (await props.params) as { id: Id<'experience'> }

  const preloadedExperience = await preloadQuery(api.experience.getExperience, {
    id
  })

  return (
    <section className="flex flex-col gap-4">
      <h1>Edit Experience</h1>

      <ExperienceForm preloadedExperience={preloadedExperience} />
    </section>
  )
}
