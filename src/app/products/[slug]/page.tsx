import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ProductImagePlaceholder } from "@/components/product-image-placeholder";
import { ProductCard } from "@/components/product-card";
import { AnimatedSection } from "@/components/animated-section";
import { getAllProducts, getProductBySlug } from "@/lib/products";
import { discountPercent, formatINR } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return getAllProducts().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.title,
    description: product.tagline,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getAllProducts()
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 3);

  const off = discountPercent(product.mrp, product.offerPrice);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <Link
        href="/products"
        className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-amber-300"
      >
        <ArrowLeft className="size-4" />
        Back to products
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <AnimatedSection>
          <div className="relative aspect-[4/3] w-full max-w-3xs overflow-hidden rounded-2xl border border-white/10 bg-white lg:mx-0 mx-auto">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.title}
                fill
                priority
                className="object-contain p-4"
              />
            ) : (
              <ProductImagePlaceholder
                category={product.category}
                title={product.title}
              />
            )}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <Badge className="border-none bg-amber-400/10 text-amber-300">
            {product.category}
            {product.subcategory ? ` · ${product.subcategory}` : ""}
          </Badge>
          <h1 className="font-heading mt-4 text-3xl font-semibold text-white sm:text-4xl">
            {product.title}
          </h1>
          <p className="mt-3 text-lg text-zinc-400">{product.tagline}</p>
          <div className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-2xl font-semibold text-amber-300">
              {formatINR(product.offerPrice ?? product.mrp)}
            </span>
            {off !== null && (
              <>
                <span className="text-base text-zinc-500 line-through">
                  {formatINR(product.mrp)}
                </span>
                <Badge className="border-none bg-emerald-400/10 text-emerald-400">
                  {off}% off
                </Badge>
              </>
            )}
          </div>
          <p className="mt-1 text-xs text-zinc-500">
            Indicative price. Please enquire at the store for current
            pricing.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              nativeButton={false}
              render={<a href={siteConfig.phoneHref} />}
              size="lg"
              className="rounded-full bg-amber-400 px-8 text-zinc-950 hover:bg-amber-300"
            >
              <Phone className="size-4" />
              Enquire at Store
            </Button>
            <Button
              nativeButton={false}
              render={<Link href="/contact" />}
              size="lg"
              variant="outline"
              className="rounded-full border-white/20 bg-white/5 px-8 text-white hover:bg-white/10"
            >
              Visit Showroom
            </Button>
          </div>

          <Separator className="mt-10 bg-white/10" />

          <h2 className="font-heading mt-8 text-lg font-medium text-white">
            Key Specifications
          </h2>
          <dl className="mt-4 divide-y divide-white/10 rounded-xl border border-white/10">
            {product.specs.map((spec) => (
              <div
                key={spec.label}
                className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
              >
                <dt className="text-sm text-zinc-500">{spec.label}</dt>
                <dd className="text-sm font-medium text-zinc-200 sm:text-right">
                  {spec.value}
                </dd>
              </div>
            ))}
          </dl>
        </AnimatedSection>
      </div>

      <AnimatedSection
        className="prose prose-invert prose-zinc mt-16 max-w-3xl prose-headings:font-heading prose-a:text-amber-300"
        dangerouslySetInnerHTML={{ __html: product.contentHtml }}
      />

      {related.length > 0 && (
        <div className="mt-20">
          <h2 className="font-heading text-2xl font-semibold text-white">
            You may also like
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
