import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-zinc-900 px-6">

      {/* 404 number */}
      <h1 className="text-[8rem] sm:text-[12rem] font-black leading-none text-zinc-100 dark:text-zinc-800 select-none">
        404
      </h1>

      {/* Message */}
      <div className="text-center -mt-4 flex flex-col gap-3">
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white">
          Page not found
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-xs leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
      </div>

      {/* Back home button */}
      <Link
        href="/"
        className="mt-8 px-6 py-2.5 rounded bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-medium hover:opacity-80 transition-opacity"
      >
        Back to home
      </Link>
    </div>
  );
}