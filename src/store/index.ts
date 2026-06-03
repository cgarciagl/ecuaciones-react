import { create } from "zustand";
import { EXAMPLES } from "../lib/examples";
import {
  buildMathFunction,
  linspace,
  generateZ,
  type ZMatrix,
} from "../lib/mathParser";

const DEFAULT_RANGE: [number, number] = [-3.14, 3.14];
const INITIAL_RESOLUTION = 80;

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

export type SurfaceAction = { type: "resetCamera" | "downloadPng" };

export type SurfaceActionState = {
  action: SurfaceAction | null;
  nonce: number;
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

  surfaceAction: SurfaceActionState;
  dispatchSurfaceAction: (type: SurfaceAction["type"]) => void;

  renderSurface: () => void;
  loadExample: (index: number) => void;
  resetDefaults: () => void;
};

const ERROR_STATUS: Status = {
  type: "error",
  message: "Error en la ecuacion",
  timing: "",
};

function computeInitialState(): {
  plotData: PlotData | null;
  plotTitle: string;
  status: Status;
  error: string | null;
} {
  const equation = EXAMPLES[0].eq;
  const expr = equation.trim();
  if (!expr) {
    return {
      plotData: null,
      plotTitle: expr,
      status: ERROR_STATUS,
      error: "Ingresa una ecuacion.",
    };
  }

  let fn;
  try {
    fn = buildMathFunction(expr);
  } catch (err) {
    return {
      plotData: null,
      plotTitle: expr,
      status: ERROR_STATUS,
      error: err instanceof Error ? err.message : String(err),
    };
  }

  const xArr = linspace(DEFAULT_RANGE[0], DEFAULT_RANGE[1], INITIAL_RESOLUTION);
  const yArr = linspace(DEFAULT_RANGE[0], DEFAULT_RANGE[1], INITIAL_RESOLUTION);

  try {
    const zData = generateZ(fn, xArr, yArr);
    return {
      plotData: { x: xArr, y: yArr, z: zData },
      plotTitle: expr,
      status: {
        type: "ok",
        message: `Superficie generada (${INITIAL_RESOLUTION}x${INITIAL_RESOLUTION} puntos)`,
        timing: "",
      },
      error: null,
    };
  } catch (err) {
    return {
      plotData: null,
      plotTitle: expr,
      status: ERROR_STATUS,
      error:
        "Error evaluando: " +
        (err instanceof Error ? err.message : String(err)),
    };
  }
}

const INITIAL = computeInitialState();

export const useStore = create<AppState>()((set, get) => {
  const setEquationError = (message: string) => {
    set({ error: message, status: ERROR_STATUS });
  };

  return {
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

    resolution: INITIAL_RESOLUTION,
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

    plotData: INITIAL.plotData,
    plotTitle: INITIAL.plotTitle,
    status: INITIAL.status,
    error: INITIAL.error,
    clearError: () => set({ error: null }),

    examplesOpen: false,
    toggleExamples: () => set((s) => ({ examplesOpen: !s.examplesOpen })),
    closeExamples: () => set({ examplesOpen: false }),

    surfaceAction: { action: null, nonce: 0 },
    dispatchSurfaceAction: (type) => {
      set((s) => ({
        surfaceAction: { action: { type }, nonce: s.surfaceAction.nonce + 1 },
      }));
    },

    renderSurface: () => {
      const { equation, xMin, xMax, yMin, yMax, resolution } = get();
      const t0 = performance.now();

      set({ error: null });

      const expr = equation.trim();
      if (!expr) {
        setEquationError("Ingresa una ecuacion.");
        return;
      }

      let fn;
      try {
        fn = buildMathFunction(expr);
      } catch (err) {
        setEquationError(
          err instanceof Error ? err.message : String(err)
        );
        return;
      }

      if (isNaN(xMin) || isNaN(xMax) || isNaN(yMin) || isNaN(yMax)) {
        setEquationError("Los rangos deben ser numeros validos.");
        return;
      }
      if (xMin >= xMax || yMin >= yMax) {
        setEquationError("El minimo debe ser menor que el maximo.");
        return;
      }

      const xArr = linspace(xMin, xMax, resolution);
      const yArr = linspace(yMin, yMax, resolution);

      let zData: ZMatrix;
      try {
        zData = generateZ(fn, xArr, yArr);
      } catch (err) {
        setEquationError(
          "Error evaluando: " +
            (err instanceof Error ? err.message : String(err))
        );
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
        resolution: INITIAL_RESOLUTION,
        colorScale: "Viridis",
        surfaceMode: "surface",
      });
      setTimeout(() => get().renderSurface(), 0);
    },
  };
});
