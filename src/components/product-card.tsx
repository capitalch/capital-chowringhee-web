import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ProductImagePlaceholder } from "@/components/product-image-placeholder";
import type { Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/60 transition-colors hover:border-amber-400/40"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-white">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-12 transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <ProductImagePlaceholder
            category={product.category}
            title={product.title}
            className="transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <Badge className="absolute top-3 left-3 border-none bg-zinc-950/80 text-amber-300">
          {product.category}
        </Badge>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="font-heading text-lg font-medium text-white">
          {product.title}
        </h3>
        <p className="line-clamp-2 flex-1 text-sm text-zinc-400">
          {product.tagline}
        </p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-sm font-semibold text-amber-300">
            {product.price}
          </span>
          <span className="flex items-center gap-1 text-xs font-medium text-zinc-400 group-hover:text-amber-300">
            View details
            <ArrowUpRight className="size-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
