'use client'

import { Card, CardContent } from '@/components/ui/card'

import { ITechnology } from '@/model/Technology'
import Image from 'next/image'

type Props = {
  technology: ITechnology
}

export function TechCard({ technology }: Props) {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-center gap-4">
          <Image
            src={technology.imageUrl}
            alt={technology.techName}
            width={80}
            height={80}
            className="object-over"
          />

          <h3 className="text-bold text-2xl">{technology.techName}</h3>
        </div>
      </CardContent>
    </Card>
  )
}
