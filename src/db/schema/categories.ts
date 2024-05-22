import { pgTable } from "@/db/utils"
import { relations } from "drizzle-orm"
import { text, varchar } from "drizzle-orm/pg-core"

import { generateId } from "@/lib/id"

import { products } from "./products"
import { subcategories } from "./subcategories"
import { lifecycleDates } from "./utils"

export const categories = pgTable("categories", {
  id: varchar("id", { length: 30 })
    .$defaultFn(() => generateId())
    .primaryKey(), // prefix_ + nanoid (12)
  name: varchar("name", { length: 256 }).notNull().unique(),
  slug: varchar("slug", { length: 256 }).unique().notNull(),
  description: text("description"),
  ...lifecycleDates,
})

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
  subcategories: many(subcategories),
}))

export type Category = typeof categories.$inferSelect
export type NewCategory = typeof categories.$inferInsert
