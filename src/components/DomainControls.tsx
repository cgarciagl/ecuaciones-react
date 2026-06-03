import { useRef } from "react";
import type { ChangeEvent } from "react";
import { useStore } from "../store";
import { SectionPanel } from "./SectionPanel";
import { SectionHeader } from "./SectionHeader";

const PRESETS = [
  { label: "Compacto", value: "-5,5,-5,5" },
  { label: "Amplio", value: "-10,10,-10,10" },
  { label: "Pi", value: "-3.14,3.14,-3.14,3.14" },
] as const;

type DomainField = "xMin" | "xMax" | "yMin" | "yMax";

const FIELDS: ReadonlyArray<readonly [DomainField, string]> = [
  ["xMin", "X min"],
  ["xMax", "X max"],
  ["yMin", "Y min"],
  ["yMax", "Y max"],
];

export function DomainControls() {
  const xMin = useStore((s) => s.xMin);
  const xMax = useStore((s) => s.xMax);
  const yMin = useStore((s) => s.yMin);
  const yMax = useStore((s) => s.yMax);
  const setDomain = useStore((s) => s.setDomain);
  const setDomainPreset = useStore((s) => s.setDomainPreset);
  const renderSurface = useStore((s) => s.renderSurface);
  const changedRef = useRef(false);

  const values: Record<DomainField, number> = { xMin, xMax, yMin, yMax };

  const handleChange = (field: DomainField, value: string) => {
    const num = parseFloat(value);
    if (isNaN(num)) return;
    changedRef.current = true;
    const next = { xMin, xMax, yMin, yMax, [field]: num };
    setDomain(next.xMin, next.xMax, next.yMin, next.yMax);
  };

  const handleBlur = () => {
    if (changedRef.current) {
      changedRef.current = false;
      renderSurface();
    }
  };

  return (
    <SectionPanel>
      <SectionHeader number="02" title="Dominio">
        <span className="max-w-[172px] text-muted font-mono text-[0.68rem] leading-relaxed text-right">
          x {xMin}..{xMax} / y {yMin}..{yMax}
        </span>
      </SectionHeader>

      <div className="grid grid-cols-2 gap-3">
        {FIELDS.map(([field, label]) => (
          <div key={field} className="grid gap-1.5">
            <label className="text-muted text-[0.7rem] font-bold tracking-[0.08em] uppercase">
              {label}
            </label>
            <input
              type="number"
              value={values[field]}
              step={0.01}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChange(field, e.target.value)
              }
              onBlur={handleBlur}
              className="w-full min-h-[44px] py-2 px-3 border border-line rounded-xl outline-none bg-[#fcfffc] text-ink font-mono text-[0.84rem] transition-all focus:border-moss-600 focus:shadow-[0_0_0_3px_rgba(47,95,70,0.12)]"
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2.5 mt-4 pl-0.5 max-[460px]:grid-cols-2">
        {PRESETS.map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => setDomainPreset(p.value)}
            className="group relative w-full overflow-hidden min-h-[40px] px-4.5 border border-[#b6c6b8] rounded-full bg-[linear-gradient(180deg,#ffffff,#edf5ee)] text-[#3a4a3d] font-mono text-[0.78rem] font-semibold cursor-pointer shadow-[0_2px_0_rgba(255,255,255,0.8)_inset,0_1px_2px_rgba(20,30,24,0.12)] transition-all duration-150 hover:border-moss-600/65 hover:text-moss-700 hover:-translate-y-px hover:shadow-[0_2px_0_rgba(255,255,255,0.9)_inset,0_8px_16px_rgba(47,95,70,0.16)] active:translate-y-0 active:shadow-[0_2px_0_rgba(255,255,255,0.8)_inset,0_2px_5px_rgba(20,30,24,0.14)]"
          >
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.55),transparent_48%)] opacity-70 group-hover:opacity-100 transition-opacity" />
            <span className="relative z-10 block text-center">{p.label}</span>
          </button>
        ))}
      </div>
    </SectionPanel>
  );
}
