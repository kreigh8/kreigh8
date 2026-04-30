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
        <Card className="p-2 gap-2" key={technology._id.toString()}>
          <a href={technology.url} target="_blank" rel="noopener noreferrer">
            <CardContent className="flex flex-col px-0 justify-center items-center">
              <Image
                src={technology.imageUrl as string}
                alt={technology.name}
                width={40}
                height={40}
              />
            </CardContent>
          </a>
        </Card>
      ))}
    </article>
  )
}
