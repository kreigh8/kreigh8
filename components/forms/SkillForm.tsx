'use client'

import { Controller, FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import ImageUpload from './ImageUpload'
import { toast } from 'sonner'
import { Field, FieldError, FieldLabel, FieldSet } from '../ui/field'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useUser } from '@clerk/clerk-react'
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

export default function SkillForm() {
  const generateUploadUrl = useMutation(api.image.generateUploadUrl)
  const createSkill = useMutation(api.skills.createSkill)

  const { user } = useUser()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      image: undefined as unknown as File
    }
  })

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

      await createSkill({
        name: values.name,
        description: values.description,
        image: {
          name: image?.name || 'unknown',
          storageId,
          author: user?.username || 'unknown',
          format: 'image'
        }
      })

      toast.success('Skill created successfully!')

      form.reset()
      form.setValue('image', undefined as unknown as File)
    } catch (error) {
      console.error('Error creating skill:', error)
    }
  }

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
                autoComplete="off"
              />
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
                placeholder="https://kroger.com"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <ImageUpload />

        <Button type="submit">Submit</Button>
      </form>
    </FormProvider>
  )
}
