'use client'

import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Preloaded, useMutation, usePreloadedQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { FormMinimalTiptapField } from './FormMinimalTiptapField'

const formSchema = z.object({
  blurb: z
    .string()
    .min(2, { message: 'About blurb must be at least 2 characters.' })
})

export default function AboutForm(props: {
  preloadedAbout: Preloaded<typeof api.about.getAboutBlurb>
}) {
  const about = usePreloadedQuery(props.preloadedAbout)
  const createAboutBlurb = useMutation(api.about.createAboutBlurb)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      blurb: about?.blurb ?? ''
    }
  })

  const isSubmitDisabled =
    !form.formState.isValid ||
    !form.formState.isDirty ||
    form.formState.isSubmitting

  useEffect(() => {
    if (!about) return
    form.reset({ blurb: about.blurb ?? '' })
  }, [about, form])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await createAboutBlurb({ blurb: values.blurb })
      toast.success('About blurb saved successfully!')
      form.reset({ blurb: values.blurb })
    } catch {
      toast.error('Failed to save about blurb.')
    }
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormMinimalTiptapField
          control={form.control}
          name="blurb"
          id="about-blurb"
          label="About"
          placeholder="Tell visitors about yourself..."
          description="This will be displayed on your about page."
          editorContentClassName="min-h-30"
        />
        <Button type="submit" disabled={isSubmitDisabled}>
          {about?.blurb ? 'Update About' : 'Create About'}
        </Button>
      </form>
    </FormProvider>
  )
}
