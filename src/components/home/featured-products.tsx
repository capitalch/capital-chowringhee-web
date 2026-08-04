"use client";

import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { AnimatedSection } from "@/components/animated-section";
import type { Product } from "@/lib/products";

export function FeaturedProducts({ products }: { products: Product[] }) {
  return (
    <section className="bg-zinc-950 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <AnimatedSection className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-semibold tracking-widest text-amber-400 uppercase">
              Featured
            </span>
            <h2 className="font-heading mt-2 text-3xl font-semibold text-white sm:text-4xl">
              Latest Nikon Releases
            </h2>
            <p className="mt-2 text-xs text-zinc-500">
              Prices shown are indicative. Please enquire at the store for
              current pricing.
            </p>
          </div>
          <Button
            nativeButton={false}
            render={<Link href="/products" />}
            variant="ghost"
            className="text-amber-300 hover:bg-white/5 hover:text-amber-200"
          >
            View all products
            <ArrowRight className="size-4" />
          </Button>
        </AnimatedSection>

        <AnimatedSection delay={0.1} className="mt-10">
          <Carousel
            opts={{ align: "start", loop: true }}
            plugins={[Autoplay({ delay: 4000, stopOnInteraction: true })]}
            className="w-full"
          >
            <CarouselContent>
              {products.map((product) => (
                <CarouselItem
                  key={product.slug}
                  className="sm:basis-1/2 lg:basis-1/3"
                >
                  <ProductCard product={product} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="border-white/20 bg-zinc-900 text-white hover:bg-zinc-800" />
            <CarouselNext className="border-white/20 bg-zinc-900 text-white hover:bg-zinc-800" />
          </Carousel>
        </AnimatedSection>
      </div>
    </section>
  );
}
