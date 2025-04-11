'use client'

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
import { IClient } from '@/model/Client'
import { ClientSchema } from '@/schemas/Client'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { editClient } from '@/lib/actions/client/edit-client'
import { postClient } from '@/lib/actions/client/post-client'
import { useState } from 'react'
import Image from 'next/image'
import { getImageData } from '@/lib/getImageData'

type Props = {
  client?: IClient
}

export function ClientForm({ client }: Props) {
  // const [state, formAction] = useActionState(postTech, null)
  const [preview, setPreview] = useState<string>(client ? client.imageUrl : '')

  const form = useForm<z.infer<typeof ClientSchema>>({
    resolver: zodResolver(ClientSchema),
    defaultValues: {
      clientName: client ? client.clientName : '',
      clientUrl: client ? client.clientUrl : '',
      imageUrl: client ? client.imageUrl : '',
      active: client ? client.active === 'true' : false,
      imageFile: undefined
    }
  })

  const onSubmit = async (data: z.infer<typeof ClientSchema>) => {
    const formData = new FormData()
    if (client) {
      formData.append('_id', client._id)
    }
    formData.append('clientName', data.clientName)
    formData.append('clientUrl', data.clientUrl)
    formData.append('active', data.active ? 'true' : 'false')
    formData.append('imageFile', data.imageFile as File)

    if (client) {
      editClient(null, formData)
    } else {
      postClient(null, formData)
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
          name="clientName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Client Name</FormLabel>
              <FormControl>
                <Input placeholder="Client Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="clientUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Client URL</FormLabel>
              <FormControl>
                <Input placeholder="Client URL" {...field} />
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
              <FormLabel>Client URL</FormLabel>
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

        <Button type="submit">{client ? 'Edit' : 'Create'} Client</Button>
      </form>
    </Form>
  )
}
