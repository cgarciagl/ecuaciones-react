import { describe, it, expect } from "vitest";
import {
  buildMathFunction,
  linspace,
  generateZ,
} from "../mathParser";

describe("linspace", () => {
  it("returns an array of length n", () => {
    expect(linspace(0, 10, 5)).toHaveLength(5);
    expect(linspace(0, 1, 100)).toHaveLength(100);
    expect(linspace(-5, 5, 1)).toHaveLength(1);
  });

  it("includes start and end as the first and last values", () => {
    const arr = linspace(0, 10, 5);
    expect(arr[0]).toBe(0);
    expect(arr[arr.length - 1]).toBe(10);
  });

  it("produces evenly spaced values", () => {
    const arr = linspace(0, 12, 4);
    expect(arr).toEqual([0, 4, 8, 12]);
  });

  it("handles negative ranges", () => {
    const arr = linspace(-3.14, 3.14, 5);
    expect(arr[0]).toBe(-3.14);
    expect(arr[arr.length - 1]).toBe(3.14);
  });
});

describe("buildMathFunction", () => {
  it("evaluates a constant expression", () => {
    const fn = buildMathFunction("5");
    expect(fn(0, 0)).toBe(5);
    expect(fn(10, 10)).toBe(5);
  });

  it("evaluates x and y variables", () => {
    const fn = buildMathFunction("x + y");
    expect(fn(1, 2)).toBe(3);
    expect(fn(-1, 1)).toBe(0);
  });

  it("respects operator precedence with parentheses", () => {
    const fn = buildMathFunction("(x + y) * 2");
    expect(fn(1, 2)).toBe(6);
  });

  it("supports the ^ operator for exponentiation", () => {
    const fn = buildMathFunction("x^2 + y^2");
    expect(fn(3, 4)).toBe(25);
  });

  it("supports the ^ operator with parentheses", () => {
    const fn = buildMathFunction("(x + 1)^2");
    expect(fn(2, 0)).toBe(9);
  });

  it("handles implicit multiplication like 2x and 2(x+1)", () => {
    const fn1 = buildMathFunction("2x");
    expect(fn1(3, 0)).toBe(6);

    const fn2 = buildMathFunction("2(x+1)");
    expect(fn2(3, 0)).toBe(8);

    const fn3 = buildMathFunction("(x+1)(x-1)");
    expect(fn3(3, 0)).toBe(8);
  });

  it("handles unary minus at the start", () => {
    const fn = buildMathFunction("-x");
    expect(fn(5, 0)).toBe(-5);
  });

  it("handles unary minus after operators", () => {
    const fn = buildMathFunction("x + -y");
    expect(fn(1, 2)).toBe(-1);
  });

  it("maps math constants and functions", () => {
    const pi = buildMathFunction("pi");
    expect(pi(0, 0)).toBeCloseTo(Math.PI);

    const sinPi = buildMathFunction("sin(pi)");
    expect(sinPi(0, 0)).toBeCloseTo(0);

    const e = buildMathFunction("e");
    expect(e(0, 0)).toBeCloseTo(Math.E);
  });

  it("maps Math functions like sqrt, exp, log, pow", () => {
    expect(buildMathFunction("sqrt(16)")(0, 0)).toBe(4);
    expect(buildMathFunction("exp(0)")(0, 0)).toBe(1);
    expect(buildMathFunction("log(e)")(0, 0)).toBeCloseTo(1);
    expect(buildMathFunction("pow(2, 8)")(0, 0)).toBe(256);
  });

  it("evaluates the canonical example sin(sqrt(x^2 + y^2))", () => {
    const fn = buildMathFunction("sin(sqrt(x^2 + y^2))");
    expect(fn(0, 0)).toBeCloseTo(0);
    expect(fn(Math.PI, 0)).toBeCloseTo(Math.sin(Math.PI));
  });

  it("throws on disallowed variables", () => {
    expect(() => buildMathFunction("foo + x")).toThrow(/Variable no permitida/);
  });

  it("throws on syntax errors", () => {
    expect(() => buildMathFunction("sin(x")).toThrow(/sintaxis/i);
  });
});

describe("generateZ", () => {
  it("returns a 2D matrix with shape yLen x xLen", () => {
    const fn = buildMathFunction("x + y");
    const xArr = linspace(0, 2, 3);
    const yArr = linspace(0, 2, 3);
    const z = generateZ(fn, xArr, yArr);
    expect(z).toHaveLength(3);
    for (const row of z) {
      expect(row).toHaveLength(3);
    }
  });

  it("evaluates the function at each grid point", () => {
    const fn = buildMathFunction("x + y");
    const xArr = [0, 1, 2];
    const yArr = [0, 1, 2];
    const z = generateZ(fn, xArr, yArr);
    expect(z[0][0]).toBe(0);
    expect(z[0][1]).toBe(1);
    expect(z[1][0]).toBe(1);
    expect(z[2][2]).toBe(4);
  });

  it("replaces non-finite values (e.g. log of negative) with null", () => {
    const fn = buildMathFunction("log(x)");
    const xArr = [-1, 0, 1];
    const yArr = [0];
    const z = generateZ(fn, xArr, yArr);
    expect(z[0][0]).toBeNull();
    expect(z[0][1]).toBeNull();
    expect(z[0][2]).toBe(0);
  });
});
