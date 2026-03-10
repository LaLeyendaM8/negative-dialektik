import type { ReactNode } from "react";
import { Container } from "../layout/container";

type PageShellProps = {
  children: ReactNode;
  className?: string;
};

export function PageShell({ children, className = "" }: PageShellProps) {
  return (
    <section className={`py-[96px] md:py-[120px] ${className}`}>
      <Container>
        <div className="mx-auto w-full max-w-[760px]">
          {children}
        </div>
      </Container>
    </section>
  );
}