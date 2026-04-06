'use client';

import { useState } from 'react';
import { Upload, X, GripVertical, ChevronUp, ChevronDown } from 'lucide-react';

interface ImageData {
  id: string;
  url: string;
  publicId?: string;
  order: number;
}

interface MultiImageUploadProps {
  images: ImageData[];
  onImagesChange: (images: ImageData[]) => void;
  maxImages?: number;
}

export default function MultiImageUpload({ 
  images, 
  onImagesChange,
  maxImages = 10 
}: MultiImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (images.length + files.length > maxImages) {
      setError(`Maximum ${maxImages} images allowed`);
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        console.log('Processing file:', {
          name: file.name,
          type: file.type,
          size: file.size,
        });

        // Validate file type - accept common image formats including HEIC
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/heic', 'image/heif'];
        const isValidType = file.type.startsWith('image/') || validTypes.includes(file.type.toLowerCase());
        
        if (!isValidType) {
          console.error('Invalid file type:', file.type);
          throw new Error(`Invalid file type: ${file.type}. Please select an image file.`);
        }

        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
          console.error('File too large:', file.size);
          throw new Error(`File size is ${(file.size / 1024 / 1024).toFixed(2)}MB. Maximum is 10MB.`);
        }

        const formData = new FormData();
        formData.append('file', file);

        console.log('Sending upload request...');

        try {
          const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          });

          console.log('Upload response status:', response.status);

          if (!response.ok) {
            const data = await response.json().catch(() => ({ error: 'Upload failed' }));
            console.error('Upload failed:', data);
            throw new Error(data.error || `Upload failed with status ${response.status}`);
          }

          const data = await response.json();
          console.log('Upload successful:', data);
          
          return {
            id: `temp-${Date.now()}-${Math.random()}`,
            url: data.url,
            publicId: data.publicId,
            order: images.length,
          };
        } catch (fetchError) {
          console.error('Fetch error:', fetchError);
          throw fetchError;
        }
      });

      const uploadedImages = await Promise.all(uploadPromises);
      const newImages = [...images, ...uploadedImages].map((img, index) => ({
        ...img,
        order: index,
      }));
      
      onImagesChange(newImages);
    } catch (err) {
      console.error('Upload error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Upload failed. Please try again.';
      setError(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = images
      .filter((_, i) => i !== index)
      .map((img, i) => ({ ...img, order: i }));
    onImagesChange(newImages);
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newImages = [...images];
    const draggedImage = newImages[draggedIndex];
    newImages.splice(draggedIndex, 1);
    newImages.splice(index, 0, draggedImage);

    const reorderedImages = newImages.map((img, i) => ({ ...img, order: i }));
    onImagesChange(reorderedImages);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newImages = [...images];
    [newImages[index - 1], newImages[index]] = [newImages[index], newImages[index - 1]];
    const reorderedImages = newImages.map((img, i) => ({ ...img, order: i }));
    onImagesChange(reorderedImages);
  };

  const moveDown = (index: number) => {
    if (index === images.length - 1) return;
    const newImages = [...images];
    [newImages[index], newImages[index + 1]] = [newImages[index + 1], newImages[index]];
    const reorderedImages = newImages.map((img, i) => ({ ...img, order: i }));
    onImagesChange(reorderedImages);
  };

  return (
    <div className="space-y-4">
      {/* Upload Button */}
      {images.length < maxImages && (
        <div>
          <label className="block">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-dark-purple transition-colors cursor-pointer">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 mb-1">
                {uploading ? 'Uploading...' : 'Click to upload images'}
              </p>
              <p className="text-sm text-gray-500">
                PNG, JPG up to 10MB ({images.length}/{maxImages} images)
              </p>
            </div>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              disabled={uploading}
            />
          </label>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Image Gallery */}
      {images.length > 0 && (
        <div>
          <p className="text-sm text-gray-600 mb-3">
            <span className="hidden md:inline">Drag images to reorder. </span>
            <span className="md:hidden">Use arrow buttons to reorder. </span>
            First image will be the main product image.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div
                key={image.id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                className={`relative group border-2 rounded-lg overflow-hidden md:cursor-move transition-all ${
                  draggedIndex === index
                    ? 'border-dark-purple opacity-50'
                    : 'border-gray-200 hover:border-dark-purple'
                }`}
              >
                {/* Order Badge */}
                <div className="absolute top-2 left-2 bg-dark-purple text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center z-10">
                  {index + 1}
                </div>

                {/* Mobile: Up/Down Arrows */}
                <div className="md:hidden absolute top-2 right-2 flex flex-col gap-1 z-10">
                  <button
                    type="button"
                    onClick={() => moveUp(index)}
                    disabled={index === 0}
                    className="bg-white/90 rounded p-1 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronUp className="w-4 h-4 text-gray-700" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveDown(index)}
                    disabled={index === images.length - 1}
                    className="bg-white/90 rounded p-1 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronDown className="w-4 h-4 text-gray-700" />
                  </button>
                </div>

                {/* Desktop: Drag Handle */}
                <div className="hidden md:block absolute top-2 right-2 bg-white/90 rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <GripVertical className="w-4 h-4 text-gray-600" />
                </div>

                {/* Remove Button */}
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute bottom-2 right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-red-700"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Image */}
                <img
                  src={image.url}
                  alt={`Product image ${index + 1}`}
                  className="w-full h-32 object-cover"
                />

                {/* Main Image Label */}
                {index === 0 && (
                  <div className="absolute bottom-0 left-0 right-0 bg-dark-purple/90 text-white text-xs py-1 px-2 text-center">
                    Main Image
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
