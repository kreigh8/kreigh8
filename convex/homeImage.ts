import { v } from 'convex/values'
import { Id } from './_generated/dataModel'
import { mutation, query } from './_generated/server'
import {
  getImageByName,
  getImageFromId,
  getImageFromImageId,
  getOrphanedImageResponse,
  removeImageRef,
  updateImageRef,
  uploadImage
} from './image'
import { checkForAuthenticatedUser } from './auth'

export const getHomeImage = query({
  handler: async (ctx) => {
    const homeImage = await ctx.db
      .query('homeImage')
      // Ordered by _creationTime, return most recent
      .first()

    if (!homeImage) {
      return null
    }

    const imageUrl = await getImageFromImageId(ctx, homeImage.imageId)

    return {
      ...homeImage,
      imageUrl
    }
  }
})

export const updateHomeImage = mutation({
  args: {
    id: v.id('homeImage'),
    body: v.object({
      image: v.object({
        name: v.string(),
        storageId: v.id('_storage'),
        author: v.string(),
        format: v.string()
      })
    })
  },
  handler: async (ctx, args) => {
    checkForAuthenticatedUser(ctx)

    let imageId: Id<'images'> | undefined
    const homeImage = await ctx.db.get(args.id)

    const imageData = await getImageFromId(ctx, homeImage!.imageId)

    // Get the previous image before any changes
    const previousImageId = homeImage!.imageId

    let imageChanged = false
    if (args.body.image && args.body.image.name !== imageData?.name) {
      imageChanged = true
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

    const homeImageData: {
      imageId?: Id<'images'>
    } = {}

    if (imageId) {
      homeImageData.imageId = imageId
    }
    await ctx.db.patch(args.id, homeImageData)

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
    const orphanedImage = await getOrphanedImageResponse(ctx, previousImageId)
    if (orphanedImage) {
      return { id: args.id, ...orphanedImage }
    }

    return {
      id: args.id
    }
  }
})

export const createHomeImage = mutation({
  args: {
    image: v.object({
      name: v.string(),
      storageId: v.id('_storage'),
      author: v.string(),
      format: v.string()
    })
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
    const homeImageId = await ctx.db.insert('homeImage', {
      imageId
    })

    await updateImageRef(ctx, {
      id: homeImageId,
      imageId
    })

    console.log('Added new home image with id:', homeImageId)
    return homeImageId
  }
})
