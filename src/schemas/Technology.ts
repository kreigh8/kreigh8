import { z } from 'zod'

export const TechSchema = z.object({
  techName: z
    .string({
      required_error: 'Technology name is required',
      invalid_type_error: 'Technology name must be a string'
    })
    .min(2, 'Technology name must be at least 2 characters long'),
  techUrl: z
    .string({
      required_error: 'Technology URL is required',
      invalid_type_error: 'Technology URL must be a string'
    })
    .url('Invalid URL format'),
  imageFile: z
    .any(
      z
        .instanceof(File)
        .refine(
          (file) =>
            [
              'image/png',
              'image/jpeg',
              'image/jpg',
              'image/svg+xml',
              'image/gif'
            ].includes(file.type),
          { message: 'Invalid image file type' }
        )
    )
    .optional(),
  imageUrl: z.string().optional()
})
