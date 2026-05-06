import { Row } from '@tanstack/react-table'
import Link from 'next/link'
import { useTransition } from 'react'
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
import { Spinner } from '../ui/spinner'

export function EditDeleteExperienceCell<
  TData extends { _id: Id<'experience'> }
>({ row }: { row: Row<TData> }) {
  const [isPending, startTransition] = useTransition()
  const deleteExperience = useMutation(api.experience.deleteExperience)

  return (
    <div className="flex gap-2">
      <Button asChild>
        <Link href={`/admin/experience/${row.original._id}`}>
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
              experience from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                startTransition(async () => {
                  await deleteExperience({ id: row.original._id }).then(() =>
                    toast('Experience Deleted')
                  )
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
