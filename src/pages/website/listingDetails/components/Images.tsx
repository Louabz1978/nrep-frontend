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
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalImageIndex, setModalImageIndex] = useState<number>(0);

  const handleImageClick = (index: number) => {
    setActiveIndex(index);
    setModalImageIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);
  const handleCloseModalWrapper = () => setIsModalOpen(false);

  const chunkPattern = [2, 3];
  const gridRows: Array<{ startIdx: number; count: number }> = [];
  let idx = 0, patternIdx = 0;
  while (idx < images.length) {
    const count = chunkPattern[patternIdx % chunkPattern.length];
    gridRows.push({ startIdx: idx, count: Math.min(count, images.length - idx) });
    idx += count;
    patternIdx++;
  }

  return (
    <div className="max-w-[1300px] mx-auto h-full flex flex-col items-center">
      
      <div className="w-full p-3xl flex flex-col items-center space-y-6">
        {gridRows.map(({ startIdx, count }, rowIdx) => {
          const rowImages = images.slice(startIdx, startIdx + count);
          
          let widthClass = "w-1/2";
          if (count === 3) widthClass = "w-1/3";
          if (count === 1) widthClass = "w-full";
          return (
            <div
              key={`row-${rowIdx}`}
              className={`w-full flex gap-6 justify-${count === 1 ? "center" : "between"} items-center`}
            >
              {rowImages.map((img, i) => {
                const globalIdx = startIdx + i;
                return (
                  <div
                    key={globalIdx}
                    className={`${widthClass} h-[${count===1?350: count===2?350:250}px] overflow-hidden  transition cursor-pointer ${activeIndex === globalIdx ? " opacity-100" : "opacity-80 hover:opacity-100"}`}
                    onClick={() => handleImageClick(globalIdx)}
                  >
                    <img
                      src={img.url}
                      className="object-cover h-full w-full"
                      loading="lazy"
                    />
                  </div>
                );
              })}
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
                <img
                  src={images[modalImageIndex]?.url}
                  className="object-contain w-[1230px] h-[700px]"
                  alt="selected"
                />
              </motion.div>
            </motion.div>
          </PopupContainer>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RenderImagesTab;
