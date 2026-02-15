import { Row } from '@tanstack/react-table'
import Link from 'next/link'
import { useTransition } from 'react'
import { useImageDeleteContext } from '../../context/ImageDeleteContext'
import { Button } from '@/components/ui/button'
import {
  AlertDialogTrigger,
  AlertDialog,
  AlertDialogHeader,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogContent
} from '@/components/ui/alert-dialog'
import { Pencil, Trash } from 'lucide-react'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { toast } from 'sonner'
import { Spinner } from '../../ui/spinner'

export function EditDeleteClientCell<TData extends { _id: Id<'clients'> }>({
  row
}: {
  row: Row<TData>
}) {
  const [isPending, startTransition] = useTransition()
  const deleteClient = useMutation(api.clients.deleteClient)
  const { setImageToDelete } = useImageDeleteContext()

  return (
    <div className="flex gap-2">
      <Button asChild>
        <Link href={`/admin/clients/${row.original._id}`}>
          <Pencil />
        </Link>
      </Button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button>
            <Trash />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              client from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                startTransition(async () => {
                  await deleteClient({ id: row.original._id }).then(
                    (result) => {
                      if (
                        result &&
                        typeof result === 'object' &&
                        'removedImageUrl' in result &&
                        result.removedImageUrl
                      ) {
                        setImageToDelete({
                          id: result.removedImageId,
                          url: result.removedImageUrl
                        })
                      }
                    }
                  )
                  toast('Client Deleted')
                })
              }
            >
              {isPending && <Spinner />}
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
