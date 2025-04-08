import { connectToMongoDb } from '@/lib/db'
import Client from '@/models/client'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    await connectToMongoDb()

    const clients = await Client.find()

    return NextResponse.json({
      clients
    })
  } catch (error) {
    return NextResponse.json({
      error
    })
  }
}
