import { describe, expect, it } from "vitest";
import { formatPrice } from "@/utils";

describe("formatPrice", () => {
  it("returns Gratis for free events", () => {
    expect(formatPrice(0)).toBe("Gratis");
  });

  it("formats a paid event as Colombian currency", () => {
    expect(formatPrice(45000)).toContain("45.000");
  });
});
