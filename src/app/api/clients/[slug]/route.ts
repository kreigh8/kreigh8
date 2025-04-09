import Client from '@/models/client'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { connectToMongoDb } from '@/lib/db'

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      throw new Error('You must be signed in to view this client')
    }

    await connectToMongoDb()

    const client = await Client.findById(req.url.split('/').slice(-1)[0])

    return NextResponse.json({
      client
    })
  } catch (error) {
    return NextResponse.json({
      error
    })
  }
}
