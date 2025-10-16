'use client'

import { Preloaded, usePreloadedQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { DataTable } from '@/components/DataTable'
import { ColumnDef } from '@tanstack/react-table'
// import { Button } from '../ui/button'
// import { Edit, Pencil, Trash } from 'lucide-react'
// import Link from 'next/link'
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger
// } from '@/components/ui/alert-dialog'
import { EditDeleteCell } from './EditDeleteCell'

type Technology = {
  _id: string
  name: string
  url: string
  imageId: string
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
    cell: ({ row, getValue }) => (
      <EditDeleteCell<Technology>
        row={row}
        getValue={getValue}
        path="technology"
      />
    )
  }
]

export default function Technologies(props: {
  preloadedTechnologies: Preloaded<typeof api.technology.listTechnologies>
}) {
  const clients = usePreloadedQuery(props.preloadedTechnologies)

  return <DataTable data={clients} columns={columns} />
}
