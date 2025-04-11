'use server'

import connectDB from '../../db'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { currentUser } from '@clerk/nextjs/server'
import { uploadImage } from '../../uploadImage'
import { ClientSchema } from '@/schemas/Client'
import Client from '@/model/Client'

export const postClient = async (prevState: unknown, formData: FormData) => {
  const user = await currentUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  const validatedFields = ClientSchema.safeParse(
    Object.fromEntries(formData.entries())
  )

  if (!validatedFields.success) {
    return {
      Error: validatedFields.error.flatten().fieldErrors
    }
  }

  const clientName = formData.get('techName') as string
  const clientUrl = formData.get('techUrl') as string
  const active = formData.get('active') as string
  const imageFile = formData.get('imageFile') as File

  await connectDB()
  try {
    const validatedData = ClientSchema.parse({
      clientName,
      clientUrl,
      active,
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
      techName: validatedData.clientName,
      techUrl: validatedData.clientUrl,
      imageUrl: imageUrl,
      active: active,
      user: user.id,
      lastUpdated: new Date()
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation error:', error.errors)
      throw new Error('Validation errors')
    }
    console.error('Error creating technology', error)
    throw new Error('Error creating technology')
  }

  revalidatePath('/admin/technology')
  redirect('/admin/technology')
}
