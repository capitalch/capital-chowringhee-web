import type { Metadata } from "next";
import { ProductsGrid } from "@/components/products-grid";
import { AnimatedSection } from "@/components/animated-section";
import { getAllProducts, getCategories } from "@/lib/products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse Nikon mirrorless cameras, NIKKOR lenses, speedlights and accessories available at Capital Chowringhee Pvt Ltd, Kolkata.",
};

export default function ProductsPage() {
  const products = getAllProducts();
  const categories = getCategories();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <AnimatedSection className="max-w-2xl">
        <span className="text-xs font-semibold tracking-widest text-amber-400 uppercase">
          Catalogue
        </span>
        <h1 className="font-heading mt-2 text-4xl font-semibold text-white sm:text-5xl">
          Nikon Products
        </h1>
        <p className="mt-4 text-zinc-400">
          Mirrorless cameras, NIKKOR lenses, speedlights and accessories —
          available for hands-on demo at our Kolkata showroom.
        </p>
        <p className="mt-3 text-sm text-zinc-500">
          Prices shown are indicative. Please enquire at the store for
          current pricing.
        </p>
      </AnimatedSection>

      <div className="mt-10">
        <ProductsGrid products={products} categories={categories} />
      </div>
    </div>
  );
}
