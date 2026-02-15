'use client'

import { api } from '@/convex/_generated/api'
import { Preloaded, usePreloadedQuery } from 'convex/react'

export default function TechnologyList(props: {
  preloadedTechnology: Preloaded<typeof api.technology.listTechnologies>
}) {
  const technologies = usePreloadedQuery(props.preloadedTechnology)

  if (technologies.length === 0) {
    return <p>No technologies found.</p>
  }

  return (
    <section>
      {technologies.map((technology) => (
        <div
          key={technology._id.toString()}
          className="mb-4 p-4 border rounded"
        >
          <h2 className="text-xl font-bold">{technology.name}</h2>
        </div>
      ))}
    </section>
  )
}
