"use client";

import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const GALLERY_COUNT = 9;
const images = Array.from({ length: GALLERY_COUNT }, (_, i) => ({
  src: `/images/gallery/gallery-${i + 1}.jpeg`,
  alt: `Capital Chowringhee Pvt Ltd gallery photo ${i + 1}`,
}));

export function GalleryLightbox() {
  return (
    <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
      {images.map((image, i) => (
        <Dialog key={image.src}>
          <DialogTrigger
            render={
              <button
                type="button"
                className="group mb-4 block w-full overflow-hidden rounded-2xl border border-white/10"
                aria-label={`Open ${image.alt}`}
              />
            }
          >
            <div
              className="relative w-full"
              style={{ aspectRatio: i % 3 === 1 ? "3/4" : "4/3" }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </DialogTrigger>
          <DialogContent
            showCloseButton
            className="max-w-[calc(100%-2rem)] border-none bg-transparent p-0 ring-0 sm:max-w-3xl"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-contain bg-zinc-950"
              />
            </div>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}
