'use client'

import { Card, CardContent } from '@/components/ui/card'
import { IClient } from '@/model/Client'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  client: IClient
}

export function ClientCard({ client }: Props) {
  return (
    <Card className="justify-center py-4">
      <CardContent>
        <Link href={client.clientUrl} target="_blank">
          <div className="flex items-center justify-center gap-4">
            <Image
              src={client.imageUrl}
              alt={client.clientName}
              width={60}
              height={60}
              className="object-over"
            />

            <h3 className="text-bold text-lg">{client.clientName}</h3>
          </div>
        </Link>
      </CardContent>
    </Card>
  )
}
