import { getClients } from '@/lib/actions/client/get-client'
import { IClient } from '@/model/Client'
import { ClientCard } from './ClientCard'

async function ClientList() {
  const clients: IClient[] = await getClients()

  return (
    <div className="flex w-full flex-col py-4">
      <h1 className="text-bold text-xl">Clients</h1>
      <section className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-5">
        {clients.map((client) => (
          <ClientCard key={client._id} client={client} />
        ))}
      </section>
    </div>
  )
}

export default ClientList
