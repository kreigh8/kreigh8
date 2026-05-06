'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Preloaded, useMutation, usePreloadedQuery } from 'convex/react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { api } from '@/convex/_generated/api'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { Field, FieldError, FieldLabel, FieldDescription } from '../ui/field'
import { FormMinimalTiptapField } from './FormMinimalTiptapField'

const formSchema = z.object({
  title: z.string().min(2, { message: 'Title must be at least 2 characters.' }),
  subTitle: z.string().min(2, {
    message: 'Home blurb must be at least 2 characters.'
  }),
  slogan: z
    .string()
    .min(2, { message: 'Slogan must be at least 2 characters.' })
})

export default function HomeBlurbForm(props: {
  preloadedHomeBlurb: Preloaded<typeof api.home.getHomeBlurb>
}) {
  const createHomeBlurb = useMutation(api.home.createHomeBlurb)
  const getHomeBlurb = usePreloadedQuery(props.preloadedHomeBlurb)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: getHomeBlurb?.title ?? '',
      subTitle: getHomeBlurb?.subTitle ?? '',
      slogan: getHomeBlurb?.slogan ?? ''
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    createHomeBlurb({
      title: values.title,
      subTitle: values.subTitle,
      slogan: values.slogan
    })
      .then(() => {
        toast.success('Home page blurb updated successfully!')
      })
      .catch(() => {
        toast.error('Failed to update home page blurb.')
      })
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="home-title">Home Page Title</FieldLabel>
              <Textarea
                {...field}
                id="home-title"
                aria-invalid={fieldState.invalid}
                placeholder="Welcome to my portfolio!"
                className="min-h-30"
              />
              <FieldDescription>
                Tell us more about yourself. This text will be used as the home
                page title.
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="subTitle"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="home-sub-title">
                Home Page Sub Title
              </FieldLabel>
              <Textarea
                {...field}
                id="home-sub-title"
                aria-invalid={fieldState.invalid}
                placeholder="Welcome to my portfolio!"
                className="min-h-30"
              />
              <FieldDescription>
                Tell us more about yourself. This text will be used as the home
                page sub title.
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="slogan"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="home-slogan">Home Page Slogan</FieldLabel>
              <Textarea
                {...field}
                id="home-slogan"
                aria-invalid={fieldState.invalid}
                placeholder="Welcome to my portfolio!"
                className="min-h-30"
              />
              <FieldDescription>
                Tell us more about yourself. This text will be used as the home
                page slogan.
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </FormProvider>
  )
}
