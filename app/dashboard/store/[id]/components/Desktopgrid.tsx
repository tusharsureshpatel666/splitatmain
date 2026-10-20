"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageGalleryDialog } from "./imageGallerydialog";
import { Images, ChevronRight } from "lucide-react";

type DesktopImageGridProps = {
  banner: string;
  images: string[];
};

export function DesktopImageGrid({ banner, images }: DesktopImageGridProps) {
  const allImages = [banner, ...images].filter(Boolean);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const showImage = (imageIndex: number) => {
    setIndex(imageIndex);
    setOpen(true);
  };

  return (
    <>
      <section className="mx-auto w-full">
        {/* Gallery */}
        <div
          className="
          relative isolate
            h-[280px] overflow-hidden rounded-2xl
            bg-zinc-100 dark:bg-zinc-900
            sm:h-[360px]
            md:h-[440px] md:rounded-[24px]
            lg:h-[640px]
          "
        >
          {/* Desktop image collage */}
          <div className="absolute inset-0 hidden grid-cols-4 grid-rows-2 gap-2 md:grid lg:gap-3">
            {/* Main image */}
            <button
              type="button"
              onClick={() => showImage(0)}
              aria-label="View main property photo"
              className="
                group/main relative col-span-2 row-span-2
                overflow-hidden bg-zinc-200 text-left
                dark:bg-zinc-800
              "
            >
              <Image
                src={banner}
                alt="Main commercial property view"
                fill
                priority
                quality={90}
                sizes="(max-width: 1024px) 50vw, 45vw"
                className="
                  object-cover
                  transition-transform duration-700 ease-out
                  group-hover/main:scale-[1.035]
                "
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/5 opacity-60 transition-opacity group-hover/main:opacity-100" />
            </button>

            {/* Four supporting images */}
            {Array.from({ length: 4 }).map((_, i) => {
              const image = images[i];

              if (!image) {
                return (
                  <div
                    key={`empty-${i}`}
                    className="relative overflow-hidden bg-zinc-200 dark:bg-zinc-800"
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Images
                        size={24}
                        className="text-zinc-400 dark:text-zinc-600"
                      />
                    </div>
                  </div>
                );
              }

              return (
                <button
                  key={`${image}-${i}`}
                  type="button"
                  onClick={() => showImage(i + 1)}
                  aria-label={`View property photo ${i + 2}`}
                  className="
                    group/thumb relative overflow-hidden
                    bg-zinc-200 dark:bg-zinc-800
                  "
                >
                  <Image
                    src={image}
                    alt={`Commercial property photo ${i + 2}`}
                    fill
                    quality={85}
                    sizes="(max-width: 1024px) 25vw, 23vw"
                    className="
                      object-cover
                      transition-transform duration-700 ease-out
                      group-hover/thumb:scale-[1.06]
                    "
                  />
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover/thumb:bg-black/10" />
                </button>
              );
            })}
          </div>

          {/* Mobile hero image */}
          <button
            type="button"
            onClick={() => showImage(0)}
            aria-label="View main property photo"
            className="absolute inset-0 block w-full md:hidden"
          >
            <Image
              src={banner}
              alt="Main commercial property view"
              fill
              priority
              quality={90}
              sizes="100vw"
              className="object-cover transition-transform duration-700 group-hover/gallery:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/5" />
          </button>

          {/* Gallery controls */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-3 p-3 sm:p-5 md:p-6">
            {/* Mobile photo counter */}
            <div className="rounded-full border border-white/20 bg-black/35 px-3 py-1.5 text-xs font-medium text-white shadow-sm backdrop-blur-md md:hidden">
              Photo 1 of {allImages.length}
            </div>

            {/* Desktop gallery label */}
            <div className="hidden text-white drop-shadow-sm md:block">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/80">
                Explore the space
              </p>
              <p className="mt-1 text-sm font-medium">
                {allImages.length} {allImages.length === 1 ? "photo" : "photos"}
              </p>
            </div>

            {/* Show all photos */}
            <button
              type="button"
              onClick={() => showImage(0)}
              className="
                pointer-events-auto inline-flex shrink-0
                items-center gap-2 rounded-full
                border border-white/80 bg-white/95
                px-3.5 py-2.5 text-xs font-semibold text-zinc-900
                shadow-lg shadow-black/10
                transition duration-200
                hover:scale-[1.02] hover:bg-white
                active:scale-[0.98]
                sm:px-4 sm:text-sm
              "
            >
              <Images size={16} strokeWidth={2} />
              <span>Show all photos</span>
              <ChevronRight size={15} className="hidden sm:block" />
            </button>
          </div>

          {/* Subtle top accent */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/15 to-transparent md:hidden" />
        </div>

        {/* Small supporting caption */}
        <div className="mt-3 flex items-center justify-between px-0.5">
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Take a closer look at this space
          </p>

          <button
            type="button"
            onClick={() => showImage(0)}
            className="text-xs font-semibold text-violet-600 transition hover:text-violet-500 dark:text-violet-400"
          >
            View gallery
          </button>
        </div>
      </section>

      <ImageGalleryDialog
        open={open}
        onOpenChange={setOpen}
        images={allImages}
        initialIndex={index}
      />
    </>
  );
}
