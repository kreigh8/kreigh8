import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const createHomeBlurb = mutation({
  args: {
    homeBlurb: v.string()
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (identity === null) {
      throw new Error('Not authenticated')
    }
    // Insert image into images table

    const existingBlurb = await ctx.db.query('home').first()

    if (existingBlurb) {
      // If a blurb already exists, update it instead of creating a new one
      await ctx.db.patch(existingBlurb._id, { homeBlurb: args.homeBlurb })
      return existingBlurb._id
    }

    const homeBlurbId = await ctx.db.insert('home', {
      homeBlurb: args.homeBlurb
    })

    console.log('Added new client with id:', homeBlurbId)
    return homeBlurbId
  }
})

export const getHomeBlurb = query({
  // Query implementation.
  handler: async (ctx) => {
    //// Read the database as many times as you need here.
    //// See https://docs.convex.dev/database/reading-data.
    const homeBlurb = await ctx.db
      .query('home')
      // Ordered by _creationTime, return most recent
      .first()

    return homeBlurb
  }
})
