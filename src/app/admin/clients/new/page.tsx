import AdminSidebar from '@/components/AdminSidebar'

function CreateClientPage() {
  return (
    <main className="flex h-[calc(100vh-60px)]">
      <AdminSidebar />
      <section className="flex w-full flex-col p-4">
        <div className="flex">
          <h1>Create New Client</h1>
        </div>
        {/* <TechnologyForm /> */}
      </section>
    </main>
  )
}

export default CreateClientPage
