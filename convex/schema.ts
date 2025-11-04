import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  carts: defineTable({
    sessionID: v.string(), // anonymous cart id (localStorage)
    items: v.array(
      v.object({
        slug: v.string(),
        name: v.string(),
        price: v.number(), // cents
        image: v.string(), // small thumb
        quantity: v.number(),
        category: v.string(),
      })
    ),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_sessionID", ["sessionID"]),

  orders: defineTable({
    orderId: v.string(),
    sessionID: v.string(),
    status: v.string(), // "paid" | "cod" | "pending"
    createdAt: v.number(),

    // snapshot
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

    // customer
    customer: v.object({
      name: v.string(),
      email: v.string(),
      phone: v.string(),
    }),

    // shipping
    shipping: v.object({
      address: v.string(),
      zip: v.string(),
      city: v.string(),
      country: v.string(),
    }),

    // payment
    payment: v.object({
      method: v.union(v.literal("emoney"), v.literal("cod")),
      emoneyNumber: v.optional(v.string()),
      emoneyPin: v.optional(v.string()),
    }),
  })
    .index("by_sessionID", ["sessionID"])
    .index("by_orderId", ["orderId"]),
});
