import Skills from '@/components/admin/Skills/Skills'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export default function AdminSkillsPage() {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex justify-between">
        <h1>Skills Page</h1>
        <Button asChild>
          <Link href="/admin/skills/new">
            <Plus /> Add
          </Link>
        </Button>
      </div>

      <Skills />
    </section>
  )
}
