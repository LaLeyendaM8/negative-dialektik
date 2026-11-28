import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "../../components/shared/page-hero";
import { PageShell } from "../../components/shared/page-shell";
import { formatBlogDate, getBlog, getBlogAlternates, getPublishedArticles } from "@/lib/blog";
import { isSupportedLanguage } from "@/lib/site";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isSupportedLanguage(lang)) notFound();
  const blog = getBlog(lang);
  return {
    title: blog.title,
    description: blog.description,
    alternates: getBlogAlternates(lang),
    robots: { index: getPublishedArticles(lang).length > 0, follow: true },
  };
}

export default async function BlogPage({ params }: Props) {
  const { lang } = await params;
  if (!isSupportedLanguage(lang)) notFound();
  const blog = getBlog(lang);
  const articles = getPublishedArticles(lang);

  return (
    <PageShell>
      <PageHero title={blog.title} lead={blog.description} />
      {articles.length === 0 ? <p>{blog.empty}</p> : (
        <ul className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
          {articles.map((article) => (
            <li key={article.slug} className="py-8">
              <time dateTime={article.date} className="text-sm text-[var(--color-text-secondary)]">
                {formatBlogDate(article.date, lang)}
              </time>
              <h2 className="mt-2 text-3xl" style={{ fontFamily: "var(--font-serif)" }}>
                <Link className="hover:underline" href={`/${lang}/blog/${article.slug}`}>{article.title}</Link>
              </h2>
              <p className="mt-2">{article.description}</p>
            </li>
          ))}
        </ul>
      )}
    </PageShell>
  );
}
