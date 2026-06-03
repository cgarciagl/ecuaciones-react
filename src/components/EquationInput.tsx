import { useTransition } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";
import { useStore } from "../store";
import { SectionPanel } from "./SectionPanel";
import { SectionHeader } from "./SectionHeader";

export function EquationInput() {
  const equation = useStore((s) => s.equation);
  const [, startTransition] = useTransition();

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      startTransition(() => {
        useStore.getState().renderSurface();
      });
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    useStore.getState().setEquation(e.target.value);
  };

  return (
    <SectionPanel className="bg-[linear-gradient(160deg,rgba(255,255,255,0.94),rgba(249,253,250,0.9))] shadow-[0_10px_26px_rgba(20,30,24,0.07)]">
      <SectionHeader number="01" title="Ecuacion">
        <span className="max-w-[176px] text-muted font-mono text-[0.68rem] leading-relaxed text-right">
          Enter para generar
        </span>
      </SectionHeader>

      <label className="block">
        <div className="flex items-center w-full min-h-[56px] border-[1.5px] border-line-strong rounded-xl bg-[#fcfffc] transition-all focus-within:border-moss-600 focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(47,95,70,0.14)]">
          <span className="shrink-0 pl-1 pr-0 text-moss-600 font-mono text-[0.92rem] font-semibold pointer-events-none zigual">
            z =
          </span>
          <input
            type="text"
            value={equation}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="sin(x) * cos(y)"
            spellCheck={false}
            autoComplete="off"
            className="flex-1 min-w-0 min-h-[54px] py-3.5 pr-1 pl-0 outline-none border-0 bg-transparent text-ink leading-normal font-mono text-[0.94rem] placeholder:text-[#9f9786]"
          />
        </div>
      </label>
    </SectionPanel>
  );
}
