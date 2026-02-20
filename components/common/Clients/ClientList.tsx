'use client'

import { api } from '@/convex/_generated/api'
import { Preloaded, usePreloadedQuery } from 'convex/react'
import Client from './Client'

export default function ClientList(props: {
  preloadedClients: Preloaded<typeof api.clients.listClients>
}) {
  const clients = usePreloadedQuery(props.preloadedClients)

  if (clients.length === 0) {
    return <p>No clients found.</p>
  }

  return (
    <article className="grid grid-cols-3 gap-4">
      {clients.map((client) => (
        <Client key={client._id} client={client} />
      ))}
    </article>
  )
}
