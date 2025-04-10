'use server'

import connectDB from '../db'
import { z } from 'zod'
import Technology from '@/model/Technology'
import { TechSchema } from '@/schemas/Technology'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { currentUser } from '@clerk/nextjs/server'
import { uploadImage } from '../uploadImage'

export const postTech = async (prevState: unknown, formData: FormData) => {
  const user = await currentUser()

  console.log('user', user)
  if (!user) {
    throw new Error('Not authenticated')
  }

  const validatedFields = TechSchema.safeParse(
    Object.fromEntries(formData.entries())
  )

  if (!validatedFields.success) {
    return {
      Error: validatedFields.error.flatten().fieldErrors
    }
  }

  const techName = formData.get('techName') as string
  const techUrl = formData.get('techUrl') as string
  const imageFile = formData.get('imageFile') as File

  await connectDB()
  try {
    const validatedData = TechSchema.parse({ techName, techUrl, imageFile })

    const existingTechnology = await Technology.findOne({
      techName: techName
    })

    if (existingTechnology) {
      throw new Error('Technology already exists')
    }

    const imageUrl = await uploadImage(imageFile)

    await Technology.create({
      techName: validatedData.techName,
      techUrl: validatedData.techUrl,
      imageUrl: imageUrl,
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
