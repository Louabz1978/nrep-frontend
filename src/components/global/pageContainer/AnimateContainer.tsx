import type ADMIN_PERMISSIONS from "@/data/admin/permissoins";
import type WEBSITE_PERMISSIONS from "@/data/website/permissions";
import { useUser } from "@/stores/useUser";
import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface AnimateContainerProps {
  children: ReactNode;
  className?: string;
  permissions?: (
    | keyof typeof WEBSITE_PERMISSIONS
    | keyof typeof ADMIN_PERMISSIONS
  )[];
}

function AnimateContainer({
  children,
  className = "",
  permissions,
}: AnimateContainerProps) {
  const { checkPermissions } = useUser();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`flex flex-col flex-1 ${className}`}
    >
      {checkPermissions(permissions) ? children : <>not allowed</>}
    </motion.div>
  );
}

export default AnimateContainer;
