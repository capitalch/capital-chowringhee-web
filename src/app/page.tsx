import { Hero } from "@/components/home/hero";
import { FeaturedProducts } from "@/components/home/featured-products";
import { ServicesStrip } from "@/components/home/services-strip";
import { AboutTeaser } from "@/components/home/about-teaser";
import { GalleryPreview } from "@/components/home/gallery-preview";
import { ContactCta } from "@/components/home/contact-cta";
import { getFeaturedProducts } from "@/lib/products";

export default function Home() {
  const featuredProducts = getFeaturedProducts();

  return (
    <>
      <Hero />
      <FeaturedProducts products={featuredProducts} />
      <ServicesStrip />
      <AboutTeaser />
      <GalleryPreview />
      <ContactCta />
    </>
  );
}
