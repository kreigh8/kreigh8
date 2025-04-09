import { connectToMongoDb } from '@/lib/db'
import Client from '@/models/client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    await connectToMongoDb()

    console.log(`req.url.split('/').slice(-1)`, req.url.split('/').slice(-1)[0])

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
