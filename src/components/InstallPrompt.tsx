import { useInstallPrompt } from "../hooks/useInstallPrompt";

export function InstallPrompt() {
  const { status, promptInstall, dismiss } = useInstallPrompt();

  if (status !== "available" && status !== "ios") return null;

  const isIos = status === "ios";

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed left-3.5 bottom-3.5 z-20 flex items-center gap-3 max-w-[320px] pl-3 pr-3 py-3 border border-white/35 rounded-2xl bg-[linear-gradient(140deg,rgba(255,255,255,0.96),rgba(240,249,244,0.92))] shadow-[0_18px_38px_rgba(31,64,50,0.22)] backdrop-blur-xl animate-[rise-in_0.32s_ease-out] max-[640px]:left-2.5 max-[640px]:right-2.5 max-[640px]:bottom-2.5 max-[640px]:max-w-none"
    >
      <div className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-moss-600 via-moss-500 to-rust-500 flex items-center justify-center shadow-[0_4px_12px_rgba(47,95,70,0.28)]">
        <span className="text-white font-mono text-[0.84rem] font-black leading-none">
          f
        </span>
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-ink text-[0.82rem] font-extrabold leading-tight">
          {isIos ? "Anade a inicio" : "Instala Superficie3D"}
        </p>
        <p className="mt-0.5 text-ink-soft text-[0.72rem] leading-snug">
          {isIos
            ? "Toca Compartir y elige Anadir a pantalla de inicio."
            : "Accede mas rapido y usala sin conexion."}
        </p>
      </div>

      {!isIos && (
        <button
          type="button"
          onClick={() => {
            void promptInstall();
          }}
          className="shrink-0 min-h-[34px] px-3.5 border border-moss-700/30 rounded-full bg-[linear-gradient(145deg,#2f8f66,#2f5f46)] text-white text-[0.74rem] font-extrabold uppercase tracking-[0.04em] cursor-pointer shadow-[0_6px_14px_rgba(31,64,50,0.28)]"
        >
          Instalar
        </button>
      )}

      <button
        type="button"
        onClick={dismiss}
        aria-label="Cerrar aviso de instalacion"
        className="shrink-0 w-7 h-7 flex items-center justify-center border-0 rounded-full bg-transparent text-muted hover:bg-line/40 hover:text-ink text-[1.1rem] leading-none cursor-pointer"
      >
        x
      </button>
    </div>
  );
}
