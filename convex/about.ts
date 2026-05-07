import { v } from 'convex/values'
import { mutation, query } from './_generated/server'
import { checkForAuthenticatedUser } from './auth'

export const createAboutBlurb = mutation({
  args: {
    blurb: v.string()
  },
  handler: async (ctx, args) => {
    checkForAuthenticatedUser(ctx)
    // Insert image into images table

    const existingBlurb = await ctx.db.query('about').first()

    if (existingBlurb) {
      // If a blurb already exists, update it instead of creating a new one
      await ctx.db.patch(existingBlurb._id, {
        blurb: args.blurb
      })
      return existingBlurb._id
    }

    const aboutBlurbId = await ctx.db.insert('about', {
      blurb: args.blurb
    })

    console.log('Added new about blurb with id:', aboutBlurbId)
    return aboutBlurbId
  }
})

export const getAboutBlurb = query({
  // Query implementation.
  handler: async (ctx) => {
    //// Read the database as many times as you need here.
    //// See https://docs.convex.dev/database/reading-data.
    const aboutBlurb = await ctx.db
      .query('about')
      // Ordered by _creationTime, return most recent
      .first()

    return aboutBlurb
  }
})
