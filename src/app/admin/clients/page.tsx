import AdminSidebar from '@/components/AdminSidebar'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import Clients from './(components)/Clients'

function ClientsPage() {
  return (
    <main className="flex h-full min-h-[calc(100svh-53px)]">
      <AdminSidebar />
      <section className="flex w-full flex-col p-4">
        <div className="flex justify-between">
          <h1>Clients</h1>

          <Button asChild>
            <Link href="/admin/clients/new">
              <Plus /> Add
            </Link>
          </Button>
        </div>

        <Clients />
      </section>
    </main>
  )
}

export default ClientsPage
