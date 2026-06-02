export type MathFunction = (x: number, y: number) => number;

const MATH_FUNCTIONS: Record<string, string> = {
  pi: "Math.PI",
  sin: "Math.sin",
  cos: "Math.cos",
  tan: "Math.tan",
  asin: "Math.asin",
  acos: "Math.acos",
  atan2: "Math.atan2",
  atan: "Math.atan",
  sinh: "Math.sinh",
  cosh: "Math.cosh",
  tanh: "Math.tanh",
  sqrt: "Math.sqrt",
  cbrt: "Math.cbrt",
  abs: "Math.abs",
  log10: "Math.log10",
  log2: "Math.log2",
  log: "Math.log",
  exp: "Math.exp",
  pow: "Math.pow",
  floor: "Math.floor",
  ceil: "Math.ceil",
  round: "Math.round",
  max: "Math.max",
  min: "Math.min",
  random: "Math.random",
  e: "Math.E",
};

const ALLOWED_VARS: Record<string, boolean> = { x: true, y: true };
const TOKEN_RE = /[a-zA-Z_]\w*|\d+\.?\d*|[+\-*/^(),]/g;

function tokenize(expr: string): string[] {
  return expr.match(TOKEN_RE) || [];
}

function fixUnaryOperators(tokens: string[]): string[] {
  const result: string[] = [];
  for (let i = 0; i < tokens.length; i++) {
    const tok = tokens[i];
    if (tok === "-" || tok === "+") {
      const prev = i > 0 ? tokens[i - 1] : null;
      const isUnary = prev === null || prev === "(" || /[+\-*/^]/.test(prev);
      if (isUnary) {
        result.push(tok === "-" ? "-1" : "1");
        result.push("*");
        continue;
      }
    }
    result.push(tok);
  }
  return result;
}

function fixExponentiation(tokens: string[]): string[] {
  const result: string[] = [];
  for (let i = 0; i < tokens.length; i++) {
    const tok = tokens[i];
    if (tok === "^") {
      if (result.length === 0) {
        result.push("^");
        continue;
      }
      const last = result.pop();
      if (last === undefined) continue;
      if (last === ")") {
        const group: string[] = [last];
        let balance = 1;
        while (balance > 0 && result.length > 0) {
          const t = result.pop();
          if (t === undefined) break;
          if (t === ")") balance++;
          else if (t === "(") balance--;
          group.unshift(t);
        }
        result.push("(");
        for (const g of group) result.push(g);
        result.push(")");
      } else {
        result.push("(");
        result.push(last);
        result.push(")");
      }
      result.push("^");
    } else {
      result.push(tok);
    }
  }
  return result;
}

function insertImplicitMul(tokens: string[]): string[] {
  const result: string[] = [];
  for (let i = 0; i < tokens.length; i++) {
    const curr = tokens[i];
    if (i > 0) {
      const prev = tokens[i - 1];
      const prevIsNumOrGroup = /^\d/.test(prev) || prev === ")";
      const currIsIdentOrGroup = /^[a-zA-Z_]/.test(curr) || curr === "(";
      if (prevIsNumOrGroup && currIsIdentOrGroup) {
        result.push("*");
      } else if (/^[a-zA-Z_]/.test(prev) && /^\d/.test(curr)) {
        result.push("*");
      }
    }
    result.push(curr);
  }
  return result;
}

function mapTokens(tokens: string[]): string[] {
  return tokens.map((tok) => {
    if (MATH_FUNCTIONS[tok]) return MATH_FUNCTIONS[tok];
    if (tok === "^") return "**";
    return tok;
  });
}

function validateVars(mapped: string[]): void {
  for (const tok of mapped) {
    if (
      /^[a-zA-Z_]\w*$/.test(tok) &&
      !ALLOWED_VARS[tok] &&
      !tok.startsWith("Math.")
    ) {
      throw new Error(
        `Variable no permitida: "${tok}". Solo x, y y funciones matematicas.`
      );
    }
  }
}

export function buildMathFunction(expr: string): MathFunction {
  const tokens = tokenize(expr);
  const withoutUnary = fixUnaryOperators(tokens);
  const fixedExp = fixExponentiation(withoutUnary);
  const withMul = insertImplicitMul(fixedExp);
  const mapped = mapTokens(withMul);
  validateVars(mapped);
  const code = mapped.join(" ");

  try {
    return new Function("x", "y", `return (${code})`) as MathFunction;
  } catch {
    throw new Error(
      "Error de sintaxis en la expresion. Revisa los parentesis y operadores."
    );
  }
}

export function linspace(start: number, end: number, n: number): number[] {
  const step = (end - start) / (n - 1);
  const arr: number[] = [];
  for (let i = 0; i < n; i++) arr.push(start + step * i);
  return arr;
}

export type ZMatrix = (number | null)[][];

export function generateZ(
  fn: MathFunction,
  xArr: number[],
  yArr: number[]
): ZMatrix {
  const z: ZMatrix = [];
  for (let j = 0; j < yArr.length; j++) {
    const row: (number | null)[] = [];
    for (let i = 0; i < xArr.length; i++) {
      const val = fn(xArr[i], yArr[j]);
      row.push(isFinite(val) ? val : null);
    }
    z.push(row);
  }
  return z;
}
