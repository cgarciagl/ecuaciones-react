import type { ReactNode } from "react";

type SectionPanelProps = {
  children: ReactNode;
  className?: string;
};

export function SectionPanel({ children, className }: SectionPanelProps) {
  return (
    <section
      className={`section-panel border border-line/80 rounded-[14px] bg-white/80 shadow-[0_10px_26px_rgba(20,30,24,0.06)] dark:bg-[#1a201a]/82 dark:shadow-[0_10px_26px_rgba(0,0,0,0.32)]${className ? ` ${className}` : ""}`}
    >
      {children}
    </section>
  );
}
