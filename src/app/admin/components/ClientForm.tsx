'use client'

import { useForm } from 'react-hook-form'
import * as z from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { Client } from './Clients'
import { useEffect, useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png']

const formSchema = z.object({
  clientName: z
    .string({
      required_error: 'Client name is required'
    })
    .min(2, {
      message: 'Client Name must be at least 2 characters.'
    }),
  clientUrl: z.string({
    required_error: 'Client url is required'
  }),
  active: z.boolean({}),
  imageUrl: z.string().optional(),
  imageFile: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Only .jpg, .jpeg, and .png formats are supported.'
    )
})

type ClientFormValues = z.infer<typeof formSchema>

interface Props {
  clientId?: string
}

const ClientForm = ({ clientId }: Props) => {
  const [apiData, setApiData] = useState<Client>()
  const form = useForm<ClientFormValues>({
    resolver: zodResolver(formSchema)
  })

  const onSubmit = (values: ClientFormValues) => {
    console.log(values)
  }

  useEffect(() => {
    async function getClient() {
      const res = await fetch(`${base_url}/api/clients/${clientId}`)
      const { client: clientResponse } = await res.json()
      setApiData(clientResponse)
      // form.reset(clientResponse, { keepDirtyValues: true })
    }

    getClient()
  }, [])

  useEffect(() => {
    if (apiData) {
      const updatedClient = {
        ...apiData,
        active: apiData.active === 'true'
      }

      form.reset(updatedClient)
    }
  }, [apiData, form.reset])

  const base_url =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://kreigh8.vercel.app'

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <fieldset>
          <legend>Client: {clientId}</legend>
        </fieldset>

        <FormField
          control={form.control}
          name="clientName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
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
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="active"
          render={({ field }) => (
            <FormItem className="mb-3 flex flex-row items-start space-y-0 space-x-3">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="font-normal">Active</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="imageFile"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="bg-white"
                  type="file"
                  accept=".jpg, .jpeg, .png"
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

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default ClientForm
