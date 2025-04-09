// import { uploadToCloudinary } from '@/lib/cloudinary'
import { connectToMongoDb } from '@/lib/db'
import Client from '@/models/client'
// import { auth } from '@clerk/nextjs/server'
// import mongoose from 'mongoose'
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
