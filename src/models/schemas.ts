import { z } from 'zod'
import { zfd } from 'zod-form-data'

const techFormSchema = zfd.formData({
  techName: z.string({
    required_error: 'Technology name is required'
  }),
  techUrl: z.string({
    required_error: 'Technology URL is required'
  }),
  image: zfd
    .file()
    .refine((file) => file.size < 5000000, {
      message: "File can't be bigger than 5MB."
    })
    .refine(
      (file) => ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type),
      {
        message: 'File format must be either jpg, jpeg lub png.'
      }
    )
})

export { techFormSchema }
