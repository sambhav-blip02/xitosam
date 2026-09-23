import { z } from "zod";
import { eq } from "drizzle-orm";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { createUserOrder, getDb, listProducts, listUserAddresses, listUserOrders } from "./db";
import { users } from "../drizzle/schema";

const nepaliPhone = z.string().regex(/^(?:\+977\s?)?9[678]\d{8}$/, "Enter a valid Nepali mobile number");

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
    requestOtp: publicProcedure.input(z.object({ phone: nepaliPhone })).mutation(({ input }) => ({
      success: true,
      phone: input.phone,
      message: "Demo OTP sent. Use any 6-digit code to preview the flow.",
    })),
  }),
  marketplace: router({
    products: publicProcedure.input(z.object({ category: z.string().optional() }).optional()).query(({ input }) => listProducts(input?.category)),
    categories: publicProcedure.query(() => ["All", "Mobiles", "Electronics", "Fashion", "Beauty", "Home & Living", "Grocery", "Kids", "Sports"]),
    locations: publicProcedure.query(() => [
      { province: "Bagmati", cities: ["Kathmandu", "Lalitpur", "Bhaktapur", "Hetauda"] },
      { province: "Gandaki", cities: ["Pokhara", "Baglung", "Gorkha"] },
      { province: "Lumbini", cities: ["Butwal", "Bhairahawa", "Nepalgunj"] },
      { province: "Koshi", cities: ["Biratnagar", "Dharan", "Itahari"] },
      { province: "Madhesh", cities: ["Birgunj", "Janakpur", "Bardibas"] },
      { province: "Sudurpashchim", cities: ["Dhangadhi", "Mahendranagar"] },
      { province: "Karnali", cities: ["Surkhet", "Jumla"] },
    ]),
  }),
  customer: router({
    addresses: protectedProcedure.query(({ ctx }) => listUserAddresses(ctx.user.id)),
    orders: protectedProcedure.query(({ ctx }) => listUserOrders(ctx.user.id)),
    createOrder: protectedProcedure.input(z.object({
      totalNpr: z.number().int().positive(),
      deliveryCity: z.string().min(2),
      deliveryAddress: z.string().min(4),
      items: z.array(z.object({ productId: z.number().int(), quantity: z.number().int().positive(), priceNpr: z.number().int().positive() })).min(1),
    })).mutation(({ ctx, input }) => createUserOrder({
      ...input,
      userId: ctx.user.id,
      orderNumber: `XIT-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`,
    })),
    savePhone: protectedProcedure.input(z.object({ phone: nepaliPhone })).mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) return { success: true };
      await db.update(users).set({ phone: input.phone }).where(eq(users.id, ctx.user.id));
      return { success: true };
    }),
  }),
});

export type AppRouter = typeof appRouter;
