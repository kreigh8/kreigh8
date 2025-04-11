import AdminSidebar from '@/components/AdminSidebar'
import { ClientForm } from '../(components)/ClientForm'

function CreateClientPage() {
  return (
    <main className="flex h-full min-h-[calc(100svh-53px)]">
      <AdminSidebar />
      <section className="flex w-full flex-col p-4">
        <div className="flex">
          <h1>Create New Client</h1>
        </div>
        <ClientForm />
      </section>
    </main>
  )
}

export default CreateClientPage
