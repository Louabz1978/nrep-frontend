import { useState } from "react";
import type { ImageType } from "@/types/website/listings";
import Modal from "@/components/global/modal/Modal";
import { FaXmark } from "react-icons/fa6";

type RenderImagesTabProps = {
  dummyProperty: {
    image: ImageType[];
  };
};

const RenderImagesTab = ({ dummyProperty }: RenderImagesTabProps) => {
  const images = dummyProperty?.image ?? [];
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleOpen = (index: number) => {
    setActiveIndex(index);
    setIsOpen(true);
  };

  const activeImageUrl =
    typeof images?.[activeIndex]?.url === "string"
      ? images?.[activeIndex]?.url
      : undefined;

  return (
    <div className="w-full border-quaternary-border border-2">
      <div className="p-3xl">
        <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3xl">
          {images?.map((img: ImageType, index: number) => {
            const url = img?.url;
            return (
              <div
                key={index}
                className="flex flex-col cursor-pointer"
                onClick={() => handleOpen(index)}
              >
                <div className="w-full border rounded-2xl overflow-hidden">
                  <img
                    src={url}
                    alt={`${index}`}
                    className="w-full h-full"
                    loading="lazy"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="w-full max-w-[1200px] min-h-[300px] max-h-[600px] bg-white rounded-2xl flex flex-col">
          <div className="py-lg px-4xl flex justify-end border-b ">
            <FaXmark
              onClick={() => setIsOpen(false)}
              className="cursor-pointer text-xl"
            />
          </div>

          <div className="flex justify-end p-4xl gap-4xl overflow-hidden">
            <div className="max-w-[220px] flex flex-col gap-lg ">
              {images?.map((img: ImageType, index: number) => {
                const url = img?.url;
                const isActive = index === activeIndex;
                return (
                  <button
                    key={index}
                    className={`w-full rounded-lg overflow-hidden border transition min-h-[200px] ${isActive ? "border-primary" :""}}`}
                    onClick={() => setActiveIndex(index)}
                  >
                    <img
                      src={url}
                      alt={`${index}`}
                      className="w-full h-full"
                      loading="lazy"
                    />
                  </button>
                );
              })}
            </div>

            <div className=" rounded-2xl overflow-hidden border">
              {activeImageUrl ? (
                <img
                  src={activeImageUrl}
                  alt={`${activeIndex}`}
                  className="w-full h-full"
                />
              ) : null}
            </div>
          </div>
        </div>
      </Modal>

    </div>
  );
};

export default RenderImagesTab;
