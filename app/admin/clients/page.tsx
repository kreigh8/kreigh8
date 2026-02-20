import Clients from '@/components/admin/Clients/Clients'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export default function AdminClientPage() {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex justify-between">
        <h1>Clients Page</h1>
        <Button asChild>
          <Link href="/admin/clients/new">
            <Plus /> Add
          </Link>
        </Button>
      </div>

      <Clients />
    </section>
  )
}
