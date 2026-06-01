import { useStore } from "../store";

export function StatusBar() {
  const status = useStore((s) => s.status);

  return (
    <div className="flex items-center gap-2.5 min-h-[42px] px-3.5 border border-line rounded-lg bg-white/78 text-ink-soft font-mono text-[0.72rem]">
      <span
        className={`w-2 h-2 shrink-0 rounded-full ${
          status.type === "error"
            ? "bg-red-500 shadow-[0_0_0_5px_rgba(239,68,68,0.12)]"
            : "bg-moss-600 shadow-[0_0_0_5px_rgba(47,95,70,0.12)]"
        }`}
      />
      <span className="flex-1 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">
        {status.message}
      </span>
      {status.timing && (
        <span className="text-rust-500 font-extrabold">{status.timing}</span>
      )}
    </div>
  );
}
