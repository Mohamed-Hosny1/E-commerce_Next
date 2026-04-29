export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center gap-6">

      {/* Spinner */}
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-violet-200 dark:border-violet-900/40" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-violet-600 dark:border-t-violet-400 animate-spin" />
        <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-indigo-400 dark:border-t-indigo-300 animate-spin [animation-duration:600ms]" />
      </div>

      {/* dots*/}
      <div className="flex gap-2">
        <span className="w-2 h-2 rounded-full bg-violet-500 dark:bg-violet-400 animate-bounce [animation-delay:0ms]" />
        <span className="w-2 h-2 rounded-full bg-violet-500 dark:bg-violet-400 animate-bounce [animation-delay:150ms]" />
        <span className="w-2 h-2 rounded-full bg-violet-500 dark:bg-violet-400 animate-bounce [animation-delay:300ms]" />
      </div>

    </div>
  );
}