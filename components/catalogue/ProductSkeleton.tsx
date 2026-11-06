/** Placeholder shown while the catalogue hydrates (keeps layout stable and gives instant feedback). */
export function CatalogueSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div aria-busy="true" aria-label="Loading products" role="status">
      <div className="mb-5 grid grid-cols-2 gap-2.5"><div className="h-11 animate-pulse rounded-[10px] bg-sand-light" /><div className="h-11 animate-pulse rounded-[10px] bg-sand-light" /></div>
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6 xl:grid-cols-4">
        {Array.from({ length: count }).map((_, i) => (
          <li key={i} className="overflow-hidden rounded-[12px] border border-line/60 bg-paper"><div className="aspect-[386/360] animate-pulse bg-sand-light" /><div className="space-y-2 p-3"><div className="h-3.5 w-3/4 animate-pulse rounded bg-sand-light" /><div className="h-4 w-1/3 animate-pulse rounded bg-sand-light" /><div className="h-11 animate-pulse rounded-[8px] bg-sand-light" /></div></li>
        ))}
      </ul>
    </div>
  );
}
