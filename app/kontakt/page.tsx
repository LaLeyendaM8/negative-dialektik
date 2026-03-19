import { PageHero } from "../components/shared/page-hero";
import { PageShell } from "../components/shared/page-shell";
import { submitContactForm, subscribeNewsletter } from "./actions";

export default function KontaktPage() {
  return (
    <PageShell>
      <PageHero
        
        title="Kontakt"
        lead="Informationen zu Neuerscheinungen, Veranstaltungen und akademischen Programmen."
      />

      <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <section>
          <h2
            className="mb-8 text-[34px] leading-[1.1] md:text-[40px]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Kontakt aufnehmen
          </h2>

          <form action={submitContactForm} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-[13px] uppercase tracking-[0.08em] text-[var(--color-text-secondary)]"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full border border-[var(--color-border)] bg-transparent px-4 py-3 text-[16px] outline-none transition-colors focus:border-[var(--color-text)]"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-[13px] uppercase tracking-[0.08em] text-[var(--color-text-secondary)]"
              >
                E-Mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full border border-[var(--color-border)] bg-transparent px-4 py-3 text-[16px] outline-none transition-colors focus:border-[var(--color-text)]"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-[13px] uppercase tracking-[0.08em] text-[var(--color-text-secondary)]"
              >
                Nachricht
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={7}
                className="w-full resize-none border border-[var(--color-border)] bg-transparent px-4 py-3 text-[16px] outline-none transition-colors focus:border-[var(--color-text)]"
              />
            </div>

            <button
              type="submit"
              className="inline-flex border border-[var(--color-text)] px-6 py-3 text-[14px] uppercase tracking-[0.08em] transition-colors hover:bg-[var(--color-text)] hover:text-[var(--color-background)]"
            >
              Absenden
            </button>
          </form>
        </section>

        <div className="space-y-16">
          <section>
            <h2
              className="mb-8 text-[34px] leading-[1.1] md:text-[40px]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Newsletter
            </h2>

            <p className="mb-6 text-[17px] leading-[1.75] text-[var(--color-text-secondary)]">
              Informationen zu Neuerscheinungen, Veranstaltungen und akademischen
              Programmen.
            </p>

            <form action={subscribeNewsletter} className="space-y-6">
              <div>
                <label
                  htmlFor="newsletter-email"
                  className="mb-2 block text-[13px] uppercase tracking-[0.08em] text-[var(--color-text-secondary)]"
                >
                  E-Mail
                </label>
                <input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  required
                  className="w-full border border-[var(--color-border)] bg-transparent px-4 py-3 text-[16px] outline-none transition-colors focus:border-[var(--color-text)]"
                />
              </div>

              <button
                type="submit"
                className="inline-flex border border-[var(--color-text)] px-6 py-3 text-[14px] uppercase tracking-[0.08em] transition-colors hover:bg-[var(--color-text)] hover:text-[var(--color-background)]"
              >
                Abonnieren
              </button>
            </form>
          </section>

          <section className="border-t border-[var(--color-border)] pt-10">
            <h2
              className="mb-8 text-[34px] leading-[1.1] md:text-[40px]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Institut
            </h2>

            <div className="space-y-3 text-[17px] leading-[1.75] text-[var(--color-text-secondary)]">
              <p>NEGATIVE DIALEKTIK</p>
              <p>Institut für deutsche Philosophie</p>
              <p>Tunja, Kolumbien</p>
              <p>
                <a
                  href="mailto:info@negative-dialektik.com"
                  className="underline underline-offset-4"
                >
                  info@negative-dialektik.com
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </PageShell>
  );
}