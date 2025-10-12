import { useState } from "react";
import type { ImageType } from "@/types/website/listings";

type RenderImagesTabProps = {
  dummyProperty: {
    image: ImageType[];
  };
};

const RenderImagesTab = ({ dummyProperty }: RenderImagesTabProps) => {
  const images = dummyProperty?.image ?? [];
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleThumbnailClick = (index: number) => setActiveIndex(index);

  const activeImageUrl =
    typeof images?.[activeIndex]?.url === "string"
      ? images[activeIndex].url
      : undefined;

  return (
    <div className="max-w-[1300px] mx-auto bg-[#E5E5E5] h-full flex flex-col items-center">
      {/* Thumbnails Custom Grid */}
      <div className="w-full p-3xl flex flex-col items-center space-y-6">
        {/* Divide images into groups of 8 (2 + 3 + 3) */}
        {Array.from({ length: Math.ceil(images.length / 8) }).map((_, groupIdx) => {
          const baseIdx = groupIdx * 8;

          // Rows pattern
          const firstRowImages = [images[baseIdx], images[baseIdx + 1]].filter(Boolean);
          const secondRowImages = [
            images[baseIdx + 2],
            images[baseIdx + 3],
            images[baseIdx + 4],
          ].filter(Boolean);
          const thirdRowImages = [
            images[baseIdx + 5],
            images[baseIdx + 6],
            images[baseIdx + 7],
          ].filter(Boolean);

          return (
            <div key={groupIdx} className="w-full flex flex-col items-center gap-6">
              {/* First row: 2 images side by side */}
              {firstRowImages.length > 0 && (
                <div className="flex gap-6 justify-center items-center flex-wrap">
                  {firstRowImages.map((img, i) => (
                    <div
                      key={baseIdx + i}
                      className={`overflow-hidden transition h-[350px] lg:w-[600px] sm:w-[300px] flex items-center justify-center cursor-pointer select-none ${
                        activeIndex === baseIdx + i
                          ? "border-primary ring-2 ring-primary opacity-100"
                          : "border-gray-200 opacity-80"
                      }`}
                      onClick={() => handleThumbnailClick(baseIdx + i)}
                      tabIndex={0}
                      role="img"
                      aria-label={`اختر صورة رقم ${baseIdx + i + 1}`}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ")
                          handleThumbnailClick(baseIdx + i);
                      }}
                    >
                      <img
                        src={img.url}
                        alt={`thumbnail-${baseIdx + i}`}
                        className="object-cover h-full w-full"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Second row: 3 images */}
              {secondRowImages.length > 0 && (
                <div className="flex gap-6 justify-center items-center flex-wrap">
                  {secondRowImages.map((img, i) => (
                    <div
                      key={baseIdx + 2 + i}
                      className={`overflow-hidden transition h-[220px] lg:w-[380px] sm:w-[220px] ${
                        activeIndex === baseIdx + 2 + i
                          ? "border-primary ring-2 ring-primary opacity-100"
                          : "border-gray-200 opacity-80"
                      }`}
                      onClick={() => handleThumbnailClick(baseIdx + 2 + i)}
                      tabIndex={0}
                      role="img"
                      aria-label={`اختر صورة رقم ${baseIdx + 2 + i + 1}`}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ")
                          handleThumbnailClick(baseIdx + 2 + i);
                      }}
                    >
                      <img
                        src={img.url}
                        alt={`thumbnail-${baseIdx + 2 + i}`}
                        className="object-cover h-full w-full"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Third row: 3 images */}
              {thirdRowImages.length > 0 && (
                <div className="flex gap-6 justify-center items-center flex-wrap">
                  {thirdRowImages.map((img, i) => (
                    <div
                      key={baseIdx + 5 + i}
                      className={`overflow-hidden transition h-[220px] lg:w-[380px] sm:w-[220px] ${
                        activeIndex === baseIdx + 5 + i
                          ? "border-primary ring-2 ring-primary opacity-100"
                          : "border-gray-200 opacity-80"
                      }`}
                      onClick={() => handleThumbnailClick(baseIdx + 5 + i)}
                      tabIndex={0}
                      role="img"
                      aria-label={`اختر صورة رقم ${baseIdx + 5 + i + 1}`}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ")
                          handleThumbnailClick(baseIdx + 5 + i);
                      }}
                    >
                      <img
                        src={img.url}
                        alt={`thumbnail-${baseIdx + 5 + i}`}
                        className="object-cover h-full w-full"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Large selected image below thumbnails */}
      <div className="mt-8 w-full flex justify-center px-2xl">
        <div className="rounded-3xl overflow-hidden border-2 border-primary w-full max-w-2xl aspect-video bg-white flex items-center justify-center min-h-[300px]">
          {activeImageUrl && (
            <img
              src={activeImageUrl}
              alt={`selected-${activeIndex}`}
              className="object-contain w-full h-full max-h-[480px]"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default RenderImagesTab;
