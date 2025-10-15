'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Preloaded, useMutation, usePreloadedQuery } from 'convex/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { api } from '@/convex/_generated/api'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

const formSchema = z.object({
  homeBlurb: z.string().min(2, {
    message: 'Technology name must be at least 2 characters.'
  })
})

export default function HomeBlurbForm(props: {
  preloadedHomeBlurb: Preloaded<typeof api.home.getHomeBlurb>
}) {
  const createHomeBlurb = useMutation(api.home.createHomeBlurb)
  const getHomeBlurb = usePreloadedQuery(props.preloadedHomeBlurb)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      homeBlurb: getHomeBlurb?.homeBlurb ?? ''
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    createHomeBlurb({
      homeBlurb: values.homeBlurb
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="homeBlurb"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Home Page Blurb</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter home page blurb..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
