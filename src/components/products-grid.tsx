"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product-card";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/products";

export function ProductsGrid({
  products,
  categories,
}: {
  products: Product[];
  categories: string[];
}) {
  const [active, setActive] = useState("All");

  const filtered = useMemo(() => {
    if (active === "All") return products;
    return products.filter((p) => p.category === active);
  }, [products, active]);

  const tabs = ["All", ...categories];

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              active === tab
                ? "border-amber-400 bg-amber-400 text-zinc-950"
                : "border-white/15 bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white",
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-zinc-500">
          No products found in this category yet.
        </p>
      )}
    </div>
  );
}
