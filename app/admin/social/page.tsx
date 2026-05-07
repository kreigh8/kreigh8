import SocialForm from '@/components/forms/SocialForm'
import { api } from '@/convex/_generated/api'
import { preloadQuery } from 'convex/nextjs'

export default async function AdminSocialPage() {
  const preloadedSocialLinks = await preloadQuery(api.social.getSocialLinks, {})

  return (
    <section className="flex flex-col gap-4">
      <div className="flex justify-between">
        <h1>Social Page</h1>
      </div>

      <SocialForm preloadedSocialLinks={preloadedSocialLinks} />
    </section>
  )
}
