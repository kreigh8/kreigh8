'use client'

import { api } from '@/convex/_generated/api'
import { Preloaded, usePreloadedQuery } from 'convex/react'
import ExperienceListItem from './ExperienceListItem'

export default function ExperienceList(props: {
  preloadedExperiences: Preloaded<typeof api.experience.listExperience>
}) {
  const experiences = usePreloadedQuery(props.preloadedExperiences)

  if (!experiences) {
    return <p>No experiences found.</p>
  }

  return (
    <ul className="flex flex-col gap-4">
      {experiences.map((experience) => (
        <ExperienceListItem key={experience._id} experience={experience} />
      ))}
    </ul>
  )
}
