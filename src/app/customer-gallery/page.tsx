import type { Metadata } from "next";
import { AnimatedSection } from "@/components/animated-section";
import { CustomerGalleryLightbox } from "@/components/customer-gallery-lightbox";

export const metadata: Metadata = {
  title: "Customer Gallery",
  description:
    "Meet some of the customers who've picked up their Nikon gear at Capital Chowringhee Pvt Ltd's Nikon Experience Zone in Kolkata.",
};

export default function CustomerGalleryPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <AnimatedSection className="max-w-2xl">
        <span className="text-xs font-semibold tracking-widest text-amber-400 uppercase">
          Customer Gallery
        </span>
        <h1 className="font-heading mt-2 text-4xl font-semibold text-white sm:text-5xl">
          Our Customers
        </h1>
        <p className="mt-4 text-zinc-400">
          Since 1991, Capital Chowringhee Pvt Ltd has helped thousands of
          photographers in Kolkata find the right camera. Here are some of
          the customers we&apos;ve had the pleasure of serving at the Nikon
          Experience Zone — tap any photo to view it larger.
        </p>
      </AnimatedSection>

      <div className="mt-10">
        <CustomerGalleryLightbox />
      </div>
    </div>
  );
}
