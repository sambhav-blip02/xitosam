import { int, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: varchar("role", { length: 16 }).default("user").notNull(),
  phone: varchar("phone", { length: 20 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export const sellers = mysqlTable("sellers", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  slug: varchar("slug", { length: 180 }).notNull().unique(),
  city: varchar("city", { length: 80 }).notNull(),
  rating: int("rating").default(0).notNull(),
  verified: int("verified").default(1).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const products = mysqlTable("products", {
  id: int("id").autoincrement().primaryKey(),
  sellerId: int("sellerId").notNull(),
  name: varchar("name", { length: 220 }).notNull(),
  category: varchar("category", { length: 80 }).notNull(),
  priceNpr: int("priceNpr").notNull(),
  compareAtNpr: int("compareAtNpr"),
  rating: int("rating").default(0).notNull(),
  reviewCount: int("reviewCount").default(0).notNull(),
  imageUrl: text("imageUrl").notNull(),
  deliveryLabel: varchar("deliveryLabel", { length: 120 }).default("Delivery available").notNull(),
  stock: int("stock").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const addresses = mysqlTable("addresses", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  label: varchar("label", { length: 32 }).notNull(),
  recipient: varchar("recipient", { length: 120 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  province: varchar("province", { length: 80 }).notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  addressLine: text("addressLine").notNull(),
  isDefault: int("isDefault").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const orders = mysqlTable("orders", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  orderNumber: varchar("orderNumber", { length: 32 }).notNull().unique(),
  status: varchar("status", { length: 32 }).default("confirmed").notNull(),
  totalNpr: int("totalNpr").notNull(),
  deliveryCity: varchar("deliveryCity", { length: 100 }).notNull(),
  deliveryAddress: text("deliveryAddress").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const orderItems = mysqlTable("order_items", {
  id: int("id").autoincrement().primaryKey(),
  orderId: int("orderId").notNull(),
  productId: int("productId").notNull(),
  quantity: int("quantity").notNull(),
  priceNpr: int("priceNpr").notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Product = typeof products.$inferSelect;
export type Order = typeof orders.$inferSelect;
