import cloudinary from './cloudinary'

export const uploadImage = async (file: File) => {
  const fileBuffer = await file.arrayBuffer()

  const mimeType = file.type
  const encoding = 'base64'
  const base64Data = Buffer.from(fileBuffer).toString('base64')

  const fileUri = 'data:' + mimeType + ';' + encoding + ',' + base64Data

  const uploadResponse = await cloudinary.uploader.upload(fileUri)

  return uploadResponse.url
}
