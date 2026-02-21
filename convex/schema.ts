import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

// The schema is entirely optional.
// You can delete this file (schema.ts) and the
// app will continue to work.
// The schema provides more precise TypeScript types.
export default defineSchema({
  home: defineTable({
    title: v.string(),
    homeBlurb: v.string()
  }),
  homeImage: defineTable({
    imageId: v.id('images')
  }),
  clients: defineTable({
    name: v.string(),
    url: v.string(),
    imageId: v.id('images'),
    active: v.boolean()
  }).index('by_active', ['active']),
  technologies: defineTable({
    name: v.string(),
    url: v.string(),
    imageId: v.id('images')
  }),
  messages: defineTable({
    author: v.string(),
    storageId: v.id('_storage')
  }),
  images: defineTable({
    refIds: v.optional(
      v.array(
        v.union(
          v.id('homeImage'),
          v.id('clients'),
          v.id('technologies'),
          v.id('skills')
        )
      )
    ),
    name: v.string(),
    body: v.id('_storage'),
    author: v.string(),
    format: v.string()
  }),
  skills: defineTable({
    name: v.string(),
    description: v.string(),
    imageId: v.id('images')
  }),
  resume: defineTable({
    name: v.string(),
    body: v.id('_storage'),
    author: v.string(),
    format: v.string()
  })
})
