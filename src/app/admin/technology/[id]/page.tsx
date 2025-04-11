import AdminSidebar from '@/components/AdminSidebar'
import { getTechnology } from '@/lib/actions/get-tech'
import { TechnologyForm } from '../(components)/TechnologyForm'

async function EditTechnology({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const technology = await getTechnology(id)

  return (
    <main className="min-h-screen">
      <div className="flex gap-4">
        <AdminSidebar />
        <section className="flex w-full flex-col p-4">
          <div className="flex">
            <h1>Create New Technology</h1>
          </div>
          <TechnologyForm technology={technology} />
        </section>
      </div>
    </main>
  )
}

export default EditTechnology
