import { useCallback } from "react";
import { useStore } from "../store";
import Plotly from "plotly.js-dist-min";

export function WorkspaceBar() {
  const plotTitle = useStore((s) => s.plotTitle);

  const resetCamera = useCallback(() => {
    const plotDiv = document.querySelector(".js-plotly-plot");
    if (plotDiv) {
      Plotly.relayout(plotDiv, {
        "scene.camera": { eye: { x: 1.5, y: 1.5, z: 1.2 } },
      });
    }
  }, []);

  const downloadPng = useCallback(() => {
    const plotDiv = document.querySelector(".js-plotly-plot");
    if (plotDiv) {
      Plotly.downloadImage(plotDiv, {
        format: "png",
        filename: "superficie-3d",
        width: 1400,
        height: 1000,
        scale: 1,
      });
    }
  }, []);

  return (
    <div className="flex items-center justify-between gap-3.5 min-h-[78px] px-[1.125rem] py-3.5 border border-[#2a3328] rounded-[16px] bg-[linear-gradient(120deg,rgba(31,35,29,0.97),rgba(19,22,16,0.97))] text-white shadow-[0_24px_70px_rgba(16,20,14,0.34)]">
      <div className="min-w-0">
        <p className="text-white/64 text-[0.72rem] font-extrabold tracking-[0.14em] uppercase">
          Vista interactiva
        </p>
        <h2 className="mt-1 font-mono text-[clamp(0.92rem,1.7vw,1.22rem)] font-semibold overflow-hidden text-ellipsis whitespace-nowrap max-w-[min(70vw,780px)]">
          {plotTitle}
        </h2>
      </div>
      <div className="flex flex-wrap gap-2 shrink-0">
        <button
          type="button"
          onClick={resetCamera}
          className="w-[88px] min-h-[36px] border border-white/18 rounded-full bg-white/8 text-white font-mono text-[0.76rem] font-semibold cursor-pointer transition-all hover:border-ochre-400 hover:bg-ochre-400/16 hover:-translate-y-px active:translate-y-0"
        >
          Camara
        </button>
        <button
          type="button"
          onClick={downloadPng}
          className="w-[88px] min-h-[36px] border border-white/18 rounded-full bg-white/8 text-white font-mono text-[0.76rem] font-semibold cursor-pointer transition-all hover:border-ochre-400 hover:bg-ochre-400/16 hover:-translate-y-px active:translate-y-0"
        >
          PNG
        </button>
      </div>
    </div>
  );
}
