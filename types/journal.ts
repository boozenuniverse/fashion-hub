export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] };

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  /** ISO date. */
  date: string;
  author: string;
  image: string;
  imageAlt: string;
  blocks: ArticleBlock[];
  relatedProductSlugs: string[];
}
