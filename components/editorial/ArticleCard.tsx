import Link from "next/link";
import { Img } from "@/components/ui/Img";
import { readingMinutes } from "@/data/journal";
import type { Article } from "@/types/journal";

export const formatDate = (iso: string) => new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export function ArticleCard({ article, large = false }: { article: Article; large?: boolean }) {
  return (
    <article className="group">
      <Link href={`/journal/${article.slug}/`} className="block">
        <div className={`relative overflow-hidden rounded-[3px] bg-sand-light ${large ? "aspect-[16/10]" : "aspect-[16/9]"}`}>
          <Img src={article.image} alt={article.imageAlt} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
        </div>
        <p className="mt-4 text-[13px] text-muted">{article.category} · {formatDate(article.date)} · {readingMinutes(article)} min read</p>
        <h3 className={`mt-1 group-hover:underline ${large ? "text-[2.4rem]!" : "text-[1.7rem]!"}`}>{article.title}</h3>
        <p className="mt-2 max-w-[56ch] text-muted">{article.excerpt}</p>
      </Link>
    </article>
  );
}
