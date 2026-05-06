import ExperienceTable from '@/components/experience/ExperienceTable'
import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { preloadQuery } from 'convex/nextjs'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export default async function Experience() {
  const preloadedExperience = await preloadQuery(
    api.experience.listExperience,
    {}
  )

  return (
    <section className="flex flex-col gap-4">
      <div className="flex justify-between">
        <h1>Experience Page</h1>
        <Button asChild>
          <Link href="/admin/experience/new">
            <Plus /> Add
          </Link>
        </Button>
      </div>
      <ExperienceTable preloadedExperience={preloadedExperience} />
    </section>
  )
}
