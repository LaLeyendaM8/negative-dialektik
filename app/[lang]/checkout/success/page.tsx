import Link from "next/link";
import { PageHero } from "../../../components/shared/page-hero";
import { PageShell } from "../../../components/shared/page-shell";

export default async function CheckoutSuccessPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const isEs = lang === "es";

  return (
    <PageShell>
      <PageHero
        title={isEs ? "Pago completado" : "Zahlung abgeschlossen"}
        lead={
          isEs
            ? "Gracias. Hemos recibido tu pago correctamente."
            : "Vielen Dank. Ihre Zahlung wurde erfolgreich uebermittelt."
        }
      />

      <section className="border border-[var(--color-border)] bg-[var(--color-surface)] p-8">
        <p className="text-[17px] leading-[1.8] text-[var(--color-text)]">
          {isEs
            ? "La tramitacion editorial y el envio se coordinan de forma manual en esta fase. Recibiras una confirmacion por correo."
            : "Die weitere Bearbeitung und der Versand werden in dieser Ausbaustufe manuell koordiniert. Sie erhalten eine Bestaetigung per E-Mail."}
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href={`/${lang}/programm`}
            className="inline-flex border border-[var(--color-text)] px-6 py-3 text-[14px] uppercase tracking-[0.08em] transition-colors hover:bg-[var(--color-text)] hover:text-[var(--color-background)]"
          >
            {isEs ? "Volver al programa" : "Zurueck zum Programm"}
          </Link>
          <Link
            href={`/${lang}/kontakt`}
            className="inline-flex border border-[var(--color-border)] px-6 py-3 text-[14px] uppercase tracking-[0.08em] text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-text)] hover:text-[var(--color-text)]"
          >
            {isEs ? "Contacto" : "Kontakt"}
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
