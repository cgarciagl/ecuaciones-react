import { useStore } from "../store";
import { EXAMPLES } from "../lib/examples";

export function ExamplesPanel() {
  const loadExample = useStore((s) => s.loadExample);

  return (
    <section className="section-panel border border-line/80 rounded-[14px] bg-white/80 shadow-[0_10px_26px_rgba(20,30,24,0.06)]">
      <div className="flex items-start justify-between gap-3 mb-3.5">
        <div>
          <span className="block text-rust-500 font-mono text-[0.64rem] font-semibold tracking-[0.16em]">
            05
          </span>
          <h2 className="mt-0.5 text-ink text-[1.07rem] font-extrabold">
            Ejemplos
          </h2>
        </div>
      </div>

      <div className="grid gap-2">
        {EXAMPLES.map((ex, i) => (
          <button
            key={i}
            type="button"
            onClick={() => loadExample(i)}
            className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-2.5 gap-y-0.5 w-full min-h-[56px] p-3 border border-line rounded-xl bg-[#fcfffc]/82 text-ink text-left cursor-pointer transition-all hover:border-rust-500 hover:bg-rust-500/8 hover:translate-x-0.5"
          >
            <span className="row-span-2 w-[1.875rem] h-[1.875rem] grid place-items-center rounded-full bg-[#dfe9e1] text-base">
              {ex.emoji}
            </span>
            <span className="min-w-0 text-[0.86rem] font-bold whitespace-nowrap overflow-hidden text-ellipsis">
              {ex.name}
            </span>
            <span className="min-w-0 text-muted font-mono text-[0.7rem] whitespace-nowrap overflow-hidden text-ellipsis">
              {ex.eq}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

export function ExamplesSheet() {
  const examplesOpen = useStore((s) => s.examplesOpen);
  const closeExamples = useStore((s) => s.closeExamples);
  const loadExample = useStore((s) => s.loadExample);

  return (
    <div
      className={`fixed inset-0 z-30 ${
        examplesOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <button
        type="button"
        onClick={closeExamples}
        aria-label="Cerrar ejemplos"
        className={`absolute inset-0 transition-colors ${
          examplesOpen ? "bg-ink/38" : "bg-transparent"
        }`}
      />
      <div
        className={`absolute right-2.5 bottom-2.5 left-2.5 flex flex-col max-h-[min(74vh,620px)] p-3 border border-line rounded-t-[20px] rounded-b-[12px] bg-panel/98 shadow-[0_-22px_60px_rgba(17,20,15,0.22)] transition-transform duration-200 ease-out ${
          examplesOpen ? "translate-y-0" : "translate-y-[calc(100%+18px)]"
        }`}
      >
        <div className="self-center w-[42px] h-1 mb-2.5 rounded-full bg-line-strong" />

        <div className="flex items-center justify-between gap-3 mb-2.5">
          <div>
            <span className="text-muted text-[0.66rem] font-bold tracking-[0.16em] uppercase">
              Biblioteca
            </span>
            <h2 className="mt-0.5 text-ink text-[1.08rem] font-extrabold">Ejemplos</h2>
          </div>
          <button
            type="button"
            onClick={closeExamples}
            className="min-h-[34px] px-3 border border-line rounded-full bg-white text-ink-soft text-[0.78rem] font-bold cursor-pointer"
          >
            Cerrar
          </button>
        </div>

        <div className="overflow-y-auto pr-0.5">
          <div className="grid gap-1.5">
            {EXAMPLES.map((ex, i) => (
              <button
                key={i}
                type="button"
                onClick={() => loadExample(i)}
                className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-2.5 gap-y-0.5 w-full min-h-[56px] p-3 border border-line rounded-xl bg-white/80 text-ink text-left cursor-pointer transition-all hover:border-rust-500 hover:bg-rust-500/8 hover:translate-x-0.5"
              >
                <span className="row-span-2 w-[1.875rem] h-[1.875rem] grid place-items-center rounded-full bg-[#dfe9e1] text-base">
                  {ex.emoji}
                </span>
                <span className="min-w-0 text-[0.86rem] font-bold whitespace-nowrap overflow-hidden text-ellipsis">
                  {ex.name}
                </span>
                <span className="min-w-0 text-muted font-mono text-[0.7rem] whitespace-nowrap overflow-hidden text-ellipsis">
                  {ex.eq}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function FloatingExamplesButton() {
  const toggleExamples = useStore((s) => s.toggleExamples);

  return (
    <button
      type="button"
      onClick={toggleExamples}
      className="fixed right-3.5 bottom-3.5 z-20 min-h-[54px] px-5 border border-white/28 rounded-full bg-[linear-gradient(145deg,#2f8f66,#2f5f46)] text-white shadow-[0_18px_38px_rgba(31,64,50,0.36)] cursor-pointer text-[0.84rem] font-extrabold tracking-[0.03em] uppercase hidden max-[980px]:block"
    >
      Ejemplos
    </button>
  );
}
