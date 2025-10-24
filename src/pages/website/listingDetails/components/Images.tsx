import { useState } from "react";
import type { ImageType } from "@/types/website/listings";
import PopupContainer from "@/components/global/popupContainer/PopupContainer";
import { motion, AnimatePresence } from "framer-motion";

type RenderImagesTabProps = {
  dummyProperty: {
    image: ImageType[];
  };
};

const RenderImagesTab = ({ dummyProperty }: RenderImagesTabProps) => {
  const images = dummyProperty?.image ?? [];
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalImageIndex, setModalImageIndex] = useState<number>(0);

  const handleImageClick = (index: number) => {
    setModalImageIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);
  const handleCloseModalWrapper = () => setIsModalOpen(false);

  return (
    <div className="max-w-[1300px] mx-auto h-full flex flex-col items-center">
      <div className="w-full grid grid-cols-6 md:gap-6xl gap-md">
        {images.map((image, index) => {
          const row = index % 6 <= 1 ? 1 : index % 6 <= 4 ? 2 : 3;
          const rowClassName =
            row == 1
              ? "col-span-3 md:h-[475px] h-[200px]"
              : row == 2
              ? "col-span-2 md:h-[294px] h-[130px]"
              : "col-span-full md:h-[900px] h-[400px]";
          return (
            <div
              key={index}
              className={`w-full cursor-pointer ${rowClassName}`}
              onClick={() => handleImageClick(index)}
            >
              <img
                src={image.url}
                className="object-cover h-full w-full"
                loading="lazy"
              />
            </div>
          );
        })}
      </div>

      {/* Full-screen Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <PopupContainer setIsOpen={handleCloseModalWrapper}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 opacity-10 z-[1000] flex items-center justify-center"
              onClick={handleCloseModal}
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="relative max-w-[calc(100vw-10%)] max-h-[90vh] flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <div className=" lg:w-[1230px] lg:h-[750px] sm:w-[300px] sm:h-[400px]">
                  <img
                    src={images[modalImageIndex]?.url}
                    className="object-cover w-full h-full"
                    alt="selected"
                  />
                </div>
              </motion.div>
            </motion.div>
          </PopupContainer>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RenderImagesTab;
