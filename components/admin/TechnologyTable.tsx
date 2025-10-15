'use client'

import { Preloaded, usePreloadedQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { DataTable } from '@/components/DataTable'
import { ColumnDef } from '@tanstack/react-table'
import { Button } from '../ui/button'
import { Pencil, Trash } from 'lucide-react'

type Technology = {
  name: string
  url: string
  imageUrl: string | null
}

export const columns: ColumnDef<Technology>[] = [
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
    accessorKey: 'actions',
    header: undefined,
    maxSize: 80,
    cell: () => {
      return (
        <div className="flex justify-end gap-2">
          <Button>
            <Pencil />
          </Button>
          <Button>
            <Trash />
          </Button>
        </div>
      )
    }
  }
]

export default function Technologies(props: {
  preloadedTechnologies: Preloaded<typeof api.technology.listTechnologies>
}) {
  const clients = usePreloadedQuery(props.preloadedTechnologies)

  return <DataTable data={clients} columns={columns} />
}
