import type { Article } from "@/types/journal";

export function ArticleContent({ blocks }: { blocks: Article["blocks"] }) {
  return (
    <div className="mx-auto max-w-[68ch] space-y-6 text-[17px] leading-[1.8] text-charcoal">
      {blocks.map((b, i) => {
        if (b.type === "h2") return <h2 key={i} className="mt-12! font-serif text-[2.1rem]">{b.text}</h2>;
        if (b.type === "quote") return <blockquote key={i} className="my-10 border-l-2 border-taupe pl-6 font-display text-[1.6rem] leading-snug text-ink">{b.text}</blockquote>;
        if (b.type === "list") return <ul key={i} className="list-disc space-y-2 pl-6 marker:text-taupe">{b.items.map((it) => <li key={it}>{it}</li>)}</ul>;
        return <p key={i}>{b.text}</p>;
      })}
    </div>
  );
}
