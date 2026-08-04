import { Award, GraduationCap, Wrench, Users } from "lucide-react";
import { AnimatedSection } from "@/components/animated-section";
import { siteConfig } from "@/lib/site";

const services = [
  {
    icon: Award,
    title: "Authorized Nikon Dealer",
    description: `Trusted by Kolkata's photographers since ${siteConfig.founded}, with genuine Nikon products and warranties.`,
  },
  {
    icon: GraduationCap,
    title: "Photography Workshops",
    description:
      "Subsidised, hands-on workshops led by renowned photographers and brand instructors.",
  },
  {
    icon: Wrench,
    title: "Authorized Service Center",
    description:
      "In-house Nikon, Casio and Sony authorized service partnerships for genuine repairs.",
  },
  {
    icon: Users,
    title: "Real Expert Guidance",
    description:
      "No branches, no call centres — just the same experienced team who know their gear.",
  },
];

export function ServicesStrip() {
  return (
    <section className="border-y border-white/10 bg-zinc-900/40 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold tracking-widest text-amber-400 uppercase">
            Why Capital Chowringhee Pvt Ltd
          </span>
          <h2 className="font-heading mt-2 text-3xl font-semibold text-white sm:text-4xl">
            More than a camera counter
          </h2>
        </AnimatedSection>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <AnimatedSection key={service.title} delay={i * 0.08}>
              <div className="flex h-full flex-col gap-4 rounded-2xl border border-white/10 bg-zinc-900/60 p-6">
                <span className="flex size-11 items-center justify-center rounded-xl bg-amber-400/10 text-amber-400">
                  <service.icon className="size-5" strokeWidth={1.75} />
                </span>
                <h3 className="font-heading text-base font-medium text-white">
                  {service.title}
                </h3>
                <p className="text-sm text-zinc-400">{service.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
