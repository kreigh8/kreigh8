'use client'

import { useActionState } from 'react'
import { postTech } from '@/lib/actions/post-tech'
import { SubmitButton } from './SubmitButton'

export function TechnologyForm() {
  const [state, formAction] = useActionState(postTech, null)

  return (
    <form action={formAction}>
      <label
        htmlFor="techName"
        className="block text-sm font-medium text-gray-900"
      >
        Tech Name
      </label>
      <input
        type="text"
        name="techName"
        className="w-full rounded-sm border-black bg-gray-50 p-2 text-sm text-gray-900"
      />
      <div id="tech-error" aria-label="polite" aria-atomic="true">
        <p>{state?.Error?.techName}</p>
      </div>

      <SubmitButton />
    </form>
  )
}
