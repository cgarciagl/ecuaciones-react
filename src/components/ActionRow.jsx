import { useStore } from "../store";

export function ActionRow() {
  const renderSurface = useStore((s) => s.renderSurface);
  const resetDefaults = useStore((s) => s.resetDefaults);

  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2.5">
      <button
        type="button"
        onClick={renderSurface}
        className="min-h-[50px] px-4 rounded-xl bg-[linear-gradient(145deg,#2f8f66,#2f5f46)] text-white cursor-pointer text-[0.88rem] font-extrabold tracking-[0.03em] uppercase transition-all hover:shadow-[0_16px_28px_rgba(47,95,70,0.3)] hover:-translate-y-px active:translate-y-0"
      >
        Generar superficie
      </button>
      <button
        type="button"
        onClick={resetDefaults}
        className="min-w-[78px] min-h-[50px] px-2.5 border border-line rounded-xl bg-panel text-ink-soft font-mono text-[0.74rem] font-semibold cursor-pointer transition-all hover:border-moss-600 hover:bg-moss-600/10 hover:text-moss-700 hover:-translate-y-px active:translate-y-0"
      >
        Reset
      </button>
    </div>
  );
}
