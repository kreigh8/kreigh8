import { v } from 'convex/values'
import { query, mutation } from './_generated/server'
import {
  deleteImageFromId,
  getImageByName,
  getImageFromId,
  getImageFromImageId,
  updateImageRef,
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

    const client = await ctx.db.get(args.id)

    const existingImage = await getImageFromId(ctx, client!.imageId)

    if (args.body.image && args.body.image.name !== existingImage?.name) {
      imageId = await uploadImage(ctx, {
        name: args.body.image.name,
        storageId: args.body.image.storageId,
        author: args.body.image.author,
        format: args.body.image.format
      })

      await deleteImageFromId(ctx, client!.imageId)
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

    await updateImageRef(ctx, {
      id: args.id,
      imageId: imageId ? imageId : client!.imageId
    })

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

    const client = await ctx.db.get(id)

    const image = await getImageFromId(ctx, client!.imageId)

    await deleteImageFromId(ctx, client!.imageId)

    await ctx.storage.delete(image?.body as Id<'_storage'>)

    await ctx.db.delete(id)
  }
})

export const createClient = mutation({
  args: {
    name: v.string(),
    url: v.string(),
    image: v.object({
      name: v.string(),
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

    const existingImage = await getImageByName(ctx, args.image.name)

    // Insert image into images table
    let imageId: Id<'images'>

    if (existingImage) {
      imageId = existingImage._id
    } else {
      imageId = await uploadImage(ctx, {
        name: args.image.name,
        storageId: args.image.storageId,
        author: args.image.author,
        format: args.image.format
      })
    }

    // Insert client into clients table
    const clientId = await ctx.db.insert('clients', {
      name: args.name,
      url: args.url,
      imageId: existingImage ? existingImage._id : imageId,
      active: args.active
    })

    const image = await updateImageRef(ctx, {
      id: clientId,
      imageId: existingImage ? existingImage._id : imageId
    })

    if (
      existingImage &&
      image.refIds &&
      image.refIds.length > 1 &&
      !image.refIds?.includes(clientId)
    ) {
      await deleteImageFromId(ctx, existingImage._id)
    }

    console.log('Added new client with id:', clientId)
    return clientId
  }
})
