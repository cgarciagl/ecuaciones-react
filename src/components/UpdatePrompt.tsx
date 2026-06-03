import { useSWUpdate } from "../hooks/useSWUpdate";

export function UpdatePrompt() {
  const { available, applyUpdate } = useSWUpdate();

  if (!available) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed top-3.5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 max-w-[420px] pl-3 pr-3 py-3 border border-white/35 rounded-2xl bg-[linear-gradient(140deg,rgba(255,255,255,0.96),rgba(240,249,244,0.92))] shadow-[0_18px_38px_rgba(31,64,50,0.22)] backdrop-blur-xl animate-[rise-in_0.32s_ease-out] max-[640px]:left-2.5 max-[640px]:right-2.5 max-[640px]:top-2.5 max-[640px]:translate-x-0 max-[640px]:max-w-none"
    >
      <div className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-ochre-500 via-ochre-400 to-rust-500 flex items-center justify-center shadow-[0_4px_12px_rgba(199,140,40,0.32)]">
        <span className="text-white font-mono text-[0.84rem] font-black leading-none">
          !
        </span>
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-ink text-[0.82rem] font-extrabold leading-tight">
          Actualizacion disponible
        </p>
        <p className="mt-0.5 text-ink-soft text-[0.72rem] leading-snug">
          Hay una nueva version lista para aplicar.
        </p>
      </div>

      <button
        type="button"
        onClick={applyUpdate}
        className="shrink-0 min-h-[34px] px-3.5 border border-moss-700/30 rounded-full bg-[linear-gradient(145deg,#2f8f66,#2f5f46)] text-white text-[0.74rem] font-extrabold uppercase tracking-[0.04em] cursor-pointer shadow-[0_6px_14px_rgba(31,64,50,0.28)]"
      >
        Recargar
      </button>
    </div>
  );
}
