import type { Metadata } from "next";
import { AnimatedSection } from "@/components/animated-section";
import { GalleryLightbox } from "@/components/gallery-lightbox";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "A look inside Capital Chowringhee Pvt Ltd's Nikon Experience Zone in Kolkata.",
};

export default function GalleryPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <AnimatedSection className="max-w-2xl">
        <span className="text-xs font-semibold tracking-widest text-amber-400 uppercase">
          Gallery
        </span>
        <h1 className="font-heading mt-2 text-4xl font-semibold text-white sm:text-5xl">
          Inside the Store
        </h1>
        <p className="mt-4 text-zinc-400">
          A glimpse of our showroom, products and workshops. Tap any photo to
          view it larger.
        </p>
      </AnimatedSection>

      <div className="mt-10">
        <GalleryLightbox />
      </div>
    </div>
  );
}
