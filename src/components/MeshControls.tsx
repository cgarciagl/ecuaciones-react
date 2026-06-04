import { useTransition } from "react";
import type { SurfaceMode } from "../store";
import { useStore } from "../store";
import { SectionPanel } from "./SectionPanel";
import { SectionHeader } from "./SectionHeader";

const MODES: ReadonlyArray<{ id: SurfaceMode; label: string }> = [
  { id: "surface", label: "Malla" },
  { id: "wireframe", label: "Estructura" },
  { id: "points", label: "Puntos" },
];

export function MeshControls() {
  const resolution = useStore((s) => s.resolution);
  const surfaceMode = useStore((s) => s.surfaceMode);
  const [, startTransition] = useTransition();

  const pointCount = (resolution * resolution).toLocaleString("es-MX");

  const handleMode = (mode: SurfaceMode) => {
    startTransition(() => {
      useStore.getState().setSurfaceMode(mode);
    });
  };

  const handleResolution = (value: number) => {
    startTransition(() => {
      useStore.getState().setResolution(value);
    });
  };

  return (
    <SectionPanel>
      <SectionHeader number="03" title="Malla">
        <span className="text-muted font-mono text-[0.68rem] leading-relaxed">
          {pointCount} puntos
        </span>
      </SectionHeader>

      <div className="grid gap-3 mb-7">
        <label className="text-muted text-[0.72rem] font-bold tracking-[0.08em] uppercase">
          Estilo
        </label>
        <div className="flex gap-1.5">
          {MODES.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => handleMode(m.id)}
            className={`flex-1 py-1.5 rounded-lg text-[0.72rem] font-bold tracking-[0.04em] transition-all border ${
              surfaceMode === m.id
                ? "bg-ink text-white shadow-sm border-ink"
                : "bg-white/40 border-line/50 text-ink-soft/70 hover:bg-white/80 hover:border-line hover:text-ink dark:bg-[#1e261e]/60 dark:border-line/60 dark:text-ink-soft/70 dark:hover:bg-[#1e261e] dark:hover:border-line-strong dark:hover:text-ink"
            }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-3 mt-7">
        <div className="flex items-center justify-between gap-3">
          <label className="text-muted text-[0.72rem] font-bold tracking-[0.08em] uppercase">
            Resolucion
          </label>
          <span className="min-w-[48px] px-2.5 py-1 rounded-full bg-ochre-100 text-ochre-700 font-mono text-[0.74rem] font-bold text-center dark:bg-ochre-500/20 dark:text-ochre-300">
            {resolution}
          </span>
        </div>
        <input
          type="range"
          min={20}
          max={200}
          step={5}
          value={resolution}
          onChange={(e) => handleResolution(Number(e.target.value))}
        />
      </div>
    </SectionPanel>
  );
}
