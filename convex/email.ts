import { components } from './_generated/api'
import { Resend } from '@convex-dev/resend'
import { internalMutation } from './_generated/server'

export const resend = new Resend(components.resend, {
  testMode: false
})

export const sendEmail = internalMutation({
  handler: async (ctx) => {
    await resend.sendEmail(ctx, {
      from: 'khirschy@send.kreigh8.com',
      to: 'khirschy@kreigh8.com',
      subject: 'Hello',
      text: 'This is a test email'
    })
  }
})
