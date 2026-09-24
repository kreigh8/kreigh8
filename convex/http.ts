import { httpRouter } from 'convex/server'
import { httpAction } from './_generated/server'
import { internal } from './_generated/api'

const http = httpRouter()

// Streams the resume file back with a Content-Disposition header set to
// the original uploaded filename, so the browser saves it under that name
// instead of the opaque Convex storage id (which is all a raw storage URL
// gives you, since the `download` attribute is ignored for cross-origin
// links).
http.route({
  path: '/resume/download',
  method: 'GET',
  handler: httpAction(async (ctx) => {
    const resume = await ctx.runQuery(internal.resume.getLatestResumeRecord)

    if (!resume) {
      return new Response('Resume not found', { status: 404 })
    }

    const file = await ctx.storage.get(resume.body)
    if (!file) {
      return new Response('Resume file not found', { status: 404 })
    }

    const filename = resume.name.replace(/"/g, "'")

    return new Response(file, {
      status: 200,
      headers: new Headers({
        'Content-Type': resume.format || 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${filename}"; filename*=UTF-8''${encodeURIComponent(resume.name)}`,
        'Cache-Control': 'no-store'
      })
    })
  })
})

export default http
