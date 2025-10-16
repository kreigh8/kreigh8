import { Getter, Row } from '@tanstack/react-table'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  AlertDialogTrigger,
  AlertDialog,
  AlertDialogHeader,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { Trash } from 'lucide-react'

export function EditDeleteCell<TData extends { _id: string }>({
  row,
  getValue,
  path
}: {
  row: Row<TData>
  getValue: Getter<TData>
  path: string
}) {
  const [value, setValue] = useState(getValue())

  console.log('Row:', row)
  console.log('Value:', value)
  return (
    <div className="flex gap-2">
      <Button asChild>
        <Link href={`/admin/${path}/${row.original._id}`}>Edit</Link>
      </Button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button>
            <Trash />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {/* <AlertDialogCancel>Cancel</AlertDialogCancel> */}
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialog>
    </div>
  )
}
