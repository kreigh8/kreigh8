'use client'

import { Card, CardContent } from '@/components/ui/card'
import { api } from '@/convex/_generated/api'
import { Preloaded, usePreloadedQuery } from 'convex/react'
import Image from 'next/image'

export default function TechnologyList(props: {
  preloadedTechnology: Preloaded<typeof api.technology.listTechnologies>
}) {
  const technologies = usePreloadedQuery(props.preloadedTechnology)

  if (technologies.length === 0) {
    return <p>No technologies found.</p>
  }

  return (
    <article className="flex gap-4">
      {technologies.map((technology) => (
        <Card key={technology._id.toString()} className="h-full">
          <CardContent className="flex items-center justify-center min-h-10">
            <a href={technology.url} target="_blank" rel="noopener noreferrer">
              <Image
                src={technology.imageUrl as string}
                alt={`${technology.name} logo`}
                className="grayscale"
                width={40}
                height={40}
              />
            </a>
          </CardContent>
        </Card>
      ))}
    </article>
  )
}
