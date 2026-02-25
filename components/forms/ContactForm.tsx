'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { Field, FieldError, FieldLabel } from '../ui/field'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Send } from 'lucide-react'
import { Button } from '../ui/button'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { startTransition } from 'react'
import { toast } from 'sonner'

const formSchema = z.object({
  from: z.email({ message: 'Please enter a valid email address.' }),
  subject: z.string().min(5, {
    message: 'Subject must be at least 5 characters long.'
  }),
  message: z.string().min(10, {
    message: 'Message must be at least 10 characters long.'
  })
})

export default function ContactForm() {
  const sendEmail = useMutation(api.email.sendEmail)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      from: '',
      subject: '',
      message: ''
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Handle form submission, e.g., send data to an API route
    try {
      startTransition(async () => {
        await sendEmail(values)
        form.reset()
        toast.success('Email sent successfully!')
      })
    } catch (error) {
      console.error('Error sending email:', error)
      toast.error('Failed to send email. Please try again.')
    }
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Controller
          name="from"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={'contact-email'}>Email</FieldLabel>
              <Input
                {...field}
                id={'contact-email'}
                aria-invalid={fieldState.invalid}
                placeholder="example@email.com"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="subject"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={'contact-subject'}>Subject</FieldLabel>
              <Input
                {...field}
                id={'contact-subject'}
                aria-invalid={fieldState.invalid}
                placeholder="Enter the subject of your message"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="subject"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={'contact-message'}>Message</FieldLabel>
              <Textarea
                {...field}
                id={'contact-message'}
                aria-invalid={fieldState.invalid}
                placeholder="Enter the message"
                className="resize-none"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Button type="submit">
          <Send /> Contact Me
        </Button>
      </form>
    </FormProvider>
  )
}
