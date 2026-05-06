import { api } from '@/convex/_generated/api'
import { preloadQuery } from 'convex/nextjs'
import SocialButtons from './SocialButtons'

export default async function ActionButtonsPreloaded() {
  const preloadedSocialLinks = await preloadQuery(api.social.getSocialLinks, {})

  return <SocialButtons preloadedSocialLinks={preloadedSocialLinks} />
}
