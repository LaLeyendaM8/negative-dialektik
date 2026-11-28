export type BlogArticle = {
  slug: string;
  status: "draft" | "published";
  title: string;
  description: string;
  date: string;
  author: string;
  sections: { heading?: string; paragraphs: string[] }[];
};
