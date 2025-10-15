import TechnologyForm from '@/components/forms/TechnologyForm'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { preloadQuery } from 'convex/nextjs'

export default async function EditTechnologyPage(
  props: PageProps<'/admin/technology/[id]'>
) {
  const { id } = (await props.params) as { id: Id<'technologies'> }

  console.log('id', id)

  const preloadedTechnology = await preloadQuery(api.technology.getTechnology, {
    id
  })

  console.log('preloadedTechnology', preloadedTechnology)

  return (
    <section className="flex flex-col gap-4">
      <h1>Edit Client</h1>

      <TechnologyForm />
    </section>
  )
}
