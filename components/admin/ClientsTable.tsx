'use client'

import { Preloaded, usePreloadedQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { DataTable } from '@/components/DataTable'
import { ColumnDef } from '@tanstack/react-table'
import { Check, X } from 'lucide-react'
import { EditDeleteClientCell } from './EditDeleteClientCell'
import { Id } from '@/convex/_generated/dataModel'

type Client = {
  _id: Id<'clients'>
  name: string
  url: string
  imageUrl: string | null
  active: boolean
}

const columns: ColumnDef<Client>[] = [
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'url',
    header: 'URL'
  },
  {
    accessorKey: 'imageUrl',
    header: 'Image',
    cell: ({ row }) => {
      const imageUrl = row.original.imageUrl
      return (
        <img
          src={imageUrl!}
          alt="Client Image"
          className="h-10 w-10 rounded-full object-cover"
        />
      )
    }
  },
  {
    accessorKey: 'active',
    header: 'Active',
    cell: ({ row }) => {
      if (row.original.active) {
        return <Check />
      } else {
        return <X />
      }
    }
  },
  {
    accessorKey: 'actions',
    header: undefined,
    maxSize: 80,
    cell: ({ row }) => <EditDeleteClientCell<Client> row={row} />
  }
]

export default function Clients(props: {
  preloadedClients: Preloaded<typeof api.clients.listClients>
}) {
  const clients = usePreloadedQuery(props.preloadedClients)

  return <DataTable data={clients} columns={columns} />
}
