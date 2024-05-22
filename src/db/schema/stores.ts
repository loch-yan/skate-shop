import { pgTable } from "@/db/utils"
import { relations } from "drizzle-orm"
import { boolean, text, varchar } from "drizzle-orm/pg-core"

import { generateId } from "@/lib/id"

import { payments } from "./payments"
import { products } from "./products"
import { lifecycleDates } from "./utils"

export const stores = pgTable("stores", {
  id: varchar("id", { length: 30 })
    .$defaultFn(() => generateId())
    .primaryKey(), // prefix_ (if ocd kicks in) + nanoid (16)
  userId: varchar("user_id", { length: 36 }), // uuid v4
  name: varchar("name").notNull(),
  description: text("description"),
  slug: text("slug").unique(),
  active: boolean("active").notNull().default(false),
  stripeAccountId: varchar("stripe_account_id"),
  ...lifecycleDates,
})

export const storesRelations = relations(stores, ({ many }) => ({
  products: many(products),
  payments: many(payments),
}))

export type Store = typeof stores.$inferSelect
export type NewStore = typeof stores.$inferInsert
