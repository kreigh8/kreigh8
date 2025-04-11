'use server'

import { ResumeFormSchema } from '@/schemas/Resume'
import { currentUser } from '@clerk/nextjs/server'
import { writeFile } from 'fs/promises'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import path from 'path'
import { z } from 'zod'

export const postResume = async (prevState: unknown, formData: FormData) => {
  const user = await currentUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  const validatedFields = ResumeFormSchema.safeParse(
    Object.fromEntries(formData.entries())
  )

  if (!validatedFields.success) {
    return {
      Error: validatedFields.error.flatten().fieldErrors
    }
  }

  const resume = formData.get('resume') as File

  const buffer = Buffer.from(await resume.arrayBuffer())

  // Replace spaces in the file name with underscores
  const filename = resume.name.replaceAll(' ', '_')

  try {
    await writeFile(
      path.join(process.cwd(), 'public/resume/' + filename),
      buffer
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation error:', error.errors)
      throw new Error('Validation errors')
    }
    console.error('Error creating resume', error)
    throw new Error('Error creating resume')
  }

  revalidatePath('/admin/resume')
  redirect('/admin/resume')
}
