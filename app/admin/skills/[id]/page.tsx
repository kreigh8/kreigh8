import EditSkillForm from '@/components/forms/EditSkillForm'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { preloadQuery } from 'convex/nextjs'

export default async function EditSkillPage(
  props: PageProps<'/admin/skills/[id]'>
) {
  const { id } = (await props.params) as { id: Id<'skills'> }

  const preloadedSkill = await preloadQuery(api.skills.getSkill, {
    id
  })

  console.log('Editing skill:', preloadedSkill)

  return (
    <section className="flex flex-col gap-4">
      <h1>Edit Skill</h1>

      <EditSkillForm preloadedSkill={preloadedSkill} />
    </section>
  )
}
