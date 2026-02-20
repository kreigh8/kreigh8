import { MutationCtx, QueryCtx } from './_generated/server'

export async function checkForAuthenticatedUser(
  ctx: MutationCtx | QueryCtx
): Promise<void> {
  const identity = await ctx.auth.getUserIdentity()
  if (identity === null) {
    throw new Error('Not authenticated')
  }
}
