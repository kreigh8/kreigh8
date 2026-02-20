import EditTechnologyForm from '@/components/forms/EditTechnologyForm'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { preloadQuery } from 'convex/nextjs'

export default async function EditTechnologyPage(
  props: PageProps<'/admin/technology/[id]'>
) {
  const { id } = (await props.params) as { id: Id<'technologies'> }

  const preloadedTechnology = await preloadQuery(api.technology.getTechnology, {
    id
  })

  console.log('Editing technology:', preloadedTechnology)

  return (
    <section className="flex flex-col gap-4">
      <h1>Edit Technology</h1>

      <EditTechnologyForm preloadedTechnology={preloadedTechnology} />
    </section>
  )
}
