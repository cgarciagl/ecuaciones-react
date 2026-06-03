import { useStore } from "../store";
import { EXAMPLES } from "../lib/examples";
import { SectionPanel } from "./SectionPanel";
import { SectionHeader } from "./SectionHeader";
import { ExampleButton } from "./ExampleButton";

export function ExamplesPanel() {
  const loadExample = useStore((s) => s.loadExample);

  return (
    <SectionPanel>
      <SectionHeader number="05" title="Ejemplos" />

      <div className="grid gap-2">
        {EXAMPLES.map((ex, i) => (
          <ExampleButton key={i} example={ex} index={i} onSelect={loadExample} />
        ))}
      </div>
    </SectionPanel>
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
              <ExampleButton
                key={i}
                example={ex}
                index={i}
                onSelect={loadExample}
                variant="sheet"
              />
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
