import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("marketplace", () => {
  it("returns Nepal-first category navigation", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const categories = await caller.marketplace.categories();
    expect(categories).toContain("Mobiles");
    expect(categories).toContain("Grocery");
    expect(categories).toContain("Fashion");
  });

  it("accepts valid Nepali mobile numbers for the OTP flow", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.auth.requestOtp({ phone: "9841234567" });
    expect(result).toMatchObject({ success: true, phone: "9841234567" });
  });

  it("rejects non-Nepali mobile numbers", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(caller.auth.requestOtp({ phone: "1234567890" })).rejects.toThrow();
  });
});
