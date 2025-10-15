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
import { useParams } from 'next/navigation'
import { Id } from '@/convex/_generated/dataModel'
import { useEffect } from 'react'

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

export default function TechnologyForm() {
  const generateUploadUrl = useMutation(api.image.generateUploadUrl)
  const createTechnology = useMutation(api.technology.createTechnology)

  const params = useParams()

  const { id } = params

  console.log('id', id)

  const technology = useQuery(
    api.technology.getTechnology,
    typeof id === 'string' ? { id: id as Id<'technologies'> } : 'skip'
  )

  console.log('technology', technology)

  const { user } = useUser()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      url: '',
      image: undefined as unknown as File
    }
  })

  useEffect(() => {
    async function setFormValues() {
      const blob = await fetch(technology?.imageUrl as string).then((r) =>
        r.blob()
      )

      form.setValue('name', technology?.name as string)
      form.setValue('url', technology?.url as string)
      form.setValue(
        'image',
        new File([blob], 'image', { type: blob.type }) as unknown as File
      )
    }

    if (technology) {
      setFormValues()
    }
  }, [technology, form])

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

      await createTechnology({
        name: values.name,
        url: values.url,
        image: {
          storageId,
          author: user?.username || 'unknown',
          format: 'image'
        }
      })

      form.reset()
      form.setValue('image', undefined as unknown as File)
    } catch (error) {
      console.error('Error creating client:', error)
    }
  }

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

        <ImageUpload />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
