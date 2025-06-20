import { AnimatePresence, motion } from "framer-motion";
import PopupContainer from "../popupContainer/PopupContainer";
import { type ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
  addingStyle?: string;
}

// modal container, gets: method to close modal, flag to specify if the modal is opened or not, and the inner component in the modal
// returns: popup modal container
const Modal = ({
  children,
  setIsOpen,
  isOpen,
  addingStyle = "",
}: ModalProps) => {
  return (
    <AnimatePresence>
      {isOpen ? (
        <PopupContainer setIsOpen={setIsOpen}>
          <motion.div
            className={`-translate-x-[50%] top-[50%] -translate-y-[50%] fixed left-[50%] z-[100] ${addingStyle}`}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="bg-block-background rounded-[18px] sm:w-max w-[90vw] flex justify-center max-w-[90vw] relative"
            >
              {children}
            </motion.div>
          </motion.div>
        </PopupContainer>
      ) : null}
    </AnimatePresence>
  );
};

export default Modal;
