import { v } from 'convex/values'
import { mutation, query } from './_generated/server'
import { checkForAuthenticatedUser } from './auth'
import { Id } from './_generated/dataModel'

export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl()
  }
})

export const createResume = mutation({
  args: {
    resume: v.object({
      name: v.string(),
      body: v.id('_storage'),
      author: v.string(),
      format: v.string()
    })
  },
  handler: async (ctx, args) => {
    checkForAuthenticatedUser(ctx)

    const resumeId: Id<'resume'> = await ctx.db.insert('resume', {
      name: args.resume.name,
      body: args.resume.body,
      author: args.resume.author,
      format: args.resume.format
    })

    console.log('Added new resume with id:', resumeId)
    return resumeId
  }
})

export const getResume = query({
  // Query implementation.
  handler: async (ctx) => {
    //// Read the database as many times as you need here.
    //// See https://docs.convex.dev/database/reading-data.
    const resume = await ctx.db
      .query('resume')
      // Ordered by _creationTime, return most recent
      .first()

    const resumeUrl = resume && resume.body && await ctx.storage.getUrl(resume.body)

    return {
      ...resume,
      resumeUrl,
    }
  }
})

export const getResumeDownloadUrl = query({
  handler: async (ctx) => {
    const resume = await ctx.db
      .query('resume')
      .first()

    if (!resume) {
      return null
    }

    const downloadUrl = await ctx.storage.getUrl(resume.body)
    return downloadUrl
  }
})
