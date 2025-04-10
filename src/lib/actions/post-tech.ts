'use server'

import connectDB from '../db'
import { z } from 'zod'
import Technology from '@/model/Technology'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const TechSchema = z.object({
  techName: z
    .string({
      required_error: 'Technology name is required',
      invalid_type_error: 'Technology name must be a string'
    })
    .min(2, 'Technology name must be at least 2 characters long')
})

export const postTech = async (prevState: unknown, formData: FormData) => {
  console.log('prevState', prevState)
  const validatedFields = TechSchema.safeParse(
    Object.fromEntries(formData.entries())
  )

  if (!validatedFields.success) {
    return {
      Error: validatedFields.error.flatten().fieldErrors
    }
  }

  const techName = formData.get('techName') as string

  await connectDB()
  try {
    const validatedData = TechSchema.parse({ techName })
    await Technology.create({
      techName: validatedData.techName,
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
  revalidatePath('/')
  redirect('/')
}
