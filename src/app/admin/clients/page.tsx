import AdminSidebar from '@/components/AdminSidebar'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'

function ClientsPage() {
  return (
    <main className="min-h-screen">
      <div className="flex gap-4">
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
        </section>
      </div>
    </main>
  )
}

export default ClientsPage
