'use client'

import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
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
      name: client.name,
      url: client.url,
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
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Client Name</FormLabel>
              <FormControl>
                <Input placeholder="Kroger" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Client URL</FormLabel>
              <FormControl>
                <Input placeholder="https://kroger.com" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <ImageUpload imageUrl={previewImage?.url ?? undefined} />

        <FormField
          control={form.control}
          name="active"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="text-sm font-normal">
                  Active Client
                </FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value === true}
                    onCheckedChange={(checked) => field.onChange(!!checked)}
                  />
                </FormControl>
              </FormItem>
            )
          }}
        />
        <Button type="submit">
          {isPending && <Spinner />}
          Submit
        </Button>
      </form>
    </FormProvider>
  )
}
