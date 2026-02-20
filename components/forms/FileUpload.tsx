import { useEffect, useRef, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Field, FieldLabel, FieldError } from '../ui/field'
import { Input } from '../ui/input'
import { Skeleton } from '../ui/skeleton'

type Props = {
  label: string
  fileUrl?: string
  formElementName: string
}

export default function FileUpload({ fileUrl, formElementName }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { control, setValue, watch, handleSubmit, resetField } =
    useFormContext()
  const formElement = watch(formElementName)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!formElement && fileUrl) {
      setPreviewUrl(fileUrl)
    }
  }, [formElement, fileUrl])

  useEffect(() => {
    if (!formElement) {
      setSelectedFile(null)
      setPreviewUrl(fileUrl || null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
    resetField('image')
  }, [formElement, handleSubmit, resetField, fileUrl])

  useEffect(() => {
    if (selectedFile || formElement) {
      const url = URL.createObjectURL(selectedFile ?? formElement)
      setPreviewUrl(url)
      setValue(formElementName, selectedFile)
      return () => URL.revokeObjectURL(url)
    } else if (fileUrl) {
      setPreviewUrl(fileUrl)
    } else {
      setPreviewUrl(null)
    }
  }, [selectedFile, setValue, formElement, fileUrl])

  return (
    <div className="flex grid-cols-2 w-full items-center gap-4">
      <Controller
        name={formElementName}
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={formElementName + 'input'}>File</FieldLabel>
            <Input
              {...field}
              ref={fileInputRef}
              id={formElementName + 'input'}
              aria-invalid={fieldState.invalid}
              type="file"
              autoComplete="off"
              value={undefined} // Always undefined for file input to avoid controlled/uncontrolled warning
              onChange={(e) => {
                field.onChange(e)
                setSelectedFile(e.target.files?.[0] ?? null)
              }}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {!previewUrl && <Skeleton className="h-10 w-10 mt-4" />}
      {/* {previewUrl && (
        <Image src={previewUrl} alt="Selected Image" height={100} width={100} />
      )} */}
    </div>
  )
}
