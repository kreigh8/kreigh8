import { Card, CardContent } from '@/components/ui/card'
import { IClient } from '@/model/Client'
import AnimatedClient from './AnimatedClient'

type Props = {
  client: IClient
}

export function ClientCard({ client }: Props) {
  return (
    <Card className="justify-center py-4">
      <CardContent>
        <AnimatedClient client={client} />
      </CardContent>
    </Card>
  )
}
