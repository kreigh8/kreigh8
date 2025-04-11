import AdminSidebar from '@/components/AdminSidebar'

export default function Admin() {
  return (
    <main className="flex h-full min-h-[calc(100svh-53px)]">
      <AdminSidebar />
      <section className="flex p-4">
        <h1>Admin</h1>
      </section>
    </main>
  )
}
