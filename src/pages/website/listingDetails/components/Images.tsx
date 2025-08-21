import { useState } from "react";
import type { ImageType } from "@/types/website/listings";
import { AnimatePresence } from "framer-motion";
import PopupContainer from "@/components/global/popupContainer/PopupContainer";

type RenderImagesTabProps = {
  dummyProperty: {
    image: ImageType[];
  };
};

const RenderImagesTab = ({ dummyProperty }: RenderImagesTabProps) => {
  const images = dummyProperty?.image ?? [];
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleOpen = (index: number) => {
    setActiveIndex(index);
  };

  const activeImageUrl =
    typeof images?.[activeIndex as number]?.url === "string"
      ? images?.[activeIndex as number]?.url
      : undefined;

  return (
    <div className="w-full border-quaternary-border border-2 h-full">
      <div className="p-3xl h-full">
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-3xl">
          {images?.map((img: ImageType, index: number) => {
            const url = img?.url;
            return (
              <div
                key={index}
                className="flex rounded-2xl overflow-auto h-[250px] justify-center items-center border cursor-pointer"
                onClick={() => handleOpen(index)}
              >
                <img
                  src={url}
                  alt={`${index}`}
                  className="size-full object-cover"
                  loading="lazy"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="w-full max-w-[80vw] md:w-[80vw] min-h-[300px] max-h-[80svh] bg-tertiary-bg rounded-2xl flex flex-col">
          <div className="py-lg px-4xl flex justify-end border-b ">
            <FaXmark
              onClick={() => setIsOpen(false)}
              className="cursor-pointer text-xl"
            />
          </div>

          <div className="flex justify-between md:flex-row flex-col-reverse md:p-4xl p-md md:gap-4xl gap-2xl h-[calc(100%_-_45px)]">
            <div className="flex-1 grid xl:grid-cols-3 lg:grid-cols-2 gap-xl overflow-auto h-full">
              {images?.map((img: ImageType, index: number) => {
                const url = img?.url;
                const isActive = index === activeIndex;
                return (
                  <button
                    key={index}
                    className={` rounded-lg overflow-hidden border transition w-full h-[200px] ${
                      isActive ? "border-primary" : ""
                    }}`}
                    onClick={() => setActiveIndex(index)}
                  >
                    <img
                      src={url}
                      alt={`${index}`}
                      className="size-full object-cover"
                      loading="lazy"
                    />
                  </button>
                );
              })}
            </div>

            <div className=" rounded-2xl md:size-[400px] w-full aspect-square overflow-hidden border">
              {activeImageUrl ? (
                <img
                  src={activeImageUrl}
                  alt={`${activeIndex}`}
                  className="size-full object-cover"
                />
              ) : null}
            </div>
          </div>
        </div>
      </Modal> */}

      <AnimatePresence>
        {activeIndex !== null ? (
          <PopupContainer setIsOpen={setActiveIndex}>
            <div className="w-[100vw] h-[100svh] flex justify-center items-center pointer-events-none">
              <div className="w-[90vw] h-[90svh]">
                <img
                  src={activeImageUrl}
                  alt={`${activeIndex}`}
                  className="size-full object-contain"
                />
              </div>
            </div>
          </PopupContainer>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default RenderImagesTab;
