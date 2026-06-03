import { useEffect, useState } from "react";
import { useInstallPrompt } from "../hooks/useInstallPrompt";

export function Footer() {
  const { status, promptInstall } = useInstallPrompt();
  const [showIosHint, setShowIosHint] = useState(false);
  const isIos = status === "ios";
  const canShow = status === "available" || status === "ios" || status === "hidden";

  useEffect(() => {
    if (!showIosHint) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowIosHint(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showIosHint]);

  return (
    <footer className="flex section-panel items-center justify-between gap-4 min-w-0 min-h-[40px] px-[6px] text-muted text-[0.76rem] font-medium max-[980px]:justify-start max-[980px]:flex-wrap max-[980px]:pb-20">
      <div className="flex items-center gap-4 flex-wrap">
        <span className="opacity-70">by Carlos García Trujillo</span>
        {canShow && (
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                if (isIos) {
                  setShowIosHint((v) => !v);
                } else {
                  void promptInstall();
                }
              }}
              aria-expanded={isIos ? showIosHint : undefined}
              aria-haspopup={isIos ? "dialog" : undefined}
              className="text-muted hover:text-ink-soft text-[0.76rem] font-semibold underline underline-offset-[3px] decoration-line/60 hover:decoration-moss-500 cursor-pointer transition-colors"
            >
              Instalar app
            </button>
            {isIos && showIosHint && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowIosHint(false)}
                  aria-hidden="true"
                />
                <div
                  role="dialog"
                  aria-label="Como instalar la app"
                  className="absolute bottom-full left-0 mb-2 z-50 p-3.5 w-[280px] border border-white/35 rounded-2xl bg-[linear-gradient(140deg,rgba(255,255,255,0.97),rgba(240,249,244,0.95))] shadow-[0_18px_38px_rgba(31,64,50,0.22)] backdrop-blur-xl animate-[rise-in_0.32s_ease-out] max-[640px]:left-auto max-[640px]:right-0 dark:bg-[linear-gradient(140deg,rgba(26,32,26,0.96),rgba(14,18,12,0.98))] dark:shadow-[0_18px_38px_rgba(0,0,0,0.4)] dark:border-white/15"
                >
                  <p className="text-ink text-[0.8rem] font-extrabold">
                    Anade a inicio
                  </p>
                  <p className="mt-1 text-ink-soft text-[0.72rem] leading-snug">
                    Toca Compartir y elige Anadir a pantalla de inicio.
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowIosHint(false)}
                    className="mt-2.5 px-3 py-1 border border-line/60 rounded-full bg-white/60 text-ink-soft text-[0.7rem] font-semibold hover:border-moss-400 hover:text-ink cursor-pointer dark:bg-[#1a201a]/70 dark:border-white/20"
                  >
                    Cerrar
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
      <div className="flex items-center gap-4 max-[980px]:hidden">
        <span>Raton: rotar</span>
        <span>
          <kbd className="px-1.5 py-0.5 border border-line border-b-line-strong rounded-[6px] bg-white/92 text-ink-soft font-mono text-[0.68rem] dark:bg-[#1a201a]/92">
            Scroll
          </kbd>{" "}
          zoom
        </span>
        <span>
          <kbd className="px-1.5 py-0.5 border border-line border-b-line-strong rounded-[6px] bg-white/92 text-ink-soft font-mono text-[0.68rem] dark:bg-[#1a201a]/92">
            Shift
          </kbd>{" "}
          + arrastrar: desplazar
        </span>
      </div>
    </footer>
  );
}
