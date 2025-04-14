'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogTrigger,
  DialogDescription,
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog'
import {
  Form,
  FormLabel,
  FormControl,
  FormField,
  FormItem
} from '@/components/ui/form'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import ReCAPTCHA from 'react-google-recaptcha'
import { useRef } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

const formSchema = z.object({
  contactName: z
    .string({
      required_error: 'Name is required'
    })
    .min(2, {
      message: 'Name must be at least 2 characters'
    }),
  email: z
    .string({
      required_error: 'Email is required'
    })
    .email({
      message: 'Invalid email address'
    }),
  message: z
    .string({
      required_error: 'Message is required'
    })
    .min(10, {
      message: 'Message must be at least 10 characters'
    }),
  recaptcha: z.string().optional()
})

function ContactMe() {
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contactName: '',
      email: '',
      message: ''
    }
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    let token
    if (recaptchaRef.current) {
      token = recaptchaRef.current.getValue()
      if (!token) {
        alert('Please complete the reCAPTCHA.')
        return
      }
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...data, recaptchaToken: token })
      })

      const responseData = await response.json()

      if (response.ok) {
        toast.success('Email has been sent')
      } else {
        throw new Error(responseData.message || 'Something went wrong.')
      }
    } catch (error) {
      console.error(error)
    } finally {
      if (recaptchaRef.current) {
        recaptchaRef.current.reset()
      }
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-fit">Contact Me</Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <DialogTitle>Contact Me</DialogTitle>
            <DialogDescription className="text-black dark:text-white">
              Let&apos;s work together! Drop me a line and I&apos;ll get back to
              you in a timely manner.
            </DialogDescription>
            <FormField
              control={form.control}
              name="contactName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your email" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="How can I assist you?"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button
                  variant="secondary"
                  type="button"
                  onClick={() => form.reset()}
                >
                  Cancel
                </Button>
              </DialogClose>
              {process.env.NODE_ENV === 'production' && (
                <ReCAPTCHA
                  sitekey={process.env.NEXT_GOOGLE_CAPTHA_KEY as string}
                  ref={recaptchaRef}
                />
              )}

              <DialogClose asChild>
                <Button type="submit">Send</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default ContactMe
