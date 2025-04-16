import { z } from 'zod'

export const ClientFormSchema = z.object({
  clientName: z
    .string({
      required_error: 'Client name is required',
      invalid_type_error: 'Client name must be a string'
    })
    .min(2, 'Client name must be at least 2 characters long'),
  clientUrl: z
    .string({
      required_error: 'Client URL is required',
      invalid_type_error: 'Client URL must be a string'
    })
    .url('Invalid URL format'),
  active: z
    .boolean({
      required_error: 'Active status is required',
      invalid_type_error: 'Active status must be a boolean'
    })
    .optional(),
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
