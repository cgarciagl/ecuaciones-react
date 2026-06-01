import { useRef, useCallback } from "react";
import { useStore } from "../store";

const FUNCTIONS = ["sin()", "cos()", "sqrt()", "exp()", "log()", "abs()"];

export function EquationInput() {
  const equation = useStore((s) => s.equation);
  const setEquation = useStore((s) => s.setEquation);
  const renderSurface = useStore((s) => s.renderSurface);
  const inputRef = useRef(null);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") renderSurface();
    },
    [renderSurface]
  );

  const insertFunction = useCallback(
    (fn) => {
      const input = inputRef.current;
      if (!input) return;
      const start = input.selectionStart ?? equation.length;
      const end = input.selectionEnd ?? start;
      const before = equation.slice(0, start);
      const after = equation.slice(end);
      const newEq = before + fn + after;
      setEquation(newEq);

      const cursor = start + fn.indexOf("(") + 1;
      requestAnimationFrame(() => {
        input.focus();
        input.setSelectionRange(cursor, cursor);
      });
    },
    [equation, setEquation]
  );

  return (
    <section className="pt-4 pb-4 pl-5 pr-4 border border-line/80 rounded-[14px] bg-[linear-gradient(160deg,rgba(255,255,255,0.94),rgba(249,253,250,0.9))] shadow-[0_10px_26px_rgba(20,30,24,0.07)]">
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
            ref={inputRef}
            type="text"
            value={equation}
            onChange={(e) => setEquation(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="sin(x) * cos(y)"
            spellCheck={false}
            autoComplete="off"
            className="flex-1 min-w-0 min-h-[54px] py-3.5 pr-3.5 pl-0 outline-none border-0 bg-transparent text-ink leading-normal font-mono text-[0.94rem] placeholder:text-[#9f9786]"
          />
        </div>
      </label>

      <div className="grid grid-cols-3 gap-2.5 mt-3 max-[460px]:grid-cols-2">
        {FUNCTIONS.map((fn) => (
          <button
            key={fn}
            type="button"
            onClick={() => insertFunction(fn)}
            className="group relative w-full overflow-hidden min-h-[40px] px-4.5 border border-[#b6c6b8] rounded-full bg-[linear-gradient(180deg,#ffffff,#edf5ee)] text-[#3a4a3d] font-mono text-[0.78rem] font-semibold cursor-pointer shadow-[0_2px_0_rgba(255,255,255,0.8)_inset,0_1px_2px_rgba(20,30,24,0.12)] transition-all duration-150 hover:border-moss-600/65 hover:text-moss-700 hover:-translate-y-px hover:shadow-[0_2px_0_rgba(255,255,255,0.9)_inset,0_8px_16px_rgba(47,95,70,0.16)] active:translate-y-0 active:shadow-[0_2px_0_rgba(255,255,255,0.8)_inset,0_2px_5px_rgba(20,30,24,0.14)]"
          >
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.55),transparent_48%)] opacity-70 group-hover:opacity-100 transition-opacity" />
            <span className="relative z-10 block text-center">{fn.replace("()", "")}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
