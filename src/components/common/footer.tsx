const columns = [
  {
    title: "Shop",
    items: ["Electronics", "Fashion", "Home & Garden", "Sports", "Deals"],
  },
  {
    title: "Customer Service",
    items: ["Contact Us", "Help Center", "Track Your Order", "Returns & Exchanges", "Size Guide"],
  },
  {
    title: "About",
    items: ["About ShopMart", "Careers", "Press", "Investor Relations", "Sustainability"],
  },
  {
    title: "Policies",
    items: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Shipping Policy", "Refund Policy"],
  },
];

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-700 mt-15 ">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

        {/* Brand */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 flex items-center justify-center rounded bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold text-sm">
              S
            </span>
            <span className="font-semibold text-zinc-900 dark:text-white">ShopMart</span>
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Your one-stop destination for technology, fashion, and lifestyle products.
          </p>
          <div className="flex flex-col gap-2 text-sm text-zinc-500 dark:text-zinc-400">
            <span>123 Shop Street, October City, DC 12345</span>
            <span>(+20) 01093333333</span>
            <span>support@shopmart.com</span>
          </div>
        </div>

        {/* Columns */}
        {columns.map((col) => (
          <div key={col.title} className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-900 dark:text-white">
              {col.title}
            </h3>
            <ul className="flex flex-col gap-2">
              {col.items.map((item) => (
                <li key={item} className="text-sm text-zinc-500 dark:text-zinc-400">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-zinc-200 dark:border-zinc-700">
        <div className="max-w-6xl mx-auto px-6 py-4 text-sm text-zinc-400 dark:text-zinc-500 text-center">
          © {new Date().getFullYear()} ShopMart. All rights reserved.
        </div>
      </div>
    </footer>
  );
}