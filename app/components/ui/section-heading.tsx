type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  className?: string;
};

export function SectionHeading({
  title,
  subtitle,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`mb-10 md:mb-12 ${className}`}>
      <h2
        className="text-[34px] leading-[1.06] text-[var(--color-text)] sm:text-[40px] md:text-[48px]"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        {title}
      </h2>

      {subtitle ? (
        <p className="mt-4 max-w-[42ch] text-[17px] leading-[1.7] text-[var(--color-text-secondary)] md:text-[18px]">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}