import { v } from 'convex/values'
import { mutation, query } from './_generated/server'
import { getImageFromImageId } from './image'
import { checkForAuthenticatedUser } from './auth'

export const getSocialLinks = query({
  args: {},

  handler: async (ctx) => {
    const socialLinks = await ctx.db.query('social').order('desc').collect()

    return {
      linkedIn: socialLinks[0]?.linkedIn ?? '',
      gitHub: socialLinks[0]?.gitHub ?? ''
    }
  }
})

export const createSocialLinks = mutation({
  args: {
    linkedIn: v.string(),
    gitHub: v.string()
  },
  handler: async (ctx, args) => {
    checkForAuthenticatedUser(ctx)
    // Insert image into images table

    const existingLinks = await ctx.db.query('social').first()

    if (existingLinks) {
      // If social links already exist, update them instead of creating new ones
      await ctx.db.patch(existingLinks._id, {
        linkedIn: args.linkedIn,
        gitHub: args.gitHub
      })
      return existingLinks._id
    }

    const socialLinksId = await ctx.db.insert('social', {
      linkedIn: args.linkedIn,
      gitHub: args.gitHub
    })

    console.log('Added new social links with id:', socialLinksId)
    return socialLinksId
  }
})

export const updateSocialLinks = mutation({
  args: {
    linkedIn: v.string(),
    gitHub: v.string()
  },
  handler: async (ctx, args) => {
    checkForAuthenticatedUser(ctx)

    const existingLinks = await ctx.db.query('social').first()

    if (!existingLinks) {
      throw new Error('No existing social links found to update.')
    }

    await ctx.db.patch(existingLinks._id, {
      linkedIn: args.linkedIn,
      gitHub: args.gitHub
    })

    console.log('Updated social links with id:', existingLinks._id)
    return existingLinks._id
  }
})
