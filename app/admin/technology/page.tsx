import Technology from '@/components/admin/Technology'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export default function AdminTechnologyPage() {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex justify-between">
        <h1>Technology Page</h1>
        <Button asChild>
          <Link href="/admin/technology/new">
            <Plus /> Add
          </Link>
        </Button>
      </div>

      <Technology />
    </section>
  )
}
