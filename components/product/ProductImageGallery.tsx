"use client";

import Image from "next/image";
import { useState } from "react";
import { ImagePlaceholderIcon } from "@/components/ui/icons";

type ProductImageGalleryProps = {
  images: string[];
  alt: string;
};

export function ProductImageGallery({ images, alt }: ProductImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const galleryImages = images.length > 0 ? images : [];
  const selectedImage = galleryImages[selectedIndex];

  return (
    <div className="space-y-4">
      <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-border bg-[#f3f4f6]">
        {selectedImage ? (
          <Image
            src={selectedImage}
            alt={alt}
            fill
            unoptimized
            className="object-contain p-8"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center" role="img" aria-label="No product image">
            <ImagePlaceholderIcon size={64} />
          </div>
        )}
      </div>

      {galleryImages.length > 1 ? (
        <ul className="flex gap-3 overflow-x-auto pb-1" aria-label="Product image thumbnails">
          {galleryImages.map((image, index) => (
            <li key={`${image}-${index}`}>
              <button
                type="button"
                onClick={() => setSelectedIndex(index)}
                className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border bg-[#f3f4f6] ${
                  selectedIndex === index ? "border-primary" : "border-border"
                }`}
                aria-label={`View image ${index + 1} of ${galleryImages.length}`}
                aria-pressed={selectedIndex === index}
              >
                <Image
                  src={image}
                  alt=""
                  fill
                  unoptimized
                  className="object-contain p-2"
                  sizes="80px"
                  aria-hidden="true"
                />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
