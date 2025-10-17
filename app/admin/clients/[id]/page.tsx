import EditClientForm from '@/components/forms/EditClientForm'
import EditTechnologyForm from '@/components/forms/EditTechnologyForm'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { preloadQuery } from 'convex/nextjs'

export default async function EditClientPage(
  props: PageProps<'/admin/clients/[id]'>
) {
  const { id } = (await props.params) as { id: Id<'clients'> }

  const preloadedClient = await preloadQuery(api.clients.getClient, {
    id
  })

  console.log('Editing client:', preloadedClient)

  return (
    <section className="flex flex-col gap-4">
      <h1>Edit Client</h1>

      <EditClientForm preloadedClient={preloadedClient} />
    </section>
  )
}
