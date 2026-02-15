import { api } from '@/convex/_generated/api'
import { preloadQuery } from 'convex/nextjs'
import ClientsTable from './ClientsTable'

export default async function Clients() {
  const preloadedClients = await preloadQuery(api.clients.listClients, {})

  return <ClientsTable preloadedClients={preloadedClients} />
}
