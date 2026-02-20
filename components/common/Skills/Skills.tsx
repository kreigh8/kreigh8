import { api } from '@/convex/_generated/api'
import { preloadQuery } from 'convex/nextjs'
import SkillList from './SkillList'

export default async function Skills() {
  const preloadedSkills = await preloadQuery(api.skills.listSkills, {})

  return (
    <section>
      <h1>Skills</h1>
      <SkillList preloadedSkills={preloadedSkills} />
    </section>
  )
}
