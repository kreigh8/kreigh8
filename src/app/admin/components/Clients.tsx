'use client'

import { DataTable } from '@/components/DataTable'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { Pencil } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface Props {
  clients: Client[]
}

export interface Client {
  _id: string
  clientName: string
  active: 'true' | 'false'
  clientUrl: string
  imageUrl: string
  user: string
  lastUpdated: Date
}

const columns: ColumnDef<Client>[] = [
  {
    accessorKey: 'clientName',
    header: 'Client'
  },
  {
    accessorKey: 'clientUrl',
    header: 'Client URL',
    cell: ({ row }) => (
      <a className="link" href={row.getValue('clientUrl')} target="_blank">
        {row.getValue('clientUrl')}
      </a>
    )
  },
  {
    accessorKey: 'active',
    header: 'Active'
  },
  {
    accessorKey: 'imageUrl',
    header: 'Image',
    cell: ({ row }) => (
      <AspectRatio ratio={16 / 9}>
        <Image
          width={64}
          height={280}
          alt={row.original.clientName}
          src={row.original.imageUrl}
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

const Clients = ({ clients }: Props) => {
  return (
    <div>
      <DataTable columns={columns} data={clients} />
    </div>
  )
}

export default Clients
