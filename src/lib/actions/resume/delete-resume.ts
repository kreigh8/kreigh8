'use server'

import { currentUser } from '@clerk/nextjs/server'
import fs from 'fs'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import path from 'path'

export const deleteResume = async (filename: string) => {
  try {
    const user = await currentUser()

    if (!user) {
      throw new Error('Not authenticated')
    }

    const directoryPath = path.join(process.cwd(), 'public', 'resume') // Example: 'public/uploads' directory
    const filePath = path.join(directoryPath, filename)

    if (!filePath) {
      throw new Error('Resume not found')
    }

    fs.unlinkSync(filePath)
  } catch (error) {
    console.log('Error deleting resume ' + error)
  }

  revalidatePath('/admin/resume')
  redirect('/admin/resume')
}
