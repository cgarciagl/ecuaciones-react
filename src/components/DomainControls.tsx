import { useStore } from "../store";

const PRESETS = [
  { label: "Compacto", value: "-5,5,-5,5" },
  { label: "Amplio", value: "-10,10,-10,10" },
  { label: "Pi", value: "-3.14,3.14,-3.14,3.14" },
];

export function DomainControls() {
  const xMin = useStore((s) => s.xMin);
  const xMax = useStore((s) => s.xMax);
  const yMin = useStore((s) => s.yMin);
  const yMax = useStore((s) => s.yMax);
  const setDomain = useStore((s) => s.setDomain);
  const setDomainPreset = useStore((s) => s.setDomainPreset);
  const renderSurface = useStore((s) => s.renderSurface);

  const handleChange = (field: "xMin" | "xMax" | "yMin" | "yMax", value: string) => {
    const num = parseFloat(value);
    if (isNaN(num)) return;
    const newState = { xMin, xMax, yMin, yMax, [field]: num };
    setDomain(newState.xMin, newState.xMax, newState.yMin, newState.yMax);
  };

  const handleBlur = () => {
    renderSurface();
  };

  return (
    <section className="p-3.5 border border-line rounded-lg bg-white/72">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <span className="block text-rust-500 font-mono text-[0.62rem] font-bold tracking-[0.18em]">
            02
          </span>
          <h2 className="mt-0.5 text-ink text-[0.95rem] font-extrabold">
            Dominio
          </h2>
        </div>
        <span className="max-w-[160px] text-muted font-mono text-[0.66rem] leading-relaxed text-right">
          x {xMin}..{xMax} / y {yMin}..{yMax}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {([
          ["xMin", "X min", xMin],
          ["xMax", "X max", xMax],
          ["yMin", "Y min", yMin],
          ["yMax", "Y max", yMax],
        ] as const).map(([field, label, value]) => (
          <div key={field} className="grid gap-1">
            <label className="text-muted text-[0.68rem] font-extrabold tracking-[0.09em] uppercase">
              {label}
            </label>
            <input
              type="number"
              value={value}
              step={0.01}
              onChange={(e) => handleChange(field, e.target.value)}
              onBlur={handleBlur}
              className="w-full min-h-[42px] py-2 px-2.5 border border-line rounded-lg outline-none bg-[#fcfffc] text-ink font-mono text-[0.82rem] transition-all focus:border-moss-600 focus:shadow-[0_0_0_3px_rgba(47,95,70,0.12)]"
            />
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-1.5 mt-2.5">
        {PRESETS.map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => setDomainPreset(p.value)}
            className="min-h-[34px] px-2.5 border border-line rounded-full bg-panel text-ink-soft font-mono text-[0.72rem] font-bold cursor-pointer transition-all hover:border-moss-600 hover:bg-moss-600/10 hover:text-moss-700 hover:-translate-y-px active:translate-y-0"
          >
            {p.label}
          </button>
        ))}
      </div>
    </section>
  );
}
