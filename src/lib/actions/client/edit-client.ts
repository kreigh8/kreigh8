'use server'

import connectDB from '../../db'
import { z } from 'zod'
import { currentUser } from '@clerk/nextjs/server'
import { uploadImage } from '../../uploadImage'
import cloudinary from '../../cloudinary'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { ClientFormSchema } from '@/schemas/Client'
import Client from '@/model/Client'

export const editClient = async (prevState: unknown, formData: FormData) => {
  try {
    const user = await currentUser()

    if (!user) {
      throw new Error('Not authenticated')
    }

    const data = Object.fromEntries(formData.entries())

    const activeFormData = data.active === 'true' ? true : false

    const validatedFields = ClientFormSchema.safeParse({
      ...data,
      active: activeFormData
    })

    if (!validatedFields.success) {
      return {
        Error: validatedFields.error.flatten().fieldErrors
      }
    }

    const clientId = formData.get('_id') as string
    const clientName = formData.get('clientName') as string
    const clientUrl = formData.get('clientUrl') as string
    const active = formData.get('active') as string
    const imageFile = formData.get('imageFile') as File | string

    await connectDB()

    const client = await Client.findById(clientId).exec()

    if (!client) {
      throw new Error('Technology not found')
    }

    client.clientName = clientName
    client.clientUrl = clientUrl
    client.active = active ? 'true' : 'false'
    client.lastUpdated = new Date()

    if (imageFile !== 'undefined') {
      const imageUrl = await uploadImage(imageFile as File)

      if (imageUrl !== client.imageUrl) {
        await cloudinary.uploader.destroy(
          client.imageUrl.split('/').pop()!.split('.')[0]
        )
      }

      client.imageUrl = imageUrl
    }

    await client.save()
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation error:', error.errors)
      throw new Error('Validation errors')
    }
    console.error('Error editing client', error)
    throw new Error('Error editing client')
  }

  revalidatePath('/admin/clients')
  redirect('/admin/clients')
}
