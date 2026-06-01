import { useStore } from "../store";

export function ActionRow() {
  const renderSurface = useStore((s) => s.renderSurface);
  const resetDefaults = useStore((s) => s.resetDefaults);

  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2">
      <button
        type="button"
        onClick={renderSurface}
        className="min-h-[48px] px-4 rounded-lg bg-moss-600 text-white cursor-pointer text-[0.86rem] font-black tracking-[0.03em] uppercase transition-all hover:bg-moss-700 hover:shadow-[0_12px_24px_rgba(47,95,70,0.24)] hover:-translate-y-px active:translate-y-0"
      >
        Generar superficie
      </button>
      <button
        type="button"
        onClick={resetDefaults}
        className="min-w-[70px] min-h-[48px] px-2.5 border border-line rounded-lg bg-panel text-ink-soft font-mono text-[0.72rem] font-bold cursor-pointer transition-all hover:border-moss-600 hover:bg-moss-600/10 hover:text-moss-700 hover:-translate-y-px active:translate-y-0"
      >
        Reset
      </button>
    </div>
  );
}
