import AdminSidebar from '@/components/AdminSidebar'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import Technologies from './(components)/Technologies'

function TechnologyPage() {
  return (
    <main className="flex h-[calc(100vh-60px)]">
      <AdminSidebar />
      <section className="flex w-full flex-col p-4">
        <div className="flex justify-between">
          <h1>Technology</h1>

          <Button asChild>
            <Link href="/admin/technology/new">
              <Plus /> Add
            </Link>
          </Button>
        </div>

        <Technologies />
      </section>
    </main>
  )
}

export default TechnologyPage
