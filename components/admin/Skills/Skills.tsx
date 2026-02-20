import { api } from '@/convex/_generated/api'
import { preloadQuery } from 'convex/nextjs'
import SkillsTable from './SkillsTable'

export default async function Skills() {
  const preloadedSkills = await preloadQuery(api.skills.listSkills, {})

  return <SkillsTable preloadedSkills={preloadedSkills} />
}
