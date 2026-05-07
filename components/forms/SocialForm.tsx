'use client'

import { useEffect } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Preloaded, useMutation, usePreloadedQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { toast } from 'sonner'
import { Field, FieldError, FieldLabel } from '../ui/field'
import { InputGroup, InputGroupAddon } from '@/components/ui/input-group'
import { Icons } from '@/components/ui/icons'
import { Mail } from 'lucide-react'

const formSchema = z.object({
  linkedIn: z.url({
    error: (iss) => {
      if (iss.code === 'invalid_type') {
        return { message: 'LinkedIn URL must be a valid URL.' }
      }
      return { message: 'LinkedIn URL is required.' }
    }
  }),
  gitHub: z.url({
    error: (iss) => {
      if (iss.code === 'invalid_type') {
        return { message: 'GitHub URL must be a valid URL.' }
      }
      return { message: 'GitHub URL is required.' }
    }
  }),
  email: z.email({
    error: (iss) => {
      if (iss.code === 'invalid_type') {
        return { message: 'Email must be a valid email address.' }
      }
      return { message: 'Email is required.' }
    }
  })
})

export default function SocialForm(props: {
  preloadedSocialLinks: Preloaded<typeof api.social.getSocialLinks>
}) {
  const socialLinks = usePreloadedQuery(props.preloadedSocialLinks)
  const createSocialLinks = useMutation(api.social.createSocialLinks)
  const updateSocialLinks = useMutation(api.social.updateSocialLinks)
  const hasExistingSocialLinks = Boolean(
    socialLinks?.linkedIn || socialLinks?.gitHub || socialLinks?.email
  )

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      linkedIn: '',
      gitHub: '',
      email: ''
    }
  })

  const isSubmitDisabled =
    !form.formState.isValid ||
    !form.formState.isDirty ||
    form.formState.isSubmitting

  useEffect(() => {
    if (!socialLinks) return

    form.reset({
      linkedIn: socialLinks.linkedIn ?? '',
      gitHub: socialLinks.gitHub ?? '',
      email: socialLinks.email ?? ''
    })
  }, [socialLinks, form])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (hasExistingSocialLinks) {
        await updateSocialLinks(values)
        toast.success('Social links updated successfully!')
        return
      }

      await createSocialLinks(values)
      toast.success('Social links created successfully!')
    } catch (error) {
      toast.error('Failed to save social links.')
    }
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Controller
          name="linkedIn"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="linkedIn">LinkedIn URL</FieldLabel>
              <InputGroup>
                <Input
                  {...field}
                  id="linkedIn"
                  data-slot="input-group-control"
                  placeholder="https://www.linkedin.com/in/your-profile"
                  aria-invalid={fieldState.invalid}
                  className="border-0 shadow-none focus-visible:ring-0"
                />
                <InputGroupAddon align="inline-end">
                  <Icons.linkedIn className="size-4" />
                </InputGroupAddon>
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="gitHub"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="gitHub">GitHub URL</FieldLabel>
              <InputGroup>
                <Input
                  {...field}
                  id="gitHub"
                  data-slot="input-group-control"
                  placeholder="https://github.com/your-username"
                  aria-invalid={fieldState.invalid}
                  className="border-0 shadow-none focus-visible:ring-0"
                />
                <InputGroupAddon align="inline-end">
                  <Icons.gitHub className="size-4" />
                </InputGroupAddon>
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email">Email Address</FieldLabel>
              <InputGroup>
                <Input
                  {...field}
                  id="email"
                  type="email"
                  autoComplete="email"
                  data-slot="input-group-control"
                  placeholder="you@example.com"
                  aria-invalid={fieldState.invalid}
                  className="border-0 shadow-none focus-visible:ring-0"
                />
                <InputGroupAddon align="inline-end">
                  <Mail />
                </InputGroupAddon>
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Button type="submit" disabled={isSubmitDisabled}>
          {hasExistingSocialLinks
            ? 'Update Social Links'
            : 'Create Social Links'}
        </Button>
      </form>
    </FormProvider>
  )
}
