import { useSWUpdate } from "../hooks/useSWUpdate";

export function UpdatePrompt() {
  const { available } = useSWUpdate();

  if (!available) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed top-3.5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 max-w-[420px] pl-3 pr-3 py-3 border border-white/35 rounded-2xl bg-[linear-gradient(140deg,rgba(255,255,255,0.96),rgba(240,249,244,0.92))] shadow-[0_18px_38px_rgba(31,64,50,0.22)] backdrop-blur-xl animate-[rise-in_0.32s_ease-out] max-[640px]:left-2.5 max-[640px]:right-2.5 max-[640px]:top-2.5 max-[640px]:translate-x-0 max-[640px]:max-w-none dark:bg-[linear-gradient(140deg,rgba(26,32,26,0.94),rgba(14,18,12,0.98))] dark:shadow-[0_18px_38px_rgba(0,0,0,0.4)] dark:border-white/15"
    >
      <div className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-moss-500 via-moss-400 to-rust-400 flex items-center justify-center shadow-[0_4px_12px_rgba(47,95,70,0.28)]">
        <span className="text-white font-mono text-[0.84rem] font-black leading-none">
          ✓
        </span>
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-ink text-[0.82rem] font-extrabold leading-tight">
          Actualizacion lista
        </p>
        <p className="mt-0.5 text-ink-soft text-[0.72rem] leading-snug">
          Recargando automaticamente...
        </p>
      </div>
    </div>
  );
}
