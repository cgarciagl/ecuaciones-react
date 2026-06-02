import type { EChartsOption } from "echarts";
import type { PlotData, ColorScale, SurfaceMode } from "../store";

const VIRIDIS: string[] = [
  "#440154",
  "#482878",
  "#3E4989",
  "#31688E",
  "#26828E",
  "#1F9E89",
  "#35B779",
  "#6DCD59",
  "#B4DE2C",
  "#FDE725",
];

const PLASMA: string[] = [
  "#0D0887",
  "#46039F",
  "#7201A8",
  "#9C179E",
  "#BD3786",
  "#D8576B",
  "#ED7953",
  "#FB9F3A",
  "#FDC926",
  "#F0F921",
];

const HOT: string[] = [
  "#000004",
  "#160B39",
  "#420A68",
  "#6A176E",
  "#932667",
  "#BC3754",
  "#DD513A",
  "#F37819",
  "#FBA40A",
  "#F6D746",
];

const ELECTRIC: string[] = [
  "#000004",
  "#0A0924",
  "#15126B",
  "#1F1FB3",
  "#274BF0",
  "#3E84F1",
  "#62B7E5",
  "#9CD8E2",
  "#C9F0EE",
  "#FFFFFF",
];

const EARTH: string[] = [
  "#3B1F0B",
  "#5C2A0E",
  "#7A3A0E",
  "#9A4F12",
  "#B86B1C",
  "#D08A2C",
  "#DDA94A",
  "#E5C276",
  "#EFD9A6",
  "#FBEDD5",
];

const GREYS: string[] = [
  "#000000",
  "#1C1C1C",
  "#393939",
  "#575757",
  "#757575",
  "#929292",
  "#B0B0B0",
  "#CECECE",
  "#EBEBEB",
  "#FFFFFF",
];

const COLOR_SCALES: Record<ColorScale, string[]> = {
  Viridis: VIRIDIS,
  Plasma: PLASMA,
  Hot: HOT,
  Electric: ELECTRIC,
  Earth: EARTH,
  Greys: GREYS,
};

type Triple = [number, number, number];

function buildTriples(plotData: PlotData): Triple[] {
  const { x, y, z } = plotData;
  const data: Triple[] = [];
  for (let j = 0; j < y.length; j++) {
    const row = z[j];
    for (let i = 0; i < x.length; i++) {
      const v = row[i];
      if (v !== null && Number.isFinite(v)) {
        data.push([x[i], y[j], v]);
      }
    }
  }
  return data;
}

function zBounds(data: Triple[]): [number, number] {
  let min = Infinity;
  let max = -Infinity;
  for (const t of data) {
    if (t[2] < min) min = t[2];
    if (t[2] > max) max = t[2];
  }
  if (!Number.isFinite(min) || !Number.isFinite(max)) return [0, 1];
  if (min === max) return [min, min + 1];
  return [min, max];
}

const AXIS_BASE = {
  nameTextStyle: { color: "rgba(246,242,232,0.7)", fontFamily: "Inter", fontSize: 12 },
  axisLine: { lineStyle: { color: "rgba(246,242,232,0.36)" } },
  axisLabel: { color: "rgba(246,242,232,0.58)", fontFamily: "JetBrains Mono", fontSize: 9 },
  splitLine: { lineStyle: { color: "rgba(246,242,232,0.18)" } },
} as const;

export const INITIAL_VIEW_CONTROL = {
  projection: "perspective",
  alpha: 25,
  beta: 30,
  distance: 200,
  center: [0, 0, 0],
  rotateSensitivity: 30,
  zoomSensitivity: 2,
  panSensitivity: 2,
} as const;

const TOOLTIP_FORMATTER = (p: { data: Triple | number[] }) => {
  const d = p.data as Triple;
  return `x: ${d[0].toFixed(2)}<br/>y: ${d[1].toFixed(2)}<br/>z: ${d[2].toFixed(4)}`;
};

export function buildEChartsOption(
  plotData: PlotData,
  colorScale: ColorScale,
  surfaceMode: SurfaceMode
): EChartsOption {
  const { x, y } = plotData;
  const data = buildTriples(plotData);
  const [zMin, zMax] = zBounds(data);
  const colors = COLOR_SCALES[colorScale];

  const baseOption = {
    backgroundColor: "transparent",
    tooltip: {
      trigger: "item",
      formatter: TOOLTIP_FORMATTER,
    },
    visualMap: {
      show: false,
      min: zMin,
      max: zMax,
      dimension: 2,
      inRange: { color: colors },
    },
    xAxis3D: { name: "X", type: "value", ...AXIS_BASE },
    yAxis3D: { name: "Y", type: "value", ...AXIS_BASE },
    zAxis3D: { name: "Z", type: "value", ...AXIS_BASE },
    grid3D: {
      boxWidth: 120,
      boxDepth: 120,
      boxHeight: 80,
      viewControl: { ...INITIAL_VIEW_CONTROL },
      axisPointer: { show: false },
      splitLine: { lineStyle: { color: "rgba(246,242,232,0.18)" } },
      environment: "auto",
    },
  };

  if (surfaceMode === "points") {
    return {
      ...baseOption,
      series: [
        {
          type: "scatter3D",
          data,
          symbolSize: 2.5,
          itemStyle: { opacity: 0.9 },
        },
      ],
    } as EChartsOption;
  }

  return {
    ...baseOption,
    series: [
      {
        type: "surface",
        data,
        dataShape: [y.length, x.length],
        shading: "lambert",
        wireframe: {
          show: surfaceMode === "wireframe",
          lineStyle: { color: "rgba(255,255,255,0.45)", width: 0.5 },
        },
        lambertMaterial: {
          detail: 0.6,
          roughness: 0.4,
        },
      },
    ],
  } as EChartsOption;
}
