export type Example = {
  name: string;
  emoji: string;
  eq: string;
};

export const EXAMPLES: Example[] = [
  {
    name: "Ondas concentricas",
    emoji: "\u{1F30A}",
    eq: "sin(sqrt(x^2 + y^2))",
  },
  {
    name: "Silla de montar",
    emoji: "\u{1F3AF}",
    eq: "x^2 - y^2 * 2",
  },
  {
    name: "Gaussiana 2D",
    emoji: "\u26F0\uFE0F",
    eq: "exp(-(x^2 + y^2) / 8)",
  },
  {
    name: "Sombrero mexicano",
    emoji: "\u{1F3B5}",
    eq: "(1 - (x^2 + y^2)/2) * exp(-(x^2 + y^2)/4)",
  },
  {
    name: "Rosenbrock",
    emoji: "\u{1F9EA}",
    eq: "(1 - x)^2 + 100*(y - x^2)^2",
  },
  {
    name: "Onda sinusoidal",
    emoji: "\u{1F30D}",
    eq: "sin(x) * cos(y)",
  },
  {
    name: "Funcion Peaks",
    emoji: "\u{1F4CA}",
    eq: "3*(1-x)^2*exp(-x^2 - (y+1)^2) - 10*(x/5 - x^3 - y^5)*exp(-x^2-y^2) - 1/3*exp(-(x+1)^2 - y^2)",
  },
  {
    name: "Espirales",
    emoji: "\u{1F300}",
    eq: "sin(x^2 + y^2) * cos(x*y)",
  },
  {
    name: "Toroide",
    emoji: "\u2B55",
    eq: "cos(sqrt((x-3)^2 + y^2)) + cos(sqrt((x+3)^2 + y^2))",
  },
  {
    name: "Fractal suave",
    emoji: "\u2728",
    eq: "sin(x) * sin(y) + sin(3*x) * cos(3*y) / 3",
  },
];
