import { useEffect, useRef, useState } from "react";
import { useStore, type SurfaceMode } from "../store";

const MODES: ReadonlyArray<{ id: SurfaceMode; label: string }> = [
  { id: "surface", label: "Malla" },
  { id: "wireframe", label: "Estructura" },
  { id: "points", label: "Puntos" },
];

export function MobileModeSelector() {
  const [open, setOpen] = useState(false);
  const surfaceMode = useStore((s) => s.surfaceMode);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentLabel =
    MODES.find((m) => m.id === surfaceMode)?.label ?? "Malla";

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick);
    };
  }, [open]);

  const handleSelect = (mode: SurfaceMode) => {
    useStore.getState().setSurfaceMode(mode);
    setOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className="relative hidden max-[640px]:block"
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Cambiar modo de superficie"
        aria-expanded={open}
        className="flex items-center gap-1.5 min-h-[40px] pl-2.5 pr-3 border border-white/28 rounded-full bg-[linear-gradient(145deg,#2f8f66,#2f5f46)] text-white shadow-[0_12px_26px_rgba(31,64,50,0.32)] cursor-pointer text-[0.72rem] font-extrabold tracking-[0.04em] uppercase"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
        {currentLabel}
      </button>
      {open && (
        <div className="absolute bottom-full right-0 mb-2 flex flex-col gap-1 p-1.5 border border-white/22 rounded-2xl bg-[linear-gradient(140deg,rgba(20,24,15,0.96),rgba(14,18,12,0.98))] shadow-[0_18px_38px_rgba(0,0,0,0.44)] backdrop-blur-xl min-w-[140px] animate-[rise-in_0.18s_ease-out]">
          {MODES.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => handleSelect(m.id)}
              className={`text-left px-3 py-2 rounded-xl text-[0.72rem] font-bold tracking-[0.02em] transition-colors cursor-pointer border-0 ${
                surfaceMode === m.id
                  ? "bg-ochre-500/22 text-ochre-200"
                  : "bg-transparent text-white/82 hover:bg-white/8 hover:text-white"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
