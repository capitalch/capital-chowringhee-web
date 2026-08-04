import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/animated-section";

const previewImages = [2, 3, 5, 7, 8, 9];

export function GalleryPreview() {
  return (
    <section className="border-y border-white/10 bg-zinc-900/40 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <AnimatedSection className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-semibold tracking-widest text-amber-400 uppercase">
              Gallery
            </span>
            <h2 className="font-heading mt-2 text-3xl font-semibold text-white sm:text-4xl">
              Inside the store
            </h2>
          </div>
          <Button
            nativeButton={false}
            render={<Link href="/gallery" />}
            variant="ghost"
            className="text-amber-300 hover:bg-white/5 hover:text-amber-200"
          >
            View full gallery
            <ArrowRight className="size-4" />
          </Button>
        </AnimatedSection>

        <AnimatedSection delay={0.1} className="mt-10 columns-2 gap-4 sm:columns-3">
          {previewImages.map((n, i) => (
            <div
              key={n}
              className="relative mb-4 overflow-hidden rounded-2xl"
              style={{ aspectRatio: i % 2 === 0 ? "3/4" : "4/3" }}
            >
              <Image
                src={`/images/gallery/gallery-${n}.jpeg`}
                alt="Capital Chowringhee Pvt Ltd gallery photo"
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
}
