import { Boxes, Cpu, File, House } from 'lucide-react'
import Link from 'next/link'

function AdminSidebar() {
  return (
    <aside className="bg-accent-background relative hidden min-w-[15%] flex-col px-4 py-4 md:flex">
      <div className="sticky top-[73px] flex flex-col gap-4">
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
        <Link href="/admin/resume" className="flex items-center gap-2">
          <File />
          Resume
        </Link>
      </div>
    </aside>
  )
}

export default AdminSidebar
