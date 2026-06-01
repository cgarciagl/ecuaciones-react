export function Footer() {
  return (
    <footer className="flex section-panel items-center justify-between gap-4 min-w-0 min-h-[40px] px-[6px] text-muted text-[0.76rem] font-medium max-[980px]:justify-start max-[980px]:flex-wrap max-[980px]:pb-20">
      <span className="opacity-70">by Carlos García Trujillo</span>
      <div className="flex items-center gap-4 max-[980px]:hidden">
      <span>Raton: rotar</span>
      <span>
        <kbd className="px-1.5 py-0.5 border border-line border-b-line-strong rounded-[6px] bg-white/92 text-ink-soft font-mono text-[0.68rem]">
          Scroll
        </kbd>{" "}
        zoom
      </span>
      <span>
        <kbd className="px-1.5 py-0.5 border border-line border-b-line-strong rounded-[6px] bg-white/92 text-ink-soft font-mono text-[0.68rem]">
          Shift
        </kbd>{" "}
        + arrastrar: desplazar
      </span>
      </div>
    </footer>
  );
}
