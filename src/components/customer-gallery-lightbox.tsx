"use client";

import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const CUSTOMER_PHOTO_COUNT = 101;
const images = Array.from({ length: CUSTOMER_PHOTO_COUNT }, (_, i) => ({
  src: `/images/customers/customer-${i + 1}.jpeg`,
  alt: "Customer at Capital Chowringhee Pvt Ltd, Kolkata",
}));

export function CustomerGalleryLightbox() {
  return (
    <div className="columns-2 gap-4 sm:columns-3 lg:columns-4">
      {images.map((image, i) => (
        <Dialog key={image.src}>
          <DialogTrigger
            render={
              <button
                type="button"
                className="group mb-4 block w-full overflow-hidden rounded-2xl border border-white/10"
                aria-label={`Open photo ${i + 1}`}
              />
            }
          >
            <div
              className="relative w-full"
              style={{ aspectRatio: i % 4 === 1 ? "3/4" : "4/5" }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                loading="lazy"
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </DialogTrigger>
          <DialogContent
            showCloseButton
            className="max-w-[calc(100%-2rem)] border-none bg-transparent p-0 ring-0 sm:max-w-md"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
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
