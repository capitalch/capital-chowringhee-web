"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-zinc-950">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[24rem] w-[24rem] -translate-x-1/2 rounded-full bg-amber-500/20 blur-[120px] sm:h-[36rem] sm:w-[36rem]" />
        <div className="absolute bottom-0 right-0 h-[24rem] w-[24rem] rounded-full bg-sky-500/10 blur-[100px]" />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.05] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:24px_24px]"
        />
      </div>

      <div className="mx-auto flex max-w-6xl flex-col items-center px-4 pt-24 pb-20 text-center sm:px-6 sm:pt-32 sm:pb-28">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-medium tracking-wide text-amber-300 uppercase"
        >
          <Sparkles className="size-3.5" />
          Nikon Experience Zone
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-heading max-w-3xl text-4xl leading-[1.05] font-semibold tracking-tight text-white sm:text-6xl"
        >
          Kolkata&apos;s Home for the
          <span className="block text-amber-400">Nikon Experience</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 max-w-xl text-base text-zinc-400 sm:text-lg"
        >
          Explore the latest Nikon mirrorless cameras, NIKKOR lenses and
          speedlights in person — with hands-on demos, expert advice and
          genuine after-sales service, right on J.L. Nehru Road.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-col gap-3 sm:flex-row"
        >
          <Button
            nativeButton={false}
            render={<Link href="/products" />}
            size="lg"
            className="rounded-full bg-amber-400 px-8 text-zinc-950 hover:bg-amber-300"
          >
            Explore Products
            <ArrowRight className="size-4" />
          </Button>
          <Button
            nativeButton={false}
            render={<Link href="/contact" />}
            size="lg"
            variant="outline"
            className="rounded-full border-white/20 bg-white/5 px-8 text-white hover:bg-white/10"
          >
            <MapPin className="size-4" />
            Visit the Store
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
