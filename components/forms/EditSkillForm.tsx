'use client'

import { Controller, FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
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
import { Field, FieldLabel, FieldError } from '../ui/field'
import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle
} from '../ui/alert-dialog'
import Image from 'next/image'
import { Textarea } from '../ui/textarea'

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Skill name must be at least 2 characters.'
  }),
  description: z.string(),
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

export default function EditSkillForm(props: {
  preloadedSkill: Preloaded<typeof api.skills.getSkill>
}) {
  const [isPending, startTransition] = useTransition()
  const generateUploadUrl = useMutation(api.image.generateUploadUrl)
  const updateSkill = useMutation(api.skills.updateSkill)
  const deleteImage = useMutation(api.image.deleteImage)
  const skill = usePreloadedQuery(props.preloadedSkill)
  const [previewImage, setPreviewImage] = useState<{
    name: string
    url: string
    _id: Id<'images'>
  } | null>(null)
  const [removedImageData, setRemovedImageData] = useState<{
    removedImageUrl: string
    removedImageId: Id<'images'>
  } | null>(null)

  const imageData = useQuery(api.image.getImage, {
    id: skill?.imageId ?? 'skip'
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: skill.name ?? '',
      description: skill.description ?? '',
      image: undefined as unknown as File
    }
  })

  useEffect(() => {
    async function setImageFromData() {
      if (imageData && skill.imageUrl && imageData.name) {
        const response = await fetch(skill.imageUrl)
        const blob = await response.blob()
        const file = new File([blob], imageData.name, { type: blob.type })
        form.setValue('image', file)
        setPreviewImage({
          name: imageData.name,
          url: skill.imageUrl,
          _id: imageData._id
        })
      }
    }
    setImageFromData()
  }, [imageData, form])

  const { user } = useUser()

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      let imagePayload = undefined
      if (values.image) {
        const postUrl = await generateUploadUrl()
        const result = await fetch(postUrl, {
          method: 'POST',
          headers: { 'Content-Type': values.image.type },
          body: values.image
        })
        const { storageId } = await result.json()
        imagePayload = {
          name: values.image.name,
          storageId,
          author: user?.username || 'unknown',
          format: 'image'
        }
      }

      startTransition(async () => {
        await updateSkill({
          id: skill._id,
          body: {
            name: values.name,
            description: values.description,
            image: imagePayload
          }
        }).then((result) => {
          if (
            typeof result === 'object' &&
            'removedImageUrl' in result &&
            result.removedImageUrl
          ) {
            setRemovedImageData({
              removedImageUrl: result.removedImageUrl,
              removedImageId: result.removedImageId
            })
            console.log('Deleting image:', result.removedImageUrl)
          }

          toast.success('Skill updated successfully!')
        })
      })
    } catch (error) {
      console.error('Error creating skill:', error)
    }
  }

  useEffect(() => {
    async function setDefaultImage() {
      if (skill.imageUrl) {
        const response = await fetch(skill.imageUrl)
        const blob = await response.blob()
        const file = new File([blob], 'skill.png', {
          type: blob.type,
          lastModified: new Date().getTime()
        })
        form.setValue('image', file)
      }
    }
    setDefaultImage()
  }, [skill.imageUrl, form])

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={'skill-name'}>Skill Name</FieldLabel>
              <Input
                {...field}
                id={'skill-name'}
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
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={'skill-description'}>
                Skill Description
              </FieldLabel>
              <Textarea
                {...field}
                id={'skill-description'}
                aria-invalid={fieldState.invalid}
                placeholder="Description of the skill"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <ImageUpload imageUrl={previewImage?.url} />

        <Button type="submit">
          {isPending && <Spinner />}
          Submit
        </Button>
      </form>

      <AlertDialog open={!!removedImageData}>
        <AlertDialogContent>
          <AlertDialogTitle>Delete Image</AlertDialogTitle>
          <AlertDialogDescription>
            {removedImageData ? (
              <Image
                src={removedImageData.removedImageUrl}
                alt="Removed Image"
                width={200}
                height={200}
              />
            ) : null}
            This image is no longer associated with any clients or technologies.
            Would you like to delete this image?
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep in Library</AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                startTransition(async () => {
                  if (removedImageData) {
                    deleteImage({
                      imageId: removedImageData.removedImageId
                    }).then(() => {
                      setRemovedImageData(null)
                      toast.success('Image deleted successfully!')
                    })
                  }
                })
              }
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </FormProvider>
  )
}
