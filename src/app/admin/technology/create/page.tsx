// import { Button } from '@/components/ui/button'
// import { Link, Plus } from 'lucide-react'
import BackButton from '../../components/BackButton'
import Sidebar from '../../components/Sidebar'

export default function CreateHome() {
  return (
    <div className="m-auto flex min-h-screen w-full max-w-[1400px] gap-2">
      <Sidebar />
      <main className="flex w-full flex-col gap-4 p-4">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <BackButton />
            <h1>Create Technolgoy</h1>
          </div>
        </div>

        <section></section>
      </main>
    </div>
  )
}
