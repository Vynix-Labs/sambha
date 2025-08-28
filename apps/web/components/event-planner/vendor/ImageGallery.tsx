"use client";

import { useState, useEffect } from "react";
import type { FC } from "react";

interface ImageGalleryProps {
  images: string[];
  mainImageHeight?: string;
  containerWidth?: string;
  thumbnailHeight?: string;
  thumbnailWidth?: string;
  isLoading?: boolean;
  thumbnailCount?: number;
}

export const ImageGallery: FC<ImageGalleryProps> = ({
  images = [],
  mainImageHeight = "aspect-[4/3]",
  containerWidth = "w-full",
  thumbnailHeight = "h-24",
  thumbnailWidth = "w-24",
  isLoading = false,
  thumbnailCount = 4,
}) => {
  const [mainImage, setMainImage] = useState(images[0] ?? "");

  useEffect(() => {
    if (images.length > 0) {
      setMainImage(images[0]!);
    }
  }, [images]);

  if (isLoading) {
    return (
      <div className={`${containerWidth} space-y-4`}>
        {/* Main Image Skeleton */}
        <div
          className={`${mainImageHeight} w-full bg-gray-200 rounded-lg animate-pulse`}
        />

        {/* Thumbnails Skeleton */}
        <div className="flex gap-4 w-full overflow-x-auto py-2">
          {Array.from({ length: thumbnailCount }).map((_, index) => (
            <div
              key={index}
              className={`${thumbnailHeight} ${thumbnailWidth} bg-gray-200 rounded-lg animate-pulse flex-shrink-0`}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`${containerWidth} space-y-4`}>
      {/* Main Image */}
      <div
        className={`${mainImageHeight} w-full bg-gray-200 rounded-lg overflow-hidden`}
      >
        <img
          src={mainImage}
          alt="Main vendor image"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-4 w-full overflow-x-auto p-2 ">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setMainImage(image)}
            className={`${thumbnailHeight} ${thumbnailWidth} bg-gray-200 rounded-lg overflow-hidden flex-shrink-0 transition-all ${
              mainImage === image
                ? "ring-2 ring-blue-500"
                : "hover:ring-1 hover:ring-gray-300"
            }`}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};
