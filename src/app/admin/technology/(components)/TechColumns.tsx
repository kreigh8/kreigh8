'use client'

import { Button } from '@/components/ui/button'
import { ITechnology } from '@/model/Technology'
import { ColumnDef } from '@tanstack/react-table'
import { Pencil } from 'lucide-react'
import { useRouter } from 'next/navigation'

export const TechColumns: ColumnDef<ITechnology>[] = [
  {
    accessorKey: 'techName',
    header: 'Technology Name'
  },
  {
    accessorKey: 'techUrl',
    header: 'Technology URL',
    cell: ({ row }) => (
      <a
        href={row.original.techUrl}
        aria-label={row.original.techName}
        target="_blank"
      >
        {row.original.techUrl}
      </a>
    )
  },
  {
    accessorKey: 'imageUrl',
    header: 'Image URL',
    cell: ({ row }) => (
      <img
        src={row.original.imageUrl}
        alt={row.original.techName}
        className="max-h-20 max-w-20 object-cover"
      />
    )
  },
  {
    accessorKey: 'actions',
    header: undefined,
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const router = useRouter()

      return (
        <Button
          onClick={() => router.push(`/admin/technology/${row.original._id}`)}
        >
          <Pencil />
        </Button>
      )
    }
  }
]
