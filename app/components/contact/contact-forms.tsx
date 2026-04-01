"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import {
  submitContactForm,
  subscribeNewsletter,
  type FormActionState,
} from "@/app/[lang]/kontakt/actions";

type ContactFormLabels = {
  title: string;
  fields: {
    name: string;
    email: string;
    message: string;
  };
  submitLabel: string;
  sendingLabel: string;
  successMessage: string;
  errorMessage: string;
};

type NewsletterFormLabels = {
  title: string;
  text: string;
  fieldLabel: string;
  submitLabel: string;
  sendingLabel: string;
  successMessage: string;
  errorMessage: string;
};

type ContactFormsProps = {
  lang: string;
  contactForm: ContactFormLabels;
  newsletterForm: NewsletterFormLabels;
};

const initialState: FormActionState = {
  status: "idle",
};

function SubmitButton({
  idleLabel,
  pendingLabel,
}: {
  idleLabel: string;
  pendingLabel: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex border border-[var(--color-text)] px-6 py-3 text-[14px] uppercase tracking-[0.08em] transition-colors hover:bg-[var(--color-text)] hover:text-[var(--color-background)] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? pendingLabel : idleLabel}
    </button>
  );
}

function FormMessage({
  state,
  successMessage,
  errorFallback,
}: {
  state: FormActionState;
  successMessage: string;
  errorFallback: string;
}) {
  if (state.status === "success") {
    return (
      <p className="text-[15px] leading-[1.7] text-[var(--color-text)]">
        {state.message ?? successMessage}
      </p>
    );
  }

  if (state.status === "error") {
    return (
      <p className="text-[15px] leading-[1.7] text-[var(--color-text-secondary)]">
        {state.message ?? errorFallback}
      </p>
    );
  }

  return null;
}

export function ContactForms({
  lang,
  contactForm,
  newsletterForm,
}: ContactFormsProps) {
  const [contactState, contactAction] = useActionState(
    submitContactForm,
    initialState,
  );
  const [newsletterState, newsletterAction] = useActionState(
    subscribeNewsletter,
    initialState,
  );

  return (
    <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr]">
      <section>
        <h2
          className="mb-8 text-[34px] leading-[1.1] md:text-[40px]"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {contactForm.title}
        </h2>

        <form action={contactAction} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-[13px] uppercase tracking-[0.08em] text-[var(--color-text-secondary)]"
            >
              {contactForm.fields.name}
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
              {contactForm.fields.email}
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
              {contactForm.fields.message}
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={7}
              className="w-full resize-none border border-[var(--color-border)] bg-transparent px-4 py-3 text-[16px] outline-none transition-colors focus:border-[var(--color-text)]"
            />
          </div>

          <div className="flex flex-col items-start gap-4">
            <SubmitButton
              idleLabel={contactForm.submitLabel}
              pendingLabel={contactForm.sendingLabel}
            />
            <FormMessage
              state={contactState}
              successMessage={contactForm.successMessage}
              errorFallback={contactForm.errorMessage}
            />
          </div>
        </form>
      </section>

      <section>
        <h2
          className="mb-8 text-[34px] leading-[1.1] md:text-[40px]"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {newsletterForm.title}
        </h2>

        <p className="mb-6 text-[17px] leading-[1.75] text-[var(--color-text-secondary)]">
          {newsletterForm.text}
        </p>

        <form action={newsletterAction} className="space-y-6">
          <input type="hidden" name="language" value={lang} />

          <div>
            <label
              htmlFor="newsletter-email"
              className="mb-2 block text-[13px] uppercase tracking-[0.08em] text-[var(--color-text-secondary)]"
            >
              {newsletterForm.fieldLabel}
            </label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              required
              className="w-full border border-[var(--color-border)] bg-transparent px-4 py-3 text-[16px] outline-none transition-colors focus:border-[var(--color-text)]"
            />
          </div>

          <div className="flex flex-col items-start gap-4">
            <SubmitButton
              idleLabel={newsletterForm.submitLabel}
              pendingLabel={newsletterForm.sendingLabel}
            />
            <FormMessage
              state={newsletterState}
              successMessage={newsletterForm.successMessage}
              errorFallback={newsletterForm.errorMessage}
            />
          </div>
        </form>
      </section>
    </div>
  );
}
