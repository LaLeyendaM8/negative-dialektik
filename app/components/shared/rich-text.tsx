import type { ReactNode } from "react";

type RichTextProps = {
  children: ReactNode;
  className?: string;
};

export function RichText({ children, className = "" }: RichTextProps) {
  return (
    <div
      className={[
        "text-[17px] leading-[1.78] text-[var(--color-text)] md:text-[18px]",
        "[&>*:first-child]:mt-0",
        "[&>*:last-child]:mb-0",
        "[&_p]:mb-6",
        "[&_h2]:mb-5 [&_h2]:mt-14 [&_h2]:text-[28px] [&_h2]:leading-[1.12] [&_h2]:text-[var(--color-text)] md:[&_h2]:text-[34px]",
        "[&_h3]:mb-3 [&_h3]:mt-8 [&_h3]:text-[20px] [&_h3]:leading-[1.2] [&_h3]:text-[var(--color-text)] md:[&_h3]:text-[24px]",
        "[&_h2]:[font-family:var(--font-serif)]",
        "[&_h3]:[font-family:var(--font-serif)]",
        "[&_ul]:mb-6 [&_ul]:ml-5 [&_ul]:list-disc",
        "[&_ol]:mb-6 [&_ol]:ml-5 [&_ol]:list-decimal",
        "[&_li]:mb-2",
        "[&_blockquote]:my-10 [&_blockquote]:border-l [&_blockquote]:border-[var(--color-border)] [&_blockquote]:pl-6 [&_blockquote]:text-[var(--color-text-secondary)] [&_blockquote]:italic",
        "[&_hr]:my-10 [&_hr]:border-0 [&_hr]:border-t [&_hr]:border-[var(--color-border)]",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}