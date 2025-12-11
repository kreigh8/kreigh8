import { v } from 'convex/values'
import { query, mutation } from './_generated/server'
import {
  deleteImageFromId,
  getImageByName,
  getImageFromId,
  getImageFromImageId,
  removeImageRef,
  updateImageRef,
  uploadImage
} from './image'
import { Id } from './_generated/dataModel'
import { checkForAuthenticatedUser } from './auth'

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
    checkForAuthenticatedUser(ctx)

    let imageId: Id<'images'> | undefined
    const client = await ctx.db.get(args.id)
    let removedImage: any = undefined

    // Get the previous image before any changes
    const previousImageId = client!.imageId

    // Track if image is changed
    let imageChanged = false
    if (args.body.image && args.body.image.name !== client?.name) {
      imageChanged = true
      // Upload or get new image
      let newImage = await getImageByName(ctx, args.body.image.name)
      if (newImage) {
        imageId = newImage._id
      } else {
        imageId = await uploadImage(ctx, {
          name: args.body.image.name,
          storageId: args.body.image.storageId,
          author: args.body.image.author,
          format: args.body.image.format
        })
      }
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

    // If image changed, remove ref from previous image
    if (imageChanged) {
      await removeImageRef(ctx, {
        id: args.id,
        imageId: previousImageId
      })
    }

    // Always update ref for the new image
    await updateImageRef(ctx, {
      id: args.id,
      imageId: imageId || previousImageId
    })

    // After updating, check if the previous image has no more refs
    const prevImage = await getImageFromId(ctx, previousImageId)
    if (prevImage && (!prevImage.refIds || prevImage.refIds.length === 0)) {
      removedImage = prevImage
    }

    if (removedImage) {
      const removedImageUrl = await getImageFromImageId(ctx, removedImage._id)

      return {
        id: args.id,
        removedImageUrl,
        removedImageId: removedImage._id
      }
    }

    return {
      id: args.id
    }
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
    checkForAuthenticatedUser(ctx)

    const client = await ctx.db.get(id)
    const imageId = client?.imageId as Id<'images'>

    await removeImageRef(ctx, {
      id,
      imageId
    })

    await ctx.db.delete(id)

    // Refetch image after client is deleted to get updated refIds
    const updatedImage = await getImageFromId(ctx, imageId)
    if (
      updatedImage &&
      (!updatedImage.refIds || updatedImage.refIds.length === 0)
    ) {
      const removedImageUrl = await getImageFromImageId(ctx, updatedImage._id)
      return {
        removedImageId: updatedImage._id,
        removedImageUrl
      }
    }

    return { id }
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
    checkForAuthenticatedUser(ctx)

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
      return {
        imageToDelete: existingImage,
        clientId
      }
      // await deleteImageFromId(ctx, clientId, existingImage._id)
    }

    console.log('Added new client with id:', clientId)
    return clientId
  }
})
