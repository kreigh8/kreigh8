import { v } from 'convex/values'
import { Id } from './_generated/dataModel'
import { mutation, query } from './_generated/server'
import { checkForAuthenticatedUser } from './auth'
import {
  getImageByName,
  uploadImage,
  updateImageRef,
  getImageFromImageId,
  removeImageRef,
  getOrphanedImageResponse
} from './image'

export const listSkills = query({
  args: {
    count: v.optional(v.number())
  },

  handler: async (ctx) => {
    const skills = await ctx.db.query('skills').order('desc').collect()

    return Promise.all(
      skills.map(async (skill) => {
        const imageUrl = await getImageFromImageId(ctx, skill.imageId)

        return {
          ...skill,
          imageUrl
        }
      })
    )
  }
})

export const updateSkill = mutation({
  args: {
    id: v.id('skills'),
    body: v.object({
      name: v.string(),
      description: v.string(),
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
    const skill = await ctx.db.get(args.id)

    // Get the previous image before any changes
    const previousImageId = skill!.imageId

    // Track if image is changed
    let imageChanged = false
    if (args.body.image && args.body.image.name !== skill?.name) {
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

    // Insert skill into skills table
    const skillData: {
      name: string
      description: string
      imageId?: Id<'images'>
    } = {
      name: args.body.name,
      description: args.body.description
    }
    if (imageId) {
      skillData.imageId = imageId
    }
    await ctx.db.patch(args.id, skillData)

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

export const createSkill = mutation({
  args: {
    name: v.string(),
    description: v.string(),
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
    const skillId = await ctx.db.insert('skills', {
      name: args.name,
      description: args.description,
      imageId: existingImage ? existingImage._id : imageId
    })

    await updateImageRef(ctx, {
      id: skillId,
      imageId: existingImage ? existingImage._id : imageId
    })

    console.log('Added new skill with id:', skillId)
    return skillId
  }
})

export const getSkill = query({
  args: {
    id: v.id('skills')
  },

  handler: async (ctx, { id }) => {
    const skill = await ctx.db.get(id)
    if (!skill) {
      throw new Error('Skill not found')
    }
    const imageUrl = await getImageFromImageId(ctx, skill.imageId)
    return {
      ...skill,
      imageUrl
    }
  }
})

export const deleteSkill = mutation({
  args: {
    id: v.id('skills')
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

    // Use common orphaned image response helper
    const orphanedImage = await getOrphanedImageResponse(ctx, imageId)
    if (orphanedImage) {
      return orphanedImage
    }

    return { id }
  }
})
