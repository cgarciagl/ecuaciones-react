export type Example = {
  name: string;
  emoji: string;
  eq: string;
  xRange: [number, number];
  yRange: [number, number];
};

export const EXAMPLES: Example[] = [
  {
    name: "Ondas concentricas",
    emoji: "\u{1F30A}",
    eq: "sin(sqrt(x^2 + y^2))",
    xRange: [-3.14, 3.14],
    yRange: [-3.14, 3.14],
  },
  {
    name: "Silla de montar",
    emoji: "\u{1F3AF}",
    eq: "x^2 - y^2 * 2",
    xRange: [-5, 5],
    yRange: [-5, 5],
  },
  {
    name: "Gaussiana 2D",
    emoji: "\u26F0\uFE0F",
    eq: "exp(-(x^2 + y^2) / 8)",
    xRange: [-8, 8],
    yRange: [-8, 8],
  },
  {
    name: "Sombrero mexicano",
    emoji: "\u{1F3B5}",
    eq: "(1 - (x^2 + y^2)/2) * exp(-(x^2 + y^2)/4)",
    xRange: [-6, 6],
    yRange: [-6, 6],
  },
  {
    name: "Rosenbrock",
    emoji: "\u{1F9EA}",
    eq: "(1 - x)^2 + 100*(y - x^2)^2",
    xRange: [-2, 2],
    yRange: [-1, 3],
  },
  {
    name: "Onda sinusoidal",
    emoji: "\u{1F30D}",
    eq: "sin(x) * cos(y)",
    xRange: [-10, 10],
    yRange: [-10, 10],
  },
  {
    name: "Funcion Peaks",
    emoji: "\u{1F4CA}",
    eq: "3*(1-x)^2*exp(-x^2 - (y+1)^2) - 10*(x/5 - x^3 - y^5)*exp(-x^2-y^2) - 1/3*exp(-(x+1)^2 - y^2)",
    xRange: [-4, 4],
    yRange: [-4, 4],
  },
  {
    name: "Espirales",
    emoji: "\u{1F300}",
    eq: "sin(x^2 + y^2) * cos(x*y)",
    xRange: [-4, 4],
    yRange: [-4, 4],
  },
  {
    name: "Toroide",
    emoji: "\u2B55",
    eq: "cos(sqrt((x-3)^2 + y^2)) + cos(sqrt((x+3)^2 + y^2))",
    xRange: [-10, 10],
    yRange: [-10, 10],
  },
  {
    name: "Fractal suave",
    emoji: "\u2728",
    eq: "sin(x) * sin(y) + sin(3*x) * cos(3*y) / 3",
    xRange: [-8, 8],
    yRange: [-8, 8],
  },
];
