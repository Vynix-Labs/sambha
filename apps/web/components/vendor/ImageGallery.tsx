// components/ImageGallery.tsx
"use client";

import { useState } from "react";

export function ImageGallery({ images }: { images: string[] }) {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="mt-4">
      <div className="h-[450px] bg-gray-200 rounded-lg mb-4 overflow-hidden">
        <img
          src={mainImage}
          alt="Main vendor image"
          className="w-full h-full object-cover text-black"
        />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setMainImage(image)}
            className={`h-24 bg-gray-200 rounded-lg overflow-hidden text-black ${
              mainImage === image ? "ring-2 ring-blue-500" : ""
            }`}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover text-black"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
