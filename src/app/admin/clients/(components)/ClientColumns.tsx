'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { Pencil, Trash } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { IClient } from '@/model/Client'
import { deleteClient } from '@/lib/actions/client/delete-client'

export const ClientColumns: ColumnDef<IClient>[] = [
  {
    accessorKey: 'clientName',
    header: 'Client Name'
  },
  {
    accessorKey: 'clientUrl',
    header: 'Client URL',
    cell: ({ row }) => (
      <a
        href={row.original.clientUrl}
        aria-label={row.original.clientName}
        target="_blank"
      >
        {row.original.clientUrl}
      </a>
    )
  },
  {
    accessorKey: 'imageUrl',
    header: 'Image URL',
    cell: ({ row }) => (
      <Image
        src={row.original.imageUrl}
        alt={row.original.clientName}
        width={80}
        height={80}
        className="object-cover"
      />
    )
  },
  {
    accessorKey: 'actions',
    header: undefined,
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const router = useRouter()

      const handleClick = async () => {
        deleteClient(row.original._id)
      }

      return (
        <div className="flex gap-2">
          <Button
            onClick={() => router.push(`/admin/clients/${row.original._id}`)}
          >
            <Pencil />
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">
                <Trash />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to delete this client?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  client and remove the data from the database.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleClick}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )
    }
  }
]
