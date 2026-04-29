export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-10">
      {/* Skeleton navbar breadcrumb */}
      <div className="h-4 w-48 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse mb-8" />

      {/* Skeleton grid — product cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-[#151c28] overflow-hidden animate-pulse"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="h-44 bg-zinc-100 dark:bg-zinc-800" />

            <div className="p-3 space-y-2">
              <div className="h-3 w-16 rounded-full bg-violet-100 dark:bg-violet-900/30" />

              <div className="h-4 w-full rounded-full bg-zinc-200 dark:bg-zinc-700" />
              <div className="h-4 w-3/4 rounded-full bg-zinc-200 dark:bg-zinc-700" />

              <div className="h-5 w-1/3 rounded-full bg-violet-200 dark:bg-violet-800/50 mt-1" />

              <div className="h-9 w-full rounded-lg bg-zinc-200 dark:bg-zinc-700 mt-2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
