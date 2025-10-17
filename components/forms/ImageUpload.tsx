import { useEffect, useRef, useState } from 'react'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '../ui/form'

import { useFormContext } from 'react-hook-form'
import { Input } from '../ui/input'
import Image from 'next/image'
import { Skeleton } from '../ui/skeleton'

export default function ImageUpload() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { control, setValue, watch, handleSubmit, resetField } =
    useFormContext()
  const formImage = watch('image')

  const [selectedImage, setSelectedImage] = useState<File | null>(null)

  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  // Get control from react-hook-form context

  useEffect(() => {
    if (!formImage) {
      setSelectedImage(null)
      setPreviewUrl(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
    resetField('image')
  }, [formImage, handleSubmit, resetField])

  // Dummy fileRejections array for demonstration; replace with your actual logic

  useEffect(() => {
    if (selectedImage || formImage) {
      const url = URL.createObjectURL(selectedImage ?? formImage)
      setPreviewUrl(url)
      setValue('image', selectedImage)
      return () => URL.revokeObjectURL(url)
    } else {
      setPreviewUrl(null)
    }
  }, [selectedImage, setValue, formImage])

  return (
    <div className="flex grid-cols-2 w-full items-center gap-4">
      <FormField
        control={control}
        name="image"
        render={() => (
          <FormItem>
            <FormLabel>Image</FormLabel>
            <FormControl>
              <Input
                ref={fileInputRef}
                onChange={(event) => setSelectedImage(event.target.files![0])}
                id="picture"
                type="file"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {!previewUrl && <Skeleton className="h-10 w-10 mt-4" />}
      {previewUrl && (
        <Image src={previewUrl} alt="Selected Image" height={100} width={100} />
      )}
    </div>
  )
}
