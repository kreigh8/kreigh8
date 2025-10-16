import TechnologyForm from '@/components/forms/TechnologyForm'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { fetchQuery } from 'convex/nextjs'

export default async function EditTechnologyPage(
  props: PageProps<'/admin/technology/[id]'>
) {
  const { id } = (await props.params) as { id: Id<'technologies'> }

  const technology = await fetchQuery(api.technology.getTechnology, {
    id
  })

  console.log('Editing technology:', technology)

  return (
    <section className="flex flex-col gap-4">
      <h1>Edit Technology</h1>

      <TechnologyForm />
    </section>
  )
}
