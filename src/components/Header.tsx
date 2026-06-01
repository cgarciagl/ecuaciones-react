import { useStore } from "../store";

export function Header() {
  return (
    <header className="flex items-center justify-between gap-4 min-h-[72px] px-5 py-3.5 border border-line rounded-lg bg-white/86 shadow-[0_12px_34px_rgba(30,45,35,0.08)] backdrop-blur-xl col-span-full">
      <div className="flex items-center gap-3.5 min-w-0">
        <div
          className="w-11 h-11 shrink-0 rounded-full border border-ink"
          style={{
            background: `
              radial-gradient(circle at 50% 50%, white 0 21%, transparent 22%),
              conic-gradient(from 20deg, var(--color-moss-600), #1d7770, var(--color-ochre-400), var(--color-rust-500), var(--color-moss-600))
            `,
            boxShadow: "inset 0 0 0 5px rgba(255,255,255,0.78)",
          }}
        />
        <div>
          <p className="text-muted text-[0.68rem] font-bold tracking-[0.18em] uppercase leading-none">
            Laboratorio matematico
          </p>
          <h1 className="mt-1 text-ink font-extrabold leading-none text-[clamp(1.25rem,3vw,1.8rem)]">
            Superficie<span className="text-rust-500">3D</span>
          </h1>
        </div>
      </div>
    </header>
  );
}
