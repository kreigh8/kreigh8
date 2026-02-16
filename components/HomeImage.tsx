import { api } from '@/convex/_generated/api'
import { preloadQuery } from 'convex/nextjs'
import HomeImageComponent from './HomeImageComponent'

export default async function HomeImage() {
  const preloadedHomeImage = await preloadQuery(api.homeImage.getHomeImage, {})

  return <HomeImageComponent preloadedHomeImage={preloadedHomeImage} />
}
