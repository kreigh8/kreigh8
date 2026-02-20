import { preloadQuery } from 'convex/nextjs'
import { api } from '@/convex/_generated/api'
import HomeBlurbForm from '../forms/HomeBlurbForm'
import HomeImageForm from '../forms/HomeImageForm'

export default async function HomeBlurb() {
  const preloadedHomeBlurb = await preloadQuery(api.home.getHomeBlurb)

  const preloadedHomeImage = await preloadQuery(api.homeImage.getHomeImage)

  return (
    <article className="grid grid-cols-2 gap-4 w-full">
      <HomeBlurbForm preloadedHomeBlurb={preloadedHomeBlurb} />

      <HomeImageForm preloadedHomeImage={preloadedHomeImage} />
    </article>
  )
}
