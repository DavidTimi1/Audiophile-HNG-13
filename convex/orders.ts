import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

function nid() {
  return "ORD-" + Math.random().toString(36).slice(2, 8).toUpperCase();
}

export const create = mutation({
  args: {
    sessionID: v.string(),
    items: v.array(
      v.object({
        slug: v.string(),
        name: v.string(),
        price: v.number(),
        image: v.string(),
        quantity: v.number(),
        category: v.string(),
      })
    ),
    totals: v.object({
      subtotal: v.number(),
      shipping: v.number(),
      vat: v.number(),
      grandTotal: v.number(),
    }),
    customer: v.object({
      name: v.string(),
      email: v.string(),
      phone: v.string(),
    }),
    shipping: v.object({
      address: v.string(),
      zip: v.string(),
      city: v.string(),
      country: v.string(),
    }),
    payment: v.object({
      method: v.union(v.literal("emoney"), v.literal("cod")),
      emoneyNumber: v.optional(v.string()),
      emoneyPin: v.optional(v.string()),
    }),
  },
  handler: async (ctx, args) => {
    const orderId = nid();
    await ctx.db.insert("orders", {
      ...args,
      orderId,
      status: args.payment.method === "cod" ? "cod" : "paid",
      createdAt: Date.now(),
    });
    return { orderId };
  },
});
