import { Outlet, useMatches } from "react-router-dom";
import Page from "./page/Page";
import Header from "./header/Header";
import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import Footer from "./footer/Footer";

function WebsiteLayout() {
  const matches = useMatches();
  const useWhiteBackground = matches.some((match) => {
    const handle = (match as { handle?: { whiteBg?: boolean } }).handle;
    return Boolean(handle?.whiteBg);
  });
  return (
    <div
      className={` relative ${useWhiteBackground ? "bg-white" : "bg-primary-bg"}
        } flex flex-col scroll-bar transition-colors duration-[0.3s]`}
    >
      <AnimateContainer className="">
        <Header />
        <Page>
          <Outlet />
        </Page>
        <Footer />
      </AnimateContainer>
    </div>
  );
}

export default WebsiteLayout;
