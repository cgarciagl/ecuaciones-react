import { useMemo } from "react";
import Plot from "react-plotly.js";
import { useStore } from "../store";

function axisCfg(label: string, color: string) {
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

  const data = useMemo(() => {
    if (!plotData) return [];
    return [
      {
        type: "surface" as const,
        x: plotData.x,
        y: plotData.y,
        z: plotData.z,
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
        hovertemplate:
          "x: %{x:.2f}<br>y: %{y:.2f}<br>z: %{z:.4f}<extra></extra>",
        showscale: false,
      },
    ];
  }, [plotData, colorScale]);

  return (
    <div className="relative flex-1 min-h-[320px] overflow-hidden border border-line rounded-lg shadow-[0_24px_70px_rgba(30,45,35,0.15)]">
      {/* Background gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(circle at 22% 18%, rgba(216, 164, 65, 0.18), transparent 30%),
            #14180f
          `,
        }}
      />
      {/* Inner border accent */}
      <div className="absolute inset-2.5 z-20 border border-white/12 rounded-[7px] pointer-events-none" />

      {plotData ? (
        <Plot
          data={data}
          layout={LAYOUT as any}
          config={CONFIG}
          useResizeHandler
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1 }}
        />
      ) : (
        <div className="absolute inset-0 z-10 flex items-center justify-center text-white/40 text-sm font-medium">
          Presiona "Generar" para visualizar
        </div>
      )}
    </div>
  );
}
