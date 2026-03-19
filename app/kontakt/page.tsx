import { PageHero } from "../components/shared/page-hero";
import { PageShell } from "../components/shared/page-shell";
import { submitContactForm, subscribeNewsletter } from "./actions";
import { kontaktPage } from "../content/pages/kontakt";

export default function KontaktPage() {
  return (
    <PageShell>
      <PageHero
  title={kontaktPage.title}
  lead={kontaktPage.lead}
/>

      <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <section>
          <h2
            className="mb-8 text-[34px] leading-[1.1] md:text-[40px]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
           {kontaktPage.form.title}
          </h2>

          <form action={submitContactForm} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-[13px] uppercase tracking-[0.08em] text-[var(--color-text-secondary)]"
              >
                {kontaktPage.form.fields.name}
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
               {kontaktPage.form.fields.email}
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
             {kontaktPage.form.fields.message}
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
              {kontaktPage.form.submitLabel}
            </button>
          </form>
        </section>

        <div className="space-y-16">
          <section>
            <h2
              className="mb-8 text-[34px] leading-[1.1] md:text-[40px]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
             {kontaktPage.form.submitLabel}
            </h2>

            <p className="mb-6 text-[17px] leading-[1.75] text-[var(--color-text-secondary)]">
              {kontaktPage.newsletter.text}
            </p>

            <form action={subscribeNewsletter} className="space-y-6">
              <div>
                <label
                  htmlFor="newsletter-email"
                  className="mb-2 block text-[13px] uppercase tracking-[0.08em] text-[var(--color-text-secondary)]"
                >
                  {kontaktPage.newsletter.fieldLabel}
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
                {kontaktPage.newsletter.submitLabel}
              </button>
            </form>
          </section>

          <section className="border-t border-[var(--color-border)] pt-10">
            <h2
              className="mb-8 text-[34px] leading-[1.1] md:text-[40px]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
             {kontaktPage.institute.title}
            </h2>

           <div className="space-y-3 text-[17px] leading-[1.75] text-[var(--color-text-secondary)]">
  {kontaktPage.institute.lines.map((line) => (
    <p key={line}>{line}</p>
  ))}
  <p>
    <a
      href={`mailto:${kontaktPage.institute.email}`}
      className="underline underline-offset-4"
    >
      {kontaktPage.institute.email}
    </a>
  </p>
</div>
          </section>
        </div>
      </div>
    </PageShell>
  );
}