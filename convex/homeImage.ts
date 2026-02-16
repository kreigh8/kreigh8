import { v } from 'convex/values'
import { Id } from './_generated/dataModel'
import { query } from './_generated/server'
import { getImageFromImageId } from './image'

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
