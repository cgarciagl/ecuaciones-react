import { create } from "zustand";
import { EXAMPLES } from "../lib/examples";
import { buildMathFunction, linspace, generateZ } from "../lib/mathParser";

export type ColorScale =
  | "Viridis"
  | "Plasma"
  | "Hot"
  | "Electric"
  | "Earth"
  | "Greys";

interface PlotData {
  x: number[];
  y: number[];
  z: (number | null)[][];
}

interface Status {
  type: "ok" | "error";
  message: string;
  timing: string;
}

interface AppState {
  // Equation
  equation: string;
  setEquation: (eq: string) => void;

  // Domain
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  setDomain: (xMin: number, xMax: number, yMin: number, yMax: number) => void;
  setDomainPreset: (preset: string) => void;

  // Resolution
  resolution: number;
  setResolution: (r: number) => void;

  // Color
  colorScale: ColorScale;
  setColorScale: (c: ColorScale) => void;

  // Plot data
  plotData: PlotData | null;
  plotTitle: string;

  // Status
  status: Status;
  error: string | null;
  clearError: () => void;

  // Mobile examples sheet
  examplesOpen: boolean;
  toggleExamples: () => void;
  closeExamples: () => void;

  // Actions
  renderSurface: () => void;
  loadExample: (index: number) => void;
  resetDefaults: () => void;
  insertAtCursor: (text: string) => void;
}

const DEFAULT_RANGE = [-3.14, 3.14] as const;

export const useStore = create<AppState>((set, get) => ({
  // Equation
  equation: EXAMPLES[0].eq,
  setEquation: (equation) => set({ equation }),

  // Domain
  xMin: DEFAULT_RANGE[0],
  xMax: DEFAULT_RANGE[1],
  yMin: DEFAULT_RANGE[0],
  yMax: DEFAULT_RANGE[1],
  setDomain: (xMin, xMax, yMin, yMax) => set({ xMin, xMax, yMin, yMax }),
  setDomainPreset: (preset) => {
    const parts = preset.split(",").map(Number);
    if (parts.length === 4) {
      set({
        xMin: parts[0],
        xMax: parts[1],
        yMin: parts[2],
        yMax: parts[3],
      });
      get().renderSurface();
    }
  },

  // Resolution
  resolution: 80,
  setResolution: (resolution) => set({ resolution }),

  // Color
  colorScale: "Viridis",
  setColorScale: (colorScale) => {
    set({ colorScale });
    get().renderSurface();
  },

  // Plot data
  plotData: null,
  plotTitle: EXAMPLES[0].eq,

  // Status
  status: { type: "ok", message: "Listo para generar", timing: "" },
  error: null,
  clearError: () => set({ error: null }),

  // Examples
  examplesOpen: false,
  toggleExamples: () => set((s) => ({ examplesOpen: !s.examplesOpen })),
  closeExamples: () => set({ examplesOpen: false }),

  // Actions
  renderSurface: () => {
    const { equation, xMin, xMax, yMin, yMax, resolution } = get();
    const t0 = performance.now();

    set({ error: null });

    const expr = equation.trim();
    if (!expr) {
      set({
        error: "Ingresa una ecuacion.",
        status: { type: "error", message: "Error en la ecuacion", timing: "" },
      });
      return;
    }

    let fn: (x: number, y: number) => number;
    try {
      fn = buildMathFunction(expr);
    } catch (err) {
      set({
        error: (err as Error).message,
        status: { type: "error", message: "Error en la ecuacion", timing: "" },
      });
      return;
    }

    if (isNaN(xMin) || isNaN(xMax) || isNaN(yMin) || isNaN(yMax)) {
      set({
        error: "Los rangos deben ser numeros validos.",
        status: { type: "error", message: "Error en la ecuacion", timing: "" },
      });
      return;
    }
    if (xMin >= xMax || yMin >= yMax) {
      set({
        error: "El minimo debe ser menor que el maximo.",
        status: { type: "error", message: "Error en la ecuacion", timing: "" },
      });
      return;
    }

    const xArr = linspace(xMin, xMax, resolution);
    const yArr = linspace(yMin, yMax, resolution);

    let zData: (number | null)[][];
    try {
      zData = generateZ(fn, xArr, yArr);
    } catch (err) {
      set({
        error: "Error evaluando: " + (err as Error).message,
        status: { type: "error", message: "Error en la ecuacion", timing: "" },
      });
      return;
    }

    const elapsed = (performance.now() - t0).toFixed(0);

    set({
      plotData: { x: xArr, y: yArr, z: zData },
      plotTitle: expr,
      status: {
        type: "ok",
        message: `Superficie generada (${resolution}x${resolution} puntos)`,
        timing: `${elapsed} ms`,
      },
    });
  },

  loadExample: (index) => {
    const ex = EXAMPLES[index];
    set({
      equation: ex.eq,
      xMin: DEFAULT_RANGE[0],
      xMax: DEFAULT_RANGE[1],
      yMin: DEFAULT_RANGE[0],
      yMax: DEFAULT_RANGE[1],
      examplesOpen: false,
    });
    setTimeout(() => get().renderSurface(), 0);
  },

  resetDefaults: () => {
    set({
      equation: EXAMPLES[0].eq,
      xMin: DEFAULT_RANGE[0],
      xMax: DEFAULT_RANGE[1],
      yMin: DEFAULT_RANGE[0],
      yMax: DEFAULT_RANGE[1],
      resolution: 80,
      colorScale: "Viridis",
    });
    setTimeout(() => get().renderSurface(), 0);
  },

  insertAtCursor: (text: string) => {
    // This is handled by the component directly since we need DOM access
    // The component will call setEquation with the new value
  },
}));
