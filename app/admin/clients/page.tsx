import Clients from '@/components/admin/Clients'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export default function AdminClientPage() {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex justify-between">
        <h1>Clients Page</h1>
        <Button>
          <Plus /> Add
        </Button>
      </div>

      <Clients />
    </section>
  )
}
