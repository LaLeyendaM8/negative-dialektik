type PriceDisplayProps = {
  price?: string;
  originalPrice?: string;
  discountLabel?: string;
  size?: "small" | "default" | "large";
};

export function PriceDisplay({
  price,
  originalPrice,
  discountLabel,
  size = "default",
}: PriceDisplayProps) {
  if (!price) {
    return null;
  }

  const hasDiscount = Boolean(originalPrice && discountLabel);
  const priceClass =
    size === "large"
      ? "text-[30px] leading-none md:text-[36px]"
      : size === "small"
        ? "text-[15px]"
        : "text-[18px]";

  return (
    <div>
      {hasDiscount ? (
        <p className="mb-2 text-[11px] uppercase tracking-[0.12em] text-[#d7a642]">
          {discountLabel}
        </p>
      ) : null}
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        {originalPrice ? (
          <span className="text-[14px] text-[var(--color-text-secondary)] line-through">
            {originalPrice}
          </span>
        ) : null}
        <span className={`${priceClass} font-semibold text-[var(--color-text)]`}>
          {price}
        </span>
      </div>
    </div>
  );
}
