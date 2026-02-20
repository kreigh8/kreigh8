'use client'

import { api } from '@/convex/_generated/api'
import { Preloaded, useMutation, usePreloadedQuery } from 'convex/react'
import { z } from 'zod'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import ImageUpload from './ImageUpload'
import { Button } from '../ui/button'
import { create } from 'domain'
import { useUser } from '@clerk/clerk-react'
import { toast } from 'sonner'

const formSchema = z.object({
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

export default function HomeImageForm(props: {
  preloadedHomeImage: Preloaded<typeof api.homeImage.getHomeImage>
}) {
  const generateUploadUrl = useMutation(api.image.generateUploadUrl)
  const homeImage = usePreloadedQuery(props.preloadedHomeImage)
  const createHomeImage = useMutation(api.homeImage.createHomeImage)

  const { user } = useUser()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: undefined as unknown as File
    }
  })

  const image = form.watch('image')

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // 1. Get upload URL
      const uploadUrl = await generateUploadUrl()

      // 2. POST file to URL
      const result = await fetch(uploadUrl, {
        method: 'POST',
        headers: { 'Content-Type': image!.type },
        body: image
      })

      // 3. Extract storageId from response
      const { storageId } = await result.json()

      console.log('Storage ID:', storageId)

      // 4. Use storageId in your mutation
      await createHomeImage({
        image: {
          name: image!.name,
          storageId,
          author: user?.username || 'unknown',
          format: image!.type
        }
      })

      toast.success('Home image created successfully!')

      form.reset()
      form.setValue('image', undefined as unknown as File)
    } catch (error) {
      console.error('Error creating home image:', error)
    }
  }

  return (
    <div className="flex flex-col w-full">
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <ImageUpload />

          <Button type="submit">Submit</Button>
        </form>
      </FormProvider>
    </div>
  )
}
