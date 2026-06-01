import { useStore } from "../store";

export function WorkspaceBar() {
  const plotTitle = useStore((s) => s.plotTitle);

  const resetCamera = () => {
    const plotDiv = document.querySelector(".js-plotly-plot");
    if (plotDiv && window.Plotly) {
      window.Plotly.relayout(plotDiv, {
        "scene.camera": { eye: { x: 1.5, y: 1.5, z: 1.2 } },
      });
    }
  };

  const downloadPng = () => {
    const plotDiv = document.querySelector(".js-plotly-plot");
    if (plotDiv && window.Plotly) {
      window.Plotly.downloadImage(plotDiv, {
        format: "png",
        filename: "superficie-3d",
        width: 1400,
        height: 1000,
        scale: 1,
      });
    }
  };

  return (
    <div className="flex items-center justify-between gap-3.5 min-h-[72px] px-4 py-3.5 border border-line rounded-lg bg-ink/88 text-white shadow-[0_24px_70px_rgba(30,45,35,0.15)]">
      <div className="min-w-0">
        <p className="text-white/64 text-[0.68rem] font-extrabold tracking-[0.16em] uppercase">
          Vista interactiva
        </p>
        <h2 className="mt-1 font-mono text-[clamp(0.85rem,1.8vw,1.15rem)] font-bold overflow-hidden text-ellipsis whitespace-nowrap max-w-[min(70vw,780px)]">
          {plotTitle}
        </h2>
      </div>
      <div className="flex flex-wrap gap-1.5">
        <button
          type="button"
          onClick={resetCamera}
          className="min-h-[34px] px-2.5 border border-white/18 rounded-full bg-white/8 text-white font-mono text-[0.72rem] font-bold cursor-pointer transition-all hover:border-ochre-400 hover:bg-ochre-400/16 hover:-translate-y-px active:translate-y-0"
        >
          Camara
        </button>
        <button
          type="button"
          onClick={downloadPng}
          className="min-h-[34px] px-2.5 border border-white/18 rounded-full bg-white/8 text-white font-mono text-[0.72rem] font-bold cursor-pointer transition-all hover:border-ochre-400 hover:bg-ochre-400/16 hover:-translate-y-px active:translate-y-0"
        >
          PNG
        </button>
      </div>
    </div>
  );
}
