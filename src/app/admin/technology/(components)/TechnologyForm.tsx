'use client'

import { postTech } from '@/lib/actions/technology/post-tech'
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
import { ITechnology } from '@/model/Technology'
import { editTech } from '@/lib/actions/technology/edit-tech'
import { Button } from '@/components/ui/button'
import { getImageData } from '@/lib/getImageData'
import Image from 'next/image'
import { useState } from 'react'

type Props = {
  technology?: ITechnology
}

export function TechnologyForm({ technology }: Props) {
  // const [state, formAction] = useActionState(postTech, null)
  const [preview, setPreview] = useState<string>(
    technology ? technology.imageUrl : ''
  )

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
    if (technology) {
      formData.append('_id', technology._id)
    }
    formData.append('techName', data.techName)
    formData.append('techUrl', data.techUrl)
    formData.append('imageFile', data.imageFile as File)

    if (technology) {
      editTech(null, formData)
    } else {
      postTech(null, formData)
    }
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

        {preview !== '' && (
          <Image src={preview} alt="Preview Image" width={240} height={240} />
        )}

        <FormField
          control={form.control}
          name="imageFile"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Techology URL</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept=".jpg, .jpeg, .png, .svg"
                  placeholder="Technology URL"
                  onChange={(event) => {
                    const { files, displayUrl } = getImageData(event)
                    setPreview(displayUrl)
                    field.onChange(files.length > 0 ? files[0] : null)
                  }}
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
