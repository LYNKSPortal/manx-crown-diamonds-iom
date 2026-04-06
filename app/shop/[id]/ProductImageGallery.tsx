'use client';

import { useState } from 'react';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0] || '/images/image-coming-soon.jpg');

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="rounded-2xl aspect-square overflow-hidden shadow-2xl">
        <img
          src={selectedImage}
          alt={productName}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(image)}
              className={`rounded-lg overflow-hidden border-2 transition-colors aspect-square ${
                selectedImage === image
                  ? 'border-dark-purple'
                  : 'border-gray-200 hover:border-dark-purple'
              }`}
            >
              <img
                src={image}
                alt={`${productName} view ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
