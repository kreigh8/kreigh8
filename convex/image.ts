import { mutation, query, QueryCtx } from './_generated/server'
import { MutationCtx } from './_generated/server'
import { Id } from './_generated/dataModel'
import { v } from 'convex/values'

export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl()
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

export async function updateImageRef(
  ctx: MutationCtx,
  {
    imageId,
    id
  }: {
    imageId: Id<'images'>
    id: Id<'clients'> | Id<'technologies'>
  }
) {
  const identity = await ctx.auth.getUserIdentity()
  if (identity === null) {
    throw new Error('Not authenticated')
  }

  const image = await ctx.db.get(imageId)
  if (!image) {
    throw new Error('Image not found')
  }

  await ctx.db.patch(image._id, {
    refIds: image.refIds ? [...image.refIds, id] : [id]
  })

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

export async function deleteImageFromId(ctx: MutationCtx, id: Id<'images'>) {
  ctx.db.delete(id)
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
