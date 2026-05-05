'use client'

import { useEffect } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Preloaded, useMutation, useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useUser } from '@clerk/clerk-react'
import { toast } from 'sonner'
import { Field, FieldError, FieldLabel, FieldSet } from '../ui/field'
import { InputGroup, InputGroupAddon } from '@/components/ui/input-group'
import { Icons } from '@/components/ui/icons'

const formSchema = z.object({
  linkedIn: z.url({ message: 'LinkedIn URL must be a valid URL.' }),
  gitHub: z.url({ message: 'GitHub URL must be a valid URL.' })
})

export default function SocialForm(props: {
  preloadedSocialLinks: Preloaded<typeof api.social.getSocialLinks>
}) {
  const socialLinks = useQuery(api.social.getSocialLinks)
  const createSocialLinks = useMutation(api.social.createSocialLinks)
  const updateSocialLinks = useMutation(api.social.updateSocialLinks)
  const hasExistingSocialLinks = Boolean(
    socialLinks?.linkedIn || socialLinks?.gitHub
  )

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      linkedIn: '',
      gitHub: ''
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
      gitHub: socialLinks.gitHub ?? ''
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
        <Button type="submit" disabled={isSubmitDisabled}>
          {hasExistingSocialLinks
            ? 'Update Social Links'
            : 'Create Social Links'}
        </Button>
      </form>
    </FormProvider>
  )
}
