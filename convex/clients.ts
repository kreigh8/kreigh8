import { v } from 'convex/values'
import { query, mutation } from './_generated/server'
import {
  deleteImageFromId,
  getImageFromId,
  getImageFromImageId,
  uploadImage
} from './image'
import { Id } from './_generated/dataModel'

export const listClients = query({
  args: {
    count: v.optional(v.number())
  },

  handler: async (ctx) => {
    const clients = await ctx.db.query('clients').order('desc').collect()

    return Promise.all(
      clients.map(async (client) => {
        const imageUrl = await getImageFromImageId(ctx, client.imageId)

        return {
          ...client,
          imageUrl
        }
      })
    )
  }
})

export const updateClient = mutation({
  args: {
    id: v.id('clients'),
    body: v.object({
      name: v.string(),
      url: v.string(),
      active: v.boolean(),
      image: v.optional(
        v.object({
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
        storageId: args.body.image.storageId,
        author: args.body.image.author,
        format: args.body.image.format
      })
    }

    // Insert client into clients table
    const clientData: {
      name: string
      url: string
      active: boolean
      imageId?: Id<'images'>
    } = {
      name: args.body.name,
      url: args.body.url,
      active: args.body.active
    }

    if (imageId) {
      clientData.imageId = imageId
    }

    await ctx.db.patch(args.id, clientData)

    console.log('Updated client id:', args.id)
    return args.id
  }
})

export const getClient = query({
  args: {
    id: v.id('clients')
  },

  handler: async (ctx, { id }) => {
    const client = await ctx.db.get(id)
    if (!client) {
      throw new Error('Client not found')
    }
    const imageUrl = await getImageFromImageId(ctx, client.imageId)
    return {
      ...client,
      imageUrl
    }
  }
})

export const deleteClient = mutation({
  args: {
    id: v.id('clients')
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

export const createClient = mutation({
  args: {
    name: v.string(),
    url: v.string(),
    image: v.object({
      storageId: v.id('_storage'),
      author: v.string(),
      format: v.string()
    }),
    active: v.boolean()
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (identity === null) {
      throw new Error('Not authenticated')
    }
    // Insert image into images table
    const imageId = await uploadImage(ctx, {
      storageId: args.image.storageId,
      author: args.image.author,
      format: args.image.format
    })

    // Insert client into clients table
    const clientId = await ctx.db.insert('clients', {
      name: args.name,
      url: args.url,
      imageId,
      active: args.active
    })

    console.log('Added new client with id:', clientId)
    return clientId
  }
})
