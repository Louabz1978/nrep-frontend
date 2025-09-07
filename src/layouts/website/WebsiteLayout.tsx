import { Outlet, useMatches } from "react-router-dom";
import Page from "./page/Page";
import Header from "./header/Header";
import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";

function WebsiteLayout() {
  const matches = useMatches();
  const useWhiteBackground = matches.some((match) => {
    const handle = (match as { handle?: { whiteBg?: boolean } }).handle;
    return Boolean(handle?.whiteBg);
  });
  return (
    <div
      className={`w-full h-full flex-1 overflow-auto relative ${
        useWhiteBackground ? "bg-white" : "bg-primary-bg"
      } flex flex-col scroll-bar transition-colors duration-[0.3s]`}
    >
      <AnimateContainer className="!h-full">
        <Header />
        <Page>
          <Outlet />
        </Page>
        {/* <Footer /> */}
      </AnimateContainer>
    </div>
  );
}

export default WebsiteLayout;
