import { v } from 'convex/values'
import { mutation, query } from './_generated/server'
import { checkForAuthenticatedUser } from './auth'
import { updateImageRef } from './image'

export const listExperience = query({
  args: {
    count: v.optional(v.number())
  },
  handler: async (ctx) => {
    const experiences = await ctx.db
      .query('experience')
      .withIndex('by_start')
      .order('desc')
      .collect()

    return Promise.all(
      experiences.map(async (experience) => {
        const client = await ctx.db.get(experience.clientId)

        return {
          ...experience,
          clientName: client?.name ?? 'Unknown Client',
          clientUrl: client?.url
        }
      })
    )
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

    const client = await ctx.db.get(experience.clientId)

    return {
      ...experience,
      clientName: client?.name ?? 'Unknown Client',
      clientUrl: client?.url
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
    clientId: v.id('clients'),
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
      clientId: args.clientId,
      description: args.description,
      technologies: args.technologies,
      active: args.active
    })

    console.log('Added new experience with id:', experienceId)
    return experienceId
  }
})

export const updateExperience = mutation({
  args: {
    id: v.id('experience'),
    body: v.object({
      start: v.union(v.string(), v.number()),
      end: v.optional(v.union(v.string(), v.number())),
      title: v.string(),
      subTitle: v.optional(v.string()),
      clientId: v.id('clients'),
      description: v.string(),
      technologies: v.array(v.string()),
      active: v.boolean()
    })
  },
  handler: async (ctx, args) => {
    checkForAuthenticatedUser(ctx)

    await ctx.db.patch(args.id, {
      start: args.body.start,
      end: args.body.end,
      title: args.body.title,
      subTitle: args.body.subTitle,
      clientId: args.body.clientId,
      description: args.body.description,
      technologies: args.body.technologies,
      active: args.body.active
    })

    return args.id
  }
})
