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
    const pdfViewerUrl = `${src}#toolbar=0&navpanes=0&scrollbar=0&statusbar=0&messages=0&view=FitH`;

    return (
      <iframe
        src={pdfViewerUrl}
        title={alt}
        aria-label={alt}
        className={`h-full w-full overflow-hidden border-0 ${className}`}
        scrolling="no"
      >
        <div className="flex h-full w-full items-center justify-center p-6 text-center text-[13px] uppercase tracking-[0.08em] text-[var(--color-text-secondary)]">
          PDF
        </div>
      </iframe>
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
