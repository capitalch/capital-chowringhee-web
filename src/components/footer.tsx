import Link from "next/link";
import { MapPin, Phone, Clock, Camera } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-zinc-950 text-zinc-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 text-white">
            <span className="flex size-8 items-center justify-center rounded-full bg-amber-400 text-zinc-950">
              <Camera className="size-4" strokeWidth={2.5} />
            </span>
            <span className="text-sm font-semibold tracking-wide">
              {siteConfig.shortName}
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-zinc-400">
            Authorized Nikon dealer in the heart of Kolkata since{" "}
            {siteConfig.founded}. Cameras, lenses and accessories, backed by
            real photographic expertise.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Quick Links</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-zinc-400 transition-colors hover:text-amber-400"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Visit the Store</h3>
          <ul className="mt-4 space-y-3 text-sm text-zinc-400">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-amber-400" />
              <span>{siteConfig.address}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="size-4 shrink-0 text-amber-400" />
              <a href={siteConfig.phoneHref} className="hover:text-amber-400">
                {siteConfig.phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Clock className="size-4 shrink-0 text-amber-400" />
              <span>{siteConfig.hours}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-xs text-zinc-500">
        <p>
          Prices shown on this site are indicative only and subject to
          change. Please contact the store for current pricing before
          purchase.
        </p>
        <p className="mt-2">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          Nikon and NIKKOR are registered trademarks of Nikon Corporation.
        </p>
      </div>
    </footer>
  );
}
