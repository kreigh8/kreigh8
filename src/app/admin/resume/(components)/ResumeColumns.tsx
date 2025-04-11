'use client'

import { Button } from '@/components/ui/button'
import { deleteResume } from '@/lib/actions/resume/delete-resume'
import { ColumnDef } from '@tanstack/react-table'
import { Trash } from 'lucide-react'
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

export const ResumeTableColumns: ColumnDef<{
  name: string
  extension: string
  fileSizeInBytes: number
  dateOfUpload: Date
}>[] = [
  {
    accessorKey: 'name',
    header: 'File Name'
  },
  {
    accessorKey: 'extension',
    header: 'File Extension'
  },
  {
    accessorKey: 'fileSizeInBytes',
    header: 'File Size (bytes)'
  },
  {
    accessorKey: 'dateOfUpload',
    header: 'Date of Upload',
    cell: ({ row }) => {
      const date = new Date(row.original.dateOfUpload)
      return date.toLocaleDateString()
    }
  },
  {
    accessorKey: 'actions',
    header: undefined,
    cell: ({ row }) => {
      const handleDeleteResume = (resumeName: string) => {
        deleteResume(resumeName)
      }

      return (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <Trash />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to delete this resume?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                resume and remove the data from the file system.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleDeleteResume(row.original.name)}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )
    }
  }
]
