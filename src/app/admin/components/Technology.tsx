'use client'

import { DataTable } from '@/components/DataTable'
import { Button } from '@/components/ui/button'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import { ColumnDef } from '@tanstack/react-table'
import { Pencil } from 'lucide-react'
import { useRouter } from 'next/router'
import Image from 'next/image'

interface Props {
  technologies: Technology[]
}

export interface Technology {
  _id: string
  techName: string
  techUrl: string
  imageUrl: string
  lastUpdated: Date
}

const columns: ColumnDef<Technology>[] = [
  {
    accessorKey: 'techName',
    header: 'Technology'
  },
  {
    accessorKey: 'techUrl',
    header: 'Tech URL',
    cell: ({ row }) => (
      <a className="link" href={row.original.techUrl} target="_blank">
        {row.original.techName}
      </a>
    )
  },
  {
    accessorKey: 'imageUrl',
    header: 'Image',
    cell: ({ row }) => (
      <AspectRatio ratio={16 / 9}>
        <Image
          width={64}
          height={280}
          alt={row.original.techName}
          src={row.original.techUrl}
          className="h-full w-full rounded-md object-cover"
        />
      </AspectRatio>
    )
  },
  {
    id: 'actions',
    size: 100,
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const router = useRouter()
      return (
        <div className="flex justify-center space-x-2">
          <Button
            size="icon"
            onClick={() =>
              router.push(
                `/admin/clients/${encodeURIComponent(row.original._id)}`
              )
            }
          >
            <Pencil />
          </Button>
          {/* <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size='icon'><Trash /></Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to delete {row.getValue('clientName')}
                </AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogDescription>
                This action will delete the client from the database.
              </AlertDialogDescription>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => deleteClient(row.original)}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog> */}
        </div>
      )
    }
  }
]

const Technology = ({ technologies }: Props) => {
  return (
    <div>
      <DataTable columns={columns} data={technologies} />
    </div>
  )
}

export default Technology
