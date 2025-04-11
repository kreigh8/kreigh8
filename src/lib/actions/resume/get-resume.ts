import path from 'path'
import fs from 'fs'

export async function getResumes() {
  try {
    const files = await fs.promises.readdir(
      path.join(process.cwd(), 'public/resume')
    )

    const response = []

    for (const file of files) {
      const extension = path.extname(file)
      const fileSizeInBytes = fs.statSync('public/resume/' + file).size
      const dateOfUpload = fs.statSync('public/resume/' + file).birthtime
      response.push({ name: file, extension, fileSizeInBytes, dateOfUpload })
    }

    console.log('response', response)
    return response
  } catch (error) {
    console.error('Error reading resume directory', error)
    return []
  }
}
