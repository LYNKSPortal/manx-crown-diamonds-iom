'use client';

import { useState, useEffect } from 'react';
import { ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0] || '/images/image-coming-soon.jpg');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
      } else if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, lightboxIndex]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isLightboxOpen]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const goToNext = () => {
    setLightboxIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrevious = () => {
    setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const currentImageIndex = images.indexOf(selectedImage);

  return (
    <>
      <div className="space-y-4">
        {/* Main Image */}
        <div className="relative rounded-2xl aspect-square overflow-hidden shadow-2xl group">
          <img
            src={selectedImage}
            alt={productName}
            className="w-full h-full object-cover"
          />
          {/* Magnifying Glass Icon */}
          <button
            onClick={() => openLightbox(currentImageIndex >= 0 ? currentImageIndex : 0)}
            className="absolute top-4 right-4 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
            aria-label="View fullscreen"
          >
            <ZoomIn className="w-6 h-6 text-dark-purple" />
          </button>
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

      {/* Fullscreen Lightbox */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors z-10"
            aria-label="Close"
          >
            <X className="w-8 h-8 text-white" />
          </button>

          {/* Image Counter */}
          <div className="absolute top-4 left-4 bg-white/10 px-4 py-2 rounded-full text-white font-semibold z-10">
            {lightboxIndex + 1} / {images.length}
          </div>

          {/* Previous Button */}
          {images.length > 1 && (
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-8 h-8 text-white" />
            </button>
          )}

          {/* Main Image */}
          <div className="relative w-full h-full flex items-center justify-center p-4 md:p-12">
            <img
              src={images[lightboxIndex]}
              alt={`${productName} view ${lightboxIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {/* Next Button */}
          {images.length > 1 && (
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors z-10"
              aria-label="Next image"
            >
              <ChevronRight className="w-8 h-8 text-white" />
            </button>
          )}

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-white/10 p-3 rounded-full max-w-full overflow-x-auto">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setLightboxIndex(index)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                    lightboxIndex === index
                      ? 'border-white scale-110'
                      : 'border-white/30 hover:border-white/60'
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
          )}
        </div>
      )}
    </>
  );
}
