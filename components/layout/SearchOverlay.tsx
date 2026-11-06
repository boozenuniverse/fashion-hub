"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Clock, Search, X } from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Img } from "@/components/ui/Img";
import { useDialog } from "@/hooks/useDialog";
import { usePersistentState } from "@/hooks/useLocalStorage";
import { useUI } from "@/context/UIContext";
import { formatPrice } from "@/lib/currency";
import { addRecentSearch, removeRecentSearch } from "@/lib/recent-searches";
import { searchProducts } from "@/lib/search";
import { getCategoryById } from "@/lib/categories";
import { isStringArray } from "@/lib/wishlist";

const popular = ["Dress", "Lace front wig", "Watch", "Lipstick", "Heels", "Ankara", "Handbag", "Kaftan"];

function Panel({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [recent, setRecent] = usePersistentState<string[]>("recent-searches", [], isStringArray);
  const ref = useDialog(true, onClose);
  const results = useMemo(() => (query.trim() ? searchProducts(query, undefined, 6) : []), [query]);

  function go(q = query) {
    const term = q.trim();
    if (!term) return;
    setRecent((r) => addRecentSearch(r, term));
    onClose();
    router.push(`/search/?q=${encodeURIComponent(term)}`);
  }
  function submit(e: FormEvent) { e.preventDefault(); go(); }
  const chip = "min-h-[44px] rounded-full border border-line bg-paper px-4 text-[14px] text-ink hover:border-burgundy";

  return (
    <motion.div ref={ref} role="dialog" aria-modal="true" aria-label="Search" tabIndex={-1} className="absolute inset-x-0 top-0 flex max-h-[100dvh] flex-col overflow-hidden bg-cream shadow-2xl md:max-h-[92vh]"
      initial={{ y: -24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -16, opacity: 0 }} transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}>
      <form onSubmit={submit} role="search" className="container-x flex shrink-0 items-center gap-2 border-b border-line py-2">
        <Search aria-hidden="true" className="h-5 w-5 shrink-0 text-burgundy" strokeWidth={1.6} />
        <label htmlFor="site-search" className="sr-only">Search products</label>
        {/* 16px text prevents iOS from zooming the page when the field is focused */}
        <input id="site-search" type="search" enterKeyHint="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search dresses, wigs, watches..." autoComplete="off" className="min-h-[48px] w-full bg-transparent font-sans text-[16px] text-ink placeholder:text-muted focus:outline-none" />
        <button type="button" onClick={onClose} aria-label="Close search" className="-mr-3 grid h-11 w-11 shrink-0 place-items-center text-ink hover:text-burgundy"><X aria-hidden="true" className="h-5 w-5" /></button>
      </form>

      <div className="container-x flex-1 overflow-y-auto overscroll-contain pb-6">
        {query.trim() === "" ? (
          <div className="space-y-7 pt-5">
            {recent.length > 0 && (
              <section aria-labelledby="recent-title">
                <div className="mb-2 flex items-center justify-between">
                  <h2 id="recent-title" className="font-ui! text-[13px]! font-semibold! uppercase tracking-[0.14em] text-muted">Recent searches</h2>
                  <button type="button" onClick={() => setRecent([])} className="min-h-[44px] px-2 text-[13px] text-burgundy underline">Clear all</button>
                </div>
                <ul>
                  {recent.map((r) => (
                    <li key={r} className="flex items-center border-b border-line/70">
                      <button type="button" onClick={() => go(r)} className="flex min-h-[48px] flex-1 items-center gap-3 text-left text-[15px] text-ink"><Clock aria-hidden="true" className="h-4 w-4 shrink-0 text-taupe" />{r}</button>
                      <button type="button" onClick={() => setRecent((l) => removeRecentSearch(l, r))} aria-label={`Remove ${r} from recent searches`} className="grid h-11 w-11 place-items-center text-muted hover:text-burgundy"><X aria-hidden="true" className="h-4 w-4" /></button>
                    </li>
                  ))}
                </ul>
              </section>
            )}
            <section aria-labelledby="popular-title">
              <h2 id="popular-title" className="mb-3 font-ui! text-[13px]! font-semibold! uppercase tracking-[0.14em] text-muted">Popular searches</h2>
              <ul className="flex flex-wrap gap-2">{popular.map((s) => <li key={s}><button type="button" onClick={() => go(s)} className={chip}>{s}</button></li>)}</ul>
            </section>
          </div>
        ) : results.length === 0 ? (
          <p className="py-10 text-muted" role="status">No products match &ldquo;{query.trim()}&rdquo;. Try a different word, such as a category or colour.</p>
        ) : (
          <div className="pt-3" role="status" aria-live="polite">
            <p className="sr-only">{results.length} suggestions</p>
            <ul className="grid gap-x-8 md:grid-cols-2">
              {results.map((p) => (
                <li key={p.id}>
                  <Link href={`/products/${p.slug}/`} onClick={() => { setRecent((r) => addRecentSearch(r, query)); onClose(); }} className="flex min-h-[72px] items-center gap-3 border-b border-line/70 py-2">
                    <span className="relative block h-[60px] w-[52px] shrink-0 overflow-hidden rounded-[6px] bg-sand-light"><Img src={p.images[0].src} alt="" className="absolute inset-0 h-full w-full object-cover object-[50%_25%]" /></span>
                    <span className="min-w-0"><span className="block truncate text-[14.5px] text-ink">{p.name}</span><span className="block text-[12.5px] text-muted">{getCategoryById(p.categoryId)?.name}</span><span className="block text-[14px] font-semibold text-burgundy">{formatPrice(p.price)}</span></span>
                  </Link>
                </li>
              ))}
            </ul>
            <button type="button" onClick={() => go()} className="btn btn-primary mt-5 w-full sm:w-auto">See all results</button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function SearchOverlay() {
  const { searchOpen, closeSearch } = useUI();
  return (
    <AnimatePresence>
      {searchOpen && (
        <div key="search" className="fixed inset-0 z-[75]">
          <motion.div className="absolute inset-0 bg-ink/55" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeSearch} aria-hidden="true" />
          <Panel onClose={closeSearch} />
        </div>
      )}
    </AnimatePresence>
  );
}
