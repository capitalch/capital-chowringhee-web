import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/animated-section";
import { siteConfig } from "@/lib/site";

export function ContactCta() {
  return (
    <section className="bg-zinc-950 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <AnimatedSection className="relative overflow-hidden rounded-3xl border border-amber-400/20 bg-gradient-to-br from-zinc-900 via-zinc-900 to-amber-950/30 px-6 py-14 text-center sm:px-16">
          <h2 className="font-heading text-3xl font-semibold text-white sm:text-4xl">
            Come see it in person
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-zinc-400">
            Hold the Z9, try the Zf&apos;s dials, compare NIKKOR lenses side
            by side. Visit our showroom at 12 J.L. Nehru Road, Kolkata.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              nativeButton={false}
              render={<a href={siteConfig.phoneHref} />}
              size="lg"
              className="rounded-full bg-amber-400 px-8 text-zinc-950 hover:bg-amber-300"
            >
              <Phone className="size-4" />
              {siteConfig.phone}
            </Button>
            <Button
              nativeButton={false}
              render={<Link href="/contact" />}
              size="lg"
              variant="outline"
              className="rounded-full border-white/20 bg-white/5 px-8 text-white hover:bg-white/10"
            >
              <MapPin className="size-4" />
              Get Directions
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
