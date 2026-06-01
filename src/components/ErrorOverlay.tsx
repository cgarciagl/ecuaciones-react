import { useStore } from "../store";

export function ErrorOverlay() {
  const error = useStore((s) => s.error);
  const clearError = useStore((s) => s.clearError);

  if (!error) return null;

  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-3.5 p-8 text-center bg-ink/94 text-white rounded-lg">
      <div className="w-[54px] h-[54px] grid place-items-center border border-white/24 rounded-full text-ochre-400 font-mono text-2xl font-black">
        !
      </div>
      <div className="text-amber-200 text-lg font-black">
        Error en la ecuacion
      </div>
      <div className="max-w-[520px] text-white/72 font-mono text-[0.78rem] leading-relaxed break-words">
        {error}
      </div>
      <button
        type="button"
        onClick={clearError}
        className="min-h-[38px] px-4 border border-white/22 rounded-full bg-white/8 text-white font-extrabold cursor-pointer transition-colors hover:bg-white/14"
      >
        Entendido
      </button>
    </div>
  );
}
