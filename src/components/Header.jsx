export function Header() {
  return (
    <header className="flex items-center justify-between gap-4 min-h-[72px] px-5 py-3.5 border border-line rounded-lg bg-white/86 shadow-[0_12px_34px_rgba(30,45,35,0.08)] backdrop-blur-xl col-span-full">
      <div className="flex items-center gap-3.5 min-w-0">
        <div className="relative w-11 h-11 shrink-0 rounded-full bg-gradient-to-br from-moss-600 to-rust-500 flex items-center justify-center shadow-[0_2px_8px_rgba(47,95,70,0.3)]">
          <span className="text-white font-mono text-[0.9rem] font-black leading-none">
            f
          </span>
        </div>
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
