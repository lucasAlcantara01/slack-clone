import { getAuthUserId } from '@convex-dev/auth/server';
import { v } from 'Convex/values';
import { mutation, query } from './_generated/server';

export const create = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    const joinCode = '123456';

    if (!userId) {
      return;
    }

    const workspaceId = await ctx.db.insert('workspaces', {
      name: args.name,
      userId,
      joinCode,
    });

    return workspaceId;
  },
});

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('workspaces').collect();
  },
});
