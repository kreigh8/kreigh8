import { useEffect, useState } from 'react'
import { FormField, FormItem, FormLabel, FormControl } from '../ui/form'

import { useFormContext } from 'react-hook-form'
import { Input } from '../ui/input'
import Image from 'next/image'
import { Skeleton } from '../ui/skeleton'

export default function ImageUpload() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)

  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  // Get control from react-hook-form context
  const { control } = useFormContext()

  // Dummy fileRejections array for demonstration; replace with your actual logic

  useEffect(() => {
    if (selectedImage) {
      const url = URL.createObjectURL(selectedImage)
      setPreviewUrl(url)
      return () => URL.revokeObjectURL(url)
    } else {
      setPreviewUrl(null)
    }
  }, [selectedImage])

  return (
    <div className="flex grid-cols-2 w-full items-center gap-4">
      <FormField
        control={control}
        name="image"
        render={() => (
          <FormItem className="">
            <FormLabel>Image</FormLabel>
            <FormControl>
              <Input
                onChange={(event) => setSelectedImage(event.target.files![0])}
                id="picture"
                type="file"
              />
            </FormControl>
          </FormItem>
        )}
      />

      <div className="flex w-full">
        {!previewUrl && <Skeleton className="h-10 w-10" />}
        {previewUrl && (
          <Image
            src={previewUrl}
            alt="Selected Image"
            height={100}
            width={100}
            // style={{ maxWidth: '200px', maxHeight: '200px' }}
          />
        )}
      </div>
    </div>
  )
}
