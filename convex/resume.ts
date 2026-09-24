import { v } from 'convex/values'
import { internalQuery, mutation, query } from './_generated/server'
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

    const resumeUrl =
      resume && resume.body && (await ctx.storage.getUrl(resume.body))

    return {
      ...resume,
      resumeUrl
    }
  }
})

export const getResumeDownloadUrl = query({
  handler: async (ctx) => {
    const resume = await ctx.db.query('resume').first()

    if (!resume) {
      return null
    }

    const downloadUrl = await ctx.storage.getUrl(resume.body)
    return downloadUrl
  }
})

// Used by the /resume/download HTTP action, which needs the storage id,
// original filename, and format to stream the file back with a
// Content-Disposition header (httpAction handlers don't have ctx.db).
export const getLatestResumeRecord = internalQuery({
  args: {},
  returns: v.union(
    v.object({
      name: v.string(),
      body: v.id('_storage'),
      format: v.string()
    }),
    v.null()
  ),
  handler: async (ctx) => {
    const resume = await ctx.db.query('resume').first()
    if (!resume) {
      return null
    }

    return {
      name: resume.name,
      body: resume.body,
      format: resume.format
    }
  }
})
