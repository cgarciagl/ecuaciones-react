import { describe, it, expect } from "vitest";
import { EXAMPLES } from "../examples";

describe("EXAMPLES", () => {
  it("is a non-empty array", () => {
    expect(Array.isArray(EXAMPLES)).toBe(true);
    expect(EXAMPLES.length).toBeGreaterThan(0);
  });

  it("contains at least 10 examples", () => {
    expect(EXAMPLES.length).toBeGreaterThanOrEqual(10);
  });

  it("every example has the required shape", () => {
    for (const ex of EXAMPLES) {
      expect(typeof ex.name).toBe("string");
      expect(ex.name.length).toBeGreaterThan(0);
      expect(typeof ex.emoji).toBe("string");
      expect(ex.emoji.length).toBeGreaterThan(0);
      expect(typeof ex.eq).toBe("string");
      expect(ex.eq.length).toBeGreaterThan(0);
    }
  });

  it("uses unique names", () => {
    const names = EXAMPLES.map((e) => e.name);
    expect(new Set(names).size).toBe(names.length);
  });
});
