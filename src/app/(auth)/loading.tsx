export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-10">

      <div className="w-full lg:max-w-2xl mx-auto animate-pulse">

       
        <div className="text-center mb-8 space-y-3">
          <div className="h-7 w-56 rounded-full bg-zinc-200 dark:bg-zinc-800 mx-auto" />
          <div className="h-4 w-32 rounded-full bg-zinc-200 dark:bg-zinc-800 mx-auto" />
        </div>

        
        <div className="space-y-6 p-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 w-20 rounded-full bg-zinc-200 dark:bg-zinc-700" />
              <div className="h-10 w-full rounded-lg bg-zinc-100 dark:bg-zinc-800" />
            </div>
          ))}
          <div className="h-11 w-full rounded-lg bg-violet-200 dark:bg-violet-900/50 mt-4" />
        </div>

      </div>

    </div>
  );
}