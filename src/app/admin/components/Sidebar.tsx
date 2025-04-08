import Link from 'next/link'
import { Cpu, Factory, House } from 'lucide-react'

const Sidebar = () => {
  return (
    <aside className="bg-accent flex min-h-svh w-[20%] flex-col gap-2 overflow-hidden p-4">
      <Link href="/admin" className="flex items-center gap-2">
        <House className="h-6 w-6" /> Home
      </Link>

      <Link href="/admin/clients" className="flex items-center gap-2">
        <Factory className="h-6 w-6" /> Clients
      </Link>

      <Link href="/admin/technology" className="flex items-center gap-2">
        <Cpu className="h-6 w-6" /> Tech
      </Link>
    </aside>
  )
}

export default Sidebar
