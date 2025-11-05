'use client'

import { Controller, FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useUser } from '@clerk/clerk-react'
import ImageUpload from './ImageUpload'
import { toast } from 'sonner'
import { Field, FieldError, FieldLabel, FieldSet } from '../ui/field'

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

export default function ClientForm() {
  const generateUploadUrl = useMutation(api.image.generateUploadUrl)
  const createClient = useMutation(api.clients.createClient)

  const { user } = useUser()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      url: '',
      image: undefined as unknown as File,
      active: false
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

      await createClient({
        name: values.name,
        url: values.url,
        image: {
          name: image?.name || 'unknown',
          storageId,
          author: user?.username || 'unknown',
          format: 'image'
        },
        active: values.active
      }).then(() => {
        toast.success('Client created successfully!')
      })

      form.reset()
      form.setValue('image', undefined as unknown as File)
    } catch (error) {
      console.error('Error creating client:', error)
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
              <FieldLabel htmlFor={'client-name'}>Client Name</FieldLabel>
              <Input
                {...field}
                id={'client-name'}
                aria-invalid={fieldState.invalid}
                placeholder="Kroger"
                autoComplete="off"
              />
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

        <ImageUpload />

        <Controller
          name="active"
          control={form.control}
          render={({ field, fieldState }) => (
            <FieldSet>
              <Field orientation="horizontal" data-invalid={fieldState.invalid}>
                <Checkbox
                  id={'client-active'}
                  name={field.name}
                  aria-invalid={fieldState.invalid}
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(!!checked)}
                />
                <FieldLabel htmlFor={'client-active'} className="font-normal">
                  Active
                </FieldLabel>
              </Field>
            </FieldSet>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </FormProvider>
  )
}
