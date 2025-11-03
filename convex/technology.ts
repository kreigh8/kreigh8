import { v } from 'convex/values'
import { mutation, query } from './_generated/server'
import {
  deleteImageFromId,
  getImageFromId,
  getImageFromImageId,
  uploadImage
} from './image'
import { Id } from './_generated/dataModel'

export const listTechnologies = query({
  // Validators for arguments.
  args: {
    count: v.optional(v.number())
  },

  // Query implementation.
  handler: async (ctx) => {
    //// Read the database as many times as you need here.
    //// See https://docs.convex.dev/database/reading-data.
    const technologies = await ctx.db
      .query('technologies')
      // Ordered by _creationTime, return most recent
      .order('desc')
      .collect()

    return Promise.all(
      technologies.map(async (technology) => {
        // Fetch image URL from images table
        const imageUrl = await getImageFromImageId(ctx, technology.imageId)
        return {
          ...technology,
          imageUrl
        }
      })
    )
  }
})

export const getTechnology = query({
  args: {
    id: v.id('technologies')
  },

  handler: async (ctx, { id }) => {
    const technology = await ctx.db.get(id)
    if (!technology) {
      throw new Error('Technology not found')
    }
    const imageUrl = await getImageFromImageId(ctx, technology.imageId)
    return {
      ...technology,
      imageUrl
    }
  }
})

export const updateTechnology = mutation({
  args: {
    id: v.id('technologies'),
    body: v.object({
      name: v.string(),
      url: v.string(),
      image: v.optional(
        v.object({
          name: v.string(),
          storageId: v.id('_storage'),
          author: v.string(),
          format: v.string()
        })
      )
    })
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (identity === null) {
      throw new Error('Not authenticated')
    }

    // Insert image into images table
    let imageId: Id<'images'> | undefined
    if (args.body.image) {
      imageId = await uploadImage(ctx, {
        name: args.body.image.name,
        storageId: args.body.image.storageId,
        author: args.body.image.author,
        format: args.body.image.format
      })
    }

    // Insert client into clients table
    const technologyData: {
      name: string
      url: string
      imageId?: Id<'images'>
    } = {
      name: args.body.name,
      url: args.body.url
    }

    if (imageId) {
      technologyData.imageId = imageId
    }

    await ctx.db.patch(args.id, technologyData)

    console.log('Updated technology id:', args.id)
    return args.id
  }
})

export const deleteTechnology = mutation({
  args: {
    id: v.id('technologies')
  },
  handler: async (ctx, { id }) => {
    const identity = await ctx.auth.getUserIdentity()
    if (identity === null) {
      throw new Error('Not authenticated')
    }

    const technology = await ctx.db.get(id)

    const image = await getImageFromId(ctx, technology!.imageId)

    deleteImageFromId(ctx, technology!.imageId)

    await ctx.storage.delete(image?.body as Id<'_storage'>)

    await ctx.db.delete(id)
  }
})

export const createTechnology = mutation({
  args: {
    name: v.string(),
    url: v.string(),
    image: v.object({
      name: v.string(),
      storageId: v.id('_storage'),
      author: v.string(),
      format: v.string()
    })
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (identity === null) {
      throw new Error('Not authenticated')
    }

    // Insert image into images table
    const imageId = await uploadImage(ctx, {
      name: args.image.name,
      storageId: args.image.storageId,
      author: args.image.author,
      format: args.image.format
    })

    // Insert client into clients table
    const technologyId = await ctx.db.insert('technologies', {
      name: args.name,
      url: args.url,
      imageId
    })

    console.log('Added new technology with id:', technologyId)

    return technologyId
  }
})
