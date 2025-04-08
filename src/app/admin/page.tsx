import Container from '@/components/Container'
import { House } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <Container>
      <div className="mt-4 flex w-full gap-2">
        <aside className="w-[20%]">
          <Link href="/admin/clients" className="flex gap-2">
            <House /> Clients
          </Link>
        </aside>
        <main>
          <h1>Dashboard Page</h1>
        </main>
      </div>
    </Container>
  )
}
