'use client'

import { api } from '@/convex/_generated/api'
import { Preloaded, usePreloadedQuery } from 'convex/react'

export default function ClientList(props: {
  preloadedClients: Preloaded<typeof api.clients.listClients>
}) {
  const clients = usePreloadedQuery(props.preloadedClients)

  if (clients.length === 0) {
    return <p>No clients found.</p>
  }

  return (
    <section>
      {clients.map((client) => (
        <div key={client._id.toString()} className="mb-4 p-4 border rounded">
          <h2 className="text-xl font-bold">{client.name}</h2>
        </div>
      ))}
    </section>
  )
}
