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

type Props = {
  client?: IClient
}

export function ClientForm({ client }: Props) {
  // const [state, formAction] = useActionState(postTech, null)

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
              <FormLabel>Techology Name</FormLabel>
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
              <FormLabel>Techology URL</FormLabel>
              <FormControl>
                <Input placeholder="Client URL" {...field} />
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

        <Button type="submit">{client ? 'Edit' : 'Create'} Client</Button>
      </form>
    </Form>
  )
}
