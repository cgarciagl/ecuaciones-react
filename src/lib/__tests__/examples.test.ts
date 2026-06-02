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
      expect(Array.isArray(ex.xRange)).toBe(true);
      expect(Array.isArray(ex.yRange)).toBe(true);
    }
  });

  it("xRange and yRange are [min, max] numeric tuples with min < max", () => {
    for (const ex of EXAMPLES) {
      expect(ex.xRange).toHaveLength(2);
      expect(ex.yRange).toHaveLength(2);
      for (const v of ex.xRange) expect(typeof v).toBe("number");
      for (const v of ex.yRange) expect(typeof v).toBe("number");
      expect(ex.xRange[0]).toBeLessThan(ex.xRange[1]);
      expect(ex.yRange[0]).toBeLessThan(ex.yRange[1]);
    }
  });

  it("uses unique names", () => {
    const names = EXAMPLES.map((e) => e.name);
    expect(new Set(names).size).toBe(names.length);
  });
});
