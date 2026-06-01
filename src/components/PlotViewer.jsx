import { useMemo } from "react";
import createPlotlyComponent from "react-plotly.js/factory";
import Plotly from "plotly.js-dist-min";
import { useStore } from "../store";

const Plot = createPlotlyComponent(Plotly);

function axisCfg(label, color) {
  return {
    title: {
      text: label,
      font: { color, family: "Inter", size: 12 },
    },
    gridcolor: "rgba(246,242,232,0.18)",
    zerolinecolor: "rgba(246,242,232,0.36)",
    tickfont: {
      color: "rgba(246,242,232,0.58)",
      family: "JetBrains Mono",
      size: 9,
    },
    backgroundcolor: "rgba(0,0,0,0)",
  };
}

const LAYOUT = {
  scene: {
    xaxis: axisCfg("X", "#8ed1c6"),
    yaxis: axisCfg("Y", "#f1a37d"),
    zaxis: axisCfg("Z", "#f0c766"),
    bgcolor: "rgba(20,24,15,1)",
    camera: { eye: { x: 1.5, y: 1.5, z: 1.2 } },
  },
  paper_bgcolor: "rgba(0,0,0,0)",
  margin: { l: 0, r: 0, t: 10, b: 10 },
  font: { family: "Inter" },
};

const CONFIG = {
  responsive: true,
  displayModeBar: true,
  displaylogo: false,
};

export function PlotViewer() {
  const plotData = useStore((s) => s.plotData);
  const colorScale = useStore((s) => s.colorScale);
  const surfaceMode = useStore((s) => s.surfaceMode);

  const data = useMemo(() => {
    if (!plotData) return [];
    const { x, y, z } = plotData;
    const hoverTpl = "x: %{x:.2f}<br>y: %{y:.2f}<br>z: %{z:.4f}<extra></extra>";

    if (surfaceMode === "points") {
      const xp = [], yp = [], zp = [];
      for (let i = 0; i < y.length; i++) {
        for (let j = 0; j < x.length; j++) {
          xp.push(x[j]);
          yp.push(y[i]);
          zp.push(z[i][j]);
        }
      }
      return [{
        type: "scatter3d",
        mode: "markers",
        x: xp, y: yp, z: zp,
        marker: { size: 2, color: zp, colorscale: colorScale, showscale: false },
        hovertemplate: hoverTpl,
      }];
    }

    if (surfaceMode === "wireframe") {
      const traces = [];
      for (let i = 0; i < y.length; i++) {
        traces.push({
          type: "scatter3d",
          mode: "lines",
          x: x,
          y: Array(x.length).fill(y[i]),
          z: z[i],
          line: { width: 1.5, color: z[i], colorscale: colorScale },
          hoverinfo: "skip",
          showlegend: false,
        });
      }
      for (let j = 0; j < x.length; j++) {
        const col = z.map((row) => row[j]);
        traces.push({
          type: "scatter3d",
          mode: "lines",
          x: Array(y.length).fill(x[j]),
          y: y,
          z: col,
          line: { width: 1.5, color: col, colorscale: colorScale },
          hoverinfo: "skip",
          showlegend: false,
        });
      }
      return traces;
    }

    // surface (default)
    return [
      {
        type: "surface",
        x, y, z,
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
        hovertemplate: hoverTpl,
        showscale: false,
      },
    ];
  }, [plotData, colorScale, surfaceMode]);

  return (
    <div className="relative flex-1 min-h-[320px] overflow-hidden border border-[#2d362a] rounded-[18px] shadow-[0_28px_80px_rgba(15,20,12,0.42)]">
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(circle at 22% 18%, rgba(216, 164, 65, 0.21), transparent 30%),
            radial-gradient(circle at 78% 22%, rgba(90, 176, 145, 0.16), transparent 34%),
            #13180f
          `,
        }}
      />
      <div className="absolute inset-2.5 z-20 border border-white/12 rounded-[10px] pointer-events-none" />

      {plotData ? (
        <Plot
          data={data}
          layout={LAYOUT}
          config={CONFIG}
          useResizeHandler
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1 }}
        />
      ) : (
        <div className="absolute inset-0 z-10 flex items-center justify-center text-white/45 text-[0.96rem] font-medium">
          Presiona "Generar" para visualizar
        </div>
      )}
    </div>
  );
}
