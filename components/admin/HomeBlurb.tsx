import { preloadQuery } from 'convex/nextjs'
import { api } from '@/convex/_generated/api'
import HomeBlurbForm from '../forms/HomeBlurbForm'
import HomeImageUpload from './HomeImageUpload'

export default async function HomeBlurb() {
  const preloadedHomeBlurb = await preloadQuery(api.home.getHomeBlurb)

  return (
    <article className="grid grid-cols-2 gap-4 w-full">
      <HomeBlurbForm preloadedHomeBlurb={preloadedHomeBlurb} />

      <HomeImageUpload />
    </article>
  )
}
