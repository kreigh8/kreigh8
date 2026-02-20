'use client'

import React from 'react'
import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogContent
} from '@/components/ui/alert-dialog'
import { useImageDeleteContext } from '../context/ImageDeleteContext'
import { toast } from 'sonner'
import { api } from '@/convex/_generated/api'
import { useMutation } from 'convex/react'
import Image from 'next/image'

export function ImageDeleteAlert() {
  const { imageToDelete, setImageToDelete } = useImageDeleteContext()
  const deleteImage = useMutation(api.image.deleteImage)

  const handleDelete = async () => {
    if (imageToDelete) {
      await deleteImage({ imageId: imageToDelete.id })
      toast('Image deleted')
    }
    setImageToDelete(null)
  }

  return (
    <AlertDialog
      open={!!imageToDelete}
      onOpenChange={() => setImageToDelete(null)}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Image?</AlertDialogTitle>
          <AlertDialogDescription>
            This image is no longer referenced by any client or technology.
            Would you like to delete it from storage?
          </AlertDialogDescription>
        </AlertDialogHeader>
        {imageToDelete && (
          <Image
            src={imageToDelete?.url as string}
            width={400}
            height={300}
            alt="Orphaned image preview"
            className="w-full max-h-48 object-contain rounded border mb-4"
          />
        )}
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setImageToDelete(null)}>
            Keep Image
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>
            Delete Image
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
