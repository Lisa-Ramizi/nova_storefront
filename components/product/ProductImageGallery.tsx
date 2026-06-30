"use client";

import Image from "next/image";
import { useState } from "react";

type ProductImageGalleryProps = {
  images: string[];
  alt: string;
};

function ImagePlaceholderIcon() {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className="text-[#d1d5db]"
    >
      <rect x="6" y="10" width="36" height="28" rx="3" stroke="currentColor" strokeWidth="2" />
      <circle cx="16" cy="20" r="3" stroke="currentColor" strokeWidth="2" />
      <path
        d="M10 34l10-10 6 6 4-4 8 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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
          <div className="flex h-full w-full items-center justify-center">
            <ImagePlaceholderIcon />
          </div>
        )}
      </div>

      {galleryImages.length > 1 ? (
        <ul className="flex gap-3 overflow-x-auto pb-1">
          {galleryImages.map((image, index) => (
            <li key={image}>
              <button
                type="button"
                onClick={() => setSelectedIndex(index)}
                className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border bg-[#f3f4f6] ${
                  selectedIndex === index ? "border-primary" : "border-border"
                }`}
                aria-label={`View image ${index + 1}`}
                aria-current={selectedIndex === index}
              >
                <Image
                  src={image}
                  alt=""
                  fill
                  unoptimized
                  className="object-contain p-2"
                  sizes="80px"
                />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
