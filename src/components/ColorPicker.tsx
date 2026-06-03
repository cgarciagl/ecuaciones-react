import type { ColorScale } from "../store";
import { useStore } from "../store";
import { SectionPanel } from "./SectionPanel";
import { SectionHeader } from "./SectionHeader";

const COLORS: ReadonlyArray<{ name: ColorScale; gradient: string }> = [
  { name: "Viridis", gradient: "linear-gradient(90deg, #440154, #21918c, #fde725)" },
  { name: "Plasma", gradient: "linear-gradient(90deg, #0d0887, #cc4778, #f0f921)" },
  { name: "Hot", gradient: "linear-gradient(90deg, #000, #d23b21, #ffffbf)" },
  { name: "Electric", gradient: "linear-gradient(90deg, #1f005c, #00d4ff, #ffff00)" },
  { name: "Earth", gradient: "linear-gradient(90deg, #3c2415, #a7773c, #e8d8aa)" },
  { name: "Greys", gradient: "linear-gradient(90deg, #111, #777, #eee)" },
];

export function ColorPicker() {
  const colorScale = useStore((s) => s.colorScale);

  return (
    <SectionPanel>
      <SectionHeader number="04" title="Color">
        <span className="text-muted font-mono text-[0.68rem] leading-relaxed">
          {colorScale}
        </span>
      </SectionHeader>

      <div className="grid grid-cols-2 gap-2.5">
        {COLORS.map((c) => (
          <button
            key={c.name}
            type="button"
            onClick={() => useStore.getState().setColorScale(c.name)}
            className={`flex items-center gap-2.5 min-h-[40px] px-3 border-[1.5px] rounded-xl bg-[#fcfffc] text-ink-soft text-[0.78rem] font-bold cursor-pointer transition-all hover:-translate-y-px dark:bg-[#1e261e] ${
              colorScale === c.name
                ? "border-moss-600 bg-moss-600/10 shadow-[0_8px_20px_rgba(47,95,70,0.14)] dark:border-moss-400 dark:bg-moss-500/15 dark:shadow-[0_8px_20px_rgba(47,95,70,0.28)]"
                : "border-line"
            }`}
          >
            <span
              className="w-[24px] h-3.5 shrink-0 rounded-[4px] border border-black/15"
              style={{ background: c.gradient }}
            />
            {c.name}
          </button>
        ))}
      </div>
    </SectionPanel>
  );
}
