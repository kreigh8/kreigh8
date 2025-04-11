import AdminSidebar from '@/components/AdminSidebar'

function CreateClientPage() {
  return (
    <main className="min-h-screen">
      <div className="flex gap-4">
        <AdminSidebar />
        <section className="flex w-full flex-col p-4">
          <div className="flex">
            <h1>Create New Client</h1>
          </div>
          {/* <TechnologyForm /> */}
        </section>
      </div>
    </main>
  )
}

export default CreateClientPage
