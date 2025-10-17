import { useEffect, useState } from 'react'
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
  const { control, setValue, watch } = useFormContext()
  const formImage = watch('image')
  console.log('image', formImage)
  const [selectedImage, setSelectedImage] = useState<File | null>(formImage)

  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  // Get control from react-hook-form context

  // Dummy fileRejections array for demonstration; replace with your actual logic

  useEffect(() => {
    if (selectedImage || formImage) {
      const url = selectedImage
        ? URL.createObjectURL(selectedImage)
        : URL.createObjectURL(formImage)
      setPreviewUrl(url)
      setValue('image', selectedImage ?? formImage)
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
