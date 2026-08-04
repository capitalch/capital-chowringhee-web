"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { navLinks, siteConfig } from "@/lib/site";

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/80 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/60">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-white">
          <span className="flex size-8 items-center justify-center rounded-full bg-amber-400 text-zinc-950">
            <Camera className="size-4" strokeWidth={2.5} />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-wide">
              {siteConfig.shortName}
            </span>
            <span className="text-[10px] uppercase tracking-widest text-amber-400/90">
              Nikon Experience Zone
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-white/10 text-white"
                    : "text-zinc-300 hover:bg-white/5 hover:text-white",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button
            nativeButton={false}
            render={<a href={siteConfig.phoneHref} />}
            className="rounded-full bg-amber-400 text-zinc-950 hover:bg-amber-300"
          >
            <Phone className="size-4" />
            Call Store
          </Button>
        </div>

        <Sheet>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="text-white md:hidden"
                aria-label="Open menu"
              />
            }
          >
            <Menu className="size-5" />
          </SheetTrigger>
          <SheetContent
            side="right"
            className="border-white/10 bg-zinc-950 text-white"
          >
            <SheetHeader>
              <SheetTitle className="text-white">
                {siteConfig.shortName}
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-2.5 text-base font-medium text-zinc-200 hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={siteConfig.phoneHref}
                className="mt-2 flex items-center justify-center gap-2 rounded-full bg-amber-400 px-4 py-2.5 text-sm font-semibold text-zinc-950"
              >
                <Phone className="size-4" />
                Call Store
              </a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
