import { useStore } from "../store";

export function StatusBar() {
  const status = useStore((s) => s.status);

  return (
    <div className="flex items-center section-panel gap-2.5 min-h-[45px] px-[21px] border border-line/80 rounded-[14px] bg-white/82 text-ink-soft font-mono text-[0.76rem] shadow-[0_10px_30px_rgba(20,30,24,0.08)]">
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
        <span className="text-rust-500 font-bold">{status.timing}</span>
      )}
    </div>
  );
}
