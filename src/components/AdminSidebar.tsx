import { Boxes, Cpu, House } from 'lucide-react'
import Link from 'next/link'

function AdminSidebar() {
  return (
    <aside className="bg-accent hidden min-w-[15%] flex-col gap-4 px-4 py-4 md:flex">
      <Link href="/admin" className="flex items-center gap-2">
        <House /> Home
      </Link>
      <Link href="/admin/clients" className="flex items-center gap-2">
        <Boxes />
        Clients
      </Link>
      <Link href="/admin/technology" className="flex items-center gap-2">
        <Cpu />
        Technology
      </Link>
    </aside>
  )
}

export default AdminSidebar
