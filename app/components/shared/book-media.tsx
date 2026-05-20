import Image from "next/image";

type BookMediaProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  imageClassName?: string;
};

export function BookMedia({
  src,
  alt,
  sizes,
  className = "",
  imageClassName = "",
}: BookMediaProps) {
  const isPdf = src.toLowerCase().endsWith(".pdf");

  if (isPdf) {
    return (
      <object
        data={src}
        type="application/pdf"
        aria-label={alt}
        className={`h-full w-full ${className}`}
      >
        <div className="flex h-full w-full items-center justify-center p-6 text-center text-[13px] uppercase tracking-[0.08em] text-[var(--color-text-secondary)]">
          PDF
        </div>
      </object>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={imageClassName}
      sizes={sizes}
    />
  );
}
