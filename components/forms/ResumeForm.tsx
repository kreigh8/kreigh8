'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Preloaded, useMutation, usePreloadedQuery } from 'convex/react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { api } from '@/convex/_generated/api'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Field, FieldError, FieldLabel, FieldDescription } from '../ui/field'
import { useState } from 'react'
import { generateUploadUrl } from '@/convex/resume'
import { useUser } from '@clerk/clerk-react'
import FileUpload from './FileUpload'

const formSchema = z.object({
  resume: z
    .instanceof(File)
    .refine(
      (file) =>
        [
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'application/vnd.oasis.opendocument.text',
          'text/plain',
          ''
        ].includes(file.type),
      { message: 'Invalid resume file type' }
    )
})

export default function ResumeForm(props: {
  preloadedResume: Preloaded<typeof api.resume.getResume>
}) {
  const generateUploadUrl = useMutation(api.resume.generateUploadUrl)
  const createResume = useMutation(api.resume.createResume)
  const getResume = usePreloadedQuery(props.preloadedResume)

  const { user } = useUser()

  const [selectedResume, setSelectedResume] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      resume: undefined as unknown as File
    }
  })

  const resume = form.watch('resume')

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const postUrl = await generateUploadUrl()
      // Step 2: POST the file to the URL
      const result = await fetch(postUrl, {
        method: 'POST',
        headers: { 'Content-Type': resume!.type },
        body: resume
      })
      const { storageId } = await result.json()

      await createResume({
        resume: {
          name: resume?.name || 'unknown',
          body: storageId,
          author: user?.username || 'unknown',
          format: 'image'
        }
      })
        .then(() => {
          toast.success('Home page blurb updated successfully!')
          form.reset()
          form.setValue('resume', undefined as unknown as File)
        })
        .catch(() => {
          toast.error('Failed to update home page blurb.')
        })
    } catch (error) {
      console.error('Error creating skill:', error)
    }
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FileUpload formElementName={'resume'} />

        <Button type="submit">Submit</Button>
      </form>
    </FormProvider>
  )
}
