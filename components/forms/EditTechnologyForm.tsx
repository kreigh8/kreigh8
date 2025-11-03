'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
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
import { toast } from 'sonner'
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
    )
})

export default function EditTechnologyForm(props: {
  preloadedTechnology: Preloaded<typeof api.technology.getTechnology>
}) {
  const technology = usePreloadedQuery(props.preloadedTechnology)
  const [isPending, startTransition] = useTransition()
  const generateUploadUrl = useMutation(api.image.generateUploadUrl)
  const updateTechnology = useMutation(api.technology.updateTechnology)

  const imageData = useQuery(api.image.getImage, {
    id: technology?.imageId ?? 'skip'
  })

  const [previewImage, setPreviewImage] = useState<{
    name: string
    url: string
    _id: Id<'images'>
  } | null>(null)

  const { user } = useUser()

  console.log('technology', technology)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: technology.name,
      url: technology.url,
      image: undefined as unknown as File
    }
  })

  useEffect(() => {
    async function setImageFromData() {
      if (imageData && technology.imageUrl && imageData.name) {
        const response = await fetch(technology.imageUrl)
        const blob = await response.blob()
        const file = new File([blob], imageData.name, { type: blob.type })
        form.setValue('image', file)
        setPreviewImage({
          name: imageData.name,
          url: technology.imageUrl,
          _id: imageData._id
        })
      }
    }
    setImageFromData()
  }, [imageData, form])

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
        await updateTechnology({
          id: technology._id,
          body: {
            name: values.name,
            url: values.url,
            image: {
              name: image?.name,
              storageId,
              author: user?.username || 'unknown',
              format: 'image'
            }
          }
        })
        toast('Technology Created')
      })

      form.reset()
      form.setValue('image', undefined as unknown as File)
    } catch (error) {
      console.error('Error creating client:', error)
    }
  }

  useEffect(() => {
    async function setDefaultImage() {
      if (technology.imageUrl) {
        const response = await fetch(technology.imageUrl)
        const blob = await response.blob()
        const file = new File([blob], 'technology.png', {
          type: blob.type,
          lastModified: new Date().getTime()
        })
        form.setValue('image', file)
      }
    }
    setDefaultImage()
  }, [technology.imageUrl, form])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Technology Name</FormLabel>
              <FormControl>
                <Input placeholder="React" {...field} />
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
              <FormLabel>Technology URL</FormLabel>
              <FormControl>
                <Input placeholder="https://react.dev" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <ImageUpload imageUrl={technology.imageUrl ?? undefined} />

        <Button type="submit">
          {isPending && <Spinner />}
          Submit
        </Button>
      </form>
    </Form>
  )
}
