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

const formSchema = z.object({
  homeBlurb: z.string().min(2, {
    message: 'Technology name must be at least 2 characters.'
  })
})

export default function HomeBlurbForm(props: {
  preloadedHomeBlurb: Preloaded<typeof api.home.getHomeBlurb>
}) {
  const createHomeBlurb = useMutation(api.home.createHomeBlurb)
  const getHomeBlurb = usePreloadedQuery(props.preloadedHomeBlurb)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      homeBlurb: getHomeBlurb?.homeBlurb ?? ''
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    createHomeBlurb({
      homeBlurb: values.homeBlurb
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
          name="homeBlurb"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-textarea-about">
                Home Page Blurb
              </FieldLabel>
              <Textarea
                {...field}
                id="form-rhf-textarea-about"
                aria-invalid={fieldState.invalid}
                placeholder="I'm a software engineer..."
                className="min-h-[120px]"
              />
              <FieldDescription>
                Tell us more about yourself. This will be used to help us
                personalize your experience.
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
