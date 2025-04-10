import AdminSidebar from '@/components/AdminSidebar'

export default function Admin() {
  return (
    <main className="min-h-screen">
      <div className="flex gap-4">
        <AdminSidebar />
        <section className="flex p-4">
          <h1>Admin</h1>
        </section>
      </div>
    </main>
  )
}
