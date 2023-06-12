import { products } from "@/db/schema"
import { z } from "zod"

export const productSchema = z.object({
  name: z.string().min(1, {
    message: "Must be at least 1 character",
  }),
  description: z.string().optional(),
  category: z
    .enum(products.category.enumValues, {
      required_error: "Must be a valid category",
    })
    .default(products.category.enumValues[0]),
  price: z.number().positive({
    message: "Must be a positive number",
  }),
  quantity: z.number().positive({
    message: "Must be a positive number",
  }),
  inventory: z.number(),
  images: z
    .unknown()
    .refine((val) => {
      if (!Array.isArray(val)) return false
      if (val.some((file) => !(file instanceof File))) return false
      return true
    }, "Must be an array of File")
    .optional()
    .nullable()
    .default(null),
})

export const filterProductsSchema = z.object({
  query: z.string(),
})

export const getProductSchema = z.object({
  id: z.number(),
  storeId: z.number(),
})

export const getProductsSchema = z.object({
  limit: z.number().default(10).optional().nullable(),
  cursor: z.number().optional().nullable(),
  category: z.enum(products.category.enumValues).optional().nullable(),
  sort: z
    .enum(["createdAt", "price", "rating", "name"])
    .default("createdAt")
    .optional()
    .nullable(),
  order: z.enum(["asc", "desc"]).default("desc").optional().nullable(),
  priceRange: z
    .object({
      min: z.number().optional().nullable(),
      max: z.number().optional().nullable(),
    })
    .optional()
    .nullable(),
  storeIds: z.array(z.number()).optional().nullable(),
})
