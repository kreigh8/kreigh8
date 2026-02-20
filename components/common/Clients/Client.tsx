'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Id } from '@/convex/_generated/dataModel'
import Image from 'next/image'

export default function Client({
  client
}: {
  client: {
    _id: Id<'clients'>
    _creationTime: number
    name: string
    url: string
    imageId: Id<'images'>
    active: boolean
    imageUrl: string | null
  }
}) {
  return (
    <Card className="p-2 gap-2">
      <a href={client.url} target="_blank" rel="noopener noreferrer">
        <CardContent className="flex px-0 justify-center">
          <Image
            src={client.imageUrl as string}
            alt={client.name}
            width={100}
            height={100}
          />
        </CardContent>
      </a>
    </Card>
  )
}
