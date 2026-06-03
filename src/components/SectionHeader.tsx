import type { ReactNode } from "react";

type SectionHeaderProps = {
  number: string;
  title: string;
  children?: ReactNode;
};

export function SectionHeader({ number, title, children }: SectionHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-3 mb-3.5">
      <div>
        <span className="block text-rust-500 font-mono text-[0.64rem] font-semibold tracking-[0.16em]">
          {number}
        </span>
        <h2 className="mt-0.5 text-ink text-[1.07rem] font-extrabold">
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}
