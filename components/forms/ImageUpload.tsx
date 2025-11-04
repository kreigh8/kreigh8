import { useEffect, useRef, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Input } from '../ui/input'
import Image from 'next/image'
import { Skeleton } from '../ui/skeleton'
import { Field, FieldError, FieldLabel } from '../ui/field'

type Props = {
  imageUrl?: string
}

export default function ImageUpload({ imageUrl }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { control, setValue, watch, handleSubmit, resetField } =
    useFormContext()
  const formImage = watch('image')
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  // Show preview from imageUrl if in edit mode and no file is selected
  useEffect(() => {
    if (!formImage && imageUrl) {
      setPreviewUrl(imageUrl)
    }
  }, [formImage, imageUrl])

  useEffect(() => {
    if (!formImage) {
      setSelectedImage(null)
      setPreviewUrl(imageUrl || null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
    resetField('image')
  }, [formImage, handleSubmit, resetField, imageUrl])

  useEffect(() => {
    if (selectedImage || formImage) {
      const url = URL.createObjectURL(selectedImage ?? formImage)
      setPreviewUrl(url)
      setValue('image', selectedImage)
      return () => URL.revokeObjectURL(url)
    } else if (imageUrl) {
      setPreviewUrl(imageUrl)
    } else {
      setPreviewUrl(null)
    }
  }, [selectedImage, setValue, formImage, imageUrl])

  return (
    <div className="flex grid-cols-2 w-full items-center gap-4">
      <Controller
        name="image"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Image</FieldLabel>
            <Input
              {...field}
              ref={fileInputRef}
              id={field.name}
              aria-invalid={fieldState.invalid}
              type="file"
              autoComplete="off"
              value={undefined} // Always undefined for file input to avoid controlled/uncontrolled warning
              onChange={(e) => {
                field.onChange(e)
                setSelectedImage(e.target.files?.[0] ?? null)
              }}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {!previewUrl && <Skeleton className="h-10 w-10 mt-4" />}
      {previewUrl && (
        <Image src={previewUrl} alt="Selected Image" height={100} width={100} />
      )}
    </div>
  )
}
