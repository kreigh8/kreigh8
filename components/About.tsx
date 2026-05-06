import { api } from '@/convex/_generated/api'
import { preloadQuery } from 'convex/nextjs'
import AboutText from './AboutText'

export default async function About() {
  const preloadedAbout = await preloadQuery(api.about.getAboutBlurb, {})

  return <AboutText preloadedAbout={preloadedAbout} />
}
