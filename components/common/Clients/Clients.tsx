import { api } from '@/convex/_generated/api'
import { preloadQuery } from 'convex/nextjs'
import ClientList from './ClientList'

export default async function Clients() {
  const preloadedClients = await preloadQuery(api.clients.listClients, {})

  return (
    <section>
      <h1>Clients</h1>
      <ClientList preloadedClients={preloadedClients} />
    </section>
  )
}
