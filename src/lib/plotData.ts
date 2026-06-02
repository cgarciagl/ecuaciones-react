import type { Data } from "plotly.js";
import type { PlotData, ColorScale, SurfaceMode } from "../store";

const HOVER_TEMPLATE =
  "x: %{x:.2f}<br>y: %{y:.2f}<br>z: %{z:.4f}<extra></extra>";

export function buildPointsTrace(
  plotData: PlotData,
  colorScale: ColorScale
): Data[] {
  const { x, y, z } = plotData;
  const xs: number[] = [];
  const ys: number[] = [];
  const zs: (number | null)[] = [];
  for (let i = 0; i < y.length; i++) {
    for (let j = 0; j < x.length; j++) {
      xs.push(x[j]);
      ys.push(y[i]);
      zs.push(z[i][j]);
    }
  }
  return [
    {
      type: "scatter3d",
      mode: "markers",
      x: xs,
      y: ys,
      z: zs,
      marker: {
        size: 2,
        color: zs as number[],
        colorscale: colorScale,
        showscale: false,
      },
      hovertemplate: HOVER_TEMPLATE,
    },
  ];
}

export function buildWireframeTraces(
  plotData: PlotData,
  colorScale: ColorScale
): Data[] {
  const { x, y, z } = plotData;
  const traces: Data[] = [];

  for (let i = 0; i < y.length; i++) {
    traces.push({
      type: "scatter3d",
      mode: "lines",
      x: x,
      y: Array<number>(x.length).fill(y[i]),
      z: z[i] as number[],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      line: { width: 1.5, color: z[i] as number[], colorscale: colorScale } as any,
      hoverinfo: "skip",
      showlegend: false,
    });
  }
  for (let j = 0; j < x.length; j++) {
    const column = z.map((row) => row[j]) as number[];
    traces.push({
      type: "scatter3d",
      mode: "lines",
      x: Array<number>(y.length).fill(x[j]),
      y: y,
      z: column,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      line: { width: 1.5, color: column, colorscale: colorScale } as any,
      hoverinfo: "skip",
      showlegend: false,
    });
  }
  return traces;
}

export function buildSurfaceTrace(
  plotData: PlotData,
  colorScale: ColorScale
): Data {
  const { x, y, z } = plotData;
  return {
    type: "surface",
    x,
    y,
    z: z as number[][],
    colorscale: colorScale,
    contours: {
      z: {
        show: true,
        usecolormap: true,
        highlightcolor: "#fff",
        project: { z: false },
      },
    },
    lighting: { ambient: 0.6, diffuse: 0.7, specular: 0.3, roughness: 0.4 },
    hovertemplate: HOVER_TEMPLATE,
    showscale: false,
  } as Data;
}

export function buildPlotData(
  plotData: PlotData,
  colorScale: ColorScale,
  surfaceMode: SurfaceMode
): Data[] {
  if (surfaceMode === "points") return buildPointsTrace(plotData, colorScale);
  if (surfaceMode === "wireframe") {
    return buildWireframeTraces(plotData, colorScale);
  }
  return [buildSurfaceTrace(plotData, colorScale)];
}
