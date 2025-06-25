import { AnimatePresence } from "framer-motion";
import { Outlet } from "react-router-dom";

function GlobalLayout() {
  return (
    <AnimatePresence mode="wait">
      <Outlet />
    </AnimatePresence>
  );
}

export default GlobalLayout;
