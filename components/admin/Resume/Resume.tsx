import ResumeForm from '@/components/forms/ResumeForm'
import { api } from '@/convex/_generated/api'
import { preloadQuery } from 'convex/nextjs'

export default async function Resume() {
  const preloadedResume = await preloadQuery(api.resume.getResume)

  return (
    <section className="flex flex-col gap-4">
      <h1>Resume</h1>

      <ResumeForm preloadedResume={preloadedResume} />
    </section>
  )
}
