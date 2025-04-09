import { uploadToCloudinary } from '@/lib/cloudinary'
import { connectToMongoDb } from '@/lib/db'
import { Technology } from '@/models/technology'
import { auth } from '@clerk/nextjs/server'
import mongoose from 'mongoose'
import { NextRequest, NextResponse } from 'next/server'

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

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { userId } = await auth()

    if (!userId) {
      throw new Error('You must be signed a new client')
    }

    await connectToMongoDb()

    const formData = await request.formData()

    console.log('body', formData)

    const file = formData.get('imageFile') as File
    const fileBuffer = await file.arrayBuffer()
    const mimeType = file.type
    const encoding = 'base64'
    const base64Data = Buffer.from(fileBuffer).toString(encoding)

    const fileUri = 'data:' + mimeType + ';' + encoding + ',' + base64Data

    const res = await uploadToCloudinary(fileUri, file.name)

    console.log('res', res)

    const technology = new Technology()
    technology.techName = formData.get('techName') as string
    technology.techUrl = formData.get('techUrl') as string
    technology.imageUrl =
      res.success && res.result ? res.result.secure_url : null
    technology.user = new mongoose.Types.ObjectId(userId)
    technology.lastUpdated = new Date()

    console.log('technology', technology)
    // const newTechnology = await Technology.create({
    //   techName: formData.get('techName'),
    //   techUrl: formData.get('techUrl'),
    //   imageUrl: res.success && res.result ? res.result.secure_url : null,
    //   user: new mongoose.Types.ObjectId(userId),
    //   lastUpdated: new Date()
    // })

    await technology.save()

    return NextResponse.json({
      message: 'Technology created successfully',
      technology: technology
    })
  } catch (error) {
    return NextResponse.json({
      error: 'Failed to create technology',
      details: error
    })
  }
}
