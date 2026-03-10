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
        "[&>p]:mb-6",
        "[&>h2]:mb-5 [&>h2]:mt-14 [&>h2]:text-[30px] [&>h2]:leading-[1.12] [&>h2]:text-[var(--color-text)] md:[&>h2]:text-[36px]",
        "[&>h3]:mb-4 [&>h3]:mt-10 [&>h3]:text-[22px] [&>h3]:leading-[1.2] [&>h3]:text-[var(--color-text)] md:[&>h3]:text-[26px]",
        "[&>h2]:[font-family:var(--font-serif)]",
        "[&>h3]:[font-family:var(--font-serif)]",
        "[&>ul]:mb-6 [&>ul]:ml-5 [&>ul]:list-disc",
        "[&>ol]:mb-6 [&>ol]:ml-5 [&>ol]:list-decimal",
        "[&>li]:mb-2",
        "[&>blockquote]:my-10 [&>blockquote]:border-l [&>blockquote]:border-[var(--color-border)] [&>blockquote]:pl-6 [&>blockquote]:text-[var(--color-text-secondary)] [&>blockquote]:italic",
        "[&>hr]:my-10 [&>hr]:border-0 [&>hr]:border-t [&>hr]:border-[var(--color-border)]",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}