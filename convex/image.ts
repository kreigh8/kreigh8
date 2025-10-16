import { mutation, query, QueryCtx } from './_generated/server'
import { MutationCtx } from './_generated/server'
import { Id } from './_generated/dataModel'
import { v } from 'convex/values'

export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl()
  }
})

export async function uploadImage(
  ctx: MutationCtx,
  {
    storageId,
    author,
    format
  }: { storageId: Id<'_storage'>; author: string; format: string }
): Promise<Id<'images'>> {
  const imageId = await ctx.db.insert('images', {
    body: storageId,
    author,
    format
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
