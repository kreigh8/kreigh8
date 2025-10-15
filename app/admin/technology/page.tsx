import Technology from '@/components/admin/Technology'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export default function AdminTechnologyPage() {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex justify-between">
        <h1>Technology Page</h1>
        <Button>
          <Plus /> Add
        </Button>
      </div>

      <Technology />
    </section>
  )
}
