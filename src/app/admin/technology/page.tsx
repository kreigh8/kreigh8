import AdminSidebar from '@/components/AdminSidebar'
import { Button } from '@/components/ui/button'
// import { getTechnologies } from '@/lib/actions/get-tech'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import Technologies from './(components)/Technologies'

function TechnologyPage() {
  return (
    <main className="min-h-screen">
      <div className="flex gap-4">
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

          <article>
            <Technologies />
          </article>
        </section>
      </div>
    </main>
  )
}

export default TechnologyPage
