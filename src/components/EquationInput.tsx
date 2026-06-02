import { useCallback } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";
import { useStore } from "../store";

export function EquationInput() {
  const equation = useStore((s) => s.equation);
  const setEquation = useStore((s) => s.setEquation);
  const renderSurface = useStore((s) => s.renderSurface);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") renderSurface();
    },
    [renderSurface]
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEquation(e.target.value);
  };

  return (
    <section className="section-panel border border-line/80 rounded-[14px] bg-[linear-gradient(160deg,rgba(255,255,255,0.94),rgba(249,253,250,0.9))] shadow-[0_10px_26px_rgba(20,30,24,0.07)]">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <span className="block text-rust-500 font-mono text-[0.64rem] font-semibold tracking-[0.16em]">
            01
          </span>
          <h2 className="mt-0.5 text-ink text-[1.07rem] font-extrabold">
            Ecuacion
          </h2>
        </div>
        <span className="max-w-[176px] text-muted font-mono text-[0.68rem] leading-relaxed text-right">
          Enter para generar
        </span>
      </div>

      <label className="block">
        <div className="flex items-center w-full min-h-[56px] border-[1.5px] border-line-strong rounded-xl bg-[#fcfffc] transition-all focus-within:border-moss-600 focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(47,95,70,0.14)]">
          <span className="shrink-0 pl-4 pr-2 text-moss-600 font-mono text-[0.92rem] font-semibold pointer-events-none">
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
            className="flex-1 min-w-0 min-h-[54px] py-3.5 pr-3.5 pl-0 outline-none border-0 bg-transparent text-ink leading-normal font-mono text-[0.94rem] placeholder:text-[#9f9786]"
          />
        </div>
      </label>
    </section>
  );
}
