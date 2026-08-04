import type { Metadata } from "next";
import { MapPin, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/animated-section";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Visit Capital Chowringhee Pvt Ltd at 12 J.L. Nehru Road, Kolkata, or call us to enquire about Nikon cameras, lenses and accessories.",
};

const details = [
  {
    icon: MapPin,
    label: "Address",
    value: siteConfig.address,
  },
  {
    icon: Phone,
    label: "Phone",
    value: siteConfig.phone,
    href: siteConfig.phoneHref,
  },
  {
    icon: Clock,
    label: "Store Hours",
    value: siteConfig.hours,
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <AnimatedSection className="max-w-2xl">
        <span className="text-xs font-semibold tracking-widest text-amber-400 uppercase">
          Contact
        </span>
        <h1 className="font-heading mt-2 text-4xl font-semibold text-white sm:text-5xl">
          Visit the Store
        </h1>
        <p className="mt-4 text-zinc-400">
          We&apos;re a single showroom on J.L. Nehru Road — no branches, no
          call centres. Drop by for a hands-on demo, or call ahead to check
          stock.
        </p>
      </AnimatedSection>

      <div className="mt-14 grid gap-10 lg:grid-cols-2">
        <AnimatedSection>
          <div className="space-y-6">
            {details.map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-amber-400/10 text-amber-400">
                  <item.icon className="size-5" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="text-xs font-medium tracking-wide text-zinc-500 uppercase">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-lg text-white hover:text-amber-300"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-lg text-white">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <Button
            nativeButton={false}
            render={<a href={siteConfig.phoneHref} />}
            size="lg"
            className="mt-10 rounded-full bg-amber-400 px-8 text-zinc-950 hover:bg-amber-300"
          >
            <Phone className="size-4" />
            Call the Store
          </Button>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="aspect-square w-full overflow-hidden rounded-2xl border border-white/10 sm:aspect-[4/3]">
            <iframe
              src={siteConfig.mapEmbedUrl}
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Capital Chowringhee Pvt Ltd location"
            />
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
