"use client"
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();
 
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 flex items-center justify-center px-6 relative overflow-hidden transition-colors duration-300">

      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-violet-100 dark:bg-violet-600/20 rounded-full blur-[120px]" />
      </div>

      {/* Content */}
      <div className="relative text-center max-w-2xl">

        {/* Greeting */}
        <p className="text-zinc-600 text-xl mb-3 tracking-wide dark:text-yellow-200">
          Hi  {session?.user?.name}
        </p>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl font-extrabold text-zinc-900 dark:text-white leading-tight">
          Welcome to{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-600 to-indigo-500 dark:from-violet-400 dark:to-indigo-400">
            ShopMart
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-zinc-500 dark:text-zinc-400 text-base sm:text-lg leading-relaxed">
          Discover the latest technology, fashion, and lifestyle products.
          Quality guaranteed with fast shipping and excellent customer service.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/products">
          <button className="w-full sm:w-auto px-8 py-3 rounded-xl text-sm font-semibold bg-violet-600 hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-600 text-white shadow-md shadow-violet-200 dark:shadow-none transition-colors">
            Shop Now
          </button>
          </Link>
          <Link href="/categories">
          <button className="w-full sm:w-auto px-8 py-3 rounded-xl text-sm font-semibold border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
            Browse Categories
          </button>
          </Link>
        </div>

      </div>
    </div>
  );
}

