'use server'

import Technology from '@/model/Technology'
import connectDB from '../../db'
import { currentUser } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export const deleteTechnology = async (id: string) => {
  try {
    const user = await currentUser()

    if (!user) {
      throw new Error('Not authenticated')
    }

    await connectDB()

    const technology = await Technology.findByIdAndDelete(id)

    if (!technology) {
      throw new Error('Technology not found')
    }

    revalidatePath('/admin/technology')
    redirect('/admin/technology')
  } catch (error) {
    console.log('Error deleting technology ' + error)
    return []
  }
}
