'use server'

import connectDB from '../../db'
import { z } from 'zod'
import Technology from '@/model/Technology'
import { TechSchema } from '@/schemas/Technology'
import { currentUser } from '@clerk/nextjs/server'
import { uploadImage } from '../../uploadImage'
import cloudinary from '../../cloudinary'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export const editTech = async (prevState: unknown, formData: FormData) => {
  try {
    const user = await currentUser()

    if (!user) {
      throw new Error('Not authenticated')
    }

    const validatedFields = TechSchema.safeParse(
      Object.fromEntries(formData.entries())
    )

    console.log('validatedFields', validatedFields.error?.flatten().fieldErrors)
    if (!validatedFields.success) {
      return {
        Error: validatedFields.error.flatten().fieldErrors
      }
    }

    const techId = formData.get('_id') as string
    const techName = formData.get('techName') as string
    const techUrl = formData.get('techUrl') as string
    const imageFile = formData.get('imageFile') as File | string

    await connectDB()

    const technology = await Technology.findById(techId).exec()

    if (!technology) {
      throw new Error('Technology not found')
    }

    technology.techName = techName
    technology.techUrl = techUrl
    technology.lastUpdated = new Date()

    console.log('formData', formData)
    console.log('imageFile', typeof imageFile)
    if (imageFile !== 'undefined') {
      const imageUrl = await uploadImage(imageFile as File)

      if (imageUrl !== technology.imageUrl) {
        await cloudinary.uploader.destroy(
          technology.imageUrl.split('/').pop()!.split('.')[0]
        )
      }

      technology.imageUrl = imageUrl
    }

    await technology.save()
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation error:', error.errors)
      throw new Error('Validation errors')
    }
    console.error('Error editing technology', error)
    throw new Error('Error editing technology')
  }

  revalidatePath('/admin/technology')
  redirect('/admin/technology')
}
