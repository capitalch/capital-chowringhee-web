import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/animated-section";
import { siteConfig } from "@/lib/site";

export function AboutTeaser() {
  return (
    <section className="bg-zinc-950 py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <AnimatedSection>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative col-span-2 aspect-video overflow-hidden rounded-2xl">
              <Image
                src="/images/gallery/gallery-1.jpeg"
                alt="Capital Chowringhee Pvt Ltd store interior"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-2xl">
              <Image
                src="/images/gallery/gallery-4.jpeg"
                alt="Capital Chowringhee Pvt Ltd product display"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-2xl">
              <Image
                src="/images/gallery/gallery-6.jpeg"
                alt="Capital Chowringhee Pvt Ltd showroom"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <span className="text-xs font-semibold tracking-widest text-amber-400 uppercase">
            Since {siteConfig.founded}
          </span>
          <h2 className="font-heading mt-2 text-3xl font-semibold text-white sm:text-4xl">
            A Kolkata institution for photographers
          </h2>
          <p className="mt-5 text-zinc-400">
            Capital Chowringhee Pvt Ltd has been retailing electronics from the heart
            of Kolkata at 12 J.L. Nehru Road since {siteConfig.founded} —
            evolving from optical film cameras to today&apos;s most advanced
            Nikon mirrorless bodies, lenses and accessories.
          </p>
          <p className="mt-4 text-zinc-400">
            No branches, no call centres — just genuine expertise, hands-on
            demos, and a team that has spent decades helping Kolkata&apos;s
            photographers choose the right gear.
          </p>
          <Button
            nativeButton={false}
            render={<Link href="/about" />}
            variant="outline"
            className="mt-8 rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10"
          >
            Our Story
            <ArrowRight className="size-4" />
          </Button>
        </AnimatedSection>
      </div>
    </section>
  );
}
