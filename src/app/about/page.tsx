import type { Metadata } from "next";
import Image from "next/image";
import { Camera, GraduationCap, ShieldCheck, Code2 } from "lucide-react";
import { AnimatedSection } from "@/components/animated-section";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Capital Chowringhee Pvt Ltd has retailed cameras and electronics from 12 J.L. Nehru Road, Kolkata since 1991 — today, Kolkata's Nikon Experience Zone.",
};

const milestones = [
  {
    icon: Camera,
    title: "From film to Z-mount",
    description:
      "What began as a retailer of optical film cameras has grown into a specialist in Nikon's most advanced SLR and mirrorless systems, lenses and accessories.",
  },
  {
    icon: GraduationCap,
    title: "Photography workshops",
    description:
      "We regularly host heavily subsidised workshops led by renowned photographers and brand instructors from Canon, Nikon and Sony, open to the local photography community.",
  },
  {
    icon: ShieldCheck,
    title: "Authorized service partnerships",
    description:
      "Nikon service through Billenium Sales and Service, Casio authorized service for calculators, synthesizers and watches, and a Sony partnership via Nav Technology.",
  },
  {
    icon: Code2,
    title: "Kush Infotech",
    description:
      "Our software development division builds modern web and mobile applications — proof that Capital Chowringhee Pvt Ltd keeps investing in what's next.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <AnimatedSection className="max-w-2xl">
        <span className="text-xs font-semibold tracking-widest text-amber-400 uppercase">
          Since {siteConfig.founded}
        </span>
        <h1 className="font-heading mt-2 text-4xl font-semibold text-white sm:text-5xl">
          Our Story
        </h1>
        <p className="mt-6 text-lg text-zinc-400">
          Capital Chowringhee Pvt Ltd is one of the leading retailers of
          electronics goods in the heart of Kolkata, at 12 J.L. Nehru Road,
          below Peerless Hotel. Founded in {siteConfig.founded}, we operate
          from roughly 1,900
          square feet across the ground and first floors — with no branch
          locations, and no plans to open one.
        </p>
        <p className="mt-4 text-lg text-zinc-400">
          That&apos;s deliberate. Staying a single store means every customer
          gets the same experienced team, genuine hands-on advice, and
          pricing that stays honest — not a call centre reading from a
          script.
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.1} className="relative mt-14 aspect-[21/9] w-full overflow-hidden rounded-2xl">
        <Image
          src="/images/gallery/gallery-1.jpeg"
          alt="Capital Chowringhee Pvt Ltd store"
          fill
          className="object-cover"
          priority
        />
      </AnimatedSection>

      <div className="mt-20 grid gap-6 sm:grid-cols-2">
        {milestones.map((item, i) => (
          <AnimatedSection key={item.title} delay={i * 0.08}>
            <div className="flex h-full gap-4 rounded-2xl border border-white/10 bg-zinc-900/60 p-6">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-amber-400/10 text-amber-400">
                <item.icon className="size-5" strokeWidth={1.75} />
              </span>
              <div>
                <h3 className="font-heading text-base font-medium text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-400">
                  {item.description}
                </p>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>

      <AnimatedSection delay={0.1} className="mt-20 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[3, 4, 5, 6].map((n) => (
          <div
            key={n}
            className="relative aspect-square overflow-hidden rounded-xl"
          >
            <Image
              src={`/images/gallery/gallery-${n}.jpeg`}
              alt="Inside Capital Chowringhee Pvt Ltd"
              fill
              className="object-cover"
            />
          </div>
        ))}
      </AnimatedSection>
    </div>
  );
}
