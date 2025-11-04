import { v } from "convex/values";

export const CustomerV = v.object({
  name: v.string(),
  email: v.string(),
  phone: v.string(),
});

export const ShippingV = v.object({
  address1: v.string(),
  address2: v.optional(v.string()),
  city: v.string(),
  state: v.optional(v.string()),
  postalCode: v.string(),
  country: v.string(),
});

export const OrderItemV = v.object({
  id: v.string(),
  slug: v.optional(v.string()),
  name: v.string(),
  unitPrice: v.number(),
  quantity: v.number(),
  lineTotal: v.number(),
});

export const TotalsV = v.object({
  subtotal: v.number(),
  shipping: v.number(),
  taxes: v.number(),
  grandTotal: v.number(),
});
