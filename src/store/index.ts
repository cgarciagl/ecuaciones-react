import { create } from "zustand";
import { EXAMPLES } from "../lib/examples";
import {
  buildMathFunction,
  linspace,
  generateZ,
  type ZMatrix,
} from "../lib/mathParser";

const DEFAULT_RANGE: [number, number] = [-3.14, 3.14];

export type ColorScale =
  | "Viridis"
  | "Plasma"
  | "Hot"
  | "Electric"
  | "Earth"
  | "Greys";

export type SurfaceMode = "surface" | "wireframe" | "points";

export type Status =
  | { type: "ok"; message: string; timing: string }
  | { type: "error"; message: string; timing: string };

export type PlotData = {
  x: number[];
  y: number[];
  z: ZMatrix;
};

export type AppState = {
  equation: string;
  setEquation: (equation: string) => void;

  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  setDomain: (xMin: number, xMax: number, yMin: number, yMax: number) => void;
  setDomainPreset: (preset: string) => void;

  resolution: number;
  setResolution: (resolution: number) => void;

  colorScale: ColorScale;
  setColorScale: (colorScale: ColorScale) => void;

  surfaceMode: SurfaceMode;
  setSurfaceMode: (surfaceMode: SurfaceMode) => void;

  plotData: PlotData | null;
  plotTitle: string;

  status: Status;
  error: string | null;
  clearError: () => void;

  examplesOpen: boolean;
  toggleExamples: () => void;
  closeExamples: () => void;

  renderSurface: () => void;
  loadExample: (index: number) => void;
  resetDefaults: () => void;
};

export const useStore = create<AppState>()((set, get) => ({
  equation: EXAMPLES[0].eq,
  setEquation: (equation) => set({ equation }),

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

  resolution: 80,
  setResolution: (resolution) => {
    set({ resolution });
    get().renderSurface();
  },

  colorScale: "Viridis",
  setColorScale: (colorScale) => {
    set({ colorScale });
    get().renderSurface();
  },

  surfaceMode: "surface",
  setSurfaceMode: (surfaceMode) => {
    set({ surfaceMode });
    get().renderSurface();
  },

  plotData: null,
  plotTitle: EXAMPLES[0].eq,

  status: { type: "ok", message: "Listo para generar", timing: "" },
  error: null,
  clearError: () => set({ error: null }),

  examplesOpen: false,
  toggleExamples: () => set((s) => ({ examplesOpen: !s.examplesOpen })),
  closeExamples: () => set({ examplesOpen: false }),

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

    let fn;
    try {
      fn = buildMathFunction(expr);
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : String(err),
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

    let zData: ZMatrix;
    try {
      zData = generateZ(fn, xArr, yArr);
    } catch (err) {
      set({
        error:
          "Error evaluando: " +
          (err instanceof Error ? err.message : String(err)),
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
      surfaceMode: "surface",
    });
    setTimeout(() => get().renderSurface(), 0);
  },
}));
