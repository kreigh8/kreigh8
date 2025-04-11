import AdminSidebar from '@/components/AdminSidebar'
import { ClientForm } from '../(components)/ClientForm'
import { getClient } from '@/lib/actions/client/get-client'

async function EditTechnology({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  console.log('id', id)

  const client = await getClient(id)

  return (
    <main className="flex h-full min-h-[calc(100svh-53px)]">
      <div className="flex gap-4">
        <AdminSidebar />
        <section className="flex w-full flex-col p-4">
          <div className="flex">
            <h1>Edit</h1>
          </div>
          <ClientForm client={client} />
        </section>
      </div>
    </main>
  )
}

export default EditTechnology
