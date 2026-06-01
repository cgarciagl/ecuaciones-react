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
    <section className="p-3.5 border border-line rounded-lg bg-white">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <span className="block text-rust-500 font-mono text-[0.62rem] font-bold tracking-[0.18em]">
            01
          </span>
          <h2 className="mt-0.5 text-ink text-[0.95rem] font-extrabold">
            Ecuacion
          </h2>
        </div>
        <span className="max-w-[160px] text-muted font-mono text-[0.66rem] leading-relaxed text-right">
          Enter para generar
        </span>
      </div>

      <label className="relative block">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 z-10 text-moss-600 font-mono text-[0.88rem] font-bold pointer-events-none">
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
          className="w-full min-h-[52px] py-3.5 pr-3.5 pl-12 border-[1.5px] border-line-strong rounded-lg outline-none bg-[#fcfffc] text-ink font-mono text-[0.9rem] transition-all focus:border-moss-600 focus:bg-white focus:shadow-[0_0_0_4px_rgba(47,95,70,0.14)] placeholder:text-[#9f9786]"
        />
      </label>

      <div className="flex flex-wrap gap-1.5 mt-2.5">
        {FUNCTIONS.map((fn) => (
          <button
            key={fn}
            type="button"
            onClick={() => insertFunction(fn)}
            className="min-h-[34px] px-2.5 border border-line rounded-full bg-panel text-ink-soft font-mono text-[0.72rem] font-bold cursor-pointer transition-all hover:border-moss-600 hover:bg-moss-600/10 hover:text-moss-700 hover:-translate-y-px active:translate-y-0"
          >
            {fn.replace("()", "")}
          </button>
        ))}
      </div>
    </section>
  );
}
