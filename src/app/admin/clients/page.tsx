import { Button } from '@/components/ui/button'
import Clients from '../components/Clients'
import Sidebar from '../components/Sidebar'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import BackButton from '../components/BackButton'

export default async function ClientsHome() {
  const base_url =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://kreigh8.vercel.app'

  const data = await fetch(`${base_url}/api/clients`)

  const { clients } = await data.json()

  return (
    <div className="m-auto flex min-h-max w-full max-w-[1400px] gap-2">
      <Sidebar />
      <main className="flex w-full flex-col gap-4 p-4">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <BackButton />
            <h1>Clients Page</h1>
          </div>

          <Button asChild>
            <Link href="/admin/clients/create">
              Create <Plus />
            </Link>
          </Button>
        </div>

        <section>
          <Clients clients={clients} />
        </section>
      </main>
    </div>
  )
}
