import { Outlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";
import Page from "./page/Page";

function WebsiteLayout() {
  return (
    <div className="w-full h-full overflow-auto relative bg-primary flex flex-col scroll-bar transition-colors duration-[0.3s]">
      <Navbar />
      <Page />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Outlet />
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default WebsiteLayout;
