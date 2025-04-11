'use server'

import Client from '@/model/Client'
import connectDB from '../../db'
import { currentUser } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export const deleteClient = async (id: string) => {
  try {
    const user = await currentUser()

    if (!user) {
      throw new Error('Not authenticated')
    }

    await connectDB()

    const client = await Client.findByIdAndDelete(id)

    if (!client) {
      throw new Error('Client not found')
    }

    revalidatePath('/admin/clients')
    redirect('/admin/clients')
  } catch (error) {
    console.log('Error deleting client ' + error)
    throw new Error('Error deleting client')
  }
}
