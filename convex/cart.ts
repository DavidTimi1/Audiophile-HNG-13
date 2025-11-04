import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: { sessionID: v.string() },
  handler: async (ctx, { sessionID }) => {
    const cart = await ctx.db
      .query("carts")
      .withIndex("by_sessionID", (q) => q.eq("sessionID", sessionID))
      .first();
    return cart ?? { items: [], sessionID, _id: null };
  },
});

export const add = mutation({
  args: {
    sessionID: v.string(),
    item: v.object({
      slug: v.string(),
      name: v.string(),
      price: v.number(),
      image: v.string(),
      quantity: v.number(),
      category: v.string(),
    }),
  },
  handler: async (ctx, { sessionID, item }) => {
    const cart = await ctx.db
      .query("carts")
      .withIndex("by_sessionID", (q) => q.eq("sessionID", sessionID))
      .first();
    const now = Date.now();

    if (!cart) {
      await ctx.db.insert("carts", {
        sessionID,
        items: [item],
        createdAt: now,
        updatedAt: now,
      });
      return;
    }
    const items = [...cart.items];
    const idx = items.findIndex((i) => i.slug === item.slug);
    if (idx >= 0)
      items[idx] = {
        ...items[idx],
        quantity: items[idx].quantity + item.quantity,
      };
    else items.push(item);
    await ctx.db.patch(cart._id, { items, updatedAt: now });
  },
});

export const setQty = mutation({
  args: { sessionID: v.string(), slug: v.string(), quantity: v.number() },
  handler: async (ctx, { sessionID, slug, quantity }) => {
    const cart = await ctx.db
      .query("carts")
      .withIndex("by_sessionID", (q) => q.eq("sessionID", sessionID))
      .first();
    if (!cart) return;
    const items = cart.items.map((i) =>
      i.slug === slug ? { ...i, quantity: Math.max(1, quantity) } : i
    );
    await ctx.db.patch(cart._id, { items, updatedAt: Date.now() });
  },
});

export const remove = mutation({
  args: { sessionID: v.string(), slug: v.string() },
  handler: async (ctx, { sessionID, slug }) => {
    const cart = await ctx.db
      .query("carts")
      .withIndex("by_sessionID", (q) => q.eq("sessionID", sessionID))
      .first();
    if (!cart) return;
    const items = cart.items.filter((i) => i.slug !== slug);
    await ctx.db.patch(cart._id, { items, updatedAt: Date.now() });
  },
});

export const clear = mutation({
  args: { sessionID: v.string() },
  handler: async (ctx, { sessionID }) => {
    const cart = await ctx.db
      .query("carts")
      .withIndex("by_sessionID", (q) => q.eq("sessionID", sessionID))
      .first();
    if (!cart) return;
    await ctx.db.patch(cart._id, { items: [], updatedAt: Date.now() });
  },
});
