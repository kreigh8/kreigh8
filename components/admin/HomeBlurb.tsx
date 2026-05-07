import { preloadQuery } from 'convex/nextjs'
import { api } from '@/convex/_generated/api'
import HomeBlurbForm from '../forms/HomeBlurbForm'
import AboutForm from '../forms/AboutForm'

export default async function HomeBlurb() {
  const preloadedHomeBlurb = await preloadQuery(api.home.getHomeBlurb)

  const preloadedAboutBlurb = await preloadQuery(api.about.getAboutBlurb)

  return (
    <article className="grid grid-cols-2 gap-4 w-full">
      <HomeBlurbForm preloadedHomeBlurb={preloadedHomeBlurb} />

      <AboutForm preloadedAbout={preloadedAboutBlurb} />
    </article>
  )
}
