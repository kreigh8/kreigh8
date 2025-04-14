import AdminSidebar from '@/components/AdminSidebar'
import { TechnologyForm } from '../(components)/TechnologyForm'

function CreateTechnologyPage() {
  return (
    <main className="flex h-full min-h-[calc(100svh-53px)]">
      <AdminSidebar />
      <section className="flex w-full flex-col p-4">
        <div className="flex">
          <h1>Create New Technology</h1>
        </div>
        <TechnologyForm />
      </section>
    </main>
  )
}

export default CreateTechnologyPage
