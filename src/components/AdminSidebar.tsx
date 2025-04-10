import Link from 'next/link'

function AdminSidebar() {
  return (
    <aside className="bg-accent hidden h-screen min-w-[15%] flex-col py-4 md:flex">
      <Link href="/admin/technology">Technology</Link>
    </aside>
  )
}

export default AdminSidebar
