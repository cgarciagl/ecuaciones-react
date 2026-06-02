import { useMemo } from "react";
import type { Data, Layout, Config } from "plotly.js";
import createPlotlyComponent from "react-plotly.js/factory";
import Plotly from "plotly.js-dist-min";
import { useStore } from "../store";
import { buildPlotData } from "../lib/plotData";

const Plot = createPlotlyComponent(Plotly);

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

const LAYOUT: Partial<Layout> = {
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

const CONFIG: Partial<Config> = {
  responsive: true,
  displayModeBar: true,
  displaylogo: false,
};

export function PlotViewer() {
  const plotData = useStore((s) => s.plotData);
  const colorScale = useStore((s) => s.colorScale);
  const surfaceMode = useStore((s) => s.surfaceMode);

  const data = useMemo<Data[]>(
    () => (plotData ? buildPlotData(plotData, colorScale, surfaceMode) : []),
    [plotData, colorScale, surfaceMode]
  );

  const revision = useMemo(() => Math.random(), [data]);

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
          revision={revision}
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
