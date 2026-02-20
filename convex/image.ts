import { mutation, query, QueryCtx } from './_generated/server'
import { MutationCtx } from './_generated/server'
import { Id } from './_generated/dataModel'
import { v } from 'convex/values'
import { checkForAuthenticatedUser } from './auth'

export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl()
  }
})

export const deleteImage = mutation({
  args: {
    imageId: v.id('images')
  },
  handler: async (ctx, { imageId }) => {
    checkForAuthenticatedUser(ctx)

    const image = await getImageFromId(ctx, imageId)

    if (!image) {
      throw new Error('Image not found')
    }
    ctx.storage.delete(image!.body)
    ctx.db.delete(imageId)
  }
})

export const getImage = query({
  args: {
    id: v.id('images')
  },
  handler: async (ctx, { id }) => {
    const image = await ctx.db.get(id)
    console.log('Fetched image:', image)
    return image
  }
})

export async function getOrphanedImageResponse(
  ctx: QueryCtx,
  imageId: Id<'images'>
) {
  if (!imageId) return null
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
  return null
}

export async function updateImageRef(
  ctx: MutationCtx,
  {
    imageId,
    id
  }: {
    imageId: Id<'images'>
    id: Id<'clients'> | Id<'technologies'> | Id<'skills'> | Id<'homeImage'>
  }
) {
  checkForAuthenticatedUser(ctx)

  const image = await ctx.db.get(imageId)
  if (!image) {
    throw new Error('Image not found')
  }

  // Only add id if not already present
  if (!(image.refIds ?? []).includes(id)) {
    await ctx.db.patch(image._id, { refIds: [...(image.refIds ?? []), id] })
  }

  return image
}

export async function uploadImage(
  ctx: MutationCtx,
  {
    name,
    storageId,
    author,
    format
  }: { name: string; storageId: Id<'_storage'>; author: string; format: string }
): Promise<Id<'images'>> {
  console.log('Uploading image with name:', name, 'storageId:', storageId)
  const imageId = await ctx.db.insert('images', {
    body: storageId,
    author,
    format,
    name
  })

  return imageId
}

export async function getImageFromId(ctx: QueryCtx, id: Id<'images'>) {
  const image = await ctx.db.get(id)

  return image
}

export async function deleteImageFromId(
  ctx: MutationCtx,
  imageId: Id<'images'>
) {
  checkForAuthenticatedUser(ctx)

  const image = await getImageFromId(ctx, imageId)

  if (!image) {
    throw new Error('Image not found')
  }
  ctx.storage.delete(image!.body)
  ctx.db.delete(imageId)
}

export async function getImageByName(ctx: MutationCtx, name: string) {
  const images = await ctx.db
    .query('images')
    .filter((q) => q.eq(q.field('name'), name))
    .collect()

  if (images.length > 0) {
    return images[0]
  } else {
    return null
  }
}

export async function getImageFromImageId(
  ctx: QueryCtx,
  imageId: Id<'images'>
): Promise<string | null> {
  const image = await ctx.db.get(imageId)
  if (image && image.body) {
    const imageUrl = await ctx.storage.getUrl(image.body)
    return imageUrl
  }
  return null
}

// Remove id from refIds if present
export async function removeImageRef(
  ctx: MutationCtx,
  {
    imageId,
    id
  }: {
    imageId: Id<'images'>
    id: Id<'clients'> | Id<'technologies'> | Id<'skills'> | Id<'homeImage'>
  }
) {
  checkForAuthenticatedUser(ctx)

  const image = await ctx.db.get(imageId)
  if (!image) {
    throw new Error('Image not found')
  }

  if ((image.refIds ?? []).includes(id)) {
    await ctx.db.patch(image._id, {
      refIds: (image.refIds ?? []).filter((refId) => refId !== id)
    })
  }

  return image
}
