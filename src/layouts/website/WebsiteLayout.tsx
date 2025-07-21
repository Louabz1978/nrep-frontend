import { Outlet } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Page from "./page/Page";
import Header from "./header/Header";
import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";

function WebsiteLayout() {
  return (
    <div className="w-full h-full flex-1 overflow-auto relative bg-primary-bg flex flex-col scroll-bar transition-colors duration-[0.3s]">
      <AnimateContainer className="!h-full">
        <Header />
        <Navbar />
        <Page>
          <Outlet />
        </Page>
        {/* <Footer /> */}
      </AnimateContainer>
    </div>
  );
}

export default WebsiteLayout;
