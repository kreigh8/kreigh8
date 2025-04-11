import AdminSidebar from '@/components/AdminSidebar'
import { getTechnology } from '@/lib/actions/technology/get-tech'
import { TechnologyForm } from '../(components)/TechnologyForm'

async function EditTechnology({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const technology = await getTechnology(id)

  return (
    <main className="flex h-full min-h-[calc(100svh-53px)]">
      <div className="flex gap-4">
        <AdminSidebar />
        <section className="flex w-full flex-col p-4">
          <div className="flex">
            <h1>Edit {technology.techName}</h1>
          </div>
          <TechnologyForm technology={technology} />
        </section>
      </div>
    </main>
  )
}

export default EditTechnology
