'use client'

import {
  Form,
  FormLabel,
  FormControl,
  FormField,
  FormItem
} from '@/components/ui/form'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ResumeFormSchema } from '@/schemas/Resume'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { postResume } from '@/lib/actions/resume/post-resume'

type Props = {
  setOpen: (open: boolean) => void
}

export function ResumeUploadForm({ setOpen }: Props) {
  const form = useForm<z.infer<typeof ResumeFormSchema>>({
    resolver: zodResolver(ResumeFormSchema),
    defaultValues: {
      resume: undefined
    }
  })

  function onSubmit(values: z.infer<typeof ResumeFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const formData = new FormData()
    formData.append('resume', values.resume as File)

    postResume(null, formData)

    form.reset()
    setOpen(false)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="resume"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Resume</FormLabel>
              <FormControl>
                <Input
                  placeholder="Upload Resume"
                  type="file"
                  onChange={(event) =>
                    field.onChange(
                      event.target.files ? event.target.files[0] : null
                    )
                  }
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit">Upload</Button>
      </form>
    </Form>
  )
}
