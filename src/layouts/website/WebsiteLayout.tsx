import { Outlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";
import Page from "./page/Page";
import Header from "./header/Header";

function WebsiteLayout() {
  return (
    <div className="w-full h-full overflow-auto relative bg-background flex flex-col scroll-bar transition-colors duration-[0.3s]">
      <Header />
      <Navbar />
      <Page>
        <AnimatePresence mode="wait">
          <Outlet />
        </AnimatePresence>
      </Page>
      <Footer />
    </div>
  );
}

export default WebsiteLayout;
