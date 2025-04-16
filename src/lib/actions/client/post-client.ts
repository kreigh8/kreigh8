'use server'

import connectDB from '../../db'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { currentUser } from '@clerk/nextjs/server'
import { uploadImage } from '../../uploadImage'
import { ClientFormSchema } from '@/schemas/Client'
import Client from '@/model/Client'

export const postClient = async (prevState: unknown, formData: FormData) => {
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

  const clientName = formData.get('clientName') as string

  const clientUrl = formData.get('clientUrl') as string

  const active = formData.get('active') as string
  const imageFile = formData.get('imageFile') as File

  await connectDB()
  try {
    const validatedData = ClientFormSchema.parse({
      clientName,
      clientUrl,
      activeFormData,
      imageFile
    })

    const existingTechnology = await Client.findOne({
      techName: clientName
    })

    if (existingTechnology) {
      throw new Error('Technology already exists')
    }

    const imageUrl = await uploadImage(imageFile)

    await Client.create({
      clientName: validatedData.clientName,
      clientUrl: validatedData.clientUrl,
      imageUrl: imageUrl,
      active: active ? 'true' : 'false',
      user: user.id,
      lastUpdated: new Date()
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation error:', error.errors)
      throw new Error('Validation errors')
    }
    console.error('Error creating clients', error)
    throw new Error('Error creating clients')
  }

  revalidatePath('/admin/clients')
  redirect('/admin/clients')
}
