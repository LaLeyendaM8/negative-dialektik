type PageHeroProps = {
  title: string;
  eyebrow?: string;
  lead?: string;
  align?: "left" | "center";
};

export function PageHero({
  title,
  eyebrow,
  lead,
  align = "left",
}: PageHeroProps) {
  const isCentered = align === "center";

  return (
    <header
      className={
        isCentered
          ? "mb-14 text-center md:mb-16"
          : "mb-14 md:mb-16"
      }
    >
      {eyebrow ? (
        <p className="mb-5 text-[12px] uppercase tracking-[0.18em] text-[var(--color-text-secondary)]">
          {eyebrow}
        </p>
      ) : null}

      <h1
        className="text-[44px] leading-[1.02] tracking-[-0.03em] text-[var(--color-text)] sm:text-[52px] md:text-[64px]"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        {title}
      </h1>

      {lead ? (
        <p className="mt-7 max-w-[42ch] text-[18px] leading-[1.72] text-[var(--color-text-secondary)] md:text-[19px]">
          {lead}
        </p>
      ) : null}
    </header>
  );
}