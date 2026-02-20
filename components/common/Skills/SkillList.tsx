'use client'
import { api } from '@/convex/_generated/api'
import { Preloaded, usePreloadedQuery } from 'convex/react'

export default function SkillList(props: {
  preloadedSkills: Preloaded<typeof api.skills.listSkills>
}) {
  const skills = usePreloadedQuery(props.preloadedSkills)

  if (skills.length === 0) {
    return <p>No skills found.</p>
  }

  return (
    <section>
      {skills.map((skill) => (
        <div key={skill._id.toString()} className="mb-4 p-4 border rounded">
          <h2 className="text-xl font-bold">{skill.name}</h2>
        </div>
      ))}
    </section>
  )
}
