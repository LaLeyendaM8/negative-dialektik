import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "../../../components/shared/page-hero";
import { PageShell } from "../../../components/shared/page-shell";
import { RichText } from "../../../components/shared/rich-text";
import { formatBlogDate, getBlog, getBlogAlternates, getBlogLanguages, getPublishedArticles } from "@/lib/blog";
import { absoluteUrl, isSupportedLanguage, supportedLanguages } from "@/lib/site";

type Props = { params: Promise<{ lang: string; slug: string }> };

export function generateStaticParams() {
  return supportedLanguages.flatMap((lang) =>
    getPublishedArticles(lang).map(({ slug }) => ({ lang, slug })),
  );
}

async function getArticle(params: Props["params"]) {
  const { lang, slug } = await params;
  if (!isSupportedLanguage(lang)) notFound();
  const article = getPublishedArticles(lang).find((entry) => entry.slug === slug);
  if (!article) notFound();
  return { lang, article };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, article } = await getArticle(params);
  return {
    title: article.title,
    description: article.description,
    alternates: getBlogAlternates(lang, article.slug),
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      url: absoluteUrl(`/${lang}/blog/${article.slug}`),
      publishedTime: article.date,
      authors: [article.author],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { lang, article } = await getArticle(params);
  const other = lang === "de" ? "es" : "de";
  const hasTranslation = getBlogLanguages(article.slug).includes(other);
  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    inLanguage: lang,
    url: absoluteUrl(`/${lang}/blog/${article.slug}`),
    author: { "@type": "Person", name: article.author },
  };

  return (
    <PageShell>
      <article>
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify(data).replace(/</g, "\\u003c"),
        }} />
        <PageHero title={article.title} lead={article.description} />
        <p className="mb-8 text-sm text-[var(--color-text-secondary)]">
          {article.author} · <time dateTime={article.date}>{formatBlogDate(article.date, lang)}</time>
        </p>
        <RichText>
          {article.sections.map((section, index) => (
            <section key={index}>
              {section.heading && <h2>{section.heading}</h2>}
              {section.paragraphs.map((paragraph, item) => <p key={item}>{paragraph}</p>)}
            </section>
          ))}
        </RichText>
        <div className="mt-10 flex flex-wrap gap-5">
          <Link className="underline" href={`/${lang}/blog`}>{getBlog(lang).back}</Link>
          {hasTranslation && (
            <Link className="underline" href={`/${other}/blog/${article.slug}`} hrefLang={other}>
              {other === "de" ? "Deutsch" : "Español"}
            </Link>
          )}
        </div>
      </article>
    </PageShell>
  );
}
