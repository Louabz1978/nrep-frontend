import { motion } from "framer-motion";

function PopupContainer({ setIsOpen, children, addingStyle }) {
  const handleParentClick = (event) => {
    // Prevent click events from children to bubble up to the parent
    if (event.target === event.currentTarget) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
        animate={{ opacity: 1, backdropFilter: "blur(4px)" }}
        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
        transition={{ duration: 0.2 }}
        className={`fixed w-[100vw] h-[100svh] bg-popupBlurColor z-[30] bg-opacity-65 backdrop-blur-[2px] top-0 right-0 ${addingStyle}`}
        onClick={handleParentClick}
      >
        {children}
      </motion.div>
    </>
  );
}

export default PopupContainer;
