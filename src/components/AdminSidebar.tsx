import Link from 'next/link'

function AdminSidebar() {
  return (
    <aside className="bg-accent hidden h-screen min-w-[15%] flex-col px-4 py-4 md:flex">
      <Link href="/admin/technology">Technology</Link>
    </aside>
  )
}

export default AdminSidebar
