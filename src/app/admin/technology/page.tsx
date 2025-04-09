import Link from 'next/link'
import BackButton from '../components/BackButton'
import Sidebar from '../components/Sidebar'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export default function TechnolgiesHome() {
  return (
    <div className="m-auto flex min-h-screen w-full max-w-[1400px] gap-2">
      <Sidebar />
      <main className="flex w-full flex-col gap-4 p-4">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <BackButton />
            <h1>Technology Page</h1>
          </div>

          <Button asChild>
            <Link href="/admin/technology/create">
              Create <Plus />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
