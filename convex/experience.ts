import { v } from 'convex/values'
import { mutation, query } from './_generated/server'
import { checkForAuthenticatedUser } from './auth'
import { updateImageRef } from './image'

export const listExperience = query({
  args: {
    count: v.optional(v.number())
  },
  handler: async (ctx) => {
    const experience = await ctx.db
      .query('experience')
      .withIndex('by_start')
      .order('desc')
      .collect()

    return experience
  }
})

export const getExperience = query({
  args: {
    id: v.id('experience')
  },

  handler: async (ctx, { id }) => {
    const experience = await ctx.db.get(id)
    if (!experience) {
      throw new Error('Experience not found')
    }

    return {
      ...experience
    }
  }
})

export const deleteExperience = mutation({
  args: {
    id: v.id('experience')
  },
  handler: async (ctx, { id }) => {
    checkForAuthenticatedUser(ctx)

    await ctx.db.delete(id)

    return { id }
  }
})

export const createExperience = mutation({
  args: {
    start: v.union(v.string(), v.number()),
    end: v.optional(v.union(v.string(), v.number())),
    title: v.string(),
    subTitle: v.optional(v.string()),
    company: v.string(),
    description: v.string(),
    technologies: v.array(v.string()),
    active: v.boolean()
  },
  handler: async (ctx, args) => {
    checkForAuthenticatedUser(ctx)

    // Insert experience into experience table
    const experienceId = await ctx.db.insert('experience', {
      start: args.start,
      end: args.end,
      title: args.title,
      subTitle: args.subTitle,
      company: args.company,
      description: args.description,
      technologies: args.technologies,
      active: args.active
    })

    console.log('Added new experience with id:', experienceId)
    return experienceId
  }
})
