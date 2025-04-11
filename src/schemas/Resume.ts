import { z } from 'zod'

export const ResumeFormSchema = z.object({
  resume: z
    .any(
      z
        .instanceof(File)
        .refine(
          (file) =>
            [
              'application/pdf',
              'application/vnd.ms-excel',
              'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            ].includes(file.type),
          { message: 'Invalid image file type' }
        )
    )
    .optional()
})
