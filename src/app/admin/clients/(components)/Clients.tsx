import { DataTable } from '@/components/DataTable'
import { getClients } from '@/lib/actions/client/get-client'
import { ClientColumns } from './ClientColumns'

async function Clients() {
  const clients = await getClients()

  return (
    <article className="mt-4">
      <DataTable columns={ClientColumns} data={clients} />
    </article>
  )
}

export default Clients
