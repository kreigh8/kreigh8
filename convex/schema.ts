import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

// The schema is entirely optional.
// You can delete this file (schema.ts) and the
// app will continue to work.
// The schema provides more precise TypeScript types.
export default defineSchema({
  home: defineTable({
    homeBlurb: v.string()
  }),
  clients: defineTable({
    name: v.string(),
    url: v.string(),
    imageId: v.id('images'),
    active: v.boolean()
  }),
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
    body: v.id('_storage'),
    author: v.string(),
    format: v.string()
  })
})
