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
import { ITechnology } from '@/model/Technology'
import { ColumnDef } from '@tanstack/react-table'
import { Pencil, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { deleteTechnology } from '@/lib/actions/delete-tech'

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

      const handleClick = async () => {
        deleteTechnology(row.original._id)
      }

      return (
        <div className="flex gap-2">
          <Button
            onClick={() => router.push(`/admin/technology/${row.original._id}`)}
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
                  Are you sure you want to delete this technolgy?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  technology and remove the data from the database.
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
