import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="section-panel flex items-center justify-between gap-4 min-h-[82px] px-[25px] py-[21px] border border-line/80 rounded-[18px] bg-[linear-gradient(130deg,rgba(255,255,255,0.86),rgba(247,251,247,0.92))] shadow-[0_16px_40px_rgba(21,35,27,0.1)] backdrop-blur-xl col-span-full dark:bg-[linear-gradient(130deg,rgba(26,32,26,0.92),rgba(14,18,12,0.96))] dark:shadow-[0_16px_40px_rgba(0,0,0,0.32)]">
      <div className="flex items-center gap-3.5 min-w-0">
        <div className="relative w-12 h-12 shrink-0 rounded-full bg-gradient-to-br from-moss-600 via-moss-500 to-rust-500 flex items-center justify-center shadow-[0_6px_16px_rgba(47,95,70,0.28)]">
          <span className="text-white font-mono text-[0.96rem] font-black leading-none">
            f
          </span>
        </div>
        <div>
          <p className="text-muted text-[0.72rem] font-bold tracking-[0.14em] uppercase leading-none">
            Laboratorio matematico V3D
          </p>
          <h1 className="mt-1 text-ink font-extrabold leading-none text-[clamp(1.45rem,2.8vw,2rem)]">
            Superficie<span className="text-rust-500">3D</span>
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-2.5 shrink-0">
        <span className="px-3 py-1.5 border border-line rounded-full bg-white/72 text-ink-soft text-[0.7rem] font-mono font-semibold tracking-[0.08em] uppercase dark:bg-[#1a201a]/72">
          Visualizador
        </span>
        <ThemeToggle />
      </div>
    </header>
  );
}
