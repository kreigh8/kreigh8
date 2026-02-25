import { v } from 'convex/values'
import { components } from './_generated/api'
import { Resend } from '@convex-dev/resend'
import { mutation } from './_generated/server'
import { escape } from 'lodash'

export const resend = new Resend(components.resend, {
  testMode: false
})

export const sendEmail = mutation({
  args: {
    from: v.string(),
    subject: v.string(),
    message: v.string()
  },
  handler: async (ctx, args) => {
    const santizedFrom = escape(args.from)
    const santizedSubject = escape(args.subject)
    const santizedMessage = escape(args.message)

    await resend.sendEmail(ctx, {
      from: 'khirschy@send.kreigh8.com',
      to: 'khirschy@kreigh8.com',
      subject: santizedSubject,
      text: `From: ${santizedFrom}\n\n${santizedMessage}`
    })
  }
})

// export const sendEmail = internalMutation({
//   handler: async (ctx) => {
//     await resend.sendEmail(ctx, {
//       from: 'khirschy@send.kreigh8.com',
//       to: 'khirschy@kreigh8.com',
//       subject: 'Hello',
//       text: 'This is a test email'
//     })
//   }
// })
