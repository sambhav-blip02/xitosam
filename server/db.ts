import { and, desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, addresses, orderItems, orders, products, sellers, users } from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) return;
  const values: InsertUser = { openId: user.openId };
  const updateSet: Record<string, unknown> = {};
  const textFields = ["name", "email", "loginMethod", "phone"] as const;
  textFields.forEach(field => {
    if (user[field] !== undefined) {
      const value = user[field] ?? null;
      values[field] = value;
      updateSet[field] = value;
    }
  });
  if (user.lastSignedIn !== undefined) {
    values.lastSignedIn = user.lastSignedIn;
    updateSet.lastSignedIn = user.lastSignedIn;
  } else {
    values.lastSignedIn = new Date();
    updateSet.lastSignedIn = new Date();
  }
  if (user.role !== undefined) {
    values.role = user.role;
    updateSet.role = user.role;
  } else if (user.openId === ENV.ownerOpenId) {
    values.role = "admin";
    updateSet.role = "admin";
  }
  await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result[0];
}

export async function listProducts(category?: string) {
  const db = await getDb();
  if (!db) return [];
  const query = category && category !== "All"
    ? db.select({ product: products, seller: sellers }).from(products).leftJoin(sellers, eq(products.sellerId, sellers.id)).where(eq(products.category, category)).orderBy(desc(products.createdAt))
    : db.select({ product: products, seller: sellers }).from(products).leftJoin(sellers, eq(products.sellerId, sellers.id)).orderBy(desc(products.createdAt));
  return query;
}

export async function listUserOrders(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(orders).where(eq(orders.userId, userId)).orderBy(desc(orders.createdAt));
}

export async function createUserOrder(input: { userId: number; orderNumber: string; totalNpr: number; deliveryCity: string; deliveryAddress: string; items: Array<{ productId: number; quantity: number; priceNpr: number }> }) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  return db.transaction(async tx => {
    const result = await tx.insert(orders).values({
      userId: input.userId,
      orderNumber: input.orderNumber,
      totalNpr: input.totalNpr,
      deliveryCity: input.deliveryCity,
      deliveryAddress: input.deliveryAddress,
      status: "confirmed",
    });
    const orderId = Number(result[0].insertId);
    if (input.items.length) {
      await tx.insert(orderItems).values(input.items.map(item => ({ ...item, orderId })));
    }
    return { orderId, orderNumber: input.orderNumber };
  });
}

export async function listUserAddresses(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(addresses).where(and(eq(addresses.userId, userId))).orderBy(desc(addresses.isDefault), desc(addresses.createdAt));
}
