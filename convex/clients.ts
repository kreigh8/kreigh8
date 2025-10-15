import { v } from 'convex/values'
import { query, mutation } from './_generated/server'
import { getImageFromImageId, uploadImage } from './image'

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
