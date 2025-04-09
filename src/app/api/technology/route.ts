import { connectToMongoDb } from '@/lib/db'
import Technology from '@/models/technology'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    await connectToMongoDb()

    const technologies = await Technology.find()

    return NextResponse.json({
      technologies
    })
  } catch (error) {
    return NextResponse.json({
      error
    })
  }
}
