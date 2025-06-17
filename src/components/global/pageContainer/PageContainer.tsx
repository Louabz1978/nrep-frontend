import { motion } from "framer-motion";
function PageContainer({ children, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className={`flex flex-col flex-1 gap-6 md:py-7 py-5 md:px-5 px-3 ${className}`}
    >
      {/* <div className="flex justify-between bg-blockBackgroundColor p-3 rounded-md">
        <div>hello</div>
        <div>hi</div>
      </div> */}
      {children}
    </motion.div>
  );
}

export default PageContainer;
