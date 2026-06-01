export function Footer() {
  return (
    <footer className="col-start-2 flex items-center justify-end gap-4 min-w-0 min-h-[38px] px-1 text-muted text-[0.72rem] max-[980px]:col-start-1 max-[980px]:justify-start max-[980px]:flex-wrap max-[980px]:px-3.5 max-[980px]:pb-20">
      <span>Raton: rotar</span>
      <span>
        <kbd className="px-1.5 py-0.5 border border-line border-b-line-strong rounded-[5px] bg-white text-ink-soft font-mono text-[0.66rem]">
          Scroll
        </kbd>{" "}
        zoom
      </span>
      <span>
        <kbd className="px-1.5 py-0.5 border border-line border-b-line-strong rounded-[5px] bg-white text-ink-soft font-mono text-[0.66rem]">
          Shift
        </kbd>{" "}
        + arrastrar: desplazar
      </span>
    </footer>
  );
}
