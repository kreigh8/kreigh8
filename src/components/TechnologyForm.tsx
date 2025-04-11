'use client'

import { postTech } from '@/lib/actions/post-tech'
import {
  Form,
  FormLabel,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TechSchema } from '@/schemas/Technology'
import { Input } from '@/components/ui/input'
import { Button } from './ui/button'
import { ITechnology } from '@/model/Technology'

type Props = {
  technology?: ITechnology
}

export function TechnologyForm({ technology }: Props) {
  // const [state, formAction] = useActionState(postTech, null)

  const form = useForm<z.infer<typeof TechSchema>>({
    resolver: zodResolver(TechSchema),
    defaultValues: {
      techName: technology ? technology.techName : '',
      techUrl: technology ? technology.techUrl : '',
      imageUrl: technology ? technology.imageUrl : '',
      imageFile: undefined
    }
  })

  const onSubmit = async (data: z.infer<typeof TechSchema>) => {
    const formData = new FormData()
    formData.append('techName', data.techName)
    formData.append('techUrl', data.techUrl)
    formData.append('imageFile', data.imageFile as File)

    postTech(null, formData)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 py-4"
      >
        <FormField
          control={form.control}
          name="techName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Techology Name</FormLabel>
              <FormControl>
                <Input placeholder="Technology Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="techUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Techology URL</FormLabel>
              <FormControl>
                <Input placeholder="Technology URL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="imageFile"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Techology URL</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  placeholder="Technology URL"
                  onChange={(event) =>
                    field.onChange(
                      event.target.files ? event.target.files[0] : null
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">
          {technology ? 'Edit' : 'Create'} Technology
        </Button>
      </form>
    </Form>
  )
}
