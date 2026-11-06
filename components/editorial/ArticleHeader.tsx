import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Img } from "@/components/ui/Img";
import { readingMinutes } from "@/data/journal";
import type { Article } from "@/types/journal";
import { formatDate } from "./ArticleCard";

export function ArticleHeader({ article }: { article: Article }) {
  return (
    <header>
      <div className="container-x pt-8">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Journal", href: "/journal/" }, { label: article.title }]} />
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[13px] text-muted">{article.category}</p>
          <h1 className="h-page mt-3">{article.title}</h1>
          <p className="lead mx-auto mt-4">{article.excerpt}</p>
          <p className="mt-5 text-[13px] text-muted">By {article.author} · <time dateTime={article.date}>{formatDate(article.date)}</time> · {readingMinutes(article)} min read</p>
        </div>
      </div>
      <div className="container-x mt-10"><div className="relative mx-auto aspect-[16/9] max-w-5xl overflow-hidden rounded-[3px] bg-sand-light"><Img src={article.image} alt={article.imageAlt} priority className="absolute inset-0 h-full w-full object-cover" /></div></div>
    </header>
  );
}
