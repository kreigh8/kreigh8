'use client'

import { Card, CardContent } from '@/components/ui/card'

import { ITechnology } from '@/model/Technology'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  technology: ITechnology
}

export function TechCard({ technology }: Props) {
  return (
    <Card className="justify-center py-4">
      <CardContent>
        <Link href={technology.techUrl} target="_blank">
          <div className="flex items-center justify-center gap-4">
            <div className="bg-accent-background over relative flex h-[60px] w-[60px] items-center justify-center overflow-hidden rounded-full p-1">
              <Image
                src={technology.imageUrl}
                alt={technology.techName}
                width={60}
                height={60}
                className="object-cover"
              />
            </div>

            <h3 className="text-bold text-sm md:text-lg">
              {technology.techName}
            </h3>
          </div>
        </Link>
      </CardContent>
    </Card>
  )
}
