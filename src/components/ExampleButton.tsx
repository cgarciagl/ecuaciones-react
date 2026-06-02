import type { Example } from "../lib/examples";

type ExampleButtonProps = {
  example: Example;
  index: number;
  onSelect: (index: number) => void;
  variant?: "panel" | "sheet";
};

export function ExampleButton({
  example: ex,
  index: i,
  onSelect,
  variant = "panel",
}: ExampleButtonProps) {
  const baseClass =
    variant === "sheet"
      ? "bg-white/80"
      : "bg-[#fcfffc]/82";
  return (
    <button
      type="button"
      onClick={() => onSelect(i)}
      className={`grid grid-cols-[auto_minmax(0,1fr)] gap-x-2.5 gap-y-0.5 w-full min-h-[56px] p-3 border border-line rounded-xl ${baseClass} text-ink text-left cursor-pointer transition-all hover:border-rust-500 hover:bg-rust-500/8 hover:translate-x-0.5`}
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
  );
}
