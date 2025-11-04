'use client'

import { Controller, FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Preloaded,
  useMutation,
  usePreloadedQuery,
  useQuery
} from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useUser } from '@clerk/clerk-react'
import ImageUpload from './ImageUpload'
import { useEffect, useState, useTransition } from 'react'
import { Spinner } from '../ui/spinner'
import { Id } from '@/convex/_generated/dataModel'
import {
  Field,
  FieldSet,
  FieldLabel,
  FieldError,
  FieldDescription
} from '../ui/field'

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Client name must be at least 2 characters.'
  }),
  url: z.url({ message: 'Client URL must be a valid URL.' }),
  image: z
    .instanceof(File)
    .refine(
      (file) =>
        [
          'image/png',
          'image/jpeg',
          'image/jpg',
          'image/svg+xml',
          'image/gif'
        ].includes(file.type),
      { message: 'Invalid image file type' }
    ),
  active: z.boolean()
})

export default function EditClientForm(props: {
  preloadedClient: Preloaded<typeof api.clients.getClient>
}) {
  const [isPending, startTransition] = useTransition()
  const generateUploadUrl = useMutation(api.image.generateUploadUrl)
  const updateClient = useMutation(api.clients.updateClient)
  const client = usePreloadedQuery(props.preloadedClient)
  const [previewImage, setPreviewImage] = useState<{
    name: string
    url: string
    _id: Id<'images'>
  } | null>(null)

  const imageData = useQuery(api.image.getImage, {
    id: client?.imageId ?? 'skip'
  })

  console.log('imageData', imageData)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: client.name ?? '',
      url: client.url ?? '',
      image: undefined as unknown as File,
      active: client.active
    }
  })

  useEffect(() => {
    async function setImageFromData() {
      if (imageData && client.imageUrl && imageData.name) {
        const response = await fetch(client.imageUrl)
        const blob = await response.blob()
        const file = new File([blob], imageData.name, { type: blob.type })
        form.setValue('image', file)
        setPreviewImage({
          name: imageData.name,
          url: client.imageUrl,
          _id: imageData._id
        })
      }
    }
    setImageFromData()
  }, [imageData, form])

  const { user } = useUser()

  const image = form.watch('image')

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      const postUrl = await generateUploadUrl()
      // Step 2: POST the file to the URL
      const result = await fetch(postUrl, {
        method: 'POST',
        headers: { 'Content-Type': image!.type },
        body: image
      })
      const { storageId } = await result.json()

      startTransition(async () => {
        await updateClient({
          id: client._id,
          body: {
            name: values.name,
            url: values.url,
            image: {
              name: image?.name,
              storageId,
              author: user?.username || 'unknown',
              format: 'image'
            },
            active: values.active
          }
        })
      })

      form.reset()
      form.setValue('image', undefined as unknown as File)
    } catch (error) {
      console.error('Error creating client:', error)
    }
  }

  useEffect(() => {
    async function setDefaultImage() {
      if (client.imageUrl) {
        const response = await fetch(client.imageUrl)
        const blob = await response.blob()
        const file = new File([blob], 'client.png', {
          type: blob.type,
          lastModified: new Date().getTime()
        })
        form.setValue('image', file)
      }
    }
    setDefaultImage()
  }, [client.imageUrl, form])

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={'client-name'}>Client Name</FieldLabel>
              <Input
                {...field}
                id={'client-name'}
                aria-invalid={fieldState.invalid}
                placeholder="Kroger"
              />
              {/* <FieldDescription>
                This is your public display name. Must be between 3 and 10
                characters. Must only contain letters, numbers, and underscores.
              </FieldDescription> */}
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="url"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={'client-url'}>Client URL</FieldLabel>
              <Input
                {...field}
                id={'client-url'}
                aria-invalid={fieldState.invalid}
                placeholder="https://kroger.com"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <ImageUpload imageUrl={previewImage?.url} />

        <Controller
          name="active"
          control={form.control}
          render={({ field, fieldState }) => (
            <FieldSet>
              <Field orientation="horizontal" data-invalid={fieldState.invalid}>
                <Checkbox
                  id={'active-checkbox'}
                  name={field.name}
                  aria-invalid={fieldState.invalid}
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(!!checked)}
                />
                <FieldLabel htmlFor={'active-checkbox'} className="font-normal">
                  Active
                </FieldLabel>
              </Field>
            </FieldSet>
          )}
        />
        <Button type="submit">
          {isPending && <Spinner />}
          Submit
        </Button>
      </form>
    </FormProvider>
  )
}
