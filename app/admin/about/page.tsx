import AboutForm from '@/components/forms/AboutForm'
import { api } from '@/convex/_generated/api'
import { preloadQuery } from 'convex/nextjs'

export default async function AboutPage() {
  const preloadedAbout = await preloadQuery(api.about.getAboutBlurb, {})

  return <AboutForm preloadedAbout={preloadedAbout} />
}
