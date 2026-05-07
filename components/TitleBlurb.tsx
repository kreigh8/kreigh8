import { api } from '@/convex/_generated/api'
import { preloadQuery } from 'convex/nextjs'
import BlurbText from './BlurbText'

export default async function TitleBlurb() {
  const preloadedHomeBlurb = await preloadQuery(api.home.getHomeBlurb, {})

  return <BlurbText preloadedHomeBlurb={preloadedHomeBlurb} />
}
