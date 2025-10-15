import { mutation, QueryCtx } from './_generated/server'
import { MutationCtx } from './_generated/server'
import { Id } from './_generated/dataModel'

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
