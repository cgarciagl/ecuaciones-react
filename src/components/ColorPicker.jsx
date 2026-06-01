import { useStore } from "../store";

const COLORS = [
  { name: "Viridis", gradient: "linear-gradient(90deg, #440154, #21918c, #fde725)" },
  { name: "Plasma", gradient: "linear-gradient(90deg, #0d0887, #cc4778, #f0f921)" },
  { name: "Hot", gradient: "linear-gradient(90deg, #000, #d23b21, #ffffbf)" },
  { name: "Electric", gradient: "linear-gradient(90deg, #1f005c, #00d4ff, #ffff00)" },
  { name: "Earth", gradient: "linear-gradient(90deg, #3c2415, #a7773c, #e8d8aa)" },
  { name: "Greys", gradient: "linear-gradient(90deg, #111, #777, #eee)" },
];

export function ColorPicker() {
  const colorScale = useStore((s) => s.colorScale);
  const setColorScale = useStore((s) => s.setColorScale);

  return (
    <section className="p-3.5 border border-line rounded-lg bg-white/72">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <span className="block text-rust-500 font-mono text-[0.62rem] font-bold tracking-[0.18em]">
            04
          </span>
          <h2 className="mt-0.5 text-ink text-[0.95rem] font-extrabold">
            Color
          </h2>
        </div>
        <span className="text-muted font-mono text-[0.66rem] leading-relaxed">
          {colorScale}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {COLORS.map((c) => (
          <button
            key={c.name}
            type="button"
            onClick={() => setColorScale(c.name)}
            className={`flex items-center gap-2 min-h-[38px] px-2.5 border-[1.5px] rounded-lg bg-[#fcfffc] text-ink-soft text-[0.76rem] font-extrabold cursor-pointer transition-all hover:-translate-y-px ${
              colorScale === c.name
                ? "border-moss-600 bg-moss-600/8"
                : "border-line"
            }`}
          >
            <span
              className="w-[22px] h-3.5 shrink-0 rounded-sm border border-black/15"
              style={{ background: c.gradient }}
            />
            {c.name}
          </button>
        ))}
      </div>
    </section>
  );
}
