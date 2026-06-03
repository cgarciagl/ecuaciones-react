import { useCallback, useEffect, useState } from "react";
import { useStore } from "../store";
import {
  dispatchSurfaceAction,
  ECHARTS_CONTAINER_ID,
} from "../lib/surfaceEvents";

const WORKSPACE_BUTTON_CLASS =
  "w-[88px] min-h-[36px] border border-white/18 rounded-full bg-white/8 text-white font-mono text-[0.76rem] font-semibold cursor-pointer transition-all hover:border-ochre-400 hover:bg-ochre-400/16 hover:-translate-y-px active:translate-y-0";

export function WorkspaceBar() {
  const plotTitle = useStore((s) => s.plotTitle);
  const [isFullscreen, setIsFullscreen] = useState(
    () => document.fullscreenElement !== null
  );

  useEffect(() => {
    const handleChange = () => setIsFullscreen(document.fullscreenElement !== null);
    document.addEventListener("fullscreenchange", handleChange);
    return () => document.removeEventListener("fullscreenchange", handleChange);
  }, []);

  const resetCamera = useCallback(() => {
    dispatchSurfaceAction({ type: "resetCamera" });
  }, []);

  const downloadPng = useCallback(() => {
    dispatchSurfaceAction({ type: "downloadPng" });
  }, []);

  const toggleFullscreen = useCallback(() => {
    const plotDiv = document.getElementById(ECHARTS_CONTAINER_ID);
    if (!plotDiv) return;
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else {
      void plotDiv.requestFullscreen();
    }
  }, []);

  const actions = [
    { key: "camera", label: "Camara", onClick: resetCamera },
    { key: "png", label: "PNG", onClick: downloadPng },
    { key: "fullscreen", label: isFullscreen ? "Salir" : "Pantalla", onClick: toggleFullscreen },
  ];

  return (
    <div className="section-panel flex items-center justify-between gap-3.5 min-h-[78px] px-[23px] py-[19px] border border-[#2a3328] rounded-[16px] bg-[linear-gradient(120deg,rgba(31,35,29,0.97),rgba(19,22,16,0.97))] text-white shadow-[0_24px_70px_rgba(16,20,14,0.34)]">
      <div className="min-w-0">
        <p className="text-white/64 text-[0.72rem] font-extrabold tracking-[0.14em] uppercase">
          Vista interactiva
        </p>
        <h2 className="mt-1 font-mono text-[clamp(0.92rem,1.7vw,1.22rem)] font-semibold overflow-hidden text-ellipsis whitespace-nowrap max-w-[min(70vw,780px)]">
          {plotTitle}
        </h2>
      </div>
      <div className="flex flex-wrap gap-2 shrink-0">
        {actions.map((a) => (
          <button
            key={a.key}
            type="button"
            onClick={a.onClick}
            className={WORKSPACE_BUTTON_CLASS}
          >
            {a.label}
          </button>
        ))}
      </div>
    </div>
  );
}
